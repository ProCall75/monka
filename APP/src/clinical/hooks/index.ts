/* =============================================
   clinical/hooks — Barrel export
   
   SINGLE IMPORT POINT for all pages.
   Architecture: pages/ → clinical/hooks/ → engine/
   
   Pages MUST NOT import from engine/ directly.
   ============================================= */

// === React Hooks ===
export { useRuleEvaluation, useActivatedCategories } from './useEvaluation'
export { useVulnScore } from './useScoring'
export { useCRTemplate } from './useCR'
export { useVulnStats, type VulnStats } from '../../engine/hooks/useVulnStats'
export { useMonkaData } from '../../engine/useMonkaData'

// === Evaluation (pure functions) ===
export { evaluateRule, getActivatedCategories } from './useEvaluation'
export type { Answers, ActivatedCategory } from './useEvaluation'
export { getRulesForMP, getCategoriesForMP, getQuestionText } from './useEvaluation'

// === Scoring ===
export { computeScore } from './useScoring'
export type { ScoreResult } from './useScoring'
export {
    getThresholdsForVuln,
    buildScoringMap,
    getMaxScoreForVuln,
    getScoringForVuln,
    isScoringQuestion,
} from './useScoring'

// === CR Médecin ===
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
    getCRTemplate,
    getCRTemplatesForType,
    getActiveQuestions,
    getContentBlock,
    getContentBlocksForEntity,
} from './useCR'

// === Data Layer ===
export type {
    MonkaData,
    DBVulnerability,
    DBQuestion,
    DBMicroParcours,
    DBQuestionMPMapping,
    DBCategory,
    DBActivationRule,
    DBScoringQuestion,
    DBScoringThreshold,
    DBRecommendation,
    DBMicroTache,
    DBSuiviQuestion,
    DBContentBlock,
    DBCRTemplate,
} from '../../engine/supabaseData'

export {
    fetchAllMonkaData,
    invalidateCache,
    // Derived helpers
    getQuestionsForVuln,
    getAllQuestions,
    getMPsForVuln,
    getMPsForQuestion,
    buildQuestionMPMap,
    buildMPMap,
    getCategoriesForVuln,
    getRulesForCategory,
    getRulesForVuln,
    getRecosForCategory,
    getRecosForMP,
    getRecosForVuln,
    getMTsForCategory,
    getMTsForMP,
    getMTsForVuln,
    getSuiviForVuln,
    buildMPVulnMap,
    getActiveAidanceBlocks,
    getTriggerQuestions,
    getActiveQuestionCount,
} from '../../engine/supabaseData'

// === Types ===
export type { VulnerabilityId } from '../../engine/types'
export type {
    QuestionCategory,
    QuestionScoring,
    TaskType,
    NiveauActivation,
    NiveauReco,
    Domaine,
    SimulatorTab,
    PhaseStatus,
    RoadmapPhase,
    RoadmapItem,
} from '../../engine/types'

// === Constants ===
export {
    VULN_META,
    VULN_IDS,
    VULN_COLORS,
    type VulnMeta,
} from '../../engine/constants'

// === Engine output types ===
export type { EngineOutput } from '../../engine/clinicalEngine'
export { runEngine } from '../../engine/clinicalEngine'

// === Coverage Matrix (Bloc 13) ===
export { buildCoverageMatrix } from '../../engine/buildCoverageMatrix'
export type { CoverageMatrix, CoverageCell, CoverageStats } from '../../engine/buildCoverageMatrix'
