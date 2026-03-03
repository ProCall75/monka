# 📖 Glossaire — Monka Clinical Engine

> Termes métier et techniques utilisés dans le moteur clinique Monka.
> À jour au 22/02/2026.

---

## Termes Cliniques

| Terme | Abréviation | Définition |
|-------|:-----------:|-----------|
| **Vulnérabilité** | V | Dimension de risque évaluée. 5 au total : V1 (Répercussions), V2 (Droits/Admin), V3 (Santé aidant), V4 (Fragilités proche), V5 (Parcours médical) |
| **Micro-Parcours** | MP | Sous-ensemble thématique d'une vulnérabilité. 24 au total. Chaque MP a un objectif clinique et 2 signatures ASR (A et B) |
| **Micro-Tâche** | MT | Action concrète à réaliser par un acteur identifié. 390 au total. Typée : STRUC, SEC, INFO, ORGA |
| **Action de Sortie Recommandée** | ASR | Résultat attendu d'un MP. Deux signatures possibles (A ou B) décrivant les trajectoires de résolution |
| **Combinaison de Criticité Clinique** | CCC | Combinaison de plusieurs signaux faibles qui, ensemble, constituent un signal fort. Niveau intermédiaire entre standard et critique |
| **Sens clinique** | — | Explication médicale justifiant pourquoi une règle d'activation est pertinente. Rédigé par le Dr. Monka |
| **Recommandation** | Reco | Action recommandée, déclinée en deux wordings : utilisateur (empathique) et IDEC (professionnel) |
| **Aidance** | — | Situation dans laquelle une personne aide un proche en perte d'autonomie (maladie, handicap, vieillissement) |
| **Scoring** | — | Score pondéré par V, calculé en additionnant (réponses × coefficients). Seuils : faible, modéré, élevé, critique |
| **Trigger** | — | Question de profiling (ex: N3, O1) qui active des blocs de questions conditionnels selon le profil de l'aidant |
| **Catégorie** | CAT | Unité d'activation au sein d'un MP. Une catégorie est activée quand au moins une de ses règles fire. 75 au total |
| **Règle d'activation** | — | Règle composée de conditions AND sur les réponses. Si toutes les conditions sont vraies, la règle fire et active sa catégorie. 240 au total |
| **Niveau** | — | Gravité d'une activation : `prev` (prévention), `standard` (alerte modérée), `ccc` (combinaison critique), `critique` (urgence) |
| **Délai** | — | Nombre de jours recommandés pour agir après activation d'une catégorie (delai_jours) |
| **Guide** | — | Procédure concrète liée à des MTs, avec étapes, contacts et documents. 42 guides (Tier 1-3) |
| **Overlay** | — | Couche modifiant le questionnaire selon un profil (ex : overlay Enfant, overlay Handicap) |
| **Cross-V CCC** | — | CCC combinant des questions de vulnérabilités différentes (ex : V1×V3). 8 proposées, non implémentées |

---

## Termes Acteurs

| Terme | Définition |
|-------|-----------|
| **IDEC** | Infirmier·ère Diplômé·e d'État Coordinateur·rice. Professionnel de santé coordinant le parcours d'un aidant |
| **AS** | Assistant·e Social·e. Intervient sur les aspects administratifs et droits |
| **MT (Médecin Traitant)** | Médecin référent de l'aidant ou du proche |
| **SAD** | Service d'Aide à Domicile |
| **SSIAD** | Service de Soins Infirmiers À Domicile |
| **ESA** | Équipe Spécialisée Alzheimer |
| **MAIA** | Méthode d'Action pour l'Intégration des services d'aide et de soins dans le champ de l'Autonomie |
| **GIR** | Groupe Iso-Ressources. Grille d'évaluation de la dépendance (GIR 1 = dépendance totale → GIR 6 = autonome) |
| **APA** | Allocation Personnalisée d'Autonomie |

---

## Termes Techniques

| Terme | Définition |
|-------|-----------|
| **condition_logic** | Champ JSONB dans `activation_rules`. Contient un tableau de conditions (AND) avec opérateurs : eq, neq, ne, in, nin, gte, contains, count_gte, has_any |
| **MonkaData** | Type TypeScript regroupant les 15 tables Supabase en un seul objet. Fetchée une fois, cachée en singleton |
| **EngineOutput** | Résultat du moteur : catégories activées, MPs activés, scores V1-V5 |
| **Persona** | Profil fictif avec réponses pré-remplies aux 165 questions, utilisé pour tester le moteur |
| **Wording utilisateur** | Texte destiné au patient/aidant, ton empathique |
| **Wording IDEC** | Texte destiné au professionnel de santé, ton clinique |
| **CR Médecin** | Compte-Rendu médical structuré, exportable en PDF |
| **Quality Gate** | Point de vérification obligatoire après chaque bloc, vérifiant la conformité au PRAGMA Framework |
| **Design System** | Ensemble de composants UI réutilisables avec variables CSS centralisées, assurant cohérence visuelle |
| **Barrel export** | Fichier `index.ts` qui ré-exporte tous les modules publics d'un répertoire pour simplifier les imports |

---

## Nomenclature des IDs

| Pattern | Exemple | Signification |
|---------|---------|--------------|
| `V{N}` | V1, V3 | Vulnérabilité N |
| `{V}_{MP}` | R1, A3, S2, F4, M1 | Micro-Parcours (lettre = thème de la V) |
| `CAT_{MP}_{NN}` | CAT_R1_01 | Catégorie NN du MP |
| `V{N}_{MP}_{NIV}_{NN}` | V1_R1_CCC_01 | Règle d'activation : V, MP, niveau, numéro |
| `MT_{MP}_{CAT}_{NN}` | MT_S1_02_01 | Micro-Tâche : MP, catégorie, numéro |
| `{Lettre}{N}` | E7, N3, O1 | Question (lettre = bloc questionnaire) |
| `GUIDE_{NOM}` | GUIDE_APA, GUIDE_MINI_TELEALARME | Guide d'action |
| `CCC_XV_{NN}` | CCC_XV_01 | CCC cross-V (proposée) |

---

*Référence : [PRD](prd.md) — [Architecture](architecture.md) — [Architecture DB](../FINAL/ARCHITECTURE_DB.md) — [SPRINT.md](../SPRINT.md)*
