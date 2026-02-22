# SimulatorPage — Fiche Audit

## Rôle
Page principale du simulateur clinique Monka. Permet de répondre aux 165 questions du questionnaire adaptatif, de voir les scores par vulnérabilité (V1-V5), les micro-parcours activés, et de basculer entre vue interne (clinique) et vue externe (utilisateur).

## Architecture des fichiers

| Fichier | Lignes | Rôle |
|---|:---:|---|
| `SimulatorPage.tsx` | 457L | Orchestrateur principal (state, dérivation) |
| `SimulatorHeader.tsx` | 123L | Header : filtres V, persona label, stats |
| `QuestionsSidebar.tsx` | 198L | Questionnaire gauche : questions, réponses, blocs |
| `SimulatorScoringTab.tsx` | 147L | Onglet Scoring : scores par V, graphes |
| `SimulatorMPTab.tsx` | 119L | Onglet Micro-Parcours : liste MPs activés |
| `SimulatorCRTab.tsx` | 133L | Onglet Résumé : gauge, stats, CR Médecin |
| `CoverageHeatmap.tsx` | 288L | Onglet Couverture : matrice question×MP |
| `PersonaComparison.tsx` | 225L | Onglet Personas : comparaison profils |
| `SimulatorExternalView.tsx` | 84L | Vue Externe : orchestrateur user-facing |
| `ExternalViewCards.tsx` | 239L | Vue Externe : cartes MP, recos, MTs |
| `MPDetailView.tsx` | 300L | Drill-down MP : règles, catégories, fire status |
| `WhatIfDiff.tsx` | 211L | Panneau What-If V2 : toggle, diffs, impacts |
| `ProfileRecap.tsx` | 93L | Récap profil aidant depuis triggers |
| `ScoreBreakdown.tsx` | 111L | Détail scoring par question |
| `CRMedecinDocument.tsx` | — | Document CR Médecin Traitant |

## Données consommées (Supabase)

| Table | Données | Hook |
|---|---|---|
| `questions` | 165 questions (id, libelle, options, is_trigger, vulnerability_id, bloc) | `useMonkaData` |
| `micro_parcours` | 24 MPs (id, nom, objectif, vulnerability_id, asr_wording) | `useMonkaData` |
| `activation_rules` | 240 règles (id, mp_id, category_id, niveau, conditions JSON) | `useMonkaData` |
| `categories` | ~48 catégories (id, mp_id, nom, description, ordre) | `useMonkaData` |
| `recommendations` | 202 recos (id, mp_id, category_id, niveau, wording_utilisateur) | `useMonkaData` |
| `micro_taches` | 390 MTs (id, mp_id, category_id, type, wording_utilisateur, acteur, is_contributive, is_prevention) | `useMonkaData` |
| `scoring_questions` | 345 scoring entries (question_id, vulnerability_id, answer_value, points) | `useMonkaData` |
| `vulnerabilities` | 5 vulnérabilités V1-V5 (id, label, thresholds) | `useMonkaData` |
| `personas` | ~6 personas (id, nom, answers JSON) | `useMonkaData` |

## Hooks principaux

| Hook / Helper | Source | Usage |
|---|---|---|
| `useMonkaData()` | `clinical/hooks` | Chargement et cache de toutes les données Supabase |
| `getActivatedCategories()` | `clinical/hooks` | Évalue les règles → renvoie les catégories activées |
| `buildScoringMap()` | `clinical/hooks` | Map question_id → answer → points |
| `buildMPMap()` | `clinical/hooks` | Map mp_id → { nom, vulnerability_id, objectif, asr_wording } |
| `buildMPVulnMap()` | `clinical/hooks` | Map mp_id → vulnerability_id |
| `evaluateRule()` | `clinical/hooks` | Évalue une règle unitaire avec les réponses courantes |
| `getTriggerQuestions()` | `clinical/hooks` | Filtre les questions trigger (15) |
| `getThresholdsForVuln()` | `clinical/hooks` | Seuils de vulnérabilité pour jauge (faible/modéré/élevé/critique) |

## Fonctionnalités principales

### Vue Interne (5 onglets)
1. **Scoring** — Score par vulnérabilité, contribution par question, seuils
2. **Micro-Parcours** — Liste des 24 MPs, statut activé/inactif, drill-down vers règles
3. **Couverture** — Matrice heatmap questions × MPs
4. **Personas** — Comparaison côte à côte de profils pré-enregistrés
5. **Résumé** — Gauge score, stats MPs/réponses, Profile Recap, CR Médecin Traitant

### Vue Externe (user-facing)
- Cartes MP premium (glassmorphism, criticité couleur)
- Recos groupées par catégorie avec MTs (contributives + non-contributives)
- Section Prévention dédiée (MTs is_prevention)
- ASR wording + gauge progression par MP

### What-If V2
- Toggle ON/OFF, panneau expandable
- Détail par vulnérabilité : score delta, MPs activés/désactivés
- Liste questions modifiées avec ancien/nouveau

### Profile Recap
- Texte naturel depuis les réponses triggers
- Tableau détail trigger par trigger
- Compteur triggers manquants

## Connexions DB vérifiées
- [x] Toutes les données affichées proviennent de Supabase
- [x] Aucun texte clinique hardcodé (wordings depuis DB)
- [x] IDs catégories/MP depuis DB (non hardcodés)
- [x] Niveaux criticité depuis DB (standard/ccc/critique/prevention)

## Métriques
| Métrique | Valeur |
|---|---|
| Lignes total (page + sous-composants) | 3 559L |
| Fichiers | 15 |
| Tables Supabase | 9 |
| Hooks cliniques | 8 |
