/* =============================================
   useVulnStats — Pre-computed stats for a vulnerability
   Replaces inline .filter() logic in Dashboard & Vulnerabilities pages
   ============================================= */

import { useMemo } from 'react'
import type { VulnerabilityId } from '../types'
import type {
    MonkaData,
    DBQuestion,
    DBMicroParcours,
    DBActivationRule,
    DBScoringQuestion,
    DBScoringThreshold,
    DBRecommendation,
    DBMicroTache,
    DBSuiviQuestion,
    DBCategory,
} from '../supabaseData'
import {
    getQuestionsForVuln,
    getMPsForVuln,
    getRulesForVuln,
    getRecosForVuln,
    getMTsForVuln,
    getScoringForVuln,
    getThresholdsForVuln,
    getSuiviForVuln,
    getCategoriesForVuln,
    getMaxScoreForVuln,
} from '../supabaseData'

// === Return type ===

export interface VulnStats {
    vulnId: VulnerabilityId
    questions: DBQuestion[]
    mps: DBMicroParcours[]
    categories: DBCategory[]
    rules: DBActivationRule[]
    recos: DBRecommendation[]
    mts: DBMicroTache[]
    scoring: DBScoringQuestion[]
    thresholds: DBScoringThreshold[]
    suiviQuestions: DBSuiviQuestion[]
    maxScore: number

    // Pre-computed counts
    counts: {
        questions: number
        triggers: number
        etat: number
        facteur: number
        mps: number
        categories: number
        rules: number
        rulesByNiveau: Record<string, number>
        recos: number
        mts: number
        mtsByType: Record<string, number>
        contributive: number
        nonContributive: number
        scoringQuestions: number
        suiviQuestions: number
    }
}

// === Hook ===

export function useVulnStats(data: MonkaData, vulnId: VulnerabilityId): VulnStats {
    return useMemo(() => {
        const questions = getQuestionsForVuln(data, vulnId)
        const mps = getMPsForVuln(data, vulnId)
        const categories = getCategoriesForVuln(data, vulnId)
        const rules = getRulesForVuln(data, vulnId)
        const recos = getRecosForVuln(data, vulnId)
        const mts = getMTsForVuln(data, vulnId)
        const scoring = getScoringForVuln(data, vulnId)
        const thresholds = getThresholdsForVuln(data, vulnId)
        const suiviQuestions = getSuiviForVuln(data, vulnId)
        const maxScore = getMaxScoreForVuln(data, vulnId)

        const rulesByNiveau = rules.reduce((acc, r) => {
            acc[r.niveau] = (acc[r.niveau] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const mtsByType = mts.reduce((acc, mt) => {
            acc[mt.type] = (acc[mt.type] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const scoringQIds = new Set(scoring.map(sq => sq.question_id))

        return {
            vulnId,
            questions,
            mps,
            categories,
            rules,
            recos,
            mts,
            scoring,
            thresholds,
            suiviQuestions,
            maxScore,
            counts: {
                questions: questions.length,
                triggers: questions.filter(q => q.is_trigger).length,
                etat: questions.filter(q => q.classification === 'etat').length,
                facteur: questions.filter(q => q.classification === 'facteur').length,
                mps: mps.length,
                categories: categories.length,
                rules: rules.length,
                rulesByNiveau,
                recos: recos.length,
                mts: mts.length,
                mtsByType,
                contributive: mts.filter(mt => mt.is_contributive).length,
                nonContributive: mts.filter(mt => !mt.is_contributive).length,
                scoringQuestions: scoringQIds.size,
                suiviQuestions: suiviQuestions.length,
            },
        }
    }, [data, vulnId])
}
