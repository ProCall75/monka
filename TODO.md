# 📋 TODO — Monka Clinical Engine

> **Mise à jour** : 19/02/2026 — 21h40  
> **Contexte** : Points à valider/produire suite au mail Dr. Monka du 19/02 + ajouts Antonin

---

## ✅ PRIORITÉ 1 — Validation Clinique (Dr. Monka)

> **STATUT** : ✅ Phase 1 terminée côté PRAGMA — **⏳ En attente retour Dr. Monka** pour valider et trancher les décisions ouvertes.
>
> **Livrables produits** :
> - [`audit_micro_taches_369.md`](LIVRABLES/Audit/audit_micro_taches_369.md) — Audit 369 MT
> - [`METHODE_VERSIONING_PERSONAS.md`](METHODE_VERSIONING_PERSONAS.md) + [`VERSIONING_PERSONAS.xlsx`](VERSIONING_PERSONAS.xlsx) — Modèle personas
> - [`audit_scoring_monka.md`](LIVRABLES/Audit/scoring/audit_scoring_monka.md) — Audit scoring (7 problèmes, 5 alternatives)
> - [`audit_recos_categories_rules.md`](LIVRABLES/Audit/audit_recos_categories_rules.md) — Audit recos/catégories/rules (11 problèmes, 4 critiques)

### 1.1 — Validation des Micro-Tâches (MT)

> **Audit produit** : [`audit_micro_taches_369.md`](LIVRABLES/Audit/audit_micro_taches_369.md)

- [x] Audit complet des 369 MT (placement, wording, cohérence) → 6 problèmes + 3 alertes wording
- [ ] Valider les recommandations d'audit avec Dr. Monka
- [ ] Appliquer les corrections (fusions, ajouts, réécriture wording)

### 1.2 — Modèle de Pertinence par Type d'Aidance

> Modèle ADDITIF validé : socle 130Q + blocs aidance empilables (N3 multi-choix) + overlay âge fixe (<18 / 60+).

**Livrables produits** :
- [`METHODE_VERSIONING_PERSONAS.md`](METHODE_VERSIONING_PERSONAS.md) — Document méthode complet
- [`VERSIONING_PERSONAS.xlsx`](VERSIONING_PERSONAS.xlsx) — Excel 7 onglets (README + socle + blocs + overlays + 80 combinaisons + triggers)

**Modifications à appliquer en base** :
- [ ] Passer N3 en multi-réponse (Choix Unique → Choix Multiples)
- [ ] Corriger tranches d'âge O1 : (-15, 15-20, 20-60, 60-75, +75) → (<18, 18-59, 60-75, 75+)

**Travail terminé** :
- [x] Définir le modèle additif (socle + blocs aidance + overlay âge)
- [x] Documenter les 20 règles overlay <18 ans par type d'aidance
- [x] Documenter les 28 règles overlay 60+ ans par type d'aidance
- [x] Générer l'Excel avec toutes les combinaisons possibles (80)
- [x] Ajouter un onglet README explicatif dans l'Excel

**À valider avec Dr. Monka** :
- [ ] Valider les règles overlay <18 et 60+ (acteurs, MTs, V renforcées)
- [ ] Valider les modifications N3 et O1
- [ ] Confirmer les combinaisons pertinentes vs non pertinentes

### 1.3 — Validation du Scoring

> **Livrable produit** : [`audit_scoring_monka.md`](LIVRABLES/Audit/scoring/audit_scoring_monka.md) — Audit complet (7 problèmes, 5 angles morts méthode, comparaison 5 alternatives psychométriques, simulations, plan validation 4 phases)

- [x] Audit complet de la méthodologie de scoring (METHODOLOGIE_SCORING.md + SCORING_V1 à V5)
- [x] Remise en question de la méthode à 2 critères (C1 Informativité + C2 Fiabilité)
- [x] Comparaison avec alternatives : CVR Lawshe, Item-Total Correlation, EFA, IRT, scoring bi-dimensionnel
- [x] Identification de 6 problèmes techniques (résolution inégale, métadonnées V4, conditionnelles, plateau +1)
- [x] Simulations 3 profils types (léger/modéré/sévère) montrant le problème de sensibilité

**⏳ En attente validation Dr. Monka** :
- [ ] Valider la méthodologie C1+C2 comme méthode MVP retenue
- [ ] Trancher les 7 décisions identifiées (seuils adaptatifs, +2 en V1, C2bis, scores max par profil...)
- [ ] Appliquer le scoring validé en base Supabase

