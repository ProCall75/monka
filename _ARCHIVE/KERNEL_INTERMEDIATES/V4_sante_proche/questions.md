# 📝 Questions V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/Questionnaire_validé.xlsx_extracted.json` + `recommendations_complete.json`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
bloc: "Bloc 4 – Situation de santé de votre proche"
source: "recommendations_complete.json"
extraction_date: "2026-02-06"
total_questions: 37
```

---

## 🗂️ Structure des Questions

### Section 4.1 — Diagnostic et maladie

---

#### N17 — Type de handicap

**Libellé** : Quel est son type de handicap ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiple

| Code | Libellé |
|------|---------|
| 1 | Handicap cognitif |
| 2 | Handicap psychique |
| 3 | Handicap visuel |
| 4 | Handicap auditif |
| 5 | Handicap intellectuel |
| 6 | Handicap moteur |
| 7 | Traumatisme crânien |
| 8 | Autisme ou troubles envahissant du développement |
| 9 | Troubles majeurs du comportement |
| 10 | Maladie invalidante |

---

#### N41 — ALD (Affection Longue Durée)

**Libellé** : Bénéficie-t-elle d'une reconnaissance officielle ALD ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Oui | 0 | ✅ |
| 2 | Non | 3 | 🔴 Action |
| 3 | Je ne sais pas | 2 | ⚠️ |

**⚠️ Scorante**

---

#### E34 — Compréhension maladie

**Libellé** : Comprenez-vous bien la maladie, l'état de santé et les besoins médicaux de votre proche ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Pas du tout | 🔴 |

---

#### E35 — Clarté du diagnostic

**Libellé** : Avez-vous l'impression que le diagnostic de votre proche est clair et bien établi ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, le diagnostic est clair | ✅ |
| 2 | Plusieurs hypothèses, rien de tranché | ⚠️ |
| 3 | Non, pas de diagnostic donné | 🔴 CCC M1 |
| 4 | Je ne sais pas | ⚠️ |

**⚠️ CCC M1**

---

#### E36 — Errance diagnostique

**Libellé** : Avez-vous consulté beaucoup de professionnels ou fait beaucoup d'examens sans clarification ?

| Code | Libellé | ⚠️ | Score |
|------|---------|-----|-------|
| 1 | Non, pas particulièrement | ✅ | 0 |
| 2 | Oui, un peu | ⚠️ | 1 |
| 3 | Oui, beaucoup | 🔴 CCC M1 | 2 |

**⚠️ Scorante + CCC M1**

---

#### E37 — Changements de traitement

**Libellé** : Les traitements de votre proche changent-ils souvent ?

| Code | Libellé | ⚠️ | Score |
|------|---------|-----|-------|
| 1 | Non, ils sont stables | ✅ | 0 |
| 2 | Oui, parfois | ⚠️ | 1 |
| 3 | Oui, souvent | 🔴 CCC M1 | 2 |

**⚠️ CCC M1**

---

### Section 4.2 — Accès aux soins

---

#### O24 — Difficultés accès soins

**Libellé** : Rencontrez-vous des difficultés pour accéder aux soins pour votre proche ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 CCC M2 |

**⚠️ Scorante + CCC M2**

---

#### E40 — Type de difficultés

**Libellé** : Si oui, quelles difficultés ? (conditionnel)

| Code | Libellé |
|------|---------|
| 1 | Délais de RDV |
| 2 | Distance |
| 3 | Coût |
| 4 | Trouver le bon spécialiste |
| 5 | Je ne rencontre pas de difficultés particulières |

**⚠️ CCC M2**

---

### Section 4.3 — Urgences et hospitalisations

---

#### E42 — Hospitalisations récentes

**Libellé** : Combien de fois votre proche a-t-il été hospitalisé ces 12 derniers mois ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 0 | Aucune | ✅ |
| 1 | 1 fois | ⚠️ |
| 2 | 2 fois ou plus | 🔴 CCC M3 |

**⚠️ Scorante + CCC M3**

---

#### E43 — Ruptures de suivi

**Libellé** : Y a-t-il eu des périodes sans suivi médical régulier ?

| Code | Libellé | ⚠️ | Score |
|------|---------|-----|-------|
| 1 | Non | ✅ | 0 |
| 2 | Oui, courtes périodes | ⚠️ | 1 |
| 3 | Oui, plusieurs périodes ou plus de 6 mois | 🔴 CCC M3 | 2 |

**⚠️ CCC M3**

---

#### E44 — PAP établi

**Libellé** : Un protocole d'accueil d'urgence (PAP) a-t-il été établi ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Non, jamais | 🔴 CCC M3 |

**⚠️ CCC M3**

---

### Section 4.4 — Troubles psychiques et addictions

---

#### E46 — Troubles psychiques

**Libellé** : Votre proche a-t-il des troubles psychiques ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 Déclenchante M4 |

**⚠️ Déclenchante**

---

#### E47 — Suivi psy actuel

**Libellé** : Est-il suivi par un professionnel de santé mentale ?

| Code | Libellé | ⚠️ | Score |
|------|---------|-----|-------|
| 1 | Oui, régulièrement | ✅ | 0 |
| 2 | Oui, parfois | ⚠️ | 1 |
| 3 | Non | 🔴 CCC M4 | 2 |

**⚠️ CCC M4**

---

#### O48 — Addictions

**Libellé** : Votre proche a-t-il des problèmes d'addiction ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 Déclenchante M4 |

**⚠️ Déclenchante**

---

#### E51 — Volonté aide addiction

**Libellé** : Souhaite-t-il être accompagné pour son addiction ?

| Code | Libellé |
|------|---------|
| 1 | Oui | ✅ |
| 2 | Non | ⚠️ |
| 3 | Il ne reconnaît pas le problème | 🔴 |

---

### Section 4.5 — Coordination des soins

---

#### E52 — Coordinateur identifié

**Libellé** : Y a-t-il une personne qui coordonne les soins de votre proche ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Non, personne ne coordonne vraiment | 🔴 CCC M3/M5 |

**⚠️ Déclenchante + CCC M5**

---

#### E54 — Organisation globale soins

**Libellé** : Comment qualifieriez-vous l'organisation globale des soins ?

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Bien organisé | 0 | ✅ |
| 2 | Moyennement | 1 | ⚠️ |
| 3 | Mal organisé | 2 | 🔴 |

**⚠️ Scorante**

---

#### E57 — Plan de route clair

**Libellé** : Avez-vous un plan de route clair pour le parcours de soins ?

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Oui | 0 | ✅ |
| 2 | Partiellement | 1 | ⚠️ |
| 3 | Non | 2 | 🔴 CCC M6 |

**⚠️ Scorante + CCC M6**

---



### Questions additionnelles (complément source)

---

### 6.1 – Compréhension du diagnostic et de la maladie

---

#### E38 — Si votre proche est passé ou va passer de services ‘enfan...

**Libellé** : Si votre proche est passé ou va passer de services ‘enfant’ à des services ‘adulte’ (pédopsychiatrie → psychiatrie adulte, pédiatrie → médecine adulte…), ce passage a-t-il été préparé et organisé ?

**Type** : Obligatoire / Choix Unique / conditonnel N3 réponse 2,3,4 et 5 ET conditionnel O1 réponse 1

| Code | Libellé |
|------|---------|
| 1 | Oui, bien préparé |
| 2 | Un peu, mais cela reste flou |
| 3 | Non, pas du tout |
| 4 | Pas concerné |

---

### 6.2 – Accès aux soins et aux professionnels de santé

---

#### O17 — A-t-elle un médecin traitant

**Libellé** : A-t-elle un médecin traitant ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### O18 — - A-t-elle d'autres médecins spécialistes qui la suivent ...

**Libellé** : - A-t-elle d'autres médecins spécialistes qui la suivent actuellement ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### O19 — Lesquels

**Libellé** : Lesquels ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples /Conditionnel O18(1)

| Code | Libellé |
|------|---------|
| 1 | Cardiologue |
| 2 | Oncologue |
| 3 | Neurologue |
| 4 | Pneumologue |
| 5 | Ophtalmologue |
| 6 | Psychiatre |
| 7 | Chirurgien-Dentiste |
| 8 | Gastro-entérologue |
| 9 | Endocrinologue / Diabetologue |
| 10 | ORL |
| 11 | Gynecologue |
| 12 | Nephrologue |
| 13 | Gériatre |
| 14 | Dermatologue |
| 15 | Autre |

---

#### O20 — La personne aidée a-t-elle déjà réalisé des rendez-vous m...

**Libellé** : La personne aidée a-t-elle déjà réalisé des rendez-vous médicaux cette année ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### O21 — Lesquels

**Libellé** : Lesquels ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples/ Conditionnel O21(1)

| Code | Libellé |
|------|---------|
| 1 | Bilan de santé général (prise de sang…) |
| 2 | Audition |
| 3 | Vue |
| 4 | Contrôle dentaire |
| 5 | Suivi cardiovasculaire |
| 6 | Ostéodensitométrie |
| 7 | Vaccination |
| 8 | Examen gynécologique |
| 9 | Suivi dermatologique |
| 10 | Suivi psychologique |
| 11 | Dépistage des cancers |

---

#### E39 — Le premier professionnel de santé (médecin, infirmier, sp...

**Libellé** : Le premier professionnel de santé (médecin, infirmier, spécialiste) est-il situé à moins de 15 minutes du domicile de votre proche ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### E41 — Votre proche a-t-il déjà participé à un programme d’éduca...

**Libellé** : Votre proche a-t-il déjà participé à un programme d’éducation thérapeutique (ETP) lié à sa maladie (diabète, insuffisance cardiaque, BPCO, etc.) ?

**Type** : Obligatoire / Choix Unique / conditonnel N3 réponse 1 ou 3

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non, on ne nous en a jamais parlé |
| 3 | Non, mais on nous l’a proposé |
| 4 | Je ne sais pas |

---

### 6.3 – Urgences, hospitalisations et suivi médical

---

#### E45 — Votre proche est-il suivi dans un service ou une consulta...

**Libellé** : Votre proche est-il suivi dans un service ou une consultation spécialisée en addictologie ?

**Type** : Obligatoire / Choix Unique / conditionnel N3 réponse 5

| Code | Libellé |
|------|---------|
| 1 | Oui, de façon régulière |
| 2 | Oui, mais il/elle n’y va plus |
| 3 | Non |
| 4 | Je ne sais pas |

---

### 6.4 – Addictions, troubles psychiques et suivi spécialisé

---

#### E48 — Actuellement, votre proche est-il suivi pour ses troubles...

**Libellé** : Actuellement, votre proche est-il suivi pour ses troubles psychiques dans l’un des cadres suivants ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Unique / Conditionnel N3 réponse 4

| Code | Libellé |
|------|---------|
| 1 | Médecin généraliste |
| 2 | Psychiatre en libéral |
| 3 | Centre médico-psychologique (CMP / CMPP) |
| 4 | Hôpital de jour / centre de crise |
| 5 | Psychologue |
| 6 | Aucun suivi actuellement |

---

#### E49 — Dans le suivi de l’addiction, quels types de professionne...

**Libellé** : Dans le suivi de l’addiction, quels types de professionnels sont impliqués ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Unique / Conditionnel N3 réponse 5

| Code | Libellé |
|------|---------|
| 1 | Médecin (généraliste ou addictologue) |
| 2 | Psychiatre / psychologue |
| 3 | Travailleur social / éducateur spécialisé |
| 4 | Infirmier (CSAPA, hôpital, ville) |
| 5 | Association de patients / groupe de parole |
| 6 | Aucun suivi structuré |

---

#### E50 — Votre proche est-il actuellement suivi pour ses troubles ...

**Libellé** : Votre proche est-il actuellement suivi pour ses troubles psychiques (psychiatre, psychologue, centre spécialisé) et suit-il son traitement si prescrit ?

**Type** : Obligatoire / Choix Unique / Conditionnel N3 réponse 4

| Code | Libellé |
|------|---------|
| 1 | Oui, suivi régulier et traitement bien pris |
| 2 | Oui, mais suivi ou traitement irrégulier |
| 3 | Non, pas de suivi / pas de traitement |
| 4 | Je ne sais pas |

---

### 6.5 – Coordination des soins et personne de référence

---

#### O59 — Quels sont les professionnels, ou services qui intervienn...

**Libellé** : Quels sont les professionnels, ou services qui interviennent déjà au domicile de la personne aidée ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Service à domicile (SAD) / auxiliaire de vie |
| 2 | Service à domicile (SAD) / aide ménagère |
| 3 | Service de soins infirmiers à domicile (SSIAD) |
| 4 | Infirmier libéral |
| 5 | Masseur-kinésithérapeute |
| 6 | Aide physique adaptée (APA) |
| 7 | Télé-assistance |
| 8 | Portage des repas |
| 9 | Educateur spécialisé |
| 10 | Pédicure-podologue |
| 11 | Ergothérapeute |
| 12 | Aucun |
| 13 | Autre |

---

#### E53 — Pour vous, qui est aujourd’hui le professionnel ‘référent...

**Libellé** : Pour vous, qui est aujourd’hui le professionnel ‘référent’ pour la santé de votre proche (celui à qui vous pensez en premier quand ça ne va pas) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Médecin traitant |
| 2 | Spécialiste hospitalier |
| 3 | Spécialiste libéral |
| 4 | Aucune personne vraiment référente |
| 5 | Je ne sais pas |

---

#### E55 — Avez-vous le sentiment qu’une meilleure coordination entr...

**Libellé** : Avez-vous le sentiment qu’une meilleure coordination entre les professionnels améliorerait beaucoup la situation de votre proche ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non, pas vraiment |
| 2 | Oui, un peu |
| 3 | Oui, énormément |

---

### 6.6 – Autres éléments sur le parcours de soins

---

#### E56 — Qu’est-ce qui vous inquiète le plus pour la santé de votr...

**Libellé** : Qu’est-ce qui vous inquiète le plus pour la santé de votre proche dans les prochains mois ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Les chutes |
| 2 | La mémoire, le comportement |
| 3 | L’alimentation / le poids |
| 4 | Les allers-retours aux urgences |
| 5 | Le risque qu’il/elle ne puisse plus rester à domicile |
| 6 | Autre |
| 7 | Je ne sais pas |

---

### 6.6– Autres éléments sur le parcours de soins

---

#### E58 — Votre proche a-t-il bénéficié d’une évaluation spécialisé...

**Libellé** : Votre proche a-t-il bénéficié d’une évaluation spécialisée liée à l’âge (consultation mémoire, bilan gériatrique, bilan de chutes, etc.) ?

**Type** : Obligatoire / Choix Multiples / conditionnel N3 reponse 1 ou 3

| Code | Libellé |
|------|---------|
| 1 | Oui, consultation mémoire |
| 2 | Oui, consultation gériatrique / bilan gériatrique |
| 3 | Oui, bilan de chutes |
| 4 | Oui, autre évaluation spécialisée |
| 5 | Non, aucune |

---

#### E59 — Votre enfant a-t-il été orienté vers une équipe ou une st...

**Libellé** : Votre enfant a-t-il été orienté vers une équipe ou une structure spécialisée dans les troubles du neurodéveloppement (TND) ?

**Type** : Obligatoire / Choix Unique/ Conditionnel N3 réponse 2 ou 4 et O1 réponse 1

| Code | Libellé |
|------|---------|
| 1 | Oui, et une évaluation est en cours / réalisée |
| 2 | Oui, mais nous sommes en attente depuis longtemps |
| 3 | Non, personne ne nous en a parlé |
| 4 | Je ne sais pas |

---

#### E60 — Pour l’évaluation de votre enfant, quels professionnels s...

**Libellé** : Pour l’évaluation de votre enfant, quels professionnels sont déjà intervenus ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples / Conditionnel N3 réponse 2 ou 4 et O1 réponse 1

| Code | Libellé |
|------|---------|
| 1 | Pédiatre / généraliste |
| 2 | Neuropédiatre |
| 3 | Pédopsychiatre |
| 4 | Psychologue |
| 5 | Orthophoniste |
| 6 | Psychomotricien / ergothérapeute |
| 7 | CAMSP / CMPP / autre centre spécialisé |
| 8 | Aucun de ces professionnels |

---

## ⚠️ Règles Legacy

1. **CCC M1** : E36 + E37 → Errance diagnostique
2. **CCC M2** : O24 + E40 → Difficultés accès soins
3. **CCC M3** : E42 + E43 OU E44 + E52 → Hospitalisations / ruptures
4. **CCC M4** : E46 + E47 → Troubles psy non suivis
5. **CCC M5** : E52 → Absence de coordination
6. **CCC M6** : E57 → Plan de route absent
