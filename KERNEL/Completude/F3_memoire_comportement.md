# 🔍 Complétude MP — F3 — Mémoire, comportement et risques

> **Vulnérabilité** : V4 — Fragilité du Proche  
> **Template officiel** : [F3.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V4/F3.md)  
> **Score checklist actuel** : 4/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

F3 est le MP **le plus structurellement faible** de V4 malgré sa gravité clinique (il contient les 2 seules règles Critique de V4). Après fusions, il ne reste que 6 MT dont 3 non-contributives. Quatre manquements empêchent le 8/8 :

| # | Manquement | Check | Impact |
|---|---|---|---|
| 1 | **Aucune CAT n'a de Standard** (K3 total) | #4 | Les signaux précoces "Parfois" ne déclenchent rien |
| 2 | **3 questions orphelines** (N19, N24, N25) | #1 | N19/N24 sans règle, N25 = règle dans F4 |
| 3 | **CAT_01 : 0 MT contributive**, CAT_03 : 1 seule MT | #3 | ASR impossible CAT_01, CAT_03 squelettique |
| 4 | **Wording** : F3_RECO_03 = constat, RECO_05 = doublon, RECO_07 = incohérent | #7 | |

---

## Manquement 1 — 0 Standard sur les 3 CAT (K3 total)

### Le problème

Les 3 catégories s'activent exclusivement en CCC ou Critique. Un proche qui montre des signaux précoces (confusion "parfois", troubles mémoire "parfois", changements d'humeur "parfois") déclenche **zéro action**. C'est cliniquement problématique car les troubles cognitifs sont plus facilement traitables quand ils sont détectés tôt.

### Ce que je propose

#### Proposition 1.1 — Règle Standard pour CAT_01

```
SI E25 = « Parfois » OU E26 = « Parfois » OU E27 = « Parfois » OU N22 = « Parfois »
ALORS → V4_F3_STD_01 (Standard) → CAT_01
```

**Raisonnement** : Ces signaux précoces indiquent un début de désorganisation sans danger immédiat. L'action Standard (informer, surveiller, documenter) est adaptée. Si un seul signal "Parfois" est présent, l'IDEC sensibilise l'aidant aux risques et l'aide à documenter les épisodes.

#### Proposition 1.2 — Règle Standard pour CAT_02

```
SI N24 = « Parfois » OU O13 = « Diminution de certaines fonctions »
ALORS → V4_F3_STD_02 (Standard) → CAT_02
```

**Raisonnement** : Des troubles de mémoire intermittents ou une diminution partielle des fonctions cognitives justifient un bilan préventif. La littérature gériatrique recommande une consultation mémoire dès les premiers signes — la fenêtre d'intervention est critique.

#### Proposition 1.3 — Règle Standard pour CAT_03

```
SI N19 = « Parfois »
ALORS → V4_F3_STD_03 (Standard) → CAT_03
```

**Raisonnement** : Des changements d'humeur occasionnels méritent une surveillance. L'IDEC peut proposer un entretien pour évaluer la fréquence et la nature des épisodes, et orienter vers un suivi si nécessaire.

---

## Manquement 2 — Questions orphelines N19, N24, N25

### Le problème

| Question | Problème | Gravité |
|---|---|---|
| **N19** | Changements d'humeur → aucune règle d'activation de CAT_03 | 🔴 |
| **N24** | Troubles mémoire → aucune règle d'activation de CAT_02 | 🔴 |
| **N25** | Idées suicidaires → règle CRIT_01 en F4, pas en F3 | 🔴 |

### Ce que je propose

#### Proposition 2.1 — Règle CCC pour N19

```
SI N19 = « Souvent »
ALORS → V4_F3_CCC_02 (CCC, ≤ 30j) → CAT_03
```

**Raisonnement** : Des changements d'humeur fréquents ("Souvent") indiquent une instabilité comportementale significative nécessitant un suivi psychiatrique dans les 30 jours.

