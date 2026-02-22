
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    FileQuestion,
    Route,
    Zap,
    Star,
    ListChecks,
    BarChart3,
    Activity,
    Database,
    Shield,
    AlertTriangle,
    CheckCircle2,
    Loader2,
    RefreshCw,
    AlertCircle,
} from 'lucide-react'
import {
    useMonkaData, invalidateCache,
    VULN_META, VULN_IDS,
    type MonkaData,
} from '../clinical/hooks'
import { EngineHealthCard } from '../components/clinical/EngineHealthCard'
import { IntegrityReportCard } from '../components/clinical/IntegrityReportCard'



// === Component ===

export default function DashboardPage() {
    const { data, loading, error } = useMonkaData()

    if (loading) {
        return (
            <div className="h-[calc(100vh-48px)] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-monka-primary animate-spin mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-monka-heading mb-1">Chargement du Dashboard</h2>
                    <p className="text-sm text-monka-muted">Extraction Supabase en cours…</p>
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="h-[calc(100vh-48px)] flex items-center justify-center">
                <div className="text-center glass-card p-8 max-w-md">
                    <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-monka-heading mb-2">Erreur de chargement</h2>
                    <p className="text-sm text-monka-muted mb-4">{error || 'Données non disponibles'}</p>
                    <button
                        onClick={() => { invalidateCache(); window.location.reload() }}
                        className="px-4 py-2 bg-monka-primary text-white rounded-lg text-sm font-medium hover:bg-monka-primary/90 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                        Réessayer
                    </button>
                </div>
            </div>
        )
    }

    return <DashboardContent data={data} />
}

// === Inner content ===

