/* MPDocumentView — Fiche Micro-Parcours officielle.
   9 sections: Sens clinique, Questions, Catégories, Règles, Recos, MTs, Acteurs, Liens inter-MP, Métriques.
   100% data-driven — content_blocks DB pour justifications et sens clinique.
   Architecture: < 350L, uses hooks barrel + getQuestionText. */

import { useMemo } from 'react'
import {
    VULN_META, getCategoriesForMP, getRulesForMP,
    getRecosForMP, getMTsForMP, getContentBlocksForEntity,
    getQuestionText, isScoringQuestion,
    type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { ExportButton } from './ExportButton'

interface MPDocumentProps {
    data: MonkaData
    mpId: string
    onBack: () => void
}

const NIVEAU_COLORS: Record<string, { bg: string; text: string; label: string }> = {
    critique: { bg: 'bg-red-100', text: 'text-red-700', label: '🔴 Critique' },
    ccc: { bg: 'bg-amber-100', text: 'text-amber-700', label: '🟠 CCC' },
    standard: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: '🟢 Standard' },
    prevention: { bg: 'bg-purple-100', text: 'text-purple-700', label: '⚪ Prévention' },
}

const MT_TYPE_STYLES: Record<string, { bg: string; text: string }> = {
    MED: { bg: 'bg-red-100', text: 'text-red-600' },
    SEC: { bg: 'bg-orange-100', text: 'text-orange-600' },
    STRUC: { bg: 'bg-blue-100', text: 'text-blue-600' },
    INFO: { bg: 'bg-green-100', text: 'text-green-600' },
    ORGA: { bg: 'bg-violet-100', text: 'text-violet-600' },
}

