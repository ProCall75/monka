# 🎓 RÉCAP SESSION RÉVISION — 1er Mars 2026
> Score QCM : **15/15** | Drills : 8 traités | Meeting CTO : 3 Mars 2026

---

## ✅ BLOC 1 — QCM Pareto (Q1-Q5)

| # | Thème | Ce qu'il faut retenir |
|---|-------|----------------------|
| Q1 | **Clean Architecture** | Dépendances → vers l'intérieur. Le Kernel ne connaît ni React ni Supabase. Mot clé : **"framework-agnostic"** |
| Q2 | **AuthN vs AuthZ** | AuthN = "Qui es-tu ?" (JWT/login). AuthZ = "As-tu le droit ?" (RLS/RBAC). Deux mécanismes distincts. |
| Q3 | **Index DB** | Accélère les lectures, ralentit les écritures (maintenance de l'index à chaque INSERT/UPDATE). Compromis lecture/écriture. |
| Q4 | **Pyramide des tests** | **70% Unit / 20% Intégration / 10% E2E.** Unitaires = base. E2E = rare mais parcours complet. |
| Q5 | **Quality Gate CI/CD** | Porte automatique avant le merge. Build ✅ + Tests ✅ + Coverage ✅ + Review ✅. Tout doit passer. |

---

## ✅ BLOC 2 — QCM Pareto (Q6-Q10)

| # | Thème | Ce qu'il faut retenir |
|---|-------|----------------------|
| Q6 | **HDS** | Supabase ≠ certifié HDS. Pour la prod → **OVH Health, Clever Cloud, Scalingo**. Le code PostgreSQL ne change pas. |
| Q7 | **Prod-Ready (6 critères 🔴)** | Tests + Error handling + Monitoring + Secrets + Backup + Compliance. Nommer les gaps soi-même = crédibilité. |
| Q8 | **CSR vs SSR** | Clinical Engine = POC interne, CSR = bon choix (pas de SEO, derrière login, Supabase fait le backend). |
| Q9 | **Conventional Commits** | `feat:` / `fix:` / `refactor:` / `docs:` / `test:` / `chore:` — préfixe standardisé. Signe de maturité. |
| Q10 | **Vibecoding — dette** | *"Dette consciente et contrôlée. Chaque itération inclut un cycle de nettoyage — c'est le rôle du CTO d'architecturer le refactoring."* |

---

## ✅ BLOC 3 — QCM Avancé (Q11-Q15)

| # | Thème | Ce qu'il faut retenir |
|---|-------|----------------------|
| Q11 | **SOLID — Open/Closed** | Ajouter V6 = nouvelle classe `ScoringStrategy`. Ne jamais modifier V1-V5. Étends, ne modifie pas. |
| Q12 | **JWT** | Auto-porteur + signature cryptographique. **Zéro DB lookup** à chaque requête. Expire en 1h car non révocable. |
| Q13 | **N+1 queries** | 1 requête liste + N requêtes individuelles = 💀. Fix Supabase : `.select('*, scores(*)')` = 1 seule requête. |
| Q14 | **SLA 99.9%** | "Trois neuf" = **8h45 de downtime max par an**. SLI = mesure, SLO = objectif, SLA = contrat. |
| Q15 | **Scrum** | Product Backlog = tout (PO prioritise). Sprint Backlog = ce sprint. Definition of Done = critères de fin. |

---

## 🔥 DRILLS — Réponses polies pour le CTO

### Drill #1 — "Le Kernel est exposé dans le bundle JS client"
> *"Le simulateur expose la logique côté client — c'est un choix délibéré pour le POC. En prod MyMonka, le Kernel serait déplacé dans une **Edge Function Supabase** qui expose juste un endpoint `/calculate-score`. L'UI ne verrait jamais le code interne — juste les résultats. C'est une décision d'architecture qu'on prend ensemble."*

**À retenir :** Kernel → côté serveur en prod = protection IP + sécurité.

---

### Drill #2 — "Comment prouvez-vous le déterminisme ?"
> *"Le moteur est du TypeScript pur — pas d'IA, pas d'aléatoire, pas d'appel réseau. C'est une **fonction pure** : `runEngine(data, answers) → EngineOutput`. Les 235 règles sont des conditions booléennes (AND, EQ, GT). Et on a des **integrity checks automatisés** qui rejouent des scénarios cliniques connus — c'est notre filet de régression."*

**Mots clés :** fonction pure · zéro stochasticité · integrity checks.

---

### Drill #3 — "Par où commencer pour la prod en 3 mois ?"
> *"L'objectif n'est pas de pousser le simulateur en prod — c'est d'extraire le Kernel pour un **Greenfield MyMonka V2**. On commence par du **documentation-first** : architecture, SOPs, conventions — avant une seule ligne de code. CTO valide le cadre. PRAGMA implémente feature par feature dans ces rails. On ne merge jamais sans PR. Vous reviewez, on itère. Nous = vélocité + connaissance métier. Vous = architecture + qualité."*

---

### Drill #4 — "Vous choisissez quel stack pour V2 ?"
> *"On propose avec des justifications, vous tranchez. Sur la base de ce qu'on connaît : React/TypeScript/Supabase pour le dashboard (cohérence avec le Kernel existant). **Next.js** pour les pages publiques (SEO). PostgreSQL certifié HDS pour la DB. Si vous avez une vision différente selon vos contraintes — on s'adapte totalement. C'est pourquoi on commence par la doc et vos choix."*

**Règle :** Proposer + justifier + déférer. Jamais juste déférer.

---

### Drill #5 — "Exemple concret de DDD dans le code Monka ?"
> *"Le DDD n'est pas formalisé architecturalement dans le simulateur — c'était un POC. Mais l'**ubiquitous language** est respecté : `MicroParcours`, `Vulnerabilite`, `CCC`, `ASR` — ces mots existent dans les fonctions TypeScript. Le code parle le métier des gériatres, pas des termes génériques comme `Item` ou `Node`. Pour MyMonka V2 Greenfield, on formalise ça avec des **bounded contexts** explicites."*

---

### Drill #6 — "Vous voyez un problème sur ma PR, qui décide ?"
> *"Vous décidez de l'architecture — on implémente. Si vous voyez un problème, vous expliquez le pourquoi, on refactorise et on revient. C'est pour ça qu'on fait des PRs logiques et ciblées — pour que vos reviews soient précises et actionnables. Vos retours d'architecture, c'est ce qui nous fait monter en compétence. Ce n'est pas un problème à éviter — c'est la valeur centrale du modèle."*

---

### Drill #7 — "RPO et RTO pour vos backups ?"

**RPO (Recovery Point Objective)** = Combien de données tu acceptes de perdre ?
- RPO 24h = tu peux perdre 24h de données (backup quotidien)
- RPO 1h = PITR (Point-In-Time Recovery)

**RTO (Recovery Time Objective)** = Combien de temps l'app peut être down ?
- RTO 4h = l'app restore en 4h max

> *"En prod, on cible un **RPO < 1h** via PITR Supabase et un **RTO < 4h** avec des runbooks documentés et une procédure de restauration testée."*

---

### Drill #8 — "Vercel, c'est américain — RGPD ?"
> *"Vercel c'est pour les prototypes — ça permet de déployer vite. En prod MyMonka, on migre vers un hébergeur certifié HDS avec datacenter France/UE : **OVH Health, Clever Cloud, ou Scalingo**. Le code ne change pas, juste la connection string."*

---

## ⚡ BONUS — GitHub & Sécurité des clés

**Repo privé** → les bots tiers externes ne peuvent pas scanner.

**Mais :** GitHub lui-même scanne les repos privés (Secret Scanning natif) et peut alerter/révoquer une clé. Si le repo passe public une seconde → les bots capturent les clés en < 30 secondes.

**La règle absolue (repo public ou privé) :**
```
.env → dans .gitignore
Clés API → dans les variables d'env du provider (Vercel / GitHub Secrets)
SERVICE_ROLE_KEY → jamais côté client, jamais dans le code
```

---

## 🎯 LES 4 PHRASES À GLISSER NATURELLEMENT EN MEETING

1. **"Le Kernel est framework-agnostic"** → Clean Architecture
2. **"Supabase n'est pas HDS — migration vers OVH Health planifiée pour la prod"** → Conscience pro
3. **"Dette consciente et contrôlée — le CTO architecte le refactoring"** → Collaboration model
4. **"Le simulateur est un POC pour valider la logique clinique — la prod-readiness, c'est la roadmap commune"** → Reframe le périmètre

---

> 💡 **Score session : 15/15 QCM + 8 drills traités. Tu tiens tous les fondamentaux Pareto.**
