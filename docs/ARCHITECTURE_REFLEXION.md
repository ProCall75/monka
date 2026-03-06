# ARCHITECTURE RÉFLEXION — Monka Clinical Engine

> **Process** : Workflow `/decision-architecture` appliqué
> **Date** : 4 mars 2026
> **Auteur** : Antonin Rimaud (PRAGMA)
> **Statut** : Réflexion structurée — à valider avant mise à jour de ARCHITECTURE.md

---

## PHASE 1 — Contexte

### 1.1 Contexte entreprise

| Critère | Monka |
|---|---|
| **Type** | Startup health-tech |
| **Stade** | Post-levée, valorisation à plusieurs millions |
| **Secteur** | Santé — aidants familiaux, parcours de soins personnalisés |
| **Produit actuel** | App MyMonka existante avec des vrais patients — version séparée, indépendante de ce repo |
| **Stratégie** | Garder le produit actuel actif pendant qu'on construit le moteur V2 avec PRAGMA, puis les prestataires externes intègrent ce moteur dans la V2 de MyMonka |

### 1.2 Équipe sur ce projet

| Personne | Rôle | Organisation | Intervention |
|---|---|---|---|
| **Antonin Rimaud** | CTO externalisé moteur | PRAGMA | Architecture, code, documentation, standards, audits data |
| **Dr. Monka** | Directeur médical | Monka | Validation clinique, sens clinique, calibration scoring, production contenu |
| **Etienne** | CEO | Monka | Décisions stratégiques, validation macro, interface investisseurs |
| **Maël** | CPO | Monka | Vision produit, roadmap, arbitrages fonctionnels |
| **Sophie** | IDEC (Infirmière de Coordination) | Monka | Utilisatrice métier — teste le moteur, feedback terrain |
| **Marwane** | Lead UI/UX + Frontend proto | PRAGMA | Architecture UI complète, design system, composants, proto interactif, handoff visuel. Détail ci-dessous. |
| **Prestataires externes** | Développeurs | Externe | Implémentent le moteur + la logique DB + le proto dans la V2 de MyMonka |

### Le scope réel de Marwane (sous-estimé si on dit juste "proto")

Marwane ne fait PAS "un proto Figma". Il construit un **système UI complet** qui est un livrable à part entière :

| Livrable Marwane | Description | Volume | Statut |
|---|---|---|---|
| **Architecture UI en 4 couches** | Mapping moteur → composants UI : Vulnérabilité→HeroCard, MP→TaskCard, Reco→RecoCard, MT→MicroTaskItem | 4 couches documentées | ✅ Fait |
| **Design System** | 5 palettes par thème de vie, fond crème, formes arrondies, ombres douces | Système complet | ✅ Fait |
| **Storybook (35 composants)** | Chaque composant UI est isolé, testable, documenté avec ses variantes | 35 stories | ✅ Fait |
| **Mapping Moteur → UI → Copywriting** | Traduction de chaque concept clinique en composant ET en mot bienveillant (jamais de jargon médical visible) | 3 colonnes × toutes les entités | ✅ Fait |
| **Audit UI/UX de l'app actuelle** | 277+ fichiers d'audit, screenshots annotés, identification des 5 problèmes majeurs | Dossier `app-audit/` | ✅ Fait |
| **Plan de présentation** | Démo en 3 actes (Le Constat → Le Mapping → La Preuve) avec QR code et flow tactile | Prêt | ✅ Fait |
| **Itérations UI avec Maël (CPO)** | Propositions proactives de solutions, tests d'affordance, validation des parcours utilisateur | Continu | 🔄 En cours |
| **Documentation handoff UI** | Composants prêts à implémenter, specs visuelles, guide d'intégration pour les prestataires | À formaliser | 🔲 À faire |
| **Logique de sauvegarde / checkpoints** | Système de validation des itérations UI (versionner les décisions visuelles validées) | À définir | 🔲 À faire |

**Pourquoi c'est critique** : Les prestataires externes auront **3 inputs** à assembler :
1. Le **moteur** (code + logique) — livré par Antonin
2. Le **proto** (composants + design system + UX) — livré par Marwane
3. Le **schéma DB** (tables + relations) — livré par le repo

Si le proto n'est pas aussi bien structuré et documenté que le moteur, les prestataires devront improviser côté UI. Et ça, c'est exactement ce qui est arrivé avec la V1 : *"un Ferrari sous le capot mais un volant de Twingo"*.

**Le mapping clé — ce que les prestataires reçoivent de Marwane** :

```
MOTEUR (DB)              →    UI (Composant)           →    MOTS (Copywriting)
─────────────────────         ─────────────────────         ─────────────────────
Vulnérabilité (V1-V5)    →    HeroCard + ThemeSelector  →    "Vos thèmes de vie"
Micro-Parcours (24)      →    TaskCard + ScoreRing(ASR) →    "Votre programme"
Recommandation (202)     →    RecoCard + UrgencyBadge   →    "Vos conseils"
Micro-Tâche (390)        →    MicroTaskItem (cochable)  →    "Action prioritaire 📍"
Score /20 + CCC          →    ⛔ JAMAIS AFFICHÉ          →    (invisible)
```

> **Règle de design** : L'aidant ne doit **jamais** sentir qu'il est un patient. Il est accompagné, pas diagnostiqué. Pas de "CCC", pas de "Score", pas de "Vulnérabilité" visible.

