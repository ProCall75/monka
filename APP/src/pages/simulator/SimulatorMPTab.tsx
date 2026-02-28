/* SimulatorMPTab — Micro-Parcours tab (simplified).
   MP list with drill-down → MPDetailView pipeline.
   No sub-tabs: the pipeline view shows everything. */

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import {
    evaluateRule, VULN_COLORS,
    getCategoriesForMP, getRulesForMP,
    buildMPMap,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'
import { MPDetailView } from './MPDetailView'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface MPTabProps extends SimulatorTabProps {
    selectedMP: string | null
    setSelectedMP: (mp: string | null) => void
}

export function SimulatorMPTab({ data, activeV, answers, activatedMPs, activatedCats, selectedMP, setSelectedMP }: MPTabProps) {
    if (!data.microParcours?.length) {
        return <div className="text-center text-monka-muted py-12 text-sm">Aucun micro-parcours disponible.</div>
    }

    const mpMap = useMemo(() => buildMPMap(data), [data])

    // Drill-down view
    if (selectedMP) {
        return (
            <MPDetailView data={data} answers={answers} activatedMPs={activatedMPs}
                activatedCats={activatedCats} selectedMP={selectedMP} setSelectedMP={setSelectedMP} mpMap={mpMap} />
        )
    }

    // MP list — split active/inactive
    const filteredMPs = data.microParcours.filter(mp => activeV === 'ALL' || mp.vulnerability_id === activeV)
    const activeMPs = filteredMPs.filter(mp => activatedMPs.includes(mp.id))
    const inactiveMPs = filteredMPs.filter(mp => !activatedMPs.includes(mp.id))

    return (
        <div>
            <h3 className="text-sm font-bold text-monka-heading mb-4">
                Micro-Parcours — {filteredMPs.length} MP ({activeMPs.length} actifs)
            </h3>

            {/* Active MPs first */}
            {activeMPs.length > 0 && (
                <div className="mb-4">
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-2">✓ Activés ({activeMPs.length})</p>
                    <div className="space-y-2">
                        {activeMPs.map(mp => <MPCard key={mp.id} mp={mp} data={data} answers={answers} isActive color={vColorMap[mp.vulnerability_id as VulnerabilityId] || '#999'} onClick={() => setSelectedMP(mp.id)} />)}
                    </div>
                </div>
            )}

            {/* Inactive MPs */}
            {inactiveMPs.length > 0 && (
                <div>
                    <p className="text-[10px] font-bold text-monka-muted uppercase tracking-wider mb-2">Inactifs ({inactiveMPs.length})</p>
                    <div className="space-y-2">
                        {inactiveMPs.map(mp => <MPCard key={mp.id} mp={mp} data={data} answers={answers} isActive={false} color="#999" onClick={() => setSelectedMP(mp.id)} />)}
                    </div>
                </div>
            )}
        </div>
    )
}

// ── MP card in list ──────────────────────────
interface MPCardProps {
    mp: { id: string; nom: string; objectif?: string | null; vulnerability_id: string; signature_a?: string | null }
    data: SimulatorTabProps['data']
    answers: Record<string, string | string[]>
    isActive: boolean
    color: string
    onClick: () => void
}

function MPCard({ mp, data, answers, isActive, color, onClick }: MPCardProps) {
    const mpCats = getCategoriesForMP(data, mp.id)
    const mpRuleCount = getRulesForMP(data, mp.id).length
    const mpFiredCount = getRulesForMP(data, mp.id).filter(r => evaluateRule(r, answers)).length

    return (
        <motion.div onClick={onClick}
            className={`p-3 rounded-xl border flex items-start gap-3 transition-all duration-300 cursor-pointer hover:shadow-md ${isActive ? 'border-monka-primary/30' : 'bg-white/30 border-transparent hover:border-monka-border'}`}
            style={isActive ? { backgroundColor: `${color}10` } : {}}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isActive ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
                style={isActive ? { backgroundColor: color } : {}}>{mp.id}</div>
            <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium ${isActive ? 'text-monka-heading' : 'text-monka-muted'}`}>{mp.nom}</span>
                {mp.objectif && (
                    <p className={`text-[10px] mt-0.5 leading-relaxed ${isActive ? 'text-monka-text' : 'text-monka-muted'}`}>
                        🎯 {mp.objectif}
                    </p>
                )}
                <div className="flex gap-2 mt-1.5">
                    <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{mpCats.length} catégories</span>
                    {mpRuleCount > 0 && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${mpFiredCount > 0 ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {mpFiredCount}/{mpRuleCount} règles
                        </span>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                {isActive
                    ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>ACTIF</span>
                    : <span className="text-[10px] text-monka-muted bg-gray-100 px-2 py-0.5 rounded-full">Inactif</span>}
                <ChevronRight className="w-3.5 h-3.5 text-monka-muted" />
            </div>
        </motion.div>
    )
}
