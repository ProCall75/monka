/* =============================================
   Unit Tests — Engine Health Score
   ============================================= */

import { describe, it, expect } from 'vitest'
import { computeEngineHealth } from './engineHealthScore'
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
        personas: [],
        personaAnswers: [],
        loaded: true,
        loading: false,
        error: null,
        ...overrides,
    }
}

// === Tests ===

describe('computeEngineHealth', () => {
    it('returns low score for empty data (only linkIntegrity = 100%)', () => {
        const result = computeEngineHealth(mockData())
        expect(result.score).toBe(10) // linkIntegrity vacuous 100% × 10% weight
        expect(result.grade).toBe('F')
        expect(result.metrics).toHaveLength(6)
    })

    it('returns grade A for perfect data', () => {
        const data = mockData({
            questions: [
                { id: 'Q1', vulnerability_id: 'V1', is_trigger: false } as any,
            ],
            microParcours: [
                { id: 'MP1', vulnerability_id: 'V1' } as any,
            ],
            categories: [
                { id: 'C1', mp_id: 'MP1' } as any,
            ],
            activationRules: [
                { id: 'R1', mp_id: 'MP1', category_id: 'C1', niveau: 'standard', condition_logic: [{ q: 'Q1' }] } as any,
                { id: 'R2', mp_id: 'MP1', category_id: 'C1', niveau: 'ccc', condition_logic: [{ q: 'Q1' }] } as any,
                { id: 'R3', mp_id: 'MP1', category_id: 'C1', niveau: 'critique', condition_logic: [{ q: 'Q1' }] } as any,
            ],
            microTaches: [
                { id: 'MT1', mp_id: 'MP1', category_id: 'C1', acteur: ['IDEC'], wording_std: 'a', wording_ccc: 'b', wording_crit: 'c' } as any,
            ],
            scoringQuestions: [
                { id: 1, question_id: 'Q1', vulnerability_id: 'V1' } as any,
            ],
            recommendations: [
                { id: 'REC1', mp_id: 'MP1', category_id: 'C1' } as any,
            ],
        })

        const result = computeEngineHealth(data)
        expect(result.score).toBeGreaterThanOrEqual(90)
        expect(result.grade).toBe('A')
    })

    it('detects missing scoring coverage', () => {
        const data = mockData({
            questions: [
                { id: 'Q1', vulnerability_id: 'V1', is_trigger: false } as any,
                { id: 'Q2', vulnerability_id: 'V1', is_trigger: false } as any,
            ],
            scoringQuestions: [
                { id: 1, question_id: 'Q1', vulnerability_id: 'V1' } as any,
            ],
        })

        const result = computeEngineHealth(data)
        const scoringMetric = result.metrics.find(m => m.id === 'scoringCoverage')
        expect(scoringMetric?.value).toBe(50) // 1/2 = 50%
    })

    it('excludes trigger questions from coverage', () => {
        const data = mockData({
            questions: [
                { id: 'Q1', vulnerability_id: 'V1', is_trigger: true } as any,
                { id: 'Q2', vulnerability_id: 'V1', is_trigger: false } as any,
            ],
            activationRules: [
                { id: 'R1', mp_id: 'MP1', category_id: 'C1', niveau: 'standard', condition_logic: [{ q: 'Q2' }] } as any,
            ],
        })

        const result = computeEngineHealth(data)
        const qCoverage = result.metrics.find(m => m.id === 'questionCoverage')
        expect(qCoverage?.value).toBe(100) // Q2 is covered, Q1 excluded as trigger
    })

    it('detects MT without actors', () => {
        const data = mockData({
            microTaches: [
                { id: 'MT1', acteur: ['IDEC'] } as any,
                { id: 'MT2', acteur: [] } as any,
            ],
        })

        const result = computeEngineHealth(data)
        const actorMetric = result.metrics.find(m => m.id === 'actorComplete')
        expect(actorMetric?.value).toBe(50)
    })
})
