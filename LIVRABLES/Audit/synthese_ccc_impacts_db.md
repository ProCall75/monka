# 📋 Synthèse CCC Inter-Vulnérabilités — Impacts DB

> **Date** : 12/02/2026  
> **Source** : [`reflexion_ccc_inter_vulnerabilites.md`](reflexion_ccc_inter_vulnerabilites.md) — **VALIDÉ** par Dr. Monka  
> **Objectif** : Identifier précisément les lignes à ajouter dans `activation_rules` et les décisions restantes

---

## 🟢 VALIDÉ — À implémenter

### A. Nouvelles CCC Inter-Vulnérabilités (3 règles)

| # | Combo | Questions combinées | V source | MP cible | Niveau | Status |
|---|-------|---------------------|----------|----------|--------|--------|
| CCC-IV-1 | Épuisé + Isolé | *Épuisement aidant* = "Épuisé·e" **ET** *Personnes sur qui compter* = "Personne" | V3 × V1 | S3 (Charge/fatigue) + R3 (Soutien entourage) | 🟠 CCC | ✅ Prêt |
| CCC-IV-2 | Renoncement + Proche non autonome | *Question V3 à préciser* **ET** *Temps seul proche* = "Ne peut pas rester seul" | V3 × V4 | S2 ou S4 + F2 (Autonomie/aide humaine) | 🟠 CCC | ⚠️ Identifier la question exacte V3 |
| CCC-IV-4 | Proche dangereux + Aidant épuisé | *Comportements dangereux* = "Oui" **ET** *Épuisement aidant* = "Épuisé·e" | V4 × V3 | F4 (Mémoire/comportement) + S3 (Charge/fatigue) | 🟠 CCC | ✅ Prêt + **P6 produit** |

### B. Nouvelles règles pour 3 MPs sans activation (12 règles)

#### MP F6 — Autonomie fonctionnelle, chutes et aides techniques

| # | Niveau | Condition | Status |
|---|--------|-----------|--------|
| F6-S1 | 🟢 Standard | *Chute ?* = "Oui sans gravité" | ✅ Prêt |
| F6-S2 | 🟢 Standard | *Difficultés à se lever ?* = "Oui" | ✅ Prêt |
| F6-CCC1 | 🟠 CCC | *Chute ?* = "Oui avec complication" **ET** *Aide technique ?* = "Aucune" | ✅ Prêt |
| F6-CCC2 | 🟠 CCC | *Se nourrir ?* = "Non" **ET** *Incontinente ?* = "Oui" | ✅ Prêt |

> **Dr. Monka** : CCC suffisant (pas critique) — pas d'accès à la temporalité dans les questions.

#### MP M6 — Plan de soins, évaluations et inquiétudes

| # | Niveau | Condition | Status |
|---|--------|-----------|--------|
| M6-S1 | 🟢 Standard | *Plan de route clair ?* = "Non, au jour le jour" | ✅ Prêt |
| M6-S2 | 🟢 Standard | *Évaluation spécialisée ?* = "Non, aucune" | ✅ Prêt |
| M6-CCC1 | 🟠 CCC | *Plan de route ?* = "Non" **ET** *Organisation soins ?* = "Compliquée/Ingérable" | ✅ Prêt |
| M6-S3 | 🟢 Standard | *Enfant orienté TND ?* = "Non, personne ne nous en a parlé" | ✅ Prêt |

> **Dr. Monka** : Pas de distinction enfant/adulte pour l'instant → viendra avec les personas.

#### MP A4 — Situation scolaire/professionnelle et budget

| # | Niveau | Condition | Status |
|---|--------|-----------|--------|
| A4-S1 | 🟢 Standard | *Moyens financiers ?* = "Non" | ✅ Prêt |
| A4-S2 | 🟢 Standard | *École adaptée ?* = "Très difficile" ou "Non" | ✅ Prêt |
| A4-S3 | 🟢 Standard | *Besoin AESH/AVS ?* = "Oui, pas en place" | ✅ Prêt |
| A4-CCC1 | 🟠 CCC | *Moyens financiers ?* = "Non" **ET** *Accompagnement admin ?* = "Aucun" | ✅ Prêt |
| A4-S4 | 🟢 Standard | *Activité adaptée ?* = "Non, crée des difficultés" | ✅ Prêt |

> **Dr. Monka** : Pas de CCC financier+E62 → redondant (E62="Non" déclenche déjà une règle critique A2).

---

## 📊 Impact DB — Table `activation_rules`

| Catégorie | Nb règles à ajouter | Détail |
|-----------|---------------------|--------|
| CCC inter-V | **2 prêtes** + 1 à préciser | CCC-IV-1, CCC-IV-4 prêts · CCC-IV-2 attend identification question V3 |
| F6 (4 règles) | **4** | 2 standard + 2 CCC |
| M6 (4 règles) | **4** | 3 standard + 1 CCC |
| A4 (5 règles) | **5** | 4 standard + 1 CCC |
| **TOTAL** | **15 règles** | 68 existantes → **83 règles** |

### Passage de 21/24 à 24/24 MPs couverts ✅

| MP | Avant | Après |
|----|-------|-------|
| F6 (Autonomie fonctionnelle) | ⚪ Prévention uniquement | 🟢🟠 Activable |
| M6 (Plan de soins) | ⚪ Prévention uniquement | 🟢🟠 Activable |
| A4 (Scolarité/budget) | ⚪ Prévention uniquement | 🟢🟠 Activable |

---

## ⚠️ ACTIONS REQUISES AVANT MIGRATION

| # | Action | Qui | Bloquant ? |
|---|--------|-----|------------|
| 1 | **Identifier la question V3 exacte pour CCC-IV-2** | Antonin + Dr. Monka | ⚠️ Oui — le "renoncement aux soins" n'est pas une réponse directe |
| 2 | **Mapper les question_id** pour chaque règle | Antonin | Non — technique |
| 3 | **Définir le `condition_logic`** JSON pour chaque règle | Antonin | Non — technique |
| 4 | **P6 — Signal urgence CRM** pour CCC-IV-4 | Produit | Non bloquant pour la migration |

---

## ✅ DÉCISION À PRENDRE

> Une fois le point 1 résolu (question V3 pour CCC-IV-2), la migration peut être exécutée en une seule opération :
> - **15 INSERT** dans `activation_rules`
> - **0 modification** de structure (même schéma)
> - **0 changement de code** (le moteur traite déjà les CCC)

**Feu vert pour migrer les 14 règles prêtes maintenant, et ajouter CCC-IV-2 quand la question sera identifiée ?**
