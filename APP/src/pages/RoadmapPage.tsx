import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    ChevronDown,
    ChevronRight,
    Loader2,
    ListTodo,
    Bell,
} from 'lucide-react'

type Priority = 'URGENT' | 'IMPORTANT' | 'QUAND_POSSIBLE'
type ItemStatus = 'done' | 'in-progress' | 'pending' | 'blocked'

interface TodoItem {
    task: string
    context: string
    status: ItemStatus
}

interface PriorityGroup {
    id: Priority
    title: string
    emoji: string
    color: string
    bgColor: string
    description: string
    items: TodoItem[]
}

const priorityGroups: PriorityGroup[] = [
    {
        id: 'URGENT',
        title: 'Priorité 1 — Urgent',
        emoji: '🔴',
        color: '#EF4444',
        bgColor: '#FEF2F2',
        description: 'À faire avant tout le reste — bloque le projet',
        items: [
            {
                task: 'Valider les barèmes de scoring V1 à V5',
                context: 'Les 5 vulnérabilités ont chacune un barème (points par réponse). Il faut vérifier que les points attribués à chaque réponse sont cliniquement corrects.',
                status: 'pending',
            },
            {
                task: 'Reclassifier ~15 questions mal étiquetées',
                context: 'Certaines questions sont classées "état" mais devraient être "facteur" ou inversement. Ça fausse le scoring si on ne corrige pas.',
                status: 'pending',
            },
            {
                task: 'Valider les 103 recommandations regroupées',
                context: 'Les anciennes recommandations dispersées ont été regroupées par micro-parcours. Chaque reco doit être relue pour s\'assurer qu\'elle est toujours pertinente après le regroupement.',
                status: 'pending',
            },
            {
                task: 'Valider les 20 cas à risque dans les recommandations',
                context: 'L\'audit a identifié 20 regroupements "à risque" (fusion de recos qui pourraient être contradictoires). À examiner un par un.',
                status: 'pending',
            },
        ],
    },
    {
        id: 'IMPORTANT',
        title: 'Priorité 2 — Important',
        emoji: '🟡',
        color: '#F5A623',
        bgColor: '#FFFBEB',
        description: 'À faire cette semaine — améliore la qualité',
        items: [
            {
                task: 'Confirmer les règles d\'activation A4, F6, M6',
                context: 'Ces 3 règles reposent sur des combinaisons rares de réponses. Il faut vérifier qu\'elles se déclenchent dans les bons cas cliniquement.',
                status: 'pending',
            },
            {
                task: 'Résoudre les questions multi-MP (E21, O51, O53, O54, E46)',
                context: 'Ces 5 questions activent plusieurs micro-parcours différents. Il faut décider : est-ce normal ? Y a-t-il un MP prioritaire ?',
                status: 'pending',
            },
            {
                task: 'Valider les 5 CCC inter-vulnérabilités',
                context: 'Les Conditions Critiques Composites combinent des signaux de différentes vulnérabilités pour détecter les cas graves. À vérifier cliniquement.',
                status: 'pending',
            },
            {
                task: 'Définir le filtrage pour l\'aidance enfant (E38, E59, E60, E64, E65)',
                context: 'Quand la personne aidée est un enfant, certaines questions adultes n\'ont pas de sens. Il faut définir lesquelles exclure.',
                status: 'pending',
            },
            {
                task: 'Décider : scoring global pondéré ou somme simple ?',
                context: 'Aujourd\'hui le score global est la somme des 5 vulnérabilités. Faut-il pondérer certaines V plus que d\'autres ?',
                status: 'pending',
            },
        ],
    },
    {
        id: 'QUAND_POSSIBLE',
        title: 'Priorité 3 — Quand possible',
        emoji: '🔵',
        color: '#58BF94',
        bgColor: '#F0FDF4',
        description: 'Pas bloquant — à planifier sereinement',
        items: [
            {
                task: 'Compléter les templates A-D pour V2-V5',
                context: 'Le template E (scoring) est fini pour les 5V. Les templates A (activation), B (recos), C (tâches) et D (suivi) restent à produire pour V2-V5.',
                status: 'blocked',
            },
            {
                task: 'Vérifier la classification trigger vs facteur',
                context: 'Quelques questions trigger (T6, T14) ressemblent à des facteurs. Simple vérification à faire, pas urgent.',
                status: 'pending',
            },
            {
                task: 'Détection CCC automatique dans le simulateur',
                context: 'Le simulateur affiche déjà les CCC dans les règles, mais la détection automatique en temps réel n\'est pas encore câblée.',
                status: 'pending',
            },
        ],
    },
]

