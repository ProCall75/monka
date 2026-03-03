# 📋 Décisions cliniques requises — Moteur Monka

> **Destinataire** : Équipe clinique (Dr. Monka)  
> **De** : PRAGMA (audit technique moteur)  
> **Date** : 3 mars 2026  
> **Urgence** : Moyenne — ces anomalies empêchent certaines recommandations de se déclencher correctement

---

## Contexte simplifié

Le moteur Monka utilise des **règles d'activation** pour déclencher des recommandations. Chaque règle dit : *"SI l'aidant répond X à la question Y → ALORS déclencher la recommandation Z"*.

Pour que ça marche, le texte de la réponse dans la règle **doit être identique** au texte affiché dans le questionnaire. Si quelqu'un a écrit une version raccourcie (ex : "7 et plus" au lieu de "7 médicament et plus"), la règle **ne se déclenche jamais**.

On a trouvé **2 types de problèmes** :

1. **45 règles avec des textes qui ne matchent pas** les options de réponse actuelles
2. **30 règles CCC avec une logique "OU"** qui contredit la définition même du CCC

> **Nous avons déjà corrigé** les cas simples (abréviations, fautes de frappe, majuscules). Il ne reste que les cas où **nous ne pouvons pas deviner** quelle réponse est visée, parce que les options de la question ont été modifiées.

---

## PARTIE A — Textes incompatibles (décision requise)

Ces règles font référence à des réponses **qui n'existent plus** dans le questionnaire actuel. L'aidant ne peut physiquement pas sélectionner cette réponse → **la règle ne se déclenche jamais**.

Pour chaque cas, nous avons besoin de savoir : **quelle réponse parmi les options actuelles devrait déclencher cette règle ?**

---

### A1. Question N7 — *"Avez-vous dû aménager votre activité professionnelle ?"*

**Options actuelles :** Non / Oui j'ai dû aménager mes horaires / Oui j'ai dû prendre des jours de congé

