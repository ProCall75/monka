---
description: Workflow itération — Modification de l'app existante avec zéro dette technique et certification qualité
---

# 🔄 Iteration Workflow — Zéro Dette Technique

> Ce workflow s'applique à **chaque itération** (modification de feature existante, nouvelle feature, refactor). Il garantit zéro dette technique et traçabilité complète.

---

## Étape 1 — 📋 ANALYSE D'IMPACT

Avant de modifier quoi que ce soit, scanner les impacts :

```markdown
## 📋 Analyse d'Impact — [Description de l'itération]

### Fichiers impactés
| Fichier | Lignes actuelles | Type de modification | Impact |
|---------|:---:|---|---|
| `file.tsx` | 230L | Modification | 🟢 Faible / 🟠 Moyen / 🔴 Fort |

### Checklist dev.md
- [ ] Aucun fichier résultant > 300L ? (sinon → split AVANT)
- [ ] Aucun `any` TypeScript introduit ?
- [ ] Aucun `console.log` ajouté ?
- [ ] Aucun import direct page → engine (passe par hooks) ?
- [ ] Aucune logique métier dans un composant UI ?
- [ ] Types explicites sur tout le nouveau code ?

### Checklist Senior Dev Framework
- [ ] §2 Structure — taille fichier respectée (page <200L, composant <250L, fichier <300L) ?
- [ ] §3 Tests — tests ajoutés EN MÊME TEMPS ?
- [ ] §4 Types — explicites sur tout le nouveau code ?
- [ ] §10 Edge Cases — cas limites identifiés ?
- [ ] §11 Error Handling — erreurs loggées avec contexte ?
- [ ] §15 Git — format commit respecté (type(scope): description) ?
- [ ] §17 Perf — pas de régression perf (memoization, lazy loading) ?
- [ ] §18 A11y — accessibilité maintenue (labels, keyboard nav) ?
- [ ] §19 Docs — documentation mise à jour si changement structurel ?

### Seuil d'impact
Si ≥ 3 fichiers en impact 🔴 → PAUSE + replanification avant de coder.
```

**→ L'agent attend le GO si l'impact est significatif.**

---

## Étape 2 — 🛠️ IMPLÉMENTATION

// turbo-all

### Règles d'implémentation
1. **Modifier un fichier à la fois** — vérifier le build entre chaque
2. **Tester immédiatement** chaque modification
3. **Si un fichier dépasse 300L** → split AVANT de continuer
4. **Si un composant dépasse 250L** → extraire sous-composant
5. **Si une page dépasse 200L** → extraire logique dans hooks/composants

### Token Guard (identique au sprint-bloc)
Si approche de la limite → sauvegarder l'état et revenir.

### Hardcode Audit
Après chaque modification UI :
- [ ] Aucun texte clinique hardcodé ? (doit venir de DB/content_blocks)
- [ ] Aucun ID hardcodé ? (doit venir de DB)
- [ ] Aucune couleur/style hardcodé ? (doit venir du design system)
- [ ] Aucune logique de routing hardcodée ? (doit être data-driven)

---

## Étape 3 — 🔍 VÉRIFICATION POST-ITÉRATION

### Scan complet obligatoire

```bash
# 1. Type check
npx tsc --noEmit 2>&1 | wc -l

# 2. Scan fichiers > 300L
find APP/src -name '*.tsx' -o -name '*.ts' | xargs wc -l | sort -rn | head -20

# 3. Scan imports directs engine (violation architecture)
grep -r "from.*engine/" APP/src/pages/ --include='*.tsx' --include='*.ts' | grep -v hooks

# 4. Scan console.log
grep -rn "console.log" APP/src/ --include='*.tsx' --include='*.ts' | grep -v node_modules

# 5. Scan any
grep -rn ": any" APP/src/ --include='*.tsx' --include='*.ts' | grep -v node_modules | grep -v .d.ts
```

