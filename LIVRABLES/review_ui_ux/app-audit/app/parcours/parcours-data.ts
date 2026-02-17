/* ─────────────────────────────────────────────
   Parcours Data — Source of truth
   
   This file contains:
   1. ALL 49 Amal verbatims (critiques)
   2. ALL available Session 1 screenshots
   3. Default mapping of verbatims to screenshots
   
   Edit this data or use /parcours/editor to 
   reassign verbatims visually.
───────────────────────────────────────────── */

export type Severity = 'bloquant' | 'majeur' | 'mineur';
export type AnnotationType = 'positive' | 'warning' | 'critical';

export interface Verbatim {
    id: string;          // e.g. "U2", "C1", "V3"
    theme: string;       // Category theme
    text: string;        // Amal's exact quote
    severity: Severity;
    summary: string;     // Short description of the critique
}

export interface ScreenshotInfo {
    img: string;         // e.g. "IMG_3660"
    defaultLabel: string; // What this screen shows
}

/* ─────────────────────────────────────────────
   ALL 49 VERBATIMS
───────────────────────────────────────────── */
export const ALL_VERBATIMS: Verbatim[] = [
    // ── UX (Parcours & Architecture) ──
    { id: 'U1', theme: 'UX', text: "Donc je ne sais pas par lequel commencer.", severity: 'bloquant', summary: 'Trop de CTA → l\'aidant ne sait pas par où commencer' },
    { id: 'U2', theme: 'UX', text: "Il y a marqué personnalisé avant de remplir le questionnaire, c'est pas pertinent.", severity: 'majeur', summary: '« Personnalisé » affiché AVANT le questionnaire' },
    { id: 'U3', theme: 'UX', text: "L'aidante a pris 30 minutes environ pour répondre au questionnaire.", severity: 'bloquant', summary: 'Questionnaire trop long (30 min)' },
    { id: 'U4', theme: 'UX', text: "Le premier problème, c'est que la première question c'est une réponse unique alors qu'il peut y avoir plusieurs réponses.", severity: 'bloquant', summary: 'Choix unique sur question multi-réponses' },
    { id: 'U5', theme: 'UX', text: "Il n'y a pas de possibilité de dire qu'on aide plusieurs personnes.", severity: 'bloquant', summary: 'Plusieurs aidés non pris en compte' },
    { id: 'U6', theme: 'UX', text: "Il faudrait mettre la question domicile avant de demander le code postal.", severity: 'majeur', summary: 'Ordre illogique : code postal AVANT type de domicile' },
    { id: 'U7', theme: 'UX', text: "Les propositions concernant les jeunes personnes ne sont pas pertinentes.", severity: 'majeur', summary: 'Réponses non filtrées — propositions enfants/ados malgré profil personne âgée' },
    { id: 'U8', theme: 'UX', text: "Elle a juste par erreur cliqué sur retour, et ça a recommencé tout le questionnaire.", severity: 'bloquant', summary: 'Bouton retour = tout recommencer (30 min perdues)' },
    { id: 'U9', theme: 'UX', text: "Mettre un paywall juste après 30 minutes de questionnaire, ça ne va pas convertir parce qu'on ne voit pas la valeur.", severity: 'bloquant', summary: 'Paywall immédiat post-questionnaire' },
    { id: 'U10', theme: 'UX', text: "Le stepper, elle le confond avec des boutons. Elle ne comprend pas que c'est un indicateur de progression.", severity: 'bloquant', summary: 'Stepper confondu avec boutons' },
    { id: 'U11', theme: 'UX', text: "Elle s'est inscrite, elle ne reçoit pas le mail de confirmation, donc un client perdu.", severity: 'bloquant', summary: 'Mail de confirmation jamais reçu → client perdu' },
    { id: 'U12', theme: 'UX', text: "Mais qu'est-ce qui est fait ? Parce que là, c'est une information, ce n'est pas une tâche.", severity: 'bloquant', summary: 'Confusion tâche vs information' },
    { id: 'U13', theme: 'UX', text: "Si quelqu'un sait que la personne n'a pas besoin d'une infirmière, il va peut-être quitter l'appli.", severity: 'bloquant', summary: 'Absence de « Pourquoi ? » — pas de justification' },
    { id: 'U14', theme: 'UX', text: "La carte de pricing n'est pas bien positionnée, elle est tout en bas d'une page avec des tâches.", severity: 'majeur', summary: 'CTA d\'abonnement enfoui tout en bas' },
    { id: 'U15', theme: 'UX', text: "La barre de recherche ne fonctionne pas bien — elle ne propose que « médecin généraliste ».", severity: 'bloquant', summary: 'Champ libre au lieu d\'autocomplétion' },
    { id: 'U16', theme: 'UX', text: "Il n'y a pas d'option pour dire que la personne est hospitalisée.", severity: 'majeur', summary: 'Pas d\'option « hospitalisée »' },
    { id: 'U17', theme: 'UX', text: "La recherche d'acteurs à proximité ne fonctionne pas pour tout ce qui est hors médecin généraliste.", severity: 'bloquant', summary: 'Recherche d\'acteurs dysfonctionnelle' },

    // ── Copywriting & Tonalité ──
    { id: 'C1', theme: 'Copywriting', text: "« Personne souffrante », ça ne se dit pas. C'est le mot « souffrante » — ça stigmatise.", severity: 'majeur', summary: '« Souffrante » stigmatisant' },
    { id: 'C2', theme: 'Copywriting', text: "La formulation de la question, les propositions sont censées être des activités.", severity: 'majeur', summary: 'Réponses ≠ activités' },
    { id: 'C3', theme: 'Copywriting', text: "La justification du code postal est incohérente avec la question posée.", severity: 'majeur', summary: 'Justification code postal incohérente' },
    { id: 'C5', theme: 'Copywriting', text: "Plein de formulations floues, incohérentes, des parenthèses qui sont mal.", severity: 'majeur', summary: 'Formulations illisibles' },
    { id: 'C6', theme: 'Copywriting', text: "T'arrives sur une appli qui est censée t'aider, ils disent fais-toi aider. Mais il n'y a pas de précision.", severity: 'majeur', summary: '« Faites-vous aider » trop générique' },
    { id: 'C7', theme: 'Copywriting', text: "Il y a des questions où le ton n'est pas le même, ça manque de cohérence.", severity: 'mineur', summary: 'Ton non uniforme entre questions' },
    { id: 'C8', theme: 'Copywriting', text: "« Profiter de 7 jours, pour » — Il y a une virgule en trop, c'est mal écrit.", severity: 'mineur', summary: 'Virgule fautive' },
    { id: 'C9', theme: 'Copywriting', text: "Les cartes de pricing ne sont pas uniformes, les tons ne sont pas uniformes.", severity: 'majeur', summary: '3 styles différents sur les cartes pricing' },
    { id: 'C10', theme: 'Copywriting', text: "De quoi on s'en occupe ? De qui on parle ? On parle d'un labrador ?", severity: 'majeur', summary: '« On s\'en occupe… » vague et anxiogène' },
    { id: 'C11', theme: 'Copywriting', text: "Mais qu'est-ce qui est fait ? Parce que là, c'est une information, ce n'est pas une tâche.", severity: 'bloquant', summary: '« C\'est fait » ambigu' },
    { id: 'C12', theme: 'Copywriting', text: "« Faites-vous aider » sans précision supplémentaire.", severity: 'majeur', summary: '« Faites-vous aider » sans précision' },

    // ── UI (Interface Visuelle) ──
    { id: 'I1', theme: 'UI', text: "La police est trop petite pour des aidants de 50 ans et plus.", severity: 'bloquant', summary: 'Police trop petite pour aidants 50+' },
    { id: 'I2', theme: 'UI', text: "Il y a des badges et elle croit que c'est des boutons parce qu'on ne comprend pas pourquoi ils sont là.", severity: 'majeur', summary: 'Badges perçus comme boutons cliquables' },
    { id: 'I3', theme: 'UI', text: "Les cartes de pricing sont visuellement incohérentes.", severity: 'majeur', summary: 'Cartes pricing visuellement incohérentes' },

    // ── Jargon médical ──
    { id: 'L1', theme: 'Jargon', text: "« Bilan infirmier.e / IDEC » — il ne sait pas ce que c'est. C'est un terme qui fait fuir.", severity: 'bloquant', summary: '« IDEC » jamais défini — terme qui fait fuir' },
    { id: 'L2', theme: 'Jargon', text: "CARSAT, CPAM — ça fait peur, les gens ne savent pas ce que c'est.", severity: 'majeur', summary: 'Acronymes CARSAT, CPAM non expliqués' },
    { id: 'L3', theme: 'Jargon', text: "L'orthopsie, c'est pour les yeux. Ce n'est pas un soin de communication ni un soin cognitif.", severity: 'mineur', summary: 'Orthopsie mal catégorisée' },
    { id: 'L4', theme: 'Jargon', text: "Le langage est trop médical et clinique. Il faut adapter le langage à l'aidant.", severity: 'bloquant', summary: 'Langage globalement trop clinique' },
    { id: 'L5', theme: 'Jargon', text: "C'est résidence autonome, ce n'est pas résidence sérieuse.", severity: 'mineur', summary: 'Résidence sérieuse → Résidence autonomie' },

    // ── Proposition de valeur ──
    { id: 'V1', theme: 'Valeur', text: "M'aider, c'est me soulager d'une tâche ou d'une angoisse. Là, on me donne encore plus de tâches alors que je suis déjà débordée.", severity: 'bloquant', summary: 'L\'app ajoute des tâches au lieu de soulager' },
    { id: 'V2', theme: 'Valeur', text: "Mon ressenti, à ce stade, je ne sais pas ce que ça va m'apporter.", severity: 'bloquant', summary: 'Après 45 min, ne sait toujours pas ce que l\'app apporte' },
    { id: 'V3', theme: 'Valeur', text: "On ne voit pas clairement quelle est la personnalisation. Demander des aides financières, c'est trop générique.", severity: 'bloquant', summary: 'Aucune personnalisation visible malgré questionnaire' },
    { id: 'V4', theme: 'Valeur', text: "Vérifier, ça veut dire tu me donnes encore une tâche. Mais si tu me trouves la réponse directe, ça oui ça m'aiderait.", severity: 'bloquant', summary: 'L\'aidant veut des solutions, pas des ordres' },
    { id: 'V5', theme: 'Valeur', text: "Mon angoisse, c'est quand ma mère elle répond pas. J'ai besoin de savoir est-ce qu'elle est vivante ou pas.", severity: 'bloquant', summary: 'Sécurité du proche non adressée — besoin #1 absent' },
    { id: 'V6', theme: 'Valeur', text: "Je vais pas payer en tout cas. Je n'ai vu aucun argument pour acheter.", severity: 'bloquant', summary: 'Aucune envie de payer' },
    { id: 'V7', theme: 'Valeur', text: "Il y a deux choix d'abonnement, de 7€ ça passe à 60€. Il n'y a pas de formule intermédiaire.", severity: 'majeur', summary: 'Saut 7€ → 60€ trop brutal' },

    // ── Pricing & Conversion ──
    { id: 'P1', theme: 'Pricing', text: "On me propose de m'abonner juste après 30 min de questionnaire — je n'ai vu aucune valeur.", severity: 'bloquant', summary: 'Paywall avant la valeur' },
    { id: 'P2', theme: 'Pricing', text: "Les vieux, ils ont peur d'abonnement. Il faut préciser que c'est sans engagement.", severity: 'majeur', summary: 'Peur de l\'abonnement — préciser « sans engagement »' },
    { id: 'P3', theme: 'Pricing', text: '"En 7 jours vous y voyez plus clair, zéro euros par mois" — Tu comprends ? — Non.', severity: 'majeur', summary: 'Période d\'essai mal formulée' },
    { id: 'P4', theme: 'Pricing', text: "Il faut expliquer qu'il y a différentes formules. « Inclus en découverte » c'est incompréhensible.", severity: 'majeur', summary: '« Inclus en découverte » incompréhensible' },

    // ── Sexe biologique ──
    { id: 'Q1', theme: 'Data', text: "Pourquoi on nous dit que ça permet de communiquer des informations médicales spécifiques à notre sexe alors que c'est nous l'aidant ?", severity: 'majeur', summary: 'Sexe de l\'aidant non pertinent — l\'aidant ≠ patient' },
];

