/* =============================================
   HeroCard — Glassmorphism Card with Level Accent
   
   Primary card component for MP cards, vulnerability
   cards, and any content that needs level-based
   visual hierarchy.
   ============================================= */

import type { ReactNode } from 'react'
import type { ClinicalLevel } from './StatusBadge'
import { getLevelStyles } from './StatusBadge'

interface HeroCardProps {
    /** Card title */
    title: string
    /** Optional subtitle */
    subtitle?: string
    /** Optional clinical level — adds accent color */
    level?: ClinicalLevel
    /** Card content */
    children: ReactNode
    /** Optional click handler */
    onClick?: () => void
    /** Optional extra CSS classes */
    className?: string
    /** Optional header right-side content (badges, actions) */
    headerRight?: ReactNode
}

/**
 * HeroCard — Glassmorphism card with optional clinical level accent.
 *
 * Usage:
 *   <HeroCard title="R1 - Épuisement" level="critique">
 *     <p>Content here</p>
 *   </HeroCard>
 */
export function HeroCard({
    title,
    subtitle,
    level,
    children,
    onClick,
    className = '',
    headerRight,
}: HeroCardProps) {
    const levelStyles = level ? getLevelStyles(level) : null
    const isClickable = !!onClick

    return (
        <div
            className={`
                glass-card p-5 
                ${levelStyles ? `border-l-4` : ''}
                ${isClickable ? 'cursor-pointer' : ''}
                ${className}
            `.trim()}
            style={levelStyles ? { borderLeftColor: levelStyles.accent } : undefined}
            onClick={onClick}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={isClickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onClick?.()
                }
            } : undefined}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-slate-800 truncate">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                            {subtitle}
                        </p>
                    )}
                </div>
                {headerRight && (
                    <div className="flex-shrink-0">
                        {headerRight}
                    </div>
                )}
            </div>

            {/* Content */}
            <div>{children}</div>
        </div>
    )
}
