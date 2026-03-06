# equipe.md — Équipe & Gouvernance

> **Périmètre** : Rôles, gouvernance, process de travail, rituels
> **Ne contient PAS** : méthode dev (→ technique.md), standards (→ qualite.md)
> **MAJ** : 3 mars 2026

---

## Équipe

| Rôle | Qui | Responsabilités |
|---|---|---|
| **CTO / Dev Lead** | Antonin | Architecture, code, data, déploiement, agent IA, certification technique |
| **Directeur Médical** | Dr. Monka | Validation clinique, calibration scoring, enrichissement sens clinique |
| **CTO Monka** | [Nom] | Supervision technique, roadmap produit, architecture globale |
| **CPO** | [À définir] | Product management, UX, métriques |

## Gouvernance

### Process de décision

| Type de décision | Qui décide | Trace |
|---|---|---|
| **Technique** (stack, architecture) | Antonin + CTO Monka | ADR dans `moteur/sprints/*/decisions/` |
| **Clinique** (seuils, règles, MTs) | Dr. Monka + Antonin | D-XXX dans `moteur/registre-decisions.md` |
| **Produit** (fonctionnalités, roadmap) | CTO Monka + Antonin | `docs/produit.md` |
| **Stratégique** (partenariats, direction) | CEO/Direction | Décision versionnée |

### Rituels

| Rituel | Fréquence | Participants | Output |
|---|---|---|---|
| Sprint review | Fin de sprint (~7-10j) | Antonin + Dr. Monka | Sprint report (TPL-06) |
| Point produit | Hebdo | Antonin + CTO Monka | MAJ roadmap |
| Sync clinique | Par session sprint | Antonin + Dr. Monka | Fiches validées |

## Process de travail Antonin ↔ Dr. Monka

```
1. Antonin PRÉPARE    → Pré-remplit les fiches, identifie les anomalies
2. Dr. Monka VALIDE   → Questionne, corrige, enrichit
3. Antonin INTÈGRE    → Applique les corrections, met à jour la DB
4. Les deux SIGNENT   → Sprint report validé, fiches signées
```

---

> **Détail des sprints** : → `CTO/anto/ROADMAP_SPRINTS_MOTEUR.md`
