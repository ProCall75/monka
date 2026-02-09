# 🚀 Déclencheurs V1 — Social et Relationnel

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_declencheurs: 4
critiques_directes: 2
```

---

## 📋 Questions Déclenchantes Standard

| Question | ID | Réponse déclenchante | Micro-parcours |
|----------|----|--------------------|----------------|
| Aménagement activité professionnelle | **N7** | Aménagement horaires / Congés | R1 |
| Fréquence des visites | **O48** | 1 fois par mois ou moins | R3 |
| Aidant seul dans la famille | **N4** | Oui | R2 |
| Acceptation aide extérieure | **E6** | Refuse la plupart du temps | R4 |

---

## 🚨 Questions Critiques Directes

| Question | ID | Réponse critique | Sens clinique |
|----------|----|--------------------|---------------|
| Acceptation aide extérieure | **E6** | Refuse la plupart du temps | Refus d'aide compromettant la sécurisation |
| Soutien mobilisable | **E2** | Personne | Isolement relationnel sévère de l'aidant |

---

## ⚠️ Règles Legacy

1. **Critiques** : Priorité niveau 1, délai 7 jours
2. **Standard** : Priorité niveau 3, délai 90 jours
3. **Multi-déclencheurs** : Plusieurs MP peuvent s'ouvrir simultanément
4. **CCC > Score** : Conditions critiques composites priment sur le scoring
