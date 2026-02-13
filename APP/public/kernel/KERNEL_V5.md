# 🔒 MONKA KERNEL v5 — Source de Vérité Consolidée

> **Version** : v5 — 12/02/2026  
> **Statut** : 📋 **À VERROUILLER** par Dr. Monka  
> **Objectif** : Ce document remplace `RECAP_FONDATION v4` + `RECAP_EVOLUTIONS`. Il consolide TOUTES les règles, décisions validées, et spécificités connues du moteur Monka au 12/02/2026.  
> **Règle** : Tant que ce document n'est pas verrouillé 🔒, la validation V par V ne commence pas.

---

## 1. LE QUESTIONNAIRE (FIGÉ ✅)

| Bloc | Quantité | Statut |
|------|----------|--------|
| **Questions état/facteur** | **150** | ✅ Figé |
| **Triggers** (contexte/profil) | **15** | ✅ Figé — liste fermée |
| **Questions de suivi** | **~30** | ✅ Défini |
| **TOTAL** | **~195** | |

**Décisions intégrées :**
- [x] D1 — 15 triggers identifiés et retirés du questionnaire principal
- [x] D2 — 150 + 15 = 165 éléments confirmés
- [x] D3 — Colonne "aidance" supprimée (toutes questions = tous profils)
- [x] D4 — 4 questions reclassifiées (E40, E47, E55 : état→facteur · O51 : facteur→état)

---

## 2. LES RÈGLES DU KERNEL

### BLOC A — Activation (K1-K4) ✅ INCHANGÉ

| # | Règle | Énoncé |
|---|-------|--------|
| **K1** | Recos liées au MP | Les recommandations visent l'**objectif du MP (= l'ASR)**, pas les questions individuelles. |
| **K2** | 3 niveaux d'activation | 🔴 Critique (≤7j) · 🟠 CCC (≤30j) · 🟢 Standard (≤90j) |
| **K3** | Le plus haut englobe | Si plusieurs niveaux activent le même MP, **seule la reco du niveau le plus haut** est affichée. |
| **K4** | Prévention si non activé | Chaque MP a des recos de **prévention générale** (⚪) même s'il n'est pas activé. |

### BLOC B — Recommandations & Micro-Tâches (K5-K8) ✅ INCHANGÉ

| # | Règle | Énoncé |
|---|-------|--------|
| **K5** | Reco = enveloppe de MT | Une recommandation **contient** des micro-tâches. |
| **K6** | Visibilité totale | L'utilisateur ET l'IDEC voient les **mêmes recos/MT**. Seul le **wording** change. |
| **K7** | Autonomie par défaut | Le système est conçu pour fonctionner **sans IDEC**. |
| **K8** | Délégation au niveau reco | "Qui fait quoi" se décide au niveau de la **recommandation**. |

### BLOC C — MT, ASR & Validation (K9-K12) ✅ INCHANGÉ

