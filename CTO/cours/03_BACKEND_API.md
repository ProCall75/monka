# Module 03 — BACKEND & API

> **Objectif** : Comprendre la couche serveur même si Supabase fait beaucoup du travail.
> Le CTO évaluera ta compréhension de ce qui se passe "derrière" l'UI.

> **🔬 Clinical Engine** = API Supabase auto-générée, peu d'Edge Functions | **📱 MyMonka** = API robuste, Edge Functions pour la logique sensible, rate limiting, webhooks

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **REST API** (§3.1) — Les verbes HTTP et les status codes
> 2. **Authentication flow** (§3.2) — JWT, sessions, refresh tokens
> 3. **Authorization** (§3.3) — RBAC et policies Supabase
>
> Si tu maîtrises REST + Auth + Authorization, tu tiens 80% d'une conversation backend.

---

## 3.1 — API Design (REST)

### Les verbes HTTP

Chaque requête HTTP a un **verbe** qui indique l'action :

| Verbe | Action | Exemple | Idempotent ? |
|-------|--------|---------|-------------|
| **GET** | Lire/récupérer | `GET /api/patients` → liste des patients | ✅ Oui |
| **POST** | Créer | `POST /api/patients` → créer un patient | ❌ Non |
| **PUT** | Remplacer entièrement | `PUT /api/patients/123` → remplacer le patient 123 | ✅ Oui |
| **PATCH** | Modifier partiellement | `PATCH /api/patients/123` → modifier un champ | ✅ Oui |
| **DELETE** | Supprimer | `DELETE /api/patients/123` → supprimer | ✅ Oui |

**Idempotent** = Faire la même requête 10 fois produit le même résultat (sauf POST qui crée 10 fois).

### Les Status Codes HTTP

Les codes de réponse du serveur. Les connaître te donne une crédibilité instantanée :

| Code | Catégorie | Signification | Quand |
|------|-----------|--------------|-------|
| **200** | ✅ Success | OK, requête réussie | GET, PUT, PATCH réussis |
| **201** | ✅ Success | Créé avec succès | POST réussi |
| **204** | ✅ Success | Pas de contenu | DELETE réussi |
| **400** | ❌ Client Error | Requête malformée | Données invalides |
| **401** | ❌ Client Error | Non authentifié | Token manquant/expiré |
| **403** | ❌ Client Error | Non autorisé | Droits insuffisants |
| **404** | ❌ Client Error | Non trouvé | Ressource inexistante |
| **409** | ❌ Client Error | Conflit | Doublon, ressource déjà existante |
| **422** | ❌ Client Error | Données invalides | Validation échouée |
| **429** | ❌ Client Error | Trop de requêtes | Rate limiting |
| **500** | 💀 Server Error | Erreur interne | Bug dans le code serveur |
| **502** | 💀 Server Error | Bad Gateway | Le serveur intermédiaire n'arrive pas à joindre le backend |
| **503** | 💀 Server Error | Service indisponible | Serveur surchargé ou en maintenance |

**La règle** : 2xx = tout va bien. 4xx = le client a fait une erreur. 5xx = le serveur a planté.

### REST avec Supabase (PostgREST)

Supabase génère automatiquement une API REST depuis le schéma PostgreSQL :

```
GET    /rest/v1/patients              → SELECT * FROM patients
GET    /rest/v1/patients?id=eq.123    → SELECT * FROM patients WHERE id = 123
POST   /rest/v1/patients              → INSERT INTO patients (...)
PATCH  /rest/v1/patients?id=eq.123    → UPDATE patients SET ... WHERE id = 123
DELETE /rest/v1/patients?id=eq.123    → DELETE FROM patients WHERE id = 123
```

On n'écrit pas de code backend pour le CRUD. Supabase le fait. Le RLS assure la sécurité.

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : PostgREST suffit pour tout le CRUD. Quelques Edge Functions pour les opérations spéciales.
> - 📱 **MyMonka** : PostgREST pour le CRUD de base, mais un layer API custom (Edge Functions ou un backend dédié) pour : le calcul de scoring côté serveur, les notifications push, l'intégration IDEC, la génération de rapports PDF. Le CTO décidera de l'architecture backend.

---

## 3.2 — Authentication (Authentification)

### La différence Auth vs Authz

| | Authentication (AuthN) | Authorization (AuthZ) |
|---|----------------------|---------------------|
| **Question** | "Qui es-tu ?" | "As-tu le droit de faire ça ?" |
| **Mécanisme** | Login, JWT, sessions | Rôles, permissions, policies |
| **Quand** | Au login | À chaque requête |

### Le flow JWT (Supabase Auth)

```
1. L'utilisateur se connecte (email + mdp)
       ↓
2. Supabase vérifie les credentials
       ↓
3. Supabase génère 2 tokens :
   - Access Token (JWT, expire en 1h)
   - Refresh Token (expire en 7 jours)
       ↓
4. Le client stocke les tokens
       ↓
5. À chaque requête API :
   Authorization: Bearer <access_token>
       ↓
6. Supabase vérifie le JWT (sans DB lookup — vérifie juste la signature)
       ↓
7. Si le JWT est expiré :
   Le client utilise le Refresh Token pour obtenir un nouveau Access Token
```

