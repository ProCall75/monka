# 🧠 Réflexion : Les CCC Peuvent-Elles Traverser les Vulnérabilités ?

> **Date** : 09/02/2026  
> **Pour** : Dr. Benjamin Rumaud  
> **Par** : Antonin Rumaud (analyse clinique + produit/tech)  
> **Statut** : 📋 Document de réflexion — à discuter ensemble  
> **Contexte** : Nous avons injecté 68 règles d'activation dans Monka. Ce document pose la question : faut-il aller plus loin en créant des combinaisons **entre** vulnérabilités ?

---

## Rappel : Comment fonctionne l'activation aujourd'hui ?

Monka a 3 niveaux pour activer un micro-parcours (MP) :

| Niveau | Comment ça marche | Délai |
|---|---|---|
| 🔴 **Critique** | **1 seule question** avec une réponse alarmante suffit | ≤ 7 jours |
| 🟠 **CCC** (Condition Critique Composite) | **Plusieurs questions combinées** — aucune n'est critique seule, mais ensemble elles révèlent un problème | ≤ 30 jours |
| 🟢 **Standard** | **1 question** avec une réponse préoccupante, mais pas urgente | ≤ 90 jours |

**Aujourd'hui, la majorité des CCC sont « intra-vulnérabilité »** : les questions combinées appartiennent à la même dimension. Mais pas toutes — on a découvert que **3 CCC sur 28 traversent déjà les frontières** (la dimension Administrative utilise des questions de Fragilité du Proche et de Parcours Médical).

**La question qu'on se pose** : y a-t-il un intérêt clinique à combiner des questions de **vulnérabilités différentes** ?

---

## 1. Constat : Le Cross-Vulnérabilité Existe Déjà !

Avant de proposer quoi que ce soit de nouveau, regardons ce qui **existe déjà** dans les données legacy qu'on a injectées :

### Des questions sont déjà utilisées hors de leur vulnérabilité d'origine

On a découvert que **29 utilisations de questions** traversent les frontières entre vulnérabilités :

| Questions venant de… | Utilisées pour activer des MP dans… | Volume |
|---|---|---|
| **Fragilité du proche** | Parcours médical du proche | 18 utilisations |
| **Parcours médical du proche** | Dimension administrative | 9 utilisations |
| **Dimension administrative** | Parcours médical du proche | 5 utilisations |

### Exemple concret — La question pivot

La question ***« Pensez-vous qu'il sera possible de maintenir cette situation de vie sans changement majeur ? »*** est utilisée pour activer des MP dans **deux vulnérabilités différentes** :

- Si la réponse est « Non » ou « Je ne sais pas » → active le MP **« Vie quotidienne, budget et entourage du proche »** (dans *Fragilité du proche*)
- Et le MP **« Couverture santé et protections juridiques »** (dans *Dimension administrative*)
- Et le MP **« Charge et complexité des démarches »** (dans *Dimension administrative*)

> C'est logique : quand un aidant sent que la situation est intenable, les conséquences touchent autant le quotidien du proche que les démarches administratives.

**Conclusion** : le cross-vulnérabilité n'est pas un concept nouveau. C'est un comportement qui existe déjà de façon implicite. La question est : doit-on le **formaliser et l'enrichir** ?

---

## 2. Les Combinaisons Inter-Vulnérabilités Proposées

Voici 6 combinaisons analysées sous l'angle clinique. Pour chacune, on évalue l'intérêt et surtout : **est-ce que ça change quelque chose par rapport aux MP qui s'activent déjà séparément ?**

---

### 🔬 COMBO 1 — Aidant épuisé ET sans réseau de soutien

> Croisement entre **Santé de l'aidant** × **Social & Relationnel**

**Les deux questions :**
- *« À quel point vous sentez-vous épuisé·e par votre rôle d'aidant ? »* → quand la réponse est « Épuisé·e / au bord de craquer »
- *« En cas de coup dur, avez-vous des personnes sur qui compter ? »* → quand la réponse est « Personne »

