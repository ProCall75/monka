# 🔍 ANALYSE ANGLES MORTS — Multi-POV Review

**Date** : 27 février 2026 — 21h45  
**Méthode** : Scan profond du code source (73+ fichiers), croisement avec Senior Dev Framework v2.1    
**Règle** : Rien n'est modifié dans le plan tant que l'utilisateur n'a pas validé ce document.

---

## POV 1 — 🛡️ CHEF CYBERSÉCURITÉ (CISO)

### Angle Mort A1 : Les Supabase `public` policies sont trop larges

**Constat (analyse live DB)** : 7 tables sur 18 ont des policies `{public}` au lieu de `{anon}` :
- `content_blocks`, `cr_templates`, `micro_parcours`, `persona_answers`, `personas`, `question_mp_mapping`, `suivi_questions`

**Risque** : Le rôle `public` dans Supabase inclut **tous les rôles**, même `authenticated`. Fonctionnellement identique à `anon` dans un contexte sans auth, mais si un jour l'auth est ajoutée, ces policies seront trop permissives.

**Verdict** : ⚠️ Non-bloquant aujourd'hui (pas d'auth), mais c'est une **dette de sécurité latente**. Un CTO qui drill pourrait poser la question : *"Pourquoi certaines tables ont `public` et d'autres `anon` ?"*.

**Action suggérée** : Harmoniser toutes les policies sur le rôle `anon` pour la cohérence.

---

### Angle Mort A2 : `persona_answers` et `personas` ont des policies DUPLIQUÉES

**Constat** : Ces 2 tables ont à la fois `anon_read` ET `Allow read access to...` (public). Double policy SELECT = redondance.

**Risque** : Pas de risque fonctionnel (les deux autorisent SELECT), mais un CTO voit ça comme du **manque de rigueur** — on ne sait pas laquelle est la "vraie".

**Action suggérée** : Supprimer les doublons et ne garder qu'une policy par table.

---

### Angle Mort A3 : Le `vercel.json` CSP autorise `https:` pour les images

**Constat** : Dans le CSP actuel : `img-src 'self' data: https:`

**Risque** : `https:` est un wildcard — n'importe quel domaine HTTPS peut servir des images. Si un contenu externe est injecté (même involontairement), il chargera.

**Verdict** : ⚪ Acceptable pour un outil interne sans user input. Mais un vrai CISO resserrerait à `img-src 'self' data:` si aucune image externe n'est nécessaire.

---

## POV 2 — 🎯 CPO (Chief Product Officer)

### Angle Mort B1 : Le plan sous-estime l'impact du fix multi-select sur le scoring

**Constat critique** : Le `clinicalEngine.ts` **supporte déjà** `string[]` nativement :
- Ligne 39 : `type AnswerValue = string | string[]`
- Ligne 40 : `type Answers = Record<string, AnswerValue>`  
- Lignes 229-235 : `computeScore()` gère déjà `Array.isArray(answer)`
- Lignes 63-106 : `evaluateCondition()` gère déjà les tableaux pour tous les 9 opérateurs

**MAIS** : `helpers.ts` ligne 138 utilise `Record<string, string>` (pas `AnswerValue`), et `SimulatorPage.tsx` + `QuestionsSidebar.tsx` utilisent aussi `Record<string, string>`.

**Impact produit** : Le moteur clinique est **prêt**. C'est uniquement l'UI + les helpers qui sont en retard. Cela signifie que :
1. Le fix est **beaucoup plus simple** que prévu — pas besoin de pipe-delimited string
2. Il faut utiliser le type `Answers` natif de `clinicalEngine.ts` partout
3. Le scoring fonctionnera **immédiatement** après le fix UI

**Risque produit si on utilise pipe-delimited** : Incohérence entre le type du moteur (`string[]`) et le stockage UI (`"A|B"`) → regex/split fragile → bugs futurs.

**Action suggérée** : Abandonner l'approche pipe-delimited du plan. Utiliser `AnswerValue = string | string[]` du clinicalEngine partout. C'est le bon design.

