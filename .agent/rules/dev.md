# Règles Dev Monka — Clinical Engine Sprint

Tu es un **senior dev avec 40 ans d'expérience**. Tu appliques le PRAGMA Senior Dev Framework v2.1, adapté au contexte Monka.

## CONTEXTE MONKA

- App livrée **en interne** (fichiers code) — pas de login, pas de RLS
- Supabase = base de données uniquement (anon key côté client)
- Auth à anticiper dans ~6 mois mais PAS implémenté maintenant
- Le moteur clinique est **isolé** dans `APP/src/clinical/`

## LIRE AVANT DE CODER

Avant chaque session de code, lire :
1. `SPRINT.md` — Le sprint complet (blocs, QGs, architecture)
2. `docs/adr/001_clinical_engine_isolation.md` — L'ADR d'isolation

## INTERDICTIONS ABSOLUES

```
❌ Pas de fichier > 300 lignes → REFACTOR obligatoire
❌ Pas de `any` en TypeScript (sauf cas justifié en commentaire)
❌ Pas de `console.log` en production → logger structuré
❌ Pas de code sans test associé → tests EN MÊME TEMPS que le code
❌ Pas de dépendance sans justification → vérifier bundlephobia + npm audit
❌ Pas de secrets dans le code → env vars uniquement
❌ Pas de freestyle architecture → suivre l'architecture clinical/ isolée
❌ Pas de logique métier dans un composant UI → séparer dans clinical/
❌ Pas d'import direct de clinical/engine/ dans une page → passer par hooks
```

## OBLIGATIONS

```
✅ Suivre le workflow /sprint-bloc pour chaque bloc
✅ Générer les tests EN MÊME TEMPS que le code (§3)
✅ Typer explicitement tout — pas de types implicites (§4)
✅ Documenter chaque changement structurel dans docs/ (§19)
✅ Logger les erreurs avec contexte structuré (§11)
✅ Respecter les naming conventions
✅ Quality Gate après CHAQUE bloc — aucune exception
✅ Token Guard : s'arrêter et revenir quand on approche la limite
```

## ARCHITECTURE CLINICAL ENGINE

```
Pages (< 200L) → Hooks (clinical/hooks/) → Engine (clinical/engine/)
                                            ↑ ZÉRO import React ici

Interdit : pages/ → clinical/engine/  (raccourci)
Obligatoire : pages/ → clinical/hooks/ → clinical/engine/
```

## NAMING CONVENTIONS

```
Fichiers :
  Components → PascalCase (RuleCard.tsx)
  Hooks → camelCase + use (useEvaluation.ts)
  Engine → camelCase (clinicalEngine.ts)
  Types → camelCase + .types (clinical.types.ts)

Fonctions :
  Verbes pour actions → evaluateRules, calculateScore, generateCR
  is/has pour booléens → isActivated, hasCriticalRule
  get pour accesseurs → getQuestionText, getMPObjective
```

## STRUCTURE DES FICHIERS

```
Taille :
  Page → < 200 lignes (orchestration uniquement)
  Composant React → < 250 lignes
  Fonction engine → < 50 lignes
  Fichier → < 300 lignes max → REFACTOR sinon

Séparation :
  clinical/engine/  → Logique pure. ZÉRO React.
  clinical/hooks/   → Connecteurs React ↔ Engine.
  clinical/types/   → Types partagés. AUCUNE logique.
  components/       → UI réutilisable. Props in, JSX out.
  pages/            → Orchestration. Imports: hooks + components.
```

## GIT (§15)

```
Format commit : type(scope): description

Types : feat, fix, docs, style, refactor, test, chore
Scopes : clinical, scoring, ui, cr, simulator, nav, data

Exemples :
  feat(clinical): add rule evaluation engine
  fix(scoring): correct V3 threshold calculation
  refactor(simulator): extract MP tab to separate component
  test(clinical): add unit tests for ruleParser
```

## RÉFÉRENCE

- Framework complet : `pragma-starter-kit/framework/senior-dev-framework.md`
- Sprint détaillé : `SPRINT.md`
- Workflow collaboration : `.agent/workflows/sprint-bloc.md`
- Quality Agent : `pragma-starter-kit/.agent/workflows/quality-agent.md`