**Ce que cette combinaison révèle :**

L'épuisement seul est gérable **si l'aidant a un réseau** (famille, amis, voisins). L'isolement seul est tolérable **si l'aidant tient le coup physiquement et moralement**. Mais les deux ensemble créent un **risque imminent de rupture du lien d'aide** : l'aidant est à bout ET il n'a personne vers qui se tourner.

**Micro-parcours concernés :**
- « Charge, fatigue et risque d'épuisement » (dans Santé de l'aidant)
- « Soutien de l'entourage et partage de l'aide » (dans Social & Relationnel)

**Intérêt clinique : ⭐⭐⭐⭐⭐**  
Ni l'un ni l'autre MP seul ne capte la **gravité de la combinaison**. C'est ce qu'on appelle en gériatrie une « cascade de fragilité » : chaque élément aggrave l'autre dans un cercle vicieux.

> 💬 **Question pour Dr. Monka** : Ce combo devrait-il déclencher un signal d'urgence spécifique (ex : alerte IDEC prioritaire), ou l'activation séparée des deux MP suffit-elle ?

---

### 🔬 COMBO 2 — Aidant qui renonce à ses soins PARCE QUE le proche ne peut rester seul

> Croisement entre **Santé de l'aidant** × **Fragilité du proche**

**Les deux questions :**
- *« Sur le plan moral (stress, inquiétude), où vous situez-vous ? »* → quand des signes de renoncement apparaissent
- *« Combien de temps votre proche peut-il rester seul à son domicile ? »* → quand la réponse est « Ne peut pas rester seul »

**Ce que cette combinaison révèle :**

Le renoncement aux soins prend une dimension critique quand il est **contraint, pas choisi**. L'aidant ne va pas chez le médecin non pas par négligence, mais parce qu'il ne peut **littéralement pas** quitter le proche. La recommandation ne devrait pas être « allez chez le médecin » mais plutôt **« organisons un relais pour vous libérer »**.

**Micro-parcours concernés :**
- « Hygiène de vie (activité et sommeil) » ou « Santé physique et renoncement aux soins » (dans Santé de l'aidant)
- « Autonomie, aide humaine et présence nécessaire » (dans Fragilité du proche)

**Intérêt clinique : ⭐⭐⭐⭐**  
Cette combinaison **change la nature de la recommandation**, pas juste sa priorité. C'est ça qui la rend intéressante.

> 💬 **Question** : Est-ce que ce phénomène (renoncement contraint) est fréquent dans votre expérience clinique ? Mérite-t-il un traitement distinct ?

---

### 🔬 COMBO 3 — Parcours médical chaotique ET aucun droit ouvert

> Croisement entre **Parcours médical du proche** × **Dimension administrative**

**Les deux questions :**
- *« Comment décririez-vous l'organisation des soins de votre proche ? »* → quand la réponse est « Souvent très compliquée » ou « Ingérable »
- *« Pour quels droits/aides avez-vous effectué une demande ? »* → quand la réponse est « Aucun » ou « Je ne sais pas »

**Ce que cette combinaison révèle :**

Un parcours médical compliqué est **gérable avec les bons droits** (APA, PCH, MDPH...). Sans ces droits, l'aidant est démuni face à la complexité. Ce combo révèle un aidant qui **subit** la situation sans aucun levier d'action.

**Micro-parcours concernés :**
- « Coordination des soins » (dans Parcours médical du proche)
- « Droits, aides et évaluation dépendance » (dans Dimension administrative)

**Intérêt clinique : ⭐⭐⭐⭐**  
Mais une nuance : ce croisement **existe déjà partiellement** via la question pivot mentionnée plus haut.

> 💬 **Question** : Le fait que l'activation séparée existe déjà rend-il ce combo redondant, ou le formaliser ajouterait-il de la valeur ?

---

### 🔬 COMBO 4 — Proche dangereux ET aidant épuisé

> Croisement entre **Fragilité du proche** × **Santé de l'aidant**

**Les deux questions :**
- *« A-t-elle des comportements potentiellement dangereux (gaz ouvert, errance, actes risqués) ? »* → quand la réponse est « Oui »
- *« À quel point vous sentez-vous épuisé·e par votre rôle d'aidant ? »* → quand la réponse est « Épuisé·e / au bord de craquer »

**Ce que cette combinaison révèle :**

La question sur les comportements dangereux déclenche **déjà une alerte critique** pour le MP « Mémoire, comportement et risques » (dans Fragilité du proche). Mais si l'aidant est **également** épuisé, le risque est **bidirectionnel** : le proche est en danger **ET** l'aidant ne peut plus assurer la sécurité. C'est probablement le combo **le plus critique cliniquement**.

**Micro-parcours concernés :**
- « Mémoire, comportement et risques » (dans Fragilité du proche) — déjà en critique
- « Charge, fatigue et risque d'épuisement » (dans Santé de l'aidant)

