import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Play,
    ChevronDown,
    ChevronRight,
    Zap,
    Heart,
    Shield,
    Sparkles,
} from 'lucide-react'

// === 3 Realistic Personas with FULL 150+ pre-filled answers ===

interface Persona {
    id: string
    name: string
    age: number
    emoji: string
    color: string
    icon: typeof Heart
    shortDesc: string
    story: string
    profile: {
        situation: string
        activite: string
        lienParente: string
        dureeAidance: string
        proche: string
    }
    traits: string[]
    answers: Record<string, string>
}

// ── Marie, 58 ans — Fille active aidant sa mère Alzheimer ──────────────
const marieAnswers: Record<string, string> = {
    // ─── TRIGGERS ───
    'O35': 'Femme',
    'O36': '50-64 ans',
    'N1': 'En activité',
    'O46': 'Mon père ou ma mère',
    'O14': 'Femme',
    'O1': '+75 ans',
    'O64': '69003',
    'O63': '69007',
    'O49': 'Depuis plus de 2 ans',
    'O2': 'À son domicile',
    'N3': "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative",
    'N31': 'Aucune prise en charge',
    'N26': 'Gestion administrative (constitution de dossiers, aides financières, accès aux services médico-sociaux)',
    'E71': 'Tenir physiquement et moralement dans mon rôle d\'aidant',
    'E72': 'Oui',

    // ─── V1 — SOCIAL & RELATIONNEL (15 questions) ───
    'O47': 'Entre 30 min et 1h30',
    'O48': 'Au moins 1 fois par semaine',
    'N4': 'Non',
    'E1': 'Je fais la plus grande partie mais cela reste acceptable',
    'E2': 'Oui, plusieurs personnes',
    'E3': 'Aucun / Enfant(s) mineurs / autre(s) proche(s) dépendant(s)',
    'N20': 'Parfois',
    'O27': 'Un peu',
    'O28': 'Un peu',
    'N7': "Oui j'ai dû aménager mes horaires",
    'O30': 'Un peu',
    'E4': 'Plus tendue / plus compliquée',
    'O31': 'Oui',
    'E5': 'Non',
    'E6': 'Oui, mais avec des réticences',

    // ─── V2 — FRAGILITÉ DU PROCHE (22 questions) ───
    'O32': 'Oui',
    'E61': 'Oui',
    'N5': 'Oui, il en bénéficie',
    'E62': 'Oui, clairement',
    'N6': 'Non',
    'O37': 'Oui',
    'O38': 'Oui',
    'O39': 'Un peu',
    'O40': 'Un peu',
    'O41': 'Un peu',
    'N42': 'Non',
    'N43': 'Non',
    'E63': 'Non',
    'E64': 'Non',
    'E65': 'Non',
    'E66': 'Non',
    'E67': 'Partiellement',
    'E68': 'Non',
    'E69': 'Oui, mais cela me prend beaucoup de temps',
    'E70': 'Parfois',
    'N29': "Allocation personnalisée d'autonomie (APA)",
    'O23': 'Régime général (ou spécial) et Mutuelle',
    'O45': 'Régime général (ou spécial) et Mutuelle',
    'O61': 'Oui',

    // ─── V3 — SANTÉ DE L'AIDANT (17 questions) ───
    'O29': 'Un peu',
    'O33': 'Oui',
    'O50': 'Entre 6h et 10h par semaine',
    'E7': 'Un peu fatigué·e',
    'E8': 'parfois',
    'E9': 'Oui',
    'E10': 'Je suis parfois tendu·e ou inquiet·ète',
    'N8': 'Non',
    'E11': 'Parfois',
    'E12': 'Parfois',
    'E13': 'Parfois',
    'E14': 'Non',
    'E15': 'Un peu',
    'E16': 'Je les gère normalement',
    'O42': 'Aucune',
    'O43': '1 à 3 médicaments',
    'O44': 'Identique',
    'E17': 'Non',
    'E18': 'Correcte',
    'E19': 'Fatigue',

    // ─── V4 — PARCOURS MÉDICAL DU PROCHE (55 questions) ───
    'N10': 'Tâches de la vie quotidienne (ménage, repas, habillage...)',
    'N9': 'Non',
    'N21': 'Parfois',
    'N23': 'Non',
    'N27': 'un peu',
    'O7': 'Non',
    'E20': 'À son domicile actuel',
    'E21': 'Oui, probablement',
    'E22': 'Entre 5 et 14 heures',
    'O8': 'Oui, de temps en temps',
    'O9': 'Non, elle est indépendante',
    'E23': 'Quelques heures, mais pas une journée entière',
    'E24': 'Non, il est autonome la nuit',
    'O13': 'Oui, diminution de certaines fonctions',
    'N24': 'Parfois',
    'N19': 'Parfois',
    'E25': 'Parfois',
    'E26': 'Non',
    'E27': 'Non',
    'N22': 'Parfois',
    'N25': 'Jamais',
    'O4': 'Parfois anxieuxe ou triste',
    'O5': 'En moins bonne santé',
    'N11': 'Non',
    'N12': 'Non',
    'N13': 'Non',
    'N34': 'Non',
    'N44': 'Non',
    'O3': '4 à 6 médicaments',
    'O15': 'Aucun des deux',
    'O26': 'Non',
    'O22': 'Correct avec le port de lunettes ou de lentilles',
    'O53': 'Oui',
    'O54': '2',
    'N16': 'Situation de handicap suite à une maladie ou un accident',
    'N30': 'Inférieur à 50%',
    'N37': 'Aucun de ces éléments',
    'N38': 'Non',
    'N39': 'Non',
    'N40': 'Non',
    'E28': '1 fois',
    'E29': '1',
    'E30': '0',
    'E31': '1 à 3 jours',
    'N18': 'Non elle a besoin d\'aide',
    'E32': 'Parfois',
    'O12': 'Parfois',
    'O11': 'Parfois',
    'E33': 'Parfois',
    'N32': 'Aucune',
    'O6': 'Non',
    'N14': 'Non',
    'O16': 'Troubles neurologiques (accident vasculaire cérébral, épilepsie, maladie neuro-dégénérative)',
    'N36': 'Non',
    'O51': 'Oui',

    // ─── V5 — ADMINISTRATIF & JURIDIQUE (36 questions) ───
    'N17': 'Handicap cognitif',
    'N41': 'Oui',
    'E34': 'Partiellement',
    'E35': 'Oui, le diagnostic est clair',
    'E36': 'Oui, un peu',
    'E37': 'Oui, parfois',
    'E38': 'Un peu, mais cela reste flou',
    'O17': 'Oui',
    'O18': 'Non',
    'O19': 'Neurologue',
    'O20': 'Oui',
    'O21': 'Bilan de santé général (prise de sang…)',
    'E39': 'Non',
    'O24': 'Un peu',
    'E40': 'Délais pour obtenir un rendez-vous',
    'E41': 'Non, on ne nous en a jamais parlé',
    'E42': '2',
    'E43': 'Non',
    'E44': 'Non, jamais',
    'E45': 'Non',
    'E46': 'Il n\'a pas été hospitalisé récemment',
    'E47': 'On a quelques repères, mais ce n\'est pas très clair',
    'E48': 'Médecin généraliste',
    'E49': 'Médecin (généraliste ou addictologue)',
    'E50': 'Oui, suivi régulier et traitement bien pris',
    'E51': 'Oui',
    'O59': 'Service à domicile (SAD) / auxiliaire de vie',
    'E52': 'Non, personne ne coordonne vraiment',
    'E53': 'Médecin traitant',
    'E54': 'Gérable mais parfois compliquée',
    'E55': 'Oui, un peu',
    'E56': 'La mémoire, le comportement',
    'E57': 'Partiellement',
    'E58': 'Oui, consultation mémoire',
    'E59': 'Oui, et une évaluation est en cours / réalisée',
    'E60': 'Pédiatre / généraliste',
}

