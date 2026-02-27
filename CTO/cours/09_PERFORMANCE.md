# Module 09 — PERFORMANCE

> **Objectif** : Optimiser l'app pour qu'elle vole. Comprendre les métriques et les leviers.

> **🔬 Clinical Engine** = Performance non critique (50 users), optimisation basique | **📱 MyMonka** = Performance critique (100K users), CDN, caching Redis, load testing obligatoire

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **Core Web Vitals** (§9.1) — Les 3 métriques que Google mesure
> 2. **Lazy loading & code splitting** (§9.2) — Les gains les plus simples à obtenir
> 3. **N+1 queries** (§9.3) — Le piège classique côté backend

---

## 9.1 — Core Web Vitals

Les 3 métriques de Google pour mesurer l'expérience utilisateur :

| Métrique | Nom complet | Mesure quoi | Seuil "bon" |
|----------|------------|-------------|-------------|
| **LCP** | Largest Contentful Paint | Temps pour afficher le plus gros élément visible | < 2.5s |
| **INP** | Interaction to Next Paint | Réactivité aux clics/taps (remplace FID) | < 200ms |
| **CLS** | Cumulative Layout Shift | Est-ce que la page "saute" visuellement | < 0.1 |

### Comment les mesurer

- **Lighthouse** (Chrome DevTools → Audit) → Score sur 100
- **PageSpeed Insights** (web.dev/measure) → Données réelles
- **Vercel Analytics** → Monitoring continu des Web Vitals

### Optimiser le LCP

| Problème | Solution |
|---------|---------|
| Images lourdes | Formats modernes (WebP, AVIF), lazy loading |
| JS trop lourd | Code splitting, tree-shaking |
| Serveur lent | CDN, caching |
| CSS bloquant | Critical CSS inline |

---

## 9.2 — Frontend Optimization

### Code Splitting

Au lieu de charger tout le JavaScript d'un coup, on le découpe en morceaux chargés à la demande :

```tsx
// Sans code splitting — tout est chargé au démarrage
import Simulator from './pages/Simulator';
import Admin from './pages/Admin';
import Reports from './pages/Reports';

// Avec code splitting — chaque page est chargée quand on y accède
const Simulator = lazy(() => import('./pages/Simulator'));
const Admin = lazy(() => import('./pages/Admin'));
const Reports = lazy(() => import('./pages/Reports'));
```

**Impact** : Si un utilisateur ne visite jamais la page Admin, il ne télécharge jamais son code.

### Memoization (React.memo, useMemo, useCallback)

Éviter de recalculer / re-render ce qui n'a pas changé :

```tsx
// Sans memo — le composant re-render à chaque render du parent
function PatientCard({ patient }) { ... }

// Avec memo — ne re-render que si patient change
const PatientCard = React.memo(function PatientCard({ patient }) { ... });
```

**useMemo** : Mettre en cache un résultat de calcul lourd
```tsx
const sortedPatients = useMemo(
  () => patients.sort((a, b) => b.score - a.score),
  [patients] // Recalculer seulement si patients change
);
```

### Règle d'or
> Ne pas optimiser prématurément. Mesurer d'abord (Lighthouse), optimiser ensuite. L'ennemi c'est le **premature optimization** — Donald Knuth.

---

## 9.3 — Backend Optimization

### Le problème N+1

Le piège de performance le plus courant :

```
❌ N+1 requêtes (mauvais)
1 requête : "Donne-moi tous les patients" → 100 patients
100 requêtes : "Donne-moi les scores du patient 1", "...patient 2", ... "...patient 100"
Total : 101 requêtes 💀

✅ 2 requêtes (bon)
1 requête : "Donne-moi tous les patients"
1 requête : "Donne-moi tous les scores de ces 100 patients" (avec un IN clause)
Total : 2 requêtes ✅
```

Avec **Supabase**, on résout ça avec les **relations dans le select** :
```typescript
const { data } = await supabase
  .from('patients')
  .select('*, scores(*)'); // Joint automatiquement en une seule requête
```

### Connection Pooling

PostgreSQL a un nombre limité de connexions simultanées. Si chaque requête ouvre une nouvelle connexion → saturation.

**Connection Pool** : Un ensemble de connexions pré-ouvertes et réutilisées. Supabase utilise **PgBouncer** pour ça.

### Caching

| Niveau | Quoi | Durée | Outil |
|--------|------|-------|-------|
| **Browser** | Fichiers statiques (JS, CSS, images) | Jours/semaines | Headers Cache-Control |
| **CDN** | Pages / assets | Minutes/heures | Vercel CDN |
| **API** | Réponses de requêtes | Secondes/minutes | stale-while-revalidate |
| **DB** | Résultats de requêtes fréquentes | Variable | Materialized views |

---

## 9.4 — Bundle Size

### Pourquoi ça compte

Plus le bundle est gros, plus le temps de chargement initial est long (surtout sur mobile/3G).

### Comment réduire

| Technique | Gain |
|-----------|------|
| **Tree-shaking** | Supprime le code mort automatiquement (Vite fait ça) |
| **Dynamic imports** | Charge les modules à la demande |
| **Analyse du bundle** | `npx vite-bundle-visualizer` → voir ce qui prend de la place |
| **Alternatives légères** | Remplacer les grosses librairies (moment.js → date-fns) |

---

## 9.5 — Scalabilité

### Vertical vs Horizontal

| Type | Méthode | Limite | Coût |
|------|---------|--------|------|
| **Vertical** | Machine plus puissante | Plafond physique | Linéaire |
| **Horizontal** | Plus de machines | Quasi illimité | Plus complexe |

### L'architecture Monka scale nativement

```
Front (Vercel CDN) → Scale infini (fichiers statiques distribués)
API (Supabase)     → Scale vertical (upgrade plan) + read replicas
DB (PostgreSQL)    → Scale vertical + partitioning si nécessaire
Edge Functions     → Scale horizontal (serverless, auto-scale)
```

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Aucun enjeu de scalabilité. 50 users, on ne touche même pas les limites du free tier Supabase.
> - 📱 **MyMonka** : Scalabilité = enjeu #1. 100K aidants simultanés nécessite : PgBouncer (connection pooling), read replicas, cache Redis pour les référentiels, CDN avec invalidation fine, horizontal scaling des Edge Functions, et potentiellement du sharding DB à terme.

---

## 9.6 — Profiling

### Les outils

| Outil | Mesure quoi |
|-------|------------|
| **Chrome DevTools → Performance** | Temps de chargement, rendering, scripting |
| **React DevTools → Profiler** | Re-renders inutiles, composants lents |
| **Lighthouse** | Score de performance global |
| **Supabase Dashboard** | Requêtes SQL lentes |
| **`EXPLAIN ANALYZE`** | Plan d'exécution d'une requête SQL |

### Le workflow d'optimisation

```
1. Mesurer → Lighthouse / DevTools / Supabase Dashboard
2. Identifier → Quel est le bottleneck ? (JS? Réseau? DB?)
3. Optimiser → Appliquer la technique adaptée
4. Mesurer à nouveau → Vérifier l'amélioration
5. Ne pas toucher au reste → Si c'est pas cassé, ne le répare pas
```

---

> 💡 **Takeaway** : La performance, c'est de la data. On mesure, on identifie le goulot d'étranglement, on optimise CE point, et on re-mesure. Pas d'optimisation au feeling.
