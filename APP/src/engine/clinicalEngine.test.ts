/* =============================================
   Unit Tests — Clinical Engine (evaluateRule)
   ============================================= */

import { describe, it, expect } from 'vitest'
import { evaluateCondition, evaluateRule } from './clinicalEngine'

// === evaluateCondition ===

describe('evaluateCondition', () => {
    it('eq operator — true when answer matches', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'eq', val: 'Oui' }, { Q1: 'Oui' })).toBe(true)
    })

    it('eq operator — false when answer differs', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'eq', val: 'Oui' }, { Q1: 'Non' })).toBe(false)
    })

    it('eq operator — false when no answer', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'eq', val: 'Oui' }, {})).toBe(false)
    })

    it('neq operator — true when answer differs', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'neq', val: 'Non' }, { Q1: 'Oui' })).toBe(true)
    })

    it('in operator — true when answer is in vals', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'in', vals: ['Oui', 'Peut-être'] }, { Q1: 'Oui' })).toBe(true)
    })

    it('in operator — false when answer not in vals', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'in', vals: ['Oui', 'Peut-être'] }, { Q1: 'Non' })).toBe(false)
    })

    it('gte operator — true for greater value', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'gte', val: 3 }, { Q1: '5' })).toBe(true)
    })

    it('gte operator — true for equal value', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'gte', val: 3 }, { Q1: '3' })).toBe(true)
    })

    it('gte operator — false for lesser value', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'gte', val: 3 }, { Q1: '1' })).toBe(false)
    })

    it('contains operator — true when substring present', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'contains', val: 'douleur' }, { Q1: 'Ma douleur est forte' })).toBe(true)
    })

    it('has_any operator — true when enough items selected', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'has_any', min: 2 }, { Q1: ['A', 'B', 'C'] })).toBe(true)
    })

    it('has_any operator — false when not enough items', () => {
        expect(evaluateCondition({ q: 'Q1', op: 'has_any', min: 3 }, { Q1: ['A'] })).toBe(false)
    })
})

// === evaluateRule ===

describe('evaluateRule', () => {
    it('returns true when all conditions met (AND logic)', () => {
        const rule = {
            id: 'R1', mp_id: 'MP1', category_id: 'C1', niveau: 'standard' as const,
            condition_logic: [
                { q: 'Q1', op: 'eq', val: 'Oui' },
                { q: 'Q2', op: 'in', vals: ['A', 'B'] },
            ],
            sens_clinique: null, delai_jours: 30, rule_group: null,
        }
        expect(evaluateRule(rule, { Q1: 'Oui', Q2: 'A' })).toBe(true)
    })

    it('returns false when one condition fails', () => {
        const rule = {
            id: 'R1', mp_id: 'MP1', category_id: 'C1', niveau: 'standard' as const,
            condition_logic: [
                { q: 'Q1', op: 'eq', val: 'Oui' },
                { q: 'Q2', op: 'eq', val: 'Oui' },
            ],
            sens_clinique: null, delai_jours: 30, rule_group: null,
        }
        expect(evaluateRule(rule, { Q1: 'Oui', Q2: 'Non' })).toBe(false)
    })

    it('returns false for empty condition_logic (guard against empty rules)', () => {
        const rule = {
            id: 'R1', mp_id: 'MP1', category_id: 'C1', niveau: 'standard' as const,
            condition_logic: [],
            sens_clinique: null, delai_jours: 30, rule_group: null,
        }
        expect(evaluateRule(rule, {})).toBe(false)
    })
})
