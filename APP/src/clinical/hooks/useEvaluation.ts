/* =============================================
   useEvaluation — React hook for clinical rule evaluation
   
   Wraps the pure engine functions with React memoization.
   Pages import this hook, NEVER engine/ directly.
   ============================================= */

import { useMemo } from 'react'
import type { MonkaData, DBActivationRule } from '../../engine/supabaseData'
import type { VulnerabilityId } from '../../engine/types'
import type { Answers, ActivatedCategory } from '../../engine/clinicalEngine'
import {
    evaluateRule,
    getActivatedCategories,
} from '../../engine/clinicalEngine'
import {
    getRulesForMP,
    getCategoriesForMP,
    getQuestionText,
} from '../../engine/supabaseData'

// === Hook: evaluate a single rule (memoized) ===

/** Check if a specific rule fires given current answers */
export function useRuleEvaluation(
    rule: DBActivationRule,
    answers: Answers,
): boolean {
    return useMemo(() => evaluateRule(rule, answers), [rule, answers])
}

// === Hook: all activated categories ===

/** Get all activated categories for a vulnerability (or all) */
export function useActivatedCategories(
    data: MonkaData,
    answers: Answers,
    vulnFilter?: VulnerabilityId,
): Map<string, ActivatedCategory> {
    return useMemo(
        () => getActivatedCategories(data, answers, vulnFilter),
        [data, answers, vulnFilter],
    )
}

// === Re-exports for pages (avoid engine/ imports) ===

export { evaluateRule, getActivatedCategories }
export { getRulesForMP, getCategoriesForMP, getQuestionText }
export type { Answers, ActivatedCategory }
