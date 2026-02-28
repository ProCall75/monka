# 🔬 Analyse du Code Engine — Guide pour le Meeting CTO

> **But :** Comprendre chaque fichier du moteur pour pouvoir l'expliquer au CTO en meeting.
> **Localisation :** `APP/src/engine/` (16 fichiers) + `APP/src/clinical/` (4 fichiers)

---

## 📁 ARCHITECTURE DU CODE

```
src/engine/                     ← LE CŒUR DU MOTEUR (logique pure)
├── clinicalEngine.ts           ← 🔴 L'ALGORITHME PRINCIPAL
├── engineHealthScore.ts        ← Score de santé du moteur (auto-diagnostic)
├── integrityChecks.ts          ← Vérification de cohérence des données
├── types.ts                    ← Définitions de types TypeScript
├── dbTypes.ts                  ← Types miroirs de la DB (15 tables)
├── queries.ts                  ← Récupération des données depuis Supabase
├── helpers.ts                  ← Fonctions d'accès aux données dérivées  
├── supabaseData.ts             ← Point d'entrée centralisé (re-export)
├── constants.ts                ← Métadonnées des 5 vulnérabilités
├── crMedecinPhrases.ts         ← Phrases pour le Compte Rendu Médecin
├── useMonkaData.ts             ← Hook React pour charger les données
├── clinicalEngine.test.ts      ← Tests du moteur
├── engineHealthScore.test.ts   ← Tests du score de santé
├── integrityChecks.test.ts     ← Tests de cohérence
└── hooks/
    └── useVulnStats.ts         ← Hook React pour les stats par vulnérabilité

src/clinical/                   ← HOOKS REACT (connecteurs moteur ↔ UI)
├── hooks/
│   ├── index.ts                ← Export centralisé
│   ├── useCR.ts                ← Hook pour le Compte Rendu Médecin
│   ├── useEvaluation.ts        ← Hook pour l'évaluation complète
│   └── useScoring.ts           ← Hook pour le scoring en temps réel
```

---

## 📄 EXPLICATION DE CHAQUE FICHIER

### 🔴 1. `clinicalEngine.ts` — L'ALGORITHME (320 lignes)

**C'est quoi :** Le cerveau du moteur. C'est ici que tout se passe.

**Ce qu'il fait :**
1. **Évalue les conditions** — prend une réponse à une question et vérifie si elle matche une règle (9 opérateurs : `eq`, `neq`, `in`, `nin`, `gte`, `contains`, `count_gte`, `has_any`)
2. **Évalue les règles d'activation** — toutes les conditions d'une règle doivent être vraies (logique AND)
3. **Active les catégories** — si une règle fire → la catégorie de reco s'active au bon niveau (standard/CCC/critique), avec englobement K3 (seul le niveau le plus haut s'affiche)
4. **Calcule les scores** — somme des coefficients par vulnérabilité (indépendant des activations, règle K13)
5. **Produit un `EngineOutput`** — catégories activées + MP activés + scores + score total

**Les fonctions clés :**

| Fonction | Rôle | Analogie simple |
|----------|------|-----------------|
| `evaluateCondition()` | Vérifie si UNE condition est remplie | "Est-ce que la réponse à cette question correspond ?" |
| `evaluateRule()` | Vérifie si TOUTES les conditions d'une règle sont remplies (AND) | "Est-ce que TOUTES les cases sont cochées ?" |
| `getActivatedCategories()` | Parcourt TOUTES les 235 règles et retourne les catégories activées | "Quels axes d'action sont déclenchés pour cet aidant ?" |
| `computeScore()` | Calcule le score (0-max) pour une vulnérabilité | "À quel point cet aidant est impacté sur ce domaine ?" |
| `runEngine()` | Point d'entrée principal — exécute tout le pipeline | "Lance le moteur et retourne les résultats" |

**Ce qu'on dit au CTO :**
> *"Ce fichier est le cœur du moteur. Il prend les réponses de l'aidant, évalue les 235 règles d'activation, active les bonnes catégories au bon niveau, et calcule les scores. C'est du TypeScript pur — zéro dépendance React. Ce fichier peut être extrait tel quel et intégré dans n'importe quel projet."*

