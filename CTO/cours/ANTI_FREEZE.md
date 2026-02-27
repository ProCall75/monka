# 🧊 ANTI-FREEZE — Fiches Réponses aux Questions CTO

> **Objectif** : Ne JAMAIS freeze devant le CTO. Chaque fiche = 1 question piège avec une réponse prête.
> **Comment utiliser** : Lis chaque question, cache la réponse, essaie de répondre, puis compare.

> **⚠️ Deux apps, deux contextes**
> Chaque réponse s'applique différemment selon l'app :
> - 🔬 **Clinical Engine** = App interne, ~50 utilisateurs max, outil de validation du moteur clinique. C'est le prototype livré.
> - 📱 **MyMonka** = App publique, 100K+ aidants simultanés, données de santé réelles. C'est l'app à construire.

---

## 🎯 PARETO 80/20

> Les 6 questions qui couvrent 80% de ce que le CTO va te demander :
> 1. **Q1** — "C'est quoi votre stack et pourquoi ?"
> 2. **Q5** — "Comment vous sécurisez les données de santé ?"
> 3. **Q8** — "C'est quoi votre stratégie de tests ?"
> 4. **Q10** — "Le code est production-ready ?"
> 5. **Q15** — "Comment vous gérez la dette technique du vibecoding ?"
> 6. **Q20** — "Comment vous voyez la collaboration avec moi (le CTO) ?"
>
> **Maîtrise ces 6 là en priorité absolue.**

---

## 🏗️ ARCHITECTURE & STACK

### Q1 — "C'est quoi votre stack technique et pourquoi ces choix ?"

**Réponse courte** : React + TypeScript + Vite en front, Supabase (PostgreSQL) en backend, déployé sur Vercel.

**Développement** :
- **React** → Le framework le plus mature, le plus gros écosystème, le plus de développeurs disponibles sur le marché. On pense recrutement et maintenabilité long terme.
- **TypeScript** → Typage statique obligatoire. Ça élimine une catégorie entière de bugs à la compilation plutôt qu'au runtime. Sur un projet santé, on ne peut pas se permettre des erreurs de type.
- **Vite** → Build tool ultra-rapide. Hot Module Replacement quasi instantané. Pour un prototype qui itère beaucoup, la vitesse de feedback est critique.
- **Supabase** → PostgreSQL managé avec auth, RLS, et API REST auto-générée. On a la puissance de Postgres sans gérer l'infra. Et on peut migrer vers du Postgres pur si besoin — zéro vendor lock-in sur la DB.
- **Vercel** → Déploiement continu sur chaque push. Preview par branche. Parfait pour l'itération rapide.

**Phrase clé** : *"On a choisi une stack mainstream, bien documentée, avec une communauté massive — ce qui garantit le recrutement et la maintenabilité à long terme."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : La stack actuelle (React SPA + Vite + Supabase) est parfaitement adaptée. C'est une app interne avec peu d'utilisateurs, on a besoin de vélocité d'itération, pas de scalabilité massive.
> - 📱 **MyMonka** : La stack de base reste la même (React + TypeScript + PostgreSQL), mais l'architecture devra évoluer. Possible migration vers Next.js pour le SSR (pages publiques, SEO), ajout d'un CDN agressif, cache Redis, et un backend plus robuste. Le CTO décidera.

📖 Module : `01_ARCHITECTURE.md`

---

### Q2 — "Pourquoi pas Next.js ?"

**Réponse courte** : On n'a pas besoin de SSR. Notre app est un outil métier (SPA), pas un site public avec du SEO.

**Développement** :
- **SSR (Server-Side Rendering)** = le serveur génère le HTML à chaque requête. Utile pour le SEO (Google doit lire la page) et le temps de premier affichage sur des pages publiques.
- **SPA (Single-Page Application)** = tout le JS est chargé une fois, puis l'app tourne en local. Idéal pour des outils métier derrière un login.
- Monka est une **app métier authentifiée** → les utilisateurs se connectent, il n'y a pas de page à indexer par Google. Le SSR ajouterait de la complexité (serveur Node.js, gestion du cache serveur, hydration bugs) sans apporter de valeur.
- Si demain on a besoin d'un site vitrine public → on peut ajouter un front Next.js séparé qui consomme la même API.

**Phrase clé** : *"Next.js ajoute de la complexité serveur qui n'est pas justifiée pour un outil métier derrière un login. On garde la simplicité d'une SPA avec Vite, et on ajoutera un front Next.js si on a un besoin SEO plus tard."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : SPA Vite = le bon choix. Personne ne google "outil d'évaluation gériatrique interne". Pas de SEO, pas de SSR.
> - 📱 **MyMonka** : Là c'est différent. Si MyMonka a des pages publiques (landing, inscription, ressources pour aidants), Next.js SSR devient pertinent pour le SEO et le premier affichage. Le dashboard aidant connecté resterait en SPA. Architecture hybride.

📖 Module : `02_FRONTEND.md` § 2.5

---

### Q3 — "Comment est structuré votre code ? C'est quoi l'architecture ?"

**Réponse courte** : Architecture modulaire en couches — Kernel (logique métier pure), APP (UI React), et données (Supabase).

**Développement** :
- **Kernel** = le cerveau clinique. C'est de la logique pure (TypeScript), zéro dépendance UI. Il contient les règles de scoring, les micro-parcours, les triggers de vulnérabilité. Il pourrait tourner dans n'importe quel environnement (serveur, mobile, autre front).
- **APP** = la couche de présentation React. Elle consomme le Kernel et affiche les résultats. Si on change de framework frontend demain, le Kernel ne bouge pas.
- **Data (Supabase)** = la couche de persistance. Schéma PostgreSQL avec les profils patients, les réponses, les résultats.
- C'est une **séparation des concerns** classique : business logic ≠ UI ≠ data. Chaque couche peut évoluer indépendamment.

