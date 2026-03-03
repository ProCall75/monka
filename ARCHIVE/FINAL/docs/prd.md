# 📋 PRD — Monka Clinical Engine

> **Version :** 3.0 — 22/02/2026
> **Projet :** Monka Clinical Engine
> **Auteur :** PRAGMA Studio
> **Stack :** React 18 + TypeScript + Vite + Supabase
> **Livraison :** En interne (fichiers code)
> **Références :** [Architecture](architecture.md) — [Glossaire](glossary.md) — [Architecture DB](../FINAL/ARCHITECTURE_DB.md) — [SPRINT.md](../SPRINT.md)

---

## 1. Problème

### 1.1 Contexte Marché

La France compte **11 millions d'aidants familiaux**, dont une majorité invisible dans le parcours de soins. L'évaluation de la vulnérabilité de l'aidant est aujourd'hui **manuelle** (entretien IDEC de 45-90 minutes, grille papier) et **non reproductible** : deux IDEC peuvent interpréter les mêmes réponses différemment.

### 1.2 Douleur Client

Monka, société spécialisée dans l'accompagnement des aidants, dispose d'une **expertise clinique avancée** (modèle gériatrique à 5 dimensions de vulnérabilité) mais peine à la traduire en logiciel :

| Problème | Impact |
|----------|--------|
| Évaluation manuelle par IDEC | ~15h/cas → coût prohibitif à l'échelle |
| Pas de standardisation | 2 professionnels peuvent donner 2 résultats différents |
| Prototype logiciel monolithique (~5000L) | Impossible à maintenir, tester ou faire évoluer |
| Aucune certification qualité | Impossible de présenter à des auditeurs ou investisseurs |
| Data clinique éparpillée | 165 questions, 240 règles, 390 micro-tâches dans des fichiers MD dispersés |

### 1.3 Opportunité

Transformer le prototype Monka en **moteur clinique certifié** qui :
- **Automatise** l'évaluation (mêmes réponses = mêmes résultats, en temps réel)
- **Standardise** l'expertise clinique dans un engine déterministe
- **Démontre** la valeur aux investisseurs et partenaires institutionnels (CNRS, mutuelles)
- **Prépare** le passage à l'échelle (~6 mois : auth, multi-tenant, déploiement SaaS)

---

## 2. Objectifs et Succès

### 2.1 Objectifs Produit

| # | Objectif | Métrique de Succès | Horizon |
|---|----------|--------------------|---------|
| O1 | Moteur clinique déterministe fonctionnel | 100% des 240 règles évaluables en temps réel | ✅ Fait |
| O2 | Architecture isolée et maintenable | Séparation engine/UI stricte, clinical/ isolé | ✅ Fait |
| O3 | Expérience démo premium | CEO/investisseur convaincu en < 5 min de démo | Sprint |
| O4 | Certification qualité PRAGMA | 20 Quality Gates documentés | Sprint |
| O5 | Scalabilité préparée | Architecture auth-ready en < 1 semaine d'intégration | ~6 mois |

### 2.2 KPIs de Succès

| KPI | Cible | Mesure |
|-----|-------|--------|
| Couverture questions | 100% (165/165 dans ≥1 règle) | `EngineHealthPage` — Bloc 16 |
| Temps d'évaluation | < 100ms pour 240 règles | Performance runtime |
| Complétude wording | > 90% des recos avec wording utilisateur + IDEC | Métriques moteur |
| Score Engine Health | > 85/100 | Score composite — Bloc 16 |
| Taille fichiers | 100% < 300 lignes | Lint automatique |

---

## 3. Personas et User Stories

### 3.1 Persona : Dr. Monka — Médecin Fondateur Clinique

**Profil :** Gériatre, fondateur de l'expertise clinique Monka. Responsable de la validation médicale de l'outil. Sensibilité forte à la rigueur clinique, peu tolérant aux approximations.

**Frustrations actuelles :**
- Ne peut pas vérifier si une règle est correctement implémentée sans lire le code
- Le CR Médecin est un résumé basique, pas un document professionnel
- Impossible de tracer le chemin Question → Règle → Recommandation → Action

