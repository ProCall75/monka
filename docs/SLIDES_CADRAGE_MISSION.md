# SLIDES — Cadrage Mission PRAGMA × Monka

> **Usage** : Plan slide-par-slide à valider AVANT mise en HTML
> **Audience** : Etienne (CEO) + Maël (CPO) — call du 6 mars 14h30
> **Règle** : Zéro prix. On cadre, on valorise, on écoute.
> **Style visuel** : Même CSS que KERNEL_V5.html (dark theme, Plus Jakarta Sans, vert Monka)
> **Durée estimée** : ~10 min de présentation, ~50 min de discussion

---

## SLIDE 1 — Hero

**Type** : Hero (plein écran, gradient)

```
Badge       : 🤝 Cadrage Mission
Titre       : PRAGMA × MONKA
Sous-titre  : Point d'avancement et cadrage de la suite
              Mars 2026

Meta-items  : 📅 6 mars 2026  |  📐 1 mois de travail livré  |  👥 2 streams (Moteur + UI/UX)
```

> **Intention** : Poser le cadre — c'est un point d'avancement collaboratif, pas un pitch commercial.

---

## SLIDE 2 — Point de départ (l'avant PRAGMA)

**Type** : 3 cards en grille

**Section label** : §1 · D'où on est parti

**Titre** : Le point de départ — février 2026

**3 cards** :

| Card | Emoji | Titre | Contenu |
|------|-------|-------|---------|
| 1 | 📊 | Données | 4 fichiers Excel en vrac. 15 fichiers Word. Aucune structure relationnelle. |
| 2 | 💻 | App | Chaque question → 1 seule reco. Pas de design system. Pas d'architecture de composants. |
| 3 | 📋 | Documentation | Zéro documentation normative. Aucune traçabilité. Rien pour un auditeur. |

> **Intention** : Rappeler d'où on part pour que la suite impressionne par contraste.

---

## SLIDE 3 — Ce qui existe maintenant : Pilier Moteur (Antonin)

**Type** : Stat highlights + tableau compact

**Section label** : §2 · Travail livré — Pilier Moteur

**Titre** : Le moteur clinique — 1 mois de travail

**Stat row (3 chiffres clés)** :

| 18 | 240 | 450 |
|----|-----|-----|
| Tables DB structurées | Règles d'activation | Justifications cliniques |
| De 4 Excel → schéma relationnel complet | Standard, CCC, critique, prévention | Chaque choix clinique documenté |

**Tableau compact** :

| Livrable | Transformation |
|----------|---------------|
| Moteur clinique (4 fichiers TS) | De « 1 reco/question » → système d'aide à la décision croisant 165 data points |
| Base de données | 18 tables, 2700+ entrées — schéma relationnel complet avec RLS |
| Simulateur | App React déployée sur Vercel — démo live fonctionnelle |
| Audit data | 240 rules auditées, anomalies corrigées |
| Documentation normative | 7 docs fondamentaux alignés IEC 62304 / ISO 14971 |
| Scripts d'automatisation | Process reproductible et versionné |

> **Intention** : Montrer la masse de travail livré en 1 mois, traduit en impact.

---

## SLIDE 4 — Ce qui existe maintenant : Pilier UI/UX (Marwane)

**Type** : Stat highlights + tableau compact

**Section label** : §2 · Travail livré — Pilier UI/UX

**Titre** : Le système UI/UX produit — 1 mois de travail

**Stat row (3 chiffres clés)** :

| 40+ | 59% | 19 |
|-----|-----|-----|
| Composants React/TSX | du CDC P0 couvert (38/64 US) | Problèmes UX identifiés |
| Isolés, testables, prêts au handoff | 38 User Stories implémentées en ~20h | 3 bloquants, 8 majeurs, 8 mineurs |

**Tableau compact** :

| Livrable | Impact |
|----------|--------|
| Audit UX de l'app actuelle | 19 problèmes identifiés (3 bloquants, 8 majeurs) |
| Identité visuelle + Design System | Charte graphique complète, 5 palettes, pensé pour des aidants 50-60 ans |
| 40+ composants React/TSX | Isolés et testables — prêts pour le handoff prestataires |
| Architecture UI 4 couches | Pont Moteur → Composant → Mot bienveillant. Zéro jargon clinique visible |
| Mapping complet DB → interface | Chaque table, chaque champ traduit en composant UI |
| Copywriting UX finalisé | Ton clinique → ton bienveillant, systématique |
| Implémentation CDC P0 | 38/64 US implémentées en ~20h — 59% du cahier des charges couvert |
| Co-conception produit avec Maël | Partenaire produit, pas exécutant |

> **Intention** : Donner au travail de Marwane le même poids que le moteur.

---

## SLIDE 5 — Les 3 Piliers pour les prestataires

