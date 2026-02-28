---
description: Workflow d'exécution blindée pour le sprint FINISH — Force le respect du plan.md, du contexte, et des règles de Token Guard avant chaque action.
---

# /finish-sprint — Orchestrateur Principal

// turbo-all

> **Rôle** : Ce fichier est le **chef d'orchestre**. Il contrôle la séquence, les conditions de passage, et l'état global du sprint. Il appelle les 5 sous-workflows dans l'ordre strict.
>
> **Règle absolue** : NE JAMAIS exécuter de code sans avoir traversé la séquence 00→01→02→03→04 pour le bloc courant.

---

## Architecture des workflows

```
                    ┌──────────────────────────────┐
                    │  /finish-sprint (CE FICHIER)  │
                    │  ORCHESTRATEUR PRINCIPAL       │
                    └──────────┬───────────────────┘
                               │
              ┌────────────────┼────────────────────┐
              ▼                ▼                     ▼
    ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐
    │ INIT (00)    │  │ RULES (01)   │  │ EXECUTION (02)   │
    │ Relecture    │→ │ PRAGMA §1-28 │→ │ Token Guard ×N   │
    │ plan+impl    │  │ + Livrables  │  │ 7 phases/fichier │
    └─────────────┘  └──────────────┘  └────────┬─────────┘
                                                 │
                                     ┌───────────┼──────────┐
                                     ▼                       ▼
                          ┌──────────────┐       ┌───────────────┐
                          │ GATE (03)     │       │ QUALITY (04)  │
                          │ tsc+build+    │──────→│ Certification │
                          │ test+audit    │       │ + Walkthrough │
                          └──────────────┘       └───────┬───────┘
                                                         │
                                                         ▼
                                                  ┌──────────────┐
                                                  │ BLOC N → [x]  │
                                                  │ Retour BLOC   │
                                                  │ N+1 → INIT    │
                                                  └──────────────┘
```

---

## Séquence d'exécution par bloc

### Phase A — Préparation

| # | Action | Workflow | Condition de sortie |
|---|---|---|---|
| 1 | **Relire** plan.md + implementation.md + task.md | `/finish-00-relecture` | Bloc courant identifié, fichiers listés |
| 2 | **Charger** les règles PRAGMA §1-§28 | `/finish-01-pragma-rules` | Interdictions et obligations connues |

### Phase B — Exécution

| # | Action | Workflow | Condition de sortie |
|---|---|---|---|
| 3 | **Pour chaque fichier** du bloc : 7 phases Token Guard | `/finish-02-token-guard` | Fichier modifié, vérifié, documenté dans task.md |
| 3b | **Si > 8 tool calls** | → `notify_user` | Retour utilisateur obtenu |

### Phase C — Validation

| # | Action | Workflow | Condition de sortie |
|---|---|---|---|
| 4 | **Gates** : tsc + build + test + audit | `/finish-03-gate` | 0 erreurs, métriques capturées |
| 5 | **Certification** PRAGMA + **Walkthrough** CTO | `/finish-04-quality` | 2 livrables créés, verdict CERTIFIÉ |

### Phase D — Clôture

| # | Action | Workflow | Condition de sortie |
|---|---|---|---|
| 6 | **MAJ** task.md → BLOC N → `[x]` | Direct | task.md à jour |
| 7 | **Retour user** : résumé du bloc + verdict | `notify_user` | Utilisateur informé |
| 8 | **Si BLOC N+1 existe** → recommencer Phase A | `/finish-00-relecture` | Boucle suivante initiée |

---

## Tableau des sous-workflows

| Étape | Nom | Fichier | Lignes | Contenu clé |
|---|---|---|---|---|
| 0 | Relecture Init | `/finish-00-relecture` | ~75L | Sources de vérité, checklist init, références permanentes |
| 1 | PRAGMA Rules | `/finish-01-pragma-rules` | ~110L | 8 interdictions, 9 obligations, matrice §1-§28, **14 livrables tracker** |
| 2 | Token Guard | `/finish-02-token-guard` | ~125L | 7 phases par fichier, 6 questions réflexion, exemple concret |
| 3 | Gate | `/finish-03-gate` | ~100L | 4 commandes, 7 critères, métriques, historique |
| 4 | Quality + Walk | `/finish-04-quality` | ~180L | Certification template, 10 sections walkthrough, CTO/cours mapping, checklist complétude |
| **Total** | — | **6 fichiers** | **~610L** | — |

---

## État du sprint

