---
description: Règles de rédaction des fiches de validation MP (KERNEL/VALIDATION_MP/)
---

# Règles de rédaction des fiches MP

## Principes fondamentaux

1. **Questions et options FIGÉES** — Les questions, leurs options de réponse, et le questionnaire sont immuables. On ne propose JAMAIS d'ajouter, supprimer ou modifier une question. Par contre, on DOIT analyser si d'autres questions existantes de la vulnérabilité pourraient être rattachées à ce MP.

2. **Toujours raisonner avant de produire** — Ne jamais remplir un tableau sans avoir d'abord répondu aux 🧠 Questions à se poser de la section. Le raisonnement DOIT apparaître dans le document avant les données.

3. **Big picture d'abord** — Avant de détailler un MP, montrer le paysage complet :
   - Quelles questions existent dans la vulnérabilité entière ?
   - Comment sont-elles réparties entre les MPs ?
   - Pour CHAQUE question NON rattachée à ce MP : pourquoi elle n'y est pas et pourrait-elle y être ?

4. **Être force de proposition** — À chaque étape, proposer des améliorations potentielles :
   - Questions existantes d'autres MPs qui pourraient aussi être liées à ce MP
   - Règles d'activation manquantes (niveaux sans version)
   - MT absentes ou mal catégorisées
   - Wording à améliorer
   - Catégories de reco à ajouter ou restructurer

5. **Justifier CHAQUE choix** — Pour chaque action, le template contient des 🧠 Questions à se poser. Le raisonnement doit être visible :

   - **Section 0 (Questions)** : Pourquoi ces questions et pas d'autres ? Pour CHAQUE question de la vulnérabilité non rattachée : analyse explicite de pertinence (oui/non + raisonnement).

   - **Action 1 (Catégories)** : Comment les catégories ont été identifiées ? Sont-elles distinctes ? Y a-t-il des angles morts ? Faut-il fusionner ou éclater ?

   - **Action 2 (Règles)** : Pour CHAQUE règle, afficher la question en texte complet avec toutes ses options et mettre en **gras** la réponse déclenchante. Format SI/ALORS/Sens clinique. Justifier chaque niveau de criticité. Vérifier que chaque question est utilisée et que chaque réponse extrême a une règle.

   - **Action 3 (MT)** : Pour CHAQUE catégorie, justifier pourquoi ce nombre précis de MT. « Pourquoi pas 1 de plus ? » (redondance ? hors scope ?) et « Pourquoi pas 1 de moins ? » (on perdrait quoi ?). Vérifier la chaîne d'action (ORGA → INFO → STRUC → SEC). Vérifier qu'il y a au moins 1 MT contributive par catégorie.

   - **Action 4 (Enrichissement)** : Vérifier types, acteurs ET domaine (🏥/🤝). Le type MED est-il nécessaire ? L'acteur est-il le bon (IDEC, MT, AS, Aidant autonome) ? Faut-il un nouvel acteur ? Y a-t-il un ordre logique d'exécution ? Y a-t-il des attributs manquants (prescription, délai) ?

   - **Action 5 (Wording)** : En 2 phases obligatoires.
     - **Phase 1** : Valider le wording de base. **Reco** = conseil succinct (label court, pas une phrase, pas un verbe d'action — c'est un cap). **MT** = action concrète (verbe d'action côté IDEC ET côté Utilisateur — l'aidant doit être poussé à agir). TOUTES les MT ont 2 versions (y compris ORGA = auto-observation). Chaque reco a 2 versions.
     - **Phase 2** : Versionner le wording par niveau de criticité (Standard/CCC/Critique) pour chaque catégorie. Reco ET MT versionnées (pas uniquement la reco). La gradation doit être perceptible. TOUTES les MT doivent être versionnées, pas seulement des « exemples clés ».

   - **Action 6 (Cohérence)** : Toutes les anomalies listées avec propositions de correction. Reco prévention (⚪) obligatoire avec MT IDEC + Utilisateur. Vérifier ASR formulée. Vérifier doublons inter-MP. Checklist 8 points avec état Avant/Après.

6. **Questions transversales** — À se poser tout au long du processus :
   - T1 : Cohérence inter-MP (doublons ?)
   - T2 : Couverture clinique minimum
   - T3 : Actionnabilité (chaque élément est exécutable ?)
   - T4 : Proportionnalité (nombre d'éléments vs complexité clinique)
   - T5 : Autonomie aidant (MT faisable seul ?)
   - T6 : Chaîne d'action (séquence logique dans chaque catégorie ?)

7. **Format MD uniquement** — Produire uniquement `[MP_ID].md` = source de vérité (pour la DB future). Pas de HTML.

8. **Signaler les lacunes** — Utiliser clairement :
   - ⚠️ pour les observations à valider
   - ❌ pour les manques critiques
   - 💡 pour les propositions d'amélioration
   - ✅ pour ce qui est validé
