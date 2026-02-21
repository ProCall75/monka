/* WhatIfDiff — Shows diff between original and current answers.
   Displays changed scores, rules, MPs compared to baseline snapshot. */

import { useMemo } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import {
    VULN_IDS, VULN_META, VULN_COLORS,
    getActivatedCategories, buildScoringMap, buildMPVulnMap,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface WhatIfDiffProps {
    data: MonkaData
    originalAnswers: Record<string, string>
    currentAnswers: Record<string, string>
    onReset: () => void
}

interface VDiff {
    vId: string
    label: string
    color: string
    origScore: number
    currScore: number
    origMPs: number
    currMPs: number
}

export function WhatIfDiff({ data, originalAnswers, currentAnswers, onReset }: WhatIfDiffProps) {
    const changedCount = useMemo(() => {
        let count = 0
        const allKeys = new Set([...Object.keys(originalAnswers), ...Object.keys(currentAnswers)])
        for (const k of allKeys) {
            if (originalAnswers[k] !== currentAnswers[k]) count++
        }
        return count
    }, [originalAnswers, currentAnswers])

    const scoringMap = useMemo(() => buildScoringMap(data), [data])

    const diffs: VDiff[] = useMemo(() => {
        return VULN_IDS.map(vId => {
            const origCats = getActivatedCategories(data, originalAnswers, vId)
            const currCats = getActivatedCategories(data, currentAnswers, vId)
            const origMPSet = new Set<string>()
            const currMPSet = new Set<string>()
            for (const c of origCats.values()) origMPSet.add(c.mpId)
            for (const c of currCats.values()) currMPSet.add(c.mpId)

            const vulnSQIds = [...new Set(data.scoringQuestions.filter(sq => sq.vulnerability_id === vId).map(sq => sq.question_id))]
            let origScore = 0, currScore = 0
            for (const qId of vulnSQIds) {
                const oa = originalAnswers[qId]
                const ca = currentAnswers[qId]
                if (oa && scoringMap[qId]?.[oa] !== undefined) origScore += scoringMap[qId][oa]
                if (ca && scoringMap[qId]?.[ca] !== undefined) currScore += scoringMap[qId][ca]
            }

            return {
                vId,
                label: VULN_META[vId].name,
                color: vColorMap[vId],
                origScore,
                currScore,
                origMPs: origMPSet.size,
                currMPs: currMPSet.size,
            }
        })
    }, [data, originalAnswers, currentAnswers, scoringMap])

    if (changedCount === 0) return null

    const hasScoreDiff = diffs.some(d => d.origScore !== d.currScore)
    const hasMPDiff = diffs.some(d => d.origMPs !== d.currMPs)

    return (
        <div className="glass p-3 rounded-xl mb-3 text-xs">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-monka-heading">🔬 Mode What-If</span>
                    <span className="text-monka-muted">{changedCount} réponse{changedCount > 1 ? 's' : ''} modifiée{changedCount > 1 ? 's' : ''}</span>
                </div>
                <button onClick={onReset}
                    className="flex items-center gap-1 px-2 py-1 bg-monka-primary/10 text-monka-primary rounded-lg hover:bg-monka-primary/20 transition-colors text-[10px] font-medium">
                    <RotateCcw className="w-3 h-3" /> Reset
                </button>
            </div>
            {(hasScoreDiff || hasMPDiff) && (
                <div className="space-y-1">
                    {diffs.filter(d => d.origScore !== d.currScore || d.origMPs !== d.currMPs).map(d => (
                        <div key={d.vId} className="flex items-center gap-2">
                            <span className="font-mono font-bold w-6" style={{ color: d.color }}>{d.vId}</span>
                            {d.origScore !== d.currScore && (
                                <span className="flex items-center gap-1">
                                    <span className="text-monka-muted">{d.origScore}</span>
                                    <ArrowRight className="w-3 h-3 text-monka-muted" />
                                    <span className={`font-bold ${d.currScore > d.origScore ? 'text-red-500' : 'text-green-500'}`}>
                                        {d.currScore}
                                    </span>
                                    <span className={`text-[9px] ${d.currScore > d.origScore ? 'text-red-400' : 'text-green-400'}`}>
                                        ({d.currScore > d.origScore ? '+' : ''}{d.currScore - d.origScore} pts)
                                    </span>
                                </span>
                            )}
                            {d.origMPs !== d.currMPs && (
                                <span className="text-[9px] text-monka-muted ml-1">
                                    MPs: {d.origMPs} → {d.currMPs} ({d.currMPs > d.origMPs ? '+' : ''}{d.currMPs - d.origMPs})
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
