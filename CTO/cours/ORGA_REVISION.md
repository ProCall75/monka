# 📋 Plan de Révision — Formation CTO

> **Deadline** : Dimanche 2 mars au soir
> **Méthode** : 3 passes — Lecture → Relecture + Notes → Relecture + Q&A
> **Principe** : Lire TOUT à chaque passe. La répétition espacée est le meilleur outil de mémorisation.

---

## 🗓️ VENDREDI 27 FÉVRIER — Passe 1 : Lecture complète

**Objectif** : Tout lire une première fois pour avoir la vue d'ensemble. Ne pas chercher à tout retenir — juste absorber.

### Ordre de lecture recommandé

| # | Fichier | Pourquoi dans cet ordre |
|---|---------|------------------------|
| 1 | `ANTI_FREEZE.md` | **Commence par les questions.** Ça te donne le cadre mental : tu sais exactement ce que le CTO peut te demander. Toute la lecture qui suit aura un objectif clair — répondre à ces questions. |
| 2 | `01_ARCHITECTURE.md` | Les fondations de tout. SOLID, Clean Architecture, Design Patterns — c'est le vocabulaire de base. Sans ça, le reste n'a pas de contexte. |
| 3 | `10_PRODUCTION_READINESS.md` | Le sujet numéro 1 du meeting. Le CTO va naviguer dans le Kernel et évaluer la prod-readiness. Ce module te donne les critères exacts qu'il va utiliser. |
| 4 | `12_VIBECODING_POSITIONING.md` | Ta stratégie de communication. Court et percutant. Il te donne les mots à utiliser et ceux à bannir — ça se lit vite et ça change la donne. |
| 5 | `04_DATABASE.md` | Supabase = PostgreSQL. Le CTO va regarder le schéma, les RLS, les migrations. Ce module te prépare à toutes les questions DB. |
| 6 | `06_SECURITE.md` | Données de santé = sécurité non-négociable. HDS, RGPD, OWASP. Si tu connais ces 3 acronymes en profondeur, tu marques des points. |
| 7 | `02_FRONTEND.md` | React, TypeScript, pourquoi SPA. Le CTO verra ce code en premier — c'est la couche visible. |
| 8 | `03_BACKEND_API.md` | REST, JWT, status codes. Les bases du backend même si Supabase fait le gros du travail. |
| 9 | `07_TESTING.md` | La pyramide de tests + TDD. Le CTO posera la question "c'est quoi votre stratégie de tests" — c'est garanti. |
| 10 | `08_CODE_QUALITY.md` | Git flow, code review, dette technique. Comment tu travailles au quotidien. |
| 11 | `05_DEVOPS_INFRA.md` | CI/CD, Docker, environnements. Le pipeline de déploiement. |
| 12 | `09_PERFORMANCE.md` | Core Web Vitals, N+1, caching. Moins prioritaire mais bon à connaître. |
| 13 | `11_METHODOLOGIE_PROJET.md` | Agile, Scrum, estimation. Comment tu gères un projet structuré. |
| 14 | `GLOSSAIRE.md` | À parcourir en fin de session. Identifie les termes que tu ne connaissais pas encore — ce sont tes points faibles à renforcer. |

### Consignes Passe 1
- **Lis sans t'arrêter.** Si un concept est flou, note-le mais continue — la répétition les fixera.
- **Ne prends pas de notes détaillées.** Juste surligne mentalement ce qui te semble le plus important.
- **Durée estimée : 2h à 2h30.** C'est du markdown bien structuré, ça se lit vite.

---

## 🗓️ SAMEDI 28 FÉVRIER — Passe 2 : Relecture + Notes

**Objectif** : Relire tout, mais cette fois en mode actif. Prendre des notes, reformuler dans tes mots.

### Méthode
1. **Relis chaque module dans le même ordre**
2. **Pour chaque bloc Pareto 80/20** : note les concepts clés dans tes propres mots (pas copier-coller — reformuler force la compréhension)
3. **Pour chaque "phrase clé"** en italique : lis-la à voix haute. Si ça sonne naturel → tu la maîtrises. Si ça coince → reformule.
4. **Pour le GLOSSAIRE** : relis spécifiquement les termes que tu avais identifiés comme flous vendredi