| # | User Story | Critères d'Acceptation | Priorité | Bloc |
|---|-----------|------------------------|----------|------|
| US-01 | En tant que médecin, je veux voir le `sens_clinique` de chaque règle activée afin de comprendre **pourquoi** le moteur recommande cette action | - Chaque règle affiche son `sens_clinique` sous le titre<br>- Si `sens_clinique` est vide, afficher "Non documenté" en italique<br>- Le texte est affiché dans un tooltip au hover et en bloc au clic | P0 | 4 |
| US-02 | En tant que médecin, je veux un CR professionnel exportable en PDF afin de l'intégrer au dossier patient | - CR structuré avec en-tête, synthèse scores, détail par V<br>- Export PDF via `Ctrl+P` / bouton print<br>- Rendu conforme en print preview (pas d'artefacts UI) | P0 | 6 |
| US-03 | En tant que médecin, je veux voir la chaîne complète Question→Règle→Reco→MT afin de valider la logique clinique | - Composant `ClinicalChain` cliquable depuis n'importe quel élément<br>- Chaîne affiche les 5 niveaux avec liens entre eux<br>- Si un maillon est manquant → alerte visuelle | P0 | 11 |
| US-04 | En tant que médecin, je veux un mode What-If pour modifier une réponse et voir l'impact en temps réel | - Toggle What-If dans la barre d'outils<br>- Chaque réponse devient un dropdown éditable<br>- Diff affiché : "+2 règles, -1 MP"<br>- Bouton Reset vers réponses persona | P1 | 14 |
| US-05 | En tant que médecin, je veux comparer 2-3 personas côte à côte afin de vérifier la sensibilité du moteur | - Sélecteur multi-persona (max 3)<br>- Colonnes parallèles : scores, MPs, règles<br>- Réponses divergentes surlignées<br>- Delta analysis automatique | P1 | 15 |
| US-06 | En tant que médecin, je veux un indicateur de confiance moteur afin de savoir si des trous existent dans la couverture clinique | - Score composite /100 visible dans le header<br>- Drill-down vers les 6 métriques composantes<br>- Alertes sur les failles (question orpheline, wording manquant) | P1 | 16 |

### 3.2 Persona : CEO — Direction Générale

**Profil :** Entrepreneur, cherche à lever des fonds et à signer des partenariats institutionnels (mutuelles, CNRS). Besoin de matériel de démo premium et de preuve de qualité technique.

**Frustrations actuelles :**
- Le prototype a l'air "fait maison" → mauvaise impression pour les investisseurs
- Aucune documentation technique → impossible de rassurer un CTO ou auditeur
- Impossible de déléguer le dev à une autre équipe

| # | User Story | Critères d'Acceptation | Priorité | Bloc |
|---|-----------|------------------------|----------|------|
| US-07 | En tant que CEO, je veux une vue patient démontrable afin de convaincre les investisseurs et partenaires | - Vue Externe premium (glassmorphism, micro-animations, Inter font)<br>- Wording empathique ("Nous vous recommandons..." pas "Vous devez...")<br>- Hiérarchie visuelle critique → standard → prévention<br>- Responsive mobile-first | P0 | 5 |
| US-08 | En tant que CEO, je veux que l'app soit certifiée PRAGMA (quality gates documentés) afin de rassurer le CTO et les auditeurs | - 20 rapports de certification dans `docs/certifications/`<br>- Chaque rapport contient verdict + sections vérifiées<br>- Traçabilité complète du processus | P0 | QGs |
| US-09 | En tant que CEO, je veux voir un "score de confiance moteur" afin de quantifier la maturité de la solution | - Score composite visible, compréhensible sans contexte technique<br>- Benchmark contre des cibles explicites | P1 | 16 |
| US-10 | En tant que CEO, je veux une architecture technique documentée afin que n'importe quel dev puisse reprendre le code | - `docs/architecture.md` avec diagrammes<br>- ADR documenté<br>- README à jour | P0 | 1 |

### 3.3 Persona : COO — Opérations

**Profil :** Responsable des opérations, supervise les IDEC. Veut s'assurer que le moteur ne produit pas de résultats absurdes (score critique sans action, par exemple).

