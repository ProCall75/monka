# ROADMAP GAP ANALYSIS — État Actuel → Standards

> **Objectif** : Identifier tout ce qui manque pour amener la base au niveau des standards requis (DNM, IEC 62304, ISO 14971)
> **Périmètre** : Purement la mise au standard — PAS de M2/M3 ici
> **Date** : 4 mars 2026

---

## Vue synthétique

```
ÉTAT ACTUEL                                    ÉTAT CIBLE (Standards)
────────────                                   ──────────────────────
✅ Moteur fonctionnel (4 fichiers)          →  ✅ Même code + doc API formelle
✅ 18 tables Supabase peuplées              →  ✅ Schéma propre + exportable
✅ 450 content_blocks                       →  🔴 Justifications macro manquantes
⚠️ 15 dossiers en vrac                     →  ✅ Architecture 3 piliers structurée
⚠️ Docs partiels (clinique, technique)     →  ✅ 15 livrables IEC 62304 complets
❌ Pas de risks.md                          →  ✅ Analyse de risques ISO 14971
❌ Pas de SRS formelle                      →  ✅ Spécifications d'exigences logiciel
❌ Pas de SOUP list                         →  ✅ Liste des composants tiers
❌ Pas de validation formelle scoring       →  ✅ Sprints 0-5 signés par Dr. Rimaud
❌ Pas de traçabilité exigence→test         →  ✅ Matrice de traçabilité complète
❌ Proto dans LIVRABLES/ en vrac            →  ✅ proto/ structuré avec composants
❌ Pas de handoff/ prestataires             →  ✅ Kit d'intégration 3 piliers
```

---

## Alignement avec les standards prestataires (PREREQUIS_PRESTATAIRES_EXTERNES.md)

> **Principe** : On exige 16 livrables aux prestataires (cf. `docs/PREREQUIS_PRESTATAIRES_EXTERNES.md`). Pour être crédible et cohérent, on doit être au MÊME standard sur notre périmètre (moteur + DB + proto).
> **Ce qui change** : Les prestataires couvrent l'app utilisateur (MyMonka V2). Nous on couvre le moteur clinique + la DB + le proto. Pas les mêmes composants, mais les MÊMES normes.

### Matrice d'alignement — Nos 16 livrables vs les leurs

| # | Livrable exigé aux prestataires | Notre équivalent (moteur/DB/proto) | Notre état | Gap | Priorité |
|---|---|---|---|---|---|
| **L1** | Plan de développement logiciel | `docs/plan-dev.md` — cycle de vie, rôles, activities, planning | ❌ Manquant | Créer. Décrire notre cycle (sprints validation, IA-assisté, checkpoint clinique) | 🟠 |
| **L2** | Spécifications d'exigences (SRS) | `docs/srs.md` — exigences fonctionnelles du moteur | ❌ Manquant | Créer. "Le moteur DOIT calculer 5 scores", "DOIT activer les MPs selon les rules" | 🟠 |
| **L3** | Architecture logicielle | `docs/technique.md` + `ARCHITECTURE_REFLEXION.md` | ⚠️ Partiel | Compléter `technique.md` avec diagrammes formels, interfaces entre engines | 🟡 |
| **L4** | Design détaillé | `app/src/engine/README.md` + code moteur auto-documenté | ⚠️ Partiel | Documenter inputs/outputs/logique de chaque fonction moteur | 🟡 |
| **L5** | Plan de V&V | `docs/validation.md` — plan de test moteur | ❌ Manquant | Créer. Tests personas, tests edge cases, critères pass/fail, couverture | 🟠 |
| **L6** | Résultats de tests | `moteur/sprints/` — fiches de validation signées | ⚠️ Tests existent (8 personas) mais pas formalisés | Formaliser dans les sprints 0-5 + export résultats test runner | 🔴 |
| **L7** | Matrice de traçabilité | Exigence → Design → Code → Test → Risque | ❌ Manquante | Créer. C'est le livrable le plus long mais le plus critique pour l'auditeur | 🔴 |
| **L8** | Liste SOUP | `docs/soup.md` — packages/librairies du moteur | ❌ Manquante | Créer à partir de `package.json` + dépendances Supabase | 🟡 |
| **L9** | Analyse de risques logicielle | `docs/risks.md` — ISO 14971 pour le moteur | ❌ Manquante | Créer. "Si scoringEngine retourne un faux score → impact ?" | 🔴 |
| **L10** | Registre des risques | Inclus dans `docs/risks.md` | ❌ Manquant | Inclus dans L9 — liste vivante avec statut et mitigations | 🔴 |
| **L11** | Gestion de configuration | Git + conventions de commits/branches | ⚠️ Git en place, pas de convention formelle | Définir convention commits + politique de branches | 🟡 |
| **L12** | Résolution de problèmes | Process de bug tracking | ⚠️ SOP-002 (incident data) existe | Étendre à tous les types d'anomalies (pas juste data) | 🟡 |
| **L13** | Plan de maintenance | Comment le moteur est mis à jour | ❌ Manquant | Créer. Process de release + vérification post-modif | 🟡 |
| **L14** | SBOM | Inventaire machine-readable des dépendances | ❌ Manquant | Générer automatiquement depuis `package-lock.json` (outil `syft` ou `cdxgen`) | 🟡 |
| **L15** | Rapport de cybersécurité | Analyse de vulnérabilités du moteur | ⚠️ RLS activé sur toutes les tables Supabase | RLS = bien. Mais pas de scan formel des dépendances ni de pentest | 🟡 |
| **L16** | Dossier d'utilisabilité | Specs UX, risques d'usage, tests utilisabilité | ⚠️ Proto Marwane existe (4 couches, 35 composants) | Formaliser dans `proto/` : choix d'affordance + risques usage (IEC 62366 léger) | 🟠 |

