import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    HelpCircle,
    Search,
    Filter,
    Activity,
    AlertTriangle,
    ChevronDown,
    ChevronRight,
    Zap,
    Tag,
    FileQuestion,
} from 'lucide-react'
import { useMonkaData } from '../engine/useMonkaData'
import type { MonkaData, DBQuestion } from '../engine/supabaseData'

const VULN_COLORS: Record<string, string> = {
    V1: '#58BF94',
    V2: '#5B8DEF',
    V3: '#E46B8B',
    V4: '#E48B65',
    V5: '#7748F6',
}

const VULN_NAMES: Record<string, string> = {
    V1: 'Social & Relationnel',
    V2: 'Fragilité du Proche',
    V3: 'Santé de l\'Aidant',
    V4: 'Parcours Médical',
    V5: 'Admin & Juridique',
}

function QuestionCard({ question, data, expanded, onToggle }: {
    question: DBQuestion
    data: MonkaData
    expanded: boolean
    onToggle: () => void
}) {
    const vulnId = question.vulnerability_id || 'trigger'
    const color = VULN_COLORS[vulnId] || '#888'
    const isTrigger = question.is_trigger

    // Find related data
    const mappedMPs = useMemo(() => {
        const mpIds = data.questionMPMapping
            .filter(m => m.question_id === question.id)
            .map(m => m.mp_id)
        return data.microParcours.filter(mp => mpIds.includes(mp.id))
    }, [question.id, data])

    const scoringEntries = useMemo(() =>
        data.scoringQuestions.filter(s => s.question_id === question.id),
        [question.id, data]
    )

    const relatedRules = useMemo(() =>
        data.activationRules.filter(r => r.question_ids?.includes(question.id)),
        [question.id, data]
    )

    return (
        <div className={`rounded-xl border-2 transition-all overflow-hidden ${expanded ? '' : 'border-transparent'}`}
            style={{ borderColor: expanded ? `${color}40` : 'transparent' }}>
            <div
                className="glass-card !rounded-none cursor-pointer hover:bg-white/80"
                onClick={onToggle}
            >
                <div className="flex items-center gap-3 px-4 py-3">
                    {/* ID + Vuln badge */}
                    <div className="flex items-center gap-2 w-[120px] flex-shrink-0">
                        <span className="font-mono font-bold text-sm" style={{ color }}>{question.id}</span>
                        {isTrigger ? (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                                TRIGGER
                            </span>
                        ) : (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                                style={{ backgroundColor: color }}>
                                {vulnId}
                            </span>
                        )}
                    </div>

                    {/* Question text */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-monka-text truncate">{question.question_text}</p>
                    </div>

                    {/* Classification */}
                    {question.classification && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-lg font-medium flex-shrink-0
                            ${question.classification === 'etat' ? 'bg-blue-50 text-blue-600' :
                                question.classification === 'facteur' ? 'bg-amber-50 text-amber-600' :
                                    'bg-gray-50 text-gray-500'}`}>
                            {question.classification}
                        </span>
                    )}

                    {/* Stats badges */}
                    <div className="flex gap-1.5 flex-shrink-0">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-monka-muted">
                            {question.response_options?.length || 0} opt
                        </span>
                        {scoringEntries.length > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-monka-primary/10 text-monka-primary font-medium">
                                scorante
                            </span>
                        )}
                        {mappedMPs.length > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-50 text-violet-600">
                                {mappedMPs.length} MP
                            </span>
                        )}
                    </div>

                    {expanded ? <ChevronDown className="w-4 h-4 text-monka-muted" /> : <ChevronRight className="w-4 h-4 text-monka-muted" />}
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 py-4 bg-white/60 border-t border-monka-border space-y-4">
                            {/* Full question text */}
                            <div>
                                <p className="text-[10px] font-bold text-monka-muted uppercase mb-1">Question complète</p>
                                <p className="text-sm text-monka-text leading-relaxed">{question.question_text}</p>
                            </div>

                            {/* Response options */}
                            {question.response_options && question.response_options.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold text-monka-muted uppercase mb-2">
                                        Options de réponse ({question.response_options.length})
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {question.response_options.map((opt, i) => {
                                            const score = scoringEntries.find(s => s.response_text === opt)
                                            return (
                                                <span key={i}
                                                    className={`text-[11px] px-2.5 py-1.5 rounded-lg border
                                                        ${score ? 'bg-monka-primary/5 border-monka-primary/20' : 'bg-gray-50 border-monka-border'}`}>
                                                    {opt}
                                                    {score && <strong className="ml-1 text-monka-primary">+{score.score}pt</strong>}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Metadata */}
                            <div className="grid grid-cols-4 gap-3">
                                {question.bloc && (
                                    <div className="p-2 rounded-lg bg-gray-50 border border-monka-border">
                                        <p className="text-[9px] text-monka-muted uppercase">Bloc</p>
                                        <p className="text-xs font-bold text-monka-heading">{question.bloc}</p>
                                    </div>
                                )}
                                {question.sous_bloc && (
                                    <div className="p-2 rounded-lg bg-gray-50 border border-monka-border">
                                        <p className="text-[9px] text-monka-muted uppercase">Sous-bloc</p>
                                        <p className="text-xs font-bold text-monka-heading">{question.sous_bloc}</p>
                                    </div>
                                )}
                                {question.aidance && (
                                    <div className="p-2 rounded-lg bg-gray-50 border border-monka-border">
                                        <p className="text-[9px] text-monka-muted uppercase">Aidance</p>
                                        <p className="text-xs font-bold text-monka-heading">{question.aidance}</p>
                                    </div>
                                )}
                                {question.response_type && (
                                    <div className="p-2 rounded-lg bg-gray-50 border border-monka-border">
                                        <p className="text-[9px] text-monka-muted uppercase">Type réponse</p>
                                        <p className="text-xs font-bold text-monka-heading">{question.response_type}</p>
                                    </div>
                                )}
                            </div>

                            {/* Mapped MPs */}
                            {mappedMPs.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold text-monka-muted uppercase mb-2">Micro-Parcours liés</p>
                                    <div className="space-y-1">
                                        {mappedMPs.map(mp => (
                                            <div key={mp.id} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-violet-50/50 border border-violet-100">
                                                <span className="font-mono font-bold text-violet-600">{mp.id}</span>
                                                <span className="text-monka-text">{mp.nom}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related rules */}
                            {relatedRules.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold text-monka-muted uppercase mb-2">Règles d'activation utilisant cette question</p>
                                    <div className="space-y-1">
                                        {relatedRules.map(rule => {
                                            const niveauColor = rule.niveau === 'critique' ? 'text-red-600 bg-red-50' :
                                                rule.niveau === 'ccc' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'
                                            return (
                                                <div key={rule.id} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-gray-50 border border-monka-border">
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${niveauColor}`}>{rule.niveau}</span>
                                                    <span className="font-mono text-monka-muted">{rule.id}</span>
                                                    <span className="text-monka-muted">→ {rule.mp_id}</span>
                                                    {rule.sens_clinique && (
                                                        <span className="text-monka-text ml-2 truncate">{rule.sens_clinique}</span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function QuestionsPage() {
    const { data, loading, error } = useMonkaData()
    const [search, setSearch] = useState('')
    const [filterVuln, setFilterVuln] = useState<string>('all')
    const [filterType, setFilterType] = useState<string>('all')
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const filteredQuestions = useMemo(() => {
        if (!data) return []
        let qs = [...data.questions]

        // Filter by vulnerability
        if (filterVuln === 'trigger') {
            qs = qs.filter(q => q.is_trigger)
        } else if (filterVuln !== 'all') {
            qs = qs.filter(q => q.vulnerability_id === filterVuln && !q.is_trigger)
        }

        // Filter by classification
        if (filterType !== 'all') {
            qs = qs.filter(q => (q.classification || '') === filterType)
        }

        // Search
        if (search.trim()) {
            const s = search.toLowerCase()
            qs = qs.filter(q =>
                q.id.toLowerCase().includes(s) ||
                q.question_text.toLowerCase().includes(s) ||
                (q.sous_bloc || '').toLowerCase().includes(s)
            )
        }

        return qs
    }, [data, search, filterVuln, filterType])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <Activity className="w-8 h-8 text-monka-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-monka-muted">Chargement des questions…</p>
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                    <p className="text-sm text-red-500">{error || 'Erreur de chargement'}</p>
                </div>
            </div>
        )
    }

    // Stats for header
    const totalQ = data.questions.length
    const triggerCount = data.questions.filter(q => q.is_trigger).length
    const scoringCount = data.scoringQuestions.length

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="mb-5">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <FileQuestion className="w-6 h-6 text-monka-primary" />
                    Questions
                </h1>
                <p className="text-sm text-monka-muted">
                    {totalQ} questions • {triggerCount} triggers • {scoringCount} réponses scorantes
                </p>
            </div>

            {/* Filters bar */}
            <div className="glass-card p-3 mb-4 flex items-center gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-monka-muted" />
                    <input
                        type="text"
                        placeholder="Rechercher par ID, texte, sous-bloc…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white border border-monka-border
                            focus:outline-none focus:ring-2 focus:ring-monka-primary/20 focus:border-monka-primary"
                    />
                </div>

                {/* Vuln filter */}
                <div className="flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-monka-muted" />
                    <select
                        value={filterVuln}
                        onChange={(e) => setFilterVuln(e.target.value)}
                        className="text-xs bg-white border border-monka-border rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-monka-primary/20"
                    >
                        <option value="all">Toutes ({totalQ})</option>
                        <option value="trigger">Triggers ({triggerCount})</option>
                        {Object.entries(VULN_NAMES).map(([vid, name]) => {
                            const count = data.questions.filter(q => q.vulnerability_id === vid && !q.is_trigger).length
                            return <option key={vid} value={vid}>{vid} — {name} ({count})</option>
                        })}
                    </select>
                </div>

                {/* Type filter */}
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="text-xs bg-white border border-monka-border rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-monka-primary/20"
                >
                    <option value="all">Tous types</option>
                    <option value="etat">État</option>
                    <option value="facteur">Facteur</option>
                    <option value="">Non classé</option>
                </select>

                {/* Results count */}
                <span className="text-[10px] text-monka-muted bg-gray-100 px-2.5 py-1.5 rounded-lg font-medium flex-shrink-0">
                    {filteredQuestions.length} résultat{filteredQuestions.length > 1 ? 's' : ''}
                </span>
            </div>

            {/* Questions list */}
            <div className="space-y-1">
                {filteredQuestions.map((q) => (
                    <QuestionCard
                        key={q.id}
                        question={q}
                        data={data}
                        expanded={expandedId === q.id}
                        onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                    />
                ))}

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-12">
                        <HelpCircle className="w-8 h-8 text-monka-muted mx-auto mb-3" />
                        <p className="text-sm text-monka-muted">Aucune question ne correspond à vos filtres</p>
                    </div>
                )}
            </div>
        </div>
    )
}
