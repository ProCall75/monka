# 🔎 Contrôle de Cohérence — V3 Santé de l'Aidant

> **Vulnérabilité** : V3 — Santé de l'Aidant  
> **26 questions** · **4 MPs** (S1, S2, S3, S4) · **4 docs de complétude**  
> **Date** : 15/02/2026  
> **Objectif** : Vérifier que templates + complétude = V3 cliniquement et produit-viable

---

## 1. COUVERTURE DES QUESTIONS

### 1.1 — Mapping question → MP (26/26)

| Q_ID | Libellé (résumé) | MP | Unique ? |
|---|---|---|---|
| E7 | Épuisement par le rôle | **S1** | ✅ |
| E8 | Solitude émotionnelle | **S2** | ✅ |
| E9 | Temps pour soi | **S2** | ✅ |
| E10 | Moral (stress, inquiétude) | **S1** | ✅ |
| E11 | Soutien dans la détresse | **S1** | ✅ |
| E12 | Inquiétude sécurité proche (seul) | **S2** | ⚠️ Cross-MP |
| E13 | Inquiétude sécurité proche (nuit) | **S2** | ⚠️ Cross-MP |
| E14 | Capacité à tenir | **S1** | ✅ |
| E15 | Difficultés d'accès aux RDV | **S4** | ✅ |
| E16 | Maintien RDV depuis aidance | **S4** | ✅ |
| E17 | Activité physique régulière | **S4** | ✅ |
| E18 | Qualité du sommeil | **S3** | ✅ |
| E19 | Soucis de santé actuels | **S4** | ✅ |
| N4 | — | ❌ **Absent V3** | Existe en V1 (R2) |
| N7 | — | ❌ **Absent V3** | Existe en V1 (R1) |
| N8 | Besoin répit / relais | **S1** | ✅ |
| N20 | — | ❌ **Absent V3** | Existe en V1 (R3) |
| O27-O31 | — | ❌ **Absent V3** | Existent en V1 |
| O29 | Retentissement sur la santé | **S1** | ✅ |
| O32 | Besoins non satisfaits | **S1** | ✅ |
| O33 | Perception charge | **S1** | ✅ |
| O37 | Médecin traitant ? | **S3** | ✅ |
| O38 | Spécialistes ? | **S3** | ✅ |
| O39 | Lesquels ? (spécialistes) | **S3** | ✅ |
| O40 | RDV réalisés cette année ? | **S3** | ✅ |
| O41 | Lesquels ? (examens) | **S3** | ✅ |
| O42 | Pathologies | **S3** | ✅ |
| O43 | Médicaments quotidiens | **S3** | ✅ |
| O44 | Santé perçue vs pairs | **S3** | ✅ |
| O50 | Heures/semaine d'aide | **S1** | ✅ |

> ✅ **26 questions V3 = 26 assignations MP, sans doublons d'assignation.**
> ⚠️ **E12/E13** sont propriétés de S2 mais déclenchent des règles dans S1 (cross-MP documenté et justifié cliniquement).

### 1.2 — Répartition par MP

| MP | Nb Q | % de V3 | Équilibre |
|---|---|---|---|
| S1 | 9 | 34.6% | 🟢 Dense — MP pivot |
| S2 | 4 | 15.4% | 🟢 Normal — thème ciblé |
| S3 | 9 | 34.6% | 🟢 Dense — suivi médical détaillé |
| S4 | 4 | 15.4% | 🟡 Léger — à enrichir via complétude |

> **Observation** : S1 et S3 portent 70% de V3. Cohérent : S1 = charge globale (construit large), S3 = suivi médical (beaucoup de questions factuelles détaillées). S2 et S4 sont ciblés et plus petits.

---

## 2. COHÉRENCE DES FRONTIÈRES INTER-MP

### 2.1 — Matrice de frontière clinique

