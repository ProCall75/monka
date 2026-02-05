# 📋 Proposition de Collaboration PRAGMA × Monka

> **Date** : 05 février 2026  
> **Auteur** : PRAGMA  
> **Statut** : Document de proposition

---

## ⚠️ Avant-propos

**Vous restez maître de votre produit.**

Ce document présente des axes de travail et des recommandations. À chaque étape, c'est **vous qui validez, refusez ou affinez** les propositions. Notre rôle est de vous apporter de la visibilité, de la structuration et des options — pas de prendre des décisions à votre place.

L'objectif : que votre travail évolue de *"concevoir l'algorithme"* vers *"valider/ajuster des propositions structurées"*.

---

## 1. Ce qui a été réalisé en 15h

### 1.1 Livrables produits

| Livrable | Description | Fichier de référence |
|----------|-------------|---------------------|
| **Rapport technique** | Description du moteur clinique pour votre équipe | `LIVRABLES/rapport_technique_monka.html` |
| **Simulateur V1** | Interface pour visualiser le moteur en action | `DEMO/monka_simulator.html` |
| **Audit 174 questions** | Vérification de cohérence Excel vs Legacy | `AUDIT/audit_177_questions.md` |
| **Référentiel ASR** | 24 ASR documentées, règle 1 MP = 1 ASR | `AUTRES/REFERENTIEL_ASR.md` |
| **Référentiel micro-tâches** | 5 types (INFO/ORGA/STRUC/SEC/MED) | `AUTRES/REFERENTIEL_TYPOLOGIE_MICRO_TACHES.md` |
| **Référentiel priorisation** | 3 niveaux d'urgence documentés | `AUTRES/REFERENTIEL_PRIORISATION.md` |

### 1.2 Valeur immédiate

**Avant** : Votre algorithme existait dans des documents Word et des fichiers Excel — difficile à tester, impossible à visualiser.

**Après** : Vous pouvez *voir* le moteur fonctionner, tester des profils, observer les scores et recommandations en temps réel.

---

## 2. Travaux réalisés mais non encore présentés

Ces éléments sont prêts et peuvent faire l'objet d'une présentation détaillée.

### 2.1 Personas & Segmentation

**Fichiers de référence** :
- `PROPOSITION_PERSONAS_MONKA.md` — Définition des 5 + 5 personas
- `REFLEXION_ARCHITECTURE_PERSONAS.md` — Réflexion sur l'architecture

**Ce qu'on a fait** :

Nous avons analysé **quelles caractéristiques changent réellement les recommandations**. La conclusion : ce n'est pas l'âge ou le sexe qui compte, mais :

- **Pour les aidants** : situation professionnelle (droits différents), niveau d'épuisement (urgence vs prévention), isolement (création de réseau)
- **Pour les aidés** : type de situation (N3), niveau d'autonomie, présence de troubles cognitifs

**Résultat** : 5 personas AIDANTS (Actif, Stable, Crise, Isolé, Découvreur) + 5 personas AIDÉS (Âgé autonome, Dépendant, Handicap, Psy/TNC, Addictions).

**Pourquoi c'est utile** :
- Permet de tester si chaque persona déclenche les *bonnes* recommandations
- Base pour personnaliser les recommandations sans multiplier le travail
- Arbre de décision documenté pour identifier automatiquement le persona

### 2.2 Scan CCC vs Questions Critiques

**Fichier de référence** : `AUDIT/phase2_scan_critiques_vs_ccc.md`

**Ce qu'on a fait** :

Nous avons vérifié une règle fondamentale de votre Legacy :

> *"Une question CRITIQUE déclenche une Priorité 1 directe. Elle ne doit jamais apparaître dans une CCC (qui déclenche Priorité 2)."*

**Résultat** : **9 conflits détectés** sur 25 CCC analysées.

