# 🔄 MONKA KERNEL — Évolutions Post-Fondation

> **Date** : 12/02/2026  
> **Réf.** : Suite de [`RECAP_FONDATION_MONKA.md`](RECAP_FONDATION_MONKA.md) (v4 FINALE — 07/02/2026)  
> **Couvre** : Période 07/02 → 12/02/2026  
> **Objectif** : Documenter toutes les décisions, actions et points en suspens depuis le KERNEL v4

---

## 1. DÉCISIONS VALIDÉES PAR DR. MONKA

> Ces décisions ont été actées par mail entre le 06/02 et le 10/02/2026.

### 1.1 — Référentiel Questions

| # | Décision | Détail | Source | Date |
|---|----------|--------|--------|------|
| D1 | **15 triggers modifiés** | Les questions triggers ont été mises à jour et retirées du questionnaire principal. Liste fermée : N3, O35, O36, N1, O64, O46, O14, O1, O63, O49, N26, E71, E72, O2, N31 | Mail Dr. Monka 06/02 | 06/02 |
| D2 | **150 questions état/facteur** | 3 triggers (O2, N31, O49) retirés du questionnaire d'évaluation. On reste sur **150 questions + 15 triggers = 165 éléments** | Mail Dr. Monka 09/02 | 09/02 |
| D3 | **Colonne aidance retirée** | Toutes les questions s'appliquent à toutes les catégories d'aidance. La colonne "aidance" dans le tableau Excel est supprimée | Mail Dr. Monka 09/02 | 09/02 |
| D4 | **4 questions non cohérentes corrigées** | Dr. Monka a identifié et corrigé 4 questions dont la classification état/facteur n'était pas cohérente. Tableur Excel mis à jour en conséquence | Mail Dr. Monka 09/02→10/02 | 10/02 |

### 1.2 — Architecture & Activation

| # | Décision | Détail | Source | Date |
|---|----------|--------|--------|------|
| D5 | **4 questions CCC** | Dr. Monka a acquiescé par téléphone ("C'est ok pour moi pour les 4 questions"). ⚠️ Validation formelle à confirmer en session | Appel tél. Dr. Monka ~10/02 | 10/02 |
| D6 | **Architecture recos par MP** | Le modèle où les recommandations sont rattachées aux Micro-Parcours (et non aux questions individuelles) a été reçu et validé | Mail échange 10/02 | 10/02 |

---

## 2. ACTIONS RÉALISÉES (07/02 → 12/02)

### 2.1 — Ingestion Supabase

Toutes les données ont été ingérées dans une base Supabase (source de vérité intermédiaire).

| Table | Rows | Source | Description |
|-------|------|--------|-------------|
| `questions` | 165 | Excel questionnaire validé | 150 questions + 15 triggers |
| `vulnerabilities` | 5 | Architecture globale | V1=Social, V2=Administrative, V3=Santé, V4=Fragilité, V5=Parcours médical |
| `micro_parcours` | 24 | Word micro-parcours | R1-R4, A1-A4, S1-S4, F1-F6, M1-M6 |
| `question_mp_mapping` | — | Analyse croisée | Liens questions↔MP |
| `activation_rules` | 68 | Word priorisation + propositions | 12 critiques + 28 CCC + 28 standard |
| `recommendations` | 103 | CAT Excel regroupé | Recos dédoublonnées par MP |
| `micro_taches` | 299 | Word typologie + Excel | MTs typées (STRUC/SEC/MED/INFO/ORGA) |
| `scoring_questions` | 38 | Word scoring + validation | Questions scorantes par V |
| `scoring_thresholds` | 20 | Propositions IA 🤖 | 4 seuils × 5 V |
| `suivi_questions` | 30 | Legacy suivi | Questions de suivi N1-N3 |

### 2.2 — Regroupement & Optimisation des Recommandations

Le travail clé de cette période : transformer les 707 lignes de recos legacy (brutes, dupliquées, liées aux questions) en 103 recos structurées par MP.

