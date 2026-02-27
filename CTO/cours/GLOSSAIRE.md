# 📚 GLOSSAIRE TECHNIQUE CTO

> **Objectif** : Dictionnaire rapide de tous les termes techniques qu'un CTO peut utiliser.
> **Comment l'utiliser** : Ctrl+F pour chercher un terme. Chaque entrée = définition + analogie + contexte Monka.

---

## 🎯 PARETO 80/20

> **Les 25 termes qui couvrent 80% des conversations tech :**
>
> API, Auth/JWT, Backend, Build, Cache, CI/CD, Component, Container/Docker,
> Database/Schema, Deploy, Endpoint, Environment, Frontend, Git/Branch/PR,
> Migration, Monolithe, ORM, PostgreSQL, Production, Refactoring,
> REST, RLS, Serverless, State, TypeScript
>
> Si tu connais ces 25 termes, tu survivras à 80% des conversations.

---

## A

### Abstraction
**Définition** : Cacher la complexité derrière une interface simple.
**Analogie** : Tu conduis une voiture sans savoir comment fonctionne le moteur. Le volant et les pédales sont l'abstraction.
**Monka** : Le Kernel abstrait la logique clinique — l'UI n'a pas besoin de connaître les formules de scoring.

### Agile
**Définition** : Méthodologie de développement itérative. On livre par petits morceaux plutôt qu'en un seul bloc.
**Analogie** : Au lieu de rénover toute la maison d'un coup (Waterfall), tu rénoves pièce par pièce et tu ajustes en cours de route.

### API (Application Programming Interface)
**Définition** : Un contrat entre deux programmes qui définit comment ils communiquent.
**Analogie** : Le menu d'un restaurant. Tu choisis un plat (requête), le serveur t'apporte le résultat (réponse). Tu n'as pas besoin de savoir ce qui se passe en cuisine.
**Monka** : L'API Supabase (PostgREST) expose les données du Kernel au frontend React.

### Async / Await
**Définition** : Mécanisme JavaScript pour gérer les opérations qui prennent du temps (réseau, DB) sans bloquer le reste de l'app.
**Analogie** : Tu commandes un café (async), tu fais autre chose en attendant, et tu le récupères quand il est prêt (await).

---

## B

### Backend
**Définition** : La partie invisible de l'app — serveur, base de données, logique métier côté serveur.
**Analogie** : La cuisine du restaurant. Le client ne la voit pas, mais c'est là que tout se prépare.
**Monka** : Supabase (PostgreSQL + Auth + Edge Functions).

### Boilerplate
**Définition** : Code répétitif nécessaire mais pas spécifique au projet (configuration, setup, imports).
**Analogie** : Les formalités administratives avant de commencer le vrai travail.

### Branch (Git)
**Définition** : Une copie parallèle du code où tu développes sans impacter le code principal.
**Analogie** : Un brouillon de document. Tu modifies le brouillon, et quand c'est prêt, tu remplaces le document final.

### Build
**Définition** : Le processus de transformation du code source en application exécutable.
**Analogie** : La compilation d'un livre : du manuscrit (code) au livre imprimé (app).
**Monka** : Vite transforme le TypeScript + React en HTML/CSS/JS optimisé.

### Bundle
**Définition** : Le fichier final regroupant tout le code de l'app (résultat du build).
**Analogie** : Un colis Amazon contenant tous tes achats dans un seul paquet.

---

## C

### Cache
**Définition** : Stockage temporaire de données fréquemment utilisées pour accélérer les accès futurs.
**Analogie** : Les post-it sur ton bureau. Au lieu de chercher un numéro dans le répertoire, tu as un post-it avec les numéros que tu appelles souvent.

### CDN (Content Delivery Network)
**Définition** : Réseau de serveurs répartis géographiquement qui servent les fichiers statiques au plus proche de l'utilisateur.
**Analogie** : Au lieu d'un seul entrepôt Amazon en France, des entrepôts partout en Europe pour livrer plus vite.
**Monka** : Vercel distribue l'app via un CDN mondial.

### CI/CD (Continuous Integration / Continuous Deployment)
**Définition** : CI = tests automatiques à chaque push. CD = déploiement automatique si les tests passent.
**Analogie** : Un tapis roulant d'usine avec des contrôles qualité à chaque étape. Si un test échoue, le tapis s'arrête.
📖 Voir `05_DEVOPS_INFRA.md` § 5.1

### Component (Composant React)
**Définition** : Un morceau d'UI autonome et réutilisable (un bouton, un formulaire, une carte).
**Analogie** : Une pièce LEGO. Tu assembles des pièces pour construire l'interface complète.
**Monka** : `<RuleExplainerFR>`, `<VulnOverviewTabs>`, `<ClinicalChain>`.

