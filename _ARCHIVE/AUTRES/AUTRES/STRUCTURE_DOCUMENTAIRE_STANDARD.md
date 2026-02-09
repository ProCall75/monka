# 📐 Structure Documentaire Standard - Vulnérabilités Monka

> **Objectif** : Structuration réplicable pour V2, V3, V4, V5  
> **Basé sur** : Analyse complète du simulateur V1  
> **Date** : 03/02/2026

---

## 🎯 Vue d'ensemble

Pour chaque vulnérabilité (V1-V5), nous créons **7 documents standardisés** :

| # | Document | Source données | Type | Validation Monka |
|---|----------|----------------|------|------------------|
| 1 | **README.md** | Manuel | 📋 Métadonnées | ❌ Non |
| 2 | **questions.md** | Excel/Legacy | ✅ Source | ❌ Non |
| 3 | **asr_definitions.md** | Excel/Legacy | ✅ Source | ✅ **OUI** |
| 4 | **ccc_recommendations.md** | Excel/Legacy OU IA | ⚠️ Mixte | ✅ **OUI** |
| 5 | **recommendations.md** | Excel/Legacy | ✅ Source | ❌ Non |
| 6 | **micro_taches_typologie.md** | Excel/Legacy OU IA | ⚠️ Mixte | ✅ **OUI** |
| 7 | **audit_completude.md** | IA (analyse) | 🔍 Audit | ❌ Non (info) |

---

## 📂 Structure Par Vulnérabilité

```
/QUESTIONNAIRE/
  /VX_[nom_vulnerabilite]/
    /base/
      ├── README.md                          # 📋 Vue d'ensemble
      ├── questions.md                       # ✅ SOURCE Excel
      ├── asr_definitions.md                 # ✅ SOURCE Excel (À VALIDER)
      ├── ccc_recommendations.md             # ⚠️ MIXTE (À VALIDER)
      ├── recommendations.md                 # ✅ SOURCE Excel
      ├── micro_taches_typologie.md          # ⚠️ MIXTE (À VALIDER)
      └── audit_completude.md                # 🔍 AUDIT IA
```

---

## 📋 Document 1 : README.md

### Objectif
Vue d'ensemble de la vulnérabilité avec métadonnées et statistiques

### Format

```markdown
# 📋 VX - [Nom Vulnérabilité]

> **Statut** : [Base / Personas en cours / Complet]  
> **Date dernière MAJ** : JJ/MM/AAAA  
> **Sources** : [Liste des fichiers Excel/Legacy]

---

## 📊 Statistiques

| Indicateur | Valeur |
|------------|--------|
| **Questions totales** | XX |
| **Questions critiques** | X |
| **Questions scoring** | XX |
| **Questions trigger ASR** | X |
| **ASR (signatures)** | X |
| **CCC** | X |
| **Micro-parcours** | X |
| **Micro-tâches** | XX |

---

## 📁 Fichiers

| Fichier | Statut | Source | Validation |
|---------|--------|--------|------------|
| questions.md | ✅ | Excel | ❌ |
| asr_definitions.md | ✅ | Excel | ⚠️ À valider |
| ccc_recommendations.md | ⚠️ | IA déduction | ✅ À valider |
| recommendations.md | ✅ | Excel | ❌ |
| micro_taches_typologie.md | ⚠️ | IA déduction | ✅ À valider |
| audit_completude.md | ✅ | IA analyse | ❌ |

---

## 🗂️ Sources utilisées

### Excel
- `[Nom fichier Excel exact].xlsx` - Onglet `[nom onglet]`

### Legacy
- `[Nom fichier Legacy exact].docx` - Sections XX-YY

---

## ⚠️ Éléments à valider MONKA

1. **ASR** : X signatures créées par déduction → Validation requise
2. **CCC** : X combinaisons créées par déduction → Validation requise  
3. **Micro-tâches questions** : X micro-tâches manquantes estimées → Validation requise

---

## 📝 Changelog

- **[Date]** : Création version base
- **[Date]** : Validation ASR par équipe clinique
```

---

## ❓ Document 2 : questions.md

### Objectif
Liste TOUTES les questions avec leurs options, scores, types

### Sources Excel
- **V1** : `Questionnaire_Etienne_1258.xlsx` - Onglet "V1 Social"
- **V2-V5** : `Questionnaire_Etienne_1258.xlsx` - Onglets respectifs

### Données nécessaires (par question)

