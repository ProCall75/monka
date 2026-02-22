/* SimulatorExternalView — Vue Utilisateur Premium
   V2-07: Glassmorphism, empathetic wording, mobile-first.
   Sub-components extracted to ExternalViewCards.tsx (§2).
   Architecture: < 120L main orchestrator. */

import { motion } from 'framer-motion'
import { Heart, Sparkles, Users } from 'lucide-react'
import {
    ActivatedMPCard, PreventionSection,
    type ExternalViewProps,
} from './ExternalViewCards'

export type { ExternalViewProps }
export { ActivatedMPCard }

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
                <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(88,191,148,0.15), rgba(134,192,207,0.15))' }}>
                        <Users className="w-8 h-8 text-monka-primary/40" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-600 mb-1">Votre parcours personnalisé</h3>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">Répondez aux questions pour découvrir les accompagnements adaptés à votre situation</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div key="external" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto p-5">
            {/* Premium header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-monka-primary" />
                    <h3 className="text-sm font-bold text-gray-800">Votre parcours personnalisé</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
                    Nous avons identifié <span className="font-bold text-monka-primary">{activatedMPs.length} axe{activatedMPs.length > 1 ? 's' : ''} d&apos;accompagnement</span> adaptés à votre situation. Chaque recommandation est pensée pour vous soutenir au quotidien.
                </p>
            </div>

            {/* Activated MPs — empathetic cards */}
            <div className="space-y-5">
                {activatedMPs.map((mpId, i) => (
                    <motion.div key={mpId}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}>
                        <ActivatedMPCard mpId={mpId} data={data} activatedCats={activatedCats} mpMap={mpMap} />
                    </motion.div>
                ))}
            </div>

            {/* Prevention section */}
            {hasPrevention && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <PreventionSection data={data} preventionRecosByMP={preventionRecosByMP} preventionMPIds={preventionMPIds} mpMap={mpMap} />
                </motion.div>
            )}

            {/* Footer encouragement */}
            <div className="mt-8 p-4 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(88,191,148,0.08), rgba(134,192,207,0.08))' }}>
                <Heart className="w-5 h-5 text-monka-primary/60 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Chaque petit pas compte. N&apos;hésitez pas à solliciter votre entourage et les professionnels autour de vous.</p>
            </div>
        </motion.div>
    )
}
