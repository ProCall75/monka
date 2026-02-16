# SCORING V1 — Social et relationnel

> **Vulnérabilité** : V1 — Social et relationnel
> **Ancrage scientifique** : Zarit (ZBI-22) — fardeau de l'aidant
> **Date d'analyse** : 16/02/2026
> **Méthode** : METHODOLOGIE_SCORING.md §3 (2 conditions) + §4 (échelle +0/+1/+2)
> **Source données** : Supabase DB `questions` (table) — 16/02/2026

---

## Métadonnées

| Métrique | Valeur |
|----------|--------|
| Questions totales V1 | 15 |
| Questions scorantes | **12** / 15 |
| Questions non scorantes | 3 |
| Questions +2 éligibles | 0 |
| Score max théorique | **14 pts** |
| Normalisation | Score = (brut / 14) × 100 |

---

## Tableau d'analyse — 1 ligne par question

| Q_ID | Intitulé | Classif | Sous-bloc | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-----------|-------------------|--------------|---------|-----------------|
| **O47** | À combien de temps habitez-vous du domicile de la personne aidée ? | facteur | Proximité & fréquence | ❌ Contexte géographique fixe — ne mesure pas une intensité de vulnérabilité mais une distance objective | — | ❌ **NON SCORANTE** | — |
| **O48** | Quelle est la fréquence de vos visites ? | facteur | Proximité & fréquence | ✅ La fréquence de visite est un signal d'intensité d'engagement et de charge. Un aidant qui visite tous les jours est plus sollicité | ✅ Échelle ordonnée : Tous les jours → … → 1×/an. "Autre" exclu du scoring | ✅ **SCORANTE** | Tous les jours = +1 · ≥1×/sem = +1 · ≥1×/mois = +0 · ≥1×/3mois = +0 · ≥1×/6mois = +0 · ≥1×/an = +0 · Autre = +0 |
| **N4** | Êtes-vous seul(e) à vous occuper de la personne aidée ? | facteur | Réseau d'aide | ✅ L'aide unique (aidant seul) est un prédicteur fort de fardeau dans la littérature Zarit. Informe directement sur l'intensité de la charge | ✅ Oui/Non → non ambigu | ✅ **SCORANTE** | Oui = +1 · Non = +0 |
| **E1** | Comment se passe la répartition de l'aide dans votre entourage ? | facteur | Réseau d'aide | ✅ La répartition déséquilibrée de l'aide est un signal d'intensité majeur — sentiment d'injustice, surcharge, isolement dans le rôle | ✅ 4 options ordonnées du plus équilibré au plus isolé | ✅ **SCORANTE** | Plutôt équilibrée = +0 · Je fais la plus grande partie mais acceptable = +0 · Je fais presque tout + tensions = +1 · Totalement seul·e = +1 |
| **E2** | En cas de coup dur, avez-vous des personnes sur qui compter ? | facteur | Réseau d'aide | ✅ Le soutien social est un facteur clé de résilience. L'absence de soutien aggrave fortement la vulnérabilité (Zarit items 4, 21) | ✅ 4 options ordonnées, du plus soutenu au plus isolé | ✅ **SCORANTE** | Oui, plusieurs = +0 · Oui, une = +0 · Très peu = +1 · Personne = +1 |
| **E3** | Quelles sont les autres personnes à charge autour de vous ? | facteur | Réseau d'aide | ❌ Recense les personnes à charge (enfants, dépendants) — c'est un **contexte factuel**, pas une intensité. Le fait d'avoir des enfants n'est pas en soi un signal de vulnérabilité | — | ❌ **NON SCORANTE** | — |
| **N20** | A-t-elle des difficultés à maintenir des relations sociales stables ? | facteur | Vie sociale aidé | ✅ Les difficultés relationnelles du proche impactent directement l'aidant (isolement partagé, charge sociale supplémentaire) | ✅ Non/Parfois/Oui → 3 niveaux ordonnés, non ambigu | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **O27** | Difficultés dans votre vie familiale ? | facteur et etat | Impact vie | ✅ L'impact sur la vie familiale est un indicateur direct d'intensité de vulnérabilité — retentissement concret et mesurable | ✅ Pas du tout / Un peu / Oui → 3 niveaux, non ambigu | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **O28** | Difficultés dans vos relations amicales, loisirs, travail ? | facteur et etat | Impact vie | ✅ L'impact sur la vie sociale/professionnelle est un signal d'intensité — restriction de vie directement liée au rôle d'aidant | ✅ Pas du tout / Un peu / Oui → 3 niveaux, non ambigu | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **N7** | Avez-vous dû aménager votre activité professionnelle ? | facteur | Impact vie | ✅ L'aménagement professionnel est un signal tangible d'impact — l'aidant sacrifie sa carrière pour son rôle | ✅ Non / Aménagé horaires / Pris congés → options fermées, ordonnables | ✅ **SCORANTE** | Non = +0 · Aménager horaires = +1 · Pris congés = +1 |
| **O30** | Avez-vous le sentiment de ne plus reconnaître la personne aidée ? | facteur et etat | Relation aidant-aidé | ✅ Le sentiment de perte de la relation est un signal d'intensité émotionnelle fort — deuil blanc, détresse relationnelle | ✅ Pas du tout / Un peu / Oui → 3 niveaux, non ambigu | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **E4** | Comment a évolué votre relation avec votre proche ? | etat | Relation aidant-aidé | ✅ L'évolution de la relation est un signal d'intensité — une relation qui se détériore aggrave le fardeau | ✅ 4 options ordonnées (renforcée → tendue). "Difficile à dire" = +0 (neutre, pas scorable en négatif) | ✅ **SCORANTE** | Renforcée/plus proche = +0 · Similaire = +0 · Plus tendue/compliquée = +1 · Difficile à dire = +0 |
| **O31** | Avez-vous peur pour l'avenir de la personne aidée ? | facteur et etat | Relation aidant-aidé | ✅ L'anxiété anticipatoire est un signal d'intensité reconnu — charge émotionnelle liée à l'incertitude et la projection | ✅ Pas du tout / Un peu / Oui → 3 niveaux, non ambigu | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **E5** | Tensions ou désaccords au sein de la famille pour la prise en charge ? | etat | Relation aidant-aidé | ✅ Les conflits familiaux liés à la prise en charge sont un signal d'intensité — surcharge émotionnelle, isolement dans la décision | ✅ Non / Parfois / Oui → 3 niveaux, non ambigu | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **E6** | Votre proche accepte-t-il l'aide de personnes extérieures ? | facteur | Réseau d'aide | ❌ Informe sur l'**attitude du proche** face à l'aide extérieure — c'est un facteur qui influence la situation, mais ne mesure pas directement l'intensité de la vulnérabilité de l'aidant. Le refus crée des difficultés mais c'est capté par d'autres questions (O27, O28) | — | ❌ **NON SCORANTE** | — |

