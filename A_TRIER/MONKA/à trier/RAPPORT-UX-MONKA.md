# 🔍 Rapport UX — MyMonka & monka.care

**Date** : 4 février 2026  
**Auditeur** : Pragma  
**Périmètre** : Application mobile MyMonka + Site web monka.care

---

## 📊 Synthèse Exécutive

| Catégorie | Critiques 🔴 | Majeurs 🟠 | Mineurs 🟡 |
|-----------|-------------|-----------|-----------|
| **Application** | 2 | 2 | 2 |
| **Site Web** | 2 | 2 | 2 |
| **Total** | **4** | **4** | **4** |

---

# 📱 PARTIE 1 — Application Mobile

---

## 🔴 Problème Critique #1 — Bouton "Valider" grisé mais cliquable

![Bouton Valider](screenshots/screen-5-valider.png)

### Ce qu'on voit
- Écran "Quel acteur avez-vous contacté ?"
- **Aucun médecin sélectionné**
- Bouton "Valider" en gris... **mais présent et cliquable**

### Pourquoi c'est grave
> 💬 *"Le bouton est gris, donc je peux pas cliquer... ah si en fait ? Ça marche ? Mais j'ai rien choisi !"*

L'utilisateur peut valider une étape **sans avoir fait le choix requis**. Workflow cassé.

### Recommandation
- Masquer le bouton OU le désactiver complètement (`disabled`) jusqu'à sélection

---

## 🔴 Problème Critique #2 — Noms incohérents "Dkske" / "Dizenr u"

![Accueil avec nom bizarre](screenshots/screen-4-accueil.png)

### Ce qu'on voit
- "Bonjour, **Dizenr u**" — prénom corrompu
- "Pour **Dkske** c'est" — nom du proche illisible

### Pourquoi c'est grave
> 💬 *"C'est qui Dkske ? C'est mon proche ? Pourquoi ce nom étrange ?"*

Bug de récupération des données utilisateur. Détruit la **crédibilité** d'une app santé.

### Recommandation
- Vérifier le parsing des prénoms à l'inscription
- Fallback sur "votre proche" si données corrompues

---

## 🟠 Problème Majeur #1 — Contenu dupliqué "Pour moi" / "Pour mon proche"

![Ressources dupliquées](screenshots/screen-1-ressources.png)

### Ce qu'on voit
- Section "À la une pour moi"
- Section "Pour mon proche"
- **Mêmes images, même contenu** dans les deux

### Pourquoi c'est problématique
> 💬 *"Euh... c'est la même chose en haut et en bas ? Je comprends pas la différence."*

L'utilisateur ne comprend pas la valeur ajoutée de la segmentation.

### Recommandation
- Personnaliser réellement le contenu OU fusionner les sections

---

## 🟠 Problème Majeur #2 — Hiérarchie tâches vs conseils floue

![Démarches confuses](screenshots/screen-3-demarches.png)

### Ce qu'on voit
- "Bilan infirmier.e" avec **"Je prends rendez-vous maintenant"** → Action claire ✅
- "Faites vous aider" avec **"Je commence"** → C'est quoi ? 🤔

### Pourquoi c'est problématique
> 💬 *"C'est une tâche à faire obligatoirement ou juste un conseil ? Je sais pas quoi prioriser."*

Pas de distinction visuelle entre actions et conseils.

### Recommandation
- Badge "Tâche" vs "Conseil"
- Couleurs différentes pour les deux types

---

## 🟡 Problème Mineur #1 — Texte tronqué illisible

![Services tronqués](screenshots/screen-2-services.png)

### Ce qu'on voit
- "Médecin traitant (ou g..." → Tronqué
- "Pour aller plus loin" → Cartes coupées

### Impact
Frustration légère, l'utilisateur doit deviner le contenu.

### Recommandation
- Agrandir la zone de texte ou réduire la taille de police

---

## 🟡 Problème Mineur #2 — "Bravo !" mal placé

![Bravo mal placé](screenshots/screen-5-valider.png)

### Ce qu'on voit
- "Bravo !" affiché **avant** que l'utilisateur ait fait quoi que ce soit

### Impact
> 💬 *"Bravo pour quoi ? J'ai rien fait encore..."*

Message de félicitation prématuré.

---

# 🌐 PARTIE 2 — Site Web (monka.care)

---

## 🔴 Problème Critique #1 — Contraste texte illisible

### Ce qu'on voit
- Texte **gris clair sur fond blanc/gris**
- Sur presque toutes les pages (À propos, Blog, Fonctionnalités)

### Pourquoi c'est grave
> 💬 *"Je vois rien, faut que je plisse les yeux..."*

Pour une cible d'**aidants souvent âgés ou stressés**, le contraste insuffisant rend la lecture pénible.

### Recommandation
- Passer tous les textes gris en `#333333` minimum
- Respecter les ratios WCAG 2.1 AA (4.5:1)

---

## 🔴 Problème Critique #2 — Dates du blog en 2025

### Ce qu'on voit
- Articles datés **"juillet 2025"**

### Pourquoi c'est grave
> 💬 *"On est en février 2026... Ces articles datent du futur ?!"*

Impression de **contenu démo/fake** non publié réellement.

### Recommandation
- Corriger les dates avant publication
- Vérifier le système de gestion des dates

---

## 🟠 Problème Majeur #1 — Espace manquant

### Ce qu'on voit
Page Fonctionnalités :
> "mieux vivre l'aide à un proche.**Notre** application"

### Impact
Faute de rédaction = impression de manque de sérieux pour un service médical.

### Recommandation
- Relecture complète du site
- Ajouter l'espace après le point

---

## 🟠 Problème Majeur #2 — Pluriel incohérent

### Ce qu'on voit
> "Une application pensée pour faciliter la vie **des aidants** et de **leur proche**"

### Impact
Si on parle de plusieurs aidants, logiquement → **"leurs proches"**

### Recommandation
- Harmoniser le pluriel
- Version correcte : "des aidants et de **leurs proches**"

---

## 🟡 Problèmes Mineurs

| Problème | Localisation | Correction |
|----------|-------------|------------|
| "au côté" vs "aux côtés" | Homepage | "aux côtés" (pluriel) est l'expression consacrée |
| Animations scroll lentes | Partout | Éléments restent en opacité réduite trop longtemps |

---

# ✅ Prochaines Étapes

1. **Priorité 1** : Corriger les bugs de noms ("Dkske", "Dizenr u")
2. **Priorité 2** : Désactiver le bouton "Valider" quand pas de sélection
3. **Priorité 3** : Augmenter le contraste du site web
4. **Priorité 4** : Corriger les dates et coquilles

---

> **Rapport réalisé par Pragma** — [pragma.consulting](https://pragma.consulting)
