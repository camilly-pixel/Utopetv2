import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Header, Numbers, TabSection, DeviceSection, GallerySection, ReportExample, DarkBusinessBlock, FaqSection, FinalCTA, Footer } from '../components/UtopetShared';
import { LeadModal } from '../components/LeadModal';
import { VslVideo } from '../components/VslVideo';
import { CredibilitySection } from '../components/CredibilitySection';

const vetTabs = [
  { label: 'Antes', heading: 'Pré-triagem padronizada', description: 'Perguntas simples sobre rotina, alimentação e sinais recentes, que a recepção aplica antes de o pet entrar no consultório.', chips: ['Roteiro pronto', 'Recepção aplica', 'Histórico do pet'] },
  { label: 'Durante', heading: 'Leitura não invasiva', description: 'O pet fica acordado e confortável. Em minutos, o relatório aponta onde vale olhar com mais atenção.', chips: ['Sem coleta', 'Sem sedação', '17 sistemas', 'Prioridades visuais'] },
  { label: 'Depois', heading: 'Plano claro para o tutor', description: 'O tutor leva um relatório com a marca da sua clínica e volta para acompanhar a evolução.', chips: ['Sua marca', 'Linguagem simples', 'Reavaliação periódica'] },
];

const vetFaq: Array<[string, string]> = [
  ['Substitui exames laboratoriais?', 'Não. É uma triagem de bem-estar que complementa a avaliação clínica e ajuda a direcionar exames quando necessário.'],
  ['Precisa de preparo no pet?', 'Não há jejum, coleta ou sedação. O pet fica acordado e confortável durante a leitura.'],
  ['Quem interpreta o resultado?', 'Você. O software organiza as informações; a conclusão clínica é do médico-veterinário.'],
  ['E se o tutor perguntar se é diagnóstico?', 'O próprio relatório explica que se trata de uma triagem de bem-estar, e não de um diagnóstico.'],
];

export default function VeterinarioPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openContact = () => setModalOpen(true);
  return (
    <div>
      <Header kind="veterinario" onContact={openContact} />
      <main>
        <section className="hero hero-centro"><div className="wrap"><div className="hero-coluna anim-entrada"><span className="eyebrow">Para clínicas e hospitais veterinários</span><h1>O paciente não fala. A triagem começa a conversa por você.</h1><p className="lead">A Utopet lê 139 parâmetros de bem-estar em 17 sistemas, em minutos e sem agulha. Você recebe um panorama para direcionar a anamnese e decidir quais exames valem a pena.</p><div className="hero-cta"><button className="btn btn-roxo" onClick={openContact}>Agendar demonstração</button><a href="#simulador" className="btn btn-borda">Simular na minha clínica</a></div><p className="hero-note"><Check size={16} />O veterinário sempre no comando. Treinamento da equipe incluso.</p></div><VslVideo /></div></section>
        <section className="pad" style={{ paddingTop: '32px' }}><div className="wrap"><Numbers items={[{ value: '139', label: 'Parâmetros de bem-estar' }, { value: '17', label: 'Sistemas do organismo' }, { value: '0', label: 'Agulhas, coleta ou sedação' }]} /></div></section>
        <TabSection id="como-funciona" title="Da recepção ao retorno, a triagem organiza a consulta inteira" tabs={vetTabs} />
        <section className="pad" id="hoje-e-depois"><div className="wrap"><div className="sec-head"><span className="eyebrow">Hoje e depois</span><h2>Hoje a consulta começa no escuro. Com a Utopet, você já entra sabendo onde olhar.</h2><p>Em muitas clínicas o veterinário conhece o pet na hora da consulta, sem triagem e com pouco histórico.</p></div><div className="comp-grid"><div className="comp branca card"><h3>Como é hoje</h3><ul>{['A consulta começa sem triagem estruturada', 'Você conhece o pet só quando ele entra na sala', 'A anamnese depende do que o tutor lembra', 'Os exames são pedidos sem ponto de partida, e o tutor resiste ao custo', 'O tutor sai sem plano claro e demora a voltar'].map((item) => <li key={item}><X size={19} />{item}</li>)}</ul></div><div className="comp roxo card"><h3>Como fica com a Utopet</h3><ul>{['Pré-triagem padronizada, feita pela recepção', 'Panorama de 17 sistemas antes do exame clínico', 'Anamnese direcionada aos pontos de atenção', 'Pedido de exames com uma justificativa que o tutor entende', 'Relatório com a sua marca e reavaliação que traz o tutor de volta', 'Um serviço novo, cobrado em cada consulta'].map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul></div></div></div></section>
        <DeviceSection kind="veterinario" />
        <GallerySection kind="veterinario" />
        <section className="pad" id="relatorio"><div className="wrap"><div className="dois-cartoes"><div className="cartao-grande lavanda card"><span className="eyebrow">O relatório</span><h3>Um panorama que você interpreta e o tutor entende</h3><p>O software organiza os 139 parâmetros em um relatório com prioridades visuais. Ele sai com a marca da sua clínica.</p><ul><li><Check size={18} />Nota geral de bem-estar</li><li><Check size={18} />Pontos de atenção em destaque</li><li><Check size={18} />Histórico a cada reavaliação</li></ul><ReportExample kind="veterinario" /></div><div className="cartao-grande creme card"><span className="eyebrow">O que ela não faz</span><h3>Não diagnostica. A decisão é sempre sua.</h3><p>A Utopet não substitui exame de sangue, imagem ou o seu julgamento clínico. Ela indica onde vale olhar com mais atenção.</p><ul><li><Check size={18} />Complementa a avaliação clínica</li><li><Check size={18} />Você interpreta o resultado</li><li><Check size={18} />O relatório explica que é triagem</li></ul></div></div></div></section>
        <DarkBusinessBlock kind="veterinario" onContact={openContact} />
        <section className="pad" id="oferta"><div className="wrap"><div className="sec-head center"><span className="eyebrow">Preço de lançamento</span><h2>De R$ 29.000 por R$ 19.000</h2><button className="btn btn-roxo" style={{ marginTop: '26px' }} onClick={openContact}>Agendar demonstração</button></div><div className="oferta-blocos"><div className="oferta-bloco card"><div className="destaque"><span className="preco-antigo">De R$ 29.000</span><br /><span className="preco-novo">por R$ 19.000</span></div><div className="desc">Preço de lançamento do aparelho, com software incluso.</div></div><div className="oferta-bloco card"><div className="destaque">6x sem juros</div><div className="desc">Seis parcelas de R$ 3.166,67.</div></div><div className="oferta-bloco card"><div className="destaque">A parcela se paga no mês</div><div className="desc">Com 10 triagens por dia a R$ 30, a receita extra estimada é de R$ 6.000 por mês. Confira no simulador.</div></div><div className="oferta-bloco card"><div className="destaque">Treinamento incluso</div><div className="desc">Sua equipe opera o aparelho em uma sessão.</div></div></div></div></section>
        <FaqSection id="duvidas" title="O que toda clínica pergunta" items={vetFaq} />
        <FinalCTA kind="veterinario" onContact={openContact} />
        <CredibilitySection onContact={openContact} />
      </main>
      <Footer />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} kind="veterinario" />
    </div>
  );
}
