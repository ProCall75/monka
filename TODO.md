# 📋 TODO — Monka Clinical Engine

> **Mise à jour** : 09/02/2026  
> **Priorité #1** : Valider la base (KERNEL + données sources) avant toute production  
> **Source de vérité** : [`RECAP_FONDATION_MONKA.md`](KERNEL/RECAP_FONDATION_MONKA.md) (v4 FINALE — 13 règles K1→K13)

---

## 🧹 PHASE 0 — Nettoyage & Restructuration Repo

> **Objectif** : Supprimer le legacy, clarifier la structure, ne garder que ce qui sert.

- [x] **Archiver `QUESTIONNAIRE/`** → `_ARCHIVE/QUESTIONNAIRE_LEGACY/`
- [x] **Archiver `Q-V3/`** → `_ARCHIVE/Q-V3/`
- [x] **Déplacer fichiers orphelins racine** → `REFLEXION/`
- [x] **Archiver `AUTRES/`** → `_ARCHIVE/AUTRES/`
- [x] **Archiver `SOURCES/legacy+excel+scripts`** → `_ARCHIVE/SOURCES_LEGACY/`
- [x] **Archiver vieux simulateurs + DEMO/** → `_ARCHIVE/DEMO/`
- [x] **Archiver `AUDIT/`** → `_ARCHIVE/AUDIT/`
- [x] **Archiver KERNEL intermédiaires** (Vx, templates, all/, docs) → `_ARCHIVE/KERNEL_INTERMEDIATES/`
- [x] **Renommer `QUESTIONNAIRE_V2/`** → **`KERNEL/`**
- [x] **Réécrire `UNDERSTANDING.md`** aligné sur le KERNEL v4 (6 divergences corrigées)
- [x] **Docs IA** (CNRS + correspondance) → `IA/`
- [x] **Nettoyage READMEs** — 1 seul README à la racine
- [x] **Réécrire `README.md`** racine (explication complète du repo)

---

## ✅ PHASE 1 — Validation des Données Sources

> **Objectif** : S'assurer que les données sont cohérentes et complètes AVANT de remplir les templates.

### 1.1 — Référentiel Questions

Le fichier critique est dans `SOURCES/VERIF/Référence Questionnaire (1).xlsx` — contient la classification état/facteur de chaque question.

- [ ] **Extraire et documenter** le référentiel état/facteur
- [ ] **Mapper le référentiel état/facteur** sur les 150 questions

### 1.2 — Audit 150+15 vs 153 (URGENT — demande Dr. Monka)

> ⚠️ Coquille identifiée par le médecin : 153 questions dans le doc état/facteur vs 150+15 dans le questionnaire.

- [ ] **Lister les 150 questions** du questionnaire figé (par V1→V5)
- [ ] **Lister les 15 triggers** (liste fermée connue)
- [ ] **Lister les 153 questions** du doc état/facteur
- [ ] **Produire un rapport de différence** → Quelles 3 questions sont en trop ou en moins ?
- [ ] **Livrer ce rapport** au Dr. Monka

### 1.3 — Fiches Identité Questions (demande Dr. Monka)

> Chaque question doit avoir une fiche complète.

- [ ] **Créer une fiche par question** avec :
  - ID de la question
  - Libellé
  - Vulnérabilité (V1→V5)
  - MP associé(s) (micro-parcours)
  - MT associée(s) (micro-tâches)
  - Type de question : scorante / déclenchante / trigger / informative
  - Classification État / Facteur (depuis le nouveau référentiel VERIF)
- [ ] **Rapport de cohérence** entre la typologie (scorante/déclenchante/etc.) et la classification état/facteur
- [ ] **Livrer au format exploitable** (markdown + Excel si demandé)

### 1.4 — Export Excel du Questionnaire Figé (demande Dr. Monka)

> Oublié la dernière fois — à produire maintenant.

- [ ] **Exporter le questionnaire figé (150 + 15 triggers)** → fichier Excel
- [ ] **Exporter le questionnaire de suivi** → fichier Excel
- [ ] **Placer dans `LIVRABLES/excel/`** et envoyer au Dr. Monka

---

## 📝 PHASE 2 — Production des Templates KERNEL (A→E)

> **Objectif** : Remplir les 5 templates pour chaque V, en partant des données validées en Phase 1.

### 2.0 — Prérequis

- [ ] Phase 1 **entièrement validée** par Dr. Monka
- [ ] Templates vierges dans `TEMPLATES_FONDATION/` vérifiés et conformes au RECAP

### 2.1 — Pilote V1 (Social / Relationnel)

Remplir dans l'ordre de dépendance :

- [ ] **A** — `A_activation.md` → Règles d'activation de chaque MP de V1
- [ ] **E** — `E_scoring.md` → Scoring (indépendant, peut être fait en parallèle)
- [ ] **B** — `B_recos_variations.md` → Recos par niveau (Critique/CCC/Standard/Prévention)
- [ ] **C** — `C_master_mt_asr.md` → Toutes les MT + conditions de validation ASR
- [ ] **D** — `D_suivi.md` → Questions de suivi dynamique
- [ ] **Validation Dr. Monka** sur V1 complète

### 2.2 — Déploiement V2→V5

> Une fois le pilote V1 validé, le pattern est calé.

- [ ] V2 — Fragilité Proche (A→E)
- [ ] V3 — Santé Aidant (A→E)
- [ ] V4 — Santé Proche (A→E)
- [ ] V5 — Administrative (A→E)

### 2.3 — Transversaux

- [ ] **E_GLOBAL** — Scoring global inter-vulnérabilités
- [ ] **Triggers** — Mise à jour `all/triggers.md`
- [ ] **Progression** — Mise à jour `all/progression.md`

---

## 🖥️ PHASE 3 — Simulateur KERNEL (Vite/React)

> **Objectif** : Créer un simulateur rapide pour tester le KERNEL en live.
> Remplace les simulateurs legacy HTML (`monka_simulator.html`, `v2.html`, `v3.html`).

### 3.1 — Setup

- [ ] **Créer le projet** Vite + React + TypeScript dans `SIMULATOR/`
- [ ] **Définir le schéma JSON** alimenté par les templates (A→rules.json, B→content.json, C→engine.json, D→followup.json, E→scoring.json)
- [ ] **Générer les JSON** depuis les templates V1 remplis (adapter `generate_json_v3.py` ou réécrire)

### 3.2 — Fonctionnalités Core

- [ ] **Questionnaire interactif** : poser les 150 questions, collecter les réponses
- [ ] **Moteur d'activation** : déclencher les MP selon les réponses (K2/K3)
- [ ] **Affichage Recos** : afficher les recos par niveau d'activation (K1/K3/K4)
- [ ] **Moteur MT & ASR** : barre de progression, validation ASR (K9/K10/K11)
- [ ] **Scoring** : calcul en temps réel (K13)
- [ ] **CCC** : détection des conditions critiques composites
- [ ] **Suivi dynamique** : entonnoir 3 niveaux

### 3.3 — UX & Polish

- [ ] **Sélection de vulnérabilité** (V1→V5)
- [ ] **Personas / Profils de test** pour valider rapidement
- [ ] **Export résultats** (PDF ou partage)
- [ ] **Design premium** (pas un proto moche)

---

## 📊 PHASE 4 — Documentation Médecin

> **Objectif** : Fournir au Dr. Monka toute la documentation nécessaire basée exclusivement sur le KERNEL.

- [ ] **Rapport de cohérence état/facteur** (issu de Phase 1.3)
- [ ] **26 documents remplis** (5 templates × 5 V + E_GLOBAL)
- [ ] **Rapport d'audit global** consolidé (remplace les 9 rapports actuels dans `AUDIT/`)
- [ ] **Guide d'utilisation simulateur** pour le médecin
- [ ] **Excels exportés** du questionnaire figé + suivi

---

## 🟡 BACKLOG — Évolutions Futures (pas prioritaire)

### Copywriting & Contenu
- [ ] Audit des formulations : recos utilisateur vs MT IDEC
- [ ] Harmonisation du wording

### Personnalisation Personas
- [ ] Exploiter les triggers pour la détection de persona
- [ ] Personnalisation des recos selon persona détecté

### Maquettes UI/UX App Utilisateur
- [ ] Créer des maquettes pour l'app finale
- [ ] Proposer des améliorations UI/UX

### Intelligence Artificielle (fichiers VERIF)
- [ ] Analyser le plan CNRS Phase III
- [ ] Définir la correspondance Legacy→IA
- [ ] Préparer l'intégration IA sur le moteur KERNEL

---

## 📝 Notes

| Principe | Détail |
|----------|--------|
| **KERNEL = source de vérité** | Plus de legacy, plus de V1/V2 séparés. Tout part du RECAP_FONDATION_MONKA.md |
| **Questions figées** | 150 + 15 triggers. Pas de modifications |
| **Ordre strict** | Phase 0 → 1 → 2 → 3 → 4. Ne pas sauter |
| **Validation incrémentale** | Chaque phase est validée avant de passer à la suivante |
| **Excel = livrable médecin** | Le médecin travaille sur Excel, on lui fournit les exports |
| **Simulateur = outil de test** | Pour valider le KERNEL en live, pas un produit final |
