/* VulnOverviewTabs — Sub-tab components for VulnDetail.
   Extracted from VulnDetail.tsx for §2 compliance (<250L per component).
   Contains: OverviewTab, QuestionsTab, ScoringTab (enriched with question_text FR + content_blocks). */

import { useMemo } from 'react'
import { BookOpen } from 'lucide-react'
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

// ── QuestionsTab ───────────────────────────────────────

interface QuestionsProps {
    questions: MonkaData['questions']
}

export function QuestionsTab({ questions }: QuestionsProps) {
    return (
        <div className="glass-card overflow-hidden">
            <table className="w-full text-xs">
                <thead>
                    <tr className="border-b border-monka-border bg-gray-50/80">
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider w-16">ID</th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider">Question</th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider w-20">Type</th>
                        <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase tracking-wider w-16">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(q => (
                        <tr key={q.id} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                            <td className="px-4 py-2">
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{q.id}</span>
                            </td>
                            <td className="px-4 py-2 text-monka-text font-medium">{q.question_text}</td>
                            <td className="px-4 py-2">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${q.classification === 'etat' ? 'bg-blue-50 text-blue-600'
                                    : q.classification === 'facteur' ? 'bg-amber-50 text-amber-600'
                                        : 'bg-gray-50 text-gray-500'
                                    }`}>
                                    {q.classification || '—'}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-monka-muted text-center">{q.response_options?.length || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// ── ScoringTab (enriched: question_text FR + content_blocks) ──

interface ScoringProps {
    stats: VulnStats
    color: string
    data: MonkaData
    vulnId: string
}

export function ScoringTab({ stats, color, data, vulnId }: ScoringProps) {
    // Build question_id → question_text lookup for FR display
    const questionTextMap = useMemo(() => {
        const map = new Map<string, string>()
        for (const q of data.questions) {
            map.set(q.id, q.question_text)
        }
        return map
    }, [data.questions])

    // Get content blocks explaining "pourquoi ces questions" for this vulnerability
    const contentBlocks = useMemo(
        () => getContentBlocksForEntity(data, 'vulnerability', vulnId),
        [data, vulnId],
    )

    return (
        <div className="space-y-3">
            {/* Content blocks — "Pourquoi ces questions" */}
            {contentBlocks.length > 0 && (
                <div className="glass-card p-4">
                    <h4 className="text-xs font-bold text-monka-muted uppercase mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Explication du scoring
                    </h4>
                    <div className="space-y-2">
                        {contentBlocks.map(cb => (
                            <div key={cb.id} className="text-sm text-monka-text leading-relaxed p-3 bg-white/50 rounded-lg border border-monka-border">
                                {cb.block_type !== 'text' && (
                                    <span className="text-[10px] font-bold text-monka-primary uppercase mr-2">{cb.block_type}</span>
                                )}
                                {cb.content}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Threshold visualization */}
            <div className="glass-card p-4">
                <h4 className="text-xs font-bold text-monka-muted uppercase mb-3">Seuils de score — max {stats.maxScore} pts</h4>
                <div className="flex gap-2">
                    {[...stats.thresholds]
                        .sort((a, b) => a.min_score - b.min_score)
                        .map(t => {
                            const width = stats.maxScore > 0 ? ((t.max_score - t.min_score) / stats.maxScore * 100) : 25
                            return (
                                <div key={t.level} className="rounded-lg p-2 text-center text-white text-[10px] font-bold"
                                    style={{ backgroundColor: THRESHOLD_COLORS[t.level.toLowerCase()] || '#888', width: `${width}%`, minWidth: '60px' }}>
                                    {t.level}<br />{t.min_score}–{t.max_score}
                                </div>
                            )
                        })}
                </div>
            </div>

            {/* Scoring questions — FRENCH question_text, no raw codes */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-monka-border bg-gray-50/80">
                            <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase">Question</th>
                            <th className="text-left px-4 py-2.5 font-bold text-monka-muted uppercase">Réponse scorante</th>
                            <th className="text-right px-4 py-2.5 font-bold text-monka-muted uppercase w-16">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.scoring.map((s, i) => (
                            <tr key={i} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                                <td className="px-4 py-2">
                                    <div className="text-monka-text font-medium">
                                        {questionTextMap.get(s.question_id) || s.question_id}
                                    </div>
                                    <span className="text-[9px] font-mono text-monka-muted">{s.question_id}</span>
                                </td>
                                <td className="px-4 py-2 text-monka-text">{s.response_text}</td>
                                <td className="px-4 py-2 text-right font-bold" style={{ color }}>{s.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
