# 🗄️ Architecture DB Cible — Monka

> **Date** : 16/02/2026  
> **Objectif** : Schéma Supabase propre, avec des FK solides et un accès fluide pour le clinical engine  
> **Statut** : 📐 À valider avant migration

---

## Diagnostic de l'existant

14 tables. 9 sont legacy ou liées à l'app de validation et doivent disparaître. 5 sont le socle figé du questionnaire.

### À garder tel quel

| Table | Lignes | Rôle |
|---|---|---|
| `vulnerabilities` | 5 | Les 5 dimensions — clé de voûte |
| `questions` | 165 | 150 questions + 15 triggers |
| `micro_parcours` | 24 | Les 24 MPs (signatures A/B incluses) |
| `question_mp_mapping` | 155 | Relation N:N question ↔ MP |
| `suivi_questions` | 30 | Questions-portes du suivi |

### À supprimer

`activation_rules`, `recommendations`, `recommendations_legacy`, `micro_taches`, `scoring_questions`, `scoring_thresholds`, `asr`, `mp_annotations`, `mp_todos`

> Toutes contiennent des données legacy. La nouvelle vérité vient des templates KERNEL officiels.

---

## Schéma cible — 9 tables, 4 nouvelles

```
vulnerabilities (5)
    │ PK: id
    │
    ├─── 1:N ──► questions (165)
    │              FK: vulnerability_id → vulnerabilities.id
    │
    └─── 1:N ──► micro_parcours (24)
                   FK: vulnerability_id → vulnerabilities.id
                   │
                   ├── N:N ──► question_mp_mapping (155)
                   │             FK: mp_id → micro_parcours.id
                   │             (question_id → questions.id pas de FK car legacy)
                   │
                   ├── 1:N ──► suivi_questions (30)
                   │             FK: mp_id → micro_parcours.id
                   │
                   └── 1:N ──► categories (NEW ~60-80)
                                 FK: mp_id → micro_parcours.id
                                 │
                                 ├── 1:N ──► activation_rules (NEW ~150-200)
                                 │             FK: category_id → categories.id
                                 │
                                 ├── 1:N ──► micro_taches (NEW ~300)
                                 │             FK: category_id → categories.id
                                 │
                                 └── 1:N ──► recommendations (NEW ~250)
                                               FK: category_id → categories.id
```

**Chaque flèche = une FK réelle en DB.** Pas de TEXT[] sans contrainte, pas de référence implicite.

---

## Les 4 nouvelles tables

### 1. `categories`

Le pivot central. Tout le contenu clinique est organisé par catégorie. Un MP a entre 1 et 4 catégories — chacune représente un axe d'action clinique distinct.

| Colonne | Type | Contrainte | Exemple |
|---|---|---|---|
| `id` | TEXT | PK | `R1_CAT_01` |
| `mp_id` | TEXT | FK → `micro_parcours.id` NOT NULL | `R1` |
| `nom` | TEXT | NOT NULL | `Accompagnement social (AS)` |
| `description` | TEXT | | `Orienter vers une AS pour les impacts admin et pro` |
| `ordre` | INT | NOT NULL | `1` |

> **Pourquoi c'est le pivot ?** Sans catégorie, les MT et les recos flottent. La catégorie regroupe des actions cliniques qui vont ENSEMBLE. Le clinical engine raisonne en "quelle catégorie activer" → puis il tire les recos et MT de cette catégorie.

---

### 2. `activation_rules`

Chaque règle dit : "SI telle(s) réponse(s) ALORS activer telle catégorie à tel niveau". C'est le moteur de décision.

| Colonne | Type | Contrainte | Exemple |
|---|---|---|---|
| `id` | TEXT | PK | `V1_R1_STD_01` |
| `category_id` | TEXT | FK → `categories.id` NOT NULL | `R1_CAT_01` |
| `mp_id` | TEXT | FK → `micro_parcours.id` NOT NULL | `R1` |
| `niveau` | TEXT | CHECK `standard/ccc/critique` NOT NULL | `standard` |
| `condition_logic` | JSONB | NOT NULL | `[{"q":"N7","op":"in","vals":["Aménagement horaires","Congés"]}]` |
| `sens_clinique` | TEXT | | `L'aidant a déjà modifié sa vie pro…` |
| `delai_jours` | INT | NOT NULL | `90` |

