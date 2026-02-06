# 📊 Scoring V5 — Administrative

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (tables index 6, 10-11)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_scorantes: 3
score_max: 6
```

---

## 🔢 Questions Scorantes V5

| ID | Question | Type | Justification |
|----|----------|------|---------------|
| **E66** | Complexité perçue | Scorante | Charge mentale |
| **E69** | Maîtrise numérique | Scorante | Accessibilité |
| **E70** | Retards démarches | Scorante | Signal désorganisation |

---

## 📈 Table de Scoring

### E66 — Complexité perçue

| Réponse | Score |
|---------|-------|
| Pas du tout | 0 |
| Un peu | 1 |
| Oui | 2 |

---

### E69 — Maîtrise numérique

| Réponse | Score |
|---------|-------|
| Oui, tout à fait | 0 |
| Oui, mais lent/chronophage | 1 |
| Non, souvent perdu·e | 2 |
| Pas d'accès numérique | 2 |

---

### E70 — Retards démarches

| Réponse | Score |
|---------|-------|
| Non, jamais | 0 |
| Parfois | 1 |
| Souvent / toujours en retard | 2 |
| Je ne sais pas | 1 |

---

## 🎯 Seuils d'Alerte V5

| Score | Couleur | Lecture |
|-------|---------|---------|
| **0 – 2** | 🟢 Vert | Démarches maîtrisées |
| **3 – 4** | 🟠 Orange | Charge administrative notable |
| **5 – 6** | 🔴 Rouge | Saturation administrative avérée |

---

## ⚠️ Règles Legacy

1. **Score sur 6** (3 questions × 2 max)
2. **CCC** : Activés indépendamment du score (E68 temps démarches)
3. **E68 > 5h** : Charge critique même si score faible
