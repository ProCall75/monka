# 📦 CONTENT_BLOCKS_SEED — Données Cliniques Extraites

> **Source :** Supabase `mbxeqrvofrmhqlwlefff` — tables `activation_rules` et `micro_parcours`
> **Date d'extraction :** 19/02/2026
> **Usage :** Référence pour peupler la table `content_blocks` et pour l'affichage dans l'UI

---

## 1. Micro-Parcours — Objectifs & Signatures ASR

Les 24 MPs avec leurs objectifs cliniques. À injecter dans `content_blocks(entity_type='micro_parcours', block_type='objectif')`.

### V1 — Répercussions de l'aidance sur la vie de l'aidant

| MP | Nom | Objectif | Signature A | Signature B |
|----|-----|----------|-------------|-------------|
| R1 | Impact sur la vie personnelle et professionnelle | Mesurer l'impact de l'aidance sur votre vie et ajuster | R1-A : Impact maîtrisé | R1-B : Impact en dégradation |
| R2 | Soutien de l'entourage et partage de l'aide | Renforcer le soutien autour de vous | R2-A : Soutien présent | R2-B : Isolement aidant |
| R3 | Isolement social de la personne aidée | Limiter l'isolement du proche et maintenir un lien social adapté | R3-A : Lien social maintenu | R3-B : Proche isolé |
| R4 | Relation aidant / proche et acceptation de l'aide | Améliorer la relation et faciliter l'acceptation de l'aide | R4-A : Relation préservée | R4-B : Tension/refus d'aide |

### V2 — Accès aux droits et gestion administrative

| MP | Nom | Objectif | Signature A | Signature B |
|----|-----|----------|-------------|-------------|
| A1 | Couverture santé et protections juridiques | Sécuriser couverture santé et protections juridiques | A1-A : Couverture santé active | A1-B : Protection juridique en place |
| A2 | Droits, aides et évaluation dépendance | Identifier et activer les droits mobilisables | A2-A : Aide financière active | A2-B : Aide humaine en cours |
| A3 | Charge et complexité des démarches | Réduire la charge mentale administrative | A3-A : Aide extérieure à la gestion | A3-B : Organisation administrative stabilisée |
| A4 | Situation scolaire/professionnelle et budget | Clarifier situation d'inclusion et impacts budget | A4-A : Ajustement professionnel effectif | A4-B : Soutien financier actif |

### V3 — Santé et bien-être de l'aidant

| MP | Nom | Objectif | Signature A | Signature B |
|----|-----|----------|-------------|-------------|
| S1 | Charge, fatigue et risque d'épuisement | Repérer la surcharge et prévenir l'épuisement | S1-A : Relais réduisant la charge | S1-B : Organisation allégeant le quotidien |
| S2 | Inquiétudes pour la sécurité | Réduire les risques graves | S2-A : Soutien par l'entourage | S2-B : Accompagnement professionnel engagé |
| S3 | Santé physique et renoncement aux soins | Protéger votre santé | S3-A : Suivi médical repris | S3-B : Démarche de soin engagée |
| S4 | Hygiène de vie (activité et sommeil) | Améliorer votre récupération | S4-A : Amélioration du repos | S4-B : Organisation quotidienne soutenable |

### V4 — Fragilités du proche aidé

| MP | Nom | Objectif | Signature A | Signature B |
|----|-----|----------|-------------|-------------|
| F1 | Vie quotidienne, budget et entourage du proche | Comprendre le quotidien du proche | F1-A : Organisation structurée | F1-B : Soutien ou aide quotidienne identifiée |
| F2 | Autonomie, aide humaine et présence nécessaire | Évaluer le niveau d'aide nécessaire | F2-A : Aide régulière active | F2-B : Aide mobilisable en cas de besoin |
| F3 | Mémoire, comportement et risques | Repérer les troubles cognitifs/comportementaux | F3-A : Dispositifs réduisant le risque | F3-B : Encadrement humain effectif |
| F4 | Douleur, fatigue, sommeil et état général | Comprendre l'état général du proche | F4-A : Suivi ou traitement en cours | F4-B : Accompagnement soulageant l'état général |
| F5 | Dépendance, handicap, addictions et épisodes aigus | Qualifier la situation pour orienter | F5-A : Plan d'action identifié | F5-B : Dispositif de réponse mobilisable |
| F6 | Autonomie fonctionnelle, chutes et aides techniques | Réduire le risque de chutes | F6-A : Aides techniques installées | F6-B : Aménagements réalisés |

### V5 — Parcours médical du proche aidé

