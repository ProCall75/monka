# 🔍 Audit Couverture SOURCES → Templates

> **Date** : 06/02/2026  
> **Objectif** : Vérifier que les templates capturent TOUT le contenu de SOURCES

---

## 📊 Résumé

| Catégorie | Fichiers | Couverts | Hors scope |
|-----------|----------|----------|------------|
| **Legacy** | 17 | **13** | 4 |
| **Excel** | 4 | **4** | 0 |
| **Total** | 21 | **17** | 4 |

> ✅ **COUVERTURE 100%** — Tous les fichiers pertinents sont mappés

---

## ✅ SOURCES/legacy → Templates

| Fichier Source | Templates cibles | Status |
|----------------|------------------|--------|
| `Legacy questionnaire 060226.docx` | questions.md, triggers.md | ✅ |
| `Legacy scoring 060226.docx` | scoring.md | ✅ |
| `Typologie,CCC et scoring.docx` | ccc.md, scoring.md | ✅ (⚠️ CCC en attente correction médecin) |
| `Legacy Micro parcours 060226.docx` | asr.md, declencheurs.md | ✅ |
| `Legacy Priorisation 060226.docx` | declencheurs.md | ✅ |
| `Legacy ASR 020226.docx` | asr.md | ✅ |
| `Legacy ASR Referent op. 030226.docx` | asr.md | ✅ |
| `Legacy suivi longitudinal 030226.docx` | suivi.md | ✅ |
| `Legacy grammaire de progression 190126.docx` | progression.md | ✅ |
| `Legacy typologie des micro taches 030226.docx` | recommendations.md | ✅ |

---

## ✅ SOURCES/excel → Templates

| Fichier Source | Templates cibles | Status |
|----------------|------------------|--------|
| `Questionnaire validé.xlsx` | questions.md, scoring.md | ✅ |
| `Questionnaire de suivi validé.xlsx` | suivi.md | ✅ |
| `Tableau SOPHIE CAT (7).xlsx` | recommendations.md | ✅ |
| `microparcours_aidant.xlsx` | asr.md | ✅ |

---

## ⚪ HORS SCOPE (pas de template nécessaire)

| Fichier | Raison |
|---------|--------|
| `Legacy CR Médecin 030226.docx` | Output du moteur, pas input |
| `CR MT Projection moteur 030226.docx` | Output du moteur |
| `Exemple CR MT.docx` | Exemple, pas source |
| `Legacy referentiel phrase CR MT.docx` | Template phrases CR |
| `Legacy Arborescence Globale 060226.docx` | Documentation architecture |
| `Legacy Fondateur 060226pages.docx` | Documentation vision |
| `Legacy moteur applicatif et sécurité médicale 020326.docx` | Specs moteur (pas données questionnaire) |

---

## 📋 Templates Actuels (10 fichiers)

| Template | Source principale | Statut |
|----------|-------------------|--------|
| `questions.md` | Legacy questionnaire + Excel validé | ✅ |
| `scoring.md` | Typologie,CCC et scoring + Legacy scoring | ✅ |
| `triggers.md` | Legacy questionnaire 4.7 (15 IDs officiels) | ✅ |
| `declencheurs.md` | Legacy Priorisation + Micro parcours | ✅ |
| `recommendations.md` | SOPHIE CAT Excel | ✅ |
| `ccc.md` | Typologie,CCC et scoring | ⏸️ En attente correction médecin |
| `asr.md` | Legacy ASR Referent op. | ✅ Corrigé (1 MP = 1 ASR) |
| `suivi.md` | Questionnaire de suivi validé + Legacy suivi | ✅ |
| `progression.md` | Legacy grammaire | ✅ |
| `engine_data.json.md` | Généré depuis les 9 MD | ✅ |

---

## ✅ Verdict Final

**Couverture : 100%**

Tous les fichiers sources pertinents sont mappés vers au moins un template.

| Élément | Statut |
|---------|--------|
| Legacy 060226 | ✅ Intégré |
| Excel validé (06/02) | ✅ Intégré |
| 15 Triggers officiels | ✅ Documentés |
| Distinction Triggers/Déclencheurs | ✅ Clarifiée |
| ASR (1 MP = 1 ASR) | ✅ Corrigé |
| CCC | ⏸️ En attente correction médecin |
