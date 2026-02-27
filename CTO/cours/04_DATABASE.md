# Module 04 — DATABASE

> **Objectif** : Maîtriser PostgreSQL et Supabase comme un DBA.
> La DB est le cœur de toute application. Le CTO y sera très attentif.

> **🔬 Clinical Engine** = Schéma simple, données de test | **📱 MyMonka** = Schéma complexe multi-tenant, HDS, 100K users, indexing agressif

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **Modélisation relationnelle** (§4.1) — Tables, relations, clés
> 2. **RLS** (§4.6) — Sécurité au niveau des lignes
> 3. **Migrations** (§4.4) — Versionner le schéma DB
> 4. **Indexing** (§4.5) — Pourquoi les requêtes sont lentes et comment les accélérer

---

## 4.1 — Modélisation relationnelle

### Les bases

| Concept | Définition | Analogie |
|---------|-----------|----------|
| **Table** | Collection de données structurées | Feuille Excel |
| **Colonne** | Un attribut de la donnée | En-tête de colonne Excel |
| **Ligne (Row)** | Une instance de donnée | Une ligne dans Excel |
| **Primary Key (PK)** | Identifiant unique de chaque ligne | Numéro de sécu — unique par personne |
| **Foreign Key (FK)** | Référence vers une ligne d'une autre table | Le numéro de commande sur une facture |

### Types de relations

```
1:1   (Un-à-Un)      → Un patient a UN profil médical
1:N   (Un-à-Plusieurs) → Un professionnel a PLUSIEURS patients
N:M   (Plusieurs-à-Plusieurs) → Un patient a PLUSIEURS micro-parcours,
                                  un micro-parcours concerne PLUSIEURS patients
```

Pour le N:M, on utilise une **table de jointure** (table intermédiaire) :
```
patients ← patient_parcours → parcours
```

### Normalisation (1NF → 3NF)

La **normalisation** élimine la duplication de données :

**1NF** (1ère Forme Normale) : Chaque cellule contient une seule valeur (pas de listes).
```
❌ medicaments: "Doliprane, Lexomil, Kardegic"
✅ Table séparée : patient_medicaments (patient_id, medicament)
```

**2NF** : Chaque colonne non-clé dépend de TOUTE la clé primaire (pas juste une partie).

**3NF** : Aucune colonne non-clé ne dépend d'une autre colonne non-clé.

**Règle pratique** : Si tu dupliques la même information à plusieurs endroits → tu n'es probablement pas normalisé. Extrais-la dans une table séparée.

### ERD (Entity-Relationship Diagram)

Schéma visuel des tables et de leurs relations. Le CTO voudra peut-être en voir un.

```
┌──────────┐       ┌──────────────┐       ┌──────────┐
│ patients │ 1───N │  responses   │ N───1 │ questions│
│──────────│       │──────────────│       │──────────│
│ id (PK)  │       │ id (PK)      │       │ id (PK)  │
│ nom      │       │ patient_id(FK)│      │ texte    │
│ age      │       │ question_id(FK)│     │ module   │
│ user_id  │       │ valeur       │       │ type     │
└──────────┘       └──────────────┘       └──────────┘
```

---

## 4.2 — SQL avancé

### Les JOINs

Le concept le plus important de SQL : **combiner des données de plusieurs tables**.

```sql
-- INNER JOIN : retourne les lignes qui ont une correspondance dans les deux tables
SELECT p.nom, r.valeur
FROM patients p
INNER JOIN responses r ON r.patient_id = p.id;

-- LEFT JOIN : retourne TOUS les patients, même ceux sans réponses
SELECT p.nom, r.valeur
FROM patients p
LEFT JOIN responses r ON r.patient_id = p.id;
```

**Analogie** : INNER JOIN = seuls les invités qui ont confirmé ET ont un siège sont assis. LEFT JOIN = tous les invités sont listés, même ceux sans siège.

### CTEs (Common Table Expressions)

Requêtes nommées qu'on peut réutiliser :

```sql
WITH high_risk_patients AS (
  SELECT id, nom, score
  FROM patients 
  WHERE score > 80
)
SELECT p.nom, COUNT(r.id) as nb_responses
FROM high_risk_patients p
LEFT JOIN responses r ON r.patient_id = p.id
GROUP BY p.nom;
```

