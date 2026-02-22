# 🔍 Complétude MP — S4 — Hygiène de vie (activité et sommeil)

> **Vulnérabilité** : V3 — Santé de l'Aidant  
> **Template officiel** : [S4.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V3/S4.md)  
> **Score checklist actuel** : 6/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

S4 est le MP le plus léger et le plus problématique de V3 — et potentiellement de tout le moteur. Ses déficits sont **structurels** :

| # | Manquement | Check concerné | Sévérité | Impact |
|---|---|---|---|---|
| 1 | **2 questions sans règle** (E17, E19) | Check #1 | 🟠 Haute | L'activité physique (E17=Non) ne déclenche rien |
| 2 | **K3 non respecté** — 1 seul niveau (CCC) | Check #4 | 🟠 Haute | Pas de Standard |
| 3 | **0 MT contributive** → ASR non-validable | Check #3 (indirect) | 🔴 Critique | Impossible de valider l'ASR « Préserver votre qualité de vie » |
| 4 | **MT legacy possiblement mal-mappées** | Architecture | 🟡 Moyenne | MT_V3_007/009/013 semblent appartenir à S1/S2 sémantiquement |
| 5 | **Doublon reco** S4_RECO_01 ≈ S3_RECO_04 | Clarté | 🟡 Moyenne | Confusion pour l'aidant et l'IDEC |

---

## Problème structurel — Faut-il garder S4 comme MP autonome ?

### Le constat

S4 cumule les signaux d'un MP sous-développé :
- **1 seule catégorie**, 1 seule reco (quasi-identique à S3_RECO_04)
- **1 seule règle**, aucun Standard
- **0 MT contributive** (les 3 MT legacy sont ORGA/non-contributives et semblent mal-mappées)
- **Aucune question scorante** — S4 ne contribue pas au score V3
- **E17** (activité physique) n'a pas de reco → le seul indicateur d'hygiène de vie proactive est ignoré

### Deux approches possibles

#### Approche A — Enrichir S4 (recommandée)

Compléter S4 pour en faire un vrai MP autonome. Créer une CAT_02 « Activité physique », ajouter des MT contributives, différencier le wording de S3. S4 deviendrait le MP de la **prévention santé de l'aidant** — un axe clinique distinct et pertinent.

**Avantage** : Conserve la granularité thématique V3, axe prévention fort.  
**Effort** : Moyen — 1 nouvelle catégorie, 2-3 règles, 3-4 MT.

#### Approche B — Fusionner S4 dans S3

Absorber les 4 questions et la règle CCC dans S3.

**Avantage** : Élimine le MP vide.  
**Inconvénient** : S3 passerait de 9 à 13 questions (très dense), perte de la distinction suivi/comportement.

> **Ma recommandation** : **Approche A**. S4 couvre un axe clinique réel (hygiène de vie, renoncement proactif aux soins) qui est distinct de S3 (suivi médical existant). L'effort d'enrichissement est limité et le résultat sera cliniquement plus riche.

---

## Manquement 1 — E17 et E19 sans règle

### Le problème

| Question | Libellé | Réponses | Pourquoi c'est un problème |
|---|---|---|---|
| **E17** | Activité physique régulière ? | Oui / **Non** | L'aidant ne pratique aucune activité physique → aucune reco. L'inactivité physique est un facteur de risque cardiovasculaire, de dépression et d'épuisement majeur. Pour un MP dédié à l'hygiène de vie, ignorer E17 est contradictoire. |
| **E19** | Soucis de santé actuels | Choix multiples | E19 sert de contexte pour cibler le bilan. Pas de seuil d'activation évident car c'est du choix multiple libre. |

### Ce que je propose

#### Proposition 1.1 — Règle Standard pour E17

```
SI E17 = « Non » (pas d'activité physique régulière)
ALORS → V3_S4_STD_01 (Standard) → CAT_02 (nouvelle — activité physique)
```

**Raisonnement** : L'inactivité physique chez les aidants est un facteur aggravant documenté — elle contribue à l'épuisement physique (S1), augmente le risque de pathologies cardiovasculaires (S3), et réduit la capacité de récupération mentale. Le Standard est proportionné : pas d'urgence, mais une incitation à reprendre une activité adaptée.

