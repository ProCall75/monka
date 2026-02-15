---
description: "Couche de réflexion structurée — OBLIGATOIRE sur chaque message, AUCUNE exception"
---

# Deep-Think Pipeline v3.2

// turbo-all

## 🔴 RÈGLE ABSOLUE

**Ce pipeline s'exécute AUTOMATIQUEMENT sur CHAQUE message utilisateur.**
**L'utilisateur DOIT voir le bloc `🧠` dans CHAQUE réponse — bypass inclus.**

---

## Étapes

1. **Bypass Check** — Le message est-il une confirmation triviale d'un seul mot ? (oui/non/ok/go/continue/parfait)
   - Si oui → Afficher `🧠 Bypass: [raison]` puis exécuter directement
   - Si non → Continuer
   - **En cas de doute → NE PAS bypasser**

2. **CLASSIFY** — Identifier le type et la complexité (1-5)

3. **TOKEN GUARD** — Estimer le poids (S/M/L/XL)

4. **DECOMPOSE** — Décomposer en sous-problèmes atomiques

5. **STRUCTURE** — Appliquer le framework adapté à la complexité

6. **REWRITE** — Transformer en prompt optimisé (interne, pas affiché)

7. **VALIDATE** — Vérifier contre la checklist qualité

8. **🔍 TOOLING SCOUT** (si TASK_TECHNICAL / DEBUG / TASK_MULTI technique) :
   - Utiliser `search_web` (2-3 calls max) pour chercher des outils spécialisés
   - Sources cibles : Reddit (r/webdev, r/reactjs, r/nextjs...), Twitter/X dev, GitHub trending, HN
   - **Éviter :** Medium, listicles SEO, "Top 10 best tools"
   - Critères : activement maintenu, adopté en production, intégration rapide, pas bloatware
   - Si trouvé → ajouter ligne `**Tooling:** 🔍 [...]` dans le bloc DISPLAY
   - Si non pertinent (QUESTION, TASK_CREATIVE, CSS simple...) → skip

9. **⭐ DISPLAY (OBLIGATOIRE)** — Afficher le bloc visible AVANT l'exécution :

   Pour complexité 1-2 :
   ```
   🧠 **Compris:** [intent] | ⚡ S
   ```

   Pour complexité 3+ :
   ```
   ---
   🧠 **Deep-Think** | `TYPE` | Complexité: X/5 | ⚡ WEIGHT

   **Intent:** [reformulation]
   **Décomposition:**
   1. [Sous-tâche 1] — ~X% budget
   2. [Sous-tâche 2] — ~X% budget

   **Framework:** [Nom du framework]
   **Tooling:** 🔍 [Résultat ou "Aucun — exécution manuelle"]
   **Checkpoint:** [Plan si L/XL, sinon "Aucun"]
   ---
   ```

   > **SI CE BLOC N'APPARAÎT PAS → LE PIPELINE A ÉCHOUÉ.**

10. **EXECUTE** — Exécuter le prompt réécrit. Si Weight ≥ L, s'arrêter via `notify_user` quand le budget approche le plafond.

---

## Coût Token Estimé

| Cas | Surcoût | Impact |
|-----|---------|--------|
| Bypass (trivial) | ~10 tokens | Négligeable |
| Complexité 1-2 (compact) | ~30-50 tokens | Négligeable |
| Complexité 3+ (full block) | ~100-200 tokens | < 2% du budget moyen |
| Tooling Scout (search_web) | ~500-1000 tokens | ~5-8% budget — compensé par meilleure exécution |
| Pipeline interne (classify/decompose/validate) | ~0 tokens visibles | Raisonnement interne, pas d'output supplémentaire |

**Conclusion :** Le surcoût est minime et largement compensé par la qualité accrue de l'exécution.

