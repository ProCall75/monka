# 📋 Guide d'Implémentation V1-V5

> **Objectif** : Mapper les données SOURCES/ vers les templates QUESTIONNAIRE_V2/  
> **Date** : 06/02/2026

---

## 🔗 Mapping SOURCES → Templates

### 1. `questions.md`

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Legacy questionnaire 060226.docx` | Toutes les questions | ID, libellé, options |
| `Questionnaire validé.xlsx` | Onglets V1-V5 | ID, libellé, options, conditions |

**Extraction** :
1. Ouvrir le Legacy questionnaire → Extraire chaque question avec son ID
2. Croiser avec Excel pour les options exactes
3. NE PAS inclure : scoring, triggers, recommendations

---

### 2. `scoring.md`

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Legacy scoring 060226.docx` | Règles de scoring | Points par option, seuils |
| `Questionnaire validé.xlsx` | Colonne "Score" | Valeurs numériques |

**Extraction** :
1. Identifier les questions scorantes dans Legacy scoring
2. Extraire les points par option
3. Définir les seuils (faible/modéré/élevé)

**⚠️ Règle clé** : Le scoring mesure une intensité, ne déclenche JAMAIS seul

---

### 3. `triggers.md` (🆕 Questions Contexte/Profil)

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Legacy questionnaire 060226.docx` | Section 4.7 "Questions triggers" | Facteurs contextuels |

**Liste officielle des 15 triggers** :
```
N3, O35, O36, N1, O64, O46, O14, O1, O63, O49, N26, E71, E72, O2, N31
```

**Extraction** :
1. Liste **fermée et normative** - 15 IDs uniquement
2. Ces questions **ne déclenchent RIEN** - elles qualifient la diade
3. Serviront aux futurs **personas**

> ⚠️ **Legacy** : "Ce sont des triggers / facteurs de contexte, pas des états."

---

### 4. `declencheurs.md` (Questions qui ACTIVENT des MP)

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Legacy Micro parcours 060226.docx` | Déclencheurs | Question → MP |
| `Legacy Priorisation 060226.docx` | Priorités 1-3 | Niveaux, échéances |
| `Questionnaire validé.xlsx` | Colonne "Déclenchant" | Option → MP |

**Extraction** :
1. **Niveau 1 (Critiques)** : Legacy Priorisation → Questions critiques directes
2. **Niveau 2 (CCC)** : Typologie,CCC et scoring.docx → Conditions composites
3. **Niveau 3 (Standard)** : Excel → Colonne "Déclenchant"

**⚠️ Règle clé** : Critique directe prévaut TOUJOURS sur scoring

---

### 4. `recommendations.md`

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Tableau SOPHIE CAT (7).xlsx` | Onglets par V | Recos app + actions IDEC |

**Extraction** :
1. Pour chaque question/option → Extraire reco app
2. Pour chaque question/option → Extraire actions IDEC
3. **🤖 Typage MT** : Ajouter automatiquement (STRUC/SEC/MED/INFO/ORGA)

**⚠️ Éléments IA** :
- Typage des micro-tâches = 🤖 IA (à valider)

---

### 5. `ccc.md`

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Typologie,CCC et scoring.docx` | CCC définies | Conditions, MP |
| 🤖 **IA** | Micro-tâches CCC | Tâches, types, acteurs |

**Extraction** :
1. Extraire les CCC officielles du Legacy
2. Pour chaque CCC → Lister les questions impliquées
3. **🤖 MT CCC** : Générées par IA, à valider par équipe clinique

**⚠️ Éléments IA** :
- Micro-tâches et recos associées aux CCC = 🤖 IA (à valider)
- CCC eux-mêmes = ✅ Legacy (Typologie,CCC et scoring.docx)

**Où trouver les MT IA existantes** :
- `QUESTIONNAIRE/V{X}/base/ccc_recommendations.md` (ancienne structure)

---

### 6. `asr.md`

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Legacy Micro parcours 060226.docx` | ASR par MP | Actions, types |
| `Legacy ASR Referent op. 030226.docx` | Référentiel opérationnel | Détails ASR |
| `microparcours_aidant.xlsx` | Micro-parcours | Structure MP |

**Extraction** :
1. Pour chaque micro-parcours → Extraire les ASR
2. Typer chaque ASR (STRUC/SEC/MED/INFO/ORGA)
3. Marquer contributif score ou non

**⚠️ Éléments IA** :
- Aucun ! ASR et signatures = 100% Legacy (Legacy ASR Referent op. 030226)

---

### 7. `suivi.md`

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Legacy suivi longitudinal 030226.docx` | Indicateurs suivi | Métriques, seuils alertes |
| `Questionnaire de suivi validé.xlsx` | Questions suivi | Questions, options, évolution |

**Extraction** :
1. Identifier les questions de suivi mensuel (vs initiales)
2. Définir les indicateurs longitudinaux
3. Établir les règles de comparaison temporelle

---

### 8. `progression.md`