### Container (Docker)
**Définition** : Un environnement isolé qui empaquette une application avec toutes ses dépendances.
**Analogie** : Une valise complète avec tout ce dont tu as besoin — peu importe l'hôtel (serveur), tu as tout.
📖 Voir `05_DEVOPS_INFRA.md` § 5.2

### CORS (Cross-Origin Resource Sharing)
**Définition** : Mécanisme de sécurité du navigateur qui contrôle quels sites peuvent appeler ton API.
**Analogie** : Le videur d'un bar qui vérifie la liste VIP. Seuls les domaines autorisés passent.

### CRUD
**Définition** : **C**reate, **R**ead, **U**pdate, **D**elete — les 4 opérations de base sur les données.
**Analogie** : Créer, consulter, modifier, supprimer un contact dans ton téléphone.

### CSR / SSR / SSG
**Définition** :
- **CSR** (Client-Side Rendering) = Le navigateur génère la page (React SPA)
- **SSR** (Server-Side Rendering) = Le serveur génère la page à chaque requête (Next.js)
- **SSG** (Static Site Generation) = Les pages sont générées une fois au build
**Monka** : Utilise CSR (SPA via Vite) car c'est une app métier authentifiée.

---

## D

### Database (Base de données)
**Définition** : Système organisé pour stocker et retrouver des données.
**Monka** : PostgreSQL via Supabase.

### Dependency (Dépendance)
**Définition** : Un package/librairie externe que ton code utilise (React, Zod, etc.).
**Analogie** : Les ingrédients d'une recette. Tu ne les fabriques pas toi-même, tu les achètes (npm install).

### Deploy (Déploiement)
**Définition** : Mettre le code en production pour que les utilisateurs puissent y accéder.
**Analogie** : Ouvrir les portes du restaurant après avoir cuisiné.

### Docker
📖 Voir Container.

### DDD (Domain-Driven Design)
**Définition** : Organiser le code autour du métier, pas de la technique.
📖 Voir `01_ARCHITECTURE.md` § 1.3

### DNS (Domain Name System)
**Définition** : Le système qui traduit un nom de domaine (monka.fr) en adresse IP (142.250.74.14).
**Analogie** : L'annuaire téléphonique d'Internet.

### DRY (Don't Repeat Yourself)
**Définition** : Ne duplique pas le code. Si tu écris la même chose 2 fois, extrais-la dans une fonction.

---

## E

### Edge Function
**Définition** : Code serveur exécuté au plus proche de l'utilisateur, sans serveur permanent.
**Analogie** : Un cuisinier itinérant qui vient cuisiner chez toi plutôt que tu ailles au restaurant.
**Monka** : Supabase Edge Functions (Deno) pour la logique côté serveur.

### Endpoint
**Définition** : Une URL spécifique de l'API qui accepte des requêtes (`/api/patients`, `/api/scores`).
**Analogie** : Un guichet spécifique à la mairie. Guichet 1 = état civil, Guichet 2 = passeports.

### Environment Variable (Variable d'environnement)
**Définition** : Valeur de configuration stockée hors du code (clé API, URL de la DB).
**Analogie** : L'adresse de ton bureau est écrite sur un post-it, pas tatouée sur ton bras. Si tu déménages, tu changes le post-it.
📖 Voir `10_PRODUCTION_READINESS.md` § 10.4

### ESLint
**Définition** : Outil qui analyse le code et signale les problèmes de style et les erreurs potentielles.
**Analogie** : Le correcteur orthographique de Word, mais pour le code.

---

## F

### Feature Flag
**Définition** : Interrupteur qui permet d'activer/désactiver une fonctionnalité sans redéployer.
📖 Voir `10_PRODUCTION_READINESS.md` § 10.6

### Foreign Key (Clé étrangère)
**Définition** : Un champ dans une table qui fait référence à une ligne dans une autre table.
**Analogie** : Le numéro de commande sur ta facture renvoie vers la commande dans le système.

### Framework
**Définition** : Un cadre de développement qui impose une structure et fournit des outils (React, Next.js, Django).
**Analogie** : Le plan d'un IKEA. Tu suis les instructions et tu as un meuble. Tu peux personnaliser, mais la structure de base est fixée.

### Frontend
**Définition** : La partie visible de l'app — l'interface utilisateur dans le navigateur.
**Analogie** : La salle du restaurant. Ce que le client voit et touche.
**Monka** : React + TypeScript + Vite.

---

## G

### Git
**Définition** : Système de contrôle de version — historique complet de toutes les modifications du code.
**Analogie** : Google Docs avec l'historique de versions. Tu peux voir qui a changé quoi et revenir à n'importe quelle version.

