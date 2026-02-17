# 🔄 Pipeline d'Extraction — Templates KERNEL → DB Supabase

> **Date** : 16/02/2026  
> **Objectif** : Processus standardisé pour extraire les données de chaque template MP officiel et les injecter dans la DB cible  
> **Principe** : Zéro perte de donnée. Chaque cellule du template → une colonne en DB.

---

## Pourquoi un format intermédiaire ?

Les templates sont du Markdown libre — riche pour l'humain, fragile pour un parser. Plutôt que parser du MD avec des regex fragiles, on passe par un **JSON structuré** par MP :

```
Template MD (source de vérité)
        │
        ▼ extraction manuelle assistée
  JSON structuré (1 fichier par MP)
        │
        ▼ validation automatique
  JSON validé (schéma + contrôles)
        │
        ▼ génération SQL
  INSERT INTO ... (migration)
```

**Avantages** :
- On voit exactement chaque donnée extraite avant de toucher la DB
- Le JSON est validable par schéma (pas le Markdown)
- Si un template évolue, on re-génère le JSON → on re-migre
- C'est reproductible pour les 24 MPs

---

## Le JSON intermédiaire — format par MP

Un fichier par MP. Ex: `R1.json`, `F3.json`, `S4.json`.

```json
{
  "mp_id": "R1",
  "vulnerability_id": "V1",
  "validated_by": ["Dr. Monka", "Antonin"],
  "validation_date": "2026-02-15",

  "categories": [
    {
      "id": "R1_CAT_01",
      "nom": "Accompagnement social (AS)",
      "description": "Orienter vers une assistante sociale pour les impacts administratifs et professionnels",
      "ordre": 1
    },
    {
      "id": "R1_CAT_02",
      "nom": "Répit et relais",
      "description": "Orienter vers la plateforme de répit du territoire pour alléger la charge quotidienne",
      "ordre": 2
    }
  ],

  "activation_rules": [
    {
      "id": "V1_R1_STD_01",
      "category_id": "R1_CAT_01",
      "niveau": "standard",
      "condition_logic": [
        { "q": "N7", "op": "in", "vals": ["Aménagement horaires", "Congés"] }
      ],
      "sens_clinique": "L'aidant a déjà modifié sa vie professionnelle pour assumer son rôle.",
      "delai_jours": 90,
      "rule_group": null
    },
    {
      "id": "V1_R1_CCC_01_a",
      "category_id": "R1_CAT_02",
      "niveau": "ccc",
      "condition_logic": [
        { "q": "O27", "op": "eq", "val": "Oui" },
        { "q": "O28", "op": "eq", "val": "Oui" }
      ],
      "sens_clinique": "Double impact : vie intime ET vie sociale touchées.",
      "delai_jours": 30,
      "rule_group": "V1_R1_CCC_01"
    },
    {
      "id": "V1_R1_CCC_01_b",
      "category_id": "R1_CAT_03",
      "niveau": "ccc",
      "condition_logic": [
        { "q": "O27", "op": "eq", "val": "Oui" },
        { "q": "O28", "op": "eq", "val": "Oui" }
      ],
      "sens_clinique": "Double impact : vie intime ET vie sociale touchées.",
      "delai_jours": 30,
      "rule_group": "V1_R1_CCC_01"
    }
  ],

  "micro_taches": [
    {
      "id": "MT_V1_032",
      "category_id": "R1_CAT_01",
      "libelle": "Évaluer l'impact professionnel",
      "type": "ORGA",
      "acteur": ["IDEC"],
      "domaine": "medico_social",
      "is_contributive": false,
      "is_prevention": false,
      "ordre": 1,
      "wording_idec": "Évaluer avec l'aidant les conséquences de l'aidance sur sa situation professionnelle",
      "wording_utilisateur": "Faites le point sur l'impact de votre rôle d'aidant sur votre travail",
      "wording_std": "Faites le point sur l'impact sur votre travail",
      "wording_ccc": "Évaluez rapidement l'impact sur votre travail",
      "wording_crit": "Évaluez dès maintenant l'impact sur votre travail"
    },
    {
      "id": "MT_V1_R1_PREV_01",
      "category_id": "R1_CAT_01",
      "libelle": "Sensibiliser l'aidant aux signes d'impact",
      "type": "INFO",
      "acteur": ["IDEC"],
      "domaine": "medico_social",
      "is_contributive": false,
      "is_prevention": true,
      "ordre": 1,
      "wording_idec": "Profiter du prochain contact pour aborder les changements de vie liés à l'aidance",
      "wording_utilisateur": "Soyez attentif aux changements dans votre quotidien liés à votre rôle d'aidant",
      "wording_std": null,
      "wording_ccc": null,
      "wording_crit": null
    }
  ],

  "recommendations": [
    {
      "id": "R1_CAT_01_STD",
      "category_id": "R1_CAT_01",
      "niveau": "standard",
      "wording_utilisateur": "Accompagnement social disponible",
      "wording_idec": "Informer sur les dispositifs AS"
    },
    {
      "id": "R1_CAT_01_CCC",
      "category_id": "R1_CAT_01",
      "niveau": "ccc",
      "wording_utilisateur": "Accompagnement social recommandé",
      "wording_idec": "Orienter vers l'AS sous 30 jours"
    },
    {
      "id": "R1_CAT_01_PREV",
      "category_id": "R1_CAT_01",
      "niveau": "prevention",
      "wording_utilisateur": "L'aidance peut avoir un impact sur votre vie personnelle...",
      "wording_idec": "Surveiller l'apparition de signaux d'impact..."
    }
  ]
}
```

