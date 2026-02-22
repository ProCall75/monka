/* VulnDetailTabs — Micro-Parcours tab for vulnerability detail view.
   Displays MP cards with navigation to MicroParcoursPage drill-down. */

import { Layers, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { MonkaData } from '../../clinical/hooks'

type MP = MonkaData['microParcours'][0]
type Rule = MonkaData['activationRules'][0]
type Reco = MonkaData['recommendations'][0]
type MT = MonkaData['microTaches'][0]

/* ---- MPs Tab ---- */

export function VulnMPsTab({ mps, rules, recos, mts, color }: {
    mps: MP[]; rules: Rule[]; recos: Reco[]; mts: MT[]; color: string
}) {
    const navigate = useNavigate()
    const handleNavigateMP = (mpId: string) => {
        navigate(`/micro-parcours?mp=${mpId}`)
    }

    return (
        <div className="space-y-3">
            {mps.map(mp => {
                const mpRecos = recos.filter(r => r.mp_id === mp.id)
                const mpMTs = mts.filter(mt => mt.mp_id === mp.id)
                const mpRules = rules.filter(r => r.mp_id === mp.id)
                const niveaux = [...new Set(mpRules.map(r => r.niveau))]

                return (
                    <div key={mp.id} className="glass-card p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                                <Layers className="w-4 h-4" style={{ color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: color }}>{mp.id}</span>
                                    <h4 className="text-sm font-bold text-monka-heading">{mp.nom}</h4>
                                </div>
                                {mp.objectif && <p className="text-xs text-monka-muted italic">{mp.objectif}</p>}
                            </div>
                            <div className="flex gap-3 text-center">
                                {[
                                    { label: 'Règles', value: mpRules.length },
                                    { label: 'Recos', value: mpRecos.length },
                                    { label: 'MT', value: mpMTs.length },
                                ].map(s => (
                                    <div key={s.label}>
                                        <div className="text-sm font-bold" style={{ color }}>{s.value}</div>
                                        <div className="text-[9px] text-monka-muted">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Niveaux d'activation */}
                        {niveaux.length > 0 && (
                            <div className="flex gap-1.5 mb-3">
                                {niveaux.map(n => (
                                    <span key={n} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${n === 'critique' ? 'bg-red-50 text-red-600' :
                                        n === 'ccc' ? 'bg-amber-50 text-amber-600' :
                                            'bg-emerald-50 text-emerald-600'
                                        }`}>{n}</span>
                                ))}
                            </div>
                        )}

                        {/* Navigation button */}
                        <button
                            onClick={() => handleNavigateMP(mp.id)}
                            className="flex items-center gap-1.5 text-[10px] font-medium text-monka-primary hover:text-monka-primary/80 transition-colors px-2.5 py-1.5 rounded-lg bg-monka-primary/5 hover:bg-monka-primary/10"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Ouvrir dans Micro-Parcours
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
