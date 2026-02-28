# 🎯 PRÉPARATION MEETING CTO — Lundi 3 mars 2026

> **Participants :** Antonin + Marwane (PRAGMA), CTO externe, Benjamin (fondateur), Maël (Monka)
> **Approche :** Hybride — on répond à leur agenda mais on cadre la conversation à notre avantage
> **Objectif :** Prouver par A+B qu'avec l'expertise d'un CTO, on a les capacités pour développer l'app

---

## 1. LE MAIL DE MAËL — CE QU'ILS DEMANDENT

> *"Naviguer dans le code du Kernel afin de comprendre le travail nécessaire pour le rendre 'ready for production'. Parler de votre expérience et compétences de développement et de prototypage afin de réfléchir à la bonne manière de travailler ensemble."*

### Comment on y répond (approche hybride)

| Leur demande | Notre réponse proactive |
|-------------|------------------------|
| "Naviguer dans le code du Kernel" | On montre le **seul code pertinent** : la logique de l'algorithme dans `clinical/engine/`. On ne s'attarde pas sur le code React/UI — c'est du prototypage visuel. |
| "Comprendre le travail pour le rendre ready for production" | On présente un **chiffrage concret** avec gap analysis + estimation de délais. |
| "Parler de vos compétences" | On montre les **preuves** : le Kernel en 4 semaines, le proto UI de Marwane, notre process structuré. |
| "Réfléchir à la bonne manière de travailler ensemble" | On propose le **modèle de collaboration** CTO ↔ PRAGMA avec un sprint pilote immédiat. |

**On répond à TOUT ce qu'ils demandent. Mais c'est NOUS qui menons la danse.**

---

## 2. CONTEXTE À POSER D'ENTRÉE (2 minutes max)

> *"On a construit un simulateur visuel rapide pour que Benjamin et l'équipe puissent VOIR le moteur clinique fonctionner. C'est un outil de test — pas une app de production. Donc pas de RLS, pas de Docker, des clés en dur — le but était la rapidité pour prouver la pertinence clinique. Ce qui a de la valeur et qui ira en production, c'est la logique de l'algorithme. C'est ce qu'on va vous montrer."*

Fin. On ne s'attarde pas. On passe à la présentation.

---

## 3. LA PRÉSENTATION (4 parties)

### Partie 1 — Le Kernel : la logique qu'on a construite (20 min)

**On montre le pipeline de l'algorithme :**

```
QUESTIONNAIRE (165 Q)
     │
     ▼
TRIGGERS (15) → adapte le parcours selon profil aidant
     │
     ▼
RÈGLES D'ACTIVATION (235)
     │ SI question = réponse ALORS activer catégorie de reco
     │ 3 niveaux : 🔴 Critique / 🟠 CCC / 🟢 Standard / ⚪ Prévention
     │
     ▼
MICRO-PARCOURS (24 MP dans 5 Vulnérabilités)
     │ Chaque MP = 1 ASR (objectif mesurable)
     │
     ▼
RECOMMANDATIONS (198) → double wording (aidant + IDEC)
     │
     ▼
MICRO-TÂCHES (369)
     │ Acteur (IDEC, Médecin, Aidant, AS...)
     │ Domaine (🏥 Médical / 🤝 Médico-social)
     │ Type (📍 Contributif / 💡 Accompagnement)
     │
     ▼
SCORING (321 coefficients, 20 seuils) → mesure intensité, ne déclenche PAS de MP
```

**Le seul fichier de code qu'on ouvre** = `clinical/engine/` — la logique TypeScript pure, 0 dépendance React.

**Les concepts clés qu'on maîtrise :**
- CCC (Condition Critique Composite) — combinaison de signaux faibles
- ASR (Action Seuil de Réussite) — objectif mesurable par MP
- K3 (Englobement) — seul le niveau le plus haut s'affiche
- K13 (Scoring indépendant) — le score ne déclenche jamais de MP
- Double wording — même reco, langage aidant vs IDEC

