---
description: Workflow de collaboration Antonin ↔ Agent pour chaque bloc du sprint Clinical Engine. Boucle systématique sur les 20 blocs.
---

# 🔁 Sprint Bloc — Workflow de Collaboration

> Ce workflow définit l'interaction systématique entre Antonin et l'agent IA pour chaque bloc du sprint. 20 blocs × 20 Quality Gates — même protocole à chaque fois.

---

## Protocole par Bloc

```
┌─────────────────────────────────────┐
│           DÉBUT BLOC N              │
├─────────────────────────────────────┤
│ 1. 📋 BRIEFING (Agent → Antonin)    │
│    Résumé du bloc, périmètre,       │
│    livrables attendus               │
│    → Attendre GO ✅                 │
├─────────────────────────────────────┤
│ 2. 🛠️ IMPLÉMENTATION (Agent)       │
│    Code, tests, docs                │
│    → Check token guard en continu   │
├─────────────────────────────────────┤
│ 3. 🧠 DEBRIEF (Agent → Antonin)    │
│    Feedback loop structuré          │
│    → Récap complet                  │
├─────────────────────────────────────┤
│ 3b. 📋 REPLANIFICATION DETTE        │
│     Idées + signaux → micro-phases  │
│     dans SPRINT.md aux bons blocs   │
│     → 0 dette flottante             │
├─────────────────────────────────────┤
│ 4. 🔍 QG (Agent → Antonin)         │
│    Quality Gate du bloc             │
│    → Verdict + rapport              │
├─────────────────────────────────────┤
│ 5. ✅ VALIDATION (Antonin)          │
│    GO bloc suivant ou corrections   │
└─────────────────────────────────────┘
```

---

## Étape 1 — 📋 BRIEFING

Avant de coder quoi que ce soit, l'agent présente :

```markdown
## 📋 Briefing Bloc N — [Nom du Bloc]

### Objectif
[1-2 phrases, ce que ce bloc accomplit]

### Livrables
- [ ] Fichier A (nouveau / modifié)
- [ ] Fichier B
- [ ] Tests associés

### Données requises
[Tables Supabase, fichiers KERNEL, etc.]

### Dépendances
[Blocs précédents dont celui-ci dépend]

### Estimation
~X fichiers, ~Y lignes de code, ~Z minutes
```

**→ L'agent attend le GO explicite d'Antonin avant de commencer.**

---

## Étape 2 — 🛠️ IMPLÉMENTATION

L'agent code le bloc. Règles pendant l'implémentation :

### Token Guard — ⚠️ OBLIGATOIRE

> [!CAUTION]
> **Si l'agent sent qu'il approche sa limite de tokens (contexte long, beaucoup de fichiers modifiés), il DOIT :**
> 1. **S'arrêter immédiatement** — même au milieu d'un fichier
> 2. **Sauvegarder l'état** — lister ce qui est fait vs ce qui reste
> 3. **Revenir vers Antonin** avec ce format :

```markdown
## ⚠️ Token Guard — Pause Nécessaire

### ✅ Fait
- [liste des fichiers créés/modifiés]
- [état du build]

### 🔜 Reste à faire
- [fichiers non commencés]
- [tests manquants]

### 💡 État mental
[Ce que j'avais en tête pour la suite — pour que le prochain contexte reprenne sans perte]

→ **Dis "continue" pour reprendre.**
```

### Standards d'implémentation
- Fichiers < 300 lignes, fonctions < 50 lignes
- Types explicites, pas de `any`
- Pas de `console.log` — logger structuré
- Tests EN MÊME TEMPS que le code
- Commits conventionnels `type(scope): description`

---

## Étape 3 — 🧠 DEBRIEF (Feedback Loop)

> [!IMPORTANT]
> **C'est LE moment le plus important du workflow.** L'agent ne fait PAS juste un résumé de ce qu'il a codé — il partage sa réflexion de senior dev.

Après chaque bloc terminé, l'agent DOIT fournir ce rapport :

```markdown
## 🧠 Debrief Bloc N — [Nom du Bloc]

### ✅ Ce qui a été fait
- [Liste des livrables, fichiers, fonctionnalités]
- Build status : ✅/❌
- Tests : X passés, Y échoués

### 💡 Idées non-exécutées
> Ce que j'ai pensé faire mais que je n'ai PAS fait, et pourquoi :
- **[Idée 1]** : [Description] → Non-exécuté parce que [raison : hors scope / risque de régression / pas assez de données / j'ai eu peur que ça casse X]
- **[Idée 2]** : [Description] → [raison]

### 🔄 Ce que je ferais différemment
[Avec le recul de l'implémentation, si je refaisais ce bloc :]
- [Point 1]
- [Point 2]

### ⚡ Signaux faibles
[Choses qui ne sont pas des bugs mais qui pourraient devenir des problèmes :]
- [Signal 1 — ex: fichier qui approche 250 lignes]
- [Signal 2 — ex: pattern qui se répète et mériterait abstraction]

### 📊 Métriques
| Métrique | Valeur |
|----------|--------|
| Fichiers créés | X |
| Fichiers modifiés | Y |
| Lignes ajoutées | ~Z |
| Tests ajoutés | N |
| Build clean | ✅/❌ |
```

