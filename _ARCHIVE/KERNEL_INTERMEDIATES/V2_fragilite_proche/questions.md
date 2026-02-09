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



### Questions additionnelles (complément source)

---

### 5.1 – Vie quotidienne, budget et entourage du proche

---

#### E20 — Si vous pensez aux 6–12 prochains mois, où souhaiteriez-v...

**Libellé** : Si vous pensez aux 6–12 prochains mois, où souhaiteriez-vous idéalement que vive votre proche ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | À son domicile actuel |
| 2 | À mon domicile |
| 3 | En établissement (EHPAD, résidence, foyer…) |
| 4 | Je ne sais pas / nous n’en avons pas parlé |

---

### 5.2 – Autonomie, aide humaine et présence nécessaire

---

#### E22 — Globalement, combien d’heures d’aide humaine (aide à domi...

**Libellé** : Globalement, combien d’heures d’aide humaine (aide à domicile, infirmier·e, etc.) votre proche reçoit-il par semaine ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Moins de 5 heures |
| 2 | Entre 5 et 14 heures |
| 3 | 15 à 30 heures |
| 4 | Plus de 30 heures |
| 5 | Je ne sais pas |

---

### 5.3 – Mémoire, comportement et risques pour soi ou pour les autres

---

#### N19 — Ressentez-vous souvent des changements d'humeur ou de com...

**Libellé** : Ressentez-vous souvent des changements d'humeur ou de comportement chez elle ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Jamais |
| 2 | Parfois |
| 3 | Souvent |

---

### 5.4 – Douleur, fatigue, sommeil et état général du proche

---

#### O5 — Selon vous et par rapport à une personne du même âge, dir...

**Libellé** : Selon vous et par rapport à une personne du même âge, diriez-vous que la personne aidée est :

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | En meilleure santé |
| 2 | Santé équivalente |
| 3 | En moins bonne santé |

---

#### N44 — Avez-vous constaté un changement de poids

**Libellé** : Avez-vous constaté un changement de poids ?

