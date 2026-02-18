import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle2,
    Circle,
    AlertCircle,
    ChevronDown,
    ChevronRight,
    Loader2,
    ListTodo,
    Bell,
    Stethoscope,
} from 'lucide-react'

type ItemStatus = 'done' | 'in-progress' | 'pending' | 'blocked' | 'waiting-dr'

interface TodoItem {
    task: string
    context: string
    status: ItemStatus
    ref?: string
}

interface PhaseGroup {
    id: string
    title: string
    emoji: string
    color: string
    bgColor: string
    description: string
    items: TodoItem[]
}

const phaseGroups: PhaseGroup[] = [
    {
        id: 'P0_P1',
        title: 'Phases 0-1 — Nettoyage & Validation Sources',
        emoji: '✅',
        color: '#22C55E',
        bgColor: '#F0FDF4',
        description: 'Repo nettoyé, 150 questions + 15 triggers validés, référentiels confirmés',
        items: [
            { task: 'Archiver legacy + restructurer repo', context: 'QUESTIONNAIRE/, Q-V3/, AUDIT/, DEMO/ archivés. KERNEL/ créé.', status: 'done' },
            { task: 'Référentiel questions 150+15', context: '150 questions état/facteur + 15 triggers. 100% cohérence vérifiée.', status: 'done' },
            { task: 'Audit 153 vs 150', context: '3 triggers (O2, N31, O49) expliquent la différence. Confirmé par Dr. Monka.', status: 'done' },
            { task: 'Export Excel figé', context: 'Questionnaire_Monka_Complet.xlsx — 150 + 15 triggers + 30 suivi + 24 MP.', status: 'done' },
            { task: 'Règles d\'activation (68)', context: '12 critiques + 28 CCC + 28 standard. 24/24 MP couverts.', status: 'done' },
            { task: 'Architecture recommandations par MP', context: 'Modèle MP→Recos validé. Badge dynamique = MAX(niveaux recos incomplètes).', status: 'done' },
        ],
    },
    {
        id: 'P2',
        title: 'Phase 2 — Ingestion Supabase & Regroupement',
        emoji: '✅',
        color: '#22C55E',
        bgColor: '#F0FDF4',
        description: '10 tables créées + table ASR dédiée, données ingérées et alignées',
        items: [
            { task: 'Ingestion 10 tables Supabase', context: 'questions, vulnerabilities, micro_parcours, activation_rules, recommendations, micro_taches, scoring_questions, scoring_thresholds, suivi_questions, question_mp_mapping.', status: 'done' },
            { task: 'Table ASR dédiée (24 ASR)', context: 'Migration create_asr_table — 1 ASR par MP avec signature + objectif.', status: 'done' },
            { task: 'Migration alignement V2/V4/V5', context: 'fix_v2_v4_v5 sur 8 tables. V2=Administrative(A1-A4), V4=Fragilité(F1-F6), V5=Parcours médical(M1-M6).', status: 'done' },
            { task: 'Regroupement recos par MP', context: '324 recos legacy → 238 dédouplonnées → 103 recos regroupées. 0 reco perdue.', status: 'done' },
            { task: 'Rattachement MT → Recos', context: '299/299 MT rattachées aux 103 recos. 0 orpheline.', status: 'done' },
        ],
    },
    {
        id: 'P3',
        title: 'Phase 3 — Propositions IA & Enrichissement',
        emoji: '🤖',
        color: '#8B5CF6',
        bgColor: '#F5F3FF',
        description: '621 propositions IA documentées — validation clinique en cours',
        items: [
            { task: 'Regroupement 103 recos + dédoublonnage', context: '324 → 103 recos. Doc: recos_regroupees_par_mp.md.', status: 'done' },
            { task: 'Rattachement 299 MT → 103 recos', context: 'Matching sémantique V1-V5. 0 orpheline.', status: 'done' },
            { task: 'CCC inter-vulnérabilités validés', context: 'Dr. Monka a validé les 3 combos (1, 2, 4) + nouvelles règles F6, M6, A4.', status: 'done' },
            { task: 'Architecture recos par MP validée', context: 'Dr. Monka valide le principe multi-recos par MP (11/02).', status: 'done' },
            { task: 'Validation 103 recos regroupées', context: 'Doc envoyé. En attente retour Dr. Monka.', status: 'waiting-dr', ref: 'recos_regroupees_par_mp.md' },
            { task: 'Validation 20 cas à risque', context: '9 cas 🔴 (fusion médical+social) + 11 cas 🟡 (reformulation). Doc envoyé.', status: 'waiting-dr', ref: 'risques_regroupements_phase3.md' },
            { task: 'Envoi doc scoring à Dr. Monka', context: 'scoring_vs_legacy_vs_toutes_etat.md + reflexion_methodologie_scoring.md.', status: 'pending' },
            { task: 'Reclassifier ~15 questions scoring', context: 'E1, E2, N20, E43 + ~11 V2 : état↔facteur à corriger.', status: 'pending' },
            { task: 'Valider pondération scoring (+1/+2)', context: 'Standard (+1) vs différencié (+1 standard / +2 critique).', status: 'pending' },
        ],
    },
    {
        id: 'P4',
        title: 'Phase 4 — Templates KERNEL (25/25 produits)',
        emoji: '📄',
        color: '#F5A623',
        bgColor: '#FFFBEB',
        description: '5V × 5 templates (A→E) tous produits — validation clinique Dr. Monka requise',
        items: [
            { task: 'V1 Social & Relationnel — 5 templates A→E', context: 'R1-R4 (4 MPs, 15 questions). A_activation, B_recos, C_mt_asr, D_suivi, E_scoring.', status: 'done' },
            { task: 'V2 Administrative — 5 templates A→E', context: 'A1-A4 (4 MPs, 36 questions). 5 fichiers remplis.', status: 'done' },
            { task: 'V3 Santé Aidant — 5 templates A→E', context: 'S1-S4 (4 MPs, 26 questions). 5 fichiers remplis.', status: 'done' },
            { task: 'V4 Fragilité Proche — 5 templates A→E', context: 'F1-F6 (6 MPs, 55 questions). 5 fichiers remplis.', status: 'done' },
            { task: 'V5 Parcours Médical — 5 templates A→E', context: 'M1-M6 (6 MPs, 18 questions). 5 fichiers remplis.', status: 'done' },
            { task: 'E_GLOBAL — Scoring inter-vulnérabilités', context: 'Scoring global transversal aux 5V.', status: 'done' },
            { task: 'Validation clinique V1 par Dr. Monka', context: 'Lire les 5 templates, vérifier dans l\'APP, valider enrichissements IA.', status: 'waiting-dr' },
            { task: 'Validation clinique V2-V5 par Dr. Monka', context: 'Même processus que V1 pour les 4 autres vulnérabilités.', status: 'waiting-dr' },
        ],
    },
    {
        id: 'P5',
        title: 'Phase 5 — Simulateur APP (Vite/React)',
        emoji: '🖥️',
        color: '#3B82F6',
        bgColor: '#EFF6FF',
        description: 'App connectée Supabase. Simulateur, Personas, Docs, Dashboard opérationnels',
        items: [
            { task: 'Setup Vite + React + Supabase', context: 'Projet APP/, client Supabase, couche data supabaseData.ts.', status: 'done' },
            { task: 'Simulateur interactif (150 questions)', context: 'Moteur d\'activation temps réel, scoring, CCC, vues interne/externe.', status: 'done' },
            { task: 'Pages Dashboard + Vulnérabilités + Questions', context: 'Stats par V, onglets Questions/Règles/Recos/MT/ASR, filtres.', status: 'done' },
            { task: 'Page Documentation (templates + livrables)', context: '25 templates V1-V5 + 10 livrables KERNEL accessibles.', status: 'done' },
            { task: 'Personas (5 profils aidants auto-fill)', context: 'A1-A5 avec pré-remplissage simulateur.', status: 'done' },
            { task: 'ONBOARDING interactif', context: 'ONBOARDING_KERNEL.html avec données DB réelles (24 MPs, ASR, scoring).', status: 'done' },
            { task: 'Export résultats (PDF/JSON)', context: 'Permettre l\'export des résultats simulateur.', status: 'pending' },
            { task: 'Suivi dynamique (entonnoir 3 niveaux)', context: 'Pipeline questions suivi après le questionnaire initial.', status: 'pending' },
        ],
    },
    {
        id: 'DECISIONS',
        title: '🔴 Décisions à statuer — Dr. Monka',
        emoji: '⚖️',
        color: '#EF4444',
        bgColor: '#FEF2F2',
        description: 'Points bloquants qui conditionnent la suite du développement',
        items: [
            { task: 'P1 — 5 questions CCC supplémentaires', context: 'Ajouter ou non ? Enrichit les alertes critiques.', status: 'waiting-dr' },
            { task: 'P2 — Reclassifier ~15 questions scoring', context: 'Legacy 38 vs reclassifié 55 vs mixte. Change la grille scoring.', status: 'waiting-dr' },
            { task: 'P3 — Pondération scoring', context: '+1 uniforme ou +1/+2 différencié par gravité clinique.', status: 'waiting-dr' },
            { task: 'P4 — Seuils scoring', context: 'Mathématiques (÷4) ou cliniques. Impact l\'interprétation du score.', status: 'waiting-dr' },
            { task: 'P5 — Recos désactivables par contexte', context: 'Si reco impossible (ex: aucun entourage), pouvoir la désactiver.', status: 'waiting-dr' },
            { task: 'A1 — F6 sans règle d\'activation legacy', context: 'Comment assigner les 6 recos de F6 ?', status: 'waiting-dr' },
            { task: 'A5 — E21 partagée V3+V5', context: 'Le score compte 2 fois ? Question multi-V.', status: 'waiting-dr' },
            { task: 'A7 — 5 questions multi-MP', context: 'O51, O53, O54, E46, E21 → lien 1:1 ou 1:N ?', status: 'waiting-dr' },
            { task: 'A8 — 5 questions mentionnant "enfant"', context: 'E38, E59, E60, E64, E65 → filtrer par profil d\'aidant ?', status: 'waiting-dr' },
            { task: 'P6 — Signal urgence CRM (Combo 4 CCC)', context: 'Proche dangereux + aidant épuisé = urgence max. Comment remonter dans le CRM Lifelink ?', status: 'waiting-dr' },
        ],
    },
]

