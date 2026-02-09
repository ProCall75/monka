# 📊 Template: scoring.md

> **Source** : `SOURCES/legacy/Typologie,CCC et scoring.docx`  
> **Contenu** : Règles de scoring par question et vulnérabilité  
> **Pas de** : Priorisation (→ declencheurs.md), recommendations

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source: "Legacy scoring 060226"
extraction_date: "YYYY-MM-DD"
score_max: {N}
questions_scorantes: {N}
```

---

## 📋 Format par Question Scorante

```markdown
### {ID} - Scoring

| Option | Score | Pondération |
|--------|-------|-------------|
| {Option A} | 0 | x1 |
| {Option B} | 1 | x1 |
| {Option C} | 2 | x1 |

**Score max** : {N}
**Type** : Scorante
```

---

## 📈 Calcul Score Vulnérabilité

```markdown
## Formule V{X}

Score V{X} = Σ (score_question × pondération)

### Seuils d'interprétation (Legacy)

| Score /20 | Couleur | Lecture |
|-----------|---------|----------------|
| 0-6 | 🟢 Vert | Situation stable |
| 7-13 | 🟠 Orange | Vigilance |
| 14-20 | 🔴 Rouge | Fragilité significative |
```

---

## ⚙️ Formule de normalisation

```
Score V{X} = (Score brut / Score brut max) × 20
```

| Vulnérabilité | Questions scorantes | Score brut max |
|--------------|---------------------|----------------|
| V1 Sociale | 8 | 16 |
| V2 Admin | 3 | 6 |
| V3 Santé | 9 | 18 |
| V4 Fragilité | À extraire | - |
| V5 Parcours | À extraire | - |

---

## ⚠️ Règles (Typologie,CCC et scoring.docx)

1. **Le scoring mesure une intensité** (pas un diagnostic)
2. **Le score ne déclenche JAMAIS** un micro-parcours seul
3. **Le score ne module JAMAIS** une gravité intrinsèque (question critique)
4. **Indépendance** : Scoring ≠ Criticité directe

---

## 📋 Exemple V1

```markdown
### E2 - Scoring

| Option | Score | Pondération |
|--------|-------|-------------|
| Oui, plusieurs personnes | 0 | x1 |
| Oui, une personne | 1 | x1 |
| Très peu / personne | 2 | x1 |

**Score max** : 2
**Type** : Scorante

> ⚠️ Cette question est AUSSI critique directe (voir ccc.md)
> Le scoring et la criticité sont INDÉPENDANTS
```