**Type** : Obligatoire / Choix Unique / conditionnel N3 (réponse 1,2,

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Oui |

---

#### O3 — Combien de médicaments différents prend-elle chaque jour

**Libellé** : Combien de médicaments différents prend-elle chaque jour ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Elle ne prend pas de traitement actuellement |
| 2 | 1 à 3 médicaments |
| 3 | 4 à 6 médicaments |
| 4 | 7 médicament et plus |

---

#### O15 — La personne aidée consomme-t-elle de manière habituelle :...

**Libellé** : La personne aidée consomme-t-elle de manière habituelle :  (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multipples

| Code | Libellé |
|------|---------|
| 1 | Alcool (plus de 3 verres par jour) |
| 2 | Tabac |
| 3 | Aucun des deux |

---

#### O26 — Avez-vous constaté une diminution de sa taille habituelle

**Libellé** : Avez-vous constaté une diminution de sa taille habituelle ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Oui | 0 |
| 2 | Non | 2 |

---

#### O22 — Quels ont été les principaux constats suite aux derniers ...

**Libellé** : Quels ont été les principaux constats suite aux derniers examens de vue et d'audition ?

**Type** : Obligatoire / Choix multiples

| Code | Libellé |
|------|---------|
| 1 | Correct |
| 2 | Correct avec le port de lunettes ou de lentilles |
| 3 | Correct avec appareillage auditif |
| 4 | Mauvais malgré le port de lunettes ou de lentilles |
| 5 | Mauvais malgré l'appareillage auditif |
| 6 | Je ne sais pas |

---

### 5.5 – Niveau de dépendance, handicap reconnu et épisodes aigus

---

#### O54 — Quel est son niveau de dépendance selon cette grille AGGIR

**Libellé** : Quel est son niveau de dépendance selon cette grille AGGIR ?

**Type** : Obligatoire / Choix Unique / Contionnel O53(1)

| Code | Libellé |
|------|---------|
| 1 | 1/2/3/4/5/6/Je ne sais pas |

---

#### N16 — Quelle est l'origine du handicap de la personne aidée

**Libellé** : Quelle est l'origine du handicap de la personne aidée ?

**Type** : Obligatoire / Choix Unique Conditionnel N3 réponse 2

| Code | Libellé |
|------|---------|
| 1 | Situation de handicap depuis la naissance |
| 2 | Situation de handicap suite à une maladie |
| 3 | Situation de handicap suite à un accident |

---

#### N30 — Quel est le taux d'incapacité reconnu

**Libellé** : Quel est le taux d'incapacité reconnu ?

**Type** : Obligatoire / Choix Unique Conditionnel N3 réponse 2

| Code | Libellé |
|------|---------|
| 1 | Inférieur à 50% |
| 2 | Compris entre 50% et 79% |
| 3 | Supérieur ou égal à 80% |
| 4 | Je ne sais pas |

---

#### N37 — Quel type d'addiction la personne aidée présente-t-elle

**Libellé** : Quel type d'addiction la personne aidée présente-t-elle ?  (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples / conditionnel N3 (5)

| Code | Libellé |
|------|---------|
| 1 | Alcool |
| 2 | Tabac |
| 3 | Produits stupéfiants |
| 4 | Médicaments |
| 5 | Jeux d'argent |
| 6 | Jeux vidéo |
| 7 | Autre |

---

#### N38 — La personne aidée a-t-elle des difficultés à contrôler sa...

**Libellé** : La personne aidée a-t-elle des difficultés à contrôler sa consommation ou son comportement addictif ?

**Type** : Obligatoire / Choix Unique / conditionnel N3 (5)

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

#### N39 — Observez-vous, chez la personne aidée, des problèmes de s...

**Libellé** : Observez-vous, chez la personne aidée, des problèmes de santé physique liés à l'addiction ?

**Type** : Obligatoire / Choix Unique / conditionnel N3 (5)

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Je ne sais pas |
| 3 | Oui |

---

#### N40 — La personne aidée a-t-elle déjà tenté de se sevrer ou de ...

**Libellé** : La personne aidée a-t-elle déjà tenté de se sevrer ou de suivre un traitement pour son addiction ?

**Type** : Obligatoire / Choix Unique / conditionnel N3 (5)

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Je ne sais pas |
| 3 | Oui |

---

#### E29 — Parmi ces hospitalisations, combien étaient programmées (...

**Libellé** : Parmi ces hospitalisations, combien étaient programmées (prévue à l’avance) ?

**Type** : Obligatoire / Choix Unique / conditionnel EXX (tout sauf 1 ou 6)

| Code | Libellé |
|------|---------|
| 1 | 0 / 1 / 2 / 3 / 4 ou plus / Je ne sais pas |

---

#### E30 — Parmi les hospitalisations non programmées, combien ont c...

**Libellé** : Parmi les hospitalisations non programmées, combien ont commencé par un passage aux urgences ?

**Type** : Obligatoire / Choix Unique / conditionnel EXX (1 ou6)

| Code | Libellé |
|------|---------|
| 1 | 0 / 1 / 2 / 3 / 4 ou plus / Je ne sais pas |

---

#### E31 — Quelle a été la durée de la dernière hospitalisation (la ...

**Libellé** : Quelle a été la durée de la dernière hospitalisation (la plus récente) ?

**Type** : Obligatoire / Choix Unique / condtionnel EXX1 (tout sauf 1 ou 6)

| Code | Libellé |
|------|---------|
| 1 | Moins d’une journée / 1 à 3 jours / 4 à 7 jours / Plus de 7 jours / Je ne sais pas |

---

### 5.x – Autres éléments sur les fragilités du proche

---

#### N18 — La personne aidée peut-elle réaliser seule ses activités ...

**Libellé** : La personne aidée peut-elle réaliser seule ses activités de la vie quotidienne (toilette, habillage, préparations des repas) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non elle a besoin d'aide |

---

#### E32 — A-t-elle des difficultés à se lever d’un lit, s’asseoir o...

**Libellé** : A-t-elle des difficultés à se lever d’un lit, s’asseoir ou se lever d’un fauteuil sans aide ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

#### O12 — Peut-elle se nourrir par elle-même

**Libellé** : Peut-elle se nourrir par elle-même ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Parfois |
| 3 | Non |

---

#### O11 — Est-elle incontinente

**Libellé** : Est-elle incontinente ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

#### E33 — A-t-elle des difficultés à utiliser le téléphone ou des a...

**Libellé** : A-t-elle des difficultés à utiliser le téléphone ou des appareils simples (télécommande, micro-ondes, sonnette) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

#### N32 — Y-a-t-il des aides techniques en place

**Libellé** : Y-a-t-il des aides techniques en place ?  (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Aucune |
| 2 | Aides à la mobilité (fauteuil roulant, prothèse, canne,…) |
| 3 | Aides à la communication (synthèse vocale, tablette, amplificateur de voix,…) |
| 4 | Aides aux soins personnels (lève-personne, siège de douche, barres d'appui, lit médicalisé) |
| 5 | Aides sensorielles (appareil auditif, lunettes adaptées, système de guidage pour malvoyants) |
| 6 | Aides à l'aménagement du domicile (rampes d'accès, monte escalier, portes élargies) |
| 7 | Aides technologiques (commande à distance, domotique, ordinateur adapté) |
| 8 | Aides à l'apprentissage et à la cognition (logiciels spécialisés, agendas électroniques) |

---

#### N14 — La personne aidée éprouve-t-elle des difficultés à suivre...

**Libellé** : La personne aidée éprouve-t-elle des difficultés à suivre son traitement médical ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

#### O16 — La personne aidée est-elle ou a-t-elle été concernée par ...

**Libellé** : La personne aidée est-elle ou a-t-elle été concernée par : (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Troubles neurologiques (accident vasculaire cérébral, épilepsie, maladie neuro-dégénérative, Troubles du déficit de l'attention avec ou sans hyperactivité TDAH…) |
| 2 | Troubles psychiques (dépression, anxiété, troubles bi-polaires, schizophrénie...) |
| 3 | Dermatologique (dermatite atopique, psoriasis, acné…) |
| 4 | Respiratoire (asthme, maladie pulmonaire obstructive chronique…) |
| 5 | Génito-urinaire (infections urinaires à répétition, hypertrophie benigne de la prostate, endométriose…) |
| 6 | Endocrinienne (hyper ou hypo thyroidie, obésité sévère…) |
| 7 | Cancer (cancer du sein, prostate, colo-rectal, poumon, mélanome…) |
| 8 | Métabolique (diabète, cholesterol…) |
| 9 | Maladie cardiovaculaire (insuffisance cardiaque, hypertension artérielle, artériopathie…) |
| 10 | Musculo-squelettique (arthrose, lombalgie, cervicalgie, ostéoporose…) |
| 11 | Gastro-intestinale (reflux gastro oesophagien, maladie inflammatoire chronique des intestins, hépatopathie…) |
| 12 | Maladie génétique (muchovicidose, trisomie…) |
| 13 | Troubles visuels sévères (DMLA, cécité…) |
| 14 | Troubles auditifs sévères |
| 15 | Aucun |
| 16 | Je ne sais pas |

---

#### N36 — A-t-elle besoin d'aide pour organiser et planifier ses jo...

**Libellé** : A-t-elle besoin d'aide pour organiser et planifier ses journées ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

#### O51 — Songez-vous à adapter son lieu de vie son quotidien

**Libellé** : Songez-vous à adapter son lieu de vie son quotidien?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

## ⚠️ Règles Legacy

1. **Questions critiques directes** : E27, N22, N25, N38, N39 → Priorité niveau 1
2. **CCC F1** : E21 + (N21 | N9) → Fragilité vie quotidienne
3. **CCC F2** : E23 + E24 + O8 + O9 → Dépendance fonctionnelle
4. **CCC F3** : O13 + (E25 | E26) → Désorganisation cognitive
5. **CCC F4** : N11 + N12 + N13 + N34 + O4 → Dégradation somato-psychique
6. **CCC F5** : E28 + O53 → Instabilité médico-sociale
