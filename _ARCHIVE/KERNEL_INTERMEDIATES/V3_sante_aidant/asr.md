# 🎯 ASR V3 — Actions Structurantes de Référence Santé Aidant

> **Source** : `SOURCES/extracted/microparcours_complete.json` + `Legacy ASR Referent op. 030226.docx`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé Physique et Psychologique de l'Aidant"
source: "microparcours_complete.json"
extraction_date: "2026-02-06"
total_asr: 4
micro_parcours: ["S1", "S2", "S3", "S4"]
```

---

## 📋 Vue d'ensemble ASR V3

| MP | Nom | Objectif |
|----|-----|----------|
| **S1** | Charge, fatigue et risque d'épuisement | Repérer la surcharge et prévenir l'épuisement |
| **S2** | Inquiétudes pour la sécurité (risques graves) | Réduire les risques graves |
| **S3** | Santé physique et renoncement aux soins | Protéger votre santé |
| **S4** | Hygiène de vie (activité et sommeil) | Améliorer votre récupération |

---

## 🎯 Détail des ASR

### S1 — Charge, fatigue et risque d'épuisement de l'aidant

**Objectif** : Repérer la surcharge et prévenir l'épuisement.

**Ce que vous allez comprendre** : Les signes d'alerte (fatigue, irritabilité, isolement) et les solutions de répit.

**CCC associé** : S1_CC_01 (E7 + E11)

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Épuisement non évalué |
| ⏳ | Évaluation en cours, répit envisagé |
| ✔️ | Répit en place, suivi activé |

---

### S2 — Inquiétudes pour la sécurité (risques graves)

**Objectif** : Réduire les risques graves (chutes, fugue, danger domestique, crise).

**Ce que vous allez comprendre** : Quels signaux doivent faire agir rapidement et comment préparer un plan.

**CCC associé** : S2_CC_01 (E8 + E9)

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Risques non identifiés |
| ⏳ | Plan de sécurité en cours |
| ✔️ | Plan en place, vigilance maintenue |

---

### S3 — Santé physique de l'aidant et renoncement aux soins

**Objectif** : Protéger votre santé et éviter de renoncer à vos soins.

**Ce que vous allez comprendre** : Pourquoi votre santé conditionne la prise en charge du proche.

**CCC associé** : S3_CC_01 (O44 + E18) + S4_CC_01 (E15 + E16)

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Renoncement non détecté |
| ⏳ | RDV médicaux reprogrammés |
| ✔️ | Soins maintenus, suivi OK |

---

### S4 — Hygiène de vie de l'aidant (activité et sommeil)

**Objectif** : Améliorer votre récupération (sommeil, activité) pour tenir dans la durée.

**Ce que vous allez comprendre** : Les micro-actions qui ont le plus d'impact sur l'énergie et le stress.

**CCC associé** : —

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Hygiène de vie non évaluée |
| ⏳ | Conseils donnés, mise en œuvre en cours |
| ✔️ | Routines installées |

---

## 📌 Signatures d'État (Legacy ASR Referent op. 030226)

> Source : `Legacy ASR Referent op. 030226.docx`

| MP | Signature A | Signature B |
|----|-------------|-------------|
| S1 | S1-A : relais ou aide réduisant la charge | S1-B : organisation modifiée allégeant le quotidien |
| S2 | S2-A : soutien par l'entourage | S2-B : accompagnement professionnel engagé |
| S3 | S3-A : suivi médical repris | S3-B : démarche de soin concrète engagée |
| S4 | S4-A : amélioration du repos ou du sommeil | S4-B : organisation quotidienne plus soutenable |

---

## ⚠️ Règles Legacy

1. **S1** = Priorité maximale (épuisement = risque de rupture)
2. **S2** = Sécurité → traitement immédiat si E12/E13 positifs
3. **Signatures d'état** : ❌ → ⏳ → ✔️
