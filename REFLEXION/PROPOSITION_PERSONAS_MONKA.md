# 🎭 Proposition de Personas MONKA – V2 (Approche Pragmatique)

> **Date** : 04/02/2026  
> **Objectif** : Définir les personas AIDANTS et AIDÉS pour personnaliser le questionnaire Monka  
> **Statut** : Proposition à valider  
> **Version** : 2.0 – Approche centrée sur les recommandations

---

## 🧠 Raisonnement : Qu'est-ce qui change VRAIMENT une recommandation ?

### ❌ Ce qu'il ne faut PAS faire

- **Trop de personas (15+)** → Sur-mesure ingérable, impossible à maintenir
- **Personas basés sur des caractéristiques sans impact** → Segmentation inutile
- **Se fier à un chiffre arbitraire** → Le "14" du TODO était une estimation, pas une règle

### ✅ Le bon critère : Une recommandation change-t-elle selon ce persona ?

Pour créer un persona pertinent, il faut se poser cette question :

> *"Si je donne cette recommandation à ce persona vs un autre, est-ce que le contenu, le ton, les acteurs ou les ressources changent significativement ?"*

**Exemples** :
- Un aidant salarié vs retraité → **OUI** les recommandations changent (droits différents, flexibilité différente)
- Un aidant de 40 ans vs 45 ans → **NON** les recommandations sont les mêmes
- Un proche avec TNC vs handicap moteur → **OUI** les ressources et le parcours diffèrent totalement
- Un proche de 70 ans vs 75 ans → **NON** même approche globale

---

## 📐 Analyse des axes de personnalisation

### Pour les AIDANTS : Qu'est-ce qui change les recommandations ?

| Axe de différentiation | Impact recommandations | Verdict |
|------------------------|------------------------|---------|
| **Âge exact** | Quasi nul | ❌ Non pertinent |
| **Sexe** | Faible (quelques ressources féminines) | ❌ Non pertinent |
| **Code postal** | Ressources locales seulement | 🔶 Paramètre, pas persona |
| **Situation pro (actif vs retraité)** | **Fort** : droits salariés, congés aidants, flexibilité | ✅ **PERTINENT** |
| **Niveau d'épuisement** | **Fort** : prévention vs urgence vs accompagnement | ✅ **PERTINENT** |
| **Niveau de soutien** | **Modéré** : mobilisation réseau vs création réseau | ✅ **PERTINENT** |
| **Ancienneté** | **Modéré** : info/orientation vs optimisation | 🔶 Facteur modulant |
| **Lien de parenté** | Faible (recommandations similaires) | ❌ Non pertinent |

### Pour les AIDÉS : Qu'est-ce qui change les recommandations ?

| Axe de différentiation | Impact recommandations | Verdict |
|------------------------|------------------------|---------|
| **Type de situation (N3)** | **TRÈS FORT** : ressources, parcours, droits totalement différents | ✅ **PERTINENT** |
| **Âge précis** | Faible sauf frontière majeur/adulte | 🔶 Facteur (mineur = différent) |
| **Niveau d'autonomie** | **Fort** : maintien vs dépendance → organisation différente | ✅ **PERTINENT** |
| **Troubles cognitifs** | **Fort** : sécurisation, surveillance, relation | ✅ **PERTINENT** mais inclus dans N3 |
| **Lieu de vie** | **Modéré** : domicile vs établissement | 🔶 Facteur modulant |
| **Sexe** | Nul | ❌ Non pertinent |

---

## 🎯 Proposition FINALE : 5 Personas AIDANTS + 5 Personas AIDÉS

### Pourquoi 5 + 5 = 10 ?

| Critère | Justification |
|---------|---------------|
| **Suffisamment précis** | Permet une personnalisation significative des recommandations |
| **Pas trop granulaire** | Maintenable, compréhensible, actionnable |
| **Basé sur l'impact réel** | Chaque persona = recommandations différentes |
| **Industrialisable** | 5 versions par vulnérabilité = 25 versions max au lieu de 70+ |

---

## 👤 LES 5 PERSONAS AIDANTS

### Matrice de décision

