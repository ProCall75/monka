# SOP-001 : Modification de données cliniques
> Version: 1.0 | Auteur: Antonin | MAJ: 2026-03-03 | Statut: Actif

## Déclencheur
Toute modification en base de données Supabase sur les tables cliniques : `scoring_questions`, `vulnerabilities`, `seuils`, `activation_rules`, `categories`, `micro_parcours`, `recommendations`, `micro_taches`, `acteurs`.

## Pré-requis
- [ ] La modification est justifiée (cliniquement ou techniquement)
- [ ] L'impact sur les autres tables est identifié

## Étapes
1. **Créer un D-XXX** dans `moteur/registre-decisions.md` AVANT de toucher la base
   - Utiliser le template `moteur/_templates/tpl-05-decision.md`
   - Documenter : contexte, options, décision, impact
2. **Identifier les tables impactées** — lister précisément quels champs changent
3. **Faire la modification** en base de données
4. **Vérifier la non-régression** — les personas existants donnent les mêmes résultats qu'avant (sauf sur ce qui a changé volontairement)
5. **Vérifier l'affichage simulateur** — la modification s'affiche correctement
6. **Mettre à jour le référentiel** si le changement impacte `moteur/referentiel/`

## Validation
| Qui | Ce qu'il valide |
|---|---|
| Antonin | La modification technique est correcte, pas de régression |
| Dr. Monka | La modification clinique est pertinente (si data clinique) |

## Critères de succès
- [ ] D-XXX créé et renseigné
- [ ] Base modifiée
- [ ] Non-régression OK
- [ ] Affichage simulateur OK
- [ ] Référentiel à jour

## En cas de problème
→ Rollback la modification en base, documenter dans le D-XXX pourquoi ça n'a pas marché.
