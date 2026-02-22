# QG V2-04 — Règles d'Activation en Français

**Date** : 2026-02-22
**Bloc** : V2-04 — Règles d'Activation en Français
**Statut** : ✅ VALIDÉ

## Périmètre

Affichage des règles d'activation avec conditions en français, groupement par catégorie/niveau, sens clinique.

## Sections vérifiées

| § | Section | Verdict | Détail |
|---|---------|:-------:|--------|
| §2 | Structure | ✅ | `RuleExplainerFR.tsx` 145L, `SimulatorRulesTab.tsx` 188L — tous < 300L |
| §19 | Docs | ✅ | `sens_clinique` affiché, conditions traduites en FR |
| Hardcode | 0 match | ✅ | Questions via `getQuestionText()`, pas de codes bruts |

## Livrables vérifiés

- [x] `RuleExplainerFR` : conditions FR, NiveauBadge, live answer status, CCC support
- [x] `SimulatorRulesTab` : groupement par catégorie, auto-expand triggered, summary bar
- [x] Opérateurs traduits : `in` → "répondu", `eq` → "=", `gte` → "≥"
- [x] Build clean : `tsc --noEmit` = 0

## Verdict

✅ **VALIDÉ** — Peut procéder au bloc suivant.
