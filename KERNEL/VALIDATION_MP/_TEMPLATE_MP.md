# 📋 Fiche de Validation MP — [MP_ID] — [NOM DU MP]

> **Vulnérabilité** : [V_ID] — [NOM V]  
> **ASR** : « [OBJECTIF DU MP] »  
> **Date de validation** : ../../2026  
> **Validé par** : ☐ Dr. Monka | ☐ Antonin  
> **Statut** : 🔲 À valider

---

## QUESTIONS TRANSVERSALES (à se poser AVANT et APRÈS chaque action)

> Ces questions traversent toutes les actions. Y revenir régulièrement.

| # | Question transversale | Quand s'y référer |
|---|---|---|
| T1 | **Cohérence inter-MP** : est-ce que les MT/recos de ce MP risquent de doublonner avec un autre MP de la même vulnérabilité ? Ou d'une autre vulnérabilité ? | Actions 1, 3, 4, 6 |
| T2 | **Couverture clinique** : est-ce qu'on couvre le minimum vital pour un patient dans cette situation ? Un professionnel pourrait-il dire "il manque quelque chose" ? | Actions 1, 3 |
| T3 | **Actionnabilité** : est-ce que chaque élément produit (reco, MT, wording) est concrètement exécutable par l'acteur désigné ? Pas de formulation floue. | Actions 3, 4, 5 |
| T4 | **Proportionnalité** : est-ce que le nombre d'éléments (catégories, règles, MT) est proportionnel à la complexité clinique du MP ? Ni trop, ni pas assez. | Actions 1, 2, 3 |
| T5 | **Autonomie aidant** : pour chaque MT, l'aidant pourrait-il la réaliser seul ? Si oui, l'acteur devrait peut-être être `Aidant (autonome)`. | Actions 3, 4 |
| T6 | **Chaîne d'action** : dans chaque catégorie, les MT forment-elles une séquence logique (diagnostiquer → informer → structurer → sécuriser) ? | Actions 3, 4 |

---

## 0. DONNÉES FIGÉES (ne bougent pas)

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification | Options de réponse |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

> Total : X questions rattachées à ce MP

### Questions candidates exclues

> Pour CHAQUE question de la vulnérabilité non rattachée à ce MP : analyse de pertinence.

| Question ID | Libellé | Pertinente pour ce MP ? | Raisonnement |
|---|---|---|---|
| | | ❌ Non | |

---

## ACTION 1 — QUOI : Catégories de Reco/Actions

> **Objectif** : Identifier les types d'actions DIFFÉRENTES que ce MP peut proposer.  
> **Méthode** : Ignorer la criticité. Se demander : "Quelles grandes actions cliniques distinctes pour ce MP ?"  
> **Source** : Jugement clinique + recos legacy existantes

### 🧠 Questions à se poser — Action 1

| # | Question | Pourquoi c'est important |
|---|---|---|
| 1.1 | Les catégories couvrent-elles des dimensions cliniques **réellement distinctes** ? Ou certaines se chevauchent ? | Éviter les doublons → chaque CAT = 1 axe d'action unique |
| 1.2 | Y a-t-il une action clinique évidente que **aucune catégorie** ne couvre ? | Détecter les angles morts |
| 1.3 | Faut-il **fusionner** deux catégories proches ? | Simplifier si la distinction n'apporte pas de valeur clinique |
| 1.4 | Faut-il **éclater** une catégorie trop large en deux ? | Granularité suffisante pour que chaque CAT soit actionnable |
| 1.5 | Combien de catégories est raisonnable pour ce MP ? (T4 — proportionnalité) | Un MP simple = 1-2 CAT ; un MP complexe = 3-4 CAT max |

### Catégories identifiées

| # | Catégorie ID | Nom de l'action | Description clinique courte | Source |
|---|---|---|---|---|
| 1 | [MP_ID]_CAT_01 | | | Legacy ✅ / 🤖 IA |
| 2 | [MP_ID]_CAT_02 | | | |
| 3 | [MP_ID]_CAT_03 | | | |

### 🧠 Raisonnement

> _(Expliquer ICI pourquoi ces N catégories, pas N+1 ou N-1. Justifier chaque choix.)_

> **Décision Dr. Monka** : ☐ Validé X catégories | ☐ Ajouts | ☐ Suppressions

---

## ACTION 2 — QUAND : Règles d'activation par catégorie

> **Objectif** : Pour chaque catégorie, quelles Q/A la déclenchent et à quel niveau ?  
> **Règle K3** : S'applique À L'INTÉRIEUR de chaque catégorie (pas entre catégories)  
> **Format obligatoire** : Afficher la question en texte complet avec toutes ses options. Mettre en **gras** la réponse déclenchante.

### 🧠 Questions à se poser — Action 2

