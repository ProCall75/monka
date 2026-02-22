/* PersonasPage — DB-driven, zero hardcode. <250L.
   Personas + answers loaded from Supabase via useMonkaData(). */

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    ChevronDown,
    ChevronRight,
    Zap,
    Heart,
    Shield,
    Brain,
    Wine,
    Layers,
    Stethoscope,
} from 'lucide-react'
import { useMonkaData } from '../clinical/hooks'
import type { DBPersona, DBPersonaAnswer } from '../engine/dbTypes'
import { PersonaCard } from './simulator/PersonaCard'

// ══════════════════════════════════════════════════════
//  Types — UI-facing persona shape (derived from DB)
// ══════════════════════════════════════════════════════

export interface Persona {
    id: string
    name: string
    age: number
    emoji: string
    color: string
    shortDesc: string
    story: string
    profile: {
        situation: string
        activite: string
        lienParente: string
        dureeAidance: string
        proche: string
    }
    traits: string[]
    aidanceTypes: string[]
    ageAide: string
    answers: Record<string, string>
}

// ══════════════════════════════════════════════════════
//  N3 Category UI config (icons/gradients not in DB)
// ══════════════════════════════════════════════════════

interface AidanceCategoryUI {
    id: string
    label: string
    shortLabel: string
    description: string
    icon: typeof Heart
    color: string
    n3Value: string
}

const AIDANCE_CATEGORIES: AidanceCategoryUI[] = [
    { id: 'perte-autonomie', label: 'Perte d\'autonomie / Vieillissement', shortLabel: 'Perte d\'autonomie', description: 'Vieillissement physiologique, maladies neurodégénératives (Alzheimer, Parkinson...)', icon: Heart, color: '#58BF94', n3Value: "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative" },
    { id: 'handicap', label: 'Handicap', shortLabel: 'Handicap', description: 'Handicap moteur, sensoriel, cognitif, polyhandicap — tous âges', icon: Shield, color: '#7748F6', n3Value: "J'aide une personne en situation de handicap" },
    { id: 'maladie-chronique', label: 'Maladie chronique', shortLabel: 'Maladie chronique', description: 'Cancer, diabète, insuffisance cardiaque, BPCO, maladies auto-immunes...', icon: Stethoscope, color: '#E48B65', n3Value: "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)" },
    { id: 'troubles-psy', label: 'Troubles psychiques', shortLabel: 'Troubles psy', description: 'Schizophrénie, bipolarité, dépression sévère, TOC, troubles de la personnalité...', icon: Brain, color: '#E879A8', n3Value: "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)" },
    { id: 'addictions', label: 'Addictions', shortLabel: 'Addictions', description: 'Alcool, drogues, médicaments, addictions comportementales sévères...', icon: Wine, color: '#D4553A', n3Value: "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)" },
]

// ══════════════════════════════════════════════════════
//  Helpers — Convert DB data to UI Persona
// ══════════════════════════════════════════════════════

function dbToPersona(dbP: DBPersona, answersMap: Map<string, Record<string, string>>): Persona {
    return {
        id: dbP.id,
        name: dbP.name,
        age: dbP.age,
        emoji: dbP.emoji,
        color: dbP.color,
        shortDesc: dbP.short_desc,
        story: dbP.story,
        profile: {
            situation: dbP.profile_situation,
            activite: dbP.profile_activite,
            lienParente: dbP.profile_lien_parente,
            dureeAidance: dbP.profile_duree_aidance,
            proche: dbP.profile_proche,
        },
        traits: dbP.traits,
        aidanceTypes: dbP.aidance_types,
        ageAide: dbP.age_aide,
        answers: answersMap.get(dbP.id) || {},
    }
}

function buildAnswersMap(dbAnswers: DBPersonaAnswer[]): Map<string, Record<string, string>> {
    const map = new Map<string, Record<string, string>>()
    for (const a of dbAnswers) {
        if (!map.has(a.persona_id)) map.set(a.persona_id, {})
        map.get(a.persona_id)![a.question_id] = a.answer
    }
    return map
}

function getCategoryLabels(persona: Persona): string[] {
    return persona.aidanceTypes.map(n3 => {
        const cat = AIDANCE_CATEGORIES.find(c => c.n3Value === n3)
        return cat?.shortLabel ?? n3
    })
}

/** Export personas for use in SimulatorPage + PersonaComparison */
export function usePersonas() {
    const { data } = useMonkaData()
    return useMemo(() => {
        if (!data?.loaded) return []
        const answersMap = buildAnswersMap(data.personaAnswers)
        return data.personas.map(p => dbToPersona(p, answersMap))
    }, [data])
}

// ══════════════════════════════════════════════════════
//  Component
// ══════════════════════════════════════════════════════

