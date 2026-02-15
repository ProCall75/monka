# 🚨 Monka — Points Critiques (Par Urgence)

> **Date** : 04/02/2026

## � BLOQUANTS (Casse la valeur ou la promesse)
1.  **Zéro profondeur — tout est à plat (Architecture)** : Tous les contenus (tâches, recommandations, scores, alertes) sont posés directement sur une même page, sans hiérarchie de navigation ni notion d'entonnoir.
    *   ❌ L'app devrait être le reflet d'un accompagnement : pages d'accueil aérées → objectifs par vulnérabilité (ASR/MP) → rentrer dans un micro-parcours → voir les recos → cliquer une reco → voir les micro-tâches → cliquer une micro-tâche → détail pédagogique.
    *   ❌ C'est le seul moyen de refléter intelligemment la complexité du moteur (174 questions, 24 MP, ~1400 recos) sans perdre l'utilisateur.
    *   **Impact** : Problème racine. L'aidant voit tout d'un coup, subit de la charge mentale. La plupart des autres critiques en découlent.
2.  **Recherche d'acteurs HS (Feature clé)** : La géolocalisation ne fonctionne **QUE** pour les médecins.
    *   ❌ CCAS, CAF, CLIC, Départements : 0 résultat.
    *   **Impact** : 80% des tâches de mise en relation sont des culs-de-sac.
3.  **Polypathologie ignorée (Cœur métier)** : Question N3 à choix unique.
    *   **Impact** : Impossible de déclarer un cas complexe (ex: Vieillissement + AVC). Les recommandations sont faussées dès le départ.

## 🟠 MAJEURS (Expérience dégradée ou bug fonctionnel)
3.  **Workflow cassé** : Bouton "Valider" (étape contact) grisé mais cliquable.
    *   **Impact** : L'utilisateur peut esquiver la saisie obligatoire de l'acteur contacté, faussant le suivi.
4.  **Blog inexploitable sur mobile** : Problèmes d'affichage majeurs.
    *   **Impact** : Expérience dégradée et perte de crédibilité (image de marque).

## 🟠 MAJEURS (Expérience dégradée ou bug fonctionnel) — suite
5.  **Zéro personnalisation post-onboarding** : Après avoir saisi le prénom de l'aidé pendant l'onboarding, l'app ne l'utilise **nulle part**.
    *   Exemples : « Réservez un RDV pour **l'aidé** », « Les tâches de **l'aidé** » → devrait afficher « Réservez un RDV pour **Marie** ».
    *   **Impact** : L'app paraît froide, générique, déshumanisée. Contradiction directe avec la promesse d'accompagnement personnalisé. L'aidant ne se sent pas reconnu.
6.  **Aucune pédagogie / contextualisation** : Les fonctionnalités sont présentées sans aucune explication de leur raison d'être.
    *   ❌ Pas de « pourquoi » : pourquoi y a-t-il des tâches à faire ? Pourquoi cette section existe ? Pourquoi c'est important pour la situation de l'aidé ?
    *   ❌ Pas d'introduction des concepts : les termes métier (microparcours, mise en relation, bilan…) sont balancés sans définition ni contexte.
    *   **Impact** : L'aidant (souvent non-expert) ne comprend pas la valeur de ce qu'on lui propose. Il subit l'app au lieu de se l'approprier. Risque d'abandon élevé.
7.  **Absence d'onboarding tutoriel** : Aucun guidage à la première connexion post-inscription.
    *   ❌ Pas de tour guidé des fonctionnalités clés (dashboard, tâches, ressources, recherche d'acteurs).
    *   ❌ Pas de tooltips d'introduction ni d'écrans d'accueil explicatifs.
    *   ❌ L'aidant arrive sur le dashboard sans savoir par où commencer ni quoi faire.
    *   **Impact** : Time-to-value très élevé. L'utilisateur est perdu dès le premier lancement → frustration immédiate et risque de churn.

8.  **Contacts non segmentés par onglet** : Le menu Contacts propose 3 onglets (Santé, Démarches, Services) mais affiche **la même liste d'interlocuteurs** dans les trois.
    *   ❌ Aucune segmentation : les contacts ne sont pas filtrés par catégorie, les 3 onglets sont identiques.
    *   ❌ L'utilisateur se retrouve avec une liste énorme et non triée, quel que soit l'onglet sélectionné.
    *   **Impact** : Les onglets perdent toute utilité. L'UX de navigation est trompeuse (promesse de filtrage non tenue). Plus le nombre de contacts augmente, plus c'est ingérable.

## 🟡 A CORRIGER (UX, Wording, Perf)
9.  **Ressources dupliquées** : Contenu identique "Pour moi" vs "Pour mon proche".
10. **Performance** : Chargement des images ressources très lent.
11. **UX Confuse** : Hiérarchie visuelle floue (Tâches vs Conseils indiscernables).
12. **Wording & Typos** :
    *   Mélange Impératif/Passif.
    *   "Dîtes-nous" (faute).
    *   Question 4 : "quel age" (faute).
