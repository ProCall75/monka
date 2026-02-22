/* =============================================
   Supabase Data Layer — Barrel Re-export
   
   V2-08: Split into 3 modules for §2 compliance:
   - dbTypes.ts  — Raw DB type interfaces + MonkaData
   - queries.ts  — fetchAllMonkaData + cache
   - helpers.ts  — All derived helper functions
   
   This file re-exports everything for backwards
   compatibility with existing imports.
   ============================================= */

// DB Types
export type {
    DBVulnerability, DBQuestion, DBMicroParcours,
    DBQuestionMPMapping, DBCategory, DBActivationRule,
    DBScoringQuestion, DBScoringThreshold, DBRecommendation,
    DBMicroTache, DBSuiviQuestion, DBContentBlock, DBCRTemplate,
    MonkaData,
} from './dbTypes'

// Queries
export { fetchAllMonkaData, invalidateCache } from './queries'

// Helpers
export {
    getQuestionsForVuln, getAllQuestions, getMPsForVuln, getMPsForQuestion,
    buildQuestionMPMap, buildMPMap, buildMPVulnMap, buildScoringMap,
    getCategoriesForMP, getCategoriesForVuln,
    getRulesForMP, getRulesForCategory, getRulesForVuln,
    getRecosForCategory, getRecosForMP, getRecosForVuln,
    getMTsForCategory, getMTsForMP, getMTsForVuln,
    getSuiviForVuln, getScoringForVuln, getThresholdsForVuln,
    isScoringQuestion, getMaxScoreForVuln,
    getActiveAidanceBlocks, getActiveQuestions, getTriggerQuestions, getActiveQuestionCount,
    getContentBlock, getContentBlocksForEntity, getQuestionText,
    getCRTemplate, getCRTemplatesForType,
} from './helpers'
