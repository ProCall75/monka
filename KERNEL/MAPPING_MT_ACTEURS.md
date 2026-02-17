# 🔗 Mapping MT → Acteurs — Confrontation DB vs Référentiel CAT

> **Source DB** : `micro_taches` table — 369 MT, Supabase `mbxeqrvofrmhqlwlefff`  
> **Source référentiel** : `ACTEURS_CAT_EXHAUSTIF.md` — 60 acteurs canoniques  
> **Date** : 16/02/2026  
> **Objectif** : Identifier les écarts entre les tokens acteurs en DB et le référentiel exhaustif CAT

---

## 1. État des lieux DB — Les 12 tokens actuels

| Token DB | Occurrences | Vulnérabilités | Mapping → Référentiel CAT |
|---|---|---|---|
| `IDEC` | 278 | V1-V5 | ✅ **IDEC** — mapping direct |
| `AIDANT` | 34 | V1-V5 | ⚠️ **Aidant** — non-professionnel, rôle co-interventant |
| `MT` | 23 | V1-V5 | ✅ **Médecin traitant (ou généraliste)** — abréviation |
| `SPECIALISTE` | 16 | V3, V4, V5 | ⚠️ **Token générique** — recouvre 14+ spécialités distinctes |
| `AS` | 7 | V2 | ✅ **Assistante sociale** — mapping direct |
| `PDS` | 5 | V4, V5 | ⚠️ **Token générique** — "Professionnel de santé" non spécifié |
| `MEDECIN_TRAITANT` | 3 | V5 | ✅ **Médecin traitant** — doublon avec `MT` |
| `PSYCHOLOGUE` | 2 | V4, V5 | ✅ **Psychologue** — mapping direct |
| `Psychologue` | 2 | V1 | ⚠️ **Casse différente** — doublon de PSYCHOLOGUE |
| `PROFESSIONNEL_SANTE` | 2 | V5 | ⚠️ **Token générique** — doublon sémantique avec `PDS` |
| `MEDECIN` | 1 | V5 | ⚠️ **Ambigu** — MT ? Spécialiste ? |
| `MEDECIN_SPECIALISTE` | 1 | V5 | ⚠️ **Token générique** — lequel ? |

**Total** : 374 affectations acteur→MT (certaines MT ont plusieurs acteurs)

---

## 2. Problèmes identifiés

### 🔴 P1 — Incohérence de casse
- `PSYCHOLOGUE` (V4, V5) vs `Psychologue` (V1) → **même acteur, 2 tokens**
- **Impact** : Toute requête `WHERE 'PSYCHOLOGUE' = ANY(acteur)` rate les MT de V1

### 🔴 P2 — Doublons sémantiques
| Token 1 | Token 2 | Même acteur ? |
|---|---|---|
| `MT` (23 occ) | `MEDECIN_TRAITANT` (3 occ) | ✅ Oui — Médecin traitant |
| `PDS` (5 occ) | `PROFESSIONNEL_SANTE` (2 occ) | ✅ Oui — sémantiquement |
| `SPECIALISTE` (16 occ) | `MEDECIN_SPECIALISTE` (1 occ) | ✅ Oui — sémantiquement |

### 🟡 P3 — Tokens génériques non résolus
Le référentiel CAT a **18 spécialités distinctes** (Psychiatre, Gériatre, Cardiologue…).  
En DB, tout est aplati en `SPECIALISTE` ou `PDS` → **on perd la granularité clinique**.

| Token générique | Nb MT | Spécialistes réels possibles (CAT) |
|---|---|---|
| `SPECIALISTE` | 16 | Cardiologue, Dermatologue, Endocrinologue, Gastro-entérologue, Gériatre, Gynécologue, Neurologue, Néphrologue, Oncologue, Ophtalmologue, ORL, Pneumologue, Psychiatre, Chirurgien-dentiste |
| `PDS` | 5 | Toute profession de santé — impossible à résoudre sans contexte |
| `MEDECIN` | 1 | MT ? Spécialiste ? (MT_V5_M6_P03 — neuropédiatre) |
| `MEDECIN_SPECIALISTE` | 1 | ? (MT_V5_M5_132) |

### 🟡 P4 — Acteurs CAT absents de la DB
Ces acteurs existent dans le référentiel CAT (extraction Excel) mais n'apparaissent nulle part en DB :