| # | User Story | Critères d'Acceptation | Priorité | Bloc |
|---|-----------|------------------------|----------|------|
| US-11 | En tant que COO, je veux un tableau de bord IDEC afin de visualiser le workflow quotidien des infirmières coordinatrices | - Dashboard avec actions groupées par priorité<br>- Wording IDEC (pas utilisateur)<br>- Niveaux de suivi (1/2/3) visibles | P1 | 18 |
| US-12 | En tant que COO, je veux voir le gap score-action afin de détecter les situations où un score élevé ne déclenche aucune action | - Alerte visuelle si score > seuil élevé ET 0 MP activé<br>- Liste des V concernées<br>- Drill-down vers les questions manquantes | P1 | 10 |
| US-13 | En tant que COO, je veux pouvoir valider les données d'intégrité afin de m'assurer que le moteur n'a pas de failles | - Page dédiée avec checks FK, NULL, orphelins<br>- Résultats en vert/rouge<br>- Export rapport intégrité | P1 | 17 |
| US-14 | En tant que COO, je veux des rapports de certification entre chaque phase afin de suivre la qualité du développement | - Rapports QG accessibles depuis l'app<br>- Verdict clair : ✅ / ⚠️ / 🔴 | P0 | QGs |

### 3.4 Persona : CPO — Produit

**Profil :** Responsable produit. S'intéresse à l'UX, la fluidité de navigation, et la cohérence visuelle. Veut une app que l'on peut montrer sans avoir honte.

| # | User Story | Critères d'Acceptation | Priorité | Bloc |
|---|-----------|------------------------|----------|------|
| US-15 | En tant que CPO, je veux une navigation restructurée (4 onglets au lieu de 6) afin de simplifier l'expérience utilisateur | - 4 onglets : Scoring, Micro-Parcours, Règles, Résumé<br>- Micro-Parcours contient sub-tabs Activation/Recos/Tâches<br>- Transition animée entre onglets<br>- Aucune régression fonctionnelle | P0 | 3 |
| US-16 | En tant que CPO, je veux des filtres avancés sur les questions afin d'accéder rapidement aux données pertinentes | - Filtres : V, MP, type, aidance block, texte libre, score max<br>- Vue alternative hiérarchique (V → Bloc → Questions)<br>- Compteurs temps réel sur chaque filtre | P1 | 7 |
| US-17 | En tant que CPO, je veux une heatmap de couverture clinique afin de visualiser les questions orphelines | - Matrice 165 × 24 (questions × MPs)<br>- Intensité = nombre de règles<br>- Trous facilement identifiables<br>- Stats : % couverture, orphelines | P1 | 13 |
| US-18 | En tant que CPO, je veux que le design soit cohérent (design system) afin d'avoir une identité visuelle premium | - Design system dans `components/ui/`<br>- Variables CSS centralisées<br>- 6 composants : StatusBadge, ScoreGauge, HeroCard, Tooltip, ProgressBar, FilterBar | P0 | 2 |

### 3.5 Persona : Investisseur

**Profil :** VC ou partenaire institutionnel. Dispose de < 5 minutes d'attention. Veut comprendre la proposition de valeur, juger la maturité technique, et évaluer la scalabilité.

| # | User Story | Critères d'Acceptation | Priorité | Bloc |
|---|-----------|------------------------|----------|------|
| US-19 | En tant qu'investisseur, je veux voir une démo patient premium afin de comprendre la proposition de valeur | - Démo navigation V → MP → Recos en < 2 min<br>- Design "app réelle" (pas un prototype)<br>- Données réalistes (persona Mireille) | P0 | 5 |
| US-20 | En tant qu'investisseur, je veux voir la certification PRAGMA (28 sections) afin de juger la qualité technique | - Rapport certification accessible<br>- Score global de conformité | P0 | QGs |
| US-21 | En tant qu'investisseur, je veux voir des métriques de couverture afin d'évaluer la maturité | - % questions couvertes, % wordings complets<br>- Score Engine Health visible<br>- Comparaison avec cibles | P1 | 16 |
| US-22 | En tant qu'investisseur, je veux voir l'architecture technique isolée afin de juger la scalabilité | - Diagramme d'architecture lisible<br>- Séparation engine/UI démontrée<br>- Plan auth future documenté | P0 | 1 |

### 3.6 Persona : IDEC — Infirmière Coordinatrice

**Profil :** Professionnelle de terrain. Utilise le moteur au quotidien pour planifier ses interventions. Besoin d'efficacité et de clarté, pas de complexité technique.

