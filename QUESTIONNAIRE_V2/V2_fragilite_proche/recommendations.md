# 💡 Recommendations V2 — Fragilité du Proche

> **Source** : `SOURCES/extracted/recommendations_complete.json` (section V2)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "recommendations_complete.json"
extraction_date: "2026-02-06"
total_questions: 57
questions_avec_recos: 25
```

---

## 📋 Recommendations par Question

### O2 — Lieu de vie actuel

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| 1-À son domicile | Faites vous aider | - | IDEC oriente et accompagne la mise en place des aides Matériels et humaines dans le BLOC FRAGILITÉ |
| 2-À mon domicile | Faites vous aider | - | IDEC oriente et accompagne la mise en place des aides Matériels et humaines dans le BLOC FRAGILITÉ |
| 3-En établissement | N/A | N/A | - |

---

### N10 — Nature de l'aide apportée

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Tâches vie quotidienne | Demandez une aide pour les actes de la vie quotidienne | SAD | Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD |
| Gestion administrative | Contacter une assistante sociale | Assistante sociale | Rappeler à l'aidant de contacter L'AS |
| Soutien moral | Demandez une aide pour les actes de la vie quotidienne | SAD | Confirmer avec l'aidant le nombre d'heures envisagées |
| Accompagnement RDV | Demandez une aide lors des déplacements à des rendez-vous médicaux | SAD | Confirmer avec l'aidant le nombre d'heures envisagées |

---

### N9 — Gestion budget

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Non | N/A | - | - |
| Elle se fait aider | Contacter une assistante sociale | Assistante sociale | Rappeler à l'aidant de contacter L'AS |
| Oui | Contacter une assistante sociale | Assistante sociale | Rappeler à l'aidant de contacter L'AS |

**📄 Document** : "AIDES pour AIDANT en FONCTION de l' ÂGE et du statut"

---

### N21 — Problèmes financiers

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Non | - | - | - |
| Parfois | - | Assistante sociale | Contacter une assistance sociale pour demander les aides |
| Oui | Contacter le médecin traitant pour remplir le dossier de demande d'aide | Médecin traitant | IDEC prend RDV avec le MT pour compléter un dossier de demande d'aide financière |

---

### N23 — Activité professionnelle/scolaire

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Non | N/A | - | - |
| Parfois | Demandez un suivi régulier | - | - |
| Oui | Envisager une consultation avec un psychiatre | Psychiatre | Prendre RDV avec un Psychiatre du territoire (Recherche sur internet) pour un suivi |

---

### N27 — Isolement social

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Pas du tout | N/A | N/A | - |
| Un peu | Inscrivez votre proche dans des associations, des groupes de parole ou des thérapies de groupe | Associations | Contacter une association par téléphone ou mail |
| Beaucoup | Demandez un suivi rapproché avec des intervenants sociaux et médicaux | Associations | Contacter une association par téléphone ou mail |
| Totalement | Proposez à votre proche un suivi contre l'isolement social | Psychologue | Prendre RDV avec un Psychologue conventionné |

---

### O7 — Alimentation

| Réponse | Reco App | Acteurs | Actions IDEC |
|---------|----------|---------|--------------|
| Non | Mettez en place un suivi régulier selon les préconisations du chirurgien-dentiste | Chirurgien-dentiste | Contacter un chirurgien-dentiste pour suivi |
| Oui | Discutez des causes de la perte d'appétit et demandez la prescription d'un bilan de dénutrition | Médecin traitant | Contacter le médecin traitant pour bilan de dénutrition |
| Oui, et elle est dénutrie | Demandez la vérification de l'état bucco-dentaire | Chirurgien-dentiste | Contacter un chirurgien-dentiste pour suivi |

---

## 🤖 Contenu IA (à valider)

### Typage Micro-Tâches

| Action | Type MT (IA) |
|--------|---------------|
| Confirmer heures SAD | ORGA |
| Contacter assistante sociale | STRUC |
| Prendre RDV psychiatre | MED |
| Contacter association | STRUC |
| Bilan de dénutrition | MED |

> ⚠️ Typage IA — validation clinique requise

---

## 🎭 Acteurs Clés V2

| Acteur | Interventions principales |
|--------|---------------------------|
| **SAD** | Aide vie quotidienne, déplacements, présence |
| **Assistante sociale** | Aides financières, droits, gestion |
| **Médecin traitant** | Bilans, dossiers aide, orientation |
| **Psychiatre** | Suivi troubles psychiques |
| **Psychologue** | Isolement social, soutien |
| **Associations** | Lien social, groupes parole |
| **Chirurgien-dentiste** | État bucco-dentaire, dénutrition |

---

## ⚠️ Règles Legacy

1. **IDEC** : Accompagne la mise en œuvre des recommandations
2. **Assistante sociale** : C'est l'aidant qui contacte l'AS, pas L'IDEC
3. **Documents** : Orienter vers les fiches "AIDES pour AIDANT en FONCTION de l' ÂGE et du statut"
