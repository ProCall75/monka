# 📅 Suivi V1 — Social et Relationnel

> **Source** : `SOURCES/extracted/Questionnaire_Etienne_1258-1_suivi_mensuel_raw.json` (Bloc 3)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "Questionnaire suivi mensuel - Bloc 3"
extraction_date: "2026-02-06"
frequency: "mensuel"
total_questions_suivi: 15
trigger_condition: "S004=Oui (Changements quotidien/relations)"
```

---

## 🎯 Déclencheur Bloc Suivi V1

**Question gate** : S004

**Libellé** : Depuis le dernier suivi, y a-t-il eu des changements concernant : Votre quotidien d'aidant et vos relations ?

**Options** : Oui | Non

**Si Oui → Déclenche les 15 questions ci-dessous**

---

## 📋 Questions de Suivi Mensuel V1

### Sous-bloc : Proximité & fréquence de contact

---

#### O47 — Distance domicile

**Libellé** : À combien de temps habitez-vous du domicile de la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Moins de 30 min |
| 2 | Entre 30 min et 1h30 |
| 3 | Plus de 1h30 |

---

#### O48 — Fréquence visites

**Libellé** : Quelle est la fréquence de vos visites ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Tous les jours |
| 2 | Au moins 1 fois par semaine |
| 3 | Au moins 1 fois par mois |
| 4 | Au moins 1 fois tous les 3 mois |
| 5 | Au moins 1 fois tous les 6 mois |
| 6 | Au moins 1 fois par an |
| 7 | Autre |

**⚠️ Déclencheur MP R3** : ≤ 1 fois/mois

---

### Sous-bloc : Réseau d'aide & entourage

---

#### N4 — Aidant seul

**Libellé** : Au sein de votre famille, êtes-vous seul(e) à vous occuper de la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Oui |
| 2 | Non |

**⚠️ Déclencheur MP R2** : Oui

---

#### E1 — Répartition aide entourage

**Libellé** : Comment se passe la répartition de l'aide dans votre entourage (famille, proches) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Plutôt équilibrée et satisfaisante | ✅ |
| 2 | Je fais la plus grande partie mais cela reste acceptable | ⚠️ |
| 3 | Je fais presque tout et cela crée des tensions ou un sentiment d'injustice | 🔴 CCC |
| 4 | Je suis totalement seul·e | 🔴 CCC |

---

#### E2 — Soutien mobilisable

**Libellé** : En cas de coup dur, avez-vous autour de vous des personnes sur qui vous pouvez vraiment compter ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, plusieurs personnes | ✅ |
| 2 | Oui, une personne | ⚠️ |
| 3 | Très peu / presque personne | 🔴 CCC |
| 4 | Personne | 🔴 CCC |

---

#### E3 — Autres personnes à charge

**Libellé** : Quelles sont les autres personnes à charge autour de vous que vous devez aider ?

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Aucun |
| 2 | Enfant(s) mineurs |
| 3 | Autre(s) proche(s) dépendant(s) |

---

#### E6 — Acceptation aide extérieure

**Libellé** : Votre proche accepte-t-il l'aide de personnes extérieures (aide à domicile, infirmier, structure, etc.) ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé | ⚠️ |
|------|---------|-----|
| 1 | Oui, facilement | ✅ |
| 2 | Oui, mais avec des réticences | ⚠️ |
| 3 | Non, il/elle refuse la plupart du temps | 🔴 Critique directe |
| 4 | Je ne sais pas / nous n'avons pas encore essayé | - |

**⚠️ Critique directe** : Priorité niveau 1

---

### Sous-bloc : Vie sociale de la personne aidée

---

#### N20 — Relations sociales stables

**Libellé** : A-t-elle des difficultés à maintenir des relations sociales stables ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

### Sous-bloc : Impact sur vie familiale / sociale / professionnelle

---

#### O27 — Impact vie familiale

**Libellé** : Vous occuper de la personne aidée entraîne-t-il des difficultés dans votre vie familiale ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Pas du tout |
| 2 | Un peu |
| 3 | Oui |

---

#### O28 — Impact vie sociale/professionnelle

**Libellé** : Vous occuper de la personne aidée entraîne-t-il des difficultés dans vos relations avec vos amis, dans vos loisirs ou dans votre travail ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Pas du tout |
| 2 | Un peu |
| 3 | Oui |

---

#### N7 — Aménagement activité professionnelle

**Libellé** : Avez-vous dû aménager votre activité professionnelle pour faire face à votre rôle d'aidant ?

**Type** : Obligatoire / Choix Multiples

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Oui j'ai dû aménager mes horaires |
| 3 | Oui j'ai dû prendre des jours de congé |

**⚠️ Déclencheur MP R1** : Oui (horaires ou congés)

---

### Sous-bloc : Relation aidant‑aidé & dynamique familiale

---

#### O30 — Reconnaissance proche

**Libellé** : Avez-vous le sentiment de ne plus reconnaître la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Pas du tout |
| 2 | Un peu |
| 3 | Oui |

---

#### E4 — Évolution relation

**Libellé** : Depuis que vous aidez votre proche, comment a évolué votre relation avec lui/elle ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Plutôt renforcée / plus proche |
| 2 | Globalement similaire |
| 3 | Plus tendue / plus compliquée |
| 4 | Difficile à dire |

---

#### O31 — Peur avenir proche

**Libellé** : Avez-vous peur pour l'avenir de la personne aidée ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Pas du tout |
| 2 | Un peu |
| 3 | Oui |

---

#### E5 — Tensions familiales

**Libellé** : Existe-t-il des tensions ou des désaccords au sein de la famille concernant la prise en charge de votre proche ?

**Type** : Obligatoire / Choix Unique

| Code | Libellé |
|------|---------|
| 1 | Non |
| 2 | Parfois |
| 3 | Oui |

---

## 📈 Indicateurs Longitudinaux V1

| Indicateur | Questions | Alerte |
|------------|-----------|--------|
| IND_V1_iso | E1 + E2 | E1=4 ET E2≥3 → 🔴 Isolement critique |
| IND_V1_tension | E4 + E5 | E4=3 ET E5=3 → 🔴 Tension familiale |
| IND_V1_refus | E6 | E6=3 → 🔴 Refus aide (priorité 1) |

---

## ⚠️ Règles Legacy

1. **Fréquence** : Suivi mensuel
2. **Gate question** : S004 = Oui pour déclencher le bloc
3. **Critiques directes** : E6=3 → Action immédiate
