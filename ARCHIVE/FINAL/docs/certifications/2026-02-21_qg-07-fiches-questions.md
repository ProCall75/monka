# 🔍 QG-7 — Fiches Questions / Sidebar Extraction

> **Date** : 21 février 2026  
> **Bloc** : 7 — Fiches Questions  
> **Checkpoint** : after-architecture  

---

## Sections vérifiées

| § | Section | Verdict | Détails |
|---|---------|---------|---------|
| §2 | Structure | ✅ | `QuestionsSidebar.tsx` = 198L (< 300L). 3 sous-composants < 50L. `SimulatorPage.tsx` = 515L. |
| §17 | Perf | ⚠️ | Pas de virtualisation pour > 150 questions. Acceptable pour l'usage actuel (admin tool). |
| §18 | A11y | ⚠️ | Boutons réponse accessibles (click handler). Pas d'audit keyboard navigation formel. |
| §12 | Cache | ✅ | Filtres côté client via `useMemo`. Pas de requête réseau par filtre. |

---

## Réserves

### §17 — Virtualisation (⚠️)
**Constat** : 165 questions rendues sans virtualisation `react-window`.  
**Impact** : Nul en pratique (admin tool, pas end-user). Perfs acceptables.  
**Résolution** : Si besoin perf future → Bloc 9 (polish UI).

### §18 — Keyboard navigation (⚠️)
**Constat** : Pas d'audit a11y formel keyboard-only.  
**Impact** : Faible (usage admin).  
**Résolution** : QG-8 before-deploy.

---

## Validation

| Vérification | Résultat |
|--------------|----------|
| `npx tsc --noEmit` | ✅ 0 erreurs |
| `SimulatorPage.tsx` | 515L (was 673L, -158L) ✅ |
| `QuestionsSidebar.tsx` | 198L (< 300L) ✅ |
| Unused imports cleanup | ✅ `Activity`, `ChevronDown`, `ChevronRight` retirés |
| Sous-composants < 50L | ✅ `QuestionGroup` ~35L, `QuestionCard` ~45L |

---

## Verdict global

### ✅ Peut procéder — 2 réserves mineures acceptées (§17/§18 → QG-8/9)