**Relations clés :**
- **PRAGMA ↔ Monka** = partenariat, pas prestation. Co-construction.
- **Antonin → Prestataires** = on fournit le moteur (code), la DB (schéma), la doc normative. Ils intègrent.
- **Marwane → Prestataires** = on fournit le proto (composants, design system, specs visuelles). Ils implémentent.
- **Marwane ↔ Maël (CPO)** = itération continue sur l'UI/UX. Maël valide, Marwane propose.
- **On ne contrôle PAS l'architecture des prestataires** → nos 3 outputs (moteur + proto + DB) doivent être les plus facilement assemblables possible, quelle que soit leur stack.

### Question stratégique : doit-on aligner avec les prestataires en amont ?

| Option | Description | Avantages | Inconvénients |
|---|---|---|---|
| **A. On produit d'abord, ils s'adaptent** | On construit moteur + proto + DB au maximum, puis on leur donne le package | Pas de blocage, on avance vite, pas de compromis sur notre qualité | Risque de friction si leur architecture est fondamentalement différente |
| **B. On leur envoie le contexte d'abord** | On leur donne le schéma DB + l'architecture moteur + le design system en amont, ils nous disent comment ils veulent qu'on adapte | Alignement dès le départ, moins de friction au handoff | On est dépendant de leur timeline, ça peut bloquer notre avancement |
| **C. Hybride** | On leur envoie le contexte (docs + schéma) mais on ne les attend pas pour avancer. On s'adapte aux retours si nécessaire. | Le meilleur des deux mondes | Nécessite une communication proactive |

> **Recommandation : Option C.** On leur donne le document `PREREQUIS_PRESTATAIRES_EXTERNES.md` + le schéma DB + l'architecture moteur dès maintenant. On continue à avancer. S'ils ont des contraintes structurelles, on s'adapte. Mais on ne se bloque pas en les attendant.

### 1.3 Contraintes réglementaires — à challenger

| Contrainte | S'applique à cette app ? | S'applique au moteur ? | Raisonnement |
|---|---|---|---|
| **MDR (EU 2017/745) — Classe IIa** | ❌ Non — cette app est interne, pas un dispositif médical | ✅ Oui — le moteur sera intégré dans MyMonka qui EST un dispositif médical | Le moteur est un **composant** qui sera intégré dans un SaMD. Il doit être développé COMME SI il était certifié, même si cette app interne ne l'est pas. |
| **IEC 62304 Classe B** | ⚠️ Partiellement — le code moteur dans cette app doit respecter IEC 62304 | ✅ Oui — le moteur est le même code qui ira en prod | Le code moteur est le même que celui qui sera en prod. La partie UI/simulateur n'a pas besoin de suivre IEC 62304. |
| **ISO 14971** (risques) | ❌ Non pour l'app | ✅ Oui pour le moteur et la data | Si un scoring est faux → la data est fausse → MyMonka héritera de l'erreur |
| **ISO 13485** (QMS) | ❌ Non pour cette app | ✅ Oui pour les process autour du moteur | Les SOPs et la traçabilité des décisions servent la certification future de MyMonka |
| **RGPD** | ⚠️ Minimal — pas de données patient ici | ✅ Oui pour MyMonka (prestataires) | Ici on manipule de la data clinique de référence (questions, MPs), pas des données patient |
| **HDS** | ❌ Non — pas de données patient dans ce Supabase | ✅ Oui pour le Supabase de MyMonka (prestataires) | Notre DB contient la logique clinique, pas des dossiers patients |

> **Conclusion challenger** : On n'est PAS en train de certifier cette app. On est en train de construire un **composant certifiable** (moteur + data) qui sera intégré dans un produit certifié (MyMonka). La nuance est importante : ça allège les exigences sur l'app/UI, mais ça renforce les exigences sur le moteur et la data.

### 1.4 Contexte projet

| Critère | Réponse |
|---|---|
| **Ce qu'on construit** | Un **moteur clinique certifiable** + une **DB clinique auditée** + un **simulateur interne** pour les tester |
| **Qui utilise cette app** | Équipe Monka interne (Etienne, Maël, Dr. Monka, Sophie) + démonstration de preuve produit auprès de tiers (investisseurs, partenaires, Klésia) |
| **Qui n'utilise PAS cette app** | Les aidants, les patients, les médecins traitants. Eux utilisent MyMonka (l'app séparée). |
| **Durée de vie** | Le **moteur** est permanent (core IP de Monka). L'**app simulateur** est transitoire — elle vit tant qu'on n'a pas de meilleur outil de test. |
| **Maturité** | Moteur M1 fonctionnel, data complète en DB (18 tables), code Next.js fonctionnel, mais documentation non structurée et repo en vrac |
| **L'existant** | ~15 dossiers non structurés à la racine, aucune convention, pas de traçabilité formelle |

### 1.5 Contexte décision

| Critère | Réponse |
|---|---|
| **Décision** | Quelle architecture de repo pour maximiser : (1) la qualité/traçabilité du moteur, (2) la facilité d'intégration par les prestataires externes, (3) la cohérence avec le proto UI/UX de Marwane |
| **Pourquoi maintenant** | (1) Meeting CEO vendredi, (2) prestataires externes arrivent bientôt, (3) le moteur doit être validé avant intégration |
| **Impactés** | Toute l'équipe (cf. 1.2) + les prestataires externes + le proto de Marwane |
| **Réversibilité** | Moyenne — les dossiers sont faciles à renommer, mais les process/templates construits dessus sont coûteux à refaire |
| **Certitude** | Élevée sur les normes (IEC 62304 est indiscutable). Moyenne sur l'organisation (dépend des retours de Monka vendredi). |

---

## PHASE 2 — Options d'architecture

### La question : Comment organiser le repo pour qu'il serve à la fois l'équipe interne, les prestataires externes, et la certification future ?

### Contraintes de design

