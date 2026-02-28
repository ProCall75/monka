# 🗄️ AUDIT BASE DE DONNÉES — Deep Dive Complet

**Date** : 27 février 2026 — 21h50  
**Source** : Requêtes live Supabase + cross-référence code source  
**Scope** : 18 tables, 168 colonnes, 3 782 lignes

---

## 1. CARTOGRAPHIE COMPLÈTE

### 1.1 Vue d'ensemble

| Table | Colonnes | Lignes | Rôle |
|---|---|---|---|
| `questions` | 15 | 165 | Questions cliniques du questionnaire |
| `vulnerabilities` | 6 | 5 | V1-V5 vulnérabilités |
| `micro_parcours` | 9 | 24 | Parcours d'accompagnement |
| `categories` | 5 | 73 | Catégories de chaque MP |
| `activation_rules` | 11 | 240 | Règles d'activation (condition_logic JSONB) |
| `scoring_questions` | 8 | 345 | Matrice question→score |
| `scoring_thresholds` | 8 | 20 | Seuils par vulnérabilité (4 niveaux × 5V) |
| `recommendations` | 7 | 202 | Recos par catégorie/niveau |
| `micro_taches` | 23 | 390 | Tâches opérationnelles |
| `content_blocks` | 7 | 450 | Blocs de texte clinique (sens, justifications) |
| `guides` | 12 | 42 | Guides pratiques aidants |
| `guide_mt_mapping` | 3 | 61 | Mapping guides → micro-tâches |
| `persona_answers` | 5 | 1203 | Réponses pré-remplies des 8 personas |
| `personas` | 17 | 8 | Profils persona (5 simples + 3 combos) |
| `question_mp_mapping` | 8 | 155 | Mapping questions → micro-parcours |
| `suivi_questions` | 9 | 30 | Questions de suivi post-évaluation |
| `cr_templates` | 7 | **0** | Templates CR médecin |
| `micro_taches_backup_20260221` | 18 | 369 | ⚠️ Backup stale |

---

## 2. INTÉGRITÉ RELATIONNELLE

### 2.1 Vérification d'orphelins (FK logiques)

| Check | Résultat |
|---|---|
| `activation_rules.category_id` → `categories.id` | ✅ **0 orphelins** |
| `activation_rules.mp_id` → `micro_parcours.id` | ✅ **0 orphelins** |
| `scoring_questions.question_id` → `questions.id` | ✅ **0 orphelins** |
| `recommendations.category_id` → `categories.id` | ✅ **0 orphelins** |
| `micro_taches.category_id` → `categories.id` | ✅ **0 orphelins** |
| `persona_answers.question_id` → `questions.id` | ✅ **0 orphelins** |
| `persona_answers.persona_id` → `personas.id` | ✅ **0 orphelins** |

### 2.2 🔴 ANGLE MORT : Aucune contrainte FK dans la base

**Constat** : Toutes les colonnes `*_id` sont de type `text` sans `REFERENCES`. Il n'y a **AUCUNE** foreign key constraint dans le schéma PostgreSQL.

**Risque** : Si quelqu'un insère via le dashboard Supabase ou un script une `activation_rule` avec un `category_id` inexistant, aucune erreur ne sera levée. L'intégrité repose uniquement sur la discipline humaine.

**Verdict** : ⚠️ Acceptable pour un outil interne avec données de test gérées par scripts. Mais un CTO pourrait poser la question.

**Mitigation** : Les données sont en read-only (RLS), donc aucune insertion n'est possible via l'API. Le risque n'existe que via le dashboard admin Supabase.

---

## 3. ANALYSE DES NULLS

| Colonne | NULLs | Attendu ? |
|---|---|---|
| `questions.vulnerability_id` | **15** | ✅ Oui — ce sont les triggers (is_trigger=true), qui n'appartiennent à aucune vulnérabilité |
| `questions.aidance` | 0 | ✅ Toutes assignées |
| `questions.response_type` | 0 | ✅ Toutes typées |

---

## 4. SCORING ENGINE — VÉRIFICATION CROISÉE

### 4.1 Seuils de scoring (scoring_thresholds)

