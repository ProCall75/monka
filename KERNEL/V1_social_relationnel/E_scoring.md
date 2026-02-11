# 📄 TEMPLATE E — Scoring — V1 Social & Relationnel

> **Vulnérabilité** : V1 — Social & Relationnel
> **Date de production** : 11/02/2026
> **Statut** : 🟡 À valider par Dr. Monka — barème complet, seuils IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Source pondérations** : `typologie_ccc_scoring.json` (legacy — Doc Word Dr. Rimaud)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V1 — Social & Relationnel |
| Questions totales | 15 |
| Questions scorantes | 8 |
| Score max | 15 |

---

## Barème complet — Réponse → Score

> 🤖 **Décision IA** : Les pondérations ci-dessous sont extraites **intégralement du legacy** (document "Typologie, CCC et Scoring" de Dr. Rimaud). Aucune modification n'a été apportée — ce sont les valeurs exactes du CAT original.

### E1 — Répartition de l'aide dans l'entourage

| Réponse | Score |
|---|---|
| Répartition équilibrée et satisfaisante | **0** |
| Je fais la plus grande partie mais cela reste acceptable | **+1** |
| Je fais presque tout / je suis totalement seul·e | **+2** |

### E2 — En cas de coup dur, personnes mobilisables

| Réponse | Score |
|---|---|
| Oui, plusieurs personnes | **0** |
| Oui, une personne | **+1** |
| Très peu de personnes / personne | **+2** |

### E4 — Évolution de la relation aidant–aidé

| Réponse | Score |
|---|---|
| Relation renforcée ou globalement similaire | **0** |
| Relation plus tendue / plus compliquée / difficile à dire | **+1** |

> ⚠️ **Note** : E4 ne comporte que 2 niveaux (max +1). C'est conforme au legacy.

### E5 — Tensions ou désaccords familiaux

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### N20 — Difficultés du proche à maintenir des relations sociales

| Réponse | Score |
|---|---|
| Non | **0** |
| Parfois | **+1** |
| Oui | **+2** |

### O27 — Difficultés dans la vie familiale liées au rôle d'aidant

| Réponse | Score |
|---|---|
| Pas du tout | **0** |
| Un peu | **+1** |
| Oui | **+2** |

### O28 — Difficultés relations amis/loisirs/travail

| Réponse | Score |
|---|---|
| Pas du tout | **0** |
| Un peu | **+1** |
| Oui | **+2** |

### O30 — Sentiment de ne plus reconnaître la personne aidée

| Réponse | Score |
|---|---|
| Pas du tout | **0** |
| Un peu | **+1** |
| Oui | **+2** |

---

## Vérification du score max

| Question | Score max | Type |
|---|---|---|
| E1 | 2 | 3 niveaux |
| E2 | 2 | 3 niveaux |
| E4 | 1 | 2 niveaux |
| E5 | 2 | 3 niveaux |
| N20 | 2 | 3 niveaux |
| O27 | 2 | 3 niveaux |
| O28 | 2 | 3 niveaux |
| O30 | 2 | 3 niveaux |
| **TOTAL** | **15** | ✅ Conforme au legacy |

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 3 | 0-20% | Situation sociale préservée | IA 🤖 |
| 🟡 Modéré | 4 – 7 | 27-47% | Fragilisation sociale émergente | IA 🤖 |
| 🟠 Élevé | 8 – 11 | 53-73% | Vulnérabilité sociale significative | IA 🤖 |
| 🔴 Critique | 12 – 15 | 80-100% | Isolement / rupture relationnelle | IA 🤖 |

> 🤖 **Décision IA — Pourquoi 4 niveaux au lieu de 3** : Le legacy utilise 3 niveaux (🟢🟠🔴). J'ai ajouté un niveau 🟡 intermédiaire pour plus de granularité et permettre une détection précoce. Dr. Monka peut revenir aux 3 niveaux legacy si préféré :
> - Legacy : 🟢 0-5 / 🟠 6-10 / 🔴 11-15

---

## Questions NON scorantes — V1

| # | Question ID | Libellé | Classification | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | O47 | Distance domicile | facteur | Circonstance fixe, non évolutive |
| 2 | O48 | Fréquence des visites | facteur | Habitude, pas un état |
| 3 | N4 | Seul(e) à s'occuper du proche | facteur | Situation familiale factuelle |
| 4 | E3 | Autres personnes à charge | facteur | Contexte familial fixe |
| 5 | E6 | Acceptation aide extérieure | critique directe | Déclenche priorité niveau 1, pas scorée |
| 6 | N7 | Aménagement professionnel | facteur | Décision déjà prise |
| 7 | O31 | Peur pour l'avenir | facteur | Inquiétude projetée, pas un état mesurable |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (4 niveaux vs 3 legacy)
> - Confirmer que les pondérations legacy sont toujours d'actualité
