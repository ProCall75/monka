# 🔍 QG-5 — Vue Externe

> **Date** : 20 février 2026  
> **Bloc** : 5 — Vue Externe (style Marwane)  
> **Checkpoint** : after-architecture  

---

## Sections vérifiées

| § | Section | Verdict | Détails |
|---|---------|---------|---------|
| §2 | Structure | ✅ | `SimulatorExternalView.tsx` = 299L (< 300L). 4 sous-composants < 50L chacun. `SimulatorPage.tsx` = 673L (< 700L cible). |
| §10 | Edge Cases | ✅ | Fallback si 0 MP activé ET 0 prévention → message "Aucun parcours activé". |
| §18 | A11y | ⚠️ | Non audité dans ce bloc (pas de changement visuel, extraction pure). À valider dans un audit global (Bloc 8). |
| §17 | Perf | ✅ | Pas de re-renders supplémentaires — les props passées sont les mêmes objets mémorisés. |

---

## Réserves

### §18 — Accessibilité mobile (⚠️)
**Constat** : Pas d'audit a11y spécifique dans ce bloc — c'est une extraction 1:1 sans changement d'UI.  
**Impact** : Nul pour ce bloc (comportement identique à l'existant).  
**Résolution** : Audit global prévu QG-8 before-deploy.

---

## Validation

| Vérification | Résultat |
|--------------|----------|
| `npx tsc --noEmit` | ✅ 0 erreurs |
| `SimulatorPage.tsx` | 673L (< 700L cible) ✅ |
| `SimulatorExternalView.tsx` | 299L (< 300L) ✅ |
| Import unused cleanup | ✅ `Users` retiré de SimulatorPage |
| Sous-composants < 50L | ✅ max = `MTList` 25L |

---

## Verdict global

### ✅ Peut procéder — 1 réserve mineure acceptée (§18 → QG-8)
