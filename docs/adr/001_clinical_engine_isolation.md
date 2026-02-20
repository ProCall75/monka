# ADR-001: Clinical Engine Isolation

**Status:** Accepted
**Date:** 2026-02-19
**Authors:** PRAGMA Studio

## Context

The Monka Clinical Engine currently mixes clinical logic (rule evaluation, scoring, CR generation) directly inside React page components. `SimulatorPage.tsx` alone is 2044 lines combining UI rendering, data fetching, rule evaluation, and report generation.

This violates Framework §2 (Separation of Responsibilities, file size limits) and makes the clinical logic untestable in isolation.

## Decision

**Isolate all clinical logic into `APP/src/clinical/`** — a standalone module with zero React dependencies in its core.

### Structure

```
clinical/
├── engine/       # Pure logic — NO React imports
│   ├── clinicalEngine.ts
│   ├── scoringEngine.ts
│   ├── ruleParser.ts
│   └── crGenerator.ts
├── data/         # Supabase fetch — NO React imports
│   ├── supabaseClient.ts
│   ├── supabaseData.ts
│   └── dataValidator.ts
├── types/        # Shared types
│   ├── clinical.types.ts
│   └── engine.types.ts
├── hooks/        # React bridge
│   ├── useMonkaData.ts
│   ├── useEvaluation.ts
│   └── useCR.ts
└── index.ts      # Barrel export
```

### Import Rules

| From | Can Import | Cannot Import |
|------|-----------|---------------|
| `engine/` | `types/` only | React, components, pages |
| `data/` | `types/` only | React, components, pages |
| `hooks/` | `engine/`, `data/`, `types/` | components, pages |
| `components/` | `hooks/`, `types/` | `engine/` directly |
| `pages/` | `hooks/`, `components/` | `engine/`, `data/` directly |

### Rationale

1. **Testability** — `engine/` can be tested with pure unit tests (no DOM, no React)
2. **Reusability** — `engine/` can be extracted to a shared package if needed (e.g., for a mobile app)
3. **Maintainability** — Clear boundaries prevent spaghetti code
4. **Framework compliance** — §2 file size limits, §1 architecture template

## Consequences

- All existing logic in `SimulatorPage.tsx` and `engine/` folder must be migrated to `clinical/`
- New convention: **Never import from `clinical/engine/` in a page component** — always go through hooks
- The `clinical/` folder becomes the single source of truth for clinical logic
