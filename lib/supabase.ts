import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isMissingCredentials = !supabaseUrl || !supabaseAnonKey;

export const supabase: SupabaseClient = isMissingCredentials
  ? (null as unknown as SupabaseClient)
  : createClient(supabaseUrl, supabaseAnonKey);

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
