# 🎯 MARDI — Review UI/UX Monka

> **Date** : Mardi 18 février 2026  
> **Audience** : Étienne Rubi (CEO Monka) / Variant  
> **Format** : 15-20 min oral + démo live  
> **Objectif** : Décrocher le contrat de refonte UI/UX

---

## 📦 Inventaire — Ce qu'on a (✅) vs ce qu'il manque (🔴)

### ✅ PRÊT

| Asset | Localisation | Description |
|---|---|---|
| **Review interactive** | `app-audit/app/page.tsx` | 3 actes : Constat (verbatims Amal + critiques) → Mapping (composants live) → Preuve (QR code + links) |
| **Démo app proposée** | `app-audit/app/demo/page.tsx` | Simulation complète de la future app (Dashboard, Parcours, Ressources) |
| **Storybook custom** | `app-audit/app/storybook/page.tsx` | Catalogue visuel des 35 composants (atoms + molecules) |
| **User Journeys** | `app-audit/app/parcours/page.tsx` | 3 parcours React Flow (Matin pressé, Alerte, Bilan) |
| **Design System** | `app-audit/design-system.md` | Tokens couleurs, typo, spacing |
| **Composants** | `app-audit/app/components/` | 14 atoms + 18 molecules + 2 nav (+ stories) |
| **Data mock** | `app-audit/app/data/` | kernel-types, kernel-mock, actionable-advice, pro-finder |
| **UX Benchmark** | `app-audit/UX_BENCHMARK.md` | 5 apps de référence (Streaks, Fabulous, Structured, Headspace, Pattrn) |
| **Audit visuel** | `audit_visuel.html` | 80 screenshots annotés + diagnostics |
| **Screenshots app** | `app-audit/public/screenshots/` | 22 PNGs de l'app Monka actuelle |

### 🔴 À FAIRE

| Tâche | Priorité | Détail |
|---|---|---|
| **Déployer sur Vercel** | 🔴 Critique | URL publique pour la démo live |
| **Générer QR Code** | 🔴 Critique | Vers l'URL Vercel (pour la salle) |
| **Répétition du pitch** | 🔴 Critique | Timing 15-20 min, enchaînement des 3 actes |
| **Captures Storybook** | 🟠 Important | Screenshots haute-def pour la slide Design System |
| **Vérifier responsive** | 🟠 Important | page.tsx sur écran projecteur (large) |
| **Préparer fallback** | 🟡 Nice-to-have | Export PDF de la review si problème réseau |

---

## 🗂️ Structure de présentation

```
Acte 1 — LE CONSTAT (5 min)
├── Persona : Amal, 57 ans, aidante de Fatima
├── Parcours flow avec Verbatims du test utilisateur (10 citations classées par sévérité)
├── Résumé des points critiques avec une fleche qui pointe vers - a quoi ca correspond comme theme (copywriting, user experience, user interface..)

Acte 2 — EN EFFET, LE MOTEUR EST RICHE DONC LE DEFI DE LAPPLCIATION CEST DE BIEN RETRANSCIRRE CETTE RICHESSE EN UNE APP MOBILE SIMPLE, INTUITIVE, HUMAINE, pour maximiser l'adoption, la conversion et réduire le churn.
et la on reprend chaque point impoortant dans la construction de l'application 
├── UI 
 5 Flow Cards : Concept Kernel → Composant UI (LIVE, interactif)
│   ├── Vulnérabilité → ThemeSelector + HeroCard
│   ├── Micro-Parcours → ProgressCard + ScoreRing  
│   ├── Recommandation → TaskCard avec urgence
│   ├── Micro-Tâche → MicroTaskItem cochable
│   
├── COPYWRITING Le Ton de la Marque (6 traductions avant/après)
UX - la on parle de la profondeur d'app à mettre en place pour une bonne séparation des themes etc. en énoncant les uses cases pour cette app 
└── Niveaux d'urgence humanisés
et à la fin on fait un inventaire de ce qu'on a besoin comme pages pour une app comme celle ci. 

Acte 3 — LA PREUVE (5-7 min) 
pendant que les gens naviguent dans l'app je dois commenter et reprendre du coup les themes et qu'ils comprennent que cette demo répond aux exigeances qu'on ac ité 
├── QR Code → scan & test sur téléphone
├── Liens : Démo app seulement
a la fin de la présentation de la démo, on revient vite fait sur le parcours flow pour dire que c'est comme ça qu'on s'organise quand ons 'occupe de l'app. là ils ont pu naviguer partout etc mais ce qu'on fait c'est qu'on va vraiment construire les parcours selon les uses case, et A/B tester des parcours différents et récolter la data poru voir lequels sont ls plus efficaces pour convertir, rétention...  
└── Message de clôture
```

---

## 🎤 Script de démo (Acte 3)

1. **Ouvrir la review** → Scroller l'Acte 1 (30 sec), montrer les verbatims
2. **Acte 2** → Montrer les Flow Cards côte à côte (avant/après)
3. **Cliquer "Démo App"** → Dashboard → Tap thème → TaskCards → Cocher micro-tâches → Ring ASR progresse
4. **Cliquer "Storybook"** → Montrer la bibliothèque de composants
5. **QR Code** → L'audience scanne et teste sur leur téléphone

---

## 📋 Checklist J-3 (Samedi → Lundi)

- [ ] Vérifier que `npm run dev` tourne sans erreur
- [ ] Déployer sur Vercel (`vercel --prod`)
- [ ] Tester l'URL sur mobile (iPhone + Android)
- [ ] Générer le QR Code final
- [ ] Faire une répétition complète (chronométrer)
- [ ] Préparer le laptop : branches à jour, dev server prêt en backup
- [ ] Vérifier le projecteur : résolution, police lisible à distance

---

## 📁 Fichiers de ce dossier

| Fichier | Rôle |
|---|---|
| `README.md` | ← CE FICHIER — Plan d'organisation |
| `PITCH_NOTES.md` | Notes de speaking (à créer la veille) |
| `CHECKLIST_JOUR_J.md` | Liste minute par minute le jour J |
