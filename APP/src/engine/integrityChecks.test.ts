/* =============================================
   Unit Tests — Integrity Checks
   ============================================= */

import { describe, it, expect } from 'vitest'
import { runIntegrityChecks } from './integrityChecks'
import type { MonkaData } from './dbTypes'

// === Mock data factory ===

function mockData(overrides: Partial<MonkaData> = {}): MonkaData {
    return {
        vulnerabilities: [],
        questions: [],
        microParcours: [],
        questionMPMapping: [],
        categories: [],
        activationRules: [],
        scoringQuestions: [],
        scoringThresholds: [],
        recommendations: [],
        microTaches: [],
        suiviQuestions: [],
        contentBlocks: [],
        crTemplates: [],
        loaded: true,
        loading: false,
        error: null,
        ...overrides,
    }
}

// === Tests ===

describe('runIntegrityChecks', () => {
    it('returns 6 checks', () => {
        const result = runIntegrityChecks(mockData())
        expect(result.checks).toHaveLength(6)
        expect(result.totalChecks).toBe(6)
    })

    it('CB coverage fails for empty data (5 expected types missing)', () => {
        const result = runIntegrityChecks(mockData())
        expect(result.overallStatus).toBe('fail')
        const cb = result.checks.find(c => c.id === 'cb_coverage')
        expect(cb?.issues).toBe(5)
    })

    it('detects broken FK (category → mp)', () => {
        const data = mockData({
            categories: [{ id: 'C1', mp_id: 'NONEXISTENT' } as any],
        })
        const result = runIntegrityChecks(data)
        const fk = result.checks.find(c => c.id === 'fk_integrity')
        expect(fk?.issues).toBe(1)
    })

    it('detects incomplete MP (missing recos)', () => {
        const data = mockData({
            microParcours: [{ id: 'MP1', vulnerability_id: 'V1' } as any],
            categories: [{ id: 'C1', mp_id: 'MP1' } as any],
            activationRules: [{ id: 'R1', mp_id: 'MP1', category_id: 'C1' } as any],
            microTaches: [{ id: 'MT1', mp_id: 'MP1', category_id: 'C1' } as any],
            // No recommendations → MP incomplete
        })
        const result = runIntegrityChecks(data)
        const mp = result.checks.find(c => c.id === 'mp_completeness')
        expect(mp?.issues).toBe(1)
    })

    it('detects scoring orphans', () => {
        const data = mockData({
            questions: [{ id: 'Q1' } as any],
            scoringQuestions: [
                { id: 1, question_id: 'Q1' } as any,
                { id: 2, question_id: 'GHOST' } as any, // orphan
            ],
        })
        const result = runIntegrityChecks(data)
        const orphan = result.checks.find(c => c.id === 'scoring_orphans')
        expect(orphan?.issues).toBe(1)
    })

    it('detects missing content blocks coverage', () => {
        const data = mockData({
            contentBlocks: [
                { id: 'CB1', entity_type: 'vulnerability' } as any,
            ],
        })
        const result = runIntegrityChecks(data)
        const cb = result.checks.find(c => c.id === 'cb_coverage')
        expect(cb?.issues).toBe(4) // missing: micro_parcours, scoring, question, category
    })

    it('overall fail when >2 issues', () => {
        const data = mockData({
            microTaches: [
                { id: 'MT1', acteur: [], category_id: 'DEAD' } as any,
                { id: 'MT2', acteur: [], category_id: 'DEAD' } as any,
                { id: 'MT3', acteur: [], category_id: 'DEAD' } as any,
            ],
        })
        const result = runIntegrityChecks(data)
        const actors = result.checks.find(c => c.id === 'mt_actors')
        expect(actors?.status).toBe('fail')
    })
})