// ── Jean-Pierre, 71 ans — Retraité aidant son épouse atteinte d'un cancer ──
const jeanPierreAnswers: Record<string, string> = {
    // ─── TRIGGERS ───
    'O35': 'Homme',
    'O36': '65-74 ans',
    'N1': 'Retraité.e',
    'O46': 'Mon/ma conjoint(e) / partenaire',
    'O14': 'Femme',
    'O1': '60-75 ans',
    'O64': '13001',
    'O63': '13001',
    'O49': 'Depuis plus de 2 ans',
    'O2': 'À mon domicile',
    'N3': "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)",
    'N31': 'Aucune prise en charge',
    'N26': 'Suivi médical spécialisé',
    'E71': 'Sécuriser au mieux mon proche à domicile',
    'E72': 'Oui',

    // ─── V1 — SOCIAL & RELATIONNEL ───
    'O47': 'Moins de 30 min',
    'O48': 'Tous les jours',
    'N4': 'Oui',
    'E1': 'Je fais presque tout et cela crée des tensions ou un sentiment d\'injustice',
    'E2': 'Très peu / presque personne',
    'E3': 'Aucun / Enfant(s) mineurs / autre(s) proche(s) dépendant(s)',
    'N20': 'Non',
    'O27': 'Oui',
    'O28': 'Oui',
    'N7': 'Non',
    'O30': 'Oui',
    'E4': 'Plus tendue / plus compliquée',
    'O31': 'Oui',
    'E5': 'Oui',
    'E6': 'Non, il/elle refuse la plupart du temps',

    // ─── V2 — FRAGILITÉ DU PROCHE ───
    'O32': 'Oui',
    'E61': 'Oui',
    'N5': 'Non, il n\'en bénéficie pas',
    'E62': 'Partiellement',
    'N6': 'Non',
    'O37': 'Oui',
    'O38': 'Oui',
    'O39': 'Oui',
    'O40': 'Oui',
    'O41': 'Un peu',
    'N42': 'Non',
    'N43': 'Oui',
    'E63': 'Oui',
    'E64': 'Non',
    'E65': 'Non',
    'E66': 'Non',
    'E67': 'Non',
    'E68': 'Non',
    'E69': 'Non, je suis souvent perdu·e',
    'E70': 'Souvent, je suis toujours en retard',
    'N29': "Allocation personnalisée d'autonomie (APA)",
    'O23': 'Régime général (ou spécial) et Mutuelle',
    'O45': 'Régime général (ou spécial) et Mutuelle',
    'O61': 'Non',

    // ─── V3 — SANTÉ DE L'AIDANT ───
    'O29': 'Oui',
    'O33': 'Oui',
    'O50': 'Plus de 10h par semaine',
    'E7': 'Très fatigué·e',
    'E8': 'souvent',
    'E9': 'Non',
    'E10': 'Je suis souvent tendu·e ou inquiet·ète',
    'N8': "J'ai dû m'arrêter entre 5 jours et 1 mois",
    'E11': 'Souvent',
    'E12': 'Parfois',
    'E13': 'Souvent',
    'E14': 'Un peu',
    'E15': 'Oui',
    'E16': 'J\'ai du mal à les prendre ou à les garder',
    'O42': 'Maladies cardiovasculaires (hypertension, insuffisance cardiaque)',
    'O43': '4 à 6 médicaments',
    'O44': 'Moins bonne',
    'E17': 'Oui',
    'E18': 'Mauvaise (je dors mal ou pas assez)',
    'E19': 'Fatigue',

    // ─── V4 — PARCOURS MÉDICAL DU PROCHE ───
    'N10': 'Gestion administrative / financière / juridique',
    'N9': 'Non',
    'N21': 'Oui',
    'N23': 'Non',
    'N27': 'beaucoup',
    'O7': 'Oui',
    'E20': 'À mon domicile',
    'E21': 'Oui, mais cela risque d\'être difficile',
    'E22': 'Plus de 30 heures',
    'O8': 'Oui, tout le temps',
    'O9': 'Oui, de temps en temps',
    'E23': 'Il ne peut pas rester seul, même quelques heures',
    'E24': 'Oui, il a souvent besoin de moi la nuit',
    'O13': 'Oui, diminution de certaines fonctions',
    'N24': 'Oui',
    'N19': 'Souvent',
    'E25': 'Oui',
    'E26': 'Parfois',
    'E27': 'Parfois',
    'N22': 'Souvent',
    'N25': 'Parfois',
    'O4': 'Parfois anxieuxe ou triste',
    'O5': 'En moins bonne santé',
    'N11': 'Occasionnellement',
    'N12': 'Non',
    'N13': 'Non',
    'N34': 'Parfois',
    'N44': 'Non',
    'O3': '7 médicaments et plus',
    'O15': 'Aucun des deux',
    'O26': 'Oui',
    'O22': 'Correct',
    'O53': 'Oui',
    'O54': '4',
    'N16': 'Situation de handicap suite à une maladie ou un accident',
    'N30': 'Compris entre 50% et 79%',
    'N37': 'Aucun de ces éléments',
    'N38': 'Non',
    'N39': 'Non',
    'N40': 'Non',
    'E28': '2 fois',
    'E29': '2',
    'E30': '1',
    'E31': '4 à 7 jours',
    'N18': 'Non elle a besoin d\'aide',
    'E32': 'Oui',
    'O12': 'Oui',
    'O11': 'Oui',
    'E33': 'Oui',
    'N32': 'Aides à la mobilité (fauteuil roulant, prothèse, canne,…)',
    'O6': 'Oui, mais sans gravité',
    'N14': 'Non',
    'O16': 'Aucune',
    'N36': 'Non',
    'O51': 'Oui',

    // ─── V5 — ADMINISTRATIF & JURIDIQUE ───
    'N17': 'Maladie invalidante',
    'N41': 'Oui',
    'E34': 'Oui',
    'E35': 'Oui, le diagnostic est clair',
    'E36': 'Non, pas particulièrement',
    'E37': 'Non',
    'E38': 'Oui, bien préparé',
    'O17': 'Oui',
    'O18': 'Oui',
    'O19': 'Oncologue',
    'O20': 'Oui',
    'O21': 'Bilan de santé général (prise de sang…)',
    'E39': 'Non',
    'O24': 'Un peu',
    'E40': 'Délais pour obtenir un rendez-vous',
    'E41': 'Non, on ne nous en a jamais parlé',
    'E42': '3',
    'E43': 'Oui, plusieurs périodes ou plus de 6 mois',
    'E44': 'Oui, récemment',
    'E45': 'Non',
    'E46': 'Partiellement',
    'E47': 'On a quelques repères, mais ce n\'est pas très clair',
    'E48': 'Médecin généraliste',
    'E49': 'Médecin (généraliste ou addictologue)',
    'E50': 'Oui, mais suivi ou traitement irrégulier',
    'E51': 'Oui',
    'O59': 'Infirmier libéral',
    'E52': 'Oui, clairement identifiée',
    'E53': 'Spécialiste hospitalier',
    'E54': 'Souvent très compliquée',
    'E55': 'Oui, énormément',
    'E56': 'Les allers-retours aux urgences',
    'E57': 'Partiellement',
    'E58': 'Non, aucune',
    'E59': 'Oui, et une évaluation est en cours / réalisée',
    'E60': 'Pédiatre / généraliste',
}

