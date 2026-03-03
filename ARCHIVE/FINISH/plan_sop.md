# 🏗️ Plan d'Implémentation — Standards SOP + Dev IA + Alignement Docs

**Date** : 2026-02-27  
**Version** : v1.0  
**Auteur** : PRAGMA × Antonin  
**Sources** : ISO 42001, NIST AI RMF, ADR (Architecture Decision Records), Code Provenance Tracking 2025

---

## PARTIE 1 — Audit KERNEL_V6 (Source de vérité confirmée)

### Statut

> ✅ **KERNEL_V6** (`FINAL/docs/KERNEL_V6.md`) est la source de vérité.
> ❌ **KERNEL_V5** (`KERNEL/KERNEL_V5.md`) est obsolète → à archiver.

### Audit de cohérence KERNEL_V6 vs Code

| Règle KERNEL_V6 | Implémentation code | Cohérent ? | Amélioration possible |
|---|---|---|---|
| **K1** — Recos activées par rules | `clinicalEngine.ts` → rules fire, activent catégories | ✅ | — |
| **K2** — 3 niveaux + prévention | 4 niveaux dans `rules` table (standard/CCC/critique/prévention) | ✅ | Vérifier que prévention fallback est bien implémenté dans le code |
| **K3** — Winner-takes-all | `getActivatedCategories()` → filtre le niveau max | ✅ | Ajouter un test unitaire pour K3 |
| **K4** — Fallback prévention | `preventionRecos` dans le pipeline | ⚠️ | **Vérifier** : est-ce que le simulateur affiche bien la prévention quand 0 rule fire ? |
| **K5** — Reco = enveloppe MT | Schema DB : `recos` → `micro_taches` (FK) | ✅ | — |
| **K6** — Double wording | Champs `wording_aidant` + `wording_idec` | ✅ | Le simulateur n'affiche que la version aidant — noter pour V2 |
| **K7** — Autonomie | Design sans dépendance IDEC | ✅ | — |
| **K8** — Acteur au niveau MT | Champ `acteur` sur `micro_taches` | ✅ | — |
| **K9** — 1 MP = 1 ASR | 24 ASR dans `micro_parcours.asr_*` | ✅ | — |
| **K10** — 2 familles MT | Types STRUC/SEC/MED = contributif, INFO/ORGA = non-contributif | ✅ | — |
| **K11** — ASR = 100% contributives | Logique ASR dans engine | ✅ | Ajouter un test unitaire |
| **K12** — Types non tous obligatoires | Flexible dans le scoring | ✅ | — |
| **K13** — Scoring indépendant | Score ≠ activation rules (parallèle) | ✅ | Bien documenté dans `engine_explainer.md` |
| **K14** — Scoring par V | 5 scores normalisés 0-100 | ✅ | — |
| **K15** — MT liées à catégorie | Même MT, wording varie par niveau | ✅ | — |
| **K16** — Reco = cap, MT = action | Schema respecté | ✅ | — |
| **K17** — Domaine clinique 🏥/🤝 | Champ `domaine` | ✅ | — |
| **K18** — Écosystème acteurs | Acteurs par MT, coordonné par MP | ✅ | — |

### Résultat audit

**Score : 18/18 règles cohérentes** ✅

**3 améliorations identifiées** (non bloquantes) :

| # | Amélioration | Type | Effort | Quand |
|---|---|---|---|---|
| 1 | Vérifier fallback prévention (K4) dans le simulateur | Vérification | 15min | BLOC 2 (tests) |
| 2 | Tests unitaires K3 (winner-takes-all) et K11 (ASR) | Tests | 30min | BLOC 2 |
| 3 | Double wording IDEC non affiché dans le simulateur | Feature | Post-livraison | M2 |

### Métriques KERNEL_V6 vs code