| Frontière | Critère discriminant | Confiance | Zones grises |
|---|---|---|---|
| **S1 ↔ S2** | S1 = charge/épuisement, S2 = isolement/sécurité | 🟢 Haute | Aucune. E12/E13 cross-MP documenté. |
| **S1 ↔ S3** | S1 = impact subjectif perçu, S3 = suivi médical objectif | 🟢 Haute | O29 (retentissement santé) débattable → justifié S1 |
| **S1 ↔ S4** | S1 = charge, S4 = hygiène de vie | 🟢 Haute | Aucune |
| **S2 ↔ S3** | S2 = psycho-social, S3 = médical | 🟢 Haute | Aucune |
| **S2 ↔ S4** | S2 = isolement, S4 = prévention active | 🟢 Haute | Aucune |
| **S3 ↔ S4** | S3 = état du suivi existant, S4 = comportement d'entretien | 🟡 Moyenne | **E15, E16, E19 débattables** |

> ⚠️ **La frontière S3/S4 est la plus fine de V3.** Le critère : S3 = « ai-je un suivi ? » vs S4 = « est-ce que je l'entretiens ? ». E15/E16 (accès aux RDV) et E19 (soucis de santé) pourraient être dans S3. Le choix S4 est justifié par la cohérence du CCC S4 (E15+E16 = renoncement actif) et l'équilibre structurel (S3 a déjà 9Q).

### 2.2 — Cross-MP : E12/E13

| Question | Propriété thématique | Active une règle dans | Justification |
|---|---|---|---|
| E12 (sécurité seul) | S2 | **S1** (CRIT_01) | Inquiétude sécuritaire → explosion charge émotionnelle |
| E13 (sécurité nuit) | S2 | **S1** (CRIT_02) | Risque vital nocturne → urgence sécurisation globale |

> ✅ **Cross-MP justifié** : Le risque vital (CRIT) est traité par S1 (urgence de sécurisation globale), tandis que S2 traite le versant psycho-social. Pas de doublon d'action — S1 sécurise, S2 accompagne l'isolement.

---

## 3. ÉTAT DES RÈGLES D'ACTIVATION

### 3.1 — Inventaire des règles (templates actuels)

| MP | Règles existantes | Types | Questions déclenchantes | Questions V3 sans règle |
|---|---|---|---|---|
| S1 | 7 | 🔴 CRIT ×2, 🟠 CCC ×1, 🟢 STD ×4 | E7, E14, E8+E9(CCC), O33, N8, E12, E13 | E10, E11, O29, O32, O50 |
| S2 | 2 | 🟠 CCC ×1, 🟢 STD ×1 | E8+E9(CCC), E8(STD) | E12, E13 (cross-MP vers S1) |
| S3 | 1 | 🟠 CCC ×1 | O44+E18(CCC) | O37, O38, O39, O40, O41, O42, O43 |
| S4 | 1 | 🟠 CCC ×1 | E15+E16(CCC) | E17, E19 |
| **Total** | **11** | 2 CRIT, 3 CCC, 1 STD non-S1, 4 STD S1 | | |

### 3.2 — Après complétude (si tout validé)

| MP | Règles (avant→après) | ΔRègles | Questions couvertes (avant→après) |
|---|---|---|---|
| S1 | 7 → **11** | +4 STD | 4/9 → **9/9** |
| S2 | 2 → **5** | +2 STD, +1 CCC | 2/4 → **4/4** |
| S3 | 1 → **4** | +3 STD | 2/9 → **5/9** (O38/O39/O41/O42 restent contextuelles — justifié) |
| S4 | 1 → **3** | +1 STD, +1 STD(E17) | 2/4 → **3/4** (E19 reste contextuelle — justifié) |
| **Total** | **11 → 23** | **+12 règles** | |

> ⚠️ **Point d'attention** : V3 passerait de 11 à 23 règles. V1 a combien pour comparaison ? V2 ? Pour assurer la proportionnalité.

---

## 4. ÉTAT DES MICRO-TÂCHES

### 4.1 — Inventaire MT (templates actuels)

| MP | MT totales | 📍 Contributives | 💡 Non-contributives | Types | Domaines |
|---|---|---|---|---|---|
| S1 | 4 | 1 (SEC) | 3 (INFO×2, ORGA×1) | SEC, INFO, ORGA | 100% médico-social |
| S2 | 8 | 5 (SEC×5) | 3 (INFO×1, ORGA×2) | SEC, INFO, ORGA | 75% médico-social, 25% médical |
| S3 | 18 | 16 (MED×16) | 2 (INFO×1, ORGA×1) | MED, INFO, ORGA | 89% médical |
| S4 | 3 | **0** ⚠️ | 3 (ORGA×3) | ORGA | 100% médico-social |
| **Total** | **33** | **22** | **11** | | |

