# 🗄️ Schéma Supabase Monka — Proposition

> **Date** : 09/02/2026  
> **Objectif** : Structurer la base de données pour couvrir les Phases 1→3 de la TODO  
> **Principe** : On crée les tables au fur et à mesure, pas tout d'un coup

---

## Vue d'ensemble

```
PHASE 1a+1b+2a (✅ LIVE)                  PHASE 2b (après validation Dr. Monka)
──────────────────────                     ──────────────────────────────────────

┌──────────────────┐                       ┌──────────────────────┐
│  vulnerabilities │                       │  recommendations     │
│  (5 lignes) ✅   │◄──┐                  └──────┬───────────────┘
└──────┬───────────┘   │                          │ 1:N
       │ 1:N           │                          ▼
       ▼               │                   ┌──────────────────────┐
┌──────────────────┐   │                   │  micro_taches        │
│  questions       │   │                   └──────────────────────┘
│  (165 lignes) ✅ │   │
└──────┬───────────┘   │
       │               │
       │ N:N           │ 1:N
       ▼               │
┌────────────────────┐ │
│ question_mp_mapping│ │
│ (155 lignes) ✅    │ │
└──────┬─────────────┘ │
       │ N:1           │
       ▼               │
┌──────────────────┐   │
│  micro_parcours  │───┘
│  (24 lignes) ✅  │
└──────┬───────────┘
       │ 1:N
       ▼
┌──────────────────────┐
│  activation_rules    │
│  (68 lignes) ✅      │
│  12 🔴 + 28 🟠 + 28 🟢│
└──────────────────────┘
       │ FK
       ▼
┌──────────────────────┐
│  suivi_questions     │
│  (30 lignes) ✅      │
└──────────────────────┘
```

---

## PHASE 1 — Tables à créer maintenant

### Table 1 : `vulnerabilities`

**Rôle** : Les 5 dimensions de vulnérabilité. C'est le socle de tout — chaque question, chaque MP, chaque reco est rattachée à une vulnérabilité.

| Colonne | Type | Exemple | Description |
|---------|------|---------|-------------|
| `id` | TEXT PK | `V1` | Identifiant court |
| `name` | TEXT | `Social et relationnel` | Nom complet |
| `bloc_id` | INT | `3` | Numéro du bloc dans le questionnaire |
| `bloc_label` | TEXT | `Bloc 3 – Votre entourage...` | Libellé du bloc |
| `question_count` | INT | `15` | Nombre de questions (hors triggers) |

**5 lignes, jamais modifié.** C'est une table de référence.

---

### Table 2 : `questions`

**Rôle** : Les 165 éléments du questionnaire figé (150 questions + 15 triggers). C'est la **table centrale**. Tout dans Monka part d'une question.

| Colonne | Type | Exemple | Description |
|---------|------|---------|-------------|
| `id` | TEXT PK | `E1` | ID unique de la question |
| `ordre_global` | INT | `17` | Position dans le questionnaire |
| `vulnerability_id` | TEXT FK | `V1` | → vulnerabilities. Pour les triggers : la vulnérabilité associée dans le référentiel, ou NULL |
| `bloc_id` | INT | `3` | Numéro de bloc |
| `bloc` | TEXT | `Bloc 3 – Votre entourage` | Libellé du bloc |
| `sous_bloc` | TEXT | `Réseau d'aide & entourage` | Sous-catégorie thématique |
| `question_text` | TEXT | `Comment se passe la répartition…` | Le libellé complet de la question |
| `response_type` | TEXT | `Obligatoire / Choix Unique` | Type de réponse attendue |
| `response_options` | JSONB | `["Oui", "Non", "Parfois"]` | Les options de réponse, dans l'ordre |
| `is_trigger` | BOOLEAN | `false` | Est-ce un trigger (question de contexte) ? |
| `classification` | TEXT NULL | `facteur` | Classification état/facteur (depuis le référentiel). NULL pour les 12 triggers purement démographiques |
| `aidance` | TEXT NULL | `Tous` | Type d'aidance concerné |
| `sous_categorie_ref` | TEXT NULL | `Proximité & fréquence de contact` | Sous-catégorie du référentiel état/facteur |

**165 lignes, figées.** C'est la source de vérité pour toutes les questions.

#### Pourquoi `response_options` en JSONB et pas une table séparée ?

