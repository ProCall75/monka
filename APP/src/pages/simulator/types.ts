/* =============================================
   Simulator — Shared Types & Context
   
   Types and interfaces shared between all simulator
   tab components. Centralizes the props contract.
   ============================================= */

import type { MonkaData } from '../../clinical/hooks'

/** Tabs available in the internal (audit) view */
export type InternalTab = 'scoring' | 'mp' | 'rules' | 'summary'

/** Vulnerability filter (V1-V5, ALL, or TRIGGERS) */
export type VFilter = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'ALL' | 'TRIGGERS'

/** View mode toggle */
export type ViewMode = 'internal' | 'external'

/** Vulnerability metadata for display */
export interface VulnMeta {
    id: string
    label: string
    color: string
    icon: string
}

/** Score result for a vulnerability */
export interface VulnScore {
    score: number
    max: number
}

/** Category activation info from the clinical engine */
export interface ActivatedCategory {
    mpId: string
    niveau: string
    catLabel?: string
}

/**
 * Props shared by all simulator tab components.
 * Each tab receives these from the orchestrator.
 */
export interface SimulatorTabProps {
    /** Full Monka dataset */
    data: MonkaData
    /** Current vulnerability filter */
    activeV: VFilter
    /** User answers to questions */
    answers: Record<string, string>
    /** Score by vulnerability */
    scoreByV: Record<string, VulnScore>
    /** Display score (filtered or total) */
    displayScore: VulnScore
    /** Activated MPs list */
    activatedMPs: string[]
    /** Category-level activations */
    activatedCats: Map<string, ActivatedCategory>
    /** Current threshold info */
    currentThreshold: { level: string; description: string | null; min_score: number; max_score: number } | null
    /** Scoring map: questionId → answer → score */
    scoringMap: Record<string, Record<string, number>>
}

/**
 * Extended props for the MP tab which needs more state
 */
export interface SimulatorMPTabProps extends SimulatorTabProps {
    /** Currently selected MP for drill-down */
    selectedMP: string | null
    /** Set selected MP */
    setSelectedMP: (mp: string | null) => void
    /** Expanded categories state */
    expandedCategories: Record<string, boolean>
    /** Toggle category expansion */
    toggleCategory: (cat: string) => void
}
