# ⚙️ TPL_03 — Validation MP (Micro-Parcours)

> **Usage** : Sprint 2 (et suivants si enrichissement) — une fiche par MP
> **Objectif** : Questionner et valider chaque composant d'un Micro-Parcours — catégories, règles, MTs, wording, cohérence
> **Rempli par** : Antonin (pré-remplissage + vérification technique) + Dr. Monka (validation clinique)
> **Basé sur** : `KERNEL/VALIDATION_MP/_TEMPLATE_MP.md` (évolution v2)

---

## En-tête

> **Sprint** : [N] — [Nom du sprint]
> **MP** : [MP_ID] — [NOM DU MP]
> **Vulnérabilité** : V[N] — [NOM V]
> **ASR** : « [OBJECTIF DU MP] »
> **Date** : ../../2026
> **Validé par** : 🔲 Dr. Monka | 🔲 Antonin
> **Statut** : 🔲 À valider

---

## Questions transversales

> Ces questions traversent toutes les actions. Y revenir régulièrement.

| # | Question | Quand |
|---|---|---|
| T1 | **Cohérence inter-MP** : les MT/recos de ce MP risquent-elles de doublonner avec un autre MP ? | Actions 1, 3, 4, 6 |
| T2 | **Couverture clinique** : couvre-t-on le minimum vital ? Un professionnel pourrait-il dire "il manque quelque chose" ? | Actions 1, 3 |
| T3 | **Actionnabilité** : chaque élément est-il concrètement exécutable ? Pas de formulation floue. | Actions 3, 4, 5 |
| T4 | **Proportionnalité** : le nombre d'éléments est-il proportionnel à la complexité clinique du MP ? | Actions 1, 2, 3 |
| T5 | **Autonomie aidant** : l'aidant pourrait-il le faire seul ? Si oui, acteur = `Aidant (autonome)`. | Actions 3, 4 |
| T6 | **Chaîne d'action** : les MT forment-elles une séquence logique (diagnostiquer → informer → structurer → sécuriser) ? | Actions 3, 4 |

---

## 0. Données figées

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification | Options |
|---|---|---|---|---|
| 1 | | | | |

> Total : X questions rattachées

### Questions candidates exclues

| Question ID | Libellé | Pertinente ? | Raisonnement |
|---|---|---|---|
| | | ❌ Non | |

---

## ACTION 1 — QUOI : Catégories

> Quelles grandes actions cliniques distinctes pour ce MP ?

### 🧠 Questions

| # | Question |
|---|---|
| 1.1 | Les catégories couvrent-elles des dimensions cliniques **réellement distinctes** ? |
| 1.2 | Y a-t-il une action clinique évidente que **aucune catégorie** ne couvre ? |
| 1.3 | Faut-il **fusionner** deux catégories proches ? |
| 1.4 | Faut-il **éclater** une catégorie trop large ? |
| 1.5 | Combien de catégories est raisonnable pour ce MP ? (T4) |

### Catégories identifiées

| # | ID | Nom | Description clinique | Source |
|---|---|---|---|---|
| 1 | | | | Legacy ✅ / 🤖 IA |

> **Raisonnement** : _(Pourquoi N catégories)_
> **Décision Dr. Monka** : 🔲 Validé | 🔲 Ajouts | 🔲 Suppressions

---

## ACTION 2 — QUAND : Règles d'activation

> Pour chaque catégorie, quelles conditions la déclenchent et à quel niveau ?
> **Format** : question en texte complet, réponse déclenchante en **gras**.

### 🧠 Questions

| # | Question |
|---|---|
| 2.1 | Chaque question du MP est-elle utilisée dans ≥1 règle ? |
| 2.2 | Chaque combinaison cliniquement significative a-t-elle une règle ? |
| 2.3 | Les niveaux de criticité sont-ils cliniquement justifiés ? |
| 2.4 | Y a-t-il des combos multi-questions qui signalent un niveau supérieur (CCC) ? |
| 2.5 | Y a-t-il des réponses extrêmes non exploitées ? |
| 2.6 | Chaque catégorie a-t-elle ≥2 niveaux (Standard + CCC) ? |

### Par catégorie

#### CAT_XX — [NOM]

| Niveau | Règle ID | Condition SI | ALORS | Sens clinique | Source |
|---|---|---|---|---|---|
| 🔴 Critique | | | | | |
| 🟠 CCC | | | | | |
| 🟢 Standard | | | | | |

> **Contrôle K3** : 🔲 Vérifié — pas de chevauchement entre niveaux
> **Décision Dr. Monka** : 🔲 Validé | 🔲 Modifications

---

## ACTION 3 — COMMENT : Micro-Tâches

> Quelles MT concrètes pour chaque catégorie ?

### 🧠 Questions

