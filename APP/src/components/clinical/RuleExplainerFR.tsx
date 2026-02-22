/* RuleExplainerFR — Shared component for displaying activation rules in French.
   Used by SimulatorRulesTab (with answers context) and MPDrilldown (data reference).
   Architecture: component < 250L, no engine import — uses hooks barrel only. */

import { useMemo, useState } from 'react'
import { Brain } from 'lucide-react'
import { getQuestionText, type MonkaData } from '../../clinical/hooks'

// ── Types ──────────────────────────────────────────────

interface Condition {
    q: string
    op: string
    val?: string
    vals?: string[]
    min?: number
}

interface RuleExplainerProps {
    rule: MonkaData['activationRules'][0]
    data: MonkaData
    /** If provided, shows live answer status (simulator mode). Omit for data reference mode. */
    answers?: Record<string, string>
    /** Whether this rule is currently triggered */
    isTriggered?: boolean
}

// ── Operator translations ──────────────────────────────

function translateOp(op: string, val: string): string {
    switch (op) {
        case 'in': return `répondu ${val}`
        case 'eq': return `= ${val}`
        case 'gte': return `≥ ${val}`
        case 'gt': return `> ${val}`
        case 'lte': return `≤ ${val}`
        case 'lt': return `< ${val}`
        case 'contains': return `contient ${val}`
        case 'not_in': return `pas dans ${val}`
        case 'neq': return `≠ ${val}`
        default: return `${op} ${val}`
    }
}

// ── Main Component ─────────────────────────────────────

export function RuleExplainerFR({ rule, data, answers, isTriggered }: RuleExplainerProps) {
    const conditions = rule.condition_logic as unknown as Condition[]
    const hasAnswers = !!answers
    const isCCC = rule.niveau === 'ccc'
    const [showSens, setShowSens] = useState(false)

    const parsedConditions = useMemo(() => {
        if (!Array.isArray(conditions)) return []
        return conditions.map(c => {
            const questionText = getQuestionText(data, c.q)
            const valDisplay = c.vals ? c.vals.join(' ou ') : String(c.val ?? c.min ?? '')
            const opFR = translateOp(c.op, valDisplay)
            const userAnswer = answers?.[c.q]
            const answered = !!userAnswer
            const answerStr = userAnswer
                ? (Array.isArray(userAnswer) ? userAnswer.join(', ') : String(userAnswer))
                : null
            return { q: c.q, questionText, opFR, valDisplay, answered, answerStr, condMet: isTriggered && answered }
        })
    }, [conditions, data, answers, isTriggered])

    return (
        <div className={`p-3 rounded-xl border transition-all ${isTriggered ? 'border-green-200 bg-green-50/60' : 'border-monka-border bg-white/50'
            }`}>
            {/* Header: niveau + status */}
            <div className="flex items-center gap-2 mb-2">
                <NiveauBadge niveau={rule.niveau} />
                {rule.delai_jours !== undefined && rule.delai_jours !== null && (
                    <span className="text-[10px] text-monka-muted">{rule.delai_jours}j</span>
                )}
                {isTriggered && (
                    <span className="text-[9px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded ml-auto">✓ DÉCLENCHÉ</span>
                )}
                {hasAnswers && !isTriggered && (
                    <span className="text-[9px] text-monka-muted ml-auto">non déclenché</span>
                )}
            </div>

            {/* CCC intro — multi-signal explanation */}
            {isCCC && parsedConditions.length > 1 && (
                <p className="text-[11px] text-amber-700 font-medium mb-2">
                    ⚡ Combinaison de {parsedConditions.length} signaux — individuellement modérés, cliniquement significatifs ensemble :
                </p>
            )}

            {/* Conditions in French */}
            <div className="space-y-1.5">
                {parsedConditions.map((c, i) => (
                    <div key={i}>
                        {/* AND/OR connector between conditions */}
                        {i > 0 && (
                            <div className="flex items-center gap-2 my-1 pl-3">
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${isCCC ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                    }`}>{isCCC ? 'ET' : 'ET'}</span>
                                <div className="flex-1 h-px bg-monka-border" />
                            </div>
                        )}
                        <div className={`text-[11px] pl-3 border-l-2 rounded-r-lg py-1 pr-2 ${c.condMet ? 'border-green-400 bg-green-50/50'
                                : c.answered ? 'border-orange-300 bg-orange-50/30'
                                    : 'border-monka-primary/20 bg-white/30'
                            }`}>
                            <div className="flex items-start gap-1">
                                {isCCC && <span className="text-amber-500 flex-shrink-0">Signal {i + 1} :</span>}
                                <span className="text-monka-text">
                                    <span className="font-medium">« {c.questionText} »</span>
                                    <span className="text-monka-muted ml-1">{c.opFR}</span>
                                </span>
                            </div>
                            {/* Live answer status (simulator mode only) */}
                            {hasAnswers && (
                                <div className="mt-0.5 text-[10px]">
                                    {c.answered ? (
                                        <span className={c.condMet ? 'text-green-600' : 'text-orange-600'}>
                                            Répondu : « {c.answerStr} » {c.condMet ? '✓' : '✗'}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">○ Non répondu</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sens clinique — DB-driven (activation_rules.sens_clinique) */}
            {rule.sens_clinique && (
                <div className="mt-2.5">
                    <button
                        onClick={() => setShowSens(prev => !prev)}
                        className={`flex items-center gap-1.5 text-[11px] font-semibold transition-all px-3 py-1.5 rounded-lg border ${
                            showSens
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
                                : 'bg-gray-50 text-gray-600 border-gray-200 border-dashed hover:bg-indigo-50/50 hover:text-indigo-600 hover:border-indigo-200'
                        }`}
                    >
                        <Brain className="w-3.5 h-3.5" />
                        🧠 Sens clinique
                        <span className="text-[9px] opacity-60">{showSens ? '▲' : '▼'}</span>
                    </button>
                    {showSens && (
                        <div className={`mt-2 px-3.5 py-2.5 rounded-lg border-l-3 ${
                            isTriggered ? 'bg-emerald-50 border-emerald-400' : 'bg-indigo-50/60 border-indigo-300'
                        }`} style={{ borderLeftWidth: '3px' }}>
                            <p className={`text-[11px] leading-relaxed ${isTriggered ? 'text-emerald-800' : 'text-indigo-900/80'}`}>
                                {rule.sens_clinique}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

// ── NiveauBadge (shared) ───────────────────────────────

function NiveauBadge({ niveau }: { niveau: string }) {
    const cls = niveau === 'critique' ? 'bg-red-100 text-red-600'
        : niveau === 'ccc' ? 'bg-amber-100 text-amber-600'
            : niveau === 'prevention' ? 'bg-purple-100 text-purple-600'
                : 'bg-blue-100 text-blue-600'
    return <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${cls}`}>{niveau}</span>
}
