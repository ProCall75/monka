# Module 11 — MÉTHODOLOGIE PROJET

> **Objectif** : Parler gestion de projet comme un tech lead.
> Un CTO ne juge pas que le code — il juge comment tu TRAVAILLES.

> **🔬 Clinical Engine** = Sprints courts, itération rapide, Kanban adapté | **📱 MyMonka** = Scrum structuré avec cérémonies complètes, estimation formelle, releases planifiées

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **Agile & Scrum** (§11.1) — Les cérémonies et le vocabulaire
> 2. **Estimation** (§11.3) — Comment on estime le travail
> 3. **Semantic Versioning** (§11.5) — Comment on numérote les versions

---

## 11.1 — Agile & Scrum

### Agile en 1 minute

Le manifeste Agile (2001) tient en 4 valeurs :

| On valorise PLUS... | ...que |
|---------------------|--------|
| **Les individus et leurs interactions** | Les processus et les outils |
| **Un logiciel fonctionnel** | Une documentation exhaustive |
| **La collaboration avec le client** | La négociation de contrat |
| **L'adaptation au changement** | Le suivi d'un plan |

**Ce que ça veut dire en pratique** : On livre par petits morceaux, on adapte en cours de route, on parle au client souvent.

### Scrum : le framework

**Le sprint** (2 semaines typiquement) :

```
Sprint Planning (Lundi matin)
    → "Qu'est-ce qu'on livre ce sprint ?"
    → On prend des tickets du backlog
    
Daily Standup (15 min chaque matin)
    → "Qu'est-ce que j'ai fait hier ?"
    → "Qu'est-ce que je fais aujourd'hui ?"
    → "Est-ce que je suis bloqué ?"

Sprint Review (Dernier jour)
    → On montre ce qu'on a livré
    → Le PO valide ou demande des ajustements

Sprint Retrospective (Après la review)
    → "Qu'est-ce qui a bien marché ?"
    → "Qu'est-ce qu'on améliore ?"
```

### Les rôles Scrum

| Rôle | Responsabilité | Qui c'est chez Monka |
|------|---------------|---------------------|
| **Product Owner (PO)** | Définit QUOI construire, priorise le backlog | Le client / Monka |
| **Scrum Master** | Facilite le process, enlève les blocages | Un membre de l'équipe |
| **Dev Team** | Construit le produit | PRAGMA + le CTO |

### Les artefacts Scrum

| Artefact | C'est quoi |
|---------|-----------|
| **Product Backlog** | Liste de TOUT ce qu'il faut faire (triée par priorité) |
| **Sprint Backlog** | Sous-ensemble sélectionné pour CE sprint |
| **Increment** | Ce qui a été livré à la fin du sprint |
| **Definition of Done** | Critères pour qu'un ticket soit "fini" (codé + testé + reviewé + déployé) |

---

## 11.2 — Kanban

### Alternative ou complément à Scrum

Pas de sprints, pas de planning fixe. Un flux continu de tickets :

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│   TODO   │→ │ IN PROG  │→ │  REVIEW  │→ │   DONE   │
│          │  │ (max 3)  │  │ (max 2)  │  │          │
│ ticket 1 │  │ ticket 4 │  │ ticket 6 │  │ ticket 8 │
│ ticket 2 │  │ ticket 5 │  │          │  │ ticket 9 │
│ ticket 3 │  │          │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### WIP Limits (Work In Progress)

**La règle** : Limiter le nombre de tickets en cours simultanément (ex : max 3 en "In Progress"). Pourquoi ? Finir des choses > commencer des choses.

### Métriques Kanban

| Métrique | Ce que ça mesure |
|----------|-----------------|
| **Lead Time** | Temps entre la création du ticket et sa mise en prod |
| **Cycle Time** | Temps entre le début du travail et la mise en prod |
| **Throughput** | Nombre de tickets livrés par semaine |

---

## 11.3 — Estimation

### Story Points

On estime la **complexité relative**, pas le temps :

| Points | Complexité | Analogie |
|--------|-----------|----------|
| 1 | Trivial | Changer un texte |
| 2 | Simple | Ajouter un champ à un formulaire |
| 3 | Moyen | Nouveau composant + API |
| 5 | Complexe | Nouvelle fonctionnalité complète |
| 8 | Très complexe | Nouveau module avec logique métier |
| 13 | Épique | À découper en plusieurs tickets |

**Suite de Fibonacci** (1, 2, 3, 5, 8, 13) : Plus le ticket est gros, plus l'incertitude est grande. Les écarts grandissants reflètent cette incertitude.

### Planning Poker

