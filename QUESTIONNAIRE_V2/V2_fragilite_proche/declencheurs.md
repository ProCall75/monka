# 🚀 Déclencheurs V2 — Fragilité du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_declencheurs: 5
critiques_directes: 5
```

---

## 📋 Questions Déclenchantes Standard

| Question | ID | Réponse déclenchante | Micro-parcours |
|----------|----|--------------------|----------------|
| Maintien situation sans changement | **E21** | Non / Je ne sais pas | F1 |
| Besoin présence la nuit | **E24** | Oui | F2 |
| Temps possible seul | **E23** | Pas plus d'1h / Ne peut pas rester seul | F2 |
| Projet adaptation lieu de vie | **O51** | Oui | F1 |
| Hospitalisations récentes | **E28** | ≥ 2 | F5 |

---

## 🚨 Questions Critiques Directes

| Question | ID | Réponse critique | Sens clinique |
|----------|----|--------------------|---------------|
| Comportements dangereux | **E27** | Oui | Danger immédiat pour le proche ou l'aidant |
| Idées suicidaires | **N25** | Oui | Risque vital immédiat |
| Comportements à risque | **N22** | Oui | Mise en danger |
| Perte de contrôle addiction | **N38** | Oui | Addiction non contrôlée |
| Violence passive/active | **N39** | Oui | Violence domestique |

---

## ⚠️ Règles Legacy

1. **Critiques** : Priorité niveau 1, délai 7 jours
2. **Standard** : Priorité niveau 3, délai 90 jours
3. **Multi-déclencheurs** : Plusieurs MP peuvent s'ouvrir simultanément
4. **CCC > Score** : Conditions critiques composites priment sur le scoring
