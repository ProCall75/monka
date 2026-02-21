import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield,
    BarChart3,
    Zap,
    Eye,
    Cog,
    FileText,
    Grid3x3,
    Loader2,
    AlertCircle,
    RefreshCw,
} from 'lucide-react'
import type { VulnerabilityId } from '../clinical/hooks'
import {
    useMonkaData,
    VULN_META, VULN_IDS,
    evaluateRule, getActivatedCategories,
    getQuestionsForVuln, getAllQuestions, getActiveQuestions,
    getActiveAidanceBlocks, getTriggerQuestions,
    buildQuestionMPMap, buildMPMap, buildScoringMap,
    getThresholdsForVuln, buildMPVulnMap,
    invalidateCache, getCategoriesForMP, getRulesForMP,
    type MonkaData, type DBQuestion,
} from '../clinical/hooks'
import { SimulatorScoringTab } from './simulator/SimulatorScoringTab'
import { SimulatorMPTab } from './simulator/SimulatorMPTab'
import { SimulatorRulesTab } from './simulator/SimulatorRulesTab'
import { SimulatorCRTab } from './simulator/SimulatorCRTab'
import { SimulatorExternalView } from './simulator/SimulatorExternalView'
import { QuestionsSidebar } from './simulator/QuestionsSidebar'
import { SimulatorHeader } from './simulator/SimulatorHeader'
import { detectScoreActionGaps } from './simulator/scoreActionGap'
import { CoverageHeatmap } from './simulator/CoverageHeatmap'
import { WhatIfDiff } from './simulator/WhatIfDiff'

// === Types ===
type InternalTab = 'scoring' | 'mp' | 'rules' | 'summary' | 'coverage'
type ViewMode = 'internal' | 'external'
type VFilter = VulnerabilityId | 'ALL' | 'TRIGGERS'

const vulnerabilities = VULN_IDS.map(id => ({
    id,
    label: VULN_META[id].name,
    color: VULN_META[id].color,
    icon: VULN_META[id].icon,
}))