| Métrique | Avant (Legacy brut) | Après (KERNEL structuré) | Variation |
|----------|---------------------|--------------------------|-----------|
| **Recommandations** | 707 lignes (dont beaucoup identiques) | 103 recos uniques par MP | **-86%** |
| **Micro-Tâches** | 299 non rattachées à des recos | 299 rattachées à 103 recos (0 orpheline) | **100% rattachées** |
| **Couverture MP** | Recos liées aux questions | 24/24 MP couverts | **100%** |

> 📄 Documentation complète : [`LIVRABLES/recos_regroupees_par_mp.md`](../LIVRABLES/recos_regroupees_par_mp.md)  
> ⚠️ Risques identifiés : [`LIVRABLES/Audit/risques_regroupements_phase3.md`](../LIVRABLES/Audit/risques_regroupements_phase3.md) — 20 cas douteux (9 🔴 + 11 🟡)

### 2.3 — Enrichissements IA (621 propositions)

L'IA a enrichi la base avec des propositions documentées et traçables (marquées 🤖) :

| Enrichissement | Volume | Statut | Documentation |
|----------------|--------|--------|---------------|
| **Domaine** (🏥 médical / 🤝 médico-social) | 299 MTs classifiées | 🤖 À valider | 88 médical (29%) + 211 médico-social (71%) |
| **Acteur** assigné par MT | 299 MTs | 🤖 À valider | IDEC 63%, Aidant 17%, MT 9%, Pro santé 6%, Psy 2%, Spécialiste 2% |
| **Seuils scoring** (🟢🟡🟠🔴) | 20 seuils (4 × 5 V) | 🤖 À calibrer | Division proportionnelle ~25% par plage |
| **Wording IDEC** manquant | 3 recos | 🤖 À valider | R1_RECO_02, S1_RECO_04, A4_RECO_01 |

> 📄 Raisonnement complet : [`RAISONNEMENT_ENRICHISSEMENT_IA.md`](RAISONNEMENT_ENRICHISSEMENT_IA.md)

### 2.4 — Production des 25 Templates

Tous les templates KERNEL ont été produits (5 vulnérabilités × 5 templates A→E) :

| V | A (Activation) | B (Recos) | C (MT & ASR) | D (Suivi) | E (Scoring) |
|---|:-:|:-:|:-:|:-:|:-:|
| **V1** Social & Relationnel | ✅ 177 lig. | ✅ 265 lig. | ✅ 177 lig. | ✅ 124 lig. | ✅ 139 lig. |
| **V2** Administrative | ✅ 145 lig. | ✅ 100 lig. | ✅ 121 lig. | ✅ 63 lig. | ✅ 152 lig. |
| **V3** Santé physique & psychologique | ✅ 170 lig. | ✅ 117 lig. | ✅ 172 lig. | ✅ 135 lig. | ✅ 154 lig. |
| **V4** Fragilité du proche | ✅ 218 lig. | ✅ 126 lig. | ✅ 306 lig. | ✅ 174 lig. | ✅ 124 lig. |
| **V5** Parcours médical du proche | ✅ 147 lig. | ✅ 90 lig. | ✅ 134 lig. | ✅ 127 lig. | ✅ 100 lig. |

**+ Transversaux** :
- ✅ `E_GLOBAL_scoring.md` — Scoring global inter-vulnérabilités
- ✅ `TRIGGERS_ET_PERSONAS.md` — 15 triggers + 10 personas (5 aidants A1-A5 + 5 aidés P1-P5)

> ⚠️ **Aucun template n'a encore été validé cliniquement par Dr. Monka.** Tous contiennent des éléments Legacy ✅ et des propositions IA 🤖 à trier.

### 2.5 — Simulateur React/Vite

