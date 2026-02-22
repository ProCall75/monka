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
| Toutes tables | `EngineHealthCard` + `IntegrityReportCard` | Health score, integrity checks |

## Composants utilisés

- `EngineHealthCard` — Score santé moteur /100
- `IntegrityReportCard` — Rapport d'intégrité données
- `StatCard` (local) — Card stat globale avec icône + badge
- `NavButton` (local) — Bouton navigation vers page
- `Badge` (local) — Badge coloré texte

## Connexions DB vérifiées

- [x] Toutes les données affichées proviennent de `useMonkaData()` (DB)
- [x] Aucun texte clinique hardcodé
- [x] Aucun ID hardcodé (supprimé : project ID, MP distribution)
- [x] Content blocks non applicables (page de stats)

## Métriques

| Métrique | Valeur |
|---|---|
| Lignes | 201L |
| Imports hooks | 1 (`useMonkaData` via barrel) |
| Composants enfants | 5 (StatCard, Badge, NavButton, EngineHealthCard, IntegrityReportCard) |
| Architecture | ✅ page → hooks → engine |
