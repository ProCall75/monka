# Règles de Routage IDEC / Care Manager — Expérimentation Klesia

> **Objectif** : Définir qui sera le **chef de dossier** d'un utilisateur — IDEC Monka ou Care Manager Klesia — en fonction de ses réponses au questionnaire clinique.  
> **Date** : 19/02/2026  
> **Auteur** : Antonin Rimaud — PRAGMA Studio  
> **Version** : v2.0

---

## 1. Le problème qu'on résout

Dans l'expérimentation avec Klesia, un utilisateur qui remplit le questionnaire Monka doit être **pris en charge par un interlocuteur principal** :

- **IDEC Monka** (Infirmière DE Coordination) — profil **médical**. Elle gère les situations qui nécessitent une coordination avec des professionnels de santé : médecins, psychiatres, gériatres, urgences, CMP. Elle est formée pour évaluer les risques cliniques et déclencher des protocoles de sécurisation.

- **Care Manager Klesia** — profil **médico-social**. Il gère l'accompagnement administratif, social et organisationnel : droits, aides, projet de vie, conciliation vie pro / aidance, aménagement du domicile. Il n'a **pas accès au périmètre médical** et ne peut pas coordonner des soins.

> **La question clé** : En regardant les réponses de l'utilisateur, peut-on déterminer automatiquement **qui doit piloter son dossier** ?

**Oui.** Le critère fondamental est la **criticité médicale** : si les réponses révèlent un besoin médical → IDEC. Sinon → Care Manager.

---

## 2. Le routage par vulnérabilité — Vue d'ensemble

Le questionnaire Monka couvre **5 vulnérabilités**. Trois d'entre elles ont un routage évident, deux nécessitent des règles fines.

| Vulnérabilité | Thème | Routage | Pourquoi |
|---|---|---|---|
| **V1** — Droits et aide | Accès aux droits, aides financières, démarches admin | 🟢 **100% Care Manager** | C'est de l'administratif pur. Aucun acte médical. L'assistante sociale, la MDPH, le conseil départemental — tout l'écosystème est médico-social. |
| **V2** — Conciliation de vie | Emploi, vie sociale, équilibre aidant-salarié | 🟢 **100% Care Manager** | Organisation de vie, aménagement travail, maintien du lien social. Pas de médecine ici. |
| **V3** — Santé de l'aidant | Santé physique et psychologique de l'aidant lui-même | 🟡 **Règles détaillées §3** | L'aidant peut être en simple besoin de suivi médical de routine (→ Care Manager peut orienter) **OU** en situation d'épuisement extrême/détresse psychologique (→ IDEC obligatoire). |
| **V4** — Fragilité du proche | État de santé, autonomie et sécurité de la personne aidée | 🟡 **Règles détaillées §4** | Le proche peut avoir des besoins purement sociaux (projet de vie, hébergement → Care Manager) **OU** des situations médicales critiques (idées suicidaires, comportements dangereux, instabilité clinique → IDEC). |
| **V5** — Coordination des soins | Parcours de soins, coordination entre professionnels | 🔴 **100% IDEC** | C'est de la coordination médicale pure. Médecin traitant, spécialistes, hôpital, HAD, SSR — le Care Manager n'a ni la formation ni le réseau pour gérer ça. |

### En résumé

```
V1 + V2 → Care Manager (toujours)
V5      → IDEC (toujours)
V3 + V4 → Ça dépend des réponses (voir ci-dessous)
```

---

## 3. Règles de routage V3 — Santé de l'aidant

### 3.1 Notre raisonnement

V3 évalue la santé de l'aidant **lui-même** (26 questions). La majorité des questions portent sur le suivi médical de routine (« Avez-vous un médecin traitant ? », « Faites-vous du sport ? ») — des sujets qu'un Care Manager peut tout à fait adresser en orientant l'utilisateur.

**Mais** certaines questions mesurent l'**épuisement psychique de l'aidant** et ses **inquiétudes pour la sécurité du proche**. Quand ces signaux sont au maximum, on passe dans le périmètre médical : il faut mobiliser un CMP (Centre Médico-Psychologique), un SAD en urgence, ou coordonner un suivi infirmier. C'est le travail de l'IDEC, pas du Care Manager.

