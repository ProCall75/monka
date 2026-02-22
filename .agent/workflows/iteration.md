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
- [ ] §2 Structure — taille fichier respectée ?
- [ ] §3 Tests — tests ajoutés EN MÊME TEMPS ?
- [ ] §10 Edge Cases — cas limites identifiés ?
- [ ] §17 Perf — pas de régression perf ?
- [ ] §18 A11y — accessibilité maintenue ?

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
# 1. Build clean
npm run build 2>&1 | tail -5

# 2. Type check
npx tsc --noEmit 2>&1 | tail -10

# 3. Scan fichiers > 300L
find APP/src -name '*.tsx' -o -name '*.ts' | xargs wc -l | sort -rn | head -20

# 4. Scan imports directs engine (violation architecture)
grep -r "from.*engine/" APP/src/pages/ --include='*.tsx' --include='*.ts' | grep -v hooks

# 5. Scan console.log
grep -rn "console.log" APP/src/ --include='*.tsx' --include='*.ts' | grep -v node_modules
```

### Checklist post-itération
- [ ] Build clean (0 erreurs)
- [ ] Type check clean (0 erreurs TS)
- [ ] Aucun fichier > 300L
- [ ] Aucune violation d'architecture (imports directs)
- [ ] Aucun console.log
- [ ] Tests passent (si configurés)
- [ ] Content blocks utilisés (pas de hardcode clinique)

---

## Étape 4 — 📄 CERTIFICATION ITÉRATION

Générer un rapport de certification (Quality Gate itération) :

```markdown
## 🔍 QG Itération — [Nom de l'itération]

**Date :** YYYY-MM-DD
**Fichiers modifiés :** X
**Lignes ajoutées/supprimées :** +Y / -Z

### Vérifications
| Check | Résultat |
|---|---|
| Build clean | ✅/❌ |
| Types clean | ✅/❌ |
| Fichiers < 300L | ✅/❌ |
| Architecture respectée | ✅/❌ |
| Pas de console.log | ✅/❌ |
| Hardcode audit | ✅/❌ |
| Tests ajoutés | ✅/❌ |

### Verdict
✅ Conforme / ⚠️ Réserves / 🔴 Non conforme

### Rapport
→ `docs/certifications/YYYY-MM-DD_iter-description.md`
```

---

## Étape 5 — 📝 MISE À JOUR SPRINT

Si l'itération crée de la dette ou des idées non-exécutées :
1. **Documenter** dans `SPRINT.md` au bloc approprié
2. **Créer une micro-phase** si nécessaire
3. **Objectif : 0 dette flottante**

---

## Anti-Patterns

```
❌ Modifier 5 fichiers sans vérifier le build entre chaque
❌ Ajouter du texte clinique hardcodé (doit venir de content_blocks)
❌ Ignorer les fichiers qui dépassent 300L après modification
❌ Skipper l'analyse d'impact et coder directement
❌ Oublier la certification post-itération
❌ Laisser de la dette sans la planifier dans un bloc SPRINT
```

---

## Commande rapide

```
/iteration [description courte de la modification]
```
