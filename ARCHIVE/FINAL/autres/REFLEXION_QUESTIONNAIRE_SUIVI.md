# 🔄 Questionnaire de Suivi — Réflexion Architecturale

> **Date** : 22 février 2026  
> **Statut** : Réflexion ouverte — décisions à prendre  
> **Contexte** : Le Kernel V5 mentionne ~30 questions de suivi (marquées "Définies ✅") mais aucun cadre formel n'existe pour les greffer sur le moteur.

---

## 1. Ce qui existe déjà

### En DB : `suivi_questions` (30 lignes)

Structure hiérarchique à 3 niveaux :

```
Niveau 1 — S000 : "Y a-t-il eu des changements dans votre situation ?"
│
├── Niveau 2 — S_V1 : "Changements / entourage et relations ?" (V1)
│   ├── Niveau 3 — S_R1 : "Changements / impact vie perso et pro ?"
│   │   └── questions_reouvertes: [N7, O27, O28]
│   ├── S_R2 → [E1, E2, E3, N4]
│   ├── S_R3 → [N20, O47, O48]
│   └── S_R4 → [E4, E5, E6, O30, O31]
│
├── S_V3 : "Changements / votre santé ?" (V3)
│   ├── S_S1 → [E10, E11, E14, E7, N8, O29, O32, O33, O50]
│   ├── S_S2 → [E12, E13, E8, E9]
│   ├── S_S3 → [E18, O37-O44]
│   └── S_S4 → [E15, E16, E17, E19]
│
├── S_V2 : "Changements / fragilités du proche ?" (V4)
│   ├── S_F1 → [E20, E21, N10, N21, N23, N27, N9, O51]
│   └── S_F2 → [E22-E24, N18, N36, O8, O9]
│   └── ... (F3-F6 probablement)
│
├── S_V4 : "Changements / parcours médical ?" (V5)
│   └── ... (M1-M6)
│
└── S_V5 : "Changements / démarches admin ?" (V2)
    └── ... (A1-A4)
```

### Le principe décrit dans le Kernel V5 (L157-159)

> "Périodiquement, le système demande : « Y a-t-il eu des changements concernant [thème du MP] ? »  
> Si l'aidant répond oui → les questions du MP sont réouvertes → les règles sont réévaluées → les recos sont mises à jour."

### Ce qui est clair
- La structure des questions de suivi existe
- Le mapping question de suivi → questions originales est fait (`questions_reouvertes`)
- Le principe du cycle est décrit

### Ce qui n'est PAS clair — et c'est la question

**Rien n'est spécifié sur le COMMENT.** Les questions qui suivent sont toutes ouvertes.

---

## 2. Les 12 questions non résolues

### A — Temporalité

**Q1 : Quand déclenche-t-on le questionnaire de suivi ?**

| Option | Description | Ma reco |
|---|---|---|
| **A.1 — Périodique fixe** | Tous les X jours/mois (30j, 60j, 90j) | Simple mais rigide. Pas adapté à la situation. |
| **A.2 — Basé sur le délai du MP** | Chaque MP a son propre rythme de réévaluation selon le `delai_jours` de ses rules | ✅ **Recommandé.** Un CRIT (7j) se réévalue plus vite qu'un STD (90j). |
| **A.3 — Déclenché par l'IDEC** | L'IDEC décide quand relancer le suivi | Plus clinique mais pas automatisable. |
| **A.4 — Hybride** | Périodique par défaut + l'IDEC peut forcer un suivi anticipé | ✅ **Le plus réaliste.** |

> **💡 Reco** : Option A.4 — rythme de base calé sur le `delai_jours` le plus court du profil + possibilité de forcer.

**Q2 : Le suivi est-il global (toutes les V) ou ciblé (seulement les MPs activés) ?**

| Option | Impact | Ma reco |
|---|---|---|
| **B.1 — Global** | On repasse par les 5V à chaque suivi | Lourd. L'aidant peut se lasser. |
| **B.2 — Ciblé sur les MPs activés** | On ne pose les questions que pour les MPs actifs | Risque de rater un MP qui passerait de PREV à CRIT. |
| **B.3 — Ciblé + question de détection large** | MPs activés en détail + 1 question "autre chose a changé ?" pour les non-activés | ✅ **Le meilleur compromis.** La S000 fait déjà ce rôle. |

> **💡 Reco** : Option B.3 — la structure hiérarchique existante le permet déjà.

---

### B — Mécanique de réévaluation

**Q3 : Que se passe-t-il quand l'aidant répond "Oui, changement" ?**

Le Kernel dit : "les questions du MP sont réouvertes". Mais concrètement :