### Checklist post-itération
- [ ] Type check clean (0 erreurs TS)
- [ ] Aucun fichier > 300L
- [ ] Aucune violation d'architecture (imports directs)
- [ ] Aucun console.log
- [ ] Aucun `any` non justifié
- [ ] Content blocks utilisés (pas de hardcode clinique)

---

## Étape 4 — 📄 CERTIFICATION ITÉRATION (QG)

Générer un rapport de certification dans `FINAL/docs/certifications/iterations/` :

```markdown
## 🔍 QG Itération — [Nom de l'itération]

**Date :** YYYY-MM-DD
**Fichiers modifiés :** X
**Lignes ajoutées/supprimées :** +Y / -Z

### Vérifications techniques
| Check | Résultat |
|---|---|
| tsc --noEmit | ✅/❌ |
| Fichiers < 300L | ✅/❌ |
| Architecture (hooks barrier) | ✅/❌ |
| console.log = 0 | ✅/❌ |
| any = 0 | ✅/❌ |
| Hardcode audit | ✅/❌ |

### Conformité Senior Dev Framework
| § | Règle | Conforme |
|---|---|---|
| §2 | Structure fichier | ✅/❌ |
| §4 | Types explicites | ✅/❌ |
| §11 | Error handling | ✅/❌ |
| §15 | Format commit | ✅/❌ |
| §17 | Performance | ✅/❌ |
| §19 | Documentation | ✅/❌ |

### Verdict
✅ Conforme / ⚠️ Réserves / 🔴 Non conforme
```

---

## Étape 5 — 📝 AUDIT PAGE (Documentation vivante)

Après chaque itération sur une page, mettre à jour sa fiche dans `APP/docs/pages/` :

```markdown
# [NomPage] — Fiche Audit

## Rôle
Description de ce que fait la page.

## Données consommées
| Source | Hook / Getter | Données |
|---|---|---|
| Supabase table X | useMonkaData → getXForY() | Description |

## Composants utilisés
- `ComposantA` — Description
- `ComposantB` — Description

## Connexions DB vérifiées
- [ ] Toutes les données affichées proviennent de la DB
- [ ] Aucun texte clinique hardcodé
- [ ] Content blocks utilisés là où applicable

## Métriques
| Métrique | Valeur |
|---|---|
| Lignes | XL |
| Imports hooks | X |
| Composants enfants | X |
```

---

## Étape 6 — 🏗️ REPLANIFICATION DETTE TECHNIQUE

Après chaque itération, vérifier et replanifier :

1. **Scanner la dette existante** : fichiers > 250L, violations archi, `any` utilisés
2. **Comparer au Senior Dev Framework** : identifier les écarts (§2-§19)
3. **Prioriser** : classer par criticité (🔴 immédiat / 🟠 prochain sprint / 🟢 backlog)
4. **Documenter** dans `TODO.md` ou `SPRINT.md` au bloc approprié
5. **Objectif : 0 dette flottante** — toute dette identifiée doit être planifiée

### Matrice de priorisation dette
```
🔴 Critique (immédiat) : fichier > 300L, violation archi, any non justifié, console.log
🟠 Moyen (prochain sprint) : fichier > 250L, tests manquants, docs obsolètes
🟢 Faible (backlog) : refactor esthétique, optimisation perf non-bloquante
```

---

## Anti-Patterns

```
❌ Modifier 5 fichiers sans vérifier le build entre chaque
❌ Ajouter du texte clinique hardcodé (doit venir de content_blocks)
❌ Ignorer les fichiers qui dépassent 300L après modification
❌ Skipper l'analyse d'impact et coder directement
❌ Oublier la certification post-itération
❌ Laisser de la dette sans la planifier dans un bloc SPRINT
❌ Pousser sans vérifier la conformité Senior Dev Framework
❌ Oublier de produire ou mettre à jour la fiche audit page
```

---

## Commande rapide

```
/iteration [description courte de la modification]
```
