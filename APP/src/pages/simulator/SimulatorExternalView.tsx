/* SimulatorExternalView — Patient/Aidant Vue
   Extracted from SimulatorPage for architecture compliance. */

import { motion } from 'framer-motion'
import { Eye, Users, CheckCircle2 } from 'lucide-react'
import type { SimulatorTabProps } from './types'

/** Niveau ordering for determining MP alert level */
const NIVEAU_ORDER: Record<string, number> = { critique: 3, ccc: 2, standard: 1 }

/** Color map for criticality levels */
const CRIT_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    critique: { bg: '#EF4444', text: '#FECACA', border: '#EF444440', gradient: 'linear-gradient(135deg, #DC2626, #B91C1C)' },
    ccc: { bg: '#F59E0B', text: '#FEF3C7', border: '#F59E0B40', gradient: 'linear-gradient(135deg, #D97706, #B45309)' },
    standard: { bg: '#10B981', text: '#D1FAE5', border: '#10B98140', gradient: 'linear-gradient(135deg, #059669, #047857)' },
}

interface ExternalViewProps extends Pick<SimulatorTabProps, 'data' | 'activeV' | 'activatedMPs' | 'activatedCats'> {
    mpMap: Record<string, { nom: string; vulnerability_id: string; objectif?: string | null; signature_a?: string | null; signature_b?: string | null }>
    mpVulnMap: Record<string, string>
}

/**
 * SimulatorExternalView — Patient/Aidant facing view.
 * Shows activated MPs grouped by criticality, with recos and MTs.
 */
