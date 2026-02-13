# 📄 TEMPLATE E — Scoring — V4 Fragilité du Proche

> **Vulnérabilité** : V4 — Fragilité du Proche
> **Date de production** : 11/02/2026
> **Statut** : 🟡 À valider par Dr. Monka — barème complet, seuils IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Source pondérations** : `typologie_ccc_scoring.json` (legacy — Doc Word Dr. Rimaud)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V4 — Fragilité du Proche |
| Questions totales V2 | ~32 |
| Questions scorantes (legacy) | 11 |
| Score max (legacy) | 22 |

> 🤖 **Décision IA** : Le document source liste 14 questions comme "scorantes" dans la section V2 (incluant E32, E33, O6). Cependant, le tableau de scoring legacy ne contient QUE 11 questions avec pondérations. E32, E33 et O6 sont référencées dans V3 (santé aidant) et non dans le scoring V2. J'ai conservé les **11 questions du tableau de scoring V2** pour rester fidèle aux barèmes legacy.

---

## Barème complet — Réponse → Score

### O7 — Changements alimentaires de la personne aidée

| Réponse | Score |
|---|---|
| Non | **0** |
| Oui | **+1** |
| Oui et dénutrition | **+2** |

### O13 — Détérioration des fonctions cognitives

| Réponse | Score |
|---|---|
| Non | **0** |
| Diminution de certaines fonctions | **+1** |
| Fonctions totalement altérées | **+2** |

### N24 — Troubles de mémoire ou de concentration

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### E25 — Confusion jour/nuit

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### E26 — Désorientation dans des lieux familiers

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### O4 — Humeur actuelle de la personne aidée

| Réponse | Score |
|---|---|
| Humeur normale | **0** |
| Parfois anxieuse ou triste | **+1** |
| Déprimée | **+2** |

### N11 — Douleurs chroniques

| Réponse | Score |
|---|---|
| Non | **0** |
| Occasionnellement | **+1** |
| Oui | **+2** |

### N12 — Fatigue / manque d'énergie

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### N13 — Troubles du sommeil

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### N34 — Difficultés alimentaires

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### O26 — Diminution de la taille habituelle

| Réponse | Score |
|---|---|
| Non | **0** |
| Oui | **+2** |

> ⚠️ **Note** : O26 est binaire (0 ou 2, pas de +1). C'est conforme au legacy — la perte de taille est un signal fort de fragilité osseuse.

---

## Vérification du score max

| Question | Score max | Type |
|---|---|---|
| O7 | 2 | 3 niveaux |
| O13 | 2 | 3 niveaux |
| N24 | 2 | 3 niveaux |
| E25 | 2 | 3 niveaux |
| E26 | 2 | 3 niveaux |
| O4 | 2 | 3 niveaux |
| N11 | 2 | 3 niveaux |
| N12 | 2 | 3 niveaux |
| N13 | 2 | 3 niveaux |
| N34 | 2 | 3 niveaux |
| O26 | 2 | Binaire |
| **TOTAL** | **22** | ✅ Conforme au legacy |

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 5 | 0-23% | Fragilité faible, autonomie préservée | IA 🤖 |
| 🟡 Modéré | 6 – 11 | 27-50% | Fragilisation installée — vigilance | IA 🤖 |
| 🟠 Élevé | 12 – 17 | 55-77% | Fragilité élevée — actions prioritaires | IA 🤖 |
| 🔴 Critique | 18 – 22 | 82-100% | Dépendance / risques significatifs | IA 🤖 |

> 🤖 **Décision IA** : Legacy utilise 3 niveaux (🟢 0-7 / 🟠 8-14 / 🔴 15-22). J'ai ajouté un niveau 🟡 pour plus de granularité.

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (4 niveaux vs 3 legacy)
> - V2 représente 29% du score global — est-ce proportionné ?
> - Confirmer que les pondérations legacy sont toujours d'actualité
