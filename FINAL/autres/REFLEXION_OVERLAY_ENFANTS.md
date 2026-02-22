# 🧒 Réflexion — Overlay Enfants (O1 < 18 ans)

> **Date** : 21/02/2026
> **Contexte** : Le questionnaire Monka a 165 questions conçues pour un socle commun. Quand l'aidé est un enfant (O1 = "15-17 ans"), certaines questions ne sont plus pertinentes. Faut-il les remplacer par des questions adaptées ?

---

## 1. ÉTAT DES LIEUX — Ce qui existe déjà

### 1.1 — Le champ `aidance` dans la DB

Le questionnaire gère **déjà** 5 profils via le champ `aidance` sur chaque question :

| Valeur `aidance` | Nb questions | Signification |
|---|---|---|
| **Tous** | 152 | Socle commun — posées à tous les aidants |
| **Enfant** | 4 | Uniquement si O1 = "15-17 ans" |
| **Personne Agée** | 2 | Uniquement si N3 = "Personne âgée" |
| **Handicap** | 4 | Uniquement si N3 = "Handicap" |
| **Addiction** | 3 | Uniquement si N3 = "Addiction" |

### 1.2 — Les 4 questions déjà spécifiques enfants

| ID | Question | Bloc | Condition |
|---|---|---|---|
| **E64** | L'enfant peut-il fréquenter école/structure adaptée (IME, ULIS) ? | V2 Inclusion | N3 ≠ 1 ET O1 = 1 |
| **E65** | Besoin d'un accompagnant spécialisé (AESH, AVS) ? | V2 Inclusion | N3 ≠ 1 ET O1 = 1 |
| **E59** | Orienté vers structure spécialisée TND ? | V5 Parcours | N3 = 2 ou 4 ET O1 = 1 |
| **E60** | Quels professionnels déjà intervenus (CAMSP, CMP, CMPP) ? | V5 Parcours | N3 = 2 ou 4 ET O1 = 1 |

### 1.3 — Les questions conditionnelles liées à l'âge

| ID | Question | Filtre | Impact enfant |
|---|---|---|---|
| **E38** | Transition services enfant → adulte préparée ? | O1 = 1 | ✅ Déjà ciblée enfant |
| **E58** | Évaluation spécialisée liée à l'âge (consultation mémoire, gériatrique) ? | N3 = 1 ou 3 | ⛔ Exclue pour enfants (condition N3) |
| **O53** | Dépendance évaluée (grille AGGIR) ? | Personne Agée | ⛔ Exclue pour enfants |
| **O54** | Niveau GIR ? | Conditionnel O53 | ⛔ Exclue pour enfants |

**Verdict : le questionnaire gère DÉJÀ une partie du profil enfant** via les triggers N3 et O1.

---

## 2. QUESTIONS DU SOCLE PROBLÉMATIQUES POUR LES ENFANTS

### 2.1 — Questions à masquer (non pertinentes < 18 ans)

| ID | Question | V | Raison |
|---|---|---|---|
| **O53** | AGGIR évalué ? | V4 | AGGIR = dispositif 60+ ans |
| **O54** | Niveau GIR ? | V4 | Idem |
| **E61** | Directives anticipées rédigées ? | V2 | Pas applicable aux mineurs |
| **E58** | Bilan gériatrique / consultation mémoire ? | V5 | Réservé aux personnes âgées |
| **N7** | Aménagement activité professionnelle ? | V1 | L'enfant n'a pas d'activité pro |
| **N8** | Arrêt de travail lié à l'aidance ? | V3 | Idem — concerne l'aidant mais le wording mentionne "rôle d'aidant" dans un contexte adulte |
| **E20** | Où souhaiteriez-vous que vive votre proche dans 6-12 mois ? | V4 | Options (EHPAD, domicile autonome) pas adaptées enfant |
| **O51** | Adapter le lieu de vie ? | V4 | Options orientées "autonomie seniors" |

> **Total : ~8 questions à masquer** (déjà 2 gérées par les conditions aidance=Personne Agée)

### 2.2 — Questions à reformuler (pertinentes mais wording inadapté)

