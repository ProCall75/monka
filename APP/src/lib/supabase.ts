import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mbxeqrvofrmhqlwlefff.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieGVxcnZvZnJtaHFsd2xlZmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDAwMDUsImV4cCI6MjA4NjIxNjAwNX0.GhV05FiBjI66m6MPsx8HFEuId9POyZaYxDSSU68jCcI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
