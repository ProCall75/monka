# 🎤 Speech — Review UI/UX Monka
## Mardi 3 février 2026 · Pragma → Monka · ~15 min

---

## 📌 Sommaire — Points à aborder

- Le moteur Monka : ce qu'il sait faire (5 vulnérabilités, 24 parcours, 103 recos, 299 tâches)
- Le test utilisateur : Amal, aidante, 45 min de test
- Les 6 critiques principales (navigation, paywall, personnalisation, contextualisation, uniformité, coquilles)
- Le parcours visuel d'Amal (JourneyFlow plein écran)
- Récap des **49 critiques par thème** (Copywriting, UX, UI, Jargon médical, Valeur, Pricing, Données)
- Le paradoxe : le moteur détecte, l'interface n'affiche pas
- Le mapping 3 colonnes : Élément moteur → Ancien composant → Notre composant
- Storytelling : inspiration des grandes apps de routine (Headspace, Noom, Calm, MyFitnessPal)
- Le ton de la marque : passer du jargon clinique au langage humain
- Checklist factuelle : les **15 briques** que l'app doit contenir pour être complète
- Transition flashcode → découverte live de l'app sur téléphone
- Conclusion : « On ne change pas le moteur, on ouvre la fenêtre »

---

> **Format :** Ce document structure le déroulé oral de la présentation.
> Chaque section = un moment de la review. Les verbatims entre guillemets sont ceux d'Amal.
> **Support visuel :** l'app-audit tourne en live sur `localhost:3000` (Le Constat → Le Mapping → La Preuve)

---

## 🎬 INTRO — Le cadre (1 min)

**[Ton : posé, factuel]**

> « Merci de nous recevoir.
> Aujourd'hui on ne va pas vous montrer un PowerPoint.
> On va vous montrer **votre moteur en action** — à travers les yeux d'une vraie aidante.
>
> Votre moteur est remarquable. 5 vulnérabilités, 24 micro-parcours, 103 recommandations, 299 micro-tâches. Très peu de startups en santé ont cette profondeur clinique.
>
> Mais aujourd'hui, cette richesse est **invisible** pour l'aidant. Et c'est exactement ce qu'on va démontrer. »

---

## 📋 ACTE 1 — Le Constat (5 min)

### 1.1 Le parcours d'Amal

**[Ton : storytelling, empathique]**

> « On a fait tester votre app par Amal. 57 ans. Elle aide sa mère Fatima, 78 ans, handicap physique. Son père a une BPCO. Elle est exactement votre cible.
>
> Elle a passé **30 minutes** sur le questionnaire. Elle a rencontré des incohérences de formulation, un bouton retour qui a tout effacé, un langage qu'elle ne comprenait pas. Et à la fin de ces 30 minutes…
>
> Un paywall. Pas de profil. Pas de valeur. Pas de personnalisation visible.
>
> Son verbatim exact : *« M'aider, c'est me soulager d'une tâche ou d'une angoisse. Là, on me donne encore plus de tâches alors que je suis déjà débordée. »* »

**[Scroller dans le review app → section critiques]**

Parcourir les **6 critiques principales** en live :

1. **Navigation à un seul niveau** (bloquant) — « Les 4 onglets se ressemblent. L'aidant ne sait pas où cliquer. »
2. **Séquence interrompue** (bloquant) — « 30 min de questionnaire puis paywall. Aucune valeur démontrée. »
3. **Personnalisation absente** (majeur) — « 'Pour Francine' apparaît, mais les cards restent génériques. »
4. **Pas de pourquoi** (majeur) — « On dit 'faites cette tâche' sans jamais expliquer pourquoi. »
5. **Uniformité des onglets** (majeur) — « Santé, Démarches, Services : même structure, seule la couleur change. »
6. **Coquilles et incohérences** (mineur) — « 'Modifer', 'anxieuxe', 'Quel age'… ça ne fait pas sérieux. »

---

### 1.2 Le parcours visuel (JourneyFlow)

**[Ton : démonstratif]**

> « On a reconstitué le parcours complet d'Amal en flow. Chaque écran, chaque friction, chaque moment où elle décroche. »

**[Ouvrir le JourneyFlow en plein écran → scroller]**

- Montrer les annotations : « Perdue », « Friction », « Rejet », « Abandon »
- Montrer les verbatims sur les écrans clés

---

### 1.3 ⚡ Récap par thème — Les 49 critiques

**[Ton : factuel, percutant, rapide]**

> « En tout, on a identifié **49 critiques** sur 7 thèmes. Voici le résumé. »

