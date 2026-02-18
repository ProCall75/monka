# SCORING V2 — Administrative

> **Vulnérabilité** : V2 — Administrative
> **Ancrage scientifique** : Zarit (ZBI-22) — fardeau de l'aidant (charge administrative)
> **Date d'analyse** : 16/02/2026
> **Méthode** : METHODOLOGIE_SCORING.md §3 (2 conditions) + §4 (échelle +0/+1/+2)
> **Source données** : Supabase DB `questions` (table) — 16/02/2026

---

## Métadonnées

| Métrique | Valeur |
|----------|--------|
| Questions totales V2 | 18 |
| Questions scorantes | **8** / 18 |
| Questions non scorantes | 10 |
| Questions +2 éligibles | 0 |
| Score max théorique | **11 pts** |
| Normalisation | Score = (brut / 11) × 100 |

---

## Tableau d'analyse — 1 ligne par question

| Q_ID | Intitulé | Classif | Sous-bloc | C1 Informativité | C2 Fiabilité | Verdict | Options → Score |
|------|----------|---------|-----------|-------------------|--------------|---------|-----------------|
| **O45** | Quelle couverture de santé avez-vous ? | facteur | Couverture santé (aidant) | ❌ Contexte administratif factuel — le type de couverture ne mesure pas une intensité de vulnérabilité. Avoir la CMU ne signifie pas "être plus vulnérable administrativement" | — | ❌ **NON SCORANTE** | — |
| **O23** | Quelle couverture de santé protège la personne aidée ? | facteur | Couverture santé (proche) | ❌ Même logique que O45 — contexte factuel sur le proche. Informe l'aiguillage, pas l'intensité | — | ❌ **NON SCORANTE** | — |
| **N6** | Une mesure de protection a-t-elle été mise en place ? | facteur | Protection juridique | ❌ Recense un **dispositif existant** (tutelle, curatelle, etc.) — c'est une action passée, pas une intensité de vulnérabilité. L'absence de protection peut être un signal mais c'est capté par E61/E66 | — | ❌ **NON SCORANTE** | — |
| **E61** | Votre proche a-t-il rédigé des directives anticipées ? | facteur | Protection juridique | ❌ Recense une **action passée** — la rédaction de directives anticipées. Utile pour l'aiguillage, mais ne mesure pas l'intensité de la charge administrative | — | ❌ **NON SCORANTE** | — |
| **N42** | Bénéficie-t-elle déjà d'une aide pour prestations sociales ALD ? | facteur | Droits & aides | ❌ Recense l'**existence d'un accompagnement** — action passée. Conditionnel (N41=1), ambiguïté si non posée | — | ❌ **NON SCORANTE** | — |
| **N29** | De quels droits/aides bénéficiez-vous actuellement ? | facteur | Droits & aides | ❌ **Liste à cocher variable** (22 options possibles) — recense des dispositifs existants. Pas d'échelle d'intensité, pas de "plus ou moins grave". C2 échoue aussi | — | ❌ **NON SCORANTE** | — |
| **E62** | Pour quels droits/aides avez-vous une demande en cours ? | facteur | Droits & aides | ❌ **Liste à cocher variable** (22 options) — même logique que N29. Recense des actions administratives en cours | — | ❌ **NON SCORANTE** | — |
| **N43** | Avez-vous bénéficié d'accompagnements administratifs ? | facteur | Accompagnement | ❌ **Liste à cocher** (10 options) — recense les dispositifs utilisés. Pas d'échelle d'intensité. Avoir vu une assistante sociale ne dit pas si on souffre | — | ❌ **NON SCORANTE** | — |
| **N5** | Avez-vous eu recours aux aides suivantes ? | facteur | Accompagnement | ❌ Recense les **recours passés** (répit, formations, psy) — actions, pas intensité. "Aucune" pourrait sembler scorable mais l'absence de recours ne mesure pas la charge administrative | — | ❌ **NON SCORANTE** | — |
| **O61** | Pensez-vous avoir les moyens financiers suffisants ? | facteur | Situation financière | ✅ La perception de précarité financière est un signal d'intensité directe — l'aidant dit "je n'ai pas les moyens" = vulnérabilité financière vécue | ✅ Oui/Non → non ambigu | ✅ **SCORANTE** | Oui = +0 · Non = +1 |
| **E63** | Quelles démarches vous préoccupent le plus en ce moment ? | etat | Démarches prioritaires | ❌ **Liste à cocher variable** (8 options) — recense les préoccupations mais sans échelle de "plus ou moins préoccupé". C2 échoue (pas d'ordre d'intensité entre les options) | — | ❌ **NON SCORANTE** | — |
| **E64** | Votre enfant peut-il fréquenter une école adaptée ? | facteur | Inclusion | ✅ L'accès à une structure adaptée impacte directement la charge de l'aidant — si l'enfant ne fréquente aucune structure, l'aidant supporte 100% de la présence | ✅ 4 options ordonnées (sans difficulté → ne fréquente pas) | ✅ **SCORANTE** | Sans difficulté = +0 · Avec aménagements = +0 · Très difficile = +1 · Non = +1 |
| **E65** | Votre enfant a-t-il besoin d'un accompagnant spécialisé ? | facteur | Inclusion | ✅ Le besoin non couvert d'accompagnant est un signal d'intensité — l'aidant compense le manque | ✅ Non / Oui en place / Oui besoin pas en place → ordonnables | ✅ **SCORANTE** | Non = +0 · Oui, déjà en place = +0 · Oui, besoin identifié mais pas en place = +1 |
| **E66** | Les démarches administratives vous paraissent-elles complexes ? | etat | Charge administrative | ✅ La complexité perçue est un signal direct d'intensité — l'aidant dit "c'est complexe" = charge administrative vécue. Item similaire au Zarit (sentiment de fardeau) | ✅ Pas du tout / Un peu / Oui → 3 niveaux, non ambigu | ✅ **SCORANTE** | Pas du tout = +0 · Un peu = +1 · Oui = +1 |
| **E67** | Votre proche a-t-il une activité adaptée à son état ? | facteur | Inclusion | ✅ L'absence d'activité avec impact (isolement, repli) est un signal d'intensité — la situation de vie du proche se détériore et pèse sur l'aidant | ✅ 4 options ordonnées (adaptée → crée des difficultés) | ✅ **SCORANTE** | Activité adaptée = +0 · Difficile à tenir = +1 · Sans activité sans problème = +0 · Sans activité avec difficultés = +1 |
| **E68** | Combien de temps consacrez-vous chaque mois aux démarches ? | facteur | Charge administrative | ✅ Le temps consacré aux démarches est un indicateur direct d'intensité de charge administrative — mesure quantifiable et variable | ✅ Moins de 1h / 1-5h / Plus de 5h → échelle ordonnée | ✅ **SCORANTE** | Moins de 1h = +0 · 1-5h = +1 · Plus de 5h = +1 |
| **E69** | Vous sentez-vous à l'aise avec les démarches en ligne ? | etat | Charge administrative | ✅ La difficulté avec le numérique est un signal d'intensité — l'illectronisme associé à la charge administrative aggrave la vulnérabilité | ✅ 4 options ordonnées (tout à fait → pas d'accès) | ✅ **SCORANTE** | Tout à fait = +0 · Oui mais temps = +0 · Souvent perdu·e = +1 · Pas d'accès = +1 |
| **E70** | Gérez-vous des démarches dans l'urgence ? | etat | Charge administrative | ✅ La gestion en urgence est un signal d'intensité — perte de contrôle administratif, risque de suspension d'aides | ✅ Jamais / Parfois / Souvent. "Je ne sais pas" = +0 (neutre) | ✅ **SCORANTE** | Jamais = +0 · Parfois = +1 · Souvent = +1 · Je ne sais pas = +0 |