### 1.4 — Audit des Recommandations, Catégories & Règles d'Activation

> **Livrable produit** : [`audit_recos_categories_rules.md`](LIVRABLES/Audit/audit_recos_categories_rules.md) — 198 recos, 73 catégories, 235 rules auditées. **11 problèmes identifiés dont 4 critiques** (recos prévention inertes, chaînes cassées, trous critiques S2/F2, 32 questions muettes).

- [x] Auditer les 198 recommandations (wordings ✅, 4 niveaux, cohérence par MP)
- [x] Auditer les 73 catégories (0 orphelines, répartition 2-4 par MP, couverture par niveau)
- [x] Auditer les 235 règles d'activation (condition_logic JSONB, 130 questions référencées, intégrité)
- [x] Vérifier la criticité : **5 MPs sans règles critiques** (S2, F1, F2, S3, S4) 🔴
- [x] Identifier les catégories orphelines → **0** ✅
- [x] Deep audit : 0 rules prévention, 2 chaînes cassées, 32 questions muettes, escalade non doc
- [x] Produire le livrable v2 : `audit_recos_categories_rules.md` ✅

**⏳ En attente validation Dr. Monka** :
- [ ] Trancher les 11 décisions (prévention fallback?, chaînes cassées F5/M4, S2/F2 critiques, questions muettes...)
- [ ] Créer les rules critiques pour S2, F2, F1, S3
- [ ] Créer les recos critiques pour F5_CAT_01, M4_CAT_03

---

## 🟠 PRIORITÉ 2 — Simulateur & Personas

### 2A — Vue MP drill-down dans le simulateur ✅

> **TERMINÉ** — Clic sur un MP dans l'onglet Activation → vue détaillée complète.

- [x] Ajout état `selectedMP` + navigation MP liste ↔ MP détail
- [x] Vue drill-down : catégories, règles (fired/unfired avec Q&A), recos (highlight active), MTs (ASR vs amélioration)
- [x] Liste MP enrichie : nombre de catégories, ratio règles fired, chevron cliquable
- [x] TypeScript compile sans erreurs, app tourne

### 2B — Personas par type d'aidance (⏳ après retour Dr. Monka)

> Type d'aidance (N3) = la catégorie. Personas = humains fictifs à l'intérieur, avec réponses pré-enregistrées cohérentes.

- [x] Définir les catégories de personas (croisement aidance × âge) → 80 combinaisons identifiées
- [ ] Regrouper les personas existants par N3 dans `PersonasPage.tsx`
- [ ] Refaire les réponses pré-enregistrées cohérentes avec le profil aidance
- [ ] Intégrer filtre profil aidance (N3 + overlay âge) dans le moteur

### 2C — Arbre de décision interactif (~6-8h)

> Composant standalone : Score Global → V → MP → Catégorie → Recos/MTs. Expand/collapse interactif avec animations.

- [ ] Créer composant `DecisionTreeView.tsx`
- [ ] Niveau 0-1 : Score global + Vulnérabilités (V1-V5) avec scores et jauges
- [ ] Niveau 2 : MPs avec statut activé/inactif
- [ ] Niveau 3 : Catégories + règles + recos + MTs
- [ ] Ajouter comme nouvel onglet dans SimulatorPage
- [ ] Tester avec personas existants

---

## 🟡 PRIORITÉ 3 — Klésia & Dispatch CM

> Architecture de dispatch documentée dans [`ARCHITECTURE_DISPATCH_KLESIA.md`](ARCHITECTURE_DISPATCH_KLESIA.md). Dispatch au niveau MT (pas utilisateur). IDEC = gatekeeper. 82% medico-social → CM, 18% médical.

- [x] Modéliser la logique de dispatch Klésia (CM vs Médical) → `ARCHITECTURE_DISPATCH_KLESIA.md`
- [x] Analyser la répartition MT par domaine (82% médico-social / 18% médical)
- [ ] Définir les critères de dispatch précis (seuils, questions déclenchantes)
- [ ] Créer une simulation sur ce sujet pour valider les ratios
- [ ] Valider avec Dr. Monka que le modèle est cliniquement cohérent

---

## 🔵 PRIORITÉ 4 — Validation App & Données

### 4.1 — Vérification remontée des données

- [ ] Vérifier que TOUTES les données remontent correctement dans l'app
- [ ] Tester les 5 vulnérabilités avec des réponses complètes
- [ ] Vérifier scoring temps réel vs attendu
- [ ] Vérifier activation rules → MP actifs vs attendu
- [ ] Vérifier recos et MT affichées vs base Supabase

