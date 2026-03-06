# CONTEXTE — Collaboration PRAGMA × Monka

> **Document de référence** — Tout le contexte nécessaire pour comprendre le projet, les acteurs, les dynamiques, et les objectifs.
> **MAJ** : 4 mars 2026
> **Auteur** : Antonin Rimaud (PRAGMA)

> [!IMPORTANT]
> **Objectif stratégique n°1** : Atteindre le plus rapidement possible une documentation et une base technique aux **standards requis pour les ambitions nationales** (DNM, Article 51, scoring certifié, prescription médicale) **et internationales à terme** de Monka. Chaque document, chaque justification, chaque choix structurel doit être pensé et écrit pour résister à un audit externe — pas pour être refait 17 fois sur le tas avant la certification. On investit en rigueur MAINTENANT pour ne PAS payer la dette technique/documentaire PLUS TARD. C'est la philosophie qui guide TOUT ce qu'on fait.

---

## 1. Les organisations

### PRAGMA Studio

- **Statut** : Studio de consulting tech externalisé
- **Fondateurs** : Antonin Rimaud (substance/rigueur technique) + Marwane El Moutribi (style/créatif UI/UX)
- **Méthode** : IA-assisté, itération rapide, standards élevés, documentation exhaustive
- **Rôle sur le projet** : CTO externalisé du moteur clinique + Lead UI/UX du proto MyMonka

### Monka

- **Statut** : Startup health-tech, post-levée de fonds (valorisation plusieurs millions)
- **Mission** : Accompagner les aidants familiaux via un parcours de soins personnalisé
- **Produit actuel** : App MyMonka V1 en production avec de vrais patients (version séparée, indépendante de notre travail)
- **Ambition** : DNM (Dispositif Numérique Médical), Article 51, scoring certifié, prescription médicale

### Prestataires externes (à venir)

- **Mission** : Assembler le moteur clinique + le proto UI/UX + la logique DB dans une codebase MyMonka V2
- **Périmètre** : App utilisateur (SaMD Classe IIa) + CRM Lifeline (intégration) + sécurité/certification + **Environnement HDS** (Hébergement de Données de Santé)
- **Contrainte** : On ne contrôle pas leur architecture technique. Nos livrables doivent être assemblables quelle que soit leur stack.

> **Note HDS** : L'environnement HDS est **leur responsabilité** (hébergeur certifié, chiffrement, localisation EU). Ça ne nous concerne pas directement pour l'app interne (pas de données patient chez nous). **Mais** ça peut impacter notre conception : si leur infrastructure HDS impose des contraintes sur le format des données, les API, ou la structure des tables, notre schéma et notre moteur doivent être assez flexibles pour s'adapter. → **À vérifier en amont avec eux** : est-ce que notre schema.sql est compatible avec un déploiement HDS ? Est-ce que les prestataires auront besoin de modifier notre structure de tables pour se conformer ?

---

## 2. Les personnes

| Personne | Rôle | Organisation | Dynamique |
|---|---|---|---|
| **Antonin Rimaud** | CTO externalisé moteur clinique | PRAGMA | Architecture, code engine, audits data, documentation normative, standards. Pilote les sprints de validation clinique. |
| **Dr. Benjamin Rimaud** | Directeur médical (le métier) | Monka | Médecin. Valide la pertinence clinique, calibre le scoring, produit le contenu médical. **Père d'Antonin** — relation directe qui accélère les itérations. |
| **Etienne** | CEO | Monka | Décisions stratégiques, vision business, pilote les levées, interface investisseurs et partenaires. |
| **Maël** | CPO | Monka | Vision produit, roadmap, arbitrages fonctionnels, validation des parcours utilisateur. |
| **Sophie** | IDEC (Infirmière de Coordination) | Monka | Utilisatrice métier. Teste le moteur en conditions réelles, feedback terrain. Opinion fondamentale sur l'Ergonomie. |
| **Marwane El Moutribi** | Lead UI/UX + Frontend proto | PRAGMA | Architecture UI complète (4 couches), design system, 35 composants Storybook, proto interactif, handoff visuel prestataires. |