**Intérêt clinique : ⭐⭐⭐⭐⭐**  
La dangerosité du proche + l'incapacité de l'aidant à y répondre = situation d'urgence maximale.

> 💬 **Question** : Ce combo devrait-il créer un **signal au-dessus du critique** (urgence absolue nécessitant une intervention immédiate), ou l'activation critique du MP « Mémoire, comportement et risques » suffit-elle ?

---

### 🔬 COMBO 5 — Proche isolé ET personne ne coordonne ses soins

> Croisement entre **Social & Relationnel** × **Parcours médical du proche**

**Les deux questions :**
- *« Quelle est la fréquence de vos visites ? »* → quand la réponse est « 1 fois par mois ou moins »
- *« Avez-vous une personne de référence qui coordonne les soins de votre proche ? »* → quand la réponse est « Non, personne ne coordonne »

**Micro-parcours concernés :**
- « Isolement social de la personne aidée » (dans Social & Relationnel)
- « Coordination des soins » (dans Parcours médical du proche)

**Intérêt clinique : ⭐⭐⭐**  
L'isolement est plus préoccupant quand aucun professionnel ne compense le manque de réseau familial. Mais les deux MP s'activent **déjà séparément** — pas sûr que la combinaison apporte une valeur clinique distincte.

> ❌ **Verdict** : Probablement **pas nécessaire** — les MP séparés couvrent le besoin.

---

### 🔬 COMBO 6 — Charge administrative lourde ET aidant épuisé

> Croisement entre **Dimension administrative** × **Santé de l'aidant**

**Les deux questions :**
- *« Combien de temps consacrez-vous chaque mois aux démarches administratives ? »* → quand c'est plus de 5h
- *« À quel point vous sentez-vous épuisé·e ? »* → quand la réponse est « Très fatigué·e » ou « Épuisé·e »

**Intérêt clinique : ⭐⭐⭐**  
L'administratif est souvent un facteur d'épuisement sous-estimé. Mais la recommandation serait identique : alléger la charge. L'ajout d'une CCC ne changerait **pas l'action proposée**.

> ❌ **Verdict** : **Pas nécessaire** — la reco est la même avec ou sans la CCC.

---

## 3. Synthèse : Quelles Combinaisons Valent le Coup ?

| Combo | Résumé | Change la recommandation ? | Verdict |
|---|---|---|---|
| **1. Épuisé + Personne sur qui compter** | Rupture imminente sans filet | **Oui** — alerte urgente spécifique | ✅ **À implémenter** |
| **2. Renonce à ses soins + proche non autonome** | Sacrifice contraint | **Oui** — reco différente (relais, pas juste "consultez") | ✅ **À implémenter** |
| **3. Soins chaotiques + pas de droits** | Impuissance administrative | Modérément — existe déjà en partie | 🟡 **À discuter** |
| **4. Proche dangereux + aidant épuisé** | Danger bidirectionnel | **Oui** — urgence maximale | ✅ **À implémenter** |
| **5. Isolement + pas de coordination** | Couvert par MP séparés | Non | ❌ Pas nécessaire |
| **6. Admin lourde + épuisement** | Même reco de toute façon | Non | ❌ Pas nécessaire |

