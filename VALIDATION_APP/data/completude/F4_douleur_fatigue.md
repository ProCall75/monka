# 🔍 Complétude MP — F4 — Douleur, fatigue, sommeil et état général

> **Vulnérabilité** : V4 — Fragilité du Proche  
> **Template officiel** : [F4.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V4/F4.md)  
> **Score checklist actuel** : 4/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

F4 est le **plus gros MP de V4** (12 questions) mais aussi le plus lacunaire : **7 questions orphelines sur 12**, aucune CAT avec Standard, 0 MT non-contributive (ORGA/INFO), et 4 incohérences wording. Le MP fonctionne via une seule règle CCC composite qui ne vérifie que 5 questions. Tout le reste (médication, sensoriels, poids, nutrition, ostéoporose) est ignoré.

| # | Manquement | Check | Impact |
|---|---|---|---|
| 1 | **Aucune CAT n'a de Standard** | #4 K3 | Signaux modérés ignorés |
| 2 | **7 questions orphelines** (N44, O3, O5, O7, O15, O22, O26) | #1 | 58% des questions inactives |
| 3 | **4 incohérences wording majeures** | #7 | RECO_03/04/05/10 |
| 4 | **0 MT ORGA/INFO** (100% médicales) | Amélioration | Pas d'évaluation ni d'information |

---

## Manquement 1 — 0 Standard sur les 4 CAT (K3 total)

### Le problème

La seule règle d'activation (CCC_01) nécessite ≥2 symptômes "Oui"/"Déprimée". Un proche avec de la douleur occasionnelle, de la fatigue partielle, des troubles du sommeil intermittents — tout ça "Parfois" — déclenche **zéro action**. C'est la situation la plus courante en gériatrie : des symptômes accumulés à bas bruit.

### Ce que je propose

#### Proposition 1.1 — Règle Standard pour CAT_01

```
SI N11 = « Occasionnellement » OU N12 = « Parfois »
ALORS → V4_F4_STD_01 (Standard) → CAT_01
```

**Raisonnement** : Douleur occasionnelle ou fatigue intermittente → bilan préventif. En gériatrie, la douleur chronique non traitée accélère la perte d'autonomie. Le Standard permet un bilan sans urgence.

#### Proposition 1.2 — Règle Standard pour CAT_02

```
SI N13 = « Parfois » OU N34 = « Parfois »
ALORS → V4_F4_STD_02 (Standard) → CAT_02
```

**Raisonnement** : Troubles du sommeil ou difficultés alimentaires intermittentes. Le Standard permet un premier échange sur l'hygiène de vie et une orientation si nécessaire.

#### Proposition 1.3 — Règle Standard pour CAT_04

```
SI O4 = « Parfois anxieuse ou triste » OU O5 = « En moins bonne santé »
ALORS → V4_F4_STD_03 (Standard) → CAT_04
```

**Raisonnement** : Anxiété/tristesse intermittente ou perception de santé dégradée → orientation vers un suivi psychologique préventif. Le Standard est approprié car il n'y a pas encore de diagnostic de dépression.

---

## Manquement 2 — 7 questions orphelines

### Le problème

| Question | Libellé | Catégorie logique | Pourquoi c'est un problème |
|---|---|---|---|
| **N44** | Changement de poids | CAT_02 | Marqueur de dénutrition ou de pathologie |
| **O3** | Nb médicaments/jour | CAT_03 | Polymédication = risque iatrogène majeur |
| **O5** | Santé comparée à l'âge | CAT_04 | Perception globale de fragilité |
| **O7** | Changements nutrition | CAT_02 | Signal de dénutrition |
| **O15** | Alcool/tabac | CAT_03 | Addiction non couverte par le moteur |
| **O22** | Vue/audition | CAT_03 | Déficit sensoriel non compensé |
| **O26** | Diminution taille | CAT_02 | Marqueur ostéoporose |

### Ce que je propose