| # | Question | Pourquoi c'est important |
|---|---|---|
| 2.1 | **Chaque question** du MP est-elle utilisée dans **au moins 1 règle** ? Si non, pourquoi cette question existe dans le MP ? | Détecte les questions orphelines |
| 2.2 | **Chaque combinaison de réponses** cliniquement significative a-t-elle une règle ? | Évite les trous de couverture |
| 2.3 | Les niveaux de criticité sont-ils **cliniquement justifiés** ? Pourquoi CCC et pas Standard ? Pourquoi Critique ? | La criticité doit refléter l'urgence réelle, pas un choix arbitraire |
| 2.4 | Y a-t-il des **combos de réponses** (multi-questions) qui signalent un niveau supérieur ? | Détecte les CCC composites potentiels |
| 2.5 | Y a-t-il des **réponses extrêmes** non exploitées ? (ex: N7 = "Arrêt" pour R1) | Les signaux forts doivent déclencher une règle Critique |
| 2.6 | Chaque catégorie a-t-elle **au minimum 2 niveaux** (Standard + CCC) ? | K3 impose la granularité |
| 2.7 | Une même règle peut-elle **activer plusieurs catégories** ? Si oui, c'est voulu ? | Assurer la cohérence du modèle d'activation |

### Catégorie 1 — [NOM]

> **Question complète :** « [TEXTE INTÉGRAL DE LA QUESTION] »
> **Options :** ○ Option A / ○ Option B / ○ **Option C (déclenchante)**

| Niveau | Règle ID | Condition SI | ALORS | Sens clinique | Source |
|---|---|---|---|---|---|
| 🔴 Critique | | | | | |
| 🟠 CCC | | | | | |
| 🟢 Standard | | | | | |

### Catégorie N — [NOM] *(dupliquer si besoin)*

*(Même format — seulement les niveaux qui ont une Q/A réelle)*

### 🧠 Raisonnement

> _(Justifier le choix des niveaux. Pourquoi tel combo = CCC et pas Standard ? Pourquoi tel signal = Critique ?)_

### 💡 Propositions d'amélioration — Règles

| # | Proposition | Justification |
|---|---|---|
| | | |

> **Contrôle K3** : ☐ Vérifié — pas de chevauchement entre niveaux d'une même catégorie  
> **Décision Dr. Monka** : ☐ Validé | ☐ Ajouts | ☐ Modifications

---

## ACTION 3 — COMMENT : Micro-Tâches par catégorie

> **Objectif** : Quelles MT concrètes pour chaque catégorie ?  
> **Principe** : Les MT sont rattachées à la catégorie, PAS au niveau de criticité. Le niveau change le wording, pas les tâches.

### 🧠 Questions à se poser — Action 3

| # | Question | Pourquoi c'est important |
|---|---|---|
| 3.1 | Les MT couvrent-elles la **chaîne complète** d'action de la catégorie ? (T6 — séquence logique : ORGA → INFO → STRUC → SEC) | Détecte les maillons manquants |
| 3.2 | Y a-t-il des MT dans **d'autres catégories ou d'autres MP** qui devraient être ici ? | Redistribution potentielle |
| 3.3 | Y a-t-il des MT ici qui **appartiennent plutôt à une autre catégorie** ? | Mauvaise affectation thématique |
| 3.4 | **Pourquoi pas 1 MT de plus ?** → Redondance ? Hors scope IDEC ? Couvert par un autre MP ? | Force à justifier la complétude |
| 3.5 | **Pourquoi pas 1 MT de moins ?** → On perdrait quoi ? Quelle action clinique disparaîtrait ? | Force à justifier la nécessité |
| 3.6 | La catégorie a-t-elle au moins **1 MT contributive** (📍 STRUC/SEC/MED) ? Sinon, l'ASR est-elle possible ? | Condition de validation ASR |
| 3.7 | Le **mix de types** est-il équilibré ? (T4 — pas que du ORGA, pas que du INFO) | Variété = couverture clinique |

### CAT_01 — [NOM]

| MT_ID | Libellé MT | Type | Acteur | 📍/💡 | Source |
|---|---|---|---|---|---|
| | | | | | |

#### 🎯 Pourquoi N MT — ni plus, ni moins ?