---

## Résumé V1

### Questions scorantes (12/15)

| # | Q_ID | Score max |
|---|------|-----------|
| 1 | O48 | +1 |
| 2 | N4 | +1 |
| 3 | E1 | +1 |
| 4 | E2 | +1 |
| 5 | N20 | +1 |
| 6 | O27 | +1 |
| 7 | O28 | +1 |
| 8 | N7 | +1 |
| 9 | O30 | +1 |
| 10 | E4 | +1 |
| 11 | O31 | +1 |
| 12 | E5 | +1 |
| **Total** | | **14 pts** |

> **Score V1 normalisé** = (brut / 14) × 100

### Questions non scorantes (3/15)

| Q_ID | Raison d'exclusion |
|------|-------------------|
| O47 | Contexte géographique fixe (distance domicile) — pas une intensité |
| E3 | Contexte factuel (personnes à charge) — pas une intensité |
| E6 | Attitude du proche face à l'aide — facteur indirect, pas intensité de l'aidant |

### Vérification

- ✅ 12 scorantes + 3 non scorantes = 15 total V1
- ✅ 0 question sans verdict
- ✅ 0 question +2 (aucune question V1 ne relève du risque vital)
- ✅ Aucune décision basée sur la classification état/facteur

---

> 📊 **SCORING_V1 v1 — À valider Dr. Monka + Antonin**
