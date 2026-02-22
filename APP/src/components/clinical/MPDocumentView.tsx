/* MPDocumentView — Printable official document for a single Micro-Parcours.
   6 sections: Objectif, Questions, Règles, Recos, MTs, Métriques.
   100% data-driven — zero hardcoded clinical text.
   Architecture: < 290L, uses hooks barrel + getQuestionText. */

import { useMemo } from 'react'
import {
    VULN_META, getCategoriesForMP, getRulesForMP,
    getRecosForMP, getMTsForMP, getContentBlocksForEntity,
    getQuestionText, type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { ExportButton } from './ExportButton'

interface MPDocumentProps {
    data: MonkaData
    mpId: string
    onBack: () => void
}

export function MPDocumentView({ data, mpId, onBack }: MPDocumentProps) {
    const mp = data.microParcours.find(m => m.id === mpId)
    const meta = VULN_META[(mp?.vulnerability_id || 'V1') as VulnerabilityId]
    const categories = useMemo(() => getCategoriesForMP(data, mpId), [data, mpId])
    const allRules = useMemo(() => getRulesForMP(data, mpId), [data, mpId])
    const allRecos = useMemo(() => getRecosForMP(data, mpId), [data, mpId])
    const allMTs = useMemo(() => getMTsForMP(data, mpId), [data, mpId])
    const mpCBs = useMemo(() => getContentBlocksForEntity(data, 'mp', mpId), [data, mpId])
    const questions = useMemo(() => {
        const qMappings = data.questionMPMappings.filter(m => m.mp_id === mpId)
        return qMappings.map(m => data.questions.find(q => q.id === m.question_id)).filter(Boolean)
    }, [data, mpId])

    if (!mp) return null

    return (
        <div className="max-w-[900px] mx-auto">
            {/* Toolbar (hidden in print) */}
            <div className="flex items-center gap-3 mb-4 no-print">
                <button onClick={onBack} className="text-xs text-monka-muted hover:text-monka-text transition-colors">← Retour</button>
                <div className="flex-1" />
                <ExportButton label="Exporter Fiche MP" />
            </div>

            {/* Document */}
            <div className="cr-document bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {/* Header */}
                <div className="bg-gray-800 text-white px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-8 w-auto" />
                        <div>
                            <p className="text-xs font-bold tracking-wider uppercase font-sans">Fiche Micro-Parcours</p>
                            <p className="text-[9px] text-gray-400 font-sans">{mpId} — {mp.vulnerability_id}</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded font-sans" style={{ backgroundColor: meta.color }}>{meta.label}</span>
                </div>

                <div className="p-5 space-y-5">
                    {/* Title */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1 className="text-lg font-bold text-gray-800 mb-1">{mp.nom}</h1>
                        {mp.objectif && <p className="text-sm text-gray-600 italic">{mp.objectif}</p>}
                        {mp.signature_a && (
                            <div className="flex gap-2 mt-2 text-[10px]">
                                <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-200">🎯 {mp.signature_a}</span>
                                {mp.signature_b && <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded border border-red-200">⚠️ {mp.signature_b}</span>}
                            </div>
                        )}
                    </div>

                    {/* 1. Objectif clinique (content blocks) */}
                    {mpCBs.length > 0 && (
                        <div className="cr-bloc">
                            <h4 className="cr-section-title">1. Objectif clinique</h4>
                            <div className="space-y-2">
                                {mpCBs.map(cb => (
                                    <div key={cb.id} className="p-3 rounded-lg bg-gray-50 text-sm text-gray-700 leading-relaxed">
                                        {cb.block_type !== 'objectif' && <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">{cb.block_type}</span>}
                                        {cb.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 2. Questions évaluées */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">2. Questions évaluées ({questions.length})</h4>
                        <table className="w-full text-[10px] border-collapse">
                            <thead><tr className="bg-gray-50 text-left">
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-14">ID</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Question</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-20">Type</th>
                            </tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {questions.map(q => q && (
                                    <tr key={q.id}>
                                        <td className="px-2 py-1.5 font-mono text-gray-400 text-[9px]">{q.id}</td>
                                        <td className="px-2 py-1.5 text-gray-700">{q.question_text}</td>
                                        <td className="px-2 py-1.5 text-gray-400">{q.response_type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 3. Règles d'activation */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">3. Règles d&apos;activation ({allRules.length})</h4>
                        <div className="space-y-3">
                            {['critique', 'ccc', 'standard'].map(niveau => {
                                const nRules = allRules.filter(r => r.niveau === niveau || (niveau === 'standard' && !['critique', 'ccc'].includes(r.niveau)))
                                if (nRules.length === 0) return null
                                const nColor = niveau === 'critique' ? '#EF4444' : niveau === 'ccc' ? '#F59E0B' : '#22C55E'
                                return (
                                    <div key={niveau}>
                                        <p className="text-[9px] font-bold uppercase mb-1.5" style={{ color: nColor }}>{niveau} ({nRules.length})</p>
                                        {nRules.map(rule => {
                                            const conditions = rule.condition_logic as unknown as { q: string; op: string; val?: string; vals?: string[]; min?: number }[]
                                            return (
                                                <div key={rule.id} className="mb-2 p-2.5 rounded-lg border border-gray-200 bg-white">
                                                    {rule.sens_clinique && <p className="text-[10px] text-gray-700 italic mb-1.5">🧠 {rule.sens_clinique}</p>}
                                                    {Array.isArray(conditions) && (
                                                        <div className="space-y-1">
                                                            {conditions.map((c, i) => (
                                                                <p key={i} className="text-[10px] text-gray-600 pl-3 border-l-2 border-gray-200">
                                                                    « {getQuestionText(data, c.q)} » {c.op === 'in' ? `répondu ${c.vals?.join(' ou ') || c.val}` : `${c.op} ${c.val ?? c.min}`}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 4. Recommandations */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">4. Recommandations ({allRecos.length})</h4>
                        <div className="space-y-2">
                            {allRecos.map(reco => (
                                <div key={reco.id} className="p-2.5 rounded-lg border border-gray-200 bg-white">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${reco.niveau === 'critique' ? 'bg-red-100 text-red-600'
                                                : reco.niveau === 'ccc' ? 'bg-amber-100 text-amber-600'
                                                    : 'bg-emerald-100 text-emerald-600'
                                            }`}>{reco.niveau}</span>
                                        <span className="text-[9px] text-gray-400">{reco.category_id}</span>
                                    </div>
                                    <p className="text-[10.5px] text-gray-700 mb-1">{reco.wording_utilisateur}</p>
                                    <p className="text-[10px] text-gray-500 italic">IDEC : {reco.wording_idec}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. Micro-Tâches */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">5. Micro-tâches ({allMTs.length})</h4>
                        <table className="w-full text-[10px] border-collapse">
                            <thead><tr className="bg-gray-50 text-left">
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-12">Type</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Action</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-24">Acteur</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-12">ASR</th>
                            </tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {allMTs.map(mt => (
                                    <tr key={mt.id}>
                                        <td className="px-2 py-1.5">
                                            <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${mt.type === 'MED' ? 'bg-red-100 text-red-600'
                                                    : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600'
                                                        : 'bg-blue-100 text-blue-600'
                                                }`}>{mt.type}</span>
                                        </td>
                                        <td className="px-2 py-1.5 text-gray-700">{mt.libelle}</td>
                                        <td className="px-2 py-1.5 text-gray-500">{mt.acteur?.join(', ') || '—'}</td>
                                        <td className="px-2 py-1.5 text-center">{mt.is_contributive ? '✓' : '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 6. Métriques */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">6. Métriques</h4>
                        <div className="grid grid-cols-3 gap-2 text-[10px]">
                            {[
                                { label: 'Questions', val: questions.length },
                                { label: 'Catégories', val: categories.length },
                                { label: 'Règles', val: allRules.length },
                                { label: 'Recommandations', val: allRecos.length },
                                { label: 'Micro-Tâches', val: allMTs.length },
                                { label: 'Content Blocks', val: mpCBs.length },
                            ].map(m => (
                                <div key={m.label} className="p-2 rounded bg-gray-50 text-center">
                                    <div className="text-lg font-bold text-gray-800">{m.val}</div>
                                    <div className="text-gray-400">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-3 mt-4 flex items-center justify-between">
                        <p className="text-[8px] text-gray-300 leading-relaxed font-sans">
                            Généré par Monka v2.0 — Moteur clinique certifié<br />
                            {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-5 w-auto opacity-30" />
                    </div>
                </div>
            </div>
        </div>
    )
}
