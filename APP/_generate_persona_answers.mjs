/**
 * Generates persona answer sets for all 8 Monka personas.
 * Each answer is chosen from actual response_options in Supabase.
 * Outputs a TS file importable directly by PersonasPage.
 */
import { readFileSync, writeFileSync } from 'fs';

const questions = JSON.parse(readFileSync('_questions_ref.json', 'utf8'));

// ═══════════════════════════════════════════════════════
//  PERSONA PROFILES — used to decide answers
// ═══════════════════════════════════════════════════════

const PERSONAS = {
    // ── P1: Marie — Perte autonomie, mère Alzheimer 82 ans ──
    P1: {
        n3: "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative",
        o1: '+75 ans',
        profile: 'cadre_active_fatigue_moderee',
        traits: { fatigue: 'moderee', isolement: 'leger', admin: 'moyenne', sante: 'correct', duree: '3ans' },
    },
    // ── P3: Camille — Handicap, fils 8 ans autiste ──
    P3: {
        n3: "J'aide une personne en situation de handicap",
        o1: '- 15 ans',
        profile: 'jeune_mere_nouvelle_aidante',
        traits: { fatigue: 'moderee', isolement: 'leger', admin: 'perdue', sante: 'correct', duree: '18mois' },
    },
    // ── P2: Jean-Pierre — Maladie chronique, épouse cancer 69 ans ──
    P2: {
        n3: "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)",
        o1: '60-75 ans',
        profile: 'retraite_epuise_isole',
        traits: { fatigue: 'severe', isolement: 'fort', admin: 'perdu', sante: 'degrade', duree: '3ans' },
    },
    // ── P4: Sophie — Troubles psy, frère schizophrène 42 ans ──
    P4: {
        n3: "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        o1: '20-60 ans',
        profile: 'enseignante_aidante_longue_duree',
        traits: { fatigue: 'moderee', isolement: 'moyen', admin: 'debrouille', sante: 'correct', duree: '20ans' },
    },
    // ── P5: Patrick — Addictions, fils 35 ans alcoolodépendant ──
    P5: {
        n3: "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)",
        o1: '20-60 ans',
        profile: 'retraite_honteux_codependant',
        traits: { fatigue: 'moderee_haute', isolement: 'fort', admin: 'moyenne', sante: 'a_risque', duree: '15ans' },
    },
    // ── C1: Nadia — Perte autonomie + Psy, mère AVC+dépression 68 ans ──
    C1: {
        n3: "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative",
        n3_multi: "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        o1: '60-75 ans',
        profile: 'aide_soignante_double_charge',
        traits: { fatigue: 'severe', isolement: 'moyen', admin: 'debrouille', sante: 'fragile', duree: '2ans' },
    },
    // ── C2: Thomas — Handicap + Psy, sœur IMC+bipolaire 28 ans ──
    C2: {
        n3: "J'aide une personne en situation de handicap",
        n3_multi: "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        o1: '20-60 ans',
        profile: 'jeune_ingenieur_reference_familiale',
        traits: { fatigue: 'moderee_haute', isolement: 'moyen', admin: 'surcharge_mdph', sante: 'correct', duree: '5ans' },
    },
    // ── C3: Martine — Maladie chro + Addiction, mari cancer+alcool 58 ans ──
    C3: {
        n3: "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)",
        n3_multi: "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)",
        o1: '20-60 ans',
        profile: 'commercante_tabou_isolee',
        traits: { fatigue: 'severe', isolement: 'fort', admin: 'seule', sante: 'degrade', duree: '18mois_cancer_25ans_alcool' },
    },
};

// ═══════════════════════════════════════════════════════
//  Answer selection logic
// ═══════════════════════════════════════════════════════

