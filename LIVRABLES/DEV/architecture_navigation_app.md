# 🗺️ Architecture de Navigation — App Monka

> **Document de référence pour l'implémentation** — Marwane  
> **Date** : 16/02/2026  
> **Auteur** : Antonin  

---

## Vue d'ensemble — 4 niveaux de profondeur

```
Accueil (5 vulnérabilités)
 └── Niveau 1 : Page Vulnérabilité (liste des MP)
      └── Niveau 2 : Page MP (recommandations activées)
           └── Niveau 3 : Détail Recommandation (micro-tâches en accordéon)
                └── Niveau 4 : Guide détaillé MT (validation pas-à-pas)
```

---

## Niveau 0 — Accueil

**Ce qu'on voit** : 5 cartes, une par vulnérabilité.

| # | ID | Nom affiché | Description courte |
|---|---|---|---|
| 1 | V1 | Votre vie sociale | Prenons soin de vos liens et de votre équilibre personnel |
| 2 | V2 | Vos démarches | Sécurisons vos droits et démarches administratives |
| 3 | V3 | Votre santé | Vous aussi, vous méritez qu'on prenne soin de vous |
| 4 | V4 | Parcours de soins | Accompagnons le parcours de soins de votre proche |
| 5 | V5 | Votre quotidien | Facilitons votre organisation au jour le jour |

**Données affichées par carte** :
- Nom de la vulnérabilité
- Description courte
- Badge « Pour [Persona] »
- Nombre total d'actions (MP activés × leurs MT)
- Bouton → vers Niveau 1

**Barre de progression globale** en haut de page : % du plan hebdomadaire complété.

---

## Niveau 1 — Page Vulnérabilité (liste des MP)

> **Route** : `/vulnerabilite/{v_id}` (ex: `/vulnerabilite/v1`)

**En-tête** : Nom + description de la vulnérabilité, jauge de progression globale sur cette V.

**Contenu** : Liste de **TOUS les MP** de cette vulnérabilité, qu'ils soient activés ou non.

### MP activé (≥ 1 règle d'activation déclenchée)

Affichage normal sous forme de carte cliquable :

| Donnée | Source |
|---|---|
| Nom du MP | `ASR` du MP (ex: « Retrouver du répit ») |
| Description courte | Texte descriptif du MP |
| Badge priorité | `🔴 Important ce mois-ci` / `🟡 À votre rythme` (selon le niveau max activé) |
| Barre de progression | X/Y recommandations complétées |
| Chevron → | Naviguer vers Niveau 2 |

**Logique priorité** :
- 🔴 `Important ce mois-ci` = au moins 1 règle CCC ou Critique active
- 🟡 `À votre rythme` = uniquement des règles Standard actives

### MP non activé (aucune règle déclenchée = ASR déjà sécurisé)

> ⚠️ **Important** : Un MP non activé signifie que les réponses au questionnaire n'ont déclenché aucune alerte. L'ASR (Axe de Sécurisation et de Résilience) est considéré comme sécurisé sur ce point.

Affichage différent — carte grisée / style atténué :

| Donnée | Contenu |
|---|---|
| Nom du MP | Même nom |
| Message de sécurisation | ✅ « Votre situation est sécurisée sur ce point » |
| Reco prévention (⚪) | Texte de la reco prévention (ex: « L'aidance peut avoir un impact sur votre vie… N'hésitez pas à en parler. ») |
| MT de prévention | Liste des MT de prévention associées (actions préventives légères) |
| **Pas de chevron →** | Ce MP ne navigue PAS vers un Niveau 2 — tout est visible inline |

**Règle clé** : On ne montre PAS les recommandations (recos) au Niveau 1. On affiche uniquement les MP. Le terme « recommandation » dans la maquette actuelle doit être remplacé par **« programmes »** ou **« macro-programmes »**.

---

## Niveau 2 — Page MP (recommandations activées)

> **Route** : `/vulnerabilite/{v_id}/programme/{mp_id}` (ex: `/vulnerabilite/v1/programme/r1`)

**Condition d'accès** : Uniquement pour les MP activés (clic depuis Niveau 1).

**En-tête** :
- Fil d'Ariane : `← Votre vie sociale`
- Nom du MP (ex: « Retrouver du répit »)
- Description du MP
- Jauge objectif : X/Y recommandations complétées

**Section « ACCOMPAGNEMENT »** : Liste des **recommandations activées uniquement**.

