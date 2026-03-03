# 🚀 Roadmap Sprints — Moteur Clinique Monka

> **Auteur** : Antonin Rimaud (PRAGMA)
> **Date** : 3 mars 2026
> **Statut** : Document vivant — mis à jour à chaque fin de sprint
> **Méthode** : Human-in-the-Loop × IA — itération rapide, validation clinique systématique
> **Collaborateurs** : Antonin (tech + orchestration) × Dr. Monka (validation clinique + enrichissement)

---

## 📌 Ce document en 30 secondes

Ce document est le **plan de bataille unique** pour faire passer le moteur Monka d'un moteur fonctionnel à un **moteur cliniquement blindé, enrichi et testé sous tous les angles**.

Il regroupe en un seul endroit :

| Section | Ce qu'elle couvre |
|---|---|
| [Vision](#1-vision) | Pourquoi on fait ça, quel est l'objectif final |
| [Méthode de travail](#2-méthode-de-travail-antonin--dr-monka) | Comment on collabore, qui fait quoi, le cycle itératif |
| [Sprint Board](#3-sprint-board) | Les sprints détaillés avec estimation, livrables et critères de succès |
| [Guide Dr. Monka](#4-guide-dr-monka--ce-que-tu-dois-faire-concrètement) | Version vulgarisée — actions concrètes, temps estimés par semaine |
| [Suivi](#5-suivi-et-traçabilité) | Comment on trace la progression, les décisions, les validations |
| [Documentation & Certification](#6-documentation--certification---le-dossier-blindé) | Templates, standards med-tech, quoi produit chaque sprint, dossier final |

---

## 1. Vision

### Le moteur aujourd'hui

```
165 questions → 5 scores de vulnérabilité → 24 micro-parcours → 198 recos → 369 micro-tâches
              → 235 règles d'activation (dont CCC)
              → 4 niveaux de graduation (prévention → critique)
              → Overlay par âge et type d'aidance
```

**Le moteur fonctionne.** Il calcule, il active, il gradue. Techniquement, il est solide.

### Ce qu'il manque pour être excellent

| Axe | Ce qu'il faut faire | Pourquoi c'est critique |
|---|---|---|
| 🔒 **Solidité technique** | Audit complet des données, Token Guard sur chaque pipeline | Un seul bug de scoring = perte de crédibilité totale |
| 🩺 **Vérification clinique** | Chaque règle, chaque reco, chaque MT questionnée et validée par Dr. Monka | Le moteur ne vaut que ce que le clinicien valide |
| 📝 **Enrichissement** | Explications cliniques, sens de chaque règle, appui scientifique | Un médecin ne suivra une reco que s'il comprend POURQUOI |
| 🧪 **Test** | Scénarios cliniques réels, edge cases, stress test du moteur | Détecter ce qui passe entre les mailles avant les patients |
| 🎯 **Pertinence** | Challenger la pertinence de chaque MP, de chaque MT, de chaque acteur | Mieux vaut 15 MPs excellents que 24 moyens |

### L'objectif final

> **Un moteur que Dr. Monka peut présenter à N'IMPORTE QUEL comité scientifique et défendre chaque décision, chaque seuil, chaque recommandation — parce que tout a été questionné, testé et documenté.**

---

## 2. Méthode de travail — Antonin × Dr. Monka

### Le principe : Human-in-the-Loop × IA

```
┌─────────────────────────────────────────────────────────────┐
│                    BOUCLE ITÉRATIVE                          │
│                                                              │
│   ┌──────────┐    ┌───────────┐    ┌──────────────┐         │
│   │ ANTONIN  │───▶│ DR. MONKA │───▶│   ANTONIN    │──┐     │
│   │ Prépare  │    │ Valide    │    │  Intègre     │  │     │
│   │ Questionne│    │ Enrichit  │    │  Corrige     │  │     │
│   │ Structure │    │ Challenge │    │  Documente   │  │     │
│   └──────────┘    └───────────┘    └──────────────┘  │     │
│        ▲                                              │     │
│        └──────────────────────────────────────────────┘     │
│                                                              │
│   Chaque cycle = 1 sprint (3-5 jours)                       │
│   Chaque sprint = un livrable vérifiable                     │
└─────────────────────────────────────────────────────────────┘
```

### Rôles

| Qui | Fait quoi | Outils |
|---|---|---|
| **Antonin** | Prépare les questions, structure les fiches de validation, lance les audits automatisés, intègre les corrections, documente les décisions | Agent IA + Code + Simulateur |
| **Dr. Monka** | Répond aux questions cliniques, valide les seuils, enrichit les explications, challenge les règles, certifie chaque élément | Simulateur + Fiches de validation + Son expertise |
| **Agent IA** | Exécute les audits data, génère les fiches de questions, vérifie la cohérence cross-data, détecte les incohérences | Scripts + Supabase + Code moteur |

### Le cycle d'un sprint

```
Jour 1-2  │  ANTONIN prépare
          │  → Génère les fiches de validation du sprint
          │  → Lance les audits automatisés
          │  → Identifie les questions à poser
          │  → Pré-remplit ce qui est automatisable
          │
Jour 2-3  │  DR. MONKA valide
          │  → Répond aux questions cliniques
          │  → Enrichit les explications
          │  → Signale les corrections
          │  → ✅ ou ❌ chaque élément
          │
Jour 3-5  │  ANTONIN intègre
          │  → Applique les corrections dans le moteur
          │  → Met à jour les données Supabase
          │  → Documente les décisions prises
          │  → Prépare le sprint suivant
          │
Jour 5    │  CHECKPOINT
          │  → Revue rapide ensemble (15-30 min)
          │  → Validation du livrable du sprint
          │  → Go/No-Go pour le sprint suivant
```

---

## 3. Sprint Board

> **Convention** : chaque sprint dure **5 à 10 jours** (temps cumulé, pas consécutif — on inclut les jours où on ne bosse pas dessus). Les estimations horaires sont en travail effectif — on a volontairement estimé **large** pour absorber les imprévus.
>
> **Pourquoi les estimations sont larges** : en med-tech, il vaut mieux livrer en avance que promettre et être en retard. Si un sprint prend moins de temps → tant mieux, on enchaîne. Si c'est compliqué → on a de la marge.

---

### 🏁 SPRINT 0 — Audit Data & Sécurité Moteur
**Durée estimée** : 3-5 jours | **Antonin** : ~6-8h | **Dr. Monka** : ~1-2h

> **Objectif** : S'assurer que le socle de données est sain avant de construire dessus.

| Tâche | Responsable | Temps | Livrable |
|---|---|---|---|
| Audit exhaustif des 18 tables Supabase (intégrité, orphelins, doublons) | Antonin + IA | 2h | `audit_data_sprint0.md` |
| Vérification des opérateurs moteur (`_multi`, `junction: "OR"`, etc.) | Antonin + IA | 2h | Liste des anomalies corrigées |
| Vérification Token Guard : chaque pipeline de données (question → score → règle → MP → reco → MT) | Antonin + IA | 1h | Rapport de traçabilité complète |
| Revue rapide avec Dr. Monka : les anomalies trouvées sont-elles des erreurs ou des choix ? | Dr. Monka | 1h | Décisions documentées |
| Fix des anomalies dans Supabase | Antonin | 1h | Base de données nettoyée |

**Critère de succès** : 0 anomalies non-documentées dans la base de données.

**Token Guard** : Chaque correction = entrée dans le log de décisions.

---

### 🩺 SPRINT 1 — Validation Clinique du Scoring
**Durée estimée** : 5-8 jours | **Antonin** : ~4-6h | **Dr. Monka** : ~4-6h

> **Objectif** : Chaque score de vulnérabilité (V1-V5) est questionné, chaque seuil est justifié, chaque poids est argumenté.

| Tâche | Responsable | Temps | Livrable |
|---|---|---|---|
| Générer les fiches de validation scoring (1 fiche par V, avec les questions) | Antonin + IA | 1h | 5 fiches de validation |
| **Dr. Monka valide chaque V** : les poids C1/C2 sont corrects ? Les seuils faible/modéré/élevé/critique sont bons ? | Dr. Monka | 3h | 5 fiches signées ✅/❌ |
| Intégrer les corrections de seuils/poids si nécessaire | Antonin | 1h | Scoring mis à jour |
| Tester 3 scénarios cliniques extrêmes (un profil qui devrait scorer critique, un faible, un edge case) | Antonin + Dr. Monka | 1h | 3 scénarios documentés |
| Documenter la méthodologie de scoring en langage médecin | Antonin + IA | 1h | Annexe au `METHODOLOGIE_SCORING.md` |

**Critère de succès** : Dr. Monka peut expliquer pourquoi chaque seuil est là où il est.

**Ce que Dr. Monka doit se demander** :
- "Si un aidant score 7/10 sur V1, est-ce que ça correspond à ce que je verrais en consultation ?"
- "Un score critique en V4, ça déclenche quoi concrètement ? C'est cohérent ?"
- "Les questions qui comptent le plus (C2) sont-elles vraiment les plus importantes cliniquement ?"

---

### 📋 SPRINT 2 — Validation des Règles d'Activation
**Durée estimée** : 7-10 jours | **Antonin** : ~5-7h | **Dr. Monka** : ~6-8h

> **Objectif** : Chaque règle d'activation est questionnée — est-elle pertinente ? Le seuil est-il bon ? La graduation standard/CCC/critique est-elle cohérente ?

| Tâche | Responsable | Temps | Livrable |
|---|---|---|---|
| Générer les fiches de validation par catégorie de règles (73 catégories regroupées par MP) | Antonin + IA | 2h | Fiches de validation par MP |
| **Dr. Monka valide les règles** — par lot de 5 catégories par session | Dr. Monka | 5h | Validation progressive (paliers de 5) |
| Questions ciblées : "Cette combinaison CCC est-elle pertinente ?", "Ce seuil critique est-il trop/pas assez sensible ?" | Dr. Monka | Inclus ci-dessus | Réponses documentées |
| Intégrer les corrections dans les tables Supabase | Antonin | 2h | Règles mises à jour |
| Proposer 5 nouvelles CCC basées sur des patterns cliniques (Dr. Monka challenge et valide) | Antonin + Dr. Monka | 1h | 5 nouvelles règles CCC candidates |

**Critère de succès** : 100% des catégories de règles passées en revue au moins une fois.

**Ce que Dr. Monka doit se demander** :
- "Si un aidant coche X + Y + Z, est-ce que le moteur réagit correctement ?"
- "Y a-t-il des combinaisons dangereuses que le moteur ne détecte pas ?"
- "Les 4 niveaux (prévention → critique) sont-ils bien calibrés ?"

---

### 💬 SPRINT 3 — Enrichissement des Explications Cliniques
**Durée estimée** : 7-10 jours | **Antonin** : ~3-5h | **Dr. Monka** : ~6-10h

> **Objectif** : Chaque recommandation et chaque micro-tâche a une explication clinique compréhensible — le "pourquoi" derrière le "quoi faire".

| Tâche | Responsable | Temps | Livrable |
|---|---|---|---|
| Extraire toutes les recos sans `sens_clinique` renseigné | Antonin + IA | 30min | Liste priorisée |
| **Dr. Monka rédige les sens cliniques** par lot de 20 recos/session | Dr. Monka | 4h | Textes validés |
| Enrichir les MTs les plus critiques avec un appui clinique (source, guideline, référence) | Dr. Monka | 2h | MTs enrichies |
| Intégrer dans Supabase + vérifier l'affichage dans le simulateur | Antonin | 1h | Données mises à jour |
| Relecture croisée : Antonin challenge la clarté des explications ("un médecin généraliste comprend-il ?") | Antonin + Dr. Monka | 1h30 | Explications affinées |

**Critère de succès** : 100% des recommandations ont un `sens_clinique` renseigné. Les 50 MTs les plus critiques ont un appui clinique.

**Ce que Dr. Monka doit se demander** :
- "Si un médecin traitant lit cette reco, comprend-il POURQUOI c'est recommandé ?"
- "Existe-t-il une référence (HAS, guideline, consensus) qui appuie cette reco ?"
- "L'explication est-elle trop jargonneuse ou trop simpliste ?"

---

### 🧪 SPRINT 4 — Stress Test Clinique
**Durée estimée** : 5-8 jours | **Antonin** : ~5-7h | **Dr. Monka** : ~4-6h

> **Objectif** : Soumettre le moteur à des cas cliniques réels ou réalistes pour détecter les failles, les incohérences, les absurdités.

| Tâche | Responsable | Temps | Livrable |
|---|---|---|---|
| Dr. Monka crée 5 "vrais patients" typiques (pas les personas de test — de vrais cas cliniques anonymisés) | Dr. Monka | 2h | 5 cas cliniques |
| Antonin passe chaque cas dans le simulateur et documente le résultat complet | Antonin | 2h | 5 rapports simulateur |
| **Dr. Monka analyse les résultats** : "Le moteur a-t-il bien réagi ? Quelque chose manque ? Quelque chose est absurde ?" | Dr. Monka | 2h | Rapport de conformité clinique |
| Créer 3 cas "piège" (edge cases cliniques qui devraient stresser le moteur) | Dr. Monka | 30min | 3 cas piège |
| Tester les edge cases et documenter les résultats | Antonin + Dr. Monka | 1h30 | Résultats + corrections |
| Intégrer les corrections identifiées | Antonin | 1h | Moteur corrigé |

**Critère de succès** : Le moteur produit des résultats cliniquement cohérents sur 8/8 cas testés. Les anomalies identifiées sont corrigées ou documentées comme "acceptées".

**Ce que Dr. Monka doit se demander** :
- "Si je voyais ce patient en consultation, est-ce que j'arriverais aux mêmes conclusions que le moteur ?"
- "Le moteur a-t-il manqué quelque chose d'évident ?"
- "Le moteur a-t-il sur-réagi quelque part ?"

---

### 🎯 SPRINT 5 — Pertinence & Challenge Final
**Durée estimée** : 4-7 jours | **Antonin** : ~3-5h | **Dr. Monka** : ~4-6h

> **Objectif** : Dernier regard critique avant de considérer le moteur comme "validé V1". Challenge global de la pertinence.

| Tâche | Responsable | Temps | Livrable |
|---|---|---|---|
| Revue des 24 MPs : chacun est-il pertinent ? Y en a-t-il à fusionner, supprimer, ajouter ? | Dr. Monka | 2h | Arbitrage documenté |
| Revue du CR Médecin : est-il utile tel quel pour un médecin traitant ? Que manque-t-il ? | Dr. Monka | 1h | Feedback structuré |
| Challenge : "Si tu devais enlever 5 MPs, lesquels ?" (force la priorisation) | Dr. Monka | 30min | Top 5 les moins indispensables |
| Challenge : "Quelles 3 choses feraient dire à un médecin 'wow, ce truc est utile' ?" | Dr. Monka | 30min | Top 3 arguments cliniques |
| Synthèse finale : ce qui est validé, ce qui doit évoluer, ce qui attend M2 | Antonin + Dr. Monka | 1h | `CERTIFICATION_MOTEUR_V1.md` |
| Documentation des décisions et de la traçabilité complète | Antonin | 1h30 | Dossier de traçabilité |

**Critère de succès** : Le document `CERTIFICATION_MOTEUR_V1.md` est signé conjointement par Antonin et Dr. Monka.

---

### Vue d'ensemble des sprints

```
SPRINT 0 ──── SPRINT 1 ──── SPRINT 2 ──── SPRINT 3 ──── SPRINT 4 ──── SPRINT 5
  Audit         Scoring       Règles        Explications    Stress Test   Challenge
  Data          V1-V5         Activation    Cliniques       Clinique      Final
                                                                          
  3-5 j         5-8 j         7-10 j        7-10 j          5-8 j         4-7 j
                                                                          
  ───────────────────────────────────────────────────────────────────────
  TOTAL ESTIMÉ : 31-48 jours calendaires
  ESTIMATION RÉALISTE : ~6-8 semaines (avec les jours off, les imprévus)
                                                                          
  Antonin : ~26-38h total | Dr. Monka : ~25-38h total
```

> **Rythme estimé réaliste** : en travaillant sur les heures hors-pro (soirs + week-ends), un sprint tous les 7-10 jours. → **Tout terminé en ~6-8 semaines.**
>
> **Scénario optimiste** : si tout se passe bien et qu'on est à fond → 5 semaines.
> **Scénario réaliste** : avec la vie, les imprévus → 7 semaines.
> **Scénario pire cas** : si des sprints révèlent des problèmes majeurs → 9 semaines + sous-sprints de correction.

---

## 4. Guide Dr. Monka — Ce que tu dois faire concrètement

> **Cette section est pour toi, Papa.** Pas de jargon technique. Juste ce qu'il faut faire, combien de temps ça prend, et quand.

### Ta charge de travail estimée

| Sprint | Ce que tu fais | Temps estimé | Quand |
|---|---|---|---|
| **Sprint 0** | Antonin te montre les anomalies trouvées, tu dis si c'est une erreur ou un choix | ~1-2h | 1 session de 1-2h |
| **Sprint 1** | Tu relis les 5 fiches de scoring, tu valides ou corriges les seuils et les poids | ~4-6h | 2-3 sessions de 1h30-2h |
| **Sprint 2** | Tu relis les règles d'activation par paquet de 5. "Cette règle est pertinente ? Ce seuil est bon ?" | ~6-8h | 3-4 sessions de 1h30-2h |
| **Sprint 3** | Tu écris les explications cliniques : pourquoi cette reco, quelle est la logique médicale | ~6-10h | 3-5 sessions de 1h30-2h |
| **Sprint 4** | Tu crées 5 vrais cas patients et tu regardes si le moteur réagit bien | ~4-6h | 2-3 sessions de 1h30-2h |
| **Sprint 5** | Tu prends du recul — est-ce que le moteur fait sens dans son ensemble ? | ~4-6h | 2-3 sessions de 2h |

**Total : ~25-38 heures** réparties sur 6-8 semaines ≈ **~4-5h par semaine**.

### Comment ça se passe concrètement

```
1. Antonin te prépare un "paquet" de travail
   → Des fiches claires avec des questions précises
   → Tu n'as PAS à chercher les données, tout est prêt

2. Tu ouvres le simulateur pour visualiser
   → Tu vois le moteur en action
   → Tu peux tester toi-même des réponses

3. Tu réponds aux questions / valides / corriges
   → Sur les fiches (oui/non, commentaire, correction)
   → Tu peux le faire à ton rythme

4. Antonin intègre tes retours
   → Les corrections sont appliquées dans le moteur
   → Tu vois le résultat au sprint suivant

5. Point rapide ensemble (15-30 min)
   → On valide le sprint
   → On lance le suivant
```

### Tes outils

| Outil | À quoi ça sert | Comment y accéder |
|---|---|---|
| **Simulateur** | Voir le moteur en action — tester des profils, voir les MPs activés, les scores | Lien Vercel (toujours accessible) |
| **Fiches de validation** | Les questions précises auxquelles répondre — format structuré | Antonin prépare et t'envoie (PDF ou lien) |
| **WhatsApp/Téléphone** | Questions rapides, précisions | Comme d'habitude |
| **Point visio 15-30 min** | Validation de fin de sprint | À planifier ensemble |

---

## 5. Suivi et traçabilité

### Tableau de bord des sprints

| Sprint | Statut | Date début | Date fin | Livrable | Signé |
|---|---|---|---|---|---|
| Sprint 0 — Audit Data | ⬜ À faire | — | — | `audit_data_sprint0.md` | ⬜ |
| Sprint 1 — Scoring | ⬜ À faire | — | — | 5 fiches scoring validées | ⬜ |
| Sprint 2 — Règles | ⬜ À faire | — | — | 73 catégories revues | ⬜ |
| Sprint 3 — Explications | ⬜ À faire | — | — | Sens clinique 100% renseigné | ⬜ |
| Sprint 4 — Stress Test | ⬜ À faire | — | — | 8 cas testés + rapport | ⬜ |
| Sprint 5 — Challenge | ⬜ À faire | — | — | `CERTIFICATION_MOTEUR_V1.md` | ⬜ |

### Registre de décisions

Chaque décision prise pendant un sprint est enregistrée :

| # | Sprint | Décision | Justification | Par |
|---|---|---|---|---|
| D-001 | — | — | — | — |

> Ce registre est rempli au fur et à mesure — c'est la **mémoire** du projet.

### Règles de traçabilité (Token Guard)

- ✅ **Chaque correction** dans la base = entrée dans le registre de décisions
- ✅ **Chaque validation** de Dr. Monka = fiche signée et archivée
- ✅ **Chaque sprint terminé** = livrable documenté + checkpoint signé
- ✅ **Chaque anomalie** trouvée = documentée (corrigée OU acceptée, jamais ignorée)
- ✅ **Zéro modification** sans trace — tout est versionné dans Git

---

## 6. Documentation & Certification — Le Dossier Blindé

> **Pourquoi cette section est critique** : dans une startup tech/med, un moteur clinique manipule des données qui influencent des décisions de santé. La qualité de la data et la traçabilité de chaque décision ne sont pas optionnelles — c'est une **obligation éthique et réglementaire**. Un seul seuil mal calibré, une seule règle incohérente = un parcours patient inadapté.

### 6.1 — Le raisonnement

Quand on fait du logiciel médical, il y a 3 niveaux de "blindage" :

| Niveau | Ce que ça couvre | Pertinent pour nous ? |
|---|---|---|
| **Niveau 1 — Data Integrity** | Chaque donnée est correcte, traçable, vérifiée | ✅ **OBLIGATOIRE** — c'est le minimum |
| **Niveau 2 — Process Quality** | Chaque décision est documentée, chaque modification est tracée, des templates standards sont utilisés | ✅ **ON LE FAIT** — c'est notre avantage compétitif |
| **Niveau 3 — Certification externe** | Un organisme externe audite et certifie (ISO 13485, marquage CE, HAS) | ⬜ Pas maintenant — quand il y aura des patients réels |

**Notre positionnement : on fait le Niveau 2 aussi bien qu'un Niveau 3 le demanderait**, sans payer 30K€ de certification. Quand le moment viendra de passer au Niveau 3, on aura 95% du travail déjà fait.

### 6.2 — Les templates qui structurent notre travail

**6 templates repensés de zéro**, centralisés dans `MOTEUR/_TEMPLATES/`. Chaque template est auto-suffisant, questionneur, signable, cohérent et auditable :

| # | Template | Fichier | Quand | Ce qu'il fait |
|---|---|---|---|---|
| TPL_01 | **Audit Data** | `MOTEUR/_TEMPLATES/TPL_01_AUDIT_DATA.md` | Sprint 0, puis à chaque modif data | Vérifie intégrité, orphelins, doublons, pipeline complet |
| TPL_02 | **Validation Scoring** | `MOTEUR/_TEMPLATES/TPL_02_VALIDATION_SCORING.md` | Sprint 1 (1 fiche par V) | Questionne seuils, poids, scénarios test, sens clinique |
| TPL_03 | **Validation MP** | `MOTEUR/_TEMPLATES/TPL_03_VALIDATION_MP.md` | Sprint 2+ (1 fiche par MP) | 6 actions + affichage simulateur + checklist 8 points |
| TPL_04 | **Stress Test** | `MOTEUR/_TEMPLATES/TPL_04_STRESS_TEST.md` | Sprint 4 (1 fiche par cas) | Cas clinique → résultat moteur → analyse → verdict |
| TPL_05 | **Decision Record** | `MOTEUR/_TEMPLATES/TPL_05_DECISION.md` | À chaque décision | Contexte, options, choix, impact, réversibilité |
| TPL_06 | **Sprint Report** | `MOTEUR/_TEMPLATES/TPL_06_SPRINT_REPORT.md` | Fin de chaque sprint | Rapport complet : travail + qualité + décisions + clôture |

> [!IMPORTANT]
> Tout est dans **un seul endroit** : `MOTEUR/`. Les standards sont dans `_STANDARDS/`, les templates dans `_TEMPLATES/`, les sprints dans `SPRINTS/`. Aucun doc n'est créé sans utiliser le template correspondant.

### 6.3 — Ce que chaque sprint produit comme documentation

| Sprint | Documents produits | Template utilisé | Ce que ça prouve |
|---|---|---|---|
| **Sprint 0** | `audit_data_sprint0.md` + Registre anomalies | Format audit PRAGMA | Les données sont propres, chaque anomalie a été traitée |
| **Sprint 1** | 5 fiches scoring V1-V5 signées + ADRs seuils | Fiche scoring (dérivée _TEMPLATE_MP) + ADR | Chaque seuil est justifié cliniquement, chaque poids argumenté |
| **Sprint 2** | 24 fiches MP (6 actions chacune) signées | `_TEMPLATE_MP.md` (362 lignes / fiche) | Chaque règle, chaque catégorie, chaque MT a été questionnée et validée |
| **Sprint 3** | Corpus `sens_clinique` complet + sources | Champs enrichis en base + export | Chaque reco a une justification clinique documentée |
| **Sprint 4** | 8 rapports de stress test + verdicts | Format rapport clinique | Le moteur réagit correctement à des cas réels |
| **Sprint 5** | `CERTIFICATION_MOTEUR_V1.md` | Certification finale | Le moteur est validé dans son ensemble, avec toutes les preuves |

### 6.4 — Le dossier de certification final

À la fin du Sprint 5, on aura un **dossier complet** que n'importe quel auditeur, investisseur ou comité scientifique peut lire :

```
DOSSIER_CERTIFICATION_MOTEUR_V1/
│
├── 📋 CERTIFICATION_MOTEUR_V1.md          ← Certificat final signé A + Dr. M
│
├── 📊 1_AUDIT_DATA/
│   ├── audit_data_sprint0.md              ← Audit intégrité 18 tables
│   ├── registre_anomalies.md              ← Chaque anomalie + décision
│   └── rapport_pipeline.md               ← Traçabilité Q→Score→Règle→MP→Reco→MT
│
├── 🩺 2_VALIDATION_SCORING/
│   ├── fiche_V1_sante_mentale.md          ← Signée Dr. Monka
│   ├── fiche_V2_ressources.md
│   ├── fiche_V3_sante_physique.md
│   ├── fiche_V4_vie_quotidienne.md
│   ├── fiche_V5_parcours_soins.md
│   ├── ADR_seuils_scoring.md              ← Pourquoi ces seuils
│   └── scenarios_extremes.md              ← 3 cas testés
│
├── ⚙️ 3_VALIDATION_REGLES/
│   ├── MP01_fiche_validation.md           ← Template 362 lignes, signé
│   ├── MP02_fiche_validation.md
│   ├── ...                                ← 24 fiches MP
│   ├── MP24_fiche_validation.md
│   └── rapport_CCC.md                     ← Combinaisons cliniques validées
│
├── 📝 4_ENRICHISSEMENT/
│   ├── export_sens_clinique.md             ← 100% des recos avec justification
│   ├── sources_cliniques.md               ← Références HAS, guidelines, consensus
│   └── rapport_completude.md              ← % de couverture
│
├── 🧪 5_STRESS_TEST/
│   ├── cas_clinique_01.md                 ← Cas réel anonymisé + résultat moteur
│   ├── ...                                ← 8 cas
│   ├── cas_clinique_08.md
│   └── rapport_conformite.md              ← Verdict clinique par cas
│
├── 🎯 6_CHALLENGE_FINAL/
│   ├── revue_pertinence_MP.md             ← 24 MPs : garder/fusionner/supprimer
│   ├── revue_CR_medecin.md                ← Feedback sur le produit final
│   └── synthese_decisions.md              ← Toutes les décisions du projet
│
└── 📎 ANNEXES/
    ├── registre_decisions.md               ← D-001 à D-XXX
    ├── engine_explainer.md                ← Doc technique moteur
    ├── methodologie_scoring.md            ← Méthodo scientifique
    ├── KERNEL_V6.md                       ← Référentiel moteur
    └── audit_db.md                        ← Audit base de données
```

> **Ce dossier, c'est la PREUVE que le moteur n'est pas un prototype bricolé.** C'est un système clinique dont chaque composant a été questionné, validé et documenté par un médecin.

### 6.5 — Standards med-tech qu'on respecte (et lesquels on ne prétend pas respecter)

| Standard | Ce que c'est | On le respecte ? | Comment |
|---|---|---|---|
| **IEC 62304** | Cycle de vie logiciel pour dispositifs médicaux | ⚠️ **Partiellement** | Notre cycle sprint + documentation + traçabilité couvre les exigences Class A |
| **ISO 13485** | Système de management qualité dispositifs médicaux | ⚠️ **L'esprit, pas la lettre** | Nos fiches de validation + registre de décisions = le noyau d'un QMS |
| **ISO 42001** | Management de l'IA | ✅ **Niveau 2** | SOPs versionnées, registre décisions, Token Guard, traçabilité |
| **HAS référentiels** | Haute Autorité de Santé — standards cliniques français | ✅ **Aligné** | Les sens cliniques réfèrent aux guidelines HAS quand applicable |
| **NIST AI RMF** | Framework de gestion des risques IA (US) | ⚠️ **Partiellement** | `anglesmorts.md` couvre les risques identifiés |
| **Marquage CE (MDR)** | Dispositif médical européen | ❌ **Pas encore** | Prérequis : données patients réelles, essais cliniques |

> [!TIP]
> **L'argument massif** : on ne prétend PAS être certifié ISO 13485 ou marqué CE. Mais on peut montrer que notre processus de validation est **aligné sur les mêmes principes** — et quand le moment viendra de passer la certification, 80% du travail sera déjà fait. C'est ça le positionnement intelligent.

### 6.6 — Garanties de qualité data

Chaque sprint applique des **contrôles de qualité data** systématiques :

| Contrôle | Ce qu'on vérifie | Quand | Outil |
|---|---|---|---|
| **Intégrité référentielle** | Pas d'orphelins : chaque MT → reco → catégorie → MP → V | Sprint 0 puis à chaque modif | Scripts SQL automatisés |
| **Complétude** | Chaque champ obligatoire est renseigné (pas de `null` sur `sens_clinique`, `acteur`, `wording`) | Sprint 3 | Requêtes de couverture |
| **Cohérence cross-table** | Les comptages matchent : KERNEL_V6 dit 24 MPs → la base a 24 MPs | Sprint 0 | Audit KERNEL vs DB |
| **Non-régression** | Après correction, les scénarios validés précédemment passent toujours | Sprint 4-5 | Simulateur + personas |
| **Token Guard** | Chaque modification de data = qui, quand, pourquoi, validé par qui | Permanent | Registre de décisions |
| **Double validation** | Data technique OK (Antonin) + Data clinique OK (Dr. Monka) | Chaque sprint | Fiches signées |

> [!CAUTION]
> **La règle d'or** : aucune donnée n'est modifiée dans Supabase sans une entrée dans le registre de décisions. Zéro exception. Si on touche un seuil, un poids, un wording → c'est tracé.

---

## 7. Après les sprints — Et ensuite ?

Une fois les 6 sprints terminés, le moteur sera dans un état **"M1+ validé cliniquement"** avec un **dossier de certification complet**. Voici ce qui se passe après :

| Phase | Ce qu'on fait | Quand |
|---|---|---|
| **M2 — Moteur Intelligent** | Nouvelles règles CCC, sous-scores radar, CR contextualisé, score de complexité | Sprints 6-10 (~6-8 semaines) |
| **M3 — Moteur Personnalisé** | Variantes MTs par profil, acteurs dynamiques, CR personnalisé pro | Sprints 11-20+ (~4-6 mois) |
| **Expérimentations Klésia** | Le moteur en conditions réelles avec de vrais aidants | En parallèle dès M1+ validé |

> **On n'en est pas là.** D'abord on blinde le M1. Ensuite on construit dessus. Chaque sprint M2/M3 suivra le même processus (template + validation + certification).

---

## 8. Standards utilisés

| Standard | Application dans ce projet |
|---|---|
| **Agile / Scrum** | Sprints courts, livrables incrémentaux, rétrospective à chaque fin de sprint |
| **Human-in-the-Loop (HITL)** | L'IA prépare, l'humain valide et enrichit — jamais l'inverse |
| **Token Guard** | Chaque donnée modifiée est traçable : qui, quand, pourquoi |
| **Pair Review** | Antonin prépare → Dr. Monka challenge → Antonin intègre |
| **Continuous Validation** | Pas de "big bang" final — on valide à chaque sprint |
| **PRAGMA Framework** | Standards de qualité code et documentation appliqués côté technique |
| **ISO 42001 (Niveau 2)** | SOPs versionnées, registre de décisions, certifications tracées |
| **IEC 62304 (aligné)** | Cycle de vie logiciel médical — documentation + traçabilité |
| **Templates structurés** | 5 templates pros couvrant validation clinique, certification tech, ADR, walkthrough |

---

*Document vivant — dernière mise à jour : 3 mars 2026 — v1.1*