| Métrique KERNEL_V6 | Valeur doc | Valeur DB réelle | Match ? |
|---|---|---|---|
| Vulnérabilités | 5 | 5 (V1-V5) | ✅ |
| Micro-Parcours | 24 | 24 | ✅ |
| Questions | 150 (130+20) | 157 en base (+ triggers) | ⚠️ Delta 7 = triggers comptés différemment |
| Catégories | 73 | À vérifier via SQL | 🔍 |
| Règles d'activation | 240 | À vérifier | 🔍 |
| Recommandations | 202 | À vérifier | 🔍 |
| Micro-Tâches | 390 | À vérifier | 🔍 |

> **Action** : Ajouter les requêtes SQL de vérification dans le BLOC 2 pour confirmer les comptages.

---

## PARTIE 2 — Organisation des certifications et alignement FINISH↔FINAL

### Structure cible

```
FINISH/                              FINAL/
├── plan.md (source de vérité)       ├── docs/
├── implementation.md                │   ├── KERNEL_V6.md (source de vérité moteur)
├── engine_explainer.md              │   ├── ARCHITECTURE_APP.md
├── audit_db.md                      │   ├── ARCHITECTURE_DB.md
├── anglesmorts.md                   │   ├── prd.md
├── coherence_proof.md               │   ├── FEATURES.md
├── analyse_personas_db.md           │   └── certifications/
├── plan_sop.md                      │       ├── sprint_v2/ (27 QG → historique)
│                                    │       └── sprint_finish/ ← LIEN vers FINISH/certifs/
├── certifs/                         │
│   ├── _INDEX.md  ← NOUVEAU        ├── autres/
│   ├── templates/                   │   ├── REFLEXION_OVERLAY_ENFANTS.md
│   │   ├── quality_agent.md         │   ├── DECISION_OVERLAY_AIDANCE.md
│   │   └── walkthrough.md           │   └── ... (réflexions cliniques)
│   ├── BLOC-0/                      │
│   │   └── quality_check.md         └── scoring/ (données scoring)
│   ├── BLOC-1/
│   │   ├── quality_check.md
│   │   └── walkthrough.md
│   ├── BLOC-2/ (à venir)
│   └── ...
│
├── SOP/  ← NOUVEAU (ou racine monka/SOP/)
│   ├── REGISTRE.md
│   ├── DEV/
│   └── ...
│
└── ARCHIVE/  ← NOUVEAU
    ├── actions_ce_soir.md
    └── KERNEL_V5.md (depuis KERNEL/)
```

### Plan d'export FINISH → FINAL

| Source | Destination | Action |
|---|---|---|
| `FINISH/certifs/*` | `FINAL/docs/certifications/sprint_finish/` | **Symlink ou copie** à la fin du sprint |
| `FINISH/engine_explainer.md` | `FINAL/docs/` | **Copie** — doc technique du moteur |
| `FINISH/audit_db.md` | Remplace `FINAL/docs/AUDIT_COMPLET_DB.md` | **Mise à jour** — version plus récente |
| `FINISH/plan_sop.md` | `FINAL/docs/` | **Copie** — governance docs |
| `KERNEL/KERNEL_V5.md` | `FINISH/ARCHIVE/` | **Archiver** — obsolète |

### Index des certifications (`FINISH/certifs/_INDEX.md`)

```markdown
# Index des certifications — Sprint FINISH

| Bloc | Quality Check | Walkthrough | Date | Verdict |
|---|---|---|---|---|
| BLOC 0 | N/A (pré-sprint) | N/A | 2026-02-27 | ✅ |
| BLOC 1 | BLOC-1/quality_check.md | BLOC-1/walkthrough.md | 2026-02-27 | ✅ CERTIFIÉ |
| BLOC 2 | BLOC-2/quality_check.md | BLOC-2/walkthrough.md | — | ⬜ |
| BLOC 3 | BLOC-3/quality_check.md | BLOC-3/walkthrough.md | — | ⬜ |
| BLOC 4 | BLOC-4/quality_check.md | BLOC-4/walkthrough.md | — | ⬜ |
| BLOC 5 | BLOC-5/quality_check.md | BLOC-5/walkthrough.md | — | ⬜ |
| BLOC 6 | BLOC-6/quality_check.md | BLOC-6/walkthrough.md | — | ⬜ |
```

