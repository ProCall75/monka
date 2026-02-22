/* =============================================
   IntegrityReportCard — Data Integrity Dashboard
   
   Displays results of 6 integrity checks with
   status badges, detail, and overall verdict.
   ============================================= */

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Database, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import type { MonkaData } from '../../engine/dbTypes'
import { runIntegrityChecks } from '../../engine/integrityChecks'
import type { IntegrityCheck } from '../../engine/integrityChecks'

// === Status styling ===

const STATUS_CONFIG = {
    pass: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'OK' },
    warn: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Alerte' },
    fail: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Échec' },
} as const

// === Main Component ===

export function IntegrityReportCard({ data }: { data: MonkaData }) {
    const report = useMemo(() => runIntegrityChecks(data), [data])
    const overall = STATUS_CONFIG[report.overallStatus]
    const OverallIcon = overall.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-2xl p-5 border border-white/10"
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Database size={18} className="text-teal-400" />
                <h3 className="text-sm font-bold text-monka-heading">Intégrité Données</h3>
                <span className={`ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${overall.bg} ${overall.color}`}>
                    <OverallIcon size={12} />
                    {report.passed}/{report.totalChecks} checks
                </span>
            </div>

            {/* Check rows */}
            <div className="space-y-2">
                {report.checks.map(c => (
                    <CheckRow key={c.id} check={c} />
                ))}
            </div>
        </motion.div>
    )
}

// === Check Row ===

function CheckRow({ check: c }: { check: IntegrityCheck }) {
    const cfg = STATUS_CONFIG[c.status]
    const Icon = cfg.icon

    return (
        <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${cfg.bg}/40`}>
            <Icon size={14} className={cfg.color} />
            <span className="text-[11px] font-medium text-monka-heading flex-1">{c.label}</span>
            <span className="text-[10px] text-monka-muted">{c.detail}</span>
            {c.issues > 0 && (
                <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                    {c.issues} issue{c.issues > 1 ? 's' : ''}
                </span>
            )}
        </div>
    )
}
