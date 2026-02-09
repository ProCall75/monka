# 📋 RAPPORT DE CERTIFICATION — Chaîne de données Monka
> **Date** : 2026-02-06 23:45  
> **Scope** : SOURCES/extracted → QUESTIONNAIRE_V2 → DEMO/data/JSON  
> **Verdict** : ⚠️ **PARTIELLEMENT CERTIFIÉ** — Questions ✅ complètes, mais 5 types de données présentent des gaps

---

## 1. ✅ QUESTIONS — 100% COUVERT

| Vuln | Source (reco_complete) | Excel (questionnaire) | JSON | Status |
|------|----------------------|----------------------|------|--------|
| V1 | 15 | 15 | 15 | ✅ |
| V2 | 57 | 55 | 57 | ✅ |
| V3 | 27 | 26 | 27 | ✅ |
| V4 | 36 | 36 | 37 | ✅ (+1 crossover O48) |
| V5 | 18 | 18 | 21 | ✅ (+3 crossovers) |
| **Total** | **153** | **150** | **157** | **✅ 0 manquante** |

> Toutes les questions de `recommendations_complete.json` sont dans les JSON.

---

## 2. ⚠️ SCORING — GAP CRITIQUE

### Source (`scores_by_vulnerability.json`)
| Vuln | Questions scorées | IDs | Max score |
|------|-------------------|-----|-----------|
| V1 | 8 | E1, E2, E4, E5, N20, O27, O28, O30 | 15 |
| V2 | 11 | O7, O13, N24, E25, E26, O4, N11, N12, N13, N34, O26 | 22 |
| V3 | 10 | E7, E8, E9, E10, E11, E18, O6, O29, O33, O44 | 20 |
| V4 | 6 | E36, E37, E43, E47, E54, E57 | 12 |
| V5 | 3 | E66, E69, E70 | 6 |

### Templates (`scoring.md`)
| Vuln | Max score | Questions scorées | Seuils | Status |
|------|-----------|-------------------|--------|--------|
| V1 | 0 | 0 | 6 | ❌ Scores non mappés |
| V2 | 0 | 0 | 6 | ❌ Scores non mappés |
| V3 | 0 | 0 | 6 | ❌ Scores non mappés |
| V4 | 0 | 0 | 6 | ❌ Scores non mappés |
| V5 | 0 | 0 | 6 | ❌ Scores non mappés |

### JSON (`simulator_data.json`)
| Vuln | max_score | thresholds | Status |
|------|-----------|------------|--------|
| V1-V5 | 0 | 0 | ❌ Vide |

> **Issue** : Les scores de `scores_by_vulnerability.json` (38 questions, 75 pts total) ne sont pas propagés vers les templates `scoring.md` ni les JSON. Les templates ont des seuils (6 niveaux) mais pas les scores par question ni le max_score.

---

## 3. ⚠️ CCC — GAP IMPORTANT

### Source (`typologie_ccc_scoring.json`)
- 36 tables de définition
- Données CCC par vulnérabilité disponibles

### Templates (`ccc.md`)
| Vuln | CCC dans template | CCC dans JSON | Status |
|------|-------------------|---------------|--------|
| V1 | 0 | 0 | ❌ Aucun CCC documenté |
| V2 | 5 | 0 | ⚠️ 5 définis mais parsing JSON échoue |
| V3 | 0 | 0 | ❌ Aucun CCC documenté |
| V4 | 0 | 0 | ❌ Aucun CCC documenté |
| V5 | 0 | 0 | ❌ Aucun CCC documenté |

> **Issues** :
> 1. V2 a 5 CCC dans le template mais le parser `parse_ccc_md` ne les détecte pas (format `—` vs `–`)
> 2. V1, V3, V4, V5 n'ont aucun CCC documenté dans les templates

---

## 4. ⚠️ RECOMMENDATIONS — PARTIELLEMENT COUVERT

### Source (`recommendations_complete.json`)
- Chaque question a des `responses[]` avec `recommendation`, `actors`, `idec_actions`
- Riche en données réelles (textes de recommandation, acteurs, actions IDEC)

### Templates (`recommendations.md`)
| Vuln | Questions couvertes | Status |
|------|---------------------|--------|
| V1 | 7 | ⚠️ 7/15 questions |
| V2 | 8 | ⚠️ 8/57 questions |
| V3 | 10 | ⚠️ 10/27 questions |
| V4 | 10 | ⚠️ 10/36 questions |
| V5 | 8 | ⚠️ 8/18 questions |

### JSON (après parsing)
| Vuln | recos_questions | entries | micro_tasks | Status |
|------|-----------------|---------|-------------|--------|
| V1 | 7 | 19 | 19 | Partiel |
| V2 | 7 | 22 | 22 | Partiel |
| V3 | 10 | 29 | 29 | Partiel |
| V4 | 10 | 28 | 28 | Partiel |
| V5 | 8 | 27 | 27 | Partiel |

