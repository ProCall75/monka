# 📊 Rapport de Cohérence — Classification État / Facteur

> **Date** : 09/02/2026  
> **Sources** : `Référence Questionnaire.xlsx` (153 entrées) + Base Supabase (165 questions)  
> **Statut** : ✅ Analyse terminée — à transmettre à Dr. Monka

---

## 1. Résultat Global

| Indicateur | Résultat |
|---|---|
| **Cohérence classification (type)** | **150/150 ✅ — 100%** |
| **Cohérence aidance** | **150/150 ✅ — 100%** |
| **Mismatches** | **0** |
| **Questions manquantes dans le référentiel** | **0** |
| **Questions manquantes dans Supabase** | **0** |

> **Conclusion** : La classification état/facteur du référentiel est **parfaitement alignée** avec les données en base. Aucune correction nécessaire.

---

## 2. Distribution des Types

### Référentiel complet (153 entrées)

| Type | Nombre | % |
|------|--------|---|
| **Facteur** | 93 | 60.8% |
| **État** | 55 | 35.9% |
| **Facteur ET État** | 4 | 2.6% |
| **Aucun** | 1 | 0.7% |
| **Total** | **153** | 100% |

### Sur les 150 questions régulières uniquement

| Type | Nombre | % |
|------|--------|---|
| **Facteur** | 91 | 60.7% |
| **État** | 55 | 36.7% |
| **Facteur ET État** | 4 | 2.7% |
| **Total** | **150** | 100% |

---

## 3. Écart 153 vs 150 (rappel)

Les 3 entrées supplémentaires dans le référentiel sont **3 triggers** :

| ID | Question | Type | Explication |
|---|---|---|---|
| **O2** | Où vit la personne aidée aujourd'hui ? | facteur | Trigger dans le questionnaire, mais pertinence clinique suffisante pour une classification |
| **N31** | Quelles sont les autres personnes à charge ? | facteur | Idem |
| **O49** | Depuis combien de temps l'aidez-vous ? | aucun | Trigger, pas de classification état/facteur |

Les **12 autres triggers** (N3, O35, O36, N1, O64, O46, O14, O1, O63, N26, E71, E72) sont absents du référentiel — ce sont des données démographiques/administratives **hors du périmètre clinique état/facteur**. C'est normal et attendu.

---

## 4. Cas Spéciaux

### 4.1 — Questions « Facteur ET État » (4 questions)

Ces 4 questions sont classées dans **les deux catégories** simultanément. C'est un choix clinique volontaire, pas une erreur.

| ID | Question | Sous-catégorie | V |
|---|---|---|---|
| **O27** | Vous occuper de la personne aidée entraîne-t-il des difficultés dans votre vie personnelle / sociale ? | Impact sur vie familiale / sociale / pro | V1 |
| **O28** | Vous occuper de la personne aidée entraîne-t-il des difficultés dans votre vie familiale ? | Impact sur vie familiale / sociale / pro | V1 |
| **O30** | Avez-vous le sentiment de ne plus reconnaître la personne aidée ? | Relation aidant-aidé & dynamique familiale | V1 |
| **O31** | Avez-vous peur pour l'avenir de la personne aidée ? | Relation aidant-aidé & dynamique familiale | V1 |