### Window Functions

Fonctions qui calculent sur un **ensemble de lignes** sans les grouper :

```sql
-- Classement des patients par score décroissant
SELECT nom, score,
  RANK() OVER (ORDER BY score DESC) as rang
FROM patients;
```

### EXPLAIN (analyse de requêtes)

`EXPLAIN ANALYZE` montre comment PostgreSQL exécute ta requête :

```sql
EXPLAIN ANALYZE SELECT * FROM patients WHERE age > 75;
```

Résultat : tu vois si PostgreSQL fait un **Seq Scan** (lit tout) ou un **Index Scan** (utilise un index). Si c'est un Seq Scan sur une grosse table → il faut un index.

---

## 4.3 — Supabase en profondeur

### Ce que Supabase offre

| Service | Ce que ça fait | Alternative traditionnelle |
|---------|---------------|---------------------------|
| **Database** | PostgreSQL managé | RDS, Cloud SQL, auto-hébergé |
| **Auth** | Login, signup, OAuth, JWT | Auth0, Firebase Auth |
| **PostgREST** | API REST auto-générée | Express.js, Django REST |
| **Realtime** | WebSockets pour les changements en temps réel | Socket.io, Pusher |
| **Storage** | Stockage de fichiers (images, PDF) | S3, Cloud Storage |
| **Edge Functions** | Code serveur serverless (Deno) | AWS Lambda, Cloud Functions |

### PostgREST : l'API auto-générée

Supabase génère l'API REST directement depuis le schéma PostgreSQL. Pas besoin d'écrire de code backend pour le CRUD.

**Client JS** :
```typescript
// Equivalent de : SELECT * FROM patients WHERE age > 75 ORDER BY nom
const { data, error } = await supabase
  .from('patients')
  .select('*')
  .gt('age', 75)
  .order('nom');
```

**Ce que le CTO aime entendre** : *"Supabase nous donne une API type-safe auto-générée. On n'écrit pas de code backend pour le CRUD, ce qui élimine une catégorie entière de bugs. La sécurité est dans la DB via RLS, pas dans l'API."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Supabase gère tout. ~10 tables, peu de requêtes complexes.
> - 📱 **MyMonka** : Supabase comme point de départ, mais migration vers un PostgreSQL HDS probable. Schéma à 50+ tables, query optimization critique (100K users), read replicas pour la performance, partitioning des tables historiques.

### Supabase Realtime

Recevoir les changements de la DB en temps réel via WebSockets :

```typescript
supabase
  .channel('scores')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'scores' },
    (payload) => {
      console.log('Nouveau score :', payload.new);
      // Mettre à jour l'UI automatiquement
    }
  )
  .subscribe();
```

---

## 4.4 — Migrations

### Le concept

Les migrations, c'est **Git pour ta base de données**. Chaque modification du schéma est un fichier versionné.

### Le workflow

```
1. Créer un fichier de migration
   → 20260227_add_vulnerability_index.sql

2. Écrire la modification
   → ALTER TABLE patients ADD COLUMN vulnerability_index FLOAT;

3. Appliquer la migration
   → supabase db push (ou via le dashboard)

4. La migration est enregistrée dans une table `migrations`
   → On sait exactement quelles migrations ont été appliquées

5. Rollback si problème
   → ALTER TABLE patients DROP COLUMN vulnerability_index;
```

### Bonnes pratiques

| Règle | Pourquoi |
|-------|---------|
| **Jamais** modifier une migration déjà appliquée | D'autres environnements l'ont déjà exécutée |
| **Toujours** écrire le rollback | Pouvoir annuler en cas de problème |
| **Migrations idempotentes** | `CREATE TABLE IF NOT EXISTS` pour éviter les erreurs si relancée |
| **Petites migrations** | Une modification par fichier, pas 10 |
| **Tester en staging** | Appliquer sur staging AVANT la prod |

---

## 4.5 — Indexing & Performance

### Pourquoi les index ?

Sans index, PostgreSQL fait un **Sequential Scan** (lit TOUTES les lignes) pour trouver un résultat. Sur 1 million de lignes → très lent.

