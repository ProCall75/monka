# 📊 Walkthrough — BLOC 1 : Fix Multi-Select

**Date** : 2026-02-27 22:50  
**Projet** : Monka Clinical Engine — Simulateur Clinique  
**Auteur** : Agent IA × Antonin (PRAGMA)  
**Destinataire** : CTO Monka — Rapport d'itération qualité prestige  
**Niveau** : Senior Dev / CISO / Anthropic-grade  

---

## 🎯 Objectif du bloc

Corriger le bug critique remonté par le client : **les questions à choix multiples (`choix_multiple`) ne permettaient qu'une seule sélection dans l'interface**. Le moteur clinique (`clinicalEngine.ts`) supportait déjà nativement les `string[]`, mais l'UI et les helpers forçaient un type `Record<string, string>`, écrasant chaque sélection par la suivante.

**Impact** : 29 questions sur 157 sont de type `choix_multiple`. Sans ce fix, le scoring et l'activation des Micro-Parcours étaient incorrects pour ces questions.

---

## 📐 Décisions d'architecture

### Choix effectués

| # | Décision | Alternatives considérées | Raison du choix |
|---|---|---|---|
| 1 | **Type natif `string[]`** pour les multi-select | Alt A : pipe-delimited `"A\|B\|C"` partout | Le moteur supporte déjà `string[]` nativement. Pipe = dette technique inutile, fragile si une option contient `\|` |
| 2 | **Toggle array dans le click handler** | Alt A : checkbox HTML natif | Cohérence UI avec le pattern existant (cartes cliquables), pas de refonte visuelle |
| 3 | **Parsing pipe→array au chargement persona** | Alt A : migration DB | Migration DB = risque + downtime. Parsing client = backward compatible, zero data loss |
| 4 | **Scoring = somme des scores individuels** | Alt A : score max des sélections | Cliniquement correct : chaque facteur de risque sélectionné ajoute au score de vulnérabilité |

### Concepts CTO appliqués

#### 📖 Union Type — `CTO/cours/02_FRONTEND.md` § 2.2

**Définition cours :**  
> **Union Type** : Plusieurs types possibles. `type Status = 'CRITICAL' | 'HIGH' | 'STANDARD'`

**Application dans ce bloc :**  
Le type `answers` est passé de `Record<string, string>` à `Record<string, string | string[]>`. C'est un **Union Type** appliqué aux valeurs du Record : chaque réponse peut être soit une chaîne simple (choix unique), soit un tableau de chaînes (choix multiple). TypeScript force ensuite la vérification à chaque usage avec `Array.isArray()` (Type Guard).

**Exemple de code :**
```tsx
// Type Guard — CTO/cours/02_FRONTEND.md § 2.2
if (Array.isArray(answer)) {
    for (const a of answer) {
        score += scoringMap[qId][a] || 0  // Somme chaque sélection
    }
} else {
    score = scoringMap[qId][answer] || 0  // Single select
}
```

**Zone d'ombre :** Aucune — le concept Union Type est parfaitement maîtrisé et appliqué. Le Type Guard `Array.isArray()` est la méthode recommandée par la doc TypeScript.

---

#### 📖 State Management — `CTO/cours/02_FRONTEND.md` § 2.3

**Définition cours :**  
> **State** : Les données qui changent au cours de la vie de l'app. `UI = f(state)` — quand le state change, React recalcule l'UI.  
> **Props** : Read-only, descendent du parent à l'enfant. Modification via callback.

**Application dans ce bloc :**  
L'état `answers` est géré dans `SimulatorPage.tsx` via `useState<Record<string, string | string[]>>` et passé en **props** à 12 composants enfants. Le click handler dans `QuestionsSidebar.tsx` reçoit un callback `onAnswer` du parent — il ne modifie jamais les props directement. Le handler utilise une copie spread `{ ...prev }` pour l'immutabilité.

