# 🔍 Complétude MP — S3 — Santé physique et renoncement aux soins

> **Vulnérabilité** : V3 — Santé de l'Aidant  
> **Template officiel** : [S3.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V3/S3.md)  
> **Score checklist actuel** : 6/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

S3 est le MP le plus riche en MT de V3 (18 MT dont 16 MED) mais le plus pauvre en règles d'activation : **1 seule règle CCC** pour **9 questions**. L'architecture est de type « carte-et-déclenche » : 7 questions factuelles (O37-O43) cartographient la situation mais ne déclenchent RIEN. Seules E18 et O44 activent le CCC.

| # | Manquement | Check concerné | Impact |
|---|---|---|---|
| 1 | **7 questions sans règle** (O37, O38, O39, O40, O41, O42, O43) | Check #1 | Aucune question factuelle ne déclenche d'action — même un aidant sans MT (O37=Non) ne reçoit rien |
| 2 | **K3 non respecté** — 1 seul niveau (CCC) pour les 3 catégories | Check #4 | Pas d'escalade possible, tout est CCC (≤30j) ou rien |

---

## Manquement 1 — Questions factuelles sans règle d'activation

### Le problème

Sur les 9 questions de S3, **7 ne déclenchent aucune règle** :

| Question | Libellé | Réponses | Pourquoi c'est un problème |
|---|---|---|---|
| **O37** | Avez-vous un médecin traitant ? | Oui / **Non** | Un aidant **sans médecin traitant** n'a aucun filet de sécurité médicale. C'est le signal le plus critique de S3 : pas de MT = pas de bilan possible, pas de suivi. En V1/V2, ce type de « fait binaire négatif » déclenche TOUJOURS au minimum un Standard. |
| **O38** | Avez-vous des spécialistes ? | Oui / **Non** | Indique une absence de suivi avancé. Moins critique que O37 — un aidant peut ne pas avoir besoin de spécialistes. |
| **O39** | Lesquels ? | Liste spécialités | Question de détail (conditionnel O38=Oui). Sert à cibler les MT de RDV. Pas de règle nécessaire en soi. |
| **O40** | RDV médicaux réalisés cette année ? | Oui / **Non** | « Non » = aucun RDV médical cette année. C'est un indicateur de **renoncement aux soins** — plus fort que la charge subjective. En santé publique, l'absence de suivi annuel est un facteur de risque majeur. |
| **O41** | Lesquels ? | Liste examens | Question de détail (conditionnel O40=Oui). Pas de règle nécessaire en soi. |
| **O42** | Maladies ? | Liste pathologies | Inventaire factuel. Pourrait déclencher une action si pathologies lourdes détectées (cancer, cardiovasculaire) mais c'est complexe à modéliser. |
| **O43** | Médicaments quotidiens ? | 1-3 / 4-6 / **7+** / Aucun | La **polymédication** (≥7 médicaments) est un facteur de risque pharmaceutique reconnu. Un bilan de médication devient prioritaire. |

### Ce que je propose

> 💡 Seules les questions avec un seuil clinique clair sont proposées comme règles. O38, O39, O41, O42 sont des questions de contexte qui n'ont pas de seuil d'activation évident.

#### Proposition 1.1 — Règle Standard pour O37

```
SI O37 = « Non » (pas de médecin traitant)
ALORS → V3_S3_STD_01 (Standard) → CAT_02 (accès au MT)
```

**Raisonnement** : Un aidant sans médecin traitant est un aidant sans filet médical. C'est le cas le plus critique de S3 et le plus simple à adresser : l'IDEC utilise les dispositifs existants (DAC/CPTS, CPAM) pour aider l'aidant à trouver un MT. La reco legacy (S3_RECO_02) existe déjà pour cette situation — il manque juste la RÈGLE qui la déclenche.

**Pourquoi Standard et pas CCC ?** L'absence de MT est un problème structurel, pas une urgence. Le Standard donne 90 jours pour résoudre — le temps de trouver un MT disponible (pénurie médicale réelle).

#### Proposition 1.2 — Règle Standard pour O40

