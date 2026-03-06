# SOP-005 : Déploiement
> Version: 1.0 | Auteur: Antonin | MAJ: 2026-03-03 | Statut: Actif

## Déclencheur
Push de code vers production (Vercel) — que ce soit un fix, une feature, ou un changement de configuration.

## Pré-requis
- [ ] Le code compile (`npm run build` passe)
- [ ] Les types sont valides (`npx tsc --noEmit` = 0 erreurs)
- [ ] Pas de modifications de data clinique non documentées

## Étapes
1. **Build local** — `npm run build` dans `app/`
2. **Check types** — `npx tsc --noEmit`
3. **Vérifier le simulateur** — lancer `npm run dev`, tester un persona complet
4. **Si data clinique modifiée** — vérifier que SOP-001 a été appliquée
5. **Git commit** avec message descriptif
6. **Push** — le déploiement Vercel est automatique
7. **Vérifier en production** — le simulateur fonctionne sur l'URL de prod
8. **Si problème** — rollback via Vercel (redeploy précédent)

## Validation
Build clean + types clean + simulateur fonctionnel = OK pour push.

## Critères de succès
- [ ] Build ✅
- [ ] Types ✅
- [ ] Simulateur local ✅
- [ ] Déploiement Vercel ✅
- [ ] Vérification prod ✅

## En cas de problème
Vercel permet le rollback instantané vers le déploiement précédent. Le faire immédiatement si un problème est détecté en prod.