| Thème | Total | 🔴 Bloquants | 🟠 Majeurs | 🟡 Mineurs |
|-------|-------|-------------|-----------|-----------|
| **Copywriting & Tonalité** | 12 | 1 | 8 | 3 |
| **UX — Parcours & Architecture** | 17 | 8 | 7 | 2 |
| **UI — Interface Visuelle** | 3 | 0 | 3 | 0 |
| **Langage Médical & Jargon** | 5 | 3 | 0 | 2 |
| **Proposition de Valeur** | 7 | 6 | 1 | 0 |
| **Conversion & Pricing** | 4 | 1 | 3 | 0 |
| **Données collectées** | 1 | 0 | 1 | 0 |
| **TOTAL** | **49** | **19** | **23** | **7** |

> « **19 bloquants.** La majorité concerne le parcours utilisateur et la proposition de valeur. Ce ne sont pas des bugs — c'est un problème de **traduction**. Le moteur parle en score V1, en CARSAT, en micro-tâche type STRUC. L'aidant, lui, veut savoir : *est-ce que ma mère va bien ?* »

---

### 1.4 Le Paradoxe

**[Ton : transition, tension dramatique]**

> « Et c'est ça le paradoxe. »

| Ce que le moteur sait faire | Ce que l'aidant voit |
|-----------------------------|---------------------|
| 5 vulnérabilités scorées | Une liste sans hiérarchie |
| Urgence ≤ 7 jours détectée | Pas de signal visuel |
| 24 micro-parcours mesurables | « Mes aides » sans contexte |
| 299 micro-tâches catégorisées | Actions non surfacées |

> « Votre moteur détecte une urgence à 7 jours. L'interface n'affiche **aucun** signal visuel. C'est comme avoir un radar météo ultra-précis… mais pas de fenêtre pour regarder dehors. »

---

## 🗺️ ACTE 2 — Le Mapping (3 min)

**[Ton : constructif, inspiré]**

> « Maintenant qu'on a vu le problème, voici **notre réponse**. On ne part pas de zéro — on part de **votre moteur**. Chaque concept du moteur a un composant et un mot. »

**[Scroller vers le mapping 3 colonnes]**

> « Pour construire cette interface, on s'est inspirés de l'ergonomie des plus grandes apps de routine et de quotidien : Headspace pour la progression, Noom pour la personnalisation, MyFitnessPal pour le suivi des tâches, Calm pour le ton bienveillant. Ces apps ont un point commun : elles transforment des données complexes en gestes simples. C'est exactement ce qu'on fait ici. »

Montrer les 4 lignes du mapping :

1. **Vulnérabilité** → chez eux : `MProgressBar` identiques → chez nous : `ThemeSelector` + `HeroCard` avec domaine coloré
2. **Micro-Parcours** → chez eux : `MProgressDots` sans contexte → chez nous : `ProgressCard` + `ScoreRing` avec objectif
3. **Recommandation** → chez eux : `MOptionPill` en liste plate → chez nous : `TaskCard` avec badges urgence + domaine + « pourquoi »
4. **Micro-Tâche** → chez eux : `MButton` non cochable → chez nous : `MicroTaskItem` cochable et traçable

> « On ne change pas le moteur. On change la **fenêtre**. Chaque donnée clinique est maintenant traduite en interface que l'aidant comprend et utilise. »

**[Montrer le Ton de la Marque]**

| Avant (moteur) | Après (aidant) |
|----------------|---------------|
| Score de vulnérabilité | Vos thèmes de vie |
| Recommandation #R1.2 | Retrouver du répit |
| Micro-tâche type STRUC | Action prioritaire |
| Priorité Niveau 1 | À faire cette semaine |
| CCC activée | Important ce mois-ci |

---

## ✅ ACTE 2bis — Ce que l'app doit contenir (3 min)

**[Ton : factuel, exhaustif, professionnel]**

> « Factuellement, voici tout ce qu'une app d'accompagnement aidant doit contenir pour être complète — et pourquoi chaque élément est là. »

### Les briques indispensables

