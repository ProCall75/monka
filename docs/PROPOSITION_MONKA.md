# PROPOSITION COMMERCIALE — PRAGMA × Monka

> **Document interne PRAGMA** — À adapter avant partage avec Monka
> **Objectif** : Structurer le deal avec 3 variantes d'offre + toute la logique de raisonnement
> **MAJ** : 5 mars 2026
> **Pour le call du** : Vendredi 7 mars 14h

---

## 1. Contexte de la proposition

### Ce que PRAGMA apporte à Monka

PRAGMA est le **partenaire produit** de Monka — pas un prestataire externe. On construit le **cœur de propriété intellectuelle** du produit :

| Rôle PRAGMA | Ce que ça produit | Qui l'utilise |
|---|---|---|
| **Antonin** — CTO moteur clinique | Moteur de scoring, activation, contenu. Architecture DB. Documentation normative. Standards. | Prestataires (intègrent), Dr. Rimaud (valide), Auditeurs (certifient) |
| **Marwane** — Lead UI/UX + Produit | Identité visuelle, design system, prototype fonctionnel HD, implémentation CDC, copywriting UX | Prestataires (répliquent), Maël (co-conçoit), Etienne (présente) |

### Ce qui a été livré — 1 mois (février → début mars 2026)

**Point de départ** : 4 fichiers Excel en vrac, 15 fichiers Word legacy (règles cliniques non structurées), une app sans profondeur où chaque question donnait 1 seule recommandation, aucune documentation normative.

**Ce qui existe maintenant** :

### PILIER 1 — Moteur clinique (Antonin)

| Livrable | Volume | Transformation |
|---|---|---|
| Moteur clinique | 4 fichiers TypeScript isolés | De "1 reco/question" → système d'aide à la décision clinique croisant 165 data points |
| Base de données | 18 tables, 2700+ entrées | Des Excel/Word en vrac → schéma relationnel complet avec RLS |
| Content blocks | 450 justifications cliniques | N'existaient nulle part — chaque choix a sa raison d'être documentée |
| Activation rules | 240 règles (standard/CCC/critique/prévention) | De "rien" → logique d'activation multi-niveaux graduée |
| Personas de test | 8 profils, 1203 réponses | Pour valider le moteur en conditions variées |
| Simulateur | App React sur Vercel | Démo live fonctionnelle |
| Audit data | 240 rules auditées, corrections appliquées | Anomalies détectées et corrigées |
| Documentation stratégique | 7 docs fondamentaux | De 0 → base normative IEC 62304 / ISO 14971 |
| Scripts d'automatisation | Génération JSON, tooling | Process reproductible et versionné |

### PILIER 2 — Design produit, identité de marque & démo utilisable (Marwane)

#### Phase 1 — Review UI/UX & construction du prototype

| Prestation | Livrable concret |
|---|---|
| **Audit UX de l'application existante** | 22 écrans analysés, 19 recommandations d'amélioration priorisées |
| **Création d'identité visuelle (charte graphique digitale)** | Palette de 5 couleurs par thème de vie, typographie, tokens de design, direction artistique cohérente |
| **Conception et développement du Design System** | 40+ composants codés, documentés et testables dans un catalogue interactif |
| **Architecture d'information & conception fonctionnelle** | Mapping 4 couches moteur clinique → interface → copywriting. Documentation des flux de navigation |
| **Prototypage fonctionnel haute-fidélité** | Application démo fonctionnelle (données simulées) : onboarding complet, dashboard, parcours de soins, ressources, profil |
| **Copywriting UX** | Traduction complète du vocabulaire clinique en langage empathique adapté aux aidants 50-60 ans |

#### Phase 2 — Implémentation CDC P0 (demande Maël)