---

## Correspondance section template → champ JSON

| Section du template | Tableau à lire | Champs JSON extraits |
|---|---|---|
| ACTION 1 — Catégories validées | `Catégorie ID / Nom / Description` | `categories[].id, nom, description` |
| ACTION 2 — Récapitulatif règles | `Règle ID / Catégorie / Niveau / Condition` | `activation_rules[].id, category_id, niveau, condition_logic` |
| ACTION 2 — Blocs SI/ALORS | Texte libre sous chaque règle | `activation_rules[].sens_clinique, delai_jours` |
| ACTION 2 — Règles multi-CAT | `ALORS → CAT_01 + CAT_02` | Dupliquer la règle avec `rule_group` |
| ACTION 3 — MT par catégorie | `MT_ID / Libellé / Type / Acteur / 📍💡` | `micro_taches[].id, libelle, type, acteur, is_contributive` |
| ACTION 4 — Tableau consolidé | `Domaine / 📍💡 / Catégorie` | `micro_taches[].domaine, category_id` |
| ACTION 5 Ph.1 — Wording MT | `Wording IDEC / Wording Utilisateur` | `micro_taches[].wording_idec, wording_utilisateur` |
| ACTION 5 Ph.2 — Versioning MT | `🟢 Standard / 🟠 CCC / 🔴 Critique` | `micro_taches[].wording_std, wording_ccc, wording_crit` |
| ACTION 5 Ph.1 — Wording Recos | `Reco Utilisateur / Reco IDEC` | `recommendations[].wording_utilisateur, wording_idec` |
| ACTION 5 Ph.2 — Recos versionnées | `Niveau / Reco Utilisateur / Reco IDEC` | 1 entrée `recommendations[]` par niveau |
| ACTION 6 — Prévention reco | `⚪ Prévention` | `recommendations[]` avec `niveau: "prevention"` |
| ACTION 6 — MT prévention | `MT_ID / Libellé / Type` | `micro_taches[]` avec `is_prevention: true` |

---

## Contrôles de validation (avant injection en DB)

Un script de validation vérifie chaque JSON **avant** de générer le SQL :

### Contrôles structurels

