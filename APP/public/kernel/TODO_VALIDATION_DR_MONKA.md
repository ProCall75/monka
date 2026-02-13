# 📋 TODO — Validation Dr. Monka

> **Date** : 12/02/2026  
> **Objectif** : Faire valider par Dr. Monka l'état complet du KERNEL, V par V  
> **Temps estimé** : 2-3h en session  
> **Ref principale** : [`RECAP_EVOLUTIONS_POST_KERNEL.md`](RECAP_EVOLUTIONS_POST_KERNEL.md)

---

## ✅ ANOMALIE CRITIQUE — RÉSOLUE

> [!NOTE]
> **Incohérence Nom/Données corrigée le 12/02/2026** via migrations Supabase `fix_v2_v4_v5_mp_alignment` + `fix_v2_v4_v5_remaining_tables`
> 
> Les **noms des vulnérabilités** et les **micro-parcours** sont maintenant alignés sur **8 tables** :
> 
> | V ID | Nom | MPs | Status |
> |------|-----|-----|--------|
> | V1 | Social et relationnel | R1-R4 | ✅ |
> | V2 | Administrative | A1-A4 | ✅ Corrigé |
> | V3 | Santé | S1-S4 | ✅ |
> | V4 | Fragilité du proche | F1-F6 | ✅ Corrigé |
> | V5 | Parcours médical | M1-M6 | ✅ Corrigé |
> 
> Table `asr` dédiée créée (24 ASR, 1 par MP).

---

## 📖 DOCUMENTS À LIRE AVANT LA SESSION

| # | Document | Ce qu'il contient | Où le lire |
|---|----------|-------------------|------------|
| 1 | [`RECAP_FONDATION_MONKA.md`](RECAP_FONDATION_MONKA.md) | Les 13 règles du KERNEL (K1-K13) | Relire si nécessaire |
| 2 | [`RECAP_EVOLUTIONS_POST_KERNEL.md`](RECAP_EVOLUTIONS_POST_KERNEL.md) | Tout ce qui a changé depuis le 07/02 | **Lecture obligatoire** |
| 3 | [`ONBOARDING_KERNEL.html`](ONBOARDING_KERNEL.html) | Vue interactive de tout le KERNEL (24 MPs, scoring, pipeline) | Ouvrir dans le navigateur |
| 4 | [`RAISONNEMENT_ENRICHISSEMENT_IA.md`](RAISONNEMENT_ENRICHISSEMENT_IA.md) | 621 propositions IA documentées | Référence si besoin |

---

## ✅ CHECKLIST PAR VULNÉRABILITÉ

> Pour chaque V, Dr. Monka doit vérifier les templates + l'app.
> 
> **Mode d'emploi** : Suivre dans l'ordre V1 → V5. Pour chaque V :
> 1. **Lire les 5 templates** (A→E) dans le dossier KERNEL correspondant
> 2. **Vérifier dans l'APP** (page Vulnérabilités, Questions, Simulateur)
> 3. **Valider les éléments IA** 🤖 (accepter/modifier/refuser)
> 4. **Traiter les anomalies** listées pour cette V

---

### V1 — Social & Relationnel (R1-R4, 15 questions)

**📁 Templates à lire :**
- [ ] [`V1_social_relationnel/A_activation.md`](V1_social_relationnel/A_activation.md) — Règles d'activation (13 règles)
- [ ] [`V1_social_relationnel/B_recos_variations.md`](V1_social_relationnel/B_recos_variations.md) — Recommandations (7 recos)
- [ ] [`V1_social_relationnel/C_master_mt_asr.md`](V1_social_relationnel/C_master_mt_asr.md) — Micro-tâches & ASR
- [ ] [`V1_social_relationnel/D_suivi.md`](V1_social_relationnel/D_suivi.md) — Suivi
- [ ] [`V1_social_relationnel/E_scoring.md`](V1_social_relationnel/E_scoring.md) — Scoring

**🖥️ Vérifications dans l'APP :**
- [ ] Page **Vulnérabilités** → Cliquer V1 → Comparer les MPs (R1-R4) avec le template C
- [ ] Page **Questions** → Filtrer V1 → Vérifier que les 15 questions sont bien là
- [ ] **Simulateur** → Répondre aux questions V1 → Vérifier que les bonnes recos s'activent

**🤖 Éléments IA à valider :**
- [ ] 1 wording IDEC manquant → R1_RECO_02 a un wording IA

**Anomalies à traiter :** Aucune

---

### V2 — Administrative (A1-A4, 36 questions)

**📁 Templates à lire :**
- [ ] [`V2_administrative/A_activation.md`](V2_administrative/A_activation.md) — Règles d'activation
- [ ] [`V2_administrative/B_recos_variations.md`](V2_administrative/B_recos_variations.md) — Recommandations
- [ ] [`V2_administrative/C_master_mt_asr.md`](V2_administrative/C_master_mt_asr.md) — Micro-tâches & ASR
- [ ] [`V2_administrative/D_suivi.md`](V2_administrative/D_suivi.md) — Suivi
- [ ] [`V2_administrative/E_scoring.md`](V2_administrative/E_scoring.md) — Scoring

