/* SimulatorHeader — Top bar with V-filter pills, stats, and V subtitle.
   Extracted from SimulatorPage for architecture compliance (micro-phase 9b). */

import { motion } from 'framer-motion'
import {
    BarChart3, Zap, CheckCircle2, Layers, Fingerprint, AlertTriangle,
} from 'lucide-react'
import { VULN_COLORS, type VulnerabilityId } from '../../clinical/hooks'
import type { VFilter } from './types'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface SimulatorHeaderProps {
    activeV: VFilter
    setActiveV: (v: VFilter) => void
    personaId: string | null
    vulnerabilities: Array<{ id: string; label: string; color: string }>
    displayScore: { score: number; max: number }
    currentThreshold: { level: string; description: string | null } | null
    getThresholdColor: (level: string) => string
    activatedMPs: string[]
    totalMPs: number
    answeredCount: number
    totalCount: number
    answeredScoringCount: number
    currentScoringCount: number
    triggerQuestions: Array<{ id: string }>
    activeBlocks: Set<string>
    vulnInfo: { name: string; bloc_label: string } | undefined
    gapCount: number
}

export function SimulatorHeader({
    activeV, setActiveV, personaId, vulnerabilities,
    displayScore, currentThreshold, getThresholdColor,
    activatedMPs, totalMPs, answeredCount, totalCount,
    answeredScoringCount, currentScoringCount,
    triggerQuestions, activeBlocks, vulnInfo, gapCount,
}: SimulatorHeaderProps) {
    return (
        <>
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-monka-heading">Simulateur</h1>
                    {personaId && (
                        <span className="text-[10px] font-bold text-white bg-indigo-500 px-2 py-0.5 rounded-lg">Persona {personaId}</span>
                    )}
                    <div className="flex gap-1.5">
                        <motion.button onClick={() => setActiveV('ALL')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${activeV === 'ALL' ? 'bg-monka-dark text-white shadow-md' : 'bg-white/60 text-monka-text/60 hover:bg-white/80'}`}
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Layers className="w-3 h-3 inline-block mr-1 -mt-0.5" />ALL
                        </motion.button>
                        <motion.button onClick={() => setActiveV('TRIGGERS')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${activeV === 'TRIGGERS' ? 'bg-violet-600 text-white shadow-md' : 'bg-white/60 text-monka-text/60 hover:bg-white/80'}`}
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Fingerprint className="w-3 h-3 inline-block mr-1 -mt-0.5" />Triggers
                        </motion.button>
                        {vulnerabilities.map(v => (
                            <motion.button key={v.id} onClick={() => setActiveV(v.id as VFilter)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${activeV === v.id ? 'text-white shadow-md' : 'bg-white/60 text-monka-text/60 hover:bg-white/80'}`}
                                style={activeV === v.id ? { backgroundColor: v.color } : {}}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                {v.id}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-monka-border">
                        <BarChart3 className="w-3.5 h-3.5 text-monka-primary" />
                        <span className="text-monka-muted">Score:</span>
                        <span className="font-bold text-monka-heading">{displayScore.score}/{displayScore.max}</span>
                    </div>
                    {currentThreshold && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border"
                            style={{ backgroundColor: `${getThresholdColor(currentThreshold.level)}15`, borderColor: `${getThresholdColor(currentThreshold.level)}30` }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getThresholdColor(currentThreshold.level) }} />
                            <span className="font-bold" style={{ color: getThresholdColor(currentThreshold.level) }}>{currentThreshold.description}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-monka-border">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-monka-muted">MP actifs:</span>
                        <span className="font-bold text-monka-heading">{activatedMPs.length}/{totalMPs}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-monka-border">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-monka-muted">Réponses:</span>
                        <span className="font-bold text-monka-heading">{answeredCount}/{totalCount}</span>
                    </div>
                    {gapCount > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-amber-300 bg-amber-50">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            <span className="font-bold text-amber-700 text-[11px]">{gapCount} Gap{gapCount > 1 ? 's' : ''}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Subtitle — V info or Triggers info */}
            {activeV === 'TRIGGERS' && (
                <div className="mb-3 flex items-center gap-2 text-xs text-monka-muted">
                    <span className="font-bold text-white px-2 py-0.5 rounded bg-violet-600">Triggers</span>
                    <span>Questions de profilage</span><span>•</span>
                    <span>{triggerQuestions.length} questions</span><span>•</span>
                    <span>Blocs actifs : {[...activeBlocks].join(', ')}</span>
                </div>
            )}
            {activeV !== 'ALL' && activeV !== 'TRIGGERS' && vulnInfo && (
                <div className="mb-3 flex items-center gap-2 text-xs text-monka-muted">
                    <span className="font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: vColorMap[activeV as VulnerabilityId] }}>{activeV}</span>
                    <span>{vulnInfo.name}</span><span>•</span>
                    <span>{vulnInfo.bloc_label}</span><span>•</span>
                    <span>{totalCount} questions ({currentScoringCount} scorantes, {answeredScoringCount} répondues)</span>
                </div>
            )}
        </>
    )
}
