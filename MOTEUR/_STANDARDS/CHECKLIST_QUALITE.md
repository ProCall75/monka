# ✅ Checklist Qualité — Appliquée à chaque sprint

> **Version** : 1.0
> **Date** : 3 mars 2026
> **Principe** : Ces 10 contrôles sont exécutés à la fin de chaque sprint. Aucun sprint ne peut être clôturé sans que tous les contrôles soient passés ou explicitement reportés avec un D-XXX.

---

## Les 10 contrôles

### Contrôles Data (automatisables)

| # | Contrôle | Ce qu'on vérifie | Outil | Obligatoire |
|---|---|---|---|---|
| Q1 | **Intégrité référentielle** | 0 orphelins dans la chaîne Q→Score→Règle→Cat→MP→Reco→MT | Script SQL | ✅ Toujours |
| Q2 | **Complétude champs** | 0 null sur les champs obligatoires modifiés dans le sprint | Script SQL | ✅ Toujours |
| Q3 | **Cohérence comptages** | REFERENTIEL (KERNEL_V6) matchent la DB réelle | Script SQL | ✅ Sprint 0, puis si modif |
| Q4 | **Non-régression** | Les personas existants produisent les mêmes résultats qu'avant | Simulateur | ✅ Si data modifiée |

### Contrôles Techniques (automatisables)

| # | Contrôle | Ce qu'on vérifie | Outil | Obligatoire |
|---|---|---|---|---|
| Q5 | **Build** | `npm run build` passe sans erreur | Terminal | ✅ Si code modifié |
| Q6 | **Types** | `npx tsc --noEmit` = 0 erreurs | Terminal | ✅ Si code modifié |
| Q7 | **Affichage simulateur** | Les données modifiées s'affichent correctement dans le simulateur | Navigateur (vérif visuelle) | ✅ Si data modifiée |

### Contrôles Cliniques (Dr. Monka)

| # | Contrôle | Ce qu'on vérifie | Outil | Obligatoire |
|---|---|---|---|---|
| Q8 | **Validation clinique** | Dr. Monka a signé les fiches de validation du sprint | Fiches signées | ✅ Toujours |
| Q9 | **Sens clinique** | Chaque modification de données cliniques a un sens clinique documenté | Fiches + D-XXX | ✅ Si data clinique modifiée |

### Contrôle Traçabilité (Token Guard)

| # | Contrôle | Ce qu'on vérifie | Outil | Obligatoire |
|---|---|---|---|---|
| Q10 | **Registre à jour** | Chaque modification = 1 entrée D-XXX dans le registre | REGISTRE_DECISIONS.md | ✅ Toujours |

---

## Comment reporter un contrôle

Si un contrôle ne peut pas être passé :
1. Créer un D-XXX expliquant pourquoi
2. Indiquer dans le sprint_report.md : `Q{N} : ⚠️ Reporté — D-XXX`
3. Le contrôle DOIT être résolu avant la fin du sprint suivant

## Résultat attendu dans le sprint_report

```markdown
## Checklist Qualité

| # | Contrôle | Résultat | Preuve |
|---|---|---|---|
| Q1 | Intégrité référentielle | ✅ 0 orphelins | Script audit_data.sql |
| Q2 | Complétude champs | ✅ | Requête coverage |
| Q3 | Cohérence comptages | ✅ 24 MPs DB = 24 KERNEL | — |
| Q4 | Non-régression | ✅ 8/8 personas OK | Screenshots |
| Q5 | Build | ✅ | `npm run build` log |
| Q6 | Types | ✅ 0 erreurs | `npx tsc --noEmit` log |
| Q7 | Affichage simulateur | ✅ | Captures d'écran |
| Q8 | Validation clinique | ✅ 5/5 fiches signées | Liens vers fiches |
| Q9 | Sens clinique | ✅ | D-003, D-004 |
| Q10 | Registre à jour | ✅ 4 décisions | REGISTRE_DECISIONS.md |
```
