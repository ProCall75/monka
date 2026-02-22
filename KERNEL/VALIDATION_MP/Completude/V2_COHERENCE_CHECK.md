# 🔎 Contrôle de Cohérence — V2 Administratif & Juridique

> **Vulnérabilité** : V2 — Administratif & Juridique  
> **21 questions** · **4 MPs** (A1, A2, A3, A4) · **0 doc de complétude**  
> **Date** : 15/02/2026  
> **Score global** : 32/32 (100%) ✅

---

## 1. COUVERTURE DES QUESTIONS

### 1.1 — Mapping question → MP (21/21)

| Q_ID | Libellé (résumé) | MP | Unique ? |
|---|---|---|---|
| E21 | Capacité à maintenir situation de vie | **A1** | ✅ |
| E68 | Temps hebdo démarches admin | **A1** | ✅ |
| O23 | Couverture santé aidant | **A1** | ✅ |
| O45 | Couverture santé proche | **A1** | ✅ |
| E62 | Aides sociales demandées | **A2** | ✅ |
| N29 | Aides obtenues | **A2** | ✅ |
| N42 | Bénéficiaire ALD | **A2** | ✅ |
| O53 | Évaluation dépendance effectuée | **A2** | ✅ |
| O54 | Niveau GIR | **A2** | ✅ |
| E61 | Couverture par un SAAD | **A3** | ✅ |
| E66 | Complexité perçue des démarches | **A3** | ✅ |
| E69 | Compétence numérique | **A3** | ✅ |
| E70 | Fréquence situations urgentes | **A3** | ✅ |
| N6 | Mise en place gestionnaire de cas | **A3** | ✅ |
| E63 | Démarches qui préoccupent le plus | **A4** | ⚠️ Débattable |
| E64 | Aménagements scolaires/pro | **A4** | ✅ |
| E65 | Besoins scolaires/pro non satisfaits | **A4** | ✅ |
| E67 | Conciliation vie pro/aidance | **A4** | ✅ |
| N43 | Services d'accompagnement utilisés | **A4** | ✅ |
| N5 | Associations fréquentées | **A4** | ✅ |
| O61 | Moyens financiers suffisants | **A4** | ✅ |

> ✅ **21/21 questions assignées, 0 doublon**
> ⚠️ **E63** est débattable (A3 vs A4). Choix A4 justifié : E63 = inventaire factuel des préoccupations, pas mesure de complexité perçue (= A3). E63 sert de déclencheur dans le CCC_02 de A4.

### 1.2 — Répartition par MP

| MP | Nb Q | % de V2 | Équilibre |
|---|---|---|---|
| A1 | 4 | 19% | 🟢 Ciblé — couverture de base |
| A2 | 5 | 24% | 🟢 Solide — droits concrets |
| A3 | 5 | 24% | 🟢 Solide — charge admin |
| A4 | 7 | 33% | 🟢 Dense — inclusion + budget |

---

## 2. COHÉRENCE DES FRONTIÈRES INTER-MP

### 2.1 — Matrice de frontière clinique

| Frontière | Critère discriminant | Confiance |
|---|---|---|
| **A1 ↔ A2** | A1 = couverture BASE, A2 = droits CONCRETS activés | 🟢 Haute |
| **A1 ↔ A3** | A1 = est-ce couvert ?, A3 = est-ce que ça m'accable ? | 🟢 Haute |
| **A1 ↔ A4** | A1 = couverture, A4 = inclusion/budget/viabilité | 🟢 Haute |
| **A2 ↔ A3** | A2 = quels droits, A3 = combien ça coûte en énergie | 🟢 Haute |
| **A2 ↔ A4** | A2 = droits ouverts, A4 = services utilisés + budget | 🟢 Haute |
| **A3 ↔ A4** | A3 = perception complexité, A4 = inventaire préoccupations | 🟡 Moyenne |

> ⚠️ **La frontière A3/A4 est la plus fine de V2** (comme S3/S4 pour V3). Le critère : A3 = PERCEPTION de la charge admin (E66 complexité, E70 urgence), A4 = CONTENU des préoccupations (E63 inventaire) + résultats concrets (inclusion, budget). E63 est le point de friction — mais le choix A4 est justifié et stable.

### 2.2 — Cross-MP et liaisons

