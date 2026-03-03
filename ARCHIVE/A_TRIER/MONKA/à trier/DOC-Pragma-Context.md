# PRAGMA — Base de Connaissance

> Document source pour NotebookLLM — Février 2026

---

## 1. IDENTITÉ DE L'ENTREPRISE

### Qui est PRAGMA ?
**PRAGMA** est un **Studio d'Ingénierie Opérationnelle** dédié aux PME en croissance (10-100 employés). Nous construisons des **solutions SaaS sur-mesure** qui centralisent et automatisent les processus métier.

- **Site web** : https://pragma.music (en construction)
- **Mission** : "Votre métier. Votre outil."
- **Cible** : PME en croissance, startups tech, entreprises B2B

### Vision
Concevoir des systèmes sur-mesure pour que les entrepreneurs puissent se reconcentrer sur leur cœur de métier.

### Philosophie : Sérénité Opérationnelle
Le système PRAGMA priorise le **jugement humain** sur le remplacement algorithmique.

---

## 2. LE PATTERN "PILOTE"

```
┌─────────────────────────────────────────────────────────┐
│                    COCKPIT DÉCISIONNEL                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   🤖 L'APPLICATION                👤 L'HUMAIN          │
│   ─────────────────               ─────────────────     │
│   • Centralise vos outils         • CONTRÔLE TOTAL      │
│   • Intègre vos workflows         • Décisions finales   │
│   • Automatise le répétitif       • Validation          │
│   • Un seul cockpit métier        • Stratégie           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Principe** : PRAGMA construit des applications sur-mesure qui centralisent tous vos outils métier en un seul cockpit. Plus de jonglage entre 10 logiciels — une interface unique, adaptée à votre façon de travailler.

---

## 3. PROPOSITION DE VALEUR : LES 3 PILIERS

| Pilier | Description |
|--------|-------------|
| 🤝 **Support Dédié** | Accompagnement personnalisé par les fondateurs |
| 📈 **Évolutif** | Architecture conçue pour durer une décennie |
| ✨ **Sans Engagement** | Partenariat basé sur la confiance |

---

## 4. L'ÉQUIPE PRAGMA

### Fondateurs
| Nom | Rôle |
|-----|------|
| **Marwane El Moutribi** | CEO & Développeur |
| **Antonin Graciano** | Co-fondateur & Développeur |

---

## 5. STACK TECHNIQUE "GOLDEN STACK"

### Frontend
- Next.js 15
- React 19
- Tailwind CSS 4

### Intelligence
- Gemini Ultra / Claude 3.5
- Prompt Engine (Classification, Retrieval, Composition)

### Hébergement
- Vercel (Cloud native)

### Data Persistence
- Supabase (PostgreSQL)

### Design Standard
- Nanobanana (Liquid Glass)

---

## 6. MÉTHODE DE DÉVELOPPEMENT

### Phases de livraison
1. **Strategy** : Découverte des besoins et bottlenecks
2. **Tech Discovery** : Exploration technique
3. **Mockups** : Prototypage UI/UX
4. **Schema** : Architecture base de données
5. **Implementation** : Développement
6. **Hardening** : Sécurité et optimisation

### Blueprinting itératif
- Utilisation systématique de `plan.md` et `execution.md`
- Précision et rapidité

---

## 7. CE QUE PRAGMA PEUT CONSTRUIRE

### Solutions Rapides (< 2 mois)

#### 📧 Newsletter IA + Mini-Podcast
- Génération automatique de contenu
- Text-to-Speech avec ElevenLabs
- Distribution newsletter
- **Stack** : n8n + OpenAI + ElevenLabs + Resend

#### 📊 Dashboard KPI Investisseurs
- Métriques temps réel
- Export PDF automatique
- Graphiques interactifs
- **Stack** : Next.js + Supabase + Recharts + jsPDF

#### 🏢 Portail Partenaires Self-Service
- Stats d'usage par partenaire
- ROI automatique
- Accès sécurisé
- **Stack** : Next.js + Supabase RLS + Auth

#### 🤖 FAQ Bot RAG
- Réponses automatiques basées sur documentation
- Réduction charge support
- Apprentissage continu
- **Stack** : OpenAI + pgvector + Supabase

### Solutions Structurelles (2-6 mois)

#### 💬 IA Conversationnelle Avancée
- Modèle RAG sur documentation métier
- Personnalisation par profil utilisateur
- Intégration multi-canal

#### 🔔 Système de Notifications Intelligent
- Personnalisation des alertes
- A/B testing
- Optimisation timing

#### 🔗 Pipeline d'Intégration
- APIs mutuelles / hôpitaux / calendriers
- Synchronisation temps réel
- Webhooks bidirectionnels

#### 🎨 Refonte UI/UX
- Interface senior-friendly
- WCAG AA compliance
- Dark mode

---

## 8. MODÈLE COMMERCIAL

### Approche OPEX (pas CAPEX)
- **Abonnement mensuel** plutôt que projet one-shot
- Pas d'engagement long terme
- Évolution continue incluse

### Règle du 1/3 de la Valeur
PRAGMA facture environ 1/3 de la valeur générée pour le client.

### Exemples de pricing indicatif
| Solution | Estimation mensuelle |
|----------|---------------------|
| Newsletter IA | 500-1000€/mois |
| Dashboard KPI | 800-1500€/mois |
| Portail Partenaires | 1000-2000€/mois |
| Bot FAQ | 600-1200€/mois |

---

## 9. PHILOSOPHIE IA

### Human-Centric Intelligence
L'IA chez PRAGMA est un **amplificateur cognitif**, pas un remplacement humain.

### Principes
1. **LLM Principle** : Les LLMs sont construits sur la pensée commune ; ils ne deviennent spécialisés qu'une fois injectée l'expertise métier unique du client.
2. **Human-Driven Reasoning** : La stratégie vient du fondateur. L'IA supporte le "Comment", l'humain définit le "Quoi".
3. **Augmentation Over Automation** : L'utilisateur reste aux commandes.

---

## 10. MANTRA ENTREPRISE

> **"Le volume bat le talent"** — La présence constante et la livraison à l'échelle multiplient le talent brut.

> **"Votre métier. Votre outil."** — Le logiciel doit s'adapter au business, pas l'inverse.

---

## 11. CE QUI NOUS DIFFÉRENCIE

### vs. Agence web classique
- Pas de site vitrine one-shot
- Solutions métier fonctionnelles
- Accompagnement long terme

### vs. Éditeur SaaS
- Pas de logiciel générique
- Adaptation 100% au workflow client
- Propriété des données

### vs. ESN / SSII
- Pas de consulting sans livrable
- Équipe de 2 personnes agiles
- Décisions rapides

---

## 12. INFRASTRUCTURE & DONNÉES

- **Hébergement** : Vercel (Cloud performant)
- **Base de données** : Supabase (PostgreSQL managé)
- **Conformité** : RGPD, stockage sécurisé
- **Isolation client** : Row Level Security

---

## 13. PRODUITS INTERNES

### PRAGMA OS (en développement)
- Dashboard interne CRM
- Portails clients
- Repository mirroring
- AI knowledge ingestion

### PRAGMA Content Studio
- Outil d'automatisation social media
- Génération de contenu
- Calendrier éditorial

### PRAGMA Videos
- Génération vidéo programmatique (Remotion)
- Assets marketing automatisés

---

*Document généré pour NotebookLLM — Février 2026*
