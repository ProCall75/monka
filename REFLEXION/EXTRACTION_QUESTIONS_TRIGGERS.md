# 📋 Extraction des Questions Triggers - Monka

> **Date d'extraction** : 04/02/2026  
> **Source** : `SOURCES/legacy/` + `SOURCES/excel/Questionnaire_Etienne_1258.xlsx`  
> **Demande** : Identification des questions triggers pour le système de personas

---

## 🎯 Résumé Exécutif

| Métrique | Valeur |
|----------|--------|
| **Total questions triggers identifiées** | **13** |
| **Source principale** | Onglet "Trigger" du questionnaire Excel (12 questions) |
| **Source secondaire** | Legacy Priorisation (1 question additionnelle) |

---

## 📚 Définition (Legacy Questionnaire)

> *« Les questions dites triggers ont pour fonction exclusive de cadrer le contexte global de la situation de l'aidant et de la personne aidée. »*

### Caractéristiques des questions triggers :
- ✅ Décrivent uniquement des **facteurs structurels, contextuels ou temporels**
- ✅ **Orientent l'activation des micro-parcours**
- ✅ **Adaptent les contenus et recommandations**
- ❌ Ne décrivent **jamais** un état physique, psychologique, social ou clinique
- ❌ Ne participent à **aucun scoring**
- ❌ Ne déclenchent **aucune priorisation** à elles seules

---

## 📊 Liste Complète des 13 Questions Triggers

### 🔵 Bloc 1 – Vous, l'aidant (6 questions)

| # | ID | Question | Type de réponse | Valeurs possibles |
|---|-----|----------|-----------------|-------------------|
| 1 | **N3** | Quelle proposition correspond le mieux à votre situation d'aidant ? | Choix Unique | J'aide une personne en perte d'autonomie liée au vieillissement \| J'aide une personne ayant une ou plusieurs maladies chroniques \| J'aide une personne en situation de handicap \| J'aide une personne souffrant de troubles psychiques \| J'aide une personne souffrant d'addictions sévères |
| 2 | **O35** | Quel est votre sexe biologique ? | Choix Unique | Homme \| Femme |
| 3 | **O36** | Quel est votre âge ? | Choix Unique | Entre 18 et 25 ans \| Entre 26 et 59 ans \| Entre 60 et 75 ans \| Plus de 75 ans |
| 4 | **N1** | Quelle activité exercez-vous ? | Choix Unique | Étudiant \| Salarié \| Fonctionnaire \| Indépendant, TNS \| Retraité \| Sans emploi |
| 5 | **O64** | Quel est le code postal de votre lieu de résidence ? | 5 chiffres | Saisie code postal |
| 6 | **O46** | Quel est votre lien de parenté avec la personne aidée ? | Choix Unique | Un de mes parents \| Un de mes grand-parents \| Mon conjoint ou ma conjointe \| Mon frère ou ma sœur \| Un de mes enfants \| Autre |

---

### 🟢 Bloc 2 – Votre proche (3 questions)

| # | ID | Question | Type de réponse | Valeurs possibles |
|---|-----|----------|-----------------|-------------------|
| 7 | **O14** | Quel est le sexe biologique de la personne aidée ? | Choix Unique | Homme \| Femme |
| 8 | **O1** | Quel est l'âge de la personne aidée ? | Choix Unique | Moins de 18 ans \| Entre 18 et 25 ans \| Entre 26 et 59 ans \| Entre 60 et 75 ans \| Plus de 75 ans |
| 9 | **O63** | Quel est le code postal du domicile de la personne aidée ? | 5 chiffres | Saisie code postal |

---

### 🟡 Bloc 4 – Votre santé (1 question - Source Legacy)

| # | ID | Question | Type de réponse | Valeurs possibles |
|---|-----|----------|-----------------|-------------------|
| 10 | **O49** | Depuis combien de temps l'aidez-vous ? | Choix Unique | Moins de 6 mois \| Entre 6 mois et 2 ans \| Depuis plus de 2 ans |

