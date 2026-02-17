/**
 * ═══════════════════════════════════════════════════════
 * MONKA — Mock Data for Persona "Marie" (Aidante)
 * Copywriting : TOUT en langage bienveillant, zéro terme kernel
 * ═══════════════════════════════════════════════════════
 */

import type {
    KernelState,
    Vulnerability,
    MicroParcours,
    RecoCategory,
    Recommendation,
    MicroTask,
} from './kernel-types';

// ── HELPERS ──
const mt = (
    id: string,
    text: string,
    type: MicroTask['type'],
    isContributive: boolean,
    isCompleted = false,
    actor = 'Aidant'
): MicroTask => ({ id, text, type, isContributive, isCompleted, actor });

const reco = (
    id: string,
    title: string,
    criticality: Recommendation['criticality'],
    microTasks: MicroTask[]
): Recommendation => ({ id, title, criticality, microTasks });

// ═══════════════════════════════════════════════════════
// THÈME : Votre vie sociale (domain R)
// ═══════════════════════════════════════════════════════
const vieSociale: Vulnerability = {
    id: 'V1',
    domain: 'R',
    title: 'Social & Relationnel',            // kernel (interne)
    userTitle: 'Votre vie sociale',            // ce que l'aidant VOIT
    description: "Prenons soin de vos liens et de votre équilibre personnel.",
    score: 62,                                 // jamais affiché
    microParcours: [
        {
            id: 'R1',
            title: "Retrouver du répit",
            description: "Des pistes concrètes pour souffler un peu au quotidien.",
            asrObjective: "Mettre en place au moins une solution de répit régulière",
            asrProgress: 33,
            criticality: 'ccc',
            categories: [
                {
                    id: 'CAT_R1_AS',
                    name: 'Accompagnement',
                    recommendations: [
                        reco('RECO_R1_01', "Se faire accompagner", 'ccc', [
                            mt('MT_R1_01', "Contacter l'assistante sociale de votre secteur", 'SEC', true, true),
                            mt('MT_R1_02', "Préparer les documents pour votre dossier", 'STRUC', true, false),
                            mt('MT_R1_03', "Se renseigner sur les aides disponibles près de chez vous", 'INFO', false, false),
                        ]),
                        reco('RECO_R1_02', "Aménager votre temps", 'standard', [
                            mt('MT_R1_04', "En parler à votre employeur ou médecin du travail", 'SEC', true, false),
                            mt('MT_R1_05', "Découvrir le congé de proche aidant", 'INFO', false, false),
                            mt('MT_R1_06', "Estimer l'impact financier d'un aménagement", 'ORGA', false, false),
                        ]),
                    ],
                },
                {
                    id: 'CAT_R1_REPIT',
                    name: 'Répit',
                    recommendations: [
                        reco('RECO_R1_03', "Trouver des solutions de répit", 'ccc', [
                            mt('MT_R1_07', "Appeler la plateforme de répit de votre département", 'SEC', true, false),
                            mt('MT_R1_08', "Organiser un premier accueil de jour", 'STRUC', true, false),
                            mt('MT_R1_09', "Se renseigner sur le répit à domicile", 'INFO', false, true),
                        ]),
                    ],
                },
                {
                    id: 'CAT_R1_PSY',
                    name: 'Bien-être',
                    recommendations: [
                        reco('RECO_R1_04', "Prendre soin de vous aussi", 'ccc', [
                            mt('MT_R1_10', "En parler à votre médecin traitant", 'MED', true, false),
                            mt('MT_R1_11', "Identifier un psychologue ou groupe de parole", 'SEC', true, false),
                            mt('MT_R1_12', "Repérer les signaux quand vous avez besoin de souffler", 'INFO', false, false),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'R2',
            title: "Garder du lien",
            description: "Maintenir vos relations même quand le temps manque.",
            asrObjective: "Retrouver au moins un moment social régulier",
            asrProgress: 50,
            criticality: 'standard',
            categories: [
                {
                    id: 'CAT_R2_LIENS',
                    name: 'Vos liens',
                    recommendations: [
                        reco('RECO_R2_01', "Rejoindre d'autres aidants", 'standard', [
                            mt('MT_R2_01', "Trouver un café des aidants près de chez vous", 'SEC', true, true),
                            mt('MT_R2_02', "Participer à une première rencontre", 'STRUC', true, false),
                            mt('MT_R2_03', "Découvrir les communautés en ligne pour aidants", 'INFO', false, true),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'R3',
            title: "Anticiper les démarches futures",
            description: "Se préparer à d'éventuelles évolutions.",
            asrObjective: "Avoir identifié les démarches clés en cas de changement",
            asrProgress: 100,
            criticality: 'prevention',
            categories: [
                {
                    id: 'CAT_R3_PREV',
                    name: 'Anticipation',
                    recommendations: [
                        reco('RECO_R3_01', "Connaître les démarches en cas d'évolution", 'prevention', [
                            mt('MT_R3_01', "Se renseigner sur la tutelle et la curatelle", 'INFO', false, true),
                            mt('MT_R3_02', "Identifier un notaire si besoin", 'SEC', true, true),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'R4',
            title: "Entretenir vos liens familiaux",
            description: "Maintenir la communication au sein de la famille.",
            asrObjective: "Garder un dialogue ouvert avec l'entourage",
            asrProgress: 100,
            criticality: 'prevention',
            categories: [
                {
                    id: 'CAT_R4_PREV',
                    name: 'Communication',
                    recommendations: [
                        reco('RECO_R4_01', "Maintenir le dialogue familial", 'prevention', [
                            mt('MT_R4_01', "Organiser un temps d'échange avec la famille", 'ORGA', false, true),
                            mt('MT_R4_02', "Partager les informations clés avec les proches", 'INFO', false, true),
                        ]),
                    ],
                },
            ],
        },
    ],
};

// ═══════════════════════════════════════════════════════
// THÈME : Votre santé (domain S)
// ═══════════════════════════════════════════════════════
const votreSante: Vulnerability = {
    id: 'V3',
    domain: 'S',
    title: "Santé de l'aidant",
    userTitle: "Votre santé",
    description: "Vous aussi, vous méritez qu'on prenne soin de vous.",
    score: 42,
    microParcours: [
        {
            id: 'S1',
            title: "Prendre soin de votre corps",
            description: "Des actions simples pour ne pas vous oublier.",
            asrObjective: "Mettre en place un suivi médical rien que pour vous",
            asrProgress: 25,
            criticality: 'critical',
            categories: [
                {
                    id: 'CAT_S1_MED',
                    name: 'Votre suivi',
                    recommendations: [
                        reco('RECO_S1_01', "Faire le point avec votre médecin", 'critical', [
                            mt('MT_S1_01', "Prendre rendez-vous avec votre médecin traitant", 'MED', true, false),
                            mt('MT_S1_02', "Lui parler de votre rôle d'aidant et de votre fatigue", 'MED', true, false),
                            mt('MT_S1_03', "Demander un bilan de santé complet", 'MED', true, false),
                        ]),
                    ],
                },
                {
                    id: 'CAT_S1_PREV',
                    name: 'Votre sommeil',
                    recommendations: [
                        reco('RECO_S1_02', "Retrouver un bon sommeil", 'ccc', [
                            mt('MT_S1_04', "Identifier ce qui perturbe vos nuits", 'STRUC', true, false),
                            mt('MT_S1_05', "Essayer une routine du coucher apaisante", 'ORGA', false, false),
                            mt('MT_S1_06', "En parler à votre médecin si ça persiste", 'INFO', false, false),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'S2',
            title: "Alléger votre charge mentale",
            description: "Apprendre à déléguer sans culpabiliser.",
            asrObjective: "Déléguer ou organiser au moins 2 tâches récurrentes",
            asrProgress: 0,
            criticality: 'ccc',
            categories: [
                {
                    id: 'CAT_S2_ORGA',
                    name: 'Organisation',
                    recommendations: [
                        reco('RECO_S2_01', "Déléguer sans culpabiliser", 'ccc', [
                            mt('MT_S2_01', "Lister tout ce que vous faites au quotidien", 'STRUC', true, false),
                            mt('MT_S2_02', "Identifier ce que quelqu'un d'autre pourrait faire", 'STRUC', true, false),
                            mt('MT_S2_03', "Se renseigner sur l'aide à domicile", 'INFO', false, false),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'S3',
            title: "Maintenir votre alimentation",
            description: "Garder une alimentation équilibrée malgré le quotidien.",
            asrObjective: "Conserver des repas réguliers et équilibrés",
            asrProgress: 100,
            criticality: 'prevention',
            categories: [
                {
                    id: 'CAT_S3_PREV',
                    name: 'Alimentation',
                    recommendations: [
                        reco('RECO_S3_01', "Garder de bonnes habitudes alimentaires", 'prevention', [
                            mt('MT_S3_01', "Planifier vos repas de la semaine", 'ORGA', false, true),
                            mt('MT_S3_02', "Identifier des solutions repas simples", 'INFO', false, true),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'S4',
            title: "Garder une activité physique",
            description: "Bouger un peu chaque jour, même 15 minutes.",
            asrObjective: "Maintenir une activité physique régulière",
            asrProgress: 100,
            criticality: 'prevention',
            categories: [
                {
                    id: 'CAT_S4_PREV',
                    name: 'Activité physique',
                    recommendations: [
                        reco('RECO_S4_01', "Intégrer du mouvement au quotidien", 'prevention', [
                            mt('MT_S4_01', "Trouver une activité qui vous plaît", 'ORGA', false, true),
                            mt('MT_S4_02', "Planifier 2-3 créneaux par semaine", 'ORGA', false, true),
                        ]),
                    ],
                },
            ],
        },
    ],
};

// ═══════════════════════════════════════════════════════
// THÈME : Parcours de soins (domain M)
// ═══════════════════════════════════════════════════════
const parcoursSoins: Vulnerability = {
    id: 'V5',
    domain: 'M',
    title: 'Parcours médical',
    userTitle: 'Parcours de soins',
    description: "Organiser les soins de Francine, sans vous y perdre.",
    score: 85,
    microParcours: [
        {
            id: 'M1',
            title: "Organiser le suivi médical",
            description: "Des outils simples pour ne rien oublier aux rendez-vous.",
            asrObjective: "Avoir un dossier à jour et un interlocuteur identifié",
            asrProgress: 75,
            criticality: 'standard',
            categories: [
                {
                    id: 'CAT_M1_COORD',
                    name: 'Le dossier médical',
                    recommendations: [
                        reco('RECO_M1_01', "Tenir un dossier à jour", 'standard', [
                            mt('MT_M1_01', "Rassembler les derniers comptes-rendus médicaux", 'STRUC', true, true),
                            mt('MT_M1_02', "L'apporter à chaque rendez-vous", 'ORGA', false, true),
                            mt('MT_M1_03', "Demander un résumé écrit après chaque consultation", 'STRUC', true, true),
                        ]),
                        reco('RECO_M1_02', "Trouver un médecin référent", 'standard', [
                            mt('MT_M1_04', "Demander à votre médecin traitant s'il peut coordonner", 'SEC', true, true),
                            mt('MT_M1_05', "Se renseigner sur les réseaux de soins de votre zone", 'INFO', false, false),
                        ]),
                    ],
                },
            ],
        },
    ],
};

// ═══════════════════════════════════════════════════════
// THÈME : Vos démarches (domain A)
// ═══════════════════════════════════════════════════════
const vosDemarches: Vulnerability = {
    id: 'V2',
    domain: 'A',
    title: 'Administratif & Juridique',
    userTitle: 'Vos démarches',
    description: "Simplifiez les démarches administratives liées à l'accompagnement.",
    score: 45,
    microParcours: [
        {
            id: 'A1',
            title: "Comprendre vos droits",
            description: "Les aides financières et administratives auxquelles vous avez droit.",
            asrObjective: "Identifier et activer les aides disponibles",
            asrProgress: 20,
            criticality: 'critical',
            categories: [
                {
                    id: 'CAT_A1_DROITS',
                    name: 'Les aides financières',
                    recommendations: [
                        reco('RECO_A1_01', "Faire la demande d'APA", 'critical', [
                            mt('MT_A1_01', "Rassembler les justificatifs nécessaires (identité, ressources)", 'STRUC', true, true),
                            mt('MT_A1_02', "Contacter le département ou le CCAS", 'SEC', false, true),
                            mt('MT_A1_03', "Prendre RDV pour l'évaluation GIR", 'ORGA', false, false),
                        ]),
                        reco('RECO_A1_02', "Vérifier l'éligibilité au droit au répit", 'standard', [
                            mt('MT_A1_04', "Se renseigner auprès de la caisse de retraite", 'INFO', false, false),
                            mt('MT_A1_05', "Demander un devis pour un accueil de jour/temporaire", 'ORGA', false, false),
                        ]),
                    ],
                },
            ],
        },
    ],
};

// ═══════════════════════════════════════════════════════
// THÈME : Francine (domain F)
// Kernel V4 — Fragilité du proche (F1–F6)
// ═══════════════════════════════════════════════════════
const votreProche: Vulnerability = {
    id: 'V4',
    domain: 'F',
    title: 'Fragilité du proche',
    userTitle: 'Francine',
    description: "Accompagner Francine en toute sécurité au quotidien.",
    score: 70,
    microParcours: [
        {
            id: 'F1',
            title: "Sécuriser le quotidien",
            description: "Des actions concrètes pour adapter l'environnement de Francine.",
            asrObjective: "Identifier et réduire les risques au domicile du proche",
            asrProgress: 50,
            criticality: 'ccc',
            categories: [
                {
                    id: 'CAT_F1_SECURITE',
                    name: 'Sécurité au domicile',
                    recommendations: [
                        reco('RECO_F1_01', "Adapter le logement", 'ccc', [
                            mt('MT_F1_01', "Évaluer les risques de chute dans le logement", 'STRUC', true, true),
                            mt('MT_F1_02', "Se renseigner sur les aides techniques disponibles", 'INFO', false, true),
                            mt('MT_F1_03', "Contacter un ergothérapeute pour un bilan à domicile", 'SEC', true, false),
                        ]),
                        reco('RECO_F1_02', "Organiser l'aide professionnelle", 'standard', [
                            mt('MT_F1_04', "Évaluer les besoins en aide à domicile de Francine", 'STRUC', true, true),
                            mt('MT_F1_05', "Se renseigner sur les services d'aide à domicile du territoire", 'INFO', false, false),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'F2',
            title: "Comprendre les changements",
            description: "Mieux comprendre l'évolution de la situation de Francine.",
            asrObjective: "Avoir un suivi régulier des capacités et besoins du proche",
            asrProgress: 25,
            criticality: 'standard',
            categories: [
                {
                    id: 'CAT_F2_SUIVI',
                    name: 'Suivi au quotidien',
                    recommendations: [
                        reco('RECO_F2_01', "Suivre l'évolution au quotidien", 'standard', [
                            mt('MT_F2_01', "Repérer les changements de comportement ou d'humeur", 'ORGA', false, true),
                            mt('MT_F2_02', "En parler au médecin traitant lors du prochain rendez-vous", 'MED', true, false),
                            mt('MT_F2_03', "Tenir un carnet de suivi simple pour noter les évolutions", 'STRUC', true, false),
                        ]),
                    ],
                },
            ],
        },
        {
            id: 'F3',
            title: "Préserver les liens sociaux du proche",
            description: "Aider Francine à garder des interactions sociales.",
            asrObjective: "Maintenir au moins une activité sociale régulière pour le proche",
            asrProgress: 100,
            criticality: 'prevention',
            categories: [
                {
                    id: 'CAT_F3_PREV',
                    name: 'Vie sociale du proche',
                    recommendations: [
                        reco('RECO_F3_01', "Garder des activités sociales pour Francine", 'prevention', [
                            mt('MT_F3_01', "Identifier les activités adaptées dans votre quartier", 'INFO', false, true),
                            mt('MT_F3_02', "Organiser des visites régulières de l'entourage", 'ORGA', false, true),
                        ]),
                    ],
                },
            ],
        },
    ],
};

// ═══════════════════════════════════════════════════════
// FULL STATE
// ═══════════════════════════════════════════════════════
export const kernelMock: KernelState = {
    user: {
        name: 'Marie',
        role: 'Aidante',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        notificationCount: 2,
    },
    vulnerabilities: [vieSociale, votreSante, parcoursSoins, vosDemarches, votreProche],
};

export const mockVulnerabilities = kernelMock.vulnerabilities;
export const mockUser = kernelMock.user;
