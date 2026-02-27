# Module 10 — PRODUCTION READINESS

> **Objectif** : Savoir où on en est et ce qui manque.
> C'est LE sujet que le CTO va creuser en premier.

> **🔬 Clinical Engine** = POC réussi, prod-readiness non requise (outil interne de validation) | **📱 MyMonka** = Les 12 critères sont obligatoires AVANT la mise en production

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **La checklist des 12 critères prod-ready** (§10.1) — Connais-la par cœur
> 2. **Error handling** (§10.2) — L'app ne doit JAMAIS crasher silencieusement
> 3. **Monitoring** (§10.3) — Tu dois savoir quand l'app plante, AVANT l'utilisateur
> 4. **Secrets management** (§10.4) — Zéro secret dans le code, point final
>
> Si tu maîtrises ces 4 chapitres, tu peux tenir 80% d'une conversation prod-readiness.

---

## 10.1 — Qu'est-ce qu'une app "Production-Ready" ?

### Le concept
Un prototype qui "fonctionne" ≠ une application de production. La différence, c'est tout ce qui se passe **quand ça ne fonctionne PAS**.

Un prototype, tu le montres dans une démo. Une app de prod, elle tourne **24/7, sans toi, avec de vrais utilisateurs qui font des trucs imprévus**.

### La checklist des 12 critères

| # | Critère | Prototype | Production | Criticité |
|---|---------|-----------|------------|-----------|
| 1 | **Tests automatisés** | Manuels | Unit + Integration + E2E | 🔴 Critique |
| 2 | **Error handling** | `console.log(error)` | Error boundaries + logging structuré | 🔴 Critique |
| 3 | **Monitoring** | Tu regardes la console | Sentry + alertes automatiques | 🔴 Critique |
| 4 | **Secrets management** | `.env` en local | Vault / Secrets manager | 🔴 Critique |
| 5 | **Backup** | Aucun | Automatique + testé | 🔴 Critique |
| 6 | **Auth & Security** | Login basique | MFA, rate limiting, audit log | 🟡 Important |
| 7 | **Performance** | "Ça charge vite chez moi" | Profiling, CDN, caching | 🟡 Important |
| 8 | **Documentation** | README basique | ADR, runbooks, API docs | 🟡 Important |
| 9 | **CI/CD** | Deploy manuel ou automatique simple | Pipeline avec quality gates | 🟡 Important |
| 10 | **Environnements** | Dev = Prod | Dev / Staging / Prod isolés | 🟡 Important |
| 11 | **Scalabilité** | "Ça marche pour 10 users" | Load tested pour la cible | 🟢 Nice-to-have (début) |
| 12 | **Compliance** | Ignorée | RGPD, HDS, audits | 🔴 Critique (santé) |

### Où en est Monka ?
Soyons honnêtes (le CTO appréciera la transparence) :

| Critère | Statut Monka | Commentaire |
|---------|-------------|-------------|
| Tests | ⚠️ Partiellement | Integrity checks sur le Kernel, pas de tests automatisés classiques |
| Error handling | ⚠️ Basique | Pas d'Error Boundaries systématiques |
| Monitoring | ❌ Absent | Pas de Sentry ni de logging structuré |
| Secrets | ✅ OK | `.env` + Vercel secrets, rien dans le code |
| Backup | ⚠️ Supabase auto | Backup Supabase activé, mais pas de stratégie DR formelle |
| Auth | ✅ OK | Supabase Auth avec RLS |
| Performance | ⚠️ Non profilé | Pas de Lighthouse audit formel |
| Documentation | ✅ Riche | Kernel documenté, certifications, audits |
| CI/CD | ✅ OK | Vercel auto-deploy |
| Environnements | ⚠️ Partiel | Dev/Prod séparés, pas de staging formel |
| Scalabilité | ⚠️ Non testé | Architecture OK, mais pas de load test |
| Compliance | ⚠️ Conscient | RLS OK, HDS identifié comme nécessaire, pas encore implémenté |

---

## 10.2 — Error Handling (Gestion des erreurs)