### 4.2 — Après complétude (si tout validé)

| MP | MT (avant→après) | 📍 (avant→après) | Ajouts |
|---|---|---|---|
| S1 | 4 → **7** | 1 → **3** | +2 SEC, +1 ORGA |
| S2 | 8 → **9** | 5 → 5 | +1 INFO |
| S3 | 18 → 18 | 16 → 16 | Aucun ajout MT (clarification K11 seulement) |
| S4 | 3 → **6** | 0 → **2** | +1 MED(📍), +1 SEC(📍), +1 INFO |
| **Total** | **33 → 40** | **22 → 26** | **+7 MT** |

### 4.3 — Viabilité ASR par MP

| MP | ASR | Avant complétude | Après complétude |
|---|---|---|---|
| S1 | « Mesurer la charge et ajuster » | ✅ 1 MT contributive | ✅ 3 MT contributives |
| S2 | « Sécuriser votre quotidien » | ✅ 5 MT contributives | ✅ 5 MT contributives |
| S3 | « Protéger votre santé » | ✅ 16 MT (conditionnées O39) | ✅ + clarification K11 |
| S4 | « Préserver votre qualité de vie » | ❌ **0 MT contributive** | ✅ 2 MT contributives |

> 🔴 **S4 est le seul MP avec ASR non-validable actuellement.** C'est le problème le plus critique de V3. Sans complétude, S4 est un MP « mort » — il active des recos mais ne peut jamais valider son ASR.

---

## 5. COHÉRENCE CLINIQUE GLOBALE

### 5.1 — Couverture thématique V3

| Dimension de santé | MP couvrant | Profondeur |
|---|---|---|
| Épuisement physique et psychologique | S1 | 🟢 Excellent (9Q, 7 règles, 3 CAT) |
| Isolement émotionnel | S2 | 🟢 Bon (4Q, 2 règles, 3 CAT) |
| Inquiétudes sécuritaires (proche) | S2 + S1 (cross-MP) | 🟢 Excellent (E12/E13 → CRIT S1) |
| Suivi médical existant | S3 | 🟢 Excellent (9Q, 18 MT) |
| Sommeil | S3 (E18) | 🟡 Moyen (1Q, via CCC seulement) |
| Accès aux soins / renoncement | S4 (E15/E16) | 🟡 Moyen (via CCC seulement → STD en complétude) |
| Activité physique | S4 (E17) | 🔴 **Absent** (aucune action → ajout via complétude) |
| Polymédication | S3 (O43) | 🔴 **Absent** (aucune règle → ajout proposé en complétude) |
| Soucis de santé prioritaires | S4 (E19) | 🟡 Contextuel seulement |

### 5.2 — Trous cliniques restants après complétude

| Trou | Gravité | Couvert par complétude ? |
|---|---|---|
| Activité physique (E17) | 🟠 | ✅ S4_CAT_02 proposée |
| Polymédication (O43 ≥ 7) | 🟠 | ✅ S3_STD_03 proposée |
| E19 sans action propre | 🟡 | ✅ Justifié : question contextuelle |
| Pathologies lourdes (O42) | 🟡 | Pas couvert — trop complexe à modéliser en règle simple |
| Sommeil isolé (E18 sans combinaison) | 🟡 | Pas couvert — E18 n'active qu'en combo CCC avec O44 |

> 💡 **Après complétude, 2 trous mineurs restent** : O42 (pathologies, trop hétérogène) et E18 isolé (sommeil sans dégradation perçue). Ni l'un ni l'autre ne sont des bloquants cliniques. Les pathologies sont inventoriées et servent à contexte. Le sommeil seul est couvert en prévention.

---

## 6. COHÉRENCE PRODUIT

### 6.1 — K-Rules compliance