### Focus renforcé samedi
À la deuxième lecture, tu repéreras naturellement les zones où tu te sens moins solide. Passe plus de temps dessus :
- Les **tableaux comparatifs** (REST vs GraphQL, Monolithe vs Microservices) → Ce sont des questions CTO classiques
- Les **diagrammes et schémas** (pyramide de tests, Clean Architecture, flow JWT) → Savoir les dessiner au tableau blanc si le CTO le demande
- Le **vocabulaire** (SLA/SLO/SLI, CQRS, DDD) → Si tu sais pas le définir à la 2ème lecture, c'est un point faible à bosser

### Enrichissement
**Si tu as des questions pendant la relecture → note-les et envoie-les moi.** Je compléterai les documents avec les réponses. Le but c'est que dimanche soir, chaque module soit 100% clair.

### Durée estimée : 2h à 3h (avec les notes et reformulations)

---

## 🗓️ DIMANCHE 1ER MARS — Passe 3 : Test + Enrichissement

**Objectif** : Passer du "je connais" au "je sais le dire". Simuler le meeting.

### Matin : Relecture finale rapide
- Relis tous les **blocs Pareto 80/20** uniquement (15-20 min) — C'est ton warm-up
- Relis tes **notes de samedi** — Ce qui a changé depuis ?

### Après-midi : Simulation
1. **Ouvre ANTI_FREEZE.md**
2. **Pour chaque question** : cache la réponse, dis ta réponse à voix haute, compare
3. **Les questions où tu bloques** : relis le module lié et reformule jusqu'à ce que ça passe

### Auto-test (30 min)
Réponds à ces 10 questions sans regarder les docs :
- [ ] C'est quoi SOLID en 30 secondes ?
- [ ] Pourquoi Vite et pas Next.js ?
- [ ] Explique le RLS
- [ ] C'est quoi la pyramide de tests ?
- [ ] Comment tu gères la dette technique du vibecoding ?
- [ ] Le code est prod-ready ? (réponse honnête + plan)
- [ ] C'est quoi HDS et pourquoi c'est important ?
- [ ] Comment tu vois la collab avec le CTO ?
- [ ] Un JWT c'est quoi en 2 phrases ?
- [ ] Dessine la Clean Architecture de Monka

Si tu bloques sur plus de 2 → reviens sur les modules correspondants.

### Soir : Enrichissement final
- Envoie-moi les questions que tu as eues pendant les 3 jours → je complète les docs
- Dernière relecture du `12_VIBECODING_POSITIONING.md` → c'est ton mindset pour le meeting

### Durée estimée : 1h30 à 2h

---

## 💡 Pourquoi cette méthode marche

La **répétition espacée** est la technique de mémorisation la plus efficace (prouvé par la recherche en sciences cognitives). Le principe :

```
Passe 1 (vendredi) → Tu retiens ~30% mais tu as la vue d'ensemble
Passe 2 (samedi)   → Tu montes à ~60% et tu identifies tes faiblesses
Passe 3 (dimanche) → Tu atteins ~85%+ et tu sais DIRE les choses
```

L'ajout de la **reformulation** (notes dans tes mots) et de la **verbalisation** (répondre à voix haute) active deux canaux de mémoire supplémentaires au-delà de la lecture passive.

---

## ✅ Checklist finale dimanche soir

Avant de fermer les docs, vérifie que tu peux :

- [ ] Expliquer l'architecture Monka (Kernel / APP / Data) en 30 secondes
- [ ] Nommer 3 points forts du prototype ET 3 points manquants pour la prod
- [ ] Définir SOLID sans hésiter
- [ ] Expliquer pourquoi le RLS est supérieur au filtrage app
- [ ] Décrire le modèle de collaboration CTO + Vibecoder
- [ ] Utiliser les bons mots (cf. tableau vocabulaire du module 12)
- [ ] Rester calme si on te pose une question que tu ne connais pas → "Peux-tu préciser dans notre contexte ?"

**Si tu coches tout → tu es prêt. Let's go 🔥**
