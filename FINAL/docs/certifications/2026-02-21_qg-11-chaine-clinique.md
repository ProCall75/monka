# 🔍 QG-11 — Chaîne Clinique Traçable

> **Date** : 21 février 2026  
> **Bloc** : 11 — Chaîne Clinique Traçable  
> **Checkpoint** : after-architecture  

---

## Sections vérifiées

| § | Section | Verdict | Détails |
|---|---------|---------|---------|
| §2 | Structure | ✅ | `ClinicalChain.tsx` = 102L, `SimulatorRulesTab.tsx` = 142L. Tous < 300L. |
| §10 | Edge Cases | ✅ | Chaîne incomplète (pas de recos/MTs pour une catégorie) → composant retourne null silencieusement. |
| §17 | Perf | ✅ | ClinicalChain affiché uniquement pour règles déclenchées — max ~10-20 chaînes en pratique. |

---

## Réserves

### Micro-Phase 11a — content_blocks (⏳)
**Constat** : Le populate de `content_blocks` depuis `KERNEL/VALIDATION_MP/V*/` n'a pas été exécuté. Le composant fait un lookup `contentBlocks` avec fallback gracieux (n'affiche rien si pas de content block trouvé).  
**Impact** : Les tooltips "Pourquoi cette question ?" ne s'affichent pas tant que content_blocks n'est pas peuplé.  
**Résolution** : Planifié en **Bloc 14** (micro-phase 14a).

### WhyThisQuestion.tsx (⏳)
**Constat** : Composant tooltip non créé. Dépend du populate content_blocks.  
**Résolution** : Planifié en **Bloc 14** (micro-phase 14a) après le populate.

---

## Validation

| Vérification | Résultat |
|--------------|----------|
| `npx tsc --noEmit` | ✅ 0 erreurs |
| `ClinicalChain.tsx` | 102L [NEW] ✅ |
| `SimulatorRulesTab.tsx` | 142L (inchangé net) ✅ |

---

## Verdict global

### ✅ Peut procéder — 2 reports data (micro-phase 11a, WhyThisQuestion)
