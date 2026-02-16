# 📋 TODO — Lundi 16 fév 2026

> Priorités pour la prochaine session.

---

## 🔴 Priorité 1 — Vérifier les verbatims Parcours

Le mapping verbatims → screenshots a été refait intégralement (22 écrans, 3 parcours).
**Il faut vérifier visuellement que chaque verbatim correspond bien à son screenshot.**

### À checker :
- [ ] **Parcours 1 — Onboarding** (10 écrans)
  - [ ] Écran 2 (Âge) : coquille "quel âge la personne" bien visible sur le screenshot ?
  - [ ] Écran 5 (Analyse) : verbatim U8 "cliqué sur retour" cohérent avec l'écran ?
  - [ ] Écran 6 (Stepper) : label "Stepper Essai 7 jours" OK ? (pas "Paywall")
  - [ ] Écran 7 (Dashboard À la une) : verbatim U2 "personnalisé" correspond bien ?
  - [ ] Écran 8 (Dashboard scroll) : U1 "je ne sais pas par lequel commencer" ← vérifié
  - [ ] Écran 9 (Articles) : I2 "badges perçus comme boutons" visible sur le screenshot ?

- [ ] **Parcours 2 — Dashboard** (8 écrans)
  - [ ] Écran 1 (Santé) : I1 "taille police" pertinent sur cet écran ?
  - [ ] Écran 3 (Démarches) : C5 "formulations floues" visible ?
  - [ ] Écran 4 (Démarches scroll) : C11 "c'est fait" visible sur le screenshot ?
  - [ ] Écran 5 (Services) : C12 "fais-toi aider" visible ?

- [ ] **Parcours 3 — Profil** (4 écrans)
  - [ ] Écran 2 (Vous et votre proche) : coquille "Modifer" visible sur le screenshot ?
  - [ ] Écran 4 (Ajout interlocuteur) : U17 recherche dysfonctionnelle cohérent ?

---

## 🟠 Priorité 2 — Screenshots manquants

Certaines critiques **bloquantes** n'ont pas de screenshot associé dans `/public/screenshots/`.
Il faut reprendre l'app Monka réelle et capturer les écrans manquants.

### Screenshots à prendre :
- [ ] **Questionnaire Q1** — "J'aide une personne souffrante" (C1 — mot stigmatisant)
- [ ] **Questionnaire Q2** — "Quelle activité exercez-vous ?" (C2 — formulation incorrecte)
- [ ] **Questionnaire Q12** — Question illisible avec parenthèses (C5)
- [ ] **Questionnaire code postal** — Champ libre sans autocomplétion (U15/C3)
- [ ] **Questionnaire "Où vit la personne ?"** — Pas d'option "hospitalisée" (U16)
- [ ] **Questionnaire réponse unique** — Q1 type de proche (U4 — devrait être multi)
- [ ] **Paywall / Pricing** — Les 3 cartes (Découverte/Essentiel/Sérénité) (C9/I3/P4)
- [ ] **Bouton "C'est fait"** — Sur une page d'information (C11)
- [ ] **Mail de confirmation** — Pas reçu après inscription (U11)

### Une fois les screenshots pris :
- [ ] Les ajouter dans `/public/screenshots/`
- [ ] Reconstruire les parcours avec les écrans manquants intercalés
- [ ] Mettre à jour `JOURNEY_1_SCREENS` avec les nouveaux écrans

---

## 🟡 Priorité 3 — Mettre à jour la Roadmap

- [ ] Marquer comme ✅ les items terminés dans `ROADMAP.md`
- [ ] Ajouter les nouveaux items identifiés pendant le mapping
- [ ] Reprioritiser l'ordre de bataille

---

## 🟢 Priorité 4 — Review Page

- [ ] Continuer les items 1.1 à 1.7 de la roadmap (titres, criticité, pédagogie…)
- [ ] Intégrer les screenshots manquants une fois pris
