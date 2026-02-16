# 🔍 Complétude MP — F6 — Autonomie fonctionnelle, chutes et aides techniques

> **Vulnérabilité** : V4 — Fragilité du Proche  
> **Template officiel** : [F6.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V4/F6.md)  
> **Score checklist actuel** : 3/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

F6 est le **cas le plus extrême** de V4 : **0 règle d'activation legacy**. Le MP entier fonctionne (ou plutôt ne fonctionne pas) sans aucune logique de déclenchement — les 7 recos ont `activation_rule_id = null`. Paradoxalement, F6 a le plus de MT (19, dont 12 dispatch spécialistes pour O16). Le défi est double : créer toutes les règles de zéro ET rationaliser les 12 MT dispatch.

| # | Manquement | Check | Impact |
|---|---|---|---|
| 1 | **0 règle d'activation** (tout à créer) | #1 + #4 K3 | MP entier sans logique |
| 2 | **12 MT dispatch spécialistes** (architecture) | Design | Question unique : 1 vs 12 MT |
| 3 | **CAT_02 : 1 MT** (domicile sous-dimensionné) | #3 | ASR fragile |
| 4 | **Wording** : RECO_03 incohérent, RECO_05 générique | #7 | |
| 5 | **MT mal affectée** : MT_V4_066 (fugue) dans F6 au lieu de F3 | #5 | |

---

## Manquement 1 — 0 règle (tout à créer)

### Le problème

F6 est le seul MP de V4 entièrement sans logique d'activation. Aucune question ne déclenche aucune action. Toutes les règles ci-dessous sont des propositions de création.

### Ce que je propose

#### Proposition 1.1 — Règles CAT_01 (Chutes)

```
STD : SI O6 = « Oui sans gravité » OU E32 = « Parfois »
ALORS → V4_F6_STD_01 → CAT_01
Sens : Risque de chute émergent — bilan préventif

CCC : SI O6 = « Oui complication ou plusieurs fois »
ALORS → V4_F6_CCC_01 → CAT_01
Sens : Chutes graves ou répétées — bilan urgent

CCC : SI E32 = « Oui » ET O6 ≠ « Non »
ALORS → V4_F6_CCC_02 → CAT_01
Sens : Transferts impossibles + chutes — risque majeur
```

#### Proposition 1.2 — Règles CAT_02 (Domicile)

```
STD : SI O51 = « Oui »
ALORS → V4_F6_STD_02 → CAT_02
Sens : L'aidant envisage adaptation → accompagnement

STD : SI N32 = « Aucune » ET (E32 = « Oui » OU O6 ≠ « Non »)
ALORS → V4_F6_STD_03 → CAT_02
Sens : 0 aide technique malgré perte d'autonomie

CCC : SI N32 = « Aucune » ET E32 = « Oui » ET O6 = « Oui complication »
ALORS → V4_F6_CCC_03 → CAT_02
Sens : 0 aide + transferts impossibles + chutes graves
```

#### Proposition 1.3 — Règles CAT_03 (Pathologies)

```
STD : SI O16 ≠ « Aucun » ET O16 ≠ « JNSP »
ALORS → V4_F6_STD_04 → CAT_03
Sens : ≥1 pathologie déclarée → suivi spécialiste

CCC : SI COUNT(O16) ≥ 3
ALORS → V4_F6_CCC_04 → CAT_03
Sens : Poly-pathologie → coordination spécialisée
```

> ⚠️ **O16 est à choix multiples** : la logique de règle doit gérer `COUNT` et `CONTAINS` sur des arrays. Contrainte technique pour le moteur.

#### Proposition 1.4 — Règles CAT_04 (Autonomie quotidienne)

```
STD : SI O11 = « Parfois » OU O12 = « Parfois » OU E33 = « Parfois »
ALORS → V4_F6_STD_05 → CAT_04
Sens : Autonomie partiellement dégradée

CCC : SI AU MOINS 2 parmi : O11 = « Oui », O12 = « Non », E33 = « Oui »
ALORS → V4_F6_CCC_05 → CAT_04
Sens : Autonomie sévèrement réduite (≥2 actes perdus)

CRIT : SI O11 = « Oui » ET O12 = « Non » ET E33 = « Oui »
ALORS → V4_F6_CRIT_01 → CAT_04
Sens : Autonomie totalement perdue → réorganisation prise en charge urgente
```

---

## Manquement 2 — Architecture 12 MT dispatch spécialistes

### Le problème

12 MT identiques ("RDV [spécialiste]") conditionnées par les sous-items de O16. Ce n'est pas le pattern classique du moteur Monka — c'est un mécanisme de dispatch conditionnel unique.

### Ce que je propose

#### Proposition 2.1 — MT paramétrique (recommandé)

```
Remplacer les 12 MT par 1 MT paramétrique :
MT_V4_069_PARAM — « Prendre RDV avec le spécialiste correspondant à la pathologie identifiée »
Type : SEC | Acteur : IDEC | 📍 Contributive

+ MAPPING en annexe :
| Pathologie O16 | Spécialiste | MT_ID legacy |
|---|---|---|
| Respiratoire | Pneumologue | MT_V4_069 |
| Auditif | ORL | MT_V4_070 |
| Génito-urinaire | Néphrologue/Urologue | MT_V4_071 |
| Cardiovasculaire | Cardiologue | MT_V4_072 |
| Dermatologique | Dermatologue | MT_V4_073 |
| Endocrinienne/Métabolique | Diabétologue/Endocrinologue | MT_V4_074/078 |
| Cancer | Cancérologue | MT_V4_075 |
| Neurologique | Neurologue | MT_V4_076 |
| Musculo-squelettique | Rhumatologue | MT_V4_077 |
| Gastro-intestinal | Gastro-entérologue | MT_V4_080 |
| Visuel | Ophtalmologue | (manquant) |
| Génétique | Généticien | (manquant) |
| Psychiatrique | Psychiatre | (déjà en F3) |
```

