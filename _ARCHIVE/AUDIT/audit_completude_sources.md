# 🔎 Audit Complétude : SOURCES/extracted → QUESTIONNAIRE_V2

> **Date** : 2026-02-06  
> **Objectif** : Vérifier que toutes les données extraites sont bien transcrites dans les templates

---

## 📊 Résumé

| Vuln | Source (recommendations_complete.json) | Template (questions.md) | Manquantes | Complétude |
|------|---------------------------------------|------------------------|------------|------------|
| **V1** | 15 | 15 | **0** | ✅ 100% |
| **V2** | 57 | 28 | **29** | ⚠️ 49% |
| **V3** | 27 | 18 | **9** | ⚠️ 67% |
| **V4** | 36 | 18 | **19** | ⚠️ 50% |
| **V5** | 18 | 14 | **7** | ⚠️ 78% |
| **TOTAL** | **153** | **93** | **64** | ⚠️ 61% |

+ **15 questions triggers** non intégrées dans les templates  
= **~168 questions totales**, 93 transcrites, **75 à ajouter**

---

## 🔴 Questions Manquantes par Vulnérabilité

### V2 — Fragilité du Proche (29 manquantes)

```
E20, E22, E29, E30, E31, E32, E33
N14, N16, N18, N19, N30, N32, N36, N37, N38, N39, N40, N44
O3, O5, O11, O12, O15, O16, O22, O26, O51, O54
```

### V3 — Santé de l'Aidant (9 manquantes)

```
E17, E19
O37, O38, O39, O40, O41, O42, O43
```

### V4 — Parcours Médical (19 manquantes)

```
E38, E39, E41, E45, E48, E49, E50, E53, E55, E56, E58, E59, E60
O17, O18, O19, O20, O21, O59
```

> Note : **O48** est dans le template V4 mais pas dans la source V4 (crossover possible)

### V5 — Administrative (7 manquantes)

```
E63, E64, E65, E67
N5, N43, O61
```

> Note : **E21, O53, O54** sont dans le template V5 mais pas dans la source V5 (crossover V2)

---

## ⚡ Plan d'Action

### Phase 1 — Compléter les questions.md (64 questions)
Pour chaque question manquante, extraire depuis `recommendations_complete.json` :
- ID, Libellé, Type, Options (avec scores), Tags (scorante/déclenchante/critique/CCC)

### Phase 2 — Compléter les recommendations.md
Pour chaque question ajoutée, transcrire les recommendations associées

### Phase 3 — Vérifier les CCC et déclencheurs
S'assurer que les CCC et déclencheurs référencent correctement les nouvelles questions

### Phase 4 — Régénérer les JSON
Relancer `generate_json_v3.py` et vérifier les totaux

---

## 📂 Fichiers Sources Pertinents

| Fichier | Contenu |
|---------|---------|
| `recommendations_complete.json` | 153 questions avec recommendations par V |
| `Questionnaire_validé.xlsx_extracted.json` | Questionnaire brut avec 166 rows + 16 triggers |
| `Tableau_SOPHIE_CAT_...xlsx_extracted.json` | Questions par vulnérabilité avec sheets séparées |
| `microparcours_complete.json` | Mapping MP complet |
| `legacy_complete.json` | Documents Legacy ASR, Arborescence, CR Médecin |
