# 🩺 Guide de Validation — Dr. Monka

> **Objectif** : Ce document est votre **feuille de route** pour valider le KERNEL Monka.
> Tout est construit et fonctionnel. Votre rôle est de **vérifier, ajuster et signer** chaque étape.
> L'app est utilisable dès maintenant sur la base actuelle — vos validations affineront les données.

---

## Comment utiliser ce guide

1. **Chaque étape est indépendante** — vous pouvez les faire dans l'ordre ou sauter à ce qui vous semble prioritaire
2. **Le moteur fonctionne** — vous pouvez tester chaque changement en live dans le simulateur
3. **Les décisions ont été prises** — elles sont documentées avec le raisonnement. Votre rôle est de confirmer, modifier ou annuler
4. **Marquage** : `✅` = validé, `❌` = à modifier, `📝` = commentaire

---

## Étape 1 — Confirmer les barèmes de scoring (PRIORITÉ 🔴)

> **Pourquoi c'est prioritaire** : Le scoring est le cœur du moteur. Chaque question a un barème (réponse → score) extrait de votre document legacy "Typologie, CCC et Scoring".

### Ce qu'on a fait

Les 38 questions scorantes ont été extraites de votre document Word original et structurées en barèmes détaillés dans les templates E_scoring.md (V1→V5).

### Fichiers à lire

