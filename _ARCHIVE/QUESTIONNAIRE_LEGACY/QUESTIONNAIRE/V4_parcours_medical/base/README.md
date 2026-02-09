# 📋 V4 - Parcours Médical du Proche

> **Statut** : ✅ 93% Complet  
> **Dernière MAJ** : 04/02/2026  
> **Sources** : Excel + Legacy + IA

---

## 📊 Statistiques

| Indicateur | Valeur | Source |
|------------|--------|--------|
| **Questions** | 36 | ✅ Excel |
| **Recommandations par question** | 139 | ✅ Excel |
| **Actions IDEC par question** | 161 | ✅ Excel |
| **Micro-parcours** | 6 (M1-M6) | ✅ Excel |
| **Triggers** | 35 | ✅ Excel |
| **CCC** | 8 | ✅ Legacy |
| **Micro-tâches CCC** | 48 | 🤖 IA (supplémentaires) |

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
| **SEC** | 49 | 35.8% | ✅ Oui |
| **MED** | 12 | 8.8% | ✅ Oui |
| **ORGA** | 51 | 37.2% | ❌ Non |
| **INFO** | 21 | 15.3% | ❌ Non |
| **STRUC** | 4 | 2.9% | ✅ Oui |

---

## 📁 Fichiers (7/7)

| Fichier | Contenu | Source |
|---------|---------|--------|
| `README.md` | Vue d'ensemble | - |
| `questions.md` | 36 questions + options | ✅ Excel |
| `asr_definitions.md` | 6 ASR + 35 triggers | ✅ Excel |
| `recommendations.md` | 139 recos + 161 actions par question | ✅ Excel |
| `ccc_recommendations.md` | 8 CCC + 48 MT supplémentaires | ✅ Legacy + 🤖 IA |
| `micro_taches_typologie.md` | 137 tâches typées | 🤖 Typage Auto |
| `audit_completude.md` | Audit 93% | - |

---

## 🎯 Micro-Parcours M1-M6

| Code | Nom | Triggers | CCC |
|------|-----|----------|-----|
| **M1** | Compréhension du diagnostic | 6 | M1_CC_01, M1_CC_02 |
| **M2** | Accès aux soins | 7 | M2_CC_01, M2_CC_02 |
| **M3** | Continuité des soins | 8 | M3_CC_02, M3_CC_03 |
| **M4** | Gestion des traitements | 5 | - |
| **M5** | Coordination | 5 | M5_CC_01 |
| **M6** | Troubles psy & addictions | 4 | M6_CC_02 |

---

## 📝 Changelog

| Date | Action |
|------|--------|
| 04/02/2026 | Clarification structure recos vs CCC |
| 03/02/2026 | Extraction 100% Excel + Legacy |
| 03/02/2026 | CCC enrichies avec MT IA (48) |
| 03/02/2026 | Micro-tâches typées (137) |
| 03/02/2026 | Audit complétude 93% |

---

> 📄 V4 - Parcours Médical du Proche  
> ✅ **Recommandations par question** = Excel (RÉEL)  
> 🤖 **Micro-tâches CCC** = IA (supplémentaires, à valider)
