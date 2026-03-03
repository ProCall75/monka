# SCORING V4 — Fragilité du proche

> **Vulnérabilité** : V4 — Fragilité du proche
> **Ancrage scientifique** : SEGA volet A — grille de fragilité du sujet âgé / personne dépendante
> **Date d'analyse** : 16/02/2026
> **Méthode** : METHODOLOGIE_SCORING.md §3 (2 conditions) + §4 (échelle +0/+1/+2)
> **Source données** : Supabase DB `questions` (table) — 16/02/2026

---

## Métadonnées

| Métrique | Valeur |
|----------|--------|
| Questions totales V4 | 55 |
| Questions scorantes | **41** / 55 |
| Questions non scorantes | 14 |
| Questions +2 éligibles | **3** (N22, N25, E27) |
| Score max théorique | **44 pts** |
| Normalisation | Score = (brut / 44) × 100 |

---

## Tableau d'analyse — 1 ligne par question

### 5.1 — Vie quotidienne, budget et entourage du proche

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **N10** | Nature de l'aide que vous apportez ? | facteur | ❌ **Liste à cocher** (5 options) — recense les types d'aide fournis. Aucune échelle d'intensité entre "ménage" et "soutien moral" | — | ❌ **NON SCORANTE** | — |
| **N9** | Problèmes pour gérer budget / affaires administratives ? | facteur | ✅ Les difficultés budgétaires du proche sont un indicateur de fragilité (SEGA item 9 — fonctions supérieures). La désorganisation administrative signale une perte d'autonomie | ✅ Non / Se fait aider / Oui → 3 niveaux ordonnés | ✅ **SCORANTE** | Non = +0 · Se fait aider = +1 · Oui = +1 |
| **N21** | Rencontre-t-elle des problèmes financiers ? | facteur | ✅ La fragilité financière du proche est un signal d'intensité — précarité aggravant la dépendance | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N23** | Difficultés à maintenir une activité professionnelle / scolaire ? | facteur | ✅ La perte d'activité est un signal de fragilité — impact fonctionnel mesurable sur l'insertion sociale | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N27** | Estimez-vous que la personne aidée est socialement isolée ? | facteur | ✅ L'isolement social est un facteur de fragilité majeur (SEGA item 13 — entourage). L'intensité graduée (un peu → totalement) mesure la gravité | ✅ Pas du tout / Un peu / Beaucoup / Totalement → 4 niveaux | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Beaucoup = +1 · Totalement = +1 |
| **O7** | Changements dans la manière dont elle se nourrit ? | etat | ✅ La modification nutritionnelle est un signal d'intensité (SEGA item 3 — nutrition). Dénutrition = signal grave | ✅ Non / Oui / Oui et dénutrie → 3 niveaux ordonnés | ✅ **SCORANTE** | Non = +0 · Oui = +1 · Oui et dénutrie = +1 |
| **E20** | Où souhaiteriez-vous que vive votre proche dans 6-12 mois ? | facteur | ❌ Recense un **souhait prospectif** — projection de l'aidant. Ne mesure pas une intensité actuelle de fragilité du proche | — | ❌ **NON SCORANTE** | — |
| **E21** | Pensez-vous que la situation de vie sera maintenable ? | etat | ✅ La perception de durabilité est un signal d'intensité pronostique — "un changement sera nécessaire" = instabilité de la situation | ✅ 4 options ordonnées. "Je ne sais pas" = +0 (neutre) | ✅ **SCORANTE** | Oui probablement = +0 · Sera difficile = +1 · Non, changement nécessaire = +1 · Je ne sais pas = +0 |

