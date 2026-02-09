# 📊 Scoring V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/scores_by_vulnerability.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "scores_by_vulnerability.json"
extraction_date: "2026-02-07"
score_max: 12
questions_scorantes: 6
```

---

## 📋 Questions Scorantes

Score max global : 12

| Question | Réponse | Score |
|----------|---------|-------|
| **E36** — Depuis le début des problèmes de santé de votre proche, avez | Non, pas particulièrement | 0 |
| | Oui, un peu | 1 |
| | Oui, beaucoup | 2 |
| **E37** — Avez-vous déjà reçu des avis médicaux contradictoires sur la | Non | 0 |
| | Oui, parfois | 1 |
| | Oui, souvent | 2 |
| **E43** — Au cours des 12 derniers mois, y a-t-il eu des périodes de p | Non | 0 |
| | Oui, une période de 3 à 6 mois | 1 |
| | Oui, plusieurs périodes ou > 6 mois | 2 |
| **E47** — Quand l’état de santé de votre proche se dégrade brusquement | Oui, on sait quoi faire | 0 |
| | Quelques repères | 1 |
| | Non, on improvise / urgences | 2 |
| **E54** — Comment décririez-vous l’organisation des soins de votre pro | Plutôt simple et bien organisée | 0 |
| | Gérable mais parfois compliquée | 1 |
| | Très compliquée / ingérable | 2 |
| **E57** — Avez-vous l’impression qu’il existe un ‘plan de route’ clair | Oui, c’est clair | 0 |
| | Partiellement | 1 |
| | Non, on avance au jour le jour | 2 |

---

## 🎯 Seuils d'Interprétation

| Score | Niveau | Couleur |
|-------|--------|---------|
| 0-4 | Faible | 🟢 Vert |
| 5-8 | Modéré | 🟠 Orange |
| 9-12 | Élevé | 🔴 Rouge |

---

## ⚠️ Règle Clé

> **Le scoring mesure une INTENSITÉ, il ne déclenche JAMAIS seul un micro-parcours.**

Le scoring sert à :
- Moduler la priorité d'affichage
- Nuancer l'urgence
- Compléter les déclencheurs
