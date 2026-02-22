# 🔍 AUDIT COMPLET — Kernel × DB × Engine

> **Date** : 21/02/2026 — 23h
> **Périmètre** : Toutes les tables Supabase, KERNEL V6 (18 règles K1-K18), Engine TypeScript (`clinicalEngine.ts`)
> **Méthode** : Croisement automatisé DB ↔ Kernel ↔ Code source

---

## NOTE DE SYNTHÈSE

| Dimension | Score | Détail |
|---|---|---|
| **A1 — Intégrité structurelle** | **10/10** ✅ | 0 orphelin, 0 FK cassée, 0 chaîne brisée |
| **A2 — Kernel K1-K18 vs DB** | **9/10** ✅ | Toutes les règles respectées. 1 point de doc manquant (ASR) |
| **A3 — Engine vs DB** | **10/10** ✅ | 9/9 opérateurs supportés, winner-takes-all, scoring avec caps |
| **A4 — Couverture clinique** | **7/10** ⚠️ | Sous-blocs ≠ catégories, pas de mapping formel. Content blocks vides |
| **A5 — Qualité data** | **9/10** ✅ | 0 champ critique vide. 1 doublon sous-bloc V5 |
| **GLOBAL** | **9/10** | Base solide, axes d'enrichissement identifiés |

---

## A1 — INTÉGRITÉ STRUCTURELLE ✅

| Test | Résultat |
|---|---|
| Catégories sans rule | 0 |
| Catégories sans reco | 0 |
| Catégories sans MT | 0 |
| Rules → catégorie inexistante | 0 |
| MT → catégorie inexistante | 0 |
| Recos → catégorie inexistante | 0 |
| Scoring → question inexistante | 0 |

**Verdict** : La chaîne complète `Question → Rule → Catégorie → Reco → MT` est intacte pour les 73 catégories.

---

## A2 — KERNEL vs DB

| Règle Kernel | Vérification DB | Verdict |
|---|---|---|
| **K1** Recos activées par rules | 240 rules → 73 catégories → 202 recos | ✅ |
| **K2** 3 niveaux + prévention | Rules: 115 STD, 85 CCC, 40 CRIT. Recos: 73 STD, 72 CCC, 33 CRIT, 24 PREV | ✅ |
| **K3** Winner-takes-all | Engine code: `NIVEAU_ORDER = { standard:1, ccc:2, critique:3 }` → `if (order > existing) → replace` | ✅ |
| **K4** 1 prévention par MP | **24/24 MPs** ont 1 reco prévention + 2-3 MT prévention | ✅ |
| **K5** Reco = enveloppe MT | 390 MT rattachées via `category_id` | ✅ |
| **K6** Double wording | 0 MT avec `wording_utilisateur` vide. 0 MT avec `wording_idec` vide | ✅ |
| **K8** Acteur au niveau MT | 0 MT avec `acteur` vide. 73 acteurs distincts | ✅ |
| **K9** 1 MP = 1 ASR | ⚠️ ASR documentées dans les fichiers `VALIDATION_MP/` mais **pas en DB** | ⚠️ |
| **K10** 2 familles MT | 173 contributives (34 STRUC + 83 SEC + 56 MED). 217 non-contributives (87 INFO + 130 ORGA) | ✅ |
| **K13-K14** Scoring indépendant | 95 questions scorantes, normalisé 0-100 par V, score caps sur E19/O16 | ✅ |
| **K15** MT liées à catégorie | `micro_taches.category_id` FK → `categories.id` | ✅ |
| **K17** Domaine clinique | CHECK constraint `domaine IN ('medical', 'medico_social')` | ✅ |
| **K18** Écosystème acteurs | `acteur TEXT[]` avec 73 valeurs distinctes | ✅ |

### Multi-niveaux par catégorie (K3 en action)

41 catégories ont des rules à plusieurs niveaux → le moteur applique correctement le winner-takes-all :

