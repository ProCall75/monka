# DashboardPage — Fiche Audit

## Rôle
Page d'accueil de l'application. Affiche les métriques globales de la base Supabase et fournit un accès rapide aux 3 sections clés (Vulnérabilités, MP, Personas/Simulateur).

## Données consommées

| Source DB | Hook / Getter | Données affichées |
|---|---|---|
| `questions` | `useMonkaData()` → `data.questions` | Count total, triggers vs éval |
| `micro_parcours` | `useMonkaData()` → `data.microParcours` | Count total, per-V |
| `activation_rules` | `useMonkaData()` → `data.activationRules` | Count total, critique/ccc |
| `recommendations` | `useMonkaData()` → `data.recommendations` | Count total, per-V |
| `micro_taches` | `useMonkaData()` → `data.microTaches` | Count per-V |
| Toutes tables | `IntegrityReportCard` | FK validity, orphelins, nulls |

## Composants utilisés

- `IntegrityReportCard` — Rapport d'intégrité données (FK, orphelins)
- `StatCard` (local) — Card stat globale avec icône + badge
- `NavButton` (local) — Bouton navigation vers page clé
- `Badge` (local) — Badge coloré texte

## Connexions DB vérifiées

- [x] Toutes les données affichées proviennent de `useMonkaData()` (DB)
- [x] Aucun texte clinique hardcodé
- [x] Aucun ID hardcodé (supprimé : project ID, MP distribution)
- [x] Content blocks non applicables (page de stats)

## Métriques

| Métrique | Valeur |
|---|---|
| Lignes | 200L |
| Imports hooks | 1 (`useMonkaData` via barrel) |
| Composants enfants | 4 (StatCard, Badge, NavButton, IntegrityReportCard) |
| Architecture | ✅ page → hooks → engine |

## Historique modifications

| Date | Changement |
|---|---|
| 2026-02-22 | Création : 513L → 201L, retiré table per-V, scoring seuils, MT breakdown |
| 2026-02-22 | Retiré EngineHealthCard (score confiance moteur metrics non pertinentes vs KERNEL K6/K7) |
