import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Play,
    ChevronDown,
    ChevronRight,
    Zap,
    Heart,
    Shield,
    Sparkles,
    Brain,
    Wine,
    Stethoscope,
    Layers,
} from 'lucide-react'
import { PERSONA_ANSWERS } from '../data/personaAnswers'

// ══════════════════════════════════════════════════════
//  Types
// ══════════════════════════════════════════════════════

interface Persona {
    id: string
    name: string
    age: number
    emoji: string
    color: string
    icon: typeof Heart
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
    /** N3 values (single or multi) — determines category placement */
    aidanceTypes: string[]
    /** Age bracket of the aidé (O1) */
    ageAide: string
    /** Pre-filled answers — empty until clinically rebuilt */
    answers: Record<string, string>
}

interface AidanceCategory {
    id: string
    label: string
    shortLabel: string
    description: string
    icon: typeof Heart
    color: string
    gradient: string
    n3Value: string
}

// ══════════════════════════════════════════════════════
//  N3 Aidance Categories
// ══════════════════════════════════════════════════════

const AIDANCE_CATEGORIES: AidanceCategory[] = [
    {
        id: 'perte-autonomie',
        label: 'Perte d\'autonomie / Vieillissement',
        shortLabel: 'Perte d\'autonomie',
        description: 'Vieillissement physiologique, maladies neurodégénératives (Alzheimer, Parkinson...)',
        icon: Heart,
        color: '#58BF94',
        gradient: 'from-emerald-400 to-emerald-600',
        n3Value: "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative",
    },
    {
        id: 'handicap',
        label: 'Handicap',
        shortLabel: 'Handicap',
        description: 'Handicap moteur, sensoriel, cognitif, polyhandicap — tous âges',
        icon: Shield,
        color: '#7748F6',
        gradient: 'from-violet-400 to-violet-600',
        n3Value: "J'aide une personne en situation de handicap",
    },
    {
        id: 'maladie-chronique',
        label: 'Maladie chronique',
        shortLabel: 'Maladie chronique',
        description: 'Cancer, diabète, insuffisance cardiaque, BPCO, maladies auto-immunes...',
        icon: Stethoscope,
        color: '#E48B65',
        gradient: 'from-orange-400 to-orange-600',
        n3Value: "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)",
    },
    {
        id: 'troubles-psy',
        label: 'Troubles psychiques',
        shortLabel: 'Troubles psy',
        description: 'Schizophrénie, bipolarité, dépression sévère, TOC, troubles de la personnalité...',
        icon: Brain,
        color: '#E879A8',
        gradient: 'from-pink-400 to-pink-600',
        n3Value: "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
    },
    {
        id: 'addictions',
        label: 'Addictions',
        shortLabel: 'Addictions',
        description: 'Alcool, drogues, médicaments, addictions comportementales sévères...',
        icon: Wine,
        color: '#D4553A',
        gradient: 'from-red-500 to-red-700',
        n3Value: "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)",
    },
]

// ══════════════════════════════════════════════════════
//  Persona Definitions (answers emptied — to rebuild)
// ══════════════════════════════════════════════════════

// ── N3①  Perte d'autonomie ──

