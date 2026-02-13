import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity,
    TrendingUp,
    ListChecks,
    Shield,
    BarChart3,
    Zap,
    Eye,
    Cog,
    Users,
    ChevronDown,
    ChevronRight,
    CheckCircle2,
    FileText,
    Layers,
    Loader2,
    AlertCircle,
    Target,
    Heart,
    Stethoscope,
    Scale,
    RefreshCw,
} from 'lucide-react'
import type { VulnerabilityId } from '../engine/types'
import { useMonkaData } from '../engine/useMonkaData'
import {
    getQuestionsForVuln,
    getAllQuestions,
    buildQuestionMPMap,
    buildMPMap,
    buildScoringMap,
    getMaxScoreForVuln,
    getThresholdsForVuln,
    getActivationRulesForVuln,
    getRecommendationsForVuln,
    getMicroTachesForVuln,
    getSuiviForVuln,
    invalidateCache,
    type MonkaData,
    type DBQuestion,
    type DBActivationRule,
} from '../engine/supabaseData'

// === Types ===
type InternalTab = 'scoring' | 'activation' | 'recommendations' | 'rules' | 'tasks' | 'summary'
type ViewMode = 'internal' | 'external'
type VFilter = VulnerabilityId | 'ALL'

const vulnerabilities: { id: VulnerabilityId; label: string; color: string; icon: typeof Activity }[] = [
    { id: 'V1', label: 'Social et relationnel', color: '#58BF94', icon: Users },
    { id: 'V2', label: 'Administrative', color: '#86C0CF', icon: Scale },
    { id: 'V3', label: 'Santé physique et psychologique', color: '#F5A623', icon: Heart },
    { id: 'V4', label: 'Fragilité du proche', color: '#EF4444', icon: Stethoscope },
    { id: 'V5', label: 'Parcours médical du proche', color: '#7748F6', icon: Target },
]

const vColorMap: Record<VulnerabilityId, string> = {
    V1: '#58BF94', V2: '#86C0CF', V3: '#F5A623', V4: '#EF4444', V5: '#7748F6',
}

const internalTabs: { id: InternalTab; label: string; icon: typeof Activity }[] = [
    { id: 'scoring', label: 'Scoring', icon: BarChart3 },
    { id: 'activation', label: 'Activation', icon: Zap },
    { id: 'recommendations', label: 'Recos', icon: TrendingUp },
    { id: 'rules', label: 'Règles', icon: Shield },
    { id: 'tasks', label: 'Tâches', icon: ListChecks },
    { id: 'summary', label: 'Résumé', icon: FileText },
]

// === Component ===

export default function SimulatorPage() {
    const { data, loading, error } = useMonkaData()
    const [activeV, setActiveV] = useState<VFilter>('V1')
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [viewMode, setViewMode] = useState<ViewMode>('internal')
    const [activeInternalTab, setActiveInternalTab] = useState<InternalTab>('scoring')
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
    const [personaId, setPersonaId] = useState<string | null>(null)

    // Load persona answers from sessionStorage (set by PersonasPage)
    useEffect(() => {
        const stored = sessionStorage.getItem('monka_persona_answers')
        const storedId = sessionStorage.getItem('monka_persona_id')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setAnswers(parsed)
                setPersonaId(storedId)
                // Clear after loading
                sessionStorage.removeItem('monka_persona_answers')
                sessionStorage.removeItem('monka_persona_id')
            } catch { /* ignore */ }
        }
    }, [])

    // === Loading / Error states ===
    if (loading) {
        return (
            <div className="h-[calc(100vh-48px)] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-monka-primary animate-spin mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-monka-heading mb-1">Chargement des données Supabase</h2>
                    <p className="text-sm text-monka-muted">165 questions • 24 micro-parcours • 68 règles d'activation</p>
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="h-[calc(100vh-48px)] flex items-center justify-center">
                <div className="text-center glass-card p-8 max-w-md">
                    <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-monka-heading mb-2">Erreur de chargement</h2>
                    <p className="text-sm text-monka-muted mb-4">{error || 'Données non disponibles'}</p>
                    <button
                        onClick={() => { invalidateCache(); window.location.reload() }}
                        className="px-4 py-2 bg-monka-primary text-white rounded-lg text-sm font-medium hover:bg-monka-primary/90 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                        Réessayer
                    </button>
                </div>
            </div>
        )
    }

    return <SimulatorContent data={data} activeV={activeV} setActiveV={setActiveV} answers={answers} setAnswers={setAnswers} viewMode={viewMode} setViewMode={setViewMode} activeInternalTab={activeInternalTab} setActiveInternalTab={setActiveInternalTab} expandedCategories={expandedCategories} setExpandedCategories={setExpandedCategories} personaId={personaId} />
}

// === Inner component with data loaded ===