| # | Règle | Énoncé |
|---|-------|--------|
| **K9** | 1 MP = 1 ASR | Chaque MP a **une et une seule** ASR (objectif = changement d'état). |
| **K10** | 2 catégories de MT | **Contributives** (STRUC/SEC/MED) · **Non-contributives** (INFO/ORGA). |
| **K11** | 100% contributives = ASR | L'ASR est validée quand **toutes les MT contributives** sont complétées. |
| **K12** | Types non tous obligatoires | Un MP peut ne pas avoir les 3 types contributifs. K11 s'applique sur **ce qui existe**. |

### BLOC D — Scoring (K13) ✅ INCHANGÉ

| # | Règle | Énoncé |
|---|-------|--------|
| **K13** | Scoring indépendant | Le score mesure l'**intensité** d'une vulnérabilité. Il ne déclenche **jamais** un MP. |

### BLOC E — Règles Post-Fondation (K14-K19) 🆕

> Décisions validées entre le 07/02 et le 12/02/2026 qui complètent les 13 règles d'origine.

| # | Règle | Énoncé | Source |
|---|-------|--------|--------|
| **K14** | Recos par MP, pas par question | Les recommandations sont rattachées aux **Micro-Parcours** (103 recos regroupées, pas 707 legacy). Modèle 4×24=96 **caduc**. | D6, validé 10/02 |
| **K15** | CCC inter-vulnérabilités | Les CCC peuvent combiner des questions de **vulnérabilités différentes**. Le moteur ne fait aucune différence technique. | Validé 12/02 |
| **K16** | CCC inter-V utile ssi change la reco | Une CCC inter-V ne vaut le coup **que si elle change la recommandation** ou révèle un risque que les MP séparés ne captent pas. | Validé 12/02 |
| **K17** | Pas de distinction enfant/adulte (pour l'instant) | Les règles d'activation couvrent tous les profils sans filtrage. La différenciation viendra avec les **personas**. | Validé 12/02 |
| **K18** | Temporalité non disponible | Les questions ne mesurent pas la temporalité → impossible de déterminer si un bilan est urgent ou non. Impact : CCC suffisant pour les chutes (pas critique). | Validé 12/02 |
| **K19** | Redondance critique existante | Avant de créer une CCC, vérifier qu'une **règle critique existante** ne couvre pas déjà le cas (ex : E62="Non" → critique A2 existante). | Validé 12/02 |

---

## 3. LES 5 VULNÉRABILITÉS (FIGÉ ✅)

| ID | Nom | MPs | Questions | Nb MPs |
|----|-----|-----|-----------|--------|
| **V1** | Social & Relationnel | R1-R4 | 15 | 4 |
| **V2** | Administrative | A1-A4 | 36 | 4 |
| **V3** | Santé physique & psychologique | S1-S4 | 26 | 4 |
| **V4** | Fragilité du proche | F1-F6 | 55 | 6 |
| **V5** | Parcours médical du proche | M1-M6 | 18 | 6 |
| | **TOTAL** | | **150** | **24** |

---

## 4. RÈGLES D'ACTIVATION — ÉTAT AU 12/02

### 4.1 — Base existante (68 règles en DB)

| V | 🔴 Critiques | 🟠 CCC | 🟢 Standard | Total | MPs couverts |
|---|---|---|---|---|---|
| V1 Social | 2 | 8 | 4 | 14 | 4/4 ✅ |
| V2 Admin | 3 | 3 | 5 | 11 | 3/4 |
| V3 Santé | 2 | 4 | 5 | 11 | 4/4 ✅ |
| V4 Fragilité | 5 | 5 | 5 | 15 | 5/6 |
| V5 Parcours | 0 | 8 | 9 | 17 | 5/6 |
| **Total** | **12** | **28** | **28** | **68** | **21/24** |

### 4.2 — Nouvelles règles validées (15 à ajouter)

**A. CCC inter-vulnérabilités (3 règles) :**

| ID | Combo | Conditions | Level | Status |
|----|-------|-----------|-------|--------|
| CCC-IV-1 | Épuisé + Isolé | V3×V1 : Épuisement="Épuisé" ET Soutien="Personne" | 🟠 | ✅ Prêt |
| CCC-IV-2 | Renoncement + Proche non autonome | V3×V4 : *Question V3 à préciser* ET Temps seul="Ne peut pas rester seul" | 🟠 | ⚠️ Question V3 à identifier |
| CCC-IV-4 | Proche dangereux + Aidant épuisé | V4×V3 : Comportements dangereux="Oui" ET Épuisement="Épuisé" | 🟠 | ✅ Prêt + **P6 produit** |

> Combos 3, 5, 6 rejetés (3=redondant question pivot · 5+6=rejetés Dr. Monka 12/02)

**B. 3 MPs sans activation legacy (12 règles) :**

| MP | Standard | CCC | Total |
|----|----------|-----|-------|
| **F6** — Autonomie, chutes, aides techniques | 2 | 2 | 4 |
| **M6** — Plan de soins, évaluations | 3 | 1 | 4 |
| **A4** — Scolarité/professionnelle, budget | 4 | 1 | 5 |
| **Total** | **9** | **4** | **13** |

### 4.3 — État cible après migration

| Métrique | Avant | Après |
|----------|-------|-------|
| Règles d'activation | 68 | **83** |
| MPs couverts | 21/24 | **24/24** ✅ |
| CCC inter-V | 3 existantes (legacy) | **5-6** |

---

## 5. RECOMMANDATIONS & MT — ÉTAT AU 12/02

| Métrique | Valeur | Statut |
|----------|--------|--------|
| **Recommandations** | 103 regroupées par MP | ✅ En DB · ⚠️ Validation Dr. Monka en attente |
| **Micro-Tâches** | 299 rattachées aux 103 recos | ✅ 0 orpheline |
| **ASR** | 24 (1 par MP) | ✅ En DB |
| **Enrichissements IA 🤖** | 621 propositions | ⚠️ À valider par Dr. Monka |

**Enrichissements IA à valider :**

| Type | Volume | Détail |
|------|--------|--------|
| Domaine MT (🏥/🤝) | 299 MTs | 88 médical (29%) + 211 médico-social (71%) |
| Acteur assigné | 299 MTs | IDEC 63%, Aidant 17%, MT 9%, Pro santé 6% |
| Seuils scoring | 20 seuils (4×5V) | Division proportionnelle ~25% par plage |
| Wording IDEC manquant | 3 recos | R1_RECO_02, S1_RECO_04, A4_RECO_01 |

---

## 6. DÉCISIONS EN SUSPENS (P1-P6)

> [!CAUTION]
> Ces décisions **conditionnent** la validation V par V. Elles peuvent être statuées pendant ou avant la session de validation.

| # | Sujet | Options | Impact | Bloquant ? |
|---|-------|---------|--------|------------|
| **P1** | 5 questions CCC supplémentaires | Ajouter / Ne pas ajouter | Enrichit les alertes critiques | Non |
| **P2** | Scoring : reclassifier ~15 questions | Legacy 38 / Reclassifié 55 / Mixte | Change la grille scoring | **Oui pour E** |
| **P3** | Pondération scoring | +1 uniforme / +1/+2 différencié | Sensibilité du score | **Oui pour E** |
| **P4** | Seuils scoring | Mathématiques (÷4) / Cliniques | Interprétation du score | **Oui pour E** |
| **P5** | Recos désactivables par contexte | Oui / Non | Architecture produit | Non |
| **P6** | Signal urgence CRM (Combo 4 CCC) | Nouveau niveau / Flag CRM / Notif IDEC | Produit : comment remonter l'urgence max | Non |

> **Conclusion** : Les décisions **P2, P3, P4** sont bloquantes pour valider les templates E (Scoring). Les templates A, B, C, D peuvent être validés indépendamment.

---

## 7. ANOMALIES IDENTIFIÉES

| # | Anomalie | V | Question pour Dr. Monka | Bloquant pour validation V ? |
|---|----------|---|-------------------------|------------------------------|
| A1 | F6 sans règle d'activation legacy | V4 | → **Résolu** : 4 règles proposées et validées (CCC doc) | ✅ Résolu |
| A5 | E21 partagée V3+V5 | V3, V5 | Le score compte 2 fois ? | Oui pour E |
| A7 | 5 questions multi-MP (O51, O53, O54, E46, E21) | Multi | Lien 1:1 ou 1:N ? | Non |
| A8 | 5 questions "enfant" (E38, E59, E60, E64, E65) | Multi | → **Reporté** : viendra avec les personas (K17) | ✅ Reporté |
| A9 | 3 MPs sans règle legacy (F6, M6, A4) | V4, V5, V2 | → **Résolu** : 13 règles proposées et validées (CCC doc) | ✅ Résolu |

> Anomalies A2, A3, A4, A6 seront traitées pendant la validation V par V (elles sont spécifiques à une V).

---

## 8. ORDRE DE VALIDATION

> [!IMPORTANT]
> **Ce document (KERNEL v5) doit être verrouillé AVANT de commencer la validation V par V.**

```
ÉTAPE 1 : Verrouiller ce document (KERNEL v5)
    ↓
ÉTAPE 2 : Statuer les décisions P2/P3/P4 (scoring) — ou les reporter
    ↓
ÉTAPE 3 : Validation V par V
    ├── V1 (pilote complet : A→E)
    ├── V2 (A→E)
    ├── V3 (A→E)
    ├── V4 (A→E)
    └── V5 (A→E)
    ↓
ÉTAPE 4 : Migration DB des 15 nouvelles règles
    ↓
ÉTAPE 5 : Valider les enrichissements IA 🤖 (621 propositions)
```

**Pour chaque V, la validation couvre :**
1. **A** — Règles d'activation (critiques + CCC + standard)
2. **B** — Recommandations (wording par niveau)
3. **C** — Micro-tâches et ASR (contribution, types, validation)
4. **D** — Questions de suivi
5. **E** — Scoring (⚠️ dépend de P2/P3/P4)

---

## 9. ARBORESCENCE DES DOCUMENTS

```
KERNEL/
├── 🔒 KERNEL_V5.md                      ← CE DOCUMENT (source de vérité)
├── RECAP_FONDATION_MONKA.md              ← Historique v4 (07/02) — archivé
├── RECAP_EVOLUTIONS_POST_KERNEL.md       ← Historique évolutions — archivé
├── TODO_VALIDATION_DR_MONKA.md           ← Checklist validation V par V
├── RAISONNEMENT_ENRICHISSEMENT_IA.md     ← 621 propositions IA documentées
├── TRIGGERS_ET_PERSONAS.md               ← 15 triggers + 10 personas
├── E_GLOBAL_scoring.md                   ← Scoring inter-V
├── V1_social_relationnel/                ← 5 templates A→E
├── V2_administrative/                    ← 5 templates A→E
├── V3_sante_aidant/                      ← 5 templates A→E
├── V4_fragilite_proche/                  ← 5 templates A→E
└── V5_parcours_medical/                  ← 5 templates A→E
```

**Assainissement prévu :**
- `RECAP_FONDATION_MONKA.md` → reste comme historique, annotée "supersédée par KERNEL_V5"
- `RECAP_EVOLUTIONS_POST_KERNEL.md` → reste comme historique, annotée "intégrée dans KERNEL_V5"
- Fichiers legacy dans les dossiers V (scoring.md, ccc.md, declencheurs.md, etc.) → à archiver après validation

---

> 🔒 **KERNEL v5 — À verrouiller par Dr. Monka avant toute validation V par V.**  
> Toute modification de ce document après verrouillage nécessite une analyse d'impact sur les 25 templates en aval.
