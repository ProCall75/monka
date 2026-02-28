# 🔍 Analyse — Architecture DB Personas et Multi-Select

**Date** : 2026-02-27  
**Auteur** : Agent IA × Antonin (PRAGMA)  
**Contexte** : Post BLOC 1 (fix multi-select) — Étude de la pertinence d'une migration DB pour les personas

---

## 1. Problème actuel

### Comment les personas sont stockés

| Table | Champ | Type DB | Contenu exemple |
|---|---|---|---|
| `personas` | `nom`, `description` | text | "Marie, 72 ans, personne âgée" |
| `persona_answers` | `answer` | text | `"Oui"` ou `"Option A\|Option B"` |

**Le problème** : Pour les questions `choix_multiple`, les réponses sont stockées en **pipe-delimited** (`"Perte d'autonomie liée au vieillissement|Situation de handicap"`). Le code doit :
1. Parser `val.split('|')` au chargement → fragile, O(n)
2. Reconstruire `val.join('|')` à la sauvegarde → perte de type safety
3. Ne pas confondre un `|` dans le texte → pas de escape character

### Impact observé dans BLOC 1

Le fix multi-select a nécessité un parsing explicite dans `SimulatorPage.tsx` :

```tsx
// Parsing pipe → array (actuel — fragile)
const multiSelectIds = new Set(
    data.questions.filter(q => q.response_type === 'choix_multiple').map(q => q.id)
)
converted[qId] = multiSelectIds.has(qId) && val.includes('|')
    ? val.split('|').map(s => s.trim())
    : val
```

**Si un texte d'option contenait un `|`** → parsing cassé. C'est une dette technique identifiée.

---

## 2. Solution proposée

### 2A. Migration DB : `answer` text → `answer` jsonb

| Avant | Après |
|---|---|
| `answer TEXT` | `answer JSONB` |
| `"Option A\|Option B"` | `["Option A", "Option B"]` |
| `"Oui"` | `"Oui"` (string JSON valide) |

**Avantages** :
- Type natif JSON → pas de parsing client
- Support `string` ET `string[]` nativement
- Les types Supabase auto-générés deviennent corrects
- Supabase expose directement le JSON au client
- Compatible avec les operators JSONB PostgreSQL (`@>`, `?`, `?|`)

**Impact code** :
- `SimulatorPage.tsx` : supprimer le parsing pipe, lire directement le JSONB
- `helpers.ts` : supprimer le fallback `val.split('|')`
- Types auto-générés : `answer: Json` (Supabase type)

### 2B. Nombre de questions par persona

**Référence** : `LIVRABLES/VERSIONING_PERSONAS.xlsx` + `METHODE_VERSIONING_PERSONAS.md`

Le modèle additif définit :
- **Socle commun** : 130 questions
- **Blocs aidance** (N3) : 0 à 7 questions supplémentaires
- **Bloc Enfant** (O1) : +5 questions si < 18 ans

| Persona type | Questions attendues | Formule |
|---|---|---|
| Personne Âgée 60+ | 133 | 130 + 3 (bloc PA) |
| Handicap adulte | 133 | 130 + 3 (bloc Handicap) |
| Handicap + Addiction | 140 | 130 + 3 + 7 |
| Psy + MC adulte | 132 | 130 + 2 + 0 |
| Handicap enfant < 18 | 138 | 130 + 3 + 5 (bloc Enfant) |
| Psy + Addiction + MC 60+ | 139 | 130 + 0 + 2 + 7 |

**Action nécessaire** : Vérifier dans la DB actuelle que chaque persona a le bon nombre de réponses pré-remplies correspondant à son profil N3 × O1.

---

## 3. Lien avec la roadmap moteur

**Référence** : `KERNEL/STRATEGIE_PERSONNALISATION_MOTEUR.md`