| ID | Question actuelle | Reformulation enfant |
|---|---|---|
| **N23** | "Difficultés à maintenir activité professionnelle/occupationnelle/scolaire ?" | OK tel quel — le "scolaire" est déjà prévu |
| **E23** | "Combien de temps peut-il rester seul sans risque ?" | OK — pertinent aussi pour un enfant handicapé |
| **O3** | "Combien de médicaments différents prend-elle par jour ?" | OK — pertinent pour enfant médicamenté |
| **N9** | "Problèmes pour gérer son budget/affaires admin ?" | ⚠️ L'enfant ne gère pas de budget — **reformuler** : "Rencontrez-vous des difficultés pour gérer les affaires administratives de votre enfant ?" |
| **E4** | "Comment a évolué votre relation avec lui/elle ?" | OK — pertinent parents-enfant |
| **O30** | "Sentiment de ne plus reconnaître la personne aidée ?" | ⚠️ Wording conçu pour maladies neurodégénératives — **reformuler** pour TND/handicap : "Avez-vous le sentiment que le comportement de votre enfant a changé de manière importante ?" |

> **Total : ~2 questions à reformuler** (les autres du socle sont naturellement universelles)

---

## 3. LES 4 SOLUTIONS POSSIBLES

### Option A — Statu quo (ne rien faire)

**Principe** : Le profil enfant est déjà filtré par N3/O1. Les 8 questions non pertinentes sont marginales (5% du questionnaire).

| ✅ | ❌ |
|---|---|
| Zéro effort | L'aidant voit 8 questions inadaptées (AGGIR, directives anticipées, EHPAD...) |
| Pas de risque de régression | Impression de "questionnaire pas fait pour moi" |

**Verdict** : ❌ Risque UX réel si l'aidant est parent d'un enfant handicapé → perte de crédibilité.

---

### Option B — Overlay simple (masquer les questions non pertinentes)

**Principe** : Si O1 = "15-17 ans", masquer les ~8 questions non pertinentes. Pas de remplacement.

**Implémentation** :
```
questions.aidance IN ('Tous', 'Enfant')
AND questions.id NOT IN ('O53','O54','E61','E58')  -- déjà géré par aidance
-- + filtrer N7, N8, E20, O51 si O1 = "15-17"
```

| ✅ | ❌ |
|---|---|
| Effort minimal (~1h moteur) | Questionnaire plus court (150-8 = 142 questions) → moins d'infos pour le moteur |
| Aucune question inadaptée | Pas de questions de remplacement → trous dans V2 et V4 |

**Verdict** : ✅ Acceptable pour un MVP enfant. Le questionnaire reste cohérent.

---

### Option C — Overlay enrichi (masquer + remplacer par des questions enfant)

**Principe** : Masquer les 8 questions + ajouter 6-8 questions spécifiques enfants qui couvrent les mêmes dimensions cliniques.

**Questions de remplacement proposées** :

| ID | Question | Remplace | V | Dimension couverte |
|---|---|---|---|---|
| **CHILD_01** | "Votre enfant bénéficie-t-il d'un Projet Personnalisé de Scolarisation (PPS) ?" | E61 (directives anticipées) | V2 | Protection/anticipation |
| **CHILD_02** | "Avez-vous un dossier MDPH en cours ou à jour pour votre enfant ?" | O53/O54 (AGGIR) | V4 | Niveau de reconnaissance du handicap |
| **CHILD_03** | "Quel est le taux d'incapacité reconnu par la MDPH ?" (conditionnel CHILD_02) | O54 (GIR) | V4 | Gravité objectivée |
| **CHILD_04** | "Votre enfant peut-il participer à des activités avec d'autres enfants de son âge ?" | N7 (activité pro) | V1 | Inclusion sociale |
| **CHILD_05** | "Avez-vous envisagé un mode de garde ou d'accueil adapté pour votre enfant ?" | E20 (lieu de vie seniors) | V4 | Projection/anticipation |
| **CHILD_06** | "Les soins de votre enfant nécessitent-ils votre présence permanente ?" | O51 (adapter lieu de vie) | V4 | Charge de présence |

| ✅ | ❌ |
|---|---|
| Questionnaire vraiment adapté | +6 questions à créer, valider cliniquement, et intégrer au moteur |
| Même couverture clinique | Rules d'activation à créer pour ces 6 questions |
| Impression "fait pour moi" | Scoring à recalibrer pour V4 (poids des questions AGGIR remplacé) |