1. Le PO décrit un ticket
2. Chaque dev choisit secrètement sa carte (1, 2, 3, 5, 8, 13)
3. Tout le monde révèle en même temps
4. Les extrêmes expliquent leur raisonnement
5. On re-vote si nécessaire → consensus

**Pourquoi simultané** : Éviter l'influence du premier qui parle (biais d'ancrage).

### T-Shirt Sizing (alternative rapide)

| Taille | Effort | Story Points équivalent |
|--------|--------|------------------------|
| **XS** | Quelques heures | 1 |
| **S** | 1 jour | 2-3 |
| **M** | 2-3 jours | 5 |
| **L** | 1 semaine | 8 |
| **XL** | À découper | 13+ |

---

## 11.4 — Technical Specs

### RFC (Request for Comments)

Avant d'implémenter quelque chose de complexe, on rédige un document :

```markdown
# RFC: Migration du scoring V3 vers V4

## Problème
Le scoring V3 ne prend pas en compte la polymédicamentation.

## Proposition
Ajouter un facteur de pondération basé sur le nombre de médicaments.

## Alternatives considérées
1. Modifier V3 → Risque de régression
2. Nouveau module V4 → Plus propre, backward compatible

## Impact
- 3 fichiers modifiés dans le Kernel
- 1 migration DB
- Tests à mettre à jour

## Décision
Option 2 retenue → Le CTO valide.
```

### Spike

Une **spike** est un ticket de recherche exploratoire. Pas de code livré, juste une investigation :

> "Investiguer si PostgreSQL supporte la requête géospatiale pour localiser les patients par zone"
> Résultat : Un document avec la conclusion et les recommandations.

**Time-boxé** : Maximum 2 jours. Si on n'a pas la réponse → on fait un choix avec les informations disponibles.

---

## 11.5 — Delivery & Release

### Semantic Versioning (SemVer)

```
v1.2.3
 │ │ │
 │ │ └── PATCH : bug fix (pas de changement de comportement)
 │ └──── MINOR : nouvelle fonctionnalité (backward compatible)
 └────── MAJOR : breaking change (incompatible avec la version précédente)
```

Exemples :
- `v1.0.0` → `v1.0.1` : Correction d'un bug d'affichage
- `v1.0.1` → `v1.1.0` : Ajout du scoring V4
- `v1.1.0` → `v2.0.0` : Refonte de l'API (les anciennes requêtes ne marchent plus)

### Changelog

Journal des changements par version :

```markdown
## [1.2.0] - 2026-03-01
### Ajouté
- Scoring V4 avec pondération polymédication
- Export PDF des résultats

### Corrigé
- Affichage du score sur mobile
- Calcul CCC pour les profils sans aidant
```

### Release Process

```
1. Feature freeze → Plus de nouvelles features
2. QA testing → Tests manuels + automatisés
3. Staging deploy → Validation en pré-prod
4. Changelog → Documentation des changements
5. Tag Git → v1.2.0
6. Production deploy → Go live
7. Monitoring → Surveiller les métriques post-deploy pendant 30min
```

---

## 11.6 — Communication technique

### Stand-up efficace (15 min MAX)

Chaque personne répond à 3 questions :
1. **Hier** : "J'ai terminé le composant de score V3"
2. **Aujourd'hui** : "Je commence les tests d'intégration"
3. **Blocages** : "J'ai besoin d'accès à la table X"

❌ Pas de discussions techniques détaillées pendant le stand-up.
✅ "On en parle après le stand-up" → discussion ciblée avec les personnes concernées.

### Demo & Sprint Review

Montrer du logiciel **qui fonctionne**, pas des slides :
- Partager l'écran
- Naviguer dans l'app en live
- Montrer les nouvelles fonctionnalités
- Répondre aux questions du PO/client

### Rétrospective

Le meeting le plus sous-estimé et le plus valuable :

| Colonne | Question |
|---------|---------|
| 😊 **Ce qui a bien marché** | Qu'est-ce qu'on garde ? |
| 😔 **Ce qui a mal marché** | Qu'est-ce qu'on arrête ? |
| 💡 **Actions d'amélioration** | Qu'est-ce qu'on essaie ? |

**Règle** : Maximum 3 actions par rétro. Mieux vaut 3 actions qui seront faites que 10 qui seront oubliées.

---

> 💡 **Takeaway** : Le CTO ne te demande pas d'être un Scrum Master. Il veut voir que tu as un **process de travail structuré** — pas du chaos. Connaître les cérémonies Scrum et savoir estimer du travail, c'est 80% de ce qu'il attend.