> **Choix de design : 1 règle = 1 catégorie.**
> Dans les templates, certaines règles activent 2-3 catégories simultanément (ex: `V1_R1_CRIT_02` active les 3 CAT). Plutôt que stocker des arrays `category_ids[]` sans FK, **on duplique la règle** — une ligne par catégorie activée, même `id` suffixé `_a`, `_b`, `_c` ou bien un composite `(rule_ref, category_id)`.
>
> Alternative : `rule_ref` TEXT (non-unique) qui lie les règles qui partagent la même condition. Ça permet de regrouper les règles communes tout en gardant des FK propres.

| Colonne optionnelle | Type | Rôle |
|---|---|---|
| `rule_group` | TEXT NULL | Relie les règles issues de la même condition clinique (ex: `V1_R1_CRIT_02`) |

Avec ça, le clinical engine fait :

```sql
-- Trouver les catégories activées pour un MP
SELECT DISTINCT category_id, niveau, delai_jours
FROM activation_rules
WHERE mp_id = 'R1'
  AND evaluation_matches(condition_logic, :reponses)
ORDER BY 
  CASE niveau WHEN 'critique' THEN 1 WHEN 'ccc' THEN 2 WHEN 'standard' THEN 3 END;
```

---

### 3. `micro_taches`

Les actions concrètes. Chaque MT appartient à une catégorie. Elle a un type, un acteur, un domaine, et un wording en 2 versions (IDEC + Utilisateur) décliné par niveau de criticité.

| Colonne | Type | Contrainte | Exemple |
|---|---|---|---|
| `id` | TEXT | PK | `MT_V1_032` |
| `category_id` | TEXT | FK → `categories.id` NOT NULL | `R1_CAT_01` |
| `mp_id` | TEXT | FK → `micro_parcours.id` NOT NULL | `R1` |
| `libelle` | TEXT | NOT NULL | `Évaluer l'impact professionnel` |
| `type` | TEXT | CHECK `STRUC/SEC/MED/INFO/ORGA` NOT NULL | `ORGA` |
| `acteur` | TEXT[] | NOT NULL | `{IDEC}` ou `{IDEC,MT}` |
| `domaine` | TEXT | CHECK `medical/medico_social` NOT NULL | `medico_social` |
| `is_contributive` | BOOL | NOT NULL DEFAULT false | `false` |
| `is_prevention` | BOOL | NOT NULL DEFAULT false | `false` |
| `ordre` | INT | NOT NULL | `1` |
| `wording_idec` | TEXT | NOT NULL | `Évaluer avec l'aidant les conséquences…` |
| `wording_utilisateur` | TEXT | NOT NULL | `Faites le point sur l'impact…` |
| `wording_std` | TEXT | | Version Standard utilisateur |
| `wording_ccc` | TEXT | | Version CCC utilisateur |
| `wording_crit` | TEXT | | Version Critique utilisateur |

> **Pourquoi les 3 wordings en colonnes et pas en table séparée ?**  
> Chaque MT a **exactement 0 à 3 versions**. Pas de liste variable. C'est un cas classique où des colonnes nullable sont plus efficaces qu'un JOIN supplémentaire. Le clinical engine fait `SELECT wording_ccc FROM micro_taches WHERE category_id = X` au lieu de joindre une table de wordings.

> **Pourquoi `mp_id` en plus de `category_id` ?**  
> Dénormalisation volontaire. 90% des requêtes filtrent par MP. Sans ça, chaque requête ferait `JOIN categories ON categories.id = micro_taches.category_id WHERE categories.mp_id = 'R1'`. Avec, c'est un simple `WHERE mp_id = 'R1'`.

---

### 4. `recommendations`

Le texte "chapeau" affiché pour chaque catégorie à chaque niveau. C'est un label court (pas une tâche), décliné par niveau et par cible (Utilisateur/IDEC).