| Prestation | Livrable concret |
|---|---|
| **Relecture & qualification du cahier des charges** | Revue des 64 user stories sur 7 modules : erreurs, incohérences, reformulations, questions produit bloquantes remontées |
| **Matrice de couverture CDC** | Triage complet 64 US : ✅ 26 développées · ⚠️ 12 simulées · 🚫 26 hors scope proto |
| **Prototypage fonctionnel sur CDC** | 38/64 user stories (59% du CDC) implémentées dans la démo |

> **Ce travail est la FONDATION de tout.** Les prestataires externes construiront MyMonka V2 (200-400K€) sur **les 3 piliers** : le moteur d'Antonin (logique), le proto de Marwane (visuel + UX), et la DB (données). Si UN des 3 manque de qualité, les 200-400K€ de prestataires sont gaspillés.
>
> **Le travail de Marwane = ce qui transforme un moteur clinique excellent en un PRODUIT vendable.** Sans cette traduction, le moteur reste invisible pour l'utilisateur final.

### Ce qui reste à construire — Double roadmap Moteur + UI/UX

#### Roadmap Antonin — Moteur clinique (M1 → M3)

| Version | Ce que ça apporte | Impact business |
|---|---|---|
| **M1 — Standards** (en cours) | 16 livrables normatifs IEC 62304 / ISO 14971. Moteur audité, documentation certifiable. | Crédibilité auprès d'auditeurs, base pour certification |
| **M2 — Intelligent** | CCC enrichies, sous-scores radar, CR médecin contextualisé, score de complexité situationnelle | **Différenciation absolue** — détecte des patterns que le médecin seul ne voit pas en 20 min de consultation |
| **M3 — Personnalisé** | 800-1200 variantes MTs par profil, acteurs dynamiques, scoring adaptatif, CR personnalisé complet | **Tue la concurrence** — parcours quasi-unitaire. Base pour labellisation HAS / marquage CE |

> **Ref** : `KERNEL/STRATEGIE_PERSONNALISATION_MOTEUR.md`

#### Roadmap Marwane — UI/UX produit (P1 → P3)

| Phase | Scope | Livrables |
|---|---|---|
| **P1 — Démo de référence** | Implémentation CDC features **P0** (26 US) · Co-conception produit avec Maël · Design system définitif · Onboarding complet · Questionnaire connecté au moteur (mock) · **Mapping complet base de données → interface** (chaque table, chaque champ traduit en composant UI) | L'app clé en main que Etienne met dans les mains d'un investisseur, d'un partenaire ou d'un testeur aidant. Pas un proto — **la référence produit**. |
| **P2 — Démos par persona + features P1** | 5 démos basées sur les personas du simulateur d'Antonin · Implémentation CDC features **P1** (19 US : attribution IDEC, cercle d'aidant, agenda partagé, CTA pas-à-pas, notifications) · Choix du profil → parcours complet ultra-réaliste collé au moteur · **Refonte landing page Monka** · Tests utilisateurs sur panel aidants (parcours critiques, points de friction, validation des flows) | 5 parcours fidèles au moteur. Chaque démo = une preuve concrète pour un profil réel. La landing page convertit les visiteurs en testeurs. |
| **P3 — Pilotage intégration presta** | Specs fonctionnelles par écran · Guide d'intégration composant par composant · Validation UX de chaque livraison presta · Points de contrôle qualité produit · **Mise à jour fiches stores** (screenshots V2, description, notes de version, stratégie de rollout) · **Définition des KPIs produit et analytics** | Les prestataires n'inventent rien. Ils **répliquent** un produit qui existe déjà. Marwane valide chaque écran livré. Le coût et le temps d'intégration sont divisés. |

> **Ce que Marwane fait PENDANT que les prestataires ne sont pas encore là** : il construit tout le visuel, toute l'UX, tout le système de composants pour que quand les prestataires arrivent, ils n'aient pas à "inventer" l'interface. Ils IMPLÉMENTENT ce que Marwane a conçu et validé avec Maël.
>
> **Si on skip ce travail** : les prestataires improvisent le front. Résultat = la V1 de MyMonka. C'est exactement ce que Monka cherche à éviter.

