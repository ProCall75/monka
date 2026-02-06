# 🚀 Déclencheurs V5 — Administrative

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 7-8)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V5
name: "Administrative"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_declencheurs: 5
```

---

## 🎯 Questions Déclenchantes V5

| ID | Question | Réponse déclenchante | Micro-parcours |
|----|----------|----------------------|----------------|
| **E68** | Temps consacré aux démarches | ≥ 1h/mois | A1 – Saturation administrative |
| **E62** | Droits/aides demandés | Aucun / Je ne sais pas | A2 – Droits non activés |
| **O53** | Évaluation AGGIR | Non / Je ne sais pas | A2 – Droits non activés |
| **E61** | Directives anticipées | Non / Je ne sais pas | A3 – Projection juridique |
| **E21** | Maintien situation de vie | Non / incertain | A1 / A3 |

---

## 📋 Détail des Déclencheurs

### E68 — Temps administratif

**Libellé** : Combien de temps consacrez-vous aux démarches administratives par mois ?

**Réponse déclenchante** : "≥ 1h par mois"

**Effet** : Ouvre MP A1 → Simplification administrative

---

### E62 — Droits/aides demandés

**Libellé** : Pour quels droits/aides avez-vous effectué une demande en cours ?

**Réponse déclenchante** : "Aucun" OU "Je ne sais pas"

**Effet** : Ouvre MP A2 → Activation des droits

---

### O53 — Évaluation AGGIR

**Libellé** : Une évaluation de dépendance AGGIR a-t-elle été réalisée ?

**Réponse déclenchante** : "Non" OU "Je ne sais pas"

**Effet** : Ouvre MP A2 → Évaluation dépendance

---

### E61 — Directives anticipées

**Libellé** : Votre proche a-t-il rédigé des directives anticipées ?

**Réponse déclenchante** : "Non" OU "Je ne sais pas"

**Effet** : Ouvre MP A3 → Anticipation juridique

---

### E21 — Maintien situation de vie

**Libellé** : Pensez-vous pouvoir maintenir la situation de vie actuelle ?

**Réponses déclenchantes** :
- "Non, un changement sera nécessaire"
- "Je ne sais pas"

**Effet** : Ouvre MP A1 et/ou A3 → Double activation

---

## 🔴 Questions Critiques V5

| ID | Question | Réponse critique | Sens |
|----|----------|------------------|------|
| **E68** | Temps administratif | > 5h/mois | Charge incompatible avec la durée |
| **E62** | Aides en cours | Aucun droit engagé alors que besoin exprimé | Risque de rupture financière/sociale |
| **E61** | Directives anticipées | Refus total + situation instable | Risque décisionnel majeur en crise |

---

## ⚠️ Règles Legacy

1. **E21** : Question transversale (A1 + A3)
2. **AGGIR Non** : Priorité évaluation dépendance
3. **Pas de critiques directes niveau 0** en V5
