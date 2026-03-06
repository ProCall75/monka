# PRICING DEAL — Mission PRAGMA × Monka

> **Document interne PRAGMA** — Ne pas partager avec le client tel quel
> **Objectif** : Estimer la juste valeur de la mission et structurer le deal
> **MAJ** : 4 mars 2026

---

## 1. Le point de départ — D'où on est parti

Quand PRAGMA a démarré sur Monka, voici ce qui existait :

| Ce qui existait | État | Ce que ça valait |
|---|---|---|
| **4 fichiers Excel** | Données brutes (recos, MTs, questions) — aucune structure relationnelle, pas de DB | Des données en vrac, inexploitables telles quelles |
| **15 fichiers Word "legacy"** | Règles cliniques rédigées par Dr. Rimaud. Aucun lien avec la DB, aucune logique formalisée, aucun scoring structuré | De la connaissance dans la tête du médecin, couchée sur Word |
| **Logique clinique V1** | Chaque option des ~150 questions → 1 recommandation. Aucune profondeur, aucune personnalisation, aucune activation conditionnelle | Un produit plat, sans valeur distinctive |
| **App MyMonka V1** | Interface existante. Pas de design system, pas de cohérence UI, pas d'architecture de composants, pas d'audit UX | Une app qui tourne mais qui n'est pas à la hauteur de l'ambition |
| **Aucune documentation normative** | Pas de SOPs, pas de plan qualité, pas de traçabilité, rien pour un auditeur | Zéro préparation certification |

**En résumé** : Monka avait un médecin avec des idées, des données dans des fichiers bureautiques, et une app qui marchait mais sans profondeur. **C'est tout.**

---

## 2. Ce que PRAGMA a construit en 1 mois (fév → début mars 2026)

### Antonin — Moteur + Data + Standards

| Livrable | Transformation réalisée |
|---|---|
| **Kernel V6** | Conçu et formalisé avec Dr. Rimaud. Du Word en vrac → un système de règles structuré, versionné, documentable |
| **Moteur clinique** (4 fichiers TypeScript) | Code isolé, importable, typé. Scoring 5V, activation 240 rules, contenu dynamique. N'existait pas avant. |
| **Base de données clinique** (18 tables Supabase) | Des 4 Excel → schema relationnel complet : 165 questions, 345 scoring_questions, 240 activation_rules, 202 recos, 390 MTs, 42 guides, 73 catégories |
| **450 content_blocks** | Justifications cliniques structurées. Chaque choix a sa raison d'être documentée en DB. N'existait nulle part avant. |
| **De 1 reco par question → 24 MPs × 73 catégories × 390 MTs** | La profondeur clinique a été multipliée. Activation conditionnelle multi-niveaux (standard/CCC/critique/prévention). |
| **8 personas de test** (1203 réponses) | Cas cliniques pour valider le moteur. Testés et fonctionnels. |
| **Simulateur** | App React déployée sur Vercel pour démontrer le moteur en live. |
| **Audit data** | 240 activation rules auditées. Anomalies identifiées, corrections mécaniques appliquées, décisions cliniques requises documentées. |
| **Documentation stratégique** | PLAN_QUALITE_CEO, PREREQUIS_PRESTATAIRES, ARCHITECTURE_REFLEXION, CONTEXTE, ROADMAP, SOPs |
| **Tooling** | Scripts d'automatisation (generate_json, audit, certification) |

### Marwane — Design produit, identité de marque & démo utilisable

**Phase 1 — Review UI/UX & construction du prototype**

| Prestation | Livrable concret |
|---|---|
| **Audit UX de l'application existante** | 22 écrans analysés, 19 recommandations d'amélioration priorisées |
| **Création d'identité visuelle (charte graphique digitale)** | Palette de 5 couleurs par thème de vie, typographie, tokens de design, direction artistique cohérente |
| **Conception et développement du Design System** | 40+ composants codés, documentés et testables dans un catalogue interactif |
| **Architecture d'information & conception fonctionnelle** | Mapping 4 couches moteur clinique → interface → copywriting. Documentation des flux de navigation |
| **Prototypage fonctionnel haute-fidélité** | Application démo fonctionnelle (données simulées) : onboarding complet, dashboard, parcours de soins, ressources, profil |
| **Copywriting UX** | Traduction complète du vocabulaire clinique en langage empathique adapté aux aidants 50-60 ans |

