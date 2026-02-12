# 📄 E_GLOBAL — Scoring Cross-Vulnérabilités

> **Date de production** : 11/02/2026
> **Statut** : 🟡 À valider par Dr. Monka — barèmes complets, seuils IA
> **Règle KERNEL** : K13 (scoring indépendant de l'activation)
> **Rôle** : Synthèse de la vulnérabilité globale de l'aidant
> **Source pondérations** : `typologie_ccc_scoring.json` (legacy — Doc Word Dr. Rimaud)

---

## 1. Vue d'ensemble

| Vulnérabilité | Questions scorantes | Score max | Poids relatif |
|---|---|---|---|
| V1 — Social & Relationnel | 8 | 15 | 20% |
| V2 — Fragilité du Proche | 11 | 22 | 29% |
| V3 — Santé de l'Aidant | 10 | 20 | 27% |
| V4 — Parcours Médical | 6 | 12 | 16% |
| V5 — Administratif & Juridique | 3 | 6 | 8% |
| **TOTAL** | **38** | **75** | **100%** |

> 📊 **V2 (Fragilité du Proche) pèse le plus lourd** (29%) car elle couvre le plus de dimensions cliniques. V5 (Admin) ne pèse que 8%.

---

## 2. Toutes les questions scorantes — Référence complète

### V1 — Social & Relationnel (8 questions, max 15)

| # | Question ID | Libellé | Réponse score=0 |
|---|---|---|---|
| 1 | E1 | Comment se passe la répartition de l'aide dans votre entourage ? | Répartition équilibrée et satisfaisante |
| 2 | E2 | En cas de coup dur, avez-vous des personnes sur qui compter ? | Oui, plusieurs personnes |
| 3 | E4 | Comment a évolué votre relation avec votre proche depuis que vous l'aidez ? | Relation renforcée ou similaire |
| 4 | E5 | Existe-t-il des tensions dans la famille concernant la prise en charge ? | Non |
| 5 | N20 | A-t-elle des difficultés à maintenir des relations sociales stables ? | Non |
| 6 | O27 | Difficultés dans votre vie familiale ? | Pas du tout |
| 7 | O28 | Difficultés dans vos relations amis/loisirs/travail ? | Pas du tout |
| 8 | O30 | Sentiment de ne plus reconnaître la personne aidée ? | Pas du tout |

### V2 — Fragilité du Proche (11 questions, max 22)

| # | Question ID | Libellé | Réponse score=0 |
|---|---|---|---|
| 1 | E25 | Confusion jour/nuit ? | Non |
| 2 | E26 | Désorientation dans des lieux familiers ? | Non |
| 3 | N11 | Douleurs chroniques liées à son état de santé ? | Non |
| 4 | N12 | Fatigue ou manque d'énergie chez la personne aidée ? | Non |
| 5 | N13 | Troubles du sommeil de la personne aidée ? | Non |
| 6 | N24 | Troubles de mémoire ou de concentration ? | Non |
| 7 | N34 | Difficultés à s'alimenter correctement ? | Non |
| 8 | O4 | Humeur de la personne aidée en ce moment ? | Humeur normale |
| 9 | O7 | Changements dans la manière de se nourrir ? | Non |
| 10 | O13 | Détérioration notable dans ses fonctions cognitives ? | Non |
| 11 | O26 | Diminution de sa taille habituelle ? | Non |

### V3 — Santé de l'Aidant (10 questions, max 20)

| # | Question ID | Libellé | Réponse score=0 |
|---|---|---|---|
| 1 | E7 | Épuisement par le rôle d'aidant ? | Pas du tout fatigué·e |
| 2 | E8 | Sentiment de solitude émotionnelle ? | Jamais |
| 3 | E9 | Temps pour vous dans une semaine ? | Oui |
| 4 | E10 | Sur le plan moral (stress, inquiétude) ? | Ça va globalement |
| 5 | E11 | Pouvoir continuer dans les 6 prochains mois ? | Oui, sans difficulté |
| 6 | E18 | Qualité du sommeil ? | Bonne |
| 7 | O6 | Chute dans les 6 derniers mois ? | Non |
| 8 | O29 | Retentissement sur votre santé ? | Pas du tout |
| 9 | O33 | Ressentez-vous une charge ? | Pas du tout |
| 10 | O44 | Votre santé par rapport à une personne du même âge ? | Meilleure |

### V4 — Parcours Médical du Proche (6 questions, max 12)

| # | Question ID | Libellé | Réponse score=0 |
|---|---|---|---|
| 1 | E36 | Beaucoup d'examens sans clarification ? | Non, pas particulièrement |
| 2 | E37 | Avis médicaux contradictoires ? | Non |
| 3 | E43 | Ruptures dans le suivi médical ? | Non |
| 4 | E47 | Plan clair en cas d'aggravation ? | Oui, on sait quoi faire |
| 5 | E54 | Organisation des soins ? | Plutôt simple et bien organisée |
| 6 | E57 | Plan de route clair pour la suite des soins ? | Oui, c'est clair |

### V5 — Administratif & Juridique (3 questions, max 6)

| # | Question ID | Libellé | Réponse score=0 |
|---|---|---|---|
| 1 | E66 | Complexité des démarches admin ? | Pas du tout |
| 2 | E69 | À l'aise avec les démarches en ligne ? | Oui, tout à fait |
| 3 | E70 | Démarches admin dans l'urgence ? | Non, jamais |

---

## 3. Score Global — Seuils d'interprétation

### Score brut (0-75)

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 15 | 0-20% | Situation maîtrisée — suivi préventif | IA 🤖 |
| 🟡 Modéré | 16 – 30 | 21-40% | Fragilités émergentes — accompagnement ciblé | IA 🤖 |
| 🟠 Élevé | 31 – 50 | 41-67% | Situation dégradée — plan d'action prioritaire | IA 🤖 |
| 🔴 Critique | 51 – 75 | 68-100% | Situation de crise — intervention immédiate | IA 🤖 |

### Profil radar — Score normalisé par vulnérabilité

Pour permettre une comparaison équitable entre vulnérabilités de poids différents :

| Vulnérabilité | Score brut / Max | Score normalisé (%) |
|---|---|---|
| V1 | score_V1 / 15 | = (score_V1 / 15) × 100 |
| V2 | score_V2 / 22 | = (score_V2 / 22) × 100 |
| V3 | score_V3 / 20 | = (score_V3 / 20) × 100 |
| V4 | score_V4 / 12 | = (score_V4 / 12) × 100 |
| V5 | score_V5 / 6 | = (score_V5 / 6) × 100 |

> **Usage** : Le score normalisé (%) permet de visualiser un **profil radar** à 5 axes. Chaque axe va de 0% (aucune vulnérabilité) à 100% (vulnérabilité maximale).

---

## 4. Mécanismes d'agrégation

### 4.1 Indépendance des scores

> **Règle K13** : Le score de chaque vulnérabilité est calculé indépendamment de l'activation des MPs. Un aidant peut avoir un score V3 élevé sans que les MPs S1-S4 soient activés.

### 4.2 Pondération des réponses

Chaque question scorante vaut **0 à N points** selon la réponse :
- **Score = 0** : réponse « optimale » (pas de signal de vulnérabilité)
- **Score = 1** : signal modéré
- **Score = 2** : signal fort

Le poids exact par réponse n'est pas linéaire — certaines questions portent jusqu'à 2 points (gravité élevée) tandis que d'autres plafonnent à 1.

### 4.3 Score global = somme des scores par V

```
Score_Global = Score_V1 + Score_V2 + Score_V3 + Score_V4 + Score_V5
```

### 4.4 Dominance et vulnérabilité principale

La **vulnérabilité dominante** est celle dont le score normalisé (%) est le plus élevé :

```
V_dominante = argmax(Score_Vn / Max_Vn) pour n ∈ {1, 2, 3, 4, 5}
```

---

## 5. Interactions scoring ↔ activation

| Scénario | Score | Activation | Interprétation |
|---|---|---|---|
| Score élevé + MP activés | 🔴 | ✅ | Cohérent — les données confirment la vulnérabilité |
| Score élevé + aucun MP activé | 🔴 | ❌ | Vulnérabilité diffuse — aucune condition CCC/critique remplie, mais état préoccupant |
| Score faible + MP activés | 🟢 | ✅ | Faux positif possible — une condition spécifique est remplie mais l'état global est bon |
| Score faible + aucun MP activé | 🟢 | ❌ | Situation stable — pas d'intervention requise |

---

## 6. Points d'attention pour validation

> ⚠️ **À VALIDER PAR DR. MONKA** :
> 
> 1. **Seuils globaux** (0-15 / 16-30 / 31-50 / 51-75) — propositions IA à calibrer avec les données réelles
> 2. ~~**Pondérations exactes** par réponse~~ → ✅ **FAIT** — tous les 38 barèmes sont maintenant détaillés dans chaque E_scoring.md (extraits du legacy intégral)
> 3. **V5 sous-représentée** (8% du score global) — est-ce voulu ou faut-il rééquilibrer ?
> 4. **V2 sur-représentée** (29%) — reflète-t-elle vraiment la dimension la plus critique ?
> 5. **Questions E21 (V3/V5 partagée)** — le score est-il porté uniquement par une V ?

---

## 7. Décisions IA prises — Raisonnement

> 🤖 Les décisions suivantes ont été prises pour permettre la construction de l'app. Elles sont documentées et réversibles.

| # | Décision | Raisonnement | Impact | Réversible |
|---|---|---|---|---|
| 1 | **Garder 38 questions scorantes** (pas 55) | Les 38 sont validées par le legacy. Les 17 supplémentaires ("toutes les état") sont une extension non testée. | Stabilité du scoring | ✅ Peut passer à 55 plus tard |
| 2 | **4 niveaux de seuils** au lieu de 3 legacy | Plus de granularité (🟢🟡🟠🔴 vs 🟢🟠🔴). Le 🟡 permet une détection précoce sans alarme. | UX plus fine | ✅ Peut revenir à 3 |
| 3 | **O27/O28/O30/O31** classées `état` | Elles mesurent un impact évolutif, pas un fait fixe. Déjà scorantes dans le legacy. | Aucun (déjà scorées) | ✅ Cosmétique |
| 4 | **E64/E65 restent non-scorantes** | Concernent les enfants (situation scolaire). Les inclure changerait le profil V5. | V5 reste à max 6 | ✅ Peut ajouter (max→10) |
| 5 | **E35/O24 restent non-scorantes** (V4) | Étiquetées "scorante" dans la classification mais absentes du tableau de barème legacy. | V4 reste à max 12 | ✅ Peut ajouter |
| 6 | **Barèmes = 100% legacy** | Aucune pondération n'a été inventée. Toutes extraites du doc original Dr. Rimaud. | Fidélité maximale | — |