**Le principe** : on distingue deux types de signaux — les **déclencheurs individuels** (une seule réponse suffit) et les **combinaisons** (des réponses intermédiaires qui, ensemble, signalent une criticité médicale).

### 3.2 Déclencheurs individuels — Une seule réponse suffit pour router vers IDEC

---

#### 🔴 E7 — Épuisement de l'aidant

> **« À quel point vous sentez-vous épuisé·e par votre rôle d'aidant ? »**

| Réponse | Routage |
|---|---|
| Pas fatigué·e | 🟢 Care Manager |
| Un peu fatigué·e | 🟢 Care Manager |
| Très fatigué·e | 🟡 *Pas suffisant seul, mais entre dans les combinaisons (§3.3)* |
| **Épuisé·e / au bord de craquer** | 🔴 **IDEC** |

**Pourquoi** : « Au bord de craquer » est un signal de risque vital dans l'échelle Zarit. L'aidant est au point de rupture — il faut mobiliser des relais en urgence (SAD, plateforme de répit). Seule l'IDEC peut coordonner cette mobilisation.

---

#### 🔴 E10 — Détresse psychologique

> **« Sur le plan moral (stress, inquiétude), où vous situez-vous ? »**

| Réponse | Routage |
|---|---|
| Ça va globalement | 🟢 Care Manager |
| Parfois tendu·e | 🟢 Care Manager |
| Souvent tendu·e | 🟡 *Entre dans les combinaisons (§3.3)* |
| **Débordé·e / au bord de craquer** | 🔴 **IDEC** |

**Pourquoi** : La détresse psychologique extrême nécessite une orientation CMP (Centre Médico-Psychologique) et potentiellement un suivi psychiatrique. Ce sont des actes médicaux.

---

#### 🔴 E11 — Capacité à continuer

> **« Pensez-vous pouvoir continuer dans les 6 prochains mois ? »**

| Réponse | Routage |
|---|---|
| Sans difficulté | 🟢 Care Manager |
| Ce sera difficile | 🟡 *Entre dans les combinaisons (§3.3)* |
| Pas sûr·e | 🟡 *Entre dans les combinaisons (§3.3)* |
| **Non, je risque de ne plus y arriver** | 🔴 **IDEC** |

**Pourquoi** : « Je risque de ne plus y arriver » = point de rupture imminent. L'IDEC doit anticiper l'effondrement en mobilisant des relais d'urgence avant la rupture.

---

#### 🔴 E12 — Le proche se met en danger

> **« Êtes-vous inquiet·e que votre proche se fasse du mal ? »**

| Réponse | Routage |
|---|---|
| Non | 🟢 Care Manager |
| Parfois | 🟡 *Entre dans les combinaisons (§3.3)* |
| **Souvent** | 🔴 **IDEC** |

**Pourquoi** : Une inquiétude fréquente pour la sécurité du proche signale un risque de mise en danger. L'IDEC mobilise le CMP (infirmier de secteur) pour évaluation au domicile — un acte médical.

---

#### 🔴 E13 — Le proche met autrui en danger

> **« Êtes-vous inquiet·e que votre proche mette d'autres personnes en danger ? »**

| Réponse | Routage |
|---|---|
| Non | 🟢 Care Manager |
| Parfois | 🟡 *Entre dans les combinaisons (§3.3)* |
| **Oui** | 🔴 **IDEC** |

**Pourquoi** : Un proche qui met autrui en danger (agressivité, conduite dangereuse, errance) nécessite une intervention médicale de sécurisation. Le Care Manager n'a ni les compétences ni le réseau pour gérer ça.

---

### 3.3 Combinaisons (CCC) — Des réponses intermédiaires qui ensemble déclenchent l'IDEC

Les réponses intermédiaires (🟡 ci-dessus) ne suffisent pas seules à router vers l'IDEC. **Mais quand elles se combinent**, elles révèlent un pattern de criticité médicale plus grave que chaque réponse isolée.

---

#### 🔴 COMBO V3-1 : Épuisement + Détresse morale

> **E7 = « Très fatigué·e » + E10 = « Souvent tendu·e »**

**Pourquoi c'est médical** : Un aidant « très fatigué » qui est aussi « souvent tendu » a un double signal de burn-out physique + psychique. Séparément, chaque réponse est un signal d'alerte modéré. Ensemble, c'est un pattern d'épuisement installé qui nécessite une évaluation clinique par l'IDEC : bilan de charge, orientation possible vers un psychologue, mise en place de relais.

