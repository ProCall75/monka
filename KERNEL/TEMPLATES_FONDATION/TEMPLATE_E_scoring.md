# 📄 TEMPLATE E — Scoring

> **Vulnérabilité** : [V?] — [Nom de la vulnérabilité]
> **Date de production** : [JJ/MM/AAAA]
> **Statut** : 🟡 Proposition IA — en attente de certification Dr. Monka
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Méthode** : Scénario D — règle unique « questions d'état = scorantes »

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | [V?] — [Nom] |
| Questions totales | [X] |
| Questions scorantes (legacy) | [X] |
| Score max (legacy) | [X] |
| Méthode de scoring | Scénario D — toute question « état » contribue au score |

---

## Méthode de scoring — Scénario D

> **Règle unique** : Une question classifiée `état` (= mesure un état de fait évolutif) contribue au score.
> Les questions classifiées `facteur` (= circonstances fixes) ne contribuent pas.
>
> **Pondération** :
> - **+1** standard — réponse indiquant une vulnérabilité
> - **+2** critique — réponse indiquant une vulnérabilité grave ou urgente
>
> **Documents de référence** :
> - `LIVRABLES/Audit/scoring_vs_legacy_vs_toutes_etat.md` — analyse comparative
> - `LIVRABLES/Audit/reflexion_methodologie_scoring.md` — raisonnement méthodologique

---

## Questions scorantes

| # | Question ID | Libellé | Classification | Réponse scorante | Score | Source |
|---|---|---|---|---|---|---|
| 1 | [Q_ID] | [Texte] | état | [Valeur] | +1 / +2 | Legacy ✅ / IA 🤖 |
| ... | | | | | | |

**Score maximum** : [X]

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – [X] | 0-25% | [Description] | IA 🤖 |
| 🟡 Modéré | [X] – [Y] | 25-50% | [Description] | IA 🤖 |
| 🟠 Élevé | [Y] – [Z] | 50-75% | [Description] | IA 🤖 |
| 🔴 Critique | [Z] – max | 75-100% | [Description] | IA 🤖 |

> **Rappel K13** : Le score mesure l'**intensité** de la vulnérabilité. Il ne déclenche PAS de MP — l'activation et le scoring sont indépendants.

---

## Questions classifiées « facteur » (NON scorantes)

> Pour référence et audit — ces questions sont utilisées pour l'activation des MP mais pas le scoring.

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | [Q_ID] | [Texte] | facteur |
| ... | | | |

---

## Reclassifications proposées

> ⚠️ Les reclassifications ci-dessous sont des **propositions IA** basées sur l'analyse de la nature de chaque question. Elles nécessitent une validation par Dr. Monka.

| Question ID | Classification actuelle | Classification proposée | Justification | Statut |
|---|---|---|---|---|
| [Q_ID] | facteur | → état | [Raison] | 🤖 En attente validation |
| ... | | | | |

---

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Score issu du CAT Excel — validé |
| IA 🤖 | Score ou seuil proposé par l'IA — **à valider par Dr. Monka** |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation sont des propositions basées sur la répartition 25/50/75% du score max
> - Toute reclassification facteur → état modifie le périmètre des questions scorantes
> - La pondération (+1/+2) nécessite une validation clinique