---

## Étape 3b — 📋 REPLANIFICATION DETTE (0 dette flottante)

> [!CAUTION]
> **OBLIGATOIRE. Chaque idée non-exécutée, chaque signal faible, chaque dette technique identifiée dans le debrief DOIT être planifiée dans un bloc futur spécifique de SPRINT.md.**
> 
> **Objectif : 0 dette flottante.** Rien ne reste en l'air. Tout est planifié, tracé, et rattaché à un bloc.

Après le debrief, l'agent DOIT :

1. **Lister** chaque élément du debrief (idées non-exécutées, signaux faibles, dette technique)
2. **Identifier** le bloc futur le plus pertinent pour chaque élément
3. **Créer une micro-phase** dans ce bloc dans SPRINT.md (ex: `Micro-Phase 8a — Nettoyage Architecture`)
4. **Mettre à jour le tableau de synthèse** dans le bloc courant

### Format obligatoire dans SPRINT.md (bloc courant)

```markdown
### 📝 Bloc N — Dette planifiée

| Élément | Problème | Planifié dans | Action |
|---------|----------|---------------|--------|
| `fichier.ts` | 546L > 300L max | **Bloc X** (micro-phase Xa) | Découper en modules |
| `ComposantY.tsx` | Pas créé, dépend de Z | **Bloc Y** (micro-phase Ya) | Créer après Z |
```

### Format obligatoire dans SPRINT.md (bloc cible)

```markdown
### 🔧 Micro-Phase Na — [Nom descriptif] (dette Bloc X)

> Actions concrètes à exécuter dans ce bloc :
> 1. **[Action 1]** — description
> 2. **[Action 2]** — description
```

### Règles
- **Jamais de liste vague** : chaque item a un bloc-cible, une micro-phase, et une action concrète
- **Signal faible → bloc précis** : un fichier qui approche 250L → planifier l'extraction dans le bloc qui le touche
- **Pattern qui se répète** → planifier l'abstraction dans le prochain bloc qui pourrait en bénéficier
- **Dépendance manquante** (table vide, composant pas créé) → planifier le populate/create dans le bloc qui en a besoin en premier

> [!TIP]
> **Test de qualité** : à la fin de cette étape, si quelqu'un lit le debrief et demande "et ça, c'est prévu quand ?", la réponse est toujours dans SPRINT.md avec un numéro de bloc et une micro-phase.

```

---

## Étape 4 — 🔍 Quality Gate

Exécuter le QG tel que défini dans SPRINT.md pour ce bloc :

```markdown
## 🔍 QG-N — [Nom du Bloc]

### Sections vérifiées
| § | Section | Verdict |
|---|---------|---------|
| §2 | Structure | ✅/⚠️/🔴 |
| §X | [Section] | ✅/⚠️/🔴 |

### Verdict global
✅ Peut procéder / ⚠️ Réserves acceptées / 🔴 BLOQUÉ

### Rapport
→ `docs/certifications/YYYY-MM-DD_qg-NN-bloc-name.md`
```

---

## Étape 5 — ✅ VALIDATION

Antonin valide :
- **GO** → Passer au bloc suivant
- **Corrections** → L'agent corrige puis re-soumet le debrief
- **Pivot** → Changement de direction (re-briefing)

---

## Résumé : Qui fait quoi

| Action | Qui | Quand |
|--------|-----|-------|
| Briefing bloc | Agent | Début de chaque bloc |
| GO pour coder | Antonin | Après le briefing |
| Implémentation | Agent | Après le GO |
| Token Guard stop | Agent | Quand nécessaire |
| "continue" | Antonin | Après un token guard |
| Debrief + idées | Agent | Après implémentation |
| **Replanification dette** | **Agent** | **Après le debrief — OBLIGATOIRE** |
| Quality Gate | Agent | Après la replanification |
| Validation QG | Antonin | Après le QG |
| GO bloc suivant | Antonin | Après validation |

---

## Anti-Patterns

```
❌ L'agent code 3 blocs d'un coup sans feedback
❌ L'agent cache ses hésitations ou idées non-exécutées
❌ L'agent atteint sa limite de tokens et produit du code tronqué
❌ L'agent fait le QG en même temps que le code (le QG est une étape SÉPARÉE)
❌ L'agent modifie le SPRINT.md sans demander
❌ L'agent commence un bloc sans briefing + GO
❌ L'agent note des idées/signaux faibles sans les planifier dans un bloc précis de SPRINT.md
❌ L'agent laisse de la dette "flottante" — tout doit avoir un bloc-cible et une micro-phase
```

---

## Commande rapide

Pour déclencher ce workflow :
```
/sprint-bloc N
```
Où N = numéro du bloc (0-19)
