/* ExternalViewCards — Patient-facing sub-components.
   V2-07: Premium glassmorphism design, empathetic wording.
   Extracted from SimulatorExternalView for §2 compliance.
   Architecture: < 250L. */

import { CheckCircle2, Heart, Shield, Sparkles } from 'lucide-react'
import type { SimulatorTabProps } from './types'

/** Niveau ordering for determining MP alert level */
const NIVEAU_ORDER: Record<string, number> = { critique: 3, ccc: 2, standard: 1 }

/** Color map for criticality levels */
export const CRIT_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string; glow: string }> = {
    critique: { bg: '#EF4444', text: '#FECACA', border: '#EF444440', gradient: 'linear-gradient(135deg, #DC2626, #991B1B)', glow: '0 8px 32px rgba(239,68,68,0.15)' },
    ccc: { bg: '#F59E0B', text: '#FEF3C7', border: '#F59E0B40', gradient: 'linear-gradient(135deg, #D97706, #92400E)', glow: '0 8px 32px rgba(245,158,11,0.15)' },
    standard: { bg: '#10B981', text: '#D1FAE5', border: '#10B98140', gradient: 'linear-gradient(135deg, #059669, #065F46)', glow: '0 8px 32px rgba(16,185,129,0.15)' },
}

export interface ExternalViewProps extends Pick<SimulatorTabProps, 'data' | 'activeV' | 'activatedMPs' | 'activatedCats'> {
    mpMap: Record<string, { nom: string; vulnerability_id: string; objectif?: string | null; signature_a?: string | null; signature_b?: string | null }>
    mpVulnMap: Record<string, string>
}

// ── Activated MP Card ──────────────────────────────────

export function ActivatedMPCard({ mpId, data, activatedCats, mpMap }: {
    mpId: string
    data: ExternalViewProps['data']
    activatedCats: ExternalViewProps['activatedCats']
    mpMap: ExternalViewProps['mpMap']
}) {
    const mp = mpMap[mpId]
    if (!mp) return null

    const mpRecos = data.recommendations.filter(r => {
        if (r.mp_id !== mpId) return false
        const cat = activatedCats.get(r.category_id)
        return cat && r.niveau === cat.niveau
    })

    let maxNiveau = 0
    for (const cat of activatedCats.values()) {
        if (cat.mpId === mpId) {
            const level = NIVEAU_ORDER[cat.niveau] || 0
            if (level > maxNiveau) maxNiveau = level
        }
    }
    const niveauLabel = maxNiveau === 3 ? 'critique' : maxNiveau === 2 ? 'ccc' : 'standard'
    const critColors = CRIT_COLORS[niveauLabel] || CRIT_COLORS.standard

    const activeCatIdsForMP = new Set<string>()
    for (const [catId, cat] of activatedCats.entries()) {
        if (cat.mpId === mpId) activeCatIdsForMP.add(catId)
    }
    const mpMTs = data.microTaches.filter(mt => mt.mp_id === mpId && activeCatIdsForMP.has(mt.category_id))
    const contributiveMTs = mpMTs.filter(mt => mt.is_contributive)
    const nonContributiveMTs = mpMTs.filter(mt => !mt.is_contributive)

    return (
        <div className="rounded-2xl overflow-hidden transition-all hover:shadow-lg"
            style={{ border: `2px solid ${critColors.border}`, boxShadow: critColors.glow }}>
            {/* Premium header */}
            <div className="px-5 py-4 relative" style={{ background: critColors.gradient }}>
                <div className="absolute inset-0 bg-white/5" style={{ backdropFilter: 'blur(2px)' }} />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-white/80" />
                        <span className="text-white/90 text-[10px] font-bold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">{niveauLabel}</span>
                    </div>
                    <h4 className="text-white font-bold text-base leading-snug mb-1">{mp.nom}</h4>
                    {mp.objectif && (
                        <p className="text-white/80 text-xs leading-relaxed">🎯 {mp.objectif}</p>
                    )}
                    <div className="flex gap-3 mt-2.5">
                        <span className="text-white/70 text-[10px] bg-white/10 px-2 py-0.5 rounded-full">📍 {contributiveMTs.length} actions essentielles</span>
                        <span className="text-white/70 text-[10px] bg-white/10 px-2 py-0.5 rounded-full">💡 {nonContributiveMTs.length} pistes d&apos;amélioration</span>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            {mpRecos.length > 0 ? (
                <div className="divide-y divide-gray-100">
                    {mpRecos.map(reco => (
                        <RecoCard key={reco.id} reco={reco} data={data} critBg={critColors.bg} />
                    ))}
                </div>
            ) : (
                <div className="px-5 py-4 text-xs text-gray-400 italic bg-white/80">
                    Aucune recommandation spécifique à ce stade
                </div>
            )}
        </div>
    )
}

