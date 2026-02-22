/* MPDrilldown — Categories → rules → recommendations → MTs.
   Content blocks at each level. Architecture: <300L, uses hooks barrel. */

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowLeft, Shield, Target, ListChecks, BookOpen, Layers, ChevronDown, Filter,
} from 'lucide-react'
import {
    VULN_META, getCategoriesForMP, getRulesForMP,
    getRecosForMP, getMTsForMP, getContentBlocksForEntity,
    type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { ExportButton } from '../../components/clinical/ExportButton'
import { MPDocumentView } from '../../components/clinical/MPDocumentView'
import { RuleExplainerFR } from '../../components/clinical/RuleExplainerFR'

interface MPDrilldownProps {
    data: MonkaData
    mpId: string
    onBack: () => void
}

// Subtle pastel backgrounds to distinguish categories visually
const CAT_COLORS = [
    'bg-blue-50/40', 'bg-emerald-50/40', 'bg-amber-50/40', 'bg-rose-50/40',
    'bg-cyan-50/40', 'bg-violet-50/40', 'bg-orange-50/40', 'bg-teal-50/40',
]

export function MPDrilldown({ data, mpId, onBack }: MPDrilldownProps) {
    const [showDoc, setShowDoc] = useState(false)
    const [catFilter, setCatFilter] = useState<string>('ALL')
    const mp = data.microParcours.find(m => m.id === mpId)
    const meta = VULN_META[(mp?.vulnerability_id || 'V1') as VulnerabilityId]
    const categories = useMemo(() => getCategoriesForMP(data, mpId), [data, mpId])
    const allRules = useMemo(() => getRulesForMP(data, mpId), [data, mpId])
    const allRecos = useMemo(() => getRecosForMP(data, mpId), [data, mpId])
    const allMTs = useMemo(() => getMTsForMP(data, mpId), [data, mpId])
    const prevMTs = useMemo(() => allMTs.filter(mt => mt.id.includes('_PREV_')), [allMTs])
    const prevRecos = useMemo(() => allRecos.filter(r => r.niveau === 'prevention'), [allRecos])
    const mpCBs = useMemo(() => getContentBlocksForEntity(data, 'mp', mpId), [data, mpId])
    const hasPrevention = prevMTs.length > 0 || prevRecos.length > 0

    // Build filter options: Tous + each category + Prévention
    const filterOptions = useMemo(() => {
        const opts: { id: string; label: string }[] = [{ id: 'ALL', label: 'Tous' }]
        categories.forEach(c => opts.push({ id: c.id, label: c.nom }))
        if (hasPrevention) opts.push({ id: 'PREV', label: 'Prévention' })
        return opts
    }, [categories, hasPrevention])

    const filteredCategories = catFilter === 'ALL' ? categories
        : catFilter === 'PREV' ? []
            : categories.filter(c => c.id === catFilter)

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
            <div className="flex gap-3 mb-4">
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

            {/* Category filter bar — below stats */}
            <div className="glass-card px-4 py-3 mb-5 flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-monka-muted" />
                <span className="text-[10px] font-bold text-monka-muted uppercase mr-1">Filtrer :</span>
                {filterOptions.map(opt => (
                    <button key={opt.id} onClick={() => setCatFilter(opt.id)}
                        className={`text-[11px] font-semibold px-3 py-2 rounded-xl transition-all border ${
                            catFilter === opt.id
                                ? opt.id === 'PREV'
                                    ? 'bg-purple-100 text-purple-700 border-purple-200 shadow-sm'
                                    : 'bg-monka-primary/10 text-monka-primary border-monka-primary/20 shadow-sm'
                                : 'bg-white/80 text-monka-text/70 border-monka-border hover:bg-white hover:shadow-sm'
                        }`}>
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Categories drill-down */}
            <div className="space-y-4">
                {filteredCategories.map((cat, catIdx) => {
                    const catRules = allRules.filter(r => r.category_id === cat.id)
                    const catRecos = allRecos.filter(r => r.category_id === cat.id)
                    const catMTs = allMTs.filter(mt => mt.category_id === cat.id && !mt.id.includes('_PREV_'))
                    const catPrevMTs = (catFilter === 'ALL') ? prevMTs.filter(mt => mt.category_id === cat.id) : []
                    const bgColor = CAT_COLORS[catIdx % CAT_COLORS.length]

                    return (
                        <motion.div key={cat.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className={`glass-card overflow-hidden ${bgColor}`}>
                            {/* Category header */}
                            <div className="px-4 py-3 border-b border-monka-border/60">
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
                                            <RuleExplainerFR key={rule.id} rule={rule} data={data} />
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

                            {/* Prevention MTs — separate block */}
                            {catPrevMTs.length > 0 && (
                                <div className="px-4 py-3 bg-purple-50/30">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Shield className="w-3 h-3 text-purple-500" />
                                        <span className="text-[10px] font-bold text-purple-600 uppercase">Prévention ({catPrevMTs.length})</span>
                                    </div>
                                    <div className="space-y-1">
                                        {catPrevMTs.map(mt => (
                                            <div key={mt.id} className="flex items-center gap-2 text-[11px] py-1">
                                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-600">PREV</span>
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

                {/* Dedicated Prévention filter view */}
                {catFilter === 'PREV' && (prevRecos.length > 0 || prevMTs.length > 0) && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="glass-card overflow-hidden bg-purple-50/30">
                        <div className="px-4 py-3 border-b border-purple-200/60">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-purple-500" />
                                <span className="text-xs font-bold text-purple-700">Prévention</span>
                                <span className="text-[10px] text-purple-400 ml-auto">{prevRecos.length} Reco · {prevMTs.length} MT</span>
                            </div>
                        </div>

                        {/* Prevention Recommendations */}
                        {prevRecos.length > 0 && (
                            <div className="px-4 py-3 border-b border-purple-200/40">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Target className="w-3 h-3 text-purple-500" />
                                    <span className="text-[10px] font-bold text-purple-600 uppercase">Recommandations ({prevRecos.length})</span>
                                </div>
                                <div className="space-y-1.5">
                                    {prevRecos.map(reco => (
                                        <div key={reco.id} className="p-2.5 rounded-lg border border-purple-200/50 bg-white/50">
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

                        {/* Prevention MTs */}
                        {prevMTs.length > 0 && (
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <ListChecks className="w-3 h-3 text-purple-500" />
                                    <span className="text-[10px] font-bold text-purple-600 uppercase">Micro-Tâches ({prevMTs.length})</span>
                                </div>
                                <div className="space-y-1">
                                    {prevMTs.map(mt => (
                                        <div key={mt.id} className="flex items-center gap-2 text-[11px] py-1">
                                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-600">PREV</span>
                                            <span className="text-monka-text flex-1">{mt.libelle}</span>
                                            {mt.acteur && <span className="text-[9px] text-monka-muted bg-gray-100 px-1.5 py-0.5 rounded">{mt.acteur}</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    )
}

// ── Sub-components ─────────────────────────────────────

function NiveauBadge({ niveau }: { niveau: string }) {
    const cls = niveau === 'critique' ? 'bg-red-100 text-red-600'
        : niveau === 'ccc' ? 'bg-amber-100 text-amber-600'
            : niveau === 'prevention' ? 'bg-purple-100 text-purple-600'
                : 'bg-emerald-100 text-emerald-600'
    return <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${cls}`}>{niveau}</span>
}
