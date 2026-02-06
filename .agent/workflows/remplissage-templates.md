---
description: Comment remplir les templates QUESTIONNAIRE_V2 avec les données extraites
---

# Skill: Remplissage Templates Monka

## Quand utiliser ce skill

Utiliser ce skill quand :
- On veut remplir un template dans `QUESTIONNAIRE_V2/templates/`
- On veut créer les données pour une vulnérabilité V1-V5
- On veut vérifier la qualité d'un template rempli

---

## Prérequis

1. Les JSON extracted doivent être à jour (`SOURCES/extracted/`)
2. Lire `QUESTIONNAIRE_V2/UNDERSTANDING.md` pour la terminologie
3. Identifier la vulnérabilité cible (V1, V2, V3, V4 ou V5)

---

## Sources de Données

### JSON Extracted (Source de Vérité)

| JSON | Contenu | Pour quel template |
|------|---------|-------------------|
| `legacy_complete.json` | Règles, définitions, structure | Tous |
| `recommendations_complete.json` | Recos par question/option | recommendations.md |
| `tableau_sophie_cat_complete.json` | Actions IDEC | recommendations.md |
| `microparcours_complete.json` | 24 MP, ASR, questions | asr.md |
| `typologie_ccc_scoring.json` | CCC + scoring par V | ccc.md, scoring.md |
| `Questionnaire_validé.xlsx_extracted.json` | Questions, options | questions.md |

### Documents IA (à valider)

| Source | Contenu IA | Pour quel template |
|--------|-----------|-------------------|
| `QUESTIONNAIRE/V{X}/base/ccc_recommendations.md` | MT associées aux CCC | ccc.md |
| `QUESTIONNAIRE/V{X}/base/micro_taches_typologie.md` | Typage MT | recommendations.md |

---

## Étapes du Remplissage

### ÉTAPE 1: Choisir le template et la vulnérabilité

```bash
# Lister les templates disponibles
ls QUESTIONNAIRE_V2/templates/
```

Templates disponibles :
- `questions.md` — Questions uniquement
- `scoring.md` — Règles de scoring
- `triggers.md` — 15 questions contexte
- `declencheurs.md` — Questions qui activent MP
- `recommendations.md` — Recos app + actions IDEC
- `ccc.md` — Conditions critiques composites
- `asr.md` — Actions structurantes de référence
- `suivi.md` — Questions suivi mensuel
- `progression.md` — États et transitions

---

### ÉTAPE 2: Consulter la template vide

Ouvrir le template pour voir le format attendu :
```bash
cat QUESTIONNAIRE_V2/templates/{template}.md
```

Chaque template contient :
- En-tête avec sources attendues
- Format YAML pour métadonnées
- Structure markdown pour les données
- Règles à respecter

---

### ÉTAPE 3: Extraire les données du JSON

Pour chaque template, utiliser le JSON correspondant :

#### questions.md
```python
# Lire Questionnaire_validé.xlsx_extracted.json
# Filtrer par vulnérabilité (V1, V2, etc.)
# Extraire : ID, texte question, options
```

#### scoring.md
```python
# Lire typologie_ccc_scoring.json
# Chercher les tables de scoring par vulnérabilité
# Extraire : question, réponse, score
```

#### recommendations.md
```python
# Lire recommendations_complete.json
# Filtrer par vulnérabilité
# Extraire : question, option, reco_app, actions_idec
# Ajouter 🤖 pour le typage MT (IA)
```

#### ccc.md
```python
# Lire typologie_ccc_scoring.json
# Chercher les CCC par vulnérabilité (R1_CC_01, F1_CC_01, etc.)
# Extraire : MP, condition, questions, logique, sens clinique
# Les MT associées viennent de QUESTIONNAIRE/V{X}/base/ccc_recommendations.md → 🤖
```

#### asr.md
```python
# Lire legacy_complete.json → "Legacy ASR Referent op. 030226.docx"
# Extraire les 24 ASR avec signatures d'état (R1-A, R1-B, etc.)
# Croiser avec microparcours_complete.json pour la structure
```

---

### ÉTAPE 4: Remplir le template

