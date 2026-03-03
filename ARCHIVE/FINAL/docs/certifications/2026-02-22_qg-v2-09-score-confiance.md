# QG V2-09 — Score de Confiance Moteur

**Date** : 2026-02-22
**Bloc** : V2-09 — Score de Confiance Moteur
**Statut** : ✅ VALIDÉ

## Périmètre

Engine Health Score composite /100 avec 6 métriques pondérées, affiché dans le Dashboard via une carte visuelle premium.

## Sections vérifiées

| § | Section | Verdict | Détail |
|---|---------|:-------:|--------|
| §2 | Structure | ✅ | `engineHealthScore.ts` 155L < 200L, `EngineHealthCard.tsx` 127L < 200L |
| §10 | Edge Cases | ✅ | Guards pour DB vide (0/0), division par zéro protégée, score 0 si data absente |
| §19 | Docs | ✅ | 6 métriques documentées dans SPRINT_V2.md, poids justifiés |
| Hardcode | 0 match | ✅ | Aucun ID clinique, benchmarks via constantes WEIGHTS |

## Architecture

```
DashboardPage → EngineHealthCard (React) → engineHealthScore.ts (Pure TS)
                                           ↑ Zéro import React, logique pure
```

## Métriques implémentées

| # | Métrique | Poids | Calcul |
|---|----------|:-----:|--------|
| M1 | Couverture questions | 25% | % non-trigger questions dans ≥1 rule condition_logic |
| M2 | Équilibre niveaux | 20% | % MPs avec 3 niveaux (std/ccc/crit) |
| M3 | Complétude wording | 20% | % MTs avec 3 wordings non-null |
| M4 | Couverture scoring | 15% | % questions avec scoring_questions entries |
| M5 | Complétude acteurs | 10% | % MTs avec acteur[] non vide |
| M6 | Intégrité liens | 10% | FK validées (categories→MPs, rules→cats, recos→cats, MTs→cats) |

## Verdict

✅ **VALIDÉ** — Score composite fonctionnel, pure TS, guard edge cases, architecture clean.