| Acteur CAT | Catégorie | Commentaire |
|---|---|---|
| SAD | Service à domicile | Mentionné dans les libellés de MT mais pas dans `acteur[]` |
| Ergothérapeute | Paramédical | Mentionné dans les libellés ("ergo", "ergo domicile") mais pas acteur |
| Kinésithérapeute | Paramédical | Mentionné dans libellés ("kiné") mais pas acteur |
| Pharmacien | Paramédical | Référencé dans CAT O43, absent de la DB |
| IDEL | Paramédical | Mentionné dans libellés mais pas acteur |
| DAC | Institution | Référencé dans le CAT, absent de la DB |
| CPAM | Institution | Référencé dans le CAT, absent de la DB |
| CPTS | Institution | Référencé dans le CAT, absent de la DB |
| MDPH | Institution | Mentionné dans libellés mais pas acteur |
| CMP | Structure | Mentionné dans libellés (S2) mais pas acteur |
| ESAD | Structure | Référencé dans CAT, absent de la DB |
| Plateforme de répit | Service | Mentionné dans libellés mais pas acteur |
| Infirmière libérale | Paramédical | Référencé dans CAT, absent de la DB |
| Infirmière scolaire | Autre | Référencé dans CAT, absent de la DB |
| Médecin du travail | Autre | Référencé dans CAT, absent de la DB |
| Centre hospitalier | Structure | Référencé dans CAT, absent de la DB |
| Urgences | Structure | Référencé dans CAT, absent de la DB |

> ⚠️ **La question clé** : est-ce que ces acteurs ne sont pas en DB parce qu'ils sont **implicites** dans l'action IDEC (l'IDEC contacte le SAD, l'IDEC appelle le CMP) ? Ou est-ce une véritable lacune ?

---

## 3. Détail par MP — Écosystème d'acteurs

### V1 — Social et Relationnel (4 MPs)

| MP | Nom | IDEC | AIDANT | MT | PSYCH | Autres | Total MT |
|---|---|---|---|---|---|---|---|
| R1 | Impact vie personnelle | 12 | — | 1 | — | — | 13 |
| R2 | Soutien entourage | 16 | — | — | — | — | 16 |
| R3 | Isolement social | 8 | — | — | — | — | 8 |
| R4 | Relation et acceptation | 17 | — | — | 2 | — | 19 |

> **Écosystème V1** : Quasi-exclusivement IDEC (53/56). Le psychologue intervient uniquement sur R4 (soutien changement). Le MT intervient 1× sur R1 (soutien psy via prescription).  
> **Absents vs CAT** : SAD, Plateforme de répit, Infirmière libérale — mentionnés dans les libellés MT mais pas codés comme acteurs.

---

### V2 — Administrative (4 MPs)

| MP | Nom | IDEC | AS | Autres | Total MT |
|---|---|---|---|---|---|
| A1 | Couverture santé | 12 | 1 | — | 12 |
| A2 | Droits et aides | 12 | 2 | — | 12 |
| A3 | Complexité démarches | 9 | 2 | — | 10 |
| A4 | Situation scolaire/budget | 12 | 2 | — | 12 |

