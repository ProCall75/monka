# SOP-003 : Cycle de Sprint
> Version: 1.0 | Auteur: Antonin | MAJ: 2026-03-03 | Statut: Actif

## Déclencheur
Début ou fin d'un sprint moteur (Sprint 0 à 5).

## Pré-requis
- [ ] Le sprint précédent est clôturé (sauf Sprint 0)
- [ ] Le dossier sprint existe dans `moteur/sprints/sprint-NN-xxx/`

## Étapes — Début de Sprint
1. **Ouvrir le sprint** — créer `sprint-report.md` depuis TPL-06 avec objectif et date de début
2. **Identifier les livrables** — lister les fiches à remplir (quels templates, combien)
3. **Planifier les sessions Dr. Monka** — estimer le nombre de sessions nécessaires

## Étapes — Pendant le Sprint
4. **Remplir les fiches** — utiliser les templates appropriés (TPL-01 à TPL-05)
5. **Documenter chaque décision** — D-XXX dans `decisions/`
6. **Appliquer SOP-001** pour chaque modification de data

## Étapes — Fin de Sprint
7. **Exécuter la checklist qualité** — les 10 contrôles de `moteur/_standards/checklist-qualite.md`
8. **Compléter le sprint report** (TPL-06) avec résultats, décisions, anomalies
9. **Signer la clôture** — Antonin + Dr. Monka
10. **Mettre à jour INDEX.md** et `moteur/registre-decisions.md`

## Validation
Sprint clôturé = les deux signatures sur le sprint report + les 10 contrôles qualité passés.

## Critères de succès
- [ ] Toutes les fiches du sprint sont remplies et signées
- [ ] Checklist qualité 10/10 (ou exceptions documentées)
- [ ] Sprint report complet
- [ ] INDEX.md à jour

## En cas de problème
Si un contrôle qualité ne passe pas → documenter dans le sprint report avec un plan de résolution pour le sprint suivant.
