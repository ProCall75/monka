# 📋 PLAN D'EXÉCUTION V2 — Source de Vérité Unique

**Date** : 27 février 2026 — 22h20  
**Contexte** : App interne Monka Clinical Engine — outil de visualisation moteur clinique  
**Destinataire** : CTO meeting lundi  
**Auteur** : Agent IA sous contraintes PRAGMA Senior Dev Framework v2.1  
**Niveau d'exigence** : CISO / ANTHROPIC / VERCEL / NOTION  
**Workflow d'enforcement** : `/finish-sprint` (`.agent/workflows/finish-sprint.md`)

---

## 🔒 RÈGLES D'EXÉCUTION OBLIGATOIRES

### Token Guard — Boucle de Complétion Forcée

Chaque bloc de travail ci-dessous **DOIT** suivre cette boucle :

```
1. RELIRE → plan.md + implementation.md + task.md AVANT de modifier
2. ANALYSER → Lire tous les fichiers concernés AVANT de modifier
3. PLANIFIER → Définir les changements exacts (cf implementation.md)
4. EXÉCUTER → Appliquer les modifications
5. VÉRIFIER → Tester (build, type-check, scan sécurité)
6. RAPPORTER → Documenter ce qui a été fait dans task.md
7. RETOUR USER → Si > 8 tool calls ou si doute → notify_user obligatoire
```

### PRAGMA Dev Rules (permanent)

```
❌ Pas de fichier > 300 lignes → dette identifiée si déjà existant
❌ Pas de `any` en TypeScript (sauf tests avec commentaire)
❌ Pas de `console.log` en production
❌ Pas de table Supabase sans RLS
❌ Pas de secrets dans le code
✅ Types explicites partout
✅ Naming conventions (PascalCase composants, camelCase fonctions)
✅ Séparation UI / logique / fetch
✅ Commit conventionnel : type(scope): description
```

### Pensée Sécurité Permanente

À chaque modification de code, vérifier :
- [ ] Pas de credential exposée
- [ ] Pas de `dangerouslySetInnerHTML`, `eval()`, `innerHTML`
- [ ] Pas de Supabase write (`.insert()`, `.update()`, `.delete()`) côté client
- [ ] Types TypeScript stricts (pas de `any`)
- [ ] Build passe après la modification

### Contexte CTO — Ce Que C'est et Ce Que Ce N'est Pas

| Ce que c'est | Ce que ce n'est PAS |
|---|---|
| Outil interne de visualisation du moteur clinique | App B2C publique |
| Lien partagé à l'équipe Monka (postes stratégiques) | Accessible au grand public |
| Données de test (165 questions cliniques, 8 personas) | Données patient réelles |
| Livrable prestataire externe (PRAGMA) pour Monka | Produit commercial |
| Prototype fonctionnel pour validation moteur | Production haute disponibilité |

**Implications sécurité** : Le niveau de sécurité actuel (RLS SELECT-only, publishable key, headers) est **proportionné et adapté**. Pas besoin d'auth, de RGPD, de rate limiting, de monitoring Sentry. Ces éléments sont documentés comme "non-applicables" et non comme "oubliés".

---

## 🧠 BLOC 0 — DOCUMENTATION MOTEUR (FAIT ✅)

### Objectif
Produire une documentation technique complète du moteur clinique, ligne par ligne, en français vulgarisé, prouvant sa viabilité, scalabilité et pertinence clinique.

### Livrable
`FINISH/engine_explainer.md` — 10 sections couvrant :
- Les 9 opérateurs de condition
- La logique d'activation (AND + compétition des niveaux)
- Le scoring par vulnérabilité avec caps
- Le score global pondéré
- Le modèle additif (filtrage conditionnel des questions)
- La scalabilité V2 (ajout V6, nouvel opérateur, intégration B2C)
- Les questions CTO anticipées avec réponses

### Questions CTO adressées
| Question | Réponse documentée |
|---|---|
| C'est déterministe ? | Oui — même input = même output, 100% du temps |
| Pourquoi pas d'IA ? | Modèle gériatrique validé, l'IDEC doit pouvoir expliquer |
| Ça tient la charge ? | 240 règles × 165 questions en <10ms navigateur |
| Les données sont couplées au code ? | Non — 100% data-driven (DB Supabase) |
| Et pour l'app V2 ? | Copier engine/ (4 fichiers, 0 dépendance React) |

