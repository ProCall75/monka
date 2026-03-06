# Pré-requis Standards pour les Prestataires Externes — MyMonka

> **De** : Antonin Rimaud (PRAGMA — CTO externalisé moteur clinique)
> **Pour** : CEO Monka
> **Date** : 4 mars 2026
> **Objet** : Standards et livrables que les prestataires externes doivent respecter pour l'app MyMonka, dès le jour 1

---

## Pourquoi ce document ?

Monka fait appel à des **prestataires externes** pour reconstruire l'app MyMonka from scratch. Cette app aura des **vrais patients**, des **données de santé**, et sera le **dispositif médical numérique** qui porte le marquage CE.

### Le problème qu'on veut éviter

```
                    SCÉNARIO A (sans standards)          SCÉNARIO B (avec standards)
                    ─────────────────────────            ──────────────────────────
Reconstruction     Prestataire livre "une app"          Prestataire livre une app
                   Code qui marche ✅                    + documentation normative ✅
                   Pas de doc ❌                         + tests tracés ✅
                   Pas de traçabilité ❌                 + analyse de risques ✅
                   Architecture libre ❌                 + SBOM ✅
                                                         + architecture documentée ✅

6 mois plus tard   "On veut le marquage CE"             "On veut le marquage CE"
                   Tout est à refaire 💀               Documentation déjà prête ✅
                   Budget : ×3 à ×5                     Budget : intégré dès le départ
                   Délai : +6 à +12 mois                Délai : quelques semaines
```

**C'est exactement ce qui s'est passé avec la version précédente.** On ne refait pas cette erreur.

### Mon raisonnement

1. MyMonka est un **SaMD Classe IIa** (logiciel qui fournit des infos pour des décisions thérapeutiques)
2. Le marquage CE Classe IIa nécessite un **Organisme Notifié** qui auditera tout
3. L'auditeur demandera des **livrables précis** définis par IEC 62304, ISO 14971, ISO 13485
4. Si les prestataires ne produisent pas ces livrables pendant le dev, il faudra les recréer après — et ça coûte cher
5. **Donc** : on donne aux prestataires la liste des livrables dès le départ. Ça ne rajoute pas de travail — ça structure le travail qu'ils font de toute façon.

---

## 1. Classification de MyMonka

| Standard | Classification | Justification |
|---|---|---|
| **MDR (EU 2017/745)** — Règle 11 | **Classe IIa** | L'app fournit des informations pour des décisions de parcours de soins. L'IDEC est dans la boucle (pas Classe III). |
| **IEC 62304** — Sécurité logicielle | **Classe B** | Défaillance = parcours inadapté. Pas de danger immédiat de mort. |

### Ce que ça implique pour les prestataires

- **Un Organisme Notifié** évaluera le dossier technique → tout doit être auditable
- **ISO 13485** (système qualité) doit être en place ou démontrable
- Les prestataires doivent produire des **livrables normés**, pas juste "du code qui marche"

---

## 2. Les 8 normes que les prestataires doivent connaître

| # | Norme | Ce qu'elle couvre | Obligation |
|---|---|---|---|
| 1 | **IEC 62304** | Cycle de vie du logiciel médical | 🔴 Obligatoire (cœur de la conformité) |
| 2 | **ISO 14971** | Gestion des risques | 🔴 Obligatoire |
| 3 | **ISO 13485** | Système de management qualité | 🔴 Obligatoire pour Classe IIa |
| 4 | **IEC 62366** | Ingénierie de l'utilisabilité (UX sécurisée) | 🟠 Fortement recommandé |
| 5 | **RGPD** | Protection des données personnelles | 🔴 Obligatoire |
| 6 | **HDS** | Hébergement données de santé (France) | 🔴 Obligatoire si données patient identifiables |
| 7 | **Cybersécurité MDR** | Security by design, SBOM, tests de pénétration | 🔴 Obligatoire MDR Annex I |
| 8 | **AI Act (EU 2024/1689)** | Régulation IA européenne | 🟡 À évaluer si composants IA |

---

## 3. Les 15 livrables minimum à exiger des prestataires

### Ce que le prestataire doit fournir — Checklist

Chaque livrable est lié à une norme. L'auditeur les demandera. S'ils n'existent pas, le marquage CE est bloqué.

#### A. Documentation de développement (IEC 62304)

