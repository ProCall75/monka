# 📅 Suivi V3 — Santé Physique et Psychologique de l'Aidant

> **Source** : `SOURCES/extracted/Questionnaire_Etienne_1258-1_suivi_mensuel_raw.json` (Bloc 6)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé Physique et Psychologique de l'Aidant"
source: "Questionnaire suivi mensuel - Bloc 6"
extraction_date: "2026-02-06"
frequency: "mensuel"
total_questions_suivi: 18
trigger_condition: "S006=Oui (Changements santé aidant)"
```

---

## 🎯 Déclencheur Bloc Suivi V3

**Question gate** : S006

**Libellé** : Depuis le dernier suivi, y a-t-il eu des changements concernant : Votre propre santé physique ou psychologique ?

**Options** : Oui | Non

**Si Oui → Déclenche les questions ci-dessous**

---

## 📋 Questions de Suivi Mensuel V3

### Sous-bloc 6.1 — Impact et charge

---

#### O29 — Retentissement santé

**Libellé** : Vous occuper de la personne aidée a-t-il un retentissement sur votre santé ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Pas du tout | ✅ |
| 2 | Un peu | ⚠️ |
| 3 | Oui | 🔴 |

---

#### O33 — Charge ressentie

**Libellé** : Ressentez-vous une charge en vous occupant de cette personne ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Pas du tout | ✅ |
| 2 | Un peu | ⚠️ |
| 3 | Oui | 🔴 CCC S1 |

---

#### E7 — Épuisement

**Libellé** : À quel point vous sentez-vous épuisé·e par votre rôle d'aidant ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Pas du tout fatigué·e | ✅ |
| 2 | Un peu fatigué·e | ⚠️ |
| 3 | Très fatigué·e | 🔴 |
| 4 | Épuisé·e / au bord de craquer | 🔴 CCC S1 Critique |

---

#### E11 — Capacité à continuer

**Libellé** : Pensez-vous pouvoir continuer à aider cette personne dans les mois à venir ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, sans difficulté | ✅ |
| 2 | Oui, mais c'est difficile | ⚠️ |
| 3 | Je ne suis pas sûr·e | 🔴 CCC S1 |
| 4 | Non, je risque de ne plus y arriver | 🔴 CCC S1 Critique |

---

### Sous-bloc 6.2 — Isolement et équilibre

---

#### E8 — Solitude émotionnelle

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Jamais | ✅ |
| 2 | Parfois | ⚠️ |
| 3 | Souvent | 🔴 CCC S2 |
| 4 | Tout le temps | 🔴 CCC S2 Critique |

---

#### E9 — Temps pour soi

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui | ✅ |
| 2 | Non | 🔴 CCC S2 |

---

#### E10 — Stress / moral

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Ça va globalement | ✅ |
| 2 | Parfois tendu·e | ⚠️ |
| 3 | Souvent tendu·e | 🔴 |
| 4 | Débordé·e / au bord de craquer | 🔴 Critique |

---

### Sous-bloc 6.3 — Santé perçue et sommeil

---

#### O44 — Santé perçue

**Libellé** : Par rapport à l'an dernier, votre santé est-elle ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Meilleure | ✅ |
| 2 | Identique | ⚠️ |
| 3 | Moins bonne | 🔴 CCC S3 |

---

#### E18 — Qualité du sommeil

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Bonne | ✅ |
| 2 | Correcte | ⚠️ |
| 3 | Mauvaise | 🔴 CCC S3 |
| 4 | Très mauvaise | 🔴 CCC S3 Critique |

---

### Sous-bloc 6.4 — Accès aux soins

---

#### E15 — Difficulté RDV médicaux

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Un peu | ⚠️ CCC S4 |
| 3 | Oui | 🔴 CCC S4 |

---

#### E16 — Report des soins

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non, je les maintiens | ✅ |
| 2 | Je les reporte parfois | ⚠️ |
| 3 | Je les reporte ou annule souvent | 🔴 CCC S4 |

---

### Sous-bloc 6.5 — Questions critiques

---

#### E12 — Risque pour le proche

**Libellé** : Avez-vous eu des gestes ou paroles que vous regrettez envers la personne aidée ?

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 **Niveau 0 — Escalade** |

---

#### E13 — Risque pour autrui

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Non | ✅ |
| 2 | Oui | 🔴 **Niveau 0 — Escalade** |

---

## 📈 Indicateurs Longitudinaux V3

| Indicateur | Questions | Alerte |
|------------|-----------|--------|
| IND_V3_epuisement | E7 + E11 | E7 ≥3 ET E11 ≥3 → 🔴 Risque rupture (CCC S1) |
| IND_V3_isolement | E8 + E9 | E8 ≥3 ET E9=Non → 🔴 Isolement critique (CCC S2) |
| IND_V3_sante | O44 + E18 | O44=3 ET E18 ≥3 → 🔴 Dégradation (CCC S3) |
| IND_V3_soins | E15 + E16 | (E15 ≥2 ET E16=3) → 🔴 Renoncement (CCC S4) |

---

## ⚠️ Règles Legacy

1. **Fréquence** : Suivi mensuel
2. **Gate question** : S006 = Oui pour déclencher le bloc V3
3. **CCC S1** : Priorité maximale (risque de rupture de l'aidant)
4. **E12, E13** : Niveau 0 → Escalade immédiate
