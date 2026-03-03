# 🎯 FEATURES — Monka Clinical Engine

> **Version :** 2.0 — 22/02/2026
> **Objectif :** Inventaire exhaustif des features implémentées (Sprint V1 + V2 en cours) et planifiées

---

## ✅ Sprint V1 — Features Implémentées

### Bloc 0 — Fondations DB
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Table `content_blocks` en DB | Supabase migration | ✅ |
| Table `cr_templates` en DB | Supabase migration | ✅ |
| Types TS : `DBContentBlock`, `DBCRTemplate` | `supabaseData.ts` | ✅ |
| Helpers : `getContentBlock()`, `getContentBlocksForEntity()` | `supabaseData.ts` | ✅ |
| Fetch parallel de toutes les tables | `fetchAllMonkaData()` | ✅ |

### Bloc 3 — Restructuration Onglets Simulateur
| Feature | Fichier | Statut |
|---------|---------|:------:|
| 4 onglets : Scoring, MP, Règles, CR | `SimulatorPage.tsx` | ✅ |
| Filtre par vulnérabilité V1-V5 + Triggers | `SimulatorHeader.tsx` | ✅ |
| Sidebar questions avec réponses interactives | `QuestionsSidebar.tsx` | ✅ |
| Navigation par onglet avec état persisté | `SimulatorPage.tsx` | ✅ |

### Bloc 4 — Explications Cliniques
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Sens clinique sur les règles d'activation | `SimulatorRulesTab.tsx` | ✅ |
| Wording utilisateur + IDEC sur les recos | `MPRecosView.tsx` | ✅ |
| Wording multi-niveaux sur les MTs | `MPTasksView.tsx` | ✅ |

### Bloc 7 — Fiches Questions
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Page Questions avec filtres (V, type, scoring) | `QuestionsPage.tsx` | ✅ |
| Badge scoring/non-scoring par question | `QuestionsPage.tsx` | ✅ |
| Affichage response_type + options | `QuestionsPage.tsx` | ✅ |

### Bloc 8 — Page Vulnérabilités
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Page Vulnérabilités drill-down V→MP→Détail | `VulnerabilitiesPage.tsx` | ✅ |
| Vue détail MP avec catégories, recos, MTs | `VulnDetail.tsx` | ✅ |

### Bloc 9 — Navigation + Documents
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Sidebar avec navigation 7 pages | `Sidebar.tsx` | ✅ |
| Page Docs officielle | `DocsPage.tsx` | ✅ |
| Page Roadmap | `RoadmapPage.tsx` | ✅ |

### Bloc 10 — Score-Action Gap
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Détection gaps score élevé sans action | `scoreActionGap.ts` | ✅ |
| Affichage gap dans le CR Médecin | `CRMedecinDocument.tsx` | ✅ |

### Bloc 11 — Chaîne Clinique Traçable
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Traçabilité Question→Règle→Reco→MT | `ClinicalChain.tsx` | ✅ |
| Content blocks intégrés dans la chaîne | `ClinicalChain.tsx` | ✅ |

### Bloc 12 — Scoring Enrichi
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Scoring pondéré V1-V5 avec coefficients | `scoringEngine` (via hooks) | ✅ |
| Seuils faible/modéré/élevé/critique | `scoring_thresholds` | ✅ |
| Score breakdown par question | `ScoreBreakdown.tsx` | ✅ |
| Score cap E19/O16 | Scoring engine | ✅ |

### Bloc 13 — Heatmap Couverture Clinique
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Matrice 165 questions × couverture | `CoverageHeatmap.tsx` | ✅ |
| `buildCoverageMatrix()` | `buildCoverageMatrix.ts` | ✅ |

### Bloc 14 — Mode What-If
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Modification réponse → diff en temps réel | `WhatIfDiff.tsx` | ✅ |
| Comparaison avant/après | `WhatIfDiff.tsx` | ✅ |

### Bloc 15 — Comparaison Personas
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Comparaison 2-3 personas côte à côte | `PersonaComparison.tsx` | ✅ |
| Scores comparatifs V1-V5 | `PersonaComparison.tsx` | ✅ |

### Engine Core
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Évaluation déterministe des 240 règles | `clinicalEngine.ts` | ✅ |
| Parsing condition_logic JSONB (9 opérateurs) | `clinicalEngine.ts` | ✅ |
| Modèle additif questions conditionnelles | `supabaseData.ts` | ✅ |
| Détection triggers N3/O1 + blocs aidance | `supabaseData.ts` | ✅ |
| Overlay Enfant (âge + type aidance) | `supabaseData.ts` | ✅ |

