/* =============================================
   useScoring — React hook for scoring computations
   
   Wraps scoring engine functions with React memoization.
   ============================================= */

import { useMemo } from 'react'
import type { MonkaData } from '../../engine/supabaseData'
import type { VulnerabilityId } from '../../engine/types'
import type { Answers, ScoreResult } from '../../engine/clinicalEngine'
import { computeScore } from '../../engine/clinicalEngine'
import {
    getThresholdsForVuln,
    buildScoringMap,
    getMaxScoreForVuln,
    getScoringForVuln,
    isScoringQuestion,
} from '../../engine/supabaseData'

// === Hook: compute score for a vulnerability ===

export function useVulnScore(
    data: MonkaData,
    answers: Answers,
    vulnId: VulnerabilityId,
): ScoreResult {
    return useMemo(
        () => computeScore(data, answers, vulnId),
        [data, answers, vulnId],
    )
}

// === Re-exports for pages ===

export { computeScore }
export { getThresholdsForVuln, buildScoringMap, getMaxScoreForVuln, getScoringForVuln, isScoringQuestion }
export type { ScoreResult }