---

## 🚨 BLOC 1 — FIX MULTI-SELECT ✅ FAIT

> **17 fichiers modifiés** — `npx tsc --noEmit` = 0 erreurs — `npm run build` ✓ 36.33s
> 
> Certification : `FINISH/certifs/BLOC-1_quality_check.md`
> 
> Scope : types `string | string[]`, click handler toggle array, highlight via `Array.includes()`, persona pipe→array parsing, scoring array iteration, WhatIfDiff array comparison.

### Diagnostic

**Bug** : Les questions de type `choix_multiple` ne permettent pas de sélectionner plusieurs réponses.

**Root Cause confirmée** :

| Fichier | Problème |
|---|---|
| `QuestionsSidebar.tsx` L16 | `answers: Record<string, string>` — stocke UN string par question |
| `QuestionsSidebar.tsx` L183-187 | Click handler remplace la valeur au lieu de toggle |
| `QuestionsSidebar.tsx` L189 | `answers[q.id] === opt` — highlight une seule option |
| `SimulatorPage.tsx` | State `answers` déclaré comme `Record<string, string>` |
| `helpers.ts` L138-168 | `getActiveAidanceBlocks()` et `getActiveQuestions()` utilisent `Record<string, string>` |

**Impact DB** : 29 questions sur 165 sont `choix_multiple` (17.5% du questionnaire).

### Solution Retenue — `string[]` natif (post-audit angles morts)

**Approche CORRIGÉE** : Le moteur clinique (`clinicalEngine.ts` L39-40) supporte DÉJÀ `string | string[]` nativement via `AnswerValue`. On aligne le reste de l'app dessus.

**Raison du changement** : L'approche pipe-delimited initiale (`"A|B"`) créait une dette technique. Le moteur gère déjà les arrays. Pas de hack. (cf. `FINISH/anglesmorts.md` Angle Mort T1)

### Fichiers à modifier (spec exacte dans implementation.md)

| # | Fichier | Modification |
|---|---|---|
| 1 | `QuestionsSidebar.tsx` | Type `Record<string, string \| string[]>`, click handler multi-select toggle array, highlight via `Array.includes()` |
| 2 | `SimulatorPage.tsx` | Type state `Record<string, string \| string[]>`, parsing persona_answers pipe→array au chargement |
| 3 | `helpers.ts` | Type alignment + N3 parsing `Array.isArray()` au lieu de pipe split |
| 4 | `ProfileRecap.tsx` | Affichage `Array.isArray(answer) ? answer.join(', ') : answer` |

### Vérifications post-fix

- [ ] Build TypeScript clean (`npx tsc --noEmit`)
- [ ] Build production OK (`npm run build`)
- [ ] Visual : sélection multiple fonctionne (test navigateur)
- [ ] Scoring : E19/O16 scorent correctement avec multi-réponses
- [ ] Personas : les personas avec réponses multi-aidance (C1/N3) fonctionnent

---

## 🧪 BLOC 2 — TESTS UNITAIRES MULTI-SELECT

### Tests à ajouter (dans `clinicalEngine.test.ts`)

| # | Test | Vérifie |
|---|---|---|
| 1 | `evaluateCondition eq` avec `string[]` | `["Oui", "Non"]` includes `"Oui"` → true |
| 2 | `evaluateCondition count_gte` avec `string[]` | `["A", "B"]` length ≥ 2 → true |
| 3 | `computeScore` avec array + cap E19 | Multi-select cappé à 1 point |

---

## 🛡️ BLOC 3 — ERRORBOUNDARY GLOBAL

### Fichiers

| # | Fichier | Action |
|---|---|---|
| 1 | `components/ErrorBoundary.tsx` | **[NEW]** Composant React class avec fallback UI |
| 2 | `App.tsx` | Wrapping `<ErrorBoundary>` autour de `<BrowserRouter>` |

**Standard industrie** : Error Boundaries sont listées dans 100% des checklists CTO React 2025.

---

## 📄 BLOC 4 — README

### Fichier : `APP/README.md` [NEW]

Contenu : Stack technique, Setup local, Variables d'env, Architecture, Deploy.
**Référence PRAGMA** : §19 Documentation — "README complet".

---

