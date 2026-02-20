# 🔬 AUDIT — Scoring Monka : Méthodologie, Angles Morts et Recommandations

> **Date** : 19/02/2026  
> **Auteur** : Antonin Rimaud — PRAGMA Studio  
> **Scope** : `METHODOLOGIE_SCORING.md` + `SCORING_V1.md` à `SCORING_V5.md`  
> **Benchmark** : Zarit ZBI-22, SEGA volet A, Caregiver Burden Scale (CBS), Item Response Theory (IRT), Content Validity Ratio (CVR — Lawshe)  
> **Statut** : 🔓 À valider avec Dr. Monka

---

## TABLE DES MATIÈRES

1. [Synthèse consolidée](#1-synthèse-consolidée)
2. [Remise en question de la méthode à 2 critères](#2-remise-en-question-de-la-méthode-à-2-critères)
3. [Comparaison avec les alternatives](#3-comparaison-avec-les-alternatives)
4. [Verdict sur la méthode](#4-verdict-sur-la-méthode)
5. [Problèmes techniques identifiés](#5-problèmes-techniques-identifiés)
6. [Cohérence des scores max et des interprétations](#6-cohérence-des-scores-max-et-des-interprétations)
7. [Recommandations d'amélioration](#7-recommandations-damélioration)
8. [Plan de validation opérationnel](#8-plan-de-validation-opérationnel)
9. [Comparaison aux standards internationaux](#9-comparaison-aux-standards-internationaux)
10. [Décisions attendues de Dr. Monka](#10-décisions-attendues-de-dr-monka)

---

## 1. SYNTHÈSE CONSOLIDÉE

### 1.1 — Données de scoring par vulnérabilité

| V | Thème | Q totales | Q scorantes | Q +2 | Score max brut | Résolution* | Conditionn. |
|---|---|---|---|---|---|---|---|
| **V1** | Social / relationnel | 15 | 12 | 0 | 14 pts | 7.1 pts | 0 |
| **V2** | Administratif | 18 | 8 | 0 | 11 pts | 12.5 pts | 3 |
| **V3** | Santé aidant | 26 | 17 | 2 | 21 pts | 4.8 pts | 1 |
| **V4** | Fragilité proche | 55 | 38* | 3 | 44 pts | 2.3 pts | 2 |
| **V5** | Parcours médical | 36 | 18 | 0 | 19 pts | 5.3 pts | 2 |
| **TOTAL** | | **150** | **93** | **5** | **109 pts** | — | **8** |

> **\*Résolution** = 100 / score_max = le pas minimum qu'un seul point représente sur l'échelle normalisée 0-100.  
> **\*V4** : métadonnées indiquent "41" mais le tableau détaillé n'en liste que 38 (cf. P1).

### 1.2 — Répartition des questions

```
150 questions (hors 15 triggers)
    ├── 93 SCORANTES (62%)
    │     ├── 88 questions à score max +1
    │     └── 5 questions à score max +2 (risque vital)
    └── 57 NON SCORANTES (38%)
          ├── 24 listes à cocher (pas d'échelle)
          ├── 15 actions passées / contexte fixe
          ├── 11 aiguillage (existence suivi)
          └── 7 autres (ambiguïté, doublon, souhait prospectif)
```

---

## 2. REMISE EN QUESTION DE LA MÉTHODE À 2 CRITÈRES

La méthodologie actuelle sélectionne les questions scorantes via 2 conditions :
- **C1 — Informativité** : la réponse nous informe-t-elle sur l'intensité de la vulnérabilité ?
- **C2 — Fiabilité** : peut-on attribuer un score non ambigu aux réponses ?

### 2.1 — Ce que cette méthode fait bien

| Point fort | Explication |
|---|---|
| **Reproductible** | Deux analystes indépendants appliqueraient les mêmes critères et trouveraient ~90% des mêmes résultats |
| **Transparente** | Chaque inclusion/exclusion est justifiée ligne par ligne dans les fichiers SCORING_V |
| **Indépendante de la classification** | Ne force aucune reclassification état/facteur — résout le problème principal des approches antérieures |
| **Cohérente avec la littérature** | Zarit, CBS et SEGA ne séparent pas état/facteur pour le scoring |
| **Défendable devant un tiers** | Un partenaire institutionnel peut auditer le raisonnement |

### 2.2 — Les 5 angles morts de la méthode

#### Angle mort 1 — C1 reste un jugement subjectif habillé en critère objectif

La question « La réponse informe-t-elle sur l'intensité ? » semble objective mais ne l'est pas. Exemples de zones grises :

| Question | Arguments pour C1 ✅ | Arguments contre C1 ❌ |
|---|---|---|
| **E6** — Le proche accepte-t-il l'aide extérieure ? | Le refus d'aide crée une surcharge mesurable sur l'aidant (il ne peut pas déléguer) | Le refus est un comportement du **proche**, pas un état de l'aidant. L'impact est indirect et déjà capté par O27/O28 |
| **O43** — Nombre de médicaments de l'aidant | La polymédication est un marqueur de fragilité santé (SEGA) | Ce n'est pas un signal d'intensité "en tant qu'aidant" — c'est un état de santé préexistant |
| **E17** — Activité physique régulière ? | L'absence d'activité physique est un facteur de risque de burn-out | C'est un comportement, pas un état. L'aidant peut ne pas faire de sport sans que ça soit lié à son rôle |

> **Verdict** : C1 est le meilleur critère praticable, mais il ne fait pas disparaître la subjectivité — il la structure. Ce n'est pas un défaut éliminatoire, c'est une limite inhérente à toute sélection d'items cliniques pré-validation empirique.

#### Angle mort 2 — C2 élimine des questions potentiellement riches

Le critère de fiabilité exclut systématiquement les **listes à cocher** (24 questions). Or certaines contiennent de l'information d'intensité exploitable :

| Question exclue | Information perdue | Alternative |
|---|---|---|
| **E19** — Soucis de santé (8 options) | Le **nombre** de soucis cochés est un signal : 0 → +0, 1-2 → +1, 3+ → +1 | Scorer par comptage |
| **N29** — Droits/aides bénéficiés (22 options) | Le **nombre** de dispositifs activés pourrait indiquer la complexité | Trop ambigu — justement exclu |
| **O16** — Maladies du proche (16 pathologies) | Le nombre de pathologies = polypathologie = intensité SEGA | Scorer par comptage (≥3 = +1) |

> **Verdict** : C2 est trop strict sur les listes à cocher. Un sous-critère **C2bis — Scorable par comptage** permettrait de récupérer 3-5 questions sans compromettre la reproductibilité.

#### Angle mort 3 — Pas de critère de couverture dimensionnelle

La méthode vérifie chaque question isolément mais ne vérifie jamais si l'ensemble des questions scorantes couvre correctement les dimensions de la vulnérabilité. 

Exemple concret V2 (Administratif) :
- 8 questions scorantes sur 18
- **Aucune** ne porte sur les droits (N29, E62, N42 toutes exclues)
- Résultat : le score V2 ne mesure **aucunement** si l'aidant accède à ses droits, alors que c'est un pilier de la vulnérabilité administrative

> **Verdict** : Ajouter un **C3 — Couverture** : après le passage C1+C2, vérifier que chaque sous-dimension de la vulnérabilité a au moins une question scorante. Si un sous-bloc entier est exclu, c'est un signal d'alerte.

#### Angle mort 4 — Absence de pondération entre sous-blocs

Au sein d'une V, tous les sous-blocs pèsent le même poids par question. Mais V4 a des sous-blocs de tailles très différentes :

| Sous-bloc V4 | Q scorantes | Poids dans le score |
|---|---|---|
| Mémoire, comportement, risques | 9 (dont 3 à +2) | **~32%** |
| Douleur, fatigue, sommeil | 8 | **~18%** |
| Autonomie, aide humaine | 5 | **~11%** |
| Vie quotidienne | 5 | **~11%** |
| Épisodes aigus | 3 | **~7%** |

Le score V4 est naturellement dominé par la dimension "mémoire et comportement" simplement parce qu'il y a plus de questions dans ce sous-bloc. Ce n'est pas forcément incorrect cliniquement, mais ce n'est **pas un choix délibéré** — c'est un artefact du nombre de questions par sous-bloc.

> **Verdict** : En phase MVP, acceptable (Zarit et CBS ne pondèrent pas non plus). En V2, une normalisation par sous-bloc pourrait rééquilibrer.

#### Angle mort 5 — La méthode ne gère pas le cas des questions conditionnelles

8 questions scorantes ne sont posées que si certaines conditions sont remplies (profil aidance). Le document mentionne "le score max sera ajusté" mais **aucune règle formelle n'est posée**.

Conséquence : deux aidants avec le même nombre de réponses positives mais des profils aidance différents auront des scores normalisés différents — et on ne sait pas si c'est voulu ou accidentel.

---

### 2.3 — Existe-t-il une meilleure méthode ?

Voici les **5 méthodes alternatives** utilisées en psychométrie pour sélectionner les items d'un questionnaire clinique :

#### Méthode A — Content Validity Ratio (CVR — Lawshe, 1975)

**Principe** : Un panel d'experts (5-10 minimum) évalue chaque question comme "essentielle", "utile mais pas essentielle", ou "non nécessaire". Le CVR = (n_essentielle - N/2) / (N/2). On ne retient que les items au-dessus d'un seuil statistique.

| | CVR | Monka C1+C2 |
|---|---|---|
| Objectivité | ✅ Multi-experts, quantifié | ⚠️ 1 expert + 1 analyste |
| Reproductibilité | ✅ Statistiquement fondé | ✅ Critères explicites |
| Praticabilité | ❌ Nécessite **5-10 médecins** | ✅ 2 personnes suffisent |
| Phase MVP | ❌ Impossible maintenant | ✅ Utilisable |

**Verdict** : Supérieur scientifiquement mais **impossible en MVP** avec un seul médecin. **À envisager en phase Validation** (recruter 5 gériatres pour noter chaque question).

#### Méthode B — Item-Total Correlation (post-données)

**Principe** : Après collecte de données sur N participants, calculer la corrélation entre le score de chaque item et le score total. Garder les items > 0.3, éliminer < 0.2.

**Verdict** : C'est **la** méthode gold standard. Mais elle nécessite des données réelles. Parfaitement complémentaire à C1+C2 en phase pilote (= vérifier empiriquement que les items sélectionnés par C1+C2 corrèlent bien avec le score total).

#### Méthode C — Exploratory Factor Analysis (EFA)

**Principe** : Analyser statistiquement si les questions se regroupent en facteurs cohérents. Vérifie que la structure V1-V5 correspond à la réalité statistique.

**Verdict** : Nécessite ~200+ réponses complètes. Phase V2. Permettrait de vérifier si les 5 V correspondent à 5 réels facteurs latents ou s'il faudrait fusionner/séparer certaines V.

#### Méthode D — Item Response Theory (IRT)

**Principe** : Modélise la probabilité de chaque réponse en fonction du niveau "réel" de vulnérabilité. Permet de sélectionner les items qui discriminent le mieux les niveaux de vulnérabilité.

**Verdict** : Le Graal de la psychométrie. Nécessite ~300-500 réponses et une expertise psychométrique. Phase V3.

#### Méthode E — Scoring bi-dimensionnel (État + Risque)

**Principe** : Séparer le score en deux sous-scores (état actuel + contexte de risque) puis les combiner via une formule.

**Verdict** : Analysé en détail dans `reflexion_methodologie_scoring.md`. Cliniquement plus riche mais plus complexe. Nécessite de définir la formule composite, ce qui est arbitraire sans données. **Reporter à V2.**

### 2.4 — Verdict final sur la méthode

> **La méthode C1 + C2 est la meilleure option praticable pour le MVP.**

| Critère | Score /5 |
|---|---|
| Reproductibilité | ⭐⭐⭐⭐ |
| Défendabilité devant un tiers | ⭐⭐⭐⭐ |
| Fidélité clinique | ⭐⭐⭐ |
| Complétude (couverture) | ⭐⭐ |
| Granularité (discrimination) | ⭐⭐ |

**Améliorations recommandées pour passer de 3/5 à 4/5 :**

1. **Ajouter C2bis** (scoring par comptage pour listes à cocher sélectionnées)
2. **Ajouter C3** (vérification de couverture dimensionnelle post-sélection)
3. **Formaliser les scores max par profil** (résolution du problème conditionnel)

**La prochaine étape de validation** (phase pilote) sera la corrélation item-total (Méthode B) : vérifier que les items choisis par C1+C2 corrèlent effectivement avec le score total sur des données réelles. Si un item choisi ne corrèle pas, c'est que C1 l'a mal évalué. Si un item exclu corrèle, c'est que C1 ou C2 l'a injustement éliminé.

---

## 3. COMPARAISON AVEC LES ALTERNATIVES

| Méthode → | **C1+C2 (actuel)** | **CVR Lawshe** | **Item-Total** | **EFA** | **IRT** | **Bi-dim** |
|---|---|---|---|---|---|---|
| Utilisable maintenant | ✅ | ❌ (5+ experts) | ❌ (données) | ❌ (200+ N) | ❌ (300+ N) | ⚠️ (formule floue) |
| Objectivité | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Défendabilité | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Complexité implémentation | Faible | Moyenne | Faible | Élevée | Très élevée | Moyenne |
| Phase recommandée | **MVP** | Validation | Pilote | V2 | V3 | V2 |

---

## 4. VERDICT SUR LA MÉTHODE

### Ce qu'on garde ✅

- Les 2 conditions C1 + C2 comme filtre principal
- L'échelle 0/+1/+2
- La normalisation sur 100
- La séparation scoring / activation (K13)
- L'ancrage Zarit (V1-V3) + SEGA (V4-V5)

### Ce qu'on ajoute ⚙️

- **C2bis** — scoring par comptage sur listes à cocher sélectionnées (3-5 questions récupérables)
- **C3** — check de couverture dimensionnelle (chaque sous-bloc a ≥ 1 question scorante)
- **Tableau scores max par profil** — pour les 8 questions conditionnelles

### Ce qu'on repousse à la V2 ⏳

- Scoring bi-dimensionnel (état + risque)
- Enrichissement échelle +0/+1/+2 → +0/+1/+2/+3 sur les 4-niveaux
- Pondération par sous-bloc ou par pertinence clinique
- Corrélation item-total empirique
- Factor analysis (EFA/CFA)

---

## 5. PROBLÈMES TECHNIQUES IDENTIFIÉS

### 🔴 P1 — Incohérence métadonnées V4 (CRITIQUE)

Le résumé V4 annonce **"41/55 scorantes"** mais le tableau détaillé n'en liste que **38**. Le calcul du score max (44 pts = 35×1 + 3×2 = 41 ? Non. 38×1 + 3×2 = 44 ? Oui si 3 Q valent +2 et 35 valent +1 → 35+6 = 41... Mais 38-3 = 35 ≠ 41.) 

En réalité : le tableau liste **38 questions scorantes dans le summary** mais le body du document liste **41 lignes avec verdict ✅**. La divergence vient de 3 questions qui sont dans le body mais absentes du tableau résumé.

> **Impact** : Dr. Monka pourrait valider un décompte incorrect.  
> **Action** : Recompter V4 en vérifiant body vs summary.

### 🔴 P2 — Résolution catastrophiquement inégale (CRITIQUE)

C'est **le problème #1 du scoring actuel**.

Un seul point de +1 représente :
- **+9.1%** en V2 (8 Q scorantes, max = 11)
- **+2.3%** en V4 (38 Q scorantes, max = 44)

Conséquence concrète avec les seuils 20/40/60 uniformes :

| Scenario | V2 | V4 |
|---|---|---|
| Seuil "Modéré" (>20) atteint avec... | **3 réponses +** sur 8 | **9 réponses +** sur 38 |
| Seuil "Élevé" (>40) atteint avec... | **5 réponses +** sur 8 | **18 réponses +** sur 38 |
| Seuil "Critique" (>60) avec... | **7 réponses +** sur 8 | **27 réponses +** sur 38 |

**Un aidant "Élevé" en V2 n'a que 5 signaux positifs. Un aidant "Élevé" en V4 en a 18.** Les deux portent la même étiquette mais reflètent des situations très différentes en termes de nombre de symptômes.

> **Action** : Voir §7 — Option A (seuils adaptatifs par V).

### 🟠 P3 — Questions conditionnelles non formalisées (IMPORTANT)

8 questions scorantes sont conditionnelles (dépendent du profil aidance N3). Le score max change selon le profil mais **aucun tableau croisé V × Aidance n'existe** :

| Profil aidance | V2 max | V3 max | V4 max | V5 max |
|---|---|---|---|---|
| Standard (hors Enfant/Handicap/Psy/Addiction) | **8** | **20** | **42** | **17** |
| Enfant / Handicap | **11** (+E64, E65, E67) | 21 | 44 | 19 |
| Troubles psy | 8 | 21 | 44 | **18** (+E50) |
| Addictions | 8 | 21 | **44** (+N38, N39) | **18** (+E51) |

> **Impact** : La normalisation est faussée si on utilise le score max "complet" au lieu du score max "profil". Le même score brut de 5 en V5 donnerait 26% (max=19) ou 29% (max=17) selon le profil.

### 🟠 P4 — Absence de +2 sur V1, V2 et V5

| V | Questions +2 | Analyse |
|---|---|---|
| **V1** | 0 | L'isolement total (E2="Personne") est un facteur de risque de mortalité reconnu (HAS, Zarit). Mérite discussion. |
| **V2** | 0 | Cohérent — la vulnérabilité administrative ne relève pas du risque vital. |
| **V5** | 0 | Les ruptures de parcours médical peuvent être dangereuses mais le risque vital direct est capté en V3/V4. |

> Seule V1 mérite une discussion : faut-il coder E2="Personne" à +2 ?

### 🟡 P5 — Plateau d'insensibilité (+1 pour "Parfois" ET "Toujours")

Sur les 88 questions à score max +1, **30+** ont 3-4 options de réponse, mais les niveaux intermédiaires reçoivent tous +1 :

```
E8 — Solitude émotionnelle :
  Jamais       = +0
  Parfois      = +1  ← même score
  Souvent      = +1  ← même score  
  Tout le temps = +1  ← même score
```

On perd la capacité à distinguer "un peu touché" de "très touché" **au sein d'une même question**. L'information existe dans les réponses (4 niveaux) mais le scoring en élimine la nuance (2 niveaux effectifs).

> **Référence** : Zarit utilise 5 niveaux (0-4), CBS utilise 4 niveaux (1-4). Monka avec 2 niveaux effectifs est en dessous des standards.
> **Phase** : V2 (enrichir à +0/+1/+2 sur les 4-niveaux, ou +0/+1/+2/+3).

### 🟡 P6 — "Je ne sais pas" = +0 systématique

Sur V4 et V5, JNSP est toujours scoré +0. Un aidant qui ne sait pas si son proche a des idées suicidaires, des chutes, ou des troubles cognitifs est potentiellement un aidant qui ne surveille pas — pas un aidant "sans problème".

> Score +0 = choix prudent (pas de faux positif). Mais un **flag JNSP répété** (≥3 réponses JNSP) pourrait générer une alerte séparée "manque de visibilité de l'aidant".

---

## 6. COHÉRENCE DES SCORES MAX ET DES INTERPRÉTATIONS

### 6.1 — Simulation : un aidant modérément touché

Prenons un aidant fictif qui répond "un peu" / "parfois" à 50% des questions scorantes :

| V | Q scorantes | Réponses + (50%) | Score brut | Score % | Seuil | Interprétation |
|---|---|---|---|---|---|---|
| V1 | 12 | 6 | 6/14 | **43%** | 🟠 Élevé | |
| V2 | 8 | 4 | 4/11 | **36%** | 🟡 Modéré | |
| V3 | 17 | 9 | 9/21 | **43%** | 🟠 Élevé | |
| V4 | 38 | 19 | 19/44 | **43%** | 🟠 Élevé | |
| V5 | 18 | 9 | 9/19 | **47%** | 🟠 Élevé | |

→ Cohérent : un aidant touchant ~50% devrait effectivement être "Élevé". ✅

### 6.2 — Simulation : un aidant légèrement touché

Réponse "un peu" / "parfois" à 20% des questions scorantes :

| V | Réponses + (20%) | Score brut | Score % | Seuil |
|---|---|---|---|---|
| V1 | 2 | 2/14 | **14%** | 🟢 Faible |
| V2 | 2 | 2/11 | **18%** | 🟢 Faible |
| V3 | 3 | 3/21 | **14%** | 🟢 Faible |
| V4 | 8 | 8/44 | **18%** | 🟢 Faible |
| V5 | 4 | 4/19 | **21%** | 🟡 Modéré |

→ V5 passe en Modéré alors que les autres sont Faible. Artefact de résolution (V5 max=19, un point = 5.3%). Pas catastrophique mais asymétrique. ⚠️

### 6.3 — Simulation : un aidant en détresse

Réponse "oui" / "souvent" à 80% + 2 réponses +2 :

| V | Réponses + (80%) | Score brut | Score % | Seuil |
|---|---|---|---|---|
| V1 | 10 | 10/14 | **71%** | 🔴 Critique |
| V2 | 6 | 6/11 | **55%** | 🟠 Élevé |
| V3 | 14 + 2×(+2) | 18/21 | **86%** | 🔴 Critique |
| V4 | 30 + 3×(+2) | 36/44 | **82%** | 🔴 Critique |
| V5 | 14 | 14/19 | **74%** | 🔴 Critique |

→ V2 en "Élevé" quand tout le reste est "Critique". Artefact : 80% de 8 questions = 6 réponses +, et 6/11 = 55% → sous le seuil 60%. **C'est un vrai problème** : un aidant en détresse totale avec 6/8 symptômes administratifs n'est classé que "Élevé". ⚠️⚠️

---

## 7. RECOMMANDATIONS D'AMÉLIORATION

### Option A — Seuils adaptatifs par V (⭐ RECOMMANDÉ MVP)

Principe : ajuster les seuils en points bruts pour que chaque V ait la même sensibilité proportionnelle.

| V | Score max | Faible | Modéré | Élevé | Critique |
|---|---|---|---|---|---|
| V1 | 14 pts | 0-3 | 4-6 | 7-9 | 10-14 |
| V2 | 11 pts | 0-2 | 3-4 | 5-7 | 8-11 |
| V3 | 21 pts | 0-4 | 5-9 | 10-13 | 14-21 |
| V4 | 44 pts | 0-9 | 10-18 | 19-27 | 28-44 |
| V5 | 19 pts | 0-4 | 5-8 | 9-12 | 13-19 |

**Logique** : ~20% / ~40% / ~60% appliqués au score max de chaque V. Pas les mêmes points bruts mais la même **proportion de symptômes positifs** pour atteindre chaque seuil.

**Effort** : 1 heure. Changement de configuration, pas d'algorithme.

### Option B — Ajouter C2bis (comptage listes à cocher)

Récupérer 3-5 questions riches actuellement exclues via un critère de comptage :

| Question | V | Règle de scoring proposée |
|---|---|---|
| **E19** — Soucis de santé | V3 | 0 coché = +0, 1-2 = +1, 3+ = +1 |
| **O16** — Maladies du proche | V4 | 0-1 = +0, 2-3 = +1, 4+ = +1 |
| **O42** — Maladies de l'aidant | V3 | 0-1 = +0, 2-3 = +1, 4+ = +1 |

**Effort** : 2 heures. Impact : meilleure couverture V3.

### Option C — Enrichir l'échelle (Phase V2)

Pour les ~30 questions ayant 4 options de réponse, utiliser +0/+1/+2 (3 niveaux au lieu de 2 effectifs) :

```diff
 E8 — Solitude émotionnelle :
   Jamais         = +0
   Parfois        = +1
-  Souvent        = +1
+  Souvent        = +2
-  Tout le temps  = +1
+  Tout le temps  = +2
```

**Impact** : Score max de chaque V augmente, seuils à recalibrer. Plus discriminant.  
**Phase** : V2 post-pilote, quand on aura des données pour vérifier que la discrimination ajoutée est cliniquement pertinente.

---

## 8. PLAN DE VALIDATION OPÉRATIONNEL

### Phase 1 — Validation clinique (maintenant)

Dr. Monka valide le scoring question par question :

1. **Ouvrir** les 5 fichiers SCORING_V1 à V5 côte à côte
2. **Pour chaque question scorante** : la justification Informativité est-elle correcte ? Le +0/+1/+2 est-il correctement attribué ?
3. **Pour chaque question non scorante** : l'exclusion est-elle justifiée, ou cette question devrait-elle scorer ?
4. **Résultat** : liste des corrections à apporter

**Outil** : Générer un Excel de validation avec checkbox "Validé / À corriger / Discussion" — comme pour l'audit des 369 MT.

### Phase 2 — Test sur 3 cas types (immédiat après validation)

Créer 3 personas de test couvrant les extrêmes :
- **Cas léger** — aidant peu impacté (cible : 10-20% sur chaque V)
- **Cas modéré** — aidant en difficulté (cible : 30-50% sur chaque V)
- **Cas sévère** — aidant en détresse (cible : 60-80% sur chaque V)

Vérifier que les scores correspondent à l'intuition clinique de Dr. Monka.

### Phase 3 — Pilote (M+3 à M+6)

Sur les premières données réelles :
- **Cronbach α** par V — objectif > 0.7 (cohérence interne)
- **Item-Total Correlation** — vérifier que chaque item corrèle > 0.3 avec le score V
- **Distribution des scores** — calibrer les seuils si nécessaire

### Phase 4 — Validation scientifique (M+9 à M+18)

- **EFA** pour vérifier la structure V1-V5
- **Test-retest** pour la stabilité temporelle
- **Validité convergente** vs Zarit (V1-V3) et vs SEGA (V4-V5)

---

## 9. COMPARAISON AUX STANDARDS INTERNATIONAUX

| Critère | Zarit ZBI-22 | CBS | SEGA volet A | Monka V1 |
|---|---|---|---|---|
| Items | 22 (identiques) | 22 (identiques) | 13 (identiques) | 93 (hétérogènes) |
| Échelle par item | 0-4 (5 niv.) | 1-4 (4 niv.) | 0-2 (3 niv.) | 0-2 (3 niv. mais 2 effectifs) |
| Score max | 88 | 88 | 26 | Variable (11-44 par V) |
| Normalisation | Non (brut) | Non (brut) | Non (brut) | Oui (/100) |
| Multi-dimensionnel | Non | Oui (5 facteurs) | Non | Oui (5 V) |
| Seuils | 4 niveaux empiriques | Empiriques | 3 niveaux | 4 niveaux (à calibrer) |
| Validation | 45 ans, Cronbach α=0.92 | 20 ans | 15 ans | Aucune (MVP) |
| Actionnable (recos) | Non | Non | Non | **Oui** |
| Double population | Non (aidant seul) | Non | Non (aidé seul) | **Oui** (aidant + proche) |

### Ce que Monka fait mieux

- **Multi-dimensionnel + actionnable** : 5 scores indépendants + recommandations
- **Double population** : évalue aidant ET proche dans un seul questionnaire
- **Adaptable** : scoring par profil via questions conditionnelles

### Ce que Monka fait moins bien (attendu pour un MVP)

- **Moins granulaire** : 2 niveaux effectifs vs 4-5 chez Zarit/CBS
- **Pas de validation empirique** : les seuils sont des estimations
- **Items hétérogènes** : mix de formats (contrairement à Zarit qui est uniforme)

---

## 10. DÉCISIONS ATTENDUES DE DR. MONKA

| # | Décision | Impact | Urgence |
|---|---|---|---|
| **D1** | Corriger les métadonnées V4 (recompter) | Cohérence du document | 🔴 Avant validation |
| **D2** | Seuils uniformes 20/40/60 ou adaptatifs par V ? | Sensibilité du scoring | 🔴 Avant implém. |
| **D3** | Formaliser le tableau scores max par profil aidance | Scoring correct multi-aidance | 🟠 Avant multi-aidance |
| **D4** | Ajouter C2bis (comptage listes à cocher) ? | +3-5 questions, meilleure couverture | 🟠 Quick win |
| **D5** | +2 pour l'isolement total V1 (E2="Personne") ? | Cohérence risque vital | 🟡 Discussion |
| **D6** | Flag JNSP (alerte si ≥3 JNSP) ? | Détection "aidant aveugle" | 🟡 V2 |
| **D7** | Enrichir l'échelle +1 → +2 pour les 4-niveaux ? | Meilleure discrimination | 🟡 V2 post-pilote |

---

> 🔬 **AUDIT_SCORING v1 — Document cadre pour la validation du scoring avec Dr. Monka.**  
> **La méthode C1+C2 est solide pour le MVP. Les améliorations prioritaires sont les seuils adaptatifs (P2) et la formalisation des scores conditionnels (P3).**