export function MPDocumentView({ data, mpId, onBack }: MPDocumentProps) {
    const mp = data.microParcours.find(m => m.id === mpId)
    const meta = VULN_META[(mp?.vulnerability_id || 'V1') as VulnerabilityId]
    const categories = useMemo(() => getCategoriesForMP(data, mpId), [data, mpId])
    const allRules = useMemo(() => getRulesForMP(data, mpId), [data, mpId])
    const allRecos = useMemo(() => getRecosForMP(data, mpId), [data, mpId])
    const allMTs = useMemo(() => getMTsForMP(data, mpId), [data, mpId])

    // Content blocks per MP
    const sensClinique = useMemo(() => getContentBlocksForEntity(data, 'micro_parcours', mpId).filter(cb => cb.block_type === 'sens_clinique'), [data, mpId])
    const justifQuestions = useMemo(() => getContentBlocksForEntity(data, 'micro_parcours', mpId).filter(cb => cb.block_type === 'justification_questions'), [data, mpId])
    const justifCategories = useMemo(() => getContentBlocksForEntity(data, 'micro_parcours', mpId).filter(cb => cb.block_type === 'justification_categories'), [data, mpId])
    const justifActeurs = useMemo(() => getContentBlocksForEntity(data, 'micro_parcours', mpId).filter(cb => cb.block_type === 'justification_acteurs'), [data, mpId])
    const liensInterMP = useMemo(() => getContentBlocksForEntity(data, 'micro_parcours', mpId).filter(cb => cb.block_type === 'liens_inter_mp'), [data, mpId])

    // Questions mapped to this MP
    const questions = useMemo(() => {
        const qMappings = data.questionMPMapping.filter(m => m.mp_id === mpId)
        return qMappings.map(m => data.questions.find(q => q.id === m.question_id)).filter(Boolean)
    }, [data, mpId])

    const contributiveMTs = allMTs.filter(mt => mt.is_contributive)

    if (!mp) return null

    return (
        <div className="max-w-[900px] mx-auto">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-4 no-print">
                <button onClick={onBack} className="text-xs text-monka-muted hover:text-monka-text transition-colors">← Retour</button>
                <div className="flex-1" />
                <ExportButton label="Exporter Fiche MP" />
            </div>

            <div className="cr-document bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {/* Header */}
                <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-8 w-auto" />
                        <div>
                            <p className="text-xs font-bold tracking-wider uppercase font-sans">Fiche Micro-Parcours</p>
                            <p className="text-[9px] text-gray-400 font-sans">{mpId} — {mp.vulnerability_id}</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-white px-2.5 py-1 rounded font-sans" style={{ backgroundColor: meta.color }}>{meta.label}</span>
                </div>

                <div className="p-6 space-y-6">
                    {/* Title */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1 className="text-xl font-bold text-gray-800 mb-1">{mp.nom}</h1>
                        {mp.objectif && <p className="text-sm text-gray-600 italic">🎯 {mp.objectif}</p>}
                    </div>

                    {/* 1. Sens clinique */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">1. Sens clinique</h4>
                        {sensClinique.length > 0 ? (
                            <div className="space-y-2">
                                {sensClinique.map(cb => (
                                    <p key={cb.id} className="text-[11px] text-gray-700 leading-relaxed p-3 bg-blue-50/50 rounded-lg border border-blue-100">{cb.content}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[10px] text-gray-400 italic">—</p>
                        )}
                    </div>

                    {/* 2. Questions évaluées */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">2. Questions évaluées ({questions.length})</h4>
                        <table className="w-full text-[10px] border-collapse mb-2">
                            <thead><tr className="bg-gray-50 text-left">
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-14">ID</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Question</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-20">Type</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-16">Scoring</th>
                            </tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {questions.map(q => q && (
                                    <tr key={q.id}>
                                        <td className="px-2 py-1.5 font-mono text-gray-400 text-[9px]">{q.id}</td>
                                        <td className="px-2 py-1.5 text-gray-700">{q.question_text}</td>
                                        <td className="px-2 py-1.5 text-gray-400 capitalize">{q.classification || '—'}</td>
                                        <td className="px-2 py-1.5">{isScoringQuestion(data, q.id)
                                            ? <span className="text-[9px] font-bold text-emerald-600">✓ Oui</span>
                                            : <span className="text-[9px] text-gray-300">Non</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Justification questions block */}
                        {justifQuestions.map(cb => (
                            <p key={cb.id} className="text-[10px] text-indigo-700 bg-indigo-50/50 rounded-lg px-3 py-2 leading-relaxed border border-indigo-100 whitespace-pre-line">{cb.content}</p>
                        ))}
                    </div>

                    {/* 3. Catégories d'action */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">3. Catégories d&apos;action ({categories.length})</h4>
                        <div className="space-y-2 mb-2">
                            {categories.map(cat => {
                                const catCBs = getContentBlocksForEntity(data, 'category', cat.id).filter(cb => cb.block_type === 'sens_clinique')
                                return (
                                    <div key={cat.id} className="p-3 rounded-lg border border-gray-200 bg-white">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-mono font-bold text-gray-400">{cat.id}</span>
                                            <span className="text-[11px] font-bold text-gray-800">{cat.nom}</span>
                                        </div>
                                        {cat.description && <p className="text-[10px] text-gray-500 mb-1.5">{cat.description}</p>}
                                        {catCBs.map(cb => (
                                            <p key={cb.id} className="text-[10px] text-gray-600 bg-gray-50 rounded px-2.5 py-1.5 leading-relaxed">{cb.content}</p>
                                        ))}
                                    </div>
                                )
                            })}
                        </div>
                        {justifCategories.map(cb => (
                            <p key={cb.id} className="text-[10px] text-indigo-700 bg-indigo-50/50 rounded-lg px-3 py-2 leading-relaxed border border-indigo-100 whitespace-pre-line">{cb.content}</p>
                        ))}
                    </div>

                    {/* 4. Règles d'activation */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">4. Règles d&apos;activation ({allRules.length})</h4>
                        <div className="space-y-3">
                            {['critique', 'ccc', 'standard'].map(niveau => {
                                const nRules = allRules.filter(r => r.niveau === niveau || (niveau === 'standard' && !['critique', 'ccc'].includes(r.niveau)))
                                if (nRules.length === 0) return null
                                const nStyle = NIVEAU_COLORS[niveau] || NIVEAU_COLORS.standard
                                return (
                                    <div key={niveau}>
                                        <p className={`text-[9px] font-bold uppercase mb-1.5 ${nStyle.text}`}>{nStyle.label} ({nRules.length})</p>
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

                    {/* 5. Recommandations */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">5. Recommandations ({allRecos.length})</h4>
                        <div className="space-y-2">
                            {allRecos.map(reco => {
                                const nStyle = NIVEAU_COLORS[reco.niveau] || NIVEAU_COLORS.standard
                                return (
                                    <div key={reco.id} className="p-2.5 rounded-lg border border-gray-200 bg-white">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${nStyle.bg} ${nStyle.text}`}>{reco.niveau}</span>
                                            <span className="text-[9px] text-gray-400 font-mono">{reco.category_id}</span>
                                        </div>
                                        <p className="text-[10.5px] text-gray-700 mb-1">👤 {reco.wording_utilisateur}</p>
                                        <p className="text-[10px] text-gray-500 italic">🔵 IDEC : {reco.wording_idec}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 6. Micro-Tâches */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">6. Micro-tâches ({allMTs.length})</h4>
                        <table className="w-full text-[10px] border-collapse">
                            <thead><tr className="bg-gray-50 text-left">
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-14">Type</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Action</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-24">Acteur</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-12">ASR</th>
                            </tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {allMTs.map(mt => {
                                    const tStyle = MT_TYPE_STYLES[mt.type] || { bg: 'bg-gray-100', text: 'text-gray-600' }
                                    return (
                                        <tr key={mt.id}>
                                            <td className="px-2 py-1.5">
                                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${tStyle.bg} ${tStyle.text}`}>{mt.type}</span>
                                            </td>
                                            <td className="px-2 py-1.5 text-gray-700">{mt.libelle}</td>
                                            <td className="px-2 py-1.5 text-gray-500 text-[9px]">{mt.acteur?.join(', ') || '—'}</td>
                                            <td className="px-2 py-1.5 text-center">{mt.is_contributive ? <span className="text-emerald-600 font-bold">📍</span> : <span className="text-gray-300">💡</span>}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* 7. Acteurs */}
                    {justifActeurs.length > 0 && (
                        <div className="cr-bloc">
                            <h4 className="cr-section-title">7. Écosystème d&apos;acteurs</h4>
                            {justifActeurs.map(cb => (
                                <p key={cb.id} className="text-[10.5px] text-gray-700 bg-amber-50/50 rounded-lg px-3 py-2.5 leading-relaxed border border-amber-100 whitespace-pre-line">{cb.content}</p>
                            ))}
                        </div>
                    )}

                    {/* 8. Liens inter-MP */}
                    {liensInterMP.length > 0 && (
                        <div className="cr-bloc">
                            <h4 className="cr-section-title">8. Liens inter-MP</h4>
                            {liensInterMP.map(cb => (
                                <p key={cb.id} className="text-[10.5px] text-gray-700 bg-cyan-50/50 rounded-lg px-3 py-2.5 leading-relaxed border border-cyan-100 whitespace-pre-line">{cb.content}</p>
                            ))}
                        </div>
                    )}

                    {/* 9. Métriques */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">9. Métriques</h4>
                        <div className="grid grid-cols-3 gap-3 text-[10px]">
                            {[
                                { label: 'Questions', val: questions.length },
                                { label: 'Catégories', val: categories.length },
                                { label: 'Règles', val: allRules.length },
                                { label: 'Recommandations', val: allRecos.length },
                                { label: 'Micro-Tâches', val: allMTs.length },
                                { label: 'Contributives (📍)', val: contributiveMTs.length },
                            ].map(m => (
                                <div key={m.label} className="p-3 rounded-lg bg-gray-50 text-center border border-gray-100">
                                    <div className="text-lg font-bold text-gray-800">{m.val}</div>
                                    <div className="text-gray-400 mt-0.5">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-4 mt-6 flex items-center justify-between">
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
