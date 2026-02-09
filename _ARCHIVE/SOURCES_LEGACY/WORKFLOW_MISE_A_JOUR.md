# 🔄 Workflow de Mise à Jour des Données Monka

> **Version** : 1.0  
> **Date** : 06/02/2026

---

## 📋 Vue d'ensemble

Ce document décrit le processus **normé et reproductible** pour mettre à jour les données du moteur Monka.

```
VERIF → DIFF → EXTRACT → PROPAGATE → IMPLEMENT → LOG → CERTIFY
```

---

## Étape 1: VERIF — Déposer la nouvelle documentation

**Quoi** : Placer la nouvelle version du document dans `SOURCES/VERIF/pending/`

**Action** :
```bash
cp "nouveau_fichier.docx" SOURCES/VERIF/pending/
```

**Règle** : Ne jamais modifier directement les fichiers dans `legacy/` ou `excel/`

---

## Étape 2: DIFF — Comparer avec la version actuelle

**Quoi** : Identifier les différences entre l'ancienne et la nouvelle version

**Action** :
```bash
# Lister les fichiers en attente
ls SOURCES/VERIF/pending/

# Extraire le nouveau fichier temporairement
python3 SOURCES/extract_sources.py --diff SOURCES/VERIF/pending/nouveau.docx
```

**Résultat** : Un rapport de diff est généré dans `SOURCES/VERIF/diff_report.md`

---

## Étape 3: EXTRACT — Mettre à jour les JSON

**Quoi** : Régénérer les fichiers JSON extracted

**Action** :
```bash
# Déplacer le fichier validé vers la source officielle
mv SOURCES/VERIF/pending/nouveau.docx SOURCES/legacy/

# Régénérer tous les JSON
python3 SOURCES/extract_sources.py
```

**Vérification** :
```bash
# Vérifier le manifest
cat SOURCES/extracted/extraction_manifest.json
```

---

## Étape 4: PROPAGATE — Identifier les templates impactés

**Quoi** : Déterminer quels templates dans `QUESTIONNAIRE_V2/templates/` doivent être mis à jour

**Référence** : Consulter la matrice dans `QUESTIONNAIRE_V2/IMPLEMENTATION_GUIDE.md` (section Mapping)

| Type de source modifiée | Templates impactés |
|------------------------|-------------------|
| Questionnaire | questions.md, scoring.md |
| Priorisation | declencheurs.md |
| Typologie,CCC | ccc.md, scoring.md |
| SOPHIE CAT | recommendations.md |
| ASR Referent | asr.md |
| microparcours_aidant | asr.md |

---

## Étape 5: IMPLEMENT — Mettre à jour le moteur

**Quoi** : Propager les changements vers le simulateur dans `DEMO/`

**Fichiers potentiellement impactés** :
- `DEMO/monka_simulator.html`
- `QUESTIONNAIRE/V{X}/base/simulator_data.json`

---

## Étape 6: LOG — Documenter le changement

**Quoi** : Ajouter une entrée dans le changelog

**Fichier** : `LOGS/donnees/changelog.md`

**Format** :
```markdown
## [DATE] — Mise à jour [NOM_FICHIER]

**Source** : `SOURCES/legacy/[fichier].docx`
**Hash avant** : `abc123...`
**Hash après** : `def456...`

### Changements détectés
- [Liste des modifications]

### Templates mis à jour
- [x] questions.md
- [x] scoring.md

### Implémentation moteur
- [x] simulator_data.json V1 mis à jour

**Validé par** : [Nom]
```

---

## Étape 7: CERTIFY — Générer le rapport de certification

**Quoi** : Créer un rapport prouvant que le moteur utilise les données exactes

**Fichier** : `LOGS/donnees/rapports/YYYYMMDD_certification.md`

**Contenu** :
1. ✅ Liste des fichiers source avec hashes MD5
2. ✅ Couverture 100% Legacy + Excel → JSON
3. ✅ Templates mis à jour
4. ✅ Moteur implémenté
5. ✅ Preuves (extraits de données comparés)

---

## 🚀 Commandes Rapides

```bash
# Régénérer tous les JSON
python3 SOURCES/extract_sources.py

# Vérifier la couverture
python3 SOURCES/extract_sources.py --verify

# Voir le manifest
cat SOURCES/extracted/extraction_manifest.json
```

---

## ⚠️ Règles Importantes

1. **Ne jamais modifier les sources directement** — Toujours passer par VERIF
2. **Toujours loguer** — Chaque mise à jour doit être tracée
3. **Toujours certifier** — Chaque cycle se termine par un rapport
