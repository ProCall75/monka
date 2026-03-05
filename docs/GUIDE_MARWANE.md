# Guide Marwane — Rattrapage Contexte (5 mars 2026)

> **Objectif** : Te remettre dans le contexte du travail stratégique fait ces derniers jours. Pas besoin de tout lire — ce doc te guide vers ce qui est important pour toi.

---

## TL;DR — Ce qui s'est passé

Antonin a travaillé sur **4 choses** :
1. **L'architecture du repo** — comment tout est structuré pour que les prestataires puissent intégrer
2. **Le pricing du deal Monka** — combien on facture, pourquoi, basé sur quelles données
3. **Le levier IA** — quantifier notre avantage avec des études réelles (pas du pif)
4. **La proposition commerciale** — 3 variantes d'offre pour le call avec Etienne vendredi 14h

**Ton travail est massivement valorisé dans ces docs** — mais Antonin a estimé ton scope à ta place. Il a besoin que tu relises et que tu corriges/complètes.

---

## Ce que tu DOIS lire (30 min max)

### 1. `docs/PROPOSITION_MONKA.md` ⭐ PRIORITÉ #1

**C'est le doc central.** Il contient :
- Ce qu'on a livré (tes livrables sont listés en détail — **section PILIER 2**)
- La double roadmap Moteur (Antonin) + UI/UX (toi) — **M1→M3 + P1→P3**
- Les 3 variantes de prix (~120-150K€ sur 9-12 mois)
- Les arguments pour le call vendredi

**Ce que tu dois vérifier** :
- [ ] Est-ce que la liste de tes livrables (section PILIER 2) est complète ? Il manque des trucs ?
- [ ] Ta roadmap P1→P3 — est-ce que les phases et les livrables sont corrects ?
- [ ] Les estimations de temps — est-ce réaliste ?

### 2. `docs/LEVIER_IA_PRAGMA.md` — Lire la section 2 uniquement

**Section 2** = le décompte de tes heures. Antonin a estimé 140h pour ton mois 1. 

**Ce que tu dois vérifier** :
- [ ] 140h c'est correct ? Plus ? Moins ?
- [ ] Le détail par activité (audit UX 35h, interviews 15h, design system 45h, architecture UI 20h, itérations Maël 15h, présentations 10h) — ça te parle ?

---

## Ce que tu PEUX lire si tu veux comprendre le contexte (optionnel)

### 3. `docs/PRICING_DEAL_PRAGMA.md` — Le raisonnement pricing

C'est le doc interne qui explique COMMENT on est arrivé aux prix. Contient :
- Le point de départ (4 Excel + 15 Word = ce qu'avait Monka avant nous)
- Les TJM marché France 2025 sourcés (dev senior = 643€/jour, UX = 500-700€/jour)
- La valeur marché de ce qu'on a livré = **60-85K€** (freelance) / **100-150K€** (agence)
- La structure de pricing recommandée

**Tu n'as pas besoin de tout lire** — juste la section 3 (données dures) si tu veux comprendre d'où viennent les chiffres.

### 4. `docs/ARCHITECTURE_REFLEXION.md` — L'architecture du repo

702 lignes. C'est le doc de réflexion sur comment structurer le repo pour que les prestataires puissent intégrer. **Option F choisie** = 3 piliers (moteur + proto + DB).

**Ce qui te concerne** : 
- La section sur ton scope (lignes 34-76) — Antonin a détaillé ce que tu fais et pourquoi c'est critique
- Le mapping DB→Moteur→Proto (lignes 558-575) — comment tes composants se connectent au moteur
- L'espace `proto/` qui est prévu pour toi dans l'architecture

**Tu n'as PAS besoin de lire** les 6 options d'architecture ni les phases 2-5. C'est de l'analyse interne.

---

## Ce que tu n'as PAS besoin de lire

| Doc | Pourquoi tu peux skip |
|---|---|
| `docs/ROADMAP_GAP_ANALYSIS.md` | C'est le gap analysis normative — la partie standards/certification c'est Antonin |
| `docs/CONTEXTE.md` | Tu connais déjà le contexte Monka |
| `docs/PREREQUIS_PRESTATAIRES_EXTERNES.md` | Les 16 livrables normatifs pour les prestataires — c'est côté moteur/doc |
| Les workflows `.agent/workflows/` | Outils internes d'Antonin pour le dev avec l'IA |

---

## Ce qu'on attend de toi

### Avant vendredi 14h (call avec Etienne)

1. **Relire PROPOSITION_MONKA.md** et valider/corriger tes livrables et ta roadmap
2. **Donner tes heures réelles** du mois 1 (pour affiner le levier IA)
3. **Lister ce qui manque** dans tes livrables — des trucs qu'Antonin n'a pas mentionnés
4. **Donner ton avis sur le prix** — ~120-150K€ sur 9-12 mois, ça te semble juste ?

### Après le call

5. **Détailler ta roadmap P1→P3** dans un doc ou directement dans le repo
6. **Documenter ce qui reste à faire** côté UI/UX avec plus de granularité
7. Ça va permettre de bétonner la proposition avec TES données, pas les estimations d'Antonin

---

## Les docs dans l'ordre de création

| # | Fichier | Quoi | Date |
|---|---|---|---|
| 1 | `docs/CONTEXTE.md` | Contexte entreprise + objectif stratégique #1 | 4 mars |
| 2 | `docs/ARCHITECTURE_REFLEXION.md` | Réflexion architecture repo (6 options → Option F) | 4 mars |
| 3 | `docs/ROADMAP_GAP_ANALYSIS.md` | Gap analysis normative + capacité PRAGMA | 4 mars |
| 4 | `docs/PREREQUIS_PRESTATAIRES_EXTERNES.md` | 16 livrables pour les prestataires externes | 4 mars |
| 5 | `docs/PRICING_DEAL_PRAGMA.md` | Raisonnement pricing interne (TJM, valeur marché) | 4-5 mars |
| 6 | `docs/LEVIER_IA_PRAGMA.md` | Quantification du levier IA (GitHub, McKinsey, TJM) | 5 mars |
| 7 | `docs/PROPOSITION_MONKA.md` | **Proposition commerciale 3 variantes** | 5 mars |
| 8 | **Ce doc** | Guide de rattrapage pour toi | 5 mars |

---

*Antonin — 5 mars 2026*
