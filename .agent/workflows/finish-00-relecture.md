---
description: Étape 0 — Relecture obligatoire des sources de vérité AVANT toute action. Appliquée au début de CHAQUE bloc du sprint FINISH.
---

# Étape 0 — Relecture Obligatoire (Token Guard Init)

// turbo-all

> **Quand** : AVANT de toucher au moindre fichier, au début de chaque bloc.
> **Pourquoi** : Le Token Guard impose de toujours connaître le contexte AVANT d'agir.

---

## Sources de vérité à relire

```
1. view_file FINISH/plan.md
   → Quel bloc est en cours ?
   → Quelles sont les contraintes globales ?
   → Quels fichiers doivent être modifiés ?

2. view_file FINISH/implementation.md
   → Spec technique EXACTE du bloc en cours
   → Lignes de code à modifier
   → Résultat attendu

3. view_file task.md (artifact)
   → Quel bloc est [/] en cours ?
   → Quels sous-items sont déjà [x] faits ?
   → Mettre à jour le bloc courant en [/]
```

---

## Checklist Token Guard Init

- [ ] J'ai lu plan.md et je connais le bloc courant
- [ ] J'ai lu implementation.md pour le bloc courant
- [ ] J'ai mis à jour task.md (bloc courant → `[/]`)
- [ ] J'ai identifié TOUS les fichiers à modifier
- [ ] J'ai identifié les dépendances entre fichiers
- [ ] Je connais les gates de sortie (tsc, build, test)

---

## Références permanentes

| Document | Rôle | Chemin |
|---|---|---|
| Plan V3 | Source de vérité unique | `FINISH/plan.md` |
| Implementation | Specs techniques | `FINISH/implementation.md` |
| Engine Explainer | Doc moteur clinique | `FINISH/engine_explainer.md` |
| Audit DB | État des 18 tables | `FINISH/audit_db.md` |
| Angles Morts | Risques identifiés | `FINISH/anglesmorts.md` |
| Coherence Proof | Alignement docs↔code↔DB | `FINISH/coherence_proof.md` |
| Analyse Personas | Architecture DB personas | `FINISH/analyse_personas_db.md` |
| CTO Cours | Formation technique | `CTO/cours/` (16 fichiers) |
| Glossaire | Termes techniques | `CTO/cours/GLOSSAIRE.md` |

---

## Output → Input pour /finish-01-pragma-rules

Après cette étape, tu DOIS connaître :
- [ ] Le numéro du BLOC courant
- [ ] La liste exacte des fichiers à modifier
- [ ] Les dépendances entre fichiers (ordre de modification)
- [ ] Les gates de sortie attendues

→ **Passer directement à `/finish-01-pragma-rules`** pour charger les règles.

---

> ⚠️ **Ne JAMAIS commencer un bloc sans avoir exécuté cette étape.**
> ✅ **Chaîne suivante** : `/finish-01-pragma-rules`