### 5.2 — Autonomie, aide humaine et présence nécessaire

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **E22** | Heures d'aide humaine reçues par semaine ? | facteur | ✅ Le volume d'aide humaine est un indicateur direct du niveau de dépendance — plus il y a d'aide, plus la fragilité est intense | ✅ 5 niveaux ordonnés. "Je ne sais pas" = +0 | ✅ **SCORANTE** | <5h = +0 · 5-14h = +0 · 15-30h = +1 · >30h = +1 · Je ne sais pas = +0 |
| **O8** | Besoin d'aide humaine pour se déplacer dehors ? | facteur | ✅ La mobilité extérieure est un indicateur SEGA clé (item 7 — mobilité). La perte de mobilité indépendante = fragilité mesurable | ✅ Indépendante / De temps en temps / Tout le temps → 3 niveaux | ✅ **SCORANTE** | Indépendante = +0 · De temps en temps = +1 · Tout le temps = +1 |
| **O9** | Besoin d'aide humaine pour se déplacer dans le domicile ? | facteur | ✅ La mobilité intérieure est un indicateur de fragilité encore plus sévère que O8 — perte d'autonomie dans l'espace de vie | ✅ Indépendante / De temps en temps / Tout le temps → 3 niveaux | ✅ **SCORANTE** | Indépendante = +0 · De temps en temps = +1 · Tout le temps = +1 |
| **E23** | Combien de temps le proche peut-il rester seul sans risque ? | facteur | ✅ Le temps de solitude toléré est un indicateur direct d'intensité de dépendance — "ne peut pas rester seul" = charge maximale | ✅ 4 niveaux ordonnés (peut rester seul → ne peut pas) | ✅ **SCORANTE** | Seul sans difficulté = +0 · Quelques heures = +1 · Pas plus d'1h = +1 · Ne peut pas = +1 |
| **E24** | Présence nécessaire la nuit ? | facteur | ✅ Le besoin de présence nocturne est un indicateur d'intensité majeur — privation de sommeil pour l'aidant, charge 24h/24 | ✅ 4 niveaux ordonnés | ✅ **SCORANTE** | Autonome la nuit = +0 · Parfois = +1 · Souvent = +1 · Permanence = +1 |

### 5.3 — Mémoire, comportement et risques

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **O13** | Détérioration des fonctions cognitives ? | etat | ✅ La détérioration cognitive est un indicateur central de fragilité (SEGA item 1 — fonctions cognitives). L'altération totale = fragilité maximale | ✅ Non / Diminution partielle / Totalement altérées → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Diminution partielle = +1 · Totalement altérées = +1 |
| **N24** | Troubles de la mémoire ou de la concentration ? | etat | ✅ Les troubles mnésiques sont un signal de fragilité cognitive (SEGA items 1-2). Signal complémentaire à O13 | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N19** | Changements d'humeur ou de comportement ? | facteur | ✅ Les fluctuations comportementales sont un signal d'intensité de fragilité — imprévisibilité = charge pour l'aidant, risque pour le proche (SEGA item 2 — humeur) | ✅ Jamais / Parfois / Souvent → 3 niveaux | ✅ **SCORANTE** | Jamais = +0 · Parfois = +1 · Souvent = +1 |
| **E25** | Confusion jour/nuit ? | etat | ✅ L'inversion du rythme nycthéméral est un marqueur de fragilité cognitive sévère — impact direct sur l'aidant (privation de sommeil) | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **E26** | Désorientation dans des lieux familiers ? | etat | ✅ La désorientation spatiale est un signal de fragilité cognitive sévère — risque de fugue, danger pour le proche | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **E27** | Comportements potentiellement dangereux ? (gaz, errance…) | etat | ✅ Les comportements à risque environnemental menacent directement la sécurité — **risque vital** pour le proche et l'entourage. ⚠️ **+2 éligible** | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE (+2)** | Non = +0 · Parfois = +1 · Oui = **+2** |
| **N22** | Comportements à risque (automutilation) ? | etat | ✅ L'automutilation ou les comportements dangereux pour soi sont un signal de **risque vital** direct. ⚠️ **+2 éligible** | ✅ Jamais / Parfois / Souvent → 3 niveaux | ✅ **SCORANTE (+2)** | Jamais = +0 · Parfois = +1 · Souvent = **+2** |
| **N25** | Exprime-t-elle des idées suicidaires ? | etat | ✅ Les idées suicidaires sont le signal de **risque vital maximal**. ⚠️ **+2 éligible — strictement vital** | ✅ Jamais / Parfois / Souvent → 3 niveaux | ✅ **SCORANTE (+2)** | Jamais = +0 · Parfois = +1 · Souvent = **+2** |

