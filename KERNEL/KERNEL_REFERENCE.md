# 🔒 MONKA KERNEL — Référence Technique Moteur v2

> **Version** : v2.0 — 03/03/2026  
> **Objectif** : Document de vérité technique pour le moteur clinique. Définit les contrats entre la DB Supabase, le code TS, et la doc Kernel V5.  
> **Dernière vérification** : 03/03/2026 — 15 tables, 128 colonnes, 1497 lignes de données.

---

## 0. ANGLES MORTS & LEÇONS APPRISES

> [!CAUTION]
> **Ce document existe parce qu'on a découvert des anomalies en cascade.** Avant de le lire comme un rapport propre, voici les erreurs méthodologiques commises pendant l'audit initial, pour ne pas les reproduire.

### Erreurs commises

| # | Erreur | Conséquence | Leçon |
|---|---|---|---|
| 1 | **Audit prévention par catégorie au lieu de par MP** | Faux positif ANO-004 (49 "problèmes" inexistants) | Toujours vérifier le **niveau hiérarchique** avant de requêter |
| 2 | **Type `response_options` présumé text[]** | 4 requêtes SQL en erreur (syntax `ANY(array)` sur du jsonb) | Toujours vérifier `information_schema.columns` avant de requêter |
| 3 | **Audit `val` limité à l'opérateur `eq`** | 60 mismatches `in` non détectés au premier pass | Auditer TOUS les opérateurs qui comparent du texte |
| 4 | **Persona answers jamais vérifiées** | 94 incohérences non détectées | Si une table contient une FK logique (answer ↔ response_options), la vérifier |
| 5 | **Types TS non comparés au schéma DB** | Champs fantômes dans le code (`coefficient`, `seuil_min/max`) | Comparer le schéma DB réel aux interfaces TS colonne par colonne |

### Comment quadriller correctement

```
POUR CHAQUE TABLE :
  1. Lister TOUTES les colonnes via information_schema
  2. Comparer colonne par colonne avec l'interface TS → trouver les champs fantômes
  3. Pour chaque colonne de type texte : vérifier les NULL, les doublons, les valeurs aberrantes
  4. Pour chaque FK logique (pas forcément SQL) : vérifier l'intégrité croisée
  5. Pour chaque colonne JSONB : parser et vérifier la structure interne
```

---

## 1. SCHÉMA COMPLET — Colonne par colonne

### `activation_rules` — 11 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | text | NO | ✅ | PK. Format : `V{1-5}_{MP}_{NIVEAU}_{SEQ}` |
| `category_id` | text | NO | ✅ | FK → `categories.id` |
| `mp_id` | text | NO | ✅ | FK → `micro_parcours.id` |
| `niveau` | text | NO | ✅ | `standard` / `ccc` / `critique` |
| `condition_logic` | jsonb | NO | ✅ | Tableau de conditions (voir §2) |
| `sens_clinique` | text | YES | ✅ | Justification clinique de la règle |
| `delai_jours` | integer | NO | ✅ | Urgence en jours |
| `rule_group` | text | YES | ✅ | Groupement logique |
| `created_at` | timestamptz | YES | ❌ | Auto-généré |
| `justification_delai` | text | YES | ❌ | Pourquoi ce délai |
| `justification_ccc` | text | YES | ❌ | Pourquoi c'est un CCC |

---

### `categories` — 5 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | text | NO | ✅ | PK. Format : `{MP}_CAT_{SEQ}` |
| `mp_id` | text | NO | ✅ | FK → `micro_parcours.id` |
| `nom` | text | NO | ✅ | Nom de la catégorie d'action |
| `description` | text | YES | ✅ | Description détaillée |
| `ordre` | integer | NO | ✅ | Ordre d'affichage |

---

### `micro_parcours` — 8 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | text | NO | ✅ | PK. Ex : `A1`, `F4`, `M2` |
| `vulnerability_id` | text | NO | ✅ | FK → `vulnerabilities.id` |
| `nom` | text | NO | ✅ | Nom du micro-parcours |
| `objectif` | text | YES | ✅ | Objectif clinique |
| `signature_a` | text | YES | ✅ | Signature ASR partie A |
| `signature_b` | text | YES | ✅ | Signature ASR partie B |
| `asr_wording` | text | YES | ❌ | Wording ASR complet |
| `asr_criteres_validation` | text | YES | ❌ | Critères de validation ASR |
| `created_at` | timestamptz | YES | ❌ | Auto-généré |