---

### 2. `engineHealthScore.ts` — L'auto-diagnostic du moteur (156 lignes)

**C'est quoi :** Un système qui mesure la "santé" du moteur lui-même — est-ce que le Kernel est complet et cohérent ?

**Les 6 métriques (score /100) :**

| Métrique | Poids | Ce qu'elle vérifie |
|----------|:-----:|-------------------|
| Couverture questions | 25% | % des questions référencées dans au moins 1 règle |
| Équilibre niveaux | 20% | % des MP avec des règles aux 3 niveaux (std/CCC/crit) |
| Complétude wording | 20% | % des MT avec les 3 versions de texte (std/CCC/crit) |
| Couverture scoring | 15% | % des questions non-trigger avec au moins 1 entrée scoring |
| Complétude acteurs | 10% | % des MT avec au moins 1 acteur assigné |
| Intégrité FK | 10% | Tous les liens entre tables sont valides |

**Ce qu'on dit au CTO :**
> *"On a construit un système d'auto-diagnostic qui nous donne un score de santé sur 100 avec un grade (A/B/C/D/F). C'est notre façon de garantir que le Kernel est complet avant de le livrer. C'est un outil de QA intégré."*

---

### 3. `integrityChecks.ts` — Vérification de cohérence (139 lignes)

**C'est quoi :** 6 checks automatiques qui vérifient que toutes les données sont cohérentes entre elles.

**Les 6 checks :**

| Check | Ce qu'il vérifie |
|-------|-----------------|
| C1 — FK Integrity | Tous les liens entre tables sont valides (catégories→MP, règles→catégories, etc.) |
| C2 — MP Completeness | Chaque MP a au moins 1 catégorie, 1 règle, 1 reco, 1 MT |
| C3 — Reco Wordings | Chaque reco a le wording IDEC ET utilisateur non-vide |
| C4 — Scoring Orphans | Pas de coefficients de scoring orphelins (sans question associée) |
| C5 — MT Actors | Chaque MT a au moins 1 acteur assigné |
| C6 — Content Blocks | Les blocs de contenu couvrent tous les types d'entité |

**Ce qu'on dit au CTO :**
> *"C'est notre filet de sécurité. À chaque modification du Kernel, ces 6 checks tournent automatiquement et nous disent si on a cassé quelque chose. C'est l'équivalent d'un test d'intégrité de base de données."*

---

### 4. `types.ts` — Définitions de types (57 lignes)

**C'est quoi :** Toutes les définitions TypeScript du domaine métier.

**Types clés :** `VulnerabilityId` (V1-V5), `TaskType` (STRUC/SEC/MED/INFO/ORGA), `NiveauActivation` (standard/CCC/critique), `Domaine` (medical/medico_social)

**Ce qu'on dit au CTO :**
> *"Nos types TypeScript reflètent exactement le vocabulaire métier du Dr. Monka. Le compilateur empêche les erreurs — impossible de mettre un niveau 'moyen' là où seuls standard/CCC/critique sont acceptés."*

---

### 5. `dbTypes.ts` — Les 15 tables de la DB (125 lignes)

**C'est quoi :** Le miroir exact du schéma Supabase en TypeScript. 15 interfaces = 15 tables.

**Les tables :**

| Table | Rôle | Volume |
|-------|------|--------|
| `vulnerabilities` | Les 5 domaines de risque | 5 |
| `questions` | Le questionnaire (130 socle + 20 activables + 15 triggers) | 165 |
| `micro_parcours` | Les 24 sous-thèmes cliniques | 24 |
| `question_mp_mapping` | Liens question ↔ MP | 155 |
| `categories` | Catégories de reco par MP | 73 |
| `activation_rules` | Règles SI/ALORS | 235 |
| `scoring_questions` | Coefficients de scoring | 321 |
| `scoring_thresholds` | Seuils faible/modéré/élevé/critique | 20 |
| `recommendations` | Conseils à l'aidant (double wording) | 198 |
| `micro_taches` | Actions concrètes | 369 |
| `suivi_questions` | Questions de suivi dans le temps | 30 |
| `content_blocks` | Blocs de contenu éditorial | variable |
| `cr_templates` | Templates Compte Rendu Médecin | variable |
| `personas` | Profils de test (aidants fictifs) | variable |
| `persona_answers` | Réponses de test par persona | variable |

