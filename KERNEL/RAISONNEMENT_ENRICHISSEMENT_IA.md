# 📋 Enrichissement IA — Documentation des choix

> **Date** : 11/02/2026
> **Auteur** : IA (Antigravity)
> **Statut** : 🤖 Propositions — **à valider par Dr. Monka**

---

## 1. Classification du Domaine des Micro-Tâches (🏥 / 🤝)

### Objectif
Chaque MT doit indiquer si elle relève du **domaine médical** (🏥) ou **médico-social** (🤝), pour orienter l'utilisateur vers le bon type de professionnel.

### Règles de classification utilisées

| Critère | → Domaine | Justification |
|---|---|---|
| Type = MED | 🏥 Médical | Par définition, une MT médicale relève du domaine médical |
| Libellé mentionne : médecin, hôpital, traitement, spécialiste, bilan, prescription, soins, urgence, pharmacie, infirmier, kiné, ergothérapeute, douleur, dénutrition, chute | 🏥 Médical | Termes fléchant vers le soin ou le parcours de santé |
| Tout le reste | 🤝 Médico-social | Par défaut, les actions d'accompagnement, d'information, d'organisation relèvent du champ social/médico-social |

### Résultat

| Domaine | Count | % |
|---|---|---|
| 🏥 Médical | 88 | 29.4% |
| 🤝 Médico-social | 211 | 70.6% |

### Points d'attention pour Dr. Monka

> [!WARNING]
> Les cas suivants méritent une relecture attentive :
> - MTs de type **SEC** mentionnant des professionnels de santé → classées « médical » alors qu'elles pourraient être médico-social
> - MTs de type **INFO** mentionnant des soins → classées « médical » mais l'acte d'informer ne requiert pas forcément un médecin
> - MTs de type **STRUC** dans V3 (Santé Aidant) → classées « médico-social » par défaut mais certaines pourraient concerner le médical

**Recommandation** : vérifier les 88 MTs classées « médical » en priorité (les 211 médico-social sont le choix par défaut, plus conservateur).

---

## 2. Attribution des Acteurs

### Objectif
Identifier **qui** est le mieux placé pour réaliser chaque MT.

### Règles de classification utilisées

| Critère | → Acteur | Justification |
|---|---|---|
| Type MED + mention « médecin traitant » / « bilan » / « lettre » | Médecin traitant | Le prescripteur est le MT, la lettre d'adressage vient du MT |
| Type MED + mention « spécialiste » / « psychiatre » / « gériatre » | Médecin spécialiste | Renvoi vers le spécialiste concerné |
| Type MED sans spécificité | Professionnel de santé | Acteur médical générique à préciser |
| Type SEC + mention « psycholog » | Psychologue | Soutien psychologique spécifique |
| Type SEC (reste) | IDEC | L'IDEC est le coordinateur naturel des actions de sécurisation |
| Type STRUC + mention « aide à domicile » / SAD | Service d'aide à domicile | Service structurel identifié |
| Type STRUC (reste) | IDEC | Coordination de mise en place |
| Type INFO + mention « informer » / « orienter » | Aidant (autonome) | L'aidant peut accéder lui-même à l'information (K7: autonomie) |
| Type INFO (reste) | IDEC | Information nécessitant un professionnel |
| Type ORGA + mention « identifier » / « lister » / « explorer » | Aidant (autonome) | Tâche de réflexion/inventaire réalisable par l'aidant |
| Type ORGA (reste) | IDEC | Évaluation professionnelle |

### Résultat

| Acteur | Count | % |
|---|---|---|
| IDEC | 189 | 63.2% |
| Aidant (autonome) | 51 | 17.1% |
| Médecin traitant | 27 | 9.0% |
| Professionnel de santé | 18 | 6.0% |
| Psychologue | 7 | 2.3% |
| Médecin spécialiste | 7 | 2.3% |

### Points d'attention pour Dr. Monka

> [!WARNING]
> - **63% IDEC** : c'est beaucoup. Certaines tâches classées IDEC pourraient être faisables par l'aidant seul → vérifier s'il y a des tâches qu'on pourrait reclasser en « Aidant (autonome) »
> - **Acteurs manquants** : il pourrait exister d'autres acteurs pertinents (assistant social, CLIC, MAIA, plateforme de répit) → à enrichir si nécessaire
> - **Tâches « Aidant (autonome) »** : correspond à K7 (autonomie par défaut) mais certaines nécessitent peut-être un accompagnement initial

---

## 3. Seuils de Scoring (Scénario D)

### Objectif
Définir 4 niveaux d'interprétation du score par vulnérabilité.

### Méthode
Division proportionnelle du score max en 4 plages approximativement égales (~25% chacune).

| V | Score max (legacy) | 🟢 Faible | 🟡 Modéré | 🟠 Élevé | 🔴 Critique |
|---|---|---|---|---|---|
| V1 | 15 | 0-3 | 4-7 | 8-11 | 12-15 |
| V2 | 22 | 0-5 | 6-11 | 12-17 | 18-22 |
| V3 | 20 | 0-5 | 6-10 | 11-15 | 16-20 |
| V4 | 12 | 0-3 | 4-6 | 7-9 | 10-12 |
| V5 | 6 | 0-1 | 2-3 | 4-5 | 6 |

### Points d'attention pour Dr. Monka

> [!WARNING]
> - Les seuils sont **mathématiques** (répartition linéaire). Il serait préférable d'utiliser des seuils **cliniques** basés sur l'expérience terrain.
> - **V5 a seulement 3 questions scorantes** — les seuils sont très serrés. Dr. Monka doit confirmer si c'est acceptable ou si des questions supplémentaires doivent devenir scorantes.
> - **V4 a 6 questions** — même problème de granularité. Les seuils devront être recalibrés si des reclassifications ajoutent des questions scorantes.
> - Ces seuils seront recalculés automatiquement après application des reclassifications Scénario D.

---

## 4. Wording IDEC manquants (3 recos comblées)

| Reco ID | MP | Texte IDEC ajouté | Justification |
|---|---|---|---|
| R1_RECO_02 | R1 (V1) | « Orienter l'aidant vers la plateforme de répit du territoire. Faciliter la première prise de contact. » | Cohérent avec le texte utilisateur (répit) et le rôle de l'IDEC (K8) |
| S1_RECO_04 | S1 (V3) | « Mettre en lien avec la plateforme de répit locale. Évaluer le besoin de relais et accompagner la mise en place. » | Action IDEC classique : évaluation + mise en relation |
| A4_RECO_01 | A4 (V5) | « Accompagner l'aidant dans l'identification des aides et droits mobilisables. Orienter vers l'assistant(e) social(e) ou le CLIC. » | Renvoi vers l'AS, cohérent avec V5 (admin) |

> [!TIP]
> Ces textes sont courts volontairement. Dans le template B rempli, ils seront complétés avec le contexte du MP.

---

## Résumé des enrichissements appliqués en DB

| Table | Colonne | Nombre de lignes modifiées | Source |
|---|---|---|---|
| `micro_taches` | `domaine` | 299 | IA 🤖 |
| `micro_taches` | `acteur` | 299 | IA 🤖 |
| `recommendations` | `idec_actions` | 3 | IA 🤖 |
| `scoring_thresholds` | (nouvelle table) | 20 | IA 🤖 |

**Total : 621 enrichissements IA** à valider par Dr. Monka.
