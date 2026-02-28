---
description: Étape 4 — Quality Agent PRAGMA + Walkthrough CTO obligatoires APRÈS chaque gate. Génère certification et rapport d'itération.
---

# Étape 4 — Quality Agent + Walkthrough CTO

// turbo-all

> **Quand** : APRÈS gate réussie (`/finish-03-gate`), AVANT de commencer le bloc suivant.
> **Chaîne** : Appelé après `/finish-03-gate` → produit 2 livrables → retour à `/finish-sprint` orchestrateur
> **Bloquant** : Le BLOC N n'est PAS terminé tant que la certification ET le walkthrough ne sont pas produits.

---

## 4A. Certification PRAGMA — Quality Agent

### Source

| Document | Ce qu'on en prend |
|---|---|
| `pragma-starter-kit/.agent/workflows/quality-agent.md` | Process des 4 checkpoints, matrice §1-§28 |
| `pragma-starter-kit/framework/senior-dev-framework.md` | 28 sections framework = critères de conformité |
| `FINISH/certifs/quality_agent_template.md` | Template exact à remplir |

### Template à utiliser

```
FINISH/certifs/quality_agent_template.md
```

### Output

```
FINISH/certifs/BLOC-{N}_quality_check.md
```

### Contenu obligatoire

#### Score Global
- Compter les sections §1-§28 conformes / à corriger / non conforme
- Calculer le pourcentage de conformité
- Afficher le tableau Score Global

#### Détail par fichier modifié
Pour **CHAQUE** fichier modifié dans le bloc :

```markdown
### `{chemin/vers/fichier.tsx}`

| Métadonnée | Valeur |
|---|---|
| Lignes modifiées | L{X}-L{Y} |
| Taille post-edit | {N} lignes (seuil PRAGMA : 300) |
| Nouveaux types | {Types ajoutés/modifiés} |
| Dépendances touchées | {Imports ajoutés/supprimés} |

**Ce qui a changé :** {Description technique concise}
**Pourquoi c'est pertinent :** {Justification clinique/technique}

**Code verbatim :**
​```tsx
// Extrait du code modifié avec commentaires
​```

**Concepts CTO associés :**
- 📖 *{Concept}* — `CTO/cours/{fichier}.md` § {section}
```

#### Gate checks (données de /finish-03-gate)
- Résultats tsc, build, test, audit
- Temps de build, taille bundle

#### Sécurité — Scan post-modification
| Vérification | Status |
|---|---|
| Pas de `dangerouslySetInnerHTML` | ✅ / ❌ |
| Pas de `eval()`, `innerHTML` | ✅ / ❌ |
| Pas de Supabase write client | ✅ / ❌ |
| Pas de credential dans le code | ✅ / ❌ |
| RLS inchangé (18/18 tables) | ✅ / ❌ |

#### Réflexion continue
- Dette technique détectée (depuis Token Guard Phase 6)
- Axes d'amélioration
- Zones d'ombre identifiées

#### Verdict
```
- [ ] ✅ CERTIFIÉ — Peut procéder au BLOC {N+1}
- [ ] ⚠️ CERTIFIÉ AVEC RÉSERVES — Corriger sous 48h
- [ ] 🔴 NON CERTIFIÉ — Bloqué jusqu'à correction
```

---

## 4B. Walkthrough CTO — Rapport Prestige

### Source

| Document | Ce qu'on en prend |
|---|---|
| `FINISH/certifs/walkthrough_template.md` | Template exact |
| `CTO/cours/` | 16 fichiers formation — concepts à référencer |
| `CTO/cours/GLOSSAIRE.md` | 100+ termes à expliquer en contexte |

### Template à utiliser

```
FINISH/certifs/walkthrough_template.md
```

### Output

```
FINISH/certifs/BLOC-{N}_walkthrough.md
```

### Les 10 sections obligatoires

