# 🏗️ Réflexion Architecturale : Personas, Questions et Recommandations

> **Date** : 04/02/2026  
> **Objectif** : Poser les bases de la personnalisation du questionnaire Monka par personas  
> **Statut** : Document de réflexion / RFC (Request For Comments)

---

## 📊 Inventaire des Questions

### Vue globale

| Catégorie | Vulnérabilités | Questions | IDs |
|-----------|----------------|-----------|-----|
| **TRIGGERS** | — | 12 | N3, O35, O36, N1, O64, O46, O14, O1, O63, N26, E71, E72 |
| **AIDANT** | V1 + V3 + V5 | 60 | Voir détail ci-dessous |
| **AIDÉ** | V2 + V4 | 93 | Voir détail ci-dessous |
| **TOTAL** | — | **165** | — |

### Détail par vulnérabilité

#### Vulnérabilités AIDANT (60 questions)

| Vulnérabilité | Nb | IDs |
|---------------|-----|-----|
| **V1 - Social & Relationnel** | 15 | O47, O48, N4, E1, E2, E3, N20, O27, O28, N7, O30, E4, O31, E5, E6 |
| **V3 - Santé Aidant** | 27 | O29, O33, O49, O50, E7, E8, E9, E10, E11, E12, E13, O32, N8, E14, O37, O38, O39, O40, O41, E15, E16, O42, O43, O44, E17, E18, E19 |
| **V5 - Administrative** | 18 | O45, O23, N6, E61, N42, N29, E62, N43, N5, O61, E63, E64, E65, E66, E67, E68, E69, E70 |

#### Vulnérabilités AIDÉ (93 questions)

| Vulnérabilité | Nb | IDs |
|---------------|-----|-----|
| **V2 - Fragilité du Proche** | 57 | O2, N31, N10, N9, N21, N23, N27, O7, E20, E21, E22, O8, O9, E23, E24, O13, N24, N19, E25, E26, E27, N22, N25, O4, O5, N11, N12, N13, N34, N44, O3, O15, O26, O22, O53, O54, N16, N30, N37, N38, N39, N40, E28, E29, E30, E31, N18, E32, O12, O11, E33, N32, O6, N14, O16, N36, O51 |
| **V4 - Parcours Médical** | 36 | N17, N41, E34, E35, E36, E37, E38, O17, O18, O19, O20, O21, E39, O24, E40, E41, E42, E43, E44, E45, E46, E47, E48, E49, E50, E51, O59, E52, E53, E54, E55, E56, E57, E58, E59, E60 |

---

## 🧠 Réflexion Clé : Les Personas impactent-ils les Recommandations ?

### Principe fondamental

```
PERSONA ──────────────────────────────────────────────────────────────────┐
    │                                                                      │
    ▼                                                                      │
QUESTION ─── Réponse ─── RECOMMANDATION (texte, acteurs, micro-tâches)     │
                              │                                            │
                              ▼                                            │
                    La recommandation CHANGE-t-elle ?  ◄─────────────────-─┘
                              │
                    OUI : Personnalisation nécessaire
                    NON : Version unique suffit
```

### Analyse par type de recommandation

| Type de changement | Exemple | Impact |
|-------------------|---------|--------|
| **Texte / Ton** | Tutoiement vs vouvoiement, langage adapté | Faible |
| **Acteurs mobilisés** | RH entreprise (actif) vs association (non-actif) | **Fort** |
| **Ressources citées** | Congé proche aidant (actif) vs autre | **Fort** |
| **Temporalité** | Urgence (crise) vs préventif (stable) | **Fort** |
| **Micro-tâches** | Contacter employeur vs contacter famille | **Fort** |

**Conclusion** : Ce qui change vraiment = **Acteurs + Ressources + Temporalité + Micro-tâches**

---

## 🔗 Mapping Questions × Personas : Qu'est-ce qui change ?

### Pour les Personas AIDANTS (A1-A5)

| Question | V | Type | A1 Actif | A2 Stable | A3 Crise | A4 Isolé | A5 Découvreur |
|----------|---|------|----------|-----------|----------|----------|---------------|
| E1 (répartition aide) | V1 | CCC | = | = | **+urgence** | **+création réseau** | = |
| E2 (soutien mobilisable) | V1 | Critique | +RH | = | **IDEC** | **prioritaire** | +info |
| E6 (acceptation aide) | V1 | Critique | = | = | **+IDEC** | = | = |
| E7 (épuisement) | V3 | CCC | +arrêt travail | = | **PRIORITÉ** | **surveiller** | +info |
| E11 (capacité continuer) | V3 | CCC | +flexibilité | = | **PRIORITÉ** | = | = |
| O27/O28 (impact vie) | V1 | CCC | **+conciliation** | = | **+répit** | = | = |
| E68 (temps admin) | V5 | Décl. | +flexibilité | = | **déléguer** | = | +orientation |
| N8 (arrêt travail) | V3 | Critique | **spécifique** | N/A | = | = | = |

**Légende** : `=` même recommandation | `+X` ajout spécifique | **gras** = changement majeur