> ⚠️ On ne montre que les recos dont au moins 1 règle s'est déclenchée. Les recos non activées n'apparaissent pas.

### Carte Recommandation (Reco)

Chaque reco est un **accordéon** (clic pour déplier/replier) :

| Donnée | Source | Exemple |
|---|---|---|
| Badge priorité | Niveau max activé de la reco | `🔴 IMPORTANT CE MOIS-CI` / `🟡 À VOTRE RYTHME` |
| Nom de la reco (wording utilisateur) | Wording versionné selon le niveau | « Se faire accompagner » |
| Barre de progression | X/Y MT de cette reco | 1/3 |

**Logique badge priorité** :
| Niveau max activé | Badge | Délai |
|---|---|---|
| 🔴 Critique | `IMPORTANT CE MOIS-CI` | ≤ 7 jours |
| 🟠 CCC | `IMPORTANT CE MOIS-CI` | ≤ 30 jours |
| 🟢 Standard | `À VOTRE RYTHME` | ≤ 90 jours |

### Accordéon déplié → Liste des MT

Quand on clique sur une reco, l'accordéon s'ouvre et affiche **les MT associées à cette catégorie**.

> ⚠️ **Distinction clé à afficher** : Séparer les MT en 2 groupes visuels distincts.

#### MT Contributives (📍) — Pour sécuriser l'ASR

| Donnée | Source |
|---|---|
| Icône | 📍 ou icône de cible/objectif |
| Titre MT | Wording utilisateur versionné selon le niveau |
| Badge type | `STRUC` / `SEC` / `MED` |
| Badge acteur | `→ Aidant` / `→ IDEC` / `→ MT` |
| Checkbox | Pour cocher quand c'est fait |
| Badge `PRIORITAIRE` | Si le niveau est CCC ou Critique |
| Bouton agenda | 📅 si la MT peut être planifiée |
| Lien « Guide détaillé → » | Navigue vers Niveau 3 |

**Libellé section** : `ACTIONS À FAIRE` ou `POUR SÉCURISER VOTRE SITUATION`

#### MT Non-contributives (💡) — Pour améliorer le bien-être

| Donnée | Source |
|---|---|
| Icône | 💡 ou icône d'ampoule |
| Titre MT | Wording utilisateur versionné |
| Badge type | `INFO` / `ORGA` |
| Badge acteur | `→ Aidant` / `→ IDEC` |
| Checkbox | Pour cocher quand c'est fait |
| Lien « Guide détaillé → » | Navigue vers Niveau 3 |

**Libellé section** : `POUR ALLER PLUS LOIN` ou `POUR VOTRE BIEN-ÊTRE`

> **Règle visuelle** : Les MT contributives (📍) sont mises en avant (couleur plus vive, ordre en premier). Les MT non-contributives (💡) sont présentées en dessous, avec un style plus léger (couleur secondaire).

---

## Niveau 3 — Guide détaillé MT

> **Route** : `/vulnerabilite/{v_id}/programme/{mp_id}/guide/{mt_id}`

**Condition d'accès** : Clic sur « Guide détaillé » d'une MT au Niveau 2.

**Contenu** : Le détail pas-à-pas pour valider cette micro-tâche.

| Section | Contenu |
|---|---|
| **Titre** | Nom complet de la MT |
| **Objectif** | Ce que cette MT va accomplir |
| **Qui fait quoi** | Acteur principal + rôle de l'aidant |
| **Étapes** | Liste ordonnée d'étapes concrètes à suivre |
| **Documents utiles** | Liens vers les documents nécessaires |
| **Contacts** | Coordonnées des structures/acteurs concernés |
| **Critère de validation** | Comment savoir que la MT est « faite » |
| **Bouton « Marquer comme fait »** | Valide la MT et met à jour la progression |

---

## Récapitulatif de la navigation

