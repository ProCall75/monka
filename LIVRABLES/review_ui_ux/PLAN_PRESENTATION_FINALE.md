# Monka — Plan Présentation Finale

> **Format** : Oral, 15-20 min + démo live
> **Audience** : Dr. Monka / Variant
> **Principe** : Peu de texte. Screenshots + schémas + démo tactile.

---

## 🎬 ACTE 1 — « Le Constat » (5 min, 2-3 slides)

> *Message : "L'interface actuelle ne rend pas justice à votre moteur."*

### Slide 1 — L'expérience d'Amal aujourd'hui

**Visuel** : 2 screenshots annotés côte à côte (dashboard actuel + page ressources)

**Points oraux :**
- Amal, 42 ans, aidante de sa mère — épuisée, pressée
- Elle ouvre l'app → mur de texte, aucune hiérarchie
- Elle ne sait pas quoi faire en premier
- Tout se ressemble : les onglets, les cards, les pages

**Annotations sur screenshots** :
- ❌ "Où est l'urgence ?"
- ❌ "Aucune personnalisation visible"
- ❌ "Paywall avant la moindre valeur"

---

### Slide 2 — Les 5 problèmes majeurs

**Visuel** : 5 icônes + 1 phrase chacun (pas de paragraphes)

| | Problème |
|:-:|---|
| 🧭 | **Zéro profondeur** — navigation plate, tout au même niveau |
| 🎨 | **Hiérarchie absente** — rien ne guide le regard |
| 🔒 | **Paywall mal placé** — bloque avant de montrer la valeur |
| 🤖 | **Ton froid** — vocabulaire technique, copie administrative |
| 📦 | **Contenu brut** — articles sans mise en forme mobile |

---

### Slide 3 (optionnel) — Le paradoxe

**Visuel** : Split screen — gauche "Ce que le moteur sait" vs droite "Ce que l'aidant voit"

| Le moteur Monka sait… | L'aidant voit… |
|---|---|
| 5 vulnérabilités scorées | Une liste générique |
| Urgence ≤ 7 jours | Rien |
| 24 micro-parcours personnalisés | "Mes aides" sans contexte |
| 299 micro-tâches catégorisées | Aucune action concrète |

> *"Vous avez un Ferrari sous le capot mais un volant de Twingo."*

---

## 🎬 ACTE 2 — « Le Mapping » (5-7 min, 2-3 slides)

> *Message : "Voici comment on traduit votre moteur en interface."*

### Slide 4 — La Traduction Moteur → UI → Copywriting

**Visuel** : Schéma en 3 colonnes (le plus beau slide)

```
    MOTEUR (Kernel)          →        UI (Composant)          →        MOTS (Copywriting)
┌─────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│  Vulnérabilité  │ ──────→ │  ThemeSelector      │ ──────→ │  "Vos thèmes de    │
│  (V1-V5)        │         │  + HeroCard         │         │   vie"              │
├─────────────────┤         ├─────────────────────┤         ├─────────────────────┤
│  Micro-Parcours │ ──────→ │  ProgressCard       │ ──────→ │  "Votre programme"  │
│  (24 MP)        │         │  + ScoreRing (ASR)  │         │  "Votre objectif"   │
├─────────────────┤         ├─────────────────────┤         ├─────────────────────┤
│  Recommandation │ ──────→ │  TaskCard           │ ──────→ │  "Vos conseils"     │
│  (103 Recos)    │         │  + UrgencyBadge     │         │  "À faire cette     │
│                 │         │                     │         │   semaine" 🔴       │
├─────────────────┤         ├─────────────────────┤         ├─────────────────────┤
│  Micro-Tâche    │ ──────→ │  MicroTaskItem      │ ──────→ │  "Action            │
│  (299 MT)       │         │  (cochable)         │         │   prioritaire" 📍   │
│                 │         │                     │         │  "Bon à savoir" 💡  │
├─────────────────┤         ├─────────────────────┤         ├─────────────────────┤
│  Score /20      │ ──────→ │  ⛔ JAMAIS AFFICHÉ  │ ──────→ │  (invisible)        │
│  CCC            │         │  Badge urgence only │         │                     │
└─────────────────┘         └─────────────────────┘         └─────────────────────┘
```

**Points oraux :**
- Chaque concept moteur a un composant UI ET un mot bienveillant
- Jamais de terme clinique visible : pas de "CCC", pas de "Score", pas de "Vulnérabilité"
- L'urgence est traduite en action simple : "À faire cette semaine" au lieu de "Critique"

---

### Slide 5 — Le Ton de la Marque

**Visuel** : 3 colonnes comparatives

| ❌ Aujourd'hui | ✅ Notre proposition | Pourquoi |
|---|---|---|
| "Score de vulnérabilité" | **"Vos thèmes de vie"** | Positif, pas médical |
| "Recommandation #R1.2" | **"Retrouver du répit"** | Objectif concret |
| "Micro-tâche STRUC" | **"Action prioritaire 📍"** | Clair, motivant |
| "Priorité Niveau 1" | **"À faire cette semaine 🔴"** | Temporalité, pas gravité |
| "Questionnaire" | **"Faisons le point"** | Dialogue, pas examen |

**Point oral clé :**
> *"L'aidant ne doit jamais sentir qu'il est un patient. Il est accompagné, pas diagnostiqué."*

---

### Slide 6 — Le Design System (30 sec)

**Visuel** : Grille de composants Storybook (1 screenshot)

- 5 couleurs par thème de vie (violet, bleu, rose, ambre, émeraude)
- Fond crème chaud, jamais de blanc froid
- Formes arrondies, ombres douces
- 35 composants prêts → montrer le Storybook en 1 image

---

## 🎬 ACTE 3 — « La Preuve » (5-7 min, 1 slide + démo live)

> *Message : "On l'a construit. Testez-le."*

### Slide 7 — QR Code

**Visuel** : Grand QR code centré + texte minimal

> **Scannez — Testez — Jugez.**
>
> *(URL Vercel de la démo déployée)*

**Flow de démo orale :**
1. **Dashboard** → "Bonjour Amal" + 3 thèmes de vie colorés + tâche prioritaire
2. **Tap un thème** → HeroCard → liste de TaskCards avec urgences en couleur
3. **Tap une tâche** → MicroTaskItems cochables → anneau ASR qui progresse
4. **Coche tout** → "Bravo ! Objectif atteint 🎉"

**Message de clôture** (oral) :
> *"Le moteur Monka est un bijou clinique.*
> *Il mérite un bijou UX.*
> *On vous propose de le construire ensemble."*

---

## Matériel à préparer

| Élément | Statut | Fichier |
|---|:-:|---|
| Screenshots annotés app actuelle | ✅ fait | `audit_screenshots.md` |
| Composants Storybook | ✅ fait | 35 stories prêtes |
| kernel-types.ts (mapping) | ✅ fait | `app/data/kernel-types.ts` |
| Design System v2 | ✅ fait | `design-system.md` |
| Schéma mapping 3 colonnes | 🔴 à faire | SVG ou slide |
| Screenshots Storybook | 🔴 à faire | capture browser |
| Démo déployée Vercel | 🔴 à faire | deploy |
| QR Code vers demo | 🔴 à faire | générer |
| Slides finaux (HTML/Keynote) | 🔴 à faire | créer |
