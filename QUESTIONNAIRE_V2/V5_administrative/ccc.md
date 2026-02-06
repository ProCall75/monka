# 🎯 CCC V5 — Conditions Critiques Composites Administrative

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 9)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_ccc: 3
micro_parcours: ["A1", "A2", "A3"]
```

---

## 🚨 Synthèse CCC

| MP | CCC | Questions | Description |
|----|-----|-----------|-------------|
| **A1** | A1_CC_01 | E68 + E21 | Saturation administrative |
| **A2** | A2_CC_01 | E62 + O53 | Rupture de droits |
| **A3** | A3_CC_01 | E61 + E21 | Absence d'anticipation |

---

## 📋 Détail des CCC

### A1_CC_01 — Saturation administrative

**Micro-parcours** : A1 – Saturation administrative

**Questions impliquées** : E68 + E21

**Logique** :
```
E68 = "Plus de 5h par mois"
ET
E21 = "Non, un changement sera nécessaire" OU "Je ne sais pas"
```

**Sens clinique** : Charge administrative excessive avec incapacité perçue à maintenir la situation

---

### A2_CC_01 — Rupture de droits

**Micro-parcours** : A2 – Rupture de droits

**Questions impliquées** : E62 + O53

**Logique** :
```
E62 = "Aucun" OU "Je ne sais pas"
ET
O53 = "Non" OU "Je ne sais pas"
```

**Sens clinique** : Absence de droits ouverts malgré un besoin potentiel

---

### A3_CC_01 — Absence d'anticipation

**Micro-parcours** : A3 – Absence d'anticipation

**Questions impliquées** : E61 + E21

**Logique** :
```
E61 = "Non" OU "Je ne sais pas"
ET
E21 = "Non, un changement sera nécessaire" OU "Je ne sais pas"
```

**Sens clinique** : Décisions futures à risque en cas de dégradation ou de crise

---

## 🔴 Questions Critiques V5

| ID | Question | Réponse critique | Sens |
|----|----------|------------------|------|
| **E68** | Temps administratif | > 5h/mois | Charge incompatible avec la durée |
| **E62** | Aides en cours | Aucun droit engagé | Risque rupture financière/sociale |
| **E61** | Directives anticipées | Refus + situation instable | Risque décisionnel majeur en crise |

---

## ⚠️ Règles Legacy

1. **Priorité A1** : Saturation = risque de rupture globale
2. **Priorité A2** : Droits non activés = fragilisation sociale
3. **Priorité A3** : Anticipation = préparation aux crises