```
                    NIVEAU DE FRAGILITÉ                              ┌──────────────┬─────────────┐
                    │ Faible/Modéré │ Élevé/Critique │
┌───────────────────┼───────────────┼─────────────────┤
│ ACTIF (salarié)   │ A1 - Actif    │ A3 - En crise   │
│                   │    équilibré  │                 │
├───────────────────┼───────────────┼─────────────────┤
│ NON-ACTIF         │ A2 - Engagé   │ A3 - En crise   │
│ (retraité, autre) │    stable     │                 │
├───────────────────┼───────────────┼─────────────────┤
│ ISOLÉ (peu de     │ A4 - Isolé    │ A3 - En crise   │
│ soutien)          │               │                 │
└───────────────────┴───────────────┴─────────────────┘
+ A5 - Découvreur (ancienneté < 6 mois, quelle que soit la situation)
```

---

### A1 — Aidant Actif Équilibré 💼

**Qui est-ce ?**  
Aidant en activité professionnelle, situation globalement maîtrisée mais tension travail/aide.

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| N1 | = "Salarié" OU "Fonctionnaire" OU "Indépendant" |
| E7 | ≠ "Épuisé" (pas en crise) |
| O49 | ≥ 6 mois (pas débutant) |

**Ce qui CHANGE dans les recommandations** :
- 📋 **Droits spécifiques** : Congé de proche aidant, AJPA, aménagement horaires
- 🏢 **Acteur RH** : Dialogue employeur, service social entreprise
- ⏰ **Temporalité** : Solutions compatibles avec contraintes pro (soir, weekend, télétravail)
- 💻 **Outils** : Coordination à distance, apps de suivi

**Exemple de recommandation personnalisée** :
> *"En tant que salarié aidant, vous avez droit au congé de proche aidant (jusqu'à 3 mois). Contactez votre service RH pour connaître les modalités. L'AJPA peut compenser partiellement votre salaire."*

---

### A2 — Aidant Engagé Stable 🏠

**Qui est-ce ?**  
Aidant non-actif (retraité, parent au foyer...), disponible, situation sous contrôle.

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| N1 | = "Retraité" OU "Sans emploi" |
| E7 | ≠ "Épuisé" (pas en crise) |
| E2 | ≠ "Personne" (pas isolé) |
| O49 | ≥ 6 mois (pas débutant) |

**Ce qui CHANGE dans les recommandations** :
- 🕐 **Temporalité** : Plus de flexibilité, organisation au quotidien
- 💰 **Ressources** : Aides non liées à l'emploi (APA, PCH, associations)
- 👥 **Réseau** : Mobilisation entourage existant
- 🏥 **Focus santé aidant** : Plus de temps = risque de s'oublier

**Exemple de recommandation personnalisée** :
> *"Votre disponibilité est un atout, mais attention à ne pas vous oublier. Prévoyez au moins 2 créneaux par semaine sanctuarisés pour vous. L'accueil de jour peut vous libérer du temps régulièrement."*

---

### A3 — Aidant en Crise 🔴

**Qui est-ce ?**  
Aidant présentant des signaux d'épuisement critique, quelle que soit sa situation pro.

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| E7 | = "Très fatigué" OU "Épuisé" |
| E11 | = "Difficile" OU "Je ne suis pas sûr" |
| OU CCC | S1_CC_01, S2_CC_01, S3_CC_01 activée |

**Ce qui CHANGE dans les recommandations** :
- 🚨 **Urgence** : Intervention IDEC sous 48h, pas de "quand vous voulez"
- 🏨 **Répit immédiat** : Hébergement temporaire, pas juste accueil de jour
- 🏥 **Médical** : Alerte médecin traitant, arrêt de travail possible
- 👥 **Multi-acteurs** : IDEC + Psy + MT + Répit en coordination

**Exemple de recommandation personnalisée** :
> *"PRIORITÉ : Votre niveau de fatigue est préoccupant. Une infirmière coordinatrice va vous contacter dans les 48h. Un hébergement temporaire de votre proche peut être organisé pour vous permettre de souffler. Ne restez pas seul·e."*

---

### A4 — Aidant Isolé 🏝️

**Qui est-ce ?**  
Aidant seul face à la situation, sans réseau de soutien mobilisable, mais pas encore en crise.

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| E2 | = "Très peu" OU "Personne" |
| N4 | = "Oui" (seul dans la famille) |
| E7 | ≠ "Épuisé" (pas encore en crise) |
| O49 | ≥ 6 mois (pas débutant) |

