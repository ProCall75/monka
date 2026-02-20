# PRAGMA Starter Kit

> Prêt à build en qualité prod. Zéro configuration mentale.

**Version :** 1.0
**Basé sur :** [PRAGMA Senior Dev Framework v2.1](framework/senior-dev-framework.md)

---

## 🎯 C'est quoi ?

Un dossier portable qu'on copie dans chaque nouveau repo client. Après copie, le repo a immédiatement :

- ✅ Les **rules IA** pour que l'agent code comme un senior
- ✅ Le **framework de référence** (28 sections)
- ✅ Les **workflows par phase** (avant / pendant / après le dev)
- ✅ Le **Quality Agent** (vérification conformité automatisée)
- ✅ Les **templates docs** (architecture, PRD, API, ADR...)
- ✅ Les **standards design** (couleurs, typo, composants, a11y)
- ✅ Les **templates légaux** (privacy, CGU, mentions légales)

**Le goal :** `client-context/ + pragma-starter-kit/ → prêt à build en qualité prod.`

---

## 🚀 Comment utiliser

### 1. Créer le repo client

```bash
mkdir mon-projet-client && cd mon-projet-client
git init
```

### 2. Copier le kit

```bash
# Copier tout le contenu du starter kit dans le repo
cp -r /path/to/METHODE/pragma-starter-kit/* .
cp -r /path/to/METHODE/pragma-starter-kit/.agent .
```

### 3. Personnaliser

| Fichier | Action |
|---------|--------|
| `templates/README.md` | Renommer en `README.md` à la racine, remplir le nom du projet |
| `templates/CONTRIBUTING.md` | Copier à la racine, adapter |
| `templates/.env.example` | Copier à la racine, ajouter les clés du projet |
| `templates/.gitignore` | Copier à la racine |
| `templates/CHANGELOG.md` | Copier à la racine |
| `docs/architecture.md` | Remplir avec le stack choisi |
| `docs/prd.md` | Remplir avec les specs du projet |
| `docs/glossary.md` | Remplir avec les termes métier du client |
| `legal/*` | Adapter avec les infos du client |

### 4. Setup du projet

```bash
# Init le projet Next.js (si template A)
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false

# Install les deps
npm install

# Copier les env vars
cp .env.example .env.local
# → Remplir les clés Supabase
```

### 5. Commencer à coder

L'IA lira automatiquement :
- `.agent/rules/dev.md` → Les règles IA
- `framework/senior-dev-framework.md` → Le framework complet
- `docs/architecture.md` → L'architecture du projet

---

## 📁 Structure

```
pragma-starter-kit/
│
├── README.md                          ← Ce fichier
│
├── .agent/                            # Config IA
│   ├── rules/
│   │   └── dev.md                     # Rules IA senior dev
│   └── workflows/
│       ├── before-coding.md           # Phase 1 : Avant de coder
│       ├── during-coding.md           # Phase 2 : Pendant le dev
│       ├── before-deploy.md           # Phase 3 : Avant de deploy
│       ├── post-deploy.md             # Phase 4 : Après le go-live
│       └── quality-agent.md           # Agent vérification conformité
│
├── docs/                              # Templates docs
│   ├── architecture.md                # Template architecture
│   ├── prd.md                         # Template Product Requirements
│   ├── api.md                         # Template doc API
│   ├── troubleshooting.md             # Fichier vivant (vide au départ)
│   ├── glossary.md                    # Glossaire métier
│   ├── certifications/                # Rapports de certification qualité
│   │   ├── README.md                  # Index des certifications
│   │   └── certification-template.md  # Template rapport
│   └── adr/                           # Architecture Decision Records
│       └── 000-template.md            # Template ADR
│
├── templates/                         # Fichiers racine du repo
│   ├── README.md                      # README projet
│   ├── CONTRIBUTING.md                # Guide contribution
│   ├── CHANGELOG.md                   # Changelog
│   ├── .env.example                   # Variables d'env
│   ├── .gitignore                     # Gitignore standard
│   └── post-mortem.md                 # Template post-mortem
│
├── design/                            # Standards design
│   └── design-standards.md            # Couleurs, typo, composants, a11y
│
├── legal/                             # Templates légaux
│   ├── privacy-policy.md              # Politique de confidentialité
│   ├── cgu.md                         # CGU
│   └── mentions-legales.md            # Mentions légales
│
└── framework/                         # Référence
    └── senior-dev-framework.md        # Framework v2.1 (source de vérité)
```

---

## 🔄 Workflows disponibles

| Workflow | Quand | Commande |
|----------|-------|----------|
| `before-coding` | Avant d'écrire la 1ère ligne | `/before-coding` |
| `during-coding` | Pendant le dev | `/during-coding` |
| `before-deploy` | Avant chaque deploy | `/before-deploy` |
| `post-deploy` | Après le go-live | `/post-deploy` |
| `quality-agent` | À chaque checkpoint critique | `/quality-agent checkpoint=after-prd` |

---

## ✅ Checklist de personnalisation

```
[ ] Templates racine copiés et renommés
[ ] .env.example rempli avec les clés du projet
[ ] docs/architecture.md rempli
[ ] docs/prd.md rempli
[ ] docs/glossary.md rempli
[ ] legal/* adapté avec infos client
[ ] Premier commit initial
[ ] Quality Agent lancé : /quality-agent checkpoint=after-prd
```

---

*Built with the [PRAGMA Senior Dev Framework v2.1](framework/senior-dev-framework.md)*