---

## 2. Valorisation — Pourquoi ce prix

### Le levier IA — Données sourcées (pas du pif)

> **Ref** : Détail complet dans `docs/LEVIER_IA_PRAGMA.md`

| Source | Année | Résultat clé |
|---|---|---|
| GitHub Research | 2025 | +55% vitesse avec Copilot (autocomplete = plancher) |
| McKinsey | 2024-25 | +20-50% sur code/doc/refactoring |
| Enterprises (agentic AI) | 2025 | -40 à 55% du temps de dev total |

**PRAGMA utilise de l'IA agentique** (Antigravity + Claude), pas du simple autocomplete. Résultat mesuré sur le mois 1 :

| Métrique | PRAGMA | Équipe classique (sans IA) |
|---|---|---|
| Heures de travail | 375h (235h Antonin + 140h Marwane) | ~588h (calculé activité par activité) |
| Jours-homme | 54 jours | ~87 jours |
| Durée calendaire | **1 mois** | **3-4 mois** |
| Personnes nécessaires | 2 | 4-5 (PM + 2 devs + UX + consultant) |

### Coût marché du travail livré — TJM France 2025

> Sources : RH Solutions 2025, Malt, Codelynx, le-tjm.fr

| Profil | Jours classiques | TJM France 2025 | Coût |
|---|---|---|---|
| PM / Chef produit | ~20j | 600-800€ | 12-16K€ |
| Dev backend senior | ~30j | 600-800€ (moy. 643€) | 18-24K€ |
| Dev frontend React | ~12j | 535-700€ | 6-8K€ |
| UX/UI Designer | ~20j | 500-700€ | 10-14K€ |
| Consultant qualité | ~5j | 800-1200€ | 4-6K€ |
| + overhead coordination et onboarding médical | +10j | — | +10-14K€ |
| **Total marché (freelances)** | **~97j** | — | **60-85K€** |
| **Total marché (agence)** | — | — | **100-150K€** |

### Valeur marché du scope complet — Double roadmap

| Phase | Stream Antonin (moteur) | Stream Marwane (UI/UX) | Valeur marché combinée |
|---|---|---|---|
| **Travail livré (mois 1)** | Moteur + DB + 240 rules + simulateur + docs | Audit 277 fichiers + DS + 35 composants + architecture 4 couches + mapping + démo | **60-85K€** (freelances) / **100-150K€** (agence) |
| **M1 Standards + P1 Refonte** | 16 livrables normatifs IEC 62304 | Refonte review + design system v2 + démo commerciale | **50-70K€** / **90-120K€** |
| **M2 Intelligent + P2 Produit** | CCC + sous-scores + CR contextualisé | 16 organisms + onboarding interactif + dark mode + parcours | **45-65K€** / **80-110K€** |
| **M3 Personnalisé + P3 Handoff** | 800-1200 variantes MTs + acteurs dynamiques + CR complet | Handoff prestataires + features avancées + checkpoints UI | **50-75K€** / **85-130K€** |
| **Coordination prestataires** | Coordination technique moteur + DB | Coordination UI + validation implémentation composants | **25-35K€** / **40-60K€** |
| **Total** | | | **230-330K€** / **395-570K€** |

> **Note** : La première estimation (195-280K€) sous-évaluait le scope UI/UX de Marwane. En intégrant les 2 streams complets, la valeur marché réaliste est **230-330K€** en freelances.

---

## 3. Les 3 variantes d'offre

### Principes communs

- **Full remote** — Monka et PRAGMA sont tous les deux remote-first. Syncs en visio.
- **Forfait mensuel lissé** — Pas de cliff (40K mois 1 puis 10K). Un prix constant, prévisible pour Monka.
- **Le mois 1 livré est inclus** dans le deal global. Pas de facturation séparée "rétro".
- **Allocation réelle** : PRAGMA a aussi Flash Transport et le développement de sa propre entreprise. On ne fait pas 100% Monka.
- **Le M3 est inclus** — pas de renégociation quand on arrive au moteur qui tue la concurrence.