#### Proposition 2.1 — Règle Standard pour CAT_02 (questions somatiques)

```
SI N44 = « Oui » OU O7 ∈ { « Oui », « Oui et dénutrie » } OU O26 = « Oui »
ALORS → V4_F4_STD_04 (Standard) → CAT_02
```

**Raisonnement** : Changement de poids, changement nutritionnel, ou diminution de taille sont des marqueurs physiques objectifs nécessitant un bilan. Le seuil est bas (Standard) car ces signaux nécessitent d'abord une investigation.

#### Proposition 2.2 — Règle CCC pour CAT_02 (dénutrition avérée)

```
SI O7 = « Oui et elle est dénutrie »
ALORS → V4_F4_CCC_02 (CCC, ≤ 30j) → CAT_02
```

**Raisonnement** : La dénutrition avérée est un signal grave chez le sujet âgé. Elle nécessite un bilan nutritionnel sous 30 jours.

#### Proposition 2.3 — Règle Standard pour CAT_03 (médication/sensoriels)

```
SI O3 ∈ { « 4 à 6 » } OU O22 contient « Je ne sais pas »
ALORS → V4_F4_STD_05 (Standard) → CAT_03
```

**Raisonnement** : 4 à 6 médicaments est un seuil de vigilance (pas encore à risque élevé). Le "je ne sais pas" pour la vue/audition signale un suivi insuffisant → bilan à programmer.

#### Proposition 2.4 — Règle CCC pour CAT_03 (polymédication/déficit sensoriel)

```
SI O3 = « 7 et plus » OU O22 contient « Mauvais malgré » OU O15 contient « Alcool »
ALORS → V4_F4_CCC_03 (CCC, ≤ 30j) → CAT_03
```

**Raisonnement** :
- **O3 ≥ 7** : Polymédication à haut risque iatrogène. Bilan de médication impératif.
- **O22 "Mauvais malgré"** : Déficit sensoriel non compensé malgré appareillage → consultation spécialiste.
- **O15 "Alcool"** : Consommation excessive → bilan addictologique + interaction médicamenteuse.

#### Proposition 2.5 — O5 en cadrage ou Standard

```
Option A — O5 = cadrage (comme E22 en F2) → pas de règle directe
Option B — SI O5 = « En moins bonne santé » → STD CAT_04 (via proposition 1.3)
```

**Raisonnement** : O5 est une question de perception ("par rapport à une personne du même âge"). C'est plus du cadrage que du déclenchement. L'option B l'inclut dans 1.3 par pragmatisme.

---

## Manquement 3 — 4 incohérences wording

### Le problème

| Reco | Texte utilisateur | Action IDEC | Incohérence |
|---|---|---|---|
| **F4_RECO_03** | Troubles du sommeil | Prescription psychologue | Sommeil ≠ psychologue (sauf si psychogène) |
| **F4_RECO_04** | État bucco-dentaire | Orienter psychiatre | Dentaire ≠ psychiatre |
| **F4_RECO_05** | État nutritionnel | Courrier psychiatre | Nutrition ≠ psychiatre |
| **F4_RECO_10** | État bucco-dentaire | Bilan dénutrition | Doublon RECO_04 + action différente |

### Ce que je propose

#### Proposition 3.1 — Corriger F4_RECO_03

```
Avant : Utilisateur « troubles du sommeil » / IDEC « psychologue »
Après : IDEC « Contacter MT pour évaluation des troubles du sommeil et orientation si besoin »
```

#### Proposition 3.2 — Corriger F4_RECO_04

```
Avant : Utilisateur « état bucco-dentaire » / IDEC « psychiatre »
Après : IDEC « Prendre RDV chirurgien-dentiste pour bilan bucco-dentaire »
```

#### Proposition 3.3 — Corriger F4_RECO_05

```
Avant : Utilisateur « état nutritionnel + psychiatre »
Après : Utilisateur « Faire évaluer l'alimentation de votre proche »
        IDEC « Contacter MT pour bilan nutritionnel et évaluation dénutrition »
```

