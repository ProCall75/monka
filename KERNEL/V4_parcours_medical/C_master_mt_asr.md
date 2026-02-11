# 📄 TEMPLATE C — Master MT & ASR — V4 Parcours Médical du Proche

> **Vulnérabilité** : V4 — Parcours Médical du Proche
> **Date de production** : 11/02/2026
> **Statut** : 🟡 Données mixtes — MTs legacy, domaine/acteur proposés par IA
> **Règles KERNEL** : K9, K10, K11, K12
> **Rôle** : SOURCE DE VÉRITÉ pour les MT

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V4 — Parcours Médical du Proche |
| Nombre de MP | 6 |
| Nombre total de MT | 100 |
| dont 📍 contributives (STRUC/SEC/MED) | 59 |
| dont 💡 non-contributives (INFO/ORGA) | 41 |

### Répartition par type

| Type | Code | Catégorie | Count |
|---|---|---|---|
| Médical | MED | 📍 Sécurisation | 10 |
| Sécurité | SEC | 📍 Sécurisation | 46 |
| Structurel | STRUC | 📍 Sécurisation | 3 |
| Information | INFO | 💡 Amélioration | 18 |
| Organisationnel | ORGA | 💡 Amélioration | 23 |

---

## MP M1 — Compréhension du diagnostic et de la maladie

### 🏆 ASR

> « Clarifier le diagnostic et ses impacts »
> **Signature A** : M1-A — Infos médicales clarifiées | **Signature B** : M1-B — Échanges avec un professionnel

### 📍 MT Contributives — Actions de Sécurisation

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_124 | Proposer une consultation médicale explicative | MED | Prof. de santé 🤖 | 🏥 🤖 | M1_RECO_02 | Legacy ✅ |
| 2 | MT_V4_131 | Contacter le MT pour dossier ALD (100%) | MED | MT 🤖 | 🏥 🤖 | M1_RECO_07 | Legacy ✅ |
| 3 | MT_V4_074 | Proposer un temps d'échange dédié | SEC | IDEC 🤖 | 🤝 🤖 | M1_RECO_01 | Legacy ✅ |
| 4 | MT_V4_064 | Proposer un temps d'échange pour faire le point | SEC | IDEC 🤖 | 🤝 🤖 | M1_RECO_02 | Legacy ✅ |
| 5 | MT_V4_054 | Proposer une coordination entre les services | SEC | IDEC 🤖 | 🤝 🤖 | M1_RECO_06 | Legacy ✅ |
| 6 | MT_V4_135 | Identifier les zones d'incertitude de la transition | STRUC | IDEC 🤖 | 🤝 🤖 | M1_RECO_06 | Legacy ✅ |

**Condition de validation** : 6 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_023 | Identifier les points incompris ou sources de doute | ORGA | Aidant 🤖 | 🤝 🤖 | M1_RECO_01 | Legacy ✅ |
| 2 | MT_V4_003 | Identifier les zones d'incertitude exprimées | ORGA | Aidant 🤖 | 🤝 🤖 | M1_RECO_02 | Legacy ✅ |
| 3 | MT_V4_034 | Valoriser la compréhension de l'aidant | ORGA | IDEC 🤖 | 🤝 🤖 | M1_RECO_02 | Legacy ✅ |
| 4 | MT_V4_028 | Confirmer parcours de soins perçu comme clair | ORGA | IDEC 🤖 | 🏥 🤖 | M1_RECO_04 | Legacy ✅ |
| 5 | MT_V4_051 | Identifier zones incompréhension parcours | ORGA | Aidant 🤖 | 🤝 🤖 | M1_RECO_04 | Legacy ✅ |
| 6 | MT_V4_009 | Identifier points de divergence perçus | ORGA | Aidant 🤖 | 🤝 🤖 | M1_RECO_05 | Legacy ✅ |
| 7 | MT_V4_032 | Confirmer bonne compréhension du diagnostic | ORGA | IDEC 🤖 | 🤝 🤖 | M1_RECO_05 | Legacy ✅ |
| 8 | MT_V4_045 | Confirmer l'absence de contradiction perçue | ORGA | IDEC 🤖 | 🤝 🤖 | M1_RECO_05 | Legacy ✅ |
| 9 | MT_V4_050 | Noter que la situation n'est pas concernée | ORGA | IDEC 🤖 | 🤝 🤖 | M1_RECO_06 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_M1 | **Libellé** : « Y a-t-il eu des changements concernant : compréhension du diagnostic et de la maladie ? »
> **Si Oui →** réouvre : E34, E35, E36, E37, E38, N17, N41

