# 📄 TEMPLATE A — Activation — V2 Administrative

> **Vulnérabilité** : V2 — Administrative
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées par le CAT Excel source
> **Règles KERNEL** : K2 (3 niveaux), K3 (englobement)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V2 — Administrative |
| Nombre de MP | 4 (A1, A2, A3, A4) |
| Nombre de règles d'activation | 11 |
| dont 🔴 Critique | 3 |
| dont 🟠 CCC | 3 |
| dont 🟢 Standard | 5 |
| MP sans règle d'activation | 1 (A4) |

---

## MP A1 — Couverture santé et protections juridiques

> **ASR** : « Sécuriser couverture santé et protections juridiques »
> **Signature A** : A1-A — Couverture santé active
> **Signature B** : A1-B — Protection juridique en place

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E21 | Pensez-vous qu'il sera possible de maintenir cette situation de vie sans changement majeur dans les prochains mois ? | etat |
| 2 | E68 | Combien de temps consacrez-vous chaque mois aux démarches administratives pour votre proche ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V2_A1_CRIT_01 | E68 | > 5h | Charge administrative > 5h/mois = incompatible avec l'équilibre | Legacy ✅ |

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V2_A1_CCC_01 | E68 > 5h **ET** E21 ∈ {Non un changement sera nécessaire, Je ne sais pas} | Charge administrative excessive + incapacité à maintenir la situation | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V2_A1_STD_01 | E68 | ≥ 1h | Temps administratif mensuel ≥ 1h | Legacy ✅ |
| V2_A1_STD_02 | E21 | ∈ {Non, Je ne sais pas} | Maintien de la situation de vie incertain | Legacy ✅ |

---

## MP A2 — Droits, aides et évaluation dépendance

> **ASR** : « Identifier et activer les droits mobilisables »
> **Signature A** : A2-A — Aide financière active
> **Signature B** : A2-B — Aide humaine en cours

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E62 | Pour quels droits/aides avez-vous effectué une demande actuellement en cours ? | facteur |
| 2 | O53 | La dépendance a-t-elle été évaluée par les services sociaux ? (grille AGGIR) | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V2_A2_CRIT_01 | E62 | « Aucun » | Aucun droit engagé malgré besoin → rupture financière/sociale | Legacy ✅ |

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V2_A2_CCC_01 | E62 ∈ {Aucun, Je ne sais pas} **ET** O53 ∈ {Non, Je ne sais pas} | Absence de droits ouverts + besoin potentiel non évalué | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V2_A2_STD_01 | E62 | ∈ {Aucun, Je ne sais pas} | Aucun droit ou aide demandé | Legacy ✅ |
| V2_A2_STD_02 | O53 | ∈ {Non, Je ne sais pas} | Évaluation dépendance AGGIR non réalisée | Legacy ✅ |

---

## MP A3 — Charge et complexité des démarches

> **ASR** : « Réduire la charge mentale administrative »
> **Signature A** : A3-A — Aide extérieure à la gestion
> **Signature B** : A3-B — Organisation administrative stabilisée

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E21 | Pensez-vous qu'il sera possible de maintenir cette situation de vie ? | etat |
| 2 | E61 | Votre proche a-t-il rédigé des directives anticipées ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V2_A3_CRIT_01 | E61 | « Non » | Refus directives + situation instable → risque décisionnel majeur | Legacy ✅ |

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V2_A3_CCC_01 | E61 ∈ {Non, Je ne sais pas} **ET** E21 ∈ {Non un changement sera nécessaire, Je ne sais pas} | Décisions futures à risque en cas de dégradation | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V2_A3_STD_01 | E61 | ∈ {Non, Je ne sais pas} | Directives anticipées non rédigées | Legacy ✅ |

---

## MP A4 — Situation scolaire/professionnelle et budget

> **ASR** : « Sécuriser la situation financière et professionnelle »
> **Signature A** : A4-A — Budget stabilisé
> **Signature B** : A4-B — Ressources complémentaires identifiées

> ⚠️ **Aucune règle d'activation** — les 2 recos de ce MP sont assignées directement.

---

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Règle issue du CAT Excel de Dr. Monka — validée |

> ✅ **100% des règles V5 sont legacy** — aucune proposition IA dans ce template.
