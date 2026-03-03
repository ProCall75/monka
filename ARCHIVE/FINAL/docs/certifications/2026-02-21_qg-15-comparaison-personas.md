# 🔍 QG-15 — Comparaison Personas

> **Date** : 21 février 2026  
> **Bloc** : 15 — Comparaison Personas  
> **Checkpoint** : after-architecture  

---

## Sections vérifiées

| § | Section | Verdict | Détails |
|---|---------|---------|---------|
| §2 | Structure | ✅ | `PersonaComparison.tsx` = 183L. < 250L. |
| §10 | Edge Cases | ✅ | 1 persona → message "sélectionnez au moins 2". Max 3 (boutons disabled au-delà). 0 answers → filtré out. |
| §17 | Perf | ✅ | Computation via useMemo. 2-3 personas × 5 V × ~24 MP rules = ~360 checks. < 5ms. |
| §18 | A11y | ⚠️ | Table standard HTML, pas de responsive wrapping. Acceptable pour outil interne. |

---

## Réserves

### Micro-Phase 15a — OfficialDocsPage + Réflexion (⏳)
**Constat** : Pages secondaires, pas critique pour le simulateur. Scope indépendant.  
**Résolution** : Reporté en **Bloc 18+** ou hors sprint.

### Micro-Phase 15b — Dashboard Score-Action Gap (⏳)
**Constat** : ScoreActionGap déjà intégré dans ScoringTab (Bloc 10). Dashboard dédié non requis.  
**Résolution** : Évalué → **non nécessaire**. Gap déjà visible via ScoringTab.

---

## Verdict global

### ✅ Peut procéder — 15a reporté, 15b résolu (pas besoin)
