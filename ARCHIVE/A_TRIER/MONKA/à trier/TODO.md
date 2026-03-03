# MONKA — TODO Solutions Finales

> Idées retenues pour le meeting du 3 février 2026

---

## ✅ SOLUTIONS À PROPOSER

### 1. 📄 Générateur Dossiers Appels à Projet
**Pain point** : Maeva passe des nuits à rédiger les AAP (Article 51, CNSA, subventions)
- Stocke les "briques" récurrentes (vision, équipe, chiffres)
- Génère un premier jet structuré par type d'AAP
- Export PDF/Word prêt à soumettre

**Stack** : Next.js + OpenAI + Templates Markdown + react-pdf  
**Temps** : ~3 semaines

---

### 2. 🤖 Assistant Copilote IDEC
**Pain point** : 1 seule IDEC pour 3K+ aidants, promesse J+1 difficile à tenir
- Interface RAG connectée à la doc médicale
- Pré-rédige les réponses aux aidants
- IDEC valide seulement (Human-in-the-loop)

**Stack** : Next.js + Supabase (pgvector) + Claude 3.5  
**Temps** : 2-3 mois

---

### 3. 🏢 Portail Partenaires Self-Service (Mutuelles)
**Pain point** : Reporting récurrent MGEN/Klésia fait à la main
- Dashboard sécurisé temps réel
- Stats usage par partenaire (anonymisées)
- ROI visible, export en un clic

**Stack** : Next.js + Supabase RLS + Recharts  
**Temps** : < 2 mois

---

### 4. 🎙️ Newsletter IA + Mini-Podcast
**Pain point** : Pas de contenu régulier pour les 3K aidants
- Scrape actu santé/aidants
- Résumé hebdo écrit + audio (3 min)
- Distribution email + in-app

**Variante interne** : Veille réglementaire automatisée pour l'équipe Monka

**Stack** : n8n + OpenAI + ElevenLabs + Resend  
**Temps** : < 2 semaines

---

## 📊 PRIORISATION FINALE

| Priorité | Solution | Effort | Valeur |
|----------|----------|--------|--------|
| 1 | Générateur AAP | ⭐ Faible | Libère temps fondateurs |
| 2 | Newsletter Podcast | ⭐ Très faible | Engagement + rétention |
| 3 | Portail Mutuelles | ⭐⭐ Moyen | Autonomie B2B |
| 4 | Assistant IDEC | ⭐⭐⭐ Élevé | Scalabilité critique |

---

## 🎯 RAPPELS STRATÉGIQUES

- **Objectif meeting** : Les faire parler, pas pitcher
- **Approche** : Quick wins d'abord, projets structurels ensuite
- **Mantra** : "Votre métier. Votre outil."
- **Technique** : On augmente Lifeline, on ne le remplace pas

---

_Préparé le 02/02/2026_
