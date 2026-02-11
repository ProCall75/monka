# 📋 Rapport d'Audit — Écart 153 vs 150 questions

> **Date** : 09/02/2026  
> **Objet** : Explication de l'écart entre le référentiel état/facteur (153 entrées) et le questionnaire validé (150 questions + 15 triggers)

---

## 1. Constat

| Document | Nombre d'entrées |
|----------|-----------------|
| **Questionnaire validé** (Excel) | **165** = 150 questions + 15 triggers |
| **Référentiel état/facteur** (Excel) | **153** entrées |

**Écart : 153 − 150 = 3 entrées en plus dans le référentiel**

---

## 2. Explication

Le référentiel état/facteur contient **153 entrées** parce qu'il inclut **3 triggers** en plus des 150 questions :

| ID | Libellé | Classé comme... | Classification état/facteur |
|----|---------|------------------|-----------------------------|
| **O2** | *"Où vit la personne aidée aujourd'hui ?"* | Trigger dans le questionnaire | **facteur** (Fragilité du proche) |
| **N31** | *"Quelles sont les autres personnes à charge autour de vous que vous devez aider ?"* | Trigger dans le questionnaire | **facteur** (Fragilité du proche) |
| **O49** | *"Depuis combien de temps l'aidez-vous ?"* | Trigger dans le questionnaire | **aucun** (Physique et Psychologique) |

Les **12 autres triggers** (N3, O35, O36, N1, O64, O46, O14, O1, O63, N26, E71, E72) ne figurent **pas** dans le référentiel. Ce sont des données démographiques et administratives (âge, sexe, code postal, lien de parenté, activité professionnelle, préférences utilisateur) **hors du périmètre état/facteur** — aucun questionnement nécessaire à leur sujet.

---

## 3. Conclusion

**Il n'y a pas d'erreur dans les données.** L'écart s'explique par le fait que 3 triggers (O2, N31, O49) ont un sens clinique suffisant pour mériter une classification état/facteur, même s'ils sont utilisés comme triggers (questions de contexte) dans le questionnaire.

Le total reste cohérent :
- **165 éléments** dans le questionnaire (150 + 15) ✅
- **153 éléments** dans le référentiel (150 + 3 triggers cliniquement pertinents) ✅

---

## 4. Questions à trancher

Pour stabiliser définitivement la base de données, il serait utile de confirmer les points suivants :

### Question 1 — O2, N31, O49 : triggers ou questions ?

Ces 3 éléments sont classés comme **triggers** dans le questionnaire mais figurent dans le **référentiel état/facteur**. Deux options :

- **Option A** : Ce sont bien des triggers → leur classification état/facteur dans le référentiel est une information supplémentaire, pas une erreur. On garde 150 + 15.
- **Option B** : Ce sont en réalité des questions → il faut les reclasser comme questions dans le questionnaire (on aurait alors 153 + 12 = 165).

> 💡 **Recommandation** : Option A semble la plus logique. O2 ("Où vit la personne aidée"), N31 ("Personnes à charge") et O49 ("Depuis combien de temps") sont bien des questions de contexte/profil, mais leur pertinence clinique justifie qu'elles aient une classification état/facteur.

### Question 2 — O49 classé "aucun"

O49 est le seul trigger présent dans le référentiel avec une classification **"aucun"** au lieu de "état" ou "facteur". Est-ce intentionnel ? Faut-il lui attribuer un type ?

### Question 3 — Les 4 questions "facteur et état"

4 questions dans le référentiel sont classées à la fois **"facteur et état"**. Est-ce voulu ? Si oui, comment les traiter dans les rapports (compter dans les deux catégories ou créer une catégorie mixte) ?

---

*Document généré le 09/02/2026 — Source : Questionnaire validé.xlsx + Référence Questionnaire.xlsx*
