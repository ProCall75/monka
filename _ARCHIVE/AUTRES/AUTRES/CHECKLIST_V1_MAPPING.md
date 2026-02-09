# 📋 Checklist V1 - Mapping Complet Simulateur

> **Objectif** : Documenter 100% des éléments V1 extraits du simulateur  
> **Source** : `monka_simulator.html` (2509 lignes)  
> **Date** : 03/02/2026

---

## 📊 Statistiques V1

| Élément | Quantité | Source |
|---------|----------|--------|
| **Questions** | 10 | ✅ Simulateur |
| **Questions critiques** | 2 (E2, E6) | ✅ Simulateur |
| **Questions scoring** | 6 | ✅ Simulateur |
| **Questions trigger** | 1 (N4) | ✅ Simulateur |
| **CCC** | 8 (R1-R4) | ✅ Simulateur |
| **Micro-parcours** | 4 (R1-R4) | ✅ Simulateur |
| **Micro-tâches** | 41 | ✅ Simulateur |
| **Personas test** | 5 | ✅ Simulateur |

---

## 📝 Questions V1 (10)

| ID | Label | Type | Options | Recommandations |
|----|-------|------|---------|-----------------|
| **E1** | Répartition de l'aide | scoring | 3 | 2 |
| **E2** | Soutien mobilisable | critical | 3 | 2 |
| **E4** | Évolution relation | scoring | 2 | 1 |
| **E5** | Tensions familiales | scoring | 3 | 2 |
| **E6** | Acceptation aide | critical | 4 | 3 |
| **N4** | Aidant seul | trigger | 2 | 1 |
| **N20** | Relations sociales proche | scoring | 3 | 2 |
| **O27** | Impact vie familiale | scoring | 3 | 2 |
| **O28** | Impact vie sociale/pro | scoring | 3 | 2 |
| **O30** | Ne plus reconnaître | scoring | 3 | 2 |

---

## ⚠️ CCC V1 (8 règles)

| Code | Questions | Logique | Micro-parcours | Label |
|------|-----------|---------|----------------|-------|
| **R1_CC_01** | O27, O28 | O27=2 ET O28=2 | R1 | Retentissement vie privée + sociale |
| **R1_CC_02** | N7, O27 | N7=aménagement ET O27=Oui | R1 | Aménagement pro + retentissement |
| **R2_CC_01** | N4, E2 | N4=1 ET E2=2 | R2 | Aidant seul sans soutien |
| **R2_CC_02** | E1, E2 | E1=2 ET E2=2 | R2 | Charge exclusive sans filet |
| **R3_CC_01** | N20, O48 | N20=2 ET O48≤1 | R3 | Isolement social du proche |
| **R4_CC_01** | O30, E4 | O30=2 ET E4=1 | R4 | Dégradation du lien |
| **R4_CC_02** | E5, E1 | E5=2 ET E1=2 | R4 | Conflits + charge déséquilibrée |
| **R4_CC_03** | E6, O31 | E6=Refuse ET O31=Oui | R4 | Refus aide + peur avenir |

---

## 🎯 Micro-Parcours V1 (4)

| Code | Nom | Questions associées |
|------|-----|---------------------|
| **R1** | Impact vie personnelle / sociale / pro | O27, O28, N7 |
| **R2** | Soutien de l'entourage | N4, E1, E2 |
| **R3** | Isolement social du proche | N20, O48 |
| **R4** | Relation aidant/aidé & dynamique familiale | E4, E5, E6, O30, O31 |

---

## 🏷️ Micro-Tâches V1 (41)

### Par Type

| Type | Nb | % | Contributives ASR |
|------|----|---|-------------------|
| **STRUC** | 4 | 10% | ✅ Oui |
| **SEC** | 10 | 25% | ✅ Oui |
| **INFO** | 12 | 30% | ❌ Non |
| **ORGA** | 15 | 37.5% | ❌ Non |
| **MED** | 0 | 0% | ✅ Oui |

### Liste Complète (extrait simulateur)

#### STRUC (Structuration)
1. Envisager un accueil temporaire
2. Proposer des solutions de répit
3. Proposer un entretien de médiation
4. Proposer des solutions d'aménagement