function SimulatorContent({
    data, activeV, setActiveV, answers, setAnswers,
    viewMode, setViewMode, activeInternalTab, setActiveInternalTab,
    expandedCategories, setExpandedCategories, personaId,
}: {
    data: MonkaData
    activeV: VFilter
    setActiveV: (v: VFilter) => void
    answers: Record<string, string>
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
    viewMode: ViewMode
    setViewMode: (m: ViewMode) => void
    activeInternalTab: InternalTab
    setActiveInternalTab: (t: InternalTab) => void
    expandedCategories: Record<string, boolean>
    setExpandedCategories: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    personaId: string | null
}) {
    // === Derived data ===
    const questionMPMap = useMemo(() => buildQuestionMPMap(data), [data])
    const mpMap = useMemo(() => buildMPMap(data), [data])
    const scoringMap = useMemo(() => buildScoringMap(data), [data])

    // Current questions
    const currentQuestions = useMemo(() => {
        if (activeV === 'ALL') return getAllQuestions(data)
        return getQuestionsForVuln(data, activeV)
    }, [data, activeV])

    // Group questions by sous_bloc (or by vulnerability when ALL)
    const groupedQuestions = useMemo(() => {
        const groups: Record<string, DBQuestion[]> = {}
        if (activeV === 'ALL') {
            vulnerabilities.forEach(v => {
                const vQuestions = getQuestionsForVuln(data, v.id)
                if (vQuestions.length > 0) groups[v.id] = vQuestions
            })
        } else {
            currentQuestions.forEach(q => {
                const key = q.sous_bloc || q.classification || 'Autres'
                if (!groups[key]) groups[key] = []
                groups[key].push(q)
            })
        }
        return groups
    }, [data, activeV, currentQuestions])

    // Stats
    const answeredCount = currentQuestions.filter(q => answers[q.id]).length
    const totalCount = currentQuestions.length
    const scoringQIds = new Set(data.scoringQuestions.map(sq => sq.question_id))
    const currentScoringCount = currentQuestions.filter(q => scoringQIds.has(q.id)).length
    const answeredScoringCount = currentQuestions.filter(q => scoringQIds.has(q.id) && answers[q.id]).length

    // Score computation
    const scoreByV = useMemo(() => {
        const result: Record<string, { score: number; max: number }> = {}
        vulnerabilities.forEach(v => {
            const maxScore = getMaxScoreForVuln(data, v.id)
            let score = 0
            data.scoringQuestions
                .filter(sq => sq.vulnerability_id === v.id)
                .forEach(sq => {
                    if (answers[sq.question_id]) {
                        // If the selected answer matches the "zero" response, score = 0
                        // Otherwise compute based on scoring_questions table
                        if (answers[sq.question_id] !== sq.response_text) {
                            // Not the lowest response → need to find the actual score
                            // For now, use the option index as a proxy for score
                            const q = data.questions.find(q2 => q2.id === sq.question_id)
                            if (q?.response_options) {
                                const idx = q.response_options.indexOf(answers[sq.question_id])
                                if (idx >= 0) score += idx
                            }
                        }
                    }
                })
            result[v.id] = { score: Math.min(score, maxScore), max: maxScore }
        })
        return result
    }, [data, answers])

    const totalScore = Object.values(scoreByV).reduce((a, b) => a + b.score, 0)
    const totalMax = Object.values(scoreByV).reduce((a, b) => a + b.max, 0)
    const displayScore = activeV === 'ALL'
        ? { score: totalScore, max: totalMax }
        : scoreByV[activeV] || { score: 0, max: 0 }

    // Activated MPs (based on activation rules)
    const activatedMPs = useMemo(() => {
        const activated = new Set<string>()
        data.activationRules.forEach(rule => {
            if (activeV !== 'ALL' && rule.vulnerability_id !== activeV) return
            // Check if all question_ids in the rule are answered
            const allAnswered = rule.question_ids.every(qid => answers[qid])
            if (allAnswered && rule.question_ids.length > 0) {
                // Check condition_logic if present
                const condLogic = rule.condition_logic as Record<string, unknown>
                if (condLogic && typeof condLogic === 'object') {
                    // Try to evaluate conditions
                    let conditionsMet = true
                    const conditions = (condLogic as { conditions?: Array<{ question_id: string; operator: string; value: unknown }> }).conditions
                    if (conditions && Array.isArray(conditions)) {
                        for (const cond of conditions) {
                            const answer = answers[cond.question_id]
                            if (!answer) { conditionsMet = false; break }
                            if (cond.operator === 'equals' && answer !== cond.value) { conditionsMet = false; break }
                            if (cond.operator === 'not_equals' && answer === cond.value) { conditionsMet = false; break }
                            if (cond.operator === 'in' && Array.isArray(cond.value) && !cond.value.includes(answer)) { conditionsMet = false; break }
                        }
                    }
                    if (conditionsMet) activated.add(rule.mp_id)
                } else {
                    activated.add(rule.mp_id)
                }
            }
        })
        return Array.from(activated)
    }, [data, answers, activeV])

    // Threshold info for current V
    const currentThreshold = useMemo(() => {
        if (activeV === 'ALL') return null
        const thresholds = getThresholdsForVuln(data, activeV)
        const score = displayScore.score
        return thresholds.find(t => score >= t.min_score && score <= t.max_score) || null
    }, [data, activeV, displayScore])

    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev => ({ ...prev, [cat]: prev[cat] === false ? true : prev[cat] === undefined ? false : !prev[cat] }))
    }

    const getThresholdColor = (level: string) => {
        switch (level) {
            case 'faible': return '#00DC82'
            case 'modere': return '#F5D245'
            case 'eleve': return '#F5A623'
            case 'critique': return '#EF4444'
            default: return '#999'
        }
    }

    return (
        <div className="h-[calc(100vh-48px)]">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-monka-heading">Simulateur</h1>
                    {personaId && (
                        <span className="text-[10px] font-bold text-white bg-indigo-500 px-2 py-0.5 rounded-lg">Persona {personaId}</span>
                    )}
                    <div className="flex gap-1.5">
                        <motion.button
                            onClick={() => setActiveV('ALL')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                ${activeV === 'ALL' ? 'bg-monka-dark text-white shadow-md' : 'bg-white/60 text-monka-text/60 hover:bg-white/80'}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Layers className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                            ALL
                        </motion.button>
                        {vulnerabilities.map((v) => (
                            <motion.button
                                key={v.id}
                                onClick={() => setActiveV(v.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                  ${activeV === v.id ? 'text-white shadow-md' : 'bg-white/60 text-monka-text/60 hover:bg-white/80'}`}
                                style={activeV === v.id ? { backgroundColor: v.color } : {}}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {v.id}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-monka-border">
                        <BarChart3 className="w-3.5 h-3.5 text-monka-primary" />
                        <span className="text-monka-muted">Score:</span>
                        <span className="font-bold text-monka-heading">{displayScore.score}/{displayScore.max}</span>
                    </div>
                    {currentThreshold && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border" style={{ backgroundColor: `${getThresholdColor(currentThreshold.level)}15`, borderColor: `${getThresholdColor(currentThreshold.level)}30` }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getThresholdColor(currentThreshold.level) }} />
                            <span className="font-bold" style={{ color: getThresholdColor(currentThreshold.level) }}>{currentThreshold.description}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-monka-border">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-monka-muted">MP actifs:</span>
                        <span className="font-bold text-monka-heading">{activatedMPs.length}/{data.microParcours.length}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-monka-border">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-monka-muted">Réponses:</span>
                        <span className="font-bold text-monka-heading">{answeredCount}/{totalCount}</span>
                    </div>
                </div>
            </div>

            {/* Subtitle — V info from DB */}
            {activeV !== 'ALL' && data.vulnerabilities.find(v => v.id === activeV) && (
                <div className="mb-3 flex items-center gap-2 text-xs text-monka-muted">
                    <span className="font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: vColorMap[activeV] }}>
                        {activeV}
                    </span>
                    <span>{data.vulnerabilities.find(v => v.id === activeV)!.name}</span>
                    <span>•</span>
                    <span>{data.vulnerabilities.find(v => v.id === activeV)!.bloc_label}</span>
                    <span>•</span>
                    <span>{totalCount} questions ({currentScoringCount} scorantes, {answeredScoringCount} répondues)</span>
                </div>
            )}

            {/* Split Screen */}
            <div className="flex gap-4 h-[calc(100%-80px)]">

                {/* LEFT — Questionnaire */}
                <div className="w-[45%] flex flex-col min-w-0">
                    <div className="glass-card flex-1 flex flex-col overflow-hidden">
                        <div className="px-5 py-3 border-b border-monka-border flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-bold text-monka-heading">
                                    Questionnaire {activeV === 'ALL' ? '— Toutes vulnérabilités' : `— ${data.vulnerabilities.find(v => v.id === activeV)?.name || activeV}`}
                                </h2>
                                <p className="text-[11px] text-monka-muted mt-0.5">
                                    {answeredScoringCount}/{currentScoringCount} scorantes • {answeredCount}/{totalCount} total
                                </p>
                            </div>
                            <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-monka-primary rounded-full"
                                    animate={{ width: `${totalCount > 0 ? (answeredCount / totalCount) * 100 : 0}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
                            {Object.entries(groupedQuestions).map(([groupKey, questions]) => {
                                if (questions.length === 0) return null
                                const isExpanded = expandedCategories[groupKey] !== false
                                const groupAnswered = questions.filter(q => answers[q.id]).length

                                // For V groups (ALL mode) get color from vulnerability map
                                const isVGroup = groupKey.startsWith('V') && groupKey.length === 2
                                const groupColor = isVGroup ? vColorMap[groupKey as VulnerabilityId] : '#58BF94'
                                const groupLabel = isVGroup
                                    ? `${groupKey} — ${vulnerabilities.find(v => v.id === groupKey)?.label || groupKey} (${questions.length})`
                                    : `${groupKey} (${questions.length})`

                                return (
                                    <div key={groupKey}>
                                        <button
                                            onClick={() => toggleCategory(groupKey)}
                                            className="flex items-center gap-2 w-full py-2 text-left"
                                        >
                                            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${groupColor}20` }}>
                                                <Activity className="w-3.5 h-3.5" style={{ color: groupColor }} />
                                            </div>
                                            <span className="text-xs font-bold text-monka-heading uppercase tracking-wider flex-1 truncate">
                                                {groupLabel}
                                            </span>
                                            <span className="text-[10px] text-monka-muted mr-1">{groupAnswered}/{questions.length}</span>
                                            {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-monka-muted" /> : <ChevronRight className="w-3.5 h-3.5 text-monka-muted" />}
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="divide-y divide-monka-border pb-2">
                                                        {questions.map((q) => {
                                                            const isAnswered = !!answers[q.id]
                                                            const isScoring = scoringQIds.has(q.id)
                                                            const qMPs = questionMPMap[q.id] || []
                                                            const qVColor = q.vulnerability_id ? vColorMap[q.vulnerability_id as VulnerabilityId] || '#999' : '#999'

                                                            return (
                                                                <div
                                                                    key={q.id}
                                                                    className={`p-3 rounded-xl border transition-all duration-200
                                    ${isAnswered
                                                                            ? 'bg-monka-primary/5 border-monka-primary/20'
                                                                            : 'bg-white/40 border-monka-border/30 hover:border-monka-border'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-start gap-2 mb-2">
                                                                        {/* Question ID badge */}
                                                                        <span
                                                                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5"
                                                                            style={{
                                                                                backgroundColor: isScoring ? `${qVColor}20` : '#f3f4f6',
                                                                                color: isScoring ? qVColor : '#9ca3af',
                                                                            }}
                                                                        >
                                                                            {q.id}
                                                                        </span>
                                                                        {/* V badge in ALL mode */}
                                                                        {activeV === 'ALL' && q.vulnerability_id && (
                                                                            <span
                                                                                className="text-[9px] font-bold px-1 py-0.5 rounded text-white flex-shrink-0 mt-0.5"
                                                                                style={{ backgroundColor: qVColor }}
                                                                            >
                                                                                {q.vulnerability_id}
                                                                            </span>
                                                                        )}
                                                                        {/* Classification badge */}
                                                                        {q.classification && (
                                                                            <span className="text-[9px] px-1 py-0.5 rounded bg-gray-100 text-gray-500 flex-shrink-0 mt-0.5">
                                                                                {q.classification}
                                                                            </span>
                                                                        )}
                                                                        {isScoring && (
                                                                            <span className="text-[9px] px-1 py-0.5 rounded bg-amber-50 text-amber-600 flex-shrink-0 mt-0.5">
                                                                                scorante
                                                                            </span>
                                                                        )}
                                                                        <p className="text-sm text-monka-text leading-snug">{q.question_text}</p>
                                                                    </div>

                                                                    {/* MP tags */}
                                                                    {qMPs.length > 0 && (
                                                                        <div className="mb-2 flex flex-wrap gap-1">
                                                                            {qMPs.map(mpId => (
                                                                                <span key={mpId} className="text-[10px] text-monka-muted bg-monka-dark/5 px-1.5 py-0.5 rounded">
                                                                                    MP: {mpId} — {mpMap[mpId]?.nom || mpId}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    )}

                                                                    {/* Response type indicator */}
                                                                    {q.response_type && (
                                                                        <div className="mb-2">
                                                                            <span className="text-[9px] text-monka-muted italic">{q.response_type}</span>
                                                                        </div>
                                                                    )}

                                                                    {/* Options */}
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {(q.response_options || []).map((opt) => (
                                                                            <button
                                                                                key={opt}
                                                                                onClick={() => {
                                                                                    setAnswers(prev => {
                                                                                        const next = { ...prev }
                                                                                        if (next[q.id] === opt) delete next[q.id]
                                                                                        else next[q.id] = opt
                                                                                        return next
                                                                                    })
                                                                                }}
                                                                                className={`
                                          px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150
                                          ${answers[q.id] === opt
                                                                                        ? 'text-white shadow-sm'
                                                                                        : 'bg-white/60 text-monka-text/70 hover:bg-white hover:text-monka-text border border-transparent hover:border-monka-border'
                                                                                    }
                                        `}
                                                                                style={answers[q.id] === opt ? { backgroundColor: qVColor } : {}}
                                                                            >
                                                                                {opt}
                                                                            </button>
                                                                        ))}
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
                    </div>
                </div>

                {/* RIGHT — Engine View */}
                <div className="w-[55%] flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                        <button
                            onClick={() => setViewMode('internal')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                ${viewMode === 'internal' ? 'bg-monka-dark text-white' : 'bg-white/60 text-monka-text/50 hover:text-monka-text'}`}
                        >
                            <Cog className="w-3.5 h-3.5" />
                            Vue Interne
                        </button>
                        <button
                            onClick={() => setViewMode('external')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                ${viewMode === 'external' ? 'bg-monka-primary text-white' : 'bg-white/60 text-monka-text/50 hover:text-monka-text'}`}
                        >
                            <Eye className="w-3.5 h-3.5" />
                            Vue Externe
                        </button>
                    </div>

                    <div className="glass-card flex-1 flex flex-col overflow-hidden">
                        <AnimatePresence mode="wait">
                            {viewMode === 'internal' && (
                                <motion.div key="internal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col flex-1 overflow-hidden">
                                    {/* Tab bar */}
                                    <div className="flex gap-1 px-3 py-2 border-b border-monka-border">
                                        {internalTabs.map((tab) => {
                                            const Icon = tab.icon
                                            return (
                                                <button key={tab.id} onClick={() => setActiveInternalTab(tab.id)}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                            ${activeInternalTab === tab.id ? 'bg-monka-primary text-white' : 'text-monka-text/50 hover:text-monka-text hover:bg-white/50'}`}
                                                >
                                                    <Icon className="w-3.5 h-3.5" />
                                                    {tab.label}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-5">
                                        <AnimatePresence mode="wait">
                                            <motion.div key={activeInternalTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>

                                                {/* SCORING TAB */}
                                                {activeInternalTab === 'scoring' && (
                                                    <div>
                                                        <h3 className="text-sm font-bold text-monka-heading mb-4">
                                                            Scoring {activeV === 'ALL' ? '— Vue Globale' : `— ${activeV}`}
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {vulnerabilities.map(v => {
                                                                if (activeV !== 'ALL' && activeV !== v.id) return null
                                                                const s = scoreByV[v.id]
                                                                const pct = s.max > 0 ? (s.score / s.max) * 100 : 0
                                                                const thresholds = getThresholdsForVuln(data, v.id)
                                                                const threshold = thresholds.find(t => s.score >= t.min_score && s.score <= t.max_score)

                                                                return (
                                                                    <div key={v.id} className="glass p-4 rounded-xl">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-xs font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: v.color }}>{v.id}</span>
                                                                                <span className="text-sm font-medium text-monka-heading">{v.label}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                {threshold && (
                                                                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${getThresholdColor(threshold.level)}20`, color: getThresholdColor(threshold.level) }}>
                                                                                        {threshold.level}
                                                                                    </span>
                                                                                )}
                                                                                <span className="text-sm font-bold text-monka-heading">{s.score}/{s.max}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                                            <motion.div className="h-full rounded-full" style={{ backgroundColor: v.color }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
                                                                        </div>
                                                                        {threshold && (
                                                                            <p className="text-[10px] text-monka-muted mt-1">{threshold.description}</p>
                                                                        )}
                                                                    </div>
                                                                )
                                                            })}
                                                            {activeV === 'ALL' && (
                                                                <div className="glass p-4 rounded-xl mt-2 border-2 border-monka-primary/20">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-sm font-bold text-monka-heading">Score Total</span>
                                                                        <span className="text-2xl font-bold text-monka-heading">{totalScore}/{totalMax}</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* ACTIVATION TAB */}
                                                {activeInternalTab === 'activation' && (
                                                    <div>
                                                        <h3 className="text-sm font-bold text-monka-heading mb-4">
                                                            Micro-Parcours — {data.microParcours.length} MP ({activatedMPs.length} actifs)
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {data.microParcours
                                                                .filter(mp => activeV === 'ALL' || mp.vulnerability_id === activeV)
                                                                .map(mp => {
                                                                    const isActive = activatedMPs.includes(mp.id)
                                                                    const mpColor = vColorMap[mp.vulnerability_id as VulnerabilityId] || '#999'
                                                                    return (
                                                                        <div key={mp.id} className={`p-3 rounded-xl border flex items-start gap-3 transition-all duration-300 ${isActive ? 'border-monka-primary/30' : 'bg-white/30 border-transparent'}`}
                                                                            style={isActive ? { backgroundColor: `${mpColor}10` } : {}}>
                                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isActive ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
                                                                                style={isActive ? { backgroundColor: mpColor } : {}}>
                                                                                {mp.id}
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <span className={`text-sm font-medium ${isActive ? 'text-monka-heading' : 'text-monka-muted'}`}>{mp.nom}</span>
                                                                                {mp.objectif && <p className="text-[10px] text-monka-muted mt-0.5">{mp.objectif}</p>}
                                                                                {isActive && mp.signature_a && (
                                                                                    <div className="flex gap-2 mt-1.5">
                                                                                        <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">{mp.signature_a}</span>
                                                                                        {mp.signature_b && <span className="text-[9px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded">{mp.signature_b}</span>}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            {isActive ? (
                                                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0" style={{ backgroundColor: mpColor }}>ACTIF</span>
                                                                            ) : (
                                                                                <span className="text-[10px] text-monka-muted bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">Inactif</span>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                })}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* RECOMMENDATIONS TAB */}
                                                {activeInternalTab === 'recommendations' && (() => {
                                                    const filteredRecos = data.recommendations
                                                        .filter(r => activeV === 'ALL' || r.vulnerability_id === activeV)
                                                    // Group by MP for clarity
                                                    const recosByMP: Record<string, typeof filteredRecos> = {}
                                                    filteredRecos.forEach(r => {
                                                        if (!recosByMP[r.mp_id]) recosByMP[r.mp_id] = []
                                                        recosByMP[r.mp_id].push(r)
                                                    })
                                                    return (
                                                        <div>
                                                            <h3 className="text-sm font-bold text-monka-heading mb-4">
                                                                Recommandations ({filteredRecos.length}) — {Object.keys(recosByMP).length} MP
                                                            </h3>
                                                            <div className="space-y-3">
                                                                {Object.entries(recosByMP).map(([mpId, recos]) => {
                                                                    const mp = mpMap[mpId]
                                                                    const mpColor = vColorMap[(mp?.vulnerability_id || recos[0]?.vulnerability_id) as VulnerabilityId] || '#999'
                                                                    const isActive = activatedMPs.includes(mpId)
                                                                    // Max criticality for MP
                                                                    const critOrder = { critique: 3, ccc: 2, standard: 1 }
                                                                    const maxCrit = recos.reduce((max, r) => {
                                                                        const level = critOrder[r.niveau as keyof typeof critOrder] || 0
                                                                        return level > max ? level : max
                                                                    }, 0)
                                                                    const maxCritLabel = maxCrit === 3 ? 'critique' : maxCrit === 2 ? 'ccc' : 'standard'
                                                                    const critCls = maxCritLabel === 'critique'
                                                                        ? 'bg-red-50 text-red-600 border-red-200'
                                                                        : maxCritLabel === 'ccc'
                                                                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                                            : 'bg-emerald-50 text-emerald-600 border-emerald-200'

                                                                    return (
                                                                        <div key={mpId} className={`rounded-xl border overflow-hidden ${isActive ? 'border-monka-primary/30' : 'border-monka-border'}`}>
                                                                            {/* MP header */}
                                                                            <div className={`px-4 py-2.5 flex items-center gap-2 ${isActive ? 'bg-monka-primary/5' : 'bg-gray-50/50'}`}>
                                                                                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: mpColor }}>{mpId}</span>
                                                                                <span className="text-xs font-medium text-monka-heading flex-1 truncate">{mp?.nom || mpId}</span>
                                                                                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${critCls}`}>{maxCritLabel}</span>
                                                                                {isActive && <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">ACTIF</span>}
                                                                            </div>
                                                                            {/* Recos for this MP */}
                                                                            <div className="divide-y divide-monka-border">
                                                                                {recos.map(reco => {
                                                                                    const niveauCls = reco.niveau === 'critique'
                                                                                        ? 'bg-red-50 text-red-600 border-red-200'
                                                                                        : reco.niveau === 'ccc'
                                                                                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                                                            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                                                    // MTs linked to this reco
                                                                                    const recoMTs = data.microTaches.filter(mt => mt.reco_id === reco.id)
                                                                                    const contributiveMTs = recoMTs.filter(mt => ['STRUC', 'SEC', 'MED'].includes(mt.type || ''))
                                                                                    const nonContributiveMTs = recoMTs.filter(mt => ['INFO', 'ORGA'].includes(mt.type || ''))

                                                                                    return (
                                                                                        <div key={reco.id} className="px-4 py-3">
                                                                                            <div className="flex items-center gap-2 mb-1.5">
                                                                                                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${niveauCls}`}>{reco.niveau}</span>
                                                                                                {reco.activation_rule_id && (
                                                                                                    <span className="text-[9px] text-monka-muted font-mono">← {reco.activation_rule_id}</span>
                                                                                                )}
                                                                                            </div>
                                                                                            <p className="text-sm text-monka-text leading-snug mb-1">{reco.texte_utilisateur}</p>
                                                                                            {/* Contributive MTs */}
                                                                                            {contributiveMTs.length > 0 && (
                                                                                                <div className="mt-2 pl-3 border-l-2 border-emerald-200 space-y-1">
                                                                                                    <span className="text-[9px] font-bold text-emerald-600 uppercase">📍 Sécurisation ({contributiveMTs.length})</span>
                                                                                                    {contributiveMTs.map(mt => (
                                                                                                        <div key={mt.id} className="flex items-center gap-1.5 text-[11px]">
                                                                                                            <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                                                                                            <span className="text-monka-text">{mt.libelle}</span>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            )}
                                                                                            {/* Non-contributive MTs */}
                                                                                            {nonContributiveMTs.length > 0 && (
                                                                                                <div className="mt-1.5 pl-3 border-l-2 border-gray-200 space-y-1">
                                                                                                    <span className="text-[9px] font-bold text-gray-400 uppercase">💡 Amélioration ({nonContributiveMTs.length})</span>
                                                                                                    {nonContributiveMTs.map(mt => (
                                                                                                        <div key={mt.id} className="flex items-center gap-1.5 text-[11px]">
                                                                                                            <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>{mt.type}</span>
                                                                                                            <span className="text-monka-muted">{mt.libelle}</span>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })()}

                                                {/* RULES TAB */}
                                                {activeInternalTab === 'rules' && (
                                                    <div>
                                                        <h3 className="text-sm font-bold text-monka-heading mb-4">
                                                            Règles d'activation ({data.activationRules.filter(r => activeV === 'ALL' || r.vulnerability_id === activeV).length})
                                                        </h3>
                                                        <div className="divide-y divide-monka-border rounded-xl border border-monka-border overflow-hidden">
                                                            {data.activationRules
                                                                .filter(r => activeV === 'ALL' || r.vulnerability_id === activeV)
                                                                .map(rule => {
                                                                    const ruleColor = vColorMap[rule.vulnerability_id as VulnerabilityId] || '#999'
                                                                    const allAnswered = rule.question_ids.every(qid => answers[qid])
                                                                    const isActivated = activatedMPs.includes(rule.mp_id)

                                                                    return (
                                                                        <div key={rule.id} className={`px-4 py-3 text-xs transition-all ${isActivated ? 'bg-green-50/50' : 'bg-white/30'}`}>
                                                                            <div className="flex items-center gap-2 mb-1.5">
                                                                                <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: ruleColor }}>{rule.mp_id}</span>
                                                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${rule.niveau === 'critique' ? 'bg-red-100 text-red-600' :
                                                                                    rule.niveau === 'ccc' ? 'bg-orange-100 text-orange-600' :
                                                                                        'bg-blue-100 text-blue-600'
                                                                                    }`}>{rule.niveau}</span>
                                                                                {rule.sens_clinique && <span className="text-monka-muted truncate flex-1">{rule.sens_clinique}</span>}
                                                                            </div>
                                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                                {rule.question_ids.map(qid => (
                                                                                    <span key={qid} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${answers[qid] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                                                        {qid} {answers[qid] ? '✓' : '○'}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                            {isActivated && <div className="mt-1.5 text-green-600 text-[10px] font-bold">→ MP {rule.mp_id} ACTIVÉ</div>}
                                                                        </div>
                                                                    )
                                                                })}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* TASKS TAB */}
                                                {activeInternalTab === 'tasks' && (() => {
                                                    const filteredMTs = data.microTaches
                                                        .filter(mt => activeV === 'ALL' || mt.vulnerability_id === activeV)
                                                    const contributive = filteredMTs.filter(mt => ['STRUC', 'SEC', 'MED'].includes(mt.type || ''))
                                                    const nonContributive = filteredMTs.filter(mt => ['INFO', 'ORGA'].includes(mt.type || ''))
                                                    // Filter out generic "Aidant" actors
                                                    const cleanActeur = (a: string | null) => {
                                                        if (!a) return null
                                                        if (a.toLowerCase().includes('aidant') || a.toLowerCase().includes('autonome')) return null
                                                        return a
                                                    }
                                                    return (
                                                        <div>
                                                            <h3 className="text-sm font-bold text-monka-heading mb-2">
                                                                Micro-Tâches ({filteredMTs.length})
                                                            </h3>
                                                            <div className="flex gap-2 mb-4 text-[10px]">
                                                                <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-bold">📍 Sécurisation: {contributive.length}</span>
                                                                <span className="px-2 py-1 rounded bg-gray-100 text-gray-500 font-bold">💡 Amélioration: {nonContributive.length}</span>
                                                            </div>

                                                            {/* Contributive MTs */}
                                                            {contributive.length > 0 && (
                                                                <div className="mb-3">
                                                                    <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1.5 px-1">📍 Sécurisation — valident l'ASR</div>
                                                                    <div className="divide-y divide-monka-border rounded-xl border border-emerald-200 overflow-hidden">
                                                                        {contributive.slice(0, 25).map(mt => {
                                                                            const mtColor = vColorMap[mt.vulnerability_id as VulnerabilityId] || '#999'
                                                                            const domainLabel = mt.domaine === 'medical' ? 'Médical' : mt.domaine === 'medico-social' ? 'Médico-social' : mt.domaine || '—'
                                                                            const domainColor = mt.domaine === 'medical' ? 'bg-rose-100 text-rose-700' : 'bg-teal-100 text-teal-700'
                                                                            const acteur = cleanActeur(mt.acteur)
                                                                            return (
                                                                                <div key={mt.id} className="px-4 py-2.5 bg-white/30 hover:bg-white/50 transition-all text-xs">
                                                                                    <div className="flex items-center gap-2 mb-1">
                                                                                        <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: mtColor }}>{mt.vulnerability_id}</span>
                                                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${domainColor}`}>{domainLabel}</span>
                                                                                        {acteur && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{acteur}</span>}
                                                                                    </div>
                                                                                    <p className="text-sm text-monka-text">{mt.libelle}</p>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Non-contributive MTs */}
                                                            {nonContributive.length > 0 && (
                                                                <div>
                                                                    <div className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 px-1">💡 Amélioration — qualité de vie</div>
                                                                    <div className="divide-y divide-monka-border rounded-xl border border-gray-200 overflow-hidden">
                                                                        {nonContributive.slice(0, 25).map(mt => {
                                                                            const mtColor = vColorMap[mt.vulnerability_id as VulnerabilityId] || '#999'
                                                                            const domainLabel = mt.domaine === 'medical' ? 'Médical' : mt.domaine === 'medico-social' ? 'Médico-social' : mt.domaine || '—'
                                                                            const domainColor = mt.domaine === 'medical' ? 'bg-rose-100 text-rose-700' : 'bg-teal-100 text-teal-700'
                                                                            const acteur = cleanActeur(mt.acteur)
                                                                            return (
                                                                                <div key={mt.id} className="px-4 py-2.5 bg-white/20 hover:bg-white/40 transition-all text-xs">
                                                                                    <div className="flex items-center gap-2 mb-1">
                                                                                        <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: mtColor }}>{mt.vulnerability_id}</span>
                                                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>{mt.type}</span>
                                                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${domainColor}`}>{domainLabel}</span>
                                                                                        {acteur && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{acteur}</span>}
                                                                                    </div>
                                                                                    <p className="text-sm text-monka-muted">{mt.libelle}</p>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })()}

                                                {/* SUMMARY TAB */}
                                                {activeInternalTab === 'summary' && (
                                                    <div>
                                                        <h3 className="text-sm font-bold text-monka-heading mb-4">
                                                            Résumé {activeV === 'ALL' ? '— Toutes vulnérabilités' : `— ${activeV}`}
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                                            <div className="p-4 rounded-xl bg-monka-primary/5 border border-monka-primary/15">
                                                                <p className="text-[10px] text-monka-muted uppercase tracking-wider">Score</p>
                                                                <p className="text-2xl font-bold text-monka-heading">{displayScore.score}/{displayScore.max}</p>
                                                            </div>
                                                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/50">
                                                                <p className="text-[10px] text-monka-muted uppercase tracking-wider">MP Actifs</p>
                                                                <p className="text-2xl font-bold text-monka-heading">{activatedMPs.length}/{data.microParcours.length}</p>
                                                            </div>
                                                            <div className="p-4 rounded-xl bg-green-50 border border-green-200/50">
                                                                <p className="text-[10px] text-monka-muted uppercase tracking-wider">Réponses</p>
                                                                <p className="text-2xl font-bold text-monka-heading">{answeredCount}/{totalCount}</p>
                                                            </div>
                                                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/50">
                                                                <p className="text-[10px] text-monka-muted uppercase tracking-wider">Recommandations</p>
                                                                <p className="text-2xl font-bold text-monka-heading">{data.recommendations.filter(r => activeV === 'ALL' || r.vulnerability_id === activeV).length}</p>
                                                            </div>
                                                        </div>

                                                        {/* Data source info */}
                                                        <div className="glass p-4 rounded-xl mt-4">
                                                            <h4 className="text-xs font-bold text-monka-heading mb-2">📊 Données Supabase (temps réel)</h4>
                                                            <div className="grid grid-cols-3 gap-2 text-[10px]">
                                                                <div><span className="text-monka-muted">Questions:</span> <span className="font-bold text-monka-heading">{data.questions.length}</span></div>
                                                                <div><span className="text-monka-muted">MP:</span> <span className="font-bold text-monka-heading">{data.microParcours.length}</span></div>
                                                                <div><span className="text-monka-muted">Règles:</span> <span className="font-bold text-monka-heading">{data.activationRules.length}</span></div>
                                                                <div><span className="text-monka-muted">Recos:</span> <span className="font-bold text-monka-heading">{data.recommendations.length}</span></div>
                                                                <div><span className="text-monka-muted">Micro-Tâches:</span> <span className="font-bold text-monka-heading">{data.microTaches.length}</span></div>
                                                                <div><span className="text-monka-muted">Scoring Q:</span> <span className="font-bold text-monka-heading">{data.scoringQuestions.length}</span></div>
                                                            </div>
                                                        </div>

                                                        {activeV === 'ALL' && (
                                                            <div className="space-y-2 mt-4">
                                                                {vulnerabilities.map(v => {
                                                                    const s = scoreByV[v.id]
                                                                    return (
                                                                        <div key={v.id} className="flex items-center gap-3 text-xs">
                                                                            <span className="font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: v.color }}>{v.id}</span>
                                                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                                <div className="h-full rounded-full transition-all" style={{ width: `${s.max > 0 ? (s.score / s.max) * 100 : 0}%`, backgroundColor: v.color }} />
                                                                            </div>
                                                                            <span className="text-monka-muted">{s.score}/{s.max}</span>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}

                            {/* VUE EXTERNE */}
                            {viewMode === 'external' && (
                                <motion.div key="external" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Eye className="w-4 h-4 text-monka-primary" />
                                        <h3 className="text-sm font-bold text-monka-heading">Vue Utilisateur — Parcours personnalisé</h3>
                                    </div>

                                    {activatedMPs.length === 0 ? (
                                        <div className="text-center py-16 text-monka-muted text-sm">
                                            <Users className="w-12 h-12 text-monka-muted/30 mx-auto mb-3" />
                                            <p>Aucun parcours activé</p>
                                            <p className="text-xs mt-1">Répondez aux questions pour voir le rendu utilisateur</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            {activatedMPs.map(mpId => {
                                                const mp = mpMap[mpId]
                                                if (!mp) return null
                                                const mpRecos = data.recommendations.filter(r => r.mp_id === mpId)
                                                // Compute max criticality for this MP
                                                const critOrder: Record<string, number> = { critique: 3, ccc: 2, standard: 1 }
                                                const maxCrit = mpRecos.reduce((max, r) => {
                                                    const level = critOrder[r.niveau || ''] || 0
                                                    return level > max ? level : max
                                                }, 0)
                                                const maxCritLabel = maxCrit === 3 ? 'critique' : maxCrit === 2 ? 'ccc' : 'standard'
                                                const critColorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
                                                    critique: { bg: '#EF4444', text: '#FECACA', border: '#EF444440', gradient: 'linear-gradient(135deg, #DC2626, #B91C1C)' },
                                                    ccc: { bg: '#F59E0B', text: '#FEF3C7', border: '#F59E0B40', gradient: 'linear-gradient(135deg, #D97706, #B45309)' },
                                                    standard: { bg: '#10B981', text: '#D1FAE5', border: '#10B98140', gradient: 'linear-gradient(135deg, #059669, #047857)' },
                                                }
                                                const critColors = critColorMap[maxCritLabel] || critColorMap.standard
                                                // All MTs for this MP (via reco_id linkage)
                                                const mpRecoIds = new Set(mpRecos.map(r => r.id))
                                                const mpMTs = data.microTaches.filter(mt => mt.reco_id && mpRecoIds.has(mt.reco_id))
                                                const contributiveMTs = mpMTs.filter(mt => ['STRUC', 'SEC', 'MED'].includes(mt.type || ''))
                                                const nonContributiveMTs = mpMTs.filter(mt => ['INFO', 'ORGA'].includes(mt.type || ''))

                                                return (
                                                    <div key={mpId} className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: critColors.border }}>
                                                        {/* MP Header — colored by max criticality */}
                                                        <div className="px-5 py-4" style={{ background: critColors.gradient }}>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-white/80 text-xs font-bold bg-white/20 px-2 py-0.5 rounded">{mpId}</span>
                                                                <span className="text-white/60 text-xs">{mp.vulnerability_id}</span>
                                                                <span className="text-white text-[10px] font-bold bg-white/25 px-1.5 py-0.5 rounded uppercase">{maxCritLabel}</span>
                                                            </div>
                                                            <h4 className="text-white font-bold text-base">{mp.nom}</h4>
                                                            {/* ASR objective */}
                                                            {mp.objectif && (
                                                                <div className="mt-2 flex items-start gap-1.5">
                                                                    <span className="text-white/90 text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">🎯 ASR</span>
                                                                    <p className="text-white/90 text-xs">{mp.objectif}</p>
                                                                </div>
                                                            )}
                                                            {/* MT counts */}
                                                            <div className="flex gap-3 mt-2">
                                                                <span className="text-white/70 text-[10px]">📍 {contributiveMTs.length} sécu</span>
                                                                <span className="text-white/70 text-[10px]">💡 {nonContributiveMTs.length} amél</span>
                                                            </div>
                                                        </div>

                                                        {/* Signatures */}
                                                        {mp.signature_a && (
                                                            <div className="px-5 py-2 bg-white/60 border-b border-monka-border flex gap-2">
                                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded border border-green-200">{mp.signature_a}</span>
                                                                {mp.signature_b && <span className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded border border-red-200">{mp.signature_b}</span>}
                                                            </div>
                                                        )}

                                                        {/* Recommendations grouped with proper MT linkage */}
                                                        {mpRecos.length > 0 ? (
                                                            <div className="divide-y divide-monka-border">
                                                                {mpRecos.map(reco => {
                                                                    const niveauCls = reco.niveau === 'critique'
                                                                        ? 'bg-red-50 text-red-600 border-red-200'
                                                                        : reco.niveau === 'ccc'
                                                                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                                            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                                    // MTs actually linked to this reco
                                                                    const recoMTs = data.microTaches.filter(mt => mt.reco_id === reco.id)
                                                                    const recoContrib = recoMTs.filter(mt => ['STRUC', 'SEC', 'MED'].includes(mt.type || ''))
                                                                    const recoNonContrib = recoMTs.filter(mt => ['INFO', 'ORGA'].includes(mt.type || ''))

                                                                    return (
                                                                        <div key={reco.id} className="px-5 py-4">
                                                                            {/* Reco header */}
                                                                            <div className="flex items-start gap-2 mb-2">
                                                                                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: critColors.bg }} />
                                                                                <div className="flex-1">
                                                                                    <div className="flex items-center gap-2 mb-1">
                                                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${niveauCls}`}>{reco.niveau}</span>
                                                                                    </div>
                                                                                    <p className="text-sm text-monka-text font-medium leading-snug">{reco.texte_utilisateur}</p>
                                                                                </div>
                                                                            </div>

                                                                            {/* Contributive MTs — Sécurisation */}
                                                                            {recoContrib.length > 0 && (
                                                                                <div className="ml-6 mt-2 space-y-1 border-l-2 border-emerald-200 pl-3">
                                                                                    <span className="text-[9px] font-bold text-emerald-600 uppercase">📍 Sécurisation</span>
                                                                                    {recoContrib.map(mt => {
                                                                                        const acteur = mt.acteur && !mt.acteur.toLowerCase().includes('aidant') && !mt.acteur.toLowerCase().includes('autonome') ? mt.acteur : null
                                                                                        return (
                                                                                            <div key={mt.id} className="flex items-center gap-2 text-xs py-1">
                                                                                                <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                                                                                <span className="text-monka-text flex-1">{mt.libelle}</span>
                                                                                                {acteur && <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{acteur}</span>}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            )}

                                                                            {/* Non-contributive MTs — Amélioration */}
                                                                            {recoNonContrib.length > 0 && (
                                                                                <div className="ml-6 mt-1.5 space-y-1 border-l-2 border-gray-200 pl-3">
                                                                                    <span className="text-[9px] font-bold text-gray-400 uppercase">💡 Amélioration</span>
                                                                                    {recoNonContrib.map(mt => {
                                                                                        const acteur = mt.acteur && !mt.acteur.toLowerCase().includes('aidant') && !mt.acteur.toLowerCase().includes('autonome') ? mt.acteur : null
                                                                                        return (
                                                                                            <div key={mt.id} className="flex items-center gap-2 text-xs py-1">
                                                                                                <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>{mt.type}</span>
                                                                                                <span className="text-monka-muted flex-1">{mt.libelle}</span>
                                                                                                {acteur && <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{acteur}</span>}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <div className="px-5 py-4 text-xs text-monka-muted italic">
                                                                Aucune recommandation pour ce micro-parcours
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
