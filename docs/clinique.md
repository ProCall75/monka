# clinique.md — Méthodologie Clinique

> **Périmètre** : Méthodologie médicale, justification des 5V, logique de scoring, pipeline clinique, références HAS
> **Ne contient PAS** : code (→ technique.md), schéma DB (→ donnees.md)
> **Responsable** : Dr. Monka (Dir. Médical) + Antonin (rédaction)
> **MAJ** : 3 mars 2026

---

## Pipeline Clinique

```
Questionnaire (165Q)
    │
    ├── Scoring ──▶ 5 Vulnérabilités (V1-V5)
    │                  │
    │                  └── Seuils → Faible / Modéré / Élevé / Critique
    │
    └── Activation ──▶ Règles conditionnelles (235 règles)
                          │
                          └── Catégories (73) → MPs activés (24 max)
                                                    │
                                                    ├── Recommandations (198)
                                                    │       └── Micro-Tâches (369)
                                                    │               └── Acteurs assignés
                                                    │
                                                    └── CR Médecin (synthèse)
```

## Les 5 Vulnérabilités

| V | Nom | Ce qu'elle mesure | Questions scorantes |
|---|---|---|---|
| V1 | Santé mentale de l'aidant | Charge émotionnelle, épuisement, isolement | ~XX |
| V2 | Ressources & aides | Accès aux aides, soutien social, information | ~XX |
| V3 | Santé physique de l'aidant | Impact physique de l'aidance, sommeil, nutrition | ~XX |
| V4 | Situation de l'aidé | Complexité de la pathologie, autonomie, évolution | ~XX |
| V5 | Parcours de soins | Organisation du parcours, coordination, suivi | ~XX |

> **À compléter** : les détails de chaque V seront renseignés dans les fiches scoring (Sprint 1 — `moteur/sprints/sprint-01-scoring/`)

## Logique de Scoring

| Concept | Explication |
|---|---|
| **C1 / C2** | Catégories de poids — C1 standard, C2 fort (question cliniquement plus importante) |
| **Seuils** | 4 niveaux par V : Faible (0-X), Modéré (X-Y), Élevé (Y-Z), Critique (Z-100) |
| **K3 (Winner-takes-all)** | Dans une catégorie, seul le niveau le plus haut s'affiche |
| **CCC** | Combinaison de Conditions Cliniques — règle composite multi-questions |
| **Prévention** | Niveau par défaut quand aucune règle ne fire — reco de prévention |

## Références cliniques

> **À compléter** au Sprint 3 (Enrichissement explications) avec les sources HAS, guidelines, consensus.

---

> **Référentiel** : → `moteur/referentiel/kernel-v6.md` (les 18 règles fondamentales)
> **Scoring détaillé** : → `moteur/referentiel/scoring/`