| # | Brique | Pourquoi c'est nécessaire | Source |
|---|--------|--------------------------|--------|
| 1 | **Onboarding intelligent** | Un questionnaire qui s'adapte, se raccourcit, filtre dynamiquement. 30 min c'est un abandon garanti. | Amal : *« L'aidante a pris 30 min »* |
| 2 | **Profil personnalisé visible** | L'aidant doit VOIR que l'app le connaît AVANT de payer. | Amal : *« Aucune personnalisation visible »* |
| 3 | **5 thèmes de vie** (pas des domaines cliniques) | Navigation par besoin humain, pas par catégorie médicale. Santé, Répit, Finances, Aides, Mental. | Audit : hiérarchie visuelle absente |
| 4 | **Parcours de progression** (pas des listes) | Chaque thème = un programme avec des étapes, un score, une direction. L'aidant voit qu'il avance. | Amal : *« On ne voit pas de progression »* |
| 5 | **Tâches cochables** | Chaque recommandation se décline en micro-tâches cochables. Un tap = c'est fait. | Amal : *« C'est fait ? Mais qu'est-ce qui est fait ? »* |
| 6 | **Système d'urgence visible** | Quand le moteur détecte une urgence ≤7j, un badge rouge, une notification. L'aidant doit VOIR le signal. | Audit : urgence non surfacée |
| 7 | **Explication « Pourquoi ? »** | Chaque tâche doit avoir un « pourquoi c'est important pour vous ». | Amal : *« On ne sait pas pourquoi »* |
| 8 | **Langage humain** | 0 acronyme (CARSAT, CPAM, IDEC, CCC). Tout en langage courant. | Amal : *« CARSAT je ne sais même pas ce que c'est »* |
| 9 | **Recherche de pros à proximité** | L'aidant cherche un interlocuteur dans sa zone. L'annuaire doit fonctionner au-delà du médecin. | Amal : *« La recherche ne fonctionne pas hors médecin »* |
| 10 | **Suivi émotionnel** | L'aidant peut dire comment il va. Le mood tracker humanise l'expérience. | Best practice apps de routine (Headspace, Calm) |
| 11 | **Ressources contextuelles** | Des articles, guides, contacts — filtrés par le profil, pas un blog générique. | Amal : *« C'est trop générique »* |
| 12 | **Communauté / Entraide** | Professionnels à proximité en premier plan, puis ressources collaboratives. | Besoin terrain : recherche d'interlocuteurs dans la zone |
| 13 | **Paywall APRÈS la valeur** | Le paiement vient APRÈS que l'aidant a vu son profil, ses thèmes, ses premières actions. | Amal : *« À ce stade, j'ai pas envie de m'abonner »* |
| 14 | **Multi-aidés** | Gérer plusieurs proches (mère handicapée + père BPCO). Essentiel pour la réalité du terrain. | Amal : *« Mon père aussi il souffre d'une BPCO »* |
| 15 | **Sécurité du proche** | L'angoisse #1 : « est-ce qu'elle est vivante ? ». Intégration alertes/check-in. | Amal : *« Mon angoisse c'est quand elle répond pas »* |

> « Ces 15 briques ne sont pas des souhaits. Ce sont les **réponses directes** aux 49 critiques d'Amal. Chaque ligne correspond à un problème identifié.
>
> Et la bonne nouvelle… c'est que la plupart de ces briques, **votre moteur les a déjà**. Il manque juste la couche de traduction. »

---

## 📱 ACTE 3 — La Preuve (3 min)

**[Ton : enthousiaste mais maîtrisé, moment clé]**

> « On ne voulait pas juste identifier les problèmes. On voulait montrer que **c'est faisable** — et que ça change tout.
>
> Alors on a construit un prototype fonctionnel. Pas un Figma statique — une vraie app, avec vos données moteur, qui tourne sur un téléphone. »

**[Afficher le QR code → inviter à scanner]**

> « Ici, vous pouvez la découvrir vous-même. Scannez le QR, prenez votre téléphone, et faites exactement le parcours qu'Amal a fait.
>
> Sauf que cette fois, Amal ne sera pas perdue. »

### Ce qu'ils vont découvrir :

- **5 thèmes de vie** au lieu de 4 onglets identiques
- **Un HeroCard** personnalisé : « Prendre soin de Francine »
- **Des TaskCards** avec urgence visible + « pourquoi »
- **Des micro-tâches cochables** — un tap, c'est fait
- **Un suivi de progression** — ScoreRing, ProgressCard
- **Un mood tracker** — « Comment vous sentez-vous ? »
- **Des professionnels à proximité** dans l'onglet Communauté
- **Des ressources filtrées** par le profil, pas génériques
- **Le tout en langage humain** — pas un seul acronyme

> « C'est la même donnée moteur. Les mêmes 103 recommandations. Les mêmes 299 micro-tâches.
>
> Mais maintenant, Amal comprend. Amal avance. Amal a envie de revenir. »

---

## 🎯 CONCLUSION (30 sec)

**[Ton : synthétique, mémorable]**

> « Pour résumer :
>
> **Le moteur est là.** 5 vulnérabilités, 24 parcours, 103 recos, 299 tâches.
>
> **L'interface ne suivait pas.** 49 critiques, 19 bloquants.
>
> **Notre proposition :** une couche de traduction qui transforme chaque donnée clinique en interface que l'aidant comprend, utilise, et qui lui donne envie de revenir.
>
> On ne change pas le moteur. On ouvre la fenêtre. »

---

## 📎 ANNEXES (si questions)

- **Synthèse détaillée 49 critiques** → `SYNTHESE_CRITIQUES_PAR_THEME.md`
- **Transcript complet Amal** → `TRANSCRIPT_AMAL_COMPLET.md`
- **Demo live review** → `localhost:3000`
- **Demo app mobile** → QR code (flashcode dans la review)
- **Storybook composants** → `/storybook`