| Source | Section à extraire | Champs |
|--------|-------------------|--------|
| `Legacy grammaire de progression 190126.docx` | États et transitions | États, conditions, délais |

**Extraction** :
1. Lister tous les états possibles d'un MP
2. Définir les règles de transition
3. Documenter les délais par niveau de priorité

---

### 9. `engine_data.json`

**Généré automatiquement** depuis les 8 fichiers MD.

---

## 📊 Récapitulatif Sources (10 templates)

### 🔴 Sources DATA (Excel = Source de Vérité)

| Fichier Excel | Contenu DATA | Templates cibles | Priorité |
|---------------|--------------|------------------|----------|
| **`Questionnaire validé.xlsx`** | Questions + Options + Scores par V | questions.md, scoring.md | 🔴 CRITIQUE |
| **`Questionnaire de suivi validé.xlsx`** | Questions suivi mensuel (2 onglets) | suivi.md | 🔴 CRITIQUE |
| **`Tableau SOPHIE CAT (7).xlsx`** | Recos app + Actions IDEC par question/option | recommendations.md | 🔴 CRITIQUE |
| **`microparcours_aidant.xlsx`** | Structure MP + liens ASR | asr.md | 🟠 Important |

> ⚠️ **Les Excel contiennent la DATA réelle**. Les Legacy contiennent les RÈGLES et DÉFINITIONS.

### 🟢 Sources RÈGLES (Legacy = Définitions)

| Fichier Legacy | Contenu RÈGLES | Templates cibles |
|----------------|----------------|------------------|
| Legacy questionnaire 060226 | Structure + 15 Triggers | questions.md, triggers.md |
| Legacy scoring 060226 | Seuils + Formules | scoring.md |
| Legacy Priorisation 060226 | Niveaux priorité | declencheurs.md |
| Typologie,CCC et scoring | CCC + Scoring par V | ccc.md, scoring.md |
| Legacy ASR Referent op. 030226 | Signatures d'état | asr.md |

### Mapping Complet

| Fichier cible | Source DATA (Excel) | Source RÈGLES (Legacy) | Source IA |
|---------------|---------------------|------------------------|-----------|
| questions.md | ✅ Questionnaire validé.xlsx | ✅ Legacy questionnaire | - |
| scoring.md | ✅ Questionnaire validé.xlsx | ✅ Typologie,CCC | - |
| **triggers.md** | - | ✅ Legacy questionnaire 4.7 | - |
| **declencheurs.md** | ✅ Questionnaire validé.xlsx | ✅ Legacy Priorisation | - |
| recommendations.md | ✅ SOPHIE CAT Excel | - | 🤖 Typage MT |
| ccc.md | - | ✅ Typologie,CCC | 🤖 Recos/MT CCC |
| asr.md | ✅ microparcours_aidant.xlsx | ✅ Legacy ASR Referent | - |
| suivi.md | ✅ Questionnaire de suivi.xlsx | ✅ Legacy suivi | - |
| progression.md | - | ✅ Legacy grammaire | - |
| engine_data.json | Généré depuis 9 MD | - | - |

---

## 🤖 Localisation Contenu IA Existant (QUESTIONNAIRE/)

Le contenu IA généré précédemment se trouve dans l'ancienne structure.  
**À récupérer et migrer vers les nouveaux templates** en marquant 🤖.

### Par Vulnérabilité

| V | Chemin | Fichiers IA |
|---|--------|-------------|
| **V1** | `QUESTIONNAIRE/V1_social_relationnel/base/` | 4 fichiers |
| **V2** | `QUESTIONNAIRE/V2_fragilite_proche/base/` | 4 fichiers |
| **V3** | `QUESTIONNAIRE/V3_sante_aidant/base/` | 4 fichiers |
| **V4** | `QUESTIONNAIRE/V4_parcours_medical/base/` | 4 fichiers |
| **V5** | `QUESTIONNAIRE/V5_administrative/base/` | 4 fichiers |

### Fichiers IA par V (structure identique)

| Fichier | Contenu IA | Template cible |
|---------|------------|----------------|
| `ccc_recommendations.md` | Raisonnement clinique CCC + Micro-tâches CCC | `ccc.md` |
| `micro_taches_typologie.md` | Typage STRUC/SEC/MED/INFO/ORGA par MT | `recommendations.md` |
| `asr_definitions.md` | Signatures d'état + exemples validation | `asr.md` |
| `recommendations.md` | Recos app + Actions IDEC (texte Excel enrichi) | `recommendations.md` |

### Tailles constatées (V1 référence)

| Fichier | Lignes | Contenu clé |
|---------|--------|-------------|
| `ccc_recommendations.md` | 234 | 8 CCC avec raisonnement + micro-tâches |
| `micro_taches_typologie.md` | 280 | 41 MT typées + gaps identifiés |
| `asr_definitions.md` | 307 | 4 ASR + 8 signatures + exemples |
| `recommendations.md` | ~200 | Recos par question/option |

---

## ✅ Protocole de Vérification Post-Implémentation

