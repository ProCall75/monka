/* ===========================================
   CRMedecinDocument — CR Médecin sub-component
   
   Renders the formal medical report document.
   Only shown when all questions are answered.
   Extracted from SimulatorCRTab.
   =========================================== */

import { motion } from 'framer-motion'
import { FileText, Printer } from 'lucide-react'
import {
    VULN_IDS, VULN_COLORS,
    getActiveQuestions, getThresholdsForVuln, getRulesForMP,
    CR_VULN_LABELS, CR_NIVEAU_DISPLAY, CR_PHR_B2, CR_PHR_B4_INITIAL,
    getNiveauForScore, generateConclusionPhrases, mapObjectifClinique, formatActeur,
    type CRNiveau, type VulnerabilityId,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'

const vColorMap = VULN_COLORS as Record<VulnerabilityId, string>

interface CRDocProps {
    data: SimulatorTabProps['data']
    answers: Record<string, string>
    scoreByV: Record<string, { score: number; max: number }>
    activatedMPs: string[]
    activatedCats: Map<string, { mpId: string; niveau: string }>
    mpMap: Record<string, { nom: string; objectif?: string | null; vulnerability_id?: string }>
    mpVulnMap: Record<string, string>
    personaId: string | null
}

/**
 * CRMedecinDocument — Formal medical report.
 * Only renders when all questions have been answered.
 */
export function CRMedecinDocument({ data, answers, scoreByV, activatedMPs, activatedCats, mpMap, mpVulnMap, personaId }: CRDocProps) {
    const allActiveQs = getActiveQuestions(data, answers)
    const globalAnswered = allActiveQs.filter(q => answers[q.id]).length
    const isComplete = globalAnswered === allActiveQs.length && allActiveQs.length > 0

    if (!isComplete) {
        return (
            <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-gray-200 text-center">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-monka-muted">CR Médecin Traitant</p>
                <p className="text-[10px] text-monka-muted mt-1">
                    Disponible quand l&apos;ensemble du questionnaire est répondu ({globalAnswered}/{allActiveQs.length})
                </p>
                <div className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-monka-primary/30 rounded-full transition-all" style={{ width: `${allActiveQs.length > 0 ? (globalAnswered / allActiveQs.length) * 100 : 0}%` }} />
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

    // Top 5 activated MPs
    const vulnOrder: Record<string, number> = { V1: 1, V2: 2, V3: 3, V4: 4, V5: 5 }
    const top5MPs = [...activatedMPs]
        .sort((a, b) => (vulnOrder[mpVulnMap[a]] || 99) - (vulnOrder[mpVulnMap[b]] || 99))
        .slice(0, 5)
        .map(mpId => {
            const mp = mpMap[mpId]
            const mtsForMP = data.microTaches.filter(mt => mt.mp_id === mpId)
            const acteurCounts: Record<string, number> = {}
            mtsForMP.forEach(mt => { (mt.acteur || []).forEach(a => { acteurCounts[a] = (acteurCounts[a] || 0) + 1 }) })
            const sortedActeurs = Object.entries(acteurCounts).sort((a, b) => b[1] - a[1])
            return {
                mpId,
                vulnId: mpVulnMap[mpId],
                nom: mp?.nom || mpId,
                objectif: mp?.objectif || '—',
                objectifClinique: mapObjectifClinique(mp?.objectif || ''),
                acteurPrincipal: sortedActeurs[0]?.[0] || '—',
                autresActeurs: sortedActeurs.slice(1).map(([a]) => a),
            }
        })

    const conclusionPhrases = generateConclusionPhrases(niveaux, activatedMPs.length)

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6">
            {/* Print button */}
            <div className="flex justify-end mb-2 no-print">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <Printer className="w-3.5 h-3.5" />
                    Exporter PDF
                </button>
            </div>
            <div className="cr-document bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {/* Header bar */}
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
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Aidant</span><p className="font-bold text-gray-800 mt-0.5">{personaId ? `Persona ${personaId}` : 'Profil simulé'}</p></div>
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Proche aidé</span><p className="font-bold text-gray-800 mt-0.5">Proche simulé</p></div>
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Date de génération</span><p className="text-gray-700 mt-0.5">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Type d&apos;évaluation</span><p className="text-gray-700 mt-0.5">Initiale</p></div>
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
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: display.color }}>{display.label}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-gray-700 mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{CR_VULN_LABELS[vId]}</p>
                                            <p className="text-[10.5px] text-gray-600 leading-relaxed italic">{phrase}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* BLOC 3 — AXES D'ACTION PRIORITAIRES */}
                    <div className="cr-bloc">
                        <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Top {Math.min(5, activatedMPs.length)} axes d&apos;action prioritaires
                        </h4>
                        {top5MPs.length > 0 ? (
                            <div className="space-y-3">
                                {top5MPs.map(mp => (
                                    <div key={mp.mpId} className="p-3 rounded-lg border border-gray-200 bg-white">
                                        <div className="flex items-start gap-2 mb-2">
                                            <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: vColorMap[mp.vulnId as VulnerabilityId] || '#666' }}>{mp.vulnId}</span>
                                            <span className="text-[10px] font-bold text-white bg-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">{mp.mpId}</span>
                                            <span className="text-[11px] font-bold text-gray-800 leading-snug">{mp.nom}</span>
                                        </div>
                                        <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-[10px] ml-[52px]">
                                            <div><span className="text-gray-400">Acteur principal : </span><span className="font-bold text-gray-700">{formatActeur(mp.acteurPrincipal)}</span></div>
                                            <div><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700">{mp.objectifClinique}</span></div>
                                            {mp.autresActeurs.length > 0 && (
                                                <div className="col-span-2"><span className="text-gray-400">Écosystème : </span><span className="text-gray-500">{mp.autresActeurs.map(a => formatActeur(a)).join(', ')}</span></div>
                                            )}
                                            <div className="col-span-2"><span className="text-gray-400">Objectif : </span><span className="text-gray-600 italic">{mp.objectif}</span></div>
                                        </div>
                                    </div>
                                ))}
                                {activatedMPs.length > 5 && (
                                    <p className="text-[9px] text-gray-400 italic text-center">
                                        + {activatedMPs.length - 5} axe{activatedMPs.length - 5 > 1 ? 's' : ''} supplémentaire{activatedMPs.length - 5 > 1 ? 's' : ''} identifié{activatedMPs.length - 5 > 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-[10px] text-gray-400 italic p-3 bg-gray-50 rounded-lg">
                                Aucun axe de structuration activé à ce stade.
                            </p>
                        )}
                    </div>

                    {/* BLOC 3b — DÉTAIL PAR VULNÉRABILITÉ */}
                    {activatedMPs.length > 0 && (
                        <div className="cr-bloc">
                            <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Détail par vulnérabilité
                            </h4>
                            <div className="space-y-4">
                                {VULN_IDS.filter(vId => activatedMPs.some(mpId => mpVulnMap[mpId] === vId)).map(vId => {
                                    const vMPs = activatedMPs.filter(mpId => mpVulnMap[mpId] === vId)
                                    const niveau = niveaux[vId]
                                    const display = CR_NIVEAU_DISPLAY[niveau]
                                    const vs = scoreByV[vId]
                                    return (
                                        <div key={vId} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
                                                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: vColorMap[vId] }}>{vId}</span>
                                                <span className="text-[10px] font-bold text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>{CR_VULN_LABELS[vId]}</span>
                                                <span className="text-[9px] text-gray-400 ml-auto">{vs?.score}/{vs?.max}</span>
                                                <span className="text-[9px] px-1.5 py-0.5 rounded text-white font-bold" style={{ backgroundColor: display.color }}>{display.label}</span>
                                            </div>
                                            <div className="divide-y divide-gray-100">
                                                {vMPs.map(mpId => {
                                                    const mp = mpMap[mpId]
                                                    if (!mp) return null
                                                    const rules = getRulesForMP(data, mpId)
                                                    const triggeredSensClinique = rules
                                                        .filter(r => r.sens_clinique)
                                                        .map(r => r.sens_clinique!)
                                                    const mpRecos = data.recommendations.filter(r => {
                                                        if (r.mp_id !== mpId) return false
                                                        const cat = activatedCats.get(r.category_id)
                                                        return cat && r.niveau === cat.niveau && r.wording_idec
                                                    })
                                                    return (
                                                        <div key={mpId} className="px-3 py-2.5">
                                                            <div className="flex items-center gap-2 mb-1.5">
                                                                <span className="text-[9px] font-bold text-white bg-gray-600 px-1.5 py-0.5 rounded">{mpId}</span>
                                                                <span className="text-[10px] font-bold text-gray-800">{mp.nom}</span>
                                                            </div>
                                                            {mp.objectif && <p className="text-[9px] text-gray-500 italic mb-1.5 ml-[42px]">🎯 {mp.objectif}</p>}
                                                            {mpRecos.length > 0 && (
                                                                <div className="ml-[42px] space-y-1 mb-1.5">
                                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">Recommandations IDEC</span>
                                                                    {mpRecos.slice(0, 3).map(r => (
                                                                        <p key={r.id} className="text-[9.5px] text-gray-600 leading-relaxed pl-2 border-l-2 border-blue-200">{r.wording_idec}</p>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {triggeredSensClinique.length > 0 && (
                                                                <div className="ml-[42px] bg-emerald-50/60 rounded px-2 py-1.5">
                                                                    <span className="text-[8px] font-bold text-emerald-600 uppercase">🧠 Sens clinique</span>
                                                                    {triggeredSensClinique.slice(0, 2).map((sc, i) => (
                                                                        <p key={i} className="text-[9.5px] text-emerald-700 italic leading-relaxed">{sc}</p>
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

                    {/* BLOC 4 — SUIVI LONGITUDINAL */}
                    <div className="opacity-50">
                        <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Suivi longitudinal
                        </h4>
                        <div className="p-3 rounded-lg bg-gray-50 border border-dashed border-gray-200">
                            <p className="text-[10px] text-gray-400 italic text-center">{CR_PHR_B4_INITIAL}</p>
                        </div>
                    </div>

                    {/* BLOC 5 — CONCLUSION */}
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Conclusion</h4>
                        <div className="space-y-2">
                            {conclusionPhrases.map((phrase, i) => (
                                <p key={i} className="text-[11px] text-gray-700 leading-relaxed">{phrase}</p>
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
}
