# 🗺️ Roadmap : Reste à faire

> Chaque point décrit le **problème constaté** puis la **solution attendue**.
> Fichiers concernés : `app-audit/app/page.tsx` (review), `app-audit/app/demo/page.tsx` (démo), `app-audit/app/parcours/page.tsx` (parcours).
>
> Dernière mise à jour : **15 fév 2026 — 23h**

---

## 🎨 1. Refonte page Review (`page.tsx`)

### 1.1 Nettoyage titres
- **Problème** : Les titres actuels sont trop "slide deck" — "Le Paradoxe", "Acte 1", "Micro-Parcours". Le client (CEO non-tech) ne comprend pas ces références.
- **Action** : Remplacer par des titres descriptifs simples. Ex : "Le Paradoxe" → "Constat" ou "Ce qu'on a observé". Supprimer toute numérotation "Acte 1/2/3".

### 1.2 Section "Niveau de criticité" (Double Wording)
- **Problème** : La section qui montre le double wording (version IDEC vs version Utilisateur) est illisible. Le texte est trop petit, les 2 colonnes sont serrées, ça fait "AI slop" (généré sans soin). On ne voit pas bien les 4 niveaux du Kernel.
- **Action** : Redesigner cette section. Chaque niveau (🔴 Critique ≤7j, 🟠 CCC ≤30j, 🟢 Standard ≤90j, ⚪ Prévention) doit être clairement visible avec un code couleur fort. Le double wording (IDEC/Utilisateur) doit être lisible en 2 colonnes bien espacées ou en tabs.

### 1.3 Use Cases (les 5 vulnérabilités)
- **Problème** : La liste des 5 vulnérabilités est affichée en liste verticale avec des gros emojis colorés. C'est moche, amateur, "AI slop".
- **Action** : Remplacer par une **grille 3x2** (3 colonnes, 2 lignes) propre et pro. Cards sobres, icônes monochromes ou un cercle de couleur subtil. Pas d'emoji. Inspiration : cards SaaS médicales type Headspace/Calm.

### 1.4 Suppression "En résumé : 50 critiques identifiées"
- **Problème** : Ce bloc résumé en bas de la review est inutile et redondant. Il liste des stats qui n'apportent rien.
- **Action** : Supprimer entièrement ce bloc.

### 1.5 Suppression "Ce que l'utilisatrice dit vraiment"
- **Problème** : Section de verbatims bruts mal contextualisés. On a déjà les verbatims dans le parcours.
- **Action** : Supprimer entièrement cette section de `page.tsx`.

### 1.6 Pédagogie UI/UX/Copywriting
- **Problème** : On critique l'UI, l'UX et le Copywriting sans jamais expliquer au client ce que c'est. Le CEO de Monka n'est pas designer, il ne sait pas la différence.
- **Action** : Ajouter un bloc pédagogique EN HAUT de la review (avant les critiques) qui définit :
  - **UI** = L'apparence visuelle (couleurs, typo, espacement). Impact : première impression, confiance.
  - **UX** = Le parcours utilisateur (navigation, friction, fluidité). Impact : rétention, conversion.
  - **Copywriting** = Les mots utilisés (ton, clarté, jargon). Impact : compréhension, engagement.
  - Chaque définition doit inclure 1 phrase d'impact business.

### 1.7 Copywriting Avant/Après
- **Problème** : Les exemples actuels de copywriting avant/après sont faibles. On ne voit pas bien le contraste entre le ton actuel (médical, froid) et le ton proposé (humain, chaleureux).
- **Action** : Chercher 3-4 vrais exemples tirés de l'app Monka actuelle (screenshots réels). Pour chaque exemple : colonne "Actuellement" (texte froid/jargon) vs "Proposé" (texte humain). Sources : `SYNTHESE_CRITIQUES_PAR_THEME.md` section Copywriting.

---

## 🌳 2. Arborescence & Audit Démo