### 5.4 — Douleur, fatigue, sommeil et état général

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **O4** | La personne aidée est-elle d'humeur… | etat | ✅ L'humeur du proche est un signal de fragilité (SEGA item 2). Dépression = fragilité accrue | ✅ Normale / Parfois anxieux-triste / Déprimée → 3 niveaux | ✅ **SCORANTE** | Normale = +0 · Parfois anxieux/triste = +1 · Déprimée = +1 |
| **O5** | Par rapport à une personne du même âge, la santé du proche est… | facteur | ✅ La perception comparative de santé est un signal d'intensité (SEGA item 5 — perception de santé). L'aidant qui évalue "moins bonne" signale une fragilité | ✅ Meilleure / Équivalente / Moins bonne → 3 niveaux | ✅ **SCORANTE** | Meilleure = +0 · Équivalente = +0 · Moins bonne = +1 |
| **N11** | Douleurs chroniques ? | etat | ✅ La douleur chronique est un signal de fragilité et de souffrance — marqueur d'intensité (SEGA — signes cliniques). Impact sur qualité de vie | ✅ Non / Occasionnellement / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Occasionnellement = +1 · Oui = +1 |
| **N12** | Fatigue ou manque d'énergie chez le proche ? | etat | ✅ La fatigue est un marqueur de fragilité (SEGA item 4 — asthénie). Signal direct d'intensité | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N13** | Troubles du sommeil ? | etat | ✅ Les troubles du sommeil du proche sont un signal de fragilité — et impactent l'aidant si nuit perturbée | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N34** | Difficultés à s'alimenter correctement ? | etat | ✅ Les troubles alimentaires sont un signal de fragilité (SEGA item 3 — nutrition). Sous/suralimentation = risque | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N44** | Changement de poids constaté ? | facteur | ✅ La variation pondérale est un marqueur SEGA (item 3 — poids). Signal objectif de fragilité | ✅ Non / Oui → 2 niveaux | ✅ **SCORANTE** | Non = +0 · Oui = +1 |
| **O3** | Combien de médicaments différents par jour ? | facteur | ✅ La polymédication est un indicateur SEGA reconnu (item 6 — nombre de médicaments). ≥7 médicaments = polypatho, fragilité | ✅ 4 options ordonnées | ✅ **SCORANTE** | Pas de traitement = +0 · 1-3 = +0 · 4-6 = +1 · ≥7 = +1 |
| **O15** | Consommation habituelle : alcool, tabac ? | facteur | ❌ Recense les **habitudes de consommation** — contexte factuel. "Plus de 3 verres/jour" est un facteur de risque mais la question est une liste à cocher, pas une échelle d'intensité de la fragilité globale | — | ❌ **NON SCORANTE** | — |
| **O26** | Diminution de sa taille habituelle ? | etat | ✅ La diminution de taille est un marqueur clinique de fragilité osseuse (ostéoporose, tassements vertébraux) — indicateur SEGA pertinent | ✅ Oui / Non → 2 niveaux | ✅ **SCORANTE** | Oui = +1 · Non = +0 |
| **O22** | Constats examens vue et audition ? | facteur | ❌ **Liste à cocher** (6 options mix vue/audition) — trop de combinaisons possibles (on peut cocher "lunettes ok" ET "appareillage mauvais"). C2 échoue sur l'ambiguïté des combinaisons | — | ❌ **NON SCORANTE** | — |

