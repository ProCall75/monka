# 🎯 ASR V2 — Actions Structurantes de Référence Fragilité du Proche

> **Source** : `SOURCES/extracted/microparcours_complete.json` + `Legacy ASR Referent op. 030226.docx`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "microparcours_complete.json"
extraction_date: "2026-02-06"
total_asr: 6
micro_parcours: ["F1", "F2", "F3", "F4", "F5", "F6"]
```

---

## 📋 Vue d'ensemble ASR V2

| MP | Nom | Objectif |
|----|-----|----------|
| **F1** | Vie quotidienne, budget et entourage | Comprendre le quotidien du proche |
| **F2** | Autonomie, aide humaine et présence | Évaluer le niveau d'aide nécessaire |
| **F3** | Mémoire, comportement et risques | Repérer les troubles cognitifs/comportementaux |
| **F4** | Douleur, fatigue, sommeil, état général | Comprendre l'état général du proche |
| **F5** | Dépendance, handicap, addictions, épisodes aigus | Qualifier la situation et orienter |
| **F6** | Autonomie fonctionnelle, chutes, aides techniques | Réduire le risque de chutes |

---

## 🎯 Détail des ASR

### F1 — Vie quotidienne, budget et entourage du proche

**Objectif** : Comprendre le quotidien du proche (lieu de vie, entourage, budget) pour adapter l'organisation et les priorités.

**Ce que vous allez comprendre** : Quels éléments du quotidien influencent le risque de rupture (isolement, manque d'aide, difficultés financières).

**CCC associé** : CCC_F1_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Situation non explorée |
| ⏳ | Évaluation en cours |
| ✔️ | Plan d'action défini et en place |

---

### F2 — Autonomie, aide humaine et présence nécessaire

**Objectif** : Évaluer le niveau d'aide nécessaire (présence, aide humaine, surveillance) et ajuster l'organisation.

**Ce que vous allez comprendre** : Quels signaux indiquent un besoin d'aide accrue et comment dimensionner l'aide humaine.

**CCC associé** : CCC_F2_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Besoin d'aide non évalué |
| ⏳ | Évaluation en cours, dimensionnement aide |
| ✔️ | Aide humaine mise en place et validée |

---

### F3 — Mémoire, comportement et risques pour soi ou les autres

**Objectif** : Repérer les troubles cognitifs/comportementaux et réduire les risques (errance, désinhibition, agressivité).

**Ce que vous allez comprendre** : Quels comportements doivent alerter et comment sécuriser l'environnement et la relation.

**CCC associé** : CCC_F3_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Risques non identifiés |
| ⏳ | Évaluation cognitive demandée |
| ✔️ | Environnement sécurisé, suivi en place |

---

### F4 — Douleur, fatigue, sommeil et état général du proche

**Objectif** : Comprendre l'état général du proche (douleur, fatigue, sommeil) pour ajuster les soins et le quotidien.

**Ce que vous allez comprendre** : Comment ces symptômes impactent l'autonomie et quand consulter.

**CCC associé** : CCC_F4_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Symptômes non évalués |
| ⏳ | Bilan en cours (douleur, sommeil, nutrition) |
| ✔️ | Prise en charge adaptée en place |

---

### F5 — Dépendance, handicap, addictions et épisodes aigus

**Objectif** : Qualifier la situation (dépendance/handicap/addictions/épisodes aigus) pour orienter vers les bons dispositifs.

**Ce que vous allez comprendre** : Quels parcours existent selon la problématique et quels signaux nécessitent un appui renforcé.

**CCC associé** : CCC_F5_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Situation non qualifiée |
| ⏳ | Orientation dispositifs en cours |
| ✔️ | Parcours clair, dispositifs activés |

---

### F6 — Autonomie fonctionnelle, chutes et aides techniques

**Objectif** : Réduire le risque de chutes et améliorer l'autonomie via des aides techniques et des aménagements.

**Ce que vous allez comprendre** : Quels facteurs augmentent le risque de chute et comment choisir une aide technique utile.

**CCC associé** : —

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Risque chute non évalué |
| ⏳ | Évaluation ergo en cours |
| ✔️ | Aides techniques installées, aménagements faits |

---

## ⚠️ Règles Legacy

1. **1 MP = 1 ASR** : Chaque micro-parcours a un objectif utilisateur unique
2. **Signatures d'état** : ❌ (non fait) → ⏳ (en cours) → ✔️ (fait)
3. **CCC** : Déclenche le MP par combinaison (sauf F6)
