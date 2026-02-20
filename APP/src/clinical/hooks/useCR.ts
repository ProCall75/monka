/* =============================================
   useCR — React hook for CR Médecin generation
   
   Wraps CR template functions with React memoization.
   Re-exports all CR phrase constants and helpers.
   ============================================= */

import { useMemo } from 'react'
import type { MonkaData } from '../../engine/supabaseData'
import {
    getCRTemplate,
    getCRTemplatesForType,
    getActiveQuestions,
    getContentBlock,
    getContentBlocksForEntity,
} from '../../engine/supabaseData'

// Re-export all CR phrase constants, types, and helpers
export {
    CR_VULN_LABELS,
    CR_NIVEAU_DISPLAY,
    CR_PHR_B2,
    CR_PHR_B4_INITIAL,
    CR_PHR_B4_SIG_00,
    CR_OBJECTIFS_CLINIQUES,
    getNiveauForScore,
    generateConclusionPhrases,
    mapObjectifClinique,
    formatActeur,
    type CRNiveau,
} from '../../engine/crMedecinPhrases'

// === Hook: get CR template (memoized) ===

export function useCRTemplate(
    data: MonkaData,
    templateType: string,
    vulnerabilityId?: string | null,
    niveau?: string | null,
) {
    return useMemo(
        () => getCRTemplate(data, templateType, vulnerabilityId, niveau),
        [data, templateType, vulnerabilityId, niveau],
    )
}

// === Re-exports for pages ===

export { getCRTemplate, getCRTemplatesForType, getActiveQuestions }
export { getContentBlock, getContentBlocksForEntity }