**Ce qu'on dit au CTO :**
> *"C'est le schéma de données complet — 15 tables, tout typé en TypeScript. Ce schéma est la source de vérité : la même structure peut être migrée vers n'importe quelle base PostgreSQL, y compris votre infra HDS."*

---

### 6. `queries.ts` — Récupération des données (90 lignes)

**C'est quoi :** Les requêtes Supabase qui chargent toutes les données en parallèle, avec cache.

**Ce qu'on dit au CTO :**
> *"Ce fichier ne sera PAS dans l'app de prod — il est lié à Supabase qui est notre outil de prototypage. Dans MyMonka V2, il sera remplacé par les queries vers votre DB HDS, selon votre ORM/API."*

---

### 7. `helpers.ts` — Fonctions d'accès aux données (196 lignes)

**C'est quoi :** Des fonctions utilitaires pour naviguer dans les données : `getCategoriesForMP()`, `getRulesForVuln()`, `getMTsForCategory()`, etc.

**Aussi inclus :** Le modèle conditionnel (quelles questions montrer selon le profil aidant).

**Ce qu'on dit au CTO :**
> *"Ce sont des helpers réutilisables à 100%. Ils sont indépendants de Supabase — ils prennent un objet MonkaData et retournent les données filtrées. Transférables tels quels."*

---

### 8. `supabaseData.ts` — Point d'entrée centralisé (40 lignes)

**C'est quoi :** Un barrel file qui re-exporte tout depuis `dbTypes`, `queries` et `helpers`. Permet aux autres fichiers d'importer depuis un seul endroit.

---

### 9. `constants.ts` — Métadonnées des 5V (83 lignes)

**C'est quoi :** Nom, description, couleur, icône de chaque vulnérabilité. Seul fichier avec une dépendance React (icônes Lucide) — à adapter pour la prod.

---

### 10. `crMedecinPhrases.ts` — Phrases CR Médecin

**C'est quoi :** Les phrases templates utilisées pour générer le Compte Rendu Médecin (document professionnel pour l'IDEC).

---

### 11-16. Hooks React (`useMonkaData.ts`, `clinical/hooks/`)

**C'est quoi :** Les connecteurs entre le moteur pur et l'interface React. Ils appellent le moteur et fournissent les résultats aux composants.

**Ce qu'on dit au CTO :**
> *"Les hooks sont spécifiques au Simulateur. Pour MyMonka V2, ils seront réécrits selon l'architecture frontend que vous choisirez (React Native, Next.js, ou autre). La logique qu'ils appellent (le moteur) reste la même."*

---

## 🔄 COMMENT INTÉGRER DANS MYMONKA V2

### Ce qui est transférable directement

| Fichier | Transférable ? | Action |
|---------|:-:|--------|
| `clinicalEngine.ts` | ✅ **OUI** | Copier tel quel → c'est du TS pur |
| `engineHealthScore.ts` | ✅ **OUI** | Copier → outil de QA intégré |
| `integrityChecks.ts` | ✅ **OUI** | Copier → filet de sécurité |
| `types.ts` | ✅ **OUI** | Copier → types métier |
| `dbTypes.ts` | ✅ **OUI** | Copier → adapter les noms si besoin |
| `helpers.ts` | ✅ **OUI** | Copier → helpers indépendants de la source de données |
| `constants.ts` | 🟡 **Adapter** | Retirer les imports Lucide React, garder les données |
| `crMedecinPhrases.ts` | ✅ **OUI** | Copier si le CR Médecin est dans le scope |
| `queries.ts` | ❌ **NON** | Remplacer par les queries vers la DB HDS |
| `supabaseData.ts` | ❌ **NON** | Barrel file — recréer selon la nouvelle structure |
| `useMonkaData.ts` | ❌ **NON** | Hook React → réécrire selon la stack V2 |
| `clinical/hooks/*` | ❌ **NON** | Hooks React → réécrire selon la stack V2 |
| `*.test.ts` | 🟡 **Adapter** | Garder la logique de test, adapter les imports |

