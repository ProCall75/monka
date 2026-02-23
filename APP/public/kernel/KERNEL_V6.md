# 🔒 MONKA KERNEL v6 — Moteur Clinique Déterministe

> **Version** : v6 — 21/02/2026
> **Objectif** : Source de vérité du moteur clinique Monka. Ce document décrit la logique complète, les règles de fonctionnement et l'architecture des données.
> **Audience** : Équipe technique, partenaires stratégiques, validation clinique.

---

## 1. ARCHITECTURE GÉNÉRALE

Le moteur Monka est un **système déterministe** — aucune IA dans la décision clinique. Chaque sortie est traçable à une règle explicite.

```
  ENTRÉE                    MOTEUR                      SORTIE
┌───────────────┐    ┌─────────────────────┐    ┌─────────────────────────┐
│ 130 Q. socle  │───▶│                     │───▶│ Recommandations (recos) │
│  20 Q. aidance│    │  240 règles         │    │   └── Micro-Tâches (MT) │
│  15 triggers  │    │  d'activation       │    │                         │
│  30 suivi     │    │  (SI Q=R → Reco)    │    │ Score par vulnérabilité │
└───────────────┘    │                     │    │ Signaux d'alerte (CCC)  │
                     │  Scoring parallèle  │    │ Guides d'action         │
                     └─────────────────────┘    └─────────────────────────┘
```

### Principes fondamentaux

1.  **Déterminisme total** — Chaque recommandation est le résultat d'une règle `SI question = réponse ALORS activer`. Pas de modèle statistique, pas de machine learning.
2.  **Autonomie de l'aidant** — Le système fonctionne **avec ou sans IDEC** (coordinateur). L'aidant peut utiliser Monka seul.
3.  **Double audience** — Les mêmes recommandations sont présentées en 2 versions : un conseil bienveillant pour l'aidant, une directive professionnelle pour l'IDEC.

---

## 2. GLOSSAIRE