| # | Livrable | Description | Quand |
|---|---|---|---|
| **L1** | **Plan de développement logiciel** | Modèle de cycle de vie, activités, rôles, responsabilités, planning | Début de projet |
| **L2** | **Spécifications d'exigences (SRS)** | Toutes les exigences fonctionnelles, de performance, de sécurité, d'interface | Avant le code |
| **L3** | **Architecture logicielle** | Modules, composants, interfaces, flux de données, diagrammes | Avant le code |
| **L4** | **Design détaillé** | Design de chaque composant / module | Pendant le dev |
| **L5** | **Plan de V&V** (Vérification & Validation) | Comment tester : tests unitaires, intégration, système. Critères pass/fail. | Début de projet |
| **L6** | **Résultats de tests** | Rapports de tests unitaires, intégration, système. Taux de couverture. | Continu |
| **L7** | **Matrice de traçabilité** | Exigence → design → code → test → risque. Chaîne complète. | Continu |
| **L8** | **Liste SOUP** (composants tiers) | Tous les packages/librairies : nom, version, licence, fonction, risques | Continu |

#### B. Gestion des risques (ISO 14971)

| # | Livrable | Description | Quand |
|---|---|---|---|
| **L9** | **Analyse de risques logicielle** | Que se passe-t-il si le logiciel échoue ? Pour chaque fonction : risque, gravité, probabilité, mitigation | Avant le code |
| **L10** | **Registre des risques** | Tous les risques identifiés, leur statut, les mesures de contrôle | Continu |

#### C. Qualité et maintenance (ISO 13485)

| # | Livrable | Description | Quand |
|---|---|---|---|
| **L11** | **Gestion de configuration** | Versioning, branches, contrôle des changements, historique Git propre | Continu |
| **L12** | **Résolution de problèmes** | Procédure de bug tracking, investigation, résolution, preuve | Continu |
| **L13** | **Plan de maintenance** | Comment les mises à jour sont gérées, testées, déployées | Avant le lancement |

#### D. Sécurité et données (MDR + RGPD + HDS)

| # | Livrable | Description | Quand |
|---|---|---|---|
| **L14** | **SBOM** (Software Bill of Materials) | Inventaire machine-readable de tous les composants logiciels et dépendances | Continu |
| **L15** | **Rapport de cybersécurité** | Tests de pénétration, analyse de vulnérabilités, encryption, authentification | Avant mise en production |

#### E. Utilisabilité (IEC 62366)

| # | Livrable | Description | Quand |
|---|---|---|---|
| **L16** | **Dossier d'utilisabilité** | Spécifications utilisateur, risques liés à l'usage, tests d'utilisabilité | Pendant le dev |

---

## 4. Ce qu'il faut mettre dans le contrat avec les prestataires

### Clauses essentielles

> Ces clauses ne sont pas optionnelles. Sans elles, Monka sera responsable de recréer toute la documentation après coup.

#### 4.1. Clause de conformité normative

> *"Le prestataire s'engage à développer le logiciel en conformité avec les exigences de la norme IEC 62304 (software safety class B) et à intégrer les principes de gestion des risques selon ISO 14971. Le prestataire reconnaît que le logiciel développé est un composant d'un dispositif médical numérique de classe IIa au sens du Règlement (UE) 2017/745."*

#### 4.2. Clause de livrables documentaires

> *"En plus du code source, le prestataire fournira les livrables documentaires listés en Annexe [X] du présent contrat (cf. les 16 livrables ci-dessus). Ces livrables font partie intégrante de la prestation et conditionnent la recette."*

**Pourquoi c'est important** : si les livrables ne sont pas contractuels, le prestataire ne les produira pas. Et vous les paierez 3× plus cher après.

#### 4.3. Clause de propriété et audit

> *"Monka reste propriétaire de l'ensemble du code source, de la documentation technique et des livrables documentaires. Monka se réserve le droit de faire auditer le code et la documentation par un tiers à tout moment."*

#### 4.4. Clause d'hébergement HDS

> *"Le prestataire s'engage à héberger les données de santé personnelles exclusivement auprès d'un hébergeur certifié HDS (Hébergement de Données de Santé) conformément à l'article L.1111-8 du Code de la santé publique."*

#### 4.5. Clause SBOM et cybersécurité

> *"Le prestataire maintiendra un SBOM (Software Bill of Materials) à jour et réalisera ou fera réaliser un test de pénétration avant chaque mise en production. Le prestataire signalera immédiatement toute vulnérabilité identifiée dans les composants tiers."*

---

## 5. Comment Monka supervise — sans être expert technique

### Le principe : 4 checkpoints

Le prestataire fait le travail. Monka (ou PRAGMA en appui) vérifie à 4 moments clés que les livrables sont produits :

| Checkpoint | Quand | Ce qu'on vérifie | Bloquant ? |
|---|---|---|---|
| **CP1 — Architecture** | Avant le code | L1 + L2 + L3 + L9 existent | ✅ Oui — pas de code sans architecture validée |
| **CP2 — Mi-parcours** | 50% du dev | L4 + L5 + L7 + L8 + L11 en cours | ✅ Oui — on ne continue pas sans traçabilité |
| **CP3 — Pré-recette** | Avant la livraison | L6 + L10 + L12 + L14 + L15 complets | ✅ Oui — pas de recette sans tests et sécurité |
| **CP4 — Recette** | Livraison finale | Tous les 16 livrables complets + fonctionnel | ✅ Oui — pas de paiement final sans dossier complet |

