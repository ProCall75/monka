# 🏥 Monka — Clinical Engine

> **Objectif** : Moteur clinique déterministe d'aide aux aidants  
> **Source de vérité** : [`KERNEL/RECAP_FONDATION_MONKA.md`](KERNEL/RECAP_FONDATION_MONKA.md)  
> **Dernière mise à jour** : 09/02/2026

---

## 📁 Structure du Repo

```
monka/
├── KERNEL/                   ← Source de vérité — Les 13 règles K1→K13
│   ├── RECAP_FONDATION_MONKA.md   ← Document fondateur (v4 FINALE)
│   └── UNDERSTANDING.md          ← Glossaire aligné sur le KERNEL
│
├── SOURCES/
│   └── VERIF/                ← Point d'entrée pour les nouveaux docs Dr. Monka
│
├── IA/                       ← Docs stratégiques CNRS + correspondance Legacy/IA
├── REFLEXION/                ← Réflexions personas, architecture, extraction
├── LIVRABLES/                ← Documents commerciaux & client
├── _ARCHIVE/                 ← Tout le legacy (questionnaires, simulateurs, audits, etc.)
│
├── TODO.md                   ← Feuille de route (5 phases)
└── README.md                 ← Ce fichier
```

## 🎯 Le KERNEL en Bref

- **150 questions** réparties dans 5 vulnérabilités (V1→V5) + **15 triggers** de contexte
- **~24 micro-parcours** déclenchés par 3 niveaux d'activation (Critique / CCC / Standard)
- **13 règles** (K1→K13) qui définissent le moteur
- **5 templates** (A→E) × 5 vulnérabilités = 26 documents à produire

## 📋 Phases de Travail

| Phase | Statut | Description |
|-------|--------|-------------|
| **0** | ✅ Fait | Nettoyage repo, restructuration, alignement |
| **1** | ⏳ Prochain | Validation données sources, audit 150 vs 153, fiches identité |
| **2** | 🔲 | Production templates KERNEL A→E par vulnérabilité |
| **3** | 🔲 | Simulateur Vite/React pour tester le KERNEL |
| **4** | 🔲 | Documentation médecin (livrables Dr. Monka) |

Voir [`TODO.md`](TODO.md) pour le détail.
