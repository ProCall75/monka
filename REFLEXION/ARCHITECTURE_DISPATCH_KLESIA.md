# Architecture de Dispatch — My Monka × Klésia

> **Document de référence — Expérimentation Care Managers**
> Date : 18 février 2026 | Auteur : PRAGMA pour Monka
> Statut : Proposition validée en interne, à présenter aux équipes

---

## 1. Contexte et enjeu

Klésia propose à Monka d'intégrer des **Care Managers** (domaine médico-social) dans le parcours de suivi des bénéficiaires. L'enjeu est double :
- **Alléger la charge de l'IDEC** pour qu'elle se concentre sur le cœur médical
- **Offrir un accompagnement médico-social de qualité** via les Care Managers Klésia

La question centrale : **comment dispatcher les tâches entre Care Manager et IDEC ?**

---

## 2. Pourquoi le dispatch doit se faire au niveau des micro-tâches

### Le problème du dispatch par utilisateur

Un dispatch "total" (l'utilisateur entier va chez l'un ou l'autre) ne fonctionne pas, parce que **la quasi-totalité des bénéficiaires ont des besoins mixtes** — médicaux ET médico-sociaux. Prenons un exemple concret :

> **Marie, 78 ans** — Score élevé en V1 (Chutes) et V4 (Isolement)
> - Elle a besoin d'un **bilan d'équilibre** chez le kinésithérapeute → **Médical**
> - Elle a besoin d'un **aménagement de son logement** → **Médico-social**
> - Elle a besoin d'un **lien avec le CCAS** pour rompre l'isolement → **Médico-social**
> - Elle a besoin d'un **suivi traitement** par le médecin traitant → **Médical**
>
> Envoyer Marie à 100% chez le Care Manager = on perd le suivi médical.
> Garder Marie à 100% chez l'IDEC = on ne décharge rien.

### La solution : dispatcher chaque micro-tâche individuellement

Le moteur clinique de Monka génère déjà des **micro-tâches (MTs)** pour chaque bénéficiaire. Chaque MT a un **domaine** (`medical` ou `medico_social`) et un **acteur** responsable. C'est cette granularité qui permet un dispatch intelligent.

**Résultat pour Marie :**
- Ses 2 MTs médicales → IDEC
- Ses 2 MTs médico-sociales → Care Manager Klésia
- Les deux travaillent en parallèle, chacun dans son domaine d'expertise

---

## 3. Les données — ce qui existe déjà

### Répartition globale des 369 micro-tâches en base

| Domaine | Nombre de MTs | % du total |
|---|---|---|
| **Médico-social** | 303 | **82%** |
| **Médical** | 66 | **18%** |

> **82% des micro-tâches sont médico-sociales.** C'est la preuve chiffrée que le partenariat Klésia a un potentiel de décharge massif pour l'IDEC.

### Répartition par vulnérabilité

Les 5 vulnérabilités du moteur clinique Monka se décomposent en Mesures de Prévention (MP) identifiées par leurs préfixes :

| Vulnérabilité | Préfixes MPs | MTs Méd. | MTs Méd-Soc. | Total | % Méd-Soc |
|---|---|---|---|---|---|
| **V1** — Chutes | F1-F6 | 29 | 61 | 90 | 68% |
| **V2** — Nutrition | S1-S4 | 19 | 19 | 38 | 50% |
| **V3** — Médicaments | R1-R4 | 5 | 51 | 56 | 91% |
| **V4** — Isolement | M1-M6 | 20 | 118 | 138 | 86% |
| **V5** — Dépression/Cognition | A1-A4 | 0 | 47 | 47 | 100% |

**Enseignements clés :**
- **V5 est 100% médico-social** → Tout va aux Care Managers
- **V4 est à 86% médico-social** → Parfaitement adapté aux Care Managers
- **V3 est à 91% médico-social** → Le suivi médicamenteux (rappels, piluliers, accès soins) est largement médico-social
- **V2 est la plus équilibrée** → Répartition 50/50, les deux interviennent
- **V1 contient le plus de MTs médicales** → Mais reste à 68% médico-social

### Acteurs principaux par domaine

**Domaine MÉDICAL (→ IDEC Monka)**

| Acteur | Nb MTs |
|---|---|
| Médecin traitant | 31 |
| Gériatre | 8 |
| Spécialiste | 5 |
| Addictologue | 4 |
| Ergothérapeute | 4 |
| IDEL | 4 |
| Psychiatre | 4 |
| + 22 autres acteurs médicaux | 6 |

**Domaine MÉDICO-SOCIAL (→ Care Manager Klésia)**

| Acteur | Nb MTs |
|---|---|
| Aidant | 127 |
| IDEC (accompagnement) | 106 |
| Assistante sociale | 29 |
| SAD (Service d'Aide à Domicile) | 16 |
| Médecin traitant (rôle social) | 13 |
| Psychologue | 12 |
| CPAM | 11 |
| MDPH | 10 |
| Plateforme répit | 10 |
| Structures soutien aidants | 10 |
| Accueil de jour | 9 |
| + 37 autres acteurs médico-sociaux | 50 |

> **Point critique** : l'IDEC apparaît dans 106 MTs médico-sociales. Ce sont précisément les tâches qui peuvent être déléguées au Care Manager pour décharger l'IDEC.

---

## 4. Le flux de dispatch — comment ça marche

### Vue d'ensemble

```
 UTILISATEUR          MOTEUR CLINIQUE           IDEC              CARE MANAGER
     │                      │                    │                      │
     │  Questionnaire       │                    │                      │
     │─────────────────────▶│                    │                      │
     │                      │                    │                      │
     │                      │  Calcul auto :     │                      │
     │                      │  • Vulnérabilités  │                      │
     │                      │  • MPs activés     │                      │
     │                      │  • MTs générées    │                      │
     │                      │  • Tags domaine +  │                      │
     │                      │    acteur           │                      │
     │                      │                    │                      │
     │                      │  Dossier pré-mâché │                      │
     │                      │───────────────────▶│                      │
     │                      │                    │                      │
     │                      │                    │  Revue IDEC :        │
     │                      │                    │  • Valide/ajuste     │
     │                      │                    │    les assignations  │
     │                      │                    │  • Garde ce qu'elle  │
     │                      │                    │    juge pertinent    │
     │                      │                    │  • ✅ Valide         │
     │                      │                    │                      │
     │                      │                    │  Validation IDEC =   │
     │                      │                    │  Ouverture accès     │
     │                      │                    │─────────────────────▶│
     │                      │                    │                      │
     │                      │                    │                      │  Travaille sur
     │                      │                    │                      │  ses MTs assignées
     │                      │                    │                      │  (médico-social)
     │                      │                    │                      │
     │                      │                    │    Notification      │
     │                      │                    │◀─────────────────────│
     │                      │                    │  (MTs terminées)     │
```

### Étape 1 — L'utilisateur complète son questionnaire

L'utilisateur répond aux 165 questions sur l'app My Monka. Les réponses sont stockées en base (hébergement HDS). Aucune intervention humaine à cette étape.

### Étape 2 — Le moteur clinique traite automatiquement

Le moteur déterministe de Monka :
1. **Calcule les vulnérabilités activées** (V1 à V5) selon les scores
2. **Active les Mesures de Prévention** pertinentes
3. **Génère les micro-tâches** concrètes pour chaque MP
4. **Tag chaque MT** avec son `domaine` (medical / medico_social) et ses `acteurs`
5. **Crée le dossier** dans le CRM Lifeline avec statut : 🟡 **EN ATTENTE VALIDATION IDEC**

> Le travail est **pré-mâché** : l'IDEC reçoit un dossier complet avec des suggestions d'assignation, pas une page blanche.

### Étape 3 — L'IDEC valide le dossier (Gate-keeper)

C'est l'étape critique. L'IDEC :

- ✅ **Voit tout** : contexte médical complet + médico-social
- ✅ **Revoit chaque MT** et son assignation suggérée (Care Manager ou IDEC)
- ✅ **Peut réassigner librement** :
  - Garder une MT médico-sociale si elle détecte une criticité médicale
  - Réassigner une MT médicale si elle le juge pertinent
  - Ajouter ou supprimer des MTs
- ✅ **Valide le dossier** quand elle est satisfaite

**Statuts du dossier :**
```
🟡 EN ATTENTE  →  🔵 EN REVUE IDEC  →  🟢 VALIDÉ
```

> **L'IDEC reste le pilote clinique.** Aucune donnée ne sort vers Klésia sans sa validation explicite. C'est un garde-fou essentiel pour la qualité clinique, la responsabilité et la conformité RGPD.

### Étape 4 — Les Care Managers travaillent (post-validation)

Une fois le dossier validé par l'IDEC, les Care Managers Klésia accèdent **uniquement** à :

| Ont accès | N'ont PAS accès |
|---|---|
| ✅ MTs médico-sociales assignées | ❌ Données médicales (diagnostics, traitements) |
| ✅ Fiche de contexte sanitisée (âge, situation, logement) | ❌ MTs médicales |
| ✅ Notes de l'IDEC pour le Care Manager | ❌ Scores de vulnérabilité détaillés |
| ✅ Actions : valider MT, ajouter notes, remonter alerte | ❌ Historique clinique complet |

**Actions du Care Manager :**
- Valider/compléter ses MTs assignées (⬜ → 🔄 En cours → ✅ Fait)
- Ajouter des notes médico-sociales
- Remonter une alerte vers l'IDEC si nécessaire

**Notification de clôture :** Quand le Care Manager termine toutes ses MTs, l'IDEC reçoit une notification. Elle peut alors vérifier la cohérence globale et clore le dossier.

---

## 5. Faisabilité technique

### Ce qui existe déjà (zéro développement)

| Composant | Statut | Détail |
|---|---|---|
| Questionnaire utilisateur | ✅ Opérationnel | 165 questions, app My Monka |
| Moteur clinique déterministe | ✅ Opérationnel | V1-V5, MPs, MTs |
| Champ `domaine` sur les MTs | ✅ En base | 73 medical, 296 medico_social |
| Champ `acteur` sur les MTs | ✅ En base | 90+ acteurs distincts |
| CRM Lifeline | ✅ Existant | Vue IDEC opérationnelle |

### Ce qui est à développer

| Composant | Effort estimé | Priorité |
|---|---|---|
| Workflow de statuts dossier (pending → validated) | Moyen | P0 |
| Bouton "Valider le dossier" + déclencheur | Moyen | P0 |
| Interface de réassignation des MTs par l'IDEC | Moyen | P0 |
| **Portail Care Manager dédié** | **Significatif** | **P0** |
| Fiche de contexte sanitisée (auto-générée) | Léger | P1 |
| Système d'alertes Care Manager → IDEC | Léger | P1 |
| Notifications de clôture | Léger | P2 |

### Architecture retenue : Portail Care Manager dédié

```
┌──────────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│   App My Monka   │────▶│     Base HDS         │◀────│   CRM Lifeline   │
│   (utilisateur)  │     │   (données santé)    │     │   (vue IDEC)     │
└──────────────────┘     └──────────┬───────────┘     └──────────────────┘
                                    │
                          API filtrée par rôle
                          (cloisonnement données)
                                    │
                          ┌─────────▼──────────┐
                          │  Portail Care      │
                          │  Manager Klésia    │
                          │  (vue restreinte)  │
                          └────────────────────┘
```

**Pourquoi un portail dédié plutôt qu'un accès CRM avec rôle restreint :**

1. **RGPD par design** — Les données médicales ne transitent physiquement jamais vers l'interface Care Manager. Ce n'est pas un filtre d'affichage, c'est un cloisonnement au niveau de l'API.
2. **Responsabilité claire** — L'hébergement HDS de Monka reste le seul point de stockage des données de santé. Le portail Care Manager ne fait que consommer une API filtrée.
3. **Scalabilité** — Si demain un autre partenaire (mutuelle, CARSAT, etc.) veut le même type d'accès, on duplique le portail avec un nouveau rôle. L'architecture est prête.
4. **Indépendance** — Aucune dépendance sur les outils internes de Klésia. Le portail est une webapp légère accessible via navigateur.

---

## 6. Pourquoi ce flux est le bon pour Monka

### Pour l'IDEC — Décharge massive et ciblée

Avec **82% des MTs médico-sociales**, l'IDEC peut déléguer plus de 4 tâches sur 5 aux Care Managers. Elle se concentre sur :
- Le suivi médecin traitant (31 MTs)
- La coordination spécialistes (gériatre, psychiatre, etc.)
- La supervision clinique globale

### Pour les Care Managers — Un périmètre clair et valorisant

Les Care Managers reçoivent des MTs concrètes, actionnables, dans leur domaine de compétence :
- Accompagnement aidants (127 MTs)
- Mise en relation CPAM, MDPH, CCAS
- Coordination services à domicile, accueil de jour, répit

### Pour le bénéficiaire — Un accompagnement complet

Le bénéficiaire est suivi sur les deux tableaux sans couture :
- Côté médical : l'IDEC pilote
- Côté médico-social : le Care Manager accompagne
- Les deux communiquent via le système d'alertes

### Pour Monka — Un modèle reproductible

Ce flux n'est pas spécifique à Klésia. C'est un **modèle de partenariat** que Monka peut déployer avec tout acteur médico-social :

| Partenaire potentiel | Domaine délégué | Même flux |
|---|---|---|
| **Klésia** (expérimentation) | Médico-social complet | ✅ |
| Mutuelles | Prévention, accès soins | ✅ |
| CARSAT | Retraite, aménagement | ✅ |
| Associations (France Alzheimer, etc.) | Soutien aidants | ✅ |
| CCAS / CLIC | Aide sociale locale | ✅ |

Le moteur clinique fait le travail de segmentation. L'IDEC valide. Le partenaire exécute. Le modèle est le même à chaque fois.

---

## 7. Résumé exécutif

> **Règle de dispatch** : Chaque micro-tâche est tagée `medical` ou `medico_social` par le moteur clinique. L'IDEC revoit et valide les assignations. Les MTs médico-sociales validées sont ouvertes aux Care Managers Klésia via un portail dédié. L'IDEC garde la main sur le médical et la supervision globale.

> **Données clés** : 369 MTs en base, 82% médico-sociales. Le champ `domaine` et le champ `acteur` existent déjà. Le dispatch est prêt à être industrialisé.

> **Impact IDEC** : Réduction potentielle de 82% de la charge de travail sur les tâches médico-sociales, permettant un recentrage sur le suivi médical pur.

> **Architecture** : Portail Care Manager dédié, cloisonné par design (RGPD), scalable à d'autres partenaires.

---

## ⚠️ Note sur les données

> [!IMPORTANT]
> L'ensemble des données présentées dans ce document (répartition acteurs, domaines, micro-tâches) est **en cours de validation clinique**. Les chiffres et répartitions sont fournis à titre d'**overview** pour illustrer le mécanisme de dispatch et son potentiel. Ils ne doivent pas être considérés au détail de chaque répartition individuelle — le travail de validation fine est en cours avec l'équipe clinique et pourra faire évoluer certains ratios à la marge sans remettre en cause l'architecture globale.
