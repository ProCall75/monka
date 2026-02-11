# 📄 TEMPLATE B — Recommandations & Variations

> **Vulnérabilité** : [V?] — [Nom de la vulnérabilité]
> **Date de production** : [JJ/MM/AAAA]
> **Statut** : 🟡 Proposition IA — en attente de certification Dr. Monka
> **Règles KERNEL** : K1, K3, K4, K5, K6, K7, K8, K10
> **Dépendance** : Template A (les niveaux d'activation déterminent quelle version afficher)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | [V?] — [Nom] |
| Nombre de MP | [X] |
| Nombre total de recos | [X] |
| Recos legacy | [X] |
| Recos proposées IA | [X] |

---

<!-- RÉPÉTER CE BLOC POUR CHAQUE MP DE LA V -->

## MP [MP_ID] — [Nom du Micro-Parcours]

> **ASR** : « [Objectif] »
> **Activation** : voir Template A

### Vue d'ensemble des recos de ce MP

| # | Reco ID | Libellé court | Niveau | Règle source (Template A) | Source |
|---|---|---|---|---|---|
| 1 | [RECO_ID] | [Titre] | 🔴 / 🟠 / 🟢 / ⚪ | [RULE_ID] | Legacy ✅ / IA 🤖 |
| ... | | | | | |

---

### RECO [RECO_ID] — [Titre de la recommandation]

**Niveau** : [🔴 Critique / 🟠 CCC / 🟢 Standard / ⚪ Prévention]
**Déclenchée par** : [RULE_ID] depuis Template A
**Source** : Legacy ✅ / IA 🤖

#### Texte utilisateur (vulgarisé)

> [Wording destiné à l'aidant — ton adapté au niveau d'urgence]

#### Texte IDEC (professionnel)

> [Wording destiné au professionnel IDEC — termes techniques, actions à mener]

#### Micro-Tâches référencées (détaillées dans Template C)

**📍 Actions de sécurisation** (contributives → ASR) :

| MT_ID | Libellé | Type |
|---|---|---|
| [MT_ID] | [Action concrète] | STRUC / SEC / MED |

**💡 Actions d'amélioration** (non-contributives) :

| MT_ID | Libellé | Type |
|---|---|---|
| [MT_ID] | [Action complémentaire] | INFO / ORGA |

#### Délégation

| Mode | Description |
|---|---|
| 👤 Autonome | L'utilisateur peut réaliser lui-même |
| 👥 Avec IDEC | Nécessite un accompagnement professionnel |

---

<!-- FIN DU BLOC PAR RECO — RÉPÉTER POUR CHAQUE RECO DU MP -->
<!-- FIN DU BLOC PAR MP — RÉPÉTER POUR CHAQUE MP -->

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Recommandation issue du CAT Excel — validée |
| IA 🤖 | Recommandation proposée par l'IA — **à valider par Dr. Monka** |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Tous les **wordings** (utilisateur ET IDEC) nécessitent relecture médicale
> - Toutes les recos `IA 🤖` nécessitent certification
> - Les associations reco → MT sont des propositions à confirmer
