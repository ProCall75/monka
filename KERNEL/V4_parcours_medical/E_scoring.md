# 📄 TEMPLATE E — Scoring — V4 Parcours Médical du Proche

> **Vulnérabilité** : V4 — Parcours Médical du Proche
> **Date de production** : 11/02/2026
> **Statut** : 🟡 Mixte — questions scorantes legacy, seuils proposés par IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Méthode** : Scénario D — règle « questions d'état = scorantes »

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V4 — Parcours Médical du Proche |
| Questions totales V4 | ~30 |
| Questions scorantes (legacy) | 6 |
| Score max (legacy) | 12 |

---

## Questions scorantes

| # | Question ID | Libellé | Classification | Réponse non-scorante (score=0) | Source |
|---|---|---|---|---|---|
| 1 | E36 | Examens/consultations nombreux sans clarification ? | etat | Non, pas particulièrement → 0 | Legacy ✅ |
| 2 | E37 | Avis des médecins souvent contradictoires ? | etat | Non → 0 | Legacy ✅ |
| 3 | E43 | Ruptures dans le suivi médical ? | etat | Non → 0 | Legacy ✅ |
| 4 | E47 | En cas d'aggravation, savez-vous quoi faire ? | etat | Oui, on sait quoi faire → 0 | Legacy ✅ |
| 5 | E54 | Organisation des soins ? | etat | Plutôt simple et bien organisée → 0 | Legacy ✅ |
| 6 | E57 | Comprenez-vous le plan de soins ? | etat | Oui, c'est clair → 0 | Legacy ✅ |

**Score maximum** : 12

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 3 | 0-25% | Parcours médical structuré | IA 🤖 |
| 🟡 Modéré | 4 – 6 | 33-50% | Parcours fragile — à clarifier | IA 🤖 |
| 🟠 Élevé | 7 – 9 | 58-75% | Parcours médical désorganisé — risque de rupture | IA 🤖 |
| 🔴 Critique | 10 – 12 | 83-100% | Parcours en rupture — intervention urgente | IA 🤖 |

---

## Questions NON scorantes (facteur pur) — V4

| # | Question ID | Libellé | Classification | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | E34 | Maladie(s) du proche | aucun | Donnée descriptive |
| 2 | E35 | Diagnostic posé clairement | facteur | Passé |
| 3 | E38 | Passage pédiatrie/adulte | facteur | Événement ponctuel |
| 4 | E39 | Spécialistes consultés | facteur | Listing factuel |
| 5 | E40 | Difficultés accès soins | facteur | Obstacle concret |
| 6 | E41 | Libéraux impliqués | facteur | Listing factuel |
| 7 | E42 | RDV non programmés (nombre) | facteur | Compteur |
| 8 | E44 | Bilan synthèse réalisé | facteur | Passé |
| 9 | E45 | Suivi addictologie | facteur | Statut |
| 10 | E46 | Accompagnement retour hôpital | facteur | Passé |
| 11 | E48-E51 | Troubles, addictions, traitement, observance | facteur | Données cliniques factuelles |
| 12 | E52 | Coordination existante | facteur | Constat |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (🟢🟡🟠🔴) sont des propositions IA
> - Avec 6 questions et score max 12, chaque question peut valoir jusqu'à 2 points