---

#### 🔴 COMBO V3-2 : Isolement + Inquiétude sécuritaire

> **E8 ∈ {Souvent, Tout le temps} + (E12 = « Parfois » OU E13 = « Parfois »)**  
> *(Isolement émotionnel fréquent + inquiétude intermittente pour la sécurité)*

**Pourquoi c'est médical** : Un aidant isolé émotionnellement ET qui a des inquiétudes pour la sécurité est dans une situation dangereuse : il gère seul un risque. Cette combinaison augmente le risque de passage à l'acte (négligence du proche par épuisement, effondrement psychologique). L'IDEC doit coordonner un filet de sécurité (CMP, suivi rapproché).

> ⚠️ Cette CCC existe déjà dans les fiches de complétude V3 (`V3_S2_CCC_02`).

---

#### 🔴 COMBO V3-3 : Épuisement + Rupture imminente + Arrêt de travail

> **E7 ≥ « Très fatigué·e » + E11 ∈ {Pas sûr·e, Difficile} + N8 ≥ « 5j à 1 mois »**  
> *(Fatigue intense + doute sur la capacité à continuer + arrêt de travail significatif)*

**Pourquoi c'est médical** : Quand l'épuisement impacte déjà le travail (arrêt maladie lié au rôle d'aidant) et que l'aidant doute de sa capacité à continuer, on est dans un schéma de burn-out installé avec des conséquences socioprofessionnelles. L'IDEC doit intervenir pour prévenir l'effondrement total : bilan de charge, relais SAD, et coordination avec le médecin du travail si nécessaire.

---

#### 🔴 COMBO V3-4 : Santé dégradée + Renoncement aux soins

> **O44 = « Moins bonne » + E16 = « Reporte ou annule souvent »**  
> *(Santé perçue moins bonne que les pairs + renoncement actif aux soins)*

**Pourquoi c'est médical** : L'aidant se sent moins bien que les personnes de son âge ET il renonce activement à ses propres soins. C'est un cercle vicieux médical : la santé se dégrade parce que l'aidant n'y va plus. L'IDEC doit coordonner la reprise du suivi, identifier les freins (pas de temps ? pas de relais pour le proche ?) et organiser les solutions (garde relais, transport).

> ⚠️ Cette CCC existe déjà dans le moteur actuel (`V3_S3_CCC_01` : O44 + E18).

---

### 3.4 Règle synthétique V3 — Résumé complet

> **🔴 → IDEC si au moins UNE des conditions suivantes est remplie :**

| Type | # | Condition | Signal |
|---|---|---|---|
| **Individuel** | 1 | E7 = « Épuisé·e / au bord de craquer » | Risque vital |
| **Individuel** | 2 | E10 = « Débordé·e / au bord de craquer » | Risque vital |
| **Individuel** | 3 | E11 = « Non, je risque de ne plus y arriver » | Rupture imminente |
| **Individuel** | 4 | E12 = « Souvent » | Danger pour le proche |
| **Individuel** | 5 | E13 = « Oui » | Danger pour autrui |
| **Combo** | 6 | E7 = Très fatigué + E10 = Souvent tendu | Burn-out installé |
| **Combo** | 7 | E8 = Souvent/Tout le temps + E12 ou E13 = Parfois | Isolement + risque sécuritaire |
| **Combo** | 8 | E7 ≥ Très fatigué + E11 = Difficile/Pas sûr + N8 ≥ 5j | Burn-out avec impact professionnel |
| **Combo** | 9 | O44 = Moins bonne + E16 = Reporte/annule souvent | Santé dégradée + renoncement soins |

> **Si aucune condition → 🟢 Care Manager Klesia.**

---

## 4. Règles de routage V4 — Fragilité du proche

### 4.1 Notre raisonnement

V4 évalue la **fragilité de la personne aidée** (55 questions). C'est la vulnérabilité la plus volumineuse et la plus complexe du questionnaire.

Elle couvre un spectre très large : du projet de vie (« où votre proche va-t-il vivre ? ») jusqu'aux idées suicidaires. Une bonne partie de V4 est de l'accompagnement social et organisationnel — le Care Manager sait faire ça. Mais les situations médicales critiques du proche — automutilation, errance, confusion cognitive, instabilité hospitalière — nécessitent obligatoirement une IDEC.

**Le principe est le même qu'en V3** : des déclencheurs individuels (réponse extrême = IDEC direct) + des combinaisons (réponses intermédiaires qui ensemble révèlent une criticité médicale).

### 4.2 Déclencheurs individuels — Une seule réponse suffit pour router vers IDEC

---

#### 🚨 N25 — Idées suicidaires du proche

> **« La personne aidée exprime-t-elle des idées suicidaires ? »**

| Réponse | Routage |
|---|---|
| Jamais | 🟢 Care Manager |
| **Parfois** | 🔴 **IDEC** |
| **Souvent** | 🔴 **IDEC (URGENT)** |

**Pourquoi** : Signal de **risque vital maximal**. Même « parfois » suffit. L'IDEC oriente immédiatement vers le médecin généraliste pour adressage aux urgences psychiatriques. Un Care Manager ne peut pas et ne doit pas gérer ça.

---

#### 🚨 N22 — Automutilation du proche

> **« La personne aidée a-t-elle des comportements à risque (automutilation) ? »**

| Réponse | Routage |
|---|---|
| Jamais | 🟢 Care Manager |
| **Parfois** | 🔴 **IDEC** |
| **Souvent** | 🔴 **IDEC (URGENT)** |

**Pourquoi** : L'automutilation nécessite un suivi psychiatrique. Même « parfois » est un signal d'alerte médicale. Le Care Manager n'est pas habilité.

---

#### 🚨 E27 — Comportements dangereux (gaz, errance)

> **« La personne aidée a-t-elle des comportements potentiellement dangereux ? (gaz ouvert, errance, conduites à risque…) »**

| Réponse | Routage |
|---|---|
| Non | 🟢 Care Manager |
| **Parfois** | 🔴 **IDEC** |
| **Oui** | 🔴 **IDEC (URGENT)** |

**Pourquoi** : Un gaz ouvert, une errance nocturne = risque vital pour le proche ET l'entourage. L'IDEC coordonne la sécurisation (téléalarme, domotique, verrous) et le bilan neuro-cognitif avec le gériatre/neurologue.

---

#### 🔴 O13 = « Totalement altérées » — Fonctions cognitives détruites

> **« Y a-t-il une détérioration des fonctions cognitives chez la personne aidée ? »**

| Réponse | Routage |
|---|---|
| Non | 🟢 Care Manager |
| Diminution partielle | 🟡 *Entre dans les combinaisons (§4.3)* |
| **Totalement altérées** | 🔴 **IDEC** |

**Pourquoi** : Perte totale des fonctions cognitives = le proche a besoin d'un bilan gériatrique/neurologique complet, d'une consultation mémoire, et potentiellement d'une ESAD (Équipe Spécialisée Alzheimer). Ces acteurs sont médicaux.

---

#### 🔴 E25 = « Oui » — Confusion jour/nuit

> **« La personne aidée présente-t-elle une confusion entre le jour et la nuit ? »**

| Réponse | Routage |
|---|---|
| Non | 🟢 Care Manager |
| Parfois | 🟡 *Entre dans les combinaisons (§4.3)* |
| **Oui** | 🔴 **IDEC** |

**Pourquoi** : L'inversion jour/nuit est un marqueur de fragilité cognitive sévère qui nécessite une évaluation neurologique et impacte directement la sécurité nocturne.

---

#### 🔴 E26 = « Oui » — Désorientation dans les lieux familiers

> **« La personne aidée se désoriente-t-elle dans des lieux familiers ? »**

| Réponse | Routage |
|---|---|
| Non | 🟢 Care Manager |
| Parfois | 🟡 *Entre dans les combinaisons (§4.3)* |
| **Oui** | 🔴 **IDEC** |

**Pourquoi** : Désorientation dans les lieux familiers = risque de fugue. C'est une urgence sécuritaire et médicale. L'IDEC active la téléalarme et coordonne avec le gériatre.

---

#### 🔴 E28 ≥ 2 — Hospitalisations multiples récentes

> **« Combien de fois la personne aidée a-t-elle été hospitalisée ces 3 derniers mois ? »**

| Réponse | Routage |
|---|---|
| Aucune | 🟢 Care Manager |
| 1 fois | 🟡 *Entre dans les combinaisons (§4.3)* |
| **2 fois** | 🔴 **IDEC** |
| **3 fois ou plus** | 🔴 **IDEC (URGENT)** |

**Pourquoi** : ≥ 2 hospitalisations en 3 mois = instabilité clinique aiguë. L'IDEC coordonne le protocole de sortie, la liaison HAD/SSR, la prévention de la ré-hospitalisation. Le Care Manager n'a aucune compétence sur le parcours hospitalier.

---

#### 🔴 E30 ≥ 2 — Passages aux urgences multiples

> **« Combien d'hospitalisations ont eu lieu via les urgences ? »**

| Réponse | Routage |
|---|---|
| 0 | 🟢 Care Manager |
| 1 | 🟡 *Entre dans les combinaisons (§4.3)* |
| **2 ou plus** | 🔴 **IDEC** |

**Pourquoi** : Les passages aux urgences non programmés signalent une fragilité non maîtrisée et un parcours de soins instable.

---

#### 🔴 E24 = « Permanence » — Présence nocturne permanente

> **« La personne aidée a-t-elle besoin d'une présence la nuit ? »**

| Réponse | Routage |
|---|---|
| Autonome la nuit | 🟢 Care Manager |
| Parfois | 🟢 Care Manager |
| Souvent | 🟡 *Entre dans les combinaisons (§4.3)* |
| **Permanence nécessaire** | 🔴 **IDEC** |

**Pourquoi** : La présence permanente la nuit signifie que le proche ne peut jamais être seul. Cela nécessite une coordination de soins (SSIAD, IDEL, relais nocturne) que seule une infirmière peut organiser.

---

### 4.3 Combinaisons (CCC) — Des réponses intermédiaires qui ensemble déclenchent l'IDEC

---

#### 🔴 COMBO V4-1 : Déclin cognitif partiel convergent

> **O13 = « Diminution partielle » + E25 = « Parfois » + E26 = « Parfois »**  
> *(Fonctions cognitives diminuées + confusion épisodique + désorientation épisodique)*

**Pourquoi c'est médical** : Chaque réponse seule est « intermédiaire ». Mais quand les TROIS convergent, c'est un pattern de **déclin cognitif progressif** qui nécessite un bilan gériatrique ou neurologique. L'IDEC doit coordonner une consultation mémoire avant que la situation ne s'aggrave.

---

#### 🔴 COMBO V4-2 : Dépendance lourde non maîtrisée

> **E23 = « Ne peut pas rester seul » + E24 = « Souvent » + E22 ≥ « 15-30h/sem »**  
> *(Proche ne peut pas rester seul + besoin de présence nocturne fréquente + volume d'aide élevé)*

**Pourquoi c'est médical** : Ce profil indique un niveau de dépendance qui dépasse le cadre médico-social. Le volume d'aide (15h+), l'impossibilité de laisser le proche seul, et les besoins nocturnes fréquents nécessitent une coordination de soins infirmiers (SSIAD, IDEL) et potentiellement un bilan gériatrique pour réévaluer le GIR.

---

#### 🔴 COMBO V4-3 : Instabilité hospitalière

> **E28 = 1 + E30 = 1 + E31 ≥ « 4-7 jours »**  
> *(1 hospitalisation récente, mais via les urgences et longue durée)*

**Pourquoi c'est médical** : Une seule hospitalisation ne route pas vers l'IDEC (seuil ≥ 2). **Mais** si cette hospitalisation unique est passée par les urgences (non programmée = fragilité non maîtrisée) ET a duré plus de 4 jours (sévérité), c'est un signal d'instabilité clinique. L'IDEC doit s'assurer que le protocole post-hospitalisation est en place.

---

#### 🔴 COMBO V4-4 : Polymédication + Non-observance

> **O3 ≥ « 7 médicaments » + N14 = « Oui »**  
> *(Polymédication ≥ 7 médicaments/jour + difficultés à suivre le traitement)*

**Pourquoi c'est médical** : La polymédication est un facteur de risque pharmaceutique reconnu (interactions, effets secondaires). Quand le proche prend 7+ médicaments ET a des difficultés à suivre le traitement, le risque iatrogène est élevé. L'IDEC doit coordonner un bilan de médication avec le médecin traitant et le pharmacien. Le Care Manager ne peut pas évaluer les interactions médicamenteuses.

---

#### 🔴 COMBO V4-5 : Risques comportementaux multiples

> **N19 = « Souvent » + (E25 = « Parfois » OU E26 = « Parfois »)**  
> *(Changements d'humeur fréquents + signes cognitifs épisodiques)*

**Pourquoi c'est médical** : Des changements d'humeur fréquents combinés à des signes cognitifs épisodiques (confusion ou désorientation) signalent un trouble neuropsychique qui nécessite un bilan spécialisé (gériatre, psychiatre). Séparément ce sont des signaux modérés — ensemble, ils forment un tableau clinique.

---

### 4.4 Règle synthétique V4 — Résumé complet

> **🔴 → IDEC si au moins UNE des conditions suivantes est remplie :**

| Type | # | Condition | Signal |
|---|---|---|---|
| **Individuel** | 1 | N25 ≥ « Parfois » | 🚨 Idées suicidaires |
| **Individuel** | 2 | N22 ≥ « Parfois » | 🚨 Automutilation |
| **Individuel** | 3 | E27 ≥ « Parfois » | 🚨 Comportements dangereux |
| **Individuel** | 4 | O13 = « Totalement altérées » | Perte cognitive totale |
| **Individuel** | 5 | E25 = « Oui » | Confusion jour/nuit |
| **Individuel** | 6 | E26 = « Oui » | Désorientation lieux familiers |
| **Individuel** | 7 | E28 ≥ 2 | ≥ 2 hospitalisations en 3 mois |
| **Individuel** | 8 | E30 ≥ 2 | ≥ 2 passages urgences |
| **Individuel** | 9 | E24 = « Permanence » | Présence nocturne permanente |
| **Combo** | 10 | O13=Partielle + E25=Parfois + E26=Parfois | Déclin cognitif convergent |
| **Combo** | 11 | E23=Ne peut pas + E24=Souvent + E22≥15h | Dépendance lourde non maîtrisée |
| **Combo** | 12 | E28=1 + E30=1 + E31≥4j | Hospitalisation urgente longue |
| **Combo** | 13 | O3≥7 médicaments + N14=Oui | Polymédication + non-observance |
| **Combo** | 14 | N19=Souvent + (E25 ou E26=Parfois) | Humeur instable + signes cognitifs |

> **Si aucune condition → 🟢 Care Manager Klesia.**

---

## 5. Récapitulatif global

### Comptage final des règles de routage

| Vulnérabilité | Nb triggers individuels | Nb combinaisons | Total règles IDEC |
|---|---|---|---|
| **V1** | 0 | 0 | 0 (100% Care Manager) |
| **V2** | 0 | 0 | 0 (100% Care Manager) |
| **V3** | 5 | 4 | **9 règles** |
| **V4** | 9 | 5 | **14 règles** |
| **V5** | — | — | 100% IDEC |
| **Total V3+V4** | **14** | **9** | **23 règles** |

### Arbre de décision final

```
         QUESTIONNAIRE MONKA (165 questions)
                      │
      ┌───────────────┼───────────────┐
      ▼               ▼               ▼
   V1 + V2         V3 + V4           V5
      │               │               │
      ▼               ▼               ▼
 🟢 CARE MGR    Vérifier les      🔴 IDEC
   (direct)    23 conditions       (direct)
                      │
              ┌───────┴───────┐
              ▼               ▼
         ≥ 1 condition    0 condition
           remplie         remplie
              │               │
              ▼               ▼
         🔴 IDEC        🟢 CARE MGR
```

### Ce qui distingue IDEC du Care Manager

| Critère | IDEC Monka | Care Manager Klesia |
|---|---|---|
| **Formation** | Infirmière coordinatrice | Accompagnateur médico-social |
| **Périmètre médical** | ✅ Oui | ❌ Non |
| **Acteurs mobilisables** | MT, spécialistes, CMP, HAD, SSR, SSIAD, IDEL, urgences | SAD, AS, MDPH, Conseil départemental, associations |
| **Signal d'activation** | Risque vital, détresse extrême, instabilité clinique, combinaisons critiques | Besoin d'aide administrative, sociale, organisationnelle |

---

> 📋 **REGLES_ROUTAGE_KLESIA v2.0 — À valider Antonin + Dr. Monka + Équipe Klesia**
