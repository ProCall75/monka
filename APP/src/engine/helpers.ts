/* =============================================
   Helpers — Derived data access functions.
   Split from supabaseData.ts for §2 compliance.
   Includes: getXForY, buildXMap, conditional model,
   content blocks, CR templates, question text.
   Architecture: pure functions, no side effects.
   ============================================= */

import type { VulnerabilityId } from './types'
import type {
    MonkaData, DBQuestion, DBMicroParcours, DBCategory,
    DBActivationRule, DBScoringQuestion, DBScoringThreshold,
    DBRecommendation, DBMicroTache, DBSuiviQuestion,
    DBContentBlock, DBCRTemplate,
} from './dbTypes'

// ══════════════════════════════════════════════════════
//  Basic getters
// ══════════════════════════════════════════════════════

export function getQuestionsForVuln(data: MonkaData, v: VulnerabilityId): DBQuestion[] {
    return data.questions.filter(q => q.vulnerability_id === v)
}
export function getAllQuestions(data: MonkaData): DBQuestion[] {
    return data.questions.filter(q => q.vulnerability_id !== null)
}
export function getMPsForVuln(data: MonkaData, v: VulnerabilityId): DBMicroParcours[] {
    return data.microParcours.filter(mp => mp.vulnerability_id === v)
}
export function getMPsForQuestion(data: MonkaData, questionId: string): string[] {
    return data.questionMPMapping.filter(m => m.question_id === questionId).map(m => m.mp_id)
}

// ══════════════════════════════════════════════════════
//  Build maps
// ══════════════════════════════════════════════════════

export function buildQuestionMPMap(data: MonkaData): Record<string, string[]> {
    const map: Record<string, string[]> = {}
    data.questionMPMapping.forEach(m => {
        if (!map[m.question_id]) map[m.question_id] = []
        map[m.question_id].push(m.mp_id)
    })
    return map
}
export function buildMPMap(data: MonkaData): Record<string, DBMicroParcours> {
    const map: Record<string, DBMicroParcours> = {}
    data.microParcours.forEach(mp => { map[mp.id] = mp })
    return map
}
export function buildMPVulnMap(data: MonkaData): Record<string, string> {
    const map: Record<string, string> = {}
    data.microParcours.forEach(mp => { map[mp.id] = mp.vulnerability_id })
    return map
}
export function buildScoringMap(data: MonkaData): Record<string, Record<string, number>> {
    const map: Record<string, Record<string, number>> = {}
    data.scoringQuestions.forEach(sq => {
        if (!map[sq.question_id]) map[sq.question_id] = {}
        map[sq.question_id][sq.response_text] = sq.score
    })
    return map
}

// ══════════════════════════════════════════════════════
//  Per-entity getters
// ══════════════════════════════════════════════════════

export function getCategoriesForMP(data: MonkaData, mpId: string): DBCategory[] {
    return data.categories.filter(c => c.mp_id === mpId)
}
export function getCategoriesForVuln(data: MonkaData, v: VulnerabilityId): DBCategory[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.categories.filter(c => mpIds.has(c.mp_id))
}
export function getRulesForMP(data: MonkaData, mpId: string): DBActivationRule[] {
    return data.activationRules.filter(r => r.mp_id === mpId)
}
export function getRulesForCategory(data: MonkaData, categoryId: string): DBActivationRule[] {
    return data.activationRules.filter(r => r.category_id === categoryId)
}
export function getRulesForVuln(data: MonkaData, v: VulnerabilityId): DBActivationRule[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.activationRules.filter(r => mpIds.has(r.mp_id))
}
export function getRecosForCategory(data: MonkaData, categoryId: string): DBRecommendation[] {
    return data.recommendations.filter(r => r.category_id === categoryId)
}
export function getRecosForMP(data: MonkaData, mpId: string): DBRecommendation[] {
    return data.recommendations.filter(r => r.mp_id === mpId)
}
export function getRecosForVuln(data: MonkaData, v: VulnerabilityId): DBRecommendation[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.recommendations.filter(r => mpIds.has(r.mp_id))
}
export function getMTsForCategory(data: MonkaData, categoryId: string): DBMicroTache[] {
    return data.microTaches.filter(mt => mt.category_id === categoryId)
}
export function getMTsForMP(data: MonkaData, mpId: string): DBMicroTache[] {
    return data.microTaches.filter(mt => mt.mp_id === mpId)
}
export function getMTsForVuln(data: MonkaData, v: VulnerabilityId): DBMicroTache[] {
    const mpIds = new Set(getMPsForVuln(data, v).map(mp => mp.id))
    return data.microTaches.filter(mt => mpIds.has(mt.mp_id))
}
export function getSuiviForVuln(data: MonkaData, v: VulnerabilityId): DBSuiviQuestion[] {
    return data.suiviQuestions.filter(sq => sq.vulnerability_id === v)
}
export function getScoringForVuln(data: MonkaData, v: VulnerabilityId): DBScoringQuestion[] {
    return data.scoringQuestions.filter(sq => sq.vulnerability_id === v)
}
export function getThresholdsForVuln(data: MonkaData, v: VulnerabilityId): DBScoringThreshold[] {
    return data.scoringThresholds.filter(t => t.vulnerability_id === v)
}
export function isScoringQuestion(data: MonkaData, questionId: string): boolean {
    return data.scoringQuestions.some(sq => sq.question_id === questionId)
}
export function getMaxScoreForVuln(data: MonkaData, v: VulnerabilityId): number {
    const sq = data.scoringQuestions.find(s => s.vulnerability_id === v)
    return sq?.max_score_vulnerability || 0
}

