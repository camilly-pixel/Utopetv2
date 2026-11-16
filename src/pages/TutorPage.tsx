import { useState } from 'react';
import { Check, Footprints, Hand, Utensils, Moon, Hourglass, Heart, Home, Eye, Stethoscope } from 'lucide-react';
import { Header, Numbers, TabSection, GallerySection, ReportExample, DarkBusinessBlock, FaqSection, FinalCTA, Footer } from '../components/UtopetShared';
import { LeadModal } from '../components/LeadModal';

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

const situacoes = [
  { icon: Footprints, text: 'Anda mais quietinho' },
  { icon: Hand, text: 'Se coça mais do que antes' },
  { icon: Utensils, text: 'Está comendo menos' },
  { icon: Moon, text: 'Dorme mais que o normal' },
  { icon: Hourglass, text: 'Está ficando velhinho' },
  { icon: Heart, text: 'Ou está tudo bem e você só quer ter certeza' },
];

const planoRotina = [
  { icon: Utensils, title: 'Alimentação', text: 'o que vale rever na comida e nos petiscos' },
  { icon: Footprints, title: 'Movimento', text: 'caminhadas e brincadeiras na medida dele' },
  { icon: Home, title: 'Ambiente', text: 'pequenos ajustes em casa' },
  { icon: Eye, title: 'Acompanhamento', text: 'o que observar nas próximas semanas' },
];

const fases = [
  { title: 'Filhote', text: 'comece com o pé direito' },
  { title: 'Adulto', text: 'mantenha o que está funcionando' },
  { title: 'Sênior', text: 'mais conforto nos anos dourados' },
];

const incluso = ['Triagem de bem-estar completa', 'Plano de rotina do seu pet', 'Relatório em PDF para o veterinário', 'Sem agulha, sem jejum, sem sedação'];

export default function TutorPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openContact = () => setModalOpen(true);
  return (
    <div>
      <Header kind="tutor" onContact={openContact} />
      <main>
        <section className="hero"><div className="wrap"><div className="hero-grid"><div className="anim-entrada"><span className="eyebrow">Para tutores em Bragança Paulista</span><h1>Você quer mais tempo com ele. Comece entendendo como ele está hoje.</h1><p className="lead">Em poucos minutos, sem agulha e com ele no seu colo, a Utopet mostra como está o bem-estar do seu pet e o que você pode ajustar no dia a dia para ele viver melhor.</p><div className="hero-cta"><button className="btn btn-roxo" onClick={openContact}>Quero entender meu pet</button><a href="#recebe" className="btn btn-borda">Ver o que eu recebo</a></div></div><div className="anim-entrada d1"><div className="moldura"><img src="/images/cao-pequeno.jpg" alt="Cão recebendo cuidado" /><div className="float-card score"><div className="valor">85</div><div className="rot">Wellness Score</div></div><div className="float-card balao"><b>Ótimo sinal!</b>Luna está dentro do padrão saudável hoje.</div></div></div></div></div></section>

        <section className="pad numeros-texto" style={{ paddingTop: '32px' }}><div className="wrap"><Numbers items={[{ value: 'Sem agulha', label: 'Nada de coleta, jejum ou sedação' }, { value: 'No seu colo', label: 'Ele fica acordado e perto de você' }, { value: 'Na hora', label: 'Você sai com os relatórios em mãos' }]} /></div></section>

        <section className="pad"><div className="wrap">
          <div className="sec-head center"><h2>Ele não consegue te contar.</h2><p>Você conhece cada jeitinho dele. Mas cães e gatos escondem desconforto, e muita coisa passa despercebida até virar preocupação.</p></div>
          <div className="situacoes-card card">
            <h3>Talvez você já tenha notado</h3>
            <ul className="situacoes">{situacoes.map(({ icon: Icon, text }) => <li key={text}><span className="ic"><Icon size={20} /></span>{text}</li>)}</ul>
          </div>
          <p className="nota-triagem">A triagem não dá diagnóstico. Ela mostra onde vale prestar atenção, para você e o veterinário saberem por onde começar.</p>
        </div></section>

        <TabSection id="como-funciona" title="Como é a triagem" tabs={tutorTabs} />

        <section className="pad" id="recebe"><div className="wrap">
          <div className="sec-head center"><span className="eyebrow">O que você leva</span><h2>O que você leva para casa</h2></div>
          <div className="dois-cartoes">
            <div className="cartao-grande lavanda card leva-card">
              <h3>Plano de rotina do seu pet</h3>
              <p>Mudanças simples para o dia a dia, pensadas para ele ter mais qualidade de vida.</p>
              <ul className="itens-icone">{planoRotina.map(({ icon: Icon, title, text }) => <li key={title}><span className="ic"><Icon size={20} /></span><span><b>{title}:</b> {text}</span></li>)}</ul>
            </div>
            <div className="cartao-grande card leva-card">
              <h3>Relatório para o veterinário</h3>
              <p>Um PDF pronto para baixar e encaminhar. Seu veterinário recebe o panorama completo e decide os próximos passos.</p>
              <ReportExample kind="tutor" />
            </div>
          </div>
        </div></section>

        <GallerySection kind="tutor">
          <div className="fases">{fases.map((fase) => <div className="fase card" key={fase.title}><h3>{fase.title}</h3><p>{fase.text}</p></div>)}</div>
        </GallerySection>

        <DarkBusinessBlock kind="tutor" onContact={openContact} />

        <section className="pad"><div className="wrap"><div className="cartao-grande creme card comando-card"><span className="comando-ic"><Stethoscope size={26} /></span><div><h3>Seu veterinário continua no comando</h3><p>A Utopet não substitui a consulta nem os exames. Leve o relatório, confirme as mudanças de rotina com ele e deixe que ele decida o tratamento.</p></div></div></div></section>

        <section className="pad" id="oferta"><div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Vagas limitadas</span><h2>São 50 vagas em Bragança Paulista neste ano</h2></div>
          <div className="preco-card card">
            <div className="preco-valor">R$ 150 <span>por pet</span></div>
            <ul>{incluso.map((item) => <li key={item}><span className="ic"><Check size={16} /></span>{item}</li>)}</ul>
            <button className="btn btn-roxo" onClick={openContact}>Garantir minha vaga</button>
          </div>
        </div></section>

        <FaqSection id="duvidas" title="Dúvidas de quem cuida" items={tutorFaq} />
        <FinalCTA kind="tutor" onContact={openContact} />
      </main>
      <Footer />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} kind="tutor" />
    </div>
  );
}
