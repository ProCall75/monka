/* VulnDetail — Header + tab orchestration + overview/questions/scoring tabs
   Extracted from VulnerabilitiesPage for architecture compliance. */

import { useState, useMemo } from 'react'
import {
    Activity, BarChart3, List, Layers, Zap, Target, ListChecks,
} from 'lucide-react'
import {
    VULN_META, buildMPVulnMap,
    type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { VulnMPsTab, VulnRulesTab, VulnRecosTab, VulnMTsTab } from './VulnDetailTabs'

type TabId = 'overview' | 'questions' | 'scoring' | 'mps' | 'rules' | 'recos' | 'mts'

interface VulnDetailProps {
    vulnId: string
    data: MonkaData
}

export function VulnDetail({ vulnId, data }: VulnDetailProps) {
    const [activeTab, setActiveTab] = useState<TabId>('overview')
    const meta = VULN_META[vulnId as VulnerabilityId]
    const Icon = meta.icon
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

            {/* Tabs nav */}
            <div className="flex gap-1 mb-4 bg-white/50 rounded-xl p-1 border border-monka-border">
                {tabs.map(tab => {
                    const TabIcon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all
                                ${isActive ? 'bg-white shadow-sm text-monka-heading' : 'text-monka-muted hover:text-monka-text'}`}>
                            <TabIcon className="w-3.5 h-3.5" />
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-monka-primary/10 text-monka-primary' : 'bg-gray-100'}`}>{tab.count}</span>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Tab content */}
            <div className="space-y-3">
                {activeTab === 'overview' && <OverviewTab stats={stats} meta={meta} />}
                {activeTab === 'questions' && <QuestionsTab questions={stats.questions} color={meta.color} />}
                {activeTab === 'scoring' && <ScoringTab stats={stats} color={meta.color} />}
                {activeTab === 'mps' && <VulnMPsTab mps={stats.mps} rules={stats.rules} recos={stats.recos} mts={stats.mts} color={meta.color} />}
                {activeTab === 'rules' && <VulnRulesTab rules={stats.rules} data={data} color={meta.color} />}
                {activeTab === 'recos' && <VulnRecosTab recos={stats.recos} rules={stats.rules} mts={stats.mts} color={meta.color} />}
                {activeTab === 'mts' && <VulnMTsTab mts={stats.mts} recos={stats.recos} color={meta.color} />}
            </div>
        </div>
    )
}

/* ---- Sub-components: overview, questions, scoring ---- */

function OverviewTab({ stats, meta }: { stats: ReturnType<never>; meta: typeof VULN_META['V1'] }) {
    const niveauColors: Record<string, string> = { critique: '#EF4444', ccc: '#F59E0B', standard: '#22C55E' }
    const thresholdColors: Record<string, string> = {
        green: '#22C55E', yellow: '#EAB308', orange: '#F97316', red: '#EF4444',
        vert: '#22C55E', jaune: '#EAB308', faible: '#22C55E', modéré: '#EAB308', élevé: '#F97316', critique: '#EF4444',
    }
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Classification des questions</h4>
                {Object.entries(stats.questionsByClassification).map(([cls, count]) => (
                    <div key={cls} className="flex items-center justify-between py-1.5 border-b border-monka-border last:border-0">
                        <span className="text-xs text-monka-text capitalize">{cls}</span>
                        <span className="text-xs font-bold" style={{ color: meta.color }}>{count as number}</span>
                    </div>
                ))}
            </div>
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Règles d&apos;activation</h4>
                {Object.entries(stats.rulesByNiveau).map(([niveau, count]) => (
                    <div key={niveau} className="flex items-center justify-between py-1.5 border-b border-monka-border last:border-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: niveauColors[niveau] || '#888' }} />
                            <span className="text-xs text-monka-text capitalize">{niveau}</span>
                        </div>
                        <span className="text-xs font-bold">{count as number}</span>
                    </div>
                ))}
            </div>
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Scoring</h4>
                <div className="text-2xl font-bold mb-2" style={{ color: meta.color }}>{stats.maxScore} pts</div>
                <p className="text-[10px] text-monka-muted mb-3">Score maximum</p>
                {[...stats.thresholds].sort((a: { min_score: number }, b: { min_score: number }) => a.min_score - b.min_score).map((t: { level: string; min_score: number; max_score: number }) => (
                    <div key={t.level} className="flex items-center justify-between py-1 border-b border-monka-border last:border-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: thresholdColors[t.level.toLowerCase()] || '#888' }} />
                            <span className="text-xs capitalize">{t.level}</span>
                        </div>
                        <span className="text-[10px] text-monka-muted">{t.min_score}–{t.max_score}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function QuestionsTab({ questions, color }: { questions: MonkaData['questions']; color: string }) {
    return (
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
                    {questions.map(q => (
                        <tr key={q.id} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                            <td className="px-4 py-2 font-mono font-bold" style={{ color }}>{q.id}</td>
                            <td className="px-4 py-2 text-monka-text max-w-[400px] truncate">{q.question_text}</td>
                            <td className="px-4 py-2">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${q.classification === 'etat' ? 'bg-blue-50 text-blue-600' : q.classification === 'facteur' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-500'}`}>
                                    {q.classification || '—'}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-monka-muted">{q.response_options?.length || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function ScoringTab({ stats, color }: { stats: ReturnType<never>; color: string }) {
    const thColors: Record<string, string> = {
        green: '#22C55E', yellow: '#EAB308', orange: '#F97316', red: '#EF4444',
        vert: '#22C55E', jaune: '#EAB308', faible: '#22C55E', modéré: '#EAB308', élevé: '#F97316', critique: '#EF4444',
    }
    return (
        <div className="space-y-3">
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Seuils de score — max {stats.maxScore} pts</h4>
                <div className="flex gap-2">
                    {[...stats.thresholds].sort((a: { min_score: number }, b: { min_score: number }) => a.min_score - b.min_score).map((t: { level: string; min_score: number; max_score: number }) => {
                        const width = stats.maxScore > 0 ? ((t.max_score - t.min_score) / stats.maxScore * 100) : 25
                        return (
                            <div key={t.level} className="rounded-lg p-2 text-center text-white text-[10px] font-bold"
                                style={{ backgroundColor: thColors[t.level.toLowerCase()] || '#888', width: `${width}%`, minWidth: '60px' }}>
                                {t.level}<br />{t.min_score}–{t.max_score}
                            </div>
                        )
                    })}
                </div>
            </div>
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
                        {stats.scoring.map((s: { question_id: string; response_text: string; score: number }, i: number) => (
                            <tr key={i} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                                <td className="px-4 py-2 font-mono font-bold" style={{ color }}>{s.question_id}</td>
                                <td className="px-4 py-2 text-monka-text max-w-[400px] truncate">{s.response_text}</td>
                                <td className="px-4 py-2 text-right font-bold">{s.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
