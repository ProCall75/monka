# 📋 Décision — Rules d'activation pour les 20 questions aidance

> **Date** : 21/02/2026
> **Auteur** : Antonin / Agent
> **Statut** : 🟡 Proposition — en attente validation Dr. Monka
> **Impact** : +37 nouvelles rules d'activation → les 20 questions aidance déclenchent enfin des recos

---

## Contexte

Le questionnaire Monka contient **20 questions spécifiques** au type d'aidance (Addiction ×7, Enfant ×5, Handicap ×3, Personne Âgée ×3, Psy ×2). Ces questions s'affichent conditionnellement selon le profil (N3), **mais aucune ne déclenche de recommandation** — les réponses sont collectées sans effet sur le moteur clinique.

**Résultat** : un aidant répond à 20 questions supplémentaires et n'obtient rien de plus qu'un aidant qui n'y répond pas. C'est un trou clinique majeur.

---

## Ce qui a déjà été fait ✅

- **23 MTs taguées** avec le champ `aidance` (Enfant ×9, Psy ×8, Handicap ×5, Addiction ×1)
- Colonne `aidance` ajoutée à `micro_taches` (default = `Tous`)

---

## Propositions de rules — par type d'aidance

### 🔵 ADDICTION (7 questions → 10 rules proposées)

#### E45 — Suivi addictologie
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification clinique |
|---|---|---|---|---|
| "Oui, mais il/elle n'y va plus" | → M4_CAT_01 | CCC | Suivi spécialisé | Rupture de suivi addictologique = risque de rechute. Signal d'alerte fort. |
| "Non" | → M4_CAT_01 | Standard | Suivi spécialisé | Absence de suivi → orientation vers un professionnel. |
| "Je ne sais pas" | → M1_CAT_01 | Standard | Compréhension diagnostic | L'aidant ne sait pas si son proche est suivi → besoin d'information. |

> **Pourquoi pas de rule CRIT ?** Le simple fait de ne pas être suivi n'est pas critique en soi — c'est la combinaison avec d'autres facteurs (N38=Oui, N39=Oui) qui devient critique. C'est le rôle de la CCC.

#### N37 — Type d'addiction (choix multiple)
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| ≥ 2 addictions cochées | → F5_CAT_02 | CCC | Addictions et épisodes | Poly-addiction = complexité de prise en charge majorée. |

> **Pourquoi 1 seule rule ?** N37 est une question de contexte — elle ne mesure pas la gravité mais le type. Seule la poly-addiction change le niveau d'urgence.

#### N38 — Contrôle de la consommation
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Oui" | → F5_CAT_02 | Critique | Addictions | Perte de contrôle = addiction active non maîtrisée. Urgence clinique. |
| "Parfois" | → F5_CAT_02 | Standard | Addictions | Signal à surveiller, pas encore critique. |

#### N39 — Problèmes de santé liés
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Oui" | → F5_CAT_01 | Critique | Dépendance/handicap | Conséquences physiques de l'addiction = urgence médicale. |

> **Pourquoi pas CCC avec N38 ?** Parce que N39="Oui" seul est déjà critique — les dommages physiques existent indépendamment du contrôle.

#### N40 — Tentative de sevrage
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Non" | → M4_CAT_03 | Standard | Plan de crise | Jamais tenté de se sevrer → proposer un accompagnement au sevrage. |

#### E51 — Prêt à être aidé
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Non" | → M4_CAT_01 | Standard | Suivi spécialisé | Refus d'aide = wording adapté (entretien motivationnel, pas de pression). |

#### E49 — Professionnels impliqués (choix multiple)
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Aucun suivi structuré" | → M4_CAT_01 | CCC | Suivi spécialisé | Zéro professionnel = signal fort d'absence de prise en charge. |

> **Pourquoi pas de rule sur chaque professionnel ?** La liste sert de cartographie, pas de déclencheur. Ce qui compte cliniquement c'est l'absence totale.

**Total Addiction : 10 rules** (2 CRIT, 3 CCC, 5 STD)

---

### 🟢 ENFANT (5 questions → 9 rules proposées)

#### E38 — Transition enfant/adulte
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Un peu, mais cela reste flou" | → M1_CAT_01 | Standard | Compréhension | Transition mal préparée → accompagner la continuité des soins. |
| "Non, pas du tout" | → M5_CAT_01 | CCC | Coordination soins | Rupture de parcours enfant/adulte = risque de perte de suivi. Signal fort. |

