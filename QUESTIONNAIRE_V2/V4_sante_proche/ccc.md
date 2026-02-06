# 🎯 CCC V4 — Conditions Critiques Composites Parcours Médical du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (tables index 26-31)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_ccc: 6
micro_parcours: ["M1", "M2", "M3", "M4", "M5", "M6"]
```

---

## 🚨 Synthèse CCC

| MP | CCC | Questions | Description |
|----|-----|-----------|-------------|
| **M1** | M1_CC_01 | E36 + E37 | Errance diagnostique |
| **M1** | M1_CC_02 | E38 + E36 | Transition enfant/adulte + errance |
| **M2** | M2_CC_01 | O24 + E40 | Difficultés accès soins |
| **M3** | M3_CC_01 | E42 + E43 | Hospitalisations + ruptures |
| **M3** | M3_CC_02 | E44 + E52 | Absence PAP + coordination |
| **M5** | M5_CC_01 | E52 | Absence de coordination |

---

## 📋 Détail des CCC

### M1_CC_01 — Errance diagnostique

**Micro-parcours** : M1 – Compréhension du diagnostic

**Questions impliquées** : E36 + E37

**Logique** :
```
E36 = "Oui, beaucoup"
ET
E37 = "Oui, souvent"
```

**Sens clinique** : Parcours de soins sans diagnostic stabilisé, perte de repères médicaux, risque de retards de prise en charge adaptés

---

### M1_CC_02 — Transition + errance

**Micro-parcours** : M1 – Compréhension du diagnostic

**Questions impliquées** : E38 + E36

**Logique** :
```
E38 = "Non, pas du tout"
ET
E36 = "Oui, un peu" OU "Oui, beaucoup"
```

**Sens clinique** : Passage enfant/adulte mal préparé associé à une errance médicale en cours

---

### M2_CC_01 — Difficultés accès soins

**Micro-parcours** : M2 – Accès aux soins et aux professionnels

**Questions impliquées** : O24 + E40

**Logique** :
```
O24 = "Oui"
ET
E40 ≠ "Je ne rencontre pas de difficultés particulières"
```

**Sens clinique** : Difficultés concrètes et persistantes d'accès aux soins nécessaires

---

### M3_CC_01 — Hospitalisations et ruptures

**Micro-parcours** : M2 – Accès / M3 – Urgences

**Questions impliquées** : E42 + E43

**Logique** :
```
E42 ≥ 2 hospitalisations
ET
E43 = "Oui, plusieurs périodes ou plus de 6 mois"
```

**Sens clinique** : Alternance de crises non anticipées et de ruptures prolongées de suivi

---

### M3_CC_02 — Absence PAP et coordination

**Micro-parcours** : M3 – Continuité des soins

**Questions impliquées** : E44 + E52

**Logique** :
```
E44 = "Non, jamais"
ET
E52 = "Non, personne ne coordonne vraiment"
```

**Sens clinique** : Aucun cadre médical structurant ni référent identifié

---

### M5_CC_01 — Absence de coordination

**Micro-parcours** : M5 – Coordination des soins

**Questions impliquées** : E52

**Logique** :
```
E52 = "Non, personne ne coordonne vraiment"
```

**Sens clinique** : Gouvernance du parcours absente

---

## ⚠️ Règles Legacy

1. **Priorité** : CCC M1/M3 = priorité haute (errance + ruptures)
2. **Multi-activation** : Proche peut avoir plusieurs CCC actifs
3. **M4 (Addictions)** : Traitement via déclencheurs E46, O48
