# 📅 Suivi V5 — Administrative

> **Source** : `SOURCES/extracted/Questionnaire_Etienne_1258-1_suivi_mensuel_raw.json` (Bloc 7)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "Questionnaire suivi mensuel - Bloc 7"
extraction_date: "2026-02-06"
frequency: "mensuel"
total_questions_suivi: 10
trigger_condition: "S007=Oui (Changements droits/démarches)"
```

---

## 🎯 Déclencheur Bloc Suivi V5

**Question gate** : S007

**Libellé** : Depuis le dernier suivi, y a-t-il eu des changements concernant : Les démarches administratives ou droits ?

**Options** : Oui | Non

**Si Oui → Déclenche les questions ci-dessous**

---

## 📋 Questions de Suivi Mensuel V5

### Sous-bloc 7.1 — Protection juridique

---

#### N6 — Mesure de protection

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | 🔴 Action reco |
| 2 | Habilitation familiale | ✅ |
| 3 | Tutelle | ✅ |
| 4 | Curatelle simple | ✅ |
| 5 | Curatelle renforcée | ✅ |
| 6 | Sauvegarde de justice | ✅ |
| 7 | Mandat de protection future | ✅ |

---

#### E61 — Directives anticipées

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Non | ⚠️ CCC A3 |
| 3 | Je ne sais pas | ⚠️ CCC A3 |

---

### Sous-bloc 7.2 — Droits et aides

---

#### N29 — Droits actuels

Liste des droits/aides actuellement perçus (APA, AAH, PCH, etc.)

---

#### E62 — Droits demandés

| Code | Libellé | ⚠️ |
|------|---------|-----|
| - | Liste des demandes en cours | ✅ |
| - | Aucun | 🔴 CCC A2 |
| - | Je ne sais pas | 🔴 CCC A2 |

---

#### O53 — AGGIR évalué

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Non | 🔴 CCC A2 |
| 3 | Je ne sais pas | ⚠️ CCC A2 |

---

### Sous-bloc 7.3 — Charge administrative

---

#### E68 — Temps démarches

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | < 1h/mois | ✅ |
| 2 | 1-5h/mois | ⚠️ Déclenchante A1 |
| 3 | > 5h/mois | 🔴 CCC A1 Critique |

---

#### E66 — Complexité perçue

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Pas du tout | 0 |
| 2 | Un peu | 1 |
| 3 | Oui | 2 |

---

#### E70 — Retards démarches

| Code | Libellé | Score |
|------|---------|-------|
| 1 | Non, jamais | 0 |
| 2 | Parfois | 1 |
| 3 | Souvent | 2 |

---

#### E21 — Maintien situation de vie

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Non, changement nécessaire | 🔴 CCC A1/A3 |
| 3 | Je ne sais pas | ⚠️ CCC A1/A3 |

---

## 📈 Indicateurs Longitudinaux V5

| Indicateur | Questions | Alerte |
|------------|-----------|--------|
| IND_V5_saturation | E68 + E21 | E68=3 ET (E21=2 OU E21=3) → 🔴 Saturation (CCC A1) |
| IND_V5_droits | E62 + O53 | E62=Aucun ET O53=Non → 🔴 Rupture droits (CCC A2) |
| IND_V5_anticipation | E61 + E21 | E61≠Oui ET (E21=2 OU E21=3) → 🔴 Risque anticipation (CCC A3) |

---

## ⚠️ Règles Legacy

1. **Fréquence** : Suivi mensuel
2. **Gate question** : S007 = Oui pour déclencher le bloc V5
3. **E68 > 5h** : Priorité accompagnement administratif
4. **N6=Non** : Priorité anticipation protection juridique
