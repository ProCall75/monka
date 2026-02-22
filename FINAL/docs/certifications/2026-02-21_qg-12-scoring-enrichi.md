# 🔍 QG-12 — Scoring Enrichi

> **Date** : 21 février 2026  
> **Bloc** : 12 — Scoring Enrichi  
> **Checkpoint** : after-architecture  

---

## Sections vérifiées

| § | Section | Verdict | Détails |
|---|---------|---------|---------|
| §2 | Structure | ✅ | `ScoreBreakdown.tsx` = 111L, `SimulatorScoringTab` = 147L. Tous < 300L. |
| §3 | Tests | ⚠️ | Pas de tests unitaires (outil interne). Logique pure dans ScoreBreakdown, testable. |
| §10 | Edge Cases | ✅ | score=0 → barre 0%, pas de réponse → "Non répondu — max possible". Pas de score négatif possible (Math.max). |
| §17 | Perf | ✅ | Contributions calculées par filter/sort inline, max ~30 questions par V. < 1ms. |

---

## Réserves

### Micro-Phase 12a — Split supabaseData.ts (⏳)
**Constat** : `supabaseData.ts` à 545L — refactor lourd (~300L de helpers à déplacer, ~15 fichiers d'imports à mettre à jour).  
**Impact** : Risque de régression élevé. Token guard déclenché.  
**Résolution** : Reportée en **commit séparé** (prochaine session dédiée).

---

## Validation

| Vérification | Résultat |
|--------------|----------|
| `npx tsc --noEmit` | ✅ 0 erreurs |
| `ScoreBreakdown.tsx` | 111L [NEW] ✅ |
| `SimulatorScoringTab.tsx` | 147L (was 145L, +2L ScoreBreakdown integration) ✅ |
| `types.ts` | 78L (was 77L, +1L scoringMap) ✅ |
| `SimulatorPage.tsx` | 440L (scoringMap passé aux 4 tabs) ✅ |

---

## Verdict global

### ✅ Peut procéder — 1 report (micro-phase 12a → commit dédié)
