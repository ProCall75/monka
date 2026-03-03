# 🌐 Écosystème Acteurs — V5 Parcours Médical du Proche

> **Source DB** : 145 MT × 6 MP (M1-M6) — Supabase `mbxeqrvofrmhqlwlefff`  
> **Source référentiel** : `ACTEURS_CAT_EXHAUSTIF.md` — 60 acteurs canoniques  
> **Date** : 17/02/2026  
> **Principe** : Aidant **full autonome** (K7). Les acteurs = écosystème mobilisable.

---

## Acteurs V5 — Vue d'ensemble

V5 est la vulnérabilité la **plus volumineuse** en MT (145) et la plus **médicale côté parcours du proche**. C'est le pilotage du parcours médical, la coordination des soins, et la gestion des crises médicales. L'IDEC est très présent car la coordination est au cœur de V5.

| # | Acteur | Catégorie | MPs concernés | Rôle dans V5 |
|---|---|---|---|---|
| 1 | **IDEC** | Coordination | M1-M6 | Pivot central — coordination, suivi, pilotage parcours, synthèse |
| 2 | **Médecin traitant** | Médecin généraliste | M1, M3, M4, M5, M6 | Pilote du parcours, référent médical, ALD, validation plan de crise |
| 3 | **Aidant** | Non-professionnel | M1-M6 | Acteur autonome — observateur, exécutant |
| 4 | **Médecin spécialiste** (selon pathologie) | Spécialiste | M1, M2, M5 | Second avis, suivi spécialisé, dispatch paramétrique |
| 5 | **Psychologue** | Paramédical | M4 | Soutien psychologique, suivi post-hospitalisation psy |
| 6 | **Psychiatre** | Spécialiste | M4 | Suivi psychiatrique, plan de crise |
| 7 | **Addictologue / CSAPA** | Spécialiste + structure | M4 | Suivi addictologique, groupes de parole |
| 8 | **Centre de référence** | Structure hospitalière | M1 | Second avis pour errance diagnostique |
| 9 | **DAC** (Dispositif d'Aide à la Coordination) | Institution | M5 | Coordination territoriale des soins |
| 10 | **CPTS** | Institution | M5 | Communauté Professionnelle Territoriale Santé |
| 11 | **Service hospitalier** | Structure | M3, M4 | Suivi post-hospitalisation, urgences |
| 12 | **HAD** | Service | M3 | Hospitalisation à domicile |
| 13 | **IDEL** (Infirmière libérale) | Paramédical | M4 | Suivi infirmier post-hospitalisation |
| 14 | **Ergothérapeute** | Paramédical | M6 | Évaluation adaptation domicile |
| 15 | **Gériatre** | Spécialiste | M6 | Consultation gériatrique longue, bilan |
| 16 | **Neuropédiatre** | Spécialiste | M6 | Avis TND (Troubles Neuro-Développement) |
| 17 | **Consultation mémoire** | Service spécialisé | M6 | Dépistage troubles cognitifs |
| 18 | **Programme ETP** | Dispositif | M2 | Éducation Thérapeutique du Patient |
| 19 | **Transport sanitaire** (VSL, ambulance) | Service | M2 | Accès aux soins (éloignement géographique) |
| 20 | **Téléassistance/Téléconsultation** | Dispositif technique | M2 | Alternatives accès soins à distance |
| 21 | **Structures TND** (CAMSP, CMP-I, PCO) | Structures spécialisées | M6 | Évaluation neurodéveloppement enfant |
| 22 | **Groupes de parole** | Structures de soutien | M4 | Soutien entre pairs (addiction/psy) |
| 23 | **Nutritionniste** | Spécialiste | M6 | Bilan nutritionnel (évolution poids) |
| 24 | **PDS** (Professionnel De Santé — générique) | Médical | M1, M2, M3, M4 | Consultation, suivi, observance traitement |
| 25 | **SSIAD** | Service à domicile | M3 | Soins infirmiers à domicile post-hospitalisation |
| 26 | **Auxiliaire de vie** | Service à domicile | M3, M6 | Relais domicile pendant soins/consultations |
| 27 | **Aide-soignant** | Paramédical | M3 | Intervenant SSIAD — nursing, toilette |
| 28 | **Mutuelle** | Organisme privé | M2 | Restes à charge soins, dépassements d'honoraires |
| 29 | **Pompiers / SAMU** | Service d'urgence | M3 | Urgences médicales (crises, chutes, malaises) |
| 30 | **Urgences hospitalières** | Service hospitalier | M3, M4 | Passage aux urgences (répétition = signal) |
| 31 | **Plateforme de répit** | Structure de répit | M2, M3 | Garde relais pendant consultations/hospitalisations |
| 32 | **Centre d'imagerie** | Structure de soins | M6 | Imagerie diagnostique (scanner, IRM, radio) |

---

## MP M1 — Compréhension du diagnostic et de la maladie

**🏆 ASR** : L'aidant comprend le diagnostic et le parcours médical est cohérent.

### Catégorie M1_CAT_01 — Compréhension du diagnostic

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M1_023 | Identifier les points incompris | ORGA | **Aidant** (auto-identification) |
| MT_V5_M1_003 | Identifier zones d'incertitude | ORGA | **Aidant** (doutes) |
| MT_V5_M1_034 | Valoriser compréhension de l'aidant | ORGA | **IDEC** (valorisation) |
| MT_V5_M1_074 | Temps d'échange dédié | SEC | **IDEC** (échange structuré) |
| MT_V5_M1_124 | Consultation médicale explicative | MED | **MT / Spécialiste** (explication diagnostic) |
| MT_V5_M1_131 | Dossier ALD 100% | MED | **Médecin traitant** (dossier ALD), **CPAM** (reconnaissance ALD) |

### Catégorie M1_CAT_02 — Errance diagnostique et cohérence médicale

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M1_028 | Confirmer parcours perçu comme clair | ORGA | **IDEC** |
| MT_V5_M1_051 | Identifier zones incompréhension | ORGA | **Aidant** |
| MT_V5_M1_009 | Identifier points de divergence | ORGA | **Aidant** (avis contradictoires perçus) |
| MT_V5_M1_032 | Confirmer compréhension diagnostic | ORGA | **IDEC** |
| MT_V5_M1_045 | Confirmer absence contradiction | ORGA | **IDEC** |
| MT_V5_M1_P02 | Coordination professionnels divergents | SEC | **IDEC** (réunion de coordination), **MT**, **Spécialistes** |
| MT_V5_M1_P03 | Second avis centre de référence | MED | **Centre de référence** / **Spécialiste hospitalier** |

### Catégorie M1_CAT_03 — Transition enfant-adulte

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M1_054 | Coordination services enfant/adulte | SEC | **IDEC**, **Pédiatre** (service enfant), **Spécialiste adulte** |
| MT_V5_M1_135 | Identifier zones d'incertitude transition | STRUC | **IDEC** |
| MT_V5_M1_P04 | Identifier référents enfants/adultes | STRUC | **IDEC** (relais), **Pédiatre**, **Médecin adulte** |

---

## MP M2 — Accès aux soins et aux professionnels

**🏆 ASR** : L'aidant accède sans difficulté aux professionnels nécessaires.

### Catégorie M2_CAT_01 — Accessibilité géographique et prise de RDV

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M2_026 | Évaluer difficultés éloignement | ORGA | **IDEC** |
| MT_V5_M2_044 | Identifier professionnels hors secteur | ORGA | **Aidant** (recherche) |
| MT_V5_M2_094 | Accompagnement prise de RDV | SEC | **IDEC** (aide RDV) |
| MT_V5_M2_126 | Alternatives téléconsultation | MED | **Plateforme de téléconsultation**, **PDS** |
| MT_V5_M2_133 | Procédure prise RDV spécialiste | MED | **Spécialiste** (via adressage MT) |
| MT_V5_M2_P01 | Informer transport sanitaire | INFO | **Transport sanitaire** (VSL, ambulance), **CPAM** (prise en charge) |

### Catégorie M2_CAT_02 — Difficultés pratiques d'accès aux soins

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M2_005→M2_P02 | (10 MT) Identifier/résoudre freins accès | Mixte | **IDEC** (coordination), **Aidant** (organisation), **Transport sanitaire** |

### Catégorie M2_CAT_03 — Éducation thérapeutique (ETP)

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M2_011→M2_P03 | (9 MT) Explorer freins, valoriser, inscrire ETP | Mixte | **Programme ETP** (hôpital/réseau), **IDEC** (orientation), **Groupes de parole** |

### Catégorie M2_CAT_04 — Réseau de spécialistes et suivi préventif

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M2_DISPATCH | RDV spécialiste par dispatch O19 | SEC | **Spécialiste paramétrique** (selon pathologie) |
| MT_V5_M2_120 | Point avec proche et professionnels | INFO | **MT**, **Spécialistes** impliqués |
| MT_V5_M2_P04 | Vérifier médecin traitant | ORGA | **IDEC** (vérification MT du proche) |
| MT_V5_M2_P05 | Bilans prévention par âge | INFO | **MT**, **Gériatre** (si >75 ans) |

---

## MP M3 — Urgences, hospitalisations et continuité

**🏆 ASR** : Le suivi médical est stable, les urgences sont rares et anticipées.

### Catégorie M3_CAT_01 — Stabilité du suivi médical

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M3_004→M3_097 | (8 MT) Analyser RDV imprévus, ruptures de suivi | Mixte | **IDEC** (analyse, synthèse), **Aidant** (documentation) |

### Catégorie M3_CAT_02 — Bilan de synthèse global

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M3_123 | Vérifier mise en œuvre recos bilan | MED | **Médecin traitant** |
| MT_V5_M3_127 | Informer intérêt consultation synthèse | MED | **PDS** (consultation synthèse pluriprofessionnelle) |
| MT_V5_M3_130 | Identifier évolutions depuis dernier bilan | MED | **Médecin traitant** |

### Catégorie M3_CAT_03 — Suivi post-hospitalisation

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M3_118 | Vérifier respect RDV programmés | INFO | **IDEC** (suivi calendrier) |
| MT_V5_M3_134 | Reprendre éléments sortie hospitalisation | STRUC | **IDEC** (protocole), **Service hospitalier** (éléments de sortie) |

---

## MP M4 — Troubles psychiques, addictions et suivi

**🏆 ASR** : Le suivi psy/addiction est en place et le plan de crise est formalisé.

### Catégorie M4_CAT_01 — Suivi addictologique

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M4_P01 | Orienter vers CSAPA ou addictologue | MED | **CSAPA**, **Addictologue** |
| MT_V5_M4_P02 | Informer groupes parole et soutien | INFO | **Groupes de parole** (alcool, tabac, jeu), **Lignes d'écoute** |
| MT_V5_M4_080→M4_035 | (8 MT) Suivi, motivation, réticences | Mixte | **IDEC**, **Aidant**, **Addictologue** |

### Catégorie M4_CAT_02 — Suivi psychiatrique et psychologique

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M4_031→M4_122 | (7 MT) Signes souffrance, suivi, observance | Mixte | **Psychiatre**, **Psychologue**, **PDS** (observance) |

### Catégorie M4_CAT_03 — Plan de crise et gestion aggravation

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M4_012 | Construire plan urgence personnalisé | ORGA | **IDEC** (formalisation), **Aidant** (exécution) |
| MT_V5_M4_P04 | Formaliser plan crise document partagé | STRUC | **IDEC** (document partagé) |
| MT_V5_M4_P05 | Faire valider plan par médecin référent | MED | **Médecin traitant** (validation médicale du plan) |
| MT_V5_M4_030, M4_109 | Zones de flou, plan à jour | ORGA/INFO | **Aidant** (alerte), **IDEC** |

### Catégorie M4_CAT_04 — Suivi post-hospitalisation psy/addiction

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M4_048→M4_092 | (5 MT) Continuité post-hospit psy | Mixte | **Psychologue**, **Psychiatre**, **IDEL** (suivi infirmier), **IDEC** |

---

## MP M5 — Coordination des soins

**🏆 ASR** : Le parcours est piloté par un référent identifié et la coordination fonctionne.

### Catégorie M5_CAT_01 — Pilotage et référent médical

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M5_047→M5_P01 | (10 MT) Référent, annuaire, coordination | Mixte | **Médecin traitant** (pilote), **Spécialiste** (champ d'intervention), **DAC** (dispositif coordination territoire), **IDEC** |

### Catégorie M5_CAT_02 — Besoin de coordination

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M5_021→M5_P02 | (5 MT) Coordination renforcée | Mixte | **IDEC** (priorité coordination), **Médecin traitant** (concertation pluripro) |

---

## MP M6 — Plan de soins, évaluations et inquiétudes

**🏆 ASR** : Le plan de soins est à jour, les évaluations sont réalisées, les inquiétudes sont prises en charge.

### Catégorie M6_CAT_01 — Lisibilité et pilotage du parcours

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M6_001→M6_P01 | (6 MT) Complexité, plan de soins, document synthèse | Mixte | **IDEC** (pilotage), **Aidant** (identification complexité) |

### Catégorie M6_CAT_02 — Inquiétudes et anticipation

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M6_014→M6_128 | (7 MT) Inquiétudes, évaluation spécialisée, alimentation/poids, urgences | Mixte | **IDEC**, **Aidant**, **Nutritionniste** (poids), **PDS** (analyse urgences), **Spécialiste** |

### Catégorie M6_CAT_03 — Évaluations gériatriques

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M6_008→M6_002 | (10 MT) Chutes, évaluations, consultation mémoire, bilan gériatrique | Mixte | **Gériatre** (consultation longue), **Consultation mémoire**, **Ergothérapeute** (adaptation domicile), **Médecin traitant** (adressage) |

### Catégorie M6_CAT_04 — Évaluations neurodéveloppement (TND)

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V5_M6_103→M6_P03 | (10 MT) TND : évaluation, structures, neuropédiatre | Mixte | **Structures TND** (CAMSP, CMP-I, PCO), **Neuropédiatre**, **IDEC**, **Aidant**, **Référent TND** |

---

## Matrice de couverture — Acteurs × MP

| Acteur | M1 | M2 | M3 | M4 | M5 | M6 | Nb MT |
|---|---|---|---|---|---|---|---|
| **Aidant** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ~145 |
| **IDEC** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ~90 |
| **Médecin traitant** | ✅ ALD | — | ✅ bilan | ✅ plan crise | ✅ pilote | ✅ adressage | ~15 |
| **Spécialiste(s)** | ✅ 2nd avis | ✅ dispatch | — | — | ✅ champ | ✅ | ~10 |
| **Psychologue** | — | — | — | ✅ suivi | — | — | 2 |
| **Psychiatre** | — | — | — | ✅ suivi | — | — | 3 |
| **Addictologue/CSAPA** | — | — | — | ✅ suivi | — | — | 3 |
| **PDS (générique)** | ✅ | ✅ | ✅ | ✅ | — | ✅ | 6 |
| **Centre de référence** | ✅ | — | — | — | — | — | 1 |
| **Programme ETP** | — | ✅ | — | — | — | — | 3 |
| **Transport sanitaire** | — | ✅ | — | — | — | — | 2 |
| **DAC/CPTS** | — | — | — | — | ✅ | — | 2 |
| **Gériatre** | — | — | — | — | — | ✅ | 3 |
| **Ergothérapeute** | — | — | — | — | — | ✅ | 2 |
| **Neuropédiatre** | — | — | — | — | — | ✅ | 1 |
| **Structures TND** | — | — | — | — | — | ✅ | 4 |
| **Consultation mémoire** | — | — | — | — | — | ✅ | 2 |
| **IDEL** | — | — | — | ✅ | — | — | 2 |
| **Groupes de parole** | — | ✅ | — | ✅ | — | — | 3 |
| **Nutritionniste** | — | — | — | — | — | ✅ | 1 |
| **CPAM** | ✅ ALD | ✅ transport | — | — | — | — | 2 |
| **HAD** | — | — | ✅ | — | — | — | 1 |
| **Téléconsultation** | — | ✅ | — | — | — | — | 1 |

---

## Spécificité V5 — Le parcours médical comme écosystème

> **32 acteurs** identifiés dans l'écosystème V5 après audit contre le référentiel CAT (60 acteurs). La particularité de V5 est que c'est une vulnérabilité de **pilotage** plus que d'action directe. L'IDEC est l'acteur dominant (~90 MT sur 145) car la coordination EST la tâche. Le MT est le pilote médical. L'aidant reste **full autonome** (K7).
>
> **V5 est unique** car elle inclut les catégories TND (M6_CAT_04) pour les enfants — c'est la seule vulnérabilité qui adresse spécifiquement les troubles du neurodéveloppement, avec un écosystème TND dédié (CAMSP, CMP-I, PCO, neuropédiatre).