```json
{
  "id": "E1",
  "label": "Texte de la question ?",
  "type": "scoring|critical|trigger",
  "options": [
    {
      "text": "Texte option 1",
      "score": 0,
      "critical": false,
      "trigger": null  // ou "R1" si déclencheur ASR
    }
  ]
}
```

### Format Markdown

```markdown
# 📝 Questions - VX [Nom]

> **Total** : XX questions  
> **Source** : `[Nom Excel].xlsx` - Onglet "[Nom]"

---

## Questions Critiques (X)

### E2 - Soutien d'urgence

**Question** : En cas de coup dur, avez-vous des personnes sur qui compter pour vous aider ?

**Type** : 🔴 CRITIQUE (Priorité directe Niveau 1)

**Options** :
- [ ] Oui, plusieurs personnes (Score: 0)
- [ ] Oui, une personne (Score: 1)
- [ ] ⚠️ **Très peu de personnes / personne** (Score: 2, **CRITIQUE**)

---

## Questions Scoring (XX)

### E1 - Répartition aide

**Question** : Comment décririez-vous la répartition de l'aide au sein de votre entourage ?

**Type** : 📊 SCORING

**Options** :
- [ ] Répartition équilibrée et satisfaisante (Score: 0)
- [ ] Je fais la plus grande partie mais c'est acceptable (Score: 1)
- [ ] Je fais presque tout / je suis totalement seul·e (Score: 2)

---

## Questions Trigger ASR (X)

### N4 - Aidant unique

**Question** : Êtes-vous le seul membre de la famille à vous occuper de votre proche ?

**Type** : ⏺️ TRIGGER

**Options** :
- [ ] Non (Trigger: Aucun)
- [ ] Oui (Trigger: **R2** - Soutien de l'entourage)

---

## 📊 Tableau Récapitulatif

| ID | Question courte | Type | Options | Trigger ASR |
|----|----------------|------|---------|-------------|
| E1 | Répartition aide | Scoring | 3 | - |
| E2 | Soutien urgence | Critique | 3 | - |
| N4 | Aidant unique | Trigger | 2 | R2 |
```

---

## 🎯 Document 3 : asr_definitions.md

### Objectif
Définir les Axes de Suivi Renforcé (signatures ASR)

### Sources Excel
- **V1** : `Questionnaire_Etienne_1258.xlsx` + `microparcours_aidant.xlsx`
- **V2-V5** : Fichiers Excel + Legacy correspondants

### Données nécessaires (par ASR)

```json
{
  "code": "R1",
  "name": "Impact vie personnelle / sociale / pro",
  "description": "Retentissement de la situation sur la vie de l'aidant",
  "trigger_questions": ["O27", "O28", "N7"],
  "trigger_logic": "O27≥1 OU O28≥1 OU N7=aménagement",
  "priority": "Niveau 2 (moyen terme)",
  "micro_parcours_count": 25
}
```

### Format Markdown

```markdown
# 🎯 ASR - Axes de Suivi Renforcé - VX [Nom]

> **Total ASR** : X  
> **Source** : ✅ `[Excel]` + ⚠️ Déduction IA (À VALIDER)

---

## 🟢 ASR Confirmés (depuis Excel)

### R1 - Impact vie personnelle / sociale / pro

**Description** : Retentissement de la situation sur la vie de l'aidant (famille, travail, loisirs)

**Questions trigger** : O27, O28, N7

**Logique d'activation** : `O27≥1 OU O28≥1 OU N7=aménagement`

**Priorité** : Niveau 2 (Moyen terme)

**Micro-parcours associés** : 25 micro-tâches

**Sources** :
- ✅ `microparcours_aidant.xlsx` - Ligne 5
- ✅ `Legacy Micro parcours 030226.docx` - Page 3

---

## ⚠️ ASR Déduits IA (À VALIDER MONKA)

### R5 - [Nom déduit]

**Description** : [Description proposée par IA]

**Questions trigger proposées** : [Liste]

**Logique d'activation proposée** : [Formule]

**Priorité estimée** : Niveau X

**Justification IA** : Suite à l'analyse des questions X, Y, Z qui semblent former un axe cohérent mais sans ASR défini dans les sources.

❓ **VALIDATION REQUISE** : Est-ce pertinent cliniquement ?

---

## 📊 Tableau Récapitulatif

| Code | Nom | Questions trigger | Source | Statut |
|------|-----|-------------------|--------|--------|
| R1   | Impact vie perso/sociale | O27, O28, N7 | Excel | ✅ |
| R2   | Soutien entourage | N4, E2 | Excel | ✅ |
| R5   | [Nom] | [Questions] | IA déduction | ⚠️ À valider |
```

