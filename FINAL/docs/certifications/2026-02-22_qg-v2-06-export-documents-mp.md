# QG V2-06 — Export Documents MP Officiels

**Date** : 2026-02-22
**Bloc** : V2-06 — Export Documents MP Officiels
**Statut** : ✅ VALIDÉ

## Périmètre

Composants d'export officiels : ExportButton réutilisable, Fiche MP printable (6 sections), Fiche Scoring printable (4 sections).

## Sections vérifiées

| § | Section | Verdict | Détail |
|---|---------|:-------:|--------|
| §2 | Structure | ✅ | `ExportButton.tsx` 24L, `MPDocumentView.tsx` 221L, `ScoringDocumentView.tsx` 185L — tous < 300L |
| §19 | Docs | ✅ | MP: 6 sections (objectif, questions, rules, recos, MTs, métriques). Scoring: 4 sections (méthodologie, questions, seuils, limites) |
| Hardcode | 0 match | ✅ | 100% data-driven |

## Livrables vérifiés

- [x] `ExportButton` réutilisable (primary/subtle, `window.print()`)
- [x] `MPDocumentView` : fiche MP officielle, logo header/footer
- [x] `ScoringDocumentView` : fiche scoring par V, coefficient weight bars
- [x] Intégrés dans MPDrilldown + VulnDetail
- [x] Build clean : `tsc --noEmit` = 0

## Verdict

✅ **VALIDÉ** — Peut procéder au bloc suivant.
