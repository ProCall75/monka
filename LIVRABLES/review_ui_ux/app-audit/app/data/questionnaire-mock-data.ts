import type { VulnerabilityDomain } from './kernel-types';

/* ═══════════════════════════════════════════════════════
   MOCK DATA — Questionnaire Demo (subset of Kernel V6)
   Only 3 questions per V for demo purposes
═══════════════════════════════════════════════════════ */

export interface MockQuestion {
    id: string;
    text: string;
    responseType: 'unique' | 'multi';
    options: string[];
    sensClinique?: string;
    /** User-facing short explanation — shown below the question when relevant */
    hint?: string;
}

export interface MockVulnerability {
    id: string;
    domain: VulnerabilityDomain;
    name: string;
    description: string;
    questionCount: number;
    estimatedMinutes: number;
    questions: MockQuestion[];
}

export interface MockActivatedMP {
    id: string;
    name: string;
    level: 'critical' | 'ccc' | 'standard' | 'prevention';
    taskCount: number;
}

export interface MockSuiviQuestion {
    id: string;
    level: 'root' | 'vulnerability' | 'mp';
    questionText: string;
    options: { label: string; value: string; icon?: string }[];
    domain?: VulnerabilityDomain;
    mpId?: string;
}

// ── Trigger questions (asked first) ──
export const MOCK_TRIGGERS: MockQuestion[] = [
    {
        id: 'N1',
        text: 'Quel est votre lien avec la personne que vous accompagnez ?',
        responseType: 'unique',
        options: ['Conjoint·e', 'Fils / Fille', 'Parent', 'Frère / Sœur', 'Ami·e', 'Autre'],
        hint: 'Cela nous aide à adapter les conseils à votre relation.',
        sensClinique: 'Le lien de parenté influence la charge émotionnelle et les responsabilités légales.',
    },
    {
        id: 'N4',
        text: 'Quel âge a votre proche ?',
        responseType: 'unique',
        options: ['Moins de 60 ans', '60–74 ans', '75–84 ans', '85 ans ou plus'],
        hint: 'Certaines aides dépendent de l\'âge de votre proche.',
        sensClinique: 'L\'âge conditionne l\'accès à l\'APA et les dispositifs de prise en charge.',
    },
    {
        id: 'N7',
        text: 'Depuis combien de temps accompagnez-vous votre proche ?',
        responseType: 'unique',
        options: ['Moins de 6 mois', '6 mois à 2 ans', '2 à 5 ans', 'Plus de 5 ans'],
        sensClinique: 'La durée d\'accompagnement est corrélée au risque d\'épuisement.',
    },
];