| # | Section | Source des données |
|---|---|---|
| 1 | **Objectif du bloc** | `FINISH/plan.md` — description du bloc |
| 2 | **Décisions d'architecture** | Choix faits pendant exécution + alternatives considérées |
| 3 | **Concepts CTO/cours** | `CTO/cours/{pertinent}.md` — définition + application + zone d'ombre |
| 4 | **Modifications détaillées** | Code avant/après avec verbatim |
| 5 | **Termes techniques** | `CTO/cours/GLOSSAIRE.md` — terme ↔ définition ↔ contexte Monka |
| 6 | **Cybersécurité** | `CTO/cours/06_SECURITE.md` — vecteurs OWASP évalués |
| 7 | **Intelligence & réflexion** | Scalabilité, maintenabilité, déterminisme, trade-offs |
| 8 | **Apprentissages** | Concepts appris/consolidés — niveau avant → après |
| 9 | **Métriques** | Fichiers, lignes +/-, erreurs, build time, bundle size |
| 10 | **Preuves de vérification** | Commandes exécutées + résultats (depuis /finish-03-gate) |

### Règles de rédaction

| Règle | Explication |
|---|---|
| **Chaque concept CTO = triptyque** | 1. Définition du cours → 2. Application code → 3. Zone d'ombre |
| **Chaque terme GLOSSAIRE = contexte** | Pas juste la définition — expliquer EN QUOI c'est pertinent ici |
| **Cybersécurité = vecteurs évalués** | Pas "tout est OK", lister les vecteurs et les mitigations |
| **Trade-offs = honnêtes** | Ce qu'on a sacrifié, ce qu'on a gagné, pourquoi c'est acceptable |
| **Apprentissages = progression** | Tableau niveau Vague → Théorique → Solide → Expert |
| **Code = avant/après** | Montrer le diff pour chaque fichier clé |
| **Français simplifié** | Traduire chaque modification en langage non-dev |

### Modules CTO/cours par type de bloc

| Type de bloc | Modules CTO pertinents |
|---|---|
| Fix UI/UX | `02_FRONTEND.md` (React, State, Props), `08_CODE_QUALITY.md` (Naming) |
| Fix logique/engine | `01_ARCHITECTURE.md` (Séparation concerns), `07_TESTING.md` (Pyramide) |
| Sécurité | `06_SECURITE.md` (OWASP, RLS, HDS) |
| Tests | `07_TESTING.md` (TDD, Coverage), `08_CODE_QUALITY.md` (Dette) |
| Infrastructure | `05_DEVOPS_INFRA.md` (CI/CD, Docker), `10_PRODUCTION_READINESS.md` |
| Documentation | `08_CODE_QUALITY.md` (Documentation §8.4), `11_METHODOLOGIE_PROJET.md` |
| Deploy | `05_DEVOPS_INFRA.md`, `09_PERFORMANCE.md`, `10_PRODUCTION_READINESS.md` |

---

## Checklist de complétude

Avant de considérer le BLOC comme terminé :

- [ ] `BLOC-{N}_quality_check.md` créé et complet
- [ ] Score Global calculé (X/28)
- [ ] Chaque fichier modifié documenté avec code verbatim
- [ ] Gate results inclus
- [ ] Sécurité scan OK
- [ ] Verdict prononcé (CERTIFIÉ / RÉSERVES / BLOQUÉ)
- [ ] `BLOC-{N}_walkthrough.md` créé et complet
- [ ] Les 10 sections obligatoires remplies
- [ ] Au moins 3 concepts CTO/cours référencés
- [ ] Au moins 5 termes GLOSSAIRE expliqués
- [ ] Cybersécurité — au moins 3 vecteurs évalués
- [ ] Apprentissages — au moins 3 items avec progression
- [ ] `task.md` mis à jour → BLOC {N} → `[x]`
- [ ] Retour utilisateur si > 8 tool calls

---

## Output → Input pour /finish-sprint (orchestrateur)

Après cette étape, tu transmets à l'orchestrateur :
- [ ] Verdict de certification (CERTIFIÉ / RÉSERVES / BLOQUÉ)
- [ ] Si CERTIFIÉ → BLOC terminé, passer au suivant
- [ ] Si RÉSERVES → noter, continuer avec avertissement
- [ ] Si BLOQUÉ → NE PAS passer au bloc suivant, fixer d'abord

→ **Retour à `/finish-sprint`** pour le bloc suivant via `/finish-00-relecture`.

---

> ✅ **Chaîne suivante** : `/finish-sprint` orchestrateur → `/finish-00-relecture` (bloc N+1)
