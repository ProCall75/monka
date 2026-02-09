# 📋 V5 - Administrative

> **Statut** : ✅ 90% Complet  
> **Dernière MAJ** : 04/02/2026  
> **Sources** : Excel + Legacy + IA

---

## 📊 Statistiques

| Indicateur | Valeur | Source |
|------------|--------|--------|
| **Questions** | 18 | ✅ Excel |
| **Recommandations par question** | 4 | ✅ Excel |
| **Actions IDEC par question** | 39 | ✅ Excel |
| **Micro-parcours** | 4 (A1-A4) | ✅ Excel |
| **Triggers** | 24 | ✅ Excel |
| **CCC** | 3 | ✅ Legacy |
| **Micro-tâches CCC** | 18 | 🤖 IA (supplémentaires) |

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

## ⚠️ Particularité V5 : Orientation / Information

V5 Administrative est **orientée information/orientation** :
- L'IDEC **informe** et **oriente**
- C'est **l'aidant** qui réalise les démarches
- Peu de micro-tâches directes (6 seulement)
- 80% des actions sont "N/A" dans l'Excel source

---

## 🏷️ Répartition Micro-Tâches (Typage Auto)

| Type | Nb | % | Contributives ASR |
|------|----|---|-------------------|
| **SEC** | 1 | 16.7% | ✅ Oui |
| **MED** | 0 | 0% | ✅ Oui |
| **ORGA** | 1 | 16.7% | ❌ Non |
| **INFO** | 4 | 66.6% | ❌ Non |
| **STRUC** | 0 | 0% | ✅ Oui |

---

## 📁 Fichiers (7/7)

| Fichier | Contenu | Source |
|---------|---------|--------|
| `README.md` | Vue d'ensemble | - |
| `questions.md` | 18 questions + options | ✅ Excel |
| `asr_definitions.md` | 4 ASR + 24 triggers | ✅ Excel |
| `recommendations.md` | 4 recos + 39 actions par question | ✅ Excel |
| `ccc_recommendations.md` | 3 CCC + 18 MT supplémentaires | ✅ Legacy + 🤖 IA |
| `micro_taches_typologie.md` | 6 tâches typées | 🤖 Typage Auto |
| `audit_completude.md` | Audit 90% | - |

---

## 🎯 Micro-Parcours A1-A4

| Code | Nom | Triggers | CCC |
|------|-----|----------|-----|
| **A1** | Couverture et droits | 8 | A1_CC_01 |
| **A2** | Aides financières | 6 | A2_CC_01 |
| **A3** | Charge administrative | 5 | A3_CC_01 |
| **A4** | Anticipation et protection | 5 | - |

---

## 📝 Changelog

| Date | Action |
|------|--------|
| 04/02/2026 | Clarification structure recos vs CCC |
| 03/02/2026 | Extraction 100% Excel + Legacy |
| 03/02/2026 | CCC enrichies avec MT IA (18) |
| 03/02/2026 | Micro-tâches typées (6) |
| 03/02/2026 | Audit complétude 90% |

---

> 📄 V5 - Administrative  
> ✅ **Recommandations par question** = Excel (RÉEL)  
> 🤖 **Micro-tâches CCC** = IA (supplémentaires, à valider)  
> ℹ️ **Peu de MT** car orienté information/orientation
