/* ===========================================
   CRMedecinDocument — CR Médecin Officiel
   
   V2-05: Logo Monka + 5 sections complètes.
   Export PDF via window.print() + @media print.
   Sub-sections extracted to CRSections.tsx.
   =========================================== */

import { motion } from 'framer-motion'
import { FileText, Printer } from 'lucide-react'
import {
    VULN_IDS, VULN_COLORS,
    getActiveQuestions, getThresholdsForVuln,
    getNiveauForScore, generateConclusionPhrases, mapObjectifClinique, formatActeur,
    getContentBlocksForEntity,
    type CRNiveau, type VulnerabilityId,
} from '../../clinical/hooks'
import type { SimulatorTabProps } from './types'
import { SyntheseSection, AlertesSection, PlanActionSection, AnnexeSection } from './CRSections'

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

    // Top 5 MPs for detail section
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
                mpId, vulnId: mpVulnMap[mpId],
                nom: mp?.nom || mpId, objectif: mp?.objectif || '—',
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
                <button onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Printer className="w-3.5 h-3.5" /> Exporter PDF
                </button>
            </div>

            <div className="cr-document bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {/* ── HEADER with logo ── */}
                <div className="bg-gray-800 text-white px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-8 w-auto" />
                        <div>
                            <p className="text-xs font-bold tracking-wider uppercase font-sans">Compte Rendu Médecin Traitant</p>
                            <p className="text-[9px] text-gray-400 font-sans">Projection moteur clinique • Aucune valeur diagnostique</p>
                        </div>
                    </div>
                    <span className="text-[9px] font-bold text-red-300 border border-red-400/50 px-2 py-0.5 rounded font-sans">CONFIDENTIEL</span>
                </div>

                <div className="p-5 space-y-5">
                    {/* EN-TÊTE */}
                    <div className="border-b border-gray-200 pb-4">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Aidant</span><p className="font-bold text-gray-800 mt-0.5">{personaId ? `Persona ${personaId}` : 'Profil simulé'}</p></div>
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Proche aidé</span><p className="font-bold text-gray-800 mt-0.5">Proche simulé</p></div>
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Date de génération</span><p className="text-gray-700 mt-0.5">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
                            <div><span className="text-gray-400 text-[10px] uppercase tracking-wider">Type d&apos;évaluation</span><p className="text-gray-700 mt-0.5">Initiale</p></div>
                        </div>
                    </div>

                    {/* SECTION 1 — Synthèse */}
                    <SyntheseSection niveaux={niveaux} data={data} />

                    {/* SECTION 2 — Alertes prioritaires */}
                    <AlertesSection data={data} activatedCats={activatedCats} mpMap={mpMap} mpVulnMap={mpVulnMap} />

                    {/* SECTION 3 — Top MPs */}
                    <DetailMPsSection top5MPs={top5MPs} activatedMPs={activatedMPs} data={data} activatedCats={activatedCats} mpVulnMap={mpVulnMap} niveaux={niveaux} scoreByV={scoreByV} mpMap={mpMap} />

                    {/* SECTION 4 — Plan d'action (Top MTs) */}
                    <PlanActionSection data={data} activatedMPs={activatedMPs} mpMap={mpMap} mpVulnMap={mpVulnMap} />

                    {/* SECTION 5 — Conclusion */}
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="cr-section-title">Conclusion</h4>
                        <div className="space-y-2">
                            {conclusionPhrases.map((phrase, i) => (
                                <p key={i} className="text-[11px] text-gray-700 leading-relaxed">{phrase}</p>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 6 — Annexe technique */}
                    <AnnexeSection data={data} scoreByV={scoreByV} activatedMPs={activatedMPs} answers={answers} />

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-3 mt-4 flex items-center justify-between">
                        <p className="text-[8px] text-gray-300 leading-relaxed font-sans">
                            Généré par Monka v2.0 — Moteur clinique certifié<br />
                            Sans valeur diagnostique • Sans valeur prescriptive
                        </p>
                        <img src="/assets/monka-logo-transparent.png" alt="Monka" className="h-5 w-auto opacity-30" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ── Inline detail section (kept here to avoid circular deps) ──

function DetailMPsSection({ top5MPs, activatedMPs, data, activatedCats: _activatedCats, mpVulnMap: _mpVulnMap, niveaux: _niveaux, scoreByV: _scoreByV, mpMap: _mpMap }: {
    top5MPs: { mpId: string; vulnId: string; nom: string; objectif: string; objectifClinique: string; acteurPrincipal: string; autresActeurs: string[] }[]
    activatedMPs: string[]
    data: CRDocProps['data']
    activatedCats: Map<string, { mpId: string; niveau: string }>
    mpVulnMap: Record<string, string>
    niveaux: Record<VulnerabilityId, CRNiveau>
    scoreByV: Record<string, { score: number; max: number }>
    mpMap: Record<string, { nom: string; objectif?: string | null; vulnerability_id?: string }>
}) {
    return (
        <div className="cr-bloc">
            <h4 className="cr-section-title">Top {Math.min(5, activatedMPs.length)} axes d&apos;action prioritaires</h4>
            {top5MPs.length > 0 ? (
                <div className="space-y-3">
                    {top5MPs.map(mp => {
                        const mpSensCBs = getContentBlocksForEntity(data, 'micro_parcours', mp.mpId).filter(cb => cb.block_type === 'sens_clinique')
                        return (
                            <div key={mp.mpId} className="p-3 rounded-lg border border-gray-200 bg-white">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: vColorMap[mp.vulnId as VulnerabilityId] || '#666' }}>{mp.vulnId}</span>
                                    <span className="text-[11px] font-bold text-gray-800 leading-snug">{mp.nom}</span>
                                </div>
                                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-[10px] ml-[30px]">
                                    <div><span className="text-gray-400">Acteur principal : </span><span className="font-bold text-gray-700">{formatActeur(mp.acteurPrincipal)}</span></div>
                                    <div><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700">{mp.objectifClinique}</span></div>
                                    {mp.autresActeurs.length > 0 && (
                                        <div className="col-span-2"><span className="text-gray-400">Écosystème : </span><span className="text-gray-500">{mp.autresActeurs.map(a => formatActeur(a)).join(', ')}</span></div>
                                    )}
                                    <div className="col-span-2"><span className="text-gray-400">Objectif : </span><span className="text-gray-600 italic">{mp.objectif}</span></div>
                                </div>
                                {mpSensCBs.length > 0 && (
                                    <p className="text-[9.5px] text-gray-500 mt-2 ml-[30px] leading-relaxed border-l-2 border-gray-200 pl-2">{mpSensCBs[0].content}</p>
                                )}
                            </div>
                        )
                    })}
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
    )
}