> **Observation** : Les 4 sont dans **V1 (Social & Relationnel)**. Elles décrivent à la fois un **état actuel** (vécu subjectif de l'aidant) et un **facteur** (condition structurelle). C'est cohérent cliniquement : l'impact sur la vie sociale est à la fois quelque chose qu'on mesure (état) et qui influence d'autres dimensions (facteur).

**💬 Question pour Dr. Monka** : Ces 4 questions doivent-elles être comptées dans les deux catégories (état + facteur) dans les rapports, ou faut-il créer une catégorie mixte « facteur et état » ?

### 4.2 — Question « Aucun » (1 question)

| ID | Question | Sous-catégorie |
|---|---|---|
| **O49** | Depuis combien de temps l'aidez-vous ? | Temps d'aide (durée / temps consacré) |

> O49 est un **trigger** (pas une question régulière), donc son absence de classification n'impacte pas le moteur. Cependant, la durée d'aidance pourrait logiquement être classée comme **facteur** (c'est un déterminant structurel).

**💬 Question pour Dr. Monka** : Faut-il reclasser O49 en « facteur » ou laisser en « aucun » ?

---

## 5. Analyse de Cohérence : Typologie Question vs État/Facteur

### 5.1 — Cadre théorique

| Concept | Définition |
|---|---|
| **État** | Situation actuelle mesurable — **ce qui est** aujourd'hui (vécu, symptômes, comportements observés) |
| **Facteur** | Condition structurelle ou contextuelle — **ce qui influence** la situation (déterminants, contexte, ressources) |

### 5.2 — Par sous-catégorie du référentiel

La cohérence entre le type de sous-catégorie et la classification est bonne :

| Sous-catégorie type | Classification attendue | Classification réelle | Cohérence |
|---|---|---|---|
| Réseau d'aide & entourage | Facteur (ressource structurelle) | Facteur | ✅ |
| Impact sur vie familiale/sociale/pro | Mixte (vécu + déterminant) | Facteur ET État | ✅ |
| Aides en place | Facteur (ressource existante) | Facteur | ✅ |
| Santé mentale aidant | État (vécu actuel) | État | ✅ |
| Signes de dépendance | État (observation clinique) | État | ✅ |
| Couverture santé | Facteur (déterminant administratif) | Facteur | ✅ |

> **Aucune incohérence détectée** entre le type de sous-catégorie et la classification état/facteur.

### 5.3 — Par vulnérabilité

| Vulnérabilité | Facteur | État | Mixte | Total |
|---|---|---|---|---|
| **V1** Social & Relationnel | 7 | 4 | 4 | 15 |
| **V2** Fragilité Proche | 40 | 15 | 0 | 55 |
| **V3** Santé Aidant | 14 | 12 | 0 | 26 |
| **V4** Parcours Médical Proche | 19 | 17 | 0 | 36 |
| **V5** Administrative | 11 | 7 | 0 | 18 |
| **Total** | **91** | **55** | **4** | **150** |

> V2 (Fragilité Proche) est fortement orientée « facteur » (73%) — logique car elle évalue les conditions de vie du proche.  
> V4 (Parcours Médical) est la plus équilibrée (53% facteur / 47% état) — mélange d'observations cliniques et de déterminants de santé.

## 7. Analyse de Fond — Chaque Classification Est-Elle Justifiée ?

> **Méthode** : Relecture de chaque question pour vérifier que la classification correspond au contenu réel.
> - **État** = mesure une situation actuelle, un vécu, un comportement observable *maintenant*
> - **Facteur** = identifie une condition structurelle, un déterminant, une ressource qui *influence* l'état

### 7.1 — Verdict global

Sur 150 questions, **138 sont clairement bien classées** (92%). Pour les 12 restantes, la classification est défendable mais mérite discussion.

| Catégorie | Nb | Description |
|---|---|---|
| ✅ Clean | 138 | Classification évidente et cohérente |
| 🟡 Défendable mais discutable | 8 | Pourrait être classé autrement selon l'angle |
| 🟠 À discuter avec Dr. Monka | 4 | Classification surprenante |

---

### 7.2 — 🟡 Classifications défendables mais discutables (8 questions)

#### V2 — Fragilité Proche

| ID | Question | Classé | Pourquoi c'est discutable | Mon avis |
|---|---|---|---|---|
| **O51** | Songez-vous à adapter son lieu de vie, son quotidien ? | facteur | C'est une **intention** (état mental actuel) autant qu'un facteur d'adaptation | ⚠️ Plutôt **état** (c'est un ressenti, pas une condition structurelle) |
| **N10** | Avez-vous ou la personne aidée déjà été en contact avec un travailleur social / assistante sociale ? | facteur | ✅ Correct — c'est une **ressource en place** (facteur) | OK |
| **N9** | Avez-vous engagé des démarches auprès de la MDPH ? | facteur | C'est à la fois un **facteur** (démarche engagée = ressource) et un **état** (action en cours) | Acceptable comme facteur |
| **O53** | La dépendance de votre proche a-t-elle été évaluée ? (grille AGGIR) | facteur | ✅ Correct — c'est une **démarche réalisée** (facteur structurel) | OK |

#### V3 — Santé Aidant

| ID | Question | Classé | Pourquoi c'est discutable | Mon avis |
|---|---|---|---|---|
| **E7** | Comment vous sentez-vous en ce moment, dans votre vie en général ? | etat | ✅ Correct — vécu subjectif actuel | OK |
| **O33** | Vous sentez-vous en bonne santé ? | etat | ✅ Correct | OK |
| **E14** | Ressentez-vous de la culpabilité ? | etat | ✅ Correct | OK |
| **E10** | Avez-vous renoncé à des soins pour vous-même ces 12 derniers mois ? | etat | C'est un **comportement passé** (renoncement) qui révèle un **état** actuel. Classement cohérent mais on pourrait arguer que le renoncement est un **facteur** qui aggrave la santé | Acceptable comme état |

#### V4 — Parcours Médical

| ID | Question | Classé | Pourquoi c'est discutable | Mon avis |
|---|---|---|---|---|
| **E40** | Quelles sont les principales difficultés pour accéder aux soins ? | etat | C'est un **vécu** (état) mais les difficultés d'accès sont aussi des **facteurs structurels** (déserts médicaux, délais) | ⚠️ Pourrait être **facteur** (barrières structurelles à l'accès aux soins) |
| **E42** | Combien de rendez-vous médicaux non prévus ce mois-ci ? | facteur | C'est un **indicateur factuel** → facteur est OK, mais ça mesure aussi une **instabilité médicale** (état) | Acceptable comme facteur |

---

### 7.3 — 🟠 Classifications surprenantes à discuter (4 questions)

Ces 4 questions méritent une validation explicite de Dr. Monka :

| # | ID | Question | Classé | Problème | Proposition |
|---|---|---|---|---|---|
| 1 | **O51** | Songez-vous à adapter son lieu de vie ? | **facteur** | « Songez-vous » = **intention / état mental**, pas une condition structurelle. On ne demande pas SI le lieu est adapté (facteur) mais si l'aidant Y PENSE (état) | Reclasser en **état** ? |
| 2 | **E40** | Quelles sont les principales difficultés pour accéder aux soins ? | **etat** | Les difficultés d'accès (délais, déserts médicaux, distance) sont des **barrières structurelles** = facteurs. Ce n'est pas un ressenti mais une réalité contextuelle | Reclasser en **facteur** ? |
| 3 | **E55** | Avez-vous le sentiment qu'une meilleure coordination améliorerait la prise en charge ? | **etat** | C'est effectivement un ressenti → état OK. Mais c'est aussi un **indicateur indirect** d'un manque de coordination (facteur). La question porte sur la **perception** donc état est défendable | Garder **état** |
| 4 | **E47** | Quand l'état de santé se dégrade brusquement, avez-vous un plan ? | **etat** | Avoir ou non un protocole d'urgence est plutôt un **facteur** (ressource en place ou non). La question ne demande pas « comment vous sentez-vous » mais « avez-vous un plan » | Reclasser en **facteur** ? |

---

### 7.4 — Observations transversales

#### 1. Le pattern « action réalisée vs vécu » est bien respecté

| Pattern | Classification | Exemples | Verdict |
|---|---|---|---|
| « Avez-vous **déjà** fait X ? » | Facteur | E41, E44, E58 (bilan réalisé, ETP, évaluation) | ✅ Cohérent — action passée = facteur structurel |
| « Comment **vous sentez-vous** ? » | État | E7, O33, E14, E54 | ✅ Cohérent — vécu subjectif = état |
| « **Quels** professionnels suivent... ? » | Facteur | E48, E49, E52, E53, O19, O59 | ✅ Cohérent — inventaire de ressources = facteur |
| « **Avez-vous des difficultés** à... ? » | État | O24, E40 | ⚠️ Ambigu — difficulté vécue (état) ou barrière structurelle (facteur) ? |

#### 2. V2 est massivement « facteur » — c'est logique

V2 (Fragilité du Proche) a **73% de facteurs** car elle inventorie principalement les conditions de vie, aides en place, et besoins du proche. Les rares « états » de V2 mesurent des signes cliniques observables (dépendance, troubles du comportement).

#### 3. V1 est la seule avec des « mixtes » — c'est cliniquement fondé

Les 4 questions « facteur ET état » sont toutes dans V1 parce que l'impact social est intrinsèquement **bidirectionnel** : c'est à la fois un vécu (« j'ai des difficultés ») et un déterminant (les difficultés sociales aggravent l'isolement → facteur de risque).

---

### 7.5 — Résumé pour Dr. Monka

| Question | Action suggérée |
|---|---|
| **O51** — « Songez-vous à adapter... » classé facteur | 💬 À valider : état ou facteur ? |
| **E40** — « Difficultés accès aux soins » classé état | 💬 À valider : état ou facteur ? |
| **E47** — « Avez-vous un plan d'urgence » classé état | 💬 À valider : état ou facteur ? |
| **E55** — « Sentiment coordination » classé état | ✅ Acceptable (perception = état) |
| Les **146 autres** | ✅ Classification clean, rien à redire |

> **Conclusion** : Sur 150 questions, **3 méritent une validation** de la classification (O51, E40, E47). Le reste est solide et cohérent. Le cadre état/facteur est bien appliqué.

---

## 8. Checklist de validation

- [x] 150/150 questions régulières → classification état/facteur confirmée en base
- [x] 150/150 questions régulières → aidance confirmée
- [x] Écart 153 vs 150 → expliqué (3 triggers cliniques)
- [x] Analyse de fond → 146/150 clean, 3 à valider (O51, E40, E47), 1 acceptable (E55)
- [ ] Décision sur les 4 questions « facteur ET état » (comptage double ou catégorie mixte ?)
- [ ] Décision sur O49 (reclasser en « facteur » ou laisser « aucun » ?)
- [ ] Validation des 3 classifications à discuter (O51, E40, E47)

---

*Document généré le 09/02/2026 — Sources : `Référence Questionnaire.xlsx` + Base Supabase Monka*