| V | Conflits | Exemple |
|---|----------|---------|
| V1 | 3 | E2 (isolement critique) apparaît dans R2_CC_01 et R2_CC_02 |
| V2 | 2 | E21 (maintien impossible) apparaît dans CCC_F1_01 |
| V3 | 2 | **E18 (idées suicidaires)** apparaît dans S3_CC_01 → **à retirer impérativement** |
| V4 | 1 | E54 (refus traitement) apparaît dans M5_CC_01 |
| V5 | 1 | E68 (surcharge admin) dans A3_CC_01 |

**Pourquoi c'est utile** :
- Détection de failles dans la logique clinique
- Chaque conflit = une décision à prendre (supprimer CCC ou retirer statut critique)
- Document prêt avec tableau de décisions à valider

### 2.3 Audit de l'alignement scoring Legacy

**Fichier de référence** : `AUDIT/etat_audit_scoring_legacy.md`

**Ce qu'on a fait** :

En comparant vos fichiers avec le Legacy scoring officiel, nous avons découvert que **les questions scorantes dans V2-V5 ne correspondent pas au Legacy**.

| V | Legacy (scorantes) | Nos fichiers | Overlap réel |
|---|-------------------|--------------|--------------|
| V2 | 14 questions | 9 questions | **21%** |
| V3 | 9 questions | 10 questions | **22%** |
| V4 | 6 questions | 11 questions | **33%** |
| V5 | 3 questions | 4 questions | **67%** |

**Pourquoi c'est important** :
- Les scores calculés actuellement ne sont pas alignés avec votre source de vérité clinique
- Les cas de test utilisent les mauvaises scorantes → résultats faux
- Nécessite une décision : aligner sur le Legacy ou valider la logique actuelle

### 2.4 Retours UI/UX (Marwane)

Des points de friction ont été identifiés dans l'application actuelle, avec des propositions d'amélioration concrètes.

---

## 3. Ce que nous pourrions faire ensemble

### 3.1 Audit & Qualité des données

**Objectif** : S'assurer que votre moteur fait exactement ce que vous pensez qu'il fait.

| Axe | Description | Bénéfice |
|-----|-------------|----------|
| **Audit scoring complet** | Aligner toutes les scorantes sur le Legacy | Scores conformes à la clinique |
| **Batterie de tests** | Créer des profils de référence (golden tests) | Détection des régressions |
| **Couverture CCC** | Vérifier que chaque règle est testée | Confiance dans les alertes |
| **Documentation d'écarts** | Chaque décision tracée et vulgarisée | Traçabilité pour investisseurs |

**Fichiers qui serviraient de base** :
- `AUDIT/etat_audit_scoring_legacy.md`
- `AUDIT/coherence_audit.md`
- `SOURCES/doc_tampon_modifications.md`

### 3.2 Personnalisation des recommandations

**Objectif** : Adapter les recommandations selon le profil, sans multiplier le travail.

| Axe | Description | Bénéfice |
|-----|-------------|----------|
| **Overrides par persona** | Les questions restent identiques, les recommandations s'adaptent | Accompagnement plus précis |
| **CCC personnalisées** | Ajuster l'urgence selon le contexte global | Priorisation intelligente |
| **Tests de confrontation** | Chaque persona déclenche-t-il les bons parcours ? | Validation de la pertinence |

**Notre raisonnement** (documenté dans `REFLEXION_ARCHITECTURE_PERSONAS.md`) :

> *"Pour créer un persona pertinent, il faut se poser cette question : si je donne cette recommandation à ce persona vs un autre, est-ce que le contenu, le ton, les acteurs ou les ressources changent significativement ?"*

Exemple : Un aidant **salarié** a droit au congé de proche aidant et doit dialoguer avec son RH. Un aidant **retraité** n'a pas ces spécificités. Donc les recommandations sur l'épuisement doivent mentionner des acteurs différents.

### 3.3 Documentation inter-équipes

**Objectif** : Que chaque équipe (tech, produit, ops, investisseurs) comprenne le moteur.

| Public | Document possible | Exemple de contenu |
|--------|-------------------|-------------------|
| **Tech** | Architecture technique | API, flux de données, intégration |
| **Produit** | Fonctionnement métier | Règles cliniques, cas d'usage |
| **Opérations (IDEC)** | Guides pratiques | Arbres de décision, procédures |
| **Investisseurs** | Pitch deck technique | Métriques, différenciation, IP |

