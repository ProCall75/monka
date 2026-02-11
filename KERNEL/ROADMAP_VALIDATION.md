# 🗺️ Roadmap de Validation — KERNEL Monka

> **Date** : 11/02/2026
> **Destinataire** : Dr. Monka (validation clinique)
> **Contexte** : 25 templates produits (V1-V5), prêts pour relecture et validation

---

## Phase 1 — Validation des données legacy (Priorité 🔴)

> Objectif : confirmer que les données extraites du CAT Excel sont fidèles à l'original.

| # | Action | Templates | Volume | Statut |
|---|---|---|---|---|
| 1.1 | Valider les **règles d'activation** (A) | V1→V5 A_activation.md | 68 règles | ⬜ |
| 1.2 | Valider les **recos legacy** (B) | V1→V5 B_recos_variations.md | ~30 recos legacy | ⬜ |
| 1.3 | Valider les **MTs legacy** (C) — libellés et types | V1→V5 C_master_mt_asr.md | 263 MTs | ⬜ |
| 1.4 | Valider les **questions de suivi** (D) | V1→V5 D_suivi.md | 22 N3 questions | ⬜ |
| 1.5 | Valider les **questions scorantes** (E) | V1→V5 E_scoring.md + E_GLOBAL | 38 questions, max 75 | ⬜ |

**Livrable** : Fiche de validation signée sur chaque template A-E par vulnérabilité.

---

## Phase 2 — Validation des propositions IA (Priorité 🟠)

> Objectif : accepter, modifier ou rejeter les éléments proposés par l'IA (marqués 🤖).

| # | Action | Éléments à valider | Volume |
|---|---|---|---|
| 2.1 | Valider les **recos ia_reformulé** | V1-V5 B_recos_variations.md | ~72 recos IA |
| 2.2 | Valider les **acteurs proposés** (colonne Acteur 🤖) | V1-V5 C_master_mt_asr.md | 263 MTs |
| 2.3 | Valider les **domaines proposés** (colonne Domaine 🤖) | V1-V5 C_master_mt_asr.md | 263 MTs |
| 2.4 | Valider les **seuils de scoring** (🟢🟡🟠🔴) | V1-V5 E_scoring.md + E_GLOBAL | 5+1 grilles |

**Conseil** : Commencer par V5 (la plus légère) pour calibrer le processus, puis V1, V3, V4, V2.

---

## Phase 3 — Résolution des anomalies identifiées (Priorité 🟡)

> Objectif : traiter les cas limites et incohérences flaggés dans les templates.

| # | Anomalie | Fichier | Question pour Dr. Monka |
|---|---|---|---|
| 3.1 | **V4 M6** — aucune règle d'activation | V4 A_activation.md | Comment assigner les 6 recos de M6 ? |
| 3.2 | **V5 A2/A3** — aucune MT rattachée | V5 C_master_mt_asr.md | Faut-il créer des MTs pour ces MPs ? |
| 3.3 | **V5 A4 / V3 S4** — que des MTs INFO/ORGA | V5/V3 C_master_mt_asr.md | L'ASR peut-elle être validée autrement ? |
| 3.4 | **V5 E64/E65** — classées « etat » mais non scorantes | V5 E_scoring.md | Doivent-elles être scorantes ? |
| 3.5 | **E21 partagée** (V3 + V5) | E_GLOBAL | Le score compte-t-il 2 fois ? |
| 3.6 | **V2 poids 29%** du score global | E_GLOBAL | Pondération justifiée ou à rééquilibrer ? |

---

## Phase 4 — Calibration du scoring (Priorité 🟢)

> Objectif : affiner les seuils et pondérations à partir de données réelles.

| # | Action | Détail |
|---|---|---|
| 4.1 | **Tester sur 10 profils réels** | Appliquer le scoring aux 10 premiers aidants Monka |
| 4.2 | **Ajuster les seuils** | Si nécessaire, modifier les bornes 🟢🟡🟠🔴 |
| 4.3 | **Documenter les pondérations** | Détailler le +1/+2 exact pour chaque réponse |
| 4.4 | **Valider le profil radar** | Confirmer la lisibilité du rendu 5 axes |

---

## Ordre de lecture recommandé

```
1. V5 (la plus légère — 5 recos, 6 MTs) → calibration du processus
2. V1 (la plus documentée — 5 fichiers séparés dès le départ)
3. V3 (santé aidant — thème clinique central)
4. V4 (la plus massive — 100 MTs, 32 recos)
5. V2 (la plus lourde en scoring — 22 max)
6. E_GLOBAL (synthèse finale)
```

---

## Timeline proposée

| Semaine | Actions |
|---|---|
| **S1** (17-21 fév) | Phase 1 : validation données legacy V5, V1, V3 |
| **S2** (24-28 fév) | Phase 1 suite : V4, V2 + Phase 2 début |
| **S3** (3-7 mars) | Phase 2 : recos IA, acteurs, domaines |
| **S4** (10-14 mars) | Phase 3 : anomalies + Phase 4 : calibration |
| **S5** (17-21 mars) | Revue finale E_GLOBAL + signature |
