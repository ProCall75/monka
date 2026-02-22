/* CoverageHeatmap — Visualizes Q×MP coverage matrix.
   Shows which questions are used by which MPs' rules.
   Highlights orphan questions (not in any rule). */

import { useMemo } from 'react'
import { buildCoverageMatrix, VULN_COLORS, type VulnerabilityId } from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface CoverageHeatmapProps {
    data: MonkaData
    activeV: VulnerabilityId | 'ALL' | 'TRIGGERS'
}

export function CoverageHeatmap({ data, activeV }: CoverageHeatmapProps) {
    const matrix = useMemo(() => buildCoverageMatrix(data), [data])
    const { stats } = matrix

    // Filter MPs by active V
    const filteredMPIds = useMemo(() => {
        if (activeV === 'ALL' || activeV === 'TRIGGERS') return matrix.mpIds
        return matrix.mpIds.filter(mpId => {
            const mp = data.microParcours.find(m => m.id === mpId)
            return mp?.vulnerability_id === activeV
        })
    }, [matrix, data, activeV])

    // Group questions by vulnerability, filter by activeV
    const questionsByV = useMemo(() => {
        const groups: Record<string, string[]> = {}
        const vFilter = (activeV === 'ALL' || activeV === 'TRIGGERS') ? null : activeV
        for (const qId of matrix.questionIds) {
            const q = data.questions.find(qu => qu.id === qId)
            const vId = q?.vulnerability_id || 'unknown'
            if (vFilter && vId !== vFilter) continue
            if (!groups[vId]) groups[vId] = []
            groups[vId].push(qId)
        }
        return groups
    }, [matrix, data, activeV])

    const orphanSet = useMemo(() => new Set(stats.orphanQuestions), [stats])

    return (
        <div>
            {/* Stats banner */}
            <div className="flex items-center gap-4 mb-4 p-3 glass rounded-xl text-xs">
                <div>
                    <span className="font-bold text-monka-heading">{stats.coveragePct}%</span>
                    <span className="text-monka-muted ml-1">couverture</span>
                </div>
                <div className="h-4 w-px bg-monka-border" />
                <div>
                    <span className="font-bold text-monka-heading">{stats.coveredQuestions}</span>
                    <span className="text-monka-muted ml-1">/ {stats.totalQuestions} questions couvertes</span>
                </div>
                <div className="h-4 w-px bg-monka-border" />
                <div>
                    <span className="font-bold text-red-500">{stats.orphanQuestions.length}</span>
                    <span className="text-monka-muted ml-1">orphelines</span>
                </div>
            </div>

            {/* Matrix — grouped by V */}
            {Object.entries(questionsByV).map(([vId, qIds]) => {
                const vColor = vColorMap[vId as VulnerabilityId] || '#999'
                return (
                    <div key={vId} className="mb-4">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: vColor }}>{vId}</span>
                            <span className="text-[10px] text-monka-muted">
                                {qIds.length} questions
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="text-[9px] border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-1 py-0.5 text-left text-monka-muted font-normal sticky left-0 bg-white z-10">Q</th>
                                        {filteredMPIds.map(mpId => (
                                            <th key={mpId} className="px-1 py-0.5 text-monka-muted font-normal text-center whitespace-nowrap"
                                                title={mpId}>{mpId.replace(/^MP_/, '')}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {qIds.map(qId => {
                                        const isOrphan = orphanSet.has(qId)
                                        return (
                                            <tr key={qId} className={isOrphan ? 'bg-red-50' : ''}>
                                                <td className={`px-1 py-0.5 font-mono sticky left-0 z-10 ${isOrphan ? 'text-red-500 font-bold bg-red-50' : 'text-monka-text bg-white'
                                                    }`}>{qId}</td>
                                                {filteredMPIds.map(mpId => {
                                                    const cell = matrix.cells.get(`${qId}::${mpId}`)
                                                    if (!cell) return <td key={mpId} className="px-1 py-0.5 text-center text-gray-200">·</td>
                                                    const intensity = Math.min(cell.ruleCount / 3, 1)
                                                    return (
                                                        <td key={mpId} className="px-1 py-0.5 text-center"
                                                            title={`${cell.ruleCount} règle(s): ${cell.ruleIds.join(', ')}`}>
                                                            <span className="inline-block w-3 h-3 rounded-sm"
                                                                style={{ backgroundColor: vColor, opacity: 0.3 + intensity * 0.7 }} />
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}

            {/* Orphan list */}
            {stats.orphanQuestions.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 rounded-xl">
                    <h4 className="text-xs font-bold text-red-600 mb-1">
                        ⚠️ Questions orphelines ({stats.orphanQuestions.length})
                    </h4>
                    <p className="text-[10px] text-red-500 mb-2">
                        Ces questions ne sont référencées dans aucune règle d&apos;activation :
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {stats.orphanQuestions.slice(0, 30).map(qId => (
                            <span key={qId} className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[9px] font-mono">{qId}</span>
                        ))}
                        {stats.orphanQuestions.length > 30 && (
                            <span className="text-[9px] text-red-400">+{stats.orphanQuestions.length - 30} autres</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