1. **Les prestataires externes doivent pouvoir extraire les 3 livrables** (moteur + proto + DB) sans comprendre toute la structure interne
2. **Le proto de Marwane** (35 composants, design system, architecture UI 4 couches) a besoin d'un espace structuré avec sa propre documentation et sa logique de checkpoints/itérations
3. **Le moteur + le proto doivent être synchronisés** : le mapping Moteur→UI→Copywriting doit rester cohérent
4. **Dr. Monka** doit savoir où aller pour valider du contenu clinique sans se perdre
5. **Un auditeur** doit pouvoir naviguer dans la doc normative
6. **Le code du moteur** doit être un module isolable — importable dans n'importe quelle codebase
7. **Le proto doit pouvoir évoluer indépendamment** : Marwane itère avec Maël sans bloquer le travail moteur

---

### Option A — Structure plate (fichiers à la racine)

**C'est ce qu'on avait avant.** 15 dossiers en vrac. Aucune convention.

| Critère | Évaluation |
|---|---|
| Intégration prestataires | ❌ Impossible de savoir quoi prendre |
| Lisibilité Dr. Monka | ❌ Noyé dans les fichiers |
| Alignement normes | ❌ |
| Maintenabilité | ❌ |

**Rejeté** — c'est exactement ce qu'on quitte.

---

### Option B — Structure par rôle (CTO/, CPO/, Medical/)

| Critère | Évaluation |
|---|---|
| Intégration prestataires | ❌ Ils cherchent quoi ? Des dossiers de personnes ? |
| Lisibilité Dr. Monka | ⚠️ Il sait où sont SES docs mais pas les docs transverses |
| Alignement normes | ❌ L'auditeur cherche par process, pas par personne |
| Maintenabilité | ❌ Un doc qui concerne 2 rôles = conflit |

**Rejeté** — inadapté aux prestataires et à l'audit.

---

### Option C — Structure par norme (IEC_62304/, ISO_14971/)

| Critère | Évaluation |
|---|---|
| Intégration prestataires | ❌ Ils ne connaissent pas ces normes, ils veulent le moteur |
| Lisibilité Dr. Monka | ❌ Jargon réglementaire incompréhensible |
| Alignement normes | ✅ Parfait pour l'audit... mais on n'audite pas maintenant |
| Maintenabilité | ❌ Seul un expert réglementaire sait où ranger un doc |

**Rejeté** — trop technique, inadapté à l'équipe actuelle.

---

### Option D — Structure hybride fonctionnelle (proposition actuelle)

Séparation par **fonction** avec mapping normatif dans chaque document.

```
monka/
├── .agent/           ← Config agent IA (garde-fous, workflows, skills)
├── app/              ← Simulateur interne (Next.js)
│   └── src/engine/   ← ⭐ Code moteur isolé (4 fichiers clés)
├── docs/             ← Documentation (7-13 docs fondamentaux)
├── moteur/           ← Zone clinique (templates, sprints, referentiel)
├── sops/             ← Procédures opérationnelles (checklists)
├── reviews/          ← Espace review (UI/UX Marwane)
├── assets/           ← Présentations, exports
└── _old/             ← Archive v1
```

| Critère | Évaluation |
|---|---|
| Intégration prestataires | ✅ `app/src/engine/` = le module à intégrer. `docs/` = les specs. DB = le schéma. |
| Lisibilité Dr. Monka | ✅ `moteur/` = son espace. Il sait où aller. |
| Lisibilité Etienne/Maël | ✅ `docs/` = vue d'ensemble. Pas besoin d'aller dans `moteur/` ou `app/`. |
| Alignement normes | ✅ Chaque doc référence sa norme. L'auditeur suit INDEX.md. |
| Proto Marwane | ⚠️ Où met-on le proto ? `reviews/ui-ux/` ? Ou un lien externe ? |
| Maintenabilité | ✅ Tout le monde comprend en 30 secondes |

**Favorisée** — mais questions ouvertes sur le proto et le packaging prestataires.

---

### Option E — Structure orientée "handoff" (OTB — outside the box)

Et si on structurait le repo **du point de vue des prestataires** ?

```
monka/
├── engine/                    ← ⭐ Package moteur autonome
│   ├── src/                   ← Code (clinicalEngine, scoring, activation)
│   ├── types/                 ← Interfaces TypeScript exportées
│   ├── tests/                 ← Tests du moteur
│   ├── README.md              ← "Comment intégrer le moteur"
│   └── package.json           ← Module npm potentiel
│
├── database/                  ← ⭐ Schéma + migrations + seed
│   ├── schema.sql             ← DDL complet
│   ├── seed/                  ← Data de référence
│   ├── migrations/            ← Changelog des modifications
│   └── README.md              ← "Comment reproduire la DB"
│
├── documentation/             ← Tout le reste
│   ├── clinical/              ← Pour Dr. Monka
│   ├── standards/             ← Pour l'auditeur
│   ├── product/               ← Pour Etienne/Maël
│   └── technical/             ← Pour les prestataires
│
├── simulator/                 ← App interne (Next.js)
│   └── ...
│
├── sops/
└── _old/
```

| Critère | Évaluation |
|---|---|
| Intégration prestataires | ✅✅ `engine/` = package prêt à importer. `database/` = Schema prêt à appliquer. Excellent. |
| Lisibilité Dr. Monka | ⚠️ Il doit chercher dans `documentation/clinical/` au lieu d'avoir un `moteur/` évident |
| Alignement normes | ✅ Pareil que Option D si le mapping est dans les docs |
| Proto Marwane | ⚠️ Même question |
| Maintenabilité | ⚠️ Plus de dossiers = plus complexe à la racine |
| Scalabilité | ✅✅ Le moteur comme package npm = excellente scalabilité |

**Intéressante** — le `engine/` comme module isolé est une bonne idée. Mais ça split trop la documentation.