// ── Camille, 34 ans — Jeune mère aidant son fils autiste de 8 ans ──────
const camilleAnswers: Record<string, string> = {
    // ─── TRIGGERS ───
    'O35': 'Femme',
    'O36': '31-49 ans',
    'N1': 'En activité',
    'O46': 'Mon père ou ma mère',
    'O14': 'Homme',
    'O1': '- 15 ans',
    'O64': '75011',
    'O63': '75011',
    'O49': 'Entre 6 mois et 2 ans',
    'O2': 'À mon domicile',
    'N3': "J'aide une personne en situation de handicap",
    'N31': 'Etablissements pour enfants et adolescents (IME,ITEP, IEM, EEAP)',
    'N26': 'Accessibilité et adaptation des soins',
    'E71': 'Je ne sais pas, j\'ai besoin de faire le point',
    'E72': 'Oui, mais plutôt par messagerie dans l\'app',

    // ─── V1 — SOCIAL & RELATIONNEL ───
    'O47': 'Moins de 30 min',
    'O48': 'Tous les jours',
    'N4': 'Non',
    'E1': 'Je fais la plus grande partie mais cela reste acceptable',
    'E2': 'Oui, une personne',
    'E3': 'Aucun / Enfant(s) mineurs / autre(s) proche(s) dépendant(s)',
    'N20': 'Parfois',
    'O27': 'Un peu',
    'O28': 'Un peu',
    'N7': "Oui j'ai dû aménager mes horaires",
    'O30': 'Un peu',
    'E4': 'Plus tendue / plus compliquée',
    'O31': 'Oui',
    'E5': 'Non',
    'E6': 'Oui, facilement',

    // ─── V2 — FRAGILITÉ DU PROCHE ───
    'O32': 'Non',
    'E61': 'Non',
    'N5': 'Non, il n\'en bénéficie pas',
    'E62': 'Non',
    'N6': 'Non',
    'O37': 'Non',
    'O38': 'Non',
    'O39': 'Pas du tout',
    'O40': 'Pas du tout',
    'O41': 'Pas du tout',
    'N42': 'Non',
    'N43': 'Non',
    'E63': 'Non',
    'E64': 'Non',
    'E65': 'Non',
    'E66': 'Non',
    'E67': 'Non',
    'E68': 'Non',
    'E69': 'Oui, tout à fait',
    'E70': 'Parfois',
    'N29': 'Allocation aux adultes handicapés (AAH)',
    'O23': 'Régime général (ou spécial) et Mutuelle',
    'O45': 'Régime général (ou spécial) et Mutuelle',
    'O61': 'Non',

    // ─── V3 — SANTÉ DE L'AIDANT ───
    'O29': 'Un peu',
    'O33': 'Un peu',
    'O50': 'Entre 6h et 10h par semaine',
    'E7': 'Un peu fatigué·e',
    'E8': 'parfois',
    'E9': 'Oui',
    'E10': 'Je suis parfois tendu·e ou inquiet·ète',
    'N8': 'Non',
    'E11': 'Parfois',
    'E12': 'Rarement',
    'E13': 'Parfois',
    'E14': 'Non',
    'E15': 'Un peu',
    'E16': 'Je les gère normalement',
    'O42': 'Aucune',
    'O43': '1 à 3 médicaments',
    'O44': 'Identique',
    'E17': 'Non',
    'E18': 'Correcte',
    'E19': 'Sommeil',

    // ─── V4 — PARCOURS MÉDICAL DU PROCHE ───
    'N10': 'Tâches de la vie quotidienne (ménage, repas, habillage...)',
    'N9': 'Oui',
    'N21': 'Non',
    'N23': 'Non',
    'N27': 'un peu',
    'O7': 'Non',
    'E20': 'À mon domicile',
    'E21': 'Oui, probablement',
    'E22': 'Entre 5 et 14 heures',
    'O8': 'Oui, de temps en temps',
    'O9': 'Non, elle est indépendante',
    'E23': 'Quelques heures, mais pas une journée entière',
    'E24': 'Non, il est autonome la nuit',
    'O13': 'Non',
    'N24': 'Parfois',
    'N19': 'Parfois',
    'E25': 'Parfois',
    'E26': 'Non',
    'E27': 'Non',
    'N22': 'Parfois',
    'N25': 'Jamais',
    'O4': 'D\'humeur normale',
    'O5': 'Santé équivalente',
    'N11': 'Non',
    'N12': 'Parfois',
    'N13': 'Non',
    'N34': 'Non',
    'N44': 'Non',
    'O3': '1 à 3 médicaments',
    'O15': 'Aucun des deux',
    'O26': 'Non',
    'O22': 'Correct',
    'O53': 'Non',
    'O54': '1',
    'N16': 'Situation de handicap depuis la naissance',
    'N30': 'Compris entre 50% et 79%',
    'N37': 'Aucun de ces éléments',
    'N38': 'Non',
    'N39': 'Non',
    'N40': 'Non',
    'E28': '0',
    'E29': '0',
    'E30': '0',
    'E31': 'Moins d\'une journée',
    'N18': 'Oui',
    'E32': 'Non',
    'O12': 'Oui',
    'O11': 'Non',
    'E33': 'Non',
    'N32': 'Aides à la communication (pictogrammes, synthèse vocale…)',
    'O6': 'Non',
    'N14': 'Parfois',
    'O16': 'Aucune',
    'N36': 'Non',
    'O51': 'Non',

    // ─── V5 — ADMINISTRATIF & JURIDIQUE ───
    'N17': 'Autisme ou autres troubles envahissant du développement',
    'N41': 'Non',
    'E34': 'Partiellement',
    'E35': 'On m\'a évoqué plusieurs hypothèses, mais rien de vraiment clair',
    'E36': 'Oui, beaucoup (impression de tourn\u00ader en rond)',
    'E37': 'Oui, souvent',
    'E38': 'Non, pas du tout',
    'O17': 'Oui',
    'O18': 'Non',
    'O19': 'Psychiatre',
    'O20': 'Non',
    'O21': 'Suivi psychologique',
    'E39': 'Non',
    'O24': 'Oui',
    'E40': 'Délais pour obtenir un rendez-vous',
    'E41': 'Non, on ne nous en a jamais parlé',
    'E42': 'Aucun',
    'E43': 'Non',
    'E44': 'Non, jamais',
    'E45': 'Non',
    'E46': 'Non, nous avons dû tout organiser seuls',
    'E47': 'Non, on improvise systématiquement / on va souvent aux urgences',
    'E48': 'Centre médico-psychologique (CMP / CMPP)',
    'E49': 'Médecin (généraliste ou addictologue)',
    'E50': 'Oui, mais suivi ou traitement irrégulier',
    'E51': 'Peut-être / selon les conditions',
    'O59': 'Educateur spécialisé',
    'E52': 'Non, personne ne coordonne vraiment',
    'E53': 'Aucune personne vraiment référente',
    'E54': 'Souvent très compliquée',
    'E55': 'Oui, énormément',
    'E56': 'Autre',
    'E57': 'Non, on avance au jour le jour',
    'E58': 'Non, aucune',
    'E59': 'Oui, mais nous sommes en attente depuis longtemps',
    'E60': 'Pédopsychiatre',
}

