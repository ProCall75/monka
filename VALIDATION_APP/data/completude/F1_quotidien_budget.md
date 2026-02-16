# 🔍 Complétude MP — F1 — Vie quotidienne, budget et entourage

> **Vulnérabilité** : V4 — Fragilité du Proche  
> **Template officiel** : [F1.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V4/F1.md)  
> **Score checklist actuel** : 5/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

F1 a 3 catégories validées et 17 MT (après fusions). Trois manquements empêchent le 8/8 :

| # | Manquement | Check | Impact |
|---|---|---|---|
| 1 | **CAT_02 n'a qu'un CCC, pas de Standard** | #4 K3 | Pas d'activation douce pour les problèmes financiers/gestion modérés |
| 2 | **CAT_03 n'a aucune règle formalisée** (N23/N27 orphelines) | #1 + #4 | 2 questions qui ne déclenchent rien + pas d'escalade |
| 3 | **Wording incohérent sur F1_RECO_01 et F1_RECO_04** | #7 | RECO_01 trop vague, RECO_04 incohérent (psy ≠ SAD) |

---

## Manquement 1 — CAT_02 sans Standard (K3)

### Le problème

La catégorie **F1_CAT_02 (Soutien socio-financier)** ne s'active que via CCC_01 (E21 = "Non" ET problèmes financiers/gestion). Un aidant qui signale des problèmes financiers **modérés** (N21 = "Parfois") ou une gestion assistée (N9 = "Elle se fait aider") déclenche 0 action s'il ne dit pas aussi que le maintien est impossible.

### Ce que je propose

#### Proposition 1.1 — Règle Standard pour CAT_02

```
SI N21 = « Parfois » OU N9 = « Elle se fait aider »
ALORS → V4_F1_STD_03 (Standard) → CAT_02
```

**Raisonnement** : Les niveaux intermédiaires de N21 et N9 signalent une fragilité financière/administrative sous contrôle mais présente. En V1/V2, tout signal de difficulté — même modéré — déclenche au minimum un Standard informatif. Ici, l'IDEC peut informer sur les aides disponibles et vérifier que la situation est réellement sous contrôle.

#### Proposition 1.2 — Règle Standard pour CAT_02 (via N9)

```
SI N9 = « Oui » (problèmes effectifs de gestion)
ALORS → V4_F1_STD_04 (Standard) → CAT_02
```

**Raisonnement** : Si la personne aidée a des problèmes avérés de gestion budgétaire/administrative, c'est un signal plus fort que "elle se fait aider". Cela justifie une activation Standard distincte, indépendante de la maintenabilité (E21).

**Alternative** : Fusionner 1.1 et 1.2 en une seule règle : SI N21 ∈ {"Parfois", "Oui"} OU N9 ∈ {"Elle se fait aider", "Oui"} → Standard CAT_02. Plus simple, mais perd la distinction de gravité.

---

## Manquement 2 — CAT_03 sans règle (N23/N27 orphelines)

### Le problème

**N23** (activité professionnelle/occupationnelle) et **N27** (isolement social) sont les deux questions centrales du thème "lien social" de F1, mais elles ne déclenchent **aucune règle**. Les recos F1_RECO_06 et F1_RECO_07 sont rattachées au STD_01 (= règle CAT_01 projet de vie). Cliniquement, le lien social devrait avoir ses propres règles.

### Ce que je propose

#### Proposition 2.1 — Règle Standard pour CAT_03

```
SI N27 ∈ { « Un peu », « Beaucoup » } OU N23 = « Parfois »
ALORS → V4_F1_STD_05 (Standard) → CAT_03
```

**Raisonnement** : Un isolement modéré ("Un peu" ou "Beaucoup") ou des difficultés occupationnelles intermittentes ("Parfois") justifient une première intervention : information sur les associations locales, proposition d'activités sociales. C'est l'équivalent du Standard en V1/V2 : un premier signal → une première action.

#### Proposition 2.2 — Règle CCC pour CAT_03

```
SI N27 = « Totalement » OU N23 = « Oui »
ALORS → V4_F1_CCC_02 (CCC, ≤ 30j) → CAT_03
```

**Raisonnement** : Un isolement total ou une perte complète d'activité occupationnelle sont des signaux graves. L'isolement total est un facteur de risque majeur de dépression et de dégradation cognitive chez les personnes âgées. L'intervention doit être urgente : RDV psychiatre/psychologue + inscription association sous 30 jours.

#### Proposition 2.3 — Règle CCC composite CAT_01 + CAT_03

