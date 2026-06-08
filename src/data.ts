export const PANELS = [
  { n: "Gastrointestinal", c: 9, i: "M7 4h10M7 4v5a5 5 0 0 0 10 0V4M9 20h6", items: ["Secrecao de pepsina", "Peristaltismo gastrico", "Absorcao gastrica", "Peristaltismo intestino delgado", "Absorcao intestino delgado", "Peristaltismo intestino grosso", "Absorcao do colon", "Bacterias intestinais", "Pressao intraluminal"] },
  { n: "Hepatobiliar", c: 7, i: "M3 7h18l-2 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z", items: ["Metabolismo de proteinas", "Producao de energia", "Desintoxicacao", "Secrecao de bilis", "Gordura do figado", "Bilirrubina total (TBIL)", "Bilirrubina direta (DBIL)"] },
  { n: "Renal", c: 4, i: "M12 3C9 7 6 9 6 13a6 6 0 0 0 12 0c0-4-3-6-6-10z", items: ["Urobilinogenio", "Acido urico", "Nitrogenio ureico", "Proteina urinaria"] },
  { n: "Pulmonar", c: 4, i: "M12 4v9M12 13c-1 5-4 7-7 7-1 0-2-3-2-7s3-6 5-6M12 13c1 5 4 7 7 7 1 0 2-3 2-7s-3-6-5-6", items: ["Atividade pulmonar (VC)", "Capacidade pulmonar total (TLC)", "Resistencia das vias aereas (RAM)", "Oxigenio arterial (PaCO2)"] },
  { n: "Circulacao sanguinea", c: 8, i: "M3 12h4l2 5 4-12 2 7h6", items: ["Viscosidade do sangue", "Cristais de colesterol", "Gordura do sangue", "Resistencia vascular", "Elasticidade vascular", "HDL-C", "LDL-C", "Triglicerideos"] },
  { n: "Esqueletico", c: 7, i: "M7 4v4M17 4v4M7 16v4M17 16v4M7 8c2 1 8 1 10 0M7 16c2-1 8-1 10 0M9 8v8M15 8v8", items: ["Calcificacao cervical", "Calcificacao lombar", "Osteoporose", "Osteoclastos", "Perda de calcio", "Hiperplasia ossea", "Densidade ossea"] },
  { n: "Imunologico", c: 9, i: "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z", items: ["Linfonodo", "Amigdalas", "Medula ossea", "Baco", "Timo", "Imunoglobulina", "Imunidade respiratoria", "Imunidade gastrointestinal", "Imunidade da mucosa"] },
  { n: "Tireoide", c: 4, i: "M12 3a4 4 0 0 0-4 4c0 3-2 4-2 7a6 6 0 0 0 12 0c0-3-2-4-2-7a4 4 0 0 0-4-4z", items: ["T4 livre", "Tiroglobulina", "Anticorpos antitireoglobulina", "T3"] },
  { n: "Minerais", c: 19, i: "M12 2l9 5v10l-9 5-9-5V7z", items: ["Calcio", "Ferro", "Zinco", "Selenio", "Fosforo", "Potassio", "Magnesio", "Cobre", "Cobalto", "Manganes", "Iodo", "Niquel", "Fluor", "Molibdenio", "Vanadio", "Estanho", "Silicio", "Estroncio", "Boro"] },
  { n: "Vitaminas", c: 10, i: "M9 3h6v4l-2 2v8a2 2 0 0 1-2 2 2 2 0 0 1-2-2V9L9 7z", items: ["A", "B1", "B2", "B3", "B6", "B12", "C", "D3", "E", "K"] },
  { n: "Aminoacidos", c: 10, i: "M6 6a6 6 0 0 0 0 12M18 6a6 6 0 0 1 0 12M6 12h12", items: ["Lisina", "Triptofano", "Fenilalanina", "Metionina", "Treonina", "Isoleucina", "Leucina", "Valina", "Histidina", "Arginina"] },
  { n: "Coenzimas", c: 6, i: "M12 3v6m0 6v6M5 7l5 3m4 4l5 3M5 17l5-3m4-4l5-3", items: ["Nicotinamida", "Biotina", "Acido pantotenico", "Acido folico", "Coenzima Q10", "Glutationa"] },
  { n: "Metais pesados", c: 8, i: "M5 3h14v4l-5 5 5 5v4H5v-4l5-5-5-5z", items: ["Chumbo", "Mercurio", "Cadmio", "Cromio", "Arsenico", "Antimonio", "Talio", "Aluminio"] },
  { n: "Colageno", c: 12, i: "M4 8c4-4 12-4 16 0M4 16c4 4 12 4 16 0M4 8v8M20 8v8", items: ["Olhos", "Dentes", "Cabelo / pele", "Circulacao coracao / cerebro", "Estomago / intestinal", "Sistema imunologico", "Articulacoes", "Tecido muscular", "Metabolismo da gordura", "Desintoxicacao / metabolismo", "Sistema nervoso", "Esqueleto"] },
  { n: "Alergenos", c: 12, i: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM4 12h16M12 4v16", items: ["Medicamentos", "Alcool", "Polen", "Antibioticos", "Fibra quimica", "Tintas / vernizes", "Poeira", "Fumos", "Corante de tintas de cabelo", "Acessorios de metal", "Marisco", "Proteina do leite"] },
  { n: "Pele", c: 5, i: "M12 3a5 5 0 0 0-5 5c0 4 5 13 5 13s5-9 5-13a5 5 0 0 0-5-5z", items: ["Radicais livres", "Colageno da pele", "Imunidade da pele", "Hidratacao", "Elasticidade"] },
  { n: "Olhos", c: 5, i: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", items: ["Colageno / rugas", "Obstrucao linfatica", "Afrouxamento / queda", "Edema", "Atividade celular"] }
];

export const FAQ = [
  ["O exame substitui exames laboratoriais?", "Nao. A Utopet e uma ferramenta de triagem e bem-estar que oferece um panorama amplo e nao invasivo. Ela complementa a avaliacao clinica e ajuda a direcionar exames complementares quando necessario."],
  ["Preciso de algum preparo no pet?", "Nao ha jejum, coleta ou sedacao. A leitura e nao invasiva e leva poucos minutos, com o pet acordado e confortavel."],
  ["Funciona para caes e gatos?", "Sim. O software ajusta a interpretacao dos parametros conforme a especie, gerando um relatorio especifico para cada paciente."],
  ["O relatorio leva a marca da minha clinica?", "Sim. O documento entregue ao tutor sai com a identidade da sua clinica, reforcando o seu posicionamento."],
  ["Qual o investimento?", "Trabalhamos com comodato, compra parcelada e condicao para redes. Os valores sao apresentados na proposta, de acordo com o modelo escolhido e o porte da clinica."],
  ["A equipe precisa de treinamento tecnico?", "O treinamento e rapido e incluso. Em uma sessao a equipe ja opera o aparelho e interpreta o relatorio com seguranca."]
];
