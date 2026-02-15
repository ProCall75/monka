# Audit de Réorganisation — rapport_technique_monka

## Problèmes Identifiés

### 1. Termes utilisés avant définition
| Terme | Première mention | Définition | Problème |
|-------|------------------|------------|----------|
| CCC | Section 3.1 (flux moteur) | Section 3.4 | Utilisé 4 fois avant d'être défini |
| Micro-parcours (MP) | Section 3.1 | Section 3.5 | Mentionné dans le flux avant explication |
| ASR | Section 3.5 (fin) | Section 7 (HTML) | Jamais défini dans le MD |
| Micro-tâches | Section 3.1 | Section 6 (HTML) | Absent du MD |

### 2. Hiérarchie conceptuelle inversée
Le document suit un ordre **technique → conceptuel** au lieu de **conceptuel → technique**.

**Ordre actuel :**
1. Sources documentaires (références)
2. Flux technique du moteur
3. Concepts (scoring, CCC, MP)
4. Options d'intégration

**Problème :** Le lecteur voit le "comment" avant le "quoi".

### 3. Densité d'information inégale
- Section 2 (Sources) : 3 tableaux, très détaillé
- Section 3 (Moteur) : 6 sous-sections, trop dense
- Sections 5-8 (HTML) : Bien structurées mais absentes du MD

---

## Structure Proposée (Optimisée Vulgarisation)

### Principe : "Define Before Use"
Chaque concept doit être défini AVANT d'être utilisé.

### Nouvelle Hiérarchie

```
1. INTRODUCTION
   └─ Objet du livrable (3 composants : Moteur, Données, Proto)

2. CONCEPTS FONDAMENTAUX (définitions)
   ├─ 2.1 Les 5 Vulnérabilités
   ├─ 2.2 Types de questions (Scorante, Déclenchante, Critique, Descriptive)
   ├─ 2.3 Micro-parcours (MP) et ASR
   ├─ 2.4 Conditions Critiques Composites (CCC)
   └─ 2.5 Micro-tâches et leur typologie

3. FONCTIONNEMENT DU MOTEUR
   ├─ 3.1 Flux principal (schéma simplifié)
   ├─ 3.2 Scoring (formule + seuils)
   └─ 3.3 Priorisation (niveaux 1/2/3)

4. ARCHITECTURE DES DONNÉES
   ├─ 4.1 Structure fichiers
   └─ 4.2 Sources Legacy (référence)

5. OPTIONS D'INTÉGRATION
   ├─ 5.1 Option A — iframe
   ├─ 5.2 Option B — Module JS
   ├─ 5.3 Option C — Import DB
   └─ 5.4 Comparatif

6. PROCHAINES ÉTAPES
```

---

## Templates PDF Nécessaires

| Type de Slide | Contenu à représenter |
|---------------|----------------------|
| **Diagram (Flowchart)** | Flux moteur (réponse → scoring → CCC → MP → priorité) |
| **Decision Tree** | Logique CCC (SI x ET y ALORS z) |
| **Steps (1-2-3)** | Algorithme de scoring en 2 temps |
| **Table Comparative** | Options A/B/C, Niveaux de priorité |
| **Hierarchy/Tree** | 5 Vulnérabilités → 24 MP → ASR |
| **Definition Cards** | Types de questions, Types de micro-tâches |

---

## Actions Concrètes

1. **Réorganiser** le document selon la nouvelle hiérarchie
2. **Déplacer** les définitions (CCC, MP, ASR, Micro-tâches) en section 2
3. **Simplifier** le schéma du flux moteur pour qu'il n'utilise que des termes déjà définis
4. **Ajouter** au MD les sections 5-8 du HTML (Micro-tâches, ASR, Priorisation)
5. **Créer** les templates PDF correspondants aux types de contenu identifiés
