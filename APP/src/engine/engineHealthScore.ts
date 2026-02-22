/* =============================================
   Engine Health Score — Monka Clinical Engine
   
   Pure TS, zero React dependencies.
   Computes a composite /100 score measuring
   engine robustness across 6 weighted metrics.
   ============================================= */

import type { MonkaData } from './dbTypes'

// === Types ===

export interface HealthMetric {
    id: string
    label: string
    value: number      // 0-100%
    weight: number     // 0-1
    detail: string     // human-readable detail
}

export interface EngineHealthResult {
    score: number           // 0-100 composite
    metrics: HealthMetric[]
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
}

// === Metric Weights ===

const WEIGHTS = {
    questionCoverage: 0.25,
    levelBalance:     0.20,
    wordingComplete:  0.20,
    scoringCoverage:  0.15,
    actorComplete:    0.10,
    linkIntegrity:    0.10,
} as const

// === Individual Metrics ===

/** M1: % questions referenced in ≥1 activation rule condition_logic */
function questionCoverage(d: MonkaData): HealthMetric {
    const nonTrigger = d.questions.filter(q => !q.is_trigger)
    if (!nonTrigger.length) return metric('questionCoverage', 'Couverture questions', 0, '0/0 questions')

    const referencedIds = new Set<string>()
    for (const rule of d.activationRules) {
        const conditions = rule.condition_logic as Array<{ q?: string }>
        for (const c of conditions) {
            if (c.q) referencedIds.add(c.q)
        }
    }
    const covered = nonTrigger.filter(q => referencedIds.has(q.id)).length
    const pct = (covered / nonTrigger.length) * 100
    return metric('questionCoverage', 'Couverture questions', pct, `${covered}/${nonTrigger.length} questions dans ≥1 règle`)
}

/** M2: % MPs with rules at all 3 levels (std, ccc, critique) */
function levelBalance(d: MonkaData): HealthMetric {
    if (!d.microParcours.length) return metric('levelBalance', 'Équilibre niveaux', 0, '0/0 MPs')

    let balanced = 0
    for (const mp of d.microParcours) {
        const mpRules = d.activationRules.filter(r => r.mp_id === mp.id)
        const levels = new Set(mpRules.map(r => r.niveau))
        if (levels.has('standard') && levels.has('ccc') && levels.has('critique')) balanced++
    }
    const pct = (balanced / d.microParcours.length) * 100
    return metric('levelBalance', 'Équilibre niveaux', pct, `${balanced}/${d.microParcours.length} MPs avec 3 niveaux`)
}

/** M3: % MTs with all 3 level wordings non-null & non-empty */
function wordingCompleteness(d: MonkaData): HealthMetric {
    if (!d.microTaches.length) return metric('wordingComplete', 'Complétude wording', 0, '0/0 MTs')

    const complete = d.microTaches.filter(mt =>
        mt.wording_std?.trim() && mt.wording_ccc?.trim() && mt.wording_crit?.trim()
    ).length
    const pct = (complete / d.microTaches.length) * 100
    return metric('wordingComplete', 'Complétude wording', pct, `${complete}/${d.microTaches.length} MTs avec 3 wordings`)
}

/** M4: % non-trigger questions with ≥1 scoring_questions entry */
function scoringCoverage(d: MonkaData): HealthMetric {
    const nonTrigger = d.questions.filter(q => !q.is_trigger)
    if (!nonTrigger.length) return metric('scoringCoverage', 'Couverture scoring', 0, '0/0 questions')

    const scoredIds = new Set(d.scoringQuestions.map(sq => sq.question_id))
    const covered = nonTrigger.filter(q => scoredIds.has(q.id)).length
    const pct = (covered / nonTrigger.length) * 100
    return metric('scoringCoverage', 'Couverture scoring', pct, `${covered}/${nonTrigger.length} questions avec scoring`)
}

/** M5: % MTs with acteur[] non-empty */
function actorCompleteness(d: MonkaData): HealthMetric {
    if (!d.microTaches.length) return metric('actorComplete', 'Complétude acteurs', 0, '0/0 MTs')

    const withActors = d.microTaches.filter(mt => mt.acteur?.length > 0).length
    const pct = (withActors / d.microTaches.length) * 100
    return metric('actorComplete', 'Complétude acteurs', pct, `${withActors}/${d.microTaches.length} MTs avec acteur[]`)
}

/** M6: FK integrity — categories→MPs, rules→categories, recos→categories */
function linkIntegrity(d: MonkaData): HealthMetric {
    const mpIds = new Set(d.microParcours.map(mp => mp.id))
    const catIds = new Set(d.categories.map(c => c.id))

    let total = 0, valid = 0

    // Categories → MP exists
    for (const c of d.categories) { total++; if (mpIds.has(c.mp_id)) valid++ }
    // Rules → category exists
    for (const r of d.activationRules) { total++; if (catIds.has(r.category_id)) valid++ }
    // Recommendations → category exists
    for (const r of d.recommendations) { total++; if (catIds.has(r.category_id)) valid++ }
    // MTs → category exists
    for (const mt of d.microTaches) { total++; if (catIds.has(mt.category_id)) valid++ }

    const pct = total > 0 ? (valid / total) * 100 : 100
    return metric('linkIntegrity', 'Intégrité liens FK', pct, `${valid}/${total} FK valides`)
}

// === Composite Score ===

function gradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A'
    if (score >= 75) return 'B'
    if (score >= 60) return 'C'
    if (score >= 40) return 'D'
    return 'F'
}

/** Compute full engine health result from MonkaData */
export function computeEngineHealth(data: MonkaData): EngineHealthResult {
    const metrics = [
        questionCoverage(data),
        levelBalance(data),
        wordingCompleteness(data),
        scoringCoverage(data),
        actorCompleteness(data),
        linkIntegrity(data),
    ]

    const score = Math.round(
        metrics.reduce((sum, m) => sum + m.value * m.weight, 0)
    )

    return { score, metrics, grade: gradeFromScore(score) }
}

// === Helpers ===

function metric(id: string, label: string, value: number, detail: string): HealthMetric {
    const w = WEIGHTS[id as keyof typeof WEIGHTS] ?? 0
    return { id, label, value: Math.round(value * 10) / 10, weight: w, detail }
}
