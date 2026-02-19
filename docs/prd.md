# 📋 PRD — Monka Clinical Engine

> **Version :** 1.0 — 19/02/2026
> **Projet :** Monka Clinical Engine
> **Auteur :** PRAGMA Studio
> **Stack :** React 18 + TypeScript + Vite + Supabase
> **Livraison :** En interne (fichiers code)

---

## 1. Contexte

Monka est un moteur clinique déterministe conçu pour évaluer la situation des aidants familiaux à travers 5 dimensions de vulnérabilité (V1–V5). Le moteur analyse les réponses à 165 questions, active des règles cliniques (235 au total), et génère des recommandations personnalisées déclinées en micro-tâches actionnables.

### Ce que le sprint accomplit

Transformer le prototype existant (SimulatorPage monolithique de ~5000 lignes) en une **application professionnelle** avec :
- Architecture isolée du moteur clinique
- Design system cohérent
- Documentation complète
- Quality gates automatisés

### Livraison

Application livrée en interne — fichiers source remis au client. Pas de système d'authentification pour le moment (horizon ~6 mois).

---

## 2. Données Cliniques

### Volume

| Entité | Quantité | Source |
|--------|----------|--------|
| Vulnérabilités (V) | 5 | `vulnerabilities` |
| Questions | 165 (150 + 15 triggers) | `questions` |
| Micro-Parcours (MP) | 24 | `micro_parcours` |
| Catégories | 73 | `categories` |
| Règles d'activation | 235 | `activation_rules` |
| Questions scoring | 321 | `scoring_questions` |
| Seuils scoring | 20 | `scoring_thresholds` |
| Recommandations | 198 | `recommendations` |
| Micro-Tâches (MT) | 369 | `micro_taches` |
| Questions de suivi | 30 | `suivi_questions` |

### Logique du moteur

```
Réponses utilisateur
  → Évaluation des 235 règles (condition_logic JSONB, AND logic)
    → Catégories activées (avec niveau: standard/ccc/critique)
      → MPs activés
        → Recommandations correspondantes (wording utilisateur + IDEC)
          → Micro-tâches avec acteurs identifiés
  → Scoring parallèle (coefficients × réponses → score par V → seuils)
```

Le moteur est **déterministe** : mêmes réponses = mêmes résultats. Pas d'IA, pas de machine learning.

---

## 3. User Stories

### 👨‍⚕️ Dr. Monka (Médecin / Fondateur Clinique)

| # | User Story | Priorité | Bloc |
|---|-----------|----------|------|
| US-01 | En tant que médecin, je veux voir le `sens_clinique` de chaque règle activée afin de comprendre **pourquoi** le moteur recommande cette action | P0 | 4 |
| US-02 | En tant que médecin, je veux un CR professionnel exportable en PDF afin de l'intégrer au dossier patient | P0 | 6 |
| US-03 | En tant que médecin, je veux voir la chaîne complète Question→Règle→Reco→MT afin de valider la logique clinique | P0 | 11 |
| US-04 | En tant que médecin, je veux un mode What-If pour modifier une réponse et voir l'impact en temps réel | P1 | 14 |
| US-05 | En tant que médecin, je veux pouvoir comparer 2-3 personas afin de vérifier la sensibilité du moteur | P1 | 15 |
| US-06 | En tant que médecin, je veux un indicateur de confiance moteur afin de savoir si des trous existent dans la couverture clinique | P1 | 16 |

### 🏢 CEO (Direction Générale)

| # | User Story | Priorité | Bloc |
|---|-----------|----------|------|
| US-07 | En tant que CEO, je veux une vue patient démontrable (style app moderne) afin de convaincre les investisseurs et partenaires | P0 | 5 |
| US-08 | En tant que CEO, je veux que l'app soit certifiée PRAGMA (quality gates documentés) afin de rassurer le CTO et les auditeurs | P0 | QGs |
| US-09 | En tant que CEO, je veux voir un "score de confiance moteur" afin de quantifier la maturité de la solution | P1 | 16 |
| US-10 | En tant que CEO, je veux une architecture technique documentée afin que n'importe quel dev puisse reprendre le code | P0 | 1 |

### 👩‍💼 COO (Opérations)

| # | User Story | Priorité | Bloc |
|---|-----------|----------|------|
| US-11 | En tant que COO, je veux un tableau de bord IDEC afin de visualiser le workflow quotidien des infirmières coordinatrices | P1 | 18 |
| US-12 | En tant que COO, je veux voir le gap score-action afin de détecter les situations où un score élevé ne déclenche aucune action | P1 | 10 |
| US-13 | En tant que COO, je veux pouvoir valider les données d'intégrité afin de m'assurer que le moteur n'a pas de failles | P1 | 17 |
| US-14 | En tant que COO, je veux des rapports de certification entre chaque phase afin de suivre la qualité du développement | P0 | QGs |