Avec un index, PostgreSQL fait un **Index Scan** (va directement aux bonnes lignes). Comme l'index d'un livre.

### Types d'index

| Type | Usage | Exemple |
|------|-------|---------|
| **B-tree** (défaut) | Comparaisons (`=`, `>`, `<`, `BETWEEN`) | `CREATE INDEX ON patients(age)` |
| **Hash** | Égalité uniquement (`=`) | `CREATE INDEX ON patients USING hash(email)` |
| **GIN** | Recherche full-text, arrays, JSONB | Recherche dans des champs JSON |
| **GiST** | Géospatial, ranges | Distances, intervalles de dates |

### Quand indexer

| ✅ Indexer | ❌ Ne pas indexer |
|-----------|-----------------|
| Colonnes utilisées dans `WHERE` | Tables < 1000 lignes |
| Colonnes de `JOIN` (foreign keys) | Colonnes rarement utilisées en filtres |
| Colonnes de `ORDER BY` fréquent | Colonnes avec peu de valeurs uniques |

### Le coût des index

Les index accélèrent les **lectures** mais ralentissent les **écritures** (chaque INSERT/UPDATE doit maintenir l'index). C'est un compromis.

---

## 4.6 — Row Level Security (RLS)

### Le concept

Le RLS est la killer feature de Supabase pour la sécurité. Les policies RLS sont des **règles SQL** qui filtrent automatiquement les données au niveau de chaque ligne.

### Exemple complet

```sql
-- 1. Activer RLS sur la table
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- 2. Créer une policy : chaque user ne voit que ses patients
CREATE POLICY "users_see_own_patients" ON patients
  FOR SELECT
  USING (user_id = auth.uid());

-- 3. Policy pour l'insertion : un user ne peut créer que ses propres patients
CREATE POLICY "users_insert_own" ON patients
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- 4. Policy admin : les admins voient tout
CREATE POLICY "admin_full_access" ON patients
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

### Pourquoi le RLS > le filtrage côté app

| | Côté App | RLS (côté DB) |
|---|---------|---------------|
| **Protection** | Un dev oublie un filtre → fuite | Impossible de contourner |
| **Surface d'attaque** | Chaque endpoint à protéger | Policy centralisée |
| **Maintenance** | Dupliquer la logique partout | Un seul endroit |
| **Audit** | Difficile à vérifier | `\dp` pour lister toutes les policies |

---

## 4.7 — Backup & Recovery

### Stratégie de backup

| Niveau | Méthode | Fréquence | RPO |
|--------|---------|-----------|-----|
| **1. Supabase auto** | Backup automatique intégré | Quotidien | 24h |
| **2. PITR** | Point-In-Time Recovery | Continu | Minutes |
| **3. pg_dump** | Export SQL manuel | À la demande | Variable |

**RPO** (Recovery Point Objective) = combien de données tu acceptes de perdre. RPO de 24h = tu peux perdre jusqu'à 24h de données.

**RTO** (Recovery Time Objective) = combien de temps pour restaurer. Combien de temps l'app est down.

### Disaster Recovery

Le plan quand tout casse :
1. **Le Supabase principal tombe** → Restaurer depuis le backup
2. **Les données sont corrompues** → PITR pour revenir à un point précis
3. **Tout est perdu** → `pg_dump` hors-site (stocké ailleurs que chez Supabase)

**Ce que le CTO aime entendre** : *"On a des backups Supabase automatiques. Pour la prod, on mettra en place du PITR et des backups hors-site avec un RPO < 1h et un RTO < 4h."*

> 📌 **En contexte**
> - 🔬 **Clinical Engine** : Backup Supabase auto = suffisant. Données reconstructibles.
> - 📱 **MyMonka** : Backup multi-niveau obligatoire. PITR continu, backups hors-site chiffrés, tests de restauration réguliers. Quand 100K aidants dépendent de leurs données → zéro tolérance sur la perte de données.

---

> 💡 **Takeaway** : La base de données, c'est le fondement invisible de l'app. Le CTO regardera le schéma, les policies RLS, et les migrations. Si c'est propre là → il sait que le reste peut suivre.
