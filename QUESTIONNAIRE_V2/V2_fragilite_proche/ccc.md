# 🎯 CCC V2 — Conditions Critiques Composites Fragilité du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 22)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_ccc: 5
micro_parcours: ["F1", "F2", "F3", "F4", "F5"]
```

---

## 🚨 Synthèse CCC

| MP | CCC | Questions | Description |
|----|-----|-----------|-------------|
| **F1** | CCC_F1_01 | E21 + (N21 \| N9) | Vie quotidienne fragile |
| **F2** | CCC_F2_01 | E23, E24, O8, O9 | Dépendance fonctionnelle |
| **F3** | CCC_F3_01 | O13 + (E25 \| E26) | Désorganisation cognitive |
| **F4** | CCC_F4_01 | N11, N12, N13, N34, O4 | Dégradation somato-psychique |
| **F5** | CCC_F5_01 | E28 + O53 | Instabilité médico-sociale |

---

## 📋 Détail des CCC

### CCC_F1_01 — Vie quotidienne, budget et entourage

**Micro-parcours** : F1 – Vie quotidienne, budget et entourage

**Questions impliquées** : E21 + (N21 | N9)

**Logique** :
```
E21 = "Non, un changement sera nécessaire" 
ET 
( N21 = "Oui" OU N9 = "Oui" )
```

**Sens clinique** : Situation de vie actuelle non tenable associée à des fragilités financières ou de gestion

---

### CCC_F2_01 — Autonomie, aide humaine et présence nécessaire

**Micro-parcours** : F2 – Autonomie, aide humaine et présence nécessaire

**Questions impliquées** : E23, E24, O8, O9

**Logique** :
```
Au moins 2 conditions vraies parmi :
• E23 = "Pas plus d'1 heure" OU "Ne peut pas rester seul"
• E24 = Présence nécessaire la nuit
• O8 = "Oui, tout le temps"
• O9 = "Oui, tout le temps"
```

**Sens clinique** : Dépendance fonctionnelle élevée nécessitant une réorganisation urgente

---

### CCC_F3_01 — Mémoire, comportement et risques

**Micro-parcours** : F3 – Mémoire, comportement et risques

**Questions impliquées** : O13 + (E25 | E26)

**Logique** :
```
O13 = "Diminution notable" OU "Altération totale"
ET
( E25 = "Oui" OU E26 = "Oui" )
```

**Sens clinique** : Désorganisation cognitive installée avec retentissement fonctionnel

---

### CCC_F4_01 — Douleur, fatigue, sommeil et état général

**Micro-parcours** : F4 – Douleur, fatigue, sommeil et état général

**Questions impliquées** : N11, N12, N13, N34, O4

**Logique** :
```
Au moins 2 conditions vraies parmi :
• N11 = "Oui"
• N12 = "Oui"
• N13 = "Oui"
• N34 = "Oui"
• O4 = "Déprimée"
```

**Sens clinique** : Dégradation somato-psychique globale par accumulation de fragilités

---

### CCC_F5_01 — Dépendance, handicap et épisodes aigus

**Micro-parcours** : F5 – Dépendance, handicap et épisodes aigus

**Questions impliquées** : E28 + O53

**Logique** :
```
E28 ≥ 2 hospitalisations
ET
O53 = "Non"
```

**Sens clinique** : Instabilité médico-sociale avec épisodes aigus sans cadre clair de dépendance

---

## 🤖 Contenu IA (à valider)

### MT associées aux CCC

Les micro-tâches associées à chaque CCC sont définies dans :
- `QUESTIONNAIRE/V2_fragilite_proche/base/ccc_recommendations.md`

> ⚠️ Source IA — validation clinique requise

---

## ⚠️ Règles Legacy

1. **Priorité** : CCC > Score pour déclenchement MP
2. **Multi-activation** : Un aidant peut avoir plusieurs CCC actifs
3. **Critiques directes** : E27, N22, N25, N38, N39 → Traitement séparé (pas CCC)
