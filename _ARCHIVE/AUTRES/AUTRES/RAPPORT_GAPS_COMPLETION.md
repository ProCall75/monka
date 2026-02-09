# 📊 Rapport de Gaps - Ce qui reste à compléter

> **Date** : 03/02/2026  
> **Objectif** : Identifier précisément les données manquantes et les sources pour les compléter

---

## 📈 État Actuel vs Objectif

| Élément | Actuel | Cible | % | Status |
|---------|--------|-------|---|--------|
| **Questions** | 148 | 150 | 99% | ✅ Quasi-complet |
| **Recommandations** | 317 | 350 | 91% | ⚠️ À enrichir |
| **Actions IDEC** | 438 | 500 | 88% | ⚠️ À enrichir |
| **CCC** | 27 | 27 | 100% | ✅ Complet |
| **Micro-parcours** | 24 | 24 | 100% | ✅ Complet |
| **Micro-tâches typées** | 299 | 300 | 100% | ✅ Complet |
| **Scores mappés** | 48 | 148 | 32% | 🔴 À compléter |

---

## 🔴 PRIORITÉ 1 : Micro-Tâches V5 (6 seulement)

### Explication
V5 (Administrative) a seulement **6 micro-tâches** car :
- 80% des actions IDEC sont marquées "N/A" dans les sources Excel
- C'est une vulnérabilité **orientée information** : l'aidant fait les démarches lui-même
- Pas de micro-tâches MED/STRUC (non pertinent pour l'axe administratif)

### Actions pour enrichir V5

| Source | Contenu | Action |
|--------|---------|--------|
| `Legacy Priorisation 300127.docx` | 204 paras sur règles | Extraire micro-tâches admin |
| `Legacy ASR Referent op. 030226.docx` | 185 paras ASR | Compléter asr_definitions V5 |
| Excel `microparcours_aidant.xlsx` | Onglet A1-A4 | Vérifier actions manquées |

---

## 🔴 PRIORITÉ 2 : Scores (32% mappés)

### Situation
- **48 questions** ont des scores dans le Legacy scoring
- **100 questions** n'ont PAS de scores Legacy identifiés
- Les scores Excel sont partiels (~75%)

### Sources à exploiter

| Fichier | Tableaux | Questions couvertes |
|---------|----------|---------------------|
| `Legacy scoring 310127.docx` | 11 | E1-E70, N11-N34, O4-O44 |
| `Typologie,CCC et scoring.docx` | 36 | Scoring par vulnérabilité |
| Excel `Questionnaire_Etienne` | - | Scores inline |

### Actions
1. Mapper les 48 scores Legacy vers les fichiers V2-V5
2. Croiser avec Excel pour les scores manquants
3. Marquer "À définir cliniquement" pour les ~50 sans source

---

## 🟠 PRIORITÉ 3 : Fichiers Legacy non exploités

### 10 fichiers avec contenu potentiellement utile

| # | Fichier | Paras | Contenu potentiel | Priorité |
|---|---------|-------|-------------------|----------|
| 1 | `Legacy questionnaire 290127.docx` | 331 | Structure 5V, méthodologie | 🔴 Haute |
| 2 | `Legacy Priorisation 300127.docx` | 204 | Règles déclenchement | 🔴 Haute |
| 3 | `Legacy typologie micro taches 030226.docx` | 111 | **Définitions officielles STRUC/SEC/MED/INFO/ORGA** | 🔴 Haute |
| 4 | `Legacy ASR Referent op. 030226.docx` | 185 | Définitions ASR complètes | 🟠 Moyenne |
| 5 | `Legacy moteur applicatif 020326.docx` | 177 | Règles sécurité médicale | 🟠 Moyenne |
| 6 | `Legacy Arborescence Globale 030226.docx` | 168 | Structure globale | 🟡 Basse |
| 7 | `Legacy CR Médecin 030226.docx` | 149 | Template CR | 🟡 Basse |
| 8 | `Legacy grammaire progression 190126.docx` | 101 | Règles progression | 🟡 Basse |
| 9 | `Legacy suivi longitudinal 030226.docx` | 169 | Suivi temps | 🟡 Basse |
| 10 | `Legacy Fondateur 030226pages.docx` | 82 | Vision fondateur | 🟡 Basse |

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### Étape 1 : Compléter les Scores (2h)
```
1. Extraire tous les scores du Legacy scoring → legacy_scores.json ✅ FAIT
2. Mapper vers questions V2-V5
3. Créer fichier scores_mapping.md par vulnérabilité
```

### Étape 2 : Enrichir V5 (1h)
```
1. Scanner Legacy Priorisation pour micro-tâches administratives
2. Ajouter aux recommendations.md V5
3. Re-typer les micro-tâches
```

### Étape 3 : Intégrer Legacy Typologie Micro-Tâches (30min)
```
1. Extraire définitions officielles INFO/SEC/MED/STRUC/ORGA
2. Ajouter au STRUCTURE_DOCUMENTAIRE_STANDARD.md
3. Vérifier cohérence avec typologie existante
```

### Étape 4 : Documentation ASR (1h)
```
1. Scanner Legacy ASR Referent op.
2. Compléter asr_definitions.md de chaque V
```

---

## 📁 Fichiers JSON Disponibles

| Fichier | Contenu | Chemin |
|---------|---------|--------|
| `legacy_complete.json` | 16 fichiers Legacy extraits | `SOURCES/extracted/` |
| `legacy_scores.json` | 48 questions avec scores | `SOURCES/extracted/` |
| `micro_taches_typologie.json` | 258 tâches typées | `SOURCES/extracted/` |
| `extraction_summary.json` | Résumé extraction | `SOURCES/extracted/` |

---

## ✅ Ce Qui Est Déjà Complet

- [x] 27 CCC (V1=8, V2=5, V3=3, V4=8, V5=3)
- [x] 24 Micro-parcours (R1-4, F1-6, S1-4, M1-6, A1-4)
- [x] 299 Micro-tâches typées
- [x] Structure 7 fichiers par V
- [x] README et Audit pour chaque V

---

> 📄 Rapport de Gaps - **Mise à jour 03/02/2026**