---

## MP M2 — Accès aux soins et aux professionnels

### 🏆 ASR

> « Faciliter l'accès aux soins »
> **Signature A** : M2-A — RDV accessibles | **Signature B** : M2-B — Parcours fonctionnel

### 📍 MT Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_126 | Rechercher alternatives (autres praticiens, téléconst.) | MED | Prof. de santé 🤖 | 🏥 🤖 | M2_RECO_02 | Legacy ✅ |
| 2 | MT_V4_133 | Procédure RDV médecin spécialiste | MED | Spécialiste 🤖 | 🏥 🤖 | M2_RECO_02 | Legacy ✅ |
| 3 | MT_V4_085 | Vérifier implication du professionnel dans le suivi | SEC | IDEC 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 4 | MT_V4_094 | Proposer accompagnement prise de RDV | SEC | IDEC 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 5 | MT_V4_081 | Échanger sur les effets du suivi | SEC | IDEC 🤖 | 🤝 🤖 | M2_RECO_03 | Legacy ✅ |
| 6 | MT_V4_087 | Échanger sur les freins au suivi | SEC | IDEC 🤖 | 🤝 🤖 | M2_RECO_03 | Legacy ✅ |
| 7-23 | MT_V4_052-098 | **17 MTs « Prendre RDV spécialiste »** (pneumologue, ORL, gériatre, néphrologue, dentiste, oncologue, psychiatre, podologue, IDEL, neurologue, kiné, cardiologue, endocrinologue, gastro, dermatologue, ophtalmo) | SEC | IDEC 🤖 | 🤝 🤖 | M2_RECO_06 | Legacy ✅ |

**Condition de validation** : 23 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_110 | Informer sur dispositifs de prise en charge existants | INFO | Aidant 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 2 | MT_V4_120 | Faire le point avec proche et professionnels | INFO | IDEC 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 3 | MT_V4_116 | Expliquer principe et bénéfices de l'ETP | INFO | IDEC 🤖 | 🤝 🤖 | M2_RECO_03 | Legacy ✅ |
| 4 | MT_V4_026 | Évaluer difficultés éloignement géographique | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_01 | Legacy ✅ |
| 5 | MT_V4_005 | Confirmer absence difficulté accès soins | ORGA | IDEC 🤖 | 🏥 🤖 | M2_RECO_02 | Legacy ✅ |
| 6 | MT_V4_007 | Présenter solutions téléassistance | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 7 | MT_V4_016 | Confirmer accessibilité professionnels | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 8 | MT_V4_019 | Préciser la difficulté | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 9 | MT_V4_033 | Alerter professionnels référents | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 10 | MT_V4_039 | Évaluer besoins transport | ORGA | IDEC 🤖 | 🏥 🤖 | M2_RECO_02 | Legacy ✅ |
| 11 | MT_V4_044 | Identifier professionnels hors secteur | ORGA | Aidant 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 12 | MT_V4_046 | Identifier contraintes organisationnelles | ORGA | Aidant 🤖 | 🤝 🤖 | M2_RECO_02 | Legacy ✅ |
| 13 | MT_V4_011 | Raisons arrêt suivi | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_03 | Legacy ✅ |
| 14 | MT_V4_018 | Raisons refus ou report | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_03 | Legacy ✅ |
| 15 | MT_V4_024 | Valoriser participation ETP | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_03 | Legacy ✅ |
| 16 | MT_V4_037 | Valoriser participation groupes parole | ORGA | IDEC 🤖 | 🤝 🤖 | M2_RECO_03 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_M2 | **Libellé** : « Y a-t-il eu des changements concernant : accès aux soins et aux professionnels ? »
> **Si Oui →** réouvre : E39, E40, E41, N14, O17, O18, O19, O20, O21, O24

