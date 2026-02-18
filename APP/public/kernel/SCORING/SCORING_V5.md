# SCORING V5 — Parcours médical du proche

> **Vulnérabilité** : V5 — Parcours médical du proche
> **Ancrage scientifique** : SEGA volet A — grille de fragilité (parcours de soins, coordination)
> **Date d'analyse** : 16/02/2026
> **Méthode** : METHODOLOGIE_SCORING.md §3 (2 conditions) + §4 (échelle +0/+1/+2)
> **Source données** : Supabase DB `questions` (table) — 16/02/2026

---

## Métadonnées

| Métrique | Valeur |
|----------|--------|
| Questions totales V5 | 36 |
| Questions scorantes | **18** / 36 |
| Questions non scorantes | 18 |
| Questions +2 éligibles | 0 |
| Score max théorique | **19 pts** |
| Normalisation | Score = (brut / 19) × 100 |

---

## Tableau d'analyse — 1 ligne par question

### 6.1 — Compréhension du diagnostic et de la maladie

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **N17** | Type de handicap ? | facteur | ❌ **Liste à cocher** (10 types) — recense les types de handicap. Contexte factuel fixe, pas d'échelle d'intensité entre "moteur" et "cognitif" | — | ❌ **NON SCORANTE** | — |
| **N41** | Reconnaissance ALD ? | facteur | ❌ Recense un **statut administratif** — l'ALD est un contexte factuel (reconnaissance officielle), pas une intensité de vulnérabilité dans le parcours médical | — | ❌ **NON SCORANTE** | — |
| **E34** | Comprenez-vous bien la maladie et les besoins médicaux de votre proche ? | etat | ✅ Le niveau de compréhension du diagnostic est un signal d'intensité — un aidant qui ne comprend pas la maladie est plus vulnérable dans son accompagnement | ✅ Oui / Partiellement / Pas du tout → 3 niveaux | ✅ **SCORANTE** | Oui = +0 · Partiellement = +1 · Pas du tout = +1 |
| **E35** | Le diagnostic est-il clair et bien établi ? | etat | ✅ Le flou diagnostique est un signal d'intensité — l'errance diagnostique génère une charge psychologique et des décisions médicales incertaines | ✅ 4 options ordonnées. "Je ne sais pas" = +0 (neutre) | ✅ **SCORANTE** | Clair = +0 · Plusieurs hypothèses = +1 · Pas de diagnostic = +1 · JNSP = +0 |
| **E36** | Beaucoup de consultations/examens sans clarification ? | etat | ✅ L'errance médicale ("tourner en rond") est un signal d'intensité du parcours — parcours fragmenté, charge psychologique et logistique | ✅ Non / Un peu / Beaucoup → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Un peu = +1 · Beaucoup = +1 |
| **E37** | Avis médicaux contradictoires reçus ? | etat | ✅ Les avis contradictoires sont un signal de complexité du parcours — manque de coordination, confusion, charge décisionnelle pour l'aidant | ✅ Non / Parfois / Souvent → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Parfois = +1 · Souvent = +1 |
| **E38** | Transition services enfant → adulte organisée ? | facteur | ❌ Recense l'**organisation d'une transition** — conditionnel, spécifique à un moment de vie. "Pas concerné" rend le scoring ambigu. Utile pour l'aiguillage, pas l'intensité globale du parcours | — | ❌ **NON SCORANTE** | — |

