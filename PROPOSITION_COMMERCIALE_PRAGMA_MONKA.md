# Proposition de Collaboration — PRAGMA × Monka

> **Février 2026 — Document confidentiel**  
> **Interlocuteurs PRAGMA** : Antonin Rimaud (Clinical Engine & Produit) · Marwane (UI/UX & Design)

---

## 1. Ce que nous avons construit ensemble

Depuis le début de notre collaboration, PRAGMA a travaillé en immersion totale dans le produit Monka. Le résultat : un socle technique et clinique complet, documenté, testable — que personne d'autre ne maîtrise à ce niveau.

### Le KERNEL clinique — Le cerveau de Monka, formalisé

Nous avons pris l'intégralité du savoir clinique de Monka — dispersé entre des fichiers Word, des tableurs Excel, des échanges oraux — et nous l'avons transformé en un moteur déterministe structuré.

**Ce que ça représente concrètement :**

| Composant | Volume | Ce que ça change |
|---|---|---|
| Vulnérabilités couvertes | 5 (V1 → V5) | 100% du périmètre clinique digitalisé |
| Micro-Parcours (MPs) | 24 fiches officialisées | Chaque parcours est documenté, testable, validable par Dr. Monka |
| Questions cliniques | ~150 uniques | Toutes mappées, scorées, avec conditions d'activation |
| Règles d'activation | ~188 | La logique "quand déclencher quoi" est formalisée |
| Micro-Tâches | ~350 | Chaque action concrète pour l'IDEC est documentée |

Avant ce travail, cette logique n'existait nulle part sous forme exploitable par une machine. Elle était dans les têtes, dans des documents éparpillés. Aujourd'hui, elle est dans un format structuré prêt à être intégré dans n'importe quel produit.

### Le Simulateur — Tester le produit en temps réel

Nous avons construit un simulateur fonctionnel en React/TypeScript qui permet de :
- Simuler n'importe quel profil patient/aidant
- Voir le scoring se calculer en temps réel
- Observer quelles recommandations se déclenchent et pourquoi
- Tester les Conditions Critiques Composites (CCC)
- Comparer les résultats par persona (aidant salarié, retraité, etc.)

C'est un outil qui n'existait pas. Il permet de **tester le produit clinique sans toucher à l'app de production**.

### L'App de Validation — L'outil de Dr. Monka

Pour que Dr. Monka puisse valider chaque règle, chaque micro-tâche, chaque décision clinique, nous avons construit une interface dédiée :
- Navigation par vulnérabilité et par MP
- Système de validation/rejet/commentaire par section
- Suivi de complétude (22 fiches de qualité)
- Contrôles de cohérence inter-vulnérabilités
- Audit global du KERNEL
- Déployée en ligne, accessible immédiatement

### L'Audit UI/UX — Le regard extérieur sur l'app

Marwane a réalisé un audit approfondi de l'application mobile actuelle :
- Identification systématique des problèmes d'ergonomie
- Analyse des parcours utilisateurs et des points de friction
- Proposition d'une refonte complète avec des maquettes modernisées
- Benchmark avec les standards du marché en santé digitale

---

## 2. Pourquoi c'est différent de ce qu'un prestataire classique ferait

### La compréhension du produit

Ce n'est pas juste du code. C'est une compréhension profonde de la logique clinique de Monka. Antonin est aujourd'hui la personne qui connaît le mieux le KERNEL — sa structure, ses règles, ses cas limites, ses interdépendances entre vulnérabilités.

Cette compréhension ne s'achète pas. Elle se construit. Et elle est déjà construite.

Un nouveau prestataire devrait :
1. Comprendre le domaine gériatrique (semaines)
2. Décrypter la logique clinique existante (semaines)
3. Formaliser les règles d'activation (mois)
4. Construire les outils de test (mois)
5. Documenter l'ensemble (rarement fait)

**Nous avons fait tout ça. En avance. Proactivement.**

### Le modèle de travail

Nous ne fonctionnons pas comme un prestataire classique :

| Prestataire classique | PRAGMA |
|---|---|
| Facture à l'heure | Facture au résultat |
| Cahier des charges → Specs → Dev | On lit, on comprend, on propose, on implémente |
| Le code lui appartient ou est verrouillé | **Tout le code appartient à Monka, point final** |
| Spécifications longues et coûteuses | Zero-spec : on travaille directement dans le code |
| Support limité au contrat | On forme un dev interne pour la maintenance |

### Et si Monka le faisait en interne ?

L'alternative à PRAGMA, c'est d'embaucher. Voici ce que ça coûte réellement :

