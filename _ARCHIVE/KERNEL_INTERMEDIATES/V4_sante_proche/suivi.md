# 📅 Suivi V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/Questionnaire_Etienne_1258-1_suivi_mensuel_raw.json` (Bloc 4)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "Questionnaire suivi mensuel - Bloc 4"
extraction_date: "2026-02-06"
frequency: "mensuel"
total_questions_suivi: 15
trigger_condition: "S004=Oui (Changements parcours médical proche)"
```

---

## 🎯 Déclencheur Bloc Suivi V4

**Question gate** : S004

**Libellé** : Depuis le dernier suivi, y a-t-il eu des changements concernant : Le parcours médical de votre proche ?

**Options** : Oui | Non

**Si Oui → Déclenche les questions ci-dessous**

---

## 📋 Questions de Suivi Mensuel V4

### Sous-bloc 4.1 — Diagnostic et maladie

---

#### E35 — Clarté du diagnostic

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, le diagnostic est clair | ✅ |
| 2 | Plusieurs hypothèses | ⚠️ |
| 3 | Non, pas de diagnostic | 🔴 CCC M1 |
| 4 | Je ne sais pas | ⚠️ |

---

#### E36 — Errance diagnostique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non, pas particulièrement | ✅ |
| 2 | Oui, un peu | ⚠️ |
| 3 | Oui, beaucoup | 🔴 CCC M1 |

---

### Sous-bloc 4.2 — Accès aux soins

---

#### O24 — Difficultés accès soins

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 CCC M2 |

---

#### E40 — Type de difficultés

| Code | Libellé |
|------|---------|
| 1 | Délais de RDV |
| 2 | Distance |
| 3 | Coût |
| 4 | Trouver le bon spécialiste |
| 5 | Pas de difficultés |

---

### Sous-bloc 4.3 — Hospitalisations et continuité

---

#### E42 — Hospitalisations récentes

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 0 | Aucune | ✅ |
| 1 | 1 fois | ⚠️ |
| 2 | 2 fois ou plus | 🔴 CCC M3 |

---

#### E43 — Ruptures de suivi

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui, courtes périodes | ⚠️ |
| 3 | Oui, plusieurs périodes ou >6 mois | 🔴 CCC M3 |

---

### Sous-bloc 4.4 — Troubles et addictions

---

#### E46 — Troubles psychiques

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 Déclenchante M4 |

---

#### E47 — Suivi psy actuel

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, régulièrement | ✅ |
| 2 | Oui, parfois | ⚠️ |
| 3 | Non | 🔴 CCC M4 |

---

#### O48 — Addictions

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 Déclenchante M4 |

---

### Sous-bloc 4.5 — Coordination

---

#### E52 — Coordinateur identifié

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Non, personne | 🔴 CCC M5 |

---

#### E54 — Organisation globale soins

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Bien organisé | ✅ |
| 2 | Moyennement | ⚠️ |
| 3 | Mal organisé | 🔴 |

---

#### E57 — Plan de route clair

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Partiellement | ⚠️ |
| 3 | Non | 🔴 CCC M6 |

---

## 📈 Indicateurs Longitudinaux V4

| Indicateur | Questions | Alerte |
|------------|-----------|--------|
| IND_V4_errance | E35 + E36 | E35=3 ET E36=3 → 🔴 Errance majeure (CCC M1) |
| IND_V4_acces | O24 + E40 | O24=Oui ET E40≠5 → 🔴 Blocage accès (CCC M2) |
| IND_V4_hospi | E42 + E43 | E42≥2 ET E43=3 → 🔴 Crises répétées (CCC M3) |
| IND_V4_coord | E52 + E54 | E52=3 ET E54=3 → 🔴 Désorganisation (CCC M5) |

---

## ⚠️ Règles Legacy

1. **Fréquence** : Suivi mensuel
2. **Gate question** : S004 = Oui pour déclencher le bloc V4
3. **Priorité M3** : Hospitalisations répétées = urgence
4. **Priorité M4** : Addictions = orientation CSAPA systématique