**🖥️ Vérifications dans l'APP :**
- [ ] Page **Vulnérabilités** → Cliquer V2 → Vérifier A1-A4 (4 MPs)
- [ ] Onglet **ASR** → Vérifier les 4 signatures (A1-A → A4-A)
- [ ] Page **Questions** → Filtrer V2 → Vérifier les 36 questions
- [ ] **Simulateur** → Répondre aux questions V2 → Vérifier les recos

**🤖 Éléments IA à valider :**
- [ ] 1 wording IDEC manquant → A4_RECO_01
- [ ] Acteurs MT (IDEC 63%, Aidant 17%, etc.)
- [ ] Domaines MT (88 médical / 211 médico-social — concerne toutes les V)

**Anomalies à traiter :**
- [ ] **A2** : A2/A3 — aucune MT rattachée → Faut-il en créer ?
- [ ] **A3** : A4 — que des MTs INFO/ORGA (non-contributives) → ASR validable ?
- [ ] **A4** : E64/E65 classées « état » mais non scorantes → Doivent-elles devenir scorantes ?
- [ ] **A6** : V2 poids 29% du score global — pondération justifiée ?
- [ ] **A9** : A4 sans règle legacy — valider la règle proposée 🤖

---

### V3 — Santé de l'Aidant (S1-S4, 26 questions)

**📁 Templates à lire :**
- [ ] [`V3_sante_aidant/A_activation.md`](V3_sante_aidant/A_activation.md) — Règles d'activation (11 règles)
- [ ] [`V3_sante_aidant/B_recos_variations.md`](V3_sante_aidant/B_recos_variations.md) — Recommandations (14 recos)
- [ ] [`V3_sante_aidant/C_master_mt_asr.md`](V3_sante_aidant/C_master_mt_asr.md) — Micro-tâches & ASR
- [ ] [`V3_sante_aidant/D_suivi.md`](V3_sante_aidant/D_suivi.md) — Suivi
- [ ] [`V3_sante_aidant/E_scoring.md`](V3_sante_aidant/E_scoring.md) — Scoring

**🖥️ Vérifications dans l'APP :**
- [ ] Page **Vulnérabilités** → Cliquer V3 → Vérifier S1-S4 (4 MPs)
- [ ] Page **Questions** → Filtrer V3 → Vérifier les 26 questions
- [ ] **Simulateur** → Répondre aux questions V3 → Vérifier les recos

**🤖 Éléments IA à valider :**
- [ ] Seuils scoring V3 — propositions IA à calibrer

**Anomalies à traiter :**
- [ ] **A3** : S4 — que des MTs INFO/ORGA (non-contributives) → ASR validable ?
- [ ] **A5** : E21 partagée V3+V5 — score compte 2 fois ?

---

### V4 — Fragilité du Proche (F1-F6, 55 questions)

**📁 Templates à lire :**
- [ ] [`V4_fragilite_proche/A_activation.md`](V4_fragilite_proche/A_activation.md) — Règles d'activation (17 règles)
- [ ] [`V4_fragilite_proche/B_recos_variations.md`](V4_fragilite_proche/B_recos_variations.md) — Recommandations (33 recos)
- [ ] [`V4_fragilite_proche/C_master_mt_asr.md`](V4_fragilite_proche/C_master_mt_asr.md) — Micro-tâches & ASR
- [ ] [`V4_fragilite_proche/D_suivi.md`](V4_fragilite_proche/D_suivi.md) — Suivi
- [ ] [`V4_fragilite_proche/E_scoring.md`](V4_fragilite_proche/E_scoring.md) — Scoring

**🖥️ Vérifications dans l'APP :**
- [ ] Page **Vulnérabilités** → Cliquer V4 → Vérifier F1-F6 (6 MPs)
- [ ] Onglet **ASR** → Vérifier les 6 signatures (F1-A → F6-A)
- [ ] Page **Questions** → Filtrer V4 → Vérifier les 55 questions
- [ ] **Simulateur** → Répondre aux questions V4 → Vérifier les recos

**🤖 Éléments IA à valider :**
- [ ] Seuils scoring V4 — propositions IA à calibrer

**Anomalies à traiter :**
- [ ] **A1** : F6 (ex-M6) — aucune règle d'activation → Comment assigner les 6 recos ?
- [ ] **A7** : 5 questions multi-MP (O51, O53, O54, E46, E21) — lien 1:1 ou 1:N ?
- [ ] **A8** : 5 questions mentionnant "enfant" (E38, E59, E60, E64, E65) — filtrer par profil ?
- [ ] **A9** : F6 sans règle legacy — valider la règle proposée 🤖

---

### V5 — Parcours Médical du Proche (M1-M6, 18 questions)

