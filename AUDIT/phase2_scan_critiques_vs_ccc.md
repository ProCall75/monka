# 🔍 Phase 2 - Scan Questions Critiques vs CCC

> **Date d'exécution** : 04/02/2026  
> **Statut** : ✅ SCAN TERMINÉ - **9 CONFLITS DÉTECTÉS**

---

## 🎯 Règle Absolue Vérifiée

```
═══════════════════════════════════════════════════════════════════
  ⚠️ RÈGLE STRICTE LEGACY
  
  Question CRITIQUE → Priorité Niveau 1 DIRECTE (sans combinaison)
  CCC → Combinaison de 2+ questions → Priorité Niveau 2
  
  ❌ UNE QUESTION CRITIQUE NE DOIT JAMAIS APPARAÎTRE DANS UNE CCC
═══════════════════════════════════════════════════════════════════
```

---

## 📊 RÉSUMÉ GLOBAL DU SCAN

| V | Questions Critiques | Nb CCC | Conflits | Statut |
|---|---------------------|--------|----------|--------|
| **V1** | E2, E6 | 8 | **3** | ❌ 3 conflit(s) |
| **V2** | E21, N27, O7, O8 | 5 | **2** | ❌ 2 conflit(s) |
| **V3** | E11, E17, E18 | 3 | **2** | ❌ 2 conflit(s) |
| **V4** | E43, E47, E54 | 6 | **1** | ❌ 1 conflit(s) |
| **V5** | E68 | 3 | **1** | ❌ 1 conflit(s) |
| **TOTAL** | 12 questions | 25 CCC | **9** | ❌ À corriger |

---

## 🔴 DÉTAIL DES 9 CONFLITS

### V1 - Social & Relationnel (3 conflits)

#### Conflit V1-1 : E2 dans R2_CC_01

| Élément | Valeur |
|---------|--------|
| **Question critique** | E2 - "Soutien mobilisable en cas de coup dur" |
| **Réponse critique** | "Très peu de personnes / personne" |
| **CCC concernée** | R2_CC_01 |
| **Questions CCC** | E2 + N4 |
| **Logique CCC** | E2="Personne" **ET** N4="Oui" (aidant seul) |

**Analyse** :  
E2 seule déclenche déjà une **Priorité Niveau 1**. La combiner avec N4 dans une CCC est **redondant**.

**Décision recommandée** :  
☐ **Option A** : Supprimer CCC R2_CC_01 (E2 suffit seule)  
☐ **Option B** : Retirer statut critique de E2 (peu probable - isolement = grave)

---

#### Conflit V1-2 : E2 dans R2_CC_02

| Élément | Valeur |
|---------|--------|
| **Question critique** | E2 - "Soutien mobilisable en cas de coup dur" |
| **CCC concernée** | R2_CC_02 |
| **Questions CCC** | E1 + E2 |
| **Logique CCC** | E1="Tout seul" **ET** E2="Personne" |

**Analyse** :  
Même problème - E2 est déjà critique seule.

**Décision recommandée** :  
☐ **Option A** : Supprimer CCC R2_CC_02  
☐ **Option B** : Retirer statut critique de E2

---

#### Conflit V1-3 : E6 dans R4_CC_03

| Élément | Valeur |
|---------|--------|
| **Question critique** | E6 - "Acceptation de l'aide extérieure" |
| **Réponse critique** | "Refuse la plupart du temps" |
| **CCC concernée** | R4_CC_03 |
| **Questions CCC** | E6 + O31 |
| **Logique CCC** | E6="Refuse" **ET** O31="Oui" (peur avenir) |

**Analyse** :  
Quand le proche refuse toute aide (E6), c'est déjà une urgence. Ajouter "peur de l'avenir" (O31) n'ajoute rien à l'urgence.

**Décision recommandée** :  
☐ **Option A** : Supprimer CCC R4_CC_03  
☐ **Option B** : Retirer statut critique de E6

---

### V2 - Fragilité du Proche (2 conflits)

#### Conflit V2-1 : E21 dans CCC_F1_01

| Élément | Valeur |
|---------|--------|
| **Question critique** | E21 - "Maintien de la situation à 6-12 mois" |
| **Réponse critique** | "Non, un changement sera nécessaire" |
| **CCC concernée** | CCC_F1_01 |
| **Questions CCC** | E21 + N21 + N9 |
| **Logique CCC** | E21="Changement" **ET** (N21="Oui" **OU** N9="Oui") |

**Analyse** :  
E21 indique que le maintien à domicile est impossible → Priorité 1 immédiate. Ajouter des conditions financières/gestion est secondaire.

**Décision recommandée** :  
☐ **Option A** : Supprimer CCC_F1_01  
☐ **Option B** : Retirer statut critique de E21

---

#### Conflit V2-2 : O8 dans CCC_F2_01

| Élément | Valeur |
|---------|--------|
| **Question critique** | O8 - "Gestion des finances seul" |
| **CCC concernée** | CCC_F2_01 |
| **Questions CCC** | E23 + E24 + O8 + O9 |
| **Logique CCC** | ≥2 parmi les 4 conditions vraies |

**Analyse** :  
Cette CCC de ≥2 conditions est plus complexe. O8 seule = critique ? À vérifier.

