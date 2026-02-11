# 📄 TEMPLATE D — Suivi Dynamique — V5 Administratif & Juridique

> **Vulnérabilité** : V5 — Administratif & Juridique
> **Date de production** : 11/02/2026
> **Statut** : 🟢 Données legacy — certifiées
> **Dépendance** : Template A + Template C

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | V5 — Administratif & Juridique |
| Nombre de MP | 4 |
| Questions de suivi N3 | 4 |
| Questions initiales réouvrables | 22 |

---

## Rappel — Entonnoir de suivi

```
N1 : « Des changements depuis le dernier suivi ? » → Oui/Non
  └── OUI ↓

N2 : « Changements dans V5 — Administratif ? » → Oui/Non
  └── OUI ↓

N3 : 1 question par MP ci-dessous
```

---

## Question N2 — Vulnérabilité

| ID | Libellé | Réponses | Source |
|---|---|---|---|
| S_V5 | Y a-t-il eu des changements concernant les démarches administratives ? | Oui / Non | Legacy ✅ |

---

## Questions N3 — Par Micro-Parcours

### MP A1 — Couverture santé et protections juridiques

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_A1 |
| **Libellé** | Y a-t-il eu des changements concernant : couverture santé et protections juridiques ? |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E21 | Maintien situation de vie sans changement ? | etat |
| 2 | E68 | Temps consacré aux démarches administratives | facteur |
| 3 | O23 | Couverture maladie complémentaire | facteur |
| 4 | O45 | Mesure de protection juridique | facteur |

---

### MP A2 — Droits, aides et évaluation dépendance

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_A2 |
| **Libellé** | Y a-t-il eu des changements concernant : droits, aides et évaluation dépendance ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E62 | Droits/aides demandées | facteur |
| 2 | N29 | Aides financières reçues | facteur |
| 3 | N42 | Prestations handicap | facteur |
| 4 | O53 | Évaluation dépendance AGGIR | facteur |
| 5 | O54 | Classement GIR | facteur |

---

### MP A3 — Charge et complexité des démarches

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_A3 |
| **Libellé** | Y a-t-il eu des changements concernant : charge et complexité des démarches ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E61 | Directives anticipées | facteur |
| 2 | E66 | Complexité des démarches ressentie | etat |
| 3 | E69 | Information suffisante sur les droits | etat |
| 4 | E70 | Renoncement à des démarches | etat |
| 5 | N6 | Accompagnement dans les démarches | facteur |

---

### MP A4 — Situation scolaire/professionnelle et budget

| Champ | Valeur |
|---|---|
| **Question N3 ID** | S_A4 |
| **Libellé** | Y a-t-il eu des changements concernant : situation scolaire/professionnelle et budget ? |
| **Source** | Legacy ✅ |

**Si Oui → Réouverture :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | E63 | Situation professionnelle de l'aidant | facteur |
| 2 | E64 | Impact financier du rôle d'aidant | etat |
| 3 | E65 | Budget du ménage | etat |
| 4 | E67 | Situation scolaire | facteur |
| 5 | N5 | Revenus du ménage | facteur |
| 6 | N43 | Aides de la mutuelle | facteur |
| 7 | O61 | Reste à charge | facteur |

---

> ✅ **100% des questions de suivi V5 sont legacy.**