> ⚠️ **Note** : Cette question est classée dans l'onglet "Santé physique et psychologique" du questionnaire Excel, mais le **Legacy Priorisation** la qualifie explicitement de question trigger (ancienneté de l'aide).

---

### 🟣 Bloc 8 – Vos priorités et accompagnement (3 questions)

| # | ID | Question | Type de réponse | Valeurs possibles |
|---|-----|----------|-----------------|-------------------|
| 11 | **N26** | Selon vous quels sont les besoins complémentaires nécessaires à la bonne prise en charge de votre proche ? | Choix Multiples | Accessibilité et adaptation des soins \| Suivi médical spécialisé \| Suivi psychiatrique \| Prévention et dépistage \| Gestion administrative médicale \| Rééducation fonctionnelle \| Soins de communication et cognitifs \| Soins de confort et d'hygiène \| Accompagnement psychologique \| Appareillage et adaptation \| Accompagnement et aides techniques \| Gestion administrative \| Aucun |
| 12 | **E71** | Aujourd'hui, quelle est votre priorité principale ? | Choix Unique | Tenir physiquement et moralement dans mon rôle d'aidant \| Sécuriser au mieux mon proche à domicile \| Mettre à plat les démarches administratives et financières \| Mieux concilier mon travail et mon rôle d'aidant \| Je ne sais pas, j'ai besoin de faire le point |
| 13 | **E72** | Seriez-vous d'accord pour qu'une infirmière coordinatrice Monka vous contacte si votre situation le nécessite ? | Choix Unique | Oui \| Oui, mais plutôt par messagerie dans l'app \| Non, pas pour l'instant |

---

## 🎯 Classification par Fonction

### Facteurs de Contexte (Profil)
| ID | Fonction |
|----|----------|
| N3 | Type de situation d'aidance |
| O35, O14 | Sexe biologique (aidant / aidé) |
| O36, O1 | Âge (aidant / aidé) |
| N1 | Activité professionnelle |
| O46 | Lien de parenté |

### Facteurs Géographiques
| ID | Fonction |
|----|----------|
| O64 | Territoire de l'aidant |
| O63 | Territoire du proche |

### Facteurs Temporels
| ID | Fonction |
|----|----------|
| O49 | Ancienneté de l'aide |

### Facteurs d'Orientation
| ID | Fonction |
|----|----------|
| N26 | Besoins perçus |
| E71 | Priorité déclarée |
| E72 | Consentement au contact |

---

## 📐 Articulation avec le Système Personas (Phase 3)

Ces 13 questions triggers constituent la base pour :

1. **Niveau 1 - Catégorisation** :
   - Question **N3** → Catégorie principale (type de situation d'aidance)
   - Questions **O36, O1** → Tranches d'âge

2. **Niveau 2 - Sous-catégorisation** :
   - Question **O49** → Ancienneté (aidant débutant vs expérimenté)
   - Question **E71** → Priorité (persona orienté sécurité, administratif, etc.)

3. **Niveau 3 - Personnalisation** :
   - Questions **O64, O63** → Recommandations géolocalisées
   - Question **N26** → Orientation des micro-parcours

---

## ⚠️ Écarts Identifiés

| Type | Détail | Impact |
|------|--------|--------|
| 🟡 Incohérence | O49 classée dans V3 (Santé) mais qualifiée de trigger dans le Legacy | À clarifier avec l'équipe clinique |
| 🟡 Estimation initiale | TODO mentionnait 13-15 triggers, 13 identifiées (12 + 1 Legacy) | Écart mineur, estimation correcte |

---

## 📁 Sources Consultées

1. `SOURCES/excel/Questionnaire_Etienne_1258.xlsx` - Onglet "Trigger"
2. `SOURCES/legacy/Legacy Priorisation 300127.docx` - Section 4 "Questions triggers"
3. `SOURCES/legacy/Legacy questionnaire 290127.docx` - Section 4.7 "Questions triggers"

---

> 📄 Document généré le 04/02/2026  
> 🎯 **Prochaine étape** : Utiliser ces triggers pour construire l'arbre de décision des 14 personas (Phase 3 du TODO)
