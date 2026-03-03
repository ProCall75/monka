# 📖 Glossaire — Moteur Clinique Monka

> **Version** : 1.0 | **Date** : 3 mars 2026

---

| Terme | Définition | Contexte |
|---|---|---|
| **V (Vulnérabilité)** | Un des 5 axes d'évaluation du moteur (V1-V5). Chaque V produit un score de 0 à 100 et un niveau (faible/modéré/élevé/critique). | Scoring |
| **MP (Micro-Parcours)** | Un parcours clinique thématique activé par des règles. Contient des catégories, des recos et des MTs. 24 MPs au total. | Activation |
| **MT (Micro-Tâche)** | Une action concrète proposée à l'aidant ou à l'IDEC. Rattachée à une reco, dans une catégorie d'un MP. 369 MTs au total. | Action |
| **Reco (Recommandation)** | Un conseil succinct (label court) qui chapeaute des MTs. C'est le "quoi faire" sans le "comment". 198 recos au total. | Action |
| **Catégorie** | Un regroupement thématique de règles/recos/MTs au sein d'un MP. 73 catégories au total. | Structure |
| **Règle d'activation** | Une condition (SI question = réponse ALORS activer catégorie). 235 règles au total. | Activation |
| **CCC** | Combinaison de Conditions Cliniques — une règle composée de 2+ conditions croisées. | Activation |
| **C1 / C2** | Catégories de poids dans le scoring. C1 = poids standard, C2 = poids fort (question cliniquement plus importante). | Scoring |
| **N3** | Question du type d'aidance (la question clé qui détermine le bloc de questions affiché). | Profilage |
| **O1** | Question de l'âge de l'aidé (détermine l'overlay des acteurs). | Profilage |
| **ASR** | Action Seuil de Réussite — le critère objectif de succès d'un MP. | Validation |
| **IDEC** | Infirmier(ère) Diplômé(e) d'État Coordinateur — le professionnel qui pilote le parcours. | Acteurs |
| **CR** | Compte-Rendu Médecin — le document de synthèse envoyé au médecin traitant. | Livrable |
| **Token Guard** | Principe de traçabilité : toute modification de donnée = une entrée documentée. | Qualité |
| **D-XXX** | Identifiant d'une décision dans le registre (ex: D-001, D-042). | Traçabilité |
| **TPL_NN** | Référence à un template dans `_TEMPLATES/` (ex: TPL_01 = Audit Data). | Infrastructure |
| **Wording** | Le texte affiché à l'aidant ou à l'IDEC pour une reco ou une MT. 3 variantes par niveau (standard/CCC/critique). | Contenu |
| **Overlay** | Couche de personnalisation qui modifie les acteurs selon l'âge (O1). | Profilage |
| **Prévention** | Niveau par défaut quand aucune règle ne fire dans une catégorie. Affiche une reco de prévention. | Activation |
| **K3 (Winner-takes-all)** | Règle du KERNEL : dans une même catégorie, seul le niveau le plus haut s'affiche. | Moteur |
