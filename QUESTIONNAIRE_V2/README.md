# 📁 QUESTIONNAIRE_V2 - Nouvelle Structure

> **Version** : 2.2  
> **Date** : 06/02/2026  
> **Objectif** : Structure optimisée pour l'implémentation moteur

---

## 📊 Structure par Vulnérabilité (10 fichiers)

```
V{X}/
├── questions.md          # Questions uniquement
├── scoring.md            # Règles de scoring
├── triggers.md           # Questions contexte/profil (futurs personas) ✨ NEW
├── declencheurs.md       # Déclencheurs MP (priorisation) ✨ RENOMMÉ
├── recommendations.md    # Recos par question
├── ccc.md                # CCC + conditions
├── asr.md                # ASR + micro-parcours
├── suivi.md              # Suivi longitudinal + mensuel
├── progression.md        # Grammaire de progression
└── engine_data.json      # Export unifié moteur
```

---

## 🎯 Distinction Critique : Triggers vs Déclencheurs

| Fichier | Contenu | Effet |
|---------|---------|-------|
| `triggers.md` | Questions de **contexte/profil** (15 IDs officiels) | ❌ Ne déclenche RIEN |
| `declencheurs.md` | Questions qui **activent des micro-parcours** | ✅ Active un MP |

**Liste officielle des 15 triggers** (fermée et normative) :
```
N3, O35, O36, N1, O64, O46, O14, O1, O63, O49, N26, E71, E72, O2, N31
```

> ⚠️ **Legacy 060226** : *"Ce sont des triggers / facteurs de contexte, pas des états."*

---

## 🔗 Mapping Source → Fichier

| Fichier | Source SOURCES/ | Source IA |
|---------|-----------------|-----------|
| `questions.md` | ✅ Legacy questionnaire + Excel | - |
| `scoring.md` | ✅ Legacy scoring | - |
| `triggers.md` | ✅ Legacy questionnaire (section 4.7) | - |
| `declencheurs.md` | ✅ Legacy Priorisation + Micro parcours | - |
| `recommendations.md` | ✅ Tableau SOPHIE CAT Excel | 🤖 Typage MT |
| `ccc.md` | ✅ Legacy Typologie,CCC | 🤖 Recommendations CCC |
| `asr.md` | ✅ Legacy Micro parcours + ASR | 🤖 Signatures V2-V5 |
| `suivi.md` | ✅ Legacy suivi longitudinal + Excel mensuel | - |
| `progression.md` | ✅ Legacy grammaire de progression | - |
| `engine_data.json` | Généré depuis les autres fichiers | - |

---

## ⚠️ Éléments Générés par IA

| Élément | Fichier | Détail |
|---------|---------|--------|
| **Recommendations CCC** | `ccc.md` | 🤖 Non présentes dans sources - À valider |
| **Typage Micro-tâches** | `recommendations.md` | 🤖 Assignation STRUC/SEC/MED/INFO/ORGA |
| Signatures ASR V2-V5 | `asr.md` | ⚠️ Partiellement IA |

---

## 📚 Terminologie

| Terme | Définition | Fichier |
|-------|------------|---------|
| **Trigger** | Question de contexte/profil (futurs personas) | `triggers.md` |
| **Déclencheur** | Question qui active un micro-parcours | `declencheurs.md` |
| **Recommendation** | Conseil affiché à l'utilisateur | `recommendations.md` |
| **Micro-tâche** | Action IDEC interne | `recommendations.md` |
| **CCC** | Combinaison de questions → MP | `ccc.md` |

---

## 📋 Documents de Référence

| Document | Usage |
|----------|-------|
| `UNDERSTANDING.md` | Glossaire et liens entre concepts |
| `IMPLEMENTATION_GUIDE.md` | Mapping détaillé SOURCES → Templates |
| `AUDIT_COUVERTURE.md` | Vérification couverture 100% des sources |

---

> ✅ **Couverture 100%** - Tous les fichiers SOURCES sont mappés vers les templates
