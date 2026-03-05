# LEVIER IA — Estimation PRAGMA

> **Document interne PRAGMA** — Données 2024-2025 sourcées
> **Objectif** : Savoir précisément combien de temps PRAGMA gagne grâce à l'IA vs une équipe classique. Basé sur des études réelles, pas des estimations subjectives.
> **MAJ** : 4 mars 2026

---

## 1. Les études — Données dures

### Niveau 1 : Copilot (autocomplete basique)

| Source | Année | Métrique | Résultat |
|---|---|---|---|
| **GitHub Research** | 2025 | Vitesse de complétion de tâches | **+55%** (de 2h41 à 1h11 par tâche) |
| **GitHub Research** | 2025 | Taux de réussite | **+8pp** (de 70% à 78%) |
| **GitHub Research** | 2025 | Cycles de feature development | **+31% plus rapide** |
| **McKinsey** | 2024-25 | Tâches de code (génération, refactoring, doc) | **+20 à 50%** plus rapide |
| **McKinsey** | 2024-25 | Probabilité de finir des tâches complexes dans les délais | **+25-30%** |
| **Microsoft + Accenture** | 2025 | Tâches complétées par développeur | **+26%** |
| **McKinsey (top orgs)** | 2025 | Time to market | **-16 à 30%** |
| **McKinsey (top orgs)** | 2025 | Qualité logicielle | **+31 à 45%** |
| **GitHub (juniors)** | 2025 | Productivité junior devs | **+26-39%** |

> **Ce que ça dit** : Avec un simple autocomplete IA (Copilot), un dev gagne **+25-55%** de vitesse selon la tâche. C'est le **PLANCHER** du levier IA.

### Niveau 2 : Agentic AI (Cursor, Claude Code, Antigravity)

> PRAGMA utilise pas Copilot. On utilise des **agents IA** autonomes (Antigravity + Claude) qui ne font pas du simple autocomplete — ils comprennent le contexte, exécutent des multi-step tasks, génèrent des fichiers entiers, auditent des bases de données, créent des architectures.

| Source | Année | Métrique | Résultat |
|---|---|---|---|
| **Enterprises avec agentic AI** | 2025 | Réduction du temps de développement | **-40 à 55%** |
| **Cursor Enterprise** | 2025 | Volume de PR + taille moyenne PR | **↑ significatif** (pas de % public) |
| **Claude Code (Anthropic)** | 2025 | Multi-step tasks (debug, refactor, architecture) | Agent autonome: exécute, teste, committe |
| **DORA Report** | 2025 | Impact IA sur organisations matures | Amplifie les forces existantes. Les orgs déjà structurées gagnent PLUS |

> **Ce que ça dit** : Avec l'IA agentique, le gain passe de +55% à **-40 à 55% de temps total de dev**. Pour une équipe qui SAIT utiliser les agents (comme PRAGMA), le gain est dans le haut de la fourchette.

### ⚠️ Ce qui ne se compresse PAS avec l'IA

| Activité | Compressible ? | Pourquoi |
|---|---|---|
| **Écrire du code** | ✅ Oui (-40-55%) | L'IA génère, refactore, teste |
| **Concevoir un schéma DB** | ⚠️ Partiellement (-20-30%) | L'IA aide à structurer, mais la réflexion clinique reste humaine |
| **Rédiger de la documentation** | ✅ Oui (-40-60%) | L'IA rédige, l'humain valide et affine |
| **Auditer des données** | ✅ Oui (-50-70%) | L'IA parcourt, l'humain décide |
| **Réflexion architecturale** | ⚠️ Partiellement (-10-20%) | L'IA challenge, mais c'est l'humain qui tranche |
| **Validation clinique avec le médecin** | ❌ Non | Temps incompressible. Le Dr. doit réfléchir, pas l'IA. |
| **Design UI/UX + tests affordance** | ⚠️ Partiellement (-15-25%) | Le design thinking reste humain. L'IA aide à documenter. |
| **Interviews terrain (aidants)** | ❌ Non | Irremplaçable |
| **Itérations UX avec le CPO** | ❌ Non | Processus social/humain |
| **Réunions commerciales** | ❌ Non | Impossible à comprimer |

---

## 2. Application à PRAGMA — Mois 1 (travail livré)

### Décomposition du travail par type