### 🎯 Objectif Principal

> **Le but n'est PAS de reproduire les mêmes docs, mais d'avoir des templates OPTIMAUX.**

**3 Axes de vérification :**
1. **Qualité des données** : Données extraites fidèles (pas de transformation/déformation)
2. **Alignement terminologie** : Même langage que `UNDERSTANDING.md`
3. **Cohérence globale** : Pas de contradiction entre templates

---

### 📂 Sources de Données Pré-Extraites (SOURCES/extracted/)

| Fichier JSON | Source Excel | Contenu | Usage |
|--------------|--------------|---------|-------|
| `legacy_complete.json` | - | Legacy → Text | Règles, définitions |
| `recommendations_complete.json` | SOPHIE CAT | Recos par Q/option | recommendations.md |
| `tableau_sophie_cat_complete.json` | SOPHIE CAT | Actions IDEC | recommendations.md |
| `microparcours_complete.json` | microparcours_aidant | Structure MP | asr.md |
| `typologie_ccc_scoring.json` | Typologie,CCC | CCC + Scoring | ccc.md, scoring.md |
| `scores_by_vulnerability.json` | Questionnaire | Scoring par V | scoring.md |

> ⚠️ **Utiliser ces JSON comme source de vérité** pour éviter erreurs d'extraction manuelle.

---

### 🔤 Checklist Alignement Terminologie (UNDERSTANDING.md)

| Terme | Définition correcte | ❌ À éviter |
|-------|---------------------|-------------|
| **Trigger** | Question contexte/profil (15 IDs) | "Déclencheur" |
| **Déclencheur** | Question qui active un MP | "Trigger" |
| **ASR** | Objectif utilisateur (1 MP = 1 ASR) | "Tâche", "Action" |
| **Micro-tâche** | Moyen d'atteindre l'ASR | "ASR" |
| **Scoring** | Mesure intensité | "Diagnostic", "Gravité" |
| **CCC** | Combinaison composite → MP | "Trigger" |

**Vérification :**
- [ ] Aucun template n'utilise "trigger" pour parler d'un déclencheur
- [ ] Aucun template ne confond ASR et micro-tâche
- [ ] Scoring décrit comme "intensité", jamais "diagnostic"

---

### ✅ Checklist Qualité Données par Template

#### questions.md
- [ ] IDs et libellés = exactement comme dans `Questionnaire validé.xlsx`
- [ ] Aucune question inventée ou modifiée
- [ ] Options de réponse identiques à l'Excel

#### scoring.md
- [ ] Questions scorantes = `typologie_ccc_scoring.json`
- [ ] Seuils officiels : 0-6 🟢, 7-13 🟠, 14-20 🔴
- [ ] Formule : `(brut/max)×20`

#### triggers.md
- [ ] Exactement 15 IDs (liste fermée)
- [ ] Aucun trigger ne "déclenche" quoi que ce soit
- [ ] Terminologie : "facteur de contexte", pas "déclencheur"

#### declencheurs.md
- [ ] Questions critiques = Legacy Priorisation
- [ ] Terminologie : "déclencheur", pas "trigger"
- [ ] Niveaux de priorité 1/2/3 corrects

#### recommendations.md
- [ ] Texte recos = `recommendations_complete.json`
- [ ] Contenu IA marqué 🤖
- [ ] Typage MT préservé (STRUC/SEC/MED/INFO/ORGA)

#### ccc.md
- [ ] CCC = `typologie_ccc_scoring.json`
- [ ] Raisonnement clinique 🤖 préservé
- [ ] Pas de confusion CCC ↔ trigger

#### asr.md
- [ ] 1 MP = 1 ASR (règle Legacy)
- [ ] ASR = objectif/état, pas tâche
- [ ] Signatures d'état préservées

---

### 🔍 Validation Finale

| Check | Question | Critère OK |
|-------|----------|------------|
| **Terminologie** | Les termes sont-ils alignés avec UNDERSTANDING.md ? | 0 confusion trigger/déclencheur |
| **Données Excel** | Les données extraites sont-elles fidèles ? | Diff avec JSON = 0 modification |
| **Contenu IA** | Le contenu IA est-il marqué 🤖 ? | Présent dans ccc, recommendations, asr |
| **Cohérence** | Y a-t-il des contradictions entre templates ? | Aucune |

---

## ✅ Ordre d'Implémentation Recommandé

1. **V1** (référence) - Le plus documenté, sert de modèle
2. **V2** - Deuxième plus documenté
3. **V3-V5** - En parallèle après validation V1+V2

---

## 📋 Workflow Implémentation par V

```
1. Créer dossier QUESTIONNAIRE_V2/V{X}/
2. Copier les 9 templates depuis templates/
3. Remplir avec données Legacy (SOURCES/)
4. Intégrer contenu IA depuis QUESTIONNAIRE/V{X}/base/
5. Marquer tout contenu IA avec 🤖
6. Exécuter checklist de vérification
7. Générer engine_data.json
```

