# 📊 Scoring V2 — Fragilité du Proche

> **Source** : `SOURCES/extracted/scores_by_vulnerability.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "scores_by_vulnerability.json"
extraction_date: "2026-02-07"
score_max: 22
questions_scorantes: 11
```

---

## 📋 Questions Scorantes

Score max global : 22

| Question | Réponse | Score |
|----------|---------|-------|
| **O7** — Avez-vous constaté des changements dans la manière dont elle | Non | 0 |
| | Oui | 1 |
| | Oui et dénutrition | 2 |
| **O13** — Selon vous, y-a-t-il une détérioration notable dans ses fonc | Non | 0 |
| | Diminution de certaines fonctions | 1 |
| | Fonctions totalement altérées | 2 |
| **N24** — La personne aidée at-telle des troubles de la mémoire ou de  | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **E25** — La personne aidée confond-elle parfois le jour et la nuit (e | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **E26** — La personne aidée se perd-elle ou semble-t-elle désorientée  | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **O4** — Selon vous, en ce moment, diriez-vous de la personne aidée q | Humeur normale | 0 |
| | Parfois anxieuse ou triste | 1 |
| | Déprimée | 2 |
| **N11** — La personne aidée est-elle sujette à des douleurs chroniques | Non | 0 |
| | Occasionnellement | 1 |
| | Oui | 2 |
| **N12** — Ressentez-vous souvent de la fatigue ou un manque d'énergie  | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **N13** — La personne aidée a-t-elle des troubles du sommeil ? | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **N34** — A-t-elle des difficultés à s'alimenter correctement (sous-al | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **O26** — Avez-vous constaté une diminution de sa taille habituelle ? | Non | 0 |
| | Oui | 2 |

---

## 🎯 Seuils d'Interprétation

| Score | Niveau | Couleur |
|-------|--------|---------|
| 0-7 | Faible | 🟢 Vert |
| 8-14 | Modéré | 🟠 Orange |
| 15-22 | Élevé | 🔴 Rouge |

---

## ⚠️ Règle Clé

> **Le scoring mesure une INTENSITÉ, il ne déclenche JAMAIS seul un micro-parcours.**

Le scoring sert à :
- Moduler la priorité d'affichage
- Nuancer l'urgence
- Compléter les déclencheurs