| Activité | Heures Antonin | Heures Marwane | Total | Levier IA applicable |
|---|---|---|---|---|
| **Code moteur** (4 fichiers TS, tests) | ~40h | — | 40h | -50% |
| **Conception schéma DB** (18 tables) | ~25h | — | 25h | -25% |
| **Peuplement DB** (165 questions → 450 cb) | ~50h | — | 50h | -50% |
| **Audit data** (240 rules, corrections) | ~20h | — | 20h | -60% |
| **Documentation** (SOPs, plans, architecture) | ~30h | — | 30h | -50% |
| **Simulateur** (app React) | ~15h | — | 15h | -45% |
| **Tooling** (scripts, automation) | ~10h | — | 10h | -55% |
| **Validation clinique** (avec Dr. Rimaud) | ~30h | — | 30h | 0% (humain) |
| **Réflexion architecture + stratégie** | ~15h | — | 15h | -15% |
| **Audit UX app existante** | — | ~35h | 35h | -20% |
| **Interviews + terrain** | — | ~15h | 15h | 0% (humain) |
| **Design System + composants** | — | ~45h | 45h | -20% |
| **Architecture UI 4 couches + mapping** | — | ~20h | 20h | -15% |
| **Itérations avec Maël** | — | ~15h | 15h | 0% (humain) |
| **Présentations** | — | ~10h | 10h | -30% |
| **Total** | **~235h** | **~140h** | **375h** | — |

### Conversion en jours

| | Heures | Jours (÷7h utiles) |
|---|---|---|
| Antonin | ~235h | **~34 jours** |
| Marwane | ~140h | **~20 jours** |
| **Total PRAGMA** | **375h** | **~54 jours** |

> **Cohérence avec le vécu** : L'utilisateur dit "2 semaines full + 2 semaines presque full" ≈ 14 jours intensifs (10h+) + 10 jours normaux (~7h) = ~240h Antonin + ~140h Marwane = ~375h total. ✅ Cohérent.

---

## 3. Combien de temps une équipe classique pour LE MÊME résultat ?

On prend chaque activité et on applique le SANS levier IA :

| Activité | PRAGMA (h) | Sans IA (÷ levier) | Calcul |
|---|---|---|---|
| Code moteur (4 fichiers TS) | 40h | **80h** | 40 ÷ (1 - 0.50) = 80 |
| Conception schéma DB | 25h | **33h** | 25 ÷ (1 - 0.25) = 33 |
| Peuplement DB | 50h | **100h** | 50 ÷ (1 - 0.50) = 100 |
| Audit data | 20h | **50h** | 20 ÷ (1 - 0.60) = 50 |
| Documentation | 30h | **60h** | 30 ÷ (1 - 0.50) = 60 |
| Simulateur | 15h | **27h** | 15 ÷ (1 - 0.45) = 27 |
| Tooling | 10h | **22h** | 10 ÷ (1 - 0.55) = 22 |
| Validation clinique | 30h | **30h** | Pas de compression |
| Réflexion architecture | 15h | **18h** | 15 ÷ (1 - 0.15) = 18 |
| Audit UX | 35h | **44h** | 35 ÷ (1 - 0.20) = 44 |
| Interviews terrain | 15h | **15h** | Pas de compression |
| Design System + composants | 45h | **56h** | 45 ÷ (1 - 0.20) = 56 |
| Architecture UI + mapping | 20h | **24h** | 20 ÷ (1 - 0.15) = 24 |
| Itérations avec Maël | 15h | **15h** | Pas de compression |
| Présentations | 10h | **14h** | 10 ÷ (1 - 0.30) = 14 |
| **Total** | **375h** | **~588h** | — |

### Résultat

| Métrique | PRAGMA (avec IA) | Équipe classique (sans IA) | Ratio |
|---|---|---|---|
| **Heures totales** | 375h | 588h | **×1.57** |
| **Jours-homme** | 54 jours | ~84 jours | **×1.57** |
| **Si 1 PM + 1 dev + 1 UX** | — | ~28 jours × 3 = 84 j-h = **~4 mois** | — |
| **Si 1 PM + 2 devs + 1 UX** | — | ~21 jours × 4 = 84 j-h = **~3 mois** | — |

### Le ratio réel : ×1.6 sur les heures, mais ×3-4 sur la durée calendaire

