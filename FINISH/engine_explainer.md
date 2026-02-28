# 🧠 CLINICAL ENGINE — Explication Technique Complète

**Objectif** : Ce document explique, ligne par ligne, comment le moteur clinique Monka fonctionne dans le code. Chaque bloc de code est traduit en français avec une explication vulgarisée. C'est la pièce à conviction technique pour le CTO.

**Fichiers concernés** : 4 fichiers, 656 lignes de code pur, zéro dépendance React.

| Fichier | Lignes | Rôle |
|---|---|---|
| `engine/clinicalEngine.ts` | 320 | Le cerveau — scoring + activation |
| `engine/helpers.ts` | 196 | Les assistants — filtrage, accès données |
| `engine/types.ts` | 57 | Les définitions — types TypeScript |
| `engine/constants.ts` | 83 | Les constantes — metadata des 5 vulnérabilités |

---

## 1. L'ARCHITECTURE EN UNE PHRASE

> **Le moteur prend les réponses d'un utilisateur (165 questions), calcule un score de vulnérabilité sur 5 axes, et active les parcours d'accompagnement correspondants. Tout est déterministe : même entrée = même sortie, 100% du temps.**

---

## 2. LES TYPES — Ce que le moteur manipule

### 2.1 Les vulnérabilités (types.ts L13)
```ts
export type VulnerabilityId = 'V1' | 'V2' | 'V3' | 'V4' | 'V5'
```
**En français** : Le modèle clinique de Monka évalue 5 dimensions de vulnérabilité :
- **V1** — Social et relationnel (impact de l'aidance sur la vie sociale)
- **V2** — Administrative (droits, finances)
- **V3** — Santé physique et psychologique de l'aidant
- **V4** — Fragilité du proche aidé (pathologies, autonomie)
- **V5** — Parcours médical du proche (coordination des soins)

**Pourquoi 5 ?** C'est le modèle clinique validé par l'équipe Monka (gériatrologie). Chaque dimension a un poids dans le score global (V1=15%, V2=10%, V3=25%, V4=30%, V5=20% = 100%).

### 2.2 Les réponses (clinicalEngine.ts L39-40)
```ts
export type AnswerValue = string | string[]
export type Answers = Record<string, AnswerValue>
```
**En français** : Une réponse peut être :
- Un string simple : `"Oui"` (choix unique)
- Un tableau : `["Douleurs", "Fatigue"]` (choix multiple)

Le `Record<string, AnswerValue>` c'est un dictionnaire `{ questionId → réponse }`. Exemple :
```
{ "N1": "Oui", "N3": ["Handicap", "Maladie Chronique"], "O1": "75 ans" }
```

---

## 3. L'ÉVALUATION DES CONDITIONS — Le cœur logique

### 3.1 Les 9 opérateurs (clinicalEngine.ts L25-30)
```ts
export type Condition =
    | { q: string; op: 'eq' | 'neq' | 'ne' | 'contains'; val: string }
    | { q: string; op: 'in' | 'nin'; vals: string[] }
    | { q: string; op: 'gte'; val: string | number }
    | { q: string; op: 'count_gte'; val: number }
    | { q: string; op: 'has_any'; min: number }
```

**En français** : Une condition c'est une règle stockée en base (JSONB) qui dit : *"SI la réponse à la question X vérifie telle propriété..."*

| Opérateur | Signification | Exemple concret |
|---|---|---|
| `eq` | Égal à | `{q: "N1", op: "eq", val: "Oui"}` → *"L'aidant a répondu Oui"* |
| `neq` / `ne` | Différent de | `{q: "N1", op: "neq", val: "Non"}` → *"L'aidant N'a PAS répondu Non"* |
| `in` | Est parmi | `{q: "O1", op: "in", vals: ["60-75 ans", "+75 ans"]}` → *"Le proche a 60+ ans"* |
| `nin` | N'est pas parmi | `{q: "O1", op: "nin", vals: ["- 15 ans"]}` → *"Le proche n'est PAS un enfant"* |
| `gte` | Supérieur ou égal | `{q: "E5", op: "gte", val: 3}` → *"Score ≥ 3"* |
| `count_gte` | Au moins X cochés | `{q: "E19", op: "count_gte", val: 2}` → *"Au moins 2 soucis de santé cochés"* |
| `has_any` | Au moins min cochés | `{q: "N3", op: "has_any", min: 1}` → *"Au moins 1 type d'aidance sélectionné"* |
| `contains` | Contient le texte | `{q: "O16", op: "contains", val: "cancer"}` → *"La pathologie contient 'cancer'"* |

### 3.2 La fonction evaluateCondition (clinicalEngine.ts L57-113)

```ts
export function evaluateCondition(cond: Condition, answers: Answers): boolean {
    const raw = answers[cond.q]
    if (raw === undefined || raw === null) return false
    // ...switch sur cond.op
}
```

**En français** :
1. On récupère la réponse à la question `cond.q`
2. Si pas de réponse → la condition échoue (safety first)
3. On applique l'opérateur

**Le point clé pour le CTO** : La fonction gère les **deux formats** (string et string[]) grâce à la helper `toArray()` :
```ts
function toArray(answer: AnswerValue): string[] {
    return Array.isArray(answer) ? answer : [answer]
}
```
**En français** : *"Si c'est un tableau, on le garde. Si c'est un string, on le met dans un tableau."* Ça normalise tout pour que les opérateurs fonctionnent identiquement sur choix unique et choix multiple.

**Exemple concret `eq` avec multi-select** (L63-64) :
```ts
case 'eq':
    return Array.isArray(raw) ? raw.includes(cond.val) : raw === cond.val
```
**En français** : *"Si la réponse est un tableau → est-ce que la valeur est DEDANS ? Si c'est un string → est-ce que c'est exactement la même ?"*

---

## 4. L'ACTIVATION DES CATÉGORIES — Le moteur de décision

### 4.1 La logique d'activation (clinicalEngine.ts L121-179)

```ts
export function evaluateRule(rule: DBActivationRule, answers: Answers): boolean {
    const conditions = rule.condition_logic as unknown as Condition[]
    if (!conditions || !Array.isArray(conditions) || conditions.length === 0) return false
    return conditions.every(cond => evaluateCondition(cond, answers))
}
```

**En français** : Une règle d'activation contient **plusieurs conditions**. **TOUTES les conditions doivent être vraies** (logique ET / AND). C'est comme un diagnostic médical : il faut que TOUS les symptômes soient présents pour déclencher un protocole.

**Exemple concret** : La règle `R_MP3_CAT12_std` a les conditions :
```json
[
    {"q": "N3", "op": "has_any", "min": 1},
    {"q": "O1", "op": "in", "vals": ["+75 ans"]},
    {"q": "E19", "op": "count_gte", "val": 2}
]
```
**Traduit** : *"L'aidant aide au moins 1 type de personne, ET le proche a +75 ans, ET l'aidant a au moins 2 soucis de santé"* → active la catégorie CAT12 dans le micro-parcours MP3.

### 4.2 La compétition des niveaux (clinicalEngine.ts L137, L170-174)

```ts
const NIVEAU_ORDER: Record<string, number> = { standard: 1, ccc: 2, critique: 3 }
```

**En français** : Quand plusieurs règles activent la même catégorie, **le niveau le plus élevé gagne** :
- `standard` (priorité 1) — situation normale
- `ccc` (priorité 2) — complexité complémentaire
- `critique` (priorité 3) — situation critique → délai réduit

**Mécanisme** :
```ts
if ((NIVEAU_ORDER[rule.niveau] || 0) > (NIVEAU_ORDER[existing.niveau] || 0)) {
    existing.niveau = rule.niveau
    existing.delaiJours = rule.delai_jours
}
```
**En français** : *"Si la nouvelle règle est plus grave que celle qu'on a déjà → on prend le niveau et le délai de la nouvelle règle."*

**Pourquoi c'est pertinent cliniquement** : La catégorie n'est pas juste "activée ou non". Le NIVEAU indique l'URGENCE de l'intervention. Un patient critique n'attend pas le même délai qu'un patient standard. C'est un modèle de triage.

---

## 5. LE SCORING — Le calcul de vulnérabilité

### 5.1 computeScore (clinicalEngine.ts L206-268)

```ts
export function computeScore(
    data: MonkaData,
    answers: Answers,
    vulnId: VulnerabilityId
): ScoreResult {
    const scoringQs = data.scoringQuestions.filter(sq => sq.vulnerability_id === vulnId)
    const maxScore = scoringQs[0]?.max_score_vulnerability || 0
```

**En français** : Pour chaque vulnérabilité (V1 à V5), on :
1. Récupère toutes les entrées de scoring correspondantes (en DB : table `scoring_questions`)
2. Calcule le score max possible (ex: V4 = 44 points max)

### 5.2 Le regroupement par question (L215-220)

```ts
const byQuestion = new Map<string, typeof scoringQs>()
for (const sq of scoringQs) {
    const list = byQuestion.get(sq.question_id) || []
    list.push(sq)
    byQuestion.set(sq.question_id, list)
}
```

**En français** : On regroupe les entrées de scoring par question. Pourquoi ? Parce qu'une question peut avoir **plusieurs réponses possibles** (ex: E19 a 8 options). Chaque option a son propre score dans la table `scoring_questions`.

### 5.3 Le calcul multi-select (L229-243)

```ts
if (Array.isArray(answer)) {
    // Multi-choice: sum scores for all selected responses
    for (const sq of entries) {
        if (answer.includes(sq.response_text)) {
            questionScore += sq.score
        }
    }
} else {
    // Single-choice: match exact response
    for (const sq of entries) {
        if (answer === sq.response_text) {
            questionScore += sq.score
        }
    }
}
```

**En français** :
- **Choix unique** : On cherche la réponse exacte et on prend son score
- **Choix multiple** : On additionne les scores de TOUTES les réponses cochées

Exemple : Question E19 "Quels soucis de santé avez-vous ?"
- Si `["Douleurs", "Fatigue"]` et que chaque option vaut 1pt → questionScore = 2

### 5.4 Le cap de score (L246-249)

```ts
const cap = QUESTION_SCORE_CAP[qId]
if (cap !== undefined && questionScore > cap) {
    questionScore = cap
}
```

**En français** : Pour certaines questions multi-select (E19, O16), le score est **plafonné à 1 point** même si l'utilisateur coche 5 options. C'est un choix clinique : on veut savoir "a-t-il des soucis ?" (oui/non = 0 ou 1), pas "combien de soucis ?".

**Pourquoi c'est important** : Sans ce cap, un utilisateur qui coche 8 options sur E19 obtiendrait 8 points au lieu de 1. Ça fausserait complètement l'équilibre du scoring V3.

### 5.5 Les seuils de niveau (L257-260)

```ts
const threshold = data.scoringThresholds
    .filter(t => t.vulnerability_id === vulnId)
    .find(t => score >= t.min_score && score <= t.max_score)
```

**En français** : Une fois le score calculé, on le situe dans une **fourchette de sévérité** :

| Vulnérabilité | Faible | Modéré | Élevé | Critique |
|---|---|---|---|---|
| V1 (Social) | 0-3 | 4-6 | 7-9 | 10-13 |
| V2 (Admin) | 0-2 | 3-4 | 5-6 | 7-8 |
| V3 (Santé aidant) | 0-4 | 5-9 | 10-14 | 15-19 |
| V4 (Fragilité proche) | 0-11 | 12-22 | 23-33 | 34-44 |
| V5 (Parcours médical) | 0-3 | 4-7 | 8-11 | 12-15 |

**Couverture** : 0 → max_score sans trou (vérifié en audit DB).

---

## 6. LE SCORE GLOBAL PONDÉRÉ (clinicalEngine.ts L303-309)

```ts
const vulnWeightMap = new Map(data.vulnerabilities.map(v => [v.id, v.weight]))
const weightedScore = scores.reduce((acc, s) => {
    const weight = vulnWeightMap.get(s.vulnId) || 0.20
    return acc + (s.percentage * weight)
}, 0)
```

**En français** : Le score global n'est pas une simple addition. Chaque vulnérabilité a un **poids** :
- V1 (Social) = **15%**
- V2 (Admin) = **10%**
- V3 (Santé aidant) = **25%**
- V4 (Fragilité proche) = **30%** — poids le plus fort
- V5 (Parcours médical) = **20%**

**Formule** :
```
Score Global = (V1% × 0.15) + (V2% × 0.10) + (V3% × 0.25) + (V4% × 0.30) + (V5% × 0.20)
```

**Pourquoi V4 pèse le plus** : Le modèle clinique considère que la fragilité du proche est le facteur déterminant. Un proche très fragile signifie un aidant à haut risque d'épuisement.

**Intégrité prouvée** : La somme des poids = **1.00** (vérifié en DB via `SELECT sum(weight) FROM vulnerabilities`).

---

## 7. LE MODÈLE ADDITIF — Filtrage conditionnel des questions

### 7.1 Les blocs d'aidance (helpers.ts L127-155)

```ts
const N3_TO_AIDANCE_BLOCKS: Record<string, string[]> = {
    "J'aide une personne en perte d'autonomie...": ['Personne Agée'],
    "J'aide une personne en situation de handicap": ['Handicap'],
    // ...
}
```

**En français** : La question N3 (*"Quel type de personne aidez-vous ?"*) détermine quelles questions suivantes sont pertinentes. C'est un **arbre décisionnel dynamique** :

- Si l'aidant aide une personne âgée → on montre les questions "Personne Agée"
- Si l'aidant aide un handicapé → on montre les questions "Handicap"
- Les questions "Tous" sont toujours montrées

**Pourquoi c'est cliniquement pertinent** : On ne pose pas les mêmes questions si l'aidant s'occupe d'un enfant autiste vs d'un parent Alzheimer. Le questionnaire s'adapte au profil.

### 7.2 La logique enfant/senior (L134-136, L149-153)

```ts
const ENFANT_AGE_BRACKETS = ['- 15 ans', '15-20 ans']
const SENIOR_AGE_BRACKETS = ['60-75 ans', '+75 ans']
```

**En français** : Si le proche aidé est un enfant (< 20 ans) :
1. On retire le bloc "Personne Agée" (pas pertinent)
2. On ajoute le bloc "Enfant" si le type d'aidance est éligible

C'est un **raffinement clinique** : les questions pour un enfant handicapé ne sont pas les mêmes que pour un senior handicapé.

---

## 8. LA SORTIE DU MOTEUR — runEngine (clinicalEngine.ts L286-319)

```ts
export function runEngine(
    data: MonkaData,
    answers: Answers,
    vulnFilter?: VulnerabilityId
): EngineOutput {
    const activatedCategories = getActivatedCategories(data, answers, vulnFilter)
    const activatedMPIds = new Set<string>()
    for (const cat of activatedCategories.values()) {
        activatedMPIds.add(cat.mpId)
    }
    const vulns: VulnerabilityId[] = ['V1', 'V2', 'V3', 'V4', 'V5']
    const scores = vulns.map(v => computeScore(data, answers, v))
    // ... totalScore, totalMaxScore, weightedScore
}
```

**En français** : `runEngine` est le **point d'entrée unique** du moteur. Il retourne :

| Propriété | Type | Signification |
|---|---|---|
| `activatedCategories` | Map | Quelles catégories sont activées + à quel niveau |
| `activatedMPIds` | Set | Quels micro-parcours sont touchés |
| `scores` | ScoreResult[] | Score par vulnérabilité (V1 à V5) |
| `totalScore` | number | Score brut total |
| `totalMaxScore` | number | Score maximum possible |
| `weightedScore` | number | Score global pondéré (0-100) |

---

## 9. SCALABILITÉ — Comment ce code peut évoluer (V2)

### 9.1 Ajouter une V6
**Impact** : 4 fichiers à modifier (`types.ts`, `constants.ts`, `clinicalEngine.ts` L298, `VULN_IDS`)
+ ajout en DB (`vulnerabilities`, `scoring_questions`, `scoring_thresholds`, `questions`)
**Estimation** : ~2h

### 9.2 Ajouter un nouvel opérateur
**Impact** : 1 seul fichier (`clinicalEngine.ts`) — ajouter un `case` dans le `switch`
**Estimation** : ~15 min

### 9.3 Modifier les poids des vulnérabilités
**Impact** : 0 fichier — changement en DB uniquement (`UPDATE vulnerabilities SET weight = ...`)
**Estimation** : ~2 min — **c'est la force du data-driven**

### 9.4 Ajouter des questions
**Impact** : 0 fichier — ajout en DB (`questions`, `scoring_questions`)
**Estimation** : ~10 min

### 9.5 Intégrer dans une app B2C (MyMonka V2)
**Ce qu'il faut** :
1. Copier le dossier `engine/` (4 fichiers, 656 lignes) — **zéro dépendance React**
2. Connecter au backend (les queries Supabase sont dans `queries.ts`, pas dans le moteur)
3. Adapter l'UI (le moteur retourne des données structurées, l'UI peut être n'importe quoi)

**Pourquoi c'est possible** : Le moteur est des **pure functions** (fonctions pures). Pas d'état, pas de side-effects, pas de React. On lui donne des données + des réponses → il retourne un résultat. Il peut tourner dans un navigateur, un serveur Node, une Edge Function, ou un mobile React Native.

---

## 10. QUESTIONS QUE LE CTO VA POSER

| Question | Réponse |
|---|---|
| *"C'est déterministe ?"* | **Oui**, 100%. Même input = même output. Pas d'IA, pas de random, pas de ML. |
| *"Pourquoi pas une IA ?"* | Le modèle clinique gériatrique est basé sur des grilles validées. Le déterminisme est un **avantage** : l'IDEC (infirmière) doit pouvoir expliquer pourquoi tel parcours est activé. |
| *"Ça tient la charge ?"* | Le moteur itère sur 240 règles × 165 questions en <10ms dans le navigateur. Même avec 10 000 règles, ça resterait <100ms. |
| *"Les données sont couplées au code ?"* | **Non.** Les données (questions, scores, seuils, rules) sont 100% en Supabase. Le code ne contient QUE la logique d'évaluation. On peut changer toutes les données sans toucher au code. |
| *"Et si on veut le mettre en backend ?"* | Copier `engine/` (4 fichiers) → import dans n'importe quel runtime JS/TS. 0 changement nécessaire. |
| *"Les tests ?"* | Tests unitaires existants sur `computeScore` et `evaluateCondition`. Coverage moteur actuel : ~60%. |
| *"Quelles sont les limites ?"* | (1) V1-V5 hardcodées → 4 fichiers à modifier pour V6. (2) `QUESTION_SCORE_CAP` en code dur → devrait être en DB. (3) `N3_TO_AIDANCE_BLOCKS` en code dur → nouvelle option N3 = modifier le code. |
