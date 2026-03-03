# SCORING V3 — Santé physique et psychologique

> **Vulnérabilité** : V3 — Santé physique et psychologique
> **Ancrage scientifique** : Zarit (ZBI-22) — fardeau de l'aidant (retentissement sur la santé)
> **Date d'analyse** : 16/02/2026
> **Méthode** : METHODOLOGIE_SCORING.md §3 (2 conditions) + §4 (échelle +0/+1/+2)
> **Source données** : Supabase DB `questions` (table) — 16/02/2026

---

## Métadonnées

| Métrique | Valeur |
|----------|--------|
| Questions totales V3 | 26 |
| Questions scorantes | **17** / 26 |
| Questions non scorantes | 9 |
| Questions +2 éligibles | **2** (E7, E10) |
| Score max théorique | **21 pts** |
| Normalisation | Score = (brut / 21) × 100 |

---

## Tableau d'analyse — 1 ligne par question

| Q_ID | Intitulé | Classif | Sous-bloc | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-----------|-------------------|--------------|---------|-----------------|
| **O29** | Retentissement sur votre santé physique et/ou psychique ? | etat | Charge & retentissement | ✅ Signal direct d'intensité — l'aidant évalue l'impact de son rôle sur sa propre santé. Item Zarit par excellence | ✅ Pas du tout / Un peu / Oui → 3 niveaux | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **O33** | Ressentez-vous une charge en vous occupant de cette personne ? | etat | Charge & retentissement | ✅ La charge ressentie est LE signal central du fardeau (Zarit items 1, 22). Mesure directe de l'intensité vécue | ✅ Pas du tout / Un peu / Oui → 3 niveaux | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **O50** | Combien de temps lui consacrez-vous ? | facteur | Temps d'aide | ✅ Le temps consacré à l'aide est un prédicteur d'intensité reconnu — plus de 10h/sem est un seuil critique dans la littérature | ✅ 4 options ordonnées (pas de temps → >10h/sem) | ✅ **SCORANTE** | Pas le temps = +0 · 1-5h/sem = +0 · 6-10h/sem = +1 · >10h/sem = +1 |
| **E7** | À quel point vous sentez-vous épuisé·e par votre rôle d'aidant ? | etat | Charge & retentissement | ✅ L'épuisement auto-évalué est un signal d'intensité maximale — "au bord de craquer" = risque d'effondrement. ⚠️ **+2 éligible** | ✅ 4 niveaux ordonnés (pas fatigué·e → épuisé·e) | ✅ **SCORANTE (+2)** | Pas fatigué·e = +0 · Un peu fatigué·e = +1 · Très fatigué·e = +1 · Épuisé·e/au bord de craquer = **+2** |
| **E8** | Sentiment d'être seul(e) émotionnellement ? | etat | Charge & retentissement | ✅ L'isolement émotionnel est un signal d'intensité fort — charge psychique sans soutien, prédicteur de dépression | ✅ Jamais / Parfois / Souvent / Tout le temps → 4 niveaux | ✅ **SCORANTE** | Jamais = +0 · Parfois = +1 · Souvent = +1 · Tout le temps = +1 |
| **E9** | Parvenez-vous à avoir du temps pour vous ? | etat | Temps pour soi | ✅ L'absence de temps pour soi est un indicateur d'intensité — l'aidant est absorbé par son rôle au détriment de sa propre vie | ✅ Oui/Non → non ambigu | ✅ **SCORANTE** | Oui = +0 · Non = +1 |
| **E10** | Sur le plan moral (stress, inquiétude), où vous situez-vous ? | etat | Temps pour soi & moral | ✅ L'état moral auto-évalué est un signal d'intensité psychologique centrale. "Débordé·e / au bord de craquer" = risque vital psychique. ⚠️ **+2 éligible** | ✅ 4 niveaux ordonnés | ✅ **SCORANTE (+2)** | Ça va globalement = +0 · Parfois tendu·e = +1 · Souvent tendu·e = +1 · Débordé·e/au bord de craquer = **+2** |
| **E11** | Pensez-vous pouvoir continuer dans les 6 prochains mois ? | etat | Besoin d'aide | ✅ La capacité à continuer est un signal d'intensité pronostique — "je ne pourrai plus" = point de rupture imminent | ✅ 4 options ordonnées | ✅ **SCORANTE** | Sans difficulté = +0 · Sera difficile = +1 · Pas sûr·e = +1 · Non, risque de ne plus y arriver = +1 |
| **E12** | Êtes-vous inquiet·ète que votre proche se fasse du mal ? | etat | Inquiétudes/sécurité | ✅ L'inquiétude sécuritaire est un signal d'intensité — l'aidant porte la charge mentale de la sécurité du proche | ✅ Non / Parfois / Souvent → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Souvent = +1 |
| **E13** | Êtes-vous inquiet·ète que votre proche mette d'autres en danger ? | etat | Inquiétudes/sécurité | ✅ L'inquiétude pour la sécurité d'autrui est un signal d'intensité — charge mentale supplémentaire, vigilance permanente | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **O32** | Souhaitez-vous être davantage aidé(e) ? | etat | Besoin d'aide | ✅ La demande d'aide supplémentaire est un signal d'intensité — l'aidant reconnaît ne plus suffire. Zarit item 22 | ✅ Pas du tout / Un peu / Oui → 3 niveaux | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **N8** | Arrêt de travail dans les 12 derniers mois lié au rôle d'aidant ? | facteur | Impact travail | ✅ L'arrêt de travail est un signal tangible d'intensité — l'impact est si sévère qu'il empêche l'activité professionnelle | ✅ 6 durées ordonnées (non → >6 mois) | ✅ **SCORANTE** | Non = +0 · <5j = +1 · 5j-1mois = +1 · 1-3mois = +1 · 3-6 mois = +1 · >6 mois = +1 |
| **E14** | Et au cours des 30 derniers jours ? | facteur | Impact travail | ✅ Précise la durée récente d'arrêt — complète N8, signal d'intensité actuelle (pas juste historique) | ✅ 3 durées ordonnées. Conditionnel (N8≠1) — si non posé, pas de score | ✅ **SCORANTE** | <3j = +0 · 4-7j = +1 · >7j = +1 |
| **O37** | Avez-vous un médecin traitant ? | facteur | Suivi médical | ❌ Recense l'**existence d'un suivi** — action factuelle. Avoir un MT ne dit pas si on souffre. L'absence de MT est utile pour l'aiguillage, pas pour la mesure d'intensité | — | ❌ **NON SCORANTE** | — |
| **O38** | Avez-vous d'autres médecins spécialistes ? | facteur | Suivi médical | ❌ Même logique — recense l'existence d'un suivi spécialiste. Facteur d'aiguillage, pas intensité | — | ❌ **NON SCORANTE** | — |
| **O39** | Lesquels ? (liste de spécialistes) | etat | Suivi médical | ❌ **Liste à cocher** (15 options) — recense les spécialistes consultés. Pas d'échelle d'intensité. Conditionnel (O38=1) | — | ❌ **NON SCORANTE** | — |
| **O40** | Rendez-vous médicaux réalisés cette année ? | facteur | Suivi médical | ❌ Action passée — recense si des RDV ont été faits. Ne mesure pas une intensité | — | ❌ **NON SCORANTE** | — |
| **O41** | Lesquels ? (liste d'examens) | facteur | Suivi médical | ❌ **Liste à cocher** (11 options) — recense les examens faits. Pas d'échelle, conditionnel (O40=1) | — | ❌ **NON SCORANTE** | — |
| **E15** | Difficultés à obtenir des RDV médicaux pour vous-même ? | etat | Suivi médical | ✅ La difficulté d'accès aux soins pour l'aidant est un signal d'intensité — l'aidant néglige sa propre santé à cause de son rôle | ✅ Pas du tout / Un peu / Oui → 3 niveaux | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **E16** | Depuis que vous êtes aidant, vos propres RDV médicaux… | etat | Suivi médical | ✅ Le renoncement aux soins est un signal d'intensité grave — l'aidant sacrifie sa santé pour son rôle | ✅ 5 options ordonnées. "Je ne sais pas" et "Je préfère ne pas répondre" = +0 (neutre) | ✅ **SCORANTE** | Gère normalement = +0 · Mal à prendre = +1 · Reporte/annule souvent = +1 · Je ne sais pas = +0 · Préfère ne pas répondre = +0 |
| **O42** | Maladies dont vous êtes/avez été concerné ? | facteur | Santé maladies | ❌ **Liste à cocher variable** (15 options de pathologies) — recense les antécédents médicaux. Contexte factuel fixe (on ne change pas de pathologie entre deux évaluations) | — | ❌ **NON SCORANTE** | — |
| **O43** | Combien de médicaments différents prenez-vous ? | facteur | Santé médicaments | ❌ Recense la polymédication — contexte factuel médical. Le nombre de médicaments informe indirectement mais manque de spécificité pour l'intensité de la vulnérabilité de l'aidant-en-tant-qu'aidant | — | ❌ **NON SCORANTE** | — |
| **O44** | Par rapport à une personne du même âge, votre santé est… | etat | Santé & hygiène | ✅ La perception comparative de santé est un signal d'intensité subjectif validé (SEGA item 5). L'aidant qui se dit "moins bien" signale un impact | ✅ Meilleure / Identique / Moins bonne → 3 niveaux | ✅ **SCORANTE** | Meilleure = +0 · Identique = +0 · Moins bonne = +1 |
| **E17** | Pratiquez-vous une activité physique régulière ? | facteur | Santé & hygiène | ❌ Recense une **habitude de vie** — l'absence d'activité physique est un facteur de risque mais pas un signal d'intensité de vulnérabilité. C'est un comportement, pas un état | — | ❌ **NON SCORANTE** | — |
| **E18** | Qualité de votre sommeil ces dernières semaines ? | etat | Santé & hygiène | ✅ La qualité du sommeil est un signal d'intensité direct — la privation de sommeil est un marqueur majeur d'épuisement de l'aidant | ✅ 4 niveaux ordonnés (bonne → très mauvaise) | ✅ **SCORANTE** | Bonne = +0 · Correcte = +0 · Mauvaise = +1 · Très mauvaise = +1 |
| **E19** | Quels sont vos principaux soucis de santé ? | etat | Santé & hygiène | ❌ **Liste à cocher** (8 options) — recense les problèmes de santé actuels. Utile pour l'aiguillage, mais pas d'échelle d'intensité entre les options. "Aucun en particulier" est la seule réponse protectrice, mais la multiplicité n'est pas scorable de manière non ambiguë | — | ❌ **NON SCORANTE** | — |

---

## Résumé V3

### Questions scorantes (17/26)

| # | Q_ID | Score max | Note |
|---|------|-----------|------|
| 1 | O29 | +1 | |
| 2 | O33 | +1 | |
| 3 | O50 | +1 | |
| 4 | E7 | **+2** | ⚠️ Risque vital : épuisement extrême |
| 5 | E8 | +1 | |
| 6 | E9 | +1 | |
| 7 | E10 | **+2** | ⚠️ Risque vital : détresse psychologique extrême |
| 8 | E11 | +1 | |
| 9 | E12 | +1 | |
| 10 | E13 | +1 | |
| 11 | O32 | +1 | |
| 12 | N8 | +1 | |
| 13 | E14 | +1 | Conditionnelle (N8≠1) |
| 14 | E15 | +1 | |
| 15 | E16 | +1 | |
| 16 | O44 | +1 | |
| 17 | E18 | +1 | |
| **Total** | | **21 pts** | |

### Questions non scorantes (9/26)

| Q_ID | Raison d'exclusion |
|------|-------------------|
| O37 | Existence d'un suivi (MT) — action factuelle |
| O38 | Existence d'un suivi spécialiste — action factuelle |
| O39 | Liste à cocher (spécialistes) — pas d'échelle |
| O40 | RDV faits cette année — action passée |
| O41 | Liste à cocher (examens) — pas d'échelle |
| O42 | Liste à cocher (pathologies) — contexte fixe |
| O43 | Polymédication — contexte médical, pas intensité-en-tant-qu'aidant |
| E17 | Habitude de vie (activité physique) — comportement, pas état |
| E19 | Liste à cocher (soucis de santé) — pas d'échelle d'intensité |

### Vérification

- ✅ 17 scorantes + 9 non scorantes = 26 total V3
- ✅ 0 question sans verdict
- ✅ 2 questions +2 (E7 épuisement extrême, E10 détresse psychologique) — conformes au §4.4 risque vital
- ✅ Aucune décision basée sur la classification état/facteur

---

> 📊 **SCORING_V3 v1 — À valider Dr. Monka + Antonin**
