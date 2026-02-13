import { MPData, MPSection, DecisionItem } from '../types';

// Import raw markdown content
import R1_RAW from '../../data/R1.md?raw';
import R2_RAW from '../../data/R2.md?raw';
import R3_RAW from '../../data/R3.md?raw';
import R4_RAW from '../../data/R4.md?raw';

function extractDecisionItems(sectionId: string, content: string): DecisionItem[] {
    const items: DecisionItem[] = [];

    // Match decision rows in tables: | ... | ✅ Validé / 💡 / ☐ ... |
    const decisionPatterns = [
        // Table rows with 💡 status
        /\|\s*(?:MT_V1_\d+|_\(NOUVELLE\)_)\s*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|\s*💡\s*\|/g,
        // Décision Dr. Monka checkboxes
        /\*\*Décision Dr\. Monka\*\*\s*:\s*☐/g,
        // Reco prévention
        /☐ Reco prévention validée/g,
        // Wording validation
        /☐ Wording de base validé/g,
        /☐ Versioning validé/g,
    ];

    // Extract MT wording items
    const mtWordingRegex = /\|\s*(MT_V1_\d+)\s*\|[^|]*\|[^|]*\|([^|]*)\|([^|]*)\|\s*💡\s*\|/g;
    let match;
    while ((match = mtWordingRegex.exec(content)) !== null) {
        items.push({
            id: `${sectionId}_${match[1]}`,
            label: `${match[1]} — Wording IDEC / Utilisateur`,
            type: 'wording',
            sectionId,
        });
    }

    // Extract Dr. Monka decision points
    const drMonkaRegex = /\*\*Décision Dr\. Monka\*\*\s*:\s*☐\s*([^|☐\n]+)/g;
    while ((match = drMonkaRegex.exec(content)) !== null) {
        items.push({
            id: `${sectionId}_drmonka_${items.length}`,
            label: `Dr. Monka: ${match[1].trim()}`,
            type: 'decision',
            sectionId,
        });
    }

    return items;
}

function parseMarkdown(id: string, raw: string): MPData {
    const lines = raw.split('\n');

    // Extract title from first H1
    const titleMatch = raw.match(/^#\s+📋\s+Fiche de Validation MP — (R\d) — (.+)$/m);
    const title = titleMatch ? titleMatch[1] : id;
    const subtitle = titleMatch ? titleMatch[2] : '';

    // Count stats
    const questionsMatch = raw.match(/Total\s*:\s*(\d+)\s*questions/i);
    const questions = questionsMatch ? parseInt(questionsMatch[1]) : 0;

    const catMatches = raw.match(/R\d_CAT_\d+/g);
    const categories = catMatches ? new Set(catMatches).size : 0;

    const ruleMatches = raw.match(/V1_R\d_(STD|CCC|CRIT)_\d+/g);
    const rules = ruleMatches ? new Set(ruleMatches).size : 0;

    const mtMatches = raw.match(/MT_V1_\d+/g);
    const microTasks = mtMatches ? new Set(mtMatches).size : 0;

    // Split into sections by H2
    const sections: MPSection[] = [];
    let currentTitle = '';
    let currentLines: string[] = [];
    let sectionIndex = 0;

    for (const line of lines) {
        if (line.startsWith('## ')) {
            if (currentTitle) {
                const content = currentLines.join('\n');
                const sectionId = `${id}_section_${sectionIndex}`;
                sections.push({
                    id: sectionId,
                    title: currentTitle,
                    content,
                    decisionItems: extractDecisionItems(sectionId, content),
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
        const sectionId = `${id}_section_${sectionIndex}`;
        sections.push({
            id: sectionId,
            title: currentTitle,
            content,
            decisionItems: extractDecisionItems(sectionId, content),
        });
    }

    return {
        id,
        title,
        subtitle,
        questions,
        categories,
        rules,
        microTasks,
        rawContent: raw,
        sections,
    };
}

export function loadAllMPs(): MPData[] {
    return [
        parseMarkdown('R1', R1_RAW),
        parseMarkdown('R2', R2_RAW),
        parseMarkdown('R3', R3_RAW),
        parseMarkdown('R4', R4_RAW),
    ];
}
