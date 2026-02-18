import { readFileSync } from 'fs';
const src = readFileSync('src/pages/PersonasPage.tsx', 'utf8');

function extractKeys(varName) {
    const regex = new RegExp('const ' + varName + '.*?=\\s*\\{([\\s\\S]*?)\\n\\}', 'm');
    const m = src.match(regex);
    if (!m) return [];
    const block = m[1];
    const keys = [];
    for (const line of block.split('\n')) {
        const km = line.match(/^\s*'([A-Z]\d+)'/);
        if (km) keys.push(km[1]);
    }
    return keys;
}

const marie = extractKeys('marieAnswers');
const jp = extractKeys('jeanPierreAnswers');
const camille = extractKeys('camilleAnswers');

console.log('Marie (P1):', marie.length, 'answers');
console.log('Jean-Pierre (P2):', jp.length, 'answers');
console.log('Camille (P3):', camille.length, 'answers');

const allKeys = new Set([...marie, ...jp, ...camille]);
console.log('\nUnion of all question IDs:', allKeys.size);

const p1notP3 = marie.filter(k => !camille.includes(k));
const p2notP3 = jp.filter(k => !camille.includes(k));
const p3notP1 = camille.filter(k => !marie.includes(k));
const p3notP2 = camille.filter(k => !jp.includes(k));

console.log('\n--- In P1 but NOT in P3 (' + p1notP3.length + ') ---');
p1notP3.forEach(k => console.log('  ', k));

console.log('\n--- In P2 but NOT in P3 (' + p2notP3.length + ') ---');
p2notP3.forEach(k => console.log('  ', k));

console.log('\n--- In P3 but NOT in P1 (' + p3notP1.length + ') ---');
p3notP1.forEach(k => console.log('  ', k));

console.log('\n--- In P3 but NOT in P2 (' + p3notP2.length + ') ---');
p3notP2.forEach(k => console.log('  ', k));

const marieSet = new Set(marie);
const jpSet = new Set(jp);
const camilleSet = new Set(camille);
const allSame = marie.length === jp.length && jp.length === camille.length && [...marieSet].every(k => jpSet.has(k) && camilleSet.has(k));
console.log('\nAll 3 personas have identical question sets:', allSame);
