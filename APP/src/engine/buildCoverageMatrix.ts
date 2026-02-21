/* buildCoverageMatrix — Pure engine function (ZERO React).
   Extracts question references from condition_logic JSONB of activation rules
   and builds a coverage matrix: which questions are used by which rules/MPs. */

import type { MonkaData } from './supabaseData'

export interface CoverageCell {
    questionId: string
    mpId: string
    ruleCount: number
    ruleIds: string[]
}

export interface CoverageStats {
    totalQuestions: number
    coveredQuestions: number
    orphanQuestions: string[]
    coveragePct: number
}

export interface CoverageMatrix {
    cells: Map<string, CoverageCell>  // key = `${qId}::${mpId}`
    questionIds: string[]
    mpIds: string[]
    stats: CoverageStats
}

/** Extract question IDs from a rule's condition_logic JSONB */
function extractQuestionIds(conditionLogic: unknown): string[] {
    if (!Array.isArray(conditionLogic)) return []
    const ids: string[] = []
    for (const cond of conditionLogic) {
        if (cond && typeof cond === 'object' && 'q' in cond && typeof (cond as Record<string, unknown>).q === 'string') {
            ids.push((cond as Record<string, unknown>).q as string)
        }
    }
    return ids
}

/** Build the full coverage matrix from activation rules */
export function buildCoverageMatrix(data: MonkaData): CoverageMatrix {
    const cells = new Map<string, CoverageCell>()
    const mpSet = new Set<string>()
    const coveredQSet = new Set<string>()

    for (const rule of data.activationRules) {
        const qIds = extractQuestionIds(rule.condition_logic)
        mpSet.add(rule.mp_id)
        for (const qId of qIds) {
            coveredQSet.add(qId)
            const key = `${qId}::${rule.mp_id}`
            const existing = cells.get(key)
            if (existing) {
                existing.ruleCount++
                existing.ruleIds.push(rule.id)
            } else {
                cells.set(key, { questionId: qId, mpId: rule.mp_id, ruleCount: 1, ruleIds: [rule.id] })
            }
        }
    }

    const allQIds = data.questions.filter(q => !q.is_trigger).map(q => q.id)
    const orphans = allQIds.filter(qId => !coveredQSet.has(qId))

    return {
        cells,
        questionIds: allQIds,
        mpIds: Array.from(mpSet).sort(),
        stats: {
            totalQuestions: allQIds.length,
            coveredQuestions: coveredQSet.size,
            orphanQuestions: orphans,
            coveragePct: allQIds.length > 0 ? Math.round((coveredQSet.size / allQIds.length) * 100) : 0,
        },
    }
}