### 6.2 — Accès aux soins et aux professionnels de santé

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **O17** | Le proche a-t-il un médecin traitant ? | facteur | ❌ Recense l'**existence d'un suivi** — facteur binaire d'aiguillage, pas intensité. L'absence de MT est utile pour la recommandation, pas pour le score | — | ❌ **NON SCORANTE** | — |
| **O18** | D'autres médecins spécialistes ? | facteur | ❌ Même logique — existence d'un suivi spécialiste. Aiguillage, pas intensité | — | ❌ **NON SCORANTE** | — |
| **O19** | Lesquels ? (liste spécialistes) | facteur | ❌ **Liste à cocher** (15 options) — recense les spécialistes consultés. Pas d'échelle | — | ❌ **NON SCORANTE** | — |
| **O20** | RDV médicaux réalisés cette année ? | facteur | ❌ Action passée — existence de RDV. Aiguillage, pas intensité | — | ❌ **NON SCORANTE** | — |
| **O21** | Lesquels ? (liste examens) | facteur | ❌ **Liste à cocher** (11 options) — recense les examens. Pas d'échelle | — | ❌ **NON SCORANTE** | — |
| **E39** | Premier professionnel à moins de 15 min ? | facteur | ❌ Contexte géographique fixe — la distance au professionnel est un facteur d'accès objectif mais ne mesure pas une intensité variable de vulnérabilité | — | ❌ **NON SCORANTE** | — |
| **O24** | Difficultés à prendre RDV chez des spécialistes ? | etat | ✅ La difficulté d'accès aux spécialistes est un signal d'intensité — l'aidant qui peine à organiser les soins du proche subit une charge supplémentaire | ✅ Pas du tout / Un peu / Oui → 3 niveaux | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **E40** | Principales difficultés d'accès aux soins ? | etat | ❌ **Liste à cocher** (8 options) — recense les types de difficultés. "Je ne rencontre pas de difficultés" est protecteur mais les autres options n'ont pas d'échelle d'intensité entre elles. C2 échoue | — | ❌ **NON SCORANTE** | — |
| **E41** | Participation à un programme ETP ? | facteur | ❌ Recense une **action passée** (a-t-il participé à un programme). Utile pour l'aiguillage, pas pour l'intensité du parcours | — | ❌ **NON SCORANTE** | — |
| **E42** | RDV non prévus ce mois-ci ? | facteur | ✅ Le nombre de consultations imprévues est un signal d'instabilité du parcours — plus il y en a, plus le parcours est chaotique | ✅ 7 options ordonnées (0 → 6) | ✅ **SCORANTE** | 0 = +0 · 1 = +0 · 2 = +1 · ≥3 = +1 |

### 6.3 — Urgences, hospitalisations et suivi médical

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **E43** | Périodes sans suivi médical (12 derniers mois) ? | facteur | ✅ Les ruptures de suivi sont un signal d'intensité du parcours — un parcours avec des trous = risque d'aggravation non surveillée | ✅ 4 options ordonnées. "JNSP" = +0 | ✅ **SCORANTE** | Non = +0 · 3-6 mois = +1 · Plusieurs / >6 mois = +1 · JNSP = +0 |
| **E44** | Bilan de synthèse pluripathologique réalisé ? | facteur | ❌ Recense l'**existence d'un bilan** — action passée. Utile pour l'aiguillage, pas pour l'intensité du parcours | — | ❌ **NON SCORANTE** | — |
| **E45** | Suivi addictologie ? | facteur | ❌ Recense l'existence d'un suivi spécialisé. Conditionnel (N3=5). Aiguillage | — | ❌ **NON SCORANTE** | — |
| **E46** | Suivi post-hospitalisation organisé ? | facteur | ✅ Le défaut de coordination post-hospitalisation est un signal d'intensité du parcours — "tout organiser seuls" = charge sur l'aidant, risque de réhospitalisation | ✅ 4 options ordonnées. "Pas hospitalisé récemment" = non applicable, exclu du score | ✅ **SCORANTE** | Bien organisé = +0 · Partiellement = +1 · Non, seuls = +1 · Pas hospitalisé = NA |
| **E47** | Plan clair en cas de dégradation brusque ? | etat | ✅ L'absence de plan d'urgence est un signal d'intensité — improvisation systématique = charge mentale et risque vital | ✅ Oui clair / Quelques repères / Non → 3 niveaux | ✅ **SCORANTE** | Oui, plan clair = +0 · Quelques repères = +1 · Non, improvise = +1 |

