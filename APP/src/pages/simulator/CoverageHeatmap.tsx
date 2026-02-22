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
    // ALL/TRIGGERS → matrix is unreadable with 24 MPs, show message
    if (activeV === 'ALL' || activeV === 'TRIGGERS') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <span className="text-xl">🔍</span>
                </div>
                <p className="text-sm font-bold text-monka-heading mb-1">Sélectionnez une vulnérabilité</p>
                <p className="text-xs text-monka-muted max-w-xs">
                    La matrice de couverture est plus lisible filtrée par vulnérabilité. Utilisez les boutons V1 à V5 ci-dessus.
                </p>
            </div>
        )
    }

    const matrix = useMemo(() => buildCoverageMatrix(data), [data])
    const { stats } = matrix

    // Filter MPs by active V
    const filteredMPIds = useMemo(() => {
        return matrix.mpIds.filter(mpId => {
            const mp = data.microParcours.find(m => m.id === mpId)
            return mp?.vulnerability_id === activeV
        })
    }, [matrix, data, activeV])

    // Group questions by vulnerability, filter by activeV
    const questionsByV = useMemo(() => {
        const groups: Record<string, string[]> = {}
        const vFilter = activeV
        for (const qId of matrix.questionIds) {
            const q = data.questions.find(qu => qu.id === qId)
            const vId = q?.vulnerability_id || 'unknown'
            if (vFilter && vId !== vFilter) continue
            if (!groups[vId]) groups[vId] = []
            groups[vId].push(qId)
        }
        return groups
    }, [matrix, data, activeV])


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
                                    {qIds.map(qId => (
                                        <tr key={qId}>
                                            <td className="px-1 py-0.5 font-mono sticky left-0 z-10 text-monka-text bg-white">{qId}</td>
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