**Dépendance** : Cette règle nécessite la création de CAT_02 et de ses MT (voir Manquement 3).

> 💡 **E19 ne nécessite pas de règle individuelle** : Les soucis de santé déclarés (fatigue, douleurs, moral…) servent à cibler le bilan médical mais ne justifient pas une activation indépendante — ils sont trop hétérogènes pour un seuil simple. La reco S4_RECO_01 (bilan avec le MT) couvre déjà ce besoin quand le CCC est activé.

---

## Manquement 2 — K3 non respecté

### Le problème

CAT_01 n'a qu'un seul niveau (CCC). L'aidant qui a « un peu de mal » à prendre ses RDV (E15 = Un peu) mais ne les reporte pas systématiquement (E16 ≠ « reporte souvent ») ne déclenche rien. C'est un signal précoce de renoncement qui mérite un Standard.

### Ce que je propose

#### Proposition 2.1 — Règle Standard pour E16 intermédiaire

```
SI E16 = « J'ai du mal à les prendre ou à les garder »
ALORS → V3_S4_STD_02 (Standard) → CAT_01 (reprise suivi médical)
```

**Raisonnement** : « J'ai du mal à prendre ou garder mes RDV » est un signal de difficulté qui n'atteint pas le seuil du CCC (« Je les reporte ou annule souvent ») mais indique un début de renoncement. Le Standard incite à accompagner l'aidant avant que la situation ne se dégrade. La différence clinique : CCC = renoncement actif confirmé (≤ 30j), STD = difficulté émergente (≤ 90j).

**Avantage K3** : CAT_01 passe de 1 niveau (CCC) à 2 niveaux (STD + CCC) → K3 respecté.

---

## Manquement 3 — Absence de MT contributive + CAT_02 manquante

### Le problème

S4 a 0 MT contributive → l'ASR ne peut pas être validée (K11 : 100% des MT contributives requises). De plus, les 3 MT legacy (MT_V3_007, 009, 013) sont des actions de coordination IDEC (évaluation risque, SAD, transmission) qui semblent davantage relever de S1/S2 que de S4. Elles ne correspondent pas au thème « hygiène de vie et accès aux soins personnels ».

### Ce que je propose

#### Proposition 3.1 — MT contributive MED pour CAT_01

```
MT_V3_NEW_05 — « Contacter le médecin traitant pour organiser la reprise du suivi médical de l'aidant »
Type : MED | Acteur : IDEC | Domaine : médical | 📍 Contributive
```

**Raisonnement** : L'action pivot de CAT_01 est la reprise du suivi médical. L'IDEC contacte le MT de l'aidant pour organiser un bilan. C'est la MT contributive qui manque pour rendre l'ASR validable.

> ⚠️ **Risque de doublon avec S3** : MT_V3_020 (S3) = « Contacter le MT pour bilan de santé ». La différence : S3 = bilan motivé par une DÉGRADATION détectée (O44+E18), S4 = reprise du suivi motivée par un RENONCEMENT comportemental (E15+E16). But différent, même action concrète. Le wording devrait le refléter.

#### Proposition 3.2 — Créer CAT_02 « Activité physique et bien-être »

```
Catégorie : S4_CAT_02 — Activité physique et bien-être
Déclencheur : V3_S4_STD_01 (E17 = Non)
```

