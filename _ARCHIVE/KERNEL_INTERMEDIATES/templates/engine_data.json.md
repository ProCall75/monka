# 🔧 Template: engine_data.json

> **Source** : Généré automatiquement depuis les 8 fichiers MD  
> **Contenu** : Export JSON unifié pour le moteur clinique  
> **Usage** : Implémentation technique

---

## ⚠️ TERMINOLOGIE CRITIQUE

| Terme | Définition | Effet |
|-------|------------|-------|
| **Trigger** | Question de **contexte/profil** (15 questions fermées) | ❌ NE DÉCLENCHE RIEN |
| **Déclencheur** | Question/CCC qui **ACTIVE** un micro-parcours | ✅ Active un MP |

> 📖 Voir `UNDERSTANDING.md` pour la distinction complète.

---

## 📊 Structure JSON

```json
{
  "metadata": {
    "vulnerability": "V{X}",
    "name": "{Nom de la vulnérabilité}",
    "version": "2.1",
    "generated_at": "YYYY-MM-DDTHH:MM:SSZ",
    "sources": {
      "questions": "questions.md",
      "scoring": "scoring.md",
      "declencheurs": "declencheurs.md",
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
      "type": "scorante|critique|declenchante|descriptive|trigger",
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
  
  "triggers": [
    {
      "id": "{ID}",
      "label": "{Libellé}",
      "type_facteur": "profil_aidant|profil_aide|temporalite|contexte|priorites",
      "options": [
        {"code": "A", "label": "{Option}", "persona_tag": "{Tag potentiel}"}
      ],
      "usage": {
        "orientation_mp": true,
        "personnalisation_recos": true,
        "qualification_diade": "{Aspect qualifié}"
      }
    }
  ],
  
  "declencheurs": {
    "critiques_directs": [
      {
        "question_id": "{ID}",
        "option": "C",
        "option_label": "{Libellé option}",
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
    "standards": [
      {
        "question_id": "{ID}",
        "option": "{opt}",
        "option_label": "{Libellé option}",
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
        "actors": ["{IDEC}", "{Médecin traitant}"],
        "micro_taches": [
          {
            "text": "{Micro-tâche IDEC}",
            "type": "STRUC|SEC|MED|INFO|ORGA",
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
      "conditions": [
        {"question_id": "{ID1}", "option": "{opt}"},
        {"question_id": "{ID2}", "option": "{opt}"}
      ],
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
      "asr_objectif": "{État utilisateur à atteindre - 1 seule ASR par MP}",
      "asr_source": "legacy",
      "signatures": [
        {
          "id": "{MP}-A",
          "condition": "{Chemin 1 pour valider l'ASR}",
          "source": "legacy"
        },
        {
          "id": "{MP}-B",
          "condition": "{Chemin 2 alternatif}",
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
        "frequency": "mensuel",
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
      {"code": "INIT", "name": "Initialisé", "terminal": false},
      {"code": "EN_COURS", "name": "En cours", "terminal": false},
      {"code": "PAUSE", "name": "En pause", "terminal": false},
      {"code": "COMPLET", "name": "Complété", "terminal": true},
      {"code": "ECHEC", "name": "Échec", "terminal": false},
      {"code": "ABANDON", "name": "Abandonné", "terminal": true}
    ],
    "transitions": [
      {
        "from": "INIT",
        "to": "EN_COURS",
        "event": "assignment",
        "delay_min_days": 0
      },
      {
        "from": "EN_COURS",
        "to": "COMPLET",
        "event": "all_signatures_valid",
        "delay_min_days": 7
      },
      {
        "from": "EN_COURS",
        "to": "PAUSE",
        "event": "pause_requested",
        "delay_min_days": 0
      },
      {
        "from": "ECHEC",
        "to": "INIT",
        "event": "relance",
        "delay_min_days": 7
      }
    ],
    "delays_by_priority": {
      "1": {"max_days": 7, "reminder_days": 3},
      "2": {"max_days": 30, "reminder_days": 14},
      "3": {"max_days": 90, "reminder_days": 30}
    }
  },
  
  "personas": [
    {
      "name": "{Nom persona}",
      "description": "{Description courte}",
      "priority_badge": "critique|prioritaire|sain",
      "ccc_count": 0,
      "responses": {
        "{ID}": "{code_option}"
      }
    }
  ]
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
| `triggers` | Questions contexte/profil | ✅ legacy questionnaire 4.7 |
| `declencheurs` | Activation des MP | ✅ legacy + excel |
| `recommendations.app_text` | Texte utilisateur | ✅ excel |
| `recommendations.micro_taches.text` | Texte micro-tâche | ✅ excel |
| `recommendations.micro_taches.type` | Typage STRUC/SEC/... | 🤖 ia |
| `ccc.conditions` | Définition CCC | ✅ legacy |
| `ccc.recommendations` | Recos spécifiques CCC | 🤖 ia |
| `asr` | Objectifs + signatures | ✅ legacy (⚠️ signatures V2-V5 partiellement ia) |
| `suivi` | Questions suivi | ✅ legacy + excel |
| `progression` | États, transitions | ✅ legacy |
| `personas` | Scénarios test | 🤖 ia |

---

## 🎯 Sections Clés Expliquées

### `triggers` vs `declencheurs`

```
triggers[]     = Questions CONTEXTE (15 questions fermées)
                 → NE DÉCLENCHENT RIEN
                 → Servent aux personas, personnalisation
                 
declencheurs{} = ACTIVATION des micro-parcours
                 → critiques_directs (Priorité 1, ≤7j)
                 → ccc (Priorité 2, ≤30j)
                 → standards (Priorité 3, ≤90j)
```

### `asr` - Action Structurante de Référence

> **Règle R-ASR-01** : Chaque MP possède UNE et UNE SEULE ASR.  
> **Règle R-ASR-02** : L'ASR est un CHANGEMENT D'ÉTAT, pas une tâche.

```
asr.{MP}.asr_objectif = "État utilisateur à atteindre"
asr.{MP}.signatures[] = Conditions de validation de l'ASR
```

---

## 🔄 Génération

Ce fichier doit être **regénéré** après chaque modification des fichiers Markdown.

```bash
python3 generate_json_v3.py --vulnerability V{X}
```

---

## 📋 Ordre de lecture par le moteur

1. `questions` → Affichage questionnaire
2. `scoring` → Calcul scores
3. `declencheurs` → Évaluation activation MP
4. `recommendations` → Affichage recos + génération MT
5. `ccc` → Évaluation conditions composites
6. `asr` → Objectifs + validation MP
7. `suivi` → Suivi longitudinal
8. `progression` → Gestion états
9. `triggers` → Orientation personas (optionnel)
