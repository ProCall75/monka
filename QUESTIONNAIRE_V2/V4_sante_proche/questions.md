# 📝 Questions V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/Questionnaire_validé.xlsx_extracted.json` + `recommendations_complete.json`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
bloc: "Bloc 4 – Situation de santé de votre proche"
source: "recommendations_complete.json"
extraction_date: "2026-02-06"
total_questions: 36
```

---

## 🗂️ Structure des Questions

### Section 4.1 — Diagnostic et maladie

---

#### N17 — Type de handicap

**Libellé** : Quel est son type de handicap ? (plusieurs réponses possibles)

**Type** : Obligatoire / Choix Multiple

| Code | Libellé |
|------|---------|
| 1 | Handicap cognitif |
| 2 | Handicap psychique |
| 3 | Handicap visuel |
| 4 | Handicap auditif |
| 5 | Handicap intellectuel |
| 6 | Handicap moteur |
| 7 | Traumatisme crânien |
| 8 | Autisme ou troubles envahissant du développement |
| 9 | Troubles majeurs du comportement |
| 10 | Maladie invalidante |

---

#### N41 — ALD (Affection Longue Durée)

**Libellé** : Bénéficie-t-elle d'une reconnaissance officielle ALD ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Oui | 0 | ✅ |
| 2 | Non | 3 | 🔴 Action |
| 3 | Je ne sais pas | 2 | ⚠️ |

**⚠️ Scorante**

---

#### E34 — Compréhension maladie

**Libellé** : Comprenez-vous bien la maladie, l'état de santé et les besoins médicaux de votre proche ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Pas du tout | 🔴 |

---

#### E35 — Clarté du diagnostic

**Libellé** : Avez-vous l'impression que le diagnostic de votre proche est clair et bien établi ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, le diagnostic est clair | ✅ |
| 2 | Plusieurs hypothèses, rien de tranché | ⚠️ |
| 3 | Non, pas de diagnostic donné | 🔴 CCC M1 |
| 4 | Je ne sais pas | ⚠️ |

**⚠️ CCC M1**

---

#### E36 — Errance diagnostique

**Libellé** : Avez-vous consulté beaucoup de professionnels ou fait beaucoup d'examens sans clarification ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non, pas particulièrement | ✅ |
| 2 | Oui, un peu | ⚠️ |
| 3 | Oui, beaucoup | 🔴 CCC M1 |

**⚠️ Scorante + CCC M1**

---

#### E37 — Changements de traitement

**Libellé** : Les traitements de votre proche changent-ils souvent ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non, ils sont stables | ✅ |
| 2 | Oui, parfois | ⚠️ |
| 3 | Oui, souvent | 🔴 CCC M1 |

**⚠️ CCC M1**

---

### Section 4.2 — Accès aux soins

---

#### O24 — Difficultés accès soins

**Libellé** : Rencontrez-vous des difficultés pour accéder aux soins pour votre proche ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 CCC M2 |

**⚠️ Scorante + CCC M2**

---

#### E40 — Type de difficultés

**Libellé** : Si oui, quelles difficultés ? (conditionnel)

| Code | Libellé |
|------|---------|
| 1 | Délais de RDV |
| 2 | Distance |
| 3 | Coût |
| 4 | Trouver le bon spécialiste |
| 5 | Je ne rencontre pas de difficultés particulières |

**⚠️ CCC M2**

---

### Section 4.3 — Urgences et hospitalisations

---

#### E42 — Hospitalisations récentes

**Libellé** : Combien de fois votre proche a-t-il été hospitalisé ces 12 derniers mois ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 0 | Aucune | ✅ |
| 1 | 1 fois | ⚠️ |
| 2 | 2 fois ou plus | 🔴 CCC M3 |

**⚠️ Scorante + CCC M3**

---

#### E43 — Ruptures de suivi

**Libellé** : Y a-t-il eu des périodes sans suivi médical régulier ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui, courtes périodes | ⚠️ |
| 3 | Oui, plusieurs périodes ou plus de 6 mois | 🔴 CCC M3 |

**⚠️ CCC M3**

---

#### E44 — PAP établi

**Libellé** : Un protocole d'accueil d'urgence (PAP) a-t-il été établi ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Non, jamais | 🔴 CCC M3 |

**⚠️ CCC M3**

---

### Section 4.4 — Troubles psychiques et addictions

---

#### E46 — Troubles psychiques

**Libellé** : Votre proche a-t-il des troubles psychiques ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 Déclenchante M4 |

**⚠️ Déclenchante**

---

#### E47 — Suivi psy actuel

**Libellé** : Est-il suivi par un professionnel de santé mentale ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, régulièrement | ✅ |
| 2 | Oui, parfois | ⚠️ |
| 3 | Non | 🔴 CCC M4 |

**⚠️ CCC M4**

---

#### O48 — Addictions

**Libellé** : Votre proche a-t-il des problèmes d'addiction ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 Déclenchante M4 |

**⚠️ Déclenchante**

---

#### E51 — Volonté aide addiction

**Libellé** : Souhaite-t-il être accompagné pour son addiction ?

| Code | Libellé |
|------|---------|
| 1 | Oui | ✅ |
| 2 | Non | ⚠️ |
| 3 | Il ne reconnaît pas le problème | 🔴 |

---

### Section 4.5 — Coordination des soins

---

#### E52 — Coordinateur identifié

**Libellé** : Y a-t-il une personne qui coordonne les soins de votre proche ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Non, personne ne coordonne vraiment | 🔴 CCC M3/M5 |

**⚠️ Déclenchante + CCC M5**

---

#### E54 — Organisation globale soins

**Libellé** : Comment qualifieriez-vous l'organisation globale des soins ?

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Bien organisé | 0 | ✅ |
| 2 | Moyennement | 1 | ⚠️ |
| 3 | Mal organisé | 2 | 🔴 |

**⚠️ Scorante**

---

#### E57 — Plan de route clair

**Libellé** : Avez-vous un plan de route clair pour le parcours de soins ?

| Code | Libellé | Score | ⚠️ |
|------|---------|-------|-----|
| 1 | Oui | 0 | ✅ |
| 2 | Partiellement | 1 | ⚠️ |
| 3 | Non | 2 | 🔴 CCC M6 |

**⚠️ Scorante + CCC M6**

---

## ⚠️ Règles Legacy

1. **CCC M1** : E36 + E37 → Errance diagnostique
2. **CCC M2** : O24 + E40 → Difficultés accès soins
3. **CCC M3** : E42 + E43 OU E44 + E52 → Hospitalisations / ruptures
4. **CCC M4** : E46 + E47 → Troubles psy non suivis
5. **CCC M5** : E52 → Absence de coordination
6. **CCC M6** : E57 → Plan de route absent