### Analogie complète
- **Access Token** = Ton ticket de concert (valide pour le soir)
- **Refresh Token** = Ton récépissé de commande (permet de récupérer un nouveau ticket)
- **Signature JWT** = Le hologramme sur le ticket (prouve qu'il est authentique)

### OAuth 2.0 (pour la culture)

OAuth permet de se connecter via un tiers (Google, GitHub, etc.) :
1. L'utilisateur clique "Se connecter avec Google"
2. Redirection vers Google → l'utilisateur se connecte chez Google
3. Google renvoie un code à notre app
4. Notre app échange le code contre un token → l'utilisateur est connecté

Supabase supporte OAuth nativement (Google, GitHub, Apple, etc.).

---

## 3.3 — Authorization (RBAC)

### RBAC (Role-Based Access Control)

Chaque utilisateur a un **rôle**, et chaque rôle a des **permissions** :

| Rôle | Permissions |
|------|------------|
| **Admin** | Tout lire, tout modifier, créer des utilisateurs |
| **Professionnel** | Lire/modifier ses patients, créer des évaluations |
| **Lecteur** | Lire uniquement, pas de modification |

### Implémentation avec Supabase RLS

```sql
-- Un professionnel ne voit que ses propres patients
CREATE POLICY "own_patients" ON patients
  FOR ALL
  USING (user_id = auth.uid());

-- Un admin voit tous les patients
CREATE POLICY "admin_all" ON patients
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

La beauté du RLS : la sécurité est **dans la DB**, pas dans l'API. Même si quelqu'un contourne l'API, la DB refuse l'accès.

---

## 3.4 — Edge Functions (Serverless)

### Le concept

Code serveur **sans serveur permanent**. La fonction est créée à la demande, s'exécute, et disparaît.

### Quand utiliser une Edge Function

| Cas d'usage | Pourquoi une Edge Function |
|-------------|---------------------------|
| Logique serveur sensible | La `service_role_key` ne doit jamais être côté client |
| Appel d'API externe | Cacher les clés API tierces |
| Calculs lourds | Ne pas surcharger le navigateur |
| Webhooks | Recevoir des notifications d'un service externe |
| Cron jobs | Tâches planifiées (rapports quotidiens) |

### Structure d'une Edge Function Supabase

```typescript
// supabase/functions/calculate-score/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req: Request) => {
  // Vérifier l'auth
  const authHeader = req.headers.get('Authorization');
  
  // Logique métier
  const { patientId } = await req.json();
  const score = calculateVulnerability(patientId);
  
  // Réponse
  return new Response(JSON.stringify({ score }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

### Cold Start

Le **cold start** est le temps de démarrage d'une fonction serverless quand elle n'a pas été appelée récemment. La première requête peut prendre 100-500ms de plus. Les requêtes suivantes sont rapides (la fonction est "chaude").

---

## 3.5 — Middleware & Hooks

### Middleware

Du code qui s'exécute **entre** la requête et la réponse :

```
Requête → [Auth Middleware] → [Logging Middleware] → [Handler] → Réponse
```

Exemples :
- Vérifier que le JWT est valide
- Logger chaque requête
- Ajouter des headers de sécurité (CORS)
- Rate limiting

### Database Triggers

Des fonctions SQL qui s'exécutent automatiquement quand une opération se produit sur une table :

```sql
-- Quand un score est inséré, mettre à jour la date de dernière évaluation
CREATE TRIGGER update_last_evaluation
AFTER INSERT ON scores
FOR EACH ROW
EXECUTE FUNCTION update_patient_last_eval();
```

**Analogie** : Un détecteur de mouvement. Quand quelqu'un passe (INSERT), la lumière s'allume (le trigger s'exécute).

---

## 3.6 — Rate Limiting & Protection

### Le problème

Sans protection, un attaquant peut :
- Envoyer 10 000 requêtes/seconde (DDoS)
- Tester tous les mots de passe (brute force)
- Saturer l'API (abuse)

### Rate Limiting

Limiter le nombre de requêtes par utilisateur par fenêtre de temps :

```
Limite : 100 requêtes / minute / utilisateur
Requête #101 → HTTP 429 "Too Many Requests"
```

Supabase a du rate limiting intégré. Pour du custom, on peut utiliser des Edge Functions.

---

## 3.7 — Webhooks & Intégrations

### Le concept

Un webhook, c'est l'inverse d'une API classique :
- **API** = TU demandes des données (pull)
- **Webhook** = Le service T'ENVOIE des données quand un événement se produit (push)

**Analogie** : API = tu regardes ta boîte aux lettres toutes les heures. Webhook = le facteur sonne à ta porte.

### Use case Monka
- **Supabase Auth Webhook** : notifier quand un nouvel utilisateur s'inscrit
- **Stripe Webhook** : notifier quand un paiement est effectué
- **IDEC Integration** : recevoir des mises à jour du système IDEC

---

> 💡 **Takeaway** : Le CTO vérifiera que tu comprends le flow complet d'une requête : navigateur → API → auth → DB → réponse. Supabase fait beaucoup, mais tu dois savoir CE QU'IL FAIT sous le capot.