> **Issue** : Les templates `recommendations.md` ne couvrent qu'une fraction des questions. La source `recommendations_complete.json` contient des données pour toutes les questions mais elles ne sont pas transcrites dans les templates.

---

## 5. ⚠️ MICRO-TÂCHES — NON PROPAGÉES

### Source (`micro_taches_typologie.json`)
| Vuln | Total MT | Types |
|------|----------|-------|
| V2 | 82 | SEC=29, ORGA=18, MED=24, INFO=6, STRUC=5 |
| V3 | 33 | SEC=6, ORGA=8, MED=16, INFO=3 |
| V4 | 137 | ORGA=51, SEC=49, INFO=21, MED=12, STRUC=4 |
| V5 | 6 | ORGA=1, INFO=4, SEC=1 |
| **Total** | **258** | |

### JSON (dans les recos)
| Vuln | MT dans JSON | Status |
|------|-------------|--------|
| V1 | 19 | Partiel |
| V2 | 22 | ⚠️ 22/82 (27%) |
| V3 | 29 | ⚠️ 29/33 (88%) |
| V4 | 28 | ⚠️ 28/137 (20%) |
| V5 | 27 | ✅ 27/6 — surplus |

> **Issue** : 258 micro-tâches typologisées dans la source, seulement ~125 dans les JSON (via les recos).

---

## 6. ⚠️ DÉCLENCHEURS — PARTIELLEMENT COUVERT

| Vuln | Template rows | JSON critiques | JSON standards | JSON CCC | Total JSON |
|------|---------------|----------------|----------------|----------|------------|
| V1 | ~11 | 8 | 5 | 0 | 13 |
| V2 | ~10 | 5 | 0 | 0 | 5 |
| V3 | ~7 | 2 | 0 | 0 | 2 |
| V4 | ~6 | 0 | 0 | 0 | **0** |
| V5 | ~8 | 4 | 0 | 0 | 4 |

> **Issue** : V4 a 0 déclencheurs dans le JSON malgré ~6 lignes dans le template. Les standards sont vides pour V2-V5.

---

## 7. ✅ ASR & SIGNATURES — 100% COUVERT

| Vuln | Template ASR | JSON ASR | Signatures | Objectifs réels | Status |
|------|-------------|----------|------------|-----------------|--------|
| V1 | 4 | 4 | 8 | 4/4 | ✅ |
| V2 | 6 | 6 | 12 | 6/6 | ✅ |
| V3 | 4 | 4 | 8 | 4/4 | ✅ |
| V4 | 6 | 6 | 12 | 6/6 | ✅ |
| V5 | 4 | 4 | 8 | 4/4 | ✅ |
| **Total** | **24** | **24** | **48** | **24/24** | ✅ |

---

## 8. ✅ PERSONAS — 100% COUVERT

Toutes les 5 personas × 5 vulnérabilités ont leurs `responses` alignées avec le nombre de questions.

---

## 📊 SYNTHÈSE DE COUVERTURE

| Donnée | Source | Template | JSON | Couverture | Priorité |
|--------|--------|----------|------|------------|----------|
| **Questions** | 153 | 157 | 157 | ✅ **100%** | — |
| **ASR + Signatures** | 24+48 | 24+48 | 24+48 | ✅ **100%** | — |
| **Personas** | 5×5 | — | 5×5 | ✅ **100%** | — |
| **Scoring** | 38 q scorées | 0 q scorées | 0 | ❌ **0%** | 🔴 P1 |
| **CCC** | 36 tables | 5 (V2 seulement) | 0 | ❌ **0%** | 🔴 P1 |
| **Recommendations** | 153 complètes | ~43 | ~42 | ⚠️ **~28%** | 🟠 P2 |
| **Micro-tâches** | 258 | ~125 | ~125 | ⚠️ **~48%** | 🟠 P2 |
| **Déclencheurs** | tous | ~42 | ~24 | ⚠️ **~57%** | 🟡 P3 |

---

## 🎯 ACTIONS CORRECTIVES RECOMMANDÉES

### 🔴 P1 — Critiques (bloquent le simulateur)

1. **Propager les scores** depuis `scores_by_vulnerability.json` → `scoring.md` → JSON
   - 38 questions à scorer, 5 max_scores à calculer
   
2. **Documenter les CCC** pour V1, V3, V4, V5 depuis `typologie_ccc_scoring.json`
   - Fixer le parsing CCC V2 (tiret long `—` non reconnu par le regex)
   - Créer les CCC V1, V3, V4, V5

### 🟠 P2 — Importants (fonctionnalités incomplètes)

3. **Compléter les recommendations** : transcrire les recos de `recommendations_complete.json` → `recommendations.md` pour toutes les questions (pas seulement ~43)

4. **Mapper les micro-tâches** : intégrer les 258 MT de `micro_taches_typologie.json` dans les recommendations

### 🟡 P3 — Améliorations

5. **Compléter les déclencheurs** V2-V5 (standards manquants)
6. **Aligner V4** (retirer O48 crossover si non pertinent) et **V5** (vérifier E21/O53/O54)
