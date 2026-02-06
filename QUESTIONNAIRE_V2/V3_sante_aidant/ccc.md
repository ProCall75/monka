# 🎯 CCC V3 — Conditions Critiques Composites Santé Aidant

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (tables index 14-15)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé Physique et Psychologique de l'Aidant"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_ccc: 4
micro_parcours: ["S1", "S2", "S3", "S4"]
```

---

## 🚨 Synthèse CCC

| MP | CCC | Questions | Description |
|----|-----|-----------|-------------|
| **S1** | S1_CC_01 | E7 + E11 | Épuisement / rupture |
| **S2** | S2_CC_01 | E8 + E9 | Isolement émotionnel |
| **S3** | S3_CC_01 | O44 + E18 | Dégradation santé perçue |
| **S4** | S4_CC_01 | E15 + E16 | Renoncement aux soins |

---

## 📋 Détail des CCC

### S1_CC_01 — Épuisement et risque de rupture

**Micro-parcours** : S1 – Épuisement

**Questions impliquées** : E7 + E11

**Logique** :
```
E7 = "Très fatigué·e" OU "Épuisé·e / au bord de craquer"
ET
E11 = "Non, je risque de ne plus y arriver" OU "Je ne suis pas sûr·e"
```

**Sens clinique** : Risque de rupture imminente du rôle d'aidant

---

### S2_CC_01 — Isolement émotionnel

**Micro-parcours** : S2 – Isolement émotionnel

**Questions impliquées** : E8 + E9

**Logique** :
```
E8 = "Souvent" OU "Tout le temps"
ET
E9 = "Non"
```

**Sens clinique** : Isolement affectif avec absence de récupération

---

### S3_CC_01 — Dégradation santé perçue

**Micro-parcours** : S3 – Dégradation santé perçue

**Questions impliquées** : O44 + E18

**Logique** :
```
O44 = "Moins bonne"
ET
E18 = "Mauvaise" OU "Très mauvaise"
```

**Sens clinique** : Dégradation physique objectivée par le vécu

---

### S4_CC_01 — Renoncement aux soins

**Micro-parcours** : S4 – Renoncement aux soins

**Questions impliquées** : E15 + E16

**Logique** :
```
E15 = "Oui" OU "Un peu"
ET
E16 = "Je les reporte ou les annule souvent"
```

**Sens clinique** : Renoncement actif aux soins de l'aidant

---

## ⚠️ Règles Legacy

1. **Priorité** : CCC S1 (épuisement) = priorité maximale
2. **Multi-activation** : Aidant peut avoir plusieurs CCC actifs
3. **Critiques directes** : E12, E13 → Traitement séparé (sécurité)
