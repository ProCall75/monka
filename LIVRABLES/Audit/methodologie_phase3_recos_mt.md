# 🔧 Méthodologie Phase 3 — Affiliation MP → Recos → MT

> **Date** : 10/02/2026  
> **Statut** : 🟡 Proposition — à valider avant exécution  
> **Objectif** : Transformer les données legacy brutes en recos structurées rattachées aux MP via les activation_rules

---

## 1. Le Problème

Aujourd'hui en base :

```
recommendations_legacy (707 lignes)     micro_taches (299 MT)
  question_id → réponse → texte reco      vulnerability_id → libellé → type
  PAS de lien vers MP                      PAS de lien vers reco
  PAS de lien vers activation_rule         PAS de lien vers MP
```

On veut arriver à :

```
MP → activation_rule → reco → MT
  Chaque reco sait à quel MP elle appartient
  Chaque reco sait quelle règle l'a déclenchée
  Chaque MT sait à quelle reco elle contribue
```

---

## 2. La Méthode en 3 Étapes

### Étape 1 : MP → Recos (regroupement + dédoublonnage)

**Input** : 316 textes de reco legacy (liés à des questions/réponses) + 68 activation_rules (liées à des MP)

**Comment** :
1. Pour chaque MP, récupérer toutes les recos legacy via `question_mp_mapping`
2. **Dédoublonner** : beaucoup de recos sont identiques pour des réponses différentes (ex: "Contacter le médecin traitant" apparaît 15 fois)
3. **Regrouper par thème** : les recos d'un même MP qui disent la même chose → fusionnées en 1 reco
4. **Lier à l'activation_rule** : chaque reco regroupée est rattachée à la règle d'activation la plus pertinente (par les questions qu'elle couvre)

**Output** : ~50-120 recos structurées, chacune avec :
- `mp_id` (quel MP)
- `activation_rule_id` (quelle règle la déclenche)
- `texte_utilisateur` (wording aidant)
- `texte_idec` (wording IDEC)
- `acteurs` (professionnels)
- `source` : **"legacy"** si le texte vient directement du CAT, **"ia_proposé"** si l'IA a reformulé ou créé

**Traçabilité legacy vs IA** :
| Cas | Source | Marquage |
|-----|--------|----------|
| Texte reco existant dans le legacy, recopié tel quel | `legacy` | ✅ Aucune modification |
| Texte reco existant mais reformulé/fusionné par l'IA | `ia_reformulé` | ⚠️ Original legacy conservé en commentaire |
| Texte reco créé par l'IA (MP sans reco legacy) | `ia_proposé` | 🤖 Marqué clairement pour validation Dr. Monka |

### Étape 2 : Recos → MT (rattachement V1-V5)

**Input** : ~50-120 recos structurées + 299 MT

**Comment** :
Le travail de matching MT → reco est un travail IA sur **toutes les vulnérabilités** (V1 compris) :

1. **V1** (41 MT) : on a le `question_id` comme indice → permet de cibler le MP, mais le rattachement à la **bonne reco** au sein du MP reste un matching IA
2. **V2-V5** (258 MT) : pas de `question_id` → matching 100% sémantique :
   - Comparer le libellé de chaque MT avec le texte des recos du même MP/V
   - Proposer l'affiliation la plus logique

**Toutes les affiliations MT→reco sont `ia_proposé`** → validation Dr. Monka requise.

**Output** : chaque MT a un `reco_id` (sa reco parente)

**Traçabilité** :
| Cas | Source | Marquage |
|-----|--------|----------|
| MT V1 rattachée via question_id + contexte | `ia_proposé` | 🤖 question_id comme indice, affectation IA |
| MT V2-V5 rattachée par matching sémantique | `ia_proposé` | 🤖 Matching à valider par Dr. Monka |

### Étape 3 : Vérification de couverture par niveau

**Input** : ~50-120 recos structurées, chacune déjà liée à une `activation_rule` (qui définit son niveau)

**Pourquoi pas de "déclinaison 4 niveaux" ?**

Dans le nouveau modèle, chaque reco **est déjà à son niveau** via sa règle d'activation. On ne décline plus 1 reco × 4 versions. Ce qu'on vérifie :

| Vérification | Pourquoi |
|---|---|
| Le MP a au moins 1 reco pour chaque niveau d'activation possible | Si le MP peut être activé en 🔴, il faut une reco 🔴 |
| Le MP a une reco ⚪ prévention | Règle K4 : chaque MP a des recos de prévention même sans activation |
| Les trous sont identifiés | ex: MP F5 a seulement 5% de couverture → gap à signaler |

**Output** : rapport de couverture par MP × niveau avec :
- ✅ Niveaux couverts par le legacy
- ⚠️ Niveaux sans reco → à compléter (flag pour Dr. Monka)

**Traçabilité** :
| Cas | Source | Marquage |
|-----|--------|----------|
| Niveau couvert par une reco legacy existante | `legacy` | ✅ |
| Niveau non couvert → reco proposée par l'IA | `ia_proposé` | 🤖 À valider |

---

## 3. Les Livrables

Chaque livrable sera un document markdown avec :
- Le contenu proposé
- Un badge `[LEGACY]` ou `[IA]` sur chaque item 
- Les données originales en commentaire pour comparaison

| # | Livrable | Contenu |
|---|----------|---------|
| 1 | **Recos structurées par MP** | Pour chaque MP : ses recos, leur source, leur règle d'activation |
| 2 | **MT rattachées aux recos** | Pour chaque reco : ses MT, le type de chaque MT, le matching source |
| 3 | **Rapport couverture niveaux** | Pour chaque MP : quels niveaux sont couverts, quels gaps |

---

## 4. Contrôle Qualité

### Règles de non-perte

| Vérification | Méthode |
|--------------|---------|
| 0 reco legacy perdue | Chaque texte reco legacy (316) est rattaché à au moins 1 reco structurée |
| 0 MT perdue | Chaque MT (299) est rattachée à exactement 1 reco |
| 0 MP sans reco | Les 24 MP ont au moins 1 reco (même si `ia_proposé`) |
| Cohérence activation | Chaque reco est liée à une activation_rule existante |

### Validation Dr. Monka

Le médecin recevra un document consolidé avec :
- ✅ Items `legacy` : à vérifier rapidement (copie fidèle)
- 🤖 Items `ia_proposé` ou `ia_reformulé` : à valider attentivement
- Propositions de corrections/compléments

---

## 5. Estimation de Charge

| Étape | Travail IA | Validation Dr. Monka |
|-------|-----------|---------------------|
| 1. MP → Recos | ~2h (regroupement + dédoublonnage) | ~1h (vérifier les fusions) |
| 2. Recos → MT (V1-V5) | ~2h (matching sémantique toutes V) | ~2h (valider les rattachements) |
| 3. Couverture niveaux | ~30min (vérification) | ~30min (valider les gaps identifiés) |

---

## 6. Schéma Cible Supabase

```sql
-- Table finale (remplace recommendations_legacy)
CREATE TABLE recommendations (
  id TEXT PRIMARY KEY,           -- ex: "R2_RECO_01"
  mp_id TEXT → micro_parcours,   -- à quel MP
  activation_rule_id TEXT → activation_rules,  -- quelle règle
  niveau TEXT,                   -- critique/ccc/standard/prévention
  ordre_affichage INT,           -- ordre dans le MP
  texte_utilisateur TEXT,        -- wording aidant
  texte_idec TEXT,               -- wording pro
  acteurs TEXT[],                -- professionnels
  source TEXT,                   -- legacy / ia_reformulé / ia_proposé / ia_décliné
  legacy_ids INT[],              -- IDs des recommendations_legacy source
);

-- Update micro_taches : ajouter le lien vers reco
ALTER TABLE micro_taches ADD COLUMN reco_id TEXT → recommendations;
ALTER TABLE micro_taches ADD COLUMN matching_source TEXT;  -- legacy / ia_proposé
```

---

> **En résumé** : on part du legacy (707 lignes brutes + 299 MT), on regroupe, on dédoublonne, on rattache, on vérifie la couverture. À chaque étape, on marque clairement ce qui vient du legacy (`legacy`) et ce que l'IA a produit (`ia_proposé` / `ia_reformulé`). Dr. Monka valide uniquement les items IA.

---

## 7. Prérequis — Est-on prêts ?

| Prérequis | Statut |
|---|---|
| Tables Supabase `recommendations_legacy`, `micro_taches`, `scoring_questions` | ✅ Remplies |
| `activation_rules` (68 règles) | ✅ En base |
| `question_mp_mapping` (24 MP, 153 questions) | ✅ En base |
| `micro_parcours` (24 MP) | ✅ En base |
| Glossaire reco vs MT | ✅ `glossaire_reco_vs_mt.md` |
| Audit couverture actuelle | ✅ `audit_regroupement_recos_mt_par_mp.md` |
| Validation Dr. Monka architecture recos | 🟡 En attente (mais feedback oral positif) |
| Décision multi-MP (5 questions) | 🟡 En attente |
| Clarification aidance (5 questions "enfant") | 🟡 En attente |

> [!NOTE]
> Les items 🟡 sont des "nice to have" — ils ne bloquent PAS l'étape 1 (regroupement). On peut lancer et intégrer les retours Dr. Monka après.
>
> **Verdict : ✅ Prêts pour lancer la Phase 3.**
