# 🔍 État de l'Audit Monka — Alignement Scoring Legacy

> **Date création** : 04/02/2026 23:30  
> **Objectif** : Documenter l'état complet de l'audit pour reprise ultérieure  
> **Statut global** : 🟠 Incohérences majeures détectées, non résolues

---

## 1. Contexte et Origine du Problème

### 1.1 Point de départ
- L'équipe Monka a mentionné **177 questions** dans le questionnaire
- Mon analyse des fichiers Excel a trouvé **174 questions uniques**
- Écart de 3 questions → audit initié

### 1.2 Découverte en cours d'audit
En comparant les fichiers `*_vulnerability_test.md` avec le Legacy scoring officiel, j'ai découvert que :

> [!CAUTION]
> **Les questions scorantes dans nos fichiers V2-V5 ne correspondent PAS aux questions scorantes du Legacy scoring officiel.**

Ce n'est pas juste une erreur de comptage — ce sont des **questions différentes** qui sont marquées comme scorantes.

---

## 2. Sources de Vérité Analysées

### 2.1 Sources Legacy (VERIF/) — ✅ ANALYSÉES

| Fichier | Contenu | Statut |
|---------|---------|--------|
| `Legacy scoring 310127.docx` | Définition officielle des scorantes par V | ✅ **Lu et extrait** |
| `Legacy questionnaire 290127.docx` | Typologie des questions (règle d'or) | ✅ Lu partiellement |
| `Legacy ASR Referent op. 030226.docx` | Règles ASR | ⚠️ Lu précédemment |
| Autres Legacy... | Priorisation, CCC, etc. | ⚠️ Non relus ce soir |

### 2.2 Sources Excel (SOURCES/excel/) — ✅ ANALYSÉES

| Fichier | Contenu | Statut |
|---------|---------|--------|
| `Questionnaire_Etienne_1258.xlsx` | 165 questions (5 vulnérabilités) | ✅ **Compté par sheet** |
| `Questionnaire_Etienne_1258-1_suivi_mensuel.xlsx` | 174 questions (+ suivi S000-S008) | ✅ **Compté** |
| `microparcours_aidant.xlsx` | 24 micro-parcours, 153 questions référencées | ✅ **Analysé** |
| `Tableau SOPHIE CAT...xlsx` | Recommandations/CCC (pas de nouvelles questions) | ✅ Vérifié |

### 2.3 Fichiers QUESTIONNAIRE — ⚠️ PARTIELLEMENT ANALYSÉS

| Dossier | Ce que j'ai lu | Ce que je n'ai PAS lu |
|---------|----------------|----------------------|
| **V1/base/** | `README.md`, `questions.md`, `asr_definitions.md`, `ccc_recommendations.md` | `recommendations.md`, `micro_taches_typologie.md`, `social_vulnerability_test.md` |
| **V2/base/** | `README.md`, `fragilite_proche_vulnerability_test.md` | `questions.md`, `recommendations.md`, `asr_definitions.md`, `ccc_recommendations.md` |
| **V3/base/** | `README.md`, `sante_aidant_vulnerability_test.md` | `questions.md`, autres fichiers |
| **V4/base/** | `README.md`, `parcours_medical_vulnerability_test.md` | `questions.md`, autres fichiers |
| **V5/base/** | `README.md`, `administrative_vulnerability_test.md` | `questions.md`, autres fichiers |

> [!WARNING]
> **Je n'ai PAS fait un scan complet de tous les fichiers `questions.md` pour V2-V5.**
> Je ne peux pas confirmer si les question IDs dans ces fichiers matchent ceux du Legacy.

---

## 3. Ce Qui Est SÛR (Sources directes lues)

### 3.1 Comptages Questions — ✅ VÉRIFIÉ

| V | Questions (Excel) | Questions (README) | Match |
|---|-------------------|-------------------|-------|
| V1 | 15 | 15 (corrigé) | ✅ |
| V2 | 57 | 57 | ✅ |
| V3 | 27 | 27 | ✅ |
| V4 | 36 | 36 | ✅ |
| V5 | 18 | 18 | ✅ |
| **Total** | **153** | **153** | ✅ |

+ 12 Triggers + 9 Suivi mensuel = **174 IDs uniques**

### 3.2 Scorantes Legacy — ✅ EXTRAIT DU LEGACY SCORING

| V | Nb Scorantes | Questions IDs (Legacy) | Score Max |
|---|--------------|------------------------|-----------|
| V1 | 8 | (non extrait en détail ce soir) | 16 |
| V2 | 14 | O7, O13, N24, E25, E26, O4, N11, N12, N13, N34, O26, E32, E33, O6 | 28 |
| V3 | 9 | O29, O33, E7, E8, E9, E10, E11, O44, E18 | 18 |
| V4 | 6 | E36, E37, E43, E47, E54, E57 | 12 |
| V5 | 3 | E66, E69, E70 | 6 |

### 3.3 Scorantes dans nos fichiers — ✅ EXTRAIT (vulnerability_test.md)

| V | Nb Scorantes | Questions IDs (nos fichiers) | Score Max |
|---|--------------|------------------------------|-----------|
| V1 | 8 | N20, E1, E2, E4, E5, O27, O28, O30 | 16 |
| V2 | 9 | O2, N23, N27, O7, E23, E24, E25, E26, E28 | 21 |
| V3 | 10 | E7, E12, E13, E14, E15, E16, E17, O32, O33, O34 | 23 |
| V4 | 11 | E41, E42, E44, E46, E47, E50, E51, E52, E53, E54, E55 | 27 |
| V5 | 4 | N43, E68, E69, E70 | 8 |

### 3.4 Comparaison Scorantes — 🔴 NON ALIGNÉ

| V | Legacy | Nos fichiers | Overlap | % Match |
|---|--------|--------------|---------|---------|
| V1 | 8 | 8 | ? (à vérifier) | ? |
| V2 | 14 | 9 | O7, E25, E26 | **21%** |
| V3 | 9 | 10 | E7, O33 | **22%** |
| V4 | 6 | 11 | E47, E54 | **33%** |
| V5 | 3 | 4 | E69, E70 | **67%** |

---

## 4. Ce Qui Est INCERTAIN (Non vérifié/Déduit IA)

### 4.1 Questions scorantes V1
Je n'ai pas extrait la liste exacte des 8 scorantes V1 du Legacy scoring ce soir. Je sais juste que le total est 8 et le score max est 16.

**Action requise** : Extraire les 8 question IDs scorantes V1 du Legacy scoring.

### 4.2 Contenu des fichiers `questions.md` V2-V5
Je n'ai pas lu ces fichiers. Je ne sais pas :
- Si les question IDs listés correspondent à l'Excel
- Si les typologies (scorante/déclenchante/critique) sont correctes
- Si les réponses et scores internes matchent

**Action requise** : Scanner les 4 fichiers `questions.md` (V2-V5).

### 4.3 Origine de l'écart scorantes
**Deux hypothèses :**

1. **L'IA a mal identifié les scorantes** lors de la génération des `vulnerability_test.md`
2. **L'Excel contient une logique différente** du Legacy scoring officiel

Je ne peux pas trancher sans :
- Comparer les question IDs de l'Excel avec le Legacy
- Vérifier si le simulateur HTML V1 utilise les même scorantes que le Legacy

### 4.4 Cas de test dans les vulnerability_test.md
Les cas de test (Profil A, B, C) utilisent les **mauvaises scorantes**. Ils sont donc probablement **faux** et à recalculer.

---

## 5. Ce Que J'ai Modifié Ce Soir

### 5.1 Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `V1/base/questions.md` | Ajouté question O47, corrigé stats 13→15 |
| `V1/base/README.md` | Corrigé 13→15 questions |
| `V2/base/fragilite_proche_vulnerability_test.md` | Ajouté CAUTION, corrigé formule →(brut/28)×20 |
| `V3/base/sante_aidant_vulnerability_test.md` | Ajouté CAUTION, corrigé formule →(brut/18)×20 |
| `V4/base/parcours_medical_vulnerability_test.md` | Ajouté CAUTION, corrigé formule →(brut/12)×20 |
| `V5/base/administrative_vulnerability_test.md` | Ajouté CAUTION, corrigé formule →(brut/6)×20 |
| `AUDIT/audit_177_questions.md` | Créé audit 177 vs 174 |
| `AUDIT/changements_a_faire.md` | Créé liste des changements |

### 5.2 Ce que j'ai PAS modifié

- Les tables de scorantes (elles sont toujours fausses, juste avec un warning)
- Les cas de test (ils utilisent les mauvaises scorantes)
- Les fichiers `questions.md` V2-V5 (non scannés)
- Les fichiers `recommendations.md`, `asr_definitions.md`, etc.

---

## 6. Qualité des Données — État Actuel

### 6.1 Matrice de confiance

| Élément | Confiance | Source | Action |
|---------|-----------|--------|--------|
| Nombre total questions | 🟢 Haute | Excel compté | — |
| Micro-parcours (24) | 🟢 Haute | Excel + Legacy | — |
| Scorantes V1 (8) | 🟠 Moyenne | Legacy (non extrait détail) | Extraire IDs |
| Scorantes V2-V5 count | 🟢 Haute | Legacy scoring lu | — |
| Scorantes V2-V5 IDs | 🟢 Haute | Legacy scoring extrait | — |
| Nos scorantes V2-V5 | 🔴 NON ALIGNÉES | vulnerability_test.md | **Reconstruire** |
| Formules scoring | 🟢 Corrigées | Legacy | — |
| Cas de test | 🔴 FAUX | Basés sur mauvaises scorantes | **Recalculer** |
| CCC | 🟠 Non vérifié | Legacy CCC non relu ce soir | Vérifier |
| ASR | 🟠 Non vérifié | Legacy ASR lu avant | Vérifier |

### 6.2 Niveau de l'écart

```
LEGACY SCORING (source officielle)
       ↓
   [ÉCART MAJEUR]  ← Les question IDs ne correspondent pas
       ↓
NOS FICHIERS vulnerability_test.md (générés IA)
```

L'IA a probablement déduit les scorantes à partir du comportement Excel/simulateur, mais **le Legacy scoring définit explicitement une liste différente**.

---

## 7. Prochaines Étapes Suggérées

### 7.1 Pour valider les données (prioritaire)

1. **Extraire les 8 scorantes V1** du Legacy scoring
2. **Comparer les scorantes Legacy vs Excel** — vérifier si l'Excel utilise la même logique
3. **Scanner les `questions.md` V2-V5** — vérifier les typologies

### 7.2 Pour corriger les fichiers

1. **Reconstruire les tables scorantes** dans chaque vulnerability_test.md avec les IDs Legacy
2. **Recalculer les cas de test** avec les bonnes scorantes
3. **Mettre à jour `questions.md`** si nécessaire

### 7.3 Pour valider avec Monka

- Confirmer que le Legacy scoring est bien la source de vérité
- Clarifier pourquoi l'Excel semble avoir une logique différente
- Résoudre l'écart 177 vs 174

---

## 8. Fichiers de Référence

### Sources à consulter

```
VERIF/
├── Legacy scoring 310127.docx        ← VÉRITÉ SCORANTES
├── Legacy questionnaire 290127.docx  ← VÉRITÉ TYPOLOGIE
├── Legacy CCC 310127.docx            ← VÉRITÉ CCC
└── Legacy ASR Referent op. 030226.docx ← VÉRITÉ ASR

SOURCES/excel/
├── Questionnaire_Etienne_1258.xlsx   ← VÉRITÉ QUESTION IDs
└── microparcours_aidant.xlsx         ← VÉRITÉ MICRO-PARCOURS

QUESTIONNAIRE/V*/base/
├── questions.md                      ← À VÉRIFIER
├── *_vulnerability_test.md           ← ⚠️ SCORANTES NON ALIGNÉES
└── autres fichiers                   ← NON VÉRIFIÉS
```

---

> 📄 Document de mémoire pour reprise du sujet  
> Créé le 04/02/2026 23:30  
> **Statut** : Audit en cours, incohérences majeures non résolues