### 4.2 — 🔥 Refonte UX/Clinique du Moteur — 7 Phases

> **Objectif global** : Aider au mieux le médecin à confronter et évaluer la pertinence de son moteur/questionnaire clinique. Rendre chaque élément compréhensible, actionable et professionnel pour tous les publics (créateurs, CEOP, investisseurs, utilisateurs finaux).

---

#### Phase A — Restructuration des Onglets du Simulateur

> **Problème** : 6 onglets internes (Scoring, Activation, Recos, Règles, Tâches, Résumé) — trop granulaires, redondants, pas pertinents. On ne comprend pas ce qui est activé ou non, les contrastes sont faibles.

**Nouvelle architecture proposée :**

| Onglet | Contenu | Remplace |
|--------|---------|----------|
| **Micro-Parcours** | Activation + Recos + MTs combinés, drill-down par MP avec explications | Activation + Recos + Tâches |
| **Scoring** | Scores V1-V5 + jauges + seuils (conservé) | Scoring |
| **Règles** | Règles avec `sens_clinique` + statut fired/unfired visuellement net | Règles (enrichi) |
| **CR Médecin** | Rapport complet promu en onglet dédié | Résumé (renommé + amélioré) |

- [ ] Réduire de 6 à 4 onglets dans `SimulatorPage.tsx`
- [ ] Fusionner Activation + Recos + Tâches → onglet unique **Micro-Parcours**
- [ ] **Contraste activé/non activé** : bordure vive + badge coloré pour les éléments activés vs grisé net pour les inactifs — la distinction doit sauter aux yeux
- [ ] Extraire les composants → `SimulatorMPTab.tsx`, `SimulatorRulesTab.tsx`, `SimulatorCRTab.tsx` (décomposer les 2044 lignes)

---

#### Phase B — Explications Cliniques & Kernel à Chaque Étape

> **Problème** : On affiche des IDs techniques (N36, R_V2_S1_02) sans jamais expliquer pourquoi une règle s'active, quel est le sens clinique, ni la logique kernel derrière. On ne comprend rien si c'est pertinent ou non.

- [ ] **Arrêter les IDs bruts** : partout dans l'app, remplacer N36 / O1 / etc. par la vraie question écrite en français complet
- [ ] **Explication kernel par règle** : afficher en tooltip/inline sous chaque règle, pourquoi cette combinaison de conditions déclenche cette catégorie (basé sur `sens_clinique` existant en DB)
- [ ] **Explication clinique par MP** : afficher l'`objectif` du MP + justification clinique de son existence
- [ ] **"Pourquoi cette question ?"** : pour chaque question, expliquer à quels MPs elle contribue et pourquoi elle a été choisie — stocké en DB pour édition dynamique
- [ ] Créer un champ `explication_clinique` sur les tables `questions`, `micro_parcours`, `activation_rules` si absent → migration Supabase
- [ ] Stocker les explications enrichies en base proprement (pas en dur dans le code)

---

#### Phase C — Refonte Vue Externe (inspirée app Marwane)

> **Problème** : La vue externe actuelle n'est pas assez actionable ni interactive. Il faut s'inspirer de la démo de Marwane avec niveaux visuels, drill-down interactif, prévention.

- [ ] **Hiérarchie visuelle par urgence** : sections 🔴 Critique → 🟠 CCC → 🟢 Standard → 💡 Prévention — séparation nette avec couleurs distinctes
- [ ] **Cards MP interactives** : chaque MP activé = card cliquable qui ouvre les recos + MTs associés
- [ ] **Wording utilisateur** : afficher `wording_utilisateur` (pas `wording_idec`) pour les recos et MTs
- [ ] **MTs de prévention** : section dédiée avec les MTs de MPs non activés (MTs `is_prevention = true`)
- [ ] **Recos de prévention** : recos `niveau = prevention` affichées en bas avec un style subtil
- [ ] **Acteurs identifiés** : chaque MT montre l'acteur (CM, IDEC, Médecin traitant...) avec badge coloré
- [ ] Extraire → `SimulatorExternalView.tsx`

---

#### Phase D — CR Médecin Traitant Professionnel

> **Problème** : Le CR actuel est basique, technique, pas assez professionnel. Il faut s'inspirer de `Legacy CR Médecin 030226.docx` et `CR MT Projection moteur 030226.docx`. Il faut que le CR soit personnalisé, stocké en DB, et exploite la finesse des données.

