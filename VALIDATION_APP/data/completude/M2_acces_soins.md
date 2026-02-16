# 📋 Complétude — M2 — Accès aux soins et professionnels de santé

> **Vulnérabilité** : V5 — Parcours Médical  
> **Score POST-VALIDATION** : 7/8  
> **Score cible** : 8/8  
> **Date** : 15/02/2026

---

## Bilan post-validation Dr. Monka

Dr. Monka a validé TOUTES les sections (3-7) du template M2, y compris les propositions. Cela signifie que les éléments suivants sont désormais **officiels** :

### ✅ Éléments validés (plus à proposer)

| Élément | Détail | Statut |
|---|---|---|
| 8 nouvelles règles | STD_P01-P06 + CCC_P01 + CRIT_P01 | ✅ Validé |
| K3 conforme 4/4 | CAT_01 (STD+CCC), CAT_02 (STD+CCC), CAT_03 (STD+CCC), CAT_04 (STD+CCC+CRIT) | ✅ Validé |
| O17 = "Non" → Critique | Pas de médecin traitant = rupture totale, délai ≤7j | ✅ Validé |
| Questions orphelines résolues | E39, E41, O17, O18, O20 couverts. O19 = dispatch, O21 = conditionnel. | ✅ Validé |
| 6 MT ajoutées | INFO transport, STRUC aide transport, STRUC ETP, ORGA vérif. MT, INFO bilans, DISPATCH param. | ✅ Validé |
| Fusion MT_V4_005/016 | Quasi-doublons CAT_02 | ✅ Validé |
| Dispatch paramétrique O19 | 17 MT → 1 MT dynamique | ✅ Validé |
| Wording recos corrigé | 6 recos reformulées | ✅ Validé |
| Cross-activations documentées | E42/E43 (M3), N14 (V4/F2) | ✅ Documenté |

### Score post-validation

| Check | Statut | Détail |
|---|---|---|
| #1 Questions → règles | ✅ | 8/9 couverts (O19 = dispatch contextuel) |
| #2 Règle → reco | ✅ | 10 règles, toutes avec reco |
| #3 CAT → MT | ✅ | Toutes les CAT ont ≥1 📍 |
| #4 K3 | ✅ | 4/4 |
| #5 MT cohérentes | ⚠️ | **Dispatch paramétrique validé mais pas encore implémenté dans le moteur** |
| #6 Reco prévention | ✅ | |
| #7 Wording | ✅ | |
| #8 Sens clinique | ✅ | |

> **Score : 7/8** — il reste 1 point : l'implémentation du dispatch paramétrique (#5).

---

## Ce qui reste à faire (post-validation)

### PROP-M2-01 🟠 — Implémenter le dispatch paramétrique O19

Le dispatch paramétrique (17 MT → 1 MT dynamique `{param: O19.selected}`) a été validé par Dr. Monka mais nécessite une modification d'architecture moteur. Ce pattern est commun avec F6 (V4) — les deux doivent être traités ensemble.

> **Action** : Implémenter le mécanisme paramétrique pour M2 et F6 simultanément. Score : 7/8 → 8/8.

> **Décision architecturale** : Le moteur doit supporter `MT {param: O19.selected}` pour générer dynamiquement les MTs par spécialiste.

---

## Résumé

| # | Élément | Priorité | Statut |
|---|---|---|---|
| 01 | Dispatch paramétrique O19 (moteur) | 🟠 | ☐ À implémenter |
| ~~02~~ | ~~8 règles~~ | ~~🔴~~ | ✅ Validé |
| ~~03~~ | ~~K3 4/4~~ | ~~🔴~~ | ✅ Validé |
| ~~04~~ | ~~O17 Critique~~ | ~~🔴~~ | ✅ Validé |
| ~~05~~ | ~~6 MT ajoutées~~ | ~~🟠~~ | ✅ Validé |
| ~~06~~ | ~~Wording~~ | ~~🟡~~ | ✅ Validé |
| ~~07~~ | ~~Cross-activations~~ | ~~🟡~~ | ✅ Documenté |

> **Total restant** : 1 action technique (dispatch paramétrique). Score : 7/8 → 8/8.
