# 🔍 Complétude MP — S2 — Inquiétudes pour la sécurité

> **Vulnérabilité** : V3 — Santé de l'Aidant  
> **Template officiel** : [S2.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V3/S2.md)  
> **Score checklist actuel** : 6/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

S2 a 4 questions et 8 MT — un ratio MT/Q de 2.0 qui est correct (comparable à V2). Le problème est **structurel** : 2 questions (E12, E13) n'activent aucune règle dans S2, et une catégorie n'a qu'un seul niveau d'activation.

| # | Manquement | Check concerné | Impact |
|---|---|---|---|
| 1 | **2 questions sans règle S2** (E12, E13) — activent S1 en cross-MP uniquement | Check #1 | Inquiétudes sécuritaires intermédiaires ignorées dans S2 |
| 2 | **CAT_02 a 1 seul niveau** (Standard uniquement) | Check #4 | Pas d'escalade CCC pour l'intervention CMP |

---

## Manquement 1 — E12 et E13 sans règle S2

### Le problème

Les questions E12 et E13 mesurent les **inquiétudes sécuritaires** de l'aidant vis-à-vis du proche. Elles « appartiennent » thématiquement à S2 mais n'activent aucune règle dans S2. Elles activent uniquement des règles **critiques dans S1** en cross-MP :

| Question | Libellé | Options | Activation actuelle |
|---|---|---|---|
| **E12** | Inquiet que le proche se fasse du mal | Non / **Parfois** / Oui, souvent | E12 = « Oui, souvent » → V3_S1_CRIT_01 (cross-MP S1) |
| **E13** | Inquiet que le proche mette autrui en danger | Non / **Parfois** / Oui | E13 = « Oui » → V3_S1_CRIT_02 (cross-MP S1) |

**Ce qui manque** : les réponses **intermédiaires** (« Parfois ») ne déclenchent rien du tout — ni dans S2, ni dans S1. Un aidant qui répond « Parfois, selon les périodes » à E12 exprime une inquiétude réelle mais pas au niveau critique. C'est exactement le type de signal qui devrait déclencher une action Standard dans S2 : informer, tracer, surveiller l'évolution.

### Comparaison avec V1/V2

En V1/V2, **chaque question active au moins une règle dans son propre MP**. Il n'existe aucun cas où une question « propriété » d'un MP n'active que des règles dans un autre MP. Le cross-MP S1 pour E12/E13 est cliniquement justifié au niveau Critique, mais le fait que « Parfois » ne déclenche rien est une lacune.

### Ce que je propose

#### Proposition 1.1 — Règle Standard pour E12 dans S2

```
SI E12 = « Parfois, selon les périodes »
ALORS → V3_S2_STD_02 (Standard) → CAT_02 (intervention médico-sociale) + CAT_03 (soutien psy)
```

**Raisonnement** : L'aidant exprime une inquiétude épisodique pour la sécurité de son proche. Ce n'est pas assez grave pour le Critique (V3_S1_CRIT_01 = « Oui, souvent »), mais c'est un signal clinique qui mérite :
- **CAT_02** : Proposer un échange avec l'IDEC pour évaluer la nature des inquiétudes (quand ? dans quels contextes ?). Si les inquiétudes sont liées à des troubles du comportement, orienter vers le CMP.
- **CAT_03** : L'inquiétude pour la sécurité du proche est une source de stress majeure → le soutien psychologique est pertinent même au niveau « Parfois ».

**Pourquoi Standard et pas CCC ?** « Parfois, selon les périodes » indique que le risque n'est pas permanent. Un Standard est proportionné — il déclenche une évaluation sans urgence. Si l'évaluation révèle un risque plus élevé, le suivi IDEC ajustera.

#### Proposition 1.2 — Règle Standard pour E13 dans S2

```
SI E13 = « Parfois »
ALORS → V3_S2_STD_03 (Standard) → CAT_02 (intervention médico-sociale)
```

**Raisonnement** : Même logique que E12. L'aidant exprime que le proche met parfois d'autres personnes en danger. Ce signal intermédiaire justifie une évaluation par l'IDEC et potentiellement une orientation vers le CMP, mais sans l'urgence du Critique (E13 = « Oui » → V3_S1_CRIT_02).

**Pourquoi seulement CAT_02 et pas CAT_03 ?** Le danger pour autrui est davantage un problème de sécurisation médico-sociale (CMP, surveillance, adaptation du cadre de vie) qu'un problème de soutien psychologique de l'aidant. Le stress de l'aidant face au danger pour autrui est réel, mais la priorité clinique est la sécurisation du contexte.

