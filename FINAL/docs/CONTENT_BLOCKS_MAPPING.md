# Content Blocks Mapping — Où sont posés les CB et leur pertinence

**Date :** 2026-02-22
**Total content_blocks :** 450

## Distribution par entity_type

| entity_type | Count | Utilisé dans |
|------------|:-----:|-------------|
| `vulnerability` | 5 | Dashboard (Vue d'ensemble), VulnDetail header |
| `micro_parcours` | 121 | MPDrilldown (contexte clinique en haut du MP) |
| `question` | 156 | Simulator (justification des questions) |
| `category` | 73 | MPDrilldown (description catégorie) |
| `scoring` | 95 | Dashboard (scoring CB coverage), VulnDetail Scoring tab |

## Mapping par page/vue

### Dashboard (`DashboardPage.tsx`)
- **Engine Health Score** → utilise les 6 métriques calculées sur toutes les données
- **Intégrité Données** → vérifie que les 5 entity_types sont couverts (450 blocs)
- CB non affichés directement mais vérifiés dans la card Intégrité

### Simulateur (`SimulatorPage.tsx`)
- **Règles tab** → `RuleExplainerFR` affiche les conditions en français avec sens_clinique (toggleable)
- **Vue Interne/Externe** → Les questions utilisent les CB de type `question` pour la justification
- **Scoring tab** → Les CB `scoring` justifient pourquoi chaque question score +1

### Vulnérabilités (`VulnDetail.tsx`)
- **Vue d'ensemble** → CB `vulnerability` pour la description
- **Questions tab** → CB `question` pour les justifications
- **Scoring tab** → CB `scoring` avec justification clinique par question scorante
- **Micro-Parcours tab** → Cartes MP avec niveaux d'activation et navigation

### Micro-Parcours (`MPDrilldown.tsx`)
- **Contexte clinique** → CB `micro_parcours` affichés en haut du drill-down
- **Catégories** → CB `category` dans la description de chaque catégorie
- **Règles** → `RuleExplainerFR` avec sens_clinique toggleable
- **MTs** → Séparées en bloc régulier + bloc Prévention (PREV)

### Vue Externe (`ExternalViewCards.tsx`)
- **Wording empathique** → Utilise les CB `micro_parcours` adaptés au patient
- **Recommendations** → Wording utilisateur depuis les recos, pas directement des CB

## Pertinence et couverture

| Zone | CB pertinent ? | Status |
|------|:-:|:-:|
| Dashboard Intégrité | ✅ 5/5 entity_types | ✅ |
| Simulator Règles | ✅ sens_clinique | ✅ |
| VulnDetail Scoring | ✅ scoring justification | ✅ |
| MPDrilldown Contexte | ✅ micro_parcours CB | ✅ |
| MPDrilldown Catégories | ✅ category description | ✅ |
| Vue Externe | ⚠️ Utilise wording_utilisateur, pas CB | OK (design choice) |

## Signaux faibles / Idées non-exécutées

- **CB de type `micro_tache`** : pas encore créés — pourrait enrichir le drill-down MT avec une justification par MT
- **CB de type `activation_rule`** : pas créés — le sens_clinique est dans la table activation_rules directement
- **CB de type `recommendation`** : pas créés — le wording est dans la table recommendations
- **Export PDF CB** : les CB ne sont pas encore exportés dans les fiches PDF
