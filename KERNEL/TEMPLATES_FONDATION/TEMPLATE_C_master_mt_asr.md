# 📄 TEMPLATE C — Master Micro-Tâches & ASR

> **Vulnérabilité** : [V?] — [Nom de la vulnérabilité]
> **Date de production** : [JJ/MM/AAAA]
> **Statut** : 🟡 Proposition IA — en attente de certification Dr. Monka
> **Règles KERNEL** : K9 (1 MP = 1 ASR), K10 (2 catégories), K11 (100% contributives = ASR), K12 (pas tous les types obligatoires)
> **Rôle** : SOURCE DE VÉRITÉ pour les MT. Le Template B ne fait que les référencer.

---

## Métadonnées

| Clé | Valeur |
|---|---|
| Vulnérabilité | [V?] — [Nom] |
| Nombre de MP | [X] |
| Nombre total de MT | [X] |
| dont 📍 contributives (STRUC/SEC/MED) | [X] |
| dont 💡 non-contributives (INFO/ORGA) | [X] |

### Répartition par type

| Type | Code | Catégorie | Count |
|---|---|---|---|
| Structurel | STRUC | 📍 Sécurisation | [X] |
| Sécurité / Médico-social | SEC | 📍 Sécurisation | [X] |
| Médical | MED | 📍 Sécurisation | [X] |
| Information | INFO | 💡 Amélioration | [X] |
| Organisationnel | ORGA | 💡 Amélioration | [X] |

---

<!-- RÉPÉTER CE BLOC POUR CHAQUE MP DE LA V -->

## MP [MP_ID] — [Nom du Micro-Parcours]

### 🏆 ASR (Objectif)

> « [Changement d'état attendu — formulation orientée résultat, pas tâche] »

### 📍 MT Contributives — Actions de Sécurisation

> Complétées à 100% = ASR validée ✅ (K11)

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco parente | Source |
|---|---|---|---|---|---|---|---|
| 1 | [ID] | [Action concrète] | STRUC / SEC / MED | [Qui fait] | 🏥 Médical / 🤝 Médico-social | [RECO_ID] | Legacy ✅ / IA 🤖 |
| ... | | | | | | | |

**Condition de validation** : [X] MT contributives → 100% complétées = **ASR validée** ✅

### 💡 MT Non-Contributives — Actions d'Amélioration

> N'impactent pas l'ASR. Améliorent la qualité de vie.

| # | MT_ID | Libellé | Type | Acteur | Domaine | Reco parente | Source |
|---|---|---|---|---|---|---|---|
| 1 | [ID] | [Action complémentaire] | INFO / ORGA | [Qui fait] | 🏥 / 🤝 | [RECO_ID] | Legacy ✅ / IA 🤖 |
| ... | | | | | | | |

### Barre de progression

```
[░░░░░░░░░░] 0/[X] contributives → ASR ❌
[████░░░░░░] 2/[X] contributives → En cours
[██████████] [X]/[X] contributives → ASR ✅
```

### Question de suivi N3

> **ID** : [SUIVI_ID]
> **Libellé** : « Changements concernant [sujet du MP] ? »
> **Si Oui →** réouvre les questions : [Q_ID, Q_ID, Q_ID, ...]

---

<!-- FIN DU BLOC PAR MP — RÉPÉTER POUR CHAQUE MP -->

## Légende

| Badge | Signification |
|---|---|
| Legacy ✅ | MT issue du CAT Excel — validée |
| IA 🤖 | MT proposée par l'IA — **à valider par Dr. Monka** |
| 🏥 Médical | Domaine médical (médecin, spécialiste, hôpital) |
| 🤝 Médico-social | Domaine médico-social (IDEC, SAD, associations) |

---

> ⚠️ **À VALIDER PAR DR. MONKA** :
> - La classification des MT par type (STRUC/SEC/MED/INFO/ORGA) détermine la progression ASR
> - Le domaine (🏥/🤝) impacte l'orientation professionnelle
> - Les acteurs proposés sont des suggestions à confirmer
