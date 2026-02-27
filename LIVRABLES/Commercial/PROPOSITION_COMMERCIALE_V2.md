# Proposition Commerciale — PRAGMA × Monka

> **Février 2026 — Document confidentiel**  
> **Interlocuteurs PRAGMA** : Antonin Rimaud (Clinical Engine & Produit) · Marwane (UI/UX & Design)

---

## 1. Ce que nous avons produit ce dernier mois

Depuis le début de notre collaboration, PRAGMA a travaillé en immersion totale dans le produit Monka. Un mois complet de travail intensif — pas des journées facturées au TJM, mais un engagement total, soirs et week-ends compris, parce que nous croyons en ce que Monka construit.

Ce document fait le point sur **ce qui a été livré**, définit le **cadre de valorisation** de ce travail, et ouvre la discussion sur **la suite de notre collaboration**.

---

### 1.1 Le Clinical Engine — Le cœur algorithmique de Monka, formalisé

Monka disposait d'un savoir clinique riche : des questionnaires validés, des micro-parcours définis, des tableaux de scoring dans des fichiers Word et Excel. Ce patrimoine existait — mais il était **dispersé, non relié, et inexploitable par un produit digital**.

**Ce que PRAGMA a fait** : nous avons pris ce patrimoine et nous l'avons transformé en un **moteur clinique déterministe complet** — le KERNEL v6 — un système où chaque question, chaque règle, chaque micro-tâche est reliée aux autres dans une logique formelle, testable et intégrable.

#### Ce que ça a demandé

Ce n'est pas un travail de "mise en forme". C'est un travail de fond qui a nécessité :

- **Croisement et réconciliation** des questionnaires avec les tableaux Excel CAT pour formaliser les liens entre questions, scoring et déclenchements cliniques
- **Clarification et affinement de la logique de scoring** : réconciliation entre les différentes sources, normalisation des formules, résolution des écarts entre le digital et le legacy
- **Formalisation de 18 règles moteur (K1-K18)** qui codifient tout le comportement du système : activation, criticité, recommandations, micro-tâches, scoring, suivi — chaque règle a été pensée, testée et documentée
- **Conception du pipeline en 5 étapes** : du questionnaire → à l'évaluation des règles → à la génération des sorties → au scoring → au suivi dans le temps
- **Structuration de la personnalisation détaillée** par type d'aidant (salarié, retraité, conjoint, enfant, etc.) avec des parcours et réponses différenciés — 37 règles d'overlay aidance conçues et documentées
- **Structuration des interdépendances** entre les 5 vulnérabilités, y compris les Conditions Critiques Composites (CCC) inter-vulnérabilités
- **Audit CCC exhaustif** : audit complet intra-V, inter-MP et cross-V ayant produit 16 nouvelles propositions de CCC, identification de 4 CCC mono-sévères urgentes (dont les idées suicidaires), analyse des 43 questions orphelines
- **Normalisation des 48 signatures ASR** pour le suivi par objectif
- **Documentation du sens clinique** de chaque décision pour rendre le moteur auditable et défendable
- **Production d'une roadmap produit/moteur claire** avec une vision séquencée des prochaines étapes

> **À noter** : ce travail a été réalisé en étroite collaboration avec **Dr. Rimaud**, médecin, qui nous a accompagnés tout au long du processus. Son expertise a permis de **certifier chaque étape intermédiaire** du moteur clinique — validation des règles d'activation, cohérence des scoring, pertinence des micro-tâches — garantissant ainsi la rigueur médicale du résultat final.

#### Un travail de recherche continu, pas un livrable ponctuel

Ce que vous voyez aujourd'hui dans le KERNEL v6 est le résultat final. Mais derrière, il y a eu **un mois entier de recherche, d'audits et de réflexions** qui ont alimenté chaque itération :

Au total, **plus de 35 documents** ont été produits et échangés avec Dr. Rimaud pour parvenir à ce résultat. Ils couvrent :

| Catégorie | Exemples | Volume |
|---|---|---|
| **Audits cliniques** | Audit CCC intra-V / inter-MP / cross-V, audit 150 vs 153 questions, audit cohérence état-facteur, audit scoring vs legacy | ~10 docs |
| **Réflexions et décisions produit** | Overlay aidance (37 règles), overlay enfants, questionnaire de suivi, types de réponses, plan content blocks, CCC cross-vulnérabilités | ~7 docs |
| **Certifications moteur** | Validation formelle de chaque composant (navigation, pages, scoring, intégrité données, dette technique…) | 27 docs |
| **Analyses croisées** | Croisement personas × questions (Excel), répartition MT médical/médico-social, mapping question → MP | ~5 docs |
| **Architecture & roadmap** | PRD complet (27 000 mots), architecture app + DB, sprint V2, glossaire | ~5 docs |

