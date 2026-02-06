# 📊 Scoring V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (tables index 25, 26-31)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_scorantes: 8
score_max: 16
```

---

## 🔢 Questions Scorantes V4

| ID | Question | Type | Justification |
|----|----------|------|---------------|
| **N41** | ALD | Scorante | Protection sociale |
| **E36** | Errance diagnostique | Scorante | Retard parcours |
| **O24** | Difficultés accès soins | Scorante | Accessibilité |
| **E42** | Hospitalisations | Scorante | Épisodes aigus |
| **O48** | Addictions | Scorante | Facteur risque |
| **E54** | Organisation soins | Scorante | Lisibilité globale |
| **E57** | Plan de route | Scorante | Pilotage |
| **N18** | Proximité pro santé | Scorante | Point d'appui |

---

## 📈 Table de Scoring

### N41 — ALD

| Réponse | Score |
|---------|-------|
| Oui | 0 |
| Non | 3 |
| Je ne sais pas | 2 |

---

### E36 — Errance diagnostique

| Réponse | Score |
|---------|-------|
| Non, pas particulièrement | 0 |
| Oui, un peu | 1 |
| Oui, beaucoup | 2 |

---

### O24 — Difficultés accès soins

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Oui | 2 |

---

### E42 — Hospitalisations récentes

| Réponse | Score |
|---------|-------|
| Aucune | 0 |
| 1 fois | 1 |
| 2 fois ou plus | 2 |

---

### O48 — Addictions

| Réponse | Score |
|---------|-------|
| Non | 0 |
| Oui | 2 |

---

### E54 — Organisation globale soins

| Réponse | Score |
|---------|-------|
| Bien organisé | 0 |
| Moyennement | 1 |
| Mal organisé | 2 |

---

### E57 — Plan de route clair

| Réponse | Score |
|---------|-------|
| Oui | 0 |
| Partiellement | 1 |
| Non | 2 |

---

### N18 — Proximité pro santé

| Réponse | Score |
|---------|-------|
| Proche | 0 |
| Éloigné | 1 |
| Très éloigné | 2 |

---

## 🎯 Seuils d'Alerte V4

| Score | Couleur | Lecture |
|-------|---------|---------|
| **0 – 5** | 🟢 Vert | Parcours médical stable |
| **6 – 10** | 🟠 Orange | Parcours fragilisé |
| **11 – 16+** | 🔴 Rouge | Parcours désorganisé, intervention urgente |

---

## ⚠️ Règles Legacy

1. **Score sur 16** (8 questions × 2 max)
2. **CCC** : Activés indépendamment du score
3. **Addictions (O48)** : Priorité M4
