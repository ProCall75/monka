# Méthode de versioning des personas — Modèle Additif

> **Document de référence — Moteur clinique My Monka**
> Date : 19 février 2026 | Auteur : PRAGMA pour Monka
> Statut : À valider avec Dr. Monka
> Objectif : Définir comment le questionnaire s'adapte aux types d'aidance et à l'âge de l'aidé, sans multiplier les versions

---

## 1. Le problème à résoudre

Le questionnaire My Monka doit s'adapter à deux variables fondamentales :
- **Le type d'aidance** : personne âgée, handicap, maladie chronique, troubles psy, addictions
- **L'âge de la personne aidée** : mineur (<18), adulte (18-59), senior (60+)

**L'approche naïve** serait de créer une version complète du questionnaire pour chaque combinaison :
5 types d'aidance × 3 tranches d'âge = **15 versions** de 150+ questions chacune.

C'est ingérable en maintenance, en validation clinique, et en évolution.

---

## 2. La solution : le modèle additif

### Principe fondamental

> **On ne crée pas de versions. On additionne des briques.**

Le questionnaire se compose de **3 couches empilables** :

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│   COUCHE 3 — OVERLAY ÂGE                            │
│   Règles fixes appliquées par tranche d'âge          │
│   (< 18 ans / 60+ ans)                              │
│   → Modifie les acteurs et les MTs, pas le          │
│     questionnaire lui-même                           │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│   COUCHE 2 — QUESTIONS AIDANCE (additives)          │
│   20 questions conditionnelles au total              │
│   → Activées par les réponses à N3 (multi-choix)    │
│   → Si multi-aidance : on EMPILE les blocs          │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│   COUCHE 1 — SOCLE COMMUN                           │
│   130 questions identiques pour tous                 │
│   (+ 15 triggers hors comptage)                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Pourquoi ça fonctionne

| Critère | Approche multiplicative ❌ | Approche additive ✅ |
|---|---|---|
| Nombre de versions | 15+ versions | **1 seule version** avec additions |
| Maintenance | Modifier 1 question = la modifier dans 15 fichiers | Modifier 1 question = 1 seul endroit |
| Multi-aidance | Explosion combinatoire | On empile les blocs |
| Validation clinique | Dr. Monka valide 15 jeux | Dr. Monka valide 1 socle + 5 petits blocs |
| Évolution | Ajouter un type d'aidance = créer 3 nouvelles versions | Ajouter 1 bloc de questions |

---

## 3. Architecture détaillée

### Couche 1 — Le socle commun (130 questions)

C'est le questionnaire de base, identique pour **tous** les utilisateurs, quelle que soit leur situation.

