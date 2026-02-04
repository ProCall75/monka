# 🏠 Monka - Repository Principal

> **Simulateur de vulnérabilité pour aidants et proches**  
> **Date réorganisation** : 03/02/2026  
> **Statut** : 🚧 En cours de refonte (système personas)

---

## 📁 Structure du Repository

```
/monka/
├── SOURCES/                           # 🆕 Sources officielles centralisées
│   ├── legacy/                        # Fichiers Legacy Word (16 fichiers, versions finales)
│   ├── excel/                         # Fichiers Excel (questionnaires, micro-parcours, recos)
│   └── doc_tampon_modifications.md    # ⭐ Trace des modifications non-Legacy
│
├── QUESTIONNAIRE/                     # 🆕 Questionnaires par vulnérabilité
│   ├── V1_social_relationnel/
│   │   └── base/                      # ✅ Version de base complète
│   │       ├── README.md               # Vue d'ensemble V1
│   │       ├── social_vulnerability_test.md  # Questions
│   │       ├── asr_definitions.md      # ASR (R1-R4)
│   │       ├── micro_taches_typologie.md  # 39 micro-tâches
│   │       └── ccc_recommendations/    # 8 CCC V1
│   ├── V2_fragilite_proche/
│   │   └── base/                      # ✅ Version de base complète
│   │       └── V2_docs/                # 6 fichiers V2
│   ├── V3_sante_aidant/               # 🔜 À créer
│   ├── V4_parcours_medical/           # 🔜 À créer
│   └── V5_administrative/             # 🔜 À créer
│
├── PERSONNAS/                         # 🆕 Définitions personas (phase future)
│   ├── AIDANTS/                       # Personas catégorie AIDANTS
│   └── AIDES/                         # Personas catégorie AIDÉS
│
├── DEMO/                              # 🆕 Démos et visuels pour présentations
│   ├── monka_simulator.html           # Simulateur V1
│   ├── asr_tracking_ux.md             # Spécifications UX suivi ASR
│   └── brief_projet_personnalisation.md  # Brief refonte personas
│
├── monka_simulator.html               # ⚠️ À déplacer vers /DEMO/
├── V2_fragilite_proche/               # ⚠️ Dossier original V2 (doublon)
└── [Fichiers racine à nettoyer]       # ⚠️ Voir plan_nettoyage_validation.md
```

**📐 Structure Standardisée par Vulnérabilité**

Chaque vulnérabilité suit la même structure documentaire (7 fichiers) :
- `README.md` - Vue d'ensemble + stats
- `questions.md` - Questions + options + scores
- `asr_definitions.md` - Axes de Suivi Renforcé
- `ccc_recommendations.md` - Combinaisons Critiques Complexes
- `recommendations.md` - Recommandations par question  
- `micro_taches_typologie.md` - 5 types de micro-tâches
- `audit_completude.md` - Audit automatisé complétude