---

## MP M3 — Urgences, hospitalisations et continuité

### 🏆 ASR

> « Gérer les épisodes aigus »
> **Signature A** : M3-A — Plan d'urgence identifié | **Signature B** : M3-B — Contacts connus

### 📍 MT Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_123 | Vérifier mise en œuvre recommandations du bilan | MED | MT 🤖 | 🏥 🤖 | M3_RECO_03 | Legacy ✅ |
| 2 | MT_V4_127 | Informer intérêt consultation synthèse | MED | Prof. santé 🤖 | 🏥 🤖 | M3_RECO_03 | Legacy ✅ |
| 3 | MT_V4_130 | Identifier évolutions depuis dernier bilan | MED | MT 🤖 | 🏥 🤖 | M3_RECO_03 | Legacy ✅ |
| 4 | MT_V4_056 | Proposer temps synthèse médicale | SEC | IDEC 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 5 | MT_V4_061 | Vérifier continuité suivi médical | SEC | IDEC 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 6 | MT_V4_063 | Vérifier régularité suivi médical | SEC | IDEC 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 7 | MT_V4_065 | Proposer concertation ou synthèse médicale | SEC | IDEC 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 8 | MT_V4_067 | Confirmer stabilité suivi médical | SEC | IDEC 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 9 | MT_V4_078 | Proposer réévaluation plan de soins | SEC | IDEC 🤖 | 🏥 🤖 | M3_RECO_01 | Legacy ✅ |
| 10 | MT_V4_090 | Confirmer continuité suivi | SEC | IDEC 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 11 | MT_V4_097 | Raisons rupture suivi | SEC | IDEC 🤖 | 🤝 🤖 | M3_RECO_02 | Legacy ✅ |
| 12 | MT_V4_134 | Reprendre éléments sortie hospitalisation | STRUC | IDEC 🤖 | 🏥 🤖 | M3_RECO_04 | Legacy ✅ |
| 13 | MT_V4_137 | Noter absence hospitalisation récente | STRUC | IDEC 🤖 | 🏥 🤖 | M3_RECO_04 | Legacy ✅ |

**Condition de validation** : 13 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_118 | Vérifier respect RDV programmés | INFO | IDEC 🤖 | 🤝 🤖 | M3_RECO_04 | Legacy ✅ |
| 2 | MT_V4_004 | Situations ayant conduit aux RDV | ORGA | IDEC 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 3 | MT_V4_025 | Motif RDV imprévu | ORGA | Aidant 🤖 | 🤝 🤖 | M3_RECO_01 | Legacy ✅ |
| 4 | MT_V4_027 | Analyser récurrence urgences | ORGA | IDEC 🤖 | 🏥 🤖 | M3_RECO_01 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_M3 | **Libellé** : « Y a-t-il eu des changements concernant : urgences, hospitalisations et continuité ? »
> **Si Oui →** réouvre : E42, E43, E44, E46

---

## MP M4 — Troubles psychiques, addictions et suivi

### 🏆 ASR

> « Orienter vers un suivi adapté »
> **Signature A** : M4-A — Suivi actif | **Signature B** : M4-B — Accès direct à un spécialiste

