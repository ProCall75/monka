# Module 05 — DEVOPS & INFRASTRUCTURE

> **Objectif** : Comprendre tout le pipeline du code au serveur de prod.

> **🔬 Clinical Engine** = Deploy simple Vercel, CI basique | **📱 MyMonka** = Pipeline CI/CD complet, Docker, multi-environnements, monitoring 24/7

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **CI/CD** (§5.1) — Le pipeline automatisé build → test → deploy
> 2. **Environnements** (§5.3) — Dev / Staging / Prod et pourquoi les séparer
> 3. **Monitoring** (§5.5) — Savoir quand l'app plante avant l'utilisateur

---

## 5.1 — CI/CD (Continuous Integration / Continuous Deployment)

### Le pipeline

```
        git push
            │
    ┌───────▼────────┐
    │   CI Pipeline   │
    │  ┌────────────┐ │
    │  │   Build    │ │ ← Le code compile ?
    │  ├────────────┤ │
    │  │   Lint     │ │ ← Le code est propre ?
    │  ├────────────┤ │
    │  │   Test     │ │ ← Les tests passent ?
    │  ├────────────┤ │
    │  │  Security  │ │ ← Pas de vulnérabilité connue ?
    │  └────────────┘ │
    └───────┬────────┘
            │ Si tout ✅
    ┌───────▼────────┐
    │  CD: Deploy    │ → En prod automatiquement
    └────────────────┘
```

### GitHub Actions (exemple)

```yaml
# .github/workflows/ci.yml
name: CI
on: push
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run build      # Build
      - run: npm run lint        # Linting
      - run: npm run test        # Tests
```

### Quality Gates

Des **portes de qualité** que le code doit franchir avant d'être mergé :
- Build réussi ✅
- Tous les tests passent ✅
- Coverage minimum (ex: 80%) ✅
- Pas de vulnérabilités critiques ✅
- Code review approuvée ✅

---

## 5.2 — Containerisation (Docker)

### En 1 minute

**Problème** : "Ça marche sur ma machine" → Pas sur le serveur. Versions de Node différentes, dépendances manquantes, configs variables.

**Solution** : Docker empaquette l'app + toutes ses dépendances dans un **container** identique partout.

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Docker pas nécessaire. Vercel + Supabase = zéro gestion d'infra.
> - 📱 **MyMonka** : Docker quasi-obligatoire — standardiser le dev local (docker-compose), déployer sur un hébergeur HDS (pas Vercel), et garantir l'identique entre dev et prod.

```
┌─────────────────────────────┐
│        Container            │
│  ┌───────────────────────┐  │
│  │  App Monka + Node 20  │  │
│  │  + npm packages       │  │
│  │  + configs            │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Vocabulaire Docker

| Terme | Définition |
|-------|-----------|
| **Image** | Le "blueprint" — recette pour créer un container |
| **Container** | L'instance qui tourne — créée à partir de l'image |
| **Dockerfile** | Le fichier qui décrit comment construire l'image |
| **docker-compose** | Orchestrer plusieurs containers ensemble (app + DB + cache) |
| **Registry** | Entrepôt d'images (Docker Hub, GitHub Container Registry) |

### Monka et Docker

On n'utilise pas Docker actuellement (Vercel et Supabase gèrent l'infra). Le CTO pourrait vouloir l'introduire pour :
- Standardiser l'environnement de développement local
- Préparer un déploiement sur un provider HDS qui requiert Docker

---

## 5.3 — Environnements

### Les 3 environnements minimum

| Env | Rôle | Base de données | Qui y accède |
|-----|------|----------------|-------------|
| **Development** | Dev local | DB locale ou Supabase dev | Les développeurs |
| **Staging** | Pré-production, validation | Clone de la prod | QA, product owner |
| **Production** | Utilisateurs réels | DB de production | Tout le monde |

### La règle d'or

**Le code de dev ne touche JAMAIS la DB de production.** Les environnements sont isolés par des variables d'environnement différentes.

### Feature Flags

Déployer du code en prod mais le **désactiver** pour les utilisateurs :

```typescript
if (featureFlags.get('new_scoring_v4')) {
  // Code nouveau (désactivé par défaut)
} else {
  // Code actuel (stable)
}
```

On active progressivement pour 5% → 25% → 100% des utilisateurs. Si ça bugue → on désactive sans redéployer.

---

## 5.4 — Cloud Providers

### Comparatif simplifié

| Provider | Forces | Monka |
|----------|--------|-------|
| **Vercel** | Deploy front ultra-simple, CDN mondial | ✅ Utilisé pour le front |
| **Supabase** | PostgreSQL + Auth + API, open source | ✅ Utilisé pour le backend |
| **AWS** | Le plus complet, le plus complexe | ❌ Over-engineering pour nous |
| **GCP** | IA/ML, BigQuery | ❌ Pas notre besoin actuel |
| **OVH** | Français, pas cher, HDS possible | 🟡 À considérer pour la compliance HDS |

---

## 5.5 — Monitoring & Observabilité

### Les 3 piliers

| Pilier | Ce que c'est | Outil |
|--------|-------------|-------|
| **Logs** | Journal de tout ce qui se passe | Supabase logs, Sentry |
| **Metrics** | Chiffres clés (latence, erreurs, CPU) | Vercel Analytics |
| **Traces** | Suivi d'une requête de bout en bout | Datadog, OpenTelemetry |

### Alerting

Configurer des alertes automatiques :
- 🔴 Erreurs 500 > 10/min → Alerte immédiate
- 🟡 Latence P99 > 2s → Alerte warning
- 🔴 DB connections > 80% → Alerte capacité

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Vercel Analytics + Supabase dashboard = suffisant pour 50 users.
> - 📱 **MyMonka** : Stack complète obligatoire — Sentry (erreurs), Datadog ou Grafana (métriques), alerting PagerDuty (astreinte), SLA de 99.9% (max 8.7h de downtime/an).

---

## 5.6 — Infrastructure as Code (IaC)

### Le concept

Au lieu de configurer les serveurs manuellement (cliquer dans un dashboard), on décrit l'infrastructure dans du **code** :

```hcl
# Terraform — exemple
resource "supabase_project" "monka" {
  name   = "monka-prod"
  region = "eu-west-1"
}
```

**Avantage** : L'infrastructure est versionnée (Git), reproductible, et documentée. Si le serveur tombe, on recrée l'identique en 5 minutes.

---

## 5.7 — DNS & le chemin d'une requête

### De la barre d'adresse au serveur

```
1. L'utilisateur tape "app.monka.fr"
2. DNS résout → 76.76.21.21 (IP Vercel)
3. TLS handshake → connexion HTTPS chiffrée
4. CDN Vercel → sert les fichiers React statiques
5. L'app React appelle l'API Supabase
6. Supabase vérifie le JWT
7. PostgreSQL exécute la requête (avec RLS)
8. Réponse remonte : DB → Supabase → React → utilisateur
```

### SSL/TLS

- **SSL/TLS** = Le chiffrement des communications (le cadenas 🔒)
- **Certificat SSL** = Preuve que le site est authentique
- Vercel et Supabase gèrent les certificats automatiquement

### CDN (Content Delivery Network)

Vercel distribue les fichiers sur des serveurs partout dans le monde. Un utilisateur à Paris télécharge depuis un serveur à Paris, pas depuis San Francisco.

---

> 💡 **Takeaway** : Le DevOps, c'est l'autoroute entre le code et l'utilisateur. Le CTO voudra savoir que tu comprends le chemin complet d'une requête et que tu as un plan pour le monitoring en prod.