**Pourquoi pas 1 de moins ?**
- _(Pour chaque MT : si on l'enlève, qu'est-ce qu'on perd ?)_

**Pourquoi pas 1 de plus ?**
- _(Lister les MT candidates rejetées et pourquoi)_

### CAT_N — [NOM] *(dupliquer pour chaque catégorie)*

*(Même format)*

### ✅ Décisions Action 3

| # | Proposition | Décision | MT créée |
|---|---|---|---|
| | | | |

> **Condition ASR par catégorie** :
> - CAT_0X : 📍 X → ASR complète/partielle/impossible

> **Décision Dr. Monka** : ☐ Validé | ☐ Modifications MT

---

## ACTION 4 — ENRICHIR : Acteurs, Typologie, Domaine

> **Objectif** : Compléter chaque MT avec ses métadonnées (type, acteur, domaine médical/médico-social)
> **Acteurs existants DB** : `IDEC`, `MT` (médecin traitant), `Aidant (autonome)`, `AS` (assistante sociale)
> **Domaines** : 🏥 Médical / 🤝 Médico-social

### 🧠 Questions à se poser — Action 4

| # | Question | Pourquoi c'est important |
|---|---|---|
| 4.1 | Le **type MED** est-il représenté ? Si aucune MT n'est médicale, est-ce justifié ? | Certains MP nécessitent une action médicale directe |
| 4.2 | L'**acteur** est-il le bon ? L'IDEC est-il vraiment le plus légitime ou est-ce l'AS, le MT, l'aidant ? | Acteur = celui qui FAIT l'action, pas celui qui la prescrit |
| 4.3 | Y a-t-il des MT où l'**aidant peut agir seul** (autonome) ? (T5) | Certaines MT d'INFO/ORGA sont faisables sans pro |
| 4.4 | Le **domaine** (🏥/🤝) est-il correct ? Une MT "orienter vers l'AS" est médico-sociale, pas médicale. | Cohérence avec la filière |
| 4.5 | Faut-il créer un **nouvel acteur** qui n'existe pas encore en DB ? | Si un acteur externe récurrent apparaît (plateforme, structure territoriale…) |
| 4.6 | Y a-t-il un **attribut manquant** (ex: prescription nécessaire, délai, prérequis) ? | Enrichir les métadonnées pour le workflow |
| 4.7 | Les MT suivent-elles un **ordre logique** au sein de chaque catégorie ? (T6) | Séquence d'exécution = qualité du parcours |

### Tableau consolidé des MT de ce MP

| MT_ID | Libellé | Type | Acteur | Domaine | 📍/💡 | Catégorie | Source |
|---|---|---|---|---|---|---|---|
| | | STRUC/SEC/MED/INFO/ORGA | | 🏥/🤝 | 📍/💡 | CAT_0X | |

> **Résumé** :  
> - Total MT : X  
> - Domaine 🏥 Médical : X / Domaine 🤝 Médico-social : X
> - Contributives (📍) : X → STRUC: X, SEC: X, MED: X  
> - Non-contributives (💡) : X → INFO: X, ORGA: X

### 💡 Propositions d'amélioration — Types, acteurs et domaine

| # | Proposition | Justification |
|---|---|---|
| | | |

> **Décision Dr. Monka** : ☐ Validé | ☐ Modifier les types/acteurs/domaines

---

## ACTION 5 — WORDING : En 2 phases

> **Principe** : L'Action 5 se fait APRÈS l'Action 4 (on a les MT enrichies).
>
> **Phase 1** : Valider le wording de base. **Reco** = conseil succinct (label court, un cap). **MT** = action concrète (verbe d'action IDEC + Utilisateur).
>
> **Phase 2** : Versionner le wording par criticité (Standard/CCC/Critique). Reco + MT versionnées. Seuls les niveaux qui existent.

### 🧠 Questions à se poser — Action 5

| # | Question | Pourquoi c'est important |
|---|---|---|
| 5.1 | La **reco** est-elle un label court (un cap) et pas une phrase ? Pas un verbe d'action ? | Reco ≠ tâche. C'est un conseil succinct. |
| 5.2 | Chaque **MT** pousse-t-elle à l'action des deux côtés (IDEC + Utilisateur) ? | L'aidant aussi doit être orienté vers une action concrète |
| 5.3 | Les MT **ORGA** ont-elles un wording Utilisateur ? (Kernel : toutes les MT ont 2 versions) | Pas de MT "interne IDEC" — l'aidant a une version auto-observation |
| 5.4 | La **gradation** entre niveaux est-elle perceptible ? (Standard = doux, CCC = recommandé, Critique = urgent) | L'escalade doit être claire pour l'aidant et l'IDEC |
| 5.5 | **Toutes les MT** sont-elles versionnées en Phase 2, pas seulement des "exemples clés" ? | Un versioning partiel ne permet pas la validation |
| 5.6 | Le **ton** est-il adapté à chaque cible ? IDEC = directif pro. Utilisateur = bienveillant mais orienté action. | Pas d'infantilisation ni de jargon mal placé |

### Phase 1 — Wording de base : MT et Recos

> **Règle de wording** :
> - **Reco** = conseil succinct. Pas une phrase, pas un verbe d'action. Un label court qui dit "quoi" sans détailler "comment".
> - **MT** = action concrète. Verbe d'action des deux côtés. L'aidant doit aussi être poussé à agir.

#### Wording des MT (IDEC + Utilisateur)

| MT_ID | CAT | Libellé | Wording IDEC | Wording Utilisateur | ✅/❌ |
|---|---|---|---|---|---|
| | | | | | |

#### Wording des Recos de base

| CAT | Reco Utilisateur _(conseil succinct)_ | Reco IDEC _(directive)_ | ✅/❌ |
|---|---|---|---|
| | | | |

> **Décision Dr. Monka** : ☐ Wording de base validé | ☐ Corrections à apporter

---

### Phase 2 — Versioning par criticité (Reco + MT)

> **Principe** : Le niveau de criticité modifie le wording de la reco ET des MT. L'action reste la même — c'est le degré d'urgence qui change. On ne versionne que les niveaux qui existent.

#### CAT_0X — [NOM] *(dupliquer pour chaque catégorie)*

> Niveaux existants : 🟢 STD_XX / 🟠 CCC_XX / 🔴 CRIT_XX

**Reco versionnée :**

| Niveau | Reco Utilisateur | Reco IDEC |
|---|---|---|
| 🟢 Standard | | |
| 🟠 CCC (≤ 30j) | | |
| 🔴 Critique (≤ 7j) | | |

**MT versionnées :**

| MT_ID | 🟢 Standard (Utilisateur) | 🟠 CCC (Utilisateur) | 🔴 Critique (Utilisateur) |
|---|---|---|---|
| | | | |

> **Décision Dr. Monka** : ☐ Versioning validé | ☐ Corrections

---

## ACTION 6 — COHÉRENCE : Prévention + Contrôle global

### 🧠 Questions à se poser — Action 6

| # | Question | Pourquoi c'est important |
|---|---|---|
| 6.1 | La **reco prévention** est-elle formulée (⚪) ? Que se passe-t-il quand aucune règle ne se déclenche ? | L'absence d'alerte ≠ absence de besoin. Le mode prévention est obligatoire. |
| 6.2 | Les **MT de prévention** sont-elles suffisantes ? Combien en faut-il ? (même logique "pourquoi N et pas N±1") | Éviter le vide ou le surplus |
| 6.3 | L'**ASR** (Action Seuil de Réussite) est-elle formulée clairement ? Quel est le critère de succès objectif ? | L'ASR est le juge final de la validation du MP |
| 6.4 | Y a-t-il des **doublons avec d'autres MP** de la même vulnérabilité ? (T1) | Check inter-MP obligatoire |
| 6.5 | La **checklist 8 points** est-elle à jour ? Reflète-t-elle les décisions prises ? | La checklist doit être un miroir fidèle de l'état actuel |

### 6.1 — Reco prévention (⚪)

> S'affiche quand le MP n'est PAS activé (aucune règle n'a firé)

| | Reco Utilisateur _(conseil succinct)_ | Reco IDEC _(directive)_ |
|---|---|---|
| ⚪ Prévention | | |

**MT de prévention :**

| MT_ID | Libellé | Type | Wording IDEC | Wording Utilisateur |
|---|---|---|---|---|
| | | INFO/ORGA | | |

### 6.2 — Checklist de cohérence

| # | Vérification | Avant | Après | Détail |
|---|---|---|---|---|
| 1 | Chaque question du MP → ≥1 règle d'activation | | | |
| 2 | Chaque règle d'activation → ≥1 version de reco | | | |
| 3 | Chaque catégorie de reco → ses MT assignées | | | |
| 4 | K3 respecté (≥2 niveaux par catégorie) | | | |
| 5 | Aucune MT orpheline | | | |
| 6 | Reco prévention présente | | | |
| 7 | Wording reco = conseil succinct, MT = verbe d'action | | | |
| 8 | Sens clinique renseigné pour chaque règle | | | |

> **Anomalies détectées** :  
> _(lister ici)_

---

## SYNTHÈSE FINALE

| Métrique | Legacy | Après validation |
|---|---|---|
| Catégories de reco | | |
| Règles d'activation | 🟢:_ 🟠:_ 🔴:_ | 🟢:_ 🟠:_ 🔴:_ |
| MT totales | | |
| MT contributives | | |
| Domaine 🏥 / 🤝 | | |
| ASR | | |
| Reco prévention | | |
| Checks OK | /8 | /8 |

### Résumé des décisions prises

| # | Décision | Statut |
|---|---|---|
| | | ✅ Validé / 💡 Proposé / ☐ En attente |

### Décisions restantes

| # | Décision | Priorité |
|---|---|---|
| | | 🔴/🟠/🟡 |

### Validation

| Validateur | Statut | Date |
|---|---|---|
| Dr. Monka | ☐ Validé / ☐ À revoir | |
| Antonin | ☐ Validé / ☐ À revoir | |

---

> 🔒 **Ce MP est verrouillé une fois les deux validations obtenues.**
