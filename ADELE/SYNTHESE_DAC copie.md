# SYNTHÈSE — Rôle des DAC dans l'expérimentation ADELE
> Document de synthèse basé sur le Cahier des charges ADELE (VF 14/01/2026), le GT DAC, les schémas de travail et les retours COO Monka (mail 26/02/2026)

---

## 1. Qui sont les DAC impliqués ?

| DAC | Territoire | Contact référent |
|-----|-----------|-----------------|
| **DAC 49** | Angers (Maine-et-Loire) | Justine ROUXEL, directrice — j.rouxel@dac49.fr — 07 48 12 73 99 |
| **DAC 37** | Tours (Indre-et-Loire) | Marie-Sophie GAUDOUEN, directrice — ms.gaudouen@appuisante37.org — 02 47 77 50 29 |

---

## 2. Quel est le rôle structurant des DAC dans ADELE ?

Les DAC constituent la **structure pivot de la coordination territoriale**. Leur rôle est double :

1. **Héberger physiquement l'IDEC ADELE** — ancrage territorial fort, accès aux ressources locales
2. **Servir de filet de sécurité** pour les situations complexes (bascule droit commun en P3)

> ⚠️ L'IDEC ADELE hébergée au DAC **n'est pas un coordinateur DAC droit commun**. Les situations ADELE P1/P2 ne sont **pas comptabilisées** comme demandes DAC niveau 2. Seul le P3 crée une entrée en file active DAC.

---

## 3. L'IDEC ADELE : le cœur du dispositif ancré dans les DAC

### Rôle de l'IDEC ADELE

| Fonction | Description |
|----------|-------------|
| **Chef d'orchestre** | Interlocuteur unique des familles et professionnels — évite les ruptures |
| **Vision globale** | Combine analyse sanitaire (fragilité proche), médico-sociale (aides, financements), sociale (isolement, démarches) |
| **Analyse & planification** | Interprète les questionnaires Monka, active les recommandations du PPP via le tableau CAT |
| **Coordination opérationnelle** | Mobilise médecins, DAC, SSIAD, SAAD, plateformes de répit, CCAS |
| **Suivi dynamique** | Adapte en continu le PPP en fonction des alertes et recommandations médicales |
| **Prévention des ruptures** | Sécurise toutes les étapes critiques (sortie hospitalière, changements de parcours, transfert P3) |
| **Appui aux médecins** | Donne aux prescripteurs et MT une vision consolidée pour centrer la décision sur le médical |

### ETP et financement IDEC

| Structure | Profil | ETP | Durée |
|-----------|--------|-----|-------|
| **DAC** | IDEC ADELE | **1 ETP** | 21 mois |

**Financement DAC :** 83 465 € par DAC (total : 166 930 €)

---

## 4. Les 3 niveaux d'interaction IDEC ↔ DAC

### NIVEAU 1 — Appui informationnel
- Coordonnées SSIAD, plateforme de répit, service social
- **Pas d'intervention DAC**, IDEC agit seule
- Traçabilité : code **"Appui ADELE N1"** dans SI DAC (sans ouverture dossier)

### NIVEAU 2 — Appui opérationnel ciblé
- Recours exceptionnel à une AS DAC, coordinateur DAC, acteur saturé
- **Pas de bascule P3**, IDEC ADELE reste coordinatrice
- Traçabilité renforcée : code **"Appui ADELE N2"** avec motif + professionnel + durée

### NIVEAU 3 — Bascule P3 (Droit commun)
- Ouverture dossier DAC, entrée en file active, coordination DAC droit commun
- Cf. section 8 "Process détaillé de sortie d'XP"

| Niveau | Nature | Dossier DAC | Comptabilisé DAC | Coordination DAC |
|--------|--------|-------------|-----------------|-----------------|
| 1 | Appui informationnel | Non | Non | Non |
| 2 | Appui opérationnel ciblé | Non | Niveau 2 | Intervention ponctuelle |
| 3 | Bascule droit commun (P3) | **Oui** | Oui | **Oui — DAC prend le relais** |

---

## 5. Outils et moyens requis pour l'IDEC ADELE au DAC

