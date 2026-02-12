# 🎯 Questions Triggers & Personas — Le Cadrage Intelligent de Monka

> **Document de vulgarisation** — 11/02/2026
> **Audience** : Équipe Monka, investisseurs, partenaires cliniques
> **Objectif** : Comprendre le rôle des 15 questions triggers et ce que les personas apportent

---

## 🧠 Partie 1 — Les 15 Questions Triggers

### C'est quoi une question trigger ?

Sur les **157 questions** du questionnaire Monka, **15 n'appartiennent à aucune vulnérabilité** (V1-V5). Ce sont les **questions triggers**.

Elles ne mesurent pas un état, ne détectent pas un risque. Elles ont un rôle radicalement différent :

> **Les triggers cadrent le contexte.** Elles disent à Monka **qui est l'aidant, qui est le proche, et dans quelle situation ils vivent** — AVANT que le moteur ne commence à évaluer quoi que ce soit.

### 🍳 L'analogie

Imaginez un médecin qui reçoit un patient. Avant même de l'ausculter, il pose des questions :
- *« Quel âge avez-vous ? »*
- *« Quel est votre métier ? »*
- *« Depuis quand avez-vous ces symptômes ? »*

Ces questions ne sont pas un diagnostic. Elles **orientent** le diagnostic. C'est exactement le rôle des triggers dans Monka.

---

### Les 15 questions triggers en détail

#### 🔵 Bloc 1 — Vous, l'aidant (7 questions)

| # | ID | Question | Ce que Monka apprend |
|---|---|---|---|
| 1 | **O35** | Quel est votre sexe biologique ? | Profil démographique |
| 2 | **O36** | Quel est votre âge ? | Tranche d'âge → risque spécifique |
| 3 | **N1** | Quelle activité exercez-vous ? | Actif / retraité / étudiant → droits différents |
| 4 | **O46** | Quel est votre lien de parenté avec la personne aidée ? | Conjoint / enfant / parent → vécu différent |
| 5 | **O64** | Quel est votre code postal ? | Recommandations géolocalisées |
| 6 | **O49** | Depuis combien de temps l'aidez-vous ? | Débutant (< 6 mois) vs expérimenté |
| 7 | **N3** | Quelle proposition correspond le mieux à votre situation ? | Type de situation d'aidance (vieillissement, handicap, psy, addiction...) |

#### 🟢 Bloc 2 — Votre proche (4 questions)

| # | ID | Question | Ce que Monka apprend |
|---|---|---|---|
| 8 | **O14** | Quel est le sexe biologique de la personne aidée ? | Informations de santé adaptées |
| 9 | **O1** | Quel est l'âge de la personne aidée ? | Mineur, adulte, senior → parcours différents |
| 10 | **O63** | Quel est le code postal du domicile de la personne aidée ? | Proximité aidant/aidé + ressources locales |
| 11 | **O2** | Où vit la personne aidée aujourd'hui ? | Domicile, établissement, famille → organisation différente |

#### 🟡 Bloc 3 — Contexte médical (1 question)

| # | ID | Question | Ce que Monka apprend |
|---|---|---|---|
| 12 | **N31** | La personne bénéficie-t-elle d'une prise en charge en établissement spécialisé ? | Niveau d'encadrement existant |

#### 🟣 Bloc 4 — Priorités et orientation (3 questions)

| # | ID | Question | Ce que Monka apprend |
|---|---|---|---|
| 13 | **N26** | Quels sont les besoins complémentaires nécessaires selon vous ? | Orientation des micro-parcours |
| 14 | **E71** | Quelle est votre priorité principale ? | Focus du parcours (santé, sécurité, admin, conciliation...) |
| 15 | **E72** | Acceptez-vous qu'une IDEC Monka vous contacte ? | Consentement au contact — porte d'entrée de l'accompagnement |

---

### Pourquoi les triggers sont essentiels

#### 1. Ils ne scorent JAMAIS

Les triggers ne participent à **aucun scoring**, aucune des 5 vulnérabilités. Zéro point. C'est une règle absolue.

> **Pourquoi ?** Parce qu'être un homme de 50 ans n'est pas une vulnérabilité. Être salarié n'est pas un facteur de risque en soi. Les triggers décrivent un **contexte**, pas un **état**.