| Étape | Question |
|---|---|
| 1 | L'aidant ré-répond aux questions listées dans `questions_reouvertes` |
| 2 | Les nouvelles réponses **remplacent** les anciennes ? Ou s'**ajoutent** ? |
| 3 | Le moteur recalcule les rules → le niveau du MP peut changer |
| 4 | Les recos et MTs sont mises à jour en conséquence |

**Q4 : Les anciennes réponses sont-elles conservées (historique) ou écrasées ?**

| Option | Impact | Ma reco |
|---|---|---|
| **C.1 — Écrasement** | Seule la dernière réponse compte | Simple mais perte de l'historique. |
| **C.2 — Historique versionné** | Chaque session de réponse est horodatée | ✅ **Indispensable pour la certification.** Permet de tracer l'évolution. |

> **💡 Reco** : Option C.2 — il faut un concept de **session d'évaluation**. Chaque réponse est liée à un `assessment_id` + `timestamp`. On garde toutes les versions.

**Q5 : Le scoring est-il recalculé partiellement ou totalement ?**

| Option | Impact | Ma reco |
|---|---|---|
| **D.1 — Recalcul total** | Tout le scoring V1-V5 depuis 0 à chaque suivi | Incohérent si on n'a répondu qu'à 3 questions sur 150 |
| **D.2 — Recalcul partiel** | Seules les questions réouvertes impactent le score | ✅ Les questions non réouvertes conservent leur réponse précédente. Le score est recalculé avec le mix ancien+nouveau. |

> **💡 Reco** : Option D.2 — le "snapshot" de réponses est : dernières réponses de chaque question, quelle que soit la session.

---

### C — Impact sur les MPs et recos

**Q6 : Un MP peut-il CHANGER de niveau suite au suivi ?**

Oui — c'est le but. Exemples de scénarios :