- [ ] **En-tête professionnel** : date d'évaluation, type d'évaluation, profil aidant/aidé, persona chargé
- [ ] **Rappel du persona** : afficher les réponses aux questions triggers (N3, O1...) **en français** avec le texte complet, pas les codes
- [ ] **Par MP activé dans le CR** :
  - Objectif clinique du MP
  - Résumé des règles déclenchées avec `sens_clinique`
  - Recommandations priorisées (critique > CCC > standard)
  - Acteurs identifiés (signature_a / signature_b)
- [ ] **Synthèse par V** : niveau de vulnérabilité (faible/modéré/élevé/critique) + phrase conclusive adaptée
- [ ] **Mode progression** : aperçu partiel visible AVANT que toutes les questions soient répondues (avec indicateur % complétion)
- [ ] **Stocker en DB** : templates CR, phrases types, éléments dynamiques → table `cr_templates` pour versions propres et personnalisées
- [ ] S'inspirer de `Legacy CR Médecin 030226.docx` + `CR MT Projection moteur 030226.docx` pour le format et le ton

---

#### Phase E — Refonte Fiche Question & Page Questions

> **Problème** : Le menu déroulant actuel des fiches questions est plat, pas de contraste, on ne met pas en valeur les bonnes données. Il faut se poser la question : quelles sont les données les plus intéressantes pour une fiche question ?

**Données clés à mettre en avant (par ordre de priorité) :**
1. Texte complet de la question (en français, lisible)
2. Vulnérabilité associée (V1-V5) avec couleur
3. MPs liés (avec statut activé/inactif si des réponses sont chargées)
4. Si scorante → poids du score + réponses scorantes mises en avant
5. Règles d'activation qui utilisent cette question → avec `sens_clinique`
6. Classification (état / facteur) + type de réponse
7. Aidance / sous-catégorie / bloc / sous-bloc