#### Proposition 2.2 — N24 est couvert par 1.2

N24 = "Parfois" → STD CAT_02 (proposition 1.2). N24 = "Oui" est déjà couvert implicitement par CCC_01 (car O13 "Diminution" + E25/E26 impliquent N24 "Oui"). Mais pour être explicite :

```
SI N24 = « Oui »
ALORS → V4_F3_CCC_03 (CCC, ≤ 30j) → CAT_02
```

**Raisonnement** : Troubles de mémoire avérés, même sans désorientation → bilan neurologique sous 30 jours.

#### Proposition 2.3 — Règle Critique pour N25 en F3

```
SI N25 ∈ { « Parfois », « Souvent » }
ALORS → V4_F3_CRIT_03 (Critique, ≤ 72h) → CAT_03
```

**Raisonnement** : **Toute mention d'idées suicidaires** — même "parfois" — est un signal d'urgence vitale. La différence avec le CCC est que le risque suicidaire ne peut pas attendre 30 jours. L'action est immédiate : contacter le MT, orienter vers les urgences ou le 3114.

**Note** : Cette règle DUPLIQUE CRIT_01 de F4 (qui utilise N25 = "Souvent"). Les deux règles coexisteront — F3 active CAT_03 (urgences psy), F4 active CAT_04 (état général). La proposition F3 est plus stricte (inclut "Parfois") car F3 est le MP comportemental.

---

## Manquement 3 — MT insuffisantes (CAT_01 : 0 📍, CAT_03 : 1 MT)

### Le problème

| CAT | MT actuelles | Problème |
|---|---|---|
| CAT_01 | 3 MT (toutes 💡 ORGA/INFO) | **0 MT contributive** → ASR impossible |
| CAT_03 | 1 MT (MED 📍) | 1 seule MT pour couvrir humeur + idées suicidaires |

### Ce que je propose

#### Proposition 3.1 — MT SEC pour CAT_01

```
MT_V4_NEW_F3_01 — « Alerter le médecin traitant en cas de comportement dangereux avéré »
Type : SEC | Acteur : IDEC | Domaine : 🏥 | 📍 Contributive
```

**Raisonnement** : C'est l'action de sécurisation primaire de CAT_01 — contacter le MT pour évaluer la nécessité d'hospitalisation, d'ajustement thérapeutique ou de mise en sécurité. Sans cette MT, l'IDEC documente les risques (ORGA) mais n'agit pas.

#### Proposition 3.2 — MT STRUC pour CAT_01

```
MT_V4_NEW_F3_02 — « Évaluer la pertinence d'un dispositif de sécurité (téléalarme, détecteur gaz, verrous) »
Type : STRUC | Acteur : IDEC | Domaine : 🤝 | 📍 Contributive
```

**Raisonnement** : En parallèle de l'alerte médicale, l'IDEC évalue les solutions matérielles de sécurisation. C'est la dimension "environnement" de la sécurisation, complémentaire à la dimension "médicale".

#### Proposition 3.3 — MT SEC pour CAT_03

```
MT_V4_NEW_F3_03 — « Prendre RDV avec un psychiatre pour évaluer les changements d'humeur »
Type : SEC | Acteur : IDEC | Domaine : 🏥 | 📍 Contributive
```

**Raisonnement** : L'action concrète de F3_RECO_04 ("évaluer les changements d'humeur") nécessite un RDV psychiatre. La MT existante (MT_V4_047 = urgences) couvre N25, pas N19. Il faut une MT pour le suivi de l'humeur hors urgence.

#### Proposition 3.4 — MT ORGA pour CAT_03

```
MT_V4_NEW_F3_04 — « Documenter la fréquence et la nature des épisodes d'instabilité émotionnelle »
Type : ORGA | Acteur : Aidant (autonome) | Domaine : 🤝 | 💡 Non-contributive
```

**Raisonnement** : Avant le RDV psychiatre, l'aidant documente les épisodes (fréquence, déclencheurs, intensité). Ce journal aide le psychiatre à poser un diagnostic plus précis.

