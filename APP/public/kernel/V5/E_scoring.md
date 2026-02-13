# 📄 TEMPLATE E — Scoring — V5 Parcours Médical du Proche

> **Vulnérabilité** : V5 — Parcours Médical du Proche
> **Date de production** : 11/02/2026
> **Statut** : 🟡 À valider par Dr. Monka — barème complet, seuils IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Source pondérations** : `typologie_ccc_scoring.json` (legacy — Doc Word Dr. Rimaud)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V5 — Parcours Médical du Proche |
| Questions totales V4 | ~30 |
| Questions scorantes | 6 |
| Score max | 12 |

---

## Barème complet — Réponse → Score

> 🤖 **Décision IA** : Pondérations extraites intégralement du legacy. Toutes les 6 questions suivent le pattern 0/1/2 à 3 niveaux.

### E36 — Examens/consultations nombreux sans clarification

| Réponse | Score |
|---|---|
| Non, pas particulièrement | **0** |
| Oui, un peu | **+1** |
| Oui, beaucoup | **+2** |

### E37 — Avis médicaux contradictoires

| Réponse | Score |
|---|---|
| Non | **0** |
| Oui, parfois | **+1** |
| Oui, souvent | **+2** |

### E43 — Ruptures dans le suivi médical (12 derniers mois)

| Réponse | Score |
|---|---|
| Non | **0** |
| Oui, une période de 3 à 6 mois | **+1** |
| Oui, plusieurs périodes ou > 6 mois | **+2** |

### E47 — Plan en cas d'aggravation

| Réponse | Score |
|---|---|
| Oui, on sait quoi faire | **0** |
| Quelques repères | **+1** |
| Non, on improvise / urgences | **+2** |

### E54 — Organisation des soins

| Réponse | Score |
|---|---|
| Plutôt simple et bien organisée | **0** |
| Gérable mais parfois compliquée | **+1** |
| Très compliquée / ingérable | **+2** |

### E57 — Plan de route clair pour la suite des soins

| Réponse | Score |
|---|---|
| Oui, c'est clair | **0** |
| Partiellement | **+1** |
| Non, on avance au jour le jour | **+2** |

---

## Vérification du score max

| Question | Score max | Type |
|---|---|---|
| E36 | 2 | 3 niveaux |
| E37 | 2 | 3 niveaux |
| E43 | 2 | 3 niveaux |
| E47 | 2 | 3 niveaux |
| E54 | 2 | 3 niveaux |
| E57 | 2 | 3 niveaux |
| **TOTAL** | **12** | ✅ Conforme au legacy |

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 3 | 0-25% | Parcours médical structuré | IA 🤖 |
| 🟡 Modéré | 4 – 6 | 33-50% | Parcours fragile — à clarifier | IA 🤖 |
| 🟠 Élevé | 7 – 9 | 58-75% | Parcours désorganisé — risque de rupture | IA 🤖 |
| 🔴 Critique | 10 – 12 | 83-100% | Parcours en rupture — intervention urgente | IA 🤖 |

> 🤖 **Décision IA** : Legacy utilise 3 niveaux (🟢 0-4 / 🟠 5-8 / 🔴 9-12). J'ai ajouté un niveau 🟡 pour plus de granularité.

---

## Questions NON scorantes — V4

| # | Question ID | Libellé | Rôle legacy | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | E34 | Maladie(s) du proche | descriptive | Donnée factuelle |
| 2 | E35 | Diagnostic posé clairement | scorante (source) | ⚠️ Présent comme "scorante" dans la source mais absent du tableau de scoring |
| 3 | E38 | Transition enfant/adulte | descriptive | Situation ponctuelle |
| 4 | E39-E41 | Spécialistes, accès, ETP | descriptive | Listing factuel |
| 5 | E42 | RDV non programmés | déclenchante | Active MP, pas scorée |
| 6 | E44 | Bilan synthèse | déclenchante | Active MP, pas scorée |
| 7 | E45-E46 | Addictologie, post-hospit | déclenchante | Active MP, pas scorée |
| 8 | E48-E52 | Troubles psy, addiction, coord | descriptive/déclenchante | Contexte ou activation |
| 9 | O24 | Difficulté prendre RDV | scorante (source) | ⚠️ Présent comme "scorante" dans la source mais absent du tableau de scoring |

> 🤖 **Note** : E35 et O24 sont étiquetés "scorante" dans la classification typologique mais n'apparaissent PAS dans le tableau de scoring legacy. J'ai choisi de **respecter le tableau de scoring** (6 questions, max 12) plutôt que la classification. Dr. Monka peut les ajouter s'il le souhaite.

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (4 niveaux vs 3 legacy)
> - E35 et O24 : doivent-elles être scorantes ? (présentes dans la classification mais pas dans le barème)
> - Confirmer que les pondérations legacy sont toujours d'actualité