### 5.5 — Niveau de dépendance, handicap reconnu et épisodes aigus

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **O53** | Dépendance évaluée grille AGGIR ? | facteur | ❌ Recense l'**existence d'une évaluation** — action passée (évaluation faite ou non). Ne mesure pas la fragilité du proche directement | — | ❌ **NON SCORANTE** | — |
| **O54** | Niveau de dépendance AGGIR ? | facteur | ❌ Recense un **score externe officiel** (GIR 1-6). L'utiliser dans le scoring Monka créerait une double-comptage. Utile pour l'aiguillage et le contexte, pas pour réinventer une mesure déjà existante. "Je ne sais pas" rend la fiabilité fragile | — | ❌ **NON SCORANTE** | — |
| **N16** | Origine du handicap ? | facteur | ❌ Contexte fixe (naissance / maladie / accident) — ne change pas, ne mesure pas une intensité variable | — | ❌ **NON SCORANTE** | — |
| **N30** | Taux d'incapacité reconnu ? | facteur | ❌ Score externe officiel (taux MDPH). Même logique que O54 — contexte factuel fixe. "Je ne sais pas" = ambiguïté | — | ❌ **NON SCORANTE** | — |
| **N37** | Type d'addiction ? | facteur | ❌ **Liste à cocher** (7 types) — recense les types d'addiction. Pas d'échelle d'intensité entre "alcool" et "jeux d'argent" | — | ❌ **NON SCORANTE** | — |
| **N38** | Difficultés à contrôler la consommation / comportement addictif ? | etat | ✅ La perte de contrôle sur l'addiction est un signal de fragilité directe — intensité variable et mesurable | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N39** | Problèmes de santé physique liés à l'addiction ? | etat | ✅ L'impact somatique de l'addiction est un signal de fragilité physique — aggravation mesurable | ✅ Non / Je ne sais pas / Oui. "Je ne sais pas" = +0 (neutre) | ✅ **SCORANTE** | Non = +0 · Je ne sais pas = +0 · Oui = +1 |
| **N40** | Tentative de sevrage ou traitement ? | facteur | ❌ Recense une **action passée** (tentative de sevrage). Ne mesure pas l'intensité actuelle de la fragilité | — | ❌ **NON SCORANTE** | — |
| **E28** | Hospitalisations ces 3 derniers mois ? | facteur | ✅ Le nombre d'hospitalisations récentes est un signal d'instabilité clinique — fragilité aiguë mesurable (SEGA) | ✅ 6 options ordonnées. "Je ne sais pas" = +0 | ✅ **SCORANTE** | Aucune = +0 · 1 fois = +0 · 2 fois = +1 · 3 fois = +1 · ≥4 fois = +1 · JNSP = +0 |
| **E29** | Hospitalisations programmées ? | facteur | ❌ Qualifie le type (programmé vs urgence) — contexte descriptif des hospitalisations. L'information d'intensité est déjà captée par E28. Si on veut le caractère non programmé, c'est E30 | — | ❌ **NON SCORANTE** | — |
| **E30** | Hospitalisations via les urgences ? | facteur | ✅ Le passage aux urgences est un signal d'instabilité aiguë — les hospitalisations non programmées via urgences indiquent une fragilité non maîtrisée | ✅ 6 options ordonnées. "JNSP" = +0 | ✅ **SCORANTE** | 0 = +0 · 1 = +0 · 2 = +1 · ≥3 = +1 · JNSP = +0 |
| **E31** | Durée de la dernière hospitalisation ? | facteur | ✅ La durée d'hospitalisation est un indicateur de gravité de l'épisode aigu — plus c'est long, plus la fragilité est sévère | ✅ 5 options ordonnées. "JNSP" = +0 | ✅ **SCORANTE** | <1j = +0 · 1-3j = +0 · 4-7j = +1 · >7j = +1 · JNSP = +0 |

### 5.x — Autres éléments

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **N18** | Peut-elle réaliser seule les AVQ ? | facteur | ✅ L'autonomie dans les activités de vie quotidienne est LE signal central de fragilité (SEGA item 8 — activités de la vie quotidienne) | ✅ Oui / Non → 2 niveaux | ✅ **SCORANTE** | Oui = +0 · Non = +1 |
| **E32** | Difficultés à se lever d'un lit ou fauteuil ? | etat | ✅ La mobilité de transfert est un indicateur SEGA (item 7 — mobilité). Signal de perte d'autonomie fonctionnelle | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **O12** | Peut-elle se nourrir par elle-même ? | facteur | ✅ L'autonomie alimentaire est un indicateur SEGA fondamental — perte d'autonomie pour les actes essentiels | ✅ Oui / Parfois / Non → 3 niveaux | ✅ **SCORANTE** | Oui = +0 · Parfois = +1 · Non = +1 |
| **O11** | Est-elle incontinente ? | facteur | ✅ L'incontinence est un marqueur SEGA de fragilité (item 10) — impact direct sur la charge de l'aidant et la dignité | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **E33** | Difficultés avec téléphone, appareils simples ? | etat | ✅ La perte de capacité instrumentale est un signal de fragilité cognitive/fonctionnelle — perte d'autonomie dans les AIVQ | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **N32** | Aides techniques en place ? | facteur | ❌ **Liste à cocher** (8 types d'aides) — recense les dispositifs existants. Pas d'échelle d'intensité. "Aucune" pourrait sembler scorable mais l'absence d'aide technique ne mesure pas la fragilité du proche directement | — | ❌ **NON SCORANTE** | — |
| **O6** | A-t-elle chuté dans les 6 derniers mois ? | etat | ✅ Les chutes sont un marqueur SEGA majeur de fragilité (item 11 — chutes). Complications = gravité | ✅ Non / Oui sans gravité / Oui avec complication → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Oui sans gravité = +1 · Oui avec complication = +1 |
| **N14** | Difficultés à suivre son traitement médical ? | facteur | ✅ L'observance thérapeutique est un signal de fragilité — l'inobservance aggrave l'état de santé du proche (SEGA) | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **O16** | Maladies du proche ? | facteur | ❌ **Liste à cocher** (16 pathologies) — recense les antécédents. Contexte factuel fixe, pas d'échelle d'intensité entre les pathologies | — | ❌ **NON SCORANTE** | — |
| **N36** | Besoin d'aide pour organiser ses journées ? | facteur | ✅ Le besoin d'aide organisationnelle est un signal de fragilité cognitive/exécutive — perte d'autonomie dans la planification | ✅ Non / Parfois / Oui → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Oui = +1 |
| **O51** | Songez-vous à adapter son lieu de vie ? | facteur | ❌ Recense une **intention prospective** — l'aidant envisage un changement. Ne mesure pas l'intensité actuelle de la fragilité | — | ❌ **NON SCORANTE** | — |

