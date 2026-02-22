/* MPDetailView — Fired rules first, non-fired collapsed. <300L. */

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, TrendingUp, ListChecks, ChevronDown, Lightbulb, HelpCircle, Target, Filter } from 'lucide-react'
import {
    evaluateRule, getCategoriesForMP, getRulesForMP, getQuestionText,
    VULN_COLORS, type VulnerabilityId,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface MPDetailProps {
    data: SimulatorTabProps['data']
    answers: Record<string, string>
    activatedMPs: string[]
    activatedCats: Map<string, { mpId: string; niveau: string; firedRules?: unknown[] }>
    selectedMP: string
    setSelectedMP: (mp: string | null) => void
    mpMap: Record<string, { nom: string; objectif?: string | null; vulnerability_id?: string; asr_wording?: string | null; asr_criteres_validation?: string | null }>
}

export function MPDetailView({ data, answers, activatedMPs, activatedCats, selectedMP, setSelectedMP, mpMap }: MPDetailProps) {
    const mp = mpMap[selectedMP]
    const mpColor = vColorMap[(mp?.vulnerability_id) as VulnerabilityId] || '#999'
    const isActive = activatedMPs.includes(selectedMP)
    const mpCategories = useMemo(() => getCategoriesForMP(data, selectedMP), [data, selectedMP])
    const mpRules = useMemo(() => getRulesForMP(data, selectedMP), [data, selectedMP])
    const mpRecos = useMemo(() => data.recommendations.filter(r => r.mp_id === selectedMP), [data, selectedMP])
    const mpMTs = useMemo(() => data.microTaches.filter(mt => mt.mp_id === selectedMP), [data, selectedMP])
    const firedRuleIds = useMemo(() => new Set(mpRules.filter(r => evaluateRule(r, answers)).map(r => r.id)), [mpRules, answers])
    const [showInactive, setShowInactive] = useState(false)
    const [filterCat, setFilterCat] = useState<string | 'ALL'>('ALL')
    const [expandedNonFired, setExpandedNonFired] = useState<string | null>(null)

    const activeCatNiveau = useMemo(() => {
        const m = new Map<string, string>()
        for (const [catId, cat] of activatedCats.entries()) {
            if (cat.mpId === selectedMP) m.set(catId, cat.niveau)
        }
        return m
    }, [activatedCats, selectedMP])

    const activatedCategories = mpCategories.filter(c => activeCatNiveau.has(c.id))
    const inactiveCategories = mpCategories.filter(c => !activeCatNiveau.has(c.id))
    // Apply filter
    const filteredActivated = filterCat === 'ALL' ? activatedCategories : activatedCategories.filter(c => c.id === filterCat)
    const filteredInactive = filterCat === 'ALL' ? inactiveCategories : inactiveCategories.filter(c => c.id === filterCat)

    const resolveCondition = (c: { q: string; op: string; val?: string; vals?: string[]; min?: number }) => {
        const qText = getQuestionText(data, c.q)
        const answer = answers[c.q]
        const valStr = c.vals ? c.vals.join(' ou ') : String(c.val ?? c.min ?? '')
        const opFR = c.op === '==' || c.op === 'eq' ? '=' : c.op === 'in' ? 'parmi' : c.op === '>=' ? '≥' : c.op === '>' ? '>' : c.op === '<' ? '<' : c.op
        return { questionId: c.q, questionText: qText, op: opFR, expectedValue: valStr, currentAnswer: answer || null }
    }

    const niveauStyle = (niveau: string) => {
        const MAP: Record<string, { bg: string; text: string; border: string; badge: string }> = {
            critique: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', badge: 'bg-red-100 text-red-600' },
            ccc: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-600' },
            standard: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-600' },
        }
        return MAP[niveau] || { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-500' }
    }

    return (
        <div>
            {/* Back + header */}
            <div className="flex items-center gap-3 mb-3">
                <motion.button onClick={() => setSelectedMP(null)}
                    className="w-8 h-8 rounded-lg bg-white/60 hover:bg-white border border-monka-border flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ArrowLeft className="w-4 h-4 text-monka-text" />
                </motion.button>
                <span className="text-[10px] font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: mpColor }}>{mp?.vulnerability_id}</span>
                <span className="text-[10px] font-bold text-white px-2 py-1 rounded bg-gray-600">{selectedMP}</span>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-monka-heading truncate">{mp?.nom || selectedMP}</h3>
                    {mp?.objectif && <p className="text-[10px] text-monka-muted truncate">{mp.objectif}</p>}
                </div>
                {isActive
                    ? <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: mpColor }}>ACTIF</span>
                    : <span className="text-[10px] text-monka-muted bg-gray-100 px-2.5 py-1 rounded-full">Inactif</span>}
            </div>
            {/* ASR BLOCK */}
            {mp?.asr_wording && (
                <div className="mb-4 p-3.5 rounded-xl border-2 border-dashed" style={{ borderColor: mpColor + '60', backgroundColor: mpColor + '08' }}>
                    <div className="flex items-center gap-2 mb-1.5">
                        <Target className="w-4 h-4" style={{ color: mpColor }} />
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: mpColor }}>Objectif ASR — Atteinte de Seuil de Résultat</span>
                    </div>
                    <p className="text-xs font-medium text-monka-heading leading-snug">{mp.asr_wording}</p>
                    {mp.asr_criteres_validation && (
                        <p className="text-[10px] text-monka-muted mt-1.5 italic">Critères : {mp.asr_criteres_validation}</p>
                    )}
                </div>
            )}
            {/* Stats bar */}
            <div className="flex gap-3 mb-4">
                {[
                    { val: activatedCategories.length, total: mpCategories.length, label: 'Catégories activées' },
                    { val: firedRuleIds.size, total: mpRules.length, label: 'Règles fired' },
                    { val: mpRecos.length, total: mpRecos.length, label: 'Recos' },
                    { val: mpMTs.length, total: mpMTs.length, label: 'MT' },
                ].map((s, i) => (
                    <div key={i} className="flex-1 glass p-2.5 rounded-xl text-center">
                        <div className="text-base font-bold text-monka-heading">{s.val}<span className="text-monka-muted text-xs">/{s.total}</span></div>
                        <div className="text-[9px] text-monka-muted">{s.label}</div>
                    </div>
                ))}
            </div>
            {/* CATEGORY FILTER */}
            {mpCategories.length > 1 && (
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                    <Filter className="w-3.5 h-3.5 text-monka-muted flex-shrink-0" />
                    <button onClick={() => setFilterCat('ALL')}
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-colors ${filterCat === 'ALL' ? 'text-white' : 'text-monka-muted bg-gray-100 hover:bg-gray-200'}`}
                        style={filterCat === 'ALL' ? { backgroundColor: mpColor } : undefined}>
                        Toutes ({mpCategories.length})
                    </button>
                    {mpCategories.map(cat => {
                        const isActiveCat = activeCatNiveau.has(cat.id)
                        return (
                            <button key={cat.id} onClick={() => setFilterCat(cat.id === filterCat ? 'ALL' : cat.id)}
                                className={`text-[10px] px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-colors ${filterCat === cat.id ? 'text-white' : isActiveCat ? 'text-green-700 bg-green-50 hover:bg-green-100' : 'text-monka-muted bg-gray-100 hover:bg-gray-200'}`}
                                style={filterCat === cat.id ? { backgroundColor: mpColor } : undefined}>
                                {cat.id} {isActiveCat ? '✓' : ''}
                            </button>
                        )
                    })}
                </div>
            )}
            {/* ACTIVATED CATEGORIES */}
            {filteredActivated.length > 0 && (
                <div className="mb-5">
                    <h4 className="text-[10px] font-bold text-monka-heading uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-green-500" /> Catégories Activées ({filteredActivated.length})
                    </h4>
                    <div className="space-y-3">
                        {filteredActivated.map(cat => renderCategory(cat, true))}
                    </div>
                </div>
            )}
            {/* INACTIVE CATEGORIES */}
            {filteredInactive.length > 0 && (
                <div>
                    <button onClick={() => setShowInactive(!showInactive)}
                        className="w-full flex items-center gap-2 text-[10px] font-bold text-monka-muted uppercase tracking-wider mb-3 hover:text-monka-text transition-colors">
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showInactive ? 'rotate-180' : ''}`} />
                        Catégories Inactives ({filteredInactive.length})
                    </button>
                    <AnimatePresence>
                        {showInactive && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 overflow-hidden">
                                {filteredInactive.map(cat => renderCategory(cat, false))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
    function renderRule(rule: ReturnType<typeof getRulesForMP>[0], isFired: boolean) {
        const conditions = (rule.condition_logic as unknown as { q: string; op: string; val?: string; vals?: string[]; min?: number }[]) || []
        const resolved = conditions.map(resolveCondition)
        return (
            <div key={rule.id}
                className={`p-3 rounded-lg transition-all ${isFired
                    ? 'bg-green-50 border-2 border-green-400 shadow-sm shadow-green-100'
                    : 'bg-gray-50/30 border border-gray-200/50 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                    {isFired ? <span className="text-sm font-bold text-green-600">✅</span> : <span className="text-sm text-gray-300">○</span>}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${niveauStyle(rule.niveau).badge}`}>{rule.niveau}</span>
                    <span className="text-[10px] text-monka-muted">{rule.delai_jours}j</span>
                    {isFired && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">FIRED</span>}
                </div>
                <div className="space-y-1.5 mb-2">
                    {resolved.map((c, i) => (
                        <div key={i} className={`text-[11px] p-2 rounded-lg ${isFired ? 'bg-green-100/60' : 'bg-gray-100/50'}`}>
                            <p className="font-medium text-monka-heading">« {c.questionText} »</p>
                            <p className="text-monka-muted mt-0.5">
                                Condition : réponse {c.op} <strong className="text-monka-text">{c.expectedValue}</strong>
                                {c.currentAnswer && (
                                    <span className={`ml-2 ${isFired ? 'text-green-600 font-bold' : 'text-orange-500'}`}>
                                        → {c.currentAnswer} {isFired ? '✅' : '✗'}
                                    </span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                {rule.sens_clinique && (
                    <div className="flex gap-2 items-start p-2 rounded-lg bg-blue-50/50 border border-blue-100">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-[11px] text-blue-800 leading-snug italic">{rule.sens_clinique}</p>
                    </div>
                )}
            </div>
        )
    }

    function renderCategory(cat: typeof mpCategories[0], isActivated: boolean) {
        const niveau = activeCatNiveau.get(cat.id)
        const ns = niveau ? niveauStyle(niveau) : niveauStyle('')
        const catRules = mpRules.filter(r => r.category_id === cat.id)
        const catFiredRules = catRules.filter(r => firedRuleIds.has(r.id))
        const catNonFiredRules = catRules.filter(r => !firedRuleIds.has(r.id))
        const catRecos = mpRecos.filter(r => r.category_id === cat.id)
        const activeReco = catRecos.find(r => r.niveau === niveau)
        const catMTs = mpMTs.filter(mt => mt.category_id === cat.id)

        return (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl border overflow-hidden ${isActivated ? ns.border : 'border-gray-200 opacity-60'}`}>
                {/* Category header */}
                <div className={`px-4 py-2.5 ${isActivated ? ns.bg : 'bg-gray-50/50'}`}>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-monka-muted">{cat.id}</span>
                        <span className="text-xs font-bold text-monka-heading flex-1">{cat.nom}</span>
                        {niveau && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${ns.badge}`}>{niveau.toUpperCase()}</span>}
                        {isActivated && <span className="text-[9px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">✓ ACTIVÉE</span>}
                    </div>
                </div>

                {/* Rules — fired first, non-fired collapsed */}
                {catRules.length > 0 && (
                    <div className="px-4 py-3 border-t border-monka-border/30">
                        <div className="flex items-center gap-1.5 mb-2">
                            <HelpCircle className="w-3 h-3 text-monka-muted" />
                            <span className="text-[10px] font-bold text-monka-muted uppercase">Comment ça s&apos;active</span>
                        </div>
                        {/* FIRED RULES — shown first, prominent */}
                        {catFiredRules.length > 0 && (
                            <div className="space-y-2 mb-2">
                                {catFiredRules.map(rule => renderRule(rule, true))}
                            </div>
                        )}
                        {/* NON-FIRED RULES — collapsed */}
                        {catNonFiredRules.length > 0 && (
                            <div>
                                <button onClick={() => setExpandedNonFired(prev => prev === cat.id ? null : cat.id)}
                                    className="flex items-center gap-1.5 text-[10px] font-bold text-monka-muted hover:text-monka-text transition-colors mt-1">
                                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedNonFired === cat.id ? 'rotate-180' : ''}`} />
                                    Autres règles ({catNonFiredRules.length})
                                </button>
                                <AnimatePresence>
                                    {expandedNonFired === cat.id && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="space-y-2 mt-2 overflow-hidden">
                                            {catNonFiredRules.map(rule => renderRule(rule, false))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                )}

                {/* Active recommendation */}
                {activeReco && isActivated && (
                    <div className="px-4 py-3 border-t border-monka-border/30">
                        <div className="flex items-center gap-1.5 mb-2">
                            <TrendingUp className="w-3 h-3" style={{ color: mpColor }} />
                            <span className="text-[10px] font-bold text-monka-muted uppercase">Recommandation Active</span>
                        </div>
                        <div className={`p-3 rounded-lg border ${ns.border} ${ns.bg}`}>
                            <p className="text-xs text-monka-heading leading-snug font-medium">{activeReco.wording_utilisateur}</p>
                            <p className="text-[10px] text-monka-muted italic mt-1">IDEC : {activeReco.wording_idec}</p>
                        </div>
                    </div>
                )}

                {/* Micro-Tâches */}
                {catMTs.length > 0 && isActivated && (
                    <div className="px-4 py-3 border-t border-monka-border/30">
                        <div className="flex items-center gap-1.5 mb-2">
                            <ListChecks className="w-3 h-3 text-monka-muted" />
                            <span className="text-[10px] font-bold text-monka-muted uppercase">Micro-Tâches ({catMTs.length})</span>
                        </div>
                        <div className="space-y-1">
                            {catMTs.map(mt => (
                                <div key={mt.id} className="flex items-center gap-2 text-[11px] py-1">
                                    <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600'
                                        : mt.type === 'INFO' ? 'bg-green-100 text-green-600' : mt.type === 'ORGA' ? 'bg-purple-100 text-purple-600'
                                            : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                    <span className="text-monka-text flex-1">{mt.libelle}</span>
                                    {mt.is_contributive && <span className="text-[8px] font-bold text-amber-600 bg-amber-50 px-1 py-0.5 rounded">ASR</span>}
                                    {mt.acteur && <span className="text-[9px] text-monka-muted bg-gray-100 px-1.5 py-0.5 rounded">{mt.acteur}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        )
    }
}
