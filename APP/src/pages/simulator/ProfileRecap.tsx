/* ProfileRecap — Text summary generated from trigger question answers.
   Shows a human-readable profile: age, aidance type, frequency, etc.
   Data-driven from trigger questions + current answers. */

import { useMemo } from 'react'
import { User, Heart } from 'lucide-react'
import type { MonkaData } from '../../clinical/hooks'
import { getTriggerQuestions } from '../../clinical/hooks'

interface ProfileRecapProps {
    data: MonkaData
    answers: Record<string, string | string[]>
}

/** Maps trigger question IDs to profile segments for natural text */
const PROFILE_TEMPLATES: Record<string, (answer: string) => string> = {
    N3: (a) => `**${a}**`,
    N4: (a) => `La durée de l'aide est de **${a.toLowerCase()}**`,
    N5: (a) => `Vous aidez **${a.toLowerCase()}**`,
    N6: (a) => `Le proche est atteint de **${a.toLowerCase()}**`,
    N7: (a) => `La durée de l'aidance est de **${a.toLowerCase()}**`,
    N8: (a) => `Le proche vit **${a.toLowerCase()}**`,
    N9: (a) => `Votre lien avec le proche : **${a.toLowerCase()}**`,
    O35: (a) => `Vous êtes une **${a.toLowerCase()}**`,
    O36: (a) => `Vous avez **${a}**`,
}

export function ProfileRecap({ data, answers }: ProfileRecapProps) {
    const triggerQs = useMemo(() => getTriggerQuestions(data), [data])

    const answeredTriggers = useMemo(() => {
        return triggerQs
            .filter(q => {
                const a = answers[q.id]
                return Array.isArray(a) ? a.length > 0 : !!a
            })
            .map(q => {
                const rawAnswer = answers[q.id]
                const displayAnswer = Array.isArray(rawAnswer) ? rawAnswer.join(', ') : rawAnswer
                return {
                    id: q.id,
                    text: q.question_text,
                    answer: displayAnswer,
                    segment: PROFILE_TEMPLATES[q.id]?.(displayAnswer) || null,
                }
            })
    }, [triggerQs, answers])

    if (answeredTriggers.length === 0) {
        return (
            <div className="glass-card p-4 text-center">
                <User className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-monka-muted">Répondez aux questions triggers pour voir votre profil</p>
            </div>
        )
    }

    const segments = answeredTriggers.filter(t => t.segment).map(t => t.segment!)
    const profileText = segments.join('. ') + '.'

    return (
        <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-monka-heading">Votre profil aidant</h3>
                    <p className="text-[10px] text-monka-muted">{answeredTriggers.length}/{triggerQs.length} triggers renseignés</p>
                </div>
            </div>

            {/* Natural text summary */}
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                <p className="text-xs text-gray-700 leading-relaxed">
                    {profileText.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        const bold = part.match(/^\*\*(.*?)\*\*$/)
                        return bold
                            ? <strong key={i} className="text-emerald-700">{bold[1]}</strong>
                            : <span key={i}>{part}</span>
                    })}
                </p>
            </div>

            {/* Detail table */}
            <div className="space-y-1">
                <span className="text-[10px] font-bold text-monka-muted uppercase tracking-wider">Détail des réponses</span>
                {answeredTriggers.map(t => (
                    <div key={t.id} className="flex items-center gap-2 p-1.5 rounded text-[11px] bg-white/50">
                        <span className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-1 py-0.5 rounded">{t.id}</span>
                        <span className="text-gray-600 flex-1 truncate">{t.text}</span>
                        <span className="font-medium text-monka-heading bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">{t.answer}</span>
                    </div>
                ))}
            </div>

            {/* Missing triggers hint */}
            {answeredTriggers.length < triggerQs.length && (
                <div className="flex items-center gap-1.5 text-[10px] text-amber-600 bg-amber-50 px-2 py-1.5 rounded">
                    <Heart className="w-3 h-3" />
                    {triggerQs.length - answeredTriggers.length} question{triggerQs.length - answeredTriggers.length > 1 ? 's' : ''} trigger{triggerQs.length - answeredTriggers.length > 1 ? 's' : ''} non renseignée{triggerQs.length - answeredTriggers.length > 1 ? 's' : ''}
                </div>
            )}
        </div>
    )
}
