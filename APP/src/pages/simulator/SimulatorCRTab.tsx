/* =============================================
   SimulatorCRTab — CR Médecin / Summary Tab
   
   Displays:
   1. Summary stats (gauge + MP/answer counts)
   2. Data source info
   3. V-breakdown (when ALL)
   4. CR Médecin Traitant document (when all Qs answered)
   
   Extracted from SimulatorPage summary tab.
   ============================================= */

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    VULN_IDS, VULN_META, VULN_COLORS,
    buildMPMap, buildMPVulnMap,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'
import { CRMedecinDocument } from './CRMedecinDocument'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>
const vulnerabilities = VULN_IDS.map(id => ({ id, label: VULN_META[id].name, color: VULN_META[id].color }))

interface CRTabProps extends SimulatorTabProps {
    answeredCount: number
    totalCount: number
    totalActiveQuestions: number
    personaId: string | null
}

/**
 * SimulatorCRTab — Summary + CR Médecin document.
 */
export function SimulatorCRTab({
    data, activeV, answers, scoreByV, displayScore,
    activatedMPs, activatedCats,
    answeredCount, totalCount, totalActiveQuestions, personaId,
}: CRTabProps) {
    // Defensive guard — empty data fallback
    if (!data.vulnerabilities?.length) {
        return <div className="text-center text-monka-muted py-12 text-sm">Aucune donnée disponible pour le résumé.</div>
    }

    const mpMap = useMemo(() => buildMPMap(data), [data])
    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])

    const s = displayScore
    const pct = s.max > 0 ? (s.score / s.max) * 100 : 0
    const radius = 38
    const stroke = 6
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (pct / 100) * circumference
    const gaugeColor = pct >= 70 ? '#ef4444' : pct >= 40 ? '#f59e0b' : '#22c55e'

    return (
        <div>
            <h3 className="text-sm font-bold text-monka-heading mb-4">
                Résumé {activeV === 'ALL' ? '— Toutes vulnérabilités' : `— ${activeV}`}
            </h3>

            {/* Score + stats */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
                        <circle cx="48" cy="48" r={radius} fill="none" stroke="#f0f0f0" strokeWidth={stroke} />
                        <motion.circle cx="48" cy="48" r={radius} fill="none" stroke={gaugeColor} strokeWidth={stroke}
                            strokeLinecap="round" strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 0.8, ease: 'easeOut' }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-monka-heading">{s.score}</span>
                        <span className="text-[9px] text-monka-muted">/ {s.max}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 flex-1">
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/50">
                        <p className="text-[9px] text-monka-muted uppercase tracking-wider">MP Actifs</p>
                        <p className="text-lg font-bold text-monka-heading">{activatedMPs.length}/{data.microParcours.length}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-green-50 border border-green-200/50">
                        <p className="text-[9px] text-monka-muted uppercase tracking-wider">Réponses</p>
                        <p className="text-lg font-bold text-monka-heading">{answeredCount}/{totalCount}</p>
                    </div>
                </div>
            </div>

            {/* Data source info */}
            <div className="glass p-4 rounded-xl mt-4">
                <h4 className="text-xs font-bold text-monka-heading mb-2">📊 Données Supabase (temps réel)</h4>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div><span className="text-monka-muted">Questions actives:</span> <span className="font-bold text-monka-heading">{totalActiveQuestions}/{data.questions.length}</span></div>
                    <div><span className="text-monka-muted">MP:</span> <span className="font-bold text-monka-heading">{data.microParcours.length}</span></div>
                    <div><span className="text-monka-muted">Règles:</span> <span className="font-bold text-monka-heading">{data.activationRules.length}</span></div>
                    <div><span className="text-monka-muted">Recos:</span> <span className="font-bold text-monka-heading">{data.recommendations.length}</span></div>
                    <div><span className="text-monka-muted">Micro-Tâches:</span> <span className="font-bold text-monka-heading">{data.microTaches.length}</span></div>
                    <div><span className="text-monka-muted">Scoring Q:</span> <span className="font-bold text-monka-heading">{data.scoringQuestions.length}</span></div>
                </div>
            </div>

            {/* V-breakdown (ALL view) */}
            {activeV === 'ALL' && (
                <div className="space-y-2 mt-4">
                    {vulnerabilities.map(v => {
                        const vs = scoreByV[v.id]
                        return (
                            <div key={v.id} className="flex items-center gap-3 text-xs">
                                <span className="font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: v.color }}>{v.id}</span>
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all" style={{ width: `${vs.max > 0 ? (vs.score / vs.max) * 100 : 0}%`, backgroundColor: v.color }} />
                                </div>
                                <span className="text-monka-muted">{vs.score}/{vs.max}</span>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* CR Médecin Traitant */}
            <CRMedecinDocument
                data={data} answers={answers} scoreByV={scoreByV}
                activatedMPs={activatedMPs} activatedCats={activatedCats}
                mpMap={mpMap} mpVulnMap={mpVulnMap} personaId={personaId}
            />
        </div>
    )
}