| Vuln | Faible | Modéré | Élevé | Critique | Max | Couverture |
|---|---|---|---|---|---|---|
| V1 | 0-3 | 4-6 | 7-9 | 10-13 | 13 | ✅ 0→13 sans trou |
| V2 | 0-2 | 3-4 | 5-6 | 7-8 | 8 | ✅ 0→8 sans trou |
| V3 | 0-4 | 5-9 | 10-14 | 15-19 | 19 | ✅ 0→19 sans trou |
| V4 | 0-11 | 12-22 | 23-33 | 34-44 | 44 | ✅ 0→44 sans trou |
| V5 | 0-3 | 4-7 | 8-11 | 12-15 | 15 | ✅ 0→15 sans trou |

**Poids des vulnérabilités** : V1(0.15) + V2(0.10) + V3(0.25) + V4(0.30) + V5(0.20) = **1.00** ✅

### 4.2 🟡 ANGLE MORT : QUESTION_SCORE_CAP hardcodé

**Constat** : Dans `clinicalEngine.ts` lignes 196-199 :
```ts
const QUESTION_SCORE_CAP: Record<string, number> = {
    E19: 1,
    O16: 1,
}
```

**Risque** : Si une nouvelle question multi-select nécessite un cap, il faut modifier le code source. Ce n'est pas en base. Un CTO pourrait demander pourquoi cette logique n'est pas dans `scoring_questions`.

**Verdict** : ⚠️ dette technique légère. Le cap est documenté dans le code avec un commentaire, mais il devrait idéalement être une colonne dans `scoring_questions`.

---

## 5. QUESTIONS CHOIX MULTIPLE — ANALYSE COMPLÈTE

### 5.1 Inventaire des 29 questions `choix_multiple`

| ID | Options | Scorante ? | Thème |
|---|---|---|---|
| N3 | 5 | Non (trigger) | Type d'aidance — **question critique** |
| N5 | 5 | Non | Aides utilisées |
| N7 | 3 | Non | Aménagement travail |
| N10 | 5 | Non | Type d'aide apportée |
| N17 | 10 | Non | Type de handicap |
| N26 | 13 | Non | Besoins exprimés |
| N29 | 23 | Non | Aides financières connues |
| N31 | 15 | Non | Équipements disponibles |
| N32 | 8 | Non | Aides techniques |
| N37 | 7 | Non | Type d'addiction |
| N43 | 10 | Non | Structures connues |
| E3 | 3 | Non | Personnes à charge |
| E19 | 8 | **OUI** (capped) | Soucis de santé aidant |
| E40 | 8 | Non | Difficultés quotidiennes |
| E48 | 6 | Non | Suivi psy |
| E49 | 6 | Non | Type professionnel |
| E58 | 5 | Non | Évaluation gériatrique |
| E60 | 8 | Non | Scolarité enfant |
| E62 | **23** | Non | Aides financières demandées |
| E63 | 8 | Non | Démarches administratives |
| O15 | 3 | Non | Mesures de protection |
| O16 | **16** | **OUI** (capped) | Maladies du proche |
| O19 | 15 | Non | Spécialistes consultés |
| O21 | 11 | Non | Difficultés sensorielles |
| O22 | 6 | Non | Troubles cognitifs |
| O39 | 15 | Non | Professionnels autour |
| O41 | 11 | Non | Difficultés motrices |
| O42 | 15 | Non | Aide à domicile |
| O59 | 13 | Non | Dispositifs existants |

### 5.2 🔴 ANGLE MORT : Seules 2 questions multi-select sont scorantes

**Constat** : Sur 29 questions `choix_multiple`, seules **E19** et **O16** sont dans `scoring_questions`. Le fix multi-select impacte le scoring UNIQUEMENT pour ces 2 questions.

**Implication** : Le fix multi-select a un impact fonctionnel large (29 questions UI) mais un impact scoring restreint (2 questions). Les 27 autres questions multi-select sont "informatives" pour le moteur d'activation (condition_logic).

### 5.3 🔴 ANGLE MORT : persona_answers stocke du pipe-delimited ET du simple

**Constat live** : Pour la persona C1, la réponse N3 est :
```
J'aide une personne en perte d'autonomie...|J'aide une personne souffrant de troubles psychiques...
```

Mais pour C1/E19, la réponse est simplement `"Douleurs"` (un seul choix parmi 8 pour une question `choix_multiple`).

**Risque** : Le format des `persona_answers` est **incohérent** — parfois pipe-delimited (N3), parfois simple string même pour des multi-select. Le code `helpers.ts` L142 gère le pipe pour N3 mais pas pour les autres.

