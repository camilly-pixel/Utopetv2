import { Check, Footprints, Hand, Utensils, Moon, Hourglass, Heart, Home, Eye, FileText, MapPin, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { TutorHeader, TutorPrecoAncora, TutorSteps, TutorReportMock, TutorTestimonials, TutorFaq, TutorFooter } from '../components/TutorSections';
import { TutorForm } from '../components/TutorForm';
import { TutorPhones } from '../components/TutorPhones';
import { TutorSystems } from '../components/TutorSystems';
import '../styles/tutor.css';

const tutorFaq: Array<[string, ReactNode]> = [
  ['Vocês vão mesmo até a minha casa?', <>Sim. Nesta fase de implantação em Bragança Paulista, a visita está incluída no preço: <TutorPrecoAncora />.</>],
  ['Posso fazer em outro lugar?', 'Pode: num lugar público, numa praça ou no consultório do seu veterinário de confiança.'],
  ['Quando eu pago?', 'Só no dia da visita, por Pix ou cartão. Nada é cobrado no formulário.'],
  ['O que acontece depois que eu envio o formulário?', 'A gente te chama no WhatsApp em até 24 horas para combinar o dia, o horário e o local.'],
  ['Serve para alergia?', 'A triagem mostra pontos de atenção, como sensibilidade a poeira e alimentos. Quem confirma uma alergia é o veterinário, com os exames dele.'],
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

const heroChecks: ReactNode[] = ['Vamos até a sua casa', 'Sem agulha, sem jejum, sem sedação', <><TutorPrecoAncora />, pago só na visita</>];

const incluso = ['Visita na sua casa (ou onde preferir)', 'Triagem de bem-estar completa', 'Relatório com nota geral e pontos de atenção', 'Plano de rotina', 'PDF para o veterinário'];

const scrollToAgendar = () => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });

function Foto({ src, alt, className = '', legenda = 'Imagem ilustrativa' }: { src: string; alt: string; className?: string; legenda?: string }) {
  return (
    <figure className={`tt-foto ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      <figcaption className="tt-legenda">{legenda}</figcaption>
    </figure>
  );
}

export default function TutorPage() {
  return (
    <div className="tt-pagina">
      <TutorHeader />
      <main>
        <section className="hero tt-hero"><div className="wrap"><div className="hero-grid">
          <div className="anim-entrada">
            <span className="eyebrow">Para tutores em Bragança Paulista</span>
            <h1>Um check-up de bem-estar do seu pet, sem agulha, feito na sua casa.</h1>
            <p className="lead">A gente vai até você com um aparelho que lê, em poucos minutos, como está o corpo do seu cão ou gato. Você recebe um relatório fácil de ler, com a nota geral do seu pet e os pontos de atenção.</p>
            <ul className="tt-hero-checks">{heroChecks.map((item, index) => <li key={index}><span className="ic"><Check size={15} /></span>{item}</li>)}</ul>
            <div className="tt-hero-cta">
              <button className="btn btn-roxo" onClick={scrollToAgendar}>Quero agendar a visita</button>
              <p>Leva 1 minuto. Depois a gente te chama no WhatsApp para combinar o dia. Nada é cobrado agora.</p>
            </div>
          </div>
          <div className="anim-entrada d1">
            <figure className="tt-foto tt-hero-foto">
              <img src="/tutor-visita-casa-v2.jpg" alt="Pessoa da equipe Utopet fazendo a triagem de um pet na casa do tutor" />
              <figcaption className="tt-legenda">Imagem ilustrativa</figcaption>
            </figure>
          </div>
        </div></div></section>

        <section className="pad"><div className="wrap">
          <div className="sec-head center tt-gancho">
            <h2>Você já imaginou ver, sem agulha, se a poeira de casa pode estar incomodando o seu pet?</h2>
            <p>A triagem Utopet mostra pontos de atenção do corpo dele, como pele e pelagem, digestão, sensibilidade a poeira, ácaros e alimentos, energia e sono.</p>
          </div>
          <div className="situacoes-card card">
            <h3>Talvez você já tenha notado</h3>
            <ul className="situacoes">{situacoes.map(({ icon: Icon, text }) => <li key={text}><span className="ic"><Icon size={20} /></span>{text}</li>)}</ul>
          </div>
          <p className="nota-triagem">É uma triagem de bem-estar. Quem confirma uma alergia ou qualquer problema é o veterinário, com os exames dele.</p>
        </div></section>

        <TutorSteps />

        <section className="pad" id="por-que-em-casa"><div className="wrap"><div className="tt-duas-col">
          <div>
            <span className="eyebrow">Perto de você</span>
            <h2 className="tt-titulo">Por que vamos até a sua casa?</h2>
            <p className="tt-texto">Somos de Bragança Paulista e estamos começando a Utopet aqui. Nesta fase de implantação, a visita está incluída nos R$ 150. Depois, a visita em casa vai ter um custo maior.</p>
            <div className="tt-alternativa card">
              <span className="tt-alternativa-ic"><MapPin size={22} /></span>
              <div><h3>Prefere não receber em casa?</h3><p>Sem problema. A gente combina num lugar público, numa praça ou no consultório do seu veterinário de confiança.</p></div>
            </div>
          </div>
          <Foto src="/tutor-relatorio-gato.jpg" alt="Tutora com seu gato no colo vendo o relatório Utopet em um tablet" className="tt-foto-alta" />
        </div></div></section>

        <section className="pad" id="recebe"><div className="wrap">
          <div className="sec-head center"><span className="eyebrow">O que você recebe</span><h2>Um relatório que qualquer tutor entende</h2></div>
          <div className="tt-recebe">
            <TutorReportMock />
            <div className="cartao-grande lavanda card">
              <h3>Plano de rotina do seu pet</h3>
              <p>Mudanças simples para o dia a dia, pensadas para ele viver melhor.</p>
              <ul className="itens-icone">
                {planoRotina.map(({ icon: Icon, title, text }) => <li key={title}><span className="ic"><Icon size={20} /></span><span><b>{title}:</b> {text}</span></li>)}
                <li><span className="ic"><FileText size={20} /></span><span><b>Relatório em PDF para o veterinário</b></span></li>
              </ul>
            </div>
          </div>
        </div></section>

        <TutorPhones />
        <TutorSystems />

        <section className="pad" id="todo-pet"><div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Cães e gatos</span><h2>Para todo cão e todo gato</h2><p>Vira-lata, de raça, filhote ou idoso. Cada pet tem seu jeitinho, e a triagem é feita para ele.</p></div>
          <div className="tt-racas"><img src="/tutor-racas.jpg" alt="Vários cães e gatos de raças diferentes juntos" loading="lazy" /></div>
          <div className="fases">{fases.map((fase) => <div className="fase card" key={fase.title}><h3>{fase.title}</h3><p>{fase.text}</p></div>)}</div>
        </div></section>

        <section className="pad" id="tecnologia"><div className="wrap">
          <div className="cartao-grande creme card tt-tecnologia">
            <span className="tt-tecnologia-ic"><Sparkles size={26} /></span>
            <div>
              <h2 className="tt-titulo">De onde vem essa tecnologia?</h2>
              <p className="tt-texto">A biorressonância lê sinais do corpo sem precisar de agulha. A Utopet levou essa tecnologia para cães e gatos, com um aparelho próprio, um sistema em português e um relatório que qualquer tutor entende. Foram 2 anos de desenvolvimento e testes com veterinários antes de chegar até você.</p>
              <p className="tt-aviso">É uma triagem de bem-estar: não substitui consulta nem exames.</p>
            </div>
          </div>
        </div></section>

        <section className="pad" id="quem-somos"><div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Quem somos</span><h2>Conheça quem está por trás da Utopet</h2></div>
          <div className="tt-duas-col">
            <figure className="tt-foto"><img src="/utopet-fundadores.jpg" alt="Fundadores da Utopet" loading="lazy" /></figure>
            <p className="tt-texto tt-quem-texto">A Utopet nasceu em Bragança Paulista, criada pelos mesmos fundadores da Enviagora e da Fleurity. A gente queria uma forma simples de cuidar melhor dos nossos próprios pets e de saber o que observar antes de virar preocupação. Hoje estamos competindo para ser acelerados pela Nestlé.</p>
          </div>
        </div></section>

        <TutorTestimonials />

        <section className="pad" id="oferta"><div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Vagas limitadas</span><h2>São 50 vagas em Bragança Paulista neste ano</h2></div>
          <div className="preco-card card">
            <div className="tt-preco-antigo">De R$ 350</div>
            <div className="preco-valor tt-preco-novo"><small>por apenas</small> R$ 150 <span>por pet</span></div>
            <p className="tt-preco-nota">Preço de implantação em Bragança Paulista. Depois, a triagem com visita passa a custar R$ 350.</p>
            <ul>{incluso.map((item) => <li key={item}><span className="ic"><Check size={16} /></span>{item}</li>)}</ul>
            <p className="tt-oferta-pagamento">Pagamento só na visita, por Pix ou cartão.</p>
            <button className="btn btn-roxo" onClick={scrollToAgendar}>Quero agendar a visita</button>
          </div>
        </div></section>

        <section className="pad" id="agendar"><div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Leva 1 minuto</span><h2>Agende a visita do seu pet</h2></div>
          <TutorForm />
        </div></section>

        <TutorFaq items={tutorFaq} />
      </main>
      <TutorFooter />
    </div>
  );
}
