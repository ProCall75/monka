import { MPData, MPSection, DecisionItem } from '../types';

// Import raw markdown content — V1
import R1_RAW from '../../data/R1.md?raw';
import R2_RAW from '../../data/R2.md?raw';
import R3_RAW from '../../data/R3.md?raw';
import R4_RAW from '../../data/R4.md?raw';

// Import raw markdown content — V2
import A1_RAW from '../../data/A1.md?raw';
import A2_RAW from '../../data/A2.md?raw';
import A3_RAW from '../../data/A3.md?raw';
import A4_RAW from '../../data/A4.md?raw';

// Import raw markdown content — V3
import S1_RAW from '../../data/S1.md?raw';
import S2_RAW from '../../data/S2.md?raw';
import S3_RAW from '../../data/S3.md?raw';
import S4_RAW from '../../data/S4.md?raw';

// Import raw markdown content — V4
import F1_RAW from '../../data/F1.md?raw';
import F2_RAW from '../../data/F2.md?raw';
import F3_RAW from '../../data/F3.md?raw';
import F4_RAW from '../../data/F4.md?raw';
import F5_RAW from '../../data/F5.md?raw';
import F6_RAW from '../../data/F6.md?raw';

function extractDecisionItems(sectionId: string, content: string, vuln: string): DecisionItem[] {
    const items: DecisionItem[] = [];

    // Dynamic patterns based on vulnerability
    // V1: MT_V1_012 (global numbering, no MP ID in MT name)
    // V2: MT_V2_A1_01 (MP ID embedded in MT name)
    // V1: MT_V1_012 (global numbering) — V2: MT_V2_A1_01 (MP ID in name) — V3: MT_V3_004 (global numbering like V1) — V4: MT_V4_063 (global numbering like V1/V3)
    const mtIdPattern = (vuln === 'V1' || vuln === 'V3' || vuln === 'V4') ? `MT_${vuln}_\\d+` : `MT_${vuln}_${sectionId.split('_')[0]}_\\d+`;

    // Extract MT wording items (💡 markers)
    const mtWordingRegex = new RegExp(
        `\\|\\s*(${mtIdPattern})\\s*\\|[^|]*\\|[^|]*\\|([^|]*)\\|([^|]*)\\|\\s*💡\\s*\\|`,
        'g'
    );
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

function parseMarkdown(id: string, raw: string, vuln: string): MPData {
    const lines = raw.split('\n');

    // Extract title from first H1 — generalized pattern
    // V1: # 📋 Fiche de Validation MP — R1 — ...
    // V2: # 📋 Fiche de Validation MP — A1 — ...
    const titleMatch = raw.match(/^#\s+📋\s+Fiche de Validation MP — ([A-Z]\d) — (.+)$/m);
    const title = titleMatch ? titleMatch[1] : id;
    const subtitle = titleMatch ? titleMatch[2] : '';

    // Count stats — generalized
    const questionsMatch = raw.match(/Total\s*:\s*(\d+)\s*questions/i);
    const questions = questionsMatch ? parseInt(questionsMatch[1]) : 0;

    const mpPrefix = vuln === 'V1' ? 'R' : vuln === 'V2' ? 'A' : vuln === 'V3' ? 'S' : vuln === 'V4' ? 'F' : 'X';

    const catRegex = new RegExp(`${id}_CAT_\\d+`, 'g');
    const catMatches = raw.match(catRegex);
    const categories = catMatches ? new Set(catMatches).size : 0;

    const ruleRegex = new RegExp(`V\\d_${id}_(STD|CCC|CRIT)_\\d+`, 'g');
    const ruleMatches = raw.match(ruleRegex);
    const rules = ruleMatches ? new Set(ruleMatches).size : 0;

    // V1: MT_V1_012 (global numbering) — V2: MT_V2_A1_01 (MP ID in name) — V3: MT_V3_004 (global like V1) — V4: MT_V4_063 (global like V1/V3)
    const mtRegex = (vuln === 'V1' || vuln === 'V3' || vuln === 'V4')
        ? new RegExp(`MT_${vuln}_\\d+`, 'g')
        : new RegExp(`MT_${vuln}_${id}_\\d+`, 'g');
    const mtMatches = raw.match(mtRegex);
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
                    decisionItems: extractDecisionItems(sectionId, content, vuln),
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
            decisionItems: extractDecisionItems(sectionId, content, vuln),
        });
    }

    return {
        id,
        title,
        subtitle,
        vulnerability: vuln,
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
        // V1 — Social & Relationnel
        parseMarkdown('R1', R1_RAW, 'V1'),
        parseMarkdown('R2', R2_RAW, 'V1'),
        parseMarkdown('R3', R3_RAW, 'V1'),
        parseMarkdown('R4', R4_RAW, 'V1'),
        // V2 — Administrative
        parseMarkdown('A1', A1_RAW, 'V2'),
        parseMarkdown('A2', A2_RAW, 'V2'),
        parseMarkdown('A3', A3_RAW, 'V2'),
        parseMarkdown('A4', A4_RAW, 'V2'),
        // V3 — Santé de l'Aidant
        parseMarkdown('S1', S1_RAW, 'V3'),
        parseMarkdown('S2', S2_RAW, 'V3'),
        parseMarkdown('S3', S3_RAW, 'V3'),
        parseMarkdown('S4', S4_RAW, 'V3'),
        // V4 — Fragilité du Proche
        parseMarkdown('F1', F1_RAW, 'V4'),
        parseMarkdown('F2', F2_RAW, 'V4'),
        parseMarkdown('F3', F3_RAW, 'V4'),
        parseMarkdown('F4', F4_RAW, 'V4'),
        parseMarkdown('F5', F5_RAW, 'V4'),
        parseMarkdown('F6', F6_RAW, 'V4'),
    ];
}