---

## 💥 Document 4 : ccc_recommendations.md

### Objectif
Définir les Combinaisons Critiques Complexes

### Sources
- **Si Excel existe** : Extraire depuis Excel
- **Sinon** : IA déduit par analyse combinatoire

### Données nécessaires (par CCC)

```json
{
  "code": "R1_CC_01",
  "name": "Retentissement vie familiale + sociale/pro",
  "questions": ["O27", "O28"],
  "logic": "O27=2 ET O28=2",
  "micro_parcours": "R1",
  "priority": "Niveau 1 (urgence)",
  "recommendation": "Texte recommandation",
  "actor": "IDEC + Psychologue + ...",
  "tasks": ["Tâche 1", "Tâche 2"]
}
```

### Format Markdown

```markdown
# 💥 CCC - Combinaisons Critiques Complexes - VX [Nom]

> **Total CCC** : X  
> **Source** : ✅ Excel + ⚠️ Déduction IA (À VALIDER)

---

## 🔴 Règle Absolue

**Questions critiques ≠ CCC**

Les questions critiques (Priorité Niveau 1 directe) ne doivent **JAMAIS** apparaître dans une CCC.

**Questions critiques VX** : [Liste]

---

## 🟢 CCC Confirmées (depuis Excel)

### R1_CC_01 - Retentissement vie familiale + sociale/pro

**Condition** : `O27=Oui (2) ET O28=Oui (2)`

**Questions impliquées** : O27, O28

**Micro-parcours** : R1 (Impact vie personnelle)

**Priorité** : 🔴 Niveau 1 (Urgence - intervention <7j)

**Recommandation** :
Organiser une réunion de synthèse pluridisciplinaire urgente pour sauver l'équilibre global de l'aidant et mettre en place un plan de soutien coordonné.

**Acteurs** : IDEC (coordinateur) + Psychologue + Assistante sociale + Médecin traitant

**Micro-tâches** :
1. Convoquer une réunion de concertation sous 7 jours avec tous les acteurs
2. Réaliser une cartographie exhaustive des impacts (famille, travail, loisirs, santé)
3. Co-construire un plan d'action avec objectifs à 1 mois
4. Mettre en place un suivi hebdomadaire pendant 1 mois
5. Évaluer l'éligibilité à un congé de proche aidant

**Sources** :
- ✅ `Tableau SOPHIE CAT + Reco-Nouveau questionnaire.xlsx` - Onglet "CCC VX"

---

## ⚠️ CCC Déduites IA (À VALIDER MONKA)

### R2_CC_03 - [Nom proposé]

**Condition proposée** : `[Question A]=X ET [Question B]=Y`

**Questions impliquées** : [Liste]

**Micro-parcours proposé** : [Code]

**Priorité estimée** : 🟠 Niveau 2

**Recommandation proposée** :
[Recommandation générée par IA]

**Acteurs proposés** : [Liste]

**Micro-tâches proposées** :
1. [Tâche 1]
2. [Tâche 2]

**Justification IA** : 
L'analyse des questions [A] et [B] révèle une combinaison potentiellement critique lorsque [justification clinique]. Cette combinaison n'est pas documentée dans les sources Excel. 

❓ **VALIDATION REQUISE** :
- Cette combinaison est-elle pertinente cliniquement ?
- Le niveau de priorité est-il adapté ?
- Les recommandations proposées sont-elles appropriées ?

---

## ✅ Vérification Audit

| Question Critique | Apparaît dans CCC ? | Statut |
|-------------------|---------------------|--------|
| E2 | ❌ Non | ✅ Conforme |
| E6 | ❌ Non | ✅ Conforme |

---

## 📊 Tableau Récapitulatif

| Code | Nom | Condition | Priorité | Source | Statut |
|------|-----|-----------|----------|--------|--------|
| R1_CC_01 | Retentissement vie | O27=2 ET O28=2 | Niveau 1 | Excel | ✅ |
| R2_CC_01 | Aidant seul | N4=1 ET E2=2 | Niveau 1 | Excel | ✅ |
| R2_CC_03 | [Nom] | [Condition] | Niveau 2 | IA | ⚠️ À valider |
```

---

## 💡 Document 5 : recommendations.md

### Objectif
Recommandations par question

### Sources Excel
- **V1** : `Tableau SOPHIE CAT + Reco-Nouveau questionnaire.xlsx`
- **V2-V5** : Idem (onglets spécifiques)