---

### Option F — Hybride avec 3 piliers (moteur + proto + handoff)

Prendre la structure D mais donner à chaque livrable prestataire son **propre espace de première classe** :

```
monka/
├── .agent/               ← Config agent IA (garde-fous, workflows, skills)
│
├── app/                  ← Simulateur interne (Next.js)
│   └── src/
│       └── engine/       ← ⭐ PILIER 1 — Code moteur (ISOLÉ — importable tel quel)
│           ├── clinicalEngine.ts
│           ├── scoringEngine.ts
│           ├── activationEngine.ts
│           ├── contentEngine.ts
│           ├── types.ts          ← Interfaces exportées
│           ├── README.md         ← "Comment intégrer ce moteur"
│           └── *.test.ts
│
├── proto/                ← ⭐ PILIER 2 — Espace UI/UX Marwane
│   ├── README.md         ← Vue d'ensemble du système UI
│   ├── architecture-ui.md ← Mapping 4 couches (Vuln→HeroCard, etc.)
│   ├── design-system.md  ← Palettes, typographie, spacings, ombres
│   ├── copywriting.md    ← Traduction jargon clinique → mots bienveillants
│   ├── composants/       ← Specs par composant (props, variantes, exemples)
│   │   ├── hero-card.md
│   │   ├── task-card.md
│   │   ├── reco-card.md
│   │   └── micro-task-item.md
│   ├── parcours/         ← Flows utilisateur documentés
│   │   ├── flow-dashboard.md
│   │   ├── flow-theme-detail.md
│   │   └── flow-program-detail.md
│   ├── iterations/       ← Checkpoints validés (date + qui a validé)
│   │   ├── v1-audit-app-actuelle/
│   │   ├── v2-design-system/
│   │   └── v3-.../
│   ├── storybook/        ← Exports Storybook ou lien
│   └── assets/           ← Maquettes, screenshots, exports Figma
│
├── docs/                 ← Documentation fondamentale
│   ├── produit.md        ← Vision, destination prévue
│   ├── clinique.md       ← Pipeline clinique
│   ├── technique.md      ← Architecture moteur + DB
│   ├── donnees.md        ← Schéma DB + relations + comptages
│   ├── qualite.md        ← Standards (IEC 62304, ISO 14971)
│   ├── equipe.md         ← Rôles + gouvernance
│   ├── securite.md       ← RLS + protection IP
│   ├── risks.md          ← Analyse de risques (à créer)
│   ├── srs.md            ← Spécifications moteur (à créer)
│   ├── soup.md           ← Composants tiers (à créer)
│   └── validation.md     ← Résultats de tests (à créer)
│
├── moteur/               ← Zone clinique (Dr. Monka + Antonin)
│   ├── _templates/       ← 6 templates de sprint
│   ├── _standards/       ← Conventions, checklist, glossaire
│   ├── referentiel/      ← Sources de vérité cliniques
│   ├── sprints/          ← Validations progressives
│   └── registre-decisions.md
│
├── sops/                 ← Procédures opérationnelles
│
├── handoff/              ← Kit d'intégration prestataires
│   ├── README.md         ← "Les 3 piliers à assembler"
│   ├── schema.sql        ← ⭐ PILIER 3 — DDL exporté de Supabase
│   ├── seed/             ← Data de référence pour les prestataires
│   ├── engine-api.md     ← API du moteur (fonctions, inputs, outputs)
│   ├── ui-specs.md       ← Résumé du proto (lien → proto/)
│   └── exemples/         ← Exemples d'appel du moteur
│
├── assets/               ← Présentations, exports
├── _old/                 ← Archive v1
│
├── ARCHITECTURE.md
└── INDEX.md
```

| Critère | Évaluation |
|---|---|
| Intégration prestataires | ✅✅ `handoff/` = kit des 3 piliers. `engine/` = code. `proto/` = UI. `schema.sql` = DB. |
| Lisibilité Dr. Monka | ✅ `moteur/` = son sanctuaire. |
| Lisibilité Etienne/Maël | ✅ `docs/` = vue d'ensemble. `proto/` = voir le travail visuel. |
| **Lisibilité Marwane** | ✅✅ `proto/` = **son espace dédié** avec iterations, composants, design system, assets. Il peut travailler en autonomie avec Maël. |
| Lisibilité Antonin | ✅ Code dans `app/`, docs dans `docs/`, clinique dans `moteur/`, UI dans `proto/` |
| Sophie (IDEC) | ✅ Elle utilise l'app (simulateur), pas besoin de naviguer le repo |
| Alignement normes | ✅ Chaque doc référence sa norme source |
| Maintenabilité | ✅ 2 dossiers de plus que Option D (`proto/` + `handoff/`), mais chacun résout un problème réel |
| Scalabilité | ✅ Le moteur peut devenir un package npm, le proto peut devenir un Storybook déployé |
| **Sync moteur ↔ proto** | ⚠️ Il faut un process pour s'assurer que le mapping moteur→UI reste cohérent |

---

### Matrice de comparaison finale

| Critère | A (plate) | B (rôle) | C (norme) | D (hybride) | E (handoff) | **F (D+E)** |
|---|---|---|---|---|---|---|
| Intégration prestataires | ❌ | ❌ | ❌ | ✅ | ✅✅ | **✅✅** |
| Lisibilité Dr. Monka | ❌ | ⚠️ | ❌ | ✅ | ⚠️ | **✅** |
| Lisibilité CEO/CPO | ❌ | ⚠️ | ❌ | ✅ | ✅ | **✅** |
| Alignement normes | ❌ | ❌ | ✅ | ✅ | ✅ | **✅** |
| Scalabilité | ❌ | ⚠️ | ⚠️ | ✅ | ✅✅ | **✅✅** |
| Maintenabilité | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | **✅** |
| Coût initial | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | **⚠️** |
| Coût long terme | ❌❌ | ❌ | ✅ | ✅ | ✅ | **✅** |

