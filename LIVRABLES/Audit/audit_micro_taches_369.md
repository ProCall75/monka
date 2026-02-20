# 🔍 Audit Complet des 369 Micro-Tâches — 19/02/2026

> **Source** : Supabase `micro_taches` (369 lignes)  
> **Objectif** : Valider placement, wording, acteurs, domaines et cohérence globale  
> **Score global** : **7.5 / 10** — base clinique solide, axes d'amélioration identifiés

---

## 📊 1. Vue d'ensemble

### 1.1 — Répartition par Vulnérabilité

| V | Nom | MPs | Nb MT | Medical | Médico-social |
|---|-----|-----|:-----:|:-------:|:-------------:|
| **V1** | Social & Relationnel | R1(13), R2(16), R3(8), R4(19) | **56** | 4 | 52 |
| **V2** | Administrative | A1(12), A2(12), A3(10), A4(13) | **47** | 0 | 47 |
| **V3** | Santé Aidant | S1(7), S2(9), S3(18), S4(4) | **38** | 18 | 20 |
| **V4** | Fragilité Proche | F1(19), F2(14), F3(12), F4(15), F5(14), F6(16) | **90** | 30 | 60 |
| **V5** | Parcours Médical | M1(18), M2(30), M3(14), M4(27), M5(16), M6(33) | **138** | 22 | 116 |
| | **TOTAL** | **24 MPs** | **369** | **74** (20%) | **295** (80%) |

### 1.2 — Types de MT

| Type | Nb | % | Description |
|:----:|:---:|:---:|-------------|
| **ORGA** | 125 | 34% | Organisation, évaluation, identification |
| **INFO** | 83 | 22% | Information, sensibilisation |
| **SEC** | 81 | 22% | Sécurisation (action à déclencher) |
| **MED** | 54 | 15% | Acte médical (RDV, prescription, bilan) |
| **STRUC** | 26 | 7% | Structuration (plan, annuaire, dossier) |

### 1.3 — Matrice Type × Vulnérabilité

| V | ORGA | INFO | SEC | MED | STRUC |
|---|:----:|:----:|:---:|:---:|:-----:|
| **V1** Social | **22** (39%) | 16 (29%) | 11 (20%) | 0 | 7 (13%) |
| **V2** Admin | 15 (32%) | **15** (32%) | 11 (23%) | 0 | **6** (13%) |
| **V3** Santé aidant | 6 (16%) | 6 (16%) | 9 (24%) | **17** (45%) | 0 |
| **V4** Fragilité | **27** (30%) | 18 (20%) | 22 (24%) | 19 (21%) | 4 (4%) |
| **V5** Parcours méd. | **55** (40%) | 28 (20%) | 28 (20%) | 18 (13%) | 9 (7%) |

