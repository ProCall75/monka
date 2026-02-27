# Analyse des prix du marché — Vérification des estimations PRAGMA × Monka

> **Date** : 27 février 2026
> **Sources** : Recherche web sur les tarifs marché France 2025-2026

---

## 1. Tarifs de référence marché

### TJM (Taux Journalier Moyen) — France 2025-2026

| Profil | TJM Freelance | TJM via ESN/Studio | Source |
|---|---|---|---|
| Développeur React/TypeScript senior (5+ ans) | 600 – 850 € | 800 – 1 200 € | Malt, FreelanceIndex, Silkhom |
| Architecte / Expert technique (10+ ans) | 900 – 1 200 € | 1 200 – 1 500 € | Code-Talent |
| Product Manager e-santé | 700 – 800 € | 900 – 1 100 € | Malt, Noe.pm |
| Designer UX/UI senior | 500 – 700 € | 700 – 1 000 € | Use.design, DigitalUnicorn |
| Rédacteur technique / documentation | 375 – 600 € | 500 – 800 € | Free-Work |
| Consultant technique santé | 583 – 700 € | 800 – 1 100 € | Free-Work, Indeed |

### Tarifs par type de prestation

| Prestation | Fourchette marché | Source |
|---|---|---|
| Audit UX/UI complet (app mobile) | 6 000 – 30 000 € | YieldStudio, WebMobTech |
| Application e-santé complexe (dev complet) | 100 000 – 500 000 € | Idealink, Digital-Paca, NetDevices |
| Plateforme de télémédecine | 90 000 – 97 000 € | Idealink |
| Application de suivi patient | 42 500 – 52 000 € | Idealink |
| Cahier des charges / PRD (SaaS/outil métier) | 1 500 – 3 500 € | Extern-Market |
| Rédaction documentation technique (par heure) | 100 € HT/h | Exotiz |
| Modélisation algorithme clinique (projet IA santé France 2030) | 950 000 – 2 110 000 € | Bpifrance, Health Data Hub |

---

## 2. Calcul détaillé — Ce que le travail PRAGMA vaut sur le marché

### Méthode 1 : Estimation par TJM

Si on estime le volume de travail en jours-homme et qu'on applique les TJM marché :