| Terme | Définition |
|---|---|
| **Vulnérabilité (V)** | Domaine de risque. 5 au total : Social, Administratif, Santé aidant, Fragilité proche, Parcours médical. |
| **Micro-Parcours (MP)** | Sous-thème clinique au sein d'une V. 24 au total. |
| **Question (Q)** | Élément du questionnaire. Classée état, facteur, ou les deux. 130 questions socle communes + 20 questions spécifiques au type d'aidance (soit 150 questions au total). |
| **Trigger** | Information de profil (âge, type d'aidance, lien de parenté). Conditionne l'affichage de certaines questions et l'activation de recos spécifiques. Ne participe pas au scoring, mais peut conditionner l'activation de recos. |
| **Catégorie de reco** | Axe d'action clinique distinct au sein d'un MP. Un MP contient 2 à 4 catégories selon sa complexité clinique. 73 catégories au total. |
| **Règle d'activation** | Condition `SI Q = R ALORS activer la catégorie au niveau N`. Peut être simple (1 condition) ou composite (CCC = plusieurs conditions combinées). |
| **Recommandation (Reco)** | Conseil donné à l'aidant, rattaché à une catégorie. Existe en 3 niveaux d'urgence + 1 mode prévention, et toujours en 2 versions (aidant + IDEC). Chaque reco est rattachée à une catégorie. |
| **Micro-Tâche (MT)** | Action concrète contenue dans une reco. Verbe d'action. 2 versions wording (aidant + IDEC). |
| **ASR** | Action Seuil de Réussite. Objectif mesurable d'un MP. Validée quand toutes les MT contributives actives sont complétées. |
| **CCC** | Condition Critique Composite. Combinaison de réponses qui déclenche un niveau d'urgence supérieur à ce que chaque réponse déclencherait seule. Les CCC sont des signaux d'alerte. |
| **Scoring** | Note d'intensité par vulnérabilité. Indicateur contextuel indépendant du déclenchement des recos. |
| **IDEC** | Infirmier(e) Diplômé(e) d'État Coordinateur. Le professionnel Monka côté pro, qui accompagne l'aidant. |

---

## 3. LES 5 VULNÉRABILITÉS

| V | Nom | MPs | Questions | Focus |
|---|---|---|---|---|
| **V1** | Social & Relationnel | R1, R2, R3, R4 | 15 | Isolement, réseau, relation aidant-aidé, impact vie sociale |
| **V2** | Administrative | A1, A2, A3, A4 | 18 | Droits, aides, démarches, budget, protection juridique |
| **V3** | Santé de l'aidant | S1, S2, S3, S4 | 26 | Épuisement, charge, sécurité, accès aux soins de l'aidant |
| **V4** | Fragilité du proche | F1, F2, F3, F4, F5, F6 | 55 | Autonomie, comportement, douleur, hospitalisations, aménagement |
| **V5** | Parcours médical du proche | M1, M2, M3, M4, M5, M6 | 36 | Diagnostic, accès soins, coordination, urgences, suivi spécialisé |
| | **TOTAL** | **24 MPs** | **150 (130 socle + 20 aidance)** | 130 socle + 20 aidance + 15 triggers |

---

## 4. RÈGLES DU MOTEUR (K1 — K18)

### Bloc A — Activation et criticité

| # | Règle |
|---|---|
| **K1** | **Recos activées par les rules, pas par les MPs.** Les règles d'activation évaluent les réponses et activent les catégories de reco. Le MP s'active quand au moins une de ses catégories est activée. |
| **K2** | **3 niveaux d'activation + 1 mode prévention.** 🔴 Critique (≤7j) · 🟠 CCC (≤30j) · 🟢 Standard (≤90j) · ⚪ Prévention (quand rien ne fire). |
| **K3** | **Winner-takes-all par catégorie.** Si une catégorie est activée à plusieurs niveaux, seul le plus élevé s'affiche. Deux catégories différentes sont indépendantes et ne s'absorbent jamais. |
| **K4** | **Fallback prévention.** Chaque MP a 1 reco de prévention affichée quand aucune règle de ce MP n'a firé. |

### Bloc B — Recommandations et Micro-Tâches

| # | Règle |
|---|---|
| **K5** | **Reco = enveloppe de MT.** Une recommandation contient N micro-tâches. |
| **K6** | **Double wording obligatoire.** Chaque reco et chaque MT a 2 versions : aidant (conseil bienveillant) et IDEC (directive pro). Les deux voient les mêmes recos et les mêmes MT. |
| **K7** | **Autonomie.** Le système est conçu pour fonctionner sans IDEC. L'aidant peut agir seul. |
| **K8** | **Acteur au niveau MT.** Chaque MT désigne un acteur responsable de son exécution (IDEC, aidant, médecin traitant, spécialiste, assistante sociale, etc.). |

### Bloc C — ASR et validation

| # | Règle |
|---|---|
| **K9** | **1 MP = 1 ASR.** Chaque MP a une et une seule Action Seuil de Réussite (objectif = changement d'état). |
| **K10** | **2 familles de MT.** Contributives 📍 (types STRUC, SEC, MED) — font avancer l'ASR. Non-contributives 💡 (types INFO, ORGA) — accompagnent sans bloquer. |
| **K11** | **ASR = 100% contributives.** L'ASR est validée quand toutes les MT contributives actives sont complétées. |
| **K12** | **Types non tous obligatoires.** Un MP peut ne pas avoir les 3 types contributifs. K11 s'applique sur ce qui existe. |

### Bloc D — Scoring

| # | Règle |
|---|---|
| **K13** | **Scoring indépendant.** Le score mesure l'intensité d'une vulnérabilité. Il ne déclenche jamais un MP et ne conditionne jamais une reco. C'est un indicateur contextuel. |
| **K14** | **Scoring par vulnérabilité.** Chaque V a un score calculé à partir d'un sous-ensemble de ses questions (les questions scorantes). Score normalisé 0-100. |

### Bloc E — Règles complémentaires

| # | Règle |
|---|---|
| **K15** | **MT liées à la catégorie, pas au niveau.** Les mêmes MT s'appliquent quel que soit le niveau de criticité. Seul le wording varie. |
| **K16** | **Reco = cap, MT = action.** La reco est un label court (direction à suivre). La MT est un verbe d'action concret (ce que l'aidant fait). |
| **K17** | **Domaine clinique.** Chaque MT est classée 🏥 Médical ou 🤝 Médico-social selon la filière d'intervention. |
| **K18** | **Écosystème d'acteurs.** Chaque MT désigne un ou plusieurs acteurs responsables (IDEC, aidant, médecin traitant, spécialiste, assistante sociale, service d'aide à domicile, etc.). L'ensemble des acteurs par MP forme un écosystème d'intervention coordonnée. |

---

## 5. PIPELINE — Du questionnaire aux recommandations

### Étape 1 — Questionnaire

