/* VulnerabilitiesPage — Orchestrator for V1-V5 drill-down.
   Delegates all detail rendering to VulnDetail component. */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Activity, AlertTriangle } from 'lucide-react'
import { useMonkaData, VULN_META } from '../clinical/hooks'
import { VulnDetail } from './vulnerabilities/VulnDetail'

export default function VulnerabilitiesPage() {
    const { data, loading, error } = useMonkaData()
    const [selectedVuln, setSelectedVuln] = useState<string>('V1')

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <Activity className="w-8 h-8 text-monka-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-monka-muted">Chargement des vulnérabilités…</p>
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

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-monka-primary" />
                    Vulnérabilités
                </h1>
                <p className="text-sm text-monka-muted">
                    Explorer les 5 dimensions cliniques — questions, micro-parcours et recommandations
                </p>
            </div>

            {/* V selector pills */}
            <div className="flex gap-2 mb-6">
                {Object.entries(VULN_META).map(([vid, meta]) => {
                    const isActive = selectedVuln === vid
                    const Icon = meta.icon
                    const questCount = data.questions.filter(q => q.vulnerability_id === vid).length
                    return (
                        <button
                            key={vid}
                            onClick={() => setSelectedVuln(vid)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all border-2
                                ${isActive ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white/80 border-transparent'}`}
                            style={{ borderColor: isActive ? meta.color : 'transparent' }}
                        >
                            <Icon className="w-4 h-4" style={{ color: meta.color }} />
                            <span className="text-sm font-bold" style={{ color: isActive ? meta.color : undefined }}>{meta.label}</span>
                            <span className="text-[10px] text-monka-muted">{questCount}q</span>
                        </button>
                    )
                })}
            </div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedVuln}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <VulnDetail vulnId={selectedVuln} data={data} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
