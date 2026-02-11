# 📋 Phase 3 — Recos Structurées par MP + MT Rattachées

> **Date** : 10/02/2026
> **Source** : `recommendations` + `micro_taches` (Supabase)
> **Traçabilité** : `[LEGACY]` = texte legacy intact · `[IA]` = regroupé/matché par l'IA

---

## Résumé

- **238 recos structurées** (87 legacy, 5 ia_reformulé, 104 ia_proposé, 42 sans_rule)
- **299 MT rattachées** (299/299 = 100%)
- **24 MP couverts**

---

## V1 — Social et Relationnel

### R1 — Impact sur la vie personnelle et professionnelle
> 3 recos · 8 MT

#### `R1_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Contacter une assistante sociale
**Acteurs** : Assistante sociale
**IDEC** : Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'IDEC)

#### `R1_RECO_02` `[LEGACY]` 🟠 ccc
**Reco** : Contactez la plateforme de répit de votre territoire

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V1_030` | INFO | 🟡 0.46 | Orienter vers des solutions de répit |
| `MT_V1_027` | ORGA | 🟢 0.50 | Rester attentif aux signaux de dégradation |
| `MT_V1_028` | ORGA | 🟡 0.46 | Identifier les domaines les plus impactés |
| `MT_V1_029` | SEC | 🟡 0.41 | Proposer un soutien psychologique |

#### `R1_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Discutez des difficultés d'être aidant avec votre médecin traitant
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour prescription de soutien psycholoque

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V1_033` | INFO | 🟢 0.64 | Informer sur les droits des aidants |
| `MT_V1_031` | ORGA | 🟢 0.57 | Identifier les activités les plus impactées |
| `MT_V1_032` | ORGA | 🟢 0.55 | Évaluer l'impact professionnel |
| `MT_V1_034` | STRUC | 🟢 0.63 | Proposer des solutions d'aménagement |

---

### R2 — Soutien de l'entourage et partage de l'aide
> 2 recos · 14 MT

#### `R2_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place un accompagnement renforcé et mobiliser des aides extérieures.
**Acteurs** : IDEC / Plateforme de répit / SAD
**IDEC** : Identifier et contacter des services d’aide ou de répit adaptés

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V1_003` | INFO | 🟢 0.56 | Évaluer les aides disponibles (services, associations) |
| `MT_V1_005` | INFO | 🟢 0.60 | Orienter vers des groupes d'entraide |
| `MT_V1_007` | INFO | 🟢 0.62 | Informer sur les solutions de répit |
| `MT_V1_010` | INFO | 🟢 0.63 | Orienter vers des dispositifs d'aide aux aidants |
| `MT_V1_001` | ORGA | 🟢 0.67 | Lister les personnes de l'entourage mobilisables |
| `MT_V1_002` | ORGA | 🟢 0.61 | Explorer les freins à une meilleure répartition |
| `MT_V1_006` | ORGA | 🟢 0.65 | Identifier d'autres personnes potentiellement mobilisables |
| `MT_V1_008` | ORGA | 🟢 0.56 | Évaluer l'urgence de la situation d'isolement |
| `MT_V1_004` | SEC | 🟢 0.73 | Proposer un accompagnement pour solliciter de l'aide |
| `MT_V1_009` | SEC | 🟢 0.55 | Proposer un contact régulier avec un professionnel |
| `MT_V1_011` | STRUC | 🟢 0.55 | Envisager un accueil temporaire pour le proche |

#### `R2_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Identifier des solutions de soutien pour prévenir l’épuisement de l’aidant.
**Acteurs** : IDEC, structure de répit
**IDEC** : Évaluer la charge d’aide globale auprès de l’aidant

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V1_026` | INFO | 🟡 0.41 | Orienter vers des associations d'aide aux aidants |
| `MT_V1_024` | ORGA | 🟡 0.32 | Évaluer les possibilités de mobilisation d'autres membres |
| `MT_V1_025` | STRUC | 🟡 0.40 | Proposer des solutions de répit |

---

### R3 — Isolement social de la personne aidée
> 1 recos · 3 MT

#### `R3_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Contacter son médecin traitant          Demandez la surveillance de l'humeur et de la prise de traitement
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour :                                   Demander la prescription pour le passage  d'IDEL 

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V1_039` | ORGA | 🟡 0.41 | Identifier les situations problématiques |
| `MT_V1_041` | ORGA | 🟢 0.55 | Évaluer l'intérêt d'un accueil de jour |
| `MT_V1_040` | STRUC | 🟡 0.49 | Proposer des activités adaptées |

---

### R4 — Relation aidant / proche et acceptation de l'aide
> 1 recos · 16 MT

#### `R4_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Se rapprocher du professionnel référent (IDEC ou médecin traitant) si besoin, envisager une médiation familiale.
**Acteurs** : IDEC/ Médecin traitant/ Médiateur
**IDEC** : Proposer un entretien de médiation ou d’accompagnement familial

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V1_014` | INFO | 🔴 0.17 | Informer sur les groupes de parole |
| `MT_V1_017` | INFO | 🟢 0.58 | Orienter vers des dispositifs de soutien ou médiation adaptés |
| `MT_V1_022` | INFO | 🔴 0.28 | Informer sur les types d'aides existantes |
| `MT_V1_037` | INFO | 🔴 0.21 | Informer sur la maladie et son évolution |
| `MT_V1_038` | INFO | 🔴 0.20 | Orienter vers des groupes de parole |
| `MT_V1_012` | ORGA | 🔴 0.26 | Échanger sur les sources de tension identifiées |
| `MT_V1_015` | ORGA | 🟢 0.55 | Identifier les points de tension récurrents |
| `MT_V1_018` | ORGA | 🔴 0.24 | Comprendre les freins à l'acceptation de l'aide |
| `MT_V1_020` | ORGA | 🔴 0.19 | Explorer les causes du refus |
| `MT_V1_035` | ORGA | 🔴 0.20 | Échanger sur les changements observés |
| `MT_V1_013` | SEC | 🟡 0.35 | Proposer un accompagnement psychologique si besoin |
| `MT_V1_019` | SEC | 🔴 0.24 | Proposer un temps d'échange avec le proche et l'aidant |
| `MT_V1_021` | SEC | 🔴 0.29 | Proposer une approche progressive |
| `MT_V1_023` | SEC | 🟡 0.31 | Proposer une première mise en relation avec un intervenant |
| `MT_V1_036` | SEC | 🔴 0.28 | Proposer un soutien psychologique |
| `MT_V1_016` | STRUC | 🟢 0.69 | Proposer un entretien de médiation |

---

## V2 — Fragilité du Proche

### F1 — Vie quotidienne, budget et entourage du proche
> 19 recos · 24 MT

#### `F1_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Sécuriser et renforcer le maintien à domicile.
**Acteurs** : IDEC /SAD
**IDEC** : Évaluer les besoins actuels et à venir au domicile

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_034` | ORGA | 🟢 0.59 | Évaluer les besoins actuels et à venir au domicile |
| `MT_V2_036` | ORGA | 🟢 0.52 | Évaluer la soutenabilité du maintien à domicile |

#### `F1_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Évaluer la faisabilité et l’impact sur l’aidant.
**Acteurs** : IDEC
**IDEC** : Échanger sur les contraintes matérielles et humaines

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_039` | ORGA | 🟡 0.45 | Évaluer l’impact sur la sécurité et la fatigue de l’aidant |
| `MT_V2_041` | ORGA | 🟡 0.47 | Évaluer les risques liés à l’isolement |
| `MT_V2_044` | ORGA | 🟡 0.44 | Échanger sur les contraintes matérielles et humaines |

#### `F1_RECO_03` `[LEGACY]` 🟢 standard
**Reco** : Anticiper et préparer une éventuelle orientation en établissement.
**IDEC** : Informer sur les types d’établissements et critères d’admission

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_079` | STRUC | 🟢 0.53 | Informer sur les types d’établissements et critères d’admission |

#### `F1_RECO_04` `[LEGACY]` 🟠 ccc
**Reco** : Favoriser la réflexion et l’anticipation du projet de vie.
**IDEC** : Proposer un temps d’échange pour clarifier les perspectives

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_004` | SEC | 🟡 0.39 | Proposer un temps d’échange sur les souhaits et craintes |
| `MT_V2_020` | SEC | 🟡 0.45 | Proposer un temps d’échange pour clarifier les perspectives |

#### `F1_RECO_05` `[LEGACY]` 🟠 ccc
**Reco** : Maintenir l’organisation actuelle tout en restant attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Confirmer les éléments qui permettent le maintien

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_037` | ORGA | 🟢 0.51 | Confirmer les éléments qui permettent le maintien |

#### `F1_RECO_06` `[LEGACY]` 🟠 ccc
**Reco** : Anticiper les fragilités et renforcer l’accompagnement pour éviter une rupture.
**Acteurs** : IDEC /SAD
**IDEC** : Identifier les facteurs de fragilité

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_032` | ORGA | 🟢 0.51 | Identifier les facteurs de fragilité |

#### `F1_RECO_07` `[LEGACY]` 🟠 ccc
**Reco** : Anticiper et préparer une transition vers une autre solution d’hébergement.
**Acteurs** : IDEC/Service socal
**IDEC** : Informer sur les options d’hébergement adaptées

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_080` | STRUC | 🟢 0.57 | Informer sur les options d’hébergement adaptées |

#### `F1_RECO_08` `[LEGACY]` 🟢 standard
**Reco** : Demandez une aide pour les actes de la vie quotidienne.
**Acteurs** : Services à domicile (SAD)
**IDEC** : 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD.

#### `F1_RECO_09` `[LEGACY]` 🟢 standard
**Reco** : Contacter une assistante sociale afin de faire le point sur les aides auxquelles vous ou vos proches pouvez éventuellement être éligibles.
**Acteurs** : Assistante sociale
**IDEC** : Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'IDEC)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_072` | INFO | 🟡 0.34 | 1=>contacter le service "MERCI JULIE" avec qui nous avons un partenariat, |

#### `F1_RECO_10` `[LEGACY]` 🟢 standard
**Reco** : Envisager un soutien psychologique
**Acteurs** : Psychologue
**IDEC** : Prendre RDV avec un Psychologue du territoire (Recherche sur internet)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_010` | SEC | 🟢 0.61 | Prendre RDV avec un Psychologue du territoire (Recherche sur internet) |

#### `F1_RECO_11` `[LEGACY]` 🟢 standard
**Reco** : Demandez une aide lors des déplacements à des rendez-vous médicaux.
**Acteurs** : Services à domicile (SAD)
**IDEC** : 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD.

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_006` | SEC | 🟢 0.52 | 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du |

#### `F1_RECO_12` `[LEGACY]` 🟠 ccc
**Reco** : Contacter le médecin traitant pour remplir le dossier de demande d'aide
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : IDEC prend RDV avec le MT pour compléter un dossier de demande d'aide financière

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_050` | MED | 🟢 0.63 | Contacter le médecin traitant pour bilan de dénutrition (lettre d'adressage) |
| `MT_V2_068` | MED | 🟢 0.56 | Contacter le médecin traitant pour évaluer la douleur et adapter le traitement |
| `MT_V2_025` | SEC | 🟢 0.66 | IDEC prend RDV avec le MT pour compléter un dossier de demande d'aide financière |
| `MT_V2_027` | SEC | 🟢 0.50 | IDEC prend RDV avec le MT pour remplir le dossier MDPH en vue d'une réévaluation |

#### `F1_RECO_13` `[LEGACY]` 🟢 standard
**Reco** : Demandez un suivi régulier.

#### `F1_RECO_14` `[LEGACY]` 🟢 standard
**Reco** : Envisager une consultation avec un psychiatre
**Acteurs** : Psychiatre
**IDEC** : Prendre RDV avec un Psychiatre du territoire (Recherche sur internet)  pour un suivi

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_016` | SEC | 🟢 0.62 | Prendre RDV avec un Psychiatre du territoire (Recherche sur internet)  pour un s |
| `MT_V2_024` | SEC | 🟢 0.60 | Prendre RDV avec psychiatre |

