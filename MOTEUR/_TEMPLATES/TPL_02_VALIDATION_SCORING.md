# 🩺 TPL_02 — Validation Scoring

> **Usage** : Sprint 1 — une fiche par vulnérabilité (V1 à V5)
> **Objectif** : Questionner et valider chaque composant du scoring — seuils, poids, logique clinique
> **Rempli par** : Antonin (pré-remplissage + tests) + Dr. Monka (validation clinique)

---

## En-tête

> **Sprint** : [N] — [Nom du sprint]
> **Vulnérabilité** : V[N] — [Nom complet]
> **Date** : ../../2026
> **Statut** : 🔲 En cours

---

## 1. Vue d'ensemble de la vulnérabilité

| Métrique | Valeur |
|---|---|
| **Nom** | |
| **Description clinique** | |
| **Nombre de questions scorantes** | |
| **Seuils actuels** | Faible: [0-X], Modéré: [X-Y], Élevé: [Y-Z], Critique: [Z-100] |
| **Poids dans le score global** | |
| **Sous-blocs** | [lister les sous-blocs si applicable] |

---

## 2. Questions scorantes — Revue des poids

> Pour chaque question qui contribue au score de cette V.

| # | Question ID | Libellé (résumé) | Réponse scorante | Score actuel | Poids (C1/C2) | ❓ Ce poids est justifié ? |
|---|---|---|---|---|---|---|
| 1 | | | | | C1 / C2 | ✅/❌ Commentaire |
| 2 | | | | | | |
| 3 | | | | | | |

### 🧠 Questions à se poser

- Les questions en **C2** (poids fort) sont-elles vraiment les plus importantes cliniquement pour cette V ?
- Y a-t-il des questions en C1 qui devraient être C2 ? Et inversement ?
- Le score d'une réponse "extrême" (ex: idées suicidaires = Oui) est-il suffisamment élevé ?

---

## 3. Seuils — Calibration

| Niveau | Seuil actuel | Signification clinique attendue | ❓ Est-ce cohérent ? |
|---|---|---|---|
| **Faible** | 0 – [X] | L'aidant va bien sur cet axe | ✅/❌ |
| **Modéré** | [X] – [Y] | Signes de vigilance, pas d'urgence | ✅/❌ |
| **Élevé** | [Y] – [Z] | Situation préoccupante, action recommandée | ✅/❌ |
| **Critique** | [Z] – 100 | Situation urgente, intervention nécessaire | ✅/❌ |

### 🧠 Questions à se poser

- **Test du seuil bas** : "Un aidant qui score juste au-dessus du seuil Modéré — est-ce qu'en vrai il a besoin d'attention ?"
- **Test du seuil haut** : "Un aidant qui score juste en dessous de Critique — on est sûr que c'est pas critique ?"
- **Test de l'écart** : "L'écart entre les seuils est-il proportionnel à la gravité ?"

---

## 4. Scénarios de test

> 3 profils testés pour vérifier que le scoring "sonne juste".

### Scénario A — Profil qui devrait scorer FAIBLE

| Donnée | Valeur |
|---|---|
| **Profil** | [Description courte] |
| **Réponses clés** | [Les réponses qui devraient donner un score faible] |
| **Score attendu** | Faible ([estimation]) |
| **Score obtenu** | [Score réel dans le simulateur] |
| **Verdict** | ✅ Cohérent / ❌ Incohérent — [pourquoi] |

### Scénario B — Profil qui devrait scorer ÉLEVÉ/CRITIQUE

| Donnée | Valeur |
|---|---|
| **Profil** | |
| **Réponses clés** | |
| **Score attendu** | |
| **Score obtenu** | |
| **Verdict** | |

### Scénario C — Edge case (profil ambigu)

| Donnée | Valeur |
|---|---|
| **Profil** | |
| **Réponses clés** | |
| **Score attendu** | |
| **Score obtenu** | |
| **Verdict** | |

---

## 5. Sens clinique global

> En langage médecin : qu'est-ce que cette vulnérabilité mesure exactement et pourquoi c'est important.

**Ce que V[N] évalue :**
> [Texte rédigé par Dr. Monka]

**Pourquoi c'est dans le moteur :**
> [Justification clinique]

**Références (si applicable) :**
> [Guidelines HAS, consensus, publications]

---

## 6. Corrections à apporter

| # | Ce qui change | Avant | Après | Justification clinique | D-XXX |
|---|---|---|---|---|---|
| 1 | | | | | |

---

## Validation

| Validateur | Rôle | Statut | Date |
|---|---|---|---|
| Antonin | Les données sont correctes, les tests passent | 🔲 | |
| Dr. Monka | Les poids, seuils et sens clinique sont validés | 🔲 | |

---

> 🔒 Cette fiche est verrouillée une fois les deux validations obtenues.