| K-Rule | Description | S1 | S2 | S3 | S4 | Après complétude |
|---|---|---|---|---|---|---|
| K1 | Questions → MP | ✅ | ✅ | ✅ | ✅ | ✅ |
| K3 | ≥2 niveaux/CAT | ⚠️ CAT_03 | ⚠️ CAT_02 | ⚠️ ×3 | ⚠️ CAT_01 | ✅ Tous OK |
| K6 | Reco prévention | ✅ | ✅ | ✅ | ✅ | ✅ |
| K11 | ASR = 100% MT contrib. | ✅ | ✅ | ⚠️ Clarification | ❌ **0 contrib.** | ✅ |

### 6.2 — Checklist 8/8

| MP | Score actuel | Score après complétude | Blocages |
|---|---|---|---|
| S1 | **5/8** | **8/8** | 8 propositions |
| S2 | **6/8** | **8/8** | 5 propositions |
| S3 | **6/8** | **8/8** | 4 propositions |
| S4 | **6/8** | **8/8** | 7 propositions (dont 1 🔴 critique) |
| **V3 globale** | **23/32** | **32/32** | **24 propositions totales** |

### 6.3 — Doublons et conflits produit

| Doublon potentiel | Détail | Gravité | Résolution |
|---|---|---|---|
| S4_RECO_01 ≈ S3_RECO_04 | « Bilan avec le MT » dans les deux MP | 🟡 | Wording différencié proposé en complétude S4 |
| MT SAD (S4_RECO_01) vs S1 | MT_V3_007/009/013 semblent S1 | 🟡 | Vérification mapping demandée en complétude S4 |
| MT « Contacter MT pour bilan » | S1 (CAT_01), S3 (S3_RECO_04), S4 (S4_RECO_01) | 🟡 | Même action concrète, mais motivations différentes |

> 💡 **La « prise de contact MT » revient dans 3 MPs** — c'est normal. Le MT est le pivot du système de santé. La différence est la RAISON : S1 = charge, S3 = dégradation détectée, S4 = renoncement aux soins. Le wording IDEC doit refléter cette distinction.

---

## 7. SYNTHÈSE — V3 est-elle viable ?

### État actuel (sans complétude)

| Critère | Verdict |
|---|---|
| Couverture questions | ✅ 26/26 assignées, 0 doublon |
| Frontières inter-MP | 🟡 S3/S4 fine mais justifiée |
| Règles d'activation | ⚠️ 11 règles, 14 questions muettes |
| MT contributives | ⚠️ S4 = 0 (ASR mort) |
| K3 | ⚠️ Échoue sur 4 catégories |
| Score global | **23/32 (72%)** |

### État cible (avec complétude validée)

| Critère | Verdict |
|---|---|
| Couverture questions | ✅ 26/26 |
| Frontières inter-MP | ✅ Toutes documentées et justifiées |
| Règles d'activation | ✅ 23 règles, 5 questions contextuelles (justifié) |
| MT contributives | ✅ Tous les MPs ont ≥1 contrib. |
| K3 | ✅ Toutes les catégories à ≥2 niveaux |
| Score global | **32/32 (100%)** |
| Doublons résolus | ✅ Wordings différenciés |
| ASR validable | ✅ 4/4 MPs |

### Priorités d'action pour Dr. Monka

| Priorité | Docs à lire | Contenu |
|---|---|---|
| 🔴 **Critique** | [S4_hygiene_de_vie.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S4_hygiene_de_vie.md) — Prop. 3.1 | MT contributive pour ASR |
| 🟠 **Haute** | [S1_charge_fatigue.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S1_charge_fatigue.md) | 8 propositions (règles + MT) |
| 🟠 **Haute** | [S4_hygiene_de_vie.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S4_hygiene_de_vie.md) — Prop. 1.1-3.4 | 6 propositions (CAT_02, règles) |
| 🟠 **Haute** | [S3_sante_physique.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S3_sante_physique.md) | 4 propositions (3 règles STD) |
| 🟡 **Moyenne** | [S2_inquietudes_securite.md](file:///Users/antonin/monka/KERNEL/COMPLETUDE/S2_inquietudes_securite.md) | 5 propositions (règles + correction) |

> **Conclusion : V3 est VIABLE cliniquement et produit, à condition que les 24 propositions de complétude soient validées par Dr. Monka. Le seul bloquant critique est S4 (0 MT contributive = ASR mort).**
