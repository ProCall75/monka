# 📄 TEMPLATE A — Activation

> **Vulnérabilité** : [V?] — [Nom de la vulnérabilité]
> **Date de production** : [JJ/MM/AAAA]
> **Statut** : 🟡 Proposition IA — en attente de certification Dr. Monka
> **Règles KERNEL** : K2 (3 niveaux), K3 (englobement)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | [V?] — [Nom] |
| Nombre de MP | [X] |
| Nombre de règles d'activation | [X] |
| dont 🔴 Critique | [X] |
| dont 🟠 CCC | [X] |
| dont 🟢 Standard | [X] |
| MP sans règle d'activation | [X] — mode ⚪ prévention uniquement |

---

<!-- RÉPÉTER CE BLOC POUR CHAQUE MP DE LA V -->

## MP [MP_ID] — [Nom du Micro-Parcours]

> **ASR** : « [Objectif = changement d'état attendu] »

### Questions rattachées à ce MP

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | [ID] | [Texte de la question] | état / facteur |
| ... | | | |

### Règles d'activation

#### 🔴 Critique (≤ 7 jours)

> S'il n'y a pas de règle critique pour ce MP, indiquer : *Aucune règle critique.*

| Règle ID | Question | Réponse déclenchante | Source |
|---|---|---|---|
| [RULE_ID] | [Q_ID] — [Libellé court] | [Valeur exacte] | Legacy ✅ / IA 🤖 |

#### 🟠 CCC — Condition Critique Composite (≤ 30 jours)

| Règle ID | Condition (ET logique) | Source |
|---|---|---|
| [RULE_ID] | [Q1_ID] = [Valeur] **ET** [Q2_ID] = [Valeur] | Legacy ✅ / IA 🤖 |

#### 🟢 Standard (≤ 90 jours)

| Règle ID | Question | Réponse déclenchante | Source |
|---|---|---|---|
| [RULE_ID] | [Q_ID] — [Libellé court] | [Valeur exacte] | Legacy ✅ / IA 🤖 |

#### ⚪ Prévention (permanent)

> Actif par défaut si aucune règle ci-dessus ne fire. Recos prévention définies dans Template B.

---

<!-- FIN DU BLOC PAR MP — RÉPÉTER POUR CHAQUE MP -->

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Règle issue du CAT Excel de Dr. Monka — validée |
| IA 🤖 | Règle proposée par l'IA — **à valider par Dr. Monka** |

---

> ⚠️ **À VALIDER PAR DR. MONKA** : Toutes les lignes marquées `IA 🤖` nécessitent une certification médicale avant intégration dans le moteur.