Tu as raison de questionner la table `options` que j'avais proposée avant. **On n'en a pas besoin maintenant** parce que :
- Les options sont une liste ordonnée simple (pas de métadonnée propre à chaque option pour l'instant)
- Le scoring (quel score pour quelle option) sera défini en Phase 2 dans les rules d'activation
- Stocker en JSONB garde les données lisibles et exportables facilement

Si en Phase 2 on a besoin d'attacher un score, un déclencheur ou un poids à chaque option individuellement, on pourra extraire les options dans une table dédiée à ce moment-là.

---

## PHASE 1b — Tables live (créées le 09/02/2026)

### Table 3 : `micro_parcours` ✅

**Rôle** : Les 24 micro-parcours. Chaque MP a un objectif (ASR) et appartient à une vulnérabilité.

| Colonne | Type | Exemple | Description |
|---------|------|---------|-------------|
| `id` | TEXT PK | `R1` | Identifiant court (R1-R4, F1-F6, S1-S4, M1-M6, A1-A4) |
| `vulnerability_id` | TEXT FK | `V1` | → vulnerabilities |
| `nom` | TEXT | `Impact sur la vie personnelle...` | Nom du micro-parcours |
| `objectif` | TEXT | `Mesurer l'impact de l'aidance...` | L'objectif utilisateur |
| `signature_a` | TEXT | `R1-A : Impact maîtrisé` | Signature d'état positive |
| `signature_b` | TEXT | `R1-B : Impact en dégradation` | Signature d'état négative |

**24 lignes** : V1→R1-R4 (4), V2→F1-F6 (6), V3→S1-S4 (4), V4→M1-M6 (6), V5→A1-A4 (4)

### Table 4 : `question_mp_mapping` ✅

**Rôle** : Relation N:N entre questions et micro-parcours. Chaque question est liée à au moins 1 MP.

| Colonne | Type | Exemple | Description |
|---------|------|---------|-------------|
| `id` | SERIAL PK | `1` | Auto-incrémenté |
| `question_id` | TEXT | `N7` | → questions.id |
| `mp_id` | TEXT FK | `R1` | → micro_parcours.id |
| `source` | TEXT | `legacy` / `auto` | Origine du mapping |

**159 lignes** : 154 legacy + 5 auto (à valider). 5 questions ont 2 MP.

---

## PHASE 2 — Tables futures (après validation)

> ⚠️ **Ces tables ne seront créées que quand les recos et MT seront redéfinies** selon le KERNEL.

### Table 5 : `activation_rules`

**Rôle** : Quelles réponses à quelles questions activent quel MP, et à quel niveau de priorité (K2).

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `micro_parcours_id` | TEXT FK | → micro_parcours |
| `niveau` | INT | 1 (Critique), 2 (CCC), 3 (Standard) |
| `question_id` | TEXT FK | → questions |
| `condition` | JSONB | Ex: `{"option": "Oui, souvent", "operator": "eq"}` |
| `delai_jours` | INT | 7, 30, ou 90 selon le niveau |

### Table 5 : `recommendations`

**Rôle** : Les recommandations par MP et par niveau d'activation. Une reco est une **enveloppe de micro-tâches** (K5).

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `micro_parcours_id` | TEXT FK | → micro_parcours |
| `niveau_activation` | INT | 1, 2, 3, ou 0 (prévention) |
| `libelle` | TEXT | Titre de la recommandation |
| `delegation` | TEXT | Qui fait (aidant, IDEC, les deux) |

### Table 6 : `micro_taches`

**Rôle** : Les actions concrètes à l'intérieur de chaque recommandation.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `recommendation_id` | INT FK | → recommendations |
| `libelle` | TEXT | Description de la MT |
| `type` | TEXT | STRUC, SEC, MED, INFO, ORGA (K10) |
| `is_contributive` | BOOLEAN | Contribue à l'ASR ? (STRUC/SEC/MED = oui) |

---

## Et le questionnaire de suivi ?

**Pas de table séparée `suivi_questions`.** Et voici pourquoi :

Le suivi dans le KERNEL (K — entonnoir 3 niveaux) n'est **pas un questionnaire indépendant**. C'est une **logique de réouverture** :

```
Niveau 1 : "Des changements ?" → Oui/Non
    └── Oui → Niveau 2 : Par vulnérabilité (5 × Oui/Non)
                  └── Oui sur V1 → Niveau 3 : Par MP de V1 (Oui/Non)
                                        └── Oui → Réouvre les questions initiales du MP
```
 
Les questions de suivi **ne sont pas de nouvelles questions** — ce sont :
1. Des **questions-portes** (S000→S007) = logique de navigation, pas de contenu clinique
2. Les **mêmes 150 questions** du questionnaire initial, réouvertes conditionnellement

Donc le suivi sera géré par :
- Un champ dans `activation_rules` ou une table `suivi_gates` simple (les questions-portes S000→S007)
- La logique de renvoi vers les questions existantes (dans le code du simulateur, pas dans la DB)

Le fichier Excel "Questionnaire de suivi" que ton père a fourni est utile comme **spécification de le logique**, mais ses données ne méritent pas une table dédiée.

---

## Récapitulatif

| Phase | Tables | Lignes | Statut | Utilité |
|-------|--------|--------|--------|-------------------|
| **1a** | `vulnerabilities` | 5 | ✅ Live | Référence |
| **1a** | `questions` | 165 | ✅ Live | Export Excel, audit |
| **1b** | `micro_parcours` | 24 | ✅ Live | Fiches identité MP |
| **1b** | `question_mp_mapping` | 159 | ✅ Live | Template A, suivi |
| **2** | `activation_rules` | ~100+ | ⏳ | Déclencheurs + suivi |
| **2** | `recommendations` | ~100+ | ⏳ | Recos par niveau |
| **2** | `micro_taches` | ~300+ | ⏳ | MT contributives |

---

*On commence par les 2 tables Phase 1, on injecte les 165 questions, et on exporte les Excel propres pour le Dr. Monka.*