- **165 questions totales en base**
- **15 triggers** retirés (routage clinique interne, pas vus par l'utilisateur)
- **20 questions conditionnelles** retirées (couche 2)
- **= 130 questions socle**

Ces 130 questions couvrent les 5 vulnérabilités (V1-V5) de manière universelle.

### Couche 2 — Les questions aidance (20 questions additives)

Activées par la réponse à la **question N3** (type d'aidance).

#### Modification requise sur N3

| Paramètre | Actuellement | Cible |
|---|---|---|
| **Intitulé** | "...une seule réponse possible" | "...plusieurs réponses possibles" |
| **Type** | Choix Unique | **Choix Multiples** |
| **Impact** | 1 bloc d'aidance activé | Plusieurs blocs empilés |

#### Les 6 blocs de questions aidance

> **5 blocs par type d'aidance** (activés par N3) + **1 bloc par âge** (activé par O1)
> Chaque option N3 mappe vers exactement 1 catégorie interne — mapping 1:1.

**Bloc PERSONNE ÂGÉE (3 questions) — N3 réponse 1 « perte d'autonomie liée au vieillissement »**

| ID | Question |
|---|---|
| O53 | Dépendance évaluée par les services sociaux (grille AGGIR) ? |
| O54 | Quel niveau de dépendance AGGIR ? |
| E58 | Évaluation spécialisée liée à l'âge (consultation mémoire, bilan gériatrique) ? |

**Bloc HANDICAP (3 questions) — N3 réponse 2 « situation de handicap »**

| ID | Question |
|---|---|
| N16 | Quelle est l'origine du handicap ? |
| N17 | Quel est son type de handicap ? |
| N30 | Quel est le taux d'incapacité reconnu ? |

**Bloc MALADIE CHRONIQUE (0 question) — N3 réponse 3 « maladies chroniques »**

> Pas de question additionnelle. Le socle de 130Q couvre déjà la maladie chronique (ALD, diagnostic, ETP, polymédication, hospitalisations). Un diabétique de 35 ans n'a pas besoin de bilan de chutes ni de grille AGGIR.

**Bloc PSY (2 questions) — N3 réponse 4 « troubles psychiques »**

| ID | Question |
|---|---|
| E48 | Suivi pour troubles psychiques (cadre actuel) ? |
| E50 | Suivi en cours et observance du traitement ? |

**Bloc ADDICTION (7 questions) — N3 réponse 5 « addictions »**

| ID | Question |
|---|---|
| N37 | Quel type d'addiction la personne aidée présente-t-elle ? |
| N38 | Difficultés à contrôler sa consommation ou son comportement addictif ? |
| N39 | Problèmes de santé physique liés à l'addiction ? |
| N40 | Déjà tenté de se sevrer ou de suivre un traitement ? |
| E45 | Suivi dans un service spécialisé en addictologie ? |
| E49 | Quels types de professionnels sont impliqués dans le suivi ? |
| E51 | Prêt à être aidé pour son addiction ? |

**Bloc ENFANT (5 questions) — Activé par O1 < 18 ans + N3 éligible**

> Activé si O1 < 18 ans **ET** au moins une aidance éligible (Handicap, Maladie Chronique, Psy, Addiction). NON activé pour "Personne Âgée" seule (incohérent). NON activé si 60+ ans.

| ID | Question |
|---|---|
| E38 | Transition services enfant → adulte préparée ? |
| E59 | Orientation vers structure spécialisée TND ? |
| E60 | Quels professionnels sont déjà intervenus pour l'évaluation ? |
| E64 | Peut fréquenter une école ou structure adaptée ? |
| E65 | Besoin d'un accompagnant spécialisé (AESH, AVS) ? |

#### Combinaisons interdites (« faux amis »)

| Combinaison | Pourquoi c'est interdit |
|---|---|
| Personne Âgée + O1 < 18 ans | La perte d'autonomie liée au vieillissement n'existe pas chez un enfant. Si c'est un enfant dépendant → c'est du Handicap. |
| Bloc Enfant + O1 ≥ 60 ans | Évident — pas d'enfant de 60 ans. |

> Le moteur bloque ces combinaisons automatiquement dans `getActiveAidanceBlocks()` — si un utilisateur coche "Personne Âgée" avec un O1 < 18 ans, le bloc Personne Âgée est supprimé.

#### Mécanisme d'empilement

Si l'utilisateur coche **Handicap + Addiction** dans N3 :
- Socle 130 questions
- \+ Bloc Handicap (3 questions)
- \+ Bloc Addiction (7 questions)
- = **140 questions au total**

Si l'utilisateur coche **Psy + Maladie chronique + Handicap** :
- Socle 130 questions
- \+ Bloc Maladie Chronique (0 questions)
- \+ Bloc Psy (2 questions)
- \+ Bloc Handicap (3 questions)
- = **135 questions au total**

### Couche 3 — L'overlay âge (règles fixes, pas de questions supplémentaires)

#### Modification requise sur O1

| Paramètre | Actuellement | Cible |
|---|---|---|
| **Tranche 1** | - 15 ans | **< 18 ans** |
| **Tranche 2** | 15-20 ans | *(supprimée)* |
| **Tranche 3** | 20-60 ans | **18-59 ans** |
| **Tranche 4** | 60-75 ans | **60-75 ans** ✅ |
| **Tranche 5** | +75 ans | **75+ ans** ✅ |

**Raison** : Dr. Monka a identifié le **seuil de 60 ans** comme point de bascule clinique majeur. La tranche 15-20 n'a pas de pertinence clinique distincte.

#### Logique de l'overlay

```
Si O1 = < 18 ans   → Appliquer RÈGLES MINEUR pour chaque aidance cochée
Si O1 = 18-59 ans  → Aucun overlay (mode par défaut)
Si O1 = 60+ ans    → Appliquer RÈGLES SENIOR pour chaque aidance cochée
```

L'overlay âge **ne change pas le questionnaire**. Il modifie :
- Les **acteurs** assignés aux micro-tâches (ex: pédopsychiatre au lieu de psychiatre)
- Les **MTs ajoutées ou renforcées** (ex: bilan gériatrique systématique si 60+)
- Les **vulnérabilités renforcées** (ex: V1/V3 renforcées automatiquement si 60+)

---

## 4. Règles de l'overlay < 18 ans (Mineur)

### Handicap + < 18 ans

| Règle | Détail | Impact |
|---|---|---|
| Acteur → MDPH Enfant | Commission CDAPH enfant, pas adulte | Substitution acteur |
| Scolarité adaptée | ULIS, IME, SESSAD, classe spécialisée | Ajouter MT : vérifier orientation scolaire |
| AESH / AVS | Accompagnant scolaire si handicap | Ajouter MT : vérifier notification AESH |
| Enseignant référent | Interlocuteur clé parcours scolaire | Ajouter acteur |
| Transition enfant → adulte | Anticiper dès 16 ans la bascule des services | Ajouter MT si >16 ans |
| PCH Enfant | Complément AEEH, pas APA | Vérifier accès PCH enfant |

### Maladie chronique + < 18 ans

| Règle | Détail | Impact |
|---|---|---|
| Suivi pédiatrique | Pédiatre spécialisé, pas médecin adulte | Substitution acteur |
| PAI scolaire | Projet d'Accueil Individualisé à l'école | Ajouter MT : vérifier PAI en place |
| Transition pédiatrie → adulte | Passage services enfant vers adulte | Ajouter MT si >16 ans |
| Impact scolarité | Aménagements examens, gestion absences | Vérifier dispositifs scolaires |

### Troubles psychiques + < 18 ans

| Règle | Détail | Impact |
|---|---|---|
| Pédopsychiatrie | Pas psychiatrie adulte | Substitution acteur |
| CMP Infanto-Juvénile | Pas CMP adulte | Substitution structure |
| CMPP | Centre Médico-Psycho-Pédagogique | Ajouter acteur spécifique |
| Évaluation TND | TDAH, TSA, troubles DYS | Ajouter MT : bilan TND si pas fait |
| Maison des Adolescents | Ressource clé 12-18 ans | Ajouter acteur si >12 ans |
| Protection de l'enfance | Vigilance signalement si nécessaire | Règle de vigilance IDEC |

### Addictions + < 18 ans

| Règle | Détail | Impact |
|---|---|---|
| CJC | Consultations Jeunes Consommateurs (gratuites, anonymes) | Acteur = CJC, pas CSAPA |
| Maison des Adolescents | Point d'entrée privilégié | Ajouter acteur |
| Cadre légal mineur | Protection de l'enfance applicable | Vigilance signalement |
| Scolarisation | Risque de décrochage scolaire | Ajouter MT : lien établissement scolaire |

### Personne Âgée + < 18 ans

> **Combinaison interdite.** La perte d'autonomie liée au vieillissement ne concerne pas les mineurs. Si un enfant est en perte d'autonomie, c'est du handicap. Le moteur bloque automatiquement ce croisement.

---

## 5. Règles de l'overlay 60+ ans (Senior)

### Personne Âgée + 60+

| Règle | Détail | Impact |
|---|---|---|
| Grille AGGIR | Évaluation obligatoire du niveau de dépendance (GIR 1-6) | MT : vérifier évaluation AGGIR faite |
| APA | Allocation Personnalisée d'Autonomie | MT : vérifier accès APA |
| Bilan gériatrique | Évaluation globale spécialisée | MT : orienter consultation gériatrique |
| Consultation mémoire | Dépistage troubles cognitifs | MT : planifier si suspicion |
| Accueil de jour | Répit + stimulation pour l'aidé | MT : informer solutions répit |
| EHPAD / Résidence autonomie | Si perte d'autonomie sévère (GIR 1-3) | MT : évaluer orientation |
| HAD | Hospitalisation à domicile | Acteur HAD si soins lourds |

### Handicap + 60+

| Règle | Détail | Impact |
|---|---|---|
| Vieillissement du handicap | PHV = double fragilité | Renforcer suivi V1-V5 |
| APA vs PCH | À 60 ans, choix entre maintien PCH ou bascule APA | MT : informer sur les options |
| Orientation spécifique | Foyer de vie adapté vs EHPAD classique | MT : évaluer structures PHV |
| Polymédication | Risque accru d'interactions | **Renforcer V3** |
| Bilan gériatrique | Même si handicap pré-existant | Ajouter MT bilan géria |

### Maladie chronique + 60+

| Règle | Détail | Impact |
|---|---|---|
| Polypathologie | Cumul fréquent de pathologies chroniques | Renforcer coordination multi-spécialistes |
| Risque iatrogénique | Polymédication = danger #1 sujet âgé | **Renforcer massivement V3** |
| Bilan gériatrique global | Vision intégrée, pas silo par pathologie | MT : consultation gériatrique |
| Fragilité | Maladie chronique + âge = risque de cascade | **Activer V1** (chutes) systématiquement |
| Nutrition | Risque dénutrition majoré | **Renforcer V2** |
| Coordination DAC | Dispositif d'Appui à la Coordination | Acteur DAC pour parcours complexe |

### Troubles psychiques + 60+

| Règle | Détail | Impact |
|---|---|---|
| Psychogériatrie | Spécialité dédiée, pas psychiatrie standard | Substitution acteur |
| Diagnostic différentiel | Confusion dépression / démence débutante | MT : évaluation neuro-psy si doute |
| Dépression du sujet âgé | Présentation atypique (somatique, apathie) | Renforcer V5 avec critères gériatriques |
| Isolement renforcé | Psy + âge = isolement × 2 | **Renforcer massivement V4** |
| Risque psychotropes | Benzodiazépines, neuroleptiques très risqués chez le sujet âgé | Alerte V3 : revue ordonnance |

### Addictions + 60+

| Règle | Détail | Impact |
|---|---|---|
| Addiction médicamenteuse | Benzodiazépines, opioïdes — addiction #1 chez le sujet âgé | MT : revue ordonnance ciblée |
| Alcool du sujet âgé | Sous-diagnostiqué, tabou familial | MT : dépistage spécifique |
| Interactions médicamenteuses | Alcool + polymédication = danger majeur | **Renforcer V3** |
| Chutes | Addiction + âge = risque de chutes multiplié | **Renforcer V1** |
| Sous-diagnostic | Professionnels sous-estiment addiction chez seniors | Règle IDEC : vigilance explicite |

---

## 6. Exemples concrets — Questionnaires générés

### Exemple 1 — Marie, 72 ans, personne âgée

**Entrées :**
- N3 = ① Personne Âgée
- O1 = 60-75 ans

**Questionnaire généré :**
- ✅ 130 questions socle
- ✅ + 3 questions Bloc Personne Âgée (AGGIR, bilan géria)
- ✅ Overlay 60+ activé → acteurs gériatriques, renforcement V1/V2
- **Total : 133 questions**

### Exemple 2 — Paul, 45 ans, handicap + addiction

**Entrées :**
- N3 = ② Handicap + ⑤ Addiction
- O1 = 18-59 ans

**Questionnaire généré :**
- ✅ 130 questions socle
- ✅ + 3 questions Bloc Handicap
- ✅ + 7 questions Bloc Addiction
- ✅ Pas d'overlay âge (18-59 = défaut)
- **Total : 140 questions**

### Exemple 3 — Léo, 16 ans, handicap + troubles psy

**Entrées :**
- N3 = ② Handicap + ④ Psy
- O1 = < 18 ans

**Questionnaire généré :**
- ✅ 130 questions socle
- ✅ + 3 questions Bloc Handicap
- ✅ + 2 questions Bloc Psy
- ✅ + 5 questions Bloc Enfant (activé automatiquement car < 18 + aidance éligible)
- ✅ Overlay < 18 activé → pédopsychiatrie, CMP-IJ, MDPH enfant, PAI scolaire
- **Total : 140 questions**

### Exemple 4 — Fatima, 68 ans, maladie chronique + psy + addiction

**Entrées :**
- N3 = ③ Maladie chronique + ④ Psy + ⑤ Addiction
- O1 = 60-75 ans

**Questionnaire généré :**
- ✅ 130 questions socle
- ✅ + 0 questions Bloc Maladie Chronique (couvert par le socle)
- ✅ + 2 questions Bloc Psy
- ✅ + 7 questions Bloc Addiction
- ✅ Overlay 60+ activé → V1/V2/V3 renforcées massivement, psychogériatrie, revue ordonnance
- **Total : 139 questions**

---

## 7. Modifications techniques requises

### En base de données

| Modification | Table | Champ | Détail |
|---|---|---|---|
| ① Passer N3 en multi-choix | `questions` | `response_type` | "Obligatoire / Choix Unique" → "Obligatoire / Choix Multiples" |
| ② Mettre à jour l'intitulé N3 | `questions` | `question_text` | Retirer "(une seule réponse possible)" → "(plusieurs réponses possibles)" |
| ③ Corriger tranches O1 | `questions` | `response_options` | ["-15", "15-20", "20-60", "60-75", "+75"] → ["< 18 ans", "18-59 ans", "60-75 ans", "75+ ans"] |
| ④ Mettre à jour intitulé O1 | `questions` | `question_text` | Retirer mention "majorité numérique 15 ans" |

### Dans le moteur clinique

| Modification | Impact |
|---|---|
| Adapter la logique N3 | Gérer un tableau de réponses au lieu d'une valeur unique |
| Empiler les blocs aidance | Pour chaque valeur dans N3, ajouter le bloc de questions correspondant |
| Implémenter l'overlay âge | Règles conditionnelles sur O1 qui modifient acteurs et MTs |

---

## 8. Résumé

> **Modèle** : Additif — 1 socle + blocs empilables + overlay âge fixe
>
> **Socle** : 130 questions identiques pour tous (+ 15 triggers internes)
>
> **Aidance** : 6 blocs (5 par N3 + 1 par âge O1), de 0 à 7 questions, empilables
>
> **Catégories** : Personne Âgée (3Q) · Handicap (3Q) · Maladie Chronique (0Q) · Psy (2Q) · Addiction (7Q) · Enfant (5Q, par O1)
>
> **Faux amis bloqués** : Personne Âgée interdit si < 18 ans · Enfant interdit si ≥ 60 ans
>
> **Âge** : 2 overlays fixes (< 18 et 60+) qui modifient acteurs et MTs, pas le questionnaire
>
> **Résultat** : Chaque utilisateur reçoit entre 130 et ~150 questions selon son profil. 73 combinaisons possibles. Zéro version à maintenir.

---

## ⚠️ Note importante

> [!IMPORTANT]
> Ce document décrit la **méthode de versioning** et les **règles d'overlay par âge** proposées. Les règles cliniques détaillées (acteurs, MTs spécifiques, renforcements de vulnérabilités) doivent être **validées par Dr. Monka** avant implémentation. Les questions spécifiques par aidance existent déjà en base et sont opérationnelles — seul le passage en multi-choix de N3 et la correction des tranches d'âge de O1 sont des modifications à appliquer.
