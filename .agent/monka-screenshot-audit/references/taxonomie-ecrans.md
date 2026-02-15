# Taxonomie des Écrans Monka

Catalogue des sections attendues dans l'application Monka, basé sur le parcours utilisateur type.

## Parcours séquentiel (onboarding → app)

### 1. Pré-connexion
| ID | Écran | Description |
|----|-------|-------------|
| E01 | Splash / Landing | Premier écran, logo, branding |
| E02 | Login | Connexion compte existant |
| E03 | Inscription | Création de compte |

### 2. Onboarding / Questionnaire
| ID | Écran | Description |
|----|-------|-------------|
| E10 | Intro questionnaire | Explication de l'évaluation |
| E11 | Question pathologie (Q3) | Choix de la situation (⚠️ choix unique = C03) |
| E12 | Question âge (Q4) | Saisie de l'âge (⚠️ possible typo "quel age" = C13) |
| E13 | Questions suivantes | Questions intermédiaires |
| E14 | Résultats / Score | Affichage du résultat d'évaluation |

### 3. Dashboard principal
| ID | Écran | Description |
|----|-------|-------------|
| E20 | Accueil | Page principale (⚠️ tout à plat = C01) |
| E21 | Scores / Bilan | Visualisation des niveaux de vulnérabilité |
| E22 | Tâches | Liste de choses à faire (⚠️ tâches vs conseils = C12) |
| E23 | Carousels | Contenus horizontaux scrollables |
| E24 | Recommandations | Suggestions personnalisées |

### 4. Ressources
| ID | Écran | Description |
|----|-------|-------------|
| E30 | Pour moi | Ressources pour l'aidant (⚠️ dupliquées = C10) |
| E31 | Pour mon proche | Ressources pour l'aidé (⚠️ dupliquées = C10) |
| E32 | Blog / Articles | Contenu éditorial (⚠️ affichage mobile = C05) |

### 5. Contacts / Interlocuteurs
| ID | Écran | Description |
|----|-------|-------------|
| E40 | Liste contacts | Vue d'ensemble des contacts enregistrés |
| E41 | Tab Santé | Contacts santé (⚠️ même liste = C09) |
| E42 | Tab Démarches | Contacts démarches (⚠️ même liste = C09) |
| E43 | Tab Services | Contacts services (⚠️ même liste = C09) |

### 6. Recherche d'acteurs
| ID | Écran | Description |
|----|-------|-------------|
| E50 | Recherche | Interface de recherche géolocalisée (⚠️ résultats = C02) |
| E51 | Résultats | Liste de professionnels trouvés |
| E52 | Fiche acteur | Détail d'un professionnel |

### 7. Workflow / Mise en relation
| ID | Écran | Description |
|----|-------|-------------|
| E60 | Étape contact | Saisie des infos de contact (⚠️ bouton valider = C04) |
| E61 | Confirmation | Validation d'une action |

### 8. Profil & Paramètres
| ID | Écran | Description |
|----|-------|-------------|
| E70 | Mon profil | Informations utilisateur |
| E71 | Paramètres | Réglages de l'app |
