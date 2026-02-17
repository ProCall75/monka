/* =============================================
   Shared Constants — Monka Clinical Engine
   Single source of truth for Vulnerability metadata
   ============================================= */

import {
    Users,
    Scale,
    Heart,
    Stethoscope,
    Target,
    type LucideIcon,
} from 'lucide-react'
import type { VulnerabilityId } from './types'

// === Vulnerability Metadata ===

export interface VulnMeta {
    id: VulnerabilityId
    label: string
    name: string
    description: string
    icon: LucideIcon
    color: string
    gradient: string
}

export const VULN_META: Record<VulnerabilityId, VulnMeta> = {
    V1: {
        id: 'V1',
        label: 'V1',
        name: 'Social et relationnel',
        description: 'Impact de l\'aidance sur la vie sociale, professionnelle et familiale de l\'aidant.',
        icon: Users,
        color: '#58BF94',
        gradient: 'from-emerald-400 to-emerald-600',
    },
    V2: {
        id: 'V2',
        label: 'V2',
        name: 'Administrative',
        description: 'Évaluation de la situation administrative, financière et des droits.',
        icon: Scale,
        color: '#86C0CF',
        gradient: 'from-cyan-400 to-cyan-600',
    },
    V3: {
        id: 'V3',
        label: 'V3',
        name: 'Santé physique et psychologique',
        description: 'Fatigue, stress, sommeil, état psychologique et physique de l\'aidant.',
        icon: Heart,
        color: '#F5A623',
        gradient: 'from-amber-400 to-amber-600',
    },
    V4: {
        id: 'V4',
        label: 'V4',
        name: 'Fragilité du proche',
        description: 'Pathologies, traitements, autonomie et parcours de soins du proche aidé.',
        icon: Stethoscope,
        color: '#EF4444',
        gradient: 'from-red-400 to-red-600',
    },
    V5: {
        id: 'V5',
        label: 'V5',
        name: 'Parcours médical du proche',
        description: 'Démarches, droits, coordination des intervenants et organisation des soins.',
        icon: Target,
        color: '#7748F6',
        gradient: 'from-violet-400 to-violet-600',
    },
}

/** All vulnerability IDs in order */
export const VULN_IDS: VulnerabilityId[] = ['V1', 'V2', 'V3', 'V4', 'V5']

/** Quick color lookup: VULN_COLORS['V1'] → '#58BF94' */
export const VULN_COLORS: Record<string, string> = Object.fromEntries(
    VULN_IDS.map(v => [v, VULN_META[v].color])
)
