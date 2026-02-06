# 🔍 Audit Divergences Legacy - 06/02/2026

> **Date de l'audit** : 06/02/2026  
> **Comparaison** : VERIF (060226) vs SOURCES/legacy (ancien)  
> **Statut** : 🟡 À traiter - En attente de mise à jour SOURCES

---

## 📊 Résumé Exécutif

### Documents Word Legacy

| Document | VERIF | SOURCES | Diff | Statut |
|----------|-------|---------|------|--------|
| Questionnaire | 21037 | 19666 | **+1371** | ⚠️ **12 ajouts majeurs** |
| Micro Parcours | 14854 | 14488 | +366 | ⚠️ 2 ajouts |
| Scoring | 32169 | 31811 | +358 | ⚠️ 4 ajouts |
| Priorisation | 9820 | 9527 | +293 | ⚠️ 2 ajouts |
| Arborescence | 6786 | 6531 | +255 | ⚠️ 2 ajouts |
| Fondateur | 5360 | 5128 | +232 | ⚠️ 2 ajouts |

### Excel CAT (Tableau SOPHIE)

| Élément | SOURCES | VERIF | Diff |
|---------|---------|-------|------|
| Feuilles | 5 | 5 | ✅ Identiques |
| Chaînes partagées | 1727 | 1652 | ⚠️ **-75 chaînes** |

**Feuilles Excel (identiques) :**
- Social et Relationnel
- Administrative
- Santé physique et psychologique
- Fragilité du proche
- Parcours médical du proche

---

## 🎯 Thème Central des Modifications

> **RÈGLE CLÉ : DISTINCTION SCORANTE vs CRITIQUE DIRECTE**

Toutes les modifications clarifient :
1. **Coexistence** : Une même dimension peut avoir une question scorante ET une question critique directe (deux questions distinctes)
2. **Indépendance** : Le scoring mesure une intensité, la criticité capte un seuil - mécanismes non substituables
3. **Primauté** : La question critique directe prévaut toujours, le score ne module jamais une gravité intrinsèque
4. **Unicité du rôle** : Une question = un rôle (mais plusieurs questions peuvent explorer la même dimension)

---

## 📋 Différences Tangibles par Document

### 1. Legacy Questionnaire (+1371 chars) ⚡ LE PLUS MODIFIÉ

**12 nouvelles règles ajoutées :**

| # | Règle ajoutée | Impact |
|---|---------------|--------|
| 1 | Les questions scorantes mesurent **exclusivement** une intensité/accumulation | Clarification rôle |
| 2 | Une même dimension peut être couverte par une question critique directe **distincte** | Architecture |
| 3 | Question scorante et critique directe = **deux questions différentes** avec identifiants distincts | IDs séparés |
| 4 | **Une question scorante ne devient JAMAIS une question critique directe** | Règle absolue |
| 5 | Question critique peut porter sur même dimension qu'une scorante **sans redondance** | Coexistence OK |
| 6 | La critique capte un seuil **indépendamment** du score et de l'intensité mesurée | Indépendance |
| 7 | Présence d'une critique rend l'interprétation du score **secondaire** pour priorisation | Hiérarchie |
| 8 | Règle "UNE QUESTION = UN RÔLE" **n'interdit pas** plusieurs questions sur même dimension | Clarification |
| 9 | Elle interdit **uniquement** le cumul de rôles **au sein d'une même question** | Précision |
| 10 | Toute confusion scorante/critique = **violation du modèle Monka** | Règle stricte |
| 11 | Questions critiques directes **exclues** de toute condition critique composite | CCC impactés |
| 12 | Reformulation des règles de construction des CCC | CCC modifiés |

**3 reformulations :**
- Section 4.3 Questions déclenchantes (réécrite)
- Section 6.2 Règles de construction CCC (réécrite)
- Règle transversalité CCC (supprimée/intégrée)

### 2. Legacy Micro Parcours (+366 chars)

**Ajouts :**
- Quand un micro-parcours a une scorante ET une critique directe sur même dimension → **la critique est l'unique déclencheur de priorité**
- Les scorantes = rôle de **mesure et contextualisation**, sans effet sur priorité

### 3. Legacy Scoring (+358 chars)

**Ajouts :**
- Principe d'unicité n'interdit pas l'existence de questions critiques sur dimensions mesurées
- **"Le scoring mesure une intensité"**
- **"La criticité directe capte un seuil"**
- Ces mécanismes sont **indépendants, non comparables, non substituables**

### 4. Legacy Priorisation (+293 chars)

**Ajouts :**
- Question critique prévaut **toujours** sur scorante, peu importe le score
- **"Le score ne module jamais une gravité intrinsèque"**

### 5. Legacy Arborescence (+255 chars)