| Outil | Usage | Question ouverte |
|-------|-------|-----------------|
| **Carte e-CPS** | Accès MSSanté, Omnidoc, authentification forte | Procédure et délai d'obtention ? |
| **Adresse MSSanté nominative** | Transmission MT/CHU/alertes/fin P3 | Qui ouvre le compte ? Signature institutionnelle ? |
| **Boîte mail dédiée ADELE** | Demandes N1, échanges internes DAC | Qui administre ? Archivage ? |
| **Accès SI métier DAC** | Lecture seule ? Items N1/N2 ? | Droits exacts à attribuer ? |
| **Base territoriale professionnels** | Annuaire, contacts, disponibilités | Existe-t-elle ? Quel outil ? |

---

## 6. BASELINE — Activité actuelle des IDEC DAC pour les aidants

> ⚠️ **Section à compléter après le GT DAC.** Les informations ci-dessous constituent le cadre de ce qu'il faut obtenir des DAC pour avoir une vision complète.

### 6.1 Ce qu'il faut cartographier chez les DAC

L'objectif est de comprendre **parfaitement** ce que les IDEC DAC font aujourd'hui en routine pour l'accompagnement des aidants, AVANT ADELE :

#### A. Process actuels de suivi des aidants

| Question à documenter | Enjeu |
|----------------------|-------|
| Quand et comment le DAC identifie-t-il un aidant ? | Comprendre le point d'entrée actuel |
| Quel est le parcours type d'un aidant déjà suivi par un DAC ? | Baseline de comparaison |
| Quels outils utilisent les IDEC DAC pour le suivi ? | SI, fichiers, grilles, CRM ? |
| Quels critères d'orientation vers les acteurs territoriaux ? | Arbre décisionnel existant ? |
| Quelle est la fréquence de contact avec les aidants ? | Mensuel, trimestriel, sur demande ? |
| Comment le DAC évalue-t-il la vulnérabilité de l'aidant ? | Score, grille, jugement clinique ? |
| Quels sont les motifs de clôture d'un dossier aidant au DAC ? | Comprendre le cycle de vie complet |

#### B. Cartographie des acteurs territoriaux mobilisés

| Catégorie | Acteurs à cartographier |
|-----------|------------------------|
| **Sanitaire** | MT, IDE libéraux, SSIAD, pharmaciens, kinés, services hospitaliers |
| **Médico-social** | SAAD, accueil de jour, hébergement temporaire, EHPAD |
| **Social** | CCAS, CLIC, services sociaux départementaux, MDA |
| **Répit** | Plateformes de répit, baluchonnage, séjours vacances |
| **Coordination** | CPTS, SPDA, MAIA (si encore actif), filières gériatriques |
| **Associatif** | France Alzheimer, France Aidants, associations locales |
| **Juridique** | Mesures de protection, mandats, tutelle/curatelle |

Pour chaque acteur :
- Comment est-il sollicité par le DAC (procédure formalisée, email, téléphone, outil ?) ?
- Quel est le délai moyen de mobilisation ?
- Y a-t-il des critères d'éligibilité spécifiques ?
- Le DAC a-t-il un retour structuré de l'acteur après intervention ?

#### C. Outils et SI utilisés en routine

| Ce qu'il faut inventorier | Pourquoi |
|--------------------------|----------|
| SI métier du DAC (nom, éditeur, fonctionnalités) | Savoir ce que l'IDEC ADELE aura en lecture/écriture |
| Annuaire territorial (existe-t-il ? format ?) | L'IDEC ADELE en aura besoin dès J1 |
| Grilles d'évaluation utilisées (GIR, ADL/IADL, autres) | Comparaison avec le scoring Monka |
| Templates de CR, de transmission, de saisine | Base pour les templates ADELE |
| Messagerie sécurisée en place (MSSanté, autre) | Canal de transmission vers MT et CHU |

---

## 7. GAP ANALYSIS — IDEC DAC classique vs IDEC ADELE

> Cette matrice identifie systématiquement les écarts entre la pratique actuelle des IDEC DAC et ce que l'IDEC ADELE devra faire. Les **colonnes "Baseline"** seront à compléter avec le DAC.

