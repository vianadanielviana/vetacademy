import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://ieyjfxuthwgbrgswceko.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWpmeHV0aHdnYnJnc3djZWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMjA4OTMsImV4cCI6MjA4NDU5Njg5M30.PaLFzbvo611cDcDrFsHVHrMkuT63HaO5U4Z_t8L8IeI";

export const isMissingCredentials = false;

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
);

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
