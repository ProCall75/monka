# Plan Qualité Moteur Clinique — Pour le CEO

> **De** : Antonin Rimaud (PRAGMA — CTO externalisé)
> **Pour** : CEO Monka
> **Date** : 4 mars 2026
> **Objet** : Avant d'avancer sur M1→M2→M3, voici le socle normatif et qualité à mettre en place

---

## Contexte

Le moteur clinique Monka est un **composant d'aide à la décision clinique** que Monka va intégrer dans l'application MyMonka destinée aux utilisateurs finaux (IDEC, aidants, médecins traitants).

L'application interne (le simulateur) sert uniquement à **visualiser, tester et valider** la pertinence du moteur. Il n'y aura jamais de données patient dessus. Le standard s'applique donc au **moteur et à sa data**, pas à l'interface du simulateur.

### Pourquoi ce document maintenant ?

Monka a déjà des patients sur l'app MyMonka. Le moteur clinique va être intégré dans cette app. Si la data et la logique du moteur ne sont pas structurées selon les normes dès le départ, il faudra **tout refaire** au moment de :
- La labellisation HAS
- Le marquage CE (dispositif médical numérique)
- Un audit investisseur ou réglementaire
- L'intégration dans une app avec des vrais patients

**Le coût de le faire maintenant : quelques semaines. Le coût de le refaire plus tard : des mois.**

---

## 1. Classification réglementaire du moteur

### Le moteur Monka = un composant SaMD (Software as a Medical Device)

Un SaMD est un logiciel ayant une **finalité médicale**. Le moteur Monka :
- Évalue la vulnérabilité d'aidants via 165 questions cliniques
- Calcule 5 scores de vulnérabilité (V1-V5)
- Active 24 micro-parcours de soins personnalisés
- Génère 198 recommandations et 369 micro-tâches
- Produit un compte-rendu médecin pour aide à la décision

**C'est de l'aide à la décision clinique.** Ça tombe sous la réglementation européenne MDR (EU 2017/745).

### Classification

| Standard | Classification | Justification |
|---|---|---|
| **MDR (EU 2017/745)** — Règle 11 | **Classe IIa** | Le moteur fournit des informations pour des décisions thérapeutiques (orientation parcours de soins). L'IDEC reste dans la boucle. |
| **IEC 62304** — Sécurité logicielle | **Classe B** | Une défaillance (mauvais score, MP manquant) = parcours inadapté. Pas de danger immédiat — l'IDEC corrige. |

> **Ce que ça veut dire** : quand Monka voudra le marquage CE pour MyMonka, le moteur devra avoir une documentation conforme IEC 62304 Classe B. Si on la construit maintenant, c'est transparent au moment de la certification.

---

## 2. Ce qu'on protège : le moteur et sa data

Le périmètre des standards n'est **pas** l'interface du simulateur. C'est la **logique clinique** et la **qualité de la data** :

| Élément protégé | Volume | Pourquoi c'est critique |
|---|---|---|
| **165 questions** | Questionnaire complet | La base de tout — une question mal formulée = données faussées |
| **321 questions scorantes** (poids C1/C2) | Pipeline scoring | Un poids incorrect = score de vulnérabilité erroné |
| **5 vulnérabilités** + 20 seuils | Scoring V1-V5 | Un seuil mal calibré = classification incorrecte (faible ↔ critique) |
| **235 règles d'activation** | Logique d'activation | Une règle manquante = un patient ne reçoit pas le bon MP |
| **24 micro-parcours** | Parcours de soins | Un MP mal structuré = parcours inadapté |
| **198 recommandations** + 369 micro-tâches | Actions concrètes | Une MT mal rédigée = mauvaise orientation du patient |
| **73 catégories** + acteurs | Organisation | Structuration du parcours |
| **Code du moteur** (`clinicalEngine.ts`, `scoringEngine.ts`, `activationEngine.ts`) | Logique de calcul | Un bug = résultats incorrects pour tous les patients |

> **Principe** : chaque modification de ces éléments doit être **tracée, justifiée et validée**. C'est non négociable si on vise la certification.

---

## 3. Les normes qu'on applique et pourquoi

### 3 piliers normatifs

| Norme | Ce qu'elle couvre | Ce qu'on en prend | Statut |
|---|---|---|---|
| **IEC 62304** | Cycle de vie logiciel médical | Documentation du développement, traçabilité, gestion des changements | 🟠 En cours d'alignement |
| **ISO 14971** | Gestion des risques | Analyse : que se passe-t-il si le moteur se trompe ? | 🔲 À faire |
| **ISO 13485** | Système management qualité | Contrôle des documents, enregistrements, revues | 🟠 L'esprit (pas la certification formelle) |

### Ce que ça produit concrètement dans le repo

