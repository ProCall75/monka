/* =============================================
   Clinical Engine — Monka Activation Logic
   
   Pure functions, zero React dependencies.
   Handles all 9 operators from the real DB:
   eq, neq, ne, in, nin, gte, contains, count_gte, has_any
   
   Aligned with real Supabase condition_logic format:
   - eq/neq/ne/gte/contains: { q, op, val }
   - in/nin:                 { q, op, vals }
   - count_gte:              { q, op, val }  (val is number)
   - has_any:                { q, op, min }
   ============================================= */

import type {
    MonkaData,
    DBActivationRule,
} from './supabaseData'
import { getMPsForVuln } from './supabaseData'
import type { VulnerabilityId } from './types'

// === Condition Types (match real DB jsonb) ===

/** A single condition from condition_logic JSONB */
export type Condition =
    | { q: string; op: 'eq' | 'neq' | 'ne' | 'contains'; val: string }
    | { q: string; op: 'in' | 'nin'; vals: string[] }
    | { q: string; op: 'gte'; val: string | number }
    | { q: string; op: 'count_gte'; val: number }
    | { q: string; op: 'has_any'; min: number }

// === Answer Types ===

/**
 * Answers can be:
 * - string for single-choice questions
 * - string[] for multi-choice questions
 */
export type AnswerValue = string | string[]
export type Answers = Record<string, AnswerValue>

// === Condition Evaluation ===

/**
 * Normalize an answer to always work with both string and string[] inputs.
 * Single-choice: "Oui" → ["Oui"]
 * Multi-choice:  ["Item A", "Item B"] → ["Item A", "Item B"]
 */
function toArray(answer: AnswerValue): string[] {
    return Array.isArray(answer) ? answer : [answer]
}

/**
 * Evaluate a single condition against the current answers.
 * Returns true if the condition is satisfied.
 */
export function evaluateCondition(cond: Condition, answers: Answers): boolean {
    const raw = answers[cond.q]
    if (raw === undefined || raw === null) return false

    switch (cond.op) {
        // === Equality ===
        case 'eq':
            return Array.isArray(raw) ? raw.includes(cond.val) : raw === cond.val

        case 'neq':
        case 'ne':
            return Array.isArray(raw) ? !raw.includes(cond.val) : raw !== cond.val

        // === Set membership ===
        case 'in': {
            // Answer is one of the allowed values
            const arr = toArray(raw)
            return arr.some(a => cond.vals.includes(a))
        }

        case 'nin': {
            // Answer is NOT any of the disallowed values
            const arr = toArray(raw)
            return !arr.some(a => cond.vals.includes(a))
        }

        // === Numeric comparison ===
        case 'gte': {
            const numAnswer = Array.isArray(raw) ? raw.length : parseFloat(raw)
            const numVal = typeof cond.val === 'number' ? cond.val : parseFloat(String(cond.val))
            return !isNaN(numAnswer) && !isNaN(numVal) && numAnswer >= numVal
        }

        // === Multi-select operators ===
        case 'count_gte': {
            // Multi-select answer must have >= val items
            const arr = toArray(raw)
            return arr.length >= cond.val
        }

        case 'has_any': {
            // Multi-select answer must have >= min items selected
            const arr = toArray(raw)
            return arr.length >= cond.min
        }

        case 'contains': {
            // Answer text contains the given substring
            const str = Array.isArray(raw) ? raw.join(', ') : raw
            return str.includes(cond.val)
        }

        default:
            console.warn(`[ClinicalEngine] Unknown operator: ${(cond as { op: string }).op}`)
            return false
    }
}

// === Rule Evaluation ===

/**
 * Evaluate an activation rule: ALL conditions must be true (AND logic).
 * Returns true if the rule fires.
 */
export function evaluateRule(rule: DBActivationRule, answers: Answers): boolean {
    const conditions = rule.condition_logic as unknown as Condition[]
    if (!conditions || !Array.isArray(conditions) || conditions.length === 0) return false
    return conditions.every(cond => evaluateCondition(cond, answers))
}

// === Category Activation ===

export interface ActivatedCategory {
    categoryId: string
    mpId: string
    niveau: 'standard' | 'ccc' | 'critique'
    delaiJours: number
    firedRules: DBActivationRule[]
}

const NIVEAU_ORDER: Record<string, number> = { standard: 1, ccc: 2, critique: 3 }

/**
 * Evaluate all activation rules against answers.
 * Returns a Map of categoryId → activated category with the highest niveau.
 * Optionally filter by vulnerability.
 */