**Décision recommandée** :  
☐ **Option A** : Retirer O8 de la CCC (garder 3 questions)  
☐ **Option B** : Retirer statut critique de O8

---

### V3 - Santé de l'Aidant (2 conflits)

#### Conflit V3-1 : E11 dans S1_CC_01

| Élément | Valeur |
|---------|--------|
| **Question critique** | E11 - "Renoncement aux soins" |
| **Réponse critique** | "Oui, souvent" |
| **CCC concernée** | S1_CC_01 |
| **Questions CCC** | E11 + E7 |
| **Logique CCC** | E11="Oui souvent" **ET** E7="Mauvais état" |

**Analyse** :  
Renoncer à ses soins régulièrement (E11) = déjà grave. Combiner avec état de santé (E7) renforce mais E11 seule devrait suffire.

**Décision recommandée** :  
☐ **Option A** : Supprimer CCC S1_CC_01  
☐ **Option B** : Modifier la CCC pour retirer E11

---

#### Conflit V3-2 : E18 dans S3_CC_01

| Élément | Valeur |
|---------|--------|
| **Question critique** | E18 - "Idées de se faire du mal" |
| **Réponse critique** | "Oui" |
| **CCC concernée** | S3_CC_01 |
| **Questions CCC** | E14 + E18 + N8 + O44 |

**Analyse** :  
⚠️ **URGENCE ABSOLUE** - E18 = risque suicidaire.  
Cette question ne devrait JAMAIS être dans une CCC. Elle déclenche un **protocole immédiat** (3114, médecin, entourage).

**Décision recommandée** :  
☐ **Option A** : Retirer E18 de la CCC (non négociable)

---

### V4 - Parcours Médical (1 conflit)

#### Conflit V4-1 : E54 dans M5_CC_01

| Élément | Valeur |
|---------|--------|
| **Question critique** | E54 - "Observance thérapeutique" |
| **Réponse critique** | "Non, refus ou incapacité" |
| **CCC concernée** | M5_CC_01 |
| **Questions CCC** | E54 + E57 |

**Analyse** :  
Le refus de traitement (E54) est critique pour la santé. La combinaison avec E57 ajoute une dimension mais E54 seule justifie l'urgence.

**Décision recommandée** :  
☐ **Option A** : Supprimer CCC M5_CC_01  
☐ **Option B** : Retirer statut critique de E54

---

### V5 - Administrative (1 conflit)

#### Conflit V5-1 : E68 dans A3_CC_01

| Élément | Valeur |
|---------|--------|
| **Question critique** | E68 - "Temps passé sur les démarches admin" |
| **Réponse critique** | "> 10h/mois + difficultés" |
| **CCC concernée** | A3_CC_01 |
| **Questions CCC** | E68 + E69 |
| **Logique CCC** | E68>5h **ET** E69≠"Oui" (pas à l'aise numérique) |

**Analyse** :  
E68 seule est-elle vraiment critique ? La surcharge admin (>10h) avec difficultés numériques (E69) ensemble crée le problème.

**Décision recommandée** :  
☐ **Option A** : Retirer statut critique de E68 (garder CCC)  
☐ **Option B** : Supprimer CCC et garder E68 critique

---

## 📝 ACTIONS REQUISES

### Tableau de décisions à valider

| # | V | Question | CCC | Décision proposée | À valider MONKA |
|---|---|----------|-----|-------------------|-----------------|
| 1 | V1 | E2 | R2_CC_01 | Supprimer CCC | ☐ |
| 2 | V1 | E2 | R2_CC_02 | Supprimer CCC | ☐ |
| 3 | V1 | E6 | R4_CC_03 | Supprimer CCC | ☐ |
| 4 | V2 | E21 | CCC_F1_01 | Supprimer CCC | ☐ |
| 5 | V2 | O8 | CCC_F2_01 | Retirer O8 de CCC | ☐ |
| 6 | V3 | E11 | S1_CC_01 | Retirer E11 de CCC | ☐ |
| 7 | V3 | **E18** | S3_CC_01 | **RETIRER E18** ⚠️ | ☐ |
| 8 | V4 | E54 | M5_CC_01 | Supprimer CCC | ☐ |
| 9 | V5 | E68 | A3_CC_01 | Retirer statut critique | ☐ |

### Impact estimé

| Métrique | Avant | Après |
|----------|-------|-------|
| **CCC V1** | 8 | 5 (-3) |
| **CCC V2** | 5 | 4 (-1 modifiée) |
| **CCC V3** | 3 | 2 (-1 modifiée) |
| **CCC V4** | 6 | 5 (-1) |
| **CCC V5** | 3 | 3 (modifiée) |
| **TOTAL CCC** | 25 | ~20 |

---

## 🎯 Prochaines Étapes

1. **Validation MONKA** : Confirmer les 9 décisions proposées
2. **Documentation** : Inscrire chaque décision dans `/SOURCES/doc_tampon_modifications.md`
3. **Application** : Modifier les fichiers `ccc_recommendations.md` concernés
4. **Vérification** : Re-scanner pour confirmer 0 conflit

---

> 📄 Scan Phase 2 terminé le 04/02/2026  
> 🔴 **9 conflits détectés** - En attente de validation MONKA
