# Module 01 — ARCHITECTURE LOGICIELLE

> **Objectif** : Comprendre comment on structure une application à grande échelle.
> C'est le vocabulaire de base de toute discussion technique avec un CTO.

> **🔬 Clinical Engine** = App interne, ~50 users, valide le moteur clinique | **📱 MyMonka** = App publique, 100K+ aidants, données de santé réelles

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **Séparation des concerns** (§1.7) — Le principe FONDAMENTAL de toute architecture
> 2. **SOLID** (§1.4) — Les 5 principes que tout senior connaît par cœur
> 3. **Monolithique vs Microservices** (§1.1) — Savoir justifier pourquoi on est en monolithe
> 4. **Clean Architecture** (§1.2) — Le pattern d'architecture le plus respecté
>
> Maîtrise ces 4 là et tu peux tenir 80% d'une conversation architecture.

---

## 1.1 — Monolithique vs Microservices

### Le concept en une phrase
**Monolithe** : Toute l'app est un seul programme. **Microservices** : L'app est découpée en petits programmes indépendants qui communiquent entre eux.

### L'analogie
- **Monolithe** = Un restaurant avec une seule cuisine qui fait tout (entrées, plats, desserts). Simple, efficace quand c'est petit.
- **Microservices** = Un food court avec un stand par spécialité (sushi, pizza, crêpes). Chaque stand est indépendant, peut scaler séparément, mais la coordination est plus complexe.

### Les différences

| | Monolithe | Microservices |
|---|----------|---------------|
| **Déploiement** | Tout ou rien | Service par service |
| **Scaling** | Tout l'app scale ensemble | Chaque service scale indépendamment |
| **Complexité** | Code simple, infra simple | Code plus simple par service, mais infra très complexe |
| **Communication** | Appels de fonctions (rapide) | Requêtes réseau (plus lent, peut échouer) |
| **Équipe** | 1 équipe sur 1 codebase | 1 équipe par service |
| **Idéal pour** | Startups, <10 devs, MVP | Grandes entreprises, >50 devs, trafic massif |

### Où se situe Monka ?

Monka est un **monolithe modulaire** — et c'est le bon choix.

**Pourquoi monolithe** : On est une petite équipe, le projet est jeune, on itère vite. Les microservices ajouteraient une complexité d'infrastructure monumentale sans bénéfice.

**Pourquoi modulaire** : Même si c'est un monolithe, le code est organisé en modules clairs (Kernel, APP, Data). Le Kernel pourrait devenir un microservice demain si nécessaire — mais aujourd'hui c'est du over-engineering.

**Règle d'or** : *"Start with a monolith, extract microservices when you NEED to."* — Même Amazon et Netflix ont commencé en monolithe.

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Monolithe modulaire = parfait. Petite équipe, itération rapide, 50 users.
> - 📱 **MyMonka** : Démarre en monolithe modulaire aussi, mais avec l'anticipation que certains modules (notifications, analytics, génération de rapports) pourront être extraits en microservices si le trafic l'exige. Le CTO décidera quand.

### Ce que le CTO aime entendre
> *"On a un monolithe modulaire. La séparation Kernel/APP permet une extraction future si la charge l'impose, mais aujourd'hui ça serait du over-engineering."*

---

## 1.2 — Patterns d'architecture

### MVC (Model-View-Controller)

Le pattern le plus classique depuis 40 ans :

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│   VIEW   │ ←── │  CONTROLLER  │ ──→ │  MODEL   │
│  (UI)    │     │  (Logique)   │     │ (Données)│
└──────────┘     └──────────────┘     └──────────┘
```

- **Model** = Les données et la logique métier (le Kernel Monka)
- **View** = Ce que voit l'utilisateur (les composants React)
- **Controller** = Le chef d'orchestre qui connecte les deux (les pages/containers React)

**Variante MVVM** (Model-View-ViewModel) : Pareil, mais le Controller est remplacé par un ViewModel qui gère l'état de l'UI. C'est ce que React fait naturellement avec les hooks.

### Clean Architecture (Robert C. Martin / Uncle Bob)

L'architecture la plus respectée dans l'industrie. Le principe central : **les dépendances pointent vers l'intérieur**.

```
┌─────────────────────────────────────────────┐
│          FRAMEWORKS & DRIVERS               │  ← React, Supabase, Vercel
│  ┌─────────────────────────────────────┐    │
│  │       INTERFACE ADAPTERS            │    │  ← API routes, UI components
│  │  ┌─────────────────────────────┐    │    │
│  │  │      USE CASES              │    │    │  ← Logique applicative
│  │  │  ┌─────────────────────┐    │    │    │
│  │  │  │     ENTITIES        │    │    │    │  ← Logique métier pure
│  │  │  │  (Le Kernel Monka)  │    │    │    │
│  │  │  └─────────────────────┘    │    │    │
│  │  └─────────────────────────────┘    │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**La règle** : Le cercle intérieur ne connaît RIEN du cercle extérieur.
- Le Kernel (Entities) ne sait pas qu'il tourne dans React
- Les Use Cases ne savent pas que la DB est Supabase
- Si on change React pour Vue → le Kernel ne bouge pas
- Si on change Supabase pour Firebase → les Use Cases ne bougent pas