**Phrase clé** : *"On a séparé la logique métier clinique (le Kernel) de la couche de présentation et de la couche de données. Le Kernel est framework-agnostic — il peut tourner n'importe où."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Kernel + APP + Supabase dans un monolithe modulaire. Architecture simple, parfaite pour 50 users.
> - 📱 **MyMonka** : Le Kernel reste le même (c'est la force — on l'a déjà validé). Mais l'APP sera une nouvelle couche UI conçue pour le grand public (UX aidant, mobile-first, accessibilité). Le Kernel pourrait aussi tourner côté serveur (Edge Function ou API dédiée) plutôt qu'embarqué dans le front, pour protéger la logique métier.

📖 Module : `01_ARCHITECTURE.md` § 1.2, 1.7

---

### Q4 — "C'est quoi les Design Patterns que vous utilisez ?"

**Réponse courte** : Strategy pattern pour le scoring, Factory pour les micro-parcours, Observer pour les triggers de vulnérabilité.

**Développement** :
- **Strategy Pattern** → Le Kernel applique différentes stratégies de scoring selon le contexte (V1 Social, V2 Proche, etc.). Le pattern Strategy permet de changer l'algorithme de calcul sans modifier le code qui l'appelle. Concrètement : une interface commune `ScoreStrategy`, plusieurs implémentations.
- **Factory Pattern** → Les micro-parcours sont créés dynamiquement selon le profil du patient. Une factory prend les données d'entrée et retourne le bon parcours.
- **Observer Pattern** → Quand un score change, les composants UI qui en dépendent sont notifiés automatiquement. C'est le modèle natif de React (state → re-render).

**Si tu ne retiens qu'une chose** : Un design pattern c'est juste un **nom standard** pour une solution récurrente. Ça permet aux développeurs de se comprendre rapidement. "On utilise un Strategy" = tout le monde sait ce que ça veut dire.

📖 Module : `01_ARCHITECTURE.md` § 1.5

---

## 🔐 SÉCURITÉ & DONNÉES DE SANTÉ

### Q5 — "Comment vous sécurisez les données de santé ? Vous êtes conformes RGPD ?"

**Réponse courte** : RLS sur Supabase (isolation des données par utilisateur), chiffrement en transit (HTTPS/TLS), authentification sécurisée, et conscience des exigences HDS.

**Développement** :
- **RLS (Row Level Security)** = Chaque utilisateur ne voit QUE ses données. Ce n'est pas du filtrage côté app (contournable), c'est une **policy au niveau PostgreSQL** — même si l'API est compromise, la DB bloque l'accès.
- **Chiffrement en transit** = HTTPS partout (TLS 1.3). Les données ne circulent jamais en clair entre le navigateur et le serveur.
- **Auth Supabase** = JWT signés, sessions sécurisées, refresh tokens. Pas de gestion maison de mots de passe (on ne réinvente pas la roue crypto).
- **HDS (Hébergement Données de Santé)** = Pour la prod, on sait qu'il faudra un hébergeur certifié HDS (norme française obligatoire pour les données de santé). Supabase n'est pas HDS, mais on peut migrer vers un Postgres hébergé chez un provider HDS (OVH Health, Clever Cloud, etc.) sans changer le code.
- **RGPD** = Consentement explicite, droit à l'effacement, minimisation des données collectées. On ne stocke que ce qui est cliniquement nécessaire.

**Phrase clé** : *"La sécurité est dans la DB, pas dans l'app. Le RLS PostgreSQL garantit l'isolation des données même si l'API est compromise. Et on a conscience qu'en production, il faudra un hébergement HDS certifié."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Données de test/validation, utilisateurs internes. Le RLS + HTTPS suffit. Pas d'obligation HDS car pas de données de santé réelles de patients.
> - 📱 **MyMonka** : 100K aidants = données de santé réelles = **HDS obligatoire dès le jour 1**. MFA obligatoire, audit de sécurité formel, DPO (Data Protection Officer) nommé, CNIL notifiée. C'est un autre niveau de sécurité.

📖 Module : `06_SECURITE.md` § 6.3, 6.6

---

### Q6 — "C'est quoi le RLS exactement ? Comment ça marche ?"

**Réponse courte** : Row Level Security — des règles SQL au niveau de la base de données qui filtrent automatiquement les lignes selon l'utilisateur connecté.

**Développement** :
Imagine une table `patients` avec 10 000 patients de 50 professionnels différents.

**Sans RLS** : L'app filtre côté code (`WHERE user_id = current_user`). Si un développeur oublie le filtre → fuite de données.

**Avec RLS** : PostgreSQL applique automatiquement une policy :
```sql
CREATE POLICY "users_see_own_data" ON patients
  FOR SELECT
  USING (user_id = auth.uid());
```
Même si quelqu'un fait `SELECT * FROM patients`, il ne voit que ses propres patients. Le filtre est **dans le moteur de la base de données**, pas dans l'application.

**Analogie** : C'est comme un casier dans un vestiaire. Ta clé n'ouvre que ton casier, même si tu essaies d'ouvrir les autres. La sécurité est dans la serrure (la DB), pas dans la politesse des gens (l'app).

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : RLS simple — chaque évaluateur voit ses propres évaluations. Peu de rôles.
> - 📱 **MyMonka** : RLS multi-niveau — un aidant voit son profil, un professionnel voit ses patients, un admin régional voit sa zone, un admin national voit tout. Policies RLS complexes avec hiérarchie de rôles.