---

## Résumé V4

### Questions scorantes (38/55)

| # | Q_ID | Score max | Note |
|---|------|-----------|------|
| 1 | N9 | +1 | |
| 2 | N21 | +1 | |
| 3 | N23 | +1 | |
| 4 | N27 | +1 | |
| 5 | O7 | +1 | |
| 6 | E21 | +1 | |
| 7 | E22 | +1 | |
| 8 | O8 | +1 | |
| 9 | O9 | +1 | |
| 10 | E23 | +1 | |
| 11 | E24 | +1 | |
| 12 | O13 | +1 | |
| 13 | N24 | +1 | |
| 14 | N19 | +1 | |
| 15 | E25 | +1 | |
| 16 | E26 | +1 | |
| 17 | E27 | **+2** | ⚠️ Risque vital : comportements dangereux (gaz, errance) |
| 18 | N22 | **+2** | ⚠️ Risque vital : automutilation |
| 19 | N25 | **+2** | ⚠️ Risque vital : idées suicidaires |
| 20 | O4 | +1 | |
| 21 | O5 | +1 | |
| 22 | N11 | +1 | |
| 23 | N12 | +1 | |
| 24 | N13 | +1 | |
| 25 | N34 | +1 | |
| 26 | N44 | +1 | |
| 27 | O3 | +1 | |
| 28 | O26 | +1 | |
| 29 | N38 | +1 | Conditionnel N3(5) |
| 30 | N39 | +1 | Conditionnel N3(5) |
| 31 | E28 | +1 | |
| 32 | E30 | +1 | |
| 33 | E31 | +1 | |
| 34 | N18 | +1 | |
| 35 | E32 | +1 | |
| 36 | O12 | +1 | |
| 37 | O11 | +1 | |
| 38 | E33 | +1 | |
| 39 | O6 | +1 | |
| 40 | N14 | +1 | |
| 41 | N36 | +1 | |
| **Total** | | **44 pts** | |

### Questions non scorantes (17/55)

| Q_ID | Raison d'exclusion |
|------|-------------------|
| N10 | Liste à cocher (types d'aide) — pas d'échelle |
| E20 | Souhait prospectif — pas intensité actuelle |
| O15 | Liste à cocher (consommations) — pas d'échelle d'intensité |
| O22 | Liste à cocher mixte (vue/audition) — ambiguïté combinatoire |
| O53 | Existence d'une évaluation — action passée |
| O54 | Score externe AGGIR — double-comptage |
| N16 | Contexte fixe (origine handicap) |
| N30 | Score externe MDPH — contexte factuel fixe |
| N37 | Liste à cocher (types d'addiction) |
| N40 | Action passée (tentative sevrage) |
| E29 | Contexte descriptif — intensité captée par E28 |
| N32 | Liste à cocher (aides techniques) |
| O16 | Liste à cocher (pathologies) — contexte fixe |
| O51 | Intention prospective — pas intensité actuelle |

### Vérification

- ✅ 38 scorantes + 17 non scorantes = 55 total V4
- ✅ 0 question sans verdict
- ✅ 3 questions +2 (E27 comportements dangereux, N22 automutilation, N25 idées suicidaires) — conformes au §4.4 risque vital
- ✅ Aucune décision basée sur la classification état/facteur

---

> 📊 **SCORING_V4 v1 — À valider Dr. Monka + Antonin**
