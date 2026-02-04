# 🔧 Changements à Faire — Alignement QUESTIONNAIRE avec Legacy

> **Date audit** : 04/02/2026  
> **Objectif** : Lister toutes les incohérences entre nos fichiers QUESTIONNAIRE et les sources Legacy/Excel officielles  
> **Méthode** : Spot-checks sur V1-V5, comparaison READMEs vs Legacy scoring vs Excel

---

## 🔴 Incohérences CRITIQUES

### 1. V1 Social — Nombre de questions

| Source | Valeur |
|--------|--------|
| **README.md** | 13 questions ❌ |
| **Legacy scoring** | 15 questions ✅ |
| **Excel** | 15 questions ✅ |

**Action** : Mettre à jour `V1_social_relationnel/base/README.md` → 13 → **15**

> ⚠️ Le simulateur HTML n'a peut-être extrait que 13 questions. Vérifier les 2 questions manquantes.

---

### 2. Scorantes — Écarts majeurs

| V | Nos fichiers | Legacy scoring | Écart | Action |
|---|--------------|----------------|-------|--------|
| **V1** | 8 | 8 | ✅ OK | - |
| **V2** | 9 | **14** | ❌ -5 | 🔧 Corriger |
| **V3** | 10 | **9** | ❌ +1 | 🔧 Corriger |
| **V4** | 11 | **6** | ❌ +5 | 🔧 Corriger |
| **V5** | 4 | **3** | ❌ +1 | 🔧 Corriger |

**Impact** : Les formules de scoring dans nos fichiers sont incorrectes.

---

### 3. Score Max — Écarts (conséquence des scorantes)

| V | Nos fichiers | Legacy scoring | Écart |
|---|--------------|----------------|-------|
| **V1** | max 16 | max 16 | ✅ OK |
| **V2** | max 21 | **max 28** | ❌ -7 |
| **V3** | max 23-30 | **max 18** | ❌ +5-12 |
| **V4** | max 27 | **max 12** | ❌ +15 |
| **V5** | max 8 | **max 6** | ❌ +2 |

---

## ⚠️ Incohérences MOYENNES

### 4. Micro-parcours — Match ✅

| V | README | Excel | Match |
|---|--------|-------|-------|
| V1 (R) | 4 | 4 | ✅ |
| V2 (F) | 6 | 6 | ✅ |
| V3 (S) | 4 | 4 | ✅ |
| V4 (M) | 6 | 6 | ✅ |
| V5 (A) | 4 | 4 | ✅ |

**Total** : 24 micro-parcours (conforme)

---

## 📋 Liste des Fichiers à Modifier

### V1 — Social & Relationnel

| Fichier | Changement | Priorité |
|---------|------------|----------|
| `README.md` | Questions : 13 → **15** | 🔴 Haute |
| `questions.md` | Vérifier si contient 15 questions | 🔴 Haute |

---

### V2 — Fragilité du Proche

| Fichier | Changement | Priorité |
|---------|------------|----------|
| `fragilite_proche_vulnerability_test.md` | Scorantes : 9 → **14** | 🔴 Haute |
| `fragilite_proche_vulnerability_test.md` | Score max : 21 → **28** | 🔴 Haute |
| `fragilite_proche_vulnerability_test.md` | Formule : (brut/21)×20 → **(brut/28)×20** | 🔴 Haute |

---

### V3 — Santé de l'Aidant

| Fichier | Changement | Priorité |
|---------|------------|----------|
| `sante_aidant_vulnerability_test.md` | Scorantes : 10 → **9** | 🔴 Haute |
| `sante_aidant_vulnerability_test.md` | Score max : 23-30 → **18** | 🔴 Haute |
| `sante_aidant_vulnerability_test.md` | Formule : (brut/23)×20 → **(brut/18)×20** | 🔴 Haute |
| `questions.md` | Vérifier scorantes identifiées | 🟠 Moyenne |

---

### V4 — Parcours Médical

| Fichier | Changement | Priorité |
|---------|------------|----------|
| `parcours_medical_vulnerability_test.md` | Scorantes : 11 → **6** | 🔴 Haute |
| `parcours_medical_vulnerability_test.md` | Score max : 27 → **12** | 🔴 Haute |
| `parcours_medical_vulnerability_test.md` | Formule : (brut/27)×20 → **(brut/12)×20** | 🔴 Haute |

