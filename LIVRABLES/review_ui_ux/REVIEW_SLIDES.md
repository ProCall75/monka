# Monka — Review Narrative : Contenu des Slides

> **Contexte** : Présentation interne pour la réunion avec Dr. Monka / Variant.
> **Durée cible** : 15 minutes + 5 minutes de démo live.
> **Format** : 7 slides thématiques.

---

## Slide 1 — "Le Problème Visible"

### Titre
> L'app Monka aujourd'hui : un outil technique, pas un compagnon.

### Bullet points
- L'interface actuelle ressemble à un **back-office administratif** plus qu'à une app d'accompagnement
- Les aidants — des personnes souvent épuisées et stressées — se retrouvent face à des formulaires froids et des listes sans hiérarchie
- **Aucune émotion, aucune guidance** : l'app ne dit pas quoi faire, elle affiche du contenu
- Résultat : le taux d'engagement est faible, les aidants n'ont pas de raison de revenir

### Visuel associé
> Screenshots annotés de l'app actuelle (à récupérer dans les captures existantes)
> Annotations rouges : "Où est l'action principale ?", "Quelle est la priorité ?", "Pourquoi cette page ?"

---

## Slide 2 — "Le Problème Invisible"

### Titre
> Un moteur clinique de 24 Micro-Parcours, 103 recommandations, 299 micro-tâches… qui dort dans une base de données.

### Bullet points
- Le Kernel v5 est un **système expert** validé cliniquement
- 5 Vulnérabilités, 24 Micro-Parcours, 103 Recommandations, 299 Micro-Tâches
- Chaque tâche a un type (📍 Contributive vs 💡 Non-contributive), une criticité (🔴🟠🟢⚪), un acteur
- **Rien de cette richesse n'est visible dans l'app**
- L'aidant ne sait pas qu'il a un parcours personnalisé qui l'attend

### Visuel associé
> Tableau : chiffres du Kernel v5 (schéma entonnoir)

---

## Slide 3 — "Ce que font les meilleurs"

### Titre
> 5 apps de référence, 5 leçons pour Monka.

### Bullet points

| App | Ce qu'on prend pour Monka |
|---|---|
| **Streaks** | Progression circulaire (=notre ASR Ring) |
| **Fabulous** | Concept de Journey structuré (=nos Micro-Parcours) |
| **Structured** | Ordre visuel et priorité des tâches |
| **Headspace** | Ton bienveillant et espaces blancs généreux |
| **Pattrn** | Lien visuel action → objectif (MT → ASR) |

- Synthèse : Monka doit être le **Headspace des aidants** — aussi rassurant dans le ton, aussi clair dans la navigation, avec la profondeur de Fabulous et le feedback de Streaks

### Visuel associé
> Grille comparative des 5 apps (extrait de UX_BENCHMARK.md)

---

## Slide 4 — "Notre Méthodologie UX"

### Titre
> User-Centered Design : comprendre Amal avant de coder.

### Bullet points
- **Persona principal** : Amal, 42 ans, aide sa mère atteinte d'Alzheimer, travaille à temps plein
- **3 scénarios quotidiens** :
  1. *Matin pressé* — Amal ouvre l'app en 30 secondes, voit "2 tâches prioritaires aujourd'hui", coche la première
  2. *Alerte CCC* — L'app signale que la situation de répit est urgente (🟠). Amal trouve immédiatement qui appeler
  3. *Bilan du dimanche* — Amal voit son anneau ASR à 65%. Elle se sent progresser et sait ce qu'il reste
- **Heuristiques appliquées** : Visibilité de l'état du système, Correspondance monde réel, Contrôle utilisateur, Consistance
- Inspiré du meilleur : glassmorphism Apple, parcours Fabulous, tons Headspace

### Visuel associé
> User Journey Map d'Amal (matin → soir)

---

## Slide 5 — "Le Mapping : Comment le Kernel devient des Pixels"

### Titre
> Chaque concept du moteur clinique a maintenant un composant UI dédié.

### Bullet points

| Concept Kernel | Composant UI | Interaction |
|---|---|---|
| Vulnérabilité | `VulnerabilityCard` | Tap → voir les MP |
| Micro-Parcours | `MicroParcoursCard` + ASR Ring | Tap → voir les Recos |
| Recommandation | `RecoAccordion` | Tap → déplier les MT |
| Micro-Tâche 📍 | `MicroTaskItem` (bleu) | 1 tap → ASR avance |
| Micro-Tâche 💡 | `MicroTaskItem` (gris) | 1 tap → info faite |
| ASR | `ASRProgress` (Ring) | Temps réel visuel |
| Criticité | Badge couleur (🔴🟠🟢⚪) | Visuel au premier regard |

### Visuel associé
> Schéma entonnoir V → MP → Reco → MT (image SVG/generated)

---

## Slide 6 — "La Preuve : Démo Live"

### Titre
> 3 écrans, 3 minutes : le Kernel v5 rendu tactile.

### Flow de démo
1. **Dashboard** — "Bonjour Amal" → 3 cartes de vulnérabilité avec scores et criticités
2. **Tap V1 "Social & Relationnel"** → Liste des 2 Micro-Parcours (R1 + R2) avec badges criticité et progression ASR
3. **Tap R1 "Impact vie perso/pro"** → Accordéons de recommandations → Micro-tâches cochables
4. **Cocher une MT 📍** → L'anneau ASR passe de 33% à 44% EN TEMPS RÉEL
5. **Tout cocher** → Bandeau "Bravo ! Objectif atteint 🎉"

### Mécanisme de transition
> QR Code affiché à l'écran → L'audience peut scanner et tester sur leur propre téléphone (Vercel)

---

## Slide 7 — "La Proposition"

### Titre
> De l'app-formulaire à l'app-compagnon : ce qu'on recommande.

### Bullet points
- **Phase 1** (Court terme — 4 sem.) : Refonte globale de l'UI en Liquid Glass, navigation simplifiée, 3 écrans principaux
- **Phase 2** (Moyen terme — 8 sem.) : Intégration API réelle du Kernel v5, push notifications pour les tâches CCC, tableau de bord IDEC
- **Phase 3** (Long terme — 12 sem.) : Bilan hebdomadaire automatique, export PDF pour les médecins, A/B testing des wordings

### Message de clôture
> Le Kernel v5 est un bijou clinique. L'app doit être le bijou UX qui le rend irremplaçable.
