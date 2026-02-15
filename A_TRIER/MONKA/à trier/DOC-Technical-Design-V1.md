# Solution 1 — Générateur Appels à Projet
## Technical Design Document v2

> Interface pensée pour **Maeva** — Chef de projet Article 51

---

## 👤 PERSONA : MAEVA

### Qui est Maeva ?
Chef de projet chez Monka, elle gère les dossiers d'expérimentation Article 51 avec les CHU d'Angers et Tours. Elle passe ses nuits à rédiger des réponses aux appels à projets.

### Son quotidien réel
- **Lundi 9h** : Nouveau AAP reçu par mail (deadline dans 3 semaines)
- **Lundi 10h** : Télécharge le cahier des charges (50 pages PDF)
- **Lundi-Mardi** : Analyse les exigences, identifie les sections à remplir
- **Mercredi-Vendredi** : Chasse aux données :
  - Va dans Notion chercher les chiffres du dernier trimestre
  - Demande à Étienne les CVs à jour des fondateurs
  - Fouille dans les anciens dossiers pour trouver la description du projet CNRS
- **Week-end** : Rédige sous pression jusqu'à 3h du matin
- **Deadline** : Export PDF, vérification formatage, envoi

### Ses frustrations
1. **"Je réécris toujours les mêmes paragraphes"** — Vision Monka, équipe, historique
2. **"Je perds du temps à chercher les chiffres"** — Éparpillés entre Notion et Excel
3. **"Chaque AAP a un format différent"** — Article 51, CNSA, subventions régionales...
4. **"Je dois attendre les réponses de l'équipe"** — CVs, validations, chiffres à jour
5. **"Le formatage prend des heures"** — Pour que le PDF soit professionnel

---

## 📋 STRUCTURE D'UN DOSSIER ARTICLE 51

Les sections récurrentes que Maeva doit remplir :

| Section | Contenu | Source actuelle |
|---------|---------|-----------------|
| **1. Lettre d'intention** | Résumé du projet, porteur, périmètre | Réécrit chaque fois |
| **2. Identification du problème** | Dysfonctionnement actuel du système de santé | Adapté par AAP |
| **3. Solution proposée** | Innovation organisationnelle Monka | Vision + adaptation |
| **4. Modèle économique** | Forfait 51, financement, durée | Calculs Excel |
| **5. Équipe projet** | CVs, rôles, compétences | Demandé par mail |
| **6. Indicateurs d'évaluation** | KPIs, critères DREES | Référentiel standard |
| **7. Calendrier** | Phasage du projet | Gantt ou tableau |
| **8. Budget prévisionnel** | Détail des coûts | Excel + justificatifs |
| **9. Annexes** | Documents de support | Éparpillés |

---

## 🖥️ INTERFACE PRINCIPALE

### Layout (inspiré PRAGMA Storybook)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  HEADER NAV                                                             │ │
│  │  [Logo Monka]  Mes Dossiers  Bibliothèque  Équipe  [Avatar Maeva ▼]     │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  STEPPER (Progression du dossier)                                    │   │
│  │  ●────────●────────●────────●────────○────────○                      │   │
│  │  Infos    Problème  Solution  Budget  Équipe   Review                │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌───────────────────────┬──────────────────────────────────────────────┐   │
│  │  SIDEBAR GAUCHE       │  ZONE ÉDITION CENTRALE                       │   │
│  │  (GlassSidebar)       │  (GlassCard)                                 │   │
│  │                       │                                              │   │
│  │  📁 MES BRIQUES       │  ┌──────────────────────────────────────┐   │   │
│  │  ┌─────────────────┐  │  │  Section : Présentation du projet    │   │   │
│  │  │ 🏢 Qui sommes-  │  │  │                                      │   │   │
│  │  │    nous         │  │  │  Titre du projet                     │   │   │
│  │  │ ────────────    │  │  │  ┌──────────────────────────────┐   │   │   │
│  │  │ 📊 Chiffres clés│  │  │  │  [LiquidInput]               │   │   │   │
│  │  │ 👥 Équipe       │  │  │  └──────────────────────────────┘   │   │   │
│  │  │ 🎯 Notre vision │  │  │                                      │   │   │
│  │  │ 🤝 Partenaires  │  │  │  Résumé exécutif (max 500 car.)      │   │   │
│  │  │ 📈 Historique   │  │  │  ┌──────────────────────────────┐   │   │   │
│  │  └─────────────────┘  │  │  │  [GradientTextarea]          │   │   │   │
│  │                       │  │  │                              │   │   │   │
│  │  📄 TEMPLATES AAP     │  │  │                              │   │   │   │
│  │  ┌─────────────────┐  │  │  └──────────────────────────────┘   │   │   │
│  │  │ Article 51      │  │  │  [🤖 Suggérer avec IA]       456/500│   │   │
│  │  │ CNSA            │  │  └──────────────────────────────────────┘   │   │
│  │  │ BPI Subvention  │  │                                              │   │
│  │  │ ARS Régionale   │  │  ┌──────────────────────────────────────┐   │   │
│  │  └─────────────────┘  │  │  Section : Équipe projet              │   │   │
│  │                       │  │                                      │   │   │
│  │  📎 DOCUMENTS         │  │  [DropZone: Glisser les fiches CV]  │   │   │
│  │  ┌─────────────────┐  │  │                                      │   │   │
│  │  │ Charte graphique│  │  │  ┌────────┐ ┌────────┐ ┌────────┐   │   │   │
│  │  │ Logo HD         │  │  │  │ Étienne│ │ Jérôme │ │ Benjamin  │   │   │
│  │  │ Statuts         │  │  │  │ RUBI   │ │ BESSON │ │ RIMAUD │   │   │   │
│  │  │ Kbis            │  │  │  │ CEO    │ │ Co-fond│ │ Médecin│   │   │   │
│  │  └─────────────────┘  │  │  └────────┘ └────────┘ └────────┘   │   │   │
│  │                       │  └──────────────────────────────────────┘   │   │
│  │  [+ Nouvelle brique]  │                                              │   │
│  └───────────────────────┴──────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  FOOTER ACTIONS                                                      │   │
│  │  [💾 Sauvegarder]  [👁️ Prévisualiser PDF]  [📤 Exporter le dossier] │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 COMPOSANTS PRAGMA UTILISÉS