const internalTabs: { id: InternalTab; label: string; icon: typeof Shield }[] = [
    { id: 'scoring', label: 'Scoring', icon: BarChart3 },
    { id: 'mp', label: 'Micro-Parcours', icon: Zap },
    { id: 'rules', label: 'Règles', icon: Shield },
    { id: 'coverage', label: 'Couverture', icon: Grid3x3 },
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
    const [originalAnswers, setOriginalAnswers] = useState<Record<string, string>>({})

    // Load persona answers from sessionStorage (set by PersonasPage)
    useEffect(() => {
        const stored = sessionStorage.getItem('monka_persona_answers')
        const storedId = sessionStorage.getItem('monka_persona_id')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setAnswers(parsed)
                setOriginalAnswers(parsed)
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
                    <p className="text-sm text-monka-muted">Questionnaire adaptatif • 24 micro-parcours • 68 règles d&apos;activation</p>
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

    return <SimulatorContent data={data} activeV={activeV} setActiveV={setActiveV} answers={answers} setAnswers={setAnswers} originalAnswers={originalAnswers} viewMode={viewMode} setViewMode={setViewMode} activeInternalTab={activeInternalTab} setActiveInternalTab={setActiveInternalTab} expandedCategories={expandedCategories} setExpandedCategories={setExpandedCategories} personaId={personaId} />
}

// === Inner component with data loaded ===

function SimulatorContent({
    data, activeV, setActiveV, answers, setAnswers, originalAnswers,
    viewMode, setViewMode, activeInternalTab, setActiveInternalTab,
    expandedCategories, setExpandedCategories, personaId,
}: {
    data: MonkaData
    activeV: VFilter
    setActiveV: (v: VFilter) => void
    answers: Record<string, string>
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
    originalAnswers: Record<string, string>
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

    // MP drill-down state
    const [selectedMP, setSelectedMP] = useState<string | null>(null)

    // Active aidance blocks based on current N3/O1 answers
    const activeBlocks = useMemo(() => getActiveAidanceBlocks(answers), [answers])

    // Trigger questions (always the same 15, not filtered)
    const triggerQuestions = useMemo(() => getTriggerQuestions(data), [data])

    // Current questions — filtered by additive model (socle + active blocks)
    const currentQuestions = useMemo(() => {
        if (activeV === 'TRIGGERS') return triggerQuestions
        // Get all active questions (respects aidance filtering)
        const allActiveQ = getActiveQuestions(data, answers)
        if (activeV === 'ALL') return allActiveQ
        return allActiveQ.filter(q => q.vulnerability_id === activeV)
    }, [data, activeV, answers, triggerQuestions])

    // Group questions by sous_bloc (or by vulnerability when ALL, or by bloc for triggers)
    const groupedQuestions = useMemo(() => {
        const groups: Record<string, DBQuestion[]> = {}
        if (activeV === 'ALL') {
            vulnerabilities.forEach(v => {
                const vQuestions = currentQuestions.filter(q => q.vulnerability_id === v.id)
                if (vQuestions.length > 0) groups[v.id] = vQuestions
            })
        } else if (activeV === 'TRIGGERS') {
            currentQuestions.forEach(q => {
                const key = q.bloc || 'Profil'
                if (!groups[key]) groups[key] = []
                groups[key].push(q)
            })
        } else {
            currentQuestions.forEach(q => {
                const key = q.sous_bloc || q.classification || 'Autres'
                if (!groups[key]) groups[key] = []
                groups[key].push(q)
            })
        }
        return groups
    }, [data, activeV, currentQuestions, vulnerabilities])

    // Stats (memoized to avoid recalc on unrelated state changes)
    const scoringQIds = useMemo(() => new Set(data.scoringQuestions.map(sq => sq.question_id)), [data])

    const { answeredCount, totalCount, currentScoringCount, answeredScoringCount } = useMemo(() => {
        const answered = currentQuestions.filter(q => answers[q.id]).length
        const total = currentQuestions.length
        const scoring = activeV === 'TRIGGERS' ? 0 : currentQuestions.filter(q => scoringQIds.has(q.id)).length
        const answeredScoring = activeV === 'TRIGGERS' ? 0 : currentQuestions.filter(q => scoringQIds.has(q.id) && answers[q.id]).length
        return { answeredCount: answered, totalCount: total, currentScoringCount: scoring, answeredScoringCount: answeredScoring }
    }, [currentQuestions, answers, activeV, scoringQIds])

    // Total active questions (across all V, excluding triggers)
    const totalActiveQuestions = useMemo(() => getActiveQuestions(data, answers).length, [data, answers])

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

    const displayScore = useMemo(() => {
        if (activeV === 'ALL' || activeV === 'TRIGGERS') {
            const totalScore = Object.values(scoreByV).reduce((a, b) => a + b.score, 0)
            const totalMax = Object.values(scoreByV).reduce((a, b) => a + b.max, 0)
            return { score: totalScore, max: totalMax }
        }
        return scoreByV[activeV] || { score: 0, max: 0 }
    }, [scoreByV, activeV])

    // Activated MPs (based on activation rules)
    const mpVulnMap = useMemo(() => buildMPVulnMap(data), [data])

    // Category-level activation from clinical engine
    const activatedCats = useMemo(() => {
        return getActivatedCategories(data, answers, (activeV === 'ALL' || activeV === 'TRIGGERS') ? undefined : activeV as VulnerabilityId)
    }, [data, answers, activeV])

    const activatedMPs = useMemo(() => {
        const activated = new Set<string>()
        for (const cat of activatedCats.values()) {
            activated.add(cat.mpId)
        }
        return Array.from(activated)
    }, [activatedCats])

    // Score-Action Gap detection (Bloc 10 — US-12)
    const gaps = useMemo(() => detectScoreActionGaps(data, scoreByV, activatedMPs, mpVulnMap), [data, scoreByV, activatedMPs, mpVulnMap])

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
            {/* What-If Diff banner (Bloc 14) */}
            <WhatIfDiff data={data} originalAnswers={originalAnswers} currentAnswers={answers}
                onReset={() => setAnswers(originalAnswers)} />
            <SimulatorHeader
                activeV={activeV}
                setActiveV={setActiveV}
                personaId={personaId}
                vulnerabilities={vulnerabilities}
                displayScore={displayScore}
                currentThreshold={currentThreshold}
                getThresholdColor={getThresholdColor}
                activatedMPs={activatedMPs}
                totalMPs={data.microParcours.length}
                answeredCount={answeredCount}
                totalCount={totalCount}
                answeredScoringCount={answeredScoringCount}
                currentScoringCount={currentScoringCount}
                triggerQuestions={triggerQuestions}
                activeBlocks={activeBlocks}
                vulnInfo={data.vulnerabilities.find(v => v.id === activeV) as { name: string; bloc_label: string } | undefined}
                gapCount={gaps.length}
            />

            {/* Split Screen */}
            <div className="flex gap-4 h-[calc(100%-80px)]">

                <QuestionsSidebar
                    activeV={activeV}
                    vulnName={data.vulnerabilities.find(v => v.id === activeV)?.name}
                    answers={answers}
                    setAnswers={setAnswers}
                    groupedQuestions={groupedQuestions}
                    expandedCategories={expandedCategories}
                    toggleCategory={toggleCategory}
                    scoringQIds={scoringQIds}
                    questionMPMap={questionMPMap}
                    mpMap={mpMap}
                    vulnerabilities={vulnerabilities}
                    answeredCount={answeredCount}
                    totalCount={totalCount}
                    answeredScoringCount={answeredScoringCount}
                    currentScoringCount={currentScoringCount}
                />

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
                                                    <SimulatorScoringTab
                                                        data={data} activeV={activeV} answers={answers}
                                                        activatedMPs={activatedMPs} activatedCats={activatedCats}
                                                        scoreByV={scoreByV} displayScore={displayScore}
                                                        currentThreshold={currentThreshold} scoringMap={scoringMap}
                                                    />
                                                )}

                                                {/* MICRO-PARCOURS TAB (activation + recos + tasks sub-tabs) */}
                                                {activeInternalTab === 'mp' && (
                                                    <SimulatorMPTab
                                                        data={data} activeV={activeV} answers={answers}
                                                        activatedMPs={activatedMPs} activatedCats={activatedCats}
                                                        scoreByV={scoreByV} displayScore={displayScore}
                                                        currentThreshold={currentThreshold} scoringMap={scoringMap}
                                                        selectedMP={selectedMP} setSelectedMP={setSelectedMP}
                                                    />
                                                )}

                                                {/* RULES TAB */}
                                                {activeInternalTab === 'rules' && (
                                                    <SimulatorRulesTab
                                                        data={data} activeV={activeV} answers={answers}
                                                        activatedMPs={activatedMPs} activatedCats={activatedCats}
                                                        scoreByV={scoreByV} displayScore={displayScore}
                                                        currentThreshold={currentThreshold} scoringMap={scoringMap}
                                                    />
                                                )}

                                                {/* COVERAGE HEATMAP TAB (Bloc 13) */}
                                                {activeInternalTab === 'coverage' && (
                                                    <CoverageHeatmap data={data} />
                                                )}

                                                {/* SUMMARY / CR TAB */}
                                                {activeInternalTab === 'summary' && (
                                                    <SimulatorCRTab
                                                        data={data} activeV={activeV} answers={answers}
                                                        activatedMPs={activatedMPs} activatedCats={activatedCats}
                                                        scoreByV={scoreByV} displayScore={displayScore}
                                                        currentThreshold={currentThreshold} scoringMap={scoringMap}
                                                        answeredCount={answeredCount} totalCount={totalCount}
                                                        totalActiveQuestions={totalActiveQuestions}
                                                        personaId={personaId}
                                                    />
                                                )}

                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}

                            {/* VUE EXTERNE */}
                            {viewMode === 'external' && (
                                <SimulatorExternalView
                                    data={data}
                                    activeV={activeV}
                                    activatedMPs={activatedMPs}
                                    activatedCats={activatedCats}
                                    mpMap={mpMap}
                                    mpVulnMap={mpVulnMap}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