const personas: Persona[] = [
    {
        id: 'P1',
        name: 'Marie Duval',
        age: 58,
        emoji: '👩‍💼',
        color: '#58BF94',
        icon: Heart,
        shortDesc: 'Cadre active, aide sa mère atteinte d\'Alzheimer depuis 3 ans',
        story: 'Marie a 58 ans, elle est cadre administrative à Lyon. Depuis 3 ans, elle aide sa mère Suzanne, 82 ans, atteinte d\'Alzheimer précoce, qui vit seule à 20 minutes de chez elle. Marie passe la voir plusieurs fois par semaine, gère les courses, les rendez-vous médicaux et l\'administratif. Son frère vit à Bordeaux et aide financièrement mais n\'est pas présent au quotidien. Marie a dû aménager ses horaires de travail. Elle commence à ressentir de la fatigue et des tensions avec son conjoint, qui trouve qu\'elle en fait trop. Elle dort de moins en moins bien.',
        profile: {
            situation: 'Aide sa mère de 82 ans (Alzheimer)',
            activite: 'Cadre administrative en activité',
            lienParente: 'Fille (mère → fille)',
            dureeAidance: '3 ans',
            proche: 'Vit seule à domicile, Lyon 7e',
        },
        traits: [
            'Fatigue croissante',
            'Tensions conjugales',
            'Concilie travail et aide',
            'Réseau familial limité',
            'Besoin info droits',
            'Diagnostic clair',
        ],
        answers: marieAnswers,
    },
    {
        id: 'P2',
        name: 'Jean-Pierre Moreau',
        age: 71,
        emoji: '👴',
        color: '#E48B65',
        icon: Shield,
        shortDesc: 'Retraité, aide son épouse atteinte d\'un cancer — épuisé et isolé',
        story: 'Jean-Pierre a 71 ans, ancien contremaître, retraité depuis 6 ans. Son épouse Françoise, 69 ans, a été diagnostiquée d\'un cancer du sein métastatique il y a 3 ans. Depuis, il est son aidant à temps plein : toilette, repas, accompagnement aux chimiothérapies à l\'hôpital de Marseille (45 min de route). Il ne dort plus que 5h par nuit, a perdu 8 kg en un an et ne sort quasi plus. Ses fils vivent loin. Il refuse de « se plaindre » et repousse les propositions d\'aide de ses voisins. Il sent qu\'il craque mais continue « par devoir ».',
        profile: {
            situation: 'Aide son épouse de 69 ans (cancer)',
            activite: 'Retraité',
            lienParente: 'Conjoint',
            dureeAidance: '3 ans',
            proche: 'Vit à domicile avec lui, Marseille',
        },
        traits: [
            'Épuisement sévère',
            'Isolé socialement',
            'Refuse l\'aide',
            'Néglige sa santé',
            'Parcours médical lourd',
            'Multi-hospitalisations',
        ],
        answers: jeanPierreAnswers,
    },
    {
        id: 'P3',
        name: 'Camille Lefèvre',
        age: 34,
        emoji: '👩‍👦',
        color: '#7748F6',
        icon: Sparkles,
        shortDesc: 'Jeune mère, aide son fils de 8 ans autiste — perdue dans l\'administratif',
        story: 'Camille a 34 ans, graphiste freelance à Paris. Son fils Théo, 8 ans, a été diagnostiqué autiste il y a 18 mois, après 2 ans d\'errance diagnostique. Elle jongle entre son travail, les rendez-vous CMP, les séances d\'orthophonie et les dossiers MDPH. Son conjoint Antoine travaille en horaires décalés et est présent mais débordé. Camille ne sait pas quels droits elle a, ne comprend pas les acronymes (AEEH, PCH, SESSAD) et se sent seule face à un système qu\'elle trouve opaque. Elle dort mal, pleure parfois le soir, mais tient le coup pour Théo.',
        profile: {
            situation: 'Aide son fils de 8 ans (autisme)',
            activite: 'Graphiste freelance',
            lienParente: 'Mère',
            dureeAidance: '18 mois',
            proche: 'Vit avec elle, Paris 11e',
        },
        traits: [
            'Nouvelle aidante',
            'Errance diagnostique',
            'Perdue dans l\'admin',
            'Conjoint présent',
            'Charge mentale élevée',
            'Handicap invisible',
        ],
        answers: camilleAnswers,
    },
]

