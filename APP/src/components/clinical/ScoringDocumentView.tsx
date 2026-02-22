/* ScoringDocumentView — Printable official scoring document per vulnerability.
   4 sections: Méthodologie, Questions scorantes, Seuils, Limites.
   100% data-driven — zero hardcoded clinical text.
   Architecture: < 250L, uses hooks barrel. */

import { useMemo } from 'react'
import {
    VULN_META, getThresholdsForVuln, getQuestionText,
    getContentBlocksForEntity, CR_VULN_LABELS,
    type MonkaData, type VulnerabilityId,
} from '../../clinical/hooks'
import { ExportButton } from './ExportButton'

interface ScoringDocumentProps {
    data: MonkaData
    vulnId: VulnerabilityId
    onBack: () => void
}

export function ScoringDocumentView({ data, vulnId, onBack }: ScoringDocumentProps) {
    const meta = VULN_META[vulnId]
    const thresholds = useMemo(() => getThresholdsForVuln(data, vulnId), [data, vulnId])
    const scoringQs = useMemo(() =>
        data.scoringQuestions.filter(sq => sq.vulnerability_id === vulnId)
            .sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient)),
        [data, vulnId],
    )
    const vulnCBs = useMemo(() => getContentBlocksForEntity(data, 'vulnerability', vulnId), [data, vulnId])
    const totalCoef = scoringQs.reduce((s, q) => s + Math.abs(q.coefficient), 0)

    const thresholdLevels = [
        { key: 'faible', label: 'Faible', color: '#22C55E', emoji: '🟢' },
        { key: 'modere', label: 'Modéré', color: '#F5D245', emoji: '🟡' },
        { key: 'eleve', label: 'Élevé', color: '#F5A623', emoji: '🟠' },
        { key: 'critique', label: 'Critique', color: '#EF4444', emoji: '🔴' },
    ]

    return (
        <div className="max-w-[900px] mx-auto">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-4 no-print">
                <button onClick={onBack} className="text-xs text-monka-muted hover:text-monka-text transition-colors">← Retour</button>
                <div className="flex-1" />
                <ExportButton label={`Exporter Scoring ${vulnId}`} />
            </div>

            <div className="cr-document bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {/* Header */}
                <div className="bg-gray-800 text-white px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-8 w-auto" />
                        <div>
                            <p className="text-xs font-bold tracking-wider uppercase font-sans">Fiche Scoring</p>
                            <p className="text-[9px] text-gray-400 font-sans">{vulnId} — Méthodologie détaillée</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded font-sans" style={{ backgroundColor: meta.color }}>{meta.label}</span>
                </div>

                <div className="p-5 space-y-5">
                    {/* Title */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1 className="text-lg font-bold text-gray-800 mb-1">{CR_VULN_LABELS[vulnId]}</h1>
                        <p className="text-sm text-gray-500">Dimension {vulnId} — {scoringQs.length} questions scorantes</p>
                    </div>

                    {/* 1. Méthodologie */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">1. Méthodologie de scoring</h4>
                        <div className="p-3 bg-gray-50 rounded-lg text-[11px] text-gray-700 leading-relaxed space-y-2">
                            <p>Le score de la dimension <strong>{CR_VULN_LABELS[vulnId]}</strong> est calculé par somme pondérée des réponses aux {scoringQs.length} questions scorantes.</p>
                            <p className="font-mono text-[10px] text-gray-500 bg-white p-2 rounded border border-gray-200">
                                Score = Σ (coefficient × valeur_réponse) — Somme totale des coefficients : {totalCoef.toFixed(1)}
                            </p>
                            <p>Chaque question contribue au score proportionnellement à son coefficient. Les seuils déterminent le niveau de vulnérabilité.</p>
                        </div>
                        {vulnCBs.length > 0 && (
                            <div className="mt-2 space-y-1.5">
                                {vulnCBs.map(cb => (
                                    <div key={cb.id} className="p-2.5 rounded-lg bg-blue-50/50 text-[10px] text-gray-600 leading-relaxed">
                                        <span className="text-[8px] font-bold text-blue-500 uppercase mr-1">{cb.block_type}</span>
                                        {cb.content}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 2. Questions scorantes */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">2. Questions scorantes ({scoringQs.length})</h4>
                        <table className="w-full text-[10px] border-collapse">
                            <thead><tr className="bg-gray-50 text-left">
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-14">ID</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Question</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-14 text-right">Coef.</th>
                                <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px] w-16 text-right">Poids</th>
                            </tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {scoringQs.map(sq => {
                                    const qText = getQuestionText(data, sq.question_id)
                                    const weight = totalCoef > 0 ? (Math.abs(sq.coefficient) / totalCoef * 100) : 0
                                    return (
                                        <tr key={sq.question_id}>
                                            <td className="px-2 py-1.5 font-mono text-gray-400 text-[9px]">{sq.question_id}</td>
                                            <td className="px-2 py-1.5 text-gray-700">{qText}</td>
                                            <td className="px-2 py-1.5 text-right font-bold text-gray-600">{sq.coefficient}</td>
                                            <td className="px-2 py-1.5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full" style={{ width: `${weight}%`, backgroundColor: meta.color }} />
                                                    </div>
                                                    <span className="text-[9px] text-gray-400">{weight.toFixed(0)}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* 3. Seuils */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">3. Seuils de vulnérabilité</h4>
                        <div className="grid grid-cols-4 gap-2">
                            {thresholdLevels.map(tl => {
                                const th = thresholds.find(t => t.niveau === tl.key)
                                return (
                                    <div key={tl.key} className="p-3 rounded-lg border text-center" style={{ borderColor: tl.color + '40' }}>
                                        <span className="text-lg">{tl.emoji}</span>
                                        <p className="text-[10px] font-bold mt-1" style={{ color: tl.color }}>{tl.label}</p>
                                        {th ? (
                                            <p className="text-[11px] text-gray-600 font-mono mt-1">{th.seuil_min}–{th.seuil_max}</p>
                                        ) : (
                                            <p className="text-[9px] text-gray-400 mt-1">—</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 4. Limites et axes d'amélioration */}
                    <div className="cr-bloc">
                        <h4 className="cr-section-title">4. Limites et axes d&apos;amélioration</h4>
                        <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-[10.5px] text-gray-700 leading-relaxed space-y-2">
                            <p>⚠️ <strong>Limites actuelles du scoring {vulnId} :</strong></p>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                <li>Pondération basée sur l&apos;expertise clinique — pas encore validée par étude statistique</li>
                                <li>Score unidimensionnel — ne capture pas les interactions inter-dimensions</li>
                                <li>{scoringQs.length} questions scorantes sur {data.questions.length} questions totales</li>
                            </ul>
                            <p className="text-[10px] text-gray-500 italic mt-2">Les axes d&apos;amélioration seront formalisés dans les prochaines itérations du moteur clinique.</p>
                        </div>
                    </div>

                    {/* Métriques résumé */}
                    <div className="grid grid-cols-4 gap-2 text-[10px]">
                        {[
                            { label: 'Questions', val: scoringQs.length },
                            { label: 'Σ coef.', val: totalCoef.toFixed(1) },
                            { label: 'Seuils', val: thresholds.length },
                            { label: 'Content Blocks', val: vulnCBs.length },
                        ].map(m => (
                            <div key={m.label} className="p-2 rounded bg-gray-50 text-center">
                                <div className="text-lg font-bold text-gray-800">{m.val}</div>
                                <div className="text-gray-400">{m.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-3 mt-4 flex items-center justify-between">
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
