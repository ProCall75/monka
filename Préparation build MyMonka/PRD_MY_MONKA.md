# 📋 PRD — App My Monka v1.0

> **Produit :** My Monka — Application mobile d'accompagnement des aidants familiaux
> **Version :** 1.0 (MVP — Expérimentation Klésia / Article 51)
> **Date :** 21 Février 2026
> **Auteurs :** Marwane Elamri (PRAGMA Studio) · Antonin Rimaud (Moteur Clinique)
> **Statut :** DRAFT — En attente de validation

---

## TABLE DES MATIÈRES

| # | Section | Page |
|---|---------|------|
| 0 | [Résumé Exécutif](#0-résumé-exécutif) | — |
| 1 | [Contexte & Problème](#1-contexte--problème) | — |
| 2 | [Objectifs & Métriques de Succès](#2-objectifs--métriques-de-succès) | — |
| 3 | [Personas & User Stories](#3-personas--user-stories) | — |
| 4 | [Périmètre Fonctionnel (Scope)](#4-périmètre-fonctionnel) | — |
| 5 | [Architecture & Choix Techniques (ADR)](#5-architecture--choix-techniques) | — |
| 6 | [Modèle de Données](#6-modèle-de-données) | — |
| 7 | [Spécification API](#7-spécification-api) | — |
| 8 | [UI/UX & Design System](#8-uiux--design-system) | — |
| 9 | [Conformité Réglementaire (RGPD, HDS, CNIL)](#9-conformité-réglementaire) | — |
| 10 | [Stratégie de Test](#10-stratégie-de-test) | — |
| 11 | [Roadmap & Phasing](#11-roadmap--phasing) | — |
| 12 | [Risques & Mitigations](#12-risques--mitigations) | — |
| 13 | [Hors Scope](#13-hors-scope) | — |
| 14 | [Annexes](#14-annexes) | — |

---

## 0. Résumé Exécutif

**My Monka** est une application mobile pour les **aidants familiaux** (11 millions en France). L'aidant répond à un questionnaire clinique, et un moteur déterministe génère un parcours d'accompagnement personnalisé : vulnérabilités identifiées, recommandations priorisées, micro-tâches concrètes à réaliser.

**Ce qui existe déjà :**
- Un **moteur clinique complet** (KERNEL V5) : 165 questions, 235 règles d'activation, 198 recommandations, 369 micro-tâches, conçu par un gériatre (Dr. Monka). 100% déterministe, 0 IA dans la décision.
- Une **review UI/UX** avec démo d'app (35 composants, Design System Wellness Premium, Storybook).
- Une **base de données existante** hébergée HDS.

**Ce qu'on construit :**
L'application mobile qui marie le moteur clinique à une UX premium, bienveillante et humaine. L'aidant ne voit jamais de vocabulaire clinique — toute l'intelligence est traduite en langage simple et en actions concrètes.

**Contexte d'usage :** Expérimentation Klésia / Article 51. ~3000 aidants cible. Accompagnement par une IDEC (infirmière coordinatrice) et potentiellement des Care Managers Klésia pour le volet médico-social.

---

## 1. Contexte & Problème

### 1.1 Le marché

- **11 millions d'aidants** en France (DREES, 2024)
- **50% développent** des problèmes de santé liés à l'aidance
- **87% ne se considèrent pas** comme "aidants" — ils sont simplement le fils, la fille, le conjoint
- **Aucune app** ne propose un accompagnement clinique personnalisé et déterministe

### 1.2 Le problème de l'app actuelle

L'app My Monka actuelle souffre de 5 problèmes majeurs identifiés lors de la review UI/UX :

| # | Problème | Impact utilisateur |
|---|----------|-------------------|
| 1 | **Navigation plate** | L'aidant ne sait pas quoi faire en premier |
| 2 | **Pas de hiérarchie visuelle** | Tout se ressemble, rien ne guide le regard |
| 3 | **Paywall avant la valeur** | L'aidant est bloqué avant de comprendre le bénéfice |
| 4 | **Ton clinique/froid** | "Score de vulnérabilité", "CCC" — vocabulaire anxiogène |
| 5 | **Contenu brut** | Articles sans mise en forme mobile |

> **Constat :** Un écart significatif existe entre la richesse du moteur clinique et la capacité de l'interface actuelle à la restituer.

### 1.3 L'opportunité

Le moteur clinique est **terminé** (KERNEL V5). Il sait :
- Identifier 5 dimensions de vulnérabilité
- Activer les bons micro-parcours selon le profil
- Détecter des combinaisons critiques (CCC) que personne ne verrait à l'œil nu
- Générer 369 actions concrètes avec acteur identifié

**L'objectif de ce projet est de construire l'application mobile capable de restituer cette richesse clinique en une expérience utilisateur simple et engageante.**

---

## 2. Objectifs & Métriques de Succès

### 2.1 Objectifs Produit

| # | Objectif | Mesure |
|---|----------|--------|
| O1 | **L'aidant complète le questionnaire** | Taux de complétion > 70% |
| O2 | **L'aidant comprend ses thèmes de vie** | Taux d'ouverture du Dashboard après questionnaire > 90% |
| O3 | **L'aidant agit** | Au moins 1 MT cochée dans les 7 premiers jours |
| O4 | **L'aidant revient** | Rétention J7 > 40%, J30 > 25% |
| O5 | **L'aidant se sent accompagné** | Score NPS > 30 à 3 mois |

### 2.2 KPIs Techniques

| KPI | Cible |
|-----|-------|
| Temps de chargement Dashboard | < 2s |
| Temps d'exécution moteur (runEngine) | < 500ms |
| Uptime | 99.5% |
| Taux d'erreur API | < 0.5% |
| Score Lighthouse (mobile) | > 85 |

---

## 3. Personas & User Stories

### 3.1 Persona Primaire : Amal, l'aidante

| | |
|---|---|
| **Nom** | Amal Benali |
| **Âge** | 57 ans (née en 1968) |
| **Situation** | Aidante de sa mère Fatima, 82 ans, atteinte de troubles cognitifs |
| **Emploi** | Assistante administrative, temps partiel |
| **Compétence tech** | Moyenne — utilise WhatsApp, Doctolib |
| **État émotionnel** | Épuisée, isolée, coupable ("je ne fais jamais assez") |
| **Ce qu'elle cherche** | Des actions concrètes, pas un diagnostic de plus |
| **Ce qu'elle fuit** | Le vocabulaire médical, les formulaires longs, les apps froides |

**User Stories (Amal) :**

| ID | En tant que… | Je veux… | Pour… |
|----|-------------|----------|-------|
| US-01 | Amal | Répondre au questionnaire sans me sentir jugée | Que l'app comprenne ma situation |
| US-02 | Amal | Voir mes "thèmes de vie" colorés sur un Dashboard | Comprendre d'un coup d'œil où j'en suis |
| US-03 | Amal | Voir la tâche prioritaire du jour | Savoir quoi faire maintenant |
| US-04 | Amal | Cocher une micro-tâche et voir un anneau progresser | Ressentir que j'avance |
| US-05 | Amal | Être félicitée quand un objectif est atteint | Me sentir encouragée |
| US-06 | Amal | Ne jamais voir "CCC", "Score", "Vulnérabilité" | Ne pas être anxieuse |
| US-07 | Amal | Accéder à des ressources adaptées à ma situation | Trouver de l'aide concrète |
| US-08 | Amal | Contacter l'IDEC facilement depuis l'app | Avoir un humain si besoin |

### 3.2 Persona Secondaire : Sophie, l'IDEC

| | |
|---|---|
| **Nom** | Sophie Lefèvre |
| **Rôle** | IDEC (Infirmière Diplômée d'État Coordinatrice) |
| **Objectif** | Suivre 50+ aidants, prioriser les urgences, agir vite |
| **Outil** | CRM Lifeline (pas l'app aidant) |

**User Stories (Sophie) :**

| ID | En tant que… | Je veux… | Pour… |
|----|-------------|----------|-------|
| US-09 | Sophie | Voir les aidants dont le moteur détecte une CCC | Prioriser mes appels |
| US-10 | Sophie | Lire le CR Médecin généré automatiquement | Gagner du temps en briefing |
| US-11 | Sophie | Voir les MTs assignées et leur statut | Piloter le suivi |

### 3.3 Persona Tertiaire : Karim, le Care Manager (Klésia)

| | |
|---|---|
| **Nom** | Karim Ouali |
| **Rôle** | Care Manager chez Klésia |
| **Accès** | Portail dédié — uniquement les MTs médico-sociales validées par l'IDEC |

**User Stories (Karim) :**

| ID | En tant que… | Je veux… | Pour… |
|----|-------------|----------|-------|
| US-12 | Karim | Voir uniquement les tâches médico-sociales qui m'ont été assignées | Ne pas être submergé |
| US-13 | Karim | Ne jamais voir de données médicales | Être conforme RGPD |

---

## 4. Périmètre Fonctionnel

### 4.1 MVP (v1.0) — Expérimentation Klésia

#### Module 1 : Onboarding & Questionnaire

| Feature | Description | Priorité |
|---------|-------------|----------|
| **F-01** Inscription | Email + mot de passe. Pas de SSO pour le MVP. | 🔴 P0 |
| **F-02** Triggers | Les 15 questions triggers (type d'aidance, âge, etc.) filtrent les questions suivantes. | 🔴 P0 |
| **F-03** Questionnaire adaptatif | 130 à 150 questions selon le profil trigger. UI fluide, une question par écran, barre de progression. Tone : _"Faisons le point"_. | 🔴 P0 |
| **F-04** Sauvegarde partielle | L'aidant peut quitter et reprendre le questionnaire. | 🔴 P0 |
| **F-05** Exécution moteur | À la fin du questionnaire, appel API `POST /engine/run` → retourne l'`EngineOutput`. | 🔴 P0 |

#### Module 2 : Dashboard

| Feature | Description | Priorité |
|---------|-------------|----------|
| **F-06** Accueil personnalisé | _"Bonjour Amal"_ + résumé de la situation. | 🔴 P0 |
| **F-07** Thèmes de vie (HeroCards) | 5 cartes colorées (V1-V5) avec jauge `activeMP / totalMP`. Rendering data-driven. | 🔴 P0 |
| **F-08** Tâche prioritaire | La MT contributive la plus urgente, mise en avant. | 🟠 P1 |
| **F-09** Score de progression global | Anneau montrant la progression ASR agrégée. | 🟠 P1 |

#### Module 3 : Parcours (Drill-Down)

| Feature | Description | Priorité |
|---------|-------------|----------|
| **F-10** themeDetail | Clic sur un HeroCard → liste des TaskCards (MPs) avec statut (activé/prévention), niveau de criticité, jauge ASR. | 🔴 P0 |
| **F-11** programDetail | Clic sur une TaskCard → RecoCards avec niveau d'urgence + MicroTaskItems cochables. | 🔴 P0 |
| **F-12** Toggle MT | Cocher/décocher une MT. Met à jour la jauge ASR en temps réel. Sauvegarde immédiate. | 🔴 P0 |
| **F-13** ASR validée | Quand 100% des MTs contributives sont cochées → animation _"Bravo ! Objectif atteint 🎉"_ + carte passe en mode prévention (grisé). | 🔴 P0 |
| **F-14** Tri MTs | MTs contributives (📍) affichées en premier, puis non-contributives (💡). | 🔴 P0 |

#### Module 4 : Mon Suivi

| Feature | Description | Priorité |
|---------|-------------|----------|
| **F-15** Vue MTs en cours | Liste plate de toutes les MTs actives, filtrables par thème de vie. | 🟠 P1 |
| **F-16** Progression temporelle | Historique simple de la progression (MTs cochées par date). | 🟡 P2 |

#### Module 5 : Ressources

| Feature | Description | Priorité |
|---------|-------------|----------|
| **F-17** Articles contextualisés | Ressources adaptées aux thèmes de vie activés. | 🟠 P1 |
| **F-18** Fiches pratiques | Guides courts sur les démarches (APA, MDPH, etc.). | 🟡 P2 |

#### Module 6 : Profil & Paramètres

| Feature | Description | Priorité |
|---------|-------------|----------|
| **F-19** Profil aidant | Infos personnelles, type d'aidance, info du proche. | 🔴 P0 |
| **F-20** Refaire le questionnaire | Bouton pour relancer le questionnaire et recalculer le parcours. | 🟡 P2 |
| **F-21** Contact IDEC | Bouton de contact direct (téléphone ou messagerie sécurisée). | 🟠 P1 |
| **F-22** Notifications push | Rappels pour les MTs, encouragements. | 🟠 P1 |

### 4.2 Jauges & Indicateurs — Récapitulatif

| Composant UI | Sa jauge affiche | Calcul |
|-------------|-----------------|--------|
| **HeroCard** (Vulnérabilité) | `activeMP / totalMP` | Nombre de MPs activés dans cette V |
| **TaskCard** (Micro-Parcours) | `asrDone / asrTotal` | MTs contributives complétées / total contributives |
| **RecoCard** (Recommandation) | ❌ Pas de jauge | Simple conteneur |
| **MicroTaskItem** (Micro-Tâche) | Checkbox ✅/⬜ | Fait / pas fait |

---

## 5. Architecture & Choix Techniques

### 5.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTS                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  App Aidant   │  │  CRM IDEC    │  │  Portail Care Mgr    │  │
│  │  React Native │  │  (Web)       │  │  (Web léger)         │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬──────────────┘  │
└─────────┼─────────────────┼────────────────────┼────────────────┘
          │                 │                    │
          └────────────┬────┴────────────────────┘
                       │ HTTPS / REST
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    API BACKEND (hébergé HDS)                      │
│                                                                   │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐    │
│  │ Auth (JWT)    │  │ Role-Based    │  │ Audit Trail        │    │
│  │ + Refresh     │  │ Access Ctrl   │  │ + Rate Limiting    │    │
│  └──────┬───────┘  └───────┬───────┘  └────────────────────┘    │
│         └─────────┬────────┘                                     │
│  ┌────────────────┴──────────────────────────────────────────┐   │
│  │          @monka/clinical-engine (Package TS pur)           │   │
│  │          runEngine(data, answers) → EngineOutput           │   │
│  │          Versionné, isolé, 0 dépendance                   │   │
│  └────────────────┬──────────────────────────────────────────┘   │
│  ┌────────────────┴──────────────────────────────────────────┐   │
│  │          DATA LAYER (ORM type-safe)                        │   │
│  └────────────────┬──────────────────────────────────────────┘   │
└────────────────────┼─────────────────────────────────────────────┘
                     │
              ┌──────┴──────┐
              │ PostgreSQL  │  ← DB existante Monka (HDS)
              └─────────────┘
```

### 5.2 Décisions d'Architecture (ADR)

#### ADR-01 : App mobile = React Native (Expo)

| Option | Rejeté/Retenu | Raison |
|--------|:------------:|--------|
| PWA (Next.js) | ❌ | Pas de push natif iOS, pas d'offline robuste, impression "site web" |
| Flutter | ❌ | Pas de réutilisation des composants React de la démo |
| **React Native (Expo)** | ✅ | Natif (gestures, push, offline), conversion directe depuis la démo React, crédibilité investisseur, single codebase iOS+Android |

#### ADR-02 : Backend API = NestJS

| Option | Rejeté/Retenu | Raison |
|--------|:------------:|--------|
| Express brut | ❌ | Pas assez structuré pour une app médicale (auth, guards, interceptors) |
| Django / FastAPI | ❌ | Le moteur est en TypeScript, rester full-stack TS |
| **NestJS** | ✅ | Guards (auth), Interceptors (audit log), Pipes (validation), TypeScript natif, décorators pour les rôles, tested in production pour des apps santé |

#### ADR-03 : Moteur clinique = Package npm interne

| Décision | Justification |
|----------|---------------|
| `@monka/clinical-engine` est un package TS pur, versionné, sans dépendance React ni DB | Antonin peut faire évoluer le moteur (M1→M2→M3) sans toucher au code front. Le moteur est testable unitairement en isolation. CRM, app, et portail consomment le même package. |

#### ADR-04 : Hébergement = Infra HDS existante de Monka

| Décision | Justification |
|----------|---------------|
| L'API backend tourne sur l'infra HDS de Monka (ou un PaaS certifié HDS type Scalingo si migration nécessaire) | Obligation légale pour les données de santé en France. L'infra DB existe déjà chez Monka. Les frontends web (CRM, portail) peuvent être sur Vercel/Netlify car ils ne stockent pas de données de santé. |

#### ADR-05 : Rendu UI = Data-driven (schema-driven rendering)

| Décision | Justification |
|----------|---------------|
| L'app ne hardcode jamais les V, MPs, ou MTs. Elle consomme dynamiquement l'`EngineOutput` et les données de référence. | L'ajout de nouvelles vulnérabilités, MPs, ou MTs ne nécessite aucune modification du code front — l'app s'adapte automatiquement aux données. |

### 5.3 Séparation en Couches (Code Frontend)

```
src/
├── engine/             → @monka/clinical-engine (package externe, importé)
├── api/                → Appels API (REST client, interceptors)
├── hooks/              → React hooks personnalisés (useEngine, useProfile, useAuth)
├── components/
│   ├── ui/             → Design System (HeroCard, TaskCard, ScoreRing, etc.)
│   └── layout/         → Navigation, Header, BottomNav
├── screens/            → Écrans (Dashboard, ThemeDetail, ProgramDetail, Profil)
├── navigation/         → Stack/Tab navigation (React Navigation)
├── store/              → État global (Zustand ou Context)
└── utils/              → Helpers, formatters, constants
```

**Règles :**
- `screens/` importe `hooks/` et `components/`, jamais `engine/` directement
- `hooks/` est le **seul pont** entre l'UI et l'API/moteur
- `components/ui/` reçoit des props, renvoie du JSX — zéro logique métier
- Chaque fichier < 300 lignes, chaque fonction < 50 lignes

---

## 6. Modèle de Données

### 6.1 Tables Moteur (existantes, propriété Monka)

```
vulnerabilities (5)          — Les 5 dimensions de vulnérabilité
questions (165)              — 150 questions + 15 triggers
micro_parcours (24)          — R1-R4, A1-A4, S1-S4, F1-F6, M1-M6
categories (73)              — Unités d'activation au sein d'un MP
activation_rules (235)       — Règles JSONB AND-logic
recommendations (198)        — Double wording (utilisateur + IDEC)
micro_taches (369)           — Actions concrètes (acteur, domaine, type)
scoring_questions (321)      — Coefficients par V
scoring_thresholds (20)      — 4 seuils × 5 V
suivi_questions (30)         — Détection de changements
content_blocks (variable)    — Contenus d'affichage
cr_templates (variable)      — Templates de CR Médecin
question_mp_mapping (155)    — Liens questions ↔ MP
```

### 6.2 Tables Applicatives (à créer pour My Monka)

```sql
-- Utilisateurs
users (
  id UUID PK,
  email TEXT UNIQUE,
  role ENUM('aidant', 'idec', 'care_manager'),
  first_name TEXT,
  created_at TIMESTAMP,
  last_login TIMESTAMP
)

-- Profil aidant (lié à un user)
aidant_profiles (
  id UUID PK,
  user_id UUID FK → users,
  trigger_responses JSONB,          -- Réponses aux 15 triggers
  aidance_type TEXT,                 -- Déduit de N3
  proche_age_range TEXT,             -- Déduit de O1
  questionnaire_completed_at TIMESTAMP
)

-- Réponses au questionnaire
user_answers (
  id UUID PK,
  user_id UUID FK → users,
  question_id TEXT FK → questions,
  answer TEXT,                       -- La réponse choisie
  answered_at TIMESTAMP,
  session_id UUID                    -- Pour gérer la reprise
)

-- Résultat moteur (snapshot)
engine_results (
  id UUID PK,
  user_id UUID FK → users,
  computed_at TIMESTAMP,
  engine_version TEXT,               -- "M1", "M2", etc.
  scores JSONB,                      -- {V1: 8, V2: 3, ...}
  activated_mps JSONB,               -- [{mp_id, level, categories}]
  activated_recos JSONB,
  activated_mts JSONB
)

-- Progression des micro-tâches
user_mt_progress (
  id UUID PK,
  user_id UUID FK → users,
  mt_id TEXT FK → micro_taches,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  engine_result_id UUID FK → engine_results
)

-- Audit trail
audit_logs (
  id UUID PK,
  user_id UUID,
  action TEXT,                       -- 'login', 'answer_submitted', 'mt_toggled', etc.
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP
)

-- Sessions de questionnaire (pour la reprise)
questionnaire_sessions (
  id UUID PK,
  user_id UUID FK → users,
  started_at TIMESTAMP,
  last_activity TIMESTAMP,
  progress_percent DECIMAL,
  status ENUM('in_progress', 'completed', 'abandoned')
)

-- Dossiers (pour le dispatch Care Manager)
dossiers (
  id UUID PK,
  aidant_user_id UUID FK → users,
  idec_user_id UUID FK → users,
  care_manager_user_id UUID FK → users NULL,
  status ENUM('active', 'closed'),
  created_at TIMESTAMP
)
```

### 6.3 Diagramme Relationnel

```
users ──┬── aidant_profiles
        ├── user_answers ──── questions
        ├── engine_results
        ├── user_mt_progress ──── micro_taches
        ├── audit_logs
        ├── questionnaire_sessions
        └── dossiers ──┬── users (idec)
                       └── users (care_manager)
```

---

## 7. Spécification API

### 7.1 Endpoints Principaux

#### Auth

| Method | Endpoint | Description | Rôle |
|--------|---------|-------------|------|
| `POST` | `/auth/register` | Inscription (email + password) | Public |
| `POST` | `/auth/login` | Connexion → JWT + refresh token | Public |
| `POST` | `/auth/refresh` | Renouvellement du JWT | Authentifié |
| `POST` | `/auth/logout` | Invalide le refresh token | Authentifié |

#### Questionnaire

| Method | Endpoint | Description | Rôle |
|--------|---------|-------------|------|
| `GET` | `/questionnaire/triggers` | Retourne les 15 questions triggers | Aidant |
| `POST` | `/questionnaire/triggers` | Envoie les réponses triggers → retourne les questions filtrées | Aidant |
| `GET` | `/questionnaire/questions` | Liste les questions adaptées au profil | Aidant |
| `POST` | `/questionnaire/answers` | Envoie une réponse (sauvegarde partielle) | Aidant |
| `GET` | `/questionnaire/session` | Récupère la session en cours (pour reprise) | Aidant |

#### Moteur

| Method | Endpoint | Description | Rôle |
|--------|---------|-------------|------|
| `POST` | `/engine/run` | Exécute le moteur → retourne `EngineOutput` complet | Aidant |
| `GET` | `/engine/result/:userId` | Récupère le dernier résultat moteur | Aidant, IDEC |

#### Parcours & Progression

| Method | Endpoint | Description | Rôle |
|--------|---------|-------------|------|
| `GET` | `/parcours/dashboard` | Données du dashboard (HeroCards, tâche prioritaire) | Aidant |
| `GET` | `/parcours/theme/:vId` | Détail d'un thème (TaskCards des MPs) | Aidant |
| `GET` | `/parcours/program/:mpId` | Détail d'un MP (RecoCards + MicroTaskItems) | Aidant |
| `PATCH` | `/parcours/mt/:mtId/toggle` | Toggle une MT (complétée/non complétée) | Aidant |
| `GET` | `/parcours/suivi` | Vue agrégée des MTs en cours | Aidant |

#### Profil

| Method | Endpoint | Description | Rôle |
|--------|---------|-------------|------|
| `GET` | `/profile/me` | Profil de l'aidant | Aidant |
| `PATCH` | `/profile/me` | Mise à jour du profil | Aidant |

### 7.2 Format de Réponse

Toutes les réponses suivent le format :

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-02-21T19:00:00Z",
    "engine_version": "M1"
  }
}
```

Erreurs :

```json
{
  "success": false,
  "error": {
    "code": "QUESTIONNAIRE_SESSION_EXPIRED",
    "message": "Votre session a expiré, vos réponses ont été sauvegardées.",
    "details": {}
  }
}
```

### 7.3 Payload `EngineOutput` (réponse de `/engine/run`)

```json
{
  "scores": {
    "V1": { "score": 8, "max": 12, "level": "élevé" },
    "V2": { "score": 3, "max": 8, "level": "faible" },
    "V3": { "score": 6, "max": 10, "level": "modéré" },
    "V4": { "score": 11, "max": 14, "level": "critique" },
    "V5": { "score": 2, "max": 6, "level": "faible" }
  },
  "activated_mps": [
    {
      "mp_id": "R1",
      "vulnerability_id": "V1",
      "level": "ccc",
      "display_name": "Impact sur votre vie",
      "description": "...",
      "asr_total": 4,
      "categories": [
        {
          "category_id": "R1_CCC_01",
          "level": "ccc",
          "recommendations": [
            {
              "reco_id": "R1_RECO_01",
              "wording_utilisateur": "Retrouver du répit",
              "wording_idec": "Orienter vers un dispositif de répit",
              "micro_taches": [
                {
                  "mt_id": "R1_MT_01",
                  "wording_utilisateur": "Contactez votre CCAS pour connaître les solutions de répit",
                  "type": "contributive",
                  "subtype": "STRUC",
                  "actor": "aidant",
                  "domain": "medico_social"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 8. UI/UX & Design System

### 8.1 Direction Artistique : "Wellness Premium"

L'app adopte une identité visuelle chaleureuse et rassurante, inspirée des apps de bien-être. L'aidant doit se sentir accompagné, pas diagnostiqué.

### 8.2 Palette

| Token | Valeur | Usage |
|-------|--------|-------|
| `--bg-warm` | `#F8F4EF` | Fond principal (crème chaud, jamais blanc froid) |
| `--text-primary` | `#2D2A26` | Texte (brun foncé, pas noir) |
| `--text-secondary` | `#8A857E` | Texte secondaire |
| `--text-muted` | `#B8B3AB` | Labels, placeholders |

### 8.3 Couleurs par Thème de Vie

| Thème | Code | Accent | Usage |
|-------|------|--------|-------|
| V1 Vie sociale | R | `#8B5CF6` violet | HeroCard V1, pastilles |
| V2 Démarches | A | `#6366F1` indigo | HeroCard V2 |
| V3 Votre santé | S | `#E8617A` rose | HeroCard V3 |
| V4 Votre proche | F | `#E5953E` ambre | HeroCard V4 |
| V5 Parcours soins | M | `#34C88A` émeraude | HeroCard V5 |

### 8.4 Composants Clés

| Composant | Rôle | Couche Moteur |
|-----------|------|---------------|
| `HeroCard` | Carte thème de vie avec jauge | Vulnérabilité |
| `TaskCard` | Programme avec progression ASR | Micro-Parcours |
| `RecoCard` | Conseil avec badge d'urgence | Recommandation |
| `MicroTaskItem` | Action cochable | Micro-Tâche |
| `ScoreRing` | Anneau de progression | ASR |
| `BottomNav` | Navigation pill flottante (brun foncé) | — |
| `ThemeSelector` | Filtres par thème de vie (cercles colorés) | — |

### 8.5 Copywriting — Règle Absolue

| Terme Moteur | Terme App |
|-------------|-----------|
| Vulnérabilité | _"Vos thèmes de vie"_ |
| Micro-Parcours | _"Votre programme"_ |
| Recommandation | _"Vos conseils"_ |
| Micro-Tâche contributive | _"Action prioritaire 📍"_ |
| Micro-Tâche non-contributive | _"Bon à savoir 💡"_ |
| Score | ⛔ **JAMAIS affiché** |
| CCC | Badge urgence temporelle : _"À faire cette semaine"_ |
| Critique | Badge : _"Prioritaire"_ |
| Standard | Pas de badge |
| ASR validée | _"Objectif atteint — parcours sécurisé 🎉"_ |
| Questionnaire | _"Faisons le point"_ |

---

## 9. Conformité Réglementaire

### 9.1 RGPD

| Exigence | Implémentation |
|----------|---------------|
| **DPO** | Désigner un DPO (Monka ou externe) |
| **Registre de traitements** | Documenter chaque traitement de données de santé |
| **Base légale** | Consentement explicite à l'inscription + intérêt légitime pour le suivi |
| **Droits des personnes** | Accès, rectification, effacement, portabilité — accessible dans le Profil |
| **Durée de conservation** | Données actives pendant la durée de l'accompagnement + 5 ans archivage |
| **AIPD** | Analyse d'Impact obligatoire (données de santé = risque élevé) — à réaliser avant mise en production |
| **Consentement explicite** | Écran de consentement AVANT le questionnaire, avec mention claire de la finalité |
| **Chiffrement** | TLS 1.3 en transit, AES-256 au repos |

### 9.2 HDS (Hébergeur de Données de Santé)

| Exigence | Statut |
|----------|--------|
| **Certification HDS de l'hébergeur** | ✅ Monka dispose déjà d'une infra certifiée HDS |
| **Serveurs en France/EU** | À confirmer avec Monka |
| **Critères DICA** (Disponibilité, Intégrité, Confidentialité, Auditabilité) | À implémenter |
| **Audit trail** | Table `audit_logs` — chaque action traçable |

### 9.3 Cloisonnement des Données par Rôle

| Rôle | Accède à | N'accède PAS à |
|------|----------|---------------|
| **Aidant** | Ses réponses, son parcours (wording_utilisateur), ses MTs | Données des autres aidants, scores bruts, CCC |
| **IDEC** | Dossiers de son secteur, wording_idec, scores, CR | Dossiers hors secteur |
| **Care Manager** | MTs médico-sociales validées de ses dossiers | Données médicales, MTs médicales, scores |

---

## 10. Stratégie de Test

### 10.1 Tests Unitaires — Moteur Clinique

Le moteur est **100% déterministe** → il est **100% testable** unitairement.

| Suite | Ce qu'on teste | Volume estimé |
|-------|---------------|---------------|
| `engine.test.ts` | `runEngine()` avec des jeux de réponses connus → résultat attendu exact | ~50 tests |
| `scoring.test.ts` | `computeScores()` → scores par V | ~25 tests |
| `ruleParser.test.ts` | `evaluateCondition()` → chaque opérateur (eq, neq, in, nin, gt, lt, gte, lte, and) | ~30 tests |
| `ccc.test.ts` | Détection des CCC → combinaisons critiques | ~20 tests |
| `englobement.test.ts` | Règle K3 — le niveau le plus haut absorbe les inférieurs | ~10 tests |

**Personas de test :** 10 personas prédéfinies (5 aidants × 5 proches) avec des réponses figées et des résultats attendus documentés.

### 10.2 Tests d'Intégration — API

| Test | Description |
|------|-------------|
| Auth flow | Register → Login → Refresh → Accès protégé |
| Questionnaire flow | Triggers → Questions filtrées → Réponses → Run engine → Result |
| Role-based access | Aidant ne peut pas accéder aux endpoints IDEC |
| MT toggle | Toggle une MT → vérifier la mise à jour en DB + recalcul ASR |

### 10.3 Tests E2E — Parcours Utilisateur

| Parcours | Étapes |
|----------|--------|
| **Parcours complet** | Inscription → Questionnaire (150Q) → Dashboard → Clic thème → Clic MP → Coche MT → ASR validée |
| **Reprise questionnaire** | Inscription → 30 questions → Quitter → Revenir → Reprendre à Q31 |
| **Aidant pressé** | Dashboard → Tâche prioritaire → Coche → Quitter (< 2 min) |

### 10.4 Tests de Charge

| Scénario | Cible |
|----------|-------|
| 100 utilisateurs simultanés sur le Dashboard | < 2s de latence |
| 50 exécutions moteur simultanées | < 1s par exécution |
| 3000 utilisateurs inscrits, 300 actifs/jour | Stabilité sur 30 jours |

---

## 11. Roadmap & Phasing

### Phase 1 — MVP (Semaines 1-6)

| Semaine | Livrables |
|---------|-----------|
| S1 | Setup projet (Expo, NestJS, CI/CD) + Design System v1 (composants RN) |
| S2 | Auth (inscription, login, JWT) + Profil aidant |
| S3 | Questionnaire (triggers, questions adaptatives, sauvegarde partielle) |
| S4 | Intégration moteur (API `/engine/run`, package clinical-engine) |
| S5 | Dashboard + Drill-down (themeDetail, programDetail, toggle MT) |
| S6 | Mon Suivi + Notifications push + Polish |

**Livrable S6 :** App fonctionnelle testable en interne.

### Phase 2 — Stabilisation & Conformité (Semaines 7-8)

| Livrable |
|----------|
| AIPD (Analyse d'Impact Protection Données) |
| Tests de charge |
| Tests E2E avec personas |
| Audit de sécurité |
| Soumission App Store / Play Store |

### Phase 3 — Expérimentation Klésia (Semaine 9+)

| Livrable |
|----------|
| Déploiement auprès des ~3000 aidants |
| Monitoring & support |
| Itérations basées sur les retours terrain |

### Évolutions Moteur (parallèles)

| Version | Périmètre | Timing estimé |
|---------|-----------|---------------|
| **M1** | Moteur fondation (actuel) | ✅ MVP |
| **M2** | CCC enrichis, sous-scores, CR contextualisé | ~fin avril |
| **M3** | MTs variantes par profil, scoring temporel | ~septembre |

> **Impact sur l'app :** Chaque version du moteur = bump du package `@monka/clinical-engine`. Pas de refacto front.

---

## 12. Risques & Mitigations

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|:-----------:|:------:|------------|
| R1 | **Le questionnaire 150Q est trop long** | 🟠 Moyenne | 🔴 Élevé | UI une question/écran + barre de progression + sauvegarde partielle + ton encourageant |
| R2 | **L'aidant ne comprend pas les thèmes de vie** | 🟡 Faible | 🟠 Moyen | Copywriting validé par Dr. Monka + test utilisateur pré-launch |
| R3 | **Performances du moteur sur mobile** | 🟡 Faible | 🟠 Moyen | Le moteur tourne côté serveur, pas sur le device |
| R4 | **Le CTO Monka a des contraintes d'infra inconnues** | 🟠 Moyenne | 🟠 Moyen | Session technique dédiée avant le build pour aligner |
| R5 | **Le Dr. Monka n'a pas validé tous les templates** | 🟠 Moyenne | 🔴 Élevé | Le moteur prend les données en base — si Antonin corrige les données, l'app suit automatiquement |
| R6 | **Les stores Apple/Google rejettent l'app** | 🟡 Faible | 🔴 Élevé | Respecter les guidelines santé dès le développement |
| R7 | **CNIL demande des ajustements** | 🟠 Moyenne | 🟠 Moyen | Réaliser l'AIPD en amont, consultation DPO |

---

## 13. Hors Scope (v1.0)

Les éléments suivants ne sont **PAS** traités dans le MVP :

| Élément | Raison |
|---------|--------|
| CRM Lifeline (interface IDEC) | Projet connexe, pas l'app aidant |
| Portail Care Manager | Projet connexe, dépend du dispatch validé |
| Paiement / abonnement | L'expé Klésia est gratuite pour les aidants |
| Chat avec l'IDEC | Trop complexe pour le MVP — simple bouton de contact |
| IA générative / chatbot | Le moteur est déterministe, pas d'IA |
| CR Médecin affiché dans l'app aidant | Le CR est pour le CRM pro |
| Multi-langue | Français uniquement pour le MVP |
| Mode offline complet | Trop complexe — lecture seule offline dans v2 |

---

## 14. Annexes

### Annexe A — Documents de Référence

| Document | Localisation | Contenu |
|----------|-------------|---------|
| KERNEL V5 | `APP/public/kernel/KERNEL_V5.md` | Référence moteur clinique |
| Stratégie Personnalisation | `KERNEL/STRATEGIE_PERSONNALISATION_MOTEUR.md` | Roadmap M1→M2→M3 |
| Architecture Dispatch Klésia | `ARCHITECTURE_DISPATCH_KLESIA.md` | Dispatch IDEC / Care Manager |
| Design System v2 | `LIVRABLES/review_ui_ux/app-audit/design-system.md` | Tokens, palette, typo |
| Architecture Couches UI | `LIVRABLES/review_ui_ux/ARCHITECTURE_COUCHES_UI.md` | Mapping Moteur → UI |
| Content Blocks Seed | `CONTENT_BLOCKS_SEED.md` | Données cliniques extraites |
| Évolutions Post-Kernel | `KERNEL/RECAP_EVOLUTIONS_POST_KERNEL.md` | Delta depuis KERNEL v4 |
| Context Global | `Préparation build MyMonka/CONTEXT_MONKA_APP_PRD.md` | Doc de contexte |

### Annexe B — Glossaire

| Terme | Définition |
|-------|-----------|
| **V (Vulnérabilité)** | Dimension de fragilité (V1 Social, V2 Admin, V3 Santé, V4 Fragilité, V5 Médical) |
| **MP (Micro-Parcours)** | Programme d'actions au sein d'une V (24 au total) |
| **MT (Micro-Tâche)** | Action concrète à réaliser (369 au total) |
| **CCC** | Condition Critique Composite — combinaison de signaux faibles = alerte |
| **ASR** | Action Seuil de Réussite — objectif mesurable d'un MP |
| **IDEC** | Infirmière Diplômée d'État Coordinatrice |
| **HDS** | Hébergeur de Données de Santé (certification française obligatoire) |
| **AIPD** | Analyse d'Impact relative à la Protection des Données |
| **DICA** | Disponibilité, Intégrité, Confidentialité, Auditabilité |
| **K-Rules** | Les 13 règles du moteur clinique (K1 à K13) |

---

> **Ce PRD est un document vivant.** Il sera mis à jour au fur et à mesure des validations cliniques (Dr. Monka), des retours du CTO Monka, et des itérations terrain.
>
> **Prochaine étape :** Review par le CTO Monka → alignement technique → démarrage Phase 1.