**Ajouts :**
- Signal de gravité = question critique directe OU condition critique composite
- Questions scorantes sur même dimension ≠ signal de gravité

### 6. Legacy Fondateur (+232 chars)

**Ajouts :**
- Distinction explicite : mesure progressive (scoring) vs seuils de rupture (criticité)
- Ces deux lectures peuvent coexister sans se confondre

---

## 🔄 Impact sur QUESTIONNAIRE V1-V5

### Mapping Fichiers → Legacy Source → Impact

Chaque vulnérabilité contient ~9 fichiers. Voici le mapping avec leur source Legacy et l'impact des modifications.

#### Légende Impact
- 🔴 **CRITIQUE** : Directement impacté par les modifications Legacy (logique scorante/critique)
- 🟠 **MOYEN** : Potentiellement impacté (dépend de la source)
- 🟢 **FAIBLE** : Probablement non impacté (documentation, tests)
- ⚪ **NON** : Fichier généré/technique

---

### Fichiers par Type (commun à V1-V5)

| Fichier | Source Legacy | Impact | Vérification requise |
|---------|---------------|--------|----------------------|
| `questions.md` | Legacy Questionnaire | 🔴 **CRITIQUE** | Typologie scorante vs critique, IDs distincts |
| `ccc_recommendations.md` | Legacy Priorisation + Questionnaire | 🔴 **CRITIQUE** | Exclusion questions critiques des CCC |
| `recommendations.md` | Excel CAT + Legacy Micro Parcours | 🟠 **MOYEN** | Priorisation, hiérarchie scoring/critique |
| `asr_definitions.md` | Legacy Micro Parcours + Priorisation | 🟠 **MOYEN** | Logique déclenchement ASR |
| `micro_taches_typologie.md` | Legacy Typologie MT | 🟢 **FAIBLE** | Typage STRUC/SEC/MED/INFO/ORGA inchangé |
| `README.md` | - | ⚪ **NON** | Documentation |
| `audit_completude.md` | - | ⚪ **NON** | Documentation |
| `*_vulnerability_test.md` | - | ⚪ **NON** | Fichier de test |
| `extracted_data.json` | Excel extraction | 🟠 **MOYEN** | Regénérer si Excel CAT modifié |
| `simulator_data.json` | Généré | ⚪ **NON** | Regénérer après corrections |

---

### Checklist par Fichier

#### 🔴 `questions.md` (CRITIQUE - À vérifier en priorité)

| Vérification | Description | V1 | V2 | V3 | V4 | V5 |
|--------------|-------------|----|----|----|----|-----|
| Séparation IDs | Scorantes et critiques = IDs distincts | ☐ | ☐ | ☐ | ☐ | ☐ |
| Typologie claire | Chaque question = UN rôle unique | ☐ | ☐ | ☐ | ☐ | ☐ |
| Pas de confusion | Aucune scorante ne "devient" critique | ☐ | ☐ | ☐ | ☐ | ☐ |
| Coexistence | Même dimension = 2 questions OK | ☐ | ☐ | ☐ | ☐ | ☐ |

#### 🔴 `ccc_recommendations.md` (CRITIQUE)

| Vérification | Description | V1 | V2 | V3 | V4 | V5 |
|--------------|-------------|----|----|----|----|-----|
| Exclusion critiques | Aucune question critique dans CCC | ☐ | ☐ | ☐ | ☐ | ☐ |
| CCC = combinaisons | Scorantes/déclenchantes/descriptives only | ☐ | ☐ | ☐ | ☐ | ☐ |

#### 🟠 `recommendations.md` (MOYEN)

| Vérification | Description | V1 | V2 | V3 | V4 | V5 |
|--------------|-------------|----|----|----|----|-----|
| Priorisation OK | Critique > Scoring respecté | ☐ | ☐ | ☐ | ☐ | ☐ |

#### 🟠 `asr_definitions.md` (MOYEN)

| Vérification | Description | V1 | V2 | V3 | V4 | V5 |
|--------------|-------------|----|----|----|----|-----|
| Déclenchement ASR | Cohérent avec nouvelles règles priorité | ☐ | ☐ | ☐ | ☐ | ☐ |

---

### Inventaire Complet par Vulnérabilité

#### V1 - Social & Relationnel (9 fichiers)
```
README.md                      ⚪ NON
questions.md                   🔴 CRITIQUE
asr_definitions.md             🟠 MOYEN
recommendations.md             🟠 MOYEN
ccc_recommendations.md         🔴 CRITIQUE
micro_taches_typologie.md      🟢 FAIBLE
audit_completude.md            ⚪ NON
implementation_strategy.md     ⚪ NON
social_vulnerability_test.md   ⚪ NON
```

