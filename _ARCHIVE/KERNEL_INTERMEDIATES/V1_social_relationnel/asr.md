# 🎯 ASR V1 — Actions Structurantes de Référence

> **Source** : `SOURCES/extracted/microparcours_complete.json` + `Legacy ASR Referent op. 030226.docx`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "microparcours_aidant.xlsx + Legacy ASR"
extraction_date: "2026-02-06"
total_mp: 4
total_asr: 4
```

---

## 📋 Micro-Parcours V1

### R1 — Impact sur la vie personnelle et professionnelle

**Objectif** : Mesurer l'impact de l'aidance sur votre vie (temps, travail, couple, finances) et ajuster.

**Ce que vous allez comprendre** : Les leviers de conciliation (organisation, droits, soutien, communication).

**Questions associées** : N7, O27, O28

**Déclencheurs** :
- N7 = « Aménagement horaires » ou « Congés »
- CCC R1_CC_01 : O27 = "Oui" ET O28 = "Oui"
- CCC R1_CC_02 : N7 = aménagement ET O27 = "Oui"

---

### R2 — Soutien de l'entourage et partage de l'aide

**Objectif** : Renforcer le soutien autour de vous et améliorer la répartition de l'aide.

**Ce que vous allez comprendre** : Comment mobiliser l'entourage sans conflit et comment demander un relais.

**Questions associées** : N4, E1, E2

**Déclencheurs** :
- N4 = « Oui » (aidant seul)
- CCC R2_CC_01 : N4 = "Oui" ET E2 = "Très peu / personne"
- CCC R2_CC_02 : E1 = "Je fais presque tout" ET E2 = "Très peu / personne"

---

### R3 — Isolement social de la personne aidée

**Objectif** : Limiter l'isolement du proche et maintenir un lien social adapté.

**Ce que vous allez comprendre** : Pourquoi le lien social est un facteur de santé et quelles solutions sont possibles.

**Questions associées** : N20, O48

**Déclencheurs** :
- O48 = « 1 fois par mois ou moins »
- CCC R3_CC_01 : N20 = "Oui" ET O48 ≤ 1 fois / mois

---

### R4 — Relation aidant / proche et acceptation de l'aide

**Objectif** : Améliorer la relation et faciliter l'acceptation de l'aide (professionnelle ou familiale).

**Ce que vous allez comprendre** : Les mécanismes fréquents de refus et des stratégies de communication.

**Questions associées** : E6, O30, E4, E5, O31

**Déclencheurs** :
- E6 = « Refuse la plupart du temps » (critique directe)
- CCC R4_CC_01 : O30 = "Oui" ET E4 = "Plus tendue"
- CCC R4_CC_02 : E5 = "Oui" ET E1 = "Je fais presque tout"
- CCC R4_CC_03 : E6 = "Refuse" ET O31 = "Oui"

---

## 📌 Signatures d'État (Legacy ASR)

> Source : `Legacy ASR Referent op. 030226.docx`

| MP | Signature A | Signature B |
|----|-------------|-------------|
| R1 | R1-A : Impact maîtrisé | R1-B : Impact en dégradation |
| R2 | R2-A : Soutien présent | R2-B : Isolement aidant |
| R3 | R3-A : Lien social maintenu | R3-B : Proche isolé |
| R4 | R4-A : Relation préservée | R4-B : Tension/refus d'aide |

---

## ⚠️ Règle ASR

> **1 Micro-Parcours = 1 ASR = 1 Objectif Utilisateur**

L'ASR est l'objectif que l'aidant doit atteindre. Les micro-tâches sont les moyens pour y arriver.
