# 🔍 AUDIT CCC COMPLET — Intra-V · Inter-MP · Cross-V

> **Date** : 22 février 2026  
> **Statut** : Audit exhaustif — document de référence  
> **Méthode** : 3 audits SQL live croisés sur toutes les 85 CCC existantes, 73 catégories, 150 questions, 24 MPs

---

## PARTIE A — AUDIT INTRA-V : couverture par catégorie

### Résultat : 72/73 catégories couvertes

Chaque catégorie de chaque MP a été vérifiée. **Une seule catégorie n'a aucune CCC** :

| Catégorie | MP | V | Statut | Observation |
|---|---|---|---|---|
| **S4_CAT_02** | S4 | V3 | 🔴 **NO_CCC** | Accès soins aidant — seul gap |

> **Sens clinique du gap S4_CAT_02** : S4 (Accès aux soins de l'aidant) est piloté par E15 (difficultés d'accès) et E16 (annulation). La CAT_01 a déjà un CCC E15+E16. La CAT_02 pourrait avoir un CCC similaire orienté sur le suivi (par ex. : "l'aidant annule ses RDV ET n'a aucun suivi spécialisé").

### Suggestion de CCC pour S4_CAT_02

```json
{
  "id": "V3_S4_CCC_02",
  "mp_id": "S4",
  "category_id": "S4_CAT_02",
  "niveau": "ccc",
  "delai_jours": 30,
  "condition_logic": [
    {"q": "E16", "op": "eq", "val": "Je les reporte ou les annule souvent"},
    {"q": "O39", "op": "eq", "val": "Aucun"}
  ],
  "sens_clinique": "L'aidant reporte/annule ses RDV ET il n'a aucun suivi spécialisé. Il n'est pas seulement dans le renoncement — il n'a AUCUN contact médical actif pour lui-même."
}
```

---

## PARTIE B — AUDIT INTER-MP : questions partagées entre MPs

### Cartographie des questions inter-MP dans les CCC existantes

23 usages inter-MP identifiés. Les questions "pivot" qui servent à plusieurs MPs :

| Question | MPs qui l'utilisent en CCC | Type | Sens du croisement |
|---|---|---|---|
| **E21** | A1, A3, **F1** | Cross V2↔V4 | "Maintien à domicile" — pivot admin/fragilité |
| **O53** | A2, **F5** | Cross V2↔V4 | "AGGIR évalué" — pivot droits/autonomie |
| **E1** | R2, **R4** | Intra V1 | "Répartition charge" — isolement↔conflits |
| **E42/E43** | M2, **M3** | Intra V5 | "Hospitalisations urgentes" — accès↔anticipation |
| **E46/E47** | M3, **M4** | Intra V5 | "Suivi post-hospit" — anticipation↔psy |
| **E52** | M3, **M5** | Intra V5 | "Coordination" — anticipation↔pilotage |
| **E54/E57** | M5, **M6** | Intra V5 | "Organisation" — pilotage↔évaluation |
| **E25** | F1, **F3** | Intra V4 | "Ressources" — socio-éco↔cognitif |
| **O6** | F1, **F6** | Intra V4 | "Chutes" — socio-éco↔mobilité |

> **Constat** : V5 est le meilleur élève avec 8 interconnexions inter-MP. V1 n'en a qu'une (E1 entre R2 et R4). V3 n'en a **aucune**.

### Gaps inter-MP par V

| V | Nb inter-MP existants | Gap identifié |
|---|---|---|
| V1 | 1 (E1: R2↔R4) | 🟠 R1↔R3 (impact pro + éloignement géo), R2↔R3 (isolement + éloignement) |
| V2 | 4 (via E21/O53 avec V4) | ✅ Correct — les questions charnières sont bien croisées |
| V3 | **0** | 🔴 Aucun croisement entre S1↔S2↔S3↔S4. Le MP S3 (santé physique) ne croise jamais S1 (charge) |
| V4 | 2 (E25: F1↔F3, O6: F1↔F6) | 🟠 F4 (santé proche) isolé — aucun lien avec F2 (dépendance) |
| V5 | 8 | ✅ Très bon maillage M2↔M3↔M4↔M5↔M6 |

### Suggestions inter-MP manquantes

#### V3 : S1 × S3 — Charge + Santé physique aidant

```json
{
  "id": "V3_S3_CCC_05_INTERMP",
  "mp_id": "S3",
  "category_id": "S3_CAT_01",
  "niveau": "ccc",
  "delai_jours": 30,
  "condition_logic": [
    {"q": "E7", "op": "in", "vals": ["Très fatigué·e", "Épuisé·e / au bord de craquer"]},
    {"q": "O44", "op": "eq", "val": "Moins bonne"}
  ],
  "sens_clinique": "La fatigue extrême (S1) combinée à la dégradation de santé perçue (S3) produit un signal de spirale descendante. L'aidant ne récupère plus physiquement de sa charge — le corps lâche."
}
```