#### V2 - Fragilité du Proche (10 fichiers)
```
README.md                              ⚪ NON
questions.md                           🔴 CRITIQUE
asr_definitions.md                     🟠 MOYEN
recommendations.md                     🟠 MOYEN
ccc_recommendations.md                 🔴 CRITIQUE
micro_taches_typologie.md              🟢 FAIBLE
audit_completude.md                    ⚪ NON
extracted_data.json                    🟠 MOYEN (regénérer)
simulator_data.json                    ⚪ NON (regénérer après)
fragilite_proche_vulnerability_test.md ⚪ NON
```

#### V3 - Santé Aidant (9 fichiers)
```
README.md                          ⚪ NON
questions.md                       🔴 CRITIQUE
asr_definitions.md                 🟠 MOYEN
recommendations.md                 🟠 MOYEN
ccc_recommendations.md             🔴 CRITIQUE
micro_taches_typologie.md          🟢 FAIBLE
audit_completude.md                ⚪ NON
extracted_data.json                🟠 MOYEN (regénérer)
sante_aidant_vulnerability_test.md ⚪ NON
```

#### V4 - Parcours Médical (9 fichiers)
```
README.md                              ⚪ NON
questions.md                           🔴 CRITIQUE
asr_definitions.md                     🟠 MOYEN
recommendations.md                     🟠 MOYEN
ccc_recommendations.md                 🔴 CRITIQUE
micro_taches_typologie.md              🟢 FAIBLE
audit_completude.md                    ⚪ NON
extracted_data.json                    🟠 MOYEN (regénérer)
parcours_medical_vulnerability_test.md ⚪ NON
```

#### V5 - Administrative (9 fichiers)
```
README.md                              ⚪ NON
questions.md                           🔴 CRITIQUE
asr_definitions.md                     🟠 MOYEN
recommendations.md                     🟠 MOYEN
ccc_recommendations.md                 🔴 CRITIQUE
micro_taches_typologie.md              🟢 FAIBLE
audit_completude.md                    ⚪ NON
extracted_data.json                    🟠 MOYEN (regénérer)
administrative_vulnerability_test.md   ⚪ NON
```

---

### Résumé Impact

| Impact | Fichiers | Total (5 vulnérabilités) |
|--------|----------|--------------------------|
| 🔴 **CRITIQUE** | questions.md, ccc_recommendations.md | **10 fichiers** |
| 🟠 **MOYEN** | recommendations.md, asr_definitions.md, extracted_data.json | **19 fichiers** |
| 🟢 **FAIBLE** | micro_taches_typologie.md | **5 fichiers** |
| ⚪ **NON** | README, audit, tests, simulator_data | **~12 fichiers** |

---

## ✅ Actions Recommandées

### Priorité 1 - Mise à jour SOURCES (À FAIRE PAR USER)

1. ☐ Remplacer les 6 fichiers Legacy dans `SOURCES/legacy/` par versions VERIF
2. ☐ Remplacer l'Excel CAT dans `SOURCES/excel/` par version VERIF
3. ☐ Mettre à jour `SOURCES/README.md` avec date 06/02/2026
4. ☐ Documenter dans `doc_tampon_modifications.md`

### Priorité 2 - Audit V1-V5

5. ☐ Passer en revue chaque `questions.md` pour vérifier la typologie
6. ☐ Vérifier que les CCC n'utilisent pas de questions critiques directes
7. ☐ S'assurer que les IDs scorantes ≠ IDs critiques

### Priorité 3 - Simulator

8. ☐ Vérifier que le simulator respecte la hiérarchie critique > scoring

---

## 📁 Fichiers Source

**VERIF (nouveaux - 06/02/2026) :**
```
VERIF/
├── Legacy Arborescence Globale 060226.docx
├── Legacy Fondateur 060226pages.docx
├── Legacy Micro parcours 060226.docx
├── Legacy Priorisation 060226.docx
├── Legacy questionnaire 060226.docx
├── Legacy scoring 060226.docx
└── Tableau SOPHIE CAT + Reco-Nouveau ques tionnaire par Vulnérabilité(1) (7).xlsx
```

**SOURCES (à remplacer) :**
```
SOURCES/legacy/
├── Legacy Arborescence Globale 030226.docx
├── Legacy Fondateur 030226pages.docx
├── Legacy Micro parcours 030226.docx
├── Legacy Priorisation 300127.docx
├── Legacy questionnaire 290127.docx
└── Legacy scoring 310127.docx

SOURCES/excel/
└── Tableau SOPHIE CAT + Reco-Nouveau questionnaire par Vulnérabilité(1).xlsx
```

---

> 🔒 **Ce document est la référence pour décider des mises à jour dans QUESTIONNAIRE/**  
> 📅 Généré le 06/02/2026
