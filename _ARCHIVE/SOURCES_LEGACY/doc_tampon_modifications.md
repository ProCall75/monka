# 📝 Document Tampon - Modifications & Décisions Monka

> **Objectif** : Documenter toutes les modifications et décisions NON décrites dans les fichiers Legacy  
> **Date création** : 03/02/2026  
> **Règle de rédaction** : **VULGARISÉ pour le médecin fondateur** (pas de jargon technique)

---

## 🎯 Pourquoi ce document ?

Les fichiers Legacy (dans `/SOURCES/legacy/`) contiennent la vision originale.  
**MAIS** certaines décisions ont été prises après, ou des ajustements ont été faits.  
Ce document **trace toutes ces modifications** de façon claire et compréhensible.

---

## 📋 Format des entrées

Chaque modification suit ce format :

```markdown
## 🟢 Décision N° : [Titre court]

**Date** : JJ/MM/AAAA  
**Contexte** : Quelle était la situation avant ?  
**Problème** : Quel problème on a identifié ?  
**Décision** : Quelle modification on a faite ?  
**Pourquoi ?** : Explication simple (pour le médecin fondateur)  
**Impact** : Conséquences concrètes

---
```

---

## 📌 Liste des modifications

### 🔵 Décision 1 : Organisation du repository

**Date** : 03/02/2026  
**Contexte** : Fichiers Legacy éparpillés dans `/legacy/` et `/legacymail/`, avec duplications  
**Problème** : Difficile de retrouver la source de vérité, risque d'utiliser de vieilles versions  
**Décision** : Consolidation dans `/SOURCES/legacy/` avec suppression des doublons  
**Pourquoi ?** : Un seul endroit pour les fichiers officiels = pas de confusion possible. Gardé les versions les plus récentes (février 2026 vs janvier 2026).  
**Impact** : 
- Supprimé 3 doublons : `Legacy ASR 190126.docx`, `Legacy CR Médecin 190126.docx`, `Legacy typologie 190126.docx`
- Gardé les versions du 02/02/2026 (plus récentes)
- Tous les Excel regroupés dans `/SOURCES/excel/`

---

### 🔵 Décision 2 : Création structure personas

**Date** : 03/02/2026  
**Contexte** : Questionnaire unique pour tous les profils  
**Problème** : Les recommandations ne sont pas adaptées selon qui répond (aidant épuisé ≠ aidant débutant ≠ proche autonome)  
**Décision** : Créer une architecture pour personnaliser selon le persona  
**Pourquoi ?** : Comme en médecine, on ne prescrit pas pareil à un diabétique qu'à un cardiaque. Ici pareil : un aidant épuisé n'a pas les mêmes besoins qu'un aidant qui débute.  
**Impact** : 
- Création dossiers `/PERSONNAS/AIDANTS/` et `/PERSONNAS/AIDES/`
- Création `/QUESTIONNAIRE/` pour versions personnalisées
- Création `/CCC/` pour CCC spécifiques par persona

---

### 🔵 Décision 3 : Extraction V2 depuis Excel

**Date** : 03/02/2026  
**Contexte** : V2 (Fragilité du Proche) n'était documentée que dans Excel  
**Problème** : Pas de format Markdown comme V1, difficile à utiliser  
**Décision** : Extraction complète V2 dans `/V2_fragilite_proche/`  
**Pourquoi ?** : Pour avoir la même qualité de documentation que V1 et pouvoir l'intégrer au simulateur.  
**Impact** : 
- 6 fichiers créés pour V2 (questions, ASR, CCC, micro-tâches, typologie)
- **ATTENTION** : Les 6 CCC de V2 sont **créées par déduction clinique** (à valider !)
- ~70-80 micro-tâches estimées (vs 39 pour V1)

---

### 🔵 Décision 4 : Fusion dossier /new/ avec SOURCES/legacy/

**Date** : 03/02/2026  
**Contexte** : Dossier `/new/` contenait 15 fichiers Legacy datés du 03/02/2026, plus récents que ceux dans `/SOURCES/legacy/`  
**Problème** : Risque de travailler avec des versions obsolètes si on garde les anciennes  
**Décision** : Fusion complète - copie de tous les fichiers de `/new/` vers `/SOURCES/legacy/` puis suppression des doublons  
**Pourquoi ?** : Comme avoir plusieurs versions d'un dossier médical pour le même patient = risque d'erreur. Il faut toujours la dernière version à jour.  
**Impact** : 
- **+5 nouveaux fichiers** : Legacy ASR Referent op., Arborescence Globale, grammaire de progression, referentiel phrase CR MT, CR MT Projection moteur
- **+10 fichiers mis à jour** : versions 030226 ou 300127 remplacent les 290126/250126/190126
- **-8 anciennes versions supprimées** : doublons obsolètes
- **Total final** : **16 fichiers Legacy** (vs 10 avant)
- Dossier `/new/` supprimé après fusion

---

## ⚠️ Éléments en attente de validation

| # | Élément | Statut | Priorité | Validateur |
|---|---------|--------|----------|------------|
| 1 | CCC V2 (6 combinaisons) | ⚠️ À valider | 🔴 Critique | Équipe clinique |
| 2 | Questions critiques V2 (O7, O8, N27) | ⚠️ À valider | 🔴 Critique | Médecin référent |
| 3 | Signatures ASR V2 (18 signatures) | ⚠️ À valider | 🟠 Importante | Équipe IDEC |
| 4 | Micro-tâches questions V2 (~40-50) | ⚠️ À compléter | 🟡 Moyenne | Équipe IDEC |

---

## 📝 Prochaines modifications à documenter

- [ ] Règle "Questions critiques ≠ CCC" (PHASE 2)
- [ ] Définition des personas (PHASE 3)
- [ ] Questions triggers identificatrices (PHASE 3)
- [ ] CCC spécifiques par persona (PHASE 3)
- [ ] Recommandations conditionnelles (PHASE 3)

---

> 📄 Document créé le 03/02/2026 - Modifications Monka  
> 🔍 **Maintenu par** : Équipe dev + Équipe clinique  
> ✍️ **Toujours expliquer de façon SIMPLE et CLAIRE**
