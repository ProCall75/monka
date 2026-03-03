# 📐 Conventions — MOTEUR Monka

> **Version** : 1.0
> **Date** : 3 mars 2026
> **Appliqué à** : tout fichier dans `MOTEUR/`

---

## Nommage des fichiers

| Type | Convention | Exemple |
|---|---|---|
| Templates | `TPL_NN_NOM.md` (majuscules, underscore) | `TPL_01_AUDIT_DATA.md` |
| Standards | `NOM.md` (majuscules) | `CONVENTIONS.md` |
| Sprint reports | `sprint_report.md` (minuscules) | — |
| Validations | `{SCOPE}_validation.md` | `V1_validation.md`, `MP01_validation.md` |
| Cas cliniques | `cas_NN.md` | `cas_01.md` |
| Décisions | `D-NNN_{sujet_court}.md` | `D-001_seuil_V1_modifie.md` |
| Référentiel | Nom original conservé | `KERNEL_V6.md` |

## Nommage des dossiers

| Type | Convention | Exemple |
|---|---|---|
| Sprints | `SPRINT_NN_NOM/` | `SPRINT_00_AUDIT_DATA/` |
| Sous-dossiers | minuscules | `decisions/` |

## Structure obligatoire de chaque document

Tout document de travail (pas les templates eux-mêmes) DOIT commencer par :

```markdown
# [Emoji] Titre du document

> **Sprint** : N — Nom du sprint
> **Date** : JJ/MM/AAAA
> **Auteur** : Antonin / Dr. Monka / Les deux
> **Template** : TPL_NN (si applicable)
> **Statut** : 🔲 En cours | ✅ Validé | ❌ Rejeté
```

## Statuts de validation

| Symbole | Signification | Qui peut l'apposer |
|---|---|---|
| ✅ | Validé — conforme, pas de correction nécessaire | Antonin (technique) ou Dr. Monka (clinique) |
| ⚠️ | Validé avec réserves — corrections mineures à faire | Antonin ou Dr. Monka |
| ❌ | Rejeté — corrections majeures nécessaires avant validation | Antonin ou Dr. Monka |
| 🔲 | En attente de validation | — |
| 🔒 | Verrouillé — ne plus modifier sans nouvelle décision (D-XXX) | Les deux |

## Références croisées

- Pour référencer un autre doc dans MOTEUR : `→ voir [nom](chemin relatif)`
- Pour référencer une décision : `→ D-XXX`
- Pour référencer un template : `→ TPL_NN`

## Règle d'or

> **Aucun fichier n'est créé dans `MOTEUR/SPRINTS/` sans utiliser le template correspondant.**
> **Aucune donnée n'est modifiée en base sans créer un D-XXX.**