### GraphQL
**Définition** : Langage de requête API où le client demande exactement les données qu'il veut (alternative à REST).
**Analogie** : Au restaurant, au lieu d'un menu fixe (REST), tu commandes exactement ce que tu veux.

---

## H

### HDS (Hébergement de Données de Santé)
**Définition** : Certification française obligatoire pour héberger des données de santé.
**Monka** : Nécessaire pour la production. Migration vers un provider HDS planifiée.

### Hook (React)
**Définition** : Fonction React qui permet d'utiliser le state et d'autres features dans un composant fonction.
**Exemples** : `useState`, `useEffect`, `useCallback`, `useMemo`.

### Hot Module Replacement (HMR)
**Définition** : La page se rafraîchit instantanément quand tu modifies le code, sans recharger tout.
**Monka** : Vite offre un HMR ultra-rapide.

### HTTPS / TLS
**Définition** : Protocole de communication chiffré. Le cadenas vert dans la barre d'adresse.
**Analogie** : Envoyer une lettre dans une enveloppe scellée plutôt qu'une carte postale lisible par tous.

---

## I

### Idempotent
**Définition** : Une opération qui produit le même résultat même si on l'exécute plusieurs fois.
**Analogie** : Appuyer sur le bouton d'un ascenseur 10 fois = même résultat qu'appuyer 1 fois.
**Importance** : Les migrations et les déploiements doivent être idempotents.

### Index (Base de données)
**Définition** : Structure de données qui accélère les recherches dans une table.
**Analogie** : L'index d'un livre. Au lieu de lire toutes les pages, tu vas directement à la bonne.

### Interface (TypeScript)
**Définition** : Un contrat qui définit la forme d'un objet (quelles propriétés, quels types).
```typescript
interface Patient {
  id: string;
  nom: string;
  age: number;
  vulnerabilite: 'CRITICAL' | 'HIGH' | 'STANDARD';
}
```

---

## J

### JWT (JSON Web Token)
**Définition** : Jeton d'authentification signé cryptographiquement qui prouve l'identité.
📖 Voir `ANTI_FREEZE.md` Q24

---

## L

### Latency (Latence)
**Définition** : Le temps entre une requête et sa réponse.
**Analogie** : Le temps entre "je commande" et "je reçois mon plat".

### Lazy Loading
**Définition** : Charger les composants/données uniquement quand c'est nécessaire (pas tout au début).
**Analogie** : Netflix ne télécharge pas tous les films de son catalogue en avance. Il charge celui que tu veux regarder.

### Linting
**Définition** : Analyse automatique du code pour détecter les erreurs et les problèmes de style.
📖 Voir ESLint.

---

## M

### Middleware
**Définition** : Code qui s'exécute entre la requête et la réponse (pour vérifier l'auth, logger, etc.).
**Analogie** : Le portique de sécurité à l'aéroport. Tu passes dedans AVANT d'accéder à l'avion.

### Migration (Base de données)
**Définition** : Fichier SQL versionné qui modifie la structure de la DB.
📖 Voir `ANTI_FREEZE.md` Q14b

### Mock
**Définition** : Fausse implémentation d'un composant utilisée dans les tests.
**Analogie** : Un mannequin de crash-test. Il simule un humain pour tester sans risque.

### Monolithe
📖 Voir `01_ARCHITECTURE.md` § 1.1

---

## N

### Node.js
**Définition** : Runtime JavaScript côté serveur. Permet de faire tourner du JS hors du navigateur.
**Analogie** : Le navigateur peut exécuter JS. Node.js permet de l'exécuter aussi sur un serveur.

### npm (Node Package Manager)
**Définition** : Gestionnaire de paquets pour JavaScript. Permet d'installer des librairies.
**Analogie** : L'App Store des développeurs JavaScript.

---

## O

### ORM (Object-Relational Mapping)
**Définition** : Outil qui traduit les tables SQL en objets dans le code (Prisma, Drizzle, TypeORM).
**Analogie** : Un traducteur simultané entre SQL et TypeScript.
**Monka** : Supabase fournit un ORM implicite via PostgREST.

### OWASP
**Définition** : Organisation qui publie les 10 vulnérabilités web les plus courantes.
📖 Voir `06_SECURITE.md` § 6.1

---

## P

### PostgreSQL
**Définition** : Base de données relationnelle open-source, la plus avancée au monde.
**Monka** : Le cœur de Supabase. Stocke toutes les données cliniques.

### PR / Pull Request
**Définition** : Demande de fusion d'une branche dans une autre. Inclut la revue de code.
**Analogie** : Un document soumis pour approbation. Le reviewer lit, commente, et approuve (ou demande des changements).

