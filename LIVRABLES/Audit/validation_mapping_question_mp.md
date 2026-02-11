# 📋 Validation Mapping Question → Micro-Parcours

> **Date** : 2026-02-09  
> **Statut** : À valider par Dr. Monka  
> **Base** : 150 questions régulières → 24 micro-parcours

---

## 📊 Résumé

| Indicateur | Valeur |
|---|---|
| Questions mappées | **150 / 150** ✅ |
| Mappings totaux | **155** (5 questions liées à 2 MP) |
| Source "legacy" | **150** (documentées dans les fichiers ASR) |
| Source "auto" | **5** (assignées automatiquement, **à valider** 👇) |
| Questions multi-MP | **5** (liées à 2 MP, **décision nécessaire** 👇) |

---

## 🔴 SECTION A — 5 questions assignées automatiquement (à valider)

Ces questions n'étaient pas explicitement reliées à un MP dans les archives. L'assignation a été faite par proximité thématique.

| # | ID | Question | Vulnérabilité | MP assigné | Justification |
|---|---|---|---|---|---|
| 1 | **E3** | Quelles sont les autres personnes à charge autour de vous ? | V1 | **R2** (Soutien entourage) | Charge familiale = facteur d'isolement aidant |
| 2 | **O47** | À combien de temps habitez-vous du domicile de la personne aidée ? | V1 | **R3** (Isolement social) | Distance = facteur d'isolement du proche |
| 3 | **N14** | La personne aidée éprouve-t-elle des difficultés à suivre son traitement médical ? | V4 | **M2** (Accès soins) | Observance traitement = accès et suivi soins |
| 4 | **N32** | Y a-t-il des aides techniques en place ? | V4 | **F6** (Autonomie fonctionnelle) | Aides techniques = autonomie et chutes |
| 5 | **N36** | A-t-elle besoin d'aide pour organiser et planifier ses journées ? | V4 | **F2** (Autonomie, aide humaine) | Organisation quotidienne = évaluation autonomie |

> **Action demandée** : Confirmer ou corriger chaque assignation.

---

## 🟡 SECTION B — 5 questions liées à 2 micro-parcours

Ces 5 questions apparaissent dans les fichiers legacy comme contribuant à **2 MP distincts**. C'est une question d'architecture à trancher.

### B.1 — E21 : Maintien situation de vie

> *« Pensez-vous qu'il sera possible de maintenir cette situation de vie sans changement majeur ? »*

| MP | Nom | Pourquoi ce lien |
|---|---|---|
| **F1** | Vie quotidienne du proche | Évalue la stabilité du lieu de vie |
| **A1** | Couverture santé & protections | Déclenche une anticipation administrative |

---

### B.2 — O51 : Adaptation lieu de vie

> *« Songez-vous à adapter son lieu de vie, son quotidien ? »*

| MP | Nom | Pourquoi ce lien |
|---|---|---|
| **F1** | Vie quotidienne du proche | Projet d'aménagement du quotidien |
| **F6** | Autonomie fonctionnelle & chutes | Adaptation = prévention chutes et aides techniques |

---

### B.3 — O53 : Évaluation AGGIR

> *« La dépendance de la personne aidée a-t-elle été évaluée ? (grille AGGIR) »*

| MP | Nom | Pourquoi ce lien |
|---|---|---|
| **F5** | Dépendance, handicap | Évaluation du niveau de dépendance |
| **A2** | Droits, aides | L'AGGIR conditionne l'accès aux droits (APA) |

---

### B.4 — O54 : Niveau AGGIR

> *« Quel est son niveau de dépendance selon cette grille AGGIR ? »*

| MP | Nom | Pourquoi ce lien |
|---|---|---|
| **F5** | Dépendance, handicap | Qualification de la dépendance |
| **A2** | Droits, aides | Le GIR détermine le montant de l'APA |

---

### B.5 — E46 : Suivi post-hospitalisation

> *« Après la dernière hospitalisation, un suivi médical a-t-il été organisé ? »*

| MP | Nom | Pourquoi ce lien |
|---|---|---|
| **M3** | Urgences & hospitalisations | Continuité post-hospitalisation |
| **M4** | Troubles psychiques & suivi | Suivi médical structuré |

---

## ❓ Questions pour la décision

### Option A : Strict 1 question = 1 MP

**Avantages KERNEL** :
- Simplicité du modèle de données
- Chaque question contribue à un seul MP → logique de recommandation claire
- Excel de suivi simple (1 colonne MP par question)
- Pas d'ambiguïté dans l'activation des recommandations

**Inconvénients** :
- Perte d'information : O53/O54 (AGGIR) contribuent vraiment aux 2 domaines
- Certaines questions ont un double rôle clinique réel

### Option B : Autoriser 1 question → N MP (max 2)

**Avantages KERNEL** :
- Fidélité clinique : une réponse peut impacter 2 parcours
- Les CCC utilisent **principalement** des questions d'un même MP, mais 3 CCC legacy (dans V5 Administrative) combinent déjà des questions de V2 et V4 — le multi-MP est donc cohérent avec la réalité
- Meilleure détection des situations complexes

**Inconvénients** :
- Une même question peut activer des recommandations dans 2 MP différents → à gérer
- Le suivi Excel devient plus complexe
- La logique d'activation est plus lourde à maintenir

### 💡 Recommandation technique

> Si on autorise le multi-MP, la table `question_mp_mapping` actuelle le supporte déjà parfaitement (relation N:N). Pas de changement de schéma nécessaire.
>
> Si on veut du strict 1:1, il faudra choisir **quel MP garder** pour chacune des 5 questions ci-dessus et supprimer l'autre entrée.
>
> **Ma recommandation** : garder le multi-MP pour les 5 cas identifiés (ils sont cliniquement justifiés), mais plafonner à **2 MP maximum** pour éviter la complexité. Ça reste gérable dans le KERNEL.

---

## ✅ Checklist de validation

- [ ] Section A : 5 assignations auto confirmées/corrigées
- [ ] Section B : Décision 1:1 ou 1:N prise
- [ ] Si 1:1 : MP principal choisi pour chaque question double
