# 📊 Rapport Technique Monka — Moteur Clinique

**Destinataires** : Équipe technique Monka
**Date** : 04 février 2026
**Objet** : Fonctionnement du moteur et pistes d'intégration

---

## 1. Introduction

Ce document décrit le fonctionnement du moteur clinique Monka basé sur les règles définies dans vos documents Legacy.

### Objet du livrable

| Composant | Description |
| --- | --- |
| **Moteur de règles** | Logique de scoring, déclenchement, priorités |
| **Structure de données** | Questions typées, recommandations, micro-tâches |
| **Prototype HTML** | Démonstration fonctionnelle du moteur |

> ⚠️ Les données mappées sont issues des sources Legacy et Excel. Leur véracité clinique reste à valider par votre équipe médicale.

---

## 2. Sources Documentaires — Legacy (14 fichiers)

### 2.1 Documents Haute Priorité (règles métier)

| Fichier exact | Contenu |
| --- | --- |
| `Legacy scoring 310127.docx` | Règles de scoring, questions scorantes, formules de normalisation sur 20 |
| `Legacy questionnaire 290127.docx` | Typologie des questions : scorante / déclenchante / critique / descriptive |
| `Legacy Priorisation 300127.docx` | 3 niveaux de gravité avec délais d'action (7j / 15j / 1mois+) |
| `Legacy typologie des micro taches 030226.docx` | 5 types : INFO, ORGA, STRUC, SEC, MED — règle R-MT-ASR-01 |

### 2.2 Documents Référentiels

| Fichier exact | Contenu |
| --- | --- |
| `Legacy ASR Referent op. 030226.docx` | 24 ASR (1 par micro-parcours), signatures d'état |
| `Legacy Micro parcours 030226.docx` | 24 micro-parcours (R1-R4, F1-F6, S1-S4, M1-M6, A1-A4) |
| `Legacy moteur applicatif et sécurité médicale 020326.docx` | 22 règles de sécurité médicale, alertes |
| `Legacy Arborescence Globale 030226.docx` | Architecture des 5 vulnérabilités |

### 2.3 Documents Complémentaires

| Fichier | Contenu |
| --- | --- |
| `Legacy suivi longitudinal 030226.docx` | Suivi dans le temps, reconfirmation ASR |
| `Legacy grammaire de progression 190126.docx` | Transitions entre états |
| `Legacy CR Médecin 030226.docx` | Comptes-rendus médecins |
| `Legacy referentiel phrase CR MT 030226.docx` | Phrases types CR |
| `Legacy Fondateur 030226pages.docx` | Vision fondatrice |
| `CR MT Projection moteur 030226.docx` | Projection technique |

---

## 3. Architecture Technique du Moteur

> 🛠️ **Précision importante :** Le fichier HTML fourni est une **interface de visualisation** permettant de tester et comprendre le moteur. L'aspect visuel (couleurs, boutons, mise en page) n'est pas le sujet — c'est un habillage pour rendre l'algorithme tangible.
>
> **Le cœur du livrable est le moteur JavaScript** qui contient toute la logique métier : scoring, évaluation des CCC, activation des micro-parcours, calcul des priorités. Ce moteur peut être extrait et réutilisé indépendamment de l'interface visuelle.

### 3.1 Structure des données

Le moteur manipule 5 entités principales :

**Exemple de volumes (V1) :** ~35 questions, ~6 règles CCC, 4 micro-parcours, 4 ASR, ~40 micro-tâches.

### 3.2 Fonctionnement du moteur

