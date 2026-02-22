/* =============================================
   EngineHealthCard — Visual Engine Health Score
   
   Displays composite /100 score with radial gauge,
   grade badge, and per-metric breakdown bars.
   ============================================= */

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import type { MonkaData } from '../../engine/dbTypes'
import { computeEngineHealth } from '../../engine/engineHealthScore'
import type { HealthMetric } from '../../engine/engineHealthScore'

// === Grade Styling ===

const GRADE_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
    A: { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: '#22c55e' },
    B: { bg: 'bg-green-100',   text: 'text-green-700',   ring: '#84cc16' },
    C: { bg: 'bg-amber-100',   text: 'text-amber-700',   ring: '#f59e0b' },
    D: { bg: 'bg-orange-100',  text: 'text-orange-700',  ring: '#f97316' },
    F: { bg: 'bg-red-100',     text: 'text-red-700',     ring: '#ef4444' },
}

function metricColor(v: number): string {
    if (v >= 90) return '#22c55e'
    if (v >= 70) return '#84cc16'
    if (v >= 50) return '#f59e0b'
    if (v >= 30) return '#f97316'
    return '#ef4444'
}

function metricIcon(v: number) {
    if (v >= 80) return <CheckCircle2 size={14} className="text-emerald-500" />
    if (v >= 50) return <AlertTriangle size={14} className="text-amber-500" />
    return <XCircle size={14} className="text-red-500" />
}

// === Main Component ===

export function EngineHealthCard({ data }: { data: MonkaData }) {
    const health = useMemo(() => computeEngineHealth(data), [data])
    const { score, grade, metrics } = health
    const g = GRADE_COLORS[grade]

    // Gauge params
    const radius = 42
    const stroke = 7
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-5 border border-white/10"
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Shield size={18} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-monka-heading">Score de Confiance Moteur</h3>
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${g.bg} ${g.text}`}>
                    Grade {grade}
                </span>
            </div>

            {/* Gauge + Score */}
            <div className="flex items-center gap-5 mb-5">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
                        <circle cx="48" cy="48" r={radius} fill="none" stroke="#1e1e2e" strokeWidth={stroke} />
                        <motion.circle
                            cx="48" cy="48" r={radius} fill="none"
                            stroke={g.ring} strokeWidth={stroke} strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-monka-heading">{score}</span>
                        <span className="text-[9px] text-monka-muted">/ 100</span>
                    </div>
                </div>

                <div className="flex-1 text-xs text-monka-muted space-y-1">
                    <p>Score composite pondéré sur <strong className="text-monka-heading">6 métriques</strong> mesurant la robustesse du moteur clinique.</p>
                    <p className="text-[10px]">Données Supabase temps réel.</p>
                </div>
            </div>

            {/* Metric Bars */}
            <div className="space-y-2.5">
                {metrics.map(m => (
                    <MetricBar key={m.id} metric={m} />
                ))}
            </div>
        </motion.div>
    )
}

// === Metric Row ===

function MetricBar({ metric: m }: { metric: HealthMetric }) {
    return (
        <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[11px]">
                {metricIcon(m.value)}
                <span className="font-medium text-monka-heading flex-1">{m.label}</span>
                <span className="text-monka-muted">{m.value}%</span>
                <span className="text-[9px] text-monka-muted/60">×{(m.weight * 100).toFixed(0)}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: metricColor(m.value) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            </div>
            <p className="text-[9px] text-monka-muted/70 pl-5">{m.detail}</p>
        </div>
    )
}