```
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 0 — ACCUEIL                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐ │
│  │   V1    │ │   V2    │ │   V3    │ │   V4    │ │  V5   │ │
│  └────┬────┘ └─────────┘ └─────────┘ └─────────┘ └───────┘ │
│       │ clic                                                 │
│       ▼                                                      │
│  NIVEAU 1 — VULNÉRABILITÉ V1                                │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │ MP R1 (activé)    →  │  │ MP R3 (non activé)           │ │
│  │ "Retrouver du répit" │  │ ✅ ASR sécurisé              │ │
│  │ 🔴 Important         │  │ ⚪ Reco prévention + MT prev │ │
│  └────┬─────────────────┘  └──────────────────────────────┘ │
│       │ clic                          ↑ pas de clic          │
│       ▼                              (tout visible inline)   │
│  NIVEAU 2 — MP R1 "Retrouver du répit"                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  🔴 IMPORTANT CE MOIS-CI                             │   │
│  │  ▸ Se faire accompagner ——————————————— 1/3          │   │
│  │    ┌──────────────────────────────────────────────┐  │   │
│  │    │ 📍 POUR SÉCURISER VOTRE SITUATION            │  │   │
│  │    │  ☐ Préparer documents    [PRIORITAIRE] 📅   │  │   │
│  │    │  ✅ Contacter l'AS       [PRIORITAIRE]       │  │   │
│  │    │  ☐ Se renseigner aides          [Guide →]   │  │   │
│  │    ├──────────────────────────────────────────────┤  │   │
│  │    │ 💡 POUR VOTRE BIEN-ÊTRE                      │  │   │
│  │    │  ☐ Identifier activités impactées [Guide →] │  │   │
│  │    └──────────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  │  🟡 À VOTRE RYTHME                                   │   │
│  │  ▸ Aménager votre temps ——————————————— 0/2          │   │
│  └──────────────────────────────────────────────────────┘   │
│       │ clic "Guide →"                                       │
│       ▼                                                      │
│  NIVEAU 3 — GUIDE DÉTAILLÉ MT                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  📋 Préparer les documents pour votre dossier        │   │
│  │  Objectif : ...                                      │   │
│  │  Étapes : 1... 2... 3...                             │   │
│  │  Documents : ...                                     │   │
│  │  [✅ Marquer comme fait]                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Données par vulnérabilité

| V | Nom | Nb MP | IDs MP |
|---|---|---|---|
| V1 | Vie sociale | 4 | R1, R2, R3, R4 |
| V2 | Démarches | 4 | A1, A2, A3, A4 |
| V3 | Santé | 4 | S1, S2, S3, S4 |
| V4 | Parcours de soins | 6 | F1, F2, F3, F4, F5, F6 |
| V5 | Quotidien | 6 | M1, M2, M3, M4, M5, M6 |

**Total** : 24 macro-programmes sur 5 vulnérabilités.

---

## Glossaire technique pour l'implémentation

| Terme | Signification | Où ça s'affiche |
|---|---|---|
| **Vulnérabilité (V)** | Domaine de vie évalué (V1-V5) | Niveau 0 |
| **Macro-Programme (MP)** | Axe d'action dans une vulnérabilité | Niveau 1 |
| **ASR** | Axe de Sécurisation et de Résilience — objectif final du MP | Badge du MP |
| **Règle d'activation** | Condition SI/ALORS basée sur les réponses au questionnaire | Logique back-end |
| **Catégorie (CAT)** | Groupe thématique de recos au sein d'un MP | Niveau 2 (section) |
| **Recommandation (Reco)** | Conseil affiché = 1 catégorie activée à un certain niveau | Niveau 2 (accordéon) |
| **Niveau (STD/CCC/CRIT)** | Degré d'urgence d'une reco activée | Badge + wording |
| **Micro-Tâche (MT)** | Action concrète à réaliser | Niveau 2 (dans accordéon) |
| **MT contributive (📍)** | MT qui sécurise l'ASR (types STRUC, SEC, MED) | Section prioritaire |
| **MT non-contributive (💡)** | MT qui améliore le bien-être (types INFO, ORGA) | Section secondaire |
| **Reco prévention (⚪)** | Message affiché quand un MP n'est PAS activé | Niveau 1 (MP non activé) |
| **MT prévention** | Actions légères quand le MP n'est pas activé | Niveau 1 (inline) |

---

## Règles métier clés pour le front

1. **Un MP non activé ≠ caché**. Il est affiché mais avec un état « sécurisé » + reco prévention + MT prévention.
2. **Les recos non activées d'un MP activé = cachées**. On ne montre que ce qui est pertinent.
3. **Le niveau détermine le wording**, pas les MT. Les MT restent les mêmes, seul le texte affiché change (ton plus urgent).
4. **La distinction 📍/💡 est OBLIGATOIRE visuellement**. C'est un différenciateur clinique fort.
5. **La progression est calculée sur les MT contributives (📍) uniquement** pour l'ASR. Les 💡 sont bonus.
6. **Chaque MT a 2 wordings** : un pour l'IDEC (pro) et un pour l'utilisateur (bienveillant). L'app affiche le wording utilisateur.
