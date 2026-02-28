# 🎯 ACTIONS CE SOIR — Condensé Total

**Fusion** : anglesmorts.md (15 findings) + audit_db.md (10 findings) → **plan d'action priorisé**

---

## ⚡ ACTIONS À FAIRE (dans l'ordre)

### ACTION 1 — Fix Multi-Select avec `string[]` natif (pas pipe)
**Quoi** : Le plan actuel propose pipe-delimited. **Mauvais choix.** `clinicalEngine.ts` supporte déjà `string | string[]`. On aligne tout dessus.

**Fichiers** :
| Fichier | Modif |
|---|---|
| `SimulatorPage.tsx` | Changer `Record<string, string>` → `Record<string, string \| string[]>` (import `Answers` de clinicalEngine) |
| `QuestionsSidebar.tsx` | Click handler multi : toggle dans un array. Highlight via `Array.includes()`. Garder choix_unique inchangé |
| `helpers.ts` | Changer type `Record<string, string>` → `Answers`. Simplifier `getActiveAidanceBlocks` : `Array.isArray(n3Answer) ? n3Answer : [n3Answer]` au lieu du hack pipe |
| `ProfileRecap.tsx` | Afficher les arrays comme liste `opt1, opt2` au lieu de `[object Object]` |

**Pourquoi c'est le meilleur move** : Le moteur clinique (`evaluateCondition`, `computeScore`) gère DÉJÀ les arrays. On ne crée pas une couche de conversion inutile. Zéro dette.

**Risque** : Les `persona_answers` en DB stockent N3 en pipe-delimited (`"opt1|opt2"`). Il faut parser au chargement (1 ligne : `answer.includes('|') ? answer.split('|') : answer`).

---

### ACTION 2 — Ajouter 2-3 tests unitaires multi-select
**Quoi** : Ajouter dans `clinicalEngine.test.ts` :
1. `evaluateCondition` avec réponse `string[]` pour op `eq`, `in`, `count_gte`
2. `computeScore` avec réponse multi-select sur E19 (vérifier que le cap à 1 fonctionne)

**Pourquoi** : Seules 2 questions multi-select (E19, O16) sont scorantes. Si le scoring est cassé sur ces 2-là, c'est un bug silencieux. Les tests le détectent avant la démo.

**Effort** : ~15 lignes de test.

---

### ACTION 3 — ErrorBoundary global
**Quoi** : Ajouter un composant `ErrorBoundary` dans `App.tsx`. Si un composant crash → message propre au lieu d'écran blanc.

**Pourquoi** : 3 try/catch dans toute l'app, 0 ErrorBoundary. Si Supabase timeout pendant la démo → écran blanc. Inacceptable lundi.

**Effort** : 15 lignes de code, 1 fichier.

---

### ACTION 4 — README minimal dans `APP/`
**Quoi** : Créer `APP/README.md` avec : Stack technique, Setup local, Variables d'env, Architecture (`engine/`, `clinical/`, `pages/`), Déploiement.

**Pourquoi** : Un CTO technique cherche le README en premier. Son absence = signal amateur.

**Effort** : ~30 lignes markdown.

---

### ACTION 5 — Build + Deploy + Commit
**Quoi** : TypeScript check, build prod, npm audit, deploy Vercel, commit conventionnel.

**Effort** : 5 commandes.

---

## 📝 ACTIONS À DOCUMENTER SEULEMENT (pas de code, dans rapport.md)

| # | Finding | Best Move | Pourquoi pas de code |
|---|---|---|---|
| D1 | 3 fichiers > 300L (SimulatorPage 463L) | Mentionner comme dette identifiée | Refactor = risque de régression avant la démo |
| DB1 | Pas de FK constraints en DB | Documenter comme choix contextuel | RLS read-only = pas d'insertion possible via API |
| DB2 | `cr_templates` vide (0 rows) | Documenter comme feature préparée | Le CR fonctionne via `crMedecinPhrases.ts` |
| DB4 | `QUESTION_SCORE_CAP` hardcodé (E19/O16) | Documenter comme dette | Déplacer en DB = migration, pas ce soir |
| DB5 | V1-V5 hardcodées (4 fichiers) | Documenter comme choix d'archi fixe | Le modèle clinique est fixé à 5V |
| DB6 | `N3_TO_AIDANCE_BLOCKS` hardcodé | Documenter + note pour V2 | Si nouvelle option N3 → modifier code |
| DB7 | Backup table stale | Supprimer après livraison | Pas de risque, RLS sans policy |
| DB8 | `select('*')` partout | Acceptable à cette échelle | 3 782 lignes total, pas un problème |
| DB9 | `matrice_patho_specialiste` 1/24 MPs | Documenter | Le code retourne `null` sans crash |
| D6 | App pas responsive mobile | Documenter comme choix de scope | Outil desktop interne |
| D7 | `sessionStorage` non nettoyé si JSON malformé | Documenter | Edge case quasi-impossible |
| A3 | CSP `img-src https:` trop large | Documenter | Aucune injection possible sans user input |

---

## ⚠️ ACTIONS OPTIONNELLES (si on a le temps)

| # | Action | Effort | Impact |
|---|---|---|---|
| A1 | Harmoniser policies `public` → `anon` | 5 min (SQL) | Rigueur CTO |
| A2 | Supprimer policies dupliquées (persona_answers, personas) | 2 min (SQL) | Rigueur CTO |
| DB10 | = A1+A2 fusionnés | 7 min | Cohérence schéma |

---

## 🔄 CE QUI CHANGE DANS LE PLAN

| Section du plan | Avant | Après |
|---|---|---|
| BLOC 1 — Solution | Pipe-delimited `"A\|B"` | **`string[]` natif** (aligné avec clinicalEngine) |
| BLOC 1 — Fichiers | 3 fichiers | **4 fichiers** (+ProfileRecap.tsx) |
| BLOC 1 — Tests | Aucun test ajouté | **+2-3 tests unitaires** |
| BLOC 2 — Architecture | Scan fichiers | **+ErrorBoundary + README** |
| BLOC 3 — Données | Vérifier types vs DB | **Persona answers parsing au load** |
| BLOC 5 — Livrable | rapport.md + conformité | **+audit_db.md + anglesmorts.md déjà faits** |

---

## ⏱️ ESTIMATION CE SOIR

| Action | Temps estimé |
|---|---|
| ACTION 1 — Fix Multi-Select (4 fichiers) | ~20 min |
| ACTION 2 — Tests unitaires | ~5 min |
| ACTION 3 — ErrorBoundary | ~3 min |
| ACTION 4 — README | ~5 min |
| ACTION 5 — Build + Deploy + Commit | ~10 min |
| Documentation (rapport.md) | ~10 min |
| **TOTAL** | **~50 min** |

---

## 📋 RÉSUMÉ EN UNE PHRASE

> **5 actions de code, 12 points documentés, 3 actions optionnelles.** Le plus gros move c'est le changement d'approche multi-select : `string[]` natif au lieu de pipe-delimited, parce que le moteur le supporte déjà et que le pipe c'est un hack.