**Format** : Documents visuels, imprimables en PDF, vulgarisés.

### 3.4 Automatisation & UX

| Axe | Description | Bénéfice |
|-----|-------------|----------|
| **Pré-mâchage IDEC** | Liste de tâches prioritaires générée automatiquement | Gain de temps opérationnel |
| **Propositions UI** | Hiérarchisation visuelle de l'importance | Expérience utilisateur améliorée |
| **Dashboard CRM** | Vue consolidée des situations à risque | Pilotage efficace |

---

## 4. Bénéfices pour Monka

### 4.1 Ce que vous gagnez

| Bénéfice | Description |
|----------|-------------|
| **Visibilité** | Voir ce que fait vraiment le moteur, pas ce qu'il est censé faire |
| **Détection de failles** | Identifier les incohérences avant qu'elles n'impactent les utilisateurs |
| **Amélioration continue** | Axes concrets pour rendre le produit plus pertinent |
| **Documentation exploitable** | Communication claire entre équipes |
| **Efficacité opérationnelle** | Moins de charge mentale pour les IDEC |
| **Qualité utilisateur** | Expérience aidant plus fluide et rassurante |

### 4.2 Ce qui change pour vous

**Avant** : Vous concevez, vous implémentez, vous testez — tout repose sur votre capacité à tout garder en tête.

**Après** : Vous validez, vous affinez, vous décidez — à partir de propositions structurées et documentées.

---

## 5. Fichiers à inspecter pour approfondir

### 5.1 Racine du repo

| Fichier | Contenu |
|---------|---------|
| `README.md` | Vue d'ensemble du repository et structure |
| `PROPOSITION_PERSONAS_MONKA.md` | Définition complète des 10 personas |
| `REFLEXION_ARCHITECTURE_PERSONAS.md` | Réflexion sur l'impact des personas sur les recommandations |

### 5.2 Dossier AUDIT/

| Fichier | Contenu |
|---------|---------|
| `audit_177_questions.md` | Audit du comptage 177 vs 174 questions |
| `phase2_scan_critiques_vs_ccc.md` | **9 conflits détectés** entre questions critiques et CCC |
| `etat_audit_scoring_legacy.md` | **Incohérences majeures** entre scorantes Legacy et fichiers actuels |
| `coherence_audit.md` | Audit de cohérence global |
| `changements_a_faire.md` | Liste des modifications à effectuer |

### 5.3 Dossier AUTRES/

| Fichier | Contenu |
|---------|---------|
| `REFERENTIEL_ASR.md` | 24 ASR documentées avec règles |
| `REFERENTIEL_PRIORISATION.md` | 3 niveaux de priorité avec déclencheurs |
| `REFERENTIEL_TYPOLOGIE_MICRO_TACHES.md` | 5 types de micro-tâches |
| `RAPPORT_AVANCEMENT_FINAL.md` | État d'avancement global |
| `TODO_REFONTE_PERSONAS.md` | Plan détaillé de la refonte personas |

### 5.4 Dossier LIVRABLES/

| Fichier | Contenu |
|---------|---------|
| `rapport_technique_monka.html` | Rapport technique prêt pour PDF |
| `rapport_technique_monka.pdf` | Version PDF exportée |

---

## 6. Synthèse

> **En 15h, nous avons rendu votre moteur visible et testable.**  
> **Sur une mission étendue, nous pouvons le rendre auditable, personnalisable et optimisable.**

### Ce que nous proposons

1. **Court terme** : Présenter les travaux non encore communiqués (personas, scan CCC, audit scoring)
2. **Moyen terme** : Résoudre les incohérences détectées, structurer la personnalisation
3. **Long terme** : Documentation inter-équipes, automatisation, propositions UI/UX

### Prochaine étape

Un échange pour prioriser les axes selon vos objectifs (produit, levée, recrutement...).

---

*Document préparé par PRAGMA — 05/02/2026*
