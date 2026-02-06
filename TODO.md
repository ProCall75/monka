# 📋 TODO - Monka Clinical Engine

> **Priorité #1** : Gérer et stabiliser le moteur existant avant toute extension.

---

## 🔴 Priorité Haute - Moteur Existant

### 1. Vérification Legacy vs Documents Actualisés
- [x] Comparer les documents dans `VERIF/` (nouveaux envoyés par le client) avec les sources existantes
- [x] Identifier les écarts entre les versions legacy et les versions mises à jour → **Voir `AUDIT/audit_divergences_legacy_060226.md`**
- [ ] Mettre à jour les sources si nécessaire (en attente validation)

### 2. Implémentation Visuelle Simulator
- [ ] S'assurer de la logique commune pour toutes les vulnérabilités (V1-V5)
- [ ] Vérifier la cohérence visuelle du simulator pour toutes les vulnérabilités
- [ ] Valider que le simulator permet de travailler efficacement sur chaque vulnérabilité

> ✅ **Structure V2 créée** : Voir `QUESTIONNAIRE_V2/` avec 7 templates standardisés

### 3. Audit Global du Moteur
- [ ] Vérifier la cohérence des micro-tâches
- [ ] Vérifier la cohérence des micro-parcours
- [ ] Documenter les questions pour le service médical (Dr. Moreau)
- [ ] Objectif : rendre le questionnaire le plus pertinent possible pour les utilisateurs
- [ ] Note : Les questions sont figées pour l'instant

---

## 🟠 Priorité Moyenne - Copywriting & Contenu

### 4. Audit Copywriting Recommendations
- [ ] Analyser si les recommendations pour toutes les questions sont bien écrites
- [ ] Évaluer la différence entre :
  - Copywriting côté **recommendations utilisateur**
  - Copywriting côté **micro-tâches IDEC**
- [ ] Proposer une harmonisation si nécessaire

### 5. Questions Spécifiques & Pertinence Contextuelle
- [ ] Identifier les questions avec mentions spécifiques (ex: "votre enfant")
- [ ] Lister les questions liées à la pédiatrie ou cas spécifiques
- [ ] Vérifier que ces questions ne s'activent pas pour tous les utilisateurs si non pertinent
- [ ] Investiguer les questions vraiment spécifiques à des cas ou personas particuliers

---

## 🟡 Priorité Basse - Évolution & Personnalisation

### 6. Maquettes UI/UX App Utilisateur
- [ ] Créer des maquettes pour l'app utilisateur
- [ ] Proposer des améliorations UI/UX
- [ ] Documenter ce qui pourrait être amélioré dans l'app

### 7. Personnalisation par Personas
- [ ] Analyser les documents personas existants
- [ ] Exploiter les questions trigger pour la détection de persona
- [ ] Proposer une personnalisation des recommendations selon le persona détecté

---

## 📝 Notes

- **Questions figées** : Le questionnaire actuel ne sera pas modifié, l'objectif est d'optimiser ce qui existe
- **Collaboration médicale** : Les docs d'audit serviront à questionner le Dr. Moreau pour valider la pertinence clinique
- **Approche itérative** : Stabiliser le moteur existant avant d'ajouter de nouvelles fonctionnalités