### 📍 MT Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_122 | Vérifier régularité suivi et observance traitement | MED | Prof. santé 🤖 | 🏥 🤖 | M4_RECO_06 | Legacy ✅ |
| 2 | MT_V4_062 | Confirmer heures intervention SAD | SEC | IDEC 🤖 | 🤝 🤖 | M4_RECO_01 | Legacy ✅ |
| 3 | MT_V4_076 | Confirmer heures intervention SSIAD | SEC | IDEC 🤖 | 🤝 🤖 | M4_RECO_01 | Legacy ✅ |
| 4 | MT_V4_080 | Vérifier régularité suivi et adhésion | SEC | IDEC 🤖 | 🤝 🤖 | M4_RECO_01 | Legacy ✅ |
| 5 | MT_V4_100 | Analyser impact absence suivi | SEC | IDEC 🤖 | 🤝 🤖 | M4_RECO_01 | Legacy ✅ |
| 6 | MT_V4_066 | Vérifier modalités suivi post prise en charge | SEC | IDEC 🤖 | 🤝 🤖 | M4_RECO_04 | Legacy ✅ |
| 7 | MT_V4_082 | Suivre objectifs prise en charge | SEC | IDEC 🤖 | 🤝 🤖 | M4_RECO_04 | Legacy ✅ |
| 8 | MT_V4_099 | Vérifier continuité suivi psychiatrique | SEC | IDEC 🤖 | 🏥 🤖 | M4_RECO_04 | Legacy ✅ |
| 9 | MT_V4_059 | Vérifier fréquence et contenu suivi infirmier | SEC | IDEC 🤖 | 🏥 🤖 | M4_RECO_05 | Legacy ✅ |
| 10 | MT_V4_089 | Vérifier régularité suivi | SEC | IDEC 🤖 | 🤝 🤖 | M4_RECO_05 | Legacy ✅ |
| 11 | MT_V4_092 | Vérifier continuité suivi psy | SEC | Psychologue 🤖 | 🏥 🤖 | M4_RECO_05 | Legacy ✅ |

**Condition de validation** : 11 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_109 | Vérifier plan connu et à jour | INFO | IDEC 🤖 | 🤝 🤖 | M4_RECO_03 | Legacy ✅ |
| 2 | MT_V4_114 | Faire le point professionnels | INFO | IDEC 🤖 | 🤝 🤖 | M4_RECO_06 | Legacy ✅ |
| 3 | MT_V4_012 | Construire plan urgence personnalisé | ORGA | IDEC 🤖 | 🏥 🤖 | M4_RECO_03 | Legacy ✅ |
| 4 | MT_V4_030 | Identifier zones de flou conduite à tenir | ORGA | Aidant 🤖 | 🤝 🤖 | M4_RECO_03 | Legacy ✅ |
| 5 | MT_V4_031 | Explorer signes souffrance psychique | ORGA | Aidant 🤖 | 🤝 🤖 | M4_RECO_04 | Legacy ✅ |
| 6 | MT_V4_048 | Explorer situation avec aidant et proche | ORGA | Aidant 🤖 | 🤝 🤖 | M4_RECO_05 | Legacy ✅ |
| 7 | MT_V4_010 | Explorer besoins santé mentale | ORGA | Aidant 🤖 | 🏥 🤖 | M4_RECO_06 | Legacy ✅ |
| 8 | MT_V4_006 | Valoriser motivation exprimée | ORGA | IDEC 🤖 | 🤝 🤖 | M4_RECO_07 | Legacy ✅ |
| 9 | MT_V4_013 | Explorer conditions et réticences | ORGA | Aidant 🤖 | 🤝 🤖 | M4_RECO_07 | Legacy ✅ |
| 10 | MT_V4_017 | Rester disponible et maintenir lien | ORGA | IDEC 🤖 | 🤝 🤖 | M4_RECO_07 | Legacy ✅ |
| 11 | MT_V4_035 | Mieux comprendre la situation | ORGA | IDEC 🤖 | 🤝 🤖 | M4_RECO_07 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_M4 | **Libellé** : « Y a-t-il eu des changements concernant : troubles psychiques, addictions et suivi ? »
> **Si Oui →** réouvre : E45, E46, E47, E48, E49, E50, E51

---

## MP M5 — Coordination des soins

### 🏆 ASR

> « Mettre en place une coordination simple »
> **Signature A** : M5-A — Référent identifié | **Signature B** : M5-B — Coordination effective

