# produit.md — Vision & Roadmap Produit

> **Périmètre** : Vision Monka, roadmap M1→M3, fonctionnalités, métriques produit
> **Ne contient PAS** : code (→ technique.md), scoring (→ clinique.md), DB (→ donnees.md)
> **MAJ** : 3 mars 2026

---

## Vision

Monka est un **moteur clinique de parcours de soins personnalisé** pour les aidants familiaux. Il évalue la vulnérabilité d'un aidant via un questionnaire de 165 questions, calcule 5 scores de vulnérabilité, et active des micro-parcours cliniques adaptés avec des recommandations concrètes.

**Utilisateurs cibles** :
- **IDEC** (Infirmier Diplômé d'État Coordinateur) — pilote le parcours
- **Aidant** — bénéficiaire des actions
- **Médecin traitant** — reçoit le CR de synthèse
- **Klésia** (mutuelle) — finance et déploie

## Roadmap Produit

| Phase | Contenu | Statut |
|---|---|---|
| **M1 — Moteur Fondamental** | 5V scoring, 24 MPs, 369 MTs, simulateur clinique | ✅ En production |
| **M1+ — Validation clinique** | Sprints 0-5 de validation (→ `moteur/sprints/`) | 🔲 En cours |
| **M2 — Moteur Intelligent** | CCC avancées, sous-scores radar, CR contextualisé | 🔲 Planifié |
| **M3 — Moteur Personnalisé** | Variantes MTs par profil, acteurs dynamiques | 🔲 Future |

## Fonctionnalités M1

| Fonctionnalité | Description | Status |
|---|---|---|
| Questionnaire 165Q | Adaptatif par type d'aidance (N3) | ✅ |
| Scoring 5 vulnérabilités | V1-V5 avec seuils 4 niveaux | ✅ |
| Activation MPs | 24 MPs activés par règles conditionnelles | ✅ |
| Recos + MTs | 198 recos, 369 micro-tâches avec acteurs | ✅ |
| CR Médecin | Synthèse exportable pour le médecin traitant | ✅ |
| Simulateur clinique | Interface de test avec personas | ✅ |
| Content blocks | Blocs de contenu dynamique app | ✅ |

---

> **Référence complète** : → `moteur/referentiel/strategie-personnalisation.md`
