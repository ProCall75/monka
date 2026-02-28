# 📋 Certification PRAGMA — BLOC {N}

**Projet :** Monka Clinical Engine — Simulateur Clinique  
**Date :** YYYY-MM-DD HH:MM  
**Checkpoint :** after-bloc-{N}  
**Certifié par :** Quality Agent v2.0 (basé PRAGMA Senior Dev Framework v2.1)  
**Bloc complété :** BLOC {N} — {Titre du bloc}  
**Prochain bloc :** BLOC {N+1} — {Titre}

---

## Score Global

**{✅ | ⚠️ | 🔴} : X/28 (YY%)**

| Niveau | Sections | % |
|--------|----------|---|
| ✅ Conforme | X | YY% |
| ⚠️ À corriger | Y | ZZ% |
| 🔴 Non conforme | Z | WW% |

---

## Détail par Section PRAGMA

### ✅ Sections Conformes

- **§1 Architecture** — Séparation engine/UI respectée ✓
- **§2 Structure** — Fichiers dans les bons répertoires ✓
- **§3 Naming** — PascalCase composants, camelCase fonctions ✓
- **§4 Types** — TypeScript strict, pas de `any` ✓
- **§5 Import order** — Vérifier l'import graph ✓
- **§6 Sécurité** — Pas de credential, pas d'XSS, RLS actif ✓
- ... (compléter pour les 28 sections)

### ⚠️ À Corriger

- **§{X} [{Nom}]** — {Problème identifié} → {Action requise}

### 🔴 Non Conforme

- *(Aucun élément bloquant attendu)*

---

## Fichiers Modifiés — Revue Détaillée

Pour chaque fichier modifié dans le bloc :

### `{chemin/vers/fichier.tsx}`

| Métadonnée | Valeur |
|---|---|
| **Lignes modifiées** | L{X}-L{Y} |
| **Taille post-edit** | {N} lignes (seuil PRAGMA : 300) |
| **Nouveaux types** | {Types ajoutés/modifiés} |
| **Dépendances touchées** | {Imports ajoutés/supprimés} |

**Ce qui a changé :**  
{Description technique concise}

**Pourquoi c'est pertinent :**  
{Justification métier/technique/clinique}

**Code verbatim (extraits clés) :**
```tsx
// {Extrait du code modifié avec commentaires}
```

**Concepts CTO associés :**  
- 📖 *{Concept du cours CTO}* — `CTO/cours/{fichier}.md` § {section}
- {Explication de comment ce code applique le concept}

---

## Gate Checks

| Check | Résultat | Commande |
|---|---|---|
| TypeScript | {✅ \| ❌} | `npx tsc --noEmit` |
| Build production | {✅ \| ❌} | `npm run build` |
| Tests | {✅ \| ❌} | `npm test` |
| npm audit | {✅ \| ❌} | `npm audit` |
| Fichiers < 300L | {✅ \| ⚠️ dette existante} | — |

---

## 🔒 Sécurité — Scan Post-Modification

| Vérification | Status |
|---|---|
| Pas de `dangerouslySetInnerHTML` | {✅ \| ❌} |
| Pas de `eval()`, `innerHTML` | {✅ \| ❌} |
| Pas de Supabase write client | {✅ \| ❌} |
| Pas de credential dans le code | {✅ \| ❌} |
| Headers sécurité maintenus | {✅ \| ❌} |
| RLS inchangé (18/18 tables) | {✅ \| ❌} |

---

## 🧠 Réflexion Continue

### Dette technique détectée
- {Item} — {Sévérité} — {Action planifiée}

### Axes d'amélioration
- {Suggestion d'optimisation ou refacto}

### Zones d'ombre identifiées
- {Tout point nécessitant clarification ou décision}

---

## Actions Requises

### Immédiates (Bloquantes)
- [ ] {Action si bloquante}

### Sous 48h
- [ ] {Action non-bloquante}

### Recommandations (Post-livraison)
- [ ] {Amélioration future}

---

## Verdict

- [ ] ✅ **CERTIFIÉ** — Conforme aux standards PRAGMA. Peut procéder au BLOC {N+1}.
- [ ] ⚠️ **CERTIFIÉ AVEC RÉSERVES** — Corriger sous 48h.
- [ ] 🔴 **NON CERTIFIÉ** — Bloqué jusqu'à correction.

---

*Ce rapport est généré par le Quality Agent PRAGMA v2.0 basé sur le Senior Dev Framework v2.1 + CTO/cours Monka.*
