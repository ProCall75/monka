/* =============================================
   MPDetailView — MP Drill-Down Sub-Component
   
   Shows detailed categories with rules, recos,
   and micro-tâches for a single selected MP.
   Extracted from SimulatorPage activation tab.
   ============================================= */

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, TrendingUp, ListChecks } from 'lucide-react'
import {
    evaluateRule, getActivatedCategories,
    VULN_COLORS, getCategoriesForMP, getRulesForMP,
    type VulnerabilityId,
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
    mpMap: Record<string, { nom: string; objectif?: string | null; vulnerability_id?: string; signature_a?: string | null; signature_b?: string | null }>
}

/**
 * MPDetailView — Drill-down view for a single MP.
 * Shows categories with their rules, recommendations, and MTs.
 */
export function MPDetailView({ data, answers, activatedMPs, activatedCats, selectedMP, setSelectedMP, mpMap }: MPDetailProps) {
    const mp = mpMap[selectedMP]
    const mpColor = vColorMap[(mp?.vulnerability_id) as VulnerabilityId] || '#999'
    const isActive = activatedMPs.includes(selectedMP)
    const mpCategories = useMemo(() => getCategoriesForMP(data, selectedMP), [data, selectedMP])
    const mpRules = useMemo(() => getRulesForMP(data, selectedMP), [data, selectedMP])
    const mpRecos = useMemo(() => data.recommendations.filter(r => r.mp_id === selectedMP), [data, selectedMP])
    const mpMTs = useMemo(() => data.microTaches.filter(mt => mt.mp_id === selectedMP), [data, selectedMP])

    const firedRuleIds = useMemo(() => new Set(
        mpRules.filter(r => evaluateRule(r, answers)).map(r => r.id)
    ), [mpRules, answers])

    const activeCatNiveau = useMemo(() => {
        const m = new Map<string, string>()
        for (const [catId, cat] of activatedCats.entries()) {
            if (cat.mpId === selectedMP) m.set(catId, cat.niveau)
        }
        return m
    }, [activatedCats, selectedMP])

    const formatConditions = (rule: typeof mpRules[0]) => {
        const conditions = rule.condition_logic as unknown as { q: string; op: string; val?: string; vals?: string[]; min?: number }[]
        if (!conditions || !Array.isArray(conditions)) return []
        return conditions.map(c => {
            const answer = answers[c.q]
            const answerStr = answer ? (Array.isArray(answer) ? answer.join(', ') : String(answer)) : null
            const valStr = c.vals ? c.vals.join(', ') : String(c.val ?? c.min ?? '')
            return { q: c.q, op: c.op, val: valStr, answer: answerStr, answered: !!answer }
        })
    }

    return (
        <div>
            {/* Back + header */}
            <div className="flex items-center gap-3 mb-4">
                <motion.button onClick={() => setSelectedMP(null)}
                    className="w-8 h-8 rounded-lg bg-white/60 hover:bg-white border border-monka-border flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ArrowLeft className="w-4 h-4 text-monka-text" />
                </motion.button>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: mpColor }}>{mp?.vulnerability_id}</span>
                    <span className="text-[10px] font-bold text-white px-2 py-1 rounded bg-gray-600">{selectedMP}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-monka-heading truncate">{mp?.nom || selectedMP}</h3>
                    {mp?.objectif && <p className="text-[10px] text-monka-muted truncate">{mp.objectif}</p>}
                </div>
                {isActive ? (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: mpColor }}>ACTIF</span>
                ) : (
                    <span className="text-[10px] text-monka-muted bg-gray-100 px-2.5 py-1 rounded-full">Inactif</span>
                )}
            </div>

            {/* Signatures */}
            {mp?.signature_a && (
                <div className="flex gap-2 mb-4">
                    <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded border border-green-200">🎯 {mp.signature_a}</span>
                    {mp.signature_b && <span className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded border border-red-200">⚠️ {mp.signature_b}</span>}
                </div>
            )}

            {/* Stats */}
            <div className="flex gap-3 mb-5">
                {[
                    { val: mpCategories.length, label: 'Catégories' },
                    { val: <><span className="text-green-600">{firedRuleIds.size}</span><span className="text-monka-muted text-sm">/{mpRules.length}</span></>, label: 'Règles fired' },
                    { val: mpRecos.length, label: 'Recos' },
                    { val: mpMTs.length, label: 'Micro-Tâches' },
                ].map((s, i) => (
                    <div key={i} className="flex-1 glass p-3 rounded-xl text-center">
                        <div className="text-lg font-bold text-monka-heading">{s.val}</div>
                        <div className="text-[10px] text-monka-muted">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Categories */}
            <div className="space-y-4">
                {mpCategories.map(cat => {
                    const catActivatedNiveau = activeCatNiveau.get(cat.id)
                    const catRules = mpRules.filter(r => r.category_id === cat.id)
                    const catFiredRules = catRules.filter(r => firedRuleIds.has(r.id))
                    const catRecos = mpRecos.filter(r => r.category_id === cat.id)
                    const activeReco = catRecos.find(r => r.niveau === catActivatedNiveau)
                    const catMTs = mpMTs.filter(mt => mt.category_id === cat.id)
                    const contributiveMTs = catMTs.filter(mt => mt.is_contributive)
                    const nonContributiveMTs = catMTs.filter(mt => !mt.is_contributive)

                    const nc = catActivatedNiveau === 'critique' ? { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', accent: '#ef4444' }
                        : catActivatedNiveau === 'ccc' ? { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', accent: '#f59e0b' }
                            : catActivatedNiveau === 'standard' ? { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', accent: '#10b981' }
                                : { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200', accent: '#9ca3af' }

                    return (
                        <motion.div key={cat.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className={`rounded-xl border overflow-hidden ${catActivatedNiveau ? nc.border : 'border-monka-border opacity-70'}`}>
                            {/* Header */}
                            <div className={`px-4 py-3 ${catActivatedNiveau ? nc.bg : 'bg-gray-50/50'}`}>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono font-bold text-monka-muted">{cat.id}</span>
                                    <span className="text-xs font-bold text-monka-heading flex-1">{cat.nom}</span>
                                    {catActivatedNiveau && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${nc.bg} ${nc.text} ${nc.border}`}>{catActivatedNiveau.toUpperCase()}</span>}
                                    {catActivatedNiveau && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">✓ ACTIVÉE</span>}
                                </div>
                                {cat.description && <p className="text-[10px] text-monka-muted mt-1">{cat.description}</p>}
                            </div>

                            {/* Rules */}
                            {catRules.length > 0 && (
                                <div className="px-4 py-2.5 border-t border-monka-border/50">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Shield className="w-3 h-3 text-monka-muted" />
                                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Règles ({catFiredRules.length}/{catRules.length} fired)</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        {catRules.map(rule => {
                                            const isFired = firedRuleIds.has(rule.id)
                                            const conditions = formatConditions(rule)
                                            return (
                                                <div key={rule.id} className={`p-2 rounded-lg text-[10px] ${isFired ? 'bg-green-50/80 border border-green-200' : 'bg-gray-50 border border-gray-100'}`}>
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <span className={`px-1.5 py-0.5 rounded font-bold ${rule.niveau === 'critique' ? 'bg-red-100 text-red-600' : rule.niveau === 'ccc' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>{rule.niveau}</span>
                                                        <span className="text-monka-muted flex-1 truncate">{rule.sens_clinique || '—'}</span>
                                                        <span className="text-monka-muted">{rule.delai_jours}j</span>
                                                        {isFired && <span className="text-green-600 font-bold">✓</span>}
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {conditions.map((c, i) => (
                                                            <span key={i} className={`px-1.5 py-0.5 rounded font-mono ${isFired && c.answered ? 'bg-green-100 text-green-700' : c.answered ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400'}`}>
                                                                {c.q} {c.op} {c.val} {c.answered ? `("${c.answer}") ${isFired ? '✓' : '✗'}` : '○'}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Recos */}
                            {catRecos.length > 0 && (
                                <div className="px-4 py-2.5 border-t border-monka-border/50">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <TrendingUp className="w-3 h-3 text-monka-muted" />
                                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Recommandations ({catRecos.length})</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        {catRecos.map(reco => {
                                            const isActiveReco = reco.id === activeReco?.id
                                            const recoCls = reco.niveau === 'critique' ? 'border-red-200 bg-red-50' : reco.niveau === 'ccc' ? 'border-amber-200 bg-amber-50' : reco.niveau === 'prevention' ? 'border-purple-200 bg-purple-50' : 'border-emerald-200 bg-emerald-50'
                                            const niveauBadge = reco.niveau === 'critique' ? 'bg-red-100 text-red-600' : reco.niveau === 'ccc' ? 'bg-amber-100 text-amber-600' : reco.niveau === 'prevention' ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'
                                            return (
                                                <div key={reco.id} className={`p-2.5 rounded-lg border ${isActiveReco ? recoCls + ' ring-1 ring-offset-1' : 'border-gray-100 bg-white/50 opacity-50'}`} style={isActiveReco ? { ringColor: nc.accent } : {}}>
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${niveauBadge}`}>{reco.niveau}</span>
                                                        {isActiveReco && <span className="text-[9px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">★ ACTIVE</span>}
                                                    </div>
                                                    <p className="text-xs text-monka-text leading-snug mb-1">{reco.wording_utilisateur}</p>
                                                    <p className="text-[10px] text-monka-muted italic">IDEC : {reco.wording_idec}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Micro-Tâches */}
                            {catMTs.length > 0 && (
                                <div className="px-4 py-2.5 border-t border-monka-border/50">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <ListChecks className="w-3 h-3 text-monka-muted" />
                                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Micro-Tâches ({catMTs.length})</span>
                                        {contributiveMTs.length > 0 && <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold">{contributiveMTs.length} ASR</span>}
                                    </div>
                                    {contributiveMTs.length > 0 && (
                                        <div className="mb-2 pl-3 border-l-2 border-emerald-200 space-y-1">
                                            <span className="text-[9px] font-bold text-emerald-600 uppercase">📍 Sécurisation</span>
                                            {contributiveMTs.map(mt => (
                                                <div key={mt.id} className="flex items-center gap-1.5 text-[11px]">
                                                    <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                                    <span className="text-monka-text">{mt.libelle}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {nonContributiveMTs.length > 0 && (
                                        <div className="pl-3 border-l-2 border-gray-200 space-y-1">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase">💡 Amélioration</span>
                                            {nonContributiveMTs.map(mt => (
                                                <div key={mt.id} className="flex items-center gap-1.5 text-[11px]">
                                                    <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>{mt.type}</span>
                                                    <span className="text-monka-muted">{mt.libelle}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