### La dynamique Antonin ↔ Dr. Benjamin Rimaud (père/fils)

Cette relation père/fils crée une **réactivité exceptionnelle**. Concrètement :

| Avantage | Impact |
|---|---|
| **Accès direct** | Pas de délai de réponse, pas de formalisme d'agenda, validation clinique en temps réel |
| **Confiance mutuelle** | Le médecin fait confiance à l'approche IA-assistée, le CTO respecte l'expertise clinique |
| **Volume + qualité** | Les méthodes PRAGMA (IA-assisté) permettent de produire du travail de masse ET de qualité — validé en continue par le médecin |
| **Itérations rapides** | Une question clinique → réponse le jour même → intégration immédiate |

### ⚠️ Le risque du biais — Et comment on le gère

**Problème** : La proximité père/fils peut biaiser les décisions cliniques. Le médecin pourrait valider trop vite, ou ne pas être assez challengé.

**Solution PRAGMA** : On pousse le médecin à être questionné. Concrètement :

| Pratique | Pourquoi |
|---|---|
| **Proposer plusieurs options** | On ne présente pas "LA" solution — on présente 2-3 options avec pros/cons pour chaque |
| **Questionner systématiquement** | "Pourquoi 3 niveaux et pas 4 ?", "Pourquoi ce seuil à 7 et pas 8 ?", "Et si on ajoutait...?" |
| **Axes de réflexion différents** | On challenge le sens clinique, la faisabilité technique, l'impact utilisateur, la cohérence globale |
| **Documenter le raisonnement** | Chaque décision a une justification stockée en DB (`content_blocks`). Si le médecin ne peut pas justifier → on ne valide pas |
| **Ne jamais rendre les documents biaisants** | Les fiches de validation MP ne disent pas "est-ce que c'est bon ?". Elles demandent "quelles sont les alternatives ?" |
| **Le pousser à proposer** | Les meilleures idées cliniques viennent quand on le questionne, pas quand on lui demande de valider |

> **Règle d'or** : Le médecin doit **valider ET justifier**. Pas l'un sans l'autre. La justification est stockée en DB pour prouver que la réflexion a eu lieu.

---

## 3. Ce qu'on construit

### 3.1 L'app interne (ce repo)

**Ce que c'est** : Un simulateur clinique interne + toute la documentation et la base de données du moteur.

**Qui l'utilise** :
- Équipe Monka interne (Etienne, Maël, Dr. Rimaud, Sophie) — pour tester et valider
- Comme outil de **preuve produit** auprès de tiers (investisseurs, partenaires, Klésia)
- Potentiellement comme **démo commerciale de luxe** (mode "skip" avec utilisateur test + fausses données dans la vraie app) — à valider avec Etienne

**Ce que ce n'est PAS** :
- ❌ L'app utilisateur (c'est MyMonka V2, construite par les prestataires)
- ❌ Un dispositif médical (pas de patients ici)
- ❌ Soumis à HDS/RGPD (pas de données patient)

### 3.2 Le moteur clinique (code)

**Emplacement** : `app/src/engine/` — 4 fichiers clés :

| Fichier | Rôle |
|---|---|
| `clinicalEngine.ts` | Orchestrateur — charge les data, lance les calculs, retourne le résultat complet |
| `scoringEngine.ts` | Calcule les 5 scores de vulnérabilité (V1-V5) à partir des réponses et `scoring_questions` |
| `activationEngine.ts` | Évalue les 240 règles d'activation, détermine quels MPs/catégories sont actifs à quel niveau |
| `contentEngine.ts` | Charge les `content_blocks` pour enrichir l'affichage (sens clinique, justifications, etc.) |

**Caractéristiques** :
- TypeScript strict avec types exportés
- Pur calcul — aucune dépendance UI
- Isolé et importable tel quel dans n'importe quelle codebase
- Testé avec 8 personas × ~150 réponses chacune