// ── Questions by vulnerability ──
export const MOCK_VULNERABILITIES: MockVulnerability[] = [
    {
        id: 'V1',
        domain: 'R',
        name: 'Votre vie sociale',
        description: 'Prenons quelques minutes pour comprendre votre réseau et vos liens sociaux.',
        questionCount: 15,
        estimatedMinutes: 4,
        questions: [
            {
                id: 'E1',
                text: 'Avez-vous quelqu\'un à qui parler en cas de difficulté ?',
                responseType: 'unique',
                options: ['Oui, plusieurs personnes', 'Oui, une personne', 'Non, pas vraiment', 'Non, personne'],
                hint: 'Pouvoir se confier, c\'est essentiel pour tenir sur la durée.',
                sensClinique: 'L\'isolement social est le premier facteur de risque d\'épuisement.',
            },
            {
                id: 'E3',
                text: 'Recevez-vous de l\'aide de votre entourage pour accompagner votre proche ?',
                responseType: 'unique',
                options: ['Oui, régulièrement', 'Oui, parfois', 'Rarement', 'Jamais'],
                sensClinique: 'La répartition de la charge entre aidants est un levier majeur.',
            },
            {
                id: 'E5',
                text: 'Sortez-vous régulièrement de chez vous pour des activités personnelles ?',
                responseType: 'unique',
                options: ['Oui, au moins une fois par semaine', 'De temps en temps', 'Rarement', 'Jamais, je n\'ai pas le temps'],
                hint: 'Prendre du temps pour soi, c\'est aussi prendre soin de votre proche.',
                sensClinique: 'L\'absence de temps pour soi est un signal d\'alarme pour la santé de l\'aidant.',
            },
        ],
    },
    {
        id: 'V2',
        domain: 'A',
        name: 'Vos démarches',
        description: 'Faisons le point sur les aides et les droits auxquels vous pouvez prétendre.',
        questionCount: 18,
        estimatedMinutes: 5,
        questions: [
            {
                id: 'E8',
                text: 'Votre proche bénéficie-t-il de l\'APA (Allocation Personnalisée d\'Autonomie) ?',
                responseType: 'unique',
                options: ['Oui', 'Non, mais la demande est en cours', 'Non', 'Je ne sais pas ce que c\'est'],
                sensClinique: 'L\'APA est souvent sous-utilisée : 30% des éligibles ne la demandent pas.',
            },
            {
                id: 'E10',
                text: 'Avez-vous fait reconnaître votre statut d\'aidant ?',
                responseType: 'unique',
                options: ['Oui', 'Non, je ne savais pas que c\'était possible', 'Non, je n\'ai pas eu le temps', 'Non, je ne suis pas intéressé·e'],
                sensClinique: 'La reconnaissance du statut d\'aidant ouvre l\'accès au congé de proche aidant et au répit.',
            },
            {
                id: 'E12',
                text: 'Rencontrez-vous des difficultés financières liées à l\'accompagnement ?',
                responseType: 'unique',
                options: ['Non', 'Légères', 'Significatives', 'Oui, c\'est très difficile'],
                sensClinique: 'Les difficultés financières aggravent le stress et réduisent l\'accès aux solutions de répit.',
            },
        ],
    },
    {
        id: 'V3',
        domain: 'S',
        name: 'Votre santé',
        description: 'Vous aussi, vous méritez qu\'on prenne soin de vous. Évaluons ensemble votre état.',
        questionCount: 26,
        estimatedMinutes: 7,
        questions: [
            {
                id: 'E7',
                text: 'Comment vous sentez-vous physiquement ces dernières semaines ?',
                responseType: 'unique',
                options: ['En pleine forme', 'Fatigué·e mais ça va', 'Très fatigué·e', 'Épuisé·e'],
                hint: 'Votre santé à vous compte aussi — on en prend soin ensemble.',
                sensClinique: 'La fatigue chronique est le premier symptôme du burn-out de l\'aidant.',
            },
            {
                id: 'E11',
                text: 'Avez-vous le sentiment de pouvoir continuer à accompagner votre proche ?',
                responseType: 'unique',
                options: ['Oui, sans problème', 'Oui, mais c\'est de plus en plus difficile', 'Je ne sais pas', 'Non, je risque de ne plus y arriver'],
                hint: 'Il n\'y a pas de mauvaise réponse. Soyez honnête avec vous-même.',
                sensClinique: 'Question sentinelle : une réponse négative déclenche un niveau critique.',
            },
            {
                id: 'E15',
                text: 'Consultez-vous régulièrement un médecin pour vous-même ?',
                responseType: 'unique',
                options: ['Oui, au moins une fois par an', 'Pas régulièrement', 'Non, je repousse mes RDV', 'Non, je n\'ai pas le temps'],
                sensClinique: 'Les aidants négligent leur propre santé dans 60% des cas.',
            },
        ],
    },
    {
        id: 'V4',
        domain: 'F',
        name: 'Votre proche',
        description: 'Comprenons ensemble les besoins et la situation de votre proche aidé.',
        questionCount: 55,
        estimatedMinutes: 15,
        questions: [
            {
                id: 'E23',
                text: 'Votre proche peut-il rester seul à domicile ?',
                responseType: 'unique',
                options: ['Oui, sans difficulté', 'Oui, quelques heures', 'Pas plus d\'1h', 'Ne peut pas rester seul'],
                hint: 'Cela nous aide à évaluer les solutions de répit qui pourraient vous convenir.',
                sensClinique: 'La capacité à rester seul est un indicateur clé de la dépendance.',
            },
            {
                id: 'E25',
                text: 'Votre proche présente-t-il des troubles du comportement ?',
                responseType: 'unique',
                options: ['Non', 'Légers (anxiété, irritabilité)', 'Modérés (agitation, déambulation)', 'Sévères (agressivité, fugues)'],
                sensClinique: 'Les troubles du comportement sont la première cause d\'épuisement et d\'institutionnalisation.',
            },
            {
                id: 'O8',
                text: 'Devez-vous surveiller votre proche ?',
                responseType: 'unique',
                options: ['Non', 'Parfois', 'Souvent', 'Tout le temps'],
                sensClinique: 'La surveillance permanente est épuisante et corrélée aux troubles du sommeil de l\'aidant.',
            },
        ],
    },
    {
        id: 'V5',
        domain: 'M',
        name: 'Parcours de soins',
        description: 'Organiser les soins de votre proche, sans vous y perdre.',
        questionCount: 36,
        estimatedMinutes: 10,
        questions: [
            {
                id: 'E30',
                text: 'Votre proche a-t-il un médecin traitant qui suit sa situation ?',
                responseType: 'unique',
                options: ['Oui, un suivi régulier', 'Oui, mais peu de suivi', 'Non', 'Je ne sais pas'],
                sensClinique: 'Sans médecin traitant, la coordination des soins est compromise.',
            },
            {
                id: 'E33',
                text: 'Avez-vous déjà eu recours aux urgences pour votre proche ces 6 derniers mois ?',
                responseType: 'unique',
                options: ['Non', 'Une fois', '2-3 fois', 'Plus de 3 fois'],
                sensClinique: 'Les passages répétés aux urgences indiquent un parcours de soins défaillant.',
            },
            {
                id: 'E35',
                text: 'Êtes-vous satisfait·e de la coordination entre les différents professionnels de santé ?',
                responseType: 'unique',
                options: ['Oui', 'Moyennement', 'Non', 'Il n\'y a pas de coordination'],
                sensClinique: 'Le manque de coordination est une source majeure de stress pour l\'aidant.',
            },
        ],
    },
];

