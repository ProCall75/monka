# 📄 TEMPLATE B — Recommandations & Variations — V3 Santé de l'Aidant

> **Vulnérabilité** : V3 — Santé de l'Aidant
> **Date de production** : 11/02/2026
> **Statut** : 🟡 Mixte — legacy + ia_reformulé
> **Dépendance** : Template A (niveaux d'activation)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V3 — Santé de l'Aidant |
| Nombre de MP | 4 |
| Nombre total de recos | 14 |
| Recos legacy | 8 |
| Recos ia_reformulé | 6 |

---

## MP S1 — Charge, fatigue et risque d'épuisement (4 recos)

### 🟠 CCC

| # | Reco ID | Texte utilisateur | Actions IDEC | Source |
|---|---|---|---|---|
| 1 | S1_RECO_02 | Sollicité un service d'aide à domicile pour prendre le relais | Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD | Legacy ✅ |

### 🟢 Standard

| # | Reco ID | Texte utilisateur | Actions IDEC | Source |
|---|---|---|---|---|
| 2 | S1_RECO_01 | Discutez des difficultés d'être aidant avec l'IDEC | Contacter l'aidant pour évaluer la charge mentale | ia_reformulé |
| 3 | S1_RECO_03 | Demandez à ajuster les demandes d'aide | Rappeler à l'aidant de contacter l'AS | ia_reformulé |
| 4 | S1_RECO_04 | Contactez la plateforme de répit de votre territoire | Mettre en lien avec la plateforme de répit locale. Évaluer le besoin de relais | Legacy ✅ |

### MTs rattachées

| Reco | MTs | Types |
|---|---|---|
| S1_RECO_01 | 3 | SEC(1), INFO(1), ORGA(1) |
| S1_RECO_03 | 1 | INFO(1) |

---

## MP S2 — Inquiétudes pour la sécurité (4 recos)

### 🟠 CCC

| # | Reco ID | Texte utilisateur | Actions IDEC | Source |
|---|---|---|---|---|
| 1 | S2_RECO_04 | Sollicité un service d'aide à domicile pour prendre le relais | Confirmer le nombre d'heures pour l'intervention du SAD | Legacy ✅ |
| 2 | S2_RECO_03 | Envisager un soutien psychologique | Noter un isolement ponctuel | ia_reformulé |

### 🟢 Standard

| # | Reco ID | Texte utilisateur | Actions IDEC | Source |
|---|---|---|---|---|
| 3 | S2_RECO_02 | Demandez une intervention médico-sociale renforcée | Contacter le CMP de secteur pour prise de contact et RDV infirmier | ia_reformulé |
| 4 | S2_RECO_01 | Sollicité un SAD pour assurer la sécurité du proche | Confirmer le nombre d'heures pour l'intervention du SAD | Legacy ✅ |

### MTs rattachées

| Reco | MTs | Types |
|---|---|---|
| S2_RECO_01 | 1 | SEC(1) |
| S2_RECO_02 | 5 | SEC(3), ORGA(2) |
| S2_RECO_03 | 2 | SEC(1), ORGA(1) |

---

## MP S3 — Santé physique et renoncement aux soins (5 recos)

### 🟠 CCC

| # | Reco ID | Texte utilisateur | Actions IDEC | Source |
|---|---|---|---|---|
| 1 | S3_RECO_01 | Prendre RDV avec le médecin traitant pour échanger sur vos troubles du sommeil | Contacter le MT pour bilan de santé | Legacy ✅ |
| 2 | S3_RECO_02 | Bénéficiez d'un accompagnement d'accès aux soins (Médecin traitant…) | Informer sur les dispositifs d'accès aux soins (courrier DAC/CPTS) | Legacy ✅ |
| 3 | S3_RECO_03 | Un suivi régulier est à prévoir selon les préconisations du médecin | Prendre RDV avec les spécialistes selon dernière consultation | Legacy ✅ |
| 4 | S3_RECO_04 | Demandez un bilan de santé | Contacter le médecin traitant pour bilan de santé | Legacy ✅ |
| 5 | S3_RECO_05 | Prendre RDV avec votre médecin traitant pour bilan | Contacter le MT pour bilan de médication | Legacy ✅ |

### MTs rattachées

| Reco | MTs | Types |
|---|---|---|
| S3_RECO_02 | 1 | INFO(1) |
| S3_RECO_03 | 13 | MED(13) — 1 RDV par spécialité |
| S3_RECO_04 | 2 | MED(1), ORGA(1) |
| S3_RECO_05 | 2 | MED(2) |

---

## MP S4 — Hygiène de vie (1 reco)

### 🟠 CCC

| # | Reco ID | Texte utilisateur | Actions IDEC | Source |
|---|---|---|---|---|
| 1 | S4_RECO_01 | Prendre RDV avec le médecin traitant pour bilan de santé | Contacter le MT pour bilan de santé | Legacy ✅ |

### MTs rattachées

| Reco | MTs | Types |
|---|---|---|
| S4_RECO_01 | 3 | ORGA(3) |

---

## Légende

| Badge | Signification |
|---|---|
| Legacy ✅ | Reco issue du CAT Excel — validée |
| ia_reformulé | Reformulation IA — à valider par Dr. Monka |
