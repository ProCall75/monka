# Solution 2 — Copilote IDEC
## Technical Design Document

> Interface pensée pour **Sophie** — IDEC chez Monka

---

## 👤 PERSONA : SOPHIE (IDEC Monka)

### Qui est Sophie ?
Infirmière Diplômée d'État Coordinatrice chez Monka. Elle est la seule IDEC pour 3 200+ aidants. Elle utilise Lifeline (CRM) pour gérer les dossiers et communique via le chat MyMonka.

### Son quotidien réel

**8h00 — Arrivée**
- Ouvre Lifeline, vérifie les nouveaux inscrits de la nuit
- 12 nouvelles inscriptions → 12 contacts J+1 à faire aujourd'hui

**8h30-12h — Bilans initiaux J+1**
- Appelle chaque nouvel aidant
- Lit les réponses au questionnaire d'inscription
- Prend des notes, évalue la situation
- Rédige le compte-rendu dans Lifeline
- Personnalise les recommandations

**12h-14h — Réponses au chat**
- 47 messages en attente dans le chat MyMonka
- "Comment demander l'APA ?"
- "Mon père refuse d'aller en EHPAD, que faire ?"
- "J'ai besoin d'une aide à domicile, par où commencer ?"
- Beaucoup de questions similaires...

**14h-17h — Suivis et cas complexes**
- Rappels des aidants en difficulté
- Coordination avec médecins, SSIAD, mutuelles
- Mise à jour des dossiers

**17h-18h — Administratif**
- Stats pour les partenaires
- Reporting pour Étienne

### Ses frustrations

1. **"Je réponds 10 fois à la même question sur l'APA"**
2. **"Je passe 30 min à préparer chaque bilan J+1"**
3. **"Je n'ai pas le temps pour les cas vraiment complexes"**
4. **"Les questionnaires sont longs à lire et synthétiser"**
5. **"Je suis le bottleneck — si je suis malade, tout s'arrête"**

---

## 📊 LE WORKFLOW J+1 ACTUEL

```
NOUVEL AIDANT S'INSCRIT
        ↓
Remplit le questionnaire (dans MyMonka)
        ↓
Notification dans Lifeline
        ↓
Sophie OUVRE le dossier
        ↓
Sophie LIT les 25 réponses du questionnaire
        ↓
Sophie SYNTHÉTISE mentalement la situation
        ↓
Sophie APPELLE l'aidant (10-20 min)
        ↓
Sophie RÉDIGE le compte-rendu manuellement
        ↓
Sophie SÉLECTIONNE les recommandations adaptées
        ↓
Envoi dans l'app de l'aidant
```

**Temps total : 45 min à 1h par aidant**
**12 nouveaux/jour × 45 min = 9 heures de travail**

---

## ✨ LE WORKFLOW AVEC COPILOTE

```
NOUVEL AIDANT S'INSCRIT
        ↓
Remplit le questionnaire (dans MyMonka)
        ↓
🤖 COPILOTE ANALYSE automatiquement
        ↓
Génère :
  • Fiche synthèse de l'aidant
  • Points de vigilance détectés
  • Bilan pré-rédigé
  • Recommandations suggérées
        ↓
Sophie OUVRE le dossier PRÉPARÉ
        ↓
Sophie VALIDE / AJUSTE le bilan
        ↓
Sophie APPELLE l'aidant (focus conversation)
        ↓
Sophie CONFIRME et envoie
```

**Temps total : 15-20 min par aidant**
**Gain : 60% du temps**

---

## 🖥️ INTERFACE COPILOTE IDEC

