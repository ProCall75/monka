# 📄 TEMPLATE B — Recommandations & Variations — V1 Social & Relationnel

> **Vulnérabilité** : V1 — Social & Relationnel
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées
> **Règles KERNEL** : K1, K3, K4, K5, K6, K7, K8, K10
> **Dépendance** : Template A (niveaux d'activation)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V1 — Social & Relationnel |
| Nombre de MP | 4 |
| Nombre total de recos | 7 |
| Recos legacy | 7 (100%) |
| Recos proposées IA | 0 |

---

## MP R1 — Impact sur la vie personnelle et professionnelle

> **ASR** : « Mesurer l'impact de l'aidance sur votre vie et ajuster »

### Vue d'ensemble des recos de ce MP

| # | Reco ID | Libellé court | Niveau | Règle source | Source |
|---|---|---|---|---|---|
| 1 | R1_RECO_01 | Contacter assistante sociale | 🟠 CCC | V1_R1_CCC_02 | Legacy ✅ |
| 2 | R1_RECO_02 | Plateforme de répit | 🟠 CCC | V1_R1_CCC_01 | Legacy ✅ |
| 3 | R1_RECO_03 | Discuter avec médecin traitant | 🟠 CCC | V1_R1_CCC_01 | Legacy ✅ |

---

### RECO R1_RECO_01 — Contacter une assistante sociale

**Niveau** : 🟠 CCC | **Déclenchée par** : V1_R1_CCC_02 | **Source** : Legacy ✅

#### Texte utilisateur
> Contacter une assistante sociale

#### Texte IDEC
> Rappeler à l'aidant de contacter L'AS (c'est l'aidant qui contacte l'AS, pas L'IDEC)

#### Acteurs : Assistante sociale

---

### RECO R1_RECO_02 — Plateforme de répit

**Niveau** : 🟠 CCC | **Déclenchée par** : V1_R1_CCC_01 | **Source** : Legacy ✅

#### Texte utilisateur
> Contactez la plateforme de répit de votre territoire

#### Texte IDEC
> Orienter l'aidant vers la plateforme de répit du territoire. Faciliter la première prise de contact.

#### Acteurs : IDEC / Plateforme de répit

---

### RECO R1_RECO_03 — Médecin traitant + soutien psychologique

**Niveau** : 🟠 CCC | **Déclenchée par** : V1_R1_CCC_01 | **Source** : Legacy ✅

#### Texte utilisateur
> Discutez des difficultés d'être aidant avec votre médecin traitant

#### Texte IDEC
> Contacter le médecin traitant pour prescription de soutien psycholoque

#### Acteurs : Médecin traitant

#### Micro-Tâches référencées (détaillées dans Template C)

**📍 Actions de sécurisation** (contributives → ASR) :

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_029 | Proposer un soutien psychologique | SEC |
| MT_V1_034 | Proposer des solutions d'aménagement | STRUC |

**💡 Actions d'amélioration** (non-contributives) :

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_027 | Rester attentif aux signaux de dégradation | ORGA |
| MT_V1_028 | Identifier les domaines les plus impactés | ORGA |
| MT_V1_030 | Orienter vers des solutions de répit | INFO |
| MT_V1_031 | Identifier les activités les plus impactées | ORGA |
| MT_V1_032 | Évaluer l'impact professionnel | ORGA |
| MT_V1_033 | Informer sur les droits des aidants | INFO |

---

## MP R2 — Soutien de l'entourage et partage de l'aide

> **ASR** : « Renforcer le soutien autour de vous »

### Vue d'ensemble

| # | Reco ID | Libellé court | Niveau | Règle source | Source |
|---|---|---|---|---|---|
| 1 | R2_RECO_01 | Accompagnement renforcé + aides extérieures | 🟠 CCC | V1_R2_CCC_02 | Legacy ✅ |
| 2 | R2_RECO_02 | Prévention épuisement | 🟢 Standard | V1_R2_STD_01 | Legacy ✅ |

---

### RECO R2_RECO_01 — Accompagnement renforcé

**Niveau** : 🟠 CCC | **Déclenchée par** : V1_R2_CCC_02 | **Source** : Legacy ✅

#### Texte utilisateur
> Mettre en place un accompagnement renforcé et mobiliser des aides extérieures.

#### Texte IDEC
> Identifier et contacter des services d'aide ou de répit adaptés

#### Acteurs : IDEC / Plateforme de répit / SAD

#### MT contributives (📍)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_004 | Proposer un accompagnement pour solliciter de l'aide | SEC |
| MT_V1_009 | Proposer un contact régulier avec un professionnel | SEC |
| MT_V1_011 | Envisager un accueil temporaire pour le proche | STRUC |

#### MT non-contributives (💡)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_001 | Lister les personnes de l'entourage mobilisables | ORGA |
| MT_V1_002 | Explorer les freins à une meilleure répartition | ORGA |
| MT_V1_003 | Évaluer les aides disponibles (services, associations) | INFO |
| MT_V1_005 | Orienter vers des groupes d'entraide | INFO |
| MT_V1_006 | Identifier d'autres personnes potentiellement mobilisables | ORGA |
| MT_V1_007 | Informer sur les solutions de répit | INFO |
| MT_V1_008 | Évaluer l'urgence de la situation d'isolement | ORGA |
| MT_V1_010 | Orienter vers des dispositifs d'aide aux aidants | INFO |

---

### RECO R2_RECO_02 — Prévention épuisement

**Niveau** : 🟢 Standard | **Déclenchée par** : V1_R2_STD_01 | **Source** : Legacy ✅

#### Texte utilisateur
> Identifier des solutions de soutien pour prévenir l'épuisement de l'aidant.

#### Texte IDEC
> Évaluer la charge d'aide globale auprès de l'aidant

#### Acteurs : IDEC, structure de répit

#### MT contributives (📍)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_025 | Proposer des solutions de répit | STRUC |

#### MT non-contributives (💡)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_024 | Évaluer les possibilités de mobilisation d'autres membres | ORGA |
| MT_V1_026 | Orienter vers des associations d'aide aux aidants | INFO |

---

## MP R3 — Isolement social de la personne aidée

> **ASR** : « Limiter l'isolement du proche et maintenir un lien social adapté »

### Vue d'ensemble

| # | Reco ID | Libellé court | Niveau | Règle source | Source |
|---|---|---|---|---|---|
| 1 | R3_RECO_01 | Médecin traitant + surveillance | 🟠 CCC | V1_R3_CCC_01 | Legacy ✅ |

---

### RECO R3_RECO_01 — Surveillance et activités adaptées

**Niveau** : 🟠 CCC | **Déclenchée par** : V1_R3_CCC_01 | **Source** : Legacy ✅

#### Texte utilisateur
> Contacter son médecin traitant — Demandez la surveillance de l'humeur et de la prise de traitement

#### Texte IDEC
> Contacter le médecin traitant pour : Demander la prescription pour le passage d'IDEL pour surveillance et prise de traitement

#### Acteurs : Médecin traitant

#### MT contributives (📍)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_040 | Proposer des activités adaptées | STRUC |

#### MT non-contributives (💡)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_039 | Identifier les situations problématiques | ORGA |
| MT_V1_041 | Évaluer l'intérêt d'un accueil de jour | ORGA |

---

## MP R4 — Relation aidant / proche et acceptation de l'aide

> **ASR** : « Améliorer la relation et faciliter l'acceptation de l'aide »

### Vue d'ensemble

| # | Reco ID | Libellé court | Niveau | Règle source | Source |
|---|---|---|---|---|---|
| 1 | R4_RECO_01 | Médiation et accompagnement familial | 🟠 CCC | V1_R4_CCC_02 | Legacy ✅ |

---

### RECO R4_RECO_01 — Médiation familiale

**Niveau** : 🟠 CCC | **Déclenchée par** : V1_R4_CCC_02 | **Source** : Legacy ✅

#### Texte utilisateur
> Se rapprocher du professionnel référent (IDEC ou médecin traitant) si besoin, envisager une médiation familiale.

#### Texte IDEC
> Proposer un entretien de médiation ou d'accompagnement familial

#### Acteurs : IDEC / Médecin traitant / Médiateur

#### MT contributives (📍)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_013 | Proposer un accompagnement psychologique si besoin | SEC |
| MT_V1_019 | Proposer un temps d'échange avec le proche et l'aidant | SEC |
| MT_V1_021 | Proposer une approche progressive | SEC |
| MT_V1_023 | Proposer une première mise en relation avec un intervenant | SEC |
| MT_V1_036 | Proposer un soutien psychologique | SEC |
| MT_V1_016 | Proposer un entretien de médiation | STRUC |

#### MT non-contributives (💡)

| MT_ID | Libellé | Type |
|---|---|---|
| MT_V1_012 | Échanger sur les sources de tension identifiées | ORGA |
| MT_V1_014 | Informer sur les groupes de parole | INFO |
| MT_V1_015 | Identifier les points de tension récurrents | ORGA |
| MT_V1_017 | Orienter vers des dispositifs de soutien ou médiation adaptés | INFO |
| MT_V1_018 | Comprendre les freins à l'acceptation de l'aide | ORGA |
| MT_V1_020 | Explorer les causes du refus | ORGA |
| MT_V1_022 | Informer sur les types d'aides existantes | INFO |
| MT_V1_035 | Échanger sur les changements observés | ORGA |
| MT_V1_037 | Informer sur la maladie et son évolution | INFO |
| MT_V1_038 | Orienter vers des groupes de parole | INFO |

---

> ✅ **100% des recos V1 sont legacy** — aucune proposition IA dans ce template.
