# Module 06 — SÉCURITÉ

> **Objectif** : Parler sécurité comme un expert, surtout dans un contexte santé.
> **CRITIQUE** : Monka traite des données gériatriques. La sécurité n'est pas optionnelle.

> **🔬 Clinical Engine** = Données de test internes, sécurité standard | **📱 MyMonka** = Données de santé réelles, HDS obligatoire, MFA, audit formel, DPO

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **OWASP Top 10** (§6.1) — Les 10 vulnérabilités web majeures
> 2. **RGPD & HDS** (§6.3) — Conformité obligatoire pour les données de santé
> 3. **RLS** (§6.4 + Module 04) — Le bouclier principal de Monka

---

## 6.1 — OWASP Top 10

Les 10 vulnérabilités web les plus exploitées (mise à jour 2021, toujours d'actualité) :

| # | Vulnérabilité | Explication simple | Monka |
|---|--------------|-------------------|-------|
| **A01** | Broken Access Control | Un utilisateur accède à des données qui ne sont pas les siennes | ✅ RLS protège |
| **A02** | Cryptographic Failures | Données sensibles non chiffrées | ✅ HTTPS + Supabase chiffre at-rest |
| **A03** | Injection | Du code malveillant est injecté (SQL, XSS) | ✅ PostgREST = prepared statements |
| **A04** | Insecure Design | L'architecture elle-même est vulnérable | ⚠️ À auditer formellement |
| **A05** | Security Misconfiguration | Config par défaut non sécurisée | ⚠️ Headers à durcir |
| **A06** | Vulnerable Components | Librairies avec des failles connues | ⚠️ `npm audit` régulier |
| **A07** | Auth Failures | Login faible, sessions mal gérées | ✅ Supabase Auth |
| **A08** | Data Integrity Failures | Données modifiées sans vérification | ⚠️ Signatures à implémenter |
| **A09** | Logging Failures | Pas de logs = pas de détection d'attaque | ❌ À implémenter |
| **A10** | SSRF | Le serveur est trompé pour faire des requêtes internes | ✅ Faible risque (pas de serveur custom) |

### Les 3 plus critiques pour Monka

**Injection (A03)** : Quand un attaquant injecte du SQL ou du JavaScript malveillant.
```
❌ "SELECT * FROM patients WHERE id = '" + userInput + "'"
   → userInput = "'; DROP TABLE patients; --"  💀

✅ Prepared statement : SELECT * FROM patients WHERE id = $1
   → $1 est traité comme une valeur, jamais comme du code
```
Supabase utilise des prepared statements nativement → on est protégé.

**XSS (Cross-Site Scripting)** : Quand un attaquant injecte du JavaScript dans une page.
```
❌ <div>{userInput}</div>  → userInput = "<script>alert('hacké')</script>"
✅ React échappe automatiquement le HTML dans le JSX → protégé nativement
```

**Broken Access Control (A01)** : Le plus critique pour Monka. Un professionnel ne doit JAMAIS voir les patients d'un autre.
→ **RLS** est notre protection principale.

---

## 6.2 — Authentification sécurisée

### Bonnes pratiques

| Pratique | Pourquoi | Monka |
|----------|---------|-------|
| **MFA** (Multi-Factor Auth) | Un mot de passe seul est insuffisant | À activer pour la prod |
| **Password hashing** (bcrypt/argon2) | Jamais stocker les mots de passe en clair | ✅ Supabase le fait |
| **Rate limiting sur le login** | Empêcher le brute force | ✅ Supabase intégré |
| **Session expiration** | Limiter la durée de validité | ✅ JWT expire en 1h |
| **Refresh token rotation** | Chaque refresh invalidé après usage | ✅ Supabase le fait |

### MFA (Multi-Factor Authentication)

Deux facteurs pour se connecter :
1. **Ce que tu sais** → Mot de passe
2. **Ce que tu as** → Code SMS, app TOTP (Google Authenticator)
3. **Ce que tu es** → Empreinte, Face ID

Pour des données de santé, le MFA devrait être **obligatoire** en production.

---

## 6.3 — RGPD & Données de santé (HDS)

### RGPD en résumé

Le Règlement Général sur la Protection des Données (RGPD) s'applique à TOUTE application traitant des données personnelles en UE.

| Principe | Ce que ça veut dire | Monka |
|----------|-------------------|-------|
| **Consentement** | L'utilisateur doit accepter explicitement | Formulaire de consentement |
| **Minimisation** | Ne collecter que le nécessaire | On ne stocke que les données cliniques utiles |
| **Droit d'accès** | L'utilisateur peut demander ses données | Export possible |
| **Droit à l'effacement** | L'utilisateur peut demander la suppression | Endpoint de suppression |
| **Portabilité** | L'utilisateur peut exporter ses données | Format standard (JSON/CSV) |
| **Notification de breach** | CNIL informée en 72h si fuite de données | Incident management plan |

### HDS (Hébergement de Données de Santé)

**Obligatoire** pour tout hébergement de données de santé en France. La loi impose :
- L'hébergeur est certifié HDS (ISO 27001 + exigences spécifiques santé)
- Les données restent en France/UE
- Traçabilité des accès
- Chiffrement at-rest et in-transit

**Supabase N'EST PAS HDS**. Pour la production :
- Migrer vers un PostgreSQL hébergé chez un provider HDS (OVH Health, Clever Cloud, Scalingo)
- OU utiliser une surcouche compatible HDS
- Le code ne change pas (c'est toujours PostgreSQL)

**Ce que le CTO aime entendre** : *"La sécurité est dans la DB, pas dans l'app. Le RLS PostgreSQL garantit l'isolation des données même si l'API est compromise."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Sécurité standard. RLS, HTTPS, Auth Supabase. Pas de données de patients réels donc pas d'obligation HDS.
> - 📱 **MyMonka** : Sécurité maximale. HDS obligatoire, MFA pour tous les users, audit OWASP formel, pen test avant la mise en prod, DPO nommé, privacy by design, chiffrement E2E pour les données les plus sensibles.

---

## 6.4 — Chiffrement

### Les 3 niveaux

| Niveau | Quoi | Comment |
|--------|------|---------|
| **In-transit** | Données qui circulent | HTTPS (TLS 1.3) |
| **At-rest** | Données stockées | Chiffrement disque (Supabase intégré) |
| **E2E** | Bout en bout, même le serveur ne peut pas lire | Application-level encryption |

### HTTPS : non négociable

TOUT le trafic doit être en HTTPS. HTTP en clair = quelqu'un sur le même WiFi peut lire les données. Vercel et Supabase forcent le HTTPS automatiquement.

---

## 6.5 — Input Validation

### La règle d'or

> **Ne JAMAIS faire confiance aux données qui viennent du client.**

Tout ce qui arrive du navigateur peut être manipulé : formulaires, headers, cookies, URL params.

### Double validation

```
Client (React)  → Validation UX (feedback rapide) → Pas de sécurité
Serveur (DB/API) → Validation sécurité (bloque les attaques) → CRITIQUE
```

Valider côté client = confort utilisateur.
Valider côté serveur = sécurité. Les deux sont nécessaires.

---

## 6.6 — Security Headers

Headers HTTP qui renforcent la sécurité du navigateur :

| Header | Rôle | Valeur recommandée |
|--------|------|-------------------|
| **Content-Security-Policy** | Contrôle d'où les ressources peuvent être chargées | Strict selon les besoins |
| **X-Frame-Options** | Empêche l'affichage dans une iframe | `DENY` |
| **X-Content-Type-Options** | Empêche le MIME sniffing | `nosniff` |
| **Strict-Transport-Security** | Force HTTPS | `max-age=31536000` |
| **Referrer-Policy** | Contrôle les infos envoyées dans le Referer | `strict-origin` |

---

## 6.7 — Audit & Compliance

### Le processus de sécurisation

```
1. Self-audit       → npm audit, analyse du code, checklist OWASP
2. Pen test         → Un expert tente de hacker l'app
3. Certification    → HDS, RGPD validation
4. Monitoring       → Surveillance continue des vulnérabilités
5. Incident plan    → Procédure en cas de faille
```

### Pour la prod Monka

1. ✅ RLS activé (auto-audit via Supabase advisors)
2. ⏳ Pen test à planifier avec un prestataire
3. ⏳ Migration HDS à planifier
4. ⏳ Monitoring sécurité à mettre en place (Sentry, audit logs)
5. ⏳ Incident response plan à rédiger

---

> 💡 **Takeaway** : En données de santé, la sécurité est le sujet #1 du CTO. Montre que tu connais les obligations (HDS, RGPD), que tu as les bases (RLS, HTTPS, pas de secrets dans le code), et que tu as un plan pour le reste.