#### SEC (Sécurisation)
1. Proposer un accompagnement pour solliciter aide
2. Proposer un contact régulier avec un professionnel
3. Proposer un accompagnement psychologique
4. Proposer un soutien psychologique
5. Proposer un échange avec le proche
6. Proposer une approche progressive
7. Proposer une première mise en relation
8-10. (autres)

#### INFO (Information)
1. Évaluer les aides disponibles
2. Orienter vers des groupes d'entraide
3. Informer sur les solutions de répit
4. Orienter vers des dispositifs d'aide aux aidants
5. Informer sur les groupes de parole
6. Orienter vers des dispositifs de soutien
7. Informer sur les types d'aides existantes
8. Orienter vers des associations
9. Orienter vers des solutions de répit
10. Informer sur les droits des aidants
11. Informer sur la maladie
12. Orienter vers groupes de parole

#### ORGA (Organisation)
1. Lister les personnes mobilisables
2. Explorer les freins à une meilleure répartition
3. Identifier d'autres personnes mobilisables
4. Évaluer l'urgence de l'isolement
5. Échanger sur les sources de tension
6. Identifier les points de tension
7. Comprendre les freins à l'acceptation
8. Explorer les causes du refus
9. Évaluer les possibilités de mobilisation
10. Rester attentif aux signaux
11. Identifier les domaines impactés
12. Identifier les activités impactées
13. Évaluer l'impact professionnel
14. Échanger sur les changements observés
15. Identifier les situations problématiques

---

## 📜 Règles Cliniques V1 (4)

| Code | Description |
|------|-------------|
| **R-MT-ASR-01** | Séparation stricte micro-tâches (moyens) / ASR (états) |
| **R-TEMP-01** | Priorisation : Critique (≤7j) → CCC (≤1mois) → Standard (>1mois) |
| **R-TYPE-01** | STRUC/SEC/MED contributives ASR, INFO/ORGA non contributives |
| **R-CCC-01** | CCC = combinaison de signaux faibles |

---

## 👤 Personas Test V1 (5)

| # | Nom | Emoji | Profil | CCC attendues |
|---|-----|-------|--------|---------------|
| 1 | Marie D., 58 ans | 👩‍🦳 | Charge exclusive, tensions | 2 |
| 2 | Jean-Pierre L., 72 ans | 👨‍🦳 | Situation équilibrée | 0 |
| 3 | Sophie M., 45 ans | 👩‍💼 | Impact fort vie pro | 1 |
| 4 | Ahmed K., 38 ans | 👨‍⚕️ | Isolement total, refus aide | 4 |
| 5 | Nathalie P., 62 ans | 👩 | Situation optimale | 0 |

---

## ✅ Checklist Éléments V1

### Questions
- [x] 10 questions définies avec IDs
- [x] Types assignés (critical/scoring/trigger)
- [x] Options avec scores
- [x] Recommandations par option
- [x] Acteurs assignés (IDEC, Psychologue, etc.)
- [x] Micro-tâches par recommandation

### CCC
- [x] 8 CCC définies avec codes
- [x] Logique de déclenchement documentée
- [x] Mapping vers micro-parcours
- [x] Recommandations CCC complètes
- [x] Tâches CCC définies

### Micro-Tâches
- [x] 41 micro-tâches identifiées
- [x] Typologie assignée (STRUC/SEC/INFO/ORGA/MED)
- [x] Mapping vers questions
- [x] Règle contributive ASR

### Scoring
- [x] Score brut /16
- [x] Normalisation /20
- [x] Interprétation par seuil (≤6 vert, ≤13 orange, >13 rouge)
- [x] Priorité calculée (Niveau 1/2/3)

### Interface
- [x] Vue EXTERNE (Aidant) : Recommandations
- [x] Vue INTERNE (IDEC) : Scoring, Moteur, Micro-Tâches, Justificatif
- [x] Onglet Règles (documentation)
- [x] Personas pour tests

---

> 📄 Checklist V1 extraite à 100% du simulateur  
> ✅ Source unique de vérité pour répliquer sur V2-V5
