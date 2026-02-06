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
total_questions: 18
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

## ⚠️ Règles Legacy

1. **CCC A1** : E68 + E21 → Saturation administrative
2. **CCC A2** : E62 + O53 → Rupture de droits
3. **CCC A3** : E61 + E21 → Absence d'anticipation
4. **N6=Non** : Priorité reco anticipation protection juridique
