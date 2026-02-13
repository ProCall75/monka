# 📄 TEMPLATE E — Scoring — V2 Administrative

> **Vulnérabilité** : V2 — Administrative
> **Date de production** : 11/02/2026
> **Statut** : 🟡 À valider par Dr. Monka — barème complet, seuils IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Source pondérations** : `typologie_ccc_scoring.json` (legacy — Doc Word Dr. Rimaud)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V2 — Administrative |
| Questions totales V5 | ~15 |
| Questions scorantes | 3 |
| Score max | 6 |

> 🤖 **Décision IA — E64 et E65** : Ces deux questions sont classifiées "état" mais ne sont PAS dans le tableau de scoring legacy. J'ai décidé de **garder les 3 questions legacy** pour la stabilité. Raison : E64 et E65 concernent des enfants (situation scolaire, AESH) — les ajouter changerait le profil de scoring V5 qui cible les démarches administratives générales. Dr. Monka peut les ajouter s'il le souhaite (score max passerait de 6 à 10).

---

## Barème complet — Réponse → Score

### E66 — Complexité des démarches comme obstacle

| Réponse | Score |
|---|---|
| Pas du tout | **0** |
| Un peu | **+1** |
| Oui | **+2** |

### E69 — Aisance avec les démarches en ligne

| Réponse | Score |
|---|---|
| Oui, tout à fait | **0** |
| Oui, mais lent / chronophage | **+1** |
| Non, souvent perdu·e | **+2** |
| Pas d'accès numérique | **+2** |

> ⚠️ **Note** : E69 a 4 options de réponse au lieu de 3. Les deux dernières ("perdu·e" et "pas d'accès") sont toutes les deux à +2 car elles indiquent une incapacité fonctionnelle.

### E70 — Démarches admin dans l'urgence

| Réponse | Score |
|---|---|
| Non, jamais | **0** |
| Parfois | **+1** |
| Souvent / toujours en retard | **+2** |
| Je ne sais pas | **+1** |

> ⚠️ **Note** : E70 a aussi 4 options. "Je ne sais pas" vaut +1 car c'est un signal d'incertitude (pas d'absence de démarches).

---

## Vérification du score max

| Question | Score max | Type |
|---|---|---|
| E66 | 2 | 3 niveaux |
| E69 | 2 | 4 niveaux (2 à +2) |
| E70 | 2 | 4 niveaux (+1 pour "ne sais pas") |
| **TOTAL** | **6** | ✅ Conforme au legacy |

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 1 | 0-17% | Démarches maîtrisées | IA 🤖 |
| 🟡 Modéré | 2 – 3 | 33-50% | Difficultés administratives émergentes | IA 🤖 |
| 🟠 Élevé | 4 – 5 | 67-83% | Charge administrative lourde | IA 🤖 |
| 🔴 Critique | 6 | 100% | Renoncement et décrochage administratif | IA 🤖 |

> 🤖 **Décision IA** : Avec seulement 3 questions et un max de 6, les seuils sont serrés. J'ai utilisé des paliers naturels. Le legacy n'avait que 3 niveaux sur une base de /20 (inapplicable ici).

---

## Questions NON scorantes — V5

| # | Question ID | Libellé | Classification | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | E21 | Maintien situation de vie | déclenchante | Partagée avec V3 — score porté par V3 |
| 2 | E61 | Directives anticipées | facteur | Statut factuel |
| 3 | E62 | Droits/aides demandés | facteur | Listing factuel |
| 4 | E63 | Situation professionnelle | facteur | Descriptif |
| 5 | E64 | Impact financier / inclusion | etat | ⚠️ Potentiellement scorante (enfants) |
| 6 | E65 | Besoin AESH / AVS | etat | ⚠️ Potentiellement scorante (enfants) |
| 7 | E67 | Situation scolaire | facteur | Descriptif |
| 8 | E68 | Temps démarches admin | facteur | Compteur (déclenchante) |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - E64 et E65 : doivent-elles devenir scorantes ? (impact : score max 6→10)
> - Les seuils d'interprétation sur une base de 6 points
> - V5 ne représente que 8% du score global — est-ce voulu ?
