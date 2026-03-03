# 📋 Content Blocks — Scoring Justifications (Review avant DB)

> **Date** : 21/02/2026  
> **Objectif** : Pré-remplissage des `content_blocks` type `scoring_justification` + `scoring_ponderation`  
> **Source** : KERNEL/SCORING/SCORING_V1.md → SCORING_V5.md  
> **Action** : Valider puis insérer en DB

---

## Format par question

```
entity_type = 'question'
entity_id   = [Q_ID]
block_type  = 'scoring_justification' | 'scoring_ponderation'
```

---

## V1 — Social et relationnel (12 scorantes / 3 non-scorantes)

### Questions scorantes

| Q_ID | scoring_justification |
|---|---|
| **O48** | Scorante (C1+C2). La fréquence de visite est un signal d'intensité d'engagement et de charge — un aidant qui visite tous les jours est plus sollicité qu'un aidant mensuel. Échelle ordonnée non ambiguë. |
| **N4** | Scorante (C1+C2). L'aide unique (aidant seul) est un prédicteur fort de fardeau dans la littérature Zarit. Le Oui/Non informe directement sur l'intensité de la charge. |
| **E1** | Scorante (C1+C2). La répartition déséquilibrée de l'aide est un signal d'intensité majeur — sentiment d'injustice, surcharge, isolement dans le rôle. 4 options ordonnées. |
| **E2** | Scorante (C1+C2). Le soutien social est un facteur clé de résilience. L'absence de soutien aggrave fortement la vulnérabilité (Zarit items 4, 21). 4 options ordonnées. |
| **N20** | Scorante (C1+C2). Les difficultés relationnelles du proche impactent directement l'aidant — isolement partagé, charge sociale supplémentaire. 3 niveaux ordonnés. |
| **O27** | Scorante (C1+C2). L'impact sur la vie familiale est un indicateur direct d'intensité de vulnérabilité — retentissement concret et mesurable. 3 niveaux. |
| **O28** | Scorante (C1+C2). L'impact sur la vie sociale/professionnelle est un signal d'intensité — restriction de vie directement liée au rôle d'aidant. 3 niveaux. |
| **N7** | Scorante (C1+C2). L'aménagement professionnel est un signal tangible d'impact — l'aidant sacrifie sa carrière pour son rôle. Options fermées, ordonnables. |
| **O30** | Scorante (C1+C2). Le sentiment de perte de la relation est un signal d'intensité émotionnelle fort — deuil blanc, détresse relationnelle. 3 niveaux. |
| **E4** | Scorante (C1+C2). L'évolution de la relation est un signal d'intensité — une relation qui se détériore aggrave le fardeau. 4 options ordonnées. |
| **O31** | Scorante (C1+C2). L'anxiété anticipatoire est un signal d'intensité reconnu — charge émotionnelle liée à l'incertitude et la projection. 3 niveaux. |
| **E5** | Scorante (C1+C2). Les conflits familiaux liés à la prise en charge sont un signal d'intensité — surcharge émotionnelle, isolement dans la décision. 3 niveaux. |

### Questions non-scorantes

| Q_ID | scoring_justification |
|---|---|
| **O47** | Non scorante — C1 échoue. Contexte géographique fixe (distance domicile). Ne mesure pas une intensité de vulnérabilité mais une distance objective. |
| **E3** | Non scorante — C1 échoue. Recense les personnes à charge (enfants, dépendants). Contexte factuel, pas un signal d'intensité en soi. |
| **E6** | Non scorante — C1 échoue. Attitude du proche face à l'aide extérieure — facteur indirect. Le refus crée des difficultés mais c'est capté par O27/O28. |

---

## V2 — Administrative (8 scorantes / 10 non-scorantes)

### Questions scorantes

