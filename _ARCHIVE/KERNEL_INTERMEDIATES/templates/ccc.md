# 🔗 Template: ccc.md

> **Source CCC** : `SOURCES/legacy/Typologie,CCC et scoring.docx`  
> **Source Recommendations CCC** : 🤖 IA (non présentes dans les sources)  
> **Contenu** : Conditions Critiques Composites + Recommendations spécifiques CCC

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source_ccc: "Typologie,CCC et scoring.docx"
source_recommendations: "🤖 IA (à valider)"
extraction_date: "YYYY-MM-DD"
total_ccc: {N}
```

---

## 🎯 Distinction Clé

| Élément | Source |
|---------|--------|
| **Définition CCC** (conditions, questions impliquées) | ✅ Legacy Typologie,CCC et scoring.docx |
| **Recommendations spécifiques CCC** (texte app + MT) | 🤖 IA (à valider par équipe clinique) |

> ⚠️ Les CCC sont définies dans les sources. Mais les **recommendations spécifiques** à déclencher quand une CCC est activée ont été **générées par IA** car absentes des documents sources.

---

## 📋 Format par CCC

```markdown
### CCC_{X}_{N} - {Nom descriptif}

**Micro-parcours** : {MP associé}
**Priorité** : 🟠 Niveau 2

#### Condition (✅ Source Legacy)

```
SI ({ID1} = "{Option}") 
ET ({ID2} = "{Option}") 
[ET ({ID3} = "{Option}")]
ALORS déclencher {MP}
```

#### Questions impliquées (✅ Source Legacy)

| ID | Libellé | Rôle dans CCC |
|----|---------|---------------|
| {ID1} | {Libellé court} | Scorante / Déclenchante |
| {ID2} | {Libellé court} | Scorante / Déclenchante |

> ⚠️ **Règle Legacy** : Jamais de question critique directe dans une CCC

#### Raisonnement clinique (🤖 IA)

> {Explication de pourquoi cette combinaison est critique}
> ⚠️ Généré par IA - À valider par équipe clinique

#### Recommendations spécifiques CCC (🤖 IA)

> ⚠️ **Non présentes dans les sources** - Générées par IA, à valider

**📱 Recommendation App** (utilisateur) :
> {Texte pour l'utilisateur quand cette CCC est activée}

**📋 Micro-tâches IDEC** (interne) :

| # | Micro-tâche | Type | Acteur |
|---|-------------|------|--------|
| 1 | {Tâche spécifique CCC} | `{TYPE}` | {Acteur} |
| 2 | {Tâche spécifique CCC} | `{TYPE}` | {Acteur} |
```

---

## ⚠️ Règles (Legacy Priorisation 060226)

1. **CCC = Combinaison** de questions scorantes/déclenchantes/descriptives
2. **JAMAIS de question critique directe** dans une CCC (elle suffit seule)
3. **Priorité Niveau 2** : Après critiques directes, avant déclenchantes simples
4. **Échéance** : ≤ 1 mois

---

## 📋 Exemple V1

```markdown
### CCC_R2_01 - Isolement + Charge unique

**Micro-parcours** : R2 (Soutien entourage)
**Priorité** : 🟠 Niveau 2

#### Condition (✅ Source Legacy)

```
SI (E1 = "Je fais presque tout / je suis totalement seul·e") 
ET (N4 = "Oui")
ALORS déclencher R2
```

#### Questions impliquées (✅ Source Legacy)

| ID | Libellé | Rôle dans CCC |
|----|---------|---------------|
| E1 | Répartition de l'aide | Scorante |
| N4 | Aidant seul dans la famille | Déclenchante |

#### Raisonnement clinique (🤖 IA)

> L'aidant cumule une charge totale (E1=max) avec l'absence de relais familial (N4=oui). Cette combinaison révèle un risque d'épuisement accru non capté par les éléments isolés.
> ⚠️ Généré par IA - À valider par équipe clinique

#### Recommendations spécifiques CCC (🤖 IA)

**📱 Recommendation App** (utilisateur) :
> Vous semblez porter une charge importante sans relais familial identifié. Il est essentiel de vous entourer de soutiens extérieurs pour préserver votre équilibre.

**📋 Micro-tâches IDEC** (interne) :

| # | Micro-tâche | Type | Acteur |
|---|-------------|------|--------|
| 1 | Évaluer urgence mise en place de répit | `SEC` | IDEC |
| 2 | Identifier aidants secondaires potentiels | `STRUC` | IDEC |
| 3 | Orienter vers association d'aidants | `INFO` | IDEC |
| 4 | Proposer groupe de parole | `STRUC` | IDEC |
| 5 | Vérifier droits congé aidant | `ORGA` | IDEC |
```

---

## 🔍 Où trouver les Recommendations CCC IA existantes

Les recommendations CCC générées par IA dans l'ancienne structure :
- `QUESTIONNAIRE/V{X}/base/ccc_recommendations.md`

**À faire** : Migrer vers ce template en marquant clairement les éléments 🤖 IA.