**Exemple de code :**
```tsx
// SimulatorPage.tsx — State lifting (§2.3)
const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

// QuestionsSidebar.tsx — Callback pattern (enfant → parent)
onClick={() => {
    const next = { ...answers }  // Immutable spread
    if (q.response_type === 'choix_multiple') {
        const current = Array.isArray(next[q.id]) ? (next[q.id] as string[]) : []
        next[q.id] = current.includes(opt) 
            ? current.filter(o => o !== opt)  // Toggle off
            : [...current, opt]               // Toggle on
    } else {
        next[q.id] = opt  // Single select replace
    }
    onAnswer(next)  // Callback to parent
}}
```

**Zone d'ombre :** Le cours mentionne que le **props drilling** (passer des props à travers 5+ niveaux) est un code smell. Ici, `answers` traverse SimulatorPage → SimulatorContent → {8 composants enfants}. C'est 2-3 niveaux, acceptable. Mais si l'app grandit, un `useContext` ou Zustand devrait être envisagé pour `answers`.

---

#### 📖 TypeScript Strict — `CTO/cours/02_FRONTEND.md` § 2.2

**Définition cours :**  
> TypeScript en mode strict active `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`. **TypeScript attrape les bugs AVANT le runtime.** Sur un projet santé, c'est non-négociable.

**Application dans ce bloc :**  
Après modification des 17 fichiers, `npx tsc --noEmit` passe avec **0 erreurs**. Le mode strict a détecté les incompatibilités dès le premier build : `Record<string, string | string[]>` ne peut pas être assigné à `Record<string, string>`. Chaque composant enfant a dû être aligné — le compilateur a empêché toute régression silencieuse.

**Zone d'ombre :** Le cours dit *"Tout est typé, y compris les réponses API grâce aux types auto-générés Supabase."* Or, les types Supabase auto-générés (`Database['public']['Tables']`) définissent `persona_answers.answer` comme `string`, pas `string | string[]`. Le parsing pipe→array se fait côté client. Pour une V2, il faudrait migrer le champ DB vers un type `jsonb` pour que les types auto-générés reflètent la réalité.

---

#### 📖 XSS & React Protection — `CTO/cours/06_SECURITE.md` § 6.1

**Définition cours :**  
> **XSS (A03)** : Quand un attaquant injecte du JavaScript dans une page. React échappe automatiquement le HTML dans le JSX → protégé nativement. Le vrai danger = `dangerouslySetInnerHTML`.

**Application dans ce bloc :**  
Les réponses multi-select sont affichées via `{answer.join(', ')}` dans ProfileRecap et WhatIfDiff — du **texte pur** rendu par React JSX. Pas de `dangerouslySetInnerHTML`, pas d'`innerHTML`. Les réponses viennent de la DB (données contrôlées, pas d'input utilisateur libre). Risque XSS = **nul**.

---

#### 📖 RLS & Broken Access Control — `CTO/cours/06_SECURITE.md` § 6.1, § 6.4

**Définition cours :**  
> **Broken Access Control (A01)** est le plus critique. RLS (Row Level Security) garantit l'isolation des données même si l'API est compromise. *"La sécurité est dans la DB, pas dans l'app."*

**Application dans ce bloc :**  
Les 18 tables ont des policies RLS `SELECT-only` via la `publishable key`. Le fix multi-select est **purement UI/frontend** — aucune query Supabase n'a été modifiée, aucun `INSERT`/`UPDATE` n'a été ajouté. L'architecture de sécurité reste intacte.

---

#### 📖 Convention de nommage — `CTO/cours/08_CODE_QUALITY.md` § 8.7

**Définition cours :**  
> PascalCase pour composants (`PatientCard.tsx`), camelCase pour fonctions (`calculateVulnerability()`), UPPER_SNAKE pour constantes (`MAX_SCORE`).