Chaque document a été une étape de réflexion qui a alimenté le moteur final. **Ce n'est pas de la documentation pour faire joli.** Ce sont les itérations qui ont permis d'aboutir à un moteur d'une pertinence clinique qu'aucun concurrent ne pourra reproduire — et qui prendrait **2 ans minimum** à mettre sur pied en partant de zéro.

#### Ce que ça représente en base de données

Tout ce travail est aujourd'hui **stocké, structuré et requêtable** dans une base de données Supabase dédiée :

| Table | Enregistrements | Ce que ça apporte |
|---|---|---|
| `questions` | 165 | Questionnaire complet V1-V5 — mappé, scoré, avec conditions d'affichage et sens clinique |
| `micro_parcours` | 24 | Chaque MP avec objectifs, signatures ASR, critères de validation |
| `categories` | 73 | Catégories cliniques par MP — pivot central du moteur |
| `activation_rules` | 240 | Règles "SI réponse(s) → ALORS catégorie activée à un niveau" — 115 STD · 85 CCC · 40 CRIT |
| `micro_taches` | 390 | Actions IDEC avec wording versionnés par niveau (standard/CCC/critique), tri par domaine et acteur |
| `recommendations` | 202 | Recommandations par catégorie et niveau — 73 STD · 72 CCC · 33 CRIT · 24 PREV |
| `scoring_questions` | 345 | Scoring détaillé : 95 questions scorantes sur 150, scores +0/+1/+2 |
| `scoring_thresholds` | 20 | Seuils de scoring par vulnérabilité (4 niveaux) |
| `content_blocks` | 450 | Documentation clinique structurée (voir ci-dessous) |
| `guides` | 42 | Guides step-by-step pour l'aidant (3 tiers de complexité) |
| `guide_mt_mapping` | 61 | Liens entre guides et micro-tâches |
| `question_mp_mapping` | 155 | Mapping questions → micro-parcours avec justification |
| `suivi_questions` | 30 | Questions de suivi à 3 niveaux pour la progression |
| `personas` | 8 | Profils types d'aidants pour la simulation et la démo |
| `persona_answers` | 1 203 | Réponses pré-remplies par persona |
| **Total** | **~3 400** | **Un cerveau clinique complet, structuré et requêtable** |

#### Les content_blocks — Le bouclier clinique de Monka

Les **450 content_blocks** méritent une attention particulière. Ce sont les éléments qui permettent à Monka de **défendre la rigueur clinique de son produit** auprès de tous les tiers :

| Type de block | Rôle | Utilité business |
|---|---|---|
| `sens_clinique` | Explication médicale de chaque décision | Crédibilité face aux ARS, mutuelles, partenaires |
| `scoring_justification` | Pourquoi ce score pour cette réponse | Auditabilité pour les expérimentations CNRS |
| `scoring_ponderation` | Logique de pondération (+0/+1/+2) | Transparence scientifique |
| `justification_questions` | Pourquoi poser cette question | Communication patient/aidant |
| `justification_categories` | Pourquoi cette catégorie clinique existe | Documentation interne |
| `matrice_patho_specialiste` | Pathologie → spécialiste à contacter | Orientation médicale automatisée |
| `liens_inter_mp` | Passerelles entre micro-parcours | Vision systémique du parcours de soin |

**Sans ces blocs, Monka a un algorithme. Avec, Monka a un argumentaire clinique complet, auditable et défendable.**

---

### 1.2 Le Clinical Engine — L'application complète du moteur

Nous n'avons pas juste structuré des données. Nous avons construit une **application complète** (React/TypeScript/Vite) qui rend tout ce moteur visible, testable et démontrable :

| Page | Fonction |
|---|---|
| **Dashboard** | Vue d'ensemble : métriques clés, état du moteur, points d'attention |
| **Simulateur** | Simulation en temps réel — choisir un persona, répondre aux questions, voir le scoring et les recommandations se calculer en direct |
| **Vulnérabilités** | Exploration détaillée de chaque V : questions, scoring, seuils, règles associées |
| **Micro-Parcours** | Détail par MP : catégories, règles d'activation, micro-tâches, ASR, wording par niveau |
| **Personas** | 8 profils types avec réponses pré-remplies pour tester et démontrer le moteur |
| **Documentation** | Explications cliniques structurées — sens clinique, justifications, liens inter-MP |
| **Roadmap** | Vision produit séquencée et prochaines étapes |

