---
description: Étape 1 — Règles PRAGMA Senior Dev Framework imposées sur CHAQUE fichier modifié. 28 sections du framework vérifiées.
---

# Étape 1 — PRAGMA Dev Rules (par fichier)

// turbo-all

> **Référence** : `pragma-starter-kit/framework/senior-dev-framework.md` (28 sections)
> **Quand** : Après CHAQUE modification de fichier — pas en batch, PAR FICHIER.
> **Chaîne** : Appelé après `/finish-00-relecture` → passe à `/finish-02-token-guard`

---

## Interdictions Absolues

Vérifier après chaque edit :

| # | Interdit | Framework § | Détection |
|---|---|---|---|
| 1 | Fichier > 300 lignes | §2 Structure | `wc -l fichier` |
| 2 | `any` en TypeScript (sauf tests commentés) | §2 Structure | `grep -n 'any' fichier` |
| 3 | `console.log` en production | §11 Logging | `grep -rn 'console.log' src/` |
| 4 | Secrets/credentials dans le code | §6 Sécurité | `grep -rn 'SUPABASE_SERVICE_ROLE\|sk_live\|password=' src/` |
| 5 | Supabase write côté client (.insert/.update/.delete) | §6 Sécurité | `grep -rn '\.insert\|\.update\|\.delete' src/` |
| 6 | `dangerouslySetInnerHTML` | §6 Sécurité | `grep -rn 'dangerouslySetInnerHTML' src/` |
| 7 | `eval()` ou `innerHTML` | §6 Sécurité | `grep -rn 'eval(\|innerHTML' src/` |
| 8 | Import circular | §2 Structure | Vérifier le graph d'imports |

---

## Obligations

Chaque fichier modifié DOIT respecter :

| # | Obligation | Framework § | Comment vérifier |
|---|---|---|---|
| 1 | Types explicites partout | §2 Structure | Pas de `any` implicite, return types déclarés |
| 2 | Naming conventions | §2 Structure | PascalCase composants, camelCase fonctions |
| 3 | Séparation UI / logique / fetch | §1 Architecture | Pas de `supabase.from()` dans un composant UI |
| 4 | Commits conventionnels | §15 Git Hygiene | `type(scope): description` |
| 5 | Lock file committé | §16 Dépendances | `package-lock.json` dans git |
| 6 | Commentaires = POURQUOI pas QUOI | §19 Documentation | Pas de `// incrémente de 1` |
| 7 | Booléens préfixés is/has/can | §2 Structure | `isActive`, `hasLoaded`, `canEdit` |
| 8 | Constantes en UPPER_SNAKE | §2 Structure | `MAX_SCORE`, `CRITICAL_THRESHOLD` |
| 9 | Props read-only | §1 Architecture | Mutation via callback parent→enfant |

---

## Mapping Framework §1-§28 → Contexte Monka

| § | Section | Applicable Monka | Justification si N/A |
|---|---|---|---|
| §1 | Architecture | ✅ engine/ vs pages/ | — |
| §2 | Structure | ✅ < 300L, naming | — |
| §3 | Tests | ✅ clinicalEngine.test.ts | — |
| §4 | Linter | ✅ tsconfig strict | ESLint config recommandée |
| §5 | CI/CD | ✅ Vercel auto-build | — |
| §6 | Sécurité | ✅ RLS 18/18, publishable key | — |
| §7 | Maintenance | ⚠️ Pas de Sentry | Outil interne — monitoring post-livraison |
| §8 | Debug | ⚠️ Pas de troubleshooting.md | À créer BLOC 4 |
| §9 | Rollback | ✅ Vercel promote ancien deploy | — |
| §10 | Edge Cases | ⚠️ Pas de FK constraints | RLS read-only, 0 orphelins vérifié |
| §11 | Logging | ✅ Pas de console.log en prod | — |
| §12 | Caching | ✅ useMemo, useCallback | — |
| §13 | API Design | ✅ PostgREST standard | — |
| §14 | Feature Flags | N/A | Outil interne, pas de staged rollout |
| §15 | Git Hygiene | ✅ Conventional commits | — |
| §16 | Dépendances | ✅ npm audit clean | — |
| §17 | Performance | ✅ Build < 400KB gzip | — |
| §18 | Accessibilité | N/A | Desktop interne, pas public |
| §19 | Documentation | ✅ engine_explainer, plan | — |
| §20 | Boundaries IA | ✅ /finish-sprint actif | — |
| §21 | RGPD | N/A | Données test uniquement |
| §22 | Checklists | ✅ before-deploy PRAGMA | — |
| §23 | Observabilité | N/A | Pas de production publique encore |
| §24 | DR Plan | ✅ Vercel + Supabase PITR | — |
| §25 | API Versioning | N/A | Pas d'API publique |
| §26 | Onboarding | N/A | Prestataire unique |
| §27 | Cost Management | ✅ Free tier tout | — |
| §28 | Compliance Auto | N/A | Données test |

> **Items N/A justifiés** : §7, §8, §14, §18, §21, §23, §25, §26, §28 — Contexte outil interne, données de test, prestataire unique. Documenté comme dette dans plan.md, pas oublié.

---

## Livrables du sprint FINISH à vérifier

Chaque livrable doit exister à la fin du sprint :

| # | Livrable | Fichier | Status |
|---|---|---|---|
| 1 | Plan source de vérité | `FINISH/plan.md` | ✅ V3 |
| 2 | Spec technique | `FINISH/implementation.md` | ✅ |
| 3 | Doc moteur clinique | `FINISH/engine_explainer.md` | ✅ |
| 4 | Audit DB | `FINISH/audit_db.md` | ✅ |
| 5 | Angles morts | `FINISH/anglesmorts.md` | ✅ |
| 6 | Preuve cohérence | `FINISH/coherence_proof.md` | ✅ |
| 7 | Analyse personas | `FINISH/analyse_personas_db.md` | ✅ |
| 8 | API documentation | `FINISH/api_documentation.md` | ⬜ BLOC 4.5 |
| 9 | Rapport final | `FINISH/rapport.md` | ⬜ BLOC 6 |
| 10 | Certifications PRAGMA | `FINISH/certifs/BLOC-{N}_quality_check.md` | 🔄 Par bloc |
| 11 | Walkthroughs CTO | `FINISH/certifs/BLOC-{N}_walkthrough.md` | 🔄 Par bloc |
| 12 | README app | `APP/README.md` | ⬜ BLOC 4 |
| 13 | ErrorBoundary | `APP/src/components/ErrorBoundary.tsx` | ⬜ BLOC 3 |
| 14 | Tests unitaires | `APP/src/engine/clinicalEngine.test.ts` | ⬜ BLOC 2 |

---

> ✅ **Chaîne suivante** : `/finish-02-token-guard` (par fichier modifié)