| Bloc de travail | Jours estimés | Profil | TJM Freelance | TJM ESN | Coût Freelance | Coût ESN |
|---|---|---|---|---|---|---|
| **Compréhension métier clinique** (assimilation questionnaires, Excel, Word, logique clinique) | 8-10j | Product Manager e-santé | 750 € | 1 000 € | 6 000 – 7 500 € | 8 000 – 10 000 € |
| **Formalisation KERNEL** (18 règles K1-K18, pipeline 5 étapes, 240 activation rules en JSON) | 15-20j | Architecte technique + Product | 900 € | 1 200 € | 13 500 – 18 000 € | 18 000 – 24 000 € |
| **Audit et recherche CCC** (audit intra-V, inter-MP, cross-V, 16 propositions, 4 mono-sévères) | 5-7j | Product Manager e-santé | 750 € | 1 000 € | 3 750 – 5 250 € | 5 000 – 7 000 € |
| **Overlay aidance** (37 règles, 5 types d'aidance, justifications cliniques) | 4-5j | Product Manager e-santé | 750 € | 1 000 € | 3 000 – 3 750 € | 4 000 – 5 000 € |
| **Base de données** (17 tables, ~3 400 enregistrements, architecture, migrations) | 8-10j | Dev senior React/TS | 700 € | 1 000 € | 5 600 – 7 000 € | 8 000 – 10 000 € |
| **450 content_blocks** (rédaction sens clinique, justifications, pondérations, matrices) | 10-12j | Rédacteur technique + Product | 600 € | 800 € | 6 000 – 7 200 € | 8 000 – 9 600 € |
| **Clinical Engine app** (7 pages React/TS/Vite : dashboard, simulateur, vulnérabilités, MPs, personas, docs, roadmap) | 15-20j | Dev senior React/TS | 700 € | 1 000 € | 10 500 – 14 000 € | 15 000 – 20 000 € |
| **Prototype démo** (3 pages, React Flow, app simulée, déployé Vercel) | 8-10j | Dev senior + Designer | 700 € | 1 000 € | 5 600 – 7 000 € | 8 000 – 10 000 € |
| **Audit UI/UX** (analyse complète, parcours, maquettes, benchmark, slide deck 10 slides) | 5-7j | Designer UX/UI senior | 600 € | 900 € | 3 000 – 4 200 € | 4 500 – 6 300 € |
| **Documentation** (PRD 27k mots, architecture app+DB, sprint V2, glossaire) | 8-10j | Product Manager + Rédacteur | 600 € | 800 € | 4 800 – 6 000 € | 6 400 – 8 000 € |
| **27 certifications moteur** + app de validation éphémère | 5-7j | Dev + Product | 700 € | 1 000 € | 3 500 – 4 900 € | 5 000 – 7 000 € |
| **Coordination, itérations, échanges Dr. Rimaud** (35+ documents échangés) | 5-7j | Chef de projet | 700 € | 900 € | 3 500 – 4 900 € | 4 500 – 6 300 € |
| **TOTAL** | **~96-125 jours** | — | — | — | **68 750 – 89 700 €** | **94 400 – 123 200 €** |

### Méthode 2 : Estimation par livrable (comparable marché)

| Livrable | Comparable marché le plus proche | Fourchette marché | Ajustement PRAGMA |
|---|---|---|---|
| Moteur clinique déterministe complet | Modélisation algo clinique / moteur décisionnel santé | 50 000 – 150 000 € (projets BPI / France 2030 : 950k-2.1M€) | On est dans du **niche health-tech**. Un consultant spécialisé facturerait 50k+ rien que pour la formalisation des règles. |
| Application Clinical Engine (7 pages) | Application e-santé complexe | 30 000 – 60 000 € | Application de complexité moyenne-haute, mais avec intégration clinique profonde |
| Base de données structurée + content_blocks | Architecture de données santé + documentation clinique | 15 000 – 30 000 € | Les content_blocks à eux seuls sont un livrable unique — introuvable chez un prestataire standard |
| Audit UI/UX + prototype démo | Audit UX complet + prototypage | 12 000 – 25 000 € | Aligné avec les tarifs agence (6k-30k pour l'audit, 8k-15k pour le prototype) |
| Documentation complète (PRD + certifications + architecture) | Documentation technique professionnelle complète | 8 000 – 15 000 € | 27k mots de PRD + 27 certifications = volume très supérieur à la moyenne |
| **TOTAL estimation par livrable** | — | **115 000 – 280 000 €** | — |

---

## 3. Vérification des estimations dans la proposition commerciale V2

| Livrable (dans la proposition) | Notre estimation actuelle | Estimation vérifiée (freelance) | Estimation vérifiée (ESN) | Verdict |
|---|---|---|---|---|
| Moteur clinique complet | 30 000 – 50 000 € | 30 000 – 35 000 € (TJM) / 50 000+ € (livrable) | 40 000 – 50 000 € | ✅ **Correct**, voire conservateur. Le volet clinique spécialisé (CCC, overlays, scoring) est très difficilement chiffrable car quasi introuvable sur le marché. |
| Clinical Engine app | 15 000 – 25 000 € | 10 500 – 14 000 € (TJM) | 15 000 – 20 000 € | ✅ **Correct**. Cohérent avec une app React/TS de 7 pages avec données dynamiques. |
| Base de données + content_blocks | 8 000 – 15 000 € | 11 600 – 14 200 € (TJM combiné) | 16 000 – 19 600 € | ⚠️ **Sous-estimé**. Les content_blocks (450 éléments de documentation clinique structurée) seuls valent 6-7k€ en rédaction technique. L'architecture DB (17 tables) en vaut autant. Estimation corrigée : **12 000 – 20 000 €** |
| 35+ documents + certifications | 10 000 – 20 000 € | 8 300 – 11 800 € (TJM) | 11 400 – 15 300 € | ✅ **Correct**. Volume important (27 certifications + audits + réflexions) mais difficile de facturer la "réflexion" au marché. |
| Audit UI/UX + slide deck | 5 000 – 10 000 € | 3 000 – 4 200 € (TJM) | 4 500 – 6 300 € | ✅ **Correct**, voire légèrement haut pour un freelance mais aligné avec une agence. |
| Prototype démo | 8 000 – 15 000 € | 5 600 – 7 000 € (TJM) | 8 000 – 10 000 € | ⚠️ **Légèrement haut** pour un freelance, aligné ESN. Estimation corrigée : **6 000 – 12 000 €** |
| Certification clinique avec médecin | Non coté | **Introuvable** sur le marché | **Introuvable** | ✅ **Argument massif**. Aucun prestataire ne propose ça. Valeur ajoutée non quantifiable. |
| **TOTAL dans la proposition** | **76 000 – 135 000 €** | **68 750 – 89 700 €** (TJM) | **94 400 – 123 200 €** (ESN) | ✅ **Globalement correct et défendable** |

---

## 4. Synthèse

### Les estimations dans la proposition V2 sont-elles défendables ?

| Critère | Verdict |
|---|---|
| **Fourchette basse (76k€)** | ✅ Solide — aligné avec l'estimation TJM freelance (69-90k€) |
| **Fourchette haute (135k€)** | ✅ Défendable — aligné avec l'estimation ESN (94-123k€) + valeur ajoutée clinique non quantifiable |
| **Notre proposition à 50k€** | ✅ **Clairement en-dessous du marché** — 28-42% de réduction vs freelance, 47-60% vs ESN |
| **Argument "introuvable"** | ✅ **Très fort** — la certification clinique, les CCC cross-V, les content_blocks et les 37 règles d'overlay sont quasi impossibles à acheter sur le marché |

### Recommandation

Les estimations marché dans la proposition sont **correctes et défendables**. Deux ajustements mineurs possibles :
1. La DB + content_blocks pourrait être remontée à **12 000 – 20 000 €** (actuellement 8 000 – 15 000 €)
2. Le prototype démo pourrait être descendu à **6 000 – 12 000 €** (actuellement 8 000 – 15 000 €)

**Impact net** : le total marché resterait dans la même fourchette (~76-135k€), ce qui reste cohérent.

**Le prix de 50 000 € est non seulement défendable mais objectivement avantageux pour Monka.**
