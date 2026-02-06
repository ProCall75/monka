# 💡 Template: recommendations.md

> **Source** : `SOURCES/excel/Tableau SOPHIE CAT (7).xlsx`  
> **Contenu** : Recommendations utilisateur + Micro-tâches IDEC par question  
> **Pas de** : CCC (→ ccc.md), scoring

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source: "Tableau SOPHIE CAT (7).xlsx"
extraction_date: "YYYY-MM-DD"
total_recommendations: {N}
total_micro_taches: {N}
```

---

## 🎯 Distinction Clé

| Élément | Destination | Source |
|---------|-------------|--------|
| **Recommendation** | Utilisateur (app) | ✅ Excel SOPHIE CAT |
| **Micro-tâche** | IDEC interne | ✅ Excel SOPHIE CAT |
| **Typage MT** | Catégorisation | 🤖 IA (basé sur typologie Legacy) |

> ⚠️ Les micro-tâches existent dans les sources. Seul le **typage** (STRUC/SEC/MED/INFO/ORGA) est assigné par IA basé sur `Legacy typologie des micro taches 030226.docx`

---

## 📋 Format par Question

```markdown
### {ID} - {Titre court}

#### Option: {Libellé option}

**📱 Recommendation App** (utilisateur) :
> {Texte affiché à l'utilisateur dans l'app - vulgarisé, bienveillant}

**📋 Micro-tâches IDEC** (interne) :

| # | Micro-tâche | Type | Acteur |
|---|-------------|------|--------|
| 1 | {Tâche concrète} | `{TYPE}` 🤖 | {IDEC/Médecin/...} |
| 2 | {Tâche concrète} | `{TYPE}` 🤖 | {Acteur} |

> 🤖 = Typage assigné par IA (à valider)
```

---

## 🏷️ Typologie des Micro-Tâches

> **Source** : `Legacy typologie des micro taches 030226.docx`  
> **Assignation** : 🤖 IA basée sur la définition Legacy

| Type | Description (Legacy) | Contributif ASR |
|------|---------------------|-----------------|
| **STRUC** | Structuration, organisation du parcours | ✅ Oui |
| **SEC** | Sécurité, protection, prévention risques | ✅ Oui |
| **MED** | Médical, santé, coordination soins | ✅ Oui |
| **INFO** | Information, orientation, ressources | ❌ Non |
| **ORGA** | Organisation pratique, logistique | ❌ Non |

---

## ⚠️ Ce qui est IA vs Source

| Élément | Source | IA |
|---------|--------|-----|
| Texte recommendation app | ✅ Excel | - |
| Texte micro-tâche | ✅ Excel | - |
| Acteur micro-tâche | ✅ Excel (si présent) | 🤖 (si absent) |
| **Typage micro-tâche** | - | 🤖 Basé sur Legacy |

---

## 📋 Exemple V1

```markdown
### E2 - Soutien mobilisable en cas de coup dur

#### Option: Très peu de personnes / personne

**📱 Recommendation App** (utilisateur) :
> Il est important de ne pas rester isolé. Des associations et services existent pour vous accompagner et vous offrir du répit. N'hésitez pas à demander de l'aide.

**📋 Micro-tâches IDEC** (interne) :

| # | Micro-tâche | Type | Acteur |
|---|-------------|------|--------|
| 1 | Orienter vers plateforme de répit locale | `INFO` 🤖 | IDEC |
| 2 | Proposer inscription groupe de parole aidants | `STRUC` 🤖 | IDEC |
| 3 | Vérifier éligibilité aux aides sociales | `ORGA` 🤖 | IDEC |
| 4 | Évaluer signes d'épuisement aidant | `SEC` 🤖 | IDEC |

> 🤖 = Typage assigné par IA
```
