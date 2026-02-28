---
description: Étape 2 — Token Guard appliqué sur CHAQUE modification de fichier. 7 phases obligatoires par fichier touché.
---

# Étape 2 — Token Guard (par modification)

// turbo-all

> **Philosophie** : Chaque modification doit être PENSÉE avant d'être EXÉCUTÉE.
> **Référence** : `FINISH/plan.md` § Règles Token Guard
> **Chaîne** : Appelé après `/finish-01-pragma-rules` → après tous les fichiers → `/finish-03-gate`

---

## Les 7 phases Token Guard

### Phase 1 — ANALYSER

```
view_file du fichier cible EN ENTIER
→ Comprendre la structure complète
→ Identifier les dépendances (imports, exports)
→ Noter le nombre de lignes actuel
→ Identifier les zones sensibles (types, security, state)
```

**Pourquoi** : Ne JAMAIS modifier un fichier sans l'avoir lu en entier. Un changement de type sur la ligne 12 peut casser la ligne 180.

### Phase 2 — PLANIFIER

```
Documenter les lignes exactes à modifier :
→ Ligne X-Y : changer TYPE de A vers B
→ Ligne Z : ajouter la condition Array.isArray()
→ Vérifier que la modification ne casse pas les imports
→ Identifier les fichiers dépendants (qui importent ce fichier)
```

**Output** : Plan de modification clair AVANT le premier edit.

### Phase 3 — EXÉCUTER

```
Appliquer la modification avec les outils edit
→ Un edit par changement logique
→ Pas de bulk replace aveugle
→ Vérifier le diff affiché
```

### Phase 4 — VÉRIFIER

Post-edit checklist immédiate :

| Check | Commande | Seuil |
|---|---|---|
| Fichier < 300 lignes ? | `wc -l fichier` | ≤ 300 (ou dette documentée) |
| Types stricts ? | Pas de `any` ajouté | 0 `any` nouveau |
| Sécurité ? | Pas de credential/XSS/write | 0 violation |
| Import intact ? | Les consumers compilent ? | `tsc --noEmit` |
| Naming OK ? | PascalCase/camelCase | Conventions respectées |

### Phase 5 — RAPPORTER

```
Mettre à jour task.md :
→ Sous-tâche fichier → [x] fait
→ Documenter le diff en 1 ligne
→ Si dette introduite → la noter immédiatement
```

### Phase 6 — RÉFLÉCHIR

Questions à se poser systématiquement :

| # | Question | Si oui → |
|---|---|---|
| 1 | Est-ce que ce code pourrait être plus simple ? | Noter refacto potentiel |
| 2 | Est-ce qu'il y a une faille de sécurité ? | Fixer immédiatement |
| 3 | Est-ce qu'un dev junior comprendrait ? | Ajouter commentaire |
| 4 | Est-ce que ça pourrait casser silencieusement ? | Ajouter un test |
| 5 | Est-ce que le même pattern existe ailleurs ? | Vérifier cohérence |
| 6 | Est-ce qu'on a documenté POURQUOI ? | Ajouter explication |

### Phase 7 — RETOUR

```
Si > 8 tool calls depuis le dernier retour utilisateur :
  → notify_user OBLIGATOIRE
  → Résumer ce qui a été fait
  → Demander validation si nécessaire
  → Ne PAS continuer sans retour
```

---

## Exemple Token Guard complet

```
ANALYSER → view_file QuestionsSidebar.tsx (199 lignes, imports ok)
PLANIFIER → L16: type string → string | string[]
           L97-98: click handler → toggle array pour choix_multiple
           L142-144: highlight → Array.includes()
           L150: isAnswered → handle both types
EXÉCUTER → 4 edits via multi_replace_file_content
VÉRIFIER → 199L < 300 ✅, types stricts ✅, pas de any ✅, pas de console.log ✅
RAPPORTER → task.md: [x] QuestionsSidebar.tsx
RÉFLÉCHIR → Props drilling 2 niveaux = OK pour l'instant. Surveiller si > 3.
RETOUR → 6 tool calls, pas encore à 8. Continue.
```

---

## Output → Input pour /finish-03-gate

Après TOUS les fichiers du bloc traités, tu DOIS avoir :
- [ ] task.md à jour (chaque sous-tâche fichier → `[x]`)
- [ ] Liste de dette technique détectée pendant Phase 6 (pour le quality check)
- [ ] Aucune interdiction PRAGMA violée
- [ ] Nombre total de tool calls noté (pour le retour §7)

→ **Passer à `/finish-03-gate`** pour les build gates.

---

> ✅ **Chaîne suivante** : `/finish-03-gate` (une fois tous les fichiers traités)
