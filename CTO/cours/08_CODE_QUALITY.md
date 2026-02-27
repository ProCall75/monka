# Module 08 — CODE QUALITY

> **Objectif** : Montrer qu'on code proprement même avec l'IA.
> La qualité du code révèle la maturité d'une équipe.

> **🔬 Clinical Engine** = Feature branches, auto-review, conventions établies | **📱 MyMonka** = PR reviews par le CTO, quality gates CI, linting strict, coverage minimum

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **Git flow & branching** (§8.1) — Comment on organise le code
> 2. **Code review** (§8.2) — Le process de validation
> 3. **Dette technique** (§8.5) — Comment on la gère consciemment

---

## 8.1 — Git & Branching Strategy

### Git en 1 minute

Git enregistre l'historique complet du code. Chaque modification = un **commit** (snapshot). On peut revenir à n'importe quel point dans le temps.

### Branching Strategies

#### Git Flow (classique)
```
main        ─────●──────────────────●──── (production)
              ↑                    ↑
develop     ──●──●──●──●──●──●──●──●──── (intégration)
              │     │        │
feature/    ──●──●──●        │
scoring-v3                   │
feature/    ─────────────●──●──●
ui-redesign
```

**Branches** :
- `main` → Production stable
- `develop` → Intégration des features
- `feature/*` → Une branche par fonctionnalité
- `hotfix/*` → Corrections urgentes en prod

#### Trunk-Based Development (moderne)
```
main ──●──●──●──●──●──●──● (tout le monde pushe sur main)
        │     │
        └──●──┘  (branches très courtes, < 1 jour)
```

Tout le monde travaille sur `main` avec des branches ultra-courtes. Plus simple, mais nécessite un bon CI et des feature flags.

### Conventional Commits

Messages de commit standardisés :
```
feat: ajout du scoring V3
fix: correction affichage vulnérabilité tab V2
refactor: extraction logique micro-parcours dans un module
docs: mise à jour documentation Kernel
test: ajout tests unitaires scoring
chore: mise à jour dépendances npm
```

Le préfixe (`feat`, `fix`, etc.) permet de générer automatiquement des changelogs et de comprendre l'historique en un coup d'œil.

---

## 8.2 — Code Review (Revue de code)

### Pourquoi reviewer ?

| Raison | Impact |
|--------|--------|
| **Qualité** | 4 yeux > 2 yeux |
| **Partage de connaissances** | Le reviewer apprend le code |
| **Cohérence** | Les patterns restent uniformes |
| **Sécurité** | Détection de failles potentielles |
| **Documentation** | Les commentaires de PR expliquent le "pourquoi" |

### Le process PR

```
1. Tu crées une branche → tu codes
2. Tu ouvres une Pull Request avec :
   - Titre clair
   - Description : QUOI + POURQUOI + COMMENT tester
   - Screenshots si UI
3. Le reviewer examine :
   - Logique métier correcte ?
   - Patterns respectés ?
   - Tests présents ?
   - Pas de faille de sécurité ?
4. Feedback → tu corriges → re-review
5. Approbation → Merge → Deploy
```

### En vibecoding

Le CTO sera le reviewer principal. C'est LA valeur qu'il apporte. Ton rôle : faire des PR claires avec du contexte, pas des PR de 5000 lignes sans description.

**Règle** : PR < 400 lignes. Au-delà, personne ne review sérieusement.

---

## 8.3 — Linting & Formatting

### ESLint (qualité)

Analyse le code et signale :
- Variables inutilisées
- Imports manquants
- Patterns dangereux (`eval`, `any`)
- Violations de conventions

### Prettier (formatage)

Formate automatiquement le code (indentation, guillemets, longueur de ligne). Pas de débat sur le style — Prettier décide pour tout le monde.

### Husky + Pre-commit hooks

Exécuter automatiquement le lint et le format AVANT chaque commit :
```
git commit → Husky lance ESLint + Prettier → Si erreur → commit bloqué ❌
```

**Ce que le CTO aime entendre** : *"On a ESLint + Prettier avec des pre-commit hooks. Le code qui rentre dans le repo est automatiquement validé et formaté."*

---

## 8.4 — Documentation

### Qu'est-ce qu'on documente ?