Un simulateur interactif connecté à Supabase a été développé dans `APP/` :
- Questionnaire interactif 165 questions
- Moteur d'activation temps réel
- Affichage recos, MTs, scoring, CCC
- Vue interne (6 onglets) + Vue externe (parcours utilisateur)
- Sélection V1→V5 + ALL
- Personas auto-fill

---

## 3. POINTS EN SUSPENS — À VALIDER PAR DR. MONKA

### 3.1 — Décisions non prises 🔴

| # | Sujet | Contexte | Action attendue |
|---|-------|----------|-----------------|
| P1 | **5 questions CCC supplémentaires** | Dr. Monka hésite sur l'ajout de 5 questions pour enrichir les CCC. "Je n'ai pas encore choisi. J'y réfléchis." | ✅ Ajouter / ❌ Ne pas ajouter |
| P2 | **Scoring : reclassifier ~15 questions** | Analyse de 38 questions scorantes legacy vs 55 si toutes les "état" deviennent scorantes. ~15 questions à reclassifier (E1, E2, N20, E43 + ~11 V2). Réflexion complète sur la méthodologie dans le doc dédié. | Choisir : legacy 38 / reclassifié 55 / mixte |
| P3 | **Pondération scoring** | +1 uniforme ou +1/+2 différencié par gravité clinique ? | Choisir le modèle |
| P4 | **Seuils scoring** | Seuils actuels = mathématiques (÷4). Faut-il des seuils cliniques basés sur l'expérience ? | Calibrer par V |

> 📄 **Réflexion scoring complète** : [`LIVRABLES/Audit/reflexion_methodologie_scoring.md`](../LIVRABLES/Audit/reflexion_methodologie_scoring.md) — 5 axes d'analyse, scénarios A→D, décision "scorante = état" à statuer

### 3.2 — Nouvelles réflexions 🟠

| # | Sujet | Contexte | Source |
|---|-------|----------|--------|
| P5 | **Recos désactivables** | "Si la reco demandée est impossible (ex: aidant unique, pas de famille mobilisable) → il faut pouvoir la désactiver." | Mail Dr. Monka 10/02 |
| P6 | **Fiches identité par question** | "L'objectif c'est d'avoir une fiche identité pour chaque question" — ID, V, MP, scoring, classification, etc. | Mail Dr. Monka 09/02 |
| P7 | **Améliorations KERNEL à intégrer** (listées par Dr. Monka) | cf. détail ci-dessous | Mail 09/02 |

**Détail P7 — Améliorations KERNEL demandées par Dr. Monka** :
1. Glossaire des acronymes (présent sur le Wimi)
2. Nombre de questions par vulnérabilité, par type d'aidance = doc sur la ventilation des questions
3. ~~Explications sur le type de micro-tâche avec séparation médical et médico-social~~ ✅ **FAIT** — classifié dans les enrichissements IA (88 médical / 211 médico-social), à valider par Dr. Monka
4. ~~Mise à jour des 96 recommandations (4 recos × 24 MP)~~ ❌ **MODÈLE CADUC** — le modèle 4 recos × 24 MP (= 96 recos avec criticité différenciée) s'est avéré trop restrictif cliniquement. On reste sur les **103 recos regroupées** actuelles, qui permettent plus de flexibilité par MP
5. Quelles MT nécessitent une prescription (MT MED plus descriptives)

### 3.3 — Anomalies identifiées dans les templates 🟡

