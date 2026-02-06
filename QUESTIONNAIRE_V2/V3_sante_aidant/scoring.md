# 📊 Scoring V3 — Santé Physique et Psychologique de l'Aidant

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (tables index 12, 16-17)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé Physique et Psychologique de l'Aidant"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_scorantes: 9
score_max: 18
```

---

## 🔢 Questions Scorantes V3

| ID | Question | Type | Justification |
|----|----------|------|---------------|
| **O29** | Retentissement santé | Scorante | Impact direct |
| **O33** | Charge ressentie | Scorante | Charge subjective |
| **E7** | Épuisement | Scorante | Indicateur clé |
| **E8** | Solitude émotionnelle | Scorante | Fragilité psychique |
| **E9** | Temps pour soi | Scorante | Déséquilibre |
| **E10** | Stress / moral | Scorante | Charge psychologique |
| **E11** | Capacité à continuer | Scorante | Risque de rupture |
| **O44** | Santé perçue | Scorante | Auto-évaluation |
| **E18** | Qualité sommeil | Scorante | Marqueur clinique |

---

## 📈 Table de Scoring

### O29 — Retentissement santé

| Réponse | Score |
|---------|-------|
| Pas du tout | 0 |
| Un peu | 1 |
| Oui | 2 |

---

### O33 — Charge ressentie

| Réponse | Score |
|---------|-------|
| Pas du tout | 0 |
| Un peu | 1 |
| Oui | 2 |

---

### E7 — Épuisement

| Réponse | Score |
|---------|-------|
| Pas du tout fatigué·e | 0 |
| Un peu | 1 |
| Très fatigué·e / Épuisé·e | 2 |

---

### E8 — Solitude émotionnelle

| Réponse | Score |
|---------|-------|
| Jamais | 0 |
| Parfois | 1 |
| Souvent / Tout le temps | 2 |

---

### E9 — Temps pour soi

| Réponse | Score |
|---------|-------|
| Oui | 0 |
| Non | 2 |

---

### E10 — Stress / moral

| Réponse | Score |
|---------|-------|
| Ça va | 0 |
| Parfois | 1 |
| Souvent / débordé·e | 2 |

---

### E11 — Capacité à continuer

| Réponse | Score |
|---------|-------|
| Oui sans difficulté | 0 |
| Difficile / incertain | 1 |
| Non | 2 |

---

### O44 — Santé perçue

| Réponse | Score |
|---------|-------|
| Meilleure | 0 |
| Identique | 1 |
| Moins bonne | 2 |

---

### E18 — Qualité sommeil

| Réponse | Score |
|---------|-------|
| Bonne | 0 |
| Correcte | 1 |
| Mauvaise / très mauvaise | 2 |

---

## 🎯 Seuils d'Alerte V3

| Score | Couleur | Lecture |
|-------|---------|---------|
| **0 – 6** | 🟢 Vert | Santé globalement préservée |
| **7 – 13** | 🟠 Orange | Fatigue et fragilisation |
| **14 – 18+** | 🔴 Rouge | Épuisement avéré, risque de rupture |

---

## ⚠️ Règles Legacy

1. **Score sur 18** (9 questions × 2 max)
2. **Critiques directes** : E12, E13 non incluses dans le score
3. **CCC** : Activés indépendamment du score