// ── Mock results after V completion ──
export const MOCK_RECAP_DATA: Record<string, { score: number; activatedMPs: MockActivatedMP[] }> = {
    V1: {
        score: 72,
        activatedMPs: [
            { id: 'R1', name: 'Réseau d\'entraide', level: 'critical', taskCount: 4 },
            { id: 'R2', name: 'Relation aidant-aidé', level: 'standard', taskCount: 3 },
            { id: 'R3', name: 'Lien social', level: 'prevention', taskCount: 2 },
        ],
    },
    V2: {
        score: 58,
        activatedMPs: [
            { id: 'A1', name: 'Droits et aides', level: 'ccc', taskCount: 5 },
            { id: 'A3', name: 'Protection juridique', level: 'standard', taskCount: 3 },
        ],
    },
    V3: {
        score: 85,
        activatedMPs: [
            { id: 'S1', name: 'Charge & épuisement', level: 'critical', taskCount: 6 },
            { id: 'S2', name: 'Santé physique', level: 'ccc', taskCount: 4 },
            { id: 'S4', name: 'Accès aux soins', level: 'prevention', taskCount: 2 },
        ],
    },
    V4: {
        score: 65,
        activatedMPs: [
            { id: 'F2', name: 'Comportement', level: 'ccc', taskCount: 5 },
            { id: 'F4', name: 'Aménagement domicile', level: 'standard', taskCount: 3 },
        ],
    },
    V5: {
        score: 45,
        activatedMPs: [
            { id: 'M1', name: 'Médecin traitant', level: 'standard', taskCount: 3 },
            { id: 'M3', name: 'Coordination soins', level: 'ccc', taskCount: 4 },
        ],
    },
};

// ── Suivi flow (1 month later) ──
export const MOCK_SUIVI: MockSuiviQuestion[] = [
    {
        id: 'S000',
        level: 'root',
        questionText: 'Votre situation a-t-elle évolué depuis la dernière fois ?',
        options: [
            { label: 'Oui, quelque chose a changé', value: 'yes' },
            { label: 'Non, rien de nouveau', value: 'no' },
        ],
    },
    {
        id: 'S_V1',
        level: 'vulnerability',
        domain: 'R',
        questionText: 'Concernant votre vie sociale, y a-t-il eu du changement ?',
        options: [
            { label: 'Oui', value: 'yes' },
            { label: 'Non', value: 'no' },
        ],
    },
    {
        id: 'S_V2',
        level: 'vulnerability',
        domain: 'A',
        questionText: 'Concernant vos démarches administratives ?',
        options: [
            { label: 'Oui', value: 'yes' },
            { label: 'Non', value: 'no' },
        ],
    },
    {
        id: 'S_V3',
        level: 'vulnerability',
        domain: 'S',
        questionText: 'Concernant votre santé ?',
        options: [
            { label: 'Oui', value: 'yes' },
            { label: 'Non', value: 'no' },
        ],
    },
    {
        id: 'S_V4',
        level: 'vulnerability',
        domain: 'F',
        questionText: 'Concernant la situation de votre proche ?',
        options: [
            { label: 'Oui', value: 'yes' },
            { label: 'Non', value: 'no' },
        ],
    },
    {
        id: 'S_V5',
        level: 'vulnerability',
        domain: 'M',
        questionText: 'Concernant le parcours de soins ?',
        options: [
            { label: 'Oui', value: 'yes' },
            { label: 'Non', value: 'no' },
        ],
    },
    {
        id: 'S_V1_R1',
        level: 'mp',
        domain: 'R',
        mpId: 'R1',
        questionText: 'Votre réseau d\'entraide a-t-il évolué ?',
        options: [
            { label: 'Oui, ça s\'est amélioré', value: 'better' },
            { label: 'Oui, ça s\'est dégradé', value: 'worse' },
            { label: 'Non, pas de changement', value: 'same' },
        ],
    },
    {
        id: 'S_V3_S1',
        level: 'mp',
        domain: 'S',
        mpId: 'S1',
        questionText: 'Votre niveau de fatigue a-t-il évolué ?',
        options: [
            { label: 'Oui, je me sens mieux', value: 'better' },
            { label: 'Oui, c\'est plus difficile', value: 'worse' },
            { label: 'Non, pas de changement', value: 'same' },
        ],
    },
];

// Domain metadata for intro screens
export const VULNERABILITY_META: Record<string, { icon: string; color: string; bgGradient: string }> = {
    R: { icon: 'UsersThree', color: '#8B5CF6', bgGradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)' },
    A: { icon: 'Briefcase', color: '#F59E0B', bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)' },
    S: { icon: 'Heart', color: '#EF4444', bgGradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)' },
    F: { icon: 'House', color: '#10B981', bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' },
    M: { icon: 'Stethoscope', color: '#3B82F6', bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' },
};