---

## Résumé V2

### Questions scorantes (8/18)

| # | Q_ID | Score max |
|---|------|-----------|
| 1 | O61 | +1 |
| 2 | E64 | +1 |
| 3 | E65 | +1 |
| 4 | E66 | +1 |
| 5 | E67 | +1 |
| 6 | E68 | +1 |
| 7 | E69 | +1 |
| 8 | E70 | +1 |
| **Total** | | **11 pts** |

> ⚠️ **Note** : E64, E65, E67 sont conditionnelles (persona enfant/handicap). Le score max théorique sera ajusté en fonction du profil activé.

> **Score V2 normalisé** = (brut / 11) × 100

### Questions non scorantes (10/18)

| Q_ID | Raison d'exclusion |
|------|-------------------|
| O45 | Contexte factuel (type de couverture santé) |
| O23 | Contexte factuel (couverture santé proche) |
| N6 | Dispositif existant (mesure de protection) — action passée |
| E61 | Action passée (directives anticipées) |
| N42 | Action passée (aide prestations ALD) — conditionnel |
| N29 | Liste à cocher variable (22 options) — pas d'échelle d'intensité |
| E62 | Liste à cocher variable (22 options) — recense des actions |
| N43 | Liste à cocher (10 options) — recense des dispositifs |
| N5 | Recours passés — actions, pas intensité |
| E63 | Liste à cocher (8 options) — pas d'échelle de "plus ou moins préoccupé" |

### Vérification

- ✅ 8 scorantes + 10 non scorantes = 18 total V2
- ✅ 0 question sans verdict
- ✅ 0 question +2 (aucune question V2 ne relève du risque vital)
- ✅ Aucune décision basée sur la classification état/facteur

---

> 📊 **SCORING_V2 v1 — À valider Dr. Monka + Antonin**