| Q_ID | scoring_justification |
|---|---|
| **O61** | Scorante (C1+C2). La perception de précarité financière est un signal d'intensité directe — l'aidant dit "je n'ai pas les moyens" = vulnérabilité financière vécue. Oui/Non. |
| **E64** | Scorante (C1+C2). L'accès à une structure adaptée impacte directement la charge de l'aidant — si l'enfant ne fréquente aucune structure, l'aidant supporte 100% de la présence. 4 options ordonnées. ⚠️ Conditionnelle (Enfant). |
| **E65** | Scorante (C1+C2). Le besoin non couvert d'accompagnant est un signal d'intensité — l'aidant compense le manque. 3 options ordonnées. ⚠️ Conditionnelle (Enfant). |
| **E66** | Scorante (C1+C2). La complexité perçue est un signal direct d'intensité — l'aidant dit "c'est complexe" = charge administrative vécue. Similaire Zarit (fardeau). 3 niveaux. |
| **E67** | Scorante (C1+C2). L'absence d'activité avec impact (isolement, repli) est un signal d'intensité — situation de vie du proche se détériore. 4 options ordonnées. |
| **E68** | Scorante (C1+C2). Le temps consacré aux démarches est un indicateur direct d'intensité de charge administrative — mesure quantifiable. 3 niveaux. |
| **E69** | Scorante (C1+C2). La difficulté avec le numérique est un signal d'intensité — l'illectronisme associé à la charge administrative aggrave la vulnérabilité. 4 options. |
| **E70** | Scorante (C1+C2). La gestion en urgence est un signal d'intensité — perte de contrôle administratif, risque de suspension d'aides. 3 niveaux + JNSP. |

### Questions non-scorantes

| Q_ID | scoring_justification |
|---|---|
| **O45** | Non scorante — C1 échoue. Contexte administratif factuel : le type de couverture santé ne mesure pas une intensité de vulnérabilité. |
| **O23** | Non scorante — C1 échoue. Contexte factuel sur le proche (couverture santé). Informe l'aiguillage, pas l'intensité. |
| **N6** | Non scorante — C1 échoue. Dispositif existant (mesure de protection) — action passée, pas intensité. |
| **E61** | Non scorante — C1 échoue. Action passée (rédaction directives anticipées). Aiguillage, pas intensité. |
| **N42** | Non scorante — C1 échoue. Existence d'un accompagnement — action passée. Conditionnel, ambiguïté. |
| **N29** | Non scorante — C2 échoue. Liste à cocher variable (22 options) — pas d'échelle d'intensité. |
| **E62** | Non scorante — C2 échoue. Liste à cocher variable (22 options) — recense des actions administratives en cours. |
| **N43** | Non scorante — C2 échoue. Liste à cocher (10 options) — recense des dispositifs utilisés, pas d'échelle. |
| **N5** | Non scorante — C1 échoue. Recours passés (répit, formations, psy) — actions, pas intensité. |
| **E63** | Non scorante — C2 échoue. Liste à cocher variable (8 options) — pas d'ordre d'intensité entre les préoccupations. |

---

## V3 — Santé physique et psychologique (17 scorantes / 9 non-scorantes)

### Questions scorantes

