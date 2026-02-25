/**
 * ═══════════════════════════════════════════════════════
 * MONKA — Actionable Advice Cards
 * Replaces vague "Renseignez-vous auprès de…" with
 * concrete, pre-resolved steps for Marie (95160)
 * ═══════════════════════════════════════════════════════
 */

export interface ActionStep {
    order: number;
    text: string;
    detail?: string;      // extra info when expanded
    isDone?: boolean;
}

export interface ActionableAdvice {
    id: string;
    title: string;
    subtitle: string;
    domain: 'R' | 'S' | 'A' | 'F' | 'M';
    priority: 'urgent' | 'recommended' | 'optional';
    estimatedTime: string;          // e.g. "2-3 semaines"
    steps: ActionStep[];
    contacts: {
        name: string;
        phone: string;
        role: string;
    }[];
    documents: string[];
    tip?: string;                    // Monka pro-tip
    linkedMicroTaskIds?: string[];   // link to kernel micro-tasks
}

export const actionableAdvices: ActionableAdvice[] = [
    {
        id: 'ACT_00',
        title: "Contacter l'assistante sociale de votre secteur",
        subtitle: "Premier contact gratuit — elle vous oriente dans toutes vos démarches",
        domain: 'R',
        priority: 'urgent',
        estimatedTime: '15 minutes',
        steps: [
            {
                order: 1,
                text: 'Trouver votre assistante sociale',
                detail: "Appelez votre mairie ou votre CCAS (Centre Communal d'Action Sociale). Demandez les coordonnées de l'assistante sociale de votre secteur. Vous pouvez aussi passer directement au CCAS sans rendez-vous.",
                isDone: true,
            },
            {
                order: 2,
                text: 'Prendre rendez-vous',
                detail: "Appelez et précisez que vous êtes aidant(e). Les assistantes sociales ont des créneaux dédiés. Délai habituel : 1 à 2 semaines. En urgence, demandez un créneau rapide.",
            },
            {
                order: 3,
                text: 'Préparer votre rendez-vous',
                detail: "Apportez : pièce d'identité, justificatif de domicile, dernier avis d'imposition, et si possible un certificat médical du médecin de votre proche. Notez vos questions à l'avance.",
            },
            {
                order: 4,
                text: 'Lors du rendez-vous',
                detail: "L'assistante sociale évaluera votre situation globale et vous orientera : APA, aides financières, répit, adaptation du logement. Elle peut aussi remplir les dossiers avec vous.",
            },
        ],
        contacts: [
            { name: 'CCAS de votre commune', phone: '3966', role: 'Accueil social de proximité' },
            { name: 'Mairie (standard)', phone: '3966', role: 'Orientation vers le CCAS' },
        ],
        documents: [
            "Pièce d'identité",
            "Justificatif de domicile récent",
            "Dernier avis d'imposition",
        ],
        tip: "Astuce Monka : L'assistante sociale est votre meilleure alliée. Elle connaît toutes les aides de votre territoire et peut accélérer les démarches. N'hésitez pas à tout lui dire — c'est confidentiel.",
        linkedMicroTaskIds: ['MT_R1_01'],
    },
    {
        id: 'ACT_01',
        title: "Demander l'APA (Allocation Personnalisée d'Autonomie)",
        subtitle: "Allocation Personnalisée d'Autonomie — jusqu'à 1 914€/mois",
        domain: 'A',
        priority: 'urgent',
        estimatedTime: '4-6 semaines',
        steps: [
            {
                order: 1,
                text: 'Retirer le dossier APA',
                detail: "Téléchargeable sur le site du département ou disponible au CCAS de votre commune.",
                isDone: true,
            },
            {
                order: 2,
                text: 'Rassembler les pièces justificatives',
                detail: "Pièce d'identité du proche, justificatif de domicile, dernier avis d'imposition, certificat médical du médecin traitant, relevé d'identité bancaire.",
            },
            {
                order: 3,
                text: "Envoyer le dossier complet au Conseil Départemental",
                detail: "Par courrier à la Direction de l'Autonomie de votre département, ou déposez-le au CCAS qui transmet pour vous.",
            },
            {
                order: 4,
                text: "Préparer la visite d'évaluation à domicile",
                detail: "Un professionnel viendra évaluer le degré d'autonomie (grille AGGIR). Notez les difficultés quotidiennes de votre proche à l'avance. Cela prend environ 1h.",
            },
            {
                order: 5,
                text: "Recevoir la notification et mettre en place le plan d'aide",
                detail: "Délai moyen : 2 mois. L'APA finance l'aide à domicile, les aides techniques, l'accueil de jour.",
            },
        ],
        contacts: [
            { name: 'CCAS de votre commune', phone: '3966', role: 'Accompagnement social de proximité' },
            { name: 'Direction de l\'Autonomie', phone: '3966', role: 'Conseil Départemental' },
        ],
        documents: [
            "Pièce d'identité du proche",
            "Justificatif de domicile récent",
            "Dernier avis d'imposition",
            "Certificat médical (médecin traitant)",
            "RIB du bénéficiaire",
        ],
        tip: "Astuce Monka : Déposez le dossier au CCAS plutôt que par courrier. L'assistante sociale vérifie les pièces sur place et peut vous aider à remplir le formulaire.",
        linkedMicroTaskIds: ['MT_A1_01', 'MT_A1_02', 'MT_A1_03'],
    },
    {
        id: 'ACT_02',
        title: "Obtenir le congé de proche aidant",
        subtitle: "Jusqu'à 3 mois renouvelables — 64,54€/jour d'AJPA",
        domain: 'R',
        priority: 'urgent',
        estimatedTime: '1-2 semaines',
        steps: [
            {
                order: 1,
                text: 'Vérifier votre éligibilité',
                detail: "Vous êtes éligible si : vous aidez un proche avec un taux d'incapacité ≥ 80% (ou GIR 1-3 pour les + de 60 ans). Pas de condition d'ancienneté. CDI, CDD, intérim ou fonction publique.",
            },
            {
                order: 2,
                text: 'Prévenir votre employeur',
                detail: "Courrier RAR au moins 1 mois avant (ou 15 jours si urgence). Précisez la date souhaitée et la durée. Un modèle de lettre est disponible sur service-public.fr.",
            },
            {
                order: 3,
                text: 'Demander l\'AJPA à la CAF',
                detail: "L'Allocation Journalière du Proche Aidant (64,54€/jour) se demande sur caf.fr ou au guichet. Numéro CAF : 32 30. Joignez l'attestation de l'employeur.",
            },
            {
                order: 4,
                text: 'Planifier votre reprise',
                detail: "Le congé est fractionnable : vous pouvez prendre des demi-journées. Durée max : 3 mois, renouvelable dans la limite d'un an sur toute la carrière.",
            },
        ],
        contacts: [
            { name: 'CAF', phone: '32 30', role: 'Demande AJPA' },
            { name: 'CPAM', phone: '36 46', role: 'Affection longue durée' },
        ],
        documents: [
            "Justificatif du lien avec le proche (livret de famille, etc.)",
            "Décision MDPH ou attestation APA du proche",
            "Déclaration sur l'honneur d'aide régulière",
        ],
        tip: "Astuce Monka : Vous pouvez fractionner le congé en demi-journées. Beaucoup d'aidants prennent 2 demi-journées par semaine plutôt qu'un bloc.",
        linkedMicroTaskIds: ['MT_R1_04', 'MT_R1_05', 'MT_R1_06'],
    },
    {
        id: 'ACT_03',
        title: "Trouver du répit près de chez vous",
        subtitle: "Solutions de relais pour souffler — certaines gratuites",
        domain: 'R',
        priority: 'recommended',
        estimatedTime: '1-2 semaines',
        steps: [
            {
                order: 1,
                text: 'Appeler la Plateforme de répit de votre département',
                detail: "Ils font un bilan personnalisé gratuit de vos besoins et vous orientent vers les solutions adaptées (accueil de jour, hébergement temporaire, relais à domicile).",
                isDone: true,
            },
            {
                order: 2,
                text: 'Visiter un accueil de jour proche de chez vous',
                detail: "Activités thérapeutiques, art-thérapie. votre proche pourrait y aller 1-2 jours/semaine. Coût souvent pris en charge par l'APA.",
            },
            {
                order: 3,
                text: 'Se renseigner sur le relais à domicile',
                detail: "Des services comme l'ADMR proposent une garde à domicile : un intervenant reste avec votre proche pendant que vous vous absentez. De 2h à une journée entière.",
            },
            {
                order: 4,
                text: 'Activer le droit au répit',
                detail: "Si l'APA est accordée, vous avez droit à 509,76€/an de répit supplémentaire. Demandez-le lors de la révision du plan d'aide.",
            },
        ],
        contacts: [
            { name: 'Plateforme de répit', phone: '3966', role: 'Bilan personnalisé gratuit' },
            { name: 'ADMR', phone: '01 44 65 55 55', role: 'Relais à domicile' },
        ],
        documents: [
            "Notification APA (si déjà obtenue)",
            "Ordonnance du médecin traitant (pour l'accueil de jour)",
        ],
        tip: "Astuce Monka : Commencez par 1 demi-journée d'accueil de jour. votre proche s'y habituera progressivement, et vous constaterez vite les bénéfices pour vous deux.",
        linkedMicroTaskIds: ['MT_R1_07', 'MT_R1_08', 'MT_R1_09'],
    },
    {
        id: 'ACT_04',
        title: "Faire le bilan santé aidant",
        subtitle: "Un RDV dédié avec votre médecin — 100% remboursé",
        domain: 'S',
        priority: 'recommended',
        estimatedTime: '1 semaine',
        steps: [
            {
                order: 1,
                text: 'Prendre RDV avec votre médecin traitant',
                detail: "Demandez un créneau long (30 min). Précisez que c'est pour un bilan en tant qu'aidant.",
            },
            {
                order: 2,
                text: 'Préparer votre consultation',
                detail: "Notez : vos douleurs, votre sommeil, votre niveau de fatigue (1-10), vos angoisses, depuis quand vous êtes aidant(e). Le médecin ne peut pas deviner — il faut tout dire.",
            },
            {
                order: 3,
                text: 'Demander un bilan complet',
                detail: "Prise de sang (carence fer, vitamine D, thyroïde), tension, poids. Si stress important, demandez une orientation vers un psychologue spécialisé aidants.",
            },
            {
                order: 4,
                text: 'Planifier un suivi régulier',
                detail: "Bloquez un RDV tous les 3 mois dans votre agenda. Le suivi régulier est la meilleure prévention contre l'épuisement.",
            },
        ],
        contacts: [
            { name: 'Votre médecin traitant', phone: '3966', role: 'Bilan santé aidant' },
            { name: 'Ligne d\'écoute aidants', phone: '01 84 72 94 72', role: 'Soutien psychologique' },
        ],
        documents: [
            "Carte Vitale",
            "Carnet de santé (si disponible)",
        ],
        tip: "Astuce Monka : Dites « Je suis aidant(e) et j'ai besoin d'un vrai bilan ». Cette phrase simple permet au médecin de comprendre le contexte et d'adapter sa consultation.",
        linkedMicroTaskIds: ['MT_S1_01', 'MT_S1_02', 'MT_S1_03'],
    },
    {
        id: 'ACT_05',
        title: "Adapter le logement de votre proche",
        subtitle: "Aides techniques + subventions jusqu'à 5 000€",
        domain: 'F',
        priority: 'recommended',
        estimatedTime: '3-4 semaines',
        steps: [
            {
                order: 1,
                text: 'Demander un bilan ergothérapeute',
                detail: "Bilan à domicile ~1h30. L'ergothérapeute identifie les risques de chute et propose des aménagements concrets. Peut être prescrit par le médecin traitant.",
            },
            {
                order: 2,
                text: 'Lister les aménagements prioritaires',
                detail: "Les plus courants : barres d'appui salle de bain, tapis antidérapants, chemin lumineux couloir-WC, rehausseur de toilettes, siège de douche. Budget moyen : 200-800€.",
            },
            {
                order: 3,
                text: 'Demander l\'aide de l\'ANAH',
                detail: "L'Agence Nationale de l'Habitat finance jusqu'à 50% des travaux (plafond 5 000€ pour les adaptations). Dossier sur anah.fr ou au Point Info Habitat le plus proche.",
            },
            {
                order: 4,
                text: 'Faire financer par l\'APA',
                detail: "Les aides techniques (barre, siège douche…) peuvent être intégrées au plan d'aide APA. Demandez la révision du plan lors de la prochaine évaluation.",
            },
        ],
        contacts: [
            { name: 'Votre ergothérapeute', phone: '3966', role: 'Bilan adaptation domicile' },
            { name: 'ANAH', phone: '0 806 703 803', role: 'Subvention travaux adaptation' },
        ],
        documents: [
            "Prescription médicale pour bilan ergo",
            "Devis des travaux envisagés",
            "Dernier avis d'imposition du proche",
        ],
        tip: "Astuce Monka : Commencez par les 3 aménagements les plus urgents (salle de bain + couloir). Pas besoin de tout faire d'un coup. L'ergo vous aidera à prioriser.",
        linkedMicroTaskIds: ['MT_F1_01', 'MT_F1_02', 'MT_F1_03'],
    },
    {
        id: 'ACT_06',
        title: "Rejoindre un groupe de parole aidants",
        subtitle: "Gratuit · 1x/mois · Rencontrer d'autres aidants comme vous",
        domain: 'R',
        priority: 'optional',
        estimatedTime: 'Immédiat',
        steps: [
            {
                order: 1,
                text: 'Choisir un format qui vous convient',
                detail: "En présentiel : Café des aidants près de chez vous (gratuit, sans inscription). En ligne : groupes Facebook ou forums dédiés aux aidants. France Alzheimer organise aussi des groupes de parole mensuels.",
            },
            {
                order: 2,
                text: 'S\'inscrire au prochain café des aidants',
                detail: "Association Avec Nos Proches : 01 84 72 94 72. Pas besoin de justificatif — venez comme vous êtes.",
            },
            {
                order: 3,
                text: 'Y aller une première fois',
                detail: "Vous n'êtes pas obligé(e) de parler. Beaucoup d'aidants écoutent la première fois. L'important, c'est de sortir de l'isolement.",
            },
        ],
        contacts: [
            { name: 'Avec Nos Proches', phone: '01 84 72 94 72', role: 'Café des aidants' },
            { name: 'France Alzheimer', phone: '01 42 97 52 41', role: 'Groupes de parole' },
        ],
        documents: [],
        tip: "Astuce Monka : Si la première fois est trop intimidante, amenez quelqu'un. Un ami, un proche — peu importe. L'essentiel est d'y aller.",
        linkedMicroTaskIds: ['MT_R2_01', 'MT_R2_02', 'MT_R2_03'],
    },
    {
        id: 'ACT_07',
        title: "Obtenir l'aide à domicile pour votre proche",
        subtitle: "Aide ménagère, repas, toilette — financé par l'APA",
        domain: 'F',
        priority: 'recommended',
        estimatedTime: '2-3 semaines',
        steps: [
            {
                order: 1,
                text: 'Évaluer les besoins concrets',
                detail: "Listez ce qui est difficile : toilette, repas, ménage, courses, accompagnement sorties. Un service d'aide à domicile peut faire une évaluation gratuite.",
            },
            {
                order: 2,
                text: 'Contacter un service d\'aide à domicile',
                detail: "ADMR, UNA, ou le CCAS de votre commune. Service 7j/7. Aide ménagère, aide à la toilette, préparation repas, accompagnement courses/RDV médicaux.",
            },
            {
                order: 3,
                text: 'Faire financer par l\'APA',
                detail: "L'aide à domicile est la principale dépense couverte par l'APA. Si l'APA est déjà en place, demandez une révision du plan d'aide pour ajouter les heures nécessaires.",
            },
            {
                order: 4,
                text: 'Organiser le planning',
                detail: "Commencez par 2-3 interventions/semaine. Vous pouvez ajuster ensuite. Demandez une aide référente pour assurer la continuité.",
            },
        ],
        contacts: [
            { name: 'ADMR', phone: '01 44 65 55 55', role: 'Aide à domicile' },
            { name: 'Direction de l\'Autonomie', phone: '3966', role: 'Révision plan APA' },
        ],
        documents: [
            "Notification APA en cours de validité",
            "Plan d'aide personnalisé",
        ],
        tip: "Astuce Monka : Commencez par un premier bilan gratuit avec le service d'aide à domicile. Ils évalueront les besoins et vous proposeront un planning adapté.",
        linkedMicroTaskIds: ['MT_F1_04', 'MT_F1_05'],
    },
    {
        id: 'ACT_08',
        title: "Faire reconnaître votre rôle d'aidant",
        subtitle: "Droits sociaux, retraite, protection juridique",
        domain: 'A',
        priority: 'optional',
        estimatedTime: '2-4 semaines',
        steps: [
            {
                order: 1,
                text: 'Obtenir l\'attestation de proche aidant',
                detail: "Demandez à votre médecin traitant un certificat attestant de votre rôle d'aidant. Ce document ouvre des droits (congé, AJPA, retraite).",
            },
            {
                order: 2,
                text: 'Vérifier vos droits retraite',
                detail: "L'Assurance Retraite permet l'affiliation gratuite si vous aidez un proche GIR 1-3. Appelez le 39 60 avec votre attestation APA. Cela valide des trimestres.",
            },
            {
                order: 3,
                text: 'Envisager la personne de confiance',
                detail: "Devenez officiellement « personne de confiance » de votre proche auprès de l'hôpital. Formulaire simple disponible à l'accueil de tout établissement de santé.",
            },
        ],
        contacts: [
            { name: 'Votre médecin traitant', phone: '3966', role: 'Certificat médical aidant' },
            { name: 'Assurance Retraite', phone: '39 60', role: 'Affiliation gratuite aidants' },
        ],
        documents: [
            "Pièce d'identité",
            "Notification APA ou décision MDPH du proche",
            "Justificatif de domicile",
        ],
        tip: "Astuce Monka : Cette reconnaissance n'est pas qu'administrative. Elle vous protège juridiquement et ouvre des droits concrets (retraite, congé, allocations).",
        linkedMicroTaskIds: ['MT_A1_04', 'MT_A1_05'],
    },
];
