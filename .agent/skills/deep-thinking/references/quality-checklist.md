# Quality Checklist — Validation du Prompt Réécrit

> Utilisé à l'étape VALIDATE du pipeline. Chaque critère doit être satisfait avant exécution.

---

## Critères Obligatoires

### 1. Fidélité à l'intent
- [ ] Le prompt réécrit capture l'intention réelle de l'utilisateur
- [ ] Rien n'a été ajouté que l'utilisateur n'a pas demandé
- [ ] Le scope n'a pas été élargi ni réduit sans raison

### 2. Clarté
- [ ] Le prompt est non ambigu — une seule interprétation possible
- [ ] Les termes vagues ont été remplacés par des termes spécifiques
- [ ] L'objectif est formulé avec un verbe d'action clair

### 3. Contexte
- [ ] Les informations nécessaires sont incluses (projet, stack, fichiers)
- [ ] Le contexte est suffisant pour qu'un agent sans historique puisse exécuter
- [ ] Les raccourcis/jargon internes sont explicités si nécessaire

### 4. Contraintes
- [ ] Les limites techniques sont explicites
- [ ] Les contraintes de scope sont définies
- [ ] Les dépendances sont identifiées

### 5. Format de sortie
- [ ] Le format attendu est spécifié (code, markdown, tableau, etc.)
- [ ] La structure est définie (sections, longueur, organisation)

### 6. Critères de succès
- [ ] Au moins 2 critères vérifiables sont définis
- [ ] Les critères sont binaires (oui/non, pas de "plutôt bien")

### 7. Non-assumptions
- [ ] Aucune hypothèse implicite n'a été faite
- [ ] Les incertitudes sont signalées comme questions à poser
- [ ] Les choix de design ne sont pas imposés sans justification

---

## Critères Bonus (Nice-to-have)

- [ ] **Prioritisation** — Les étapes sont ordonnées par importance
- [ ] **Fallback** — Un plan B est mentionné si l'approche principale échoue
- [ ] **Edge cases** — Les cas limites sont anticipés
- [ ] **Exemples** — Un exemple de résultat attendu est fourni

---

## Red Flags — Ne Pas Exécuter Si :

⛔ Le prompt est plus vague que le message original
⛔ L'intent original a été déformé par le processus de réécriture
⛔ Des informations critiques manquent et aucune question n'est posée
⛔ Le prompt est plus long que nécessaire (over-engineering du prompt)
⛔ Le framework appliqué est disproportionné par rapport à la complexité

---

## Decision Matrix

| Résultat de la validation | Action |
|---------------------------|--------|
| 7/7 critères OK | ✅ Exécuter immédiatement |
| 5-6/7 critères OK | ⚠️ Exécuter avec note mentale des gaps |
| < 5/7 critères OK | 🔄 Retourner à REWRITE |
| Red flag détecté | ⛔ Poser des questions à l'utilisateur |
