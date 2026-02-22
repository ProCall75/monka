/* PersonaComparison — Compare 2-3 personas side by side.
   Shows profile summaries, scores V1-V5, activated MPs,
   trigger-based profile, and divergent answers. */

import { useMemo, useState } from 'react'
import { Users, User, Briefcase, Clock, MapPin, Heart } from 'lucide-react'
import { personas, type Persona } from '../PersonasPage'
import {
    VULN_IDS, VULN_META, VULN_COLORS,
    getActivatedCategories, buildScoringMap, getTriggerQuestions, getQuestionText,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface PersonaComparisonProps { data: MonkaData }

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
    return { persona, scoreByV, mpsByV, totalScore: Object.values(scoreByV).reduce((a, b) => a + b, 0), totalMPs: Object.values(mpsByV).reduce((a, b) => a + b, 0) }
}

export function PersonaComparison({ data }: PersonaComparisonProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>(['P1', 'P2'])
    const scoringMap = useMemo(() => buildScoringMap(data), [data])
    const availablePersonas = personas.filter(p => Object.keys(p.answers).length > 0)
    const triggerQs = useMemo(() => getTriggerQuestions(data), [data])

    const results: PersonaResult[] = useMemo(() => {
        return selectedIds.map(id => availablePersonas.find(p => p.id === id)).filter((p): p is Persona => !!p)
            .map(p => computePersonaResult(data, p, scoringMap))
    }, [selectedIds, data, scoringMap, availablePersonas])

    const divergentQIds = useMemo(() => {
        if (results.length < 2) return []
        const allQIds = new Set<string>()
        results.forEach(r => Object.keys(r.persona.answers).forEach(q => allQIds.add(q)))
        return [...allQIds].filter(qId => {
            const answers = results.map(r => r.persona.answers[qId] || '—')
            return new Set(answers).size > 1
        }).slice(0, 20)
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

            {/* Persona selector — now shows name + short desc */}
            <div className="flex flex-wrap gap-2 mb-5">
                {availablePersonas.map(p => (
                    <button key={p.id} onClick={() => togglePersona(p.id)}
                        className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl transition-all border ${
                            selectedIds.includes(p.id) ? 'text-white scale-[1.02] shadow-sm' : 'bg-white/60 text-monka-muted hover:bg-white border-monka-border'}`}
                        style={selectedIds.includes(p.id) ? { backgroundColor: p.color, borderColor: p.color } : {}}
                        disabled={!selectedIds.includes(p.id) && selectedIds.length >= 3}>
                        <span className="text-base">{p.emoji}</span>
                        <span className="font-bold">{p.id}</span>
                        <span className={`text-[10px] ${selectedIds.includes(p.id) ? 'text-white/80' : 'text-monka-muted'}`}>{p.name}</span>
                    </button>
                ))}
            </div>

            {results.length < 2 ? (
                <p className="text-xs text-monka-muted italic text-center py-6">Sélectionnez au moins 2 personas pour comparer.</p>
            ) : (
                <>
                    {/* ═══ PROFILE CARDS ═══ */}
                    <div className={`grid gap-3 mb-5 ${results.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {results.map(r => (
                            <div key={r.persona.id} className="rounded-xl border p-4" style={{ borderColor: `${r.persona.color}40`, backgroundColor: `${r.persona.color}06` }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">{r.persona.emoji}</span>
                                    <div>
                                        <h5 className="text-sm font-bold text-monka-heading">{r.persona.name}, {r.persona.age} ans</h5>
                                        <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: r.persona.color }}>{r.persona.id}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-monka-text mb-3 leading-snug">{r.persona.shortDesc}</p>
                                <div className="space-y-1.5 text-[10px]">
                                    <div className="flex items-center gap-1.5"><Heart className="w-3 h-3 text-monka-muted" /><span className="text-monka-muted">Situation :</span><span className="font-medium text-monka-heading">{r.persona.profile.situation}</span></div>
                                    <div className="flex items-center gap-1.5"><Briefcase className="w-3 h-3 text-monka-muted" /><span className="text-monka-muted">Activité :</span><span className="font-medium text-monka-heading">{r.persona.profile.activite}</span></div>
                                    <div className="flex items-center gap-1.5"><User className="w-3 h-3 text-monka-muted" /><span className="text-monka-muted">Lien :</span><span className="font-medium text-monka-heading">{r.persona.profile.lienParente}</span></div>
                                    <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-monka-muted" /><span className="text-monka-muted">Aidance :</span><span className="font-medium text-monka-heading">{r.persona.profile.dureeAidance}</span></div>
                                    <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-monka-muted" /><span className="text-monka-muted">Proche :</span><span className="font-medium text-monka-heading">{r.persona.profile.proche}</span></div>
                                </div>
                                {/* Traits */}
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {r.persona.traits.slice(0, 4).map(t => (
                                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded border" style={{ backgroundColor: `${r.persona.color}10`, borderColor: `${r.persona.color}25`, color: r.persona.color }}>{t}</span>
                                    ))}
                                </div>
                                {/* Trigger Summary */}
                                <div className="mt-3 pt-3 border-t border-monka-border/30">
                                    <p className="text-[9px] font-bold text-monka-muted uppercase mb-1">Profil Triggers</p>
                                    <div className="space-y-1">
                                        {triggerQs.slice(0, 5).map(tq => {
                                            const answer = r.persona.answers[tq.id]
                                            if (!answer) return null
                                            return (
                                                <div key={tq.id} className="text-[10px]">
                                                    <span className="text-monka-muted">{tq.id}:</span>{' '}
                                                    <span className="font-medium text-monka-heading">{answer}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ═══ SCORE TABLE ═══ */}
                    <div className="overflow-x-auto mb-5">
                        <table className="w-full text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-monka-border">
                                    <th className="text-left py-2 px-3 text-monka-muted font-normal">Vulnérabilité</th>
                                    {results.map(r => (
                                        <th key={r.persona.id} className="text-center py-2 px-3">
                                            <span className="font-bold text-white px-2.5 py-1 rounded text-[10px]" style={{ backgroundColor: r.persona.color }}>{r.persona.emoji} {r.persona.id}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {VULN_IDS.map(vId => {
                                    const scores = results.map(r => r.scoreByV[vId])
                                    const maxS = Math.max(...scores)
                                    return (
                                        <tr key={vId} className="border-b border-monka-border/30">
                                            <td className="py-2 px-3 font-bold text-[11px]" style={{ color: vColorMap[vId] }}>
                                                {vId} <span className="font-normal text-monka-muted">{VULN_META[vId].name}</span>
                                            </td>
                                            {results.map(r => (
                                                <td key={r.persona.id} className="text-center py-2 px-3">
                                                    <span className={`text-sm font-bold ${r.scoreByV[vId] === maxS && maxS > 0 ? 'text-red-500' : 'text-monka-heading'}`}>
                                                        {r.scoreByV[vId]}
                                                    </span>
                                                    <span className="text-monka-muted ml-1.5 text-[10px]">{r.mpsByV[vId]} MP</span>
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                                <tr className="bg-gray-50/50 font-bold">
                                    <td className="py-2.5 px-3 text-monka-heading text-sm">Total</td>
                                    {results.map(r => (
                                        <td key={r.persona.id} className="text-center py-2.5 px-3 text-monka-heading text-sm">
                                            {r.totalScore} pts — {r.totalMPs} MP
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* ═══ DELTA ANALYSIS ═══ */}
                    {divergentQIds.length > 0 && (
                        <div className="glass p-4 rounded-xl">
                            <h5 className="text-xs font-bold text-monka-heading mb-3">
                                🔍 Delta Analysis — {divergentQIds.length} réponses divergentes
                            </h5>
                            <div className="space-y-2">
                                {divergentQIds.map(qId => {
                                    const q = data.questions.find(qu => qu.id === qId)
                                    return (
                                        <div key={qId} className="p-2.5 rounded-lg bg-white/60 border border-monka-border/30">
                                            <div className="flex items-start gap-2 mb-1.5">
                                                <span className="font-mono font-bold text-monka-primary text-[10px] flex-shrink-0">{qId}</span>
                                                <p className="text-[11px] text-monka-heading font-medium leading-snug">{q?.question_text || qId}</p>
                                            </div>
                                            <div className="flex gap-2 pl-8">
                                                {results.map(r => (
                                                    <div key={r.persona.id} className="flex-1 text-[11px] p-1.5 rounded-lg" style={{ backgroundColor: `${r.persona.color}08` }}>
                                                        <span className="font-bold text-[9px]" style={{ color: r.persona.color }}>{r.persona.id}</span>{' '}
                                                        <span className="text-monka-text">{r.persona.answers[qId] || '—'}</span>
                                                    </div>
                                                ))}
                                            </div>
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