**Cette application n'existait pas.** C'est la preuve vivante que le moteur fonctionne — et un outil que personne d'autre sur le marché ne possède pour tester un algorithme clinique de cette complexité.

> *Note* : pour faciliter la certification par Dr. Rimaud, nous avons également construit une **app de validation éphémère** dédiée à la revue en masse des 24 MPs (validation/rejet par section, suivi de complétude). Un outil de productivité interne qui a accéléré le processus de certification.

---

### 1.4 L'Audit UI/UX — Le regard extérieur sur l'app

Marwane a réalisé un audit approfondi de l'application mobile actuelle :
- Identification systématique des problèmes d'ergonomie
- Analyse des parcours utilisateurs et des points de friction
- Proposition d'une refonte complète avec maquettes modernisées
- Benchmark avec les standards du marché en santé digitale
- **Slide deck de présentation complet (10 slides)**

---

### 1.5 Le Prototype Démo — Votre arme commerciale

Nous avons construit une **application démo** qui sert aujourd'hui de vitrine pour vos conversations commerciales :

| Page | Fonction |
|---|---|
| **Review (/)** | Présentation en 3 actes : UI → Copywriting → UX |
| **Parcours (/parcours)** | Visualisation des user journeys avec React Flow |
| **Démo (/demo)** | App mobile simulée avec tous les écrans redesignés |

Déployé sur Vercel, utilisable immédiatement. Ce n'est pas un PowerPoint — c'est un produit que vos prospects peuvent toucher. **Une arme de vente concrète** que Marwane continue d'enrichir cette semaine pour vos besoins commerciaux.

---

### 1.6 Contribution au cadrage produit

Cette semaine, Marwane a également contribué directement à :
- L'organisation et la structuration proposée par Maël
- Le travail sur le cahier des charges et les user stories
- Le cadrage technique qui alimente vos discussions CTO actuelles

---

## 2. Ce que tout ça représente

### La valeur PRAGMA : pas le contenu, la logique

| Ce qui existait chez Monka | Ce que PRAGMA a construit |
|---|---|
| Questionnaires validés par Dr. Monka | Un moteur structuré qui **relie, score et active** automatiquement |
| Tableaux Excel CAT | **240 règles d'activation** formalisées en JSON avec logique conditionnelle |
| Micro-parcours définis cliniquement | **73 catégories, 390 micro-tâches** avec wording versionnés par criticité |
| Savoir dispersé dans des docs | **450 content_blocks** : le bouclier clinique défendable auprès des tiers |
| Des idées de personas | **8 personas complètes** avec 1 203 réponses pré-remplies |
| — | **18 règles moteur formelles (K1-K18)** documentées |
| — | **Pipeline en 5 étapes** du questionnaire aux recommandations |
| — | **16 nouvelles CCC proposées** (audit cross-vulnérabilités) |
| — | **37 règles d'overlay aidance** pour la personnalisation par profil |
| — | Un simulateur fonctionnel (preuve que ça marche) |
| — | Un prototype démo déployé (arme de vente) |
| — | Un PRD complet (27 000 mots) |
| — | 27 documents de certification |
| — | Un audit UI/UX complet + maquettes |

**Monka avait la matière première. PRAGMA l'a transformée en moteur exploitable, testable et défendable.**

### Un mois de dévouement, pas du TJM

Ce travail n'est pas une addition de jours facturés. C'est **un mois complet d'immersion** — soirs, week-ends, itérations continues — porté par une conviction sincère dans le potentiel de Monka. La réalité, c'est que la complexité du produit demandait ce niveau d'investissement : comprendre la logique clinique, la formaliser, la tester, la faire certifier, la documenter, construire les outils pour la prouver.

Aucun prestataire classique ne ferait ça sans un bon de commande signé. Nous l'avons fait parce que nous croyons en vous.

### Ce qui rend ce travail irremplaçable

Ce moteur est un **avantage compétitif majeur** pour Monka :

- **Aucun concurrent** ne dispose d'un moteur clinique de cette profondeur et de cette rigueur
- Reproduire ce travail en partant de zéro prendrait **2 ans minimum** à une équipe interne
- Les **CCC cross-vulnérabilités** (combinaisons de signaux d'alerte entre domaines) sont une innovation clinique unique
- Les **content_blocks** rendent le produit auditable et défendable — un impératif pour les expérimentations et les partenariats institutionnels
- La **personnalisation par type d'aidance** (37 règles d'overlay) est un différenciateur produit qu'aucune autre solution sur le marché ne propose

