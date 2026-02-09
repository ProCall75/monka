# 🎯 CCC V1 — Conditions Critiques Composites Social et Relationnel

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_ccc: 8
micro_parcours: ["R1", "R2", "R3", "R4"]
```

---

## 🚨 Synthèse CCC

| MP | CCC | Questions | Description |
|----|-----|-----------|-------------|
| **R1** | CCC_R1_01 | O27 + O28 | Retentissement massif du rôle d’aidant sur la vie  |
| **R1** | CCC_R1_02 | N7 + O27 | Ajustement professionnel déjà engagé avec impact f |
| **R2** | CCC_R2_01 | N4 + E2 | Aidant seul sans soutien mobilisable → risque d’is |
| **R2** | CCC_R2_02 | E1 + E2 | Charge quasi exclusive sans filet de sécurité |
| **R3** | CCC_R3_01 | N20 + O48 | Isolement social du proche confirmé par faible pré |
| **R4** | CCC_R4_01 | O30 + E4 | Dégradation du lien aidant-aidé avec perte de reco |
| **R4** | CCC_R4_02 | E5 + E1 | Conflits familiaux associés à une charge déséquili |
| **R4** | CCC_R4_03 | E6 + O31 | Refus d’aide externe avec anxiété projetée forte → |

---

## 📋 Détail des CCC

### CCC_R1_01 — Impact sur la vie personnelle / sociale / pro

**Micro-parcours** : R1 – Impact sur la vie personnelle / sociale / pro

**Questions impliquées** : O27 + O28

**Logique** :
```
O27 = "Oui" ET O28 = "Oui"
```

**Sens clinique** : Retentissement massif du rôle d’aidant sur la vie privée et sociale → risque de déséquilibre global

---

### CCC_R1_02 — Impact sur la vie personnelle / sociale / pro

**Micro-parcours** : R1 – Impact sur la vie personnelle / sociale / pro

**Questions impliquées** : N7 + O27

**Logique** :
```
N7 = aménagement horaires ou congés ET O27 = "Oui"
```

**Sens clinique** : Ajustement professionnel déjà engagé avec impact familial → fragilisation structurelle

---

### CCC_R2_01 — Soutien de l’entourage

**Micro-parcours** : R2 – Soutien de l’entourage

**Questions impliquées** : N4 + E2

**Logique** :
```
N4 = "Oui" ET E2 = "Très peu / personne"
```

**Sens clinique** : Aidant seul sans soutien mobilisable → risque d’isolement de l’aidant

---

### CCC_R2_02 — Soutien de l’entourage

**Micro-parcours** : R2 – Soutien de l’entourage

**Questions impliquées** : E1 + E2

**Logique** :
```
E1 = "Je fais presque tout / seul·e" ET E2 = "Très peu / personne"
```

**Sens clinique** : Charge quasi exclusive sans filet de sécurité

---

### CCC_R3_01 — Isolement social du proche

**Micro-parcours** : R3 – Isolement social du proche

**Questions impliquées** : N20 + O48

**Logique** :
```
N20 = "Oui" ET O48 ≤ 1 fois / mois
```

**Sens clinique** : Isolement social du proche confirmé par faible présence relationnelle

---

### CCC_R4_01 — Relation aidant / aidé & dynamique familiale

**Micro-parcours** : R4 – Relation aidant / aidé & dynamique familiale

**Questions impliquées** : O30 + E4

**Logique** :
```
O30 = "Oui" ET E4 = "Plus tendue / compliquée"
```

**Sens clinique** : Dégradation du lien aidant-aidé avec perte de reconnaissance

---

### CCC_R4_02 — Relation aidant / aidé & dynamique familiale

**Micro-parcours** : R4 – Relation aidant / aidé & dynamique familiale

**Questions impliquées** : E5 + E1

**Logique** :
```
E5 = "Oui" ET E1 = "Je fais presque tout / seul·e"
```

**Sens clinique** : Conflits familiaux associés à une charge déséquilibrée

---

### CCC_R4_03 — Relation aidant / aidé & acceptation de l’aide

**Micro-parcours** : R4 – Relation aidant / aidé & acceptation de l’aide

**Questions impliquées** : E6 + O31

**Logique** :
```
E6 = "Refuse la plupart du temps" ET O31 = "Oui"
```

**Sens clinique** : Refus d’aide externe avec anxiété projetée forte → risque de blocage de la prise en charge

---

## ⚠️ Règles Legacy

1. **Priorité** : CCC > Score pour déclenchement MP
2. **Multi-activation** : Un aidant peut avoir plusieurs CCC actifs
3. **Critiques directes** : Traitement séparé (pas CCC)
