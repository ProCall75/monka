/* DashboardPage — Vue d'ensemble Monka.
   Stats globales DB, nav rapide vers pages clés, engine health.
   Architecture: <200L page, data via hooks barrel. */

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard, FileQuestion, Route, Zap, Star, ListChecks,
    Database, Loader2, RefreshCw, AlertCircle, ArrowRight, Users,
} from 'lucide-react'
import {
    useMonkaData, invalidateCache, VULN_META, VULN_IDS,
    type MonkaData,
} from '../clinical/hooks'

import { IntegrityReportCard } from '../components/clinical/IntegrityReportCard'

export default function DashboardPage() {
    const { data, loading, error } = useMonkaData()

    if (loading) return (
        <div className="h-[calc(100vh-48px)] flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-10 h-10 text-monka-primary animate-spin mx-auto mb-4" />
                <h2 className="text-lg font-bold text-monka-heading mb-1">Chargement du Dashboard</h2>
                <p className="text-sm text-monka-muted">Extraction Supabase en cours…</p>
            </div>
        </div>
    )

    if (error || !data) return (
        <div className="h-[calc(100vh-48px)] flex items-center justify-center">
            <div className="text-center glass-card p-8 max-w-md">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h2 className="text-lg font-bold text-monka-heading mb-2">Erreur de chargement</h2>
                <p className="text-sm text-monka-muted mb-4">{error || 'Données non disponibles'}</p>
                <button onClick={() => { invalidateCache(); window.location.reload() }}
                    className="px-4 py-2 bg-monka-primary text-white rounded-lg text-sm font-medium hover:bg-monka-primary/90 transition-colors">
                    <RefreshCw className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Réessayer
                </button>
            </div>
        </div>
    )

    return <DashboardContent data={data} />
}