### Data Layer
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Client Supabase singleton | `supabase.ts` | ✅ |
| MonkaData — 13 tables en 1 fetch | `supabaseData.ts` | ✅ |
| 30+ helpers typés (getXForY) | `supabaseData.ts` | ✅ |
| Cache singleton évitant re-fetch | `supabaseData.ts` | ✅ |

### Personas
| Feature | Fichier | Statut |
|---------|---------|:------:|
| 5 personas avec réponses préremplies | `PersonasPage.tsx` | ✅ |
| Sélection persona → simulateur | `PersonasPage.tsx` | ✅ |
| Badge catégorie aidance | `PersonasPage.tsx` | ✅ |

### CR Médecin
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Document CR structuré (synthèse, alertes, plan) | `CRMedecinDocument.tsx` | ✅ |
| Wording IDEC professionnel | `CRMedecinDocument.tsx` | ✅ |
| Onglet dédié dans le simulateur | `SimulatorCRTab.tsx` | ✅ |

### Vue Externe
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Vue patient-facing prototype | `SimulatorExternalView.tsx` | ✅ |
| Wording empathique utilisateur | `SimulatorExternalView.tsx` | ✅ |

---

## ✅ Sprint V2 — Features Implémentées (3/12 blocs)

### V2-01 — Navigation & Sidebar ✅
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Sidebar 6 entrées restructurées (Dashboard, Simulateur, Personas, Vulnérabilités, MP, Docs) | `Sidebar.tsx` | ✅ |
| Lazy loading toutes pages (React.lazy + Suspense) | `App.tsx` | ✅ |
| Route `/micro-parcours` ajoutée, `/questions` retirée | `App.tsx` | ✅ |
| Page placeholder MicroParcoursPage | `MicroParcoursPage.tsx` | ✅ |
| Footer KERNEL v6 • 165 questions | `Sidebar.tsx` | ✅ |

### V2-02 — Page Vulnérabilités Enrichie ✅
| Feature | Fichier | Statut |
|---------|---------|:------:|
| VulnDetail trimé 250L → 125L | `VulnDetail.tsx` | ✅ |
| OverviewTab + QuestionsTab + ScoringTab extraits | `VulnOverviewTabs.tsx` | ✅ |
| ScoringTab enrichi : question_text FR (plus de codes E7/N3) | `VulnOverviewTabs.tsx` | ✅ |
| Content blocks "Explication du scoring" par vulnérabilité | `VulnOverviewTabs.tsx` | ✅ |
| QuestionsTab : ID en badge discret, texte FR en premier | `VulnOverviewTabs.tsx` | ✅ |

### V2-03 — Page Micro-Parcours Drill-Down ✅
| Feature | Fichier | Statut |
|---------|---------|:------:|
| Page liste 24 MPs filtrable par V (pills) | `MicroParcoursPage.tsx` | ✅ |
| Cartes MP avec content_blocks objectif + stats | `MicroParcoursPage.tsx` | ✅ |
| Drill-down MP → Catégories → Règles → Recos → MTs | `MPDrilldown.tsx` | ✅ |
| RuleCardFR : conditions traduites en français (« question_text » op valeur) | `MPDrilldown.tsx` | ✅ |
| NiveauBadge réutilisable (critique/ccc/prevention/standard) | `MPDrilldown.tsx` | ✅ |
| Content blocks au niveau MP | `MPDrilldown.tsx` | ✅ |
| MTs avec type badge (MED/SEC/INFO) + acteur | `MPDrilldown.tsx` | ✅ |

---

## ⬜ Sprint V2 — Features Planifiées (9/12 blocs restants)

### V2-04 — Règles en Français
| Feature | Fichier cible | Impact code existant |
|---------|---------------|:--------------------:|
| Refonte SimulatorRulesTab pour affichage FR | `SimulatorRulesTab.tsx` | MODIF — refonte |
| Composant RuleExplainer | `components/clinical/RuleExplainer.tsx` | NOUVEAU |
| Composant ConditionDisplay | `components/clinical/ConditionDisplay.tsx` | NOUVEAU |
| **Impact existant :** SimulatorRulesTab refondu (pas de régression car amélioration) | | 🟠 Moyen |

### V2-05 — CR Médecin avec Logo
| Feature | Fichier cible | Impact code existant |
|---------|---------------|:--------------------:|
| Logo Monka + PRAGMA intégrés | `APP/public/assets/` | AJOUT assets |
| 5 sections complètes (synthèse→annexe) | `CRMedecinDocument.tsx` | MODIF — enrichir |
| Export PDF via @media print | CSS | AJOUT |
| `crEnricher.ts` — logique d'enrichissement | `engine/crEnricher.ts` | NOUVEAU |
| **Impact existant :** CRMedecinDocument enrichi, ancienne version améliorée | | 🟠 Moyen |