| Colonne | Type | Contrainte | Exemple |
|---|---|---|---|
| `id` | TEXT | PK | `R1_CAT_01_STD` |
| `category_id` | TEXT | FK → `categories.id` NOT NULL | `R1_CAT_01` |
| `mp_id` | TEXT | FK → `micro_parcours.id` NOT NULL | `R1` |
| `niveau` | TEXT | CHECK `standard/ccc/critique/prevention` NOT NULL | `standard` |
| `wording_utilisateur` | TEXT | NOT NULL | `Accompagnement social disponible` |
| `wording_idec` | TEXT | NOT NULL | `Informer sur les dispositifs AS` |

> Contrainte d'unicité : `UNIQUE(category_id, niveau)` — une seule reco par catégorie par niveau.

---

## Requêtes types du Clinical Engine

### "Quoi afficher pour cet aidant ?"

```sql
-- 1. Évaluer les règles → catégories activées
WITH activated AS (
  SELECT category_id, niveau, delai_jours
  FROM activation_rules
  WHERE mp_id = :mp_id
    AND matches(condition_logic, :answers)
),
-- 2. Garder le niveau max par catégorie
best AS (
  SELECT DISTINCT ON (category_id) *
  FROM activated
  ORDER BY category_id,
    CASE niveau WHEN 'critique' THEN 1 WHEN 'ccc' THEN 2 WHEN 'standard' THEN 3 END
)
-- 3. Récupérer recos + MT en une requête
SELECT 
  r.wording_utilisateur AS reco,
  mt.libelle, mt.type, mt.acteur,
  CASE b.niveau 
    WHEN 'critique' THEN COALESCE(mt.wording_crit, mt.wording_utilisateur)
    WHEN 'ccc' THEN COALESCE(mt.wording_ccc, mt.wording_utilisateur)
    ELSE COALESCE(mt.wording_std, mt.wording_utilisateur)
  END AS mt_wording
FROM best b
JOIN recommendations r ON r.category_id = b.category_id AND r.niveau = b.niveau
JOIN micro_taches mt ON mt.category_id = b.category_id AND mt.is_prevention = false
ORDER BY mt.ordre;
```

### "Et si rien ne se déclenche ?"

```sql
-- Mode prévention
SELECT r.wording_utilisateur AS reco, mt.libelle, mt.wording_utilisateur
FROM recommendations r
JOIN micro_taches mt ON mt.category_id = r.category_id AND mt.is_prevention = true
WHERE r.mp_id = :mp_id AND r.niveau = 'prevention';
```

### "Tout le contenu d'un MP pour debug"

```sql
SELECT c.nom AS categorie, 
       ar.id AS regle, ar.niveau, ar.condition_logic,
       mt.libelle AS tache, mt.type, mt.acteur,
       rec.wording_utilisateur AS reco
FROM categories c
LEFT JOIN activation_rules ar ON ar.category_id = c.id
LEFT JOIN micro_taches mt ON mt.category_id = c.id
LEFT JOIN recommendations rec ON rec.category_id = c.id AND rec.niveau = ar.niveau
WHERE c.mp_id = :mp_id
ORDER BY c.ordre, ar.niveau, mt.ordre;
```

---

## Avantages de ce design

| Critère | Comment c'est résolu |
|---|---|
| **FK propres** | Toutes les relations sont des FK réelles. Pas de TEXT[] orphelins. |
| **1 règle = 1 ligne** | Plus de `category_ids[]`. Une règle → une catégorie. Les règles multi-cat sont liées par `rule_group`. |
| **JOINs naturels** | `category_id` est la clé de jointure partout. Un seul JOIN pour aller de la règle à la MT. |
| **Dénormalisation ciblée** | `mp_id` sur chaque table → filtre rapide sans JOIN. |
| **Wording simple** | 3 colonnes pour 3 niveaux fixes. Pas de table intermédiaire. |
| **Prévention intégrée** | Même tables, booléen `is_prevention` + niveau `prevention`. Pas de table spéciale. |

---

## Résumé

```
14 tables (legacy mess)  →  9 tables (clean)

Socle figé : vulnerabilities, questions, micro_parcours, 
             question_mp_mapping, suivi_questions

Couche clinique : categories → activation_rules
                             → micro_taches  
                             → recommendations
```

> 📐 **Rien à implémenter pour l'instant.** Ce doc est la cible. L'étape suivante sera l'extraction des données depuis les templates officiels + validation + migration.