**Critère de sélection** : Une CCC inter-vulnérabilité ne vaut le coup **que si elle change la recommandation** ou révèle un risque **que les MP séparés ne captent pas**.

---

## 4. Et les CCC Intra-Vulnérabilité, Manque-t-il Quelque Chose ?

Au sein d'une même vulnérabilité, certaines combinaisons **n'existent pas encore** :

| Vulnérabilité | Combo manquant | Questions | Intérêt |
|---|---|---|---|
| Social & Relationnel | Conflits familiaux + isolement du proche | *« Y a-t-il des tensions ? »* + *« Fréquence des visites ≤ 1/mois »* | 🟡 Les 2 MP s'activent déjà |
| Santé de l'aidant | Culpabilité + épuisement | *« Ressentez-vous de la culpabilité ? »* + *« Êtes-vous épuisé ? »* | ⭐⭐⭐ La culpabilité empêche de demander de l'aide |
| Administrative | Pas de mutuelle + pas d'AGGIR | Déjà couvert ✅ | — |

> **Conclusion** : Les CCC actuelles couvrent bien les combinaisons les plus pertinentes en intra-V. Peu de manques significatifs.

---

## 5. Côté Technique et Produit — Est-ce Gérable ?

### Impact sur la base de données

| Scénario | Nb de règles | Complexité |
|---|---|---|
| **Statu quo** (intra-V seulement) | 68 | Simple |
| **+3 combos recommandés** | 71 | ✅ **Quasiment rien** — 3 lignes ajoutées |
| **Toutes les combinaisons possibles** | ~108 | ⚠️ Gérable mais lourd à maintenir |

> Le moteur ne fait **aucune** différence entre une CCC intra-V et inter-V. C'est juste une ligne dans la table avec des questions de vulnérabilités différentes. Zéro changement de code, zéro changement de structure.

### Le vrai risque : la compréhension

| Risque | Solution |
|---|---|
| L'IDEC se demande « pourquoi ce MP s'est activé avec des questions d'une autre dimension ? » | Afficher clairement les questions source dans le tableau de bord |
| Trop de CCC = confusion | Se limiter à 3-5 CCC inter-V maximum |
| Faux positifs (combo trop sensible) | Phase pilote : observer avant de généraliser |

---

## 6. Les 3 MP Sans Règle d'Activation — Et Comment Les Activer

Sur les 24 micro-parcours, **3 n'ont aucune règle d'activation** dans les données legacy :

> [!IMPORTANT]
> **Le scoring ne peut PAS activer un MP** (règle KERNEL K13 : le score mesure l'intensité d'une vulnérabilité, il ne déclenche jamais un MP). Ces 3 MP sont donc **actuellement en mode prévention uniquement** (⚪) — ils affichent des recommandations générales, mais ne se « déclenchent » jamais en 🔴🟠🟢 pour un aidant donné.

La bonne nouvelle : **on n'a pas besoin de créer de nouvelles questions**. Chacun de ces MP a déjà des questions assignées dans le questionnaire. Il suffit de définir quelles réponses doivent déclencher l'activation.

---

### 🩹 MP « Autonomie fonctionnelle, chutes et aides techniques » (Fragilité du proche)

**Ce MP parle de quoi ?** L'autonomie physique au quotidien : est-ce que le proche peut se lever seul, manger seul, utiliser un téléphone ? Est-ce qu'il a chuté ? Est-ce que des aides techniques sont en place ?