---

### Variante A — "Partenaire à 60%" ⭐ RECOMMANDÉE

> PRAGMA alloue ~60% de son temps à Monka. C'est notre client principal.

| Paramètre | Détail |
|---|---|
| **Allocation** | ~60% du temps (Antonin ~13j/mois, Marwane ~10j/mois = ~23j/mois) |
| **Durée mission** | ~9 mois (mars → novembre 2026) |
| **Forfait mensuel** | **13 500€/mois** |
| **Total deal** | **~121 500€** |
| **Inclus** | Travail livré (mois 1) + M1 Standards + M2 Intelligent + M3 Personnalisé + coordination prestataires |

**Planning** :

```
                  MARS          AVRIL         MAI           JUIN          JUIL          AOÛT          SEPT          OCT           NOV
                  ├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤

  ANTONIN         │  M1 STANDARDS (normes)    │  M2 INTELLIGENT            │  M3 PERSONNALISÉ                     │ COORD. PREST│
  Moteur          │  16 livrables normatifs   │  CCC + sous-scores +       │  MTs variantes + acteurs dynamiques  │ Handoff     │
  clinique        │  Validation clinique      │  CR contextualisé          │  CR personnalisé complet             │ final       │
                  │  Restructuration repo     │  Score complexité          │  Scoring adaptatif                   │             │

  MARWANE         │  P1 — DÉMO DE RÉFÉRENCE            │  P2 — DÉMOS PAR PERSONA + P1 CDC     │  P3 — PILOTAGE PRESTA       │
  Produit         │  CDC features P0 (26 US)            │  5 démos par persona simulateur       │  Specs écran par écran      │
  & UX            │  Co-conception produit avec Maël    │  CDC features P1 (19 US)              │  Validation chaque livraison│
                  │  Design system définitif            │  Refonte landing page Monka           │  Contrôle qualité produit   │
                  │  Mapping complet DB → interface     │  Tests utilisateurs panel aidants     │  MAJ fiches stores (V2)     │
                  │  Copywriting UX finalisé            │  Données moteur réelles intégrées     │  KPIs produit & analytics   │

                  ├─────────────┬─────────────┼─────────────┬──────────────┼─────────────┬─────────────┬──────────┼─────────────┤
                  │ 13.5K€      │ 13.5K€      │ 13.5K€      │ 13.5K€       │ 13.5K€      │ 13.5K€      │ 13.5K€   │ 13.5K€      │
                  └─────────────┴─────────────┴─────────────┴──────────────┴─────────────┴─────────────┴──────────┴─────────────┘
                                                                            + 13.5K€ (mois 9) = 121.5K€ total
```

**Pourquoi cette variante** :
- 60% = cohérent avec le BP/GTM de PRAGMA (Monka = client principal, ~50-60% du temps)
- 13.5K€/mois = **~587€/jour** pour 23j/mois. C'est en dessous du TJM moyen dev senior (643€) alors qu'on est 2 profils.
- Prix marché pour ce scope : 195-280K€. **PRAGMA facture 43-62% du marché.**
- **On casse le prix parce qu'on les connaît.** C'est un tarif partenaire, pas un tarif prestataire. Avec n'importe quel autre studio, ce scope est facturé au prix fort.
- Deal clair et simple : 1 forfait, 1 durée, tout inclus.

---

### Variante B — "Temps fort / Temps calme"

> Intensité variable selon les phases : plus de jours sur M1-M2 (urgence standards + différenciation), puis rythme réduit sur M3 et coordination.