---

## Manquement 4 — Wording incohérent

### Le problème

| Reco | Problème |
|---|---|
| **F3_RECO_03** | "Situation à risque élevé nécessitant une action immédiate" — c'est un **constat**, pas une reco actionnable |
| **F3_RECO_05** | Doublon de F3_RECO_04 (même action : RDV psychiatre) |
| **F3_RECO_07** | Texte dit "orienter vers les urgences" mais action IDEC dit "RDV psychologue". Un psychologue n'est pas les urgences. |

### Ce que je propose

#### Proposition 4.1 — Reformuler F3_RECO_03

```
Avant : « Situation à risque élevé nécessitant une action immédiate »
Après : « Sécuriser immédiatement l'environnement de votre proche et contacter le médecin »
```

#### Proposition 4.2 — Supprimer F3_RECO_05

Fusionner avec F3_RECO_04. Résultat : 1 reco "Évaluer les changements d'humeur et adapter le suivi".

#### Proposition 4.3 — Corriger F3_RECO_07

```
Option A — Aligner sur l'urgence :
  IDEC : « Appeler le 3114 ou orienter vers les urgences psychiatriques »
  (Pour N25 = "Souvent" — Critique)

Option B — Aligner sur le psychologue :
  Utilisateur : « Demander un RDV avec un psychologue pour évaluer les idées noires »
  (Pour N25 = "Parfois" — CCC)

Option C — Séparer en 2 recos :
  F3_RECO_07a (Critique) : urgences
  F3_RECO_07b (CCC) : psychologue
```

**Raisonnement** : L'option C est la plus complète — elle distingue le niveau d'urgence.

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | E25/E26/E27/N22 = "Parfois" → CAT_01 | #4 K3 | 🔴 Critique |
| 1.2 | Règle STD | N24 = "Parfois" OU O13 = "Diminution" → CAT_02 | #4 K3 + #1 | 🔴 Critique |
| 1.3 | Règle STD | N19 = "Parfois" → CAT_03 | #4 K3 + #1 | 🔴 Critique |
| 2.1 | Règle CCC | N19 = "Souvent" → CAT_03 | #1 | 🟠 Haute |
| 2.2 | Règle CCC | N24 = "Oui" → CAT_02 | #1 | 🟠 Haute |
| 2.3 | Règle CRIT | N25 ∈ {"Parfois","Souvent"} → CAT_03 | #1 | 🔴 Critique |
| 3.1 | MT SEC | Alerter MT comportement dangereux → CAT_01 | #3 ASR | 🔴 Critique |
| 3.2 | MT STRUC | Évaluer dispositifs sécurité → CAT_01 | #3 ASR | 🟠 Haute |
| 3.3 | MT SEC | RDV psychiatre changements humeur → CAT_03 | #3 | 🟠 Haute |
| 3.4 | MT ORGA | Documenter épisodes instabilité → CAT_03 | #3 | 🟡 Moyenne |
| 4.1 | Wording | Reformuler RECO_03 (constat → action) | #7 | 🟠 Haute |
| 4.2 | Wording | Fusionner RECO_05 dans RECO_04 | #7 | 🟠 Haute |
| 4.3 | Wording | Corriger RECO_07 (urgences ≠ psychologue) | #7 | 🟠 Haute |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ❌ N19/N24/N25 orphelines | ✅ 8/8 questions couvertes |
| #3 — CAT → MT suffisantes | ⚠️ CAT_01=0📍, CAT_03=1MT | ✅ CAT_01≥2📍, CAT_03≥3MT |
| #4 — K3 ≥2 niveaux | ❌ 0 Standard sur 3 CAT | ✅ Toutes CAT ≥2 niveaux |
| #7 — Wording cohérent | ⚠️ RECO_03/05/07 | ✅ Wording corrigé |
| **Score global** | **4/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel F3.md.**