#### 2. Ils orientent TOUT

Même s'ils ne comptent pas dans le score, les triggers conditionnent l'ensemble de l'expérience :

| Dimension | Sans triggers | Avec triggers |
|---|---|---|
| Recommandations | Génériques | Adaptées au profil |
| Ressources citées | Nationales | Géolocalisées |
| Droits mentionnés | Tous les droits | Ceux de l'aidant (salarié ≠ retraité) |
| Urgence perçue | Identique | Ajustée au contexte |
| Parcours | Unique | Personnalisé |

#### 3. Ils sont posés EN PREMIER

Dans l'architecture KERNEL, les triggers sont les **premières questions** du questionnaire, AVANT les 5 vulnérabilités. C'est logique : pour évaluer une situation, il faut d'abord savoir à qui on parle.

```
Flux KERNEL :

ÉTAPE 1 → 15 Triggers (cadrage)
      │
      ▼
ÉTAPE 2 → Identification du persona (aidant + aidé)
      │
      ▼
ÉTAPE 3 → 142 Questions V1-V5 (évaluation)
      │
      ▼
ÉTAPE 4 → Scoring + Activation → Recos → MTs personnalisées
```

---

### Les triggers en chiffres

| Métrique | Valeur |
|---|---|
| **Questions triggers** | 15 / 157 (10%) |
| Rattachées à une vulnérabilité | 0 |
| Participent au scoring | 0 |
| Contribuent au suivi N1-N3 | 0 |
| Posées à l'onboarding | 15/15 (100%) |
| Servent à identifier le persona | 7/15 directement |

---

## 👥 Partie 2 — Les Personas : la personnalisation du moteur

### Le constat

Aujourd'hui, le KERNEL traite **tous les aidants de la même façon** : mêmes 68 règles d'activation, mêmes 102 recos, mêmes 263 MTs. C'est **cliniquement rigoureux** mais pas **personnellement optimal**.

Un fils de 50 ans salarié qui aide sa mère Alzheimer et une jeune femme de 25 ans qui aide son conjoint handicapé ont les mêmes besoins cliniques mais pas les mêmes besoins pratiques.

### La solution : 10 personas (5 aidants + 5 aidés)

Les triggers permettent d'identifier **automatiquement** 2 personas pour chaque aidant :
- Un **persona AIDANT** (A1-A5) basé sur sa situation personnelle
- Un **persona AIDÉ** (P1-P5) basé sur la pathologie du proche

---

## 👤 Les 5 Personas AIDANTS

### Arbre de décision

```
O49 < 6 mois ?
  └─ OUI → A5 (Découvreur)
  └─ NON → E7 = Épuisé OU CCC activée ?
              └─ OUI → A3 (En Crise)
              └─ NON → E2 = Personne ET N4 = Oui ?
                          └─ OUI → A4 (Isolé)
                          └─ NON → N1 = Salarié/Indép/Fonctionnaire ?
                                      └─ OUI → A1 (Actif Équilibré)
                                      └─ NON → A2 (Engagé Stable)
```

---

### A1 — Aidant Actif Équilibré 💼

| Critère | Condition |
|---|---|
| **Activité** (N1) | Salarié, fonctionnaire ou indépendant |
| **Épuisement** (E7) | Pas en crise |
| **Ancienneté** (O49) | ≥ 6 mois |

**Ce qui change dans les recos et MTs :**
- 📋 **Droits spécifiques** : congé de proche aidant (CPA), AJPA, aménagement horaires
- 🏢 **Acteur additionnel** : Service RH, médecin du travail, AS d'entreprise
- ⏰ **Temporalité** : solutions compatibles avec les contraintes pro
- 💻 **Outils** : coordination à distance, apps de suivi

> *Exemple :* « En tant que salarié aidant, vous avez droit au congé de proche aidant. Contactez votre RH pour connaître les modalités. »

---

### A2 — Aidant Engagé Stable 🏠

| Critère | Condition |
|---|---|
| **Activité** (N1) | Retraité ou sans emploi |
| **Épuisement** (E7) | Pas en crise |
| **Soutien** (E2) | A du soutien (pas isolé) |
| **Ancienneté** (O49) | ≥ 6 mois |

