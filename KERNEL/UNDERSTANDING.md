# 📖 UNDERSTANDING — Glossaire du KERNEL Monka

> **Source de vérité** : [`RECAP_FONDATION_MONKA.md`](RECAP_FONDATION_MONKA.md) (v4 FINALE)  
> **Mise à jour** : 09/02/2026  
> **Rôle** : Compagnon du KERNEL — explicite les termes dans le contexte des 13 règles K1→K13

---

## 📚 GLOSSAIRE

### Termes Fondamentaux

| Terme | Définition | Règle KERNEL |
|-------|------------|-------------|
| **Vulnérabilité (V)** | Dimension de fragilité de l'aidant. 5 vulnérabilités fixes (V1→V5). Chaque V regroupe des questions thématiques | — |
| **Question** | Élément du questionnaire posé à l'aidant. Identifiée par un ID unique (ex: E2, N4, O27). **150 questions + 15 triggers = 165 éléments** | — |
| **Option** | Réponse possible à une question. Peut avoir un score et/ou déclencher des actions | — |
| **Trigger** | Question de **contexte/profil** (15 au total, liste fermée). **NE DÉCLENCHE RIEN**. Sert aux futurs personas | — |
| **Déclencheur** | Question/CCC qui **ACTIVE** un micro-parcours. 3 niveaux de priorité | K2 |

### Le Moteur

| Terme | Définition | Règle KERNEL |
|-------|------------|-------------|
| **Micro-Parcours (MP)** | Ensemble structuré d'actions activé par un déclencheur. ~24 MP au total, répartis sur V1→V5 | K1 |
| **ASR** | Action Structurante de Référence = **objectif de sécurisation** du MP. C'est un **changement d'état** à atteindre, pas une tâche. **1 MP = 1 ASR unique** | K9 |
| **Recommandation (Reco)** | Conseil affiché à l'utilisateur. **La reco est une enveloppe qui contient des MT** — pas de séparation conceptuelle. Vise l'objectif du MP (= l'ASR), pas les questions individuelles | K1, K5 |
| **Micro-Tâche (MT)** | Action concrète à réaliser. L'utilisateur **ET** l'IDEC voient les mêmes recos et MT — seul le **wording** est adapté (vulgarisé pour l'utilisateur) | K6 |
| **Scoring** | Attribution de points mesurant l'**intensité** d'une vulnérabilité. **Indépendant** de l'activation des MP. Ne déclenche **jamais** un MP seul | K13 |

### Types de Micro-Tâches

| Type | Rôle | Contribue à l'ASR | Catégorie app |
|------|------|-------------------|---------------|
| **STRUC** | Changement structurel durable | ✅ Contributive | 📍 Sécurisation |
| **SEC** | Réduction d'un risque identifié | ✅ Contributive | 📍 Sécurisation |
| **MED** | Acte médical / prescription | ✅ Contributive | 📍 Sécurisation |
| **INFO** | Informer, expliquer | ❌ Non-contributive | 💡 Amélioration |
| **ORGA** | Préparer, coordonner | ❌ Non-contributive | 💡 Amélioration |

> Chaque MT a exactement 1 type, non cumulable, non modifiable (K10).

---

## ⚠️ DISTINCTION CRITIQUE : Triggers vs Déclencheurs

| Terme | Définition | Effet |
|-------|------------|-------|
| **Trigger** | Question de **contexte** (profil aidant/aidé) | ❌ NE DÉCLENCHE RIEN |
| **Déclencheur** | Question qui **active un MP** | ✅ Active un MP |

### 15 Triggers (liste fermée)

```
N3, O35, O36, N1, O64, O46, O14, O1, O63, O49, N26, E71, E72, O2, N31
```

---

## 🔄 CHAÎNE LOGIQUE

### 1. Activation des MP (K2, K3)

```
3 NIVEAUX D'ACTIVATION (par ordre de priorité) :

🔴 NIVEAU 1 — Question Critique
   UNE réponse à UNE question suffit → Activation immédiate
   Délai : ≤ 7 jours

🟠 NIVEAU 2 — CCC (Condition Critique Composite)
   PLUSIEURS réponses combinées (aucune critique seule)
   Délai : ≤ 30 jours

🟢 NIVEAU 3 — Déclencheur Standard
   UNE réponse spécifique, priorité basse
   Délai : ≤ 90 jours
```

**Règle d'englobement (K3)** : Si plusieurs niveaux activent le même MP, seule la reco du **niveau le plus haut** est affichée. Elle englobe et intensifie les niveaux inférieurs.

**Prévention (K4)** : Chaque MP a aussi des recos de **prévention générale** (⚪) même s'il n'est pas activé.

### 2. Structure d'une Recommandation (K5, K6, K7, K8)

```
RECOMMANDATION "[Libellé]"
│
├── 📍 ACTIONS DE SÉCURISATION (contributives → valident l'ASR)
│   ├── MT [STRUC] : "..."
│   ├── MT [SEC]   : "..."
│   └── MT [MED]   : "..."
│   → Barre de progression : 0/3 → 3/3 ✅ ASR VALIDÉE
│
└── 💡 ACTIONS D'AMÉLIORATION (non-contributives → qualité de vie)
    ├── MT [INFO]  : "..."
    └── MT [ORGA]  : "..."
    → Pas de barre de progression, pas d'impact sur l'ASR
```

- L'utilisateur voit clairement la séparation sécurisation / amélioration
- Le système est conçu pour que l'utilisateur puisse agir **sans IDEC** (K7)
- La délégation « qui fait quoi » se prend au niveau de la **recommandation**, pas de chaque MT (K8)

### 3. Validation de l'ASR (K9, K10, K11, K12)

```
ASR = Objectif du MP (changement d'état)

CONDITION DE VALIDATION :
  100% des MT contributives complétées = ASR VALIDÉE ✅

Pas tous les types obligatoires :
  Un MP peut ne pas avoir les 3 types contributifs (K12).
  La règle s'applique sur ce qui existe.
```

| Statut | Signification |
|--------|---------------|
| ✅ **Atteinte** | 100% des MT contributives complétées |
| ❌ **Non atteinte** | Au moins 1 MT contributive incomplète |
| ⏳ **Non confirmée** | Atteinte mais à revérifier au suivi mensuel |

### 4. Scoring (K13)

```
Scoring = mesure d'INTENSITÉ d'une vulnérabilité
  → INDÉPENDANT de l'activation des MP
  → Ne déclenche JAMAIS un MP
  → Un score peut être élevé sans qu'aucun MP ne soit activé
```

### 5. Suivi Dynamique (Entonnoir 3 niveaux)

```
N1 : "Des changements depuis le dernier suivi ?" → Oui/Non
  └── OUI → N2 : Par vulnérabilité (5 questions Oui/Non)
                └── OUI → N3 : Par MP de la V (1 question par MP)
                             └── OUI → Réouvre les questions initiales liées au MP
```

---

## ⚡ RÈGLES KERNEL RÉFÉRENCÉES

Ce glossaire est le **compagnon** du document [`RECAP_FONDATION_MONKA.md`](RECAP_FONDATION_MONKA.md) qui contient :
- Les **13 règles K1→K13** (source de vérité)
- Les **5 templates A→E** pour documenter chaque vulnérabilité
- Le **modèle relationnel** entre templates
- L'**ordre de production** (Pilote V1 → V2-V5 → Transversaux)

> 🔒 **Toute modification de ce glossaire doit respecter les 13 règles du KERNEL.**
