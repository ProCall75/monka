# 🎯 Triggers — Questions Contexte (Globales)

> **Source** : `SOURCES/extracted/Questionnaire_validé.xlsx_extracted.json` (Bloc 1-2)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
scope: global
name: "Triggers (Questions Contexte)"
source: "Questionnaire validé.xlsx + Legacy questionnaire §4.7"
extraction_date: "2026-02-06"
total_triggers: 15
```

---

## 📌 Définition

> **Trigger** = Question de contexte/profil posée en début de questionnaire.
> 
> Les triggers servent à :
> - Caractériser le profil de l'aidant et de l'aidé
> - Orienter vers les vulnérabilités pertinentes
> - Moduler certaines recommendations

⚠️ **Ne pas confondre avec les Déclencheurs** qui activent des micro-parcours.

---

## 📋 Triggers Bloc 1 — Vous, l'aidant

### N3 — Type de situation aidée

**Libellé** : Quelle proposition correspond le mieux à votre situation d'aidant (une seule réponse possible) :

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | J'aide une personne en perte d'autonomie liée principalement au vieillissement |
| 2 | J'aide une personne ayant une ou plusieurs maladies chroniques |
| 3 | J'aide une personne en situation de handicap |
| 4 | J'aide une personne souffrant de troubles psychiques |
| 5 | J'aide une personne souffrant d'addictions sévères |

---

### O35 — Sexe aidant

**Libellé** : Quel est votre sexe biologique ? (utilisé pour informations médicales spécifiques)

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Homme |
| 2 | Femme |

---

### O36 — Âge aidant

**Libellé** : Quel est votre âge ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Entre 18 et 25 ans |
| 2 | Entre 26 et 59 ans |
| 3 | Entre 60 et 75 ans |
| 4 | Plus de 75 ans |

---

### N1 — Activité professionnelle

**Libellé** : Quelle activité exercez-vous ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Étudiant |
| 2 | Salarié |
| 3 | Fonctionnaire |
| 4 | Indépendant, TNS |
| 5 | Retraité |
| 6 | Sans emploi |

---

### O64 — Code postal aidant

**Libellé** : Quel est le code postal de votre lieu de résidence ? (conseils personnalisés)

**Type** : Obligatoire / 5 chiffres

---

### O46 — Lien de parenté

**Libellé** : Quel est votre lien de parenté avec la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Un de mes parents |
| 2 | Un de mes grand-parents |
| 3 | Mon conjoint ou ma conjointe |
| 4 | Mon frère ou ma sœur |
| 5 | Un de mes enfants |
| 6 | Autre |

---

## 📋 Triggers Bloc 2 — Votre proche

### O14 — Sexe proche

**Libellé** : Quel est le sexe biologique de la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Homme |
| 2 | Femme |

---

### O1 — Âge proche

**Libellé** : Quel est l'âge de la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Moins de 18 ans |
| 2 | Entre 18 et 25 ans |
| 3 | Entre 26 et 59 ans |
| 4 | Entre 60 et 75 ans |
| 5 | Plus de 75 ans |

---

### O63 — Code postal proche

**Libellé** : Quel est le code postal du domicile de la personne aidée ?

**Type** : Obligatoire / 5 chiffres

---

### O49 — Durée de l'aide

**Libellé** : Depuis combien de temps l'aidez-vous ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Moins de 6 mois |
| 2 | Entre 6 mois et 2 ans |
| 3 | Depuis plus de 2 ans |

---

### O2 — Lieu de vie proche

**Libellé** : Où vit la personne aidée aujourd'hui ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | À son domicile |
| 2 | À mon domicile |
| 3 | En établissement |

---

### N31 — Prise en charge établissement

**Libellé** : La personne aidée bénéficie-t-elle d'une prise en charge en établissement spécialisé ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Aucune prise en charge |
| 2 | Établissements pour enfants et adolescents (IME, ITEP, IEM, EEAP) |
| 3 | Services d'accompagnement (SAVS, SAMSAH) |
| 4 | Centres de rééducation fonctionnelle |
| 5 | Établissements pour personnes avec un handicap sensoriel |
| 6 | Établissements pour adultes (FAM, MAS, foyer de vie) |
| 7 | ESAT |
| 8 | Unités pour personnes handicapées vieillissantes |
| 9 | EHPAD |
| 10 | Résidence Services ou Autonomie |
| 11 | Unité de soins longue durée (USLD) |
| 12 | Centre de Ressources Territoriaux (CRT) |
| 13 | Accueil de jour ou hôpital de jour |

---

## ⚠️ Usage des Triggers

Les triggers sont utilisés pour :
1. **Routage initial** → Orienter vers les vulnérabilités pertinentes
2. **Personnalisation** → Adapter certains messages (âge, sexe, situation)
3. **Filtrage personas** → Identifier le profil aidant

> Les triggers ne déclenchent **jamais** de micro-parcours directement.
