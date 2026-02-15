# 💎 Offre PRAGMA × MONKA
## Industrialisation du Moteur de Recommandations

> **Client** : Monka  
> **Date** : Février 2026

---

## 🎯 Contexte

Monka a développé une **logique métier complète** : 165 questions, 5 vulnérabilités, recommandations cliniques validées par des professionnels de santé.

**Le problème** : Cette logique existe sous forme de documents (Word, Excel, PDF) mais n'est pas exploitable techniquement. Impossible de :
- Tester les combinaisons de réponses
- Personnaliser selon les profils
- Démontrer le produit aux partenaires
- Intégrer dans un logiciel tiers

**La mission PRAGMA** : Transformer ces documents en un **moteur exécutable et testable**.

---

## 📦 Périmètre de la prestation

### Phase 1 — Interprétation & Structuration des documents

| Activité | Détail |
|----------|--------|
| Réception des documents métier | Questions, recommandations, grilles de scoring |
| Analyse et interprétation | Comprendre la logique implicite |
| Structuration technique | Transformer en données exploitables |
| Inventaire formalisé | Base de données des 165 questions avec métadonnées |

**Input** : Documents bruts Monka  
**Output** : `INVENTAIRE_STRUCTURE.md` + données JSON/structurées

---

### Phase 2 — Audit & Modélisation

| Activité | Détail |
|----------|--------|
| Identification des triggers | 12 questions-clés qui orientent le parcours |
| Modélisation des CCC | Formalisation des Conditions Critiques Composites |
| Conception des personas | 5 AIDANTS + 5 AIDÉS avec arbres de décision |
| Architecture d'overrides | Système pour personnaliser sans dupliquer |

**Output** : `AUDIT_ARCHITECTURE.md` + `PERSONAS_MONKA.md`

---

### Phase 3 — Construction du simulateur

| Activité | Détail |
|----------|--------|
| Développement moteur | Implémentation de la logique de scoring |
| Interface de test | Questionnaire interactif avec résultats live |
| Vue duale | Externe (aidant) + Interne (IDEC) |
| Système ASR | Objectifs de Sécurisation Relationnelle |

**Output** : `monka_simulator.html` — Application standalone fonctionnelle

---

### Phase 4 — Batteries de tests par persona

| Activité | Détail |
|----------|--------|
| Création des scénarios | 10 profils-types (1 par persona) |
| Implémentation comme "personas cliquables" | Test en 1 clic dans le simulateur |
| Traçabilité | Le médecin valide : recommandation attendue = recommandation affichée |
| Boucle d'ajustement | Correction des règles si écart détecté |

**Scénarios** :

| Persona | Cas de test |
|---------|-------------|
| A1 - Actif | Cadre 45 ans, tension travail/aide |
| A2 - Stable | Retraitée, situation maîtrisée |
| A3 - Crise | Épuisement, urgence |
| A4 - Isolé | Seul, sans réseau |
| A5 - Découvreur | Aidant depuis < 6 mois |
| P1-P5 | 5 profils aidés correspondants |

**Output** : Personas intégrés au simulateur + `VALIDATION_TESTS.md`

---

## 💰 Valorisation

### Effort réel

| Phase | Jours |
|-------|-------|
| P1 - Interprétation docs | 2j |
| P2 - Audit & modélisation | 3j |
| P3 - Construction simulateur | 5j |
| P4 - Batteries de tests | 2j |
| **TOTAL** | **12 jours** |

### Benchmark marché détaillé

#### Option 1 : Équipe interne avec CTO

| Profil | Durée | Coût mensuel | Total |
|--------|-------|--------------|-------|
| CTO / Tech Lead | 1-2 mois | 8-12k€ | 12-24k€ |
| Dev Full-stack | 2-3 mois | 5-7k€ | 10-21k€ |
| Product Manager | 1 mois | 5-7k€ | 5-7k€ |
| **TOTAL** | **3-4 mois** | — | **27 000 - 52 000€** |

#### Option 2 : Agence / ESN

| Type | Délai | TJM | Budget |
|------|-------|-----|--------|
| Agence web classique | 6-8 sem. | 600-800€ | 18 000 - 32 000€ |
| Agence spécialisée santé | 4-6 sem. | 900-1200€ | 25 000 - 45 000€ |
| ESN (Capgemini, Sopra...) | 8-12 sem. | 800-1000€ | 40 000 - 80 000€ |

#### Option 3 : Freelance senior (sans IA)

| Profil | Durée | TJM | Total |
|--------|-------|-----|-------|
| Dev senior full-stack | 20-30j | 550-700€ | 11 000 - 21 000€ |
| + Consultant fonctionnel | 5-10j | 600-800€ | 3 000 - 8 000€ |
| **TOTAL** | **5-8 semaines** | — | **14 000 - 29 000€** |

---

### Comparatif final

| Option | Délai | Coût | Risque |
|--------|-------|------|--------|
| Équipe interne + CTO | 3-4 mois | 27-52k€ | 🔴 Élevé |
| Agence santé | 4-6 sem. | 25-45k€ | 🟡 Moyen |
| ESN | 8-12 sem. | 40-80k€ | 🟡 Moyen |
| Freelance senior | 5-8 sem. | 14-29k€ | 🟡 Moyen |
| **PRAGMA** | **2-3 sem.** | **12,5k€** | ✅ Faible |

### Pricing PRAGMA

| Formule | Prix HT |
|---------|---------|
| Facturation temps (TJM 850€) | 10 200€ |
| **Forfait projet** | **12 500€** |
| Forfait + support 3 mois | 15 000€ |

---

## 🎯 Valeur stratégique

### Ce qu'on a livré vs ce que ça permet

| Livrable | Valeur business |
|----------|-----------------|
| Simulateur fonctionnel | **Outil de démo** pour convaincre partenaires |
| Architecture personas | **Différenciation** vs questionnaires statiques |
| Batteries de tests | **Validation clinique** traçable |
| Documentation technique | **Base pour intégration** dans logiciels tiers |

### Le ratio coût/valeur

> **Coût PRAGMA** : ~12 500€  
> **Valeur marché** : Cette brique (moteur personnalisé) permet à Monka de se positionner en SaaS B2B auprès des mutuelles et éditeurs, avec des contrats potentiels à **50-200k€/an**.

---

## 📋 Récapitulatif

| Élément | Valeur |
|---------|--------|
| **Prestation** | Industrialisation du moteur Monka |
| **Durée** | 12 jours |
| **Prix forfait** | **12 500€ HT** |
| **Livrables** | Inventaire structuré, Architecture personas, Simulateur, Tests |

---

*PRAGMA — Février 2026*
