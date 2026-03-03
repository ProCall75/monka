# 📊 Walkthrough — BLOC {N} : {Titre}

**Date** : YYYY-MM-DD HH:MM  
**Projet** : Monka Clinical Engine — Simulateur Clinique  
**Auteur** : Agent IA × Antonin (PRAGMA)  
**Destinataire** : CTO Monka — Rapport d'itération qualité prestige  
**Niveau** : Senior Dev / CISO / Anthropic-grade

---

## 🎯 Objectif du bloc

{Description concise de ce que le bloc devait accomplir et pourquoi.}

---

## 📐 Décisions d'architecture

### Choix effectués

| # | Décision | Alternatives considérées | Raison du choix |
|---|---|---|---|
| 1 | {Décision} | {Alt A, Alt B} | {Justification technique} |

### Concepts CTO appliqués

Pour chaque concept du cours CTO mis en pratique :

#### 📖 {Concept} — `CTO/cours/{fichier}.md` § {section}

**Définition cours :**  
> {Citation ou résumé du concept tel qu'appris dans le cours}

**Application dans ce bloc :**  
{Comment concrètement ce concept a été appliqué dans le code}

**Exemple de code :**
```tsx
// {Code concret qui illustre l'application du concept}
```

**Zone d'ombre détectée :**  
{Si un aspect du concept n'est pas entièrement couvert ou compris, le documenter ici pour discussion}

---

## 🔧 Modifications — Détail technique

### `{fichier.tsx}` — {Rôle du fichier}

**Avant :**
```tsx
// {Code avant modification}
```

**Après :**
```tsx
// {Code après modification}
```

**Explication en français simplifié :**  
{Traduction vulgarisée de ce que fait le code modifié, comme si on l'expliquait à un non-dev}

**Termes techniques utilisés :**
| Terme | Définition (GLOSSAIRE.md) | Contexte Monka |
|---|---|---|
| {Terme 1} | {Définition} | {Comment ça s'applique ici} |
| {Terme 2} | {Définition} | {Comment ça s'applique ici} |

---

## 🔒 Cybersécurité — Analyse de surface d'attaque

### Vecteurs d'attaque évalués

| # | Vecteur | Status | Mitigation |
|---|---|---|---|
| 1 | XSS (injection HTML/JS) | {✅ Mitigé \| ⚠️ Partiel} | {Explication} |
| 2 | CSRF | {N/A — read-only} | {Explication} |
| 3 | Data exposure | {✅ Mitigé} | {RLS, publishable key} |
| 4 | Supply chain (npm) | {✅ `npm audit`} | {Résultat} |

### Référence OWASP appliquée
- 📖 `CTO/cours/06_SECURITE.md` § 6.1 — Top 10 OWASP
- {Quelles vulnérabilités OWASP sont pertinentes pour ce bloc}

### Headers sécurité
```
CSP: {valeur actuelle}
HSTS: {valeur actuelle}
X-Frame-Options: {valeur}
```

---

## 🧠 Intelligence & Réflexion

### Pourquoi cette implémentation est pertinente

{Argumentation technique détaillée sur pourquoi les choix faits sont les meilleurs dans ce contexte. Inclure :}
- Scalabilité : {Peut-on ajouter des features sans refacto ?}
- Maintenabilité : {Un dev junior comprendrait-il ce code ?}
- Performance : {Impact sur les Core Web Vitals ?}
- Déterminisme : {Même input = même output ?}

### Trade-offs acceptés

| Trade-off | Gain | Coût | Justification |
|---|---|---|---|
| {Ce qu'on a sacrifié} | {Ce qu'on a gagné} | {Le prix payé} | {Pourquoi c'est acceptable} |

### Apprentissages

{Ce que cette itération a enseigné. Termes CTO appris ou consolidés.}

| Concept appris/consolidé | Source cours | Mon niveau avant | Après |
|---|---|---|---|
| {Concept} | `CTO/cours/{X}.md` | {Vague / Théorique / Solide} | {Théorique / Solide / Expert} |

---

## 📊 Métriques

| Métrique | Valeur |
|---|---|
| Fichiers modifiés | {N} |
| Lignes ajoutées | {+N} |
| Lignes supprimées | {-N} |
| Erreurs TS avant | {N} |
| Erreurs TS après | 0 |
| Build time | {N}s |
| Bundle size delta | {+/-N KB} |

---

## ✅ Preuves de vérification

| Test | Résultat | Commande |
|---|---|---|
| TypeScript strict | ✅ 0 erreurs | `npx tsc --noEmit` |
| Build production | ✅ | `npm run build` |
| Tests unitaires | {✅ \| N/A} | `npm test` |
| npm audit | {✅ 0 vulns} | `npm audit` |
| Test navigateur | {✅ vérifié visuellement} | — |

---

## 📝 Prochaines étapes

| # | Action | Bloc | Priorité |
|---|---|---|---|
| 1 | {Prochaine action} | BLOC {N+1} | {🔴 Critique \| 🟡 Moyen \| 🟢 Low} |

---

## 🔗 Références

| Document | Rôle |
|---|---|
| `FINISH/plan.md` | Source de vérité |
| `FINISH/certifs/BLOC-{N}_quality_check.md` | Certification PRAGMA |
| `CTO/cours/{pertinent}.md` | Concepts appliqués |
| `FINISH/engine_explainer.md` | Doc moteur |

---

*Walkthrough généré par le workflow /finish-sprint — PRAGMA Quality Standard.*
