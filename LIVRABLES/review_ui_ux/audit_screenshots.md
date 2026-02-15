# 📸 Audit Visuel Screenshots — Monka App

> **Date** : Février 2026  
> **Périmètre** : 74 screenshots (IMG_3683 – IMG_3762)  
> **Parcours couvert** : Splash → Onboarding → Questionnaire V2 → Analyse → Paywall → Dashboard (4 onglets) → Détail tâche → Détail article → Ressources → Messagerie → Mes informations → Profil → Contacts  

---

## 1. Cartographie complète des écrans

### 1.1 — Parcours pré-authentification

| Section | Screenshots | Description | Composants clés |
|---------|------------|-------------|-----------------|
| **Splash / Landing** | IMG_3683 | Page d'accueil non-connectée, logo Monka, « Se connecter » | `MNavigationBar` (logo + CTA), `MActionCard` (questionnaire CTA avec illustration), carousel tutorial cards |
| **Ressources (pré-auth)** | IMG_3684 | « Mes ressources » avec carousel articles | `MSearchBar` (absent), carousel horizontal `ResourceCard`, section promo dark avec CTA |
| **Messagerie (pré-auth)** | IMG_3685 | Chat paywall « Monka est là pour vous » | Avatar, chat vide, bottom sheet paywall (badge + titre + description + CTA « Je prends rendez-vous ») |
| **Mes informations (pré-auth)** | IMG_3686 | Promo card + Paramètres + Aide | Dark promo card (titre + description + CTA « Je commence »), settings list rows (icon + label + chevron), separator |

### 1.2 — Parcours onboarding & questionnaire

| Section | Screenshots | Description | Composants clés |
|---------|------------|-------------|-----------------|
| **Inscription** | IMG_3687 – IMG_3688 | Formulaire prénom, notifications | `MInput`, `MButton`, permission dialog |
| **Questionnaire V2 — Section 1** | IMG_3689 – IMG_3693 | « Faisons plus ample connaissance » (Q1-Q5) | Section badge (numéro circulaire + titre), `MProgressDots` (4 segments), question + sous-texte explicatif, `MOptionPill` (choix unique) |
| **Questionnaire V2 — Section 2** | IMG_3694 – IMG_3695 | « Santé » (Q6-Q7) | Même pattern, segment 2/4 actif |
| **Questionnaire V2 — Section 3** | IMG_3696 – IMG_3697 | « Personne aidée » (Q8-Q9) | Même pattern, segment 3/4 actif |
| **Questionnaire V2 — Section 4** | IMG_3698 – IMG_3699 | « Situation détaillée » (Q10-Q11) — **multi-select** | Même pattern, segment 4/4, `MOptionPill` en mode multi-select |
| **Analyse loading** | IMG_3700 | « Analyse en cours… » barre de progression + checklist | Illustration, `MProgressBar`, checklist items (✅ done / ○ pending) |
| **Paywall essai** | IMG_3701 | « Votre essai de 7 jours Monka Essentiel a commencé ! » | Illustration, `MTimelineStep` (3 étapes), dual CTA : `MButton` primary « Commencer » + secondary « Voir les abonnements » |

### 1.3 — Dashboard (authentifié)

| Section | Screenshots | Description | Composants clés |
|---------|------------|-------------|-----------------|
| **Dashboard — À la une** | IMG_3702 – IMG_3704 | Accueil : « Bonjour, Marwane », compteur 0/12, carousel | Header greeting, progress counter badge, horizontal card carousel (tutorial cards), section headers (« Dès maintenant », « Cette semaine ») |
| **Dashboard — Santé** | IMG_3705 – IMG_3706 | Hero card vert (prescription examens), task cards | Hero card (bg-verte, titre bold, « Pour Francine », tags, CTA), task cards (tags + titre + « Voir plus ») |
| **Dashboard — Démarches** | IMG_3707 – IMG_3708 | Hero card orange (CAF), task cards | Même structure que Santé, couleur fond orange |
| **Dashboard — Services** | IMG_3709 – IMG_3710 | Hero card bleu (CCAS/mairie), task cards | Même structure, couleur fond bleue |

