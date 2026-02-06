# 📅 Template: suivi.md

> **Source** : `SOURCES/legacy/Legacy suivi longitudinal 030226.docx` + `SOURCES/excel/Questionnaire de suivi validé.xlsx`  
> **Contenu** : Questions de suivi mensuel + indicateurs longitudinaux  
> **Usage** : Suivi dans le temps de l'évolution de la situation

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source: "Legacy suivi longitudinal + Excel suivi mensuel"
extraction_date: "YYYY-MM-DD"
frequency: "mensuel"
total_questions_suivi: {N}
```

---

## 📋 Questions de Suivi Mensuel

> Questions spécifiques au suivi (différentes des questions initiales)

```markdown
### {ID_suivi} - {Titre}

**Libellé** : {Question de suivi}
**Fréquence** : Mensuelle

**Options** :
| Code | Libellé | Évolution |
|------|---------|-----------|
| A | {Option amélioration} | ↗️ Amélioration |
| B | {Option stable} | ➡️ Stable |
| C | {Option dégradation} | ↘️ Dégradation |

**Lien question initiale** : {ID} (si applicable)
```

---

## 📈 Indicateurs Longitudinaux

> Métriques calculées dans le temps

```markdown
### IND_{X}_{N} - {Nom indicateur}

**Description** : {Ce que mesure l'indicateur}
**Calcul** : {Formule ou méthode}
**Seuils alertes** :
| Valeur | Alerte |
|--------|--------|
| < X | ✅ Normal |
| X-Y | ⚠️ Vigilance |
| > Y | 🔴 Alerte |

**Questions contributives** : {ID1}, {ID2}, ...
```

---

## 🔄 Comparaison Temporelle

```markdown
## Règles de comparaison

| Évolution | Condition | Action |
|-----------|-----------|--------|
| Amélioration | Score actuel < Score précédent | Renforcement positif |
| Stable | Score actuel = Score précédent | Continuité |
| Dégradation | Score actuel > Score précédent | Alerte + réévaluation |
```

---

## ⚠️ Règles (Legacy suivi longitudinal)

1. **Fréquence** : Suivi mensuel minimum
2. **Comparaison** : Toujours vs dernière évaluation
3. **Alertes** : Dégradation ≥ 2 points = alerte automatique
4. **Historique** : Conserver 12 derniers mois minimum

---

## 📋 Exemple V1

```markdown
### S_E2 - Évolution soutien mobilisable

**Libellé** : Depuis le mois dernier, comment a évolué votre réseau de soutien ?
**Fréquence** : Mensuelle

**Options** :
| Code | Libellé | Évolution |
|------|---------|-----------|
| A | Plus de personnes disponibles | ↗️ Amélioration |
| B | Pas de changement | ➡️ Stable |
| C | Moins de personnes disponibles | ↘️ Dégradation |

**Lien question initiale** : E2
```
