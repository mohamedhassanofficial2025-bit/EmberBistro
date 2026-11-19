import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://ifikukoynoxstjozoepd.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmaWt1a295bm94c3Rqb3pvZXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzA3OTEsImV4cCI6MjExMDUwNjc5MX0.Lh9IsLzH2BJYTr6GXvkLLX784doDyzuNbGBsE-GripY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