### 7.1 Matrice comparative

| Dimension | IDEC DAC classique (Baseline — à remplir) | IDEC ADELE (cible) | Écart identifié | Action requise |
|-----------|-------------------------------------------|-------------------|----------------|----------------|
| **Population cible** | Tout public, parcours complexes | Aidants uniquement (dyade aidant/aidé ≥65 ans) | Recentrage total sur l'aidant | ➜ Formation spécifique aidance |
| **Mode de repérage** | Signalement par professionnels, demande directe | Repérage systématique initié par le CHU | L'IDEC ne repère plus — elle reçoit | ➜ Process de réception structuré |
| **Outil d'évaluation** | Grilles variables (GIR, AGGIR...) | Score de vulnérabilité Monka (77Q, 6 blocs pondérés) | Nouvel outil, nouvelle méthodologie | ➜ Formation Monka (app + algorithme) |
| **Plan d'accompagnement** | Variable selon DAC, souvent informel | PPP structuré + tableau CAT | Standardisation forte | ➜ Formation CAT + PPP |
| **Suivi** | Fréquence variable, souvent réactif | Suivi mensuel (questionnaires + alertes automatiques) | Passage au proactif + numérique | ➜ Formation Life Line |
| **Coordination** | Téléphone, mail, réunions pluripro | Monka Life Line + MSSanté + Omnidoc | Outils nouveaux, flux différents | ➜ Formation outils numériques |
| **Transmission MT** | Variable, souvent informelle | CRs structurés via MSSanté systématique | Obligation de transmission tracée | ➜ Templates + process Monka |
| **Alertes** | Pas de système d'alerte automatisé | Alertes P1/P2/P3 avec délais de réponse | Gestion proactive des crises | ➜ Formation protocole alertes |
| **Durée de suivi** | Pas de limite formelle | 3 mois par parcours, 9 mois max | Durée fixe, transitions codifiées | ➜ Gestion temporelle stricte |
| **Sortie de suivi** | Clôture au cas par cas | Bascule P3 → DAC droit commun | Process de transition formalisé | ➜ Protocole de sortie d'XP |
| **Outil numérique aidant** | Aucun outil partagé avec l'aidant | MyMonka (app, questionnaires, messagerie) | Rapport direct avec l'aidant via app | ➜ Formation accompagnement digital |
| **Comptabilisation** | Dossier DAC standard | P1/P2 = NON comptabilisé DAC / P3 = OUI | Double comptabilité à gérer | ➜ Paramétrage SI DAC |

### 7.2 Besoins de formation et supports identifiés

| Besoin | Contenu | Format recommandé | Responsable |
|--------|---------|-------------------|-------------|
| **Formation métier aidance** | Repérage des fragilités, accompagnement des aidants, épuisement aidant | Module présentiel (1 jour) | Monka |
| **Formation outils Monka** | MyMonka (app aidant), Life Line (CRM IDEC), tableau de bord alertes | Module présentiel + tutoriel vidéo | Monka |
| **Formation PPP + CAT** | Interprétation des scores, activation des recommandations, conduite à tenir | Module présentiel + cas pratiques | Monka |
| **Formation protocole alertes** | Gestion P1 (24-72h), P2 (10-15j), P3 (>1 mois), escalade | Mise en situation | Monka |
| **Formation éthique et RGPD** | Consentement, données personnelles, coordination pluripro | Module e-learning | Monka |
| **Formation process de sortie d'XP** | Bascule P3 → DAC, transmission structurée, clôture ADELE | Cas pratiques + fiche process | Monka + DAC |
| **Supervision mensuelle** | Retours d'expérience, ajustements, difficultés terrain | Réunion collective mensuelle | Monka |

**Supports à fournir par Monka :**
- Checklist pour inclusion + explication pas à pas du process
- Guide utilisateur IDEC (Life Line + process ADELE)
- Templates de CR structurés (bilan mensuel, alerte, fin de parcours)
- Fiche réflexe CAT (format A4 plastifié pour bureau)
- Tutoriels vidéo (app, tableau de bord, alertes)
- Annuaire territorial préformaté (à remplir avec le DAC)

---