### Le concept
Imagine une autoroute sans glissière de sécurité. Quand tout va bien, personne ne les remarque. Quand quelque chose va mal, elles sauvent des vies. L'error handling, c'est les **glissières de sécurité de ton code**.

### Les 3 niveaux

#### Niveau 1 : Try/Catch (JavaScript natif)

Le mécanisme de base pour "entourer" du code risqué :

```typescript
// ❌ MAUVAIS — L'erreur est avalée silencieusement
try {
  const data = await fetchPatientData(id);
} catch (e) {
  // Rien... L'utilisateur voit un écran vide.
}

// ✅ BON — L'erreur est gérée proprement
try {
  const data = await fetchPatientData(id);
} catch (error) {
  // 1. Logger pour les devs
  logger.error('Erreur chargement patient', { patientId: id, error });
  
  // 2. Informer l'utilisateur
  showNotification('Impossible de charger les données. Réessayez.');
  
  // 3. Reporter au monitoring
  Sentry.captureException(error);
}
```

**Règle** : Chaque `catch` doit faire 3 choses — **logger**, **informer**, **reporter**.

#### Niveau 2 : Error Boundaries (React spécifique)

Un **Error Boundary** est un composant React spécial qui "attrape" les erreurs de ses composants enfants. Sans ça, une erreur dans un composant = toute l'app crashe (écran blanc).

```tsx
// L'Error Boundary entoure les composants à risque
<ErrorBoundary fallback={<p>Quelque chose s'est mal passé. Rechargez la page.</p>}>
  <ClinicalScoring /> {/* Si ce composant crashe... */}
</ErrorBoundary>
{/* ...le reste de l'app continue de fonctionner */}
<NavigationBar />
```

**Analogie** : C'est comme un fusible électrique. Si un appareil court-circuite, le fusible saute pour CE circuit, mais le reste de la maison continue d'avoir du courant.

#### Niveau 3 : Graceful Degradation

L'idée : si un service est down, l'app continue de fonctionner en mode dégradé au lieu de crasher totalement.

Exemples :
- La DB est lente → afficher les données en cache
- Le service de scoring est down → afficher "Résultats temporairement indisponibles" au lieu d'un écran blanc
- L'API externe (IDEC) ne répond pas → fonctionner en mode offline avec les dernières données connues

---

## 10.3 — Logging & Monitoring

### Le concept
**Logging** = écrire un journal de tout ce qui se passe dans l'app.
**Monitoring** = surveiller ce journal en temps réel et alerter quand quelque chose va mal.

Sans monitoring, tu découvres les bugs quand un utilisateur t'appelle. Avec monitoring, tu le sais avant lui.

### Les niveaux de log

```
DEBUG   → Détails techniques (pour les devs en développement)
INFO    → Événements normaux (utilisateur connecté, scoring calculé)
WARN    → Situations anormales mais pas critiques (temps de réponse lent)
ERROR   → Quelque chose a planté (requête échouée, calcul impossible)
FATAL   → L'app est cassée (base de données inaccessible)
```

### Structured Logging

**❌ Log non structuré** (inutile en prod) :
```
"Erreur lors du calcul du score pour le patient"
```

**✅ Log structuré** (exploitable) :
```json
{
  "level": "ERROR",
  "message": "Score calculation failed",
  "timestamp": "2026-02-27T15:30:00Z",
  "patientId": "abc-123",
  "module": "V3_scoring",
  "error": "Division by zero in vulnerability index",
  "userId": "user-456",
  "requestId": "req-789"
}
```

Avec un log structuré, tu peux **filtrer**, **chercher**, et **alerter** automatiquement. "Montre-moi toutes les erreurs du module V3 dans les dernières 24h" → 2 secondes.

### Outils de monitoring

| Outil | Usage | Coût |
|-------|-------|------|
| **Sentry** | Capture automatique des erreurs + stack traces | Gratuit pour petits volumes |
| **Datadog** | Monitoring complet (logs, metrics, traces) | Payant, puissant |
| **Vercel Analytics** | Performance web (Core Web Vitals) | Inclus dans Vercel |
| **Supabase Dashboard** | Métriques DB (requêtes lentes, connections) | Inclus dans Supabase |

