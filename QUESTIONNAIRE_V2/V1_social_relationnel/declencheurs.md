# 🎯 Déclencheurs V1 — Social et Relationnel

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json` (table index 1-2)  
> **Date extraction** : 2026-02-06

---

## 📊 Métadonnées

```yaml
vulnerability: V1
name: "Social et Relationnel"
source: "Typologie,CCC et scoring.docx + Legacy Priorisation"
extraction_date: "2026-02-06"
total_declencheurs: 4
critiques_directs: 2
```

---

## 📋 Questions Déclenchantes (Niveau 3 - Standard)

| ID | Question | Réponses déclenchantes | MP activé | Sens |
|----|----------|------------------------|-----------|------|
| N7 | Aménagement activité professionnelle | « Aménagement des horaires » / « Congés » | **R1** | Déséquilibre vie pro ↔ rôle d'aidant |
| O48 | Fréquence des visites | « 1 fois par mois ou moins » | **R3** | Faible présence auprès du proche |
| N4 | Aidant seul dans la famille | « Oui » | **R2** | Absence de relais familial |
| E6 | Acceptation de l'aide extérieure | « Refuse la plupart du temps » | **R4** | Blocage organisationnel |

---

## 🚨 Questions Critiques Directes (Niveau 1)

> **Règle** : Une critique directe **PRÉVAUT TOUJOURS** sur le scoring.

| ID | Question | Réponse critique | Effet | Sens clinique |
|----|----------|------------------|-------|---------------|
| **E6** | Acceptation aide extérieure | « Refuse la plupart du temps » | Priorité niveau 1 | Refus d'aide compromettant toute sécurisation |
| **E2** | Soutien mobilisable en cas de coup dur | « Personne » | Priorité niveau 1 | Isolement relationnel sévère de l'aidant |

---

## 📌 Micro-Parcours V1

| Code | Nom | Objectif |
|------|-----|----------|
| **R1** | Impact sur la vie personnelle / sociale / pro | Rééquilibrage vie perso/pro |
| **R2** | Soutien de l'entourage | Identifier et mobiliser des relais |
| **R3** | Isolement social du proche | Recréer du lien social |
| **R4** | Relation aidant / aidé & dynamique familiale | Apaiser les tensions, accepter l'aide |

---

## ⚠️ Règle de Priorité

```
Niveau 1 (Critique directe) > Niveau 2 (CCC) > Niveau 3 (Standard) > Scoring
```
