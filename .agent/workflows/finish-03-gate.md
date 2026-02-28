---
description: Étape 3 — Gate inter-blocs. Build gates TypeScript + Production obligatoires ENTRE chaque bloc.
---

# Étape 3 — Gate Inter-Blocs

// turbo-all

> **Quand** : APRÈS avoir terminé tous les fichiers d'un bloc, AVANT certification.
> **Bloquant** : Si la gate échoue, FIXER avant de passer au bloc suivant.
> **Chaîne** : Appelé après `/finish-02-token-guard` → gate OK → Étape 4 (quality + walkthrough dans `/finish-sprint`)

---

## Commandes Gate

```bash
# 1. TypeScript strict compilation
cd /Users/antonin/monka/APP && npx tsc --noEmit
# Attendu : 0 erreurs
# Si erreurs → fixer IMMÉDIATEMENT, pas de skip

# 2. Build production
cd /Users/antonin/monka/APP && npm run build
# Attendu : Build réussi, 0 erreurs
# Noter le temps de build et la taille du bundle

# 3. Tests (si existants)
cd /Users/antonin/monka/APP && npm test -- --run
# Attendu : Tous les tests passent
# Si pas de tests → N/A, mais noter dans quality check

# 4. Audit sécurité
cd /Users/antonin/monka/APP && npm audit
# Attendu : 0 vulnérabilités high/critical
# Si vulnérabilités → évaluer si nouvelles (introduites par nous)
```

---

## Critères de passage

| Gate | Seuil | Si échec |
|---|---|---|
| `tsc --noEmit` | 0 erreurs | Fix immédiat, pas de bypass |
| `npm run build` | Build OK | Fix immédiat |
| `npm test` | 100% pass | Fix immédiat |
| `npm audit` | 0 high/critical nouvelles | Documenter si pré-existant |
| Fichiers < 300L | Aucun nouveau fichier > 300L | Documenter comme dette si pré-existant |
| Pas de `any` nouveau | grep src/ | Retirer le `any` |
| Pas de `console.log` | grep src/ | Retirer le log |

---

## Métriques à capturer

Après chaque gate réussie, noter dans le quality check :

```markdown
## Gate Results — BLOC {N}
- **TypeScript** : ✅ 0 erreurs (`npx tsc --noEmit`)
- **Build prod** : ✅ {temps}s, bundle {taille}KB (gzip {taille}KB)
- **Tests** : {✅ X/X pass | N/A}
- **npm audit** : ✅ 0 nouvelles vulnérabilités
- **Fichiers > 300L** : {liste ou aucun}
```

---

## Résultats historiques

| Bloc | tsc | Build | Tests | Audit | Commentaire |
|---|---|---|---|---|---|
| BLOC 1 | ✅ 0 err | ✅ 36.33s | N/A | ✅ 0 | 17 fichiers, 0 erreurs |
| BLOC 2 | — | — | — | — | — |
| BLOC 3 | — | — | — | — | — |

> Remplir ce tableau au fur et à mesure pour tracer la qualité.

---

## Output → Input pour Étape 4 (Quality Agent + Walkthrough)

Après gate réussie, tu DOIS fournir au quality check :
- [ ] Résultats des 4 commandes gate (tsc, build, test, audit)
- [ ] Temps de build et taille du bundle
- [ ] Liste des fichiers modifiés (avec lignes modifiées)
- [ ] Dette technique détectée pendant Token Guard Phase 6
- [ ] Violations PRAGMA si exceptions documentées

Ces données alimentent :
1. `FINISH/certifs/BLOC-{N}_quality_check.md` → template `quality_agent_template.md`
2. `FINISH/certifs/BLOC-{N}_walkthrough.md` → template `walkthrough_template.md`

→ **Passer à l'Étape 4** dans `/finish-sprint` (Quality Agent + Walkthrough).
→ Puis mettre à jour `task.md` → BLOC N → `[x]`.
→ Si BLOC N+1 existe → recommencer à `/finish-00-relecture`.

---

> ✅ **Chaîne suivante** : Étape 4 dans `/finish-sprint` → `/finish-00-relecture` (bloc suivant)
