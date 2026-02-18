# PRAGMA — Méthodologie de Travail & Garanties Techniques

> **Février 2026 — Confidentiel**

---

## 1. Vos questions sont légitimes

Les sujets que vous soulevez — maintenance, sécurité des données, conformité HDS, gestion des tiers — sont des problématiques structurelles de tout projet technologique. Elles existent pour chaque équipe de développement, chaque application, chaque refonte. C'est sain de se les poser, et c'est la marque d'une équipe technique rigoureuse.

Notre rôle n'est pas de contourner ces sujets. Notre rôle est de vous aider à les traiter **plus vite**, en apportant du temps et de la capacité d'exécution supplémentaire.

---

## 2. L'architecture ne change pas

Voici le schéma standard de toute application web/mobile dans le domaine de la santé :

```
┌─────────────────────────────────────────────────────────────────┐
│                        UTILISATEURS                             │
│                  (IDEC, aidants, équipe Monka)                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (App Mobile / Web)                 │
│                                                                 │
│  Interface utilisateur, navigation, affichage                   │
│  Stack : React / React Native / TypeScript                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Appels API (HTTPS)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND / API                               │
│                                                                 │
│  Logique métier, authentification, autorisations                │
└────────┬───────────────────────────────┬────────────────────────┘
         │                               │
         ▼                               ▼
┌──────────────────────┐    ┌────────────────────────────────────┐
│   BASE DE DONNÉES    │    │         APIS TIERCES               │
│   (Hébergement HDS)  │    │                                    │
│                      │    │  CRM, partenaires, assureurs,      │
│  Données patients,   │    │  institutions, services externes   │
│  aidants, scoring,   │    │                                    │
│  règles métier       │    │  Connecteurs standards (REST/JWT)  │
└──────────────────────┘    └────────────────────────────────────┘
```

Ce schéma est **exactement le même** que celui de votre application actuelle. Il ne change pas en travaillant avec nous. Le frontend communique avec le backend, qui communique avec la base de données HDS et les APIs tierces. C'est le standard de l'industrie.

---

## 3. Le cas spécifique de la base de données HDS

Votre application actuelle est déjà connectée à une base de données hébergée en conformité HDS. En travaillant avec nous, **cette connexion reste strictement identique** :

```
┌─────────────────┐          ┌─────────────────┐
│  App actuelle   │────────► │                 │
│  (votre équipe) │          │   BASE DE       │
└─────────────────┘          │   DONNÉES       │
                             │   HDS           │
┌─────────────────┐          │                 │
│  Nouvelle app   │────────► │  (même infra,   │
│  (avec PRAGMA)  │          │   mêmes règles, │
└─────────────────┘          │   même accès)   │
                             └─────────────────┘
```

Le code que nous écrivons se connecte à la même base de données, avec les mêmes règles d'accès, les mêmes autorisations, la même conformité. L'hébergement HDS, la gestion des accès tiers, les contrats de conformité — tout cela reste sous le contrôle du CTO et ne dépend pas de qui écrit le code applicatif.

---

## 4. Ce qui change vs. ce qui reste identique

```
AVEC VOTRE ÉQUIPE ACTUELLE              AVEC PRAGMA EN RENFORT
                                        
CTO définit l'architecture    ──────►   CTO définit l'architecture
CTO pose les conventions      ──────►   CTO pose les conventions
Développeurs écrivent le code  ──────►   Développeurs écrivent le code
CTO review les Pull Requests   ──────►   CTO review les Pull Requests
CTO approuve et merge          ──────►   CTO approuve et merge
Tests, QA, déploiement         ──────►   Tests, QA, déploiement
                                        
⏱️  12-18 mois                          ⏱️  6-8 semaines
                                        
Le process est identique.               
Seule la vitesse d'exécution change.    
```

Les préoccupations autour de la maintenance, de la sécurité ou des tiers ne sont pas liées à la méthode de développement — elles sont liées à l'architecture et aux choix techniques, qui restent définis par le CTO.

---

## 5. Le rôle du CTO

Le CTO garde l'intégralité de ses responsabilités et de son pouvoir de décision :

**Avant le sprint :**
- Il définit l'architecture cible
- Il pose ses conventions de code (linting, patterns, structure)
- Il identifie les contraintes (HDS, tiers, RGPD)
- Il ouvre une branche de développement sur le repo

**Pendant le sprint :**
- Il reçoit des Pull Requests régulières
- Il review chaque PR
- Il demande des modifications si nécessaire
- Il approuve et merge quand c'est conforme
- Il garde une visibilité complète via l'historique Git

**Après le sprint :**
- Le code est dans son repo, sous son contrôle
- Un dev interne est formé pour la maintenance
- La documentation technique est livrée

Rien ne va en production sans son approbation.

---

## 6. PRAGMA comme force de proposition

Au-delà de l'exécution pure, nous apportons aussi un regard extérieur sur les choix techniques et produit. Pendant le sprint, si nous identifions des alternatives plus performantes, plus simples ou plus adaptées, nous les proposons au CTO — qui décide de les adopter ou non.

C'est un avantage concret de travailler avec nous : nous comprenons le produit en profondeur, ce qui nous permet d'être une vraie force de proposition. Concrètement, cela veut dire que nous facilitons le travail du CTO en lui présentant des choix techniques précis, accompagnés de notre raisonnement et de nos recommandations, pour qu'il ait toutes les données nécessaires pour prendre les meilleures décisions rapidement.

---

## 7. En résumé

| Sujet | Réponse |
|---|---|
| L'architecture change-t-elle ? | Non — frontend, backend, BDD HDS, APIs tierces : schéma identique à l'existant |
| Les données sont-elles impactées ? | Non — même base HDS, mêmes règles d'accès, même conformité |
| Le CTO garde-t-il le contrôle ? | Oui — il définit, review et approuve chaque ligne de code |
| La maintenance est-elle un nouveau sujet ? | Non — c'est un sujet structurel qui existe pour tout projet tech |
| PRAGMA apporte-t-il de la valeur ajoutée ? | Oui — exécution rapide + force de proposition technique et produit |
| Qu'est-ce qui change concrètement ? | Le temps — 6-8 semaines au lieu de 12-18 mois |

Toutes ces questions sont normales et saines. Elles se posent pour chaque projet technologique, avec ou sans nous. Notre objectif est de vous aider à avancer plus vite, en partenaires, dans le cadre que vous définissez.

---

*PRAGMA — Février 2026*