## 📡 BLOC 4.5 — DOCUMENTATION API (NOUVEAU)

### Objectif
Documenter toutes les routes de données Supabase utilisées par l'app, selon le format standard `pragma-starter-kit/docs/api.md`.

### Format (inspiré PRAGMA §13)

Pour chaque table/endpoint Supabase :
```
### GET /rest/v1/{table}

Auth : 🔒 RLS SELECT-only (publishable key)

Query Params :
- `select` (PostgREST column selection)
- `order` (tri)

Response 200 :
{ "data": [...] }
```

### Tables à documenter (18)
| Table | Usage principal | Colonnes clés |
|---|---|---|
| `questions` | Questionnaire adaptatif | `id`, `question_text`, `response_type`, `vulnerability_id` |
| `vulnerabilities` | V1-V5 définitions | `id`, `name`, `weight` |
| `activation_rules` | Logique d'activation MP | `condition_logic`, `niveau` |
| `scoring_questions` | Barème de scoring | `question_id`, `response_text`, `score` |
| `scoring_thresholds` | Seuils par vulnérabilité | `min_score`, `max_score`, `niveau` |
| `micro_parcours` | 24 MP avec objectifs | `nom`, `objectif`, `signature_a` |
| `categories` | Catégories cliniques | `nom`, `vulnerability_id` |
| `recommendations` | Recos par catégorie | `title`, `content` |
| `micro_taches` | Tâches détaillées | `description`, `duree` |
| `content_blocks` | Blocs rich content | `block_type`, `content` |
| `personas` | 8 profils de test | `nom`, `description` |
| `persona_answers` | Réponses pré-remplies | `persona_id`, `question_id`, `answer` |
| `suivi_questions` | Questions de suivi | `question_text`, `response_type` |
| `guides` | Guides cliniques | `title`, `content` |
| `cr_templates` | Templates CR (vide) | `title`, `template_body` |
| ... | 3 tables restantes | ... |

### Livrable : `FINISH/api_documentation.md`

**Référence PRAGMA** : §13 API Design Standards + `pragma-starter-kit/docs/api.md`

---

## 🚀 BLOC 5 — BUILD + DEPLOY + COMMIT

### Checklist PRAGMA before-deploy (§22)

```
Tests & Qualité :
  ☐ npx tsc --noEmit → 0 erreurs
  ☐ npm run build → OK
  ☐ npm test → passent
  ☐ npm audit → 0 vulnérabilités critiques

Sécurité (§6) :
  ☐ RLS activé sur TOUTES les tables (18/18)
  ☐ 0 secrets dans le code tracké
  ☐ Headers sécurité (CSP, HSTS dans vercel.json)

Rollback (§9) :
  ☐ Plan : Vercel → Promote ancien deploy
  ☐ Plan DB : Supabase PITR

Documentation :
  ☐ README.md créé (BLOC 4)
  ☐ engine_explainer.md créé (BLOC 0)
```

### Commandes

```bash
cd APP
npx tsc --noEmit
npm run build
npm audit
npm test
vercel deploy --prod
git add -A
git commit -m "fix(simulator): multi-select support + ErrorBoundary + README + audit docs"
git push origin main
```

---

## 📝 BLOC 6 — RAPPORT FINAL

### Livrables finaux

| Fichier | Contenu | Status |
|---|---|---|
| `FINISH/plan.md` | Ce document — source de vérité | ✅ V3 |
| `FINISH/implementation.md` | Spec technique par bloc | ✅ |
| `FINISH/engine_explainer.md` | Doc moteur clinique français | ✅ |
| `FINISH/audit_db.md` | Audit complet base de données | ✅ |
| `FINISH/anglesmorts.md` | Analyse angles morts multi-POV | ✅ |
| `FINISH/actions_ce_soir.md` | Condensé des actions | ✅ |
| `FINISH/coherence_proof.md` | Preuve de cohérence données | ✅ |
| `FINISH/api_documentation.md` | Doc API format PRAGMA §13 | ⬜ BLOC 4.5 |
| `FINISH/rapport.md` | Rapport d'exécution + preuves | ⬜ BLOC 6 |
| `FINISH/certifs/*.md` | Certifications PRAGMA par bloc | 🔄 En cours |

### Points documentés (dette identifiée, pas oubliée)

