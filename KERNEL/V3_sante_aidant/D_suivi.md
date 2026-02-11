# 📄 TEMPLATE D — Suivi Dynamique — V3 Santé de l'Aidant

> **Vulnérabilité** : V3 — Santé de l'Aidant
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées
> **Dépendance** : Template A + Template C

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V3 — Santé de l'Aidant |
| Nombre de MP | 4 |
| Questions de suivi N3 | 4 |
| Questions initiales réouvrables | 26 |

---

## Rappel — Entonnoir de suivi

```
N1 : « Des changements depuis le dernier suivi ? » → Oui/Non
  └── OUI ↓

N2 : « Changements dans V3 — Santé de l'Aidant ? » → Oui/Non
  └── OUI ↓

N3 : 1 question par MP ci-dessous
```

---

## Question N2 — Vulnérabilité

| ID | Libellé | Réponses | Source |
|---|---|---|---|
| S_V3 | Y a-t-il eu des changements concernant votre santé ? | Oui / Non | Legacy ✅ |

---

## Questions N3 — Par Micro-Parcours

### MP S1 — Charge, fatigue et risque d'épuisement

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_S1 |
| **Libellé** | Y a-t-il eu des changements concernant : charge, fatigue et risque d'épuisement ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E7 | À quel point vous sentez-vous épuisé·e par votre rôle d'aidant ? | etat |
| 2 | E10 | Sur le plan moral (stress, inquiétude), où vous situez-vous ? | etat |
| 3 | E11 | Pensez-vous pouvoir continuer dans les 6 prochains mois ? | etat |
| 4 | E14 | Et au cours des 30 derniers jours ? (jours d'arrêt) | facteur |
| 5 | N8 | Arrêt de travail lié au rôle d'aidant ? | facteur |
| 6 | O29 | Retentissement sur votre santé ? | etat |
| 7 | O32 | Souhaitez-vous être davantage aidé(e) ? | etat |
| 8 | O33 | Ressentez-vous une charge ? | etat |
| 9 | O50 | Combien de temps lui consacrez-vous ? | facteur |

---

### MP S2 — Inquiétudes pour la sécurité

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_S2 |
| **Libellé** | Y a-t-il eu des changements concernant : inquiétudes pour la sécurité ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E8 | Sentiment d'être seul(e) émotionnellement ? | etat |
| 2 | E9 | Parvenez-vous à avoir du temps pour vous ? | etat |
| 3 | E12 | Inquiet que votre proche se fasse du mal ? | etat |
| 4 | E13 | Inquiet que votre proche mette d'autres en danger ? | etat |

---

### MP S3 — Santé physique et renoncement aux soins

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_S3 |
| **Libellé** | Y a-t-il eu des changements concernant : santé physique et renoncement aux soins ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E18 | Qualité de votre sommeil ces dernières semaines ? | etat |
| 2 | O37 | Dernier RDV Dermatologue | facteur |
| 3 | O38 | Dernier RDV Gynécologue | facteur |
| 4 | O39 | Dernier RDV Cardiologue | facteur |
| 5 | O40 | Dernier RDV Endocrinologue | facteur |
| 6 | O41 | Dernier RDV Pneumologue | facteur |
| 7 | O42 | Dernier RDV Neurologue | facteur |
| 8 | O43 | Dernier RDV Gériatre | facteur |
| 9 | O44 | Votre santé par rapport à une personne du même âge | etat |

---

### MP S4 — Hygiène de vie (activité et sommeil)

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_S4 |
| **Libellé** | Y a-t-il eu des changements concernant : hygiène de vie (activité et sommeil) ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E15 | Difficultés à obtenir des RDV médicaux pour vous-même ? | etat |
| 2 | E16 | Depuis que vous êtes aidant, vos propres RDV médicaux… | etat |
| 3 | E17 | Activité physique régulière ? | facteur |
| 4 | E19 | Principaux soucis de santé actuels ? | etat |

---

> ✅ **100% des questions de suivi V3 sont legacy.**
