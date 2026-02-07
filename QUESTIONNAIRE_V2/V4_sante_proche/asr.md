# 🎯 ASR V4 — Actions Structurantes de Référence Parcours Médical du Proche

> **Source** : `SOURCES/extracted/microparcours_complete.json` + `Legacy ASR Referent op. 030226.docx`  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "microparcours_complete.json"
extraction_date: "2026-02-06"
total_asr: 6
micro_parcours: ["M1", "M2", "M3", "M4", "M5", "M6"]
```

---

## 📋 Vue d'ensemble ASR V4

| MP | Nom | Objectif |
|----|-----|----------|
| **M1** | Compréhension du diagnostic et de la maladie | Clarifier le diagnostic et ses impacts |
| **M2** | Accès aux soins et aux professionnels | Faciliter l'accès aux soins |
| **M3** | Urgences, hospitalisations et continuité | Gérer les épisodes aigus |
| **M4** | Troubles psychiques, addictions et suivi | Orienter vers suivi adapté |
| **M5** | Coordination des soins | Mettre en place une coordination |
| **M6** | Plan de soins, évaluations et inquiétudes | Transformer inquiétudes en plan |

---

## 🎯 Détail des ASR

### M1 — Compréhension du diagnostic et de la maladie

**Objectif** : Clarifier le diagnostic, la maladie et ses impacts pour mieux décider et expliquer au proche.

**Ce que vous allez comprendre** : Ce qu'implique le diagnostic, les étapes, les informations à demander et à conserver.

**CCC associés** : M1_CC_01, M1_CC_02

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Diagnostic non clarifié |
| ⏳ | Consultation de synthèse en cours |
| ✔️ | Diagnostic compris et documenté |

---

### M2 — Accès aux soins et aux professionnels

**Objectif** : Faciliter l'accès aux soins (RDV, spécialistes, paramédicaux) et lever les freins pratiques.

**Ce que vous allez comprendre** : Comment identifier le bon professionnel, optimiser les RDV et gérer les contraintes.

**CCC associé** : M2_CC_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Difficultés accès non résolues |
| ⏳ | Solutions identifiées, mise en œuvre en cours |
| ✔️ | Accès aux soins fluide |

---

### M3 — Urgences, hospitalisations et continuité des soins

**Objectif** : Mieux gérer les épisodes aigus (urgences/hospitalisations) et sécuriser le retour à domicile.

**Ce que vous allez comprendre** : Quoi préparer avant/après une hospitalisation et comment éviter les ruptures de soins.

**CCC associés** : M3_CC_01, M3_CC_02

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | PAP non établi, ruptures fréquentes |
| ⏳ | PAP en cours d'élaboration |
| ✔️ | PAP en place, continuité assurée |

---

### M4 — Troubles psychiques, addictions et suivi spécialisé

**Objectif** : Orienter vers un suivi adapté en cas de troubles psychiques ou d'addictions.

**Ce que vous allez comprendre** : Les repères de prise en charge et les acteurs du suivi (psy, addicto, équipes).

**CCC associé** : —

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Troubles non pris en charge |
| ⏳ | Orientation vers CMP/CSAPA en cours |
| ✔️ | Suivi spécialisé en place |

---

### M5 — Coordination des soins et personne de référence

**Objectif** : Mettre en place une coordination simple (qui fait quoi, quand, avec quels contacts).

**Ce que vous allez comprendre** : Pourquoi une personne de référence aide à éviter les doublons et les oublis.

**CCC associé** : M5_CC_01

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Aucun coordinateur identifié |
| ⏳ | Référent en cours d'identification |
| ✔️ | Coordination en place |

---

### M6 — Plan de soins, évaluations spécialisées et inquiétudes

**Objectif** : Transformer vos inquiétudes en plan de soins clair (évaluations, priorités, suivi).

**Ce que vous allez comprendre** : Comment prioriser (chutes, mémoire, alimentation, sécurité) et quelles évaluations demander.

**CCC associé** : —

**Signatures d'état** :
| État | Description |
|------|-------------|
| ❌ | Pas de plan de route |
| ⏳ | Plan en cours d'élaboration |
| ✔️ | Plan de soins établi et partagé |

---

## 📌 Signatures d'État (Legacy ASR Referent op. 030226)

> Source : `Legacy ASR Referent op. 030226.docx`

| MP | Signature A | Signature B |
|----|-------------|-------------|
| M1 | M1-A : informations médicales clarifiées | M1-B : échanges explicatifs avec un professionnel |
| M2 | M2-A : rendez-vous accessibles | M2-B : parcours de soins fonctionnel |
| M3 | M3-A : plan d'urgence identifié | M3-B : contacts et procédures connus |
| M4 | M4-A : suivi actif | M4-B : accès direct à un spécialiste |
| M5 | M5-A : médecin ou référent identifié | M5-B : coordination effective entre acteurs |
| M6 | M6-A : plan de soins ou d'anticipation formalisé | M6-B : repères clairs pour les étapes à venir |

---

## ⚠️ Règles Legacy

1. **M1** = Priorité si errance diagnostique
2. **M3** = Urgence si hospitalisations répétées
3. **M4** = Orientation CMP/CSAPA systématique
4. **Signatures d'état** : ❌ → ⏳ → ✔️
