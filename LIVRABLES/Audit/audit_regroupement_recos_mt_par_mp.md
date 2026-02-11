# 📊 Audit Phase 2 — Regroupement Recos & MT par Micro-Parcours

> **Date** : 10/02/2026  
> **Source données** : Supabase (tables `recommendations_legacy`, `micro_taches`, `scoring_questions`, `question_mp_mapping`)  
> **Objectif** : Cartographier les recos et MT legacy par MP, identifier les gaps et redondances

---

## 1. Bilan Ingestion Supabase

| Table | Rows | Source |
|-------|------|--------|
| `recommendations_legacy` | 707 | `recommendations_complete.json` (721 réponses, 316 avec reco, 359 avec IDEC) |
| `micro_taches` | 299 | V1: `.md` (41 MT), V2-V5: `.json` (258 MT) |
| `scoring_questions` | 38 | `scoring.md` (V1→V5), 38 questions scorantes |
| `scoring_thresholds` | 0 | À remplir lors de la Phase 3.3 (règle scoring Dr. Monka) |

### Contrôle qualité ingestion

- **0 reco perdue** : 707/707 ✅
- **0 MT perdue** : 299/299 ✅ (V1: 41/41, V2: 82/82, V3: 33/33, V4: 137/137, V5: 6/6)
- **3 questions orphelines** (sans MP) : N31, O2, O49 → ce sont des **triggers**, pas des questions régulières → attendu ✅

---

## 2. Recos Legacy par MP

> Chaque MP reçoit des recos via le mapping question→MP.

| MP | Vulnérabilité | Réponses totales | Avec Reco App | Avec IDEC | Couverture |
|----|--------------|-----------------|---------------|-----------|------------|
| **R1** | V1 | 9 | 5 | 4 | 🟢 56% |
| **R2** | V1 | 13 | 3 | 11 | 🟠 23% reco / 85% IDEC |
| **R3** | V1 | 13 | 2 | 2 | 🔴 15% |
| **R4** | V1 | 17 | 1 | 8 | 🔴 6% reco / 47% IDEC |
| **F1** | V2 | 29 | 22 | 23 | 🟢 76% |
| **F2** | V2 | 24 | 18 | 18 | 🟢 75% |
| **F3** | V2 | 24 | 16 | 16 | 🟢 67% |
| **F4** | V2 | 39 | 23 | 23 | 🟢 59% |
| **F5** | V2 | 57 | 3 | 3 | 🔴 5% |
| **F6** | V2 | 41 | 25 | 26 | 🟢 61% |
| **S1** | V3 | 33 | 19 | 18 | 🟢 58% |
| **S2** | V3 | 12 | 8 | 8 | 🟢 67% |
| **S3** | V3 | 57 | 19 | 19 | 🟠 33% |
| **S4** | V3 | 18 | 6 | 10 | 🟠 33% reco / 56% IDEC |
| **M1** | V4 | 30 | 19 | 19 | 🟢 63% |
| **M2** | V4 | 54 | 33 | 31 | 🟢 61% |
| **M3** | V4 | 19 | 19 | 19 | 🟢 100% |
| **M4** | V4 | 31 | 31 | 31 | 🟢 100% |
| **M5** | V4 | 25 | 12 | 23 | 🟠 48% reco / 92% IDEC |
| **M6** | V4 | 31 | 31 | 31 | 🟢 100% |
| **A1** | V5 | 13 | 4 | 4 | 🟠 31% |
| **A2** | V5 | 59 | 1 | 1 | 🔴 2% |
| **A3** | V5 | 21 | 1 | 1 | 🔴 5% |
| **A4** | V5 | 37 | 3 | 5 | 🔴 8% |

### Observations clés

**MPs bien couverts (>50% avec reco) — 14/24 :**
- V2 (F1-F4, F6), V3 (S1-S2), V4 (M1-M6) sont les mieux documentés
- M3, M4, M6 ont 100% de couverture

**MPs faiblement couverts (<15% avec reco) — 5/24 :**
- **R3** (15%), **R4** (6%), **F5** (5%), **A2** (2%), **A3** (5%)
- Beaucoup ont des IDEC > reco → le legacy documentait les actions IDEC mais pas le wording utilisateur
- **V5 (Administrative)** est globalement sous-documenté → à compléter en Phase 3

**Asymétrie IDEC vs Reco App :**
- R2 : 23% reco mais 85% IDEC → les actions IDEC sont riches, le wording utilisateur manque
- R4 : 6% reco mais 47% IDEC → même pattern
- M5 : 48% reco mais 92% IDEC → même pattern

> [!IMPORTANT]
> L'asymétrie IDEC/Reco est une **opportunité Phase 3** : on a les actions IDEC comme base pour générer les recos utilisateur manquantes.

---

## 3. Micro-Tâches par Vulnérabilité

| V | STRUC | SEC | MED | INFO | ORGA | Total |
|---|-------|-----|-----|------|------|-------|
| V1 | 5 | 8 | 0 | 12 | 16 | **41** |
| V2 | 5 | 29 | 24 | 6 | 18 | **82** |
| V3 | 0 | 6 | 16 | 3 | 8 | **33** |
| V4 | 4 | 49 | 12 | 21 | 51 | **137** |
| V5 | 0 | 1 | 0 | 4 | 1 | **6** |
| **Total** | **14** | **93** | **52** | **46** | **94** | **299** |

### Observations

- **V4 domine** (137 MT = 46% du total) → parcours médical très détaillé
- **V5 sous-documenté** (6 MT seulement) → à enrichir en Phase 3
- **V1 sans MED** : normal, vulnérabilité sociale (pas d'actes médicaux)
- **V3 et V5 sans STRUC** : à vérifier si c'est cliniquement justifié

### Limitation MT V2-V5

> [!WARNING]
> Les MT V2-V5 sont typées par vulnérabilité mais **non liées à une question spécifique** (pas de `question_id`).
> Seule V1 a le mapping question→MT. Le rattachement MT→MP pour V2-V5 devra se faire en Phase 3 via le texte de la MT et le contexte du MP.

---

## 4. Scoring par Vulnérabilité

| V | Questions scorantes | Score max | Seuils |
|---|--------------------|-----------|--------|
| V1 | 8 | 15 | À définir (Phase 3.3) |
| V2 | 11 | 22 | À définir |
| V3 | 10 | 20 | À définir |
| V4 | 6 | 12 | À définir |
| V5 | 3 | 6 | À définir |
| **Total** | **38** | — | — |

> à revoir en Phase 3.3 avec la règle Dr. Monka : "état = scorante" → potentiellement 59 questions scorantes au lieu de 38

---

## 5. Synthèse & Prochaines Actions

### Ce qui est prêt ✅
- **Data quality** : 0 perte, toutes les données legacy sont en base
- **Mapping question→MP** : 24/24 MP couverts
- **14/24 MP** bien documentés en recos (>50%)

### Ce qui manque ⚠️
1. **Wording reco utilisateur** pour 10 MP avec des IDEC riches mais sans reco app → Phase 3.1
2. **Rattachement MT→MP** pour V2-V5 (pas de question_id) → Phase 3.2
3. **V5 (Administrative)** sous-documenté en recos ET en MT → enrichissement Phase 3
4. **Seuils scoring** → Phase 3.3 avec Dr. Monka

### Risques identifiés
- **Redondances** : certaines recos sont identiques pour des réponses différentes au sein du même MP → à dédoublonner en Phase 3
- **MT non rattachées** : 258 MT V2-V5 sans lien question_id → nécessite un matching intelligent (texte MT ↔ contexte MP)
