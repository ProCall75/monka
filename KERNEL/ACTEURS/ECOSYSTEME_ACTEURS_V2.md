# 🌐 Écosystème Acteurs — V2 Administrative

> **Source DB** : 46 MT × 4 MP (A1-A4) — Supabase `mbxeqrvofrmhqlwlefff`  
> **Source référentiel** : `ACTEURS_CAT_EXHAUSTIF.md` — 60 acteurs canoniques  
> **Date** : 17/02/2026  
> **Principe** : L'aidant est **full autonome** (K7). Les acteurs = l'écosystème mobilisable autour de chaque MT.

---

## Acteurs V2 — Vue d'ensemble

V2 est la vulnérabilité la plus **institutionnelle** — les acteurs sont des organismes, des guichets et des travailleurs sociaux. Peu de médical, beaucoup de médico-social.

| # | Acteur | Catégorie | MPs concernés | Rôle dans V2 |
|---|---|---|---|---|
| 1 | **Assistante sociale (AS)** | Travailleur social | A1, A2, A3, A4 | Pivot central — montage dossiers, bilan social, orientation droits |
| 2 | **IDEC** | Coordination | A1, A2, A3, A4 | Accompagnement, inventaire des aides, coordination |
| 3 | **MDPH** | Institution | A2, A4 | Droits handicap, notifications AESH/ESAT/IME, évaluation |
| 4 | **Conseil départemental (CD)** | Institution | A2 | Évaluation AGGIR, APA, orientation médico-sociale |
| 5 | **CPAM** | Institution | A1, A2 | Couverture santé, CSS, droits ALD, prestations |
| 6 | **CCAS** | Institution locale | A1, A3 | Accueil de proximité, accompagnement administratif |
| 7 | **France Services** | Point d'accueil | A3 | Aide aux démarches dématérialisées, écrivain public |
| 8 | **CLIC** | Coordination locale | A1, A4 | Centre Local d'Information et de Coordination — orientation personnes âgées |
| 9 | **Mutuelle** | Organisme privé | A1 | Complémentaire santé, restes à charge |
| 10 | **Juge des tutelles / Tribunal judiciaire** | Institution judiciaire | A3 | Mesures de protection juridique (tutelle, curatelle, habilitation) |
| 11 | **CAF** | Institution | A4 | Aides financières, allocations familiales |
| 12 | **Notaire** | Professionnel libéral | A3 | Mandat de protection future, directives anticipées attestées |
| 13 | **Médecin traitant** | Médecin | A2, A3, A4 | Certificat médical (demande ALD, dossier MDPH), attestation |
| 14 | **AESH** | Accompagnement scolaire | A4 | Accompagnant d'Élève en Situation de Handicap |
| 15 | **ESAT / IME** | Structure spécialisée | A4 | Établissements d'accueil et travail adapté |
| 16 | **EAS** (Écrivain public / aide sociale) | Service | A1, A3 | Aide rédaction et compréhension documents administratifs |
| 17 | **Enseignant référent** | Éducation nationale | A4 | Projet scolaire, PPS, lien MDPH |
| 18 | **Infirmière scolaire** | Éducation nationale | A4 | Surveillance santé en milieu scolaire |
| 19 | **DAC** (Dispositif d'Aide à la Coordination) | Institution | A2 | Coordination territoriale quand désert médical |
| 20 | **Auxiliaire de vie** | Service à domicile | A4 | Aide aux actes quotidiens (via SAD/APA) |
| 21 | **Fonds de solidarité** | Institution | A4 | Aide financière exceptionnelle |
| 22 | **Aidant** | Non-professionnel | A1-A4 | Acteur autonome — exécute toutes les tâches |

---

## MP A1 — Couverture santé et protections juridiques

**🏆 ASR** : L'aidant et le proche ont une couverture santé sécurisée et un projet de vie anticipé.

### Catégorie A1_CAT_01 — Sécurisation de la couverture santé

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A1_01 | Vérifier couverture santé aidant et proche | ORGA | 💡 | **Aidant** (auto-évaluation couverture), **Mutuelle** |
| MT_V2_A1_02 | Informer sur complémentaire santé / CSS | INFO | 💡 | **CPAM** (CSS = Complémentaire Santé Solidaire), **Mutuelle**, **Assistante sociale** |
| MT_V2_A1_03 | Orienter vers CPAM/AS si lacune identifiée | SEC | 📍 | **CPAM** (régularisation), **Assistante sociale** (accompagnement) |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V2_A1_PREV_01 | Rappeler l'importance de la couverture santé | INFO | **Aidant** (vérification mutuelle à jour) |
| MT_V2_A1_PREV_02 | Anticiper les changements de situation | ORGA | **Aidant** (prospective changements) |

> **Questions déclenchantes** : O23/O45 (type de couverture — CMU = précarité)  
> **Sens clinique** : CMU signale précarité → orientation AS urgente. Régime général sans mutuelle → accès soins limité.

---

### Catégorie A1_CAT_02 — Anticipation du projet de vie

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A1_04 | Évaluer viabilité situation actuelle | ORGA | 💡 | **Aidant** (réflexion sur pérennité de l'organisation) |
| MT_V2_A1_05 | Informer sur options d'évolution | INFO | 💡 | **IDEC** (alternatives d'organisation), **CLIC** (info personnes âgées), **Assistante sociale** |
| MT_V2_A1_06 | Structurer plan d'anticipation | STRUC | 📍 | **Aidant** (plan avec les proches), **Assistante sociale** (cadrage), **Notaire** (si aspects patrimoniaux) |
| MT_V2_A1_07 | Orienter vers service social/CLIC | SEC | 📍 | **Assistante sociale**, **CLIC** — accompagnement projet de vie |

> **Questions déclenchantes** : E21 (viabilité de la situation de vie), E68 (charge admin >5h/mois)  
> **Sens clinique** : E21 = "changement nécessaire" ou "je ne sais pas" + charge admin excessive → double signal de fragilité.

---

### Catégorie A1_CAT_03 — Accompagnement administratif

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A1_08 | Identifier démarches en cours/à venir | ORGA | 💡 | **Aidant** (inventaire personnel) |
| MT_V2_A1_09 | Informer sur dispositifs aide aux démarches | INFO | 💡 | **CCAS**, **EAS** (écrivain public), **France Services**, plateformes numériques |
| MT_V2_A1_10 | Orienter vers accompagnement admin | SEC | 📍 | **Assistante sociale**, **CCAS** — accompagnement dans les démarches |

> **Questions déclenchantes** : E68 (temps admin — >5h critique, 1-5h standard)  
> **Sens clinique** : >5h/mois de démarches = charge incompatible avec le bien-être → déléguer d'urgence.

---

## MP A2 — Droits, aides et évaluation dépendance

**🏆 ASR** : Les droits prioritaires sont activés et l'évaluation de dépendance est réalisée.

### Catégorie A2_CAT_01 — Activation des droits et aides

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A2_01 | Bilan des droits ouverts et manquants | ORGA | 💡 | **Aidant** (inventaire droits actuels), **Assistante sociale** (expertise droits) |
| MT_V2_A2_02 | Informer sur les droits mobilisables | INFO | 💡 | **Assistante sociale**, **CPAM** (droits sécu), **CAF** (allocations), **MDPH** (handicap) |
| MT_V2_A2_03 | Préparer dossier de demande droits prioritaires | STRUC | 📍 | **Assistante sociale** (montage dossier), **Médecin traitant** (certificat médical), **MDPH** (formulaire) |
| MT_V2_A2_04 | Orienter vers AS/MDPH | SEC | 📍 | **Assistante sociale**, **MDPH** — montage et dépôt dossier |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V2_A2_PREV_01 | Rappeler dates renouvellement aides | ORGA | **Aidant** (calendrier renouvellements) |
| MT_V2_A2_PREV_02 | Sensibiliser aux changements ouvrant nouveaux droits | INFO | **Aidant** (vigilance changements de situation) |

> **Questions déclenchantes** : E62 (droits demandés — Aucun = critique), O53 (évaluation dépendance), N29 (droits obtenus)  
> **Sens clinique** : E62=Aucun = aucun droit engagé → risque de rupture financière et sociale.

---

### Catégorie A2_CAT_02 — Évaluation de la dépendance (AGGIR)

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A2_05 | Vérifier si évaluation AGGIR réalisée | ORGA | 💡 | **Aidant** (vérification), **Conseil départemental** (organisme évaluateur) |
| MT_V2_A2_06 | Informer sur processus AGGIR et APA | INFO | 💡 | **Conseil départemental** (APA), **Assistante sociale** (explication processus) |
| MT_V2_A2_07 | Initier demande évaluation AGGIR | SEC | 📍 | **Conseil départemental** (demande d'évaluation), **Assistante sociale** (appui dossier), **Médecin traitant** (certificat) |

> **Questions déclenchantes** : O53 (évaluation AGGIR — Non/NSP), E62 (APA demandée sans AGGIR = incohérence)  
> **Sens clinique** : Sans AGGIR, pas d'APA. Sans APA, pas d'aide financière pour le maintien à domicile.

---

### Catégorie A2_CAT_03 — Lien ALD et prestations sociales

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A2_08 | Vérifier existence ALD et prestations liées | ORGA | 💡 | **Aidant** (vérification reconnaissance ALD), **Médecin traitant** (demande ALD), **CPAM** (organisme ALD) |
| MT_V2_A2_09 | Informer sur droits ouverts par ALD | INFO | 💡 | **CPAM** (droits sécu ALD), **Assistante sociale** (lien avec prestations sociales) |
| MT_V2_A2_10 | Orienter vers MDPH/AS pour prestations ALD | SEC | 📍 | **MDPH** (droits complémentaires handicap), **Assistante sociale** (activation prestations) |

> **Questions déclenchantes** : N42 (ALD — Non/NSP), E62 (droits demandés)  
> **Sens clinique** : ALD confirmée mais lien vers prestations sociales non exploité = manque à gagner.

---

## MP A3 — Charge et complexité des démarches

**🏆 ASR** : L'aidant a des relais pour ses démarches admin et les protections juridiques sont en place.

### Catégorie A3_CAT_01 — Accompagnement à la complexité administrative

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A3_01 | Évaluer complexité perçue et freins | ORGA | 💡 | **Aidant** (identification des difficultés) |
| MT_V2_A3_02 | Informer sur aides à la simplification | INFO | 💡 | **France Services**, **CCAS**, **EAS** (écrivain public) — services gratuits d'aide |
| MT_V2_A3_03 | Plan de simplification des démarches | STRUC | 📍 | **Aidant** (priorisation), **Assistante sociale** (cadrage), **France Services** (exécution) |
| MT_V2_A3_04 | Orienter vers France Services/CCAS/EAS | SEC | 📍 | **France Services** (guichet unique), **CCAS** (proximité), **EAS** (aide rédactionnelle) |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V2_A3_PREV_01 | Sensibiliser évolutions administratives | INFO | **Aidant** (veille réglementaire) |

> **Questions déclenchantes** : E66 (complexité perçue), E69 (aisance numérique), E70 (respect des délais)  
> **Sens clinique** : E66=Oui + E69=perdu numérique + E70=toujours en retard = triple signal → perte de droits imminente.

---

### Catégorie A3_CAT_02 — Anticipation et protection juridique

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A3_05 | Évaluer protection juridique actuelle | ORGA | 💡 | **Aidant** (inventaire des protections en place) |
| MT_V2_A3_06 | Informer directives anticipées et mesures de protection | INFO | 💡 | **Notaire** (mandat de protection future), **Juge des tutelles** (tutelle/curatelle), **Médecin traitant** (certificat circonstancié) |
| MT_V2_A3_07 | Accompagner rédaction directives / demande protection | STRUC | 📍 | **Assistante sociale** (accompagnement rédaction), **Notaire** (formalisation juridique), **Médecin traitant** (certificat) |
| MT_V2_A3_08 | Orienter vers AS ou juge des tutelles | SEC | 📍 | **Assistante sociale** (orientation), **Tribunal judiciaire / Juge des tutelles** (saisine), **Greffe** |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V2_A3_PREV_02 | Vérifier actualité des protections juridiques | ORGA | **Aidant** (vérification dates validité) |

> **Questions déclenchantes** : E61 (directives anticipées — Non = critique), N6 (protection juridique — Non), E21 (viabilité situation)  
> **Sens clinique** : Absence de directives anticipées = risque décisionnel immédiat en cas d'hospitalisation.

---

## MP A4 — Situation scolaire/professionnelle et budget

**🏆 ASR** : Le proche a accès à une structure adaptée et l'aidant a une situation financière viable.

### Catégorie A4_CAT_01 — Inclusion scolaire et professionnelle

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A4_01 | Évaluer freins à l'inclusion du proche | ORGA | 💡 | **Aidant** (identification des obstacles) |
| MT_V2_A4_02 | Informer dispositifs d'inclusion | INFO | 💡 | **MDPH** (notifications), **AESH** (accompagnement scolaire), **ESAT** (travail adapté), **IME** (établissement médico-éducatif) |
| MT_V2_A4_03 | Accompagner constitution dossier MDPH inclusion | STRUC | 📍 | **Assistante sociale** (montage dossier), **MDPH** (dépôt), **Médecin traitant** (certificat), **Enseignant référent** (projet scolaire) |
| MT_V2_A4_04 | Orienter vers structure adaptée | SEC | 📍 | **ESAT**, **IME**, **AESH**, école inclusive — contact et rencontre |

**Prévention :**

| MT_ID | Libellé | Type | Acteurs écosystème |
|---|---|---|---|
| MT_V2_A4_PREV_01 | Anticiper échéances MDPH et renouvellements | ORGA | **Aidant** (calendrier), **MDPH** (dates) |
| MT_V2_A4_PREV_02 | Informer sur évolutions dispositifs | INFO | **Aidant** (veille réglementaire) |

> **Questions déclenchantes** : E64 (accès structure — "ne fréquente pas" = critique), E65 (AESH), E67 (activité adaptée)  
> **Sens clinique** : Triple exclusion (pas de structure + pas d'AESH + pas d'activité) = rupture sociale totale.

---

### Catégorie A4_CAT_02 — Accompagnement et ressources aidant

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A4_05 | Inventorier services mobilisés et manques | ORGA | 💡 | **Aidant** (bilan services utilisés) |
| MT_V2_A4_06 | Informer services disponibles | INFO | 💡 | **CLIC** (personnes âgées), **CCAS** (proximité), **Assistante sociale** (orientation) |
| MT_V2_A4_07 | Structurer plan d'accompagnement individuel | STRUC | 📍 | **Aidant** (plan "qui fait quoi"), **Assistante sociale** (structuration), **CLIC** (coordination) |
| MT_V2_A4_08 | Orienter vers AS/CLIC | SEC | 📍 | **Assistante sociale**, **CLIC** — coordination du plan |

> **Questions déclenchantes** : N43 (services utilisés — Aucun), N5 (aides reçues — Aucune), E63 (préoccupations multiples)  
> **Sens clinique** : N43=Aucun + N5=Aucune + E63≥2 préoccupations = surcharge non accompagnée.

---

### Catégorie A4_CAT_03 — Viabilité financière

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V2_A4_09 | Évaluer besoins financiers non couverts | ORGA | 💡 | **Aidant** (identification postes de dépense lourds) |
| MT_V2_A4_10 | Informer financements complémentaires | INFO | 💡 | **CPAM** (droits sécu), **CAF** (allocations), **Mutuelle** (restes à charge), **Fonds de solidarité** |
| MT_V2_A4_11 | Orienter vers AS pour bilan social | SEC | 📍 | **Assistante sociale** — bilan social complet |

> **Questions déclenchantes** : O61 (moyens financiers — Non = insuffisants), N43 (aucun service)  
> **Sens clinique** : Difficultés financières + aucun service = l'aidant ne sait pas vers qui se tourner.

---

## Matrice de couverture — Acteurs × MP

| Acteur | A1 | A2 | A3 | A4 | Nb MT impliqué |
|---|---|---|---|---|---|
| **Aidant** (autonome) | ✅ all | ✅ all | ✅ all | ✅ all | 46 (toutes) |
| **Assistante sociale** | ✅ couverture, projet vie, admin | ✅ droits, AGGIR, ALD | ✅ admin, protection juridique | ✅ inclusion, accompagnement, budget | ~20 MT |
| **IDEC** | ✅ coordination | ✅ coordination | ✅ coordination | ✅ coordination | support ~15 MT |
| **CPAM** | ✅ CSS, couverture | ✅ ALD | — | ✅ financements | 5 MT |
| **MDPH** | — | ✅ droits, évaluation | — | ✅ inclusion, AESH | 5 MT |
| **Conseil départemental** | — | ✅ AGGIR, APA | — | — | 2 MT |
| **CCAS** | ✅ aide démarches | — | ✅ guichet proximité | ✅ services locaux | 4 MT |
| **France Services** | — | — | ✅ guichet démarches | — | 2 MT |
| **CLIC** | ✅ info personnes âgées | — | — | ✅ coordination | 3 MT |
| **Mutuelle** | ✅ complémentaire | — | — | ✅ restes à charge | 2 MT |
| **Notaire** | — | — | ✅ mandat protection future | — | 2 MT |
| **Juge des tutelles** | — | — | ✅ mesures protection | — | 1 MT |
| **Médecin traitant** | — | ✅ certificat | ✅ certificat | ✅ certificat MDPH | 4 MT |
| **CAF** | — | — | — | ✅ allocations | 1 MT |
| **EAS / Écrivain public** | ✅ aide rédaction | — | ✅ aide compréhension | — | 2 MT |
| **AESH** | — | — | — | ✅ accompagnement scolaire | 2 MT |
| **ESAT / IME** | — | — | — | ✅ accueil, travail adapté | 2 MT |

---

## Spécificité V2 — L'écosystème institutionnel

> **Constat** : V2 est la seule vulnérabilité où l'**Assistante sociale** est l'acteur pivot absolu (~20 MT impliquées). L'IDEC coordonne mais l'expertise droits/aides est 100% AS. Les institutions (MDPH, CD, CPAM, CAF, CCAS) sont très présentes — c'est un écosystème de **guichets** et de **dossiers**. L'aidant reste **full autonome** (K7).
> 
> **22 acteurs distincts** identifiés dans l'écosystème V2 après audit contre le référentiel CAT (60 acteurs).