**Phase 2 — Implémentation CDC P0 (demande Maël)**

| Prestation | Livrable concret |
|---|---|
| **Relecture & qualification du cahier des charges** | Revue des 64 user stories sur 7 modules : erreurs, incohérences, reformulations, questions produit bloquantes remontées |
| **Matrice de couverture CDC** | Triage complet 64 US : ✅ 26 développées · ⚠️ 12 simulées · 🚫 26 hors scope proto |
| **Prototypage fonctionnel sur CDC** | 38/64 user stories (59% du CDC) implémentées dans la démo |

**Ce que ça permet** : démonstration produit crédible, itérations rapides, vitesse de décision. La démo vaut de l'or pour convaincre investisseurs, Klésia, partenaires.

---

## 3. Estimation réaliste — Données dures (sourcées)

> Détail complet dans `docs/LEVIER_IA_PRAGMA.md` — chiffres sourcés GitHub 2025, McKinsey 2024-25, RH Solutions/Malt/Codelynx France 2025.

### Résumé du levier IA

| Source | Métrique | Résultat |
|---|---|---|
| GitHub Research 2025 | Vitesse complétion tâches avec Copilot | **+55%** |
| McKinsey 2024-25 | Tâches code/doc/refactoring | **+20 à 50%** |
| Enterprises (agentic AI) | Réduction temps de dev total | **-40 à 55%** |

PRAGMA utilise de l'IA agentique (Antigravity + Claude), pas du simple autocomplete. Gain réel mesuré sur notre travail : **×1.71 en heures brutes, ×3-4 en durée calendaire**.

### Ce que le mois 1 a coûté en heures réelles

| | Heures | Jours (÷7h) |
|---|---|---|
| Antonin | ~235h | ~34 jours |
| Marwane | ~140h | ~20 jours |
| **Total PRAGMA** | **375h** | **~54 jours** |

> **Vérification** : ~2 semaines full (10h+/jour, 2 personnes) + ~2 semaines presque full = ~375h. ✅ Cohérent avec le vécu.

### Équivalent classique — TJM France 2025 sourcés

| Profil nécessaire | Jours classiques | TJM France 2025 (bas) | TJM (haut) | Coût bas | Coût haut | Source TJM |
|---|---|---|---|---|---|---|
| PM / Chef produit | ~20j | 600€ | 800€ | 12K€ | 16K€ | Malt, le-tjm.fr |
| Dev backend senior | ~30j | 600€ | 800€ | 18K€ | 24K€ | RH Solutions 2025 (643€ moyen) |
| Dev frontend React | ~12j | 535€ | 700€ | 6.4K€ | 8.4K€ | Malt 2025 (567€ ReactJS) |
| UX/UI Designer + Product Designer | ~25j | 500€ | 700€ | 12.5K€ | 17.5K€ | Codelynx, le-tjm.fr |
| Consultant qualité réglementaire | ~5j | 800€ | 1 200€ | 4K€ | 6K€ | Wild Code School, estimation marché |
| **Sous-total jours-homme** | **~92j** | — | — | **52.9K€** | **71.9K€** | — |
| + overhead coordination (+15%) | — | — | — | **+7.9K€** | **+10.8K€** | Standard PM overhead |
| + onboarding médical (+5j PM) | +5j | 600€ | 800€ | **+3K€** | **+4K€** | Un PM externe ≠ fils du médecin |
| **Total marché** | **~97j** | — | — | **64K€** | **87K€** | — |

**Durée calendaire classique** : **3-4 mois** (vs 1 mois PRAGMA)

> **Valeur marché du travail livré (mois 1)** : **64-87K€** — c'est le plancher. Les scénarios agence/cabinet sont plus chers :

