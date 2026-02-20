/* =============================================
   ScoreGauge — Circular Score Display
   
   Shows a vulnerability score as a circular gauge
   with dynamic color based on threshold level.
   ============================================= */

interface ScoreGaugeProps {
    /** Current score value */
    score: number
    /** Maximum possible score */
    max: number
    /** Threshold level label (e.g. 'faible', 'modéré', 'élevé', 'critique') */
    level?: string | null
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
    /** Optional label below the score */
    label?: string
}

const SIZE_CONFIG: Record<string, { width: number; stroke: number; fontSize: string; labelSize: string }> = {
    sm: { width: 60, stroke: 4, fontSize: 'text-sm', labelSize: 'text-[10px]' },
    md: { width: 80, stroke: 5, fontSize: 'text-lg', labelSize: 'text-xs' },
    lg: { width: 120, stroke: 6, fontSize: 'text-2xl', labelSize: 'text-sm' },
}

/** Map threshold level to a color */
function getLevelColor(level: string | null | undefined): string {
    if (!level) return '#94a3b8'
    const lower = level.toLowerCase()
    if (lower.includes('critique') || lower.includes('élevé') || lower.includes('eleve')) return '#ef4444'
    if (lower.includes('modéré') || lower.includes('modere')) return '#d97706'
    if (lower.includes('faible') || lower.includes('léger') || lower.includes('leger')) return '#059669'
    return '#3b82f6'
}

/**
 * ScoreGauge — Circular progress gauge for vulnerability scores.
 *
 * Usage:
 *   <ScoreGauge score={42} max={100} level="Modéré" />
 *   <ScoreGauge score={8} max={25} level="Élevé" size="lg" label="V1" />
 */
export function ScoreGauge({ score, max, level, size = 'md', label }: ScoreGaugeProps) {
    const config = SIZE_CONFIG[size]
    const percentage = max > 0 ? Math.min((score / max) * 100, 100) : 0
    const color = getLevelColor(level)

    const radius = (config.width - config.stroke * 2) / 2
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference - (percentage / 100) * circumference
    const center = config.width / 2

    return (
        <div
            className="flex flex-col items-center gap-1"
            role="meter"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`Score: ${score}/${max}${level ? ` — ${level}` : ''}`}
        >
            <div className="relative" style={{ width: config.width, height: config.width }}>
                <svg
                    width={config.width}
                    height={config.width}
                    className="transform -rotate-90"
                >
                    {/* Background circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth={config.stroke}
                    />
                    {/* Progress circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={config.stroke}
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-bold ${config.fontSize}`} style={{ color }}>
                        {score}
                    </span>
                    <span className={`text-slate-400 ${config.labelSize}`}>
                        /{max}
                    </span>
                </div>
            </div>
            {label && (
                <span className={`font-medium text-slate-600 ${config.labelSize}`}>
                    {label}
                </span>
            )}
            {level && (
                <span
                    className={`font-semibold ${config.labelSize}`}
                    style={{ color }}
                >
                    {level}
                </span>
            )}
        </div>
    )
}