| Q_ID | scoring_justification | scoring_ponderation (+2) |
|---|---|---|
| **O29** | Scorante (C1+C2). Signal direct d'intensité — l'aidant évalue l'impact de son rôle sur sa propre santé. Item Zarit par excellence. 3 niveaux. | — |
| **O33** | Scorante (C1+C2). La charge ressentie est LE signal central du fardeau (Zarit items 1, 22). Mesure directe de l'intensité vécue. 3 niveaux. | — |
| **O50** | Scorante (C1+C2). Le temps consacré à l'aide est un prédicteur d'intensité reconnu — plus de 10h/sem est un seuil critique dans la littérature. 4 options ordonnées. | — |
| **E7** | Scorante (C1+C2). L'épuisement auto-évalué est un signal d'intensité maximale. 4 niveaux ordonnés (pas fatigué → épuisé). | **+2 si "Épuisé·e / au bord de craquer"** : l'épuisement extrême auto-déclaré constitue un risque vital — effondrement physique et psychique imminent, risque de maltraitance par épuisement, risque suicidaire secondaire. Seuil de risque vital (§4.4). |
| **E8** | Scorante (C1+C2). L'isolement émotionnel est un signal d'intensité fort — charge psychique sans soutien, prédicteur de dépression. 4 niveaux. | — |
| **E9** | Scorante (C1+C2). L'absence de temps pour soi est un indicateur d'intensité — l'aidant est absorbé par son rôle. Oui/Non. | — |
| **E10** | Scorante (C1+C2). L'état moral auto-évalué est un signal d'intensité psychologique centrale. 4 niveaux ordonnés. | **+2 si "Débordé·e / au bord de craquer"** : la détresse psychologique extrême auto-déclarée constitue un risque vital psychique — risque de passage à l'acte, burnout sévère, rupture du lien d'aide. Seuil de risque vital (§4.4). |
| **E11** | Scorante (C1+C2). La capacité à continuer est un signal pronostique — "je ne pourrai plus" = point de rupture imminent. 4 options ordonnées. | — |
| **E12** | Scorante (C1+C2). L'inquiétude sécuritaire est un signal d'intensité — l'aidant porte la charge mentale de la sécurité du proche. 3 niveaux. | — |
| **E13** | Scorante (C1+C2). L'inquiétude pour la sécurité d'autrui est un signal d'intensité — charge mentale supplémentaire, vigilance permanente. 3 niveaux. | — |
| **O32** | Scorante (C1+C2). La demande d'aide supplémentaire est un signal d'intensité — l'aidant reconnaît ne plus suffire. Zarit item 22. 3 niveaux. | — |
| **N8** | Scorante (C1+C2). L'arrêt de travail est un signal tangible d'intensité — l'impact est si sévère qu'il empêche l'activité professionnelle. 6 durées ordonnées. | — |
| **E14** | Scorante (C1+C2). Précise la durée récente d'arrêt — signal d'intensité actuelle (pas juste historique). 3 durées ordonnées. Conditionnelle (N8≠1). | — |
| **E15** | Scorante (C1+C2). La difficulté d'accès aux soins pour l'aidant est un signal d'intensité — l'aidant néglige sa propre santé. 3 niveaux. | — |
| **E16** | Scorante (C1+C2). Le renoncement aux soins est un signal d'intensité grave — l'aidant sacrifie sa santé pour son rôle. 5 options ordonnées. | — |
| **O44** | Scorante (C1+C2). La perception comparative de santé est un signal d'intensité subjectif validé (SEGA item 5). 3 niveaux. | — |
| **E18** | Scorante (C1+C2). La qualité du sommeil est un signal d'intensité direct — la privation de sommeil est un marqueur majeur d'épuisement. 4 niveaux ordonnés. | — |
| **E19** | Scorante (C2bis comptage). Le nombre de soucis de santé cochés est un signal d'intensité — ≥1 coché indique une santé dégradée. Cap à +1. | — |

### Questions non-scorantes

| Q_ID | scoring_justification |
|---|---|
| **O37** | Non scorante — C1 échoue. Existence d'un suivi (MT) — action factuelle. Avoir un MT ne dit pas si on souffre. |
| **O38** | Non scorante — C1 échoue. Existence d'un suivi spécialiste — facteur d'aiguillage, pas intensité. |
| **O39** | Non scorante — C2 échoue. Liste à cocher (15 spécialistes) — pas d'échelle d'intensité. Conditionnelle. |
| **O40** | Non scorante — C1 échoue. RDV faits cette année — action passée, ne mesure pas une intensité. |
| **O41** | Non scorante — C2 échoue. Liste à cocher (11 examens) — pas d'échelle. Conditionnelle. |
| **O42** | Non scorante — C1 échoue. Liste à cocher (15 pathologies) — contexte factuel fixe de l'aidant. |
| **O43** | Non scorante — C1 échoue. Polymédication aidant — contexte médical, pas intensité-en-tant-qu'aidant. |
| **E17** | Non scorante — C1 échoue. Habitude de vie (activité physique) — comportement, pas état d'intensité. |