### 1.4 — Écrans de détail

| Section | Screenshots | Description | Composants clés |
|---------|------------|-------------|-----------------|
| **Détail tâche « Pour vous »** | IMG_3725 – IMG_3726 | Tâche personnalisée avec recherche | `MNavigationBar` (back), Monka checkmark icon, label « Pour vous », titre h1 bold, tags (badge vert), description, section « Recherche d'acteurs à proximité… » + spinner, `MButton` CTA « C'est fait ! » |
| **Détail article** | IMG_3721 | Article avec contenu structuré | Back nav, titre h1 « Les objectifs de la plateforme de répit », contenu structuré (h2 bold + bullet lists), scrollable |
| **Article (suite)** | IMG_3722 | Scroll continuation | h2 « Assurer une prise en charge adaptée… », h2 « Informer et former les aidants », listes à puces |

### 1.5 — Sections secondaires

| Section | Screenshots | Description | Composants clés |
|---------|------------|-------------|-----------------|
| **Ressources (auth)** | IMG_3711 | « Mes ressources » avec articles carousel | Article cards horizontales (illustration + titre + reading time « 2 min de lecture » + category tag « Santé »), section promo « Consultez nos ressources utile » |
| **Messagerie (auth)** | IMG_3712 | Chat IDEC « Sophie » + paywall | Avatar, chat interface, paywall bottom sheet |
| **Mes informations (auth)** | IMG_3713 – IMG_3716, IMG_3714 | Historique + Paramètres | Settings rows (icon + label + chevron + separator), sections « Paramètres » et « Aide », `MButton` « Déconnexion » |
| **Profil** | IMG_3717 | « Vous et votre proche » | Profile fields, `MButton` « Modifier », `MAvatar` |
| **Contacts — Santé** | IMG_3718 | « Mes soignants » | `MNavigationBar`, icon people, « Ajouter un contact + », category tabs (Santé / Démarches / Services), sections « Pour Moi » / « Pour Mon Proche » (vides, expandable) |
| **Contacts — Démarches** | IMG_3719 | « Mes interlocuteurs » + bottom sheet | `MNavigationBar`, « Ajouter un contact + », category tabs, bottom sheet picker (liste alphabétique géante) |

---

## 2. Inventaire composants — Atoms existants vs Besoin

### ✅ Atoms déjà créés (11/11)

| Atom | Usage dans l'app | Screenshots |
|------|-----------------|-------------|
| `MButton` | CTA « C'est parti », « Commencer », « Voir plus », « C'est fait ! », « Déconnexion » | 3683, 3701, 3726 |
| `MInput` | Formulaire inscription, champs profil | 3687, 3717 |
| `MBadge` | Tags sur cards (« Tutoriel », « Santé », « Pour Francine ») | 3684, 3705, 3725 |
| `MAvatar` | Chat Monka, profil, liste contacts | 3685, 3717 |
| `MTag` | Category tags (« Santé », « Services », « CCAS ») | 3684, 3725 |
| `MSeparator` | Séparateurs dans settings, contacts | 3686, 3714, 3718 |
| `MProgressDots` | 4 segments questionnaire V2 | 3689–3699, 3732 |
| `MProgressBar` | Analyse loading | 3700 |
| `MIcon` | Back arrow, close, chevron, heart, clipboard, chat, person | Partout |
| `MSwitch` | (Non observé dans les screenshots, peut-être dans settings scroll) | — |
| `MChip` | Section tabs sur dashboard (À la une / Santé / Démarches / Services) | 3702–3710 |

### ✅ Molecules déjà créées (8/8)

