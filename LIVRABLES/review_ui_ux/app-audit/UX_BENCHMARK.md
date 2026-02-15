# UX Benchmark — Applications de Référence pour Monka

> **Objectif** : Identifier les patterns UX qui font qu'une app devient un compagnon quotidien, pas un outil qu'on oublie.
> **Cible** : Apps de développement personnel, routines, suivi de santé.
> **Méthode** : Analyse comparative + Matrice de décision "Ce qu'on prend / Ce qu'on laisse".

---

## 1. Les 5 Applications de Référence

### 1.1 Streaks (Apple Design Award)

**Catégorie** : Habit Tracker minimaliste
**Style** : Apple-native, ultra-propre, 78 thèmes couleurs

| Critère | Analyse | Score /5 |
|---|---|---|
| **Densité d'info par écran** | Très faible. 1 écran = 6-12 cercles max. Zéro bruit. | ⭐⭐⭐⭐⭐ |
| **Taps pour l'action principale** | 1 tap. Toucher un cercle = tâche faite. | ⭐⭐⭐⭐⭐ |
| **Feedback visuel** | Cercle se remplit + compteur de streak s'incrémente. Satisfaisant. | ⭐⭐⭐⭐ |
| **Ton du texte** | Neutre, factuel. Pas de coaching. | ⭐⭐⭐ |
| **Customisation** | 78 thèmes couleurs, 600+ icônes, widgets. | ⭐⭐⭐⭐⭐ |

**Pattern clé** : La **progression circulaire**. Chaque habitude est un cercle qui se remplit. C'est le feedback le plus universellement compris.
**Leçon UX** : Moins il y a de choses à l'écran, plus chaque chose compte.

---

### 1.2 Fabulous (Google Design Award)

**Catégorie** : Routines basées sur la science comportementale
**Style** : Gradients chauds, cartes vibrantes, storytelling illustré

| Critère | Analyse | Score /5 |
|---|---|---|
| **Densité d'info par écran** | Moyenne. Cartes empilées avec texte + illustration. | ⭐⭐⭐ |
| **Taps pour l'action principale** | 2-3 taps. Naviguer dans un "Journey" puis cocher. | ⭐⭐⭐ |
| **Feedback visuel** | Animations célébratoires, illustrations qui bougent, confettis. | ⭐⭐⭐⭐⭐ |
| **Ton du texte** | Chaleureux, bienveillant, "fairy-godmother". | ⭐⭐⭐⭐⭐ |
| **Customisation** | Faible. Les Journeys sont prédéfinis. | ⭐⭐ |

**Pattern clé** : Le **"Journey"** structuré. L'utilisateur ne choisit pas ses tâches — il suit un parcours prédéfini. C'est exactement notre Micro-Parcours.
**Leçon UX** : Le ton bienveillant change tout. L'app n'est pas un outil, c'est un **compagnon**.

---

### 1.3 Structured (Daily Planner)

**Catégorie** : Planificateur visuel de journée
**Style** : Timeline chronologique propre, thèmes pastels

| Critère | Analyse | Score /5 |
|---|---|---|
| **Densité d'info par écran** | Haute mais lisible. Timeline verticale avec blocs horaires. | ⭐⭐⭐⭐ |
| **Taps pour l'action principale** | 1 tap pour compléter, 2 taps pour éditer. | ⭐⭐⭐⭐ |
| **Feedback visuel** | Bloc se grise quand terminé. Discret mais clair. | ⭐⭐⭐ |
| **Ton du texte** | Neutre, fonctionnel. | ⭐⭐⭐ |
| **Customisation** | Couleurs par tâche, icônes, durées, récurrence. | ⭐⭐⭐⭐ |

**Pattern clé** : La **timeline visuelle**. Voir sa journée comme une bande chronologique avec les tâches positionnées dans le temps. L'utilisateur voit les "trous" disponibles.
**Leçon UX** : La notion de temps rend les tâches concrètes. "Faire ça à 14h" > "Faire ça un jour".

---

### 1.4 Headspace (Meditation)

**Catégorie** : Méditation et bien-être mental
**Style** : Illustrations douces, couleurs apaisantes, animations minimales

| Critère | Analyse | Score /5 |
|---|---|---|
| **Densité d'info par écran** | Très faible. Grands espaces blancs, peu de texte. | ⭐⭐⭐⭐⭐ |
| **Taps pour l'action principale** | 1-2 taps (sélectionner séance + play). | ⭐⭐⭐⭐ |
| **Feedback visuel** | Animations d'illustrations propriétaires (personnages qui méditent). | ⭐⭐⭐⭐⭐ |
| **Ton du texte** | Extrêmement rassurant, doux, jamais directif. | ⭐⭐⭐⭐⭐ |
| **Customisation** | Faible. Contenu guidé. | ⭐⭐ |

**Pattern clé** : Le **ton rassurant**. L'app ne juge jamais. Elle accueille. Le wording est calibré pour réduire l'anxiété, pas l'augmenter.
**Leçon UX** : Pour un public fragile (aidants !), le ton de l'interface est AUSSI IMPORTANT que la fonctionnalité.

---

### 1.5 Pattrn (Habit-to-Goal Tracker)

**Catégorie** : Suivi habitudes connectées à des objectifs
**Style** : Propre, moderne, connexion visuelle habitude → résultat