### Correlation ID

Un concept pro : à chaque requête d'un utilisateur, on génère un ID unique (`requestId`). Cet ID est propagé dans tous les logs liés à cette requête. Si un utilisateur signale "ça a planté", il te donne le `requestId` → tu retrouves toute la chaîne d'événements en 10 secondes.

---

## 10.4 — Environment Config & Secrets Management

### Le concept
Les **secrets** (clés API, mots de passe DB, tokens) ne doivent JAMAIS être dans le code source. Si ton repo Git est compromis, tes secrets sont exposés.

### La règle d'or

```
CODE SOURCE = PUBLIC (même si repo privé, traite-le comme potentiellement public)
SECRETS = DANS L'ENVIRONNEMENT (variables d'env, secrets manager)
```

### Hiérarchie des méthodes (de basique à pro)

| Niveau | Méthode | Quand l'utiliser |
|--------|---------|-----------------|
| 1 | Fichier `.env` + `.gitignore` | Développement local |
| 2 | Variables d'env du provider (Vercel, GitHub) | CI/CD et production |
| 3 | Secrets Manager (AWS SSM, Vault) | Entreprise, compliance forte |

### Le piège du front-end

**Attention** : En React, toute variable d'environnement préfixée `VITE_` est **incluse dans le bundle** et visible par n'importe qui dans le navigateur (via les DevTools).

```
VITE_SUPABASE_URL=xxx        ← VISIBLE dans le navigateur (OK, c'est prévu)
VITE_SUPABASE_ANON_KEY=xxx   ← VISIBLE dans le navigateur (OK, le RLS protège)
SUPABASE_SERVICE_ROLE_KEY=xxx ← INVISIBLE, pas préfixé VITE_ (CRITIQUE, jamais côté client)
```

La **anon key** Supabase est **publique par design**. Ce n'est PAS un secret. Le RLS garantit que même avec cette clé, un utilisateur ne voit que ses données.

La **service_role key** donne un accès admin total à la DB. Elle ne doit exister QUE côté serveur (Edge Functions, scripts d'admin).

### Validation de config

Au démarrage de l'app, **valider** que toutes les variables nécessaires sont présentes :
```typescript
const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Variable d'environnement manquante : ${envVar}`);
  }
}
```

Un crash au démarrage avec un message clair > un bug mystérieux 3 heures plus tard.

---

## 10.5 — Health Checks & Readiness Probes

### Le concept
Comment savoir si ton application est **vivante** et **prête** à servir des requêtes ?

### Health Check Endpoint

Un endpoint simple qui répond "je suis en vie" :

```typescript
// GET /api/health
{
  "status": "healthy",
  "version": "1.2.3",
  "uptime": "72h",
  "database": "connected",
  "timestamp": "2026-02-27T15:30:00Z"
}
```

**Liveness** = "L'app tourne ?" → Si non, redémarrer.
**Readiness** = "L'app est prête à servir ?" → Si non, ne pas envoyer de trafic.

Différence : l'app peut être vivante (le process tourne) mais pas ready (la DB n'est pas encore connectée). Un load balancer n'envoie du trafic qu'aux instances ready.

---

## 10.6 — Rollback Strategy

### Le concept
Question fondamentale : **si le déploiement casse tout, comment tu reviens en arrière en 30 secondes ?**

### Les 3 stratégies

#### 1. Rollback simple (Vercel)
Vercel garde un historique de chaque déploiement. En un clic, tu redéploies la version précédente. Simple, efficace, suffisant pour commencer.

#### 2. Blue-Green Deployment
```
                    ┌─── Blue (v1.0 — ACTUEL) ◄── trafic utilisateurs
Load Balancer ──────┤
                    └─── Green (v1.1 — NOUVEAU, en test)
