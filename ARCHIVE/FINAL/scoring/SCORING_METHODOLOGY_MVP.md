# 🔬 Méthodologie de Scoring Monka — MVP Final

> **Date** : 21/02/2026  
> **Auteur** : Antonin Rimaud — PRAGMA Studio  
> **Statut** : ✅ Validé — Implémenté en DB + Moteur  
> **Référence** : `LIVRABLES/Audit/scoring/audit_scoring_monka.md` v1.1

---

## 1. Architecture du scoring

### Méthode de sélection : C1 + C2 + C2bis

| Critère | Rôle | Questions filtrées |
|---|---|---|
| **C1 — Informativité** | La réponse informe-t-elle sur l'intensité de la vulnérabilité ? | Exclut les questions contexte/aiguillage |
| **C2 — Fiabilité** | Peut-on attribuer un score non ambigu ? | Exclut les listes à cocher ambiguës |
| **C2bis — Comptage** | Le nombre de réponses cochées est-il un signal ? | Récupère E19 et O16 par comptage, cappé à +1 |

### Échelle de scoring

| Score | Signification | Application |
|---|---|---|
| **+0** | Pas de signal de vulnérabilité | Réponse neutre ou protectrice |
| **+1** | Signal de vulnérabilité présent | ~90 questions |
| **+2** | Signal de **risque vital** | 6 questions : idées suicidaires, chutes, maltraitance, isolement total (E2) |

### Données de scoring par vulnérabilité (post-audit v1.1)

| V | Thème | Q scorantes | Score max | Poids global |
|---|---|---|---|---|
| **V1** | Social / relationnel | 12 | **13 pts** | **15%** |
| **V2** | Administratif | 8 | **8 pts** | **10%** |
| **V3** | Santé aidant | 18 (+E19) | **20 pts** | **25%** |
| **V4** | Fragilité proche | 42 (+O16) | **45 pts** | **30%** |
| **V5** | Parcours médical | 15 | **15 pts** | **20%** |
| **TOTAL** | | **95** | **101 pts** | **100%** |

---

## 2. Score par vulnérabilité

```
Score_V% = (score_brut / max_score_V) × 100
```

Classé en 4 niveaux via **seuils en points bruts par V** (table `scoring_thresholds`) :

| V | 🟢 Faible | 🟡 Modéré | 🟠 Élevé | 🔴 Critique | Max |
|---|---|---|---|---|---|
| **V1** | 0-3 | 4-6 | 7-9 | 10-13 | 13 |
| **V2** | 0-2 | 3-4 | 5-6 | 7-8 | 8 |
| **V3** | 0-4 | 5-9 | 10-14 | 15-19 | 20 |
| **V4** | 0-11 | 12-22 | 23-33 | 34-44 | 45 |
| **V5** | 0-3 | 4-7 | 8-11 | 12-15 | 15 |

> Les seuils sont stockés en **points bruts** (pas en pourcentages). Cela permet à Dr. Monka de les ajuster cliniquement question par question si nécessaire, sans recalculer des ratios.

---

## 3. Score général pondéré

```
Score_Général = V1% × 0.15 + V2% × 0.10 + V3% × 0.25 + V4% × 0.30 + V5% × 0.20
```

Implémenté via la colonne `vulnerabilities.weight` en DB et `EngineOutput.weightedScore` dans le moteur.

---

## 4. Postulat sur les questions conditionnelles (aidance)

### Constat

Sur les 95 questions scorantes, **6 sont conditionnelles** — elles ne s'affichent que pour certains profils d'aidance :

| Question | Aidance requise | V | Score |
|---|---|---|---|
| **E64** — Accès école/structure adaptée | Enfant | V2 | +1 |
| **E65** — Besoin accompagnant spécialisé | Enfant | V2 | +1 |
| **N38** — Contrôle consommation addictive | Addiction | V4 | +1 |
| **N39** — Problèmes physiques liés à l'addiction | Addiction | V4 | +1 |
| **E50** — Suivi psychiatrique | Psy | V5 | +1 |
| **E51** — Prêt à être aidé pour l'addiction | Addiction | V5 | +1 |

### Impact sur le scoring

Le `max_score_vulnerability` en DB est calculé en **incluant** toutes les questions, y compris conditionnelles.

Conséquence : un aidant dont le profil n'active **aucun** bloc conditionnel (ex : aidant de personne âgée standard) :
- Ne verra **pas** ces 6 questions
- Ne pourra **pas** y répondre positivement
- Son score max **effectif** est inférieur au max affiché

**Écart maximal par V** :

| V | Max total | Max "standard" (sans conditionnel) | Écart |
|---|---|---|---|
| V2 | 8 pts | **6 pts** (-E64, -E65) | -25% |
| V4 | 45 pts | **43 pts** (-N38, -N39) | -4.4% |
| V5 | 15 pts | **13 pts** (-E50, -E51) | -13.3% |

### Postulat MVP retenu ✅

> **Le score max est identique pour tous les profils.**

Justification :
1. **6 questions sur 95** = ~6% de l'ensemble → impact marginal sur le score global pondéré
2. L'aidant standard **ne peut pas atteindre 100%** sur V2 et V5, mais c'est acceptable car 100% signifierait "détresse absolue sur chaque question" — cliniquement irréaliste de toute manière
3. L'alternative (max adaptatif par profil) introduit de la complexité pour un gain faible au MVP
4. Les scores restent **comparables entre profils** tant que l'on compare les niveaux (Faible/Modéré/Élevé/Critique) et non les pourcentages bruts

### V2 — Max adaptatif par profil aidance

En V2, le moteur pourra ajuster `max_score_vulnerability` en fonction du profil N3/O1 actif :

```
max_effectif = max_total - Σ(scores des questions non-actives pour ce profil)
```

Cela permettra :
- Des pourcentages strictement comparables entre profils
- Un aidant standard pouvant atteindre 100% s'il est en détresse totale
- Aucune interprétation propre à un type d'aidance — juste un max ajusté

Le tableau croisé V × Aidance est documenté dans `audit_scoring_monka.md` §P3.

---

## 5. Modifications DB implémentées (21/02/2026)

| Changement | Table | Impact |
|---|---|---|
| E2="Personne" → score +2 | `scoring_questions` | V1 max 12 → **13** |
| E19 scorante (comptage, cap +1) | `scoring_questions` | V3 max 19 → **20** |
| O16 scorante (comptage, cap +1) | `scoring_questions` | V4 max 44 → **45** |
| Pondération inter-V | `vulnerabilities.weight` | Nouvelle colonne |
| V1 seuil critique max | `scoring_thresholds` | 12 → **13** |

---

## 6. Modifications moteur implémentées

| Fichier | Changement |
|---|---|
| `supabaseData.ts` | `DBVulnerability.weight` ajouté |
| `clinicalEngine.ts` | `computeScore` : support multi-choix + cap par question (C2bis) |
| `clinicalEngine.ts` | `EngineOutput.weightedScore` : score global pondéré 0-100 |

---

## 7. Décisions ouvertes

| # | Sujet | Phase |
|---|---|---|
| D2 | Seuils adaptatifs par V (en points bruts) vs uniformes | Quand données empiriques disponibles |
| D3 | Max adaptatif par profil aidance | V2 |
| D6 | Flag JNSP (alerte ≥3 "Je ne sais pas") | V2 |
| D7 | Enrichissement échelle +0/+1/+2/+3 (uniforme) | V2 post-pilote |
