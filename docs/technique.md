# technique.md — Architecture Technique

> **Périmètre** : Stack, architecture app, engine explainer, décisions tech
> **Ne contient PAS** : logique clinique (→ clinique.md), schéma DB (→ donnees.md)
> **MAJ** : 3 mars 2026

---

## Stack

| Couche | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| Langage | TypeScript (strict) | 5.x |
| DB | Supabase (PostgreSQL + Auth + RLS) | — |
| Styling | Tailwind CSS | 3.x |
| Déploiement | Vercel | — |
| Agent IA | Gemini (via .agent/) | — |

## Architecture App (`app/`)

```
app/src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx            # Page d'accueil simulateur
│   └── ...
├── engine/                 # ★ Le moteur clinique
│   ├── clinicalEngine.ts   # Orchestrateur principal
│   ├── scoringEngine.ts    # Calcul des scores V1-V5
│   ├── activationEngine.ts # Activation des MPs par règles
│   ├── contentEngine.ts    # Gestion des content blocks
│   └── types.ts            # Types du moteur
├── components/             # Composants React
├── lib/                    # Supabase client, helpers
└── types/                  # Types TS globaux
```

## Déploiement

| Environnement | URL | Branche |
|---|---|---|
| Production | [à renseigner] | main |
| Preview | Vercel auto-deploy | PR branches |

## Décisions techniques (ADRs)

> Les décisions techniques importantes sont documentées dans `moteur/sprints/*/decisions/` quand elles concernent le moteur, ou directement ici pour les décisions purement techniques.

---

> **Engine explainer détaillé** : → `_archive/finish/engine_explainer.md`
