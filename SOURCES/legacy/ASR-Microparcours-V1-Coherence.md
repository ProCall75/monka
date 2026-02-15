# Cohérence ASR ↔ Micro-parcours — V1

> **Référentiel de synthèse** — Vision interne du lien structurel entre les Actions Structurantes de Référence (ASR) et les Micro-parcours dans le dispositif Monka V1.

---

## 1. Principe fondamental : Relation 1:1

Dans V1, **chaque micro-parcours possède une et une seule ASR**. Cette relation est bidirectionnelle et exclusive :

| Élément | Cardinalité |
|---------|-------------|
| 1 Micro-parcours | = 1 ASR unique |
| 1 ASR | = 1 Micro-parcours unique |

> **Règle R-ASR-01** : Aucune hiérarchie entre ASR, aucune sélection dynamique, aucune ASR alternative.

---

## 2. Le Micro-parcours : L'unité d'action

### 2.1 Définition V1
Le micro-parcours est **l'unité opérationnelle ciblée** visant à traiter une difficulté précise d'une situation d'aidance. Il est :
- Rattaché à une vulnérabilité principale unique
- Activé par des questions déclenchantes ou critiques (jamais par le score seul)
- Constitué de micro-tâches typées (INFO, ORGA, STRUC, SEC, MED)

### 2.2 Les 24 micro-parcours officiels V1

| Vulnérabilité | Code | Intitulé |
|---------------|------|----------|
| **Sociale & relationnelle** (4) | R1 | Vie personnelle/professionnelle de l'aidant |
| | R2 | Soutien de l'entourage |
| | R3 | Isolement social du proche |
| | R4 | Relation aidant/aidé |
| **Administrative** (4) | A1 | Couverture santé/protections |
| | A2 | Droits et aides |
| | A3 | Charge administrative |
| | A4 | Situation professionnelle/budgétaire |
| **Santé de l'aidant** (4) | S1 | Fatigue et charge |
| | S2 | Souffrance psychologique |
| | S3 | Santé physique |
| | S4 | Hygiène de vie |
| **Fragilité du proche** (6) | F1 | Organisation quotidienne |
| | F2 | Aide humaine |
| | F3 | Comportements à risque |
| | F4 | Douleur/état général |
| | F5 | Dépendance/épisodes aigus |
| | F6 | Chutes/aides techniques |
| **Parcours médical** (6) | M1 | Compréhension médicale |
| | M2 | Accès aux soins |
| | M3 | Urgences/hospitalisations |
| | M4 | Suivi spécialisé |
| | M5 | Coordination/référent |
| | M6 | Anticipation/plan de soins |

---

## 3. L'ASR : L'indicateur d'impact réel

### 3.1 Définition V1
L'ASR est **un état du monde observable**, traduisant un changement réel et structurant de la capacité d'agir de la dyade face à un risque identifié.

> **Ce que l'ASR mesure** : Ce qui a réellement changé dans la situation.  
> **Ce que l'ASR ne mesure pas** : Ce que l'aidant a fait (les tâches accomplies).

### 3.2 Nature fondamentale
Une ASR :
- ❌ N'est **pas** une tâche
- ❌ N'est **pas** un objectif de complétude
- ❌ N'est **pas** un score
- ❌ N'est **pas** une recommandation
- ✅ **Est** un changement d'état observable

### 3.3 États possibles d'une ASR

| État | Icône | Signification |
|------|-------|---------------|
| Non atteinte | ❌ | Aucune signature valide détectée |
| Atteinte | ✔ | Au moins une signature valide détectée |
| Non confirmée | ⚠ | Atteinte précédemment mais non reconfirmée |

---

## 4. Articulation Micro-parcours ↔ ASR : Le mécanisme central

### 4.1 Chaîne de cohérence V1

```
Questionnaire → Vulnérabilités → Priorisation → Micro-parcours → ASR → CR Médecin
```

Le micro-parcours est l'interface unique entre :
- **Observation** (questionnaire)
- **Organisation** (micro-tâches)
- **Projection médicale** (ASR → CR Médecin)

### 4.2 Signatures d'état : Le pont validation

Les signatures d'état sont le **seul mécanisme de validation** d'une ASR :
- Invisibles pour l'aidant
- Déduites automatiquement des déclarations dans l'app
- Décrivent des chemins possibles, jamais obligatoires
- **Une seule signature valide suffit** à considérer l'ASR comme atteinte

### 4.3 Exemple concret : Micro-parcours S1 "Fatigue et charge"

| Élément | Contenu |
|---------|---------|
| **Micro-parcours** | S1 — Fatigue et charge |
| **ASR associée** | "La charge globale est redevenue supportable" |
| **Signature S1-A** | Relais ou aide réduisant la charge |
| **Signature S1-B** | Organisation modifiée allégeant le quotidien |

→ Si l'aidant déclare dans l'app avoir mis en place un relais (S1-A), l'ASR passe à ✔ Atteinte, **indépendamment** du nombre de micro-tâches complétées.

---

## 5. Séparation stricte Micro-tâches ↔ ASR

### 5.1 Règle absolue V1

> **R-ASR-02** : Une ASR n'est jamais conditionnée à la complétion de toutes les actions. Les micro-tâches sont des moyens ; l'ASR est un changement d'état.