### V2-06 — Export Documents
| Feature | Fichier cible | Impact code existant |
|---------|---------------|:--------------------:|
| Bouton Exporter sur pages MP | `ExportButton.tsx` | NOUVEAU |
| Doc MP officiel | `engine/mpDocGenerator.ts` | NOUVEAU |
| Doc Scoring V officiel | `engine/scoringDocGenerator.ts` | NOUVEAU |
| **Impact existant :** Ajout bouton sur pages existantes (non-destructif) | | 🟢 Faible |

### V2-07 — Vue Externe Premium
| Feature | Fichier cible | Impact code existant |
|---------|---------------|:--------------------:|
| Design premium glassmorphism | `SimulatorExternalView.tsx` | MODIF — upgrade design |
| Responsive mobile-first | CSS | MODIF |
| **Impact existant :** Amélioration de l'existant | | 🟢 Faible |

### V2-08 — Refactor
| Feature | Fichier cible | Impact code existant |
|---------|---------------|:--------------------:|
| Split supabaseData.ts (547L → 3 fichiers) | `queries.ts`, `helpers.ts`, `conditional-model.ts` | MODIF — split |
| Extract useSimulatorState | `useSimulatorState.ts` | NOUVEAU (extraction) |
| Vitest setup | `vitest.config.ts` | NOUVEAU |
| ≥15 tests unitaires | `__tests__/` | NOUVEAU |
| Lint cleanup | Multiples | MODIF |
| **Impact existant :** ⚠️ RISQUE — imports à mettre à jour partout après split | | 🔴 Fort |

### V2-09 — Score de Confiance Moteur
| Feature | Fichier cible | Impact code existant |
|---------|---------------|:--------------------:|
| Engine Health Score /100 | `engine/engineHealthScore.ts` | NOUVEAU |
| Widget dans Dashboard | `DashboardPage.tsx` | MODIF — ajouter widget |
| **Impact existant :** Ajout non-destructif | | 🟢 Faible |

### V2-10 — Intégrité Données
| Feature | Fichier cible | Impact code existant |
|---------|---------------|:--------------------:|
| Script de vérification automatisé | `engine/dataValidator.ts` | NOUVEAU |
| Checks FK, NULL, orphelins, couverture | `engine/dataValidator.ts` | NOUVEAU |
| **Impact existant :** Aucun code existant modifié | | 🟢 Faible |

---

## 📊 Analyse d'Impact Sprint V2

| Impact | Blocs | Commentaire |
|:------:|-------|-------------|
| 🟢 Faible | V2-02, V2-03, V2-06, V2-07, V2-09, V2-10 | Features nouvelles ou ajouts non-destructifs |
| 🟠 Moyen | V2-01, V2-04, V2-05 | Modifications de code existant (Sidebar, Rules, CR) |
| 🔴 Fort | V2-08 | Split supabaseData.ts — nécessite MAJ imports dans 14 fichiers |

### Stratégie anti-régression

1. **V2-08 (Refactor)** placé APRÈS les features pour ne pas casser la base pendant le dev
2. **Chaque bloc** commence par vérifier le build avant ET après
3. **Tests V2-10** valident l'intégrité données après toutes les modifications
4. **QG après chaque bloc** — aucune exception

---

## 📈 Métriques Progression

| Métrique | Sprint V1 | Sprint V2 actuel | Sprint V2 cible |
|----------|:---------:|:----------------:|:---------------:|
| Pages | 7 | 6 (restructurées) | 6 |
| Composants drill-down | 2 (VulnDetail) | 5 (+VulnOverviewTabs, MPDrilldown, RuleCardFR, NiveauBadge) | ~8 |
| Tables DB exploitées dans UI | 11/15 | 12/15 (+content_blocks enrichi) | **15/15** |
| Content blocks utilisés | 2 pages | **4 pages** (Scoring, MP list, MP drill-down, ClinicalChain) | **Toutes** |
| Règles affichées en FR | ❌ codes | ✅ question_text + opérateur FR | ✅ partout |
| Tests unitaires | 0 | 0 | ≥ 15 |
| Hardcode clinique | ~0 | **0 certifié** (3 audits grep passés) | 0 certifié |
| Documents exportables | 0 | 0 | **3** (CR, MP, Scoring V) |

---

*PRAGMA Studio — Sprint V2 — Features Inventory*
