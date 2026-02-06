# 📖 Document de Compréhension - Monka Clinical Engine

> **Objectif** : Valider la compréhension de la terminologie et des liens entre concepts  
> **Date** : 06/02/2026  
> **À valider par** : Équipe Monka

---

## 📚 GLOSSAIRE

### Termes Fondamentaux

| Terme | Définition | Source |
|-------|------------|--------|
| **Vulnérabilité (V)** | Dimension de fragilité de l'aidant (V1-V5). Chaque V regroupe des questions thématiques. | Legacy |
| **Question** | Élément du questionnaire posé à l'aidant. Identifiée par un ID unique (ex: E2, N4, O27). | Legacy + Excel |
| **Option** | Réponse possible à une question. Chaque option peut avoir un score et/ou déclencher des actions. | Legacy + Excel |
| **Scoring** | Attribution de points à certaines options pour mesurer l'intensité d'une situation. | Legacy scoring |
| **Recommendation** | Conseil affiché à l'utilisateur dans l'app selon ses réponses. | Excel SOPHIE CAT |
| **Micro-tâche (MT)** | Action concrète à réaliser par l'équipe IDEC. Interne, non visible par l'utilisateur. | Excel SOPHIE CAT |
| **Typologie MT** | Catégorisation des micro-tâches (STRUC/SEC/MED/INFO/ORGA). | Legacy typologie |
| **Micro-parcours (MP)** | Ensemble d'actions structurées (ASR) à réaliser suite à un déclenchement (ex: R1, R2, R3, R4). | Legacy Micro parcours |
| **ASR** | Action Structurante de Référence. **Objectif utilisateur** = état à atteindre. **1 MP = 1 ASR**. N'est PAS une tâche. | Legacy ASR |
| **Trigger** | Question de **contexte/profil** (ex: âge, situation, type d'aidance). **NE DÉCLENCHE RIEN**. Sert aux futurs personas. | Legacy questionnaire 4.7 |
| **Déclencheur** | Question/CCC qui **ACTIVE** un micro-parcours. 3 niveaux de priorité. | Legacy Priorisation |
| **CCC** | Condition Critique Composite. Combinaison de réponses qui déclenche un MP (sans question critique). | Legacy Typologie,CCC |
| **Question Critique** | Question dont une réponse spécifique déclenche immédiatement un MP (Priorité 1). | Legacy Priorisation |
| **Signature ASR** | Indicateur de validation qu'une action ASR a été réalisée. | Legacy ASR |
| **Suivi** | Questions posées mensuellement pour évaluer l'évolution de la situation. | Legacy suivi longitudinal |
| **Progression** | États et transitions d'un micro-parcours (INIT → EN_COURS → COMPLET). | Legacy grammaire |

---

## 🔄 LIENS ENTRE LES CONCEPTS

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         QUESTIONNAIRE (5 V)                             │
│                                                                         │
│  ┌────────────┐     ┌────────────┐     ┌────────────┐                  │
│  │  Question  │────▶│   Option   │────▶│   Score    │ (si scorante)    │
│  └────────────┘     └────────────┘     └────────────┘                  │
│         │                  │                                            │
│         │                  ▼                                            │
│         │           ┌────────────────┐     ┌────────────────┐          │
│         │           │ Recommendation │────▶│  Micro-tâche   │          │
│         │           │  (Utilisateur) │     │    (IDEC)      │          │
│         │           └────────────────┘     └────────────────┘          │
│         │                                         │                     │
│         ▼                                         ▼                     │
│  ┌─────────────┐                          ┌────────────────┐           │
│  │ Déclencheur │───────────────────────────▶│ Micro-parcours │           │
│  │ (Critique/  │                          │   (R1-R4)      │           │
│  │  CCC/Std)   │                          └────────────────┘           │
│  └─────────────┘                                  │                     │
│                                                   ▼                     │
│                                            ┌────────────────┐          │
│                                            │      ASR       │          │
│                                            │ (Actions clés) │          │
│                                            └────────────────┘          │
│                                                   │                     │
│                                                   ▼                     │
│                                            ┌────────────────┐          │
│                                            │  Signatures    │          │
│                                            │ (Validation)   │          │
│                                            └────────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘
```


---

## ⚠️ DISTINCTION CRITIQUE : Triggers vs Déclencheurs

| Terme | Définition | Effet |
|-------|------------|-------|
| **Trigger** | Question de **contexte** (profil aidant/aidé) | ❌ NE DÉCLENCHE RIEN |
| **Déclencheur** | Question qui **active un MP** | ✅ Active un MP |

### Liste Officielle des 15 Triggers (Legacy 060226)

> ⚠️ **Liste FERMÉE et NORMATIVE** — Aucune modification sans analyse d'impact

```
N3, O35, O36, N1, O64, O46, O14, O1, O63, O49, N26, E71, E72, O2, N31
```

Ces questions décrivent des **facteurs de contexte** uniquement :
- Profil aidant/aidé (N1, O1, O2, O35, O36, O46)
- Temporalité (O49 - ancienneté du rôle)
- Priorités (O63)
- Contexte global (N3, N26, N31, O14, O64, E71, E72)

> **Legacy 060226** : *"Ce sont des triggers / facteurs de contexte, pas des états."*

---

## 🎯 CHAÎNE LOGIQUE DÉTAILLÉE

### 1. Question → Scoring

```
Question E2 : "Avez-vous des personnes sur qui compter ?"
    │
    ├── Option A : "Oui, plusieurs" → Score = 0
    ├── Option B : "Oui, une"       → Score = 1
    └── Option C : "Très peu"       → Score = 2
    
Le SCORING mesure l'INTENSITÉ, pas la gravité.
Le score ne déclenche JAMAIS un micro-parcours seul.
```

### 2. Question → Recommendation + Micro-tâche

```
Question E2 : "Avez-vous des personnes sur qui compter ?"
    │
    └── Option C : "Très peu de personnes"
            │
            ├── RECOMMENDATION (Utilisateur/App) :
            │   "Il est important de ne pas rester isolé..."
            │   Source: ✅ Excel SOPHIE CAT
            │
            └── MICRO-TÂCHES (IDEC/Interne) :
                1. "Orienter vers plateforme répit" [INFO] 🤖
                2. "Proposer groupe de parole"     [STRUC] 🤖
                   Source texte: ✅ Excel
                   Source type: 🤖 IA
```

### 3. Question → Déclencheur → Micro-parcours

```
TROIS TYPES DE DÉCLENCHEURS (par ordre de priorité) :

🔴 NIVEAU 1 - Question Critique Directe
   E2 = "Très peu" → Déclenche R2 (Soutien entourage)
   Délai: ≤ 7 jours
   Source: ✅ Legacy Priorisation
   
🟠 NIVEAU 2 - CCC (Condition Critique Composite)
   SI (E1 = "Je fais tout seul") ET (N4 = "Oui") → Déclenche R2
   Délai: ≤ 30 jours
   Source définition: ✅ Legacy Typologie,CCC
   Source recommendations: 🤖 IA
   
🟢 NIVEAU 3 - Déclencheur Standard
   N4 = "Oui" → Déclenche R2
   Délai: ≤ 90 jours
   Source: ✅ Excel
```

### 4. Micro-parcours → ASR → Signatures

```
Micro-parcours R2 (Soutien entourage)
    │
    └── ASR (1 seule par MP) :
        "Un relais humain mobilisable est effectivement en place."
        
        = OBJECTIF UTILISATEUR (état à atteindre)
        ≠ Tâche, ≠ Score, ≠ Recommendation
            │
            └── SIGNATURES (validation de l'ASR) :
                R2-A: "Au moins 1 personne relais identifiée"
                R2-B: "Intervention active d'un service mobilisable"

Règle Legacy R-ASR-01 : Chaque MP possède UNE et UNE SEULE ASR.
Règle Legacy R-ASR-02 : Les micro-tâches sont des MOYENS ; l'ASR est un CHANGEMENT D'ÉTAT.
```

### 5. Suivi → Comparaison temporelle

```
Mois 0: E2 = "Très peu" (Score = 2)
    │
    ▼
Mois 1: S_E2 = "Pas de changement" (Stable)
    │
    ▼
Mois 2: S_E2 = "Plus de personnes disponibles" (Amélioration ↗️)
    
Si dégradation ≥ 2 points → Alerte automatique
```

### 6. Progression → États du micro-parcours

```
INIT ──────▶ EN_COURS ──────▶ COMPLET
  │             │                │
  │             ├── PAUSE ◀──────┤
  │             │                │
  │             └── ÉCHEC ───────┤
  │                  │           │
  │                  └── RELANCE─┘
  │
  └── (Jamais d'état terminal direct)

États terminaux: COMPLET, ABANDON
```

---

## ⚡ RÈGLES CRITIQUES

### Scoring vs Criticité

| Aspect | Scoring | Criticité |
|--------|---------|-----------|
| **Mesure** | Intensité | Seuil de rupture |
| **Calcul** | Somme des points | Réponse spécifique |
| **Déclenche MP ?** | ❌ Jamais seul | ✅ Oui (Niveau 1) |
| **Relation** | Indépendant | Indépendant |

> ⚠️ **Règle fondamentale** : Le scoring et la criticité sont INDÉPENDANTS.
> Une question peut être scorante ET critique (ex: E2).

### Hiérarchie des priorités

```
NIVEAU 1 (Critique directe) > NIVEAU 2 (CCC) > NIVEAU 3 (Standard)
```

> ⚠️ Si une question critique est présente, elle prévaut TOUJOURS.

### CCC - Règle d'exclusion

> ⚠️ Une CCC ne contient JAMAIS de question critique directe.
> Raison : La question critique suffit seule, pas besoin de combinaison.

---

## 📊 RÉCAPITULATIF SOURCES

| Concept | Source officielle | Éléments IA |
|---------|-------------------|-------------|
| Questions | ✅ Legacy + Excel | - |
| Options | ✅ Legacy + Excel | - |
| Scoring | ✅ Legacy scoring | - |
| Recommendations | ✅ Excel SOPHIE CAT | - |
| Micro-tâches (texte) | ✅ Excel SOPHIE CAT | - |
| Micro-tâches (type) | ✅ Legacy typologie (définitions) | 🤖 Assignation |
| **Triggers** | ✅ Legacy questionnaire 4.7 | - |
| **Déclencheurs** | ✅ Legacy Priorisation | - |
| CCC (définition) | ✅ Legacy Typologie,CCC | - |
| CCC (recommendations) | - | 🤖 Entièrement |
| Micro-parcours | ✅ Legacy Micro parcours | - |
| ASR | ✅ Legacy ASR | - |
| Signatures | ✅ Legacy ASR | 🤖 V2-V5 partiel |
| Suivi | ✅ Legacy suivi + Excel mensuel | - |
| Progression | ✅ Legacy grammaire | - |

---

## ❓ QUESTIONS DE VALIDATION

1. **Scoring** : Le score ne sert qu'à mesurer l'intensité et n'a pas d'impact direct sur les déclenchements. Correct ?

2. **CCC** : Les définitions CCC viennent du Legacy, mais les recommendations/micro-tâches spécifiques à déclencher quand une CCC est activée ont été créées par IA. Correct ?

3. **Micro-tâches** : Le texte des MT vient de l'Excel, seul le typage (STRUC/SEC/etc.) a été assigné par IA. Correct ?

4. **Question critique vs CCC** : Une question critique déclenche directement un MP. Une CCC combine plusieurs questions non-critiques pour déclencher un MP. Correct ?

5. **Hiérarchie** : Niveau 1 (critique) > Niveau 2 (CCC) > Niveau 3 (standard), et si plusieurs déclencheurs s'activent, c'est toujours le plus prioritaire qui gagne. Correct ?

6. **ASR** : Chaque micro-parcours possède UNE et UNE SEULE ASR. L'ASR est un objectif utilisateur (état à atteindre), pas une tâche. Les micro-tâches sont des moyens pour y arriver. Correct ?

---

> 📋 Document à valider avant implémentation V1