| # | User Story | Critères d'Acceptation | Priorité | Bloc |
|---|-----------|------------------------|----------|------|
| US-23 | En tant qu'IDEC, je veux voir le wording IDEC (pas utilisateur) dans mes interfaces afin d'avoir une vision professionnelle | - `wording_idec` affiché dans le dashboard IDEC<br>- `wording_utilisateur` réservé à la Vue Externe<br>- Pas de mélange des deux registres | P0 | 18 |
| US-24 | En tant qu'IDEC, je veux un dashboard avec mes actions prioritaires afin de structurer mon quotidien | - Actions groupées par niveau (critique → CCC → standard)<br>- Checkbox de complétion<br>- Filtres par V et par persona | P1 | 18 |
| US-25 | En tant qu'IDEC, je veux voir les niveaux de suivi (1/2/3) par personne suivie afin de prioriser mes interventions | - Indicateur de suivi visible<br>- Code couleur niveau | P2 | 18 |

---

## 4. Logique Clinique du Moteur

### 4.1 Les 5 Dimensions de Vulnérabilité

| V | Nom | Bloc Questionnaire | Questions | MPs | Description |
|---|-----|---------------------|:---------:|:---:|-------------|
| V1 | Social et relationnel | Bloc 3 — Entourage et relations | 15 | 4 (R1-R4) | Isolement social, réseau d'aide, fréquence des contacts |
| V2 | Administrative | Bloc 7 — Démarches administratives | 18 | 4 (A1-A4) | Droits non ouverts, complexité administrative, surcharge |
| V3 | Santé physique et psychologique | Bloc 4 — Santé de l'aidant | 26 | 4 (S1-S4) | Fatigue, épuisement psychologique, renoncement aux soins |
| V4 | Fragilité du proche | Bloc 5 — Vie quotidienne et fragilités | 55 | 6 (F1-F6) | Perte d'autonomie, troubles cognitifs, risques chutes |
| V5 | Parcours médical du proche | Bloc 6 — Parcours de soins du proche | 36 | 6 (M1-M6) | Coordination soins, hospitalisations, iatrogénie |

### 4.2 Pipeline d'Évaluation

```
                    ENTRÉE                              SORTIE
                    ──────                              ──────
 Réponses utilisateur (165 Q)
            │
            ▼
 ┌──────────────────────────┐
 │   TRIGGERS (15 questions) │──→ Active/désactive des blocs de Q conditionnels
 │   N3 (aidance type)      │    Ex: N3="Maladie" → active bloc "Pathologie"
 │   O1 (tranche d'âge)     │
 └──────────┬───────────────┘
            │
            ▼
 ┌──────────────────────────┐
 │  SCORING ENGINE          │──→ Score par V (0–max)
 │  345 coefficients        │    + Seuil par V (faible/modéré/élevé/critique)
 │  score = Σ(coef × rép)  │
 └──────────┬───────────────┘
            │
            ▼
 ┌──────────────────────────┐
 │  RULE ENGINE             │──→ Catégories activées (73 possibles)
 │  240 règles (JSONB)      │    + MPs activés (24 possibles)
 │  AND-logic conditions    │    + Niveau: prev | standard | ccc | critique
 │  9 opérateurs            │
 └──────────┬───────────────┘
            │
            ▼
 ┌──────────────────────────┐
 │  RECOMMENDATION ENGINE   │──→ Recos personnalisées (198 possibles)
 │  Recos par catégorie     │    + wording_utilisateur
 │  Priorisées par niveau   │    + wording_idec
 └──────────┬───────────────┘
            │
            ▼
 ┌──────────────────────────┐
 │  MICRO-TÂCHES            │──→ Actions concrètes (390 possibles)
 │  Par catégorie + MP      │    + Acteur identifié (IDEC, AS, médecin...)
 │  ASR (signatures A/B)    │    + Objectif de sortie
 └──────────┬───────────────┘
            │
            ▼
 ┌──────────────────────────┐
 │  GUIDES                  │──→ 42 guides d'action (Tier 1-3)
 │  Procédures concrètes    │    + 61 liens guide→MT
 │  Contacts + Documents    │    + Durée estimée + Tip
 └──────────────────────────┘
```

### 4.3 Système de Règles

Chaque règle est stockée en JSONB (`condition_logic`) et évaluée en **AND-logic** :

```json
{
  "condition_logic": [
    { "q": "E7", "op": "in", "vals": ["Souvent", "Tout le temps"] },
    { "q": "E8", "op": "gte", "min": 3 }
  ]
}
```

**Opérateurs supportés (9) :**

