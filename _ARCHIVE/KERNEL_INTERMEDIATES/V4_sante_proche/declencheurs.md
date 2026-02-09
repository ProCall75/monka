# 🚀 Déclencheurs V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_declencheurs: 9
critiques_directes: 0
```

---

## 📋 Questions Déclenchantes Standard

| Question | ID | Réponse déclenchante | Micro-parcours |
|----------|----|--------------------|----------------|
| Examens nombreux sans clarification | **E36** | Oui, beaucoup | M1 |
| Avis médicaux contradictoires | **E37** | Oui, souvent | M1 |
| RDV non programmés récents | **E42** | ≥ 2 | M3 |
| Bilan de synthèse global | **E44** | Non, jamais | M3 |
| Suivi addictologie | **E45** | Non | M4 |
| Suivi post-hospitalisation | **E46** | Non | M3/M6 |
| Plan en cas d'aggravation | **E47** | Non, on improvise | M3/M6 |
| Observance traitement psy | **E50** | Non, pas de suivi | M3/M6 |
| Coordinateur identifié | **E52** | Non, personne ne coordonne | M5 |

---

## 🚨 Questions Critiques Directes

> Pas de critiques directes en V4 : la sécurité est gérée via V3 (E12, E13)

---

## ⚠️ Règles Legacy

1. **Critiques** : Priorité niveau 1, délai 7 jours
2. **Standard** : Priorité niveau 3, délai 90 jours
3. **Multi-déclencheurs** : Plusieurs MP peuvent s'ouvrir simultanément
4. **CCC > Score** : Conditions critiques composites priment sur le scoring
