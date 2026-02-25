# 📘 DOCUMENT DE CONTEXTE — App My Monka (Refonte From Scratch)

> **Objectif :** Rassembler dans un unique document TOUT le contexte nécessaire pour qu'un développeur senior puisse rédiger un PRD complet de l'app My Monka, comprendre comment le moteur clinique (backend) et l'interface aidant (frontend) s'imbriquent, et lancer la refonte from scratch.
>
> **Date :** 21 Février 2026
> **Auteurs contexte :** Antonin Rimaud (Moteur Clinique / KERNEL) · Marwane (Review UI/UX / Démo App)
> **Studio :** PRAGMA

---

## TABLE DES MATIÈRES

1. [Le Produit : My Monka en une phrase](#1-le-produit)
2. [Le Moteur Clinique d'Antonin (KERNEL V5)](#2-le-moteur-clinique)
3. [L'App Actuelle et la Review UI/UX (Travail Marwane)](#3-review-ui-ux)
4. [Comment le Moteur et l'App se lient](#4-lien-moteur-app)
5. [Le CRM Lifeline et le Dispatch Klésia](#5-crm-et-dispatch)
6. [Roadmap d'Évolution du Moteur (M1 → M2 → M3)](#6-roadmap-moteur)
7. [Architecture Technique Cible](#7-architecture-cible)
8. [Sécurité, Auth et RLS](#8-securite)
9. [Contraintes et Règles de Dev (PRAGMA Framework)](#9-contraintes)
10. [Synthèse : Ce qu'on doit Construire](#10-synthese)

---

## 1. Le Produit

**My Monka** est une app mobile destinée aux **aidants familiaux** (11 millions en France). Elle aide l'aidant à comprendre sa situation, identifier ses vulnérabilités, et agir concrètement via des micro-tâches personnalisées — le tout généré par un moteur clinique déterministe conçu par un gériatre (Dr. Monka).

**Le cœur de l'app = la personnalisation.** L'aidant répond à un questionnaire (150 questions), et le moteur génère un parcours unique : quelles vulnérabilités sont activées, quelles recommandations prioriser, quelles actions concrètes réaliser.

**Objectif de la refonte :** Reprendre le développement de l'app My Monka from scratch (l'actuelle est jugée faible en UX/UI) en se basant sur :
- Le moteur clinique complet d'Antonin (le backend / cerveau)
- La démo d'app proposée par Marwane lors de la review UI/UX (le nouveau standard frontend)

---

## 2. Le Moteur Clinique (KERNEL V5 — Travail Antonin)

> _Source : `KERNEL/KERNEL_V5.md`, `APP/public/kernel/KERNEL_V5.md`, `CONTENT_BLOCKS_SEED.md`, `KERNEL/RECAP_EVOLUTIONS_POST_KERNEL.md`_

### 2.1 Principes Fondamentaux

- **100% déterministe** — pas d'IA dans la décision clinique. Chaque sortie est traçable à une règle.
- **Fonctionne avec ou sans IDEC** — l'aidant peut utiliser Monka en autonomie.
- **Double wording** — chaque reco/MT existe en version utilisateur (empathique) et IDEC (directive pro).

### 2.2 Les Données du Moteur

| Entité | Volume | Description |
|--------|:------:|-------------|
| **Vulnérabilités** | 5 | V1 Social, V2 Admin, V3 Santé aidant, V4 Fragilité proche, V5 Parcours médical |
| **Questions** | 165 | 150 questions état/facteur + 15 triggers contextuels |
| **Micro-Parcours (MP)** | 24 | R1-R4, A1-A4, S1-S4, F1-F6, M1-M6 |
| **Catégories** | 73 | Unités d'activation au sein d'un MP |
| **Règles d'activation** | 235 | Conditions AND sur les réponses (JSON, 9 opérateurs) |
| **Recommandations** | 198 | Actions recommandées (double wording) |
| **Micro-Tâches (MT)** | 369 | Actions concrètes avec acteur, domaine, type contributif |
| **Scoring Questions** | 321 | Coefficients de scoring par V |
| **Scoring Seuils** | 20 | 4 seuils × 5 V (faible/modéré/élevé/critique) |
| **Questions de suivi** | 30 | Détection de changements dans le temps |

### 2.3 Pipeline d'Exécution

```
QUESTIONNAIRE (165 Q)
    │
    ▼
TRIGGERS (N3 = type aidance, O1 = âge)
→ Sélectent quelles questions montrer (130 à 150)
    │
    ▼
SCORING ENGINE (321 coefficients)
→ Score par V (0→max), + seuils faible/modéré/élevé/critique
    │
    ▼
RULE ENGINE (235 règles, JSON AND-logic)
→ Catégories activées, MPs activés, niveau standard/CCC/critique
    │
    ▼
RECOMMENDATIONS (198 recos)
→ Personnalisées par catégorie + niveau, double wording
    │
    ▼
MICRO-TÂCHES (369 MTs)
→ Actions concrètes, acteur identifié, domaine (médical/médico-social)
```

### 2.4 Concepts Clés à Comprendre

**CCC (Condition Critique Composite) :** Combinaison de plusieurs signaux faibles individuels qui, ensemble, révèlent un pattern clinique que personne ne verrait seul. Ex: fatigue + isolement + charge admin = risque d'épuisement. *C'est le différenciateur absolu de Monka.*

**ASR (Action Seuil de Réussite) :** Chaque MP a un objectif mesurable. L'ASR est validée quand toutes les MT contributives (📍 STRUC/SEC/MED) sont complétées. Les MT non-contributives (💡 INFO/ORGA) accompagnent mais ne bloquent pas l'ASR.

**K3 (Englobement) :** Si une catégorie est activée à plusieurs niveaux (standard + CCC + critique), seul le niveau le plus haut s'affiche. Deux catégories différentes ne s'absorbent jamais.

**K13 (Scoring indépendant) :** Le score mesure l'intensité d'une vulnérabilité mais **ne déclenche jamais** un MP. Un score élevé avec 0 MP activé = l'aidant est impacté mais pas dans un pattern nécessitant une action immédiate.

---

## 3. Review UI/UX et Démo App (Travail Marwane)

> _Source : `LIVRABLES/review_ui_ux/`, `app-audit/`, `design-system.md`, `ARCHITECTURE_COUCHES_UI.md`, `PLAN_PRESENTATION_FINALE.md`_

### 3.1 Le Constat sur l'App Actuelle

L'app My Monka actuelle souffre de 5 problèmes majeurs identifiés lors de la review :

| Problème | Impact |
|----------|--------|
| 🧭 **Zéro profondeur** | Navigation plate, tout au même niveau |
| 🎨 **Hiérarchie absente** | Rien ne guide le regard, pas de prioritisation visuelle |
| 🔒 **Paywall mal placé** | Bloque l'utilisateur avant de montrer la valeur |
| 🤖 **Ton froid** | Vocabulaire clinique/technique visible ("Score de vulnérabilité", "CCC") |
| 📦 **Contenu brut** | Articles sans mise en forme mobile |

**Le constat :** Le moteur clinique est riche (5V, 24 MPs, 369 MTs) mais l'interface actuelle ne retranscrit pas cette richesse de manière exploitable pour l'aidant.

### 3.2 La Démo d'App Proposée

Une démo complète a été construite dans `LIVRABLES/review_ui_ux/app-audit/` (Next.js + TypeScript + Tailwind). Elle contient :

- **35 composants** (14 atoms + 18 molecules + 2 nav) avec Storybook
- **3 écrans principaux** : Dashboard, Parcours, Ressources
- **Design System "Wellness Premium"** (fond crème chaud, pastels par thème, formes organiques)
- **Données mock** basées sur le vrai kernel (kernel-types.ts, kernel-mock.ts)

Cette démo **devient le standard** de la nouvelle app My Monka.

### 3.3 L'Architecture en 4 Couches de l'UI

Le mapping Moteur → UI est au cœur de la refonte. Chaque concept du moteur a un composant UI et un mot bienveillant :

```
MOTEUR (Kernel)              →   UI (Composant)           →   MOTS (Copywriting)
────────────────                 ────────────────              ─────────────────
Vulnérabilité (V1-V5)       →   ThemeSelector + HeroCard  →   "Vos thèmes de vie"
Micro-Parcours (24 MP)      →   ProgressCard + ScoreRing  →   "Votre programme"
Recommandation (198 Reco)    →   TaskCard + UrgencyBadge   →   "Vos conseils"
Micro-Tâche (369 MT)        →   MicroTaskItem (cochable)  →   "Action prioritaire 📍"
Score / CCC                  →   ⛔ JAMAIS AFFICHÉ          →   Badge urgence uniquement
```

**Règle absolue du copywriting :** L'aidant ne doit **jamais** voir un terme clinique. Pas de "CCC", pas de "Score", pas de "Vulnérabilité". L'urgence est traduite en action temporelle : _"À faire cette semaine"_ au lieu de _"Critique"_.

### 3.4 Design System v2 (Wellness Premium)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--bg-warm` | `#F8F4EF` | Fond principal (crème chaud) |
| `--text-primary` | `#2D2A26` | Texte (brun foncé, pas noir) |

**5 couleurs par thème de vie :**

| Thème | Accent | Gradient |
|-------|--------|----------|
| V1 Vie sociale (R) | `#8B5CF6` violet | violet → purple |
| V2 Démarches (A) | `#6366F1` indigo | indigo → blue |
| V3 Votre santé (S) | `#E8617A` rose | rose → pink |
| V4 Votre proche (F) | `#E5953E` ambre | amber → orange |
| V5 Parcours soins (M) | `#34C88A` émeraude | emerald → teal |

**Principes visuels :** Formes très arrondies (24px), fond crème chaud (jamais blanc froid), ombres douces, animations Framer Motion (stagger entrée, checkbox spring, ring progress).

### 3.5 Navigation de l'App Cible

```
Dashboard (Home)
  └── HeroCard (Vulnérabilité)        ← clic
        └── themeDetail                ← liste des TaskCard (MP)
              └── TaskCard (MP)        ← clic
                    └── programDetail  ← RecoCards + MicroTaskItems
                          └── RecoCard ← clic = déplie les MT
                                └── MicroTaskItem ← toggle checkbox

Mon Suivi
  └── Filtre par vulnérabilité
        └── Liste TaskCards (MP) avec progression ASR
              └── clic → RecoCards + MTs

Ressources
  └── Articles et supports adaptés

Profil
  └── Questionnaire, réglages
```

---

## 4. Comment le Moteur et l'App se Lient

C'est **LE** point central du document. L'app My Monka est "bête" cliniquement — toute l'intelligence est dans le moteur. L'app fait 3 choses :

### 4.1 Collecte : L'App Fait Passer le Questionnaire

L'utilisateur répond aux 150 questions (guidées par les 15 triggers qui adaptent le parcours selon le type d'aidance et l'âge). L'app envoie les réponses brutes au backend.

### 4.2 Réception : L'App Reçoit le Parcours Personnalisé

Le moteur traite les réponses et produit un `EngineOutput` :
- **Scores** par V (V1: 8/12, V2: 3/8, etc.)
- **MPs activés** avec leur niveau (standard/CCC/critique)
- **Catégories activées** et recos associées
- **MTs concrètes** avec acteur, domaine, type

### 4.3 Affichage : L'App Traduit en UX Bienveillante

L'app prend le JSON du moteur et l'affiche via les 4 couches UI (HeroCard → TaskCard → RecoCard → MicroTaskItem) avec le wording utilisateur. **Aucune logique métier complexe dans le front.**

### 4.4 L'Enjeu Clé : Évolutivité Sans Refacto

Quand Antonin fait évoluer le moteur (ajout de nouvelles catégories, nouvelles CCC, nouvelles MTs), **l'app ne devrait PAS avoir besoin d'être refactorisée.** L'architecture doit être **data-driven** :

- Ajout d'une V6 = ajout de lignes en base → l'app la découvre et l'affiche automatiquement
- Ajout de MTs = l'app les liste dynamiquement
- Ajout de CCC = le niveau d'urgence change automatiquement en UI

C'est la raison pour laquelle l'app est un "lecteur" du moteur, pas un "consommateur hardcodé".

---

## 5. Le CRM Lifeline et le Dispatch Klésia

> _Source : `ARCHITECTURE_DISPATCH_KLESIA.md`_

### 5.1 CRM Lifeline = Le Cockpit Pro

Le CRM Lifeline est l'interface professionnelle, distincte de l'app aidant. C'est là que l'IDEC (infirmière coordinatrice) :
- Voit les dossiers des bénéficiaires
- Lit les résultats du moteur (MPs activés, scores, MTs)
- Pilote le suivi (marque les MTs comme faites, ajoute des notes)

### 5.2 Dispatch Klésia (Expérimentation)

Klésia (mutuelle) apporte des **Care Managers** qui prennent en charge le volet médico-social. Le dispatch se fait **par micro-tâche**, pas par utilisateur :

- **82% des MTs sont médico-sociales** → délégables aux Care Managers
- **18% sont médicales** → restent chez l'IDEC
- L'IDEC est **gate-keeper** : elle valide chaque assignation avant ouverture

**Architecture :** Un portail Care Manager dédié (webapp légère) connecté via API filtrée. Cloisonnement RGPD par design (les données médicales ne transitent jamais vers le portail Care Manager).

### 5.3 Impact sur l'App My Monka

L'app aidant ne connaît pas le dispatch Care Manager/IDEC. L'aidant voit ses MTs, ses recommandations, et sa progression. Le côté pro (CRM + portail Care Manager) est un projet connexe mais distinct.

---

## 6. Roadmap d'Évolution du Moteur (M1 → M2 → M3)

> _Source : `KERNEL/STRATEGIE_PERSONNALISATION_MOTEUR.md`_

La personnalisation de l'app va s'affiner avec l'évolution du moteur :

### M1 — Moteur Fondation (Cible : expé Klésia ~19 mars)
- Questionnaire 150Q adaptatif ✅
- Scoring V1-V5 ✅
- 73 profils (N3 × O1) ✅
- 235 règles d'activation ✅
- MTs identiques quel que soit le profil
- CR Médecin basique

### M2 — Moteur Intelligent (~fin avril)
- **Graduation d'urgence des MPs** (critique/CCC/standard/prévention)
- **CCC enrichis** (20-30 combinaisons cliniques nouvelles)
- **Sous-scores par sous-bloc** (radar V4 par axe cognition/autonomie)
- **CR contextualisé** (phrases adaptées au profil)
- **Score de complexité** inter-V

### M3 — Moteur Personnalisé (~septembre)
- **MTs variantes par profil** (~800-1200 variantes contextualisées)
- **Wording adapté** au profil aidance + âge
- **Acteurs dynamiques** calculés par profil
- **CR personnalisé complet** (document médical pro)
- **Scoring temporel** (comparaison T0 vs T+3 mois)

**Impact sur l'architecture de l'app :** Chaque version du moteur enrichit les données, pas le code front. L'app doit être construite pour absorber M1, M2 et M3 sans restructuration majeure.

---

## 7. Architecture Technique Cible

> _Source : `docs/architecture.md`, `SPRINT.md`_

### 7.1 Stack

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Frontend | React + TypeScript (à définir : Vite, Next.js, ou React Native) | App aidant |
| Backend/Data | **DB existante Monka (hébergée HDS)** | Source de vérité données cliniques — déjà en place |
| Moteur | TypeScript pur (0 React) | Logique clinique isolée |
| Animations | Framer Motion | Micro-interactions premium |
| Icons | Lucide React | Bibliothèque d'icônes |

> **Note importante :** Monka dispose **déjà** d'une base de données hébergée chez un hébergeur certifié HDS (Hébergeur de Données de Santé). Le choix de l'ORM, du framework backend, et de la couche API se fera en concertation avec leur CTO. Le simulateur d'Antonin utilisait Supabase comme outil de prototypage — ce n'est PAS l'infra de production.

### 7.2 Séparation en Couches (Existant dans le Simulateur d'Antonin)

```
clinical/engine/    → Logique clinique PURE (0 import React). Testable unitairement.
clinical/hooks/     → Connecteurs React ↔ Engine. Seul point de contact.
clinical/types/     → Types TypeScript partagés. Aucune logique.
components/         → UI réutilisable. Props → JSX.
pages/              → Orchestration. < 200 lignes. Import hooks + components.
```

**Règles d'import strictes :**
- ✅ `pages/ → hooks/ → engine/`
- ✅ `components/ → types/`
- ❌ `pages/ → engine/` (raccourci = dette technique)
- ❌ `engine/ → React` (moteur = pur TS)

### 7.3 Modèle de Données (13 entités)

```
vulnerabilities (5)
├── questions (165)
├── micro_parcours (24)
│   ├── categories (73)
│   │   ├── activation_rules (235)
│   │   ├── recommendations (198)
│   │   └── micro_taches (369)
│   └── question_mp_mapping (155)
├── scoring_questions (321)
├── scoring_thresholds (20)
├── suivi_questions (30)
├── content_blocks (variable)
└── cr_templates (variable)
```

---

## 8. Sécurité, Auth et Cloisonnement des Données

### Infra Existante
- Monka dispose **déjà** d'une base hébergée HDS (données de santé)
- L'architecture de sécurité s'appuiera sur cette infra existante

### Exigences pour l'App My Monka en Production
- **Authentification** — mécanisme à définir avec le CTO (Magic Link, Email/Password, SSO...)
- **Cloisonnement par rôle (Row-Level Security ou équivalent)** :
  - Un aidant ne lit/écrit que ses propres réponses (`user_answers`)
  - Un Care Manager n'accède qu'aux MTs médico-sociales de ses dossiers validés
  - L'IDEC a une vue globale restreinte à ses dossiers
- **Hébergement HDS** — déjà en place chez Monka
- **Cloisonnement API** pour le portail Care Manager (RGPD par design, les données médicales ne transitent pas)

---

## 9. Contraintes et Règles de Dev (PRAGMA Framework)

| Contrainte | Valeur |
|-----------|--------|
| Fichier max | < 300 lignes |
| Page max | < 200 lignes |
| Composant max | < 250 lignes |
| Fonction max | < 50 lignes |
| TypeScript | Strict, pas de `any` |
| CSS | Vanilla CSS, variables centralisées |
| Logging | Logger structuré, pas de `console.log` |
| Commits | Conventionnels : `type(scope): desc` |
| Quality Gates | Certification **obligatoire** après chaque bloc |
| Accessibilité | WCAG AA (contraste 4.5:1, targets 44px) |
| Tests | En même temps que le code |

---

## 10. Synthèse : Ce qu'on doit Construire

### L'App My Monka = 3 produits liés

| Produit | Audience | Basé sur |
|---------|----------|----------|
| **App Aidant (My Monka)** | L'aidant | Démo UI/UX de Marwane + moteur d'Antonin |
| **CRM Lifeline** | IDEC (professionnels) | Architecture existante + dispatch |
| **Portail Care Manager** | Care Managers Klésia | API filtrée, portail dédié |

### Pour l'App Aidant (priorité #1), il faut :

1. **Le Questionnaire** — UI fluide, guidée par les triggers, adaptative (130 à 150 questions selon le profil). Fond crème, ton bienveillant _"Faisons le point"_.

2. **Le Dashboard** — Affiche les 5 thèmes de vie (HeroCards), la tâche prioritaire du jour, le score de progression. Design Wellness Premium.

3. **Les Parcours** — Drill-down V → MP → Reco → MT. L'aidant coche ses micro-tâches, le ring ASR progresse. _"Bravo ! Objectif atteint 🎉"_.

4. **Le Suivi** — Filtre par thème, vue des MTs en cours, progression temporelle.

5. **L'intégration Moteur** — L'app appelle `runEngine(data, answers)` et reçoit un `EngineOutput`. L'UI **découvre dynamiquement** les données (pas de hardcoding de V1-V5 ou des MPs).

6. **L'hébergement HDS** — Branchement sur la DB existante de Monka (hébergée HDS).

7. **L'Auth** — Authentification + cloisonnement des données par rôle (aidant/IDEC/Care Manager).

### Ce qu'on ne fait PAS dans l'app aidant :
- ❌ Afficher des scores numériques à l'aidant
- ❌ Utiliser du vocabulaire clinique ("CCC", "Vulnérabilité", "Activation")
- ❌ Montrer le CR Médecin dans l'app aidant (c'est pour le CRM pro)
- ❌ Hardcoder les 5V ou les 24 MPs dans le code (tout doit être data-driven)

---

> **Ce document est la base de vérité pour rédiger le PRD complet de l'app My Monka.**
> Il rassemble le travail du moteur clinique (Antonin), la review UI/UX (Marwane), le contexte d'expérimentation (Klésia), et les contraintes techniques (PRAGMA Framework).
