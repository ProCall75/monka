# Critiques Monka — Référence pour Audit Visuel

Chaque critique est enrichie d'**indices visuels** : ce qu'on devrait voir sur un screenshot si la critique s'applique.

---

## 🔴 BLOQUANTS

### C01 — Zéro profondeur — tout est à plat
- **Description** : Tous les contenus (tâches, recos, scores, alertes) sont sur une même page sans hiérarchie
- **Indices visuels** :
  - Dashboard avec énormément de cartes/sections empilées verticalement
  - Pas de notion de "rentrer dans" un sujet — tout est au même niveau
  - Carousels horizontaux qui tentent de compenser le manque de profondeur
  - Absence de sous-pages ou de navigation imbriquée
- **Sévérité** : 🔴 BLOQUANT

### C02 — Recherche d'acteurs HS
- **Description** : Géolocalisation ne fonctionne QUE pour les médecins (CCAS, CAF, CLIC = 0 résultat)
- **Indices visuels** :
  - Écran de recherche avec résultats vides pour des recherches non-médecin
  - Messages "aucun résultat" ou listes vides
  - Si on voit des résultats : vérifier si ce sont uniquement des médecins
- **Sévérité** : 🔴 BLOQUANT

### C03 — Polypathologie ignorée
- **Description** : Question N3 du questionnaire est à choix unique (devrait être multiple)
- **Indices visuels** :
  - Écran de questionnaire avec des radio buttons (choix unique) au lieu de checkboxes
  - Question sur les pathologies/problèmes de santé avec un seul choix possible
- **Sévérité** : 🔴 BLOQUANT

---

## 🟠 MAJEURS

### C04 — Workflow cassé (bouton Valider)
- **Description** : Bouton "Valider" grisé à l'étape contact mais cliquable quand même
- **Indices visuels** :
  - Bouton avec style "disabled" (grisé, opacité réduite) mais absence de `pointer-events: none`
  - Écran d'étape de contact/mise en relation avec un CTA en bas
- **Sévérité** : 🟠 MAJEUR

### C05 — Blog inexploitable sur mobile
- **Description** : Problèmes d'affichage majeurs du blog sur mobile
- **Indices visuels** :
  - Texte tronqué ou débordant
  - Images plus larges que le viewport
  - Mise en page cassée
- **Sévérité** : 🟠 MAJEUR

### C06 — Zéro personnalisation post-onboarding
- **Description** : Prénom de l'aidé saisi à l'onboarding mais jamais utilisé dans l'app
- **Indices visuels** :
  - Textes avec "l'aidé", "votre proche" au lieu d'un prénom
  - « Réservez un RDV pour l'aidé » au lieu de « Réservez un RDV pour Marie »
  - Formulations génériques partout
- **Sévérité** : 🟠 MAJEUR

### C07 — Aucune pédagogie / contextualisation
- **Description** : Fonctionnalités présentées sans explication de leur raison d'être
- **Indices visuels** :
  - Sections de l'app sans texte d'introduction
  - Termes métier (microparcours, mise en relation, bilan) sans définition
  - Absence de "pourquoi" ou de contexte explicatif
- **Sévérité** : 🟠 MAJEUR

### C08 — Absence d'onboarding tutoriel
- **Description** : Aucun guidage à la première connexion post-inscription
- **Indices visuels** :
  - Arrivée directe sur le dashboard après inscription sans tour guidé
  - Absence de tooltips, de bulles d'aide, d'écrans d'introduction
  - Pas de step-by-step pour découvrir l'app
- **Sévérité** : 🟠 MAJEUR

### C09 — Contacts non segmentés par onglet
- **Description** : Les 3 onglets (Santé, Démarches, Services) affichent la même liste d'interlocuteurs
- **Indices visuels** :
  - Menu contacts avec tabs en haut (Santé, Démarches, Services)
  - La même liste d'items visible sous chaque onglet
  - Liste longue et non filtrée
- **Sévérité** : 🟠 MAJEUR

---

## 🟡 MINEURS

### C10 — Ressources dupliquées
- **Description** : Contenu identique dans "Pour moi" et "Pour mon proche"
- **Indices visuels** :
  - Deux onglets/sections de ressources avec un contenu visuellement identique
- **Sévérité** : 🟡 MINEUR

### C11 — Performance images
- **Description** : Chargement des images ressources très lent
- **Indices visuels** :
  - Images non chargées (placeholder vides, spinners)
  - Zones grises ou blanches là où des images devraient être
- **Sévérité** : 🟡 MINEUR

### C12 — UX Confuse
- **Description** : Hiérarchie visuelle floue (Tâches vs Conseils indiscernables)
- **Indices visuels** :
  - Cartes de style similaire pour des contenus de nature différente
  - Impossible de distinguer visuellement une tâche d'un conseil
- **Sévérité** : 🟡 MINEUR

### C13 — Wording & Typos
- **Description** : Mélange impératif/passif, fautes d'orthographe
- **Indices visuels** :
  - "Dîtes-nous" (faute : accent sur le i)
  - "quel age" (faute : accent grave manquant)
  - Mélange "vous/votre proche" et "mon proche/mon aidé" dans le même écran
  - Tutoiement et vouvoiement incohérents
- **Sévérité** : 🟡 MINEUR