- [ ] **Nouveau layout fiche question** : header fort (question + V badge), corps en sections collapsibles, pas un simple dropdown
- [ ] **Filtres enrichis** : filtrer par vulnérabilité ET par MP directement dans le menu supérieur
- [ ] **Vue hiérarchique optionnelle** : V → Bloc → Sous-bloc → Questions (au lieu d'une liste plate)
- [ ] **Contraste scoring** : réponses scorantes en surbrillance avec le score affiché clairement
- [ ] **Lien vers simulateur** : clic sur un MP lié ouvre le détail dans le simulateur

---

#### Phase F — Refonte Page Vulnérabilités

> **Problème** : Les onglets actuels (overview, questions, scoring, MPs, rules, recos, MTs) avec les totaux sont pas pertinents et pas compréhensibles. Trop de tables brutes sans contexte.

- [ ] **Vue générale avec filtre** : une seule vue d'ensemble où tu peux filtrer par V — pas besoin de naviguer entre 5 V distinctes
- [ ] **Drill-down hiérarchique interactif** : V → MPs → Catégories → Règles + Recos + MTs — chaque niveau en blocs cliquables qui s'ouvrent
- [ ] **Explications intégrées** : à chaque niveau, expliquer "pourquoi ces questions et pas d'autres", "pourquoi ce MP existe", avec du contenu pédagogique
- [ ] **Stocker les explications en DB** : champ `explication` sur `vulnerabilities`, `micro_parcours`, `categories` pour contenu dynamique
- [ ] **Supprimer les tables brutes** : remplacer par des visualisations interactives (cards, accordéons, badges)

---

#### Phase G — Documents Officiels & Navigation Cleanup

> **Objectif** : Supprimer ce qui n'est pas pertinent, ajouter ce qui manque.

**Navigation :**
- [ ] **Supprimer l'onglet "Documentation"** de la Sidebar → le contenu migre vers les Documents Officiels
- [ ] **Ajouter l'onglet "Documents Officiels"** dans la Sidebar → `OfficialDocsPage.tsx`

**Documents officiels à produire** (pour tiers, investisseurs, CEOP, audits) :

*Gouvernance & Méthodologie :*
- [ ] 📄 **Dossier Méthodologique Clinique** — Méthodologie complète : 5V, scoring, 150 questions, activation, recos, MTs
- [ ] 📄 **Référentiel de Validation** — Processus de validation clinique, phases de test, résultats des audits
- [ ] 📄 **Architecture Technique du Moteur** — Schéma data, flux Supabase, clinicalEngine, sécurité

*Audits & Qualité :*
- [ ] 📄 **Rapport d'Audit 369 MT** — Formalisation de `audit_micro_taches_369.md`
- [ ] 📄 **Rapport d'Audit Scoring** — Formalisation de `audit_scoring_monka.md`
- [ ] 📄 **Rapport d'Audit Recos/Rules** — Formalisation de `audit_recos_categories_rules.md`
- [ ] 📄 **Couverture Clinique** — Taux couverture par V, questions muettes, gaps

*Data & Preuve :*
- [ ] 📄 **Dictionnaire de Données** — Tables, champs, relations, types — généré depuis Supabase
- [ ] 📄 **Matrice de Traçabilité** — Question → Règle → Catégorie → Reco → MT (chaîne complète)
- [ ] 📄 **Statistiques du Moteur** — Totaux par V avec répartition

*Présentation :*
- [ ] 📄 **Executive Summary** — Résumé exécutif pour investisseurs (1-2 pages)
- [ ] 📄 **Fiche Produit** — Description produit Monka, USP, différenciation marché

**Implémentation app :**
- [ ] Créer `OfficialDocsPage.tsx` — liste documents avec statut (✅ produit / 🔨 en cours / ❌ à faire)
- [ ] Bouton téléchargement PDF/DOCX pour chaque document
- [ ] Rendu professionnel et propre

---

## 🟣 PRIORITÉ 5 — Réflexion & Livrables

### 5.1 — 🧠 Onglet « Réflexion » — Blog Articles Kernel

> **Objectif** : Instruire et éduquer notre audience (Dr. Monka, CEOP, investisseurs, partenaires cliniques) sur les choix de conception du moteur clinique. Format = articles de blog, chacun répondant à une **question clé**. Ton subtil, pédagogique, orienté compréhension.

**Articles à produire** (chacun = 1 page dans l'onglet Réflexion) :

- [ ] 🎯 *Pourquoi 5 vulnérabilités et pas 3 ou 7 ?* — Justification clinique de la décomposition V1-V5
- [ ] 📊 *Pourquoi cette méthode de scoring (C1 + C2) ?* — Choix psychométriques, alternatives écartées, simulations
- [ ] 🔀 *Pourquoi des Micro-Parcours et pas des parcours linéaires ?* — Architecture modulaire, adaptabilité
- [ ] ⚡ *Comment fonctionne l'activation des règles ?* — Logique AND, 9 opérateurs, niveaux critique/CCC/standard
- [ ] 🧬 *Pourquoi le modèle additif pour les types d'aidance ?* — Socle 130Q + blocs empilables + overlays âge
- [ ] 🎯 *Pourquoi distinguer MTs contributives vs amélioration ?* — ASR, sécurisation vs bien-être
- [ ] 🏥 *Comment sont définis les acteurs par Micro-Tâche ?* — Écosystème STRUC/SEC/MED/INFO/ORGA
- [ ] 📋 *Pourquoi des recommandations à 4 niveaux ?* — Prévention, standard, CCC, critique
- [ ] 🔒 *Comment garantir la pertinence des questions ? (32 questions muettes)* — Audit, validation clinique
- [ ] 🗺️ *Comment l'arbre de décision guide le parcours utilisateur ?* — Du score global au MT actionable

**Implémentation app :**
- [ ] Créer l'onglet "Réflexion" dans la Sidebar
- [ ] Créer la page `ReflexionPage.tsx` — liste des articles avec preview
- [ ] Stocker le contenu des articles en base Supabase (table `blog_articles` : titre, question, contenu, ordre)
- [ ] Rendu Markdown → HTML propre dans l'app

### 5.2 — Documents existants à améliorer / checker

- [ ] Faire l'inventaire des documents existants dans les livrables
- [ ] Identifier les documents à mettre à jour ou améliorer
- [ ] Identifier les documents manquants à ajouter
- [ ] Valider la liste des livrables finaux avec Dr. Monka

---

## 📅 PRIORITÉ 6 — Calendrier de Réalisation

> Dr. Monka demande un calendrier pour sa vision personnelle.

- [ ] Estimer les durées par bloc de tâches
- [ ] Proposer un calendrier réaliste (semaine par semaine)
- [ ] Partager avec Dr. Monka pour validation

---

## 📝 Notes

| Principe | Détail |
|----------|--------|
| **Ordre de priorité** | 1. Validation clinique → 2. Simulateur/Personas → 3. Klésia → 4. App → 5. Docs → 6. Calendrier |
| **Dr. Monka valide** | Toute décision clinique passe par validation Dr. Monka |
| **Format exports** | Produire des docs lisibles (pas du MD brut) pour Dr. Monka |
| **Klésia** | 90-95% vers CM sauf questions critiques médical |