### Hexagonal Architecture (Ports & Adapters)

Même idée que Clean Architecture, mais avec un vocabulaire différent :
- **Port** = Interface que le cœur métier expose (ex : "je veux sauvegarder un patient")
- **Adapter** = Implémentation concrète du port (ex : "je sauvegarde dans Supabase")

**L'avantage** : Tu peux changer l'adapter sans toucher au port. Sauvegarder dans Supabase → sauvegarder dans Firebase → même port, adapter différent.

### Monka en Clean Architecture

| Couche | Monka | Rôle |
|--------|-------|------|
| **Entities** | `KERNEL/` | Logique clinique pure, scoring, micro-parcours. Zéro dépendance. |
| **Use Cases** | `APP/src/engine/` | Orchestration : charger un profil → calculer → afficher |
| **Interface Adapters** | `APP/src/pages/`, `APP/src/components/` | Composants React, pages, formulaires |
| **Frameworks** | React, Vite, Supabase | Les outils qui font tourner tout ça |

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Le Kernel embarqué dans le front (import direct). Simple et efficace.
> - 📱 **MyMonka** : Le Kernel pourrait vivre dans un **package npm privé** ou une **Edge Function** côté serveur pour protéger la logique métier. L'UI MyMonka l'appelle via API au lieu de l'importer directement.

---

## 1.3 — Domain-Driven Design (DDD)

### Le concept en une phrase
Organiser le code autour du **métier** (le domaine), pas autour de la technique.

### Le vocabulaire DDD

| Terme | Définition simple | Exemple Monka |
|-------|-------------------|---------------|
| **Domain** | Le métier, le sujet de l'app | La gériatrie, l'évaluation de vulnérabilité |
| **Entity** | Un objet avec une identité unique | Un patient (identifié par son ID) |
| **Value Object** | Un objet sans identité propre, défini par ses attributs | Un score de vulnérabilité (3.5/5) |
| **Aggregate** | Un groupe d'entités traitées comme une unité | Un dossier patient (patient + réponses + scores) |
| **Bounded Context** | Une frontière claire où un concept a une définition précise | Le contexte "Évaluation clinique" vs le contexte "Administration" |
| **Ubiquitous Language** | Tout le monde (devs, cliniciens, PMs) utilise les MÊMES mots | "Micro-parcours", "vulnérabilité", "IDEC" — pas des termes techniques |
| **Repository** | L'interface pour accéder aux données | `PatientRepository.getById(id)` |

### Pourquoi c'est important pour Monka

Monka est un projet **intensément métier**. La logique gériatrique EST le produit. Le DDD nous force à :
1. Utiliser le même vocabulaire que les cliniciens (pas de traduction dev ↔ métier)
2. Isoler la logique métier dans le Kernel (bounded context clair)
3. Modéliser les concepts cliniques directement dans le code

### Ce que le CTO aime entendre
> *"Le Kernel est notre bounded context métier. On utilise l'ubiquitous language des gériatres — micro-parcours, vulnérabilité, IDEC. Le code reflète le métier, pas l'inverse."*

---

## 1.4 — Les Principes SOLID

### Le concept
5 principes fondamentaux de la programmation orientée objet. Chaque senior les connaît. Si tu les connais, tu montres que tu comprends le code propre au-delà du vibecoding.

### S — Single Responsibility Principle
> *"Une classe/fonction ne doit avoir qu'UNE SEULE raison de changer."*

**❌ Mauvais** : Une fonction qui calcule le score ET l'affiche ET l'envoie par email.
**✅ Bon** : Trois fonctions séparées — `calculateScore()`, `displayScore()`, `sendScoreByEmail()`.

**Analogie** : Un couteau suisse fait tout mal. Un couteau de chef fait UNE chose parfaitement.

### O — Open/Closed Principle
> *"Ouvert à l'extension, fermé à la modification."*

Tu dois pouvoir ajouter un nouveau type de scoring (V6) sans modifier le code existant de V1-V5.

