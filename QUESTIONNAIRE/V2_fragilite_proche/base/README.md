# 📋 V2 - Fragilité du Proche

> **Statut** : ✅ 92% Complet  
> **Dernière MAJ** : 04/02/2026  
> **Sources** : Excel + Legacy + IA

---

## 📊 Statistiques

| Indicateur | Valeur | Source |
|------------|--------|--------|
| **Questions** | 57 | ✅ Excel |
| **Recommandations par question** | 110 | ✅ Excel |
| **Actions IDEC par question** | 116 | ✅ Excel |
| **Micro-parcours** | 6 (F1-F6) | ✅ Excel |
| **Triggers** | 38 | ✅ Excel |
| **CCC** | 5 | ✅ Legacy |
| **Micro-tâches CCC** | 30 | 🤖 IA (supplémentaires) |

---

## 📋 Structure des Recommandations

### 1. Recommandations par Question (Excel)

Chaque question génère :
- **1 Recommandation principale** → ce que l'app affiche
- **N Actions IDEC** → ce que doit faire l'IDEC

📄 Fichier : `recommendations.md`

### 2. Micro-tâches CCC (IA - Supplémentaires)

Quand une **CCC est activée** (combinaison critique), elle déclenche des **micro-tâches supplémentaires** :
- Raisonnement clinique
- Acteurs impliqués
- 6 micro-tâches par CCC

📄 Fichier : `ccc_recommendations.md`

> ⚠️ Les micro-tâches CCC sont **générées par IA** car pas encore définies par Monka

---

## 🏷️ Répartition Micro-Tâches (Typage Auto)

| Type | Nb | % | Contributives ASR |
|------|----|---|-------------------|
| **SEC** | 29 | 35.4% | ✅ Oui |
| **MED** | 24 | 29.3% | ✅ Oui |
| **ORGA** | 18 | 22.0% | ❌ Non |
| **INFO** | 6 | 7.3% | ❌ Non |
| **STRUC** | 5 | 6.1% | ✅ Oui |

---

## 📁 Fichiers (7/7)

| Fichier | Contenu | Source |
|---------|---------|--------|
| `README.md` | Vue d'ensemble | - |
| `questions.md` | 57 questions + options | ✅ Excel |
| `asr_definitions.md` | 6 ASR + 38 triggers | ✅ Excel |
| `recommendations.md` | 110 recos + 116 actions par question | ✅ Excel |
| `ccc_recommendations.md` | 5 CCC + 30 MT supplémentaires | ✅ Legacy + 🤖 IA |
| `micro_taches_typologie.md` | 82 tâches typées | 🤖 Typage Auto |
| `audit_completude.md` | Audit 92% | - |

---

## 🎯 Micro-Parcours F1-F6

| Code | Nom | Triggers | CCC |
|------|-----|----------|-----|
| **F1** | Hébergement et protection | 7 | CCC_F1_01 |
| **F2** | Autonomie quotidien | 6 | CCC_F2_01 |
| **F3** | Mémoire et comportement | 7 | CCC_F3_01 |
| **F4** | Douleur, fatigue, sommeil | 8 | CCC_F4_01 |
| **F5** | Dépendance, épisodes aigus | 5 | CCC_F5_01 |
| **F6** | Aide humaine professionnelle | 5 | - |

---

## 📝 Changelog

| Date | Action |
|------|--------|
| 04/02/2026 | Clarification structure recos vs CCC |
| 03/02/2026 | Extraction 100% Excel + Legacy |
| 03/02/2026 | CCC enrichies avec MT IA (30) |
| 03/02/2026 | Micro-tâches typées (82) |
| 03/02/2026 | Audit complétude 92% |

---

> 📄 V2 - Fragilité du Proche  
> ✅ **Recommandations par question** = Excel (RÉEL)  
> 🤖 **Micro-tâches CCC** = IA (supplémentaires, à valider)
