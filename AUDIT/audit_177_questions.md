# 📊 Audit du Nombre de Questions — 177 vs Réalité

> **Date audit** : 04/02/2026  
> **Objectif** : Vérifier le compte de 177 questions mentionné par l'équipe Monka  
> **Méthode** : Extraction exhaustive des IDs uniques depuis tous les fichiers Excel sources

---

## 🎯 Résultat Principal

| Source | Nombre trouvé |
|--------|---------------|
| **Questions uniques (tous Excel)** | **174** |
| **Mentionné par équipe Monka** | 177 |
| **Écart** | -3 questions |

---

## 📁 Sources Analysées

### 1. Questionnaire_Etienne_1258.xlsx

| Onglet | Questions |
|--------|-----------|
| Trigger | 12 |
| social et relationnel | 15 |
| administrative | 18 |
| santé physique et psychologique | 27 |
| fragilité du proche | 57 |
| parcours médical du proche | 36 |
| **Total (sans Dev Final)** | **165** |

> Le sheet "Dev Final" contient 184 lignes mais ce sont les mêmes questions consolidées.

---

### 2. Questionnaire_Etienne_1258-1_suivi_mensuel.xlsx

| Onglet | Questions |
|--------|-----------|
| Questionnaire initial | 165 (même que ci-dessus) |
| Questionnaire de suivi | 174 (+9 questions "Suivi mensuel") |

**Questions supplémentaires de suivi (S000-S008)** :
- S000, S001, S002, S003, S004, S005, S006, S007, S008

Ces 9 questions sont spécifiques au suivi mensuel et n'existent pas dans le questionnaire initial.

---

### 3. microparcours_aidant.xlsx

| Onglet | Contenu |
|--------|---------|
| Micro-parcours (Aidant) | 24 micro-parcours (R1-R4, F1-F6, S1-S4, M1-M6, A1-A4) |
| Questions par micro-parcours | 163 lignes, 153 IDs uniques (sous-ensemble des 165) |
| Triggers par micro-parcours | 152 associations (questions trigger → micro-parcours) |
| Triggers (liste) | 12 questions trigger |

> Ce fichier ne contient pas de nouvelles questions, il référence les questions existantes.

---

### 4. Tableau SOPHIE CAT + Reco-Nouveau questionnaire par Vulnérabilité(1).xlsx

| Onglet | Lignes | Contenu |
|--------|--------|---------|
| Social et Relationnel | 114 | Recommandations (pas des questions) |
| Administrative | 126 | Recommandations |
| Santé physique et psychologique | 231 | Recommandations |
| Fragilité du proche | 618 | Recommandations |
| Parcours médical du proche | 353 | Recommandations |
| **Total** | **1442** | Recommandations + CCC |

> Ce fichier contient les recommandations et CCC, pas les questions du questionnaire.

---

## 📋 Liste Complète des 174 IDs Uniques

### Questions Type "E" (72 questions)
E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18, E19, E20, E21, E22, E23, E24, E25, E26, E27, E28, E29, E30, E31, E32, E33, E34, E35, E36, E37, E38, E39, E40, E41, E42, E43, E44, E45, E46, E47, E48, E49, E50, E51, E52, E53, E54, E55, E56, E57, E58, E59, E60, E61, E62, E63, E64, E65, E66, E67, E68, E69, E70, E71, E72

### Questions Type "N" (39 questions)  
N1, N3, N4, N5, N6, N7, N8, N9, N10, N11, N12, N13, N14, N16, N17, N18, N19, N20, N21, N22, N23, N24, N25, N26, N27, N29, N30, N31, N32, N34, N36, N37, N38, N39, N40, N41, N42, N43, N44

> **Note** : Pas de N2, N15, N28, N33, N35 (gaps dans la numérotation)

### Questions Type "O" (54 questions)
O1, O2, O3, O4, O5, O6, O7, O8, O9, O11, O12, O13, O14, O15, O16, O17, O18, O19, O20, O21, O22, O23, O24, O26, O27, O28, O29, O30, O31, O32, O33, O35, O36, O37, O38, O39, O40, O41, O42, O43, O44, O45, O46, O47, O48, O49, O50, O51, O53, O54, O59, O61, O63, O64