### Du Storybook existant

| Composant | Usage dans l'interface |
|-----------|------------------------|
| `GlassSidebar` | Sidebar gauche collapsible |
| `GlassCard` | Conteneur de chaque section |
| `LiquidInput` | Champs de saisie texte |
| `GradientTextarea` | Zones de texte longues |
| `DropZone` | Import des CVs et documents |
| `Stepper` | Progression du dossier |
| `Progress` | Complétion de chaque section |
| `GlassButton` | Boutons d'action |
| `Badge` | Tags (Obligatoire, Optionnel) |
| `FilePreview` | Aperçu des documents uploadés |

### Spécifiques à créer

| Composant | Description |
|-----------|-------------|
| `BriqueCard` | Carte draggable pour les briques |
| `TemplateSelector` | Sélection du type d'AAP |
| `AIEditor` | Textarea avec bouton génération IA |
| `SectionProgress` | Indicateur de complétion par section |

---

## 🎨 DESIGN TOKENS

```css
/* Dark Theme (mode préféré de Maeva pour bosser tard) */
--bg-app: #0F0D1A;
--bg-sidebar: #1E1A33/80;
--bg-card: #1E1A33;
--primary: #7748F6;
--text-primary: #FFFFFF;
--text-secondary: #787685;
--border: rgba(255, 255, 255, 0.1);

/* Effet Glass (identité PRAGMA) */
--glass-bg: rgba(30, 26, 51, 0.8);
--glass-blur: blur(32px);
--glass-border: 1px solid rgba(255, 255, 255, 0.1);
--glass-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.3);

/* Radius (courbes généreuses PRAGMA) */
--radius-card: 24px;
--radius-btn: 20px;
--radius-input: 12px;
```

---

## 🔄 FLUX UTILISATEUR

### Scénario : Maeva reçoit un AAP Article 51

```
1. DASHBOARD
   └─ [+ Nouveau dossier]
      │
2. SÉLECTION TEMPLATE
   └─ "Article 51 - CHU" sélectionné
      │
3. PRÉ-REMPLISSAGE AUTO
   └─ Les briques s'insèrent :
      • "Qui sommes-nous" → §1
      • "Chiffres clés" → §2
      • "Équipe" → §6
      │
4. ÉDITION SECTION PAR SECTION
   └─ Maeva navigue via le Stepper
      • Clique [🤖 Suggérer] pour génération IA
      • Ajuste manuellement
      • Progress bar monte
      │
5. AJOUT DOCUMENTS
   └─ Drag & drop dans DropZone :
      • CVs équipe
      • Budget Excel
      • Annexes
      │
6. REVIEW GLOBAL
   └─ Prévisualisation PDF complète
      • Vérification cohérence
      • Derniers ajustements
      │
7. EXPORT
   └─ [📤 Exporter]
      • PDF formaté (template officiel)
      • Word éditable (option)
```

---

## 💡 INTERACTIONS CLÉS

### 1. Drag & Drop Briques
```
Sidebar         →    Zone Édition
[🏢 Équipe] ─drag─→  [Section Équipe]
                     ↳ Contenu pré-rempli
```

### 2. Génération IA Contextuelle
```
[GradientTextarea: "Résumé du projet..."]
        ↓
[🤖 Suggérer avec IA]
        ↓
Popup: "Générer à partir de :"
  ☑️ Vision Monka
  ☑️ Cahier des charges importé
  ☐ AAP précédent (CHU Tours)
        ↓
[✨ Générer]
        ↓
Texte inséré avec animation typewriter
```

### 3. Synchronisation Chiffres
```
Brique [📊 Chiffres clés]
        ↓
Source: Notion DB / Supabase
        ↓
Auto-update: "3K+ aidants" → "3.2K aidants" (synchro)
Badge: 🟢 "À jour depuis 2h"
```

---

## 📱 RESPONSIVE

| Breakpoint | Adaptation |
|------------|------------|
| Desktop >1280px | Layout complet 3 colonnes |
| Laptop 1024-1280px | Sidebar rétractable |
| Tablet 768-1024px | Sidebar en drawer |
| Mobile <768px | Navigation par onglets uniquement |

---

## 🚀 MVP FEATURES (v1)

- [ ] Templates Article 51 / CNSA
- [ ] 5 briques de base (Équipe, Vision, Chiffres, Partenaires, Historique)
- [ ] Génération IA par section
- [ ] Export PDF
- [ ] Sauvegarde auto

### v2 (Après validation)
- [ ] Import cahier des charges (OCR)
- [ ] Versioning des dossiers
- [ ] Collaboration temps réel
- [ ] Intégration Notion/Airtable

---

*Pensé pour Maeva — Plus de nuits blanches.*
