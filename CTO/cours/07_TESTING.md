# Module 07 — TESTING

> **Objectif** : Maîtriser la pyramide de tests et le vocabulaire QA.
> Le CTO jugera ta maturité technique sur ta compréhension des tests.

> **🔬 Clinical Engine** = Integrity checks métier, tests manuels | **📱 MyMonka** = Pyramide complète (unit + intégration + E2E + load testing)

---

## 🎯 PARETO 80/20

> **Les 20% qui couvrent 80% du sujet :**
>
> 1. **La pyramide des tests** (§7.1) — Le framework mental universel
> 2. **Unit testing** (§7.2) — Ce qu'on teste le plus
> 3. **Le concept de TDD** (§7.5) — Montrer qu'on connaît la méthodologie

---

## 7.1 — La pyramide des tests

### Le modèle

```
         /\
        /  \        E2E (End-to-End)
       /    \       → Peu, lents, coûteux
      /──────\      → Simulent un vrai utilisateur
     /        \     
    / Intégr.  \    Integration
   /────────────\   → Moyen nombre
  /              \  → Testent les composants ensemble
 /    Unit        \ 
/──────────────────\ Unit Tests
                    → Beaucoup, rapides, peu coûteux
                    → Testent une fonction isolée
```

### Ratio idéal

| Type | % du total | Vitesse | Coût | Confiance |
|------|-----------|---------|------|-----------|
| **Unit** | 70% | ⚡ Millisecondes | 💰 Bas | Logique isolée |
| **Integration** | 20% | ⏱️ Secondes | 💰💰 Moyen | Composants ensemble |
| **E2E** | 10% | 🐢 Minutes | 💰💰💰 Élevé | Parcours complet |

### Ce que le CTO aime entendre
> *"On connaît la pyramide et on sait que la majorité des tests doivent être unitaires. Sur le Kernel, les integrity checks sont une forme de test de validation métier. Pour la prod, on déploiera Vitest pour les unitaires et Playwright pour les E2E critiques."*

---

## 7.2 — Unit Testing

### Le concept

Tester **UNE fonction** de manière **isolée**, sans dépendance externe (sans DB, sans API, sans UI).

```typescript
// La fonction à tester
function calculateVulnerability(score: number, age: number): string {
  if (score > 80 && age > 75) return 'CRITICAL';
  if (score > 60) return 'HIGH';
  return 'STANDARD';
}

// Le test unitaire (Vitest)
describe('calculateVulnerability', () => {
  it('retourne CRITICAL pour score élevé et âge avancé', () => {
    expect(calculateVulnerability(85, 80)).toBe('CRITICAL');
  });

  it('retourne HIGH pour score moyen', () => {
    expect(calculateVulnerability(65, 50)).toBe('HIGH');
  });

  it('retourne STANDARD pour score bas', () => {
    expect(calculateVulnerability(30, 60)).toBe('STANDARD');
  });

  // Edge cases
  it('retourne HIGH quand score > 80 mais âge < 75', () => {
    expect(calculateVulnerability(85, 70)).toBe('HIGH');
  });
});
```

### AAA Pattern

Structurer chaque test en 3 parties :
- **Arrange** → Préparer les données d'entrée
- **Act** → Exécuter la fonction
- **Assert** → Vérifier le résultat

### Mocking

Remplacer une dépendance réelle par une fausse pour tester en isolation :

```typescript
// Au lieu d'appeler la vraie DB
const mockDatabase = {
  getPatient: vi.fn().mockReturnValue({ id: '123', nom: 'Dupont' })
};

// Le test utilise le mock au lieu de la vraie DB
const result = calculateScore(mockDatabase, '123');
```

**Analogie** : Un crash-test utilise un mannequin (mock), pas un vrai humain.

---

## 7.3 — Integration Testing

Tester que plusieurs composants fonctionnent **ensemble** :