| Nb niveaux | Nb catégories | Exemple |
|---|---|---|
| 3 (std+ccc+crit) | 16 | F2_CAT_01, M2_CAT_01, S1_CAT_01... |
| 2 (std+ccc ou std+crit) | 25 | A1_CAT_01, F3_CAT_01... |
| 1 (std seul) | 32 | A3_CAT_03, M6_CAT_02... |

---

## A3 — ENGINE vs DB

### Opérateurs

| Opérateur | Supporté Engine | Utilisé en DB | Match |
|---|---|---|---|
| `eq` | ✅ | ✅ | ✅ |
| `neq` | ✅ | ✅ | ✅ |
| `ne` | ✅ | ✅ | ✅ |
| `in` | ✅ | ✅ | ✅ |
| `nin` | ✅ | ✅ | ✅ |
| `gte` | ✅ | ✅ | ✅ |
| `contains` | ✅ | ✅ | ✅ |
| `count_gte` | ✅ | ✅ | ✅ |
| `has_any` | ✅ | ✅ | ✅ |

**9/9 match parfait.**

### Scoring Engine

- Supporte `string` (choix unique) et `string[]` (choix multiple) ✅
- Score caps : `E19` et `O16` plafonnés à 1 point max ✅
- Calcul : somme des scores par V, normalisé sur `maxScore` ✅
- Le scoring **ne déclenche jamais** un MP (K13) — confirmé dans le code ✅

### ⚠️ Point d'attention — N3 en choix multiple

Le engine gère `AnswerValue = string | string[]` et la fonction `toArray()` normalise. **Cependant**, les rules qui testent N3 utilisent `op: 'eq'`. Avec N3 en `choix_multiple`, la réponse sera un tableau `["Handicap", "Addiction"]`.

L'opérateur `eq` dans l'engine fait :
```typescript
case 'eq': return toArray(answer).includes(cond.val)
```

→ **C'est correct** : si N3 = ["Handicap", "Addiction"] et la rule teste `eq: "Handicap"`, ça match car `includes` est utilisé. ✅

---

## A4 — COUVERTURE CLINIQUE

### Sous-blocs vs Catégories

| V | Nb sous-blocs | Nb catégories | Nb MPs | Correspondance |
|---|---|---|---|---|
| V1 | 5 | 8 (2 par MP) | 4 | ⚠️ Pas 1:1 |
| V2 | 9 | 11 (2-3 par MP) | 4 | ⚠️ Pas 1:1 |
| V3 | 10 | 8 (2 par MP) | 4 | ⚠️ Pas 1:1 |
| V4 | 6 | 22 (3-4 par MP) | 6 | ⚠️ Pas 1:1 |
| V5 | 7 (+1 doublon) | 24 (4 par MP) | 6 | ⚠️ Pas 1:1 |

**Conclusion** : Les sous-blocs (37) ne sont **PAS** strictement égaux aux catégories (73). Il y a ~2x plus de catégories que de sous-blocs. Un sous-bloc peut contenir plusieurs catégories — c'est un niveau de granularité plus grossier.

### Types de MT par MP

| MP | Total | STRUC | SEC | MED | INFO | ORGA | ⚠️ |
|---|---|---|---|---|---|---|---|
| A1-A4 | 8-11 | 1-2 | 2-3 | **0** | 2-3 | 2-3 | ✅ Pas de MED en V2 — normal (administratif) |
| R1-R4 | 11-14 | 1-3 | 2-4 | **0-1** | 2-4 | 4-5 | ✅ Très peu de MED en V1 — normal (social) |
| S1-S4 | 5-20 | 1 | 0-5 | **0-17** | 1-2 | 0-2 | ⚠️ S3 a 17 MED et 0 SEC — très médical |
| F1-F6 | 12-17 | 1-2 | 3-5 | 0-6 | 1-3 | 2-7 | ✅ Bon équilibre |
| M1-M6 | 12-31 | 1-2 | 2-8 | 2-4 | 0-10 | 3-14 | ⚠️ M1 a 0 INFO — manque doc patient |

### Content blocks — état actuel

