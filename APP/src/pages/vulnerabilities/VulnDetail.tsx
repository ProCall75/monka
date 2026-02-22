/* VulnDetail — Header + tab orchestration.
   Sub-tabs extracted to VulnOverviewTabs.tsx and VulnDetailTabs.tsx for §2 compliance. */

import { useState, useMemo } from 'react'
import {
    Activity, BarChart3, List, Layers,
} from 'lucide-react'
import {
    VULN_META, buildMPVulnMap,
    type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { VulnMPsTab } from './VulnDetailTabs'
import { OverviewTab, QuestionsTab, ScoringTab } from './VulnOverviewTabs'
import { ExportButton } from '../../components/clinical/ExportButton'
import { ScoringDocumentView } from '../../components/clinical/ScoringDocumentView'

type TabId = 'overview' | 'questions' | 'scoring' | 'mps'

interface VulnDetailProps {
    vulnId: string
    data: MonkaData
}

export function VulnDetail({ vulnId, data }: VulnDetailProps) {
    const [activeTab, setActiveTab] = useState<TabId>('overview')
    const [showDoc, setShowDoc] = useState(false)
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
    ]

    if (showDoc) return <ScoringDocumentView data={data} vulnId={vulnId as VulnerabilityId} onBack={() => setShowDoc(false)} />

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
                    <div className="flex items-center gap-2">
                        <ExportButton label="Scoring" variant="subtle" />
                        <button onClick={() => setShowDoc(true)} className="text-[10px] text-monka-muted hover:text-monka-primary transition-colors">📄 Fiche</button>
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
                {activeTab === 'questions' && <QuestionsTab questions={stats.questions} />}
                {activeTab === 'scoring' && <ScoringTab stats={stats} color={meta.color} data={data} vulnId={vulnId} />}
                {activeTab === 'mps' && <VulnMPsTab mps={stats.mps} rules={stats.rules} recos={stats.recos} mts={stats.mts} color={meta.color} />}
            </div>
        </div>
    )
}