---

### Angle Mort B2 : Pas de validation du fix sur les 8 personas existantes

**Constat** : Le plan prévoit de tester le multi-select, mais ne mentionne pas les personas C1, C2, C3 qui ont des réponses multi-aidance (N3 avec `|` dans `_patch_trigger_answers.mjs`).

**Risque** : Les personas complexes (C1=Perte autonomie+Psy, C2=Handicap+Psy, C3=Maladie chro+Addiction) sont les cas de test les plus importants. Si le fix casse le scoring de ces personas, c'est critique pour la démo CTO.

**Action suggérée** : Ajouter un test explicite : *"Charger persona C1, vérifier que le score et les MPs activés sont identiques avant/après le fix multi-select"*.

---

### Angle Mort B3 : `ProfileRecap.tsx` n'affiche pas les réponses multi-select correctement

**Constat** : `ProfileRecap.tsx` ligne 38 fait `answers[q.id]` — si la réponse est un `string[]`, l'affichage sera `[object Object]` ou `Option A,Option B` (JS array toString).

**Action suggérée** : Adapter `ProfileRecap` pour afficher les réponses array en liste à puces ou séparées par des virgules lisibles.

---

## POV 3 — 💼 CEO

### Angle Mort C1 : Le Vercel deployment est sur le team `pragmas-projects`

**Constat** : Le déploiement est sur `pragmas-projects-7ae645d3.vercel.app` — le team Vercel de PRAGMA, pas de Monka.

**Risque business** : Quand le contrat est signé et le livrable transféré, Monka n'a pas le contrôle du déploiement. Le CTO pourrait poser la question : *"C'est sur votre infra ou la nôtre ?"*.

