# ANALYSE CRITIQUE — Process CHU ADELE : Angles Morts, Frictions et Questions pour la Phase 2
> Basé sur le process validé (Cahier des charges VF + GT DAC + schémas de travail)
> Objectif : identifier ce qui peut bloquer, ralentir ou fragiliser le process côté CHU — et les questions à poser pour y remédier

---

## 🔴 ANGLES MORTS — Ce qui manque structurellement dans le process validé

### 1. Le repérage de l'aidant : un moment flou sans gardien clairement désigné

**Le problème :**
Le process dit que médecin, IDE et AS peuvent repérer — mais **aucun des trois n'a la responsabilité exclusive**. Dans les systèmes de santé, quand tout le monde est responsable, personne ne l'est vraiment.

- L'IDE fait passer le questionnaire mais **c'est le médecin qui valide l'inclusion**
- L'AS est impliquée dans E3 mais son entretien est **"non systématisé"** et **"sans médecin"**
- Le repérage aidant dans le DPI est aujourd'hui en texte libre, pas structuré

**Ce qui risque de se passer en vrai :**
> "C'est l'AS qui le fait normalement" / "Non c'est l'IDE" / passage à travers les mailles

**Questions à poser au CHU :**
- Qui est le **référent hospitalier désigné** par service pour ADELE (IDE ? cadre inf ?) ?
- Est-ce que ce référent est **libéré d'un temps dédié**, même minimal (10min/patient) ?
- Quel service prend le premier contact — le médecin initialise, l'IDE exécute, ou l'AS coordonne ?
- Que se passe-t-il si le médecin "oublie" de signaler ? Y a-t-il une boucle de contrôle ?

---

### 2. La fenêtre temporelle de repérage est trop courte et mal positionnée

**Le problème :**
La timeline dit J0 → J+5. Mais :
- L'inclusion doit se faire **48h avant la sortie**
- Les durées de séjour moyennes en gériatrie aiguë : 7-10 jours, parfois moins en MCO
- En pratique : J0 = admission, J+1/2 = diagnostic, J+3/4 = entretien famille... et parfois la sortie arrive **avant J+5**

**Le risque réel :**
> L'aidant est repéré mais la sortie arrive trop vite pour formaliser l'inclusion. Il part sans avoir signé, sans avoir installé l'app, sans code Monka activé.

**Questions à poser au CHU :**
- Quelle est la **durée moyenne de séjour** dans chaque service concerné (gériatrie aiguë, SMR, PAVIE) ?
- Y a-t-il une procédure de **repérage à l'admission** (J0) plutôt qu'en cours de séjour ?
- Que se passe-t-il si le patient sort en urgence (le week-end, le soir) ? Qui prend le relais ?

---

### 3. L'entretien AS (E3) : le maillon le plus vulnérable du process

**Le problème :**
E3 est décrit comme "non systématisé" et "sans médecin". C'est précisément là où l'aidant est le mieux évalué (situation sociale, besoins post-hospit, capacités) — mais :
- À Angers, **l'AS intervient selon besoin**
- À Tours, **l'AS intervient selon besoin**
- Pas de déclencheur formel, pas de grille standardisée pour l'aidant
- L'entretien est une réunion à part, informelle

**Ce qui risque de se passer :**
> Situations où l'AS n'est pas sollicitée car "ça ne semble pas nécessaire" — et l'aidant vulnérable passe en P1 au lieu de P2 faute d'une évaluation sociale complète.