> **Pourquoi CCC et pas CRIT ?** La transition n'est pas un danger immédiat, mais un risque de dégradation progressive.

#### E59 — Orientation TND
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Oui, mais en attente depuis longtemps" | → M2_CAT_01 | CCC | Accès soins | Délai d'attente excessif = accès aux soins bloqué. |
| "Non, personne ne nous en a parlé" | → M2_CAT_01 | Critique | Accès soins | Enfant non orienté vers TND = diagnostic potentiellement manqué. |

> **Pourquoi CRIT ?** L'absence d'orientation vers une évaluation TND pour un enfant en difficulté est un manquement clinique documenté. Le diagnostic précoce change le pronostic.

#### E60 — Professionnels intervenus (choix multiple)
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Aucun de ces professionnels" | → M6_CAT_01 | CCC | Vision globale | Aucun professionnel spécialisé = évaluation non commencée. |

#### E64 — Fréquentation école/structure
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Très difficile" | → A4_CAT_01 | CCC | Situation scolaire | Inclusion scolaire en échec = impact majeur sur le développement. |
| "Non, ne fréquente pas" | → A4_CAT_01 | Critique | Situation scolaire | Déscolarisation totale = urgence éducative et sociale. |

#### E65 — Besoin d'accompagnant (AESH)
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Oui, besoin identifié mais pas en place" | → A4_CAT_02 | CCC | Soutien | Besoin reconnu mais pas couvert = démarche à engager d'urgence. |

> **Pourquoi pas de rule quand AESH en place ?** Parce que "Oui, déjà en place" = la situation est gérée. Pas de reco nécessaire.

**Total Enfant : 9 rules** (2 CRIT, 4 CCC, 3 STD)

---

### 🟣 HANDICAP (3 questions → 5 rules proposées)

#### N16 — Origine du handicap
| Réponse | Rule | Niveau | Catégorie | Justification |
|---|---|---|---|---|
| Aucune rule | — | — | — | Question de contexte pur. L'origine ne change pas l'action clinique immédiate. |

> **Pourquoi 0 rule ?** N16 est informatif — l'origine (naissance, maladie, accident) contextualise mais ne déclenche pas d'action différente. C'est utilisé pour adapter le wording, pas pour activer une reco.

#### N17 — Type de handicap (choix multiple)
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Handicap psychique" OU "Troubles du comportement" | → M4_CAT_01 | Standard | Suivi psy | Handicap psychique = vérifier le suivi spécialisé. |
| ≥ 3 types cochés | → F5_CAT_01 | CCC | Dépendance | Poly-handicap = complexité majeure, coordination renforcée nécessaire. |

#### N30 — Taux d'incapacité
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Supérieur ou égal à 80%" | → A2_CAT_01 | Standard | Droits et aides | Taux ≥ 80% = droits spécifiques (AAH, PCH). Vérifier que l'aidant les connaît. |
| "Inférieur à 50%" | → A2_CAT_02 | Standard | Évaluation dépendance | Taux < 50% → encourager une réévaluation (souvent sous-évalué). |
| "Je ne sais pas" | → A2_CAT_01 | Standard | Droits et aides | L'aidant ne connaît pas les droits → informer. |

**Total Handicap : 5 rules** (0 CRIT, 1 CCC, 4 STD)

---

### 🟠 PERSONNE ÂGÉE (3 questions → 6 rules proposées)

#### O53 — Évaluation AGGIR
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Non" | → A2_CAT_02 | Standard | Évaluation dépendance | Pas d'évaluation AGGIR = pas d'APA possible. Démarche à engager. |
| "Je ne sais pas" | → A2_CAT_02 | Standard | Évaluation dépendance | Méconnaissance → informer sur l'évaluation. |

#### O54 — Niveau GIR
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "1" ou "2" | → F2_CAT_01 | Critique | Autonomie/aide | GIR 1-2 = dépendance totale. Aide humaine permanente nécessaire. |
| "3" ou "4" | → F2_CAT_01 | Standard | Autonomie/aide | GIR 3-4 = perte d'autonomie partielle. Aide à organiser. |

#### E58 — Évaluation gériatrique (choix multiple)
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Non, aucune" | → M6_CAT_01 | Standard | Vision globale | Personne âgée sans bilan gériatrique = manque de vision globale. |
| "Oui, bilan de chutes" | → F6_CAT_01 | Standard | Chutes | Bilan fait → s'assurer que les recommandations sont appliquées. |

