# MONKA — Idées de Solutions PRAGMA

> Document de travail pour le meeting du 3 février 2026

---

## A. Générateur de Documents Appels à Projet

### Le problème traité
Maeva passe des nuits entières à rédiger des documents pour chaque appel à projet (financement, subventions). C'est un travail énorme, répétitif, avec beaucoup de données à compiler.

### La Solution
Un générateur intelligent qui :
- Stocke les données récurrentes (équipe, chiffres, historique)
- Propose des templates par type d'appel à projet
- Pré-remplit les sections récurrentes
- Génère des drafts à partir des éléments clés
- Export PDF/Word prêt à soumettre

### Stack
- Next.js + Supabase
- OpenAI GPT-4 pour la génération
- Templates Markdown → PDF (react-pdf ou Puppeteer)
- Storage Supabase pour les documents

### Valeur
- **Gain de temps** : 80% de réduction sur le temps de rédaction
- **Cohérence** : Données toujours à jour et standardisées
- **Historique** : Base de connaissances pour futurs appels

---

## B. Portail Partenaires Self-Service

### Le problème traité
Demandes de reporting récurrentes des mutuelles/investisseurs. L'équipe passe du temps à compiler et envoyer des stats manuellement.

### La Solution
Un dashboard sécurisé où MGEN/Klésia peuvent voir en temps réel :
- Stats d'usage de leurs adhérents (anonymisées)
- ROI et impact mesurable
- Export PDF en un clic
- Sans solliciter l'équipe Monka

### Stack
- Next.js + Supabase RLS (Row Level Security)
- Recharts pour les graphiques
- Auth par partenaire avec isolation des données

### Valeur
- **Autonomie partenaires** : Moins de sollicitations
- **Transparence** : Données en temps réel = confiance
- **Scalable** : Chaque nouveau partenaire a son espace

---

## C. Dashboard KPIs Investisseurs

### Le problème traité
Temps passé à compiler les KPIs pour les reportings investisseurs.

### La Solution
Un dashboard temps réel avec tous les metrics clés :
- MRR, ARR, churn, CAC, LTV
- Croissance utilisateurs
- Métriques d'engagement
- Export PDF mensuel automatique

### Stack
- Next.js + Supabase
- Recharts / Tremor pour les visualisations
- jsPDF pour l'export
- Cron job pour envoi automatique

### Valeur
- **2 jours/mois économisés** sur le reporting
- **Données toujours à jour** : Plus de décalage
- **Professionnel** : Impression investisseurs

---

## D. Bot FAQ pour IDEC

### Le problème traité
L'équipe IDEC répond aux mêmes questions récurrentes des aidants. Charge de travail répétitive.

### La Solution
Un chatbot intelligent qui :
- Répond aux questions fréquentes (FAQ)
- Escalade vers l'IDEC humaine si nécessaire
- Apprend des échanges précédents
- Intégré dans l'app MyMonka

### Stack
- OpenAI GPT-4 + Embeddings
- pgvector (Supabase) pour le RAG
- API REST pour intégration app

### Valeur
- **Réduction 50%+ des questions simples** traitées par IDEC
- **Disponibilité 24/7** pour les aidants
- **IDEC libérées** pour les cas complexes

---

## E. Newsletter IA + Mini-Podcast

### Le problème traité
Pas le temps de produire du contenu régulier pour les aidants (actu santé, réglementations, conseils).

### La Solution
Système automatisé qui :
- Scrape les actualités santé/aidants
- Génère un résumé hebdomadaire
- Convertit en audio (mini-podcast)
- Distribution par email + in-app

### Stack
- n8n / Make pour l'orchestration
- OpenAI pour la rédaction
- ElevenLabs pour le Text-to-Speech
- Resend pour l'envoi emails

### Valeur
- **Engagement utilisateurs** : Contenu régulier = rétention
- **Positionnement expert** : Monka source d'info
- **Zéro effort** après setup initial

---

## F. Automatisation des Parcours (vision long terme)

### Le problème traité
Le projet IA avec le CNRS vise à automatiser les parcours et définir les facteurs de vulnérabilité.

### Comment PRAGMA peut aider
- Construire l'infrastructure technique
- Intégration avec les APIs CNRS
- Dashboard de visualisation des parcours
- Alertes intelligentes basées sur les facteurs

### Stack
- Python / FastAPI pour le ML pipeline
- Supabase pour le stockage
- Next.js pour le dashboard

---

*Document de travail — Meeting Monka 03/02/2026*