**4 règles utilisent `val = "Arrêt"`** (qui n'existe plus dans les options) :
- V1_R1_CRIT_01, V1_R1_CRIT_02_a, V1_R1_CRIT_02_b, V1_R1_CRIT_02_c

> 💡 **Question :** L'option "Arrêt" a-t-elle été retirée ? Si oui, ces 4 règles Critique ne se déclenchent plus. Faut-il les relier à "Oui j'ai dû prendre des jours de congé" ou supprimer ces règles ?

**☐ Décision :** ______________

---

### A2. Question E11 — *"Pensez-vous pouvoir continuer dans les 6 prochains mois ?"*

**Options actuelles :** Oui, sans difficulté / Oui, mais ce sera difficile / Je ne suis pas sûr·e / Non, je risque de ne plus y arriver

**1 règle utilise `val = "Oui, régulièrement"`** :
- V3_S2_CRIT_01

> 💡 **Question :** "Oui, régulièrement" ne correspond à aucune option. C'est une règle Critique. À quoi devait-elle se relier ? "Non, je risque de ne plus y arriver" ?

**☐ Décision :** ______________

---

### A3. Questions O37/O38 — *"Avez-vous un médecin spécialiste ?"*

**Options actuelles :** Oui / Non

**1 règle utilise `O37 = "Oui, fréquemment"` ET `O38 = "Mauvais"`** :
- V3_S3_CCC_04

> 💡 **Question :** Les options sont binaires (Oui/Non). "Fréquemment" et "Mauvais" ne matchent rien. Cette règle CCC semble se référer à d'anciennes options.

**☐ Décision :** ______________

---

### A4. Question E25 — *"La personne confond-elle jour et nuit ?"*

**Options actuelles :** Non / Parfois / Oui

**1 règle utilise `val = "Très insuffisantes"`** :
- V4_F1_CCC_04

> 💡 **Question :** "Très insuffisantes" ne correspond à rien sur cette question. C'est probablement un copier-coller d'une autre question.

**☐ Décision :** ______________

---

### A5. Question O6 — *"A-t-elle chuté dans les 6 derniers mois ?"*

**Options actuelles :** Non / Oui, mais sans gravité / Oui avec complication, ou, Oui plusieurs fois

**1 règle utilise `val = "Aucune"`** :
- V4_F1_CCC_04

> 💡 **Question :** "Aucune" ne correspond à aucune option. Si l'intention est "pas de chute" → la bonne valeur serait "Non".

**☐ Décision :** ______________

---

### A6. Questions O48 — *"À quelle fréquence voyez-vous votre proche ?"*

**Plusieurs règles utilisent des vals abrégées** : "1x/mois", "1x/3 mois", "1x/6 mois", "1x/an"

> 💡 **Question :** Ces abréviations ne matchent certainement pas les options actuelles. Pouvez-vous confirmer les textes exacts de O48 ?

**☐ Décision :** ______________

---

### A7. Question N7 dans opérateur `in` — *"Aménagement activité pro"*

**Vals dans `in` : "Aménagement horaires", "Congés"**

> 💡 **Question :** Mêmes problèmes que A1. "Arrêt", "Aménagement horaires", "Congés" → les options ont changé.

**☐ Décision :** ______________

---

## PARTIE B — CCC avec logique "OU" (30 règles)

### Rappel : qu'est-ce qu'un CCC ?

Un **CCC** (Condition Critique Composite) est une alerte qui se déclenche quand **plusieurs signaux se combinent** pour révéler un risque que chaque signal seul ne justifie pas.

Exemple d'un vrai CCC : *"L'aidant passe +5h en admin **ET** le maintien est impossible"* → chaque signal seul = Standard. Les deux ensemble = CCC.

**Le problème :** 30 règles étiquetées CCC utilisent une logique **"OU"** — ce qui veut dire qu'**un seul signal suffit** à déclencher. Si un seul signal suffit, ce n'est pas un CCC — c'est une règle Simple (Standard ou Critique).

### Impact moteur actuel

Le moteur applique actuellement un **ET systématique**. Il ignore le "OU". Concrètement :
- Des aidants qui cochent **un seul** des signaux devraient (selon la logique OU voulue) recevoir l'alerte → **ils ne la reçoivent pas**.

### Comment lire le tableau ci-dessous

Pour chaque règle, la colonne **"Recommandation PRAGMA"** donne notre analyse technique. La colonne **"Décision clinique"** est à remplir par l'équipe.

| Règle | Conditions (résumé) | Type actuel | Recommandation PRAGMA | ☐ Décision |
|---|---|---|---|---|
| **V2_A1_CCC_02** | Aidé en CMU **OU** Aidant en CMU | ccc | → 2 règles Critique séparées + 1 CCC si les deux sont en CMU | ☐ |
| **V4_F1_CCC_02** | Proche isolé totalement **OU** Perte activité | ccc | → 2 Critique séparées (chaque signal est grave seul) | ☐ |
| **V4_F4_CCC_03** | 7+ médicaments **OU** Vista mauvaise **OU** Alcool | ccc | → 3 Critique séparées | ☐ |
| **V4_F5_CCC_02** | Addiction incontrôlée **OU** Dégâts physiques | ccc | → 2 Critique + 1 CCC si les deux | ☐ |
| **V4_F5_CCC_04** | Incapacité ≥80% **OU** GIR 1-2 | ccc | → 2 Critique séparées | ☐ |
| **V5_M1_CCC_P01** | Ne comprend rien **OU** Pas de diagnostic | ccc | → 2 Critique + 1 CCC si les deux | ☐ |
| **V3_S2_CCC_02** | Isolé émotionnel ET (auto-harm OU danger) | ccc | → 2 CCC purs (ET seulement) | ☐ |
| **V4_F1_CCC_01** (×2) | Vie non tenable ET (pb financier OU pb gestion) | ccc | → 2 CCC purs | ☐ |
| **V4_F3_CCC_01** (×2) | Déclin cognitif ET (confusion OU désorientation) | ccc | → 2 CCC purs | ☐ |

> **Document complet avec les 30 règles détaillées** : voir [audit_ccc_junction_or.md](file:///Users/antonin/.gemini/antigravity/brain/fbf135bb-5302-426a-96d9-3c461fb0ec85/audit_ccc_junction_or.md)

### 15 règles Standard/Critique avec `junction: "OR"`

Ces règles ne sont pas étiquetées CCC mais contiennent aussi du "OU". Même logique : chaque signal indépendant devrait être une règle séparée.

| Règles concernées (résumé) | Recommandation |
|---|---|
| V2_A1_STD_03, V2_A4_STD_01/02, V4_F1_STD_03/05, V4_F2_STD_03/04, V4_F3_STD_01/02, V4_F4_STD_01/02/03/05, V4_F5_STD_04, V4_F6_STD_01/03/05 | Éclater chaque règle OR en règles simples séparées |

---

## Prochaines étapes

1. **L'équipe clinique remplit les ☐** dans ce document
2. **PRAGMA applique** les corrections techniques dans la base de données
3. **Vérification** automatique post-correction : 0 mismatch cible

> 📩 Pour toute question technique, contacter Antonin (PRAGMA).
