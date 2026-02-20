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

export interface DBContentBlock {
    id: string
    entity_type: string   // 'question' | 'micro_parcours' | 'activation_rule' | 'vulnerability' | 'category'
    entity_id: string
    block_type: string    // 'explication_clinique' | 'pourquoi_cette_question' | 'sens_kernel' | 'objectif'
    content: string
    ordre: number
    created_at: string
}

export interface DBCRTemplate {
    id: string
    template_type: string  // 'header' | 'bloc_vuln' | 'bloc_mp' | 'conclusion' | 'prevention'
    vulnerability_id: string | null
    niveau: string | null  // 'faible' | 'modere' | 'eleve' | 'critique'
    content: string
    variables: string[] | null
    created_at: string
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
    contentBlocks: DBContentBlock[]
    crTemplates: DBCRTemplate[]
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
        contentBlocksRes,
        crTemplatesRes,
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
    ])

    // Check for errors
    const tableNames = ['vulnerabilities', 'questions', 'micro_parcours', 'question_mp_mapping', 'categories', 'activation_rules', 'scoring_questions', 'scoring_thresholds', 'recommendations', 'micro_taches', 'suivi_questions', 'content_blocks', 'cr_templates']
    const results = [vulnRes, questRes, mpRes, mappingRes, catRes, rulesRes, scorQRes, threshRes, recoRes, mtRes, suiviRes, contentBlocksRes, crTemplatesRes]
    const errors = results
        .map((r, i) => r.error ? `${tableNames[i]}: ${r.error.message}` : null)
        .filter(Boolean)

    if (errors.length > 0) {
        const errorData: MonkaData = {
            vulnerabilities: [], questions: [], microParcours: [], questionMPMapping: [],
            categories: [], activationRules: [], scoringQuestions: [], scoringThresholds: [],
            recommendations: [], microTaches: [], suiviQuestions: [],
            contentBlocks: [], crTemplates: [],
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
        contentBlocks: (contentBlocksRes.data || []) as DBContentBlock[],
        crTemplates: (crTemplatesRes.data || []) as DBCRTemplate[],
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

// ══════════════════════════════════════════════════════
//  ADDITIVE MODEL — Conditional question filtering
//  Based on METHODE_VERSIONING_PERSONAS.md
// ══════════════════════════════════════════════════════

/**
 * Maps N3 response text → aidance tag(s) that should be activated.
 * Each N3 response maps to exactly ONE aidance block (1:1 mapping).
 * "Maladie Chronique" has its own bloc (currently 0 conditional questions — covered by socle).
 */
const N3_TO_AIDANCE_BLOCKS: Record<string, string[]> = {
    "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative": ['Personne Agée'],
    "J'aide une personne en situation de handicap": ['Handicap'],
    "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)": ['Maladie Chronique'],
    "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)": ['Psy'],
    "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)": ['Addiction'],
}

/** Age bracket values from O1 that trigger the "Enfant" block */
const ENFANT_AGE_BRACKETS = ['- 15 ans', '15-20 ans']
/** Age bracket values from O1 that indicate a senior (60+) — Enfant block NOT allowed */
const SENIOR_AGE_BRACKETS = ['60-75 ans', '+75 ans']
/** Aidance types that allow the Enfant block (all except "Personne Agée" = perte d'autonomie) */
const ENFANT_ELIGIBLE_AIDANCE = ['Handicap', 'Maladie Chronique', 'Psy', 'Addiction']

/**
 * Given the current answers, determine which aidance blocks are active.
 * Returns the set of aidance tags (e.g. ["Tous", "Handicap", "Enfant"]).
 */
export function getActiveAidanceBlocks(answers: Record<string, string>): Set<string> {
    const blocks = new Set<string>(['Tous'])

    const n3Answer = answers['N3']
    if (n3Answer) {
        // N3 can be multi-choice (future) — handle pipe-separated or single
        const n3Values = n3Answer.includes('|') ? n3Answer.split('|').map(s => s.trim()) : [n3Answer]
        for (const n3Val of n3Values) {
            const aidanceTags = N3_TO_AIDANCE_BLOCKS[n3Val]
            if (aidanceTags) {
                aidanceTags.forEach(tag => blocks.add(tag))
            }
        }
    }

    const o1Answer = answers['O1']

    // === Faux amis filter ===
    // "Personne Agée" (perte d'autonomie liée au vieillissement) is meaningless for < 18 ans
    if (o1Answer && ENFANT_AGE_BRACKETS.includes(o1Answer)) {
        blocks.delete('Personne Agée')
    }

    // Enfant block: activated if O1 < 18 AND at least one eligible aidance is active
    // NOT activated if O1 ≥ 60 (senior → no "Enfant" block)
    if (o1Answer && ENFANT_AGE_BRACKETS.includes(o1Answer) && !SENIOR_AGE_BRACKETS.includes(o1Answer)) {
        const activeNonTous = [...blocks].filter(b => b !== 'Tous')
        if (activeNonTous.some(b => ENFANT_ELIGIBLE_AIDANCE.includes(b))) {
            blocks.add('Enfant')
        }
    }

    return blocks
}

/**
 * Filter questions to only show those relevant for the current profile.
 * Implements the additive model: socle (aidance=Tous) + activated blocks.
 * Triggers are always excluded.
 */
export function getActiveQuestions(data: MonkaData, answers: Record<string, string>): DBQuestion[] {
    const activeBlocks = getActiveAidanceBlocks(answers)
    return data.questions.filter(q => {
        if (q.is_trigger) return false
        if (!q.aidance) return true // No aidance tag = always show
        return activeBlocks.has(q.aidance)
    })
}

/**
 * Get only the trigger questions (N1, N3, O1, etc.).
 * These are the profiling questions that determine aidance blocks.
 */
export function getTriggerQuestions(data: MonkaData): DBQuestion[] {
    return data.questions.filter(q => q.is_trigger)
}

/**
 * Get the expected question count for a given set of answers.
 * Returns the number of active (non-trigger) questions.
 */
export function getActiveQuestionCount(data: MonkaData, answers: Record<string, string>): number {
    return getActiveQuestions(data, answers).length
}

// ══════════════════════════════════════════════════════
//  Content Blocks — Clinical explanations & tooltips
// ══════════════════════════════════════════════════════

/** Get a specific content block for an entity */
export function getContentBlock(
    data: MonkaData,
    entityType: string,
    entityId: string,
    blockType: string,
): DBContentBlock | null {
    return data.contentBlocks.find(
        cb => cb.entity_type === entityType && cb.entity_id === entityId && cb.block_type === blockType
    ) || null
}

/** Get all content blocks for a given entity */
export function getContentBlocksForEntity(
    data: MonkaData,
    entityType: string,
    entityId: string,
): DBContentBlock[] {
    return data.contentBlocks.filter(
        cb => cb.entity_type === entityType && cb.entity_id === entityId
    )
}

/** Resolve a question ID to its full French text */
export function getQuestionText(data: MonkaData, questionId: string): string {
    const q = data.questions.find(q => q.id === questionId)
    return q?.question_text || questionId
}

// ══════════════════════════════════════════════════════
//  CR Templates — Professional report content
// ══════════════════════════════════════════════════════

/** Get a specific CR template */
export function getCRTemplate(
    data: MonkaData,
    templateType: string,
    vulnerabilityId?: string | null,
    niveau?: string | null,
): DBCRTemplate | null {
    return data.crTemplates.find(t =>
        t.template_type === templateType &&
        (vulnerabilityId ? t.vulnerability_id === vulnerabilityId : !t.vulnerability_id) &&
        (niveau ? t.niveau === niveau : !t.niveau)
    ) || null
}

/** Get all CR templates for a given type */
export function getCRTemplatesForType(data: MonkaData, templateType: string): DBCRTemplate[] {
    return data.crTemplates.filter(t => t.template_type === templateType)
}

/** Invalidate cache (for dev/refresh) */
export function invalidateCache() {
    cachedData = null
}
