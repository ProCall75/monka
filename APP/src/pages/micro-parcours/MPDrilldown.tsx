/* MPDrilldown — Standalone drill-down view for a single MP.
   Shows categories → rules (in French) → recommendations → MTs.
   Content blocks integrated at each level. No persona/answers needed (data reference).
   Architecture: component < 250L, uses helpers from clinical/hooks. */

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowLeft, Shield, Target, ListChecks, BookOpen, Layers, ChevronDown,
} from 'lucide-react'
import {
    VULN_META, getCategoriesForMP, getRulesForMP,
    getRecosForMP, getMTsForMP, getContentBlocksForEntity,
    getQuestionText, type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { ExportButton } from '../../components/clinical/ExportButton'
import { MPDocumentView } from '../../components/clinical/MPDocumentView'

interface MPDrilldownProps {
    data: MonkaData
    mpId: string
    onBack: () => void
}

export function MPDrilldown({ data, mpId, onBack }: MPDrilldownProps) {
    const [showDoc, setShowDoc] = useState(false)
    const mp = data.microParcours.find(m => m.id === mpId)
    const meta = VULN_META[(mp?.vulnerability_id || 'V1') as VulnerabilityId]
    const categories = useMemo(() => getCategoriesForMP(data, mpId), [data, mpId])
    const allRules = useMemo(() => getRulesForMP(data, mpId), [data, mpId])
    const allRecos = useMemo(() => getRecosForMP(data, mpId), [data, mpId])
    const allMTs = useMemo(() => getMTsForMP(data, mpId), [data, mpId])
    const mpCBs = useMemo(() => getContentBlocksForEntity(data, 'mp', mpId), [data, mpId])

    if (!mp) return null

    if (showDoc) return <MPDocumentView data={data} mpId={mpId} onBack={() => setShowDoc(false)} />

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Header with back button */}
            <div className="flex items-center gap-3 mb-5">
                <motion.button onClick={onBack}
                    className="w-9 h-9 rounded-xl bg-white/60 hover:bg-white border border-monka-border flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ArrowLeft className="w-4 h-4 text-monka-text" />
                </motion.button>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${meta.color}30, ${meta.color}15)` }}>
                    <Layers className="w-5 h-5" style={{ color: meta.color }} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: meta.color }}>{mp.vulnerability_id}</span>
                        <span className="text-[10px] font-mono text-monka-muted">{mp.id}</span>
                    </div>
                    <h2 className="text-lg font-bold text-monka-heading">{mp.nom}</h2>
                </div>
                <ExportButton label="Fiche MP" variant="subtle" />
                <button onClick={() => setShowDoc(true)} className="text-[10px] text-monka-muted hover:text-monka-primary transition-colors">📄 Voir document</button>
            </div>

            {/* MP-level content blocks */}
            {mpCBs.length > 0 && (
                <div className="glass-card p-4 mb-4">
                    <h4 className="text-xs font-bold text-monka-muted uppercase mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Contexte clinique
                    </h4>
                    <div className="space-y-1.5">
                        {mpCBs.map(cb => (
                            <p key={cb.id} className="text-sm text-monka-text leading-relaxed">{cb.content}</p>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats bar */}
            <div className="flex gap-3 mb-5">
                {[
                    { val: categories.length, label: 'Catégories', icon: ChevronDown },
                    { val: allRules.length, label: 'Règles', icon: Shield },
                    { val: allRecos.length, label: 'Recommandations', icon: Target },
                    { val: allMTs.length, label: 'Micro-Tâches', icon: ListChecks },
                ].map(s => (
                    <div key={s.label} className="flex-1 glass-card p-3 text-center">
                        <div className="text-lg font-bold text-monka-heading">{s.val}</div>
                        <div className="text-[10px] text-monka-muted">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Categories drill-down */}
            <div className="space-y-4">
                {categories.map(cat => {
                    const catRules = allRules.filter(r => r.category_id === cat.id)
                    const catRecos = allRecos.filter(r => r.category_id === cat.id)
                    const catMTs = allMTs.filter(mt => mt.category_id === cat.id)

                    return (
                        <motion.div key={cat.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className="glass-card overflow-hidden">
                            {/* Category header */}
                            <div className="px-4 py-3 bg-gray-50/50 border-b border-monka-border">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono font-bold text-monka-muted">{cat.id}</span>
                                    <span className="text-xs font-bold text-monka-heading flex-1">{cat.nom}</span>
                                    <span className="text-[10px] text-monka-muted">{catRules.length}R · {catRecos.length}Re · {catMTs.length}MT</span>
                                </div>
                                {cat.description && <p className="text-[10px] text-monka-muted mt-1">{cat.description}</p>}
                            </div>

                            {/* Rules — in French */}
                            {catRules.length > 0 && (
                                <div className="px-4 py-3 border-b border-monka-border/50">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Shield className="w-3 h-3 text-monka-muted" />
                                        <span className="text-[10px] font-bold text-monka-muted uppercase">Règles d&apos;activation ({catRules.length})</span>
                                    </div>
                                    <div className="space-y-2">
                                        {catRules.map(rule => (
                                            <RuleCardFR key={rule.id} rule={rule} data={data} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommendations */}
                            {catRecos.length > 0 && (
                                <div className="px-4 py-3 border-b border-monka-border/50">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Target className="w-3 h-3 text-monka-muted" />
                                        <span className="text-[10px] font-bold text-monka-muted uppercase">Recommandations ({catRecos.length})</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        {catRecos.map(reco => (
                                            <div key={reco.id} className="p-2.5 rounded-lg border border-monka-border bg-white/50">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <NiveauBadge niveau={reco.niveau} />
                                                </div>
                                                <p className="text-xs text-monka-text leading-snug mb-1">{reco.wording_utilisateur}</p>
                                                <p className="text-[10px] text-monka-muted italic">IDEC : {reco.wording_idec}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Micro-Tâches */}
                            {catMTs.length > 0 && (
                                <div className="px-4 py-3">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <ListChecks className="w-3 h-3 text-monka-muted" />
                                        <span className="text-[10px] font-bold text-monka-muted uppercase">Micro-Tâches ({catMTs.length})</span>
                                    </div>
                                    <div className="space-y-1">
                                        {catMTs.map(mt => (
                                            <div key={mt.id} className="flex items-center gap-2 text-[11px] py-1">
                                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600'
                                                        : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600'
                                                            : mt.type === 'INFO' ? 'bg-green-100 text-green-600'
                                                                : 'bg-blue-100 text-blue-600'
                                                    }`}>{mt.type}</span>
                                                <span className="text-monka-text flex-1">{mt.libelle}</span>
                                                {mt.acteur && <span className="text-[9px] text-monka-muted bg-gray-100 px-1.5 py-0.5 rounded">{mt.acteur}</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

// ── Sub-components ─────────────────────────────────────

/** Rule card with conditions explained in French */
function RuleCardFR({ rule, data }: { rule: MonkaData['activationRules'][0]; data: MonkaData }) {
    const conditions = rule.condition_logic as unknown as { q: string; op: string; val?: string; vals?: string[]; min?: number }[]

    return (
        <div className="p-2.5 rounded-lg border border-monka-border bg-white/50">
            <div className="flex items-center gap-1.5 mb-1.5">
                <NiveauBadge niveau={rule.niveau} />
                <span className="text-[10px] text-monka-muted">{rule.delai_jours}j</span>
                {rule.sens_clinique && (
                    <span className="text-[11px] text-monka-text flex-1 italic">{rule.sens_clinique}</span>
                )}
            </div>
            {/* Conditions in French */}
            {Array.isArray(conditions) && conditions.length > 0 && (
                <div className="space-y-1 mt-1">
                    {conditions.map((c, i) => {
                        const questionText = getQuestionText(data, c.q)
                        const valDisplay = c.vals ? c.vals.join(' ou ') : String(c.val ?? c.min ?? '')
                        return (
                            <div key={i} className="text-[11px] text-monka-text pl-3 border-l-2 border-monka-primary/20">
                                <span className="font-medium">« {questionText} »</span>
                                <span className="text-monka-muted ml-1">
                                    {c.op === 'in' ? `répondu ${valDisplay}`
                                        : c.op === 'eq' ? `= ${valDisplay}`
                                            : c.op === 'gte' ? `≥ ${valDisplay}`
                                                : c.op === 'contains' ? `contient ${valDisplay}`
                                                    : `${c.op} ${valDisplay}`}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

function NiveauBadge({ niveau }: { niveau: string }) {
    const cls = niveau === 'critique' ? 'bg-red-100 text-red-600'
        : niveau === 'ccc' ? 'bg-amber-100 text-amber-600'
            : niveau === 'prevention' ? 'bg-purple-100 text-purple-600'
                : 'bg-emerald-100 text-emerald-600'
    return <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${cls}`}>{niveau}</span>
}
