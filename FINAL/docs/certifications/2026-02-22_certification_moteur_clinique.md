# 📋 RAPPORT DE CERTIFICATION — Moteur Clinique Monka

> **Date** : 22 février 2026  
> **Version** : v2026.2  
> **Projet** : `mbxeqrvofrmhqlwlefff`  
> **Auteur** : Audit automatisé + revue Antonin Rimaud

---

## 1. Snapshot DB — Volumétrie

| Table | Entrées | Rôle |
|---|---|---|
| `vulnerabilities` | **5** | V1-V5 : racines cliniques |
| `micro_parcours` | **24** | MPs : 4+4+4+6+6 |
| `categories` | **73** | Catégories de recommandation |
| `recommendations` | **202** | Wordings par niveau |
| `activation_rules` | **240** | Conditions de déclenchement |
| `micro_taches` | **390** | Actions concrètes |
| `questions` | **165** | 150 cliniques + 15 trigger |
| `content_blocks` | **355** | Justifications cliniques |
| `question_mp_mapping` | **155** | Liens question→MP avec justif |
| `guides` | **42** | Guides d'accompagnement |
| `guide_mt_mapping` | **32** | Liens guide→MT |

---

## 2. Vérification Kernel — 9/9 PASS ✅

| Règle | Attendu | Réel | Statut |
|---|---|---|---|
| K1 — 5 vulnérabilités | 5 | 5 | ✅ PASS |
| K2 — 24 micro-parcours | 24 | 24 | ✅ PASS |
| K3 — 3+ niveaux de reco (STD, CCC, CRIT) | ≥3 | 3 | ✅ PASS |
| K4 — 4 paliers de délai (3j, 7j, 30j, 90j) | 4 | 4 | ✅ PASS |
| K5 — 150 questions cliniques | 150 | 150 | ✅ PASS |
| K6 — 15 questions trigger | 15 | 15 | ✅ PASS |
| K7 — Chaque catégorie a ≥1 MT | 0 orpheline | 0 | ✅ PASS |
| K8 — Chaque catégorie a ≥1 rule | 0 orpheline | 0 | ✅ PASS |
| K9 — 24 ASR wordings | 24 | 24 | ✅ PASS |

---

## 3. Intégrité structurelle — 0 orphelin ✅

| Vérification | Résultat |
|---|---|
| Catégories sans MP valide | **0** |
| MTs sans catégorie valide | **0** |
| Rules sans catégorie valide | **0** |
| MPs sans vulnérabilité | **0** |
| Content blocks MP orphelins | **0** |
| Content blocks catégorie orphelins | **0** |

---

## 4. Couverture documentaire — 100% ✅

| Champ | Total | Rempli | % |
|---|---|---|---|
| `questions.sens_clinique` | 150 | 150 | **100%** |
| `micro_taches.sens_clinique` | 390 | 390 | **100%** |
| `micro_taches.justification_type` | 390 | 390 | **100%** |
| `micro_taches.contribution_asr` | 390 | 390 | **100%** |
| `activation_rules.sens_clinique` | 240 | 240 | **100%** |
| `activation_rules.justification_delai` | 240 | 240 | **100%** |
| `activation_rules.justification_ccc` (CCC) | 85 | 85 | **100%** |
| `micro_parcours.asr_wording` | 24 | 24 | **100%** |
| `micro_parcours.objectif` | 24 | 24 | **100%** |
| `question_mp_mapping.justification` | 155 | 155 | **100%** |

---

## 5. Content Blocks — 355 blocs

| entity_type | block_type | Nb |
|---|---|---|
| `vulnerability` | `sens_clinique` | 5 |
| `micro_parcours` | `sens_clinique` | 24 |
| `micro_parcours` | `justification_questions` | 24 |
| `micro_parcours` | `justification_categories` | 24 |
| `micro_parcours` | `justification_acteurs` | 24 |
| `micro_parcours` | `liens_inter_mp` | 24 |
| `micro_parcours` | `matrice_patho_specialiste` | 1 |
| `category` | `sens_clinique` | 73 |
| `question` | `scoring_justification` | 150 |
| `question` | `scoring_ponderation` | 6 |
| **Total** | | **355** |

---

## 6. Architecture de traçabilité

Chaque entité répond à **"pourquoi ?"** :

```
Question → sens_clinique + scoring_justification
    ↓ question_mp_mapping (justification)
MP → sens_clinique + justification_questions/categories/acteurs + ASR
    ↓
Catégorie → sens_clinique
    ↓
Rule → sens_clinique + justification_delai + justification_ccc
    ↓
MT → sens_clinique + justification_type + contribution_asr
    ↓
Guide → guide_mt_mapping
```

---

## 7. Principes de stockage

| Type de contenu | Stockage | Requête type |
|---|---|---|
| Champ court (1 phrase) | Colonne directe | `SELECT sens_clinique FROM questions WHERE id = 'E1'` |
| Contenu riche (multi-paragraphe) | `content_blocks` | `SELECT content FROM content_blocks WHERE entity_id = 'R1'` |
| Mapping N:M | Table dédiée | `SELECT * FROM question_mp_mapping WHERE mp_id = 'R2'` |

> **Zéro hardcode** : toute modification = UPDATE en DB, pas de commit dans le code.

---

## 8. Verdict

| Critère | Résultat |
|---|---|
| Kernel ↔ DB | ✅ 9/9 PASS |
| Intégrité FK | ✅ 0 orphelin |
| Couverture doc | ✅ 100% sur 10 champs |
| Content blocks | ✅ 355 blocs |
| Traçabilité question→MP | ✅ 155 liens justifiés |
| Zéro hardcode | ✅ Tout en DB |

> **Le moteur clinique Monka est certifiable.** Chaque décision clinique est documentée, traçable et modifiable en DB sans toucher au code.