function pickAnswer(questionId, options, traits) {
    if (!options || options.length === 0) return '';

    // Specific answers by question ID based on persona traits
    const { fatigue, isolement, admin, sante, duree } = traits;

    // Helper: pick by severity level
    const sev = (levels) => {
        // levels: { low: idx, mid: idx, high: idx }
        if (fatigue === 'severe' || isolement === 'fort') return options[levels.high] || options[options.length - 1];
        if (fatigue === 'moderee_haute' || isolement === 'moyen') return options[levels.mid] || options[Math.min(1, options.length - 1)];
        return options[levels.low] || options[0];
    };

    // Binary yes/no — use traits
    if (options.length === 2 && (options[0] === 'Oui' || options[0] === 'Non')) {
        // Default for binary based on severity
        if (questionId.startsWith('O3') || questionId.startsWith('O4')) {
            return fatigue === 'severe' ? 'Oui' : 'Non';
        }
        return options[0]; // default first option
    }

    // Fatigue/épuisement questions
    if (['E7', 'E10', 'E11'].includes(questionId)) {
        return sev({ low: 1, mid: 2, high: 3 });
    }

    // Isolement
    if (['E2', 'E8'].includes(questionId)) {
        return sev({ low: 0, mid: 1, high: 2 });
    }

    // Impact on health
    if (['O29', 'O33'].includes(questionId)) {
        return sev({ low: 0, mid: 1, high: 2 });
    }

    // Admin difficulty
    if (['E66', 'E68', 'E69', 'E70'].includes(questionId)) {
        if (admin === 'perdue' || admin === 'perdu' || admin === 'seule') return options[options.length - 1];
        if (admin === 'surcharge_mdph') return options[Math.min(2, options.length - 1)];
        return options[Math.min(1, options.length - 1)];
    }

    // Default: pick option based on general severity
    if (options.length <= 2) return options[0];
    if (options.length === 3) return sev({ low: 0, mid: 1, high: 2 });
    if (options.length >= 4) return sev({ low: 0, mid: 1, high: 2 });

    return options[0];
}

// ═══════════════════════════════════════════════════════
//  Generate answers per persona
// ═══════════════════════════════════════════════════════

const allAnswers = {};