| Molecule | Usage dans l'app | Screenshots |
|----------|-----------------|-------------|
| `MNavigationBar` | Back + titre centré + close, ou Logo + CTA | 3719, 3721, 3683 |
| `MSearchBar` | (Absent des screenshots — pas de recherche visible dans l'app actuelle) | — |
| `MProfileCard` | Section profil « Vous et votre proche » | 3717 |
| `MActionCard` | Hero cards dashboard (prescription, CAF, CCAS) | 3705, 3707, 3709 |
| `MContactRow` | (Non observé directement — sections contacts sont vides) | 3718 |
| `MTabBar` | Bottom tab bar (Pour Moi / Ressources / Messagerie / Mes informations) | 3683–3719 |
| `MOptionPill` | Choix questionnaire (Homme / Femme, tranches d'âge, pathologies) | 3689–3699, 3732 |
| `MTimelineStep` | Étapes paywall essai (Aujourd'hui / Dans 5 jours / Dans 7 jours) | 3701 |

---

## 3. Diagnostic — Critiques existantes confirmées

### 🔴 BLOQUANTS

#### C01 — Zéro profondeur — tout est à plat
| Preuve | Screenshot |
|--------|-----------|
| Dashboard = empilement vertical de cartes + carousels sans hiérarchie | IMG_3702, IMG_3703, IMG_3704 |
| Onglets (À la une, Santé, Démarches, Services) = **même structure** dupliquée (hero card + task cards) | IMG_3705 – IMG_3710 |
| Impossible de « rentrer dans » un sujet — tout au même niveau | Ensemble du dashboard |

> **Verdict : ✅ CONFIRMÉ** — Le dashboard est un empilement vertical identique sur les 4 onglets. La seule différence est la couleur de fond (vert/orange/bleu). Il n'y a aucune sous-page, aucune navigation imbriquée.

#### C03 — Polypathologie ignorée
| Preuve | Screenshot |
|--------|-----------|
| Q3 (âge personne aidée) utilise des boutons radio uniques | IMG_3691 |
| Format identique pour Q1-Q9 : un seul choix possible | IMG_3689 – IMG_3697 |

> **Verdict : ✅ CONFIRMÉ** — Les questions Q1 à Q9 utilisent toutes un format à choix unique (radio buttons). Seules Q10 et Q11 (IMG_3698, IMG_3699) utilisent du multi-select.

---

### 🟠 MAJEURS

#### C06 — Zéro personnalisation post-onboarding
| Preuve | Screenshot |
|--------|-----------|
| Hero cards : « Renseignez-vous auprès de la CAF », « Consultez la CPAM » — formulations 100% génériques | IMG_3707, IMG_3708 |
| Task cards marquées « Pour Francine » ✅ mais jamais dans les titres ou les hero | IMG_3708, IMG_3710 |
| Dashboard titre : « Bonjour, Marwane » ✅ mais aucune mention de l'aidé | IMG_3702, IMG_3709 |
| Ressources : « Pour mon proche » sans prénom | IMG_3711 |
| Détail tâche : « Pour vous » générique au lieu de « Pour Marwane » | IMG_3725 |

> **Verdict : ✅ PARTIELLEMENT CONFIRMÉ** — Le prénom de l'aidant apparaît en header, et « Pour Francine » apparaît sur certaines task cards. Mais les hero cards, titres de tâches, et sections restent génériques. La personnalisation est superficielle et incohérente.

#### C07 — Aucune pédagogie / contextualisation
| Preuve | Screenshot |
|--------|-----------|
| Dashboard : aucune explication de ce que sont les « actions clés du mois » | IMG_3702 |
| Task cards : « Sollicitez le département… » sans expliquer pourquoi | IMG_3708 |
| « Analyse en cours… » : 4 étapes listées mais sans explication de la valeur | IMG_3700 |
| Compteur 0/12 sans label explicatif clair | IMG_3702 |
| Détail tâche : description présente mais trop dense, pas de « Pourquoi c'est important » | IMG_3725 |

> **Verdict : ✅ CONFIRMÉ** — L'app impose des tâches sans contexte. L'utilisateur ne sait pas pourquoi il doit « contacter la plateforme de répit » ou « solliciter le département ».

#### C08 — Absence d'onboarding tutoriel
| Preuve | Screenshot |
|--------|-----------|
| Après le questionnaire → loading → paywall → dashboard direct | IMG_3700 → IMG_3701 → IMG_3702 |
| Aucun tooltip, bulle d'aide, ou tour guidé visible | Ensemble des screenshots |
| Tutorial cards existent dans le carousel « À la une » mais sont mélangées avec les vrais contenus | IMG_3683, IMG_3702 |

> **Verdict : ✅ CONFIRMÉ** — Les tutorial cards existent (« Avancez pas à pas grâce aux tâches personnalisées ») mais sont noyées dans le dashboard au lieu d'être présentées en séquence d'onboarding.

#### C09 — Contacts non segmentés par onglet
| Preuve | Screenshot |
|--------|-----------|
| Onglet Santé : titre « Mes soignants », sections "Pour Moi" / "Pour Mon Proche" **vides** | IMG_3718 |
| Onglet Démarches : titre « Mes interlocuteurs », bottom sheet = **liste alphabétique géante** non filtrée (Assistante sociale → CMPP…) | IMG_3719 |
| La liste bottom sheet mélange catégories santé et démarches | IMG_3719 |

> **Verdict : ✅ CONFIRMÉ** — La liste de contacts dans le bottom sheet mélange toutes les catégories (Cancérologue ET CAF ET CCAS dans la même liste sous l'onglet "Démarches").

---

### 🟡 MINEURS

#### C10 — Ressources dupliquées
| Preuve | Screenshot |
|--------|-----------|
| Section « À la une pour moi » et « Pour mon proche » avec les **mêmes illustrations** | IMG_3711 |

> **Verdict : ⚠️ PROBABLE** — Les illustrations de la section "À la une pour moi" et "Pour mon proche" semblent identiques. Nécessite confirmation par scroll complet.

#### C12 — UX Confuse (hiérarchie visuelle)
| Preuve | Screenshot |
|--------|-----------|
| Hero cards sombres ≠ task cards claires, mais les deux sont des « actions » | IMG_3705, IMG_3707 |
| Task cards : toutes le même format (tags + texte + « Voir plus ») — impossible de distinguer type | IMG_3708 |
| Pas de différence visuelle entre une tâche urgente et un conseil | Tout le dashboard |
| Détail tâche : le bouton « C'est fait ! » est persistant même pendant le loading spinner | IMG_3726 |

> **Verdict : ✅ CONFIRMÉ** — Les cartes utilisent un design uniforme. Aucune distinction visuelle entre priorité haute/basse, tâche/conseil.

#### C13 — Wording & Typos
| Preuve | Screenshot |
|--------|-----------|
| Bouton « Modifer » vs « Modifier » (avec/sans 'i') sur le même écran | IMG_3717 |
| Mélange « Pour vous » / « Pour Francine » / « Pour Mon Proche » — 3 conventions différentes | IMG_3708, IMG_3710, IMG_3718, IMG_3725 |
| « Consultez nos ressources utile » → « utiles » (faute d'accord) | IMG_3684 |

> **Verdict : ✅ CONFIRMÉ** — Multiples fautes et incohérences de nommage.

---

## 4. Nouveaux problèmes découverts

### 🔴 N01 — Paywall mal positionné dans le parcours

| Observation | Screenshot |
|-------------|-----------|
| L'écran essai gratuit (paywall) s'affiche **immédiatement** après le questionnaire, avant même de voir l'app | IMG_3701 |
| L'utilisateur n'a pas encore vu la valeur du produit qu'on lui demande de payer | IMG_3700 → IMG_3701 |

> **Impact** : L'utilisateur vient de remplir 11 questions. Au lieu de lui montrer le résultat et la valeur de l'app, on lui impose un mur de paiement. Cela brise le contrat implicite : « réponds et on t'aide ».
> 
> **Sévérité** : 🔴 BLOQUANT

---

### 🟠 N02 — Messagerie inaccessible sans abonnement

| Observation | Screenshot |
|-------------|-----------|
| L'onglet Messagerie montre "Sophie est là pour vous" + chat vide + bannière paywall « S'abonner » | IMG_3712 |
| L'utilisateur ne peut pas tester la messagerie avant de payer | IMG_3712 |
| Bottom sheet paywall : badge « En activant votre suivi infirmier ☆ » + « Accéder et contacter simplement votre IDEC » | IMG_3685 |

> **Impact** : Une fonctionnalité centrale (contact IDEC) est totalement verrouillée. L'utilisateur voit un chat vide avec une bulle « S'abonner » — expérience frustrante. Aucun message de bienvenue ou d'exemple pour montrer la valeur.
> 
> **Sévérité** : 🟠 MAJEUR

---

### 🟠 N03 — Dashboard : 4 onglets = 4× la même structure

| Observation | Screenshot |
|-------------|-----------|
| « À la une », « Santé », « Démarches », « Services » ont **exactement la même architecture** | IMG_3702 – IMG_3710 |
| Structure : hero card sombre → "Dès maintenant" (N tâches) → "Cette semaine" (N tâches) → "Ensuite" (N tâches) | Comparaison des 4 onglets |
| Seule la couleur de fond change (vert, bleu, orange) | IMG_3705, IMG_3707, IMG_3709 |

> **Impact** : L'utilisateur n'a aucune raison de naviguer entre les onglets — l'expérience est identique. La répétition structurelle est perçue comme un manque de finition.
> 
> **Sévérité** : 🟠 MAJEUR

---

### 🟠 N04 — Historique vide sans explication

| Observation | Screenshot |
|-------------|-----------|
| Section "Historique" vide avec juste un lien « Voir plus » | IMG_3713, IMG_3715 |
| Aucun état vide (empty state) explicatif | IMG_3713 |

> **Impact** : L'utilisateur ouvre la section et voit… rien. Pas de message du type « Vous n'avez pas encore de tâches terminées. Commencez par explorer vos actions clés ! ». C'est un dead-end silencieux.
> 
> **Sévérité** : 🟠 MAJEUR

---

### 🟠 N08 — Détail tâche : UX loading + CTA confus

| Observation | Screenshot |
|-------------|-----------|
| Page détail tâche : un spinner « Recherche d'acteurs à proximité… » est affiché pendant que le CTA « C'est fait ! » est déjà actif | IMG_3726 |
| L'utilisateur peut cliquer « C'est fait ! » avant même que la recherche ne soit terminée | IMG_3726 |
| Aucun résultat de recherche affiché — le spinner ne mène à rien de visible | IMG_3726 |

> **Impact** : Le bouton « C'est fait ! » ne devrait pas être actif pendant un chargement. L'utilisateur ne sait pas si la tâche est complétée ou si la recherche est en cours. Le spinner sans résultats visibles crée de la confusion.
> 
> **Sévérité** : 🟠 MAJEUR

---

### 🟡 N05 — Questionnaire : fatigue cognitive (11 questions sans progression visible)

| Observation | Screenshot |
|-------------|-----------|
| 11 questions consécutives avec le **même layout** exact | IMG_3689 – IMG_3699 |
| Progress dots existent (4 segments) mais ne montrent pas la progression intra-section | IMG_3689 – IMG_3699, IMG_3732 |
| Seul le compteur et les segment dots indiquent l'avancement | IMG_3689 |

> **Impact** : L'utilisateur ne sait pas combien de questions restent dans chaque section. Les progress dots montrent la section globale (1/4, 2/4) mais pas le progrès intra-section. L'ajout d'un compteur « Q2/4 de cette section » réduirait la fatigue perçue.
> 
> **Sévérité** : 🟡 MINEUR

---

### 🟡 N06 — Contacts : sections vides sans guidance

| Observation | Screenshot |
|-------------|-----------|
| Onglet Santé : "Pour Moi" et "Pour Mon Proche" affichés avec chevrons mais **aucun contenu** | IMG_3718 |
| L'utilisateur ne sait pas comment les remplir ou pourquoi c'est vide | IMG_3718 |

> **Impact** : États vides sans call-to-action ni explication. L'utilisateur ne comprend pas la différence entre « Ajouter un contact » et les sections "Pour Moi"/"Pour Mon Proche".
> 
> **Sévérité** : 🟡 MINEUR

---

### 🟡 N07 — Incohérence naming "Mes soignants" vs "Mes interlocuteurs"

| Observation | Screenshot |
|-------------|-----------|
| Onglet Santé → titre = « Mes soignants » | IMG_3718 |
| Onglet Démarches → titre = « Mes interlocuteurs » | IMG_3719 |
| Ces deux termes décrivent le même concept (contacts) avec des mots différents | IMG_3718, IMG_3719 |

> **Impact** : Confusion cognitive mineure. Le terme change selon l'onglet sans raison apparente pour l'utilisateur.
> 
> **Sévérité** : 🟡 MINEUR

---

### 🟡 N09 — Contenu article brut sans mise en forme

| Observation | Screenshot |
|-------------|-----------|
| Article « Les objectifs de la plateforme de répit » = texte brut h2/h3 + listes à puces | IMG_3721, IMG_3722 |
| Aucune illustration inline, pas de mise en valeur (encadrés, citations, infographies) | IMG_3722 |
| Le contenu est un copier-coller de document Word, pas adapté au mobile | IMG_3721 |

> **Impact** : Les articles de ressources sont du texte brut sur fond blanc. Aucune mise en forme éditoriale (images, encadrés, pull quotes). L'engagement sera faible.
> 
> **Sévérité** : 🟡 MINEUR

---

### 🟡 N10 — Settings pre-auth vs auth : expérience incohérente

| Observation | Screenshot |
|-------------|-----------|
| Pre-auth (3686) : Dark promo card « Ne plus perdre d'informations » + « Je commence » + Paramètres (Mentions légales) + Aide (FAQ, Nous contacter) | IMG_3686 |
| Auth (3714) : Liste étendue avec « Vous et votre proche », « Mes contacts », « Mes documents », « Connexion », « Gestion de l'abonnement », « Supprimer mon compte » + Déconnexion | IMG_3714 |
| La transition entre les deux états n'est pas communiquée à l'utilisateur | IMG_3686 vs IMG_3714 |

> **Impact** : L'utilisateur pré-auth voit 3 items, l'auth en voit 9. Le saut est significatif sans onboarding expliquant les nouvelles fonctionnalités.
> 
> **Sévérité** : 🟡 MINEUR

---

## 5. Inventaire composants — Organisms nécessaires (GAP ANALYSIS)

> Les organisms sont des compositions de molecules et atoms qui forment des sections complètes de page.

### 🔴 Manquants — Priorité haute

| Organism | Description | Screenshots source | Composants internes |
|----------|-------------|-------------------|---------------------|
| `ODashboardHeader` | Header greeting personnalisé + compteur progression + notification bell | IMG_3702, IMG_3709 | Logo Monka + « Bonjour, Marwane » + `MBadge` progress (0/12) + `MIcon` bell + `MButton` « S'abonner » |
| `OHeroCard` | Grande carte sombre en haut de chaque onglet dashboard | IMG_3705, IMG_3707, IMG_3709 | Background coloré + Monka checkmark icon + titre h2 bold + « Pour Francine » + tags `MBadge` + CTA `MButton` |
| `OTaskCard` | Carte d'action/tâche dans le dashboard | IMG_3706, IMG_3708, IMG_3710 | Tags `MTag` + titre + sous-texte « Pour Francine » + CTA « Voir plus » + `MSeparator` |
| `OQuestionnaireScreen` | Écran complet questionnaire V2 | IMG_3689, IMG_3732 | Section badge (numéro + titre) + question h1 + sous-texte explicatif + `MProgressDots` + container `MOptionPill` list + `MNavigationBar` (back + close) |
| `OBottomTabBar` | Tab bar persistante en bas de l'app | IMG_3683 – IMG_3719 | 4 items : `MIcon` + label (Pour Moi / Ressources / Messagerie / Mes informations) + active indicator |

### 🟠 Manquants — Priorité moyenne

| Organism | Description | Screenshots source | Composants internes |
|----------|-------------|-------------------|---------------------|
| `OResourceCard` | Carte article dans le carousel ressources | IMG_3684, IMG_3711 | Illustration top + titre + reading time (`MIcon` clock + text) + category `MTag` |
| `OPaywallSheet` | Bottom sheet paywall pour messagerie et features premium | IMG_3685, IMG_3712 | `MBadge` (« En activant votre suivi infirmier ☆ ») + titre h2 + description + `MButton` CTA |
| `OSettingsGroup` | Groupe de paramètres (section titre + rows) | IMG_3686, IMG_3714 | Section title + list of rows (`MIcon` + label + `MIcon` chevron + `MSeparator`) |
| `OAnalysisLoading` | Écran d'analyse post-questionnaire | IMG_3700 | Illustration + `MProgressBar` + checklist (checkmark items ✅/○ + labels) |
| `OTrialWelcome` | Écran welcome essai gratuit avec timeline | IMG_3701 | Illustration + titre h1 + `MTimelineStep` ×3 + dual `MButton` (primary + secondary) |
| `OTaskDetail` | Page détail d'une tâche recommandée | IMG_3725, IMG_3726 | `MNavigationBar` + Monka icon + « Pour vous » label + titre h1 + `MTag` tags + description text + proximity search section (spinner + label) + `MButton` CTA « C'est fait ! » |

### 🟡 Manquants — Priorité basse

| Organism | Description | Screenshots source | Composants internes |
|----------|-------------|-------------------|---------------------|
| `OArticleDetail` | Vue article complète scrollable | IMG_3721, IMG_3722 | `MNavigationBar` (back) + titre h1 + date + author info + body (h2 + h3 + bullet lists) |
| `OContactsList` | Page contacts avec onglets et sections | IMG_3718, IMG_3719 | `MNavigationBar` + icon people + titre + `MButton` « Ajouter un contact + » + category `MChip` tabs + expandable sections « Pour Moi » / « Pour Mon Proche » |
| `OBottomSheetPicker` | Bottom sheet modal avec liste scrollable | IMG_3719 | Handle bar + scrollable list items + `MSeparator` |
| `OCategoryTabs` | Onglets horizontaux (Santé / Démarches / Services) sur dashboard et contacts | IMG_3702, IMG_3718 | Horizontal scroll `MChip` items + active underline indicator |
| `OPromoCard` | Carte promo dark pour CTA engagement | IMG_3686 | Background sombre + titre bold + description + `MButton` CTA |
| `OTutorialCard` | Carte tutorial dans le carousel onboarding | IMG_3683, IMG_3702 | `MBadge` « Tutoriel » + titre + « Pour vous » label + `MButton` CTA « Je découvre » |

---

## 6. Synthèse globale

### Tableau récapitulatif des critiques

| ID | Critique | Statut | Sévérité | Screenshots clés |
|----|----------|--------|----------|-----------------|
| C01 | Zéro profondeur | ✅ Confirmé | 🔴 | IMG_3702–3710 |
| C02 | Recherche acteurs HS | ❓ Non testable | 🔴 | — |
| C03 | Polypathologie ignorée | ✅ Confirmé | 🔴 | IMG_3691 |
| C04 | Workflow cassé | ❓ Non testable | 🟠 | — |
| C05 | Blog mobile | ❓ Non visible | 🟠 | — |
| C06 | Zéro personnalisation | ⚠️ Partiel | 🟠 | IMG_3702, 3708, 3711, 3725 |
| C07 | Aucune pédagogie | ✅ Confirmé | 🟠 | IMG_3702, 3700, 3725 |
| C08 | Pas d'onboarding tutoriel | ✅ Confirmé | 🟠 | IMG_3700–3702 |
| C09 | Contacts non segmentés | ✅ Confirmé | 🟠 | IMG_3718, 3719 |
| C10 | Ressources dupliquées | ⚠️ Probable | 🟡 | IMG_3711 |
| C11 | Performance images | ❓ Non testable | 🟡 | — |
| C12 | UX Confuse | ✅ Confirmé | 🟡 | IMG_3705, 3708, 3726 |
| C13 | Wording & Typos | ✅ Confirmé | 🟡 | IMG_3717, 3718, 3684 |
| **N01** | **Paywall mal positionné** | 🆕 Nouveau | 🔴 | IMG_3701 |
| **N02** | **Messagerie verrouillée** | 🆕 Nouveau | 🟠 | IMG_3685, 3712 |
| **N03** | **4 onglets = même structure** | 🆕 Nouveau | 🟠 | IMG_3702–3710 |
| **N04** | **Historique vide** | 🆕 Nouveau | 🟠 | IMG_3713 |
| **N05** | **Fatigue questionnaire** | 🆕 Nouveau | 🟡 | IMG_3689–3699, 3732 |
| **N06** | **Contacts vides** | 🆕 Nouveau | 🟡 | IMG_3718 |
| **N07** | **Naming incohérent** | 🆕 Nouveau | 🟡 | IMG_3718, 3719 |
| **N08** | **Task detail UX loading** | 🆕 Nouveau | 🟠 | IMG_3726 |
| **N09** | **Articles bruts** | 🆕 Nouveau | 🟡 | IMG_3721, 3722 |
| **N10** | **Settings pre/auth incohérent** | 🆕 Nouveau | 🟡 | IMG_3686, 3714 |

### Compteurs

| Sévérité | Existantes confirmées | Nouvelles | Total |
|----------|----------------------|-----------|-------|
| 🔴 Bloquant | 2 | 1 | **3** |
| 🟠 Majeur | 4 | 4 | **8** |
| 🟡 Mineur | 3 | 5 | **8** |
| **Total** | **9/13 évaluées** | **10 nouvelles** | **19** |

### Inventaire composants

| Couche | Existants | Nécessaires | Gap |
|--------|-----------|-------------|-----|
| Atoms | 11 | 11 | **0** (complet) |
| Molecules | 8 | 8 | **0** (complet) |
| Organisms | 0 | 16 | **16** |

---

## 7. Recommandations prioritaires

### 🔴 Actions immédiates (Sprint 1)

1. **Restructurer la navigation** — Remplacer les 4 onglets identiques par une architecture en profondeur (sections → sous-sections → détail)
2. **Déplacer le paywall** — Laisser l'utilisateur découvrir son profil personnalisé et au moins 2-3 tâches AVANT de proposer l'abonnement
3. **Créer les 5 organisms prioritaires** — `ODashboardHeader`, `OHeroCard`, `OTaskCard`, `OQuestionnaireScreen`, `OBottomTabBar`

### 🟠 Actions structurantes (Sprint 2)

4. **Ajouter un onboarding tutoriel** — 3-4 écrans post-questionnaire expliquant les sections de l'app, au lieu de tutorial cards noyées dans le dashboard
5. **Personnaliser systématiquement** — « Réservez un RDV pour Francine » partout, pas seulement en sous-texte
6. **Contextualiser chaque tâche** — Ajouter un « Pourquoi ? » sous chaque action recommandée
7. **Fixer le task detail UX** — Désactiver le CTA pendant le loading, afficher les résultats de recherche

### 🟡 Améliorations continues (Sprint 3+)

8. **Segmenter réellement les contacts** — Chaque onglet = liste filtrée, pas la même bottom sheet
9. **Soigner les empty states** — Chaque section vide = message explicatif + CTA
10. **Éditorialiser les articles** — Ajouter illustrations inline, encadrés, pull quotes, pas juste du texte brut
11. **Corriger wording** — « Modifer → Modifier », « ressources utile → utiles », harmoniser « Pour vous / Pour Francine / Pour Mon Proche »
