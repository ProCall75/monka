/* ScoreBreakdown — Per-question score contribution bars + what-if hints.
   Shows which questions contribute most to the vulnerability score. */

import { motion } from 'framer-motion'
import { VULN_COLORS, type VulnerabilityId } from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface ScoreBreakdownProps {
    data: MonkaData
    vulnId: string
    answers: Record<string, string>
    scoringMap: Record<string, Record<string, number>>
}

interface QuestionContrib {
    qId: string
    qText: string
    currentAnswer: string | null
    currentScore: number
    maxScore: number
    bestAlt: { answer: string; score: number } | null
    classification: string | null
    justification: string | null
}

export function ScoreBreakdown({ data, vulnId, answers, scoringMap }: ScoreBreakdownProps) {
    const color = vColorMap[vulnId as VulnerabilityId] || '#999'
    const vulnSQ = data.scoringQuestions.filter(sq => sq.vulnerability_id === vulnId)
    const questionIds = [...new Set(vulnSQ.map(sq => sq.question_id))]

    const contributions: QuestionContrib[] = questionIds.map(qId => {
        const q = data.questions.find(qu => qu.id === qId)
        const qScores = vulnSQ.filter(sq => sq.question_id === qId)
        const maxScore = Math.max(...qScores.map(sq => sq.score), 0)
        const answer = answers[qId] || null
        const currentScore = answer && scoringMap[qId]?.[answer] !== undefined
            ? scoringMap[qId][answer] : 0
        const bestAlt = qScores
            .filter(sq => sq.response_text !== answer)
            .sort((a, b) => b.score - a.score)[0] || null
        const justBlock = data.contentBlocks?.find(
            cb => cb.entity_type === 'question' && cb.entity_id === qId && cb.block_type === 'scoring_justification'
        )

        return {
            qId,
            qText: q?.question_text || qId,
            currentAnswer: answer,
            currentScore,
            maxScore,
            bestAlt: bestAlt ? { answer: bestAlt.response_text, score: bestAlt.score } : null,
            classification: q?.classification || null,
            justification: justBlock?.content || null,
        }
    }).sort((a, b) => b.currentScore - a.currentScore)

    if (contributions.length === 0) return null

    const totalScore = contributions.reduce((s, c) => s + c.currentScore, 0)

    return (
        <div className="mt-4">
            <h4 className="text-xs font-bold text-monka-heading mb-2">
                Détail scoring — contribution par question
            </h4>
            <div className="space-y-1.5">
                {contributions.map(c => {
                    const pct = c.maxScore > 0 ? (c.currentScore / c.maxScore) * 100 : 0
                    const whatIfDelta = c.bestAlt ? c.bestAlt.score - c.currentScore : 0
                    return (
                        <div key={c.qId} className="group">
                            <div className="flex items-center gap-2 text-[10px]">
                                <span className="font-mono font-bold w-12 flex-shrink-0"
                                    style={{ color }}>{c.qId}</span>
                                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div className="h-full rounded-full"
                                        style={{ backgroundColor: color }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.4 }} />
                                </div>
                                <span className="font-bold text-monka-heading w-10 text-right">
                                    {c.currentScore}/{c.maxScore}
                                </span>
                            </div>
                            {/* Hover detail with what-if + content blocks */}
                            <div className="hidden group-hover:block ml-14 mt-0.5 mb-1">
                                <p className="text-[9px] text-monka-muted line-clamp-1">
                                    {c.qText}
                                </p>
                                {/* Classification badge */}
                                {c.classification && c.classification !== 'aucun' && (
                                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full inline-block mt-0.5 mb-0.5 ${c.classification === 'facteur' ? 'bg-blue-100 text-blue-600'
                                            : c.classification === 'etat' ? 'bg-purple-100 text-purple-600'
                                                : 'bg-indigo-100 text-indigo-600'}`}>
                                        {c.classification === 'facteur' ? '⚡ Facteur' : c.classification === 'etat' ? '📊 État' : '⚡📊 Facteur + État'}
                                    </span>
                                )}
                                {/* Scoring justification from content_blocks */}
                                {c.justification && (
                                    <p className="text-[9px] text-gray-600 mt-0.5 leading-snug bg-amber-50/50 px-1.5 py-1 rounded">
                                        {c.justification}
                                    </p>
                                )}
                                {c.currentAnswer && (
                                    <p className="text-[9px] text-monka-text">
                                        Réponse : <strong>{c.currentAnswer}</strong>
                                        {' → '}{c.currentScore} pts
                                    </p>
                                )}
                                {whatIfDelta !== 0 && c.bestAlt && (
                                    <p className={`text-[9px] font-medium ${whatIfDelta > 0 ? 'text-red-500' : 'text-green-500'
                                        }`}>
                                        💡 Si «&nbsp;{c.bestAlt.answer}&nbsp;» → total{' '}
                                        {totalScore + whatIfDelta}{' '}
                                        ({whatIfDelta > 0 ? '+' : ''}{whatIfDelta})
                                    </p>
                                )}
                                {!c.currentAnswer && (
                                    <p className="text-[9px] text-monka-muted italic">
                                        Non répondu — max possible : {c.maxScore} pts
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