**Avantage** : Simplifie la structure (1 MT au lieu de 12). Le mapping est résolu à l'exécution.
**Inconvénient** : Le moteur doit implémenter la résolution du mapping.

#### Proposition 2.2 — Alternative : garder les 12 MT

Si le moteur ne supporte pas les MT paramétriques, garder les 12 MT distinctes mais ajouter les spécialistes manquants (ophtalmologue, généticien).

> **Décision Dr. Monka requise** : choix 2.1 (paramétrique) ou 2.2 (12 MT) ?

---

## Manquement 3 — CAT_02 sous-dimensionnée (1 MT)

### Le problème

1 seule MT pour toute l'adaptation du domicile et les aides techniques. Pas d'évaluation ergo, pas d'info financière.

### Ce que je propose

#### Proposition 3.1 — Étoffer CAT_02

```
MT_V4_NEW_F6_01 — « Contacter un ergothérapeute pour évaluation complète du domicile »
Type : SEC | Acteur : IDEC | 📍 Contributive

MT_V4_NEW_F6_02 — « Lister les aides techniques en place (N32) et identifier les manques »
Type : ORGA | Acteur : IDEC | 💡 Non-contributive

MT_V4_NEW_F6_03 — « Informer l'aidant des aides financières pour adaptation domicile (crédit d'impôt, APA, PCH) »
Type : INFO | Acteur : IDEC | 💡 Non-contributive
```

---

## Manquement 4 — Wording incohérent

#### Proposition 4.1 — Corriger F6_RECO_03

```
Avant : Utilisateur « bilan nutritionnel » / IDEC « urologue + kiné »
Après : Séparer en 2 recos distinctes :
  F6_RECO_03a — Utilisateur : « Faire évaluer les difficultés d'incontinence »
                 IDEC : « MT pour lettre adressage urologue + prescription kiné rééducation »
  F6_RECO_03b — Utilisateur : « Vérifier que votre proche se nourrit correctement »
                 IDEC : « RDV nutritionniste pour bilan nutritionnel »
```

#### Proposition 4.2 — Corriger F6_RECO_05

```
Avant : « Un suivi régulier est à prévoir selon les préconisations »
Après : « Veillez au suivi spécialiste pour chaque pathologie identifiée — un RDV est recommandé »
Raison : rendre actionnable (quel suivi ? quel spécialiste ?)
```

---

## Manquement 5 — MT mal affectée

#### Proposition 5.1 — Déplacer MT_V4_066

```
MT_V4_066 — « Évaluer le risque de fugue ou de perte »
Actuellement : F6 > CAT_01 (chutes)
Proposé : F3 > CAT_01 (sécurisation comportements)
Raison : La fugue est liée à la désorientation (E26, F3), pas aux chutes (F6).
```

---

## Propositions d'amélioration (non bloquantes)

#### Proposition 6.1 — MT ORGA/INFO pour CAT_04

```
MT_V4_NEW_F6_04 — « Évaluer les capacités restantes pour les gestes quotidiens (manger, téléphone, transferts) »
Type : ORGA | Acteur : IDEC | 💡 Non-contributive | CAT_04

MT_V4_NEW_F6_05 — « Former l'aidant aux aides à l'alimentation et aux gestes de sécurité »
Type : INFO | Acteur : IDEC | 💡 Non-contributive | CAT_04
```

**Raisonnement** : E33 (utilisation appareils) n'a aucune MT. Les 3 MT existantes sont toutes MED (orientation médicale) sans évaluation préalable.

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD+CCC | CAT_01 chutes (O6, E32) | #1 + #4 | 🔴 Critique |
| 1.2 | Règle STD+CCC | CAT_02 domicile (O51, N32) | #1 + #4 | 🔴 Critique |
| 1.3 | Règle STD+CCC | CAT_03 pathologies (O16) — array logic | #1 + #4 | 🔴 Critique |
| 1.4 | Règle STD+CCC+CRIT | CAT_04 autonomie (O11, O12, E33) | #1 + #4 | 🔴 Critique |
| 2.1 | Architecture | 1 MT paramétrique + mapping (vs 12 MT) | Design | 🟠 Haute |
| 3.1 | MT ×3 | Étoffer CAT_02 (ergo, inventaire, info financière) | #3 | 🟠 Haute |
| 4.1 | Wording | Séparer RECO_03 (incontinence ≠ nutrition) | #7 | 🟠 Haute |
| 4.2 | Wording | Corriger RECO_05 (trop générique) | #7 | 🟠 Haute |
| 5.1 | Réaffectation | MT_V4_066 (fugue) → F3 | #5 | 🟡 Moyenne |
| 6.1 | MT ×2 | ORGA+INFO pour CAT_04 (E33 non couvert) | Amélioration | 🟡 Moyenne |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ❌ 0 règle legacy | ✅ 8/8 couvertes |
| #3 — CAT → MT suffisantes | ⚠️ CAT_02=1 MT | ✅ 4 MT CAT_02 |
| #4 — K3 ≥2 niveaux | ❌ 0 règle | ✅ 4/4 CAT ≥2 niveaux |
| #5 — MT orphelines | ⚠️ MT_V4_066 | ✅ Réaffectée |
| #7 — Wording cohérent | ❌ RECO_03/05 | ✅ Corrigé |
| **Score global** | **3/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka.**
