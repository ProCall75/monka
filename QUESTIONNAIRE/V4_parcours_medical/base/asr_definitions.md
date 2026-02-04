# 🎯 ASR Definitions - V4 Parcours Médical du Proche

> **Statut** : ✅ EXTRAIT depuis Excel (100% RÉEL)  
> **Source** : `microparcours_aidant.xlsx` - Onglets "Micro-parcours", "Triggers", "Questions"  
> **Date extraction** : 03/02/2026

---

## 📊 Vue d'Ensemble

| Code | Micro-parcours | Triggers | Questions |
|------|----------------|----------|-----------|
| **M1** | M1 – Compréhension du diagnostic et de la maladie | 6 | 7 |
| **M2** | M2 – Accès aux soins et aux professionnels | 7 | 9 |
| **M3** | M3 – Urgences, hospitalisations et continuité des soins | 5 | 7 |
| **M4** | M4 – Troubles psychiques, addictions et suivi spécialisé | 5 | 4 |
| **M5** | M5 – Coordination des soins et personne de référence | 7 | 4 |
| **M6** | M6 – Plan de soins, évaluations spécialisées et inquiétudes | 5 | 6 |

---

## 📋 Détail des Micro-Parcours

### M1 - M1 – Compréhension du diagnostic et de la maladie

**Objectif** : Clarifier le diagnostic, la maladie et ses impacts pour mieux décider et expliquer au proche.

#### Triggers (6)

| ID | Question |
|-----|----------|
| N3 | Quelle proposition correspond le mieux à votre situation d'aidant (une... |
| O14 | Quel est le sexe biologique de la personne aidée ?  Cette précision es... |
| O1 | Quel est l'âge de la personne aidée ? (Sachez que la majorité numériqu... |
| N26 | Selon vous quels sont les besoins complémentaires nécessaires à la bon... |
| E71 | Aujourd’hui, quelle est votre priorité principale ?... |
| ... | *1 autres triggers* |

#### Questions (7)

| ID | Question |
|-----|----------|
| E36 | Depuis le début des problèmes de santé de votre proche, avez-vous le s... |
| E37 | Avez-vous déjà reçu des avis médicaux contradictoires sur la situation... |
| E38 | Si votre proche est passé ou va passer de services ‘enfant’ à des serv... |
| N17 | Quel est son type de handicap ? (plusieurs réponses possibles)... |
| N41 | Bénéficie-t-elle d'une reconnaissance officielle d'une maladie chroniq... |
| ... | *2 autres questions* |

---

### M2 - M2 – Accès aux soins et aux professionnels

**Objectif** : Faciliter l’accès aux soins (RDV, spécialistes, paramédicaux) et lever les freins pratiques.

#### Triggers (7)

| ID | Question |
|-----|----------|
| N3 | Quelle proposition correspond le mieux à votre situation d'aidant (une... |
| O64 | Quel est le code postal de votre lieu de résidence ? Cette question no... |
| O1 | Quel est l'âge de la personne aidée ? (Sachez que la majorité numériqu... |
| O63 | Quel est le code postal du domicile de la personne aidée ? Cette quest... |
| N26 | Selon vous quels sont les besoins complémentaires nécessaires à la bon... |
| ... | *2 autres triggers* |

#### Questions (9)

| ID | Question |
|-----|----------|
| E41 | Votre proche a-t-il déjà participé à un programme d’éducation thérapeu... |
| O17 | A-t-elle un médecin traitant ?... |
| O18 | - A-t-elle d'autres médecins spécialistes qui la suivent actuellement ... |
| O19 | Lesquels ? (plusieurs réponses possibles)... |
| O20 | La personne aidée a-t-elle déjà réalisé des rendez-vous médicaux cette... |
| ... | *4 autres questions* |

---

### M3 - M3 – Urgences, hospitalisations et continuité des soins

**Objectif** : Mieux gérer les épisodes aigus (urgences/hospitalisations) et sécuriser le retour à domicile.

#### Triggers (5)

| ID | Question |
|-----|----------|
| N3 | Quelle proposition correspond le mieux à votre situation d'aidant (une... |
| O1 | Quel est l'âge de la personne aidée ? (Sachez que la majorité numériqu... |
| N26 | Selon vous quels sont les besoins complémentaires nécessaires à la bon... |
| E71 | Aujourd’hui, quelle est votre priorité principale ?... |
| E72 | Seriez-vous d’accord pour qu’une infirmière coordinatrice Monka vous c... |

