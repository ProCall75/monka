# 📋 Plan Content Blocks — Certification Monka

> **Date** : 22/02/2026
> **Objectif** : chaque entité de la DB Monka est documentée par son sens clinique

---

## Matrice entité × champ explicatif

### ✅ Déjà en place

| Entité | Champ | Couverture | Source |
|---|---|---|---|
| 240 activation_rules | `sens_clinique` | 100% | colonne directe |
| 24 micro_parcours | sens + justif questions/catégories/acteurs | 100% | content_blocks |
| 69/73 categories | `sens_clinique` | 95% | content_blocks |
| 150 questions | `scoring_justification` | 100% | content_blocks |
| 24 micro_parcours | `asr_wording` + `asr_criteres_validation` | 100% | colonnes directes |

### 🔧 P0 — À remplir maintenant

| Entité | Champ | Question à laquelle ça répond | Volume | Stockage |
|---|---|---|---|---|
| 5 vulnérabilités | `sens_clinique` | Pourquoi ces 5V et cette découpe ? | 5 | content_block |
| 150 questions | `sens_clinique` | Pourquoi cette question, que capte-t-elle ? | 150 | colonne `questions.sens_clinique` |
| 390 MTs | `sens_clinique` | Pourquoi cette action et pas une autre ? | 390 | colonne `micro_taches.sens_clinique` |
| 390 MTs | `justification_type` | Pourquoi STRUC vs SEC vs MED vs INFO vs ORGA ? | 390 | colonne `micro_taches.justification_type` |
| 390 MTs | `contribution_asr` | Comment cette MT contribue à l'objectif du MP ? | 390 | colonne `micro_taches.contribution_asr` |

### 🟠 P1 — Compléments certification

| Entité | Champ | Question | Volume | Stockage |
|---|---|---|---|---|
| 4 categories | `sens_clinique` | (manquantes) | 4 | content_block |
| 240 rules | `justification_delai` | Pourquoi 7j/14j/30j ? | 240 | colonne sur activation_rules |
| ~30 rules CCC | `justification_ccc` | Pourquoi cette combinaison déclenche CCC ? | 30 | colonne sur activation_rules |
| 24 MPs | `liens_inter_mp` | Synergies et recouvrements entre MPs | 24 | content_block |
| 20 questions | `justification_aidance` | Pourquoi spécifique à cet overlay ? | 20 | colonne sur questions |

---

## Plan d'exécution (batchs)

| Batch | Scope | Contenu | Est. |
|---|---|---|---|
| **B0** | Vulnérabilités | 5 sens_clinique V1-V5 | 5 |
| **B1** | V1 (R1-R4) | Questions + MTs (sens + type + ASR) | ~80 |
| **B2** | V2 (A1-A4) | Questions + MTs | ~70 |
| **B3** | V3 (S1-S4) | Questions + MTs | ~60 |
| **B4** | V4 (F1-F6) | Questions + MTs | ~200 |
| **B5** | V5 (M1-M6) | Questions + MTs | ~250 |
| **B6** | P1 complet | Délais + CCC + inter-MP + overlay | ~320 |

---

## Sources utilisées (pas d'invention)

- `KERNEL/VALIDATION_MP/V*/[MP].md` — fiches de validation par MP
- `KERNEL/VALIDATION_MP/Completude/[MP]_*.md` — audits de complétude
- `KERNEL/ACTEURS/ECOSYSTEME_ACTEURS_V*.md` — écosystèmes d'acteurs
- `KERNEL/KERNEL_V6.md` — règles Kernel
- `KERNEL/SCORING/SCORING_V*.md` — pondérations
- DB `activation_rules.condition_logic` — conditions existantes

> Toute explication est déduite des données existantes. Rien n'est inventé.