**Les questions déjà assignées à ce MP :**

| Question | Réponses disponibles |
|---|---|
| *« A-t-elle chuté dans les 6 derniers mois ? »* | Non / Oui sans gravité / Oui avec complication ou plusieurs fois |
| *« A-t-elle des difficultés à se lever d'un lit ou d'un fauteuil sans aide ? »* | Non / Parfois / Oui |
| *« A-t-elle des difficultés à utiliser le téléphone ou des appareils simples ? »* | Non / Parfois / Oui |
| *« Est-elle incontinente ? »* | Non / Parfois / Oui |
| *« Peut-elle se nourrir par elle-même ? »* | Oui / Parfois / Non |
| *« Y a-t-il des aides techniques en place ? »* | Aucune / Liste de catégories d'aides |
| *« Songez-vous à adapter son lieu de vie ? »* | Oui / Non |
| *« Quelles pathologies la concernent ? »* | Liste de pathologies |

**Nos recommandations d'activation :**

| Niveau | Règle proposée | Pourquoi |
|---|---|---|
| 🟢 **Standard** | *« A-t-elle chuté ? »* = « Oui sans gravité » | Une chute même bénigne signale un risque → mérite un accompagnement sous 90 jours |
| 🟢 **Standard** | *« A-t-elle des difficultés à se lever ? »* = « Oui » | Perte d'autonomie physique installée |
| 🟠 **CCC** | *« A-t-elle chuté ? »* = « Oui avec complication ou plusieurs fois » **ET** *« Aucune aide technique en place »* | Chutes graves OU répétées **sans** équipement de protection = situation à risque de chute grave |
| 🟠 **CCC** | *« Peut-elle se nourrir ? »* = « Non » **ET** *« Est-elle incontinente ? »* = « Oui » | Cumul de pertes d'autonomie fondamentales = dépendance fonctionnelle lourde nécessitant un bilan |

> 💬 **Question Dr. Monka** : La chute avec complication doit-elle être en 🔴 critique (risque immédiat de récidive grave) ou en 🟠 CCC est-il suffisant ?

---

### 🩹 MP « Plan de soins, évaluations et inquiétudes » (Parcours médical du proche)

**Ce MP parle de quoi ?** Est-ce que le parcours médical a une feuille de route claire ? Est-ce que des évaluations spécialisées ont eu lieu ? Quelles sont les principales inquiétudes de l'aidant concernant l'évolution de la maladie ?

**Les questions déjà assignées à ce MP :**

| Question | Réponses disponibles |
|---|---|
| *« Comment décririez-vous l'organisation des soins ? »* | Plutôt simple / Gérable mais parfois compliquée / Souvent très compliquée / Ingérable |
| *« Qu'est-ce qui vous inquiète le plus pour la santé de votre proche ? »* | Les chutes / La mémoire / L'alimentation / Les urgences / Le maintien à domicile / Autre / Je ne sais pas |
| *« Existe-t-il un "plan de route" clair pour la suite des soins ? »* | Oui c'est clair / Partiellement / Non, on avance au jour le jour |
| *« A-t-il bénéficié d'une évaluation spécialisée liée à l'âge ? »* | Oui consultation mémoire / Oui bilan gériatrique / Oui bilan chutes / Oui autre / Non aucune |
| *« Votre enfant a-t-il été orienté vers une structure TND ? »* | Oui évaluation en cours / Oui mais longue attente / Non personne ne nous en a parlé / Je ne sais pas |
| *« Quels professionnels sont déjà intervenus ? »* | Liste de professionnels / Aucun |

**Nos recommandations d'activation :**