```typescript
// Test d'intégration : l'API retourne les bonnes données
describe('API patients', () => {
  it('retourne les patients de l\'utilisateur connecté', async () => {
    // Arrange
    const { data } = await supabase.auth.signIn({ email, password });
    
    // Act
    const { data: patients } = await supabase
      .from('patients')
      .select('*');
    
    // Assert
    expect(patients).toBeDefined();
    expect(patients.every(p => p.user_id === data.user.id)).toBe(true);
  });
});
```

---

## 7.4 — E2E Testing (End-to-End)

Simuler un **vrai utilisateur** dans un **vrai navigateur** :

```typescript
// Playwright / Cypress
test('un professionnel complète une évaluation', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('#email', 'pro@monka.fr');
  await page.fill('#password', 'MotDePasse123');
  await page.click('#login-button');
  
  // Navigation
  await page.click('text=Nouvelle évaluation');
  
  // Remplir le questionnaire V1
  await page.click('#question-1-yes');
  await page.click('#question-2-no');
  // ...
  
  // Vérifier le résultat
  await expect(page.locator('#vulnerability-score')).toBeVisible();
  await expect(page.locator('#micro-parcours-list')).toContainText('Suivi renforcé');
});
```

### Outils E2E

| Outil | Forces | Faiblesses |
|-------|--------|-----------|
| **Playwright** | Multi-navigateur, rapide, par Microsoft | Plus récent |
| **Cypress** | DX excellente, time travel debugging | Chromium uniquement (historiquement) |

---

## 7.5 — TDD & BDD

### TDD (Test-Driven Development)

Le cycle **Red-Green-Refactor** :
1. 🔴 **Red** — Écrire le test d'abord (il échoue car le code n'existe pas)
2. 🟢 **Green** — Écrire le minimum de code pour que le test passe
3. 🔵 **Refactor** — Nettoyer le code en gardant le test vert

### BDD (Behavior-Driven Development)

Écrire les tests sous forme de comportements métier :

```gherkin
Feature: Évaluation de vulnérabilité
  Scenario: Patient avec score critique
    Given un patient de 82 ans
    And un score de fragilité de 85
    When le système calcule la vulnérabilité
    Then le résultat est "CRITICAL"
    And un micro-parcours "Suivi renforcé" est proposé
```

Le BDD est écrit dans un langage compréhensible par les non-techniques (cliniciens, PO).

---

## 7.6 — Coverage & Quality Gates

### Code Coverage

Pourcentage du code exécuté par les tests :

```
Statements : 85%  ← 85% des lignes de code sont testées
Branches   : 72%  ← 72% des conditions if/else sont testées
Functions  : 90%  ← 90% des fonctions ont au moins un test
Lines      : 85%
```

**Objectif réaliste** : 80% de coverage sur le code métier critique (Kernel). 100% est un leurre et coûte cher pour les 20 derniers %.

### Mutation Testing

Niveau au-dessus du coverage : on **modifie** le code automatiquement (muter) et on vérifie que les tests détectent la mutation. Si un test ne casse pas quand on modifie le code → le test est faible.

---

## 7.7 — CI Testing

### Tests dans le pipeline

```yaml
# Les tests bloquent le merge si ils échouent
test:
  runs-on: ubuntu-latest
  steps:
    - run: npm run test -- --coverage
    - run: npx playwright test
    - if: ${{ failure() }} → PR bloquée ❌
```

### Flaky Tests

Tests qui passent parfois et échouent parfois (sans changement de code). C'est le **fléau** des CI. Causes : timing, réseau, ordre d'exécution.

**Solution** : Identifier et corriger ou quarantiner les flaky tests. Ne jamais les ignorer.

---

> 💡 **Takeaway** : Tu n'as pas besoin de savoir écrire tous les tests. Tu dois comprendre la **philosophie** : tester automatiquement les chemins critiques, prioriser les tests unitaires, et ne jamais merger sans que le CI soit vert.
