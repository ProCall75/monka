# 🔒 MONKA KERNEL v5 — Moteur Clinique : Référence

> **Version** : v5 — 12/02/2026  
> **Objectif** : Décrire le fonctionnement du moteur clinique Monka. Ce document est la source de vérité technique et clinique.

---

## 1. VUE D'ENSEMBLE

Le moteur Monka est un **système déterministe** qui analyse les réponses d'un aidant à un questionnaire, détecte ses vulnérabilités, et génère des recommandations personnalisées avec des micro-tâches concrètes.

```
QUESTIONNAIRE           MOTEUR                    SORTIE
┌──────────┐    ┌─────────────────┐    ┌────────────────────────┐
│ 150 Q/A  │───▶│ Règles          │───▶│ Recommandations        │
│ 15 Trig. │    │ d'activation    │    │   └── Micro-Tâches     │
│ ~30 Suivi│    │ (SI Q=R → Reco) │    │ Score par vulnérabilité│
└──────────┘    │ Scoring         │    │ Signaux d'alerte (CCC) │
                └─────────────────┘    └────────────────────────┘
```

**Principes fondamentaux :**
- Le moteur est **100% déterministe** — pas d'IA dans la décision clinique. Chaque sortie est traçable à une règle.
- Le système fonctionne **avec ou sans IDEC** (coordinateur). L'aidant peut utiliser Monka en autonomie.
- Deux audiences voient les mêmes recommandations avec un **wording adapté** : l'aidant (conseil bienveillant) et l'IDEC (directive professionnelle).

---

## 2. GLOSSAIRE

| Terme | Définition |
|---|---|
| **Vulnérabilité (V)** | Un domaine de risque pour l'aidant. Il y en a 5 (voir §3). |
| **Micro-Parcours (MP)** | Un sous-thème clinique au sein d'une vulnérabilité. Chaque V contient plusieurs MPs. Il y en a 24 au total. |
| **Question (Q)** | Un élément du questionnaire. 150 questions état/facteur + 15 triggers contextuels. Figées. |
| **Trigger** | Information de contexte/profil (âge, situation, type de proche…). Pas dans le scoring, mais peut conditionner certaines recos. |
| **Règle d'activation** | Condition `SI question = réponse ALORS activer reco`. C'est le cœur du moteur. |
| **Recommandation (Reco)** | Un conseil donné à l'aidant, organisé par catégorie d'action au sein d'un MP. Existe en 2 versions : Utilisateur et IDEC. |
| **Catégorie de reco** | Un axe d'action clinique distinct au sein d'un MP. Le nombre de catégories dépend de la complexité clinique du MP — autant que nécessaire pour couvrir toutes les actions distinctes. |
| **Niveau de criticité** | L'urgence de la reco. 3 niveaux : 🔴 Critique (≤7j), 🟠 CCC (≤30j), 🟢 Standard (≤90j). + 1 mode ⚪ Prévention. |
| **CCC** | Condition Critique Composite. Combinaison de plusieurs réponses qui déclenche une alerte de niveau supérieur. |
| **Micro-Tâche (MT)** | Action concrète à réaliser, contenue dans une reco. Verbe d'action. 2 versions : IDEC et Utilisateur. |
| **ASR** | Action Seuil de Réussite. Objectif mesurable d'un MP. Validée quand toutes les MT contributives sont complétées. |
| **MT Contributive (📍)** | MT qui fait avancer l'ASR. Types : STRUC (structurer), SEC (sécuriser), MED (médical). |
| **MT Non-contributive (💡)** | MT d'accompagnement. Types : INFO (informer), ORGA (organiser). Ne bloque pas l'ASR. |
| **Scoring** | Note d'intensité d'une vulnérabilité. Indépendant des recos — ne déclenche jamais un MP. |
| **IDEC** | Infirmier(e) Diplômé(e) d'État Coordinateur. Le professionnel qui utilise Monka côté pro. |
| **Domaine** | Classification d'une MT : 🏥 Médical ou 🤝 Médico-social. |
| **Acteur** | Qui réalise la MT. Acteurs existants : `IDEC` (coordinateur), `Aidant (autonome)`, `Médecin traitant`, `Psychologue`, `Médecin spécialiste`, `Professionnel de santé`, `AS` (assistante sociale), `Service d'aide à domicile`. |

---

## 3. LES 5 VULNÉRABILITÉS

