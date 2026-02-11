# 📄 TEMPLATE E — Scoring — V1 Social & Relationnel

> **Vulnérabilité** : V1 — Social & Relationnel
> **Date de production** : 11/02/2026
> **Statut** : 🟡 Mixte — questions scorantes legacy, seuils proposés par IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Méthode** : Scénario D — règle « questions d'état = scorantes »

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V1 — Social & Relationnel |
| Questions totales | 15 |
| Questions scorantes (legacy) | 8 |
| Score max (legacy) | 15 |

---

## Questions scorantes

| # | Question ID | Libellé | Classification | Réponse scorante (score=0) | Source |
|---|---|---|---|---|---|
| 1 | E1 | Comment se passe la répartition de l'aide ? | facteur | Répartition équilibrée et satisfaisante → 0 | Legacy ✅ |
| 2 | E2 | Avez-vous des personnes sur qui compter ? | facteur | Oui, plusieurs personnes → 0 | Legacy ✅ |
| 3 | E4 | Comment a évolué votre relation ? | etat | Relation renforcée ou globalement similaire → 0 | Legacy ✅ |
| 4 | E5 | Tensions ou désaccords dans la famille ? | etat | Non → 0 | Legacy ✅ |
| 5 | N20 | Difficultés relations sociales stables ? | facteur | Non → 0 | Legacy ✅ |
| 6 | O27 | Difficultés vie familiale ? | facteur et etat | Pas du tout → 0 | Legacy ✅ |
| 7 | O28 | Difficultés amis/loisirs/travail ? | facteur et etat | Pas du tout → 0 | Legacy ✅ |
| 8 | O30 | Sentiment de ne plus reconnaître la personne aidée ? | facteur et etat | Pas du tout → 0 | Legacy ✅ |

> **Note** : Le scoring legacy ne donne que les réponses à score 0 (non-scorantes). Les réponses scorantes (+1/+2) doivent être définies. Score max = 15 indique que certaines réponses valent +2 (critique).

**Score maximum** : 15

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 3 | 0-20% | Faible vulnérabilité sociale et relationnelle | IA 🤖 |
| 🟡 Modéré | 4 – 7 | 27-47% | Vulnérabilité modérée — vigilance recommandée | IA 🤖 |
| 🟠 Élevé | 8 – 11 | 53-73% | Vulnérabilité élevée — actions prioritaires | IA 🤖 |
| 🔴 Critique | 12 – 15 | 80-100% | Vulnérabilité critique — intervention urgente | IA 🤖 |

---

## Questions NON scorantes (facteur pur) — V1

| # | Question ID | Libellé | Classification | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | O47 | Distance domicile | facteur | Circonstance fixe, non évolutive |
| 2 | O48 | Fréquence des visites | facteur | Habitude, pas un état |
| 3 | N4 | Seul(e) à s'occuper du proche | facteur | Situation familiale factuelle |
| 4 | E3 | Autres personnes à charge | facteur | Contexte familial fixe |
| 5 | E6 | Acceptation aide extérieure | facteur | Comportement du proche, pas de l'aidant |
| 6 | N7 | Aménagement professionnel | facteur | Décision déjà prise |
| 7 | O31 | Peur pour l'avenir | facteur et etat | Dans legacy scorant? Non (absent) |

---

## Reclassifications proposées pour V1

> ⚠️ Les 4 questions classifiées « facteur et etat » (O27, O28, O30, O31) sont un cas particulier.
> Dans le Scénario D, elles devraient être reclassifiées en `état` (car elles mesurent un état évolutif).
> **Décision en attente de Dr. Monka** — doc scoring pas encore envoyé.

| Question ID | Classification actuelle | Proposition | Justification | Statut |
|---|---|---|---|---|
| O27 | facteur et etat | → état | Mesure l'impact actuel et évolutif | 🤖 En attente |
| O28 | facteur et etat | → état | Mesure l'impact actuel et évolutif | 🤖 En attente |
| O30 | facteur et etat | → état | Mesure un sentiment actuel et évolutif | 🤖 En attente |
| O31 | facteur et etat | → état | Mesure l'anxiété actuelle | 🤖 En attente |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (🟢🟡🟠🔴) sont des propositions IA
> - Les reclassifications « facteur et etat » → « état » nécessitent validation
> - Les pondérations (+1/+2) par réponse ne sont pas encore détaillées (seul le score max de 15 est connu du legacy)