### Intégration dans MyMonka V2 — Architecture proposée

```
mymonka-v2/
├── packages/
│   └── clinical-engine/          ← MODULE EXTRAIT
│       ├── clinicalEngine.ts     ← L'algorithme (copié tel quel)
│       ├── engineHealthScore.ts  ← Auto-diagnostic
│       ├── integrityChecks.ts    ← Vérification cohérence
│       ├── types.ts              ← Types métier
│       ├── dbTypes.ts            ← Types DB
│       ├── helpers.ts            ← Fonctions utilitaires
│       ├── constants.ts          ← Métadonnées V1-V5 (sans React)
│       └── index.ts              ← Export public : runEngine, computeScore, etc.
│
├── apps/
│   ├── mobile/                   ← APP AIDANT (MyMonka)
│   │   ├── src/
│   │   │   ├── hooks/            ← Nouveaux hooks adaptés à la stack mobile
│   │   │   ├── screens/          ← Écrans (questionnaire, dashboard, parcours)
│   │   │   └── api/              ← Connexion DB HDS
│   │   └── ...
│   │
│   └── crm/                      ← CRM LIFELINE (IDEC)
│       ├── src/
│       │   ├── hooks/            ← Hooks pro (vue dossier, dispatch)
│       │   ├── pages/            ← Pages CRM
│       │   └── api/              ← Même DB HDS, permissions différentes
│       └── ...
```

### Options DB selon le type de données

| Données | HDS obligatoire ? | Recommandation |
|---------|:-:|----------------|
| Réponses questionnaire (données patient) | ✅ OUI | DB HDS existante de Monka |
| Résultats scoring + activations | ✅ OUI | DB HDS |
| Micro-tâches complétées par l'aidant | ✅ OUI | DB HDS |
| Règles du moteur (logique clinique) | ❌ NON | Peut rester sur Supabase ou aller en HDS |
| Personas de test | ❌ NON | Supabase (outil interne) |
| Content blocks (éditorial) | ❌ NON | Supabase ou CMS |
| Données CRM (dossiers pros) | ✅ OUI | DB HDS |

**Principe clé :** Toute donnée liée à un patient/aidant identifiable → HDS. La logique du moteur (règles, MP, recos) → pas de données personnelles → flexible.

### Intégration CRM Lifeline

Le CRM utilise le **même moteur** mais avec des permissions différentes :

| App MyMonka (Aidant) | CRM Lifeline (IDEC) |
|---------------------|---------------------|
| Voit ses propres données uniquement | Voit les dossiers de ses bénéficiaires |
| Wording "utilisateur" (bienveillant) | Wording "IDEC" (directif professionnel) |
| Coche ses micro-tâches | Pilote les micro-tâches + assigne |
| Voit son score de progression | Voit les scores + CR Médecin |
| Pas de dispatch | Gate-keeper du dispatch Care Manager |

**Architecture :** Le moteur est partagé (`clinical-engine/`), seuls les hooks et l'UI sont différents.

---

## 📊 RÉCAPITULATIF POUR LE CTO

| Fait | Détail |
|------|--------|
| **Moteur fonctionnel** | 320 lignes d'algorithme pur TS, 9 opérateurs, logique AND complète |
| **Typé strictement** | 15 interfaces DB, types métier alignés sur la clinique |
| **Auto-diagnostic** | Score de santé /100 avec grade A/B/C/D/F |
| **Intégrité vérifiée** | 6 checks automatiques, rapport structuré |
| **Transférable** | 7 fichiers copiables tels quels, 0 refacto nécessaire |
| **Séparation clean** | Moteur = TypeScript pur, 0 dépendance React |
| **Données Monka** | Questions et MP fournis par Monka — PRAGMA a tout lié (règles, scoring, catégories, MT, acteurs) |
| **Documenté** | Kernel V5 (21 règles), PRD (37K), CONTEXT (18K) |

---

*Préparé le 28 février 2026 — guide pour la navigation de code pendant le meeting CTO.*
