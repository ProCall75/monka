/* PersonaCard — Extracted from PersonasPage. <170L. */

import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronDown, ChevronRight } from 'lucide-react'
import type { Persona } from '../PersonasPage'

export function PersonaCard({
    persona,
    isExpanded,
    onToggle,
    onSimulate,
    showComboTags = false,
    categoryLabels = [],
}: {
    persona: Persona
    isExpanded: boolean
    onToggle: () => void
    onSimulate: () => void
    showComboTags?: boolean
    categoryLabels?: string[]
}) {
    const answersCount = Object.keys(persona.answers).length
    const hasAnswers = answersCount > 0

    return (
        <motion.div
            className="rounded-xl overflow-hidden border transition-all"
            style={{ borderColor: isExpanded ? persona.color : 'transparent' }}
            layout
        >
            {/* Card Header */}
            <div
                className="bg-white/80 cursor-pointer hover:bg-white/90 transition-colors"
                onClick={onToggle}
            >
                <div className="flex items-center gap-3 px-5 py-4">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${persona.color}25, ${persona.color}10)` }}
                    >
                        {persona.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-bold text-monka-heading">
                                {persona.name}, {persona.age} ans
                            </h3>
                            <span
                                className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                                style={{ backgroundColor: persona.color }}
                            >
                                {persona.id}
                            </span>
                            {hasAnswers ? (
                                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                                    {answersCount}Q
                                </span>
                            ) : (
                                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-orange-100 text-orange-600">
                                    Réponses à créer
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-monka-muted">{persona.shortDesc}</p>

                        {/* Combo Tags */}
                        {showComboTags && categoryLabels.length > 1 && (
                            <div className="flex gap-1.5 mt-1.5">
                                {categoryLabels.map((label) => (
                                    <span
                                        key={label}
                                        className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-monka-muted bg-gray-100 px-2 py-1 rounded-lg font-medium">
                            {persona.ageAide}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onSimulate()
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
                            style={{ backgroundColor: persona.color }}
                            title={hasAnswers ? `Charger ${answersCount} réponses dans le simulateur` : 'Aller au simulateur vide'}
                        >
                            <Play className="w-3 h-3" />
                            Simuler
                        </button>
                        {isExpanded
                            ? <ChevronDown className="w-4 h-4 text-monka-muted" />
                            : <ChevronRight className="w-4 h-4 text-monka-muted" />
                        }
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 py-4 bg-white/60 border-t border-monka-border">
                            {/* Story */}
                            <p
                                className="text-sm text-monka-text mb-4 leading-relaxed italic border-l-3 pl-4"
                                style={{ borderColor: persona.color }}
                            >
                                {persona.story}
                            </p>

                            {/* Profile info */}
                            <div className="grid grid-cols-5 gap-2.5 mb-4">
                                {Object.entries(persona.profile).map(([key, value]) => {
                                    const labels: Record<string, string> = {
                                        situation: 'Situation d\'aide',
                                        activite: 'Activité',
                                        lienParente: 'Lien parental',
                                        dureeAidance: 'Depuis',
                                        proche: 'Lieu de vie du proche',
                                    }
                                    return (
                                        <div key={key} className="p-2.5 rounded-lg bg-white border border-monka-border">
                                            <p className="text-[9px] text-monka-muted uppercase tracking-wider mb-0.5">{labels[key] || key}</p>
                                            <p className="text-[11px] font-bold text-monka-heading">{value}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Traits */}
                            <div>
                                <p className="text-[9px] font-bold text-monka-muted uppercase tracking-wider mb-1.5">Caractéristiques clés</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {persona.traits.map((trait) => (
                                        <span
                                            key={trait}
                                            className="text-[11px] px-2.5 py-1 rounded-lg border font-medium"
                                            style={{
                                                backgroundColor: `${persona.color}10`,
                                                borderColor: `${persona.color}30`,
                                                color: persona.color,
                                            }}
                                        >
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