```
- Tu déploies la v1.1 sur Green
- Tu testes sur Green (URL privée)
- Tu bascules le trafic de Blue vers Green
- Si ça pète → tu rebascules en 1 seconde

#### 3. Canary Release
```
v1.0 ████████████████████████ 95% du trafic
v1.1 ██                        5% du trafic
```
- Tu envoies 5% des utilisateurs sur la nouvelle version
- Tu monitores les métriques (erreurs, latence)
- Si tout va bien → 25% → 50% → 100%
- Si ça pète → tout le monde revient sur v1.0

### Feature Flags
Une alternative au rollback : le code est déployé mais **désactivé**.

```typescript
if (featureFlags.isEnabled('new_scoring_v4')) {
  return calculateScoreV4(patient);
} else {
  return calculateScoreV3(patient); // Version stable
}
```

Tu actives/désactives la fonctionnalité via une interface (LaunchDarkly, Unleash), **sans redéployer**. Si le nouveau scoring bugue → tu l'éteins en 2 secondes.

---

## 10.7 — SLA / SLO / SLI

### Le concept
Des **engagements mesurables** sur la qualité du service.

| Terme | Signification | Exemple |
|-------|--------------|---------|
| **SLI** (Indicator) | Ce qu'on mesure | "Le temps de réponse de l'API" |
| **SLO** (Objective) | L'objectif qu'on se fixe | "Le P99 doit être < 500ms" |
| **SLA** (Agreement) | L'engagement contractuel | "99.9% de disponibilité ou remboursement" |

**Analogie** : SLI = le compteur de vitesse. SLO = la limite à 130. SLA = l'amende si tu dépasses.

**99.9% de disponibilité** (le fameux "trois neuf") = au maximum **8h45 de downtime par an**. Ça paraît beaucoup, mais certains services visent 99.99% (52 min/an).

### Error Budget
Un concept malin : si ton SLO est 99.9%, tu as un **budget d'erreur de 0.1%**. Tant que tu restes dans le budget, tu peux prendre des risques (déployer souvent, expérimenter). Si tu le consommes → tu arrêtes de deploy et tu stabilises.

---

## 10.8 — Incident Management

### Le concept
Quand l'app tombe en prod (et ça arrivera), **que fait-on ?**

### Le flow d'incident

```
1. DETECTION → Monitoring alerte automatiquement
2. TRIAGE    → Quel est l'impact ? (P1 = critique, P4 = mineur)
3. RÉPONSE   → L'on-call prend en charge, communique
4. RÉSOLUTION → Fix, rollback, ou workaround
5. POST-MORTEM → Analyse à froid, actions préventives
```

### Post-Mortem (Blameless)

Après chaque incident majeur, on rédige un **post-mortem** :
- **Quoi** : Ce qui s'est passé
- **Timeline** : Minute par minute
- **Impact** : Combien d'utilisateurs, combien de temps
- **Root Cause** : Pourquoi c'est arrivé (vraiment)
- **Actions** : Ce qu'on met en place pour que ça n'arrive plus

**Blameless** = on ne cherche pas QUI a merdé, mais POURQUOI le système a permis que ça arrive. C'est une culture, pas juste un document.

### Runbooks

Des **guides opérationnels** prérédigés pour les incidents courants :
```markdown
# Runbook : Base de données inaccessible

## Symptômes
- Erreurs 500 sur toutes les requêtes
- Logs : "connection refused" sur PostgreSQL

## Diagnostic
1. Vérifier le status Supabase : https://status.supabase.com
2. Vérifier les connexions actives dans le dashboard
3. Tester la connexion depuis une Edge Function

## Résolution
1. Si Supabase est down → attendre + communiquer aux utilisateurs
2. Si connection pool saturé → redémarrer le service
3. Si migration cassée → rollback la dernière migration
```

---

> 💡 **Ce que le CTO va retenir** : Tu sais ce qui manque, tu sais ce qu'il faut faire, et tu as un plan. C'est exactement la maturité qu'il cherche — pas un code parfait, mais une **conscience professionnelle** de ce que "production" signifie.