### 📍 MT Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_129 | Confirmer rôle référent du MT | MED | MT 🤖 | 🏥 🤖 | M5_RECO_02 | Legacy ✅ |
| 2 | MT_V4_132 | Identifier champ intervention spécialiste | MED | Spécialiste 🤖 | 🏥 🤖 | M5_RECO_02 | Legacy ✅ |
| 3 | MT_V4_093 | RDV éducateur spécialisé ou CMP | SEC | IDEC 🤖 | 🤝 🤖 | M5_RECO_02 | Legacy ✅ |
| 4 | MT_V4_075 | Prioriser coordination comme axe majeur | SEC | IDEC 🤖 | 🤝 🤖 | M5_RECO_03 | Legacy ✅ |

**Condition de validation** : 4 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_102 | Expliquer rôle coordination soins | INFO | IDEC 🤖 | 🏥 🤖 | M5_RECO_01 | Legacy ✅ |
| 2 | MT_V4_105 | Vérifier coordination opérationnelle | INFO | IDEC 🤖 | 🤝 🤖 | M5_RECO_01 | Legacy ✅ |
| 3 | MT_V4_101 | Vérifier transmission infos médicales | INFO | IDEC 🤖 | 🤝 🤖 | M5_RECO_02 | Legacy ✅ |
| 4 | MT_V4_047 | Valoriser organisation actuelle soins | ORGA | IDEC 🤖 | 🏥 🤖 | M5_RECO_01 | Legacy ✅ |
| 5 | MT_V4_002 | Contact ergothérapeute territoire | ORGA | IDEC 🤖 | 🏥 🤖 | M5_RECO_02 | Legacy ✅ |
| 6 | MT_V4_049 | Identifier professionnel référent | ORGA | Aidant 🤖 | 🤝 🤖 | M5_RECO_02 | Legacy ✅ |
| 7 | MT_V4_021 | Coordination renforcée prioritaire | ORGA | IDEC 🤖 | 🤝 🤖 | M5_RECO_03 | Legacy ✅ |
| 8 | MT_V4_029 | Valoriser préparation et coordination | ORGA | IDEC 🤖 | 🤝 🤖 | M5_RECO_03 | Legacy ✅ |
| 9 | MT_V4_036 | Points amélioration coordination | ORGA | Aidant 🤖 | 🤝 🤖 | M5_RECO_03 | Legacy ✅ |
| 10 | MT_V4_041 | Analyser dysfonctionnements organisation | ORGA | IDEC 🤖 | 🤝 🤖 | M5_RECO_03 | Legacy ✅ |
| 11 | MT_V4_042 | Confirmer coordination suffisante | ORGA | IDEC 🤖 | 🤝 🤖 | M5_RECO_03 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_M5 | **Libellé** : « Y a-t-il eu des changements concernant : coordination des soins ? »
> **Si Oui →** réouvre : E52, E53, E55, O59

---

## MP M6 — Plan de soins, évaluations et inquiétudes

### 🏆 ASR

> « Structurer et sécuriser le parcours de soins »
> **Signature A** : M6-A — Plan de soins formalisé | **Signature B** : M6-B — Évaluations à jour

### 📍 MT Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_128 | Analyser causes passages urgences | MED | Prof. santé 🤖 | 🏥 🤖 | M6_RECO_02 | Legacy ✅ |
| 2 | MT_V4_125 | Vérifier conclusions consultation mémoire | MED | Prof. santé 🤖 | 🏥 🤖 | M6_RECO_04 | Legacy ✅ |
| 3 | MT_V4_070 | Orienter vers évaluation/suivi spécialisé | SEC | IDEC 🤖 | 🤝 🤖 | M6_RECO_02 | Legacy ✅ |
| 4 | MT_V4_088 | Temps d'échange explorer craintes | SEC | IDEC 🤖 | 🤝 🤖 | M6_RECO_02 | Legacy ✅ |
| 5 | MT_V4_072 | Identifier éléments manquants suivi | SEC | IDEC 🤖 | 🤝 🤖 | M6_RECO_03 | Legacy ✅ |
| 6 | MT_V4_071 | Vérifier si RDV prévu sinon planifier | SEC | IDEC 🤖 | 🤝 🤖 | M6_RECO_04 | Legacy ✅ |
| 7 | MT_V4_068 | Vérifier mise en œuvre suivi | SEC | IDEC 🤖 | 🤝 🤖 | M6_RECO_06 | Legacy ✅ |
| 8 | MT_V4_136 | Identifier référent au sein structure | STRUC | IDEC 🤖 | 🤝 🤖 | M6_RECO_06 | Legacy ✅ |

