# 💡 Recommendations V4 — Parcours Médical du Proche

> **Source** : `SOURCES/extracted/recommendations_complete.json` (V4)  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: V4
name: "Parcours Médical du Proche"
source: "recommendations_complete.json"
extraction_date: "2026-02-07"
questions_with_reco: 31
questions_without_reco: 5
total_questions: 36
```

---

## 📋 Recommendations par Question

### N41 — Bénéficie-t-elle d'une reconnaissance officielle d'une malad

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui | N/A | - | - |
| Non | Demandez à vérifier l'éligibilité à la mise sous ALD. | Médecin traitant (ou généraliste) | Contacter le médecin traitant  pour dossier ALD (100%)' |
| Je ne sais pas | Demandez à vérifier l'éligibilité à la mise sous ALD. | Médecin traitant (ou généraliste) | Contacter le médecin traitant  pour dossier ALD (100%)' |

---

### E34 — Comprenez-vous bien la maladie, l’état de santé et les besoi

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui Partiellement Pas du tout | Maintenir l’information et rester disponible en cas de questions. | IDEC | Valoriser la compréhension de l’aidant |
| Partiellement | Renforcer l’information et clarifier certains points médicaux. | IDEC / Professionnels de santé | Identifier les points incompris ou sources de doute |
| Pas du tout | Mettre en place un accompagnement renforcé à l’information médicale. | IDEC / Médecin / Infirmier | Proposer un temps d’échange dédié |

---

### E35 — Avez-vous l’impression que le diagnostic de votre proche est

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, le diagnostic est clair | Maintenir le suivi médical et rester attentif aux évolutions. | IDEC | Confirmer la bonne compréhension du diagnostic par l’aidant |
| On m’a évoqué plusieurs hypothèses, mais rien de v | Clarifier la situation médicale et les hypothèses en cours. | IDEC / Médecin | Identifier les zones d’incertitude exprimées par l’aidant |
| Non, personne ne nous a vraiment donné de diagnost | Organiser un temps médical dédié pour poser ou expliquer le diagnostic. | IDEC / Médecin | Proposer une consultation médicale explicative |
| Je ne sais pas | Explorer la compréhension globale de la situation médicale. | IDEC | Proposer un temps d’échange pour faire le point |

---

### E36 — Depuis le début des problèmes de santé de votre proche, avez

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Non, pas particulièrement | Maintenir le suivi médical actuel et rester attentif à l’évolution de la situation. | IDEC | Confirmer que le parcours de soins est perçu comme clair |
| Oui, un peu | | Clarifier le parcours de soins et les étapes à venir. | IDEC / Médecin | Identifier les zones d’incompréhension du parcours médical |
| Oui, beaucoup (impression de tourn­er en rond) | Mettre en place un accompagnement renforcé pour structurer le parcours médical. | IDEC / Médecin | Proposer un temps de synthèse médicale |

---

### E37 — Avez-vous déjà reçu des avis médicaux contradictoires sur la

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Non  | | Maintenir le suivi médical actuel et rester attentif à l’évolution de la situation. | IDEC | Confirmer l’absence de contradiction perçue |
| Oui, parfois | Clarifier les avis médicaux et aider à la compréhension des décisions prises. | IDEC / Médecin | Identifier les points de divergence perçus par l’aidant |
| Oui, souvent | Mettre en place un accompagnement renforcé pour harmoniser le suivi médical. | IDEC / Médecin | Proposer un temps de concertation ou de synthèse médicale |

---

### E38 — Si votre proche est passé ou va passer de services ‘enfant’ 

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, bien préparé | Maintenir l’organisation mise en place et rester attentif à l’évolution de la situation. | IDEC | Valoriser la préparation et la coordination existantes |
| Un peu, mais cela reste flou | Clarifier les modalités de la transition et les interlocuteurs. | IDEC / Établissements de santé | Identifier les zones d’incertitude de la transition |
| Non, pas du tout | Mettre en place un accompagnement renforcé pour organiser la transition. | IDEC / Établissements de santé | Proposer une coordination entre les services |
| Pas concerné | Aucune action spécifique, rester attentif à une évolution future. | IDEC | Noter que la situation n’est pas concernée |

---

### O17 — A-t-elle un médecin traitant ?

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui | N/A | N/A | N/A |
| Non | Bénéficiez d'un accompagnement d'accès aux soins. | CPAM (caisse primaire d'assurance maladie) | 1=>Informer sur les dispositifs d’accès aux soins en utilisant le document "courrier DAC/CPTS"  2=>Chercher  un médecin  |
| 2 | Contactez le DAC de votre territoire. | DAC (Dispositif d'Aide à la Coordination) | - |
| 2 | Contactez la CPTS de votre territoire. | CPTS (Communauté Professionnelle Territoriale de Santé) | - |

---

### O19 — Lesquels ? (plusieurs réponses possibles)

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Cardiologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Cardiologue | Prendre RDV avec Cardiologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Oncologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Oncologue | Prendre RDV avec Oncologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Neurologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Neurologue | Prendre RDV avec neurologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Pneumologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Pneumologue | Prendre RDV avec pneumologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Ophtalmologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Ophtalmologue | Prendre RDV avec Ophtalmologue (Recherche sur internet) |
| Psychiatre | Un suivi régulier est à prévoir selon les préconisations du médecin. | Psychiatre | Prendre RDV avec Psychiatre (Recherche sur internet) |
| Chirurgien-Dentiste | Un suivi régulier est à prévoir selon les préconisations du médecin. | Chirurgien-Dentiste | Prendre RDV avec chirurgien dentiste (Recherche sur internet) |
| Gastro-entérologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Gastro-entérologue | Prendre RDV avec gastro-entérologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Endocrinologue / Diabetologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Endocrinologue / Diabetologue | Prendre RDV avec endocrinologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| ORL | Un suivi régulier est à prévoir selon les préconisations du médecin. | 10-ORL | Prendre RDV avec ORL (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Gynecologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Gynecologue | Vérifier si un RDV est déjà prévu, sinon planifier |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Nephrologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Nephrologue | Prendre RDV avec néphrologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Gériatre | Un suivi régulier est à prévoir selon les préconisations du médecin. | Gériatre | Prendre RDV avec gériatre (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Dermatologue | Un suivi régulier est à prévoir selon les préconisations du médecin. | Dermatologue | Prendre RDV avec Dermatologue (Recherche sur internet) |
|  | - | - | Se reporter à "Procédure pour prendre un rendez-vous avec un médecin spécialiste" |
| Autre | - | - | - |

---

### E39 — Le premier professionnel de santé (médecin, infirmier, spéci

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui | Maintenir l’organisation actuelle et rester attentif à l’évolution des besoins. | IDEC | Confirmer l’accessibilité des professionnels de santé |
| Non | Identifier des solutions pour faciliter l’accès aux soins. | IDEC / Professionnels de santé | Évaluer les difficultés liées à l’éloignement géographique |

---

### E40 — Quelles sont les principales difficultés pour accéder aux so

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Délais pour obtenir un rendez-vous | Identifier des solutions pour réduire les délais d’accès aux soins. | IDEC / Professionnels de santé | Rechercher des alternatives (autres praticiens, téléconsultation) |
| Peu ou pas de médecins disponibles à proximité | Faciliter l’accès à des professionnels de santé disponibles. | IDEC / CPTS / Professionnels de santé | Identifier des professionnels hors secteur immédiat |
| Difficultés de transport / mobilité | Mettre en place des solutions de transport ou d’organisation des déplacements. | IDEC / Services de transport / Entourage | Évaluer les besoins de transport |
| Difficultés à utiliser les outils de prise de rend | Accompagner l’utilisation des outils numériques. | IDEC | Proposer un accompagnement pour la prise de rendez-vous |
| Organisation avec mon travail / ma vie personnelle | Aider à coordonner les rendez-vous avec les contraintes personnelles. | IDEC | Identifier les contraintes organisationnelles |
| Coût des soins | Identifier des aides financières ou des prises en charge possibles. | IDEC | Informer sur les dispositifs de prise en charge existants |
| Autre | Identifier la difficulté spécifique et proposer une solution adaptée. | IDEC | Échanger avec l’aidant pour préciser la difficulté |
| Je ne rencontre pas de difficultés particulières | Maintenir la situation actuelle et rester attentif à l’évolution des besoins. | IDEC | Confirmer l’absence de difficulté d’accès aux soins |

---

### E41 — Votre proche a-t-il déjà participé à un programme d’éducatio

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui | Maintenir la dynamique éducative et rester attentif aux besoins complémentaires. | IDEC | Valoriser la participation au programme ETP |
| Non, on ne nous en a jamais parlé | Informer sur l’existence et l’intérêt des programmes ETP. | IDEC / Professionnels de santé | Expliquer le principe et les bénéfices de l’ETP |
| Non, mais on nous l’a proposé | Réévaluer l’intérêt du programme ETP et les freins éventuels. | IDEC / Médecin | Échanger avec l’aidant et le proche sur les raisons du refus ou du report |
| Je ne sais pas | Clarifier la situation et vérifier l’historique de prise en charge. | IDEC | Faire le point avec le proche et/ou les professionnels de santé |

---

### E42 — Parmi les rendez-vous médicaux réalisés ce mois-ci, combien 

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Aucun | Maintenir l’organisation actuelle et le suivi médical programmé. | IDEC | Confirmer la stabilité du suivi médical |
| 1 seul | Rester attentif à l’apparition de besoins médicaux non anticipés. | IDEC | Identifier le motif du rendez-vous imprévu |
| Deux | Analyser les causes des consultations non programmées. | IDEC / Médecin | Échanger avec l’aidant sur les situations ayant conduit à ces rendez-vous |
| trois | Réévaluer l’organisation du suivi médical. | IDEC / Médecin | Proposer une réévaluation du plan de soins |
| Quatre | Mettre en place un accompagnement renforcé pour stabiliser le suivi. | IDEC / Médecin | Analyser la récurrence des situations d’urgence |
| Cinq | Mettre en place une coordination médicale renforcée. | IDEC / Médecin | Proposer un temps de synthèse médicale |
| Six | Situation à risque nécessitant une réorganisation du parcours de soins. | IDEC / Médecin / Équipe de soins | Alerter les professionnels référents |

---

### E43 — Au cours des 12 derniers mois, y a-t-il eu des périodes de p

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Non | Maintenir le suivi médical régulier et rester attentif à l’évolution de la situation. | IDEC | Confirmer la continuité du suivi médical |
| Oui, une période de 3 à 6 mois | Identifier les causes de l’interruption et sécuriser le suivi à venir. | IDEC / Médecin | Échanger avec l’aidant sur les raisons de la rupture de suivi |
| Oui, plusieurs périodes ou plus de 6 mois | Mettre en place un accompagnement renforcé pour rétablir un suivi régulier. | IDEC / Médecin | Analyser l’impact de l’absence de suivi |
| Je ne sais pas | Clarifier l’historique du suivi médical. | IDEC | Faire le point avec l’aidant et les professionnels |

---

### E44 — Votre proche a-t-il déjà bénéficié d’une consultation ou d’u

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, récemment | Maintenir le suivi et rester attentif aux recommandations issues du bilan. | IDEC | Vérifier la mise en œuvre des recommandations du bilan |
| Oui, mais il y a plus d’un an | Réévaluer l’intérêt d’un nouveau bilan de synthèse. | IDEC / Médecin | Identifier les évolutions depuis le dernier bilan |
| Non, jamais | Mettre en place un accompagnement pour organiser un bilan global. | IDEC / Médecin / Structures spécialisées | Informer sur l’intérêt d’une consultation de synthèse |
| Je ne sais pas | Clarifier l’historique des consultations médicales. | - | Faire le point avec l’aidant et les professionnels |

---

### E45 — Votre proche est-il suivi dans un service ou une consultatio

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, de façon régulière | Maintenir le suivi spécialisé et rester attentif à l’évolution de la situation. | IDEC / Service d’addictologie | Vérifier la régularité du suivi et l’adhésion du proche |
| Oui, mais il/elle n’y va plus | Identifier les freins à la poursuite du suivi et réévaluer les besoins. | IDEC / Service d’addictologie | Échanger avec l’aidant et le proche sur les raisons de l’arrêt |
| Non | Évaluer l’existence d’un besoin de prise en charge en addictologie. | IDEC / Médecin | Explorer la situation avec l’aidant et le proche |
| Je ne sais pas | Clarifier la situation médicale et l’historique de suivi. | IDEC | Faire le point avec l’aidant et les professionnels |

---

### E46 — Après la dernière hospitalisation de votre proche, un suivi 

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, clairement organisé | Maintenir l’organisation mise en place et rester attentif à l’évolution de la situation. | IDEC | Vérifier le respect des rendez-vous programmés |
| Partiellement | Compléter et sécuriser l’organisation du suivi post-hospitalisation. | IDEC / Médecin traitant | Identifier les éléments manquants dans le suivi |
| Non, nous avons dû tout organiser seuls | Mettre en place un accompagnement renforcé pour structurer le suivi post-hospitalisation. | IDEC / Médecin traitant | Reprendre les éléments de sortie d’hospitalisation |
| Il n’a pas été hospitalisé récemment | Aucune action spécifique, rester attentif à une future hospitalisation. | IDEC | Noter l’absence d’hospitalisation récente |

---

### E47 — Quand l’état de santé de votre proche se dégrade brusquement

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, on sait quoi faire et qui appeler | Maintenir le plan existant et rester attentif à son actualisation. | IDEC | Vérifier que le plan est connu et à jour |
| On a quelques repères, mais ce n’est pas très clai | Clarifier et formaliser un plan d’action en cas de crise. | IDEC / Médecin | Identifier les zones de flou dans la conduite à tenir |
| Non, on improvise systématiquement / on va souvent | Mettre en place un accompagnement renforcé pour sécuriser la gestion des situations aiguës. | IDEC / Médecin | Construire un plan d’urgence personnalisé |

---

### E48 — Actuellement, votre proche est-il suivi pour ses troubles ps

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Médecin généraliste | Maintenir le suivi existant et rester attentif à l’évolution de l’état psychique. | IDEC / Médecin généraliste | Vérifier la régularité du suivi |
| Psychiatre en libéral | Poursuivre le suivi spécialisé et assurer la coordination des soins. | IDEC / Psychiatre | Vérifier la continuité du suivi psychiatrique |
| Centre médico-psychologique (CMP / CMPP) | Maintenir le lien avec la structure et suivre le projet de soins. | IDEC / CMP / CMPP | Identifier le référent au sein de la structure |
| Hôpital de jour / centre de crise | Assurer la continuité du parcours de soins après la prise en charge. | IDEC / Établissement de santé | Vérifier les modalités de suivi après la prise en charge |
| Psychologue | Maintenir l’accompagnement psychologique et en évaluer les bénéfices. | IDEC / Psychologue | Échanger avec l’aidant sur les effets du suivi |
| Aucun suivi actuellement | Évaluer le besoin d’un accompagnement psychique et proposer une orientation adaptée. | IDEC / Médecin | Explorer les signes de souffrance psychique |

---

### E49 — Dans le suivi de l’addiction, quels types de professionnels 

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Médecin (généraliste ou addictologue) | Maintenir le suivi médical et assurer la coordination des intervenants. | IDEC / Médecin | Vérifier la régularité du suivi médical |
| Psychiatre / psychologue | Poursuivre l’accompagnement psychique et en évaluer les bénéfices. | IDEC / Psychiatre / Psychologue | Vérifier la continuité du suivi psychologique ou psychiatrique |
| Travailleur social / éducateur spécialisé | Maintenir l’accompagnement social et éducatif. | IDEC / Travailleur social | Vérifier l’implication du professionnel dans le suivi |
| Infirmier (CSAPA, hôpital, ville) | Assurer la continuité des soins infirmiers dans le suivi addictologique. | IDEC / Infirmier | Vérifier la fréquence et le contenu du suivi infirmier |
| Association de patients / groupe de parole | Encourager le maintien du lien avec les pairs et le soutien collectif. | IDEC / Associations | Valoriser la participation aux groupes de parole |
| Aucun suivi structuré | Évaluer le besoin d’un accompagnement addictologique structuré. | IDEC / Médecin | Explorer la situation avec l’aidant et le proche |

---

### E50 — Votre proche est-il actuellement suivi pour ses troubles psy

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, suivi régulier et traitement bien pris Non, p | Maintenir le suivi et rester attentif à l’évolution de l’état psychique. | IDEC | Vérifier la régularité du suivi et la bonne observance du traitement |
| Oui, mais suivi ou traitement irrégulier | | Identifier les difficultés et renforcer l’accompagnement. | IDEC | Échanger avec l’aidant et le proche sur les freins au suivi |
| Non, pas de suivi / pas de traitement | Mettre en place un accompagnement pour initier une prise en charge adaptée. | IDEC / Médecin / Structures spécialisées | Explorer les besoins en santé mentale |
| Je ne sais pas | Clarifier la situation de suivi et de traitement. | IDEC | Faire le point avec l’aidant et/ou les professionnels |

---

### E51 — Votre proche est-il prêt à être aidé pour son addiction (par

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui  Peut-être / selon les conditions  Je ne sais  | Mettre en place rapidement un accompagnement adapté. | IDEC / Médecin / Addictologue | Valoriser la motivation exprimée |
| Oui | Peut-être / selon les conditions | Accompagner progressivement la réflexion et lever les freins identifiés. | IDEC / Médecin / Structures addictologiques | Explorer les conditions et les réticences exprimées |
| Non | Respecter le rythme du proche tout en restant vigilant. | IDEC | Rester disponible et maintenir un lien |
| Je ne sais pas | Clarifier la position du proche et son niveau de motivation. | - | Échanger avec l’aidant pour mieux comprendre la situation |

---

### O59 — Quels sont les professionnels, ou services qui interviennent

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Service à domicile (SAD) / auxiliaire de vie | N/A | Services à domicile (SAD) | 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD. |
| Service à domicile (SAD) / aide ménagère | N/A | Services à domicile (SAD) | 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SAD. |
| Service de soins infirmiers à domicile (SSIAD) | N/A | Service de soins infirmiers à domicile (SSIAD) | 1 =>Confirmer avec l'aidant le nombre d'heures envisagées pour l'intervention du SSIAD. |
| Infirmier libéral | N/A | Infirmier libéral | Prendre RDV avec une IDEL du territoire (Recherche sur internet) |
| Masseur-kinésithérapeute | N/A | Masseur-kinésithérapeute | Prendre RDV avec un KINÉSITHÉRAPEUTE du territoire (Recherche sur internet) |
| Aide physique adaptée (APA) | N/A | APA | Prendre RDV avec un APA du territoire (Recherche sur internet) |
| Télé-assistance | N/A | Télé-assistance | Présenter à la famille les solutions de téléassistance existantes |
| Portage des repas | N/A | Portage des repas | Présenter à la famille les solutions de téléassistance existantes |
| Educateur spécialisé | N/A | Educateur spécialisé | Prendre RDV avec un éducateur spécialisé du territoire (Recherche sur internet)  ou contacter le CMP de secteur |
| Pédicure-podologue | N/A | Pédicure-podologue | Prendre RDV avec un pédicure podologue du territoire (Recherche sur internet) |
| Ergothérapeute | N/A | Ergothérapeute | Prendre contact avec un ergothérapeute du territoire |
| Aucun | N/A | N/A | N/A |
| Autre | N/A | Autres | Évaluer la pertinence de chaque acteur dans le plan d'aide |

---

### E52 — Aujourd’hui, avez-vous une personne de référence qui coordon

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, clairement identifiée | Maintenir la coordination existante et rester attentif à l’évolution de la situation. | IDEC / Personne de référence | Vérifier que le rôle de coordination est bien opérationnel |
| Oui, mais je ne suis pas sûr·e de son rôle | Clarifier le rôle et les missions de la personne référente. | IDEC / Personne de référence | Expliquer le rôle de coordination des soins |
| Non, personne ne coordonne vraiment | Mettre en place une coordination des soins structurée. | IDEC / Médecin traitant / Structure de coordination | Identifier un professionnel référent |
| Je ne sais pas | Clarifier l’organisation actuelle des soins. | - | Faire le point avec l’aidant et les professionnels |

---

### E53 — Pour vous, qui est aujourd’hui le professionnel ‘référent’ p

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Médecin traitant | Maintenir le rôle central du médecin traitant dans la coordination des soins. | IDEC / Médecin traitant | Confirmer le rôle de référent du médecin traitant |
| Spécialiste hospitalier | Clarifier le rôle du spécialiste et son articulation avec la médecine de ville | IDEC / Spécialiste hospitalier | Identifier le champ d’intervention du spécialiste |
| Spécialiste libéral | S’assurer de la bonne coordination entre le spécialiste et les autres intervenants. | IDEC | Vérifier la transmission des informations médicales |
| Aucune personne vraiment référente | Mettre en place une coordination structurée avec un référent identifié. | IDEC / Médecin traitant | Identifier un professionnel référent |
| Je ne sais pas | Faire le point avec l’aidant sur les intervenants existants | - | - |

---

### E54 — Comment décririez-vous l’organisation des soins de votre pro

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Plutôt simple et bien organisée | Maintenir l’organisation existante et rester attentif à l’évolution des besoins. | IDEC | Valoriser l’organisation actuelle des soins |
| Gérable mais parfois compliquée | Apporter un soutien ponctuel pour sécuriser l’organisation des soins. | IDEC | Identifier les points de complexité dans l’organisation |
| Souvent très compliquée | Mettre en place un accompagnement renforcé pour simplifier et coordonner les soins. | IDEC / Médecin traitant | Analyser les dysfonctionnements de l’organisation actuelle |
| Je la trouve ingérable | Situation à risque nécessitant une réorganisation globale des soins. | IDEC / Médecin traitant | Mettre en place une coordination renforcée et prioritaire |

---

### E55 — Avez-vous le sentiment qu’une meilleure coordination entre l

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Non, pas vraiment | Maintenir l’organisation actuelle tout en restant attentif à l’évolution de la situation. | IDEC | Confirmer que la coordination actuelle est jugée suffisante |
| Oui, un peu | Proposer des améliorations ciblées de la coordination existante. | IDEC | Identifier les points précis où la coordination pourrait être améliorée |
| Oui, énormément | Mettre en place une coordination renforcée et structurée. | IDEC / Médecin traitant | Prioriser la coordination comme axe majeur d’intervention |

---

### E56 — Qu’est-ce qui vous inquiète le plus pour la santé de votre p

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Les chutes | Mettre en place des actions de prévention du risque de chute. | IDEC / Médecin / Kinésithérapeute/Ergothérapeute | Évaluer le risque de chute au domicile |
| La mémoire, le comportement | Renforcer l’évaluation cognitive et le suivi adapté. | IDEC / Médecin | Orienter vers une évaluation ou un suivi spécialisé |
| Les allers-retours aux urgences | Sécuriser le suivi médical et anticiper les situations aiguës. | IDEC / Médecin | Analyser les causes des passages aux urgences |
| L’alimentation / le poids | Évaluer l’état nutritionnel et prévenir la dénutrition. | IDEC / Médecin / Diététicien | Faire le point sur l’alimentation et l’évolution du poids |
| | Le risque qu’il/elle ne puisse plus rester à dom | Anticiper l’évolution de l’autonomie et sécuriser le maintien à domicile. | IDEC / Médecin | Évaluer le niveau d’autonomie |
| Autre | Identifier précisément l’inquiétude exprimée et proposer une réponse adaptée. | IDEC | Échanger avec l’aidant pour préciser la préoccupation |
| Je ne sais pas | Clarifier les inquiétudes potentielles et rester attentif à l’évolution. | IDEC | Proposer un temps d’échange pour explorer les craintes éventuelles |

---

### E57 — Avez-vous l’impression qu’il existe un ‘plan de route’ clair

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, c’est clair | Maintenir le plan de soins existant et rester attentif à son actualisation. | IDEC / Professionnels de santé | Vérifier que le plan de soins est à jour |
| Partiellement | Clarifier et formaliser les éléments manquants du plan de soins. | IDEC / Médecin traitant | Identifier les zones de flou dans la suite du parcours |
| Non, on avance au jour le jour | Mettre en place un accompagnement renforcé pour structurer le parcours de soins. | IDEC / Médecin traitant | Élaborer un plan de soins personnalisé et partagé |

---

### E58 — Votre proche a-t-il bénéficié d’une évaluation spécialisée l

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, consultation mémoire | Maintenir le suivi et appliquer les recommandations issues de l’évaluation. | IDEC / Médecin | Vérifier les conclusions de la consultation mémoire |
| Oui, consultation gériatrique/bilan gériatrique | Assurer le suivi global des préconisations gériatriques. | IDEC / Médecin | Vérifier la prise en compte des recommandations |
| Oui, bilan de chutes | Mettre en place des actions de prévention des chutes. | IDEC / Médecin | Évaluer le risque de chute au domicile |
| Oui, autre évaluation spécialisée | Suivre les recommandations spécifiques issues de l’évaluation. | IDEC | Identifier le type d’évaluation réalisée |
| Non, aucune | Évaluer l’intérêt d’une évaluation spécialisée liée à l’âge. | IDEC / Médecin | Informer sur l’intérêt des évaluations gériatriques |

---

### E59 — Votre enfant a-t-il été orienté vers une équipe ou une struc

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Oui, et une évaluation est en cours / réalisée | Poursuivre l’accompagnement et assurer le suivi des conclusions de l’évaluation. | IDEC | Vérifier l’avancée et les résultats de l’évaluation |
| Oui, mais nous sommes en attente depuis longtemps | Sécuriser l’attente et explorer des solutions transitoires. | IDEC | Vérifier la position sur la liste d’attente |
| Non, personne ne nous en a parlé | Informer sur les neurodéveloppement et orienter vers une évaluation adaptée. | IDEC | Informer la famille sur les dispositifs existants |
| Je ne sais pas | Clarifier la situation et l’historique des orientations. | IDEC | Faire le point avec la famille et les professionnels |

---

### E60 — Pour l’évaluation de votre enfant, quels professionnels sont

| Réponse | Recommendation App | Acteurs | Actions IDEC |
|---------|-------------------|---------|--------------|
| Pédiatre / Généraliste | Maintenir le lien avec le médecin référent et poursuivre l’évaluation si nécessaire. | IDEC / Médecin | Vérifier la continuité du suivi médical |
| Neuropédiatre | Assurer le suivi spécialisé et la mise en œuvre des recommandations. | IDEC / Neuropédiatre | Vérifier l’avancée de l’évaluation spécialisée |
| Pédopsychiatre | Poursuivre l’accompagnement psychique et coordonner les soins. | IDEC / Pédopsychiatre | Vérifier la régularité du suivi |
| Psychologue | Maintenir l’accompagnement et en évaluer les bénéfices. | IDEC / Psychologue | Échanger avec la famille sur l’évolution observée |
| Orthophoniste | Poursuivre la prise en charge et adapter les objectifs si nécessaire. | IDEC / Orthophoniste | Vérifier la mise en œuvre du suivi |
| Psychomotricien / ergothérapeute | Maintenir l’accompagnement fonctionnel et suivre l’évolution. | IDEC / Psychomotricien / Ergothérapeute | Suivre les objectifs de prise en charge |
| CAMSP / CMPP / autre centre spécialisé | Maintenir le lien avec la structure et suivre le projet global. | IDEC / Structure spécialisée | Identifier le référent au sein de la structure |
| Aucun de ces professionnels | Mettre en place une orientation vers une évaluation adaptée. | IDEC / Médecin | Informer sur les parcours d’évaluation possibles |

---

### Questions sans recommandation spécifique

> Les questions suivantes n'ont pas de recommandation dans le SOPHIE CAT : **N17, O18, O20, O21, O24**
> Elles servent principalement au scoring, déclencheurs ou contexte.

---

## 🤖 Contenu IA (à valider)

| Élément | Source | Statut |
|---------|--------|--------|
| Recommendations App | ✅ SOPHIE CAT | Legacy |
| Actions IDEC | ✅ SOPHIE CAT | Legacy |
| Micro-tâches | ✅ micro_taches_typologie.json | Extracted |
| Typage micro-tâches | 🤖 IA | À valider |
