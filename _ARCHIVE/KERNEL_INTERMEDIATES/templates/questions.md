# 📝 Template: questions.md

> **Source** : `SOURCES/legacy/Legacy questionnaire 060226.docx` + `SOURCES/excel/Questionnaire validé.xlsx`  
> **Contenu** : Questions uniquement (IDs, libellés, options)  
> **Pas de** : Scoring, déclencheurs, recommendations

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source: "Legacy questionnaire 060226 + Excel"
extraction_date: "YYYY-MM-DD"
total_questions: {N}
```

---

## 📋 Format par Question

```markdown
### {ID} - {Titre court}

**Libellé** : {Texte de la question tel qu'affiché à l'utilisateur}

**Options** :
| Code | Libellé option |
|------|----------------|
| A | {Option 1} |
| B | {Option 2} |
| ... | ... |

**Métadonnées** :
- Type proche aidé : {Tous / Spécifique}
- Condition d'affichage : {None / Condition}
```

---

## ⚠️ Règles

1. **PAS de scoring** → voir `scoring.md`
2. **PAS de déclencheurs** → voir `declencheurs.md`
3. **PAS de triggers** → voir `triggers.md` (contexte/profil)
4. **PAS de recommendations** → voir `recommendations.md`
5. **IDs stables** : Ne jamais changer un ID existant
6. **Libellés exacts** : Copier textuellement depuis la source

---

## 📋 Exemple

```markdown
### E2 - Soutien mobilisable en cas de coup dur

**Libellé** : En cas de coup dur, avez-vous des personnes sur qui compter pour vous aider ?

**Options** :
| Code | Libellé option |
|------|----------------|
| A | Oui, plusieurs personnes |
| B | Oui, une personne |
| C | Très peu de personnes / personne |

**Métadonnées** :
- Type proche aidé : Tous
- Condition d'affichage : None
```