### Données nécessaires (par recommandation)

```json
{
  "question_id": "E1",
  "score": 2,
  "reco": "Texte recommandation",
  "actor": "IDEC / Assistante sociale",
  "tasks": ["Tâche 1", "Tâche 2"]
}
```

### Format Markdown

```markdown
# 💡 Recommandations - VX [Nom]

> **Total questions avec recos** : XX  
> **Source** : `[Excel].xlsx` - Onglet "[Nom]"

---

## Question E1 - Répartition aide

### Option: "Je fais la plus grande partie mais c'est acceptable" (Score: 1)

**Recommandation** :
Proposer un temps d'échange pour identifier des relais potentiels

**Acteur** : IDEC

**Micro-tâches** :
- Lister les personnes mobilisables
- Explorer les freins à une meilleure répartition

---

### Option: "Je fais presque tout / je suis totalement seul·e" (Score: 2)

**Recommandation** :
Identifier et mobiliser des ressources d'aide complémentaires

**Acteur** : IDEC / Assistante sociale

**Micro-tâches** :
- Évaluer les aides disponibles
- Proposer un accompagnement pour solliciter de l'aide
- Orienter vers des groupes d'entraide

---

## 📊 Matrice Recommandations

| Question | Score | Acteur | Nb micro-tâches |
|----------|-------|--------|-----------------|
| E1 | 1 | IDEC | 2 |
| E1 | 2 | IDEC / AS | 3 |
| E2 | 1 | IDEC | 2 |
| E2 | 2 | IDEC / AS | 4 |
```

---

## 🔄 Document 6 : micro_taches_typologie.md

### Objectif
Typologie des micro-tâches (5 types)

### Sources
- **V1** : `microparcours_aidant.xlsx` + Déduction IA
- **V2-V5** : Legacy + Déduction IA

### Données nécessaires

```json
{
  "type": "STRUC|SEC|MED|INFO|ORGA",
  "count": 15,
  "list": [
    {
      "code": "STRUC_01",
      "label": "Contacter le CLIC",
      "description": "Prendre RDV avec..."
    }
  ]
}
```

### Format Markdown

```markdown
# 🔄 Micro-tâches - Typologie VX [Nom]

> **Total micro-tâches** : XX  
> **Source** : ✅ Excel + ⚠️ Déduction IA (À VALIDER)

---

## 🎨 5 Types de Micro-Tâches

### 🟣 STRUC - Structurels (XX tâches)

**Définition** : Mobiliser des structures d'aide et dispositifs institutionnels

#### ✅ Depuis Excel

**STRUC_01** - Contacter le CLIC
- Description : Prendre RDV avec le CLIC local pour évaluation
- Source : `microparcours_aidant.xlsx` - Ligne 12

**STRUC_02** - Solliciter portage repas
- Description : Mettre en place service de portage
- Source : `microparcours_aidant.xlsx` - Ligne 18

#### ⚠️ Déduites IA (À VALIDER)

**STRUC_15** - [Nom proposé]
- Description : [Description IA]
- Justification : Déduite depuis question E6 (refus aide extérieure)
- ❓ **VALIDATION REQUISE**

---

### 🟢 SEC - Sécurisation (XX tâches)

[Même structure...]

---

### 🔴 MED - Médicaux (XX tâches)

[Même structure...]

---

### 🔵 INFO - Informatifs (XX tâches)

[Même structure...]

---

### 🟠 ORGA - Organisationnels (XX tâches)

[Même structure...]

---

## 📊 Répartition

| Type | Depuis Excel | Déduites IA | Total | % |
|------|--------------|-------------|-------|---|
| STRUC | 12 | 3 | 15 | 32% |
| SEC | 8 | 2 | 10 | 21% |
| MED | 5 | 1 | 6 | 13% |
| INFO | 10 | 4 | 14 | 30% |
| ORGA | 3 | 1 | 4 | 4% |
| **TOTAL** | **38** | **11** | **49** | **100%** |

**⚠️ 11 micro-tâches nécessitent validation MONKA**

---

## 🔗 Liaisons Questions → Micro-Tâches

| Question | Nombre MT | Types dominants |
|----------|-----------|-----------------|
| E1 | 5 | STRUC, INFO |
| E2 | 7 | SEC, STRUC |
| E6 | 4 | INFO, ORGA |
```

---

## 🔍 Document 7 : audit_completude.md

### Objectif
Audit automatisé de ce qui manque après scan sources