| Niveau | Règle proposée | Pourquoi |
|---|---|---|
| 🟢 **Standard** | *« Plan de route clair ? »* = « Non, on avance au jour le jour » | Pas de vision à long terme sur les soins → accompagnement pour structurer |
| 🟢 **Standard** | *« Évaluation spécialisée liée à l'âge ? »* = « Non, aucune » | Pas de bilan initial alors que la situation le justifie |
| 🟠 **CCC** | *« Plan de route ? »* = « Non, on avance au jour le jour » **ET** *« Organisation des soins ? »* = « Souvent très compliquée » ou « Ingérable » | Aucun cap ET complexité élevée = le proche navigue à vue dans un parcours chaotique |
| 🟢 **Standard** | *« Enfant orienté vers structure TND ? »* = « Non, personne ne nous en a parlé » | Besoin non identifié par les professionnels = risque de retard de prise en charge |

> 💬 **Question Dr. Monka** : Faut-il distinguer les situations « adulte/personne âgée » (évaluation gériatrique) et « enfant » (TND) dans deux règles séparées, ou une seule règle suffit-elle ?

---

### 🩹 MP « Situation scolaire/professionnelle et budget » (Dimension administrative)

**Ce MP parle de quoi ?** La dimension financière et professionnelle/scolaire : est-ce que l'aidant a les moyens de tenir, est-ce que le proche a une activité adaptée, quelles démarches administratives sont en cours ou manquantes ?

**Les questions déjà assignées à ce MP :**

| Question | Réponses disponibles |
|---|---|
| *« Pensez-vous avoir les moyens financiers suffisants ? »* | Oui / Non |
| *« Quelles démarches vous préoccupent le plus ? »* | Dossier dépendance / MDPH / Retraite / Logement / Aides financières / Renouvellement droits / Autre / Aucune |
| *« Votre enfant peut-il fréquenter une école ou structure adaptée ? »* | Oui sans difficulté / Oui avec aménagements / Très difficile / Non |
| *« A-t-il besoin d'un accompagnant spécialisé (AESH, AVS…) ? »* | Non / Oui déjà en place / Oui besoin identifié mais pas en place |
| *« Votre proche a-t-il une activité adaptée à son état ? »* | Oui adaptée / Oui mais difficile à tenir / Non sans problème / Non et cela crée des difficultés |
| *« Avez-vous bénéficié de services d'accompagnement admin ? »* | Liste de services / Aucun |
| *« Avez-vous eu recours à des aides (répit, formations…) ? »* | Liste d'aides / Aucune |

**Nos recommandations d'activation :**

| Niveau | Règle proposée | Pourquoi |
|---|---|---|
| � **Standard** | *« Moyens financiers suffisants ? »* = « Non » | Fragilité financière déclarée → orientation vers les aides |
| 🟢 **Standard** | *« Enfant fréquente une école adaptée ? »* = « Très difficile » ou « Non » | Scolarisation en difficulté = retentissement majeur sur l'enfant et la famille |
| 🟢 **Standard** | *« Besoin AESH/AVS ? »* = « Oui, besoin identifié mais pas en place » | Besoin reconnu mais non satisfait = démarche à lancer |
| 🟠 **CCC** | *« Moyens financiers ? »* = « Non » **ET** *« Accompagnement admin ? »* = « Aucun » | Pas d'argent ET pas d'aide pour savoir quoi demander = isolement administratif total |
| 🟢 **Standard** | *« Activité adaptée ? »* = « Non, et cela crée des difficultés (isolement, repli, perte de repères) » | Absence d'activité avec retentissement psychosocial |

> 💬 **Question Dr. Monka** : Le « Non » aux moyens financiers devrait-il être en 🔴 critique si combiné avec un refus de tous droits (question E62 de la dimension administrative) ? Ou est-ce redondant avec les règles de A2 qui couvrent déjà l'absence de droits ?

---

## 7. Récapitulatif des Règles d'Activation Actuelles

### Vue d'ensemble par vulnérabilité