| Poste | Salaire annuel brut chargé | Temps d'onboarding |
|---|---|---|
| CTO / Lead Dev | 70 000 – 90 000 € | 2-3 mois avant d'être productif |
| Développeur fullstack #1 | 45 000 – 60 000 € | 1-2 mois |
| Développeur fullstack #2 | 45 000 – 60 000 € | 1-2 mois |
| Designer UI/UX | 40 000 – 55 000 € | 1-2 mois |
| **Total annuel** | **200 000 – 265 000 €** | **3-6 mois avant qu'ils soient opérationnels** |

Et surtout : **aucun d'entre eux ne connaît le KERNEL.** Ils partiraient de zéro. Il leur faudrait des mois juste pour comprendre la logique clinique. Pendant ce temps, les expérimentations approchent et le produit n'avance pas.

Avec PRAGMA, pour **130 000 – 170 000 € en one-shot** (sans charges sociales, sans management, sans recrutement), Monka obtient en 6 semaines ce qu'une équipe interne mettrait 12 mois à produire — si elle y arrive.

### Refonte complète, pas un refactor

Reconstruire l'application depuis une base propre est un choix délibéré. Un refactor de l'existant — modifier le code actuel morceau par morceau — crée de la dette technique : chaque nouveau changement doit composer avec les anciennes décisions, les anciens bugs, les anciens compromis.

Une refonte complète, c'est :
- Une architecture moderne pensée dès le départ pour le KERNEL
- Zéro dette technique héritée
- Un code lisible, maintenable, que n'importe quel développeur peut reprendre
- La possibilité de former un dev interne sur une base propre

### Un framework de qualité production-grade

Nous ne faisons pas du code jetable. PRAGMA travaille avec un framework de développement de 22 chapitres qui codifie les standards d'un développeur senior avec 40 ans d'expérience :

| Domaine | Ce que ça garantit |
|---|---|
| **Architecture** | Templates imposés avant de coder — pas de freestyle |
| **Sécurité** | Authentification, RLS, chiffrement, RGPD dès le jour 1 |
| **Tests** | Pyramide de tests (unit, intégration, E2E), coverage > 80% |
| **CI/CD** | Pipeline automatisé : lint → tests → build → deploy. Pas de déploiement si les tests ne passent pas |
| **Maintenance** | Monitoring (Sentry), alertes automatiques, SLA défini (99.5% uptime) |
| **Debug** | Méthodologie en 5 étapes, post-mortem documenté après chaque incident |
| **Rollback** | Plan de rollback écrit AVANT chaque déploiement. Restauration < 1h |
| **Documentation** | Architecture, API, troubleshooting à jour. Rien n'est dans les têtes |

Concrètement : le code qu'on livre est **auditable, maintenable, et transférable**. Monka peut le reprendre, le faire évoluer, le confier à une autre équipe. Aucun verrouillage.

---

## 3. Ce que nous proposons pour la suite

### La mission

PRAGMA prend en charge le développement de la nouvelle application mobile et du CRM Monka. Nous intégrons le KERNEL clinique validé par Dr. Monka, et nous livrons un produit prêt pour les expérimentations à venir.

Dès que nous avons accès au code, à la base de données et à l'environnement de production de Monka, nous démarrons. Le KERNEL est déjà prêt — il ne reste qu'à le brancher.

### Ce que ça inclut — Sprint de 4 à 6 semaines

Nous ne proposons pas un projet à rallonge avec des phases qui s'étirent sur des mois. Nous proposons un sprint intensif, en immersion totale, où tout avance en parallèle. **4 à 6 semaines. 8 semaines maximum, tout compris.**

#### Semaines 1-2 — KERNEL dans l'app + fondations
- Intégration du KERNEL V5 complet dans l'application mobile
- Scoring en temps réel pour les 5 vulnérabilités
- Génération automatique des micro-tâches IDEC
- Conditions Critiques Composites opérationnelles
- Estimation de charge de travail par profil

#### Semaines 2-4 — Application mobile v2
Refonte de l'app en parallèle, sur la base de l'audit UX de Marwane :
- Parcours utilisateur repensé
- Interface moderne et ergonomique
- Expérience fluide pour les IDEC sur le terrain
- Performances optimisées

#### Semaines 3-6 — CRM & Dashboard
L'outil de pilotage de l'équipe Monka, construit en même temps :
- Pipeline de suivi des aidants
- Dashboard de performance IDEC
- Reporting automatisé pour les partenaires
- Automatisation des tâches récurrentes pour faciliter le quotidien de l'IDEC
- Vision consolidée par territoire

