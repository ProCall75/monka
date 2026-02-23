/* =============================================
   SimulatorScoringTab — Vulnerability Score Display
   
   Shows circular gauge + per-V breakdown with
   threshold levels. Extracted from SimulatorPage.
   ============================================= */

import {
    VULN_IDS, VULN_META,
    getThresholdsForVuln, buildMPVulnMap,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'
import { detectScoreActionGaps } from './scoreActionGap'
import { ScoreBreakdown } from './ScoreBreakdown'
import { AlertTriangle } from 'lucide-react'

const vulnerabilities = VULN_IDS.map(id => ({
    id,
    label: VULN_META[id].name,
    color: VULN_META[id].color,
}))

function getThresholdColor(level: string): string {
    switch (level) {
        case 'faible': return '#00DC82'
        case 'modere': return '#F5D245'
        case 'eleve': return '#F5A623'
        case 'critique': return '#EF4444'
        default: return '#999'
    }
}

import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * ScoringTab — Displays scores per vulnerability with circular gauge + gap alerts.
 */
export function SimulatorScoringTab({ data, activeV, scoreByV, displayScore, activatedMPs, answers, scoringMap }: SimulatorTabProps) {
    // Defensive guard — empty data fallback
    if (!data.scoringThresholds?.length || !data.vulnerabilities?.length) {
        return <div className="text-center text-monka-muted py-12 text-sm">Aucune donnée de scoring disponible.</div>
    }

    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])
    const gaps = useMemo(() => detectScoreActionGaps(data, scoreByV, activatedMPs, mpVulnMap), [data, scoreByV, activatedMPs, mpVulnMap])

    const s = displayScore
    const pct = s.max > 0 ? (s.score / s.max) * 100 : 0
    const radius = 54
    const stroke = 8
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (pct / 100) * circumference
    const gaugeColor = pct >= 70 ? '#ef4444' : pct >= 40 ? '#f59e0b' : '#22c55e'

    return (
        <div>
            <h3 className="text-sm font-bold text-monka-heading mb-4">
                Scoring {activeV === 'ALL' ? '— Vue Globale' : `— ${activeV}`}
            </h3>

            {/* Score-Action Gap Alerts */}
            {gaps.length > 0 && (
                <div className="mb-4 space-y-2">
                    {gaps.map(gap => (
                        <div key={gap.vulnId} className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-amber-300 bg-amber-50">
                            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-xs font-bold text-amber-700">⚠️ Score-Action Gap — {gap.vulnId}</div>
                                <p className="text-[11px] text-amber-600 mt-0.5">
                                    Score <strong>{gap.score}/{gap.max}</strong> (niveau <strong>{gap.thresholdLevel}</strong>) mais <strong>0 micro-parcours activé</strong>. Vérifiez les règles d&apos;activation.
                                </p>
                            </div>
                            <span className="text-[10px] px-2 py-1 rounded-lg bg-amber-200 text-amber-800 font-bold">{gap.thresholdLevel}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Circular gauge hero */}
            <div className="flex justify-center mb-5">
                <div className="relative w-36 h-36">
                    <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
                        <circle cx="72" cy="72" r={radius} fill="none" stroke="#f0f0f0" strokeWidth={stroke} />
                        <motion.circle
                            cx="72" cy="72" r={radius} fill="none"
                            stroke={gaugeColor}
                            strokeWidth={stroke}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-monka-heading">{s.score}</span>
                        <span className="text-[10px] text-monka-muted">/ {s.max}</span>
                        <span className="text-[10px] font-semibold mt-0.5" style={{ color: gaugeColor }}>{Math.round(pct)}%</span>
                    </div>
                </div>
            </div>

            {/* Per-vulnerability breakdown */}
            <div className="space-y-3">
                {vulnerabilities.map(v => {
                    if (activeV !== 'ALL' && activeV !== v.id) return null
                    const vs = scoreByV[v.id]
                    if (!vs) return null
                    const vpct = vs.max > 0 ? (vs.score / vs.max) * 100 : 0
                    const thresholds = getThresholdsForVuln(data, v.id)
                    const threshold = thresholds.find(t => vs.score >= t.min_score && vs.score <= t.max_score)

                    return (
                        <div key={v.id} className="glass p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: v.color }}>{v.id}</span>
                                    <span className="text-sm font-medium text-monka-heading">{v.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {threshold && (
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${getThresholdColor(threshold.level)}20`, color: getThresholdColor(threshold.level) }}>
                                            {threshold.level}
                                        </span>
                                    )}
                                    <span className="text-sm font-bold text-monka-heading">{vs.score}/{vs.max}</span>
                                </div>
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div className="h-full rounded-full" style={{ backgroundColor: v.color }} animate={{ width: `${vpct}%` }} transition={{ duration: 0.5 }} />
                            </div>
                            {threshold && (
                                <p className="text-[10px] text-monka-muted mt-1">{threshold.description}</p>
                            )}
                            {/* Score Breakdown — per-question contribution (Bloc 12) */}
                            <ScoreBreakdown data={data} vulnId={v.id} answers={answers} scoringMap={scoringMap} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
