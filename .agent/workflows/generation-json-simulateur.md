---
description: Génération des fichiers simulator_data.json (V1-V5) conformes au template officiel engine_data.json.md v2.1
---

# 🔄 Workflow : Génération JSON Moteur V1-V5 (Template v2.1)

Ce workflow génère les fichiers `simulator_data.json` conformes à `QUESTIONNAIRE_V2/templates/engine_data.json.md` v2.1.

---

## ⚠️ TERMINOLOGIE CRITIQUE

| Terme | Définition | Clé JSON |
|-------|------------|----------|
| **Trigger** | Question contexte (15 fermées) | `triggers[]` |
| **Déclencheur** | Active un MP | `declencheurs{}` |

---

## Prérequis

Fichiers requis dans `QUESTIONNAIRE_V2/Vx.../` :
- `questions.md`
- `scoring.md`  
- `declencheurs.md` → `declencheurs{}`
- `recommendations.md`
- `ccc.md`
- `asr.md`
- `suivi.md` (optionnel)

---

## Structure JSON Cible (v2.1)

```json
{
  "metadata": {
    "vulnerability": "V{X}",
    "name": "{Nom}",
    "version": "2.1",
    "generated_at": "ISO8601",
    "sources": { "questions": "...", "declencheurs": "...", ... }
  },
  "questions": [...],
  "scoring": { "questions": {}, "max_score": N, "thresholds": {} },
  "triggers": [...],
  "declencheurs": {
    "critiques_directs": [...],
    "ccc": [...],
    "standards": [...]
  },
  "recommendations": {...},
  "ccc": [...],
  "asr": {...},
  "suivi": {...},
  "progression": {...},
  "personas": [...]
}
```

---

## Étapes de Génération

### 1. Préparer l'environnement

// turbo
```bash
mkdir -p DEMO/data/V1 DEMO/data/V2 DEMO/data/V3 DEMO/data/V4 DEMO/data/V5
```

### 2. Extraction par Section

#### 2.1 `metadata`
```json
{
  "vulnerability": "V1",
  "name": "Social et Relationnel",
  "version": "2.1",
  "generated_at": "2026-02-06T21:00:00Z",
  "sources": {
    "questions": "questions.md",
    "scoring": "scoring.md",
    "declencheurs": "declencheurs.md",
    "recommendations": "recommendations.md",
    "ccc": "ccc.md",
    "asr": "asr.md"
  }
}
```

#### 2.2 `questions[]` (depuis `questions.md`)
```json
{
  "id": "E2",
  "label": "Avez-vous des personnes sur qui compter ?",
  "type": "scorante|critique|declenchante|descriptive|trigger",
  "options": [
    {"code": "1", "label": "Oui, plusieurs", "score": 0},
    {"code": "2", "label": "Oui, une", "score": 1}
  ],
  "condition": null
}
```

#### 2.3 `scoring` (depuis `scoring.md`)
```json
{
  "questions": {
    "E2": {"1": 0, "2": 1, "3": 2}
  },
  "max_score": 15,
  "thresholds": {
    "low": {"min": 0, "max": 5},
    "moderate": {"min": 6, "max": 10},
    "high": {"min": 11, "max": null}
  }
}
```

#### 2.4 `triggers[]` (Questions Contexte - 15 fermées)

> ⚠️ Source: `templates/triggers.md` - Questions qui NE DÉCLENCHENT RIEN

```json
[
  {
    "id": "N3",
    "label": "Type de situation d'aidance",
    "type_facteur": "contexte",
    "options": [
      {"code": "A", "label": "J'habite avec", "persona_tag": "cohabitant"}
    ],
    "usage": {
      "orientation_mp": true,
      "personnalisation_recos": true
    }
  }
]
```

Liste fermée: `N3, O35, O36, N1, O64, O46, O14, O1, O63, O49, N26, E71, E72, O2, N31`

#### 2.5 `declencheurs{}` (depuis `declencheurs.md`)

> ⚠️ Activation des micro-parcours - 3 niveaux de priorité

```json
{
  "critiques_directs": [
    {
      "question_id": "E2",
      "option": "4",
      "option_label": "Personne",
      "micro_parcours": "R2",
      "priority": 1,
      "delay_days": 7
    }
  ],
  "ccc": [
    {
      "id": "CCC_R2_01",
      "conditions": [
        {"question_id": "E1", "option": "4"},
        {"question_id": "N4", "option": "1"}
      ],
      "micro_parcours": "R2",
      "priority": 2,
      "delay_days": 30
    }
  ],
  "standards": [
    {
      "question_id": "N7",
      "option": "2",
      "option_label": "Congés",
      "micro_parcours": "R1",
      "priority": 3,
      "delay_days": 90
    }
  ]
}
```

#### 2.6 `recommendations` (depuis `recommendations.md`)
```json
{
  "E2": {
    "3": {
      "app_text": "Il est important de ne pas rester isolé...",
      "app_text_source": "excel",
      "actors": ["IDEC", "Plateforme répit"],
      "micro_taches": [
        {
          "text": "Orienter vers plateforme de répit",
          "type": "INFO",
          "type_source": "ia",
          "actor": "IDEC",
          "text_source": "excel"
        }
      ]
    }
  }
}
```

