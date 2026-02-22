## 🔍 QG Itération — Correctifs Vue Externe + Fired-First

**Date :** 2026-02-22
**Fichiers modifiés :** 2
**Périmètre :** ExternalViewCards (wording_utilisateur + acteurs + type badges) + MPDetailView (fired rules first, non-fired collapsed)

### Fichiers impactés

| Fichier | Avant | Après | Statut |
|---|:---:|:---:|---|
| `ExternalViewCards.tsx` | 237L | 238L | ✅ < 300L |
| `MPDetailView.tsx` | 284L | 300L | ✅ ≤ 300L |

### Vérifications techniques

| Check | Résultat |
|---|---|
| `tsc --noEmit` | ✅ 0 erreurs |
| Fichiers < 300L | ✅ tous |
| Architecture (hooks barrier) | ✅ (1 pré-existant) |
| `console.log` = 0 | ✅ |
| `: any` = 0 | ✅ |
| Hardcode audit | ✅ wording vient de DB, types de DB |

### Conformité Senior Dev Framework

| § | Règle | Conforme |
|---|---|---|
| §2 | Structure fichier | ✅ |
| §4 | Types explicites | ✅ |
| §15 | Format commit | ✅ |
| §17 | Performance (useMemo) | ✅ |

### Changements effectués
1. **ExternalViewCards** : `wording_utilisateur` au lieu de `libelle`, acteurs non filtrés sur TOUS les MTs (contributives + non-contributives + prévention), badges type (SEC/INFO/ORGA etc.)
2. **MPDetailView** : fired rules affichées en premier (proéminentes), non-fired dans menu déroulant collapsible "Autres règles (N)"

### Dette pré-existante (hors périmètre)
- `PersonasPage.tsx` (697L), `SimulatorPage.tsx` (453L), `RoadmapPage.tsx` (323L), `clinicalEngine.ts` (319L)
- 1 violation archi `VulnOverviewTabs.tsx`

### Verdict
✅ **Conforme** — 0 dette introduite.
