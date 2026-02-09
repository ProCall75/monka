# 🚀 Déclencheurs V5 — Administrative

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_declencheurs: 5
critiques_directes: 3
```

---

## 📋 Questions Déclenchantes Standard

| Question | ID | Réponse déclenchante | Micro-parcours |
|----------|----|--------------------|----------------|
| Temps administratif mensuel | **E68** | ≥ 1h / mois | A1 |
| Droits/aides demandés | **E62** | Aucun / Je ne sais pas | A2 |
| Évaluation dépendance AGGIR | **O53** | Non / Je ne sais pas | A2 |
| Directives anticipées | **E61** | Non / Je ne sais pas | A3 |
| Maintien situation de vie | **E21** | Non / incertain | A1/A3 |

---

## 🚨 Questions Critiques Directes

| Question | ID | Réponse critique | Sens clinique |
|----------|----|--------------------|---------------|
| Temps administratif mensuel | **E68** | > 5h / mois | Charge administrative incompatible |
| Aides en cours | **E62** | Aucun droit engagé malgré besoin | Risque de rupture financière / sociale |
| Directives anticipées | **E61** | Refus total + situation instable | Risque décisionnel majeur en crise |

---

## ⚠️ Règles Legacy

1. **Critiques** : Priorité niveau 1, délai 7 jours
2. **Standard** : Priorité niveau 3, délai 90 jours
3. **Multi-déclencheurs** : Plusieurs MP peuvent s'ouvrir simultanément
4. **CCC > Score** : Conditions critiques composites priment sur le scoring