export function getActivatedCategories(
    data: MonkaData,
    answers: Answers,
    vulnFilter?: VulnerabilityId
): Map<string, ActivatedCategory> {
    const result = new Map<string, ActivatedCategory>()

    // Optionally restrict to a specific vulnerability's MPs
    const mpIds = vulnFilter
        ? new Set(getMPsForVuln(data, vulnFilter).map(mp => mp.id))
        : null

    for (const rule of data.activationRules) {
        if (mpIds && !mpIds.has(rule.mp_id)) continue
        if (!evaluateRule(rule, answers)) continue

        const existing = result.get(rule.category_id)
        if (!existing) {
            result.set(rule.category_id, {
                categoryId: rule.category_id,
                mpId: rule.mp_id,
                niveau: rule.niveau,
                delaiJours: rule.delai_jours,
                firedRules: [rule],
            })
        } else {
            existing.firedRules.push(rule)
            if ((NIVEAU_ORDER[rule.niveau] || 0) > (NIVEAU_ORDER[existing.niveau] || 0)) {
                existing.niveau = rule.niveau
                existing.delaiJours = rule.delai_jours
            }
        }
    }

    return result
}

// === Scoring ===

export interface ScoreResult {
    vulnId: VulnerabilityId
    score: number
    maxScore: number
    percentage: number
    level: string | null
}

/**
 * Per-question score cap for counting-based questions (C2bis).
 * Multi-choice list questions (E19, O16) can match many responses
 * but their total contribution is capped at 1 point per question.
 */
const QUESTION_SCORE_CAP: Record<string, number> = {
    E19: 1, // Soucis de santé — ≥1 coché → +1 max
    O16: 1, // Maladies du proche — ≥2 cochés → +1 max (threshold handled by DB score=0 for 'Aucun'/'JNSP')
}

/**
 * Compute the score for a vulnerability based on answers.
 * Handles both single-choice and multi-choice (array) answers.
 * Multi-choice questions with a cap (C2bis) are limited per question.
 */
export function computeScore(
    data: MonkaData,
    answers: Answers,
    vulnId: VulnerabilityId
): ScoreResult {
    const scoringQs = data.scoringQuestions.filter(sq => sq.vulnerability_id === vulnId)
    const maxScore = scoringQs[0]?.max_score_vulnerability || 0

    // Group scoring entries by question_id for per-question cap logic
    const byQuestion = new Map<string, typeof scoringQs>()
    for (const sq of scoringQs) {
        const list = byQuestion.get(sq.question_id) || []
        list.push(sq)
        byQuestion.set(sq.question_id, list)
    }

    let score = 0
    for (const [qId, entries] of byQuestion) {
        const answer = answers[qId]
        if (answer === undefined || answer === null) continue

        let questionScore = 0

        if (Array.isArray(answer)) {
            // Multi-choice: sum scores for all selected responses
            for (const sq of entries) {
                if (answer.includes(sq.response_text)) {
                    questionScore += sq.score
                }
            }
        } else {
            // Single-choice: match exact response
            for (const sq of entries) {
                if (answer === sq.response_text) {
                    questionScore += sq.score
                }
            }
        }

        // Apply per-question cap if defined (C2bis counting logic)
        const cap = QUESTION_SCORE_CAP[qId]
        if (cap !== undefined && questionScore > cap) {
            questionScore = cap
        }

        score += questionScore
    }

    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0

    // Find matching threshold level
    const threshold = data.scoringThresholds
        .filter(t => t.vulnerability_id === vulnId)
        .find(t => score >= t.min_score && score <= t.max_score)

    return {
        vulnId,
        score,
        maxScore,
        percentage,
        level: threshold?.level || null,
    }
}

// === Full Engine Output ===

export interface EngineOutput {
    activatedCategories: Map<string, ActivatedCategory>
    activatedMPIds: Set<string>
    scores: ScoreResult[]
    totalScore: number
    totalMaxScore: number
    /** Weighted global score (0-100) using per-V weights from DB */
    weightedScore: number
}

/**
 * Run the full clinical engine: evaluate all rules, compute scores.
 * This is the main entry point for the Simulator.
 */
export function runEngine(
    data: MonkaData,
    answers: Answers,
    vulnFilter?: VulnerabilityId
): EngineOutput {
    const activatedCategories = getActivatedCategories(data, answers, vulnFilter)

    const activatedMPIds = new Set<string>()
    for (const cat of activatedCategories.values()) {
        activatedMPIds.add(cat.mpId)
    }

    const vulns: VulnerabilityId[] = ['V1', 'V2', 'V3', 'V4', 'V5']
    const scores = vulns.map(v => computeScore(data, answers, v))
    const totalScore = scores.reduce((acc, s) => acc + s.score, 0)
    const totalMaxScore = scores.reduce((acc, s) => acc + s.maxScore, 0)

    // Weighted global score: sum(V_percentage × V_weight) for each vulnerability
    // Weights come from vulnerabilities.weight in DB (validated: 15/10/25/30/20)
    const vulnWeightMap = new Map(data.vulnerabilities.map(v => [v.id, v.weight]))
    const weightedScore = scores.reduce((acc, s) => {
        const weight = vulnWeightMap.get(s.vulnId) || 0.20
        return acc + (s.percentage * weight)
    }, 0)

    return {
        activatedCategories,
        activatedMPIds,
        scores,
        totalScore,
        totalMaxScore,
        weightedScore,
    }
}