#### `F1_RECO_15` `[LEGACY]` 🟢 standard
**Reco** : Inscrivez votre proche dans des associations, des groupes de parole ou des thérapies de groupe pour faciliter les intéractions sociales.
**Acteurs** : Associations
**IDEC** : Contacter une association par téléphone ou mail selon les structures                                    Disponible sur l

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_082` | STRUC | 🟢 0.60 | Contacter une association par téléphone ou mail selon les structures             |

#### `F1_RECO_16` `[LEGACY]` 🟢 standard
**Reco** : Demandez un suivi rapproché avec des intervenants sociaux et médicaux. Organisez des visites régulières.
**Acteurs** : Associations
**IDEC** : Contacter une association par téléphone ou mail selon les structures                                    Disponible sur l

#### `F1_RECO_17` `[LEGACY]` 🟢 standard
**Reco** : Proposez à votre proche un suivi contre l'isolement social.
**Acteurs** : Psychologue
**IDEC** : Prendre RDV avec un Psychologue conventionné pour être remboursé du territoire (Recherche sur internet)

#### `F1_RECO_18` `[LEGACY]` 🟠 ccc
**Reco** : Contacter une assistante sociale afin de faire le point sur les aides auxquelles il pourrait être éligibles.
**Acteurs** : Assistante sociale
**IDEC** : Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'IDEC)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_074` | INFO | 🟢 0.53 | Contacter une assistance sociale pour demander les aides qui pourrait lui être p |
| `MT_V2_076` | INFO | 🟡 0.47 | Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'I |

#### `F1_RECO_19` `[LEGACY]` 🟢 standard
**Reco** : Demandez un bilan et mettez en place des aides techniques pour faciliter les actes de la vie quotidienne.
**Acteurs** : Ergothérapeute
**IDEC** : Prendre contact avec un ergothérapeute du territoire

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_030` | ORGA | 🟢 0.58 | Prendre contact avec un ergothérapeute du territoire |

---

### F2 — Autonomie, aide humaine et présence nécessaire
> 16 recos · 13 MT

#### `F2_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Vérifier l’adéquation du volume d’aide avec les besoins actuels.
**Acteurs** : IDEC
**IDEC** : Évaluer si le faible volume d’aide est suffisant

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_031` | ORGA | 🟢 0.57 | Évaluer si le faible volume d’aide est suffisant |

#### `F2_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Maintenir l’organisation actuelle tout en restant attentif à l’évolution des besoins.
**Acteurs** : IDEC
**IDEC** : Vérifier la cohérence entre aides reçues et niveau d’autonomie

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_073` | INFO | 🟡 0.50 | Vérifier la cohérence entre aides reçues et niveau d’autonomie |
| `MT_V2_008` | SEC | 🟡 0.39 | IDEC oriente et accompagne la mise en place des aides Matériels et humaines dans |

#### `F2_RECO_03` `[LEGACY]` 🟢 standard
**Reco** : S’assurer de la bonne coordination des intervenants.
**Acteurs** : IDEC
**IDEC** : Évaluer la charge restante pour l’aidant

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_043` | ORGA | 🟢 0.52 | Évaluer la charge restante pour l’aidant |

#### `F2_RECO_04` `[LEGACY]` 🟢 standard
**Reco** : Situation de dépendance importante nécessitant une vigilance renforcée.
**Acteurs** : IDEC
**IDEC** : Évaluer la soutenabilité du maintien à domicile

#### `F2_RECO_05` `[LEGACY]` 🟢 standard
**Reco** : Clarifier la situation et objectiver le volume réel d’aide.
**Acteurs** : IDEC
**IDEC** : Faire le point sur les interventions existantes

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_013` | SEC | 🟡 0.42 | Faire le point sur les interventions existantes |

#### `F2_RECO_06` `[LEGACY]` 🟠 ccc
**Reco** : Sécuriser les périodes d’absence prolongée.
**Acteurs** : IDEC/SAD
**IDEC** : Identifier les moments à risque

#### `F2_RECO_07` `[LEGACY]` 🟠 ccc
**Reco** : Situation de vulnérabilité nécessitant une vigilance renforcée.
**Acteurs** : IDEC/SAD
**IDEC** : Évaluer les risques liés à l’isolement

#### `F2_RECO_08` `[LEGACY]` 🟠 ccc
**Reco** : Situation à risque nécessitant une sécurisation immédiate.
**Acteurs** : IDEC /Aidant
**IDEC** : Proposer un placement en EHPAD

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_078` | STRUC | 🟡 0.46 | Proposer un placement en EHPAD |

#### `F2_RECO_09` `[LEGACY]` 🟠 ccc
**Reco** : Sécuriser les périodes nocturnes à risque
**Acteurs** : IDEC /Aidant
**IDEC** : Identifier les situations déclenchantes

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_035` | ORGA | 🟢 0.53 | Identifier les situations déclenchantes |
| `MT_V2_038` | ORGA | 🟢 0.54 | Identifier les moments à risque |
| `MT_V2_047` | ORGA | 🟢 0.57 | Identifier les périodes ou situations déclenchantes |

#### `F2_RECO_10` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place un accompagnement nocturne renforcé.
**IDEC** : Proposer un renforcement des aides ou une organisation adaptée

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_014` | SEC | 🟡 0.45 | Proposer un renforcement des aides ou une organisation adaptée |

#### `F2_RECO_11` `[LEGACY]` 🟠 ccc
**Reco** : Situation de dépendance élevée nécessitant une sécurisation immédiate.
**IDEC** : Proposer un placement en EHPAD

#### `F2_RECO_12` `[LEGACY]` 🟢 standard
**Reco** : Demander :                                                                                 -- Évaluation ou réévaluation du plan d'accompagnement (aide dans les actes de la vie quotidienne), l'évaluation par la MDPH                                                                            -- une prescription pour le passage d'un SSIAD.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : IDEC prend RDV avec le MT pour remplir le dossier MDPH en vue d'une réévaluation des aides accordées

#### `F2_RECO_13` `[LEGACY]` 🟢 standard
**Reco** : Demandez un suivi ponctuel si besoin.
**Acteurs** : CMP
**IDEC** : Contacter  le CMP de secteur (recherche sur Internet)  pour prise de contact et rendez-vous avec un infirmier du CMP pou

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_081` | STRUC | 🟢 0.53 | Contacter  le CMP de secteur (recherche sur Internet)  pour prise de contact et  |

#### `F2_RECO_14` `[LEGACY]` 🟢 standard
**Reco** : Demandez un suivi régulier.
**Acteurs** : Psychiatre
**IDEC** : Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste"

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_065` | MED | 🟡 0.44 | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste |

#### `F2_RECO_15` `[LEGACY]` 🟠 ccc
**Reco** : Demandez la prescription d'un bilan de la marche chez un kinésithérapeute et/ou un bilan chez un ergothérapeute.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour :                                   Demander la prescription d’un bilan de kiné      

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_069` | MED | 🟢 0.67 | Contacter le médecin traitant pour :                                   Demander  |

#### `F2_RECO_16` `[IA]` 🟠 ccc
**Reco** : Demandez la prescription d'un bilan d'ergothérapie et/ou une prise en charge par un kinésithérapeute afin de maintenir les capacités motrices restante.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour :                                   Demander la prescription d’un bilan de kiné      

---

### F3 — Mémoire, comportement et risques
> 16 recos · 9 MT

#### `F3_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Prévenir l’aggravation des troubles du rythme veille-sommeil.
**Acteurs** : IDEC
**IDEC** : Identifier les périodes ou situations déclenchantes

#### `F3_RECO_02` `[LEGACY]` 🟠 ccc
**Reco** : Situation à risque nécessitant une évaluation et un accompagnement renforcés.
**IDEC** : Évaluer l’impact sur la sécurité et la fatigue de l’aidant

#### `F3_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Évaluer le niveau de désorientation et prévenir les situations à risque.
**Acteurs** : IDEC
**IDEC** : Identifier les situations ou moments de désorientation

#### `F3_RECO_04` `[LEGACY]` 🟠 ccc
**Reco** : Situation à risque nécessitant une sécurisation renforcée et une évaluation médicale.
**IDEC** : Évaluer le risque de fugue ou de perte

#### `F3_RECO_05` `[LEGACY]` 🔴 critique
**Reco** : Prévenir les situations à risque par des mesures de sécurisation ciblées.
**IDEC** : Identifier les situations ou moments à risque

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_075` | INFO | 🟢 0.60 | Identifier les situations ou moments de désorientation |
| `MT_V2_040` | ORGA | 🟢 0.58 | Identifier les situations ou moments à risque |
| `MT_V2_045` | ORGA | 🟢 0.57 | Identifier les situations à risque (fatigue, moments de la journée) |

#### `F3_RECO_06` `[LEGACY]` 🔴 critique
**Reco** : Situation à risque élevé nécessitant une action immédiate et coordonnée.
**IDEC** : Évaluer la gravité et la fréquence des comportements

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_042` | ORGA | 🟡 0.47 | Évaluer la gravité et la fréquence des comportements |

#### `F3_RECO_07` `[LEGACY]` 🟠 ccc
**Reco** : Demandez la surveillance des changements d'humeur ou de comportement et l'orientation vers un psychiatre si besoin.
**Acteurs** : Psychologue
**IDEC** : Prendre RDV avec un Psychologue conventionné pour être remboursé du territoire (Recherche sur internet)

#### `F3_RECO_08` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à évaluer les changements d'humeur ou de comportement et à réévaluer les traitements si besoin.
**Acteurs** : Psychiatre
**IDEC** : Prendre RDV avec un Psychiatre du territoire (Recherche sur internet)  pour un suivi

#### `F3_RECO_09` `[LEGACY]` 🔴 critique
**Reco** : Demandez des scéances de suivi pour prévenir de la détérioration.
**Acteurs** : Psychologue
**IDEC** : Prendre RDV avec un Psychologue conventionné pour être remboursé du territoire (Recherche sur internet)

#### `F3_RECO_10` `[LEGACY]` 🔴 critique
**Reco** : Demandez une intervention immédiate par un psychiatre pour faire évaluer les comportements à risque.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec un Psychiatre du territoire (Recherche sur internet)  pour un suivi

#### `F3_RECO_11` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à évaluer les troubles de la mémoire ou de la concentration et adapter la prise en charge si besoin.
**Acteurs** : Psychiatre
**IDEC** : IDEC prend RDV avec le psychiatre                        Demander une prescription pour surveillance des traitement spar

#### `F3_RECO_12` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à évaluer les troubles de la mémoire ou de la concentration et à adapter la prise en charge si besoin (prescription passage infirmier pour la prise des traitements,...).
**Acteurs** : Psychiatre
**IDEC** : IDEC prend RDV avec le psychiatre                        Demander une prescription pour surveillance des traitement spar

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_061` | MED | 🟢 0.59 | IDEC prend RDV avec le psychiatre                        Demander une prescripti |

#### `F3_RECO_13` `[LEGACY]` 🟠 ccc
**Reco** : Demandez la surveillance des idées suicidaires et l'orientation vers un psychiatre si besoin.
**Acteurs** : Psychologue
**IDEC** : Prendre RDV avec un Psychologue conventionné pour être remboursé du territoire (Recherche sur internet)

#### `F3_RECO_14` `[LEGACY]` 🟠 ccc
**Reco** : Demandez l'évaluation du risque suicidaire et orienter vers les urgences.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec un médecin généraliste (Recherche sur internet)  pour orienter vers les urgences

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_059` | MED | 🟢 0.70 | Prendre RDV avec un médecin généraliste (Recherche sur internet)  pour orienter  |