---

### `micro_taches` — 20 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | text | NO | ✅ | PK |
| `category_id` | text | NO | ✅ | FK → `categories.id` |
| `mp_id` | text | NO | ✅ | FK → `micro_parcours.id` |
| `libelle` | text | NO | ✅ | Libellé court |
| `type` | text | NO | ✅ | `STRUC`/`SEC`/`MED`/`INFO`/`ORGA` |
| `acteur` | text[] | NO | ✅ | Qui réalise |
| `domaine` | text | NO | ✅ | `medical`/`medico_social` |
| `is_contributive` | boolean | NO | ✅ | Contribue au score ASR |
| `is_prevention` | boolean | NO | ✅ | Mode prévention |
| `is_parametric` | boolean | NO | ✅ | Wording paramétrique |
| `parametric_mapping` | jsonb | YES | ✅ | Mapping conditionnel |
| `ordre` | integer | NO | ✅ | Ordre d'affichage |
| `wording_idec` | text | NO | ✅ | Wording pro |
| `wording_utilisateur` | text | NO | ✅ | Wording aidant |
| `wording_std` | text | YES | ✅ | Wording niveau Standard |
| `wording_ccc` | text | YES | ✅ | Wording niveau CCC |
| `wording_crit` | text | YES | ✅ | Wording niveau Critique |
| `is_action` | boolean | YES | ❌ | Action vs info (défaut: true) |
| `aidance` | text | YES | ❌ | Type d'aidance (défaut: 'Tous') |
| `sens_clinique` | text | YES | ❌ | Justification clinique |
| `justification_type` | text | YES | ❌ | Justification du type MT |
| `contribution_asr` | text | YES | ❌ | Contribution à l'ASR |
| `created_at` | timestamptz | YES | ❌ | Auto-généré |

---

### `questions` — 14 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | text | NO | ✅ | PK. Ex : `O23`, `E8`, `N11` |
| `ordre_global` | integer | YES | ✅ | Position dans le questionnaire |
| `vulnerability_id` | text | YES | ✅ | FK → `vulnerabilities.id` |
| `bloc_id` | integer | YES | ✅ | ID du bloc |
| `bloc` | text | YES | ✅ | Nom du bloc |
| `sous_bloc` | text | YES | ✅ | Sous-bloc |
| `question_text` | text | NO | ✅ | Texte affiché |
| `response_type` | text | YES | ✅ | `single`/`multi`/`free`... |
| `response_options` | **jsonb** ⚠️ | YES | ✅ (`string[]`) | **⚠️ Type DB jsonb ≠ Type TS string[].** Le code le gère mais la doc doit le noter. |
| `is_trigger` | boolean | YES | ✅ | Question de routage |
| `classification` | text | YES | ✅ | Classification clinique |
| `aidance` | text | YES | ✅ | Type d'aidance filtrant |
| `sous_categorie_ref` | text | YES | ✅ | Réf sous-catégorie |
| `condition_affichage` | text | YES | ❌ | Condition d'affichage conditionnel |
| `sens_clinique` | text | YES | ❌ | Justification clinique |

---

### `question_mp_mapping` — 7 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | integer | NO | ✅ | PK auto-incrémentée |
| `question_id` | text | NO | ✅ | FK → `questions.id` |
| `mp_id` | text | NO | ✅ | FK → `micro_parcours.id` |
| `source` | text | NO | ✅ | `legacy`/autre |
| `justification` | text | YES | ❌ | Pourquoi ce mapping |
| `niveaux_triggered` | text | YES | ❌ | Niveaux déclenchés |
| `nb_rules` | integer | YES | ❌ | Nombre de règles liées |
| `created_at` | timestamptz | YES | ❌ | Auto-généré |

---

