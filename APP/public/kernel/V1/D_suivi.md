# 📄 TEMPLATE D — Suivi Dynamique — V1 Social & Relationnel

> **Vulnérabilité** : V1 — Social & Relationnel
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées
> **Dépendance** : Template A + Template C

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V1 — Social & Relationnel |
| Nombre de MP | 4 |
| Questions de suivi N3 | 4 |
| Questions initiales réouvrables | 15 |

---

## Rappel — Entonnoir de suivi

```
N1 : « Des changements depuis le dernier suivi ? » → Oui/Non
  └── OUI ↓

N2 : « Changements dans V1 — Social & Relationnel ? » → Oui/Non
  └── OUI ↓

N3 : 1 question par MP ci-dessous
```

---

## Question N2 — Vulnérabilité

| ID | Libellé | Réponses | Source |
|---|---|---|---|
| S_V1 | Y a-t-il eu des changements concernant votre entourage et vos relations ? | Oui / Non | Legacy ✅ |

---

## Questions N3 — Par Micro-Parcours

### MP R1 — Impact sur la vie personnelle et professionnelle

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_R1 |
| **Libellé** | Y a-t-il eu des changements concernant : impact sur la vie personnelle et professionnelle ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | N7 | Avez-vous dû aménager votre activité professionnelle ? | facteur |
| 2 | O27 | Difficultés dans votre vie familiale ? | facteur et etat |
| 3 | O28 | Difficultés dans vos relations amis/loisirs/travail ? | facteur et etat |

---

### MP R2 — Soutien de l'entourage et partage de l'aide

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_R2 |
| **Libellé** | Y a-t-il eu des changements concernant : soutien de l'entourage et partage de l'aide ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E1 | Comment se passe la répartition de l'aide ? | facteur |
| 2 | E2 | Avez-vous des personnes sur qui compter ? | facteur |
| 3 | E3 | Quelles autres personnes à charge ? | facteur |
| 4 | N4 | Êtes-vous seul(e) à vous occuper de la personne aidée ? | facteur |

---

### MP R3 — Isolement social de la personne aidée

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_R3 |
| **Libellé** | Y a-t-il eu des changements concernant : isolement social de la personne aidée ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | N20 | Difficultés à maintenir des relations sociales stables ? | facteur |
| 2 | O47 | À combien de temps habitez-vous du domicile ? | facteur |
| 3 | O48 | Quelle est la fréquence de vos visites ? | facteur |

---

### MP R4 — Relation aidant / proche et acceptation de l'aide

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_R4 |
| **Libellé** | Y a-t-il eu des changements concernant : relation aidant / proche et acceptation de l'aide ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E4 | Comment a évolué votre relation ? | etat |
| 2 | E5 | Tensions ou désaccords concernant la prise en charge ? | etat |
| 3 | E6 | Accepte-t-il l'aide de personnes extérieures ? | facteur |
| 4 | O30 | Sentiment de ne plus reconnaître la personne aidée ? | facteur et etat |
| 5 | O31 | Avez-vous peur pour l'avenir ? | facteur et etat |

---

> ✅ **100% des questions de suivi V1 sont legacy.**