| # | Anomalie | Fichier | Question pour Dr. Monka |
|---|----------|---------|------------------------|
| A1 | **V4 M6** — aucune règle d'activation | V4 A_activation.md | Comment assigner les 6 recos de M6 ? |
| A2 | **V5 A2/A3** — aucune MT rattachée | V5 C_master_mt_asr.md | Faut-il créer des MTs pour ces MPs ? |
| A3 | **V5 A4 / V3 S4** — que des MTs INFO/ORGA (non-contributives) | V5/V3 C_master_mt_asr.md | L'ASR peut-elle être validée autrement (K11) ? |
| A4 | **V5 E64/E65** — classées « état » mais non scorantes | V5 E_scoring.md | Doivent-elles devenir scorantes ? |
| A5 | **E21 partagée** (V3 + V5) | E_GLOBAL | Le score compte-t-il 2 fois ? |
| A6 | **V2 poids 29%** du score global | E_GLOBAL | Pondération justifiée ou à rééquilibrer ? |
| A7 | **5 questions multi-MP** | E21, O51, O53, O54, E46 | Lien 1:1 ou 1:N (question → plusieurs MP) ? |
| A8 | **5 questions mentionnant "enfant"** | E38, E59, E60, E64, E65 | Faut-il filtrer par profil d'aidant via triggers ? |
| A9 | **3 MPs sans règle legacy** | F6, M6, A4 — propositions IA | Valider les règles proposées 🤖 |

### 3.4 — Validations en attente 🟢

| # | Document à valider | Contenu | Statut envoi |
|---|-------------------|---------|-------------|
| V1 | `LIVRABLES/recos_regroupees_par_mp.md` | 103 recos structurées par MP | ✅ Envoyé |
| V2 | `LIVRABLES/Audit/risques_regroupements_phase3.md` | 20 cas douteux (9 🔴 + 11 🟡) | ✅ Envoyé |
| V3 | `LIVRABLES/Audit/scoring_vs_legacy_vs_toutes_etat.md` | Comparaison scoring + 6 décisions | ❌ Pas encore envoyé |
| V4 | `LIVRABLES/Audit/reflexion_methodologie_scoring.md` | Raisonnement scoring (5 axes) | ❌ Pas encore envoyé |
| V5 | 25 templates V1-V5 A→E | Validation clinique complète | ❌ Pas encore validé |

---

## 4. DELTA AVEC LE KERNEL v4

> Ce qui a **changé** dans les règles et données depuis le `RECAP_FONDATION_MONKA.md` v4 du 07/02.

### 4.1 — Les 13 règles K1→K13

| Règle | Statut | Commentaire |
|-------|--------|-------------|
| K1→K4 (Activation) | ✅ **Inchangé** | Le modèle d'activation est intact |
| K5→K8 (Recos & MT) | ✅ **Inchangé** | Le modèle reco-enveloppe + MT est intact |
| K9→K12 (ASR) | ✅ **Inchangé** | ASR = 100% contributives, pas de seuil partiel |
| K13 (Scoring) | ✅ **Inchangé** | Scoring ≠ Activation (indépendants) |

> **Les 13 règles sont toujours valides.** Aucune n'a été modifiée ou invalidée par les décisions post-fondation.

### 4.2 — Données qui ont évolué

| Élément | Au 07/02 (KERNEL v4) | Au 12/02 (maintenant) | Changement |
|---------|----------------------|-----------------------|------------|
| Questions triggers | "15 triggers" (conceptuel) | 15 triggers identifiés et documentés (IDs connus) | ✅ Confirmé et fixé |
| Questionnaire | "150 + 15" | 150 + 15 = 165 ✅ 4 questions corrigées | ✅ Corrigé |
| Recommandations | "~300 dans le legacy" | 103 regroupées par MP (707→103) | 📐 Optimisé |
| Micro-Tâches | "299 non rattachées" | 299 rattachées à 103 recos (0 orpheline) | 📐 Optimisé |
| Acteurs MT | Non assignés | 299 MTs avec acteur IA 🤖 | 🤖 Nouveau |
| Domaines MT | Non assignés | 299 MTs avec domaine IA 🤖 | 🤖 Nouveau |
| Scoring seuils | Proposés dans la fondation | 20 seuils IA en base | 🤖 Nouveau |
| Règles d'activation | "68 règles" (conceptuel) | 68 règles en base avec condition_logic | ✅ Matérialisé |
| Templates | "5 templates A→E définis" | 25 fichiers produits (V1-V5 × A-E) | ✅ Produit |

