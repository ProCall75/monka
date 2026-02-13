# 📋 TODO — Monka Clinical Engine

> **Mise à jour** : 11/02/2026  
> **Priorité #1** : Valider la base (KERNEL + données sources) avant toute production  
> **Source de vérité** : [`RECAP_FONDATION_MONKA.md`](KERNEL/RECAP_FONDATION_MONKA.md) (v4 FINALE — 13 règles K1→K13)

---

## 🧹 PHASE 0 — Nettoyage & Restructuration Repo ✅

- [x] Archiver legacy (`QUESTIONNAIRE/`, `Q-V3/`, `AUTRES/`, `SOURCES/`, `DEMO/`, `AUDIT/`, KERNEL intermédiaires)
- [x] Renommer `QUESTIONNAIRE_V2/` → `KERNEL/`
- [x] Réécrire `UNDERSTANDING.md` aligné KERNEL v4 (6 divergences corrigées)
- [x] Réécrire `README.md` racine
- [x] Nettoyage READMEs

---

## ✅ PHASE 1 — Validation des Données Sources

> **Objectif** : S'assurer que les données sont cohérentes et complètes.

### 1.1 — Référentiel Questions ✅

- [x] Extraire et mapper le référentiel état/facteur → 150/150 = 100% cohérence
- [x] Rapport de cohérence → `LIVRABLES/Audit/rapport_coherence_etat_facteur.md`

### 1.2 — Audit 150+15 vs 153 ✅

- [x] Identifier l'écart → 3 triggers (O2, N31, O49) expliquent la différence
- [x] Rapport → `LIVRABLES/Audit/rapport_audit_153_vs_150.md`
- [x] ✅ **Confirmé par Dr. Monka** : 150 questions + 15 triggers

### 1.3 — Export Excel du Questionnaire ✅

- [x] Exporter questionnaire figé (150 + 15 triggers + 30 suivi + 24 MP) → `LIVRABLES/Questionnaire_Monka_Complet.xlsx`
- [x] Ajouter colonne **Typage** (scorante/déclenchante/etc.) — vérification croisée 100%
- [x] Retirer colonne "Aidance" (redondante)

### 1.4 — Règles d'Activation ✅

- [x] Créer table `activation_rules` → 68 règles (12 critiques + 28 CCC + 28 standard)
- [x] Couvrir 24/24 MP (21 legacy + 3 proposés IA pour F6, M6, A4)
- [x] Rédiger réflexion CCC inter-vulnérabilités → `LIVRABLES/Audit/reflexion_ccc_inter_vulnerabilites.md`
- [x] Vérification KERNEL K1→K13 → 13/13 conforme

### 1.5 — Architecture Recommandations ✅

- [x] Valider le modèle MP→Recos (via activation_rule) → `LIVRABLES/Audit/architecture_recommandations_par_mp.md`
- [x] Badge dynamique MP = MAX(niveaux recos incomplètes) → dé-escalade
- [x] Délai figé à la date du questionnaire

---

## 📝 PHASE 2 — Ingestion & Regroupement des Données

> **Objectif** : Ingérer tout le legacy dans Supabase, regrouper les recos par MP, préparer le terrain pour les templates.

### 2.1 — Ingestion Supabase ✅

> 10 tables créées + données ingérées.

- [x] **Ingérer `questions`** — 165 questions (150 + 15 triggers) ✅
- [x] **Ingérer `vulnerabilities`** — 5 vulnérabilités ✅
- [x] **Ingérer `micro_parcours`** — 24 MP ✅
- [x] **Ingérer `question_mp_mapping`** — liens questions↔MP ✅
- [x] **Ingérer `activation_rules`** — 68 règles (12 critiques + 28 CCC + 28 standard) ✅
- [x] **Ingérer `recommendations`** — 103 recos regroupées ✅
- [x] **Ingérer `micro_taches`** — 299 MT typées ✅
- [x] **Ingérer `scoring_questions`** — 38 questions scorantes + pondérations ✅
- [x] **Ingérer `scoring_thresholds`** — seuils par vulnérabilité ✅
- [x] **Ingérer `suivi_questions`** — 30 questions de suivi ✅