---

## V4 — Fragilité du proche (41 scorantes / 14 non-scorantes)

### Questions scorantes

| Q_ID | scoring_justification | scoring_ponderation (+2) |
|---|---|---|
| **N9** | Scorante (C1+C2). Difficultés budgétaires du proche — indicateur de fragilité (SEGA item 9 fonctions supérieures). 3 niveaux ordonnés. | — |
| **N21** | Scorante (C1+C2). Fragilité financière du proche — signal d'intensité, précarité aggravant la dépendance. 3 niveaux. | — |
| **N23** | Scorante (C1+C2). Perte d'activité professionnelle/scolaire — impact fonctionnel mesurable. 3 niveaux. | — |
| **N27** | Scorante (C1+C2). Isolement social — facteur de fragilité majeur (SEGA item 13 entourage). 4 niveaux. | — |
| **O7** | Scorante (C1+C2). Modification nutritionnelle — signal d'intensité (SEGA item 3 nutrition). 3 niveaux. | — |
| **E21** | Scorante (C1+C2). Perception de durabilité de la situation — signal pronostique. 4 options ordonnées. | — |
| **E22** | Scorante (C1+C2). Volume d'aide humaine — indicateur direct du niveau de dépendance. 5 niveaux ordonnés. | — |
| **O8** | Scorante (C1+C2). Mobilité extérieure — indicateur SEGA clé (item 7 mobilité). 3 niveaux. | — |
| **O9** | Scorante (C1+C2). Mobilité intérieure — indicateur de fragilité encore plus sévère que O8. 3 niveaux. | — |
| **E23** | Scorante (C1+C2). Temps de solitude toléré — indicateur direct d'intensité de dépendance. 4 niveaux. | — |
| **E24** | Scorante (C1+C2). Besoin de présence nocturne — indicateur d'intensité majeur, privation de sommeil pour l'aidant. 4 niveaux. | — |
| **O13** | Scorante (C1+C2). Détérioration cognitive — indicateur central de fragilité (SEGA item 1). 3 niveaux. | — |
| **N24** | Scorante (C1+C2). Troubles mnésiques — signal de fragilité cognitive (SEGA items 1-2). Complémentaire à O13. 3 niveaux. | — |
| **N19** | Scorante (C1+C2). Fluctuations comportementales — imprévisibilité = charge pour l'aidant (SEGA item 2 humeur). 3 niveaux. | — |
| **E25** | Scorante (C1+C2). Confusion jour/nuit — marqueur de fragilité cognitive sévère, impact direct sur l'aidant. 3 niveaux. | — |
| **E26** | Scorante (C1+C2). Désorientation spatiale — fragilité cognitive sévère, risque de fugue. 3 niveaux. | — |
| **E27** | Scorante (C1+C2). Comportements à risque environnemental — menace directe de sécurité. 3 niveaux. | **+2 si "Oui"** : les comportements potentiellement dangereux (gaz ouvert, errance, objets allumés) menacent la sécurité vitale du proche ET de l'entourage. Risque de décès par accident domestique. Seuil de risque vital (§4.4). |
| **N22** | Scorante (C1+C2). Automutilation ou comportements dangereux pour soi — signal de risque vital direct. 3 niveaux. | **+2 si "Souvent"** : les comportements d'automutilation fréquents constituent un risque vital actif — le proche se met en danger de manière répétée, probabilité élevée d'événement grave. Seuil de risque vital (§4.4). |
| **N25** | Scorante (C1+C2). Idées suicidaires — signal de risque vital maximal. 3 niveaux. | **+2 si "Souvent"** : les idées suicidaires fréquentes constituent le signal de risque vital le plus élevé du questionnaire. Activation immédiate des protocoles de protection (HAS). Seuil de risque vital (§4.4). |
| **O4** | Scorante (C1+C2). Humeur du proche — signal de fragilité (SEGA item 2). 3 niveaux. | — |
| **O5** | Scorante (C1+C2). Perception comparative de santé — signal d'intensité (SEGA item 5). 3 niveaux. | — |
| **N11** | Scorante (C1+C2). Douleur chronique — marqueur d'intensité (SEGA signes cliniques). 3 niveaux. | — |
| **N12** | Scorante (C1+C2). Fatigue du proche — marqueur de fragilité (SEGA item 4 asthénie). 3 niveaux. | — |
| **N13** | Scorante (C1+C2). Troubles du sommeil du proche — signal de fragilité + impact aidant si nuit perturbée. 3 niveaux. | — |
| **N34** | Scorante (C1+C2). Troubles alimentaires — signal de fragilité (SEGA item 3 nutrition). 3 niveaux. | — |
| **N44** | Scorante (C1+C2). Variation pondérale — marqueur SEGA (item 3 poids). Signal objectif. 2 niveaux. | — |
| **O3** | Scorante (C1+C2). Polymédication — indicateur SEGA reconnu (item 6). ≥7 médicaments = polypatho. 4 options ordonnées. | — |
| **O26** | Scorante (C1+C2). Diminution de taille — marqueur clinique de fragilité osseuse. 2 niveaux. | — |
| **N38** | Scorante (C1+C2). Perte de contrôle sur l'addiction — signal de fragilité directe. 3 niveaux. ⚠️ Conditionnelle (Addiction). | — |
| **N39** | Scorante (C1+C2). Impact somatique de l'addiction — aggravation mesurable. 3 niveaux. ⚠️ Conditionnelle (Addiction). | — |
| **E28** | Scorante (C1+C2). Hospitalisations récentes — signal d'instabilité clinique (SEGA). 6 options ordonnées. | — |
| **E30** | Scorante (C1+C2). Passages aux urgences — signal d'instabilité aiguë, fragilité non maîtrisée. 6 options ordonnées. | — |
| **E31** | Scorante (C1+C2). Durée hospitalisation — indicateur de gravité de l'épisode aigu. 5 options ordonnées. | — |
| **N18** | Scorante (C1+C2). Autonomie dans les AVQ — signal central de fragilité (SEGA item 8). 2 niveaux. | — |
| **E32** | Scorante (C1+C2). Mobilité de transfert — indicateur SEGA (item 7 mobilité). 3 niveaux. | — |
| **O12** | Scorante (C1+C2). Autonomie alimentaire — indicateur SEGA fondamental. 3 niveaux. | — |
| **O11** | Scorante (C1+C2). Incontinence — marqueur SEGA (item 10). Impact direct charge aidant et dignité. 3 niveaux. | — |
| **E33** | Scorante (C1+C2). Capacité instrumentale — fragilité cognitive/fonctionnelle, perte des AIVQ. 3 niveaux. | — |
| **O6** | Scorante (C1+C2). Chutes — marqueur SEGA majeur (item 11). 3 niveaux. | — |
| **N14** | Scorante (C1+C2). Observance thérapeutique — l'inobservance aggrave l'état de santé (SEGA). 3 niveaux. | — |
| **O16** | Scorante (C2bis comptage). Le nombre de pathologies cochées est un signal d'intensité de poly-pathologie — ≥2 cochés indique une fragilité multi-dimensionnelle. Cap à +1. | — |
| **N36** | Scorante (C1+C2). Besoin d'aide organisationnelle — perte d'autonomie cognitive/exécutive. 3 niveaux. | — |

