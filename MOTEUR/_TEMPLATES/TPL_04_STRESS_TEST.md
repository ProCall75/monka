# 🧪 TPL_04 — Stress Test / Cas Clinique

> **Usage** : Sprint 4 — un fichier par cas clinique testé
> **Objectif** : Soumettre le moteur à un cas clinique réel ou réaliste, documenter le résultat, analyser la conformité
> **Rempli par** : Dr. Monka (crée le cas + analyse le résultat) + Antonin (exécute + documente)

---

## En-tête

> **Sprint** : [N] — [Nom du sprint]
> **Cas** : #[NN] — [Titre descriptif, ex: "Aidante 55 ans, mère Alzheimer, épuisement"]
> **Créé par** : Dr. Monka
> **Date** : ../../2026
> **Type** : 🟢 Cas typique / 🟠 Edge case / 🔴 Cas piège
> **Statut** : 🔲 En cours

---

## 1. Profil patient (anonymisé)

| Donnée | Valeur |
|---|---|
| **Âge de l'aidant** | |
| **Type d'aidance (N3)** | |
| **Âge de l'aidé (O1)** | |
| **Situation résumée** | [2-3 phrases décrivant la situation clinique] |
| **Ce que le moteur DEVRAIT détecter** | [Les MPs, alertes, niveaux attendus] |
| **Ce que le moteur ne DEVRAIT PAS faire** | [Faux positifs à éviter] |

---

## 2. Réponses au questionnaire

> Les réponses clés qui définissent ce cas. Pas besoin des 165 — seulement celles qui influencent le résultat.

| Question ID | Libellé (résumé) | Réponse | Pourquoi cette réponse |
|---|---|---|---|
| N3 | Type d'aidance | | |
| O1 | Âge de l'aidé | | |
| | | | |
| | | | |

> Si le cas utilise un persona existant : **Persona utilisé** : [nom] avec modifications : [...]

---

## 3. Résultat moteur

### 3a. Scores

| V | Nom | Score obtenu | Niveau | Attendu ? |
|---|---|---|---|---|
| V1 | Santé mentale aidant | | | ✅/❌ |
| V2 | Ressources & aides | | | ✅/❌ |
| V3 | Santé physique aidant | | | ✅/❌ |
| V4 | Situation de l'aidé | | | ✅/❌ |
| V5 | Parcours de soins | | | ✅/❌ |

### 3b. MPs activés

| MP | Nom | Niveau le + haut | Attendu ? | Commentaire Dr. Monka |
|---|---|---|---|---|
| | | 🟢/🟠/🔴 | ✅/❌ | |

### 3c. MPs NON activés — Vérification

> Y a-t-il des MPs qui auraient DÛ s'activer mais ne l'ont pas fait ?

| MP | Nom | Pourquoi non activé | C'est correct ? |
|---|---|---|---|
| | | Aucune règle ne fire car [raison] | ✅ OK / ❌ Problème |

### 3d. Règles CCC qui ont firé

| Règle ID | Condition | MP | Catégorie | Pertinent ? |
|---|---|---|---|---|
| | | | | ✅/❌ |

---

## 4. Analyse clinique (Dr. Monka)

### Le moteur a-t-il bien réagi ?

> [Analyse libre de Dr. Monka : ce qui est bien, ce qui manque, ce qui est en trop]

### Ce qui manque

| # | Élément manquant | Gravité | Correction proposée |
|---|---|---|---|
| | | 🔴/🟠/🟡 | |

### Ce qui est en trop (faux positifs)

| # | Élément en trop | Pourquoi c'est un faux positif | Correction proposée |
|---|---|---|---|
| | | | |

### Ce qui est absurde

| # | Élément absurde | Pourquoi c'est absurde | Correction proposée |
|---|---|---|---|
| | | | |

---

## 5. Vérification affichage simulateur

| Élément | Correct ? | Commentaire |
|---|---|---|
| Les scores V1-V5 s'affichent | ✅/❌ | |
| Les MPs activés sont les bons | ✅/❌ | |
| Le niveau affiché est correct (couleur) | ✅/❌ | |
| Les recos s'affichent avec le bon wording | ✅/❌ | |
| Les MTs sont complètes | ✅/❌ | |

---

## 6. Verdict

| Critère | Résultat |
|---|---|
| Scores cliniquement cohérents | ✅/⚠️/❌ |
| MPs pertinents activés | ✅/⚠️/❌ |
| Pas de faux positifs majeurs | ✅/⚠️/❌ |
| Pas d'éléments manquants critiques | ✅/⚠️/❌ |
| Affichage simulateur OK | ✅/⚠️/❌ |
| **Verdict global** | ✅ Conforme / ⚠️ À corriger / ❌ Problème majeur |

> Si ⚠️ ou ❌ → créer un D-XXX pour chaque correction nécessaire.

---

## Validation

| Validateur | Statut | Date |
|---|---|---|
| Dr. Monka | 🔲 Conforme / 🔲 À corriger | |
| Antonin | 🔲 Corrections appliquées / 🔲 N/A | |

---

> 🔒 Ce cas clinique est verrouillé une fois les deux validations obtenues.
