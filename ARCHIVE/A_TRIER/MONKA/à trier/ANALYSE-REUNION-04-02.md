# Analyse Réunion Monka — 04 Février 2026

## 🎯 Contexte

Benjamin (CEO/Médecin Monka) présente notre simulateur à des investisseurs et à l'équipe CNRS (Clément, Dominique, Paco). Le but : montrer comment fonctionne le moteur de règles.

---

## 📌 Ce que j'ai compris

### 1. Le projet CNRS/IA n'est PAS pour remplacer l'algo

Leur objectif ML est limité :
> "C'est une opportunité pour nous d'analyser, identifier des corrélations, des patterns, pour comprendre où il y a du bruit dans nos questionnaires et rationaliser au mieux nos questionnaires."

**Traduction** : Le ML sert à **nettoyer le questionnaire**, pas à remplacer les règles métier.

- Identifier les questions inutiles
- Trouver des corrélations cachées
- Réduire les 177 questions à l'essentiel

### 2. L'algo (notre travail) ne sera PAS touché

Benjamin dit clairement :
> "À aucun moment ça ne touche le moteur et le modèle que nous avons prévalidé ensemble sur lequel on bosse depuis deux ans."

**Notre algo = sanctuarisé.** Le ML vient EN PLUS, pas à la place.

### 3. Ils ont bien compris la distinction

Laurent (CNRS ?) dit :
> "On l'avait appelé le modèle déterministe versus le modèle liable."

Ils distinguent bien :
- **Modèle déterministe** = notre algo (règles fixes)
- **Modèle liable** = leur ML futur (apprend des données)

### 4. Le questionnaire est figé

> "Là on a figé le questionnaire, c'est figé. Aucune modification prévue."

Ils ont promis de ne pas changer les questions sans consultation préalable. C'est important pour la stabilité du dataset.

### 5. Ce que le ML doit produire

Objectifs WP1/WP2/WP3 (Work Packages CNRS) :
- Analyser les corrélations entre questions
- Identifier le "bruit" (questions redondantes)
- Proposer des simplifications du questionnaire
- Valider statistiquement les règles existantes

> "L'objectif du modèle c'est de nous dire ce qu'on ne doit pas faire, ce qu'on doit rationaliser."

### 6. Notre simulateur les a impressionnés

> "Franchement, de passer du papier dans ta tête à voir un truc qui s'affiche... c'est quand même un peu jouissif."

> "On va pouvoir faire tourner le moteur sur 1000 aidants, 1000 typologies... voir si c'est cohérent ou incohérent."

**Ils utilisent notre simulateur pour tester leurs hypothèses.**

---

## 🔑 Points clés pour nous

| Sujet | Ce que ça veut dire |
|-------|---------------------|
| **ML ≠ remplacement** | Le ML optimise le questionnaire, pas les règles |
| **Notre algo = référence** | Ils testent leurs idées CONTRE notre moteur |
| **Dataset = enjeu** | Plus de variables = plus de questionnaires nécessaires |
| **Questionnaire figé** | Pas de changement sans accord |

---

## ⚠️ Risques identifiés

1. **Confusion terminologique** : Ils disent "modèle" pour parler de notre algo ET de leur ML. À clarifier.

2. **Attentes floues sur le ML** : Clément (CNRS) demande "comment le modèle a été entraîné" → Il n'a pas compris que c'est déterministe.

3. **Dépendance à nous** : Ils n'ont pas notre code. Ils utilisent le simulateur comme démo, mais n'ont pas le moteur en prod.

---

## 💡 Ce qu'on doit faire

1. **Livrer le moteur** : Ils en ont besoin pour générer des données structurées pour leur ML.

2. **Documenter clairement** : "Ce n'est pas de l'IA, c'est un système de règles."

3. **Facturer la valeur** : Notre algo est la fondation de tout leur système. Sans lui, le ML CNRS n'a rien à analyser.

---

## 📊 Architecture globale (ce que je comprends)

```
QUESTIONNAIRE (177 questions)
        ↓
NOTRE ALGO (règles déterministes)
        ↓
├── Score de vulnérabilité
├── Priorité (1/2/3)
├── Micro-parcours activés
├── Recommandations
└── Micro-tâches
        ↓
DONNÉES STRUCTURÉES
        ↓
ML CNRS (analyse des patterns)
        ↓
OPTIMISATION QUESTIONNAIRE
        ↓
(Boucle : nouvelles questions → nouvel algo → nouvelles données)
```

**Notre algo = la couche de transformation.** Sans lui, le ML n'a que du texte brut.
