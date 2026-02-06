# 🔗 CCC V1 — Conditions Critiques Composites

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 3)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "Typologie,CCC et scoring.docx"
extraction_date: "2026-02-06"
total_ccc: 8
```

---

## 📋 CCC par Micro-Parcours

### R1 — Impact sur la vie personnelle / sociale / pro

#### R1_CC_01

**Questions** : O27 + O28

**Logique** : O27 = "Oui" **ET** O28 = "Oui"

**Sens clinique** : Retentissement massif du rôle d'aidant sur la vie privée et sociale → risque de déséquilibre global

---

#### R1_CC_02

**Questions** : N7 + O27

**Logique** : N7 = aménagement horaires ou congés **ET** O27 = "Oui"

**Sens clinique** : Ajustement professionnel déjà engagé avec impact familial → fragilisation structurelle

---

### R2 — Soutien de l'entourage

#### R2_CC_01

**Questions** : N4 + E2

**Logique** : N4 = "Oui" **ET** E2 = "Très peu / personne"

**Sens clinique** : Aidant seul sans soutien mobilisable → risque d'isolement de l'aidant

---

#### R2_CC_02

**Questions** : E1 + E2

**Logique** : E1 = "Je fais presque tout / seul·e" **ET** E2 = "Très peu / personne"

**Sens clinique** : Charge quasi exclusive sans filet de sécurité

---

### R3 — Isolement social du proche

#### R3_CC_01

**Questions** : N20 + O48

**Logique** : N20 = "Oui" **ET** O48 ≤ 1 fois / mois

**Sens clinique** : Isolement social du proche confirmé par faible présence relationnelle

---

### R4 — Relation aidant / aidé & dynamique familiale

#### R4_CC_01

**Questions** : O30 + E4

**Logique** : O30 = "Oui" **ET** E4 = "Plus tendue / compliquée"

**Sens clinique** : Dégradation du lien aidant-aidé avec perte de reconnaissance

---

#### R4_CC_02

**Questions** : E5 + E1

**Logique** : E5 = "Oui" **ET** E1 = "Je fais presque tout / seul·e"

**Sens clinique** : Conflits familiaux associés à une charge déséquilibrée

---

#### R4_CC_03

**Questions** : E6 + O31

**Logique** : E6 = "Refuse la plupart du temps" **ET** O31 = "Oui"

**Sens clinique** : Refus d'aide externe avec anxiété projetée forte → risque de blocage de la prise en charge

---

## 🤖 Contenu IA (à valider)

Les CCC ci-dessus sont **100% Legacy** (source Typologie,CCC et scoring.docx).

Les **micro-tâches et recommendations associées** à chaque CCC sont générées par IA et se trouvent dans :
- `QUESTIONNAIRE/V1_social_relationnel/base/ccc_recommendations.md` (ancienne structure)

> ⚠️ Ces MT CCC doivent être validées par l'équipe clinique.
