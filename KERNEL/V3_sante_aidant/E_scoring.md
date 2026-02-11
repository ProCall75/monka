# 📄 TEMPLATE E — Scoring — V3 Santé de l'Aidant

> **Vulnérabilité** : V3 — Santé de l'Aidant
> **Date de production** : 11/02/2026
> **Statut** : 🟡 À valider par Dr. Monka — barème complet, seuils IA
> **Règles KERNEL** : K13 (scoring indépendant de l'activation)
> **Source pondérations** : `typologie_ccc_scoring.json` (legacy — Doc Word Dr. Rimaud)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V3 — Santé de l'Aidant |
| Questions totales V3 | ~21 |
| Questions scorantes | 10 |
| Score max | 20 |

---

## Barème complet — Réponse → Score

> 🤖 **Décision IA** : Pondérations extraites intégralement du legacy. E9 est binaire (0/2) car l'absence de temps personnel est un signal d'alerte fort, sans état intermédiaire dans le questionnaire.

### O29 — Retentissement sur votre propre santé

| Réponse | Score |
|---|---|
| Pas du tout | **0** |
| Un peu | **+1** |
| Oui | **+2** |

### O33 — Ressentez-vous une charge ?

| Réponse | Score |
|---|---|
| Pas du tout | **0** |
| Un peu | **+1** |
| Oui | **+2** |

### E7 — Épuisement lié au rôle d'aidant

| Réponse | Score |
|---|---|
| Pas du tout fatigué·e | **0** |
| Un peu | **+1** |
| Très fatigué·e / Épuisé·e | **+2** |

### E8 — Sentiment de solitude émotionnelle

| Réponse | Score |
|---|---|
| Jamais | **0** |
| Parfois | **+1** |
| Souvent / tout le temps | **+2** |

### E9 — Temps pour vous dans une semaine

| Réponse | Score |
|---|---|
| Oui | **0** |
| Non | **+2** |

> ⚠️ **Note** : E9 est binaire (0 ou 2, pas de +1). L'absence totale de temps personnel est un signal d'alerte fort.

### E10 — Sur le plan moral (stress, inquiétude)

| Réponse | Score |
|---|---|
| Ça va globalement | **0** |
| Parfois stressé·e / inquiet·e | **+1** |
| Souvent débordé·e / submergé·e | **+2** |

### E11 — Capacité à continuer dans les 6 prochains mois

| Réponse | Score |
|---|---|
| Oui, sans difficulté | **0** |
| Difficile / incertain | **+1** |
| Non, je risque de ne plus y arriver | **+2** |

### O44 — Votre santé par rapport à une personne du même âge

| Réponse | Score |
|---|---|
| Meilleure | **0** |
| Identique | **+1** |
| Moins bonne | **+2** |

### E18 — Qualité de votre sommeil

| Réponse | Score |
|---|---|
| Bonne | **0** |
| Correcte | **+1** |
| Mauvaise / très mauvaise | **+2** |

### O6 — Chute dans les 6 derniers mois (aidant)

| Réponse | Score |
|---|---|
| Non | **0** |
| Oui, sans gravité | **+1** |
| Oui, avec complication / plusieurs chutes | **+2** |

---

## Vérification du score max

| Question | Score max | Type |
|---|---|---|
| O29 | 2 | 3 niveaux |
| O33 | 2 | 3 niveaux |
| E7 | 2 | 3 niveaux |
| E8 | 2 | 3 niveaux |
| E9 | 2 | Binaire |
| E10 | 2 | 3 niveaux |
| E11 | 2 | 3 niveaux |
| O44 | 2 | 3 niveaux |
| E18 | 2 | 3 niveaux |
| O6 | 2 | 3 niveaux |
| **TOTAL** | **20** | ✅ Conforme au legacy |

---

## Seuils d'interprétation

| Niveau | Plage | % du max | Signification | Source |
|---|---|---|---|---|
| 🟢 Faible | 0 – 5 | 0-25% | Santé de l'aidant préservée | IA 🤖 |
| 🟡 Modéré | 6 – 10 | 30-50% | Risque d'épuisement modéré | IA 🤖 |
| 🟠 Élevé | 11 – 15 | 55-75% | Épuisement probable — actions prioritaires | IA 🤖 |
| 🔴 Critique | 16 – 20 | 80-100% | Épuisement avancé — intervention urgente | IA 🤖 |

> 🤖 **Décision IA** : Legacy utilise 3 niveaux (🟢 0-6 / 🟠 7-13 / 🔴 14-20). J'ai ajouté un niveau 🟡 pour plus de granularité.

---

## Questions NON scorantes — V3

| # | Question ID | Libellé | Classification | Pourquoi non-scorante |
|---|---|---|---|---|
| 1 | E14 | Jours d'arrêt sur 30 jours | facteur | Compteur factuel |
| 2 | E17 | Activité physique régulière | facteur | Habitude |
| 3 | N8 | Arrêt de travail lié au rôle | facteur | Événement passé |
| 4 | O49 | Durée d'aidance | descriptive | Circonstance fixe |
| 5 | O50 | Temps consacré au proche | facteur | Donnée quantitative |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les seuils d'interprétation (4 niveaux vs 3 legacy)
> - Confirmer que les pondérations legacy sont toujours d'actualité
