# 📊 Scoring V1 — Social et Relationnel

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 4-5)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "Typologie,CCC et scoring.docx"
extraction_date: "2026-02-06"
score_max: 13
questions_scorantes: 7
```

---

## 📋 Questions Scorantes

| Question | Réponse | Score |
|----------|---------|-------|
| **O27** — Impact vie familiale | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **O28** — Impact vie sociale/pro | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **E1** — Répartition de l'aide | Répartition équilibrée et satisfaisante | 0 |
| | Je fais la plus grande partie mais cela reste acceptable | 1 |
| | Je fais presque tout / je suis totalement seul·e | 2 |
| **E2** — Soutien mobilisable | Oui, plusieurs personnes | 0 |
| | Oui, une personne | 1 |
| | Très peu de personnes / personne | 2 |
| **N20** — Relations sociales proche | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |
| **O30** — Ne plus reconnaître | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **E4** — Évolution relation | Relation renforcée ou globalement similaire | 0 |
| | Relation plus tendue / compliquée / difficile à dire | 1 |
| **E5** — Tensions familiales | Non | 0 |
| | Parfois | 1 |
| | Oui | 2 |

---

## 🎯 Seuils d'Interprétation

| Score | Couleur | Lecture |
|-------|---------|---------|
| 0 – 6 | 🟢 Vert | Situation sociale globalement préservée |
| 7 – 13 | 🟠 Orange | Fragilisation sociale et relationnelle |
| 14 – 20 | 🔴 Rouge | Isolement ou rupture relationnelle probable |

---

## ⚠️ Règle Clé

> **Le scoring mesure une INTENSITÉ, il ne déclenche JAMAIS seul un micro-parcours.**

Le scoring sert à :
- Moduler la priorité d'affichage
- Nuancer l'urgence
- Compléter les déclencheurs

---

## 📎 Questions NON Scorantes (Descriptives / Modulatrices)

Ces questions contribuent au contexte mais n'impactent pas le score :

| ID | Question | Rôle |
|----|----------|------|
| O47 | Distance domicile | Contexte logistique |
| O48 | Fréquence des visites | Intensité de présence |
| N4 | Aidant seul ou non | Structure du réseau |
| E3 | Autres personnes à charge | Charge globale |
| N7 | Aménagement professionnel | Conséquence organisationnelle |
| O31 | Peur pour l'avenir | Inquiétude projetée |
| E6 | Acceptation aide extérieure | **Critique directe** (non scorante mais déclenchante) |
