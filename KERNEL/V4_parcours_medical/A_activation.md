# 📄 TEMPLATE A — Activation — V4 Parcours Médical du Proche

> **Vulnérabilité** : V4 — Parcours Médical du Proche
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées par le CAT Excel source
> **Règles KERNEL** : K2 (3 niveaux), K3 (englobement)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V4 — Parcours Médical du Proche |
| Nombre de MP | 6 (M1, M2, M3, M4, M5, M6) |
| Nombre de règles d'activation | 17 |
| dont 🔴 Critique | 0 |
| dont 🟠 CCC | 7 |
| dont 🟢 Standard | 10 |
| MP sans règle d'activation | 1 (M6) |

---

## MP M1 — Compréhension du diagnostic et de la maladie

> **ASR** : « Clarifier le diagnostic et ses impacts »
> **Signature A** : M1-A — Informations médicales clarifiées
> **Signature B** : M1-B — Échanges avec un professionnel

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E36 | Y a-t-il eu un nombre important d'examens, de consultations, sans que cela permette de clarifier les choses ? | etat |
| 2 | E37 | Les avis des médecins consultés sont-ils souvent contradictoires ? | etat |
| 3 | E38 | Le passage du suivi pédiatrique au suivi adulte s'est-il bien passé ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V4_M1_CCC_01 | E36 = « Oui, beaucoup » **ET** E37 = « Oui, souvent » | Parcours sans diagnostic stabilisé, perte de repères | Legacy ✅ |
| V4_M1_CCC_02 | E38 = « Non, pas du tout » **ET** E36 ∈ {Oui un peu, Oui beaucoup} | Passage enfant/adulte mal préparé + errance médicale | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V4_M1_STD_01 | E36 | « Oui, beaucoup » | Examens nombreux sans clarification → errance diagnostique | Legacy ✅ |
| V4_M1_STD_02 | E37 | « Oui, souvent » | Avis médicaux contradictoires fréquents | Legacy ✅ |

---

## MP M2 — Accès aux soins et aux professionnels

> **ASR** : « Faciliter l'accès aux soins »
> **Signature A** : M2-A — Rendez-vous accessibles
> **Signature B** : M2-B — Parcours de soins fonctionnel

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E40 | Quelles difficultés rencontrez-vous pour accéder aux soins ? | facteur |
| 2 | E42 | Au cours des 3 derniers mois, combien de fois avez-vous eu un RDV médical non programmé ? | facteur |
| 3 | E43 | Y a-t-il eu des périodes de rupture dans le suivi médical ? | etat |
| 4 | O24 | Avez-vous des difficultés à trouver des professionnels de santé ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V4_M2_CCC_01 | O24 = « Oui » **ET** E40 ≠ « Je ne rencontre pas de difficultés particulières » | Difficultés concrètes et persistantes d'accès aux soins | Legacy ✅ |
| V4_M2_CCC_02 | E42 ≥ 2 **ET** E43 = « Oui, plusieurs périodes ou plus de 6 mois » | Crises non anticipées + ruptures prolongées de suivi | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

*Aucune règle standard pour ce MP.*

---

## MP M3 — Urgences, hospitalisations et continuité

> **ASR** : « Gérer les épisodes aigus »
> **Signature A** : M3-A — Plan d'urgence identifié
> **Signature B** : M3-B — Contacts et procédures connus

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E42 | RDV médicaux non programmés (3 derniers mois) | facteur |
| 2 | E44 | Un bilan de synthèse global a-t-il déjà été réalisé ? | facteur |
| 3 | E46 | Lors du dernier retour de l'hôpital, avez-vous bénéficié d'un accompagnement ? | facteur |
| 4 | E47 | Si la situation du proche s'aggravait, savez-vous quoi faire ? | etat |
| 5 | E50 | Votre proche suit-il un traitement ou est-il suivi pour ces troubles ? | facteur |
| 6 | E51 | Le traitement est-il pris régulièrement ? | facteur |
| 7 | E52 | Avez-vous l'impression qu'une personne coordonne vraiment les soins ? | etat |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V4_M3_CCC_01 | E44 = « Non, jamais » **ET** E52 = « Non, personne ne coordonne vraiment » | Aucun cadre médical structurant ni référent identifié | Legacy ✅ |
| V4_M3_CCC_02 | E47 = « Non, on improvise à chaque fois » **ET** E46 = « Non, nous avons dû tout organiser seuls » | Absence de plan de réponse médicale en situation critique | Legacy ✅ |
| V4_M3_CCC_03 | E50 = « Non, pas de suivi / pas de traitement » **ET** E51 = « Non » | Troubles psychiques/addictifs sans prise en charge ni adhésion | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V4_M3_STD_01 | E42 | ≥ 2 | RDV non programmés récents ≥ 2 | Legacy ✅ |
| V4_M3_STD_02 | E44 | « Non, jamais » | Aucun bilan de synthèse global réalisé | Legacy ✅ |
| V4_M3_STD_03 | E46 | « Non, nous avons dû tout organiser seuls » | Pas de suivi post-hospitalisation | Legacy ✅ |
| V4_M3_STD_04 | E47 | « Non, on improvise à chaque fois » | Pas de plan en cas d'aggravation | Legacy ✅ |
| V4_M3_STD_05 | E50 | « Non, pas de suivi / pas de traitement » | Pas d'observance traitement psychiatrique | Legacy ✅ |

---

## MP M4 — Troubles psychiques, addictions et suivi

> **ASR** : « Orienter vers un suivi adapté »
> **Signature A** : M4-A — Suivi actif
> **Signature B** : M4-B — Accès direct à un spécialiste

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E45 | Le proche est-il suivi en addictologie ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

*Aucune règle CCC pour ce MP.*

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V4_M4_STD_01 | E45 | « Non » | Pas de suivi addictologie | Legacy ✅ |

---

## MP M5 — Coordination des soins

> **ASR** : « Mettre en place une coordination simple »
> **Signature A** : M5-A — Référent identifié
> **Signature B** : M5-B — Coordination effective

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E52 | Avez-vous l'impression qu'une personne coordonne vraiment les soins ? | etat |
| 2 | E54 | Comment décririez-vous l'organisation des soins ? | etat |
| 3 | E57 | Avez-vous le sentiment de comprendre le plan de soins ? | etat |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V4_M5_CCC_01 | E54 ∈ {Souvent très compliquée, Ingérable} **ET** E57 = « Non, on avance au jour le jour » | Parcours médical non lisible, non piloté, risque de rupture | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V4_M5_STD_01 | E52 | « Non, personne ne coordonne vraiment » | Aucun coordinateur identifié | Legacy ✅ |

---

## MP M6 — Plan de soins, évaluations et inquiétudes

> **ASR** : « Structurer et sécuriser le parcours de soins »
> **Signature A** : M6-A — Plan de soins formalisé
> **Signature B** : M6-B — Évaluations à jour

> ⚠️ **Aucune règle d'activation** — les 6 recos de ce MP sont assignées directement via un mécanisme complémentaire.

---

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Règle issue du CAT Excel de Dr. Monka — validée |

> ✅ **100% des règles V4 sont legacy** — aucune proposition IA dans ce template.