| Avant suivi | Suivi dit | Après suivi |
|---|---|---|
| R2 = CRIT (aidant seul + 0 entourage) | "J'ai mobilisé mes frères" → E1 passe de "seul" à "partagé" | R2 = STD → downgrade |
| S1 = PREV (pas d'épuisement) | "Je me sens épuisé" → E7 passe à "extrêmement" | S1 = CRIT → upgrade |
| F3 = CCC | "Des troubles cognitifs sont apparus" → O13 = "altération totale" | F3 = CRIT → upgrade |

**Q7 : Un MP peut-il se DÉSACTIVER suite au suivi ?**

| Option | Impact | Ma reco |
|---|---|---|
| **E.1 — Oui** | Si les conditions ne sont plus remplies, le MP passe à PREV | ✅ **Logique clinique.** Si la situation s'améliore, le MP passe en prévention. |
| **E.2 — Non, une fois activé = activé** | Le MP reste actif même si l'amélioration est constatée | Trop conservateur. L'aidant pourrait se sentir "bloqué". |
| **E.3 — Oui mais avec un délai de grâce** | Le MP reste actif encore 1 cycle avant de passer en PREV | ✅ **Prudent et cliniquement correct.** Évite les allers-retours. |

> **💡 Reco** : Option E.3 — un MP qui s'améliore passe en "surveillance" pendant 1 cycle avant de basculer en PREV.

**Q8 : Les MTs déjà "faites" sont-elles conservées ?**

C'est LA question stratégique. Si l'aidant a fait 3 MTs sur 5 dans un MP :

| Option | Impact | Ma reco |
|---|---|---|
| **F.1 — Reset total** | Toutes les MTs sont reproposées | Frustrant. L'aidant a l'impression de recommencer. |
| **F.2 — Conservation des accomplies** | Les MTs marquées "faites" restent faites. Seules les non-faites sont reproposées. | ✅ **Respectueux du travail accompli.** |
| **F.3 — Archivage + nouvelles** | Les anciennes sont archivées (visibles dans l'historique) et de nouvelles sont proposées si le niveau a changé | ✅ **Le plus complet.** Combinable avec F.2. |

> **💡 Reco** : F.2 + F.3 — les MTs faites restent faites. Si le niveau change (STD → CRIT), les MTs du nouveau niveau sont ajoutées mais celles déjà accomplies ne sont pas reproposées.

---

### D — Architecture technique

**Q9 : Faut-il une table `assessments` / `sessions` ?**

**Oui, obligatoirement.** Sans elle, on ne peut pas tracer l'évolution.

```sql
-- Proposition de schéma
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT CHECK (type IN ('initial', 'suivi', 'idec_force')),
  trigger_source TEXT, -- 'periodic', 'idec', 'user_request'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE assessment_responses (
  id SERIAL PRIMARY KEY,
  assessment_id UUID REFERENCES assessments(id),
  question_id TEXT REFERENCES questions(id),
  response TEXT NOT NULL,
  previous_response TEXT, -- pour tracer le delta
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Q10 : Faut-il stocker l'état des MPs à chaque évaluation ?**

| Option | Ma reco |
|---|---|
| Non, on recalcule à la volée | Pas fiable — les rules peuvent changer |
| ✅ Oui, snapshot des MPs | **Indispensable.** On stocke : MP, niveau, score, date |

```sql
CREATE TABLE assessment_mp_states (
  id SERIAL PRIMARY KEY,
  assessment_id UUID REFERENCES assessments(id),
  mp_id TEXT REFERENCES micro_parcours(id),
  niveau TEXT NOT NULL,
  score NUMERIC,
  activated BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Q11 : Comment le moteur sait quelles questions poser ?**

Algorithme proposé :

```
1. Charger les MPs activés du dernier assessment
2. Pour chaque MP activé :
   a. Trouver la suivi_question correspondante (S_R1, S_F3, ...)
   b. Demander : "Y a-t-il eu des changements ?"
   c. Si OUI → réouvrir les questions listées dans `questions_reouvertes`
3. En plus : question générale S000 pour les V non activées
4. Si S000 = OUI → descendre au niveau 2 (S_V*)
5. Si S_V* = OUI → descendre au niveau 3 (S_MP*)
6. Pour chaque S_MP* = OUI → réouvrir les questions
```

**Q12 : Impact sur le CR Médecin et les exports ?**

Le CR Médecin doit montrer :
- **L'évolution** : "Depuis le dernier suivi, la situation V1 s'est améliorée"
- **Le delta** : "R2 est passé de CRIT à STD"
- **Ce qui a été fait** : "3 MTs accomplies sur 5"

---

## 3. Synthèse des recommandations

| # | Question | Reco |
|---|---|---|
| Q1 | Quand ? | Hybride : périodique (base = delai_jours le plus court) + force par IDEC |
| Q2 | Global ou ciblé ? | Ciblé + détection large (structure hiérarchique existante) |
| Q3 | Que fait "Oui" ? | Réouverture des `questions_reouvertes` → re-réponse → réévaluation |
| Q4 | Historique ? | Versionné (mandatory pour certif) — table `assessments` |
| Q5 | Scoring partiel/total ? | Partiel — mix dernières réponses de chaque question |
| Q6 | MP change de niveau ? | Oui — upgrade et downgrade possibles |
| Q7 | MP peut se désactiver ? | Oui avec délai de grâce (1 cycle avant PREV) |
| Q8 | MTs déjà faites ? | Conservées. Nouvelles MTs si changement de niveau. |
| Q9 | Table sessions ? | Oui — `assessments` + `assessment_responses` |
| Q10 | Snapshot MPs ? | Oui — `assessment_mp_states` |
| Q11 | Algo de questions ? | Hiérarchique : S000 → S_V* → S_MP* → réouverture |
| Q12 | CR Médecin ? | Montrer l'évolution, le delta, et les MTs accomplies |

---

## 4. Ce qu'il faut statuer AVANT d'implémenter

> [!IMPORTANT]
> **3 décisions structurantes** qui conditionnent tout le reste :

### Décision 1 — Le rythme de suivi
- [ ] Tous les X jours fixes ? OU basé sur le `delai_jours` ? OU déclenché par l'IDEC ?
- **Impact** : dimensionne le nombre de sessions et la charge utilisateur

### Décision 2 — Le versioning des réponses
- [ ] Écraser (simple) OU historiser (certifiable) ?
- **Impact** : si on historise, il faut créer les tables `assessments` + `assessment_responses` + `assessment_mp_states`

### Décision 3 — La désactivation des MPs
- [ ] Un MP amélioré peut-il repasser en PREV ? Avec ou sans délai de grâce ?
- **Impact** : change la logique du moteur de reco et l'affichage pour l'aidant

---

## 5. Schéma d'architecture proposé

```
┌─────────────────────────────────────────────────────┐
│                    ASSESSMENT                        │
│  type: initial | suivi | idec_force                 │
│  created_at: 2026-03-15                             │
├─────────────────────────────────────────────────────┤
│  RESPONSES                                           │
│  E1 = "Plutôt équilibrée" (prev: "Je suis seul·e")  │
│  E2 = "Oui, plusieurs" (prev: "Personne")           │
│  ... (seules les questions réouvertes)               │
├─────────────────────────────────────────────────────┤
│  MP STATES (snapshot post-réévaluation)              │
│  R2 = STD  (prev: CRIT) ↓ downgrade                │
│  S1 = CRIT (prev: PREV) ↑ upgrade                  │
│  F3 = CCC  (prev: CCC)  = stable                   │
└─────────────────────────────────────────────────────┘
```

Ce schéma permet :
1. **Traçabilité** : chaque évaluation est datée et versionnée
2. **Delta** : on voit ce qui a changé entre 2 sessions
3. **Certification** : preuve de processus d'amélioration continue
4. **CR Médecin** : export automatique de l'évolution