/* ─────────────────────────────────────────────
   ALL AVAILABLE SCREENSHOTS (Session 1)
   Labels corrected via full visual analysis
───────────────────────────────────────────── */
export const ALL_SCREENSHOTS: ScreenshotInfo[] = [
    // ── Onboarding & Splash ──
    { img: 'IMG_3660', defaultLabel: 'Splash — Logo Monka « Le compagnon des aidants »' },
    { img: 'IMG_3661', defaultLabel: 'Analyse en cours… — « Nous préparons votre parcours »' },
    { img: 'IMG_3662', defaultLabel: 'Intro questionnaire — « Préparons votre accompagnement » (sections 3-6)' },
    { img: 'IMG_3663', defaultLabel: 'Microtâche — « Quel acteur avez-vous contacté ? »' },

    // ── Doublons session (même écrans, session différente) ──
    { img: 'IMG_3665', defaultLabel: '[Doublon] Inscription — Email & mot de passe' },
    { img: 'IMG_3666', defaultLabel: '[Doublon] Ressources' },
    { img: 'IMG_3667', defaultLabel: '[Doublon] Messagerie IDEC' },
    { img: 'IMG_3668', defaultLabel: '[Doublon] Mes informations' },
    { img: 'IMG_3683', defaultLabel: '[Doublon] Dashboard « Mon parcours »' },

    // ── Espace principal (tabs bottom nav) ──
    { img: 'IMG_3684', defaultLabel: 'Ressources — Articles & Médecin Traitant' },
    { img: 'IMG_3685', defaultLabel: 'Messagerie IDEC — Chat infirmier.e' },
    { img: 'IMG_3686', defaultLabel: 'Mes informations — Profil & aide/support' },

    // ── Personnalisation de l'espace ──
    { img: 'IMG_3687', defaultLabel: 'Personnalisation espace — Formulaire vide' },
    { img: 'IMG_3688', defaultLabel: 'Personnalisation espace — Formulaire rempli' },

    // ── Questionnaire (13 questions, progression par dots) ──
    { img: 'IMG_3689', defaultLabel: 'Q1 — Sexe biologique (1/13)' },
    { img: 'IMG_3690', defaultLabel: 'Q6 — Besoins de l\'aidant (7/13)' },
    { img: 'IMG_3691', defaultLabel: 'Q2 — Lien de parenté (2/13)' },
    { img: 'IMG_3692', defaultLabel: 'Q4 — Situation de vie / domicile (5/13)' },
    { img: 'IMG_3693', defaultLabel: 'Q5 — Difficultés loisir/travail (6/13)' },
    { img: 'IMG_3694', defaultLabel: 'Q3 — Âge de la personne aidée (3/13)' },
    { img: 'IMG_3695', defaultLabel: 'Q7 — Sentiment de ne plus reconnaître (8/13)' },
    { img: 'IMG_3696', defaultLabel: 'Q8 — Peur pour l\'avenir (9/13)' },
    { img: 'IMG_3697', defaultLabel: 'Q9 — Souhaiter plus d\'aide (10/13)' },
    { img: 'IMG_3698', defaultLabel: 'Q10 — Sentiment de fardeau (11/13)' },
    { img: 'IMG_3699', defaultLabel: 'Q11 — Professionnels/services à domicile (12/13)' },

    // ── Post-questionnaire ──
    { img: 'IMG_3700', defaultLabel: 'Q12 — Type d\'aide recherchée (13/13)' },
    { img: 'IMG_3701', defaultLabel: '« Votre parcours personnalisé » — Bienvenue essai gratuit' },

    // ── Dashboard post-questionnaire (À la une) ──
    { img: 'IMG_3702', defaultLabel: 'Dashboard « À la une » — Priorités santé (prescription prévention)' },
    { img: 'IMG_3703', defaultLabel: 'Dashboard scroll — Mon questionnaire & plan action CAF' },
    { img: 'IMG_3704', defaultLabel: 'Dashboard scroll — Services CCAS & articles « Pour aller plus loin »' },

    // ── Dashboard onglets ──
    { img: 'IMG_3705', defaultLabel: 'Onglet Santé — Prescription prévention (card dark)' },
    { img: 'IMG_3706', defaultLabel: 'Onglet Santé scroll — Card dark & « Cette semaine »' },
    { img: 'IMG_3707', defaultLabel: 'Onglet Démarches — CAF aides jeune aidant' },
    { img: 'IMG_3708', defaultLabel: 'Onglet Démarches scroll — CPAM & microtâches' },
    { img: 'IMG_3709', defaultLabel: 'Onglet Services — CCAS mairie & microtâches' },
    { img: 'IMG_3710', defaultLabel: 'Onglet Services scroll — Plateforme répit & CCAS' },

    // ── Autres écrans post-questionnaire ──
    { img: 'IMG_3711', defaultLabel: 'Ressources — Articles santé « À la une pour moi »' },
    { img: 'IMG_3712', defaultLabel: 'Messagerie IDEC — « Sophie est là pour vous » + CTA S\'abonner' },
    { img: 'IMG_3713', defaultLabel: 'Mes informations — Historique, contacts, documents, paramètres' },
    { img: 'IMG_3717', defaultLabel: 'Vous et votre proche — Profil rempli (Marwane & Francine)' },
    { img: 'IMG_3718', defaultLabel: 'Mes Contacts — Soignants (onglet Santé, Pour Moi / Mon Proche)' },
    { img: 'IMG_3719', defaultLabel: 'Mes Contacts — Interlocuteurs (onglet Démarches, bottom sheet catégories)' },
    { img: 'IMG_3760', defaultLabel: 'Q. Humeur de la personne aidée (variante, section 4)' },
    { img: 'IMG_3762', defaultLabel: 'Dashboard « Bonjour Marwane » — Priorités santé & Bilan infirmier.e' },

    // ── Pricing / Abonnements ──
    { img: 'IMG_3783', defaultLabel: 'Pricing — Découverte (0€/mois, bilan initial IDEC)' },
    { img: 'IMG_3784', defaultLabel: 'Pricing — Essentiel (6,99€/mois, suivi mensuel, RDV IDEC)' },
    { img: 'IMG_3785', defaultLabel: 'Pricing — Sérénité (59,99€/mois, infirmière dédiée, urgences)' },
];