| Fichier | Contenu | Temps estimé |
|---|---|---|
| [`V1/E_scoring.md`](KERNEL/V1_social_relationnel/E_scoring.md) | 8 questions, max 15 (E4 n'a que 2 niveaux) | 5 min |
| [`V2/E_scoring.md`](KERNEL/V2_administrative/E_scoring.md) | 11 questions, max 22 (O26 binaire) | 5 min |
| [`V3/E_scoring.md`](KERNEL/V3_sante_aidant/E_scoring.md) | 10 questions, max 20 (E9 binaire) | 5 min |
| [`V4/E_scoring.md`](KERNEL/V4_fragilite_proche/E_scoring.md) | 6 questions, max 12 | 5 min |
| [`V5/E_scoring.md`](KERNEL/V5_parcours_medical/E_scoring.md) | 3 questions, max 6 (E69/E70 ont 4 options) | 3 min |
| [`E_GLOBAL_scoring.md`](KERNEL/E_GLOBAL_scoring.md) | Vue d'ensemble + seuils globaux + profil radar | 5 min |

### Décisions à valider

| # | Décision prise | Raisonnement | Votre action |
|---|---|---|---|
| 1 | **38 questions scorantes** (pas 55) | On garde les 38 validées par le legacy. Les 17 "toutes état" sont une extension non testée cliniquement. | ✅ Confirmer / ❌ Passer à 55 |
| 2 | **4 niveaux de seuils** (🟢🟡🟠🔴) au lieu de 3 | Plus de granularité pour détecter les situations précoces. Le 🟡 "Modéré" n'existait pas dans le legacy. | ✅ Garder 4 / ❌ Revenir à 3 |
| 3 | **E64/E65 non-scorantes** (V5) | Concernent les enfants (inclusion scolaire, AESH). Les inclure changerait le profil V5 (max 6→10). | ✅ Garder / ❌ Les rendre scorantes |
| 4 | **E35/O24 non-scorantes** (V4) | Étiquetées "scorante" dans la classification mais absentes du barème legacy. | ✅ Garder / ❌ Les rendre scorantes |
| 5 | **V2 pèse 29% du scoring** | V2 a le plus de questions scorantes (11/38). Est-ce proportionné au risque clinique ? | ✅ OK / 📝 Rééquilibrer |

---

## Étape 2 — Valider les règles d'activation (PRIORITÉ 🔴)

> **Pourquoi** : Les règles d'activation déterminent quels Micro-Parcours se déclenchent. C'est le mécanisme central du moteur.

### Fichiers à lire

| Fichier | Contenu | Temps estimé |
|---|---|---|
| [`V1/A_activation.md`](KERNEL/V1_social_relationnel/A_activation.md) | Règles R1→R4 | 5 min |
| [`V2/A_activation.md`](KERNEL/V2_administrative/A_activation.md) | Règles F1→F6 | 5 min |
| [`V3/A_activation.md`](KERNEL/V3_sante_aidant/A_activation.md) | Règles S1→S4 | 5 min |
| [`V4/A_activation.md`](KERNEL/V4_fragilite_proche/A_activation.md) | Règles M1→M6 | 5 min |
| [`V5/A_activation.md`](KERNEL/V5_parcours_medical/A_activation.md) | Règles A1→A4 | 5 min |

### Décisions à valider

| # | Décision prise | Raisonnement | Votre action |
|---|---|---|---|
| 1 | **F6, M6, A4 — règles proposées par IA** | Ces 3 MPs n'avaient pas de règle d'activation dans le legacy. L'IA a proposé des règles basées sur les questions disponibles. | ✅ Valider / 📝 Modifier |

---

## Étape 3 — Valider les recommandations regroupées (PRIORITÉ 🟠)

> **Pourquoi** : Les 707 recommandations legacy ont été réduites à 103 regroupées. C'est le contenu que l'utilisateur verra.

### Fichiers à lire

| Fichier | Contenu | Temps estimé |
|---|---|---|
| [`recos_regroupees_par_mp.md`](LIVRABLES/recos_regroupees_par_mp.md) | 103 recos structurées par MP | 15 min |
| [`risques_regroupements_phase3.md`](LIVRABLES/Audit/risques_regroupements_phase3.md) | 20 cas à risque (9 🔴 + 11 🟡) | 10 min |

### Décisions à valider

Pour les 20 cas à risque, annotez :
- `✅` → Garder le regroupement tel quel
- `❌` → Séparer en recos distinctes
- `📝` → Reformuler le titre

---

## Étape 4 — Valider les micro-tâches et ASR (PRIORITÉ 🟡)

> **Pourquoi** : Les 299 micro-tâches sont rattachées aux recos. Vérifier que les libellés et types sont corrects.

### Fichiers à lire

| Fichier | Contenu | Temps estimé |
|---|---|---|
| [`V1/C_master_mt_asr.md`](KERNEL/V1_social_relationnel/C_master_mt_asr.md) | MTs V1 + ASR | 5 min |
| [`V2/C_master_mt_asr.md`](KERNEL/V2_administrative/C_master_mt_asr.md) | MTs V2 + ASR | 5 min |
| [`V3/C_master_mt_asr.md`](KERNEL/V3_sante_aidant/C_master_mt_asr.md) | MTs V3 + ASR | 5 min |
| [`V4/C_master_mt_asr.md`](KERNEL/V4_fragilite_proche/C_master_mt_asr.md) | MTs V4 + ASR (la plus massive) | 10 min |
| [`V5/C_master_mt_asr.md`](KERNEL/V5_parcours_medical/C_master_mt_asr.md) | MTs V5 + ASR | 5 min |

### Décisions à valider

| # | Décision prise | Raisonnement | Votre action |
|---|---|---|---|
| 1 | **Acteurs proposés par IA** 🤖 | Chaque MT a un acteur assigné (aidant, IDEC, assistante sociale...). Vérifier la cohérence. | ✅ / 📝 par MT |
| 2 | **Domaines proposés par IA** 🤖 | Chaque MT a un domaine (social, médical, psycho, admin...). | ✅ / 📝 par MT |

---

## Étape 5 — Calibrer le scoring sur des profils réels (PRIORITÉ 🟢)

> **Pourquoi** : Les seuils sont théoriques. Il faut les confronter à des profils réels pour vérifier qu'ils font sens cliniquement.

### Actions

1. **Tester sur 10 profils réels** — Utiliser le simulateur avec les 10 premiers aidants Monka
2. **Vérifier que les niveaux** 🟢🟡🟠🔴 correspondent à votre appréciation clinique
3. **Ajuster les seuils** si nécessaire (les bornes sont modifiables dans chaque E_scoring.md)
4. **Valider le profil radar** à 5 axes — est-ce lisible et utile ?

---

## Étape 6 — Questions de suivi (PRIORITÉ 🟢)

### Fichiers à lire

| Fichier | Contenu |
|---|---|
| [`V1/D_suivi.md`](KERNEL/V1_social_relationnel/D_suivi.md) | Questions N3 suivi V1 |
| [`V2/D_suivi.md`](KERNEL/V2_administrative/D_suivi.md) | Questions N3 suivi V2 |
| [`V3/D_suivi.md`](KERNEL/V3_sante_aidant/D_suivi.md) | Questions N3 suivi V3 |
| [`V4/D_suivi.md`](KERNEL/V4_fragilite_proche/D_suivi.md) | Questions N3 suivi V4 |
| [`V5/D_suivi.md`](KERNEL/V5_parcours_medical/D_suivi.md) | Questions N3 suivi V5 |

---

## Étape 7 — Valider les CCC et Triggers (PRIORITÉ 🟢)

> ✅ **Déjà validé le 11/02** — les 3 combos CCC (1, 2, 4) et les règles F6, M6, A4 ont été validées.

### Fichier de référence

| Fichier | Contenu |
|---|---|
| [`TRIGGERS_ET_PERSONAS.md`](KERNEL/TRIGGERS_ET_PERSONAS.md) | 15 triggers + 10 personas + logique de déclenchement |

---

## Documents de référence (lecture optionnelle)

> Ces documents ne nécessitent pas de validation mais fournissent le contexte et le raisonnement.

| Fichier | Contenu | Quand le lire |
|---|---|---|
| [`RECAP_FONDATION_MONKA.md`](KERNEL/RECAP_FONDATION_MONKA.md) | 13 règles K1→K13, source de vérité | Pour comprendre l'architecture |
| [`RAISONNEMENT_ENRICHISSEMENT_IA.md`](KERNEL/RAISONNEMENT_ENRICHISSEMENT_IA.md) | Pourquoi l'IA a proposé certains éléments | Si vous questionnez une décision IA |
| [`reflexion_methodologie_scoring.md`](LIVRABLES/Audit/reflexion_methodologie_scoring.md) | Analyse détaillée : 38 vs 55 questions | Si vous hésitez sur les questions scorantes |
| [`scoring_vs_legacy_vs_toutes_etat.md`](LIVRABLES/Audit/scoring_vs_legacy_vs_toutes_etat.md) | Comparaison côte à côte | Pour comprendre l'impact du changement |
| [`reflexion_ccc_inter_vulnerabilites.md`](LIVRABLES/Audit/reflexion_ccc_inter_vulnerabilites.md) | Analyse des CCC cross-V | Si vous voulez revoir les CCC |
| [`UNDERSTANDING.md`](KERNEL/UNDERSTANDING.md) | Glossaire et définitions | Pour clarifier un terme |
| [`ONBOARDING_KERNEL.html`](KERNEL/ONBOARDING_KERNEL.html) | Visite guidée interactive du KERNEL | Pour une vue d'ensemble visuelle |

---

## Résumé des décisions IA prises

> 🤖 **Toutes les décisions ci-dessous sont réversibles.** L'app fonctionne avec ces choix. Vous validez ou ajustez au fil de votre relecture.

| # | Décision | Pourquoi | Réversible |
|---|---|---|---|
| 1 | 38 questions scorantes (pas 55) | Stabilité — les 38 sont validées par le legacy | ✅ |
| 2 | 4 niveaux de seuils (au lieu de 3) | Granularité — le 🟡 détecte les situations précoces | ✅ |
| 3 | E64/E65 non-scorantes (V5) | Ciblent les enfants, changent le profil V5 | ✅ |
| 4 | E35/O24 non-scorantes (V4) | Absentes du barème legacy malgré l'étiquette | ✅ |
| 5 | O27/O28/O30/O31 reclassées `état` | Mesures évolutives, déjà scorantes | ✅ |
| 6 | Barèmes = 100% legacy | Zero invention — fidélité au doc Dr. Rimaud | — |
| 7 | F6/M6/A4 — règles d'activation IA | Pas de règle legacy pour ces 3 MPs | ✅ |
| 8 | 103 recos regroupées (vs 707 brutes) | Dédoublonnage + regroupement par question | ✅ |

---

> **Rappel** : L'app fonctionne dès maintenant. Chaque validation que vous faites **affine les données** sans tout casser. Testez, validez, ajustez — dans l'ordre qui vous convient.