### 🧑‍💻 CPO (Produit)

| # | User Story | Priorité | Bloc |
|---|-----------|----------|------|
| US-15 | En tant que CPO, je veux une navigation restructurée (4 onglets au lieu de 6) afin de simplifier l'expérience utilisateur | P0 | 3 |
| US-16 | En tant que CPO, je veux des filtres avancés sur les questions afin d'accéder rapidement aux données pertinentes | P1 | 7 |
| US-17 | En tant que CPO, je veux une heatmap de couverture clinique afin de visualiser les questions orphelines | P1 | 13 |
| US-18 | En tant que CPO, je veux que le design soit cohérent (design system) afin d'avoir une identité visuelle premium | P0 | 2 |

### 💰 Investisseurs

| # | User Story | Priorité | Bloc |
|---|-----------|----------|------|
| US-19 | En tant qu'investisseur, je veux voir une démo patient premium afin de comprendre la proposition de valeur | P0 | 5 |
| US-20 | En tant qu'investisseur, je veux voir la certification PRAGMA (28 sections) afin de juger la qualité technique | P0 | QGs |
| US-21 | En tant qu'investisseur, je veux voir des métriques de couverture (% questions couvertes, % wordings complets) afin d'évaluer la maturité | P1 | 16 |
| US-22 | En tant qu'investisseur, je veux voir l'architecture technique isolée afin de juger la scalabilité | P0 | 1 |

### 🩺 IDEC (Infirmière Coordinatrice)

| # | User Story | Priorité | Bloc |
|---|-----------|----------|------|
| US-23 | En tant qu'IDEC, je veux voir le wording IDEC (pas utilisateur) dans mes interfaces afin d'avoir une vision professionnelle | P0 | 18 |
| US-24 | En tant qu'IDEC, je veux un dashboard avec mes actions prioritaires afin de structurer mon quotidien | P1 | 18 |
| US-25 | En tant qu'IDEC, je veux voir les niveaux de suivi (1/2/3) par personne suivie afin de prioriser mes interventions | P2 | 18 |

---

## 4. Pages de l'Application

| Page | Description | US couvertes |
|------|-------------|-------------|
| `DashboardPage` | Vue d'ensemble avec scores V1-V5 | — |
| `SimulatorPage` | Orchestrateur 4 onglets (MP, Scoring, Règles, CR) | US-01, US-15 |
| `ExternalViewPage` | Vue patient premium, ton empathique | US-07, US-19 |
| `QuestionsPage` | Fiches questions avec filtres avancés | US-16 |
| `VulnerabilitiesPage` | Drill-down V → MP → Détail | — |
| `PersonasPage` | Sélection et gestion des personas | — |
| `ComparisonPage` | Comparaison 2-3 personas côte à côte | US-05 |
| `CoveragePage` | Heatmap couverture clinique | US-17, US-21 |
| `EngineHealthPage` | Score de confiance moteur | US-06, US-09 |
| `IDECDashboard` | Tableau de bord IDEC | US-11, US-24, US-25 |
| `OfficialDocsPage` | Documents officiels du kernel | — |

---

## 5. Contraintes Techniques

| Contrainte | Valeur |
|-----------|--------|
| Fichier max | < 300 lignes |
| Page max | < 200 lignes |
| Composant React max | < 250 lignes |
| Fonction max | < 50 lignes |
| TypeScript | Strict, pas de `any` |
| Tests | En même temps que le code |
| Framework CSS | Vanilla CSS, variables centralisées |
| Accessibilité | WCAG AA (contraste 4.5:1, targets 44px) |
| Auth | Aucune (livraison interne) – à anticiper ~6 mois |

---

## 6. Infrastructure

| Service | Usage |
|---------|-------|
| **Supabase** `mbxeqrvofrmhqlwlefff` | Base de données PostgreSQL (13 tables) |
| **Vite** | Build et dev server |
| **React 18** | Framework UI |
| **TypeScript** | Typage statique |

---

## 7. Hors Scope (v1)

- ❌ Authentification / login
- ❌ RLS / policies de sécurité
- ❌ Backend server / Edge Functions
- ❌ Déploiement en production
- ❌ Multilingue (préparé structurellement, pas implémenté)
- ❌ IA / Machine Learning (moteur 100% déterministe)

---

*Référence : [SPRINT.md](../SPRINT.md) — [Architecture](architecture.md) — [Glossaire](glossary.md)*