| Type | Quoi | Où |
|------|------|-----|
| **README** | Comment lancer le projet | Racine du repo |
| **ADR** | Pourquoi on a pris une décision technique | `/docs/adr/` |
| **API docs** | Comment utiliser l'API | Auto-généré (Swagger/PostgREST) |
| **Code comments** | Le POURQUOI, pas le QUOI | Dans le code |
| **Runbooks** | Comment gérer un incident | `/docs/ops/` |

### Commenter le POURQUOI, pas le QUOI

```typescript
// ❌ Mauvais — décrit ce que le code fait (évident)
// Incrémente le compteur de 1
counter += 1;

// ✅ Bon — explique POURQUOI
// Le scoring V3 utilise un bonus de +1 pour les patients 
// ayant déjà bénéficié d'un suivi (cf. spec clinique §4.2)
score += SUIVI_BONUS;
```

---

## 8.5 — Dette technique

### Définition

Code qui "marche" mais qui sera coûteux à maintenir. C'est un **emprunt** : tu gagnes du temps maintenant, tu paies des intérêts plus tard.

### Types de dette

| Type | Exemple | Urgence |
|------|---------|---------|
| **Délibérée** | "On sait que c'est sale mais on shippe pour la deadline" | Planifiée |
| **Accidentelle** | "On ne savait pas que c'était un anti-pattern" | À corriger dès qu'identifié |
| **Bit rot** | Le code vieillit, les dépendances deviennent obsolètes | Maintenance régulière |

### Gestion de la dette

1. **Identifier** → Linter, code reviews, rétrospectives
2. **Documenter** → Ticket Jira/GitHub Issue avec label "tech-debt"
3. **Prioriser** → Impact business vs coût de correction
4. **Budgéter** → 20% du sprint dédié à la dette technique
5. **Mesurer** → Nombre de tickets tech-debt ouverts/fermés par sprint

### La règle du Boy Scout
> *"Laisse le code un peu plus propre que tu ne l'as trouvé."*

Chaque fois que tu touches un fichier, améliore un petit truc (renomme une variable confuse, extrais une constante, ajoute un commentaire utile).

---

## 8.6 — Refactoring

### Quand refactorer

| Trigger | Action |
|---------|--------|
| Tu copies-colles du code | Extrais une fonction |
| Une fonction fait > 30 lignes | Découpe en sous-fonctions |
| Un fichier fait > 300 lignes | Découpe en modules |
| Tu ne comprends pas un bout de code | Renomme + commente |
| Les tests deviennent impossibles | La fonction a trop de responsabilités |

### Techniques courantes

- **Extract Method** → Sortir un bloc de code dans une fonction nommée
- **Rename** → Donner des noms explicites (`d` → `daysSinceLastEvaluation`)
- **Move** → Déplacer du code dans le bon module
- **Inline** → Supprimer une abstraction inutile
- **Replace Magic Number** → `if (score > 80)` → `if (score > CRITICAL_THRESHOLD)`

---

## 8.7 — Conventions de nommage

### Standard JavaScript/TypeScript

| Élément | Convention | Exemple |
|---------|-----------|---------|
| **Variables** | camelCase | `patientScore`, `isActive` |
| **Fonctions** | camelCase | `calculateVulnerability()` |
| **Classes/Types** | PascalCase | `PatientProfile`, `ScoringResult` |
| **Constantes** | UPPER_SNAKE | `MAX_SCORE`, `CRITICAL_THRESHOLD` |
| **Fichiers composants** | PascalCase | `PatientCard.tsx` |
| **Fichiers utils** | camelCase | `scoringHelpers.ts` |
| **Dossiers** | kebab-case ou camelCase | `clinical-chain/` |
| **Booléens** | préfixe is/has/can | `isActive`, `hasCompletedEval` |

### Noms descriptifs

```typescript
// ❌ Cryptique
const d = calc(p, s);

// ✅ Lisible
const vulnerabilityLevel = calculateVulnerability(patient, scores);
```

---

> 💡 **Takeaway** : La qualité du code, c'est la discipline. Le CTO verra immédiatement si le code est nommé proprement, si les commits sont clairs, et si la dette est gérée. Ce n'est pas de la perfection — c'est de la **rigueur**.