**Ce qui change :**
- 🕐 **Plus de flexibilité** — organisation au quotidien
- 💰 **Ressources** : aides non liées à l'emploi (APA, PCH, associations)
- 🏥 **Focus santé** : plus de temps = risque de s'oublier

> *Exemple :* « Votre disponibilité est un atout, mais attention à ne pas vous oublier. Prévoyez au moins 2 créneaux par semaine sanctuarisés pour vous. »

---

### A3 — Aidant en Crise 🔴

| Critère | Condition |
|---|---|
| **Épuisement** (E7) | Très fatigué → Épuisé |
| **Ou capacité** (E11) | « Je ne suis pas sûr(e) » / « Non » |
| **Ou** | CCC santé activée |

**Ce qui change :**
- 🚨 **Urgence** : intervention IDEC sous 48h
- 🏨 **Répit immédiat** : hébergement temporaire, pas juste accueil de jour
- 🏥 **Médical** : alerte médecin traitant, arrêt travail possible
- 👥 **Multi-acteurs** : IDEC + Psy + MT + Répit en coordination

> *Exemple :* « PRIORITÉ : Votre niveau de fatigue est préoccupant. Une IDEC va vous contacter dans les 48h. Un hébergement temporaire de votre proche peut être organisé. »

---

### A4 — Aidant Isolé 🏝️

| Critère | Condition |
|---|---|
| **Soutien** (E2) | « Très peu » ou « Personne » |
| **Seul** (N4) | Oui, seul dans la famille |
| **Épuisement** (E7) | Pas encore en crise |

**Ce qui change :**
- 👥 **Création de réseau** priorité n°1
- 🤝 **Pairs aidants** : groupes de parole, café aidants, associations
- 📱 **Alternatives** : coordination pro si pas d'entourage
- ⚠️ **Vigilance épuisement** : risque de basculer vers A3

> *Exemple :* « Vous portez beaucoup seul·e. Connaissez-vous l'association [X] dans votre secteur ? Un groupe de parole peut vous apporter du soutien. »

---

### A5 — Aidant Découvreur 🌱

| Critère | Condition |
|---|---|
| **Ancienneté** (O49) | < 6 mois |
| *(tous les autres critères ignorés)* | |

**Ce qui change :**
- 📚 **Information** : priorité absolue, ne connaît pas les ressources
- 🗺️ **Cartographie** : « qui fait quoi » — acteurs, droits, parcours
- 🎯 **Anticipation** : préparer l'évolution de la situation
- ✅ **Droits** : initiation aux démarches (MDPH, APA, etc.)

> *Exemple :* « Vous débutez dans votre rôle d'aidant. Le point info aidants de votre secteur peut vous recevoir gratuitement. Voici les 3 premières démarches : [...] »

---

## 👥 Les 5 Personas AIDÉS

### Arbre de décision

```
N3 = ?
  ├─ "Addictions sévères" → P5
  ├─ "Troubles psychiques" → P4
  ├─ "Handicap" → P3
  ├─ "Maladie chronique" → Autonomie préservée ?
  │                           └─ NON → P2 (Perte d'autonomie)
  │                           └─ OUI → P1 (Autonome)
  └─ "Vieillissement" → Autonomie préservée ?
                           └─ NON → P2 (Perte d'autonomie)
                           └─ OUI → P1 (Autonome)

PUIS : Troubles cognitifs détectés (O13/N24/E26) ?
         └─ OUI → Surcharge vers P4 (quel que soit le N3)
```

---

### P1 — Personne Âgée Autonome 🌿

| Critère | Condition |
|---|---|
| **Situation** (N3) | Vieillissement ou maladie chronique |
| **Autonomie** | Préservée (peut rester seul·e) |

**Recos spécifiques** : prévention chute, téléassistance, suivi gériatrique préventif, adaptation domicile, anticipation dégradation

---

### P2 — Personne en Perte d'Autonomie 🛏️

| Critère | Condition |
|---|---|
| **Situation** (N3) | Vieillissement ou maladie chronique |
| **Autonomie** | Dépendante au quotidien |

