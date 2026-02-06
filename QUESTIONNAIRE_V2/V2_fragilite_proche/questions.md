# 📝 Questions V2 — Fragilité du Proche

> **Source** : `SOURCES/extracted/Questionnaire_validé.xlsx_extracted.json` + `recommendations_complete.json`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
bloc: "Bloc 5 – Vie quotidienne et fragilités de votre proche"
source: "Questionnaire_validé.xlsx_extracted.json"
extraction_date: "2026-02-06"
total_questions: 57
```

---

## 🗂️ Structure des Questions

### Section 5.1 — Vie quotidienne, budget et entourage du proche

---

#### O2 — Lieu de vie actuel

**Libellé** : Où vit la personne aidée aujourd'hui ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | À son domicile | 1 |
| 2 | À mon domicile | 3 |
| 3 | En établissement | 4 |

---

#### N31 — Établissement spécialisé

**Libellé** : La personne aidée bénéficie-t-elle d'une prise en charge en établissement spécialisé ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Aucune prise en charge | 3 |
| 2 | IME, ITEP, IEM, EEAP | 1 |
| 3 | SAVS, SAMSAH | 1 |
| 4 | Centres de rééducation fonctionnelle | 1 |
| 5 | Institut déficients visuels/auditifs | 1 |
| 6 | FAM, MAS, foyer de vie/hébergement | 1 |
| 7 | ESAT | 1 |
| 8 | Unités personnes handicapées vieillissantes | 1 |
| 9 | EHPAD | 1 |
| 10 | Résidence Services/Autonomie | 1 |
| 11 | USLD | 1 |
| 12 | CRT | 1 |
| 13 | Accueil de jour / hôpital de jour | 1 |

---

#### N10 — Nature de l'aide apportée

**Libellé** : Quelle est la nature de l'aide que vous apportez ?

**Type** : Obligatoire / Choix Multiples

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Tâches de la vie quotidienne (ménage, repas, habillage...) | 1 |
| 2 | Gestion administrative et budgétaire | 1 |
| 3 | Soutien moral, présence ou compagnie | 1 |
| 4 | Accompagnement à des rendez-vous | 1 |
| 5 | Autre | 0 |

---

#### N9 — Gestion budget

**Libellé** : La personne aidée rencontre-t-elle des problèmes pour gérer son budget ou ses affaires administratives ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Non | 0 | ✅ |
| 2 | Elle se fait aider | 2 | ⚠️ |
| 3 | Oui | 3 | 🔴 |

---

#### N21 — Problèmes financiers

**Libellé** : Rencontre-t-elle des problèmes financiers ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Non | 0 | ✅ |
| 2 | Parfois | 1 | ⚠️ |
| 3 | Oui | 3 | 🔴 |

---

#### N23 — Activité professionnelle/scolaire

**Libellé** : La personne aidée a-t-elle des difficultés à maintenir une activité professionnelle, occupationnelle ou scolaire ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 2 |
| 3 | Oui | 3 |

---

#### N27 — Isolement social

**Libellé** : Estimez-vous que la personne aidée est socialement isolée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Pas du tout | 0 | ✅ |
| 2 | Un peu | 1 | ⚠️ |
| 3 | Beaucoup | 3 | 🔴 |
| 4 | Totalement | 4 | 🔴 Critique |

---

### Section 5.2 — Mémoire, comportement et sécurité

---

#### O13 — Fonctions intellectuelles

**Libellé** : Avez-vous constaté une diminution de ses fonctions intellectuelles ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Diminution de certaines fonctions | 1 |
| 3 | Fonctions totalement altérées | 2 |

**⚠️ Scorante + CCC F3**

---

#### N24 — Problèmes de mémoire

**Libellé** : A-t-elle des problèmes de mémoire au quotidien ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 1 |
| 3 | Oui | 2 |

---

#### E25 — Confusion jour/nuit

**Libellé** : A-t-elle des confusions jour/nuit ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 1 |
| 3 | Oui | 2 |

**⚠️ Scorante + CCC F3**

---

#### E26 — Désorientation spatiale

**Libellé** : A-t-elle des épisodes de désorientation spatiale ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 1 |
| 3 | Oui | 2 |

**⚠️ Scorante + CCC F3**

---

#### E27 — Comportements dangereux

**Libellé** : A-t-elle des comportements dangereux pour elle-même ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 1 |
| 3 | Oui | 2 |

**⚠️ Critique directe**

---

#### N22 — Comportements à risque

**Libellé** : A-t-elle des comportements à risque ?

**Type** : Obligatoire / Choix Unique

**⚠️ Critique directe**

---

#### N25 — Idées suicidaires

**Libellé** : A-t-elle exprimé des idées suicidaires ?

**Type** : Obligatoire / Choix Unique

**⚠️ Critique directe — Priorité niveau 1**

---

### Section 5.3 — Santé physique du proche

---

#### O7 — Alimentation

**Libellé** : Avez-vous constaté des changements dans la manière dont elle se nourrit ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Oui | 1 |
| 3 | Oui, et elle est dénutrie | 2 |

**⚠️ Scorante**

---

#### N11 — Douleurs chroniques

**Libellé** : Souffre-t-elle de douleurs chroniques ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Occasionnellement | 1 |
| 3 | Oui | 2 |

**⚠️ Scorante + CCC F4**

---

#### N12 — Fatigue / manque d'énergie

**Libellé** : Présente-t-elle une fatigue ou un manque d'énergie ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 1 |
| 3 | Oui | 2 |

**⚠️ Scorante + CCC F4**

---

#### N13 — Troubles du sommeil

**Libellé** : A-t-elle des troubles du sommeil ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 1 |
| 3 | Oui | 2 |

**⚠️ Scorante + CCC F4**

---

#### N34 — Difficultés alimentaires

**Libellé** : A-t-elle des difficultés à s'alimenter ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Parfois | 1 |
| 3 | Oui | 2 |

**⚠️ Scorante + CCC F4**

---

#### O4 — Humeur actuelle

**Libellé** : Quel est l'état de son humeur actuelle ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Humeur normale | 0 |
| 2 | Parfois anxieuse ou triste | 1 |
| 3 | Déprimée | 2 |

**⚠️ Scorante + CCC F4**

---

#### O6 — Chutes récentes

**Libellé** : A-t-elle fait des chutes récemment ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non | 0 |
| 2 | Oui, sans gravité | 1 |
| 3 | Oui, avec complication/plusieurs chutes | 2 |

**⚠️ Scorante**

---

### Section 5.4 — Autonomie et aide nécessaire

---

#### E21 — Maintien situation de vie

**Libellé** : Pensez-vous que la situation de vie actuelle peut être maintenue sans changement ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui, tout à fait |
| 2 | Oui, mais avec des aménagements |
| 3 | Non, un changement sera nécessaire |
| 4 | Je ne sais pas |

**⚠️ Déclenchante + CCC F1**

---

#### E23 — Temps possible seul

**Libellé** : Combien de temps la personne peut-elle rester seule ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Toute la journée |
| 2 | Quelques heures |
| 3 | Pas plus d'1 heure |
| 4 | Ne peut pas rester seule |

**⚠️ Déclenchante + CCC F2**

---

#### E24 — Présence la nuit

**Libellé** : A-t-elle besoin d'une présence la nuit ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois (surveillance) |
| 3 | Oui (accompagnement régulier) |

**⚠️ Déclenchante + CCC F2**

---

#### O8 — Aide déplacements extérieurs

**Libellé** : A-t-elle besoin d'aide pour les déplacements extérieurs ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui, tout le temps |

**⚠️ Déclenchante + CCC F2**

---

#### O9 — Aide déplacements intérieurs

**Libellé** : A-t-elle besoin d'aide pour les déplacements intérieurs ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui, tout le temps |

**⚠️ Déclenchante + CCC F2**

---

### Section 5.5 — Hospitalisations et dépendance

---

#### E28 — Hospitalisations récentes

**Libellé** : Combien d'hospitalisations non programmées ces 12 derniers mois ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Aucune |
| 2 | 1 fois |
| 3 | 2 fois ou plus |

**⚠️ Déclenchante + CCC F5**

---

#### O53 — Évaluation AGGIR

**Libellé** : L'évaluation AGGIR a-t-elle été faite ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |
| 3 | Je ne sais pas |

**⚠️ CCC F5**

---

## ⚠️ Règles Legacy

1. **Questions critiques directes** : E27, N22, N25, N38, N39 → Priorité niveau 1
2. **CCC F1** : E21 + (N21 | N9) → Fragilité vie quotidienne
3. **CCC F2** : E23 + E24 + O8 + O9 → Dépendance fonctionnelle
4. **CCC F3** : O13 + (E25 | E26) → Désorganisation cognitive
5. **CCC F4** : N11 + N12 + N13 + N34 + O4 → Dégradation somato-psychique
6. **CCC F5** : E28 + O53 → Instabilité médico-sociale