### Partie 2 — Gap Analysis : ce qui existe vs ce qu'il faut (10 min)

**Ce qui est réutilisable tel quel :**

| Élément | Statut | Action |
|---------|--------|--------|
| Logique moteur (`engine/`) | ✅ TypeScript pur, 0 dépendance React | Extraire en module |
| Types partagés (`types/`) | ✅ Interfaces TypeScript clean | Copier |
| Données cliniques (235 règles, 198 recos, 369 MT) | ✅ Structuré | Migrer vers DB HDS |
| Scoring engine | ✅ Logique pure | Extraire |
| Design System UI (proto Marwane) | ✅ 35 composants, 3 écrans, Storybook | Base du frontend |

**Ce qui doit être construit pour la prod :**

| Élément | Qui |
|---------|-----|
| Architecture technique (Docker, staging, CI/CD) | CTO définit |
| Auth + cloisonnement par rôle (RLS) | CTO définit |
| Branchement DB HDS existante | CTO définit |
| Frontend MyMonka V2 | PRAGMA implémente (basé sur proto Marwane) |
| Intégration moteur dans le nouveau repo | PRAGMA implémente (sous direction CTO) |
| Tests automatisés | PRAGMA implémente (sous standards CTO) |

### Partie 3 — Chiffrage et délais (10 min)

**Comparaison : Équipe classique vs PRAGMA + CTO**

| Chantier | Équipe dev classique | PRAGMA (vibecoding) | Pourquoi |
|----------|:---:|:---:|----------|
| Extraction moteur Kernel → module pur | 2 semaines | **2-3 jours** | Déjà du TypeScript pur dans `engine/`, on copie + clean |
| Frontend MyMonka V2 | 3-4 mois | **2-3 semaines** | Marwane a déjà 35 composants + Design System complet |
| Intégration moteur dans l'app | 2 semaines | **2-3 jours** | Architecture data-driven déjà pensée dans le PRD |
| Tests + QA + review CTO | 2 semaines | **1 semaine** | En continu à chaque sprint, pas en fin de projet |
| **TOTAL** | **5-6 mois** | **4-6 semaines** | **x5 à x6 plus rapide** |

> *"Ce n'est pas de la magie — c'est de la méthode. Le vibecoding structuré avec SOPs + la connaissance profonde du produit + un CTO qui définit les rails = résultat prod-ready en 4-6 semaines au lieu de 5-6 mois."*

**Pourquoi c'est réaliste :**

| Preuve | Détail |
|--------|--------|
| **Kernel complet en 4 semaines** | 21 règles, 235 activations, 369 MT, 157 questions certifiées 1 par 1 |
| **Proto UI déjà construit** | 35 composants, Design System Wellness Premium, 3 écrans, Storybook — pas un wireframe, du code qui tourne |
| **PRD MyMonka déjà rédigé** | 37 000 caractères de specs détaillées — le travail de cadrage est FAIT |
| **Connaissance produit = 0 ramp-up** | On connaît les 5V, 24 MP, CCC, ASR, K1-K21. Un dev freelance aurait 1 mois d'onboarding avant de coder. |

### Partie 4 — Comment on travaille ensemble (10 min)

**Le modèle :**

| | CTO | PRAGMA |
|---|---|---|
| **Architecture** | ✅ Définit (Docker, stages, conventions) | Respecte à la lettre |
| **Standards** | ✅ Impose (linting, testing, CI/CD) | Applique dès le jour 1 |
| **Sprint** | ✅ Définit le QUOI (sprint planning) | Exécute le COMMENT (vélocité x10) |
| **Code Review** | ✅ Review chaque PR | Soumet des PRs claires avec contexte |
| **Logique métier** | Valide la technique | ✅ Traduit les besoins cliniques en code |