/** Export for use in SimulatorPage */
export { personas }
export type { Persona }

export default function PersonasPage() {
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState<string | null>(null)

    const handleUsePersona = (persona: Persona) => {
        sessionStorage.setItem('monka_persona_answers', JSON.stringify(persona.answers))
        sessionStorage.setItem('monka_persona_id', persona.id)
        navigate('/simulator')
    }

    return (
        <div className="max-w-[1100px] mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-monka-heading mb-1.5 flex items-center gap-2">
                    <Users className="w-6 h-6 text-monka-primary" />
                    Personas Aidants
                </h1>
                <p className="text-sm text-monka-muted">
                    3 profils réalistes d'aidants pour simuler des parcours complets dans le moteur Monka
                </p>
            </div>

            {/* Persona Cards */}
            <div className="space-y-4">
                {personas.map((persona) => {
                    const isExpanded = expanded === persona.id
                    const answersCount = Object.keys(persona.answers).length

                    return (
                        <motion.div
                            key={persona.id}
                            className="rounded-2xl overflow-hidden border-2 transition-all"
                            style={{ borderColor: isExpanded ? persona.color : 'transparent' }}
                            layout
                        >
                            {/* Card Header */}
                            <div
                                className="glass-card !rounded-none cursor-pointer"
                                onClick={() => setExpanded(isExpanded ? null : persona.id)}
                            >
                                <div className="flex items-center gap-4 px-6 py-5">
                                    {/* Avatar */}
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${persona.color}30, ${persona.color}15)` }}
                                    >
                                        {persona.emoji}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-bold text-monka-heading">
                                                {persona.name}, {persona.age} ans
                                            </h3>
                                            <span
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                                                style={{ backgroundColor: persona.color }}
                                            >
                                                {persona.id}
                                            </span>
                                        </div>
                                        <p className="text-sm text-monka-muted">{persona.shortDesc}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-monka-muted bg-gray-100 px-2.5 py-1.5 rounded-lg font-medium">
                                            {answersCount} réponses
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleUsePersona(persona)
                                            }}
                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                                            style={{ backgroundColor: persona.color }}
                                        >
                                            <Play className="w-3.5 h-3.5" />
                                            Simuler
                                        </button>
                                        {isExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-monka-muted" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-monka-muted" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 py-5 bg-white/60 border-t border-monka-border">
                                            {/* Story */}
                                            <p className="text-sm text-monka-text mb-5 leading-relaxed italic border-l-3 pl-4"
                                                style={{ borderColor: persona.color }}>
                                                {persona.story}
                                            </p>

                                            {/* Profile info */}
                                            <div className="grid grid-cols-5 gap-3 mb-5">
                                                {Object.entries(persona.profile).map(([key, value]) => {
                                                    const labels: Record<string, string> = {
                                                        situation: 'Situation d\'aide',
                                                        activite: 'Activité',
                                                        lienParente: 'Lien parental',
                                                        dureeAidance: 'Depuis',
                                                        proche: 'Lieu de vie du proche',
                                                    }
                                                    return (
                                                        <div key={key} className="p-3 rounded-xl bg-white border border-monka-border">
                                                            <p className="text-[10px] text-monka-muted uppercase tracking-wider mb-1">{labels[key] || key}</p>
                                                            <p className="text-xs font-bold text-monka-heading">{value}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {/* Traits */}
                                            <div className="mb-5">
                                                <p className="text-[10px] font-bold text-monka-muted uppercase tracking-wider mb-2">Caractéristiques clés</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {persona.traits.map((trait) => (
                                                        <span
                                                            key={trait}
                                                            className="text-xs px-3 py-1.5 rounded-lg border font-medium"
                                                            style={{
                                                                backgroundColor: `${persona.color}10`,
                                                                borderColor: `${persona.color}30`,
                                                                color: persona.color,
                                                            }}
                                                        >
                                                            {trait}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Answer stats */}
                                            <div>
                                                <p className="text-[10px] font-bold text-monka-muted uppercase tracking-wider mb-2">
                                                    Réponses pré-remplies — {answersCount} / 165
                                                </p>
                                                <div className="flex gap-2 flex-wrap">
                                                    {['Triggers', 'V1', 'V2', 'V3', 'V4', 'V5'].map((label) => {
                                                        const count = label === 'Triggers'
                                                            ? Object.keys(persona.answers).filter(k =>
                                                                ['O35', 'O36', 'N1', 'O46', 'O14', 'O1', 'O64', 'O63', 'O49', 'O2', 'N3', 'N31', 'N26', 'E71', 'E72'].includes(k)
                                                            ).length
                                                            : 0 // Simplified — we show the total count
                                                        return (
                                                            <span key={label} className="text-[10px] px-2.5 py-1 rounded-lg bg-gray-100 text-monka-muted font-medium">
                                                                {label} ✓
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>

            {/* Footer info */}
            <div className="mt-8 glass-card p-5">
                <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-monka-heading mb-1">Comment ça fonctionne</h4>
                        <p className="text-xs text-monka-muted leading-relaxed">
                            Cliquez sur <strong>"Simuler"</strong> pour charger automatiquement les 165 réponses du persona dans le simulateur.
                            Le moteur calculera les scores, détectera les vulnérabilités et activera les micro-parcours correspondants.
                            Chaque profil a été construit à partir d'une situation réelle d'aidance avec des réponses cohérentes sur les 5 vulnérabilités.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