**Type** : Diagramme 3 colonnes + flèche vers prestataires

**Section label** : §3 · Architecture

**Titre** : Les 3 piliers que les prestataires assembleront

**Diagramme** :

```
╔═══════════════╦═══════════════════╦═════════════════════╗
║  PILIER 1     ║  PILIER 2         ║  PILIER 3           ║
║  MOTEUR       ║  PROTO UI/UX      ║  BASE DE DONNÉES    ║
║  (Antonin)    ║  (Marwane)        ║  (Shared)           ║
║               ║                   ║                     ║
║  « Comment    ║  « Comment ça     ║  « Ce que c'est »   ║
║  ça calcule » ║  doit se voir »   ║                     ║
╚═══════════════╩═══════════════════╩═════════════════════╝
              │                │                │
              ▼                ▼                ▼
     ┌────────────────────────────────────────────────┐
     │         PRESTATAIRES EXTERNES                  │
     │    Assemblent les 3 piliers dans MyMonka V2    │
     └────────────────────────────────────────────────┘
```

**Phrase clé** :
> « Si UN des 3 piliers manque de qualité, l'investissement prestataires est gaspillé. »

> **Intention** : PRAGMA construit la fondation, les prestataires construisent dessus.

---

## SLIDE 6 — Organisation de travail : les 3 acteurs

**Type** : 3 cartes + flèches de relation

**Section label** : §4 · Méthode de travail

**Titre** : Comment on travaille — 3 acteurs, 0 overhead

**3 acteurs** :

| Acteur | Rôle | Concrètement |
|--------|------|-------------|
| 🟢 **MONKA** (Etienne, Maël, Dr. Rimaud, Sophie) | **Décideurs + Métier** | Valide cliniquement, arbitre produit, teste terrain |
| 🔵 **PRAGMA** (Antonin + Marwane) | **Produit + Standards** | Construit le moteur, le proto, la doc normative. Proactif, pas en attente de specs. |
| 🟠 **Prestataires externes** | **Intégrateurs certifiés** | Implémentent MyMonka V2 sur la base des 3 piliers. Garants sécurité, archi, HDS, RGPD. |

**Coordination** :

```
MONKA ←──── validation clinique + produit ────→ PRAGMA
             sync hebdo 30-45min

PRAGMA ←── 3 piliers (moteur + proto + DB) ──→ PRESTATAIRES
             handoff structuré, checkpoints

MONKA ←────── supervision, recette ──────────→ PRESTATAIRES
             checkpoints CP1-CP4
```

> **Intention** : Montrer la clarté de l'organisation. Chacun a son rôle, on est complémentaires.

---

## SLIDE 7 — Ce qui nous différencie

**Type** : 3 principes en grille

**Section label** : §4 · Méthode de travail

**Titre** : Ce qui nous différencie d'un prestataire classique

**3 principes** :

| # | Principe | Concrètement |
|---|----------|-------------|
| 1 | **On construit d'abord, on spec après** | Pas de cycle spec→dev→QA de 3 mois. L'IA agentique + relation directe avec le médecin = itération immédiate. |
| 2 | **Standards dès le départ, pas après** | Chaque doc, chaque décision est tracée pour un auditeur. On ne refait pas la doc après coup. Économie : ×3-5 vs restructuration post-audit. |
| 3 | **Partenaire, pas exécutant** | Marwane propose des idées UX à Maël. Antonin anticipe les besoins normatifs. On ne demande pas « quoi faire » — on propose et on valide ensemble. |

> **Intention** : C'est LE slide de différenciation. On n'est pas des freelances qui attendent un brief.

---

## SLIDE 8 — La prochaine étape : solidifier la base

**Type** : Pyramide visuelle + 4 actions

**Section label** : §5 · Prochaine étape

**Titre** : Avant de monter — solidifier la base

**Concept visuel** : Pyramide inversée

```
         ┌─────────────────────────────────────┐
         │         FONCTIONNALITÉS FUTURES       │  ← On montera d'autant plus
         │         (après le cadrage ensemble)   │     vite que la base est solide
         ├─────────────────────────────────────┤
         │     INTÉGRATION PRESTATAIRES          │
         ├───────────────────────────────┤
         │   RESTRUCTURATION + VALIDATION  │  ← ON EST ICI
         ├─────────────────────────┤
         │  BASE (Kernel + Proto)    │  ← FAIT
         └─────────────────────────┘
```

**4 actions de cette étape** :

| # | Action | Pourquoi |
|---|--------|---------|
| 1 | **Challenger les règles cliniques** | 240 règles auditées mais pas encore challengées en profondeur par Dr. Monka |
| 2 | **Challenger les composants UI** | Validation des choix UX avec des cas réels, pas juste des maquettes |
| 3 | **Documentation certification-ready** | Les certifications que vous visez (DNM, Article 51) exigent une base documentaire solide dès maintenant |
| 4 | **Préparer le handoff prestataires** | Les prestataires doivent recevoir des fondations propres, réfléchies, testées — pas un brouillon |

