# 📘 Guide d'implémentation — Complétude → Templates officiels

> **Objectif** : Expliquer comment les propositions de complétude, une fois validées par Dr. Monka, sont intégrées dans les templates officiels (`KERNEL/VALIDATION_MP/`).

---

## Processus en 4 étapes

### Étape 1 — Rédaction du doc de complétude

Pour chaque MP où des manquements sont identifiés, un document est créé dans `KERNEL/COMPLETUDE/` avec :
- Le diagnostic (quels checks échouent et pourquoi)
- Les propositions d'ajout (règles, MT, corrections) avec raisonnement clinique
- L'impact attendu sur le score checklist

**Convention de nommage** : `{MP_ID}_{thème_court}.md`  
Exemple : `S1_charge_fatigue.md`, `F5_dependance.md`

### Étape 2 — Validation par Dr. Monka

Dr. Monka reçoit le document et valide ou ajuste chaque proposition :
- ✅ **Validé** : la proposition est adoptée telle quelle
- 🔄 **Modifié** : Dr. Monka ajuste le seuil, le niveau, l'acteur ou le libellé
- ❌ **Refusé** : la proposition est rejetée avec justification

Le document est annoté avec les décisions.

### Étape 3 — Intégration dans le template officiel

Une fois les propositions validées, le template officiel dans `KERNEL/VALIDATION_MP/` est mis à jour :

#### Pour les nouvelles règles d'activation
→ **ACTION 2** du template  
- Ajouter la règle dans la section de la catégorie concernée
- Utiliser le marqueur `🤖 Proposé → ✅ Validé Dr. Monka {date}` pour tracer l'origine
- Mettre à jour le tableau récapitulatif des règles
- Ajouter le raisonnement clinique (sens clinique)

#### Pour les nouvelles MT
→ **ACTION 3** du template  
- Ajouter la MT dans la catégorie concernée
- Renseigner toutes les colonnes : ID, libellé, type, acteur, 📍/💡, source
- Mettre à jour la synthèse MT (totaux, contributives, non-contributives)
- Ajouter le « Pourquoi N MT » si le nombre de MT de la catégorie change de façon significative

#### Pour les corrections d'acteur/domaine
→ **ACTION 4** du template  
- Modifier le tableau consolidé
- Mettre à jour le résumé chiffré

#### Pour les ajustements de wording
→ **ACTION 5** du template  
- Versionner les nouvelles MT/recos dans Phase 1 et Phase 2
- Ajouter les lignes dans les tableaux de wording versionnés

#### Mise à jour de la checklist
→ **ACTION 6** du template  
- Mettre à jour chaque check impacté avec le nouveau résultat
- Mettre à jour le score global (objectif : 8/8)

#### Mise à jour de la synthèse finale
- Mettre à jour les métriques (nombre de règles, MT, domaines…)
- Ajouter les nouvelles décisions dans le tableau « Décisions actées » avec la source `🤖 Validé Dr. Monka {date}`
- Supprimer ou mettre à jour la section « Évolutions Phase B » si les évolutions ont été implémentées

### Étape 4 — Mise à jour DB Supabase

Une fois le template officiel à jour, les ajouts sont implémentés en base :
- Insérer les nouvelles règles dans `activation_rules`
- Insérer les nouvelles MT dans `micro_taches`
- Mettre à jour les acteurs/domaines si corrigés
- Mettre à jour les recos dans `recommendations` si nécessaire

> ⚠️ **La DB est reconstruite à partir des templates officiels**, pas l'inverse. Les templates sont la source de vérité.

---

## Marqueurs de traçabilité

| Marqueur | Signification |
|---|---|
| `Legacy ✅` | Donnée existante en base, validée par usage |
| `🤖 Proposé` | Proposition de l'IA, en attente de validation |
| `🤖 Validé Dr. Monka {date}` | Proposition validée par Dr. Monka à la date indiquée |
| `🔄 Modifié Dr. Monka {date}` | Proposition modifiée par Dr. Monka |
| `❌ Refusé Dr. Monka {date}` | Proposition refusée par Dr. Monka |

---

## Checklist de cohérence (8 checks)

Pour référence, voici les 8 vérifications que chaque template officiel doit satisfaire à 8/8 :

| # | Vérification | Critère |
|---|---|---|
| 1 | Chaque question du MP → ≥1 règle d'activation | Aucune question ne doit rester « muette » |
| 2 | Chaque règle d'activation → ≥1 version de reco | Chaque règle doit produire une action |
| 3 | Chaque catégorie de reco → ses MT assignées | Pas de catégorie vide |
| 4 | K3 respecté (≥2 niveaux par catégorie) | Escalade possible (Standard → CCC ou CCC → Critique) |
| 5 | Aucune MT orpheline | Toute MT est rattachée à une reco et une catégorie |
| 6 | Reco prévention présente | Message quand le MP n'est PAS activé |
| 7 | Wording reco = conseil, MT = verbe d'action | Cohérence linguistique |
| 8 | Sens clinique renseigné pour chaque règle | Raisonnement documenté |

---

## État des docs de complétude

| MP | Doc | Score actuel | Propositions | Statut |
|---|---|---|---|---|
| S1 | [S1_charge_fatigue.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S1_charge_fatigue.md) | 5/8 | 8 propositions | 🟠 En attente |
| S2 | [S2_inquietudes_securite.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S2_inquietudes_securite.md) | 6/8 | 5 propositions | 🟠 En attente |
| S3 | [S3_sante_physique.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S3_sante_physique.md) | 6/8 | 4 propositions | 🟠 En attente |
| S4 | [S4_hygiene_de_vie.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S4_hygiene_de_vie.md) | 6/8 | 7 propositions | 🟠 En attente |
| F1-F6 | — | Non évalué | — | ⬜ À faire |
| M1-M6 | — | Non évalué | — | ⬜ À faire |

---

> **Ce guide sera mis à jour au fur et à mesure de l'avancement de l'officialisation des templates.**
