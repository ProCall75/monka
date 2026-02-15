# Mini Review UI/UX & Copywriting — Landing Page monka.care

> **Date :** 13 février 2026  
> **URL analysée :** [monka.care](https://www.monka.care)  
> **Objectif :** Audit rapide UI/UX, copywriting et orthographe de la landing page.

---

## 1. Fautes d'orthographe, grammaire & formulations

### ❌ Erreurs identifiées

| # | Section | Texte actuel | Problème | Correction proposée |
|---|---------|-------------|----------|---------------------|
| 1 | **Hero (H1)** | *"L'Application au côté des aidants"* | Expression incorrecte. On dit **"aux côtés de"** (pluriel) pour signifier le soutien/la présence. | **"L'Application aux côtés des aidants"** |
| 2 | **Section "Pourquoi choisir Monka"** | *"Un professionnel de santé sera toujours au besoin pour vous accompagner"* | Formulation bancale. **"au besoin"** = "si nécessaire", mais pas de cette manière. | **"Un professionnel de santé sera toujours disponible pour vous accompagner"** ou **"…sera toujours là en cas de besoin"** |
| 3 | **Section "Pourquoi choisir Monka"** | *"proche fragile?"* | Espace manquant avant le point d'interrogation (typographie française). | **"proche fragile ?"** |
| 4 | **Carte Prédiction** | *"au service du quotidien"* (H3) | Pas de majuscule au titre. Incohérent avec les autres titres de cartes qui commencent par une majuscule. | **"Au service du quotidien"** |
| 5 | **Pack Sérénité** | *"un.e infirmier.e dédié.e"* | Écriture inclusive incohérente. Ailleurs sur la page : `infirmier·e` (point médian). Ici ce sont des points simples. | Uniformiser : **"un·e infirmier·e dédié·e"** |
| 6 | **Pack Sérénité** | *"guidé(e)"* | Autre convention d'écriture inclusive (parenthèses). Incohérent dans la même page que le point médian. | Harmoniser : **"guidé·e"** |
| 7 | **Social proof** | *"d'Aidants utilisent déjà MyMonka"* | "Aidants" avec majuscule injustifiée au milieu d'une phrase. | **"d'aidants utilisent déjà MyMonka"** |
| 8 | **Section B2B** | *"Accélérez l'innovation… grâce à une APPLICATION"* | "APPLICATION" en majuscules criantes au milieu d'un titre. Très agressif visuellement, rompt le ton posé du site. | **"…grâce à une application"** ou le mettre en **gras** plutôt qu'en ALL CAPS. |
| 9 | **Footer** | *"Développé par ballas invest"* | Le nom de l'entreprise n'a pas de majuscule. | **"Développé par Ballas Invest"** |

### ⚠️ Points de vigilance (pas des fautes, mais perfectibles)

| # | Observation |
|---|------------|
| A | **"parcours de soin"** vs **"parcours de soins"** — Le pluriel « soins » est le standard dans le domaine médical (parcours de soins coordonnés). L'expression est utilisée au singulier sur la page. |
| B | **"Aider est notre métier"** (tagline header) — Correct, mais très générique. Ne communique pas la proposition de valeur unique de Monka. |
| C | Le terme **"MyMonka"** apparaît à côté de **"Monka"** sans qu'on sache clairement lequel est la marque et lequel est le nom du produit. Confusion branding. |

---

## 2. Review UI / Design

### ✅ Points positifs

- **Palette de couleurs** cohérente et apaisante (bleus/verts d'eau) — adaptée au secteur santé/bien-être.
- **Imagerie** chaleureuse et humaine (photos de proches, vrais visages). Bon choix émotionnel.
- **Espacement** généreux, bonne aération des blocs, la page respire.
- **Sticky header** fonctionnel avec navigation claire.
- **Badges thématiques** sur le hero (Pédagogie, IA & Santé connectée, etc.) — bonne idée pour affirmer le positionnement.

### ❌ Problèmes identifiés

| # | Problème | Détail |
|---|----------|--------|
| 1 | **Image ADN (carte Prédiction)** | L'image d'hélice d'ADN est hors sujet et "froide/clinique". Elle casse le ton chaleureux et humain du reste de la page. Elle évoque la génétique, pas la prédiction de santé au quotidien. Remplacer par un visuel plus accessible (graphique simplifié, calendrier de suivi, etc.). |
| 2 | **Carte "Prédiction" sans CTA** | Les cartes de gauche et droite ont chacune un bouton ("En savoir plus" / "Explorer"). La carte centrale ("Prédiction") n'a **aucun CTA**, juste des tags flottants. Déséquilibre UX. |
| 3 | **Pricing à 59,99€/mois** | Un prix très élevé pour du B2C santé. Visuellement il n'y a pas assez de justification de la valeur (pas de témoignage à côté, pas de "ROI" expliqué). Le chiffre peut faire fuir avant même de lire les features. |
| 4 | **Cookie banner massif** | Le bandeau de cookies couvre **~40% de la surface du hero** sur desktop. Première impression dégradée. L'utilisateur arrive et voit un mur de texte RGPD au lieu du message principal. |
| 5 | **Pas de témoignages visibles** | Le menu a un lien "Témoignages" mais la landing page elle-même ne contient aucun témoignage / citation d'aidant. La preuve sociale se limite à "3K+ d'aidants" — pas suffisant pour rassurer. |
| 6 | **Trois conventions de CTA différentes** | "Explorer" (bouton plein), "En savoir plus" (bouton outline), "Prendre un rendez-vous stratégique" (bouton pill). Absence de hiérarchie visuelle claire entre les CTA primaires et secondaires. |

---

## 3. Review UX / Parcours utilisateur

| # | Problème | Impact | Recommandation |
|---|----------|--------|----------------|
| 1 | **Pas de CTA visible dans le hero** | Le premier écran montre des boutons App Store / Google Play mais aucun bouton "Découvrir" ou "Essai gratuit". L'utilisateur qui ne veut pas installer tout de suite rebondit. | Ajouter un CTA secondaire **"Voir comment ça marche"** ou **"Essai gratuit"** dans le hero. |
| 2 | **3 onglets pricing (Mensuel/Semestriel/Annuel)** | Trop de choix d'entrée de jeu. Le pricing est dense et les différences de prix sont minimes entre les paliers annuels. | Afficher un seul pricing par défaut (mensuel) avec un toggle pour les autres. |
| 3 | **Section B2B en bas de page B2C** | On passe du Pack Sérénité à "10 millions de Français vivent avec une maladie chronique" puis à une offre B2B ("Accélérez l'innovation"). Mélange des audiences. | Séparer clairement les parcours B2C et B2B (page dédiée B2B ou ancrage clair). |
| 4 | **Aucune section FAQ** | Questions courantes non traitées (remboursement, données de santé, compatibilité, différences entre packs…). | Ajouter une FAQ minimale avant le footer. |
| 5 | **Footer : lien "Monka n'est pas un service d'urgence. En cas d'urgence contactez le 15."** | Le lien pointe vers… la page d'accueil elle-même. Inutile. | Retirer le lien ou le faire pointer vers le SAMU/une ressource d'urgence. |
| 6 | **Pas de parcours d'onboarding clair** | L'utilisateur voit les features, le pricing, mais ne comprend pas le "flow" : je télécharge → je remplis un questionnaire → je reçois un bilan J+1 → je suis accompagné. | Ajouter une section "Comment ça marche" en 3~4 étapes visuelles. |

---

## 4. Review Copywriting

### Ton général
Le ton est **bienveillant, professionnel et rassurant** — c'est le bon choix pour la cible (aidants souvent stressés, démunis). 

### Axes d'amélioration

| # | Sujet | Observation |
|---|-------|-------------|
| 1 | **Clarté de la proposition de valeur** | Le H1 "L'Application aux côtés des aidants" est vague. Il ne dit pas **ce que fait** l'app. Comparez avec : *"Organisez le suivi de santé de votre proche, sans y laisser votre énergie"* — immédiatement compris. |
| 2 | **Trop de jargon tech** | "IA décisionnelle", "algorithme croise les données", "analyse comportementale" — l'aidant moyen ne parle pas cette langue. Reformuler en bénéfices concrets : *"On vous dit quoi faire, quand le faire, et pourquoi"*. |
| 3 | **Manque de storytelling** | La page aligne des features sans raconter une histoire. Un scénario concret (ex: "Marie, 54 ans, s'occupait seule de sa mère…") créerait beaucoup plus d'empathie et de mémorabilité. |
| 4 | **CTA peu convaincants** | "Explorer", "En savoir plus" sont passifs. Préférer des formulations orientées bénéfices : **"Commencer gratuitement"**, **"Alléger ma charge mentale"**, **"Découvrir mon parcours"**. |
| 5 | **Section pricing sans accroche émotionnelle** | Le titre "Choisissez l'accompagnement adapté à votre quotidien" est correct mais plat. Alternative : *"Un soutien concret, dès maintenant"* ou *"Votre sérénité commence ici"*. |

---

## 5. Synthèse

| Catégorie | Note /10 | Commentaire |
|-----------|----------|-------------|
| **Orthographe / Grammaire** | 5/10 | Plusieurs erreurs visibles (au côté, au besoin, incohérence inclusive, casse). Pour un site santé qui doit inspirer confiance, c'est problématique. |
| **UI / Design** | 7/10 | Palette réussie, imagerie humaine, bonne typographie. Mais le cookie banner, l'image ADN et l'incohérence des CTA tirent la note vers le bas. |
| **UX / Parcours** | 5/10 | Pas de CTA clair dans le hero, mélange B2B/B2C, peu de preuve sociale, pas de section FAQ ni "Comment ça marche". Le parcours ne guide pas assez l'utilisateur. |
| **Copywriting** | 6/10 | Ton juste mais manque de clarté, trop de jargon tech, pas de storytelling. Les CTA sont génériques et passifs. |

> **Note globale : 5.75/10** — La landing page a de bonnes fondations visuelles mais souffre d'erreurs de forme et de fond qui nuisent à la crédibilité et à la conversion.

---

## Captures d'écran

````carousel
![Hero Section — Le bandeau cookies couvre ~40% de l'écran](/Users/marwane/.gemini/antigravity/brain/7f2383d8-d14c-45f4-b688-ec78ca798629/hero_section_1770997516550.png)
<!-- slide -->
![Stats & Section "Pourquoi choisir Monka"](/Users/marwane/.gemini/antigravity/brain/7f2383d8-d14c-45f4-b688-ec78ca798629/stats_and_why_section_1770997553512.png)
<!-- slide -->
![Cartes Features — Image ADN incohérente, carte centrale sans CTA](/Users/marwane/.gemini/antigravity/brain/7f2383d8-d14c-45f4-b688-ec78ca798629/demo_section_1770997578315.png)
<!-- slide -->
![Section B2B & Footer](/Users/marwane/.gemini/antigravity/brain/7f2383d8-d14c-45f4-b688-ec78ca798629/footer_and_b2b_section_1770997661785.png)
````