#### `F3_RECO_15` `[LEGACY]` 🟠 ccc
**Reco** : Demandez un courrier pour une consultation gériatrique ou neurologique. .
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec  le médecin traitant pour lettre d'adressage pour neurologue et geriatre.                              

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_056` | MED | 🟢 0.56 | Prendre RDV avec  le médecin traitant pour lettre d'adressage pour neurologue et |

#### `F3_RECO_16` `[LEGACY]` 🟠 ccc
**Reco** : Demandez un courrier pour une consultation gériatrique et une prescription pour le passage d'une infirmière.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec  le médecin traitant pour lettre d'adressage pour geriatre.                                       Presc

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_062` | MED | 🟢 0.51 | Contacter le médecin traitant pour :                                   Demander  |
| `MT_V2_067` | MED | 🟢 0.65 | Prendre RDV avec  le médecin traitant pour lettre d'adressage pour geriatre.     |

---

### F4 — Douleur, fatigue, sommeil et état général
> 16 recos · 15 MT

#### `F4_RECO_01` `[IA]` 🟠 ccc
**Reco** : Demandez la prescription ou la modification du traitement antalgique et/ou demandez un courrier vers un gériatre et/ou un algologue (centre de la douleur).
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour demander un bilan douleur (lettre d'adressage)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_049` | MED | 🟢 0.64 | Contacter le médecin traitant pour demander un bilan douleur (lettre d'adressage |

#### `F4_RECO_02` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à réévaluer les traitements
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec le médecin traitant   pour bilan sur l'état santé et réévaluer les traitements

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_057` | MED | 🟢 0.68 | Prendre RDV avec le médecin traitant   pour bilan sur l'état santé et réévaluer  |
| `MT_V2_058` | MED | 🟢 0.68 | Prendre RDV avec le médecin traitant   pour bilan sur l'état santé et réévaluer  |

#### `F4_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à réévaluer les traitements et l'état psychologique.                                      Demandez l'évaluation des causes de l'asthénie si besoin.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec le médecin traitant   pour bilan sur l'état santé et réévaluer les traitement

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_063` | MED | 🟢 0.53 | Contacter le médecin traitant pour :                                   Demander  |

#### `F4_RECO_04` `[IA]` 🟠 ccc
**Reco** : Contacter médecin traitant pour prescription de séances de psychologue
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec le médecin  traitant pour une prescription de séances avec psychologue

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_051` | MED | 🟢 0.69 | Contacter le médecin traitant pour bilan de chute |
| `MT_V2_053` | MED | 🟢 0.87 | Prendre RDV avec le médecin  traitant pour une prescription de séances avec psyc |
| `MT_V2_070` | MED | 🟢 0.67 | Prendre RDV avec le médecin  traitant pour une prescription de séances avec psyc |

#### `F4_RECO_05` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à réévaluer les traitements et les troubles du sommeil.
**Acteurs** : Psychiatre ou neurologue
**IDEC** : Prendre RDV avec un Psychiatre du territoire (Recherche sur internet)  pour un suivi

#### `F4_RECO_06` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à vérifier régulièrement l'état bucco-dentaire.
**Acteurs** : Chirurgien-dentiste
**IDEC** : Prendre RDV avec un Chirurgien-dentiste (Recherche sur internet)  pour un suivi

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_009` | SEC | 🟢 0.51 | Prendre RDV avec un Chirurgien-dentiste (Recherche sur internet)  pour un suivi |

#### `F4_RECO_07` `[LEGACY]` 🟠 ccc
**Reco** : Demandez l'évaluation de l'état nutritionnel et l'orientation vers un nutritionniste.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : IDEC prend RDV avec le MT pour faire un bilan de santé et orienter vers un psychiatre

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_054` | MED | 🟢 0.57 | IDEC prend RDV avec le MT pour faire un bilan de santé et orienter vers un psych |

#### `F4_RECO_08` `[LEGACY]` 🟠 ccc
**Reco** : Demandez l'évaluation de l'état nutrionnel et la recherche de la cause du changement de poids. Demandez, si besoin, un courrier vers le psychiatre.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : IDEC prend RDV avec le MT pour faire un bilan de santé et orienter vers un psychiatre

#### `F4_RECO_09` `[IA]` 🟠 ccc
**Reco** : Effectuez un suivi de routine tous les 3 à 5 ans.
**Acteurs** : ORL, Ophtalmologue
**IDEC** : Prendre RDV avec  l’ophtalmologue

#### `F4_RECO_10` `[LEGACY]` 🟠 ccc
**Reco** : Effectuez un suivi annuel.
**Acteurs** : ORL, Ophtalmologue
**IDEC** : Prendre RDV avec  l’ophtalmologue

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_017` | SEC | 🟢 0.56 | Prendre RDV avec  l’ophtalmologue |
| `MT_V2_022` | SEC | 🟡 0.50 | Prendre RDV avec ophtalmologue (Recherche sur internet) |
| `MT_V2_028` | SEC | 🟢 0.53 | Prendre RDV avec l’ORL |

#### `F4_RECO_11` `[LEGACY]` 🟠 ccc
**Reco** : Effectuez un suivi annuel ou suivant la préconisation du médecin.
**Acteurs** : ORL, Ophtalmologue
**IDEC** : Prendre RDV avec  l’ophtalmologue

#### `F4_RECO_12` `[LEGACY]` 🟠 ccc
**Reco** : Demandez la prescription de l'osteodensitométrie et un bilan osseux.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec  le médecin traitant pour bilan osseux

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_064` | MED | 🟢 0.66 | Prendre RDV avec  le médecin traitant pour bilan osseux |

#### `F4_RECO_13` `[LEGACY]` 🟠 ccc
**Reco** : Demandez à faire un bilan de médication.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour exposer l'état  de santé et demander un bilan de médication

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_052` | MED | 🟢 0.68 | Contacter le médecin traitant pour exposer l'état  de santé et demander un bilan |

#### `F4_RECO_14` `[LEGACY]` 🟠 ccc
**Reco** : Mettez en place un suivi régulier selon les préconisations du chirurgien-dentiste.
**Acteurs** : Chirurgien-dentiste
**IDEC** : Contacter un chirurgien-dentiste pour suivi (Recherche sur internet)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_003` | SEC | 🟢 0.61 | Contacter un chirurgien-dentiste pour suivi (Recherche sur internet) |

#### `F4_RECO_15` `[LEGACY]` 🟠 ccc
**Reco** : Discutez des causes de la perte d'appétit et demandez la prescription d'un bilan de dénutrition.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour bilan de dénutrition (lettre d'adressage)

#### `F4_RECO_16` `[LEGACY]` 🟠 ccc
**Reco** : Demandez la vérification de l'état bucco-dentaire.
**Acteurs** : Chirurgien-dentiste
**IDEC** : Contacter un chirurgien-dentiste pour suivi (Recherche sur internet)

---

### F5 — Dépendance, handicap, addictions et épisodes aigus
> 3 recos · 2 MT

#### `F5_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Demandez le suivi d'un comportement addictif ponctuel pour votre proche et votre propre suivi si besoin.
**Acteurs** : Psychologue
**IDEC** : Prendre RDV avec un Psychologue conventionné pour être remboursé du territoire (Recherche sur internet)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_011` | SEC | 🟢 0.62 | Prendre RDV avec un Psychologue conventionné pour être remboursé du territoire ( |

#### `F5_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Discutez de la difficulté à contrôler la consommation et demandez courrier vers un medecin addictologue (ou CSAPA) ainsi qu'un suivi psychologique.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Prendre RDV avec le médecin  traitant pour une prescription de séances avec psychologue et une lettre d'adressage pour c

#### `F5_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Demandez le financement de la perte d'autonomie via l'APA.
**Acteurs** : Conseil départemental
**IDEC** : Variable selon les départements (demande papier ou numérique).                                                          

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_077` | INFO | 🟡 0.43 | Variable selon les départements (demande papier ou numérique).                   |

---

### F6 — Autonomie fonctionnelle, chutes et aides techniques
> 9 recos · 19 MT

#### `F6_RECO_01` `[LEGACY]` ⚪ ?
**Reco** : Prévenir le risque de chute et sécuriser les transferts.
**Acteurs** : IDEC / Aidant / Kinésithérapeute
**IDEC** : Identifier les situations à risque (fatigue, moments de la journée)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_046` | ORGA | 🟡 0.49 | Évaluer le risque de fugue ou de perte |

#### `F6_RECO_02` `[LEGACY]` ⚪ ?
**Reco** : Situation à risque nécessitant une sécurisation renforcée et une évaluation fonctionnelle.
**Acteurs** : IDEC / Aidant / Kinésithérapeute
**IDEC** : Évaluer le risque de chute et la perte d’autonomie

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_033` | ORGA | 🟢 0.56 | Évaluer le risque de chute et la perte d’autonomie |

#### `F6_RECO_03` `[LEGACY]` ⚪ ?
**Reco** : Demander une prescription de matériel  médical au MT et une prescription pour un bilan par un ergothérapeute
**Acteurs** : Médecin Traitant (ou généraliste)
**IDEC** : Prendre RDV avec  le médecin traitant pour             - - Prescription de matériel médical                             

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_066` | MED | 🟢 0.72 | Prendre RDV avec  le médecin traitant pour             - - Prescription de matér |

#### `F6_RECO_04` `[LEGACY]` ⚪ ?
**Reco** : Demandez un bilan et un plan nutritionnel.
**Acteurs** : Nutritionniste
**IDEC** : Prendre RDV avec un nutritionniste pour bilan  nutritionnel  (Recherche sur internet)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_071` | MED | 🟢 0.66 | Prendre RDV avec un nutritionniste pour bilan  nutritionnel  (Recherche sur inte |

#### `F6_RECO_05` `[LEGACY]` ⚪ ?
**Reco** : Demandez un courrier pour l'orientation vers un urologue et/ou demandez la prescription de la rééducation périnéo-sphinctérienne sur l'apparition d'une incontinence.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour demander:                       - - une lettre d'adressage pour l'urologue,          

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_060` | MED | 🟢 0.60 | Contacter le médecin traitant pour demander:                       - - une lettr |

#### `F6_RECO_06` `[LEGACY]` ⚪ ?
**Reco** : Demandez l'APA ou demandez si une réévaluation est nécessaire. Demandez un courrier vers gériatre (en l'absence d'évaluation) et/ou orthophoniste (si troubles de la déglutition).
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour la réévaluation  de L'APA   et une lettre d'adressage pour bilan gériatre complet

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_048` | MED | 🟢 0.62 | Contacter le médecin traitant pour la réévaluation  de L'APA   et une lettre d'a |

#### `F6_RECO_07` `[LEGACY]` ⚪ ?
**Reco** : Un suivi régulier est à prévoir selon les préconisations du médecin.
**Acteurs** : Cancérologue, Cardiologue, Dermatologue
**IDEC** : Prendre RDV avec ORL (Recherche sur internet)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_001` | SEC | 🟡 0.45 | Prendre RDV avec pneumologue (Recherche sur internet) |
| `MT_V2_002` | SEC | 🟡 0.48 | Prendre RDV avec ORL (Recherche sur internet) |
| `MT_V2_005` | SEC | 🟡 0.45 | Prendre RDV avec néphrologue (Recherche sur internet) |
| `MT_V2_007` | SEC | 🟡 0.45 | Prendre RDV avec cardiologue (Recherche sur internet) |
| `MT_V2_012` | SEC | 🟡 0.45 | Prendre RDV avec dermatologue (Recherche sur internet) |
| `MT_V2_015` | SEC | 🟡 0.45 | Prendre RDV avec diabétologue (Recherche sur internet) |
| `MT_V2_018` | SEC | 🟡 0.45 | Prendre RDV avec cancérologue (Recherche sur internet) |
| `MT_V2_019` | SEC | 🟡 0.45 | Prendre RDV avec neurologue (Recherche sur internet) |
| `MT_V2_021` | SEC | 🟡 0.45 | Prendre RDV avec rhumatologue (Recherche sur internet) |
| `MT_V2_023` | SEC | 🟡 0.45 | Prendre RDV avec endocrinologue (Recherche sur internet) |
| `MT_V2_026` | SEC | 🟡 0.46 | Prendre RDV avec Urologue (Recherche sur internet) |
| `MT_V2_029` | SEC | 🟡 0.42 | Prendre RDV avec gastro-enterolologue (Recherche sur internet) |

#### `F6_RECO_08` `[LEGACY]` ⚪ ?
**Reco** : Demandez un bilan et mettez en place des aides techniques pour faciliter les actes de la vie quotidienne.
**Acteurs** : Ergothérapeute
**IDEC** : Prendre contact avec un ergothérapeute du territoire

#### `F6_RECO_09` `[LEGACY]` ⚪ ?
**Reco** : Demandez un bilan de chute et un bilan chez un kiné (semelles orthopédiques si besoin).
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour bilan de chute

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V2_055` | MED | 🟢 0.65 | Contacter le médecin traitant pour bilan de chute et un bilan kiné |

---

## V3 — Santé de l'Aidant

### S1 — Charge, fatigue et risque d'épuisement
> 6 recos · 4 MT

#### `S1_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Discutez des difficultés d'être aidant avec l'IDEC
**Acteurs** : IDEC
**IDEC** : Proposer un échange avec l’aidant pour évaluer le vécu émotionnel

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_014` | ORGA | 🟡 0.42 | Échanger sur les difficultés d’organisation |
| `MT_V3_004` | SEC | 🟡 0.47 | Proposer un échange avec l’aidant pour évaluer le vécu émotionnel |

#### `S1_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Prendre rendez-vous avec le médecin traitant afin d'échanger des difficultés d'être aidant
**Acteurs** : IDEC, Médecin
**IDEC** : Contacter l’aidant pour évaluer la charge mentale

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_032` | INFO | 🟡 0.43 | Contacter l’aidant pour évaluer la charge mentale |

#### `S1_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Sollicité un service d'aide à domicile pour prendre le relais
**Acteurs** : Service à domicile (SAD), Service à domicile (SAD)/ Auxiliaire de vie, Services à domicile (SAD)
**IDEC** : 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD.

#### `S1_RECO_04` `[LEGACY]` 🟢 standard
**Reco** : Demandez à ajuster les demandes d'aide.

#### `S1_RECO_05` `[LEGACY]` 🟢 standard
**Reco** : Contacter une assistante sociale afin de faire le point sur les aides auxquelles vous ou vos proches pouvez éventuellement être éligibles.
**Acteurs** : Assistante sociale
**IDEC** : Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'IDEC)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_031` | INFO | 🟡 0.46 | Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'I |

#### `S1_RECO_06` `[LEGACY]` 🟢 standard
**Reco** : Contactez la plateforme de répit de votre territoire.

---

### S2 — Inquiétudes pour la sécurité
> 7 recos · 8 MT

#### `S2_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Sollicité un service d'aide à domicile pour des interventions dans le but d'assurer la sécurité de votre proche
**Acteurs** : IDEC, Médecin, Services à domicile (SAD)
**IDEC** : 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD.

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_005` | SEC | 🟢 0.52 | 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du |

#### `S2_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Solliciter un rendez-vous avec l'IDEC pour parler de vos inquiètudes
**Acteurs** : IDEC
**IDEC** : Identifier les situations ou contextes déclenchants

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_011` | ORGA | 🟡 0.33 | Tracer la situation comme stable dans le dossier (dans CRM) |
| `MT_V3_012` | ORGA | 🟡 0.38 | Identifier les situations ou contextes déclenchants |
| `MT_V3_002` | SEC | 🟡 0.36 | 5=> Suivi IDEC de la mise en place de l'intervention : soit via chat avec l'aida |
| `MT_V3_006` | SEC | 🟡 0.38 | Proposer un temps d’échange pour faire le point |

#### `S2_RECO_03` `[LEGACY]` 🟢 standard
**Reco** : Demandez une intervention médico-sociale renforcée.
**Acteurs** : Centre medico-psychologique (CMP) ou Centre medico-pédo-pédagogique (CMPP)
**IDEC** : IDEC contacte le CMP de secteur (recherche sur Internet)  pour prise de contact et rendez-vous avec un infirmier du CMP 

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_003` | SEC | 🟡 0.46 | IDEC contacte le CMP de secteur (recherche sur Internet)  pour prise de contact  |

#### `S2_RECO_04` `[LEGACY]` 🟠 ccc
**Reco** : Encourager l’appui de l’entourage et des ressources existantes
**IDEC** : Noter un isolement ponctuel

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_010` | ORGA | 🟢 0.52 | Noter un isolement ponctuel |

#### `S2_RECO_05` `[LEGACY]` 🟠 ccc
**Reco** : Discutez des difficultés d'être aidant avec l'IDEC
**Acteurs** : IDEC
**IDEC** : Proposer un échange avec l’aidant pour évaluer le vécu émotionnel

#### `S2_RECO_06` `[LEGACY]` 🟠 ccc
**Reco** : Envisager un soutien psychologique
**Acteurs** : Psychologue
**IDEC** : Orienter vers un  soutien psychologique

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_001` | SEC | 🟢 0.88 | Orienter vers un  soutien psychologique |

#### `S2_RECO_07` `[LEGACY]` 🟠 ccc
**Reco** : Sollicité un service d'aide à domicile pour prendre le relais
**Acteurs** : Services à domicile (SAD)
**IDEC** : 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD.

---

### S3 — Santé physique et renoncement aux soins
> 5 recos · 18 MT

#### `S3_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Prendre rendez-vous avec le médecin traitant afin d'échanger sur vos troubles du sommeil
**Acteurs** : IDEC / Médecin
**IDEC** : Contacter le médecin traitant pour bilan de santé

#### `S3_RECO_02` `[LEGACY]` 🟠 ccc
**Reco** : Bénéficiez d'un accompagnement d'accès aux soins (Médecin traitant…).
**Acteurs** : CPAM
**IDEC** : 1=>Informer sur les dispositifs d’accès aux soins en utilisant le document "courrier DAC/CPTS" 
2=>Chercher  un médecin 

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_033` | INFO | 🟡 0.35 | 1=>Informer sur les dispositifs d’accès aux soins en utilisant le document "cour |

#### `S3_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Un suivi régulier est à prévoir selon les préconisations du médecin.
**Acteurs** : Cardiologue, Chirurgien-Dentiste, Dermatologue
**IDEC** : Prendre RDV avec Cardiologue en fonction de la date de la dernière consultation

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_015` | MED | 🟢 0.54 | Prendre RDV avec Dermatologue en fonction de la date de la dernière consultation |
| `MT_V3_016` | MED | 🟡 0.41 | Prendre RDV avec Gynécologue en fonction de la date de la dernière consultation |
| `MT_V3_017` | MED | 🟢 0.56 | Prendre RDV avec Cardiologue en fonction de la date de la dernière consultation |
| `MT_V3_021` | MED | 🟢 0.55 | Prendre RDV avec Oncologue en fonction de la date de la dernière consultation |
| `MT_V3_022` | MED | 🟢 0.52 | Prendre RDV avec Endocrinolo-Diabétologue en fonction de la date de la dernière  |
| `MT_V3_023` | MED | 🟢 0.54 | Prendre RDV avec Pneumologue en fonction de la date de la dernière consultation |
| `MT_V3_024` | MED | 🟢 0.54 | Prendre RDV avec Neurologue en fonction de la date de la dernière consultation |
| `MT_V3_025` | MED | 🟢 0.52 | Prendre RDV avec Gériatre en fonction de la date de la dernière consultation |
| `MT_V3_026` | MED | 🟡 0.44 | Prendre RDV avec Ophtamologue en fonction de la date de la dernière consultation |
| `MT_V3_027` | MED | 🟢 0.54 | Prendre RDV avec ORL en fonction de la date de la dernière consultation |
| `MT_V3_028` | MED | 🟢 0.52 | Prendre RDV avec Psychiatre en fonction de la date de la dernière consultation |
| `MT_V3_029` | MED | 🟢 0.52 | Prendre RDV avec Gastro-Entérologue en fonction de la date de la dernière consul |
| `MT_V3_030` | MED | 🟢 0.52 | Prendre RDV avec Chirurgien-dentiste en fonction de la date de la dernière consu |

#### `S3_RECO_04` `[LEGACY]` 🟠 ccc
**Reco** : Demandez un bilan de santé.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour bilan de santé

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_020` | MED | 🟢 0.73 | Contacter le médecin traitant pour bilan de santé |
| `MT_V3_008` | ORGA | 🟡 0.33 | Respecter la non-réponse sans insistance |

#### `S3_RECO_05` `[LEGACY]` 🟠 ccc
**Reco** : Prendre rendez-vous avec votre médecin traitant pour bilan
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour exposer l'état  de santé et demander un bilan de médication

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_018` | MED | 🟢 0.56 | Orienter vers le médecin traitant |
| `MT_V3_019` | MED | 🟢 0.66 | Contacter le médecin traitant pour exposer l'état  de santé et demander un bilan |

---

### S4 — Hygiène de vie (activité et sommeil)
> 1 recos · 3 MT

#### `S4_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Prendre rendez-vous avec le médecin traitantpour bilan de santé
**Acteurs** : IDEC, IDEC / Médecin
**IDEC** : Contacter le médecin traitant pour bilan de santé

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V3_007` | ORGA | 🟡 0.41 | Évaluer le risque immédiat ou latent |
| `MT_V3_009` | ORGA | 🟡 0.46 | 3=>IDEC transmets à l'aidant pour choix et prise de contact. |
| `MT_V3_013` | ORGA | 🟡 0.37 | 2=>IDEC contacte les SAD (du territoire du domicile du proche regarder coordonné |

---

## V4 — Parcours Médical

### M1 — Compréhension du diagnostic et de la maladie
> 17 recos · 15 MT

#### `M1_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Maintenir l’information et rester disponible en cas de questions.
**Acteurs** : IDEC
**IDEC** : Valoriser la compréhension de l’aidant

#### `M1_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Renforcer l’information et clarifier certains points médicaux.
**Acteurs** : IDEC / Professionnels de santé
**IDEC** : Identifier les points incompris ou sources de doute

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_023` | ORGA | 🟢 0.53 | Identifier les points incompris ou sources de doute |

#### `M1_RECO_03` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place un accompagnement renforcé à l’information médicale.
**Acteurs** : IDEC / Médecin / Infirmier
**IDEC** : Proposer un temps d’échange dédié

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_074` | SEC | 🟡 0.49 | Proposer un temps d’échange dédié |

#### `M1_RECO_04` `[LEGACY]` 🟢 standard
**Reco** : Maintenir le suivi médical et rester attentif aux évolutions.
**Acteurs** : IDEC
**IDEC** : Confirmer la bonne compréhension du diagnostic par l’aidant

#### `M1_RECO_05` `[LEGACY]` 🟢 standard
**Reco** : Clarifier la situation médicale et les hypothèses en cours.
**Acteurs** : IDEC / Médecin
**IDEC** : Identifier les zones d’incertitude exprimées par l’aidant

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_003` | ORGA | 🟡 0.49 | Identifier les zones d’incertitude exprimées par l’aidant |

#### `M1_RECO_06` `[LEGACY]` 🟢 standard
**Reco** : Organiser un temps médical dédié pour poser ou expliquer le diagnostic.
**Acteurs** : IDEC / Médecin
**IDEC** : Proposer une consultation médicale explicative

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_124` | MED | 🟢 0.58 | Proposer une consultation médicale explicative |

#### `M1_RECO_07` `[LEGACY]` 🟢 standard
**Reco** : Explorer la compréhension globale de la situation médicale.
**Acteurs** : IDEC
**IDEC** : Proposer un temps d’échange pour faire le point

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_034` | ORGA | 🟢 0.50 | Valoriser la compréhension de l’aidant |
| `MT_V4_064` | SEC | 🟡 0.46 | Proposer un temps d’échange pour faire le point |

#### `M1_RECO_08` `[LEGACY]` 🟠 ccc
**Reco** : Maintenir le suivi médical actuel et rester attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Confirmer l’absence de contradiction perçue

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_045` | ORGA | 🟡 0.46 | Confirmer l’absence de contradiction perçue |

#### `M1_RECO_09` `[LEGACY]` 🟠 ccc
**Reco** : Clarifier le parcours de soins et les étapes à venir.
**Acteurs** : IDEC / Médecin
**IDEC** : Identifier les zones d’incompréhension du parcours médical

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_028` | ORGA | 🟢 0.51 | Confirmer que le parcours de soins est perçu comme clair |
| `MT_V4_051` | ORGA | 🟢 0.52 | Identifier les zones d’incompréhension du parcours médical |

#### `M1_RECO_10` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place un accompagnement renforcé pour structurer le parcours médical.
**Acteurs** : IDEC / Médecin
**IDEC** : Proposer un temps de synthèse médicale

#### `M1_RECO_11` `[LEGACY]` 🟠 ccc
**Reco** : Clarifier les avis médicaux et aider à la compréhension des décisions prises.
**Acteurs** : IDEC / Médecin
**IDEC** : Identifier les points de divergence perçus par l’aidant

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_009` | ORGA | 🟢 0.51 | Identifier les points de divergence perçus par l’aidant |
| `MT_V4_032` | ORGA | 🟡 0.48 | Confirmer la bonne compréhension du diagnostic par l’aidant |

#### `M1_RECO_12` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place un accompagnement renforcé pour harmoniser le suivi médical.
**Acteurs** : IDEC / Médecin
**IDEC** : Proposer un temps de concertation ou de synthèse médicale

#### `M1_RECO_13` `[LEGACY]` 🟠 ccc
**Reco** : Maintenir l’organisation mise en place et rester attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Valoriser la préparation et la coordination existantes

#### `M1_RECO_14` `[LEGACY]` 🟠 ccc
**Reco** : Clarifier les modalités de la transition et les interlocuteurs.
**Acteurs** : IDEC / Établissements de santé
**IDEC** : Identifier les zones d’incertitude de la transition

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_135` | STRUC | 🟢 0.63 | Identifier les zones d’incertitude de la transition |

#### `M1_RECO_15` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place un accompagnement renforcé pour organiser la transition.
**Acteurs** : IDEC / Établissements de santé
**IDEC** : Proposer une coordination entre les services

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_054` | SEC | 🟡 0.46 | Proposer une coordination entre les services |

#### `M1_RECO_16` `[LEGACY]` 🟠 ccc
**Reco** : Aucune action spécifique, rester attentif à une évolution future.
**Acteurs** : IDEC
**IDEC** : Noter que la situation n’est pas concernée

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_050` | ORGA | 🟢 0.50 | Noter que la situation n’est pas concernée |

#### `M1_RECO_17` `[LEGACY]` 🟢 standard
**Reco** : Demandez à vérifier l'éligibilité à la mise sous ALD.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant  pour dossier ALD (100%)'

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_131` | MED | 🟢 0.56 | Contacter le médecin traitant  pour dossier ALD (100%)' |

---

### M2 — Accès aux soins et aux professionnels
> 18 recos · 39 MT

#### `M2_RECO_01` `[IA]` 🟠 ccc
**Reco** : Maintenir l’organisation actuelle et rester attentif à l’évolution des besoins.
**Acteurs** : IDEC
**IDEC** : Confirmer l’absence de difficulté d’accès aux soins

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_005` | ORGA | 🟡 0.48 | Confirmer l’absence de difficulté d’accès aux soins |

#### `M2_RECO_02` `[LEGACY]` 🟠 ccc
**Reco** : Identifier des solutions pour faciliter l’accès aux soins.
**Acteurs** : IDEC / Professionnels de santé
**IDEC** : Évaluer les difficultés liées à l’éloignement géographique

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_026` | ORGA | 🟡 0.43 | Évaluer les difficultés liées à l’éloignement géographique |

#### `M2_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Identifier des solutions pour réduire les délais d’accès aux soins.
**Acteurs** : IDEC / Professionnels de santé
**IDEC** : Rechercher des alternatives (autres praticiens, téléconsultation)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_126` | MED | 🟡 0.43 | Rechercher des alternatives (autres praticiens, téléconsultation) |

#### `M2_RECO_04` `[LEGACY]` 🟠 ccc
**Reco** : Faciliter l’accès à des professionnels de santé disponibles.
**Acteurs** : IDEC / CPTS / Professionnels de santé
**IDEC** : Identifier des professionnels hors secteur immédiat

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_120` | INFO | 🟡 0.47 | Faire le point avec le proche et/ou les professionnels de santé |
| `MT_V4_016` | ORGA | 🟢 0.58 | Confirmer l’accessibilité des professionnels de santé |
| `MT_V4_033` | ORGA | 🟢 0.54 | Alerter les professionnels référents |
| `MT_V4_044` | ORGA | 🟢 0.62 | Identifier des professionnels hors secteur immédiat |
| `MT_V4_085` | SEC | 🟡 0.49 | Vérifier l’implication du professionnel dans le suivi |

#### `M2_RECO_05` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place des solutions de transport ou d’organisation des déplacements.
**Acteurs** : IDEC / Services de transport / Entourage
**IDEC** : Évaluer les besoins de transport

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_007` | ORGA | 🟡 0.45 | Présenter à la famille les solutions de téléassistance existantes |
| `MT_V4_039` | ORGA | 🟢 0.56 | Évaluer les besoins de transport |

#### `M2_RECO_06` `[LEGACY]` 🟠 ccc
**Reco** : Accompagner l’utilisation des outils numériques.
**Acteurs** : IDEC
**IDEC** : Proposer un accompagnement pour la prise de rendez-vous

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_094` | SEC | 🟢 0.56 | Proposer un accompagnement pour la prise de rendez-vous |

#### `M2_RECO_07` `[LEGACY]` 🟠 ccc
**Reco** : Aider à coordonner les rendez-vous avec les contraintes personnelles.
**Acteurs** : IDEC
**IDEC** : Identifier les contraintes organisationnelles

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_133` | MED | 🟡 0.35 | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste |
| `MT_V4_046` | ORGA | 🟢 0.65 | Identifier les contraintes organisationnelles |

#### `M2_RECO_08` `[LEGACY]` 🟠 ccc
**Reco** : Identifier des aides financières ou des prises en charge possibles.
**Acteurs** : IDEC
**IDEC** : Informer sur les dispositifs de prise en charge existants

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_110` | INFO | 🟢 0.64 | Informer sur les dispositifs de prise en charge existants |

#### `M2_RECO_09` `[LEGACY]` 🟠 ccc
**Reco** : Identifier la difficulté spécifique et proposer une solution adaptée.
**Acteurs** : IDEC
**IDEC** : Échanger avec l’aidant pour préciser la difficulté

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_019` | ORGA | 🟢 0.51 | Échanger avec l’aidant pour préciser la difficulté |

#### `M2_RECO_10` `[LEGACY]` 🟠 ccc
**Reco** : Maintenir la dynamique éducative et rester attentif aux besoins complémentaires.
**Acteurs** : IDEC
**IDEC** : Valoriser la participation au programme ETP

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_024` | ORGA | 🟡 0.48 | Valoriser la participation au programme ETP |
| `MT_V4_037` | ORGA | 🟡 0.48 | Valoriser la participation aux groupes de parole |

#### `M2_RECO_11` `[LEGACY]` 🟠 ccc
**Reco** : Informer sur l’existence et l’intérêt des programmes ETP.
**Acteurs** : IDEC / Professionnels de santé
**IDEC** : Expliquer le principe et les bénéfices de l’ETP

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_116` | INFO | 🟢 0.58 | Expliquer le principe et les bénéfices de l’ETP |

#### `M2_RECO_12` `[LEGACY]` 🟠 ccc
**Reco** : Réévaluer l’intérêt du programme ETP et les freins éventuels.
**Acteurs** : IDEC / Médecin
**IDEC** : Échanger avec l’aidant et le proche sur les raisons du refus ou du report

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_011` | ORGA | 🟢 0.50 | Échanger avec l’aidant et le proche sur les raisons de l’arrêt |
| `MT_V4_018` | ORGA | 🟢 0.53 | Échanger avec l’aidant et le proche sur les raisons du refus ou du report |
| `MT_V4_081` | SEC | 🟡 0.45 | Échanger avec l’aidant sur les effets du suivi |
| `MT_V4_087` | SEC | 🟢 0.56 | Échanger avec l’aidant et le proche sur les freins au suivi |

#### `M2_RECO_13` `[LEGACY]` 🟠 ccc
**Reco** : Clarifier la situation et vérifier l’historique de prise en charge.
**Acteurs** : IDEC
**IDEC** : Faire le point avec le proche et/ou les professionnels de santé

#### `M2_RECO_14` `[LEGACY]` 🟠 ccc
**Reco** : Demandez la prescription du passage d'une infirmière libérale pour la préparation et la surveillance de la prise médicamenteuse.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour :                                   Demander la prescription pour passage d'une IDEL,

#### `M2_RECO_15` `[LEGACY]` 🟠 ccc
**Reco** : Demandez un bilan gériatrique et en particulier un bilan mémoire.
**Acteurs** : Médecin traitant (ou généraliste)
**IDEC** : Contacter le médecin traitant pour :                                   Demander lUne lettre d'adressage pour un bilan gé

#### `M2_RECO_16` `[IA]` 🟠 ccc
**Reco** : Contactez la CPTS de votre territoire.
**Acteurs** : CPTS (Communauté Professionnelle Territoriale de Santé), DAC (Dispositif d'Aide à la Coordination)

#### `M2_RECO_17` `[LEGACY]` 🟠 ccc
**Reco** : Bénéficiez d'un accompagnement d'accès aux soins.
**Acteurs** : CPAM (caisse primaire d'assurance maladie)
**IDEC** : 1=>Informer sur les dispositifs d’accès aux soins en utilisant le document "courrier DAC/CPTS" 
2=>Chercher  un médecin 

#### `M2_RECO_18` `[LEGACY]` 🟠 ccc
**Reco** : Un suivi régulier est à prévoir selon les préconisations du médecin.
**Acteurs** : 10-ORL, Cardiologue, Chirurgien-Dentiste
**IDEC** : Prendre RDV avec Cardiologue (Recherche sur internet)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_052` | SEC | 🟡 0.34 | Prendre RDV avec un APA du territoire (Recherche sur internet) |
| `MT_V4_053` | SEC | 🟡 0.45 | Prendre RDV avec pneumologue (Recherche sur internet) |
| `MT_V4_055` | SEC | 🟡 0.35 | Prendre RDV avec ORL (Recherche sur internet) |
| `MT_V4_057` | SEC | 🟡 0.44 | Prendre RDV avec gériatre (Recherche sur internet) |
| `MT_V4_058` | SEC | 🟡 0.36 | Prendre RDV avec néphrologue (Recherche sur internet) |
| `MT_V4_060` | SEC | 🟡 0.42 | Prendre RDV avec chirurgien dentiste (Recherche sur internet) |
| `MT_V4_069` | SEC | 🟡 0.46 | Prendre RDV avec Oncologue (Recherche sur internet) |
| `MT_V4_073` | SEC | 🟡 0.44 | Prendre RDV avec Psychiatre (Recherche sur internet) |
| `MT_V4_077` | SEC | 🟡 0.41 | Prendre RDV avec un pédicure podologue du territoire (Recherche sur internet) |
| `MT_V4_079` | SEC | 🟡 0.35 | Prendre RDV avec une IDEL du territoire (Recherche sur internet) |
| `MT_V4_083` | SEC | 🟡 0.46 | Prendre RDV avec neurologue (Recherche sur internet) |
| `MT_V4_084` | SEC | 🟡 0.34 | Prendre RDV avec un KINÉSITHÉRAPEUTE du territoire (Recherche sur internet) |
| `MT_V4_086` | SEC | 🟡 0.48 | Prendre RDV avec Cardiologue (Recherche sur internet) |
| `MT_V4_091` | SEC | 🟡 0.45 | Prendre RDV avec endocrinologue (Recherche sur internet) |
| `MT_V4_095` | SEC | 🟡 0.44 | Prendre RDV avec gastro-entérologue (Recherche sur internet) |
| `MT_V4_096` | SEC | 🟡 0.45 | Prendre RDV avec Dermatologue (Recherche sur internet) |
| `MT_V4_098` | SEC | 🟡 0.45 | Prendre RDV avec Ophtalmologue (Recherche sur internet) |

---

### M3 — Urgences, hospitalisations et continuité
> 18 recos · 17 MT

#### `M3_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Maintenir l’organisation actuelle et le suivi médical programmé.
**Acteurs** : IDEC
**IDEC** : Confirmer la stabilité du suivi médical

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_061` | SEC | 🟢 0.53 | Vérifier la continuité du suivi médical |
| `MT_V4_063` | SEC | 🟢 0.51 | Vérifier la régularité du suivi médical |
| `MT_V4_067` | SEC | 🟢 0.59 | Confirmer la stabilité du suivi médical |
| `MT_V4_090` | SEC | 🟢 0.57 | Confirmer la continuité du suivi médical |

#### `M3_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Rester attentif à l’apparition de besoins médicaux non anticipés.
**Acteurs** : IDEC
**IDEC** : Identifier le motif du rendez-vous imprévu

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_025` | ORGA | 🟡 0.46 | Identifier le motif du rendez-vous imprévu |

#### `M3_RECO_03` `[LEGACY]` 🟢 standard
**Reco** : Analyser les causes des consultations non programmées.
**Acteurs** : IDEC / Médecin
**IDEC** : Échanger avec l’aidant sur les situations ayant conduit à ces rendez-vous

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_004` | ORGA | 🟢 0.53 | Échanger avec l’aidant sur les situations ayant conduit à ces rendez-vous |
| `MT_V4_027` | ORGA | 🟢 0.51 | Analyser la récurrence des situations d’urgence |

#### `M3_RECO_04` `[LEGACY]` 🟢 standard
**Reco** : Réévaluer l’organisation du suivi médical.
**Acteurs** : IDEC / Médecin
**IDEC** : Proposer une réévaluation du plan de soins

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_078` | SEC | 🟢 0.54 | Proposer une réévaluation du plan de soins |

#### `M3_RECO_05` `[IA]` 🟢 standard
**Reco** : Mettre en place un accompagnement renforcé pour rétablir un suivi régulier.
**Acteurs** : IDEC / Médecin
**IDEC** : Analyser la récurrence des situations d’urgence

#### `M3_RECO_06` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place une coordination médicale renforcée.
**Acteurs** : IDEC / Médecin
**IDEC** : Proposer un temps de synthèse médicale

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_056` | SEC | 🟢 0.54 | Proposer un temps de synthèse médicale |
| `MT_V4_065` | SEC | 🟢 0.50 | Proposer un temps de concertation ou de synthèse médicale |

#### `M3_RECO_07` `[LEGACY]` 🟢 standard
**Reco** : Situation à risque nécessitant une réorganisation du parcours de soins.
**Acteurs** : IDEC / Médecin / Équipe de soins
**IDEC** : Alerter les professionnels référents

#### `M3_RECO_08` `[LEGACY]` 🟢 standard
**Reco** : Maintenir le suivi médical régulier et rester attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Confirmer la continuité du suivi médical

#### `M3_RECO_09` `[LEGACY]` 🟢 standard
**Reco** : Identifier les causes de l’interruption et sécuriser le suivi à venir.
**Acteurs** : IDEC / Médecin
**IDEC** : Échanger avec l’aidant sur les raisons de la rupture de suivi

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_097` | SEC | 🟢 0.60 | Échanger avec l’aidant sur les raisons de la rupture de suivi |

#### `M3_RECO_10` `[LEGACY]` 🟢 standard
**Reco** : Clarifier l’historique du suivi médical.
**Acteurs** : IDEC
**IDEC** : Faire le point avec l’aidant et les professionnels

#### `M3_RECO_11` `[LEGACY]` 🟠 ccc
**Reco** : Maintenir le suivi et rester attentif aux recommandations issues du bilan.
**Acteurs** : IDEC
**IDEC** : Vérifier la mise en œuvre des recommandations du bilan

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_123` | MED | 🟢 0.63 | Vérifier la mise en œuvre des recommandations du bilan |

#### `M3_RECO_12` `[LEGACY]` 🟠 ccc
**Reco** : Réévaluer l’intérêt d’un nouveau bilan de synthèse.
**Acteurs** : IDEC / Médecin
**IDEC** : Identifier les évolutions depuis le dernier bilan

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_127` | MED | 🟢 0.51 | Informer sur l’intérêt d’une consultation de synthèse |
| `MT_V4_130` | MED | 🟡 0.49 | Identifier les évolutions depuis le dernier bilan |

#### `M3_RECO_13` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place un accompagnement pour organiser un bilan global.
**Acteurs** : IDEC / Médecin / Structures spécialisées
**IDEC** : Informer sur l’intérêt d’une consultation de synthèse

#### `M3_RECO_14` `[LEGACY]` 🟠 ccc
**Reco** : Clarifier l’historique des consultations médicales.
**IDEC** : Faire le point avec l’aidant et les professionnels

#### `M3_RECO_15` `[LEGACY]` 🟠 ccc
**Reco** : Maintenir l’organisation mise en place et rester attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Vérifier le respect des rendez-vous programmés

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_118` | INFO | 🟡 0.45 | Vérifier le respect des rendez-vous programmés |

#### `M3_RECO_16` `[LEGACY]` 🟠 ccc
**Reco** : Compléter et sécuriser l’organisation du suivi post-hospitalisation.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Identifier les éléments manquants dans le suivi

#### `M3_RECO_17` `[LEGACY]` 🟠 ccc
**Reco** : Mettre en place un accompagnement renforcé pour structurer le suivi post-hospitalisation.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Reprendre les éléments de sortie d’hospitalisation

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_134` | STRUC | 🟢 0.58 | Reprendre les éléments de sortie d’hospitalisation |

#### `M3_RECO_18` `[LEGACY]` 🟠 ccc
**Reco** : Aucune action spécifique, rester attentif à une future hospitalisation.
**Acteurs** : IDEC
**IDEC** : Noter l’absence d’hospitalisation récente

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_137` | STRUC | 🟢 0.58 | Noter l’absence d’hospitalisation récente |

---

### M4 — Troubles psychiques, addictions et suivi
> 29 recos · 22 MT

#### `M4_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Maintenir le suivi spécialisé et rester attentif à l’évolution de la situation.
**Acteurs** : IDEC / Service d’addictologie
**IDEC** : Vérifier la régularité du suivi et l’adhésion du proche

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_080` | SEC | 🟢 0.52 | Vérifier la régularité du suivi et l’adhésion du proche |

#### `M4_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Identifier les freins à la poursuite du suivi et réévaluer les besoins.
**Acteurs** : IDEC / Service d’addictologie
**IDEC** : Échanger avec l’aidant et le proche sur les raisons de l’arrêt

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_062` | SEC | 🟡 0.37 | 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du |
| `MT_V4_076` | SEC | 🟡 0.37 | 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du |

#### `M4_RECO_03` `[LEGACY]` 🟢 standard
**Reco** : Évaluer l’existence d’un besoin de prise en charge en addictologie.
**Acteurs** : IDEC / Médecin
**IDEC** : Explorer la situation avec l’aidant et le proche

#### `M4_RECO_04` `[LEGACY]` 🟢 standard
**Reco** : Clarifier la situation médicale et l’historique de suivi.
**Acteurs** : IDEC
**IDEC** : Faire le point avec l’aidant et les professionnels

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_100` | SEC | 🟡 0.40 | Analyser l’impact de l’absence de suivi |

#### `M4_RECO_05` `[LEGACY]` 🟢 standard
**Reco** : Maintenir l’organisation mise en place et rester attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Vérifier le respect des rendez-vous programmés

#### `M4_RECO_06` `[LEGACY]` 🟢 standard
**Reco** : Compléter et sécuriser l’organisation du suivi post-hospitalisation.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Identifier les éléments manquants dans le suivi

#### `M4_RECO_07` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place un accompagnement renforcé pour structurer le suivi post-hospitalisation.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Reprendre les éléments de sortie d’hospitalisation

#### `M4_RECO_08` `[LEGACY]` 🟢 standard
**Reco** : Aucune action spécifique, rester attentif à une future hospitalisation.
**Acteurs** : IDEC
**IDEC** : Noter l’absence d’hospitalisation récente

#### `M4_RECO_09` `[LEGACY]` 🟢 standard
**Reco** : Maintenir le plan existant et rester attentif à son actualisation.
**Acteurs** : IDEC
**IDEC** : Vérifier que le plan est connu et à jour

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_109` | INFO | 🟢 0.55 | Vérifier que le plan est connu et à jour |

#### `M4_RECO_10` `[LEGACY]` 🟢 standard
**Reco** : Clarifier et formaliser un plan d’action en cas de crise.
**Acteurs** : IDEC / Médecin
**IDEC** : Identifier les zones de flou dans la conduite à tenir

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_030` | ORGA | 🟢 0.51 | Identifier les zones de flou dans la conduite à tenir |

#### `M4_RECO_11` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place un accompagnement renforcé pour sécuriser la gestion des situations aiguës.
**Acteurs** : IDEC / Médecin
**IDEC** : Construire un plan d’urgence personnalisé

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_012` | ORGA | 🟡 0.47 | Construire un plan d’urgence personnalisé |

#### `M4_RECO_12` `[IA]` 🟢 standard
**Reco** : Maintenir le suivi existant et rester attentif à l’évolution de l’état psychique.
**Acteurs** : IDEC, IDEC / Médecin généraliste
**IDEC** : Vérifier la régularité du suivi

#### `M4_RECO_13` `[LEGACY]` 🟢 standard
**Reco** : Poursuivre le suivi spécialisé et assurer la coordination des soins.
**Acteurs** : IDEC / Psychiatre
**IDEC** : Vérifier la continuité du suivi psychiatrique

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_099` | SEC | 🟢 0.52 | Vérifier la continuité du suivi psychiatrique |

#### `M4_RECO_14` `[LEGACY]` 🟢 standard
**Reco** : Maintenir le lien avec la structure et suivre le projet de soins.
**Acteurs** : IDEC / CMP / CMPP
**IDEC** : Identifier le référent au sein de la structure

#### `M4_RECO_15` `[LEGACY]` 🟢 standard
**Reco** : Assurer la continuité du parcours de soins après la prise en charge.
**Acteurs** : IDEC / Établissement de santé
**IDEC** : Vérifier les modalités de suivi après la prise en charge

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_066` | SEC | 🟢 0.71 | Vérifier les modalités de suivi après la prise en charge |
| `MT_V4_082` | SEC | 🟢 0.52 | Suivre les objectifs de prise en charge |

#### `M4_RECO_16` `[IA]` 🟢 standard
**Reco** : Maintenir l’accompagnement psychologique et en évaluer les bénéfices.
**Acteurs** : IDEC / Psychiatre / Psychologue, IDEC / Psychologue
**IDEC** : Vérifier la continuité du suivi psychologique ou psychiatrique

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_092` | SEC | 🟢 0.57 | Vérifier la continuité du suivi psychologique ou psychiatrique |

#### `M4_RECO_17` `[LEGACY]` 🟢 standard
**Reco** : Évaluer le besoin d’un accompagnement psychique et proposer une orientation adaptée.
**Acteurs** : IDEC / Médecin
**IDEC** : Explorer les signes de souffrance psychique

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_031` | ORGA | 🟢 0.52 | Explorer les signes de souffrance psychique |

#### `M4_RECO_18` `[LEGACY]` 🟢 standard
**Reco** : Maintenir le suivi médical et assurer la coordination des intervenants.
**Acteurs** : IDEC / Médecin
**IDEC** : Vérifier la régularité du suivi médical

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_089` | SEC | 🟡 0.45 | Vérifier la régularité du suivi |

#### `M4_RECO_19` `[LEGACY]` 🟢 standard
**Reco** : Maintenir l’accompagnement social et éducatif.
**Acteurs** : IDEC / Travailleur social
**IDEC** : Vérifier l’implication du professionnel dans le suivi

#### `M4_RECO_20` `[LEGACY]` 🟢 standard
**Reco** : Assurer la continuité des soins infirmiers dans le suivi addictologique.
**Acteurs** : IDEC / Infirmier
**IDEC** : Vérifier la fréquence et le contenu du suivi infirmier

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_059` | SEC | 🟢 0.57 | Vérifier la fréquence et le contenu du suivi infirmier |

#### `M4_RECO_21` `[LEGACY]` 🟢 standard
**Reco** : Encourager le maintien du lien avec les pairs et le soutien collectif.
**Acteurs** : IDEC / Associations
**IDEC** : Valoriser la participation aux groupes de parole

#### `M4_RECO_22` `[LEGACY]` 🟢 standard
**Reco** : Évaluer le besoin d’un accompagnement addictologique structuré.
**Acteurs** : IDEC / Médecin
**IDEC** : Explorer la situation avec l’aidant et le proche

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_048` | ORGA | 🟢 0.54 | Explorer la situation avec l’aidant et le proche |

#### `M4_RECO_23` `[LEGACY]` 🟢 standard
**Reco** : Identifier les difficultés et renforcer l’accompagnement.
**Acteurs** : IDEC
**IDEC** : Échanger avec l’aidant et le proche sur les freins au suivi

#### `M4_RECO_24` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place un accompagnement pour initier une prise en charge adaptée.
**Acteurs** : IDEC / Médecin / Structures spécialisées
**IDEC** : Explorer les besoins en santé mentale

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_010` | ORGA | 🟡 0.47 | Explorer les besoins en santé mentale |

#### `M4_RECO_25` `[LEGACY]` 🟢 standard
**Reco** : Clarifier la situation de suivi et de traitement.
**Acteurs** : IDEC
**IDEC** : Faire le point avec l’aidant et/ou les professionnels

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_114` | INFO | 🟢 0.50 | Faire le point avec l’aidant et/ou les professionnels |
| `MT_V4_122` | MED | 🟡 0.47 | Vérifier la régularité du suivi et la bonne observance du traitement |

#### `M4_RECO_26` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place rapidement un accompagnement adapté.
**Acteurs** : IDEC / Médecin / Addictologue
**IDEC** : Valoriser la motivation exprimée

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_006` | ORGA | 🟡 0.49 | Valoriser la motivation exprimée |

#### `M4_RECO_27` `[LEGACY]` 🟢 standard
**Reco** : Accompagner progressivement la réflexion et lever les freins identifiés.
**Acteurs** : IDEC / Médecin / Structures addictologiques
**IDEC** : Explorer les conditions et les réticences exprimées

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_013` | ORGA | 🟡 0.48 | Explorer les conditions et les réticences exprimées |

#### `M4_RECO_28` `[LEGACY]` 🟢 standard
**Reco** : Respecter le rythme du proche tout en restant vigilant.
**Acteurs** : IDEC
**IDEC** : Rester disponible et maintenir un lien

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_017` | ORGA | 🟡 0.43 | Rester disponible et maintenir un lien |

#### `M4_RECO_29` `[LEGACY]` 🟢 standard
**Reco** : Clarifier la position du proche et son niveau de motivation.
**IDEC** : Échanger avec l’aidant pour mieux comprendre la situation

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_035` | ORGA | 🟡 0.47 | Échanger avec l’aidant pour mieux comprendre la situation |

---

### M5 — Coordination des soins
> 12 recos · 15 MT

#### `M5_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Maintenir la coordination existante et rester attentif à l’évolution de la situation.
**Acteurs** : IDEC / Personne de référence
**IDEC** : Vérifier que le rôle de coordination est bien opérationnel

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_105` | INFO | 🟢 0.57 | Vérifier que le rôle de coordination est bien opérationnel |

#### `M5_RECO_02` `[LEGACY]` 🟢 standard
**Reco** : Clarifier le rôle et les missions de la personne référente.
**Acteurs** : IDEC / Personne de référence
**IDEC** : Expliquer le rôle de coordination des soins

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_102` | INFO | 🟢 0.56 | Expliquer le rôle de coordination des soins |

#### `M5_RECO_03` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place une coordination des soins structurée.
**Acteurs** : IDEC / Médecin traitant / Structure de coordination
**IDEC** : Identifier un professionnel référent

#### `M5_RECO_04` `[LEGACY]` 🟢 standard
**Reco** : Clarifier l’organisation actuelle des soins.
**IDEC** : Faire le point avec l’aidant et les professionnels

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_047` | ORGA | 🟢 0.63 | Valoriser l’organisation actuelle des soins |

#### `M5_RECO_05` `[LEGACY]` 🟢 standard
**Reco** : Maintenir le rôle central du médecin traitant dans la coordination des soins.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Confirmer le rôle de référent du médecin traitant

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_129` | MED | 🟢 0.63 | Confirmer le rôle de référent du médecin traitant |

#### `M5_RECO_06` `[LEGACY]` 🟢 standard
**Reco** : Clarifier le rôle du spécialiste et son articulation avec la médecine de ville
**Acteurs** : IDEC / Spécialiste hospitalier
**IDEC** : Identifier le champ d’intervention du spécialiste

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_132` | MED | 🟢 0.54 | Identifier le champ d’intervention du spécialiste |
| `MT_V4_093` | SEC | 🟡 0.33 | Prendre RDV avec un éducateur spécialisé du territoire (Recherche sur internet)  |

#### `M5_RECO_07` `[LEGACY]` 🟢 standard
**Reco** : S’assurer de la bonne coordination entre le spécialiste et les autres intervenants.
**Acteurs** : IDEC
**IDEC** : Vérifier la transmission des informations médicales

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_101` | INFO | 🟡 0.49 | Vérifier la transmission des informations médicales |

#### `M5_RECO_08` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place une coordination structurée avec un référent identifié.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Identifier un professionnel référent

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_002` | ORGA | 🟡 0.37 | Prendre contact avec un ergothérapeute du territoire |
| `MT_V4_049` | ORGA | 🟢 0.54 | Identifier un professionnel référent |

#### `M5_RECO_09` `[LEGACY]` 🟢 standard
**Reco** : Faire le point avec l’aidant sur les intervenants existants

#### `M5_RECO_10` `[LEGACY]` 🟢 standard
**Reco** : Maintenir l’organisation actuelle tout en restant attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Confirmer que la coordination actuelle est jugée suffisante

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_042` | ORGA | 🟢 0.54 | Confirmer que la coordination actuelle est jugée suffisante |

#### `M5_RECO_11` `[LEGACY]` 🟢 standard
**Reco** : Proposer des améliorations ciblées de la coordination existante.
**Acteurs** : IDEC
**IDEC** : Identifier les points précis où la coordination pourrait être améliorée

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_029` | ORGA | 🟢 0.56 | Valoriser la préparation et la coordination existantes |
| `MT_V4_036` | ORGA | 🟢 0.61 | Identifier les points précis où la coordination pourrait être améliorée |
| `MT_V4_041` | ORGA | 🟡 0.44 | Analyser les dysfonctionnements de l’organisation actuelle |

#### `M5_RECO_12` `[LEGACY]` 🟢 standard
**Reco** : Mettre en place une coordination renforcée et structurée.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Prioriser la coordination comme axe majeur d’intervention

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_021` | ORGA | 🟢 0.65 | Mettre en place une coordination renforcée et prioritaire |
| `MT_V4_075` | SEC | 🟢 0.56 | Prioriser la coordination comme axe majeur d’intervention |

---

### M6 — Plan de soins, évaluations et inquiétudes
> 30 recos · 29 MT

#### `M6_RECO_01` `[LEGACY]` ⚪ ?
**Reco** : Maintenir l’organisation existante et rester attentif à l’évolution des besoins.
**Acteurs** : IDEC
**IDEC** : Valoriser l’organisation actuelle des soins

#### `M6_RECO_02` `[LEGACY]` ⚪ ?
**Reco** : Apporter un soutien ponctuel pour sécuriser l’organisation des soins.
**Acteurs** : IDEC
**IDEC** : Identifier les points de complexité dans l’organisation

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_001` | ORGA | 🟢 0.55 | Identifier les points de complexité dans l’organisation |

#### `M6_RECO_03` `[LEGACY]` ⚪ ?
**Reco** : Mettre en place un accompagnement renforcé pour simplifier et coordonner les soins.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Analyser les dysfonctionnements de l’organisation actuelle

#### `M6_RECO_04` `[LEGACY]` ⚪ ?
**Reco** : Situation à risque nécessitant une réorganisation globale des soins.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Mettre en place une coordination renforcée et prioritaire

#### `M6_RECO_05` `[IA]` ⚪ ?
**Reco** : Mettre en place des actions de prévention du risque de chute.
**Acteurs** : IDEC / Médecin, IDEC / Médecin / Kinésithérapeute/Ergothérapeute
**IDEC** : Évaluer le risque de chute au domicile

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_008` | ORGA | 🟢 0.53 | Évaluer le risque de chute au domicile |

#### `M6_RECO_06` `[LEGACY]` ⚪ ?
**Reco** : Renforcer l’évaluation cognitive et le suivi adapté.
**Acteurs** : IDEC / Médecin
**IDEC** : Orienter vers une évaluation ou un suivi spécialisé

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_070` | SEC | 🟢 0.61 | Orienter vers une évaluation ou un suivi spécialisé |

#### `M6_RECO_07` `[LEGACY]` ⚪ ?
**Reco** : Sécuriser le suivi médical et anticiper les situations aiguës.
**Acteurs** : IDEC / Médecin
**IDEC** : Analyser les causes des passages aux urgences

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_128` | MED | 🟡 0.47 | Analyser les causes des passages aux urgences |

#### `M6_RECO_08` `[LEGACY]` ⚪ ?
**Reco** : Évaluer l’état nutritionnel et prévenir la dénutrition.
**Acteurs** : IDEC / Médecin / Diététicien
**IDEC** : Faire le point sur l’alimentation et l’évolution du poids

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_106` | INFO | 🟢 0.56 | Faire le point sur l’alimentation et l’évolution du poids |

#### `M6_RECO_09` `[LEGACY]` ⚪ ?
**Reco** : Anticiper l’évolution de l’autonomie et sécuriser le maintien à domicile.
**Acteurs** : IDEC / Médecin
**IDEC** : Évaluer le niveau d’autonomie

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_014` | ORGA | 🟡 0.41 | Évaluer la pertinence de chaque acteur dans le plan d'aide |
| `MT_V4_040` | ORGA | 🟢 0.50 | Évaluer le niveau d’autonomie |

#### `M6_RECO_10` `[LEGACY]` ⚪ ?
**Reco** : Identifier précisément l’inquiétude exprimée et proposer une réponse adaptée.
**Acteurs** : IDEC
**IDEC** : Échanger avec l’aidant pour préciser la préoccupation

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_043` | ORGA | 🟡 0.49 | Échanger avec l’aidant pour préciser la préoccupation |

#### `M6_RECO_11` `[LEGACY]` ⚪ ?
**Reco** : Clarifier les inquiétudes potentielles et rester attentif à l’évolution.
**Acteurs** : IDEC
**IDEC** : Proposer un temps d’échange pour explorer les craintes éventuelles

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_088` | SEC | 🟡 0.49 | Proposer un temps d’échange pour explorer les craintes éventuelles |

#### `M6_RECO_12` `[LEGACY]` ⚪ ?
**Reco** : Maintenir le plan de soins existant et rester attentif à son actualisation.
**Acteurs** : IDEC / Professionnels de santé
**IDEC** : Vérifier que le plan de soins est à jour

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_115` | INFO | 🟢 0.58 | Vérifier que le plan de soins est à jour |

#### `M6_RECO_13` `[LEGACY]` ⚪ ?
**Reco** : Clarifier et formaliser les éléments manquants du plan de soins.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Identifier les zones de flou dans la suite du parcours

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_015` | ORGA | 🟢 0.54 | Identifier les zones de flou dans la suite du parcours |
| `MT_V4_072` | SEC | 🟢 0.58 | Identifier les éléments manquants dans le suivi |

#### `M6_RECO_14` `[LEGACY]` ⚪ ?
**Reco** : Mettre en place un accompagnement renforcé pour structurer le parcours de soins.
**Acteurs** : IDEC / Médecin traitant
**IDEC** : Élaborer un plan de soins personnalisé et partagé

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_038` | ORGA | 🟡 0.47 | Élaborer un plan de soins personnalisé et partagé |

#### `M6_RECO_15` `[LEGACY]` ⚪ ?
**Reco** : Maintenir le suivi et appliquer les recommandations issues de l’évaluation.
**Acteurs** : IDEC / Médecin
**IDEC** : Vérifier les conclusions de la consultation mémoire

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_125` | MED | 🟢 0.58 | Vérifier les conclusions de la consultation mémoire |

#### `M6_RECO_16` `[LEGACY]` ⚪ ?
**Reco** : Assurer le suivi global des préconisations gériatriques.
**Acteurs** : IDEC / Médecin
**IDEC** : Vérifier la prise en compte des recommandations

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_111` | INFO | 🟢 0.58 | Vérifier la prise en compte des recommandations |

#### `M6_RECO_17` `[LEGACY]` ⚪ ?
**Reco** : Suivre les recommandations spécifiques issues de l’évaluation.
**Acteurs** : IDEC
**IDEC** : Identifier le type d’évaluation réalisée

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_020` | ORGA | 🟢 0.54 | Identifier le type d’évaluation réalisée |

#### `M6_RECO_18` `[LEGACY]` ⚪ ?
**Reco** : Évaluer l’intérêt d’une évaluation spécialisée liée à l’âge.
**Acteurs** : IDEC / Médecin
**IDEC** : Informer sur l’intérêt des évaluations gériatriques

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_108` | INFO | 🟢 0.65 | Informer sur l’intérêt des évaluations gériatriques |
| `MT_V4_112` | INFO | 🟢 0.54 | Vérifier l’avancée de l’évaluation spécialisée |
| `MT_V4_071` | SEC | 🟡 0.38 | Vérifier si un RDV est déjà prévu, sinon planifier |

#### `M6_RECO_19` `[LEGACY]` ⚪ ?
**Reco** : Poursuivre l’accompagnement et assurer le suivi des conclusions de l’évaluation.
**Acteurs** : IDEC
**IDEC** : Vérifier l’avancée et les résultats de l’évaluation

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_113` | INFO | 🟢 0.57 | Vérifier l’avancée et les résultats de l’évaluation |

#### `M6_RECO_20` `[LEGACY]` ⚪ ?
**Reco** : Sécuriser l’attente et explorer des solutions transitoires.
**Acteurs** : IDEC
**IDEC** : Vérifier la position sur la liste d’attente

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_117` | INFO | 🟡 0.48 | Vérifier la position sur la liste d’attente |

#### `M6_RECO_21` `[LEGACY]` ⚪ ?
**Reco** : Informer sur les neurodéveloppement et orienter vers une évaluation adaptée.
**Acteurs** : IDEC
**IDEC** : Informer la famille sur les dispositifs existants

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_107` | INFO | 🟡 0.40 | 1=>Informer sur les dispositifs d’accès aux soins en utilisant le document "cour |
| `MT_V4_121` | INFO | 🟢 0.53 | Informer la famille sur les dispositifs existants |

#### `M6_RECO_22` `[LEGACY]` ⚪ ?
**Reco** : Clarifier la situation et l’historique des orientations.
**Acteurs** : IDEC
**IDEC** : Faire le point avec la famille et les professionnels

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_103` | INFO | 🟢 0.56 | Faire le point avec la famille et les professionnels |
| `MT_V4_104` | INFO | 🟢 0.51 | Faire le point avec l’aidant et les professionnels |

#### `M6_RECO_23` `[LEGACY]` ⚪ ?
**Reco** : Maintenir le lien avec le médecin référent et poursuivre l’évaluation si nécessaire.
**Acteurs** : IDEC / Médecin
**IDEC** : Vérifier la continuité du suivi médical

#### `M6_RECO_24` `[LEGACY]` ⚪ ?
**Reco** : Assurer le suivi spécialisé et la mise en œuvre des recommandations.
**Acteurs** : IDEC / Neuropédiatre
**IDEC** : Vérifier l’avancée de l’évaluation spécialisée

#### `M6_RECO_25` `[LEGACY]` ⚪ ?
**Reco** : Poursuivre l’accompagnement psychique et coordonner les soins.
**Acteurs** : IDEC / Pédopsychiatre
**IDEC** : Vérifier la régularité du suivi

#### `M6_RECO_26` `[LEGACY]` ⚪ ?
**Reco** : Maintenir l’accompagnement et en évaluer les bénéfices.
**Acteurs** : IDEC / Psychologue
**IDEC** : Échanger avec la famille sur l’évolution observée

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_022` | ORGA | 🟡 0.48 | Échanger avec la famille sur l’évolution observée |

#### `M6_RECO_27` `[LEGACY]` ⚪ ?
**Reco** : Poursuivre la prise en charge et adapter les objectifs si nécessaire.
**Acteurs** : IDEC / Orthophoniste
**IDEC** : Vérifier la mise en œuvre du suivi

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_068` | SEC | 🟡 0.49 | Vérifier la mise en œuvre du suivi |

#### `M6_RECO_28` `[LEGACY]` ⚪ ?
**Reco** : Maintenir l’accompagnement fonctionnel et suivre l’évolution.
**Acteurs** : IDEC / Psychomotricien / Ergothérapeute
**IDEC** : Suivre les objectifs de prise en charge

#### `M6_RECO_29` `[LEGACY]` ⚪ ?
**Reco** : Maintenir le lien avec la structure et suivre le projet global.
**Acteurs** : IDEC / Structure spécialisée
**IDEC** : Identifier le référent au sein de la structure

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_136` | STRUC | 🟢 0.60 | Identifier le référent au sein de la structure |

#### `M6_RECO_30` `[LEGACY]` ⚪ ?
**Reco** : Mettre en place une orientation vers une évaluation adaptée.
**Acteurs** : IDEC / Médecin
**IDEC** : Informer sur les parcours d’évaluation possibles

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V4_119` | INFO | 🟢 0.54 | Informer sur les parcours d’évaluation possibles |

---

## V5 — Administrative

### A1 — Couverture santé et protections juridiques
> 4 recos · 3 MT

#### `A1_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Maintenir l’organisation actuelle tout en restant attentif à l’évolution de la situation.
**Acteurs** : IDEC
**IDEC** : Confirmer les éléments qui permettent le maintien

#### `A1_RECO_02` `[LEGACY]` 🟠 ccc
**Reco** : Anticiper les fragilités et renforcer l’accompagnement pour éviter une rupture.
**Acteurs** : IDEC /SAD
**IDEC** : Identifier les facteurs de fragilité

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V5_001` | ORGA | 🟡 0.34 | Évaluer les difficultés rencontrées avec la famille |

#### `A1_RECO_03` `[LEGACY]` 🟠 ccc
**Reco** : Anticiper et préparer une transition vers une autre solution d’hébergement.
**Acteurs** : IDEC/Service socal
**IDEC** : Informer sur les options d’hébergement adaptées

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V5_006` | SEC | 🟡 0.36 | Accompagner la constitution d’un dossier MDPH |

#### `A1_RECO_04` `[LEGACY]` 🟠 ccc
**Reco** : Favoriser la réflexion et l’anticipation du projet de vie.
**IDEC** : Proposer un temps d’échange pour clarifier les perspectives

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V5_005` | INFO | 🟡 0.36 | Informer la famille sur les démarches possibles |

---

### A2 — Droits, aides et évaluation dépendance
> 1 recos · 0 MT

#### `A2_RECO_01` `[LEGACY]` 🟠 ccc
**Reco** : Demandez le financement de la perte d'autonomie via l'APA.
**Acteurs** : Conseil départemental
**IDEC** : Variable selon les départements (demande papier ou numérique).                                                          

---

### A3 — Charge et complexité des démarches
> 1 recos · 0 MT

#### `A3_RECO_01` `[LEGACY]` 🟢 standard
**Reco** : Anticipez et renseignez vous sur les différentes protections juridiques possibles.
**Acteurs** : Assistante sociale
**IDEC** : Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'IDEC)  pour faire une demande de protecti

---

### A4 — Situation scolaire/professionnelle et budget
> 3 recos · 3 MT

#### `A4_RECO_01` `[LEGACY]` ⚪ ?
**Reco** : Demandez à être guider dans vos démarches et à accéder aux aides et ressources disponibles pour alléger votre rôle d'aidant.

#### `A4_RECO_02` `[LEGACY]` ⚪ ?
**Reco** : Contacter une assistante sociale afin de faire le point sur les aides auxquelles vous ou vos proches pouvez éventuellement être éligibles.
**Acteurs** : Assistante sociale
**IDEC** : Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'IDEC)

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V5_002` | INFO | 🟡 0.46 | Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'I |
| `MT_V5_003` | INFO | 🟡 0.46 | Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'I |

#### `A4_RECO_03` `[LEGACY]` ⚪ ?
**Reco** : Accèdez à des financements complémentaires.
**Acteurs** : Mutuelle
**IDEC** : Informer l’aidant sur les possibilités de financement via la mutuelle

| MT | Type | Score | Libellé |
|---|---|---|---|
| `MT_V5_004` | INFO | 🟢 0.61 | Informer l’aidant sur les possibilités de financement via la mutuelle |

---
