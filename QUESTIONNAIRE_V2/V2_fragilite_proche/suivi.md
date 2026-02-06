# 📅 Suivi V2 — Fragilité du Proche

> **Source** : `SOURCES/extracted/Questionnaire_Etienne_1258-1_suivi_mensuel_raw.json` (Bloc 5)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "Questionnaire suivi mensuel - Bloc 5"
extraction_date: "2026-02-06"
frequency: "mensuel"
total_questions_suivi: 55
trigger_condition: "S005=Oui (Changements fragilité proche)"
```

---

## 🎯 Déclencheur Bloc Suivi V2

**Question gate** : S005

**Libellé** : Depuis le dernier suivi, y a-t-il eu des changements concernant : La fragilité de votre proche ?

**Options** : Oui | Non

**Si Oui → Déclenche les questions ci-dessous par sous-bloc**

---

## 📋 Questions de Suivi Mensuel V2

### Sous-bloc 5.1 — Vie quotidienne, budget et entourage

---

#### N10 — Nature de l'aide apportée

**Libellé** : Quelle est la nature de l'aide que vous apportez ?

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Tâches de la vie quotidienne (ménage, repas, habillage...) |
| 2 | Gestion administrative et budgétaire |
| 3 | Soutien moral, présence ou compagnie |
| 4 | Accompagnement à des rendez-vous |
| 5 | Autre |

---

#### N9 — Gestion budget

**Libellé** : La personne aidée rencontre-t-elle des problèmes pour gérer son budget ou ses affaires administratives ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Elle se fait aider | ⚠️ |
| 3 | Oui | 🔴 CCC F1 |

---

#### N21 — Problèmes financiers

**Libellé** : Rencontre-t-elle des problèmes financiers ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Parfois | ⚠️ |
| 3 | Oui | 🔴 CCC F1 |

---

#### N23 — Activité professionnelle/scolaire

**Libellé** : La personne aidée a-t-elle des difficultés à maintenir une activité professionnelle, occupationnelle ou scolaire ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

#### N27 — Isolement social

**Libellé** : Estimez-vous que la personne aidée est socialement isolée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Pas du tout | ✅ |
| 2 | Un peu | ⚠️ |
| 3 | Beaucoup | 🔴 |
| 4 | Totalement | 🔴 Critique |

---

#### E21 — Maintien situation de vie

**Libellé** : Pensez-vous qu'il sera possible de maintenir cette situation de vie sans changement majeur ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, probablement | ✅ |
| 2 | Oui, mais difficile | ⚠️ |
| 3 | Non, un changement sera nécessaire | 🔴 CCC F1 |
| 4 | Je ne sais pas | ⚠️ |

---

### Sous-bloc 5.2 — Autonomie, aide humaine et présence

---

#### E22 — Heures d'aide humaine

**Libellé** : Combien d'heures d'aide humaine votre proche reçoit-il par semaine ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Moins de 5 heures |
| 2 | Entre 5 et 14 heures |
| 3 | 15 à 30 heures |
| 4 | Plus de 30 heures |
| 5 | Je ne sais pas |

---

#### O8 — Aide déplacements extérieurs

**Libellé** : A-t-elle besoin d'une aide humaine pour se déplacer en dehors de son domicile ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non, elle est indépendante | ✅ |
| 2 | Oui, de temps en temps | ⚠️ |
| 3 | Oui, tout le temps | 🔴 CCC F2 |

---

#### O9 — Aide déplacements intérieurs

**Libellé** : A-t-elle besoin d'une aide humaine pour se déplacer à l'intérieur de son domicile ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui, de temps en temps | ⚠️ |
| 3 | Oui, tout le temps | 🔴 CCC F2 |

---

#### E23 — Temps possible seul

**Libellé** : Combien de temps la personne peut-elle rester seule ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Toute la journée | ✅ |
| 2 | Quelques heures | ⚠️ |
| 3 | Pas plus d'1 heure | 🔴 CCC F2 |
| 4 | Ne peut pas rester seule | 🔴 CCC F2 |

---

#### E24 — Présence la nuit

**Libellé** : A-t-elle besoin d'une présence la nuit ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Parfois (surveillance) | ⚠️ |
| 3 | Oui (accompagnement régulier) | 🔴 CCC F2 |

---

### Sous-bloc 5.3 — Mémoire, comportement et sécurité

---

#### O13 — Fonctions intellectuelles

**Libellé** : Avez-vous constaté une diminution de ses fonctions intellectuelles ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Diminution de certaines fonctions | ⚠️ |
| 3 | Fonctions totalement altérées | 🔴 CCC F3 |

---

#### E25 — Confusion jour/nuit

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Parfois | ⚠️ |
| 3 | Oui | 🔴 CCC F3 |

---

#### E26 — Désorientation spatiale

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Parfois | ⚠️ |
| 3 | Oui | 🔴 CCC F3 |

---

### Sous-bloc 5.4 — Douleur, fatigue, sommeil, état général

---

#### N11 — Douleurs chroniques

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Occasionnellement | ⚠️ |
| 3 | Oui | 🔴 CCC F4 |

---

#### N12 — Fatigue / énergie

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Parfois | ⚠️ |
| 3 | Oui | 🔴 CCC F4 |

---

#### N13 — Troubles du sommeil

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Parfois | ⚠️ |
| 3 | Oui | 🔴 CCC F4 |

---

#### O4 — Humeur actuelle

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Humeur normale | ✅ |
| 2 | Parfois anxieuse ou triste | ⚠️ |
| 3 | Déprimée | 🔴 CCC F4 |

---

## 📈 Indicateurs Longitudinaux V2

| Indicateur | Questions | Alerte |
|------------|-----------|--------|
| IND_V2_autonomie | E23 + E24 + O8 + O9 | ≥2 rouges → 🔴 Dépendance critique (CCC F2) |
| IND_V2_cognitif | O13 + E25 + E26 | O13=3 ET (E25=3 OU E26=3) → 🔴 Désorganisation cognitive (CCC F3) |
| IND_V2_somatique | N11 + N12 + N13 + O4 | ≥2 rouges → 🔴 Dégradation (CCC F4) |
| IND_V2_vie_quotid | E21 + N21 + N9 | E21=3 ET (N21=3 OU N9=3) → 🔴 Vie non tenable (CCC F1) |

---

## ⚠️ Règles Legacy

1. **Fréquence** : Suivi mensuel
2. **Gate question** : S005 = Oui pour déclencher le bloc V2
3. **CCC prioritaires** : F2 (dépendance) et F3 (cognitif) → alertes immédiates
4. **Critiques directes** : E27, N22, N25 → traitement séparé
