export interface DermaTopic {
  id: number;
  title: string;
  content: string;
}

export const DERMATOLOGIA_TOPICS: DermaTopic[] = [
  {
    id: 1,
    title: "Testes Diagnósticos em Dermatologia",
    content: `### Introdução
Ferramentas complementares essenciais. A maioria dos pacientes com lesões cutâneas deve passar por triagem dermatológica básica para confirmar ou descartar as afecções mais prevalentes.

---

### Raspado Cutâneo
**Indicações:** Sarcoptes, Notoedres, Cheyletiella, Demodex e Otodectes.
**Técnica:** Raspar com lâmina de bisturi seguindo o crescimento piloso. Raspados superficiais para Sarcoptes; profundos (com escarificação) para Demodex. Aplicar óleo mineral, examinar em objetiva 10x.

---

### Tricograma
**Indicações:** Avaliar extremidades, haste e raiz dos pelos; identificar fase de crescimento, defeitos de pigmentação, alopecias e ectoparasitas/fungos.
**Técnica:** Remover pelos com pinça hemostática, cobrir com óleo mineral, examinar em objetiva 10x.

---

### Imprint (Citologia)
**Indicações:** Identificar bactérias, fungos, ácaros e células inflamatórias. Lesões pruriginosas, pustulosas, crostosas, descamativas e alopécicas.
**Técnica:** Impressão direta em lâmina ou via fita adesiva. Em lesões crostosas/pustulosas, remover superfície ou romper a pústula antes de pressionar.
**Nota:** Estudos mostram superioridade da citologia por imprint em relação ao raspado cutâneo para identificação de Demodex.

---

### Lâmpada de Wood
**Indicações:** Triagem; Microsporum canis pode fluorescer positivamente.
**Técnica:** Avaliar haste do pelo em toda superfície cutânea. Sítios fluorescentes → focos para imprint, tricograma ou cultura fúngica.
**Atenção:** Lesões crostosas e resíduos de shampoos ou pomadas também podem fluorescer.

---

### Cultura Fúngica
**Indicações:** Diagnóstico definitivo de lesões fúngicas (dermatofitose, criptococose, esporotricose).
**Técnica:** Remover pelos da periferia de lesões recentes. Nunca usar pelos caídos. Acompanhar crescimento até 28 dias. Transferir colônias para lâmina com fita adesiva, analisar hifas e conídios.

---

### Cultura Bacteriana
**Indicações:** Suspeita de piodermites primárias ou secundárias, com teste de sensibilidade.
**Técnica:** Swabs estéreis de colaretes epidérmicos, pústulas lancetadas ou exsudatos superficiais.

---

### Swab Otológico
**Indicações:** Todos os tipos de otites.
**Técnica:** Com cotonete, coletar de ambos os condutos externos (canal horizontal) separadamente. Pode revelar Otodectes cyanotis, Malassezia ou bactérias.

---

### Aspirado com Agulha Fina (CAAF)
**Indicações:** Diagnóstico diferencial de processos neoplásicos, infecciosos e não neoplásicos. Excelente para nódulos e linfonodomegalias.
**Técnica:** Inserir agulha com movimentos de leque, expelir conteúdo em lâmina com seringa de ar. Alternativa: seringa 10mL com pressão negativa.

---

### Biópsia Cutânea
**Indicações:** Lesões persistentes/recidivantes, irresponsivas à terapia, suspeitas de neoplasia ou dermatoses infrequentes.
**Técnica:** Anestesia local com lidocaína. Punch ou bisturi (cunha). Armazenar em formalina. Requisição deve incluir histórico, evolução e suspeita clínica.

---

### Teste Alérgico
**Indicações:** Não diagnostica dermatopatias alérgicas — apenas auxilia na seleção de dietas e imunoterapia.`,
  },
  {
    id: 2,
    title: "Dermatite Alérgica a Picada de Ectoparasitas (DAPE)",
    content: `### Definição
Uma das principais reações de hipersensibilidade em dermatologia veterinária. A saliva da pulga é o principal fator ativador para liberação de substâncias antigênicas responsáveis pelo prurido cutâneo.

---

### Epidemiologia
Afeta cães e gatos de qualquer idade, raça ou sexo. Incomum em animais menores de 6 meses. Diagnóstico mais comum entre 3–6 anos.

---

### Apresentação Clínica

**Cães:**
- Lesões em região lombossacra, base da cauda, face caudomedial dos membros pélvicos, abdômen e flanco
- Hipotricose evoluindo para alopecia, eritema, crostas, hiperpigmentação, liquenificação

**Gatos:**
- Dermatite miliar
- Lesões em cabeça/pescoço
- Alopecia simétrica
- Complexo granuloma-eosinofílico

**Ambos:** Infecções secundárias (malasseziose e piodermites) aumentam o prurido.

---

### Diagnóstico
Associação de histórico, anamnese, exame físico, testes dermatológicos e diagnóstico terapêutico.

---

### Tratamento — Antiparasitários

**Bravecto® (Fluralaner) — Cães oral:**
- 2–4,5 kg → 112,5 mg
- 4,5–10 kg → 250 mg
- 10–20 kg → 500 mg
- 20–40 kg → 1.000 mg
- 40–56 kg → 1.400 mg
- Frequência: a cada 12 semanas

**Simparic® (Sarolaner) — Cães:**
- 1,3–2,5 kg → 5 mg
- 2,6–5 kg → 10 mg
- 5,1–10 kg → 20 mg
- 10,1–20 kg → 40 mg
- 20,1–40 kg → 80 mg
- 40,1–60 kg → 120 mg
- Frequência: a cada 30 dias

**Nexgard® (Afoxolaner) — Cães:**
- 2–4 kg → 11,3 mg
- 4,1–10 kg → 28,3 mg
- 10,1–25 kg → 68 mg
- 25,1–50 kg → 136 mg
- Frequência: a cada 30 dias

**Credeli® (Lotilaner) — Cães:**
- 1,3–2,5 kg → 56,25 mg
- 2,5–5,5 kg → 112,5 mg
- 5,5–11 kg → 225 mg
- 11–22 kg → 450 mg
- 22–45 kg → 900 mg
- Frequência: a cada 30 dias

**Bravecto Transdermal® — Gatos:**
- 1,2–2,8 kg → 112,5 mg
- 2,8–6,5 kg → 250 mg
- 6,25–12,5 kg → 500 mg
- Frequência: a cada 12 semanas (tópico)

---

### Controle Ambiental
Ciclo de vida da pulga: 12–190 dias. Lavar, varrer ou aspirar superfícies frequentemente. Vassoura de fogo eficaz para carrapatos. Isolar animais durante aplicação de produtos ambientais.

---

### Tratamento Complementar

**Controle de inflamação:**
- Prednisona (cães): 0,5 mg/kg, BID, 7–14 dias
- Prednisolona (gatos): 1 mg/kg, SID, 7–14 dias
- Cortavance® (aceponato de hidrocortisona tópico): 1–2 borrifadas/100 cm², SID, 5–7 dias

**Controle de prurido:**
- Oclacitinib (Apoquel®) cães: 0,4–0,6 mg/kg, BID, 14 dias → depois SID 7–14 dias
- Oclacitinib gatos (off-label): 1 mg/kg, BID

Infecções secundárias tratadas conforme afecção específica.`,
  },
  {
    id: 3,
    title: "Alergia (Hipersensibilidade) Alimentar (HA)",
    content: `### Definição
Reação alimentar pruriginosa, terceira principal dermatopatia alérgica em cães. Ocorre por ingestão de proteínas alimentares. Caráter não sazonal.

---

### Etiologia

**Cães:** carne bovina, frango, derivados de leite, trigo
**Gatos:** carne bovina, frango, peixe

---

### Epidemiologia
Cães jovens mais afetados (6 meses a 10 anos). Sem predisposição sexual ou racial definida.

---

### Apresentação Clínica
- Prurido consistente: generalizado ou focal (cães); facial (gatos)
- Placas, pústulas, eritema, crostas, descamação, alopecia autoinduzida
- Hiperpigmentação, hiperqueratose, liquenificação
- Face, membros e região ventral mais afetados
- Otites e infecções secundárias frequentes
- Sinais gastrointestinais (vômito/diarreia) em ~20% dos casos

---

### Diagnóstico
Diagnóstico por exclusão. Recomendações prévias:
- Controle antiparasitário (descartar DAPE)
- Testes dermatológicos: raspado, imprint, tricograma
- Dieta de eliminação: mínimo 8–12 semanas com proteínas nunca consumidas ou hidrolisadas
- Eliminar petiscos, brinquedos mastigáveis e medicações com ingredientes da dieta anterior

---

### Tratamento

**Dieta:** Proteínas hidrolisadas/ultrahidrolisadas comerciais ou caseiras balanceadas. Melhora mais expressiva a partir da 4ª semana.

**Para prurido intenso:**
- Prednisolona (gatos): 1 mg/kg, SID, 7 dias
- Prednisona (cães): 0,5–1 mg/kg, SID, 7 dias com desmame
- Oclacitinib (cães): 0,4–0,6 mg/kg, BID, 14 dias`,
  },
  {
    id: 4,
    title: "Dermatite Atópica Canina (DAC)",
    content: `### Definição
Doença alérgica altamente pruriginosa e prevalente. Estimada em 58% das doenças dermatológicas caninas.

---

### Etiologia e Epidemiologia
Geneticamente predisposta. Mais frequente em cães jovens (1–3 anos).
**Raças prevalentes:** Lhasa Apso, Poodle, Maltês, Shih Tzu, Pug, Bulldog Inglês, Bulldog Francês.

---

### Fisiopatologia
Reações mediadas por IgE contra alérgenos ambientais. Inflamação, alterações de barreira cutânea e disbiose interagem nas manifestações clínicas.

---

### Apresentação Clínica
- Prurido intenso, generalizado ou localizado (prurido primário)
- Crostas, alopecia, escoriações, eritema, discromia ferruginosa
- Disqueratinização, colaretes epidérmicos
- Evolução crônica: hiperpigmentação e liquenificação
- Otites externas em mais de 80% dos pacientes
- Lesões perioculares, peribucais, axilares frequentes
- Abdômen e tórax ventral muito afetados
- Infecções secundárias: malasseziose, piodermites

---

### Diagnóstico
Cães jovens com prurido intenso precedendo lesões. Triagem completa:
- Antiparasitários para descartar DAPE
- Raspado, imprint, tricograma, lâmpada de Wood, cultura fúngica
- Dieta de eliminação recomendada previamente
- Testes alérgicos (intradérmicos ou sorológicos) complementares

---

### Tratamento — Multimodal

**Todos os pacientes:** controle antiparasitário periódico obrigatório.

**Inflamação severa:**
- Prednisona/Prednisolona: 1–2 mg/kg, SID, 10–15 dias com desmame

**Lesões localizadas:**
- Cortavance® (aceponato de hidrocortisona): 1–2 borrifadas/100 cm², SID, 7 dias

**Controle sistêmico do prurido:**
- Oclacitinib (Apoquel®): 0,4–0,6 mg/kg, BID, 14 dias → depois SID

**Manutenção — imunomoduladores:**
- Ciclosporina: 5–7 mg/kg, SID (ação em 21–28 dias; administrar em jejum)
- Lokivetmab (Cytopoint®): 2 mg/kg, SC, a cada 4–8 semanas

**Terapia tópica:**
- Banhos 1–2x por semana durante crise
- Shampoos hidratantes: ureia, glicerina, Aloe vera, fitoesfingosina
- Restauração de barreira: Allerderm® spot on semanal, Dermocalmante® spot on semanal

**Imunoterapia:** Formulada com base em testes cutâneos/sorológicos.

**Infecções secundárias:** Tratadas conforme tipo (bacteriano/fúngico).

---

### Importante
Não existe cura para a DAC — apenas controle com foco na qualidade de vida.`,
  },
  {
    id: 5,
    title: "Dermatofitose",
    content: `### Definição
Uma das micoses superficiais mais comuns em cães e gatos. Zoonose causada por fungos dermatófitos que colonizam pele e pelos.

**Agentes:** Microsporum canis, Microsporum gypseum, Tricophyton mentagrophytes

---

### Epidemiologia
- Jovens mais afetados; idosos imunossuprimidos também
- Alta densidade populacional aumenta risco
- **Predisposição:** Yorkshire (cães) e Persa (gatos)
- Pelame longo mais afetado que curto

---

### Transmissão
Contato direto com animais/humanos infectados ou via fômites contaminados.

---

### Apresentação Clínica
- Lesões circulares escamosas com crescimento centrífugo
- Quebra de pelos e alopecia

**Cães:** Áreas alopécicas, lesões crostosas, eritema, hiperpigmentação. Prurido variável.
**Gatos:** Pelos tonsurados, descamação, crostas associadas à alopecia, hiperpigmentação.

---

### Diagnóstico

**Lâmpada de Wood:** Triagem. M. canis fluoresce. Resultado negativo não descarta.
**Citologia por imprint:** Triagem complementar.
**Cultura fúngica:** Teste definitivo. Pelos da periferia de lesões recentes.

---

### Tratamento

**Lesões superficiais/localizadas — tópico:**
- Shampoo clorexidine 2% + miconazol/cetoconazol 2%
- Banhos semanais, deixar agir mínimo 10 minutos
- Duração: até 2–4 semanas após cura clínica

**Lesões multifocais/generalizadas — sistêmico + tópico:**
- Itraconazol: 5–10 mg/kg, VO, SID/BID
- Fluconazol: 5 mg/kg, VO, SID
- Duração: até dois resultados negativos na cultura

---

### Controle Ambiental
Fungos viáveis por até 18 meses. Higienizar com:
- Cloreto de benzalcônio (Hysteril®, Herbalvet®)
- Hipoclorito de sódio 0,5%
- Formalina 10% (Lysoform®)`,
  },
  {
    id: 6,
    title: "Dermatite por Malassezia (MOG)",
    content: `### Definição
Malassezia sp é agente fúngico comensal da pele. O supercrescimento resulta em MOG — micose superficial comum em cães, rara em gatos.

**Locais normais de colonização:** canal auditivo externo, região perilabial, perianal, cavidade oral e dobras cutâneas.

---

### Fatores Predisponentes
- Aumento de umidade local
- Dobras cutâneas
- Alterações de pH cutâneo
- Piodermites
- Terapia com glicocorticoides e/ou antibióticos

---

### Apresentação Clínica
- Lesões eritematosas, crostosas, escamosas, alopécicas
- Hiperpigmentação, hiperqueratose, liquenificação
- Prurido moderado a intenso
- Odor desagradável
- Localização: abdômen ventral, face, membros, região perianal, dobras, ouvido externo

---

### Diagnóstico

**Citologia por imprint:** Principal teste. Diagnóstico confirmado com 5 ou mais leveduras por campo associado a lesões cutâneas.
**Biópsia:** Permite histopatologia; citologia geralmente mais simples.

---

### Tratamento

**Identificar causa primária** (dermatopatias alérgicas predispõem MOG).

**Terapia tópica:**
- Lesões disseminadas: shampoo clorexidine 2% + miconazol/cetoconazol 2%, banhos semanais
- Lesões focais: cremes/pomadas/loções com miconazol, cetoconazol ou nistatina

**Terapia sistêmica:**
- Itraconazol: 5 mg/kg, BID ou 10 mg/kg, SID com alimento
- Associado ao tópico para lesões severas/disseminadas
- Duração: 1–2 semanas após resultados negativos ou cura clínica

**Controle de prurido intenso:**
- Prednisona/Prednisolona: 0,5–1 mg/kg, SID/BID, com desmame gradual (25%/semana), 7–14 dias
- Oclacitinib (Apoquel®): 0,4–0,6 mg/kg, BID, 14 dias → depois SID
- Ciclosporina: 5–7 mg/kg, VO, SID ou a cada 48h`,
  },
  {
    id: 7,
    title: "Dermatite de Contato",
    content: `### Definição
Reação de hipersensibilidade desencadeada pelo contato direto com agente irritante ou alérgico (químicos, plantas, tecidos, fertilizantes, etc.).

---

### Epidemiologia
Cães e gatos de qualquer idade, raça ou sexo.

---

### Apresentação Clínica
- Prurido de grau variável
- Eritema, lesões vesiculares, erosões, úlceras, máculas, pápulas
- Hiperpigmentação e liquenificação (lesões secundárias)
- Áreas glabas mais afetadas: interdigitos, axilas, virilhas, períneo, queixo, região escrotal ou vulvar

---

### Diagnóstico
Diagnóstico de exclusão. Buscar histórico de agentes causais potenciais.

---

### Tratamento

**Primeiro passo:** Eliminar o agente causador ou proteger do contato.

**Glicocorticoides sistêmicos:**
- Prednisona/Prednisolona: 0,5–1 mg/kg, BID, 5–7 dias
- Alguns pacientes necessitam de cursos mais prolongados

**Corticoides tópicos:**
- Cortavance® (aceponato de hidrocortisona): 1–2 borrifadas/100 cm², SID, 7 dias

**Suporte:**
- Banhos com produtos hipoalergênicos para remover agentes irritantes — essencial no início do tratamento`,
  },
  {
    id: 8,
    title: "Demodiciose",
    content: `### Definição
Uma das dermatopatias parasitárias mais comuns em cães, primária ou secundária.

---

### Etiologia
- **Forma primária:** Alterações genéticas
- **Forma secundária:** Imunossupressão em doenças crônicas (hipercortisolismo, hipotireoidismo, neoplasias, dermatopatias alérgicas) ou terapia imunossupressora

---

### Apresentação Clínica

**Forma localizada:** Face, comissura labial, membros, região periocular. Alopecia, eritema, descamação, hiperqueratose.

**Forma generalizada:** Mais de 5 lesões em duas ou mais regiões. Piodermites e seborreia frequentes pela ação do ácaro nos folículos.

---

### Diagnóstico
Raspado cutâneo profundo + tricograma + imprint com fita adesiva. Biópsia útil para casos crônicos. Exames identificam: ovos, larvas, ninfas e adultos.

---

### Tratamento — Primeira Linha (Isoxazolinas)

**Bravecto® (Fluralaner) — a cada 12 semanas:**
- 2–4,5 kg → 112,5 mg
- 4,5–10 kg → 250 mg
- 10–20 kg → 500 mg
- 20–40 kg → 1.000 mg
- 40–56 kg → 1.400 mg

**Simparic® (Sarolaner) — a cada 30 dias:**
- 1,3–2,5 kg → 5 mg
- 2,6–5 kg → 10 mg
- 5,1–10 kg → 20 mg
- 10,1–20 kg → 40 mg
- 20,1–40 kg → 80 mg
- 40,1–60 kg → 120 mg

**Credeli® (Lotilaner) — a cada 30 dias:**
- 1,3–2,5 kg → 56,25 mg
- 2,5–5,5 kg → 112,5 mg
- 5,5–11 kg → 225 mg
- 11–22 kg → 450 mg
- 22–45 kg → 900 mg

---

### Terapia Complementar
- Prednisona/Prednisolona: 0,5 mg/kg, BID, 5–7 dias (controle de prurido)
- Banhos terapêuticos: clorexidine 2–4%, ureia 4%, glicerina 4%, Aloe vera 7%

---

### Monitoramento
- Raspados/imprints a cada 30 dias
- Manter isoxazolinas em intervalos regulares
- Tratar por mais 30 dias após dois resultados negativos
- Repetir teste 30 dias após suspensão

---

### Alternativas (quando Isoxazolinas indisponíveis)
- Ivermectina: 0,1–0,4 mg/kg, VO/SC, SID (menos segura, especialmente MDR1 mutantes)
- Moxidectina: 0,5 mg/kg, VO a cada 72h ou 0,05 mL/kg SC a cada 72h
- Doramectina: 0,6 mg/kg, SC, semanal ou a cada 15 dias
- Selamectina (Revolution®): spot on a cada 15–21 dias

---

### Gatos com Demodiciose
**Imidacloprida + Moxidectina (Advocate® gatos):**
- Até 4 kg → 1 bisnaga 0,4 mL semanal
- 4–10 kg → 1 bisnaga 1 mL semanal
- Manter até 2 raspados negativos`,
  },
  {
    id: 9,
    title: "Complexo Pênfigo",
    content: `### Definição
Grupo de dermatoses autoimunes incomuns. Lesões pustulares, vesículas, crostas, ulceração e erosão. Histopatologicamente: acantólise por autoanticorpos em zona interepidérmica.

---

### Tipos
- Foliáceo (mais comum)
- Eritematoso
- Vulgar
- Vegetante
- Paraneoplásico (associado a linfoma)
- Bolhoso (mais raro)

---

### Epidemiologia

**Pênfigo Foliáceo:** Média 4 anos. Raças: Akita, Chow Chow, Dachshund, Cocker Spaniel, Shar Pei.
**Pênfigo Eritematoso:** Qualquer raça; Collies, Pastor-Alemão, Shetland mais frequentes.
**Pênfigo Vulgar:** Raro, maior gravidade. Machos e Collies, Pastor-Alemão; idade média 6 anos.

---

### Apresentação Clínica

**Pênfigo Foliáceo:**
- Face (plano nasal, focinho, região periocular, bordas auriculares), tronco, coxins
- Geralmente não afeta mucosas
- Pápulas, escamas, eritema, colarinhos epidérmicos, hiperpigmentação/hipopigmentação

**Pênfigo Bolhoso:**
- Lesões bolhosas íntegras que podem romper/ulcerar
- Cabeça, orelhas, abdômen ventral, axilas, regiões inguinais
- Pode afetar mucosas (especialmente bucal)

---

### Diagnóstico

**Citologia:** Pode revelar queratinócitos acantolíticos.
**Biópsia cutânea com histopatologia:** Diagnóstico definitivo.
- Células acantolíticas
- Fendas intraepidérmicas
- Microabscessos

---

### Tratamento

**Terapia inicial — corticoides:**
- Prednisona: 2 mg/kg/dia, fracionado a cada 12h
- Redução gradual até menor dose efetiva (mínimo: 0,5 mg/kg a cada 48–72h)

**Imunomoduladores (associação/manutenção):**
- Azatioprina: 2 mg/kg, SID, com desmame gradual para a cada 48h
- Clorambucil: 0,1–0,2 mg/kg, SID → depois a cada 48h
- Ciclosporina: 5–20 mg/kg, SID, VO
- Micofenolato de mofetil: 10 mg/kg, TID → desmame gradual para BID → SID

**Duração:** Usualmente vitalícia. Monitoramento periódico essencial.

**Pênfigo Bolhoso — opção especial:**
- Niacinamida + Tetraciclina: >10 kg: 500 mg/animal TID; <10 kg: 250 mg/animal TID (4–8 semanas)
- Doxiciclina: 5 mg/kg, VO, BID, 4 semanas

**Tópico:**
- Hidrocortisona pomada/creme
- Opções mais potentes: valerato de betametasona 0,1%, acetonida de fluocinolona 0,1%
- Aplicação a cada 12h → desmame para 24h → 48h

**Suplementação:**
- Vitamina E: 400 UI/dia
- Óleo de peixe`,
  },
  {
    id: 10,
    title: "Lúpus Eritematoso Sistêmico (LES)",
    content: `### Definição
Doença crônica, inflamatória e autoimune. Formação massiva de imunocomplexos com envolvimento multissistêmico. Manifestações dermatológicas em ~50% dos pacientes.

---

### Epidemiologia
Cães jovens adultos (2–4 anos). Sem predileção sexual.
**Raças:** Poodles, Beagles, Pastor-Alemão, Pastor de Shetland.

---

### Apresentação Clínica

**Lesões cutâneas:**
- Vesicobolhosas, erosões, úlceras em zonas mucocutâneas
- Eritema, escamas, alopecia, lesões crostosas
- Localização: face, orelhas e extremidades distais; coxins frequentemente envolvidos

**Sinais extra-cutâneos:**
- Claudicação (poliartrite imunomediada)
- Febre
- Linfadenopatia
- Esplenomegalia

**Exames laboratoriais:**
- Proteinúria (lesões glomerulares)
- Anemia hemolítica
- Leucopenia
- Trombocitopenia

---

### Diagnóstico

**Biópsia cutânea:** Útil em casos selecionados; não diferencia tipos de lúpus.
**Teste ANA (anticorpos antinucleares):** Alta sensibilidade para detecção de anticorpos nucleares. Não 100% específico — falso-positivos possíveis.

---

### Tratamento

**Obrigatório:** Proteção contra exposição solar crônica.

**Primeira opção:**
- Prednisolona: 1–2 mg/kg, BID
- Manter até remissão clínica, depois desmame gradual até menor dose efetiva

**Pacientes não responsivos ao corticoide isolado:**
- Azatioprina: 2 mg/kg, SID
- Ciclosporina: 5–10 mg/kg, SID/BID
- Micofenolato de mofetila: 10 mg/kg, BID

Reavaliações hematológicas periódicas essenciais (monitorar efeitos adversos).`,
  },
  {
    id: 11,
    title: "Foliculite Bacteriana Superficial e Profunda",
    content: `### Definição
Processo inflamatório com infecção bacteriana do folículo piloso. Classificada em superficial ou profunda conforme localização abaixo do istmo infundibular.

---

### Etiologia
**Primária:** Rara.
**Secundária a:** Hipersensibilidades, imunossupressão, traumatismos, ectoparasitas, enfermidades endócrinas/metabólicas.
**Agente mais comum:** Staphylococcus pseudintermedius.

---

### Apresentação Clínica
Pápulas, pústulas, escoriações, colarinhos epidérmicos, alopecia, hiperpigmentação, crostas melicéricas e hemáticas. Foliculite superficial não tratada pode evoluir para profunda e furunculose.

---

### Diagnóstico
- Citologia: identifica bactérias em lesões suspeitas
- Quadros recidivantes: cultura e antibiograma com teste para oxaciclina (multirresistência por S. pseudintermedius)

---

### Tratamento

**Foliculite superficial — tópico (estratégia principal):**

Antissépticos:
- Mousse, shampoo ou lenços com clorexidine 1–4%
- Triclosan 0,5–1%, 2–3x por semana (quadros leves)
- Peróxido de benzoíla (avaliar ressecamento)

Antimicrobianos tópicos — aplicação a cada 24h, 2–4 semanas:
- Ácido fusídico 1%
- Mupirocina 2%
- Gentamicina 0,3%
- Neomicina 0,5–1%
- Clindamicina 2–3%
- Amicacina 1%

---

**Foliculite superficial arresponsiva + foliculite profunda — sistêmico:**

- Cefalexina: 30 mg/kg, BID
- Amoxicilina + Clavulanato: 25 mg/kg, BID
- Clindamicina: 5–11 mg/kg, BID
- Sulfametoxazol + Trimetoprim: 15–30 mg/kg, BID

**Duração:** Foliculites profundas: 45–60 dias (+ 14 dias após remissão).
**Infecções multirresistentes:** Investigar com testes de sensibilidade.`,
  },
  {
    id: 12,
    title: "Otocaríase (Escabiose Otológica)",
    content: `### Definição
Enfermidade parasitária contagiosa, zoonótica e altamente pruriginosa. Comum em climas tropicais.

---

### Etiologia
- **Cães:** Sarcoptes scabiei
- **Gatos:** Notoedres cati

---

### Transmissão
Contato direto com animais infectados ou via fômites contaminados.

---

### Apresentação Clínica

**Cães:** Eritema, crostas, hiperpigmentação, alopecia. Áreas com baixa densidade pilosa: bordas auriculares, axilas, dígitos, região ventral abdominal, periocular, perilabial. Quadros crônicos: perda de peso e anorexia.

**Gatos:** Altamente pruriginoso. Eritema, crostas, alopecia em bordas auriculares, região periocular, pescoço e membros torácicos.

---

### Diagnóstico
Raspado cutâneo + identificação do ácaro. Falso-negativo possível. Lesões crostosas na face são bons sítios de coleta. Imprint eficaz em cães.

Reflexo otopodal pode ocorrer, mas não confirma/descarta o diagnóstico.

---

### Tratamento

**Cães:**
- Sarolaner (Simparic®): 3 tratamentos com intervalo de 15 dias
- Selamectina spot on (Revolution®): a cada 15 dias, 3 administrações

**Gatos:**
- Selamectina spot on (Revolution®): a cada 15 dias, 3 administrações

**Alternativa oral (menos segura):**
- Ivermectina: 0,4 mg/kg, VO/SC a cada 7–15 dias, 2–3 repetições

**Controle ambiental:**
- Amitraz: 4 mL em 1L de água, aplicações semanais por 4 semanas
- Isolar animais antes da aplicação (alta toxicidade)`,
  },
  {
    id: 13,
    title: "Otite Externa Estenosante",
    content: `### Definição
Também chamada de hiperplásica. Decorrente de inflamação crônica do conduto auditivo. Em estágios avançados, a hiperplasia gera oclusão tecidual parcial ou total.

---

### Etiologia
Associada a quadros crônicos de inflamação e/ou infecção dos condutos.

---

### Apresentação Clínica
- Alto grau de inflamação e edema
- Progressão gera oclusão do conduto, dificultando a inspeção otoscópica

---

### Diagnóstico
- Citologia e otoscopia sempre que possível
- Infecções secundárias bacterianas/fúngicas comuns
- Casos avançados: tomografia computadorizada e ressonância magnética para avaliar extensão (possível otite média/interna)

---

### Tratamento

**Identificar e corrigir a causa de base — essencial.**

**Anti-inflamatórios:**
- Prednisona: 0,25–0,5 mg/kg, BID, cursos curtos (3–5 dias)

**Corticoides tópicos locais:**
- Com vídeo otoscopia disponível
- Sob anestesia
- Supervisão de dermatologista veterinário

**Casos avançados com estenose grave:** Manejo cirúrgico — ablação parcial ou total do conduto.`,
  },
  {
    id: 14,
    title: "Otite Externa Supurativa/Exsudativa",
    content: `### Definição
Tende a ser crônica, caracterizada por secreção excessiva de infecções bacterianas ou fúngicas.

---

### Apresentação Clínica
- Secreção otológica abundante, coloração variável, odor marcante
- Condutos eritematosos e ulcerados — dolorosos em grau variável

---

### Diagnóstico
- Otoscopia, vídeo otoscopia e citologia de ambos os condutos — essenciais
- Citologia: bactérias (cocos ou bacilos) e/ou fungos
- Casos crônicos: avaliar membrana timpânica com vídeo otoscopia
- Suspeita de lesões estruturais: tomografia e ressonância

---

### Tratamento

**Lavagem do conduto** (pacientes aptos para anestesia geral):
- Tris-EDTA ou N-acetilcisteína 10–20 mg/mL (rompe biofilme bacteriano)
- Solução salina 0,9% ou clorexidine 0,05–0,2% (recurso mecânico)
- **Gatos:** Contraindicado clorexidine → usar apenas solução salina

**Terapia antimicrobiana tópica — guiada pela citologia:**
Usar somente produtos veterinários livres de ototoxicidade. Confirmar integridade da membrana timpânica antes de instilação.

**Cocos gram positivos:**
- Neomicina, Gentamicina, Florfenicol

**Bacilos gram negativos (mais graves):**
- Ciprofloxacina, Enrofloxacina, Orbifloxacina, Amicacina, Tobramicina, Polimixina B

Duração: 2–4 semanas.

**Casos refratários:** Antimicrobiano sistêmico guiado por cultura/antibiograma.

**Anti-inflamatórios:**
- Condutos eritematosos/estenosados: Prednisona/Prednisolona 0,25–0,5 mg/kg, BID, 3–5 dias`,
  },
  {
    id: 15,
    title: "Otite Ceruminosa",
    content: `### Definição
Mudanças quantitativas ou qualitativas do cerúmen, secundárias a infecções ou distúrbios de queratinização (como dermatite seborreica).

---

### Etiologia
Primária ou secundária a:
- Otocaríase (Otodectes cynotis; Demodex sp)
- Otomicose (Malassezia pachydermatis)

---

### Apresentação Clínica
- Prurido otológico em diferentes graus
- Meneios cefálicos podem ou não estar presentes

---

### Diagnóstico
- Otoscopia: aumento da quantidade de cerúmen
- Citologia e exame parasitológico em todos os casos para descartar otocaríase e otomicose

---

### Tratamento

**Limpeza auricular prévia — essencial em todos os casos:**
- Produto ceruminolítico veterinário em quantidade suficiente para preencher toda a orelha
- Frequência: a cada 12h, 3–5 dias (conforme volume de cerúmen)
- Após o último dia de limpeza: iniciar tratamento específico conforme causa`,
  },
  {
    id: 16,
    title: "Otite Eczematosa",
    content: `### Definição
Caracterizada por presença extensa de eczema (inflamação) e cerúmen.

---

### Etiologia
Associada a condições alérgicas:
- Dermatite alérgica a picada de ectoparasitas (DAPE)
- Hipersensibilidade alimentar (HA)
- Atopia

E a otites por:
- Ácaros
- Fungos (especialmente Malassezia pachydermatis)

---

### Apresentação Clínica
- Prurido otológico em diferentes graus
- Meneios cefálicos podem ou não estar presentes
- Lesões cutâneas diversas ao exame físico (maioria dos pacientes é alérgica)

---

### Diagnóstico
- Avaliação física minuciosa (doenças alérgicas altamente relacionadas)
- Otoscopia: lesão em "formação sagu/caviar" — característica deste tipo
- Citologia para descartar otites parasitárias e fúngicas

---

### Tratamento

Varia conforme causa de base. Pacientes alérgicos devem ser triados para diagnóstico correto.

**Agentes ceruminolíticos:**
- Necessidade depende da quantidade de cerúmen
- Excesso de produção: ceruminolíticos veterinários 5–7 dias antes da terapia tópica específica

**Direcionamento terapêutico:**
A análise citológica direciona o uso de produtos comerciais com antibióticos, antifúngicos e glicocorticoides conforme necessidade.`,
  },
];
