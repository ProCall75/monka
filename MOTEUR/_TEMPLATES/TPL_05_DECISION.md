# 📌 TPL_05 — Decision Record

> **Usage** : À chaque décision importante (modification de seuil, suppression/ajout de règle, changement de wording, correction de data...)
> **Objectif** : Tracer POURQUOI on a pris cette décision — le contexte, les options, le choix, l'impact
> **Rempli par** : Celui qui prend la décision (Antonin et/ou Dr. Monka)

---

## D-[NNN] — [Titre court de la décision]

> **Sprint** : [N] — [Nom]
> **Date** : ../../2026
> **Catégorie** : 🎯 Scoring / ⚙️ Règle / 💬 Wording / 📊 Data / 🏗️ Architecture / 🩺 Clinique
> **Auteur** : Antonin / Dr. Monka / Les deux
> **Statut** : ✅ Appliquée / 🔲 En attente / ❌ Annulée

---

### Contexte

> Quelle situation a provoqué cette décision ? Qu'est-ce qui ne fonctionnait pas ou qu'est-ce qu'on voulait améliorer ?

[Décrire le contexte en 2-5 phrases]

---

### Options considérées

| # | Option | Avantages | Inconvénients |
|---|---|---|---|
| A | | | |
| B | | | |
| C | _(Ne rien faire)_ | Pas de risque de régression | Le problème persiste |

---

### Décision prise

> **Option retenue** : [A/B/C]
>
> **Pourquoi** : [Justification en 1-3 phrases]

---

### Impact

| Ce qui change | Avant | Après |
|---|---|---|
| [Table/champ/valeur] | | |

**Tables Supabase modifiées** : [lister]
**Fichiers code modifiés** : [lister ou "aucun"]
**Effet sur le scoring** : [oui/non — détail si oui]
**Effet sur l'activation des MPs** : [oui/non — détail si oui]

---

### Validation

| Validateur | Type | Statut |
|---|---|---|
| Antonin | Technique — la modification est correcte | 🔲 |
| Dr. Monka | Clinique — la décision est pertinente | 🔲 |

---

### Réversibilité

| Question | Réponse |
|---|---|
| Réversible ? | ✅ Oui / ❌ Non |
| Comment revenir en arrière ? | [Procédure si applicable] |
| Délai avant que ce soit irréversible | [ex: "Tant qu'on n'a pas modifié la base"] |