| Phase | Durée | Alloc. | Forfait/mois | Sous-total |
|---|---|---|---|---|
| **Phase 1** — M1 Standards + début M2 | 4 mois | ~65% (~25j/mois) | **15 000€/mois** | 60K€ |
| **Phase 2** — M2 fin + M3 | 4 mois | ~55% (~20j/mois) | **12 000€/mois** | 48K€ |
| **Phase 3** — Coordination prestataires + évolutions | 4 mois | ~25% (~8j/mois) | **5 000€/mois** | 20K€ |
| **Total** | **12 mois** | Variable | — | **128K€** |

**Pourquoi cette variante** :
- Reflète la réalité : le travail moteur intensif est en début de mission, puis ça ralentit naturellement.
- Phase 3 = rythme réduit quand les prestataires sont autonomes. PRAGMA peut allouer plus de temps à Flash Transport / PRAGMA Score.
- Plus cher au total (128K€ vs 121K€) mais étalé sur 12 mois = charge mensuelle plus basse en moyenne (~10.7K€/mois).

---

### Variante C — "Mission initiale + accompagnement"

> Séparer clairement la mission "moteur" (livraison PI) de l'accompagnement continu.

| Composant | Durée | Forfait | Total |
|---|---|---|---|
| **Mission moteur** (M1 livré + Standards + M2 + M3) | 7 mois à ~60% | **15 000€/mois** | 105K€ |
| **Accompagnement** (coordination prestataires, évolutions, support) | 6-9 mois à ~20% | **3 500€/mois** | 21-31K€ |
| **Total** | **13-16 mois** | — | **126-136K€** |

**Pourquoi cette variante** :
- Distingue le "build" (on construit l'IP) du "run" (on supportent l'intégration).
- Permet à Etienne de comprendre ce qu'il paie : 105K€ = le cerveau de son produit. 3.5K€/mois = l'assurance que les prestataires ne cassent pas ce qu'on a construit.
- L'accompagnement peut être prolongé ou arrêté selon les besoins.

---

## 4. Matrice de comparaison

| Critère | **A — 60% ⭐** | **B — Temps fort/calme** | **C — Mission + accomp.** |
|---|---|---|---|
| **Total** | ~121K€ | ~128K€ | ~126-136K€ |
| **Durée** | 9 mois | 12 mois | 13-16 mois |
| **Mensuel moyen** | 13.5K€ | 10.7K€ | Variable |
| **Simplicité** | ✅✅ 1 forfait, 1 durée | ⚠️ 3 phases différentes | ⚠️ 2 contrats logiques |
| **Prévisibilité Monka** | ✅✅ Même montant chaque mois | ✅ Prévisible par phase | ✅ Prévisible par composant |
| **Flexibilité PRAGMA** | ⚠️ Engagé à 60% pendant 9 mois | ✅ Le rythme baisse naturellement | ✅ L'accompagnement est flexible |
| **Valorise le travail livré** | ✅ Intégré dans le deal | ✅ Intégré | ✅ Intégré |
| **M3 inclus** | ✅ Oui | ✅ Oui | ✅ Oui |
| **Message à Etienne** | "Un prix, tout inclus" | "On s'adapte au rythme" | "Le moteur + l'assurance" |

---

## 5. Pourquoi ce prix est juste — Les arguments pour le call

### Argument 1 : La valeur marché

> "Ce qu'on a livré en 1 mois vaut 60-85K€ au marché freelance, 100-150K€ en agence. Le scope complet (M1→M3) vaut 195-280K€. On vous propose ~120K€ — c'est 43-62% du marché. C'est un discount significatif parce que c'est notre premier client et qu'on construit cette relation."

### Argument 2 : Ce que Monka économise

> "Au lieu d'embaucher un CTO temps partagé (40-60K€/an) + un Lead UI/UX (25-35K€/an) + un cabinet normatif (30-60K€ one-shot), vous avez les deux dans un forfait unique. Et en plus on livre le M3 — le moteur qui personnalise chaque parcours de manière unitaire."

