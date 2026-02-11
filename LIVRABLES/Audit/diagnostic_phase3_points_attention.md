# ⚠️ Phase 3 — Diagnostic et Points d'Attention

> **Date** : 10/02/2026

---

## 1. Correction : Aucun texte de reco n'a été généré par l'IA

> [!IMPORTANT]
> **Les 238 textes de recos viennent TOUS du legacy (Dr. Monka).** L'IA n'a inventé aucune reco.

Le champ `source` dans la base a 3 valeurs, mais elles concernent des choses différentes :

| Valeur | Ce que ça veut dire | Le texte de la reco |
|---|---|---|
| `legacy` (228) | Texte recopié tel quel, règle trouvée automatiquement | ✅ Intact du legacy |
| `ia_reformulé` (10) | 2+ textes quasi-identiques fusionnés en 1 | ⚠️ Texte = le plus long des variantes |
| `ia_proposé` (0 textes) | — | Aucun texte n'a été inventé |

Le label `rule_assignment: ia_proposé` (104 recos) signifie que **l'IA a choisi quelle activation_rule rattacher** (pas le texte). C'est un raccourci de nommage confus que je corrige.

---

## 2. Pourquoi certains MPs ont beaucoup de recos ?

| MP | Recos | Explication |
|---|---|---|
| M6 | 30 | Pas d'activation_rules → 30 recos legacy brutes non structurées |
| M4 | 29 | 1 seule rule (`standard`) → chaque réponse = 1 reco |
| F1 | 19 | 5 questions × ~4 réponses chacune |
| **M2** | **18** | E40 à elle seule donne 8 recos (1 par option de réponse) |
| M3 | 18 | 8 rules × mix questions |

**Le problème** : dans le legacy, chaque **réponse** avait sa propre reco. Ce n'est PAS l'architecture cible du moteur Monka (où 1 reco = 1 conseil structuré, activé par une règle, pas par une réponse individuelle).

### Exemple concret — M2, question E40 (« Quelle difficulté d'accès aux soins ? »)

```
Legacy (8 recos séparées) :
  Réponse "transport"  → "Mettre en place des solutions de transport"
  Réponse "numérique"  → "Accompagner l'utilisation des outils numériques"
  Réponse "RDV"        → "Aider à coordonner les rendez-vous"
  Réponse "financier"  → "Identifier des aides financières"
  Réponse "délais"     → "Identifier des solutions pour réduire les délais"
  Réponse "disponibilité" → "Faciliter l'accès à des professionnels disponibles"
  Réponse "autre"      → "Identifier la difficulté spécifique"
  Réponse "aucune"     → "Maintenir la situation actuelle"
```

Dans l'architecture cible, cela devrait être **1 seule reco** du type « Faciliter l'accès aux soins selon la difficulté identifiée » avec des MT granulaires dessous.

---

## 3. Les vrais chiffres

| Métrique | Valeur | Commentaire |
|---|---|---|
| Recos totales | 238 | Toutes issues du legacy |
| Recos "trop granulaires" (1 par réponse) | ~120 | MPs M4, M6, M2, M3, F1, F4 |
| Recos "bonne granularité" | ~118 | MPs V1, V3, V5, certains V2 |
| MT rattachées | 299/299 | Matching IA à valider |
| MPs sans activation_rules | 3 | A4, F6, M6 |

---

## 4. Décision à prendre

### Option A : Garder la granularité actuelle (1 reco par réponse)
- ✅ Fidèle au legacy, plus personnalisé
- ❌ 238 recos c'est beaucoup, difficile à maintenir
- ❌ Pas cohérent avec l'architecture cible

### Option B : Regrouper davantage (1-3 recos par question au lieu de par réponse)
- ✅ ~80-100 recos au total, plus gérable
- ✅ Cohérent avec l'architecture (reco = conseil structuré + MT)
- ❌ Perd la personnalisation par réponse (mais les MT compensent)

### Option C : Garder pour l'instant, regrouper en Phase Templates
- ✅ On avance, pas de perte de données
- ✅ Le regroupement se fait naturellement quand on remplit les templates

> **Ma reco** : Option C — on garde les 238 en base comme matière première, et le regroupement se fera naturellement quand on remplira les templates (car les templates ont une structure 1 MP → quelques recos → MT). On ne perd rien.

---

## 5. Les 3 MPs sans activation_rules

| MP | Recos | Pourquoi pas de rules |
|---|---|---|
| A4 | 3 | Vulnérabilité V5 (Administrative) sous-documentée |
| F6 | 9 | Autonomie fonctionnelle — probablement un oubli |  
| M6 | 30 | Plan de soins — probablement un oubli |

**Action requise** : Dr. Monka doit définir les activation_rules pour ces 3 MPs (quelles combinaisons de questions les activent et à quel niveau).
