# 📊 Scoring V1 — Social et Relationnel

> **Source** : `SOURCES/extracted/scores_by_vulnerability.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "scores_by_vulnerability.json"
extraction_date: "2026-02-07"
score_max: 15
questions_scorantes: 8
```

---

## 📋 Questions Scorantes

Score max global : 15

| Question | Réponse | Score |
|----------|---------|-------|
| **E1** — Comment se passe la répartition de l’aide dans votre entoura | Répartition équilibrée et satisfaisante | 0 |
| | Je fais la plus grande partie mais cela reste acceptable | 1 |
| | Je fais presque tout / je suis totalement seul·e | 2 |
| **E2** — En cas de coup dur, avez-vous autour de vous des personnes s | Oui, plusieurs personnes | 0 |
| | Oui, une personne | 1 |
| | Très peu de personnes / personne | 2 |
| **E4** — Depuis que vous aidez votre proche, comment a évolué votre r | Relation renforcée ou globalement similaire | 0 |
| | Relation plus tendue / plus compliquée / difficile à dire | 1 |
| **E5** — Existe-t-il des tensions ou des désaccords au sein de la fam | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **N20** — A-t-elle  des difficultés à maintenir des relations sociales | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **O27** — Vous occuper de la personne aidée entraine-t-il des difficul | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **O28** — Vous occuper de la personne aidée entraîne-t-il des difficul | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **O30** — Avez-vous le sentiment de ne plus reconnaître la personne ai | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |

---

## 🎯 Seuils d'Interprétation

| Score | Niveau | Couleur |
|-------|--------|---------|
| 0-5 | Faible | 🟢 Vert |
| 6-10 | Modéré | 🟠 Orange |
| 11-15 | Élevé | 🔴 Rouge |

---

## ⚠️ Règle Clé

> **Le scoring mesure une INTENSITÉ, il ne déclenche JAMAIS seul un micro-parcours.**

Le scoring sert à :
- Moduler la priorité d'affichage
- Nuancer l'urgence
- Compléter les déclencheurs