### Généré par
IA (analyse automatique)

### Format Markdown

```markdown
# 🔍 Audit Complétude - VX [Nom]

> **Date audit** : JJ/MM/AAAA  
> **Sources scannées** : X Excel + Y Legacy  
> **Générée par** : IA Analyse

---

## 📊 Résumé Exécutif

| Élément | Attendu | Trouvé | Manquant | % Complétude |
|---------|---------|--------|----------|--------------|
| **Questions** | ~15 | 13 | 2 | 87% |
| **ASR** | 4-5 | 4 | 0-1 | 80-100% |
| **CCC** | 6-8 | 6 | 0-2 | 75-100% |
| **Recommandations** | 13×2 = 26 | 24 | 2 | 92% |
| **Micro-tâches** | ~40 | 38 | 2 | 95% |

**Score global** : **88% complet**

---

## ✅ Éléments Complets

### Questions (13/13 attendues)
- ✅ Toutes les questions documentées
- ✅ Tous les types présents (critique, scoring, trigger)
- ✅ Toutes les options avec scores

### ASR (4/4 attendus)
- ✅ R1 - Impact vie perso/sociale
- ✅ R2 - Soutien entourage
- ✅ R3 - Isolement proche
- ✅ R4 - Relation aidant/aidé

---

## ⚠️ Éléments Manquants

### Recommandations (2 manquantes)

**Question E4 - Option 1** : ❌ Pas de recommandation
- Source Excel : Cellule vide
- Action : Créer recommandation OU confirmer qu'aucune reco n'est nécessaire

**Question O30 - Option 1** : ❌ Pas de recommandation
- Source Excel : Cellule vide
- Action : Créer recommandation OU confirmer qu'aucune reco n'est nécessaire

---

### Micro-tâches (2 manquantes)

**Question E6** : ⚠️ 2 micro-tâches vs 4 attendues
- Trouvé : "Comprendre les freins", "Proposer échange"
- Manquant : 2 tâches complémentaires pour couvrir toutes les options
- Action : Compléter ou confirmer suffisant

---

## 🔄 Propositions IA

### Recommandation E4-1 (Proposée)

**Option** : "Relation renforcée ou globalement similaire" (Score: 0)

**Recommandation proposée** :
Surveiller l'évolution de la relation et valoriser les aspects positifs

**Acteur proposé** : IDEC

**Micro-tâches proposées** :
- Échanger sur les éléments positifs de la relation
- Rester attentif aux signaux de dégradation

❓ **VALIDATION REQUISE** : Est-ce nécessaire ou la relation stable ne nécessite aucune reco ?

---

## 📋 Actions Recommandées

1. ✅ **COMPLET** : Questions, ASR, CCC → Aucune action
2. ⚠️ **À COMPLÉTER** : 2 recommandations manquantes
3. ⚠️ **À COMPLÉTER** : 2 micro-tâches manquantes
4. ✅ **À VALIDER MONKA** : Propositions IA pour combler les manques

**Priorité** : Moyenne (88% complet, gaps mineurs)

---

## 📊 Comparaison V1 (Référence)

| Élément | V1 | VX Actuel | Écart |
|---------|----|-----------| ------|
| Questions | 13 | 13 | ✅ Identique |
| ASR | 4 | 4 | ✅ Identique |
| CCC | 6 | 6 | ✅ Identique |
| Recommandations | 26 | 24 | ⚠️ -2 |
| Micro-tâches | 38 | 38 | ✅ Identique |
```

---

## 🗂️ SOURCES DONNÉES PAR VULNÉRABILITÉ

### 📊 Tableau Complet Sources

| Vulnérabilité | Excel Principal | Onglet | Legacy Principal | Statut |
|---------------|----------------|--------|------------------|--------|
| **V1** - Social/Relationnel | `Questionnaire_Etienne_1258.xlsx` | "V1 Social" | `Legacy questionnaire 290127.docx` | ✅ Complet |
| **V2** - Fragilité Proche | `Tableau SOPHIE CAT.xlsx` | "V2 Fragilité" | `Legacy scoring 310127.docx` | ⚠️ Partiel |
| **V3** - Santé Aidant | `Questionnaire_Etienne_1258.xlsx` | "V3 Santé" | `Legacy questionnaire 290127.docx` | ❌ À extraire |
| **V4** - Parcours Médical | `Questionnaire_Etienne_1258.xlsx` | "V4 Parcours" | `Legacy scoring 310127.docx` | ❌ À extraire |
| **V5** - Administrative | `Questionnaire_Etienne_1258.xlsx` | "V5 Admin" | `Legacy questionnaire 290127.docx` | ❌ À extraire |