**Total Personne Âgée : 6 rules** (1 CRIT, 0 CCC, 5 STD)

---

### 🔴 PSY (2 questions → 7 rules proposées)

#### E48 — Cadre de suivi psy (choix multiple)
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Aucun suivi actuellement" | → M4_CAT_01 | Critique | Suivi spécialisé | Troubles psychiques sans aucun suivi = danger. |
| "Médecin généraliste" seul | → M4_CAT_01 | CCC | Suivi spécialisé | MG seul pour troubles psy = suivi insuffisant, orientation nécessaire. |
| "Hôpital de jour / centre de crise" | → M3_CAT_01 | Standard | Urgences | Suivi en centre de crise = surveiller la stabilité. |

> **Pourquoi CRIT pour "aucun suivi" ?** Contrairement à l'addiction (où le refus de soins peut être un choix), les troubles psychiques sans suivi représentent un risque de décompensation documenté.

#### E50 — Compliance au traitement
| Réponse | Rule proposée | Niveau | Catégorie cible | Justification |
|---|---|---|---|---|
| "Oui, mais irrégulier" | → M4_CAT_01 | CCC | Suivi spécialisé | Observance irrégulière = risque de rechute élevé. |
| "Non, pas de suivi/traitement" | → M4_CAT_01 | Critique | Suivi spécialisé | Confirme E48. Double signal = urgence maximale. |
| "Je ne sais pas" | → M1_CAT_01 | Standard | Compréhension | L'aidant ne sait pas → clarifier avec le professionnel. |
| CCC : E50="Non" + E48 contient "Aucun suivi" | → M4_CAT_01 | Critique | Suivi spécialisé | Double absence (suivi + traitement) = CCC maximale. |

**Total Psy : 7 rules** (3 CRIT, 2 CCC, 2 STD)

---

## Synthèse

| Overlay | Questions | Rules proposées | CRIT | CCC | STD |
|---|---|---|---|---|---|
| Addiction | 7 | 10 | 2 | 3 | 5 |
| Enfant | 5 | 9 | 2 | 4 | 3 |
| Handicap | 3 | 5 | 0 | 1 | 4 |
| Personne Âgée | 3 | 6 | 1 | 0 | 5 |
| Psy | 2 | 7 | 3 | 2 | 2 |
| **TOTAL** | **20** | **37** | **8** | **10** | **19** |

### Pourquoi 37 et pas 40 ?

- **N16** (origine handicap) : 0 rule car purement contextuel — l'origine ne déclenche aucune action différente
- **N37** (type addiction) : 1 seule rule (poly-addiction) car le type spécifique est informatif, pas décisionnel
- **E60** (professionnels enfant) : 1 seule rule (aucun pro) car la liste est une cartographie

### Pourquoi pas plus ?

On aurait pu créer des rules plus fines (ex: N37="Alcool" → rule spécifique alcool vs N37="Jeux" → rule spécifique jeux). **Je ne le recommande pas** parce que :
1. Les catégories de reco actuelles ne différencient pas par substance
2. Ça nécessiterait des MTs spécifiques par substance (qui n'existent pas)
3. C'est une phase 2 si le volume d'aidants addiction justifie la granularité

---

## Impact produit Monka

| Avant | Après |
|---|---|
| 20 questions posées → 0 reco spécifique | 20 questions → 37 rules → recos adaptées au profil |
| Aidant addiction = même sortie que aidant PA | Aidant addiction = recos M4/F5 activées par ses réponses |
| GIR 1-2 → aucun effet | GIR 1-2 → CRIT sur aide humaine |
| Enfant non orienté TND → rien | Enfant non orienté → CRIT accès soins |
| Troubles psy sans suivi → rien | Troubles psy sans suivi → CRIT immédiat |

### Ce que ça permet concrètement

1. **Personnalisation réelle** — le moteur n'est plus aveugle au type d'aidance
2. **Certification** — chaque question a un objectif clinique traçable
3. **Différenciation produit** — Monka devient le seul outil qui adapte ses recos au type d'aidance
4. **Sécurité clinique** — les situations critiques par profil sont enfin détectées (GIR 1-2, psy sans suivi, déscolarisation)

---

## Prompt de rollback

```
Rollback overlay aidance : supprimer les rules d'activation dont l'ID contient 'OVERLAY'.
Les questions et MTs ne sont pas affectées.
```

---

> 📋 **Document à valider par Dr. Monka avant implémentation des 37 rules.**
