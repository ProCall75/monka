/**
 * ═══════════════════════════════════════════════════════
 * MONKA KERNEL V5 — TypeScript Type Definitions
 * Source de vérité : KERNEL_V5.md
 * ═══════════════════════════════════════════════════════
 *
 * NOTE INTERFACE : Les types portent des noms Kernel en interne.
 * L'interface n'expose JAMAIS ces termes. Voir les champs `userLabel` / `themeLabel`.
 */

// ── Criticality (K-Rules) — Utilisé en INTERNE uniquement ──
export type Criticality = 'critical' | 'ccc' | 'standard' | 'prevention';

// USER-FACING urgency labels (jamais de "critique" ou "CCC" visible)
export const UrgencyConfig: Record<Criticality, {
    userLabel: string;     // Ce que l'aidant VOIT
    emoji: string;
    color: string;
    softColor: string;     // Pour backgrounds doux
    kernelLabel: string;   // Pour debugging uniquement
}> = {
    critical: {
        userLabel: 'À faire cette semaine',
        emoji: '',
        color: '#EF4444',
        softColor: 'rgba(239,68,68,0.08)',
        kernelLabel: 'Critique',
    },
    ccc: {
        userLabel: 'Important ce mois-ci',
        emoji: '',
        color: '#F59E0B',
        softColor: 'rgba(245,158,11,0.08)',
        kernelLabel: 'CCC',
    },
    standard: {
        userLabel: 'À votre rythme',
        emoji: '',
        color: '#10B981',
        softColor: 'rgba(16,185,129,0.08)',
        kernelLabel: 'Standard',
    },
    prevention: {
        userLabel: 'Prévention',
        emoji: '',
        color: '#9CA3AF',
        softColor: 'rgba(156,163,175,0.06)',
        kernelLabel: 'Prévention',
    },
};

// ── Theme Colors (by life domain, NOT by criticality) ──
export interface ThemeConfig {
    label: string;        // User-facing name
    icon: string;         // Emoji
    gradient: string;     // Tailwind gradient classes
    color: string;        // Primary hex
    softBg: string;       // Subtle card background
}

export const ThemeColors: Record<string, ThemeConfig> = {
    R: {
        label: 'Votre vie sociale',
        icon: 'users',
        gradient: 'from-violet-400 to-purple-600',
        color: '#8B5CF6',
        softBg: 'rgba(139,92,246,0.06)',
    },
    A: {
        label: 'Vos démarches',
        icon: 'clipboard',
        gradient: 'from-blue-400 to-indigo-600',
        color: '#3B82F6',
        softBg: 'rgba(59,130,246,0.06)',
    },
    S: {
        label: 'Votre santé',
        icon: 'heart',
        gradient: 'from-pink-400 to-rose-600',
        color: '#EC4899',
        softBg: 'rgba(236,72,153,0.06)',
    },
    F: {
        label: 'Francine',
        icon: 'hand-heart',
        gradient: 'from-amber-400 to-orange-600',
        color: '#F59E0B',
        softBg: 'rgba(245,158,11,0.06)',
    },
    M: {
        label: 'Parcours de soins',
        icon: 'first-aid',
        gradient: 'from-emerald-400 to-teal-600',
        color: '#10B981',
        softBg: 'rgba(16,185,129,0.06)',
    },
};

// ── Micro-Task Types ──
export type MicroTaskType = 'STRUC' | 'SEC' | 'MED' | 'INFO' | 'ORGA';

export interface MicroTask {
    id: string;
    text: string;                // User-facing wording (bienveillant)
    type: MicroTaskType;
    isContributive: boolean;     // true = "Action prioritaire", false = "Bon à savoir"
    isCompleted: boolean;
    actor?: string;
}

// User-facing labels for MT types
export const TaskTypeLabel: Record<string, { label: string; variant: 'priority' | 'info' }> = {
    priority: { label: 'Action prioritaire', variant: 'priority' },
    info: { label: 'Bon à savoir', variant: 'info' },
};

// ── Recommendation → "Conseil" in user-facing ──
export interface Recommendation {
    id: string;
    title: string;               // User-facing (bienveillant)
    criticality: Criticality;
    microTasks: MicroTask[];
}

// ── Recommendation Category → "Thématique" in user-facing ──
export interface RecoCategory {
    id: string;
    name: string;
    recommendations: Recommendation[];
}

// ── Micro-Parcours → "Programme" in user-facing ──
export interface MicroParcours {
    id: string;
    title: string;               // User-facing: "Retrouver du répit" (pas "Impact vie perso")
    description: string;         // User-facing: bienveillant, encourageant
    asrObjective: string;        // User-facing: "Votre objectif" (pas "ASR")
    asrProgress: number;         // 0-100 (calculé)
    criticality: Criticality;
    categories: RecoCategory[];
}

// ── Vulnerability → "Thème de vie" in user-facing ──
export type VulnerabilityDomain = 'R' | 'A' | 'S' | 'F' | 'M';

export interface Vulnerability {
    id: string;
    domain: VulnerabilityDomain;
    title: string;               // KERNEL title (used for matching)
    userTitle: string;            // USER-FACING: "Votre vie sociale" (pas "Social & Relationnel")
    description: string;         // USER-FACING: bienveillant
    score: number;               // INTERNAL ONLY — jamais affiché à l'aidant
    microParcours: MicroParcours[];
}

// ── User Profile ──
export interface UserProfile {
    name: string;
    role: string;
    avatar?: string;
    notificationCount: number;
}

// ── Full State ──
export interface KernelState {
    user: UserProfile;
    vulnerabilities: Vulnerability[];
}
