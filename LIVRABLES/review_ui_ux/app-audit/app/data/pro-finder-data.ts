/**
 * ═══════════════════════════════════════════════════════
 * MONKA — Pro Finder Data (95160 Montmorency area)
 * Curated local professionals for Marie
 * ═══════════════════════════════════════════════════════
 */

export interface Professional {
    id: string;
    name: string;
    specialty: string;
    category: 'sante' | 'social' | 'administratif' | 'domicile';
    address: string;
    city: string;
    phone: string;
    distance: string;       // e.g. "1.2 km"
    rating?: number;        // 1-5
    hours?: string;         // e.g. "Lun-Ven 9h-18h"
    note?: string;          // e.g. "Recommandé par Monka"
    avatar?: string;        // initials URL
    isPartner?: boolean;    // Monka partner badge
    lat: number;            // GPS latitude
    lng: number;            // GPS longitude
}

export const PRO_CATEGORIES = [
    { id: 'sante', label: 'Santé', icon: '🩺' },
    { id: 'social', label: 'Social', icon: '🤝' },
    { id: 'administratif', label: 'Administratif', icon: '🏛️' },
    { id: 'domicile', label: 'Domicile', icon: '🏠' },
] as const;

export const professionals: Professional[] = [
    // ─── SANTÉ ───
    {
        id: 'PRO_01',
        name: 'Dr. Catherine Morel',
        specialty: 'Médecin généraliste',
        category: 'sante',
        address: '12 rue de la République',
        city: 'Montmorency',
        phone: '01 39 64 12 34',
        distance: '0.4 km',
        rating: 4.8,
        hours: 'Lun-Ven 8h30-19h · Sam 9h-12h',
        note: 'Habituée aux aidants',
        avatar: 'https://ui-avatars.com/api/?name=C+M&background=D6EDF0&color=1A6B5A&bold=true',
        isPartner: true,
        lat: 48.9913, lng: 2.3227,
    },
    {
        id: 'PRO_02',
        name: 'Léa Fontaine',
        specialty: 'Psychologue clinicienne',
        category: 'sante',
        address: '8 avenue Charles de Gaulle',
        city: 'Enghien-les-Bains',
        phone: '01 34 17 88 56',
        distance: '2.1 km',
        rating: 4.9,
        hours: 'Lun-Ven 9h-20h',
        note: 'Spécialisée burn-out aidants',
        avatar: 'https://ui-avatars.com/api/?name=L+F&background=E0F2FE&color=0369A1&bold=true',
        lat: 48.9696, lng: 2.3118,
    },
    {
        id: 'PRO_03',
        name: 'Marc Delaunay',
        specialty: 'Kinésithérapeute',
        category: 'sante',
        address: '25 rue de Presles',
        city: 'Soisy-sous-Montmorency',
        phone: '01 39 89 45 12',
        distance: '1.8 km',
        rating: 4.6,
        hours: 'Lun-Sam 7h30-20h',
        avatar: 'https://ui-avatars.com/api/?name=M+D&background=DCFCE7&color=166534&bold=true',
        lat: 48.9862, lng: 2.3005,
    },
    {
        id: 'PRO_04',
        name: 'Sophie Bernard',
        specialty: 'Infirmière libérale',
        category: 'sante',
        address: '3 place du Marché',
        city: 'Montmorency',
        phone: '06 78 23 45 67',
        distance: '0.6 km',
        hours: 'Lun-Dim 7h-20h',
        note: 'Se déplace à domicile',
        avatar: 'https://ui-avatars.com/api/?name=S+B&background=FCE7F3&color=9F1239&bold=true',
        isPartner: true,
        lat: 48.9895, lng: 2.3241,
    },

    // ─── SOCIAL ───
    {
        id: 'PRO_05',
        name: 'Nathalie Dupont',
        specialty: 'Assistante sociale',
        category: 'social',
        address: 'CCAS — 1 bis rue de l\'Église',
        city: 'Montmorency',
        phone: '01 39 64 55 00',
        distance: '0.3 km',
        hours: 'Lun-Ven 8h30-12h · 13h30-17h',
        note: 'Référente aidants du secteur',
        avatar: 'https://ui-avatars.com/api/?name=N+D&background=FEF3C7&color=92400E&bold=true',
        isPartner: true,
        lat: 48.9921, lng: 2.3198,
    },
    {
        id: 'PRO_06',
        name: 'CLIC Val-de-Montmorency',
        specialty: 'Centre Local d\'Information et Coordination',
        category: 'social',
        address: '5 avenue de la Gare',
        city: 'Saint-Gratien',
        phone: '01 34 17 29 00',
        distance: '2.5 km',
        rating: 4.4,
        hours: 'Lun-Ven 9h-17h',
        note: 'Coordination gérontologique',
        avatar: 'https://ui-avatars.com/api/?name=CLIC&background=E0E7FF&color=3730A3&bold=true',
        lat: 48.9724, lng: 2.2885,
    },
    {
        id: 'PRO_07',
        name: 'Plateforme de répit 95',
        specialty: 'Plateforme d\'accompagnement et de répit',
        category: 'social',
        address: '10 boulevard du Maréchal Foch',
        city: 'Eaubonne',
        phone: '01 34 06 89 50',
        distance: '3.2 km',
        hours: 'Lun-Ven 9h-17h30',
        note: 'Solutions de répit personnalisées',
        avatar: 'https://ui-avatars.com/api/?name=PFR&background=D6EDF0&color=1A6B5A&bold=true',
        isPartner: true,
        lat: 48.9925, lng: 2.2875,
    },
    {
        id: 'PRO_08',
        name: 'France Alzheimer 95',
        specialty: 'Association d\'aide aux aidants',
        category: 'social',
        address: '15 rue Paul Vaillant-Couturier',
        city: 'Cergy',
        phone: '01 30 75 55 95',
        distance: '28 km',
        hours: 'Lun-Ven 9h-12h30 · 14h-17h',
        note: 'Groupes de parole · Formations aidants',
        avatar: 'https://ui-avatars.com/api/?name=FA&background=FECDD3&color=881337&bold=true',
        lat: 49.0362, lng: 2.0780,
    },

    // ─── ADMINISTRATIF ───
    {
        id: 'PRO_09',
        name: 'Mairie de Montmorency',
        specialty: 'Services municipaux',
        category: 'administratif',
        address: '2 rue Émile Cossonneau',
        city: 'Montmorency',
        phone: '01 39 34 98 00',
        distance: '0.2 km',
        hours: 'Lun-Ven 8h30-12h · 13h30-17h30',
        note: 'Guichet MDPH · Dossier APA',
        avatar: 'https://ui-avatars.com/api/?name=M&background=E0E7FF&color=3730A3&bold=true',
        lat: 48.9907, lng: 2.3215,
    },
    {
        id: 'PRO_10',
        name: 'CPAM du Val-d\'Oise',
        specialty: 'Caisse Primaire Assurance Maladie',
        category: 'administratif',
        address: '2 rue des Chauffours',
        city: 'Cergy-Pontoise',
        phone: '36 46',
        distance: '27 km',
        hours: 'Lun-Ven 8h30-16h30',
        note: 'Affection longue durée · AJPA',
        avatar: 'https://ui-avatars.com/api/?name=CPAM&background=DBEAFE&color=1E40AF&bold=true',
        lat: 49.0482, lng: 2.0785,
    },
    {
        id: 'PRO_11',
        name: 'CAF du Val-d\'Oise',
        specialty: 'Caisse d\'Allocations Familiales',
        category: 'administratif',
        address: '1 rue des Chauffours',
        city: 'Cergy-Pontoise',
        phone: '32 30',
        distance: '27 km',
        hours: 'Lun-Ven 8h30-16h30',
        note: 'Aides au logement · AAH',
        avatar: 'https://ui-avatars.com/api/?name=CAF&background=FEF3C7&color=92400E&bold=true',
        lat: 49.0475, lng: 2.0790,
    },
    {
        id: 'PRO_12',
        name: 'MDPH 95',
        specialty: 'Maison Départementale des Personnes Handicapées',
        category: 'administratif',
        address: '2 avenue du Parc, Bât. H',
        city: 'Cergy-Pontoise',
        phone: '01 34 25 16 50',
        distance: '27 km',
        hours: 'Lun-Ven 9h-12h · 14h-17h',
        note: 'Dossier RQTH · PCH · CMI',
        avatar: 'https://ui-avatars.com/api/?name=MDPH&background=E0E7FF&color=3730A3&bold=true',
        lat: 49.0490, lng: 2.0770,
    },

    // ─── DOMICILE ───
    {
        id: 'PRO_13',
        name: 'ADMR Vallée de Montmorency',
        specialty: 'Aide & soins à domicile',
        category: 'domicile',
        address: '18 avenue du Chemin de Fer',
        city: 'Soisy-sous-Montmorency',
        phone: '01 39 89 33 44',
        distance: '1.5 km',
        rating: 4.5,
        hours: 'Lun-Dim 7h-21h',
        note: 'Aide ménagère · Toilette · Repas',
        avatar: 'https://ui-avatars.com/api/?name=ADMR&background=D6EDF0&color=1A6B5A&bold=true',
        isPartner: true,
        lat: 48.9842, lng: 2.3042,
    },
    {
        id: 'PRO_14',
        name: 'Isabelle Renault',
        specialty: 'Ergothérapeute',
        category: 'domicile',
        address: '7 rue Jean Jaurès',
        city: 'Enghien-les-Bains',
        phone: '01 34 17 62 89',
        distance: '2.3 km',
        rating: 4.7,
        hours: 'Lun-Ven 8h-18h',
        note: 'Bilan aménagement domicile',
        avatar: 'https://ui-avatars.com/api/?name=I+R&background=DCFCE7&color=166534&bold=true',
        lat: 48.9710, lng: 2.3135,
    },
    {
        id: 'PRO_15',
        name: 'Accueil de jour Les Music\'Aidants',
        specialty: 'Accueil de jour Alzheimer',
        category: 'domicile',
        address: '22 rue de la Barre',
        city: 'Montmorency',
        phone: '01 39 64 78 90',
        distance: '0.8 km',
        rating: 4.8,
        hours: 'Lun-Ven 9h-17h',
        note: 'Activités thérapeutiques · Art-thérapie',
        avatar: 'https://ui-avatars.com/api/?name=MA&background=F3E8FF&color=6B21A8&bold=true',
        isPartner: true,
        lat: 48.9880, lng: 2.3262,
    },
];
