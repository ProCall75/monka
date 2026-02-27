import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: '.env.local' });

const sb = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);


const { data, error } = await sb.from('questions').select('id, aidance, is_trigger, classification').order('id');
if (error) { console.log('ERROR:', error); process.exit(1); }

const aidanceVals = [...new Set(data.map(q => q.aidance))];
console.log('=== Unique aidance values ===');
aidanceVals.forEach(v => console.log(' ', v));

const withAidance = data.filter(q => q.aidance);
console.log('\n=== Questions with aidance set (' + withAidance.length + ') ===');
withAidance.forEach(q => console.log(q.id, '|', q.aidance));

const conditionalIds = ['N16', 'N17', 'N30', 'E58', 'O53', 'O54', 'E48', 'E50', 'N37', 'N38', 'N39', 'N40', 'E45', 'E49', 'E51', 'E38', 'E59', 'E60', 'E64', 'E65'];
const found = data.filter(q => conditionalIds.includes(q.id));
console.log('\n=== Conditional questions found (' + found.length + '/20) ===');
found.forEach(q => console.log(q.id, '| aidance:', q.aidance, '| trigger:', q.is_trigger));

const notFound = conditionalIds.filter(id => !data.find(q => q.id === id));
if (notFound.length > 0) {
    console.log('\n=== NOT FOUND in DB (' + notFound.length + ') ===');
    notFound.forEach(id => console.log(' ', id));
}

// Also get N3 question to see current response options
const n3 = data.find(q => q.id === 'N3');
if (n3) {
    const { data: n3full } = await sb.from('questions').select('*').eq('id', 'N3').single();
    console.log('\n=== N3 Question ===');
    console.log('Text:', n3full.question_text);
    console.log('Response options:', JSON.stringify(n3full.response_options, null, 2));
}