// ── Recommendation Card ────────────────────────────────

function RecoCard({ reco, data, critBg }: {
    reco: { id: string; niveau: string; wording_utilisateur: string | null; category_id: string }
    data: ExternalViewProps['data']
    critBg: string
}) {
    const recoMTs = data.microTaches.filter(mt => mt.category_id === reco.category_id)
    const recoContrib = recoMTs.filter(mt => mt.is_contributive)
    const recoNonContrib = recoMTs.filter(mt => !mt.is_contributive)

    return (
        <div className="px-5 py-4 bg-white/80 hover:bg-white/95 transition-colors">
            <div className="flex items-start gap-2.5 mb-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: critBg }} />
                <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium leading-snug">{reco.wording_utilisateur}</p>
                </div>
            </div>
            <MTList mts={recoContrib} label="Actions essentielles" icon={<Shield className="w-3 h-3" />} borderColor="border-emerald-200" labelColor="text-emerald-600" />
            <MTList mts={recoNonContrib} label="Pour aller plus loin" icon={<Sparkles className="w-3 h-3" />} borderColor="border-gray-200" labelColor="text-gray-400" />
        </div>
    )
}

// ── MT List ────────────────────────────────────────────

function MTList({ mts, label, icon, borderColor, labelColor }: {
    mts: Array<{ id: string; type: string; libelle: string; acteur?: string[] | null }>
    label: string
    icon: React.ReactNode
    borderColor: string
    labelColor: string
}) {
    if (mts.length === 0) return null
    return (
        <div className={`ml-6 mt-2 space-y-1 border-l-2 ${borderColor} pl-3`}>
            <span className={`text-[9px] font-bold ${labelColor} uppercase flex items-center gap-1`}>{icon} {label}</span>
            {mts.map(mt => {
                const acteur = mt.acteur?.filter(a => !a.toLowerCase().includes('aidant') && !a.toLowerCase().includes('autonome')).join(', ') || null
                return (
                    <div key={mt.id} className="flex items-center gap-2 text-xs py-1">
                        <span className="text-gray-700">{mt.libelle}</span>
                        {acteur && <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{acteur}</span>}
                    </div>
                )
            })}
        </div>
    )
}

// ── Prevention Section ─────────────────────────────────

export function PreventionSection({ data, preventionRecosByMP, preventionMPIds, mpMap }: {
    data: ExternalViewProps['data']
    preventionRecosByMP: Record<string, typeof data.recommendations>
    preventionMPIds: string[]
    mpMap: ExternalViewProps['mpMap']
}) {
    return (
        <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4 text-purple-500" />
                <h3 className="text-sm font-bold text-gray-800">Prévention — Conseils pour votre bien-être</h3>
            </div>
            <p className="text-[11px] text-gray-500 mb-4">
                Ces recommandations vous aident à préserver votre équilibre, même sans signal d&apos;alerte.
            </p>
            <div className="space-y-4">
                {preventionMPIds.map(mpId => {
                    const mp = mpMap[mpId]
                    if (!mp) return null
                    const recos = preventionRecosByMP[mpId]
                    return (
                        <div key={mpId} className="rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(124,58,237,0.2)', boxShadow: '0 4px 24px rgba(124,58,237,0.08)' }}>
                            <div className="px-5 py-3" style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}>
                                <h4 className="text-white font-bold text-sm">{mp.nom}</h4>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recos.map(reco => (
                                    <div key={reco.id} className="px-5 py-3 bg-white/80">
                                        <div className="flex items-start gap-2">
                                            <Heart className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-purple-400" />
                                            <p className="text-sm text-gray-700 leading-snug">{reco.wording_utilisateur}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
