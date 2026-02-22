/* =============================================
   Queries — Supabase data fetching.
   Split from supabaseData.ts for §2 compliance.
   Architecture: fetch + cache only, no helpers.
   ============================================= */

import { supabase } from '../lib/supabase'
import type {
    MonkaData, DBVulnerability, DBQuestion, DBMicroParcours,
    DBQuestionMPMapping, DBCategory, DBActivationRule,
    DBScoringQuestion, DBScoringThreshold, DBRecommendation,
    DBMicroTache, DBSuiviQuestion, DBContentBlock, DBCRTemplate,
    DBPersona, DBPersonaAnswer,
} from './dbTypes'

// === Cached data store ===

let cachedData: MonkaData | null = null

// === Fetch all data in parallel ===

export async function fetchAllMonkaData(): Promise<MonkaData> {
    if (cachedData?.loaded) return cachedData

    const [
        vulnRes, questRes, mpRes, mappingRes, catRes, rulesRes,
        scorQRes, threshRes, recoRes, mtRes, suiviRes,
        contentBlocksRes, crTemplatesRes, personasRes, personaAnswersRes,
    ] = await Promise.all([
        supabase.from('vulnerabilities').select('*').order('id'),
        supabase.from('questions').select('*').order('vulnerability_id').order('ordre_global'),
        supabase.from('micro_parcours').select('*').order('vulnerability_id').order('id'),
        supabase.from('question_mp_mapping').select('*'),
        supabase.from('categories').select('*').order('mp_id').order('ordre'),
        supabase.from('activation_rules').select('*').order('mp_id').order('id'),
        supabase.from('scoring_questions').select('*').order('vulnerability_id').order('question_id'),
        supabase.from('scoring_thresholds').select('*').order('vulnerability_id').order('min_score'),
        supabase.from('recommendations').select('*').order('mp_id').order('id'),
        supabase.from('micro_taches').select('*').order('mp_id').order('ordre'),
        supabase.from('suivi_questions').select('*').order('vulnerability_id').order('mp_id'),
        supabase.from('content_blocks').select('*').order('entity_type').order('entity_id'),
        supabase.from('cr_templates').select('*').order('template_type').order('vulnerability_id'),
        supabase.from('personas').select('*').order('id'),
        supabase.from('persona_answers').select('*').order('persona_id').order('question_id'),
    ])

    // Check for errors
    const tableNames = ['vulnerabilities', 'questions', 'micro_parcours', 'question_mp_mapping', 'categories', 'activation_rules', 'scoring_questions', 'scoring_thresholds', 'recommendations', 'micro_taches', 'suivi_questions', 'content_blocks', 'cr_templates', 'personas', 'persona_answers']
    const results = [vulnRes, questRes, mpRes, mappingRes, catRes, rulesRes, scorQRes, threshRes, recoRes, mtRes, suiviRes, contentBlocksRes, crTemplatesRes, personasRes, personaAnswersRes]
    const errors = results
        .map((r, i) => r.error ? `${tableNames[i]}: ${r.error.message}` : null)
        .filter(Boolean)

    if (errors.length > 0) {
        return {
            vulnerabilities: [], questions: [], microParcours: [], questionMPMapping: [],
            categories: [], activationRules: [], scoringQuestions: [], scoringThresholds: [],
            recommendations: [], microTaches: [], suiviQuestions: [],
            contentBlocks: [], crTemplates: [], personas: [], personaAnswers: [],
            loaded: false, loading: false, error: errors.join('; '),
        } as MonkaData
    }

    cachedData = {
        vulnerabilities: (vulnRes.data || []) as DBVulnerability[],
        questions: (questRes.data || []) as DBQuestion[],
        microParcours: (mpRes.data || []) as DBMicroParcours[],
        questionMPMapping: (mappingRes.data || []) as DBQuestionMPMapping[],
        categories: (catRes.data || []) as DBCategory[],
        activationRules: (rulesRes.data || []) as DBActivationRule[],
        scoringQuestions: (scorQRes.data || []) as DBScoringQuestion[],
        scoringThresholds: (threshRes.data || []) as DBScoringThreshold[],
        recommendations: (recoRes.data || []) as DBRecommendation[],
        microTaches: (mtRes.data || []) as DBMicroTache[],
        suiviQuestions: (suiviRes.data || []) as DBSuiviQuestion[],
        contentBlocks: (contentBlocksRes.data || []) as DBContentBlock[],
        crTemplates: (crTemplatesRes.data || []) as DBCRTemplate[],
        personas: (personasRes.data || []) as DBPersona[],
        personaAnswers: (personaAnswersRes.data || []) as DBPersonaAnswer[],
        loaded: true, loading: false, error: null,
    }

    return cachedData
}

/** Invalidate cache (for dev/refresh) */
export function invalidateCache() {
    cachedData = null
}
