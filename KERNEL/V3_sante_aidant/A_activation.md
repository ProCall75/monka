# 📄 TEMPLATE A — Activation — V3 Santé de l'Aidant

> **Vulnérabilité** : V3 — Santé de l'Aidant
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées par le CAT Excel source
> **Règles KERNEL** : K2 (3 niveaux), K3 (englobement)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V3 — Santé de l'Aidant |
| Nombre de MP | 4 (S1, S2, S3, S4) |
| Nombre de règles d'activation | 11 |
| dont 🔴 Critique | 2 |
| dont 🟠 CCC | 4 |
| dont 🟢 Standard | 5 |
| MP sans règle d'activation | 0 |

---

## MP S1 — Charge, fatigue et risque d'épuisement

> **ASR** : « Repérer la surcharge et prévenir l'épuisement »
> **Signature A** : S1-A — Relais réduisant la charge
> **Signature B** : S1-B — Organisation allégeant le quotidien

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E7 | À quel point vous sentez-vous épuisé·e par votre rôle d'aidant actuellement ? | etat |
| 2 | E11 | Si rien ne change, pensez-vous pouvoir continuer à vous occuper de votre proche dans les 6 prochains mois ? | etat |
| 3 | E12 | Êtes-vous inquiet·ète à l'idée que votre proche puisse se faire du mal ? | etat |
| 4 | E13 | Êtes-vous inquiet·ète à l'idée que votre proche puisse mettre d'autres personnes en danger ? | etat |
| 5 | E14 | Et au cours des 30 derniers jours ? (jours d'arrêt) | facteur |
| 6 | N8 | Votre rôle d'aidant vous a-t-il conduit à être en arrêt de travail ? | facteur |
| 7 | O32 | Souhaitez-vous être davantage aidé(e) pour vous en occuper ? | etat |
| 8 | O49 | Depuis combien de temps l'aidez-vous ? | aucun |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V3_S1_CRIT_01 | E12 | « Oui » | Risque pour la personne aidée — risque vital immédiat | Legacy ✅ |
| V3_S1_CRIT_02 | E13 | « Oui » | Risque pour autrui — risque vital immédiat | Legacy ✅ |

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V3_S1_CCC_01 | E7 ∈ {Très fatigué·e, Épuisé·e / au bord de craquer} **ET** E11 ∈ {Non, je risque de ne plus y arriver, Je ne suis pas sûr·e} | Risque de rupture imminente du rôle d'aidant | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V3_S1_STD_01 | O49 | « Depuis plus de 2 ans » | Durée d'aidance > 2 ans → risque d'épuisement chronique | Legacy ✅ |
| V3_S1_STD_02 | N8 | ≠ « Non » | Arrêt de travail lié au rôle d'aidant | Legacy ✅ |
| V3_S1_STD_03 | E14 | ∈ {Entre 4 et 7 jours, Plus de 7 jours} | Jours d'arrêt fréquents sur 30 jours | Legacy ✅ |
| V3_S1_STD_04 | O32 | « Oui » | Souhait d'être davantage aidé | Legacy ✅ |

---

## MP S2 — Inquiétudes pour la sécurité

> **ASR** : « Réduire les risques graves »
> **Signature A** : S2-A — Soutien par l'entourage
> **Signature B** : S2-B — Accompagnement professionnel engagé

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E8 | Avez-vous le sentiment d'être seul(e) émotionnellement face à votre rôle d'aidant ? | etat |
| 2 | E9 | Parvenez-vous à avoir du temps pour vous au cours d'une semaine habituelle ? | etat |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V3_S2_CCC_01 | E8 ∈ {Souvent, Tout le temps} **ET** E9 = « Non » | Isolement affectif avec absence de récupération | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Sens clinique | Source |
|---|---|---|---|---|
| V3_S2_STD_01 | E9 | « Non » | Absence de temps pour soi | Legacy ✅ |

---

## MP S3 — Santé physique et renoncement aux soins

> **ASR** : « Protéger votre santé »
> **Signature A** : S3-A — Suivi médical repris
> **Signature B** : S3-B — Démarche de soin engagée

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E18 | Globalement, comment évalueriez-vous la qualité de votre sommeil ces dernières semaines ? | etat |
| 2 | O44 | Selon vous et par rapport à une personne du même âge, diriez-vous que votre santé est : | etat |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V3_S3_CCC_01 | O44 = « Moins bonne » **ET** E18 ∈ {Mauvaise, Très mauvaise} | Dégradation physique objectivée par le vécu | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

*Aucune règle standard pour ce MP.*

---

## MP S4 — Hygiène de vie (activité et sommeil)

> **ASR** : « Améliorer votre récupération »
> **Signature A** : S4-A — Amélioration du repos
> **Signature B** : S4-B — Organisation quotidienne soutenable

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E15 | Rencontrez-vous des difficultés à obtenir des rendez-vous médicaux pour vous-même ? | etat |
| 2 | E16 | Depuis que vous êtes aidant, vos propres rendez-vous médicaux… | etat |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

*Aucune règle critique pour ce MP.*

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Sens clinique | Source |
|---|---|---|---|
| V3_S4_CCC_01 | E15 ∈ {Oui, Un peu} **ET** E16 = « Je les reporte ou les annule souvent » | Renoncement actif aux soins de l'aidant | Legacy ✅ |

#### 🟢 Standard (≤ 90 jours)

*Aucune règle standard pour ce MP.*

---

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Règle issue du CAT Excel de Dr. Monka — validée |

> ✅ **100% des règles V3 sont legacy** — aucune proposition IA dans ce template.