| Document | Norme source | Contenu | Priorité |
|---|---|---|---|
| **`docs/produit.md`** | MDR Art. 2 | Destination prévue du moteur, populations, contexte d'utilisation | ✅ Créé |
| **`docs/clinique.md`** | IEC 62304 §5.2 | Pipeline clinique, logique des 5V, principes de scoring | ✅ Créé |
| **`docs/technique.md`** | IEC 62304 §5.3 | Architecture du moteur (pas de l'UI), flux de données | ✅ Créé |
| **`docs/donnees.md`** | IEC 62304 §5.3 | Schéma des 18 tables, relations, comptages de référence | ✅ Créé |
| **`docs/qualite.md`** | ISO 13485 | Standards appliqués, process qualité, checklist sprint | ✅ Créé |
| **`docs/risks.md`** | ISO 14971 | Analyse de risques : scoring, activation, MPs, MTs | 🔲 À créer |
| **`docs/srs.md`** | IEC 62304 §5.2 | Spécifications formelles du moteur (les 18 règles KERNEL) | 🔲 À créer |
| **`docs/soup.md`** | IEC 62304 §8 | Composants tiers du moteur (Supabase, npm core) | 🔲 À créer |
| **`docs/validation.md`** | IEC 62304 §5.7 | Résultats de test : personas → résultats attendus vs réels | 🔲 À créer |

### L'espace moteur (`moteur/`)

Déjà construit :

```
moteur/
├── _templates/              ← 6 templates de certification sprint
│   ├── tpl-01-audit-data    ← Audit intégrité des données
│   ├── tpl-02-validation-scoring ← Validation scoring V1-V5
│   ├── tpl-03-validation-mp ← Validation micro-parcours
│   ├── tpl-04-stress-test   ← Test cas cliniques réels
│   ├── tpl-05-decision      ← Enregistrement décision tracée
│   └── tpl-06-sprint-report ← Rapport de sprint certifié
│
├── _standards/              ← Conventions, checklist qualité, glossaire
├── referentiel/             ← Sources de vérité (KERNEL V6, scoring, acteurs)
├── sprints/                 ← Sprint 00 → 05 (validation progressive)
└── registre-decisions.md    ← Index de toutes les décisions D-001 → D-XXX
```

### Les 5 SOPs (procédures opérationnelles)

| SOP | Quand | Protège quoi |
|---|---|---|
| **SOP-001** : Modification data clinique | Chaque modif base de données | Intégrité des données |
| **SOP-002** : Validation MP | Validation d'un micro-parcours | Pertinence clinique |
| **SOP-003** : Cycle sprint | Début/fin de sprint | Process qualité |
| **SOP-004** : Incident data clinique | Bug détecté sur data | Sécurité patient |
| **SOP-005** : Déploiement | Push en production | Stabilité |

---

## 4. Comment ça s'intègre avec M1 → M2 → M3

### Le principe

On assainit la base **avant** d'améliorer le moteur. Et chaque amélioration suit les mêmes standards.

```
Phase 0 — ASSAINIR                Phase 1-3 — AMÉLIORER
┌──────────────────────┐          ┌──────────────────────┐
│  Auditer les données │          │  M1 → M2 → M3       │
│  Valider le scoring  │          │  Nouvelles CCC       │
│  Vérifier les règles │    →     │  Sous-scores radar   │
│  Documenter la base  │          │  Variantes MTs       │
│  Tracer les décisions│          │  CR personnalisé     │
└──────────────────────┘          └──────────────────────┘
     MÊMES STANDARDS                   MÊMES STANDARDS
     MÊMES SOPs                        MÊMES SOPs
     MÊMES TEMPLATES                   MÊMES TEMPLATES
```

### Concrètement : les sprints

| Sprint | Focus | Ce qui est audité/validé | Référence template |
|---|---|---|---|
| **Sprint 0** — Audit Data | Intégrité de la base | 18 tables, comptages, doublons, champs manquants, cohérence | TPL-01 |
| **Sprint 1** — Scoring | Validation V1-V5 | Poids C1/C2, seuils, questions scorantes, calibration | TPL-02 |
| **Sprint 2** — Règles & MPs | Validation activation | 235 règles, 24 MPs, catégories, cohérence N3 | TPL-03 |
| **Sprint 3** — Explications | Enrichissement clinique | Sens clinique, explications, wording, appui biblio | TPL-02 + TPL-03 |
| **Sprint 4** — Stress Test | Cas cliniques réels | Personas + résultats attendus vs moteur | TPL-04 |
| **Sprint 5** — Challenge | Revue critique | Dr. Monka challenge les résultats, cherche les failles | TPL-04 + TPL-06 |

> **Sprint 0 à 2 = Phase "assainir"** (avant M1)
> **Sprint 3 à 5 = Phase "valider et améliorer"** (pendant et après M1)

### Chaque amélioration M2/M3 suit le même process

Quand on ajoute une CCC, une variante MT, ou un sous-score radar :

```
1. Créer un D-XXX (décision tracée)         ← SOP-001
2. Modifier la base de données               ← Modification documentée
3. Vérifier la non-régression                ← Les personas existants passent toujours
4. Valider avec Dr. Monka                    ← Signature clinique
5. Mettre à jour le registre de décisions    ← Traçabilité complète
```

C'est le **même process** pour M1, M2 et M3. Les standards ne changent pas — seule la complexité du moteur augmente.

---

## 5. Ce que Monka peut montrer à un auditeur / investisseur

### Dès maintenant (après les sprints 0-2) :

| Ce qu'on peut montrer | Norme associée | Impact |
|---|---|---|
| Registre de toutes les décisions cliniques | ISO 13485 | "Chaque modification est tracée et justifiée" |
| 6 sprint reports signés Antonin + Dr. Monka | IEC 62304 V&V | "Le moteur est vérifié et validé" |
| 5 SOPs actives | ISO 13485 | "On a des procédures, pas du bricolage" |
| Data auditée + comptages vérifiés | IEC 62304 | "La base est propre et complète" |
| Analyse de risques | ISO 14971 | "On a identifié ce qui peut mal tourner" |

### À terme (post M3) :

| Ce qu'on peut montrer | Impact |
|---|---|
| Traçabilité complète question → score → MP → MT → acteur | Prérequis marquage CE |
| Fiches de validation MP signées par le directeur médical | Prérequis labellisation HAS |
| Stress tests cliniques documentés avec résultats | Dossier technique MDR |
| SOUP documenté (composants tiers) | Exigence IEC 62304 |
| Matrice de traçabilité exigences → tests | Exigence certification |

> **En bref** : on construit le dossier de certification en même temps qu'on améliore le moteur. Pas de travail en double.

---

## 6. Résumé — Ce qu'il faut retenir

| Question | Réponse |
|---|---|
| **Quelle norme ?** | IEC 62304 (logiciel médical) + ISO 14971 (risques) + ISO 13485 (qualité) |
| **Quelle classification ?** | Classe IIa MDR + Classe B IEC 62304 |
| **Que protège-t-on ?** | Le moteur clinique et sa data — pas l'interface du simulateur |
| **Quand le faire ?** | **Maintenant**, avant M1. Le coût est minimal si c'est pensé dès le départ. |
| **Et si on ne le fait pas ?** | On refait tout au moment du marquage CE. Coût × 10. |
| **Comment ça s'intègre avec M1→M3 ?** | Les sprints d'assainissement (0-2) préparent M1. Les améliorations M2/M3 suivent les mêmes SOPs. |
| **Qui fait quoi ?** | Antonin structure + audite. Dr. Monka valide cliniquement. Les deux signent chaque sprint. |

---

## 7. Architecture du repo

```
monka/
├── .agent/                  ← Config agent IA (garde-fous cliniques)
│
├── app/                     ← Simulateur interne (Next.js)
│
├── docs/                    ← Documentation normative
│   ├── produit.md           ← Destination prévue (MDR)
│   ├── clinique.md          ← Pipeline clinique (IEC 62304)
│   ├── technique.md         ← Architecture moteur (IEC 62304)
│   ├── donnees.md           ← Schéma DB (IEC 62304)
│   ├── qualite.md           ← Standards + QMS (ISO 13485)
│   ├── equipe.md            ← Rôles + gouvernance
│   ├── securite.md          ← Protection IP + RLS
│   ├── risks.md             ← Analyse de risques (ISO 14971) — à créer
│   ├── srs.md               ← Spécifications moteur (IEC 62304) — à créer
│   ├── soup.md              ← Composants tiers (IEC 62304) — à créer
│   └── validation.md        ← Résultats de test (IEC 62304) — à créer
│
├── moteur/                  ← Zone certifiable
│   ├── _templates/          ← 6 templates de sprint
│   ├── _standards/          ← Conventions, checklist, glossaire
│   ├── referentiel/         ← Sources de vérité (KERNEL, scoring)
│   ├── sprints/             ← Sprint 00-05 (validation progressive)
│   └── registre-decisions.md
│
├── sops/                    ← 5 procédures opérationnelles
│
├── reviews/                 ← Espace review (UI/UX Marwane)
│
├── assets/                  ← Présentations, exports
│
├── _old/                    ← Archive v1
│
├── ARCHITECTURE.md          ← Constitution technique du repo
└── INDEX.md                 ← Carte navigable
```

---

> **Le moteur Monka n'est pas un questionnaire. C'est un système d'aide à la décision clinique normé IEC 62304, qui croise 165 data points pour produire un parcours de soins personnalisé. Chaque donnée est tracée, chaque décision est documentée, chaque sprint est certifié par le directeur médical. C'est le niveau qu'un investisseur, un auditeur ou la HAS attend d'un dispositif numérique médical.**

---

*PRAGMA — Antonin Rimaud — Mars 2026*
