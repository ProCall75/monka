# 📝 Questions - V1 Social & Relationnel

> **Statut** : ✅ EXTRAIT depuis Simulateur HTML  
> **Source** : `DEMO/monka_simulator.html`  
> **Date extraction** : 04/02/2026

---

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Questions totales** | 15 |
| **Questions critiques** | 2 |
| **Questions scorantes** | 8 |
| **Questions déclenchantes** | 7 |
| **Questions descriptives** | 3 |

---

## 📋 Liste des Questions

### N4 - Aidant seul dans la famille

**Libellé** : Êtes-vous le seul membre de la famille à vous occuper de votre proche ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Non | — | — |
| Oui | — | ✅ R2 |

**Type** : Déclenchante

---

### N7 - Aménagement activité professionnelle

**Libellé** : Avez-vous aménagé votre activité professionnelle depuis que vous êtes aidant ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Non, pas de changement | — | — |
| Aménagement des horaires | — | ✅ R1 |
| Prise de congés (aidant, sans solde) | — | ✅ R1 |
| Réduction du temps de travail | — | — |
| Arrêt de travail | — | — |

**Type** : Descriptive + Déclenchante

---

### N20 - Difficultés relationnelles du proche

**Libellé** : Votre proche a-t-il des difficultés à maintenir des relations sociales ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Non | 0 | — |
| Parfois | 1 | — |
| Oui | 2 | — |

**Type** : Scorante

---

### E1 - Répartition de l'aide

**Libellé** : Comment décririez-vous la répartition de l'aide au sein de votre entourage ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Répartition équilibrée et satisfaisante | 0 | — |
| Je fais la plus grande partie mais c'est acceptable | 1 | — |
| Je fais presque tout / je suis totalement seul·e | 2 | — |

**Type** : Scorante

---

### E2 - Soutien mobilisable en cas de coup dur

**Libellé** : En cas de coup dur, avez-vous des personnes sur qui compter pour vous aider ?

| Option | Score | Déclenchant | Critique |
|--------|-------|-------------|----------|
| Oui, plusieurs personnes | 0 | — | — |
| Oui, une personne | 1 | — | — |
| Très peu de personnes / personne | 2 | ✅ R2 | 🔴 **Niveau 1** |

**Type** : Scorante + **Critique directe**

---

### E3 - Autres personnes à charge

**Libellé** : Avez-vous d'autres personnes à charge en plus de votre proche (enfants, autre parent...) ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Non | — | — |
| Oui | — | — |

**Type** : Descriptive (modulatrice)

---

### E4 - Évolution de la relation

**Libellé** : Comment a évolué votre relation avec votre proche depuis que vous l'aidez ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Relation renforcée | 0 | — |
| Globalement similaire | 0 | — |
| Relation plus tendue / plus compliquée | 1 | — |

**Type** : Scorante

---

### E5 - Tensions familiales

**Libellé** : Existe-t-il des tensions ou des désaccords au sein de la famille concernant la prise en charge de votre proche ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Non | 0 | — |
| Parfois | 1 | — |
| Oui | 2 | — |

**Type** : Scorante

---

### E6 - Acceptation de l'aide extérieure

**Libellé** : Votre proche accepte-t-il l'aide de personnes extérieures (aide à domicile, infirmier, structure, etc.) ?

| Option | Score | Déclenchant | Critique |
|--------|-------|-------------|----------|
| Oui, facilement | — | — | — |
| Oui, mais avec des réticences | — | — | — |
| Non, refuse la plupart du temps | — | ✅ R4 | 🔴 **Niveau 1** |
| Je ne sais pas / pas encore essayé | — | — | — |

**Type** : **Critique directe** + Déclenchante

---

### O27 - Répercussions vie familiale

**Libellé** : La situation de votre proche a-t-elle des répercussions sur votre vie familiale ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Pas du tout | 0 | — |
| Un peu | 1 | — |
| Oui | 2 | — |

**Type** : Scorante

---

### O28 - Répercussions vie sociale/loisirs/travail

**Libellé** : La situation de votre proche a-t-elle des répercussions sur votre vie sociale, vos loisirs ou votre travail ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Pas du tout | 0 | — |
| Un peu | 1 | — |
| Oui | 2 | — |

**Type** : Scorante

---

### O30 - Ne plus reconnaître le proche

**Libellé** : Avez-vous le sentiment de ne plus reconnaître votre proche ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Pas du tout | 0 | — |
| Un peu | 1 | — |
| Oui | 2 | — |

**Type** : Scorante

---

### O31 - Peur pour l'avenir

**Libellé** : Avez-vous peur pour l'avenir de votre proche ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Pas du tout | — | — |
| Un peu | — | — |
| Oui | — | — |

**Type** : Descriptive (modulatrice)

---

### O47 - Distance du domicile

**Libellé** : À combien de temps habitez-vous du domicile de la personne aidée ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Moins de 30 min | — | — |
| Entre 30 min et 1h30 | — | — |
| Plus de 1h30 | — | ✅ R3 |

**Type** : Déclenchante

> ⚠️ Source : Excel (manquait dans Simulateur HTML)

---

### O48 - Fréquence des visites

**Libellé** : À quelle fréquence rendez-vous visite à votre proche ?

| Option | Score | Déclenchant |
|--------|-------|-------------|
| Tous les jours / vie ensemble | — | — |
| Plusieurs fois par semaine | — | — |
| 1 fois par semaine | — | — |
| 1 fois par mois ou moins | — | ✅ R3 |

**Type** : Déclenchante

---

## 📋 Résumé par Type

| Type | Questions |
|------|-----------|
| **Critique directe** | E2, E6 |
| **Scorante** | N20, E1, E2, E4, E5, O27, O28, O30 |
| **Déclenchante** | N4, N7, E6, O48 |
| **Descriptive** | E3, O31 |

---

> 📄 V1 - Social & Relationnel - Questions  
> ✅ **Extrait depuis Simulateur HTML**