**Statut IEC 62304** : Le code moteur DOIT respecter IEC 62304 Classe B car c'est le même code qui ira dans MyMonka V2 (SaMD IIa).

### 3.3 La base de données clinique (Supabase)

**Projet** : `mbxeqrvofrmhqlwlefff` (EU West 1)
**Tables** : 18 tables avec RLS activé sur toutes

**Volume réel (live)** :

| Groupe | Tables | Rows | Rôle |
|---|---|---|---|
| **Questionnaire** | `questions` | 165 | Questionnaire complet de diagnostic aidant |
| **Scoring** | `scoring_questions` + `scoring_thresholds` | 345 + 20 | Matrice réponse→score + seuils par vulnérabilité |
| **Référentiel** | `vulnerabilities` + `micro_parcours` + `categories` | 5 + 24 + 73 | Structure V→MP→Catégories |
| **Activation** | `activation_rules` | 240 | Règles SI→ALORS (conditionLogic JSONB) |
| **Actions** | `recommendations` + `micro_taches` + `guides` | 202 + 390 + 42 | Contenu utilisateur/IDEC |
| **Mappings** | `question_mp_mapping` + `guide_mt_mapping` | 155 + 61 | Jointures N:N |
| **Documentation** | `content_blocks` | 450 | Justifications cliniques structurées |
| **Suivi** | `suivi_questions` | 30 | Questionnaire de suivi T+N |
| **Test** | `personas` + `persona_answers` | 8 + 1203 | Cas de test cliniques |
| **CR** | `cr_templates` | 0 | Templates CR médecin (à remplir) |

### 3.4 Les justifications en DB — Stratégie `content_blocks`

**Principe fondamental** : TOUT ce qui est un choix, une décision, un raisonnement clinique doit être **stocké en DB** dans `content_blocks`.

**Pourquoi c'est critique** :

1. **Preuve de réflexion** — Un auditeur (DNM, Article 51) demandera : "Pourquoi cette question ? Pourquoi ce score ? Pourquoi ce MP ?" → La réponse est en DB, pas dans la tête du médecin.
2. **Anti-biais** — Si la justification est écrite ET stockée, elle est vérifiable. Pas de validation "de confiance".
3. **Valorisation** — Pour les investisseurs, partenaires, Klésia : la profondeur de réflexion est visible et requêtable.
4. **App interne** — Le simulateur AFFICHE ces justifications pour enrichir l'expérience démonstrative. Les prestataires externes n'auront peut-être pas besoin de les afficher dans MyMonka V2, mais elles existent en DB.
5. **Scalabilité** — Quand on passe à M2/M3, les justifications de M1 sont préservées.

**État actuel des `content_blocks`** :

| Block type | Count | Description |
|---|---|---|
| `scoring_justification` | 245 | Pourquoi cette réponse donne ce score |
| `sens_clinique` | 102 | Explication du sens médical d'une entité |
| `justification_acteurs` | 24 | Pourquoi ces acteurs pour ce MP |
| `justification_questions` | 24 | Pourquoi ces questions dans ce MP |
| `liens_inter_mp` | 24 | Comment les MP interagissent entre eux |
| `justification_categories` | 24 | Pourquoi ces catégories dans ce MP |
| `scoring_ponderation` | 6 | Pourquoi ces poids (0-1) pour les vulnérabilités |
| `matrice_patho_specialiste` | 1 | Matrice pathologies → spécialistes |

**Par entité** :

| Entity type | Count | Couverture |
|---|---|---|
| `question` | 156/165 | 95% des questions ont au moins 1 content_block |
| `micro_parcours` | 121 (5 types × 24 MPs + extra) | Couverture complète |
| `scoring` | 95 | Justifications scoring |
| `category` | 73 | 100% des catégories |
| `vulnerability` | 5 | 100% des vulnérabilités |

**Ce qui manque et doit être complété** :

