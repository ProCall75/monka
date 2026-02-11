# ⚖️ Scoring Monka — Comparaison et Décisions

> **Date** : 10/02/2026
> **Pour** : Dr. Monka — décision
> **Objet** : Quel scoring pour les vulnérabilités V1-V5 ?
> **Doc complémentaire** : [`reflexion_methodologie_scoring.md`](file:///Users/antonin/monka/LIVRABLES/Audit/reflexion_methodologie_scoring.md) (raisonnement détaillé)

---

## 1. Situation actuelle

Le scoring legacy utilise **38 questions** choisies par Dr. Monka, sur 150 au total.

| V | Total questions | État | Facteur | Scorées (legacy) | Max legacy |
|---|---|---|---|---|---|
| **V1** Social | 15 | 2 | 9 | 8 | 15 |
| **V2** Fragilité | 18 | 4 | 14 | 11 | 22 |
| **V3** Santé Aidant | 26 | 16 | 10 | 10 | 20 |
| **V4** Parcours Médical | 55 | 20 | 35 | 6 | 12 |
| **V5** Administrative | 36 | 13 | 23 | 3 | 6 |
| **Total** | **150** | **55** | **91** | **38** | — |

**2 constats** :
- 4 questions "facteur" sont scorées (E1, E2, N20 en V1, E43 en V4) → incohérence
- V4 (55 questions) n'a que 6 questions scorées vs V2 (18 questions) qui en a 11 → déséquilibre

---

## 2. Option proposée : Scénario D — reclassifier puis appliquer une règle unique

### Principe

```
1. Dr. Monka reclassifie ~15 questions dont la classification est douteuse
2. Règle appliquée : « Toute question état = scorante. Point. »
3. Score normalisé sur 100, seuils uniformes initiaux (25/50/75)
```

### Pourquoi cette approche

- **Zéro exception** dans le kernel — une seule condition
- **Auditable** — un tiers vérifie la classification et la règle
- **Reproductible** — deux évaluateurs arrivent au même score
- **Essentiel pour la crédibilité institutionnelle** — une mutuelle ne validera pas un scoring basé sur « le médecin a choisi les questions qu'il trouve pertinentes » (cf. doc réflexion)

> [!IMPORTANT]
> Chaque reclassification documentée par Dr. Monka est un acte médical qui renforce le dossier méthodologique. C'est la fondation de la crédibilité du produit face aux partenaires.

---

## 3. Questions à reclassifier

### Facteurs actuellement scorés → état ?

| Question | V | Classif. actuelle | Contenu | Proposition |
|---|---|---|---|---|
| **E1** | V1 | facteur | Depuis combien de temps aidez-vous ? | → **état** |
| **E2** | V1 | facteur | À quelle fréquence aidez-vous ? | → **état** |
| **N20** | V1 | facteur | Vivez-vous sous le même toit ? | → rester **facteur** |
| **E43** | V4 | facteur | Hospitalisations ces 12 derniers mois ? | → **état** |

### Questions V2 à vérifier

V2 a 11 questions scorées mais seulement 4 classifiées "état". Les 7 autres :

| Question | Contenu | Proposition |
|---|---|---|
| **N11** | Douleurs non contrôlées ? | → **état** (observation clinique) |
| **N12** | Effets secondaires ? | → **état** |
| **N13** | Troubles du sommeil ? | → **état** |
| **N24** | Troubles mémoire/concentration ? | → **état** |
| **N34** | Problèmes bucco-dentaires ? | → **état** |
| **O7** | État bucco-dentaire ? | → **état** |
| **O13** | Consultation gériatrique ? | → rester **facteur** (action) |
| **O26** | Ostéodensitométrie ? | → rester **facteur** (action) |
| **O4** | Suivi psychologique ? | → rester **facteur** (action) |

### Impact après reclassification

| V | Questions état (estimé) | Max brut | vs Legacy |
|---|---|---|---|
| V1 | ~6 | 12 | -3 |
| V2 | ~9 | 18 | -4 |
| V3 | 16 | 32 | +12 |
| V4 | ~22 | 44 | +32 |
| V5 | 13 | 26 | +20 |

---

## 4. Pondération — 2 niveaux

| Niveau | Poids | Critère | Exemples |
|---|---|---|---|
| Standard | +1 | Toute question état scorante | E4, E33, E34 |
| Critique | +2 | Questions à risque vital uniquement | N25 (idées suicidaires), N22 (automutilation), E27 (comportements dangereux) |

**Pourquoi pas 3 niveaux ?**
La frontière entre "important" (+2) et "critique" (+3) est subjective et source de débats sans fin. 2 niveaux capturent l'essentiel : risque vital = double. Le reste = standard.

---

## 5. Échelle d'interprétation

### Score normalisé sur 100

```
Score normalisé = (score brut / max théorique) × 100
```

| Plage | Niveau | Signification | Couleur |
|---|---|---|---|
| 0-25 | Faible | Prévention | 🟢 |
| 26-50 | Modéré | Suivi conseillé | 🟡 |
| 51-75 | Élevé | Action requise | 🟠 |
| 76-100 | Critique | Intervention immédiate | 🔴 |

> Les seuils sont des valeurs de départ. On les ajuste après les premiers tests cliniques.

---

## 6. Décisions attendues

| # | Décision | Action demandée |
|---|---|---|
| **1** | **Reclassifier ~15 questions** | Confirmer état / facteur pour chaque question des tableaux ci-dessus |
| **2** | **Pondération +1/+2** | Valider ou ajuster la liste des questions "critiques" (+2) |

> [!TIP]
> Le scoring normalisé et les seuils n'ont pas besoin de validation pour démarrer — ce sont des paramètres qu'on affine avec les données réelles.