### `recommendations` — 7 colonnes ✅ Complet

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | text | NO | ✅ | PK |
| `category_id` | text | NO | ✅ | FK → `categories.id` |
| `mp_id` | text | NO | ✅ | FK → `micro_parcours.id` |
| `niveau` | text | NO | ✅ | `standard`/`ccc`/`critique`/`prevention` |
| `wording_utilisateur` | text | NO | ✅ | Wording aidant |
| `wording_idec` | text | NO | ✅ | Wording pro |
| `created_at` | timestamptz | YES | ❌ | Auto-généré |

---

### `scoring_questions` — 8 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | integer | NO | ✅ | PK auto |
| `question_id` | text | NO | ✅ | FK → `questions.id` |
| `vulnerability_id` | text | NO | ✅ | FK → `vulnerabilities.id` |
| `response_text` | text | NO | ✅ | Texte de réponse → score |
| `score` | integer | NO | ✅ | Points attribués |
| `max_score_vulnerability` | integer | YES | ✅ | Score max pour cette V |
| `source` | text | NO | ❌ | `legacy`/autre |
| `created_at` | timestamptz | YES | ❌ | Auto-généré |

> [!WARNING]
> **Champ fantôme TS :** `dbTypes.ts` déclare `coefficient: number` sur `DBScoringQuestion` mais **cette colonne n'existe PAS** dans la DB. Le code tourne parce que `queries.ts` fait `select('*')` et le champ arrive comme `undefined`.

---

### `scoring_thresholds` — 8 colonnes

| Colonne DB | Type DB | Nullable | Dans TS ? | Rôle |
|---|---|---|---|---|
| `id` | integer | NO | ✅ | PK auto |
| `vulnerability_id` | text | NO | ✅ | FK → `vulnerabilities.id` |
| `level` | text | NO | ✅ | `faible`/`modere`/`eleve`/`critique` |
| `min_score` | integer | NO | ✅ | Borne basse du seuil |
| `max_score` | integer | NO | ✅ | Borne haute du seuil |
| `description` | text | YES | ✅ | Description du niveau |
| `source` | text | NO | ❌ | `legacy` |
| `created_at` | timestamptz | YES | ❌ | Auto-généré |

> [!WARNING]
> **Champs fantômes TS :** `dbTypes.ts` déclare `niveau: string`, `seuil_min: number`, `seuil_max: number` mais ces colonnes **n'existent PAS** dans la DB. Les colonnes réelles sont `level`, `min_score`, `max_score`.

---

### Tables restantes (complètes, pas d'anomalies)

| Table | Colonnes DB | Colonnes TS | TS complet ? |
|---|---|---|---|
| `vulnerabilities` | 6 | 6 | ✅ |
| `content_blocks` | 7 | 7 | ✅ |
| `cr_templates` | 7 | 7 | ✅ |
| `personas` | 16 | 16 | ✅ |
| `persona_answers` | 5 | 5 | ✅ |
| `suivi_questions` | 9 | 8 (`created_at` non typé) | ✅ |

---

## 2. CONTRATS DATA ↔ CODE

### C1 — `condition_logic` format JSONB

```
OBLIGATOIRE par condition :
  q     : string      — ID question dans questions.id (ou "_multi")
  op    : string      — eq|neq|ne|in|nin|gte|count_gte|has_any|contains

CONDITIONNEL par op :
  val   : string|num  — eq, neq, ne, gte, contains, count_gte
  vals  : string[]    — in, nin
  min   : number      — has_any
  conditions: [...]   — _multi (sous-conditions récursives)

INTERDIT/IGNORÉ :
  junction: "OR"      — Ignoré par le moteur. Anti-pattern CCC.
```

### C2 — Texte val/response_text doit matcher response_options

Pour `eq`, `in`, `scoring_questions.response_text`, et `persona_answers.answer` : le texte **doit être identique char par char** à un élément de `questions.response_options`.

**Statut actuel :**

| Source | Mismatches | Total comparaisons | Taux |
|---|---|---|---|
| `condition_logic` op `eq` | **61** | 287 | 21% |
| `condition_logic` op `in` (vals) | **60** | ~200 | 30% |
| `persona_answers.answer` | **94** | ~500 | 19% |
| `scoring_questions.response_text` | **0** | 345 | 0% ✅ |