export function SimulatorExternalView({ data, activeV, activatedMPs, activatedCats, mpMap, mpVulnMap }: ExternalViewProps) {
    // Gather prevention recos from non-activated MPs
    const activatedMPSet = new Set(activatedMPs)
    const preventionRecosByMP: Record<string, typeof data.recommendations> = {}
    data.recommendations.forEach(r => {
        if (r.niveau !== 'prevention') return
        if (activatedMPSet.has(r.mp_id)) return
        if (activeV !== 'ALL' && mpVulnMap[r.mp_id] !== activeV) return
        if (!preventionRecosByMP[r.mp_id]) preventionRecosByMP[r.mp_id] = []
        preventionRecosByMP[r.mp_id].push(r)
    })
    const preventionMPIds = Object.keys(preventionRecosByMP)
    const hasActivated = activatedMPs.length > 0
    const hasPrevention = preventionMPIds.length > 0

    if (!hasActivated && !hasPrevention) {
        return (
            <motion.div key="external" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-4 h-4 text-monka-primary" />
                    <h3 className="text-sm font-bold text-monka-heading">Vue Utilisateur — Parcours personnalisé</h3>
                </div>
                <div className="text-center py-16 text-monka-muted text-sm">
                    <Users className="w-12 h-12 text-monka-muted/30 mx-auto mb-3" />
                    <p>Aucun parcours activé</p>
                    <p className="text-xs mt-1">Répondez aux questions pour voir le rendu utilisateur</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div key="external" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto p-5">
            <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-monka-primary" />
                <h3 className="text-sm font-bold text-monka-heading">Vue Utilisateur — Parcours personnalisé</h3>
            </div>

            <div className="space-y-5">
                {/* Activated MPs */}
                {activatedMPs.map(mpId => (
                    <ActivatedMPCard key={mpId} mpId={mpId} data={data} activatedCats={activatedCats} mpMap={mpMap} />
                ))}

                {/* Prevention recos — from non-activated MPs */}
                {hasPrevention && (
                    <PreventionSection data={data} preventionRecosByMP={preventionRecosByMP} preventionMPIds={preventionMPIds} mpMap={mpMap} />
                )}
            </div>
        </motion.div>
    )
}

/* ---- Sub-components ---- */

/** Single activated MP card with recos and MTs */
function ActivatedMPCard({ mpId, data, activatedCats, mpMap }: {
    mpId: string
    data: ExternalViewProps['data']
    activatedCats: ExternalViewProps['activatedCats']
    mpMap: ExternalViewProps['mpMap']
}) {
    const mp = mpMap[mpId]
    if (!mp) return null

    // Recos whose category is activated at the right niveau
    const mpRecos = data.recommendations.filter(r => {
        if (r.mp_id !== mpId) return false
        const cat = activatedCats.get(r.category_id)
        return cat && r.niveau === cat.niveau
    })

    // Determine highest activated niveau for this MP
    let maxNiveau = 0
    for (const cat of activatedCats.values()) {
        if (cat.mpId === mpId) {
            const level = NIVEAU_ORDER[cat.niveau] || 0
            if (level > maxNiveau) maxNiveau = level
        }
    }
    const niveauLabel = maxNiveau === 3 ? 'critique' : maxNiveau === 2 ? 'ccc' : 'standard'
    const critColors = CRIT_COLORS[niveauLabel] || CRIT_COLORS.standard

    // Only MTs from activated categories
    const activeCatIdsForMP = new Set<string>()
    for (const [catId, cat] of activatedCats.entries()) {
        if (cat.mpId === mpId) activeCatIdsForMP.add(catId)
    }
    const mpMTs = data.microTaches.filter(mt => mt.mp_id === mpId && activeCatIdsForMP.has(mt.category_id))
    const contributiveMTs = mpMTs.filter(mt => mt.is_contributive)
    const nonContributiveMTs = mpMTs.filter(mt => !mt.is_contributive)

    return (
        <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: critColors.border }}>
            {/* MP Header */}
            <div className="px-5 py-4" style={{ background: critColors.gradient }}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/80 text-xs font-bold bg-white/20 px-2 py-0.5 rounded">{mpId}</span>
                    <span className="text-white/60 text-xs">{mp.vulnerability_id}</span>
                    <span className="text-white text-[10px] font-bold bg-white/25 px-1.5 py-0.5 rounded uppercase">{niveauLabel}</span>
                </div>
                <h4 className="text-white font-bold text-base">{mp.nom}</h4>
                {mp.objectif && (
                    <div className="mt-2 flex items-start gap-1.5">
                        <span className="text-white/90 text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">🎯 ASR</span>
                        <p className="text-white/90 text-xs">{mp.objectif}</p>
                    </div>
                )}
                <div className="flex gap-3 mt-2">
                    <span className="text-white/70 text-[10px]">📍 {contributiveMTs.length} sécu</span>
                    <span className="text-white/70 text-[10px]">💡 {nonContributiveMTs.length} amél</span>
                </div>
            </div>

            {/* Signatures */}
            {mp.signature_a && (
                <div className="px-5 py-2 bg-white/60 border-b border-monka-border flex gap-2">
                    <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded border border-green-200">{mp.signature_a}</span>
                    {mp.signature_b && <span className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded border border-red-200">{mp.signature_b}</span>}
                </div>
            )}

            {/* Recommendations */}
            {mpRecos.length > 0 ? (
                <div className="divide-y divide-monka-border">
                    {mpRecos.map(reco => (
                        <RecoCard key={reco.id} reco={reco} data={data} critBg={critColors.bg} />
                    ))}
                </div>
            ) : (
                <div className="px-5 py-4 text-xs text-monka-muted italic">
                    Aucune recommandation pour ce micro-parcours
                </div>
            )}
        </div>
    )
}

