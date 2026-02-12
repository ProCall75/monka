// Real questions extracted from KERNEL templates
// This will be replaced by simulator_data.json loading in Phase 4

import type { VulnerabilityId } from './types'

export interface QuestionData {
    id: string
    text: string
    category: 'etat' | 'facteur' | 'trigger'
    scoring: 'scorante' | 'non_scorante'
    options: string[]
    mp?: string
    vuln: VulnerabilityId
}

// V1 — Social & Relationnel (15 questions, 8 scorantes)
const v1Questions: QuestionData[] = [
    { id: 'E1', text: "Comment est répartie l'aide dans votre entourage ?", category: 'etat', scoring: 'scorante', options: ['Répartition équilibrée', 'Je fais la plus grande partie', 'Je fais presque tout / seul·e'], mp: 'R2', vuln: 'V1' },
    { id: 'E2', text: "En cas de coup dur, avez-vous des personnes mobilisables ?", category: 'etat', scoring: 'scorante', options: ['Oui, plusieurs', 'Oui, une personne', 'Très peu / personne'], mp: 'R2', vuln: 'V1' },
    { id: 'E4', text: "Comment a évolué votre relation avec la personne aidée ?", category: 'etat', scoring: 'scorante', options: ['Relation renforcée / similaire', 'Relation plus tendue / difficile'], mp: 'R3', vuln: 'V1' },
    { id: 'O19', text: "Pensez-vous que vos amis / famille comprennent votre situation ?", category: 'etat', scoring: 'scorante', options: ['Oui, tout à fait', 'Partiellement', 'Non, pas du tout'], mp: 'R3', vuln: 'V1' },
    { id: 'O20', text: "Au cours du mois dernier, avez-vous eu des contacts réguliers avec vos proches ?", category: 'etat', scoring: 'scorante', options: ['Oui, hebdomadaires', 'Quelques fois', 'Rarement / Aucun'], mp: 'R3', vuln: 'V1' },
    { id: 'O27', text: "Vous occuper de la personne aidée entraîne-t-il des difficultés dans votre vie familiale ?", category: 'facteur', scoring: 'scorante', options: ['Non', 'Oui'], mp: 'R1', vuln: 'V1' },
    { id: 'O28', text: "Cela entraîne-t-il des difficultés dans vos relations amicales, loisirs ou travail ?", category: 'facteur', scoring: 'scorante', options: ['Non', 'Oui'], mp: 'R1', vuln: 'V1' },
    { id: 'N7', text: "Avez-vous dû aménager votre activité professionnelle pour votre rôle d'aidant ?", category: 'facteur', scoring: 'scorante', options: ['Non', 'Aménagement horaires', 'Congés', 'Arrêt total'], mp: 'R1', vuln: 'V1' },
    { id: 'E8', text: "Avez-vous quelqu'un à qui parler de vos difficultés d'aidant ?", category: 'etat', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'R3', vuln: 'V1' },
    { id: 'E9', text: "Avez-vous connaissance de groupes de soutien ou associations d'aidants ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui et j\'y participe', 'Oui mais je n\'y vais pas', 'Non'], mp: 'R4', vuln: 'V1' },
    { id: 'E10', text: "Bénéficiez-vous d'aide professionnelle (aide à domicile, infirmier...) ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui, suffisante', 'Oui, insuffisante', 'Non'], mp: 'R4', vuln: 'V1' },
    { id: 'E11', text: "Avez-vous envisagé un hébergement temporaire ou un accueil de jour ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui, c\'est en place', 'Oui, en réflexion', 'Non'], mp: 'R4', vuln: 'V1' },
    { id: 'T1', text: "Avez-vous exprimé un sentiment de solitude récemment ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'R3', vuln: 'V1' },
    { id: 'T2', text: "Avez-vous ressenti de la colère ou de la frustration liée à votre rôle ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'R1', vuln: 'V1' },
    { id: 'T3', text: "Avez-vous envisagé d'abandonner votre rôle d'aidant ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'R2', vuln: 'V1' },
]

// V2 — Fragilité du Proche (~32 questions, 11 scorantes)
const v2Questions: QuestionData[] = [
    { id: 'O7', text: "Avez-vous observé des changements alimentaires chez la personne aidée ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Oui', 'Oui et dénutrition'], mp: 'F1', vuln: 'V2' },
    { id: 'O13', text: "Y a-t-il une détérioration des fonctions cognitives ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Diminution partielle', 'Fonctions totalement altérées'], mp: 'F2', vuln: 'V2' },
    { id: 'N24', text: "La personne aidée présente-t-elle des troubles de mémoire ou concentration ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Parfois', 'Oui'], mp: 'F2', vuln: 'V2' },
    { id: 'E25', text: "Y a-t-il de la confusion jour/nuit chez la personne aidée ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Parfois', 'Oui'], mp: 'F2', vuln: 'V2' },
    { id: 'N26', text: "La personne aidée a-t-elle des troubles du comportement ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Parfois', 'Oui, quotidiens'], mp: 'F2', vuln: 'V2' },
    { id: 'E14', text: "La personne aidée est-elle continente ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'Partiellement', 'Non'], mp: 'F3', vuln: 'V2' },
    { id: 'E15', text: "La personne aidée peut-elle se déplacer seule ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'Avec aide partielle', 'Non, totalement dépendante'], mp: 'F3', vuln: 'V2' },
    { id: 'E16', text: "La personne aidée a-t-elle besoin d'aide pour la toilette ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Partiellement', 'Oui, totalement'], mp: 'F3', vuln: 'V2' },
    { id: 'E17', text: "La personne aidée a-t-elle besoin d'aide pour s'habiller ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Partiellement', 'Oui, totalement'], mp: 'F3', vuln: 'V2' },
    { id: 'N29', text: "La personne aidée est-elle sujette à des chutes ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Oui, parfois', 'Oui, fréquemment'], mp: 'F3', vuln: 'V2' },
    { id: 'O30', text: "La personne aidée a-t-elle été hospitalisée récemment ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Oui'], mp: 'F1', vuln: 'V2' },
    { id: 'F18', text: "Le domicile est-il adapté au niveau de dépendance ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui', 'Partiellement', 'Non'], mp: 'F3', vuln: 'V2' },
    { id: 'F19', text: "Y a-t-il des aides techniques en place (barres d'appui, fauteuil...) ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui, adaptées', 'Partiellement', 'Non'], mp: 'F3', vuln: 'V2' },
    { id: 'T4', text: "La personne aidée a-t-elle eu un épisode aigu récent (chute grave, fugue...) ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'F1', vuln: 'V2' },
    { id: 'T5', text: "Avez-vous le sentiment que la situation se dégrade rapidement ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'F1', vuln: 'V2' },
]

// V3 — Santé de l'Aidant
const v3Questions: QuestionData[] = [
    { id: 'E32', text: "Comment évaluez-vous votre état de santé général ?", category: 'etat', scoring: 'scorante', options: ['Bon', 'Moyen', 'Mauvais'], mp: 'S1', vuln: 'V3' },
    { id: 'E33', text: "Avez-vous des problèmes de sommeil liés à votre rôle d'aidant ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Parfois', 'Oui, régulièrement'], mp: 'S1', vuln: 'V3' },
    { id: 'E34', text: "Avez-vous ressenti un épuisement physique ces dernières semaines ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Parfois', 'Oui, souvent'], mp: 'S1', vuln: 'V3' },
    { id: 'O35', text: "Avez-vous consulté un médecin pour vous-même au cours des 12 derniers mois ?", category: 'etat', scoring: 'scorante', options: ['Oui, suivi régulier', 'Oui, ponctuellement', 'Non, je n\'ai pas le temps'], mp: 'S2', vuln: 'V3' },
    { id: 'E36', text: "Avez-vous des douleurs chroniques (dos, articulations...) ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Oui, gérées', 'Oui, non traitées'], mp: 'S1', vuln: 'V3' },
    { id: 'N37', text: "Avez-vous ressenti une anxiété ou une dépression liée à l'aide ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Parfois', 'Oui, fréquemment'], mp: 'S2', vuln: 'V3' },
    { id: 'E38', text: "Avez-vous réduit vos activités de loisirs ou de détente ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Un peu', 'Beaucoup'], mp: 'S1', vuln: 'V3' },
    { id: 'O39', text: "Prenez-vous vos médicaments ou suivez-vous votre propre traitement régulièrement ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'Parfois j\'oublie', 'Non, je néglige ma santé'], mp: 'S2', vuln: 'V3' },
    { id: 'E40', text: "Avez-vous perdu ou pris du poids de manière significative ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Un peu', 'Oui, significativement'], mp: 'S1', vuln: 'V3' },
    { id: 'F41', text: "Avez-vous accès à un soutien psychologique ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui', 'Non mais j\'aimerais', 'Non'], mp: 'S2', vuln: 'V3' },
    { id: 'T7', text: "Avez-vous eu un malaise, une chute ou un problème de santé récent ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'S1', vuln: 'V3' },
    { id: 'T8', text: "Avez-vous eu des idées noires ou un sentiment de désespoir ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'S2', vuln: 'V3' },
]

// V4 — Parcours Médical
const v4Questions: QuestionData[] = [
    { id: 'E42', text: "La personne aidée a-t-elle un médecin traitant identifié ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'En cours de recherche', 'Non'], mp: 'M1', vuln: 'V4' },
    { id: 'O43', text: "Le parcours de soins est-il fluide (RDV, coordinations entre pro) ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'Quelques difficultés', 'Non, très compliqué'], mp: 'M1', vuln: 'V4' },
    { id: 'E44', text: "Avez-vous un interlocuteur médical unique pour coordonner les soins ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'Partiellement', 'Non, je gère tout seul·e'], mp: 'M1', vuln: 'V4' },
    { id: 'O45', text: "La personne aidée a-t-elle bénéficié d'une évaluation gériatrique ?", category: 'etat', scoring: 'scorante', options: ['Oui, récente', 'Oui, ancienne', 'Non'], mp: 'M2', vuln: 'V4' },
    { id: 'E46', text: "Comprenez-vous bien la maladie et son évolution ?", category: 'etat', scoring: 'scorante', options: ['Oui, bien informé·e', 'Partiellement', 'Non, je suis perdu·e'], mp: 'M2', vuln: 'V4' },
    { id: 'N47', text: "La personne aidée suit-elle un traitement médicamenteux complexe ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Oui, gérable', 'Oui, difficile à gérer'], mp: 'M1', vuln: 'V4' },
    { id: 'E48', text: "Y a-t-il eu des incidents liés au traitement (erreurs, oublis...) ?", category: 'etat', scoring: 'scorante', options: ['Jamais', 'Parfois', 'Oui, régulièrement'], mp: 'M1', vuln: 'V4' },
    { id: 'F49', text: "Avez-vous accès à de l'information médicale fiable sur la maladie ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui', 'Partiellement', 'Non'], mp: 'M2', vuln: 'V4' },
    { id: 'F50', text: "Y a-t-il un plan de soins formalisé et partagé ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui', 'En cours', 'Non'], mp: 'M1', vuln: 'V4' },
    { id: 'T9', text: "Y a-t-il eu un changement de diagnostic ou d'équipe soignante récent ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'M1', vuln: 'V4' },
]

// V5 — Administratif & Juridique
const v5Questions: QuestionData[] = [
    { id: 'E51', text: "Les démarches administratives liées à l'aide sont-elles à jour (APA, MDPH...) ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'En partie', 'Non ou en attente'], mp: 'A1', vuln: 'V5' },
    { id: 'O52', text: "Y a-t-il une protection juridique en place (tutelle, curatelle, mandat) ?", category: 'etat', scoring: 'scorante', options: ['Oui, en place', 'En cours', 'Non et nécessaire', 'Non, pas nécessaire'], mp: 'A2', vuln: 'V5' },
    { id: 'E53', text: "Connaissez-vous les aides financières auxquelles vous avez droit ?", category: 'etat', scoring: 'scorante', options: ['Oui, bien informé·e', 'Vaguement', 'Non, pas du tout'], mp: 'A1', vuln: 'V5' },
    { id: 'O54', text: "Le coût du maintien à domicile est-il soutenable pour vous ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'Difficile mais gérable', 'Non, insoutenable'], mp: 'A1', vuln: 'V5' },
    { id: 'E55', text: "Avez-vous des difficultés à joindre les bons interlocuteurs administratifs ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Parfois', 'Oui, régulièrement'], mp: 'A1', vuln: 'V5' },
    { id: 'N56', text: "Les directives anticipées de la personne aidée sont-elles rédigées ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'En cours', 'Non'], mp: 'A2', vuln: 'V5' },
    { id: 'E57', text: "Le patrimoine et les volontés de la personne aidée sont-ils documentés ?", category: 'etat', scoring: 'scorante', options: ['Oui', 'Partiellement', 'Non'], mp: 'A2', vuln: 'V5' },
    { id: 'O58', text: "Avez-vous eu des difficultés avec des institutions (Sécu, impôts...) ?", category: 'etat', scoring: 'scorante', options: ['Non', 'Oui, résolues', 'Oui, en cours'], mp: 'A1', vuln: 'V5' },
    { id: 'F59', text: "Avez-vous été accompagné·e par un·e assistante sociale ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui', 'Non mais j\'aimerais', 'Non'], mp: 'A1', vuln: 'V5' },
    { id: 'F60', text: "Connaissez-vous les structures d'à côté qui peuvent vous aider (CLIC, MAIA, DAC) ?", category: 'facteur', scoring: 'non_scorante', options: ['Oui', 'Vaguement', 'Non'], mp: 'A1', vuln: 'V5' },
    { id: 'T10', text: "Y a-t-il un changement administratif récent (fin de droit, renouvellement...) ?", category: 'trigger', scoring: 'non_scorante', options: ['Oui', 'Non'], mp: 'A1', vuln: 'V5' },
]

const allQuestionsByV: Record<VulnerabilityId, QuestionData[]> = {
    V1: v1Questions,
    V2: v2Questions,
    V3: v3Questions,
    V4: v4Questions,
    V5: v5Questions,
}

export function getQuestionsForV(v: VulnerabilityId): QuestionData[] {
    return allQuestionsByV[v] || []
}

export function getAllQuestions(): QuestionData[] {
    return Object.values(allQuestionsByV).flat()
}

// MP name mapping
export const mpNames: Record<string, string> = {
    // V1
    R1: 'Impact vie perso/pro',
    R2: 'Soutien entourage',
    R3: 'Qualité relationnelle',
    R4: 'Ressources & orientation',
    // V2
    F1: 'Fragilité générale',
    F2: 'Fonctions cognitives',
    F3: 'Autonomie physique',
    // V3
    S1: 'Santé physique aidant',
    S2: 'Santé mentale aidant',
    // V4
    M1: 'Coordination soins',
    M2: 'Information médicale',
    // V5
    A1: 'Droits & démarches',
    A2: 'Protection juridique',
}
