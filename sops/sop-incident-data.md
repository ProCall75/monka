# SOP-004 : Incident Data Clinique
> Version: 1.0 | Auteur: Antonin | MAJ: 2026-03-03 | Statut: Actif

## Déclencheur
Un bug ou une anomalie est détecté sur des données cliniques en production (scoring incorrect, règle qui ne fire pas, MT manquante, seuil erroné).

## Pré-requis
- L'anomalie est confirmée (pas juste un doute — vérifier dans le simulateur)

## Étapes
1. **STOP** — Ne pas corriger immédiatement. Documenter d'abord.
2. **Évaluer la gravité** :
   - 🟡 Mineur : cosmétique, pas d'impact clinique (typo wording)
   - 🟠 Modéré : impact clinique limité (seuil légèrement décalé)
   - 🔴 Critique : impact clinique majeur (règle manquante, scoring inversé)
3. **Créer un D-XXX** avec catégorie 📊 Data et gravité
4. **Si 🔴 Critique** : rollback immédiat à la dernière version stable (git revert + restauration DB si nécessaire)
5. **Identifier la cause** : quand l'anomalie est apparue, qui a modifié quoi
6. **Corriger** via SOP-001 (modification data clinique)
7. **Vérifier la non-régression** — tous les personas passent correctement
8. **Informer** Dr. Monka si l'anomalie est clinique

## Validation
| Gravité | Validation requise |
|---|---|
| 🟡 | Antonin seul |
| 🟠 | Antonin + D-XXX |
| 🔴 | Antonin + Dr. Monka + D-XXX + non-régression complète |

## Critères de succès
- [ ] Anomalie documentée (D-XXX)
- [ ] Cause identifiée
- [ ] Correction appliquée
- [ ] Non-régression OK
- [ ] Registre de décisions à jour

## En cas de problème
Si la cause n'est pas identifiable → geler les modifications sur les tables impactées jusqu'à résolution.