#### V1 : R2 × R3 — Isolement + Éloignement géo

```json
{
  "id": "V1_R3_CCC_02_INTERMP",
  "mp_id": "R3",
  "category_id": "R3_CAT_01",
  "niveau": "ccc",
  "delai_jours": 30,
  "condition_logic": [
    {"q": "E2", "op": "in", "vals": ["Très peu / presque personne", "Personne"]},
    {"q": "O48", "op": "in", "vals": ["1x/3 mois", "1x/6 mois", "1x/an", "Autre"]}
  ],
  "sens_clinique": "Aucun entourage de confiance (R2) + visites très rares (R3). Le proche est doublement isolé : ni l'aidant ni personne d'autre n'est présent régulièrement. Situation de délaissement objectif."
}
```

#### V4 : F4 × F2 — Santé + Dépendance

```json
{
  "id": "V4_F4_CCC_04_INTERMP",
  "mp_id": "F4",
  "category_id": "F4_CAT_01",
  "niveau": "ccc",
  "delai_jours": 30,
  "condition_logic": [
    {"q": "O7", "op": "in", "vals": ["Oui et elle est dénutrie", "Oui mais elle se nourrit suffisamment"]},
    {"q": "E24", "op": "in", "vals": ["Oui, souvent", "Oui, en permanence"]}
  ],
  "sens_clinique": "Problème nutritionnel (F4) + surveillance permanente (F2). Le proche ne mange pas bien ET nécessite une présence constante — le risque de dégradation rapide est maximal si l'aidant défaille."
}
```

---

## PARTIE C — QUESTIONS ORPHELINES DE CCC

### 43 questions n'apparaissent dans aucune CCC

Parmi ces 43 questions, certaines ont des réponses cliniquement sévères qui pourraient justifier une CCC :

#### 🔴 Alertes critiques (questions qui DEVRAIENT être dans au moins 1 CCC)

| Question | V | Intitulé | Pourquoi c'est un gap |
|---|---|---|---|
| **N25** | V4 | "Exprime-t-elle des idées suicidaires ?" | **Urgence vitale** — devrait être CCC mono-sévère |
| **E27** | V4 | "Comportements potentiellement dangereux (gaz, feu)?" | **Sécurité immédiate** — devrait être CCC mono-sévère |
| **N22** | V4 | "Comportements à risque (automutilation)?" | **Danger** — devrait être CCC mono-sévère |
| **O17** | V5 | "A-t-elle un médecin traitant ?" | Non = désert total → CCC vers M2 ou M5 |

> ⚠️ **N25 (idées suicidaires) n'est dans AUCUNE CCC.** C'est la question la plus critique du questionnaire.

#### 🟠 Signaux importants (pourraient enrichir des CCC existantes)

| Question | V | Intitulé | Utilisation possible |
|---|---|---|---|
| E10 | V3 | "Stress/inquiétude aidant" | Compléter S1/S2 CCC |
| E14 | V3 | "Inquiétude sécurité 30j" | Compléter S2 CCC |
| N14 | V4 | "Difficulté suivi traitement" | Compléter F4 CCC |
| N24 | V4 | "Troubles mémoire/concentration" | Compléter F3 CCC |
| E22 | V4 | "Heures d'aide humaine" | Compléter F2 CCC |
| O29 | V3 | "Retentissement aidance sur santé" | Compléter S3 CCC |

#### ⚪ Questions de contexte (pas de CCC nécessaire)

Les 33 restantes sont des questions de contexte (O47 distance, N10 nature aide, N16 origine handicap, O5 santé comparée, etc.) qui informent mais ne déclenchent pas de CCC.

### 4 CCC mono-sévères manquantes (URGENT)

