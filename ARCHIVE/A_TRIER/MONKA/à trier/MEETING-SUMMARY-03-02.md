# Compte Rendu Réunion – Présentation Monka Simulator
**Date :** 03 Février 2026
**Sujet :** Démo Simulator & Stratégie d'Intégration MyMonka

## 1. Réception Générale
- **Effet "Wow" validé :** Le client a été impressionné par la rapidité d'exécution (*"Fait en une soirée"*) et la qualité du rendu visuel.
- **Validation Métier :** Le moteur de règles et les recommandations générées ont été jugés **pertinents** et alignés avec leur expertise métier.
- **Clarification du besoin :** Le Simulator n'a pas vocation à être un outil externe, mais une **brique fonctionnelle** à intégrer directement au cœur de l'application existante "MyMonka".

## 2. Points de Blocage & Objections
Le client a exprimé trois craintes techniques majeures (freins à l'adoption) :

### A. La Peur de la Dépendance Tierce
> *"Plus on a de services, plus il y a de risques."*
- **Crainte :** Créer une dépendance technique forte envers une startup (Pragma) qui pourrait fragiliser leur écosystème en cas de panne ou d'arrêt de service.

### B. Contrainte Sécuritaire (HDS)
- **Crainte :** L'échange de Données de Santé avec un tiers externe complexifie leur conformité HDS. Ils veulent éviter de faire sortir des données sensibles de leur environnement sécurisé.

### C. Le Manque de "Track Record" d'Intégration
- **Constat :** Pragma n'a pas encore de références d'intégration similaires à présenter. Le client a besoin d'être rassuré sur la méthodologie pour ne pas essuyer les plâtres.

## 3. La Stratégie de Réponse : "Self-Hosted" (Livraison de Code)
Pour lever l'ensemble de ces blocages d'un coup, nous pivotons vers un modèle de **Livraison de Code Source** (vs SaaS connecté).

**La Proposition de Valeur Technique :**
"Nous ne sommes pas un logiciel externe, nous sommes un accélérateur de développement interne."

| Problème Client | Solution Pragma "Self-Hosted" |
| :--- | :--- |
| **Peur de la dépendance** | **Code sans dépendance** : Nous livrons les composants React/JS. Une fois livrés, ils vous appartiennent et tournent de manière autonome à perpétuité. |
| **Sécurité HDS** | **Zéro transfert de données** : Le code tourne sur VOS serveurs. Aucune donnée patient ne sort de votre bulle sécurisée. Conformité native. |
| **Manque d'expérience** | **Package "Clé en main"** : Nous fournissons un dossier technique aveugle (Composants + Logique) que vos développeurs n'ont qu'à importer. Intégration standardisée. |

## 4. Prochaines Étapes (Action Items)
- [ ] **Préparer le "Kit Technique"** : Rédiger le mail technique demandé détaillant notre stack et le protocole d'intégration (Format JSON, Composants React).
- [ ] **Livrable Attendu** : Un document ou mail expliquant : *"Voici comment intégrer le module Simulator dans votre stack existante sans friction."*