---

## 3. Ce que nous proposons

### Ce que ça coûterait ailleurs

Pour mettre en perspective, voici **les tarifs marché vérifiés** (sources : Malt, FreelanceIndex, YieldStudio, Idealink, BPI France — données 2025-2026).

**Tarifs de référence** : TJM développeur React/TypeScript senior = 600-850€ (freelance) / 800-1 200€ (ESN). Product manager e-santé = 700-800€. Designer UX/UI senior = 500-700€.

| Livrable | Freelance senior | Studio / ESN | Ce qu'ils n'auraient probablement PAS fait |
|---|---|---|---|
| Formalisation moteur clinique (V1-V5, 240 règles, CCC, scoring, 18 règles K1-K18, pipeline 5 étapes) | 30 000 – 35 000 € | 40 000 – 50 000 € | Les CCC cross-V, les 37 overlays aidance, et les combinaisons cliniques innovantes |
| Application Clinical Engine (7 pages, dashboard, simulateur, personas, documentation) | 10 500 – 14 000 € | 15 000 – 20 000 € | Une application spécifique pour tester le moteur en interne — un prestataire livre le code, pas un outil de démo |
| Base de données structurée (~3 400 enregistrements, 17 tables) + 450 content_blocks | 12 000 – 15 000 € | 16 000 – 20 000 € | Les content_blocks (sens clinique, justifications, matrices) ne seraient quasi jamais produits |
| 35+ documents de recherche, audits, réflexions cliniques | 8 000 – 12 000 € | 11 000 – 15 000 € | La documentation et la recherche passent toujours en dernier chez un prestataire |
| Audit UI/UX complet + slide deck 10 slides + maquettes | 3 000 – 6 000 € | 6 000 – 10 000 € | Qualité comparable |
| Prototype démo déployé (3 pages, React Flow, arme commerciale) | 6 000 – 8 000 € | 8 000 – 12 000 € | Comparable |
| 27 documents de certification + app de validation éphémère | 4 000 – 5 000 € | 5 000 – 7 000 € | Un outil de validation clinique dédié — aucun prestataire ne fait ça sans commande |
| Certification clinique avec un médecin (35+ échanges) | **Introuvable** | **Introuvable** | **Aucun prestataire ne vient avec un médecin pour certifier les étapes** |
| **Total marché** | **73 500 – 95 000 €** | **101 000 – 134 000 €** | — |

**Et surtout** : un prestataire classique n'aurait probablement **jamais** :
- Créé un outil spécifique pour tester le moteur en interne (le Clinical Engine)
- Conçu les CCC cross-vulnérabilités (innovation clinique pure)
- Produit 450 content_blocks pour rendre le produit défendable face aux tiers
- Fait certifier chaque étape par un médecin
- Proposé 37 règles d'overlay pour la personnalisation par type d'aidance

### Notre proposition : 50 000 €

| | Détail |
|---|---|
| **Montant** | **50 000 €** |
| **Ce qui est inclus** | Tout ce qui est listé en section 1 : KERNEL v6, Clinical Engine (app complète), base de données (~3 400 enregistrements), prototype démo, audit UI/UX, 35+ documents de recherche et certification, PRD |
| **Ce que Monka obtient** | Propriété complète de tous les livrables : code, base de données, documentation, outils |
| **Maintenance** | Les outils restent déployés et maintenus sur Vercel |
| **vs marché** | **2 à 3× moins cher** qu'un studio, pour un résultat plus complet |

### Et pour la suite ? — Mission Développement Produit

Une fois le cadre posé sur l'existant, nous proposons une **mission continue de développement produit**, facturée **au livrable** (pas au TJM — on travaille au résultat, pas à l'heure).

#### Ce que cette mission couvrirait

