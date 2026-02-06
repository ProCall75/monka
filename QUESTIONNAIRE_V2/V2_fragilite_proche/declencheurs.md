# 🚀 Déclencheurs V2 — Fragilité du Proche

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (tables index 19-20)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V2
name: "Fragilité du Proche"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_declencheurs: 5
critiques_directes: 5
```

---

## 🎯 Questions Déclenchantes V2

| ID | Question | Réponse déclenchante | MP concerné |
|----|----------|----------------------|-------------|
| **E21** | Maintien possible sans changement | "Non, un changement sera nécessaire" / "Je ne sais pas" | F1 |
| **E24** | Besoin présence la nuit | "Oui" | F2 |
| **E23** | Temps possible seul | "Pas plus d'1h" / "Ne peut pas rester seul" | F2 |
| **O51** | Projet adaptation lieu de vie | Déclenchant | F1 |
| **E28** | Hospitalisations récentes | ≥ 2 hospitalisations | F5 |

---

## 📋 Détail des Déclencheurs

### E21 — Maintien situation de vie

**Libellé** : Pensez-vous que la situation de vie actuelle peut être maintenue sans changement ?

**Type** : Déclenchante

**Réponses déclenchantes** :
- "Non, un changement sera nécessaire"
- "Je ne sais pas"

**MP concerné** : F1 – Vie quotidienne, budget et entourage

---

### E24 — Besoin présence la nuit

**Libellé** : A-t-elle besoin d'une présence la nuit ?

**Type** : Déclenchante

**Réponses déclenchantes** :
- "Oui (accompagnement régulier)"

**MP concerné** : F2 – Autonomie, aide humaine et présence nécessaire

---

### E23 — Temps possible seul

**Libellé** : Combien de temps la personne peut-elle rester seule ?

**Type** : Déclenchante

**Réponses déclenchantes** :
- "Pas plus d'1 heure"
- "Ne peut pas rester seule"

**MP concerné** : F2 – Autonomie, aide humaine et présence nécessaire

---

### O51 — Projet adaptation lieu de vie

**Libellé** : Avez-vous un projet d'adaptation du lieu de vie ?

**Type** : Déclenchante

**MP concerné** : F1 – Vie quotidienne, budget et entourage

---

### E28 — Hospitalisations récentes

**Libellé** : Combien d'hospitalisations non programmées ces 12 derniers mois ?

**Type** : Déclenchante

**Réponses déclenchantes** :
- "2 fois ou plus"

**MP concerné** : F5 – Dépendance, handicap et épisodes aigus

---

## 🚨 Questions Critiques Directes V2

| ID | Question | Rôle | Priorité |
|----|----------|------|----------|
| **E27** | Comportements dangereux pour elle-même | Critique directe | ⚠️ Niveau 1 |
| **N22** | Comportements à risque | Critique directe | ⚠️ Niveau 1 |
| **N25** | Idées suicidaires | Critique directe | 🔴 Niveau 0 |
| **N38** | Perte de contrôle addiction | Critique directe | ⚠️ Niveau 1 |
| **N39** | Problèmes de santé liés à l'addiction | Critique directe | ⚠️ Niveau 1 |

---

## 📋 Détail des Critiques Directes

### E27 — Comportements dangereux

**Libellé** : A-t-elle des comportements dangereux pour elle-même ?

**Réponse critique** : "Oui"

**Effet** : Alerte immédiate → Escalade IDEC

---

### N25 — Idées suicidaires

**Libellé** : A-t-elle exprimé des idées suicidaires ?

**Réponse critique** : Toute réponse positive

**Effet** : 🔴 **Niveau 0** — Escalade urgence psychiatrique

---

### N38 — Perte de contrôle addiction

**Libellé** : A-t-elle perdu le contrôle sur une addiction ?

**Réponse critique** : "Oui"

**Effet** : Alerte immédiate → Orientation addictologie

---

## ⚠️ Règles Legacy

1. **Critiques directes** : Traitement prioritaire hors scoring
2. **N25** : Priorité absolue (niveau 0)
3. **Déclenchantes** : Activation MP sans CCC
