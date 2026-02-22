# PersonasPage — Fiche Audit

## Rôle
Affiche les 8 personas aidants organisés par type d'aidance (N3). Permet de charger les réponses pré-remplies d'un persona dans le simulateur via le bouton "Simuler".

## Données consommées

| Source | Hook / Getter | Données |
|---|---|---|
| `personas` (Supabase) | `useMonkaData()` → `data.personas` | 8 DBPersona (id, name, age, emoji, color, short_desc, story, profile_*, traits, aidance_types, age_aide) |
| `persona_answers` (Supabase) | `useMonkaData()` → `data.personaAnswers` | 1203 DBPersonaAnswer (persona_id, question_id, answer) |

## Composants utilisés
- `PersonaCard` (169L) — Carte persona avec header, badges (Q count, P-id), bouton Simuler, détails expansibles (story, profile grid, traits tags)
- `usePersonas()` hook — Convertit données DB en `Persona[]` via `dbToPersona()`, exporté pour réutilisation dans SimulatorPage et PersonaComparison

## Architecture

```
PersonasPage.tsx (258L)
├── usePersonas() hook → useMonkaData() → DB
├── AIDANCE_CATEGORIES (UI config — icônes, couleurs)
├── PersonaCard.tsx (169L) — composant enfant
└── handleUsePersona() → sessionStorage → navigate('/simulator')
```

## Connexions DB vérifiées
- [x] Toutes les données affichées proviennent de la DB
- [x] Aucun texte clinique hardcodé
- [x] Content blocks non applicable (pas de contenu clinique dans cette page)
- [x] `personaAnswers.ts` (1228L) supprimé — zéro hardcode restant

## Métriques

| Métrique | Valeur |
|---|---|
| Lignes | 258L |
| Imports hooks | 1 (useMonkaData) |
| Composants enfants | 1 (PersonaCard) |
| Types exportés | Persona, usePersonas |

## Historique

| Date | Changement |
|---|---|
| 2026-02-22 | Migration DB complète — 698L → 258L, zéro hardcode |