/** Single recommendation card with MT lists */
function RecoCard({ reco, data, critBg }: {
    reco: { id: string; niveau: string; wording_utilisateur: string | null; category_id: string }
    data: ExternalViewProps['data']
    critBg: string
}) {
    const recoCls = reco.niveau === 'critique'
        ? 'bg-red-50 text-red-600 border-red-200'
        : reco.niveau === 'ccc'
            ? 'bg-amber-50 text-amber-600 border-amber-200'
            : reco.niveau === 'prevention'
                ? 'bg-purple-50 text-purple-600 border-purple-200'
                : 'bg-emerald-50 text-emerald-600 border-emerald-200'

    const recoMTs = data.microTaches.filter(mt => mt.category_id === reco.category_id)
    const recoContrib = recoMTs.filter(mt => mt.is_contributive)
    const recoNonContrib = recoMTs.filter(mt => !mt.is_contributive)

    return (
        <div className="px-5 py-4">
            <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: critBg }} />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${recoCls}`}>{reco.niveau}</span>
                    </div>
                    <p className="text-sm text-monka-text font-medium leading-snug">{reco.wording_utilisateur}</p>
                </div>
            </div>
            <MTList mts={recoContrib} label="📍 Sécurisation" borderColor="border-emerald-200" labelColor="text-emerald-600" />
            <MTList mts={recoNonContrib} label="💡 Amélioration" borderColor="border-gray-200" labelColor="text-gray-400" />
        </div>
    )
}

/** MT list sub-component — contributive or non-contributive */
function MTList({ mts, label, borderColor, labelColor }: {
    mts: Array<{ id: string; type: string; libelle: string; acteur?: string[] | null }>
    label: string
    borderColor: string
    labelColor: string
}) {
    if (mts.length === 0) return null
    return (
        <div className={`ml-6 mt-2 space-y-1 border-l-2 ${borderColor} pl-3`}>
            <span className={`text-[9px] font-bold ${labelColor} uppercase`}>{label}</span>
            {mts.map(mt => {
                const acteur = mt.acteur && mt.acteur.length > 0
                    ? mt.acteur.filter(a => !a.toLowerCase().includes('aidant') && !a.toLowerCase().includes('autonome')).join(', ') || null
                    : null
                return (
                    <div key={mt.id} className="flex items-center gap-2 text-xs py-1">
                        <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                        <span className={`flex-1 ${mt.type === 'INFO' || mt.type === 'ORGA' ? 'text-monka-muted' : 'text-monka-text'}`}>{mt.libelle}</span>
                        {acteur && <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{acteur}</span>}
                    </div>
                )
            })}
        </div>
    )
}

/** Prevention section for non-activated MPs */
function PreventionSection({ data, preventionRecosByMP, preventionMPIds, mpMap }: {
    data: ExternalViewProps['data']
    preventionRecosByMP: Record<string, typeof data.recommendations>
    preventionMPIds: string[]
    mpMap: ExternalViewProps['mpMap']
}) {
    return (
        <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <h3 className="text-sm font-bold text-monka-heading">
                    🛡 Prévention — Parcours non activés ({preventionMPIds.length} MP)
                </h3>
            </div>
            <p className="text-[11px] text-monka-muted mb-3">
                Recommandations de prévention applicables même sans activation du parcours
            </p>
            <div className="space-y-4">
                {preventionMPIds.map(mpId => {
                    const mp = mpMap[mpId]
                    if (!mp) return null
                    const recos = preventionRecosByMP[mpId]
                    const prevMTs = data.microTaches.filter(mt => mt.mp_id === mpId && mt.is_prevention)
                    const prevContrib = prevMTs.filter(mt => mt.is_contributive)
                    const prevNonContrib = prevMTs.filter(mt => !mt.is_contributive)

                    return (
                        <div key={mpId} className="rounded-2xl border-2 border-purple-200 overflow-hidden">
                            <div className="px-5 py-3" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white/80 text-xs font-bold bg-white/20 px-2 py-0.5 rounded">{mpId}</span>
                                    <span className="text-white/60 text-xs">{mp.vulnerability_id}</span>
                                    <span className="text-white text-[10px] font-bold bg-white/25 px-1.5 py-0.5 rounded uppercase">prévention</span>
                                </div>
                                <h4 className="text-white font-bold text-sm">{mp.nom}</h4>
                                {prevMTs.length > 0 && (
                                    <div className="flex gap-3 mt-1.5">
                                        {prevContrib.length > 0 && <span className="text-white/70 text-[10px]">📍 {prevContrib.length} sécu</span>}
                                        {prevNonContrib.length > 0 && <span className="text-white/70 text-[10px]">💡 {prevNonContrib.length} amél</span>}
                                    </div>
                                )}
                            </div>
                            <div className="divide-y divide-monka-border">
                                {recos.map(reco => {
                                    const recoMTs = data.microTaches.filter(mt => mt.mp_id === mpId && mt.is_prevention)
                                    const recoContrib = recoMTs.filter(mt => mt.is_contributive)
                                    const recoNonContrib = recoMTs.filter(mt => !mt.is_contributive)

                                    return (
                                        <div key={reco.id} className="px-5 py-3">
                                            <div className="flex items-start gap-2 mb-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-purple-400" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded border font-bold bg-purple-50 text-purple-600 border-purple-200">prévention</span>
                                                    </div>
                                                    <p className="text-sm text-monka-text leading-snug">{reco.wording_utilisateur}</p>
                                                </div>
                                            </div>
                                            <MTList mts={recoContrib} label="📍 Sécurisation" borderColor="border-purple-200" labelColor="text-purple-600" />
                                            <MTList mts={recoNonContrib} label="💡 Amélioration" borderColor="border-gray-200" labelColor="text-gray-400" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