| Opérateur | Sémantique | Exemple |
|-----------|-----------|---------|
| `eq` | Égalité stricte | `"q": "N4", "op": "eq", "val": "Oui"` |
| `neq` | Différent de | `"op": "neq", "val": "Non"` |
| `ne` | Alias de `neq` | — |
| `in` | Parmi une liste | `"op": "in", "vals": ["A", "B"]` |
| `nin` | Pas dans la liste | `"op": "nin", "vals": ["Jamais"]` |
| `gte` | Supérieur ou égal | `"op": "gte", "min": 3` |
| `contains` | Contient (multi-réponse) | `"op": "contains", "val": "X"` |
| `count_gte` | Nombre de réponses ≥ | `"op": "count_gte", "min": 2` |
| `has_any` | Au moins une valeur commune | `"op": "has_any", "vals": ["A", "B"]` |

**CCC (Combinaison de Criticité Clinique) :** Plusieurs signaux faibles individuels qui, combinés, forment un signal fort. Ex : fatigue modérée + isolement modéré + charge administrative → CCC, même si aucun critère n'est individuellement critique.

### 4.4 Système de Scoring

Calcul parallèle à l'évaluation des règles :

```
Score_V = Σ (coefficient × valeur_numérique(réponse))
```

- Chaque question scorante a un coefficient par V (`scoring_questions`)
- 4 seuils par V : `faible`, `modéré`, `élevé`, `critique` (`scoring_thresholds`)
- Score max V1 = 12, V2 = 8, V3 = 19, V4 = 44, V5 = 15

### 4.5 Propriété Fondamentale

> **Le moteur est 100% déterministe :** mêmes réponses = mêmes résultats. Pas d'IA, pas de machine learning, pas de randomisation. Cette propriété est essentielle pour la reproductibilité clinique et la certification médicale.

---

## 5. Modèle de Données

### 5.1 Volume (live DB — 22/02/2026)

| Entité | Quantité | Table Supabase | Clé primaire |
|--------|:--------:|----------------|:------------:|
| Vulnérabilités | 5 | `vulnerabilities` | `id` (V1-V5) |
| Questions | 165 (150 éval + 15 triggers) | `questions` | `id` |
| Micro-Parcours (MP) | 24 | `micro_parcours` | `id` |
| Mapping Q↔MP | 155 | `question_mp_mapping` | `id` |
| Catégories | 73 | `categories` | `id` |
| Règles d'activation | **240** | `activation_rules` | `id` |
| Questions scoring | **345** | `scoring_questions` | `id` |
| Seuils scoring | 20 | `scoring_thresholds` | `id` |
| Recommandations | 198 | `recommendations` | `id` |
| Micro-Tâches (MT) | **390** | `micro_taches` | `id` |
| Content Blocks | **355** | `content_blocks` | `id` (uuid) |
| CR Templates | variable | `cr_templates` | `id` (uuid) |
| **Guides** | **42** | `guides` | `id` |
| **Guide↔MT mapping** | **61** | `guide_mt_mapping` | `id` |
| Questions de suivi | 30 | `suivi_questions` | `id` |

> **Total : 15 tables, ~1860 lignes**

### 5.2 Relations

```
vulnerabilities (5)
├── questions (165)              FK: vulnerability_id
├── micro_parcours (24)          FK: vulnerability_id
│   ├── categories (73)          FK: mp_id
│   │   ├── activation_rules (240)    FK: category_id, mp_id
│   │   ├── recommendations (198)     FK: category_id, mp_id
│   │   └── micro_taches (390)        FK: category_id, mp_id
│   │       └── guide_mt_mapping (61) FK: mt_id, guide_id
│   └── question_mp_mapping (155)     FK: question_id, mp_id
├── scoring_questions (345)      FK: question_id, vulnerability_id
├── scoring_thresholds (20)      FK: vulnerability_id
├── suivi_questions (30)         FK: vulnerability_id, mp_id, parent_id
├── content_blocks (355)         Polymorphe: entity_type + entity_id
└── guides (42)                  Standalone, lié via guide_mt_mapping
```

> Voir [ARCHITECTURE_DB.md](../FINAL/ARCHITECTURE_DB.md) pour le schéma complet avec descriptions de chaque colonne.

---

## 6. Pages de l'Application

