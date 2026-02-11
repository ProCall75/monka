# 📄 TEMPLATE D — Suivi Dynamique — V4 Parcours Médical du Proche

> **Vulnérabilité** : V4 — Parcours Médical du Proche
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées
> **Dépendance** : Template A + Template C

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V4 — Parcours Médical du Proche |
| Nombre de MP | 6 |
| Questions de suivi N3 | 6 |
| Questions initiales réouvrables | 38 |

---

## Rappel — Entonnoir de suivi

```
N1 : « Des changements depuis le dernier suivi ? » → Oui/Non
  └── OUI ↓

N2 : « Changements dans V4 — Parcours Médical ? » → Oui/Non
  └── OUI ↓

N3 : 1 question par MP ci-dessous
```

---

## Question N2 — Vulnérabilité

| ID | Libellé | Réponses | Source |
|---|---|---|---|
| S_V4 | Y a-t-il eu des changements concernant le parcours médical de votre proche ? | Oui / Non | Legacy ✅ |

---

## Questions N3 — Par Micro-Parcours

### MP M1 — Compréhension du diagnostic

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_M1 |
| **Libellé** | Y a-t-il eu des changements concernant : compréhension du diagnostic et de la maladie ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé |
|---|---|---|
| 1 | E34 | De quelle(s) maladie(s) souffre votre proche ? |
| 2 | E35 | Le diagnostic a-t-il été posé de manière claire ? |
| 3 | E36 | Nombre important d'examens sans clarification ? |
| 4 | E37 | Avis médicaux contradictoires ? |
| 5 | E38 | Passage pédiatrie/adulte s'est bien passé ? |
| 6 | N17 | Pathologie du proche ? |
| 7 | N41 | Situation handicap ? |

---

### MP M2 — Accès aux soins

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_M2 |
| **Libellé** | Y a-t-il eu des changements concernant : accès aux soins et aux professionnels ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé |
|---|---|---|
| 1 | E39 | Spécialistes consultés |
| 2 | E40 | Difficultés accès soins |
| 3 | E41 | Professionnels libéraux impliqués |
| 4 | N14 | Médecin traitant identifié |
| 5 | O17 | Suivi spécialisé en cours |
| 6 | O18 | Antécédents médicaux |
| 7 | O19 | Traitements en cours |
| 8 | O20 | Hospitalisations récentes |
| 9 | O21 | Suivi kiné/ergo |
| 10 | O24 | Difficultés trouver professionnels |

---

### MP M3 — Urgences et hospitalisations

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_M3 |
| **Libellé** | Y a-t-il eu des changements concernant : urgences, hospitalisations et continuité ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé |
|---|---|---|
| 1 | E42 | RDV non programmés (3 derniers mois) |
| 2 | E43 | Ruptures dans le suivi médical |
| 3 | E44 | Bilan de synthèse global réalisé |
| 4 | E46 | Accompagnement retour hôpital |

---

### MP M4 — Troubles psychiques et addictions

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_M4 |
| **Libellé** | Y a-t-il eu des changements concernant : troubles psychiques, addictions et suivi ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé |
|---|---|---|
| 1 | E45 | Suivi addictologie |
| 2 | E46 | Accompagnement retour hôpital |
| 3 | E47 | Plan en cas d'aggravation |
| 4 | E48 | Troubles du comportement |
| 5 | E49 | Problèmes d'addiction |
| 6 | E50 | Suivi et traitement troubles |
| 7 | E51 | Observance traitement |

---

### MP M5 — Coordination des soins

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_M5 |
| **Libellé** | Y a-t-il eu des changements concernant : coordination des soins ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé |
|---|---|---|
| 1 | E52 | Quelqu'un coordonne les soins ? |
| 2 | E53 | Qui coordonne les soins ? |
| 3 | E55 | Dossier médical partagé ? |
| 4 | O59 | Aide professionnelle en place |

---

### MP M6 — Plan de soins et évaluations

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_M6 |
| **Libellé** | Y a-t-il eu des changements concernant : plan de soins, évaluations et inquiétudes ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé |
|---|---|---|
| 1 | E54 | Organisation des soins |
| 2 | E56 | Prise en charge adaptée |
| 3 | E57 | Compréhension plan de soins |
| 4 | E58 | Inquiétudes pour l'avenir médical |
| 5 | E59 | Évolution de la situation |
| 6 | E60 | Difficultés remontées |

---

> ✅ **100% des questions de suivi V4 sont legacy.**