### Synthèse d'alignement

```
                    PRESTATAIRES          NOUS (moteur/DB/proto)
                    ────────────          ──────────────────────
L1  Plan dev        ← On exige            ❌ On n'a PAS encore
L2  SRS             ← On exige            ❌ On n'a PAS encore
L3  Architecture    ← On exige            ⚠️ Partiel
L4  Design détaillé ← On exige            ⚠️ Partiel
L5  Plan V&V        ← On exige            ❌ On n'a PAS encore
L6  Résultats tests ← On exige            ⚠️ Partiel (pas formalisé)
L7  Traçabilité     ← On exige            ❌ On n'a PAS encore
L8  SOUP            ← On exige            ❌ On n'a PAS encore
L9  Risques         ← On exige            ❌ On n'a PAS encore
L10 Registre risques← On exige            ❌ On n'a PAS encore
L11 Config          ← On exige            ⚠️ Git mais pas formalisé
L12 Bug tracking    ← On exige            ⚠️ SOP existe, incomplète
L13 Maintenance     ← On exige            ❌ On n'a PAS encore
L14 SBOM            ← On exige            ❌ On n'a PAS encore
L15 Cybersécurité   ← On exige            ⚠️ RLS seulement
L16 Utilisabilité   ← On exige            ⚠️ Proto existe, pas formalisé
```

**Score d'alignement actuel : 0/16 complets, 6/16 partiels, 10/16 manquants**

> ⚠️ **On ne peut PAS exiger les 16 livrables aux prestataires si on n'a pas les nôtres.** Quand on leur livre le moteur + la DB + le proto, ils doivent recevoir AUSSI notre documentation normative. Sinon il y a un trou dans la chaîne de traçabilité et l'auditeur le verra immédiatement.

### Ce que ça change dans la priorité

Les L7 (traçabilité) et L9-L10 (risques) étaient déjà en 🔴 critique. Mais avec cette matrice d'alignement, **L1, L2, L5 doivent monter en priorité** — on ne peut pas envoyer les prestataires sans ces docs :

