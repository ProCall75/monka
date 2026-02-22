# 🔍 Complétude MP — F5 — Dépendance, handicap et addictions

> **Vulnérabilité** : V4 — Fragilité du Proche  
> **Template officiel** : [F5.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V4/F5.md)  
> **Score checklist actuel** : 4/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

F5 est le **MP le plus "vide"** de V4 : 2 MT seulement pour 12 questions, 10/12 orphelines, et CAT_01 entière sans MT. Paradoxalement, c'est le seul MP de V4 avec K3 partiel (STD_01 + CCC_01). Le problème central : les règles legacy ne couvrent que E28 et O53 — tout le reste (addictions, handicap, GIR) est ignoré.

| # | Manquement | Check | Impact |
|---|---|---|---|
| 1 | **CAT_02 sans aucune règle** (4 questions addiction) | #4 K3 + #1 | Addiction sévère sans hospitalisation = 0 action |
| 2 | **10/12 orphelines** (pire de V4) | #1 | E29-E31, N16, N30, N37-N40, O54 |
| 3 | **CAT_01 : 0 MT**, CAT_02/03 : 1 MT chacune | #3 | ASR impossible 2 CAT sur 3 |
| 4 | **Wording** : RECO_01 mélange aidant/proche, RECO_02 = commentaire | #7 | |

---

## Manquement 1 — CAT_02 sans règle (addictions)

### Le problème

Un patient avec N38 = "Oui" (contrôle perdu) et N39 = "Oui" (santé impactée) mais 0 hospitalisation ne déclenche AUCUNE reco F5. Les cross-activations F4 (CRIT_02/03) déclenchent un bilan somatique dans F4, mais pas d'orientation addictologique dans F5.

### Ce que je propose

#### Proposition 1.1 — Règle Standard pour CAT_02

```
SI N38 = « Parfois »
ALORS → V4_F5_STD_02 (Standard) → CAT_02
```

**Raisonnement** : Difficultés émergentes de contrôle de l'addiction. L'IDEC sensibilise et propose un bilan addictologique.

#### Proposition 1.2 — Règle CCC pour CAT_02

```
SI N38 = « Oui » OU N39 = « Oui »
ALORS → V4_F5_CCC_02 (CCC, ≤ 30j) → CAT_02
```

**Raisonnement** : Perte de contrôle avérée OU dommages physiques liés à l'addiction → orientation addictologue/CSAPA sous 30 jours.

#### Proposition 1.3 — Règle Critique pour CAT_02

```
SI N38 = « Oui » ET N39 = « Oui »
ALORS → V4_F5_CRIT_01 (Critique, ≤ 72h) → CAT_02
```

**Raisonnement** : Addiction incontrôlée avec dommages physiques = urgence addictologique. Coexiste avec les CRIT F4 (bilan somatique) — actions complémentaires.

---

## Manquement 2 — 10 questions orphelines

### Le problème

| Question | Catégorie | Pourquoi elle est orpheline | Gravité |
|---|---|---|---|
| **E29** | CAT_01 | Nb programmées — jamais utilisé | 🟠 |
| **E30** | CAT_01 | Nb urgences — signal critique non exploité | 🔴 |
| **E31** | CAT_01 | Durée hospitalisation — signal critique non exploité | 🔴 |
| **N16** | CAT_03 | Origine handicap — cadrage ? | 🟡 |
| **N30** | CAT_03 | Taux incapacité — signal fort non exploité | 🔴 |
| **N37** | CAT_02 | Type addiction — cadrage ? | 🟡 |
| **N38** | CAT_02 | Contrôle addiction — devrait activer CAT_02 | 🔴 |
| **N39** | CAT_02 | Impact santé addiction — devrait activer CAT_02 | 🔴 |
| **N40** | CAT_02 | Sevrage tenté — cadrage ? | 🟡 |
| **O54** | CAT_03 | Niveau GIR — signal fort non exploité | 🔴 |

### Ce que je propose

#### Proposition 2.1 — Enrichir CAT_01 (hospitalisations)

```
CRIT : SI E28 ≥ 3 ET E30 ≥ 2
ALORS → V4_F5_CRIT_02 (Critique, ≤ 72h) → CAT_01
Sens : ≥3 hospitalisations dont ≥2 par les urgences = instabilité aiguë
```

```
CCC renforcé : SI E28 ≥ 2 ET E31 = « >7 jours »
ALORS → V4_F5_CCC_03 (CCC, ≤ 30j) → CAT_01
Sens : hospitalisation prolongée = dégradation significative
```

#### Proposition 2.2 — Enrichir CAT_03 (droits sociaux)

```
STD : SI O53 = « Non » (sans condition E28)
ALORS → V4_F5_STD_03 (Standard) → CAT_03
Sens : proche non évalué AGGIR = droits potentiellement non exercés
```

```
CCC : SI N30 = « ≥80% » OU O54 ∈ { « 1 », « 2 » }
ALORS → V4_F5_CCC_04 (CCC, ≤ 30j) → CAT_03
Sens : dépendance lourde → mobilisation maximale des aides
```

```
STD : SI N30 = « 50-79% » OU O54 ∈ { « 3 », « 4 » }
ALORS → V4_F5_STD_04 (Standard) → CAT_03
Sens : dépendance modérée → vérifier adéquation des aides
```

#### Proposition 2.3 — Clarifier questions de cadrage

| Question | Statut proposé | Raisonnement |
|---|---|---|
| **N16** | Cadrage | Origine du handicap = contexte. Pas d'action différenciée par origine. |
| **N37** | Cadrage conditionnel | Type d'addiction = contexte pour aiguiller le spécialiste (alcool → addictologue, jeux → psychologue). Pas de règle directe mais influence la MT. |
| **N40** | Cadrage | Sevrage tenté = historique. Information utile pour le spécialiste. |
| **E29** | Cadrage enrichi | Nb programmées = calcul implicite des non-programmées (E28 - E29). Utilisé dans la règle E30. |