| Vulnérabilité | 🔴 Critiques | 🟠 CCC | 🟢 Standard | Total règles | MP couverts |
|---|---|---|---|---|---|
| **Social & Relationnel** | 2 | 8 | 4 | 14 | 4 sur 4 ✅ |
| **Fragilité du proche** | 5 | 5 | 5 | 15 | 5 sur 6 |
| **Santé de l'aidant** | 2 | 4 | 5 | 11 | 4 sur 4 ✅ |
| **Parcours médical** | 0 | 8 | 9 | 17 | 5 sur 6 |
| **Administrative** | 3 | 3 | 5 | 11 | 3 sur 4 |
| **Total** | **12** | **28** | **28** | **68** | **21 / 24** |

> Si les recommandations de la section 6 sont validées, ce tableau passerait à environ **80 règles** et **24 sur 24 MP couverts** ✅.

---

## 8. Vérification de Cohérence avec le KERNEL

Avant envoi, nous avons vérifié chaque affirmation de ce document contre les 13 règles fondamentales du KERNEL (K1→K13). Voici le résultat :

| Règle KERNEL | Affirmation dans ce document | Conforme ? |
|---|---|---|
| **K1** — Les recos visent l'objectif du MP, pas les questions individuelles | Les combos proposés activent des **MP entiers**, pas des questions | ✅ |
| **K2** — 3 niveaux d'activation (Critique ≤7j, CCC ≤30j, Standard ≤90j) | Les 3 niveaux sont correctement présentés dans le rappel et les recommandations | ✅ |
| **K3** — Le niveau le plus haut englobe les niveaux inférieurs | Non contredit — les combos inter-V ne créent pas de 4ème niveau, ils utilisent les existants | ✅ |
| **K4** — Prévention (⚪) même si MP non activé | Correctement appliqué aux 3 MP sans règle (F6, M6, A4 en prévention permanente) | ✅ |
| **K5** — Reco = enveloppe de micro-tâches | Non abordé dans ce doc (normal, c'est un doc sur l'activation, pas sur les recos) | ✅ N/A |
| **K6** — Visibilité totale utilisateur + IDEC | Le risque de confusion IDEC est identifié dans la section technique | ✅ |
| **K7** — Autonomie de l'utilisateur par défaut | Non contredit | ✅ |
| **K8** — Délégation au niveau reco | Non contredit | ✅ |
| **K9** — 1 MP = 1 ASR | Les combos inter-V activent des MP existants, chacun garde sa propre ASR | ✅ |
| **K10** — 2 catégories de MT (contributives / non-contributives) | Non contredit | ✅ |
| **K11** — 100% des contributives = ASR validée | Non contredit | ✅ |
| **K12** — Pas tous les types contributifs obligatoires | Non contredit | ✅ |
| **K13** — Le scoring ne déclenche JAMAIS un MP | ✅ **Corrigé dans cette version** — aucune mention de scoring comme mécanisme d'activation | ✅ |

> **Résultat : 13/13 conforme** — Ce document est cohérent avec le KERNEL.

---

## 9. Questions Ouvertes Pour Dr. Monka

1. **Les 3 combinaisons inter-vulnérabilités proposées (Combos 1, 2 et 4) vous semblent-elles cliniquement valides ?**

2. **Quand une CCC inter-vulnérabilité se déclenche, quel micro-parcours devrait-elle activer ?** Le plus urgent des deux ? Les deux ? Un nouveau signal spécial ?

3. **Connaissez-vous d'autres combinaisons**, issues de votre expérience clinique, qui ne sont pas couvertes par cette analyse ?

4. **Les recommandations d'activation pour les 3 MP manquants** (section 6) vous semblent-elles pertinentes ? Y a-t-il des ajustements à faire sur les niveaux (🟢 vs 🟠 vs 🔴) ?

5. **Acceptez-vous une phase pilote** : ajouter les CCC inter-V et les nouvelles règles d'activation comme « proposées » et les valider sur les premiers cas réels ?

---

*Document de réflexion du 09/02/2026 — À discuter en équipe avant toute implémentation*