---

## PARTIE 3 — Standards Dev IA dans le code

### Ce qui existe comme standards

La recherche web 2025 identifie **3 standards émergents** pertinents pour nous :

#### 1. ADR — Architecture Decision Records

> **Quoi** : Un fichier markdown par décision d'architecture importante. Documente le POURQUOI, pas juste le QUOI.
>
> **Format standard** (Michael Nygard) :
> ```
> # ADR-001 — Titre de la décision
> Status: Accepted / Deprecated / Superseded
> Context: Pourquoi cette décision est nécessaire
> Decision: Ce qu'on a décidé
> Consequences: Ce que ça implique (bon ET mauvais)
> ```

**Ce qu'on a déjà** : `FINAL/docs/adr/` existe (1 fichier). Nos walkthroughs contiennent des ADRs implicites (section "Décisions d'architecture").

**Action** : Extraire les ADRs de chaque walkthrough dans des fichiers ADR dédiés. Convention : `ADR-{NNN}_{sujet}.md`.

#### 2. Code Provenance — Traçabilité de l'origine du code

> **Quoi** : Documenter QUI a écrit chaque partie du code : humain, IA, ou les deux.
>
> **Pourquoi** : IP (propriété intellectuelle), audit, compliance, et confiance.
>
> **Best practice 2025** : "Prompt Provenance" — logguer chaque prompt et instruction avec un timestamp pour créer une piste d'audit.

**Ce qu'on a déjà** : Nos walkthroughs documentent chaque modification avec avant/après. Git trace chaque commit.

**Action** : Ajouter dans le template walkthrough un champ :
```
| Fichier | Origine | Prompt/Instruction | Review humain |
|---|---|---|---|
| QuestionsSidebar.tsx | IA + Review | "Fix multi-select toggle" | ✅ Antonin |
```

#### 3. `llms.txt` — Standard de documentation pour les LLMs

> **Quoi** : Un fichier `llms.txt` à la racine du projet qui décrit le projet pour les LLMs. Comme `robots.txt` mais pour les agents IA.
>
> **Source** : mintlify.com (2025) — standard émergent adopté par plusieurs frameworks.

**Action** : Créer un `llms.txt` à la racine de `monka/` pour que tout agent IA comprenne le projet.

### Tableau récapitulatif des standards

| Standard | Quoi | Notre équivalent | À faire |
|---|---|---|---|
| **ADR** | Décisions d'architecture | Walkthroughs (implicite) | Extraire en ADR dédiés |
| **Code Provenance** | Origine du code | Git + walkthroughs | Ajouter champ "Origine" dans template |
| **`llms.txt`** | Description projet pour IA | README (partiel) | Créer `llms.txt` |
| **Prompt Provenance** | Logging des prompts | Conversation logs | Structurer dans les walkthroughs |
| **SOP** | Processus formalisé | Workflows (proto-SOP) | Formaliser avec en-têtes |
| **ISO 42001** | Management system IA | Matrice PRAGMA §1-§28 | Mapper vers les 38 contrôles |
| **NIST AI RMF** | Risk management | `anglesmorts.md` | Enrichir post-livraison |

---

## PARTIE 4 — Intégration dans pragma-starter-kit

### Structure actuelle de pragma-starter-kit

```
pragma-starter-kit/
├── .agent/
│   ├── rules/          ← Règles dev (dev.md)
│   └── workflows/      ← 7 workflows (quality-agent, before-deploy, etc.)
├── docs/
│   ├── api.md
│   └── certifications/
│       └── certification-template.md
├── framework/
│   └── senior-dev-framework.md    ← 28 sections
├── templates/          ← 5 templates
└── legal/              ← 3 docs légaux
```

### Ce qu'on apporte depuis Monka

