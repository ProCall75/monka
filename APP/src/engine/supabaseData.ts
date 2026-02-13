/* =============================================
   Supabase Data Layer — Loads ALL Monka data
   from the Supabase Monka project.
   ============================================= */

import { supabase } from '../lib/supabase'
import type { VulnerabilityId } from './types'

// === Raw DB Types (match Supabase columns) ===

export interface DBVulnerability {
    id: string
    name: string
    bloc_id: number | null
    bloc_label: string | null
    question_count: number | null
}

export interface DBQuestion {
    id: string
    ordre_global: number | null
    vulnerability_id: string | null
    bloc_id: number | null
    bloc: string | null
    sous_bloc: string | null
    question_text: string
    response_type: string | null
    response_options: string[] | null
    is_trigger: boolean | null
    classification: string | null
    aidance: string | null
    sous_categorie_ref: string | null
}

export interface DBMicroParcours {
    id: string
    vulnerability_id: string
    nom: string
    objectif: string | null
    signature_a: string | null
    signature_b: string | null
}

export interface DBQuestionMPMapping {
    id: number
    question_id: string
    mp_id: string
    source: string
}

export interface DBActivationRule {
    id: string
    vulnerability_id: string
    mp_id: string
    niveau: 'critique' | 'ccc' | 'standard'
    question_ids: string[]
    condition_logic: Record<string, unknown>
    sens_clinique: string | null
    source: string
}

export interface DBScoringQuestion {
    id: number
    question_id: string
    vulnerability_id: string
    response_text: string
    score: number
    max_score_vulnerability: number | null
}

export interface DBScoringThreshold {
    id: number
    vulnerability_id: string
    level: string
    min_score: number
    max_score: number
    description: string | null
}

export interface DBRecommendation {
    id: string
    mp_id: string
    vulnerability_id: string
    activation_rule_id: string | null
    niveau: string | null
    texte_utilisateur: string
    acteurs: string[] | null
    idec_actions: string | null
    questions_source: string[] | null
    legacy_count: number | null
    rule_assignment: string | null
    merged_texts: string[] | null
}

export interface DBMicroTache {
    id: string
    vulnerability_id: string
    question_id: string | null
    response_context: string | null
    libelle: string
    type: 'STRUC' | 'SEC' | 'MED' | 'INFO' | 'ORGA'
    justification: string | null
    reco_id: string | null
    domaine: string | null
    acteur: string | null
}

export interface DBSuiviQuestion {
    id: string
    niveau: number
    question_text: string
    response_type: string
    vulnerability_id: string | null
    mp_id: string | null
    parent_id: string | null
    questions_reouvertes: string[] | null
}

export interface DBASR {
    id: string
    mp_id: string
    vulnerability_id: string
    signature: string
    objectif: string | null
}

// === Cached data store ===

export interface MonkaData {
    vulnerabilities: DBVulnerability[]
    questions: DBQuestion[]
    microParcours: DBMicroParcours[]
    questionMPMapping: DBQuestionMPMapping[]
    activationRules: DBActivationRule[]
    scoringQuestions: DBScoringQuestion[]
    scoringThresholds: DBScoringThreshold[]
    recommendations: DBRecommendation[]
    microTaches: DBMicroTache[]
    suiviQuestions: DBSuiviQuestion[]
    asrs: DBASR[]
    loaded: boolean
    loading: boolean
    error: string | null
}

let cachedData: MonkaData | null = null

// === Fetch all data in parallel ===

export async function fetchAllMonkaData(): Promise<MonkaData> {
    if (cachedData?.loaded) return cachedData

    const [
        vulnRes,
        questRes,
        mpRes,
        mappingRes,
        rulesRes,
        scorQRes,
        threshRes,
        recoRes,
        mtRes,
        suiviRes,
        asrRes,
    ] = await Promise.all([
        supabase.from('vulnerabilities').select('*').order('id'),
        supabase.from('questions').select('*').order('vulnerability_id').order('ordre_global'),
        supabase.from('micro_parcours').select('*').order('vulnerability_id').order('id'),
        supabase.from('question_mp_mapping').select('*'),
        supabase.from('activation_rules').select('*').order('vulnerability_id').order('mp_id'),
        supabase.from('scoring_questions').select('*').order('vulnerability_id').order('question_id'),
        supabase.from('scoring_thresholds').select('*').order('vulnerability_id').order('min_score'),
        supabase.from('recommendations').select('*').order('vulnerability_id').order('mp_id'),
        supabase.from('micro_taches').select('*').order('vulnerability_id'),
        supabase.from('suivi_questions').select('*').order('vulnerability_id').order('mp_id'),
        supabase.from('asr').select('*').order('vulnerability_id').order('id'),
    ])

    // Check for errors
    const errors = [vulnRes, questRes, mpRes, mappingRes, rulesRes, scorQRes, threshRes, recoRes, mtRes, suiviRes, asrRes]
        .map((r, i) => r.error ? `Table ${i}: ${r.error.message}` : null)
        .filter(Boolean)

    if (errors.length > 0) {
        const errorData: MonkaData = {
            vulnerabilities: [], questions: [], microParcours: [], questionMPMapping: [],
            activationRules: [], scoringQuestions: [], scoringThresholds: [],
            recommendations: [], microTaches: [], suiviQuestions: [], asrs: [],
            loaded: false, loading: false, error: errors.join('; '),
        }
        return errorData
    }

    cachedData = {
        vulnerabilities: (vulnRes.data || []) as DBVulnerability[],
        questions: (questRes.data || []) as DBQuestion[],
        microParcours: (mpRes.data || []) as DBMicroParcours[],
        questionMPMapping: (mappingRes.data || []) as DBQuestionMPMapping[],
        activationRules: (rulesRes.data || []) as DBActivationRule[],
        scoringQuestions: (scorQRes.data || []) as DBScoringQuestion[],
        scoringThresholds: (threshRes.data || []) as DBScoringThreshold[],
        recommendations: (recoRes.data || []) as DBRecommendation[],
        microTaches: (mtRes.data || []) as DBMicroTache[],
        suiviQuestions: (suiviRes.data || []) as DBSuiviQuestion[],
        asrs: (asrRes.data || []) as DBASR[],
        loaded: true,
        loading: false,
        error: null,
    }

    return cachedData
}