**📁 Templates à lire :**
- [ ] [`V5_parcours_medical/A_activation.md`](V5_parcours_medical/A_activation.md) — Règles d'activation
- [ ] [`V5_parcours_medical/B_recos_variations.md`](V5_parcours_medical/B_recos_variations.md) — Recommandations
- [ ] [`V5_parcours_medical/C_master_mt_asr.md`](V5_parcours_medical/C_master_mt_asr.md) — Micro-tâches & ASR
- [ ] [`V5_parcours_medical/D_suivi.md`](V5_parcours_medical/D_suivi.md) — Suivi
- [ ] [`V5_parcours_medical/E_scoring.md`](V5_parcours_medical/E_scoring.md) — Scoring

**🖥️ Vérifications dans l'APP :**
- [ ] Page **Vulnérabilités** → Cliquer V5 → Vérifier M1-M6 (6 MPs)
- [ ] Onglet **ASR** → Vérifier les 6 signatures (M1-A → M6-A)
- [ ] Page **Questions** → Filtrer V5 → Vérifier les 18 questions
- [ ] **Simulateur** → Répondre aux questions V5 → Vérifier les recos

**🤖 Éléments IA à valider :**
- [ ] 1 wording IDEC manquant → S1_RECO_04

**Anomalies à traiter :**
- [ ] **A2** : M2/M3 — aucune MT rattachée → Faut-il en créer ?
- [ ] **A3** : M4 — que des MTs INFO/ORGA (non-contributives) → ASR validable ?
- [ ] **A9** : M6 sans règle legacy — valider la règle proposée 🤖

---

## 📊 QUESTIONS TRANSVERSES (après les 5 V)

> À traiter une fois que les 5 V sont validées individuellement.

### Scoring global
- [ ] Lire [`E_GLOBAL_scoring.md`](E_GLOBAL_scoring.md) — Scoring inter-vulnérabilités
- [ ] **A5** : E21 partagée V3+V5 — le score compte-t-il 2 fois ?
- [ ] **A6** : V2 poids 29% du score global — rééquilibrer ?

### Triggers & Personas
- [ ] Lire [`TRIGGERS_ET_PERSONAS.md`](TRIGGERS_ET_PERSONAS.md) — 15 triggers + 10 personas
- [ ] **A8** : 5 questions mentionnant "enfant" → filtrer selon trigger ?

### Questions multi-MP
- [ ] **A7** : 5 questions partagées (O51, O53, O54, E46, E21) → lien 1:1 ou 1:N ?

---

## 🔴 POINTS BLOQUANTS À STATUER

> Ces décisions conditionnent la suite du développement.

| # | Décision | Options | Impact |
|---|----------|---------|--------|
| P1 | 5 questions CCC supplémentaires | Ajouter / Ne pas ajouter | Enrichit les alertes critiques |
| P2 | Scoring : reclassifier ~15 questions | Legacy 38 / Reclassifié 55 / Mixte | Change la grille scoring |
| P3 | Pondération scoring | +1 uniforme / +1/+2 différencié | Sensibilité du score |
| P4 | Seuils scoring | Mathématiques (÷4) / Cliniques | Interprétation du score |
| P5 | Recos désactivables | Oui / Non | Impact UX + architecture |
| **P6** | **Signal urgence CRM (Combo 4 CCC)** | **Nouveau niveau d'alerte / Flag CRM Lifelink / Notification IDEC** | **Comment faire apparaître l'urgence max (proche dangereux + aidant épuisé) dans le système Monka** |

> 📄 Réflexion complète : [`LIVRABLES/Audit/reflexion_methodologie_scoring.md`](../LIVRABLES/Audit/reflexion_methodologie_scoring.md)

---

## 📊 DOCUMENTS DE VALIDATION COMPLETS

| # | Document | Contenu | Status |
|---|----------|---------|--------|
| V1 | `LIVRABLES/recos_regroupees_par_mp.md` | 103 recos structurées par MP | ✅ Envoyé |
| V2 | `LIVRABLES/Audit/risques_regroupements_phase3.md` | 20 cas douteux | ✅ Envoyé |
| V3 | `LIVRABLES/Audit/scoring_vs_legacy_vs_toutes_etat.md` | Comparaison scoring | ❌ À envoyer |
| V4 | `LIVRABLES/Audit/reflexion_methodologie_scoring.md` | Raisonnement scoring | ❌ À envoyer |
| V5 | 25 templates V1-V5 A→E | Validation clinique | ❌ À valider |

---

## 🏁 RÉSULTAT ATTENDU

Après cette session, Dr. Monka aura :
- [ ] Validé les 5 templates A par V (règles d'activation)
- [ ] Validé les 5 templates B par V (recommandations)
- [ ] Validé les 5 templates C par V (MT & ASR)
- [ ] Validé (ou amendé) les enrichissements IA (🤖)
- [ ] Traité les anomalies A1-A9
- [ ] Statué sur P1-P5
- [ ] Donné le GO pour implémenter les corrections dans l'APP