### Pour les Personas AIDÉS (P1-P5)

| Question | V | Type | P1 Âgé Auto | P2 Dépendant | P3 Handicap | P4 Psy/TNC | P5 Addictions |
|----------|---|------|-------------|--------------|-------------|------------|---------------|
| N3 (situation) | Trigger | — | N/A | N/A | **spécifique** | **spécifique** | **spécifique** |
| O8/O9 (autonomie) | V2 | Scoring | = | **+APA** | **+PCH** | = | = |
| E23 (rester seul) | V2 | Décl. | +téléassistance | **+intervenants** | = | **+surveillance** | = |
| E27 (comportements danger) | V2 | Critique | = | = | = | **PRIORITÉ** | **+lien addiction** |
| O13/N24 (troubles cognitifs) | V2 | Décl. | = | = | = | **spécifique** | = |
| E47 (plan aggravation) | V4 | Décl. | +anticipation | **+urgences** | = | **protocole crise** | = |
| E50 (observance psy) | V4 | Décl. | N/A | N/A | N/A | **spécifique** | N/A |
| E51 (volonté addiction) | V4 | Décl. | N/A | N/A | N/A | N/A | **spécifique** |

---

## 🏗️ Nouvelle Structure Proposée du Questionnaire

### Flux actuel (problème)

```
┌─────────────────────────────────────────────────────────────┐
│  QUESTIONNAIRE ACTUEL                                        │
│                                                              │
│  V1 ─► V2 ─► V3 ─► V4 ─► V5                                 │
│  (toutes les questions en séquence)                         │
│                                                              │
│  Problème : Les triggers sont mélangés dans les blocs       │
│             Impossible de personnaliser en amont            │
└─────────────────────────────────────────────────────────────┘
```

### Flux proposé (solution)

```
┌─────────────────────────────────────────────────────────────┐
│  QUESTIONNAIRE RESTRUCTURÉ                                   │
│                                                              │
│  ÉTAPE 1 : TRIGGERS (12 questions)                          │
│  ├── Bloc Aidant : N3, O35, O36, N1, O64, O46              │
│  └── Bloc Aidé : O14, O1, O63, N26, E71, E72              │
│                          │                                   │
│                          ▼                                   │
│  ÉTAPE 2 : IDENTIFICATION PERSONAS                          │
│  ├── Persona AIDANT identifié (A1-A5)                       │
│  └── Persona AIDÉ identifié (P1-P5)                         │
│                          │                                   │
│                          ▼                                   │
│  ÉTAPE 3 : QUESTIONS VULNÉRABILITÉS                         │
│  ├── V1 Social (15Q) ─── Recommandations [Persona Aidant]   │
│  ├── V2 Fragilité (57Q) ─ Recommandations [Persona Aidé]    │
│  ├── V3 Santé (27Q) ─── Recommandations [Persona Aidant]    │
│  ├── V4 Parcours (36Q) ─ Recommandations [Persona Aidé]     │
│  └── V5 Admin (18Q) ─── Recommandations [Persona Aidant]    │
│                          │                                   │
│                          ▼                                   │
│  ÉTAPE 4 : CCC ÉVALUÉES AVEC CONTEXTE PERSONA               │
│  ├── CCC V1 ─── Acteurs/Temporalité ajustés                 │
│  ├── CCC V2 ─── Ressources spécifiques                      │
│  └── ...                                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Impact sur la Structure des Fichiers

### Structure actuelle (base/)

```
QUESTIONNAIRE/
├── V1_social_relationnel/
│   └── base/
│       ├── questions.md
│       ├── recommendations.md        ← Version unique
│       ├── ccc.md
│       └── ...
```

### Structure proposée (base/ + personas/)

```
QUESTIONNAIRE/
├── V1_social_relationnel/
│   ├── base/
│   │   ├── questions.md              ← UNCHANGED (questions identiques)
│   │   ├── recommendations.md        ← Version par défaut
│   │   ├── ccc.md
│   │   └── ...
│   │
│   └── personas/                     ← NOUVEAU
│       ├── A1_actif/
│       │   └── recommendations_override.md   ← DELTA uniquement
│       ├── A2_stable/
│       │   └── recommendations_override.md
│       ├── A3_crise/
│       │   └── recommendations_override.md
│       ├── A4_isole/
│       │   └── recommendations_override.md
│       └── A5_decouvreur/
│           └── recommendations_override.md
```

### Principe du DELTA (override)

Au lieu de dupliquer 100% des recommandations, on stocke **uniquement ce qui change** :

```markdown
# recommendations_override.md (Persona A1 - Actif)

## Question E2 - Soutien mobilisable

### Override pour "Très peu / personne"

**Acteurs additionnels** :
- Service RH de l'entreprise
- Assistante sociale du travail

**Micro-tâches spécifiques** :
- Se renseigner sur les dispositifs d'aide aux salariés aidants
- Vérifier l'existence d'un accord aidants dans l'entreprise

---

## Question N8 - Arrêt de travail

### Override pour "Oui"