### 2.1 Audit des écrans codés
- **Problème** : On ne sait plus exactement quels écrans existent dans la démo (`demo/page.tsx`). Il faut un inventaire.
- **Action** : Scanner `demo/page.tsx` et lister tous les écrans/composants fonctionnels : Onboarding (4 slides), Dashboard, Programme (Vulnérabilité → Recos → Tâches), Calendrier, Communauté (Annuaire Pro), Ressources (Articles, Guides, Annuaire), Profil. Compter le nombre d'écrans total.

### 2.2 Visuel Arbre
- **Problème** : Pas de vue d'ensemble de la structure de l'app démo.
- **Action** : Créer un arbre visuel (ASCII ou Mermaid) montrant : App → Tabs (Accueil, Programme, Calendrier, Communauté, Ressources, Profil) → Sous-écrans de chaque tab. L'intégrer dans la page review ou dans un doc séparé.

---

## 📱 3. UX Appli Démo (`demo/page.tsx`)

### 3.1 Navbar
- **Problème** : La navbar du bas est peut-être un peu trop grosse et les transitions ne sont pas smooth.
- **Action** : Vérifier la taille (comparer avec les standards iOS : 49pt). Ajouter une transition CSS smooth sur le changement d'onglet actif.

### 3.2 Routing Guide → Annuaire Pro
- **Problème** : Dans un guide (ex: "Trouver un psychologue"), le bouton "📍 Localiser" d'un contact redirige vers l'onglet Ressources (articles). C'est incohérent — ça devrait aller vers l'annuaire professionnel dans Communauté, filtré sur la bonne catégorie (santé, social, etc.).
- **Action** : Le bouton contact doit appeler `onNavigateToProCategory(contactName)` qui résout la catégorie (santé/social/admin/domicile) et switch vers l'onglet Communauté avec le bon filtre. **Note : Ce fix est en cours** (le user a commencé à l'implémenter manuellement).

### 3.3 Timeline "Votre Parcours"
- **Problème** : Le composant timeline dans le Dashboard est minimaliste — juste 2 dots sur une ligne horizontale. On ne comprend pas ce que ça représente (progression vers quoi ? quelles étapes ?).
- **Action** : Refaire un vrai composant timeline vertical ou horizontal avec :
  - Étapes claires (Questionnaire → Analyse → Plan d'action → Suivi)
  - État actuel surligné
  - Pourcentage ou indication de progression
  - Inspiration : Stripe onboarding progress, Duolingo skill tree

### 3.4 Dashboard comme porte d'entrée
- **Problème** : Le dashboard est juste des widgets empilés (score, graphe, tâches). Ce n'est pas un vrai hub — l'aidant ne sait pas par quoi commencer.
- **Action** : Repenser le dashboard comme un **hub d'actions** : "Votre prochaine action" en gros, puis les sections secondaires. L'aidant doit voir en 2 secondes quoi faire maintenant.

### 3.5 Suppressions Dashboard
- **Problème** : Le graphe "Évolution 7 jours" n'a pas de sens (on n'a pas de données hebdo réelles). La "Note du cercle" dans l'agenda est impossible à calculer en vrai.
- **Action** : Supprimer le graphe "Évolution 7 jours". Supprimer la "Note du cercle" de l'agenda. Garder l'agenda partagé car utile pour la famille.