for (const [personaId, persona] of Object.entries(PERSONAS)) {
    const answers = {};

    // Determine active aidance blocks
    const activeAidance = new Set(['Tous']);
    const n3Map = {
        "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative": 'Personne Agée',
        "J'aide une personne en situation de handicap": 'Handicap',
        "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)": 'Personne Agée',
        "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)": 'Psy',
        "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)": 'Addiction',
    };

    if (n3Map[persona.n3]) activeAidance.add(n3Map[persona.n3]);
    if (persona.n3_multi && n3Map[persona.n3_multi]) activeAidance.add(n3Map[persona.n3_multi]);
    if ((persona.o1 === '- 15 ans' || persona.o1 === '15-20 ans') && activeAidance.size > 1) {
        activeAidance.add('Enfant');
    }

    for (const q of questions) {
        // Only answer if question is in active blocks
        if (!activeAidance.has(q.aidance)) continue;

        const opts = q.options;
        if (!opts || opts.length === 0) {
            // Free text or no options
            if (q.id === 'O64') {
                // Code postal
                const cp = {
                    P1: '69007', P3: '75011', P2: '13008', P4: '44000',
                    P5: '59000', C1: '31000', C2: '33000', C3: '76000'
                };
                answers[q.id] = cp[personaId] || '75001';
            }
            continue;
        }

        // Fixed answers for key questions
        // N3 — type d'aidance
        if (q.id === 'N3') {
            answers[q.id] = persona.n3;
            continue;
        }
        // O1 — âge de l'aidé
        if (q.id === 'O1') {
            answers[q.id] = persona.o1;
            continue;
        }
        // N1 — activité de l'aidant
        if (q.id === 'N1') {
            const act = {
                P1: 'En activité', P3: 'En activité', P2: 'Retraité.e',
                P4: 'En activité', P5: 'Retraité.e',
                C1: 'En activité', C2: 'En activité', C3: 'En activité'
            };
            answers[q.id] = act[personaId] || 'En activité';
            continue;
        }
        // O35 — sexe
        if (q.id === 'O35') {
            const sex = { P1: 'Femme', P3: 'Femme', P2: 'Homme', P4: 'Femme', P5: 'Homme', C1: 'Femme', C2: 'Homme', C3: 'Femme' };
            answers[q.id] = sex[personaId] || 'Femme';
            continue;
        }
        // O36 — âge de l'aidant
        if (q.id === 'O36') {
            const ages = { P1: '50-64 ans', P3: '31-49 ans', P2: '+75 ans', P4: '31-49 ans', P5: '50-64 ans', C1: '31-49 ans', C2: '18-30 ans', C3: '50-64 ans' };
            answers[q.id] = ages[personaId] || '31-49 ans';
            continue;
        }
        // O49 — ancienneté aidance
        if (q.id === 'O49') {
            const anc = {
                P1: 'Entre 1 et 5 ans', P3: 'Entre 1 et 5 ans', P2: 'Entre 1 et 5 ans',
                P4: 'Plus de 10 ans', P5: 'Plus de 10 ans',
                C1: 'Entre 1 et 5 ans', C2: 'Entre 1 et 5 ans', C3: 'Entre 1 et 5 ans'
            };
            if (opts.find(o => o === anc[personaId])) answers[q.id] = anc[personaId];
            else answers[q.id] = opts[1] || opts[0];
            continue;
        }
        // N4 — seul à aider
        if (q.id === 'N4') {
            const seul = { P1: 'Oui', P3: 'Non', P2: 'Oui', P4: 'Oui', P5: 'Non', C1: 'Non', C2: 'Oui', C3: 'Oui' };
            answers[q.id] = seul[personaId] || 'Oui';
            continue;
        }
        // O47 — distance
        if (q.id === 'O47') {
            const dist = { P1: 'Moins de 30 min', P3: 'Moins de 30 min', P2: 'Moins de 30 min', P4: 'Entre 30 min et 1h30', P5: 'Moins de 30 min', C1: 'Moins de 30 min', C2: 'Moins de 30 min', C3: 'Moins de 30 min' };
            answers[q.id] = dist[personaId] || 'Moins de 30 min';
            continue;
        }
        // O48 — fréquence visites
        if (q.id === 'O48') {
            const freq = { P1: 'Au moins 1 fois par semaine', P3: 'Tous les jours', P2: 'Tous les jours', P4: 'Au moins 1 fois par semaine', P5: 'Tous les jours', C1: 'Tous les jours', C2: 'Au moins 1 fois par semaine', C3: 'Tous les jours' };
            answers[q.id] = freq[personaId] || 'Tous les jours';
            continue;
        }
        // E7 — épuisement
        if (q.id === 'E7') {
            const ep = { P1: 'Un peu fatigué·e', P3: 'Un peu fatigué·e', P2: 'Épuisé·e / au bord de craquer', P4: 'Très fatigué·e', P5: 'Très fatigué·e', C1: 'Épuisé·e / au bord de craquer', C2: 'Très fatigué·e', C3: 'Épuisé·e / au bord de craquer' };
            answers[q.id] = ep[personaId] || opts[1];
            continue;
        }
        // E10 — stress
        if (q.id === 'E10') {
            const stress = { P1: 'e suis parfois tendu·e ou inquiet·ète', P3: 'e suis parfois tendu·e ou inquiet·ète', P2: 'Je me sens débordé·e / au bord de craquer', P4: 'Je suis souvent tendu·e ou inquiet·ète', P5: 'Je suis souvent tendu·e ou inquiet·ète', C1: 'Je me sens débordé·e / au bord de craquer', C2: 'Je suis souvent tendu·e ou inquiet·ète', C3: 'Je me sens débordé·e / au bord de craquer' };
            answers[q.id] = stress[personaId] || opts[1];
            continue;
        }
        // E11 — peut continuer
        if (q.id === 'E11') {
            const cont = { P1: 'Oui, mais ce sera difficile', P3: 'Oui, mais ce sera difficile', P2: 'Non, je risque de ne plus y arriver', P4: 'Je ne suis pas sûr·e', P5: 'Je ne suis pas sûr·e', C1: 'Non, je risque de ne plus y arriver', C2: 'Je ne suis pas sûr·e', C3: 'Non, je risque de ne plus y arriver' };
            answers[q.id] = cont[personaId] || opts[1];
            continue;
        }
        // E1 — répartition aide
        if (q.id === 'E1') {
            const rep = { P1: 'Je fais la plus grande partie mais cela reste acceptable', P3: 'Je fais la plus grande partie mais cela reste acceptable', P2: 'Je suis totalement seul·e', P4: 'Je suis totalement seul·e', P5: 'Je fais la plus grande partie mais cela reste acceptable', C1: 'Je fais presque tout et cela crée des tensions ou un sentiment d\'injustice', C2: 'Je suis totalement seul·e', C3: 'Je suis totalement seul·e' };
            answers[q.id] = rep[personaId] || opts[1];
            continue;
        }
        // E2 — entourage de soutien
        if (q.id === 'E2') {
            const sout = { P1: 'Oui, une personne', P3: 'Oui, une personne', P2: 'Personne', P4: 'Très peu / presque personne', P5: 'Très peu / presque personne', C1: 'Oui, une personne', C2: 'Très peu / presque personne', C3: 'Personne' };
            answers[q.id] = sout[personaId] || opts[1];
            continue;
        }
        // O37 — médecin traitant
        if (q.id === 'O37') {
            answers[q.id] = 'Oui';
            continue;
        }
        // O50 — temps consacré
        if (q.id === 'O50') {
            const temps = { P1: 'Entre 6h et 10h par semaine', P3: 'Plus de 10h par semaine', P2: 'Plus de 10h par semaine', P4: 'Entre 1h et 5h par semaine', P5: 'Plus de 10h par semaine', C1: 'Plus de 10h par semaine', C2: 'Entre 6h et 10h par semaine', C3: 'Plus de 10h par semaine' };
            answers[q.id] = temps[personaId] || opts[2];
            continue;
        }
        // E9 — temps pour soi
        if (q.id === 'E9') {
            const tps = { P1: 'Non', P3: 'Non', P2: 'Non', P4: 'Oui', P5: 'Non', C1: 'Non', C2: 'Oui', C3: 'Non' };
            answers[q.id] = tps[personaId] || 'Non';
            continue;
        }
        // N5 — aides utilisées
        if (q.id === 'N5') {
            const aid = { P1: 'Aucune', P3: 'Aucune', P2: 'Aucune', P4: 'Accompagnement psychologique', P5: 'Aucune', C1: 'Aucune', C2: 'Aucune', C3: 'Aucune' };
            answers[q.id] = aid[personaId] || 'Aucune';
            continue;
        }
        // E3 — personnes à charge
        if (q.id === 'E3') {
            const charge = { P1: 'Aucun', P3: 'Enfant(s) mineurs', P2: 'Aucun', P4: 'Aucun', P5: 'Aucun', C1: 'Aucun', C2: 'Aucun', C3: 'Aucun' };
            answers[q.id] = charge[personaId] || 'Aucun';
            continue;
        }
        // O45 — couverture santé aidant
        if (q.id === 'O45') {
            answers[q.id] = 'Régime général (ou spécial) et Mutuelle';
            continue;
        }
        // O23 — couverture santé aidé
        if (q.id === 'O23') {
            answers[q.id] = 'Régime général (ou spécial) et Mutuelle';
            continue;
        }
        // N6 — mesure de protection
        if (q.id === 'N6') {
            const prot = { P1: 'Non', P3: 'Non', P2: 'Non', P4: 'Curatelle simple', P5: 'Non', C1: 'Non', C2: 'Curatelle renforcée', C3: 'Non' };
            answers[q.id] = prot[personaId] || 'Non';
            continue;
        }
        // O29 — retentissement santé
        if (q.id === 'O29') {
            const ret = { P1: 'Un peu', P3: 'Un peu', P2: 'Oui', P4: 'Un peu', P5: 'Oui', C1: 'Oui', C2: 'Un peu', C3: 'Oui' };
            answers[q.id] = ret[personaId] || opts[1];
            continue;
        }
        // O33 — charge ressentie
        if (q.id === 'O33') {
            const ch = { P1: 'Un peu', P3: 'Oui', P2: 'Oui', P4: 'Un peu', P5: 'Oui', C1: 'Oui', C2: 'Oui', C3: 'Oui' };
            answers[q.id] = ch[personaId] || opts[1];
            continue;
        }
        // E4 — relation avec le proche
        if (q.id === 'E4') {
            const rel = { P1: 'Plus tendue / plus compliquée', P3: 'Plutôt renforcée / plus proche', P2: 'Plus tendue / plus compliquée', P4: 'Plus tendue / plus compliquée', P5: 'Plus tendue / plus compliquée', C1: 'Plus tendue / plus compliquée', C2: 'Plus tendue / plus compliquée', C3: 'Plus tendue / plus compliquée' };
            answers[q.id] = rel[personaId] || opts[1];
            continue;
        }
        // E6 — accepte aide extérieure
        if (q.id === 'E6') {
            const aide = { P1: 'Oui, mais avec des réticences', P3: 'Je ne sais pas / nous n\'avons pas encore essayé', P2: 'Non, il/elle refuse la plupart du temps', P4: 'Non, il/elle refuse la plupart du temps', P5: 'Non, il/elle refuse la plupart du temps', C1: 'Oui, mais avec des réticences', C2: 'Oui, mais avec des réticences', C3: 'Non, il/elle refuse la plupart du temps' };
            answers[q.id] = aide[personaId] || opts[1];
            continue;
        }
        // O31 — peur avenir
        if (q.id === 'O31') {
            answers[q.id] = 'Oui';
            continue;
        }
        // O32 — souhaite plus d'aide
        if (q.id === 'O32') {
            const plus = { P1: 'Oui', P3: 'Oui', P2: 'Un peu', P4: 'Un peu', P5: 'Un peu', C1: 'Oui', C2: 'Oui', C3: 'Un peu' };
            answers[q.id] = plus[personaId] || 'Oui';
            continue;
        }
        // E12 — proche peut se faire du mal
        if (q.id === 'E12') {
            const mal = { P1: 'Non', P3: 'Non', P2: 'Non', P4: 'Oui, souvent', P5: 'Parfois, selon les périodes', C1: 'Parfois, selon les périodes', C2: 'Parfois, selon les périodes', C3: 'Parfois, selon les périodes' };
            answers[q.id] = mal[personaId] || opts[0];
            continue;
        }
        // N7 — aménagement travail
        if (q.id === 'N7') {
            const amen = { P1: 'Oui j\'ai dû aménager mes horaires', P3: 'Oui j\'ai dû aménager mes horaires', P2: 'Non', P4: 'Non', P5: 'Non', C1: 'Oui j\'ai dû aménager mes horaires', C2: 'Non', C3: 'Oui j\'ai dû aménager mes horaires' };
            answers[q.id] = amen[personaId] || opts[0];
            continue;
        }
        // O61 — moyens financiers
        if (q.id === 'O61') {
            const fin = { P1: 'Oui', P3: 'Non', P2: 'Non', P4: 'Oui', P5: 'Non', C1: 'Oui', C2: 'Oui', C3: 'Non' };
            answers[q.id] = fin[personaId] || 'Oui';
            continue;
        }
        // E66 — admin complexes
        if (q.id === 'E66') {
            const comp = { P1: 'Un peu', P3: 'Oui', P2: 'Oui', P4: 'Un peu', P5: 'Un peu', C1: 'Oui', C2: 'Oui', C3: 'Oui' };
            answers[q.id] = comp[personaId] || opts[1];
            continue;
        }

        // === CONDITIONAL BLOCKS ===

        // Handicap block
        if (q.id === 'N16') {
            answers[q.id] = 'De naissance';
            continue;
        }
        if (q.id === 'N17') {
            // Camille: cognitif (autisme). Thomas: moteur+psychique
            const hand = { P3: 'Handicap cognitif', C2: 'Handicap moteur' };
            answers[q.id] = hand[personaId] || opts[0];
            continue;
        }
        if (q.id === 'N30') {
            const taux = { P3: 'Plus de 80%', C2: 'Plus de 80%' };
            answers[q.id] = taux[personaId] || opts[opts.length - 1];
            continue;
        }
        // Psy block
        if (q.id === 'E48') {
            const suivi = { P4: 'Psychiatre en libéral', C1: 'Médecin généraliste', C2: 'Psychiatre en libéral' };
            answers[q.id] = suivi[personaId] || opts[0];
            continue;
        }
        if (q.id === 'E50') {
            const obs = { P4: 'Suivi en cours, mais observance irrégulière', C1: 'Suivi en cours, mais observance irrégulière', C2: 'Suivi en cours, mais observance irrégulière' };
            answers[q.id] = obs[personaId] || opts[0];
            continue;
        }
        // Addiction block
        if (q.id === 'N37') {
            const type_add = { P5: 'Alcool', C3: 'Alcool' };
            answers[q.id] = type_add[personaId] || opts[0];
            continue;
        }
        if (q.id === 'N38') {
            answers[q.id] = 'Oui';
            continue;
        }
        if (q.id === 'N39') {
            answers[q.id] = 'Oui';
            continue;
        }
        if (q.id === 'N40') {
            const sev = { P5: 'Oui, plusieurs fois avec des rechutes', C3: 'Oui, plusieurs fois avec des rechutes' };
            answers[q.id] = sev[personaId] || opts[0];
            continue;
        }
        if (q.id === 'E45') {
            const sui_add = { P5: 'Oui, mais il/elle n\'y va pas régulièrement', C3: 'Oui, mais il/elle n\'y va pas régulièrement' };
            answers[q.id] = sui_add[personaId] || opts[0];
            continue;
        }
        if (q.id === 'E49') {
            answers[q.id] = opts[0]; // premier type professionnel
            continue;
        }
        if (q.id === 'E51') {
            const pret = { P5: 'Pas toujours mais mieux qu\'avant', C3: 'Pas toujours mais mieux qu\'avant' };
            answers[q.id] = pret[personaId] || opts[0];
            continue;
        }
        // Personne agée block
        if (q.id === 'E58') {
            const eva = { P1: 'Oui', P2: 'Oui', C1: 'Oui' };
            answers[q.id] = eva[personaId] || opts[0];
            continue;
        }
        if (q.id === 'O53') {
            const aggir = { P1: 'Oui', P2: 'Oui', C1: 'Non' };
            answers[q.id] = aggir[personaId] || opts[0];
            continue;
        }
        if (q.id === 'O54') {
            const gir = { P1: 'GIR 3', P2: 'GIR 4', C1: 'GIR 4' };
            answers[q.id] = gir[personaId] || opts[0];
            continue;
        }
        // Enfant block
        if (q.id === 'E38') {
            answers[q.id] = 'Un peu, mais cela reste flou';
            continue;
        }
        if (q.id === 'E59') {
            answers[q.id] = opts[0]; // first option
            continue;
        }
        if (q.id === 'E60') {
            answers[q.id] = opts[0]; // first option
            continue;
        }
        if (q.id === 'E64') {
            answers[q.id] = 'Oui, mais avec des aménagements ou accompagnement (AESH, AVS, éducateur…)';
            continue;
        }
        if (q.id === 'E65') {
            answers[q.id] = 'Oui, besoin identifié mais pas encore en place';
            continue;
        }

        // === Generic fallback — pick sensible option based on traits ===
        answers[q.id] = pickAnswer(q.id, opts, persona.traits);
    }

    allAnswers[personaId] = answers;
}

// Output stats
for (const [pid, ans] of Object.entries(allAnswers)) {
    console.log(`${pid}: ${Object.keys(ans).length} answers`);
}

// Write as JSON
writeFileSync('_persona_answers.json', JSON.stringify(allAnswers, null, 2));
console.log('\nWritten to _persona_answers.json');