#### Proposition 3.4 — Supprimer F4_RECO_10

Doublon de F4_RECO_04. Supprimer et conserver F4_RECO_04 corrigé.

---

## Propositions d'amélioration (non bloquantes)

#### Proposition 4.1 — Ajouter MT ORGA/INFO (actuellement 0)

```
MT_V4_NEW_F4_01 — « Évaluer avec l'aidant l'impact de la douleur/fatigue sur le quotidien »
Type : ORGA | Acteur : IDEC | Domaine : 🤝 | 💡 Non-contributive | CAT_01

MT_V4_NEW_F4_02 — « Informer l'aidant des risques liés à la polymédication »
Type : INFO | Acteur : IDEC | Domaine : 🤝 | 💡 Non-contributive | CAT_03

MT_V4_NEW_F4_03 — « Évaluer l'impact de l'état psychologique sur le quotidien »
Type : ORGA | Acteur : IDEC | Domaine : 🤝 | 💡 Non-contributive | CAT_04
```

**Raisonnement** : F4 est le seul MP du moteur avec **0 MT ORGA/INFO**. Tout est "RDV médical" sans évaluation préalable ni information. Ces 3 MT rétablissent la chaîne logique : évaluer → informer → orienter.

#### Proposition 4.2 — Formaliser les cross-activations CRIT

Les 3 règles CRIT utilisent des questions d'autres MPs. Proposer un pattern architectural :
```
Cross-activation : [MP source].[Question] → [MP cible].[Règle].[Catégorie]
F3.N25 → F4.CRIT_01.CAT_04
F5.N38 → F4.CRIT_02.Cross
F5.N39 → F4.CRIT_03.Cross
```

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | N11/N12 "Parfois/Occasionnellement" → CAT_01 | #4 K3 | 🔴 Critique |
| 1.2 | Règle STD | N13/N34 "Parfois" → CAT_02 | #4 K3 | 🔴 Critique |
| 1.3 | Règle STD | O4 "Anxieuse" / O5 "Moins bonne" → CAT_04 | #4 K3 + #1 | 🔴 Critique |
| 2.1 | Règle STD | N44/O7/O26 = "Oui" → CAT_02 | #1 | 🟠 Haute |
| 2.2 | Règle CCC | O7 "Dénutrie" → CAT_02 | #1 | 🟠 Haute |
| 2.3 | Règle STD | O3 "4-6" / O22 "Je ne sais pas" → CAT_03 | #1 + #4 K3 | 🔴 Critique |
| 2.4 | Règle CCC | O3 "7+" / O22 "Mauvais" / O15 "Alcool" → CAT_03 | #1 + #4 K3 | 🔴 Critique |
| 2.5 | Cadrage | O5 = cadrage OU STD CAT_04 | #1 | 🟡 Moyenne |
| 3.1 | Wording | Corriger RECO_03 (sommeil→psy) | #7 | 🟠 Haute |
| 3.2 | Wording | Corriger RECO_04 (dentaire→psychiatre) | #7 | 🟠 Haute |
| 3.3 | Wording | Corriger RECO_05 (nutrition→psychiatre) | #7 | 🟠 Haute |
| 3.4 | Wording | Supprimer RECO_10 (doublon) | #7 | 🟠 Haute |
| 4.1 | MT | Ajouter 3 MT ORGA/INFO | Amélioration | 🟡 Moyenne |
| 4.2 | Architecture | Formaliser cross-activations CRIT | Architecture | 🟡 Moyenne |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ❌ 7/12 orphelines | ✅ 12/12 couvertes |
| #4 — K3 ≥2 niveaux | ❌ 0 Standard, 4 CAT | ✅ Toutes CAT ≥2 niveaux |
| #7 — Wording cohérent | ❌ 4 incohérences | ✅ Wording corrigé |
| **Score global** | **4/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel F4.md.**
