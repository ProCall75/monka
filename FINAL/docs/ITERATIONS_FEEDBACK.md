# 📋 ITÉRATIONS — Feedback Antonin (22/02/2026 ~02h00)

> **Statut** : Brut — à analyser et planifier dans les blocs
> **Méthode** : Chaque itération sera croisée avec l'état actuel (DB, app, SPRINT) pour produire un plan d'action

---

## ITÉRATION 1 — Export Documents MP Officiels

> **Verbatim Antonin :**
> "Est ce que tu penses que tu pourrais faire un bouton dans chaque page de MP genre il y aurait un bouton exporter et là on exporte un document officiel exportable avec les explications cliniques (tout ce qui est stocké en DB) et genre un bon formatage croisé aussi avec les vraies règles du kernel genre un bon doc explicatif du fonctionnement de ce MP en croisant data et kernel en mode officiel. Et faire pareil pour un doc propre au scoring mais du coup au niveau de la vulnérabilité. Une explication scientifique argumentée professionnel qui booster la crédibilité et la certification du score et des limites actuelles aussi. Et les axes d'améliorations. Est ce que ça nécessite de nouveau content blocs ?"

### Décomposition :
- [ ] **Bouton "Exporter" sur chaque page MP** — génère un document officiel PDF/print
- [ ] **Contenu du doc MP** : croisement data DB + règles Kernel
  - Questions du MP avec sens_clinique
  - Règles d'activation (std, ccc, crit) avec condition_logic en français
  - Catégories et MTs associées
  - ASR (signatures A et B)
  - Content blocks associés
- [ ] **Doc scoring par V** — explication scientifique argumentée
  - Coefficients et seuils avec justification
  - Limites actuelles du scoring
  - Axes d'amélioration
- [ ] **Question ouverte** : nécessite de nouveaux content_blocks ?

---

## ITÉRATION 2 — CR Médecin Exportable avec Logo

> **Verbatim Antonin :**
> "T'es pas chaud le compte rendu médecin on le met exportable depuis l'app et je veux que il y ait le logo Monka sur le doc en mode vrai doc officiel, regarde sur internet ou dans le repo il doit y avoir dans les docs dans le dossier A TRIER. Genre vraiment voir si tout est bien exploité au niveau du Compte rendu est ce que on pourrait plus détaillé avec les données actuelles quelles données on pourrait créer en plus à partir de l'actuel ? Qu'est ce qu'il serait bien d'ajouter aussi en plus peut être dans des versions prochaines."

### Décomposition :
- [ ] **CR Médecin exportable** depuis l'app (PDF via @media print)
- [ ] **Logo Monka** intégré — trouvé dans `A_TRIER/MONKA/PDF-TEMPLATES/assets/monka-logo-transparent.png`
- [ ] **Exploiter toutes les données actuelles** dans le CR :
  - Scores V1-V5 avec seuils
  - MPs activés avec niveaux et sens_clinique
  - Top actions prioritaires cross-V
  - Détail CCC avec justification
  - Guides liés aux MTs recommandées
- [ ] **Données supplémentaires possibles** (à créer) :
  - Comparaison avec profils types (personas)
  - Évolution potentielle (suivi)
  - Recommandations acteurs avec contacts

---

## ITÉRATION 3 — Questions et Réponses Visibles dans le Simulateur

> **Verbatim Antonin :**
> "Je veux que dans le simulateur ou dans la vue par micro parcours on puisse voir en français au bonne étape lorsque que c'est intéressant de confronter les questions et les options de réponse. Genre ça serait bien de pouvoir les pings genre les règles d'activation avec les réponses et les liens ça serait pertinent. Idée à clarifier et à structurer. Pose moi des questions pour voir si tu as compris et qu'est ce que tu me conseilles."

### Décomposition :
- [ ] **Dans la vue MP** : afficher les questions liées avec leurs réponses actuelles
- [ ] **Liens règle d'activation ↔ questions** : montrer visuellement quelle réponse trigger quelle règle
- [ ] **En français** : question_text + response_options traduits et formatés
- [ ] **À clarifier** : à quel moment exactement dans le flux montrer ces confrontations ?

### ❓ Questions pour Antonin :
1. Tu veux voir les questions DANS la vue règles (genre sous chaque règle, les questions impliquées avec la réponse sélectionnée) ?
2. Ou tu veux un mode interactif où cliquer sur une question montre toutes les règles qui l'utilisent ?
3. Les deux ?

---

## ITÉRATION 4 — Restructuration Navigation App

> **Verbatim Antonin :**
> "En gros il faudrait aussi bien penser à ça. 1 page Dashboard. Avec plein de sous-pages implicites. Mais en gros dans la Sidebar c'est : Dashboard, après Simulateur plus en mode peut-être affiché en haut. Bref aussi un onglet Personas, avec les catégories d'aidance selon ce que ça active dans le simulateur genre les blocs avec 2-5 personnes avec réponses préremplies pertinentes. Et tu peux simuler en mode simulateur. Il me faut aussi une vue Scoring. Et là c'est par vulnérabilité quand on clique on a les stats global mais on a surtout une vue scoring avec tout le détail de l'explication du scoring sur cette vulnérabilité avec les content blocs genre pourquoi ces questions etc. Il me faut aussi une vue Micro-Parcours. Et là on pourrait filtrer par vulnérabilité subtilement. Et on pourrait descendre en cliquant sur un MP genre on clique on va sur une page et c'est dynamique ça descend avec des clics comme si c'était une app mobile. Et genre ça doit être pensé en sauce content blocs. On limite le hardcode au max. On aura un audit pour vérifier le niveau de hardcode. Et sûrement un onglet Documentation avec genre les docs dans le dossier FINAL. Ça me paraît cohérent et pas overkill."