| Contribution Monka | Destination pragma-starter-kit | Valeur ajoutée |
|---|---|---|
| **6 workflows segmentés** (finish-00 à 04 + orchestrateur) | `.agent/workflows/` | Modèle d'exécution blindée avec Token Guard |
| **Template walkthrough CTO** | `docs/certifications/walkthrough-template.md` | Rapport de qualité prestige |
| **Template quality_agent enrichi** | `docs/certifications/` (mise à jour) | Plus détaillé que l'actuel |
| **Plan SOP** | `docs/sop/` (NOUVEAU) | Framework SOP complet |
| **Template SOP universel** | `templates/sop-template.md` | Réutilisable par tout client PRAGMA |
| **Matrice ADR** | `docs/adr/adr-template.md` | Standard industriel |
| **Code Provenance template** | `templates/provenance-template.md` | Traçabilité IA |
| **`llms.txt` template** | `templates/llms-txt-template.md` | Standard émergent 2025 |

### Vision : pragma-starter-kit v2

```
pragma-starter-kit/ v2
├── .agent/
│   ├── rules/
│   ├── workflows/
│   │   ├── before-coding.md
│   │   ├── during-coding.md
│   │   ├── before-deploy.md
│   │   ├── post-deploy.md
│   │   ├── quality-agent.md
│   │   ├── deep-think.md
│   │   ├── sprint-orchestrator.md     ← NOUVEAU (from finish-sprint)
│   │   ├── token-guard.md             ← NOUVEAU (from finish-02)
│   │   └── sop-execution.md           ← NOUVEAU
│   └── skills/
├── docs/
│   ├── api.md
│   ├── adr/                           ← NOUVEAU
│   │   └── adr-template.md
│   ├── certifications/
│   │   ├── certification-template.md
│   │   └── walkthrough-template.md    ← NOUVEAU
│   └── sop/                           ← NOUVEAU
│       ├── registre.md
│       └── sop-template.md
├── framework/
│   └── senior-dev-framework.md
├── templates/
│   ├── provenance-template.md         ← NOUVEAU
│   ├── llms-txt-template.md           ← NOUVEAU
│   └── ... (existants)
└── legal/
```

---

## PARTIE 5 — Plan d'exécution par priorité

### Immédiat (ce soir / sprint FINISH)

| # | Action | Effort | Bloc |
|---|---|---|---|
| 1 | Archiver `KERNEL_V5.md` → `FINISH/ARCHIVE/` | 1min | — |
| 2 | Créer `FINISH/certifs/_INDEX.md` (index des certifications) | 5min | — |
| 3 | Réorganiser certifs en sous-dossiers par bloc | 10min | — |
| 4 | Marquer `SPRINT_V2.md` + `actions_ce_soir.md` comme historiques | 2min | — |

### Post-livraison (semaine 5-6)

| # | Action | Effort |
|---|---|---|
| 1 | Formaliser les 6 workflows en SOPs avec en-têtes | 1h30 |
| 2 | Créer `SOP/REGISTRE.md` | 15min |
| 3 | Extraire les ADRs des walkthroughs | 30min |
| 4 | Ajouter champ "Code Provenance" dans walkthrough template | 10min |
| 5 | Créer `llms.txt` racine | 15min |
| 6 | Export FINISH → FINAL (copie docs techniques) | 20min |
| 7 | Vérifier comptages KERNEL_V6 vs DB (SQL) | 30min |

### pragma-starter-kit v2 (post-client Monka)

| # | Action | Effort |
|---|---|---|
| 1 | Intégrer sprint-orchestrator + token-guard dans les workflows | 1h |
| 2 | Ajouter templates SOP, ADR, provenance, llms.txt | 1h |
| 3 | Mettre à jour walkthrough-template avec leçons Monka | 30min |
| 4 | Documenter dans le README les nouveaux standards | 30min |

---

*Plan d'implémentation SOP + Standards Dev IA — PRAGMA v1.0*