### Questions non-scorantes

| Q_ID | scoring_justification |
|---|---|
| **N10** | Non scorante — C2 échoue. Liste à cocher (5 types d'aide) — pas d'échelle d'intensité. |
| **E20** | Non scorante — C1 échoue. Souhait prospectif — ne mesure pas une intensité actuelle. |
| **O15** | Non scorante — C2 échoue. Liste à cocher (consommations) — pas d'échelle d'intensité globale. |
| **O22** | Non scorante — C2 échoue. Liste à cocher mixte vue/audition — ambiguïté des combinaisons. |
| **O53** | Non scorante — C1 échoue. Existence d'évaluation AGGIR — action passée. |
| **O54** | Non scorante — C1 échoue. Score externe AGGIR (GIR 1-6) — double-comptage. |
| **N16** | Non scorante — C1 échoue. Contexte fixe (origine handicap) — ne varie pas. |
| **N30** | Non scorante — C1 échoue. Score externe MDPH — contexte factuel fixe. |
| **N37** | Non scorante — C2 échoue. Liste à cocher (7 types addiction) — pas d'échelle. |
| **N40** | Non scorante — C1 échoue. Action passée (tentative sevrage). |
| **E29** | Non scorante — C1 échoue. Contexte descriptif — intensité déjà captée par E28. |
| **N32** | Non scorante — C2 échoue. Liste à cocher (8 aides techniques) — pas d'échelle. |
| **O51** | Non scorante — C1 échoue. Intention prospective — pas intensité actuelle. |

---

## V5 — Parcours médical du proche (15 scorantes / 18 non-scorantes)

### Questions scorantes

| Q_ID | scoring_justification |
|---|---|
| **E34** | Scorante (C1+C2). Le niveau de compréhension du diagnostic est un signal d'intensité — un aidant qui ne comprend pas est plus vulnérable. 3 niveaux. |
| **E35** | Scorante (C1+C2). Le flou diagnostique est un signal d'intensité — errance diagnostique = charge psychologique. 4 options ordonnées. |
| **E36** | Scorante (C1+C2). L'errance médicale est un signal d'intensité du parcours — parcours fragmenté, charge logistique. 3 niveaux. |
| **E37** | Scorante (C1+C2). Les avis contradictoires sont un signal de complexité — manque de coordination, confusion. 3 niveaux. |
| **O24** | Scorante (C1+C2). Difficulté d'accès aux spécialistes — charge supplémentaire pour l'aidant. 3 niveaux. |
| **E42** | Scorante (C1+C2). Consultations imprévues — signal d'instabilité du parcours. 7 options ordonnées. |
| **E43** | Scorante (C1+C2). Ruptures de suivi — parcours avec des trous = risque d'aggravation non surveillée. 4 options ordonnées. |
| **E46** | Scorante (C1+C2). Défaut de coordination post-hospitalisation — "tout organiser seuls" = charge aidant, risque réhospitalisation. 4 options. |
| **E47** | Scorante (C1+C2). Absence de plan d'urgence — improvisation = charge mentale et risque vital. 3 niveaux. |
| **E50** | Scorante (C1+C2). Qualité de l'observance psychiatrique — suivi irrégulier = fragilité non prise en charge. 4 options. ⚠️ Conditionnelle (Psy). |
| **E51** | Scorante (C1+C2). Disposition au changement — proche qui refuse l'aide = parcours bloqué. 4 options. ⚠️ Conditionnelle (Addiction). |
| **E52** | Scorante (C1+C2). Absence de coordination — "personne ne coordonne" = charge sur l'aidant, fragmentation. 4 options. |
| **E54** | Scorante (C1+C2). Complexité organisationnelle perçue — "ingérable" = charge maximale. 4 options ordonnées. |
| **E55** | Scorante (C1+C2). Besoin ressenti de coordination — "énormément" = parcours fragmenté. 3 niveaux. |
| **E57** | Scorante (C1+C2). Absence de plan de soins — "au jour le jour" = parcours non piloté. 3 niveaux. |

### Questions non-scorantes

| Q_ID | scoring_justification |
|---|---|
| **N17** | Non scorante — C2 échoue. Liste à cocher (10 types handicap) — contexte factuel fixe. |
| **N41** | Non scorante — C1 échoue. Statut administratif ALD — contexte factuel. |
| **E38** | Non scorante — C1 échoue. Transition enfant→adulte — conditionnel spécifique, ambiguïté. |
| **O17** | Non scorante — C1 échoue. Existence suivi MT — aiguillage, pas intensité. |
| **O18** | Non scorante — C1 échoue. Existence suivi spécialiste — aiguillage. |
| **O19** | Non scorante — C2 échoue. Liste à cocher (15 spécialistes) — pas d'échelle. |
| **O20** | Non scorante — C1 échoue. RDV faits — action passée. |
| **O21** | Non scorante — C2 échoue. Liste à cocher (11 examens) — pas d'échelle. |
| **E39** | Non scorante — C1 échoue. Distance géographique — contexte fixe. |
| **E40** | Non scorante — C2 échoue. Liste à cocher (8 types difficultés) — pas d'échelle entre types. |
| **E41** | Non scorante — C1 échoue. Action passée (programme ETP). |
| **E44** | Non scorante — C1 échoue. Bilan existant — action passée. |
| **E45** | Non scorante — C1 échoue. Suivi existant — aiguillage. |
| **E48** | Non scorante — C2 échoue. Liste cadre suivi psy — pas d'échelle d'intensité entre options. |
| **E49** | Non scorante — C2 échoue. Liste professionnels addiction — pas d'échelle. |
| **O59** | Non scorante — C2 échoue. Liste intervenants domicile (13 options) — pas d'échelle. |
| **E53** | Non scorante — C1 échoue. Identité référent — pas d'échelle, doublon fonctionnel avec E52. |
| **E56** | Non scorante — C2 échoue. Liste inquiétudes (7 options) — pas d'échelle entre types. |
| **E58** | Non scorante — C2 échoue. Liste évaluations — action passée. |
| **E59** | Non scorante — C1 échoue. Orientation passée — action administrative. |
| **E60** | Non scorante — C2 échoue. Liste professionnels enfant — pas d'échelle. |

---

## Récapitulatif

| V | Scorantes | Non-scorantes | +2 | Total |
|---|---|---|---|---|
| V1 | 12 | 3 | 0 | 15 |
| V2 | 8 | 10 | 0 | 18 |
| V3 | 17 (+E19) | 8 | 2 (E7, E10) | 26 |
| V4 | 41 (+O16) | 13 | 3 (E27, N22, N25) | 55 |
| V5 | 15 | 21 | 0 | 36 |
| **TOTAL** | **93 (+2 C2bis)** | **55** | **5** | **150** |

### Questions +2 — Justifications pondération (scoring_ponderation)

| Q_ID | V | Réponse déclenchant +2 | Justification risque vital |
|---|---|---|---|
| **E2** | V1 | "Personne" | L'absence totale de réseau de secours constitue un risque vital immédiat — aucun filet de sécurité en cas de crise (HAS). Isolement total corrélé à +26% mortalité (Holt-Lunstad 2015). |
| **E7** | V3 | "Épuisé·e / au bord de craquer" | Épuisement extrême auto-déclaré = risque d'effondrement physique et psychique imminent. Risque de maltraitance par épuisement et risque suicidaire secondaire. |
| **E10** | V3 | "Débordé·e / au bord de craquer" | Détresse psychologique extrême = risque de passage à l'acte, burnout sévère, rupture du lien d'aide. |
| **E27** | V4 | "Oui" | Comportements dangereux (gaz ouvert, errance, objets allumés) = menace vitale pour le proche ET l'entourage. Risque de décès par accident domestique. |
| **N22** | V4 | "Souvent" | Automutilation fréquente = risque vital actif, probabilité élevée d'événement grave. |
| **N25** | V4 | "Souvent" | Idées suicidaires fréquentes = signal de risque vital maximal. Activation immédiate protocoles de protection (HAS). |