```
BLOC 0 — Documentation Moteur       ✅ FAIT
  Certification : N/A (pré-sprint)
  Walkthrough : N/A

BLOC 1 — Fix Multi-Select           ✅ FAIT
  Certification : FINISH/certifs/BLOC-1_quality_check.md ✅
  Walkthrough : FINISH/certifs/BLOC-1_walkthrough.md ✅

BLOC 2 — Tests unitaires            ⬜ À FAIRE
  Fichiers : clinicalEngine.test.ts (1 fichier)
  Gates : npm test + tsc + build
  
BLOC 3 — ErrorBoundary              ⬜ À FAIRE
  Fichiers : ErrorBoundary.tsx (NEW) + App.tsx (MODIFY) = 2 fichiers
  Gates : tsc + build

BLOC 4 — README                     ⬜ À FAIRE
  Fichiers : APP/README.md (NEW) = 1 fichier
  Gates : N/A (documentation)

BLOC 4.5 — API Documentation        ⬜ À FAIRE
  Fichiers : FINISH/api_documentation.md (NEW) = 1 fichier
  Gates : N/A (documentation)

BLOC 5 — Build + Deploy + Commit    ⬜ À FAIRE
  Actions : before-deploy checklist + vercel deploy + git commit
  Gates : Toutes (final)

BLOC 6 — Rapport Final              ⬜ À FAIRE
  Fichiers : rapport.md + walkthrough consolidé
  Gates : N/A (documentation)
```

---

## Conditions de blocage (HARD STOPS)

| # | Condition | Conséquence |
|---|---|---|
| 1 | `tsc --noEmit` retourne des erreurs | ❌ ARRÊT — fixer avant tout |
| 2 | `npm run build` échoue | ❌ ARRÊT — fixer avant tout |
| 3 | Tests échouent | ❌ ARRÊT — fixer avant tout |
| 4 | Verdict quality check = 🔴 NON CERTIFIÉ | ❌ ARRÊT — fixer avant certification |
| 5 | > 8 tool calls sans retour user | ❌ ARRÊT — notify_user obligatoire |
| 6 | Nouveau `any` introduit | ❌ ARRÊT — retirer le any |
| 7 | Credential dans le code | ❌ ARRÊT — retirer immédiatement |

---

## Les 10 commandements

```
 1. Ne JAMAIS passer au bloc N+1 sans gate clean + certification + walkthrough
 2. Ne JAMAIS modifier un fichier sans l'avoir lu en entier (Token Guard Phase 1)
 3. MAJ task.md après chaque sous-tâche complétée
 4. Relire plan.md + implementation.md au début de CHAQUE bloc (Étape 0)
 5. Si > 8 tool calls → retour user obligatoire (Token Guard Phase 7)
 6. Certification PRAGMA entre CHAQUE bloc (/finish-04-quality 4A)
 7. Walkthrough CTO obligatoire entre CHAQUE bloc (/finish-04-quality 4B)
 8. Réflexion continue : amélioration, dette, failles à chaque Phase 6
 9. Commit conventionnel : type(scope): description
10. Concepts CTO/cours référencés dans CHAQUE walkthrough
```

---

## Références complètes

| Source | Fichier | Ce qu'on en prend |
|---|---|---|
| **Plan V3** | `FINISH/plan.md` | Contexte, règles, ordre blocs |
| **Implementation** | `FINISH/implementation.md` | Spec technique par bloc |
| **Senior Dev Framework** | `pragma-starter-kit/framework/senior-dev-framework.md` | 28 sections standard |
| **PRAGMA dev rules** | `pragma-starter-kit/.agent/rules/dev.md` | Interdictions, naming |
| **PRAGMA during-coding** | `pragma-starter-kit/.agent/workflows/during-coding.md` | Per-feature workflow |
| **PRAGMA before-deploy** | `pragma-starter-kit/.agent/workflows/before-deploy.md` | Checklist pré-deploy |
| **PRAGMA quality-agent** | `pragma-starter-kit/.agent/workflows/quality-agent.md` | 28 sections, checkpoints |
| **CTO/cours** | `CTO/cours/` | 16 fichiers formation |
| **GLOSSAIRE** | `CTO/cours/GLOSSAIRE.md` | 100+ termes techniques |
| **Certification template** | `FINISH/certifs/quality_agent_template.md` | Format certification |
| **Walkthrough template** | `FINISH/certifs/walkthrough_template.md` | Format rapport CTO |
| **Analyse Personas** | `FINISH/analyse_personas_db.md` | Architecture DB personas |
| **Versioning Personas** | `LIVRABLES/Commercial/METHODE_VERSIONING_PERSONAS.md` | Modèle additif 3 couches |
| **Stratégie Moteur** | `KERNEL/STRATEGIE_PERSONNALISATION_MOTEUR.md` | Roadmap M1→M2→M3 |
| **Overlay Enfants** | `FINAL/autres/REFLEXION_OVERLAY_ENFANTS.md` | Options A-D overlay <18 ans |
