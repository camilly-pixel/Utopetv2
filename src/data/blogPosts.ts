// Gerado a partir do pacote do blog (LEIA-ME). Cada post só aparece a partir de publishAt (horário de Brasília).
// Para programar novos posts, acrescente objetos neste array com a data desejada.
export type BlogPost = {
  slug: string; publishAt: string; image: string; temas: string[]; readTime: number; categoria: string;
  title: string; metaTitle: string; description: string; jsonLd: object[]; html: string;
};

export const BLOG_TEMAS: { id: string; label: string }[] = [
  { id: 'alimentacao', label: 'Alimentação' },
  { id: 'sintomas', label: 'Sintomas' },
  { id: 'longevidade', label: 'Longevidade' },
  { id: 'prevencao', label: 'Prevenção' },
  { id: 'veterinarios', label: 'Para veterinários' },
];

export const BLOG_POSTS: BlogPost[] = [
 {
  "slug": "quanto-tempo-vive-um-cachorro",
  "publishAt": "2026-11-25",
  "image": "/pet-labrador-idoso.jpg",
  "temas": [
   "longevidade"
  ],
  "readTime": 4,
  "categoria": "Longevidade",
  "title": "Quanto tempo vive um cachorro?",
  "metaTitle": "Quanto tempo vive um cachorro? Expectativa por porte | Utopet",
  "description": "Um cachorro vive em média de 10 a 13 anos, e o porte muda muito essa conta. Veja a expectativa por tamanho e o que ajuda seu cão a viver mais.",
  "jsonLd": [
   {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Quanto tempo vive um cachorro?",
    "description": "Um cachorro vive em média de 10 a 13 anos, e o porte muda muito essa conta. Veja a expectativa por tamanho e o que ajuda seu cão a viver mais.",
    "inLanguage": "pt-BR",
    "mainEntityOfPage": "https://utopet.com.br/blog/quanto-tempo-vive-um-cachorro",
    "publisher": {
     "@type": "Organization",
     "name": "Utopet",
     "url": "https://utopet.com.br"
    },
    "datePublished": "2026-11-25",
    "dateModified": "2026-11-25",
    "image": "https://utopet.com.br/pet-labrador-idoso.jpg"
   },
   {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
     {
      "@type": "Question",
      "name": "Qual raça de cachorro vive mais?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Raças pequenas lideram. Chihuahua e Lulu da Pomerânia aparecem com médias de 14 a 17 anos."
      }
     },
     {
      "@type": "Question",
      "name": "Fêmea vive mais que macho?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Um pouco. No estudo britânico, a mediana foi de 12,7 anos para fêmeas e 12,4 para machos."
      }
     },
     {
      "@type": "Question",
      "name": "Quando o cachorro é considerado idoso?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Em geral a partir dos 7 anos, e mais cedo nos cães grandes e gigantes."
      }
     },
     {
      "@type": "Question",
      "name": "Um ano de cachorro equivale a sete humanos?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Não. O primeiro ano equivale a cerca de 15 anos humanos e o segundo a mais 9. Depois disso, o ritmo depende do porte."
      }
     }
    ]
   }
  ],
  "html": "<div class=\"cabeca\"><div class=\"coluna\">\n<p class=\"trilha\"><a href=\"/blog\">Blog</a> / Longevidade</p>\n<h1>Quanto tempo vive um cachorro?</h1>\n<div class=\"resposta\"><p class=\"resposta-rotulo\">Resposta rápida</p><p>Um cachorro vive em média de 10 a 13 anos. O porte é o fator que mais pesa: cães pequenos costumam passar dos 14 anos, enquanto cães gigantes vivem perto de 10. Formato do focinho, peso e cuidados preventivos também mudam essa conta.</p></div>\n</div></div>\n<article class=\"coluna\">\n<section aria-labelledby=\"pontos-t\" class=\"pontos\"><h2 id=\"pontos-t\">Pontos-chave</h2><ul><li>Em um grande estudo britânico, a mediana de vida dos cães foi de 12,5 anos.</li><li>Cães pequenos e de focinho longo vivem mais; cães grandes e de focinho achatado, menos.</li><li>Fêmeas vivem um pouco mais que machos.</li><li>Estudos apontam vantagem de longevidade para cães sem raça definida.</li></ul></section>\n<nav aria-labelledby=\"sumario-t\" class=\"sumario\"><h2 id=\"sumario-t\">Neste post</h2><ol><li><a href=\"#porte\">Expectativa por porte</a></li><li><a href=\"#pequenos\">Por que os pequenos vivem mais</a></li><li><a href=\"#raca\">Raças</a></li><li><a href=\"#vira-lata\">Vira-lata</a></li><li><a href=\"#viver-mais\">Como ajudar a viver mais</a></li><li><a href=\"#faq\">Perguntas frequentes</a></li></ol></nav>\n<h2 id=\"porte\">Qual é a expectativa de vida por porte?</h2><p>Quanto maior o cão, menor tende a ser a expectativa de vida. Os números abaixo são médias de estudos e de entidades de criadores; cada animal é um caso.</p><div class=\"tabela\"><table><thead><tr><th scope=\"col\">Porte</th><th scope=\"col\">Expectativa média</th><th scope=\"col\">Exemplos</th></tr></thead><tbody><tr><td>Pequeno</td><td>10 a 15 anos</td><td>Chihuahua, Yorkshire, Lulu da Pomerânia</td></tr><tr><td>Médio</td><td>10 a 13 anos</td><td>Border Collie, Pastor Australiano</td></tr><tr><td>Grande</td><td>10 a 12 anos</td><td>Rottweiler, Golden Retriever, Labrador</td></tr><tr><td>Gigante</td><td>9 a 11 anos</td><td>Dogue Alemão, Dogue de Bordeaux</td></tr></tbody></table></div><h2 id=\"pequenos\">Por que cachorro pequeno vive mais?</h2><p>A explicação mais aceita é que cães grandes envelhecem em ritmo acelerado. Eles crescem muito rápido, o que pode favorecer o crescimento anormal de células, e nos estudos morrem de câncer com mais frequência que os pequenos. Em um levantamento com 169 mil cães nos Estados Unidos, a mediana foi de cerca de 15 anos para os pequenos, 13,9 para os médios e 13,4 para os grandes.</p><h2 id=\"raca\">A raça muda a expectativa de vida?</h2><p>Sim, principalmente pelo formato do focinho. No estudo britânico, o Dachshund miniatura, pequeno e de focinho longo, teve mediana de 14 anos. O Buldogue Francês, de focinho achatado, ficou em 9,8 anos. Raças braquicefálicas tendem a ter mais problemas respiratórios e de saúde ao longo da vida.</p><h2 id=\"vira-lata\">Vira-lata vive mais?</h2><p>Em média, há evidência de que sim. Vários estudos documentam vantagem de longevidade para cães sem raça definida, somada à vantagem do porte pequeno. Isso é tendência de população, não garantia para um cão específico.</p><h2 id=\"viver-mais\">Como ajudar meu cachorro a viver mais?</h2><p>O que está ao alcance do tutor é manter o peso ideal, a prevenção em dia e as consultas regulares. Na prática:</p><ul><li>Controle o peso: obesidade encurta a vida e agrava doenças articulares.</li><li>Mantenha vacinas e controle de parasitas atualizados.</li><li>Cuide dos dentes.</li><li>Faça check-up ao menos uma vez por ano, e a cada seis meses a partir dos 7 anos.</li><li>Observe mudanças pequenas de apetite, sede, sono e disposição. Elas costumam aparecer antes dos sintomas claros.</li></ul>\n<section aria-labelledby=\"faq\" class=\"faq\"><h2 id=\"faq\">Perguntas frequentes</h2><details><summary>Qual raça de cachorro vive mais?</summary><p>Raças pequenas lideram. Chihuahua e Lulu da Pomerânia aparecem com médias de 14 a 17 anos.</p></details><details><summary>Fêmea vive mais que macho?</summary><p>Um pouco. No estudo britânico, a mediana foi de 12,7 anos para fêmeas e 12,4 para machos.</p></details><details><summary>Quando o cachorro é considerado idoso?</summary><p>Em geral a partir dos 7 anos, e mais cedo nos cães grandes e gigantes.</p></details><details><summary>Um ano de cachorro equivale a sete humanos?</summary><p>Não. O primeiro ano equivale a cerca de 15 anos humanos e o segundo a mais 9. Depois disso, o ritmo depende do porte.</p></details></section>\n<aside aria-labelledby=\"chamada-t\" class=\"chamada\">\n<h2 id=\"chamada-t\">Viver mais começa por perceber cedo o que está mudando</h2><p>A triagem de bem-estar Utopet entrega um relatório de rotina e um relatório para levar ao veterinário.</p>\n<a class=\"botao\" href=\"/tutor?utm_source=blog&amp;utm_medium=artigo&amp;utm_campaign=quanto-tempo-vive-um-cachorro\">Agendar triagem</a><small>A triagem não substitui a consulta veterinária.</small>\n</aside>\n<div data-relacionados=\"\"></div>\n<section aria-labelledby=\"fontes-t\" class=\"fontes\" style=\"margin-bottom:4.5rem\"><h2 id=\"fontes-t\">Fontes</h2><ul><li><a href=\"https://www.smithsonianmag.com/smart-news/which-dogs-live-the-longest-scientists-say-small-and-long-nosed-canines-outlive-others-180983729/\" rel=\"noopener\">Smithsonian Magazine: estudo britânico sobre longevidade por tamanho e focinho</a></li><li><a href=\"https://www.akc.org/expert-advice/health/general-health/why-do-small-dogs-live-longer/\" rel=\"noopener\">American Kennel Club: Why do small dogs live longer?</a></li><li><a href=\"https://www.akc.org/expert-advice/dog-breeds/how-long-do-dogs-live/\" rel=\"noopener\">American Kennel Club: How long do dogs live?</a></li><li><a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC9886701\" rel=\"noopener\">GeroScience (PMC): tamanho, diversidade genética e longevidade em 118 raças</a></li><li><a href=\"https://www.aaha.org/resources/supporting-your-senior-pet-veterinary-care-recommendations/\" rel=\"noopener\">AAHA: cuidados veterinários para pets idosos</a></li></ul></section>\n</article>"
 },
 {
  "slug": "cachorro-pode-comer-uva",
  "publishAt": "2026-11-26",
  "image": "/pet-beagle.jpg",
  "temas": [
   "alimentacao"
  ],
  "readTime": 3,
  "categoria": "Alimentação",
  "title": "Cachorro pode comer uva?",
  "metaTitle": "Cachorro pode comer uva? Riscos e o que fazer | Utopet",
  "description": "Uva e uva-passa são tóxicas para cães e podem lesar os rins. Veja os sinais, o que fazer se o seu cachorro comeu e quando correr ao veterinário.",
  "jsonLd": [
   {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cachorro pode comer uva?",
    "description": "Uva e uva-passa são tóxicas para cães e podem lesar os rins. Veja os sinais, o que fazer se o seu cachorro comeu e quando correr ao veterinário.",
    "inLanguage": "pt-BR",
    "mainEntityOfPage": "https://utopet.com.br/blog/cachorro-pode-comer-uva",
    "publisher": {
     "@type": "Organization",
     "name": "Utopet",
     "url": "https://utopet.com.br"
    },
    "datePublished": "2026-11-26",
    "dateModified": "2026-11-26",
    "image": "https://utopet.com.br/pet-beagle.jpg"
   },
   {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
     {
      "@type": "Question",
      "name": "Uma uva só faz mal?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Pode fazer. Como não há dose segura conhecida, mesmo uma uva justifica ligar para o veterinário, principalmente em cães pequenos."
      }
     },
     {
      "@type": "Question",
      "name": "Suco e geleia de uva também são tóxicos?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Não foram associados a intoxicação, provavelmente porque o processamento reduz o ácido tartárico. Mesmo assim, não são alimentos indicados para cães."
      }
     },
     {
      "@type": "Question",
      "name": "Gato pode comer uva?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Não é recomendado. Não há casos publicados em gatos, apenas relatos isolados, mas o risco não está descartado."
      }
     }
    ]
   }
  ],
  "html": "<div class=\"cabeca\"><div class=\"coluna\">\n<p class=\"trilha\"><a href=\"/blog\">Blog</a> / Alimentação</p>\n<h1>Cachorro pode comer uva?</h1>\n<div class=\"resposta\"><p class=\"resposta-rotulo\">Resposta rápida</p><p>Não. Uva e uva-passa são tóxicas para cachorros e podem causar lesão renal aguda. Ainda não se conhece uma quantidade segura, e a reação varia de cão para cão. Se o seu cachorro comeu, ligue para o veterinário na hora, mesmo sem sintomas.</p></div>\n</div></div>\n<article class=\"coluna\">\n<section aria-labelledby=\"pontos-t\" class=\"pontos\"><h2 id=\"pontos-t\">Pontos-chave</h2><ul><li>Vale para uva fresca, uva-passa e alimentos que levam passas, como panetone e granola.</li><li>O vômito costuma ser o primeiro sinal e aparece nas primeiras horas.</li><li>O dano aos rins pode se instalar entre 1 e 3 dias depois.</li><li>Não existe antídoto: o que muda o desfecho é a rapidez do atendimento.</li></ul></section>\n<nav aria-labelledby=\"sumario-t\" class=\"sumario\"><h2 id=\"sumario-t\">Neste post</h2><ol><li><a href=\"#por-que\">Por que faz mal</a></li><li><a href=\"#quantidade\">Quantidade perigosa</a></li><li><a href=\"#sinais\">Sinais de intoxicação</a></li><li><a href=\"#o-que-fazer\">O que fazer</a></li><li><a href=\"#faq\">Perguntas frequentes</a></li></ol></nav>\n<h2 id=\"por-que\">Por que uva faz mal para cachorro?</h2><p>A causa mais provável é o ácido tartárico, presente em alta concentração na uva. O organismo do cão elimina mal esse tipo de ácido, que se acumula nas células dos rins e as danifica. O teor de ácido tartárico muda conforme a variedade e a maturação da fruta, o que ajuda a explicar por que um cão passa mal com poucas uvas e outro não.</p><h2 id=\"quantidade\">Quantas uvas são perigosas?</h2><p>Não há dose segura conhecida. Como referência de risco, o Manual Veterinário Merck cita mais de uma uva ou passa para cada 4,5 kg de peso do cão, mas a sensibilidade individual varia muito. Por isso, a orientação é tratar qualquer ingestão como potencialmente tóxica. A uva-passa preocupa mais porque é a fruta concentrada.</p><h2 id=\"sinais\">Quais são os sinais de intoxicação por uva?</h2><p>Os primeiros sinais são digestivos e surgem entre 6 e 24 horas após a ingestão. Os sinais renais vêm depois.</p><div class=\"tabela\"><table><thead><tr><th scope=\"col\">Quando</th><th scope=\"col\">Sinais</th></tr></thead><tbody><tr><td>Primeiras 6 a 24 horas</td><td>Vômito (o mais comum), diarreia, falta de apetite, apatia, dor abdominal, salivação</td></tr><tr><td>De 1 a 3 dias</td><td>Muita sede e muito xixi, fraqueza, falta de coordenação, inchaço nas patas</td></tr><tr><td>Quadro grave</td><td>Pouco ou nenhum xixi, sinal de falência renal</td></tr></tbody></table></div><p>Alguns cães não mostram nada no início. Ausência de sintoma não significa ausência de risco.</p><h2 id=\"o-que-fazer\">O que fazer se meu cachorro comeu uva?</h2><ol><li>Ligue para o veterinário ou vá a um pronto-atendimento imediatamente.</li><li>Informe o peso do cão, a quantidade aproximada e há quanto tempo ele comeu.</li><li>Leve a embalagem, se for um alimento com passas.</li><li>Não provoque vômito em casa nem dê leite, carvão ou remédio por conta própria.</li><li>Não espere os sintomas aparecerem.</li></ol><p>Na clínica, o tratamento costuma envolver a retirada do que ainda está no estômago, soro na veia e exames de função renal repetidos por pelo menos dois dias.</p>\n<section aria-labelledby=\"faq\" class=\"faq\"><h2 id=\"faq\">Perguntas frequentes</h2><details><summary>Uma uva só faz mal?</summary><p>Pode fazer. Como não há dose segura conhecida, mesmo uma uva justifica ligar para o veterinário, principalmente em cães pequenos.</p></details><details><summary>Suco e geleia de uva também são tóxicos?</summary><p>Não foram associados a intoxicação, provavelmente porque o processamento reduz o ácido tartárico. Mesmo assim, não são alimentos indicados para cães.</p></details><details><summary>Gato pode comer uva?</summary><p>Não é recomendado. Não há casos publicados em gatos, apenas relatos isolados, mas o risco não está descartado.</p></details></section>\n<aside aria-labelledby=\"chamada-t\" class=\"chamada\">\n<h2 id=\"chamada-t\">Acompanhe a saúde do seu pet no dia a dia</h2><p>Intoxicação é emergência e pede veterinário na hora. Para a rotina, a triagem de bem-estar Utopet ajuda a chegar à consulta com mais informação.</p>\n<a class=\"botao\" href=\"/tutor?utm_source=blog&amp;utm_medium=artigo&amp;utm_campaign=cachorro-pode-comer-uva\">Agendar triagem</a><small>A triagem não substitui a consulta veterinária.</small>\n</aside>\n<div data-relacionados=\"\"></div>\n<section aria-labelledby=\"fontes-t\" class=\"fontes\" style=\"margin-bottom:4.5rem\"><h2 id=\"fontes-t\">Fontes</h2><ul><li><a href=\"https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/grape-and-raisin-toxicity\" rel=\"noopener\">Cornell University, Riney Canine Health Center: Grape and raisin toxicity</a></li><li><a href=\"https://www.merckvetmanual.com/toxicology/food-hazards/grape-raisin-and-tamarind-vitis-spp-tamarindus-spp-toxicosis-in-dogs\" rel=\"noopener\">Merck Veterinary Manual: Grape, raisin and tamarind toxicosis in dogs</a></li></ul></section>\n</article>"
 },
 {
  "slug": "cachorro-com-diarreia",
  "publishAt": "2026-11-27",
  "image": "/pet-dachshund.jpg",
  "temas": [
   "sintomas"
  ],
  "readTime": 4,
  "categoria": "Sintomas",
  "title": "Cachorro com diarreia: o que fazer e quando se preocupar?",
  "metaTitle": "Cachorro com diarreia: o que fazer e quando se preocupar | Utopet",
  "description": "Diarreia em cachorro costuma passar em um ou dois dias, mas alguns sinais pedem veterinário na hora. Veja as causas, o que fazer em casa e os alertas.",
  "jsonLd": [
   {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cachorro com diarreia: o que fazer e quando se preocupar?",
    "description": "Diarreia em cachorro costuma passar em um ou dois dias, mas alguns sinais pedem veterinário na hora. Veja as causas, o que fazer em casa e os alertas.",
    "inLanguage": "pt-BR",
    "mainEntityOfPage": "https://utopet.com.br/blog/cachorro-com-diarreia",
    "publisher": {
     "@type": "Organization",
     "name": "Utopet",
     "url": "https://utopet.com.br"
    },
    "datePublished": "2026-11-27",
    "dateModified": "2026-11-27",
    "image": "https://utopet.com.br/pet-dachshund.jpg"
   },
   {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
     {
      "@type": "Question",
      "name": "Posso dar arroz com frango?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "É uma dieta leve usada com frequência, sem sal, tempero, pele ou osso. Confirme com o veterinário antes, porque não serve para todos os casos."
      }
     },
     {
      "@type": "Question",
      "name": "Posso dar soro caseiro?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Não por conta própria. A reposição de líquidos e sais precisa de orientação, e casos de desidratação pedem soro na clínica."
      }
     },
     {
      "@type": "Question",
      "name": "Estresse causa diarreia?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Sim. Mudança de casa, viagem, hotelzinho e fogos podem soltar o intestino por um ou dois dias."
      }
     },
     {
      "@type": "Question",
      "name": "E se a diarreia vai e volta?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Diarreia recorrente pode indicar parasita, intolerância alimentar ou doença intestinal crônica. Vale investigar."
      }
     }
    ]
   }
  ],
  "html": "<div class=\"cabeca\"><div class=\"coluna\">\n<p class=\"trilha\"><a href=\"/blog\">Blog</a> / Sintomas</p>\n<h1>Cachorro com diarreia: o que fazer e quando se preocupar?</h1>\n<div class=\"resposta\"><p class=\"resposta-rotulo\">Resposta rápida</p><p>A maioria dos casos de diarreia em cachorro adulto e saudável melhora em um ou dois dias com água à vontade e alimentação leve orientada pelo veterinário. Procure atendimento sem esperar se houver sangue nas fezes, vômito repetido, apatia, sinais de desidratação, ou se o cão for filhote ou idoso.</p></div>\n</div></div>\n<article class=\"coluna\">\n<section aria-labelledby=\"pontos-t\" class=\"pontos\"><h2 id=\"pontos-t\">Pontos-chave</h2><ul><li>Problemas gastrointestinais são o motivo mais comum de atendimento de cães no Brasil.</li><li>O maior risco da diarreia é a desidratação, mais rápida em filhotes e cães pequenos.</li><li>Remédio humano e receita caseira sem orientação podem piorar o quadro.</li><li>Diarreia que volta com frequência merece investigação, mesmo que passe sozinha.</li></ul></section>\n<nav aria-labelledby=\"sumario-t\" class=\"sumario\"><h2 id=\"sumario-t\">Neste post</h2><ol><li><a href=\"#causas\">Causas</a></li><li><a href=\"#em-casa\">O que fazer em casa</a></li><li><a href=\"#alerta\">Sinais de alerta</a></li><li><a href=\"#desidratacao\">Desidratação</a></li><li><a href=\"#faq\">Perguntas frequentes</a></li></ol></nav>\n<h2 id=\"causas\">O que causa diarreia em cachorro?</h2><p>As causas mais comuns são alimentares: troca brusca de ração, comida gordurosa ou algo que o cão achou no lixo ou na rua. Depois vêm os parasitas intestinais, as infecções por vírus e bactérias, o estresse, o efeito de medicamentos e as intolerâncias ou alergias alimentares. Em filhotes não vacinados, a parvovirose é uma causa grave e precisa ser descartada rápido.</p><h2 id=\"em-casa\">O que fazer em casa?</h2><p>Mantenha água limpa e fresca sempre disponível e ligue para o veterinário para combinar a alimentação das próximas horas. Enquanto isso:</p><ol><li>Observe e anote: quantas vezes evacuou, aspecto das fezes, se há vômito e como está o apetite.</li><li>Tire uma foto das fezes. Ajuda o veterinário.</li><li>Ofereça pequenas porções de comida, várias vezes ao dia, conforme a orientação recebida.</li><li>Não dê medicamento humano, antibiótico que sobrou em casa ou remédio caseiro.</li><li>Não suspenda a água.</li></ol><h2 id=\"alerta\">Quando a diarreia é sinal de alerta?</h2><p>Um único sinal da tabela já justifica procurar atendimento. Não é preciso juntar vários.</p><div class=\"tabela\"><table><thead><tr><th scope=\"col\">Sinal</th><th scope=\"col\">O que fazer</th></tr></thead><tbody><tr><td>Sangue ou fezes muito escuras</td><td>Veterinário no mesmo dia</td></tr><tr><td>Vômito repetido junto com a diarreia</td><td>Veterinário no mesmo dia</td></tr><tr><td>Apatia, fraqueza ou febre</td><td>Veterinário no mesmo dia</td></tr><tr><td>Gengiva seca ou pálida, olhos fundos</td><td>Emergência</td></tr><tr><td>Filhote, idoso ou cão com doença crônica</td><td>Veterinário no mesmo dia, mesmo com quadro leve</td></tr><tr><td>Diarreia por mais de 24 a 48 horas</td><td>Agendar consulta</td></tr><tr><td>Suspeita de ter comido algo tóxico</td><td>Emergência</td></tr></tbody></table></div><h2 id=\"desidratacao\">Como saber se o cachorro está desidratado?</h2><p>Gengiva seca, olhos fundos, apatia e pele que demora a voltar ao lugar quando puxada de leve são sinais comuns. Essa observação serve de alerta, não de teste: quem avalia a hidratação é o veterinário.</p>\n<section aria-labelledby=\"faq\" class=\"faq\"><h2 id=\"faq\">Perguntas frequentes</h2><details><summary>Posso dar arroz com frango?</summary><p>É uma dieta leve usada com frequência, sem sal, tempero, pele ou osso. Confirme com o veterinário antes, porque não serve para todos os casos.</p></details><details><summary>Posso dar soro caseiro?</summary><p>Não por conta própria. A reposição de líquidos e sais precisa de orientação, e casos de desidratação pedem soro na clínica.</p></details><details><summary>Estresse causa diarreia?</summary><p>Sim. Mudança de casa, viagem, hotelzinho e fogos podem soltar o intestino por um ou dois dias.</p></details><details><summary>E se a diarreia vai e volta?</summary><p>Diarreia recorrente pode indicar parasita, intolerância alimentar ou doença intestinal crônica. Vale investigar.</p></details></section>\n<aside aria-labelledby=\"chamada-t\" class=\"chamada\">\n<h2 id=\"chamada-t\">Diarreia que se repete pede investigação</h2><p>A triagem de bem-estar Utopet ajuda a registrar o histórico do seu pet e a levar mais informação para a consulta.</p>\n<a class=\"botao\" href=\"/tutor?utm_source=blog&amp;utm_medium=artigo&amp;utm_campaign=cachorro-com-diarreia\">Agendar triagem</a><small>A triagem não substitui a consulta veterinária.</small>\n</aside>\n<div data-relacionados=\"\"></div>\n<section aria-labelledby=\"fontes-t\" class=\"fontes\" style=\"margin-bottom:4.5rem\"><h2 id=\"fontes-t\">Fontes</h2><ul><li><a href=\"https://sindan.org.br/release/saiba-quais-sao-as-principais-doencas-em-caes-e-gatos-no-brasil/\" rel=\"noopener\">Sindan: principais doenças em cães e gatos no Brasil</a></li><li><a href=\"https://www.royalcanin.com/br/dogs/health-and-wellbeing/common-dog-digestive-problems\" rel=\"noopener\">Royal Canin Brasil: problemas digestivos comuns dos cães</a></li><li><a href=\"https://www.petlove.com.br/dicas/cachorro-com-diarreia/\" rel=\"noopener\">Petlove: cachorro com diarreia</a></li></ul></section>\n</article>"
 },
 {
  "slug": "check-up-veterinario",
  "publishAt": "2026-11-28",
  "image": "/pet-cao-mesa.jpg",
  "temas": [
   "prevencao",
   "longevidade"
  ],
  "readTime": 3,
  "categoria": "Prevenção",
  "title": "Check-up veterinário: de quanto em quanto tempo levar o pet?",
  "metaTitle": "Check-up veterinário: de quanto em quanto tempo levar o pet | Utopet",
  "description": "Cães e gatos adultos devem ir ao veterinário pelo menos uma vez por ano, e idosos a cada seis meses. Veja a frequência por idade e o que é avaliado.",
  "jsonLd": [
   {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Check-up veterinário: de quanto em quanto tempo levar o pet?",
    "description": "Cães e gatos adultos devem ir ao veterinário pelo menos uma vez por ano, e idosos a cada seis meses. Veja a frequência por idade e o que é avaliado.",
    "inLanguage": "pt-BR",
    "mainEntityOfPage": "https://utopet.com.br/blog/check-up-veterinario",
    "publisher": {
     "@type": "Organization",
     "name": "Utopet",
     "url": "https://utopet.com.br"
    },
    "datePublished": "2026-11-28",
    "dateModified": "2026-11-28",
    "image": "https://utopet.com.br/pet-cao-mesa.jpg"
   },
   {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
     {
      "@type": "Question",
      "name": "Gato que não sai de casa precisa de check-up?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Sim. As doenças mais comuns em gatos, como as renais e urinárias, não dependem de contato com a rua."
      }
     },
     {
      "@type": "Question",
      "name": "Check-up é a mesma coisa que tomar vacina?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Não. A vacina é uma parte. O check-up inclui exame físico completo e avaliação geral de saúde."
      }
     },
     {
      "@type": "Question",
      "name": "Uma triagem substitui a consulta?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Não. Triagem ajuda a observar e registrar; exame, diagnóstico e tratamento são do médico-veterinário."
      }
     }
    ]
   }
  ],
  "html": "<div class=\"cabeca\"><div class=\"coluna\">\n<p class=\"trilha\"><a href=\"/blog\">Blog</a> / Prevenção</p>\n<h1>Check-up veterinário: de quanto em quanto tempo levar o pet?</h1>\n<div class=\"resposta\"><p class=\"resposta-rotulo\">Resposta rápida</p><p>Cães e gatos adultos e saudáveis devem passar por check-up veterinário pelo menos uma vez por ano. Idosos, ou seja, cães acima de 7 anos e gatos acima de 10, devem ir a cada seis meses. Filhotes e animais com doença crônica precisam de visitas mais frequentes, definidas pelo veterinário.</p></div>\n</div></div>\n<article class=\"coluna\">\n<section aria-labelledby=\"pontos-t\" class=\"pontos\"><h2 id=\"pontos-t\">Pontos-chave</h2><ul><li>A recomendação de consulta anual vale mesmo para o pet que parece saudável.</li><li>Pets envelhecem mais rápido que pessoas: seis meses para um cão idoso equivalem a anos para nós.</li><li>No Brasil, só 18% dos tutores mantêm uma rotina de visitas estritamente preventivas.</li><li>Cães e gatos escondem dor e desconforto. Muita coisa só aparece no exame.</li></ul></section>\n<nav aria-labelledby=\"sumario-t\" class=\"sumario\"><h2 id=\"sumario-t\">Neste post</h2><ol><li><a href=\"#frequencia\">Frequência por idade</a></li><li><a href=\"#avaliado\">O que é avaliado</a></li><li><a href=\"#saudavel\">Por que ir se ele está bem</a></li><li><a href=\"#sinais\">Sinais para antecipar</a></li><li><a href=\"#faq\">Perguntas frequentes</a></li></ol></nav>\n<h2 id=\"frequencia\">De quanto em quanto tempo levar o pet ao veterinário?</h2><p>A frequência mínima depende da fase de vida. O veterinário ajusta conforme raça, histórico e estilo de vida.</p><div class=\"tabela\"><table><thead><tr><th scope=\"col\">Fase de vida</th><th scope=\"col\">Frequência mínima</th></tr></thead><tbody><tr><td>Filhote</td><td>Várias visitas nos primeiros meses, seguindo o calendário de vacinas</td></tr><tr><td>Adulto saudável</td><td>1 vez por ano</td></tr><tr><td>Idoso (cão com mais de 7 anos, gato com mais de 10)</td><td>A cada 6 meses</td></tr><tr><td>Com doença crônica</td><td>Conforme o plano definido pelo veterinário</td></tr></tbody></table></div><h2 id=\"avaliado\">O que é avaliado em um check-up?</h2><p>O check-up combina conversa, exame físico completo e, quando indicado, exames de triagem. Em geral inclui:</p><ul><li>Peso e condição corporal</li><li>Coração e pulmões</li><li>Boca e dentes</li><li>Olhos, ouvidos, pele e pelagem</li><li>Palpação do abdômen e das articulações</li><li>Revisão de vacinas e do controle de pulgas, carrapatos e vermes</li><li>Exames de sangue, urina ou fezes, conforme idade e histórico</li><li>Conversa sobre alimentação e comportamento</li></ul><h2 id=\"saudavel\">Por que levar se o pet parece saudável?</h2><p>Porque o objetivo do check-up é encontrar o problema antes do sintoma. Doença renal, problemas dentários, sobrepeso e artrite avançam em silêncio, e muito tutor confunde a queda de disposição com \"coisa da idade\". Descobrir cedo costuma significar tratamento mais simples e mais barato.</p><h2 id=\"sinais\">Quais sinais pedem antecipar a consulta?</h2><p>Mudanças pequenas e persistentes já justificam marcar antes da data:</p><ul><li>Beber mais água ou fazer mais xixi que o normal</li><li>Perda ou ganho de peso sem mudança na comida</li><li>Menos apetite ou menos disposição por vários dias</li><li>Mau hálito forte</li><li>Dificuldade para levantar, subir escada ou pular</li><li>Coceira frequente</li></ul>\n<section aria-labelledby=\"faq\" class=\"faq\"><h2 id=\"faq\">Perguntas frequentes</h2><details><summary>Gato que não sai de casa precisa de check-up?</summary><p>Sim. As doenças mais comuns em gatos, como as renais e urinárias, não dependem de contato com a rua.</p></details><details><summary>Check-up é a mesma coisa que tomar vacina?</summary><p>Não. A vacina é uma parte. O check-up inclui exame físico completo e avaliação geral de saúde.</p></details><details><summary>Uma triagem substitui a consulta?</summary><p>Não. Triagem ajuda a observar e registrar; exame, diagnóstico e tratamento são do médico-veterinário.</p></details></section>\n<aside aria-labelledby=\"chamada-t\" class=\"chamada\">\n<h2 id=\"chamada-t\">Acompanhe o que muda entre uma consulta e outra</h2><p>A triagem de bem-estar Utopet entrega um relatório de rotina e outro para encaminhar ao seu veterinário.</p>\n<a class=\"botao\" href=\"/tutor?utm_source=blog&amp;utm_medium=artigo&amp;utm_campaign=check-up-veterinario\">Agendar triagem</a><small>A triagem não substitui a consulta veterinária.</small>\n</aside>\n<div data-relacionados=\"\"></div>\n<section aria-labelledby=\"fontes-t\" class=\"fontes\" style=\"margin-bottom:4.5rem\"><h2 id=\"fontes-t\">Fontes</h2><ul><li><a href=\"https://aaha.org/resources/why-are-regular-veterinary-visits-important/\" rel=\"noopener\">AAHA: Why are regular veterinary visits important?</a></li><li><a href=\"https://www.aaha.org/resources/supporting-your-senior-pet-veterinary-care-recommendations/\" rel=\"noopener\">AAHA: Supporting your senior pet</a></li><li><a href=\"https://www.avma.org/resources-tools/avma-policies/aaha-avma-canine-preventive-healthcare-guidelines\" rel=\"noopener\">AVMA e AAHA: Canine preventive healthcare guidelines</a></li><li><a href=\"https://www.band.com.br/pets/noticias/pai-e-mae-de-pet-tutores-focam-em-longevidade-e-faz-mercado-crescer-12-202604141839\" rel=\"noopener\">Band: tutores focam em longevidade (dado UPPartner)</a></li><li><a href=\"https://sindan.org.br/release/saiba-quais-sao-as-principais-doencas-em-caes-e-gatos-no-brasil/\" rel=\"noopener\">Sindan: principais doenças em cães e gatos no Brasil</a></li></ul></section>\n</article>"
 },
 {
  "slug": "programa-check-up-preventivo-clinica-veterinaria",
  "publishAt": "2026-11-29",
  "image": "/pet-gato-tuxedo.jpg",
  "temas": [
   "veterinarios",
   "prevencao"
  ],
  "readTime": 4,
  "categoria": "Para veterinários",
  "title": "Como montar um programa de check-up preventivo na clínica veterinária",
  "metaTitle": "Check-up preventivo na clínica veterinária: como montar o programa | Utopet",
  "description": "Só 18% dos tutores fazem visitas preventivas. Veja como estruturar um programa de check-up por fase de vida, com retorno agendado e indicadores.",
  "jsonLd": [
   {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Como montar um programa de check-up preventivo na clínica veterinária",
    "description": "Só 18% dos tutores fazem visitas preventivas. Veja como estruturar um programa de check-up por fase de vida, com retorno agendado e indicadores.",
    "inLanguage": "pt-BR",
    "mainEntityOfPage": "https://utopet.com.br/blog/programa-check-up-preventivo-clinica-veterinaria",
    "publisher": {
     "@type": "Organization",
     "name": "Utopet",
     "url": "https://utopet.com.br"
    },
    "datePublished": "2026-11-29",
    "dateModified": "2026-11-29",
    "image": "https://utopet.com.br/pet-gato-tuxedo.jpg"
   },
   {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
     {
      "@type": "Question",
      "name": "Plano preventivo é a mesma coisa que plano de saúde pet?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Não. O plano preventivo é um pacote da própria clínica, com serviços definidos. O plano de saúde é de uma operadora e cobre eventos."
      }
     },
     {
      "@type": "Question",
      "name": "Como divulgar sem ferir as regras de publicidade?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Siga as normas do CFMV e do CRMV do seu estado sobre publicidade e divulgação de preços."
      }
     },
     {
      "@type": "Question",
      "name": "Por onde começar com equipe pequena?",
      "acceptedAnswer": {
       "@type": "Answer",
       "text": "Pelo retorno agendado na saída e pela lista de inativos. Não exigem investimento."
      }
     }
    ]
   }
  ],
  "html": "<div class=\"cabeca\"><div class=\"coluna\">\n<p class=\"trilha\"><a href=\"/blog\">Blog</a> / Para veterinários</p>\n<h1>Como montar um programa de check-up preventivo na clínica veterinária</h1>\n<div class=\"resposta\"><p class=\"resposta-rotulo\">Resposta rápida</p><p>Um programa de check-up preventivo tem cinco peças: protocolo por fase de vida, pacote com preço claro, retorno agendado na saída, reativação de pacientes inativos e indicadores acompanhados todo mês. O ganho é duplo: diagnóstico mais cedo para o paciente e receita recorrente e previsível para a clínica.</p></div>\n</div></div>\n<article class=\"coluna\">\n<section aria-labelledby=\"pontos-t\" class=\"pontos\"><h2 id=\"pontos-t\">Pontos-chave</h2><ul><li>Só 18% dos tutores brasileiros mantêm rotina de visitas estritamente preventivas. O espaço está na sua própria base de clientes.</li><li>As diretrizes da AAHA e da AVMA recomendam ao menos uma consulta por ano para todo cão e gato, e semestral para idosos.</li><li>O tutor não volta sozinho: o retorno precisa sair agendado.</li><li>Prevenção vende quando o tutor entende o que está incluído e quanto custa.</li></ul></section>\n<nav aria-labelledby=\"sumario-t\" class=\"sumario\"><h2 id=\"sumario-t\">Neste post</h2><ol><li><a href=\"#por-que\">Por que estruturar</a></li><li><a href=\"#protocolo\">Protocolo por fase de vida</a></li><li><a href=\"#pacote\">Pacote e preço</a></li><li><a href=\"#retorno\">Retorno e reativação</a></li><li><a href=\"#triagem\">Triagem pré-consulta</a></li><li><a href=\"#indicadores\">Indicadores</a></li><li><a href=\"#faq\">Perguntas frequentes</a></li></ol></nav>\n<h2 id=\"por-que\">Por que estruturar a prevenção como programa?</h2><p>Porque consulta preventiva avulsa depende da iniciativa do tutor, e ela raramente vem. A maior parte dos atendimentos ainda é reativa, puxada por sintoma. Um programa transforma a prevenção em rotina da clínica: tem protocolo, calendário, responsável e meta.</p><h2 id=\"protocolo\">Como definir o protocolo por fase de vida?</h2><p>Comece por um protocolo mínimo escrito, igual para toda a equipe. A tabela é um ponto de partida para adaptar à realidade da clínica e às doenças endêmicas da região.</p><div class=\"tabela\"><table><thead><tr><th scope=\"col\">Fase</th><th scope=\"col\">Frequência</th><th scope=\"col\">Conteúdo mínimo</th></tr></thead><tbody><tr><td>Filhote</td><td>Série inicial</td><td>Vacinação, vermifugação, orientação de manejo e nutrição</td></tr><tr><td>Adulto</td><td>Anual</td><td>Exame físico completo, escore corporal, avaliação oral, revisão de vacinas e parasitas</td></tr><tr><td>Idoso</td><td>Semestral</td><td>Tudo do adulto, mais exames de triagem e avaliação de dor e mobilidade</td></tr><tr><td>Crônico</td><td>Plano individual</td><td>Monitoramento da doença de base</td></tr></tbody></table></div><h2 id=\"pacote\">Como montar o pacote e o preço?</h2><p>Transforme o protocolo em pacote com nome, lista do que inclui e preço fechado. Três formatos funcionam bem juntos:</p><ul><li><strong>Check-up avulso por fase:</strong> adulto e idoso, com preço único.</li><li><strong>Plano anual:</strong> consultas e exames do ano parcelados em mensalidade. Reduz a barreira de preço e cria recorrência.</li><li><strong>Campanhas sazonais:</strong> mês do pet idoso, mês da saúde bucal.</li></ul><p>O tutor precisa enxergar o valor antes do preço. Mostre o que cada item detecta, em linguagem simples.</p><h2 id=\"retorno\">Como garantir que o tutor volte?</h2><p>Agende o próximo check-up antes de o tutor sair da clínica. Essa prática, chamada de forward booking, está entre as ferramentas que a AVMA recomenda para implementar prevenção. Complete com:</p><ol><li>Lembrete por WhatsApp 30 dias, 7 dias e 1 dia antes.</li><li>Lista mensal de pacientes sem visita há mais de 12 meses, com contato ativo.</li><li>Um responsável na recepção pela agenda de retornos.</li><li>Roteiro curto para a equipe explicar o check-up no balcão.</li></ol><h2 id=\"triagem\">Onde entra a triagem pré-consulta?</h2><p>A triagem organiza a informação antes do exame e dá ao tutor um motivo concreto para vir. Questionários de rotina, histórico e ferramentas de triagem ajudam a direcionar a conversa. O limite precisa ficar claro para a equipe e para o tutor: triagem não é diagnóstico, e a decisão clínica é sempre do médico-veterinário.</p><h2 id=\"indicadores\">Quais indicadores acompanhar?</h2><p>Meça pouco e todo mês:</p><ul><li>Percentual de pacientes ativos com check-up nos últimos 12 meses</li><li>Taxa de retornos agendados na saída</li><li>Taxa de comparecimento aos retornos</li><li>Pacientes reativados no mês</li><li>Receita de prevenção sobre a receita total</li><li>Adesão ao plano anual</li></ul>\n<section aria-labelledby=\"faq\" class=\"faq\"><h2 id=\"faq\">Perguntas frequentes</h2><details><summary>Plano preventivo é a mesma coisa que plano de saúde pet?</summary><p>Não. O plano preventivo é um pacote da própria clínica, com serviços definidos. O plano de saúde é de uma operadora e cobre eventos.</p></details><details><summary>Como divulgar sem ferir as regras de publicidade?</summary><p>Siga as normas do CFMV e do CRMV do seu estado sobre publicidade e divulgação de preços.</p></details><details><summary>Por onde começar com equipe pequena?</summary><p>Pelo retorno agendado na saída e pela lista de inativos. Não exigem investimento.</p></details></section>\n<aside aria-labelledby=\"chamada-t\" class=\"chamada\">\n<h2 id=\"chamada-t\">Triagem como apoio ao check-up da sua clínica</h2><p>Veja como o equipamento de triagem de bem-estar Utopet entra no fluxo de atendimento preventivo.</p>\n<a class=\"botao\" href=\"/veterinario?utm_source=blog&amp;utm_medium=artigo&amp;utm_campaign=programa-check-up-preventivo-clinica-veterinaria\">Conhecer o equipamento</a><small>A triagem apoia a consulta. A decisão clínica é sempre do médico-veterinário.</small>\n</aside>\n<div data-relacionados=\"\"></div>\n<section aria-labelledby=\"fontes-t\" class=\"fontes\" style=\"margin-bottom:4.5rem\"><h2 id=\"fontes-t\">Fontes</h2><ul><li><a href=\"https://www.avma.org/resources-tools/avma-policies/aaha-avma-canine-preventive-healthcare-guidelines\" rel=\"noopener\">AVMA e AAHA: Canine preventive healthcare guidelines</a></li><li><a href=\"https://atwork.avma.org/resources/pet-owners/petcare/preventive-pet-healthcare\" rel=\"noopener\">AVMA: Preventive pet healthcare, ferramentas do Partners for Healthy Pets</a></li><li><a href=\"https://www.aaha.org/resources/supporting-your-senior-pet-veterinary-care-recommendations/\" rel=\"noopener\">AAHA: Supporting your senior pet</a></li><li><a href=\"https://www.band.com.br/pets/noticias/pai-e-mae-de-pet-tutores-focam-em-longevidade-e-faz-mercado-crescer-12-202604141839\" rel=\"noopener\">Band: tutores focam em longevidade (dado UPPartner)</a></li></ul></section>\n</article>"
 }
];

export function hojeBrasilia(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

export function isPreview(): boolean {
  try { return new URLSearchParams(window.location.search).get('preview') === 'utopet'; } catch { return false; }
}

/** Posts já publicados, do mais novo para o mais antigo. */
export function publishedPosts(): BlogPost[] {
  const hoje = hojeBrasilia();
  const prev = isPreview();
  return BLOG_POSTS.filter(p => prev || p.publishAt <= hoje).sort((a, b) => b.publishAt.localeCompare(a.publishAt));
}