**Ce qui CHANGE dans les recommandations** :
- 👥 **Création de réseau** : Priorité n°1 avant tout le reste
- 🤝 **Pairs aidants** : Groupes de parole, associations, café aidants
- 📱 **Alternatives** : Coordination pro si pas d'entourage
- ⚠️ **Prévention** : Surveiller l'épuisement (passage vers A3)

**Exemple de recommandation personnalisée** :
> *"Vous portez beaucoup seul·e. La priorité est de créer un réseau de soutien. Connaissez-vous l'association [X] dans votre secteur ? Un groupe de parole d'aidants peut vous apporter du soutien et des contacts utiles."*

---

### A5 — Aidant Découvreur 🌱

**Qui est-ce ?**  
Aidant récent (< 6 mois), en phase d'apprentissage, quelle que soit sa situation.

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| O49 | = "Moins de 6 mois" |
| (tous les autres critères sont ignorés) |

**Ce qui CHANGE dans les recommandations** :
- 📚 **Information** : Priorité absolue, ne connaît pas les ressources
- 🗺️ **Orientation** : Cartographie des acteurs, "qui fait quoi"
- 🎯 **Anticipation** : Préparer l'évolution de la situation
- ✅ **Droits** : Initiation aux démarches (MDPH, APA, etc.)

**Exemple de recommandation personnalisée** :
> *"Vous débutez dans votre rôle d'aidant. Prenez le temps de découvrir les ressources : le point info aidants de votre secteur peut vous recevoir gratuitement. Voici les 3 démarches prioritaires à connaître : [...]"*

---

## 👥 LES 5 PERSONAS AIDÉS

### Logique de construction

Les personas AIDÉS sont basés sur **N3 (type de situation)** car c'est ce qui change le plus les ressources, le parcours et les recommandations.

```
N3 = Type de situation d'aidance
├── Vieillissement → P1 ou P2 selon autonomie
├── Maladie chronique → P2 (si perte autonomie) ou P4 (si autonome)
├── Handicap → P3
├── Troubles psychiques → P4
└── Addictions → P5
```

**Exception** : Les mineurs (O1 < 18 ans) sont un facteur modulant transversal, pas un persona distinct.

---

### P1 — Personne Âgée Autonome 🌿

**Qui est-ce ?**  
Personne de 60+ ans, vieillissement physiologique, autonomie préservée.

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| N3 | = "Perte d'autonomie liée au vieillissement" |
| O1 | ≥ 60 ans |
| O8 + O9 | = "Indépendant" OU "De temps en temps" |
| E23 | ≠ "Ne peut pas rester seul" |

**Ce qui CHANGE dans les recommandations** :
- 🏠 **Prévention** : Adaptation domicile, téléassistance
- 🏥 **Médical** : Suivi gériatrique préventif
- 🚶 **Activité** : Maintien social et physique
- 📋 **Anticipation** : Plans en cas de dégradation

---

### P2 — Personne en Perte d'Autonomie 🛏️

**Qui est-ce ?**  
Personne ayant une perte d'autonomie significative nécessitant une aide quotidienne (vieillissement avancé, maladie chronique invalidante).

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| N3 | = "Vieillissement" OU "Maladie chronique" |
| O8 + O9 | = "Oui, tout le temps" |
| E23 | = "Ne peut pas rester seul" |
| E22 | ≥ 15h d'aide/semaine |

**Ce qui CHANGE dans les recommandations** :
- 🏠 **Organisation** : Coordination intervenants, planning
- 💰 **Droits** : APA, PCH, aides financières
- 🌙 **Sécurité** : Nuit, fugue, chutes
- 🏨 **Projection** : Question du maintien à domicile vs établissement

---

### P3 — Personne en Situation de Handicap 🦽

**Qui est-ce ?**  
Personne de tout âge en situation de handicap (moteur, sensoriel, polyhandicap).

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| N3 | = "En situation de handicap" |
| (tous âges) | |

**Ce qui CHANGE dans les recommandations** :
- 📋 **Parcours MDPH** : PCH, AAH, orientations spécialisées
- 🏫 **Inclusion** : Scolarité adaptée, emploi accompagné
- 🔧 **Aides techniques** : Appareillage, adaptation
- 🔄 **Stabilité** : Situation souvent chronique, organisation long terme

---

### P4 — Personne avec Troubles Psychiques/Cognitifs 🧠

