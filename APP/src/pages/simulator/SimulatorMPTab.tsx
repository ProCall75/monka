/* =============================================
   SimulatorMPTab — Micro-Parcours Unified Tab
   
   Merges the old activation, recommendations, and
   tasks tabs into a single MP tab with 3 sub-views:
   - Activation (MP list + drill-down)
   - Recommendations (by MP, active/prevention/inactive)
   - Tasks (MTs by MP, active/inactive)
   
   Extracted from SimulatorPage.
   ============================================= */

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, ListChecks, ChevronRight } from 'lucide-react'
import {
    evaluateRule, VULN_COLORS,
    getCategoriesForMP, getRulesForMP,
    buildMPMap, buildMPVulnMap,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'
import { MPDetailView } from './MPDetailView'
import { MPRecosView } from './MPRecosView'
import { MPTasksView } from './MPTasksView'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

type SubTab = 'activation' | 'recommendations' | 'tasks'

const subTabs: { id: SubTab; label: string; icon: typeof Zap }[] = [
    { id: 'activation', label: 'Activation', icon: Zap },
    { id: 'recommendations', label: 'Recos', icon: TrendingUp },
    { id: 'tasks', label: 'Tâches', icon: ListChecks },
]

interface MPTabProps extends SimulatorTabProps {
    selectedMP: string | null
    setSelectedMP: (mp: string | null) => void
}

/**
 * SimulatorMPTab — Unified MP tab with 3 sub-views.
 */
export function SimulatorMPTab({ data, activeV, answers, activatedMPs, activatedCats, scoreByV, displayScore, currentThreshold, selectedMP, setSelectedMP }: MPTabProps) {
    // Defensive guard — empty data fallback
    if (!data.microParcours?.length) {
        return <div className="text-center text-monka-muted py-12 text-sm">Aucun micro-parcours disponible.</div>
    }

    const [activeSubTab, setActiveSubTab] = useState<SubTab>('activation')
    const mpMap = useMemo(() => buildMPMap(data), [data])
    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])

    // Sub-tab bar
    const renderSubTabs = () => (
        <div className="flex gap-1 mb-4 bg-white/30 rounded-lg p-1 border border-monka-border/50">
            {subTabs.map(tab => (
                <button key={tab.id} onClick={() => { setActiveSubTab(tab.id); setSelectedMP(null) }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeSubTab === tab.id ? 'bg-white text-monka-heading shadow-sm' : 'text-monka-muted hover:text-monka-text'}`}>
                    <tab.icon className="w-3 h-3" />
                    {tab.label}
                </button>
            ))}
        </div>
    )

    // ========== ACTIVATION SUB-TAB ==========
    if (activeSubTab === 'activation') {
        if (selectedMP) {
            return (
                <div>
                    {renderSubTabs()}
                    <MPDetailView data={data} answers={answers} activatedMPs={activatedMPs}
                        activatedCats={activatedCats} selectedMP={selectedMP} setSelectedMP={setSelectedMP} mpMap={mpMap} />
                </div>
            )
        }
        return (
            <div>
                {renderSubTabs()}
                <h3 className="text-sm font-bold text-monka-heading mb-4">
                    Micro-Parcours — {data.microParcours.length} MP ({activatedMPs.length} actifs)
                </h3>
                <div className="space-y-2">
                    {data.microParcours
                        .filter(mp => activeV === 'ALL' || mp.vulnerability_id === activeV)
                        .map(mp => {
                            const isActive = activatedMPs.includes(mp.id)
                            const mpColor = vColorMap[mp.vulnerability_id as VulnerabilityId] || '#999'
                            const mpCats = getCategoriesForMP(data, mp.id)
                            const mpRuleCount = getRulesForMP(data, mp.id).length
                            const mpFiredCount = getRulesForMP(data, mp.id).filter(r => evaluateRule(r, answers)).length
                            return (
                                <motion.div key={mp.id} onClick={() => setSelectedMP(mp.id)}
                                    className={`p-3 rounded-xl border flex items-start gap-3 transition-all duration-300 cursor-pointer hover:shadow-md ${isActive ? 'border-monka-primary/30' : 'bg-white/30 border-transparent hover:border-monka-border'}`}
                                    style={isActive ? { backgroundColor: `${mpColor}10` } : {}}
                                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isActive ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
                                        style={isActive ? { backgroundColor: mpColor } : {}}>{mp.id}</div>
                                    <div className="flex-1 min-w-0">
                                        <span className={`text-sm font-medium ${isActive ? 'text-monka-heading' : 'text-monka-muted'}`}>{mp.nom}</span>
                                        {mp.objectif && (
                                            <p className={`text-[10px] mt-0.5 leading-relaxed ${isActive ? 'text-monka-text' : 'text-monka-muted'}`}>
                                                <span className="mr-0.5">🎯</span> {mp.objectif}
                                            </p>
                                        )}
                                        <div className="flex gap-2 mt-1.5">
                                            <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{mpCats.length} catégories</span>
                                            {mpRuleCount > 0 && (
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded ${mpFiredCount > 0 ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                    {mpFiredCount}/{mpRuleCount} règles
                                                </span>
                                            )}
                                            {isActive && mp.signature_a && <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">{mp.signature_a}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        {isActive ? (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: mpColor }}>ACTIF</span>
                                        ) : (
                                            <span className="text-[10px] text-monka-muted bg-gray-100 px-2 py-0.5 rounded-full">Inactif</span>
                                        )}
                                        <ChevronRight className="w-3.5 h-3.5 text-monka-muted" />
                                    </div>
                                </motion.div>
                            )
                        })}
                </div>
            </div>
        )
    }

    // ========== RECOMMENDATIONS SUB-TAB ==========
    if (activeSubTab === 'recommendations') {
        return (
            <div>
                {renderSubTabs()}
                <MPRecosView data={data} activeV={activeV} answers={answers} mpMap={mpMap} mpVulnMap={mpVulnMap}
                    activatedMPs={activatedMPs} activatedCats={activatedCats} />
            </div>
        )
    }

    // ========== TASKS SUB-TAB ==========
    return (
        <div>
            {renderSubTabs()}
            <MPTasksView data={data} activeV={activeV} mpMap={mpMap} mpVulnMap={mpVulnMap} activatedCats={activatedCats} />
        </div>
    )
}
