# ✅ Plan de Préparation — Meeting CTO Lundi 3 mars

> **Objectif :** Arriver lundi 100% prêt, avec tous les livrables et la capacité d'expliquer le moteur + proposer la suite.

---

## 📦 LES LIVRABLES À PRÉPARER

| # | Livrable | Statut | Fichier |
|---|----------|:------:|---------|
| 1 | Analyse code engine (rôle de chaque fichier) | ✅ FAIT | `ANALYSE_CODE_ENGINE.md` |
| 2 | Doc contexte meeting (approche hybride) | ✅ FAIT | `PREP_MEETING_CTO_3MARS.md` |
| 3 | Présentation CTO (format propre, déroulé) | ⬜ À FAIRE | `PRESENTATION_CTO.md` |
| 4 | Démo Simulateur fonctionnelle | ⬜ À VÉRIFIER | Lancer l'app et tester |
| 5 | Démo proto Marwane fonctionnelle | ⬜ À VÉRIFIER | Lancer et tester |
| 6 | Workflow/SOP PRAGMA pour implémentation V2 | ⬜ À FAIRE | À intégrer dans la présentation |

---

## 📅 PLANNING DE PRÉPARATION

### SAMEDI 1er mars

| Heure | Quoi | Comment |
|-------|------|---------|
| **10h–11h30** | Quiz boss Monka | L'agent joue le CTO, Antonin déroule la présentation à l'oral |
| **11h30–12h30** | Construire la présentation finale | Rédiger `PRESENTATION_CTO.md` — format propre et structuré |
| **12h30–13h** | Vérifier les démos | Lancer Simulateur + proto Marwane, s'assurer que tout tourne |

### DIMANCHE 2 mars

| Heure | Quoi |
|-------|------|
| **Matin (30 min)** | Relire la présentation 1 fois |
| **Après-midi (30 min)** | Répéter à voix haute le déroulé du meeting |
| **Soir** | Avoir les docs prêts sous le coude (Kernel V5, PRD, ANALYSE_CODE) |

### LUNDI 3 mars (avant le meeting)

| Heure | Quoi |
|-------|------|
| **Matin (15 min)** | Relire la présentation une dernière fois |
| **Juste avant** | Ouvrir le Simulateur + les docs dans des onglets |

---

## 🎤 CE QU'ON DOIT SAVOIR EXPLIQUER

### Sur le moteur (Antonin)
- [ ] Le pipeline complet (Question → Trigger → Règle → Catégorie → Reco → MT → Score)
- [ ] Les concepts clés (CCC, ASR, K3 englobement, K13 scoring indépendant)
- [ ] Le rôle de `clinicalEngine.ts` et les 5 fonctions clés
- [ ] Les 15 tables et leur rôle
- [ ] Ce qui est transférable vs ce qui doit être réécrit
- [ ] Les auto-diagnostics (Health Score + Integrity Checks)

### Sur l'UI (Marwane)
- [ ] Le Design System Wellness Premium
- [ ] Les 35 composants + 3 écrans
- [ ] Le mapping Moteur → UI (HeroCard → TaskCard → RecoCard → MicroTaskItem)
- [ ] La règle copywriting (jamais de termes cliniques visibles)

### Sur la collaboration (Antonin + Marwane)
- [ ] Le modèle CTO (définit) → PRAGMA (exécute)
- [ ] Le workflow concret (sprint planning → code → PR → review → merge)
- [ ] Les estimations (4-6 semaines vs 5-6 mois pour une équipe classique)
- [ ] Pourquoi on est meilleurs qu'un dev junior (0 ramp-up, connaissance métier)

---

## ⚡ LES QUESTIONS À POSER AU CTO

1. "Comment recommandez-vous qu'on intègre le Kernel dans MyMonka ?"
2. "Quels sont vos standards pour la CI/CD et le déploiement ?"
3. "Préférez-vous que la logique clinique soit un package séparé ou intégré dans le monorepo ?"
4. "Quel est votre framework de tests préféré (Vitest, Jest, autre) ?"
5. "On peut faire un sprint pilote cette semaine pour vous montrer comment on travaille ?"

---

*Plan opérationnel — 28 février 2026*