const statusConfig: Record<ItemStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
    done: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', label: 'Fait' },
    'in-progress': { icon: Loader2, color: 'text-monka-primary', bg: 'bg-monka-primary/10', label: 'En cours' },
    pending: { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-50', label: 'À faire' },
    blocked: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Bloqué' },
}

export default function RoadmapPage() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(priorityGroups.map(g => [g.id, true]))
    )

    const toggleGroup = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const allItems = priorityGroups.flatMap(g => g.items)
    const doneCount = allItems.filter(i => i.status === 'done').length
    const totalCount = allItems.length

    return (
        <div className="max-w-[900px] mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <ListTodo className="w-6 h-6 text-monka-primary" />
                    TODO — Validation Clinique
                </h1>
                <p className="text-sm text-monka-muted">
                    Points à valider avec le clinicien, classés par urgence. Chaque tâche explique pourquoi elle est importante.
                </p>
            </div>

            {/* Summary */}
            <div className="glass-card p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-monka-heading">{doneCount} / {totalCount} tâches terminées</span>
                    <span className="text-xs text-monka-muted">{Math.round((doneCount / totalCount) * 100)}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full gradient-monka rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((doneCount / totalCount) * 100)}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* Priority Groups */}
            <div className="space-y-4">
                {priorityGroups.map((group) => {
                    const isExpanded = expanded[group.id]
                    const groupDone = group.items.filter(i => i.status === 'done').length
                    const groupTotal = group.items.length

                    return (
                        <div key={group.id} className="rounded-2xl overflow-hidden border border-monka-border bg-white/80">
                            {/* Group Header */}
                            <button
                                onClick={() => toggleGroup(group.id)}
                                className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-white/50 transition-colors"
                                style={{ borderLeft: `4px solid ${group.color}` }}
                            >
                                <div className="text-xl flex-shrink-0">{group.emoji}</div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-monka-heading">{group.title}</h3>
                                    <p className="text-[11px] text-monka-muted mt-0.5">{group.description}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium text-monka-muted">
                                        {groupDone}/{groupTotal}
                                    </span>
                                    {isExpanded ? (
                                        <ChevronDown className="w-4 h-4 text-monka-muted" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-monka-muted" />
                                    )}
                                </div>
                            </button>

                            {/* Items */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="border-t border-monka-border">
                                            {group.items.map((item, i) => {
                                                const config = statusConfig[item.status]
                                                const StatusIcon = config.icon
                                                return (
                                                    <div
                                                        key={i}
                                                        className="px-5 py-4 border-b border-monka-border last:border-b-0"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <StatusIcon
                                                                className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5 ${item.status === 'in-progress' ? 'animate-spin' : ''}`}
                                                            />
                                                            <div className="flex-1">
                                                                <p className={`text-sm font-medium ${item.status === 'done' ? 'text-monka-muted line-through' : 'text-monka-heading'}`}>
                                                                    {item.task}
                                                                </p>
                                                                <p className="text-xs text-monka-muted mt-1 leading-relaxed">
                                                                    {item.context}
                                                                </p>
                                                            </div>
                                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${config.bg} ${config.color} whitespace-nowrap`}>
                                                                {config.label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>

            {/* Bottom note */}
            <div className="mt-6 glass-card p-4 flex items-start gap-3">
                <Bell className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-monka-muted">
                    <strong>Chaque tâche</strong> inclut une explication de son contexte. Si un point n'est pas clair, n'hésitez pas à demander plus de détails.
                    Les tâches "Bloqué" dépendent de la validation d'autres tâches avant de pouvoir avancer.
                </p>
            </div>
        </div>
    )
}
