/* VulnOverviewTabs — Sub-tab components for VulnDetail.
   Extracted from VulnDetail.tsx for §2 compliance (<250L per component).
   Contains: OverviewTab, QuestionsTab (enriched with inline scoring details + content blocks). */

import { useState, useMemo, Fragment } from 'react'
import { ChevronDown, ChevronRight, Zap, BookOpen, Info } from 'lucide-react'
import type { MonkaData } from '../../clinical/hooks'
import { getContentBlocksForEntity } from '../../engine/supabaseData'

// ── Types ──────────────────────────────────────────────

interface VulnStats {
    questions: MonkaData['questions']
    mps: MonkaData['microParcours']
    rules: MonkaData['activationRules']
    scoring: MonkaData['scoringQuestions']
    thresholds: MonkaData['scoringThresholds']
    recos: MonkaData['recommendations']
    mts: MonkaData['microTaches']
    questionsByClassification: Record<string, number>
    rulesByNiveau: Record<string, number>
    maxScore: number
}

const NIVEAU_COLORS: Record<string, string> = {
    critique: '#EF4444', ccc: '#F59E0B', standard: '#22C55E',
}

const THRESHOLD_COLORS: Record<string, string> = {
    green: '#22C55E', yellow: '#EAB308', orange: '#F97316', red: '#EF4444',
    vert: '#22C55E', jaune: '#EAB308', faible: '#22C55E',
    modéré: '#EAB308', élevé: '#F97316', critique: '#EF4444',
}

const CLASSIFICATION_INFO: Record<string, { label: string; desc: string; bg: string; text: string }> = {
    etat: {
        label: 'État',
        desc: 'Mesure un état actuel du patient — indicateur de sa condition présente',
        bg: 'bg-blue-50', text: 'text-blue-600',
    },
    facteur: {
        label: 'Facteur',
        desc: 'Identifie un facteur de risque — prédicteur d\'une évolution potentielle',
        bg: 'bg-amber-50', text: 'text-amber-600',
    },
}

const BLOCK_TYPE_META: Record<string, { label: string; icon: typeof BookOpen; color: string }> = {
    scoring_justification: { label: 'Justification clinique', icon: BookOpen, color: '#6366F1' },
    scoring_ponderation: { label: 'Pondération', icon: Zap, color: '#F59E0B' },
}

// ── OverviewTab ────────────────────────────────────────

interface OverviewProps {
    stats: VulnStats
    meta: { color: string; label: string }
}