📖 Module : `04_DATABASE.md` § 4.6

---

### Q7 — "Vous avez pensé à l'OWASP Top 10 ?"

**Réponse courte** : Oui. Les vulnérabilités principales sont couvertes — injection via prepared statements, XSS via React (échappement natif), auth via Supabase Auth, et CORS configuré.

**Développement** :
L'OWASP Top 10, c'est la liste des 10 vulnérabilités web les plus courantes, mise à jour tous les 3-4 ans. Les principales :

| # | Vulnérabilité | Notre protection |
|---|--------------|-----------------|
| 1 | **Broken Access Control** | RLS Supabase + policies par rôle |
| 2 | **Cryptographic Failures** | TLS en transit, Supabase chiffre at-rest |
| 3 | **Injection (SQL/XSS)** | Supabase utilise des prepared statements. React échappe le HTML nativement |
| 4 | **Insecure Design** | Séparation Kernel/APP, validation côté serveur |
| 5 | **Security Misconfiguration** | Config revue, pas de secrets dans le code |

**Phrase clé** : *"React + Supabase nous protègent nativement contre les injections et le XSS. Le RLS couvre le broken access control. Ce qu'on devra durcir pour la prod, c'est le CSP et les security headers."*

📖 Module : `06_SECURITE.md` § 6.1

---

## 🧪 TESTS & QUALITÉ

### Q8 — "C'est quoi votre stratégie de tests ?"

**Réponse courte** : Aujourd'hui on a des tests de validation métier (integrity checks sur le Kernel). Pour la prod, on mettra en place la pyramide de tests complète : unit → integration → E2E.

**Développement** :
La **pyramide des tests** :
```
        /  E2E  \          ← Peu, lents, coûteux (Playwright)
       / Intégr. \         ← Moyen (API + DB ensemble)
      /   Unit    \        ← Beaucoup, rapides, pas chers (Vitest)
```

- **Unit tests** = Tester une fonction isolée. Ex : "Le scoring V3 retourne 'Critique' quand le score dépasse le seuil X". Rapides, des centaines.
- **Integration tests** = Tester que les composants fonctionnent ensemble. Ex : "L'API retourne les bons micro-parcours quand je soumets un profil".
- **E2E tests** = Simuler un vrai utilisateur. Ex : "Un professionnel se connecte, remplit le questionnaire V1, et voit le bon rapport de vulnérabilité".

**Ce qu'on a aujourd'hui** : Des `integrityChecks` dans le Kernel qui valident la cohérence des données cliniques — c'est une forme de test de validation métier.

**Ce qu'on mettra en place** : Vitest pour les units, testing de l'API Supabase en intégration, Playwright pour les parcours utilisateur critiques.

**Phrase clé** : *"On a déjà des contrôles d'intégrité métier sur le Kernel. Pour la prod, on déploiera une pyramide de tests classique avec Vitest et Playwright, en priorisant les parcours cliniques critiques."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Tests de validation métier (integrity checks) = le cœur. On vérifie que les 157 questions et les 24 micro-parcours sont cliniquement corrects. Peu d'E2E nécessaires (10 parcours utilisateur max).
> - 📱 **MyMonka** : Pyramide complète obligatoire. Units sur le Kernel (centaines), intégration sur l'API (toutes les routes), E2E sur les parcours aidants critiques (inscription, évaluation, résultats, notifications). Load testing pour valider les 100K concurrents.

📖 Module : `07_TESTING.md` § 7.1

---

### Q9 — "Vous connaissez le TDD ?"

**Réponse courte** : Oui — Test-Driven Development : on écrit le test AVANT le code. Red → Green → Refactor.