## 8. PROCESS DÉTAILLÉ — Sortie d'expérimentation (P3 → relais DAC)

### 8.1 Schéma step-by-step de la bascule P3

```
┌────────────────────────────────────────────────────────────────┐
│ FIN DE P2 — Score vulnérabilité élevé persistant               │
│ IDEC ADELE identifie le besoin de renouvellement               │
└────────────────────────┬───────────────────────────────────────┘
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ ÉTAPE 1 — Télé-expertise IDEC → Médecin prescripteur           │
│ ● Via Omnidoc                                                  │
│ ● Décision : passage en P3 ou sortie du protocole              │
│ ● Si P3 validé → poursuite 3 mois (non renouvelable)          │
└────────────────────────┬───────────────────────────────────────┘
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ ÉTAPE 2 — Parcours 3 (3 mois)                                  │
│ ● Prolongation du P2 dans les mêmes conditions                 │
│ ● Ajustement PPP par algorithme + IDEC + recommandations       │
│   médicales                                                    │
│ ● Coordination et suivi renforcés par l'IDEC                   │
│ ● Questionnaire mensuel de suivi + alertes                     │
└────────────────────────┬───────────────────────────────────────┘
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ ÉTAPE 3 — M-1 avant fin P3 : Préparation du relais             │
│ ● IDEC ADELE contacte le DAC pour préparer la bascule          │
│ ● Réunion de transmission IDEC ADELE → coordinateur DAC        │
│ ● Partage du dossier structuré : PPP, historique scores,       │
│   alertes passées, acteurs mobilisés, points de vigilance      │
│ ● Questions à trancher :                                       │
│   - Le DAC désigne-t-il un coordinateur de relais ?            │
│   - Y a-t-il un RDV tripartite (IDEC + DAC + aidant) ?        │
│   - Quel format de dossier de transmission ?                   │
└────────────────────────┬───────────────────────────────────────┘
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ ÉTAPE 4 — Télé-expertise de fin P3                              │
│ ● IDEC → Médecin prescripteur (via Omnidoc)                    │
│ ● Bilan final : état de la dyade, évolution, risques résiduels │
│ ● Décision : relais DAC confirmé                               │
│ ● Transmission du bilan via MSSanté au MT identifié            │
└────────────────────────┬───────────────────────────────────────┘
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ ÉTAPE 5 — Bascule effective → DAC droit commun                  │
│ ● Ouverture officielle du dossier DAC                          │
│ ● Entrée en file active DAC                                    │
│ ● DAC devient l'opérateur pivot                                │
│ ● Relais possibles selon profil :                              │
│   - DAC → coordination interprofessionnelle                    │
│   - SSIAD → soins infirmiers                                   │
│   - SAAD → aides quotidiennes                                  │
│   - CPTS → coordination ville-hôpital                          │
│   - CLIC → information et orientation                          │
└────────────────────────┬───────────────────────────────────────┘
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ ÉTAPE 6 — Clôture ADELE                                         │
│ ● Fermeture du dossier ADELE dans Life Line                    │
│ ● L'aidant conserve l'accès gratuit à MyMonka                  │
│ ● Données finales transmises au CELEVAL (Article 51)           │
│ ● Dernière alerte au MT : "sortie d'expérimentation ADELE"    │
└────────────────────────────────────────────────────────────────┘
```

### 8.2 Contenu du dossier de transmission ADELE → DAC

| Élément | Description | Format |
|---------|-------------|--------|
| **PPP final** | Plan de prévention personnalisé à jour avec recommandations actives | PDF généré par Monka |
| **Historique scores** | Évolution du score de vulnérabilité sur 3-9 mois | Graphique + données brutes |
| **Alertes historisées** | Liste de toutes les alertes (P1/P2/P3), résolutions et statuts | Tableau avec dates |
| **Acteurs mobilisés** | Tous les acteurs contactés pendant le parcours ADELE | Liste avec coordonnées |
| **Points de vigilance** | Signaux faibles identifiés, risques résiduels | Texte libre IDEC |
| **Synthèse IDEC** | Note narrative de l'IDEC ADELE sur la dyade | 1 page max |
| **Recommandations de suivi** | Ce que le DAC doit surveiller en priorité | Liste priorisée |

