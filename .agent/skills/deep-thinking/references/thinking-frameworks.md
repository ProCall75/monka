# Thinking Frameworks Reference

> Documentation complète des 6 frameworks de pensée structurée utilisés par le pipeline deep-thinking.

---

## 1. Chain-of-Thought (CoT)

**Quand :** Raisonnement linéaire, logique séquentielle, math, planning simple.

**Principe :** Décomposer un problème en étapes intermédiaires logiques, chaque étape construisant sur la précédente.

**Pattern :**
```
Étape 1: [Observer / Identifier le point de départ]
Étape 2: [Appliquer la première transformation logique]
Étape 3: [Construire sur le résultat de l'étape 2]
...
Conclusion: [Synthèse finale]
```

**Variantes :**
- **Zero-Shot CoT** : Ajouter "Réfléchissons étape par étape" au prompt
- **Self-Consistency (CoT-SC)** : Générer 3-5 chaînes de raisonnement, prendre la réponse la plus cohérente
- **Auto-CoT** : Laisser le modèle générer ses propres exemples de raisonnement

**Exemple d'application :**
```
User: "Comment migrer notre auth de JWT custom vers Supabase Auth?"

CoT:
1. Identifier le système actuel (JWT custom, où sont les tokens, comment sont-ils validés)
2. Mapper les features actuelles vers Supabase Auth (login, signup, reset, roles)
3. Identifier les gaps (features custom non couvertes par Supabase)
4. Planifier la migration (ordre des étapes, rollback plan)
5. Définir les critères de validation (tests, data integrity)
```

---

## 2. Tree-of-Thought (ToT)

**Quand :** Problèmes complexes avec plusieurs solutions possibles, décisions architecturales, trade-offs.

**Principe :** Explorer plusieurs branches de raisonnement en parallèle, évaluer chaque branche, backtracker si nécessaire.

**Pattern :**
```
Problème: [Définition claire]

Branche A: [Approche 1]
  → Avantages: [...]
  → Inconvénients: [...]
  → Score: X/10

Branche B: [Approche 2]
  → Avantages: [...]
  → Inconvénients: [...]
  → Score: X/10

Branche C: [Approche 3]
  → Avantages: [...]
  → Inconvénients: [...]
  → Score: X/10

→ Sélection: Branche [X] car [justification]
→ Développement de la branche choisie
```

**Quand utiliser ToT plutôt que CoT :**
- Quand il y a > 2 approches viables
- Quand le coût d'erreur est élevé
- Quand le problème est non-linéaire
- Quand backtracking est probable

---

## 3. Prompt Decomposition (DecomP)

**Quand :** Tâches multi-étapes, requêtes complexes contenant plusieurs sous-problèmes.

**Principe :** Diviser une tâche complexe en sous-tâches atomiques indépendantes, les traiter séparément, puis combiner.

**Pattern :**
```
Tâche complexe: [Description]

Sous-tâche 1: [Atomique, indépendante]
  → Handler: [Quel outil/méthode]
  → Output: [Résultat attendu]

Sous-tâche 2: [Atomique, dépend de ST1]
  → Handler: [Quel outil/méthode]
  → Input: [Output de ST1]
  → Output: [Résultat attendu]

Assemblage: [Comment combiner les résultats]
```

**Règles de décomposition :**
1. Chaque sous-tâche = un seul concern
2. Expliciter les dépendances
3. Identifier les sous-tâches parallélisables
4. Définir les interfaces entre sous-tâches

---

## 4. Plan-and-Solve (PS)

**Quand :** Tâches techniques > 3 étapes, implémentation de features, refactoring.

**Principe :** Séparer explicitement la phase de planification de la phase d'exécution.

**Pattern :**
```
PHASE PLAN:
  1. Comprendre: [Quoi exactement?]
  2. Lister: [Étapes nécessaires]
  3. Ordonner: [Dépendances et séquence]
  4. Anticiper: [Risques et edge cases]

PHASE SOLVE:
  1. [Exécuter étape 1 du plan]
  2. [Vérifier → OK/KO]
  3. [Exécuter étape 2 du plan]
  ...
```

**Avantage vs CoT pur :** Le plan crée un "checkpoint" mental qui évite de s'égarer en cours de route.

---

## 5. MECE Analysis (Mutually Exclusive, Collectively Exhaustive)

**Quand :** Décisions stratégiques, évaluation d'options, analyses business, pricing.

**Principe :** Découper un problème en catégories qui ne se chevauchent pas (ME) et qui couvrent 100% du périmètre (CE).

**Pattern :**
```
Sujet: [Décision à prendre]

Catégories MECE:
├── Catégorie 1: [...]
│   ├── Critère A: [évaluation]
│   └── Critère B: [évaluation]
├── Catégorie 2: [...]
│   ├── Critère A: [évaluation]
│   └── Critère B: [évaluation]
└── Catégorie 3: [...]
    ├── Critère A: [évaluation]
    └── Critère B: [évaluation]

Vérification:
- ME: Les catégories se chevauchent-elles? → Non ✅
- CE: Tout est couvert? → Oui ✅

Recommandation: [Synthèse]
```

---

## 6. First Principles Thinking

**Quand :** Innovation, remise en question d'approches établies, "pourquoi on fait comme ça?".

**Principe :** Déconstruire un problème jusqu'aux vérités fondamentales (axiomes), puis reconstruire à partir de zéro.

**Pattern :**
```
Croyance actuelle: [Ce qu'on pense être vrai]

Déconstruction:
→ Pourquoi? [Raison 1]
  → Pourquoi? [Raison plus profonde]
    → Pourquoi? [Axiome fondamental]

Axiomes identifiés:
1. [Vérité fondamentale 1]
2. [Vérité fondamentale 2]

Reconstruction:
"Si on part uniquement de ces axiomes, quelle solution émerge?"
→ [Nouvelle approche, potentiellement différente de l'approche actuelle]
```

---

## Framework Combinations

Les frameworks se combinent naturellement :

| Combinaison | Cas d'usage |
|------------|------------|
| **DecomP + CoT** | Tâche multi-étapes techniques |
| **ToT + MECE** | Décision architecturale complexe |
| **First Principles + ToT** | Repenser un système entier |
| **PS + CoL** | Debug d'un système complexe |
| **DecomP + ToT** | Tâche très complexe avec sous-tâches ayant chacune plusieurs approches |
