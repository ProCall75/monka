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
    RefreshCw,
} from 'lucide-react'
import type { VulnerabilityId } from '../engine/types'
import { useMonkaData } from '../engine/useMonkaData'
import { VULN_META, VULN_IDS, VULN_COLORS } from '../engine/constants'
import { evaluateRule, getActivatedCategories } from '../engine/clinicalEngine'
import {
    CR_VULN_LABELS,
    CR_NIVEAU_DISPLAY,
    CR_PHR_B2,
    CR_PHR_B4_INITIAL,
    getNiveauForScore,
    generateConclusionPhrases,
    mapObjectifClinique,
    formatActeur,
    type CRNiveau,
} from '../engine/crMedecinPhrases'
import {
    getQuestionsForVuln,
    getAllQuestions,
    buildQuestionMPMap,
    buildMPMap,
    buildScoringMap,

    getThresholdsForVuln,

    buildMPVulnMap,
    invalidateCache,
    type MonkaData,
    type DBQuestion,
} from '../engine/supabaseData'

// === Types ===
type InternalTab = 'scoring' | 'activation' | 'recommendations' | 'rules' | 'tasks' | 'summary'
type ViewMode = 'internal' | 'external'
type VFilter = VulnerabilityId | 'ALL'

const vulnerabilities = VULN_IDS.map(id => ({
    id,
    label: VULN_META[id].name,
    color: VULN_META[id].color,
    icon: VULN_META[id].icon,
}))

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

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
                    <p className="text-sm text-monka-muted">150 questions • 24 micro-parcours • 68 règles d'activation</p>
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

    // Compute max score per vulnerability: sum of max(score) per question
    const maxScoreByV = useMemo(() => {
        const result: Record<string, number> = {}
        vulnerabilities.forEach(v => {
            const vulnQuestions = data.scoringQuestions.filter(sq => sq.vulnerability_id === v.id)
            const questionIds = [...new Set(vulnQuestions.map(sq => sq.question_id))]
            result[v.id] = questionIds.reduce((sum, qid) => {
                const maxForQ = Math.max(...vulnQuestions.filter(sq => sq.question_id === qid).map(sq => sq.score))
                return sum + maxForQ
            }, 0)
        })
        return result
    }, [data])

    // Score computation using actual scoring_questions values
    const scoreByV = useMemo(() => {
        const result: Record<string, { score: number; max: number }> = {}
        vulnerabilities.forEach(v => {
            const maxScore = maxScoreByV[v.id] || 0
            // Get all scoring question IDs for this vulnerability
            const vulnScoringQIds = [...new Set(
                data.scoringQuestions.filter(sq => sq.vulnerability_id === v.id).map(sq => sq.question_id)
            )]
            let score = 0
            vulnScoringQIds.forEach(qid => {
                const answer = answers[qid]
                if (answer && scoringMap[qid]) {
                    // Look up the actual score for this answer
                    const pts = scoringMap[qid][answer]
                    if (pts !== undefined) score += pts
                }
            })
            result[v.id] = { score: Math.min(score, maxScore), max: maxScore }
        })
        return result
    }, [data, answers, scoringMap, maxScoreByV])

    const totalScore = Object.values(scoreByV).reduce((a, b) => a + b.score, 0)
    const totalMax = Object.values(scoreByV).reduce((a, b) => a + b.max, 0)
    const displayScore = activeV === 'ALL'
        ? { score: totalScore, max: totalMax }
        : scoreByV[activeV] || { score: 0, max: 0 }

    // Activated MPs (based on activation rules)
    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])

    // Category-level activation from clinical engine
    const activatedCats = useMemo(() => {
        return getActivatedCategories(data, answers, activeV === 'ALL' ? undefined : activeV as VulnerabilityId)
    }, [data, answers, activeV])

    const activatedMPs = useMemo(() => {
        const activated = new Set<string>()
        for (const cat of activatedCats.values()) {
            activated.add(cat.mpId)
        }
        return Array.from(activated)
    }, [activatedCats])

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

                                                        {/* Circular gauge hero */}
                                                        <div className="flex justify-center mb-5">
                                                            {(() => {
                                                                const s = displayScore
                                                                const pct = s.max > 0 ? (s.score / s.max) * 100 : 0
                                                                const radius = 54
                                                                const stroke = 8
                                                                const circumference = 2 * Math.PI * radius
                                                                const offset = circumference - (pct / 100) * circumference
                                                                const gaugeColor = pct >= 70 ? '#ef4444' : pct >= 40 ? '#f59e0b' : '#22c55e'
                                                                return (
                                                                    <div className="relative w-36 h-36">
                                                                        <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
                                                                            <circle cx="72" cy="72" r={radius} fill="none" stroke="#f0f0f0" strokeWidth={stroke} />
                                                                            <motion.circle
                                                                                cx="72" cy="72" r={radius} fill="none"
                                                                                stroke={gaugeColor}
                                                                                strokeWidth={stroke}
                                                                                strokeLinecap="round"
                                                                                strokeDasharray={circumference}
                                                                                initial={{ strokeDashoffset: circumference }}
                                                                                animate={{ strokeDashoffset: offset }}
                                                                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                                                            />
                                                                        </svg>
                                                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                                            <span className="text-2xl font-bold text-monka-heading">{s.score}</span>
                                                                            <span className="text-[10px] text-monka-muted">/ {s.max}</span>
                                                                            <span className="text-[10px] font-semibold mt-0.5" style={{ color: gaugeColor }}>{Math.round(pct)}%</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })()}
                                                        </div>

                                                        {/* Per-vulnerability breakdown */}
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
                                                        .filter(r => activeV === 'ALL' || mpVulnMap[r.mp_id] === activeV)

                                                    // Build set of activated category IDs with their niveau
                                                    const activeCatNiveau = new Map<string, string>()
                                                    for (const [catId, cat] of activatedCats.entries()) {
                                                        activeCatNiveau.set(catId, cat.niveau)
                                                    }

                                                    // Split recos: activated (category+niveau match), prevention (from non-activated MPs), and other inactive
                                                    const activeRecosByMP: Record<string, typeof filteredRecos> = {}
                                                    const preventionRecosByMP: Record<string, typeof filteredRecos> = {}
                                                    const inactiveRecosByMP: Record<string, typeof filteredRecos> = {}
                                                    const activatedMPSet = new Set(activatedMPs)
                                                    filteredRecos.forEach(r => {
                                                        const catNiveau = activeCatNiveau.get(r.category_id)
                                                        if (catNiveau && r.niveau === catNiveau) {
                                                            // This reco's category is activated AND its niveau matches the activated level
                                                            if (!activeRecosByMP[r.mp_id]) activeRecosByMP[r.mp_id] = []
                                                            activeRecosByMP[r.mp_id].push(r)
                                                        } else if (r.niveau === 'prevention' && !activatedMPSet.has(r.mp_id)) {
                                                            // Prevention reco from a non-activated MP
                                                            if (!preventionRecosByMP[r.mp_id]) preventionRecosByMP[r.mp_id] = []
                                                            preventionRecosByMP[r.mp_id].push(r)
                                                        } else {
                                                            if (!inactiveRecosByMP[r.mp_id]) inactiveRecosByMP[r.mp_id] = []
                                                            inactiveRecosByMP[r.mp_id].push(r)
                                                        }
                                                    })
                                                    const activeRecoCount = Object.values(activeRecosByMP).reduce((s, r) => s + r.length, 0)
                                                    const preventionRecoCount = Object.values(preventionRecosByMP).reduce((s, r) => s + r.length, 0)
                                                    const inactiveRecoCount = Object.values(inactiveRecosByMP).reduce((s, r) => s + r.length, 0)

                                                    // Get fired rules for a category
                                                    const firedRulesForCat = (catId: string) => {
                                                        const cat = activatedCats.get(catId)
                                                        return cat?.firedRules || []
                                                    }

                                                    // Format the Q&A combo for a rule
                                                    const formatRuleQA = (rule: typeof data.activationRules[0]) => {
                                                        const conditions = rule.condition_logic as unknown as { q: string; op: string; val?: string; vals?: string[]; min?: number }[]
                                                        if (!conditions || !Array.isArray(conditions)) return ''
                                                        return conditions.map(c => {
                                                            const answer = answers[c.q]
                                                            const answerStr = answer ? (Array.isArray(answer) ? answer.join(', ') : String(answer)) : '—'
                                                            return `${c.q} = "${answerStr}"`
                                                        }).join(' + ')
                                                    }

                                                    const renderMPRecoBlock = (mpId: string, recos: typeof filteredRecos, mode: 'active' | 'prevention' | 'inactive') => {
                                                        const mp = mpMap[mpId]
                                                        const mpColor = vColorMap[(mp?.vulnerability_id || mpVulnMap[mpId]) as VulnerabilityId] || '#999'
                                                        const isActive = mode === 'active'
                                                        const isPrevention = mode === 'prevention'
                                                        // For active recos, determine the activated niveau
                                                        const activatedNiveau = isActive && recos.length > 0 ? recos[0].niveau : isPrevention ? 'prevention' : null
                                                        const niveauCls = activatedNiveau === 'critique'
                                                            ? 'bg-red-50 text-red-600 border-red-200'
                                                            : activatedNiveau === 'ccc'
                                                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                                : activatedNiveau === 'prevention'
                                                                    ? 'bg-purple-50 text-purple-600 border-purple-200'
                                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'

                                                        // Get all unique fired rules for the active categories in this MP
                                                        const allFiredRules = isActive
                                                            ? [...new Set(recos.flatMap(r => firedRulesForCat(r.category_id)))]
                                                            : []

                                                        const borderCls = isActive
                                                            ? 'border-green-300 shadow-sm shadow-green-100'
                                                            : isPrevention
                                                                ? 'border-purple-300 shadow-sm shadow-purple-50'
                                                                : 'border-monka-border opacity-60'
                                                        const headerBg = isActive
                                                            ? 'bg-green-50'
                                                            : isPrevention
                                                                ? 'bg-purple-50/50'
                                                                : 'bg-gray-50/50'

                                                        return (
                                                            <div key={mpId} className={`rounded-xl border overflow-hidden ${borderCls}`}>
                                                                {/* MP header */}
                                                                <div className={`px-4 py-2.5 flex items-center gap-2 ${headerBg}`}>
                                                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: mpColor }}>{mpVulnMap[mpId]}</span>
                                                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded bg-gray-600">{mpId}</span>
                                                                    <span className="text-xs font-medium text-monka-heading flex-1 truncate">{mp?.nom || mpId}</span>
                                                                    {activatedNiveau && <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${niveauCls}`}>{activatedNiveau}</span>}
                                                                    {isActive && <span className="text-[10px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded font-bold">✓ ACTIVÉ</span>}
                                                                    {isPrevention && <span className="text-[10px] text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded font-bold">🛡 PRÉVENTION</span>}
                                                                </div>
                                                                {/* Triggered rules with Q&A explanation */}
                                                                {allFiredRules.length > 0 && (
                                                                    <div className="px-4 py-2 bg-green-50/50 border-b border-green-200/50 space-y-1">
                                                                        {allFiredRules.map(r => (
                                                                            <div key={r.id} className="text-[10px]">
                                                                                <span className={`inline-block px-1 py-0.5 rounded font-bold mr-1 ${r.niveau === 'critique' ? 'bg-red-100 text-red-600' : r.niveau === 'ccc' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>{r.niveau}</span>
                                                                                <span className="text-green-700 font-mono">{formatRuleQA(r)}</span>
                                                                                <span className="text-green-600 ml-1">→ {r.sens_clinique || r.category_id}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {/* Recos for this MP */}
                                                                <div className="divide-y divide-monka-border">
                                                                    {recos.map(reco => {
                                                                        const recoCls = reco.niveau === 'critique'
                                                                            ? 'bg-red-50 text-red-600 border-red-200'
                                                                            : reco.niveau === 'ccc'
                                                                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                                                : reco.niveau === 'prevention'
                                                                                    ? 'bg-purple-50 text-purple-600 border-purple-200'
                                                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                                        // For prevention mode, only show is_prevention MTs (simple INFO/ORGA), not the regular category MTs
                                                                        const recoMTs = isPrevention
                                                                            ? data.microTaches.filter(mt => mt.mp_id === mpId && mt.is_prevention)
                                                                            : data.microTaches.filter(mt => mt.category_id === reco.category_id && !mt.is_prevention)
                                                                        const contributiveMTs = recoMTs.filter(mt => mt.is_contributive)
                                                                        const nonContributiveMTs = recoMTs.filter(mt => !mt.is_contributive)
                                                                        const showMTs = isActive || isPrevention

                                                                        return (
                                                                            <div key={reco.id} className="px-4 py-3">
                                                                                <div className="flex items-center gap-2 mb-1.5">
                                                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${recoCls}`}>{reco.niveau}</span>
                                                                                    <span className="text-[9px] text-monka-muted font-mono">{reco.category_id}</span>
                                                                                    <span className="text-[9px] text-monka-muted">→ {recoMTs.length} MT</span>
                                                                                </div>
                                                                                <p className="text-sm text-monka-text leading-snug mb-1">{reco.wording_utilisateur}</p>
                                                                                {showMTs && contributiveMTs.length > 0 && (
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
                                                                                {showMTs && nonContributiveMTs.length > 0 && (
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
                                                    }

                                                    return (
                                                        <div>
                                                            {/* Active section */}
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                                <h3 className="text-sm font-bold text-monka-heading">
                                                                    Recos activées ({activeRecoCount})
                                                                </h3>
                                                                <span className="text-[10px] text-monka-muted">
                                                                    — {Object.keys(activeRecosByMP).length} MP actifs
                                                                </span>
                                                            </div>
                                                            {Object.keys(activeRecosByMP).length === 0 ? (
                                                                <div className="rounded-xl border border-dashed border-monka-border p-6 text-center mb-4">
                                                                    <p className="text-sm text-monka-muted">Aucune catégorie activée — répondez aux questions pour déclencher des règles</p>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-3 mb-4">
                                                                    {Object.entries(activeRecosByMP).map(([mpId, recos]) =>
                                                                        renderMPRecoBlock(mpId, recos, 'active')
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Prevention section — recos from non-activated MPs */}
                                                            {preventionRecoCount > 0 && (
                                                                <div className="mb-4">
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                                        <h3 className="text-sm font-bold text-monka-heading">
                                                                            Prévention ({preventionRecoCount})
                                                                        </h3>
                                                                        <span className="text-[10px] text-monka-muted">
                                                                            — recos de base pour les MP non activés
                                                                        </span>
                                                                    </div>
                                                                    <div className="space-y-3">
                                                                        {Object.entries(preventionRecosByMP).map(([mpId, recos]) =>
                                                                            renderMPRecoBlock(mpId, recos, 'prevention')
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Inactive section — collapsible */}
                                                            {inactiveRecoCount > 0 && (
                                                                <details className="group">
                                                                    <summary className="flex items-center gap-2 cursor-pointer select-none mb-3 text-monka-muted hover:text-monka-text transition-colors">
                                                                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                                                                        <span className="text-xs font-bold">
                                                                            Autres recos ({inactiveRecoCount})
                                                                        </span>
                                                                    </summary>
                                                                    <div className="space-y-3">
                                                                        {Object.entries(inactiveRecosByMP).map(([mpId, recos]) =>
                                                                            renderMPRecoBlock(mpId, recos, 'inactive')
                                                                        )}
                                                                    </div>
                                                                </details>
                                                            )}
                                                        </div>
                                                    )
                                                })()}

                                                {/* RULES TAB */}
                                                {activeInternalTab === 'rules' && (() => {
                                                    const allRules = data.activationRules
                                                        .filter(r => activeV === 'ALL' || mpVulnMap[r.mp_id] === activeV)
                                                    const triggeredRules = allRules.filter(r => evaluateRule(r, answers))
                                                    const untriggeredRules = allRules.filter(r => !evaluateRule(r, answers))

                                                    const renderRule = (rule: typeof allRules[0], isTriggered: boolean) => {
                                                        const ruleVuln = mpVulnMap[rule.mp_id] || ''
                                                        const ruleColor = vColorMap[ruleVuln as VulnerabilityId] || '#999'
                                                        const conditions = rule.condition_logic || []
                                                        return (
                                                            <div key={rule.id} className={`px-4 py-3 text-xs transition-all ${isTriggered ? 'bg-green-50/60' : 'bg-white/30'}`}>
                                                                <div className="flex items-center gap-2 mb-1.5">
                                                                    <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: ruleColor }}>{ruleVuln}</span>
                                                                    <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px] bg-gray-600">{rule.mp_id}</span>
                                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${rule.niveau === 'critique' ? 'bg-red-100 text-red-600' :
                                                                        rule.niveau === 'ccc' ? 'bg-orange-100 text-orange-600' :
                                                                            'bg-blue-100 text-blue-600'
                                                                        }`}>{rule.niveau}</span>
                                                                    {rule.sens_clinique && <span className="text-monka-muted truncate flex-1">{rule.sens_clinique}</span>}
                                                                    {isTriggered && <span className="text-[9px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded font-bold ml-auto">✓ DÉCLENCHÉ</span>}
                                                                </div>
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {conditions.map((cond: Record<string, unknown>, i: number) => {
                                                                        const q = String(cond.q || '')
                                                                        const op = String(cond.op || '')
                                                                        const val = cond.vals ? JSON.stringify(cond.vals) : String(cond.val ?? cond.min ?? '')
                                                                        const answered = !!answers[q]
                                                                        const userAnswer = answers[q]
                                                                        const answerDisplay = userAnswer ? (Array.isArray(userAnswer) ? userAnswer.join(', ') : String(userAnswer)) : ''
                                                                        const condMet = isTriggered && answered
                                                                        return (
                                                                            <span key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${condMet ? 'bg-green-100 text-green-700' : answered ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                                                                                {q} {op} {val} {answered ? `(répondu: "${answerDisplay}")` : '(non répondu)'} {condMet ? '✓' : answered ? '✗' : '○'}
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </div>
                                                                {isTriggered && (
                                                                    <div className="mt-1.5 text-green-600 text-[10px] font-bold">
                                                                        → Contribue à activer MP {rule.mp_id} ({mpMap[rule.mp_id]?.nom || rule.mp_id})
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }

                                                    return (
                                                        <div>
                                                            {/* Triggered rules */}
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                                <h3 className="text-sm font-bold text-monka-heading">
                                                                    Règles déclenchées ({triggeredRules.length})
                                                                </h3>
                                                                <span className="text-[10px] text-monka-muted">/ {allRules.length} total</span>
                                                            </div>
                                                            {triggeredRules.length === 0 ? (
                                                                <div className="rounded-xl border border-dashed border-monka-border p-6 text-center mb-4">
                                                                    <p className="text-sm text-monka-muted">Aucune règle déclenchée — répondez aux questions</p>
                                                                </div>
                                                            ) : (
                                                                <div className="divide-y divide-monka-border rounded-xl border border-green-200 overflow-hidden mb-4">
                                                                    {triggeredRules.map(r => renderRule(r, true))}
                                                                </div>
                                                            )}

                                                            {/* Untriggered rules — collapsible */}
                                                            {untriggeredRules.length > 0 && (
                                                                <details className="group">
                                                                    <summary className="flex items-center gap-2 cursor-pointer select-none mb-3 text-monka-muted hover:text-monka-text transition-colors">
                                                                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                                                                        <span className="text-xs font-bold">
                                                                            Non déclenchées ({untriggeredRules.length})
                                                                        </span>
                                                                    </summary>
                                                                    <div className="divide-y divide-monka-border rounded-xl border border-monka-border overflow-hidden">
                                                                        {untriggeredRules.map(r => renderRule(r, false))}
                                                                    </div>
                                                                </details>
                                                            )}
                                                        </div>
                                                    )
                                                })()}

                                                {/* TASKS TAB */}
                                                {activeInternalTab === 'tasks' && (() => {
                                                    const filteredMTs = data.microTaches
                                                        .filter(mt => activeV === 'ALL' || mpVulnMap[mt.mp_id] === activeV)
                                                    // Filter MTs by activated categories (not just MP)
                                                    const activatedCatIds = new Set(activatedCats.keys())
                                                    const activeMTs = filteredMTs.filter(mt => activatedCatIds.has(mt.category_id))
                                                    const inactiveMTs = filteredMTs.filter(mt => !activatedCatIds.has(mt.category_id))
                                                    const cleanActeurs = (a: string[] | null) => {
                                                        if (!a || a.length === 0) return null
                                                        const filtered = a.filter(x => !x.toLowerCase().includes('aidant') && !x.toLowerCase().includes('autonome'))
                                                        return filtered.length > 0 ? filtered.join(', ') : null
                                                    }

                                                    // Group MTs by MP
                                                    const groupByMP = (mts: typeof filteredMTs) => {
                                                        const map: Record<string, typeof filteredMTs> = {}
                                                        mts.forEach(mt => {
                                                            if (!map[mt.mp_id]) map[mt.mp_id] = []
                                                            map[mt.mp_id].push(mt)
                                                        })
                                                        return map
                                                    }

                                                    const renderMTItem = (mt: typeof filteredMTs[0]) => {
                                                        const mtVuln = mpVulnMap[mt.mp_id] || ''
                                                        const mtColor = vColorMap[mtVuln as VulnerabilityId] || '#999'
                                                        const domainLabel = mt.domaine === 'medical' ? 'Médical' : mt.domaine === 'medico_social' ? 'Médico-social' : mt.domaine || '—'
                                                        const domainColor = mt.domaine === 'medical' ? 'bg-rose-100 text-rose-700' : 'bg-teal-100 text-teal-700'
                                                        const acteurs = cleanActeurs(mt.acteur)
                                                        return (
                                                            <div key={mt.id} className="px-4 py-2.5 hover:bg-white/50 transition-all text-xs">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="font-bold text-white px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: mtColor }}>{mtVuln}</span>
                                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${domainColor}`}>{domainLabel}</span>
                                                                    {mt.is_contributive && <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded font-bold">ASR</span>}
                                                                    {acteurs && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">{acteurs}</span>}
                                                                </div>
                                                                <p className={`text-sm ${mt.is_contributive ? 'text-monka-text' : 'text-monka-muted'}`}>{mt.libelle}</p>
                                                            </div>
                                                        )
                                                    }

                                                    const activeMTsByMP = groupByMP(activeMTs)
                                                    const inactiveMTsByMP = groupByMP(inactiveMTs)

                                                    return (
                                                        <div>
                                                            {/* Active MTs */}
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                                <h3 className="text-sm font-bold text-monka-heading">
                                                                    Tâches activées ({activeMTs.length})
                                                                </h3>
                                                                <span className="text-[10px] text-monka-muted">/ {filteredMTs.length} total</span>
                                                                {activeMTs.length > 0 && (
                                                                    <div className="flex gap-1 ml-auto">
                                                                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold">📍 {activeMTs.filter(m => m.is_contributive).length} ASR</span>
                                                                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 text-[9px] font-bold">💡 {activeMTs.filter(m => !m.is_contributive).length}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {Object.keys(activeMTsByMP).length === 0 ? (
                                                                <div className="rounded-xl border border-dashed border-monka-border p-6 text-center mb-4">
                                                                    <p className="text-sm text-monka-muted">Aucune tâche activée — répondez aux questions</p>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-3 mb-4">
                                                                    {Object.entries(activeMTsByMP).map(([mpId, mts]) => {
                                                                        const mp = mpMap[mpId]
                                                                        const mpColor = vColorMap[(mp?.vulnerability_id || mpVulnMap[mpId]) as VulnerabilityId] || '#999'
                                                                        return (
                                                                            <div key={mpId} className="rounded-xl border border-green-200 overflow-hidden">
                                                                                <div className="px-4 py-2 flex items-center gap-2 bg-green-50">
                                                                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: mpColor }}>{mpVulnMap[mpId]}</span>
                                                                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded bg-gray-600">{mpId}</span>
                                                                                    <span className="text-xs font-medium text-monka-heading flex-1 truncate">{mp?.nom || mpId}</span>
                                                                                    <span className="text-[10px] text-green-600 font-bold">{mts.length} MT</span>
                                                                                </div>
                                                                                <div className="divide-y divide-monka-border">
                                                                                    {mts.map(mt => renderMTItem(mt))}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )}

                                                            {/* Inactive MTs — collapsible */}
                                                            {inactiveMTs.length > 0 && (
                                                                <details className="group">
                                                                    <summary className="flex items-center gap-2 cursor-pointer select-none mb-3 text-monka-muted hover:text-monka-text transition-colors">
                                                                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                                                                        <span className="text-xs font-bold">
                                                                            En attente ({inactiveMTs.length}) — {Object.keys(inactiveMTsByMP).length} MP non activés
                                                                        </span>
                                                                    </summary>
                                                                    <div className="space-y-3">
                                                                        {Object.entries(inactiveMTsByMP).map(([mpId, mts]) => {
                                                                            const mp = mpMap[mpId]
                                                                            const mpColor = vColorMap[(mp?.vulnerability_id || mpVulnMap[mpId]) as VulnerabilityId] || '#999'
                                                                            return (
                                                                                <div key={mpId} className="rounded-xl border border-monka-border overflow-hidden opacity-60">
                                                                                    <div className="px-4 py-2 flex items-center gap-2 bg-gray-50/50">
                                                                                        <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: mpColor }}>{mpVulnMap[mpId]}</span>
                                                                                        <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded bg-gray-600">{mpId}</span>
                                                                                        <span className="text-xs font-medium text-monka-heading flex-1 truncate">{mp?.nom || mpId}</span>
                                                                                        <span className="text-[10px] text-monka-muted font-bold">{mts.length} MT</span>
                                                                                    </div>
                                                                                    <div className="divide-y divide-monka-border">
                                                                                        {mts.map(mt => renderMTItem(mt))}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </details>
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
                                                        {/* Score circular gauge + stats */}
                                                        <div className="flex items-center gap-4 mb-4">
                                                            {(() => {
                                                                const s = displayScore
                                                                const pct = s.max > 0 ? (s.score / s.max) * 100 : 0
                                                                const radius = 38
                                                                const stroke = 6
                                                                const circumference = 2 * Math.PI * radius
                                                                const offset = circumference - (pct / 100) * circumference
                                                                const gaugeColor = pct >= 70 ? '#ef4444' : pct >= 40 ? '#f59e0b' : '#22c55e'
                                                                return (
                                                                    <div className="relative w-24 h-24 flex-shrink-0">
                                                                        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
                                                                            <circle cx="48" cy="48" r={radius} fill="none" stroke="#f0f0f0" strokeWidth={stroke} />
                                                                            <motion.circle
                                                                                cx="48" cy="48" r={radius} fill="none"
                                                                                stroke={gaugeColor}
                                                                                strokeWidth={stroke}
                                                                                strokeLinecap="round"
                                                                                strokeDasharray={circumference}
                                                                                initial={{ strokeDashoffset: circumference }}
                                                                                animate={{ strokeDashoffset: offset }}
                                                                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                                                            />
                                                                        </svg>
                                                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                                            <span className="text-lg font-bold text-monka-heading">{s.score}</span>
                                                                            <span className="text-[9px] text-monka-muted">/ {s.max}</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })()}
                                                            <div className="grid grid-cols-1 gap-2 flex-1">
                                                                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/50">
                                                                    <p className="text-[9px] text-monka-muted uppercase tracking-wider">MP Actifs</p>
                                                                    <p className="text-lg font-bold text-monka-heading">{activatedMPs.length}/{data.microParcours.length}</p>
                                                                </div>
                                                                <div className="p-2.5 rounded-lg bg-green-50 border border-green-200/50">
                                                                    <p className="text-[9px] text-monka-muted uppercase tracking-wider">Réponses</p>
                                                                    <p className="text-lg font-bold text-monka-heading">{answeredCount}/{totalCount}</p>
                                                                </div>
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

                                                        {/* ═══════════════════════════════════════
                                                            CR MÉDECIN TRAITANT — PROJECTION MOTEUR
                                                            Visible uniquement si toutes les questions sont répondues
                                                            ═══════════════════════════════════════ */}
                                                        {(() => {
                                                            const allQs = getAllQuestions(data)
                                                            const globalAnswered = allQs.filter(q => answers[q.id]).length
                                                            const isComplete = globalAnswered === allQs.length && allQs.length > 0

                                                            if (!isComplete) {
                                                                return (
                                                                    <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-gray-200 text-center">
                                                                        <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                                                        <p className="text-xs font-bold text-monka-muted">CR Médecin Traitant</p>
                                                                        <p className="text-[10px] text-monka-muted mt-1">
                                                                            Disponible quand l&apos;ensemble du questionnaire est répondu ({globalAnswered}/{allQs.length})
                                                                        </p>
                                                                        <div className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                                                            <div className="h-full bg-monka-primary/30 rounded-full transition-all" style={{ width: `${allQs.length > 0 ? (globalAnswered / allQs.length) * 100 : 0}%` }} />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }

                                                            // === Compute CR data ===
                                                            const niveaux: Record<VulnerabilityId, CRNiveau> = {} as Record<VulnerabilityId, CRNiveau>
                                                            VULN_IDS.forEach(vId => {
                                                                const thresholds = getThresholdsForVuln(data, vId)
                                                                const score = scoreByV[vId]?.score ?? 0
                                                                niveaux[vId] = getNiveauForScore(score, thresholds)
                                                            })

                                                            // Top 3 activated MPs (by vulnerability order, then alphabetical)
                                                            const vulnOrder: Record<string, number> = { V1: 1, V2: 2, V3: 3, V4: 4, V5: 5 }
                                                            const top3MPs = [...activatedMPs]
                                                                .sort((a, b) => (vulnOrder[mpVulnMap[a]] || 99) - (vulnOrder[mpVulnMap[b]] || 99))
                                                                .slice(0, 3)
                                                                .map(mpId => {
                                                                    const mp = mpMap[mpId]
                                                                    // Gather all actors from MTs of this MP
                                                                    const mtsForMP = data.microTaches.filter(mt => mt.mp_id === mpId)
                                                                    const acteurCounts: Record<string, number> = {}
                                                                    mtsForMP.forEach(mt => {
                                                                        (mt.acteur || []).forEach(a => {
                                                                            acteurCounts[a] = (acteurCounts[a] || 0) + 1
                                                                        })
                                                                    })
                                                                    const sortedActeurs = Object.entries(acteurCounts).sort((a, b) => b[1] - a[1])
                                                                    const acteurPrincipal = sortedActeurs[0]?.[0] || '—'
                                                                    const autresActeurs = sortedActeurs.slice(1).map(([a]) => a)
                                                                    return {
                                                                        mpId,
                                                                        vulnId: mpVulnMap[mpId],
                                                                        nom: mp?.nom || mpId,
                                                                        objectif: mp?.objectif || '—',
                                                                        objectifClinique: mapObjectifClinique(mp?.objectif || ''),
                                                                        acteurPrincipal,
                                                                        autresActeurs,
                                                                    }
                                                                })

                                                            const conclusionPhrases = generateConclusionPhrases(niveaux, activatedMPs.length)

                                                            return (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ duration: 0.5 }}
                                                                    className="mt-6"
                                                                >
                                                                    {/* CR Document Container */}
                                                                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                                                                        {/* Document header bar */}
                                                                        <div className="bg-gray-800 text-white px-5 py-2.5 flex items-center justify-between">
                                                                            <div className="flex items-center gap-2">
                                                                                <FileText className="w-4 h-4" />
                                                                                <span className="text-xs font-bold tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                    Compte Rendu Médecin Traitant — Monka
                                                                                </span>
                                                                            </div>
                                                                            <span className="text-[9px] text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                Projection moteur • Aucune valeur diagnostique
                                                                            </span>
                                                                        </div>

                                                                        <div className="p-5 space-y-5">

                                                                            {/* BLOC 1 — EN-TÊTE */}
                                                                            <div className="border-b border-gray-200 pb-4">
                                                                                <div className="grid grid-cols-2 gap-3 text-xs">
                                                                                    <div>
                                                                                        <span className="text-gray-400 text-[10px] uppercase tracking-wider">Aidant</span>
                                                                                        <p className="font-bold text-gray-800 mt-0.5">{personaId ? `Persona ${personaId}` : 'Profil simulé'}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="text-gray-400 text-[10px] uppercase tracking-wider">Proche aidé</span>
                                                                                        <p className="font-bold text-gray-800 mt-0.5">Proche simulé</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="text-gray-400 text-[10px] uppercase tracking-wider">Date de génération</span>
                                                                                        <p className="text-gray-700 mt-0.5">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="text-gray-400 text-[10px] uppercase tracking-wider">Type d&apos;évaluation</span>
                                                                                        <p className="text-gray-700 mt-0.5">Initiale</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* BLOC 2 — SYNTHÈSE SITUATIONNELLE */}
                                                                            <div>
                                                                                <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                    Synthèse situationnelle de la dyade
                                                                                </h4>
                                                                                <div className="space-y-2.5">
                                                                                    {VULN_IDS.map(vId => {
                                                                                        const niveau = niveaux[vId]
                                                                                        const display = CR_NIVEAU_DISPLAY[niveau]
                                                                                        const phrase = CR_PHR_B2[`${vId}_${niveau}`] || '—'
                                                                                        return (
                                                                                            <div key={vId} className="flex gap-3 items-start p-2.5 rounded-lg bg-gray-50/80">
                                                                                                <div className="flex-shrink-0 flex items-center gap-1.5 min-w-[140px]">
                                                                                                    <span className="text-sm">{display.emoji}</span>
                                                                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: display.color }}>
                                                                                                        {display.label}
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="flex-1 min-w-0">
                                                                                                    <p className="text-[10px] font-bold text-gray-700 mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                                        {CR_VULN_LABELS[vId]}
                                                                                                    </p>
                                                                                                    <p className="text-[10.5px] text-gray-600 leading-relaxed italic">
                                                                                                        {phrase}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>

                                                                            {/* BLOC 3 — AXES D'ACTION PRIORITAIRES */}
                                                                            <div>
                                                                                <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                    Axes d&apos;action structurés prioritaires
                                                                                </h4>
                                                                                {top3MPs.length > 0 ? (
                                                                                    <div className="space-y-3">
                                                                                        {top3MPs.map((mp) => (
                                                                                            <div key={mp.mpId} className="p-3 rounded-lg border border-gray-200 bg-white">
                                                                                                <div className="flex items-start gap-2 mb-2">
                                                                                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex-shrink-0"
                                                                                                        style={{ backgroundColor: vColorMap[mp.vulnId as VulnerabilityId] || '#666' }}>
                                                                                                        {mp.vulnId}
                                                                                                    </span>
                                                                                                    <span className="text-[10px] font-bold text-white bg-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">
                                                                                                        {mp.mpId}
                                                                                                    </span>
                                                                                                    <span className="text-[11px] font-bold text-gray-800 leading-snug">
                                                                                                        {mp.nom}
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-[10px] ml-[52px]">
                                                                                                    <div>
                                                                                                        <span className="text-gray-400">Acteur principal : </span>
                                                                                                        <span className="font-bold text-gray-700">{formatActeur(mp.acteurPrincipal)}</span>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700">
                                                                                                            {mp.objectifClinique}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    {mp.autresActeurs.length > 0 && (
                                                                                                        <div className="col-span-2">
                                                                                                            <span className="text-gray-400">Écosystème : </span>
                                                                                                            <span className="text-gray-500">
                                                                                                                {mp.autresActeurs.map(a => formatActeur(a)).join(', ')}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    )}
                                                                                                    <div className="col-span-2">
                                                                                                        <span className="text-gray-400">Objectif : </span>
                                                                                                        <span className="text-gray-600 italic">{mp.objectif}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                        {activatedMPs.length > 3 && (
                                                                                            <p className="text-[9px] text-gray-400 italic text-center">
                                                                                                + {activatedMPs.length - 3} axe{activatedMPs.length - 3 > 1 ? 's' : ''} supplémentaire{activatedMPs.length - 3 > 1 ? 's' : ''} identifié{activatedMPs.length - 3 > 1 ? 's' : ''}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <p className="text-[10px] text-gray-400 italic p-3 bg-gray-50 rounded-lg">
                                                                                        Aucun axe de structuration activé à ce stade.
                                                                                    </p>
                                                                                )}
                                                                            </div>

                                                                            {/* BLOC 4 — SUIVI LONGITUDINAL */}
                                                                            <div className="opacity-50">
                                                                                <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                    Suivi longitudinal
                                                                                </h4>
                                                                                <div className="p-3 rounded-lg bg-gray-50 border border-dashed border-gray-200">
                                                                                    <p className="text-[10px] text-gray-400 italic text-center">
                                                                                        {CR_PHR_B4_INITIAL}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            {/* BLOC 5 — CONCLUSION */}
                                                                            <div className="border-t border-gray-200 pt-4">
                                                                                <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                    Conclusion
                                                                                </h4>
                                                                                <div className="space-y-2">
                                                                                    {conclusionPhrases.map((phrase, i) => (
                                                                                        <p key={i} className="text-[11px] text-gray-700 leading-relaxed">
                                                                                            {phrase}
                                                                                        </p>
                                                                                    ))}
                                                                                </div>
                                                                            </div>

                                                                            {/* Footer */}
                                                                            <div className="border-t border-gray-100 pt-3 mt-4">
                                                                                <p className="text-[8px] text-gray-300 text-center leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                                    Document généré automatiquement par le moteur Monka — Sans valeur diagnostique — Sans valeur prescriptive
                                                                                    <br />
                                                                                    Strictement conforme aux legacy Monka en vigueur
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )
                                                        })()}
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

                                    {(() => {
                                        // Gather prevention recos from non-activated MPs (filtered by activeV)
                                        const activatedMPSet = new Set(activatedMPs)
                                        const preventionRecosByMP: Record<string, typeof data.recommendations> = {}
                                        data.recommendations.forEach(r => {
                                            if (r.niveau !== 'prevention') return
                                            if (activatedMPSet.has(r.mp_id)) return
                                            if (activeV !== 'ALL' && mpVulnMap[r.mp_id] !== activeV) return
                                            if (!preventionRecosByMP[r.mp_id]) preventionRecosByMP[r.mp_id] = []
                                            preventionRecosByMP[r.mp_id].push(r)
                                        })
                                        const preventionMPIds = Object.keys(preventionRecosByMP)
                                        const hasActivated = activatedMPs.length > 0
                                        const hasPrevention = preventionMPIds.length > 0

                                        if (!hasActivated && !hasPrevention) {
                                            return (
                                                <div className="text-center py-16 text-monka-muted text-sm">
                                                    <Users className="w-12 h-12 text-monka-muted/30 mx-auto mb-3" />
                                                    <p>Aucun parcours activé</p>
                                                    <p className="text-xs mt-1">Répondez aux questions pour voir le rendu utilisateur</p>
                                                </div>
                                            )
                                        }

                                        return (
                                            <div className="space-y-5">
                                                {/* Activated MPs */}
                                                {activatedMPs.map(mpId => {
                                                    const mp = mpMap[mpId]
                                                    if (!mp) return null

                                                    // Only recos whose category is activated AND at the right niveau
                                                    const mpRecos = data.recommendations.filter(r => {
                                                        if (r.mp_id !== mpId) return false
                                                        const cat = activatedCats.get(r.category_id)
                                                        return cat && r.niveau === cat.niveau
                                                    })

                                                    // Determine activated niveau for this MP (highest among activated categories)
                                                    const niveauOrder: Record<string, number> = { critique: 3, ccc: 2, standard: 1 }
                                                    let maxNiveau = 0
                                                    for (const cat of activatedCats.values()) {
                                                        if (cat.mpId === mpId) {
                                                            const level = niveauOrder[cat.niveau] || 0
                                                            if (level > maxNiveau) maxNiveau = level
                                                        }
                                                    }
                                                    const niveauLabel = maxNiveau === 3 ? 'critique' : maxNiveau === 2 ? 'ccc' : 'standard'

                                                    const critColorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
                                                        critique: { bg: '#EF4444', text: '#FECACA', border: '#EF444440', gradient: 'linear-gradient(135deg, #DC2626, #B91C1C)' },
                                                        ccc: { bg: '#F59E0B', text: '#FEF3C7', border: '#F59E0B40', gradient: 'linear-gradient(135deg, #D97706, #B45309)' },
                                                        standard: { bg: '#10B981', text: '#D1FAE5', border: '#10B98140', gradient: 'linear-gradient(135deg, #059669, #047857)' },
                                                    }
                                                    const critColors = critColorMap[niveauLabel] || critColorMap.standard

                                                    // Only MTs from activated categories
                                                    const activeCatIdsForMP = new Set<string>()
                                                    for (const [catId, cat] of activatedCats.entries()) {
                                                        if (cat.mpId === mpId) activeCatIdsForMP.add(catId)
                                                    }
                                                    const mpMTs = data.microTaches.filter(mt => mt.mp_id === mpId && activeCatIdsForMP.has(mt.category_id))
                                                    const contributiveMTs = mpMTs.filter(mt => mt.is_contributive)
                                                    const nonContributiveMTs = mpMTs.filter(mt => !mt.is_contributive)

                                                    return (
                                                        <div key={mpId} className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: critColors.border }}>
                                                            {/* MP Header — colored by activated niveau */}
                                                            <div className="px-5 py-4" style={{ background: critColors.gradient }}>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-white/80 text-xs font-bold bg-white/20 px-2 py-0.5 rounded">{mpId}</span>
                                                                    <span className="text-white/60 text-xs">{mp.vulnerability_id}</span>
                                                                    <span className="text-white text-[10px] font-bold bg-white/25 px-1.5 py-0.5 rounded uppercase">{niveauLabel}</span>
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

                                                            {/* Recommendations — only activated categories at correct niveau */}
                                                            {mpRecos.length > 0 ? (
                                                                <div className="divide-y divide-monka-border">
                                                                    {mpRecos.map(reco => {
                                                                        const recoCls = reco.niveau === 'critique'
                                                                            ? 'bg-red-50 text-red-600 border-red-200'
                                                                            : reco.niveau === 'ccc'
                                                                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                                                : reco.niveau === 'prevention'
                                                                                    ? 'bg-purple-50 text-purple-600 border-purple-200'
                                                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                                        // MTs linked via category — only from activated categories
                                                                        const recoMTs = data.microTaches.filter(mt => mt.category_id === reco.category_id)
                                                                        const recoContrib = recoMTs.filter(mt => mt.is_contributive)
                                                                        const recoNonContrib = recoMTs.filter(mt => !mt.is_contributive)

                                                                        return (
                                                                            <div key={reco.id} className="px-5 py-4">
                                                                                {/* Reco header */}
                                                                                <div className="flex items-start gap-2 mb-2">
                                                                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: critColors.bg }} />
                                                                                    <div className="flex-1">
                                                                                        <div className="flex items-center gap-2 mb-1">
                                                                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${recoCls}`}>{reco.niveau}</span>
                                                                                        </div>
                                                                                        <p className="text-sm text-monka-text font-medium leading-snug">{reco.wording_utilisateur}</p>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Contributive MTs — Sécurisation */}
                                                                                {recoContrib.length > 0 && (
                                                                                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-emerald-200 pl-3">
                                                                                        <span className="text-[9px] font-bold text-emerald-600 uppercase">📍 Sécurisation</span>
                                                                                        {recoContrib.map(mt => {
                                                                                            const acteur = mt.acteur && mt.acteur.length > 0 ? mt.acteur.filter(a => !a.toLowerCase().includes('aidant') && !a.toLowerCase().includes('autonome')).join(', ') || null : null
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
                                                                                            const acteur = mt.acteur && mt.acteur.length > 0 ? mt.acteur.filter(a => !a.toLowerCase().includes('aidant') && !a.toLowerCase().includes('autonome')).join(', ') || null : null
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

                                                {/* Prevention recos — from non-activated MPs */}
                                                {hasPrevention && (
                                                    <div className="mt-6">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                            <h3 className="text-sm font-bold text-monka-heading">
                                                                🛡 Prévention — Parcours non activés ({preventionMPIds.length} MP)
                                                            </h3>
                                                        </div>
                                                        <p className="text-[11px] text-monka-muted mb-3">
                                                            Recommandations de prévention applicables même sans activation du parcours
                                                        </p>
                                                        <div className="space-y-4">
                                                            {preventionMPIds.map(mpId => {
                                                                const mp = mpMap[mpId]
                                                                if (!mp) return null
                                                                const recos = preventionRecosByMP[mpId]
                                                                const prevMTs = data.microTaches.filter(mt => mt.mp_id === mpId && mt.is_prevention)
                                                                const prevContrib = prevMTs.filter(mt => mt.is_contributive)
                                                                const prevNonContrib = prevMTs.filter(mt => !mt.is_contributive)

                                                                return (
                                                                    <div key={mpId} className="rounded-2xl border-2 border-purple-200 overflow-hidden">
                                                                        {/* MP Header — purple prevention theme */}
                                                                        <div className="px-5 py-3" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                                                                            <div className="flex items-center gap-2 mb-1">
                                                                                <span className="text-white/80 text-xs font-bold bg-white/20 px-2 py-0.5 rounded">{mpId}</span>
                                                                                <span className="text-white/60 text-xs">{mp.vulnerability_id}</span>
                                                                                <span className="text-white text-[10px] font-bold bg-white/25 px-1.5 py-0.5 rounded uppercase">prévention</span>
                                                                            </div>
                                                                            <h4 className="text-white font-bold text-sm">{mp.nom}</h4>
                                                                            {prevMTs.length > 0 && (
                                                                                <div className="flex gap-3 mt-1.5">
                                                                                    {prevContrib.length > 0 && <span className="text-white/70 text-[10px]">📍 {prevContrib.length} sécu</span>}
                                                                                    {prevNonContrib.length > 0 && <span className="text-white/70 text-[10px]">💡 {prevNonContrib.length} amél</span>}
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        {/* Recos */}
                                                                        <div className="divide-y divide-monka-border">
                                                                            {recos.map(reco => {
                                                                                // Only show prevention MTs for prevention section (simple INFO/ORGA), not regular category MTs
                                                                                const recoMTs = data.microTaches.filter(mt => mt.mp_id === mpId && mt.is_prevention)
                                                                                const recoContrib = recoMTs.filter(mt => mt.is_contributive)
                                                                                const recoNonContrib = recoMTs.filter(mt => !mt.is_contributive)

                                                                                return (
                                                                                    <div key={reco.id} className="px-5 py-3">
                                                                                        <div className="flex items-start gap-2 mb-1.5">
                                                                                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-purple-400" />
                                                                                            <div className="flex-1">
                                                                                                <div className="flex items-center gap-2 mb-1">
                                                                                                    <span className="text-[10px] px-1.5 py-0.5 rounded border font-bold bg-purple-50 text-purple-600 border-purple-200">prévention</span>
                                                                                                </div>
                                                                                                <p className="text-sm text-monka-text leading-snug">{reco.wording_utilisateur}</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        {recoContrib.length > 0 && (
                                                                                            <div className="ml-6 mt-2 space-y-1 border-l-2 border-purple-200 pl-3">
                                                                                                <span className="text-[9px] font-bold text-purple-600 uppercase">📍 Sécurisation</span>
                                                                                                {recoContrib.map(mt => (
                                                                                                    <div key={mt.id} className="flex items-center gap-2 text-xs py-0.5">
                                                                                                        <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'MED' ? 'bg-red-100 text-red-600' : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{mt.type}</span>
                                                                                                        <span className="text-monka-text flex-1">{mt.libelle}</span>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}

                                                                                        {recoNonContrib.length > 0 && (
                                                                                            <div className="ml-6 mt-1.5 space-y-1 border-l-2 border-gray-200 pl-3">
                                                                                                <span className="text-[9px] font-bold text-gray-400 uppercase">💡 Amélioration</span>
                                                                                                {recoNonContrib.map(mt => (
                                                                                                    <div key={mt.id} className="flex items-center gap-2 text-xs py-0.5">
                                                                                                        <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${mt.type === 'INFO' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>{mt.type}</span>
                                                                                                        <span className="text-monka-muted flex-1">{mt.libelle}</span>
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
                                                )}
                                            </div>
                                        )
                                    })()}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
