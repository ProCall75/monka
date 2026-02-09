# 📝 Questions V3 — Santé Physique et Psychologique de l'Aidant

> **Source** : `SOURCES/extracted/Questionnaire_validé.xlsx_extracted.json` + `recommendations_complete.json`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé Physique et Psychologique de l'Aidant"
bloc: "Bloc 6 – Votre santé"
source: "recommendations_complete.json"
extraction_date: "2026-02-06"
total_questions: 27
```

---

## 🗂️ Structure des Questions

### Section 6.1 — Impact du rôle d'aidant sur la santé

---

#### O29 — Retentissement santé

**Libellé** : Vous occuper de la personne aidée a-t-il un retentissement sur votre santé (physique et/ou psychique) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Pas du tout | 0 | ✅ |
| 2 | Un peu | 1 | ⚠️ |
| 3 | Oui | 2 | 🔴 |

**⚠️ Scorante**

---

#### O33 — Charge ressentie

**Libellé** : Ressentez-vous une charge en vous occupant de cette personne ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Pas du tout | 0 | ✅ |
| 2 | Un peu | 1 | ⚠️ |
| 3 | Oui | 2 | 🔴 |

**⚠️ Scorante**

---

#### E7 — Épuisement

**Libellé** : Comment vous sentez-vous en général ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Pas du tout fatigué·e | 0 | ✅ |
| 2 | Un peu fatigué·e | 1 | ⚠️ |
| 3 | Très fatigué·e | 2 | 🔴 |
| 4 | Épuisé·e / au bord de craquer | 2 | 🔴 CCC S1 |

**⚠️ Scorante + CCC S1**

---

#### E8 — Solitude émotionnelle

**Libellé** : Vous sentez-vous seul·e face à votre rôle d'aidant ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Jamais | 0 | ✅ |
| 2 | Parfois | 1 | ⚠️ |
| 3 | Souvent | 2 | 🔴 CCC S2 |
| 4 | Tout le temps | 2 | 🔴 CCC S2 |

**⚠️ Scorante + CCC S2**

---

#### E9 — Temps pour soi

**Libellé** : Avez-vous suffisamment de temps pour vous ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Oui | 0 | ✅ |
| 2 | Non | 2 | 🔴 CCC S2 |

**⚠️ Scorante + Déclenchante + CCC S2**

---

#### E10 — Stress / moral

**Libellé** : Comment décririez-vous votre niveau de stress ou votre moral ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Ça va | 0 | ✅ |
| 2 | Parfois stressé·e ou triste | 1 | ⚠️ |
| 3 | Souvent stressé·e | 2 | 🔴 |
| 4 | Débordé·e / découragé·e | 2 | 🔴 |

**⚠️ Scorante**

---

#### E11 — Capacité à continuer

**Libellé** : Pensez-vous pouvoir continuer à aider cette personne dans les mois à venir ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Oui, sans difficulté | 0 | ✅ |
| 2 | Oui, mais c'est difficile | 1 | ⚠️ |
| 3 | Je ne suis pas sûr·e | 2 | 🔴 CCC S1 |
| 4 | Non, je risque de ne plus y arriver | 2 | 🔴 CCC S1 Critique |

**⚠️ Scorante + CCC S1**

---

### Section 6.2 — État de santé perçu

---

#### O44 — Santé perçue

**Libellé** : Par rapport à l'an dernier, votre santé est-elle ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Meilleure | 0 | ✅ |
| 2 | Identique | 1 | ⚠️ |
| 3 | Moins bonne | 2 | 🔴 CCC S3 |

**⚠️ Scorante + CCC S3**

---

#### E18 — Qualité du sommeil

**Libellé** : Comment décririez-vous la qualité de votre sommeil ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Bonne | 0 | ✅ |
| 2 | Correcte | 1 | ⚠️ |
| 3 | Mauvaise | 2 | 🔴 CCC S3 |
| 4 | Très mauvaise | 2 | 🔴 CCC S3 |

**⚠️ Scorante + CCC S3**

---

### Section 6.3 — Accès aux soins de l'aidant

---

#### E15 — Difficulté RDV médicaux

**Libellé** : Avez-vous des difficultés à prendre des RDV médicaux pour vous-même ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Un peu | ⚠️ CCC S4 |
| 3 | Oui | 🔴 CCC S4 |

**⚠️ Déclenchante + CCC S4**

---

#### E16 — Report des soins

**Libellé** : Pour vous-même, avez-vous tendance à reporter ou annuler vos soins ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non, je les maintiens | ✅ |
| 2 | Je les reporte parfois | ⚠️ |
| 3 | Je les reporte ou les annule souvent | 🔴 CCC S4 |

**⚠️ Déclenchante + CCC S4**

---

### Section 6.4 — Questions critiques directes

---

#### E12 — Risque pour le proche

**Libellé** : Avez-vous déjà eu des gestes ou des paroles que vous regrettez envers la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 **Critique directe** |

**⚠️ Critique directe — Sécurité**

---

#### E13 — Risque pour autrui

**Libellé** : Avez-vous eu des gestes ou paroles que vous regrettez envers d'autres personnes (famille, collègues...) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 **Critique directe** |

**⚠️ Critique directe — Sécurité**

---

### Section 6.5 — Contexte et durée de l'aidance

---

#### O49 — Durée de l'aidance

**Libellé** : Depuis combien de temps aidez-vous cette personne ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Moins de 6 mois | 1 | ✅ |
| 2 | Entre 6 mois et 2 ans | 2 | ⚠️ |
| 3 | Depuis plus de 2 ans | 3 | 🔴 Déclenchante |

**⚠️ Déclenchante**

---

#### O50 — Temps consacré

**Libellé** : Combien de temps lui consacrez-vous par semaine ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Moins de 5h |
| 2 | Entre 5h et 10h |
| 3 | Plus de 10h |

---

#### O32 — Besoin d'aide

**Libellé** : Souhaitez-vous être davantage aidé·e ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 **Déclenchante** |

**⚠️ Déclenchante — Demande explicite de soutien**

---

#### N8 — Arrêt de travail

**Libellé** : Avez-vous eu un arrêt de travail lié à votre rôle d'aidant ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 Déclenchante |

**⚠️ Déclenchante**

---

#### E14 — Durée arrêt de travail

**Libellé** : Combien de jours d'arrêt sur les 30 derniers jours ?

**Type** : Conditionnel (si N8=Oui)

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Moins de 4 jours | ⚠️ |
| 2 | Entre 4 et 7 jours | 🔴 Déclenchante |
| 3 | Plus de 7 jours | 🔴 Déclenchante |

---



### Questions additionnelles (complément source)

---

### Suivi médical & accès aux soins

---

#### O37 — Avez-vous un médecin traitant

**Libellé** : Avez-vous un médecin traitant ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### O38 — Avez-vous d'autres médecins spécialistes qui vous suivent...

**Libellé** : Avez-vous d'autres médecins spécialistes qui vous suivent actuellement  ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### O39 — Lesquels

**Libellé** : Lesquels ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Unique / Conditionnel O38 (1)

| Code | Libellé |
|------|---------|
| 1 | Cardiologue |
| 2 | Oncologue |
| 3 | Neurologue |
| 4 | Pneumologue |
| 5 | Ophtalmologue |
| 6 | Psychiatre |
| 7 | Chirurgien-Dentiste |
| 8 | Gastro-entérologue |
| 9 | Endocrinologue / Diabetologue |
| 10 | ORL |
| 11 | Gynecologue |
| 12 | Nephrologue |
| 13 | Gériatre |
| 14 | Dermatologue |
| 15 | Autre |

---

#### O40 — Avez-vous déjà réalisé des rendez-vous médicaux cette année

**Libellé** : Avez-vous déjà réalisé des rendez-vous médicaux cette année ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### O41 — Lesquels

**Libellé** : Lesquels ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples/ Conditionnel O40(1)

| Code | Libellé |
|------|---------|
| 1 | Bilan de santé général (prise de sang…) |
| 2 | Audition |
| 3 | Vue |
| 4 | Contrôle dentaire |
| 5 | Suivi cardiovasculaire |
| 6 | Ostéodensitométrie |
| 7 | Vaccination |
| 8 | Examen gynécologique |
| 9 | Suivi dermatologique |
| 10 | Suivi psychologique |
| 11 | Dépistage des cancers |

---

### Santé : maladies / antécédents

---

#### O42 — Êtes-vous concerné ou avez-vous été concerné par une ou p...

**Libellé** : Êtes-vous concerné ou avez-vous été concerné par une ou plusieurs de ces maladies : (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Troubles neurologiques (accident vasculaire cérébral, épilepsie, maladie neuro-dégénérative, troubles du déficit de l'attention avec ou sans hyperactivité TDAH…) |
| 2 | Troubles psychiques (dépression, anxiété, troubles bi-polaires, schizophrénie...) |
| 3 | Dermatologique (dermatite atopique, psoriasis, acné…) |
| 4 | Respiratoire (asthme, maladie pulmonaire obstructive chronique…) |
| 5 | Génito-urinaire (infections urinaires à répétition, hypertrophie bénigne de la prostate, endométriose…) |
| 6 | Endocrinienne (hyper ou hypo thyroidie, obésité sévère…) |
| 7 | Cancer (cancer du sein, prostate, colo-rectal, poumon, mélanome…) |
| 8 | Métabolique (diabète, cholesterol…) |
| 9 | Maladie cardiovaculaire (insuffisance cardiaque, hypertension artérielle, artériopathie…) |
| 10 | Musculo-squelettique (arthrose, lombalgie, cervicalgie, ostéoporose…) |
| 11 | Gastro-intestinale (reflux gastro oesophagien, maladie inflammatoire chronique des intestins, hépatopathie…) |
| 12 | Maladies génétiques (muchovicidose, trisomie…) |
| 13 | Troubles visuels sévères (DMLA, cécité…) |
| 14 | Troubles auditifs sévères |
| 15 | Je ne sais pas |

---

### Santé : médicaments

---

#### O43 — Combien de médicaments différents prenez-vous chaque jour

**Libellé** : Combien de médicaments différents prenez-vous chaque jour ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | 1 à 3 médicaments |
| 2 | 4 à 6 médicaments |
| 3 | 7 médicaments et plus |
| 4 | Je ne prends pas de traitement actuellement |

---

### État de santé & hygiène de vie

---

#### E17 — Pratiquez-vous une activité physique régulière (au moins ...

**Libellé** : Pratiquez-vous une activité physique régulière (au moins 30 minutes, 3 fois par semaine) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

#### E19 — Quels sont aujourd’hui vos principaux soucis de santé

**Libellé** : Quels sont aujourd’hui vos principaux soucis de santé ?

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Fatigue |
| 2 | Sommeil |
| 3 | Douleurs |
| 4 | Moral (anxiété, idées noires, découragement) |
| 5 | Alimentation / poids |
| 6 | Problèmes de tension, de cœur, de diabète |
| 7 | Autre problème de santé |
| 8 | Aucun en particulier |

---

## ⚠️ Règles Legacy

1. **Critiques directes** : E12, E13 → Priorité niveau 1 (sécurité)
2. **CCC S1** : E7 + E11 → Risque de rupture aidant
3. **CCC S2** : E8 + E9 → Isolement émotionnel
4. **CCC S3** : O44 + E18 → Dégradation santé perçue
5. **CCC S4** : E15 + E16 → Renoncement aux soins
