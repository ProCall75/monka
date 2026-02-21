/* =============================================
   SimulatorRulesTab — Activation Rules Display
   
   Shows triggered vs untriggered rules with condition
   evaluation details. Extracted from SimulatorPage.
   ============================================= */

import { ChevronDown } from 'lucide-react'
import {
    evaluateRule, VULN_COLORS,
    buildMPMap, buildMPVulnMap,
    type VulnerabilityId,
} from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'
import { ClinicalChain } from './ClinicalChain'
import { useMemo } from 'react'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

/**
 * SimulatorRulesTab — Displays all activation rules with their
 * trigger status and condition evaluation details.
 */
export function SimulatorRulesTab({ data, activeV, answers }: SimulatorTabProps) {
    // Defensive guard — empty data fallback
    if (!data.activationRules?.length) {
        return <div className="text-center text-monka-muted py-12 text-sm">Aucune règle d&apos;activation disponible.</div>
    }

    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])
    const mpMap = useMemo(() => buildMPMap(data), [data])

    const allRules = data.activationRules
        .filter(r => activeV === 'ALL' || mpVulnMap[r.mp_id] === activeV)
    const triggeredRules = allRules.filter(r => evaluateRule(r, answers))
    const untriggeredRules = allRules.filter(r => !evaluateRule(r, answers))

    return (
        <div>
            {/* Triggered rules */}
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <h3 className="text-sm font-bold text-monka-heading">
                    Règles déclenchées ({triggeredRules.length})
                </h3>
                <span className="text-[10px] text-monka-muted">/ {allRules.length} total</span>
            </div>

            {triggeredRules.length === 0 ? (
                <div className="rounded-xl border border-dashed border-monka-border p-6 text-center mb-4">
                    <p className="text-sm text-monka-muted">Aucune règle déclenchée — répondez aux questions</p>
                </div>
            ) : (
                <div className="divide-y divide-monka-border rounded-xl border border-green-200 overflow-hidden mb-4">
                    {triggeredRules.map(r => (
                        <RuleRow key={r.id} rule={r} isTriggered answers={answers} mpVulnMap={mpVulnMap} mpMap={mpMap} data={data} />
                    ))}
                </div>
            )}

            {/* Untriggered rules — collapsible */}
            {untriggeredRules.length > 0 && (
                <details className="group">
                    <summary className="flex items-center gap-2 cursor-pointer select-none mb-3 text-monka-muted hover:text-monka-text transition-colors">
                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                        <span className="text-xs font-bold">
                            Non déclenchées ({untriggeredRules.length})
                        </span>
                    </summary>
                    <div className="divide-y divide-monka-border rounded-xl border border-monka-border overflow-hidden">
                        {untriggeredRules.map(r => (
                            <RuleRow key={r.id} rule={r} isTriggered={false} answers={answers} mpVulnMap={mpVulnMap} mpMap={mpMap} data={data} />
                        ))}
                    </div>
                </details>
            )}
        </div>
    )
}

/** Internal rule display component */
function RuleRow({
    rule,
    isTriggered,
    answers,
    mpVulnMap,
    mpMap,
}: {
    rule: { id: string; mp_id: string; category_id: string; niveau: string; sens_clinique?: string | null; condition_logic: unknown }
    isTriggered: boolean
    answers: Record<string, string>
    mpVulnMap: Record<string, string>
    mpMap: Record<string, { nom: string }>
    data: MonkaData
}) {
    const ruleVuln = mpVulnMap[rule.mp_id] || ''
    const ruleColor = vColorMap[ruleVuln as VulnerabilityId] || '#999'
    const conditions = (rule.condition_logic || []) as Array<Record<string, unknown>>

    return (
        <div className={`px-4 py-3 text-xs transition-all ${isTriggered ? 'bg-green-50/60' : 'bg-white/30'}`}>
            <div className="flex items-center gap-2 mb-1.5">
                <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: ruleColor }}>{ruleVuln}</span>
                <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px] bg-gray-600">{rule.mp_id}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${rule.niveau === 'critique' ? 'bg-red-100 text-red-600' :
                    rule.niveau === 'ccc' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                    }`}>{rule.niveau}</span>
                {isTriggered && <span className="text-[9px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded font-bold ml-auto">✓ DÉCLENCHÉ</span>}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
                {conditions.map((cond, i) => {
                    const q = String(cond.q || '')
                    const op = String(cond.op || '')
                    const val = cond.vals ? JSON.stringify(cond.vals) : String(cond.val ?? cond.min ?? '')
                    const answered = !!answers[q]
                    const userAnswer = answers[q]
                    const answerDisplay = userAnswer ? (Array.isArray(userAnswer) ? userAnswer.join(', ') : String(userAnswer)) : ''
                    const condMet = isTriggered && answered
                    return (
                        <span key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${condMet ? 'bg-green-100 text-green-700' : answered ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                            {q} {op} {val} {answered ? `(répondu: "${answerDisplay}")` : '(non répondu)'} {condMet ? '✓' : answered ? '✗' : '○'}
                        </span>
                    )
                })}
            </div>
            {/* Sens clinique — clinical reasoning explanation */}
            {rule.sens_clinique && (
                <div className={`mt-2 px-3 py-2 rounded-lg border-l-2 ${isTriggered ? 'bg-emerald-50/80 border-emerald-400' : 'bg-gray-50/80 border-gray-300'}`}>
                    <p className={`text-[10px] leading-relaxed italic ${isTriggered ? 'text-emerald-700' : 'text-gray-500'}`}>
                        <span className="not-italic mr-1">🧠</span>
                        {rule.sens_clinique}
                    </p>
                </div>
            )}
            {isTriggered && (
                <ClinicalChain rule={rule} data={data} answers={answers} color={ruleColor} />
            )}
        </div>
    )
}