### 6.4 — Addictions, troubles psychiques et suivi spécialisé

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **E48** | Cadre de suivi pour troubles psychiques ? | facteur | ❌ **Liste à choix** (6 options) — recense le cadre de suivi. "Aucun suivi" pourrait sembler scorable, mais les autres options ne forment pas une échelle d'intensité entre "médecin généraliste" et "CMP" | — | ❌ **NON SCORANTE** | — |
| **E49** | Professionnels impliqués dans le suivi addiction ? | facteur | ❌ **Liste à choix** (6 options) — recense les types de professionnels. Pas d'échelle d'intensité. "Aucun suivi structuré" pourrait sembler scorable mais la question est un inventaire | — | ❌ **NON SCORANTE** | — |
| **E50** | Suivi psy régulier et traitement bien pris ? | etat | ✅ La qualité de l'observance psychiatrique est un signal d'intensité — suivi irrégulier ou absent = fragilité non prise en charge | ✅ 4 options ordonnées. "JNSP" = +0. Conditionnel (N3=4) | ✅ **SCORANTE** | Oui régulier + traitement = +0 · Irrégulier = +1 · Pas de suivi = +1 · JNSP = +0 |
| **E51** | Le proche est-il prêt à être aidé pour son addiction ? | etat | ✅ La disposition au changement est un signal de l'intensité de la situation — un proche qui refuse l'aide = parcours bloqué, charge sur l'aidant | ✅ 4 options ordonnées. "JNSP" = +0. Conditionnel (N3=5) | ✅ **SCORANTE** | Oui = +0 · Peut-être = +1 · Non = +1 · JNSP = +0 |

### 6.5 — Coordination des soins et personne de référence

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **O59** | Professionnels/services intervenant au domicile ? | facteur | ❌ **Liste à cocher** (13 options) — recense les intervenants existants. Pas d'échelle d'intensité entre les types de professionnels | — | ❌ **NON SCORANTE** | — |
| **E52** | Personne de référence qui coordonne les soins ? | facteur | ✅ L'absence de coordination est un signal d'intensité du parcours — "personne ne coordonne" = charge sur l'aidant, risque de fragmentation | ✅ 4 options ordonnées. "JNSP" = +0 | ✅ **SCORANTE** | Oui, identifiée = +0 · Pas sûr du rôle = +1 · Personne ne coordonne = +1 · JNSP = +0 |
| **E53** | Qui est le professionnel référent ? | facteur | ❌ Recense l'**identité du référent** (MT, spécialiste, etc.) — les options ne forment pas une échelle d'intensité. "Aucune personne" pourrait scorer, mais c'est déjà capté par E52 | — | ❌ **NON SCORANTE** | — |
| **E54** | Comment décririez-vous l'organisation des soins ? | etat | ✅ La complexité organisationnelle perçue est un signal d'intensité direct — "ingérable" = charge maximale sur l'aidant | ✅ 4 options ordonnées (simple → ingérable) | ✅ **SCORANTE** | Simple et organisée = +0 · Gérable mais compliquée = +0 · Souvent très compliquée = +1 · Ingérable = +1 |
| **E55** | Meilleure coordination améliorerait la situation ? | etat | ✅ Le besoin ressenti de coordination est un signal d'intensité — "énormément" = parcours fragmenté, charge importante | ✅ Non / Un peu / Énormément → 3 niveaux | ✅ **SCORANTE** | Non = +0 · Un peu = +1 · Énormément = +1 |

### 6.6 — Autres éléments sur le parcours de soins

