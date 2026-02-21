/* ClinicalChain — Traceable clinical path visualization
   Shows the full chain: Question → Rule → Category → Recommendation → MT
   Integrated under triggered rules in SimulatorRulesTab. */

import { ArrowDown } from 'lucide-react'
import type { MonkaData } from '../../clinical/hooks'

interface ClinicalChainProps {
    rule: { id: string; mp_id: string; category_id: string; niveau: string; sens_clinique?: string | null; condition_logic: unknown }
    data: MonkaData
    answers: Record<string, string>
    color: string
}

export function ClinicalChain({ rule, data, answers, color }: ClinicalChainProps) {
    // 1. Questions that triggered this rule
    const conditions = (Array.isArray(rule.condition_logic) ? rule.condition_logic : []) as Array<{ q?: string }>
    const questionIds = conditions.map(c => c.q).filter(Boolean) as string[]
    const triggeredQuestions = questionIds
        .map(qId => {
            const q = data.questions.find(qu => qu.id === qId)
            return q ? { id: qId, text: q.question_text, answer: answers[qId] } : null
        })
        .filter(Boolean) as Array<{ id: string; text: string; answer: string }>

    // 2. Category
    const category = data.categories.find(c => c.id === rule.category_id)

    // 3. Recommendations for this category
    const recos = data.recommendations.filter(r => r.category_id === rule.category_id)

    // 4. Micro-tâches for this category
    const mts = data.microTaches.filter(mt => mt.category_id === rule.category_id)

    // 5. Content block tooltip (if available)
    const contentBlock = data.contentBlocks.find(
        cb => cb.entity_type === 'rule' && cb.entity_id === rule.id
    )

    if (triggeredQuestions.length === 0 && recos.length === 0) return null

    return (
        <div className="mt-2 ml-4 pl-3 border-l-2 text-[10px] space-y-1" style={{ borderColor: `${color}40` }}>
            {/* Questions */}
            {triggeredQuestions.map(q => (
                <ChainStep key={q.id} color={color} icon="❓" label={q.id} detail={`"${q.text.length > 50 ? q.text.slice(0, 47) + '…' : q.text}" → ${q.answer}`} />
            ))}

            {/* Rule sens clinique */}
            {rule.sens_clinique && <ChainArrow />}
            {rule.sens_clinique && (
                <ChainStep color={color} icon="🧠" label={rule.id} detail={rule.sens_clinique} />
            )}

            {/* Category */}
            {category && <ChainArrow />}
            {category && (
                <ChainStep color={color} icon="📂" label={category.id} detail={category.nom} />
            )}

            {/* Content block hint */}
            {contentBlock && (
                <div className="text-[9px] text-monka-muted italic pl-5">{contentBlock.content?.slice(0, 80)}…</div>
            )}

            {/* Recommendations */}
            {recos.length > 0 && <ChainArrow />}
            {recos.map(reco => (
                <ChainStep key={reco.id} color={color} icon="💊" label={reco.id} detail={reco.wording_utilisateur.length > 60 ? reco.wording_utilisateur.slice(0, 57) + '…' : reco.wording_utilisateur} />
            ))}

            {/* Micro-tâches */}
            {mts.length > 0 && <ChainArrow />}
            <div className="flex flex-wrap gap-1">
                {mts.slice(0, 5).map(mt => (
                    <span key={mt.id} className="px-1.5 py-0.5 rounded bg-gray-100 text-monka-muted font-mono">
                        {mt.id} — {mt.libelle.length > 30 ? mt.libelle.slice(0, 27) + '…' : mt.libelle}
                    </span>
                ))}
                {mts.length > 5 && <span className="text-monka-muted">+{mts.length - 5} MT</span>}
            </div>
        </div>
    )
}

function ChainStep({ color, icon, label, detail }: { color: string; icon: string; label: string; detail: string }) {
    return (
        <div className="flex items-start gap-1.5">
            <span>{icon}</span>
            <span className="font-mono font-bold" style={{ color }}>{label}</span>
            <span className="text-monka-muted">{detail}</span>
        </div>
    )
}

function ChainArrow() {
    return (
        <div className="flex items-center gap-1 pl-1 text-monka-muted">
            <ArrowDown className="w-3 h-3" />
        </div>
    )
}
