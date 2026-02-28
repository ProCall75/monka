/* CRSections — Sub-components for CR Médecin document.
   Extracted from CRMedecinDocument to keep each file < 300L.
   Contains: SyntheseSection, DetailSection, AlertesSection, PlanActionSection, AnnexeSection. */

import {
    VULN_IDS, VULN_COLORS,
    getRulesForMP,
    CR_VULN_LABELS, CR_NIVEAU_DISPLAY, CR_PHR_B2,
    formatActeur,
    type CRNiveau, type VulnerabilityId,
    getContentBlocksForEntity,
} from '../../clinical/hooks'
import type { MonkaData } from '../../clinical/hooks'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

// ── Types ──────────────────────────────────────────────

export interface CRSectionProps {
    data: MonkaData
    niveaux: Record<VulnerabilityId, CRNiveau>
    scoreByV: Record<string, { score: number; max: number }>
    activatedMPs: string[]
    activatedCats: Map<string, { mpId: string; niveau: string }>
    mpMap: Record<string, { nom: string; objectif?: string | null; vulnerability_id?: string }>
    mpVulnMap: Record<string, string>
    answers: Record<string, string | string[]>
}

// ── 1. Synthèse Situationnelle ─────────────────────────

export function SyntheseSection({ niveaux, data }: Pick<CRSectionProps, 'niveaux' | 'data'>) {
    return (
        <div>
            <h4 className="cr-section-title">Synthèse situationnelle de la dyade</h4>
            <div className="space-y-2.5">
                {VULN_IDS.map(vId => {
                    const niveau = niveaux[vId]
                    const display = CR_NIVEAU_DISPLAY[niveau]
                    const phrase = CR_PHR_B2[`${vId}_${niveau}`] || '—'
                    const vulnCBs = getContentBlocksForEntity(data, 'vulnerability', vId).filter(cb => cb.block_type === 'sens_clinique')
                    return (
                        <div key={vId} className="p-2.5 rounded-lg bg-gray-50/80">
                            <div className="flex gap-3 items-start">
                                <div className="flex-shrink-0 flex items-center gap-1.5 min-w-[140px]">
                                    <span className="text-sm">{display.emoji}</span>
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: display.color }}>{display.label}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold text-gray-700 mb-0.5 font-sans">{CR_VULN_LABELS[vId]}</p>
                                    <p className="text-[10.5px] text-gray-600 leading-relaxed italic">{phrase}</p>
                                </div>
                            </div>
                            {vulnCBs.length > 0 && (
                                <p className="text-[9.5px] text-gray-500 mt-1.5 pl-[156px] leading-relaxed">{vulnCBs[0].content}</p>
                            )}
                        </div>
                    )
                })}
            </div>
            {/* Score bar */}
            <div className="mt-3 grid grid-cols-5 gap-1">
                {VULN_IDS.map(vId => {
                    const display = CR_NIVEAU_DISPLAY[niveaux[vId]]
                    return (
                        <div key={vId} className="text-center">
                            <div className="h-2 rounded-full mb-1" style={{ backgroundColor: display.color, opacity: 0.7 }} />
                            <span className="text-[8px] text-gray-400 font-sans">{vId}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ── 2. Alertes Prioritaires ────────────────────────────

export function AlertesSection({ data, activatedCats, mpMap, mpVulnMap }: Pick<CRSectionProps, 'data' | 'activatedCats' | 'mpMap' | 'mpVulnMap'>) {
    const critiques = [...activatedCats.entries()].filter(([, c]) => c.niveau === 'critique')
    const cccs = [...activatedCats.entries()].filter(([, c]) => c.niveau === 'ccc')

    if (critiques.length === 0 && cccs.length === 0) return null

    return (
        <div className="cr-bloc">
            <h4 className="cr-section-title">⚠️ Alertes prioritaires</h4>
            {critiques.length > 0 && (
                <div className="mb-3">
                    <p className="text-[9px] font-bold text-red-600 uppercase mb-1.5">Situations critiques ({critiques.length})</p>
                    <div className="space-y-1.5">
                        {critiques.map(([catId, c]) => {
                            const cat = data.categories.find(ct => ct.id === catId)
                            const mp = mpMap[c.mpId]
                            const vuln = mpVulnMap[c.mpId]
                            return (
                                <div key={catId} className="flex items-start gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: vColorMap[vuln as VulnerabilityId] || '#999' }}>{vuln}</span>
                                    <div>
                                        <p className="text-[10px] font-bold text-red-800">{cat?.nom || catId}</p>
                                        <p className="text-[9px] text-red-600">MP : {mp?.nom || c.mpId}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            {cccs.length > 0 && (
                <div>
                    <p className="text-[9px] font-bold text-amber-600 uppercase mb-1.5">Combinaisons CCC ({cccs.length})</p>
                    <div className="space-y-1.5">
                        {cccs.map(([catId, c]) => {
                            const cat = data.categories.find(ct => ct.id === catId)
                            const vuln = mpVulnMap[c.mpId]
                            const rules = getRulesForMP(data, c.mpId).filter(r => r.category_id === catId && r.niveau === 'ccc')
                            return (
                                <div key={catId} className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: vColorMap[vuln as VulnerabilityId] || '#999' }}>{vuln}</span>
                                    <div>
                                        <p className="text-[10px] font-bold text-amber-800">{cat?.nom || catId}</p>
                                        {rules[0]?.sens_clinique && (
                                            <p className="text-[9px] text-amber-700 italic">🧠 {rules[0].sens_clinique}</p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

// ── 3. Plan d'Action (Top MTs cross-V) ────────────────

export function PlanActionSection({ data, activatedMPs, mpMap: _mpMap, mpVulnMap }: Pick<CRSectionProps, 'data' | 'activatedMPs' | 'mpMap' | 'mpVulnMap'>) {
    const topMTs = activatedMPs
        .flatMap(mpId => data.microTaches.filter(mt => mt.mp_id === mpId).map(mt => ({ ...mt, vulnId: mpVulnMap[mpId] })))
        .sort((a, b) => {
            const typeOrder: Record<string, number> = { MED: 0, SEC: 1, ADM: 2, INFO: 3 }
            return (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99)
        })
        .slice(0, 10)

    if (topMTs.length === 0) return null

    return (
        <div className="cr-bloc">
            <h4 className="cr-section-title">Plan d&apos;action recommandé — Top {topMTs.length} micro-tâches</h4>
            <table className="w-full text-[10px] border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-left">
                        <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">V</th>
                        <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Type</th>
                        <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Micro-tâche</th>
                        <th className="px-2 py-1.5 font-bold text-gray-400 uppercase text-[8px]">Acteur</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {topMTs.map(mt => (
                        <tr key={mt.id}>
                            <td className="px-2 py-1.5">
                                <span className="text-[9px] font-bold text-white px-1 py-0.5 rounded" style={{ backgroundColor: vColorMap[mt.vulnId as VulnerabilityId] || '#999' }}>{mt.vulnId}</span>
                            </td>
                            <td className="px-2 py-1.5">
                                <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${mt.type === 'MED' ? 'bg-red-100 text-red-600'
                                        : mt.type === 'SEC' ? 'bg-orange-100 text-orange-600'
                                            : 'bg-blue-100 text-blue-600'
                                    }`}>{mt.type}</span>
                            </td>
                            <td className="px-2 py-1.5 text-gray-700">{mt.libelle}</td>
                            <td className="px-2 py-1.5 text-gray-500">{mt.acteur ? formatActeur(mt.acteur.join(', ')) : '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// ── 4. Annexe Technique ────────────────────────────────

export function AnnexeSection({ data, scoreByV: _scoreByV, activatedMPs, answers }: Pick<CRSectionProps, 'data' | 'scoreByV' | 'activatedMPs' | 'answers'>) {
    const totalRules = data.activationRules.length
    const totalQuestions = data.questions.length
    const answeredCount = Object.keys(answers).length
    const cbCount = data.contentBlocks.length

    return (
        <div className="cr-bloc opacity-80">
            <h4 className="cr-section-title">Annexe technique</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded bg-gray-50">
                    <span className="text-gray-400">Méthode</span>
                    <p className="font-bold text-gray-700">Évaluation déterministe multi-dimensionnelle</p>
                </div>
                <div className="p-2 rounded bg-gray-50">
                    <span className="text-gray-400">Couverture</span>
                    <p className="font-bold text-gray-700">{answeredCount}/{totalQuestions} questions répondues</p>
                </div>
                <div className="p-2 rounded bg-gray-50">
                    <span className="text-gray-400">Règles évaluées</span>
                    <p className="font-bold text-gray-700">{totalRules} règles, {activatedMPs.length} MPs activés</p>
                </div>
                <div className="p-2 rounded bg-gray-50">
                    <span className="text-gray-400">Contenus cliniques</span>
                    <p className="font-bold text-gray-700">{cbCount} content blocks exploités</p>
                </div>
            </div>
            <div className="mt-2 p-2 rounded bg-amber-50 border border-amber-100 text-[9px] text-amber-700">
                ⚠️ Ce document est une projection basée sur le moteur clinique Monka. Il ne constitue ni un diagnostic, ni une prescription médicale. Les résultats doivent être interprétés par un professionnel de santé dans le contexte clinique global du patient.
            </div>
        </div>
    )
}
