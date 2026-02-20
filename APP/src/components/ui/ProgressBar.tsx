/* =============================================
   ProgressBar — Horizontal Progress Indicator
   
   Used for questionnaire progress, coverage metrics,
   and any percentage-based visualizations.
   ============================================= */

interface ProgressBarProps {
    /** Current value */
    value: number
    /** Maximum value */
    max: number
    /** Optional label displayed above the bar */
    label?: string
    /** Show percentage text */
    showPercentage?: boolean
    /** Color variant */
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info'
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
}

const COLOR_MAP: Record<string, string> = {
    primary: 'bg-emerald-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
}

const SIZE_MAP: Record<string, string> = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
}

/**
 * ProgressBar — Horizontal progress indicator.
 *
 * Usage:
 *   <ProgressBar value={42} max={100} label="Questions répondues" showPercentage />
 *   <ProgressBar value={8} max={10} color="warning" size="lg" />
 */
export function ProgressBar({
    value,
    max,
    label,
    showPercentage = false,
    color = 'primary',
    size = 'md',
}: ProgressBarProps) {
    const percentage = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0
    const colorClass = COLOR_MAP[color]
    const sizeClass = SIZE_MAP[size]

    return (
        <div className="w-full">
            {(label || showPercentage) && (
                <div className="flex items-center justify-between mb-1">
                    {label && (
                        <span className="text-xs font-medium text-slate-600">
                            {label}
                        </span>
                    )}
                    {showPercentage && (
                        <span className="text-xs font-semibold text-slate-500">
                            {percentage}%
                        </span>
                    )}
                </div>
            )}
            <div
                className={`w-full ${sizeClass} bg-slate-100 rounded-full overflow-hidden`}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={label || `Progression: ${percentage}%`}
            >
                <div
                    className={`${sizeClass} ${colorClass} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