**Développement** :
Le cycle TDD en 3 étapes :
1. 🔴 **Red** — Écrire un test qui échoue (le code n'existe pas encore)
2. 🟢 **Green** — Écrire le minimum de code pour que le test passe
3. 🔵 **Refactor** — Nettoyer le code tout en gardant le test vert

**Exemple concret Monka** :
1. 🔴 J'écris : `expect(calculateVulnerability({age: 85, chutes: 3})).toBe('CRITICAL')` → le test fail
2. 🟢 J'implémente `calculateVulnerability` → le test passe
3. 🔵 Je refactore pour extraire les seuils dans des constantes → le test passe toujours

**Honnêteté** : En vibecoding, on ne fait pas du TDD pur. Mais la logique est similaire : on valide itérativement chaque ajout avec des tests de non-régression. Le CTO appréciera la transparence.

📖 Module : `07_TESTING.md` § 7.5

---

## 🚀 PRODUCTION READINESS

### Q10 — "Est-ce que le code est production-ready ?"

**Réponse courte** : Non, et on le sait. C'est un prototype validé fonctionnellement. La roadmap vers la prod est identifiée.

**Développement** :
**Ce qui EST fait** (prototype) :
- ✅ Logique métier clinique validée (157 questions, 24 micro-parcours)
- ✅ Typage TypeScript strict
- ✅ RLS sur Supabase
- ✅ Déploiement continu sur Vercel
- ✅ Intégrité des données cliniques vérifiée

**Ce qui MANQUE pour la prod** :
- ❌ Tests automatisés (unit, integration, E2E)
- ❌ Error handling robuste (error boundaries React, structured logging)
- ❌ Monitoring et alerting (Sentry, logs structurés)
- ❌ Hébergement HDS pour les données de santé
- ❌ Documentation technique complète (ADR, runbooks)
- ❌ Stratégie de backup et disaster recovery
- ❌ Performance profiling et optimisation
- ❌ Security audit formel

**Phrase clé** : *"Le prototype valide le 'quoi' — la logique clinique fonctionne et c'est prouvé. Le passage en prod, c'est le 'comment' — tests, monitoring, sécurité, compliance. C'est exactement pour ça qu'on veut un CTO : pour architecturer cette transition."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : C'est un outil interne de validation. Il n'a PAS besoin d'être prod-ready au sens industriel. Il fait son job : prouver que le moteur clinique est pertinent. C'est un POC réussi.
> - � **MyMonka** : L'app publique devra cocher LES 12 critères. Pas de raccourci possible quand 100K aidants dépendent de l'app pour des décisions de santé. C'est le vrai chantier — et le CTO est là pour ça.

�📖 Module : `10_PRODUCTION_READINESS.md`

---

### Q11 — "Comment vous gérez les erreurs ?"

**Réponse courte** : Aujourd'hui, gestion basique. Pour la prod : Error Boundaries React, try/catch structurés, et un service de monitoring type Sentry.

**Développement** :
3 niveaux de gestion d'erreurs :

1. **Error Boundaries (React)** = Un composant React qui "attrape" les erreurs de ses enfants et affiche un fallback au lieu de crasher toute l'app. Si un composant plante, le reste de l'app continue de fonctionner.

2. **Try/Catch structurés** = Entourer les appels réseau et les opérations risquées. Pas juste `catch(e) {}` (qui avale l'erreur silencieusement), mais logger l'erreur et afficher un message utilisateur utile.

3. **Monitoring (Sentry/Datadog)** = Un service externe qui capture automatiquement chaque erreur en prod, avec le stack trace, le navigateur, l'utilisateur concerné. On sait en temps réel quand l'app plante.

**Analogie** : Sans monitoring, c'est comme conduire une voiture sans tableau de bord. Tu ne sais pas que le moteur surchauffe jusqu'à ce qu'il fume.

📖 Module : `10_PRODUCTION_READINESS.md` § 10.2

---

### Q12 — "C'est quoi votre stratégie de déploiement ?"

**Réponse courte** : Continuous Deployment via Vercel — chaque push sur main déploie automatiquement. Previews sur chaque PR.

**Développement** :
- **Continuous Deployment (CD)** = Le code passe directement du git au serveur de prod, automatiquement. Pas de déploiement manuel.
- **Preview Deployments** = Chaque Pull Request génère une URL de preview unique. On peut tester les changements avant de merger.
- **Rollback** = Si un déploiement casse quelque chose, Vercel permet de revenir à la version précédente en un clic.

**Pour la prod mature** : On passerait sur un modèle plus robuste :
- **Blue-Green** = Deux environnements identiques. On déploie sur le "blue", on teste, puis on bascule le trafic du "green" (ancien) vers le "blue" (nouveau). Si ça plante → on rebascule instantanément.
- **Canary** = On déploie la nouvelle version pour 5% des utilisateurs, on monitore, puis on monte progressivement à 100%.
- **Feature Flags** = On déploie le code mais la fonctionnalité est "éteinte". On l'active progressivement via un toggle, sans redéployer.

> � **En contexte**
> - 🔬 **Clinical Engine** : Deploy simple sur Vercel, rollback en un clic. Pas besoin de Blue-Green pour 50 users.
> - 📱 **MyMonka** : Canary releases obligatoires. On ne déploie pas une mise à jour du scoring à 100K aidants d'un coup — on teste sur 5% d'abord, on monitore, puis on scale. Feature flags pour chaque fonctionnalité critique.

�📖 Module : `05_DEVOPS_INFRA.md` § 5.1

---

### Q13 — "Vous avez des environnements séparés ?"

**Réponse courte** : Oui — développement local, preview (Vercel), et production. Les variables d'environnement sont séparées.

**Développement** :
La règle d'or : **ce qui tourne en dev ne touche JAMAIS la prod**.

| Env | URL | Base de données | Usage |
|-----|-----|----------------|-------|
| **Local** | localhost:5173 | Supabase dev/local | Développement quotidien |
| **Preview** | random-url.vercel.app | Supabase staging | Review de PR, démo client |
| **Production** | app.monka.fr | Supabase prod | Utilisateurs réels |

Les **variables d'environnement** (clés API, URL de la DB) sont différentes pour chaque environnement. Jamais en dur dans le code — toujours dans des `.env` ou dans les settings Vercel.

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : 2 environnements suffisent (dev + prod). Le staging est optionnel.
> - 📱 **MyMonka** : 4 environnements minimum — dev / staging / pre-prod / prod. Pre-prod est un clone exact de la prod pour tester les migrations DB et les releases avant le go-live.

📖 Module : `05_DEVOPS_INFRA.md` § 5.3

---

## 💾 BASE DE DONNÉES

### Q14 — "Comment sont modélisées vos données ?"

**Réponse courte** : Schéma relationnel PostgreSQL normalisé — tables patients, questionnaires, réponses, résultats, avec des relations par clés étrangères.

**Développement** :
- **Normalisation** = On ne duplique pas les données. Un patient est dans une table, ses réponses dans une autre, liées par un `patient_id`. Si on change le nom du patient, on le change à un seul endroit.
- **Clés étrangères (FK)** = Des liens entre tables qui garantissent l'intégrité. On ne peut pas avoir une réponse pour un patient qui n'existe pas.
- **Indexes** = Des raccourcis pour accélérer les requêtes. Comme l'index d'un livre — au lieu de lire toutes les pages, tu vas directement à la bonne.

**Analogie** : Un schéma relationnel, c'est comme un classeur avec des onglets (tables). Chaque onglet a des fiches (lignes) avec des champs standardisés (colonnes). Les numéros de dossier (clés) permettent de retrouver les liens entre les fiches.

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Schéma centré sur les questionnaires et le scoring — tables questions, réponses, scores, micro-parcours.
> - 📱 **MyMonka** : Schéma beaucoup plus large — profils aidants, profils patients, historique d'évaluations, notifications, contenus éducatifs, abonnements, audit logs. Multi-tenant par nature (chaque aidant = un tenant isolé).

📖 Module : `04_DATABASE.md` § 4.1

---

### Q14b — "C'est quoi une migration ?"

**Réponse courte** : Un fichier SQL versionné qui modifie la structure de la base de données de manière contrôlée et réversible.

**Développement** :
Le problème : ta DB évolue (nouveau champ, nouvelle table, changement de type). Si tu modifies la DB à la main → chaos. Personne ne sait ce qui a changé.

La solution : les **migrations**.
- Chaque changement = 1 fichier SQL numéroté (`001_create_patients.sql`, `002_add_email_field.sql`)
- On applique les migrations dans l'ordre → la DB arrive au même état sur toutes les machines
- On peut **rollback** (annuler) une migration si elle cause un problème

```sql
-- Migration 003: Ajouter le champ date_naissance
ALTER TABLE patients ADD COLUMN date_naissance DATE;

-- Rollback
ALTER TABLE patients DROP COLUMN date_naissance;
```

**Analogie** : C'est comme un historique Git, mais pour ta base de données. Chaque commit = une migration.

📖 Module : `04_DATABASE.md` § 4.4

---

## 🛠️ DETTE TECHNIQUE & VIBECODING

### Q15 — "Comment vous gérez la dette technique du vibecoding ?"

**Réponse courte** : On la reconnaît, on la catégorise, et on prévoit des sprints de nettoyage. Le vibecoding génère de la dette consciente, pas de la dette ignorée.

**Développement** :
La **dette technique**, c'est comme un crédit : tu prends un raccourci maintenant (livraison rapide) et tu rembourses plus tard (refactoring). Le problème c'est pas la dette — c'est la dette qu'on ignore.

Notre approche :
1. **Identifier** — On sait que le vibecoding génère du code parfois verbeux, des duplications, des patterns incohérents. On le documente.
2. **Catégoriser** — Dette bloquante (sécurité, bugs) vs dette tolérable (code un peu sale mais fonctionnel) vs dette stratégique (on a choisi un raccourci en connaissance de cause).
3. **Planifier** — Des sprints de refactoring dédiés. Les audits de certification qu'on a faits sur le Kernel, c'est exactement ça.
4. **Prévenir** — Linting (ESLint), formatting (Prettier), TypeScript strict. L'IA génère du code, mais les outils forcent un standard de qualité.

**Phrase clé** : *"Le vibecoding, c'est notre accélérateur de prototypage. La dette qu'il génère est consciente et documentée. Le rôle du CTO sera justement d'architecturer le refactoring pour la prod — c'est complémentaire."*

> � **En contexte**
> - 🔬 **Clinical Engine** : La dette est acceptable — c'est un outil interne, la vélocité prime. On la documente et on nettoie par cycles.
> - 📱 **MyMonka** : La dette du vibecoding sera remboursée dès le démarrage. Le CTO pose les standards, on code proprement dès le jour 1. Le Kernel validé est refactoré selon les guidelines du CTO avant intégration dans MyMonka.

�📖 Module : `12_VIBECODING_POSITIONING.md` § 12.3

---

### Q16 — "Le code généré par l'IA, il est de bonne qualité ?"

**Réponse courte** :  Variable. C'est pour ça qu'on a un process de review, des integrity checks, et des certifications d'audit.

**Développement** :
Soyons honnêtes :
- ✅ **Ce que l'IA fait bien** : code fonctionnel rapide, implémentation de patterns connus, conversion de specs en code, boilerplate.
- ⚠️ **Ce que l'IA fait moins bien** : architecture cohérente à grande échelle, gestion fine des edge cases customs, optimisation performance, sécurité avancée.

Notre workflow compensatoire :
1. **Prompt précis** → On ne dit pas "fais une app", on donne des specs détaillées
2. **Review systématique** → On relit le code généré, on comprend ce qu'il fait
3. **Integrity checks** → Des vérifications automatisées sur la cohérence des données
4. **Audit de certification** → On valide formellement que chaque parcours clinique est correct

**Phrase clé** : *"L'IA est notre développeur junior ultra-rapide. Comme tout junior, son code doit être reviewé. La différence, c'est qu'un junior ne peut pas produire 10 fichiers en 10 minutes."*

📖 Module : `12_VIBECODING_POSITIONING.md` § 12.2, 12.4

---

### Q17 — "Vous utilisez Git comment ?"

**Réponse courte** : Feature branches avec PR vers main. Chaque fonctionnalité = une branche, chaque merge = une PR reviewée.

**Développement** :
```
main (production)
  ├── feature/clinical-scoring-v3    ← En cours de dev
  ├── fix/vulnerability-display-bug  ← Correction de bug
  └── refactor/kernel-cleanup        ← Nettoyage technique
```

Le flow :
1. Créer une branche depuis `main` → `feature/nom-explicite`
2. Développer dessus → commits réguliers avec des messages clairs
3. Ouvrir une **Pull Request (PR)** → description du changement
4. **Review** → vérification du code (ou auto-review en vibecoding)
5. **Merge** → la branche est fusionnée dans main → déploiement auto

**Conventions de messages de commit** (Conventional Commits) :
- `feat: ajout scoring V3` (nouvelle fonctionnalité)
- `fix: correction affichage vulnérabilité` (bug fix)
- `refactor: extraction logique micro-parcours` (nettoyage)
- `docs: mise à jour README` (documentation)

📖 Module : `08_CODE_QUALITY.md` § 8.1

---

## ⚡ PERFORMANCE & SCALABILITÉ

### Q18 — "Ça scale, votre truc ?"

**Réponse courte** : Oui. React SPA + Supabase = architecture nativement scalable. Le front est statique (CDN), le back est serverless.

**Développement** :
**Scaler** = supporter plus d'utilisateurs sans que l'app rame.

Deux types de scaling :
- **Vertical** = Mettre une machine plus puissante (plus de RAM, plus de CPU). Simple mais limité.
- **Horizontal** = Ajouter plus de machines. Illimité mais plus complexe.

Notre architecture scale naturellement :
- **Front React/Vite** → Fichiers statiques servis par un CDN (Vercel). Que tu aies 10 ou 10 000 utilisateurs, c'est la même chose. Le CDN distribue les fichiers sur des serveurs partout dans le monde.
- **Supabase/PostgreSQL** → Scale verticalement avec le plan Supabase (on monte le compute). Pour du scaling horizontal, Supabase propose des read replicas.
- **Edge Functions** → Serverless = chaque requête crée sa propre instance. Pas de serveur qui sature.

**Phrase clé** : *"Notre front est sur CDN (scale infini), notre back est serverless (scale automatique). Le goulot d'étranglement potentiel, c'est la DB — mais PostgreSQL, bien indexé, tient facilement 10 000 utilisateurs concurrents."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : La question du scaling ne se pose pas. 50 users, pas de pic de trafic. L'architecture actuelle tient sans problème.
> - 📱 **MyMonka** : 100K aidants simultanés = un vrai défi d'infra. Il faudra : connection pooling (PgBouncer), read replicas PostgreSQL, cache Redis pour les données fréquentes (référentiels, contenus), CDN agressif, load balancing, et potentiellement du horizontal scaling sur les Edge Functions. Le CTO devra designer cette architecture.

📖 Module : `09_PERFORMANCE.md` § 9.6

---

### Q19 — "C'est quoi les Core Web Vitals ?"

**Réponse courte** : Les 3 métriques de performance web de Google — LCP (temps d'affichage), FID (réactivité), CLS (stabilité visuelle).

**Développement** :
| Métrique | Signification | Seuil "bon" | Ce que ça mesure |
|----------|--------------|-------------|-----------------|
| **LCP** | Largest Contentful Paint | < 2.5s | Combien de temps pour voir le contenu principal |
| **FID** | First Input Delay | < 100ms | Combien de temps avant que l'app réagisse au premier clic |
| **CLS** | Cumulative Layout Shift | < 0.1 | Est-ce que la page "saute" pendant le chargement |

**Analogie** : LCP = combien de temps pour que le plat arrive au restaurant. FID = combien de temps pour que le serveur prenne ta commande. CLS = est-ce que le serveur déplace ton assiette pendant que tu manges.

📖 Module : `09_PERFORMANCE.md` § 9.1

---

## 🤝 COLLABORATION & MÉTHODO

### Q20 — "Comment vous voyez la collaboration avec moi (le CTO) ?"

**Réponse courte** : Le CTO architecte et décide des patterns, on exécute rapidement avec le vibecoding. Le CTO est le "cerveau senior", on est le "bras rapide".

**Développement** :
Le modèle de collaboration :
1. **Le CTO décide** → Architecture, patterns, standards de code, stratégie technique, tech stack définitif
2. **On exécute** → Implémentation rapide des décisions via vibecoding, prototypage, itération
3. **Le CTO review** → Code review, validation des PR, quality gates
4. **On itère** → Corrections basées sur les retours, refactoring guidé

**Ce qu'on apporte** :
- Vélocité d'exécution exceptionnelle
- Connaissance profonde du métier clinique (le Kernel)
- Prototypage ultra-rapide pour tester des idées
- Lien direct avec le client (compréhension du besoin)

**Ce qu'on attend du CTO** :
- Architecture robuste et scalable
- Standards de code et de tests
- Mentoring technique
- Décisions sur les patterns complexes

**Phrase clé** : *"On ne prétend pas être des CTO. On est des product builders qui codent vite et qui comprennent le métier. Le CTO apporte l'architecture et la rigueur technique. C'est la combinaison des deux qui fait la vélocité."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Le CTO audite le code existant, identifie ce qui est récupérable pour MyMonka et ce qui doit être refactoré.
> - � **MyMonka** : Le CTO architecure l'app from scratch, on implémente à haute vélocité, il review et corrige la trajectoire. Sprint par sprint.

�📖 Module : `12_VIBECODING_POSITIONING.md` § 12.5

---

### Q21 — "C'est quoi Agile/Scrum pour vous ?"

**Réponse courte** : Des sprints de 2 semaines avec planning, daily, review et retro. L'objectif c'est de livrer de la valeur utilisable à chaque sprint.

**Développement** :
**Scrum** en résumé :
- **Sprint** = période fixe (2 semaines en général) où on livre un incrément de l'app
- **Sprint Planning** = On choisit QUOI on va faire pendant le sprint
- **Daily Standup** = 15 min debout chaque matin — ce que j'ai fait, ce que je vais faire, est-ce que je suis bloqué
- **Sprint Review** = On montre ce qu'on a livré au client/stakeholders
- **Retrospective** = On discute de ce qui a bien/mal marché pour s'améliorer

**Les rôles** :
- **Product Owner** = Décide du QUOI (priorités business). Côté client/Monka.
- **Scrum Master** = Garantit le process. Enlève les problèmes.
- **Dev Team** = Fait le boulot. Nous + le CTO.

**Estimation** :
- **Story Points** = On estime la complexité relative, pas le temps. Un "ticket à 3 points" est 3x plus complexe qu'un "ticket à 1 point".
- **Planning Poker** = Chacun vote sa complexité en même temps (pour éviter l'influence).

📖 Module : `11_METHODOLOGIE_PROJET.md` § 11.1

---

### Q22 — "C'est quoi une ADR ?"

**Réponse courte** : Architecture Decision Record — un document court qui explique POURQUOI on a pris une décision technique.

**Développement** :
Format standard d'une ADR :
```markdown
# ADR-001: Choix de Supabase comme backend

## Statut : Accepté
## Date : 2025-11-15

## Contexte
On a besoin d'un backend avec auth, DB, et API. L'équipe n'a pas de backend developer dédié.

## Décision
On utilise Supabase (PostgreSQL managé + Auth + API auto-générée).

## Conséquences
+ Pas besoin de gérer l'infra DB
+ Auth prête à l'emploi
+ RLS natif
- Vendor lock-in partiel sur les features Supabase-specific
- Pas HDS nativement (migration future nécessaire)
```

**Pourquoi c'est important** : Dans 6 mois, quand quelqu'un demande "pourquoi Supabase ?", la réponse est documentée. Pas besoin de retrouver la personne qui a décidé.

📖 Module : `08_CODE_QUALITY.md` § 8.4

---

## 🔧 CONCEPTS TECHNIQUES AVANCÉS

### Q23 — "C'est quoi la différence entre REST et GraphQL ?"

**Réponse courte** : REST = un endpoint par ressource (`/patients`, `/scores`). GraphQL = un seul endpoint où le client demande exactement les données qu'il veut.

**Développement** :
| | REST | GraphQL |
|---|------|---------|
| **Endpoints** | Multiples (`/api/patients`, `/api/scores`) | Un seul (`/graphql`) |
| **Données reçues** | Tout ce que le serveur envoie (over-fetching) | Exactement ce que tu demandes |
| **Requêtes** | GET, POST, PUT, DELETE | Query, Mutation, Subscription |
| **Simplicité** | Plus simple à apprendre | Plus flexible mais plus complexe |
| **Cas d'usage** | CRUD classique | Apps avec des besoins de données complexes |

**Supabase** utilise PostgREST (REST auto-généré depuis le schéma PostgreSQL). C'est suffisant pour Monka. GraphQL serait du over-engineering.

📖 Module : `03_BACKEND_API.md` § 3.1

---

### Q24 — "C'est quoi un JWT ?"

**Réponse courte** : JSON Web Token — un jeton signé cryptographiquement qui prouve l'identité d'un utilisateur sans interroger la DB à chaque requête.

**Développement** :
Un JWT a 3 parties :
```
eyJhbGci... . eyJzdWIi... . SflKxwRJ...
   HEADER       PAYLOAD       SIGNATURE
```

1. **Header** = "J'utilise l'algorithme HS256 pour signer"
2. **Payload** = "L'utilisateur est user_123, il a le rôle admin, le token expire dans 1h"
3. **Signature** = Preuve cryptographique que personne n'a modifié le payload

**Flow** :
1. L'utilisateur se connecte → le serveur génère un JWT → le renvoie au client
2. Le client inclut le JWT dans chaque requête (`Authorization: Bearer eyJ...`)
3. Le serveur vérifie la signature → sait qui c'est sans DB lookup

**Analogie** : C'est comme un bracelet de festival. La sécurité te le met au poignet (login), ensuite tu montres juste ton bracelet pour entrer où tu veux (chaque requête). Le bracelet est infalsifiable (signature).

📖 Module : `03_BACKEND_API.md` § 3.2

---

### Q25 — "C'est quoi Docker et pourquoi c'est utile ?"

**Réponse courte** : Docker empaquette une application avec toutes ses dépendances dans un "container" qui tourne de manière identique partout.

**Développement** :
Le problème classique : *"Ça marche sur ma machine !"* → Pas sur celle du collègue, pas sur le serveur.

**Docker résout ça** :
- Un **container** = une mini-machine virtuelle ultra-légère qui contient ton app + tout ce qu'elle a besoin (Node.js, librairies, config)
- Un **Dockerfile** = la recette pour construire le container
- Un **docker-compose** = pour orchestrer plusieurs containers (app + DB + cache)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

**On n'utilise pas Docker aujourd'hui** (Vercel et Supabase gèrent l'infra). Mais si le CTO veut containeriser pour standardiser les environnements de dev → on sait ce que c'est et pourquoi.

> 📌 **En contexte**
> - � **Clinical Engine** : Pas besoin de Docker. Vercel + Supabase suffisent.
> - 📱 **MyMonka** : Docker deviendra probablement indispensable — pour standardiser le dev local (docker-compose avec l'app + la DB + Redis), pour le déploiement sur un hébergeur HDS (qui peut exiger des containers), et pour le CI/CD (tests dans des containers isolés).

�📖 Module : `05_DEVOPS_INFRA.md` § 5.2

---

### Q26 — "C'est quoi le CI/CD exactement ?"

**Réponse courte** : Continuous Integration (le code est testé automatiquement à chaque push) + Continuous Deployment (il est déployé automatiquement si les tests passent).

**Développement** :
```
Push code → CI (build + tests) → CD (deploy)
   |              |                    |
  Git      GitHub Actions           Vercel
```

**CI (Continuous Integration)** :
- À chaque push, un robot (GitHub Actions) :
  1. Clone le code
  2. Installe les dépendances
  3. Lance le build (vérifie que ça compile)
  4. Lance les tests (vérifie que ça fonctionne)
  5. Lance le linting (vérifie que le code est propre)
- Si une étape échoue → 🔴 le merge est bloqué

**CD (Continuous Deployment)** :
- Si le CI passe ✅ → le code est déployé automatiquement en prod
- Zéro intervention humaine entre le merge et la mise en prod

**Ce qu'on a** : Vercel fait le CD (deploy auto sur push). Pour la prod, on ajouterait un CI avec GitHub Actions pour les tests automatisés.

📖 Module : `05_DEVOPS_INFRA.md` § 5.1

---

### Q27 — "Comment vous gérez les secrets et les clés API ?"

**Réponse courte** : Variables d'environnement, jamais dans le code. `.env` en local, secrets Vercel en prod, `.gitignore` sur les fichiers sensibles.

**Développement** :
❌ **JAMAIS** :
```javascript
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIs..." // DANS LE CODE !!!
```

✅ **TOUJOURS** :
```javascript
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY // Depuis l'environnement
```

Où sont stockés les secrets :
| Environnement | Stockage |
|--------------|----------|
| **Local** | Fichier `.env` (dans le `.gitignore`) |
| **Vercel** | Dashboard → Settings → Environment Variables |
| **CI/CD** | GitHub → Settings → Secrets |

**Important** : Les clés côté client (anon key Supabase) sont **publiques par design** — elles sont visibles dans le navigateur. C'est le RLS qui protège, pas la clé. La clé `service_role` est secrète et ne doit JAMAIS être dans le code front.

📖 Module : `10_PRODUCTION_READINESS.md` § 10.4

---

### Q28 — "Qu'est-ce que vous entendez par 'refactoring' ?"

**Réponse courte** : Modifier la structure du code SANS changer son comportement. Le code fait la même chose, mais il est mieux organisé.

**Développement** :
**Avant** (ça marche mais c'est sale) :
```typescript
if (score > 80 && age > 75 && chutes > 2 && medicaments > 5) {
  return "CRITICAL";
} else if (score > 60 && age > 70) {
  return "HIGH";
}
```

**Après refactoring** (même comportement, lisible) :
```typescript
const isCriticalProfile = score > SEUIL_CRITICAL 
  && age > AGE_FRAGILE 
  && chutes > MAX_CHUTES_SANS_RISQUE 
  && medicaments > POLYMEDICATION_SEUIL;

const isHighRiskProfile = score > SEUIL_HIGH && age > AGE_SENIOR;

if (isCriticalProfile) return VulnerabilityLevel.CRITICAL;
if (isHighRiskProfile) return VulnerabilityLevel.HIGH;
```

**Règle du Boy Scout** : Laisse le code un peu plus propre que tu ne l'as trouvé. Chaque fois que tu touches un fichier, améliore un petit truc.

📖 Module : `08_CODE_QUALITY.md` § 8.6

---

### Q29 — "C'est quoi un monorepo vs multirepo ?"

**Réponse courte** : Monorepo = tout le code dans un seul repo Git. Multirepo = un repo par projet/service.

**Développement** :
| | Monorepo | Multirepo |
|---|---------|-----------|
| **Structure** | 1 repo avec tous les projets | 1 repo par projet |
| **Exemples** | Google, Meta, le repo Monka | La plupart des startups |
| **Avantages** | Changements atomiques, partage de code facile | Isolation, permissions granulaires |
| **Inconvénients** | Repo peut devenir énorme, CI plus complexe | Synchronisation entre repos difficile |

**Monka aujourd'hui** : C'est un monorepo (Kernel + APP + docs dans le même repo). C'est cohérent pour un projet à cette taille. Si l'app grossit beaucoup, le CTO pourrait décider de séparer en multirepo (mais pas nécessaire à court terme).

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Monorepo = parfait. Tout est au même endroit, facile à naviguer.
> - 📱 **MyMonka** : Le CTO pourrait vouloir un multirepo — un repo pour le Kernel (librairie partagée), un pour l'app MyMonka, un pour l'infra. Ou un monorepo avec des workspaces (Turborepo/pnpm). C'est une décision d'architecture qu'il prendra.

📖 Module : `08_CODE_QUALITY.md` § 8.1

---

### Q30 — "Si vous deviez résumer en 3 phrases pourquoi on devrait vous faire confiance ?"

**Réponse pitch** :

> *"Un — On a livré un Kernel clinique fonctionnel avec 157 questions validées, 24 micro-parcours, et un système de scoring déterministe. C'est le travail le plus dur — comprendre et encoder la logique métier gériatrique."*
>
> *"Deux — On connaît nos limites. On sait que notre prototype n'est pas production-ready, et on sait exactement ce qui manque. C'est pour ça qu'on veut un CTO : pas pour nous remplacer, mais pour architecturer la transition prototype → prod pendant qu'on continue à itérer vite."*
>
> *"Trois — Notre vélocité est notre avantage compétitif. Ce qui prendrait 3 mois à une équipe classique, on le prototype en 2 semaines. Le CTO pose les rails, on fait rouler le train."*

> 📌 **Version enrichie avec les 2 apps**
> *"Le Clinical Engine prouve qu'on maîtrise le métier. 157 questions, 24 micro-parcours, validés par des experts. Maintenant il faut transformer cette logique en MyMonka — une app grand public pour 100K aidants. C'est un chantier d'architecture, et c'est pour ça qu'on veut un CTO. Nous, on apporte la vélocité et le métier. Lui, l'architecture et la rigueur."*

📖 Module : `12_VIBECODING_POSITIONING.md` § 12.6

---

> **Rappel** : Lis ce document 3 fois. La première pour comprendre. La deuxième pour mémoriser. La troisième la veille du meeting. Tu ne freezeras pas. 🧊→🔥