**Comment** : Utiliser des interfaces et de l'héritage. Chaque version de scoring implémente l'interface `ScoringStrategy`. Pour ajouter V6, tu crées une nouvelle classe — tu ne touches pas aux autres.

### L — Liskov Substitution Principle
> *"Un objet enfant doit pouvoir remplacer son parent sans casser le programme."*

Si `ScoreV3` hérite de `Score`, alors partout où on utilise `Score`, on doit pouvoir mettre `ScoreV3` sans que ça plante.

### I — Interface Segregation Principle
> *"Mieux vaut plusieurs petites interfaces qu'une grosse."*

**❌** : `interface Clinician { evaluate(); prescribe(); schedule(); bill(); }` — Un clinicien qui évalue n'a pas besoin de facturer.
**✅** : `interface Evaluator { evaluate(); }` + `interface Biller { bill(); }` — Chacun ne voit que ce qui le concerne.

### D — Dependency Inversion Principle
> *"Dépends d'abstractions, pas d'implémentations concrètes."*

**❌** : `const db = new SupabaseClient()` — Le code dépend directement de Supabase.
**✅** : `const db: DatabaseClient = createClient()` — Le code dépend d'une interface. L'implémentation concrète peut être Supabase, Firebase, ou un mock pour les tests.

**Analogie** : Tu branches ton téléphone sur une prise USB-C, pas sur un câble soudé au mur. L'USB-C est l'interface — le chargeur concret peut changer.

### Résumé SOLID en 1 phrase chacun

| Lettre | Principe | En 1 phrase |
|--------|----------|-------------|
| **S** | Single Responsibility | Chaque chose fait UNE chose |
| **O** | Open/Closed | Étends sans modifier |
| **L** | Liskov Substitution | Un enfant remplace son parent |
| **I** | Interface Segregation | Petites interfaces > grosse interface |
| **D** | Dependency Inversion | Dépends de contrats, pas d'implémentations |

---

## 1.5 — Design Patterns Essentiels

### Le concept
Un **design pattern** est une solution éprouvée à un problème récurrent de conception. Ce sont des **noms partagés** pour des solutions, pas du code magique.

### Les 6 patterns à connaître

#### 1. Factory Pattern
**Problème** : Tu dois créer différents types d'objets sans que le code appelant sache lequel.
**Solution** : Une "usine" qui décide quel objet créer.

```typescript
// Le code appelant ne sait pas quel parcours spécifique est créé
const parcours = MicroParcoursFactory.create(profilPatient);
// profilPatient fragile → ParcoursSuiviRenforce
// profilPatient standard → ParcoursPreventionClub
```

#### 2. Strategy Pattern
**Problème** : Tu as plusieurs algorithmes interchangeables pour la même tâche.
**Solution** : Chaque algorithme est une "stratégie" séparée.

```typescript
// Le scoring change selon le module, mais l'interface est la même
interface ScoringStrategy {
  calculate(answers: Answer[]): Score;
}

class V1SocialScoring implements ScoringStrategy { ... }
class V3CaregiverScoring implements ScoringStrategy { ... }
```

#### 3. Observer Pattern
**Problème** : Quand un objet change, d'autres doivent être notifiés.
**Solution** : Les objets "observent" les changements et réagissent.

