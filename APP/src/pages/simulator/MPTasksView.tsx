/* =========================================
   MPTasksView — Micro-Tâches sub-view
   
   Shows MTs grouped by MP with active/inactive
   sections, ASR/amélioration breakdown.
   Extracted from SimulatorMPTab.
   ========================================= */

import { ChevronDown } from 'lucide-react'
import { VULN_COLORS, type VulnerabilityId } from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface MPTasksProps {
    data: SimulatorTabProps['data']
    activeV: SimulatorTabProps['activeV']
    mpMap: Record<string, { nom: string; vulnerability_id?: string }>
    mpVulnMap: Record<string, string>
    activatedCats: Map<string, { mpId: string; niveau: string }>
}

/**
 * MPTasksView — Micro-Tâches sub-view for the MP tab.
 * Groups MTs by MP with active/inactive sections.
 */
export function MPTasksView({ data, activeV, mpMap, mpVulnMap, activatedCats }: MPTasksProps) {
    const filteredMTs = data.microTaches.filter(mt => activeV === 'ALL' || mpVulnMap[mt.mp_id] === activeV)
    const activatedCatIds = new Set(activatedCats.keys())
    const activeMTs = filteredMTs.filter(mt => activatedCatIds.has(mt.category_id))
    const inactiveMTs = filteredMTs.filter(mt => !activatedCatIds.has(mt.category_id))

    const cleanActeurs = (a: string[] | null) => {
        if (!a || a.length === 0) return null
        const filtered = a.filter(x => !x.toLowerCase().includes('aidant') && !x.toLowerCase().includes('autonome'))
        return filtered.length > 0 ? filtered.join(', ') : null
    }

    const groupByMP = (mts: typeof filteredMTs) => {
        const map: Record<string, typeof filteredMTs> = {}
        mts.forEach(mt => { if (!map[mt.mp_id]) map[mt.mp_id] = []; map[mt.mp_id].push(mt) })
        return map
    }

    const renderMTItem = (mt: typeof filteredMTs[0]) => {
        const mtVuln = mpVulnMap[mt.mp_id] || ''; const mtColor = vColorMap[mtVuln as VulnerabilityId] || '#999'
        const domainLabel = mt.domaine === 'medical' ? 'Médical' : mt.domaine === 'medico_social' ? 'Médico-social' : mt.domaine || '—'
        const domainColor = mt.domaine === 'medical' ? 'bg-rose-100 text-rose-700' : 'bg-teal-100 text-teal-700'
        const acteurs = cleanActeurs(mt.acteur)
        return (
            <div key={mt.id} className="px-4 py-2.5 hover:bg-white/50 transition-all text-xs">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: mtColor }}>{mtVuln}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${domainColor}`}>{domainLabel}</span>
                    {mt.is_contributive && <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded font-bold">ASR</span>}
                    {acteurs && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{acteurs}</span>}
                </div>
                <p className={`text-sm ${mt.is_contributive ? 'text-monka-text' : 'text-monka-muted'}`}>{mt.libelle}</p>
            </div>
        )
    }

    const activeMTsByMP = groupByMP(activeMTs)
    const inactiveMTsByMP = groupByMP(inactiveMTs)

    const renderMPBlock = (mpId: string, mts: typeof filteredMTs, isActiveBlock: boolean) => {
        const mp = mpMap[mpId]; const mpColor = vColorMap[(mp?.vulnerability_id || mpVulnMap[mpId]) as VulnerabilityId] || '#999'
        return (
            <div key={mpId} className={`rounded-xl border overflow-hidden ${isActiveBlock ? 'border-green-200' : 'border-monka-border opacity-60'}`}>
                <div className={`px-4 py-2 flex items-center gap-2 ${isActiveBlock ? 'bg-green-50' : 'bg-gray-50/50'}`}>
                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: mpColor }}>{mpVulnMap[mpId]}</span>
                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded bg-gray-600">{mpId}</span>
                    <span className="text-xs font-medium text-monka-heading flex-1 truncate">{mp?.nom || mpId}</span>
                    <span className={`text-[10px] font-bold ${isActiveBlock ? 'text-green-600' : 'text-monka-muted'}`}>{mts.length} MT</span>
                </div>
                <div className="divide-y divide-monka-border">{mts.map(mt => renderMTItem(mt))}</div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <h3 className="text-sm font-bold text-monka-heading">Tâches activées ({activeMTs.length})</h3>
                <span className="text-[10px] text-monka-muted">/ {filteredMTs.length} total</span>
                {activeMTs.length > 0 && (
                    <div className="flex gap-1 ml-auto">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold">📍 {activeMTs.filter(m => m.is_contributive).length} ASR</span>
                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 text-[9px] font-bold">💡 {activeMTs.filter(m => !m.is_contributive).length}</span>
                    </div>
                )}
            </div>
            {Object.keys(activeMTsByMP).length === 0 ? (
                <div className="rounded-xl border border-dashed border-monka-border p-6 text-center mb-4">
                    <p className="text-sm text-monka-muted">Aucune tâche activée — répondez aux questions</p>
                </div>
            ) : (
                <div className="space-y-3 mb-4">{Object.entries(activeMTsByMP).map(([mpId, mts]) => renderMPBlock(mpId, mts, true))}</div>
            )}
            {inactiveMTs.length > 0 && (
                <details className="group">
                    <summary className="flex items-center gap-2 cursor-pointer select-none mb-3 text-monka-muted hover:text-monka-text transition-colors">
                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                        <span className="text-xs font-bold">En attente ({inactiveMTs.length}) — {Object.keys(inactiveMTsByMP).length} MP non activés</span>
                    </summary>
                    <div className="space-y-3">{Object.entries(inactiveMTsByMP).map(([mpId, mts]) => renderMPBlock(mpId, mts, false))}</div>
                </details>
            )}
        </div>
    )
}
