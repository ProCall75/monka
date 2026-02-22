/* =============================================
   SimulatorRulesTab — Activation Rules in French
   
   V2-04: Rules grouped by category, then by niveau.
   All conditions displayed in French via RuleExplainerFR.
   Shows live trigger status with persona answers.
   ============================================= */

import { useMemo, useState } from 'react'
import { ChevronDown, Layers } from 'lucide-react'
import {
    evaluateRule, VULN_COLORS,
    buildMPMap, buildMPVulnMap,
    type VulnerabilityId, type MonkaData,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'
import { ClinicalChain } from './ClinicalChain'
import { RuleExplainerFR } from '../../components/clinical/RuleExplainerFR'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>
type NiveauGroup = 'critique' | 'ccc' | 'standard'

const NIVEAU_ORDER: NiveauGroup[] = ['critique', 'ccc', 'standard']
const NIVEAU_LABELS: Record<NiveauGroup, { label: string; color: string }> = {
    critique: { label: '🔴 Critique', color: '#EF4444' },
    ccc: { label: '🟠 CCC — Combinaisons', color: '#F59E0B' },
    standard: { label: '🟢 Standard', color: '#22C55E' },
}

export function SimulatorRulesTab({ data, activeV, answers }: SimulatorTabProps) {
    if (!data.activationRules?.length) {
        return <div className="text-center text-monka-muted py-12 text-sm">Aucune règle d&apos;activation disponible.</div>
    }

    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])
    const mpMap = useMemo(() => buildMPMap(data), [data])

    const allRules = useMemo(() =>
        data.activationRules.filter(r => activeV === 'ALL' || mpVulnMap[r.mp_id] === activeV),
        [data.activationRules, activeV, mpVulnMap],
    )

    const triggeredSet = useMemo(() =>
        new Set(allRules.filter(r => evaluateRule(r, answers)).map(r => r.id)),
        [allRules, answers],
    )

    // Group rules by category, then by niveau
    const groupedByCategory = useMemo(() => {
        const catMap = new Map<string, { nom: string; vuln: string; rules: Map<NiveauGroup, typeof allRules> }>()
        for (const rule of allRules) {
            const catId = rule.category_id
            if (!catMap.has(catId)) {
                const cat = data.categories.find(c => c.id === catId)
                catMap.set(catId, {
                    nom: cat?.nom || catId,
                    vuln: mpVulnMap[rule.mp_id] || '',
                    rules: new Map(),
                })
            }
            const entry = catMap.get(catId)!
            const niveau = (rule.niveau === 'critique' ? 'critique' : rule.niveau === 'ccc' ? 'ccc' : 'standard') as NiveauGroup
            if (!entry.rules.has(niveau)) entry.rules.set(niveau, [])
            entry.rules.get(niveau)!.push(rule)
        }
        return catMap
    }, [allRules, data.categories, mpVulnMap])

    const triggeredCount = triggeredSet.size
    const totalCount = allRules.length

    return (
        <div>
            {/* Summary bar */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${triggeredCount > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <h3 className="text-sm font-bold text-monka-heading">
                    {triggeredCount} règles déclenchées
                </h3>
                <span className="text-[10px] text-monka-muted">/ {totalCount} total — {groupedByCategory.size} catégories</span>
            </div>

            {/* Category groups */}
            <div className="space-y-4">
                {[...groupedByCategory.entries()].map(([catId, cat]) => {
                    const catTriggered = [...(cat.rules.values())].flat().filter(r => triggeredSet.has(r.id)).length
                    const catTotal = [...(cat.rules.values())].flat().length
                    const catColor = vColorMap[cat.vuln as VulnerabilityId] || '#999'

                    return (
                        <CategoryGroup key={catId}
                            catId={catId} catNom={cat.nom} catColor={catColor} catVuln={cat.vuln}
                            catTriggered={catTriggered} catTotal={catTotal}
                            rulesByNiveau={cat.rules} triggeredSet={triggeredSet}
                            data={data} answers={answers} mpMap={mpMap}
                        />
                    )
                })}
            </div>
        </div>
    )
}

// ── Category Group ─────────────────────────────────────

interface CategoryGroupProps {
    catId: string
    catNom: string
    catColor: string
    catVuln: string
    catTriggered: number
    catTotal: number
    rulesByNiveau: Map<NiveauGroup, MonkaData['activationRules']>
    triggeredSet: Set<string>
    data: MonkaData
    answers: Record<string, string>
    mpMap: Record<string, { nom: string }>
}

function CategoryGroup({
    catId, catNom, catColor, catVuln,
    catTriggered, catTotal, rulesByNiveau,
    triggeredSet, data, answers,
}: CategoryGroupProps) {
    const [isOpen, setIsOpen] = useState(catTriggered > 0)
    const hasTriggered = catTriggered > 0

    return (
        <div className={`rounded-xl border overflow-hidden transition-all ${hasTriggered ? 'border-green-200 shadow-sm' : 'border-monka-border'
            }`}>
            {/* Category header — clickable */}
            <button onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 flex items-center gap-2 text-left hover:bg-gray-50/50 transition-colors">
                <Layers className="w-4 h-4 flex-shrink-0" style={{ color: catColor }} />
                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: catColor }}>{catVuln}</span>
                <span className="text-[10px] font-mono text-monka-muted">{catId}</span>
                <span className="text-xs font-bold text-monka-heading flex-1 truncate">{catNom}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hasTriggered ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>{catTriggered}/{catTotal}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-monka-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Expanded content — rules by niveau */}
            {isOpen && (
                <div className="px-4 pb-3 space-y-3">
                    {NIVEAU_ORDER.map(niveau => {
                        const rules = rulesByNiveau.get(niveau)
                        if (!rules?.length) return null
                        const nLabel = NIVEAU_LABELS[niveau]
                        const nTriggered = rules.filter(r => triggeredSet.has(r.id)).length

                        return (
                            <div key={niveau}>
                                <div className="flex items-center gap-2 mb-2 pt-2 border-t border-monka-border/30">
                                    <span className="text-[10px] font-bold">{nLabel.label}</span>
                                    <span className="text-[10px] text-monka-muted">({nTriggered}/{rules.length} déclenchées)</span>
                                </div>
                                <div className="space-y-2">
                                    {rules.map(rule => {
                                        const isTriggered = triggeredSet.has(rule.id)
                                        return (
                                            <div key={rule.id}>
                                                <RuleExplainerFR
                                                    rule={rule}
                                                    data={data}
                                                    answers={answers}
                                                    isTriggered={isTriggered}
                                                />
                                                {isTriggered && (
                                                    <ClinicalChain
                                                        rule={rule}
                                                        data={data}
                                                        answers={answers}
                                                        color={nLabel.color}
                                                    />
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