React fait ça nativement : quand le state change → les composants qui en dépendent se re-render.

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Strategy pour le scoring V1-V5 + Observer natif React.
> - 📱 **MyMonka** : Mêmes patterns + potentiellement un **Event Bus** pour les notifications asynchrones ("un aidant a complété une évaluation" → envoyer un email, mettre à jour le dashboard pro, logger l'activité).

#### 4. Singleton Pattern
**Problème** : Tu veux qu'il n'y ait qu'UNE SEULE instance d'un objet dans toute l'app.
**Solution** : La classe garantit qu'elle ne peut être instanciée qu'une fois.

Exemple : la connexion à la base de données. Tu ne veux pas ouvrir 100 connexions — juste une, partagée.

⚠️ **Attention** : Souvent considéré comme un anti-pattern car il crée des dépendances cachées. Utiliser avec précaution.

#### 5. Adapter Pattern
**Problème** : Tu as deux interfaces incompatibles qui doivent travailler ensemble.
**Solution** : Un "adaptateur" qui traduit l'une vers l'autre.

```typescript
// L'API externe renvoie { firstName, lastName }
// Notre app attend { nomComplet }
class PatientAdapter {
  adapt(externalData): InternalPatient {
    return { nomComplet: `${externalData.firstName} ${externalData.lastName}` };
  }
}
```

**Analogie** : Un adaptateur prise US → prise française. Même courant, connecteurs différents.

#### 6. Decorator Pattern
**Problème** : Tu veux ajouter des fonctionnalités à un objet sans modifier sa classe.
**Solution** : Tu "enveloppes" l'objet avec des couches additionnelles.

Exemple : ajouter du logging autour d'un service existant sans modifier le service.

---

## 1.6 — Event-Driven Architecture

### Le concept en une phrase
Au lieu que les composants s'appellent directement, ils **émettent des événements** et d'autres composants **réagissent** à ces événements.

### L'analogie
- **Sans événements** : Tu appelles directement chaque ami pour lui dire que tu as déménagé.
- **Avec événements** : Tu postes sur les réseaux sociaux (un événement). Ceux qui sont abonnés (observers) voient la nouvelle et réagissent.

### Concepts clés

| Terme | Définition | Exemple Monka |
|-------|-----------|---------------|
| **Event** | Quelque chose qui s'est passé | "Score V3 calculé" |
| **Publisher** | Celui qui émet l'événement | Le module de scoring |
| **Subscriber** | Celui qui réagit à l'événement | L'UI de résultats, le module de recommandations |
| **Event Bus** | Le canal de communication | React Context, ou un système pub/sub |

### CQRS (Command Query Responsibility Segregation)

Séparer les **lectures** (queries) et les **écritures** (commands) dans des modèles différents.

- **Command** : "Enregistre la réponse du patient" → Modifie la DB
- **Query** : "Affiche le score de vulnérabilité" → Lit la DB

**Pourquoi** : Les lectures et les écritures ont des besoins différents (cache, optimisation, sécurité). Les séparer permet d'optimiser chacune indépendamment.

### Pertinence pour Monka
Le Kernel fonctionne déjà de manière événementielle : une réponse → déclenche un recalcul de score → déclenche une mise à jour des recommandations. C'est la chaîne clinique (`ClinicalChain`).

---

## 1.7 — Séparation des Concerns

### Le concept
Le principe le plus fondamental de l'architecture logicielle. Chaque partie du code a **une responsabilité claire** et ne déborde pas sur les autres.

### Les couches typiques

```
┌─────────────────────────────┐
│  PRESENTATION (UI)          │  ← Ce que l'utilisateur voit
├─────────────────────────────┤
│  BUSINESS LOGIC (Métier)    │  ← Les règles du domaine
├─────────────────────────────┤
│  DATA ACCESS (Données)      │  ← Communication avec la DB
├─────────────────────────────┤
│  INFRASTRUCTURE             │  ← Auth, logging, config
└─────────────────────────────┘
```

**La règle** : Chaque couche ne communique qu'avec la couche directement adjacente. L'UI ne parle JAMAIS à la DB directement.

### Coupling vs Cohesion

Deux concepts critiques :

| | Définition | Idéal |
|---|-----------|-------|
| **Coupling** (couplage) | À quel point deux modules dépendent l'un de l'autre | **Faible** — changer un module ne casse pas les autres |
| **Cohesion** (cohésion) | À quel point les éléments d'un module sont liés entre eux | **Forte** — tout dans un module sert le même objectif |

**❌ Fort couplage** : Le composant React `<ScoreDisplay>` accède directement à la DB Supabase.
**✅ Faible couplage** : `<ScoreDisplay>` reçoit les données via des props. Il ne sait pas d'où elles viennent.

**❌ Faible cohésion** : Un fichier `utils.ts` qui contient du formatage de dates, du calcul de score, et de la validation d'email.
**✅ Forte cohésion** : `scoring.ts` ne contient QUE la logique de scoring.

### Monka : Séparation actuelle

```
KERNEL/          ← Logique métier PURE (pas de React, pas de Supabase)
APP/src/engine/  ← Pont entre le Kernel et l'app
APP/src/pages/   ← Présentation (React)
APP/src/components/ ← Composants UI réutilisables
Supabase         ← Données (PostgreSQL)
```

C'est une bonne séparation. Le Kernel pourrait tourner dans un environnement Node.js pur, dans une app mobile, ou dans un microservice — il n'a aucune dépendance sur React ou Supabase.

### Ce que le CTO aime entendre
> *"Le Kernel est framework-agnostic. Il ne connaît ni React ni Supabase. Si demain on passe sur Flutter ou Vue, le Kernel reste identique. C'est la couche APP qui fait le pont."*

---

> 💡 **Takeaway général** : L'architecture, c'est des choix de STRUCTURE. Le bon choix, c'est celui qui est adapté à ta taille d'équipe et à ta phase de produit. Un monolithe modulaire avec une clean architecture, c'est le sweet spot pour Monka. Le CTO le sait — et si tu le dis toi-même, il verra que tu comprends.