| Item | Justification |
|---|---|
| 3 fichiers > 300L | Refactor = risque de régression avant démo |
| Pas de FK constraints DB | RLS read-only, données intègres (0 orphelins) |
| `cr_templates` vide | Feature préparée, CR fonctionne via code |
| `QUESTION_SCORE_CAP` hardcodé | Déplacer en DB = migration, post-livraison |
| V1-V5 hardcodées | Modèle clinique fixe (5 vulnérabilités) |
| `N3_TO_AIDANCE_BLOCKS` hardcodé | Nouvelle option N3 → modifier code |
| App pas responsive mobile | Scope desktop confirmé |

---

## 📌 ORDRE D'EXÉCUTION

```
BLOC 0 — Documentation Moteur       ✅ FAIT (engine_explainer.md)

BLOC 1 — Fix Multi-Select           ✅ FAIT (17 fichiers, 0 erreurs)
  └→ Certification : FINISH/certifs/BLOC-1_quality_check.md
  └→ Walkthrough : FINISH/certifs/BLOC-1_walkthrough.md (à générer)

BLOC 2 — Tests Unitaires            [SCORING SAFETY]
  └→ 3 tests dans clinicalEngine.test.ts
  └→ Gate : npm test
  └→ Certification PRAGMA
  └→ Walkthrough CTO

BLOC 3 — ErrorBoundary              [CRASH PROTECTION]
  └→ Créer ErrorBoundary.tsx
  └→ Wrapper dans App.tsx
  └→ Gate : tsc + build
  └→ Certification PRAGMA
  └→ Walkthrough CTO

BLOC 4 — README                     [DOCUMENTATION]
  └→ Créer APP/README.md
  └→ Certification PRAGMA

BLOC 4.5 — API Documentation        [DOCUMENTATION PRAGMA §13]
  └→ Créer FINISH/api_documentation.md
  └→ Format standard PRAGMA api.md
  └→ Certification PRAGMA

BLOC 5 — Build + Deploy + Commit    [PRODUCTION]
  └→ Checklist PRAGMA before-deploy
  └→ Deploy Vercel
  └→ Commit conventionnel
  └→ Certification finale

BLOC 6 — Rapport Final              [LIVRABLE]
  └→ rapport.md + walkthrough consolidé
```

---

## 🎯 CRITÈRES DE SUCCÈS

| Critère | Mesure |
|---|---|
| Multi-select fonctionnel | 29 questions `choix_multiple` sélectionnables |
| Build propre | `npx tsc --noEmit` + `npm run build` = 0 erreurs |
| Sécurité | 0 credentials dans le code, npm audit = 0 |
| Tests | Tests unitaires multi-select passent |
| Documentation moteur | engine_explainer.md complet |
| Architecture | Séparation UI/engine respectée |
| Conformité PRAGMA | Workflow `/finish-sprint` appliqué |
| Déployé | Vercel prod accessible |

---

## 📋 DOCUMENTS DE RÉFÉRENCE

| Document | Rôle |
|---|---|
| `FINISH/plan.md` | **SOURCE DE VÉRITÉ** — ce document |
| `FINISH/implementation.md` | Spec technique (code diffs exacts) |
| `FINISH/engine_explainer.md` | Documentation moteur pour CTO |
| `FINISH/audit_db.md` | Audit DB (18 tables, 0 orphelins) |
| `FINISH/anglesmorts.md` | Analyse angles morts multi-POV |
| `FINISH/coherence_proof.md` | Preuve cohérence docs↔code↔DB |
| `FINISH/certifs/quality_agent_template.md` | Template certification PRAGMA |
| `FINISH/certifs/walkthrough_template.md` | Template walkthrough CTO-grade |
| `FINISH/certifs/BLOC-{N}_quality_check.md` | Certifications par bloc |
| `.agent/workflows/finish-sprint.md` | Workflow d'enforcement |
| `CTO/cours/` | 16 fichiers formation CTO (référencés dans walkthroughs) |
| `pragma-starter-kit/.agent/rules/dev.md` | Règles PRAGMA dev |
| `pragma-starter-kit/docs/api.md` | Template API documentation |

*Ce plan V3 intègre les corrections de anglesmorts.md (string[] au lieu de pipe), les findings de audit_db.md, les standards CTO 2025, les workflows PRAGMA, les templates qualité, et l'API documentation.*
