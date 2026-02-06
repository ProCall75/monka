# 🚀 Déclencheurs V3 — Santé Physique et Psychologique de l'Aidant

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 13)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V3
name: "Santé Physique et Psychologique de l'Aidant"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-06"
total_declencheurs: 5
critiques_directes: 2
```

---

## 🎯 Questions Déclenchantes V3

| ID | Question | Réponse déclenchante | Effet |
|----|----------|----------------------|-------|
| **O49** | Depuis combien de temps l'aidez-vous ? | "Depuis plus de 2 ans" | Exposition prolongée → vigilance épuisement |
| **N8** | Arrêt de travail lié au rôle d'aidant | Toute réponse ≠ Non | Fragilisation professionnelle |
| **E14** | Jours d'arrêt (30 derniers jours) | "4-7 jours" / "Plus de 7 jours" | Signal de désorganisation récente |
| **O32** | Souhaitez-vous être davantage aidé·e ? | "Oui" | Demande explicite de soutien |
| **E9** | Temps pour soi | "Non" | Dégradation de l'équilibre personnel |

---

## 📋 Détail des Déclencheurs

### O49 — Durée de l'aidance

**Libellé** : Depuis combien de temps aidez-vous cette personne ?

**Réponse déclenchante** : "Depuis plus de 2 ans"

**Effet** : Exposition prolongée → renforce la vigilance épuisement

---

### N8 — Arrêt de travail

**Libellé** : Avez-vous eu un arrêt de travail lié à votre rôle d'aidant ?

**Réponse déclenchante** : Toute réponse ≠ Non

**Effet** : Fragilisation professionnelle

---

### E14 — Jours d'arrêt de travail

**Libellé** : Combien de jours d'arrêt sur les 30 derniers jours ?

**Réponses déclenchantes** :
- "Entre 4 et 7 jours"
- "Plus de 7 jours"

**Effet** : Signal de désorganisation récente

---

### O32 — Besoin d'aide

**Libellé** : Souhaitez-vous être davantage aidé·e ?

**Réponse déclenchante** : "Oui"

**Effet** : Demande explicite de soutien → ouverture MP

---

### E9 — Temps pour soi

**Libellé** : Avez-vous suffisamment de temps pour vous ?

**Réponse déclenchante** : "Non"

**Effet** : Dégradation de l'équilibre personnel

---

## 🚨 Questions Critiques Directes V3

| ID | Question | Rôle | Priorité |
|----|----------|------|----------|
| **E12** | Risque pour le proche | Critique directe | 🔴 Niveau 0 — Sécurité |
| **E13** | Risque pour autrui | Critique directe | 🔴 Niveau 0 — Sécurité |

---

## 📋 Détail des Critiques Directes

### E12 — Risque pour le proche

**Libellé** : Avez-vous déjà eu des gestes ou des paroles que vous regrettez envers la personne aidée ?

**Réponse critique** : "Oui"

**Effet** : 🔴 **Niveau 0** — Escalade immédiate, suivi psychologique

---

### E13 — Risque pour autrui

**Libellé** : Avez-vous eu des gestes ou paroles que vous regrettez envers d'autres personnes ?

**Réponse critique** : "Oui"

**Effet** : 🔴 **Niveau 0** — Escalade immédiate, suivi psychologique

---

## ⚠️ Règles Legacy

1. **Critiques directes** : E12, E13 = priorité absolue (sécurité)
2. **Déclenchantes** : Activent les MP sans attendre CCC
3. **O32 = Oui** : Point d'entrée privilégié pour proposer le soutien
