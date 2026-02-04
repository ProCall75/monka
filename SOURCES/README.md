# 📚 SOURCES - Données Officielles Monka

> **Dernière mise à jour** : 03/02/2026  
> **Contenu** : 16 fichiers Legacy + 4 fichiers Excel  
> **Rôle** : Source de vérité unique pour le moteur clinique

---

## 🎯 Ce Dossier

Ce dossier contient **toutes les données sources officielles** du projet Monka.  
Aucune information clinique ne doit exister ailleurs que dans ce dossier.

**Règle d'or** : Si ce n'est pas ici, ça n'existe pas officiellement.

---

## 📁 Structure

```
/SOURCES/
├── legacy/                        # 16 fichiers Word (.docx)
├── excel/                         # 4 fichiers Excel (.xlsx)
└── doc_tampon_modifications.md    # Décisions hors Legacy
```

---

## 📄 LEGACY (16 fichiers Word)

Documents cliniques officiels validés par l'équipe médicale.

### 🔵 Questionnaire & Scoring

| Fichier | Contenu | Vulnérabilités |
|---------|---------|----------------|
| `Legacy questionnaire 290127.docx` | Questions V1-V5, formulations, options | V1, V2, V3, V4, V5 |
| `Legacy scoring 310127.docx` | Scoring, seuils, interprétations | V1, V2, V3, V4, V5 |
| `Typologie,CCC et scoring.docx` | CCC, combinaisons critiques | V1, V2 |

### 🟢 Micro-Parcours & Micro-Tâches

| Fichier | Contenu |
|---------|---------|
| `Legacy Micro parcours 030226.docx` | ASR (R1-R4), définitions micro-parcours |
| `Legacy typologie des micro taches 030226.docx` | 5 types (STRUC, SEC, MED, INFO, ORGA) |
| `Legacy grammaire de progression 190126.docx` | Règles de progression patient |

### 🟣 Priorisation & Sécurité

| Fichier | Contenu |
|---------|---------|
| `Legacy Priorisation 300127.docx` | Niveaux de priorité (1-3), règles |
| `Legacy moteur applicatif et sécurité médicale 020326.docx` | Logique moteur, garde-fous |

### 🟠 Suivi & Compte-Rendus

| Fichier | Contenu |
|---------|---------|
| `Legacy suivi longitudinal 030226.docx` | Suivi dans le temps, indicateurs |
| `Legacy CR Médecin 030226.docx` | Format compte-rendu médecin |
| `CR MT Projection moteur 030226.docx` | Projection micro-tâches |
| `Exemple CR MT.docx` | Exemple de compte-rendu |
| `Legacy referentiel phrase CR MT 030226.docx` | Phrases types CR |

### 🔴 Référentiels

| Fichier | Contenu |
|---------|---------|
| `Legacy ASR Referent op. 030226.docx` | Référentiel opérationnel ASR |
| `Legacy Arborescence Globale 030226.docx` | Vision globale architecture |
| `Legacy Fondateur 030226pages.docx` | Vision fondateur |

---

## 📊 EXCEL (4 fichiers)

Matrices de données structurées pour extraction automatisée.

| Fichier | Contenu | Usage Principal |
|---------|---------|-----------------|
| `Questionnaire_Etienne_1258.xlsx` | Questions complètes V1-V5 | Extraction questions |
| `Questionnaire_Etienne_1258-1_suivi_mensuel.xlsx` | Suivi mensuel | Suivi longitudinal |
| `Tableau SOPHIE CAT + Reco-Nouveau questionnaire par Vulnérabilité(1).xlsx` | Recommandations + CCC | Recos + CCC |
| `microparcours_aidant.xlsx` | Micro-parcours, ASR | ASR + Micro-tâches |

---

## 📝 DOC TAMPON

**`doc_tampon_modifications.md`** - Trace des décisions hors Legacy

Contient :
- Décisions cliniques non présentes dans les Legacy
- Modifications validées post-rédaction Legacy
- Éléments déduits par IA et validés par Monka

**Règle** : Vulgarisé pour le médecin fondateur (pas de jargon technique)

---

## 🔗 Correspondance Sources → Vulnérabilités

| Vulnérabilité | Excel Principal | Legacy Principal |
|---------------|----------------|------------------|
| **V1** - Social/Relationnel | `Questionnaire_Etienne_1258.xlsx` | `Legacy questionnaire 290127.docx` |
| **V2** - Fragilité Proche | `Tableau SOPHIE CAT.xlsx` | `Legacy scoring 310127.docx` |
| **V3** - Santé Aidant | `Questionnaire_Etienne_1258.xlsx` | `Legacy questionnaire 290127.docx` |
| **V4** - Parcours Médical | `Questionnaire_Etienne_1258.xlsx` | `Legacy scoring 310127.docx` |
| **V5** - Administrative | `Questionnaire_Etienne_1258.xlsx` | `Legacy questionnaire 290127.docx` |

---

## ⚠️ Règles d'Utilisation

1. **Ne jamais modifier** les fichiers Legacy/Excel directement
2. **Toute modification** → Documenter dans `doc_tampon_modifications.md`
3. **Déductions IA** → Marquer clairement pour validation Monka
4. **Doublons** → Interdit (1 fichier = 1 source)

---

## 📋 Changelog

| Date | Action |
|------|--------|
| 03/02/2026 | Fusion `/new/` → 16 fichiers consolidés |
| 03/02/2026 | Migration Excel vers `/SOURCES/excel/` |
| 03/02/2026 | Création `doc_tampon_modifications.md` |

---

> 📚 Source de vérité unique - Monka Clinical Engine  
> 🔒 Fichiers en lecture seule - Modifications via doc_tampon uniquement