| Page | Bloc | Description | US couvertes | Complexité |
|------|:----:|-------------|:------------:|:----------:|
| `DashboardPage` | — | Vue d'ensemble : stats V1-V5, compteurs globaux | — | ⭐⭐ |
| `SimulatorPage` + sub-components | 3 | Orchestrateur 4 onglets (Scoring, MP, Règles, CR) | US-01, US-15 | ⭐⭐⭐⭐⭐ |
| `ExternalViewPage` (Vue Externe) | 5 | Vue patient premium, ton empathique, hiérarchie critique→prévention | US-07, US-19 | ⭐⭐⭐⭐ |
| `QuestionsPage` | 7 | Fiches questions avec filtres avancés et vue hiérarchique | US-16 | ⭐⭐⭐ |
| `VulnerabilitiesPage` | 8 | Drill-down 3 niveaux : V → MP → Détail | — | ⭐⭐⭐ |
| `PersonasPage` | — | Sélection et gestion des personas de test | — | ⭐⭐ |
| `ComparisonPage` | 15 | Comparaison 2-3 personas côte à côte | US-05 | ⭐⭐⭐ |
| `CoveragePage` (Heatmap) | 13 | Matrice couverture Q×MP, trous identifiés | US-17, US-21 | ⭐⭐⭐ |
| `EngineHealthPage` | 16 | Score de confiance moteur (6 métriques) | US-06, US-09 | ⭐⭐⭐ |
| `IDECDashboard` | 18 | Tableau de bord professionnel IDEC | US-11, US-24, US-25 | ⭐⭐⭐⭐ |
| `OfficialDocsPage` | 9 | Documents officiels du KERNEL clinique | — | ⭐⭐ |

---

## 7. Exigences Non-Fonctionnelles

### 7.1 Performance

| Métrique | Cible | Mesure |
|----------|-------|--------|
| Évaluation moteur (240 règles) | < 100ms | `performance.now()` dans engine |
| First Contentful Paint | < 1.5s (desktop), < 2.5s (mobile) | Lighthouse |
| Chargement données Supabase (15 tables) | < 2s | Network waterfall |
| Re-render après réponse | < 50ms | React DevTools profiler |
| Bundle size (gzip) | < 500KB initial | `vite build --report` |

### 7.2 Contraintes Code

| Contrainte | Valeur | Framework § |
|-----------|--------|:-----------:|
| Fichier max | < 300 lignes | §2 |
| Page max | < 200 lignes | §2 |
| Composant React max | < 250 lignes | §2 |
| Fonction max | < 50 lignes | §2 |
| TypeScript | Strict, pas de `any` | §4 |
| Tests | En même temps que le code | §3 |
| CSS | Vanilla CSS, variables centralisées | — |
| Accessibilité | WCAG AA (contraste 4.5:1, targets 44px) | §18 |
| Logging | Logger structuré, pas de `console.log` | §11 |
| Commits | Conventionnels : `type(scope): desc` | §15 |

### 7.3 Fiabilité

| Exigence | Détail |
|----------|--------|
| Déterminisme | Mêmes réponses = mêmes résultats, garanti par tests |
| Fallback données | Si Supabase indisponible : écran d'erreur explicite + bouton retry |
| Intégrité FK | Vérifiable à tout moment via `EngineHealthPage` |
| Pas de perte d'état | Réponses conservées en state React (pas de persistance pour v1) |

### 7.4 Sécurité

| Élément | Statut v1 | Préparation |
|---------|-----------|-------------|
| Authentification | ❌ Pas de login | Architecture auth-ready (`clinical/hooks/`) |
| RLS | ❌ Pas de policies | Tables prêtes pour ajout RLS |
| Secrets | `.env` gitignored | `.env.example` commité |
| CORS | N/A (SPA client-side) | — |
| Audit dépendances | `npm audit` clean | Vérifié à chaque QG before-deploy |

---

## 8. Roadmap et Phasing

> Voir [SPRINT.md](../SPRINT.md) pour le détail complet des 20 blocs.

### Phase 1 — Fondations (Blocs 0-3) ✅

| Bloc | Livrable | Statut |
|:----:|----------|:------:|
| 0 | Tables `content_blocks` + `cr_templates` + helpers | ✅ |
| 1 | PRD + Architecture + Glossaire | ✅ |
| 2 | Design System (`components/ui/`) | ✅ |
| 3 | Restructuration Onglets (6→4) + sub-components | ✅ |

### Phase 2 — Richesse Clinique (Blocs 4-8) ✅

