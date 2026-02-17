# Architecture en couches — Kernel V5 → UI

> Source de vérité. Chaque couche du moteur = un niveau de profondeur dans l'interface.
> Dernière mise à jour : 2026-02-16

---

## Les 4 couches

```
VULNÉRABILITÉ (5)                       → HeroCard (C1)
  └── MICRO-PARCOURS (24 total, 3-6/V)  → TaskCard (C2)
        └── RECOMMANDATION (N par MP)    → RecoCard (C3)
              └── MICRO-TÂCHE (actions)  → MicroTaskItem (C4)
```

---

## Couche 1 — Vulnérabilité → `HeroCard`

| ID | Nom | Domaine | MP |
|----|-----|---------|-----|
| V1 | Social & Relationnel | `R` | R1–R4 |
| V2 | Administrative | `A` | A1–A4 |
| V3 | Santé de l'aidant | `S` | S1–S4 |
| V4 | Fragilité du proche | `F` | F1–F6 |
| V5 | Parcours médical | `M` | M1–M6 |

**Jauge** : `activeMP / totalMP` — nombre de micro-parcours actifs dans cette vulnérabilité.

**Props clés** : `domain`, `title`, `subtitle`, `activeMP`, `totalMP`, `targetPerson`

**Navigation** : clic → écran `themeDetail` (liste des TaskCards)

---

## Couche 2 — Micro-Parcours → `TaskCard`

- Un MP peut être **activé** (déclenché par les réponses questionnaire) ou **non activé**.
- Un MP **non activé** = variante **prévention** ⚪ → affiche "Objectif atteint — parcours sécurisé".
- Chaque MP a **1 ASR** (Action Seuil de Réussite) = son objectif mesurable.

**Jauge ASR** : `asrDone / asrTotal` = nombre de MT **contributives** complétées / total MT contributives.

**Props clés** : `title`, `description`, `criticality`, `domain`, `asrDone`, `asrTotal`, `asrProgress`, `isActivated`

**Variantes** :
| Variante | Criticité | Jauge |
|----------|-----------|-------|
| 🔴 Critique | `critical` | Barre ASR active |
| 🟠 CCC | `ccc` | Barre ASR active |
| 🟢 Standard | `standard` | Barre ASR active |
| ⚪ Prévention | `prevention` | "Objectif atteint — parcours sécurisé" (grisé) |

**Navigation** : clic → écran `programDetail` (liste des RecoCards + MicroTaskItems)

---

## Couche 3 — Recommandation → `RecoCard`

- Activée par les règles `SI Q = R ALORS activer`.
- 4 niveaux de criticité : 🔴 Critique · 🟠 CCC · 🟢 Standard · ⚪ Prévention.
- La reco est un **conteneur simple** : badge de criticité + titre + chevron.
- **Pas de jauge** — l'ASR vit au niveau du MP (C2), pas de la reco.

**Props clés** : `title`, `domain`, `urgency`, `onClick`

**Navigation** : clic → déplie la liste des MT triées (contributives d'abord)

---

## Couche 4 — Micro-Tâche → `MicroTaskItem`

Deux catégories :

| Type | Badge | Sous-types | Impact ASR |
|------|-------|-----------|------------|
| **📍 Contributive** | "Pour sécuriser votre situation" | STRUC · SEC · MED | ✅ Fait avancer la jauge ASR |
| **🌿 Non-contributive** | "Pour votre bien-être" | INFO · ORGA | ⏸️ Ne bloque pas l'ASR |

- **ASR validée** = toutes les MT contributives complétées (règle K11).
- Les MT contributives sont affichées **en premier** (tri prioritaire).
- Les MT non-contributives sont de l'accompagnement, elles n'impactent pas la jauge.

**Props clés** : `task` (MicroTask), `onToggle`

---

## Jauge ASR — Résumé

La jauge ASR est **l'indicateur central de progression** d'un micro-parcours.

```
Jauge ASR = MT contributives complétées / MT contributives totales
```

- Seules les MT **contributives** (STRUC, SEC, MED) remplissent la jauge.
- Les MT **non-contributives** (INFO, ORGA) sont affichées mais ne comptent pas.
- **100% contributives = ASR validée** = le MP est sécurisé → affiche "Objectif atteint — parcours sécurisé".

---

## Règle de jauge par composant

| Composant | Sa jauge affiche | Composant UI |
|-----------|-----------------|-------------|
| **Vulnérabilité** | `activeMP / totalMP` | `HeroCard` |
| **Micro-Parcours** | `asrDone / asrTotal` (MT contributives) | `TaskCard` |
| **Recommandation** | ❌ **Pas de jauge** — simple conteneur | `RecoCard` |
| **Micro-Tâche** | Checkbox (fait / pas fait) | `MicroTaskItem` |

---

## Navigation attendue (flux complet)

```
Dashboard (Home)
  └── HeroCard (Vulnérabilité)        ← clic
        └── themeDetail                ← liste des TaskCard (MP)
              └── TaskCard (MP)        ← clic
                    └── programDetail  ← RecoCards + MicroTaskItems
                          └── RecoCard ← clic = déplie les MT
                                └── MicroTaskItem ← toggle

Mon Suivi
  └── Filtre par vulnérabilité (circles)
        └── Liste à plat des RecoCards (raccourci direct)
              └── clic RecoCard → recoDetail (MT de cette reco)
```

---

## Ce que l'app actuelle ne fait PAS (à corriger dans la démo)

1. **"Mon Suivi" saute la couche MP** — affiche directement les recos sans passer par les TaskCards
2. **Pas de TaskCard dans "Mon Suivi"** — on ne voit pas les programmes ni leur progression ASR
3. **Le drill-in depuis Home fonctionne** (themeDetail → programDetail) mais "Mon Suivi" n'a pas cette hiérarchie
4. **Les RecoCards dans "Mon Suivi" n'ont pas de context MP** — on ne sait pas à quel programme elles appartiennent