| Mécanisme | Détail | Justification |
|---|---|---|
| **A3_CCC_01** | E61 (SAAD, A3) + E21 (maintien, A1) | Si pas de SAAD ET pas de projet de maintien → double vulnérabilité |
| **A3_CCC_03** | N6 (gestionnaire cas, A3) + E21 (A1) | Si pas de gestionnaire ET maintien incertain → accompagnement urgent |
| **A1_CAT_03 vs A3_CAT_01** | Charge en temps (A1) vs complexité perçue (A3) | Distinction volume ≠ difficulté — cohérent |
| **A2_CAT_01 vs A4_CAT_03** | Droits financiers (A2) vs viabilité financière (A4) | Levier (A2) vs résultat (A4) — cohérent |
| **E62 × N29 × N43 × E66** | Vue complète V2 : droits ouverts (A2), par qui (A4), charge (A3) | Croisement assuré au niveau V2 global |

> ✅ **Cross-MP bien documentés, distinctions claires.**

---

## 3. ÉTAT DES RÈGLES D'ACTIVATION

| MP | 🟢 STD | 🟠 CCC | 🔴 CRIT | Total |
|---|---|---|---|---|
| A1 | 3 | 3 | 1 | **7** |
| A2 | 4 | 3 | 2 | **9** |
| A3 | 4 | 3 | 2 | **9** |
| A4 | 3 | 3 | 2 | **8** |
| **Total V2** | **14** | **12** | **7** | **33** |

### Questions → Règles

| MP | Questions activant | Check #1 |
|---|---|---|
| A1 | 4/4 (E21, E68, O23, O45) | ✅ |
| A2 | 5/5 (E62, N29, N42, O53, O54) | ✅ |
| A3 | 5/5 (E61, E66, E69, E70, N6) | ✅ |
| A4 | 7/7 (E63, E64, E65, E67, N43, N5, O61) | ✅ |

> ✅ **21/21 questions activent au moins 1 règle. 0 question muette.**

### K3 — Niveaux par catégorie

| MP | CAT_01 | CAT_02 | CAT_03 | K3 OK ? |
|---|---|---|---|---|
| A1 | STD + CCC | STD + CCC | STD + CCC + CRIT | ✅ |
| A2 | STD + CCC + CRIT | STD + CCC + CRIT | STD + CCC | ✅ |
| A3 | STD + CCC + CRIT | STD + CCC + CRIT | — | ✅ |
| A4 | STD + CCC + CRIT | STD + CCC + CRIT | STD + CCC | ✅ |

> ✅ **Toutes les catégories ont ≥2 niveaux. K3 respecté partout.**

---

## 4. ÉTAT DES MICRO-TÂCHES

| MP | MT totales | 📍 Contributives | 💡 Non-contrib. | Domaines |
|---|---|---|---|---|
| A1 | 10 | 4 (STRUC:1, SEC:3) | 6 (INFO:3, ORGA:3) | 100% médico-social |
| A2 | 10 | 4 (STRUC:1, SEC:3) | 6 (INFO:3, ORGA:3) | 100% médico-social |
| A3 | 8 | 4 (STRUC:2, SEC:2) | 4 (INFO:2, ORGA:2) | 100% médico-social |
| A4 | 11 | 5 (STRUC:2, SEC:3) | 6 (INFO:3, ORGA:3) | 100% médico-social |
| **Total V2** | **39** | **17** | **22** | |

### ASR par MP

| MP | ASR | Validable ? |
|---|---|---|
| A1 | « Sécuriser votre couverture et anticiper » | ✅ |
| A2 | « Activer vos droits et aides » | ✅ |
| A3 | « Simplifier vos démarches administratives » | ✅ |
| A4 | « Stabiliser votre situation et vos moyens » | ✅ |

> ✅ **4/4 ASR validables. V2 est 100% médico-social — aucune MT médicale.**

---

## 5. COHÉRENCE CLINIQUE

### Couverture thématique V2

| Dimension | MP couvrant | Profondeur |
|---|---|---|
| Couverture santé (aidant + proche) | A1 | 🟢 Excellent |
| Anticipation projet de vie | A1 | 🟢 Excellent |
| Droits sociaux et aides | A2 | 🟢 Excellent |
| Évaluation dépendance (AGGIR) | A2 | 🟢 Excellent |
| ALD et prestations | A2 | 🟢 Bon |
| Charge admin perçue | A3 | 🟢 Excellent |
| Compétence numérique | A3 | 🟢 Bon |
| Gestion des urgences | A3 | 🟢 Bon |
| Inclusion scolaire/professionnelle | A4 | 🟢 Excellent |
| Accompagnement et associations | A4 | 🟢 Excellent |
| Viabilité financière | A4 | 🟢 Excellent |