**Exemple concret d'adaptation :**
> *"Le CTO nous donne ses conventions Docker + CI/CD lundi. Mardi on a notre environnement configuré dans son cadre. Mercredi on soumet notre première PR. C'est aussi simple que ça — il définit les règles, on joue dedans."*

**C'est exactement ce qu'on a fait avec Benjamin :**
Il définissait la logique clinique → on l'implémentait rapidement → il validait → on itérait. Avec un CTO, c'est pareil : il définit l'architecture et les règles, on exécute dans son cadre.

---

## 4. NOS AVANTAGES — POURQUOI PRAGMA ET PAS UN DEV

| Dev classique / Junior | PRAGMA |
|----------------------|--------|
| Ne connaît pas Monka | **4 semaines immergés dans le métier clinique** |
| 1 mois d'onboarding avant de coder | **0 ramp-up — on connaît le produit** |
| Doit apprendre les 21 règles, 5V, 24 MP | **On les a construits** |
| Exécute des specs | **Force de proposition** (on a amélioré le Kernel en cours de route) |
| 100 lignes/jour | **Vélocité x10** grâce au vibecoding structuré |
| Fait du code | **Comprend le business** → peut challenger et améliorer |

### Comment on assure la qualité malgré la vitesse

- SOPs structurés pour chaque phase
- TypeScript strict (le compilateur attrape les erreurs)
- Integrity checks automatisés (157 questions vérifiées 1 par 1)
- Certifications cliniques formelles avec Benjamin
- PRs claires avec contexte → le CTO review et approve
- Documentation exhaustive — tout est tracé

> *"La vitesse sans qualité ne sert à rien. Notre process garantit les deux."*

---

## 5. LES 2 CHANTIERS À DÉFINIR AVEC LE CTO

### Chantier A — App interne (Simulateur / Clinical Engine)

**Question à poser :** *"Est-ce que Monka veut garder une app interne pour tester et visualiser le moteur ?"*

Si oui :
- On pousse l'architecture (DB Supabase OK car 0 données patient)
- On améliore le Simulateur dans un cadre plus propre
- Outil pour Benjamin et l'équipe clinique

### Chantier B — App MyMonka consommateur (PRIORITÉ)

- Nouveau repo, nouveau code, architecture définie par le CTO
- Extraire la logique du Kernel V6 → module TypeScript pur
- L'app : questionnaire → parcours personnalisé → bons MP → bonnes MT
- Frontend basé sur le Design System Wellness Premium de Marwane
- Architecture data-driven : ajout de règles en DB → l'app s'adapte sans refacto
- Hébergement sur la DB HDS existante de Monka

**Question au CTO :**
> *"Comment recommandez-vous qu'on intègre le Kernel dans le nouveau repo : package séparé, module intégré, ou API standalone ?"*

---

## 6. CE QU'ON VEUT EN SORTANT DU MEETING

1. ✅ Le CTO a compris la logique du Kernel et sa valeur
2. ✅ Il valide que l'algorithme est pertinent cliniquement
3. ✅ Une décision est prise sur l'architecture d'intégration
4. ✅ Ses standards sont définis (Docker, CI/CD, conventions)
5. ✅ Un premier sprint est planifié
6. ✅ Il est confiant qu'on peut exécuter sous sa direction

---

## 7. DOCS À AVOIR SOUS LE COUDE

| Document | Ce qu'il contient |
|----------|-------------------|
| `KERNEL/KERNEL_V5.md` | Les 21 règles du moteur |
| `Préparation build MyMonka/CONTEXT_MONKA_APP_PRD.md` | Contexte complet moteur + app + UI |
| `LIVRABLES/PRAGMA_METHODOLOGIE_CTO.md` | Notre méthodologie de travail |
| `Préparation build MyMonka/PRD_MY_MONKA.md` | PRD complet de l'app (37K caractères) |

---

*Approche : hybride. On répond à leur agenda. On mène la danse. On chiffre. On propose. On exécute.*
