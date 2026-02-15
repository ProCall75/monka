# Prompt Templates — Réécriture par Catégorie

> Templates utilisés à l'étape REWRITE du pipeline pour transformer le message décomposé en prompt optimisé.

---

## Template Universel (Base)

Utilisé quand aucun template spécifique ne s'applique mieux.

```markdown
## Contexte
[Qui, quoi, où — enrichi avec infos du repo/projet]

## Objectif
[Phrase unique, cristalline, commençant par un verbe d'action]

## Étapes
1. [Action concrète]
2. [Action concrète]
3. [Action concrète]

## Contraintes
- [Limite technique, temps, scope]

## Format de sortie
[Ce que la réponse doit contenir — structure, format, longueur]

## Critères de succès
- [ ] [Vérifiable, binaire]
```

---

## Template: Code / Dev

Pour les tâches de développement, refactoring, implémentation.

```markdown
## Contexte technique
- **Projet:** [nom + chemin]
- **Stack:** [frameworks, langages]
- **Fichiers concernés:** [paths des fichiers à modifier]
- **État actuel:** [ce qui existe déjà]

## Objectif
[Verbe d'action + ce que le code doit faire une fois terminé]

## Spécifications
1. [Spec fonctionnelle 1]
2. [Spec fonctionnelle 2]

## Contraintes techniques
- [ ] Respecter [pattern/convention existante]
- [ ] Compatible avec [dépendance X]
- [ ] Performance: [seuil si applicable]

## Fichiers à créer/modifier
- `[path]` — [quoi faire]
- `[path]` — [quoi faire]

## Critères de validation
- [ ] Le code compile sans erreur
- [ ] [Fonctionnalité X] fonctionne
- [ ] Pas de régression sur [feature Y]
```

---

## Template: Debug

Pour les problèmes, erreurs, bugs.

```markdown
## Symptôme
[Description précise du problème observable]

## Contexte
- **Quand:** [Quand le bug apparaît]
- **Où:** [Fichier, composant, page]
- **Depuis quand:** [Dernière modification connue]
- **Message d'erreur:** [Texte exact si disponible]

## Reproduction
1. [Étape 1]
2. [Étape 2]
→ Résultat attendu: [X]
→ Résultat obtenu: [Y]

## Hypothèses à vérifier
1. [Hypothèse la plus probable]
2. [Hypothèse alternative]

## Objectif
Identifier la root cause et proposer un fix minimal qui ne casse rien d'autre.
```

---

## Template: Stratégie / Décision

Pour les choix architecturaux, business, pricing, planning.

```markdown
## Contexte business
- **Projet:** [nom]
- **Enjeu:** [pourquoi cette décision compte]
- **Deadline:** [si applicable]

## Question à résoudre
[Formulée comme une question fermée ou à choix]

## Options identifiées
| Option | Description | Avantages | Inconvénients |
|--------|------------|-----------|---------------|
| A | [...] | [...] | [...] |
| B | [...] | [...] | [...] |

## Critères de décision
1. [Critère 1 — poids: élevé/moyen/faible]
2. [Critère 2 — poids: élevé/moyen/faible]

## Format attendu
Recommandation argumentée avec justification basée sur les critères.
```

---

## Template: Créatif / Contenu

Pour la rédaction, design, branding, social media.

```markdown
## Brief
- **Type de contenu:** [post LinkedIn, page web, email, etc.]
- **Audience cible:** [qui va lire/voir]
- **Objectif:** [informer, convertir, engager, etc.]

## Ton & Style
- **Voix:** [professionnel, casual, autoritaire, etc.]
- **Références:** [exemples de ton similaire]
- **À éviter:** [termes, ton, sujets interdits]

## Contenu attendu
- **Sujet principal:** [de quoi on parle]
- **Messages clés:** [1-3 points à faire passer]
- **Call-to-action:** [quelle action on veut provoquer]

## Format de sortie
- **Longueur:** [mots, caractères, slides]
- **Structure:** [sections, bullet points, narrative]
```

---

## Template: Recherche / Analyse

Pour les demandes d'investigation, comparaison, benchmark.

```markdown
## Question de recherche
[Question précise, pas vague]

## Périmètre
- **Sources attendues:** [web, docs internes, API]
- **Région/langue:** [si pertinent]
- **Période:** [données récentes, historiques]

## Profondeur attendue
- [ ] Vue d'ensemble rapide (5 min)
- [ ] Analyse détaillée (30 min)
- [ ] Benchmark complet avec comparaison

## Format de synthèse
[Tableau comparatif, rapport structuré, recommandation, liste]

## Critères d'évaluation
[Comment juger les résultats — objectifs mesurables]
```

---

## Template: Multi-Tâches

Quand le message contient plusieurs demandes distinctes.

```markdown
## Tâches identifiées

### Tâche 1: [Titre]
[Utiliser le template approprié ci-dessus]

---

### Tâche 2: [Titre]
[Utiliser le template approprié ci-dessus]

---

## Ordre d'exécution
1. Tâche [X] en premier (car dépendance)
2. Tâche [Y] en parallèle
3. Tâche [Z] en dernier (dépend de X et Y)
```
