import { createClient } from '@supabase/supabase-js';

const sb = createClient(
    'https://mbxeqrvofrmhqlwlefff.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieGVxcnZvZnJtaHFsd2xlZmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDAwMDUsImV4cCI6MjA4NjIxNjAwNX0.GhV05FiBjI66m6MPsx8HFEuId9POyZaYxDSSU68jCcI'
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