**Implication** : Quand le fix multi-select sera fait (migration vers `string[]`), il faudra aussi adapter la logique de chargement des `persona_answers` depuis la DB.

---

## 6. CONTENT BLOCKS — UTILISATION

### 6.1 Distribution par entity_type + block_type

| Entity Type | Block Type | Count | Utilisé dans le code ? |
|---|---|---|---|
| `category` | `sens_clinique` | 73 | ✅ `ScoringDocumentView`, `MPDocumentView` |
| `micro_parcours` | `sens_clinique` | 24 | ✅ `MPDocumentView` |
| `micro_parcours` | `justification_categories` | 24 | ✅ `MPDocumentView` |
| `micro_parcours` | `justification_questions` | 24 | ✅ `MPDocumentView` |
| `micro_parcours` | `justification_acteurs` | 24 | ✅ `MPDocumentView` |
| `micro_parcours` | `liens_inter_mp` | 24 | ✅ `MPDocumentView` |
| `micro_parcours` | `matrice_patho_specialiste` | 1 | ⚠️ 1 seul bloc sur 24 MPs |
| `question` | `scoring_justification` | 150 | ✅ `ScoringDocumentView` |
| `question` | `scoring_ponderation` | 6 | ✅ `ScoringDocumentView` |
| `scoring` | `scoring_justification` | 95 | ✅ `ScoringDocumentView` |
| `vulnerability` | `sens_clinique` | 5 | ✅ `ScoringDocumentView`, `VulnOverviewTabs` |

### 6.2 🟡 ANGLE MORT : `matrice_patho_specialiste` — 1 bloc sur 24 MPs

**Constat** : Seul 1 micro-parcours a un bloc `matrice_patho_specialiste` (sur 24). Si le code attend ce bloc pour tous les MPs, 23 retourneront `null`.

**Verdict** : Probablement un bloc spécifique à un MP. Le code utilise `getContentBlock()` qui retourne `null` si absent — pas de crash, mais potentiel affichage vide.

---

## 7. TABLES PROBLÉMATIQUES

### 7.1 🔴 `cr_templates` — 0 LIGNES

**Constat** : La table existe (7 colonnes, schema complet) mais contient **0 lignes**. Le code `getCRTemplate()` et `getCRTemplatesForType()` dans `helpers.ts` requêtent cette table.

**Impact code** :
- `SimulatorCRTab.tsx` utilise `getCRTemplate()` → retourne toujours `null`
- `CRMedecinDocument.tsx` pourrait afficher des sections vides
- `crMedecinPhrases.ts` génère les phrases du CR médecin (mais en dur, pas depuis les templates)

**Verdict** : ⚠️ La fonctionnalité CR Médecin fonctionne via `crMedecinPhrases.ts` (hardcodé) et non via les templates DB. La table est une structure préparée pour le futur mais non peuplée. Le code a des fallbacks.

### 7.2 🟡 `micro_taches_backup_20260221` — Backup stale

**Constat** : 369 lignes, 18 colonnes (vs 390/23 dans la table principale). C'est un snapshot du 21 février avec 5 colonnes de moins.

**Risque** : Aucun — la table a RLS activé sans policy, donc inaccessible via API. Mais elle encombre le schéma.

**Action suggérée** : Documenter ou supprimer après livraison.

---

## 8. HARDCODED VALUES DANS LE CODE

### 8.1 Vulnérabilités V1-V5

| Fichier | Usage |
|---|---|
| `engine/types.ts` L13 | `type VulnerabilityId = 'V1' \| 'V2' \| ... \| 'V5'` |
| `engine/constants.ts` L77 | `VULN_IDS: VulnerabilityId[] = ['V1', 'V2', 'V3', 'V4', 'V5']` |
| `engine/constants.ts` L30-67 | `VULN_META` — noms, couleurs, icônes par V |
| `engine/clinicalEngine.ts` L298 | `const vulns: VulnerabilityId[] = ['V1', 'V2', 'V3', 'V4', 'V5']` |
| `pages/SimulatorPage.tsx` L65 | `useState<VFilter>('V1')` default |
| `pages/VulnerabilitiesPage.tsx` L12 | `useState<string>('V1')` default |

**Verdict** : ⚠️ V1-V5 sont hardcodées à la fois comme type TypeScript et dans les constantes. Si une V6 est ajoutée, il faut modifier 4 fichiers. C'est un choix d'architecture (le nombre de vulnérabilités est fixe dans le modèle clinique de Monka), mais ce n'est pas dynamique.

