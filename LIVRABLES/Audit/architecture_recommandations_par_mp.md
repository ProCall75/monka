# 🏗️ Architecture des Recommandations par Micro-Parcours

> **Auteur** : PRAGMA Studio (assisté par IA)  
> **Date** : 10/02/2026  
> **Statut** : 🟡 Proposition — en attente de validation Dr. Monka  
> **Concerne** : Template B (Recommandations & Variations) du KERNEL

---

## 1. Résumé Exécutif

Ce document propose un **raffinement du modèle de recommandations** Monka. 

Dans les données legacy (CAT Excel), les recommandations étaient liées directement aux **questions** (une réponse = une reco). Le KERNEL exige qu'elles soient liées aux **Micro-Parcours (MP)**. Ce document clarifie **comment** opérer cette transition sans perdre de granularité ni d'urgence clinique.

---

## 2. Le Problème

### Ancien modèle (legacy CAT Excel)

```
Question → Réponse → Recommandation + Acteurs + Actions IDEC
```

Exemple V1, question E1 :
| Réponse | Recommandation |
|---------|---------------|
| "Je fais presque tout" | Évaluer les aides disponibles |
| "Je suis totalement seul·e" | Mettre en place un accompagnement renforcé |

**Problème** : les recommandations sont **dispersées** entre les questions. Un même MP (ex: R2 — Soutien entourage) reçoit des recommandations provenant de questions différentes (N4, E1, E2), sans lien entre elles.

### Ce que le KERNEL exige

> « Recommandation liée au MP, pas aux questions » (Chaîne complète KERNEL, section 4)

Les recommandations doivent être **regroupées par MP**, avec une **variation d'intensité** selon la méthode d'activation (Critique / CCC / Standard / Prévention).

---

## 3. La Solution Proposée

### Principe : Plusieurs recommandations par MP, chacune liée à sa règle d'activation

Un MP peut avoir **plusieurs recommandations distinctes**, car les situations cliniques détectées par ses différentes règles d'activation ne sont pas toutes de même nature.

### Exemple concret — MP R2 (Soutien entourage, V1)

R2 a 3 règles d'activation :

| Règle | Niveau | Questions | Situation détectée |
|-------|--------|-----------|-------------------|
| R2_STD_01 | 🟢 Standard | N4 = "Oui" | Aidant seul, sans entourage mobilisé |
| R2_CCC_01 | 🟠 CCC | N4 = "Oui" ET E2 = "personne" | Aidant seul ET aucun réseau de soutien |
| R2_CCC_02 | 🟠 CCC | E1 = "je fais tout" ET E2 = "personne" | Charge totale ET isolement total |

Chaque règle déclenche des **recommandations différentes** :

```
MP R2 — Soutien entourage
├── 🟠 RECO 1 : « Relais d'urgence »
│     → Déclenchée par CCC_01 ou CCC_02
│     → Urgente, directive
│     → MT : contacter SAD, évaluer urgence
│
├── 🟢 RECO 2 : « Mobiliser l'entourage proche »
│     → Déclenchée par STD_01
│     → Conseil, accompagnement progressif
│     → MT : lister les proches, explorer les freins
│
└── 🟢 RECO 3 : « Orienter vers un groupe de parole »
│     → Déclenchée par STD_01
│     → Informatif
│     → MT : informer sur les dispositifs
```

### Pourquoi c'est nécessaire : la question de la priorisation

Sans ce modèle, si le CCC se déclenche, **toutes** les recos du MP passent en urgence CCC (30 jours). Le groupe de parole devient aussi urgent que le relais d'urgence, ce qui est **cliniquement disproportionné**.

Avec ce modèle :
- Le **MP** reçoit le niveau global le plus haut (🟠 CCC → délai 30 jours)
- Chaque **reco** garde son propre niveau → **les recos urgentes apparaissent en premier**
- L'utilisateur sait immédiatement quelle action est prioritaire

---

## 4. Le Nouveau Modèle — Vue Synthétique

### Ce qui est déterminé à chaque niveau

| Niveau | Ce que ça détermine | Exemple |
|--------|--------------------  |---------|
| **MP** | Délai global d'action | R2 → 🟠 CCC → 30 jours max |
| **Reco** | Wording, intensité, ton | Reco 1 → 🟠 urgent / Reco 3 → 🟢 informatif |
| **MT** | Action concrète à faire | Contacter le SAD, lister les proches... |

### La chaîne complète

```
Question → Réponse
    ↓
Activation Rule (critique/CCC/standard)
    ↓
MP activé au niveau le plus haut (K3 : englobement)
    ↓
Recos du MP déclenchées
  → Chaque reco liée à SA règle d'activation
  → Affichées par ordre de criticité (🔴 → 🟠 → 🟢 → ⚪)
    ↓
MT de chaque reco
  → Contributives (📍) → comptent pour l'ASR
  → Non-contributives (💡) → amélioration
```

### Impact sur l'ASR

L'ASR du MP est **toujours la même** quel que soit le niveau d'activation (KERNEL section 3.4). Ce qui change :

- Les **MT contributives comptabilisées** sont celles des **recos actives** du MP
- Si seule la reco CCC fire → seules les MT de cette reco comptent pour l'ASR
- Les MT des recos Standard sont proposées en amélioration

---

## 5. Schéma de Données Proposé

### Structure de la table `recommendations`

