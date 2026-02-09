# 🎯 CCC V4 — Conditions Critiques Composites Parcours Médical du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_ccc: 8
micro_parcours: ["M1", "M2", "M3", "M5"]
```

---

## 🚨 Synthèse CCC

| MP | CCC | Questions | Description |
|----|-----|-----------|-------------|
| **M1** | CCC_M1_01 | E36 + E37 | Parcours de soins sans diagnostic stabilisé, perte |
| **M1** | CCC_M1_02 | E38 + E36 | Passage enfant/adulte mal préparé associé à une er |
| **M2** | CCC_M2_03 | O24 + E40 | Difficultés concrètes et persistantes d’accès aux  |
| **M2** | CCC_M2_04 | E42 + E43 | Alternance de crises non anticipées et de ruptures |
| **M3** | CCC_M3_05 | E44 + E52 | Aucun cadre médical structurant ni référent identi |
| **M3** | CCC_M3_06 | E47 + E46 | Absence de plan de réponse médicale en situation c |
| **M3** | CCC_M3_07 | E50 + E51 | Troubles psychiques ou addictifs sans prise en cha |
| **M5** | CCC_M5_08 | E54 + E57 | Parcours médical non lisible, non piloté, à risque |

---

## 📋 Détail des CCC

### CCC_M1_01 — Compréhension du diagnostic

**Micro-parcours** : M1 – Compréhension du diagnostic

**Questions impliquées** : E36 + E37

**Logique** :
```
E36 = "Oui, beaucoup" ET E37 = "Oui, souvent"
```

**Sens clinique** : Parcours de soins sans diagnostic stabilisé, perte de repères médicaux, risque de retards de prise en charge adaptés

---

### CCC_M1_02 — Compréhension du diagnostic

**Micro-parcours** : M1 – Compréhension du diagnostic

**Questions impliquées** : E38 + E36

**Logique** :
```
E38 = "Non, pas du tout" ET E36 = "Oui, un peu" ou "Oui, beaucoup"
```

**Sens clinique** : Passage enfant/adulte mal préparé associé à une errance médicale en cours

---

### CCC_M2_03 — Accès aux soins

**Micro-parcours** : M2 – Accès aux soins

**Questions impliquées** : O24 + E40

**Logique** :
```
O24 = "Oui" ET E40 ≠ "Je ne rencontre pas de difficultés particulières"
```

**Sens clinique** : Difficultés concrètes et persistantes d’accès aux soins nécessaires

---

### CCC_M2_04 — Accès / M3

**Micro-parcours** : M2 – Accès / M3

**Questions impliquées** : E42 + E43

**Logique** :
```
E42 ≥ "2" ET E43 = "Oui, plusieurs périodes ou plus de 6 mois"
```

**Sens clinique** : Alternance de crises non anticipées et de ruptures prolongées de suivi

---

### CCC_M3_05 — Continuité des soins

**Micro-parcours** : M3 – Continuité des soins

**Questions impliquées** : E44 + E52

**Logique** :
```
E44 = "Non, jamais" ET E52 = "Non, personne ne coordonne vraiment"
```

**Sens clinique** : Aucun cadre médical structurant ni référent identifié

---

### CCC_M3_06 — Urgences

**Micro-parcours** : M3 – Urgences

**Questions impliquées** : E47 + E46

**Logique** :
```
E47 = "Non, on improvise" ET E46 = "Non, nous avons dû tout organiser seuls"
```

**Sens clinique** : Absence de plan de réponse médicale en situation critique

---

### CCC_M3_07 — Troubles psy & addictions

**Micro-parcours** : M3 – Troubles psy & addictions

**Questions impliquées** : E50 + E51

**Logique** :
```
E50 = "Non, pas de suivi / pas de traitement" ET E51 = "Non"
```

**Sens clinique** : Troubles psychiques ou addictifs sans prise en charge ni adhésion

---

### CCC_M5_08 — Coordination

**Micro-parcours** : M5 – Coordination

**Questions impliquées** : E54 + E57

**Logique** :
```
E54 = "Souvent très compliquée" ou "Ingérable" ET E57 = "Non, on avance au jour le jour"
```

**Sens clinique** : Parcours médical non lisible, non piloté, à risque de rupture

---

## ⚠️ Règles Legacy

1. **Priorité** : CCC > Score pour déclenchement MP
2. **Multi-activation** : Un aidant peut avoir plusieurs CCC actifs
3. **Critiques directes** : Traitement séparé (pas CCC)