### Layout (intégré à Lifeline)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ LIFELINE — Copilote IDEC                                    [Sophie] [🔔 12] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────┐  ┌─────────────────────────────────────────────┐   │
│  │ 📋 À TRAITER        │  │ DOSSIER AIDANT                              │   │
│  │                     │  │                                             │   │
│  │ J+1 AUJOURD'HUI (12)│  │ ┌─────────────────────────────────────────┐ │   │
│  │ ┌─────────────────┐ │  │ │ 👤 Marie-Claire DUBOIS                  │ │   │
│  │ │ 🔴 Marie-Claire │ │  │ │ Inscrite il y a 4h — J+1 en attente     │ │   │
│  │ │    Dubois       │ │  │ │ 📞 06 12 34 56 78                       │ │   │
│  │ │    Urgence: 🟠  │ │  │ └─────────────────────────────────────────┘ │   │
│  │ └─────────────────┘ │  │                                             │   │
│  │ ┌─────────────────┐ │  │ ┌─────────────────────────────────────────┐ │   │
│  │ │ 🟡 Jean-Pierre  │ │  │ │ 🤖 SYNTHÈSE IA                          │ │   │
│  │ │    Martin       │ │  │ │                                         │ │   │
│  │ │    Standard     │ │  │ │ Profil : Femme, 58 ans, fille aidante   │ │   │
│  │ └─────────────────┘ │  │ │ Proche : Mère 84 ans, Alzheimer stade 2 │ │   │
│  │ ┌─────────────────┐ │  │ │ Charge : 25h/semaine                    │ │   │
│  │ │ 🟢 Françoise    │ │  │ │ Besoins identifiés :                    │ │   │
│  │ │    Petit        │ │  │ │  • Répit urgent                         │ │   │
│  │ │    Faible       │ │  │ │  • Aide démarches APA                   │ │   │
│  │ └─────────────────┘ │  │ │  • Soutien psychologique                │ │   │
│  │ ...                 │  │ │                                         │ │   │
│  │                     │  │ │ ⚠️ POINTS DE VIGILANCE                  │ │   │
│  │ MESSAGES (47)       │  │ │  • Risque burn-out élevé (Zarit: 58)    │ │   │
│  │ ┌─────────────────┐ │  │ │  • Isolement social                     │ │   │
│  │ │ 💬 Questions    │ │  │ └─────────────────────────────────────────┘ │   │
│  │ │    en attente   │ │  │                                             │   │
│  │ └─────────────────┘ │  │ ┌─────────────────────────────────────────┐ │   │
│  │                     │  │ │ 📝 BILAN J+1 PRÉ-RÉDIGÉ                 │ │   │
│  │ SUIVI (8)           │  │ │                                         │ │   │
│  │                     │  │ │ "Marie-Claire est fille unique de       │ │   │
│  └─────────────────────┘  │ │  Mme Hélène Dubois, 84 ans, diagnosti-  │ │   │
│                           │ │  quée Alzheimer depuis 2023. Elle       │ │   │
│                           │ │  assure l'accompagnement quotidien      │ │   │
│                           │ │  depuis 18 mois, avec une charge        │ │   │
│                           │ │  estimée à 25h/semaine.                 │ │   │
│                           │ │                                         │ │   │
│                           │ │  Situation actuelle :                   │ │   │
│                           │ │  - Pas d'aide professionnelle en place  │ │   │
│                           │ │  - APA non demandée                     │ │   │
│                           │ │  - Signes d'épuisement (score Zarit 58) │ │   │
│                           │ │                                         │ │   │
│                           │ │  Actions recommandées prioritaires :    │ │   │
│                           │ │  1. Accompagner demande APA             │ │   │
│                           │ │  2. Orienter vers accueil de jour       │ │   │
│                           │ │  3. Proposer groupe de parole aidants"  │ │   │
│                           │ │                                         │ │   │
│                           │ │ [✏️ Modifier] [✅ Valider et envoyer]   │ │   │
│                           │ └─────────────────────────────────────────┘ │   │
│                           │                                             │   │
│                           │ ┌─────────────────────────────────────────┐ │   │
│                           │ │ 💡 RECOMMANDATIONS SUGGÉRÉES            │ │   │
│                           │ │                                         │ │   │
│                           │ │ ☑️ Guide APA — Comment faire sa demande │ │   │
│                           │ │ ☑️ Annuaire accueils de jour (44)       │ │   │
│                           │ │ ☐ Numéro vert Alzheimer                 │ │   │
│                           │ │ ☑️ Webinaire "Prévenir le burn-out"     │ │   │
│                           │ │ ☐ Aide à domicile — premiers pas        │ │   │
│                           │ │                                         │ │   │
│                           │ │ [Ajouter une ressource...]              │ │   │
│                           │ └─────────────────────────────────────────┘ │   │
│                           └─────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ [📞 Appeler] [💬 Ouvrir chat] [📊 Voir questionnaire] [🗂️ Historique]│   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 🤖 FONCTIONNALITÉS COPILOTE

