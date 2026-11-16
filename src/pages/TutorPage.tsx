import { useState } from 'react';
import { Check } from 'lucide-react';
import { Header, LeadModal, Numbers, TabSection, DeviceSection, GallerySection, ReportExample, DarkBusinessBlock, FaqSection, FinalCTA, Footer } from '../components/UtopetShared';

const tutorTabs = [
  { label: 'Passo 1', heading: 'Seu pet fica com você', description: 'Ele só precisa ficar em contato com o aparelho, acordado e no seu colo se preferir.', chips: ['Sem agulha', 'Sem jejum', 'Sem sedação'] },
  { label: 'Passo 2', heading: 'A leitura leva minutos', description: 'Pode levar um pouco mais até o pet ficar tranquilo. Não tem pressa e não dói.', chips: ['Não invasiva', 'Cães e gatos', 'Qualquer idade'] },
  { label: 'Passo 3', heading: 'Você recebe dois relatórios', description: 'Um com mudanças simples para o dia a dia do seu pet e outro em PDF, pronto para baixar e encaminhar ao veterinário.', chips: ['Rotina do pet', 'PDF para o veterinário', 'Linguagem simples'] },
];

const tutorFaq: Array<[string, string]> = [
  ['Dói?', 'Não. A leitura é não invasiva, sem agulha e sem coleta.'],
  ['Serve para gato?', 'Sim. Atendemos cães e gatos de qualquer idade e porte.'],
  ['Quanto tempo leva?', 'Alguns minutos. Pode levar um pouco mais até o pet ficar tranquilo.'],
  ['Recebo o relatório em PDF?', 'Sim. O relatório para o veterinário fica pronto para baixar e encaminhar.'],
  ['As mudanças de rotina substituem o veterinário?', 'Não. São sugestões de dia a dia para você confirmar com ele. Quem avalia e decide o tratamento é o veterinário.'],
];

export default function TutorPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openContact = () => setModalOpen(true);
  return (
    <div>
      <Header kind="tutor" onContact={openContact} />
      <main>
        <section className="hero"><div className="wrap"><div className="hero-grid"><div className="anim-entrada"><span className="eyebrow">Para tutores em Bragança Paulista</span><h1>Você quer mais tempo com ele. Comece entendendo como ele está hoje.</h1><p className="lead">Uma triagem de bem-estar sem agulha, com dois relatórios: um com ajustes de rotina para mais qualidade de vida e outro pronto para enviar ao veterinário.</p><div className="hero-cta"><button className="btn btn-roxo" onClick={openContact}>Garantir minha vaga</button><a href="#recebe" className="btn btn-borda">O que você recebe</a></div><p className="hero-note"><Check size={16} />R$ 150 por pet. 50 vagas disponíveis neste ano.</p></div><div className="anim-entrada d1"><div className="moldura"><img src="/images/cao-pequeno.jpg" alt="Cão recebendo cuidado" /><div className="float-card score"><div className="valor">85</div><div className="rot">Wellness Score</div></div><div className="float-card balao"><b>Ótimo sinal!</b>Luna está dentro do padrão saudável hoje.</div></div></div></div></div></section>
        <section className="pad" style={{ paddingTop: '32px' }}><div className="wrap"><Numbers items={[{ value: 'R$ 150', label: 'Por pet, com os dois relatórios' }, { value: '2', label: 'Relatórios: rotina e veterinário' }, { value: '50', label: 'Vagas disponíveis neste ano' }]} /></div></section>
        <TabSection id="como-funciona" title="Três passos, sem estresse para ele e sem dúvida para você" tabs={tutorTabs} />
        <DeviceSection kind="tutor" />
        <GallerySection kind="tutor" />
        <section className="pad"><div className="wrap"><div className="sec-head center"><span className="eyebrow">Cuidado no tempo certo</span><h2>Cuidar cedo é o caminho para mais anos bons juntos.</h2><p>Cães e gatos escondem desconforto. Quando o sinal aparece, muitas vezes já virou correria. A triagem mostra onde vale prestar atenção agora, enquanto pequenas mudanças ainda ajudam muito.</p></div></div></section>
        <section className="pad" id="recebe"><div className="wrap"><div className="dois-cartoes"><div className="cartao-grande lavanda card"><span className="eyebrow">O que você recebe</span><h3>Um relatório para a rotina e outro para o veterinário</h3><p>Você sai sabendo o que ajustar no dia a dia e com um documento pronto para a próxima consulta.</p><ul><li><Check size={18} />Mudanças de rotina para mais qualidade de vida: alimentação, caminhada e ambiente</li><li><Check size={18} />Relatório em PDF pronto para baixar e encaminhar ao veterinário</li><li><Check size={18} />Nota geral de bem-estar e os pontos que merecem atenção</li></ul><ReportExample kind="tutor" /></div><div className="cartao-grande creme card"><span className="eyebrow">Importante</span><h3>Triagem não é diagnóstico</h3><p>A Utopet não substitui a consulta nem os exames. Ela mostra onde vale olhar com mais atenção.</p><ul><li><Check size={18} />Confirme as mudanças de rotina com o seu veterinário</li><li><Check size={18} />Quem decide o tratamento é ele</li></ul></div></div></div></section>
        <DarkBusinessBlock kind="tutor" onContact={openContact} />
        <section className="pad" id="oferta"><div className="wrap"><div className="sec-head center"><span className="eyebrow">Valores</span><h2>R$ 150 por pet, em Bragança Paulista</h2><button className="btn btn-roxo" style={{ marginTop: '26px' }} onClick={openContact}>Garantir minha vaga</button></div><div className="oferta-blocos"><div className="oferta-bloco card"><div className="destaque">R$ 150</div><div className="desc">Por pet, com os dois relatórios inclusos.</div></div><div className="oferta-bloco card"><div className="destaque">Bragança Paulista</div><div className="desc">Onde estamos atendendo agora.</div></div><div className="oferta-bloco card"><div className="destaque">50 vagas</div><div className="desc">Disponíveis neste ano.</div></div><div className="oferta-bloco card"><div className="destaque">PDF para o veterinário</div><div className="desc">Pronto para baixar e encaminhar.</div></div></div></div></section>
        <FaqSection id="duvidas" title="Dúvidas de quem cuida" items={tutorFaq} />
        <FinalCTA kind="tutor" onContact={openContact} />
      </main>
      <Footer />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} kind="tutor" />
    </div>
  );
}
