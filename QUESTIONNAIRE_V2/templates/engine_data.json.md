# 🔧 Template: engine_data.json

> **Source** : Généré automatiquement depuis les 8 fichiers MD  
> **Contenu** : Export JSON unifié pour le moteur clinique  
> **Usage** : Implémentation technique

---

## 📊 Structure JSON

```json
{
  "metadata": {
    "vulnerability": "V{X}",
    "name": "{Nom de la vulnérabilité}",
    "version": "2.0",
    "generated_at": "YYYY-MM-DDTHH:MM:SSZ",
    "sources": {
      "questions": "questions.md",
      "scoring": "scoring.md",
      "triggers": "triggers.md",
      "recommendations": "recommendations.md",
      "ccc": "ccc.md",
      "asr": "asr.md",
      "suivi": "suivi.md",
      "progression": "progression.md"
    }
  },
  
  "questions": [
    {
      "id": "{ID}",
      "label": "{Libellé}",
      "options": [
        {"code": "A", "label": "{Option 1}"},
        {"code": "B", "label": "{Option 2}"}
      ],
      "type": "scorante|critique|declenchante|descriptive",
      "condition": null
    }
  ],
  
  "scoring": {
    "questions": {
      "{ID}": {
        "A": 0,
        "B": 1,
        "C": 2
      }
    },
    "max_score": "{N}",
    "thresholds": {
      "low": {"min": 0, "max": 3},
      "moderate": {"min": 4, "max": 7},
      "high": {"min": 8, "max": null}
    }
  },
  
  "triggers": {
    "critical_direct": [
      {
        "question_id": "{ID}",
        "option": "C",
        "micro_parcours": "{MP}",
        "priority": 1,
        "delay_days": 7
      }
    ],
    "ccc": [
      {
        "id": "CCC_{X}_{N}",
        "conditions": [
          {"question_id": "{ID1}", "option": "{opt}"},
          {"question_id": "{ID2}", "option": "{opt}"}
        ],
        "micro_parcours": "{MP}",
        "priority": 2,
        "delay_days": 30
      }
    ],
    "standard": [
      {
        "question_id": "{ID}",
        "option": "{opt}",
        "micro_parcours": "{MP}",
        "priority": 3,
        "delay_days": 90
      }
    ]
  },
  
  "recommendations": {
    "{ID}": {
      "{option}": {
        "app_text": "{Texte pour l'utilisateur}",
        "app_text_source": "excel",
        "micro_taches": [
          {
            "text": "{Micro-tâche IDEC}",
            "type": "STRUC",
            "type_source": "ia",
            "actor": "IDEC",
            "text_source": "excel"
          }
        ]
      }
    }
  },
  
  "ccc": [
    {
      "id": "CCC_{X}_{N}",
      "name": "{Nom}",
      "micro_parcours": "{MP}",
      "conditions_source": "legacy",
      "reasoning": "{Raisonnement clinique}",
      "reasoning_source": "ia",
      "recommendations": {
        "app_text": "{Texte pour l'utilisateur quand CCC activée}",
        "app_text_source": "ia",
        "micro_taches": [
          {
            "text": "{Micro-tâche spécifique CCC}",
            "type": "STRUC",
            "actor": "IDEC",
            "source": "ia"
          }
        ]
      }
    }
  ],
  
  "asr": {
    "{MP}": {
      "name": "{Nom micro-parcours}",
      "actions": [
        {
          "text": "{Action ASR}",
          "type": "STRUC",
          "contributes_score": true,
          "source": "legacy"
        }
      ],
      "signatures": [
        {
          "id": "SIG_{MP}_01",
          "condition": "{Condition}",
          "source": "legacy|ia"
        }
      ]
    }
  },
  
  "suivi": {
    "questions": [
      {
        "id": "S_{ID}",
        "label": "{Question de suivi}",
        "linked_question": "{ID}",
        "options": [
          {"code": "A", "label": "{Amélioration}", "evolution": "up"},
          {"code": "B", "label": "{Stable}", "evolution": "stable"},
          {"code": "C", "label": "{Dégradation}", "evolution": "down"}
        ]
      }
    ],
    "indicators": [
      {
        "id": "IND_{X}_{N}",
        "name": "{Nom indicateur}",
        "calculation": "{Méthode calcul}",
        "thresholds": {
          "normal": {"max": "{X}"},
          "warning": {"min": "{X}", "max": "{Y}"},
          "alert": {"min": "{Y}"}
        }
      }
    ]
  },
  
  "progression": {
    "states": [
      {
        "code": "INIT",
        "name": "Initialisé",
        "terminal": false
      },
      {
        "code": "EN_COURS",
        "name": "En cours",
        "terminal": false
      },
      {
        "code": "COMPLET",
        "name": "Complété",
        "terminal": true
      }
    ],
    "transitions": [
      {
        "from": "INIT",
        "to": "EN_COURS",
        "trigger": "assignment",
        "delay_min_days": 0
      },
      {
        "from": "EN_COURS",
        "to": "COMPLET",
        "trigger": "all_signatures_valid",
        "delay_min_days": 7
      }
    ],
    "delays_by_priority": {
      "1": {"max_days": 7, "reminder_days": 3},
      "2": {"max_days": 30, "reminder_days": 14},
      "3": {"max_days": 90, "reminder_days": 30}
    }
  }
}
```

---

## ⚠️ Champs Source - Traçabilité IA vs Officiel

Chaque élément contient des champs `*_source` pour tracer l'origine :

| Source | Signification |
|--------|---------------|
| `"source": "excel"` | ✅ Donnée Tableau SOPHIE CAT |
| `"source": "legacy"` | ✅ Donnée Legacy officielle |
| `"source": "ia"` | 🤖 Généré par IA (à valider) |

### Récapitulatif par section

| Section | Données | Source |
|---------|---------|--------|
| `questions` | IDs, libellés, options | ✅ excel + legacy |
| `scoring` | Points, seuils | ✅ legacy |
| `triggers` | Déclencheurs | ✅ legacy + excel |
| `recommendations.app_text` | Texte utilisateur | ✅ excel |
| `recommendations.micro_taches.text` | Texte micro-tâche | ✅ excel |
| `recommendations.micro_taches.type` | Typage STRUC/SEC/... | 🤖 ia |
| `ccc.conditions` | Définition CCC | ✅ legacy |
| `ccc.recommendations` | Recos spécifiques CCC | 🤖 ia |
| `asr` | Actions, signatures | ✅ legacy (⚠️ signatures V2-V5 partiellement ia) |
| `suivi` | Questions suivi | ✅ legacy + excel |
| `progression` | États, transitions | ✅ legacy |

---

## 🔄 Génération

Ce fichier doit être **regénéré** après chaque modification des fichiers Markdown.

```bash
# Script de génération (à créer)
python3 generate_engine_data.py --vulnerability V{X}
```

---

## 📋 Ordre de lecture par le moteur

1. `questions` → Affichage questionnaire
2. `scoring` → Calcul scores
3. `triggers` → Évaluation déclenchements
4. `recommendations` → Affichage recos + génération MT
5. `ccc` → Évaluation conditions composites
6. `asr` → Gestion micro-parcours
7. `suivi` → Suivi longitudinal
8. `progression` → Gestion états
