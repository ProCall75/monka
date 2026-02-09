# 🚀 Déclencheurs V3 — Santé de l'Aidant

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé de l'Aidant"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_declencheurs: 5
critiques_directes: 2
```

---

## 📋 Questions Déclenchantes Standard

| Question | ID | Réponse déclenchante | Micro-parcours |
|----------|----|--------------------|----------------|
| Durée de l'aidance | **O49** | Depuis plus de 2 ans | S1 |
| Arrêt de travail lié au rôle | **N8** | Toute réponse ≠ Non | S1 |
| Jours d'arrêt sur 30 jours | **E14** | Entre 4 et 7 / Plus de 7 jours | S1 |
| Souhaitez-vous être davantage aidé·e | **O32** | Oui |  |
| Temps pour soi | **E9** | Non | S2 |

---

## 🚨 Questions Critiques Directes

| Question | ID | Réponse critique | Sens clinique |
|----------|----|--------------------|---------------|
| Risque pour la personne aidée | **E12** | Oui | Risque vital immédiat |
| Risque pour autrui | **E13** | Oui | Risque vital immédiat |

---

## ⚠️ Règles Legacy

1. **Critiques** : Priorité niveau 1, délai 7 jours
2. **Standard** : Priorité niveau 3, délai 90 jours
3. **Multi-déclencheurs** : Plusieurs MP peuvent s'ouvrir simultanément
4. **CCC > Score** : Conditions critiques composites priment sur le scoring