| MP | Nom | Objectif | Signature A | Signature B |
|----|-----|----------|-------------|-------------|
| M1 | Compréhension du diagnostic et de la maladie | Clarifier le diagnostic et ses impacts | M1-A : Informations médicales clarifiées | M1-B : Échanges avec un professionnel |
| M2 | Accès aux soins et aux professionnels | Faciliter l'accès aux soins | M2-A : Rendez-vous accessibles | M2-B : Parcours de soins fonctionnel |
| M3 | Urgences, hospitalisations et continuité | Gérer les épisodes aigus | M3-A : Plan d'urgence identifié | M3-B : Contacts et procédures connus |
| M4 | Troubles psychiques, addictions et suivi | Orienter vers un suivi adapté | M4-A : Suivi actif | M4-B : Accès direct à un spécialiste |
| M5 | Coordination des soins | Mettre en place une coordination simple | M5-A : Référent identifié | M5-B : Coordination effective |
| M6 | Plan de soins, évaluations et inquiétudes | Transformer inquiétudes en plan de soins clair | M6-A : Plan formalisé | M6-B : Repères clairs |

---

## 2. Sens Clinique des Règles d'Activation

Extrait de la base Supabase (table `activation_rules`, colonne `sens_clinique`).
Tous les 235 sens cliniques sont **déjà en base** — ce fichier sert de référence lisible.

> **Format :** `rule_id` | `mp_id` | `niveau` | `sens_clinique`

### V1 — R1 (Impact vie personnelle/professionnelle)

| Rule ID | Niveau | Sens clinique |
|---------|--------|---------------|
| V1_R1_STD_01 | standard | L'aidant a déjà dû modifier sa vie professionnelle pour assumer son rôle. Signal concret d'impact → orientation vers l'AS. |
| V1_R1_STD_02 | standard | Un impact familial seul peut justifier une orientation répit. L'aidant commence à être en difficulté → agir tôt. |
| V1_R1_STD_03 | standard | Des difficultés dans la vie sociale/professionnelle, même sans impact familial, sont un signal de surcharge → orientation répit préventive. |
| V1_R1_STD_04 | standard | Impact familial seul = début de souffrance psychique → conseil proactif vers le MT. |
| V1_R1_CCC_01_a | ccc | Double impact. L'aidance retentit à la fois sur la vie intime ET sur la vie sociale/professionnelle. L'aidant n'a plus de zone préservée → besoin urgent de répit. |
| V1_R1_CCC_01_b | ccc | Quand TOUTES les sphères sont impactées, la souffrance psychique est quasi certaine → en parler avec le MT pour évaluer un soutien psy. |
| V1_R1_CCC_02 | ccc | L'aidant cumule un ajustement professionnel AVEC un impact familial. Les deux sphères principales de sa vie sont touchées. |
| V1_R1_CRIT_01 | critique | Un aidant qui a complètement arrêté de travailler est en situation bien plus grave qu'un simple aménagement. Signal d'urgence sociale. |
| V1_R1_CRIT_02_a | critique | Triple effondrement — arrêt professionnel + impact familial + impact social. L'aidant n'a plus aucune zone préservée. |
| V1_R1_CRIT_02_b | critique | Triple effondrement — arrêt professionnel + impact familial + impact social. L'aidant n'a plus aucune zone préservée. |
| V1_R1_CRIT_02_c | critique | Triple effondrement — arrêt professionnel + impact familial + impact social. L'aidant n'a plus aucune zone préservée. |

### V1 — R2 (Soutien entourage)

| Rule ID | Niveau | Sens clinique |
|---------|--------|---------------|
| V1_R2_STD_01 | standard | L'aidant est seul dans la famille mais a peut-être des ressources extérieures. Signal d'alerte modéré → explorer les possibilités de mobilisation. |
| V1_R2_STD_02 | standard | L'aidant porte la charge principale mais le considère acceptable. Signal précoce : situation tenable mais fragile. |
| V1_R2_STD_03 | standard | La charge est déséquilibrée au point de créer des tensions. L'entourage seul ne suffit pas → relais professionnels. |
| V1_R2_STD_04 | standard | L'aidant cumule les charges (multi-aidance ou parentalité). Risque augmenté d'épuisement → surveillance préventive. |
| V1_R2_CCC_01 | ccc | Aidant seul dans la famille ET sans filet de sécurité. Isolement structurel confirmé → risque d'effondrement. |
| V1_R2_CCC_02_a | ccc | Charge quasi exclusive combinée avec absence de filet de sécurité. Double signal d'isolement. |
| V1_R2_CCC_02_b | ccc | Charge déséquilibrée + absence de filet. Le soutien professionnel devient indispensable. |
| V1_R2_CCC_03 | ccc | Multi-aidance ou parentalité combinée avec le fait d'être seul dans la famille. Facteur aggravant majeur. |
| V1_R2_CRIT_01_a | critique | Isolement relationnel sévère. Aucune personne ressource en cas de crise. Signal d'urgence maximale. |
| V1_R2_CRIT_01_b | critique | L'isolement total nécessite une mise en place immédiate de relais professionnels. |
| V1_R2_CRIT_02_a | critique | Triple isolement — totalement seul dans l'aide + aucun filet + seul dans la famille. Vulnérabilité extrême. |
| V1_R2_CRIT_02_b | critique | Triple isolement. Mobilisation immédiate de tous les leviers professionnels. |
| V1_R2_CRIT_02_c | critique | Triple isolement. Vulnérabilité extrême → prévention urgente tous azimuts. |