const statusConfig: Record<ItemStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
    done: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', label: 'Fait' },
    'in-progress': { icon: Loader2, color: 'text-monka-primary', bg: 'bg-monka-primary/10', label: 'En cours' },
    pending: { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-50', label: 'À faire' },
    blocked: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Bloqué' },
    'waiting-dr': { icon: Stethoscope, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Dr. Monka' },
}

export default function RoadmapPage() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(phaseGroups.map(g => {
            const hasPending = g.items.some(i => i.status !== 'done')
            return [g.id, hasPending]
        }))
    )

    const toggleGroup = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const allItems = phaseGroups.flatMap(g => g.items)
    const doneCount = allItems.filter(i => i.status === 'done').length
    const totalCount = allItems.length
    const waitingCount = allItems.filter(i => i.status === 'waiting-dr').length

    return (
        <div className="max-w-[900px] mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <ListTodo className="w-6 h-6 text-monka-primary" />
                    Roadmap — Validation Clinique
                </h1>
                <p className="text-sm text-monka-muted">
                    État réel du projet par phase. Basé sur <strong>TODO.md</strong> et <strong>RECAP_EVOLUTIONS_POST_KERNEL.md</strong>.
                </p>
            </div>

            {/* Summary */}
            <div className="glass-card p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-monka-heading">{doneCount} / {totalCount} tâches terminées</span>
                    <div className="flex items-center gap-3">
                        {waitingCount > 0 && (
                            <span className="text-xs font-medium text-purple-600 flex items-center gap-1">
                                <Stethoscope className="w-3.5 h-3.5" />
                                {waitingCount} en attente Dr. Monka
                            </span>
                        )}
                        <span className="text-xs text-monka-muted">{Math.round((doneCount / totalCount) * 100)}%</span>
                    </div>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((doneCount / totalCount) * 100)}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-300 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((waitingCount / totalCount) * 100)}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    />
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] text-monka-muted flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400" /> Terminé
                    </span>
                    <span className="text-[10px] text-monka-muted flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-purple-400" /> Attente Dr. Monka
                    </span>
                    <span className="text-[10px] text-monka-muted flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-200" /> À faire
                    </span>
                </div>
            </div>

            {/* Phase Groups */}
            <div className="space-y-4">
                {phaseGroups.map((group) => {
                    const isExpanded = expanded[group.id]
                    const groupDone = group.items.filter(i => i.status === 'done').length
                    const groupTotal = group.items.length
                    const groupWaiting = group.items.filter(i => i.status === 'waiting-dr').length

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
                                    {groupDone === groupTotal ? (
                                        <span className="text-xs font-bold text-green-500">✅ {groupDone}/{groupTotal}</span>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-monka-muted">
                                                {groupDone}/{groupTotal}
                                            </span>
                                            {groupWaiting > 0 && (
                                                <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded">
                                                    {groupWaiting} Dr.
                                                </span>
                                            )}
                                        </div>
                                    )}
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
                    <strong>Source de vérité</strong> : <code className="text-monka-primary">TODO.md</code> + <code className="text-monka-primary">RECAP_EVOLUTIONS_POST_KERNEL.md</code>.
                    Les tâches « Dr. Monka » nécessitent une validation clinique avant de pouvoir avancer.
                    Voir <code className="text-monka-primary">TODO_VALIDATION_DR_MONKA.md</code> pour la checklist détaillée.
                </p>
            </div>
        </div>
    )
}
