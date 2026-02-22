/* MicroParcoursPage — Page listing 24 MPs filterable by vulnerability.
   Delegates drill-down rendering to MPDrilldown component.
   Architecture: page < 200L, uses hooks only. */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderTree, Activity, AlertTriangle, ChevronRight, Layers } from 'lucide-react'
import {
    useMonkaData, VULN_META, getMPsForVuln,
    getCategoriesForMP, getRulesForMP, getRecosForMP,
    getMTsForMP, getContentBlocksForEntity,
    type VulnerabilityId, type MonkaData,
} from '../clinical/hooks'
import { MPDrilldown } from './micro-parcours/MPDrilldown'

type VFilter = 'ALL' | VulnerabilityId

export default function MicroParcoursPage() {
    const { data, loading, error } = useMonkaData()
    const [vFilter, setVFilter] = useState<VFilter>('ALL')
    const [selectedMP, setSelectedMP] = useState<string | null>(null)

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <Activity className="w-8 h-8 text-monka-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-monka-muted">Chargement des micro-parcours…</p>
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                    <p className="text-sm text-red-500">{error || 'Erreur de chargement'}</p>
                </div>
            </div>
        )
    }

    return selectedMP
        ? <MPDrilldown data={data} mpId={selectedMP} onBack={() => setSelectedMP(null)} />
        : <MPListView data={data} vFilter={vFilter} setVFilter={setVFilter} onSelectMP={setSelectedMP} />
}

// ── MP List View ───────────────────────────────────────

interface MPListProps {
    data: MonkaData
    vFilter: VFilter
    setVFilter: (v: VFilter) => void
    onSelectMP: (mpId: string) => void
}

function MPListView({ data, vFilter, setVFilter, onSelectMP }: MPListProps) {
    const filteredMPs = useMemo(() => {
        if (vFilter === 'ALL') return data.microParcours
        return getMPsForVuln(data, vFilter)
    }, [data, vFilter])

    const mpStats = useMemo(() => {
        const map = new Map<string, { cats: number; rules: number; recos: number; mts: number }>()
        for (const mp of filteredMPs) {
            map.set(mp.id, {
                cats: getCategoriesForMP(data, mp.id).length,
                rules: getRulesForMP(data, mp.id).length,
                recos: getRecosForMP(data, mp.id).length,
                mts: getMTsForMP(data, mp.id).length,
            })
        }
        return map
    }, [data, filteredMPs])

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <FolderTree className="w-6 h-6 text-monka-primary" />
                    Micro-Parcours
                </h1>
                <p className="text-sm text-monka-muted">
                    {filteredMPs.length} parcours cliniques — drill-down par catégorie, règle et micro-tâche
                </p>
            </div>

            {/* V filter pills */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setVFilter('ALL')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all border-2
                        ${vFilter === 'ALL' ? 'bg-white shadow-md border-monka-primary text-monka-primary' : 'bg-white/50 hover:bg-white/80 border-transparent text-monka-muted'}`}
                >
                    Tous ({data.microParcours.length})
                </button>
                {Object.entries(VULN_META).map(([vid, meta]) => {
                    const count = getMPsForVuln(data, vid as VulnerabilityId).length
                    const isActive = vFilter === vid
                    const Icon = meta.icon
                    return (
                        <button key={vid} onClick={() => setVFilter(vid as VFilter)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all border-2
                                ${isActive ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white/80 border-transparent'}`}
                            style={{ borderColor: isActive ? meta.color : 'transparent' }}
                        >
                            <Icon className="w-3.5 h-3.5" style={{ color: meta.color }} />
                            <span style={{ color: isActive ? meta.color : undefined }}>{meta.label}</span>
                            <span className="text-[10px] text-monka-muted">{count}</span>
                        </button>
                    )
                })}
            </div>

            {/* MP cards grid */}
            <div className="grid grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                    {filteredMPs.map(mp => {
                        const stats = mpStats.get(mp.id)
                        const meta = VULN_META[mp.vulnerability_id as VulnerabilityId]
                        const cb = getContentBlocksForEntity(data, 'mp', mp.id)
                        const objectifCB = cb.find(b => b.block_type === 'objectif')

                        return (
                            <motion.button key={mp.id}
                                layout initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => onSelectMP(mp.id)}
                                className="glass-card p-4 text-left hover:shadow-lg transition-shadow group cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${meta?.color || '#999'}25, ${meta?.color || '#999'}10)` }}>
                                        <Layers className="w-5 h-5" style={{ color: meta?.color || '#999' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
                                                style={{ backgroundColor: meta?.color || '#999' }}>{mp.vulnerability_id}</span>
                                            <span className="text-[10px] font-mono text-monka-muted">{mp.id}</span>
                                        </div>
                                        <h3 className="text-sm font-bold text-monka-heading mb-1 truncate">{mp.nom}</h3>
                                        {objectifCB && (
                                            <p className="text-[11px] text-monka-muted line-clamp-2 mb-2">{objectifCB.content}</p>
                                        )}
                                        {!objectifCB && mp.objectif && (
                                            <p className="text-[11px] text-monka-muted line-clamp-2 mb-2">{mp.objectif}</p>
                                        )}
                                        <div className="flex gap-3 text-[10px] text-monka-muted">
                                            <span>{stats?.cats || 0} cat.</span>
                                            <span>{stats?.rules || 0} règles</span>
                                            <span>{stats?.recos || 0} recos</span>
                                            <span>{stats?.mts || 0} MTs</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-monka-muted group-hover:text-monka-primary transition-colors mt-3" />
                                </div>
                            </motion.button>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    )
}