| Scénario | Équipe | Durée | Coût total |
|---|---|---|---|
| **Freelances coordonnés** | 4-5 freelances | 3-4 mois | **64-87K€** (calculé ci-dessus) |
| **Agence dev mid-range** | PM + 2 devs + UX + consultant | 4-5 mois | **100-150K€** (+ overhead agence 30-50%) |
| **Cabinet conseil + agence** | Conseil (specs) + agence (build) | 5-6 mois | **150-250K€** (+ marge cabinet) |

---

## 4. Ce qui reste à faire — Continuité, pas nouveau projet

### M1 — Mise aux standards (5-6 semaines PRAGMA)

C'est la suite directe du travail livré. Le moteur marche, maintenant on le met au standard.

| Bloc | Temps PRAGMA | Temps équipe classique |
|---|---|---|
| 16 livrables normatifs | ~15 jours | ~40-50 jours |
| Validation clinique (5 sprints) | ~10 jours | ~20-25 jours |
| Restructuration repo + handoff | ~5 jours | ~10 jours |
| Proto documentation formalisée | ~10 jours | ~20-25 jours |
| **Total** | **~40 jours ≈ 5-6 semaines** | **~90-110 jours ≈ 4-5 mois** |

### M2 — Moteur Intelligent (~4-5 semaines PRAGMA)

| Fonctionnalité | Temps PRAGMA | Temps classique |
|---|---|---|
| CCC avancées | ~5 jours | ~15 jours |
| Sous-scores radar | ~5 jours | ~15 jours |
| CR contextualisé | ~5 jours | ~15 jours |
| Content blocks + tests M2 | ~10 jours | ~20 jours |
| **Total** | **~25 jours** | **~65 jours** |

### M3 — Moteur Personnalisé (~4-5 semaines PRAGMA)

| Fonctionnalité | Temps PRAGMA | Temps classique |
|---|---|---|
| Variantes MTs par profil | ~8 jours | ~25 jours |
| Acteurs dynamiques | ~5 jours | ~15 jours |
| Scoring adaptatif + validation | ~12 jours | ~30 jours |
| **Total** | **~25 jours** | **~70 jours** |

### P1 — Démo de référence (Marwane, ~2 mois)

| Prestation | Temps PRAGMA | Temps classique |
|---|---|---|
| Implémentation CDC features P0 (26 US) | ~15 jours | ~35 jours |
| Mapping complet DB → interface | ~5 jours | ~12 jours |
| Design system définitif + onboarding | ~8 jours | ~18 jours |
| Co-conception produit avec Maël | ~5 jours | ~5 jours (humain) |
| **Total** | **~33 jours** | **~70 jours** |

### P2 — Démos par persona + features P1 (Marwane, ~2-3 mois)

| Prestation | Temps PRAGMA | Temps classique |
|---|---|---|
| 5 démos par persona (données simulateur) | ~15 jours | ~35 jours |
| Implémentation CDC features P1 (19 US) | ~15 jours | ~35 jours |
| Refonte landing page Monka | ~5 jours | ~12 jours |
| Tests utilisateurs panel aidants | ~5 jours | ~5 jours (humain) |
| **Total** | **~40 jours** | **~87 jours** |

### P3 — Pilotage intégration presta (Marwane, continu)

| Prestation | Temps PRAGMA | Temps classique |
|---|---|---|
| Specs fonctionnelles par écran | ~8 jours | ~20 jours |
| Validation UX chaque livraison presta | ~3 jours/mois | ~6 jours/mois |
| MAJ fiches stores (V2) + KPIs analytics | ~5 jours | ~10 jours |
| **Total** | **~13 jours + continu** | **~30 jours + continu** |

### Coordination avec les prestataires (continu)

> Les prestataires ne sont pas des juniors à accompagner — ce sont des CTO certifiés, garants de la sécurité et de l'architecture technique. Le rôle de PRAGMA ici c'est la **coordination produit**, pas du support technique. Antonin transmet la logique métier du moteur, Marwane valide l'implémentation UI/UX.