```
SI O40 = « Non » (aucun RDV médical cette année)
ALORS → V3_S3_STD_02 (Standard) → CAT_01 (bilan de santé)
```

**Raisonnement** : L'absence de suivi médical annuel est un marqueur de renoncement aux soins. Quand l'aidant n'a réalisé AUCUN RDV cette année, c'est un signal qui justifie une incitation à reprendre le suivi. La reco legacy (S3_RECO_04 : « Demandez un bilan de santé ») existe déjà — il manque la règle.

**Alternative** : Combiné avec O44 = « Identique » (pas « Moins bonne » = pas de CCC), on pourrait faire un Standard ciblé : l'aidant ne se sent pas plus mal mais ne va pas chez le médecin → promotion du suivi préventif. À discuter.

#### Proposition 1.3 — Règle Standard pour O43

```
SI O43 = « 7 médicaments et plus »
ALORS → V3_S3_STD_03 (Standard) → CAT_03 (bilan médication)
```

**Raisonnement** : La polymédication (≥7 médicaments/jour) est un facteur de risque reconnu (interactions médicamenteuses, effets secondaires cumulés). La reco legacy (S3_RECO_05 : « Bilan de médication ») existe déjà. Le seuil de 7 est standard en gériatrie (critère STOPP/START).

**Alternative** : Seuil à 4+ médicaments (polypharmacie modérée) en Standard, 7+ en CCC. À discuter.

---

## Manquement 2 — K3 non respecté (mono-niveau)

### Le problème

Les 3 catégories n'ont qu'un seul niveau (CCC). Aucun Standard. L'aidant est soit en CCC (santé perçue dégradée + mauvais sommeil) soit en prévention (⚪). Il n'y a pas de niveau intermédiaire.

### Ce que je propose

Les propositions 1.1, 1.2, et 1.3 ci-dessus résolvent automatiquement ce manquement :

| Catégorie | Avant | Après |
|---|---|---|
| CAT_01 (bilan santé) | CCC seulement | **STD** (O40=Non) + CCC |
| CAT_02 (accès MT) | CCC seulement | **STD** (O37=Non) + CCC |
| CAT_03 (suivi spé/médic.) | CCC seulement | **STD** (O43≥7) + CCC |

---

## Point complémentaire — Clarification K11

### Le contexte

S3 a 16 MT contributives (MED). En théorie, K11 exige que 100% des MT contributives soient complétées pour valider l'ASR. Mais les 13 MT de spécialistes (MT_V3_015 à MT_V3_030) sont conditionnées par O39 — seules celles correspondant aux spécialistes déclarés par l'aidant sont pertinentes.

### Ma recommandation

K11 devrait s'appliquer **uniquement aux MT activées par les réponses de l'aidant** (O39 pour les spécialistes). L'aidant qui n'a pas de cardiologue ne devrait pas avoir à compléter MT_V3_017 pour valider l'ASR.

> ⚠️ Ce point n'affecte pas le score checklist mais est crucial pour la viabilité du produit. Dr. Monka doit statuer.

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | O37 = Non → CAT_02 | #1, #4 | 🟠 Haute |
| 1.2 | Règle STD | O40 = Non → CAT_01 | #1, #4 | 🟠 Haute |
| 1.3 | Règle STD | O43 ≥ 7 → CAT_03 | #1, #4 | 🟡 Moyenne |
| — | Clarification | K11 conditionné par O39 | ASR | 🟠 Haute |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ⚠️ 2/9 questions activent | ✅ 5/9 (O39, O41, O42 restent contextuelles — justifié) |
| #4 — K3 ≥2 niveaux | ⚠️ 0/3 catégories | ✅ 3/3 catégories (STD + CCC) |
| **Score global** | **6/8** | **8/8** |

> **Note** : O38, O39, O41, O42 restent sans règle individuelle. C'est **justifié** :
> - O38/O39 = questions de détail qui ciblent les MT (pas d'activation directe)
> - O41 = liste d'examens réalisés (idem)
> - O42 = inventaire de pathologies (trop hétérogène pour une règle simple)

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel S3.md.**
