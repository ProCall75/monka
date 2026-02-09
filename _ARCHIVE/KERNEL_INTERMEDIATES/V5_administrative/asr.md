# 🎯 ASR V5 — Actions Structurantes de Référence Administrative

> **Source** : `SOURCES/extracted/microparcours_complete.json` + `Legacy ASR Referent op. 030226.docx`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "microparcours_complete.json"
extraction_date: "2026-02-06"
total_asr: 4
micro_parcours: ["A1", "A2", "A3", "A4"]
```

---

## 📋 Vue d'ensemble ASR V5

| MP | Nom | Objectif |
|----|-----|----------|
| **A1** | Couverture santé et protections juridiques | Sécuriser les protections de base |
| **A2** | Droits, aides et évaluation dépendance | Identifier et activer les droits mobilisables |
| **A3** | Charge et complexité des démarches | Réduire la charge mentale administrative |
| **A4** | Situation scolaire/professionnelle et budget | Clarifier la situation d'inclusion |

---

## 🎯 Détail des ASR

### A1 — Couverture santé et protections juridiques

**Objectif** : Sécuriser la couverture santé et les protections juridiques (mesure de protection, directives anticipées, assurances).

**Ce que vous allez comprendre** : Quelles protections sont pertinentes selon la situation et comment les mettre en place.

**CCC associé** : A1_CC_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Couverture/protection non évaluée |
| ⏳ | Démarches en cours |
| ✔️ | Protections en place |

---

### A2 — Droits, aides et évaluation dépendance

**Objectif** : Identifier les droits et aides mobilisables (financières, humaines, médico-sociales) et organiser les demandes.

**Ce que vous allez comprendre** : Quels droits sont pertinents selon la situation (aides à domicile, prestations, dispositifs locaux) et comment structurer un dossier.

**CCC associé** : A2_CC_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Droits non identifiés |
| ⏳ | Dossiers en cours |
| ✔️ | Droits activés |

---

### A3 — Charge et complexité des démarches administratives

**Objectif** : Réduire la charge mentale liée aux démarches et éviter les urgences administratives (retards, ruptures de droits).

**Ce que vous allez comprendre** : Pourquoi l'administratif devient lourd, comment s'organiser (agenda, classement, rappels) et quelles solutions d'appui existent.

**CCC associé** : A3_CC_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Saturation administrative |
| ⏳ | Organisation en cours |
| ✔️ | Charge maîtrisée |

---

### A4 — Situation scolaire/professionnelle du proche et budget

**Objectif** : Clarifier la situation d'inclusion (école, structure, travail/ESAT) et les impacts sur le budget du foyer.

**Ce que vous allez comprendre** : Quels sont les repères d'orientation (structure, accompagnement, activité) et comment relier cela aux besoins d'aide et aux ressources.

**CCC associé** : —

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Situation non clarifiée |
| ⏳ | Orientation en cours |
| ✔️ | Parcours stabilisé |

---

## 📌 Signatures d'État (Legacy ASR Referent op. 030226)

> Source : `Legacy ASR Referent op. 030226.docx`

| MP | Signature A | Signature B |
|----|-------------|-------------|
| A1 | A1-A : couverture santé active | A1-B : protection juridique ou administrative en place |
| A2 | A2-A : aide financière active | A2-B : aide humaine ou accompagnement en cours |
| A3 | A3-A : aide extérieure à la gestion | A3-B : organisation administrative clarifiée et stabilisée |
| A4 | A4-A : ajustement professionnel effectif | A4-B : soutien financier ou compensation active |

---

## ⚠️ Règles Legacy

1. **A1** = Base (couverture santé, protection juridique)
2. **A2** = Priorité si droits non activés
3. **A3** = Priorité si charge > 5h/mois
4. **Signatures d'état** : ❌ → ⏳ → ✔️
