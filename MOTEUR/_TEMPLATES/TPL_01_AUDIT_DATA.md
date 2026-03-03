# 📊 TPL_01 — Audit Data

> **Usage** : Sprint 0, puis à chaque modification de données en base
> **Objectif** : Vérifier qu'aucune donnée n'est corrompue, orpheline, ou incohérente
> **Rempli par** : Antonin (audit technique) + Dr. Monka (arbitrage anomalies cliniques)

---

## En-tête

> **Sprint** : [N] — [Nom du sprint]
> **Date** : ../../2026
> **Auteur** : Antonin
> **Scope** : [Quelles tables sont auditées]
> **Statut** : 🔲 En cours

---

## 1. Comptages de référence

> Comparer les chiffres du REFERENTIEL (KERNEL_V6) avec la base de données réelle.

| Élément | Valeur REFERENTIEL | Valeur DB réelle | Match ? | Commentaire |
|---|---|---|---|---|
| Vulnérabilités | 5 | | ✅/❌ | |
| Micro-Parcours | 24 | | ✅/❌ | |
| Questions | [N] | | ✅/❌ | |
| Catégories | 73 | | ✅/❌ | |
| Règles d'activation | 235 | | ✅/❌ | |
| Recommandations | 198 | | ✅/❌ | |
| Micro-Tâches | 369 | | ✅/❌ | |
| Questions scorantes | 321 | | ✅/❌ | |
| Seuils de scoring | 20 | | ✅/❌ | |

---

## 2. Intégrité référentielle (orphelins)

> Chaque élément enfant doit avoir un parent valide. 0 orphelin = objectif.

| Relation | Requête | Orphelins trouvés | Détail |
|---|---|---|---|
| MT → Reco | Chaque `micro_tache` a un `recommendation_id` valide | | |
| Reco → Catégorie | Chaque `recommendation` a un `category_id` valide | | |
| Catégorie → MP | Chaque `category` a un `micro_parcours_id` valide | | |
| Catégorie → V | Chaque `category` a un `vulnerability_id` valide | | |
| Règle → Catégorie | Chaque `activation_rule` a un `category_id` valide | | |
| Score Q → Question | Chaque `scoring_question` a un `question_id` valide | | |
| Score Q → V | Chaque `scoring_question` a un `vulnerability_id` valide | | |
| Persona Answer → Persona | Chaque `persona_answer` a un `persona_id` valide | | |
| Persona Answer → Question | Chaque `persona_answer` a un `question_id` valide | | |

**Résultat** : ___ orphelins trouvés

---

## 3. Doublons

| Table | Champ vérifié | Doublons trouvés | Action |
|---|---|---|---|
| `questions` | `id` | | |
| `activation_rules` | combinaison `category_id` + `condition_logic` | | |
| `scoring_questions` | combinaison `question_id` + `response_text` + `vulnerability_id` | | |
| `micro_taches` | `id` | | |
| `recommendations` | `id` | | |

**Résultat** : ___ doublons trouvés

---

## 4. Complétude des champs obligatoires

| Table | Champ | Nulls interdits | Nulls trouvés | |
|---|---|---|---|---|
| `questions` | `question_text` | ✅ | | |
| `questions` | `response_type` | ✅ | | |
| `activation_rules` | `condition_logic` | ✅ | | |
| `activation_rules` | `niveau` | ✅ | | |
| `scoring_questions` | `score` | ✅ | | |
| `micro_taches` | `description` | ✅ | | |
| `recommendations` | `title` | ✅ | | |
| `micro_parcours` | `nom` | ✅ | | |

**Résultat** : ___ nulls trouvés sur champs obligatoires

---

## 5. Pipeline de traçabilité

> Vérifier que la chaîne complète fonctionne de bout en bout.

```
Question ──→ Score (via scoring_questions)
         └──→ Règle d'activation (via condition_logic)
                  └──→ Catégorie
                           └──→ Recommandation
                                    └──→ Micro-Tâche
                                             └──→ Acteur
```

| Maillon | Test | Résultat |
|---|---|---|
| Question → Score | Les 321 Q scorantes pointent vers des V valides | ✅/❌ |
| Question → Règle | Les questions référencées dans `condition_logic` existent | ✅/❌ |
| Règle → Catégorie | Les règles pointent vers des catégories existantes | ✅/❌ |
| Catégorie → MP | Les catégories pointent vers des MPs existants | ✅/❌ |
| Catégorie → Reco | Chaque catégorie a ≥1 reco | ✅/❌ |
| Reco → MT | Chaque reco a ≥1 MT | ✅/❌ |

---

## 6. Anomalies détectées

| # | Anomalie | Gravité | Décision | D-XXX | Corrigé ? |
|---|---|---|---|---|---|
| A-01 | | 🔴/🟠/🟡 | Corrigé / Accepté / Reporté | | ✅/🔲 |
| A-02 | | | | | |

---

## 7. Résultat avant / après

| Métrique | Avant audit | Après corrections |
|---|---|---|
| Orphelins | | 0 |
| Doublons | | 0 |
| Nulls interdits | | 0 |
| Comptages matchent REFERENTIEL | | ✅ |

---

## Validation

| Validateur | Rôle | Statut | Date | Commentaire |
|---|---|---|---|---|
| Antonin | Technique — l'audit est correct, les corrections appliquées | 🔲 | | |
| Dr. Monka | Clinique — les anomalies cliniques sont de vraies erreurs ou des choix ? | 🔲 | | |

---

> 🔒 Cet audit est verrouillé une fois les deux validations obtenues.
