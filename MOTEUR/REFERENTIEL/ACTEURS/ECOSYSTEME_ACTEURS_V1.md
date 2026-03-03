# 🌐 Écosystème Acteurs — V1 Social & Relationnel

> **Source DB** : 56 MT × 4 MP (R1-R4) — Supabase `mbxeqrvofrmhqlwlefff`  
> **Source référentiel** : `ACTEURS_CAT_EXHAUSTIF.md` — 60 acteurs canoniques  
> **Date** : 16/02/2026  
> **Principe** : L'aidant est **full autonome** sur chaque tâche (K7). Les acteurs listés ici représentent l'**écosystème** autour de la MT — les professionnels, structures ou personnes vers qui l'aidant peut se tourner ou qui sont impliqués dans l'action.

---

## Acteurs V1 — Vue d'ensemble

D'après le référentiel CAT et l'analyse des contenus MT, **22 acteurs** interviennent dans l'écosystème V1 :

| # | Acteur | Catégorie | MPs concernés | Rôle dans V1 |
|---|---|---|---|---|
| 1 | **IDEC** | Coordination | R1, R2, R3, R4 | Coordinateur principal, accompagne l'aidant dans chaque démarche |
| 2 | **Médecin traitant** | Médecin généraliste | R1, R3 | Prescription soutien psy, surveillance humeur du proche |
| 3 | **Psychologue** | Paramédical | R1, R4 | Soutien psychologique de l'aidant face au changement |
| 4 | **Assistante sociale** | Travailleur social | R1 | Droits des aidants, aménagement vie professionnelle |
| 5 | **SAD** (Service d'Aide à Domicile) | Service à domicile | R2, R4 | Relais au domicile, aide quotidienne |
| 6 | **Auxiliaire de vie** | Service à domicile | R2, R4 | Intervenant SAD — aide aux actes de la vie quotidienne |
| 7 | **Plateforme de répit** | Structure de répit | R1, R2 | Accueil temporaire, baluchonnage, répit de l'aidant |
| 8 | **Structures de soutien aux aidants** | Structure de répit | R1, R2, R4 | Groupes de parole, cafés aidants, associations |
| 9 | **Infirmière libérale (IDEL)** | Paramédical | R3 | Surveillance humeur et traitement du proche à domicile |
| 10 | **SSIAD** | Service à domicile | R3 | Service de Soins Infirmiers À Domicile — soins de nursing |
| 11 | **Aide-soignant** | Paramédical | R2, R3 | Intervenant SSIAD/SAD — toilette, repas, mobilisation |
| 12 | **Médiateur** | Autre | R4 | Médiation familiale en cas de conflits |
| 13 | **Accueil de jour** | Structure | R2, R3 | Stimulation sociale du proche, répit de l'aidant |
| 14 | **Hébergement temporaire** | Structure | R2 | Répit prolongé pour l'aidant |
| 15 | **CPAM** | Institution | R1 | Congé proche aidant (AJPA), droits transport |
| 16 | **Médecin du travail** | Médecin spécialisé | R1 | Aménagement poste de travail, mi-temps thérapeutique |
| 17 | **CCAS** | Institution locale | R1, R2 | Aide de proximité, orientation services locaux |
| 18 | **Conseil départemental** | Institution | R2 | APA (condition d'accès au répit), évaluation GIR |
| 19 | **Mutuelle** | Organisme privé | R1 | Prise en charge complémentaire consultations psy |
| 20 | **Pompiers / SAMU** | Service d'urgence | R3, R4 | Urgences — malaise du proche en situation d'isolement |
| 21 | **Associations** (France Alzheimer, etc.) | Tissu associatif | R3, R4 | Information maladie, groupes de parole, activités |
| 22 | **Aidant** | Non-professionnel | R1-R4 | Acteur central — exécute toutes les tâches en autonomie |

---

## MP R1 — Impact sur la vie personnelle et professionnelle

**🏆 ASR** : L'aidant a identifié et mis en place des solutions d'aménagement pour préserver sa vie personnelle et professionnelle.

### Catégorie R1_CAT_01 — Accompagnement social (AS)

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_032 | Évaluer l'impact professionnel | ORGA | 💡 | **Aidant** (auto-évaluation) |
| MT_V1_033 | Informer sur les droits des aidants | INFO | 💡 | **Assistante sociale**, **CPAM** — congé proche aidant, AJPA, droit au répit |
| MT_V1_034 | Proposer des solutions d'aménagement | STRUC | 📍 | **Assistante sociale**, **Médecin du travail** — pistes d'aménagement quotidien/professionnel |
| MT_V1_035 | Faciliter la prise de contact avec l'AS | SEC | 📍 | **Assistante sociale** — contact direct du secteur |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V1_R1_PREV_01 | Sensibiliser aux signes d'impact | INFO | **Aidant** (auto-observation) |
| MT_V1_R1_PREV_02 | Noter les changements de vie | ORGA | **Aidant** (auto-observation) |

> **Questions déclenchantes** : N7 (situation professionnelle — aménagement/congés/arrêt), O27 (impact familial), O28 (impact social)  
> **Sens clinique** : Plus l'impact professionnel est sévère, plus l'AS et le médecin du travail deviennent nécessaires. Un arrêt professionnel (N7=Arrêt) est critique.

---

### Catégorie R1_CAT_02 — Répit et relais

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_030 | Orienter vers des solutions de répit | INFO | 💡 | **Plateforme de répit**, **SAD**, **Accueil de jour**, **Hébergement temporaire** |
| MT_V1_036 | Identifier la plateforme de répit du territoire | STRUC | 📍 | **Plateforme de répit** — vérifier conditions d'accès |
| MT_V1_037 | Organiser un premier contact avec la plateforme | SEC | 📍 | **Plateforme de répit** — premier échange |

> **Questions déclenchantes** : O27 (impact familial), O28 (impact social), N7+O27+O28 (triple effondrement)  
> **Sens clinique** : Le répit devient urgent quand toutes les sphères sont impactées. La plateforme de répit est le pivot : elle oriente vers accueil de jour, baluchonnage, hébergement temporaire.

---

### Catégorie R1_CAT_03 — Soutien psychologique

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_029 | Proposer un soutien psychologique | SEC | 📍 | **Médecin traitant** (évaluation / prescription), **Psychologue** (si orienté) |
| MT_V1_027 | Rester attentif aux signaux de dégradation | ORGA | 💡 | **Aidant** (auto-vigilance), **IDEC** (si suivi en place) |
| MT_V1_028 | Identifier les domaines les plus impactés | ORGA | 💡 | **Aidant** (auto-évaluation) |
| MT_V1_031 | Identifier les activités les plus impactées | ORGA | 💡 | **Aidant** (auto-évaluation) |

> **Questions déclenchantes** : O27+O28 (double impact → CCC), N7=Arrêt+O27+O28 (triple → critique)  
> **Sens clinique** : Quand toutes les sphères sont touchées, le MT prescrit un soutien psy. L'aidant commence par l'auto-évaluation, puis se tourne vers le MT.

---

## MP R2 — Soutien de l'entourage et partage de l'aide

**🏆 ASR** : L'aidant a mobilisé du soutien et bénéficie de relais pour éviter l'isolement.

### Catégorie R2_CAT_01 — Mobilisation du réseau d'aide

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_001 | Lister les personnes mobilisables | ORGA | 💡 | **Aidant** (cartographie de son entourage) |
| MT_V1_002 | Explorer les freins à une meilleure répartition | ORGA | 💡 | **Aidant** (réflexion personnelle) |
| MT_V1_006 | Identifier d'autres personnes mobilisables | ORGA | 💡 | **Aidant** (voisins, amis, anciens collègues) |
| MT_V1_005 | Orienter vers des groupes d'entraide | INFO | 💡 | **Structures de soutien aux aidants** — groupes de parole, cafés aidants, **Associations** |
| MT_V1_004 | Proposer un accompagnement pour solliciter de l'aide | SEC | 📍 | **IDEC** (accompagnement dans la démarche), **Structures de soutien aux aidants** |
| MT_V1_042 | Faciliter une réunion familiale de répartition | STRUC | 📍 | **Médiateur** (si besoin structuré), **Aidant** (initiative familiale) |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V1_R2_PREV_01 | Maintenir le lien avec l'entourage aidant | INFO | **Aidant** (échanges réguliers avec les proches) |
| MT_V1_R2_PREV_02 | Anticiper les changements d'organisation | ORGA | **Aidant** (préparation aux évolutions du réseau d'aide) |

> **Questions déclenchantes** : N4 (seul dans la famille), E1 (répartition de l'aide), E2 (filet de sécurité)  
> **Sens clinique** : L'isolement structurel (N4=Oui + E2=Personne) est critique. La mobilisation commence par l'entourage informel, puis les structures professionnelles.

---

### Catégorie R2_CAT_02 — Accès au répit et aux relais professionnels

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_003 | Évaluer les aides disponibles | INFO | 💡 | **SAD**, **Plateforme de répit**, **Accueil de jour**, **IDEC** (inventaire territorial) |
| MT_V1_007 | Informer sur les solutions de répit | INFO | 💡 | **Plateforme de répit**, **Accueil de jour**, **Hébergement temporaire**, **SAD** (baluchonnage) |
| MT_V1_010 | Orienter vers des dispositifs d'aide aux aidants | INFO | 💡 | **Structures de soutien aux aidants**, **Associations**, **Plateforme de répit** |
| MT_V1_011 | Envisager un accueil temporaire pour le proche | STRUC | 📍 | **Hébergement temporaire**, **Accueil de jour** — évaluer faisabilité |
| MT_V1_025 | Proposer des solutions de répit | STRUC | 📍 | **Plateforme de répit** (orientation), **SAD** (relais domicile), **Accueil de jour**, **Hébergement temporaire** |

> **Questions déclenchantes** : E1 (charge déséquilibrée créant des tensions), E2 (absence de filet), N4+E1+E2 (triple isolement)  
> **Sens clinique** : Quand l'entourage seul ne suffit pas → les relais professionnels (SAD, plateforme) prennent le relais. Le triple isolement (E1 seul + E2 personne + N4 seul famille) déclenche une mobilisation immédiate.

---

### Catégorie R2_CAT_03 — Prévention de l'isolement et du surmenage

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_008 | Évaluer l'urgence de la situation d'isolement | ORGA | 💡 | **Aidant** (auto-évaluation du sentiment d'isolement) |
| MT_V1_024 | Évaluer les possibilités de mobilisation | ORGA | 💡 | **Aidant** (identifier les pistes inexploitées) |
| MT_V1_009 | Proposer un contact régulier avec un professionnel | SEC | 📍 | **IDEC** (suivi régulier référent), **Psychologue** (si souffrance), **Structures de soutien aux aidants** (cafés aidants) |

> **Questions déclenchantes** : E3 (multi-aidance/parentalité), N4 (seul dans la famille), E1+E2+N4 (triple isolement)  
> **Sens clinique** : La multi-aidance (E3≠Aucun) combinée à l'isolement familial (N4=Oui) est un facteur aggravant majeur. Le contact professionnel régulier est le filet de sécurité minimum.

---

## MP R3 — Isolement social de la personne aidée

**🏆 ASR** : Le proche aidé maintient un lien social régulier et des activités adaptées.

### Catégorie R3_CAT_01 — Surveillance du lien social

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_039 | Identifier les situations problématiques | ORGA | 💡 | **Aidant** (observation du proche — repli, refus de contact) |
| MT_V1_043 | Contacter le MT pour surveillance humeur/traitement | SEC | 📍 | **Médecin traitant** (prescription), **Infirmière libérale / IDEL** (passage domicile surveillance humeur) |
| MT_V1_044 | Évaluer la fréquence de contact et qualité du lien | ORGA | 💡 | **Aidant** (auto-évaluation de la relation) |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V1_R3_PREV_01 | Sensibiliser à l'isolement progressif | INFO | **Aidant** (veille sur les interactions sociales du proche) |
| MT_V1_R3_PREV_02 | Observer les signaux de repli | ORGA | **Aidant** (surveillance refus de sortir, baisse d'humeur, perte d'intérêt) |

> **Questions déclenchantes** : N20 (difficultés relationnelles du proche), O48 (fréquence des visites), O47 (distance géographique)  
> **Sens clinique** : Difficultés relationnelles confirmées (N20=Oui) + visites rares (O48≤1×/mois) + éloignement (O47>1h30) = isolement sévère. Le MT prescrit un passage IDEL pour la surveillance.

---

### Catégorie R3_CAT_02 — Maintien des activités sociales

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_040 | Proposer des activités adaptées | STRUC | 📍 | **Accueil de jour**, **Associations**, **Structures de soutien aux aidants** |
| MT_V1_041 | Évaluer l'intérêt d'un accueil de jour | ORGA | 💡 | **Accueil de jour** — lien social et activités stimulantes |
| MT_V1_045 | Identifier les activités sociales sur le territoire | INFO | 💡 | **Accueil de jour**, **Associations**, collectivités locales |

> **Questions déclenchantes** : N20 (difficultés relationnelles), O48 (visites ≤1×/mois)  
> **Sens clinique** : Les activités sociales sont un relais indispensable quand l'aidant ne peut pas être présent. L'accueil de jour est le pivot : il offre stimulation sociale + répit pour l'aidant.

---

## MP R4 — Relation aidant / proche et acceptation de l'aide

**🏆 ASR** : Les tensions sont apaisées et un cadre d'aide accepté est en place.

### Catégorie R4_CAT_01 — Médiation et apaisement des tensions

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_012 | Échanger sur les sources de tension | ORGA | 💡 | **Aidant** (expression des tensions ressenties) |
| MT_V1_015 | Identifier les tensions récurrentes | ORGA | 💡 | **Aidant** (analyse des contextes de conflit) |
| MT_V1_014 | Informer groupes de parole / soutien familial | INFO | 💡 | **Structures de soutien aux aidants** — groupes de parole, cafés aidants |
| MT_V1_016 | Proposer un entretien de médiation | STRUC | 📍 | **Médiateur** (médiation familiale structurée), **IDEC** (si pas de médiateur disponible) |
| MT_V1_019 | Temps d'échange aidant/proche | SEC | 📍 | **Médiateur** ou **Psychologue** (tiers professionnel encadrant), **Aidant** |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V1_R4_PREV_01 | Maintenir la communication avec le proche | INFO | **Aidant** (échanges réguliers sur les envies/besoins) |
| MT_V1_R4_PREV_02 | Anticiper les changements relationnels | ORGA | **Aidant** (préparation aux évolutions liées à la maladie) |
| MT_V1_R4_PREV_03 | Prévenir l'usure relationnelle | ORGA | **Aidant** (autosurveillance : irritabilité, distanciation) |

> **Questions déclenchantes** : O30 (sentiment de ne plus reconnaître le proche), E4 (relation plus tendue), E5 (tensions dans la famille), E6 (refus d'aide extérieure), E1 (charge déséquilibrée)  
> **Sens clinique** : O30+E4 = perte de reconnaissance + relation dégradée = CCC. E6=refus total = critique. Le médiateur est l'acteur clé quand les tensions sont installées.

---

### Catégorie R4_CAT_02 — Facilitation de l'acceptation de l'aide

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_018 | Comprendre freins acceptation aide | ORGA | 💡 | **Aidant** (exploration avec le proche) |
| MT_V1_020 | Explorer causes profondes du refus | ORGA | 💡 | **Aidant** (peur de l'étranger, dépossession, déni, honte) |
| MT_V1_022 | Informer types d'aides et modalités | INFO | 💡 | **SAD**, **Accueil de jour** (portage repas, téléassistance, aide à la personne) |
| MT_V1_021 | Approche progressive aide | SEC | 📍 | **SAD** (1h/semaine, tâche spécifique), **IDEC** (accompagnement de la mise en place progressive) |
| MT_V1_023 | Mise en relation avec un intervenant | SEC | 📍 | **SAD** (premier contact sans engagement), **IDEC** (organisation de la rencontre) |

> **Questions déclenchantes** : E6 (acceptation de l'aide), O31 (anxiété face à l'avenir), O30+O31+E4 (triple signal de rupture)  
> **Sens clinique** : Le refus total d'aide (E6=Non refuse) est critique. L'approche progressive (1h/semaine) est la stratégie de première intention. Le SAD est l'acteur pivot de cette catégorie.

---

### Catégorie R4_CAT_03 — Soutien psychologique face au changement

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V1_046 | Échanges sur changements observés | ORGA | 💡 | **Aidant** (observation comportement, humeur, personnalité du proche) |
| MT_V1_047 | Informer maladie et évolution | INFO | 💡 | **Médecin traitant** (explication des changements liés à la maladie), **Associations** (France Alzheimer, etc.) |
| MT_V1_038 | Orienter groupes de parole aidants | INFO | 💡 | **Structures de soutien aux aidants** — France Alzheimer, associations locales |
| MT_V1_017 | Dispositifs soutien/médiation | INFO | 💡 | **Structures de soutien aux aidants**, **Plateforme de répit** (ligne d'écoute) |
| MT_V1_013 | Accompagnement psychologique | SEC | 📍 | **Psychologue** — évaluation et accompagnement |
| MT_V1_048 | Soutien psychologique adapté | SEC | 📍 | **Psychologue** — suivi régulier adapté au vécu de l'aidant |

> **Questions déclenchantes** : O30+E4 (CCC — deuil de la personne d'avant), O30+O31+E4 (critique — triple signal de rupture)  
> **Sens clinique** : Le changement de personnalité du proche (O30) combiné à la dégradation relationnelle (E4) déclenche le soutien psy. Le psychologue est l'acteur central de cette catégorie.

---

## Matrice de couverture — Acteurs × MP

| Acteur | R1 | R2 | R3 | R4 | Nb MT |
|---|---|---|---|---|---|
| **Aidant** (autonome) | ✅ auto-éval | ✅ réseau / réflexion | ✅ observation proche | ✅ exploration / observation | 56 (toutes) |
| **IDEC** | ✅ coordination | ✅ accompagnement | ✅ inventaire territorial | ✅ médiation | support sur ~30 MT |
| **Assistante sociale** | ✅ droits, aménagement | — | — | — | 3 MT |
| **Médecin traitant** | ✅ prescription psy | — | ✅ prescription IDEL | ✅ info maladie | 3 MT |
| **Psychologue** | ✅ soutien (via MT) | ✅ si souffrance | — | ✅ accompagnement central | 4 MT |
| **Plateforme de répit** | ✅ pivot répit | ✅ orientation | — | ✅ ligne d'écoute | 5 MT |
| **SAD** | — | ✅ relais domicile | — | ✅ aide progressive | 5 MT |
| **Auxiliaire de vie** | — | ✅ intervenant SAD | — | ✅ aide quotidienne | 3 MT |
| **Infirmière libérale / IDEL** | — | — | ✅ surveillance domicile | — | 1 MT |
| **SSIAD** | — | — | ✅ soins nursing | — | 1 MT |
| **Aide-soignant** | — | ✅ relais | ✅ soins quotidiens | — | 2 MT |
| **Accueil de jour** | — | ✅ répit aidant | ✅ stimulation sociale | ✅ info types d'aide | 4 MT |
| **Hébergement temporaire** | — | ✅ répit prolongé | — | — | 2 MT |
| **Structures soutien aidants** | — | ✅ groupes entraide | — | ✅ groupes de parole | 5 MT |
| **Médiateur** | — | ✅ réunion familiale | — | ✅ médiation structurée | 2 MT |
| **Associations** | — | ✅ dispositifs | ✅ activités territoire | ✅ France Alzheimer | 3 MT |
| **Médecin du travail** | ✅ aménagement pro | — | — | — | 1 MT |
| **CPAM** | ✅ droits (AJPA) | — | — | — | 1 MT |
| **CCAS** | ✅ aide proximité | ✅ orientation | — | — | 2 MT |
| **Conseil départemental** | — | ✅ APA (répit) | — | — | 1 MT |
| **Mutuelle** | ✅ prise charge psy | — | — | — | 1 MT |
| **Pompiers / SAMU** | — | — | ✅ urgence proche | ✅ urgence | 1 MT |

---

## Spécificité V1 — L'écosystème social & relationnel

> **22 acteurs** identifiés dans l'écosystème V1 après audit contre le référentiel CAT (60 acteurs). V1 est dominé par les acteurs de répit (plateforme, SAD, accueil de jour, hébergement temporaire) et de soutien psycho-social (psychologue, structures soutien aidants, médiateur). L'aidant reste **full autonome** (K7) — tous ces acteurs sont mobilisables par lui, pas imposés.
