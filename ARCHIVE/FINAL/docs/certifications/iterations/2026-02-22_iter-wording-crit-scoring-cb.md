# 🔍 QG Itération — Wording Crit MTs + Scoring Content Blocks

**Date :** 2026-02-22
**Type :** Itération données Supabase
**Fichiers modifiés :** 0 fichiers code / 2 opérations DB

## Contexte

Compléter la couverture données pour monter le score Engine Health au-delà de 81/100 :
1. Remplir `wording_crit` pour les MTs dont la catégorie a une règle critique
2. Créer des `content_blocks` de type `scoring` pour chaque question scorante

## Opérations effectuées

### 1. Wording Crit — 32 MTs mis à jour

| Champ | Avant | Après |
|-------|:-----:|:-----:|
| `wording_std` | 339/390 | **371/390** |
| `wording_ccc` | 339/390 | **371/390** |
| `wording_crit` | 254/390 | **286/390** |

- **32 MTs PREV** mis à jour (catégories avec règle critique)
- **104 MTs restants** sans `wording_crit` → OK car leurs catégories n'ont **pas** de règle critique
- Règle métier : si pas de règle critique pour une catégorie → pas de wording_crit

### 2. Scoring Content Blocks — 95 blocs insérés

| V | Questions scorantes | CB créés |
|---|:---:|:---:|
| V1 | 12 | 12 |
| V2 | 8 | 8 |
| V3 | 18 | 18 |
| V4 | 42 | 42 |
| V5 | 15 | 15 |
| **Total** | **95** | **95** |

- Migration `add_scoring_entity_type` appliquée (ajout 'scoring' au CHECK constraint)
- Chaque CB contient : V cible, max score, réponses scorantes avec coefficients, justification clinique
- `block_type = 'scoring_justification'` (type existant)

### 3. Bilan Content Blocks

| entity_type | Count |
|------------|:-----:|
| `vulnerability` | 5 |
| `micro_parcours` | 121 |
| `question` | 156 |
| `category` | 73 |
| **`scoring`** | **95** |
| **Total** | **450** |

## Vérifications

| Check | Résultat |
|---|---|
| Build clean (tsc) | ✅ 0 erreurs |
| Types clean | ✅ |
| Fichiers < 300L | ✅ |
| Architecture respectée | ✅ |
| Pas de console.log | ✅ 0 |
| Hardcode audit | ✅ (données viennent de DB) |
| Tests unitaires | ✅ 27/27 |

## Verdict

✅ **Conforme** — 32 wording_crit remplis, 95 scoring CB insérés, 450 content_blocks total, integrity check 6/6 attendu.
