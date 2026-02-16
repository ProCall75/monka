# 🔍 Complétude MP — S1 — Charge, fatigue et risque d'épuisement

> **Vulnérabilité** : V3 — Santé de l'Aidant  
> **Template officiel** : [S1.md](file:///Users/antonin/monka/KERNEL/VALIDATION_MP/V3/S1.md)  
> **Score checklist actuel** : 5/8  
> **Score checklist cible** : 8/8  
> **Statut** : 🟠 En attente validation Dr. Monka

---

## Résumé du diagnostic

S1 est le plus gros MP de V3 (9 questions) mais possède le **ratio MT le plus faible du moteur** (0.44 MT/question). En comparaison, les MPs V1/V2 officialisés vont de 1.0 à 3.5 MT/question. Trois manquements structurels empêchent le 8/8 :

| # | Manquement | Check concerné | Impact |
|---|---|---|---|
| 1 | **4 questions sans règle d'activation** (E10, O29, O33, O50) | Check #1 | Questions qui ne déclenchent rien = signaux cliniques ignorés |
| 2 | **CAT_02 a 0 MT** (relais SAD) | Check #3 | Catégorie entière sans micro-tâche formelle |
| 3 | **CAT_03 a 1 seul niveau** (Standard uniquement) | Check #4 | Pas d'escalade possible pour l'orientation AS |

---

## Manquement 1 — Questions sans règle d'activation

### Le problème

Sur les 9 questions de S1, **4 n'activent aucune règle** :

| Question | Libellé | Options | Pourquoi c'est un problème |
|---|---|---|---|
| **E10** | Moral (stress, inquiétude) | Ça va / Parfois tendu·e / Souvent tendu·e / **Débordé·e** | Un aidant qui répond « débordé·e ou au bord de craquer » ne déclenche rien. En V1/V2, un signal de détresse de cette intensité déclenche au minimum un Standard. |
| **O29** | Retentissement sur votre santé | Pas du tout / Un peu / **Oui** | L'aidant dit que l'aidance retentit sur sa santé → 0 action. En V1, chaque « Oui » à une question d'impact déclenche au moins une orientation. |
| **O33** | Ressentez-vous une charge ? | Pas du tout / Un peu / **Oui** | L'aidant exprime qu'il ressent une charge → aucune reco. C'est le signal le plus direct du thème S1 et il ne déclenche rien. |
| **O50** | Temps consacré au proche | Pas le temps / 1-5h / 6-10h / **+10h** | Un aidant qui consacre +10h/semaine au proche est à risque de surcharge. Ce facteur quantitatif devrait au minimum activer un Standard. |

### Ce que je propose

> 💡 Les propositions ci-dessous sont des **suggestions cliniques à valider par Dr. Monka**. Chaque proposition inclut le raisonnement et le niveau de criticité proposé.

#### Proposition 1.1 — Règle Standard pour E10

```
SI E10 = « Je me sens débordé·e ou au bord de craquer »
ALORS → V3_S1_STD_05 (Standard) → CAT_01 (soutien face à l'épuisement)
```

**Raisonnement** : E10 mesure le moral sur 4 niveaux. Le niveau 4 (« débordé·e / au bord de craquer ») est un signal de détresse psychologique évident. Ne pas activer une reco à ce stade serait une lacune clinique — un aidant qui se décrit comme « au bord de craquer » psychologiquement doit au minimum être contacté pour évaluer sa situation.

**Alternative** : On pourrait aussi activer dès le niveau 3 (« souvent tendu·e ») en Standard, et réserver le niveau 4 pour un CCC. À discuter avec Dr. Monka.

#### Proposition 1.2 — Règle Standard pour O29

```
SI O29 = « Oui » (retentissement sur la santé)
ALORS → V3_S1_STD_06 (Standard) → CAT_01 (soutien face à l'épuisement)
```

**Raisonnement** : O29 est un auto-diagnostic global d'impact sur la santé. Quand l'aidant dit « oui, ça retentit sur ma santé », il faut au minimum proposer un échange pour évaluer l'ampleur du retentissement et orienter vers le médecin traitant si nécessaire. C'est aussi un pont clinique vers S3 (santé physique) — un retentissement perçu peut justifier un bilan objectif.

#### Proposition 1.3 — Règle Standard pour O33

```
SI O33 = « Oui » (charge ressentie)
ALORS → V3_S1_STD_07 (Standard) → CAT_01 + CAT_03
```

**Raisonnement** : O33 est littéralement la question qui mesure la CHARGE — le thème central de S1. Un « Oui » sur 3 niveaux (pas du tout / un peu / oui) signifie que l'aidant reconnaît une charge significative. Cette question devrait activer :
- CAT_01 (évaluer la charge et proposer un soutien)
- CAT_03 (orienter vers l'AS pour ajuster les aides — la charge peut être réduite par des aides supplémentaires)

#### Proposition 1.4 — Règle Standard pour O50

```
SI O50 = « Plus de 10h par semaine »
ALORS → V3_S1_STD_08 (Standard) → CAT_02 (relais SAD)
```

**Raisonnement** : +10h/semaine d'aide est un volume élevé qui corrèle avec le risque d'épuisement. Ce facteur quantitatif devrait déclencher au minimum une information sur les possibilités de relais (SAD). Le seuil de 10h est un marqueur reconnu dans la littérature sur les aidants.

**Alternative** : On pourrait ajouter le seuil intermédiaire 6-10h pour une activation plus douce (INFO plutôt que SAD). À discuter.

---

## Manquement 2 — CAT_02 sans MT

### Le problème

La catégorie **CAT_02 (Mise en place de relais — aide à domicile)** a une reco (S1_RECO_02) mais **aucune micro-tâche formelle**. La MT SAD (MT_V3_005 = « Confirmer les heures pour le SAD ») est rattachée à **S2**, pas à S1.

En comparaison, en V1/V2, chaque catégorie a au minimum 2-3 MT. Une catégorie sans MT signifie que l'IDEC n'a aucune action traçable pour mettre en œuvre la reco → le suivi est impossible.

### Ce que je propose

#### Proposition 2.1 — MT ORGA pour CAT_02

```
MT_V3_NEW_01 — « Rechercher les services d'aide à domicile du territoire du proche »
Type : ORGA | Acteur : IDEC | Domaine : médico-social | 💡 Non-contributive
```

**Raisonnement** : Avant de confirmer les heures (MT_V3_005 dans S2), l'IDEC doit identifier les SAD disponibles sur le territoire. C'est l'action préalable nécessaire : recherche sur Google, contact, vérification des disponibilités. Cette MT existe de facto dans la reco legacy (le texte dit « IDEC contacte les SAD du territoire ») mais n'est pas formalisée comme MT.

#### Proposition 2.2 — MT SEC pour CAT_02

```
MT_V3_NEW_02 — « Organiser la première intervention d'aide à domicile avec l'aidant »
Type : SEC | Acteur : IDEC | Domaine : médico-social | 📍 Contributive
```

**Raisonnement** : La mise en place effective du relais est l'action de sécurisation centrale de CAT_02. L'IDEC coordonne la première intervention : confirme les horaires avec l'aidant et le SAD, organise la mise en place, vérifie que l'intervention démarre. C'est l'équivalent de MT_V3_005 (S2) mais dans le contexte S1 (soulagement de la charge, pas sécurisation du proche).

#### Proposition 2.3 — MT SEC pour S1_RECO_04 (répit)

```
MT_V3_NEW_03 — « Mettre en lien l'aidant avec la plateforme de répit locale »
Type : SEC | Acteur : IDEC | Domaine : médico-social | 📍 Contributive
```

**Raisonnement** : S1_RECO_04 (« Contactez la plateforme de répit ») est une reco legacy sans MT formelle. La plateforme de répit est un dispositif essentiel pour les aidants épuisés — un moment de pause qui permet de récupérer. L'IDEC identifie la plateforme du territoire et met en lien l'aidant. Cette MT pourrait être rattachée à CAT_01 plutôt que CAT_02 (le répit est un soutien face à l'épuisement, pas un relais quotidien).

---

## Manquement 3 — CAT_03 mono-niveau

### Le problème

La catégorie **CAT_03 (Accès aux aides et ajustement)** n'a qu'un seul niveau d'activation : Standard (V3_S1_STD_02, via N8 ≠ Non). En V1/V2, les catégories ont au minimum 2 niveaux (Standard + CCC ou CCC + Critique) pour permettre l'escalade.

### Ce que je propose

#### Proposition 3.1 — Règle CCC pour CAT_03

```
SI O33 = « Oui » ET O32 = « Oui »
ALORS → V3_S1_CCC_02 (CCC) → CAT_03
```

**Raisonnement** : Quand l'aidant ressent une charge (O33 = Oui) ET demande explicitement à être davantage aidé (O32 = Oui), c'est un signal de surcharge combiné à un appel à l'aide. Ce double signal justifie une escalade vers CCC : l'orientation vers l'AS devient urgente (≤ 30 jours) car l'aidant est en situation de besoin immédiat et exprime une demande d'aide.

**Alternative** : Utiliser N8 ≥ « entre 5 jours et 1 mois » comme CCC pour CAT_03 (arrêt prolongé → besoin urgent d'ajustement des aides). À discuter.

---

## Récapitulatif des propositions

| # | Type | Proposition | Check résolu | Priorité |
|---|---|---|---|---|
| 1.1 | Règle STD | E10 = « Débordé·e » → CAT_01 | #1 | 🟠 Haute |
| 1.2 | Règle STD | O29 = « Oui » → CAT_01 | #1 | 🟠 Haute |
| 1.3 | Règle STD | O33 = « Oui » → CAT_01 + CAT_03 | #1 | 🟠 Haute |
| 1.4 | Règle STD | O50 > 10h → CAT_02 | #1 | 🟡 Moyenne |
| 2.1 | MT ORGA | Rechercher les SAD du territoire | #3 | 🟠 Haute |
| 2.2 | MT SEC | Organiser la première intervention SAD | #3 | 🟠 Haute |
| 2.3 | MT SEC | Mettre en lien avec plateforme de répit | #3 | 🟡 Moyenne |
| 3.1 | Règle CCC | O33 + O32 = Oui → CCC CAT_03 | #4 | 🟡 Moyenne |

### Impact sur le score

| Check | Avant | Après (si validé) |
|---|---|---|
| #1 — Questions → règles | ⚠️ 5/9 questions activent | ✅ 9/9 questions activent |
| #3 — CAT → MT | ⚠️ CAT_02 = 0 MT | ✅ CAT_02 = 2-3 MT |
| #4 — K3 ≥2 niveaux | ⚠️ CAT_03 mono-niveau | ✅ CAT_03 = STD + CCC |
| **Score global** | **5/8** | **8/8** |

---

> **⏳ Ce document est en attente de validation par Dr. Monka. Une fois validé, les propositions seront intégrées dans le template officiel S1.md.**