| ID | Nom | Micro-Parcours | Questions | Focus |
|---|---|---|---|---|
| **V1** | Social & Relationnel | R1, R2, R3, R4 | 15 | Impact sur la vie de l'aidant, soutien, isolement, relation |
| **V2** | Administrative | A1, A2, A3, A4 | 36 | Droits, aides, démarches, budget |
| **V3** | Santé de l'aidant | S1, S2, S3, S4 | 26 | Santé physique, psychologique, épuisement |
| **V4** | Fragilité du proche | F1, F2, F3, F4, F5, F6 | 55 | Autonomie, comportement, sécurité du proche |
| **V5** | Parcours médical du proche | M1, M2, M3, M4, M5, M6 | 18 | Soins, plan de santé, coordination médicale |
| | **TOTAL** | **24 MP** | **150 Q** | |

---

## 4. LES RÈGLES DU MOTEUR

### Bloc A — Activation

| # | Règle | Énoncé |
|---|---|---|
| **K1** | Recos organisées par MP | Les recommandations sont **organisées** par MP (rattachées à l'ASR) mais **activées** par les règles d'activation (Q/A), pas par le MP lui-même. |
| **K2** | 3 niveaux d'activation | 🔴 Critique (≤7j) · 🟠 CCC (≤30j) · 🟢 Standard (≤90j). + 1 mode ⚪ Prévention quand rien ne se déclenche. |
| **K3** | Englobement par catégorie | Si une catégorie est activée à plusieurs niveaux, seule la version du niveau **le plus haut** s'affiche. Deux catégories différentes ne s'absorbent **jamais**. |
| **K4** | Prévention | Chaque MP a **1 reco de prévention** (⚪) affichée quand aucune règle n'a firé. |

### Bloc B — Recommandations & Micro-Tâches

| # | Règle | Énoncé |
|---|---|---|
| **K5** | Reco = enveloppe de MT | Une recommandation **contient** des micro-tâches. |
| **K6** | Double version | L'utilisateur ET l'IDEC voient les **mêmes recos/MT**. Seul le **wording** change. |
| **K7** | Autonomie | Le système est conçu pour fonctionner **sans IDEC**. L'aidant peut agir seul. |
| **K8** | Délégation au niveau reco | "Qui fait quoi" se décide au niveau de la **recommandation**. |

### Bloc C — MT, ASR & Validation

| # | Règle | Énoncé |
|---|---|---|
| **K9** | 1 MP = 1 ASR | Chaque MP a **une et une seule** ASR (objectif = changement d'état). |
| **K10** | 2 catégories de MT | **Contributives** 📍 (STRUC/SEC/MED) · **Non-contributives** 💡 (INFO/ORGA). |
| **K11** | 100% contributives = ASR | L'ASR est validée quand **toutes les MT contributives** sont complétées. |
| **K12** | Types non tous obligatoires | Un MP peut ne pas avoir les 3 types contributifs. K11 s'applique sur **ce qui existe**. |

### Bloc D — Scoring

| # | Règle | Énoncé |
|---|---|---|
| **K13** | Scoring indépendant | Le score mesure l'**intensité** d'une vulnérabilité. Il **ne déclenche jamais** un MP. |

### Bloc E — Règles complémentaires

| # | Règle | Énoncé |
|---|---|---|
| **K14** | CCC inter-vulnérabilités | Les CCC peuvent combiner des questions de **vulnérabilités différentes**. Le moteur ne fait aucune différence technique. |
| **K15** | Conflit critique/CCC | Si une question déclenche une activation **critique** sur une catégorie de reco d'un MP, elle ne doit **pas** faire partie d'une CCC qui active **la même catégorie du même MP**. La critique couvre déjà le cas (K3). |
| **K16** | CCC utile ssi change la reco | Une CCC inter-V ne vaut le coup que si elle **change la recommandation** ou révèle un risque que les MP séparés ne captent pas. |
| **K17** | Catégories de reco | Chaque MP contient **N catégories de reco/actions** (actions cliniques distinctes). Chaque catégorie peut avoir jusqu'à 4 versions (🔴🟠🟢⚪). On ne crée de version que si une Q/A réelle la déclenche. |
| **K18** | MT liées à la catégorie | Les MT sont rattachées à la **catégorie**, pas au niveau de criticité. Les mêmes MT s'appliquent quel que soit le niveau — seul le **wording** change par criticité. |
| **K19** | Double wording obligatoire | Chaque MT et chaque reco a **2 versions** : IDEC (directive pro) et Utilisateur (action/auto-observation). Aucune exception, y compris les MT ORGA. |
| **K20** | Reco = conseil, MT = action | La reco est un **label court** (un cap, pas une phrase). La MT est un **verbe d'action** concret. |
| **K21** | Domaine clinique | Chaque MT est classée 🏥 **Médical** ou 🤝 **Médico-social** selon la filière d'intervention. |

---

## 5. PIPELINE : Du questionnaire aux recommandations

### Étape 1 — L'aidant répond au questionnaire

L'aidant remplit le questionnaire (150 questions + 15 triggers contextuels). Les questions explorent les 5 domaines de vulnérabilité. Chaque question est rattachée à un ou plusieurs Micro-Parcours (MP), mais **c'est la combinaison des réponses qui compte**, pas le MP en lui-même.

> Le questionnaire est figé — on ne modifie jamais les questions.

### Étape 2 — Le moteur évalue les règles d'activation

Chaque MP contient des **catégories de reco** (des axes d'action clinique). Et chaque catégorie a des **règles d'activation** : des conditions `SI question = réponse ALORS activer`.

Le moteur parcourt toutes les règles. Si la combinaison de réponses de l'aidant correspond à une règle → la catégorie de reco s'active au niveau correspondant (Standard, CCC, Critique).

**Ce qui active, c'est la règle — pas le MP.** Le MP s'active quand au moins une de ses catégories de reco est activée par une règle. En d'autres termes :
- Les questions sont liées à un MP
- Mais c'est la combinaison Q/A qui active des recos
- Et si une reco s'active → le MP s'active

Si plusieurs règles activent la même catégorie à des niveaux différents → K3 : seul le niveau le plus haut s'affiche (🔴 absorbe 🟠 qui absorbe 🟢).

Si aucune catégorie du MP n'est activée → le mode Prévention ⚪ prend le relais (K4).

### Étape 3 — Le moteur génère les recommandations

Pour chaque catégorie activée, le moteur produit :

1. **La reco** : un conseil succinct adapté au niveau de criticité, en 2 versions (Utilisateur + IDEC)
2. **Les MT** : les mêmes micro-tâches quelle que soit la criticité (K18), mais avec un wording adapté au niveau d'urgence
3. **Les métadonnées** : acteur désigné pour chaque MT, domaine (🏥/🤝), type contributif ou non

L'aidant voit un conseil bienveillant orienté action. L'IDEC voit une directive professionnelle. Les deux voient les mêmes recos et les mêmes tâches — seul le wording change (K6).

### Étape 4 — Le scoring (indépendant)

En parallèle, le moteur calcule un **score d'intensité** par vulnérabilité. Ce score est la somme des points attribués aux réponses de l'aidant.

Le score **ne déclenche jamais un MP** (K13). Il donne une mesure de l'intensité de la vulnérabilité — c'est un indicateur contextuel, pas un prescripteur. Un score élevé en V1 avec aucune règle activée signifie que l'aidant est impacté mais pas dans un schéma qui nécessite une action immédiate.

### Étape 5 — Suivi dans le temps

Des questions de suivi (~30) sont rattachées aux MPs. Périodiquement, le système demande : « Y a-t-il eu des changements concernant [thème du MP] ? »

Si l'aidant répond oui → les questions du MP sont réouvertes → les règles d'activation sont réévaluées → les recos sont mises à jour. C'est un cycle continu.

---

## 6. STRUCTURE D'UN MICRO-PARCOURS (MP)

```
MP [ID] — [NOM]
│
├── 🏆 ASR : « [Objectif mesurable] »
│
├── 📌 CATÉGORIE 1 : « [Action clinique distincte] »
│   ├── 🔴 Critique   → Reco urgente + MT avec wording urgent
│   ├── 🟠 CCC        → Reco de vigilance + MT avec wording vigilant
│   └── 🟢 Standard   → Reco progressive + MT avec wording progressif
│   → K3 : seul le niveau le plus haut s'affiche
│   → K18 : mêmes MT à tous les niveaux, wording différent
│
├── 📌 CATÉGORIE 2 : « [Autre action clinique] »
│   └── 🟢 Standard   (seul niveau existant)
│   → Indépendante de CAT 1
│
└── ⚪ PRÉVENTION (quand aucune règle ne fire)
    └── Reco conseil + MT de veille
```

Chaque catégorie contient des MT classées par type :

| Catégorie | Types | Rôle | Contribue à l'ASR ? |
|---|---|---|---|
| 📍 **Contributive** | STRUC, SEC, MED | Actions qui font avancer l'objectif | ✅ Oui |
| 💡 **Non-contributive** | INFO, ORGA | Actions d'accompagnement et d'organisation | ❌ Non |

---

## 7. ÉTAT DU QUESTIONNAIRE

| Bloc | Quantité | Description |
|---|---|---|
| **Questions état/facteur** | 150 | Le cœur du questionnaire. Figées ✅ |
| **Triggers contextuels** | 15 | Profil et contexte (âge, situation…). Figés ✅ |
| **Questions de suivi** | ~30 | Détectent les changements dans le temps. Définies ✅ |
| **TOTAL** | ~195 | |

---

> 🔒 **KERNEL v5 — Source de vérité du moteur clinique Monka.**