**Questions à poser :**
- L'AS fait-elle partie **systématiquement** du circuit de repérage ADELE ou seulement sur signalement ?
- Peut-on créer un **format minimal standardisé E3-ADELE** (5 questions max sur l'aidant) à intégrer dans l'entretien existant ?
- Qui documente l'entretien E3 actuellement ? Dans quel outil ? Avec quel niveau de détail sur l'aidant ?

---

### 4. Le DPI : une intégration partielle qui crée de la friction invisible

**Le problème :**
L'outil de repérage aidant dans le DPI (Crossway → Sillage / Millenium Cerner) nécessite de nouvelles cases à créer :
- `Statut aidant` / `Lien` / `Coordonnées` / `Date de recueil` / `Professionnel ayant renseigné`

Mais **aucun lien direct API n'existe entre le DPI et Monka**. Tout passe par MSSanté ou par l'IDE qui ressaisit manuellement.

**Points de friction concrets :**
- Double saisie : le professionnel rentre les infos dans le DPI ET les transmet à l'IDEC
- Risque d'erreur ou d'oubli entre les deux
- À Angers, **Sillage n'arrive qu'en T1 2027** : Crossway est en fin de vie mais c'est le DPI utilisé pendant toute la phase d'inclusion (M3 → M20)
- À Tours, Millenium Cerner : quelles capacités de paramétrage ?

**Questions à poser au CHU :**
- Peut-on **paramétrer dès maintenant une case "aidant ADELE"** dans Crossway (Angers) et Millenium Cerner (Tours) ?
- Qui a les droits de paramétrage du DPI dans chaque CHU ? Un DSI doit-il valider ?
- La saisie dans le DPI peut-elle **notifier automatiquement l'IDEC** (alerte, mail, ou liste) — ou c'est toujours manuel ?
- Avec Sillage en 2027 : est-ce prévu de mieux mapper l'aidant dans le nouveau DPI ?

---

### 5. L'information de l'aidant : un moment unique, avec beaucoup d'informations, en contexte de stress

**Le problème :**
L'aidant reçoit en une seule fois :
- La présentation du dispositif ADELE
- Le formulaire de consentement
- Le kit de bienvenue + QR code + guide utilisateur
- L'instruction de télécharger l'app et de remplir 77 questions en 6 blocs

Et tout ça **en contexte de sortie hospitalière**, moment de charge émotionnelle maximal.

**Ce qui risque de se passer :**
> L'aidant dit oui pour faire plaisir à l'IDE, rentre chez lui, ne télécharge jamais l'app → relances Monka → pas de réponse → perdu de vue.
> Le taux de perdus de vue est estimé à **29%** — ce chiffre est probablement sous-estimé compte tenu de la charge cognitive du moment.

**Questions à poser au CHU :**
- Peut-on **scinder la présentation ADELE** en deux temps : J-2 (présentation, consentement) et J0/J+1 (installation app, aide au questionnaire) ?
- L'IDE a-t-elle le temps d'**accompagner l'installation de l'app** en présentiel (15min) ?
- Le kit de bienvenue est-il **testé côté aidant** pour sa lisibilité ? Y a-t-il une version simplifiée ?

---

### 6. Le rôle du médecin prescripteur : impliqué au début et à la fin, absent au milieu

**Le problème :**
Le médecin hospitalier :
- Valide l'inclusion → **présent**
- Peut assurer des télé-expertises → **présent à P1/P2/P3**
- Mais **entre ces deux moments** : aucune information obligatoire ne lui remonte sauf en cas d'alerte P1

Et pourtant, c'est lui qui décide du passage P1→P2, P2→P3 ou de la sortie.

**Ce qui risque de se passer :**
> Le médecin prescripteur valide l'inclusion, puis "oublie" le patient. Quand l'IDEC sollicite une télé-expertise 3 mois plus tard, le médecin ne se souvient plus du dossier.

**Questions à poser au CHU :**
- Le médecin prescripteur reçoit-il un **résumé mensuel automatique** de l'état du patient via Omnidoc ou MSSanté ?
- Y a-t-il un **médecin référent ADELE** désigné par service, ou c'est le prescripteur du séjour initial ?
- Que se passe-t-il si le médecin qui a inclus **n'est plus disponible** au moment de la télé-expertise (mutation, arrêt, garde) ?
- Y a-t-il un **suppléant désigné** pour les décisions cliniques stratégiques ?

---

## 🟡 FRICTIONS OPÉRATIONNELLES — Ce qui va ralentir sans forcément bloquer

### 7. La charge IDE : un rôle central avec un ETP très faible

**Le constat :**
L'IDE hospitalière fait tout : repérage, vérification éligibilité, présentation ADELE, consentement, aide au questionnaire, remise kit, transmission à l'IDEC. Le tout pour **0,5 ETP sur 26 mois**, soit à peine 2,5 jours/semaine.

Avec une cible de 804 inclusions sur 16 mois (M3→M20) → ~50 inclusions/mois → ~12 par semaine → **2-3 inclusions par jour ouvré**.

Chaque inclusion prend aujourd'hui facilement **45 min à 1h** si on inclut le temps de présentation, consentement, aide app.

**Question à poser :**
- Avec le volume visé, comment le CHU organise-t-il concrètement la charge ? Y a-t-il un **planning dédié ADELE** par semaine ?
- Peut-on **industrialiser certaines étapes** (QR code + vidéo de présentation autonome) pour libérer du temps IDE ?

---

### 8. La variabilité des pratiques entre services au sein du même CHU

**Le constat :**
Les services concernés sont : gériatrie aiguë, SMR, consultations, PAVIE. Chaque service a ses propres habitudes, ses propres flux, ses propres pressions.

- En gériatrie aiguë : forte pression de sortie, nombreux patients complexes
- En SMR : durées de séjour plus longues, plus de temps, mais profil différent
- En consultations : aidant parfois seul, sans patient hospitalisé

**Questions à poser :**
- Y a-t-il un **référent ADELE par service** ou un référent unique pour tous ?
- Comment s'assurer que le process est le même en gériatrie aiguë et en SMR alors que les contraintes de temps sont totalement différentes ?


---

### 9. Angers vs Tours : des différences qui vont créer de la disparité dans les résultats

**Asymétries identifiées :**

| Point | Angers | Tours |
|-------|--------|-------|
| DPI | Crossway (actuel) + Sillage (2027) | Millenium Cerner |
| Coordination médicamenteuse | Hospiville intégrée | Non formalisée |
| IDE dédiée ADELE | Ciblée dans le service | Via ARC (hors service) |
| Temps sortie | Plus structuré | Variable |
| Transmission DAC | FAMO scanné partiellement | FAMO papier |
| Élément social dans CRH | Non systématique | Plus intégré |

**Ce que ça implique :**
- Les données d'évaluation ne seront **pas comparables** si les entretiens ne sont pas standardisés
- Tours aura probablement **plus de dispersions** (ARC hors service = relais plus complexe)
- La FAMO papier à Tours crée un **délai de transmission DAC**

**Questions à poser au CHU de Tours spécifiquement :**
- Comment l'ARC sera-t-il briefé et intégré dans le circuit inclusion ADELE ?
- Qui formalise le passage de relais ARC → IDEC ADELE ?

---

### 10. La télé-expertise via Omnidoc : un outil présent mais sous-utilisé

**Le constat :**
Omnidoc est disponible dans les deux CHU pour les télé-expertises ADELE (décisions P1/P2/P3). Mais :
- Aujourd'hui utilisé **"hors process" (post-hospitalisation)"** → pas encore intégré dans les réflexes CHU
- L'IDEC ADELE doit **initier la demande** de télé-expertise → le médecin doit répondre dans un délai acceptable

**Questions à poser :**
- Y a-t-il un **délai de réponse garanti** côté médecin prescripteur sur Omnidoc (ex : 48h) ?
- Qui gère la file Omnidoc du côté CHU côté administratif ?
- Comment éviter que les demandes de l'IDEC se perdent dans la boîte Omnidoc du médecin déjà saturé par les demandes classiques ?

---

## 🟢 LEVIERS D'AMÉLIORATION — Ce que Monka peut proposer proactivement

### A. Créer un "tableau de bord CHU simplifié"

Un outil légèrement distinct de Life Line pour que le référent hospitalier voit :
- Les aidants repérés dans son service en attente d'inclusion
- Le statut de chaque aidant (app installée ? questionnaire fait ? IDEC contactée ?)
- Les alertes qui nécessitent une télé-expertise

→ Réduit les oublis, évite les relances manuelles, donne de la visibilité à l'IDE sans surcharger

**Question à poser :** Le CHU accepterait-il d'utiliser un outil Monka pour le suivi côté hôpital, ou préfère-t-il un format qu'il peut intégrer dans ses propres outils (tableau partagé, messagerie interne) ?

---

### B. Standardiser la présentation ADELE en 3 minutes

Créer une **vidéo courte (3 min)** que l'IDE montre à l'aidant sur une tablette :
- Ce qu'est ADELE
- Ce que ça lui apporte concrètement
- Comment installer l'app
- Pourquoi le questionnaire est important

→ Libère 20-30min d'IDE par inclusion, standardise le message, réduit les malentendus

**Question à poser :** Est-ce que les CHU valident ce format, et ont-ils des contraintes de charte graphique ou de validation institutionnelle pour ce type de support ?

---

### C. Protocole "sortie urgente" pour les cas où l'aidant part avant J+5

Prévoir une procédure légère :
- IDE envoie un SMS au numéro de l'aidant avec lien direct vers l'app et code d'accès
- IDEC ADELE prend le relais par téléphone dans les 24h
- Consentement post-inclusion si besoin (à valider réglementairement avec l'équipe art. 51)

**Question à poser :** Le cadre réglementaire de l'art. 51 permet-il un consentement différé (post-sortie, confirmé à distance) si la situation l'impose ?

---

### D. Critères d'éligibilité : préciser les cas limites pour éviter les non-inclusions par peur

Le texte dit "fragilités avérées" mais en pratique les professionnels ont tendance à **surestimer les critères** (peur d'inclure quelqu'un "pas assez malade"). Résultat : des aidants potentiellement en P2 qui passent en P1 ou qui ne sont pas inclus.

**Question à poser au CHU :**
- Peut-on prévoir **2-3 cas vignettes** pour illustrer concrètement ce qu'est un aidant éligible P1 vs P2 ?
- Y a-t-il un **filet de rattrapage** si l'équipe doute : appel possible à l'IDEC ADELE pour avis avant décision d'inclusion ?

---

## 📋 LISTE CONSOLIDÉE DES QUESTIONS À POSER AUX CHU

### Questions sur le repérage
1. Qui est le référent ADELE désigné dans chaque service ? Est-il libéré d'un temps dédié ?
2. Quelle est la durée moyenne de séjour dans chaque service ciblé ?
3. Peut-on déclencher le repérage dès l'admission (J0) plutôt qu'en cours de séjour ?
4. Que se passe-t-il si la sortie arrive avant J+5 ou en urgence (week-end, soir) ?

### Questions sur l'inclusion
5. L'IDE a-t-elle le temps d'accompagner l'installation de l'app en présentiel ?
6. Peut-on scinder la présentation ADELE (J-2) et l'installation app (J0) ?
7. Le cadre réglementaire permet-il un consentement différé en cas de sortie urgente ?
8. Est-ce que les CHU valident une vidéo de présentation courte (3 min) pour l'aidant ?

### Questions sur le DPI
9. Peut-on paramétrer dès maintenant une case "aidant ADELE" dans Crossway et Millenium Cerner ?
10. Qui a les droits de paramétrage DPI ? Le DSI doit-il valider ?
11. La saisie dans le DPI peut-elle notifier automatiquement l'IDEC (liste, mail, alerte) ?

### Questions sur le médecin prescripteur
12. Y a-t-il un médecin référent ADELE par service ou c'est le prescripteur du séjour ?
13. Que se passe-t-il si le médecin prescripteur n'est plus disponible pour la télé-expertise ?
14. Le médecin reçoit-il un résumé mensuel automatique ou uniquement en cas d'alerte P1 ?
15. Quel est le délai garanti de réponse sur Omnidoc ?

### Questions sur l'organisation inter-services
16. Y a-t-il un référent ADELE unique pour tous les services ou un par service ?
17. Le process est-il le même en gériatrie aiguë (pression de sortie) et en SMR (plus de temps) ?

### Questions spécifiques Tours
18. Comment l'ARC sera-t-il briefé et intégré dans le circuit inclusion ?

### Questions sur l'éligibilité
19. Peut-on créer 2-3 cas vignettes pour illustrer aidant P1 vs P2 ?
20. Y a-t-il un filet de rattrapage pour les cas limites (appel possible à l'IDEC avant décision) ?

### Question structurante de fond
21. Le CHU accepterait-il un tableau de bord Monka pour le suivi côté hôpital, ou préfère-t-il un format propre ?
