---
description: Workflow itératif pour modifications UI du simulateur Monka - Input brut → Analyse → Implémentation → Test
---

# 🔄 Workflow Itération UI Simulateur

Ce workflow gère les modifications visuelles du Simulateur Monka V3 en mode itératif.

---

## 📥 ÉTAPE 1: Réception Input Brut

**L'utilisateur envoie un input brut**, par exemple :
- "Je veux voir les CCC en gros avec les questions liées"
- "Ajoute un onglet Justification comme dans V1"
- "Les recommandations doivent montrer les micro-tâches"

---

## 🔍 ÉTAPE 2: Reformulation & Analyse

### 2.1 Reformuler l'input
- **Ce que l'utilisateur veut** : description claire de l'objectif UI
- **Éléments visuels concernés** : onglets, sections, composants
- **Données requises** : quels champs JSON sont nécessaires

### 2.2 Scanner les fichiers sources
Vérifier si les données existent dans :

| Fichier | Contenu |
|---------|---------|
| `DEMO/data/V{X}/simulator_data.json` | Questions, CCC, ASR, Personas, Scoring |
| `QUESTIONNAIRE_V2/V{X}/*.md` | Sources de vérité (questions.md, ccc.md, asr.md) |
| `DEMO/monka_simulator.html` | Simulateur V1 legacy (référence) |
| `DEMO/monka_simulator_v3.html` | Simulateur V3 actuel |

### 2.3 Évaluer l'impact
- ✅ **Données existantes** → Implémentation directe
- ⚠️ **Données manquantes dans JSON** → Mise à jour JSON requise
- 🔴 **Données non-existantes dans sources** → Extraction requise

---

## 📋 ÉTAPE 3: Plan d'Implémentation

Format de réponse à l'utilisateur :

```markdown
## 📥 Input reçu
"[Phrase brute de l'utilisateur]"

## 🎯 Ce que je comprends
[Reformulation claire et technique]

## 📂 Fichiers à scanner
- [ ] `[chemin]` → [raison]

## 📊 Impact données
| Élément | Existe dans JSON | Action requise |
|---------|------------------|----------------|
| [champ] | ✅/❌ | [ajouter/modifier/aucune] |

## 🛠️ Plan d'implémentation
1. [étape 1]
2. [étape 2]
...

## ⏳ Estimation
- Modifications JSON : [X] fichiers
- Modifications HTML : [Y] sections
```

---

## 🛠️ ÉTAPE 4: Implémentation

### 4.1 Modifications JSON (si nécessaires)
Mettre à jour les `simulator_data.json` pour V1-V5 :
- Respect de la structure existante
- Pas de hardcoding (valeurs dynamiques par vulnérabilité)

### 4.2 Modifications HTML
Modifier `monka_simulator_v3.html` :
- Ajouter/modifier onglets si demandé
- Créer les fonctions `render[NouvelElement]()` 
- Intégrer dans `updateResults()` si dynamique

### 4.3 Mise à jour CSS
Si nouveau composant visuel → ajouter styles dans `<style>`

---

## 🧪 ÉTAPE 5: Test avec Agent Browser

// turbo
```bash
cd /Users/antonin/monka/DEMO && python3 -m http.server 8888
```

Puis utiliser `browser_subagent` pour :
1. Ouvrir http://localhost:8888/monka_simulator_v3.html
2. Sélectionner un persona (ex: Ahmed K.)
3. Vérifier l'onglet modifié
4. Capturer screenshot

---

## 📝 ÉTAPE 6: Documentation

Si modifications structurelles JSON :
- Mettre à jour `/generation-json-simulateur` si nouveau champ
- Mettre à jour le KI `monka_core_engine_legacy` si besoin

---

## 🔁 Boucle Itérative

```
User Input → Analyse → Plan → [Validation User] → Implémentation → Test → Screenshot
                                     ↑                                    ↓
                                     └──────────── Feedback ──────────────┘
```

---

## 📚 Référence: Structure JSON Actuelle

```json
{
  "vulnerability": { "code": "V1", "name": "..." },
  "metadata": { ... },
  "questions": [{ "id", "text", "type", "bloc", "options" }],
  "scoring": { "questions", "max_score", "thresholds" },
  "ccc": [{ "id", "name", "micro_parcours", "questions", "logic" }],
  "asr": [{ "code", "name", "objective", "signatures" }],
  "personas": [{ "name", "description", "priority_badge", "ccc_count", "responses" }],
  "rules": [{ "id", "description" }],
  "recommendations": [{ ... }]  // OPTIONNEL - sinon généré dynamiquement
}
```

---

## 📚 Référence: Onglets V1 Original

| Onglet | Description |
|--------|-------------|
| **Scoring** | Score brut, seuils, détail par question |
| **Questions Critiques** | Liste des réponses critiques directes |
| **CCC** | Conditions Critiques Composites avec statut activé/inactif |
| **Micro-parcours** | MP activés par les CCC |
| **Justification** | Arbre de décision : Question → Réponse → Pourquoi → Reco → Micro-tâches |
