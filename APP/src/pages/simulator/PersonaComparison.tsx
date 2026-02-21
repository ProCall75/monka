/* PersonaComparison — Compare 2-3 personas side by side.
   Shows scores V1-V5, activated MPs, and divergent answers. */

import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import { personas, type Persona } from '../PersonasPage'
import {
    VULN_IDS, VULN_META, VULN_COLORS,
    getActivatedCategories, buildScoringMap,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface PersonaComparisonProps {
    data: MonkaData
}

interface PersonaResult {
    persona: Persona
    scoreByV: Record<string, number>
    mpsByV: Record<string, number>
    totalScore: number
    totalMPs: number
}

function computePersonaResult(data: MonkaData, persona: Persona, scoringMap: Record<string, Record<string, number>>): PersonaResult {
    const scoreByV: Record<string, number> = {}
    const mpsByV: Record<string, number> = {}
    for (const vId of VULN_IDS) {
        const vulnSQIds = [...new Set(data.scoringQuestions.filter(sq => sq.vulnerability_id === vId).map(sq => sq.question_id))]
        let score = 0
        for (const qId of vulnSQIds) {
            const a = persona.answers[qId]
            if (a && scoringMap[qId]?.[a] !== undefined) score += scoringMap[qId][a]
        }
        scoreByV[vId] = score
        const activated = getActivatedCategories(data, persona.answers, vId)
        const mpSet = new Set<string>()
        for (const c of activated.values()) mpSet.add(c.mpId)
        mpsByV[vId] = mpSet.size
    }
    return {
        persona,
        scoreByV,
        mpsByV,
        totalScore: Object.values(scoreByV).reduce((a, b) => a + b, 0),
        totalMPs: Object.values(mpsByV).reduce((a, b) => a + b, 0),
    }
}

export function PersonaComparison({ data }: PersonaComparisonProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>(['P1', 'P2'])
    const scoringMap = useMemo(() => buildScoringMap(data), [data])
    const availablePersonas = personas.filter(p => Object.keys(p.answers).length > 0)

    const results: PersonaResult[] = useMemo(() => {
        return selectedIds
            .map(id => availablePersonas.find(p => p.id === id))
            .filter((p): p is Persona => !!p)
            .map(p => computePersonaResult(data, p, scoringMap))
    }, [selectedIds, data, scoringMap, availablePersonas])

    // Divergent answers
    const divergentQIds = useMemo(() => {
        if (results.length < 2) return []
        const allQIds = new Set<string>()
        results.forEach(r => Object.keys(r.persona.answers).forEach(q => allQIds.add(q)))
        return [...allQIds].filter(qId => {
            const answers = results.map(r => r.persona.answers[qId] || '—')
            return new Set(answers).size > 1
        }).slice(0, 15) // Top 15 divergences
    }, [results])

    const togglePersona = (id: string) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) return prev.filter(x => x !== id)
            if (prev.length >= 3) return prev
            return [...prev, id]
        })
    }

    return (
        <div>
            <h4 className="text-xs font-bold text-monka-heading mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Comparaison Personas (2-3 max)
            </h4>

            {/* Persona selector */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {availablePersonas.map(p => (
                    <button key={p.id} onClick={() => togglePersona(p.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                            selectedIds.includes(p.id) ? 'text-white scale-105' : 'bg-gray-100 text-monka-muted hover:bg-gray-200'
                        }`}
                        style={selectedIds.includes(p.id) ? { backgroundColor: p.color } : {}}
                        disabled={!selectedIds.includes(p.id) && selectedIds.length >= 3}>
                        {p.emoji} {p.id}
                    </button>
                ))}
            </div>

            {results.length < 2 ? (
                <p className="text-xs text-monka-muted italic text-center py-6">Sélectionnez au moins 2 personas pour comparer.</p>
            ) : (
                <>
                    {/* Score comparison table */}
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-monka-border">
                                    <th className="text-left py-2 px-2 text-monka-muted font-normal">V</th>
                                    {results.map(r => (
                                        <th key={r.persona.id} className="text-center py-2 px-2">
                                            <span className="font-bold text-white px-2 py-0.5 rounded text-[10px]"
                                                style={{ backgroundColor: r.persona.color }}>{r.persona.id}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {VULN_IDS.map(vId => {
                                    const scores = results.map(r => r.scoreByV[vId])
                                    const maxS = Math.max(...scores)
                                    return (
                                        <tr key={vId} className="border-b border-monka-border/50">
                                            <td className="py-1.5 px-2 font-mono font-bold text-[10px]"
                                                style={{ color: vColorMap[vId] }}>{vId} <span className="font-normal text-monka-muted">{VULN_META[vId].name}</span></td>
                                            {results.map(r => (
                                                <td key={r.persona.id} className="text-center py-1.5 px-2">
                                                    <span className={`font-bold ${r.scoreByV[vId] === maxS && maxS > 0 ? 'text-red-500' : 'text-monka-heading'}`}>
                                                        {r.scoreByV[vId]}
                                                    </span>
                                                    <span className="text-monka-muted ml-1">{r.mpsByV[vId]} MPs</span>
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                                {/* Total row */}
                                <tr className="bg-gray-50 font-bold">
                                    <td className="py-2 px-2 text-monka-heading">Total</td>
                                    {results.map(r => (
                                        <td key={r.persona.id} className="text-center py-2 px-2 text-monka-heading">
                                            {r.totalScore} pts — {r.totalMPs} MPs
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Delta Analysis — divergent answers */}
                    {divergentQIds.length > 0 && (
                        <div className="glass p-3 rounded-xl">
                            <h5 className="text-[10px] font-bold text-monka-heading mb-2">
                                🔍 Delta Analysis — {divergentQIds.length} réponses divergentes
                            </h5>
                            <div className="space-y-1">
                                {divergentQIds.map(qId => {
                                    const q = data.questions.find(qu => qu.id === qId)
                                    return (
                                        <div key={qId} className="flex items-start gap-2 text-[9px]">
                                            <span className="font-mono font-bold text-monka-primary w-8 flex-shrink-0">{qId}</span>
                                            <span className="text-monka-muted flex-1 line-clamp-1">{q?.question_text || qId}</span>
                                            {results.map(r => (
                                                <span key={r.persona.id} className="w-20 flex-shrink-0 text-center font-medium truncate"
                                                    style={{ color: r.persona.color }}>
                                                    {r.persona.answers[qId] || '—'}
                                                </span>
                                            ))}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