**Application dans ce bloc :**  
Toutes les modifications respectent les conventions : `QuestionsSidebar` (PascalCase), `getActiveAidanceBlocks` (camelCase), `isAnswered` (préfixe `is` pour booléen), `displayAnswer` (camelCase descriptif).

---

#### 📖 Dette technique consciente — `CTO/cours/08_CODE_QUALITY.md` § 8.5

**Définition cours :**  
> **Dette délibérée** : "On sait que c'est sale mais on shippe pour la deadline". **Gestion** : Identifier → Documenter → Prioriser → Budgéter → Mesurer.

**Application dans ce bloc :**  
Dettes identifiées et **documentées, pas oubliées** :

| Dette | Type | Urgence | Où c'est documenté |
|---|---|---|---|
| `SimulatorPage.tsx` = 474L (> 300L PRAGMA) | Accidentelle | Planifiée | plan.md, quality_check |
| Persona answers pipe-delimited | Délibérée | Post-livraison | plan.md |
| `QUESTION_SCORE_CAP` hardcodé | Délibérée | Post-livraison | plan.md |

---

## 🔧 Modifications — Détail technique

### `QuestionsSidebar.tsx` — Composant UI sidebar questionnaire

**Avant :**
```tsx
answers: Record<string, string>
// Click handler : simple replace
if (answers[q.id] === opt) delete next[q.id]
else next[q.id] = opt
// Highlight : direct comparison
isSelected={answers[q.id] === opt}
```

**Après :**
```tsx
answers: Record<string, string | string[]>
// Click handler : toggle array for choix_multiple
if (q.response_type === 'choix_multiple') {
    const current = Array.isArray(next[q.id]) ? (next[q.id] as string[]) : []
    if (current.includes(opt)) {
        const filtered = current.filter(o => o !== opt)
        if (filtered.length === 0) delete next[q.id]
        else next[q.id] = filtered
    } else { next[q.id] = [...current, opt] }
} else { /* single select inchangé */ }
// Highlight : Array.includes() check
isSelected={Array.isArray(answers[q.id]) 
    ? (answers[q.id] as string[]).includes(opt) 
    : answers[q.id] === opt}
```

**Explication en français simplifié :**  
Avant : quand tu cliquais sur une option dans une question à choix multiple, ça remplaçait la sélection précédente. Maintenant, ça ajoute l'option dans un tableau. Si tu recliques dessus, ça la retire du tableau (toggle). Visuellement, les options sélectionnées restent surlignées.

### `SimulatorPage.tsx` — Page principale simulateur

**Avant :** Persona loading via simple affectation `converted[qId] = val`  
**Après :** Parsing intelligent des pipe-delimited en arrays pour les `choix_multiple`  

```tsx
const multiSelectIds = new Set(
    data.questions.filter(q => q.response_type === 'choix_multiple').map(q => q.id)
)
converted[qId] = multiSelectIds.has(qId) && val.includes('|')
    ? val.split('|').map(s => s.trim())
    : val
```

**Explication :** En base, les réponses multiples sont stockées comme `"Option A|Option B"`. Au chargement d'un persona, on détecte si la question est `choix_multiple` et si la valeur contient `|`, et on transforme en `["Option A", "Option B"]`.

### `helpers.ts` — Fonctions helper du moteur

**Modification :** Types des 3 fonctions exportées + N3 parsing `Array.isArray()`  
**Explication :** Le filtre N3 (aidance blocks) vérifiait `answer.split('|')` — maintenant il utilise `Array.isArray()` pour les native arrays tout en restant compatible avec les strings.

### `WhatIfDiff.tsx` — Panneau What-If

**Modification :** Comparaison arrays via `JSON.stringify` proxy (stringify → compare), scoring lookup itère les arrays  
**Explication :** Le What-If compare les réponses originales aux réponses modifiées. Avant, comparer `"A" !== "A"` marchait. Maintenant, comparer `["A","B"] !== ["A","B"]` nécessite un stringify car les arrays sont des références différentes en JavaScript.

**Termes techniques utilisés :**