---

## 9. EDGE CASES — Situations complexes à résoudre avec les DAC

### CAS 1 — Aidant DÉJÀ SUIVI par le DAC avant l'inclusion ADELE

```
Situation : L'aidant entre dans ADELE, mais il a déjà un dossier ouvert au DAC.

┌─ Option A : Suspension du suivi DAC pendant ADELE
│  ● Le DAC gèle le dossier
│  ● L'IDEC ADELE reprend l'ensemble de la coordination
│  ● En fin de P3 : réouverture du dossier DAC avec mise à jour
│  ● Risque : perte de continuité si l'IDEC ADELE ne connaît pas l'historique
│
├─ Option B : Co-suivi IDEC ADELE + coordinateur DAC
│  ● Le coordinateur DAC initial reste référent pour le médico-social existant
│  ● L'IDEC ADELE pilote uniquement le volet aidance ADELE
│  ● Risque : double coordination = confusion, doublons, charge
│
└─ Option C (recommandée) : Responsabilité unique IDEC ADELE
   ● Le coordinateur DAC initial fait un briefing complet à l'IDEC ADELE
   ● Dossier DAC suspendu (pas clôturé)
   ● L'IDEC ADELE intègre l'historique DAC dans le PPP ADELE
   ● En fin de P3 : rétrocession au coordinateur DAC initial avec MAJ
   
   ➜ Questions à trancher :
   - Temps de briefing formalisé (30 min, 1h ?) ?
   - Le coordinateur DAC initial reste-t-il joignable en backup ?
   - Y a-t-il un document type de "gel de dossier DAC" ?
```

### CAS 2 — Sortie hospitalière = entrée ADELE + signalement DAC simultanés

```
Situation : Le patient sort de l'hôpital, l'aidant entre dans ADELE P2, 
et en même temps le service social signale la situation au DAC.

┌─ Risque : Double ouverture de dossier (ADELE + DAC) 
│            avec deux coordinateurs qui ne se connaissent pas

└─ Process recommandé :
   1. L'IDE hospitalière vérifie si un signalement DAC est en cours
   2. Si oui : l'IDEC ADELE est informée ET le DAC est informé que 
      la dyade entre dans ADELE
   3. Le DAC NE CRÉE PAS de dossier droit commun
   4. L'IDEC ADELE intègre les infos du signalement hospitalier
   5. Le DAC enregistre un "Appui ADELE N1" sans dossier
   
   ➜ Questions à trancher :
   - Qui informe le DAC qu'un signalement CHU est déjà couvert par ADELE ?
   - L'IDEC ADELE ? L'IDE hospitalière ? Monka automatiquement ?
   - Y a-t-il un canal de communication directe CHU → DAC pour ces cas ?
```

### CAS 3 — Fin P3 → relais DAC, mais le DAC est saturé

```
Situation : L'IDEC ADELE prépare la bascule P3 → DAC, mais le DAC n'a 
pas de capacité pour reprendre la dyade immédiatement.

┌─ Risque : L'aidant se retrouve dans un "no man's land" — plus suivi ADELE, 
│           pas encore pris en charge DAC

└─ Process recommandé :
   1. M-1 avant fin P3 : confirmation de capacité DAC (oui/non/délai)
   2. Si le DAC n'a pas de capacité :
      a) Identifier un relais alternatif (CPTS, SSIAD, MT)
      b) Prolonger le suivi IDEC ADELE de 2 semaines max (à valider Art. 51)
      c) Escalade au COPIL territorial si blocage persistant
   3. Le DAC s'engage sur un délai maximal de reprise 
      (proposition : 15 jours ouvrés)
   
   ➜ Questions à trancher :
   - Quel est le délai maximal acceptable de reprise par le DAC ?
   - Le cadre Art. 51 permet-il un dépassement de P3 pour transition ?
   - Qui décide si un relais alternatif est suffisant (IDEC, médecin, COPIL) ?
```

### CAS 4 — Aidant en ADELE mais le proche décède ou est institutionnalisé

