# 🌐 Écosystème Acteurs — V3 Santé de l'Aidant

> **Source DB** : 38 MT × 4 MP (S1-S4) — Supabase `mbxeqrvofrmhqlwlefff`  
> **Source référentiel** : `ACTEURS_CAT_EXHAUSTIF.md` — 60 acteurs canoniques  
> **Date** : 17/02/2026  
> **Principe** : Aidant **full autonome** (K7). Les acteurs = écosystème mobilisable.

---

## Acteurs V3 — Vue d'ensemble

V3 est la vulnérabilité la plus **médicale côté aidant** — c'est SA santé qui est en jeu, pas celle du proche. L'écosystème est un mix médical (MT, spécialistes) + médico-social (SAD, répit, psy).

| # | Acteur | Catégorie | MPs concernés | Rôle dans V3 |
|---|---|---|---|---|
| 1 | **Médecin traitant** | Médecin généraliste | S1, S3, S4 | Bilan de santé, bilan médication, orientation spécialistes, certificats |
| 2 | **IDEC** | Coordination | S1, S2 | Évaluation charge, coordination SAD, suivi situation |
| 3 | **SAD** (Service d'Aide à Domicile) | Service à domicile | S1, S2 | Relais au domicile — urgence quand rupture imminente |
| 4 | **Plateforme de répit** | Structure de répit | S1 | Relais complémentaire au SAD |
| 5 | **Psychologue** | Paramédical | S2 | Soutien psychologique, groupe de parole |
| 6 | **CMP** (Centre Médico-Psychologique) | Structure santé mentale | S2 | RDV infirmier en cas d'inquiétudes sécuritaires |
| 7 | **Assistante sociale** | Travailleur social | S1 | Ajustement des aides, bilan droits |
| 8 | **DAC** (Dispositif d'Aide à la Coordination) | Institution | S3 | Accès médecin traitant (territoire en désert médical) |
| 9 | **CPTS** (Communauté Pro Territoriale Santé) | Institution | S3 | Idem DAC — orientation MT |
| 10 | **CPAM** | Institution | S3 | Droits transport, accès soins |
| 11 | **Pharmacien** | Paramédical | S3 | Bilan médication (polymédication ≥7) |
| 12 | **Dermatologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 13 | **Gynécologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 14 | **Cardiologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 15 | **Oncologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 16 | **Endocrinologue-Diabétologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 17 | **Pneumologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 18 | **Neurologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 19 | **Gériatre** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 20 | **Ophtalmologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 21 | **ORL** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 22 | **Psychiatre** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 23 | **Gastro-entérologue** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 24 | **Chirurgien-dentiste** | Spécialiste | S3 | Suivi spécialisé (MT paramétrique) |
| 25 | **Structures d'activité physique adaptée** | Structure locale | S4 | Sport santé, marche, yoga adapté |
| 26 | **Ligne 3114** | Service d'urgence | S2 | Numéro national prévention suicide — mentionné dans wording |
| 27 | **SSIAD** | Service à domicile | S1, S2 | Service de Soins Infirmiers À Domicile — soins de nursing |
| 28 | **Aide-soignant** | Paramédical | S1 | Intervenant SSIAD/SAD — soins quotidiens |
| 29 | **Auxiliaire de vie** | Service à domicile | S1, S2 | Intervenant SAD — aide actes de la vie quotidienne |
| 30 | **Mutuelle** | Organisme privé | S3 | Prise en charge complémentaire soins / restes à charge |
| 31 | **Urgences** | Service hospitalier | S2 | Si dégradation grave (passage urgences, hospitalisation) |
| 32 | **Pompiers / SAMU** | Service d'urgence | S2 | Appel d'urgence si mise en danger |
| 33 | **Médecin du travail** | Médecin spécialisé | S1 | Aménagement travail si aidant épuisé (cross-V1) |
| 34 | **Aidant** | Non-professionnel | S1-S4 | Acteur autonome central |

---

## MP S1 — Charge, fatigue et risque d'épuisement

**🏆 ASR** : L'aidant a des relais en place et sa charge est soutenable.

### Catégorie S1_CAT_01 — Évaluation et soutien face à l'épuisement

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_004 | Échange vécu émotionnel | SEC | 📍 | **IDEC** (écoute pro), **Psychologue** (si orientation nécessaire) |
| MT_V3_032 | Évaluer charge mentale | INFO | 💡 | **Aidant** (auto-évaluation), **IDEC** (aide au diagnostic charge) |
| MT_V3_014 | Difficultés organisation | ORGA | 💡 | **Aidant** (identification des frictions quotidiennes) |

> **Questions déclenchantes** : E7 (fatigue), E11 (capacité à continuer), E12 (risque pour le proche), E13 (risque pour autrui), O49 (durée aidance), O29 (retentissement santé), O33 (charge ressentie), E10 (détresse), O32 (souhait d'aide)  
> **Alerte critique** : E12=Oui souvent ou E13=Oui → risque vital immédiat → cross-MP S2

---

### Catégorie S1_CAT_02 — Mise en place de relais (aide à domicile)

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_NEW_01 | Recherche SAD territoire | ORGA | 💡 | **SAD** — inventaire des services disponibles localement |
| MT_V3_NEW_02 | Première intervention SAD | SEC | 📍 | **SAD** (intervention), **IDEC** (coordination mise en place) |
| MT_V3_NEW_03 | Plateforme de répit | SEC | 📍 | **Plateforme de répit** — baluchonnage, accueil de jour, répit |

> **Sens clinique** : E7=épuisé + E11=ne plus y arriver → relais SAD en urgence. E14≥4 jours d'arrêt → pattern installé. O50>10h/sem d'aide → relais nécessaire.

---

### Catégorie S1_CAT_03 — Accès aux aides et ajustement

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_031 | Contacter l'AS | INFO | 💡 | **Assistante sociale** — ajustement des aides en place |

> **Sens clinique** : O33=charge ressentie + O32=demande d'aide → les aides actuelles ne suffisent pas → AS pour réévaluer.

---

## MP S2 — Inquiétudes pour la sécurité

**🏆 ASR** : Les risques sécuritaires sont identifiés et des relais professionnels sont en place.

### Catégorie S2_CAT_01 — Sécurisation par aide à domicile

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_005 | Confirmer heures SAD | SEC | 📍 | **SAD** (confirmation volume d'heures), **IDEC** (coordination) |

> **Questions déclenchantes** : E8 (isolement souvent/tout le temps) + E9 (pas de temps pour soi)

---

### Catégorie S2_CAT_02 — Intervention médico-sociale renforcée

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_002 | Suivi mise en place intervention | SEC | 📍 | **IDEC** (suivi chat/mail) |
| MT_V3_003 | Contacter CMP pour RDV infirmier | SEC | 📍 | **CMP** (Centre Médico-Psychologique — RDV infirmier de secteur) |
| MT_V3_006 | Temps d'échange point situation | SEC | 📍 | **IDEC** (point de situation) |
| MT_V3_011 | Tracer situation CRM | ORGA | 💡 | **IDEC** (documentation) |
| MT_V3_012 | Identifier contextes déclenchants | ORGA | 💡 | **Aidant** (repérage des situations déclenchantes) |

> **Sens clinique** : E8=souvent isolé + E12=inquiétudes intermittentes ou E13=danger intermittent → CMP = acteur clé. Le CMP envoie un infirmier de secteur pour évaluation.

---

### Catégorie S2_CAT_03 — Soutien psychologique

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_001 | Prendre RDV psy / groupe de parole | SEC | 📍 | **Psychologue**, **Structures de soutien aux aidants** (groupes de parole), **Ligne 3114** (prévention suicide) |
| MT_V3_010 | Noter isolement ponctuel | ORGA | 💡 | **IDEC** (surveillance évolution) |
| MT_V3_S2_INFO_01 | Info dispositifs psy disponibles | INFO | 💡 | **Psychologue**, **Structures de soutien aux aidants**, **Ligne 3114**, **CMP** |

> **Sens clinique** : E8=isolement sévère + E9=pas de récupération → soutien psy prioritaire.

---

## MP S3 — Santé physique et renoncement aux soins

**🏆 ASR** : L'aidant a repris un suivi médical régulier (MT + spécialistes).

### Catégorie S3_CAT_01 — Bilan de santé global et sommeil

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_020 | Contacter MT pour bilan de santé | MED | 📍 | **Médecin traitant** — bilan complet |
| MT_V3_008 | Respecter la non-réponse | ORGA | 💡 | **Aidant** (liberté de ne pas répondre) |

> **Questions déclenchantes** : O44 (santé perçue moins bonne), E18 (qualité sommeil mauvaise/très mauvaise), O40 (aucun RDV médical cette année)

---

### Catégorie S3_CAT_02 — Accès au médecin traitant

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_033 | Informer dispositifs accès aux soins | INFO | 💡 | **DAC** (Dispositif d'Aide à la Coordination), **CPTS** (Communauté Professionnelle Territoriale de Santé), **CPAM** — courrier pour trouver un MT |

> **Questions déclenchantes** : O37 (pas de MT déclaré)  
> **Sens clinique** : Aidant sans MT = sans filet médical. DAC/CPTS/CPAM sont les relais pour les déserts médicaux.

---

### Catégorie S3_CAT_03 — Suivi spécialisé et médication

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_015 | RDV Dermatologue | MED | 📍 | **Dermatologue** |
| MT_V3_016 | RDV Gynécologue | MED | 📍 | **Gynécologue** |
| MT_V3_017 | RDV Cardiologue | MED | 📍 | **Cardiologue** |
| MT_V3_021 | RDV Oncologue | MED | 📍 | **Oncologue** |
| MT_V3_022 | RDV Endocrino-Diabétologue | MED | 📍 | **Endocrinologue-Diabétologue** |
| MT_V3_023 | RDV Pneumologue | MED | 📍 | **Pneumologue** |
| MT_V3_024 | RDV Neurologue | MED | 📍 | **Neurologue** |
| MT_V3_025 | RDV Gériatre | MED | 📍 | **Gériatre** |
| MT_V3_026 | RDV Ophtalmologue | MED | 📍 | **Ophtalmologue** |
| MT_V3_027 | RDV ORL | MED | 📍 | **ORL** |
| MT_V3_028 | RDV Psychiatre | MED | 📍 | **Psychiatre** |
| MT_V3_029 | RDV Gastro-entérologue | MED | 📍 | **Gastro-entérologue** |
| MT_V3_030 | RDV Chirurgien-dentiste | MED | 📍 | **Chirurgien-dentiste** |
| MT_V3_018 | Orienter vers le MT | MED | 📍 | **Médecin traitant** — suivi généraliste |
| MT_V3_019 | Bilan de médication | MED | 📍 | **Médecin traitant**, **Pharmacien** (bilan médicamenteux partagé si ≥7 médicaments) |

> **Particularité S3** : Les 13 MT spécialistes sont **paramétriques** (`is_parametric=true`). Le moteur active dynamiquement le bon spécialiste selon le profil de l'aidant (via les réponses aux questions de suivi santé). Chaque MT = 1 spécialiste = 1 acteur distinct.
>
> **Questions déclenchantes** : O44+E18 (CCC — santé dégradée + mauvais sommeil), O43 (polymédication ≥7)

---

## MP S4 — Hygiène de vie (activité et sommeil)

**🏆 ASR** : L'aidant a repris un suivi médical et une activité physique régulière.

### Catégorie S4_CAT_01 — Reprise du suivi médical

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_S4_001 | Prendre RDV avec MT pour bilan | MED | 📍 | **Médecin traitant** — bilan de santé complet |
| MT_V3_S4_002 | Info aides accès aux soins | INFO | 💡 | **CPAM** (transport), **Plateforme de répit** (garde relais pendant RDV), **SAD** (relais domicile) |

> **Questions déclenchantes** : E15 (difficultés accès soins), E16 (report/annulation RDV)  
> **Sens clinique** : Renoncement actif aux soins (E15=Oui + E16=report souvent) = CCC. Freins fréquents chez les aidants : pas de temps, pas de relais pour le proche pendant le RDV.

---

### Catégorie S4_CAT_02 — Activité physique et bien-être

| MT_ID | Libellé | Type | 📍 | Acteurs écosystème |
|---|---|---|---|---|
| MT_V3_S4_003 | Reprendre activité physique adaptée | SEC | 📍 | **Structures d'activité physique adaptée** (associations sportives, sport santé), **Médecin traitant** (si prescription APA) |
| MT_V3_S4_004 | Info activités physiques locales | INFO | 💡 | **Structures d'activité physique adaptée**, mairies, associations locales |

> **Questions déclenchantes** : E17 (absence d'activité physique régulière)

---

## Matrice de couverture — Acteurs × MP

| Acteur | S1 | S2 | S3 | S4 | Nb MT |
|---|---|---|---|---|---|
| **Aidant** (autonome) | ✅ | ✅ | ✅ | ✅ | 38 (toutes) |
| **Médecin traitant** | — | — | ✅ bilan + médication | ✅ bilan santé | 5 MT |
| **IDEC** | ✅ écoute, coordination | ✅ suivi, CRM | — | — | ~10 MT |
| **SAD** | ✅ relais urgence | ✅ heures | — | ✅ relais RDV | 4 MT |
| **13 Spécialistes** (paramétriques) | — | — | ✅ RDV individuels | — | 13 MT |
| **Psychologue** | ✅ via IDEC | ✅ RDV / groupe | — | — | 2 MT |
| **CMP** | — | ✅ infirmier secteur | — | — | 2 MT |
| **Plateforme de répit** | ✅ répit | — | — | ✅ garde relais | 2 MT |
| **Assistante sociale** | ✅ ajustement aides | — | — | — | 1 MT |
| **DAC / CPTS** | — | — | ✅ accès MT | — | 1 MT |
| **CPAM** | — | — | ✅ droits | ✅ transport | 2 MT |
| **Pharmacien** | — | — | ✅ bilan médication | — | 1 MT |
| **Ligne 3114** | — | ✅ urgence psy | — | — | 1 MT |
| **Structures sport adapté** | — | — | — | ✅ APA | 2 MT |

---

## Spécificité V3 — L'écosystème santé de l'aidant

> **34 acteurs** identifiés dans l'écosystème V3 après audit contre le référentiel CAT (60 acteurs) — la plus riche en diversité d'acteurs grâce aux **13 spécialistes paramétriques** de S3_CAT_03. C'est la seule vulnérabilité qui adresse directement la santé de l'aidant (pas celle du proche). L'aidant reste **full autonome** (K7).
>
> **Architecture S3** : Le MP S3 est unique dans le moteur — il contient des MT paramétriques qui dispatchent dynamiquement vers le bon spécialiste. Chaque spécialiste n'est activé que si le profil de santé de l'aidant le justifie.