| Champ | Type | Description |
|-------|------|-------------|
| `id` | text | Identifiant unique (ex: "R2_RECO_01") |
| `mp_id` | text → `micro_parcours` | À quel MP appartient la reco |
| `activation_rule_id` | text → `activation_rules` | Quelle règle d'activation la déclenche |
| `niveau` | text | Hérité de la règle (critique/ccc/standard/prévention) |
| `ordre_affichage` | int | Ordre dans le MP (trié par criticité) |
| `texte_utilisateur` | text | Wording affiché à l'aidant |
| `texte_idec` | text | Wording pour le professionnel IDEC |
| `acteurs` | text[] | Professionnels impliqués |
| `mt_ids` | text[] | Micro-tâches associées à cette reco |
| `source` | text | "legacy" ou "ia_proposé" |

### Liens entre tables

```
activation_rules ──→ questions (via question_ids[])
         │
         ↓
recommendations ──→ micro_parcours (via mp_id)
         │
         ↓
    micro_taches (via mt_ids[])
```

Les **questions n'apparaissent plus** dans la table recommendations. Le lien est indirect, via la règle d'activation.

---

## 6. Impact sur le KERNEL

### Règles K1→K13 : aucun impact ❌

Les 13 règles restent valides telles quelles. Aucune ne suppose explicitement qu'il y a une seule reco par MP.

| Règle | Impactée ? | Raison |
|-------|-----------|--------|
| K1 (Activation → Reco) | ✅ Compatible | Une activation peut déclencher N recos dans le même MP |
| K2 (3 niveaux) | ✅ Compatible | Chaque reco hérite du niveau de sa règle |
| K3 (Englobement) | ✅ Compatible | Le MP prend le niveau le plus haut, les recos gardent le leur |
| K4 (Prévention) | ✅ Compatible | Les recos ⚪ sont celles du MP non activé |
| K5-K8 (Contenu recos) | ✅ Compatible | S'applique à chaque reco individuellement |
| K9-K12 (MT/ASR) | ✅ Compatible | Les MT sont liées aux recos, pas au MP directement |
| K13 (Scoring indépendant) | ✅ Compatible | Aucun changement |

### Template B : raffinement nécessaire ⚠️

Le Template B actuel prévoit :
```
Pour chaque MP : 1 reco × 4 versions (critique/CCC/standard/prévention)
```

Le nouveau modèle prévoit :
```
Pour chaque MP : N recos, chacune avec son niveau + ses MT
```

> [!IMPORTANT]
> Ce n'est pas une contradiction avec le KERNEL, c'est une **précision**. Le KERNEL dit « que dit-on selon le niveau d'activation » — notre modèle répond : « on dit **différentes choses** selon **quelle règle** a activé le MP ».

Le Template B devra être ajusté pour accueillir **plusieurs recos par MP**, regroupées et ordonnées par niveau d'urgence.

---

## 7. Badge Dynamique du MP (dé-escalade)

Lorsque l'utilisateur complète les recos les plus urgentes, le badge du MP **descend automatiquement** au niveau de la reco active la plus haute restante.

### Exemple

```
Jour 0 : questionnaire rempli → CCC détecté
  MP R2 = 🟠 CCC (deadline = J+30)
  → Reco 1 (relais urgence) 🟠
  → Reco 2 (mobiliser entourage) 🟢
  → Reco 3 (groupe de parole) 🟢

Jour 12 : Reco 1 complétée ✅
  MP R2 recalcule = MAX(recos restantes) = 🟢 Standard
  → Reco 2 🟢
  → Reco 3 🟢
  → Le MP "refroidit" visuellement
```

### Règle

> **Badge MP = niveau de la reco active la plus haute encore incomplète**

### Délai

| Règle | Explication |
|-------|-------------|
| **Fixé à la date du questionnaire** | Le délai ne se recalcule jamais. CCC = J+30 depuis la complétion du questionnaire, point. |
| **Si changement de situation** | C'est le questionnaire de suivi mensuel (entonnoir N1→N2→N3) qui le capte et peut re-déclencher des règles avec de nouveaux délais. |

Cela évite d'ajouter des facteurs de complexité inutiles au moteur.

---

## 8. Questions pour Dr. Monka

1. **Validez-vous le principe** de plusieurs recommandations par MP, chacune liée à sa règle d'activation spécifique ?

2. **Priorisation** : êtes-vous d'accord que les recos soient ordonnées par urgence (🔴 → 🟠 → 🟢 → ⚪) dans l'affichage ?

3. **Badge dynamique** : confirmez-vous que le badge du MP descend automatiquement quand les recos urgentes sont complétées ?

4. **ASR** : confirmez-vous que les MT contributives à l'ASR sont celles des **recos actives** uniquement ?

5. **Nombre de recos par MP** : y a-t-il un maximum à ne pas dépasser (ex: 5 recos max par MP) ?

---

## 9. Prochaine Étape

Une fois ce modèle validé :
1. **Regrouper les recos legacy par MP** (étape technique)
2. **Proposer les recos déclinées par niveau** (proposition IA, validation Dr. Monka)
3. **Produire le Template B ajusté** pour chaque V

---

> **Document rédigé par** : PRAGMA Studio (IA)  
> **À valider par** : Dr. Monka  
> **Référence KERNEL** : RECAP_FONDATION_MONKA.md, sections 3.4, 4, Template B
