# 📋 Décision — Corrections des types de réponse (response_type)

> **Date** : 21/02/2026
> **Auteur** : Antonin / Agent
> **Statut** : ✅ Appliqué — en attente de validation Dr. Monka
> **Scope** : Table `questions` — colonne `response_type`

---

## Contexte

Le champ `response_type` de chaque question définit le mode de saisie présenté à l'aidant :
- **`choix_unique`** — l'aidant sélectionne UNE seule réponse parmi les options
- **`choix_multiple`** — l'aidant peut cocher PLUSIEURS réponses
- **`champ_libre`** — l'aidant saisit un texte libre (ex : code postal)

Lors d'un audit systématique, nous avons identifié **6 questions dont le type de réponse ne correspondait pas à l'intitulé ou à la nature clinique de la question**.

---

## Corrections appliquées

### 1. Questions qui disaient "plusieurs réponses possibles" mais étaient en choix unique

| ID | Question | Options | Ancien type | Nouveau type | Justification |
|---|---|---|---|---|---|
| **O39** | "Lesquels ?" (liste de 15 spécialistes médicaux) | Cardiologue, Oncologue, Neurologue, Pneumologue, Ophtalmologue, Psychiatre, Chirurgien-Dentiste, Gastro-entérologue, Endocrinologue, ORL, Gynécologue, Néphrologue, Gériatre, Dermatologue, Autre | `choix_unique` | `choix_multiple` | L'intitulé précise "plusieurs réponses possibles". Un patient peut voir plusieurs spécialistes. |
| **E40** | "Quelles sont les principales difficultés pour accéder aux soins ?" | 8 options (délais, disponibilité, transport, outils numériques, travail, coût, autre, pas de difficulté) | `choix_unique` | `choix_multiple` | L'intitulé précise "plusieurs réponses possibles". Un aidant peut cumuler plusieurs difficultés. |
| **E48** | "Votre proche est-il suivi pour ses troubles psychiques dans l'un des cadres suivants ?" | 6 options (MG, psychiatre, CMP, hôpital de jour, psychologue, aucun) | `choix_unique` | `choix_multiple` | L'intitulé précise "plusieurs réponses possibles". Un patient peut être suivi dans plusieurs cadres. |
| **E49** | "Quels types de professionnels sont impliqués dans le suivi de l'addiction ?" | 6 options (médecin, psychiatre, travailleur social, infirmier, association, aucun) | `choix_unique` | `choix_multiple` | L'intitulé précise "plusieurs réponses possibles". Plusieurs professionnels interviennent souvent ensemble. |

### 2. Questions reclassées par cohérence clinique

| ID | Question | Options | Ancien type | Nouveau type | Justification |
|---|---|---|---|---|---|
| **N3** | "Quelle proposition correspond le mieux à votre situation d'aidant ?" | 5 types d'aidance (vieillissement, handicap, maladie chronique, troubles psy, addiction) | `choix_unique` | `choix_multiple` | Un aidant peut aider une personne concernée par plusieurs situations (ex : handicap + troubles psychiques). Décision validée avec Antonin. |
| **N31** | "La personne aidée bénéficie-t-elle d'une prise en charge en établissement spécialisé ?" | 15 types d'établissements (EHPAD, USLD, MAS, FAM, etc.) | `choix_unique` | `choix_multiple` | Un patient peut fréquenter plusieurs structures (ex : un accueil de jour + des consultations en CMP). |

---

## Impact sur le moteur

### N3 en choix multiple — conséquences

Quand N3 devient `choix_multiple`, un aidant peut sélectionner "Handicap" ET "Troubles psychiques". Cela signifie :

1. **Questions conditionnelles** : les questions avec `condition_affichage = 'N3 = 2'` (handicap) ET `condition_affichage = 'N3 = 4'` (psy) seront TOUTES affichées → c'est le comportement souhaité
2. **Règles d'activation** : les rules qui testent `N3 = X` activeront si X fait partie des réponses sélectionnées
3. **Aidance field** : les questions avec `aidance = 'Handicap'` ET `aidance = 'Psy'` seront affichées → correct

> ⚠️ **Point d'attention** : le moteur applicatif doit être adapté pour traiter N3 comme un tableau de valeurs et non une valeur unique. À vérifier avec l'équipe technique.

### Autres corrections (O39, E40, E48, E49, N31)

Pas d'impact sur le moteur — ces questions n'ont pas de rules d'activation directes basées sur "réponse = X exactement". Elles participent au contexte clinique et aux recommandations via les catégories de reco.

---

## Prompt de rollback

> Si Dr. Monka souhaite annuler tout ou partie de ces corrections, copier-coller le prompt ci-dessous en remplaçant les IDs par les questions à rétablir :

```
Rollback response_type : remettre les questions suivantes en choix_unique :
- O39 (spécialistes) → remettre en choix_unique
- E40 (difficultés accès soins) → remettre en choix_unique
- E48 (suivi troubles psy) → remettre en choix_unique
- E49 (professionnels addiction) → remettre en choix_unique
- N3 (type d'aidance) → remettre en choix_unique
- N31 (établissement spécialisé) → remettre en choix_unique

Supprimer les IDs des questions que tu veux GARDER en choix_multiple.
Ne garder dans la liste que celles à rétablir.
```

---

> 📋 **Document à valider par Dr. Monka avant mise en production.**