| Livrable | Description | Objectif |
|---|---|---|
| **Enrichissement content_blocks** | Compléter et affiner les 450 blocs existants : sens clinique manquant, justifications scoring, matrices pathologie-spécialiste, liens inter-MP | Renforcer le bouclier clinique pour les audits et partenariats |
| **CCC intra-V et inter-V** | Proposer, documenter et implémenter de nouvelles combinaisons critiques composites à partir de notre audit (16 déjà proposées) | Augmenter la détection de patterns cliniques — différenciateur #1 de Monka |
| **Scoring et sous-scores** | Affiner la logique de scoring, introduire des sous-scores par sous-bloc (radar par vulnérabilité), score de complexité situationnelle | Passer de "V4 = Élevé" à "V4 = Élevé, axe cognition" — plus actionable pour le médecin |
| **Personnalisation moteur** | Déployer progressivement les 5 couches de personnalisation documentées (profil, scoring, activation, micro-tâches, CR médecin) — en commençant par les 3 profils prioritaires | Chaque aidant reçoit un parcours véritablement unique |
| **Questionnaire de suivi** | Concevoir et implémenter le cycle de suivi dans le temps (30 questions, 3 niveaux, réouverture de questions) | Le plan de l'aidant évolue avec sa situation — rétention et suivi longitudinal |
| **Intégration user stories dans la démo/prototype** | Avant toute implémentation technique, enrichir le prototype démo avec les user stories définies, pour visualiser et valider le produit cible | Valider AVANT de coder — économie de temps et d'argent considérable |

#### Ce qui est inclus de base dans la mission

- **Maintenance du Clinical Engine** sur votre stack — l'app reste à jour, fonctionnelle et déployée
- **Partage de l'ensemble de la base de données à plat** pour que vos équipes puissent aussi avancer dessus — architecture propre, quadrillée, documentée
- **100% propriété Monka** — tout ce qui est produit dans le cadre de cette mission vous appartient, comme le reste
- **Réflexions et audits continus** — comme ce dernier mois, on ne se contente pas d'exécuter, on propose des pistes d'amélioration et d'innovation

#### Format et pricing

Le format exact (forfait mensuel, forfait par sprint, ou forfait par livrable) sera défini ensemble lors de notre échange lundi. Ce qui est certain :
- **Pas de TJM** — on facture au résultat, pas au temps passé
- **Livrables clairs et validables** — chaque livraison est concrète et mesurable
- **Flexibilité** — ajustement du périmètre en continu selon vos priorités

#### Et l'implémentation technique ?

La question de l'intégration du KERNEL dans la nouvelle app (par nous ou par une autre équipe) est un sujet à part entière. Nous sommes ouverts à en discuter — mais **après** avoir posé le cadre sur l'existant et la mission produit. C'est ce rendez-vous avec le CTO qui aura tout son sens une fois ces bases posées.

---

## 4. Modalités de paiement

> **Notre principe : la flexibilité.**

Nous comprenons la réalité d'une startup. Nous sommes ouverts à trouver le format qui vous convient.

| Option | Fonctionnement |
|---|---|
| **Paiement en une fois** | À réception de la proposition validée |
| **Paiement échelonné** | 2 à 6 mensualités |
| **Paiement différé** | Montant validé maintenant, paiement à 3 ou 6 mois |
| **Equity** | Conversion partielle ou totale en parts de la société. Cette option nous intéresse sincèrement — nous croyons dans le potentiel de Monka et serions prêts à aligner nos intérêts sur le long terme. Cette modalité nécessite une discussion avec l'ensemble des parties prenantes et investisseurs pour définir les conditions (pourcentage, valorisation, vesting, etc.). C'est une opportunité de transformer un coût ponctuel en alignement stratégique durable. |
| **Hybride** | Combinaison des options ci-dessus |

---

## 5. Ce qui se passe si on ne formalise pas

Nous le disons sans aucune agressivité, mais avec clarté : sans cadre formalisé, il ne serait pas raisonnable pour nous de continuer à investir du temps et des ressources.

Concrètement :
- Les déploiements Vercel (simulateur, prototype, démo) sont hébergés et maintenus par PRAGMA
- Le KERNEL et toute la base de données structurée sont le fruit de notre travail
- Nous ne couperons rien du jour au lendemain — mais nous avons besoin d'un cadre pour continuer

**L'objectif n'est pas un ultimatum.** C'est simplement de s'assurer que les deux parties avancent avec des engagements clairs et mutuels.

---

## 6. Prochaines étapes

1. **Lundi** — Échange sur cette proposition (créneau après-midi proposé)
2. **Validation du périmètre** — Accord sur le montant et les modalités
3. **Formalisation** — Signature d'un accord (devis signé ou email de validation)
4. **Suite** — Discussion sur l'accompagnement futur une fois le cadre posé

---

*PRAGMA — Février 2026*  
*Tout le code et les livrables produits dans le cadre de cette collaboration sont transférés à Monka dès formalisation de l'accord.*