```
SI E21 = « Non, un changement sera nécessaire » ET N27 ∈ { « Beaucoup », « Totalement » }
ALORS → V4_F1_CCC_03 (CCC, ≤ 30j) → CAT_01 + CAT_03
```

**Raisonnement** : Maintien de la situation impossible + isolement sévère = double signal de détresse. Le proche est à la fois en transition résidentielle et sans réseau social de soutien. Activer les deux catégories en CCC permet de préparer le projet de vie tout en sécurisant l'accompagnement social.

---

## Manquement 3 — Wording incohérent

### Le problème

| Reco | Problème |
|---|---|
| **F1_RECO_01** | Wording "Sécuriser et renforcer le maintien à domicile" est trop vague. Sécuriser comment ? Renforcer quoi ? |
| **F1_RECO_04** | L'utilisateur lit "Envisager un soutien psychologique" mais l'IDEC lit "Confirmer les heures d'intervention SAD". Ce sont deux actions différentes. |

### Ce que je propose

#### Proposition 3.1 — Reformuler F1_RECO_01

```
Avant : « Sécuriser et renforcer le maintien à domicile »
Après : « Étudier les conditions de maintien à domicile et identifier les besoins prioritaires »
```

**Raisonnement** : Le nouveau wording est actionnable : "étudier les conditions" (ORGA) + "identifier les besoins" (ORGA) → deux actions claires.

#### Proposition 3.2 — Corriger F1_RECO_04

```
Option A : Aligner l'IDEC sur l'utilisateur
→ IDEC : « Discuter avec le médecin traitant de la pertinence d'un soutien psychologique pour la personne aidée »

Option B : Aligner l'utilisateur sur l'IDEC
→ Utilisateur : « Envisager de renforcer les heures d'aide à domicile »

Option C : Créer deux recos distinctes (séparer psy et SAD)
→ F1_RECO_04a (psy) + F1_RECO_04b (SAD)
```

**Raisonnement** : L'option A est la plus cohérente car F1_RECO_04 est rattachée à **CAT_02** (socio-financier) mais parle de psy (CAT_03). Soit on corrige le rattachement, soit on corrige le wording.

---

## Propositions bonus (non bloquantes)

#### Proposition 4.1 — Règle Critique (triple signal)

```
SI E21 = « Non » ET N21 = « Oui » ET N27 ∈ { « Beaucoup », « Totalement » }
ALORS → V4_F1_CRIT_01 (≤ 7j) → CAT_01 + CAT_02 + CAT_03
```

**Raisonnement** : Triple effondrement — maintien impossible + problèmes financiers + isolement sévère. Le proche est en situation de danger immédiat. Les 3 catégories s'activent en critique.

#### Proposition 4.2 — E20 comme règle directe ?

```
SI E20 = « En établissement (EHPAD, résidence, foyer…) »
ALORS → V4_F1_STD_06 → CAT_01
```

**Raisonnement** : Si l'aidant souhaite un établissement, le projet de vie est déjà orienté → activer CAT_01 pour informer et accompagner la transition. E20 est actuellement du cadrage pur. À discuter si elle justifie une activation directe.

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | N21 = "Parfois" OU N9 = "Se fait aider" → CAT_02 | #4 K3 | 🟠 Haute |
| 1.2 | Règle STD | N9 = "Oui" → CAT_02 | #4 K3 | 🟠 Haute |
| 2.1 | Règle STD | N27 ∈ {"Un peu","Beaucoup"} OU N23 = "Parfois" → CAT_03 | #1 + #4 | 🔴 Critique |
| 2.2 | Règle CCC | N27 = "Totalement" OU N23 = "Oui" → CAT_03 | #1 + #4 | 🔴 Critique |
| 2.3 | Règle CCC | E21 = "Non" ET N27 sévère → CAT_01 + CAT_03 | #1 | 🟡 Moyenne |
| 3.1 | Wording | Reformuler F1_RECO_01 | #7 | 🟠 Haute |
| 3.2 | Wording | Corriger F1_RECO_04 (psy ≠ SAD) | #7 | 🟠 Haute |
| 4.1 | Règle CRIT | E21+N21+N27 triple → 3 CAT | Bonus | 🟡 Moyenne |
| 4.2 | Règle STD | E20 = "établissement" → CAT_01 | Bonus | 🟡 Moyenne |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ❌ N23/N27 orphelines | ✅ 8/8 questions couvertes |
| #4 — K3 ≥2 niveaux | ❌ CAT_02 + CAT_03 | ✅ Toutes CAT ≥2 niveaux |
| #7 — Wording cohérent | ⚠️ RECO_01 + RECO_04 | ✅ Wording corrigé |
| **Score global** | **5/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel F1.md.**