```
Situation : En cours de parcours ADELE, le proche aidé décède ou entre en EHPAD.
L'aidance s'arrête brutalement.

└─ Process recommandé :
   1. L'IDEC ADELE est informée (alerte via app ou appel aidant)
   2. Entretien de clôture avec l'aidant (soutien, orientation si besoin)
   3. Sortie anticipée d'ADELE avec rapport final
   4. Si besoin de soutien psychologique → orientation directe 
      (plateforme de répit, psychologue, associations)
   5. Pas de bascule DAC sauf situation sociale complexe persistante
   
   ➜ Questions à trancher :
   - L'aidant conserve-t-il l'accès MyMonka après le décès du proche ?
   - Y a-t-il un "parcours de deuil" ou c'est une clôture sèche ?
   - Le DAC doit-il être informé de ces sorties anticipées ?
```

### CAS 5 — L'aidant refuse la bascule DAC en fin P3

```
Situation : L'IDEC ADELE prépare le relais DAC, mais l'aidant dit 
"je ne veux pas être suivi par le DAC, je suis bien avec Monka".

└─ Process recommandé :
   1. L'IDEC ADELE explique que l'XP ADELE est limitée à 9 mois
   2. Présentation du DAC et de ce qu'il peut apporter
   3. Si refus maintenu :
      a) Clôture ADELE avec rapport final
      b) L'aidant garde MyMonka gratuitement
      c) Information du MT pour suivi en ville classique
      d) Le DAC est informé (signal faible pour repérage futur)
   4. L'aidant reste libre de contacter le DAC ultérieurement

   ➜ Questions à trancher :
   - Le DAC doit-il créer un dossier "veille" même sans accord aidant ?
   - Le MT est-il responsable du suivi post-ADELE si pas de DAC ?
```

---

## 10. Outils et process : le tableau de Conduite à Tenir (CAT)

Le **CAT** traduit chaque recommandation du PPP en actions concrètes pour l'IDEC :
- Réponse attendue par situation (épuisement, aggravation clinique, isolement, complexité administrative)
- Relais à activer (médecins, DAC, SSIAD, plateformes de répit)
- Homogénéise les pratiques entre Angers et Tours
- Standardise, trace, sécurise le modèle ADELE

---

## 11. Gestion des alertes — rôle de l'IDEC ADELE

| Priorité | Déclencheur | Délai d'action | Actions possibles |
|----------|-------------|----------------|-------------------|
| **P1** | Score > 18,18, dégradation majeure bloc critique | **24-72h** | Appel, réévaluation, rapport MSSanté |
| **P2** | Dégradation modérée | **10-15 jours** | Suivi renforcé, coordination DAC si besoin |
| **P3** | Aggravation stable/légère | **> 1 mois** | Action planifiée |

**Toutes les alertes** : historisées, annotées, clôturées, archivées dans Life Line.

---

## 12. Socle Commun Minimal — responsabilités DAC/IDEC

| # | Élément | Objectif | Responsable | Traçabilité |
|---|---------|----------|-------------|-------------|
| 4 | Transmission systématique MT | Continuité médicale | **IDEC ADELE** | MSSanté tracée |
| 5 | Désignation acteur pivot post-sortie | Responsabilité claire | **IDEC ADELE portée par DAC** | Inscription dans protocole |
| 6 | Modalité standard DAC (critères explicites) | Éviter déclenchement aléatoire | **IDEC ADELE** | Fiche standardisée |
| 7 | Télé-expertise décisionnelle | Sécuriser transitions P1/P2/P3 | **IDEC → Médecin prescripteur** | Omnidoc tracé |

---

## 13. Livrables attendus à l'issue du GT DAC

1. Schéma clair des interactions IDEC ↔ DAC
2. Règle formalisée de non-comptabilisation P1/P2
3. Outil de traçabilité N1/N2 validé
4. Process écrit de bascule P3 (cf. section 8)
5. Liste des accès SI à ouvrir pour l'IDEC ADELE
6. Mini cahier des charges IDEC ADELE
7. **Cartographie complète de l'activité DAC existante pour les aidants** *(nouveau — demande COO)*
8. **Gap analysis IDEC DAC → IDEC ADELE avec plan de formation** *(nouveau — demande COO)*