> **Note** : Pas de O10, O25, O34, O52, O55, O56, O57, O58, O60, O62 (gaps dans la numérotation)

### Questions Type "S" — Suivi Mensuel (9 questions)
S000, S001, S002, S003, S004, S005, S006, S007, S008

---

## 🔍 Hypothèses sur l'Écart de 3 Questions

### Hypothèse 1 : Questions supprimées ou archivées
Les gaps dans la numérotation (N2, N15, O10, etc.) suggèrent que des questions ont peut-être été supprimées au fil du temps.

### Hypothèse 2 : Questions dans un autre document
Les 3 questions manquantes pourraient être dans un document que nous n'avons pas (ancien Excel, autre source).

### Hypothèse 3 : Comptage différent
L'équipe Monka compte peut-être :
- Les sous-questions séparément
- Les questions conditionnelles comme distinctes
- Un questionnaire plus ancien

---

## ✅ Ventilation par Vulnérabilité (selon Excel)

| Vulnérabilité | Questions | Scorantes (Legacy) |
|---------------|-----------|-------------------|
| **V1** Social & Relationnel | 15 | 8 |
| **V2** Fragilité du Proche | 57 | 14 |
| **V3** Santé de l'Aidant | 27 | 9 |
| **V4** Parcours Médical | 36 | 6 |
| **V5** Administrative | 18 | 3 |
| **Trigger** | 12 | — |
| **Suivi mensuel** | 9 | — |
| **TOTAL** | **174** | **40** |

---

## 📎 Fichiers Sources Vérifiés

| Fichier | Chemin | Statut |
|---------|--------|--------|
| Questionnaire_Etienne_1258.xlsx | `/SOURCES/excel/` | ✅ Analysé |
| Questionnaire_Etienne_1258-1_suivi_mensuel.xlsx | `/SOURCES/excel/` | ✅ Analysé |
| microparcours_aidant.xlsx | `/SOURCES/excel/` | ✅ Analysé |
| Tableau SOPHIE CAT + Reco-Nouveau questionnaire par Vulnérabilité(1).xlsx | `/SOURCES/excel/` | ✅ Analysé |

---

---

## ⚠️ Clarification : Pourquoi 96 ET 174 ?

Ces deux chiffres ne sont **pas contradictoires** — ils mesurent des choses différentes :

| Chiffre | Ce qu'il représente |
|---------|---------------------|
| **96** | Total **explicitement mentionné** dans le Legacy scoring (seulement 4 vulnérabilités sur 5) |
| **174** | Total **réel** extrait des fichiers Excel (toutes questions, tous types) |

### Explication

Le Legacy scoring utilise le format "ensemble de (X) questions" uniquement pour :
- V1 Social : 15 ✅
- V3 Santé Aidant : 27 ✅
- V4 Parcours Médical : 36 ✅
- V5 Administrative : 18 ✅
- **Sous-total Legacy explicite** : **96**

**Il omet** :
- V2 Fragilité du proche (57 questions)
- Triggers (12 questions)
- Suivi mensuel (9 questions)

### Calcul complet (Excel = vérité)

| Source | Questions |
|--------|-----------|
| V1 Social | 15 |
| V2 Fragilité | 57 |
| V3 Santé Aidant | 27 |
| V4 Parcours Médical | 36 |
| V5 Administrative | 18 |
| **Sous-total V1-V5** | **153** |
| + Triggers | 12 |
| **Questionnaire initial** | **165** |
| + Suivi mensuel (S000-S008) | 9 |
| **TOTAL UNIQUE** | **174** |

---

## 🎯 Conclusion

**Les sources Excel officielles contiennent 174 questions uniques**, pas 177.

L'écart de 3 questions pourrait s'expliquer par :
1. Questions supprimées/archivées (gaps dans la numérotation)
2. Un comptage différent par l'équipe Monka
3. Un document source que nous n'avons pas

**Recommandation** : Demander à l'équipe Monka la source exacte du chiffre 177 pour réconcilier.

---

> 📄 Audit généré le 04/02/2026  
> 🔒 Données extraites directement des fichiers Excel officiels dans `/SOURCES/excel/`