#### 2.7 `ccc[]` (depuis `ccc.md`)
```json
[
  {
    "id": "CCC_R2_01",
    "name": "Isolement + Charge unique",
    "micro_parcours": "R2",
    "conditions": [
      {"question_id": "E1", "option": "4"},
      {"question_id": "N4", "option": "1"}
    ],
    "conditions_source": "legacy",
    "reasoning": "L'aidant cumule une charge totale avec absence de relais...",
    "reasoning_source": "ia",
    "recommendations": {
      "app_text": "Vous semblez porter une charge importante...",
      "app_text_source": "ia",
      "micro_taches": [
        {"text": "Évaluer urgence répit", "type": "SEC", "actor": "IDEC", "source": "ia"}
      ]
    }
  }
]
```

#### 2.8 `asr{}` (depuis `asr.md`)

> **Règle R-ASR-01** : 1 MP = 1 ASR (jamais plus)

```json
{
  "R1": {
    "name": "Vie personnelle / professionnelle",
    "asr_objectif": "L'aidant dispose d'une marge réelle lui permettant de tenir dans la durée.",
    "asr_source": "legacy",
    "signatures": [
      {
        "id": "R1-A",
        "condition": "Temps personnel ou professionnel rendu possible",
        "source": "legacy"
      },
      {
        "id": "R1-B",
        "condition": "Réduction déclarée d'une contrainte majeure",
        "source": "legacy"
      }
    ]
  },
  "R2": {
    "name": "Soutien de l'entourage",
    "asr_objectif": "Un relais humain mobilisable est effectivement en place.",
    "asr_source": "legacy",
    "signatures": [
      {"id": "R2-A", "condition": "Au moins 1 personne relais identifiée", "source": "legacy"},
      {"id": "R2-B", "condition": "Intervention active d'un service", "source": "legacy"}
    ]
  }
}
```

#### 2.9 `suivi` (depuis `suivi.md` - optionnel)
```json
{
  "questions": [
    {
      "id": "S_E2",
      "label": "Comment a évolué votre réseau de soutien ?",
      "linked_question": "E2",
      "frequency": "mensuel",
      "options": [
        {"code": "A", "label": "Plus de personnes", "evolution": "up"},
        {"code": "B", "label": "Pas de changement", "evolution": "stable"},
        {"code": "C", "label": "Moins de personnes", "evolution": "down"}
      ]
    }
  ],
  "indicators": []
}
```

#### 2.10 `progression` (statique - tous les MP)
```json
{
  "states": [
    {"code": "INIT", "name": "Initialisé", "terminal": false},
    {"code": "EN_COURS", "name": "En cours", "terminal": false},
    {"code": "PAUSE", "name": "En pause", "terminal": false},
    {"code": "COMPLET", "name": "Complété", "terminal": true},
    {"code": "ECHEC", "name": "Échec", "terminal": false},
    {"code": "ABANDON", "name": "Abandonné", "terminal": true}
  ],
  "transitions": [
    {"from": "INIT", "to": "EN_COURS", "event": "assignment"},
    {"from": "EN_COURS", "to": "COMPLET", "event": "all_signatures_valid"},
    {"from": "EN_COURS", "to": "PAUSE", "event": "pause_requested"},
    {"from": "ECHEC", "to": "INIT", "event": "relance"}
  ],
  "delays_by_priority": {
    "1": {"max_days": 7, "reminder_days": 3},
    "2": {"max_days": 30, "reminder_days": 14},
    "3": {"max_days": 90, "reminder_days": 30}
  }
}
```

### 3. Personas (5 standards)

| # | Nom | Profil | Badge |
|---|-----|--------|-------|
| 1 | Nathalie P. (62 ans) | Équilibrée | `sain` |
| 2 | Jean-Pierre L. (72 ans) | Fragilités légères | `planifie` |
| 3 | Sophie M. (45 ans) | Aidante active | `prioritaire` |
| 4 | Ahmed K. (38 ans) | Isolement, refus | `critique` |
| 5 | Claire D. (34 ans) | Crise aiguë | `urgent` |

> **Impératif** : Chaque persona DOIT avoir une réponse pour CHAQUE question.

### 4. Exécution

// turbo
```bash
cd /Users/antonin/monka && python3 SOURCES/generate_json_v3.py
```

### 5. Validation

// turbo
```bash
ls -la DEMO/data/*/simulator_data.json
```

// turbo
```bash
# Vérifier structure JSON
cat DEMO/data/V1/simulator_data.json | python3 -m json.tool | head -50
```

### 6. Test Simulateur

// turbo
```bash
cd /Users/antonin/monka/DEMO && python3 -m http.server 8888 &
```

---

## Checklist de Complétude

| Section | V1 | V2 | V3 | V4 | V5 |
|---------|----|----|----|----|-----|
| `metadata` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `questions` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `scoring` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `triggers` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `declencheurs` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `recommendations` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `ccc` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `asr` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `suivi` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `progression` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `personas` | ☐ | ☐ | ☐ | ☐ | ☐ |