### 1. Synthèse automatique du questionnaire
L'IA lit les 25 réponses et génère :
- Profil aidant (âge, lien, situation pro)
- Profil proche aidé (pathologie, niveau dépendance)
- Charge estimée (heures/semaine)
- Besoins identifiés (top 3)
- Score Zarit automatique (si applicable)

### 2. Détection des points de vigilance
Alertes automatiques si :
- Score burn-out > 45
- Isolement social détecté
- Pas d'aide professionnelle en place
- > 30h/semaine de charge
- Pathologie évolutive (Alzheimer, Parkinson...)

### 3. Bilan J+1 pré-rédigé
Texte généré à partir de :
- Réponses au questionnaire
- Base de connaissances Monka
- Historique des cas similaires

L'IDEC peut :
- Modifier le texte
- Ajouter des observations post-appel
- Valider tel quel

### 4. Recommandations contextuelles
Suggestions basées sur :
- Profil de l'aidant
- Département (ressources locales)
- Besoins identifiés

L'IDEC coche/décoche les recommandations pertinentes.

### 5. Réponses chat pré-rédigées
Pour les questions récurrentes :
- "Comment demander l'APA ?" → Réponse type personnalisée
- Sophie valide avant envoi
- Peut modifier le ton/contenu

---

## 🔧 STACK TECHNIQUE

| Composant | Technologie |
|-----------|-------------|
| Backend | Next.js API Routes / FastAPI |
| LLM | OpenAI GPT-4 / Claude |
| RAG | pgvector (Supabase) |
| Base de connaissances | Embeddings des guides Monka |
| Frontend | Intégré à Lifeline (React) |
| BDD | Supabase (PostgreSQL) |

### Architecture RAG

```
Questionnaire aidant
        ↓
Embedding du contenu
        ↓
Recherche similarité (pgvector)
        ↓
Contexte : 
  • Cas similaires passés
  • Guides Monka pertinents
  • Ressources locales
        ↓
Prompt GPT-4 avec contexte
        ↓
Génération synthèse + bilan + suggestions
```

---

## 📱 RESPONSIVE

| Device | Usage |
|--------|-------|
| Desktop | Écran principal IDEC au bureau |
| Tablet | Consultations en mobilité |
| Mobile | Alertes urgentes uniquement |

---

## ✅ MVP FEATURES (v1)

- [ ] Synthèse auto du questionnaire
- [ ] Score Zarit calculé automatiquement
- [ ] Bilan J+1 pré-rédigé (modifiable)
- [ ] 10 recommandations de base suggérées
- [ ] Alertes points de vigilance

### v2 (Après validation)
- [ ] Réponses chat pré-rédigées
- [ ] Apprentissage des modifications IDEC
- [ ] Statistiques temps gagné
- [ ] Mode "formation" pour nouvelle IDEC

---

## 📊 KPIs À MESURER

| Métrique | Baseline | Cible |
|----------|----------|-------|
| Temps par bilan J+1 | 45 min | 15 min |
| Bilans traités/jour | 12 | 25 |
| Temps réponse chat | 4h | 30 min |
| Satisfaction IDEC | — | >8/10 |

---

*Pensé pour Sophie — Plus de temps pour les aidants qui en ont vraiment besoin.*