**Qui est-ce ?**  
Personne souffrant de troubles psychiatriques ou de troubles neuro-cognitifs (Alzheimer, démences, schizophrénie, bipolarité...).

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| N3 | = "Troubles psychiques" |
| OU O13 | = "Oui, diminution" OU "Totalement altérées" |
| OU N24 + E26 | = "Oui" (troubles mémoire + désorientation) |

**Ce qui CHANGE dans les recommandations** :
- ⚠️ **Sécurité** : Comportements à risque, surveillance
- 🏥 **Parcours psy** : Suivi spécialisé, observance traitement
- 💕 **Relation** : Gestion émotionnelle, acceptation
- 📞 **Urgence** : Protocole de crise

---

### P5 — Personne avec Addictions 🍺

**Qui est-ce ?**  
Personne souffrant d'addictions sévères impactant son autonomie et sa santé.

**Critères d'identification** :
| Question | Condition |
|----------|-----------|
| N3 | = "Addictions sévères" |

**Ce qui CHANGE dans les recommandations** :
- 🏥 **Parcours addictologie** : CSAPA, sevrage, suivi
- 🔄 **Rechutes** : Accompagnement spécifique, non-jugement
- 💕 **Relation** : Codépendance, limites à poser
- ⚠️ **Sécurité** : Comportements à risque associés

---

## 📊 Tableau Récapitulatif Final

### Personas AIDANTS (5)

| Code | Nom | Critères clés | Recommandations spécifiques |
|------|-----|---------------|----------------------------|
| A1 | **Actif Équilibré** | Salarié/Indép + pas de crise | Droits salariés, flexibilité pro |
| A2 | **Engagé Stable** | Non-actif + pas isolé + pas de crise | Organisation quotidienne, santé aidant |
| A3 | **En Crise** | Épuisement élevé OU CCC activée | Urgence, répit, IDEC prioritaire |
| A4 | **Isolé** | Peu de soutien + pas de crise | Création réseau, pairs aidants |
| A5 | **Découvreur** | Ancienneté < 6 mois | Information, orientation, droits |

### Personas AIDÉS (5)

| Code | Nom | Critères clés | Recommandations spécifiques |
|------|-----|---------------|----------------------------|
| P1 | **Âgé Autonome** | Vieillissement + autonomie OK | Prévention, anticipation |
| P2 | **Perte Autonomie** | Dépendance quotidienne | APA/PCH, organisation, projection |
| P3 | **Handicap** | N3 = Handicap | MDPH, inclusion, aides techniques |
| P4 | **Troubles Psy/Cognitifs** | N3 = Psy OU TNC détectés | Sécurité, parcours spécialisé |
| P5 | **Addictions** | N3 = Addictions | Addictologie, rechutes, relation |

---

## 🔗 Volume de travail estimé

| Métrique | Ancien (14 personas) | Nouveau (10 personas) | Économie |
|----------|---------------------|----------------------|----------|
| Personas total | 14 | 10 | -29% |
| Versions par vulnérabilité | 5 × 14 = 70 | 5 × 10 = 50 | -29% |
| Combinaisons Aidant × Aidé | 7 × 7 = 49 | 5 × 5 = 25 | -49% |
| Maintenabilité | ❌ Complexe | ✅ Gérable | — |

---

## 🎯 Arbre de décision simplifié

### AIDANT

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

### AIDÉ

```
N3 = ?
  ├─ "Addictions" → P5
  ├─ "Troubles psy" → P4
  ├─ "Handicap" → P3
  ├─ "Maladie chronique" → O8/O9 = dépendant ?
  │                            └─ OUI → P2
  │                            └─ NON → P1
  └─ "Vieillissement" → O8/O9 = dépendant ?
                            └─ OUI → P2
                            └─ NON → P1

PUIS : O13/N24/E26 = troubles cognitifs détectés ?
           └─ OUI → Surcharge vers P4 (même si autre N3)
```

---

## ✅ Avantages de cette approche

| Critère | Évaluation |
|---------|------------|
| **Personnalisation** | ✅ Chaque persona = recommandations vraiment différentes |
| **Maintenabilité** | ✅ 10 personas = gérable par une équipe |
| **Clarté** | ✅ Arbres de décision simples |
| **Couverture** | ✅ Tous les cas couverts via les 10 personas |
| **Industrialisation** | ✅ 25 combinaisons réalistes au lieu de 49 |

---

> 📄 Document créé le 04/02/2026 – Version 2.0 (Approche Pragmatique)  
> 🎯 **Statut** : Proposition à valider avec l'équipe Monka