### 2.2 — Audit & Regroupement Recos par MP ✅

> Audit complet → `LIVRABLES/Audit/audit_regroupement_recos_mt_par_mp.md`

- [x] **Cartographier les recos legacy** par question → 24/24 MP couverts ✅
- [x] **Doc d'audit recos** → 14/24 MP bien couverts, 5 faiblement documentés ✅
- [x] **Regrouper les MT par MP** (V1 via question_id, V2-V5 par V) ✅
- [x] **Contrôle qualité** : 0 reco perdue (707/707), 0 MT perdue (299/299) ✅

### 2.3 — Points en attente Dr. Monka

> Items issus des retours du 09/02 et des sessions de travail.

- [ ] **Validation architecture recos** → envoyer `architecture_recommandations_par_mp.md`
- [ ] **Décision multi-MP** : 5 questions liées à 2 MP (E21, O51, O53, O54, E46) → 1:1 ou 1:N ?
- [ ] **Validation règles activation F6, M6, A4** (proposées par IA)
- [ ] **Vérifier aidance** : 5 questions mentionnent "enfant" (E38, E59, E60, E64, E65) — faut-il filtrer par profil d'aidant ?

---

## 🤖 PHASE 3 — Propositions IA & Enrichissement

> L'IA propose, le médecin valide. Chaque livrable est un doc clair avec choix justifiés.

### 3.1 — Regroupement Recos par MP + Dédoublonnage ✅

- [x] Extraire 324 recos legacy par MP, dédoublonner → 238 recos structurées
- [x] Regrouper par question → **103 recos regroupées** (modèle actif)
- [x] Lier aux activation_rules (79/103 liées, 24 sans MT)
- [x] Créer table `recommendations` + insérer 103 recos
- [x] → Source de vérité : `LIVRABLES/recos_regroupees_par_mp.md`
- [x] → Risques : `LIVRABLES/Audit/risques_regroupements_phase3.md`
- [x] → Backup 238 : `_ARCHIVE/LIVRABLES/phase3_recos_238_detail.md`

### 3.2 — Rattachement MT → Recos ✅

- [x] Matcher 299 MT aux 103 recos regroupées (matching sémantique V1-V5)
- [x] 299/299 MT rattachées, 0 orpheline
- [x] Mis à jour `reco_id` + `matching_source` dans `micro_taches`

### 3.3 — Règle de Scoring ⏳

> **Scénario D** : reclassifier les questions mal classifiées → règle unique « état = scorant »
> Voir : `LIVRABLES/Audit/scoring_vs_legacy_vs_toutes_etat.md` + `reflexion_methodologie_scoring.md`

- [x] Analyse comparative : 38 legacy vs 55 toutes état
- [x] Raisonnement méthodologique (5 axes) → doc réflexion
- [ ] **Envoyer doc scoring à Dr. Monka** (pas encore envoyé)
- [ ] **Reclassifier ~15 questions** (E1, E2, N20, E43 + ~11 V2)
- [ ] **Valider pondération** (+1 standard / +2 critique)
- [ ] Appliquer classification en base → scoring automatique

### 3.4 — Validation Dr. Monka (batch) ⏳

- [x] ✅ **CCC inter-vulnérabilités** : valide les 3 combos (1, 2, 4) + nouvelles règles F6, M6, A4 (11/02)
- [x] ✅ **Architecture recos par MP** : valide le principe multi-recos par MP (11/02)
- [ ] Validation 103 recos regroupées (doc envoyé)
- [ ] Validation 20 cas à risque (doc envoyé)
- [ ] Validation scoring (doc **pas encore envoyé**)

---

## 📄 PHASE 4 — Production Templates KERNEL (A→E)

> 25 fichiers templates produits (5 V × 5 templates A→E). Reste la **validation clinique** par Dr. Monka.

### 4.1 — Pilote V1 (Social & Relationnel) ✅ PRODUIT