**Recos spécifiques** : APA, PCH, coordination intervenants, sécurité nuit, question maintien domicile vs établissement

---

### P3 — Personne en Situation de Handicap ♿

| Critère | Condition |
|---|---|
| **Situation** (N3) | En situation de handicap |

**Recos spécifiques** : parcours MDPH (PCH, AAH), inclusion scolaire/pro, aides techniques, appareillage, organisation long terme

---

### P4 — Personne avec Troubles Psychiques/Cognitifs 🧠

| Critère | Condition |
|---|---|
| **Situation** (N3) | Troubles psychiques |
| **Ou** détection TNC | O13 + N24 + E26 positifs |

**Recos spécifiques** : sécurité comportementale, parcours psy, observance traitement, protocole de crise, gestion émotionnelle

---

### P5 — Personne avec Addictions 🍷

| Critère | Condition |
|---|---|
| **Situation** (N3) | Addictions sévères |

**Recos spécifiques** : parcours addictologie (CSAPA), gestion rechutes, codépendance, limites à poser, sécurité associée

---

## 🔄 Partie 3 — Triggers × Personas × KERNEL : comment tout s'articule

### Le mécanisme d'override

Les personas ne remplacent pas le KERNEL — ils ajoutent une **couche de personnalisation** par-dessus :

```
┌──────────────────────────────────────────────────────┐
│  COUCHE 1 — KERNEL BASE (identique pour tous)        │
│  68 règles → 22 MPs → 102 recos → 263 MTs            │
└────────────────────┬─────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────┐
│  COUCHE 2 — OVERRIDE PERSONA (personnalisé)          │
│  Ajuste : niveaux d'urgence, textes recos,            │
│  acteurs mobilisés, MTs spécifiques, ressources       │
└──────────────────────────────────────────────────────┘
```

**Principe clé** : on stocke uniquement le **DELTA** (ce qui change), pas une copie complète. Si 80% des recos sont identiques quel que soit le persona, on ne documente que les 20% qui diffèrent.

### Ce que les personas changent concrètement

| Dimension | Exemple A1 (Actif) | Exemple A3 (Crise) | Exemple P4 (Psy) |
|---|---|---|---|
| **Acteurs** | + Service RH | + Psy en urgence | + CMP, CSAPA |
| **Délai** | Compatible avec le travail | ≤ 48h | Protocole crise |
| **Ressources** | Congé proche aidant | Hébergement temporaire | Suivi observance |
| **Ton** | Informatif | Urgent, directif | Pédagogique |
| **MTs spécifiques** | Contacter employeur | Contacter IDEC immédiat | Sécuriser domicile |

### Impact business

| Métrique | Sans personas | Avec personas |
|---|---|---|
| **Pertinence perçue** | « Correct mais générique » | « Ils comprennent ma situation » |
| **Combinaisons** | 1 parcours unique | 5 × 5 = 25 combinaisons |
| **Maintenance** | 1 jeu de recos | 1 base + deltas ciblés |
| **Scalabilité** | Linéaire | Exponentielle (nouveaux personas sans refonte) |

---

## 📊 Récapitulatif

| Élément | Rôle | Volume |
|---|---|---|
| **15 Questions Triggers** | Cadrage contextuel — posées en premier, ne scorent jamais | 10% du questionnaire |
| **5 Personas Aidant** (A1-A5) | Personnalisation par situation de l'aidant | Actif, Stable, Crise, Isolé, Découvreur |
| **5 Personas Aidé** (P1-P5) | Personnalisation par pathologie du proche | Autonome, Perte autonomie, Handicap, Psy/TNC, Addictions |
| **KERNEL base** | Moteur déterministe universel — socle inchangé | 68 règles, 22 MPs, 263 MTs |
| **Overrides personas** | Delta personnalisé par-dessus le KERNEL | Acteurs, délais, textes, MTs spécifiques |

> **Message clé** : Les 15 triggers sont l'entrée du système. Ils permettent à Monka de savoir **à qui il parle** avant de décider **quoi faire**. Les personas transforment un moteur clinique rigoureux en un accompagnement **personnellement pertinent** — sans jamais compromettre la rigueur du KERNEL.