| Q_ID | Intitulé | Classif | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-------------------|--------------|---------|-----------------|
| **E56** | Qu'est-ce qui vous inquiète le plus pour la santé ? | etat | ❌ **Liste à choix** (7 options) — recense les types d'inquiétude. Pas d'échelle d'intensité entre "les chutes" et "la mémoire". C2 échoue | — | ❌ **NON SCORANTE** | — |
| **E57** | "Plan de route" clair pour la suite des soins ? | etat | ✅ L'absence de plan de soins structuré est un signal d'intensité — "on avance au jour le jour" = parcours non piloté | ✅ Oui / Partiellement / Non → 3 niveaux | ✅ **SCORANTE** | Oui clair = +0 · Partiellement = +1 · Non, au jour le jour = +1 |
| **E58** | Évaluation spécialisée liée à l'âge réalisée ? | facteur | ❌ **Liste à cocher** (5 options) — recense les types d'évaluations réalisées. Action passée (bilan fait ou non). Pas d'échelle d'intensité | — | ❌ **NON SCORANTE** | — |
| **E59** | Enfant orienté vers une structure TND ? | facteur | ❌ Recense une **orientation passée** — action administrative. Conditionnel (N3=2/4 + O1=1). L'attente longue pourrait sembler scorable mais l'information est trop spécifique pour un scoring général | — | ❌ **NON SCORANTE** | — |
| **E60** | Professionnels intervenus pour l'évaluation enfant ? | facteur | ❌ **Liste à cocher** (8 options) — recense les professionnels consultés. Pas d'échelle | — | ❌ **NON SCORANTE** | — |

---

## Résumé V5

### Questions scorantes (18/36)

| # | Q_ID | Score max | Note |
|---|------|-----------|------|
| 1 | E34 | +1 | |
| 2 | E35 | +1 | |
| 3 | E36 | +1 | |
| 4 | E37 | +1 | |
| 5 | O24 | +1 | |
| 6 | E42 | +1 | |
| 7 | E43 | +1 | |
| 8 | E46 | +1 | |
| 9 | E47 | +1 | |
| 10 | E50 | +1 | Conditionnel N3(4) |
| 11 | E51 | +1 | Conditionnel N3(5) |
| 12 | E52 | +1 | |
| 13 | E54 | +1 | |
| 14 | E55 | +1 | |
| 15 | E57 | +1 | |
| **Total** | | **19 pts** | |

> ⚠️ **Note** : E50 et E51 sont conditionnelles (persona troubles psy / addiction). Le score max théorique sera ajusté en fonction du profil activé.

### Questions non scorantes (18/36)

| Q_ID | Raison d'exclusion |
|------|-------------------|
| N17 | Liste à cocher (types handicap) — contexte fixe |
| N41 | Statut administratif ALD — contexte factuel |
| E38 | Transition enfant→adulte — conditionnel spécifique, ambiguïté |
| O17 | Existence suivi MT — aiguillage, pas intensité |
| O18 | Existence suivi spécialiste — aiguillage |
| O19 | Liste à cocher (spécialistes) — pas d'échelle |
| O20 | RDV faits — action passée |
| O21 | Liste à cocher (examens) — pas d'échelle |
| E39 | Distance géographique — contexte fixe |
| E40 | Liste à cocher (types difficultés) — pas d'échelle |
| E41 | Action passée (programme ETP) |
| E44 | Bilan existant — action passée |
| E45 | Suivi existant — aiguillage |
| E48 | Liste cadre suivi psy — pas d'échelle |
| E49 | Liste professionnels addiction — pas d'échelle |
| O59 | Liste intervenants domicile — pas d'échelle |
| E53 | Identité référent — pas d'échelle, doublon avec E52 |
| E56 | Liste inquiétudes — pas d'échelle entre types |
| E58 | Liste évaluations — action passée |
| E59 | Orientation passée — action administrative |
| E60 | Liste professionnels enfant — pas d'échelle |

### Vérification

- ✅ 18 scorantes + 18 non scorantes = 36 total V5
- ✅ 0 question sans verdict
- ✅ 0 question +2 (aucune question V5 ne relève du risque vital — le parcours médical n'a pas de question sur les risques vitaux directs, ceux-ci étant captés en V3 et V4)
- ✅ Aucune décision basée sur la classification état/facteur

---

> 📊 **SCORING_V5 v1 — À valider Dr. Monka + Antonin**
