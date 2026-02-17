/* =============================================
   Supabase Data Layer — Loads ALL Monka data
   from the Supabase Monka project.
   Aligned with v2 DB schema (Feb 2026)
   ============================================= */

import { supabase } from '../lib/supabase'
import type { VulnerabilityId } from './types'

// === Raw DB Types (match Supabase v2 columns) ===

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

export interface DBCategory {
    id: string
    mp_id: string
    nom: string
    description: string | null
    ordre: number
}

export interface DBActivationRule {
    id: string
    category_id: string
    mp_id: string
    niveau: 'critique' | 'ccc' | 'standard'
    condition_logic: Record<string, unknown>[]
    sens_clinique: string | null
    delai_jours: number
    rule_group: string | null
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
    category_id: string
    mp_id: string
    niveau: 'standard' | 'ccc' | 'critique' | 'prevention'
    wording_utilisateur: string
    wording_idec: string
}

export interface DBMicroTache {
    id: string
    category_id: string
    mp_id: string
    libelle: string
    type: 'STRUC' | 'SEC' | 'MED' | 'INFO' | 'ORGA'
    acteur: string[]
    domaine: 'medical' | 'medico_social'
    is_contributive: boolean
    is_prevention: boolean
    is_parametric: boolean
    parametric_mapping: Record<string, unknown> | null
    ordre: number
    wording_idec: string
    wording_utilisateur: string
    wording_std: string | null
    wording_ccc: string | null
    wording_crit: string | null
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

// === Cached data store ===

export interface MonkaData {
    vulnerabilities: DBVulnerability[]
    questions: DBQuestion[]
    microParcours: DBMicroParcours[]
    questionMPMapping: DBQuestionMPMapping[]
    categories: DBCategory[]
    activationRules: DBActivationRule[]
    scoringQuestions: DBScoringQuestion[]
    scoringThresholds: DBScoringThreshold[]
    recommendations: DBRecommendation[]
    microTaches: DBMicroTache[]
    suiviQuestions: DBSuiviQuestion[]
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
        catRes,
        rulesRes,
        scorQRes,
        threshRes,
        recoRes,
        mtRes,
        suiviRes,
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
    ])

    // Check for errors
    const tableNames = ['vulnerabilities', 'questions', 'micro_parcours', 'question_mp_mapping', 'categories', 'activation_rules', 'scoring_questions', 'scoring_thresholds', 'recommendations', 'micro_taches', 'suivi_questions']
    const results = [vulnRes, questRes, mpRes, mappingRes, catRes, rulesRes, scorQRes, threshRes, recoRes, mtRes, suiviRes]
    const errors = results
        .map((r, i) => r.error ? `${tableNames[i]}: ${r.error.message}` : null)
        .filter(Boolean)

    if (errors.length > 0) {
        const errorData: MonkaData = {
            vulnerabilities: [], questions: [], microParcours: [], questionMPMapping: [],
            categories: [], activationRules: [], scoringQuestions: [], scoringThresholds: [],
            recommendations: [], microTaches: [], suiviQuestions: [],
            loaded: false, loading: false, error: errors.join('; '),
        }
        return errorData
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

/** Get categories for a micro-parcours */
export function getCategoriesForMP(data: MonkaData, mpId: string): DBCategory[] {
    return data.categories.filter(c => c.mp_id === mpId)
}

/** Get categories for a vulnerability (via MP) */
export function getCategoriesForVuln(data: MonkaData, v: VulnerabilityId): DBCategory[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.categories.filter(c => mpIds.has(c.mp_id))
}

/** Get activation rules for a micro-parcours */
export function getRulesForMP(data: MonkaData, mpId: string): DBActivationRule[] {
    return data.activationRules.filter(r => r.mp_id === mpId)
}

/** Get activation rules for a category */
export function getRulesForCategory(data: MonkaData, categoryId: string): DBActivationRule[] {
    return data.activationRules.filter(r => r.category_id === categoryId)
}

/** Get activation rules for a vulnerability (via MP) */
export function getRulesForVuln(data: MonkaData, v: VulnerabilityId): DBActivationRule[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.activationRules.filter(r => mpIds.has(r.mp_id))
}

/** Get recommendations for a category */
export function getRecosForCategory(data: MonkaData, categoryId: string): DBRecommendation[] {
    return data.recommendations.filter(r => r.category_id === categoryId)
}

/** Get recommendations for a MP */
export function getRecosForMP(data: MonkaData, mpId: string): DBRecommendation[] {
    return data.recommendations.filter(r => r.mp_id === mpId)
}

/** Get recommendations for a vulnerability (via MP) */
export function getRecosForVuln(data: MonkaData, v: VulnerabilityId): DBRecommendation[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.recommendations.filter(r => mpIds.has(r.mp_id))
}

/** Get micro-taches for a category */
export function getMTsForCategory(data: MonkaData, categoryId: string): DBMicroTache[] {
    return data.microTaches.filter(mt => mt.category_id === categoryId)
}

/** Get micro-taches for a MP */
export function getMTsForMP(data: MonkaData, mpId: string): DBMicroTache[] {
    return data.microTaches.filter(mt => mt.mp_id === mpId)
}

/** Get micro-taches for a vulnerability (via MP) */
export function getMTsForVuln(data: MonkaData, v: VulnerabilityId): DBMicroTache[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.microTaches.filter(mt => mpIds.has(mt.mp_id))
}

/** Get suivi questions for a vulnerability */
export function getSuiviForVuln(data: MonkaData, v: VulnerabilityId): DBSuiviQuestion[] {
    return data.suiviQuestions.filter(sq => sq.vulnerability_id === v)
}

/** Get scoring questions for a vulnerability */
export function getScoringForVuln(data: MonkaData, v: VulnerabilityId): DBScoringQuestion[] {
    return data.scoringQuestions.filter(sq => sq.vulnerability_id === v)
}

/** Get thresholds for a vulnerability */
export function getThresholdsForVuln(data: MonkaData, v: VulnerabilityId): DBScoringThreshold[] {
    return data.scoringThresholds.filter(t => t.vulnerability_id === v)
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



/** Build a map of mp_id -> vulnerability_id */
export function buildMPVulnMap(data: MonkaData): Record<string, string> {
    const map: Record<string, string> = {}
    data.microParcours.forEach(mp => { map[mp.id] = mp.vulnerability_id })
    return map
}

/** Invalidate cache (for dev/refresh) */
export function invalidateCache() {
    cachedData = null
}