// ══════════════════════════════════════════════════════
//  ADDITIVE MODEL — Conditional question filtering
// ══════════════════════════════════════════════════════

const N3_TO_AIDANCE_BLOCKS: Record<string, string[]> = {
    "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative": ['Personne Agée'],
    "J'aide une personne en situation de handicap": ['Handicap'],
    "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)": ['Maladie Chronique'],
    "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)": ['Psy'],
    "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)": ['Addiction'],
}
const ENFANT_AGE_BRACKETS = ['- 15 ans', '15-20 ans']
const SENIOR_AGE_BRACKETS = ['60-75 ans', '+75 ans']
const ENFANT_ELIGIBLE_AIDANCE = ['Handicap', 'Maladie Chronique', 'Psy', 'Addiction']

export function getActiveAidanceBlocks(answers: Record<string, string>): Set<string> {
    const blocks = new Set<string>(['Tous'])
    const n3Answer = answers['N3']
    if (n3Answer) {
        const n3Values = n3Answer.includes('|') ? n3Answer.split('|').map(s => s.trim()) : [n3Answer]
        for (const n3Val of n3Values) {
            const tags = N3_TO_AIDANCE_BLOCKS[n3Val]
            if (tags) tags.forEach(tag => blocks.add(tag))
        }
    }
    const o1Answer = answers['O1']
    if (o1Answer && ENFANT_AGE_BRACKETS.includes(o1Answer)) blocks.delete('Personne Agée')
    if (o1Answer && ENFANT_AGE_BRACKETS.includes(o1Answer) && !SENIOR_AGE_BRACKETS.includes(o1Answer)) {
        const activeNonTous = [...blocks].filter(b => b !== 'Tous')
        if (activeNonTous.some(b => ENFANT_ELIGIBLE_AIDANCE.includes(b))) blocks.add('Enfant')
    }
    return blocks
}

export function getActiveQuestions(data: MonkaData, answers: Record<string, string>): DBQuestion[] {
    const activeBlocks = getActiveAidanceBlocks(answers)
    return data.questions.filter(q => {
        if (q.is_trigger) return false
        if (!q.aidance) return true
        return activeBlocks.has(q.aidance)
    })
}
export function getTriggerQuestions(data: MonkaData): DBQuestion[] {
    return data.questions.filter(q => q.is_trigger)
}
export function getActiveQuestionCount(data: MonkaData, answers: Record<string, string>): number {
    return getActiveQuestions(data, answers).length
}

// ══════════════════════════════════════════════════════
//  Content Blocks + CR Templates + Question Text
// ══════════════════════════════════════════════════════

export function getContentBlock(data: MonkaData, entityType: string, entityId: string, blockType: string): DBContentBlock | null {
    return data.contentBlocks.find(cb => cb.entity_type === entityType && cb.entity_id === entityId && cb.block_type === blockType) || null
}
export function getContentBlocksForEntity(data: MonkaData, entityType: string, entityId: string): DBContentBlock[] {
    return data.contentBlocks.filter(cb => cb.entity_type === entityType && cb.entity_id === entityId)
}
export function getQuestionText(data: MonkaData, questionId: string): string {
    const q = data.questions.find(q => q.id === questionId)
    return q?.question_text || questionId
}
export function getCRTemplate(data: MonkaData, templateType: string, vulnerabilityId?: string | null, niveau?: string | null): DBCRTemplate | null {
    return data.crTemplates.find(t =>
        t.template_type === templateType &&
        (vulnerabilityId ? t.vulnerability_id === vulnerabilityId : !t.vulnerability_id) &&
        (niveau ? t.niveau === niveau : !t.niveau)
    ) || null
}
export function getCRTemplatesForType(data: MonkaData, templateType: string): DBCRTemplate[] {
    return data.crTemplates.filter(t => t.template_type === templateType)
}