| Bloc | Livrable | Statut |
|:----:|----------|:------:|
| 4 | Explications cliniques (sens_clinique, getQuestionText, hooks clinical) | ✅ |
| 5 | Vue Externe premium (patient-facing) | ⬜ À faire |
| 6 | CR Médecin professionnel (export PDF) | ⬜ À faire |
| 7 | Fiches Questions avec filtres — QuestionsSidebar extrait (198L) | ✅ |
| 8 | Vulnérabilités Drill-Down (V→MP→Détail) — VulnDetail + VulnDetailTabs | ✅ |

### Phase 3 — Intelligence Clinique (Blocs 9-15) ✅

| Bloc | Livrable | Statut |
|:----:|----------|:------:|
| 9 | Navigation + SimulatorHeader extrait (116L) | ✅ |
| 10 | Score-Action Gap — `scoreActionGap.ts` (63L) + alertes | ✅ |
| 11 | Chaîne Clinique — `ClinicalChain.tsx` (102L) | ✅ |
| 12 | Scoring Enrichi — `ScoreBreakdown.tsx` (111L) + mini what-if | ✅ |
| 13 | Heatmap Couverture — `buildCoverageMatrix.ts` + `CoverageHeatmap.tsx` | ✅ |
| 14 | Mode What-If — `WhatIfDiff.tsx` (119L) + diff per-V | ✅ |
| 15 | Comparaison Personas — `PersonaComparison.tsx` (183L) | ✅ |

### Phase 4 — Production-Ready (Blocs 16-19) — En cours

| Bloc | Livrable | Statut |
|:----:|----------|:------:|
| 16 | Score de Confiance Moteur + dette technique (split files) | ⬜ À faire |
| 17 | Vérification Intégrité Données + Vitest + **QG before-deploy** | ⬜ À faire |
| 18 | Observabilité IDEC (dashboard professionnel) | ⬜ À faire |
| 19 | Préparation Multilingue + **QG after-deploy (certification finale)** | ⬜ À faire |

---

## 9. Risques et Mitigations

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|:-----------:|:------:|------------|
| R1 | SimulatorPage reste > 200L | Réduit | Moyen | Réduit de 952L→435L via extractions (blocs 5,7,9). useSimulatorState planifié bloc 16 |
| R2 | Données cliniques incomplètes | Résolu | — | ✅ 8/8 quality checks = 0 (sens_clinique, justifications, mappings tous complets) |
| R3 | Performance 240 règles × persona switch | Faible | Moyen | Évaluation < 100ms vérifiée ; `useMemo` partout |
| R4 | Supabase free tier limites (500MB, 50K rows) | Faible | Faible | ~1860 rows actuellement ; ample marge |
| R5 | Changement de structure clinique (ajout V6) | Moyenne | Haut | Architecture data-driven : ajout V6 = ajout lignes DB, pas de code |
| R6 | Auth non préparée | Faible | Haut | Architecture déjà auth-ready (`clinical/hooks/` isolé) |

---

## 10. Hors Scope (v1)

| Élément | Raison | Préparation |
|---------|--------|-------------|
| Authentification / login | Livraison interne | Architecture prête |
| RLS / policies | Pas de multi-utilisateur | Tables structurées pour |
| Backend server / Edge Functions | SPA client-side suffisant | Supabase prêt |
| Déploiement production | Fichiers source remis | Vercel/Netlify prêt |
| Multilingue | Structurellement préparé (Bloc 19) | i18n keys prévues |
| IA / Machine Learning | Moteur 100% déterministe | Data prête pour ML futur |
| App mobile native | Web responsive suffit | PWA possible |

---

## 11. Infrastructure

| Service | Usage | Référence |
|---------|-------|-----------|
| **Supabase** `mbxeqrvofrmhqlwlefff` | PostgreSQL (15 tables, ~1860 lignes), stockage données cliniques | [Dashboard](https://supabase.com/dashboard/project/mbxeqrvofrmhqlwlefff) |
| **Vite** | Build tool + dev server (HMR) | `vite.config.ts` |
| **React 18** | Framework UI, hooks, suspense | `package.json` |
| **TypeScript 5** | Typage statique strict | `tsconfig.json` |
| **Framer Motion** | Animations UI (tab transitions, gauges) | — |
| **Lucide React** | Bibliothèque d'icônes | — |

---

*Référence : [Architecture](architecture.md) — [Glossaire](glossary.md) — [SPRINT.md](../SPRINT.md)*