```
┌─────────────────────────────────────────────────────────────┐
│              LOGIQUE DU MOTEUR (étape par étape)            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   L'utilisateur répond à une question                       │
│                │                                             │
│                ▼                                             │
│   ┌─────────────────────────────────────┐                   │
│   │  1. Le moteur enregistre la réponse │                   │
│   └─────────────────────────────────────┘                   │
│                │                                             │
│                ▼                                             │
│   ┌─────────────────────────────────────┐                   │
│   │  2. Calcul du score                 │                   │
│   │     → Additionne les points         │                   │
│   │     → Ramène sur 20                 │                   │
│   └─────────────────────────────────────┘                   │
│                │                                             │
│                ▼                                             │
│   ┌─────────────────────────────────────┐                   │
│   │  3. Vérifie les combinaisons (CCC)  │                   │
│   │     → Si plusieurs réponses à       │                   │
│   │       risque ensemble → alerte      │                   │
│   └─────────────────────────────────────┘                   │
│                │                                             │
│                ▼                                             │
│   ┌─────────────────────────────────────┐                   │
│   │  4. Active les parcours concernés   │                   │
│   │     → Selon la réponse directe      │                   │
│   │     → Ou via une combinaison (CCC)  │                   │
│   └─────────────────────────────────────┘                   │
│                │                                             │
│                ▼                                             │
│   ┌─────────────────────────────────────┐                   │
│   │  5. Détermine l'urgence             │                   │
│   │     → Niveau 1 = critique (≤7j)     │                   │
│   │     → Niveau 2 = important (≤15j)   │                   │
│   │     → Niveau 3 = planifié (>1 mois) │                   │
│   └─────────────────────────────────────┘                   │
│                │                                             │
│                ▼                                             │
│   Résultat : Score, Urgence, Parcours, Recommandations      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Algorithme de scoring

Le calcul du score se fait en 2 temps :

1. **Score brut** = somme des points des réponses aux questions scorantes
2. **Score normalisé** = (score brut / score max théorique) × 20

La couleur d'interprétation est déterminée par seuils :

| Score /20 | Couleur | Interprétation |
| --- | --- | --- |
| 0 – 6 | 🟢 Vert | Situation préservée |
| 7 – 12 | 🟠 Orange | Vigilance requise |
| 13 – 20 | 🔴 Rouge | Vulnérabilité élevée |

---

## 4. Fonctionnement du Moteur

### 4.1 Typologie des questions

| Type | Effet moteur |
| --- | --- |
| **Scorante** | Incrémente le score de vulnérabilité |
| **Déclenchante (trigger)** | Active un micro-parcours spécifique si option sélectionnée |
| **Critique** | Force priorité niveau 1 (≤7 jours) si option critique sélectionnée |
| **Descriptive** | Contexte uniquement, pas d'effet algorithmique |

### 4.2 Conditions Critiques Composites (CCC)

Les CCC sont des règles booléennes combinant plusieurs réponses. Quand la condition est remplie, le moteur :

- Active le micro-parcours associé
- Passe la priorité en niveau 2 minimum
- Déclenche les recommandations spécifiques à cette CCC

> ✅ **Exemple :** CCC R2_CC_01
> **Condition :** "Aidant seul" (N4=Oui) **ET** "Personne pour aider" (E2=Personne)
> **Effet :** → Active MP R2 + Priorité 2

---

## 5. Micro-Parcours

| V | Préfixe | Parcours | Thème |
| --- | --- | --- | --- |
| V1 | R | R1, R2, R3, R4 | Social & Relationnel |
| V2 | F | F1 → F6 | Fragilité du Proche |
| V3 | S | S1, S2, S3, S4 | Santé de l'Aidant |
| V4 | M | M1 → M6 | Parcours Médical |
| V5 | A | A1, A2, A3, A4 | Administratif |

---

## 6. Micro-Tâches

| Type | Description | Contribue ASR |
| --- | --- | --- |
| **INFO** | Information, explication | ❌ |
| **ORGA** | Organisation, planification | ❌ |
| **STRUC** | Mise en place structurante | ✅ |
| **SEC** | Sécurisation | ✅ |
| **MED** | Prescription médicale | ✅ |

> 📌 **Règle R-MT-ASR-01** : Aucune micro-tâche ne valide directement une ASR. Les tâches sont des moyens, l'ASR est un état du monde observé.

---

## 7. ASR — Actions Structurantes de Référence

> 📌 **Règle R-ASR-01** : 1 Micro-Parcours = 1 ASR unique

Chaque ASR représente un état cible validé par des "signatures d'état" (déclarations factuelles). Une seule signature suffit.

| État | Signification |
| --- | --- |
| **❌ Non atteinte** | Aucune signature valide |
| **✔ Atteinte** | ≥ 1 signature détectée |
| **⚠ Non confirmée** | Atteinte mais non reconfirmée au suivi |

---

## 8. Priorisation

| Niveau | Déclencheur | Délai |
| --- | --- | --- |
| **1** | Question critique directe | ≤ 7 jours |
| **2** | CCC activée | ≤ 15 jours |
| **3** | Score seul | > 1 mois |

---

## 9. Options d'Intégration

### Option A — Intégration via iframe ou WebView

*(= embarquer le HTML directement dans votre application)*

| Aspect | Détail |
| --- | --- |
| **Principe** | Intégrer le fichier HTML dans une iframe (web) ou WebView (mobile). Le moteur tourne tel quel côté client. |
| **Avantages** | Aucun développement, déploiement immédiat, isolation complète |
| **Limites** | Pas d'accès aux données depuis votre backend, styling séparé |

### Option B — Extraction en module JavaScript

*(= extraire le moteur pour l'importer dans votre codebase JS/TS)*

| Aspect | Détail |
| --- | --- |
| **Principe** | Refactorer le moteur en module ES6 exportable. Vos développeurs importent les fonctions (calculateScore, evaluateCCC, etc.) dans votre app React/Vue/Node. |
| **Avantages** | Intégration native, accès aux données, styling unifié |
| **Limites** | Nécessite intervention de vos devs pour l'adaptation |

### Option C — Import des données vers votre base

*(= importer les structures de données, recoder le moteur dans votre stack)*

| Aspect | Détail |
| --- | --- |
| **Principe** | Exporter les données (questions, CCC, ASR) en JSON ou SQL. Votre équipe réimplémente la logique moteur dans votre langage (Python, Go, Java...). |
| **Avantages** | Contrôle total, intégration profonde avec votre architecture |
| **Limites** | Développement significatif, risque de divergence avec nos règles |

### Synthèse comparative

| Critère | Option A | Option B | Option C |
| --- | --- | --- | --- |
| Contrôle | Faible | Moyen | Total |
| Maintenabilité | Dépend de nous | Partagée | Votre équipe |
| Cas d'usage | POC, démo, test | Prod web/mobile | Prod avec custom |

---

📄 *Rapport Technique Monka — 04/02/2026*