**Raisonnement** : E17 est la seule question du moteur Monka qui mesure l'activité physique. C'est un axe de prévention fort et reconnu en gériatrie. Créer une catégorie dédiée permet de :
1. Activer E17 (résolvant le Check #1)
2. Proposer des MT concrètes d'incitation à l'activité
3. Renforcer le rôle de S4 comme MP de PRÉVENTION ACTIVE

#### Proposition 3.3 — MT pour CAT_02 (activité physique)

```
MT_V3_NEW_06 — « Informer l'aidant sur les bienfaits de l'activité physique adaptée et les dispositifs locaux (sport sur ordonnance, APA) »
Type : INFO | Acteur : IDEC | Domaine : médico-social | 💡 Non-contributive
```

```
MT_V3_NEW_07 — « Orienter l'aidant vers un programme d'activité physique adaptée (APA) ou une association sportive locale »
Type : SEC | Acteur : IDEC | Domaine : médico-social | 📍 Contributive
```

**Raisonnement** : Le duo INFO + SEC est le pattern standard V1/V2 : d'abord informer, puis orienter concrètement. L'activité physique adaptée (APA) est un dispositif qui existe réellement — prescrit sur ordonnance, remboursable sous conditions. L'IDEC identifie les ressources locales et met en lien l'aidant.

#### Proposition 3.4 — Vérifier le mapping des MT legacy

Les 3 MT legacy de S4 sont :
- **MT_V3_007** : « Évaluer le risque immédiat ou latent » → semble être une MT S1/S2 (évaluation du risque de la situation = charge/sécurité)
- **MT_V3_013** : « Contacter les SAD du territoire » → c'est une MT S1 clairement (relais aide à domicile)
- **MT_V3_009** : « Transmettre à l'aidant pour choix et prise de contact » → suite de MT_V3_013

> **Ma recommandation** : Demander à Dr. Monka de confirmer si ces 3 MT sont bien des MT S4 ou si elles ont été mal-mappées depuis S1/S2. Si elles sont bien S4, clarifier leur rôle dans le contexte « hygiène de vie ».

---

## Manquement 4 — Doublon de wording

### Le problème

S4_RECO_01 (« Prendre RDV avec le médecin traitant pour bilan de santé ») est quasi-identique à S3_RECO_04 (« Demandez un bilan de santé »).

### Ce que je propose

#### Proposition 4.1 — Différencier le wording

```
S4_RECO_01 (révisé) :
  Texte utilisateur : « Reprenez contact avec votre médecin pour discuter de vos besoins de santé et de votre suivi médical personnel »
  Actions IDEC : « Accompagner la reprise du suivi médical de l'aidant — cibler les soucis déclarés (E19) »
```

**Raisonnement** : Le wording doit refléter la différence S3/S4 :
- S3 = « Faites un bilan car votre santé se dégrade » (réactif, motivé par O44+E18)
- S4 = « Reprenez contact car vous avez décroché de votre suivi » (proactif, motivé par E15+E16)

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | E17 = Non → CAT_02 (activité physique) | #1 | 🟠 Haute |
| 2.1 | Règle STD | E16 = « J'ai du mal » → CAT_01 | #4 | 🟠 Haute |
| 3.1 | MT MED 📍 | Contacter MT pour reprise suivi | ASR | 🔴 Critique |
| 3.2 | Catégorie | Créer S4_CAT_02 (activité physique) | #1 | 🟠 Haute |
| 3.3 | MT INFO+SEC | Informer APA + Orienter vers programme sport | CAT_02 | 🟡 Moyenne |
| 3.4 | Vérification | Confirmer mapping MT_V3_007/009/013 | Architecture | 🟡 Moyenne |
| 4.1 | Wording | Différencier S4_RECO_01 vs S3_RECO_04 | Clarté | 🟡 Moyenne |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ⚠️ 2/4 | ✅ 3/4 (E19 reste contextuelle — justifié) |
| #3 — CAT → MT | ✅ (3 MT) → ⚠️ (0 contributive) | ✅ CAT_01: 1 contrib. + CAT_02: 1 contrib. |
| #4 — K3 ≥2 niveaux | ⚠️ 1 niveau | ✅ CAT_01: STD+CCC |
| ASR | ❌ Non validable | ✅ Validable (≥1 MT contributive) |
| **Score global** | **6/8** | **8/8** |

---

## Question structurelle pour Dr. Monka

> **Faut-il maintenir S4 comme MP autonome ou le fusionner dans S3 ?**
>
> Ma recommandation : **maintenir** et enrichir. L'axe « prévention active » (accès aux soins personnels + activité physique) est cliniquement distinct de S3 (suivi médical existant). L'enrichissement proposé (1 CAT_02, 2 règles, 3 MT) est raisonnable et donnerait à S4 une identité forte.

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel S4.md.**