| # | Contrôle | Règle |
|---|---|---|
| 1 | Chaque `category.id` commence par `{mp_id}_CAT_` | Format imposé |
| 2 | Chaque `activation_rules[].category_id` existe dans `categories[]` | FK valide |
| 3 | Chaque `micro_taches[].category_id` existe dans `categories[]` | FK valide |
| 4 | Chaque `recommendations[].category_id` existe dans `categories[]` | FK valide |
| 5 | `niveau` ∈ `{standard, ccc, critique, prevention}` | Enum valide |
| 6 | `type` ∈ `{STRUC, SEC, MED, INFO, ORGA}` | Enum valide |
| 7 | `domaine` ∈ `{medical, medico_social}` | Enum valide |
| 8 | `acteur` est un array non vide | Format valide |
| 9 | `delai_jours` ∈ `{7, 30, 90}` | Valeurs standards |

### Contrôles cliniques (K3 / complétude)

| # | Contrôle | Règle |
|---|---|---|
| 10 | Chaque catégorie a ≥ 2 niveaux de règles (sauf justification) | K3 |
| 11 | Chaque catégorie a ≥ 1 MT contributive | ASR |
| 12 | Chaque catégorie a une reco `prevention` | ACTION 6 |
| 13 | Aucune MT sans `wording_idec` ou `wording_utilisateur` | Complétude |
| 14 | Chaque reco a un `wording_utilisateur` ET `wording_idec` | Complétude |
| 15 | Nombre total catégories = nombre dans SYNTHÈSE FINALE du template | Cross-check |
| 16 | Nombre total MT = nombre dans SYNTHÈSE FINALE | Cross-check |
| 17 | Nombre total règles = nombre dans SYNTHÈSE FINALE | Cross-check |
| 18 | `question_ids` dans `condition_logic` existent dans la DB `questions` | FK valide |

---

## Processus d'extraction — MP par MP

```
Pour chaque MP officiel (✅ 8/8) :

1. EXTRAIRE  — Lire le template MD, remplir le JSON
              (assisté par IA, validé manuellement)

2. VALIDER   — Passer le JSON dans le script de validation
              (18 contrôles automatiques)

3. COMPARER  — Cross-check avec la SYNTHÈSE FINALE du template
              (mêmes chiffres = OK)

4. REVIEW    — Lecture humaine du JSON
              (Antonin vérifie que rien ne manque)

5. INJECTER  — Générer les INSERT SQL à partir du JSON validé
              (script automatique)
```

### Ordre de traitement

| # | MP | V | Questions | Statut template |
|---|---|---|---|---|
| 1 | R1 | V1 | 3 | ✅ Officiel |
| 2 | R2 | V1 | 4 | ✅ Officiel |
| 3 | R3 | V1 | 3 | ✅ Officiel |
| 4 | R4 | V1 | 5 | ✅ Officiel |
| 5-8 | S1-S4 | V3 | 4-9 | ✅ / En cours |
| 9-12 | A1-A4 | V2 | varies | ✅ / En cours |
| 13-18 | F1-F6 | V4 | 7-12 | ✅ / En cours |
| 19-24 | M1-M6 | V5 | varies | En cours |

> On commence par V1 (4 MPs, tous ✅ Officiel) comme pilote. Une fois le processus rodé, on enchaîne les 20 restants.

---

## Résumé

| Étape | Quoi | Qui |
|---|---|---|
| Template MD | Source de vérité officielle | Dr. Monka + Antonin |
| JSON structuré | Format intermédiaire validable | IA + Antonin |
| Validation 18 checks | Script automatique zéro perte | Script Python |
| SQL INSERT | Migration vers DB cible | Script Python |

> 📐 **Le JSON est le contrat.** Si le JSON est bon, la DB sera bonne. Toute la rigueur est dans l'extraction MD → JSON, pas dans le JSON → SQL (qui est mécanique).
