# 📋 V3 - Santé de l'Aidant

> **Statut** : ✅ 92% Complet  
> **Dernière MAJ** : 04/02/2026  
> **Sources** : Excel + Legacy + IA

---

## 📊 Statistiques

| Indicateur | Valeur | Source |
|------------|--------|--------|
| **Questions** | 27 | ✅ Excel |
| **Recommandations par question** | 52 | ✅ Excel |
| **Actions IDEC par question** | 92 | ✅ Excel |
| **Micro-parcours** | 4 (S1-S4) | ✅ Excel |
| **Triggers** | 30 | ✅ Excel |
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

## 🏷️ Répartition Micro-Tâches (Typage Auto)

| Type | Nb | % | Contributives ASR |
|------|----|---|-------------------|
| **SEC** | 6 | 18.2% | ✅ Oui |
| **MED** | 16 | 48.5% | ✅ Oui |
| **ORGA** | 8 | 24.2% | ❌ Non |
| **INFO** | 3 | 9.1% | ❌ Non |
| **STRUC** | 0 | 0% | ✅ Oui |

---

## 📁 Fichiers (7/7)

| Fichier | Contenu | Source |
|---------|---------|--------|
| `README.md` | Vue d'ensemble | - |
| `questions.md` | 27 questions + options | ✅ Excel |
| `asr_definitions.md` | 4 ASR + 30 triggers | ✅ Excel |
| `recommendations.md` | 52 recos + 92 actions par question | ✅ Excel |
| `ccc_recommendations.md` | 3 CCC + 18 MT supplémentaires | ✅ Legacy + 🤖 IA |
| `micro_taches_typologie.md` | 33 tâches typées | 🤖 Typage Auto |
| `audit_completude.md` | Audit 92% | - |

---

## 🎯 Micro-Parcours S1-S4

| Code | Nom | Triggers | CCC |
|------|-----|----------|-----|
| **S1** | Charge et épuisement | 10 | S1_CC_01 |
| **S2** | Sécurité (risques graves) | 8 | S2_CC_01 |
| **S3** | Santé physique aidant | 7 | S3_CC_01 |
| **S4** | Santé mentale aidant | 5 | - |

---

## 📝 Changelog

| Date | Action |
|------|--------|
| 04/02/2026 | Clarification structure recos vs CCC |
| 03/02/2026 | Extraction 100% Excel + Legacy |
| 03/02/2026 | CCC enrichies avec MT IA (18) |
| 03/02/2026 | Micro-tâches typées (33) |
| 03/02/2026 | Audit complétude 92% |

---

> 📄 V3 - Santé de l'Aidant  
> ✅ **Recommandations par question** = Excel (RÉEL)  
> 🤖 **Micro-tâches CCC** = IA (supplémentaires, à valider)