```json
[
  {
    "id": "V4_MONO_N25",
    "mp_id": "F4",
    "category_id": "F4_CAT_04",
    "niveau": "ccc",
    "delai_jours": 0,
    "condition_logic": [{"q": "N25", "op": "eq", "val": "Oui"}],
    "sens_clinique": "Idées suicidaires exprimées par le proche. URGENCE VITALE — orientation 3114 (numéro national prévention suicide) et CMP immédiat. Pas de délai : action le jour même.",
    "justification_ccc": "CCC mono-condition sévère URGENTE. N25='Oui' est la réponse la plus critique du questionnaire. Le delai_jours=0 indique une action immédiate."
  },
  {
    "id": "V4_MONO_E27",
    "mp_id": "F6",
    "category_id": "F6_CAT_01",
    "niveau": "ccc",
    "delai_jours": 7,
    "condition_logic": [{"q": "E27", "op": "eq", "val": "Oui"}],
    "sens_clinique": "Le proche a des comportements dangereux (gaz ouvert, poêle allumée oubliée). Risque d'incendie ou d'accident domestique grave. Sécurisation domicile immédiate + évaluation cognitif en urgence.",
    "justification_ccc": "CCC mono-condition sévère. E27='Oui' signale un danger immédiat pour le proche et l'entourage."
  },
  {
    "id": "V4_MONO_N22",
    "mp_id": "F4",
    "category_id": "F4_CAT_04",
    "niveau": "ccc",
    "delai_jours": 7,
    "condition_logic": [{"q": "N22", "op": "eq", "val": "Oui"}],
    "sens_clinique": "Comportements à risque (automutilation, comportements dangereux). Signal de souffrance psychique sévère chez le proche. Orientation psy en urgence.",
    "justification_ccc": "CCC mono-condition sévère. N22='Oui' indique un passage à l'acte possible."
  },
  {
    "id": "V5_MONO_O17",
    "mp_id": "M2",
    "category_id": "M2_CAT_01",
    "niveau": "ccc",
    "delai_jours": 30,
    "condition_logic": [{"q": "O17", "op": "eq", "val": "Non"}],
    "sens_clinique": "Pas de médecin traitant déclaré. Sans MT : pas de prescription, pas de parcours coordonné, pas d'ALD, pas de suivi. C'est le point d'entrée de TOUT le système de soins.",
    "justification_ccc": "CCC mono-condition sévère. O17='Non' signifie que le proche est en dehors du système de soins. Priorité absolue."
  }
]
```

---

## PARTIE D — AUDIT CROSS-V (déjà validé)

### 8 CCC cross-V proposées

*(voir document JSON `CCC_CROSS_V_PROPOSALS.json` — déjà validé, référence scoring supprimée)*

| Prio | ID | Cross | Signal clinique |
|---|---|---|---|
| P1 | CCC-XV-01 | V1×V3 | Aidant épuisé + seul + proche en danger |
| P1 | CCC-XV-04 | V3×V4 | Santé aidant dégradée + surveillance permanente |
| P1 | CCC-XV-08 | V3×V1 | Renoncement soins aidant + pas de relais |
| P1 | CCC-XV-03 | V4×V2 | Perte autonomie + 0 démarche admin |
| P2 | CCC-XV-02 | V5×V1 | Errance médicale + aidant seul |
| P2 | CCC-XV-05 | V4×V5 | Troubles cognitifs + vide coordination |
| P2 | CCC-XV-07 | V1×V5 | Refus aide + urgences répétées |
| P3 | CCC-XV-06 | V2×V1 | Déscolarisation + arrêt pro (overlay enfant) |

---

## PARTIE E — SYNTHÈSE & IMPACTS

### Résumé de l'audit

| Dimension | Statut | Gaps trouvés | Action |
|---|---|---|---|
| **Intra-V (couverture catégories)** | 72/73 ✅ | 1 catégorie sans CCC (S4_CAT_02) | 1 CCC à ajouter |
| **Inter-MP (croisements intra-V)** | V5 ✅, V2 ✅ | V3 = 0 inter-MP, V1 = 1 seul, V4 F4 isolé | 3 CCC inter-MP à ajouter |
| **Cross-V** | 3/85 seulement | 8 cross-V cliniquement significatifs | 8 CCC proposées |
| **Questions orphelines** | 43/150 hors CCC | 4 critiques (N25, E27, N22, O17) | 4 CCC mono-sévères à ajouter |

### Total de propositions

| Type | Nb | Urgence |
|---|---|---|
| CCC mono-sévères (questions critiques) | **4** | 🔴 URGENT — N25 surtout |
| CCC intra-V (S4_CAT_02) | **1** | 🟠 Moyen |
| CCC inter-MP (V3, V1, V4) | **3** | 🟠 Moyen |
| CCC cross-V | **8** | 🟡 Après validation clinique |
| **Total** | **16** | |

### Impact global

| Composant | Modification |
|---|---|
| **Kernel** | ❌ Aucune — le moteur évalue les questions sans se soucier de leur V ou MP d'origine |
| **DB schéma** | ❌ Aucune — `activation_rules` accepte déjà tout |
| **Moteur (engine)** | ❌ Aucune — toutes les réponses sont chargées globalement |
| **Insertion** | ✅ Simple `INSERT INTO activation_rules` — 16 lignes |
| **Scoring** | ❌ Non impacté — le scoring est lié aux questions, pas aux rules |
