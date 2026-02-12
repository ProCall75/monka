# 📄 TEMPLATE C — Master MT & ASR — V3 Santé de l'Aidant

> **Vulnérabilité** : V3 — Santé de l'Aidant
> **Date de production** : 11/02/2026
> **Statut** : 🟡 Données mixtes — MTs legacy, domaine/acteur proposés par IA
> **Règles KERNEL** : K9, K10, K11, K12
> **Rôle** : SOURCE DE VÉRITÉ pour les MT

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V3 — Santé de l'Aidant |
| Nombre de MP | 4 |
| Nombre total de MT | 34 |
| dont 📍 contributives (STRUC/SEC/MED) | 22 |
| dont 💡 non-contributives (INFO/ORGA) | 12 |

### Répartition par type

| Type | Code | Catégorie | Count |
|---|---|---|---|
| Médical | MED | 📍 Sécurisation | 16 |
| Sécurité | SEC | 📍 Sécurisation | 6 |
| Structurel | STRUC | 📍 Sécurisation | 0 |
| Information | INFO | 💡 Amélioration | 4 |
| Organisationnel | ORGA | 💡 Amélioration | 8 |

---

## MP S1 — Charge, fatigue et risque d'épuisement

### 🏆 ASR

> « Repérer la surcharge et prévenir l'épuisement »
> **Signature A** : S1-A — Relais réduisant la charge | **Signature B** : S1-B — Organisation allégeant le quotidien

### 📍 MT Contributives — Actions de Sécurisation

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V3_004 | Proposer un échange avec l'aidant pour évaluer le vécu émotionnel | SEC | IDEC 🤖 | 🤝 Médico-social 🤖 | S1_RECO_01 | Legacy ✅ |

**Condition de validation** : 1 MT contributive → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives — Actions d'Amélioration

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V3_032 | Contacter l'aidant pour évaluer la charge mentale | INFO | IDEC 🤖 | 🤝 🤖 | S1_RECO_01 | Legacy ✅ |
| 2 | MT_V3_014 | Échanger sur les difficultés d'organisation | ORGA | IDEC 🤖 | 🤝 🤖 | S1_RECO_01 | Legacy ✅ |
| 3 | MT_V3_031 | Rappeler à l'aidant de contacter l'AS | INFO | IDEC 🤖 | 🤝 🤖 | S1_RECO_03 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_S1 | **Libellé** : « Y a-t-il eu des changements concernant : charge, fatigue et risque d'épuisement ? »
> **Si Oui →** réouvre : E10, E11, E14, E7, N8, O29, O32, O33, O50

---

## MP S2 — Inquiétudes pour la sécurité

### 🏆 ASR

> « Réduire les risques graves »
> **Signature A** : S2-A — Soutien par l'entourage | **Signature B** : S2-B — Accompagnement professionnel engagé

### 📍 MT Contributives — Actions de Sécurisation

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V3_005 | Confirmer avec l'aidant le nombre d'heures envisagées pour le SAD | SEC | IDEC 🤖 | 🤝 🤖 | S2_RECO_01 | Legacy ✅ |
| 2 | MT_V3_002 | Suivi IDEC de la mise en place de l'intervention (via chat/mail) | SEC | IDEC 🤖 | 🤝 🤖 | S2_RECO_02 | Legacy ✅ |
| 3 | MT_V3_003 | Contacter le CMP de secteur pour prise de contact et RDV infirmier | SEC | IDEC 🤖 | 🏥 Medical 🤖 | S2_RECO_02 | Legacy ✅ |
| 4 | MT_V3_006 | Proposer un temps d'échange pour faire le point | SEC | IDEC 🤖 | 🤝 🤖 | S2_RECO_02 | Legacy ✅ |
| 5 | MT_V3_001 | Orienter vers un soutien psychologique | SEC | Psychologue 🤖 | 🏥 🤖 | S2_RECO_03 | Legacy ✅ |

**Condition de validation** : 5 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives — Actions d'Amélioration

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V3_011 | Tracer la situation comme stable dans le dossier (CRM) | ORGA | IDEC 🤖 | 🤝 🤖 | S2_RECO_02 | Legacy ✅ |
| 2 | MT_V3_012 | Identifier les situations ou contextes déclenchants | ORGA | Aidant 🤖 | 🤝 🤖 | S2_RECO_02 | Legacy ✅ |
| 3 | MT_V3_010 | Noter un isolement ponctuel | ORGA | IDEC 🤖 | 🤝 🤖 | S2_RECO_03 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_S2 | **Libellé** : « Y a-t-il eu des changements concernant : inquiétudes pour la sécurité ? »
> **Si Oui →** réouvre : E12, E13, E8, E9

---

## MP S3 — Santé physique et renoncement aux soins