---

## Manquement 3 — MT insuffisantes (2 MT pour 12 questions)

### Le problème

| CAT | MT actuelles | Problème |
|---|---|---|
| CAT_01 | **0 MT** | CAT entière sans action — ASR impossible |
| CAT_02 | 1 MT (psychologue mal nommé) | 1 seule MT, acteur incorrect |
| CAT_03 | 1 MT (commentaire, pas action) | Non-contributive, mal rédigée |

### Ce que je propose

#### Proposition 3.1 — Créer 4 MT pour CAT_01

```
MT_V4_NEW_F5_01 — « Contacter MT pour bilan de sortie et plan de suivi post-hospitalisation »
Type : MED | Acteur : MT | 📍 Contributive

MT_V4_NEW_F5_02 — « Organiser un RDV de liaison avec le service hospitalier (HAD, SSR) »
Type : SEC | Acteur : IDEC | 📍 Contributive

MT_V4_NEW_F5_03 — « Établir un historique des hospitalisations (motifs, durée, urgences vs programmées) »
Type : ORGA | Acteur : IDEC | 💡 Non-contributive

MT_V4_NEW_F5_04 — « Informer l'aidant sur le protocole de retour à domicile post-hospitalisation »
Type : INFO | Acteur : IDEC | 💡 Non-contributive
```

#### Proposition 3.2 — Reformuler et étoffer CAT_02 (1→4 MT)

```
MT_V4_063 REFORMULÉE — « Prendre RDV avec un addictologue ou un CSAPA du territoire »
Type : SEC | Acteur : IDEC | 📍 (au lieu de "psychologue")

MT_V4_NEW_F5_05 — « Contacter MT pour lettre d'adressage addictologue + bilan addiction »
Type : MED | Acteur : MT | 📍 Contributive

MT_V4_NEW_F5_06 — « Évaluer avec l'aidant le niveau de contrôle et impact de l'addiction »
Type : ORGA | Acteur : IDEC | 💡 Non-contributive

MT_V4_NEW_F5_07 — « Informer l'aidant des ressources (CSAPA, lignes d'écoute, groupes de parole) »
Type : INFO | Acteur : IDEC | 💡 Non-contributive
```

#### Proposition 3.3 — Reformuler et étoffer CAT_03 (1→4 MT)

```
MT_V4_064 REFORMULÉE — « Initier la demande APA auprès du Conseil Départemental »
Type : SEC | Acteur : IDEC | 📍 (au lieu de commentaire)

MT_V4_NEW_F5_08 — « Accompagner le dossier MDPH si handicap reconnu (N16/N30) »
Type : SEC | Acteur : IDEC | 📍 Contributive

MT_V4_NEW_F5_09 — « Demander réévaluation GIR si dégradation constatée »
Type : SEC | Acteur : IDEC | 📍 Contributive

MT_V4_NEW_F5_10 — « Informer l'aidant des droits ouverts par le GIR (APA, aides fiscales, services) »
Type : INFO | Acteur : IDEC | 💡 Non-contributive
```

---

## Manquement 4 — Wording incohérent

#### Proposition 4.1 — Corriger F5_RECO_01

```
Avant : « Suivi comportement addictif + propre suivi si besoin »
Après : « Un suivi spécialisé de l'addiction est recommandé pour votre proche »
Raison : supprimer la confusion V4 (proche) / V1-V3 (aidant)
```

#### Proposition 4.2 — Corriger F5_RECO_02

```
Avant (IDEC) : « Variable selon département (papier ou numérique) — vérifier spécificités »
Après (IDEC) : « Initier la demande APA auprès du Conseil Départemental (format papier ou numérique selon le département) »
Raison : transformer le commentaire en action
```

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | N38 "Parfois" → CAT_02 | #4 K3 + #1 | 🔴 Critique |
| 1.2 | Règle CCC | N38/N39 "Oui" → CAT_02 | #4 K3 + #1 | 🔴 Critique |
| 1.3 | Règle CRIT | N38 ET N39 "Oui" → CAT_02 | #1 | 🔴 Critique |
| 2.1 | Règle CRIT+CCC | E28≥3+E30≥2, E28≥2+E31>7j → CAT_01 | #1 | 🟠 Haute |
| 2.2 | Règle STD+CCC | O53/N30/O54 → CAT_03 | #1 | 🟠 Haute |
| 2.3 | Cadrage | N16, N37, N40, E29 = cadrage | #1 | 🟡 Moyenne |
| 3.1 | MT ×4 | Créer 4 MT pour CAT_01 | #3 | 🔴 Critique |
| 3.2 | MT ×4 | Reformuler + étoffer CAT_02 | #3 | 🔴 Critique |
| 3.3 | MT ×4 | Reformuler + étoffer CAT_03 | #3 | 🔴 Critique |
| 4.1 | Wording | Corriger RECO_01 | #7 | 🟠 Haute |
| 4.2 | Wording | Corriger RECO_02 | #7 | 🟠 Haute |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ❌ 10/12 orphelines | ✅ 12/12 (dont 4 cadrage) |
| #3 — CAT → MT suffisantes | ❌ CAT_01=0, CAT_02/03=1 | ✅ 4 MT par CAT |
| #4 — K3 ≥2 niveaux | ⚠️ CAT_02 ❌ | ✅ 3/3 CAT ≥2 niveaux |
| #7 — Wording cohérent | ⚠️ RECO_01+02 | ✅ Wording corrigé |
| **Score global** | **4/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka.**