| Nouveau classement | Livrable | Pourquoi c'est critique |
|---|---|---|
| 🔴 **Critique** | L7 Traçabilité | L'auditeur la demande EN PREMIER |
| 🔴 **Critique** | L9+L10 Risques | IEC 62304 Classe B = risques OBLIGATOIRES |
| 🔴 **Critique** | L6 Résultats tests | Prouver que le moteur fonctionne = validation clinique |
| 🟠→🔴 | **L1 Plan de dev** | Les prestataires doivent comprendre COMMENT on a développé le moteur |
| 🟠→🔴 | **L2 SRS** | Les prestataires doivent savoir QUOI le moteur est censé faire |
| 🟠→🔴 | **L5 Plan V&V** | Les prestataires doivent savoir COMMENT on a validé le moteur |

---

## Gap détaillé par domaine

### 1. Architecture du repo

| Élément | État actuel | État cible | Action | Effort |
|---|---|---|---|---|
| Structure racine | ~15 dossiers en vrac | 8 dossiers structurés | Réorganiser selon ARCHITECTURE_REFLEXION.md | 🟢 1 jour |
| `proto/` | Éparpillé dans `LIVRABLES/review_ui_ux/` | Dossier top-level structuré avec composants, iterations, design system | Migrer + structurer | 🟡 2 jours |
| `handoff/` | N'existe pas | Kit prestataires (schema.sql, engine-api.md, ui-specs.md) | Créer | 🟡 2 jours |
| `_old/` | Fichiers legacy à la racine | Archivé proprement | Déplacer | 🟢 0.5 jour |
| `INDEX.md` | N'existe pas | Index avec mapping normatif | Créer | 🟢 0.5 jour |
| `.agent/workflows/` | 2 workflows créés | Workflows pour chaque process clé | Compléter au fil de l'eau | 🟢 Continu |

---

### 2. Documentation IEC 62304 (développement logiciel)

| Livrable IEC 62304 | § Norme | État | Action | Effort |
|---|---|---|---|---|
| **Plan de développement logiciel** | §5.1 | ❌ Manquant | Créer `docs/plan-dev.md` (modèle de cycle de vie, rôles, process) | 🟡 1 jour |
| **Spécifications d'exigences (SRS)** | §5.2 | ❌ Manquant | Créer `docs/srs.md` (exigences fonctionnelles, performance, sécurité) | 🟡 2 jours |
| **Architecture logicielle** | §5.3 | ⚠️ Partiel (`technique.md`) | Compléter `docs/technique.md` avec diagrammes UML, interfaces, flux | 🟡 1 jour |
| **Design détaillé** | §5.4 | ⚠️ Partiel (le code est le design) | Documenter chaque fonction moteur (inputs/outputs/logique) | 🟡 1 jour |
| **Plan de V&V** | §5.5 | ❌ Manquant | Créer `docs/validation.md` (plan de test : quoi, comment, critères pass/fail) | 🟡 1 jour |
| **Résultats de tests** | §5.7 | ⚠️ Tests existent mais pas documentés formellement | Formaliser les résultats des tests personas dans `moteur/sprints/` | 🟡 1 jour |
| **Matrice de traçabilité** | §5.6 | ❌ Manquante | Créer : Exigence → Design → Code → Test → Risque | 🔴 3 jours |
| **Liste SOUP** | §8 | ❌ Manquante | Créer `docs/soup.md` (tous les packages + version + licence + risque) | 🟡 1 jour |

**Sous-total IEC 62304** : ~11 jours de travail

---

### 3. Documentation ISO 14971 (gestion des risques)

| Livrable ISO 14971 | État | Action | Effort |
|---|---|---|---|
| **Analyse de risques logicielle** | ❌ Manquante | Créer `docs/risks.md` : pour chaque fonction moteur → que se passe-t-il si ça échoue ? Gravité × probabilité × mitigation | 🔴 3 jours |
| **Registre des risques** | ❌ Manquant | Inclure dans `docs/risks.md` : liste de tous les risques, statut, contrôles | 🟡 Inclus ci-dessus |
| **Risques liés à l'utilisabilité** | ❌ Manquant | Documenter dans `proto/` : quels risques si l'utilisateur ne comprend pas l'interface ? | 🟡 1 jour |

**Sous-total ISO 14971** : ~4 jours de travail

---

### 4. Qualité de la data (DB)

