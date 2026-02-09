# 🎯 Template: declencheurs.md

> **Source** : `SOURCES/legacy/Legacy Micro parcours 060226.docx` + `SOURCES/legacy/Legacy Priorisation 060226.docx`  
> **Contenu** : Tous les déclencheurs de micro-parcours (questions qui ACTIVENT des MP)  
> **Pas de** : Scoring, recommendations, ASR détaillés, triggers contextuels

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source: "Legacy Micro parcours 060226 + Legacy Priorisation 060226"
extraction_date: "YYYY-MM-DD"
total_declencheurs: {N}
micro_parcours: [{liste}]
```

---

## 🎯 Distinction Clé

| Terme | Rôle | Effet |
|-------|------|-------|
| **Déclencheur** (ce fichier) | Active un micro-parcours | ✅ Déclenche une action |
| **Trigger** (voir `triggers.md`) | Qualifie le contexte/profil | ❌ Ne déclenche rien |

> ⚠️ Les **déclencheurs** sont des questions dont certaines réponses **activent un micro-parcours**.
> Les **triggers** sont des questions de **contexte** (profil aidant/aidé) qui servent aux futurs personas.

---

## 🔴 Questions Critiques Directes (Niveau 1)

> **Règle** : Priorité absolue, déclenchement ≤7 jours, jamais modulé par score

```markdown
### {ID} → {Micro-parcours}

**Condition** : {Option spécifique}
**Priorité** : 🔴 Niveau 1 (Critique directe)
**Échéance** : ≤ 7 jours
**Logique** : SI {ID} = "{Option}" ALORS déclencher {MP}
```

---

## 🟠 Conditions Critiques Composites (Niveau 2)

> **Règle** : Combinaison de questions, jamais de question critique dedans

```markdown
### CCC_{X}_{N} → {Micro-parcours}

**Condition** : {ID1} = "{Option}" ET {ID2} = "{Option}"
**Priorité** : 🟠 Niveau 2 (CCC)
**Échéance** : ≤ 1 mois
**Questions impliquées** : {ID1}, {ID2}, ...
```

---

## 🟢 Questions Déclenchantes (Niveau 3)

> **Règle** : Score suffisant, priorité basse

```markdown
### {ID} → {Micro-parcours}

**Condition** : {Option spécifique}
**Priorité** : 🟢 Niveau 3 (Déclenchante)
**Échéance** : > 1 mois
**Logique** : SI {ID} = "{Option}" ALORS déclencher {MP}
```

---

## ⚠️ Règles (Legacy Priorisation 060226)

1. **Hiérarchie stricte** : Niveau 1 > Niveau 2 > Niveau 3
2. **Question critique prévaut TOUJOURS** sur scorante même dimension
3. **Score ne module jamais** une gravité intrinsèque
4. **CCC exclut questions critiques** (elles suffisent seules)

---

## 📋 Exemple V1

```markdown
## 🔴 Questions Critiques Directes

### E2 → R2

**Condition** : E2 = "Très peu de personnes / personne"
**Priorité** : 🔴 Niveau 1
**Échéance** : ≤ 7 jours
**Logique** : SI E2 = "C" ALORS déclencher R2

### E6 → R4

**Condition** : E6 = "Non, refuse la plupart du temps"
**Priorité** : 🔴 Niveau 1
**Échéance** : ≤ 7 jours
**Logique** : SI E6 = "C" ALORS déclencher R4
```