> ✅ **Aucun trou clinique. V2 couvre l'intégralité du spectre administratif et juridique.**

### Observation structurelle

V2 est la vulnérabilité la plus homogène en termes de domaine : **100% médico-social, 0% médical**. Cohérent — l'administratif et juridique ne nécessite pas d'intervention médicale directe. Les acteurs sont principalement IDEC, assistants sociaux, et structures d'accompagnement.

---

## 6. COHÉRENCE PRODUIT

### Checklist 8/8

| MP | Score | Prévention | K3 | ASR | Cross-MP |
|---|---|---|---|---|---|
| A1 | **8/8** ✅ | ✅ | ✅ | ✅ | ✅ (source CCC E21) |
| A2 | **8/8** ✅ | ✅ | ✅ | ✅ | ✅ |
| A3 | **8/8** ✅ | ✅ | ✅ | ✅ | ✅ (CCC avec E21 A1) |
| A4 | **8/8** ✅ | ✅ | ✅ | ✅ | ✅ |
| **V2** | **32/32** | | | | |

### Doublons et conflits

| Doublon potentiel | Résolution |
|---|---|
| A1_CAT_03 (charge temps) vs A3_CAT_01 (complexité) | Volume ≠ difficulté. Distincts. |
| A2_CAT_01 (activer droits financiers) vs A4_CAT_03 (viabilité financière) | Levier (A2) vs résultat (A4). Distincts. |
| A3_CAT_02 (SAAD) vs A2_CAT_02 (évaluation dépendance) | A3 = mise en place service, A2 = évaluation GIR. Distincts. |

> ✅ **Aucun doublon non-résolu. Toutes les distinctions sont documentées et claires.**

---

## 7. SYNTHÈSE V2

| Critère | Verdict |
|---|---|
| Couverture questions | ✅ 21/21, 0 doublon |
| Frontières inter-MP | ✅ Claires (A3/A4 fine mais justifiée) |
| Règles d'activation | ✅ 33 règles, 21/21 questions activent |
| K3 | ✅ Toutes catégories ≥2 niveaux |
| MT contributives | ✅ 4/4 MPs (17 contributives) |
| ASR | ✅ 4/4 validables |
| Reco prévention | ✅ 4/4 + MT prévention |
| Score global | **32/32 (100%)** |
| Docs de complétude nécessaires | **0** |

> **V2 est au même standard que V1.** Aucune action requise. Points forts : homogénéité de domaine (100% médico-social), structure régulière des MT (4 contributives par MP en moyenne), et distinction fine mais stable A3/A4.

---

## 8. COMPARAISON V1 vs V2 — Benchmarks pour V3-V5

| Métrique | V1 | V2 | Moyenne | V3 (actuel) | V3 (cible) |
|---|---|---|---|---|---|
| Questions | 15 | 21 | 18 | 26 | 26 |
| Règles totales | 32 | 33 | 32.5 | 11 ⚠️ | 23 |
| Règles/question | 2.1 | 1.6 | 1.8 | 0.4 ⚠️ | 0.9 |
| MT totales | 47 | 39 | 43 | 33 | 40 |
| MT contributives | ~17 | 17 | 17 | 22 | 26 |
| MT/question | 3.1 | 1.9 | 2.4 | 1.3 ⚠️ | 1.5 |
| Score global | 32/32 | 32/32 | 100% | 23/32 (72%) | 32/32 |
| Niveaux STD+CCC+CRIT | 3 niveaux/CAT | 3 niveaux/CAT | — | 1 niveau/CAT ⚠️ | 2 niveaux/CAT |

> 💡 **V3 actuel est à 40% de la densité de V1/V2 en règles.** Même après complétude, V3 sera à ~70% (0.9 règle/question vs 1.8). C'est justifié par la nature des questions V3 : beaucoup de questions FACTUELLES (O37-O43, inventaires) qui n'ont pas besoin de règle individuelle. V1/V2 ont plus de questions GRADIENTES (échelles de Likert) qui se prêtent mieux aux seuils.
