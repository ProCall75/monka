// ─── Completude Document Parser ───
// Parses completude docs (per-MP reports + coherence checks + global audit)
// into a structure similar to MPData for viewing and annotating

export interface CompletudeSectionData {
    id: string;
    title: string;
    content: string;
    hasDecisionItems: boolean;
}

export interface CompletudeDoc {
    id: string;
    title: string;
    subtitle: string;
    type: 'mp_completude' | 'coherence_check' | 'global_audit';
    vulnerability: string;
    score?: string; // e.g. "7/8", "8/8"
    rawContent: string;
    sections: CompletudeSectionData[];
}

// ─── Raw Imports: MP Completude (V3) ───
import S1_COMP from '../../data/completude/S1_charge_fatigue.md?raw';
import S2_COMP from '../../data/completude/S2_inquietudes_securite.md?raw';
import S3_COMP from '../../data/completude/S3_sante_physique.md?raw';
import S4_COMP from '../../data/completude/S4_hygiene_de_vie.md?raw';

// ─── Raw Imports: MP Completude (V4) ───
import F1_COMP from '../../data/completude/F1_quotidien_budget.md?raw';
import F2_COMP from '../../data/completude/F2_autonomie_aide.md?raw';
import F3_COMP from '../../data/completude/F3_memoire_comportement.md?raw';
import F4_COMP from '../../data/completude/F4_douleur_fatigue.md?raw';
import F5_COMP from '../../data/completude/F5_dependance_handicap.md?raw';
import F6_COMP from '../../data/completude/F6_autonomie_chutes.md?raw';

// ─── Raw Imports: MP Completude (V5) ───
import M1_COMP from '../../data/completude/M1_comprehension_diagnostic.md?raw';
import M2_COMP from '../../data/completude/M2_acces_soins.md?raw';
import M3_COMP from '../../data/completude/M3_urgences_hospitalisations.md?raw';
import M4_COMP from '../../data/completude/M4_troubles_psychiques.md?raw';
import M5_COMP from '../../data/completude/M5_coordination_soins.md?raw';
import M6_COMP from '../../data/completude/M6_vision_globale.md?raw';

// ─── Raw Imports: Coherence Checks ───
import V1_CHECK from '../../data/completude/V1_COHERENCE_CHECK.md?raw';
import V2_CHECK from '../../data/completude/V2_COHERENCE_CHECK.md?raw';
import V3_CHECK from '../../data/completude/V3_COHERENCE_CHECK.md?raw';
import V4_CHECK from '../../data/completude/V4_COHERENCE_CHECK.md?raw';
import V5_CHECK from '../../data/completude/V5_COHERENCE_CHECK.md?raw';

// ─── Raw Imports: Global Audit ───
import GLOBAL_AUDIT from '../../data/completude/GLOBAL_KERNEL_AUDIT.md?raw';

function parseCompletudeDoc(
    id: string,
    raw: string,
    type: CompletudeDoc['type'],
    vulnerability: string
): CompletudeDoc {
    const lines = raw.split('\n');

    // Extract title from first H1
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const fullTitle = titleMatch ? titleMatch[1] : id;

    // Extract subtitle from the metadata block
    const subtitleMatch = raw.match(/\*\*Vulnérabilité\*\*\s*:\s*(.+)/);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

    // Extract score
    const scoreMatch = raw.match(/\*\*Score POST-VALIDATION\*\*\s*:\s*(\d+\/\d+)/i)
        || raw.match(/Score\s*:\s*(\d+\/\d+)/);
    const score = scoreMatch ? scoreMatch[1] : undefined;

    // Split into sections by H2
    const sections: CompletudeSectionData[] = [];
    let currentTitle = '';
    let currentLines: string[] = [];
    let sectionIndex = 0;

    for (const line of lines) {
        if (line.startsWith('## ')) {
            if (currentTitle) {
                const content = currentLines.join('\n');
                const sectionId = `COMP_${id}_section_${sectionIndex}`;
                // Detect decision-worthy sections (proposals, summaries with items to validate)
                const hasProposals = /PROP-|Proposition|propositi|À faire|☐|reste à faire|À définir|À implémenter|À décider/i.test(content);
                sections.push({
                    id: sectionId,
                    title: currentTitle,
                    content,
                    hasDecisionItems: hasProposals,
                });
                sectionIndex++;
            }
            currentTitle = line.replace(/^##\s+/, '');
            currentLines = [];
        } else {
            currentLines.push(line);
        }
    }

    // Push last section
    if (currentTitle) {
        const content = currentLines.join('\n');
        const sectionId = `COMP_${id}_section_${sectionIndex}`;
        const hasProposals = /PROP-|Proposition|propositi|À faire|☐|reste à faire|À définir|À implémenter|À décider/i.test(content);
        sections.push({
            id: sectionId,
            title: currentTitle,
            content,
            hasDecisionItems: hasProposals,
        });
    }

    return {
        id,
        title: fullTitle.replace(/^[📋🔎🌐]\s*/, ''),
        subtitle,
        type,
        vulnerability,
        score,
        rawContent: raw,
        sections,
    };
}

export function loadAllCompletudeDocs(): CompletudeDoc[] {
    return [
        // V3 — Santé Aidant (completude)
        parseCompletudeDoc('COMP_S1', S1_COMP, 'mp_completude', 'V3'),
        parseCompletudeDoc('COMP_S2', S2_COMP, 'mp_completude', 'V3'),
        parseCompletudeDoc('COMP_S3', S3_COMP, 'mp_completude', 'V3'),
        parseCompletudeDoc('COMP_S4', S4_COMP, 'mp_completude', 'V3'),

        // V4 — Fragilité du Proche (completude)
        parseCompletudeDoc('COMP_F1', F1_COMP, 'mp_completude', 'V4'),
        parseCompletudeDoc('COMP_F2', F2_COMP, 'mp_completude', 'V4'),
        parseCompletudeDoc('COMP_F3', F3_COMP, 'mp_completude', 'V4'),
        parseCompletudeDoc('COMP_F4', F4_COMP, 'mp_completude', 'V4'),
        parseCompletudeDoc('COMP_F5', F5_COMP, 'mp_completude', 'V4'),
        parseCompletudeDoc('COMP_F6', F6_COMP, 'mp_completude', 'V4'),

        // V5 — Parcours Médical (completude)
        parseCompletudeDoc('COMP_M1', M1_COMP, 'mp_completude', 'V5'),
        parseCompletudeDoc('COMP_M2', M2_COMP, 'mp_completude', 'V5'),
        parseCompletudeDoc('COMP_M3', M3_COMP, 'mp_completude', 'V5'),
        parseCompletudeDoc('COMP_M4', M4_COMP, 'mp_completude', 'V5'),
        parseCompletudeDoc('COMP_M5', M5_COMP, 'mp_completude', 'V5'),
        parseCompletudeDoc('COMP_M6', M6_COMP, 'mp_completude', 'V5'),

        // Coherence checks
        parseCompletudeDoc('CHECK_V1', V1_CHECK, 'coherence_check', 'V1'),
        parseCompletudeDoc('CHECK_V2', V2_CHECK, 'coherence_check', 'V2'),
        parseCompletudeDoc('CHECK_V3', V3_CHECK, 'coherence_check', 'V3'),
        parseCompletudeDoc('CHECK_V4', V4_CHECK, 'coherence_check', 'V4'),
        parseCompletudeDoc('CHECK_V5', V5_CHECK, 'coherence_check', 'V5'),

        // Global audit
        parseCompletudeDoc('GLOBAL_AUDIT', GLOBAL_AUDIT, 'global_audit', 'ALL'),
    ];
}