- [x] **A** — `V1_social_relationnel/A_activation.md` (177 lignes — 14 règles, 4 MP)
- [x] **B** — `V1_social_relationnel/B_recos_variations.md` (265 lignes — recos × niveaux)
- [x] **C** — `V1_social_relationnel/C_master_mt_asr.md` (177 lignes — MT typées + ASR)
- [x] **D** — `V1_social_relationnel/D_suivi.md` (124 lignes — questions de suivi)
- [x] **E** — `V1_social_relationnel/E_scoring.md` (139 lignes — barèmes + seuils)
- [ ] **Validation Dr. Monka** sur V1 complète

### 4.2 — Déploiement V2→V5 ✅ PRODUIT

- [x] V2 — Administrative (A1-A4) (A→E) — 5 fichiers remplis
- [x] V3 — Santé Aidant (S1-S4) (A→E) — 5 fichiers remplis
- [x] V4 — Fragilité du Proche (F1-F6) (A→E) — 5 fichiers remplis
- [x] V5 — Parcours Médical (M1-M6) (A→E) — 5 fichiers remplis
- [ ] **Validation Dr. Monka** sur V2→V5

### 4.3 — Transversaux

- [x] **E_GLOBAL** — `E_GLOBAL_scoring.md` — Scoring global inter-vulnérabilités
- [ ] **Triggers** — `all/triggers.md`
- [ ] **Fiches identité questions** — fiche complète par question (ID, V, MP, MT, typage, classification)

---

## 🖥️ PHASE 5 — Simulateur KERNEL (Vite/React)

> App React/Vite dans `APP/`. Connectée à Supabase en live. Remplace les simulateurs legacy HTML.

### 5.1 — Setup ✅

- [x] Créer le projet Vite + React + TypeScript dans `APP/`
- [x] Configurer Tailwind CSS + design system (couleurs Monka, glass-card, gradients)
- [x] Connecter Supabase (client singleton `src/lib/supabase.ts`)
- [x] Créer la couche data (`src/engine/supabaseData.ts`) — fetch 10 tables en parallèle + cache
- [x] Hook React `useMonkaData` pour chargement avec loading/error states

### 5.2 — Fonctionnalités Core ✅

- [x] Questionnaire interactif (165 questions groupées par sous-bloc)
- [x] Moteur d'activation (évalue condition_logic en temps réel → MP actifs)
- [x] Affichage Recos par MP + badge MP ACTIF
- [x] Scoring temps réel (score par V + score total + seuils)
- [x] Détection CCC (via activation_rules niveau 'ccc')
- [x] Vue interne (6 onglets : Scoring, Activation, Recos, Règles, Tâches, Résumé)
- [x] Vue externe — parcours utilisateur (MP → Recos → MT imbriqués)
- [x] Labels Social / Médico-social sur les micro-tâches
- [x] Sélection vulnérabilité (V1→V5 + ALL)

### 5.3 — UX & Polish ✅

- [x] Sidebar avec navigation (Simulateur, Personas, Docs, Roadmap)
- [x] SidebarContext (margin dynamique open/pinned/collapsed)
- [x] Design premium (glassmorphism, gradients, animations Framer Motion)
- [x] Personas — 5 profils aidants (A1-A5) avec auto-fill simulator
- [x] Page Docs (templates KERNEL)
- [x] Page Roadmap (3 priorités, contexte vulgarisé)
- [x] Délimiteurs visuels (borders, divide-y) dans toute l'app
- [ ] Export résultats (PDF/JSON)
- [ ] Suivi dynamique (entonnoir 3 niveaux)

---

## 📊 PHASE 6 — Documentation Médecin

- [ ] 26 documents remplis (5 templates × 5 V + E_GLOBAL)
- [ ] Rapport d'audit global consolidé
- [ ] Guide d'utilisation simulateur
- [ ] Excels exportés

---

## 🔮 BACKLOG — Évolutions Futures

- [ ] **Recos désactivables par contexte** — si une reco est impossible (ex: aucun entourage familial mobilisable), pouvoir la désactiver pour ce profil. Déclenché par réponses aux questions triggers/facteur. *(Retour Dr. Monka 11/02)*
- [ ] Scoring bi-dimensionnel (V2 scoring) — état + facteurs en deux dimensions séparées
- [ ] Audit copywriting : wording recos vs MT IDEC
- [ ] Personnalisation par persona (exploiter triggers)
- [ ] Maquettes UI/UX app utilisateur finale
- [ ] Intelligence Artificielle : plan CNRS Phase III, correspondance Legacy→IA
- [ ] Glossaire acronymes (Dr. Monka, déjà sur Wimi)

