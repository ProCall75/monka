/* =============================================
   CR Médecin — Référentiel de phrases normées (CR_PHR)
   
   Projection passive de l'état moteur Monka.
   Aucune valeur diagnostique ni prescriptive.
   Référentiel fermé — aucun texte libre autorisé.
   
   Source : Legacy CR Médecin 030226 + scoring_thresholds
   ============================================= */

import type { VulnerabilityId } from './types'

// === Labels médicaux officiels (CR) ===

export const CR_VULN_LABELS: Record<VulnerabilityId, string> = {
    V1: 'Vulnérabilité sociale et relationnelle',
    V2: 'Vulnérabilité administrative',
    V3: 'Santé physique et psychologique de l\'aidant',
    V4: 'Fragilité du proche aidé',
    V5: 'Parcours médical du proche aidé',
}

// === Niveaux qualitatifs ===

export type CRNiveau = 'faible' | 'modere' | 'eleve' | 'critique'

export const CR_NIVEAU_DISPLAY: Record<CRNiveau, { label: string; emoji: string; color: string }> = {
    faible: { label: 'Faible', emoji: '🟢', color: '#00DC82' },
    modere: { label: 'Modéré', emoji: '🟠', color: '#F5A623' },
    eleve: { label: 'Élevé', emoji: '🔴', color: '#EF4444' },
    critique: { label: 'Critique', emoji: '🔴', color: '#DC2626' },
}

// === BLOC 2 — Phrases de synthèse situationnelle ===
// Clé : `${VulnerabilityId}_${niveau}`

export const CR_PHR_B2: Record<string, string> = {
    // V1 — Social et relationnel
    V1_faible: 'La situation sociale et relationnelle de la dyade ne présente pas de signal de vulnérabilité significatif. Les liens sociaux et le soutien de l\'entourage apparaissent préservés.',
    V1_modere: 'Des signaux de vigilance sont identifiés concernant la vie sociale et relationnelle de la dyade. Un impact modéré de l\'aidance sur les relations et la vie personnelle est observé.',
    V1_eleve: 'La vulnérabilité sociale et relationnelle est élevée. L\'isolement, les tensions relationnelles ou l\'impact sur la vie personnelle nécessitent des actions prioritaires de soutien.',
    V1_critique: 'Vulnérabilité sociale et relationnelle critique. L\'isolement et les difficultés relationnelles majeures nécessitent une intervention urgente pour préserver l\'équilibre de la dyade.',

    // V2 — Administrative
    V2_faible: 'La situation administrative est stable. Les démarches et couvertures apparaissent en ordre.',
    V2_modere: 'Des démarches administratives sont incomplètes ou en cours. Une vigilance est recommandée pour sécuriser la situation.',
    V2_eleve: 'La charge administrative est importante. Des lacunes significatives dans les protections ou démarches nécessitent des actions prioritaires.',
    V2_critique: 'Situation administrative critique. Des protections essentielles manquent ou sont menacées, nécessitant une intervention urgente.',

    // V3 — Santé de l'aidant
    V3_faible: 'La santé physique et psychologique de l\'aidant apparaît préservée. Aucun signal d\'épuisement significatif n\'est détecté.',
    V3_modere: 'Un risque d\'épuisement modéré est identifié chez l\'aidant. Des signes de fatigue ou de tension psychologique sont observés.',
    V3_eleve: 'Un épuisement probable de l\'aidant est détecté. Un soutien psychologique et un allègement de la charge sont nécessaires.',
    V3_critique: 'Épuisement avancé de l\'aidant détecté. La situation nécessite une intervention urgente pour préserver la santé de l\'aidant et la continuité de l\'aide.',

    // V4 — Fragilité du proche
    V4_faible: 'La fragilité du proche aidé est faible. Son état global ne présente pas de signal d\'alerte majeur.',
    V4_modere: 'Une fragilité modérée du proche aidé est identifiée. Un suivi régulier est recommandé pour anticiper une éventuelle dégradation.',
    V4_eleve: 'La fragilité du proche aidé est élevée. Des actions prioritaires sont nécessaires pour sécuriser sa prise en charge.',
    V4_critique: 'Fragilité critique du proche aidé. L\'état de santé et la dépendance nécessitent une mobilisation urgente du réseau de soins.',

    // V5 — Parcours médical
    V5_faible: 'Le parcours médical du proche aidé apparaît structuré et coordonné. Aucune rupture significative n\'est identifiée.',
    V5_modere: 'Des points de vigilance sont identifiés dans le parcours médical du proche. La coordination des soins mérite une attention particulière.',
    V5_eleve: 'Le parcours médical du proche aidé présente des fragilités importantes. Des ruptures de parcours ou des difficultés de coordination nécessitent des actions prioritaires.',
    V5_critique: 'Parcours médical du proche en situation critique. Des ruptures majeures dans la coordination des soins nécessitent une intervention urgente.',
}

