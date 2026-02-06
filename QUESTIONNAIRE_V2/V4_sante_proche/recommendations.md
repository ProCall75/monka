# 💡 Recommendations V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/recommendations_complete.json` (section V4)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "recommendations_complete.json"
extraction_date: "2026-02-06"
total_questions: 36
questions_avec_recos: 20
```

---

## 📋 Recommendations par Question

### N41 — ALD (Affection Longue Durée)

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Oui | N/A | - | - |
| Non | Demandez à vérifier l'éligibilité ALD | Médecin traitant | Contacter médecin traitant pour dossier ALD (100%) |
| Je ne sais pas | Demandez à vérifier l'éligibilité ALD | Médecin traitant | Contacter médecin traitant pour dossier ALD (100%) |

**Document App** : Qu'est-ce qu'une ALD ?

---

### E34 — Compréhension maladie

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Oui | Maintenir l'information | IDEC | Valoriser la compréhension de l'aidant |
| Partiellement | Renforcer l'information et clarifier | IDEC / Pro santé | Identifier les points incompris |
| Pas du tout | Accompagnement renforcé information médicale | IDEC / Médecin / Infirmier | Proposer temps d'échange dédié |

---

### E35 — Clarté du diagnostic

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Oui, clair | Maintenir suivi médical | IDEC | Confirmer bonne compréhension |
| Plusieurs hypothèses | Clarifier situation médicale | IDEC / Médecin | Identifier zones d'incertitude |
| Non, pas de diagnostic | Organiser temps médical dédié | IDEC / Médecin | Proposer consultation explicative |
| Je ne sais pas | Explorer compréhension globale | IDEC | Proposer temps d'échange |

---

### E36 — Errance diagnostique

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Non | N/A | - | - |
| Oui, un peu | Aider à synthétiser le parcours | IDEC | Proposer récapitulatif des examens |
| Oui, beaucoup | Orientation vers consultation de synthèse | Médecin / Spécialiste | Organiser bilan médical global |

---

### E42 — Hospitalisations récentes

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Aucune | N/A | - | - |
| 1 fois | Préparer suivi post-hospitalisation | IDEC | Vérifier continuité des soins |
| 2+ fois | Mettre en place protocole retour domicile | IDEC / Médecin | Organiser visite de sortie + suivi |

---

### E46 — Troubles psychiques

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Non | N/A | - | - |
| Oui | Orienter vers suivi adapté | CMP / Psychologue | Contacter CMP de secteur pour RDV |

---

### O48 — Addictions

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Non | N/A | - | - |
| Oui | Orienter vers accompagnement addictologie | CSAPA / Addictologue | Rechercher CSAPA proche domicile |

---

### E52 — Coordinateur identifié

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Oui | N/A | - | - |
| Partiellement | Clarifier les rôles de chacun | IDEC | Proposer réunion de coordination |
| Non | Identifier une personne de référence | IDEC / Médecin traitant | Organiser point de coordination |

---

### E54 — Organisation globale soins

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Bien organisé | N/A | - | - |
| Moyennement | Simplifier la coordination | IDEC | Proposer outil de suivi |
| Mal organisé | Restructurer le parcours de soins | IDEC / Médecin | Organiser réunion de coordination |

---

### E57 — Plan de route clair

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Oui | N/A | - | - |
| Partiellement | Compléter le plan | IDEC | Proposer formalisation plan |
| Non | Construire un plan de soins | IDEC / Médecin | Organiser RDV dédiée plan de soins |

---

## 🎭 Acteurs Clés V4

| Acteur | Interventions principales |
|--------|---------------------------|
| **Médecin traitant** | ALD, diagnostic, coordination |
| **IDEC** | Information, coordination, suivi |
| **CMP** | Troubles psychiques |
| **CSAPA** | Addictions |
| **Spécialiste** | Consultations de synthèse |

---

## ⚠️ Règles Legacy

1. **ALD** : Priorité si non en place
2. **Errance** : Orienter vers synthèse médicale
3. **Addictions** : Orientation CSAPA systématique
