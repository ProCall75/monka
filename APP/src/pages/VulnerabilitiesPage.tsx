import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield,
    Activity,
    CheckCircle2,
    AlertTriangle,
    Zap,

    Target,
    List,
    BarChart3,
    Layers,
    ListChecks,
} from 'lucide-react'
import { useMonkaData } from '../engine/useMonkaData'
import { buildMPVulnMap, type MonkaData } from '../engine/supabaseData'
import { VULN_META } from '../engine/constants'
import type { VulnerabilityId } from '../engine/types'


type TabId = 'overview' | 'questions' | 'scoring' | 'mps' | 'rules' | 'recos' | 'mts'

function VulnDetail({ vulnId, data }: { vulnId: string, data: MonkaData }) {
    const [activeTab, setActiveTab] = useState<TabId>('overview')
    const meta = VULN_META[vulnId as VulnerabilityId]
    const Icon = meta.icon

    // Compute stats
    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])

    const stats = useMemo(() => {
        const questions = data.questions.filter(q => q.vulnerability_id === vulnId)
        const mps = data.microParcours.filter(mp => mp.vulnerability_id === vulnId)
        const mpIds = new Set(mps.map(mp => mp.id))
        const rules = data.activationRules.filter(r => mpIds.has(r.mp_id))
        const scoring = data.scoringQuestions.filter(s => s.vulnerability_id === vulnId)
        const thresholds = data.scoringThresholds.filter(t => t.vulnerability_id === vulnId)
        const recos = data.recommendations.filter(r => mpVulnMap[r.mp_id] === vulnId)
        const mts = data.microTaches.filter(mt => mpVulnMap[mt.mp_id] === vulnId)

        const questionsByClassification = questions.reduce((acc, q) => {
            const cls = q.classification || 'non classé'
            acc[cls] = (acc[cls] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const rulesByNiveau = rules.reduce((acc, r) => {
            acc[r.niveau] = (acc[r.niveau] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const maxScore = scoring.length > 0 ? Math.max(...scoring.map(s => s.max_score_vulnerability || 0)) : 0

        return { questions, mps, rules, scoring, thresholds, recos, mts, questionsByClassification, rulesByNiveau, maxScore }
    }, [vulnId, data, mpVulnMap])

    const tabs: { id: TabId; label: string; icon: typeof Activity; count?: number }[] = [
        { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
        { id: 'questions', label: 'Questions', icon: List, count: stats.questions.length },
        { id: 'scoring', label: 'Scoring', icon: Activity, count: stats.scoring.length },
        { id: 'mps', label: 'Micro-Parcours', icon: Layers, count: stats.mps.length },
        { id: 'rules', label: 'Règles', icon: Zap, count: stats.rules.length },
        { id: 'recos', label: 'Recommandations', icon: Target, count: stats.recos.length },
        { id: 'mts', label: 'Micro-Tâches', icon: ListChecks, count: stats.mts.length },
    ]

    return (
        <div>
            {/* Header */}
            <div className="glass-card p-5 mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${meta.color}30, ${meta.color}15)` }}>
                        <Icon className="w-7 h-7" style={{ color: meta.color }} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-white px-2 py-0.5 rounded-md"
                                style={{ backgroundColor: meta.color }}>{meta.label}</span>
                            <h2 className="text-xl font-bold text-monka-heading">{meta.name}</h2>
                        </div>
                        <p className="text-sm text-monka-muted">{meta.description}</p>
                    </div>
                    {/* Quick stats */}
                    <div className="flex gap-4">
                        {[
                            { label: 'Questions', value: stats.questions.length },
                            { label: 'MP', value: stats.mps.length },
                            { label: 'Règles', value: stats.rules.length },
                            { label: 'Recos', value: stats.recos.length },
                            { label: 'MT', value: stats.mts.length },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-lg font-bold" style={{ color: meta.color }}>{s.value}</div>
                                <div className="text-[10px] text-monka-muted uppercase">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-white/50 rounded-xl p-1 border border-monka-border">
                {tabs.map(tab => {
                    const TabIcon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all
                                ${isActive ? 'bg-white shadow-sm text-monka-heading' : 'text-monka-muted hover:text-monka-text'}`}
                        >
                            <TabIcon className="w-3.5 h-3.5" />
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-monka-primary/10 text-monka-primary' : 'bg-gray-100'}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Tab content */}
            <div className="space-y-3">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-3 gap-4">
                        {/* Classification breakdown */}
                        <div className="glass-card p-4">
                            <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Classification des questions</h4>
                            {Object.entries(stats.questionsByClassification).map(([cls, count]) => (
                                <div key={cls} className="flex items-center justify-between py-1.5 border-b border-monka-border last:border-0">
                                    <span className="text-xs text-monka-text capitalize">{cls}</span>
                                    <span className="text-xs font-bold" style={{ color: meta.color }}>{count}</span>
                                </div>
                            ))}
                        </div>

                        {/* Rules by niveau */}
                        <div className="glass-card p-4">
                            <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Règles d'activation</h4>
                            {Object.entries(stats.rulesByNiveau).map(([niveau, count]) => {
                                const niveauColors: Record<string, string> = {
                                    critique: '#EF4444',
                                    ccc: '#F59E0B',
                                    standard: '#22C55E',
                                }
                                return (
                                    <div key={niveau} className="flex items-center justify-between py-1.5 border-b border-monka-border last:border-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: niveauColors[niveau] || '#888' }} />
                                            <span className="text-xs text-monka-text capitalize">{niveau}</span>
                                        </div>
                                        <span className="text-xs font-bold">{count}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Scoring */}
                        <div className="glass-card p-4">
                            <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Scoring</h4>
                            <div className="text-2xl font-bold mb-2" style={{ color: meta.color }}>{stats.maxScore} pts</div>
                            <p className="text-[10px] text-monka-muted mb-3">Score maximum</p>
                            {stats.thresholds.sort((a, b) => a.min_score - b.min_score).map(t => {
                                const thresholdColors: Record<string, string> = {
                                    green: '#22C55E', yellow: '#EAB308', orange: '#F97316', red: '#EF4444',
                                    vert: '#22C55E', jaune: '#EAB308', faible: '#22C55E', modéré: '#EAB308', élevé: '#F97316', critique: '#EF4444',
                                }
                                const color = thresholdColors[t.level.toLowerCase()] || '#888'
                                return (
                                    <div key={t.level} className="flex items-center justify-between py-1 border-b border-monka-border last:border-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                                            <span className="text-xs capitalize">{t.level}</span>
                                        </div>
                                        <span className="text-[10px] text-monka-muted">{t.min_score}–{t.max_score}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'questions' && (
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-monka-border bg-gray-50/80">
                                    <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider">ID</th>
                                    <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider">Question</th>
                                    <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider">Type</th>
                                    <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.questions.map(q => (
                                    <tr key={q.id} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                                        <td className="px-4 py-2 font-mono font-bold" style={{ color: meta.color }}>{q.id}</td>
                                        <td className="px-4 py-2 text-monka-text max-w-[400px] truncate">{q.question_text}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium
                                                ${q.classification === 'etat' ? 'bg-blue-50 text-blue-600' :
                                                    q.classification === 'facteur' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-gray-50 text-gray-500'}`}>
                                                {q.classification || '—'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-monka-muted">{q.response_options?.length || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'scoring' && (
                    <div className="space-y-3">
                        {/* Thresholds */}
                        <div className="glass-card p-4">
                            <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Seuils de score — max {stats.maxScore} pts</h4>
                            <div className="flex gap-2">
                                {stats.thresholds.sort((a, b) => a.min_score - b.min_score).map(t => {
                                    const width = stats.maxScore > 0 ? ((t.max_score - t.min_score) / stats.maxScore * 100) : 25
                                    const thColors: Record<string, string> = {
                                        green: '#22C55E', yellow: '#EAB308', orange: '#F97316', red: '#EF4444',
                                        vert: '#22C55E', jaune: '#EAB308', faible: '#22C55E', modéré: '#EAB308', élevé: '#F97316', critique: '#EF4444',
                                    }
                                    return (
                                        <div key={t.level} className="rounded-lg p-2 text-center text-white text-[10px] font-bold"
                                            style={{ backgroundColor: thColors[t.level.toLowerCase()] || '#888', width: `${width}%`, minWidth: '60px' }}>
                                            {t.level}<br />{t.min_score}–{t.max_score}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Scoring questions */}
                        <div className="glass-card overflow-hidden">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-monka-border bg-gray-50/80">
                                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase">Question</th>
                                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase">Réponse scorante</th>
                                        <th className="text-right px-4 py-2.5 font-bold text-monka-muted uppercase">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.scoring.map((s, i) => (
                                        <tr key={i} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                                            <td className="px-4 py-2 font-mono font-bold" style={{ color: meta.color }}>{s.question_id}</td>
                                            <td className="px-4 py-2 text-monka-text max-w-[400px] truncate">{s.response_text}</td>
                                            <td className="px-4 py-2 text-right font-bold">{s.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'mps' && (
                    <div className="space-y-3">
                        {stats.mps.map(mp => {
                            const mpRecos = stats.recos.filter(r => r.mp_id === mp.id)
                            const mpMTs = stats.mts.filter(mt => mt.mp_id === mp.id)
                            const mpRules = stats.rules.filter(r => r.mp_id === mp.id)
                            return (
                                <div key={mp.id} className="glass-card p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ background: `${meta.color}15` }}>
                                            <Layers className="w-4 h-4" style={{ color: meta.color }} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                                                    style={{ backgroundColor: meta.color }}>{mp.id}</span>
                                                <h4 className="text-sm font-bold text-monka-heading">{mp.nom}</h4>
                                            </div>
                                            {mp.objectif && <p className="text-xs text-monka-muted italic">{mp.objectif}</p>}
                                        </div>
                                        <div className="flex gap-3 text-center">
                                            <div>
                                                <div className="text-sm font-bold" style={{ color: meta.color }}>{mpRules.length}</div>
                                                <div className="text-[9px] text-monka-muted">Règles</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold" style={{ color: meta.color }}>{mpRecos.length}</div>
                                                <div className="text-[9px] text-monka-muted">Recos</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold" style={{ color: meta.color }}>{mpMTs.length}</div>
                                                <div className="text-[9px] text-monka-muted">MT</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Signatures */}
                                    {(mp.signature_a || mp.signature_b) && (
                                        <div className="flex gap-3 mt-2">
                                            {mp.signature_a && (
                                                <div className="text-[10px] px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <strong>A</strong> — {mp.signature_a}
                                                </div>
                                            )}
                                            {mp.signature_b && (
                                                <div className="text-[10px] px-2 py-1 rounded-lg bg-red-50 text-red-500 border border-red-100">
                                                    <strong>B</strong> — {mp.signature_b}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}

                {activeTab === 'rules' && (
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-monka-border bg-gray-50/80">
                                    <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">ID</th>
                                    <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">MP</th>
                                    <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Niveau</th>
                                    <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Conditions d'activation</th>
                                    <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Sens clinique</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.rules.map(rule => {
                                    const niveauColors: Record<string, string> = {
                                        critique: 'bg-red-50 text-red-600',
                                        ccc: 'bg-amber-50 text-amber-600',
                                        standard: 'bg-emerald-50 text-emerald-600',
                                    }
                                    // condition_logic is an array of {q, op, val/vals}
                                    const conditions = (Array.isArray(rule.condition_logic) ? rule.condition_logic : []) as Array<{ q?: string; op?: string; val?: string; vals?: string[] }>
                                    // Helper: get question text by ID
                                    const getQText = (qId: string) => {
                                        const q = data.questions.find(qq => qq.id === qId)
                                        return q ? q.question_text : qId
                                    }
                                    return (
                                        <tr key={rule.id} className="border-b border-monka-border/50 hover:bg-gray-50/50 align-top">
                                            <td className="px-3 py-2 font-mono text-monka-muted">{rule.id}</td>
                                            <td className="px-3 py-2 font-bold" style={{ color: meta.color }}>{rule.mp_id}</td>
                                            <td className="px-3 py-2">
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${niveauColors[rule.niveau] || 'bg-gray-50'}`}>
                                                    {rule.niveau}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 max-w-[450px]">
                                                {conditions.length > 0 ? (
                                                    <div className="space-y-1.5">
                                                        {conditions.map((cond, i) => {
                                                            const qId = cond.q || ''
                                                            const qText = getQText(qId)
                                                            const values = cond.vals || (cond.val ? [cond.val] : [])
                                                            return (
                                                                <div key={i}>
                                                                    {i > 0 && <span className="text-[9px] text-monka-muted font-bold uppercase block mb-0.5">ET</span>}
                                                                    <div className="text-[11px] text-monka-text leading-snug">
                                                                        <span className="text-monka-muted">Quand </span>
                                                                        <span className="font-mono font-bold text-[10px] px-1 py-0.5 rounded bg-gray-100" style={{ color: meta.color }}>{qId}</span>
                                                                        <span className="text-monka-muted italic text-[10px] ml-1">« {qText.length > 60 ? qText.slice(0, 57) + '…' : qText} »</span>
                                                                        <span className="text-monka-muted"> = </span>
                                                                        {values.map((v, j) => (
                                                                            <span key={j}>
                                                                                {j > 0 && <span className="text-monka-muted mx-0.5">ou</span>}
                                                                                <span className="px-1.5 py-0.5 rounded bg-monka-primary/10 text-monka-primary text-[10px] font-medium">{v}</span>
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                ) : (
                                                    <span className="text-monka-muted">—</span>
                                                )}
                                            </td>
                                            <td className="px-3 py-2 text-monka-text max-w-[200px]">{rule.sens_clinique || '—'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'recos' && (
                    <div className="space-y-2">
                        {stats.recos.map(reco => {
                            const recoMTs = stats.mts.filter(mt => mt.category_id === reco.category_id)
                            const contributiveMTs = recoMTs.filter(mt => mt.is_contributive)
                            const nonContributiveMTs = recoMTs.filter(mt => !mt.is_contributive)
                            const niveauCls = reco.niveau === 'critique'
                                ? 'bg-red-50 text-red-600 border-red-200'
                                : reco.niveau === 'ccc'
                                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                                    : reco.niveau === 'standard'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                        : 'bg-gray-50 text-gray-500 border-gray-200'
                            // Find associated activation rules for same category
                            const linkedRule = stats.rules.find(r => r.category_id === reco.category_id) || null
                            return (
                                <div key={reco.id} className="glass-card p-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: meta.color }} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-mono text-monka-muted">{reco.id}</span>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-monka-muted">{reco.mp_id}</span>
                                                {reco.niveau && (
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${niveauCls}`}>
                                                        {reco.niveau}
                                                    </span>
                                                )}
                                                {linkedRule && (
                                                    <span className="text-[10px] text-monka-muted italic">
                                                        ← {linkedRule.id}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-monka-text leading-relaxed">{reco.wording_utilisateur}</p>
                                            {contributiveMTs.length > 0 && (
                                                <div className="mt-2 pl-3 border-l-2 border-emerald-200 space-y-1">
                                                    <span className="text-[9px] font-bold text-emerald-600 uppercase">📍 Sécurisation ({contributiveMTs.length})</span>
                                                    {contributiveMTs.map(mt => {
                                                        const mtColors: Record<string, string> = {
                                                            STRUC: 'bg-blue-50 text-blue-600',
                                                            SEC: 'bg-orange-50 text-orange-600',
                                                            MED: 'bg-red-50 text-red-600',
                                                        }
                                                        return (
                                                            <div key={mt.id} className="text-[10px] text-monka-muted flex items-center gap-1.5">
                                                                <span className={`px-1 py-0.5 rounded font-mono font-bold ${mtColors[mt.type] || 'bg-gray-50'}`}>{mt.type}</span>
                                                                <span className="line-clamp-1">{mt.libelle}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                            {nonContributiveMTs.length > 0 && (
                                                <div className="mt-1.5 pl-3 border-l-2 border-gray-200 space-y-1">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase">💡 Amélioration ({nonContributiveMTs.length})</span>
                                                    {nonContributiveMTs.map(mt => {
                                                        const mtColors: Record<string, string> = {
                                                            INFO: 'bg-green-50 text-green-600',
                                                            ORGA: 'bg-purple-50 text-purple-600',
                                                        }
                                                        return (
                                                            <div key={mt.id} className="text-[10px] text-monka-muted flex items-center gap-1.5">
                                                                <span className={`px-1 py-0.5 rounded font-mono font-bold ${mtColors[mt.type] || 'bg-gray-50'}`}>{mt.type}</span>
                                                                <span className="line-clamp-1">{mt.libelle}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {activeTab === 'mts' && (
                    <div>
                        {/* MT summaries */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {(['STRUC', 'SEC', 'MED', 'INFO', 'ORGA'] as const).map(type => {
                                const count = stats.mts.filter(mt => mt.type === type).length
                                const typeColors: Record<string, string> = {
                                    STRUC: 'bg-blue-100 text-blue-600 border-blue-200',
                                    SEC: 'bg-orange-100 text-orange-600 border-orange-200',
                                    MED: 'bg-red-100 text-red-600 border-red-200',
                                    INFO: 'bg-green-100 text-green-600 border-green-200',
                                    ORGA: 'bg-purple-100 text-purple-600 border-purple-200',
                                }
                                return (
                                    <div key={type} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${typeColors[type]}`}>
                                        {type} <span className="ml-1 opacity-70">{count}</span>
                                    </div>
                                )
                            })}
                            <div className="w-px bg-gray-200 mx-1" />
                            {(['medical', 'medico-social'] as const).map(dom => {
                                const count = stats.mts.filter(mt => mt.domaine === dom).length
                                return (
                                    <div key={dom} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${dom === 'medical' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-teal-50 text-teal-600 border-teal-200'
                                        }`}>
                                        {dom === 'medical' ? 'Médical' : 'Médico-social'} <span className="ml-1 opacity-70">{count}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* MT table */}
                        <div className="glass-card overflow-hidden">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-monka-border bg-gray-50/80">
                                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">ID</th>
                                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Type</th>
                                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Domaine</th>
                                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Libellé</th>
                                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Acteur</th>
                                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Reco</th>
                                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">MP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.mts.map(mt => {
                                        const typeColors: Record<string, string> = {
                                            STRUC: 'bg-blue-50 text-blue-600',
                                            SEC: 'bg-orange-50 text-orange-600',
                                            MED: 'bg-red-50 text-red-600',
                                            INFO: 'bg-green-50 text-green-600',
                                            ORGA: 'bg-purple-50 text-purple-600',
                                        }
                                        const reco = stats.recos.find(r => r.category_id === mt.category_id)
                                        return (
                                            <tr key={mt.id} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                                                <td className="px-3 py-2 font-mono text-monka-muted">{mt.id}</td>
                                                <td className="px-3 py-2">
                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${typeColors[mt.type] || 'bg-gray-50'}`}>
                                                        {mt.type}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {mt.domaine && (
                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${mt.domaine === 'medical' ? 'bg-rose-50 text-rose-600' : 'bg-teal-50 text-teal-600'
                                                            }`}>
                                                            {mt.domaine === 'medical' ? 'Médical' : 'Médico-social'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 text-monka-text max-w-[300px]">
                                                    <span className="line-clamp-2">{mt.libelle}</span>
                                                </td>
                                                <td className="px-3 py-2 text-monka-muted">
                                                    {mt.acteur && (
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 font-medium text-monka-text">
                                                            {Array.isArray(mt.acteur) ? mt.acteur.join(', ') : mt.acteur}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 font-mono text-monka-muted">{mt.category_id || '—'}</td>
                                                <td className="px-3 py-2">
                                                    {reco?.mp_id && (
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 font-medium" style={{ color: meta.color }}>
                                                            {reco.mp_id}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

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
                    Explorer les 5 dimensions cliniques — questions, scoring, micro-parcours et recommandations
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
                                ${isActive
                                    ? 'bg-white shadow-md'
                                    : 'bg-white/50 hover:bg-white/80 border-transparent'}`}
                            style={{ borderColor: isActive ? meta.color : 'transparent' }}
                        >
                            <Icon className="w-4 h-4" style={{ color: meta.color }} />
                            <span className="text-sm font-bold" style={{ color: isActive ? meta.color : undefined }}>
                                {meta.label}
                            </span>
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