// === BLOC 3 — Objectifs cliniques fermés ===

export const CR_OBJECTIFS_CLINIQUES = [
    'Sécurisation',
    'Continuité',
    'Soutenabilité',
] as const

// Helper: map MP objectif to the closest clinical objective
export function mapObjectifClinique(objectif: string): string {
    const lower = objectif.toLowerCase()
    if (lower.includes('sécuris') || lower.includes('protec') || lower.includes('couvert')) return 'Sécurisation'
    if (lower.includes('continu') || lower.includes('coordin') || lower.includes('suivi') || lower.includes('parcours')) return 'Continuité'
    if (lower.includes('souten') || lower.includes('allèg') || lower.includes('renforc') || lower.includes('amélio') || lower.includes('limit') || lower.includes('mainteni')) return 'Soutenabilité'
    return 'Soutenabilité' // default
}

// === BLOC 4 — Suivi longitudinal (T-1 vs T) ===

export const CR_PHR_B4_INITIAL = 'Première évaluation — aucun point de comparaison disponible.'

export const CR_PHR_B4_SIG_00 = 'Aucun nouveau signal détecté depuis la dernière évaluation.'

// === BLOC 5 — Conclusion programmée ===
// 3 phrases : état → structuration → dynamique

export function generateConclusionPhrases(
    niveaux: Record<VulnerabilityId, CRNiveau>,
    activatedMPCount: number,
): string[] {
    const phrases: string[] = []

    // Phrase 1: État global
    const critiques = Object.values(niveaux).filter(n => n === 'critique').length
    const elevees = Object.values(niveaux).filter(n => n === 'eleve').length
    const moderees = Object.values(niveaux).filter(n => n === 'modere').length

    if (critiques >= 2) {
        phrases.push('La situation de la dyade présente des vulnérabilités critiques multiples nécessitant une mobilisation prioritaire.')
    } else if (critiques === 1) {
        phrases.push('Une vulnérabilité critique est identifiée, nécessitant une attention immédiate dans la coordination de l\'accompagnement.')
    } else if (elevees >= 2) {
        phrases.push('Plusieurs vulnérabilités élevées sont identifiées, nécessitant un suivi renforcé et des actions structurantes.')
    } else if (elevees === 1) {
        phrases.push('Une vulnérabilité élevée est identifiée aux côtés d\'une situation globalement maîtrisée sur les autres dimensions.')
    } else if (moderees >= 2) {
        phrases.push('La situation présente des signaux de vigilance modérés sur plusieurs dimensions, justifiant un suivi attentif.')
    } else {
        phrases.push('La situation globale de la dyade ne présente pas de signal de vulnérabilité majeur à ce stade.')
    }

    // Phrase 2: Structuration (MPs)
    if (activatedMPCount >= 5) {
        phrases.push('Le dispositif a identifié un nombre important d\'axes de structuration, reflétant la complexité de la situation.')
    } else if (activatedMPCount >= 3) {
        phrases.push('Plusieurs axes de structuration ont été identifiés et priorisés pour accompagner la dyade.')
    } else if (activatedMPCount >= 1) {
        phrases.push('Un nombre limité d\'axes de structuration a été identifié, permettant un accompagnement ciblé.')
    } else {
        phrases.push('Aucun axe de structuration spécifique n\'a été activé à ce stade.')
    }

    // Phrase 3: Dynamique / temporalité
    phrases.push('Première évaluation réalisée — un suivi longitudinal est recommandé à 3 mois pour observer la dynamique d\'évolution.')

    return phrases
}

// === Helpers ===

export function getNiveauForScore(
    score: number,
    thresholds: Array<{ level: string; min_score: number; max_score: number }>,
): CRNiveau {
    for (const t of thresholds) {
        if (score >= t.min_score && score <= t.max_score) {
            return t.level as CRNiveau
        }
    }
    return 'faible'
}

// Format acteur ID to human-readable label
export function formatActeur(acteur: string): string {
    return acteur
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b[a-z]/g, l => l.toUpperCase())
        .replace(/\bIdec\b/i, 'IDEC')
        .replace(/\bApa\b/i, 'APA')
        .replace(/\bMdph\b/i, 'MDPH')
        .replace(/\bEhpad\b/i, 'EHPAD')
        .replace(/\bSsiad\b/i, 'SSIAD')
        .replace(/\bCnrs\b/i, 'CNRS')
        .replace(/\bArs\b/i, 'ARS')
}