/* ─────────────────────────────────────────────
   PARCOURS (User Journeys)
   Ordered sequences of screenshots forming
   distinct user flows through the app.
───────────────────────────────────────────── */
export interface Parcours {
    id: string;
    name: string;
    description: string;
    color: string;        // hex color for badge/border
    screenshotImgs: string[]; // ordered screenshot IDs
}

export const DEFAULT_PARCOURS: Parcours[] = [
    {
        id: 'questionnaire-paywall',
        name: 'Questionnaire → Paywall',
        description: 'Parcours complet : splash, onboarding, personnalisation, 13 questions, analyse, pricing.',
        color: '#6366F1',
        screenshotImgs: [
            'IMG_3660', // Splash
            'IMG_3661', // Analyse en cours (onboarding)
            'IMG_3662', // Intro questionnaire
            'IMG_3687', // Personnalisation vide
            'IMG_3688', // Personnalisation rempli
            'IMG_3689', // Q1 Sexe biologique (1/13)
            'IMG_3691', // Q2 Lien de parenté (2/13)
            'IMG_3694', // Q3 Âge personne aidée (3/13)
            'IMG_3692', // Q4 Domicile (5/13)
            'IMG_3693', // Q5 Difficultés (6/13)
            'IMG_3690', // Q6 Besoins (7/13)
            'IMG_3695', // Q7 Ne plus reconnaître (8/13)
            'IMG_3696', // Q8 Peur avenir (9/13)
            'IMG_3697', // Q9 Plus d'aide (10/13)
            'IMG_3698', // Q10 Fardeau (11/13)
            'IMG_3699', // Q11 Professionnels (12/13)
            'IMG_3700', // Q12 Type aide (13/13)
            'IMG_3701', // Parcours personnalisé / essai
            'IMG_3783', // Pricing Découverte
            'IMG_3784', // Pricing Essentiel
            'IMG_3785', // Pricing Sérénité
            'IMG_3760', // Q. Humeur (variante)
        ],
    },
    {
        id: 'decouverte-app',
        name: 'Découverte de l\'app',
        description: 'Navigation post-questionnaire : dashboard, onglets, ressources, messagerie, paramètres, contacts.',
        color: '#10B981',
        screenshotImgs: [
            'IMG_3762', // Dashboard Bonjour Marwane
            'IMG_3702', // Dashboard À la une
            'IMG_3703', // Dashboard scroll plan action
            'IMG_3704', // Dashboard scroll services/articles
            'IMG_3705', // Onglet Santé
            'IMG_3706', // Onglet Santé scroll
            'IMG_3707', // Onglet Démarches
            'IMG_3708', // Onglet Démarches scroll
            'IMG_3709', // Onglet Services
            'IMG_3710', // Onglet Services scroll
            'IMG_3711', // Ressources articles
            'IMG_3684', // Ressources médecin traitant
            'IMG_3712', // Messagerie IDEC paywall
            'IMG_3685', // Messagerie IDEC chat
            'IMG_3713', // Mes informations menu
            'IMG_3686', // Mes informations profil
            'IMG_3717', // Vous et votre proche
            'IMG_3718', // Mes Contacts soignants
            'IMG_3719', // Mes Contacts interlocuteurs
            'IMG_3663', // Microtâche
        ],
    },
];

