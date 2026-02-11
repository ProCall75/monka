# 📄 TEMPLATE A — Activation — V1 Social & Relationnel

> **Vulnérabilité** : V1 — Social & Relationnel
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées par le CAT Excel source
> **Règles KERNEL** : K2 (3 niveaux), K3 (englobement)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V1 — Social & Relationnel |
| Nombre de MP | 4 (R1, R2, R3, R4) |
| Nombre de règles d'activation | 14 |
| dont 🔴 Critique | 2 |
| dont 🟠 CCC | 8 |
| dont 🟢 Standard | 4 |
| MP sans règle d'activation | 0 |

---

## MP R1 — Impact sur la vie personnelle et professionnelle

> **ASR** : « Mesurer l'impact de l'aidance sur votre vie et ajuster »
> **Signature A** : R1-A — Impact maîtrisé
> **Signature B** : R1-B — Impact en dégradation

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | O27 | Vous occuper de la personne aidée entraîne-t-il des difficultés dans votre vie familiale ? | facteur et etat |
| 2 | O28 | Vous occuper de la personne aidée entraîne-t-il des difficultés dans vos relations avec vos amis, dans vos loisirs ou dans votre travail ? | facteur et etat |
| 3 | N7 | Avez-vous dû aménager votre activité professionnelle pour faire face à votre rôle d'aidant ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V1_R1_CCC_01 | O27 = « Oui » **ET** O28 = « Oui » | Retentissement massif du rôle d'aidant sur la vie privée et sociale | Legacy ✅ |
| V1_R1_CCC_02 | N7 ∈ {Aménagement horaires, Congés} **ET** O27 = « Oui » | Ajustement professionnel déjà engagé avec impact familial | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V1_R1_STD_01 | N7 | ∈ {Aménagement horaires, Congés} | Aménagement activité professionnelle déjà engagé | Legacy ✅ |

---

## MP R2 — Soutien de l'entourage et partage de l'aide

> **ASR** : « Renforcer le soutien autour de vous »
> **Signature A** : R2-A — Soutien présent
> **Signature B** : R2-B — Isolement aidant

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E1 | Comment se passe la répartition de l'aide dans votre entourage ? | facteur |
| 2 | E2 | En cas de coup dur, avez-vous des personnes sur qui compter ? | facteur |
| 3 | E3 | Quelles sont les autres personnes à charge autour de vous ? | facteur |
| 4 | N4 | Au sein de votre famille, êtes-vous seul(e) à vous occuper de la personne aidée ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V1_R2_CRIT_01 | E2 | « Personne » | Isolement relationnel sévère de l'aidant | Legacy ✅ |

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V1_R2_CCC_01 | N4 = « Oui » **ET** E2 ∈ {Très peu, Personne} | Aidant seul sans soutien mobilisable → risque d'isolement | Legacy ✅ |
| V1_R2_CCC_02 | E1 = « Je fais presque tout / seul·e » **ET** E2 ∈ {Très peu, Personne} | Charge quasi exclusive sans filet de sécurité | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V1_R2_STD_01 | N4 | « Oui » | Aidant seul dans la famille | Legacy ✅ |

---

## MP R3 — Isolement social de la personne aidée

> **ASR** : « Limiter l'isolement du proche et maintenir un lien social adapté »
> **Signature A** : R3-A — Lien social maintenu
> **Signature B** : R3-B — Proche isolé

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | N20 | A-t-elle des difficultés à maintenir des relations sociales stables ? | facteur |
| 2 | O47 | À combien de temps habitez-vous du domicile de la personne aidée ? | facteur |
| 3 | O48 | Quelle est la fréquence de vos visites ? | facteur |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V1_R3_CCC_01 | N20 = « Oui » **ET** O48 = « 1 fois par mois ou moins » | Isolement social du proche confirmé par faible présence | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V1_R3_STD_01 | O48 | « 1 fois par mois ou moins » | Fréquence des visites très faible → isolement du proche | Legacy ✅ |

---

## MP R4 — Relation aidant / proche et acceptation de l'aide

> **ASR** : « Améliorer la relation et faciliter l'acceptation de l'aide »
> **Signature A** : R4-A — Relation préservée
> **Signature B** : R4-B — Tension/refus d'aide

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E4 | Depuis que vous aidez votre proche, comment a évolué votre relation ? | etat |
| 2 | E5 | Existe-t-il des tensions ou désaccords au sein de la famille ? | etat |
| 3 | E6 | Votre proche accepte-t-il l'aide de personnes extérieures ? | facteur |
| 4 | O30 | Avez-vous le sentiment de ne plus reconnaître la personne aidée ? | facteur et etat |
| 5 | O31 | Avez-vous peur pour l'avenir de la personne aidée ? | facteur et etat |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V1_R4_CRIT_01 | E6 | « Refuse la plupart du temps » | Refus d'aide compromettant la sécurisation | Legacy ✅ |

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V1_R4_CCC_01 | O30 = « Oui » **ET** E4 = « Plus tendue / compliquée » | Dégradation du lien aidant-aidé avec perte de reconnaissance | Legacy ✅ |
| V1_R4_CCC_02 | E5 = « Oui » **ET** E1 = « Je fais presque tout / seul·e » | Conflits familiaux associés à une charge déséquilibrée | Legacy ✅ |
| V1_R4_CCC_03 | E6 = « Refuse la plupart du temps » **ET** O31 = « Oui » | Refus d'aide externe avec anxiété projetée forte | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V1_R4_STD_01 | E6 | « Refuse la plupart du temps » | Acceptation aide extérieure très faible | Legacy ✅ |

---

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Règle issue du CAT Excel de Dr. Monka — validée |

> ✅ **100% des règles V1 sont legacy** — aucune proposition IA dans ce template.
