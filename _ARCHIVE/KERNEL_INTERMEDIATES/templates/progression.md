# 🔄 Template: progression.md

> **Source** : `SOURCES/legacy/Legacy grammaire de progression 190126.docx`  
> **Contenu** : Règles de progression patient dans les micro-parcours  
> **Usage** : Gestion des états et transitions patient

---

## 📊 Métadonnées

```yaml
vulnerability: V{X}
name: "{Nom de la vulnérabilité}"
source: "Legacy grammaire de progression 190126"
extraction_date: "YYYY-MM-DD"
total_etats: {N}
total_transitions: {N}
```

---

## 🎯 États de Progression

> États possibles du patient dans un micro-parcours

```markdown
### État: {NOM_ETAT}

**Code** : {CODE}
**Description** : {Description de l'état}
**Couleur UI** : {🟢/🟡/🔴}

**Conditions d'entrée** :
- {Condition 1}
- {Condition 2}

**Actions associées** :
- {Action automatique ou manuelle}
```

---

## 🔀 Règles de Transition

> Passage d'un état à un autre

```markdown
### Transition: {ÉTAT_A} → {ÉTAT_B}

**Déclencheur** : {Événement ou condition}
**Délai minimum** : {Jours/Semaines}
**Validation requise** : {Oui/Non - par qui}

**Conditions** :
```
SI ({condition1}) 
ET ({condition2})
ALORS transition vers {ÉTAT_B}
```

**Actions à la transition** :
1. {Action 1}
2. {Action 2}
```

---

## 📋 États Standard (tous MP)

| Code | État | Description | Suivant possible |
|------|------|-------------|------------------|
| `INIT` | Initialisé | MP vient d'être déclenché | EN_COURS |
| `EN_COURS` | En cours | Actions en cours de réalisation | PAUSE, COMPLET, ÉCHEC |
| `PAUSE` | En pause | Interruption temporaire | EN_COURS, ABANDON |
| `COMPLET` | Complété | Signatures ASR validées | - (terminal) |
| `ÉCHEC` | Échec | Objectifs non atteints | INIT (relance) |
| `ABANDON` | Abandonné | Patient/équipe abandonne | - (terminal) |

---

## ⏱️ Délais et Échéances

```markdown
### Délais par niveau de priorité

| Priorité | Délai max | Relance si inactif |
|----------|-----------|-------------------|
| 🔴 Niveau 1 | 7 jours | 3 jours |
| 🟠 Niveau 2 | 30 jours | 14 jours |
| 🟢 Niveau 3 | 90 jours | 30 jours |
```

---

## ⚠️ Règles (Legacy grammaire de progression)

1. **États terminaux** : COMPLET et ABANDON ne permettent pas de transition sortante
2. **Relance automatique** : Si ÉCHEC, possibilité de relancer après délai
3. **PAUSE** : Maximum 30 jours avant notification équipe
4. **Historique** : Toutes les transitions sont tracées

---

## 📋 Exemple V1 - MP R2

```markdown
### État: EN_COURS_R2

**Code** : R2_EN_COURS
**Description** : Recherche active de soutien entourage
**Couleur UI** : 🟡

**Conditions d'entrée** :
- R2 déclenché (E2="C" OU N4="Oui" OU CCC_R2)
- Équipe IDEC assignée

**Actions associées** :
- Envoyer notification IDEC
- Créer tâches dans agenda

---

### Transition: R2_EN_COURS → R2_COMPLET

**Déclencheur** : Toutes signatures ASR validées
**Délai minimum** : 7 jours
**Validation requise** : Oui - IDEC référent

**Conditions** :
```
SI (SIG_R2_01 = validé) 
ET (SIG_R2_02 = validé)
ET (SIG_R2_03 = validé)
ALORS transition vers R2_COMPLET
```

**Actions à la transition** :
1. Générer CR de clôture
2. Notifier patient
3. Archiver le MP
```
