/* =============================================
   StatusBadge — Clinical Level Badge
   
   Replaces ~15 inline ternary chains across the app.
   Supports: standard, ccc, critique, prevention
   ============================================= */

import type { ReactNode } from 'react'

/** Clinical activation levels, matching DB schema */
export type ClinicalLevel = 'standard' | 'ccc' | 'critique' | 'prevention'

interface StatusBadgeProps {
    /** The clinical activation level */
    level: ClinicalLevel
    /** Optional custom label — defaults to level name */
    label?: string
    /** Optional size variant */
    size?: 'sm' | 'md' | 'lg'
    /** Optional children to render instead of label */
    children?: ReactNode
}

/** Color mapping per clinical level — Tailwind classes */
const LEVEL_STYLES: Record<ClinicalLevel, {
    bg: string
    text: string
    border: string
    accent: string
    label: string
}> = {
    critique: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
        accent: '#ef4444',
        label: 'Critique',
    },
    ccc: {
        bg: 'bg-amber-50',
        text: 'text-amber-600',
        border: 'border-amber-200',
        accent: '#d97706',
        label: 'CCC',
    },
    standard: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        accent: '#059669',
        label: 'Standard',
    },
    prevention: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        accent: '#7c3aed',
        label: 'Prévention',
    },
}

const SIZE_CLASSES: Record<string, string> = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
    lg: 'px-2.5 py-1 text-sm',
}

/**
 * StatusBadge — Displays a clinical activation level badge.
 * 
 * Usage:
 *   <StatusBadge level="critique" />
 *   <StatusBadge level="ccc" size="lg" label="CCC activé" />
 */
export function StatusBadge({ level, label, size = 'md', children }: StatusBadgeProps) {
    const styles = LEVEL_STYLES[level]
    const sizeClasses = SIZE_CLASSES[size]

    return (
        <span
            className={`inline-flex items-center rounded font-bold ${styles.bg} ${styles.text} ${sizeClasses}`}
            role="status"
            aria-label={`Niveau: ${label || styles.label}`}
        >
            {children || label || styles.label}
        </span>
    )
}

/**
 * Get the style config for a clinical level.
 * Useful when you need the raw colors for custom layouts.
 */
export function getLevelStyles(level: ClinicalLevel) {
    return LEVEL_STYLES[level]
}