const personas: Persona[] = [
    {
        id: 'P1',
        name: 'Marie Duval',
        age: 58,
        emoji: '👩‍💼',
        color: '#58BF94',
        icon: Heart,
        shortDesc: 'Cadre active, aide sa mère atteinte d\'Alzheimer depuis 3 ans',
        story: 'Marie a 58 ans, elle est cadre administrative à Lyon. Depuis 3 ans, elle aide sa mère Suzanne, 82 ans, atteinte d\'Alzheimer précoce, qui vit seule à 20 minutes de chez elle. Marie passe la voir plusieurs fois par semaine, gère les courses, les rendez-vous médicaux et l\'administratif. Son frère vit à Bordeaux et aide financièrement mais n\'est pas présent au quotidien. Marie a dû aménager ses horaires de travail. Elle commence à ressentir de la fatigue et des tensions avec son conjoint, qui trouve qu\'elle en fait trop.',
        profile: {
            situation: 'Aide sa mère de 82 ans (Alzheimer)',
            activite: 'Cadre administrative en activité',
            lienParente: 'Fille (mère → fille)',
            dureeAidance: '3 ans',
            proche: 'Vit seule à domicile, Lyon 7e',
        },
        traits: ['Fatigue croissante', 'Tensions conjugales', 'Concilie travail et aide', 'Réseau familial limité', 'Besoin info droits', 'Diagnostic clair'],
        aidanceTypes: ["J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative"],
        ageAide: '+75 ans',
        answers: PERSONA_ANSWERS['P1'] || {},
    },

    // ── N3②  Handicap ──

    {
        id: 'P3',
        name: 'Camille Lefèvre',
        age: 34,
        emoji: '👩‍👦',
        color: '#7748F6',
        icon: Sparkles,
        shortDesc: 'Jeune mère, aide son fils de 8 ans autiste — perdue dans l\'administratif',
        story: 'Camille a 34 ans, graphiste freelance à Paris. Son fils Théo, 8 ans, a été diagnostiqué autiste il y a 18 mois, après 2 ans d\'errance diagnostique. Elle jongle entre son travail, les rendez-vous CMP, les séances d\'orthophonie et les dossiers MDPH. Son conjoint Antoine travaille en horaires décalés et est présent mais débordé. Camille ne sait pas quels droits elle a, ne comprend pas les acronymes (AEEH, PCH, SESSAD) et se sent seule face à un système qu\'elle trouve opaque.',
        profile: {
            situation: 'Aide son fils de 8 ans (autisme)',
            activite: 'Graphiste freelance',
            lienParente: 'Mère',
            dureeAidance: '18 mois',
            proche: 'Vit avec elle, Paris 11e',
        },
        traits: ['Nouvelle aidante', 'Errance diagnostique', 'Perdue dans l\'admin', 'Conjoint présent', 'Charge mentale élevée', 'Handicap invisible'],
        aidanceTypes: ["J'aide une personne en situation de handicap"],
        ageAide: '- 15 ans',
        answers: PERSONA_ANSWERS['P3'] || {},
    },

    // ── N3③  Maladie chronique ──

    {
        id: 'P2',
        name: 'Jean-Pierre Moreau',
        age: 71,
        emoji: '👴',
        color: '#E48B65',
        icon: Shield,
        shortDesc: 'Retraité, aide son épouse atteinte d\'un cancer — épuisé et isolé',
        story: 'Jean-Pierre a 71 ans, ancien contremaître, retraité depuis 6 ans. Son épouse Françoise, 69 ans, a été diagnostiquée d\'un cancer du sein métastatique il y a 3 ans. Depuis, il est son aidant à temps plein : toilette, repas, accompagnement aux chimiothérapies à l\'hôpital de Marseille. Il ne dort plus que 5h par nuit, a perdu 8 kg en un an et ne sort quasi plus. Ses fils vivent loin. Il refuse de se plaindre et repousse les propositions d\'aide de ses voisins.',
        profile: {
            situation: 'Aide son épouse de 69 ans (cancer)',
            activite: 'Retraité',
            lienParente: 'Conjoint',
            dureeAidance: '3 ans',
            proche: 'Vit à domicile avec lui, Marseille',
        },
        traits: ['Épuisement sévère', 'Isolé socialement', 'Refuse l\'aide', 'Néglige sa santé', 'Parcours médical lourd', 'Multi-hospitalisations'],
        aidanceTypes: ["J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)"],
        ageAide: '60-75 ans',
        answers: PERSONA_ANSWERS['P2'] || {},
    },

    // ── N3④  Troubles psychiques ── (NOUVEAU)

    {
        id: 'P4',
        name: 'Sophie Marchand',
        age: 45,
        emoji: '👩‍🏫',
        color: '#E879A8',
        icon: Brain,
        shortDesc: 'Enseignante, aide son frère schizophrène — entre culpabilité et impuissance',
        story: 'Sophie a 45 ans, professeure d\'histoire-géo dans un collège à Nantes. Son frère Julien, 42 ans, est diagnostiqué schizophrène depuis l\'âge de 22 ans. Après plusieurs hospitalisations et ruptures de suivi, il vit seul dans un appartement thérapeutique. Sophie gère ses rendez-vous psychiatriques, ses courses, et surveille la prise de traitement. Elle est la seule de la famille à maintenir le lien — leurs parents sont décédés. Elle culpabilise de ne pas en faire assez tout en sentant qu\'elle atteint ses limites.',
        profile: {
            situation: 'Aide son frère de 42 ans (schizophrénie)',
            activite: 'Enseignante (collège)',
            lienParente: 'Sœur',
            dureeAidance: '20 ans (intermittent)',
            proche: 'Vit seul en appartement thérapeutique, Nantes',
        },
        traits: ['Aidance de longue durée', 'Culpabilité chronique', 'Seule référente familiale', 'Ruptures de suivi', 'Gestion crises psychotiques', 'Tabou familial'],
        aidanceTypes: ["J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)"],
        ageAide: '20-60 ans',
        answers: PERSONA_ANSWERS['P4'] || {},
    },

    // ── N3⑤  Addictions ── (NOUVEAU)

    {
        id: 'P5',
        name: 'Patrick Renard',
        age: 62,
        emoji: '👨‍🦳',
        color: '#D4553A',
        icon: Wine,
        shortDesc: 'Retraité, aide son fils alcoolodépendant — entre espoir et rechutes',
        story: 'Patrick a 62 ans, ancien agent SNCF, retraité depuis 2 ans. Son fils Kévin, 35 ans, est alcoolodépendant depuis l\'âge de 20 ans. Après 3 cures de sevrage, plusieurs rechutes et un divorce, Kévin est revenu vivre chez ses parents. Patrick et sa femme alternent entre espoir lors des périodes de sobriété et désespoir lors des rechutes. Patrick a honte d\'en parler autour de lui et s\'est coupé de ses anciens collègues. Il dort mal, surveille son fils la nuit, et commence à boire lui-même « pour supporter ».',
        profile: {
            situation: 'Aide son fils de 35 ans (alcoolodépendance)',
            activite: 'Retraité (ancien agent SNCF)',
            lienParente: 'Père',
            dureeAidance: '15 ans (intermittent)',
            proche: 'Vit chez ses parents, banlieue de Lille',
        },
        traits: ['Rechutes multiples', 'Honte sociale', 'Codépendance', 'Isolement choisi', 'Propre consommation à risque', 'Épuisement moral'],
        aidanceTypes: ["J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)"],
        ageAide: '20-60 ans',
        answers: PERSONA_ANSWERS['P5'] || {},
    },

    // ══════════════════════════════════════════════════
    //  COMBOS (multi-aidance)
    // ══════════════════════════════════════════════════

    {
        id: 'C1',
        name: 'Nadia Bensaïd',
        age: 40,
        emoji: '👩‍⚕️',
        color: '#4A90D9',
        icon: Layers,
        shortDesc: 'Aide-soignante, aide sa mère post-AVC dépressive — double charge',
        story: 'Nadia a 40 ans, aide-soignante en EHPAD à Toulouse. Sa mère Fatima, 68 ans, a fait un AVC il y a 2 ans qui l\'a laissée hémiparésique gauche. Depuis, Fatima a développé une dépression sévère, refuse de sortir et parle de « ne plus vouloir vivre ». Nadia fait la navette entre son travail (où elle soigne des personnes âgées) et le domicile de sa mère (où elle est elle-même aidante). Elle gère perte d\'autonomie ET suivi psychiatrique. Son mari l\'aide mais ne comprend pas toujours la charge culturelle qu\'elle porte.',
        profile: {
            situation: 'Aide sa mère de 68 ans (AVC + dépression)',
            activite: 'Aide-soignante en EHPAD',
            lienParente: 'Fille',
            dureeAidance: '2 ans',
            proche: 'Vit seule à domicile, Toulouse',
        },
        traits: ['Double charge pro/perso', 'Aidante professionnelle ET familiale', 'Duo perte autonomie + psy', 'Charge culturelle', 'Dépression post-AVC', 'Isolement de la mère'],
        aidanceTypes: [
            "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative",
            "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        ],
        ageAide: '60-75 ans',
        answers: PERSONA_ANSWERS['C1'] || {},
    },
    {
        id: 'C2',
        name: 'Thomas Girard',
        age: 28,
        emoji: '👨‍💻',
        color: '#A855F7',
        icon: Layers,
        shortDesc: 'Ingénieur, aide sa sœur IMC bipolaire — entre urgences et dossiers MDPH',
        story: 'Thomas a 28 ans, ingénieur logiciel en télétravail à Bordeaux. Sa sœur jumelle Léa, 28 ans, vit avec une infirmité motrice cérébrale (IMC) et un trouble bipolaire diagnostiqué à 23 ans. Leurs parents, épuisés, se sont progressivement désengagés. Thomas est devenu le référent principal : il l\'accompagne aux rendez-vous MDPH, gère les crises maniaques où elle dépense tout son argent, et coordonne les intervenants (kiné, psychiatre, assistante sociale). Il n\'a jamais eu de relation stable — « pas le temps ».',
        profile: {
            situation: 'Aide sa sœur de 28 ans (IMC + bipolarité)',
            activite: 'Ingénieur logiciel (télétravail)',
            lienParente: 'Frère',
            dureeAidance: '5 ans (intensif)',
            proche: 'Vit seule en appartement adapté, Bordeaux',
        },
        traits: ['Jeune aidant', 'Handicap + Troubles psy', 'Parents désengagés', 'Sacrifice relationnel', 'Surcharge admin MDPH', 'Gestion des crises maniaques'],
        aidanceTypes: [
            "J'aide une personne en situation de handicap",
            "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        ],
        ageAide: '20-60 ans',
        answers: PERSONA_ANSWERS['C2'] || {},
    },
    {
        id: 'C3',
        name: 'Martine Dupuis',
        age: 55,
        emoji: '👩‍🍳',
        color: '#D97706',
        icon: Layers,
        shortDesc: 'Commerçante, aide son mari cancer + alcool — tabou et isolement',
        story: 'Martine a 55 ans, elle tient une boulangerie à Rouen avec son mari Gérard, 58 ans. Gérard a été diagnostiqué d\'un cancer du foie il y a 18 mois — directement lié à 25 ans d\'alcoolisme qu\'il a toujours minimisé. Martine gère seule la boutique, les rendez-vous d\'oncologie, et les tentatives de sevrage qui échouent car Gérard continue de boire « en cachette ». Elle n\'en parle à personne — ni aux clients, ni à ses enfants adultes. Elle a perdu 10 kg, fait des crises d\'angoisse la nuit.',
        profile: {
            situation: 'Aide son mari de 58 ans (cancer + alcoolisme)',
            activite: 'Boulangère (indépendante)',
            lienParente: 'Conjointe',
            dureeAidance: '18 mois (cancer) + 25 ans (alcool)',
            proche: 'Vit avec elle, Rouen',
        },
        traits: ['Maladie chronique + Addiction', 'Tabou total', 'Commerce à gérer seule', 'Déni du conjoint', 'Crises d\'angoisse', 'Refus d\'aide extérieure'],
        aidanceTypes: [
            "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)",
            "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)",
        ],
        ageAide: '20-60 ans',
        answers: PERSONA_ANSWERS['C3'] || {},
    },
]

/** Export for use in SimulatorPage */
export { personas }
export type { Persona }

// ══════════════════════════════════════════════════════
//  Helpers
// ══════════════════════════════════════════════════════

function getPersonasForCategory(catN3Value: string): Persona[] {
    return personas.filter(p =>
        p.aidanceTypes.length === 1 && p.aidanceTypes[0] === catN3Value
    )
}

function getComboPersonas(): Persona[] {
    return personas.filter(p => p.aidanceTypes.length > 1)
}

function getCategoryLabels(persona: Persona): string[] {
    return persona.aidanceTypes.map(n3 => {
        const cat = AIDANCE_CATEGORIES.find(c => c.n3Value === n3)
        return cat?.shortLabel ?? n3
    })
}

// ══════════════════════════════════════════════════════
//  Component
// ══════════════════════════════════════════════════════

export default function PersonasPage() {
    const navigate = useNavigate()
    const [expandedCategory, setExpandedCategory] = useState<string | null>('perte-autonomie')
    const [expandedPersona, setExpandedPersona] = useState<string | null>(null)

    const handleUsePersona = (persona: Persona) => {
        if (Object.keys(persona.answers).length === 0) {
            // No answers yet — navigate but don't pre-fill
            navigate('/simulator')
            return
        }
        sessionStorage.setItem('monka_persona_answers', JSON.stringify(persona.answers))
        sessionStorage.setItem('monka_persona_id', persona.id)
        navigate('/simulator')
    }

    const comboPersonas = getComboPersonas()

    return (
        <div className="max-w-[1100px] mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <Users className="w-6 h-6 text-monka-primary" />
                    Personas Aidants
                </h1>
                <p className="text-sm text-monka-muted">
                    8 profils réalistes organisés par type d&apos;aidance (N3) — cliquez sur une catégorie pour explorer les personas
                </p>
            </div>

            {/* Categories */}
            <div className="space-y-3">
                {AIDANCE_CATEGORIES.map((cat) => {
                    const catPersonas = getPersonasForCategory(cat.n3Value)
                    const isExpanded = expandedCategory === cat.id
                    const CatIcon = cat.icon

                    return (
                        <motion.div key={cat.id} layout className="rounded-2xl overflow-hidden">
                            {/* Category Header */}
                            <div
                                className="glass-card !rounded-b-none cursor-pointer transition-all hover:brightness-[0.98]"
                                onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                            >
                                <div className="flex items-center gap-4 px-5 py-4">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${cat.color}30, ${cat.color}15)` }}
                                    >
                                        <CatIcon className="w-5 h-5" style={{ color: cat.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-base font-bold text-monka-heading">{cat.label}</h2>
                                            <span
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                                                style={{ backgroundColor: cat.color }}
                                            >
                                                {catPersonas.length} persona{catPersonas.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <p className="text-xs text-monka-muted mt-0.5">{cat.description}</p>
                                    </div>
                                    {isExpanded
                                        ? <ChevronDown className="w-5 h-5 text-monka-muted flex-shrink-0" />
                                        : <ChevronRight className="w-5 h-5 text-monka-muted flex-shrink-0" />
                                    }
                                </div>
                            </div>

                            {/* Category Content */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 py-4 bg-white/50 border-t border-monka-border space-y-3">
                                            {catPersonas.length === 0 ? (
                                                <p className="text-sm text-monka-muted italic py-4 text-center">
                                                    Aucun persona dans cette catégorie pour le moment
                                                </p>
                                            ) : (
                                                catPersonas.map(persona => (
                                                    <PersonaCard
                                                        key={persona.id}
                                                        persona={persona}
                                                        isExpanded={expandedPersona === persona.id}
                                                        onToggle={() => setExpandedPersona(expandedPersona === persona.id ? null : persona.id)}
                                                        onSimulate={() => handleUsePersona(persona)}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}

                {/* ── Combos Section ── */}
                <motion.div layout className="rounded-2xl overflow-hidden">
                    <div
                        className="glass-card !rounded-b-none cursor-pointer transition-all hover:brightness-[0.98]"
                        onClick={() => setExpandedCategory(expandedCategory === 'combos' ? null : 'combos')}
                    >
                        <div className="flex items-center gap-4 px-5 py-4">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #F59E0B30, #F59E0B15)' }}
                            >
                                <Layers className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-base font-bold text-monka-heading">
                                        Combos — Multi-aidance
                                    </h2>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white bg-amber-500">
                                        {comboPersonas.length} personas
                                    </span>
                                </div>
                                <p className="text-xs text-monka-muted mt-0.5">
                                    Personas dont l&apos;aidé cumule plusieurs types d&apos;aidance (N3 multi-choix)
                                </p>
                            </div>
                            {expandedCategory === 'combos'
                                ? <ChevronDown className="w-5 h-5 text-monka-muted flex-shrink-0" />
                                : <ChevronRight className="w-5 h-5 text-monka-muted flex-shrink-0" />
                            }
                        </div>
                    </div>

                    <AnimatePresence>
                        {expandedCategory === 'combos' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div className="px-5 py-4 bg-white/50 border-t border-monka-border space-y-3">
                                    {comboPersonas.map(persona => (
                                        <PersonaCard
                                            key={persona.id}
                                            persona={persona}
                                            isExpanded={expandedPersona === persona.id}
                                            onToggle={() => setExpandedPersona(expandedPersona === persona.id ? null : persona.id)}
                                            onSimulate={() => handleUsePersona(persona)}
                                            showComboTags
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Footer info */}
            <div className="mt-8 glass-card p-5">
                <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-monka-heading mb-1">Modèle additif : socle 130Q + blocs aidance</h4>
                        <p className="text-xs text-monka-muted leading-relaxed">
                            Chaque persona a un <strong>socle commun de 130 questions</strong> + des blocs conditionnels activés selon le type d&apos;aidance (N3).
                            Un persona &quot;Handicap&quot; aura 133Q, un &quot;Addiction&quot; 137Q, un combo &quot;Maladie + Addiction&quot; 140Q.
                            Cliquez sur <strong>&quot;Simuler&quot;</strong> pour charger les réponses dans le moteur clinique.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════════
//  PersonaCard Component
// ══════════════════════════════════════════════════════

function PersonaCard({
    persona,
    isExpanded,
    onToggle,
    onSimulate,
    showComboTags = false,
}: {
    persona: Persona
    isExpanded: boolean
    onToggle: () => void
    onSimulate: () => void
    showComboTags?: boolean
}) {
    const answersCount = Object.keys(persona.answers).length
    const hasAnswers = answersCount > 0
    const comboLabels = showComboTags ? getCategoryLabels(persona) : []

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
                        {showComboTags && comboLabels.length > 1 && (
                            <div className="flex gap-1.5 mt-1.5">
                                {comboLabels.map((label) => (
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
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95`}
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