**Observations** :
- V1/V2 : 0 MED → ✅ normal (social et administratif)
- V3 : 45% MED → ✅ logique (santé de l'aidant = médical)
- V3 : 0 STRUC → ⚠️ Pas de MT structurante (plan de suivi aidant ?)
- V5 : 40% ORGA → ⚠️ beaucoup d'organisation, confirmant le problème P6 (MT "confirmer/valoriser" dans M2)

### 1.4 — Complétude données

| Champ | Rempli | Vide | % rempli |
|-------|:------:|:----:|:--------:|
| `wording_idec` | **369** | 0 | 100% ✅ |
| `wording_utilisateur` | **369** | 0 | 100% ✅ |
| `acteur` | **369** | 0 | 100% ✅ |
| `category_id` | **369** | 0 | 100% ✅ |
| `wording_std` | **65** | 304 | **18%** 🔴 |
| `wording_ccc` | **65** | 304 | **18%** 🔴 |
| `wording_crit` | **48** | 321 | **13%** 🔴 |

---

## 🎭 2. Audit des Acteurs

### 2.1 — Panorama : 71 acteurs distincts

| Rang | Acteur | Nb MT | % |
|:----:|--------|:-----:|:---:|
| 1 | **AIDANT** | 127 | 34% |
| 2 | **IDEC** | 107 | 29% |
| 3 | **MEDECIN_TRAITANT** | 44 | 12% |
| 4 | ASSISTANTE_SOCIALE | 29 | 8% |
| 5 | SAD | 16 | 4% |
| 6 | CPAM | 12 | 3% |
| 7 | PSYCHOLOGUE | 12 | 3% |
| 8 | STRUCTURES_SOUTIEN_AIDANTS | 11 | 3% |
| 9 | ERGOTHERAPEUTE | 10 | 3% |
| 10 | PLATEFORME_REPIT | 10 | 3% |
| — | *37 acteurs à 1 seule MT* | 37 | — |

**Verdict** : ✅ Pyramide cohérente.
- **AIDANT + IDEC** = 63% → logique (moteur = aidants accompagnés par l'IDEC)
- **MEDECIN_TRAITANT** = 12% → pivot médical, comme attendu
- **Queue longue** de 37 acteurs à 1 MT → principalement les spécialistes paramétriques de S3

### 2.2 — Distribution mono vs multi-acteurs

| Nb acteurs / MT | Nb MT | % |
|:---------------:|:-----:|:---:|
| **1 acteur** | 236 | 64% |
| **2 acteurs** | 92 | 25% |
| **3 acteurs** | 32 | 9% |
| **4 acteurs** | 9 | 2% |

> [!WARNING]
> **64% des MT n'ont qu'un seul acteur.** Acceptable pour les MT paramétriques (RDV spécialiste), mais à vérifier pour les MT d'accompagnement complexe.

### 2.3 — MT où AIDANT est le seul acteur

**101 MT / 369 (27%) ont AIDANT comme unique acteur.** MPs les plus concernés :

| MP | MT AIDANT seul | Total | % |
|:--:|:--------------:|:-----:|:---:|
| **R1** | 6 / 13 | 46% | ⚠️ |
| **R2** | 7 / 16 | 44% | ⚠️ |
| **R4** | 8 / 19 | 42% | ⚠️ |
| **F1** | 6 / 19 | 32% | — |
| **M2** | 9 / 30 | 30% | ⚠️ |
| **M4** | 8 / 27 | 30% | ⚠️ |

> [!IMPORTANT]
> **R1 (46%), R2 (44%), R4 (42%)** ont presque la moitié de leurs MT assignées à l'aidant seul. Question clinique : l'IDEC accompagne-t-il implicitement toute MT aidant, ou faut-il expliciter la co-responsabilité ?

### 2.4 — Diversité d'acteurs par MP

| Nb acteurs distincts | MPs |
|:--------------------:|-----|
| **5** | S4 ⚠️, R3 ⚠️ |
| 6-7 | M5, M1, S1, M3, A2, S2 |
| 8-9 | A3, M2, R2 |
| 10-12 | R4, A1, F2, R1, M6, F3, F6, M4, F1 ✅ |
| 13 | F4, A4, F5 ✅ |
| **19** | S3 🔴 (gonflé par 13 spécialistes paramétriques) |

---

## 🏥 3. Audit des Domaines (medical vs medico_social)

### 3.1 — Répartition par MP

| MP | Thématique | % Medical | % Médico-social | Cohérent ? |
|----|-----------|:---------:|:---------------:|:----------:|
| A1-A4 | Administrative | 0% | 100% | ✅ |
| R1 | Impact vie perso/pro | 8% | 92% | ✅ |
| R2 | Soutien entourage | 0% | 100% | ✅ |
| R3 | Isolement proche | 13% | 88% | ✅ |
| R4 | Relation aidant/proche | 16% | 84% | ✅ |
| S1 | Charge / épuisement | 0% | 100% | ✅ |
| S2 | Inquiétudes sécurité | 22% | 78% | ✅ |
| **S3** | **Santé physique aidant** | **89%** | 11% | ✅ (MP médical de l'aidant) |
| S4 | Hygiène de vie | 25% | 75% | ✅ |
| F1 | Vie quotidienne proche | 16% | 84% | ✅ |
| F2 | Autonomie / aide humaine | 14% | 86% | ✅ |
| F3 | Mémoire / comportement | 33% | 67% | ✅ |
| **F4** | **Douleur / fatigue** | **60%** | 40% | ✅ (douleur = soins) |
| F5 | Dépendance / handicap | 29% | 71% | ✅ |
| **F6** | **Autonomie fonctionnelle** | **44%** | 56% | ✅ |
| M1-M6 | Parcours médical | 10-21% | 79-90% | ✅ |

> [!NOTE]
> **M2 (90% medico_social)** paraît contre-intuitif pour "Accès aux soins", mais c'est cohérent : les MT sont de l'accompagnement IDEC *autour* de l'accès (informer, orienter, coordonner), pas des actes médicaux. Logique Monka : `medical` = acte requérant PDS, `medico_social` = tout le reste.

### 3.2 — Incohérence isolée

| MT | Domaine | Acteur | Problème |
|----|:-------:|--------|----------|
| `MT_V4_020` | **medical** | ERGOTHERAPEUTE | Ergo = paramédical → devrait être `medico_social` |

**1 seule incohérence sur 369 MT.** Les 13 MT MEDECIN_TRAITANT en domaine medico_social sont toutes justifiées (coordination MDPH, directives anticipées, ALD).

---

## 🔴 4. Problèmes de Placement

### P1. S3 : 13 MT RDV spécialiste → 1 MT paramétrique

S3 contient 13 MT "Prendre RDV avec [spécialiste]" (Dermato, Gynéco, Cardio, Onco, Endocrino, Pneumo, Neuro, Gériatre, Ophtalmo, ORL, Psy, Gastro, Dentiste).

**Problème** : Ce sont des MT paramétriques. `MT_V4_069_PARAM` dans F6 fait ça correctement avec 1 seule MT paramétrique.

**Recommandation** : Fusionner en 1 MT paramétrique → **-12 MT**.

---

### P2. Doublons sémantiques R1 ↔ R2

| R1 | R2 | Sujet |
|----|-----|------|
| `MT_V1_030` "Orienter vers solutions de répit" | `MT_V1_007` "Informer sur solutions de répit" | Répit |
| `MT_V1_036` "Identifier plateforme répit" | `MT_V1_025` "Proposer solutions répit" | Répit |
| `MT_V1_033` "Informer droits aidants" | `MT_V1_010` "Orienter dispositifs aide aidants" | Droits |

**Recommandation** : Centraliser le répit dans un seul MP (R1 ou R2) → **-2/3 MT**.

---

### P3. R4 : doublons internes (19 MT → ~16)

- `MT_V1_013` + `MT_V1_048` → **quasi-doublon** accomp. psychologique
- `MT_V1_014` + `MT_V1_038` → **même action** groupes de parole

---

### P4. S4 sous-représenté (4 MT seulement)

MP "Hygiène de vie (activité et sommeil)" — le plus pauvre du système. Le sommeil n'a aucune MT dédiée.

**Recommandation** : Ajouter 4 MT (sommeil, alimentation, hygiène de vie) → **+4 MT**.

---

### P5. M6 fourre-tout (33 MT)

MP le plus gros : plan de soins (12), évaluations gériatriques (8), TND enfants (7), inquiétudes (6). Le bloc TND enfants est mélangé avec le plan de soins du proche âgé.

---

### P6. M2 : beaucoup de MT "confirmation" (30 MT)

`MT_V5_M2_005` "Confirmer absence difficulté accès", `MT_V5_M2_016` "Confirmer accessibilité"… Ce sont des actions de suivi IDEC, pas des MT actionnables.

**Recommandation** : Distinguer MT-action vs MT-suivi via un flag.

---

## 🛡️ 5. Audit Prévention (`is_prevention`)

| MP | Nb prévention | Total | Observation |
|:--:|:---:|:---:|:---|
| R4, F6, F4 | 3 | 15-19 | ✅ |
| Tous V1/V2/V4/V5 | 2 | variable | ✅ |
| **S1** | **0** | 7 | 🔴 |
| **S2** | **0** | 9 | 🔴 |
| **S3** | **0** | 18 | 🔴 |
| **S4** | **0** | 4 | 🔴 |

> [!CAUTION]
> **V3 (Santé Aidant) n'a AUCUNE MT de prévention** — seule vulnérabilité dans ce cas. C'est un **angle mort majeur** : sans MT prévention, un aidant "qui va bien" n'a aucune MT activable en V3 → pas de suivi préventif.

**Recommandation** : +8 MT prévention (2 par MP V3). Exemples :
- S1 : "Évaluer régulièrement le niveau de charge ressentie"
- S2 : "Vérifier que les dispositifs de sécurité sont en place"
- S3 : "S'assurer que l'aidant maintient ses RDV médicaux"
- S4 : "Encourager le maintien d'une activité physique régulière"

---

## 📝 6. Audit Wording

### 6.1 — Tonalité IDEC vs Utilisateur ✅

La distinction est **bien respectée** sur les 369 MT :
- **IDEC** : ton professionnel, 3ème personne → "Évaluer avec l'aidant…"
- **Utilisateur** : ton direct, 2ème personne → "Faites le point sur…"

### 6.2 — Wordings STD/CCC/CRIT : 82% vides

> [!WARNING]
> **304 MT sur 369 n'ont pas de wording décliné par niveau de gravité.**
> Si le moteur doit adapter le message selon le niveau d'urgence, c'est un chantier majeur. **Question : est-ce volontaire ou en cours ?**

### 6.3 — Wording utilisateur non actionnables (6 MT)

| MT | wording_utilisateur | Problème |
|----|---------------------|----------|
| `MT_V5_M2_033` | "Les professionnels seront informés" | Passif |
| `MT_V5_M4_017` | "Nous restons disponibles" | Message IDEC, pas action utilisateur |
| `MT_V5_M4_006` | "Votre démarche est encourageante" | Validation, pas action |
| `MT_V5_M5_075` | "La coordination est la priorité n°1" | Pas actionnable |
| `MT_V5_M2_085` | "Vérifiez le suivi avec vos professionnels" | Trop vague |
| `MT_V2_A2_06` | "Comprenez pourquoi l'évaluation de dépendance est importante" | Condescendant |

### 6.4 — Doublons exacts wording_utilisateur (5 paires)

| Wording dupliqué | MT | Type |
|-----------------|-----|:----:|
| "Renseignez-vous sur les groupes de parole ou cafés aidants" | MT_V1_005, MT_V1_014 | 🔴 |
| "Le suivi est-il régulier ?" | MT_V5_M4_PREV_01, MT_V5_M4_089 | 🔴 Intra-MP ! |
| "Pourquoi le suivi a-t-il été interrompu ?" | MT_V5_M2_011, MT_V5_M3_097 | ⚠️ |
| "Demandez un bilan nutritionnel" | MT_V4_082, MT_V4_053 | 🔴 |
| "Renseignez-vous sur les options d'hébergement" | MT_V4_006, MT_V4_031 | 🔴 |

**0 doublon wording_idec** ✅

### 6.5 — Longueur des wordings : OK

| Catégorie | Nb | Min | Max |
|:---------:|:---:|:---:|:---:|
| Court (20-60 car.) | 245 | 23 | 60 |
| Moyen (61-120 car.) | 124 | 61 | 118 |

✅ Aucun wording trop court (<20) ni trop long (>120). Bonne discipline rédactionnelle.

### 6.6 — Libellés internes cryptiques

Certains `libelle` utilisent des abréviations non front-friendly :
- `MT_V4_048` = "MT bilan douleur lettre adressage"
- `MT_V4_047` = "RDV MG orienter urgences (N25)"
- `MT_V4_081` = "Lettre adressage urologue + kiné rééducation"

**Impact** : Faible si pas affiché. À normaliser pour les exports.

---

## 🔗 7. Audit Cohérence MT ↔ Recommandations

Recommandations à faible densité MT (1 seule MT liée) :
- **S1_CAT_03**, **S2_CAT_01**, **S3_CAT_02**

> [!NOTE]
> Toutes en **V3** — confirme que V3 est le parent pauvre du système.

---

## 🏗️ 8. MPs sans MT de type STRUC

8 MPs / 24 n'ont **aucune MT STRUC** :

| MP | Thématique | Impact |
|----|-----------|--------|
| F3 | Mémoire, comportement | ⚠️ Pas de plan mémoire |
| F4 | Douleur, fatigue | ⚠️ Pas de dossier douleur |
| F5 | Dépendance, handicap | ⚠️ Pas de plan réadaptation |
| F6 | Autonomie fonctionnelle | ⚠️ Pas de plan aménagement |
| S1 | Charge et épuisement | ⚠️ Pas de plan de répit |
| S2-S4 | Sécurité, santé, hygiène | — Acceptable vu la taille |

---

## 🟢 9. Points positifs

| ✅ | Détail |
|----|--------|
| Couverture complète | 369/369 wording IDEC + utilisateur + acteur |
| Convention d'ID | Format uniforme `MT_V{x}_{num}`, prévention identifiable `_PREV_xx` |
| Domaine cohérent | 1 seule incohérence sur 369 MT |
| `is_contributive` | SEC = 100% contributif, aucun INFO/ORGA mal taggé |
| Diversité acteurs | 71 acteurs distincts, pyramide AIDANT > IDEC > MT cohérente |
| Wordings calibrés | 23-118 caractères, 0 doublon IDEC |

---

## 🎯 10. Verdict Global

### Scorecard

| Dimension | Score |
|----------|:-----:|
| Complétude wording IDEC/utilisateur | **10/10** |
| Distinction tonalité IDEC vs utilisateur | **9/10** |
| Attribution domaine medical/medico_social | **9/10** |
| Cohérence type ↔ is_contributive | **10/10** |
| Diversité globale acteurs | **8/10** |
| Convention d'ID | **10/10** |
| Longueur des wordings | **10/10** |
| V3 prévention | **2/10** |
| Wordings STD/CCC/CRIT | **3/10** |
| Mono-acteur V1 | **5/10** |
| Doublons wording utilisateur | **6/10** |
| STRUC en V3/V4 | **5/10** |
| Densité V3 | **4/10** |

### 🏆 Score global : **7.5 / 10**

> Les 369 MT constituent une **base clinique solide et cohérente**. La couverture thématique est large, les acteurs diversifiés et pertinents, la distinction médical/médico-social bien maîtrisée. Les axes d'amélioration sont clairs et actionnables.

---

## 📋 11. Plan d'action consolidé

| # | Action | Priorité | Impact |
|---|--------|:--------:|--------|
| **1** | Fusionner 13 MT RDV spécialiste S3 → 1 MT paramétrique | 🔴 HAUTE | -12 MT, cohérence |
| **2** | Ajouter 8 MT prévention en V3 (2 par MP) | 🔴 HAUTE | Couverture prévention |
| **3** | Clarifier stratégie wording STD/CCC/CRIT | 🔴 HAUTE | Moteur clinique |
| **4** | Dédoublonner MT répit R1 ↔ R2 | 🟠 MOYENNE | -2/3 MT, clarté |
| **5** | Fusionner doublons psy + groupes parole dans R4 | 🟠 MOYENNE | -2/3 MT |
| **6** | Fusionner 5 paires wording_utilisateur dupliquées | 🟠 MOYENNE | Qualité données |
| **7** | Réécrire 6 wording_utilisateur non actionnables | 🟠 MOYENNE | UX |
| **8** | Enrichir S4 (sommeil, alimentation) | 🟠 MOYENNE | +4 MT, densité V3 |
| **9** | Ajouter MT STRUC à F3, F5, S1 | 🟠 MOYENNE | Structuration parcours |
| **10** | Corriger domaine MT_V4_020 → medico_social | 🟢 BASSE | 1 anomalie |
| **11** | Séparer bloc TND enfants dans M6 | 🟡 BASSE | Clarté architecture |
| **12** | Distinguer MT-action vs MT-suivi dans M2 | 🟡 BASSE | Précision moteur |
| **13** | Normaliser libellés internes V4 | 🟡 BASSE | Exports |
| **14** | Valider politique co-acteur AIDANT+IDEC | 🟡 DISCUSSION | Architecture acteurs |
