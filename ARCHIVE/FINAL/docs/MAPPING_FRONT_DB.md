# 🔗 MAPPING FRONT ↔ DB — Monka Clinical Engine

> **Version :** 1.0 — 22/02/2026
> **Objectif :** Traçabilité complète entre les tables Supabase et le code frontend. Prouver que l'ensemble de la DB est exploité et que le hardcode clinique est ZÉRO.

---

## 📊 Synthèse Couverture

| Table DB | Lignes | Type TS | Fetched | Helpers | Utilisée dans | Statut |
|----------|:------:|---------|:-------:|:-------:|---------------|:------:|
| `vulnerabilities` | 5 | `DBVulnerability` | ✅ | — | SimulatorHeader, Dashboard, Scoring | ✅ |
| `questions` | 165 | `DBQuestion` | ✅ | `getQuestionsForVuln`, `getAllQuestions`, `getTriggerQuestions`, `getActiveQuestions` | QuestionsSidebar, SimulatorMPTab, Heatmap | ✅ |
| `micro_parcours` | 24 | `DBMicroParcours` | ✅ | `getMPsForVuln`, `buildMPMap` | SimulatorMPTab, MPDetailView, Dashboard | ✅ |
| `question_mp_mapping` | 155 | `DBQuestionMPMapping` | ✅ | `getMPsForQuestion`, `buildQuestionMPMap` | CoverageHeatmap, engine | ✅ |
| `categories` | 73 | `DBCategory` | ✅ | `getCategoriesForMP`, `getCategoriesForVuln` | SimulatorMPTab, MPDetailView | ✅ |
| `activation_rules` | 240 | `DBActivationRule` | ✅ | `getRulesForMP`, `getRulesForCategory`, `getRulesForVuln` | clinicalEngine, SimulatorRulesTab, ClinicalChain | ✅ |
| `scoring_questions` | 345 | `DBScoringQuestion` | ✅ | `getScoringForVuln`, `isScoringQuestion`, `buildScoringMap` | scoringEngine, SimulatorScoringTab, ScoreBreakdown | ✅ |
| `scoring_thresholds` | 20 | `DBScoringThreshold` | ✅ | `getThresholdsForVuln` | scoringEngine, SimulatorScoringTab | ✅ |
| `recommendations` | 198 | `DBRecommendation` | ✅ | `getRecosForCategory`, `getRecosForMP`, `getRecosForVuln` | MPRecosView, CRMedecinDocument | ✅ |
| `micro_taches` | 390 | `DBMicroTache` | ✅ | `getMTsForCategory`, `getMTsForMP`, `getMTsForVuln` | MPTasksView, CRMedecinDocument | ✅ |
| `content_blocks` | 355 | `DBContentBlock` | ✅ | `getContentBlock`, `getContentBlocksForEntity` | ClinicalChain, useCR | ⚠️ Partiel |
| `cr_templates` | var. | `DBCRTemplate` | ✅ | via useCR | CRMedecinDocument | ✅ |
| `guides` | 42 | ❌ Pas de type | ❌ | ❌ | ❌ Aucune page | 🔴 NON UTILISÉ |
| `guide_mt_mapping` | 61 | ❌ Pas de type | ❌ | ❌ | ❌ Aucune page | 🔴 NON UTILISÉ |
| `suivi_questions` | 30 | `DBSuiviQuestion` | ✅ | `getSuiviForVuln` | ❌ Aucune page (type prêt) | ⚠️ Type OK, pas affiché |

### Bilan

| Indicateur | Valeur |
|---|:---:|
| Tables avec type TS | **13/15** (87%) |
| Tables fetchées dans MonkaData | **13/15** (87%) |
| Tables avec ≥1 helper | **11/15** (73%) |
| Tables affichées dans l'UI | **11/15** (73%) |
| Tables NON exploitées | **2** : `guides`, `guide_mt_mapping` |
| Tables partiellement exploitées | **2** : `content_blocks`, `suivi_questions` |

---

## 🔴 Gaps à Combler (Sprint V2)

### 1. `guides` + `guide_mt_mapping` — NON INTÉGRÉS

> **Impact :** 42 guides avec 61 liens vers des MTs existent en DB mais ne sont PAS affichés.
> **Bloc V2 concerné :** V2-03 (MP Drill-down → MTs → Guides) + V2-05 (CR Médecin)

**Action requise :**
- Créer `DBGuide` et `DBGuideMTMapping` dans `supabaseData.ts`
- Ajouter au `fetchAllMonkaData()`
- Créer helpers : `getGuidesForMT()`, `getGuideById()`
- Afficher dans MPTasksView et CRMedecinDocument

### 2. `content_blocks` — PARTIELLEMENT EXPLOITÉS

> **Impact :** 355 content blocks existent mais ne sont utilisés que dans ClinicalChain et useCR. Pas encore dans les pages MP, Scoring, ou Vulnérabilités.
> **Bloc V2 concerné :** V2-02, V2-03, V2-04, V2-06 (partout)

**Action requise :**
- Intégrer `getContentBlock()` et `getContentBlocksForEntity()` dans CHAQUE page de contenu
- Les utiliser pour : objectifs MP, explications scoring, justifications règles

### 3. `suivi_questions` — TYPE PRÊT, PAS AFFICHÉ

> **Impact :** 30 questions de suivi existent, type `DBSuiviQuestion` prêt, mais aucune page ne les affiche.
> **Bloc V2 concerné :** V2-12 (Certification) — mentionner comme feature future

---

## 📁 Architecture Fichiers Engine

```
APP/src/engine/
├── supabaseData.ts        (547L ⚠️ > 300L — à splitter dans V2-08)
│   ├── 14 types DB         (DBVulnerability...DBCRTemplate)
│   ├── MonkaData interface  (13 arrays + metadata)
│   ├── fetchAllMonkaData()  (parallel fetch all tables)
│   ├── 30+ helpers          (getXForY pattern)
│   └── Additive model       (getActiveQuestions, triggers)
├── clinicalEngine.ts       (évaluation règles)
├── scoringEngine.ts        (calcul scores V1-V5)        ← pas encore dans engine/
├── buildCoverageMatrix.ts  (matrice couverture)
└── hooks/
    └── useVulnStats.ts     (stats par V)

APP/src/clinical/hooks/
├── index.ts               (hooks composites)
├── useEvaluation.ts       (évaluation moteur)
├── useScoring.ts          (scoring hooks)
└── useCR.ts               (CR Médecin)
```

---

## ✅ Audit Hardcode — Résultat

```bash
# Scan codes questions hardcodés dans les pages
grep -rn '"E[0-9]\|"N[0-9]\|"O[0-9]\|"S[0-9]\|"F[0-9]\|"M[0-9]' APP/src/pages/ --include='*.tsx'
# Résultat : 0 matches ✅

# Seuls endroits avec codes questions : supabaseData.ts (additive model logic N3, O1)
# → Acceptable car c'est la couche data, pas l'UI
```

---

## 🔗 Flux de Données Complet

```
Supabase (15 tables)
    ↓ fetchAllMonkaData() — parallel fetch
MonkaData (singleton caché)
    ↓ helpers (getXForY)
Hooks (useEvaluation, useScoring, useCR)
    ↓ React hooks
Pages (SimulatorPage, DashboardPage, etc.)
    ↓ props
Components (MPDetailView, ScoreBreakdown, etc.)
    ↓ rendu
UI (texte clinique 100% dynamique depuis DB)
```

---

*PRAGMA Studio — Sprint V2 — Zero Hardcode Clinique*