| Terme | Définition (GLOSSAIRE.md) | Contexte Monka |
|---|---|---|
| **State** | Données qui changent au cours de l'app | `answers` dans SimulatorPage |
| **Props** | Données passées parent → enfant, read-only | `answers` passé à 12 composants |
| **Component** | Morceau d'UI autonome et réutilisable | QuestionsSidebar, ProfileRecap, WhatIfDiff |
| **TypeScript** | JavaScript + types, compile-time safety | `string \| string[]` Union Type |
| **Hook** | Fonction React pour state/lifecycle | `useState`, `useMemo` |
| **Refactoring** | Modifier la structure sans changer le comportement | Ce fix = refactoring des types |
| **Virtual DOM** | Copie mémoire du DOM, diffing intelligent | React re-render seulement les options changées |
| **Build** | Transformation code source → app exécutable | Vite → bundle production 36.33s |
| **RLS** | Row Level Security — sécurité au niveau des lignes DB | 18/18 tables protégées, inchangé |

---

## 🔒 Cybersécurité — Analyse de surface d'attaque

### Vecteurs d'attaque évalués

| # | Vecteur | Status | Mitigation |
|---|---|---|---|
| 1 | XSS (injection HTML/JS) | ✅ Mitigé | React échappe le JSX nativement. Pas de `dangerouslySetInnerHTML`. Réponses = texte contrôlé DB |
| 2 | CSRF | N/A — read-only | Aucun `INSERT/UPDATE/DELETE` côté client |
| 3 | Data exposure | ✅ Mitigé | RLS SELECT-only 18/18 tables. Publishable key (pas de service_role) |
| 4 | Supply chain (npm) | ✅ Vérifié | 0 nouvelles dépendances ajoutées par ce bloc |
| 5 | Injection SQL | ✅ Mitigé | PostgREST = prepared statements. Pas de raw SQL côté client |
| 6 | Broken Access Control (A01) | ✅ Inchangé | RLS policies non modifiées |

### Référence OWASP appliquée
- 📖 `CTO/cours/06_SECURITE.md` § 6.1 — A01 (Broken Access Control), A03 (Injection/XSS)
- Ce bloc ne touche que le frontend React (rendering). **Aucune surface d'attaque nouvelle n'a été introduite.**

### Vérifications sécurité
- [x] Aucun `dangerouslySetInnerHTML` introduit
- [x] Aucun `eval()` ou `innerHTML`
- [x] Aucun `console.log` en production
- [x] Aucun credential/secret dans le code
- [x] Aucun `Supabase.from().insert/update/delete()` côté client
- [x] Types stricts maintenus (pas de `any`)
- [x] RLS inchangé (18/18 tables)

---

## 🧠 Intelligence & Réflexion

### Pourquoi cette implémentation est pertinente

**Scalabilité :** Le type `string | string[]` est extensible. Si demain on ajoute des questions à réponse ordonnée ou à seuils multiples, le type supporte déjà une collection. Pas de refacto nécessaire.

**Maintenabilité :** Le pattern `Array.isArray()` + type guard est le standard TypeScript. Un dev junior comprend immédiatement l'intention. Le code est auto-documenté par les types.

**Performance :** Impact nul. Le scoring itère un array de 2-5 éléments max (les options sélectionnées). `Array.includes()` sur 8-10 options = O(n) avec n ≤ 10. Pas de bottleneck.

**Déterminisme :** Même questions + mêmes réponses = même score. Le scoring additif (somme des scores individuels) est commutable et déterministe. L'ordre de sélection n'affecte pas le résultat.

### Trade-offs acceptés

| Trade-off | Gain | Coût | Justification |
|---|---|---|---|
| Parsing pipe→array côté client | Zero migration DB, backward compatible | Logique de parsing dans SimulatorPage | Acceptable : 1 seul point d'entrée, bien isolé |
| 17 fichiers modifiés (type propagation) | Typage strict garanti partout | Plus de fichiers touchés | Le compilateur TS a forcé l'exhaustivité — c'est un feature, pas un bug |
| SimulatorPage reste > 300L | Livrer le fix avant la démo | Dette technique documentée | Refacto planifié post-livraison |

