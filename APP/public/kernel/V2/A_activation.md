# 📄 TEMPLATE A — Activation — V2 Fragilité du Proche

> **Vulnérabilité** : V2 — Fragilité du Proche
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées
> **Règles KERNEL** : K2 (3 niveaux), K3 (englobement)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V2 — Fragilité du Proche |
| Nombre de MP | 6 (F1, F2, F3, F4, F5, F6) |
| Nombre de règles d'activation | 15 |
| dont 🔴 Critique | 5 |
| dont 🟠 CCC | 4 |
| dont 🟢 Standard | 6 |
| ⚠️ MP sans règle d'activation | 1 (F6) |

---

## MP F1 — Vie quotidienne, budget et entourage du proche

> **ASR** : « Comprendre le quotidien du proche »
> **Signature A** : F1-A — Organisation structurée | **Signature B** : F1-B — Soutien ou aide quotidienne identifiée

### Règles d'activation

#### 🟠 CCC

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F1_CCC_01 | E21 = « Non, un changement sera nécessaire » **ET** (N21 = « Oui » **OU** N9 = « Oui ») | Vie quotidienne non tenable + fragilités financières/gestion | Legacy ✅ |

#### 🟢 Standard

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F1_STD_01 | E21 ∈ {Non, Je ne sais pas} | Maintien situation sans changement impossible | Legacy ✅ |
| V2_F1_STD_02 | O51 = « Oui » | Projet adaptation lieu de vie | Legacy ✅ |

---

## MP F2 — Autonomie, aide humaine et présence nécessaire

> **ASR** : « Évaluer le niveau d'aide nécessaire »
> **Signature A** : F2-A — Aide régulière active | **Signature B** : F2-B — Aide mobilisable en cas de besoin

### Règles d'activation

#### 🟠 CCC

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F2_CCC_01 | ≥ 2 parmi : E23 ∈ {≤1h, Ne peut pas rester seul}, E24=Oui, O8=Oui, O9=Oui | Dépendance fonctionnelle élevée nécessitant réorganisation urgente | Legacy ✅ |

#### 🟢 Standard

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F2_STD_01 | E24 = « Oui » | Besoin présence la nuit | Legacy ✅ |
| V2_F2_STD_02 | E23 ∈ {≤1h, Ne peut pas rester seul} | Temps possible seul très limité | Legacy ✅ |

---

## MP F3 — Mémoire, comportement et risques

> **ASR** : « Repérer les troubles cognitifs/comportementaux »
> **Signature A** : F3-A — Dispositifs réduisant le risque | **Signature B** : F3-B — Encadrement humain effectif

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F3_CRIT_01 | E27 = « Oui » | Comportements dangereux pour le proche ou l'aidant | Legacy ✅ |
| V2_F3_CRIT_02 | N22 = « Oui » | Comportements à risque — mise en danger | Legacy ✅ |

#### 🟠 CCC

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F3_CCC_01 | O13 ∈ {Diminution notable, Altération totale} **ET** (E25=Oui **OU** E26=Oui) | Désorganisation cognitive installée avec retentissement fonctionnel | Legacy ✅ |

---

## MP F4 — Douleur, fatigue, sommeil et état général

> **ASR** : « Comprendre l'état général du proche »
> **Signature A** : F4-A — Suivi ou traitement en cours | **Signature B** : F4-B — Accompagnement soulageant l'état général

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F4_CRIT_01 | N25 = « Oui » | Idées suicidaires — risque vital immédiat | Legacy ✅ |
| V2_F4_CRIT_02 | N38 = « Oui » | Perte de contrôle addiction | Legacy ✅ |
| V2_F4_CRIT_03 | N39 = « Oui » | Violence passive ou active | Legacy ✅ |

#### 🟠 CCC

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F4_CCC_01 | ≥ 2 parmi : N11=Oui, N12=Oui, N13=Oui, N34=Oui, O4=Déprimée | Dégradation somato-psychique globale par accumulation | Legacy ✅ |

---

## MP F5 — Dépendance, handicap, addictions et épisodes aigus

> **ASR** : « Qualifier la situation pour orienter »
> **Signature A** : F5-A — Plan d'action identifié | **Signature B** : F5-B — Dispositif de réponse mobilisable

### Règles d'activation

#### 🟠 CCC

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F5_CCC_01 | E28 ≥ 2 **ET** O53 = « Non » | Instabilité médico-sociale avec épisodes aigus sans cadre | Legacy ✅ |

#### 🟢 Standard

| Règle ID | Condition | Sens clinique | Source |
|---|---|---|---|
| V2_F5_STD_01 | E28 ≥ 2 | Hospitalisations récentes ≥ 2 | Legacy ✅ |

---

## MP F6 — Autonomie fonctionnelle, chutes et aides techniques

> **ASR** : « Évaluer l'autonomie fonctionnelle »
> **Signature A** : — | **Signature B** : —

### Règles d'activation

> ⚠️ **Aucune règle d'activation pour F6.** Ce MP est activé systématiquement (toujours ouvert) ou par assignation manuelle. 7 recos sont rattachées directement sans condition.

---

> ✅ **100% des règles V2 sont legacy.**
