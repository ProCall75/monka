# donnees.md — Architecture Données

> **Périmètre** : Schéma DB complet (18 tables), relations, contraintes, pipeline de données, content_blocks
> **Ne contient PAS** : logique métier (→ clinique.md), code (→ technique.md)
> **MAJ** : 3 mars 2026

---

## Vue d'ensemble

| Métrique | Valeur |
|---|---|
| **Tables** | 18 |
| **Provider** | Supabase (PostgreSQL) |
| **RLS** | Actif sur toutes les tables |
| **Environnement** | Production |

## Schéma relationnel

```
questions ────┬──▶ scoring_questions ──▶ vulnerabilities ◀── seuils
              │
              └──▶ activation_rules ──▶ categories ──▶ micro_parcours
                                            │
                                            ├──▶ recommendations ──▶ micro_taches
                                            └──▶ acteurs (overlay O1)

personas ──▶ persona_answers ──▶ questions
content_blocks (standalone)
```

## Tables par domaine

| Domaine | Tables | Rôle |
|---|---|---|
| **Questionnaire** | `questions`, `question_options` | 165 questions + options |
| **Scoring** | `scoring_questions`, `vulnerabilities`, `seuils` | Pipeline V1-V5 |
| **Activation** | `activation_rules`, `categories`, `micro_parcours` | Activation 24 MPs |
| **Actions** | `recommendations`, `micro_taches`, `acteurs` | 198 recos, 369 MTs |
| **Test** | `personas`, `persona_answers` | Cas de test clinique |
| **Contenu** | `content_blocks` | Blocs dynamiques app |
| **Métadonnées** | `wording_versions` | Versionning wording |

## Comptages de référence

| Élément | Comptage attendu |
|---|---|
| Questions | 165 |
| Vulnérabilités | 5 |
| Micro-Parcours | 24 |
| Catégories | 73 |
| Règles d'activation | 235 |
| Recommandations | 198 |
| Micro-Tâches | 369 |
| Questions scorantes | 321 |

> **Vérification** : ces comptages sont contrôlés à chaque sprint (→ `moteur/_standards/checklist-qualite.md`, contrôle Q3)

## Content Blocks

Les `content_blocks` sont des blocs de contenu dynamique utilisés par le frontend. Ils permettent de modifier le contenu de l'app sans toucher au code.

| Champ | Usage |
|---|---|
| `slug` | Identifiant unique du bloc |
| `title` | Titre affiché |
| `content` | Contenu Markdown/HTML |
| `category` | Catégorie de regroupement |

---

> **Audit DB complet** : → `_archive/finish/audit_db.md`
