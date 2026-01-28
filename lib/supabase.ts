import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para a tabela de medicamentos
export interface Medication {
  id: string;
  name: string;
  category: string;
  indication: string;
  dosagedog: string;
  dosagecat: string;
  notes: string | null;
  description: string | null;
}