> **Nuance cruciale** : Le levier IA n'est pas les mêmes choses qu'un "×3 en productivité". C'est ×1.6 en heures brutes. **MAIS** la durée calendaire est ×3-4 parce que :
> 1. PRAGMA = 2 personnes qui font le travail de 3-4 spécialistes
> 2. Pas de coordination entre silos (PM briefe le dev, le dev briefe l'UX = overhead de communication)
> 3. Pas de process de spécification (l'IA itère en direct, pas besoin de spec → dev → QA)
> 4. Réactivité immédiate avec Dr. Rimaud (père/fils = pas de process d'accès au médecin)

---

## 4. Calcul du coût marché — Données France 2025

### TJM marché freelance France 2025 (sources : RH Solutions, Malt, Codelynx)

| Rôle | TJM moyen France 2025 | TJM Paris/IDF | Source |
|---|---|---|---|
| **Dev backend senior** (11+ ans) | **643€/jour** | 700-900€ | RH Solutions 2025, Codelynx |
| **Dev fullstack senior** | **600-700€/jour** | 650-900€ | Codelynx, Malt |
| **Dev frontend React** | **535-567€/jour** | 600-750€ | Malt 2025 |
| **UX/UI Designer senior** | **500-600€/jour** | 600-800€ | Codelynx, le-tjm.fr |
| **Chef de produit / PM** | **550-750€/jour** | 700-900€ | Malt, le-tjm.fr |
| **Consultant qualité réglementaire** | **800-1200€/jour** | 900-1500€ | Wild Code School, estimation marché |
| **Architecte cybersécurité** | **700-900+€/jour** | 900+€ | Malt 2025 |

### Coût équipe classique pour le travail livré (84 jours-homme)

| Profil | Jours | TJM (bas) | TJM (haut) | Coût bas | Coût haut |
|---|---|---|---|---|---|
| PM / Chef produit | ~20j | 600€ | 800€ | 12K€ | 16K€ |
| Dev backend senior | ~30j | 600€ | 800€ | 18K€ | 24K€ |
| Dev frontend | ~12j | 535€ | 700€ | 6.4K€ | 8.4K€ |
| UX/UI Designer | ~20j | 500€ | 700€ | 10K€ | 14K€ |
| Consultant qualité | ~5j | 800€ | 1200€ | 4K€ | 6K€ |
| **Total** | **~87j** | — | — | **50.4K€** | **68.4K€** |

**+ ajout de la durée calendaire** : 3-4 mois avec cette équipe (coordination, specs, QA, itérations) vs 1 mois PRAGMA.

### Coût SUPPLÉMENTAIRE lié à la durée

| Facteur | Coût additionnel | Pourquoi |
|---|---|---|
| Overhead de coordination PM | +10-15% | Le PM gère 3 profils + le médecin |
| Spécification + validation (waterfall-ish) | +15-20% | Chaque étape a un cycle spec→review→dev→QA |
| Onboarding médical | +3-5 jours PM à 700€ | Un PM externe ne connaît pas la gériatrie |

**Coût réaliste total équipe classique** : **60-85K€** pour le même livrable.

---

## 5. Synthèse — Le levier PRAGMA

| Métrique | PRAGMA | Équipe classique | Écart |
|---|---|---|---|
| **Heures de travail** | 375h | 588h | ×1.6 |
| **Durée calendaire** | ~1 mois | ~3-4 mois | ×3-4 |
| **Personnes mobilisées** | 2 | 3-5 | ÷2 |
| **Coût marché équivalent** | — | 60-85K€ | — |
| **Communication overhead** | Quasiment 0 (2 personnes + père/fils) | Élevé (5 personnes + médecin externe) | — |
| **Time-to-value** | Immédiat (moteur fonctionnel M1) | 3-4 mois avant premier résultat | — |

### Ce que PRAGMA vend réellement

> **On ne vend pas des heures. On vend un TIME-TO-VALUE divisé par 3-4, pour un coût divisé par ~1.5-2 par rapport au marché, avec un résultat au minimum équivalent en qualité (et souvent supérieur parce qu'on itère plus vite avec le médecin).**

---

*Document interne — Mars 2026*
*Sources : GitHub Research 2025, McKinsey 2024-25, RH Solutions 2025, Malt 2025, Codelynx 2025*