**Recommandation complète** (remplace la version base) :
> Vous avez dû vous arrêter pour votre rôle d'aidant. C'est un signal important.
> Le congé de proche aidant (CPA) peut être une alternative à l'arrêt maladie.
> Contactez votre RH pour en discuter.

**Acteurs** : RH + Médecin traitant + Médecin du travail
```

---

## 🔄 Logique d'assemblage des Recommandations

### Algorithme

```
FONCTION afficher_recommandation(question_id, reponse, persona_aidant, persona_aide):
    
    # 1. Charger la recommandation de base
    reco = charger("base/recommendations.md", question_id, reponse)
    
    # 2. Déterminer si c'est une question AIDANT ou AIDÉ
    SI question_id IN questions_aidant:
        persona = persona_aidant
    SINON:
        persona = persona_aide
    
    # 3. Chercher un override
    override_path = f"personas/{persona}/recommendations_override.md"
    SI existe(override_path, question_id, reponse):
        override = charger(override_path, question_id, reponse)
        
        # 4. Appliquer l'override
        SI override.type == "REMPLACEMENT":
            reco = override.contenu
        SINON SI override.type == "AJOUT":
            reco.acteurs += override.acteurs
            reco.micro_taches += override.micro_taches
    
    RETOURNER reco
```

---

## 📋 Questions à Trancher

### 1. Granularité des overrides

| Option | Avantage | Inconvénient |
|--------|----------|--------------|
| **Override par question** | Précis | Beaucoup de fichiers |
| **Override par fichier unique** | Simple | Gros fichier |
| **Override par bloc** | Équilibré | Complexité moyenne |

**Proposition** : Un fichier `recommendations_override.md` par persona, avec les overrides listés par question.

### 2. Quelles questions doivent avoir des overrides ?

À partir du mapping ci-dessus, les questions avec **changement fort** :

#### Pour les Personas AIDANTS :
- E2 (soutien) → A1, A4
- E7/E11 (épuisement) → A3
- O27/O28 (impact vie) → A1
- N8 (arrêt travail) → A1 uniquement
- E68 (temps admin) → A1, A5

#### Pour les Personas AIDÉS :
- O8/O9 (autonomie) → P2, P3
- E27 (comportements) → P4, P5
- E47 (plan aggravation) → P2, P4
- E50 (observance psy) → P4 uniquement
- E51 (addiction) → P5 uniquement

### 3. Les CCC doivent-elles être versionnées par persona ?

**Analyse** :

| CCC | Change selon persona ? | Détail |
|-----|------------------------|--------|
| S1_CC_01 (épuisement) | **OUI** | A1 = + arrêt travail, A3 = PRIORITÉ absolue |
| R2_CC_01 (isolement) | **OUI** | A4 = recommandation centrale |
| R1_CC_01 (impact vie) | **OUI** | A1 = focus conciliation travail |
| CCC autres | Non | Mêmes recommandations |

**Proposition** : Créer un fichier `ccc_override.md` pour les personas concernés.

---

## 📅 Proposition de Mise en Œuvre

### Phase 1 : Infrastructure (1-2 jours)
- [ ] Créer la structure de dossiers `personas/` pour V1-V5
- [ ] Définir le format standard des fichiers `recommendations_override.md`
- [ ] Documenter l'algorithme d'assemblage

### Phase 2 : Contenu Prioritaire (3-5 jours)
- [ ] Rédiger les overrides pour **A3 (Crise)** - le plus urgent
- [ ] Rédiger les overrides pour **A1 (Actif)** - le plus spécifique
- [ ] Rédiger les overrides pour **P4 (Psy/TNC)** - le plus différent

### Phase 3 : Contenu Complet (5-7 jours)
- [ ] Compléter les overrides pour A2, A4, A5
- [ ] Compléter les overrides pour P1, P2, P3, P5
- [ ] Créer les `ccc_override.md` nécessaires

### Phase 4 : Simulateur (2-3 jours)
- [ ] Modifier le simulateur pour :
  - [ ] Poser les triggers en premier
  - [ ] Identifier les personas
  - [ ] Charger les recommandations avec overrides

---

## ✅ Récapitulatif

| Élément | Décision proposée |
|---------|-------------------|
| **Triggers** | 12 questions en premier dans le questionnaire |
| **Personas** | 5 AIDANTS (A1-A5) + 5 AIDÉS (P1-P5) |
| **Questions** | UNCHANGED - mêmes questions pour tous |
| **Recommandations** | Base + Overrides par persona |
| **CCC** | Base + Overrides pour A1, A3, A4, P4, P5 |
| **Structure fichiers** | `base/` + `personas/{code}/` |
| **Principe** | DELTA uniquement (pas de duplication) |

---

## 🔜 Prochaines étapes

1. **Valider cette architecture** avec l'équipe
2. **Choisir les 3-5 questions** les plus impactées pour un POC
3. **Créer les premiers overrides** et tester
4. **Itérer** sur le format et la granularité

---

> 📄 Document créé le 04/02/2026  
> 🎯 **Statut** : RFC à valider avant implémentation
