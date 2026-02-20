# Architecture — [Nom du Projet]

> **Template à remplir AVANT de coder.**

Référence : Framework §1 (Templates), §2 (Structure), §6 (Sécurité)

---

## Template Choisi

**Template :** [Monolith Moderne / Microservices / Serverless / JAMstack / DDD]

**Justification :**

[Pourquoi ce template ? Taille projetée, complexité, équipe, contraintes...]

---

## Stack Technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| **Frontend** | Next.js | 15.x |
| **Backend** | Next.js API Routes | 15.x |
| **Database** | Supabase PostgreSQL | — |
| **Auth** | Supabase Auth | — |
| **Deploy** | Vercel | — |
| **Monitoring** | Sentry + Vercel Analytics | — |

---

## Schéma Base de Donn\u00e9es

### Tables

```sql
-- Profiles (users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('user', 'admin')) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- [Table 2]
CREATE TABLE [nom] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columns...
  created_at TIMESTAMPTZ DEFAULT now()
);

-- [Autres tables...]
```

###  RLS Policies

```sql
-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own_profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

-- [Table 2]
ALTER TABLE [nom] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "[nom]_policy" ON [nom]
FOR ALL USING ([condition]);
```

---

## Structure de Fichiers

```
[projet]/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [features]/
│   ├── api/
│   │   └── [routes]/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── [domain]/
│   └── layout/
├── lib/
│   ├── supabase/
│   ├── utils/
│   └── types/
├── supabase/
│   └── migrations/
├── docs/
├── .env.example
└── package.json
```

---

## Diagramme (optionnel)

```
[Ajouter un diagramme ASCII ou lien vers un diagram externe]

User → Next.js App → Supabase (Auth + DB) → Vercel Edge
```

---

## Routes API Principales

| Method | Route | Auth | Description |
|--------|-------|:----:|-------------|
| POST | /api/auth/login | ❌ | Login user |
| GET | /api/[resource] | ✅ | List resources |
| POST | /api/[resource] | ✅ | Create resource |
| GET | /api/[resource]/[id] | ✅ | Get resource |
| PUT | /api/[resource]/[id] | ✅ | Update resource |
| DELETE | /api/[resource]/[id] | ✅ | Delete resource |

---

## Flows Critiques

### Flow 1 : [Nom du flow]

1. User [action]
2. Frontend [react]
3. API [endpoint]
4. DB [query]
5. Response [format]

### Flow 2 : [Autre flow]

...

---

## Décisions Architecturales

Voir `docs/adr/` pour les ADRs (Architecture Decision Records).

- [ADR-001](adr/001-choix-supabase.md) — Pourquoi Supabase vs Firebase
- [ADR-002](adr/002-structure-auth.md) — Pattern d'authentification
- ...

---

*Dernière mise à jour : [Date]*