**Ce que le CTO pourrait demander** : *"Si on ajoute une V6, combien de fichiers faut-il modifier ?"* → Réponse : 4 fichiers + la DB.

### 8.2 Aidance blocks

| Fichier | Usage |
|---|---|
| `engine/helpers.ts` L127-136 | `N3_TO_AIDANCE_BLOCKS` — mapping N3 réponses → blocs |
| `engine/helpers.ts` L134-136 | `ENFANT_AGE_BRACKETS`, `SENIOR_AGE_BRACKETS`, `ENFANT_ELIGIBLE_AIDANCE` |

**Verdict** : ⚠️ La logique de filtrage conditionnelle (quel bloc est actif selon N3+O1) est hardcodée. Si une nouvelle option est ajoutée à N3 dans la DB, le code ne la reconnaîtra pas.

### 8.3 Score caps

| Fichier | Usage |
|---|---|
| `engine/clinicalEngine.ts` L196-199 | `QUESTION_SCORE_CAP = { E19: 1, O16: 1 }` |

**Verdict** : ⚠️ Ces caps devraient être en DB (colonne `max_points_per_question` dans `scoring_questions`).

---

## 9. CROSS-RÉFÉRENCE CODE ↔ DB

### 9.1 Requêtes (queries.ts)

| Requête | Tables | Colonnes demandées | Conformité |
|---|---|---|---|
| `fetchAllData()` | 13 tables (all except backup, guide_mt_mapping, guides) | `select('*')` | ✅ Conforme |
| Persona answers fetch | `persona_answers` + `personas` | `select('*')` | ✅ |
| Guides fetch | `guides` | `select('*')` | ✅ |

**Remarque** : Toutes les requêtes utilisent `select('*')` — aucune optimisation de colonnes. Pour un outil interne avec peu de données, c'est acceptable. Pour une app B2C avec des milliers de requêtes, il faudrait sélectionner les colonnes nécessaires.

### 9.2 🟡 ANGLE MORT : `select('*')` charge 23 colonnes pour `micro_taches`

**Constat** : La table `micro_taches` a 23 colonnes. Avec 390 lignes, `select('*')` charge toute la table en mémoire à chaque page load (via `useMonkaData`).

**Verdict** : ⚪ Acceptable pour 390 lignes. Deviendrait un problème à 10 000+ lignes.

### 9.3 Tables NON requêtées par le code

| Table | Requêtée ? | Utilisée ? |
|---|---|---|
| `micro_taches_backup_20260221` | ❌ | ❌ — Backup orphelin |
| `guide_mt_mapping` | ✅ (via join) | ✅ |
| `cr_templates` | ✅ | ⚠️ Retourne toujours vide (0 lignes) |

---

## 10. MATRICE DE PRIORITÉ DES BLIND SPOTS DB

| ID | Finding | Sévérité | Impact | Action |
|---|---|---|---|---|
| **DB1** | Pas de FK constraints | ⚠️ | Intégrité non garantie au niveau DB | 📋 Documenter |
| **DB2** | `cr_templates` vide (0 rows) | ⚠️ | CR Médecin fonctionne via fallback hardcodé | 📋 Documenter |
| **DB3** | persona_answers format incohérent (pipe vs simple) | 🟡 | Impact fix multi-select | ✅ À traiter |
| **DB4** | QUESTION_SCORE_CAP hardcodé | 🟡 | Maintenabilité | 📋 Documenter |
| **DB5** | V1-V5 hardcodées (4 fichiers) | ⚪ | Modèle clinique fixe | 📋 Choix d'archi |
| **DB6** | N3_TO_AIDANCE_BLOCKS hardcodé | ⚠️ | Nouvelle option N3 → code à modifier | 📋 Documenter |
| **DB7** | Backup table stale | ⚪ | Encombre le schéma | 📋 Supprimer post-livraison |
| **DB8** | `select('*')` partout | ⚪ | Performance (non-critique à cette échelle) | 📋 Acceptable |
| **DB9** | `matrice_patho_specialiste` 1/24 MPs | ⚪ | Affichage potentiellement vide | 📋 Documenter |
| **DB10** | Policies public vs anon incohérentes | 🟡 | Rigueur | ⚠️ Harmoniser |