| Élément | État actuel | État cible | Action | Effort |
|---|---|---|---|---|
| **Scoring validé** | Fonctionnel mais pas validé formellement | Chaque V×question×score vérifié et signé par Dr. Rimaud | Sprint 1-2 (fiches scoring V1-V5) | 🔴 5 jours |
| **Activation rules auditées** | 240 rules, anomalies CCC identifiées | Toutes les rules vérifiées, conditions logiques corrigées | Sprint 1 + DECISIONS_CLINIQUES_REQUISES.md | 🟡 2 jours |
| **Content blocks — justifications macro** | 450 blocs micro mais pas de justifications structurelles | Ajouter les "pourquoi" macro (cf. liste ci-dessous) | 🔴 3 jours |
| **Backup table** | `micro_taches_backup_20260221` en base | Supprimée | 🟢 5 min |
| **cr_templates** | 0 rows | Templates CR médecin remplis | Sprint 3 | 🟡 2 jours |
| **Schema exportable** | Pas d'export | `handoff/schema.sql` + `handoff/seed/` | 🟢 0.5 jour |

#### Justifications macro manquantes (content_blocks à créer)

| Justification | Question à poser au Dr. Rimaud | Priorité |
|---|---|---|
| **Pourquoi 165 questions ?** | "Pourquoi ce nombre et pas 120 ou 200 ? Quel est le critère de complétude ? Quelles questions pourraient être retirées sans perte clinique ?" | 🔴 |
| **Pourquoi 5 vulnérabilités ?** | "Pourquoi ces 5 dimensions ? Pourquoi pas 4 ou 6 ? Est-ce basé sur une classification existante ?" | 🔴 |
| **Pourquoi cette répartition de MPs ?** | "V1=4, V2=4, V3=4, V4=6, V5=6. Pourquoi V4 et V5 en ont plus ? C'est proportionnel à la complexité ?" | 🔴 |
| **Pourquoi ces seuils min/max ?** | "Comment ont été calibrés les 4 niveaux par V ? Test empirique ? Littérature ? Intuition clinique ?" | 🔴 |
| **Pourquoi 3 niveaux + prévention ?** | "Standard/CCC/Critique + prévention = 4 états. Pourquoi pas 2 (urgent/pas urgent) ou 5 (plus fin) ?" | 🟠 |
| **Pourquoi ces types de MT ?** | "STRUC/SEC/MED/INFO/ORGA — d'où vient cette classification ? Y a-t-il un référentiel santé qui la sous-tend ?" | 🟠 |
| **Pourquoi ces poids (weights) ?** | "Toutes les V à 0.20 (20%) — c'est un choix d'équipondération. Pourquoi ? La fragilité du proche (V4) n'est pas plus importante ?" | 🟠 |
| **Pourquoi contributive vs non-contributive ?** | "Qu'est-ce qui détermine qu'une MT contribue à l'ASR vs qu'elle est 'juste utile' ?" | 🟡 |

**Sous-total data** : ~12.5 jours de travail

---

### 5. Proto UI/UX (Marwane)

