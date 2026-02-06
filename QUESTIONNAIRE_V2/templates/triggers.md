# 🏷️ Template: triggers.md

> **Source** : `SOURCES/legacy/Legacy questionnaire 060226.docx` (section 4.7)  
> **Contenu** : Questions triggers = facteurs de contexte (profil aidant/aidé)  
> **Usage** : Qualification de la diade, futurs personas, personnalisation

---

## 📊 Métadonnées

```yaml
vulnerability: "Transverse"  # Applicable à toutes les vulnérabilités
name: "Questions Triggers"
source: "Legacy questionnaire 060226 - Section 4.7"
extraction_date: "2026-02-06"
total_triggers: 15
```

---

## 🎯 Définition (Legacy 060226)

> *"Les questions dites triggers ont pour fonction exclusive de **cadrer le contexte global** de la situation de l'aidant et de la personne aidée."*

### Ce que sont les triggers :
- ✅ Facteurs **structurels, contextuels ou temporels**
- ✅ Qualification du **profil aidant/aidé**
- ✅ Base pour les **futurs personas**
- ✅ Orientation des **recommandations et parcours**

### Ce que les triggers NE SONT PAS :
- ❌ Ne décrivent jamais un **état** (physique, psychologique, social, clinique)
- ❌ Ne participent à **aucun scoring**
- ❌ Ne déclenchent **aucune priorisation** à eux seuls
- ❌ Ne sont **jamais scorants, critiques directes ou CCC**

> ⚠️ **Règle Legacy** : *"Ce sont des triggers / facteurs de contexte, pas des états."*

---

## 📋 LISTE OFFICIELLE DES 15 TRIGGERS

> ⚠️ **Liste FERMÉE et NORMATIVE** — Aucune modification sans analyse d'impact

| # | ID | Type de facteur |
|---|-----|-----------------|
| 1 | **N3** | Contexte global (type de situation d'aidance) |
| 2 | **O35** | Profil aidant |
| 3 | **O36** | Profil aidant |
| 4 | **N1** | Profil (relation avec l'aidé) |
| 5 | **O64** | Contexte aidé |
| 6 | **O46** | Profil aidant |
| 7 | **O14** | Contexte aidé |
| 8 | **O1** | Profil aidé |
| 9 | **O63** | Priorités déclarées |
| 10 | **O49** | Temporalité (ancienneté du rôle) |
| 11 | **N26** | Contexte |
| 12 | **E71** | Contexte |
| 13 | **E72** | Contexte |
| 14 | **O2** | Profil |
| 15 | **N31** | Contexte |

---

## 📋 Format par Question Trigger

```markdown
### {ID} - {Titre court}

**Libellé** : {Question}
**Type** : Trigger (facteur de contexte)

**Options** :
| Code | Libellé | Profil |
|------|---------|--------|
| A | {Option 1} | {Persona potentiel} |
| B | {Option 2} | {Persona potentiel} |
| ... | ... | ... |

**Usage contexte** :
- Orientation MP : {Oui/Non + détail}
- Personnalisation recommandations : {Oui/Non}
- Qualification diade : {Aspect qualifié}
```

---

## 🧑‍🤝‍🧑 Lien avec les Personas (futur)

Les triggers permettront de construire les **personas** :

```markdown
Exemple de persona dérivé des triggers :

**Persona "Aidant distant épuisé"**
- N3 = "Proche éloigné géographiquement"
- O49 = "> 5 ans d'aide"
- Situation = "Aide à distance"

→ Adaptation des recommandations pour ce profil
```

---

## ⚠️ Règles (Legacy questionnaire 060226)

1. **Liste fermée** : Seules les 15 questions listées ci-dessus sont des triggers
2. **Facteurs uniquement** : Un trigger décrit un facteur, JAMAIS un état
3. **Rôle unique** : Une question trigger possède un rôle unique, invariant et non cumulable
4. **Pas de mutation** : Une question décrivant un état ne peut JAMAIS devenir trigger
5. **Modification = impact** : Toute évolution d'un trigger implique analyse d'impact + versionnage

---

## 📋 Exemple V1

```markdown
### N3 - Type de situation d'aidance

**Libellé** : Quelle proposition correspond le mieux à votre situation d'aidant ?
**Type** : Trigger (facteur de contexte)

**Options** :
| Code | Libellé | Profil |
|------|---------|--------|
| A | J'habite avec la personne que j'aide | Cohabitant |
| B | Je vais régulièrement chez elle | Proche actif |
| C | J'aide principalement à distance | Aidant distant |

**Usage contexte** :
- Orientation MP : Oui - Adapte les MP R1-R4
- Personnalisation recommandations : Oui
- Qualification diade : Proximité géographique
```