**Verdict** : ✅ Solution idéale à terme. Nécessite validation Dr. Monka.

---

### Option D — Questionnaire enfant séparé

**Principe** : Créer un questionnaire dédié enfants (80-100 questions) avec son propre scoring.

| ✅ | ❌ |
|---|---|
| Parfaitement adapté | Doublement du travail (150Q + 100Q) |
| Scoring spécifique enfant | 24 nouveaux MPs ? Non — les V1-V5 s'appliquent aussi aux enfants |
| | Maintenance double |

**Verdict** : ❌ Disproportionné. L'architecture V1-V5 est valide pour tous les profils. 95% du questionnaire est déjà universel.

---

## 4. IMPACT PAR SOLUTION

| Critère | Option A (Statu quo) | Option B (Masquer) | Option C (Remplacer) | Option D (Séparé) |
|---|---|---|---|---|
| **Effort dev** | 0 | 1h | 4-6h | 40-60h |
| **Effort clinique** | 0 | 0 | 2h validation | 20h+ |
| **UX enfant** | ❌ Mauvaise | ✅ Correcte | ✅ Excellente | ✅ Excellente |
| **Couverture clinique** | 100% (avec bruit) | 95% (trous mineurs) | 100% (adaptée) | 100% (dédiée) |
| **Scoring** | Inchangé | 2 questions scoring en moins | Réalignment nécessaire | Tout nouveau |
| **Maintenabilité** | ✅ | ✅ | ✅ | ❌❌ |
| **Risque** | UX dégradée | Aucun | Faible | Élevé |

---

## 5. MA RECOMMANDATION

### Court terme (maintenant) → **Option B**

Masquer les 8 questions non pertinentes quand O1 = "15-17 ans". C'est propre, rapide, et suffisant pour Klesia V1 où le profil enfant est minoritaire.

**Implémentation** : Ajouter un champ `exclude_if_child BOOLEAN DEFAULT FALSE` sur les 8 questions, ou simplement les filtrer côté moteur quand O1 indique un mineur.

### Moyen terme (quand volume enfants significatif) → **Option C**

Créer les 6 questions de remplacement (CHILD_01 à CHILD_06), les valider avec Dr. Monka, et les intégrer aux rules d'activation et au scoring.

**Déclencheur** : >10% des utilisateurs avec O1 = "15-17 ans" sur 3 mois consécutifs.

### Ne jamais faire → **Option D**

L'architecture V1-V5 est universelle. La séparer serait un anti-pattern clinique.

---

## 6. IMPACT SUR LE SCORING (si Option B ou C)

### Questions scoring impactées

| Question masquée | Dans scoring_questions ? | Impact |
|---|---|---|
| O53 (AGGIR) | Non — aidance "Personne Agée", déjà exclue | ✅ Aucun |
| O54 (GIR) | Non — conditionnel O53, déjà exclue | ✅ Aucun |
| E61 (Directives) | Non — classificaton "facteur" seulement | ⚠️ Perd 1 signal V2 |
| E58 (Bilan gériatrique) | Non — conditionnel N3=1/3, déjà exclue | ✅ Aucun |
| N7 (Aménagement pro) | Oui — scoring V1 | ⚠️ Perd 1 signal V1 |
| N8 (Arrêt travail) | Oui — scoring V3 | ⚠️ Perd 1 signal V3 |
| E20 (Lieu de vie) | Non | ✅ Aucun |
| O51 (Adapter lieu) | Non | ✅ Aucun |

**Verdict** : 2 questions scoring impactées (N7, N8) mais elles mesurent l'impact sur le travail — peu pertinent pour un aidant d'enfant qui est souvent le parent et adapte naturellement sa vie pro. Le scoring reste valide sans elles, le max_score_vulnerability est recalculé dynamiquement.

---

> 🧒 **CONCLUSION** : Le questionnaire est déjà **à 95% universel**. Le problème est marginal (8 questions sur 165). L'Option B (masquer) est la bonne approche maintenant, l'Option C (remplacer) est à prévoir si le volume enfant augmente.
