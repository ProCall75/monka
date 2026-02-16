# 🔍 Complétude MP — F2 — Autonomie, aide humaine et présence nécessaire

> **Vulnérabilité** : V4 — Fragilité du Proche  
> **Template officiel** : [F2.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V4/F2.md)  
> **Score checklist actuel** : 5/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

F2 a 3 catégories validées et 12 MT (après fusion triplons). Quatre manquements empêchent le 8/8 :

| # | Manquement | Check | Impact |
|---|---|---|---|
| 1 | **CAT_02 et CAT_03 n'ont qu'un CCC, pas de Standard** | #4 K3 | Pas d'activation douce pour dépendance modérée |
| 2 | **N18 et N36 sont orphelines** (aucune règle) | #1 | 2 questions qui ne déclenchent rien |
| 3 | **Wording : F2_RECO_05 trop générique + RECO_06/07/08 triplons** | #7 | Manque de clarté |
| 4 | **Annotations Dr. Monka non résolues** (MT_V4_036, MT_V4_037) | — | 2 MT à retravailler |

---

## Manquement 1 — CAT_02 et CAT_03 sans Standard (K3)

### Le problème

Les deux catégories ne s'activent que via le CCC composite (≥2 conditions extrêmes). Un proche qui a besoin d'aide nocturne « parfois » (E24) ou qui a besoin d'aide pour se déplacer « de temps en temps » (O8/O9) déclenche 0 action. Seuls les cas extrêmes sont captés.

### Ce que je propose

#### Proposition 1.1 — Règle Standard pour CAT_02

```
SI E23 = « Quelques heures » OU E24 = « Parfois »
ALORS → V4_F2_STD_03 (Standard) → CAT_02
```

**Raisonnement** : Un proche qui peut rester seul « quelques heures » ou qui a « parfois » besoin de présence nocturne montre un début de dépendance. Pas encore critique, mais le Standard permet d'informer l'aidant et de planifier. En V1/V2, tout signal modéré déclenche au minimum un Standard.

#### Proposition 1.2 — Règle Standard pour CAT_03

```
SI O8 = « De temps en temps » OU O9 = « De temps en temps »
ALORS → V4_F2_STD_04 (Standard) → CAT_03
```

**Raisonnement** : Un besoin d'aide ponctuel pour les déplacements signale une perte de mobilité débutante. C'est le moment idéal pour un bilan kiné/ergo préventif — la réhabilitation est plus efficace quand elle est précoce.

---

## Manquement 2 — Questions orphelines N18 et N36

### Le problème

**N18** (peut-elle réaliser seule les actes de la vie quotidienne ?) et **N36** (besoin d'aide pour organiser/planifier ?) ne déclenchent aucune règle. Ce sont pourtant des marqueurs d'autonomie directs.

### Ce que je propose

#### Proposition 2.1 — Règle Standard pour N18

```
SI N18 = « Non, elle a besoin d'aide »
ALORS → V4_F2_STD_05 (Standard) → CAT_01
```

**Raisonnement** : C'est le marqueur binaire d'autonomie le plus direct de F2. Si le proche ne peut pas réaliser seul les actes de la vie quotidienne, l'aide actuelle doit être vérifiée et potentiellement renforcée. Activation logique de CAT_01 (coordination de l'aide).

#### Proposition 2.2 — Règle Standard pour N36

```
SI N36 = « Parfois »
ALORS → V4_F2_STD_06 (Standard) → CAT_01
```

```
SI N36 = « Oui »
ALORS → V4_F2_STD_07 (Standard) → CAT_01 + CAT_03
```

**Raisonnement** : N36 mesure la dimension cognitive de l'autonomie (planification, pas exécution physique). Un besoin d'aide partiel ("Parfois") justifie une vérification de l'aide en place (CAT_01). Un besoin total ("Oui") est un signal plus fort qui justifie aussi un bilan ergo/réhabilitation (CAT_03) car la perte de planification est souvent liée à des troubles cognitifs débutants.

---

## Manquement 3 — Wording incohérent

### Le problème

| Reco | Problème |
|---|---|
| **F2_RECO_05** | "Demander un suivi régulier" — suivi de quoi ? par qui ? Trop générique. |
| **F2_RECO_06/07/08** | Trois recos quasi-identiques : "bilan kiné", "bilan ergo", "bilan kiné et/ou ergo". |

### Ce que je propose

#### Proposition 3.1 — Reformuler F2_RECO_05

```
Avant : « Demander un suivi régulier »
Après : « Demander un bilan de mobilité pour évaluer les capacités de déplacement de votre proche »
```

**Raisonnement** : Le suivi est maintenant spécifique (bilan de mobilité) et la raison est claire (évaluer les capacités de déplacement). L'action est traçable.

#### Proposition 3.2 — Fusionner F2_RECO_06/07/08

```
Avant :
  RECO_06 : « Demander bilan de la marche chez kiné et/ou ergo »
  RECO_07 : « Demander bilan ergothérapie pour maintenir l'autonomie »
  RECO_08 : « Demander bilan ergo et/ou kiné pour capacités motrices »

Après (1 seule reco) :
  F2_RECO_06 : « Demander un bilan kiné et ergothérapie pour évaluer et maintenir la mobilité »
```

