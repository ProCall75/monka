/* WhatIfDiff V2 — Expandable panel with toggle, detailed impacts.
   Shows diff between original and current answers with MP-level detail.
   ≤ 250L — component limit. */

import { useState, useMemo } from 'react'
import { ArrowRight, RotateCcw, ChevronDown, ChevronUp, FlaskConical, Power, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    VULN_IDS, VULN_META, VULN_COLORS,
    getActivatedCategories, buildScoringMap, buildMPMap,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface WhatIfDiffProps {
    data: MonkaData
    originalAnswers: Record<string, string | string[]>
    currentAnswers: Record<string, string | string[]>
    onReset: () => void
    enabled: boolean
    onToggle: () => void
}

interface VDiff {
    vId: string; label: string; color: string
    origScore: number; currScore: number
    origMPs: string[]; currMPs: string[]
    newMPs: string[]; lostMPs: string[]
}

export function WhatIfDiff({ data, originalAnswers, currentAnswers, onReset, enabled, onToggle }: WhatIfDiffProps) {
    const [expanded, setExpanded] = useState(false)

    const changedQuestions = useMemo(() => {
        const changed: { qId: string; text: string; from: string; to: string }[] = []
        const allKeys = new Set([...Object.keys(originalAnswers), ...Object.keys(currentAnswers)])
        const stringify = (v: string | string[] | undefined) => Array.isArray(v) ? v.join(', ') : (v || '—')
        for (const k of allKeys) {
            const origStr = stringify(originalAnswers[k])
            const currStr = stringify(currentAnswers[k])
            if (origStr !== currStr) {
                const q = data.questions.find(q => q.id === k)
                changed.push({ qId: k, text: q?.question_text || k, from: origStr, to: currStr })
            }
        }
        return changed
    }, [originalAnswers, currentAnswers, data.questions])

    const scoringMap = useMemo(() => buildScoringMap(data), [data])
    const mpMap = useMemo(() => buildMPMap(data), [data])

    const diffs: VDiff[] = useMemo(() => {
        return VULN_IDS.map(vId => {
            const origCats = getActivatedCategories(data, originalAnswers, vId)
            const currCats = getActivatedCategories(data, currentAnswers, vId)
            const origMPIds = [...new Set([...origCats.values()].map(c => c.mpId))]
            const currMPIds = [...new Set([...currCats.values()].map(c => c.mpId))]
            const newMPs = currMPIds.filter(id => !origMPIds.includes(id))
            const lostMPs = origMPIds.filter(id => !currMPIds.includes(id))

            const vulnSQIds = [...new Set(data.scoringQuestions.filter(sq => sq.vulnerability_id === vId).map(sq => sq.question_id))]
            let origScore = 0, currScore = 0
            const lookupScore = (qId: string, answer: string | string[] | undefined): number => {
                if (!answer || !scoringMap[qId]) return 0
                if (Array.isArray(answer)) {
                    return answer.reduce((sum, a) => sum + (scoringMap[qId][a] || 0), 0)
                }
                return scoringMap[qId][answer] || 0
            }
            for (const qId of vulnSQIds) {
                origScore += lookupScore(qId, originalAnswers[qId])
                currScore += lookupScore(qId, currentAnswers[qId])
            }

            return {
                vId, label: VULN_META[vId].name, color: vColorMap[vId],
                origScore, currScore,
                origMPs: origMPIds, currMPs: currMPIds, newMPs, lostMPs,
            }
        })
    }, [data, originalAnswers, currentAnswers, scoringMap])

    const hasChanges = changedQuestions.length > 0
    const hasScoreDiff = diffs.some(d => d.origScore !== d.currScore)
    const hasMPDiff = diffs.some(d => d.newMPs.length > 0 || d.lostMPs.length > 0)
    const totalNewMPs = diffs.reduce((acc, d) => acc + d.newMPs.length, 0)
    const totalLostMPs = diffs.reduce((acc, d) => acc + d.lostMPs.length, 0)

    // Always show the toggle bar
    return (
        <div className={`rounded-xl mb-2 text-xs transition-all ${enabled && hasChanges ? 'glass border border-emerald-200/50 shadow-sm shadow-emerald-100/30' : 'glass border border-gray-200/30'}`}>
            {/* Header bar — always visible */}
            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                    <button onClick={onToggle}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${enabled
                            ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                        <FlaskConical className="w-3 h-3" />
                        What-If {enabled ? 'ON' : 'OFF'}
                    </button>
                    {enabled && hasChanges && (
                        <span className="text-monka-muted">
                            {changedQuestions.length} réponse{changedQuestions.length > 1 ? 's' : ''} modifiée{changedQuestions.length > 1 ? 's' : ''}
                            {totalNewMPs > 0 && <span className="text-red-500 font-bold ml-1.5">+{totalNewMPs} MP</span>}
                            {totalLostMPs > 0 && <span className="text-green-500 font-bold ml-1.5">-{totalLostMPs} MP</span>}
                        </span>
                    )}
                    {enabled && !hasChanges && (
                        <span className="text-monka-muted italic">Modifiez une réponse pour voir l&apos;impact</span>
                    )}
                </div>
                <div className="flex items-center gap-1.5">
                    {enabled && hasChanges && (
                        <>
                            <button onClick={() => setExpanded(!expanded)}
                                className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-[10px] font-medium">
                                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                Détails
                            </button>
                            <button onClick={onReset}
                                className="flex items-center gap-1 px-2 py-1 bg-monka-primary/10 text-monka-primary rounded-lg hover:bg-monka-primary/20 transition-colors text-[10px] font-medium">
                                <RotateCcw className="w-3 h-3" /> Reset
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Score summary bar — compact */}
            {enabled && hasChanges && (hasScoreDiff || hasMPDiff) && !expanded && (
                <div className="px-3 pb-2 flex flex-wrap gap-3">
                    {diffs.filter(d => d.origScore !== d.currScore || d.newMPs.length > 0 || d.lostMPs.length > 0).map(d => (
                        <div key={d.vId} className="flex items-center gap-1.5">
                            <span className="font-mono font-bold w-5" style={{ color: d.color }}>{d.vId}</span>
                            {d.origScore !== d.currScore && (
                                <span className="flex items-center gap-0.5">
                                    <span className="text-monka-muted">{d.origScore}</span>
                                    <ArrowRight className="w-2.5 h-2.5 text-monka-muted" />
                                    <span className={`font-bold ${d.currScore > d.origScore ? 'text-red-500' : 'text-green-500'}`}>
                                        {d.currScore}
                                    </span>
                                </span>
                            )}
                            {d.newMPs.length > 0 && <span className="text-[9px] text-red-400">+{d.newMPs.length}MP</span>}
                            {d.lostMPs.length > 0 && <span className="text-[9px] text-green-400">-{d.lostMPs.length}MP</span>}
                        </div>
                    ))}
                </div>
            )}

            {/* Expanded detail panel */}
            <AnimatePresence>
                {enabled && expanded && hasChanges && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <div className="px-3 pb-3 space-y-3 border-t border-gray-200/50 pt-2">
                            {/* Changed questions */}
                            <div>
                                <span className="text-[10px] font-bold text-monka-heading uppercase tracking-wider">Questions modifiées</span>
                                <div className="mt-1 space-y-1 max-h-32 overflow-y-auto">
                                    {changedQuestions.map(q => (
                                        <div key={q.qId} className="flex items-center gap-2 p-1.5 rounded bg-amber-50/50">
                                            <span className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-1 py-0.5 rounded">{q.qId}</span>
                                            <span className="text-[10px] text-gray-600 flex-1 truncate">{q.text}</span>
                                            <span className="text-[9px] text-red-400 line-through">{q.from}</span>
                                            <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                                            <span className="text-[9px] text-green-600 font-bold">{q.to}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Impact by vulnerability */}
                            {diffs.filter(d => d.origScore !== d.currScore || d.newMPs.length > 0 || d.lostMPs.length > 0).map(d => (
                                <div key={d.vId} className="p-2 rounded-lg bg-white/60 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="font-mono font-bold text-sm" style={{ color: d.color }}>{d.vId}</span>
                                        <span className="text-[10px] text-monka-muted">{d.label}</span>
                                        {d.origScore !== d.currScore && (
                                            <span className="ml-auto flex items-center gap-1 text-[10px]">
                                                Score: {d.origScore} → <span className={`font-bold ${d.currScore > d.origScore ? 'text-red-500' : 'text-green-500'}`}>{d.currScore}</span>
                                                <span className={`text-[9px] ${d.currScore > d.origScore ? 'text-red-400' : 'text-green-400'}`}>
                                                    ({d.currScore > d.origScore ? '+' : ''}{d.currScore - d.origScore})
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                    {d.newMPs.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            <Zap className="w-3 h-3 text-red-400" />
                                            {d.newMPs.map(mpId => (
                                                <span key={mpId} className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">
                                                    + {mpMap[mpId]?.nom || mpId}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {d.lostMPs.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            <Power className="w-3 h-3 text-green-400" />
                                            {d.lostMPs.map(mpId => (
                                                <span key={mpId} className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">
                                                    − {mpMap[mpId]?.nom || mpId}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