#### En continu — Adaptation à vos ambitions
Nous nous adaptons à vos besoins et à vos envies les plus ambitieuses :
- Automatisations intelligentes dans le CRM (pré-remplissage, alertes, dispatch)
- Préparation des données pour les expérimentations CNRS
- Golden tests pour la validation clinique
- Formation d'un développeur interne pour la maintenance

### Ce que Monka obtient à la fin

- ✅ Une application mobile de nouvelle génération
- ✅ Un CRM adapté à leur métier
- ✅ Le KERNEL clinique intégré et opérationnel
- ✅ Un produit prêt pour les expérimentations
- ✅ **100% du code leur appartient**
- ✅ Un développeur interne formé pour la maintenance courante
- ✅ Une documentation complète et auditable

---

## 4. Investissement

### Comparaison des trois options

| | Studio / ESN | Embauche interne (CTO + 2 devs) | PRAGMA |
|---|---|---|---|
| **Coût** | 170 000 – 300 000 € | 200 000 – 265 000 €/an | **130 000 – 170 000 €** (one-shot) |
| **Délai** | 6-12 mois | 3-6 mois d'onboarding + 12 mois de dev | **4-6 semaines** |
| **Connaissance du KERNEL** | Aucune | Aucune | **Complète** |
| **Charges sociales** | Non | Oui (~42% en plus) | Non |
| **Risque recrutement** | Non | Oui (mauvais profil, turnover) | Non |
| **Propriété du code** | Souvent verrouillé | Oui | **Oui, 100%** |
| **Maintenance après** | Contrat séparé | Salaires continus | Dev interne formé |

### Notre proposition

Nous ne sommes pas un studio classique. Nous ne cherchons pas à maximiser la facturation. Nous cherchons à construire une relation de long terme avec Monka.

| | Montant |
|---|---|
| **Travail déjà livré** (KERNEL, simulateur, app validation, audit UX) | **50 000 €** |
| **Mission complète** (app mobile v2, CRM, intégration KERNEL, formation) | **80 000 – 120 000 €** |
| **Total collaboration** | **130 000 – 170 000 €** |

C'est entre **2× et 3× moins cher** que le marché pour un scope équivalent — et avec une compréhension du produit qu'aucun autre prestataire ne peut avoir.

### Modalités de paiement

> **Notre principe : la flexibilité totale.**

Nous ne demandons pas d'acompte. Nous ne demandons pas de paiement immédiat. Nous croyons en ce que nous construisons avec Monka, et nous sommes prêts à adapter le calendrier de paiement à votre réalité.

**Options proposées :**

| Option | Fonctionnement |
|---|---|
| **À la livraison** | Chaque phase est facturée à la livraison et validation. Vous ne payez que ce qui est livré. |
| **Paiement différé** | Vous validez le montant maintenant, vous payez à 3, 6 ou 12 mois. |
| **Paiement échelonné** | Mensualités régulières sur 12-18 mois. |
| **Equity** | Une partie ou la totalité convertie en parts, si l'alignement stratégique le justifie. |
| **Hybride** | Combinaison des options ci-dessus selon ce qui vous convient. |

**L'objectif n'est pas le cash. L'objectif c'est de construire le meilleur produit possible pour Monka.**

---

## 5. Pourquoi maintenant

### Les expérimentations arrivent

Monka entre dans une phase critique avec les expérimentations à venir. Pour que ces expérimentations réussissent, il faut un produit technique solide en face. Le KERNEL est prêt. L'application doit l'être aussi.

### Le coût de l'inaction

Garder la situation actuelle, c'est :
- Un KERNEL formalisé qui n'est pas intégré dans l'app
- Des expérimentations qui risquent de tourner sur un produit fragile
- Du temps perdu à maintenir une architecture qui a atteint ses limites
- Une dette technique qui s'accumule

### L'opportunité

Avec PRAGMA, Monka obtient en 4 à 6 semaines ce qui prendrait 12-18 mois avec une équipe classique. Et surtout : avec des gens qui comprennent déjà le produit, la logique clinique, et les enjeux.

---

## 6. Prochaines étapes

1. **Validation du périmètre** — Confirmer ensemble les priorités et vos envies
2. **Accord sur les modalités** — Fixer le montant et le mode de paiement qui convient à Monka
3. **Accès au code & à la DB** — On démarre le sprint dès le feu vert
4. **Sprint 4-6 semaines** — Livraisons itératives, validation continue par Dr. Monka
5. **Livraison + formation** — Le produit complet est livré, un dev interne est formé

---

*PRAGMA — Février 2026*  
*Tout le code produit dans le cadre de cette mission est la propriété exclusive de Monka.*
