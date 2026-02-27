# Module 02 — FRONTEND

> **Objectif** : Maîtriser l'écosystème React/TypeScript comme un senior.
> Pas coder comme un senior — **parler** comme un senior.

> **🔬 Clinical Engine** = SPA Vite simple, composants métier | **📱 MyMonka** = Potentiellement Next.js, mobile-first, SSR pour les pages publiques

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **React hooks & lifecycle** (§2.1) — Le modèle mental de React
> 2. **TypeScript basics** (§2.2) — Pourquoi le typage est crucial
> 3. **CSR vs SSR** (§2.5) — Justifier le choix Vite/SPA
> 4. **Component Architecture** (§2.4) — Comment on structure les composants

---

## 2.1 — React en profondeur

### Le modèle mental de React

React repose sur une idée simple : **UI = f(state)**. L'interface est une *fonction* de l'état des données.

```
State (données) → React → UI (ce que l'utilisateur voit)
```

Quand le state change → React recalcule l'UI → met à jour UNIQUEMENT ce qui a changé.

### Virtual DOM

Le **DOM** (Document Object Model) est la représentation du HTML dans le navigateur. Le manipuler directement est **lent**.

React utilise un **Virtual DOM** (copie en mémoire) :
1. Le state change → React crée un nouveau Virtual DOM
2. React compare l'ancien et le nouveau (algorithme de **diffing**)
3. React ne met à jour que les éléments qui ont réellement changé dans le vrai DOM

**Analogie** : Au lieu de repeindre tout le mur, React utilise un calque transparent pour identifier les zones à repeindre. Résultat : des mises à jour ultra-rapides.

### Les Hooks essentiels

Les **hooks** sont des fonctions qui permettent d'utiliser les features de React dans des composants fonctionnels.

| Hook | Rôle | Analogie |
|------|------|----------|
| `useState` | Stocker des données qui changent | Un post-it qui se met à jour |
| `useEffect` | Exécuter du code quand quelque chose change | "Quand [X] change, fais [Y]" |
| `useCallback` | Mémoriser une fonction | Recycler une recette au lieu d'en réécrire une à chaque fois |
| `useMemo` | Mémoriser un résultat de calcul | Cacher la réponse d'un calcul lourd |
| `useRef` | Accéder directement à un élément DOM | Pointer du doigt un élément spécifique |
| `useContext` | Partager des données sans props drilling | Un tableau d'affichage pour tous les composants |

### Le cycle de vie d'un composant

```
Mount (création) → Update (mise à jour) → Unmount (destruction)
   useEffect(fn, [])    useEffect(fn, [dep])    useEffect(() => { return cleanup })
```

- **Mount** : Le composant apparaît à l'écran (fetch données, init)
- **Update** : Le state ou les props changent (recalcul, re-render)
- **Unmount** : Le composant disparaît (nettoyage, cancel subscriptions)

---

## 2.2 — TypeScript essentiel

### Pourquoi TypeScript ?

JavaScript, c'est du freestyle : tu peux mettre n'importe quoi n'importe où. C'est flexible mais **dangereux** en production.

```javascript
// JavaScript — aucune protection
function calculateScore(patient) {
  return patient.age * patient.score; // Et si patient.age est "vingt-cinq" ?
}
```

```typescript
// TypeScript — le compilateur protège
function calculateScore(patient: { age: number; score: number }): number {
  return patient.age * patient.score; // Si age n'est pas un number → ERREUR au build
}
```

**TypeScript attrape les bugs AVANT le runtime.** Sur un projet santé comme Monka, c'est non-négociable.

### Les concepts clés

| Concept | Définition | Exemple |
|---------|-----------|---------|
| **Type** | Annotation de variable | `let age: number = 75` |
| **Interface** | Forme d'un objet | `interface Patient { id: string; nom: string }` |
| **Generic** | Type paramétrable | `Array<Patient>`, `Promise<Score>` |
| **Union Type** | Plusieurs types possibles | `type Status = 'CRITICAL' \| 'HIGH' \| 'STANDARD'` |
| **Type Guard** | Vérification de type au runtime | `if (typeof x === 'string')` |
| **Utility Types** | Types utilitaires intégrés | `Partial<Patient>`, `Omit<Patient, 'id'>` |

### TypeScript strict

On utilise TypeScript en mode **strict** (`"strict": true` dans tsconfig.json). Ça active toutes les vérifications :
- `noImplicitAny` → Pas de `any` implicite
- `strictNullChecks` → Les valeurs `null`/`undefined` doivent être gérées
- `noUnusedLocals` → Pas de variables inutilisées

**Ce que le CTO aime entendre** : *"On est en strict mode. Tout est typé, y compris les réponses API grâce aux types auto-générés Supabase."*

---

## 2.3 — State Management

### Le problème
Dans une app React, les données (state) doivent être partagées entre composants. Comment ?

### Les solutions (du simple au complexe)

| Solution | Quand l'utiliser | Complexité |
|----------|-----------------|------------|
| `useState` | State local à un composant | ⭐ |
| **Props drilling** | Passer les données de parent à enfant | ⭐⭐ |
| `useContext` | Partager des données globalement (thème, auth) | ⭐⭐ |
| **Zustand** | State global complexe, simple d'utilisation | ⭐⭐⭐ |
| **Redux** | State global très complexe, grand projet | ⭐⭐⭐⭐⭐ |

**Props drilling** = Quand tu passes une prop à travers 5 niveaux de composants juste pour qu'elle arrive au bon endroit. C'est un code smell (signe de mauvaise architecture).

**Solution** : `useContext` ou Zustand pour les données globales (utilisateur connecté, thème, résultats cliniques).

---

## 2.4 — Component Architecture

### Atomic Design