| Activité | Fréquence | Qui fait quoi |
|---|---|---|
| Transmission logique moteur + data | Ponctuel (début) | Antonin explique, prestataires intègrent |
| Validation UI/UX chaque livraison | Continue | Marwane valide chaque écran livré vs la démo de référence |
| Checkpoints intégration (CP1-CP4) | 1-2 jours par checkpoint | PRAGMA valide la cohérence clinique + UI, prestataires valident la technique |
| Évolutions moteur selon retours intégration | Au fil de l'eau | PRAGMA adapte le moteur et la démo, prestataires adaptent leur code |
| Coordination PRAGMA/Monka/prestataires | 1 call/semaine | Alignement, pas de micro-management |

---

## 5. Structure du deal

### Principe : continuité, pas facturation par bloc

PRAGMA est embarqué sur la durée. Le travail du mois 1 alimente le mois 2 qui alimente le mois 3. C'est une **continuité**, pas des missions séparées.

### Estimation du temps total mission — Temps réel alloué

> **On n'est PAS les CTO de Monka à temps plein.** On a notre propre entreprise à développer (Flash Transport, création PRAGMA Score, prospection, site web, admin). D'après notre BP et contexte :
> - Antonin : **~50-60% du temps sur Monka** = ~5-6h/jour = ~12-13 jours/mois
> - Marwane : **~40-50% du temps sur Monka** = ~4-5h/jour = ~10-11 jours/mois
> - **Total PRAGMA pour Monka : ~22-24 jours/mois** (à deux)

| Phase | Jours PRAGMA | Durée calendaire (au rythme ~22j/mois) |
|---|---|---|
| Travail livré (fév-mars) | ~54 jours (deux ensemble, intensif premier mois) | ~1 mois |
| M1 Standards + P1 Démo référence | ~73 jours (40 Antonin + 33 Marwane) | ~3 mois |
| M2 Intelligent + P2 Démos persona | ~65 jours (25 Antonin + 40 Marwane) | ~2.5-3 mois |
| M3 Personnalisé + P3 Pilotage presta | ~38 jours (25 Antonin + 13 Marwane) | ~1.5-2 mois |
| Coordination prestataires | ~3-4 jours/mois pendant 6-9 mois | En parallèle |
| **Total engagement actif** | **~230 jours ≈ 9-10 mois de durée calendaire** | **+ coordination prestataires en parallèle** |

### Ce que ça coûterait au marché

Une équipe classique (PM + 2 devs + UX/Product Designer + consultant qualité) pour ce scope complet :

| | Durée équipe classique | Coût marché |
|---|---|---|
| Travail livré + M1 Standards + P1 Démo | ~10-12 mois | 180-350K€ |
| M2 + M3 + P2 + P3 | ~6-8 mois | 100-180K€ |
| Accompagnement prestataires | 6-12 mois | 30-80K€ |
| **Total** | **~22-32 mois-homme** | **310-610K€** |

### Pricing PRAGMA — Scénarios

**Contexte premier client** :
- C'est notre premier deal. On construit notre réputation.
- Monka prend un risque aussi (2 juniors de 24 ans).
- MAIS : ce qu'on a livré en 1 mois parle de lui-même. La preuve est faite.
- On facture de manière cohérente : **le mois de travail suivant coûte proportionnellement au mois de travail précédent**.

| | Mois 1 (livré) | M1 Standards (1.5 mois) | M2 (1 mois) | M3 (1 mois) | Accompagnement/mois |
|---|---|---|---|---|---|
| **Scénario Cohérent** | Base de référence | ×1.5 de la base | ×1 de la base | ×1 de la base | Forfait mensuel |

**Estimation par mois calendaire** (au rythme ~22 jours/mois PRAGMA pour Monka) :

| Approche | Prix/mois calendaire | Par jour (÷22j) | Valeur marché équivalente/mois | Raisonnement |
|---|---|---|---|---|
| **Trop bas** | <5K€ | <230€/j | 60-85K€/mois (premier mois mesuré) | Inacceptable. Travaille en dessous du SMIC pour un output qui vaut 60K+. |
| **Bootstrap** | 5-8K€ | 230-365€/j | idem | Premier client. On accepte de facturer 8-13% de la valeur marché. Logique de preuve. |
| **Juste** | 8-12K€ | 365-545€/j | idem | Aligné TJM dev senior France (600-700€). On facture avec un discount premier client de ~35-50%. |
| **Marché** | 12-18K€ | 545-820€/j | idem | CTO + Lead UX temps partagé. TJM marché sans discount. |

