/* ScoringDocumentView — Fiche Scoring officielle par vulnérabilité.
   6 sections: Sens clinique, Méthodologie, Questions scorantes, Questions non-scorantes, Seuils, Métriques.
   100% data-driven — content_blocks DB pour justifications cliniques.
   Architecture: < 300L, uses hooks barrel. */

import { useMemo } from 'react'
import {
    VULN_META, getThresholdsForVuln, getQuestionText,
    getContentBlocksForEntity, CR_VULN_LABELS, isScoringQuestion,
    type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { ExportButton } from './ExportButton'

interface ScoringDocumentProps {
    data: MonkaData
    vulnId: VulnerabilityId
    onBack: () => void
}

const THRESHOLD_DISPLAY = [
    { key: 'faible', label: 'Faible', color: '#22C55E', emoji: '🟢' },
    { key: 'modere', label: 'Modéré', color: '#F5D245', emoji: '🟡' },
    { key: 'eleve', label: 'Élevé', color: '#F5A623', emoji: '🟠' },
    { key: 'critique', label: 'Critique', color: '#EF4444', emoji: '🔴' },
]

export function ScoringDocumentView({ data, vulnId, onBack }: ScoringDocumentProps) {
    const meta = VULN_META[vulnId]
    const thresholds = useMemo(() => getThresholdsForVuln(data, vulnId), [data, vulnId])

    // Scoring questions for this vulnerability
    const scoringQs = useMemo(() =>
        data.scoringQuestions.filter(sq => sq.vulnerability_id === vulnId),
        [data, vulnId],
    )

    // Group scoring entries by question_id
    const scoringByQuestion = useMemo(() => {
        const map = new Map<string, typeof scoringQs>()
        for (const sq of scoringQs) {
            const list = map.get(sq.question_id) || []
            list.push(sq)
            map.set(sq.question_id, list)
        }
        return map
    }, [scoringQs])

    const scoringQuestionIds = useMemo(() => new Set(scoringByQuestion.keys()), [scoringByQuestion])

    // All questions for this vulnerability
    const vulnQuestions = useMemo(() =>
        data.questions.filter(q => q.vulnerability_id === vulnId),
        [data, vulnId],
    )

    const nonScoringQuestions = useMemo(() =>
        vulnQuestions.filter(q => !scoringQuestionIds.has(q.id)),
        [vulnQuestions, scoringQuestionIds],
    )

    // Content blocks
    const vulnSensClinique = useMemo(() => getContentBlocksForEntity(data, 'vulnerability', vulnId), [data, vulnId])
    const maxScore = scoringQs.length > 0 ? scoringQs[0].max_score_vulnerability : 0

    return (
        <div className="max-w-[900px] mx-auto">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-4 no-print">
                <button onClick={onBack} className="text-xs text-monka-muted hover:text-monka-text transition-colors">← Retour</button>
                <div className="flex-1" />
                <ExportButton label={`Exporter Fiche Scoring ${vulnId}`} />
            </div>

            <div className="cr-document bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {/* Header */}
                <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-8 w-auto" />
                        <div>
                            <p className="text-xs font-bold tracking-wider uppercase font-sans">Fiche Scoring</p>
                            <p className="text-[9px] text-gray-400 font-sans">{vulnId} — Méthodologie détaillée</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-white px-2.5 py-1 rounded font-sans" style={{ backgroundColor: meta.color }}>{meta.label}</span>
                </div>

                <div className="p-6 space-y-6">
                    {/* Title */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1 className="text-xl font-bold text-gray-800 mb-1">{CR_VULN_LABELS[vulnId]}</h1>
                        <p className="text-sm text-gray-500">Dimension {vulnId} — {scoringQuestionIds.size} questions scorantes · Score max {maxScore} pts</p>
                    </div>

                    {/* 1. Sens clinique */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">1. Sens clinique</h4>
                        {vulnSensClinique.length > 0 ? (
                            <div className="space-y-2">
                                {vulnSensClinique.map(cb => (
                                    <p key={cb.id} className="text-[11px] text-gray-700 leading-relaxed p-3 bg-blue-50/50 rounded-lg border border-blue-100">{cb.content}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[10px] text-gray-400 italic">Aucun sens clinique renseigné.</p>
                        )}
                    </div>

                    {/* 2. Méthodologie */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">2. Méthodologie de scoring</h4>
                        <div className="p-3 bg-gray-50 rounded-lg text-[11px] text-gray-700 leading-relaxed space-y-2">
                            <p>Le score de la dimension <strong>{CR_VULN_LABELS[vulnId]}</strong> est calculé par somme des points attribués aux réponses des {scoringQuestionIds.size} questions scorantes.</p>
                            <p className="font-mono text-[10px] text-gray-500 bg-white p-2 rounded border border-gray-200">
                                Score = Σ (points par réponse) — Score maximum : {maxScore} pts
                            </p>
                            <p>Les seuils déterminent le niveau de vulnérabilité (faible, modéré, élevé, critique) en fonction du score obtenu.</p>
                        </div>
                    </div>

                    {/* 3. Questions scorantes — détail */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">3. Questions scorantes ({scoringQuestionIds.size})</h4>
                        <div className="space-y-4">
                            {[...scoringByQuestion.entries()].map(([qId, entries]) => {
                                const qText = getQuestionText(data, qId)
                                const scoringCBs = getContentBlocksForEntity(data, 'scoring', qId)
                                const ponderationCBs = getContentBlocksForEntity(data, 'question', qId)
                                    .filter(cb => cb.block_type === 'scoring_ponderation')

                                return (
                                    <div key={qId} className="p-3 rounded-lg border border-gray-200 bg-white">
                                        {/* Question header */}
                                        <div className="flex items-start gap-2 mb-2">
                                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 flex-shrink-0 mt-0.5">{qId}</span>
                                            <p className="text-[11px] font-medium text-gray-800">{qText}</p>
                                        </div>

                                        {/* Scoring responses */}
                                        <div className="ml-6 mb-2 space-y-1">
                                            {entries.sort((a, b) => b.score - a.score).map((se, i) => (
                                                <div key={i} className="flex items-center justify-between text-[10px]">
                                                    <span className="text-gray-600">→ {se.response_text}</span>
                                                    <span className="font-bold text-white px-1.5 py-0.5 rounded text-[9px] ml-2 flex-shrink-0" style={{ backgroundColor: meta.color }}>
                                                        +{se.score} pt{se.score > 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Scoring justification */}
                                        {scoringCBs.length > 0 && (
                                            <div className="ml-6 space-y-1">
                                                {scoringCBs.map(cb => (
                                                    <p key={cb.id} className="text-[10px] text-indigo-700 bg-indigo-50/50 rounded px-2.5 py-1.5 leading-relaxed border border-indigo-100">
                                                        <span className="font-bold text-[8px] uppercase tracking-wider mr-1">Justification :</span>
                                                        {cb.content}
                                                    </p>
                                                ))}
                                            </div>
                                        )}

                                        {/* Ponderation blocks */}
                                        {ponderationCBs.length > 0 && (
                                            <div className="ml-6 mt-1 space-y-1">
                                                {ponderationCBs.map(cb => (
                                                    <p key={cb.id} className="text-[10px] text-amber-700 bg-amber-50/50 rounded px-2.5 py-1.5 leading-relaxed border border-amber-100">
                                                        <span className="font-bold text-[8px] uppercase tracking-wider mr-1">Pondération :</span>
                                                        {cb.content}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 4. Questions non scorantes */}
                    {nonScoringQuestions.length > 0 && (
                        <div className="cr-bloc">
                            <h4 className="cr-section-title">4. Questions non scorantes ({nonScoringQuestions.length})</h4>
                            <div className="space-y-2">
                                {nonScoringQuestions.map(q => {
                                    const justifCBs = getContentBlocksForEntity(data, 'question', q.id)
                                        .filter(cb => cb.block_type === 'scoring_justification')
                                    return (
                                        <div key={q.id} className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/50">
                                            <div className="flex items-start gap-2">
                                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 flex-shrink-0 mt-0.5">{q.id}</span>
                                                <div>
                                                    <p className="text-[10.5px] text-gray-600">{q.question_text}</p>
                                                    {justifCBs.map(cb => (
                                                        <p key={cb.id} className="text-[9.5px] text-gray-400 italic mt-1">{cb.content}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* 5. Seuils */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">{nonScoringQuestions.length > 0 ? '5' : '4'}. Seuils de vulnérabilité</h4>
                        <div className="grid grid-cols-4 gap-3">
                            {THRESHOLD_DISPLAY.map(tl => {
                                const th = thresholds.find(t => t.niveau === tl.key)
                                return (
                                    <div key={tl.key} className="p-3 rounded-lg border text-center" style={{ borderColor: tl.color + '40', backgroundColor: tl.color + '08' }}>
                                        <span className="text-xl">{tl.emoji}</span>
                                        <p className="text-[11px] font-bold mt-1" style={{ color: tl.color }}>{tl.label}</p>
                                        {th ? (
                                            <p className="text-sm text-gray-600 font-mono mt-1">{th.seuil_min}–{th.seuil_max} pts</p>
                                        ) : (
                                            <p className="text-[9px] text-gray-400 mt-1">—</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 6. Métriques */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">{nonScoringQuestions.length > 0 ? '6' : '5'}. Métriques</h4>
                        <div className="grid grid-cols-4 gap-3 text-[10px]">
                            {[
                                { label: 'Questions scorantes', val: scoringQuestionIds.size },
                                { label: 'Questions non-scorantes', val: nonScoringQuestions.length },
                                { label: 'Score max', val: `${maxScore} pts` },
                                { label: 'Seuils', val: thresholds.length },
                            ].map(m => (
                                <div key={m.label} className="p-3 rounded-lg bg-gray-50 text-center border border-gray-100">
                                    <div className="text-lg font-bold text-gray-800">{m.val}</div>
                                    <div className="text-gray-400 mt-0.5">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-4 mt-6 flex items-center justify-between">
                        <p className="text-[8px] text-gray-300 leading-relaxed font-sans">
                            Généré par Monka v2.0 — Moteur clinique certifié<br />
                            {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-5 w-auto opacity-30" />
                    </div>
                </div>
            </div>
        </div>
    )
}
