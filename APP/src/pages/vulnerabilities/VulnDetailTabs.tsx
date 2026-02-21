/* VulnDetailTabs — Heavy tab contents: MPs, Rules, Recos, MTs
   Extracted from VulnerabilitiesPage for architecture compliance. */

import { Layers, CheckCircle2 } from 'lucide-react'
import type { MonkaData } from '../../clinical/hooks'

type MP = MonkaData['microParcours'][0]
type Rule = MonkaData['activationRules'][0]
type Reco = MonkaData['recommendations'][0]
type MT = MonkaData['microTaches'][0]

/* ---- MPs Tab ---- */

export function VulnMPsTab({ mps, rules, recos, mts, color }: {
    mps: MP[]; rules: Rule[]; recos: Reco[]; mts: MT[]; color: string
}) {
    return (
        <div className="space-y-3">
            {mps.map(mp => {
                const mpRecos = recos.filter(r => r.mp_id === mp.id)
                const mpMTs = mts.filter(mt => mt.mp_id === mp.id)
                const mpRules = rules.filter(r => r.mp_id === mp.id)
                return (
                    <div key={mp.id} className="glass-card p-4">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                                <Layers className="w-4 h-4" style={{ color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: color }}>{mp.id}</span>
                                    <h4 className="text-sm font-bold text-monka-heading">{mp.nom}</h4>
                                </div>
                                {mp.objectif && <p className="text-xs text-monka-muted italic">{mp.objectif}</p>}
                            </div>
                            <div className="flex gap-3 text-center">
                                {[
                                    { label: 'Règles', value: mpRules.length },
                                    { label: 'Recos', value: mpRecos.length },
                                    { label: 'MT', value: mpMTs.length },
                                ].map(s => (
                                    <div key={s.label}>
                                        <div className="text-sm font-bold" style={{ color }}>{s.value}</div>
                                        <div className="text-[9px] text-monka-muted">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {(mp.signature_a || mp.signature_b) && (
                            <div className="flex gap-3 mt-2">
                                {mp.signature_a && <div className="text-[10px] px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100"><strong>A</strong> — {mp.signature_a}</div>}
                                {mp.signature_b && <div className="text-[10px] px-2 py-1 rounded-lg bg-red-50 text-red-500 border border-red-100"><strong>B</strong> — {mp.signature_b}</div>}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

/* ---- Rules Tab ---- */

export function VulnRulesTab({ rules, data, color }: { rules: Rule[]; data: MonkaData; color: string }) {
    const niveauColors: Record<string, string> = {
        critique: 'bg-red-50 text-red-600', ccc: 'bg-amber-50 text-amber-600', standard: 'bg-emerald-50 text-emerald-600',
    }
    const getQText = (qId: string) => data.questions.find(q => q.id === qId)?.question_text || qId

    return (
        <div className="glass-card overflow-hidden">
            <table className="w-full text-xs">
                <thead>
                    <tr className="border-b border-monka-border bg-gray-50/80">
                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">ID</th>
                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">MP</th>
                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Niveau</th>
                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Conditions d&apos;activation</th>
                        <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Sens clinique</th>
                    </tr>
                </thead>
                <tbody>
                    {rules.map(rule => {
                        const conditions = (Array.isArray(rule.condition_logic) ? rule.condition_logic : []) as Array<{ q?: string; op?: string; val?: string; vals?: string[] }>
                        return (
                            <tr key={rule.id} className="border-b border-monka-border/50 hover:bg-gray-50/50 align-top">
                                <td className="px-3 py-2 font-mono text-monka-muted">{rule.id}</td>
                                <td className="px-3 py-2 font-bold" style={{ color }}>{rule.mp_id}</td>
                                <td className="px-3 py-2">
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${niveauColors[rule.niveau] || 'bg-gray-50'}`}>{rule.niveau}</span>
                                </td>
                                <td className="px-3 py-2 max-w-[450px]">
                                    {conditions.length > 0 ? (
                                        <div className="space-y-1.5">
                                            {conditions.map((cond, i) => {
                                                const qId = cond.q || ''
                                                const qText = getQText(qId)
                                                const values = cond.vals || (cond.val ? [cond.val] : [])
                                                return (
                                                    <div key={i}>
                                                        {i > 0 && <span className="text-[9px] text-monka-muted font-bold uppercase block mb-0.5">ET</span>}
                                                        <div className="text-[11px] text-monka-text leading-snug">
                                                            <span className="text-monka-muted">Quand </span>
                                                            <span className="font-mono font-bold text-[10px] px-1 py-0.5 rounded bg-gray-100" style={{ color }}>{qId}</span>
                                                            <span className="text-monka-muted italic text-[10px] ml-1">« {qText.length > 60 ? qText.slice(0, 57) + '…' : qText} »</span>
                                                            <span className="text-monka-muted"> = </span>
                                                            {values.map((v, j) => (
                                                                <span key={j}>
                                                                    {j > 0 && <span className="text-monka-muted mx-0.5">ou</span>}
                                                                    <span className="px-1.5 py-0.5 rounded bg-monka-primary/10 text-monka-primary text-[10px] font-medium">{v}</span>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : <span className="text-monka-muted">—</span>}
                                </td>
                                <td className="px-3 py-2 text-monka-text max-w-[200px]">{rule.sens_clinique || '—'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

/* ---- Recos Tab ---- */

const MT_TYPE_COLORS: Record<string, string> = {
    STRUC: 'bg-blue-50 text-blue-600', SEC: 'bg-orange-50 text-orange-600',
    MED: 'bg-red-50 text-red-600', INFO: 'bg-green-50 text-green-600', ORGA: 'bg-purple-50 text-purple-600',
}

export function VulnRecosTab({ recos, rules, mts, color }: { recos: Reco[]; rules: Rule[]; mts: MT[]; color: string }) {
    return (
        <div className="space-y-2">
            {recos.map(reco => {
                const recoMTs = mts.filter(mt => mt.category_id === reco.category_id)
                const contributive = recoMTs.filter(mt => mt.is_contributive)
                const nonContributive = recoMTs.filter(mt => !mt.is_contributive)
                const niveauCls = reco.niveau === 'critique' ? 'bg-red-50 text-red-600 border-red-200'
                    : reco.niveau === 'ccc' ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : reco.niveau === 'standard' ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-gray-50 text-gray-500 border-gray-200'
                const linkedRule = rules.find(r => r.category_id === reco.category_id) || null
                return (
                    <div key={reco.id} className="glass-card p-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-mono text-monka-muted">{reco.id}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-monka-muted">{reco.mp_id}</span>
                                    {reco.niveau && <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${niveauCls}`}>{reco.niveau}</span>}
                                    {linkedRule && <span className="text-[10px] text-monka-muted italic">← {linkedRule.id}</span>}
                                </div>
                                <p className="text-xs text-monka-text leading-relaxed">{reco.wording_utilisateur}</p>
                                {contributive.length > 0 && <MTGroup label="📍 Sécurisation" mts={contributive} borderColor="border-emerald-200" labelColor="text-emerald-600" />}
                                {nonContributive.length > 0 && <MTGroup label="💡 Amélioration" mts={nonContributive} borderColor="border-gray-200" labelColor="text-gray-400" />}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function MTGroup({ label, mts, borderColor, labelColor }: { label: string; mts: MT[]; borderColor: string; labelColor: string }) {
    return (
        <div className={`mt-2 pl-3 border-l-2 ${borderColor} space-y-1`}>
            <span className={`text-[9px] font-bold ${labelColor} uppercase`}>{label} ({mts.length})</span>
            {mts.map(mt => (
                <div key={mt.id} className="text-[10px] text-monka-muted flex items-center gap-1.5">
                    <span className={`px-1 py-0.5 rounded font-mono font-bold ${MT_TYPE_COLORS[mt.type] || 'bg-gray-50'}`}>{mt.type}</span>
                    <span className="line-clamp-1">{mt.libelle}</span>
                </div>
            ))}
        </div>
    )
}

/* ---- MTs Tab ---- */

export function VulnMTsTab({ mts, recos, color }: { mts: MT[]; recos: Reco[]; color: string }) {
    return (
        <div>
            {/* Summary badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {(['STRUC', 'SEC', 'MED', 'INFO', 'ORGA'] as const).map(type => {
                    const count = mts.filter(mt => mt.type === type).length
                    const cls: Record<string, string> = {
                        STRUC: 'bg-blue-100 text-blue-600 border-blue-200', SEC: 'bg-orange-100 text-orange-600 border-orange-200',
                        MED: 'bg-red-100 text-red-600 border-red-200', INFO: 'bg-green-100 text-green-600 border-green-200',
                        ORGA: 'bg-purple-100 text-purple-600 border-purple-200',
                    }
                    return <div key={type} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${cls[type]}`}>{type} <span className="ml-1 opacity-70">{count}</span></div>
                })}
                <div className="w-px bg-gray-200 mx-1" />
                {(['medical', 'medico-social'] as const).map(dom => {
                    const count = mts.filter(mt => mt.domaine === dom).length
                    return (
                        <div key={dom} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${dom === 'medical' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-teal-50 text-teal-600 border-teal-200'}`}>
                            {dom === 'medical' ? 'Médical' : 'Médico-social'} <span className="ml-1 opacity-70">{count}</span>
                        </div>
                    )
                })}
            </div>

            {/* MT table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-monka-border bg-gray-50/80">
                            <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">ID</th>
                            <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Type</th>
                            <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Domaine</th>
                            <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Libellé</th>
                            <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Acteur</th>
                            <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">Reco</th>
                            <th className="text-left px-3 py-2.5 font-bold text-monka-muted uppercase">MP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mts.map(mt => {
                            const reco = recos.find(r => r.category_id === mt.category_id)
                            return (
                                <tr key={mt.id} className="border-b border-monka-border/50 hover:bg-gray-50/50">
                                    <td className="px-3 py-2 font-mono text-monka-muted">{mt.id}</td>
                                    <td className="px-3 py-2"><span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${MT_TYPE_COLORS[mt.type] || 'bg-gray-50'}`}>{mt.type}</span></td>
                                    <td className="px-3 py-2">
                                        {mt.domaine && <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${mt.domaine === 'medical' ? 'bg-rose-50 text-rose-600' : 'bg-teal-50 text-teal-600'}`}>{mt.domaine === 'medical' ? 'Médical' : 'Médico-social'}</span>}
                                    </td>
                                    <td className="px-3 py-2 text-monka-text max-w-[300px]"><span className="line-clamp-2">{mt.libelle}</span></td>
                                    <td className="px-3 py-2 text-monka-muted">
                                        {mt.acteur && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 font-medium text-monka-text">{Array.isArray(mt.acteur) ? mt.acteur.join(', ') : mt.acteur}</span>}
                                    </td>
                                    <td className="px-3 py-2 font-mono text-monka-muted">{mt.category_id || '—'}</td>
                                    <td className="px-3 py-2">
                                        {reco?.mp_id && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 font-medium" style={{ color }}>{reco.mp_id}</span>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