---

## 📨 RÉCAP — Docs à envoyer à Dr. Monka (10/02/2026)

### Docs à transmettre

| # | Doc | Contenu | Action demandée |
|---|---|---|---|
| 1 | `LIVRABLES/recos_regroupees_par_mp.md` | 103 recos structurées par MP, avec MT rattachées | Valider les regroupements |
| 2 | `LIVRABLES/Audit/risques_regroupements_phase3.md` | 20 regroupements douteux à vérifier | Annoter ✅/❌/📝 |
| 3 | `LIVRABLES/Audit/scoring_vs_legacy_vs_toutes_etat.md` | Comparaison scoring + 2 décisions à prendre | Reclassifier 15 questions + valider pondération |
| 4 | `LIVRABLES/Audit/reflexion_methodologie_scoring.md` | Réflexion complète : 5 axes d'analyse du scoring | Lecture optionnelle — le raisonnement derrière |
| 5 | `LIVRABLES/Audit/glossaire_reco_vs_mt.md` | Définitions Reco vs MT | Contexte |

### Message à copier-coller

> Voici les résultats du travail de structuration des recommandations et l'analyse du scoring.
>
> **Ce qu'on a fait** :
> - On a pris les 324 textes de recos du CAT, supprimé les doublons, et regroupé par question pour arriver à **103 recommandations structurées** par Micro-Parcours. Les 299 micro-tâches ont été rattachées à ces recos.
> - On a analysé en détail le scoring actuel (38 questions scorées) vs le scénario où toutes les questions "état" seraient scorantes (55 questions).
>
> **Ce dont j'ai besoin** :
>
> 1. **Valider les regroupements** — le doc principal (`recos_regroupees_par_mp.md`) montre chaque MP avec ses recos en tableau. Vérifie que ça fait sens cliniquement.
>
> 2. **Vérifier les 20 cas à risque** — le doc risque (`risques_regroupements_phase3.md`) liste 20 cas où le regroupement est un peu forcing :
>    - **9 cas 🔴** mélangent médical + social + psycho → tu veux séparer ?
>    - **11 cas 🟡** même thème mais titres à reformuler
>    - Pour chaque cas, annote : ✅ (garder), ❌ (séparer), ou 📝 (reformuler)
>
> 3. **Scoring — 6 décisions à prendre** (doc `scoring_vs_legacy_vs_toutes_etat.md`) :
>    - 4 questions "facteur" sont scorées dans le legacy → garder ou retirer ?
>    - V2 chute de 22 à 8 pts si on corrige → acceptable ?
>    - Pondération uniforme (+1) ou différenciée (+1/+2) par gravité clinique ?
>    - Seuils d'interprétation : uniformes ou par V ?
>    - Le doc détaille chaque cas avec mon raisonnement et ma recommandation.
>
> 4. **Définir les activation_rules manquantes** — 3 MPs n'ont pas de règle d'activation : **A4**, **F6**, **M6**.
>
> Les textes originaux sont tous conservés dans les sections dépliables des docs si besoin.

### Retours attendus

| # | Retour | Impact |
|---|---|---|
| 1 | Validation regroupements (✅/❌/📝 sur les 20 cas) | On ajuste les recos en base |
| 2 | Scoring : 6 décisions (voir doc) | On peut produire les templates scoring |
| 3 | Activation rules pour A4, F6, M6 | On peut compléter les niveaux manquants |

---

## 📝 Notes

| Principe | Détail |
|----------|--------|
| **KERNEL = source de vérité** | Tout part du RECAP_FONDATION_MONKA.md |
| **Questions figées** | 150 état/facteur + 15 triggers. Pas de modifications |
| **Ordre strict** | Phase 0 → 1 → 2 → 3 → 4 → 5 → 6 |
| **Validation incrémentale** | Chaque phase validée avant la suivante |
| **IA propose, médecin valide** | Toute proposition IA est documentée avec justification |
| **Data quality** | 0 reco perdue, 0 MT perdue pendant les opérations |