function DashboardContent({ data }: { data: MonkaData }) {
    // === Derived Stats ===

    const globalStats = useMemo(() => {
        const totalQ = data.questions.length
        const triggers = data.questions.filter(q => q.is_trigger).length
        const nonTriggers = totalQ - triggers
        const etat = data.questions.filter(q => q.classification === 'etat').length
        const facteur = data.questions.filter(q => q.classification === 'facteur').length
        const scoringQIds = new Set(data.scoringQuestions.map(sq => sq.question_id))
        const scoringQ = scoringQIds.size
        const maxScore = VULN_IDS.reduce((acc, v) => {
            const sq = data.scoringQuestions.find(s => s.vulnerability_id === v)
            return acc + (sq?.max_score_vulnerability || 0)
        }, 0)
        const orphanMT = data.microTaches.filter(mt => !mt.category_id).length

        return {
            totalQ, triggers, nonTriggers, etat, facteur,
            totalMP: data.microParcours.length,
            totalRules: data.activationRules.length,
            totalRecos: data.recommendations.length,
            totalMT: data.microTaches.length,
            scoringQ, maxScore,
            totalSuivi: data.suiviQuestions.length,
            totalMappings: data.questionMPMapping.length,
            orphanMT,
        }
    }, [data])

    const perVStats = useMemo(() => {
        return VULN_IDS.map(v => {
            const questions = data.questions.filter(q => q.vulnerability_id === v)
            const etat = questions.filter(q => q.classification === 'etat').length
            const facteur = questions.filter(q => q.classification === 'facteur').length
            const mps = data.microParcours.filter(mp => mp.vulnerability_id === v)
            const mpIds = new Set(mps.map(mp => mp.id))
            const rules = data.activationRules.filter(r => mpIds.has(r.mp_id))
            const scoringQIds = new Set(data.scoringQuestions.filter(sq => sq.vulnerability_id === v).map(sq => sq.question_id))
            const maxScore = data.scoringQuestions.find(sq => sq.vulnerability_id === v)?.max_score_vulnerability || 0
            const thresholds = data.scoringThresholds.filter(t => t.vulnerability_id === v)
            const recos = data.recommendations.filter(r => mpIds.has(r.mp_id))
            const mts = data.microTaches.filter(mt => mpIds.has(mt.mp_id))
            const suivi = data.suiviQuestions.filter(sq => sq.vulnerability_id === v)

            return {
                v,
                meta: VULN_META[v],
                dbName: data.vulnerabilities.find(vul => vul.id === v)?.name || VULN_META[v].name,
                blocLabel: data.vulnerabilities.find(vul => vul.id === v)?.bloc_label || '',
                questions: questions.length,
                etat, facteur,
                scoringQ: scoringQIds.size,
                maxScore,
                thresholds,
                mps: mps.length,
                mpIds: mps.map(mp => mp.id),
                rules: rules.length,
                rulesCrit: rules.filter(r => r.niveau === 'critique').length,
                rulesCCC: rules.filter(r => r.niveau === 'ccc').length,
                rulesStd: rules.filter(r => r.niveau === 'standard').length,
                recos: recos.length,
                mts: mts.length,
                mtStruc: mts.filter(mt => mt.type === 'STRUC').length,
                mtSec: mts.filter(mt => mt.type === 'SEC').length,
                mtMed: mts.filter(mt => mt.type === 'MED').length,
                mtInfo: mts.filter(mt => mt.type === 'INFO').length,
                mtOrga: mts.filter(mt => mt.type === 'ORGA').length,
                suivi: suivi.length,
            }
        })
    }, [data])

    const cardAnim = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    }

    return (
        <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-monka-heading flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-monka-primary" />
                        Dashboard
                    </h1>
                    <p className="text-sm text-monka-muted mt-0.5">
                        Vue d'ensemble de la base Supabase — source de vérité
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-monka-muted flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-200/50">
                        <Database className="w-3 h-3" />
                        Supabase Live
                    </span>
                    <button
                        onClick={() => { invalidateCache(); window.location.reload() }}
                        className="text-[10px] text-monka-muted flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-monka-border hover:bg-white transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Rafraîchir
                    </button>
                </div>
            </div>

            {/* === GLOBAL STATS CARDS === */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-monka-primary/15 flex items-center justify-center">
                            <FileQuestion className="w-4 h-4 text-monka-primary" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Questions</span>
                    </div>
                    <p className="text-3xl font-bold text-monka-heading">{globalStats.totalQ}</p>
                    <div className="flex gap-2 mt-2 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">{globalStats.nonTriggers} éval</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-medium">{globalStats.triggers} triggers</span>
                    </div>
                </motion.div>

                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.05 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Route className="w-4 h-4 text-violet-600" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Micro-Parcours</span>
                    </div>
                    <p className="text-3xl font-bold text-monka-heading">{globalStats.totalMP}</p>
                    <p className="text-[10px] text-monka-muted mt-2">4+6+4+6+4 répartis sur 5V</p>
                </motion.div>

                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.1 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Règles d'Activation</span>
                    </div>
                    <p className="text-3xl font-bold text-monka-heading">{globalStats.totalRules}</p>
                    <div className="flex gap-2 mt-2 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-medium">
                            {data.activationRules.filter(r => r.niveau === 'critique').length} crit
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 font-medium">
                            {data.activationRules.filter(r => r.niveau === 'ccc').length} ccc
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
                            {data.activationRules.filter(r => r.niveau === 'standard').length} std
                        </span>
                    </div>
                </motion.div>

                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.15 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Star className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Recommandations</span>
                    </div>
                    <p className="text-3xl font-bold text-monka-heading">{globalStats.totalRecos}</p>
                    <p className="text-[10px] text-monka-muted mt-2">{globalStats.totalMP}/{globalStats.totalMP} MP couverts</p>
                </motion.div>
            </div>

            {/* Row 2 — MT, Scoring, Suivi, Mappings */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.2 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                            <ListChecks className="w-4 h-4 text-rose-600" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Micro-Tâches</span>
                    </div>
                    <p className="text-3xl font-bold text-monka-heading">{globalStats.totalMT}</p>
                    <div className="flex gap-1 mt-2 text-[10px]">
                        {['STRUC', 'SEC', 'MED', 'INFO', 'ORGA'].map(t => {
                            const count = data.microTaches.filter(mt => mt.type === t).length
                            const colors: Record<string, string> = { STRUC: 'bg-blue-50 text-blue-600', SEC: 'bg-orange-50 text-orange-600', MED: 'bg-red-50 text-red-600', INFO: 'bg-green-50 text-green-600', ORGA: 'bg-purple-50 text-purple-600' }
                            return <span key={t} className={`px - 1 py - 0.5 rounded font - medium ${colors[t]} `}>{count}</span>
                        })}
                    </div>
                </motion.div>

                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.25 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Scoring</span>
                    </div>
                    <p className="text-3xl font-bold text-monka-heading">{globalStats.scoringQ}</p>
                    <p className="text-[10px] text-monka-muted mt-2">Score max: {globalStats.maxScore} pts • 4 seuils/V</p>
                </motion.div>

                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.3 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Suivi</span>
                    </div>
                    <p className="text-3xl font-bold text-monka-heading">{globalStats.totalSuivi}</p>
                    <p className="text-[10px] text-monka-muted mt-2">Questions de suivi dynamique</p>
                </motion.div>

                <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.35 }} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-sky-600" />
                        </div>
                        <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Intégrité</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-bold text-green-600">OK</span>
                    </div>
                    <p className="text-[10px] text-monka-muted mt-2">{globalStats.orphanMT} MT orpheline • {globalStats.totalMappings} mappings</p>
                </motion.div>
            </div>

            {/* === ENGINE HEALTH + INTEGRITY === */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <EngineHealthCard data={data} />
                <IntegrityReportCard data={data} />
            </div>

            {/* === PER-V BREAKDOWN TABLE === */}
            <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.4 }} className="glass-card mb-6 overflow-hidden">
                <div className="px-5 py-3 border-b border-monka-border flex items-center gap-2">
                    <Database className="w-4 h-4 text-monka-primary" />
                    <h2 className="text-sm font-bold text-monka-heading">Données par Vulnérabilité</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-monka-border bg-white/30">
                                <th className="text-left px-4 py-3 font-bold text-monka-muted uppercase tracking-wider">V</th>
                                <th className="text-left px-4 py-3 font-bold text-monka-muted uppercase tracking-wider">Nom (DB)</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">Q</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">État</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">Facteur</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">Score Q</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">Max</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">MP</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">Règles</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">Recos</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">MT</th>
                                <th className="text-center px-3 py-3 font-bold text-monka-muted uppercase tracking-wider">Suivi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {perVStats.map(vs => {
                                const meta = VULN_META[vs.v]
                                return (
                                    <tr key={vs.v} className="border-b border-monka-border/50 hover:bg-white/40 transition-colors">
                                        <td className="px-4 py-3">
                                            <span className="text-[10px] font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: meta.color }}>
                                                {vs.v}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <span className="font-medium text-monka-heading">{vs.dbName}</span>
                                                <p className="text-[9px] text-monka-muted mt-0.5">{vs.blocLabel}</p>
                                            </div>
                                        </td>
                                        <td className="text-center px-3 py-3 font-bold text-monka-heading">{vs.questions}</td>
                                        <td className="text-center px-3 py-3">
                                            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">{vs.etat}</span>
                                        </td>
                                        <td className="text-center px-3 py-3">
                                            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-medium">{vs.facteur}</span>
                                        </td>
                                        <td className="text-center px-3 py-3">
                                            <span className="px-1.5 py-0.5 rounded bg-monka-primary/10 text-monka-primary font-medium">{vs.scoringQ}</span>
                                        </td>
                                        <td className="text-center px-3 py-3 font-bold text-monka-heading">{vs.maxScore}</td>
                                        <td className="text-center px-3 py-3">
                                            <span className="text-monka-heading font-medium">{vs.mps}</span>
                                            <p className="text-[9px] text-monka-muted">{vs.mpIds.join(', ')}</p>
                                        </td>
                                        <td className="text-center px-3 py-3">
                                            <div className="flex gap-0.5 justify-center">
                                                {vs.rulesCrit > 0 && <span className="text-[9px] px-1 py-0.5 rounded bg-red-50 text-red-600 font-bold">{vs.rulesCrit}</span>}
                                                {vs.rulesCCC > 0 && <span className="text-[9px] px-1 py-0.5 rounded bg-orange-50 text-orange-600 font-bold">{vs.rulesCCC}</span>}
                                                {vs.rulesStd > 0 && <span className="text-[9px] px-1 py-0.5 rounded bg-blue-50 text-blue-600 font-bold">{vs.rulesStd}</span>}
                                            </div>
                                            <p className="text-[9px] text-monka-muted">{vs.rules} total</p>
                                        </td>
                                        <td className="text-center px-3 py-3 font-medium text-monka-heading">{vs.recos}</td>
                                        <td className="text-center px-3 py-3 font-medium text-monka-heading">{vs.mts}</td>
                                        <td className="text-center px-3 py-3 text-monka-muted">{vs.suivi}</td>
                                    </tr>
                                )
                            })}
                            {/* Totals row */}
                            <tr className="bg-monka-primary/5 border-t-2 border-monka-primary/20">
                                <td className="px-4 py-3" colSpan={2}>
                                    <span className="text-xs font-bold text-monka-heading">TOTAL</span>
                                </td>
                                <td className="text-center px-3 py-3 font-bold text-monka-heading">{globalStats.nonTriggers}</td>
                                <td className="text-center px-3 py-3 font-bold text-blue-600">{globalStats.etat}</td>
                                <td className="text-center px-3 py-3 font-bold text-amber-600">{globalStats.facteur}</td>
                                <td className="text-center px-3 py-3 font-bold text-monka-primary">{globalStats.scoringQ}</td>
                                <td className="text-center px-3 py-3 font-bold text-monka-heading">{globalStats.maxScore}</td>
                                <td className="text-center px-3 py-3 font-bold text-monka-heading">{globalStats.totalMP}</td>
                                <td className="text-center px-3 py-3 font-bold text-monka-heading">{globalStats.totalRules}</td>
                                <td className="text-center px-3 py-3 font-bold text-monka-heading">{globalStats.totalRecos}</td>
                                <td className="text-center px-3 py-3 font-bold text-monka-heading">{globalStats.totalMT}</td>
                                <td className="text-center px-3 py-3 font-bold text-monka-heading">{globalStats.totalSuivi}</td>
                            </tr>
                            {/* Triggers row */}
                            <tr className="bg-amber-50/50">
                                <td className="px-4 py-2" colSpan={2}>
                                    <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        Triggers (sans V)
                                    </span>
                                </td>
                                <td className="text-center px-3 py-2 font-bold text-amber-600">{globalStats.triggers}</td>
                                <td className="text-center px-3 py-2 text-monka-muted" colSpan={9}>
                                    <span className="text-[10px]">vulnerability_id = NULL • Questions de profilage</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* === SCORING OVERVIEW === */}
            <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.5 }} className="glass-card mb-6">
                <div className="px-5 py-3 border-b border-monka-border flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-monka-primary" />
                    <h2 className="text-sm font-bold text-monka-heading">Seuils de Scoring par Vulnérabilité</h2>
                </div>
                <div className="p-5 space-y-4">
                    {perVStats.map(vs => {
                        const meta = VULN_META[vs.v]
                        const getColor = (level: string) => {
                            switch (level) {
                                case 'faible': return '#00DC82'
                                case 'modere': return '#F5D245'
                                case 'eleve': return '#F5A623'
                                case 'critique': return '#EF4444'
                                default: return '#999'
                            }
                        }

                        return (
                            <div key={vs.v} className="flex items-center gap-4">
                                <div className="w-20 flex-shrink-0 flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: meta.color }}>
                                        {vs.v}
                                    </span>
                                    <span className="text-xs font-bold text-monka-heading">{vs.maxScore}pts</span>
                                </div>
                                <div className="flex-1 flex h-6 rounded-lg overflow-hidden">
                                    {vs.thresholds.map(t => {
                                        const width = vs.maxScore > 0 ? ((t.max_score - t.min_score + 1) / (vs.maxScore + 1)) * 100 : 25
                                        return (
                                            <div
                                                key={t.level}
                                                className="flex items-center justify-center text-[9px] font-bold text-white"
                                                style={{ width: `${width}% `, backgroundColor: getColor(t.level) }}
                                                title={`${t.level}: ${t.min_score} -${t.max_score} `}
                                            >
                                                {t.level} ({t.min_score}-{t.max_score})
                                            </div>
                                        )
                                    })}
                                </div>
                                <span className="text-[10px] text-monka-muted w-16 text-right flex-shrink-0">
                                    {vs.scoringQ} Q
                                </span>
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            {/* === MICRO-TÂCHES BREAKDOWN === */}
            <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.6 }} className="glass-card mb-6">
                <div className="px-5 py-3 border-b border-monka-border flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-monka-primary" />
                    <h2 className="text-sm font-bold text-monka-heading">Micro-Tâches — Répartition par Type</h2>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-5 gap-3">
                        {perVStats.map(vs => {
                            const meta = VULN_META[vs.v]
                            const types = [
                                { label: 'STRUC', count: vs.mtStruc, color: 'bg-blue-100 text-blue-600' },
                                { label: 'SEC', count: vs.mtSec, color: 'bg-orange-100 text-orange-600' },
                                { label: 'MED', count: vs.mtMed, color: 'bg-red-100 text-red-600' },
                                { label: 'INFO', count: vs.mtInfo, color: 'bg-green-100 text-green-600' },
                                { label: 'ORGA', count: vs.mtOrga, color: 'bg-purple-100 text-purple-600' },
                            ]
                            return (
                                <div key={vs.v} className="glass p-3 rounded-xl">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: meta.color }}>
                                            {vs.v}
                                        </span>
                                        <span className="text-sm font-bold text-monka-heading">{vs.mts}</span>
                                    </div>
                                    <div className="space-y-1">
                                        {types.map(t => (
                                            <div key={t.label} className="flex items-center justify-between">
                                                <span className={`text - [9px] font - bold px - 1.5 py - 0.5 rounded ${t.color} `}>{t.label}</span>
                                                <div className="flex-1 mx-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all"
                                                        style={{
                                                            width: vs.mts > 0 ? `${(t.count / vs.mts) * 100}% ` : '0%',
                                                            backgroundColor: meta.color,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-monka-muted w-5 text-right">{t.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <div className="text-center py-4">
                <p className="text-[10px] text-monka-muted">
                    Données extraites en temps réel de Supabase • Projet <code className="bg-monka-dark/5 px-1 rounded">mbxeqrvofrmhqlwlefff</code> • {globalStats.totalQ} questions • {globalStats.totalMP} MP • {globalStats.totalRules} règles
                </p>
            </div>
        </div>
    )
}
