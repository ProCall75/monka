## 🔍 QG Itération — Refonte Simulateur Interne Complète

**Date :** 2026-02-22
**Périmètre :** Dashboard + Simulateur 4 phases + Triggers Personas + Retrait Signatures

---

### 📋 Analyse d'Impact

| Fichier | Lignes | Modification | Impact |
|---------|:---:|---|---|
| `DashboardPage.tsx` | 200L | EngineHealthCard retiré | 🟢 |
| `MPDetailView.tsx` | 241L | Pipeline KERNEL + retrait signatures | 🟠 |
| `SimulatorMPTab.tsx` | 119L | Simplification sub-tabs + retrait signatures | 🟢 |
| `CoverageHeatmap.tsx` | 115L | V-filter + retrait orphelines | 🟢 |
| `PersonaComparison.tsx` | 223L | Profils enrichis + delta lisible | 🟠 |
| `MPDocumentView.tsx` | 215L | Retrait signatures | 🟢 |
| `personaAnswers.ts` | 1229L | +13 triggers × 8 personas | 🟢 (data) |
| `SimulatorPage.tsx` | 453L | Retrait Rules tab + activeV Coverage | 🟠 |

### Vérifications techniques

| Check | Résultat |
|---|---|
| `tsc --noEmit` | ✅ 0 erreurs |
| Fichiers modifiés < 300L | ✅ tous (sauf data + SimulatorPage pré-existant) |
| Architecture (hooks barrier) | ✅ 0 nouvelle violation |
| `console.log` = 0 | ✅ |
| `: any` = 0 | ✅ |
| Hardcode audit | ✅ signatures retirées, pas de nouveau hardcode |

---

### 🗃️ Audit DB — Alignement KERNEL

**13 tables en schema public :**

| Table | Colonnes | Statut | Notes |
|---|:---:|---|---|
| `questions` | 14 | ✅ | `is_trigger`, `aidance`, `condition_affichage`, `sens_clinique` — conforme K3/K7 |
| `micro_parcours` | 8 | ⚠️ | `signature_a`, `signature_b` — **obsolètes**, à dropper |
| `categories` | 5 | ✅ | |
| `activation_rules` | 11 | ✅ | `sens_clinique`, `justification_delai`, `justification_ccc` — conforme KERNEL |
| `recommendations` | 7 | ✅ | `wording_utilisateur` + `wording_idec` — conforme K6 |
| `micro_taches` | 21 | ✅ | `wording_std/ccc/crit`, `aidance`, `sens_clinique`, `contribution_asr` — conforme K15 |
| `scoring_questions` | 8 | ✅ | |
| `scoring_thresholds` | 8 | ✅ | |
| `content_blocks` | 7 | ✅ | |
| `cr_templates` | 7 | ✅ | |
| `guides` | 11 | ✅ | |
| `guide_mt_mapping` | 3 | ✅ | |
| `question_mp_mapping` | 7 | ✅ | |
| `suivi_questions` | 9 | ✅ | |
| `vulnerabilities` | 6 | ✅ | |

#### 🔴 À nettoyer

| Élément | Type | Action recommandée |
|---|---|---|
| `micro_parcours.signature_a` | Colonne obsolète | `ALTER TABLE DROP COLUMN` |
| `micro_parcours.signature_b` | Colonne obsolète | `ALTER TABLE DROP COLUMN` |
| `micro_taches_backup_20260221` | Table backup temporaire | `DROP TABLE` |
| `question_mp_mapping.source` default `'legacy'` | Valeur historique | Cosmétique — pas bloquant |
| `scoring_questions.source` default `'legacy'` | Valeur historique | Cosmétique — pas bloquant |
| `scoring_thresholds.source` default `'legacy'` | Valeur historique | Cosmétique — pas bloquant |

#### ✅ Tout le reste est conforme au KERNEL V6

- Double wording (utilisateur + IDEC) sur recos et MTs ✅ (K6, K15)
- `aidance` sur questions et MTs ✅ (K7)
- `sens_clinique` sur règles, questions et MTs ✅
- `condition_affichage` sur questions ✅ (modèle additif N3/O1)
- `classification` (scorante/facteur/etat) sur questions ✅
- `wording_std/ccc/crit` gradué sur MTs ✅ (K15)
- `is_contributive` / `is_prevention` / `is_parametric` sur MTs ✅
- `contribution_asr` + `justification_type` sur MTs ✅
- `justification_delai` + `justification_ccc` sur règles ✅

---

### Conformité Senior Dev Framework

| § | Règle | Conforme |
|---|---|---|
| §2 | Structure fichier (modifiés) | ✅ |
| §4 | Types explicites | ✅ |
| §11 | Error handling | ✅ |
| §15 | Format commit | ✅ (5 commits conventionnels) |
| §17 | Performance (useMemo) | ✅ |
| §19 | Documentation | ✅ |

### Dette technique pré-existante

| Fichier | Lignes | Priorité |
|---|:---:|---|
| `PersonasPage.tsx` | 697L | 🔴 |
| `SimulatorPage.tsx` | 453L | 🟠 |
| `RoadmapPage.tsx` | 323L | 🟠 |
| `clinicalEngine.ts` | 319L | 🟠 |
| `VulnOverviewTabs.tsx` (import engine direct) | 221L | 🟠 |

### Verdict

✅ **Conforme** — Itération terminée sans introduction de dette. DB alignée au KERNEL sauf 2 colonnes obsolètes et 1 table backup à dropper.
