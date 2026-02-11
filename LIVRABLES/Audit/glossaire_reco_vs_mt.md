# 📖 Glossaire Moteur Monka — Recommandation vs Micro-Tâche

> **Source de vérité** : KERNEL `RECAP_FONDATION_MONKA.md`  
> **Date** : 10/02/2026

---

## Recommandation (Reco)

**Un conseil formulé** pour l'aidant et/ou le professionnel IDEC, attaché à un Micro-Parcours et déclenché par une règle d'activation.

| | |
|--|--|
| **Granularité** | Haut niveau — **que dire** |
| **Rattachement** | 1 reco → 1 MP (via activation_rule) |
| **Contenu** | Wording aidant + wording IDEC + acteurs impliqués |
| **Rôle** | Orienter l'action, donner la direction |
| **Exemple** | « Mettre en place un relais d'urgence auprès du SAD » |

---

## Micro-Tâche (MT)

**Une action concrète** à réaliser pour mettre en œuvre une recommandation. C'est l'unité de travail du moteur.

| | |
|--|--|
| **Granularité** | Bas niveau — **que faire** |
| **Rattachement** | 1 MT → 1 reco → 1 MP |
| **Type** (unique, non cumulable) | STRUC · SEC · MED · INFO · ORGA |
| **Contribution ASR** | STRUC/SEC/MED = 📍 contributive · INFO/ORGA = 💡 non-contributive |
| **Exemple** | Contacter le SAD de secteur *(ORGA)*, Évaluer les heures nécessaires *(SEC)* |

---

## Relation Reco ↔ MT

```
MP R2 (Soutien entourage)
├── Reco 1 : "Relais d'urgence" (🟠 CCC)
│   ├── MT: Contacter le SAD (ORGA)
│   ├── MT: Évaluer les heures (SEC)
│   └── MT: Informer sur les aides (INFO)
│
└── Reco 2 : "Mobiliser l'entourage" (🟢 Standard)
    ├── MT: Lister les proches (ORGA)
    └── MT: Explorer les freins (SEC)
```

| Propriété | Reco | MT |
|-----------|------|-----|
| **Qui la voit** | Aidant (app) + IDEC (pro) | IDEC (checklist) |
| **Nombre par MP** | 2-5 recos | 2-5 MT par reco |
| **Lien vers ASR** | Indirect (via ses MT) | Direct (contributive ou non) |
| **Urgence** | Hérite du niveau de sa règle d'activation | Hérite du niveau de sa reco |

---

## Ce que contient la base Supabase aujourd'hui

| Table | Contenu réel | Ce que c'est |
|-------|-------------|--------------|
| `recommendations_legacy` | 707 paires (question, réponse) | **Données brutes legacy** — PAS des recos au sens du moteur |
| `micro_taches` | 299 actions typées | **Vraies MT** mais non rattachées à des recos |
| → À construire : `recommendations` | ~50-120 recos structurées | Les vraies recos MP→activation_rule→MT |

> Les 707 lignes legacy sont la **matière première** pour construire les ~50-120 recos structurées du moteur final.