### 3.6 Planification de tâche (Nouvelle Feature)
- **Problème** : Les micro-tâches sont juste des checkboxes. L'aidant ne peut pas les planifier dans le temps (ex: "J'appellerai la CPAM mardi").
- **Action** : Ajouter un bouton **"📅 Planifier"** sur chaque micro-tâche. Au clic → date picker simple (pas de drag & drop, c'est trop complexe pour des 50-60 ans sur mobile). La tâche planifiée apparaît dans l'onglet Calendrier à la date choisie.
- **Recherche UX** : Le consensus est que pour mobile + public senior, un **bouton → date picker** est meilleur que le drag & drop (plus précis, plus accessible, moins de friction avec le scroll). Référence : Smart Interface Design Patterns (Vitaly Friedman).

### 3.7 Badges catégories ("AI Slop")
- **Problème** : Les badges "Vie sociale", "Démarches administratives", etc. ont des couleurs vives et des formes trop "générées par IA". Ça fait amateur et peu crédible pour un produit médical.
- **Action** : Redesigner les badges en style **minimal SaaS médical** :
  - Fond : gris clair ou blanc avec bordure subtile
  - Texte : gris foncé, sans émoji
  - Accent : un petit point ou trait de couleur à gauche (type Notion tags)
  - Référence : badges de Linear, Notion, ou Stripe Dashboard

---

## 🚶 4. Onboarding Interactif (Tour du Propriétaire)

- **Problème** : Après les 4 slides d'intro, l'aidant (50-60 ans) arrive sur le dashboard sans comprendre où cliquer. Pas de "tour guidé" de l'app.
- **Action** : Implémenter un product tour interactif APRÈS l'onboarding. Stripe-style : highlight d'un élément à la fois + tooltip explicatif + bouton "Suivant".
- **Librairie recommandée** : **`driver.js`** — léger (82 kB, 0 dépendances), MIT, fonctionne bien en React. Alternative : `react-joyride` (plus lourd mais plus customisable).
- **Flow suggéré** (5-6 étapes max) :
  1. "Voici votre tableau de bord" (highlight Dashboard)
  2. "Vos actions prioritaires" (highlight section tâches)
  3. "Votre programme personnalisé" (highlight onglet Programme)
  4. "Trouvez de l'aide près de chez vous" (highlight onglet Communauté)
  5. "Des ressources pour vous" (highlight onglet Ressources)
  6. "C'est parti !" (ferme le tour)
- **Wording** : Pédagogique, rassurant, tutoiement. Ex : "On a préparé un plan d'action rien que pour vous. Commençons par ici."

---

## 🌙 5. Mode Sombre (Dark Mode)

- **Problème** : Le toggle dark mode existe dans les Réglages mais le rendu est cassé — beaucoup de composants restent en fond blanc, textes illisibles sur fond sombre.
- **Action** : Pass global sur TOUS les composants :
  - Fonds : `bg-white` → `bg-white dark:bg-[#1A1A2E]` (ou variable CSS)
  - Textes : `text-[#1A1A2E]` → `text-[#1A1A2E] dark:text-white`
  - Bordures, inputs, cards, modals, tooltips
  - Illustrations/images : vérifier le contraste, ajouter un filtre si nécessaire

---

## 📅 Ordre de bataille
1. ✅ ~~**Arborescence** (audit démo → vision d'ensemble)~~
2. ✅ ~~**Review page** (titres, suppressions, pédagogie, criticité, use cases)~~
3. ✅ ~~**Dashboard & Routing** (hub, timeline, suppressions, guide→pro)~~
4. 🟡 **Parcours** (verbatims reconstitués — screenshots manquants à prendre)
5. 🟡 **Design System** (badges, copywriting avant/après)
6. ⚪ **Onboarding Tour** (`driver.js`)
7. ⚪ **Planification Tâches** (bouton + date picker)
8. ⚪ **Dark Mode** (pass global)

---

## 📱 6. Parcours Utilisateur (`parcours/page.tsx`)

### 6.1 ✅ Verbatims remappés (22 écrans × 50 critiques)
- Cross-référence complète screenshots/critiques
- 22/22 écrans ont un verbatim ou annotation justifiée
- Labels onglets simplifiés (« Parcours Onboarding / Dashboard / Profil »)

### 6.2 🟡 Screenshots manquants à reprendre
- **Problème** : Critiques bloquantes (C1, C2, C5, C9, C11, U4, U15, U16) sans screenshot.
- **Action** : Capturer dans l'app réelle : Q1 (souffrante), Q2 (activité), Q12 (illisible), code postal, pricing, "C'est fait".

### 6.3 ⚪ Reconstituer parcours complets
- **Problème** : Parcours incomplets sans les screenshots manquants.
- **Action** : Intercaler les nouveaux screenshots dans `JOURNEY_X_SCREENS`.

