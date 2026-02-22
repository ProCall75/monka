/* =============================================
   Integrity Checks — Monka Clinical Engine
   
   Pure TS, zero React dependencies.
   Validates data coherence across all Supabase
   tables. Returns structured check results.
   ============================================= */

import type { MonkaData } from './dbTypes'

// === Types ===

export interface IntegrityCheck {
    id: string
    label: string
    status: 'pass' | 'warn' | 'fail'
    detail: string
    count: number       // items checked
    issues: number      // items with issues
}

export interface IntegrityReport {
    checks: IntegrityCheck[]
    totalChecks: number
    passed: number
    warnings: number
    failures: number
    overallStatus: 'pass' | 'warn' | 'fail'
}

// === Individual Checks ===

/** C1: All FK links valid (categories→MPs, rules→cats, recos→cats, MTs→cats) */
function checkFKIntegrity(d: MonkaData): IntegrityCheck {
    const mpIds = new Set(d.microParcours.map(mp => mp.id))
    const catIds = new Set(d.categories.map(c => c.id))
    let total = 0, issues = 0

    for (const c of d.categories) { total++; if (!mpIds.has(c.mp_id)) issues++ }
    for (const r of d.activationRules) { total++; if (!catIds.has(r.category_id)) issues++ }
    for (const r of d.recommendations) { total++; if (!catIds.has(r.category_id)) issues++ }
    for (const mt of d.microTaches) { total++; if (!catIds.has(mt.category_id)) issues++ }

    return check('fk_integrity', 'Intégrité FK', total, issues,
        issues === 0 ? `${total} liens FK valides` : `${issues}/${total} FK cassées`)
}

/** C2: All MPs have ≥1 category, ≥1 rule, ≥1 reco, ≥1 MT */
function checkMPCompleteness(d: MonkaData): IntegrityCheck {
    let issues = 0
    const details: string[] = []

    for (const mp of d.microParcours) {
        const hasCat = d.categories.some(c => c.mp_id === mp.id)
        const hasRule = d.activationRules.some(r => r.mp_id === mp.id)
        const hasReco = d.recommendations.some(r => r.mp_id === mp.id)
        const hasMT = d.microTaches.some(mt => mt.mp_id === mp.id)
        if (!hasCat || !hasRule || !hasReco || !hasMT) {
            issues++
            const missing = [!hasCat && 'cat', !hasRule && 'rule', !hasReco && 'reco', !hasMT && 'MT'].filter(Boolean)
            details.push(`${mp.id}: manque ${missing.join(', ')}`)
        }
    }

    return check('mp_completeness', 'Complétude MPs', d.microParcours.length, issues,
        issues === 0 ? `${d.microParcours.length} MPs complets` : details.slice(0, 3).join(' | '))
}

/** C3: All wording_idec and wording_utilisateur non-empty in recos */
function checkRecoWordings(d: MonkaData): IntegrityCheck {
    let issues = 0
    for (const r of d.recommendations) {
        if (!r.wording_idec?.trim() || !r.wording_utilisateur?.trim()) issues++
    }
    return check('reco_wordings', 'Wording recos', d.recommendations.length, issues,
        issues === 0 ? `${d.recommendations.length} recos avec wordings` : `${issues} recos sans wording`)
}

/** C4: No orphan questions in scoring_questions */
function checkScoringOrphans(d: MonkaData): IntegrityCheck {
    const qIds = new Set(d.questions.map(q => q.id))
    let issues = 0
    for (const sq of d.scoringQuestions) {
        if (!qIds.has(sq.question_id)) issues++
    }
    return check('scoring_orphans', 'Scoring orphelins', d.scoringQuestions.length, issues,
        issues === 0 ? `${d.scoringQuestions.length} scoring entries valides` : `${issues} scoring entries orphelines`)
}

/** C5: No empty acteur[] in MTs */
function checkMTActors(d: MonkaData): IntegrityCheck {
    let issues = 0
    for (const mt of d.microTaches) {
        if (!mt.acteur?.length) issues++
    }
    return check('mt_actors', 'Acteurs MTs', d.microTaches.length, issues,
        issues === 0 ? `${d.microTaches.length} MTs avec acteurs` : `${issues} MTs sans acteur`)
}

/** C6: Content blocks coverage by entity_type */
function checkContentBlocksCoverage(d: MonkaData): IntegrityCheck {
    const types = new Set(d.contentBlocks.map(cb => cb.entity_type))
    const expected = ['vulnerability', 'micro_parcours', 'scoring', 'question', 'category']
    const missing = expected.filter(t => !types.has(t))
    const issues = missing.length

    return check('cb_coverage', 'Content blocks coverage', expected.length, issues,
        issues === 0
            ? `${types.size} entity_types couverts (${d.contentBlocks.length} blocs)`
            : `Manque: ${missing.join(', ')}`)
}

// === Composite Report ===

export function runIntegrityChecks(data: MonkaData): IntegrityReport {
    const checks = [
        checkFKIntegrity(data),
        checkMPCompleteness(data),
        checkRecoWordings(data),
        checkScoringOrphans(data),
        checkMTActors(data),
        checkContentBlocksCoverage(data),
    ]

    const passed = checks.filter(c => c.status === 'pass').length
    const warnings = checks.filter(c => c.status === 'warn').length
    const failures = checks.filter(c => c.status === 'fail').length
    const overallStatus = failures > 0 ? 'fail' : warnings > 0 ? 'warn' : 'pass'

    return { checks, totalChecks: checks.length, passed, warnings, failures, overallStatus }
}

// === Helpers ===

function check(id: string, label: string, count: number, issues: number, detail: string): IntegrityCheck {
    const status = issues === 0 ? 'pass' : issues <= 2 ? 'warn' : 'fail'
    return { id, label, status, detail, count, issues }
}