| Besoin | Description | Priorité |
|---|---|---|
| Pourquoi 165 questions et pas 120 ou 200 ? | Justification globale du volume du questionnaire | 🔴 Haute |
| Pourquoi 24 MPs répartis comme ça ? | Justification de la répartition V1(4) V2(4) V3(4) V4(6) V5(6) | 🔴 Haute |
| Pourquoi ces seuils (et pas d'autres) ? | Justification du calibrage min/max par vulnérabilité | 🔴 Haute |
| Pourquoi ces niveaux (std/ccc/critique) ? | Justification du modèle à 3 niveaux + prévention | 🟠 Moyenne |
| Pourquoi ces types de MT (STRUC/SEC/MED/INFO/ORGA) ? | Justification de la classification des micro-tâches | 🟠 Moyenne |
| Questions manquantes en content_blocks | 9 questions sans aucun content_block | 🟡 Basse |

### 3.5 Le proto UI/UX (Marwane)

**Ce que Marwane a livré (mois 1)** :

- Audit UX complet de l'app existante (277+ fichiers, 19 problèmes identifiés — 3 bloquants, 8 majeurs)
- Identité visuelle / charte graphique complète
- Design System définitif (5 palettes, fond crème, formes arrondies, pensé pour aidants 50-60 ans)
- 40+ composants React/TSX isolés et testables
- Architecture UI en 4 couches : Vulnérabilité → HeroCard, MP → TaskCard, Reco → RecoCard, MT → MicroTaskItem
- **Mapping complet DB → interface** (chaque table, chaque champ traduit en composant UI)
- Mapping Moteur → UI → Copywriting (jamais de jargon médical visible à l'utilisateur)
- Copywriting UX finalisé (adaptation de ton bienveillant)
- Relecture critique + qualification du CDC (Cahier des Charges)
- **38/64 US (User Stories) du CDC P0 implémentées en ~20h** — 59% du CDC couvert
- Prototypage fonctionnel haute fidélité
- Plan de présentation en 3 actes pour Dr. Monka/Variant

**Roadmap Marwane (P1 → P3)** :

| Phase | Scope | Livrables clés |
|---|---|---|
| **P1 — Démo de référence** | CDC features P0 (26 US), co-conception avec Maël, design system définitif, mapping DB→interface, onboarding complet, questionnaire connecté au moteur (mock) | L'app clé en main qu'Etienne met dans les mains d'un investisseur — pas un proto, la référence produit |
| **P2 — Démos par persona + P1 CDC** | 5 démos basées sur les personas du simulateur d'Antonin, CDC features P1 (19 US : attribution IDEC, cercle aidant, agenda partagé, CTA pas-à-pas, notifications), refonte landing page Monka, tests utilisateurs panel aidants | 5 parcours fidèles au moteur. La landing page convertit les visiteurs en testeurs. |
| **P3 — Pilotage intégration presta** | Specs fonctionnelles par écran, guide d'intégration composant par composant, validation UX chaque livraison presta, points de contrôle qualité produit, MAJ fiches stores (V2), KPIs produit & analytics | Les prestataires n'inventent rien. Ils répliquent un produit qui existe déjà. Marwane valide chaque écran livré. |

**Dynamique Marwane ↔ Maël** :
- Co-conception produit continue : Marwane PROPOSE des idées UX, Maël valide et arbitre
- Relecture critique du CDC — partenaire produit, pas exécutant
- Tests d'affordance et de parcours utilisateur
- Checkpoints versionnés dans `proto/iterations/`

**Règle de design fondamentale** :
> L'aidant ne doit JAMAIS sentir qu'il est un patient. Il est accompagné, pas diagnostiqué. Pas de "CCC", pas de "Score", pas de "Vulnérabilité" visible.

---

## 4. Interactions entre acteurs

```
┌───────────────────────────────────────────────────────────────────┐
│                          PRAGMA                                   │
│                                                                   │
│  Antonin ────────── Architecture, code, standards, audits         │
│     │                                                             │
│     │ (père/fils = itérations rapides)                            │
│     │                                                             │
│  Marwane ────────── UI/UX, proto, design system, composants       │
│     │                                                             │
└─────┼─────────────────────────────────────────────────────────────┘
      │                              │
      │ Moteur + standards           │ Proto + design
      ▼                              ▼
┌───────────────────────────────────────────────────────────────────┐
│                          MONKA                                    │
│                                                                   │
│  Dr. Benjamin ──── Sens clinique, validation, contenu médical     │
│     (valide)       ⚠️ challengé, non biaisé, justifie tout       │
│                                                                   │
│  Etienne (CEO) ─── Décisions strat, investisseurs, go/no-go      │
│                                                                   │
│  Maël (CPO) ────── Produit, UX validation, arbitrage fonctionnel  │
│     (↔ Marwane)    Itération continue sur l'UI/UX                 │
│                                                                   │
│  Sophie (IDEC) ─── Feedback terrain, ergonomie métier             │
│                                                                   │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                                │ Les 3 piliers : moteur + proto + DB
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                   PRESTATAIRES EXTERNES                            │
│                                                                   │
│  Assemblent dans leur codebase :                                  │
│  • PILIER 1 : Moteur (code engine/)                               │
│  • PILIER 2 : Proto (composants + design system)                  │
│  • PILIER 3 : DB (schema + seed data)                             │
│  • + CRM Lifeline (intégration app)                               │
│  • + Auth, HDS, RGPD, cybersécurité, monitoring                  │
│                                                                   │
│  = MyMonka V2 (SaMD Classe IIa — vrais patients)                  │
└───────────────────────────────────────────────────────────────────┘
```

---

## 5. Objectifs à 1 an — Ce que Monka vise

| Objectif | Description | Exigence |
|---|---|---|
| **DNM** (Dispositif Numérique Médical) | Classification officielle par l'ANSM/HAS | Dossier technique complet (IEC 62304, ISO 14971, ISO 13485) |
| **Article 51** | Expérimentation en vie réelle dans le cadre d'un protocole dérogatoire | Data clinique validée, scoring reproductible, evidence-based |
| **Scoring certifié** | Le scoring Monka est reconnu comme outil d'évaluation clinique valide | Validation statistique, calibration documentée, test-retest |
| **Prescription médicale** | Un médecin peut prescrire le parcours Monka | Preuve d'efficacité, innocuité, utilisabilité (IEC 62366) |
| **Personnalisation maximale** | L'expérience la plus personnalisée possible pour chaque aidant | Moteur M2/M3 (sous-scores, radar, variantes MTs par profil) |
| **Automatisation + facilitation maximale** | Prendre l'utilisateur par la main, lui faciliter la vie au maximum | MTs pré-remplies, guides détaillés, docs auto-générés, actions dynamiques |

### L'ambition d'automatisation — En détail

Monka veut pousser l'expérience au maximum : **chaque micro-tâche doit être la plus facilitante et la plus détaillée possible**. L'aidant (et l'IDEC) ne doit jamais se retrouver face à une action vague. L'idée c'est de pré-mâcher le maximum.

**Ce qui peut être automatisé / pré-rempli** :

| Domaine | Exemple concret | Impact |
|---|---|---|
| **MTs administratives** | Demande d'APA, dossier MDPH, attestation mutuelle → formulaires pré-remplis avec les infos du profil aidant | L'aidant n'a plus qu'à signer, pas à chercher les bons papiers |
| **MTs orientation** | Trouver un spécialiste → géolocalisation + annuaire intégré + prise de RDV en ligne | Pas juste "consultez un spécialiste" mais directement la liste dans son périmètre |
| **Guides step-by-step** | Les 42 guides existants + extensions : chaque MT complexe a un guide détaillé avec étapes numérotées, contacts utiles, documents à fournir | L'aidant avance pas à pas sans se perdre |
| **CR médecin auto-généré** | Le CR de synthèse pour le médecin traitant est auto-rempli à partir des scores + MPs actifs + actions complétées | Plus de synthèse manuelle — le médecin reçoit un doc prêt à lire |
| **Relances intelligentes** | MTs en retard → notifications contextuelles, pas juste "vous n'avez pas fait X" mais "voici pourquoi c'est important et comment le faire maintenant" | Engagement sans culpabilisation |
| **Pré-qualification IDEC** | Avant le premier RDV IDEC, le questionnaire + les scores sont déjà prêts. L'IDEC arrive avec un dossier complet. | Gain de temps IDEC = plus d'aidants accompagnés |
| **Documents pré-remplis** | Attestations, courriers type, demandes administratives → templates avec les champs aidant/patient déjà remplis à partir du profil | Réduit la charge administrative de l'aidant |
| **Suivi T+N automatisé** | À T+30, T+90, T+180 → re-questionnaire automatique, comparaison des scores, visualisation de l'évolution | L'aidant voit sa progression sans effort |

**Ce que ça implique pour notre moteur** :
- Les MTs doivent avoir des **métadonnées enrichies** : est-ce automatisable ? données requises ? template associé ? lien vers service externe ?
- La table `guides` (42 rows) avec ses `steps[]`, `contacts[]`, `documents[]` (JSONB) est le début de cette logique
- Les `content_blocks` alimentent les explications détaillées qui rendent les MTs compréhensibles
- **À penser dès maintenant dans la conception** : quand Marwane et les prestataires implémentent les MTs, chaque action doit être pensée comme "que faut-il pour que l'utilisateur puisse faire ça en 2 clics ?"

> **Vision** : L'app MyMonka ne dit jamais "faites X". Elle dit "voici X, voici comment faire, voici les documents, voici le contact, cliquez ici pour commencer".

### Ce que ça implique pour nous MAINTENANT

Tous ces objectifs nécessitent une **base irréprochable** :

1. **Chaque composant du moteur doit être justifié** — Pourquoi 165 questions ? Pourquoi ces 24 MPs ? Pourquoi ces seuils ? → `content_blocks`
2. **Chaque décision clinique doit être tracée** — Registre des décisions + SOPs
3. **Le scoring doit être reproductible** — Mêmes inputs = mêmes outputs, toujours
4. **La data doit être propre et auditée** — Sprint 0 (audit complet) + Sprint 1-5 (validation progressive)
5. **La documentation doit être conforme** — IEC 62304, ISO 14971, ISO 13485 = 15+ livrables normés
6. **Le proto doit être documenté** — Les prestataires doivent pouvoir implémenter l'UI validée sans réinventer
7. **L'automatisation doit être pensée dès le moteur** — Métadonnées MT, guides JSONB, templates, liens externes

---

## 6. État actuel résumé

| Composant | État | Gap |
|---|---|---|
| **Code moteur** | ✅ Fonctionnel, 4 fichiers, testé avec 8 personas | Documentation API formelle manquante |
| **DB (18 tables)** | ✅ Complète, RLS activé, data peuplée | 1 table backup à supprimer, cr_templates vide |
| **Content blocks** | ✅ 450 blocs renseignés (95% couverture questions) | Justifications macro manquantes (pourquoi ces choix structurels) |
| **Scoring** | ✅ 345 scoring_questions + 20 thresholds | Calibrage à valider formellement avec Dr. Rimaud |
| **Activation rules** | ✅ 240 règles documentées | Audit CCC en cours (DECISIONS_CLINIQUES_REQUISES.md) |
| **Proto UI/UX** | ✅ 40+ composants, 59% CDC couvert (38/64 US), mapping DB→interface, design system définitif | Roadmap P1→P3 définie, captures visuelles à intégrer |
| **Documentation normative** | ⚠️ Partielle — docs/ existe mais incomplet | risks.md, srs.md, soup.md, validation.md manquants |
| **SOPs** | ✅ 3 SOPs créées (incident, modif data, validation MP) | SOPs à tester en usage réel |
| **Sprints validation** | 🔲 Sprint 0 en préparation | 0/5 sprints complétés |
| **Architecture repo** | ⚠️ En refonte (ARCHITECTURE_REFLEXION.md en cours) | proto/ et handoff/ à créer |

---

*Document de contexte — PRAGMA × Monka — Mars 2026*