---

### V5 — Administrative

| Fichier | Changement | Priorité |
|---------|------------|----------|
| `administrative_vulnerability_test.md` | Scorantes : 4 → **3** | 🔴 Haute |
| `administrative_vulnerability_test.md` | Score max : 8 → **6** | 🔴 Haute |
| `administrative_vulnerability_test.md` | Formule : (brut/8)×20 → **(brut/6)×20** | 🔴 Haute |

---

## 🏷️ Marquage Source IA vs Legacy

> Nos fichiers utilisent déjà ce marquage dans les READMEs :
> - ✅ = Source officielle (Excel, Legacy, Simulateur)
> - 🤖 = Généré par IA (à valider)

### Ce qui est généré par IA (à vérifier)

| Élément | Fichier | Status |
|---------|---------|--------|
| Micro-tâches CCC | `ccc_recommendations.md` | 🤖 IA |
| Typage micro-tâches | `micro_taches_typologie.md` | 🤖 IA Auto |
| ASR signatures détaillées | `asr_definitions.md` | ⚠️ Partiellement IA |

---

## 🎯 Priorité d'Exécution

### 1. 🔴 Urgentes (Impact logique métier)

1. **Corriger les scorantes et formules** dans tous les `*_vulnerability_test.md`
2. **Corriger V1 README** : 13 → 15 questions

### 2. 🟠 Moyennes (Cohérence documentation)

3. Vérifier que chaque `questions.md` liste les bonnes questions comme scorantes
4. Vérifier les questions scorantes listées correspondent au Legacy scoring

### 3. 🟢 Basses (Nice to have)

5. Harmoniser les templates entre V1-V5
6. Ajouter références Legacy dans chaque fichier

---

## 📎 Sources de Vérité

| Donnée | Source officielle |
|--------|-------------------|
| Nombre de questions par V | `Questionnaire_Etienne_1258.xlsx` |
| Questions scorantes | `Legacy scoring 310127.docx` |
| Formules de scoring | `Legacy scoring 310127.docx` |
| Micro-parcours | `microparcours_aidant.xlsx` |
| CCC définitions | `Legacy CCC 310127.docx` |

---

> 📄 Audit généré le 04/02/2026  
> 🎯 **14 changements à apporter** (10 urgents, 4 moyens)

---

## ✅ Actions Effectuées (04/02/2026)

### V1 — Social & Relationnel
- ✅ Ajouté question **O47** (distance domicile) dans `questions.md`
- ✅ Corrigé statistiques : 13 → **15** questions
- ✅ Mis à jour `README.md`

### V2 — Fragilité du Proche
- ⚠️ Ajouté **CAUTION** warning dans `vulnerability_test.md`
- ✅ Corrigé formule : (brut/21)×20 → **(brut/28)×20**
- ❌ Scorantes non alignées : seulement 3/9 matchent le Legacy

### V3 — Santé de l'Aidant
- ⚠️ Ajouté **CAUTION** warning dans `vulnerability_test.md`
- ✅ Corrigé formule : (brut/23)×20 → **(brut/18)×20**
- ❌ Scorantes non alignées : seulement 2/10 matchent le Legacy

### V4 — Parcours Médical
- ⚠️ Ajouté **CAUTION** warning dans `vulnerability_test.md`
- ✅ Corrigé formule : (brut/27)×20 → **(brut/12)×20**
- ❌ Scorantes non alignées : seulement 2/11 matchent le Legacy

### V5 — Administrative
- ⚠️ Ajouté **CAUTION** warning dans `vulnerability_test.md`
- ✅ Corrigé formule : (brut/8)×20 → **(brut/6)×20**
- ❌ Scorantes partiellement alignées : E69 seul match

---

## 🔴 Travail Restant

> [!IMPORTANT]
> **Les tables de scorantes V2-V5 doivent être entièrement reconstruites** à partir du Legacy scoring.
> 
> Chaque question dans le tableau 4.1 doit être remplacée par les questions Legacy correspondantes.

| V | Questions Legacy à ajouter |
|---|---------------------------|
| V2 | O7, O13, N24, E25, E26, O4, N11, N12, N13, N34, O26, E32, E33, O6 |
| V3 | O29, O33, E7, E8, E9, E10, E11, O44, E18 |
| V4 | E36, E37, E43, E47, E54, E57 |
| V5 | E66, E69, E70 |