| Version moteur | Impact personas |
|---|---|
| **M1 (actuel)** | 8 personas, réponses pipe-delimited → migration JSONB améliorerait la fiabilité |
| **M2 (post-expé)** | CCC + graduation → les personas doivent tester des combinaisons CCC → plus de personas ou des réponses qui triggent spécifiquement les CCC |
| **M3 (scaling)** | MTs variantes par profil → personas doivent couvrir les 3 profils prioritaires (PA 60+, Handicap adulte, MC adulte) |

### État actuel vs cible

```
Actuel (M1):
  8 personas × ~130-150 réponses (pipe-delimited)
  → Suffisant pour tester le questionnaire et le scoring

Cible M2:
  12-15 personas × ~130-150 réponses (JSONB natif)
  → Couvrir les combinaisons CCC critiques
  → Tester la graduation standard/CCC/critique
  → Personas qui triggent spécifiquement les faux amis (PA + <18)

Cible M3:
  20+ personas × réponses JSONB
  → 3 profils × 4-5 variations par profil
  → Couverture des overlays âge <18 et 60+
```

---

## 4. Note sur REFLEXION_OVERLAY_ENFANTS.md

> **Référence** : `FINAL/autres/REFLEXION_OVERLAY_ENFANTS.md`
> 
> Ce document analyse les 4 options pour le overlay enfants (A=statu quo, B=masquer, C=remplacer, D=séparé). La recommandation est **Option B** (masquer 8 questions) pour le court terme, **Option C** (remplacer par CHILD_01-06) pour le moyen terme. Ce travail n'est pas dans le scope du sprint FINISH actuel mais doit être intégré dans la roadmap M2/M3 car il impacte :
> - Le modèle additif (couche 3 overlay)
> - Les personas enfants (réponses à adapter)
> - Le scoring (2 questions scoring perdues : N7, N8)

---

## 5. Recommandation

### Action immédiate (sprint FINISH actuel)

**NE PAS migrer la DB maintenant.** Raisons :
1. Le fix BLOC 1 fonctionne avec le parsing pipe
2. Migration = risque de régression avant la démo
3. Le plan V3 est stabilisé, pas de scope creep

### Action planifiée (post-livraison, pré-M2)

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Migrer `persona_answers.answer` de TEXT vers JSONB | 2h (migration + test) | Type safety natif |
| 2 | Mettre à jour les données existantes | 30min (script SQL) | `"A\|B"` → `["A","B"]` |
| 3 | Supprimer le parsing pipe dans SimulatorPage | 15min | Code plus propre |
| 4 | Régénérer les types Supabase | 5min | Types auto-corrects |
| 5 | Vérifier cohérence personas × questions count | 1h (audit) | Alignement METHODE_VERSIONING |
| 6 | Ajouter personas CCC pour M2 | 2-3h | Couverture test |

### Script migration (à exécuter post-livraison)

```sql
-- 1. Ajouter colonne JSONB
ALTER TABLE persona_answers ADD COLUMN answer_v2 JSONB;

-- 2. Migrer les données
UPDATE persona_answers
SET answer_v2 = CASE
    WHEN answer LIKE '%|%' THEN
        -- Pipe-delimited → JSON array
        to_jsonb(string_to_array(answer, '|'))
    ELSE
        -- Single value → JSON string
        to_jsonb(answer)
    END;

-- 3. Vérifier (doit être = COUNT total)
SELECT COUNT(*) FROM persona_answers WHERE answer_v2 IS NOT NULL;

-- 4. Swap colonnes
ALTER TABLE persona_answers DROP COLUMN answer;
ALTER TABLE persona_answers RENAME COLUMN answer_v2 TO answer;
```

---

## 6. Ajout au plan.md

> **Suggestion** : Ajouter un item de documentation dans le BLOC 6 (Rapport Final) :
> 
> ```
> BLOC 6 — Rapport Final
>   └→ rapport.md + walkthrough consolidé
>   └→ Documenter migration JSONB personas (post-livraison)
>   └→ Référencer roadmap M1→M2→M3
> ```

---

*Analyse produite dans le cadre du sprint FINISH — workflow /finish-sprint V3.*