### Le piège classique à éviter

```
❌ "Le prestataire livre le code, on fera la doc après"
   → La doc ne sera jamais faite. Et quand l'auditeur viendra, c'est la panique.

✅ "Le prestataire livre le code ET la doc À CHAQUE CHECKPOINT"
   → Le dossier technique se construit automatiquement pendant le dev.
```

---

## 6. Hébergement — Le point HDS

### C'est quoi ?

En France, **tout hébergeur de données de santé personnelles doit être certifié HDS** (Hébergement de Données de Santé). Ce n'est pas optionnel — c'est la loi (article L.1111-8 du Code de la santé publique).

### Ça concerne MyMonka ?

**Oui, dès qu'il y a des données patient identifiables** sur l'app (réponses au questionnaire, scores, parcours de soins, CR médecin).

### Ce qu'il faut exiger

| Exigence | Détail |
|---|---|
| Hébergeur certifié HDS | AWS (certifié HDS), OVHcloud (certifié), Scaleway (certifié) |
| Pas d'hébergement hors UE | RGPD + HDS = données en Europe |
| Contrat spécifique | Contrat d'hébergement HDS signé avec le cloud provider |
| Chiffrement | Au repos (AES-256) + en transit (TLS 1.3) |

> **Si le prestataire propose Vercel, Firebase, ou un cloud non certifié HDS pour les données patient → c'est non.**

---

## 7. Le moteur clinique — L'interface avec les prestataires

### Ce que les prestataires reçoivent de nous

Le moteur clinique (scoring, activation, MPs, MTs) est développé et maintenu par PRAGMA. Les prestataires l'**intègrent** dans MyMonka.

| Ce qu'on fournit | Format | Standard |
|---|---|---|
| Code du moteur (engine/) | TypeScript — fichiers sources | IEC 62304 Class B documenté |
| Data clinique | Supabase (18 tables) | Auditée, tracée, versionnée |
| API du moteur | Fonctions TypeScript importable | Types stricts, tests existants |
| Documentation du moteur | `docs/` + `moteur/` | Conforme IEC 62304 |

### Ce que les prestataires doivent fournir en retour

| Livrable | Description |
|---|---|
| Documentation d'intégration | Comment le moteur est intégré dans l'app |
| Tests d'intégration | Le moteur produit les bons résultats dans le contexte de l'app |
| Architecture globale | Comment moteur + app + DB + auth s'articulent |

---

## 8. Résumé pour le CEO

| Question | Réponse |
|---|---|
| **C'est obligatoire ?** | Oui. Classe IIa = Organisme Notifié = dossier technique audité. |
| **Ça coûte plus cher ?** | Non. Ça **structure** le travail du prestataire. Le surcoût est <10%. |
| **Et si on ne le fait pas ?** | On refait tout au moment du marquage CE. Coût ×3 à ×5. Délai +6-12 mois. |
| **Les prestataires vont accepter ?** | Les bons oui. Ceux qui refusent ne sont pas faits pour le médical. |
| **Qui vérifie ?** | 4 checkpoints. Monka peut demander à PRAGMA de valider les livrables. |
| **HDS ?** | Obligatoire dès qu'il y a des données patient. Hébergeur certifié uniquement. |
| **Quand en parler aux prestataires ?** | **Maintenant.** Avant le premier commit. Pas "plus tard". |

### L'argument en une phrase

> **"Demander aux prestataires de suivre IEC 62304 coûte 10% de plus maintenant. Ne pas le demander coûte 300% de plus dans 12 mois quand l'auditeur viendra."**

---

## 9. Prochaines étapes

| # | Action | Qui | Quand |
|---|---|---|---|
| 1 | Valider ce document avec le CEO | Antonin | Cette semaine |
| 2 | Intégrer les 16 livrables dans le cahier des charges prestataire | CEO + juridique | Avant signature contrat |
| 3 | Ajouter les clauses (§4) dans le contrat prestataire | Juridique | Avant signature contrat |
| 4 | Définir les 4 checkpoints dans le planning projet | CEO + prestataire | Kick-off projet |
| 5 | Identifier un hébergeur certifié HDS | CTO Monka | Avant architecture |
| 6 | S'assurer que le moteur est documenté pour l'intégration | PRAGMA (Antonin) | En parallèle |

---

*PRAGMA — Antonin Rimaud — Mars 2026*
*Document informatif — à adapter par l'équipe juridique de Monka pour les clauses contractuelles*
