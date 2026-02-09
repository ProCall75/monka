# 🎯 CCC V5 — Conditions Critiques Composites Administrative

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_ccc: 3
micro_parcours: ["A1", "A2", "A3"]
```

---

## 🚨 Synthèse CCC

| MP | CCC | Questions | Description |
|----|-----|-----------|-------------|
| **A1** | CCC_A1_01 | E68 + E21 | Charge administrative excessive avec incapacité pe |
| **A2** | CCC_A2_01 | E62 + O53 | Absence de droits ouverts malgré un besoin potenti |
| **A3** | CCC_A3_01 | E61 + E21 | Décisions futures à risque en cas de dégradation o |

---

## 📋 Détail des CCC

### CCC_A1_01 — Saturation administrative

**Micro-parcours** : A1 – Saturation administrative

**Questions impliquées** : E68 + E21

**Logique** :
```
E68 = " Plus de 5h par mois " ET E21 = " Non, un changement sera nécessaire " OU " Je ne sais pas "
```

**Sens clinique** : Charge administrative excessive avec incapacité perçue à maintenir la situation

---

### CCC_A2_01 — Rupture de droits

**Micro-parcours** : A2 – Rupture de droits

**Questions impliquées** : E62 + O53

**Logique** :
```
E62 = " Aucun " OU " Je ne sais pas " ET O53 = " Non " OU " Je ne sais pas "
```

**Sens clinique** : Absence de droits ouverts malgré un besoin potentiel

---

### CCC_A3_01 — Absence d’anticipation

**Micro-parcours** : A3 – Absence d’anticipation

**Questions impliquées** : E61 + E21

**Logique** :
```
E61 = " Non " OU " Je ne sais pas " ET E21 = " Non, un changement sera nécessaire " OU " Je ne sais pas "
```

**Sens clinique** : Décisions futures à risque en cas de dégradation ou de crise

---

## ⚠️ Règles Legacy

1. **Priorité** : CCC > Score pour déclenchement MP
2. **Multi-activation** : Un aidant peut avoir plusieurs CCC actifs
3. **Critiques directes** : Traitement séparé (pas CCC)
