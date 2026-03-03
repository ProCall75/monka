# Quality Check — Après BLOC 1

**Date** : 2026-02-27 22:50  
**Bloc complété** : BLOC 1 — Fix Multi-Select  
**Prochain bloc** : BLOC 2 — Tests Unitaires Multi-Select

---

## Fichiers modifiés (17 fichiers)

### 1. Fichiers principaux (4)

#### `QuestionsSidebar.tsx` — L16-17, L97-98, L107, L142-144, L150, L183-200
- **Ce qui a changé** : Type `Record<string, string | string[]>`, click handler multi-select avec toggle array, highlight via `Array.includes()`, `isAnswered` gère les arrays, `groupAnswered` compte les arrays non-vides
- **Pourquoi pertinent** : C'est le cœur du bug — l'UI ne supportait qu'une seule sélection. Le handler vérifie `q.response_type === 'choix_multiple'` pour décider du comportement toggle vs replace. Backward compatible avec les choix uniques.
- **Code clé** :
```tsx
if (q.response_type === 'choix_multiple') {
    const current = Array.isArray(next[q.id]) ? (next[q.id] as string[]) : []
    if (current.includes(opt)) {
        const filtered = current.filter(o => o !== opt)
        if (filtered.length === 0) delete next[q.id]
        else next[q.id] = filtered
    } else {
        next[q.id] = [...current, opt]
    }
} else {
    if (next[q.id] === opt) delete next[q.id]
    else next[q.id] = opt
}
```

#### `SimulatorPage.tsx` — L66, L71, L78-98, L137-139
- **Ce qui a changé** : State `answers` et `originalAnswers` typés `Record<string, string | string[]>`. Persona loading parse les pipe-delimited `"A|B"` → `["A", "B"]` pour les `choix_multiple`. Scoring map lookup itère les arrays.
- **Pourquoi pertinent** : Le parsing au chargement assure la compatibilité avec les données existantes en base (pipe-delimited). Le scoring gère array → somme des scores individuels.
- **Code clé** :
```tsx
converted[qId] = multiSelectIds.has(qId) && val.includes('|')
    ? val.split('|').map(s => s.trim())
    : val
```

#### `helpers.ts` — L138, L148, L157, L168
- **Ce qui a changé** : `getActiveAidanceBlocks()`, `getActiveQuestions()`, `getActiveQuestionCount()` acceptent `Record<string, string | string[]>`. N3 parsing utilise `Array.isArray()` au lieu de pipe split uniquement.
- **Pourquoi pertinent** : Le modèle additif (N3 → blocs d'aidance) est critique pour le filtrage dynamique des questions. Supporte maintenant nativement les arrays.

#### `ProfileRecap.tsx` — L12, L31-40
- **Ce qui a changé** : Type aligné, affichage `Array.isArray(answer) ? answer.join(', ') : answer`, filter vérifie `a.length > 0` pour arrays.
- **Pourquoi pertinent** : Affichage correct du profil aidant avec réponses multiples.

### 2. Type partagé (1)
- **`types.ts`** L50 : `answers: Record<string, string | string[]>` dans `SimulatorTabProps`

### 3. Composants enfants (8)
- `ClinicalChain.tsx` L11 | `CRMedecinDocument.tsx` L25 | `CRSections.tsx` L27 | `MPDetailView.tsx` L17 | `MPRecosView.tsx` L18 | `ScoreBreakdown.tsx` L13,L33-57 | `SimulatorMPTab.tsx` L77 | `SimulatorRulesTab.tsx` L116

### 4. Composants scoring/diff (3)
- **`WhatIfDiff.tsx`** L19-20, L36-48, L61-72 : Comparaison arrays via stringify, scoring lookup via iteration
- **`ScoreBreakdown.tsx`** L33-57 : `currentScore` calculé via loop array, `displayAnswer` join
- **`RuleExplainerFR.tsx`** L23 : Type aligné

---

## Vérifications passées

- [x] Build TypeScript clean (`npx tsc --noEmit` → 0 erreurs)
- [x] Build production OK (`npm run build` ✓ 36.33s)
- [x] Pas de nouvelle dette introduite
- [x] Pas de credential ou `any` ajoutés
- [x] Fichiers modifiés < 300 lignes (sauf SimulatorPage 474L — dette pré-existante)

---

## Réflexion Continue — Axes d'amélioration détectés

1. **SimulatorPage.tsx = 474 lignes** : Dépasse le seuil PRAGMA de 300L. Extraction du scoring logic dans un hook `useScoring()` serait bénéfique. → **Dette documentée, pas nouvelle.**
2. **Persona answers en pipe-delimited** : Le parsing client-side fonctionne mais idéalement les `persona_answers.answer` devraient stocker du JSON `["A","B"]`. → **Post-livraison, nécessite migration DB.**
3. **QUESTION_SCORE_CAP hardcodé dans clinicalEngine.ts** : E19/O16 cappés à 1 point, devrait être en DB. → **Post-livraison.**
4. **Pas de tests unitaires encore** : Le BLOC 2 les ajoutera. Actuellement le scoring multi-select n'est vérifié que par le build.

---

## Sécurité — Scan post-modification

- [x] Pas de `dangerouslySetInnerHTML` introduit
- [x] Pas de Supabase write côté client
- [x] Types stricts maintenus (`string | string[]`, pas de `any`)
- [x] Aucune régression sécurité
- [x] 0 credentials dans le code

---

## Verdict
- [x] ✅ Peut procéder au BLOC 2
