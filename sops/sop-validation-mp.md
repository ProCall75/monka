# SOP-002 : Validation d'un Micro-Parcours
> Version: 1.0 | Auteur: Antonin | MAJ: 2026-03-03 | Statut: Actif

## Déclencheur
Début de la validation d'un MP dans un sprint (principalement Sprint 2).

## Pré-requis
- [ ] Le sprint est actif
- [ ] Les données du MP sont à jour en base
- [ ] Le template TPL-03 est copié dans le dossier sprint

## Étapes
1. **Copier le template** `moteur/_templates/tpl-03-validation-mp.md` → `moteur/sprints/sprint-02-regles/mpNN-validation.md`
2. **Pré-remplir l'en-tête** (MP ID, nom, V, ASR, date)
3. **Pré-remplir les données** (questions, catégories, règles, MTs) depuis la base
4. **Session Dr. Monka** — parcourir les 6 actions séquentiellement :
   - ACTION 1 : Catégories (quoi)
   - ACTION 2 : Règles d'activation (quand)
   - ACTION 3 : Micro-Tâches (comment)
   - ACTION 4 : Enrichissement (acteurs, types)
   - ACTION 5 : Wording (recos + MTs versionnés)
   - ACTION 6 : Cohérence (prévention + checklist 8 points)
5. **Vérifier l'affichage simulateur** — le MP s'affiche correctement
6. **Signer** — Antonin (technique) + Dr. Monka (clinique)

## Validation
Les deux signatures doivent être apposées pour considérer le MP validé.

## Critères de succès
- [ ] Les 6 actions sont complétées
- [ ] Checklist 8 points passée
- [ ] Affichage simulateur vérifié
- [ ] Les deux signatures apposées

## En cas de problème
Si un problème majeur est trouvé → créer un D-XXX, appliquer SOP-001 pour la correction, puis reprendre la validation.