| Micro-tâches | ASR |
|--------------|-----|
| **Moyens** d'action | **État** du monde observé |
| Typées (INFO/ORGA/STRUC/SEC/MED) | Validée par signatures d'état |
| Peuvent être partiellement complétées | Binaire (atteinte ou non) |
| Invisibles dans le CR Médecin | Projetée dans le CR Médecin |

### 5.2 Règle R-MT-ASR-01 (Interdiction de correspondance directe)

Aucune micro-tâche, quel que soit son type :
- N'est équivalente à une ASR
- Ne constitue une signature d'état
- Ne peut être interprétée comme validation d'état

### 5.3 Impact sur le moteur

Le moteur Monka :
- ❌ Ne lit **jamais** un volume de micro-tâches
- ❌ N'infère **jamais** un état à partir d'une complétion
- ✅ Raisonne **uniquement** en signatures d'état ASR

> **Principe directeur** : Le progrès Monka n'est jamais quantitatif.

---

## 6. Rôle de l'ASR dans la priorisation

### 6.1 Évolution des micro-parcours

La priorité d'un micro-parcours évolue selon :
- ✅ Signaux critiques (questions critiques directes ou conditions composites)
- ✅ Engagement ou atteinte des ASR
- ❌ **Jamais** selon un comptage de micro-tâches

### 6.2 États ASR et priorisation

| État ASR | Impact sur la priorisation |
|----------|---------------------------|
| ❌ Non atteinte | Micro-parcours reste actif/prioritaire |
| ✔ Atteinte | Peut conduire à une baisse de priorité ou clôture |
| ⚠ Non confirmée | Déclenche une demande douce de confirmation, sans chute de priorité |

---

## 7. Projection dans le Compte Rendu Médecin

### 7.1 Champs normés micro-parcours → CR

| Champ | Règle |
|-------|-------|
| `MP_CODE` | Identifiant unique et stable |
| `MP_ASR_CODE` | Identifiant unique de l'ASR associée |
| `MP_ASR_STATE` | État de l'ASR (❌ / ⚠ / ✔) |

### 7.2 Règles de projection

- Le CR affiche des **micro-parcours**, jamais des micro-tâches
- Chaque ligne du Bloc 3 = 1 micro-parcours
- Le Bloc 4.3 reflète l'état via ASR + statuts
- Aucun libellé n'est modifiable

> **Le micro-parcours est l'unité de vérité médicale projetée.**

---

## 8. Suivi longitudinal et cohérence ASR

### 8.1 Règles du suivi longitudinal V1

Le suivi longitudinal :
- ❌ Ne mesure **jamais** l'avancement réel des actions
- ❌ Ne confirme **jamais** une ASR
- ❌ N'infirme **jamais** une ASR

### 8.2 Ce que le suivi peut faire

| Déclaration suivi | Effet sur ASR |
|-------------------|---------------|
| Amélioration déclarée | ≠ Confirmation d'ASR |
| Stabilité déclarée | ≠ Maintien d'ASR |
| Dégradation déclarée | ≠ Perte automatique d'ASR |

> **Principe** : Le suivi longitudinal contextualise les ASR, il ne les valide jamais.

---

## 9. Synthèse de la cohérence V1

```
┌─────────────────────────────────────────────────────────────────┐
│                     ARCHITECTURE V1                              │
├─────────────────────────────────────────────────────────────────┤
│  QUESTIONNAIRE                                                   │
│       ↓                                                          │
│  5 VULNÉRABILITÉS                                                │
│       ↓                                                          │
│  24 MICRO-PARCOURS ←──────────────────┐                          │
│       │                               │                          │
│       ├── Micro-tâches (INFO/ORGA/    │ Relation 1:1             │
│       │   STRUC/SEC/MED)              │                          │
│       │   → Moyens d'action           │                          │
│       │                               │                          │
│       └── 24 ASR ─────────────────────┘                          │
│           → États du monde                                        │
│           → Validées par signatures                               │
│                  ↓                                                │
│           CR MÉDECIN (projection)                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Principes directeurs V1

1. **Unicité** : 1 micro-parcours = 1 ASR
2. **Séparation** : Micro-tâches ≠ ASR (moyens ≠ états)
3. **Validation par signature** : Seules les signatures d'état valident une ASR
4. **Non-quantitatif** : Le progrès n'est jamais un comptage
5. **Observation vs Action** : Monka observe ce qui a changé, pas ce qui a été fait

> **Principe directeur final** :  
> *Monka ne mesure pas ce que l'aidant fait. Monka observe ce qui a réellement changé.*

---

## Sources documentaires

| Document | Contribution |
|----------|-------------|
| Legacy ASR Referent op. 030226 | Référentiel opérationnel des ASR, signatures d'état |
| Legacy Micro parcours 030226 | Définition et référentiel des 24 micro-parcours |
| Legacy typologie des micro taches 030226 | Typologie INFO/ORGA/STRUC/SEC/MED |
| Legacy Priorisation 300127 | Règles d'articulation priorisation/ASR |
| Legacy suivi longitudinal 030226 | Règles d'évolution temporelle |
| Legacy questionnaire 290127 | Chaîne complète questionnaire → micro-parcours |
