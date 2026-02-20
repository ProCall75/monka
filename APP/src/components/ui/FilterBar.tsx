/* =============================================
   FilterBar — Multi-Filter Selection Bar
   
   Horizontal filter bar for pages with multiple
   filtering dimensions (V1-V5, levels, types, etc.)
   ============================================= */

import { type ReactNode } from 'react'

/** A single filter option */
export interface FilterOption {
    /** Unique value for this option */
    value: string
    /** Display label */
    label: string
    /** Optional count badge */
    count?: number
    /** Optional icon */
    icon?: ReactNode
}

/** A group of related filters */
export interface FilterGroup {
    /** Group identifier */
    id: string
    /** Group display label */
    label?: string
    /** Available options */
    options: FilterOption[]
    /** Currently selected value (null = all) */
    selected: string | null
}

interface FilterBarProps {
    /** Filter groups to display */
    filters: FilterGroup[]
    /** Called when a filter changes */
    onFilterChange: (groupId: string, value: string | null) => void
    /** Optional extra CSS classes */
    className?: string
}

/**
 * FilterBar — Horizontal multi-group filter selector.
 *
 * Usage:
 *   <FilterBar
 *     filters={[
 *       { id: 'vuln', label: 'Vulnérabilité', options: vulnOptions, selected: selectedVuln },
 *       { id: 'level', label: 'Niveau', options: levelOptions, selected: selectedLevel },
 *     ]}
 *     onFilterChange={(groupId, value) => setFilter(groupId, value)}
 *   />
 */
export function FilterBar({ filters, onFilterChange, className = '' }: FilterBarProps) {
    return (
        <div
            className={`flex flex-wrap items-center gap-4 ${className}`}
            role="toolbar"
            aria-label="Filtres"
        >
            {filters.map((group) => (
                <div key={group.id} className="flex items-center gap-1.5">
                    {group.label && (
                        <span className="text-xs font-medium text-slate-500 mr-1">
                            {group.label}:
                        </span>
                    )}
                    <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-0.5">
                        {/* "All" option */}
                        <FilterButton
                            isActive={group.selected === null}
                            onClick={() => onFilterChange(group.id, null)}
                        >
                            Tous
                        </FilterButton>

                        {/* Individual options */}
                        {group.options.map((opt) => (
                            <FilterButton
                                key={opt.value}
                                isActive={group.selected === opt.value}
                                onClick={() => onFilterChange(group.id, opt.value)}
                            >
                                {opt.icon && <span className="mr-1">{opt.icon}</span>}
                                {opt.label}
                                {opt.count !== undefined && (
                                    <span className="ml-1 text-[10px] opacity-60">
                                        {opt.count}
                                    </span>
                                )}
                            </FilterButton>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

/** Internal filter button */
function FilterButton({
    isActive,
    onClick,
    children,
}: {
    isActive: boolean
    onClick: () => void
    children: ReactNode
}) {
    return (
        <button
            type="button"
            className={`
                px-2.5 py-1 rounded-md text-xs font-medium
                transition-all duration-200 min-h-[32px]
                ${isActive
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }
            `.trim()}
            onClick={onClick}
            aria-pressed={isActive}
        >
            {children}
        </button>
    )
}
