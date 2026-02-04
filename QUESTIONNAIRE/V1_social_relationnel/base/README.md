# 📋 V1 - Social & Relationnel

> **Statut** : ✅ 95% Complet  
> **Dernière MAJ** : 04/02/2026  
> **Sources** : Simulateur HTML + Excel + Legacy + IA

---

## 📊 Statistiques

| Indicateur | Valeur | Source |
|------------|--------|--------|
| **Questions** | 13 | ✅ Simulateur HTML |
| **Recommandations par question** | ~20 | ✅ Simulateur HTML |
| **Actions IDEC par question** | ~30 | ✅ Simulateur HTML |
| **Micro-parcours** | 4 (R1-R4) | ✅ Excel |
| **Triggers** | 8 | ✅ Simulateur HTML |
| **CCC** | 8 | ✅ Simulateur HTML |
| **Micro-tâches CCC** | 39 | 🤖 IA (générées) |

---

## 📋 Structure des Recommandations

### 1. Recommandations par Question (Simulateur)

Chaque question génère :
- **1 Recommandation principale** → ce que l'app affiche
- **N Actions IDEC** → ce que doit faire l'IDEC

📄 Fichier : `recommendations.md`

### 2. Micro-tâches CCC (IA - Supplémentaires)

Quand une **CCC est activée** (combinaison critique), elle déclenche des **micro-tâches supplémentaires** :
- Raisonnement clinique
- Acteurs impliqués
- ~5 micro-tâches par CCC

📄 Fichier : `ccc_recommendations.md`

---

## 🏷️ Répartition Micro-Tâches (Typage Auto)

| Type | Nb | % | Contributives ASR |
|------|----|---|-------------------|
| **STRUC** | 8 | 20.5% | ✅ Oui |
| **SEC** | 12 | 30.8% | ✅ Oui |
| **MED** | 5 | 12.8% | ✅ Oui |
| **INFO** | 6 | 15.4% | ❌ Non |
| **ORGA** | 8 | 20.5% | ❌ Non |

---

## 📁 Fichiers (8/8)

| Fichier | Contenu | Source |
|---------|---------|--------|
| `README.md` | Vue d'ensemble | - |
| `questions.md` | 13 questions + options | ✅ Simulateur |
| `asr_definitions.md` | 4 ASR (R1-R4) + signatures | ✅ Excel + ⚠️ IA |
| `recommendations.md` | ~20 recos + ~30 actions par question | ✅ Simulateur |
| `ccc_recommendations.md` | 8 CCC + 39 MT | ✅ Simulateur + 🤖 IA |
| `micro_taches_typologie.md` | 39 tâches typées | 🤖 Typage Auto |
| `audit_completude.md` | Audit 95% | - |
| `social_vulnerability_test.md` | Document de test complet | ✅ Référence |

---

## 🎯 Micro-Parcours R1-R4

| Code | Nom | Triggers | CCC |
|------|-----|----------|-----|
| **R1** | Impact vie personnelle | 2 | R1_CC_01, R1_CC_02 |
| **R2** | Soutien entourage | 2 | R2_CC_01, R2_CC_02 |
| **R3** | Isolement proche | 2 | R3_CC_01 |
| **R4** | Relation & dynamique | 3 | R4_CC_01, R4_CC_02, R4_CC_03 |

---

## 🎯 Rôle de V1

V1 "Social & Relationnel" est la **vulnérabilité de référence** :
- Simulateur HTML complet et fonctionnel
- CCC entièrement documentées dans le code
- Sert de modèle pour V2-V5
- Document `social_vulnerability_test.md` = référence structure

---

## 📝 Changelog

| Date | Action |
|------|--------|
| 04/02/2026 | Harmonisation avec standard V2-V5 |
| 04/02/2026 | Création questions.md, recommendations.md, audit_completude.md |
| 03/02/2026 | Extraction depuis simulateur HTML |
| 03/02/2026 | Réorganisation dans /QUESTIONNAIRE/V1_social_relationnel/ |

---

> 📄 V1 - Social & Relationnel  
> ✅ **Vulnérabilité de référence** (simulateur complet)  
> ✅ **95% conforme au standard V2-V5**