| Critère | Analyse | Score /5 |
|---|---|---|
| **Densité d'info par écran** | Moyenne. Cartes avec graphiques légers. | ⭐⭐⭐ |
| **Taps pour l'action principale** | 1 tap pour logger, 2 pour voir les stats. | ⭐⭐⭐⭐ |
| **Feedback visuel** | Graphiques qui évoluent, corrélations visuelles. | ⭐⭐⭐⭐ |
| **Ton du texte** | Factuel, analytique mais accessible. | ⭐⭐⭐ |
| **Customisation** | Bonne. L'utilisateur définit ses habitudes et objectifs. | ⭐⭐⭐⭐ |

**Pattern clé** : La **connexion habitude → objectif**. L'utilisateur voit que "faire X" avance "objectif Y". C'est EXACTEMENT notre lien MT → ASR.
**Leçon UX** : Montrer la causalité (ta micro-action avance ton objectif) est le meilleur motivateur.

---

## 2. Grille Comparative

| Critère | Streaks | Fabulous | Structured | Headspace | Pattrn | **Monka (cible)** |
|---|---|---|---|---|---|---|
| Densité info | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐** |
| Taps action principale | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **⭐⭐⭐⭐** |
| Feedback visuel | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| Ton bienveillant | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| Customisation | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | **⭐⭐⭐** |

---

## 3. Matrice de Décision : Ce qu'on prend / Ce qu'on laisse

| App | CE QU'ON PREND | CE QU'ON LAISSE | POURQUOI |
|---|---|---|---|
| **Streaks** | Progression circulaire (ASR Ring), feedback 1-tap | Les 78 thèmes couleurs — trop de customisation | Le ring est universel et notre ASR est parfait pour ça |
| **Fabulous** | Concept de "Journey" = notre MP, Ton bienveillant, Animations célébratoires | L'onboarding trop long, les illustrations propriétaires | Les Journeys SONT nos Micro-Parcours. Le ton = notre wording "Utilisateur" |
| **Structured** | Ordre explicite des tâches avec notion de priorité | La timeline horaire (nos tâches ne sont pas time-bound) | L'idée de montrer l'ordre et la priorité des MT, pas l'heure |
| **Headspace** | Espaces blancs généreux, Zéro jugement dans le ton, Navigation ultra-simple | Le contenu audio/vidéo (pas notre format) | Notre public aidant a besoin d'être rassuré, pas stressé par l'UI |
| **Pattrn** | Lien visuel action → objectif (MT → ASR) | Les graphiques analytiques complexes | Montrer que "cocher cette MT fait avancer ton objectif" est le cœur de Monka |

---

## 4. Liquid Glass in the Wild — Exemples Concrets

### 4.1 Apple iOS 26 (Liquid Glass natif)
- **Tab bars** : Flottantes, translucides, shrink au scroll
- **Widgets** : Semi-transparents, révèlent le fond d'écran
- **Icônes** : Couches de verre superposées, réaction au mouvement
- **Apps natives** : Camera, Photos, Mail — tous revus en liquid glass
- **Apps tierces adoptant Liquid Glass** : GrowPal, Lumy, Sky Guide, Linearity Curve, LTK, CardPointers, Photoroom

### 4.2 Glassmorphism réussi (apps existantes)
| App/Produit | Comment ils l'utilisent | Qualité |
|---|---|---|
| **Spotify Wrapped** | Fonds glacés pour les overlays et cartes statistiques | ⭐⭐⭐⭐ |
| **Tomorrow.io** (Météo) | Cartes météo translucides sur fond coloré | ⭐⭐⭐⭐⭐ |
| **Robinhood Crypto** | Overlays transparents sur graphiques financiers | ⭐⭐⭐⭐ |
| **CRED** (Finance) | Interface entière en glassmorphism | ⭐⭐⭐⭐ |
| **macOS Calendar Widget** | Cellules translucides, fond visible | ⭐⭐⭐⭐⭐ |
| **Windows 11 Fluent** | Panneaux de contrôle en acrylique | ⭐⭐⭐⭐ |

### 4.3 Risques d'accessibilité du Glassmorphism
- **Contraste texte/fond** : Le texte sur glass peut être illisible sur certains fonds. Solution : overlay semi-opaque + texte bold.
- **Performance** : `backdrop-filter: blur()` est coûteux en GPU. Solution : limiter le rayon de blur (max 20px) et le nombre d'éléments glass simultanés.
- **Motion sickness** : Trop de transparence dynamique peut causer des nausées chez certains utilisateurs. Solution : `prefers-reduced-motion` en CSS.

---

## 5. Synthèse : Le "Style Monka" Cible

> **En une phrase** : Monka doit être le Headspace des aidants — aussi rassurant dans le ton, aussi clair dans la navigation — mais avec la profondeur fonctionnelle de Fabulous (Journeys/MP) et le feedback satisfaisant de Streaks (progression circulaire), le tout habillé en Liquid Glass Apple.

### Principes de design extraits

1. **Glass + espace blanc** : L'interface respire. Pas de surcharge.
2. **1 tap = 1 action** : Cocher une MT ne doit jamais prendre plus d'un tap.
3. **Causalité visible** : Cocher une MT 📍 → voir l'ASR bouger IMMÉDIATEMENT.
4. **Ton "Utilisateur"** : Toujours le wording bienveillant du Kernel, jamais la directive IDEC.
5. **Criticité non-anxiogène** : 🔴 n'est pas une alarme, c'est une invitation à agir vite. Le badge indique l'urgence sans stresser.
6. **Zero state positif** : "Tout est à jour" est une victoire, pas un vide.