| # | Question |
|---|---|
| 3.1 | Les MT couvrent-elles la chaîne complète (ORGA → INFO → STRUC → SEC) ? (T6) |
| 3.2 | Y a-t-il des MT d'autres MP qui devraient être ici ? |
| 3.3 | Pourquoi pas 1 MT de plus ? (force la complétude) |
| 3.4 | Pourquoi pas 1 MT de moins ? (force la nécessité) |
| 3.5 | La catégorie a-t-elle ≥1 MT contributive (STRUC/SEC/MED) pour l'ASR ? |

### CAT_XX — [NOM]

| MT_ID | Libellé | Type | Acteur | 📍/💡 | Source |
|---|---|---|---|---|---|
| | | | | | |

> **Décision Dr. Monka** : 🔲 Validé | 🔲 Modifications MT

---

## ACTION 4 — ENRICHIR : Acteurs, Types, Domaine

### 🧠 Questions

| # | Question |
|---|---|
| 4.1 | Le type MED est-il représenté ? |
| 4.2 | L'acteur est-il le bon (celui qui FAIT l'action) ? |
| 4.3 | L'aidant peut-il agir seul sur certaines MT ? (T5) |
| 4.4 | Le domaine (🏥/🤝) est-il correct ? |

### Tableau consolidé

| MT_ID | Libellé | Type | Acteur | Domaine | 📍/💡 | CAT |
|---|---|---|---|---|---|---|
| | | STRUC/SEC/MED/INFO/ORGA | | 🏥/🤝 | | |

---

## ACTION 5 — WORDING : Recos + MTs versionnés

### Wording de base

| MT_ID | CAT | Wording IDEC | Wording Utilisateur | ✅/❌ |
|---|---|---|---|---|
| | | | | |

### Recos de base

| CAT | Reco Utilisateur | Reco IDEC | ✅/❌ |
|---|---|---|---|
| | | | |

### Versioning par criticité (par catégorie)

| Niveau | Reco Utilisateur | Reco IDEC |
|---|---|---|
| 🟢 Standard | | |
| 🟠 CCC | | |
| 🔴 Critique | | |

| MT_ID | 🟢 Std (Utilisateur) | 🟠 CCC (Utilisateur) | 🔴 Critique (Utilisateur) |
|---|---|---|---|
| | | | |

> **Décision Dr. Monka** : 🔲 Wording validé

---

## ACTION 6 — COHÉRENCE : Prévention + Contrôle global

### Reco prévention (⚪)

| | Reco Utilisateur | Reco IDEC |
|---|---|---|
| ⚪ Prévention | | |

### MT de prévention

| MT_ID | Libellé | Type | Wording IDEC | Wording Utilisateur |
|---|---|---|---|---|
| | | INFO/ORGA | | |

### Checklist de cohérence (8 points)

| # | Vérification | ✅/❌ | Détail |
|---|---|---|---|
| 1 | Chaque question du MP → ≥1 règle d'activation | | |
| 2 | Chaque règle → ≥1 version de reco | | |
| 3 | Chaque catégorie → MTs assignées | | |
| 4 | K3 respecté (≥2 niveaux par catégorie) | | |
| 5 | Aucune MT orpheline | | |
| 6 | Reco prévention présente | | |
| 7 | Wording reco = conseil succinct, MT = verbe d'action | | |
| 8 | Sens clinique renseigné pour chaque règle | | |

---

## VÉRIFICATION AFFICHAGE SIMULATEUR

> ✅ **Ajout v2** — vérifier que les données validées s'affichent correctement.

| Élément | Affiché correctement ? | Capture/Preuve |
|---|---|---|
| MP apparaît dans la liste des MPs activés | ✅/❌ | |
| Catégories affichées avec le bon niveau | ✅/❌ | |
| Recos affichées avec le bon wording | ✅/❌ | |
| MTs affichées avec acteur et type | ✅/❌ | |
| Graduation visuelle (couleur standard/CCC/critique) | ✅/❌ | |

---

## Synthèse finale

| Métrique | Legacy | Après validation |
|---|---|---|
| Catégories | | |
| Règles d'activation | 🟢:_ 🟠:_ 🔴:_ | 🟢:_ 🟠:_ 🔴:_ |
| MT totales | | |
| MT contributives | | |
| Domaine 🏥 / 🤝 | | |
| ASR | | |
| Reco prévention | | |
| Checks OK | /8 | /8 |
| Affichage simulateur | /5 | /5 |

## Validation

| Validateur | Statut | Date |
|---|---|---|
| Dr. Monka | 🔲 Validé / 🔲 À revoir | |
| Antonin | 🔲 Validé / 🔲 À revoir | |

---

> 🔒 Ce MP est verrouillé une fois les deux validations obtenues.