Organiser les composants en niveaux de complexité :

```
Atoms       → Bouton, Input, Label (briques de base)
Molecules   → SearchBar (Input + Bouton), FormField (Label + Input)
Organisms   → Header (Logo + Nav + SearchBar), PatientForm (plusieurs FormFields)
Templates   → Layout de page (Sidebar + Content + Footer)
Pages       → Page complète assemblée
```

### Composition vs Inheritance

React favorise la **composition** (assembler des petits composants) plutôt que l'**héritage** (une classe qui hérite d'une autre).

```tsx
// ✅ Composition — on assemble des composants
<Card>
  <CardHeader title="Score de vulnérabilité" />
  <CardBody>
    <ScoreChart score={3.5} />
    <RecommendationList items={recos} />
  </CardBody>
</Card>
```

### Props : les données qui descendent

Les props sont **read-only**. Un composant enfant ne peut PAS modifier les props qu'il reçoit. Si l'enfant a besoin de modifier quelque chose, il appelle une **callback** passée en props par le parent.

```tsx
// Le parent gère le state, l'enfant affiche et notifie
function Parent() {
  const [score, setScore] = useState(0);
  return <ScoreDisplay value={score} onChange={setScore} />;
}
```

---

## 2.5 — Rendering Strategies (CSR vs SSR vs SSG)

### Le comparatif

| | CSR (Client-Side) | SSR (Server-Side) | SSG (Static) |
|---|-------------------|-------------------|--------------|
| **Où le HTML est généré** | Dans le navigateur | Sur le serveur à chaque requête | Au moment du build |
| **Premier affichage** | Plus lent (JS à charger) | Plus rapide (HTML prêt) | Le plus rapide (pré-généré) |
| **SEO** | ❌ Mauvais | ✅ Bon | ✅ Excellent |
| **Interactivité** | ✅ Excellente | ✅ Bonne | ⚠️ Limitée |
| **Cas d'usage** | Apps métier (dashboard, SaaS) | E-commerce, réseaux sociaux | Blogs, docs, landing pages |
| **Outils** | Vite, CRA | Next.js, Remix | Astro, Hugo |

### Pourquoi le Clinical Engine est un CSR (SPA)

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : CSR/SPA = le bon choix. Tout est derrière un login, pas de SEO.
> - 📱 **MyMonka** : Architecture hybride probable. Les pages publiques (accueil, FAQ, ressources aidants) en SSR/SSG pour le SEO. Le dashboard connecté en CSR pour l'interactivité. Next.js permet ce mix.

1. **App métier derrière un login** → Pas de SEO nécessaire
2. **Forte interactivité** → Le questionnaire clinique nécessite du temps réel
3. **Simplicité** → Pas de serveur Node.js à gérer
4. **Supabase fait le backend** → Pas besoin d'un serveur personnalisé

### Hydration (pour la culture)

Quand on fait du SSR, le serveur envoie du HTML statique. Le navigateur doit ensuite "activer" le JavaScript pour rendre la page interactive. Ce processus s'appelle **hydration**. C'est parfois source de bugs (mismatch entre le HTML serveur et le client).

---

## 2.6 — Routing & Navigation

### Comment ça marche dans une SPA

Dans une SPA (comme Monka), il n'y a qu'une seule page HTML. Le **router** (React Router) simule la navigation en changeant l'URL et en affichant le bon composant.

```tsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/simulator" element={<Simulator />} />
  <Route path="/patients/:id" element={<PatientDetail />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Route Guards

Protéger certaines pages (ex : seuls les utilisateurs connectés accèdent au simulateur) :

```tsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}

<Route path="/simulator" element={
  <ProtectedRoute><Simulator /></ProtectedRoute>
} />
```

### Lazy Loading de routes

Charger les pages uniquement quand l'utilisateur y accède (performance) :

```tsx
const Simulator = lazy(() => import('./pages/Simulator'));
```

---

## 2.7 — Forms & Validation

### Controlled vs Uncontrolled

- **Controlled** : React gère la valeur de l'input (`value={state}` + `onChange`). Recommandé.
- **Uncontrolled** : Le DOM gère la valeur, React la lit via `useRef`. Plus rare.

### Validation

Pour un projet santé, la validation des inputs est **critique**. Exemple avec Zod :

```typescript
import { z } from 'zod';

const patientSchema = z.object({
  nom: z.string().min(1, "Le nom est obligatoire"),
  age: z.number().min(0).max(130, "Âge invalide"),
  email: z.string().email("Email invalide").optional(),
});

// Validation
const result = patientSchema.safeParse(inputData);
if (!result.success) {
  // Afficher les erreurs
}
```

---

## 2.8 — Build Tools (Vite)

### Que fait Vite ?

1. **En développement** : Sert les fichiers directement (ESM natif), HMR ultra-rapide
2. **En production** : Bundle le code (via Rollup), optimise, minifie, tree-shake

### Pourquoi Vite et pas Webpack ?

| | Webpack | Vite |
|---|---------|------|
| **Démarrage dev** | Lent (re-bundle tout) | Instantané (ESM natif) |
| **HMR** | Secondes | Millisecondes |
| **Config** | Complexe | Simple par défaut |
| **Maturité** | 10+ ans, énorme écosystème | Plus récent, montée rapide |

**Ce que le CTO aime entendre** : *"Vite nous donne un feedback de développement quasi-instantané. En vibecoding, la boucle de feedback rapide est critique — on teste les changements en millisecondes."*

---

> 💡 **Takeaway** : En frontend, le CTO vérifie que tu comprends POURQUOI on fait les choses, pas que tu sais coder chaque détail. "Pourquoi React ?", "Pourquoi TypeScript strict ?", "Pourquoi SPA ?" — ce sont les questions à préparer.