### Props (React)
**Définition** : Données passées d'un composant parent à un composant enfant.
**Analogie** : Les paramètres d'une commande au restaurant. Tu donnes au serveur (parent) ta commande (props), il la transmet à la cuisine (enfant).

---

## Q

### Query
**Définition** : Une question posée à la base de données.
```sql
SELECT * FROM patients WHERE age > 75;
```

---

## R

### Refactoring
**Définition** : Modifier la structure du code sans changer son comportement.
📖 Voir `ANTI_FREEZE.md` Q28

### REST (Representational State Transfer)
**Définition** : Style d'architecture API basé sur des URLs et des méthodes HTTP.
| Méthode | Action | Exemple |
|---------|--------|---------|
| GET | Lire | `GET /patients` → Liste des patients |
| POST | Créer | `POST /patients` → Nouveau patient |
| PUT | Modifier | `PUT /patients/123` → Modifie le patient 123 |
| DELETE | Supprimer | `DELETE /patients/123` → Supprime le patient 123 |

### RLS (Row Level Security)
**Définition** : Sécurité au niveau des lignes de la base de données.
📖 Voir `ANTI_FREEZE.md` Q6

### Runtime
**Définition** : L'environnement qui exécute le code (le navigateur pour le front, Node.js/Deno pour le back).

---

## S

### Schema (Schéma)
**Définition** : La structure de ta base de données — quelles tables, quelles colonnes, quels types.
**Analogie** : Le plan d'architecte d'une maison. Il décrit la structure, pas le contenu.

### Scope
**Définition** : La portée d'une variable — où elle est accessible dans le code.
**Analogie** : Ta carte de cantine du lycée ne marche qu'à la cantine du lycée, pas à la boulangerie.

### Serverless
**Définition** : Tu n'as pas de serveur à gérer. Le cloud exécute ton code à la demande.
**Analogie** : Au lieu de posséder une voiture (serveur), tu prends un Uber (serverless) quand tu en as besoin.
**Monka** : Edge Functions Supabase + Vercel.

### SPA (Single Page Application)
**Définition** : App web qui charge une seule page HTML et met à jour dynamiquement le contenu.
**Monka** : C'est ce qu'est le Simulateur — une SPA React.

### SQL (Structured Query Language)
**Définition** : Langage standard pour interroger et manipuler les bases de données relationnelles.

### State (État)
**Définition** : Les données qui changent au cours de la vie de l'app (réponses d'un formulaire, utilisateur connecté).
**Analogie** : L'humeur d'une personne change au cours de la journée. L'état d'une app change au cours de l'utilisation.

### Supabase
**Définition** : Plateforme open-source qui combine PostgreSQL, Auth, Storage, Realtime, et Edge Functions.
**Analogie** : Firebase made for PostgreSQL lovers.

---

## T

### TDD (Test-Driven Development)
📖 Voir `ANTI_FREEZE.md` Q9

### Tree-shaking
**Définition** : Élimination automatique du code non utilisé lors du build.
**Analogie** : Secouer un arbre pour que les feuilles mortes tombent. Le bundle final ne contient que le code vivant.

### TypeScript
**Définition** : JavaScript + types. Le compilateur vérifie les types avant l'exécution.
**Analogie** : Un formulaire avec des champs typés. "Âge" n'accepte que des nombres, pas du texte.
**Monka** : TypeScript strict sur tout le projet.

---

## V

### Vite
**Définition** : Build tool ultra-rapide pour le développement web moderne.
**Monka** : Le moteur qui construit et sert l'app React en développement.

### Virtual DOM
**Définition** : Copie en mémoire du DOM réel. React compare les deux pour ne mettre à jour que ce qui a changé.
**Analogie** : Au lieu de repeindre tout le mur, tu mets à jour seulement les parties qui ont changé.

---

## W

### Webhook
**Définition** : URL que tu donnes à un service externe pour qu'il t'envoie des notifications quand quelque chose se passe.
**Analogie** : Tu donnes ton numéro au livreur pour qu'il t'appelle quand il est en bas.

### WebSocket
**Définition** : Connexion bidirectionnelle permanente entre le client et le serveur (temps réel).
**Analogie** : Un appel téléphonique (toujours connecté) vs des SMS (requête/réponse HTTP).
**Monka** : Supabase Realtime utilise des WebSockets.

---

> 💡 **Astuce** : Si le CTO utilise un terme que tu ne connais pas, ne freeze pas. Dis : *"Peux-tu préciser ce que tu entends par [terme] dans notre contexte ?"* — C'est une question légitime, même pour un senior.