Créer le fichier de données dans `QUESTIONNAIRE_V2/V{X}/` :

```bash
# Créer le dossier si nécessaire
mkdir -p QUESTIONNAIRE_V2/V1_social_relationnel/

# Créer le fichier
touch QUESTIONNAIRE_V2/V1_social_relationnel/questions.md
```

**Format de chaque fichier :**

```markdown
# 📝 Questions V1 — Social et Relationnel

> **Source** : `SOURCES/extracted/Questionnaire_validé.xlsx_extracted.json`
> **Date extraction** : YYYY-MM-DD

## Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
total_questions: 15
```

## Questions

### O47 - Distance domicile

**Libellé** : À combien de temps habitez-vous du domicile de la personne aidée ?

**Options** :
| Code | Libellé | Score |
|------|---------|-------|
| 1 | Moins de 30 min | 1 |
| 2 | Entre 30 min et 1h30 | 2 |
| 3 | Plus de 1h30 | 3 |

...
```

---

### ÉTAPE 5: Marquer le contenu IA

Tout contenu généré/déduit par l'IA doit être marqué :

```markdown
## 🤖 Contenu IA (à valider)

Les éléments suivants sont générés par IA et nécessitent validation clinique :

- [ ] Typage micro-tâches (STRUC/SEC/MED/INFO/ORGA)
- [ ] Recos/MT associées aux CCC
```

---

### ÉTAPE 6: Audit Qualité

Vérifier les 3 axes avant de valider :

#### 1. Qualité des Données
- [ ] Données fidèles à la source JSON
- [ ] Pas de transformation/déformation
- [ ] IDs et libellés exacts

#### 2. Alignement Terminologie (UNDERSTANDING.md)
| Terme | Définition correcte | ❌ À éviter |
|-------|---------------------|-------------|
| **Trigger** | Question contexte/profil | "Déclencheur" |
| **Déclencheur** | Question qui active un MP | "Trigger" |
| **ASR** | Objectif utilisateur (1 MP = 1 ASR) | "Tâche" |
| **Micro-tâche** | Moyen d'atteindre l'ASR | "ASR" |
| **CCC** | Combinaison composite → MP | "Trigger" |

#### 3. Cohérence Globale
- [ ] Pas de contradiction entre templates
- [ ] Même vocabulaire partout
- [ ] IDs cohérents

---

### ÉTAPE 7: Documenter et Valider

Ajouter une entrée dans `LOGS/donnees/changelog.md` :

```markdown
## [DATE] — Remplissage V{X}/{template}.md

**Source JSON** : `SOURCES/extracted/{json}.json`
**Template** : `QUESTIONNAIRE_V2/V{X}/{template}.md`

### Données extraites
- {N} questions
- {N} recos
- etc.

### Contenu IA
- [ ] Typage MT — en attente validation clinique

**Validé par** : [Nom]
```

---

## Commandes Rapides

```bash
# // turbo-all

# Voir les JSON disponibles
ls SOURCES/extracted/*.json

# Voir un template
cat QUESTIONNAIRE_V2/templates/questions.md

# Voir UNDERSTANDING.md
cat QUESTIONNAIRE_V2/UNDERSTANDING.md

# Voir un JSON (exemple)
head -100 SOURCES/extracted/recommendations_complete.json
```

---

## Matrice Complète Sources → Templates

| Template | Source Legacy | Source Excel/JSON | Contenu IA |
|----------|---------------|-------------------|------------|
| questions.md | Legacy questionnaire | Questionnaire_validé.xlsx | - |
| scoring.md | Legacy scoring + Typologie,CCC | typologie_ccc_scoring.json | - |
| triggers.md | Legacy questionnaire §4.7 | - | - |
| declencheurs.md | Legacy Priorisation | Questionnaire_validé.xlsx | - |
| recommendations.md | - | recommendations_complete.json | 🤖 Typage MT |
| ccc.md | Typologie,CCC | typologie_ccc_scoring.json | 🤖 MT CCC |
| asr.md | Legacy ASR Referent | microparcours_complete.json | - |
| suivi.md | Legacy suivi | Questionnaire_de_suivi.xlsx | - |
| progression.md | Legacy grammaire | - | - |