// === Derived helpers ===

/** Get questions for a specific vulnerability */
export function getQuestionsForVuln(data: MonkaData, v: VulnerabilityId): DBQuestion[] {
    return data.questions.filter(q => q.vulnerability_id === v)
}

/** Get all questions across all V */
export function getAllQuestions(data: MonkaData): DBQuestion[] {
    return data.questions.filter(q => q.vulnerability_id !== null)
}

/** Get micro-parcours for a vulnerability */
export function getMPsForVuln(data: MonkaData, v: VulnerabilityId): DBMicroParcours[] {
    return data.microParcours.filter(mp => mp.vulnerability_id === v)
}

/** Get ASRs for a vulnerability */
export function getASRsForVuln(data: MonkaData, v: VulnerabilityId): DBASR[] {
    return data.asrs.filter(a => a.vulnerability_id === v)
}

/** Get all MP IDs mapped to a question */
export function getMPsForQuestion(data: MonkaData, questionId: string): string[] {
    return data.questionMPMapping
        .filter(m => m.question_id === questionId)
        .map(m => m.mp_id)
}

/** Build a map of question_id -> mp_ids */
export function buildQuestionMPMap(data: MonkaData): Record<string, string[]> {
    const map: Record<string, string[]> = {}
    data.questionMPMapping.forEach(m => {
        if (!map[m.question_id]) map[m.question_id] = []
        map[m.question_id].push(m.mp_id)
    })
    return map
}

/** Build a map of mp_id -> micro_parcours object */
export function buildMPMap(data: MonkaData): Record<string, DBMicroParcours> {
    const map: Record<string, DBMicroParcours> = {}
    data.microParcours.forEach(mp => { map[mp.id] = mp })
    return map
}

/** Get scoring questions for a vulnerability */
export function getScoringForVuln(data: MonkaData, v: VulnerabilityId): DBScoringQuestion[] {
    return data.scoringQuestions.filter(sq => sq.vulnerability_id === v)
}

/** Get thresholds for a vulnerability */
export function getThresholdsForVuln(data: MonkaData, v: VulnerabilityId): DBScoringThreshold[] {
    return data.scoringThresholds.filter(t => t.vulnerability_id === v)
}

/** Get activation rules for a vulnerability */
export function getActivationRulesForVuln(data: MonkaData, v: VulnerabilityId): DBActivationRule[] {
    return data.activationRules.filter(r => r.vulnerability_id === v)
}

/** Get recommendations for a vulnerability */
export function getRecommendationsForVuln(data: MonkaData, v: VulnerabilityId): DBRecommendation[] {
    return data.recommendations.filter(r => r.vulnerability_id === v)
}

/** Get micro-taches for a vulnerability */
export function getMicroTachesForVuln(data: MonkaData, v: VulnerabilityId): DBMicroTache[] {
    return data.microTaches.filter(mt => mt.vulnerability_id === v)
}

/** Get suivi questions for a vulnerability */
export function getSuiviForVuln(data: MonkaData, v: VulnerabilityId): DBSuiviQuestion[] {
    return data.suiviQuestions.filter(sq => sq.vulnerability_id === v)
}

/** Determine if a question is scoring based on scoring_questions table */
export function isScoringQuestion(data: MonkaData, questionId: string): boolean {
    return data.scoringQuestions.some(sq => sq.question_id === questionId)
}

/** Build scoring map: question_id -> { response_text -> score } */
export function buildScoringMap(data: MonkaData): Record<string, Record<string, number>> {
    const map: Record<string, Record<string, number>> = {}
    data.scoringQuestions.forEach(sq => {
        if (!map[sq.question_id]) map[sq.question_id] = {}
        map[sq.question_id][sq.response_text] = sq.score
    })
    return map
}

/** Get max score for a vulnerability */
export function getMaxScoreForVuln(data: MonkaData, v: VulnerabilityId): number {
    const sq = data.scoringQuestions.find(s => s.vulnerability_id === v)
    return sq?.max_score_vulnerability || 0
}

/** Invalidate cache (for dev/refresh) */
export function invalidateCache() {
    cachedData = null
}