### V1 — R3 (Isolement social proche)

| Rule ID | Niveau | Sens clinique |
|---------|--------|---------------|
| V1_R3_STD_01 | standard | Des visites mensuelles ou moins fréquentes signalent une présence limitée. Le proche peut s'isoler sans que l'aidant ne le détecte. |
| V1_R3_STD_02 | standard | Des difficultés intermittentes sont un signal précoce. Fragilisation en cours → surveillance proactive. |
| V1_R3_STD_03 | standard | Le proche a des difficultés relationnelles → proposer des activités adaptées pour compenser et prévenir l'aggravation. |
| V1_R3_CCC_01_a | ccc | Le proche a des difficultés relationnelles confirmées ET l'aidant le voit rarement. Double signal d'isolement. |
| V1_R3_CCC_01_b | ccc | Le proche est en difficulté et insuffisamment visité → les activités sociales deviennent un relais indispensable. |
| V1_R3_CRIT_01_a | critique | Triple signal d'isolement : difficultés relationnelles + présence très rare + distance géographique importante. Isolement sévère probable. |
| V1_R3_CRIT_01_b | critique | Triple signal d'isolement. Activités sociales urgentes comme relais à l'absence de l'aidant. |

### V1 — R4 (Relation aidant/proche)

| Rule ID | Niveau | Sens clinique |
|---------|--------|---------------|
| V1_R4_STD_01 | standard | Le refus systématique d'aide extérieure est générateur de tensions. L'aidant doit tout assumer. |
| V1_R4_STD_02 | standard | Tensions intermittentes = signal précoce. Agir tôt peut éviter le conflit chronique. |
| V1_R4_STD_03 | standard | Le proche accepte mais freine. Moment idéal pour comprendre les freins. Approche progressive. |
| V1_R4_STD_04 | standard | Premiers signaux de détresse psychologique. Intervenir à ce stade permet de normaliser le vécu. |
| V1_R4_STD_05 | standard | Signal de non-exploration. L'IDEC doit ouvrir le sujet et accompagner la première démarche. |
| V1_R4_CCC_01_a | ccc | Perte de reconnaissance COMBINÉE à une relation dégradée = rupture du lien en cours. |
| V1_R4_CCC_01_b | ccc | Perte de reconnaissance confirmée + relation dégradée. Deuil de la personne d'avant. |
| V1_R4_CCC_02 | ccc | Règle cross-MP (R2→R4). Tensions familiales nourries par la charge déséquilibrée. |
| V1_R4_CCC_03 | ccc | Le proche refuse l'aide ET l'aidant est angoissé pour l'avenir. Situation bloquée. |
| V1_R4_CRIT_01_a | critique | Le refus total compromet la sécurité du proche ET l'équilibre de l'aidant. Intervention urgente. |
| V1_R4_CRIT_01_b | critique | Le refus total active CAT_01 (médiation) ET CAT_02 (facilitation) simultanément. |
| V1_R4_CRIT_02_a | critique | Triple signal de rupture — perte de reconnaissance + anxiété maximale + relation dégradée. |
| V1_R4_CRIT_02_b | critique | Triple signal de rupture. Mobilisation immédiate de tous les leviers. |
| V1_R4_CRIT_02_c | critique | Triple signal de rupture. Soutien psy urgent. |

---

> **Note :** Les règles V2 (A1-A4), V3 (S1-S4), V4 (F1-F6) et V5 (M1-M6) suivent le même format.
> Les 235 sens cliniques sont **tous présents en base Supabase** dans la colonne `activation_rules.sens_clinique`.
> Ce fichier documente les règles V1 en détail comme référence ; les autres sont accessibles via requête SQL :
>
> ```sql
> SELECT id, mp_id, niveau, sens_clinique
> FROM activation_rules
> WHERE sens_clinique IS NOT NULL
> ORDER BY mp_id, id;
> ```

---

*Extraction automatisée — PRAGMA Studio — 19/02/2026*