L'aidant remplit le questionnaire :
- **130 questions socle** communes à tous les profils, explorent les 5 domaines de vulnérabilité
- **20 questions spécifiques** selon le type d'aidance (enfant, personne âgée, handicap, addiction, troubles psy)
- **15 triggers** définissent le profil (âge aidant, âge proche, type d'aidance, situation professionnelle, lieu de vie)
- Les triggers conditionnent l'affichage de certaines questions (ex : questions AGGIR niquement si le proche est une personne âgée)

> Le questionnaire est figé pour le moment — les questions ne sont pas modifiées en cours d'exploitation.

### Étape 2 — Évaluation des règles

Le moteur parcourt les **240 règles d'activation**. Pour chaque règle :

```
SI condition(s) satisfaite(s) par les réponses de l'aidant
→ ALORS activer la catégorie de reco au niveau correspondant
```

- **Règle simple** (standard/critique) : 1 condition → `SI E11 = "Oui, régulièrement" → CRIT`
- **Règle composite** (CCC) : N conditions combinées → `SI E23 = "Ne peut pas rester seul" ET E24 = "En permanence" → CCC`

Si plusieurs règles activent la même catégorie → K3 : seul le niveau le plus haut s'affiche.
Si aucune catégorie du MP n'est activée → K4 : la prévention prend le relais.

### Étape 3 — Génération des sorties

Pour chaque catégorie activée, le moteur produit :
1. **La reco** — un conseil adapté au niveau de criticité, en 2 versions (aidant + IDEC)
2. **Les MT** — les actions concrètes, avec un wording adapté à l'urgence
3. **Les métadonnées** — acteur, domaine (🏥/🤝), type contributif, rattachement à l'ASR

### Étape 4 — Scoring (parallèle)

En parallèle, le moteur calcule un **score d'intensité** par vulnérabilité :
- 95 questions scorantes sur 150 (les questions pertinentes et fiables, validées une par une)
- Échelle +0 / +1 / +2 par réponse
- Score normalisé sur 100 par vulnérabilité
- Le scoring **ne déclenche jamais** un MP (K13)

### Étape 5 — Suivi dans le temps

30 questions de suivi détectent les changements. Si l'aidant signale un changement :
- Les questions du MP concerné sont réouvertes
- Les règles sont réévaluées
- Les recos sont mises à jour

C'est un cycle continu — le plan de l'aidant évolue avec sa situation.

---

## 6. STRUCTURE D'UN MICRO-PARCOURS

```
MP [ID] — [NOM]
│
├── 🏆 ASR : « [Objectif mesurable — changement d'état visé] »
│
├── 📌 CATÉGORIE 1 : « [Axe d'action clinique] »
│   ├── 🔴 Critique   → Reco urgente (≤7j) + MT wording urgent
│   ├── 🟠 CCC        → Reco vigilance (≤30j) + MT wording vigilant
│   └── 🟢 Standard   → Reco progressive (≤90j) + MT wording progressif
│   → K3 : seul le niveau le plus haut s'affiche
│   → K15 : mêmes MT, wording différent par niveau
│
├── 📌 CATÉGORIE 2 : « [Autre axe d'action] »
│   └── 🟢 Standard   (seul niveau existant → pas de CCC/CRIT nécessaire)
│
└── ⚪ PRÉVENTION (quand aucune règle ne fire → K4)
    └── Reco conseil + MT de veille
```

### Types de Micro-Tâches

| Famille | Types | Rôle | Contribue à l'ASR ? |
|---|---|---|---|
| 📍 **Contributive** | STRUC (structurer), SEC (sécuriser), MED (médical) | Actions concrètes qui font avancer l'objectif | ✅ Oui |
| 💡 **Non-contributive** | INFO (informer), ORGA (organiser) | Accompagnement, orientation, information | ❌ Non |

---

## 7. ÉTAT DE LA BASE CLINIQUE

| Métrique | Quantité |
|---|---|
| Vulnérabilités | **5** |
| Micro-Parcours (MP) | **24** |
| Questions (état/facteur) | **150** |
| Triggers contextuels | **15** |
| Questions de suivi | **30** |
| Catégories de reco | **73** |
| Règles d'activation | **240** (115 STD · 85 CCC · 40 CRIT) |
| Recommandations | **202** (73 STD · 72 CCC · 33 CRIT · 24 PREV) |
| Micro-Tâches | **390** (130 ORGA · 87 INFO · 83 SEC · 56 MED · 34 STRUC) |
| Questions scorantes | **95** / 150 |
| Guides d'action | **42** |
| Acteurs distincts | **76** |

---

> 🔒 **KERNEL v6 — Source de vérité du moteur clinique Monka.**
