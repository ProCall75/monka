# 📄 TEMPLATE E — Scoring — V5 Administratif & Juridique

> **Vulnérabilité** : V5 — Administratif & Juridique
> **Date de production** : 11/02/2026
> **Statut** : 🟡 Mixte — questions scorantes legacy, seuils proposés par IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Méthode** : Scénario D — règle « questions d'état = scorantes »

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V5 — Administratif & Juridique |
| Questions totales V5 | ~15 |
| Questions scorantes (legacy) | 3 |
| Score max (legacy) | 6 |

---

## Questions scorantes

| # | Question ID | Libellé | Classification | Réponse non-scorante (score=0) | Source |
|---|---|---|---|---|---|
| 1 | E66 | Ressentez-vous la complexité des démarches comme un obstacle ? | etat | Pas du tout → 0 | Legacy ✅ |
| 2 | E69 | Avez-vous le sentiment d'être suffisamment informé sur les droits ? | etat | Oui, tout à fait → 0 | Legacy ✅ |
| 3 | E70 | Avez-vous déjà renoncé à des démarches ? | etat | Non, jamais → 0 | Legacy ✅ |

**Score maximum** : 6

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 1 | 0-17% | Démarches maîtrisées | IA 🤖 |
| 🟡 Modéré | 2 – 3 | 33-50% | Difficultés administratives émergentes | IA 🤖 |
| 🟠 Élevé | 4 – 5 | 67-83% | Charge administrative lourde — accompagnement nécessaire | IA 🤖 |
| 🔴 Critique | 6 | 100% | Renoncement et décrochage administratif | IA 🤖 |

---

## Questions NON scorantes (facteur pur) — V5

| # | Question ID | Libellé | Classification | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | E21 | Maintien situation de vie | etat | Partagée avec V3 — score porté par E21 en V3 |
| 2 | E61 | Directives anticipées | facteur | Statut factuel |
| 3 | E62 | Droits/aides demandés | facteur | Listing factuel |
| 4 | E63 | Situation professionnelle | facteur | Descriptif |
| 5 | E64 | Impact financier | etat | ⚠️ Potentiellement scorante (à valider) |
| 6 | E65 | Budget du ménage | etat | ⚠️ Potentiellement scorante (à valider) |
| 7 | E67 | Situation scolaire | facteur | Descriptif |
| 8 | E68 | Temps démarches admin | facteur | Compteur |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (🟢🟡🟠🔴) sont des propositions IA
> - Avec 3 questions et score max 6, chaque question peut valoir jusqu'à 2 points
> - E64 et E65 sont classées « etat » mais ne sont PAS scorantes dans le legacy — à confirmer