export function OverviewTab({ stats, meta }: OverviewProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Classification des questions</h4>
                {Object.entries(stats.questionsByClassification).map(([cls, count]) => (
                    <div key={cls} className="flex items-center justify-between py-1.5 border-b border-monka-border last:border-0">
                        <span className="text-xs text-monka-text capitalize">{cls}</span>
                        <span className="text-xs font-bold" style={{ color: meta.color }}>{count}</span>
                    </div>
                ))}
            </div>
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Règles d&apos;activation</h4>
                {Object.entries(stats.rulesByNiveau).map(([niveau, count]) => (
                    <div key={niveau} className="flex items-center justify-between py-1.5 border-b border-monka-border last:border-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: NIVEAU_COLORS[niveau] || '#888' }} />
                            <span className="text-xs text-monka-text capitalize">{niveau}</span>
                        </div>
                        <span className="text-xs font-bold">{count}</span>
                    </div>
                ))}
            </div>
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Scoring</h4>
                <div className="text-2xl font-bold mb-2" style={{ color: meta.color }}>{stats.maxScore} pts</div>
                <p className="text-[10px] text-monka-muted mb-3">Score maximum</p>
                {[...stats.thresholds]
                    .sort((a, b) => a.min_score - b.min_score)
                    .map(t => (
                        <div key={t.level} className="flex items-center justify-between py-1 border-b border-monka-border last:border-0">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: THRESHOLD_COLORS[t.level.toLowerCase()] || '#888' }} />
                                <span className="text-xs capitalize">{t.level}</span>
                            </div>
                            <span className="text-[10px] text-monka-muted">{t.min_score}–{t.max_score}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
}

// ── QuestionsTab (enriched: scoring details + content blocks) ──

interface QuestionsProps {
    questions: MonkaData['questions']
    data: MonkaData
    vulnId: string
    color: string
}

export function QuestionsTab({ questions, data, vulnId, color }: QuestionsProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

    // Build question_id → scoring entries lookup
    const scoringByQuestion = useMemo(() => {
        const map = new Map<string, MonkaData['scoringQuestions']>()
        for (const sq of data.scoringQuestions.filter(s => s.vulnerability_id === vulnId)) {
            const list = map.get(sq.question_id) || []
            list.push(sq)
            map.set(sq.question_id, list)
        }
        return map
    }, [data.scoringQuestions, vulnId])

    const scoringQuestionIds = useMemo(
        () => new Set(scoringByQuestion.keys()),
        [scoringByQuestion],
    )

    const toggle = (qId: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev)
            next.has(qId) ? next.delete(qId) : next.add(qId)
            return next
        })
    }

    return (
        <div className="glass-card overflow-hidden">
            <table className="w-full text-xs">
                <thead>
                    <tr className="border-b border-monka-border bg-gray-50/80">
                        <th className="w-8"></th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider w-16">ID</th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider">Question</th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider w-20">Type</th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider w-20">Scoring</th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider w-16">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(q => {
                        const isScoring = scoringQuestionIds.has(q.id)
                        const isExpanded = expandedIds.has(q.id)
                        const scoringEntries = scoringByQuestion.get(q.id) || []
                        const classInfo = CLASSIFICATION_INFO[q.classification || '']
                        const contentBlocks = getContentBlocksForEntity(data, 'question', q.id)

                        return (
                            <Fragment key={q.id}>
                                <tr
                                    className={`border-b border-monka-border/50 cursor-pointer transition-colors hover:bg-gray-50/80 ${isExpanded ? 'bg-gray-50/60' : ''}`}
                                    onClick={() => toggle(q.id)}
                                >
                                    <td className="pl-2 py-2 text-center">
                                        {isExpanded
                                            ? <ChevronDown className="w-3.5 h-3.5 text-monka-muted mx-auto" />
                                            : <ChevronRight className="w-3.5 h-3.5 text-monka-muted mx-auto" />
                                        }
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{q.id}</span>
                                    </td>
                                    <td className="px-4 py-2 text-monka-text font-medium">{q.question_text}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${classInfo ? `${classInfo.bg} ${classInfo.text}` : 'bg-gray-50 text-gray-500'}`}>
                                            {classInfo?.label || q.classification || '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        {isScoring ? (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600">
                                                <Zap className="w-2.5 h-2.5" />
                                                Scorante
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-400">
                                                Non scorante
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-monka-muted text-center">{q.response_options?.length || 0}</td>
                                </tr>

                                {/* Expanded detail row */}
                                {isExpanded && (
                                    <tr key={`${q.id}-detail`} className="border-b border-monka-border/50">
                                        <td colSpan={6} className="px-6 py-3 bg-gradient-to-r from-gray-50/80 to-white">
                                            <div className="space-y-3">
                                                {/* Content blocks — clinical justification */}
                                                {contentBlocks.length > 0 && (
                                                    <div className="space-y-2">
                                                        {contentBlocks
                                                            .sort((a, b) => a.ordre - b.ordre)
                                                            .map(cb => {
                                                                const meta = BLOCK_TYPE_META[cb.block_type]
                                                                const BlockIcon = meta?.icon || Info
                                                                return (
                                                                    <div key={cb.id} className="flex items-start gap-2.5 p-3 rounded-lg border border-monka-border bg-white/70">
                                                                        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                                                                            <BlockIcon className="w-3.5 h-3.5" style={{ color: meta?.color || '#888' }} />
                                                                            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: meta?.color || '#888' }}>
                                                                                {meta?.label || cb.block_type}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-[11px] text-monka-text leading-relaxed">{cb.content}</p>
                                                                    </div>
                                                                )
                                                            })}
                                                    </div>
                                                )}

                                                {/* Classification explanation */}
                                                {classInfo && (
                                                    <div className="flex items-start gap-2 p-2.5 rounded-lg border border-monka-border bg-white/50">
                                                        <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${classInfo.bg} ${classInfo.text} flex-shrink-0 mt-0.5`}>
                                                            {classInfo.label}
                                                        </div>
                                                        <p className="text-[11px] text-monka-muted leading-relaxed">{classInfo.desc}</p>
                                                    </div>
                                                )}

                                                {/* Scoring responses table — only for scoring questions */}
                                                {isScoring && scoringEntries.length > 0 && (
                                                    <div>
                                                        <h5 className="text-[10px] font-bold text-monka-muted uppercase mb-2 flex items-center gap-1.5">
                                                            <Zap className="w-3 h-3" style={{ color }} />
                                                            Réponses scorantes ({scoringEntries.length})
                                                        </h5>
                                                        <div className="grid gap-1.5">
                                                            {scoringEntries.map((se, i) => (
                                                                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-monka-border">
                                                                    <span className="text-[11px] text-monka-text">{se.response_text}</span>
                                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                                        {se.coefficient !== 1 && (
                                                                            <span className="text-[9px] text-monka-muted">×{se.coefficient}</span>
                                                                        )}
                                                                        <span className="text-xs font-bold px-2 py-0.5 rounded-md text-white min-w-[32px] text-center"
                                                                            style={{ backgroundColor: color }}>
                                                                            {se.score} pt{se.score > 1 ? 's' : ''}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