📋 **Voir** : [Structure documentaire standard](file:///Users/antonin/.gemini/antigravity/brain/2bcdd9ef-314a-4086-854a-8030dc296553/structure_documentaire_standard.md) pour répliquer V2-V5

---

## 🎯 Vulnérabilités (5 au total)

| Code | Nom | Questions | Recos | Actions IDEC | Triggers | Status |
|------|-----|-----------|-------|--------------|----------|--------|
| **V1** | Social & Relationnel | 16 | 12 | 30 | 25 | ✅ Réf. |
| **V2** | Fragilité du Proche | 57 | 110 | 116 | 38 | ✅ 100% Excel |
| **V3** | Santé de l'Aidant | 27 | 52 | 92 | 30 | ✅ 100% Excel |
| **V4** | Parcours Médical | 36 | 139 | 161 | 35 | ✅ 100% Excel |
| **V5** | Administrative | 18 | 4 | 39 | 24 | ✅ 100% Excel |

**TOTAL** : 154 questions, 317 recommandations, 438 actions IDEC, 152 triggers

> ✅ **100% EXTRAIT depuis Excel** - AUCUNE déduction IA

---

## 📝 Fichiers Importants

### 🔴 CRITIQUE : Lire en priorité

1. **[SOURCES/doc_tampon_modifications.md](SOURCES/doc_tampon_modifications.md)**  
   → Trace TOUTES les modifications faites (non documentées dans Legacy)  
   → Rédigé de façon vulgarisée pour le médecin fondateur

2. **[QUESTIONNAIRE/V1_social_relationnel/base/social_vulnerability_test.md](QUESTIONNAIRE/V1_social_relationnel/base/social_vulnerability_test.md)**  
   → Modèle de référence pour toutes les vulnérabilités

3. **[QUESTIONNAIRE/V2_fragilite_proche/base/V2_docs/README.md](QUESTIONNAIRE/V2_fragilite_proche/base/V2_docs/README.md)**  
   → Documentation complète V2 avec sources et méthodologie

### 🟠 IMPORTANT : Fichiers de référence

- **SOURCES/legacy/** : Fichiers Word officiels (source de vérité clinique)
- **SOURCES/excel/** : Fichiers Excel avec questions, micro-parcours, recommandations

---

## 🚀 En Cours : Refonte Personas

**Objectif** : Personnaliser le questionnaire selon le profil (persona) de l'utilisateur

**Plan en 4 phases** :

| Phase | Objectif | Statut | Durée estimée |
|-------|----------|--------|---------------|
| **PHASE 1** | Organisation repo | ✅ **EN COURS** | 1-2 jours |
| **PHASE 2** | Audit critiques vs CCC | 🔜 À démarrer | 1 jour |
| **PHASE 3** | Système personas | 🔜 À démarrer | 5-7 jours |
| **PHASE 4** | Démo HTML + industrialisation | 🔜 À démarrer | 4-6 jours |

**Voir détails** : [TODO Refonte Personas](https://brain/todo_refonte_personas.md)

---

## 📋 Règles du Repository

### ✅ À FAIRE

1. **Toujours** documenter les modifications dans `SOURCES/doc_tampon_modifications.md`
2. **Toujours** expliquer de façon **vulgarisée** (pour le médecin fondateur)
3. **Toujours** citer les sources (Excel, Legacy, ou déduction)
4. **Toujours** distinguer ✅ Source officielle vs ⚠️ Créé par déduction

### ❌ À NE PAS FAIRE

1. **Jamais** modifier les fichiers dans `SOURCES/legacy/` ou `SOURCES/excel/` (lecture seule)
2. **Jamais** créer de fichiers à la racine (utiliser les dossiers structurés)
3. **Jamais** dupliquer les fichiers (une seule source de vérité)

---

## 🔍 Changelog Repository

### 03/02/2026 - Réorganisation PHASE 1

- ✅ Création structure `/SOURCES/`, `/QUESTIONNAIRE/`, `/PERSONNAS/`, `/CCC/`, `/DEMO/`
- ✅ Migration Legacy : `legacy/` + `legacymail/` → `/SOURCES/legacy/`
- ✅ Suppression doublons : 3 fichiers Legacy 190126 (gardé versions 020226)
- ✅ Migration Excel : `questionnaireETMC/` + `recoMC/` → `/SOURCES/excel/`
- ✅ Migration V1 : fichiers de base → `/QUESTIONNAIRE/V1_social_relationnel/base/`
- ✅ Migration V2 : dossier complet → `/QUESTIONNAIRE/V2_fragilite_proche/base/`
- ✅ Création `doc_tampon_modifications.md` avec 3 premières décisions

---

## 📞 Contact & Validation

**Avant toute utilisation en production**, valider avec :
- Équipe clinique Monka (validation CCC, questions critiques, signatures ASR)
- Médecin fondateur (cohérence globale, explications vulgarisées)
- Équipe IDEC (micro-tâches, recommandations opérationnelles)

---

> 📄 README créé le 03/02/2026 - Repository Monka  
> 🏗️ **Structure** : Propre et organisée pour refonte personas  
> 📚 **Documentation** : Sources citées, modifications tracées
