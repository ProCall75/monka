# 🛤️ Template: asr.md

> **Source** : `SOURCES/legacy/Legacy ASR Referent op. 030226.docx`  
> **Contenu** : Actions Structurantes de Référence = **Objectifs utilisateur** par micro-parcours  
> **⚠️ Signatures ASR V2-V5** : Partiellement 🤖 IA (à valider)

---

## ⚠️ RÈGLES FONDAMENTALES (Legacy ASR)

> **R-ASR-01 — Unicité**  
> *"Chaque micro-parcours Monka possède UNE et UNE SEULE ASR."*

> **R-ASR-02 — Séparation tâches / ASR**  
> *"Une ASR n'est jamais conditionnée à la complétion de toutes les actions.*  
> *Les micro-tâches sont des MOYENS ; l'ASR est un CHANGEMENT D'ÉTAT."*

### Ce qu'est une ASR :
- ✅ Un **état du monde observable**
- ✅ Un **objectif utilisateur** (côté aidant)
- ✅ Le **minimum structurant suffisant** pour que le risque soit contenu
- ✅ Validée via des **signatures d'état**

### Ce que les ASR NE SONT PAS :
- ❌ Des tâches
- ❌ Des objectifs de complétude
- ❌ Des scores
- ❌ Des recommendations

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source: "Legacy ASR Referent op. 030226"
extraction_date: "YYYY-MM-DD"
micro_parcours: [{liste}]
```

---

## 📋 Format par Micro-Parcours

```markdown
### {MP} - {Nom du micro-parcours}

**Déclencheurs** : Voir `declencheurs.md`

**ASR (1 seule)** :
"{Libellé exact de l'ASR = état à atteindre}"

**Signatures d'état** (validation de l'ASR) :
| Signature | Condition |
|-----------|-----------|
| {MP}-A | {Chemin 1 pour valider l'ASR} |
| {MP}-B | {Chemin 2 alternatif} |
```

---

## 📋 Exemple V1 : Vulnérabilité Sociale & Relationnelle

```markdown
### R1 - Vie personnelle / professionnelle de l'aidant

**Déclencheurs** : Voir `declencheurs.md`

**ASR** :
"L'aidant dispose d'une marge réelle lui permettant de tenir dans la durée."

**Signatures d'état** :
| Signature | Condition |
|-----------|-----------|
| R1-A | Temps personnel ou professionnel rendu possible par changement d'organisation |
| R1-B | Réduction déclarée d'une contrainte majeure liée à l'aide |

---

### R2 - Soutien de l'entourage

**Déclencheurs** : Voir `declencheurs.md`

**ASR** :
"Un relais humain mobilisable est effectivement en place."

**Signatures d'état** :
| Signature | Condition |
|-----------|-----------|
| R2-A | Au moins 1 personne de l'entourage identifiée comme relais |
| R2-B | Intervention active d'un professionnel ou service mobilisable |

---

### R3 - Isolement social du proche

**ASR** :
"Le proche bénéficie de contacts sociaux extérieurs réguliers."

**Signatures d'état** :
| Signature | Condition |
|-----------|-----------|
| R3-A | Interactions régulières (visites, activités) avec des tiers |
| R3-B | Accompagnement social structuré via association, bénévole ou service |

---

### R4 - Relation aidant / aidé

**ASR** :
"L'aide peut être apportée sans opposition majeure bloquante."

**Signatures d'état** :
| Signature | Condition |
|-----------|-----------|
| R4-A | Aide possible dans un cadre fonctionnel identifié |
| R4-B | Existence d'un tiers régulateur permettant de maintenir l'aide |
```

---

## 📊 Référentiel complet : 24 micro-parcours

| Catégorie | MP | ASR (objectif utilisateur) |
|-----------|----|-----------------------------|
| 🟦 Sociale | R1 | L'aidant dispose d'une marge réelle lui permettant de tenir dans la durée |
| 🟦 Sociale | R2 | Un relais humain mobilisable est effectivement en place |
| 🟦 Sociale | R3 | Le proche bénéficie de contacts sociaux extérieurs réguliers |
| 🟦 Sociale | R4 | L'aide peut être apportée sans opposition majeure bloquante |
| 🟧 Admin | A1 | Les protections administratives essentielles sont opérationnelles |
| 🟧 Admin | A2 | Au moins une aide pertinente est effectivement activée |
| 🟧 Admin | A3 | La gestion administrative est devenue soutenable |
| 🟧 Admin | A4 | La situation financière ou professionnelle est temporairement sécurisée |
| 🟩 Santé | S1 | La charge globale est redevenue supportable |
| 🟩 Santé | S2 | L'aidant dispose d'un soutien pour lui-même |
| 🟩 Santé | S3 | Un suivi ou une démarche de soin de l'aidant est réengagé |
| 🟩 Santé | S4 | Un minimum de récupération est rétabli |
| 🟪 Vie Quotidienne | Q1 | Le quotidien du proche est stabilisé par un cadre clair |
| 🟪 Vie Quotidienne | Q2 | Une aide humaine suffisante est en place |
| 🟪 Vie Quotidienne | Q3 | Les situations à risque sont encadrées |
| 🟪 Vie Quotidienne | Q4 | L'état général du proche fait l'objet d'une prise en charge |
| ... | ... | ... |

> Source : Legacy ASR Referent op. 030226.docx
