# 📊 Scoring V5 — Administrative

> **Source** : `SOURCES/extracted/scores_by_vulnerability.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "scores_by_vulnerability.json"
extraction_date: "2026-02-07"
score_max: 6
questions_scorantes: 3
```

---

## 📋 Questions Scorantes

Score max global : 6

| Question | Réponse | Score |
|----------|---------|-------|
| **E66** — Les démarches administratives liées à votre proche vous para | Pas du tout | 0 |
| | Un peu | 1 |
| | Oui | 2 |
| **E69** — Vous sentez-vous à l’aise avec les démarches administratives | Oui, tout à fait | 0 |
| | Oui, mais cela me prend beaucoup de temps | 1 |
| | Non, je suis souvent perdu·e | 2 |
| | Je n’ai pas facilement accès à un ordinateur / internet | 2 |
| **E70** — Vous arrive-t-il de devoir gérer des démarches administrativ | Non, jamais | 0 |
| | Parfois | 1 |
| | Souvent, je suis toujours en retard | 2 |
| | Je ne sais pas | 1 |

---

## 🎯 Seuils d'Interprétation

| Score | Niveau | Couleur |
|-------|--------|---------|
| 0-2 | Faible | 🟢 Vert |
| 3-4 | Modéré | 🟠 Orange |
| 5-6 | Élevé | 🔴 Rouge |

---

## ⚠️ Règle Clé

> **Le scoring mesure une INTENSITÉ, il ne déclenche JAMAIS seul un micro-parcours.**

Le scoring sert à :
- Moduler la priorité d'affichage
- Nuancer l'urgence
- Compléter les déclencheurs