### Argument 3 : La fondation de 200-400K€ de prestataires

> "Les prestataires vont construire MyMonka V2 pour 200-400K€. Tout leur travail repose sur 3 piliers : notre moteur, notre proto, notre DB. Si ces 3 piliers ne sont pas solides, documentés et standards — les 200-400K€ sont gaspillés. Notre mission = l'assurance que cet investissement ne sera pas jeté à la poubelle à la certification."

### Argument 4 : Le time-to-value

> "Un projet qui prendrait 3-4 mois avec une équipe classique, on le livre en 1 mois. Pas parce qu'on travaille plus — parce que nos méthodes (IA agentique + relation directe avec Dr. Rimaud + 2 profils complémentaires) éliminent les overhead de coordination. Monka avance 3× plus vite."

### Argument 5 : Les standards MAINTENANT vs refaire APRÈS

> "On prépare la documentation normative PENDANT qu'on construit — pas après. Chaque doc, chaque choix, chaque justification est pensé pour résister à un audit externe. Ça évite le scénario classique : on construit d'abord, on certifie après, on se rend compte que rien n'est documenté, on refait tout. Ce scénario coûte ×3-5 en restructuration."

---

## 6. Points de négociation possibles

| Si Etienne dit... | Réponse |
|---|---|
| "C'est trop cher" | "Le marché c'est 195-280K€. On est à 120K€. C'est déjà -45%. Et tout le produit MyMonka V2 repose sur ce travail." |
| "On peut faire 80K€ ?" | "80K€ ÷ 9 mois = 8.9K€/mois. C'est 387€/jour pour 2 profils (CTO + Lead UX). C'est en dessous du TJM d'un junior freelance seul (400-535€). On préfère être transparent : à ce prix, on alloue 40% du temps, pas 60%, et le M3 prend 3 mois de plus." |
| "Et si on fait phase par phase ?" | "C'est la variante C. Mais le total est plus cher (126-136K€) parce que la fragmentation crée du overhead de re-mobilisation. Le forfait lissé est plus avantageux pour tous." |
| "On avait parlé de 50K€ au départ" | "50K€ c'était l'estimation bootstrap du BP PRAGMA avant d'avoir travaillé 1 jour. Le scope réel est beaucoup plus large que prévu : 18 tables, 450 content_blocks, audit complet, proto UI de 35 composants, mise aux standards normative. Ce n'est plus le même projet." |
| "On peut commencer et voir ?" | "On a déjà commencé — 1 mois livré. La question n'est pas de commencer, c'est de cadrer la suite pour que les deux parties sachent où elles vont." |

---

## 7. Modalités pratiques

| Point | Proposition |
|---|---|
| **Format de travail** | Full remote (Monka et PRAGMA sont remote-first) |
| **Sync hebdo** | 1 visio de 30-45 min avec Maël/Etienne — sync produit/avancement |
| **Validation clinique** | Sessions ad hoc avec Dr. Rimaud (~2-3h/semaine en moyenne). Réactivité directe père/fils. |
| **Facturation** | Mensuelle, à date fixe. Facturation PRAGMA SAS. |
| **Livraison** | Repo Git `monka/` = source de vérité. Chaque sprint a un livrable vérifiable. |
| **Engagement** | Engagement mutuel sur la durée. Clause de sortie à 30 jours. |

---

## 8. Prochaines étapes

- [ ] **Antonin + Marwane** : choisir la variante (A, B, ou C)
- [ ] **Adapter ce doc** pour la version présentable à Etienne (retirer les arguments de négo)
- [ ] **Préparer les points du call** vendredi 14h
- [ ] **Avoir les chiffres en tête** : valeur marché, TJM, discount premier client

---

*Document interne PRAGMA — Mars 2026*
*À ne PAS partager tel quel — adapter en proposition commerciale formelle*