---

## PHASE 2bis — Architecture de la DB

### Schéma actuel (Supabase — 18 tables live)

```
┌──────────────────────────────────────────────────────────────┐
│                     SUPABASE (PostgreSQL)                     │
│                    RLS activé sur TOUTES les tables           │
│               Projet: mbxeqrvofrmhqlwlefff (eu-west-1)      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────── QUESTIONNAIRE ──────────────────┐  │
│  │                                                        │  │
│  │  questions (165)                                       │  │
│  │  ├── id, question_text, response_type                  │  │
│  │  ├── vulnerability_id → vulnerabilities                │  │
│  │  ├── bloc, sous_bloc, aidance                          │  │
│  │  ├── condition_affichage, is_trigger                   │  │
│  │  └── sens_clinique                                     │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                  │
│              ┌────────────┼──────────────┐                   │
│              ▼            ▼              ▼                   │
│  ┌─── SCORING ────┐  ┌── ACTIVATION ─┐  ┌── MAPPINGS ────┐ │
│  │                │  │               │  │                │ │
│  │ scoring_       │  │ activation_   │  │ question_mp_   │ │
│  │ questions(345) │  │ rules (240)   │  │ mapping (155)  │ │
│  │ ├── question_id│  │ ├── category_id│  │ ├── question_id│ │
│  │ ├── vuln_id    │  │ ├── mp_id     │  │ └── mp_id     │ │
│  │ ├── response   │  │ ├── niveau    │  │                │ │
│  │ └── score(C1C2)│  │ │  (std/ccc/  │  └────────────────┘ │
│  │                │  │ │   critique) │                      │
│  │ scoring_       │  │ ├── condition_│                      │
│  │ thresholds(20) │  │ │  logic(JSON)│                      │
│  │ ├── vuln_id    │  │ └── sens_     │                      │
│  │ ├── level      │  │    clinique   │                      │
│  │ ├── min/max    │  │               │                      │
│  │ └── 4×5V = 20 │  └───────┬───────┘                      │
│  │                │          │                               │
│  └───────┬────────┘          │                               │
│          │                   │                               │
│          ▼                   ▼                               │
│  ┌─── RÉFÉRENTIEL ───────────────────────────────────────┐  │
│  │                                                        │  │
│  │  vulnerabilities (5)    V1-V5 avec poids (weight)      │  │
│  │                                                        │  │
│  │  micro_parcours (24)    MPs rattachés à une V          │  │
│  │  ├── vulnerability_id                                  │  │
│  │  ├── asr_wording, asr_criteres_validation              │  │
│  │  └── signature_a, signature_b                          │  │
│  │                                                        │  │
│  │  categories (73)        Catégories par MP              │  │
│  │  └── mp_id, nom, description, ordre                    │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                  │
│              ┌────────────┼──────────────┐                   │
│              ▼            ▼              ▼                   │
│  ┌─── ACTIONS ───────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  recommendations (202)  Texte chapeau par niveau       │  │
│  │  ├── category_id, mp_id                                │  │
│  │  ├── niveau (std/ccc/critique/prevention)              │  │
│  │  └── wording_utilisateur, wording_idec                 │  │
│  │                                                        │  │
│  │  micro_taches (390)     Actions concrètes              │  │
│  │  ├── category_id, mp_id                                │  │
│  │  ├── wording_std, wording_ccc, wording_crit            │  │
│  │  ├── wording_idec, wording_utilisateur                 │  │
│  │  ├── type (STRUC/SEC/MED/INFO/ORGA)                    │  │
│  │  ├── acteur[] (array), domaine, aidance                │  │
│  │  ├── is_contributive, is_prevention, is_parametric     │  │
│  │  ├── is_action (true=MT-action, false=MT-suivi)        │  │
│  │  └── sens_clinique, contribution_asr                   │  │
│  │                                                        │  │
│  │  guides (42)            Guides step-by-step            │  │
│  │  ├── steps[], contacts[], documents[] (JSONB)          │  │
│  │  ├── domain (R/S/A/F/M), tier (1/2/3)                  │  │
│  │  └── priority (urgent/recommended/optional)            │  │
│  │                                                        │  │
│  │  guide_mt_mapping (61)  Jointure N:N guides ↔ MT       │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─── DOCUMENTATION ─────────────────────────────────────┐  │
│  │                                                        │  │
│  │  content_blocks (450)   Couche doc structurée          │  │
│  │  ├── entity_type (question/mp/rule/vuln/category/      │  │
│  │  │               micro_tache/recommendation/scoring)   │  │
│  │  ├── block_type (sens_clinique/scoring_justification/  │  │
│  │  │              scoring_ponderation/justification_     │  │
│  │  │              questions/justification_categories/    │  │
│  │  │              justification_acteurs/liens_inter_mp/  │  │
│  │  │              matrice_patho_specialiste)             │  │
│  │  └── content (texte libre)                             │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─── TEST ──────────────┐  ┌─── CR MÉDECIN ────────────┐  │
│  │                       │  │                            │  │
│  │  personas (8)         │  │  cr_templates (0)          │  │
│  │  └── profil complet   │  │  └── vide — à remplir     │  │
│  │                       │  │                            │  │
│  │  persona_answers      │  └────────────────────────────┘  │
│  │  (1203)               │                                   │
│  │  └── 8×~150 réponses  │  ┌─── SUIVI ─────────────────┐  │
│  │                       │  │                            │  │
│  └───────────────────────┘  │  suivi_questions (30)      │  │
│                              │  └── questionnaire T+N    │  │
│  ┌─── BACKUP (à sup.) ──┐  └────────────────────────────┘  │
│  │ micro_taches_backup_  │                                   │
│  │ 20260221 (369)        │                                   │
│  └───────────────────────┘                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Interconnexion — Les 3 piliers pour les prestataires

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              CE REPO (monka/)                           │
│                                                                        │
│  ┌──── docs/ ─────┐  ┌──── moteur/ ────┐  ┌──── sops/ ────┐          │
│  │ Specs + normes  │  │ Validation      │  │ Procédures    │          │
│  │ Risques         │  │ clinique        │  │ sécurité data │          │
│  │ Standards       │  │ Sprints signés  │  │               │          │
│  └───────┬─────────┘  └───────┬─────────┘  └───────────────┘          │
│          │ documente          │ valide                                 │
│          ▼                    ▼                                        │
│  ╔══════════════════════════════════════════════════════════════════╗  │
│  ║              LES 3 PILIERS LIVRABLES PRESTATAIRES               ║  │
│  ╠═══════════════╦═══════════════════╦═════════════════════════════╣  │
│  ║               ║                   ║                             ║  │
│  ║  PILIER 1     ║  PILIER 2         ║  PILIER 3                  ║  │
│  ║  MOTEUR       ║  PROTO            ║  BASE DE DONNÉES           ║  │
│  ║  (Antonin)    ║  (Marwane)        ║  (Shared)                  ║  │
│  ║               ║                   ║                             ║  │
│  ║  app/src/     ║  proto/           ║  handoff/schema.sql        ║  │
│  ║  engine/      ║  ├── archi-ui     ║  + handoff/seed/           ║  │
│  ║  ├── clinical ║  ├── design-sys   ║                             ║  │
│  ║  ├── scoring  ║  ├── composants/  ║  18 tables                 ║  │
│  ║  ├── activat° ║  ├── parcours/    ║  ├── questions (165)       ║  │
│  ║  ├── content  ║  ├── copywriting  ║  ├── scoring (345+20)      ║  │
│  ║  ├── types    ║  ├── storybook    ║  ├── rules (240)           ║  │
│  ║  └── tests    ║  ├── iterations/  ║  ├── MPs/categories (24+73)║  │
│  ║               ║  └── assets/      ║  ├── recos (202)           ║  │
│  ║  "Comment le  ║                   ║  ├── MTs (390)             ║  │
│  ║   moteur      ║  "Comment ça      ║  ├── guides (42)           ║  │
│  ║   calcule"    ║   doit se voir"   ║  └── content_blocks (450)  ║  │
│  ║               ║                   ║                             ║  │
│  ╚═══════════════╩═══════════════════╩═════════════════════════════╝  │
│          │                    │                    │                   │
│          │ Le moteur          │ Le proto           │ Le schéma         │
│          │ LIT la DB          │ AFFICHE la DB      │ STRUCTURE la DB   │
│          └────────────────────┼────────────────────┘                   │
│                               │                                        │
│                    ┌──────────▼───────────┐                           │
│                    │    SUPABASE          │                           │
│                    │    (PostgreSQL)      │                           │
│                    │    RLS activé        │                           │
│                    │    eu-west-1         │                           │
│                    └──────────────────────┘                           │
│                                                                        │
│  ┌──── handoff/ ──────────────────────────────────────────────┐       │
│  │  README.md     ← "Les 3 piliers à assembler"                │       │
│  │  schema.sql    ← DDL complet                                │       │
│  │  seed/         ← Data de référence                          │       │
│  │  engine-api.md ← API moteur (→ app/src/engine/)             │       │
│  │  ui-specs.md   ← Résumé proto (→ proto/)                    │       │
│  │  exemples/     ← Exemples d'appel moteur                    │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                        │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │
                               │ "Assemblez ces 3 piliers
                               │  dans votre codebase"
                               ▼
              ┌──────────────────────────────────────┐
              │        PRESTATAIRES EXTERNES          │
              │                                      │
              │  Leur codebase (stack inconnue)       │
              │  ┌──────────────────────────────────┐ │
              │  │ PILIER 1 → Intègrent engine/     │ │
              │  │ PILIER 2 → Implémentent proto/   │ │
              │  │ PILIER 3 → Reproduisent schema   │ │
              │  │ + Ajoutent : auth, HDS, patients, │ │
              │  │   RGPD, cybersécurité, monitoring │ │
              │  └──────────────────────────────────┘ │
              │                                      │
              │  = MyMonka V2 (production)            │
              └──────────────────────────────────────┘
```

