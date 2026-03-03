# 🏗️ IMPLEMENTATION — Spec Technique d'Exécution

**Date** : 27 février 2026 — 22h10  
**Cohérence** : Ce document implémente `FINISH/plan.md` en intégrant les corrections de `anglesmorts.md` et `audit_db.md`  
**Workflow** : Chaque bloc s'exécute via `/finish-sprint` (relecture plan obligatoire)  
**Standard** : CTO Code Review Checklist 2025 (OWASP, Supabase, React, IBM DevOps)

---

## BLOC 1 — FIX MULTI-SELECT (4 fichiers)

### 1A. `QuestionsSidebar.tsx` — Click handler + highlight

**Avant** (L183-188) :
```tsx
onClick={() => setAnswers(prev => {
    const next = { ...prev }
    if (next[q.id] === opt) delete next[q.id]
    else next[q.id] = opt
    return next
})}
```

**Après** :
```tsx
onClick={() => setAnswers(prev => {
    const next = { ...prev }
    if (q.response_type === 'choix_multiple') {
        const current = Array.isArray(next[q.id]) ? next[q.id] as string[] : []
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
    return next
})}
```

**Highlight** (L189-190) :

**Avant** : `answers[q.id] === opt`  
**Après** :
```tsx
const isSelected = q.response_type === 'choix_multiple'
    ? (Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt))
    : answers[q.id] === opt
```

**Type change** (L16, L97, L143) :
```diff
-answers: Record<string, string>
-setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
+answers: Record<string, string | string[]>
+setAnswers: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>
```

**Ligne `isAnswered`** (L150) :
```diff
-const isAnswered = !!answers[q.id]
+const isAnswered = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]).length > 0 : !!answers[q.id]
```

---

### 1B. `SimulatorPage.tsx` — Type state

**Change** (L68 environ) :
```diff
-const [answers, setAnswers] = useState<Record<string, string>>({})
+const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
```

**Persona loading** (L79-87) — adapter le parsing pour pipe-delimited depuis la DB :
```tsx
try {
    const raw = sessionStorage.getItem('persona_answers')
    if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>
        // Convert pipe-delimited multi-select answers to arrays
        const converted: Record<string, string | string[]> = {}
        const multiSelectIds = new Set(
            data.questions.filter(q => q.response_type === 'choix_multiple').map(q => q.id)
        )
        for (const [qId, val] of Object.entries(parsed)) {
            converted[qId] = multiSelectIds.has(qId) && val.includes('|')
                ? val.split('|')
                : val
        }
        setAnswers(converted)
    }
    sessionStorage.removeItem('persona_answers')
} catch { /* ignore */ }
```

---

### 1C. `helpers.ts` — Type alignment + N3 fix

**Type changes** (L138, L157, L168) :
```diff
-export function getActiveAidanceBlocks(answers: Record<string, string>): Set<string> {
+export function getActiveAidanceBlocks(answers: Record<string, string | string[]>): Set<string> {
```

**N3 parsing** (L140-147) :
```diff
-    const n3Answer = answers['N3']
-    if (n3Answer) {
-        const n3Values = n3Answer.includes('|') ? n3Answer.split('|').map(s => s.trim()) : [n3Answer]
+    const n3Raw = answers['N3']
+    if (n3Raw) {
+        const n3Values = Array.isArray(n3Raw) ? n3Raw : [n3Raw]
```

---

### 1D. `ProfileRecap.tsx` — Affichage array

Adapter la ligne qui affiche `answers[q.id]` pour gérer les arrays :
```tsx
const displayAnswer = (answer: string | string[]) =>
    Array.isArray(answer) ? answer.join(', ') : answer
```

---

## BLOC 2 — TESTS UNITAIRES MULTI-SELECT

### Fichier : `clinicalEngine.test.ts`

Ajouter 3 tests :

```ts
// Test 1: evaluateCondition with string[] for 'eq'
test('evaluateCondition eq with array answer', () => {
    const cond = { q: 'Q1', op: 'eq' as const, val: 'Oui' }
    expect(evaluateCondition(cond, { Q1: ['Oui', 'Non'] })).toBe(true)
    expect(evaluateCondition(cond, { Q1: ['Non'] })).toBe(false)
})

// Test 2: evaluateCondition with string[] for 'count_gte'
test('evaluateCondition count_gte with array', () => {
    const cond = { q: 'Q1', op: 'count_gte' as const, val: 2 }
    expect(evaluateCondition(cond, { Q1: ['A', 'B'] })).toBe(true)
    expect(evaluateCondition(cond, { Q1: ['A'] })).toBe(false)
})

// Test 3: computeScore with array answer and QUESTION_SCORE_CAP
test('computeScore respects cap for multi-select', () => {
    // ... mock data with E19 scoring entries
})
```