---

## Manquement 2 — CAT_02 mono-niveau

### Le problème

La catégorie **CAT_02 (Intervention médico-sociale renforcée — CMP)** n'a qu'un seul niveau d'activation : Standard (via V3_S2_STD_01, E9 = Non). En V1/V2, les catégories ont au minimum 2 niveaux pour permettre l'escalade.

Le CMP est un dispositif lourd (centre médico-psychologique avec suivi infirmier rapproché). Il est logique de prévoir une escalade quand les inquiétudes sécuritaires se combinent avec l'isolement.

### Ce que je propose

#### Proposition 2.1 — Règle CCC pour CAT_02

```
SI E8 ∈ {Souvent, Tout le temps} ET (E12 = « Parfois » OU E13 = « Parfois »)
ALORS → V3_S2_CCC_02 (CCC) → CAT_02
```

**Raisonnement** : Quand l'aidant est à la fois isolé émotionnellement (E8 élevé) ET inquiet pour la sécurité du proche (E12 ou E13 = « Parfois »), la situation est plus grave que chaque facteur isolé :
- **Isolement + inquiétude sécuritaire** = l'aidant fait face seul à un risque. Il n'a pas de relais pour partager la surveillance ni de soutien émotionnel pour gérer l'angoisse.
- Le CCC est justifié car cette combinaison augmente significativement le risque de passage à l'acte (négligence du proche par épuisement de l'aidant, ou effondrement psychologique de l'aidant).
- L'intervention CMP en CCC (≤ 30 jours) permet un suivi rapproché avant que la situation ne devienne critique.

**Alternative** : Utiliser uniquement E9 = Non + E12/E13 ≠ Non comme CCC (sans E8). Plus simple, mais moins fin cliniquement. À discuter.

---

## Proposition bonus — MT INFO pour CAT_03

### Le contexte

Actuellement, CAT_03 (soutien psychologique) a 2 MT : MT_V3_001 (SEC, orienter vers le psychologue) et MT_V3_010 (ORGA, noter l'isolement). Il manque une MT d'**information** — le premier pas avant l'orientation.

### Proposition 3.1 — MT INFO pour CAT_03

```
MT_V3_NEW_04 — « Informer l'aidant sur les dispositifs de soutien psychologique disponibles (psychologue, groupe de parole, ligne d'écoute) »
Type : INFO | Acteur : IDEC | Domaine : médico-social | 💡 Non-contributive
```

**Raisonnement** : Beaucoup d'aidants ne connaissent pas les dispositifs d'aide psychologique existants (groupes de parole, lignes d'écoute comme Allo Maltraitance, psychologues spécialisés en accompagnement des aidants). L'information est la première étape de l'orientation — avant de « proposer un soutien psychologique » (MT_V3_001), l'IDEC doit d'abord informer l'aidant de ce qui existe.

En V1/V2, les catégories de soutien ont systématiquement une MT INFO en amont de la MT SEC d'orientation.

---

## Observation — MT_V3_001 acteur

### Le contexte

MT_V3_001 (« Orienter vers un soutien psychologique ») est assignée à l'acteur **Psychologue** en DB. C'est discutable car c'est l'**IDEC** qui initie l'orientation, pas le psychologue qui s'auto-saisit.

### Ma recommandation

Changer l'acteur de MT_V3_001 de « Psychologue » à **« IDEC »**. L'IDEC est l'acteur qui réalise l'action (orienter). Le psychologue est le **destinataire** de l'orientation, pas l'initiateur.

> ⚠️ Ce changement est mineur mais important pour la cohérence du modèle acteur. En V1/V2, les MT sont systématiquement assignées à l'acteur qui RÉALISE l'action, pas à celui qui la reçoit.

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | E12 = « Parfois » → CAT_02 + CAT_03 | #1 | 🟠 Haute |
| 1.2 | Règle STD | E13 = « Parfois » → CAT_02 | #1 | 🟠 Haute |
| 2.1 | Règle CCC | E8 élevé + E12/E13 « Parfois » → CCC CAT_02 | #4 | 🟡 Moyenne |
| 3.1 | MT INFO | Informer sur les dispositifs psy | Bonus | 🟡 Moyenne |
| — | Correction | MT_V3_001 acteur Psychologue → IDEC | Bonus | 🟢 Basse |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ⚠️ 2/4 questions activent S2 | ✅ 4/4 questions activent S2 |
| #4 — K3 ≥2 niveaux | ⚠️ CAT_02 mono-niveau | ✅ CAT_02 = STD + CCC |
| **Score global** | **6/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel S2.md.**
