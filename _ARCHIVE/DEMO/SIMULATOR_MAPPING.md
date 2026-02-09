# 🎯 Mapping Simulateur Monka V3

> **Objectif** : Spécification UI/UX pour l'affichage dynamique du moteur clinique  
> **Source** : `simulator_data.json` (V1-V5)

---

## 🔧 Sélecteur de Vulnérabilité

| Onglet | Source | Comportement |
|--------|--------|--------------|
| V1 | `data/V1/simulator_data.json` | Questions V1 uniquement |
| V2 | `data/V2/simulator_data.json` | Questions V2 uniquement |
| V3 | `data/V3/simulator_data.json` | Questions V3 uniquement |
| V4 | `data/V4/simulator_data.json` | Questions V4 uniquement |
| V5 | `data/V5/simulator_data.json` | Questions V5 uniquement |
| **TOUS** | Merge V1-V5 + Triggers | **Toutes les questions** |

> **Comportement "TOUS"** : Le questionnaire affiche toutes les questions documentées (V1→V5 + triggers). Le moteur évalue toutes les vulnérabilités simultanément.
> 
> **Questions documentées dans les `.md`** : V1=15, V2=28, V3=18, V4=18, V5=14 = **93 questions**
> 
> **Metadata sources (objectif cible)** : V1=15, V2=57, V3=27, V4=36, V5=18 = **153 questions** + 15 triggers = **~168**
> 
> ⚠️ Les fichiers `questions.md` ne contiennent pas encore toutes les questions indiquées dans la metadata. Les questions manquantes (~75) devront être ajoutées dans les fichiers sources pour atteindre le total cible.

---

## 📊 Onglets Moteur (Panel Droit)

### 1. Scoring

| Élément | Source JSON | Affichage |
|---------|-------------|-----------|
| Score global | Calcul `questions[].options[].score` | Badge coloré (🟢/🟠/🔴) |
| Détail par question | `questions[id].options[selected].score` | Tableau ID → Score |

> ⚠️ **Supprimer** : La notion de "priorité" de cet onglet (déplacer vers MP)

---

### 2. Critiques

**Déclenchement** : Quand une réponse critique est sélectionnée

| Source | Condition d'activation | Affichage |
|--------|------------------------|-----------|
| `declencheurs.critiques_directs` | `question_id` + `option` match réponse | Question + Option + MP déclenché |

**Format d'affichage** :
```
🔴 CRITIQUE ACTIVÉE
Question: {label}
Réponse: {option_label}
→ Déclenche MP: {micro_parcours}
Délai max: {delay_days} jours
```

---

### 3. CCC (Conditions Critiques Composites)

**Structure d'affichage** :

| Section | Contenu |
|---------|---------|
| **CCC Activées** | CCC dont toutes les conditions sont remplies |
| **CCC Potentielles** | CCC de la vulnérabilité avec conditions partielles |

**Format CCC Activée** :
```
✅ CCC_{X}_{N} — {name}
Conditions remplies:
  • {question_id1} = {option_label1} ✓
  • {question_id2} = {option_label2} ✓
→ Déclenche: {micro_parcours}
```

**Format CCC Potentielle** :
```
⏳ CCC_{X}_{N} — {name}
Conditions:
  • {question_id1} = {option_label1} ✓
  • {question_id2} = {option_label2} ✗ (manquant)
```

**Recommendations CCC** :
- Si CCC activée → Afficher `ccc[].recommendations.app_text` dans onglet Recommendations
- Si CCC activée → Afficher `ccc[].recommendations.micro_taches` dans onglet Micro-Tâches

---

### 4. Micro-Parcours (MP)

**Vue d'ensemble** : Lister TOUS les MP de la vulnérabilité

| MP | État | Source activation |
|----|------|-------------------|
| Inactif | Grisé | — |
| Activé (critique) | 🔴 | Question critique directe |
| Activé (CCC) | 🟠 | CCC remplie |
| Activé (standard) | 🟡 | Déclencheur standard |

**Format MP Activé** :
```
🟢 {MP} — {name}
Activé par: {source_type}
  → {question_id} = {option_label}
Objectif (ASR): {asr_objectif}
Priorité: {priority} | Délai: {delay_days}j
```

**Section ASR intégrée** :
```
📌 Signatures de validation:
  • {signature_A.id}: {signature_A.condition}
  • {signature_B.id}: {signature_B.condition}
```

---

### 5. Micro-Tâches (MT)

**Source** : `recommendations[question_id][option].micro_taches` + `ccc[].recommendations.micro_taches`

| Colonne | Source | Format |
|---------|--------|--------|
| Tâche | `micro_taches[].text` | Texte libre |
| Type | `micro_taches[].type` | Badge `STRUC` `SEC` `MED` `INFO` `ORGA` |
| Acteur | `micro_taches[].actor` | IDEC, Médecin, etc. |
| Catégorie | **À AJOUTER** | `medico_social` / `medical` |

**Groupement** :
```
📋 Micro-Tâches ({count})

Par Question:
  {question_id} → {option_label}
  • [{TYPE}] {text} — {actor}
  
Par CCC:
  {CCC_id} — {name}
  • [{TYPE}] {text} — {actor}
```

---

### 6. Recommendations

**Sources combinées** :
1. `recommendations[question_id][option].app_text` — Pour chaque réponse
2. `ccc[].recommendations.app_text` — Pour chaque CCC activée

**Format** :
```
💡 Recommendations

Par réponse:
  {question_label} → {option_label}
  > {app_text}

Par CCC activée:
  {CCC_id} — {name}
  > {app_text}
```

---

### 7. Justification (Arbre de Décision)

**Objectif** : Traçabilité complète de chaque réponse vers ses effets

**Format par réponse** :
```
🔍 {question_id} — {question_label}
Réponse: {option_label}

→ SCORING
  Points: +{score} / {max_score}
  
→ DÉCLENCHEUR
  Type: {critique_direct | standard | aucun}
  MP déclenché: {micro_parcours}
  
→ CCC IMPACTÉES
  • {CCC_id}: condition {met | not_met}
  
→ RECOMMENDATION
  App: {app_text}
  MT: {count} micro-tâches générées
```

---

## 🔄 Flux de Mise à Jour

```
Réponse modifiée
    │
    ├─→ Recalcul Score (Onglet 1)
    │
    ├─→ Check Critiques (Onglet 2)
    │
    ├─→ Évaluation CCC (Onglet 3)
    │   └─→ Si CCC activée → MAJ Recommendations + MT
    │
    ├─→ Évaluation MP (Onglet 4)
    │   └─→ Afficher ASR + Signatures
    │
    ├─→ Agrégation MT (Onglet 5)
    │
    ├─→ Agrégation Recommendations (Onglet 6)
    │
    └─→ Mise à jour Justification (Onglet 7)
```

---

## 📋 TODO Implémentation

- [ ] Ajouter onglet "TOUS" dans le sélecteur de vulnérabilité
- [ ] Supprimer "priorité" de l'onglet Scoring
- [ ] Refactorer onglet Critiques avec affichage question
- [ ] Implémenter vue CCC activées + potentielles
- [ ] Lier CCC → Recommendations + MT
- [ ] Ajouter ASR + Signatures dans onglet MP
- [ ] Ajouter colonne "Catégorie" (medico_social/medical) aux MT
- [ ] Créer onglet Justification (arbre de décision)
