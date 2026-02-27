import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: '.env.local' });

const sb = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);


const { data: questions } = await sb.from('questions').select('id, question_text, response_type, response_options, aidance, is_trigger, vulnerability_id, bloc, sous_bloc').order('vulnerability_id').order('ordre_global');

// Export as JSON for reference
const output = questions
    .filter(q => !q.is_trigger)
    .map(q => ({
        id: q.id,
        text: q.question_text?.substring(0, 80),
        type: q.response_type,
        options: q.response_options,
        aidance: q.aidance,
        vuln: q.vulnerability_id,
        bloc: q.bloc,
    }));

// Write to file
import { writeFileSync } from 'fs';
writeFileSync('_questions_ref.json', JSON.stringify(output, null, 2));
console.log('Exported', output.length, 'questions to _questions_ref.json');

// Summary
const byAidance = {};
output.forEach(q => {
    const k = q.aidance || 'NULL';
    byAidance[k] = (byAidance[k] || 0) + 1;
});
console.log('\nBy aidance:', byAidance);
