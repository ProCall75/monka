---
description: Processus de mise à jour des données sources vers le moteur Monka
---

# Skill: Mise à Jour Données Monka

## Quand utiliser ce skill

Utiliser ce skill quand :
- Une nouvelle version d'un document Legacy (.docx) est disponible
- Un fichier Excel (.xlsx) a été mis à jour par le médecin
- On veut régénérer les JSON extracted
- On veut vérifier la couverture des sources

---

## Prérequis

1. Les documents à vérifier doivent être dans `SOURCES/VERIF/pending/`
2. L'environnement virtuel Python doit exister : `.venv/`

---

## Étapes du Workflow

### ÉTAPE 1: VERIF — Vérifier les documents en attente

```bash
# Lister les documents en attente
ls -la SOURCES/VERIF/pending/
```

S'il y a des documents, passer à l'étape 2. Sinon, le processus est terminé.

---

### ÉTAPE 2: DIFF — Identifier les différences

Pour chaque document dans `pending/` :

1. Identifier s'il remplace un document existant :
   ```bash
   ls SOURCES/legacy/ | grep -i "nom_du_fichier"
   ls SOURCES/excel/ | grep -i "nom_du_fichier"
   ```

2. Si oui, extraire les deux versions et comparer (manuel pour l'instant)

3. Documenter les différences principales

---

### ÉTAPE 3: EXTRACT — Régénérer les JSON

```bash
# Déplacer le fichier validé vers la source officielle
# // turbo
mv "SOURCES/VERIF/pending/fichier.docx" "SOURCES/legacy/"
# OU pour Excel :
mv "SOURCES/VERIF/pending/fichier.xlsx" "SOURCES/excel/"

# Régénérer tous les JSON
# // turbo
source .venv/bin/activate && python3 SOURCES/extract_sources.py
```

Vérifier la sortie : doit afficher "✅ EXTRACTION TERMINÉE" avec 17 Legacy et 4 Excel.

---

### ÉTAPE 4: PROPAGATE — Identifier les templates impactés

Consulter la matrice de mapping dans `QUESTIONNAIRE_V2/IMPLEMENTATION_GUIDE.md` :

| Source modifiée | Templates à mettre à jour |
|-----------------|---------------------------|
| Questionnaire | questions.md, scoring.md |
| Priorisation | declencheurs.md |
| Typologie,CCC | ccc.md, scoring.md |
| SOPHIE CAT | recommendations.md |
| ASR Referent | asr.md |
| microparcours | asr.md |
| scoring | scoring.md |

Lister les templates impactés et les modifications à apporter.

---

### ÉTAPE 5: IMPLEMENT — Mettre à jour le moteur

Fichiers potentiellement impactés :
- `QUESTIONNAIRE_V2/templates/*.md`
- `QUESTIONNAIRE/V{X}/base/simulator_data.json`
- `DEMO/monka_simulator.html`

Appliquer les modifications nécessaires.

---

### ÉTAPE 6: LOG — Documenter le changement

Ajouter une entrée dans `LOGS/donnees/changelog.md` avec le format :

```markdown
## [DATE] — Mise à jour [NOM_FICHIER]

**Source** : `SOURCES/legacy/[fichier].docx`
**Hash avant** : `[ancien_hash]`
**Hash après** : `[nouveau_hash]`

### Changements détectés
- [Liste des modifications]

### Templates mis à jour
- [x] [template1].md
- [x] [template2].md

### Implémentation moteur
- [x] [fichier] mis à jour

**Validé par** : [Nom]
```

---

### ÉTAPE 7: CERTIFY — Générer le rapport de certification

Créer un rapport dans `LOGS/donnees/rapports/YYYYMMDD_certification.md` avec :

1. ✅ Liste des fichiers source avec hashes MD5
2. ✅ Couverture 100% Legacy + Excel → JSON
3. ✅ Templates mis à jour
4. ✅ Moteur implémenté
5. ✅ Preuves (extraits de données comparés)

---

## Commandes Rapides

```bash
# // turbo-all
# Vérifier les docs en attente
ls SOURCES/VERIF/pending/

# Régénérer les JSON
source .venv/bin/activate && python3 SOURCES/extract_sources.py

# Voir le manifest
cat SOURCES/extracted/extraction_manifest.json

# Voir le changelog
cat LOGS/donnees/changelog.md
```

---

## Vérification Finale

À la fin du processus, vérifier :

- [ ] Tous les fichiers dans `SOURCES/VERIF/pending/` ont été traités
- [ ] `extraction_manifest.json` montre 17 Legacy + 4 Excel, tous status "OK"
- [ ] `changelog.md` contient une entrée pour cette mise à jour
- [ ] Un rapport de certification a été généré