export default function PersonasPage() {
    const navigate = useNavigate()
    const personas = usePersonas()
    const [expandedCategory, setExpandedCategory] = useState<string | null>('perte-autonomie')
    const [expandedPersona, setExpandedPersona] = useState<string | null>(null)

    const singlePersonas = useMemo(() => personas.filter(p => p.aidanceTypes.length === 1), [personas])
    const comboPersonas = useMemo(() => personas.filter(p => p.aidanceTypes.length > 1), [personas])

    const handleUsePersona = (persona: Persona) => {
        if (Object.keys(persona.answers).length === 0) {
            navigate('/simulator')
            return
        }
        sessionStorage.setItem('monka_persona_answers', JSON.stringify(persona.answers))
        sessionStorage.setItem('monka_persona_id', persona.id)
        navigate('/simulator')
    }

    return (
        <div className="max-w-[1100px] mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <Users className="w-6 h-6 text-monka-primary" />
                    Personas Aidants
                </h1>
                <p className="text-sm text-monka-muted">
                    {personas.length} profils réalistes organisés par type d&apos;aidance (N3) — données issues de la base
                </p>
            </div>

            {/* Categories */}
            <div className="space-y-3">
                {AIDANCE_CATEGORIES.map((cat) => {
                    const catPersonas = singlePersonas.filter(p => p.aidanceTypes[0] === cat.n3Value)
                    const isExpanded = expandedCategory === cat.id
                    const CatIcon = cat.icon

                    return (
                        <motion.div key={cat.id} layout className="rounded-2xl overflow-hidden">
                            <div className="glass-card !rounded-b-none cursor-pointer transition-all hover:brightness-[0.98]" onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}>
                                <div className="flex items-center gap-4 px-5 py-4">
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${cat.color}30, ${cat.color}15)` }}>
                                        <CatIcon className="w-5 h-5" style={{ color: cat.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-base font-bold text-monka-heading">{cat.label}</h2>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white" style={{ backgroundColor: cat.color }}>
                                                {catPersonas.length} persona{catPersonas.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <p className="text-xs text-monka-muted mt-0.5">{cat.description}</p>
                                    </div>
                                    {isExpanded ? <ChevronDown className="w-5 h-5 text-monka-muted flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-monka-muted flex-shrink-0" />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                        <div className="px-5 py-4 bg-white/50 border-t border-monka-border space-y-3">
                                            {catPersonas.length === 0 ? (
                                                <p className="text-sm text-monka-muted italic py-4 text-center">Aucun persona dans cette catégorie pour le moment</p>
                                            ) : (
                                                catPersonas.map(persona => (
                                                    <PersonaCard key={persona.id} persona={persona} isExpanded={expandedPersona === persona.id}
                                                        onToggle={() => setExpandedPersona(expandedPersona === persona.id ? null : persona.id)}
                                                        onSimulate={() => handleUsePersona(persona)} />
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}

                {/* Combos Section */}
                <motion.div layout className="rounded-2xl overflow-hidden">
                    <div className="glass-card !rounded-b-none cursor-pointer transition-all hover:brightness-[0.98]" onClick={() => setExpandedCategory(expandedCategory === 'combos' ? null : 'combos')}>
                        <div className="flex items-center gap-4 px-5 py-4">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F59E0B30, #F59E0B15)' }}>
                                <Layers className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-base font-bold text-monka-heading">Combos — Multi-aidance</h2>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white bg-amber-500">{comboPersonas.length} personas</span>
                                </div>
                                <p className="text-xs text-monka-muted mt-0.5">Personas dont l&apos;aidé cumule plusieurs types d&apos;aidance (N3 multi-choix)</p>
                            </div>
                            {expandedCategory === 'combos' ? <ChevronDown className="w-5 h-5 text-monka-muted flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-monka-muted flex-shrink-0" />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {expandedCategory === 'combos' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                <div className="px-5 py-4 bg-white/50 border-t border-monka-border space-y-3">
                                    {comboPersonas.map(persona => (
                                        <PersonaCard key={persona.id} persona={persona} isExpanded={expandedPersona === persona.id}
                                            onToggle={() => setExpandedPersona(expandedPersona === persona.id ? null : persona.id)}
                                            onSimulate={() => handleUsePersona(persona)}
                                            showComboTags categoryLabels={getCategoryLabels(persona)} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="mt-8 glass-card p-5">
                <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-monka-heading mb-1">Modèle additif : socle 130Q + blocs aidance</h4>
                        <p className="text-xs text-monka-muted leading-relaxed">
                            Chaque persona a un <strong>socle commun de 130 questions</strong> + des blocs conditionnels activés selon le type d&apos;aidance (N3).
                            Cliquez sur <strong>&quot;Simuler&quot;</strong> pour charger les réponses dans le moteur clinique.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