> **Écosystème V2** : IDEC + AS uniquement. L'AS intervient en co-acteur sur les actions structurantes (dossier MDPH, protection juridique, bilan social).  
> **Absents vs CAT** : Mutuelle, MDPH (en tant qu'acteur), Conseil départemental.

---

### V3 — Santé physique et psychologique (4 MPs)

| MP | Nom | IDEC | AIDANT | MT | SPEC | Autres | Total MT |
|---|---|---|---|---|---|---|---|
| S1 | Charge et épuisement | 7 | — | — | — | — | 7 |
| S2 | Inquiétudes sécurité | 6 | 3 | — | — | — | 9 |
| S3 | Santé et renoncement | 1 | 1 | 3 | 13 | — | 18 |
| S4 | Hygiène de vie | — | 4 | — | — | — | 4 |

> **Écosystème V3** : S3 est le seul MP où `SPECIALISTE` domine (13/18) — dispatch RDV spécialistes. S4 est le seul MP où l'AIDANT est l'acteur unique.  
> **Point critique S3** : Les 13 MT `SPECIALISTE` couvrent en réalité 14 spécialités distinctes (Cardiologue, Dermatologue, Endocrinologue-Diabétologue, Gastro-entérologue, Gériatre, Gynécologue, Neurologue, Oncologue, Ophtalmologue, ORL, Pneumologue, Psychiatre, Chirurgien-dentiste). Le `is_parametric` gère cette résolution au runtime.  
> **Absents vs CAT** : Pharmacien (CAT O43), CMP (mentionné dans libellé S2).

---

### V4 — Fragilité du Proche (6 MPs)

| MP | Nom | IDEC | AIDANT | MT | SPEC | PDS | PSYCH | Total MT |
|---|---|---|---|---|---|---|---|---|
| F1 | Quotidien et entourage | 17 | 1 | — | — | — | 1 | 19 |
| F2 | Autonomie et aide | 12 | 1 | 1 | — | — | — | 14 |
| F3 | Mémoire et comportement | 7 | 2 | 1 | 1 | 1 | — | 12 |
| F4 | Douleur et état général | 9 | — | 6 | — | — | — | 15 |
| F5 | Dépendance et addictions | 12 | — | 2 | — | — | — | 14 |
| F6 | Autonomie fonctionnelle | 11 | — | 5 | — | — | — | 16 |

> **Écosystème V4** : Le plus diversifié. Le MT est très présent (15 MT) car V4 = état de santé du proche. F4 a la plus forte proportion MT (6/15 = 40%).  
> **Absents vs CAT** : Ergothérapeute (mentionné dans les libellés F6), Kinésithérapeute (F2, F6), SAD (F1), ESAD (CAT O13), Centre hospitalier (F4 douleur), ORL / Ophtalmologue (F4 sensoriel) — tous sont dans les libellés mais le token acteur reste `IDEC` ou `MT`.

---

### V5 — Parcours Médical du Proche (6 MPs)

| MP | Nom | IDEC | AIDANT | MT | SPEC | PDS | PSYCH | M_T | M_S | PROF | MED | Total MT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | Compréhension diagnostic | 11 | 4 | 1 | 1 | 1 | — | — | — | — | — | 18 |
| M2 | Accès aux soins | 25 | 3 | — | 1 | 1 | — | — | — | — | — | 30 |
| M3 | Urgences/hospitalisations | 10 | 1 | 2 | — | 1 | — | — | — | — | — | 14 |
| M4 | Troubles psy/addictions | 18 | 6 | 1 | — | 1 | 1 | — | — | — | — | 27 |
| M5 | Coordination soins | 11 | 2 | — | — | — | — | 2 | 1 | — | — | 16 |
| M6 | Plan de soins | 23 | 6 | — | — | — | — | 1 | — | 2 | 1 | 33 |

> **Écosystème V5** : Le plus complexe en diversité de tokens. Seule vulnérabilité utilisant `MEDECIN_TRAITANT` (vs `MT`), `MEDECIN_SPECIALISTE`, `MEDECIN`, `PROFESSIONNEL_SANTE`. M2 et M6 sont les plus gros MPs (30 et 33 MT).  
> **Problème P2 visible** : `MT` (M1, M3, M4) coexiste avec `MEDECIN_TRAITANT` (M5, M6) → même acteur, 2 tokens.

---

## 4. Proposition de normalisation

### 4.1 Résolution des doublons (quick wins)

| Action | Tokens concernés | Token normalisé | MT impactées |
|---|---|---|---|
| Unifier casse | `Psychologue` → `PSYCHOLOGUE` | `PSYCHOLOGUE` | 2 MT V1 |
| Unifier MT | `MEDECIN_TRAITANT` → `MT` | `MT` | 3 MT V5 |
| Unifier PDS | `PROFESSIONNEL_SANTE` → `PDS` | `PDS` | 2 MT V5 |
| Unifier spécialistes | `MEDECIN_SPECIALISTE` → `SPECIALISTE` | `SPECIALISTE` | 1 MT V5 |

> **Résultat** : de 12 tokens → **8 tokens** sans perte de sens.

### 4.2 Résolution du token `MEDECIN`

| MT_ID | Libellé | MP | Résolution proposée |
|---|---|---|---|
| MT_V5_M6_P03 | Solliciter avis neuropédiatrique TND | M6 | → `SPECIALISTE` (neuropédiatre) |

### 4.3 Question ouverte — Faut-il éclater `SPECIALISTE` ?

**Option A — Garder `SPECIALISTE` + résolution par `is_parametric`** (statu quo)
- ✅ Simple, cohérent avec le dispatch dynamique
- ❌ On ne voit pas dans la DB quel spécialiste est réellement impliqué

**Option B — Éclater en tokens spécialisés** (`CARDIOLOGUE`, `GÉRIATRE`, etc.)
- ✅ Aligné avec le référentiel CAT (18 spécialités)
- ❌ Complexifie les requêtes, augmente la maintenance
- ❌ Les MT paramétriques S3 dispatent dynamiquement → un seul token `SPECIALISTE` est logique

> **Recommandation** : Garder `SPECIALISTE` pour les MT paramétriques (dispatch dynamique). Éclater uniquement les MT non-paramétriques qui ciblent un spécialiste précis (ex: `MT_V4_057` RDV ORL → `ORL`).

### 4.4 Question ouverte — Faut-il ajouter les acteurs implicites ?

Exemples de MT où l'acteur réel n'est pas codé :

| MT_ID | Libellé | Acteur DB | Acteur réel implicite |
|---|---|---|---|
| MT_V4_012 | Confirmer heures SAD | IDEC | IDEC **+ SAD** |
| MT_V4_020 | Contact ergothérapeute du territoire | IDEC | IDEC **+ ERGOTHÉRAPEUTE** |
| MT_V4_052 | RDV chirurgien-dentiste | IDEC | IDEC **+ CHIRURGIEN_DENTISTE** |
| MT_V4_055 | RDV ophtalmologue | IDEC | IDEC **+ OPHTALMOLOGUE** |
| MT_V4_057 | RDV ORL | IDEC | IDEC **+ ORL** |
| MT_V4_063 | RDV addictologue/CSAPA | IDEC | IDEC **+ ADDICTOLOGUE** |
| MT_V3_003 | Contacter CMP pour RDV infirmier | IDEC | IDEC **+ CMP** |
| MT_V3_NEW_03 | Plateforme de répit | IDEC | IDEC **+ PLATEFORME_RÉPIT** |
| MT_V4_030 | RDV MT pour MDPH réévaluation | IDEC | IDEC **+ MDPH** |

> **Le choix structurant** : L'acteur dans `acteur[]` représente-t-il :
> - **(a)** celui qui **exécute l'action** ? → l'IDEC prend le RDV, donc IDEC ✓
> - **(b)** tous ceux qui sont **impliqués** ? → IDEC + le spécialiste cible ✓
>
> Aujourd'hui la DB suit (a). Le référentiel CAT suit plutôt (b).

---

## 5. Résumé des écarts

| Dimension | DB actuelle | Référentiel CAT | Écart |
|---|---|---|---|
| **Nb tokens acteurs** | 12 (dont 4 doublons) | 60 | -48 |
| **Nb tokens utiles** | 8 (après normalisation) | ~30 (hors combos IDEC) | -22 |
| **Spécialistes** | 1 token (`SPECIALISTE`) | 18 spécialités | -17 |
| **Structures/institutions** | 0 | 10 (DAC, CPAM, CMP, ESAD…) | -10 |
| **Paramédicaux** | 1 (`PSYCHOLOGUE`) | 6 (+ ergo, kiné, pharma, IDEL…) | -5 |

---

## 6. Actions recommandées

### ✅ Actions immédiates (sans impact fonctionnel)

```sql
-- P1: Unifier la casse
UPDATE micro_taches SET acteur = array_replace(acteur, 'Psychologue', 'PSYCHOLOGUE');

-- P2: Unifier les doublons sémantiques
UPDATE micro_taches SET acteur = array_replace(acteur, 'MEDECIN_TRAITANT', 'MT');
UPDATE micro_taches SET acteur = array_replace(acteur, 'PROFESSIONNEL_SANTE', 'PDS');
UPDATE micro_taches SET acteur = array_replace(acteur, 'MEDECIN_SPECIALISTE', 'SPECIALISTE');
UPDATE micro_taches SET acteur = array_replace(acteur, 'MEDECIN', 'SPECIALISTE') WHERE id = 'MT_V5_M6_P03';
```

### 🟡 Actions à décider ensemble

1. **Éclater `SPECIALISTE`** sur les MT non-paramétriques (F4 RDV ORL → `ORL`) ?
2. **Ajouter les acteurs cibles** quand l'IDEC fait un RDV (ex: "RDV ophtalmologue" → `{IDEC, OPHTALMOLOGUE}`) ?
3. **Créer une table `acteurs_referentiel`** pour formaliser les 60 acteurs canoniques comme des entités à part entière (FK au lieu de texte libre) ?