### Décomposition — Sidebar restructurée :
- [ ] **Dashboard** — vue d'ensemble globale
- [ ] **Simulateur** — en haut ou position proéminente
- [ ] **Personas** — catégories par aidance, 2-5 personas avec réponses préremplies, lance le simulateur
- [ ] **Scoring** — par V, drill-down vers détail avec content_blocks, "pourquoi ces questions"
- [ ] **Micro-Parcours** — filtrable par V, drill-down MP → catégories → détail, UX mobile-like (transitions verticales)
- [ ] **Documentation** — docs du dossier FINAL/
- [ ] **Principe** : content_blocks partout, hardcode minimal, audit hardcode

---

## ITÉRATION 5 — Vue Règles d'Activation Enrichie

> **Verbatim Antonin :**
> "Il y aurait aussi un filtre tu vois quand t'es sur les règles d'activation en mode tu sais que c'est lié à un micro parcours et dans cette vue on pourrait cliquer et quand on est sur rules bah il y a les catégories avec clairement toutes les rules qui activent en standard elles sont quoi avec leur explication à côté à chaque fois et ça pour les CCC avec les explications bien en français avec le détail de la combinaison pour bien comprendre la pertinence avec le sens clinique pardon à côté."

### Décomposition :
- [ ] **Vue règles par MP** : groupées par catégorie
- [ ] **Standard** : chaque règle avec son explication en français
- [ ] **CCC** : détail de la combinaison + sens_clinique + justification_ccc
- [ ] **Filtre par MP** : navigation MP → catégories → règles
- [ ] **Lien cliquable** vers les questions impliquées

---

## ITÉRATION 6 — UX Contextuelle (Menus, Focus Texte)

> **Verbatim Antonin :**
> "Il me faut vraiment une app où ça ouvre plein de menus contextuels ou ça te focus sur le texte ça va être ça l'enjeu de l'app."
> "Il y aurait aussi dans la page vulnérabilité genre là où j'ai que on l'appelle scoring bah en fait on va l'appeler Vulnérabilités et on pourra direct tomber sur toutes les vulnérabilités et genre ce sera séparé en 2 modes."

### Décomposition :
- [ ] **Menus contextuels** partout — clic droit ou hover pour détails
- [ ] **Focus texte** — l'enjeu de l'app c'est le contenu clinique, pas la décoration
- [ ] **Page "Vulnérabilités"** (pas "Scoring") — 2 modes :
  - Mode 1 : Vue scores (dashboard V1-V5)
  - Mode 2 : Vue détail clinique (content_blocks, explications)

---

## ITÉRATION 7 — Workflow Itérations + Certification

> **Verbatim Antonin :**
> "Création d'un fichier dans workflow pour les itérations pour garder notre standard et notre certification de la pureté et de zéro dette technique. Il faut ajouter ce workflow amélioré basé sur notre modèle. Je veux un workflow spécifique pour les itérations mais en gros il faut qu'il y ait une checklist basée sur le fichier des rules et sur le senior dev framework et analyser chaque changement de fichier et les impacts et soit trop d'impact. L'objectif c'est zéro dette technique donc il faut rescanner l'ensemble. Il faut aussi penser à mettre dans le workflow de s'adapter pour faire des docs de certification comme on a fait genre des Quality Gates comme pour les blocs."

### Décomposition :
- [ ] **Workflow `/iteration`** dans `.agent/workflows/`
- [ ] **Checklist basée sur** `.agent/rules/dev.md` + Senior Dev Framework
- [ ] **Analyse d'impact** par fichier modifié
- [ ] **Seuil d'impact** : si trop d'impact → pause + replanification
- [ ] **Quality Gate itération** : certification post-itération (comme QG blocs)
- [ ] **Token guard** : si contexte trop long → pause, revenir
- [ ] **Zero dette technique** : rescan complet après chaque itération

---

## NOTES TECHNIQUES

### Fichiers supprimés par Antonin (22/02/2026)
- `docs/prd.md` — supprimé (à recréer dans le cadre des itérations)
- `docs/architecture.md` — supprimé
- `docs/glossary.md` — supprimé

### Assets trouvés
- Logo Monka : `A_TRIER/MONKA/PDF-TEMPLATES/assets/monka-logo-transparent.png`
- Logo PRAGMA : `A_TRIER/MONKA/PDF-TEMPLATES/assets/pragma-logo-transparent.png`

### Tables DB impactées
- `content_blocks` (355 lignes) — core de l'itération 4 et 6
- `activation_rules` (240 lignes) — itérations 3 et 5
- `scoring_questions` (345 lignes) — itérations 1 et 4
- `guides` (42) + `guide_mt_mapping` (61) — itération 1 et 2