**Condition de validation** : 8 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V4_106 | Point alimentation/poids | INFO | IDEC 🤖 | 🤝 🤖 | M6_RECO_02 | Legacy ✅ |
| 2 | MT_V4_115 | Vérifier plan soins à jour | INFO | IDEC 🤖 | 🏥 🤖 | M6_RECO_03 | Legacy ✅ |
| 3 | MT_V4_108 | Informer intérêt évaluations gériatriques | INFO | Aidant 🤖 | 🤝 🤖 | M6_RECO_04 | Legacy ✅ |
| 4 | MT_V4_111 | Vérifier prise en compte recommandations | INFO | IDEC 🤖 | 🤝 🤖 | M6_RECO_04 | Legacy ✅ |
| 5 | MT_V4_112 | Vérifier avancée évaluation spécialisée | INFO | IDEC 🤖 | 🤝 🤖 | M6_RECO_04 | Legacy ✅ |
| 6 | MT_V4_103-121 | **6 MTs INFO** : points famille/profe., courrier DAC/CPTS, évaluation, position liste attente, informer famille | INFO | IDEC/Aidant 🤖 | 🤝 🤖 | M6_RECO_05 | Legacy ✅ |
| 7 | MT_V4_119 | Informer parcours évaluation possibles | INFO | Aidant 🤖 | 🤝 🤖 | M6_RECO_06 | Legacy ✅ |
| 8 | MT_V4_001 | Identifier points complexité organisation | ORGA | Aidant 🤖 | 🤝 🤖 | M6_RECO_01 | Legacy ✅ |
| 9 | MT_V4_014 | Évaluer pertinence chaque acteur | ORGA | IDEC 🤖 | 🤝 🤖 | M6_RECO_02 | Legacy ✅ |
| 10 | MT_V4_040 | Évaluer niveau autonomie | ORGA | IDEC 🤖 | 🤝 🤖 | M6_RECO_02 | Legacy ✅ |
| 11 | MT_V4_043 | Préciser préoccupation | ORGA | IDEC 🤖 | 🤝 🤖 | M6_RECO_02 | Legacy ✅ |
| 12 | MT_V4_015 | Zones de flou suite parcours | ORGA | Aidant 🤖 | 🤝 🤖 | M6_RECO_03 | Legacy ✅ |
| 13 | MT_V4_038 | Élaborer plan soins personnalisé | ORGA | IDEC 🤖 | 🏥 🤖 | M6_RECO_03 | Legacy ✅ |
| 14 | MT_V4_008 | Évaluer risque chute domicile | ORGA | IDEC 🤖 | 🏥 🤖 | M6_RECO_04 | Legacy ✅ |
| 15 | MT_V4_020 | Type évaluation réalisée | ORGA | Aidant 🤖 | 🤝 🤖 | M6_RECO_04 | Legacy ✅ |
| 16 | MT_V4_022 | Échanger famille évolution | ORGA | IDEC 🤖 | 🤝 🤖 | M6_RECO_06 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_M6 | **Libellé** : « Y a-t-il eu des changements concernant : plan de soins, évaluations et inquiétudes ? »
> **Si Oui →** réouvre : E54, E56, E57, E58, E59, E60

---

## Légende

| Badge | Signification |
|---|---|
| Legacy ✅ | MT et libellé issus du CAT Excel — validés |
| 🤖 | Acteur et domaine proposés par l'IA — **à valider par Dr. Monka** |

> ⚠️ **À VALIDER PAR DR. MONKA** : Les colonnes Acteur et Domaine sont des propositions IA. Les libellés et types de MT sont 100% legacy.