**Le point clé** : le mapping entre les 3 piliers est critique :

```
DB (Pilier 3)                Moteur (Pilier 1)           Proto (Pilier 2)
─────────────                ─────────────────           ────────────────
questions (165)         →    questionnaireEngine    →    Écran questionnaire
scoring_questions (345) →    scoringEngine          →    (invisible — score jamais affiché)
vulnerabilities (5)     →    scoringEngine          →    HeroCard (thèmes de vie)
micro_parcours (24)     →    activationEngine       →    TaskCard (programmes)
categories (73)         →    activationEngine       →    Sections dans TaskCard
activation_rules (240)  →    activationEngine       →    (invisible — logique interne)
recommendations (202)   →    contentEngine           →    RecoCard (conseils)
micro_taches (390)      →    contentEngine           →    MicroTaskItem (actions)
guides (42)             →    contentEngine           →    Guide step-by-step
content_blocks (450)    →    contentEngine           →    Tooltips / explications
```

> **Si un des 3 piliers change, les 2 autres doivent être vérifiés.** Par exemple : si Antonin ajoute une table en DB → le moteur doit la consommer → le proto doit l'afficher.

**Principes de vérité :**

| Source de vérité | Quoi | Responsable | Pour qui |
|---|---|---|---|
| **Supabase (DB)** | Data clinique de référence | Antonin + Dr. Monka | Moteur + proto + prestataires |
| **app/src/engine/** | Logique de calcul | Antonin | Proto + prestataires |
| **proto/** | Architecture UI + composants + design system | Marwane + Maël | Prestataires |
| **moteur/** | Validation clinique (sprints, fiches, registre) | Dr. Monka + Antonin | Auditeurs |
| **docs/** | Documentation normative | Antonin | CEO + auditeurs + prestataires |
| **handoff/** | Kit d'intégration | Antonin + Marwane | Prestataires |

---

## PHASE 3 — Blind Spots

### 3.1 Questions de vérification

- [x] **Est-ce que j'ai bien compris ?** — App interne, moteur et data sont certifiables, les prestataires prennent le moteur+DB+proto et construisent MyMonka V2. ✅
- [x] **Valide dans 12 mois ?** — Oui. Le moteur évolue (M1→M3) mais la structure reste. Les prestataires changent potentiellement mais le handoff/ reste le même. ✅
- [x] **Nouvel arrivant en 6 mois ?** — Oui avec INDEX.md et le README de `handoff/`. ✅
- [x] **Qu'est-ce qui peut mal tourner ?** — Voir risques ci-dessous. ⚠️
- [x] **Solution la plus simple ?** — Option F ajoute 1 dossier (`handoff/`) vs Option D. Le gain (facilité prestataires) justifie le coût. ✅
- [x] **Sur-ingéniering ?** — Possible sur les SOPs pour une équipe de 3. Mitigation : les garder en checklists. ⚠️
- [x] **Sous-ingéniering ?** — Le moteur n'est PAS encore un package npm isolé. OK pour maintenant, mais ça sera une prochaine étape. ⚠️
- [x] **Un auditeur comprendrait ?** — Oui si on lui donne INDEX.md + mapping normatif. ✅

### 3.2 Points non considérés

| Point | Impact | Action |
|---|---|---|
| **Comment les prestataires accèdent à la DB ?** | Ils auront leur propre Supabase. On leur fournit le schema.sql + seed data. | `handoff/schema.sql` + `handoff/seed/` |
| **Versioning des données cliniques** | Si on modifie un seuil en DB, Git ne le track pas | → Changelog dans `moteur/` + snapshots avant chaque modification (SOP-001) |
| **La table backup traîne en prod** | `micro_taches_backup_20260221` pollue le schéma | → À supprimer après validation |
| **cr_templates est vide** | 0 rows — pas bloquant maintenant | → Sprint 3 |
| **Pas de table audit_log** | Les modifications en base ne sont pas trackées automatiquement | → Pas nécessaire pour l'interne. Les prestataires devront en créer une pour MyMonka. |
| **content_blocks à 8 block_types** | Bien documenté ? Les check contraints ont évolué depuis la création | → Audit Sprint 0 |
| **Sync moteur ↔ proto quand la DB change** | Si on ajoute un champ en DB, le moteur doit le consommer ET le proto doit le rendre | → Process de sync : toute modif DB → vérifier les 2 piliers |
| **Logique de checkpoints UI de Marwane** | Comment valider/versionner les itérations UI ? Quand Maël dit "OK" sur un parcours, comment on le verrouille ? | → `proto/iterations/` avec date + contenu + signature Maël |
| **Démo commerciale intégrée** | L'app pourrait servir de démo de luxe commerciale (mode "skip" avec utilisateur test + fausses données dans la vraie app). Est-ce qu'on la pousse à ce niveau ? | → Question stratégique à valider avec Etienne vendredi |
| **Faut-il attendre les prestataires pour construire ?** | Ils auront peut-être des contraintes sur la structure du code ou de la DB qui impacteraient notre travail | → Recommandation : Option C (hybride) — on leur envoie le contexte mais on n'attend pas leurs retours pour avancer |
| **Normes UI pour IEC 62366 (usability)** | Le proto de Marwane doit-il suivre IEC 62366 (usability engineering) ? Risques liés à l'usage ? | → Au minimum documenter les choix d'affordance dans `proto/` pour que les prestataires + auditeurs comprennent |

### 3.3 Risques

| Risque | Proba | Impact | Mitigation |
|---|---|---|---|
| Les prestataires ne comprennent pas les 3 piliers | Moyen | Élevé | `handoff/README.md` = guide clair + meeting de transfert |
| **Le proto diverge du moteur** (composant UI ne correspond plus à la data) | Moyen | **Critique** | Process de sync : toute modif DB → vérifier moteur + proto. Mapping DB→Moteur→Proto maintenu à jour. |
| **Marwane n'a pas la même rigueur doc que le moteur** | Moyen | Élevé | `proto/` structuré avec README, composants, iterations = même standard |
| Dr. Monka ne suit pas les SOPs (trop lourdes) | Moyen | Moyen | SOPs = checklists légères, pas des process lourds |
| Les docs deviennent obsolètes | Moyen | Moyen | Checklist qualité sprint (Q10) vérifie INDEX.md |
| Le moteur n'est pas assez isolé pour les prestataires | Faible | Élevé | `app/src/engine/README.md` + si nécessaire, package npm. |
| **Le proto n'est pas assez documenté pour les prestataires** | Moyen | Élevé | Chaque composant dans `proto/composants/` a : props, variantes, exemples visuels |
| **Les prestataires imposent une architecture incompatible** | Faible | Élevé | On leur envoie le contexte en amont (Recommandation C). Mais notre code est indépendant — ils s'adaptent à nous, pas l'inverse. |

---

## PHASE 4 — Décision

### Pourquoi les templates ?

| Template | Pourquoi ce format | Standard aligné |
|---|---|---|
| **TPL-01 Audit Data** | Format audit standard : "ce que j'attends vs ce que j'ai". L'auditeur veut voir ça pour la configuration management. | IEC 62304 §8 |
| **TPL-02 Scoring** | 1 fiche par V = validation complète du scoring. Format inspiré des Design Verification Reports. | IEC 62304 §5.7 |
| **TPL-03 Validation MP** | 6 étapes séquentielles couvrant quoi/quand/comment/qui/wording/cohérence. Inspiré des Design Reviews. | ISO 13485 §7.3.5 |
| **TPL-04 Stress Test** | Input → output attendu → comparaison. Format standard de Software System Testing. | IEC 62304 §5.7 |
| **TPL-05 Décision** | Format ADR (Architecture Decision Record). Standard de l'industrie tech — pas spécifique santé. | ISO 13485 §4.2.4 |
| **TPL-06 Sprint Report** | Bilan périodique avec preuves et signatures. Inspiré des Management Reviews. | ISO 13485 §5.6 |

> **Point important** : Il n'y a **pas** de format officiel imposé par IEC 62304 ou ISO 13485. Les normes disent **quoi** documenter, pas **comment**. Nos templates sont la façon la plus pratique de couvrir les exigences. Un auditeur vérifiera que le contenu est là, pas que le template est un copié-collé d'un modèle ISO.

> **Est-ce la méthode la plus pratique ?** — Pour une équipe de 3 personnes, oui. Des templates Markdown dans Git sont le format le plus simple qui satisfait les exigences. Les alternatives (Jira, Confluence, outil QMS dédié) ajoutent de la complexité sans valeur ajoutée à ce stade. On pourra migrer vers un outil QMS quand l'équipe grandira.

### Décision formelle

```
DÉCISION : Option F — Architecture 3 piliers (moteur + proto + DB) + handoff
CONTEXTE : Startup health-tech post-levée. Moteur certifiable + Proto UI
           complet. Prestataires externes pour MyMonka. 
           3 livrables distincts à assembler.
RAISON PRINCIPALE : Seule option qui donne à CHAQUE livrable prestataire 
                    (moteur, proto, DB) un espace de première classe.
RAISONS SECONDAIRES :
  1. proto/ = Marwane a son espace dédié au même niveau que moteur/
  2. handoff/ unifie les 3 piliers dans un kit d'intégration
  3. Le mapping DB→Moteur→Proto est documenté et maintenable
  4. Compatible avec évolution (package npm, Storybook déployé)
  5. Chaque acteur a son espace : Dr. Monka → moteur/, 
     Marwane → proto/, Etienne → docs/, prestataires → handoff/
OPTIONS REJETÉES :
  - A (plate) → ce qu'on avait, ingérable
  - B (par rôle) → inadapté aux prestataires et à l'audit
  - C (par norme) → incompréhensible pour l'équipe
  - D (hybride simple) → ne donne pas assez d'espace au proto ni au handoff
  - E (orientée handoff) → trop fragmentée pour Dr. Monka
RÉVERSIBILITÉ : Facile — Markdown dans Git = portable vers n'importe quoi
QUESTIONS OUVERTES :
  - Démo de luxe commerciale ? (À valider avec Etienne vendredi)
  - Alignement amont avec prestataires ? (Recommandation : Option C hybride)
PROCHAINE ÉTAPE : Valider cette réflexion → Créer proto/ et handoff/ → 
                  Mettre à jour ARCHITECTURE.md
```

---

## PHASE 5 — Résumé des choix

| Choix | Pourquoi | Alternatives évaluées |
|---|---|---|
| **Architecture 3 piliers** (moteur + proto + DB) | Chaque livrable prestataire a son espace dédié et documenté | Structure plate, par rôle, par norme, hybride simple |
| **`proto/` au même niveau que `moteur/`** | Le travail UI de Marwane est un livrable aussi critique que le moteur. Le sous-estimer = refaire la V1 ("Ferrari sous le capot, volant de Twingo") | Sous-dossier dans reviews/ (sous-dimensionné), dans app/ (confond code et specs) |
| **Moteur isolé dans `app/src/engine/`** | Importable tel quel par les prestataires | Module npm séparé (prématuré mais envisageable en M2) |
| **`handoff/` comme kit prestataires** | Unifie les 3 piliers dans un package clair | Tout dans docs/ (confus pour les prestataires) |
| **Mapping DB→Moteur→Proto maintenu** | C'est le lien critique entre les 3 piliers. Si ça casse, tout diverge. | Pas de mapping (ingérable), mapping dans 1 seul doc (pas assez distribué) |
| **Templates Markdown** | Git-versionnable, portable, pas de vendor lock-in | Google Docs, Notion, outil QMS |
| **SOPs en checklists** | Assez rigoureux pour l'audit, assez léger pour être suivi | Process ISO complets (trop lourd) |
| **Supabase = source de vérité data** | PostgreSQL + RLS + API auto + EU. En place et fonctionnel. | SQLite, Firebase, fichiers JSON |
| **`proto/iterations/` pour versionner les choix UI** | Les décisions visuelles doivent être tracées et verrouillées tout comme les décisions cliniques | Pas de versioning (on perd les itérations) |
| **Kebab-case** | Cross-platform, lisible, cohérent avec Daily v2 | SCREAMING_CASE (ancien), PascalCase |

---

*Document de réflexion architecturale — Process `/decision-architecture` appliqué — 4 mars 2026*
*À valider avant mise à jour de ARCHITECTURE.md*
