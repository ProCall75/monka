# 📄 TEMPLATE E — Scoring — V3 Santé de l'Aidant

> **Vulnérabilité** : V3 — Santé de l'Aidant
> **Date de production** : 11/02/2026
> **Statut** : 🟡 Mixte — questions scorantes legacy, seuils proposés par IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Méthode** : Scénario D — règle « questions d'état = scorantes »

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V3 — Santé de l'Aidant |
| Questions totales V3 | ~21 |
| Questions scorantes (legacy) | 10 |
| Score max (legacy) | 20 |

---

## Questions scorantes

| # | Question ID | Libellé | Classification | Réponse non-scorante (score=0) | Source |
|---|---|---|---|---|---|
| 1 | E7 | À quel point vous sentez-vous épuisé·e ? | etat | Pas du tout fatigué·e → 0 | Legacy ✅ |
| 2 | E8 | Sentiment d'être seul(e) émotionnellement ? | etat | Jamais → 0 | Legacy ✅ |
| 3 | E9 | Parvenez-vous à avoir du temps pour vous ? | etat | Oui → 0 | Legacy ✅ |
| 4 | E10 | Sur le plan moral, où vous situez-vous ? | etat | Ça va globalement → 0 | Legacy ✅ |
| 5 | E11 | Pensez-vous pouvoir continuer dans les 6 prochains mois ? | etat | Oui, sans difficulté → 0 | Legacy ✅ |
| 6 | E18 | Qualité de votre sommeil ? | etat | Bonne → 0 | Legacy ✅ |
| 7 | O6 | A-t-elle chuté dans les 6 derniers mois ? | etat | Non → 0 | Legacy ✅ |
| 8 | O29 | Retentissement sur votre santé ? | etat | Pas du tout → 0 | Legacy ✅ |
| 9 | O33 | Ressentez-vous une charge ? | etat | Pas du tout → 0 | Legacy ✅ |
| 10 | O44 | Votre santé par rapport à une personne du même âge ? | etat | Meilleure → 0 | Legacy ✅ |

> **Note** : Score max = 20 avec 10 questions → certaines réponses valent +2 (gravité élevée). Les pondérations exactes ne sont pas encore détaillées dans le legacy.

**Score maximum** : 20

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 5 | 0-25% | Santé de l'aidant préservée | IA 🤖 |
| 🟡 Modéré | 6 – 10 | 30-50% | Risque d'épuisement modéré — vigilance | IA 🤖 |
| 🟠 Élevé | 11 – 15 | 55-75% | Épuisement probable — actions prioritaires | IA 🤖 |
| 🔴 Critique | 16 – 20 | 80-100% | Épuisement avancé — intervention urgente | IA 🤖 |

---

## Questions NON scorantes (facteur pur) — V3

| # | Question ID | Libellé | Classification | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | E14 | Jours d'arrêt sur 30 jours | facteur | Compteur factuel, pas un état |
| 2 | E17 | Activité physique régulière ? | facteur | Habitude, non évolutive |
| 3 | N8 | Arrêt de travail lié au rôle d'aidant ? | facteur | Événement passé |
| 4 | O49 | Depuis combien de temps l'aidez-vous ? | aucun | Circonstance fixe |
| 5 | O50 | Combien de temps lui consacrez-vous ? | facteur | Donnée quantitative |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (🟢🟡🟠🔴) sont des propositions IA
> - Les pondérations (+1/+2) par réponse ne sont pas encore détaillées (seul le score max de 20 est connu du legacy)