/* ─────────────────────────────────────────────
   THEME COLORS (for display)
───────────────────────────────────────────── */
export const THEME_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    UX: { bg: '#EFF6FF', text: '#1D4ED8', border: '#93C5FD' },
    Copywriting: { bg: '#FDF4FF', text: '#9333EA', border: '#D8B4FE' },
    UI: { bg: '#FFF7ED', text: '#EA580C', border: '#FDBA74' },
    Jargon: { bg: '#FEF2F2', text: '#DC2626', border: '#FCA5A5' },
    Valeur: { bg: '#ECFDF5', text: '#059669', border: '#6EE7B7' },
    Pricing: { bg: '#FFFBEB', text: '#D97706', border: '#FCD34D' },
    Data: { bg: '#F0F9FF', text: '#0284C7', border: '#7DD3FC' },
};

export const SEVERITY_COLORS: Record<Severity, { bg: string; text: string; border: string; label: string }> = {
    bloquant: { bg: '#FEF2F2', text: '#991B1B', border: '#FCA5A5', label: '🔴 Bloquant' },
    majeur: { bg: '#FFFBEB', text: '#92400E', border: '#FCD34D', label: '🟡 Majeur' },
    mineur: { bg: '#F0FDF4', text: '#166534', border: '#86EFAC', label: '🟢 Mineur' },
};