### Apprentissages

| Concept appris/consolidé | Source cours | Niveau avant | Après |
|---|---|---|---|
| Union Type + Type Guard | `02_FRONTEND.md` § 2.2 | Théorique | **Solide** — appliqué sur 17 fichiers |
| State lifting + callback pattern | `02_FRONTEND.md` § 2.3-2.4 | Théorique | **Solide** — vu le flux parent→enfant |
| OWASP A01/A03 surface analysis | `06_SECURITE.md` § 6.1 | Vague | **Théorique** — sait identifier les vecteurs |
| TypeScript strict mode benefits | `02_FRONTEND.md` § 2.2 | Théorique | **Solide** — vu le compilateur forcer l'exhaustivité |
| Dette technique consciente | `08_CODE_QUALITY.md` § 8.5 | Théorique | **Solide** — appliqué (identifié + documenté + priorisé) |
| Conventional commits | `08_CODE_QUALITY.md` § 8.1 | Vague | **Théorique** — format `fix(simulator): ...` |
| Refactoring patterns | `08_CODE_QUALITY.md` § 8.6 | Vague | **Théorique** — identifié Extract Method pour scoring |

---

## 📊 Métriques

| Métrique | Valeur |
|---|---|
| Fichiers modifiés | **17** |
| Lignes ajoutées | ~+120 |
| Lignes supprimées | ~-40 |
| Erreurs TS avant | ~15 (cascade type mismatch) |
| Erreurs TS après | **0** |
| Build time | **36.33s** |
| Bundle size SimulatorPage | 98.63 KB (gzip 24.61 KB) |
| Bundle size total | 364.67 KB (gzip 118.55 KB) |

---

## ✅ Preuves de vérification

| Test | Résultat | Commande |
|---|---|---|
| TypeScript strict | ✅ 0 erreurs | `npx tsc --noEmit` |
| Build production | ✅ 36.33s, 0 erreurs | `npm run build` |
| Tests unitaires | N/A — BLOC 2 | — |
| npm audit | ✅ 0 nouvelles deps | Aucune dépendance ajoutée |
| Fichiers < 300L | ⚠️ SimulatorPage 474L | Dette pré-existante, documentée |

---

## 📝 Prochaines étapes

| # | Action | Bloc | Priorité |
|---|---|---|---|
| 1 | 3 tests unitaires multi-select scoring | BLOC 2 | 🔴 Critique |
| 2 | ErrorBoundary global React | BLOC 3 | 🟡 Moyen |
| 3 | README complet | BLOC 4 | 🟡 Moyen |
| 4 | API Documentation PRAGMA §13 | BLOC 4.5 | 🟡 Moyen |
| 5 | Build + Deploy Vercel + Commit | BLOC 5 | 🔴 Critique |

---

## 🔗 Références

| Document | Rôle |
|---|---|
| `FINISH/plan.md` V3 | Source de vérité |
| `FINISH/certifs/BLOC-1_quality_check.md` | Certification PRAGMA |
| `CTO/cours/02_FRONTEND.md` | Concepts React/TS/State appliqués |
| `CTO/cours/06_SECURITE.md` | Analyse OWASP/XSS/RLS |
| `CTO/cours/08_CODE_QUALITY.md` | Dette technique, naming, refactoring |
| `CTO/cours/GLOSSAIRE.md` | Termes techniques référencés |
| `FINISH/engine_explainer.md` | Doc moteur clinique |
| `pragma-starter-kit/framework/senior-dev-framework.md` | 28 sections framework |

---

*Walkthrough généré par le workflow /finish-sprint V3 — PRAGMA Quality Standard + CTO/cours integration.*
