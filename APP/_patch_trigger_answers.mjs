/**
 * Patch: Add N3 and O1 trigger question answers to all persona answer sets.
 * These are needed by getActiveAidanceBlocks() in the engine.
 */
import { readFileSync, writeFileSync } from 'fs';

const answers = JSON.parse(readFileSync('_persona_answers.json', 'utf8'));

// N3 and O1 values per persona (from PersonasPage definitions)
const PERSONA_TRIGGERS = {
    P1: {
        N3: "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative",
        O1: '+75 ans',
    },
    P3: {
        N3: "J'aide une personne en situation de handicap",
        O1: '- 15 ans',
    },
    P2: {
        N3: "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)",
        O1: '60-75 ans',
    },
    P4: {
        N3: "J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        O1: '20-60 ans',
    },
    P5: {
        N3: "J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)",
        O1: '20-60 ans',
    },
    C1: {
        N3: "J'aide une personne en perte d'autonomie liée au vieillissement ou à une maladie neurodégénérative|J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        O1: '60-75 ans',
    },
    C2: {
        N3: "J'aide une personne en situation de handicap|J'aide une personne souffrant de troubles psychiques (dépression sévère, troubles bipolaires, schizophrénie…)",
        O1: '20-60 ans',
    },
    C3: {
        N3: "J'aide une personne atteinte d'une ou plusieurs maladies chroniques (insuffisance cardiaque, diabète, cancer, BPCO…)|J'aide une personne souffrant d'une ou plusieurs addictions (alcool, drogues, jeux…)",
        O1: '20-60 ans',
    },
};

// Patch each persona
for (const [pid, triggers] of Object.entries(PERSONA_TRIGGERS)) {
    if (answers[pid]) {
        answers[pid]['N3'] = triggers.N3;
        answers[pid]['O1'] = triggers.O1;
        console.log(`${pid}: ${Object.keys(answers[pid]).length} answers (added N3, O1)`);
    }
}

writeFileSync('_persona_answers.json', JSON.stringify(answers, null, 2));
console.log('\nPatched _persona_answers.json');
