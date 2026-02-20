/* =========================================
   MPRecosView — Recommendations sub-view
   
   Shows recommendations grouped by MP with
   active/prevention/inactive sections.
   Extracted from SimulatorMPTab.
   ========================================= */

import { ChevronDown } from 'lucide-react'
import { VULN_COLORS, type VulnerabilityId } from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface MPRecosProps {
    data: SimulatorTabProps['data']
    activeV: SimulatorTabProps['activeV']
    answers: Record<string, string>
    mpMap: Record<string, { nom: string; vulnerability_id?: string }>
    mpVulnMap: Record<string, string>
    activatedMPs: string[]
    activatedCats: Map<string, { mpId: string; niveau: string; firedRules?: unknown[] }>
}

/**
 * MPRecosView — Recommendations sub-view for the MP tab.
 * Groups recos by MP with active/prevention/inactive sections.
 */
export function MPRecosView({ data, activeV, answers, mpMap, mpVulnMap, activatedMPs, activatedCats }: MPRecosProps) {
    const filteredRecos = data.recommendations.filter(r => activeV === 'ALL' || mpVulnMap[r.mp_id] === activeV)
    const activeCatNiveau = new Map<string, string>()
    for (const [catId, cat] of activatedCats.entries()) activeCatNiveau.set(catId, cat.niveau)

    const activeRecosByMP: Record<string, typeof filteredRecos> = {}
    const preventionRecosByMP: Record<string, typeof filteredRecos> = {}
    const inactiveRecosByMP: Record<string, typeof filteredRecos> = {}
    const activatedMPSet = new Set(activatedMPs)
    filteredRecos.forEach(r => {
        const catNiveau = activeCatNiveau.get(r.category_id)
        if (catNiveau && r.niveau === catNiveau) {
            if (!activeRecosByMP[r.mp_id]) activeRecosByMP[r.mp_id] = []
            activeRecosByMP[r.mp_id].push(r)
        } else if (r.niveau === 'prevention' && !activatedMPSet.has(r.mp_id)) {
            if (!preventionRecosByMP[r.mp_id]) preventionRecosByMP[r.mp_id] = []
            preventionRecosByMP[r.mp_id].push(r)
        } else {
            if (!inactiveRecosByMP[r.mp_id]) inactiveRecosByMP[r.mp_id] = []
            inactiveRecosByMP[r.mp_id].push(r)
        }
    })

    const activeRecoCount = Object.values(activeRecosByMP).reduce((s, r) => s + r.length, 0)
    const preventionRecoCount = Object.values(preventionRecosByMP).reduce((s, r) => s + r.length, 0)
    const inactiveRecoCount = Object.values(inactiveRecosByMP).reduce((s, r) => s + r.length, 0)

    const firedRulesForCat = (catId: string) => {
        const cat = activatedCats.get(catId) as { firedRules?: unknown[] } | undefined
        return (cat?.firedRules || []) as { id: string; niveau: string; sens_clinique?: string; category_id: string; condition_logic: unknown }[]
    }
    const formatRuleQA = (rule: { condition_logic: unknown }) => {
        const conditions = rule.condition_logic as unknown as { q: string; op: string; val?: string; vals?: string[] }[]
        if (!conditions || !Array.isArray(conditions)) return ''
        return conditions.map(c => {
            const answer = answers[c.q]
            const answerStr = answer ? (Array.isArray(answer) ? answer.join(', ') : String(answer)) : '—'
            return `${c.q} = "${answerStr}"`
        }).join(' + ')
    }

    const renderMPRecoBlock = (mpId: string, recos: typeof filteredRecos, mode: 'active' | 'prevention' | 'inactive') => {
        const mp = mpMap[mpId]; const mpColor = vColorMap[(mp?.vulnerability_id || mpVulnMap[mpId]) as VulnerabilityId] || '#999'
        const isActive = mode === 'active'; const isPrevention = mode === 'prevention'
        const activatedNiveau = isActive && recos.length > 0 ? recos[0].niveau : isPrevention ? 'prevention' : null
        const niveauCls = activatedNiveau === 'critique' ? 'bg-red-50 text-red-600 border-red-200' : activatedNiveau === 'ccc' ? 'bg-amber-50 text-amber-600 border-amber-200' : activatedNiveau === 'prevention' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
        const allFiredRules = isActive ? [...new Set(recos.flatMap(r => firedRulesForCat(r.category_id)))] : []
        const borderCls = isActive ? 'border-green-300 shadow-sm shadow-green-100' : isPrevention ? 'border-purple-300 shadow-sm shadow-purple-50' : 'border-monka-border opacity-60'
        const headerBg = isActive ? 'bg-green-50' : isPrevention ? 'bg-purple-50/50' : 'bg-gray-50/50'

        return (
            <div key={mpId} className={`rounded-xl border overflow-hidden ${borderCls}`}>
                <div className={`px-4 py-2.5 flex items-center gap-2 ${headerBg}`}>
                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: mpColor }}>{mpVulnMap[mpId]}</span>
                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded bg-gray-600">{mpId}</span>
                    <span className="text-xs font-medium text-monka-heading flex-1 truncate">{mp?.nom || mpId}</span>
                    {activatedNiveau && <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${niveauCls}`}>{activatedNiveau}</span>}
                    {isActive && <span className="text-[10px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded font-bold">✓ ACTIVÉ</span>}
                    {isPrevention && <span className="text-[10px] text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded font-bold">🛡 PRÉVENTION</span>}
                </div>
                {allFiredRules.length > 0 && (
                    <div className="px-4 py-2 bg-green-50/50 border-b border-green-200/50 space-y-1">
                        {allFiredRules.map((r: { id: string; niveau: string; sens_clinique?: string; category_id: string; condition_logic: unknown }) => (
                            <div key={r.id} className="text-[10px]">
                                <span className={`inline-block px-1 py-0.5 rounded font-bold mr-1 ${r.niveau === 'critique' ? 'bg-red-100 text-red-600' : r.niveau === 'ccc' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>{r.niveau}</span>
                                <span className="text-green-700 font-mono">{formatRuleQA(r)}</span>
                                <span className="text-green-600 ml-1">→ {r.sens_clinique || r.category_id}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="divide-y divide-monka-border">
                    {recos.map(reco => {
                        const recoCls = reco.niveau === 'critique' ? 'bg-red-50 text-red-600 border-red-200' : reco.niveau === 'ccc' ? 'bg-amber-50 text-amber-600 border-amber-200' : reco.niveau === 'prevention' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        const recoMTs = isPrevention ? data.microTaches.filter(mt => mt.mp_id === mpId && mt.is_prevention) : data.microTaches.filter(mt => mt.category_id === reco.category_id && !mt.is_prevention)
                        const contributiveMTs = recoMTs.filter(mt => mt.is_contributive); const nonContributiveMTs = recoMTs.filter(mt => !mt.is_contributive)
                        const showMTs = isActive || isPrevention
                        return (
                            <div key={reco.id} className="px-4 py-3">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${recoCls}`}>{reco.niveau}</span>
                                    <span className="text-[9px] text-monka-muted font-mono">{reco.category_id}</span>
                                    <span className="text-[9px] text-monka-muted">→ {recoMTs.length} MT</span>
                                </div>
                                <p className="text-sm text-monka-text leading-snug mb-1">{reco.wording_utilisateur}</p>
                                {showMTs && contributiveMTs.length > 0 && (
                                    <div className="mt-2 pl-3 border-l-2 border-emerald-200 space-y-1">
                                        <span className="text-[9px] font-bold text-emerald-600 uppercase">📍 Sécurisation ({contributiveMTs.length})</span>
                                        {contributiveMTs.map(mt => (
                                            <div key={mt.id} className="flex items-center gap-1.5 text-[11px]">
                                                <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                                <span className="text-monka-text">{mt.libelle}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {showMTs && nonContributiveMTs.length > 0 && (
                                    <div className="mt-1.5 pl-3 border-l-2 border-gray-200 space-y-1">
                                        <span className="text-[9px] font-bold text-gray-400 uppercase">💡 Amélioration ({nonContributiveMTs.length})</span>
                                        {nonContributiveMTs.map(mt => (
                                            <div key={mt.id} className="flex items-center gap-1.5 text-[11px]">
                                                <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>{mt.type}</span>
                                                <span className="text-monka-muted">{mt.libelle}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <h3 className="text-sm font-bold text-monka-heading">Recos activées ({activeRecoCount})</h3>
                <span className="text-[10px] text-monka-muted">— {Object.keys(activeRecosByMP).length} MP actifs</span>
            </div>
            {Object.keys(activeRecosByMP).length === 0 ? (
                <div className="rounded-xl border border-dashed border-monka-border p-6 text-center mb-4">
                    <p className="text-sm text-monka-muted">Aucune catégorie activée — répondez aux questions pour déclencher des règles</p>
                </div>
            ) : (
                <div className="space-y-3 mb-4">{Object.entries(activeRecosByMP).map(([mpId, recos]) => renderMPRecoBlock(mpId, recos, 'active'))}</div>
            )}
            {preventionRecoCount > 0 && (
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <h3 className="text-sm font-bold text-monka-heading">Prévention ({preventionRecoCount})</h3>
                        <span className="text-[10px] text-monka-muted">— recos de base pour les MP non activés</span>
                    </div>
                    <div className="space-y-3">{Object.entries(preventionRecosByMP).map(([mpId, recos]) => renderMPRecoBlock(mpId, recos, 'prevention'))}</div>
                </div>
            )}
            {inactiveRecoCount > 0 && (
                <details className="group">
                    <summary className="flex items-center gap-2 cursor-pointer select-none mb-3 text-monka-muted hover:text-monka-text transition-colors">
                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                        <span className="text-xs font-bold">Autres recos ({inactiveRecoCount})</span>
                    </summary>
                    <div className="space-y-3">{Object.entries(inactiveRecosByMP).map(([mpId, recos]) => renderMPRecoBlock(mpId, recos, 'inactive'))}</div>
                </details>
            )}
        </div>
    )
}