### 🏆 ASR

> « Protéger votre santé »
> **Signature A** : S3-A — Suivi médical repris | **Signature B** : S3-B — Démarche de soin engagée

### 📍 MT Contributives — Actions de Sécurisation

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V3_015 | Prendre RDV avec Dermatologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 2 | MT_V3_016 | Prendre RDV avec Gynécologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 3 | MT_V3_017 | Prendre RDV avec Cardiologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 4 | MT_V3_021 | Prendre RDV avec Oncologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 5 | MT_V3_022 | Prendre RDV avec Endocrinologue-Diabétologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 6 | MT_V3_023 | Prendre RDV avec Pneumologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 7 | MT_V3_024 | Prendre RDV avec Neurologue | MED | Médecin spécialiste 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 8 | MT_V3_025 | Prendre RDV avec Gériatre | MED | Médecin spécialiste 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 9 | MT_V3_026 | Prendre RDV avec Ophtalmologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 10 | MT_V3_027 | Prendre RDV avec ORL | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 11 | MT_V3_028 | Prendre RDV avec Psychiatre | MED | Médecin spécialiste 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 12 | MT_V3_029 | Prendre RDV avec Gastro-Entérologue | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 13 | MT_V3_030 | Prendre RDV avec Chirurgien-dentiste | MED | Professionnel de santé 🤖 | 🏥 🤖 | S3_RECO_03 | Legacy ✅ |
| 14 | MT_V3_020 | Contacter le médecin traitant pour bilan de santé | MED | Médecin traitant 🤖 | 🏥 🤖 | S3_RECO_04 | Legacy ✅ |
| 15 | MT_V3_018 | Orienter vers le médecin traitant | MED | Médecin traitant 🤖 | 🏥 🤖 | S3_RECO_05 | Legacy ✅ |
| 16 | MT_V3_019 | Contacter le MT pour bilan de médication | MED | Médecin traitant 🤖 | 🏥 🤖 | S3_RECO_05 | Legacy ✅ |

**Condition de validation** : 16 MT contributives → 100% = **ASR validée** ✅

### 💡 MT Non-Contributives — Actions d'Amélioration

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V3_033 | Informer sur les dispositifs d'accès aux soins (courrier DAC/CPTS) | INFO | Aidant 🤖 | 🏥 🤖 | S3_RECO_02 | Legacy ✅ |
| 2 | MT_V3_008 | Respecter la non-réponse sans insistance | ORGA | IDEC 🤖 | 🤝 🤖 | S3_RECO_04 | Legacy ✅ |

### Question de suivi N3
> **ID** : S_S3 | **Libellé** : « Y a-t-il eu des changements concernant : santé physique et renoncement aux soins ? »
> **Si Oui →** réouvre : E18, O37, O38, O39, O40, O41, O42, O43, O44

---

## MP S4 — Hygiène de vie (activité et sommeil)

### 🏆 ASR

> « Améliorer votre récupération »
> **Signature A** : S4-A — Amélioration du repos | **Signature B** : S4-B — Organisation quotidienne soutenable

### 📍 MT Contributives — Actions de Sécurisation

*Aucune MT contributive pour ce MP.*

### 💡 MT Non-Contributives — Actions d'Amélioration

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco | Source |
|---|---|---|---|---|---|---|---|
| 1 | MT_V3_007 | Évaluer le risque immédiat ou latent | ORGA | IDEC 🤖 | 🤝 🤖 | S4_RECO_01 | Legacy ✅ |
| 2 | MT_V3_009 | IDEC transmet à l'aidant pour choix et prise de contact | ORGA | IDEC 🤖 | 🤝 🤖 | S4_RECO_01 | Legacy ✅ |
| 3 | MT_V3_013 | IDEC contacte les SAD du territoire pour disponibilité + devis | ORGA | IDEC 🤖 | 🤝 🤖 | S4_RECO_01 | Legacy ✅ |

> ⚠️ **MP S4** : uniquement des MTs ORGA (non-contributives). L'ASR ne peut pas être validée par des MTs — nécessite une règle complémentaire ou un ajustement.

### Question de suivi N3
> **ID** : S_S4 | **Libellé** : « Y a-t-il eu des changements concernant : hygiène de vie (activité et sommeil) ? »
> **Si Oui →** réouvre : E15, E16, E17, E19

---

## Légende

| Badge | Signification |
|---|---|
| Legacy ✅ | MT et libellé issus du CAT Excel — validés |
| 🤖 | Acteur et domaine proposés par l'IA — **à valider par Dr. Monka** |

> ⚠️ **À VALIDER PAR DR. MONKA** : Les colonnes Acteur et Domaine sont des propositions IA. Les libellés et types de MT sont 100% legacy.