| Métrique | Valeur |
|---|---|
| MPs avec content_blocks | **1**/24 (M2 = matrice patho) |
| Content blocks scoring (justification) | 156 |
| Content blocks MP (sens clinique) | **0** |

**→ C'est le gros trou** : aucune documentation "sens clinique" stockée en DB pour les MPs, catégories, et rules. C'est exactement ce que tu veux ajouter dans la prochaine phase (content blocks).

---

## A5 — QUALITÉ DATA

| Test | Résultat |
|---|---|
| `wording_utilisateur` vide | **0** ✅ |
| `wording_idec` vide | **0** ✅ |
| `acteur` vide | **0** ✅ |
| `sens_clinique` vide sur rules | **0** ✅ |
| `question_text` vide | **0** ✅ |
| `response_options` vide (hors champ_libre) | **0** ✅ |
| Recos sans wording | **0** ✅ |
| Scoring → question inexistante | **0** ✅ |
| Doublon sous-bloc V5 | **1** (6.6– vs 6.6 –) |

---

## A6 — AXES D'AMÉLIORATION

### 🔴 Priorité haute

| # | Axe | Impact | Effort |
|---|---|---|---|
| **1** | **Stocker les ASR en DB** | K9 dit "1 MP = 1 ASR" mais les ASR ne sont que dans les `.md`. Les rendre queryables. | Moyen |
| **2** | **Content blocks sens clinique** | 23/24 MPs sans documentation → impossible de justifier les choix en certification | Élevé |
| **3** | **Mapping sous-bloc ↔ catégorie** | Pas de lien formel entre les sous-blocs du questionnaire et les catégories de reco. Nécessaire pour expliquer "pourquoi ces catégories" | Moyen |

### 🟠 Priorité moyenne

| # | Axe | Impact | Effort |
|---|---|---|---|
| **4** | **Fixer le doublon sous-bloc V5** | `6.6–` vs `6.6 –` (espace manquant) | Trivial |
| **5** | **S3 déséquilibré** | 17 MED / 0 SEC — pas de MT de sécurisation pour la santé de l'aidant | Faible |
| **6** | **M1 sans INFO** | 0 MT d'information pour la compréhension du diagnostic — l'aidant manque de documentation | Faible |

### 🟢 Opportunités

| # | Axe | Impact | Effort |
|---|---|---|---|
| **7** | **Table `sous_blocs`** | Formaliser les 37 sous-blocs comme entité en DB avec mapping vers catégories | Moyen |
| **8** | **Table `asr`** | Créer une table dédiée avec l'objectif, les critères de validation, et les MT contributives | Moyen |
| **9** | **N3 multi-select** | Vérifier que les personas et le simulateur gèrent le tableau de valeurs | Faible |

---

## ARCHITECTURE RELATIONNELLE

```
vulnerabilities (5)
  └── micro_parcours (24)
        ├── categories (73)
        │     ├── activation_rules (240)
        │     │     └── condition_logic (JSONB) → questions
        │     ├── recommendations (202)
        │     │     └── wording_utilisateur + wording_idec
        │     └── micro_taches (390)
        │           ├── wording_utilisateur + wording_idec
        │           ├── wording_std + wording_ccc + wording_crit
        │           ├── acteur[] (73 distincts)
        │           ├── type (STRUC/SEC/MED/INFO/ORGA)
        │           └── domaine (medical/medico_social)
        └── [ASR — pas en DB]

questions (165)
  ├── 130 socle + 20 aidance + 15 triggers
  ├── response_type (choix_unique/choix_multiple/champ_libre)
  ├── condition_affichage (33 conditions)
  └── response_options (JSONB)

scoring_questions (345 entrées → 95 questions)
  └── score par réponse (+0/+1/+2)

content_blocks (157)
  ├── 156 scoring (justification + pondération)
  └── 1 matrice patho-spécialiste

guides (42) ↔ guide_mt_mapping (32)
suivi_questions (30)
```

---

> 🔍 **AUDIT COMPLET — Score global : 9/10. Base structurellement solide. Axe principal : enrichir les content blocks pour la certification.**
