# 📊 Scoring V3 — Santé de l'Aidant

> **Source** : `SOURCES/extracted/scores_by_vulnerability.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé de l'Aidant"
source: "scores_by_vulnerability.json"
extraction_date: "2026-02-07"
score_max: 20
questions_scorantes: 10
```

---

## 📋 Questions Scorantes

Score max global : 20

| Question | Réponse | Score |
|----------|---------|-------|
| **E7** — À quel point vous sentez-vous épuisé·e par votre rôle d’aida | Pas du tout fatigué·e | 0 |
| | Un peu fatigué·e | 1 |
| | Très fatigué·e | 2 |
| | Épuisé·e / au bord de craquer | 2 |
| **E8** — Avez-vous le sentiment d’être seul(e) émotionnellement face  | Jamais | 0 |
| | Parfois | 1 |
| | Souvent | 2 |
| | Tout le temps | 2 |
| **E9** — Parvenez-vous à avoir du temps pour vous au cours d’une sema | Oui | 0 |
| | Non | 2 |
| **E10** — Sur le plan moral (stress, inquiétude), où vous situez-vous  | Ça va globalement | 0 |
| | Parfois tendu·e / inquiet·e | 1 |
| | Souvent tendu·e / inquiet·e | 2 |
| | Débordé·e / au bord de craquer | 2 |
| **E11** — Si rien ne change, pensez-vous pouvoir continuer à vous occu | Oui, sans difficulté | 0 |
| | Oui, mais ce sera difficile | 1 |
| | Je ne suis pas sûr·e | 2 |
| | Non, je risque de ne plus y arriver | 2 |
| **E18** — Globalement, comment évalueriez-vous la qualité de votre som | Bonne | 0 |
| | Correcte | 1 |
| | Mauvaise | 2 |
| | Très mauvaise | 2 |
| **O6** — O6 | Non | 0 |
| | Oui, sans gravité | 1 |
| | Oui avec complication / plusieurs chutes | 2 |
| **O29** — Vous occuper de la personne aidée a-t-il un retentissement s | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **O33** — Ressentez-vous une charge en vous occupant de cette personne | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **O44** — Selon vous et par rapport à une personne du même âge, diriez | Meilleure | 0 |
| | Identique | 1 |
| | Moins bonne | 2 |

---

## 🎯 Seuils d'Interprétation

| Score | Niveau | Couleur |
|-------|--------|---------|
| 0-6 | Faible | 🟢 Vert |
| 7-13 | Modéré | 🟠 Orange |
| 14-20 | Élevé | 🔴 Rouge |

---

## ⚠️ Règle Clé

> **Le scoring mesure une INTENSITÉ, il ne déclenche JAMAIS seul un micro-parcours.**

Le scoring sert à :
- Moduler la priorité d'affichage
- Nuancer l'urgence
- Compléter les déclencheurs