function DashboardContent({ data }: { data: MonkaData }) {
    const nav = useNavigate()

    const stats = useMemo(() => {
        const totalQ = data.questions.length
        const triggers = data.questions.filter(q => q.is_trigger).length
        return {
            totalQ, triggers, nonTriggers: totalQ - triggers,
            totalMP: data.microParcours.length,
            totalRules: data.activationRules.length,
            totalRecos: data.recommendations.length,
            totalMT: data.microTaches.length,
            rulesCrit: data.activationRules.filter(r => r.niveau === 'critique').length,
            rulesCCC: data.activationRules.filter(r => r.niveau === 'ccc').length,
        }
    }, [data])

    // Per-V summary for compact cards
    const perV = useMemo(() => VULN_IDS.map(v => {
        const meta = VULN_META[v]
        const mps = data.microParcours.filter(mp => mp.vulnerability_id === v)
        const mpIds = new Set(mps.map(mp => mp.id))
        const rules = data.activationRules.filter(r => mpIds.has(r.mp_id))
        const recos = data.recommendations.filter(r => mpIds.has(r.mp_id))
        const mts = data.microTaches.filter(mt => mpIds.has(mt.mp_id))
        return { v, meta, mps: mps.length, rules: rules.length, recos: recos.length, mts: mts.length }
    }), [data])

    const anim = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } }

    return (
        <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-monka-heading flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-monka-primary" /> Dashboard
                    </h1>
                    <p className="text-sm text-monka-muted mt-0.5">Vue d&apos;ensemble — données Supabase temps réel</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-green-600 flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200/50">
                        <Database className="w-3 h-3" /> Supabase Live
                    </span>
                    <button onClick={() => { invalidateCache(); window.location.reload() }}
                        className="text-[10px] text-monka-muted flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-monka-border hover:bg-white transition-colors">
                        <RefreshCw className="w-3 h-3" /> Rafraîchir
                    </button>
                </div>
            </div>

            {/* Global Stats — 4 cards */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                <StatCard icon={FileQuestion} label="Questions" value={stats.totalQ} color="monka-primary/15" iconColor="text-monka-primary"
                    sub={<><Badge bg="bg-blue-50 text-blue-600">{stats.nonTriggers} éval</Badge><Badge bg="bg-amber-50 text-amber-600">{stats.triggers} triggers</Badge></>} anim={anim} delay={0} />
                <StatCard icon={Route} label="Micro-Parcours" value={stats.totalMP} color="violet-100" iconColor="text-violet-600" anim={anim} delay={0.05} />
                <StatCard icon={Zap} label="Règles" value={stats.totalRules} color="orange-100" iconColor="text-orange-600"
                    sub={<><Badge bg="bg-red-50 text-red-600">{stats.rulesCrit} crit</Badge><Badge bg="bg-orange-50 text-orange-600">{stats.rulesCCC} ccc</Badge></>} anim={anim} delay={0.1} />
                <StatCard icon={Star} label="Recommandations" value={stats.totalRecos} color="emerald-100" iconColor="text-emerald-600" anim={anim} delay={0.15} />
            </div>

            {/* Row 2 — MT count + per-V summary */}
            <div className="grid grid-cols-5 gap-3 mb-6">
                {perV.map((vs, i) => (
                    <motion.div key={vs.v} {...anim} transition={{ ...anim.transition, delay: 0.2 + i * 0.05 }}
                        className="glass-card p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: vs.meta.color }}>{vs.v}</span>
                            <span className="text-[10px] text-monka-muted truncate flex-1">{vs.meta.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[10px]">
                            <span className="text-monka-text"><span className="font-bold">{vs.mps}</span> MP</span>
                            <span className="text-monka-text"><span className="font-bold">{vs.rules}</span> Règles</span>
                            <span className="text-monka-text"><span className="font-bold">{vs.recos}</span> Recos</span>
                            <span className="text-monka-text"><span className="font-bold">{vs.mts}</span> MT</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Nav buttons — quick access */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <NavButton icon={Zap} label="Vulnérabilités" desc="Explorer les 5 dimensions V1-V5" color={VULN_META.V1.color}
                    onClick={() => nav('/vulnerabilities')} anim={anim} delay={0.3} />
                <NavButton icon={ListChecks} label="Micro-Parcours" desc={`${stats.totalMP} MP • ${stats.totalMT} micro-tâches`} color={VULN_META.V3.color}
                    onClick={() => nav('/micro-parcours')} anim={anim} delay={0.35} />
                <NavButton icon={Users} label="Tester un Persona" desc="Simuler un profil dans le moteur clinique" color={VULN_META.V5.color}
                    onClick={() => nav('/personas')} anim={anim} delay={0.4} />
            </div>

            {/* Integrity Report */}
            <div className="mb-6">
                <IntegrityReportCard data={data} />
            </div>

            {/* Footer */}
            <div className="text-center py-4">
                <p className="text-[10px] text-monka-muted">
                    Données temps réel • {stats.totalQ} questions • {stats.totalMP} MP • {stats.totalRules} règles • {stats.totalMT} MT
                </p>
            </div>
        </div>
    )
}

// ── Sub-components ─────────────────────────────────────

interface StatCardProps {
    icon: React.ElementType; label: string; value: number; color: string; iconColor: string
    sub?: React.ReactNode; anim: object; delay: number
}
function StatCard({ icon: Icon, label, value, color, iconColor, sub, anim, delay }: StatCardProps) {
    return (
        <motion.div {...anim} transition={{ duration: 0.3, delay }} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-${color} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-3xl font-bold text-monka-heading">{value}</p>
            {sub && <div className="flex gap-2 mt-2 text-[10px]">{sub}</div>}
        </motion.div>
    )
}

function Badge({ bg, children }: { bg: string; children: React.ReactNode }) {
    return <span className={`px-1.5 py-0.5 rounded font-medium ${bg}`}>{children}</span>
}

interface NavButtonProps {
    icon: React.ElementType; label: string; desc: string; color: string
    onClick: () => void; anim: object; delay: number
}
function NavButton({ icon: Icon, label, desc, color, onClick, anim, delay }: NavButtonProps) {
    return (
        <motion.button {...anim} transition={{ duration: 0.3, delay }} onClick={onClick}
            className="glass-card p-5 text-left hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${color}30, ${color}15)` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-monka-heading group-hover:text-monka-primary transition-colors">{label}</h3>
                    <p className="text-[10px] text-monka-muted">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-monka-muted/30 group-hover:text-monka-primary transition-colors" />
            </div>
        </motion.button>
    )
}
