/* MPContextPanel — Expandable content_blocks panel for a MP.
   Shows all 5 block types from DB: sens_clinique, justification_questions,
   justification_categories, justification_acteurs, liens_inter_mp.
   Architecture: < 130L standalone component. */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, Brain, HelpCircle, Layers, Users, Link2 } from 'lucide-react'
import type { DBContentBlock } from '../../engine/dbTypes'

const BLOCK_CONFIG: { type: string; label: string; icon: typeof Brain; color: string }[] = [
    { type: 'sens_clinique', label: 'Sens Clinique', icon: Brain, color: 'text-blue-600' },
    { type: 'justification_questions', label: 'Pourquoi ces questions', icon: HelpCircle, color: 'text-indigo-600' },
    { type: 'justification_categories', label: 'Pourquoi ces catégories', icon: Layers, color: 'text-purple-600' },
    { type: 'justification_acteurs', label: 'Pourquoi ces acteurs', icon: Users, color: 'text-emerald-600' },
    { type: 'liens_inter_mp', label: 'Liens inter-MP', icon: Link2, color: 'text-amber-600' },
]

interface MPContextPanelProps {
    mpId: string
    contentBlocks: DBContentBlock[]
    accentColor: string
}

export function MPContextPanel({ mpId, contentBlocks, accentColor }: MPContextPanelProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedBlock, setExpandedBlock] = useState<string | null>(null)

    const mpBlocks = contentBlocks.filter(
        cb => cb.entity_type === 'micro_parcours' && cb.entity_id === mpId
    )

    if (mpBlocks.length === 0) return null

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 border-dashed transition-all hover:shadow-sm"
                style={{
                    borderColor: accentColor + '40',
                    backgroundColor: isOpen ? accentColor + '08' : 'transparent',
                }}
            >
                <BookOpen className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-[11px] font-bold flex-1 text-left" style={{ color: accentColor }}>
                    Documentation clinique — {mpBlocks.length} blocs
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: accentColor }}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-2 space-y-1.5">
                            {BLOCK_CONFIG.map(cfg => {
                                const block = mpBlocks.find(b => b.block_type === cfg.type)
                                if (!block) return null
                                const Icon = cfg.icon
                                const isExpanded = expandedBlock === cfg.type

                                return (
                                    <div key={cfg.type} className="rounded-lg border border-gray-200/80 overflow-hidden">
                                        <button
                                            onClick={() => setExpandedBlock(isExpanded ? null : cfg.type)}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50/50 transition-colors"
                                        >
                                            <Icon className={`w-3.5 h-3.5 ${cfg.color} flex-shrink-0`} />
                                            <span className="text-[11px] font-bold text-monka-heading flex-1">{cfg.label}</span>
                                            <ChevronDown className={`w-3 h-3 text-monka-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-3 pb-3 border-t border-gray-100">
                                                        <p className="text-[11px] text-gray-700 leading-relaxed mt-2 whitespace-pre-line">
                                                            {block.content}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