**Verdict** : ⚪ Normal pour la phase de développement. Le transfert du projet Vercel (ou la migration vers l'infra Monka) fait partie de la livraison finale.

**Ce qu'il faut dire lundi** : *"Pendant la phase de développement, l'app est hébergée sur notre compte Vercel. À la livraison, on transfère le projet sur votre équipe ou on vous donne les accès."*

---

### Angle Mort C2 : Pas de README dans `APP/`

**Constat** : Pas de `APP/README.md` documentant le setup, les commandes, et l'architecture. Le framework §19 exige un README complet.

**Risque** : Un CTO technique va chercher le README en premier. Son absence = signal amateur.

**Action suggérée** : Créer un `APP/README.md` clair et court (Setup, Stack, Architecture, Env vars, Deploy).

---

### Angle Mort C3 : Le repo contient des fichiers périphériques (ADELE, CTO/cours, LIVRABLES)

**Constat** : Le même repo Git contient `APP/`, `KERNEL/`, `ADELE/`, `CTO/cours/`, `LIVRABLES/Commercial/`.

**Verdict** : ⏸️ **DÉFÉRÉ** — L'utilisateur dupliquera les fichiers nécessaires dans un repo séparé dédié au partage. Pour le moment, seul le lien Vercel est partagé (pas le GitHub). Pas d'action ce soir.

---

## POV 4 — 🧑‍💻 CTO (Technical)

### Angle Mort D1 : 3 fichiers dépassent la limite de 300 lignes du framework

| Fichier | Lignes | Limite |
|---|---|---|
| `SimulatorPage.tsx` | **463** | 300 |
| `RoadmapPage.tsx` | **323** | 300 |
| `clinicalEngine.ts` | **319** | 300 |

**Risque** : Si le CTO regarde l'arborescence et check les tailles, il verra que votre propre framework n'est pas respecté à 100%. Pas grave sur 3 fichiers, mais le CTO posera la question.

**Verdict** : ⚠️ `SimulatorPage.tsx` (463 lignes) est le plus critique. Il mérite un découpage.

**Action suggérée** : Les 3 fichiers sont proches de la limite ou justifiables (le moteur clinique est un monolithe logique). Mentionner dans le rapport que c'est identifié et planifié.

---

### Angle Mort D2 : Quasi-absence de gestion d'erreur

**Constat** : Sur 73+ fichiers source, il n'y a que :
- **3 try/catch** dans toute l'application (2 dans SimulatorPage, 1 dans useMonkaData)
- **0 ErrorBoundary** React
- **1 seul console.warn** en production

**Risque** : Si Supabase est indisponible pendant la démo, l'app montre un message d'erreur basique (pas de retry, pas de fallback riche). Ce n'est pas un crash, mais ce n'est pas résilient non plus.

**Verdict** : ⚪ Acceptable pour un outil interne non-critique. Les pages ont des états `loading` et `error` basiques. L'absence d'ErrorBoundary est le gap le plus visible.

**Action suggérée** : Ajouter un `ErrorBoundary` global dans `App.tsx` (15 lignes de code) pour éviter un écran blanc si un composant crash pendant la démo.

---

### Angle Mort D3 : Type mismatch `Record<string, string>` vs `Answers` dans le plan

**Constat CRITIQUE** : Le plan propose une approche **pipe-delimited string** (`"A|B"`) pour le multi-select. Mais le moteur clinique (`clinicalEngine.ts`) utilise déjà un type `Answers = Record<string, string | string[]>`.

**Le plan est en CONTRADICTION avec l'architecture existante.** Le moteur attend des `string[]` pour les multi-select, pas des strings séparées par `|`.

| Couche | Type actuel | Ce que le plan propose | Ce qu'il faudrait |
|---|---|---|---|
| `clinicalEngine.ts` | `Record<string, string \| string[]>` | — | — (déjà OK) |
| `helpers.ts` | `Record<string, string>` | pipe-delimited | `Record<string, string \| string[]>` |
| `SimulatorPage.tsx` | `Record<string, string>` | pipe-delimited | `Record<string, string \| string[]>` |
| `QuestionsSidebar.tsx` | `Record<string, string>` | pipe-delimited | `Record<string, string \| string[]>` |

**Risque** : L'approche pipe-delimited crée une **couche de conversion inutile** entre l'UI et le moteur, et `helpers.ts` utilise déjà un split `|` pour N3 (ligne 142) — preuve que c'est un patch existant, pas un design voulu.

**Action suggérée** : Corriger le plan pour utiliser `string[]` natif au lieu de pipe-delimited. C'est plus propre, plus typé, et aligné avec le moteur existant.

---

### Angle Mort D4 : `helpers.ts` `getActiveAidanceBlocks` a un hack pipe-delimited pour N3

**Constat** ligne 142 : `const n3Values = n3Answer.includes('|') ? n3Answer.split('|').map(s => s.trim()) : [n3Answer]`

**C'est un patch** : cette ligne prouve que quelqu'un a déjà essayé de gérer le multi-aidance avec le format pipe dans les personas (`_patch_trigger_answers.mjs` utilise `|` pour N3). Mais c'est incohérent avec le type `Answers` du moteur.

**Le bon fix** : Quand on migre vers `string[]`, cette ligne devient simplement :
```ts
const n3Values = Array.isArray(n3Answer) ? n3Answer : [n3Answer]
```

---

### Angle Mort D5 : Pas de test automatisé pour le multi-select

**Constat** : Les tests existants (`clinicalEngine.test.ts`, `engineHealthScore.test.ts`, `integrityChecks.test.ts`) ne testent pas les cas multi-select.

**Risque** : On n'a aucune garantie que le scoring fonctionne correctement avec des réponses array. Le fix pourrait passer le build mais produire des scores incorrects.

**Action suggérée** : Ajouter au minimum 2 tests unitaires :
1. `evaluateCondition` avec une réponse `string[]` pour chaque opérateur
2. `computeScore` avec une réponse multi-select et vérifier le cap (QUESTION_SCORE_CAP)

---

### Angle Mort D6 : L'app n'est pas responsive (mobile)

**Constat** : 88 classes CSS de layout mais **aucun breakpoint responsive** (`sm:`, `md:`, `lg:` en Tailwind). L'app utilise des `w-[45%]` et `w-[55%]` hardcodés dans le simulateur.

**Risque CTO** : Si le CTO ouvre le lien Vercel sur son téléphone en réunion → layout cassé.

**Verdict** : ⚪ Acceptable pour un outil interne desktop-first. Mais il faut le mentionner : c'est un choix de scope, pas un oubli.

---

### Angle Mort D7 : `sessionStorage` n'est pas nettoyé

**Constat** : `SimulatorPage.tsx` ligne 79-87 charge les réponses persona depuis `sessionStorage` et ligne 84 fait `sessionStorage.removeItem('persona_answers')` — mais seulement si le load réussit.

**Risque** : Si le JSON est malformé, le catch silencieux (`catch { /* ignore */ }`) laisse les données corrompues en sessionStorage, et chaque rechargement retente le parse → boucle silencieuse.

**Verdict** : ⚪ Edge case mineur, mais un CTO technique pourrait tester ça.

---

## 📊 MATRICE DE PRIORITÉ DES ANGLES MORTS

| ID | Angle Mort | POV | Sévérité | Effort | À intégrer au plan ? |
|---|---|---|---|---|---|
| **D3** | Type mismatch `string` vs `string[]` | CTO | 🔴 CRITIQUE | Moyen | ✅ OUI — Changer l'approche du plan |
| **B1** | Le moteur supporte déjà `string[]` | CPO | 🔴 CRITIQUE | — | ✅ OUI — Simplifier le plan |
| **B2** | Pas de test personas C1/C2/C3 | CPO | 🟡 IMPORTANT | Faible | ✅ OUI |
| **D5** | Pas de test multi-select | CTO | 🟡 IMPORTANT | Faible | ✅ OUI |
| **C3** | Repo contient fichiers non-techniques | CEO | 🟡 IMPORTANT | Trivial | ✅ OUI — gitignore ou communication |
| **A1** | Policies `public` vs `anon` | CISO | 🟡 MOYEN | Faible | ⚠️ Optionnel |
| **A2** | Policies dupliquées | CISO | 🟡 MOYEN | Trivial | ⚠️ Optionnel |
| **D1** | 3 fichiers > 300 lignes | CTO | ⚪ MINEUR | Moyen | 📋 Documenter |
| **D2** | Pas d'ErrorBoundary | CTO | ⚪ MINEUR | Trivial | ✅ OUI — 15 lignes |
| **C2** | Pas de README | CEO | ⚪ MINEUR | Faible | ✅ OUI |
| **B3** | ProfileRecap multi-select | CPO | ⚪ MINEUR | Trivial | ✅ OUI |
| **A3** | CSP img-src trop large | CISO | ⚪ COSMÉTIQUE | Trivial | 📋 Documenter |
| **D6** | Pas responsive mobile | CTO | ⚪ ACCEPTABLE | Élevé | 📋 Choix de scope |
| **D7** | sessionStorage non nettoyé | CTO | ⚪ EDGE CASE | Trivial | 📋 Documenter |
| **C1** | Vercel sur team PRAGMA | CEO | ⚪ NORMAL | — | 📋 Communication |

---

## 🎯 RECOMMANDATION FINALE

Le plan actuel a **un défaut d'architecture majeur** (D3/B1) : l'approche pipe-delimited est **en contradiction avec le moteur clinique existant** qui supporte déjà `string[]` nativement. Corriger ce point simplifie le fix et l'aligne avec l'architecture.

Les 4 top actions à intégrer au plan :

1. **Changer l'approche multi-select** : `string[]` natif au lieu de pipe-delimited
2. **Ajouter des tests unitaires** pour le multi-select scoring
3. **Ajouter un ErrorBoundary global** (15 lignes)
4. **Créer un README minimal** dans `APP/`

Tout le reste est soit cosmétique, soit un choix de scope conscient à documenter dans le rapport final.