| Élément | État actuel | État cible | Action | Effort |
|---|---|---|---|---|
| **Structure proto/** | Dans `LIVRABLES/review_ui_ux/` | `proto/` top-level structuré | Migrer et structurer | 🟡 1 jour |
| **Documentation composants** | Existe dans Storybook mais pas en Markdown | `proto/composants/` avec specs par composant | 🟡 3 jours |
| **Documentation parcours** | ARCHITECTURE_COUCHES_UI.md existe | `proto/parcours/` avec chaque flow documenté | 🟡 2 jours |
| **Système d'itérations** | Pas de versioning des choix UI | `proto/iterations/` avec checkpoints signés par Maël | 🟡 1 jour |
| **Doc handoff UI** | Pas formalisé | `handoff/ui-specs.md` (résumé pour prestataires) | 🟡 1 jour |
| **Composants avec normes UX** | Pas documenté | Choix d'affordance documentés (IEC 62366 léger) | 🟡 2 jours |

**Sous-total proto** : ~10 jours de travail

---

### 6. SOPs et process

| Élément | État | Action | Effort |
|---|---|---|---|
| **SOP-001 Modification data** | ✅ Créée | Tester en usage réel au Sprint 0 | 🟢 Inclus |
| **SOP-002 Incident data** | ✅ Créée | Idem | 🟢 Inclus |
| **SOP-003 Validation MP** | ✅ Créée | Idem | 🟢 Inclus |
| **SOP Sprint cycle** | ✅ Créée | Idem | 🟢 Inclus |
| **Registre de décisions** | ⚠️ Template existe, pas rempli | Remplir D-001 à D-005 avec les décisions structurantes déjà prises | 🟡 1 jour |
| **Gestion de configuration** | ⚠️ Git en place mais pas de convention de commits | Définir convention commits + branches | 🟢 0.5 jour |

**Sous-total process** : ~1.5 jour de travail

---

## Résumé par priorité (mis à jour avec alignement prestataires)

### 🔴 Critique — Bloquerait la certification ET le handoff prestataires

| # | Livrable | Action | Effort |
|---|---|---|---|
| 1 | **L7** Matrice de traçabilité | Exigence → Design → Code → Test → Risque | 3 jours |
| 2 | **L9+L10** Analyse + registre de risques (`docs/risks.md`) | ISO 14971 appliquée au moteur | 3 jours |
| 3 | **L6** Résultats de tests formalisés | Sprints 1-5 signés par Dr. Rimaud | 5 jours |
| 4 | **L1** Plan de développement (`docs/plan-dev.md`) | Notre cycle de vie documenté | 1 jour |
| 5 | **L2** SRS (`docs/srs.md`) | Exigences fonctionnelles du moteur | 2 jours |
| 6 | **L5** Plan V&V (`docs/validation.md`) | Comment on valide le moteur | 1 jour |
| 7 | Justifications macro en DB (content_blocks) | Pourquoi 165Q, 24 MPs, seuils | 3 jours |

**Total critique** : ~18 jours

### 🟠 Important — Nécessaire pour la cohérence

| # | Livrable | Action | Effort |
|---|---|---|---|
| 8 | **L3** Compléter `docs/technique.md` (architecture formelle) | Diagrammes, interfaces, flux | 1 jour |
| 9 | **L16** Dossier utilisabilité dans `proto/` | IEC 62366 léger + risques usage | 2 jours |
| 10 | Structure `proto/` + documentation composants | Marwane | 6 jours |
| 11 | Audit activation rules (CCC) | Correctifs + décisions cliniques | 2 jours |
| 12 | cr_templates (Sprint 3) | Templates CR médecin | 2 jours |

**Total important** : ~13 jours

### 🟡 À faire — Hygiène et fondation

| # | Livrable | Action | Effort |
|---|---|---|---|
| 13 | Réorganiser le repo (ARCHITECTURE.md) | Architecture cible | 1 jour |
| 14 | Créer `handoff/` (kit prestataires) | schema.sql, engine-api.md, ui-specs.md | 2 jours |
| 15 | INDEX.md | Navigation repo | 0.5 jour |
| 16 | **L8** Liste SOUP (`docs/soup.md`) | Packages + versions + licences | 1 jour |
| 17 | **L4** Design détaillé engine | Inputs/outputs par fonction | 1 jour |
| 18 | **L11** Convention commits + branches | Gestion de configuration formelle | 0.5 jour |
| 19 | **L12** Étendre SOP bug tracking | Pas juste data — toutes les anomalies | 0.5 jour |
| 20 | **L13** Plan de maintenance moteur | Process de release | 0.5 jour |
| 21 | **L14** SBOM | Générer depuis package-lock.json | 0.5 jour |
| 22 | **L15** Scan de sécurité formel | Au-delà du RLS | 0.5 jour |
| 23 | Supprimer backup table | Hygiène DB | 5 min |
| 24 | Registre décisions (D-001 à D-005) | Rétroactif | 1 jour |

**Total hygiène** : ~9 jours

---

## Timeline suggérée (sprints)

```
SPRINT 0 — AUDIT + STRUCTURE (1 semaine)
├── Réorganiser le repo (architecture cible)
├── Créer proto/ et handoff/
├── Supprimer backup table
├── INDEX.md + convention commits (L11)
├── Audit data complet (ce qu'on a vs ce qu'on veut)
└── Vérifier les 450 content_blocks (couverture)

SPRINT 1 — FONDAMENTAUX NORMATIFS (2 semaines)
├── 🔴 L1 Plan de développement (docs/plan-dev.md)
├── 🔴 L2 SRS (docs/srs.md)
├── 🔴 L5 Plan V&V (docs/validation.md)
├── 🔴 L9+L10 Analyse + registre de risques (docs/risks.md)
└── 🔴 Justifications macro avec Dr. Rimaud (content_blocks)

SPRINT 2 — SCORING + TRAÇABILITÉ (2 semaines)
├── 🔴 L6 Validation scoring V1-V5 (fiches signées)
├── 🔴 L7 Matrice de traçabilité complète
├── Audit activation rules (CCC)
├── L8 Liste SOUP (docs/soup.md)
└── L14 SBOM (généré auto)

SPRINT 3 — PROTO + CR (2 semaines)
├── L16 Dossier utilisabilité dans proto/
├── Structure proto/ complète (Marwane)
├── Documentation composants + parcours
├── cr_templates (Sprint 3)
└── Handoff UI docs (handoff/ui-specs.md)

SPRINT 4 — CONSOLIDATION + HANDOFF (1 semaine)
├── L4 Design détaillé engine (README moteur)
├── L13 Plan de maintenance moteur
├── L12 Étendre SOP bug tracking
├── L15 Scan de sécurité formel
├── Validation croisée moteur ↔ proto ↔ DB
├── Export handoff/ complet pour prestataires
└── Registre décisions rétroactif (D-001 à D-005)
```

**Total estimé** : ~8 semaines = ~40 jours de travail effectif (24 livrables dont les 16 L-standards)

> **Le point clé** : Le moteur MARCHE. Ce qu'on fait ici c'est le METTRE AU STANDARD pour que les prestataires puissent s'appuyer dessus sans risquer de trou dans la chaîne de conformité.

> **La règle** : On ne livre RIEN aux prestataires sans les L-docs qui vont avec. Moteur sans L2 (SRS) = ils ne savent pas QUOI il fait. Moteur sans L9 (risques) = ils ne savent pas CE QUI PEUT CASSER.

---

## Estimation réaliste — Capacité, coûts, roadmap

> **Basé sur** : BP v5, GTM v1.3, contexte PRAGMA v1.0, et la réalité opérationnelle.

### Capacité PRAGMA — Combien de temps pour Monka ?

**Contexte réel** :
- 2 fondateurs, 100% full-time, **10h+/jour** chacun = ~20h/jour total = ~440h/mois
- Antonin = moteur clinique + standards + architecture
- Marwane = proto UI/UX + design system + composants
- Méthode IA-assistée (Antigravity/Claude) = **levier ×3-5** sur la productivité par rapport à un dev classique

**Répartition du temps entre projets** :

| Projet | % du temps Antonin | % du temps Marwane | Justification |
|---|---|---|---|
| **Monka** | **50-60%** | **40-50%** | Client principal, deal le plus gros (~50K€), le plus complexe, le plus stratégique |
| **Flash Transport** | **10-15%** | **10-15%** | ~20% de la complexité de Monka, 2 apps (Portail RH + Stockage), phase de déploiement prochain |
| **Développement PRAGMA** | **15-20%** | **25-30%** | Commercial (LinkedIn, cold email, referral), site web (Marwane lead), PRAGMA Score, process internes |
| **Admin + formation continue** | **10%** | **10%** | Compta, TVA, admin SAS, veille IA, montée en compétences |

**En heures sur Monka** :

| Fondateur | Heures/jour Monka | Heures/semaine | Heures/mois |
|---|---|---|---|
| Antonin | ~5-6h | ~27-33h | ~120-140h |
| Marwane | ~4-5h | ~22-27h | ~95-115h |
| **Total PRAGMA** | **~9-11h/jour** | **~50-60h/semaine** | **~215-255h/mois** |

> **Comparaison** : Un dev classique = ~7h utiles/jour × 22 jours = ~154h/mois. PRAGMA avec levier IA = ~225h/mois de temps effectif avec un output équivalent à ~675-1125h (levier ×3-5). C'est une capacité de production **massive**.

### Roadmap recalibrée avec cette capacité

Les 40 jours estimés dans le gap analysis = jours de travail "classique" (~7h). Avec la capacité PRAGMA :

| Sprint | Durée classique | Durée réelle PRAGMA | Ce qui fait la différence |
|---|---|---|---|
| **Sprint 0** — Audit + structure | 1 semaine | **3-4 jours** | Réorganisation repo + audit data = fortement IA-assisté |
| **Sprint 1** — Fondamentaux normatifs | 2 semaines | **1 semaine** | L1, L2, L5 = documentation, forte synergie IA. Risques (L9) = réflexion clinique avec Dr. Rimaud en direct |
| **Sprint 2** — Scoring + traçabilité | 2 semaines | **1.5 semaines** | Validation clinique avec Dr. Rimaud = temps incompressible (père ou pas, il faut qu'il réfléchisse). Matrice traçabilité = semi-automatisable |
| **Sprint 3** — Proto + CR | 2 semaines | **1.5 semaines** | Marwane fait le proto en parallèle. Documentation composants = systématisable |
| **Sprint 4** — Consolidation | 1 semaine | **3-4 jours** | Handoff + SBOM + dernières docs = automatisable |

**Total réaliste : ~5-6 semaines** (au lieu de 8 en estimation classique)

### ⚠️ Est-ce que faire attendre les prestataires 2 mois est smart ?

**Non. Et voici pourquoi** :

| Argument contre | Impact |
|---|---|
| **Monka a des patients sur V1** | Chaque mois = risque sur une app non standardisée en production |
| **Les prestataires ont leur propre planning** | Si on dit "attendez 2 mois", ils prennent un autre projet et on perd la fenêtre |
| **La standardisation et le build ne sont pas séquentiels** | On peut standardiser notre moteur PENDANT qu'ils commencent l'architecture MyMonka V2 |
| **L'architecture prestataire influence nos choix** | Si on finit la doc sans leur input (notamment HDS), on risque de devoir refaire |

**Approche recommandée — Démarrage parallèle** :

```
SEMAINE 1-2 (PRAGMA seul)
├── Sprint 0 : Audit + restructuration repo
├── Sprint 1 début : L1 (plan dev) + L2 (SRS) → les prestataires EN ONT BESOIN pour commencer
└── Envoi aux prestataires : PREREQUIS_PRESTATAIRES_EXTERNES.md + premier draft L1/L2

SEMAINE 3-4 (PRAGMA + Prestataires en parallèle)
├── Sprint 1 suite : L5 (V&V) + L9/L10 (risques) + justifications macro
├── Prestataires : Répondent à nos pré-requis, proposent leur architecture
├── Session d'alignement : Nos contraintes DB/HDS ↔ leur architecture
└── Marwane : Proto/composants en parallèle

SEMAINE 5-8 (Tous en parallèle)
├── Sprint 2-3 : Validation scoring + traçabilité + proto
├── Prestataires : Build MyMonka V2 en s'appuyant sur nos livrables progressifs
├── Checkpoints CP1 (architecture) dès semaine 5-6
└── Sprint 4 : Consolidation + handoff final
```

> **Le gain** : Les prestataires démarrent 4-6 semaines plus tôt. On leur livre les docs fondamentaux (L1, L2, SRS) dès la semaine 2, pas à la semaine 8.

> **Pricing** : Voir `docs/PRICING_DEAL_PRAGMA.md` pour l'estimation du deal et la valorisation de la mission.

---

*Gap Analysis — PRAGMA × Monka — Mars 2026*
*Aligné avec les 16 livrables de PREREQUIS_PRESTATAIRES_EXTERNES.md*
*À revoir après chaque sprint terminé*