#### Questions (7)

| ID | Question |
|-----|----------|
| N14 | La personne aidée éprouve-t-elle des difficultés à suivre son traiteme... |
| E44 | Votre proche a-t-il déjà bénéficié d’une consultation ou d’un bilan de... |
| E50 | Votre proche est-il actuellement suivi pour ses troubles psychiques (p... |
| E51 | Votre proche est-il prêt à être aidé pour son addiction (parler à un p... |
| E52 | Aujourd’hui, avez-vous une personne de référence qui coordonne les soi... |
| ... | *2 autres questions* |

---

### M4 - M4 – Troubles psychiques, addictions et suivi spécialisé

**Objectif** : Orienter vers un suivi adapté en cas de troubles psychiques ou d’addictions.

#### Triggers (5)

| ID | Question |
|-----|----------|
| N3 | Quelle proposition correspond le mieux à votre situation d'aidant (une... |
| O1 | Quel est l'âge de la personne aidée ? (Sachez que la majorité numériqu... |
| N26 | Selon vous quels sont les besoins complémentaires nécessaires à la bon... |
| E71 | Aujourd’hui, quelle est votre priorité principale ?... |
| E72 | Seriez-vous d’accord pour qu’une infirmière coordinatrice Monka vous c... |

#### Questions (4)

| ID | Question |
|-----|----------|
| E57 | Avez-vous l’impression qu’il existe un ‘plan de route’ clair pour la s... |
| E58 | Votre proche a-t-il bénéficié d’une évaluation spécialisée liée à l’âg... |
| E61 | otre proche a-t-il déjà rédigé des directives anticipées concernant se... |
| E62 | Pour quels droits/ aides avez-vous effectuer une demande qui est actue... |

---

### M5 - M5 – Coordination des soins et personne de référence

**Objectif** : Mettre en place une coordination simple (qui fait quoi, quand, avec quels contacts).

#### Triggers (7)

| ID | Question |
|-----|----------|
| N3 | Quelle proposition correspond le mieux à votre situation d'aidant (une... |
| O64 | Quel est le code postal de votre lieu de résidence ? Cette question no... |
| O1 | Quel est l'âge de la personne aidée ? (Sachez que la majorité numériqu... |
| O63 | Quel est le code postal du domicile de la personne aidée ? Cette quest... |
| N26 | Selon vous quels sont les besoins complémentaires nécessaires à la bon... |
| ... | *2 autres triggers* |

#### Questions (4)

| ID | Question |
|-----|----------|
| E54 | Comment décririez-vous l’organisation des soins de votre proche ?... |
| E55 | Avez-vous le sentiment qu’une meilleure coordination entre les profess... |
| O59 | Quels sont les professionnels, ou services qui interviennent déjà au d... |
| E59 | Votre enfant a-t-il été orienté vers une équipe ou une structure spéci... |

---

### M6 - M6 – Plan de soins, évaluations spécialisées et inquiétudes

**Objectif** : Transformer vos inquiétudes en plan de soins clair (évaluations, priorités, suivi).

#### Triggers (5)

| ID | Question |
|-----|----------|
| N3 | Quelle proposition correspond le mieux à votre situation d'aidant (une... |
| O1 | Quel est l'âge de la personne aidée ? (Sachez que la majorité numériqu... |
| N26 | Selon vous quels sont les besoins complémentaires nécessaires à la bon... |
| E71 | Aujourd’hui, quelle est votre priorité principale ?... |
| E72 | Seriez-vous d’accord pour qu’une infirmière coordinatrice Monka vous c... |

#### Questions (6)

| ID | Question |
|-----|----------|
| E45 | Votre proche est-il suivi dans un service ou une consultation spéciali... |
| E46 | Après la dernière hospitalisation de votre proche, un suivi médical a-... |
| E47 | Quand l’état de santé de votre proche se dégrade brusquement (crise, a... |
| E48 | Actuellement, votre proche est-il suivi pour ses troubles psychiques d... |
| E49 | Dans le suivi de l’addiction, quels types de professionnels sont impli... |
| ... | *1 autres questions* |

---

> 📄 ASR V4 - **100% EXTRAITS depuis Excel** (AUCUNE déduction IA)
