# 📄 TEMPLATE D — Suivi Dynamique

> **Vulnérabilité** : [V?] — [Nom de la vulnérabilité]
> **Date de production** : [JJ/MM/AAAA]
> **Statut** : 🟡 Proposition IA — en attente de certification Dr. Monka
> **Règles KERNEL** : Entonnoir 3 niveaux (§3.5 du Kernel)
> **Dépendance** : Template A (questions liées au MP) + Template C (question N3)

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | [V?] — [Nom] |
| Nombre de MP | [X] |
| Questions de suivi N3 | [X] |
| Questions initiales réouvrables | [X] |

---

## Rappel — Entonnoir de suivi (identique pour toutes les V)

```
NIVEAU 1 — Question Générale (1 question, commune à toutes les V)
  « Des changements depuis le dernier suivi ? »
    ├── NON → Fin. RDV mois prochain.
    └── OUI ↓

NIVEAU 2 — Par Vulnérabilité (1 question pour cette V)
  « Changements dans [Nom de la V] ? »
    ├── NON → Fin pour cette V.
    └── OUI ↓

NIVEAU 3 — Par Micro-Parcours (1 question par MP ci-dessous)
```

---

## Questions N2 — Vulnérabilité

| ID | Libellé | Réponses |
|---|---|---|
| [SUIVI_N2_ID] | « Avez-vous constaté des changements concernant [description courte V] ? » | Oui / Non |

---

## Questions N3 — Par Micro-Parcours

<!-- RÉPÉTER CE BLOC POUR CHAQUE MP DE LA V -->

### MP [MP_ID] — [Nom du Micro-Parcours]

| Champ | Valeur |
|---|---|
| **Question N3 ID** | [SUIVI_ID] |
| **Libellé** | « Changements concernant [sujet du MP] ? » |
| **Réponses** | Oui / Non |
| **Source** | Legacy ✅ / IA 🤖 |

**Si Oui → Réouverture des questions initiales :**

| # | Question ID | Libellé | Classification |
|---|---|---|---|
| 1 | [Q_ID] | [Texte court] | état / facteur |
| ... | | | |

> Ces questions sont les mêmes que celles listées dans Template A pour ce MP.

---

<!-- FIN DU BLOC PAR MP — RÉPÉTER POUR CHAQUE MP -->

## Légende Sources

| Badge | Signification |
|---|---|
| Legacy ✅ | Question de suivi existante — validée |
| IA 🤖 | Question de suivi proposée par l'IA — **à valider par Dr. Monka** |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - Les libellés des questions N3 doivent être cliniquement appropriés
> - Les questions réouvertes par un « Oui » doivent être pertinentes (ni trop, ni trop peu)