### Fichiers Communs

**Questions** : `/SOURCES/excel/Questionnaire_Etienne_1258.xlsx`  
**Recommandations** : `/SOURCES/excel/Tableau SOPHIE CAT + Reco-Nouveau questionnaire.xlsx`  
**Micro-parcours** : `/SOURCES/excel/microparcours_aidant.xlsx`

---

## 🎯 PROCESSUS DE CRÉATION (Réplicable)

### Étape 1 : Préparation (1h)

1. Créer la structure `/QUESTIONNAIRE/VX_[nom]/base/`
2. Copier le template README.md
3. Identifier les sources Excel/Legacy exactes

### Étape 2 : Extraction Questions (2h)

1. Scanner Excel onglet VX
2. Créer `questions.md` avec format standard
3. Identifier questions critiques / scoring / trigger

### Étape 3 : Extraction ASR (1h)

1. Scanner `microparcours_aidant.xlsx`
2. Scanner Legacy Micro parcours
3. Créer `asr_definitions.md`
4. **Marquer les ASR déduits IA** pour validation

### Étape 4 : Extraction/Déduction CCC (3h)

1. Scanner Excel onglet CCC (si existe)
2. **Si manquant** : IA analyse combinatoire des questions
3. Créer `ccc_recommendations.md`
4. ⚠️ **Marquer les CCC déduites pour validation MONKA**
5. ✅ **Vérifier audit** : Questions critiques ≠ CCC

### Étape 5 : Extraction Recommandations (2h)

1. Scanner `Tableau SOPHIE CAT.xlsx` - Onglet VX
2. Créer `recommendations.md`
3. Lier chaque reco à la question + score

### Étape 6 : Typologie Micro-Tâches (3h)

1. Scanner `microparcours_aidant.xlsx`
2. Identifier les 5 types (STRUC, SEC, MED, INFO, ORGA)
3. **Propositions IA pour micro-tâches manquantes**
4. Créer `micro_taches_typologie.md`
5. ⚠️ **Marquer propositions IA pour validation**

### Étape 7 : Audit Automatisé (1h)

1. IA analyse tous les fichiers créés
2. Détecte les manques
3. Propose des solutions
4. Créer `audit_completude.md`

### Étape 8 : Mise à jour README (30min)

1. Remplir statistiques
2. Documenter sources
3. Lister éléments à valider

**Total temps** : **~13-14h par vulnérabilité**

---

## ✅ CHECKLIST QUALITÉ

### Pour chaque vulnérabilité

- [ ] **README.md** créé avec stats complètes
- [ ] **questions.md** avec TOUTES les questions + options + scores
- [ ] **asr_definitions.md** avec sources citées
- [ ] **ccc_recommendations.md** avec vérification audit (critiques ≠ CCC)
- [ ] **recommendations.md** avec acteurs + micro-tâches
- [ ] **micro_taches_typologie.md** avec 5 types
- [ ] **audit_completude.md** généré par IA
- [ ] **Marquage clair** : ✅ Source vs ⚠️ IA déduction
- [ ] **Validation requise** pour éléments déduits IA

---

## 📋 EXEMPLE DE COMMANDE POUR L'IA

```
TÂCHE : Créer la documentation complète pour V2 (Fragilité du Proche)

SOURCES :
- Excel : /SOURCES/excel/Tableau SOPHIE CAT.xlsx - Onglet "V2"
- Excel : /SOURCES/excel/Questionnaire_Etienne_1258.xlsx  
- Legacy : /SOURCES/legacy/Legacy scoring 310127.docx

STRUCTURE À SUIVRE :
- Utiliser le modèle standardisé (ce document)
- Créer les 7 fichiers dans /QUESTIONNAIRE/V2_fragilite_proche/base/
- Marquer CLAIREMENT les déductions IA (⚠️)
- Générer l'audit de complétude
- Identifier ce qui nécessite validation MONKA

RÈGLE ABSOLUE :
- Questions critiques ≠ CCC
- Citer toutes les sources Excel/Legacy
- Distinguer ✅ Source vs ⚠️ Déduction IA
```

---

> 📄 Structure créée le 03/02/2026 - Documentation Standard Vulnérabilités Monka  
> 🎯 **Réplicable pour V2, V3, V4, V5**  
> 📐 **Basé sur analyse complète du simulateur V1**
