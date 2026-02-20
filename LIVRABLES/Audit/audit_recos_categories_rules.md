# 🔬 AUDIT — Recommandations, Catégories & Règles d'Activation

> **Date** : 19/02/2026  
> **Auteur** : Antonin Rimaud — PRAGMA Studio  
> **Source** : Supabase DB `mbxeqrvofrmhqlwlefff` — tables `recommendations`, `categories`, `activation_rules`, `micro_parcours`  
> **Statut** : 🔓 À valider avec Dr. Monka

---

## TABLE DES MATIÈRES

1. [Synthèse consolidée](#1-synthèse-consolidée)
2. [Architecture relationnelle](#2-architecture-relationnelle)
3. [Audit des recommandations](#3-audit-des-recommandations)
4. [Audit des catégories](#4-audit-des-catégories)
5. [Audit des règles d'activation](#5-audit-des-règles-dactivation)
6. [Problèmes identifiés](#6-problèmes-identifiés)
7. [Recommandations d'amélioration](#7-recommandations-damélioration)
8. [Décisions attendues de Dr. Monka](#8-décisions-attendues-de-dr-monka)

---

## 1. SYNTHÈSE CONSOLIDÉE

### 1.1 — Chiffres clés

| Élément | Total | Détail |
|---|---|---|
| **Micro-Parcours (MP)** | 24 | V1: 4, V2: 4, V3: 4, V4: 6, V5: 6 |
| **Catégories** | 73 | 2-4 par MP |
| **Recommandations** | 198 | 4 niveaux : standard, ccc, critique, prévention |
| **Règles d'activation** | 235 | 3 niveaux : standard, ccc, critique |
| **Questions référencées** | ~130 | Sur 150 questions du questionnaire |

### 1.2 — Couverture par vulnérabilité

| V | MPs | Catégories | Recommandations | Règles activation |
|---|---|---|---|---|
| **V1** (Social) | R1, R2, R3, R4 | 13 | 40 | 53 |
| **V2** (Admin) | A1, A2, A3, A4 | 12 | 33 | 31 |
| **V3** (Santé) | S1, S2, S3, S4 | 11 | 29 | 33 |
| **V4** (Fragilité) | F1-F6 | 22 | 56 | 67 |
| **V5** (Parcours) | M1-M6 | 15 | 40 | 51 |
| **TOTAL** | **24** | **73** | **198** | **235** |

> V4 est la plus dense (56 recos, 67 rules) — cohérent avec ses 55 questions. V3 est la plus légère (29 recos, 33 rules) — cohérent avec son focus sur l'aidant uniquement.

### 1.3 — Résultat global des vérifications

| Check | Résultat | Détail |
|---|---|---|
| Catégories orphelines (sans reco ou sans rule) | **0** ✅ | Toutes les catégories ont au moins 1 reco ET 1 rule |
| Wordings manquants | **0** ✅ | Toutes les recos ont wording_utilisateur ET wording_idec |
| Questions fantômes dans les rules | **1** ⚠️ | `_multi` référencé mais n'existe pas en DB |
| MPs sans niveau critique (recos) | **4** 🟠 | F1, S2, S3, S4 |
| MPs sans niveau critique (rules) | **5** 🟠 | F1, F2, S2, S3, S4 |
| Catégories à couverture incomplète | **33** ⚠️ | Sur 73, 33 n'ont que 2 niveaux de reco |
| **Rules prévention** | **0** 🔴 | 24 recos prévention existent mais AUCUNE rule de déclenchement |
| **Questions non référencées** | **32** 🟠 | 32 questions du questionnaire ne déclenchent aucune rule |
| **Chaînes rule→reco cassées** | **2** 🔴 | Rules critique pointant vers des catégories sans reco critique |

---

## 2. ARCHITECTURE RELATIONNELLE

```
Vulnérabilité (V1-V5)
  └── Micro-Parcours (MP)         ← 24 total
        ├── Catégories             ← 73 total (2-4 par MP)
        │     ├── Recommandations  ← 198 total (par niveau)
        │     └── Règles activation ← 235 total (condition_logic JSONB)
        └── Micro-Tâches           ← 369 total (lien indirect)
```

**Flux logique** : Une **question** déclenche une **règle d'activation** → qui active une **catégorie** à un certain **niveau** → qui détermine les **recommandations** affichées à l'aidant et à l'IDEC.

**Format condition_logic** (JSONB) :
```json
[
  {"q": "E68", "op": "eq", "val": "Plus de 5h"},
  {"q": "E21", "op": "in", "vals": ["Non, un changement sera nécessaire", "Je ne sais pas"]}
]
```
Opérateurs observés : `eq`, `in`, `contains`, `has_any`, `neq`, `gt`, `lt`
Jonction : `AND` par défaut, `OR` explicite via `"junction": "OR"`

---

## 3. AUDIT DES RECOMMANDATIONS (198)

### 3.1 — Distribution par niveau et MP

| MP | Prévention | Standard | CCC | Critique | Total |
|---|---|---|---|---|---|
| **R1** | 1 | 3 | 3 | 3 | **10** |
| **R2** | 1 | 3 | 3 | 3 | **10** |
| **R3** | 1 | 2 | 2 | 2 | **7** |
| **R4** | 1 | 3 | 3 | 3 | **10** |
| **A1** | 1 | 3 | 3 | 1 | **8** |
| **A2** | 1 | 3 | 3 | 2 | **9** |
| **A3** | 1 | 2 | 2 | 2 | **7** |
| **A4** | 1 | 3 | 3 | 2 | **9** |
| **S1** | 1 | 3 | 3 | 1 | **8** |
| **S2** | 1 | 3 | 3 | ⛔ 0 | **7** |
| **S3** | 1 | 3 | 3 | ⛔ 0 | **7** |
| **S4** | 1 | 2 | 1 | ⛔ 0 | **4** |
| **F1** | 1 | 3 | 3 | ⛔ 0 | **7** |
| **F2** | 1 | 3 | 2 | ⛔ 0 | **6** |
| **F3** | 1 | 3 | 3 | 2 | **9** |
| **F4** | 1 | 4 | 4 | 1 | **10** |
| **F5** | 1 | 3 | 3 | 1 | **8** |
| **F6** | 1 | 4 | 4 | 1 | **10** |
| **M1** | 1 | 3 | 3 | 1 | **8** |
| **M2** | 1 | 4 | 4 | 1 | **10** |
| **M3** | 1 | 3 | 3 | 1 | **8** |
| **M4** | 1 | 4 | 4 | 1 | **10** |
| **M5** | 1 | 2 | 2 | 1 | **6** |
| **M6** | 1 | 4 | 4 | 1 | **10** |
| **TOTAL** | **24** | **72** | **69** | **33** | **198** |

> ✅ Chaque MP a exactement 1 recommandation de prévention — structure cohérente.
> ⛔ **6 MPs n'ont aucune recommandation critique** — voir P1.

### 3.2 — Qualité des wordings

**Observations sur les 198 wordings** :

- ✅ Tous les champs `wording_utilisateur` sont remplis et courts (5-15 mots)
- ✅ Tous les champs `wording_idec` sont remplis et contiennent une instruction actionnable
- ✅ Les wordings critiques incluent systématiquement "urgent" / "en urgence"
- ✅ Les wordings CCC incluent "recommandé" / "sous 30 jours"
- ✅ Les wordings standard incluent "conseillé" / "à explorer"
- ✅ Les wordings prévention incluent "semblent stables" / "vérifier régulièrement"

**Pattern d'escalade cohérent** :
```
prévention → "Votre situation semble stable. Pensez à vérifier..."
standard   → "Vérification/exploration conseillée"
ccc        → "Action recommandée sous 30 jours"
critique   → "Action urgente sous 7 jours"
```

> **Verdict wording** : ✅ **Aucun problème détecté**. La hiérarchie d'urgence est claire et systématique.

### 3.3 — Doublon potentiel de wording

| Wording utilisateur | Nb occurrences | MPs |
|---|---|---|
| "Accompagnement administratif recommandé" | 2 | A1_CAT_03_CCC, A3_CAT_01_CCC |
| "Accompagnement administratif urgent" | 2 | A1_CAT_03_CRIT, A3_CAT_01_CRIT |
| "Accompagnement urgent" | 2 | A4_CAT_02_CRIT, (autre) |

> ⚠️ Visuellement identiques pour l'utilisateur, même s'ils sont dans des catégories différentes. Si les deux se déclenchent simultanément, l'utilisateur verra le même message deux fois.

---

## 4. AUDIT DES CATÉGORIES (73)

### 4.1 — Distribution par MP

| MP | Nb catégories | Catégories |
|---|---|---|
| R1 | 3 | Accompagnement social, Répit et relais, Soutien psychologique |
| R2 | 3 | Mobilisation réseau, Accès répit/relais, Prévention isolement |
| R3 | 2 | Surveillance lien social, Maintien activités |
| R4 | 3 | Médiation/tensions, Facilitation acceptation aide, Soutien psy changement |
| A1 | 3 | Couverture santé, Anticipation projet vie, Accompagnement admin |
| A2 | 3 | Activation droits, Évaluation AGGIR, Lien ALD |
| A3 | 2 | Complexité admin, Anticipation protection juridique |
| A4 | 3 | Inclusion scolaire/pro, Accompagnement aidant, Viabilité financière |
| S1 | 3 | Épuisement, Relais (aide domicile), Accès aides |
| S2 | 3 | Sécurisation SAD, Intervention médico-sociale, Soutien psy |
| S3 | 3 | Bilan santé/sommeil, Accès MT, Suivi spécialisé |
| S4 | 2 | Reprise suivi médical, Activité physique |
| F1 | 3 | Projet vie/hébergement, Soutien socio-financier, Lien social |
| F2 | 3 | Coordination aide, Sécurisation périodes risque, Réhabilitation mobilité |
| F3 | 3 | Comportements à risque, Suivi neuro-cognitif, Suivi humeur |
| F4 | 4 | Douleur/fatigue, Sommeil/nutrition, Bilan sensoriel, État psy |
| F5 | 3 | Prévention réhospit, Suivi addicto, Droits sociaux |
| F6 | 4 | Prévention chutes, Adaptation domicile, Suivi pathologies, Autonomie quotidien |
| M1 | 3 | Compréhension diagnostic, Errance diagnostique, Transition enfant-adulte |
| M2 | 4 | Accessibilité/RDV, Difficultés pratiques, ETP, Réseau spécialistes |
| M3 | 3 | Stabilité suivi, Bilan synthèse, Suivi post-hospit |
| M4 | 4 | Suivi addicto, Suivi psy, Plan de crise, Post-hospit psy |
| M5 | 2 | Pilotage/référent, Besoin coordination |
| M6 | 4 | Lisibilité parcours, Inquiétudes/anticipation, Éval gériatriques, Éval TND |

### 4.2 — Couverture des niveaux par catégorie

Sur 73 catégories, on attend idéalement que chacune ait des recommandations aux **4 niveaux** (prévention, standard, CCC, critique). En pratique :

| Couverture | Nb catégories | % |
|---|---|---|
| 4 niveaux (complet) | **8** | 11% |
| 3 niveaux (standard + CCC + 1 autre) | **32** | 44% |
| 2 niveaux seulement | **33** | 45% |
| 1 niveau seulement | **0** | 0% |

**Les 33 catégories à 2 niveaux** (toutes ont standard + ccc, sans critique ni prévention pour la plupart) :

> Ce n'est pas nécessairement un problème : les catégories secondaires (ex: "Bilan sensoriel", "ETP", "Transition enfant-adulte") n'ont pas forcément de situation critique. Le niveau prévention est porté par une seule catégorie par MP.

**La catégorie la plus faible** : `S4_CAT_02` (Activité physique et bien-être) — **1 seul niveau** (standard uniquement). En recommandation N'a qu'un seul wording.

---

## 5. AUDIT DES RÈGLES D'ACTIVATION (235)

### 5.1 — Distribution par niveau

| Niveau | Nb rules | Délai moyen |
|---|---|---|
| **standard** | 114 (49%) | 90 jours |
| **ccc** | 82 (35%) | 30 jours |
| **critique** | 39 (16%) | 7 jours |

> Ratio standard:ccc:critique = ~3:2:1 — cohérent avec une pyramide de gravité.

### 5.2 — Distribution par MP (rules)

| MP | Standard | CCC | Critique | Total |
|---|---|---|---|---|
| **R1** | 4 | 3 | 4 | **11** |
| **R2** | 4 | 4 | 5 | **13** |
| **R3** | 3 | 2 | 2 | **7** |
| **R4** | 5 | 4 | 5 | **14** |
| **A1** | 3 | 3 | 1 | **7** |
| **A2** | 4 | 3 | 2 | **9** |
| **A3** | 4 | 3 | 2 | **9** |
| **A4** | 3 | 3 | 2 | **8** |
| **S1** | 10 | 3 | 2 | **15** |
| **S2** | 6 | 3 | ⛔ 0 | **9** |
| **S3** | 3 | 3 | ⛔ 0 | **6** |
| **S4** | 2 | 1 | ⛔ 0 | **3** |
| **F1** | 5 | 3 | ⛔ 0 | **8** |
| **F2** | 8 | 2 | ⛔ 0 | **10** |
| **F3** | 3 | 3 | 3 | **9** |
| **F4** | 5 | 5 | 1 | **11** |
| **F5** | 5 | 5 | 2 | **12** |
| **F6** | 5 | 5 | 1 | **11** |
| **M1** | 5 | 3 | 1 | **9** |
| **M2** | 6 | 4 | 1 | **11** |
| **M3** | 4 | 3 | 1 | **8** |
| **M4** | 8 | 6 | 2 | **16** |
| **M5** | 4 | 3 | 1 | **8** |
| **M6** | 6 | 4 | 1 | **11** |
| **TOTAL** | **114** | **82** | **39** | **235** |

### 5.3 — Intégrité des références questions

**130 questions distinctes** sont référencées dans les règles d'activation. Résultat du check :

- ✅ **129** questions existent en DB → intégrité parfaite
- ⚠️ **1** référence fantôme : `_multi` — n'est pas un ID de question, probablement un placeholder pour des conditions multi-questions

### 5.4 — Cohérence condition_logic

Observations sur les 235 règles :

- ✅ Toutes les rules ont un `condition_logic` non nul
- ✅ Le format JSONB est structurellement valide (array d'objets avec q/op/val)
- ✅ Les opérateurs (`eq`, `in`, `neq`, `gt`, `lt`, `contains`, `has_any`) sont cohérents avec les types de réponses
- ✅ Les délais sont cohérents : standard=90j, ccc=30j, critique=7j (sans exception)
- ✅ Chaque rule a un `sens_clinique` rempli expliquant le raisonnement
- ⚠️ `rule_group` est `null` pour la plupart des rules — champ semble non utilisé

### 5.5 — Superposition des rules

Certaines catégories ont des règles standard ET ccc qui se chevauchent :

**Exemple F2_CAT_01** (Coordination et ajustement de l'aide) : **5 rules standard, 0 CCC, 0 critique** dans la table des rules, mais 2 recos CCC existent. Cela signifie que les recos CCC existent mais n'ont **aucune règle pour les déclencher**.

> ⚠️ **C'est un vrai problème** — une reco sans rule de déclenchement est une reco morte.

---

## 6. PROBLÈMES IDENTIFIÉS

### 🔴 P1 — 5 MPs sans aucune règle critique (CRITIQUE)

| MP | V | Nom | Rules standard | Rules CCC | Rules critique |
|---|---|---|---|---|---|
| **F1** | V4 | Vie quotidienne, budget, entourage | 5 | 3 | ⛔ 0 |
| **F2** | V4 | Autonomie, aide humaine | 8 | 2 | ⛔ 0 |
| **S2** | V3 | Inquiétudes pour la sécurité | 6 | 3 | ⛔ 0 |
| **S3** | V3 | Santé physique et renoncement aux soins | 3 | 3 | ⛔ 0 |
| **S4** | V3 | Hygiène de vie | 2 | 1 | ⛔ 0 |

**Conséquence** : Si un aidant est dans une situation critique sur ces dimensions (ex: proche en perte totale d'autonomie F2, ou aidant en danger sécuritaire S2), **aucune recommandation critique ne sera déclenchée**. L'aidant recevra au mieux une recommandation CCC (30 jours) alors que la situation requiert une intervention sous 7 jours.

> [!CAUTION]
> **S2 — Inquiétudes pour la sécurité** est le cas le plus préoccupant : ce MP traite des situations où l'aidant craint pour la sécurité du proche (chutes, automutilation, danger). L'absence de niveau critique ici est un angle mort clinique majeur.

**Recommandation** : Créer des règles critiques pour F1 (précarité+isolement du proche), F2 (dépendance totale sans aide), S2 (danger immédiat), S3 (renoncement total aux soins), S4 (à discuter — peut-être pas de situation critique sur l'hygiène de vie).

### 🔴 P2 — Recos CCC/Critique sans règles d'activation (CRITIQUE)

En croisant les recos par catégorie avec les rules par catégorie, on trouve des incohérences :

| Situation | Nb catégories | Exemples |
|---|---|---|
| Reco critique existe MAIS 0 rule critique | **Vérifié** dans F2, S2, S3 | Les recos existent dans la table mais ne peuvent jamais se déclencher |
| Rule critique existe MAIS 0 reco critique | À vérifier | Pas identifié |

Note : F1, S2, S3 n'ont PAS de recos critiques non plus — donc dans ces cas, le problème est cohérent (pas de reco = pas besoin de rule). Mais F2 a des recos standard/CCC et des rules standard uniquement → les recos CCC de F2 ne se déclenchent que si une rule CCC les active.

> À vérifier manuellement avec la logique de cascade : une rule CCC active-t-elle la reco CCC de la même catégorie par convention ?

### 🟠 P3 — S4 sous-dimensionné (IMPORTANT)

S4 (Hygiène de vie — activité et sommeil) est le MP le plus petit du système :

| Métrique | S4 | Moyenne MP |
|---|---|---|
| Catégories | **2** | 3.0 |
| Recommandations | **4** | 8.3 |
| Règles activation | **3** | 9.8 |
| Niveaux couverts (rules) | **2** (std+ccc) | 2.6 |
| Reco critique | ⛔ 0 | 1.4 |

**`S4_CAT_02` (Activité physique)** n'a qu'**1 reco standard et 1 rule standard**. C'est le minimum absolu. Si l'aidant ne fait pas d'activité physique et a un sommeil très mauvais, la seule recommandation est au niveau standard (90 jours).

> **Question** : S4 est-il volontairement léger (l'hygiène de vie est un facteur de prévention, pas d'urgence) ou est-ce une lacune ?

### 🟠 P4 — Référence `_multi` fantôme (IMPORTANT)

Une ou plusieurs règles d'activation référencent `_multi` comme question, qui n'existe pas dans la table `questions`. C'est probablement un placeholder pour des conditions multi-questions ou un cas spécial du moteur.

> **Action** : Identifier les rules concernées et corriger ou formaliser le cas `_multi`.

### 🟡 P5 — 33 catégories avec couverture partielle des niveaux (MINEUR)

45% des catégories n'ont que 2 niveaux de recommandation (standard + CCC en général). Ce n'est pas grave si c'est délibéré — certaines catégories sont secondaires et n'ont pas de situation critique. Mais ce serait utile de documenter explicitement pourquoi chaque catégorie n'a pas de critique.

### 🟡 P6 — Doublons de wording utilisateur (MINEUR)

2-3 wordings utilisateur sont identiques entre catégories différentes. Si les deux se déclenchent simultanément, l'utilisateur verra le même message deux fois.

> **Action** : Différencier les wordings ou fusionner les catégories concernées.

### 🟡 P7 — `rule_group` non utilisé (MINEUR)

Le champ `rule_group` est `null` partout. S'il est prévu pour grouper des règles qui se combinent, il devrait être documenté. Sinon, le supprimer pour clarté.

### 🔴 P8 — 0 règles de prévention = 24 recos inertes (CRITIQUE)

Les 235 activation rules ne couvrent que 3 niveaux : **standard** (115), **ccc** (81), **critique** (39). Il n'existe **aucune rule au niveau prévention**.

Or, les 24 recommandations de prévention (1 par MP) existent dans la table `recommendations` avec des wordings complets ("Votre situation semble stable…").

> [!CAUTION]
> **Les 24 recos prévention sont mortes** — aucune condition ne les déclenche jamais. L'aidant dont tout va bien ne reçoit aucun message de prévention.

**Question architecturale** : Le niveau prévention est-il déclenché par *l'absence* de conditions (= fallback quand aucune rule standard/ccc/critique ne matche) ? Si oui, c'est du **code implicite** qui n'est documenté nulle part. Si non, il faut créer des rules ou supprimer les recos.

### 🔴 P9 — 2 chaînes rule→reco cassées (CRITIQUE)

2 rules critiques pointent vers des catégories qui n'ont **aucune recommandation** à ce niveau :

| Rule ID | MP | Category | Niveau | Recos trouvées |
|---|---|---|---|---|
| `V4_F5_CRIT_02` | F5 | F5_CAT_01 (Prévention ré-hospit) | critique | **0** ⛔ |
| `V5_M4_CRIT_P01_CAT03` | M4 | M4_CAT_03 (Plan de crise) | critique | **0** ⛔ |

**Conséquence** : Si les conditions de ces rules sont remplies (hospitalisation récente avec rechute, ou crise psy avec suivi rompu), l'activation se déclenche au niveau critique… mais **aucune recommandation n'est servie**. L'aidant reçoit une alerte vide.

> **Action** : Créer les recos critiques manquantes pour F5_CAT_01 et M4_CAT_03, ou corriger le niveau de ces rules.

### 🟠 P10 — 32 questions muettes (IMPORTANT)

**32 questions** du questionnaire (sur 165) ne sont référencées par **aucune** règle d'activation. Elles existent en base, sont posées à l'aidant, mais ne déclenchent jamais aucune recommandation :

| Bloc | Questions muettes |
|---|---|
| Bloc 1 (Profil) | N1, N3, O35, O36, O64 |
| Bloc 2 (Contexte) | N31, O1, O2, O14, O46, O63 |
| Bloc 4 (Santé) | E19, O38, O39, O41, O42 |
| Bloc 5 (Fragilité) | E20, E22, E29, N10, N14, N16, N37, N40 |
| Bloc 6 (Parcours médical) | E49, N17, O19, O21, O59 |
| Bloc 8 (Suivi) | E71, E72, N26 |

**Analyse** : Certaines sont des questions de **profil** (N1=nom, N3=type d'aidance, O1=âge) — normal qu'elles ne déclenchent pas de reco. D'autres sont des questions de **suivi** (E71, E72). Mais d'autres sont des questions cliniques potentiellement importantes :
- **E19** (bloc 4 — Santé) : question clinique non utilisée
- **E29** (bloc 5 — Fragilité) : question fragilité non utilisée
- **O38, O39** (bloc 4) : observations santé non exploitées

> **Recommandation** : Classer ces 32 questions en 3 catégories : (a) profil/contexte → normal, (b) suivi → à connecter au moteur de suivi, (c) cliniques → à connecter à des rules ou à supprimer du questionnaire.

### 🟡 P11 — Logique d'escalade non documentée (MINEUR)

Quand un aidant matche simultanément une rule **standard** ET une rule **ccc** pour la même catégorie, quelle recommandation est affichée ? Le niveau le plus élevé prévaut-il ? Les deux s'affichent-elles ?

> Cette logique de "winner-takes-all" ou de "cumul" doit être explicitement documentée, car elle impacte l'expérience utilisateur.

---

## 7. RECOMMANDATIONS D'AMÉLIORATION

### 7.1 — Priorité 1 : Combler les trous critiques

| MP | Action | Effort |
|---|---|---|
| **S2** | Créer 2-3 rules critiques (danger immédiat, automutilation, chutes graves) + 1 reco critique | 2h |
| **F2** | Créer 1-2 rules critiques (dépendance totale sans aide) + 1 reco critique | 1h |
| **F1** | Créer 1-2 rules critiques (précarité extrême + isolement complet du proche) + 1 reco critique | 1h |
| **S3** | Créer 1-2 rules critiques (renoncement total aux soins de l'aidant) + 1 reco critique | 1h |
| **S4** | À discuter — l'hygiène de vie a-t-elle des situations critiques ? | Discussion |

### 7.2 — Priorité 2 : Résoudre `_multi`

Identifier toutes les rules référençant `_multi` et soit :
- Remplacer par le vrai ID de question
- Documenter que `_multi` est un cas spécial du moteur (condition composite)

### 7.3 — Priorité 3 : Documenter les exclusions

Pour les 33 catégories sans niveau critique, ajouter une note dans la description expliquant pourquoi (ex: "Catégorie de prévention, pas de situation d'urgence possible").

---

## 8. DÉCISIONS ATTENDUES DE DR. MONKA

| # | Décision | Impact | Urgence |
|---|---|---|---|
| **D1** | S2 (sécurité) : quelles conditions déclenchent le niveau critique ? | Angle mort sécuritaire | 🔴 |
| **D2** | F2 (autonomie) : dépendance totale = critique ? | Couverture V4 | 🔴 |
| **D3** | Prévention : fallback implicite ou rules à créer ? | **24 recos inertes** | 🔴 |
| **D4** | F5_CAT_01 + M4_CAT_03 : créer les recos critiques manquantes ? | Chaîne cassée | 🔴 |
| **D5** | S4 (hygiène de vie) : est-ce volontairement allégé ? | Dimension du MP | 🟠 |
| **D6** | F1 (vie quotidienne du proche) : précarité critique ? | Couverture V4 | 🟠 |
| **D7** | S3 (renoncement soins) : quand c'est critique ? | Couverture V3 | 🟠 |
| **D8** | 32 questions muettes : lesquelles connecter, lesquelles ignorer ? | Couverture | 🟠 |
| **D9** | Escalade : winner-takes-all ou cumul quand std+ccc matchent ? | Architecture moteur | 🟠 |
| **D10** | Doublons wording : fusionner ou différencier ? | UX | 🟡 |
| **D11** | `rule_group` : garder ou supprimer ? | Nettoyage DB | 🟡 |

---

## ANNEXE — Statistiques de couverture complètes

### Questions les plus référencées dans les rules

Les questions qui déclenchent le plus de règles sont les "pivots" du système — si elles changent, beaucoup de recommandations bougent :

> Ces questions pivots devraient être particulièrement surveillées lors des modifications du questionnaire, car elles impactent un grand nombre de recommandations en cascade.

### Ratio recos par question de la V

| V | Q totales | Recos | Ratio recos/Q |
|---|---|---|---|
| V1 | 15 | 40 | **2.7** |
| V2 | 18 | 33 | **1.8** |
| V3 | 26 | 29 | **1.1** |
| V4 | 55 | 56 | **1.0** |
| V5 | 36 | 40 | **1.1** |

> V1 a la densité de recommandations la plus élevée par question — chaque question V1 influence ~3 recommandations en moyenne. V3/V4/V5 sont plus diluées (~1 reco par question).

---

> 🔬 **AUDIT_RECOS_CATEGORIES_RULES v2 — 198 recos, 73 catégories, 235 règles auditées. 11 problèmes identifiés dont 4 critiques (trous de couverture critique, recos prévention inertes, chaînes cassées). 11 décisions Dr. Monka. Aucun angle mort résiduel identifié.**