### 4.3 — Nouvelles questions soulevées (hors scope fondation)

Ces sujets n'existaient pas au moment du KERNEL v4 :

1. **Recos désactivables par contexte** → nouveau concept fonctionnel
2. ~~**Fiches identité par question**~~ ✅ **FAIT** — implémenté dans l'onglet "Questions" de l'app (fiche complète par question avec ID, V, MP, scoring, classification)
3. ~~**Séparation médical/médico-social**~~ ✅ **FAIT** — 299 MTs classifiées (88 🏥 / 211 🤝), à valider par Dr. Monka
4. **Quelles MT nécessitent une prescription** → granularité clinique supplémentaire, à traiter
5. ~~**96 recos (4 × 24 MP)**~~ ❌ **MODÈLE CADUC** — trop restrictif cliniquement, on conserve les 103 recos actuelles

---

## 5. ARBORESCENCE DES DOCS ACTUELS

```
KERNEL/
├── RECAP_FONDATION_MONKA.md          ← Source de vérité v4 (13 K-rules)
├── RECAP_EVOLUTIONS_POST_KERNEL.md   ← CE DOCUMENT (delta post-fondation)
├── UNDERSTANDING.md                   ← Glossaire aligné KERNEL v4
├── ROADMAP_VALIDATION.md             ← Plan de validation en 4 phases
├── GUIDE_VALIDATION_DR_MONKA.md      ← Mode d'emploi (par type)
├── RAISONNEMENT_ENRICHISSEMENT_IA.md ← 621 propositions IA documentées
├── TRIGGERS_ET_PERSONAS.md           ← 15 triggers + 10 personas
├── E_GLOBAL_scoring.md               ← Scoring inter-V
├── ONBOARDING_KERNEL.html            ← Visite guidée interactive
├── V1_social_relationnel/            ← 5 templates A→E
├── V2_administrative/                ← 5 templates A→E
├── V3_sante_aidant/                  ← 5 templates A→E
├── V4_fragilite_proche/              ← 5 templates A→E
└── V5_parcours_medical/              ← 5 templates A→E

LIVRABLES/
├── recos_regroupees_par_mp.md        ← 103 recos structurées
├── Questionnaire_Monka_Complet.xlsx  ← Excel export figé
├── EXTRACTION_DB_12_02_2026.md       ← Export base Supabase
└── Audit/
    ├── rapport_coherence_etat_facteur.md
    ├── rapport_audit_153_vs_150.md
    ├── architecture_recommandations_par_mp.md
    ├── reflexion_ccc_inter_vulnerabilites.md
    ├── reflexion_methodologie_scoring.md
    ├── scoring_vs_legacy_vs_toutes_etat.md
    ├── risques_regroupements_phase3.md
    ├── audit_regroupement_recos_mt_par_mp.md
    ├── diagnostic_phase3_points_attention.md
    ├── glossaire_reco_vs_mt.md
    ├── methodologie_phase3_recos_mt.md
    └── validation_mapping_question_mp.md
```

---

## 6. PROCHAINES ÉTAPES

| # | Action | Priorité | Timing |
|---|--------|----------|--------|
| 1 | **Session de validation V par V avec Dr. Monka** | 🔴 | Prochaine visite |
| 2 | **Résoudre les points en suspens** (P1-P7) | 🔴 | Pendant la session |
| 3 | **Résoudre les anomalies** (A1-A9) | 🟠 | Pendant la session, V par V |
| 4 | **Valider les enrichissements IA** (621 propositions) | 🟠 | V par V dans les templates |
| 5 | **Finaliser le scoring** (reclassification + pondération) | 🟡 | Après validation principes |
| 6 | **Produire les fiches identité** par question | 🟡 | Après validation questionnaire |

> 📋 **Protocole de session détaillé** : voir [`SESSION_VALIDATION_V_PAR_V.md`](SESSION_VALIDATION_V_PAR_V.md) *(à produire)*