> **Challenge** : Au TJM moyen dev senior France 2025 (**643€/jour**, source RH Solutions), 22 jours/mois = **14.1K€/mois**. C'est le prix marché pour UN SEUL dev senior. PRAGMA c'est 2 profils (CTO-like + Lead UX). Le prix marché serait donc **~25-28K€/mois** mais on est en bootstrap, premier client = discount significatif.
>
> **Le prix juste (8-12K€) représente ~35-45% du prix marché.** C'est un vrai discount premier client, pas une braderie.

### Structure recommandée : Fixe + Forfait mensuel

| Composant | Montant | Logique |
|---|---|---|
| **Fixe — Travail livré** (mois 1) | À définir ensemble | Facturation du travail déjà réalisé |
| **Forfait mensuel** (M1 standards → M2 → M3) | À définir ensemble | Engagement continu, facturé par mois. Lissé. |
| **Accompagnement prestataires** | Forfait mensuel réduit | Temps partiel (~2-4j/mois). Démarre quand les prestataires démarrent. |

---

## 6. Ce qu'on apporte — Pour calibrer le prix, pas pour vendre

### Ce que Monka n'a PAS à payer grâce à PRAGMA

| Ce qu'on remplace | Coût marché annuel |
|---|---|
| CTO temps partagé (~50%) | 40-60K€ |
| Lead UI/UX temps partagé (~45%) | 25-35K€ |
| Cabinet audit normatif | 30-60K€ one-shot |
| **Total** | **95-155K€/an** |

> **Note** : Dr. Rimaud (validation clinique) est une ressource Monka, pas PRAGMA. C'est Monka qui a cette expertise en interne — nous on la facilite et on la structure, mais c'est lui le garant médical.

### Ce qui est unique à PRAGMA sur cette mission

| Facteur | Impact |
|---|---|
| **Relation père/fils avec Dr. Rimaud** | Réactivité clinique impossible à reproduire. Un PM externe mettrait 3-4 semaines juste à comprendre le contexte médical. |
| **Marwane = aidant indirect, partenaire produit** | Sa mère a le statut d'aidante pour sa grand-mère. Il conçoit l'UX depuis l'expérience vécue, pas depuis un bureau. Co-conception avec Maël, relecture critique du CDC, 38/64 US implémentées en 20h. |
| **De 1 reco/question → moteur complet** | On n'a pas "amélioré" le produit. On l'a reconstruit de zéro avec une profondeur clinique qui n'existait pas. |
| **Standards dès le départ** | On prépare la certification PENDANT le dev. Pas après. Ça économise des mois de restructuration post-audit. |
| **Game changer pour Monka** | Avant PRAGMA : Word + Excel + app plate. Après PRAGMA : moteur certifiable + démo présentable + 59% du CDC couvert + standards prêts. |

### Premier client = ajustement, pas braderie

| Ce qu'on accepte | Ce qu'on n'accepte PAS |
|---|---|
| Prix en dessous du marché (bootstrap) | Travailler gratuitement ou au SMIC |
| Facturation lissée et prévisible | Payer 50K€ pour 12 mois de travail |
| Prouver notre valeur par les livrables | Se sous-estimer parce que "c'est le premier" |
| Construire la relation long-terme | Être traité comme un prestataire jetable |

---

## 7. Recommandation finale

> **Voir `docs/PROPOSITION_MONKA.md`** pour les 3 variantes d'offre structurées et les arguments pour le call.

**Recommandation** : Variante A — Forfait lissé **13 500€/mois × 9 mois = ~121K€**. Tout inclus (travail livré + M1 + M2 + M3 + coordination prestataires). Discount de ~45% vs marché.

- [ ] **Antonin + Marwane** : Choisir la variante (A, B, ou C)
- [ ] **Adapter PROPOSITION_MONKA.md** pour la version Etienne
- [ ] **Call vendredi 14h** : présenter la proposition

---

*Document interne PRAGMA — Mars 2026*
*À ne PAS partager tel quel — extraire les éléments utiles pour la discussion commerciale*