---

## BLOC 3 — ERRORBOUNDARY GLOBAL

### Fichier : `components/ErrorBoundary.tsx` (NEW)

```tsx
import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false }
    static getDerivedStateFromError() { return { hasError: true } }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div className="text-center p-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Une erreur est survenue</h1>
                        <p className="text-gray-500 mb-4">Rechargez la page pour continuer.</p>
                        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-monka-primary text-white rounded-lg">
                            Recharger
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}
```

### `App.tsx` — Wrapping

```diff
+import { ErrorBoundary } from './components/ErrorBoundary'
 ...
-<BrowserRouter>
+<ErrorBoundary>
+<BrowserRouter>
     ...
-</BrowserRouter>
+</BrowserRouter>
+</ErrorBoundary>
```

---

## BLOC 4 — README

### Fichier : `APP/README.md` (NEW)

```markdown
# Monka Clinical Engine — Simulateur

Outil interne de visualisation et simulation du moteur clinique Monka.

## Stack
- **Frontend** : React 18 + TypeScript + Vite
- **Backend** : Supabase (PostgreSQL + RLS)
- **Deploy** : Vercel
- **UI** : Framer Motion + Lucide Icons

## Setup local
1. `npm install`
2. Copier `.env.example` → `.env.local` et renseigner les clés Supabase
3. `npm run dev`

## Architecture
```
src/
├── engine/          # Moteur clinique (scoring, activation, helpers)
├── clinical/        # Hooks cliniques (données, méta)
├── pages/           # Pages principales + simulator/
├── components/      # Composants UI réutilisables
├── lib/             # Client Supabase
└── styles/          # CSS global
```

## Variables d'environnement
| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé publique (publishable) |

## Déploiement
```bash
npm run build  # Build production
vercel deploy  # Deploy sur Vercel
```
```

---

## BLOC 5 — BUILD + DEPLOY + COMMIT

```bash
# 1. TypeScript check
cd APP && npx tsc --noEmit

# 2. Build production
npm run build

# 3. Security audit
npm audit

# 4. Tests
npm test

# 5. Deploy
vercel deploy --prod

# 6. Commit
git add -A
git commit -m "fix(simulator): multi-select support + ErrorBoundary + README + audit docs"
git push origin main
```

---

## BLOC 6 — RAPPORT FINAL

Créer `FINISH/rapport.md` avec :
1. Résumé des modifications (diff par fichier)
2. Preuves de build clean (output terminal)
3. Preuves de tests passants
4. Points documentés (dette identifiée)
5. Score sécurité final
6. Lien Vercel production

---

## ✅ COHERENCE CHECK — Ce qui a changé vs le plan original

| Aspect | Plan original | Après audit | Raison |
|---|---|---|---|
| Approche multi-select | Pipe-delimited `"A\|B"` | **`string[]` natif** | Le moteur le supporte déjà (clinicalEngine L39-40) |
| Nombre de fichiers | 3 | **4** (+ProfileRecap) | Affichage array cassé sinon |
| Tests | Aucun | **+3 tests unitaires** | Seules E19/O16 sont scorantes multi-select, il faut les couvrir |
| ErrorBoundary | Non prévu | **Ajouté** | Standard industrie CTO 2025 (React Error Boundaries) |
| README | Non prévu | **Ajouté** | Premier fichier qu'un CTO regarde |
| Persona loading | Non prévu | **Adapter le parsing** | DB stocke N3 en pipe-delimited, il faut convertir au load |
| Workflow | Pas de workflow | **`/finish-sprint` créé** | Force relecture du plan + Token Guard |

## ❌ CE QU'ON NE FAIT PAS CE SOIR (et pourquoi)

| Item | Pourquoi pas ce soir |
|---|---|
| Refactor SimulatorPage (463L → <300L) | Risque de régression, pas de tests E2E pour valider |
| Ajouter FK constraints en DB | Migration lourde, données intègres (0 orphelins prouvé) |
| Migrer QUESTION_SCORE_CAP en DB | Nécessite nouvelle colonne + migration + refactor scoring |
| Rendre l'app responsive mobile | Scope desktop confirmé, effort élevé |
| Remplir `cr_templates` | Données cliniques manquantes, le CR fonctionne via code |
| Harmoniser policies public→anon | Fonctionnel identique, optionnel |
| Cleanup backup table | Requiert accès admin, post-livraison |
