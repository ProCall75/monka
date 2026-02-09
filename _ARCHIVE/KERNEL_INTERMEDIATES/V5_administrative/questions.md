# 📝 Questions V5 — Administrative

> **Source** : `SOURCES/extracted/Questionnaire_validé.xlsx_extracted.json` + `recommendations_complete.json`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
bloc: "Bloc 7 – Droits, démarches, administratif & finances"
source: "recommendations_complete.json"
extraction_date: "2026-02-06"
total_questions: 21
```

---

## 🗂️ Structure des Questions

### Section 7.1 — Couverture santé

---

#### O45 — Couverture santé aidant

**Libellé** : Quelle couverture de santé avez-vous ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Régime général (ou spécial) et Mutuelle | 0 |
| 2 | Régime général (ou spécial) | 1 |
| 3 | CMU | 3 |

---

#### O23 — Couverture santé proche

**Libellé** : Quelle couverture de santé protège la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Régime général (ou spécial) et Mutuelle | 0 |
| 2 | Régime général (ou spécial) | 1 |
| 3 | CMU | - |

---

### Section 7.2 — Protection juridique

---

#### N6 — Mesure de protection

**Libellé** : Une mesure de protection a-t-elle été mise en place ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Non | 0 | 🔴 Action reco |
| 2 | Habilitation familiale | 2 | ✅ |
| 3 | Tutelle | 3 | ✅ |
| 4 | Curatelle simple | 2 | ✅ |
| 5 | Curatelle renforcée | 3 | ✅ |
| 6 | Sauvegarde de justice | 3 | ✅ |
| 7 | Mandat de protection future | 1 | ✅ |

**⚠️ N6=Non → Reco anticipation**

---

#### E61 — Directives anticipées

**Libellé** : Votre proche a-t-il déjà rédigé des directives anticipées ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Non | ⚠️ CCC A3 |
| 3 | Je ne sais pas | ⚠️ CCC A3 |

**⚠️ Déclenchante + CCC A3**

---

### Section 7.3 — Droits et aides

---

#### N42 — Prestations ALD

**Libellé** : Bénéficie-t-elle déjà d'une aide pour obtenir des prestations sociales en lien avec une ALD ?

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Oui | - | ✅ |
| 2 | Non | 3 | 🔴 |
| 3 | Je ne sais pas | 2 | ⚠️ |

---

#### N29 — Droits / aides actuels

**Libellé** : De quels droits/aides bénéficiez-vous actuellement ?

**Type** : Obligatoire / Choix Multiple

| Code | Libellé |
|------|---------|
| 1 | APA (Allocation personnalisée d'autonomie) |
| 2 | APL (Aide personnalisée au logement) |
| 3 | MaPrimeAdapt' (ANAH) |
| 4 | AAH (Allocation adultes handicapés) |
| 5 | PCH (Prestation de compensation du handicap) |
| 6 | RQTH |
| 7 | Orientation établissement/service médico-social |
| 8 | Carte mobilité inclusion |
| ... | (Liste complète disponible) |

---

#### E62 — Droits / aides demandés

**Libellé** : Pour quels droits/aides avez-vous effectué une demande en cours ?

**Type** : Obligatoire / Choix Multiple

| Code | Libellé | ⚠️ |
|------|---------|-----|
| - | Aucun | 🔴 CCC A2 |
| - | Je ne sais pas | 🔴 CCC A2 |

**⚠️ CCC A2**

---

### Section 7.4 — Évaluation dépendance

---

#### O53 — AGGIR évalué

**Libellé** : Une évaluation de dépendance AGGIR a-t-elle été réalisée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Non | 🔴 CCC A2 |
| 3 | Je ne sais pas | ⚠️ CCC A2 |

**⚠️ CCC A2**

---

#### O54 — Niveau AGGIR

**Libellé** : Si oui, quel est le niveau GIR ?

**Type** : Conditionnel (si O53=Oui)

| Code | Libellé |
|------|---------|
| 1 | GIR 1 |
| 2 | GIR 2 |
| 3 | GIR 3 |
| 4 | GIR 4 |
| 5 | GIR 5 |
| 6 | GIR 6 |

---

### Section 7.5 — Charge administrative

---

#### E68 — Temps démarches

**Libellé** : Combien de temps consacrez-vous aux démarches administratives ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Moins d'1h/mois | ✅ |
| 2 | 1-5h/mois | ⚠️ Déclenchante A1 |
| 3 | Plus de 5h/mois | 🔴 CCC A1 Critique |

**⚠️ Déclenchante + CCC A1**

---

#### E66 — Complexité perçue

**Libellé** : Les démarches administratives vous semblent-elles complexes ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Pas du tout | 0 |
| 2 | Un peu | 1 |
| 3 | Oui | 2 |

**⚠️ Scorante**

---

#### E69 — Maîtrise numérique

**Libellé** : Vous sentez-vous à l'aise avec les démarches en ligne ?

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Oui, tout à fait | 0 |
| 2 | Oui, mais lent/chronophage | 1 |
| 3 | Non, souvent perdu·e | 2 |
| 4 | Pas d'accès numérique | 2 |

**⚠️ Scorante**

---

#### E70 — Retards démarches

**Libellé** : Avez-vous pris du retard dans vos démarches administratives ?

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non, jamais | 0 |
| 2 | Parfois | 1 |
| 3 | Souvent / toujours en retard | 2 |
| 4 | Je ne sais pas | 1 |

**⚠️ Scorante**

---

#### E21 — Maintien situation de vie

**Libellé** : Pensez-vous pouvoir maintenir la situation de vie actuelle ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Non, un changement sera nécessaire | 🔴 CCC A1/A3 |
| 3 | Je ne sais pas | ⚠️ CCC A1/A3 |

**⚠️ CCC A1 + A3**

---



### Questions additionnelles (complément source)

---

### Accompagnement & recours aux dispositifs

---

#### N43 — Dans votre rôle d'aidant avez-vous déjà bénéficié des ser...

**Libellé** : Dans votre rôle d'aidant avez-vous déjà bénéficié des services des accompagnements administratifs suivants ?  (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Assistante sociale |
| 2 | Maison départementale des Personnes Handicapées (MDPH) |
| 3 | Maison de l'autonomie (MDA) |
| 4 | Centres communaux d'action sociale (CCAS) |
| 5 | Mutuelles et assurances complémentaires |
| 6 | Associations de patients |
| 7 | Plateformes d'accompagnement et de répit |
| 8 | Service social de l'assurance maladie |
| 9 | Espace Autonomie Sénior (EAS) |
| 10 | Aucun |

---

#### N5 — Avez-vous  déjà eu recours aux aides suivantes

**Libellé** : Avez-vous  déjà eu recours aux aides suivantes ?   (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Solutions de répit |
| 2 | Formations dédiées aux aidants |
| 3 | Accompagnement psychologique |
| 4 | Aucune |
| 5 | Autre |

---

### Situation financière

---

#### O61 — Pensez-vous avoir les moyens financiers suffisants pour f...

**Libellé** : Pensez-vous avoir les moyens financiers suffisants pour faire face à cette situation ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

---

### Démarches prioritaires / préoccupations

---

#### E63 — Quelles démarches vous préoccupent le plus en ce moment p...

**Libellé** : Quelles démarches vous préoccupent le plus en ce moment pour votre proche ?

**Type** : Obligatoire / Choix multiple

| Code | Libellé |
|------|---------|
| 1 | Dossier de dépendance (ex. APA, PCH…) |
| 2 | Dossier MDPH / handicap |
| 3 | Démarches de retraite / pension |
| 4 | Aides au logement / adaptation du domicile |
| 5 | Aides financières ponctuelles |
| 6 | Renouvellement de droits (ALD, mutuelle, CMU, etc.) |
| 7 | Autre |
| 8 | Aucune en particulier |

---

### Inclusion (école, structure, activité)

---

#### E64 — Votre enfant peut-il fréquenter une école ou une structur...

**Libellé** : Votre enfant peut-il fréquenter une école ou une structure adaptée (crèche, IME, ULIS, etc.) de façon régulière ?

**Type** : Obligatoire / Choix Unique/ Conditionnelle N3 (tout sauf réponse 1) ou  et O1 réponse 1

| Code | Libellé |
|------|---------|
| 1 | Oui, sans difficulté particulière |
| 2 | Oui, mais avec des aménagements ou accompagnement (AESH, AVS, éducateur…) |
| 3 | Très difficile, il manque souvent / la structure n’est pas adaptée |
| 4 | Non, il ne fréquente pas d’école ou de structure adaptée |

---

#### E65 — Votre enfant a-t-il besoin d’un accompagnant spécialisé (...

**Libellé** : Votre enfant a-t-il besoin d’un accompagnant spécialisé (AESH, AVS, éducateur, autre) pour l’école, les soins ou certaines activités ?

**Type** : Obligatoire / Choix Unique/ Conditionnelle N3 (tout sauf réponse 1) ou  et O1 réponse 1

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Oui, déjà en place |
| 3 | Oui, besoin identifié mais pas encore en place |

---

#### E67 — Actuellement, votre proche a-t-il une activité (travail, ...

**Libellé** : Actuellement, votre proche a-t-il une activité (travail, ESAT, atelier protégé, bénévolat, accueil de jour…) adaptée à son état de santé ?

**Type** : Obligatoire / Choix Unique/ Conditionnelle N3 (tout sauf réponse 1) ou  et O1 (tout sauf réponse 1 ou 3 ou 4)

| Code | Libellé |
|------|---------|
| 1 | Oui, activité adaptée |
| 2 | Oui, mais elle devient difficile à tenir |
| 3 | Non, il est sans activité mais cela ne pose pas de problème particulier |
| 4 | Non, et cela crée des difficultés (isolement, repli, perte de repères) |

---

## ⚠️ Règles Legacy

1. **CCC A1** : E68 + E21 → Saturation administrative
2. **CCC A2** : E62 + O53 → Rupture de droits
3. **CCC A3** : E61 + E21 → Absence d'anticipation
4. **N6=Non** : Priorité reco anticipation protection juridique
