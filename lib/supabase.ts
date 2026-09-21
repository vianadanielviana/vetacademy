import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isMissingCredentials = !supabaseUrl || !supabaseAnonKey;

// Initialize Supabase safely without crashing on empty credentials
export const supabase: SupabaseClient = createClient(
  supabaseUrl.startsWith("http")
    ? supabaseUrl
    : "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
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

export const FALLBACK_MEDICATIONS: Medication[] = [
  {
    id: "med-1",
    name: "Amoxicilina + Clavulanato de Potássio",
    category: "Antimicrobiano",
    indication: "Infecções bacterianas do trato respiratório, urinário, pele e tecidos moles.",
    dosagedog: "12,5 a 25 mg/kg, VO ou SC, a cada 12 horas.",
    dosagecat: "12,5 a 20 mg/kg, VO, a cada 12 horas.",
    notes: "Administrar junto com alimento para reduzir êmese.",
    description: "Associação bactericida de amplo espectro eficaz contra bactérias gram-positivas e gram-negativas produtoras de beta-lactamase.",
  },
  {
    id: "med-2",
    name: "Meloxicam",
    category: "Anti-inflamatório (AINE)",
    indication: "Controle da dor e inflamação musculoesquelética, pós-operatório e osteoartrite.",
    dosagedog: "Dose de ataque: 0,2 mg/kg no 1º dia; manutenção: 0,1 mg/kg a cada 24 horas (VO/SC).",
    dosagecat: "0,05 a 0,1 mg/kg dose única no pré/pós-op; uso crônico com cautela máxima (0,01-0,03 mg/kg).",
    notes: "Contraindicado em nefropatas descompensados, hipotensão, choque e úlcera gastrointestinal.",
    description: "Anti-inflamatório não esteroidal preferencial COX-2 com propriedades analgésicas e antipiréticas.",
  },
  {
    id: "med-3",
    name: "Dipirona Sódica",
    category: "Analgésico / Antipirético",
    indication: "Dor leve a moderada, febre, cólica e espasmos viscerais.",
    dosagedog: "25 mg/kg, IV, IM ou VO, a cada 8 a 12 horas.",
    dosagecat: "12,5 a 25 mg/kg, VO ou SC, a cada 12 a 24 horas (uso com monitoramento).",
    notes: "Evitar injeção IV rápida para prevenir hipotensão reflexa.",
    description: "Analgésico e antipirético de ação central com leve efeito espasmolítico.",
  },
  {
    id: "med-4",
    name: "Cloridrato de Tramadol",
    category: "Analgésico Opioide",
    indication: "Controle de dor moderada a intensa pós-cirúrgica, oncológica e ortopédica.",
    dosagedog: "2 a 5 mg/kg, VO, SC ou IV lento, a cada 8 horas.",
    dosagecat: "1 a 2 mg/kg, VO ou SC, a cada 12 horas (sabor amargo, pode causar sialorréia).",
    notes: "Pode causar sedação ou disfória. Não associar a inibidores da MAO.",
    description: "Agonista opioide sintético de ação central com inibição de recaptação de serotonina e noradrenalina.",
  },
  {
    id: "med-5",
    name: "Enrofloxacina",
    category: "Antimicrobiano (Fluoroquinolona)",
    indication: "Piodermites graves, infecções geniturinárias, pneumonia e otites.",
    dosagedog: "5 mg/kg, VO, SC ou IV lento, a cada 24 horas (ou 2,5 mg/kg a cada 12h).",
    dosagecat: "5 mg/kg, VO ou SC, a cada 24 horas (não exceder 5 mg/kg pelo risco de degeneração retiniana).",
    notes: "Evitar em animais em crescimento devido a lesão em cartilagens articulares.",
    description: "Fluoroquinolona bactericida concentração-dependente com excelente penetração tecidual.",
  },
  {
    id: "med-6",
    name: "Furosemida",
    category: "Diurético de Alça",
    indication: "Edema pulmonar cardiogênico, insuficiência cardíaca congestiva, oligúria.",
    dosagedog: "1 a 4 mg/kg, IV, IM ou VO, a cada 8 a 12 horas (até 8 mg/kg em crise aguda).",
    dosagecat: "1 a 2 mg/kg, IV, IM ou VO, a cada 12 a 24 horas.",
    notes: "Monitorar eletrólitos (K+), função renal e hidratação.",
    description: "Diurético potente que atua inibindo o cotransportador Na+/K+/2Cl- na alça de Henle.",
  },
  {
    id: "med-7",
    name: "Pimobendan",
    category: "Cardiovascular (Inodilatador)",
    indication: "Degeneração mixomatosa da valva mitral e cardiomiopatia dilatada.",
    dosagedog: "0,25 mg/kg, VO, a cada 12 horas (administrar 1h antes da refeição).",
    dosagecat: "0,15 a 0,3 mg/kg, VO, a cada 12 horas.",
    notes: "A absorção diminui drasticamente se administrado com alimento.",
    description: "Sensibilizador de cálcio e inibidor da fosfodiesterase III gerando inotropismo positivo e vasodilatação.",
  },
  {
    id: "med-8",
    name: "Prednisolona",
    category: "Glicocorticoide",
    indication: "Doenças autoimunes, processos inflamatórios alérgicos e dermatopatias imunes.",
    dosagedog: "Anti-inflamatório: 0,5 a 1 mg/kg/dia; Imunossupressor: 2 a 4 mg/kg/dia (VO).",
    dosagecat: "Anti-inflamatório: 1 a 2 mg/kg/dia; Imunossupressor: 2 a 4 mg/kg/dia (VO).",
    notes: "Desmame gradual obrigatório após uso prolongado para evitar crise addisoniana.",
    description: "Corticosteroide de ação intermediária com potente efeito anti-inflamatório e imunossupressor.",
  },
  {
    id: "med-9",
    name: "Maropitant (Cerenia)",
    category: "Antiemético",
    indication: "Prevenção e tratamento de êmese aguda e enjoo de movimento.",
    dosagedog: "1 mg/kg, SC a cada 24 horas; ou 2 mg/kg VO a cada 24h para êmese aguda.",
    dosagecat: "1 mg/kg, SC ou VO, a cada 24 horas.",
    notes: "Refrigeração do frasco reduz a dor à injeção subcutânea.",
    description: "Antagonista potente e seletivo do receptor neurocinina-1 (NK-1) bloqueando a substância P.",
  },
  {
    id: "med-10",
    name: "Ondansetrona",
    category: "Antiemético",
    indication: "Controle de náusea refratária, quimioterapia, pancreatite e parvovirose.",
    dosagedog: "0,2 a 0,5 mg/kg, IV lento ou VO, a cada 8 a 12 horas.",
    dosagecat: "0,2 a 0,5 mg/kg, IV lento ou VO, a cada 8 a 12 horas.",
    notes: "Muito segura e sem os efeitos extrapiramidais da metoclopramida.",
    description: "Antagonista altamente seletivo dos receptores de serotonina 5-HT3 no centro do vômito e TGI.",
  },
  {
    id: "med-11",
    name: "Diazepam",
    category: "Benzodiazepínico / Anticonvulsivante",
    indication: "Status epilepticus, sedação para procedimentos e estimulante de apetite em gatos.",
    dosagedog: "Crise convulsiva: 0,5 a 1 mg/kg, IV ou retal (repetir até 3x se necessário).",
    dosagecat: "0,5 a 1 mg/kg, IV ou retal. Atenção: uso oral prolongado pode causar necrose hepática em felinos.",
    notes: "Sensível à luz e adsorve em plástico PVC. Administrar imediatamente após aspiração.",
    description: "Modulador alostérico positivo dos receptores GABA-A no sistema nervoso central.",
  },
  {
    id: "med-12",
    name: "Midazolam",
    category: "Benzodiazepínico",
    indication: "Sedação pré-anestésica, contenção química e controle de convulsões agudas.",
    dosagedog: "0,2 a 0,4 mg/kg, IV ou IM.",
    dosagecat: "0,2 a 0,5 mg/kg, IV ou IM.",
    notes: "Excelente absorção intramuscular ao contrário do diazepam; hidrossolúvel.",
    description: "Benzodiazepínico de ação curta com efeito sedativo, ansiolítico e miorrelaxante.",
  },
  {
    id: "med-13",
    name: "Omeprazol",
    category: "Gastroprotetor",
    indication: "Gastrite erosiva, úlceras gástricas, esofagite de refluxo e profilaxia de AINEs.",
    dosagedog: "1 mg/kg, VO ou IV lento, a cada 12 a 24 horas.",
    dosagecat: "0,7 a 1 mg/kg, VO ou IV lento, a cada 12 a 24 horas.",
    notes: "Administrar em jejum pela manhã para máxima eficácia biológica.",
    description: "Inibidor irreversível da bomba de prótons H+/K+ ATPase nas células parietais gástricas.",
  },
  {
    id: "med-14",
    name: "Cefalexina",
    category: "Antimicrobiano (Cefalosporina 1ªG)",
    indication: "Piodermites bacterianas estafilocócicas, feridas cirúrgicas e infecções ósseas.",
    dosagedog: "20 a 30 mg/kg, VO, a cada 12 horas.",
    dosagecat: "20 a 30 mg/kg, VO, a cada 12 horas.",
    notes: "Primeira escolha para foliculite bacteriana canina superficial.",
    description: "Cefalosporina bactericida tempo-dependente com excelente espectro anti-estafilococo.",
  },
  {
    id: "med-15",
    name: "Gabapentina",
    category: "Analgésico / Neuromodulador",
    indication: "Dor neuropática, dor crônica osteoartrítica e contenção de estresse em felinos.",
    dosagedog: "5 a 10 mg/kg a cada 8 a 12h (dor neuropática).",
    dosagecat: "5 a 10 mg/kg a cada 8-12h para dor; 50 a 100 mg/gato dose única 90min antes de consulta.",
    notes: "Evitar formulações humanas contendo xilitol (letal para cães).",
    description: "Análogo de GABA que se liga à subunidade alfa-2-delta dos canais de cálcio voltagem-dependentes.",
  },
  {
    id: "med-16",
    name: "Dexametasona (Fosfato Dissódico)",
    category: "Glicocorticoide",
    indication: "Choque anafilático, edema cerebral, teste de supressão adrenal e anti-inflamatório.",
    dosagedog: "Anti-inflamatório: 0,1 a 0,2 mg/kg, IV/IM; Choque/Emergência: 1 a 2 mg/kg IV.",
    dosagecat: "Anti-inflamatório: 0,1 a 0,2 mg/kg, IV/IM; Choque: 1 a 2 mg/kg IV.",
    notes: "Potência cerca de 7 a 10 vezes superior à prednisolona; sem retenção de sódio.",
    description: "Corticosteroide de longa ação sem efeito mineralocorticoide.",
  },
  {
    id: "med-17",
    name: "Metronidazol",
    category: "Antimicrobiano / Antiprotozoário",
    indication: "Giardíase, infecções por anaeróbios estritos e diarreias inflamatórias crônicas.",
    dosagedog: "15 a 25 mg/kg, VO ou IV lento, a cada 12 horas.",
    dosagecat: "10 a 15 mg/kg, VO, a cada 12 horas.",
    notes: "Superdosagem pode induzir ataxia, nistagmo e neurotoxicidade.",
    description: "Nitroimidazol com atividade bactericida seletiva contra bactérias anaeróbias e protozoários.",
  },
  {
    id: "med-18",
    name: "Doxiciclina",
    category: "Antimicrobiano (Tetraciclina)",
    indication: "Erliquiose, anaplasmose, hemoplasmose, micoplasmose e leptospirose.",
    dosagedog: "5 a 10 mg/kg, VO, a cada 12 horas por 28 dias para hemoparasitoses.",
    dosagecat: "5 a 10 mg/kg, VO, a cada 12 ou 24 horas (fornecer 5-10 ml de água após dose em gatos).",
    notes: "Em gatos, comprimidos presos no esôfago podem causar estenose esofágica estenosante grave.",
    description: "Tetraciclina de 2ª geração lipofílica com excelente penetração intracelular e menor quelação.",
  },
];