**Raisonnement** : Les 3 recos prescrivent le même bilan (kiné + ergo). Avoir 3 recos identiques est confus pour l'utilisateur et non traçable pour l'IDEC. Une seule reco claire suffit.

---

## Manquement 4 — Annotations Dr. Monka non résolues

### Le problème

Deux MT de CAT_03 ont été marquées "à revoir" par Dr. Monka lors de la validation du 14/02/2026 :

| MT | Annotation | Question à résoudre |
|---|---|---|
| **MT_V4_036** | « Reformuler → 'Organiser une consultation avec un médecin spécialiste pour évaluer la mobilité'. À revoir. » | Le wording actuel ("Se reporter à la procédure RDV médecin spécialiste") est trop procédural et pas actionnable. |
| **MT_V4_037** | « Discuter la pertinence du CMP pour N36 ou réorienter vers ergothérapeute. À revoir. » | Le CMP est un service psychiatrique — est-ce pertinent pour un besoin de planification ? L'ergothérapeute est mieux placé. |

### Ce que je propose

#### Proposition 4.1 — Reformuler MT_V4_036

```
Avant : « Se reporter à la procédure RDV médecin spécialiste »
Après : « Organiser une consultation avec un médecin spécialiste pour évaluer la mobilité »
```

**Raisonnement** : Exactement la reformulation proposée par Dr. Monka. Le nouveau wording est actionnable (organiser = SEC) et spécifique (mobilité).

#### Proposition 4.2 — MT_V4_037 : CMP → ergothérapeute

```
Option A — Remplacer CMP par ergo :
  Avant : « Contacter le CMP de secteur pour 1er contact infirmier »
  Après : « Contacter un ergothérapeute du secteur pour évaluer les besoins en aide à la planification »

Option B — Garder CMP ET ajouter ergo :
  MT_V4_037 reste CMP (pour les cas avec troubles cognitifs associés, E25/E26 positifs)
  MT_V4_NEW_02 = « Orienter vers un ergothérapeute pour évaluer les besoins d'aide à l'organisation quotidienne »
```

**Raisonnement** : N36 ("aide pour organiser et planifier") est une question d'autonomie fonctionnelle, pas psychiatrique. L'ergothérapeute est le professionnel de référence pour l'aide à l'organisation du quotidien. Le CMP serait pertinent uniquement si des troubles cognitifs sont associés (E25/E26 positifs dans F3). L'option B est la plus complète — elle couvre les deux cas.

---

## Propositions bonus (non bloquantes)

#### Proposition 5.1 — Cross-activation F3→F2

```
SI E25 = « Souvent » OU E25 = « Tout le temps » (confusion jour/nuit dans F3)
ALORS → Contribuer au scoring CCC_01 de F2 (sécurisation périodes à risque)
```

**Raisonnement** : La confusion jour/nuit (F3) impacte directement le besoin de présence nocturne (F2). Ce cross-activation permet de capter un signal F3 qui a des conséquences F2.

#### Proposition 5.2 — Règle Critique

```
SI ≥3 conditions parmi : E23 extrême, E24 souvent/perm, O8 tout le temps, O9 tout le temps
ALORS → V4_F2_CRIT_01 (≤ 7j) → CAT_01 + CAT_02 + CAT_03
```

**Raisonnement** : Triple dépendance = danger immédiat. Le proche ne peut pas rester seul, a besoin de présence nocturne, ET ne peut se déplacer. Les 3 catégories s'activent en critique (≤ 7 jours).

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | E23 = "Quelques heures" OU E24 = "Parfois" → CAT_02 | #4 K3 | 🔴 Critique |
| 1.2 | Règle STD | O8/O9 = "De temps en temps" → CAT_03 | #4 K3 | 🔴 Critique |
| 2.1 | Règle STD | N18 = "Non" → CAT_01 | #1 | 🟠 Haute |
| 2.2 | Règle STD | N36 = "Parfois" → CAT_01, "Oui" → CAT_01+03 | #1 | 🟠 Haute |
| 3.1 | Wording | Reformuler F2_RECO_05 | #7 | 🟠 Haute |
| 3.2 | Wording | Fusionner F2_RECO_06/07/08 en 1 reco | #7 | 🟠 Haute |
| 4.1 | MT | Reformuler MT_V4_036 (annotation Dr. Monka) | Annotation | 🟠 Haute |
| 4.2 | MT | MT_V4_037 CMP → ergo (annotation Dr. Monka) | Annotation | 🟠 Haute |
| 5.1 | Cross | F3→F2 via E25 confusion jour/nuit | Bonus | 🟡 Moyenne |
| 5.2 | Règle CRIT | ≥3 conditions CCC_01 → Critique 3 CAT | Bonus | 🟡 Moyenne |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ❌ N18/N36 orphelines | ✅ 7/7 questions couvertes |
| #4 — K3 ≥2 niveaux | ❌ CAT_02 + CAT_03 | ✅ Toutes CAT ≥2 niveaux |
| #7 — Wording cohérent | ⚠️ RECO_05 + triplons RECO_06/07/08 | ✅ Wording corrigé |
| **Score global** | **5/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel F2.md.**
