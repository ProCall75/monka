f-e)---
name: monka-screenshot-audit
description: Analyse systématique des screenshots de l'app Monka pour mapper les critiques existantes et identifier de nouveaux problèmes UX. Utiliser quand on dit "analyse screenshots monka", "audit visuel monka", "map critiques aux screens", "parcours les screens monka".
---

# Monka Screenshot Audit

Skill d'audit visuel systématique de l'application Monka. Analyse des screenshots pour mapper les critiques existantes et découvrir de nouveaux problèmes UX.

## Important

- **Anti-biais** : Ne jamais inventer un problème. Distinguer OBSERVATION (ce qui est visible) d'INTERPRÉTATION (ce qu'on en déduit). Si un écran semble correct, le dire.
- **Exhaustivité** : Chaque screenshot doit être vu et analysé. Aucun ne doit être ignoré.
- **Preuves** : Chaque critique doit être liée à au moins un screenshot spécifique (nom de fichier).

## Protocole d'analyse — 4 phases

### Phase 1 : Inventaire

1. Lister tous les fichiers image du dossier cible (PNG/JPG/WEBP)
2. Les trier par ordre numérique (IMG_3683 < IMG_3684 < ... etc.)
3. Visionner chaque image avec `view_file` par batch de **5 images maximum**
4. Pour chaque image, noter :
   - **Nom fichier**
   - **Section de l'app** (identifier via `references/taxonomie-ecrans.md`)
   - **Description courte** (1 ligne : ce qu'on voit à l'écran)

**Livrable** : Tableau d'inventaire complet (fichier → section → description)

### Phase 2 : Cartographie

1. Consulter `references/taxonomie-ecrans.md` pour connaître les sections attendues
2. Regrouper les screenshots par section de l'app :
   - Onboarding (splash, inscription, questionnaire)
   - Dashboard (accueil, scores, tâches, carousels)
   - Ressources (pour moi, pour mon proche, blog)
   - Contacts / Interlocuteurs (santé, démarches, services)
   - Recherche d'acteurs
   - Profil / Paramètres
   - Autres (modales, erreurs, états vides)
3. Identifier les gaps : sections de l'app sans screenshot

**Livrable** : Carte visuelle de couverture (quelles sections sont couvertes, lesquelles manquent)

### Phase 3 : Diagnostic

Pour chaque screenshot, appliquer **deux analyses en parallèle** :

#### A. Mapping aux critiques existantes

1. Consulter `references/critiques-existantes.md`
2. Pour chaque critique (C01–C12), vérifier si le screenshot montre des **indices visuels** correspondants
3. Si oui, noter : `[SCREENSHOT] → [ID_CRITIQUE] : [observation précise]`
4. Si non, passer (ne pas forcer un match)

#### B. Découverte de nouveaux problèmes

1. Appliquer la grille `references/grille-analyse-ux.md` :
   - **Typo/Wording** : fautes d'orthographe, incohérence tutoiement/vouvoiement, mélange de tons
   - **Hiérarchie visuelle** : éléments confus, CTA peu clairs, surcharge
   - **Navigation** : tabs non fonctionnels, états actifs absents
   - **Personnalisation** : termes génériques ("l'aidé") au lieu du prénom
   - **Pédagogie** : absence d'explication, termes métier non définis
   - **Cohérence** : ruptures de style entre écrans
2. Pour chaque problème trouvé, noter :
   - Screenshot source
   - Catégorie du problème
   - Observation factuelle (ce qu'on voit)
   - Gravité estimée (🔴 BLOQUANT / 🟠 MAJEUR / 🟡 MINEUR)

**CRITIQUE** : Ne pas tomber dans le biais de confirmation. Si un écran semble bien fait, le dire. L'objectif est la précision, pas le volume de critiques.

### Phase 4 : Rapport

Générer un rapport structuré en markdown :

```markdown
# 🔍 Audit Visuel Monka — [Date]

## Résumé exécutif
- X screenshots analysés
- X critiques existantes confirmées visuellement
- X nouveaux problèmes identifiés

## Couverture
[Tableau section → screenshots]

## Critiques existantes — Preuves visuelles
### C01 — Zéro profondeur
- **Screenshots** : [liste]
- **Observations** : [ce qu'on voit]

[... pour chaque critique confirmée]

## Nouvelles découvertes
### N01 — [Titre du problème]
- **Screenshot** : [fichier]
- **Catégorie** : [typo/hiérarchie/navigation/etc.]
- **Observation** : [factuel]
- **Gravité** : [emoji + niveau]

## Écrans conformes
[Liste des screenshots sans problème notable — important pour éviter le biais]
```

## Techniques de traitement

### Batch viewing
- Visionner les images par groupes de 5 avec `view_file`
- Comparer les screenshots du même batch pour détecter les incohérences inter-écrans
- Prendre des notes structurées après chaque batch avant de passer au suivant

### Ordre de traitement
- Suivre l'ordre chronologique des screenshots (reflet du parcours utilisateur réel)
- Cela permet de reconstituer le flow et d'identifier les ruptures d'expérience

### Annotation précise
- Toujours citer le nom exact du fichier
- Décrire la zone de l'écran concernée (header, body, footer, modale, tab bar)
- Si du texte est visible et problématique, le citer verbatim entre guillemets