> [!CAUTION]
> **215 textes en DB ne matchent pas les `response_options` de leurs questions.** Les `scoring_questions` sont propres. Le pattern est récurrent : texte abrégé dans la règle vs texte complet dans les options (ex: `"7 et plus"` ≠ `"7 médicament et plus"`). Ces conditions **ne peuvent pas matcher** lors de l'évaluation moteur.

### C3 — Intégrité FK

Toute FK logique doit pointer vers un ID existant. Vérifié par `integrityChecks.ts` check C1.

### C4 — Prévention par MP (Kernel K4)

Chaque **MP** (PAS chaque catégorie) doit avoir ≥1 reco `niveau = 'prevention'`.  
La prévention s'active quand **aucune** catégorie du MP n'est déclenchée.

**Statut : ✅ 24/24 MPs couverts.**

### C5 — CCC = composition AND

Toute règle `niveau: "ccc"` doit avoir ≥2 conditions en AND. Un signal seul → standard/critique.

**Statut : 30 violations** (voir audit CCC OR).

### C6 — Seuils de scoring continus

Pour chaque vulnérabilité, les 4 niveaux (`faible`/`modere`/`eleve`/`critique`) doivent couvrir l'intégralité de la plage [0, max] sans trou ni chevauchement.

**Statut : ✅ Les 5 vulnérabilités ont des seuils continus.**

| V | Faible | Modéré | Élevé | Critique |
|---|---|---|---|---|
| V1 | 0-3 | 4-6 | 7-9 | 10-13 |
| V2 | 0-2 | 3-4 | 5-6 | 7-8 |
| V3 | 0-4 | 5-9 | 10-14 | 15-19 |
| V4 | 0-11 | 12-22 | 23-33 | 34-44 |
| V5 | 0-3 | 4-7 | 8-11 | 12-15 |

---

## 3. MATRICE TS ↔ DB

### Champs fantômes dans TS (existent dans le code mais PAS en DB)

| Interface TS | Champ | Existe en DB ? |
|---|---|---|
| `DBScoringQuestion` | `coefficient` | ❌ **NON** |
| `DBScoringThreshold` | `niveau` | ❌ (le vrai champ est `level`) |
| `DBScoringThreshold` | `seuil_min` | ❌ (le vrai champ est `min_score`) |
| `DBScoringThreshold` | `seuil_max` | ❌ (le vrai champ est `max_score`) |

### Colonnes DB absentes du TS (existent en DB mais pas dans les types)

| Table | Colonnes manquantes dans TS | Impact moteur |
|---|---|---|
| `activation_rules` | `justification_delai`, `justification_ccc` | Aucun (docs only) |
| `micro_parcours` | `asr_wording`, `asr_criteres_validation` | Aucun (ASR pas encore implémenté) |
| `micro_taches` | `is_action`, `aidance`, `sens_clinique`, `justification_type`, `contribution_asr` | Potentiel (filtrage par aidance) |
| `questions` | `condition_affichage`, `sens_clinique` | Potentiel (affichage conditionnel) |
| `question_mp_mapping` | `justification`, `niveaux_triggered`, `nb_rules` | Aucun (metadata) |

---

## 4. RAPPORT D'AUDIT — v2 (03/03/2026)

| ID | Gravité | Description | Chiffre | Statut |
|---|---|---|---|---|
| **ANO-001** | 🔴 | `_multi` non supporté → règles mortes | 7 règles | ✅ Corrigé |
| **ANO-002** | 🔴 | `junction: "OR"` dans CCC | 30 règles | ⏳ À remonter |
| **ANO-003** | 🟠 | Texte abrégé vs `response_options` | 121 eq+in | ⏳ À investiguer |
| **ANO-005** | 🟠 | Persona answers incohérentes | 94 | ⏳ À investiguer |
| **ANO-006** | 🟡 | Champs fantômes dans dbTypes.ts | 4 champs | ⏳ À nettoyer |
| ~~ANO-004~~ | — | ~~Catégories sans prevention~~ | — | ❌ Faux positif |

---

> 🔒 **KERNEL REFERENCE v2.0** — Référence technique du moteur clinique Monka.
