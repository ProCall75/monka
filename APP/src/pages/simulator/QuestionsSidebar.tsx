/* QuestionsSidebar — Left panel of the Simulator
   Displays grouped questions with collapsible sections and answer buttons.
   Extracted from SimulatorPage for architecture compliance. */

import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ChevronDown, ChevronRight } from 'lucide-react'
import { VULN_COLORS, type VulnerabilityId } from '../../clinical/hooks'
import type { DBQuestion } from '../../clinical/hooks'
import type { VFilter } from './types'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface QuestionsSidebarProps {
    activeV: VFilter
    vulnName: string | undefined
    answers: Record<string, string | string[]>
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>
    groupedQuestions: Record<string, DBQuestion[]>
    expandedCategories: Record<string, boolean>
    toggleCategory: (key: string) => void
    scoringQIds: Set<string>
    questionMPMap: Record<string, string[]>
    mpMap: Record<string, { nom: string }>
    vulnerabilities: Array<{ id: string; label: string }>
    answeredCount: number
    totalCount: number
    answeredScoringCount: number
    currentScoringCount: number
}

export function QuestionsSidebar({
    activeV, vulnName, answers, setAnswers,
    groupedQuestions, expandedCategories, toggleCategory,
    scoringQIds, questionMPMap, mpMap, vulnerabilities,
    answeredCount, totalCount, answeredScoringCount, currentScoringCount,
}: QuestionsSidebarProps) {
    const title = activeV === 'TRIGGERS'
        ? 'Triggers — Questions de profilage'
        : activeV === 'ALL'
            ? 'Questionnaire — Toutes vulnérabilités'
            : `Questionnaire — ${vulnName || activeV}`

    const subtitle = activeV === 'TRIGGERS'
        ? `${answeredCount}/${totalCount} triggers répondus`
        : `${answeredScoringCount}/${currentScoringCount} scorantes • ${answeredCount}/${totalCount} total`

    return (
        <div className="w-[45%] flex flex-col min-w-0">
            <div className="glass-card flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-5 py-3 border-b border-monka-border flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-monka-heading">{title}</h2>
                        <p className="text-[11px] text-monka-muted mt-0.5">{subtitle}</p>
                    </div>
                    <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-monka-primary rounded-full"
                            animate={{ width: `${totalCount > 0 ? (answeredCount / totalCount) * 100 : 0}%` }}
                        />
                    </div>
                </div>

                {/* Question groups */}
                <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
                    {Object.entries(groupedQuestions).map(([groupKey, questions]) => {
                        if (questions.length === 0) return null
                        return (
                            <QuestionGroup
                                key={groupKey}
                                groupKey={groupKey}
                                questions={questions}
                                answers={answers}
                                setAnswers={setAnswers}
                                isExpanded={expandedCategories[groupKey] !== false}
                                toggleCategory={toggleCategory}
                                scoringQIds={scoringQIds}
                                questionMPMap={questionMPMap}
                                mpMap={mpMap}
                                activeV={activeV}
                                vulnerabilities={vulnerabilities}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

/* ---- Sub-components ---- */

/** Collapsible group of questions (by V or bloc) */
function QuestionGroup({ groupKey, questions, answers, setAnswers, isExpanded, toggleCategory, scoringQIds, questionMPMap, mpMap, activeV, vulnerabilities }: {
    groupKey: string
    questions: DBQuestion[]
    answers: Record<string, string | string[]>
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>
    isExpanded: boolean
    toggleCategory: (key: string) => void
    scoringQIds: Set<string>
    questionMPMap: Record<string, string[]>
    mpMap: Record<string, { nom: string }>
    activeV: VFilter
    vulnerabilities: Array<{ id: string; label: string }>
}) {
    const groupAnswered = questions.filter(q => {
        const a = answers[q.id]
        return Array.isArray(a) ? a.length > 0 : !!a
    }).length
    const isVGroup = groupKey.startsWith('V') && groupKey.length === 2
    const groupColor = isVGroup ? vColorMap[groupKey as VulnerabilityId] : '#58BF94'
    const groupLabel = isVGroup
        ? `${groupKey} — ${vulnerabilities.find(v => v.id === groupKey)?.label || groupKey} (${questions.length})`
        : `${groupKey} (${questions.length})`

    return (
        <div>
            <button onClick={() => toggleCategory(groupKey)} className="flex items-center gap-2 w-full py-2 text-left">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${groupColor}20` }}>
                    <Activity className="w-3.5 h-3.5" style={{ color: groupColor }} />
                </div>
                <span className="text-xs font-bold text-monka-heading uppercase tracking-wider flex-1 truncate">{groupLabel}</span>
                <span className="text-[10px] text-monka-muted mr-1">{groupAnswered}/{questions.length}</span>
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-monka-muted" /> : <ChevronRight className="w-3.5 h-3.5 text-monka-muted" />}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="divide-y divide-monka-border pb-2">
                            {questions.map(q => (
                                <QuestionCard key={q.id} q={q} answers={answers} setAnswers={setAnswers} isScoring={scoringQIds.has(q.id)} qMPs={questionMPMap[q.id] || []} mpMap={mpMap} activeV={activeV} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/** Single question card with badges and answer options */
function QuestionCard({ q, answers, setAnswers, isScoring, qMPs, mpMap, activeV }: {
    q: DBQuestion
    answers: Record<string, string | string[]>
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>
    isScoring: boolean
    qMPs: string[]
    mpMap: Record<string, { nom: string }>
    activeV: VFilter
}) {
    const isAnswered = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]).length > 0 : !!answers[q.id]
    const qVColor = q.vulnerability_id ? vColorMap[q.vulnerability_id as VulnerabilityId] || '#999' : '#999'

    return (
        <div className={`p-3 rounded-xl border transition-all duration-200 ${isAnswered ? 'bg-monka-primary/5 border-monka-primary/20' : 'bg-white/40 border-monka-border/30 hover:border-monka-border'}`}>
            {/* Header badges */}
            <div className="flex items-start gap-2 mb-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5" style={{ backgroundColor: isScoring ? `${qVColor}20` : '#f3f4f6', color: isScoring ? qVColor : '#9ca3af' }}>{q.id}</span>
                {activeV === 'ALL' && q.vulnerability_id && (
                    <span className="text-[9px] font-bold px-1 py-0.5 rounded text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: qVColor }}>{q.vulnerability_id}</span>
                )}
                {q.classification && <span className="text-[9px] px-1 py-0.5 rounded bg-gray-100 text-gray-500 flex-shrink-0 mt-0.5">{q.classification}</span>}
                {isScoring && <span className="text-[9px] px-1 py-0.5 rounded bg-amber-50 text-amber-600 flex-shrink-0 mt-0.5">scorante</span>}
                <p className="text-sm text-monka-text leading-snug">{q.question_text}</p>
            </div>

            {/* MP tags */}
            {qMPs.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                    {qMPs.map(mpId => (
                        <span key={mpId} className="text-[10px] text-monka-muted bg-monka-dark/5 px-1.5 py-0.5 rounded">MP: {mpId} — {mpMap[mpId]?.nom || mpId}</span>
                    ))}
                </div>
            )}

            {/* Response type */}
            {q.response_type && <div className="mb-2"><span className="text-[9px] text-monka-muted italic">{q.response_type}</span></div>}

            {/* Answer options */}
            <div className="flex flex-wrap gap-1.5">
                {(q.response_options || []).map(opt => (
                    <button
                        key={opt}
                        onClick={() => setAnswers(prev => {
                            const next = { ...prev }
                            if (q.response_type === 'choix_multiple') {
                                const current = Array.isArray(next[q.id]) ? (next[q.id] as string[]) : []
                                if (current.includes(opt)) {
                                    const filtered = current.filter(o => o !== opt)
                                    if (filtered.length === 0) delete next[q.id]
                                    else next[q.id] = filtered
                                } else {
                                    next[q.id] = [...current, opt]
                                }
                            } else {
                                if (next[q.id] === opt) delete next[q.id]
                                else next[q.id] = opt
                            }
                            return next
                        })}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150 ${(q.response_type === 'choix_multiple' ? (Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)) : answers[q.id] === opt) ? 'text-white shadow-sm' : 'bg-white/60 text-monka-text/70 hover:bg-white hover:text-monka-text border border-transparent hover:border-monka-border'}`}
                        style={(q.response_type === 'choix_multiple' ? (Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)) : answers[q.id] === opt) ? { backgroundColor: qVColor } : {}}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}