> « Plus vite et mieux on structure la base, plus on avance vite et bien sur la suite. »

> **Intention** : Le message du vocal — on solidifie AVANT de monter. La qualité de la base détermine tout.

---

## SLIDE 9 — Ce que la base solide apporte

**Type** : 4 cards impact

**Section label** : §6 · Pourquoi c'est critique

**Titre** : Pourquoi cette étape est critique pour Monka

**4 cards** :

| Emoji | Titre | Contenu |
|-------|-------|---------|
| 🛡️ | **Protection de l'investissement presta** | Les prestataires reposent sur 3 piliers. Sans fondation de qualité, cet investissement est gaspillé. |
| ⚡ | **Vitesse de la suite** | Mieux la base est structurée, plus les prochaines étapes (features, intégration, certification) avancent vite et sans dette. |
| 📋 | **Certification-ready** | La doc normative (IEC 62304, ISO 14971) se construit PENDANT le dev, pas après. Zéro restructuration au moment du marquage CE. |
| 💼 | **Arme commerciale** | La démo proto + le CR médecin contextualisé = des outils de vente dès maintenant pour Etienne. |

> **Intention** : Traduire la valeur de "solidifier la base" en bénéfice concret pour un CEO.

---

## SLIDE 10 — Ce qu'on veut entendre de vous

**Type** : 2 colonnes (Ce qu'on a / Ce qu'on a besoin de vous)

**Section label** : §7 · Cadrage ensemble

**Titre** : On a la base — maintenant, on cadre la mission ensemble

**Colonne gauche — Ce qu'on a** :

- ✅ Moteur clinique fonctionnel + audité
- ✅ 40+ composants UI prêts + 59% du CDC couvert
- ✅ Base de données complète (18 tables, 2700+ entrées)
- ✅ Début de documentation normative
- ✅ Méthode de travail éprouvée (1 mois, 2 personnes)

**Colonne droite — Ce qu'on a besoin de vous** :

- ❓ Votre TODO — quelles priorités côté business ?
- ❓ Les prestataires — timing, budget, qui sont-ils ?
- ❓ Quelle expé clinique d'abord ? (Klésia ?)
- ❓ Où vous pensez qu'on sera le plus pertinent pour vous ?
- ❓ Besoin démo commerciale — pour quand, pour qui ?
- ❓ Alignement prestataires — on leur envoie le contexte quand ?

> **Intention** : On ne dicte pas — on pose la question. Etienne parle, on écoute, puis on combine.

---

## SLIDE 11 — Slide de clôture

**Type** : Hero simple

```
Badge       : 🤝 Prochaine étape
Titre       : On combine et on revient
Sous-titre  : Envoyez-nous votre TODO.
              On allie vos besoins à notre méthode.
              On revient avec une proposition de mission claire —
              périmètre, durée, livrables.

Meta-items  : 📞 Sync régulière  |  🔄 Méthode itérative  |  📋 Chaque livrable est vérifiable
```

> **Intention** : Le call to action clair — pas de vente, pas de prix. Juste : "donnez-nous votre input, on fait la proposition ensemble."

---

## SLIDES OPTIONNELLES (back-pocket)

### SLIDE A — Les prérequis prestataires

**Type** : Checklist visuelle

Si Etienne demande "et les prestataires?", on sort cette slide.

**Message clé** : « Demander ces standards maintenant coûte 10% de plus. Ne pas les demander coûte 300% de plus dans 12 mois. »

### SLIDE B — Le levier IA

**Type** : Stats comparatives

Si Etienne demande "comment vous allez si vite?", on sort cette slide.

| Métrique | PRAGMA | Équipe classique |
|----------|--------|-----------------|
| Durée | 1 mois | 3-4 mois |
| Personnes | 2 | 4-5 |
| Overhead coordination | ~0 | Élevé |

---

## NOTES POUR LA DISCUSSION

### Ce qu'on ne montre PAS :
- ❌ Aucun chiffre de prix
- ❌ Pas de variantes A/B/C
- ❌ Pas de roadmap détaillée M1/M2/M3 ou P1/P2/P3 (trop prescriptif sans leur input)
- ❌ Pas de TJM, pas de valeur marché

### Le processus post-meeting :
1. Etienne envoie sa TODO
2. On combine sa TODO + notre méthode + nos constats
3. On définit UNE mission claire sur X mois
4. On fait UNE proposition commerciale avec prix global (début → fin)
5. On précise notre présence mensuelle (indicatif, car pas de données historiques)

---

*Document de travail — PRAGMA — 6 mars 2026*
