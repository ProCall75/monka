/* =============================================
   Engine Types — Monka Clinical Engine
   Aligned with v2 DB schema (Feb 2026)
   ============================================= */

// === Question Types ===

export type QuestionCategory = 'etat' | 'facteur' | 'trigger' | 'suivi'
export type QuestionScoring = 'scorante' | 'non_scorante'

// === Vulnerability ===

export type VulnerabilityId = 'V1' | 'V2' | 'V3' | 'V4' | 'V5'

// === Micro-Task Types ===

export type TaskType = 'STRUC' | 'SEC' | 'MED' | 'INFO' | 'ORGA'

// === Activation Levels ===

export type NiveauActivation = 'standard' | 'ccc' | 'critique'
export type NiveauReco = 'standard' | 'ccc' | 'critique' | 'prevention'

// === Domaine ===

export type Domaine = 'medical' | 'medico_social'

// === App State ===

export type SimulatorTab =
    | 'questionnaire'
    | 'scoring'
    | 'categories'
    | 'recommendations'
    | 'rules'
    | 'tasks'
    | 'summary'

// === Roadmap ===

export type PhaseStatus = 'done' | 'in-progress' | 'pending' | 'blocked'

export interface RoadmapPhase {
    id: number
    name: string
    description: string
    status: PhaseStatus
    progress: number // 0-100
    items: RoadmapItem[]
}

export interface RoadmapItem {
    text: string
    status: 'done' | 'in-progress' | 'pending' | 'blocked'
    blocking?: string
}
