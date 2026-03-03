# 🔍 QG Itération — UI Vulnérabilités, MP, Règles, MTs Prévention

**Date :** 2026-02-22
**Fichiers modifiés :** 5
**Lignes ajoutées/supprimées :** +65 / -205 (net: -140L)

## Itérations réalisées

### 1. VulnDetail — Tabs cleanup
| Avant | Après |
|-------|-------|
| 7 tabs (overview, questions, scoring, mps, **rules, recos, mts**) | 4 tabs (overview, questions, scoring, mps) |
| `VulnDetailTabs.tsx` 254L | **82L** (-172L) |
| `VulnDetail.tsx` 135L | **122L** |
| Signature_a/b hardcodé | **Supprimé** |
| Pas de navigation cross-page | **Bouton "Ouvrir dans MP"** avec useNavigate |

### 2. MicroParcoursPage — URL search param
- Auto-sélection MP via `?mp=R1` → `useSearchParams` + `useEffect`
- Navigation cross-page depuis VulnDetail → auto-drill-down

### 3. RuleExplainerFR — AND/OR + Sens clinique
- Connecteur **ET** explicite entre conditions (badge bleu standard, ambre CCC)
- Séparateur visuel horizontal
- **Sens clinique toggleable** : bouton Brain icon → click-to-expand
- Import `lucide-react` Brain icon

### 4. MPDrilldown — MTs Prévention séparées
- PREV MTs identifiées par `_PREV_` dans l'ID
- Bloc **Prévention** en purple (bg-purple-50/30, badge PREV)
- Séparé des MTs réguliers dans chaque catégorie
- `RuleCardFR` local supprimé → importation `RuleExplainerFR` partagé

## Vérifications

| Check | Résultat |
|---|---|
| Build clean (tsc) | ✅ 0 erreurs |
| Types clean | ✅ |
| Fichiers < 300L | ✅ (max: MPDrilldown 207L) |
| Architecture respectée | ✅ |
| Pas de console.log | ✅ 0 |
| Hardcode audit | ✅ signature supprimé |
| E2E Browser | ✅ 4 tests passés |

## Verdict

✅ **Conforme** — 4 itérations, -140L net, navigation cross-page, sens clinique toggleable, PREV MTs séparées.

## Dette technique identifiée

| Signal | Priorité | Notes |
|--------|:--------:|-------|
| Export scoring format (feuilles blanches) | 🟠 | Non fixé dans cette itération — nécessite audit `ScoringDocumentView` + print.css |
| CB `micro_tache` non créés | 🟢 | Enrichirait le drill-down MT |
| CB `activation_rule` non créés | 🟢 | Le sens_clinique est dans la table directement |
| DashboardPage.tsx 512L | 🟠 | Au-delà de 300L — planifié V2-12 |
| PersonasPage.tsx 697L | 🔴 | Très au-delà — split nécessaire |
| MicroParcoursPage 179L | 🟢 | Sous la limite |

## Idées non-exécutées

1. **Export PDF avec CB** : intégrer les content_blocks dans les fiches PDF exportées
2. **Filtre par catégorie dans MP list** : l'utilisateur a demandé un filtre par "catégories de reconnaissance" → nécessite clarification (catégorie = R1_CAT_01 ou catégorie = V1/V2/V3 ?)
3. **Scoring export fix** : le format d'export scoring s'adapte mal → besoin audit print.css
