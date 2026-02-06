# 📊 Scoring V2 — Fragilité du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (tables index 23-24)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_scorantes: 14
score_max: 28
```

---

## 🔢 Questions Scorantes V2

| ID | Question | Type | Justification |
|----|----------|------|---------------|
| **O7** | Alimentation | Scorante | État nutritionnel |
| **O13** | Fonctions intellectuelles | Scorante | Cognition |
| **N24** | Mémoire quotidienne | Scorante | Cognition |
| **E25** | Confusion jour/nuit | Scorante | Désorientation |
| **E26** | Désorientation spatiale | Scorante | Désorientation |
| **O4** | Humeur actuelle | Scorante | État psychique |
| **N11** | Douleurs chroniques | Scorante | Somatique |
| **N12** | Fatigue / énergie | Scorante | Somatique |
| **N13** | Troubles du sommeil | Scorante | Somatique |
| **N34** | Difficultés alimentaires | Scorante | Somatique |
| **O26** | Diminution de la taille | Scorante | Physique |
| **E32** | Difficulté lever/asseoir | Scorante | Mobilité |
| **E33** | Difficulté objets simples | Scorante | Préhension |
| **O6** | Chutes récentes | Scorante | Sécurité |

---

## 📈 Table de Scoring

### O7 — Alimentation

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Oui | 1 |
| Oui et dénutrition | 2 |

---

### O13 — Fonctions intellectuelles

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Diminution de certaines fonctions | 1 |
| Fonctions totalement altérées | 2 |

---

### N24 — Mémoire quotidienne

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### E25 — Confusion jour/nuit

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### E26 — Désorientation spatiale

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### O4 — Humeur actuelle

| Réponse | Score |
|---------|-------|
| Humeur normale | 0 |
| Parfois anxieuse ou triste | 1 |
| Déprimée | 2 |

---

### N11 — Douleurs chroniques

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Occasionnellement | 1 |
| Oui | 2 |

---

### N12 — Fatigue / énergie

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### N13 — Troubles du sommeil

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### N34 — Difficultés alimentaires

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### O26 — Diminution de la taille

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Oui | 2 |

---

### E32 — Difficulté lever/asseoir

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### E33 — Difficulté objets simples

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Parfois | 1 |
| Oui | 2 |

---

### O6 — Chutes récentes

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Oui, sans gravité | 1 |
| Oui avec complication / plusieurs chutes | 2 |

---

## 🎯 Seuils d'Alerte V2

| Score | Couleur | Lecture |
|-------|---------|---------|
| **0 – 6** | 🟢 Vert | Fragilité faible, autonomie globalement préservée |
| **7 – 13** | 🟠 Orange | Fragilisation installée, vigilance nécessaire |
| **14 – 20+** | 🔴 Rouge | Fragilité élevée, dépendance ou risques significatifs |

---

## ⚠️ Règles Legacy

1. **Score normalisé** : Sur 20 (même si max théorique = 28)
2. **Questions critiques directes** : Non incluses dans le score (traitement séparé)
3. **CCC** : Peuvent être activés indépendamment du score
