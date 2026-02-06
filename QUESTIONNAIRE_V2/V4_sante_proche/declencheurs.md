# 🚀 Déclencheurs V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 25)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_declencheurs: 6
```

---

## 🎯 Questions Déclenchantes V4

| ID | Question | Réponse déclenchante | Effet |
|----|----------|----------------------|-------|
| **E35** | Diagnostic clair ? | "Non, pas de diagnostic" | Ouvre M1 – Compréhension diagnostic |
| **E46** | Troubles psychiques | "Oui" | Ouvre M4 – Troubles psy/addictions |
| **O48** | Addictions | "Oui" | Ouvre M4 – Troubles psy/addictions |
| **O24** | Difficultés accès soins | "Oui" | Ouvre M2 – Accès aux soins |
| **E52** | Coordinateur identifié | "Non, personne" | Ouvre M5 – Coordination |
| **E57** | Plan de route clair | "Non" | Ouvre M6 – Plan de soins |

---

## 📋 Détail des Déclencheurs

### E35 — Clarté du diagnostic

**Libellé** : Avez-vous l'impression que le diagnostic de votre proche est clair et bien établi ?

**Réponse déclenchante** : "Non, personne ne nous a vraiment donné de diagnostic"

**Effet** : Ouvre MP M1 → Consultation médicale explicative

---

### E46 — Troubles psychiques

**Libellé** : Votre proche a-t-il des troubles psychiques ?

**Réponse déclenchante** : "Oui"

**Effet** : Ouvre MP M4 → Suivi psychiatrique adapté

---

### O48 — Addictions

**Libellé** : Votre proche a-t-il des problèmes d'addiction ?

**Réponse déclenchante** : "Oui"

**Effet** : Ouvre MP M4 → Orientation addictologie

---

### O24 — Difficultés accès soins

**Libellé** : Rencontrez-vous des difficultés pour accéder aux soins ?

**Réponse déclenchante** : "Oui"

**Effet** : Ouvre MP M2 → Facilitation accès soins

---

### E52 — Coordinateur identifié

**Libellé** : Y a-t-il une personne qui coordonne les soins ?

**Réponse déclenchante** : "Non, personne ne coordonne vraiment"

**Effet** : Ouvre MP M5 → Mise en place coordination

**Justification** : Gouvernance du parcours

---

### E57 — Plan de route clair

**Libellé** : Avez-vous un plan de route clair pour le parcours de soins ?

**Réponse déclenchante** : "Non"

**Effet** : Ouvre MP M6 → Construction plan de soins

---

## ⚠️ Règles Legacy

1. **Pas de critiques directes en V4** : La sécurité est gérée via V3 (E12, E13)
2. **Multi-déclencheurs** : Plusieurs MP peuvent s'ouvrir simultanément
3. **Priorité M4** : Addictions/troubles psy = traitement prioritaire
