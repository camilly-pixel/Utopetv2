import { useState } from 'react';
import { ClipboardList, FileText, Menu, MessageCircle, PawPrint, Plus, Quote, X } from 'lucide-react';
import { LogoSvg } from './Icons';

const navLinks: Array<[string, string]> = [['Como funciona', 'como-funciona'], ['O que você recebe', 'recebe'], ['Quem somos', 'quem-somos'], ['Valores', 'oferta'], ['Dúvidas', 'duvidas']];

export function TutorHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="topo">
      <div className="wrap">
        <nav className="nav-pilula" aria-label="Navegação principal">
          <a href="/tutor" className="logo" aria-label="Utopet"><LogoSvg />topet</a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navLinks.map(([label, id]) => <a href={`#${id}`} key={id} onClick={(event) => { event.preventDefault(); goTo(id); }}>{label}</a>)}
            <button className="btn btn-roxo" onClick={() => goTo('agendar')}>Quero agendar a visita</button>
          </div>
          <button className="menu-btn" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

const passos = [
  { icon: ClipboardList, title: 'Você preenche o formulário', text: 'Seu nome, seu WhatsApp e o nome do seu pet. Leva 1 minuto.' },
  { icon: MessageCircle, title: 'A gente te chama no WhatsApp', text: 'Em até 24 horas combinamos o dia, o horário e o lugar.' },
  { icon: PawPrint, title: 'A triagem', text: 'Seu pet fica no seu colo, encostado no aparelho, por poucos minutos. Sem agulha.' },
  { icon: FileText, title: 'Você recebe o relatório', text: 'Uma nota geral, 3 ou 4 pontos de atenção e o que ajustar na rotina. Em PDF, para mostrar ao veterinário.' },
];

export function TutorSteps() {
  return (
    <section className="pad" id="como-funciona"><div className="wrap">
      <div className="sec-head center"><span className="eyebrow">Como funciona</span><h2>Em 4 passos simples</h2></div>
      <ol className="tt-passos">
        {passos.map(({ icon: Icon, title, text }, index) => (
          <li className="tt-passo card" key={title}>
            <div className="tt-passo-topo"><span className="tt-passo-num">{index + 1}</span><span className="tt-passo-ic"><Icon size={22} /></span></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <p className="tt-pagamento">Você paga só no dia da visita, por Pix ou cartão.</p>
    </div></section>
  );
}

const atencao = [
  { area: 'Pele e pelagem', status: 'Atenção', tom: 'laranja' },
  { area: 'Sensibilidade a poeira e ácaros', status: 'Observar', tom: 'lavanda' },
  { area: 'Digestão', status: 'Observar', tom: 'lavanda' },
];

export function TutorReportMock() {
  const nota = 85;
  const raio = 52;
  const volta = 2 * Math.PI * raio;
  return (
    <figure className="tt-relatorio">
      <div className="tt-relatorio-card card" aria-label="Exemplo de relatório da Luna">
        <div className="tt-relatorio-topo">
          <div><span className="tt-relatorio-rot">Relatório de bem-estar</span><h3>Luna</h3></div>
          <span className="logo tt-relatorio-logo"><LogoSvg />topet</span>
        </div>
        <div className="tt-nota">
          <svg viewBox="0 0 120 120" className="tt-anel" aria-hidden="true">
            <circle cx="60" cy="60" r={raio} className="tt-anel-fundo" />
            <circle cx="60" cy="60" r={raio} className="tt-anel-valor" strokeDasharray={volta} strokeDashoffset={volta * (1 - nota / 100)} />
          </svg>
          <div className="tt-nota-texto"><b>{nota}<span>/100</span></b><small>Nota geral</small></div>
        </div>
        <h4>Pontos de atenção</h4>
        <ul className="tt-atencao">
          {atencao.map((item) => <li key={item.area}><span>{item.area}</span><span className={`tt-status ${item.tom}`}>{item.status}</span></li>)}
        </ul>
        <h4>Está tudo bem</h4>
        <div className="tt-ok">{['Coração e circulação', 'Energia e sono'].map((item) => <span key={item} className="tt-ok-chip">{item}</span>)}</div>
      </div>
      <figcaption className="tt-legenda">Exemplo ilustrativo de relatório.</figcaption>
    </figure>
  );
}

type Depoimento = { nome: string; pet: string; texto: string };

const depoimentos: Depoimento[] = [];

export function TutorTestimonials() {
  if (depoimentos.length === 0) return null;
  return (
    <section className="pad" id="depoimentos"><div className="wrap">
      <div className="sec-head center"><span className="eyebrow">Depoimentos</span><h2>Quem já fez a triagem</h2></div>
      <div className="tt-depoimentos">
        {depoimentos.map((item) => (
          <blockquote className="tt-depoimento card" key={`${item.nome}-${item.pet}`}>
            <Quote size={22} className="tt-depoimento-ic" />
            <p>{item.texto}</p>
            <footer><b>{item.nome}</b>, tutor(a) do(a) {item.pet}</footer>
          </blockquote>
        ))}
      </div>
    </div></section>
  );
}

export function TutorFaq({ items }: { items: Array<[string, string]> }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="pad" id="duvidas"><div className="wrap">
      <div className="sec-head center"><span className="eyebrow">Perguntas frequentes</span><h2>Dúvidas de quem cuida</h2></div>
      <div className="faq">
        {items.map(([question, answer], index) => (
          <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}>
            <button className="faq-q" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>{question}<span className="chev"><Plus size={21} /></span></button>
            <div className="faq-a" style={{ maxHeight: open === index ? '320px' : 0 }}><p>{answer}</p></div>
          </div>
        ))}
      </div>
    </div></section>
  );
}

export function TutorFooter() {
  return (
    <footer className="rodape"><div className="wrap"><div className="rodape-card">
      <div className="rodape-topo"><a href="/tutor" className="logo"><LogoSvg />topet</a><nav className="rodape-nav"><a href="/veterinario">Para clínicas</a><a href="/tutor">Para tutores</a><a href="mailto:contato@utopet.com.br">Contato</a></nav></div>
      <p className="aviso-rodape">A triagem de bem-estar Utopet não substitui a consulta, os exames ou a decisão do médico-veterinário.</p>
      <p className="rodape-copy">© 2026 Utopet. Todos os direitos reservados.</p>
    </div></div></footer>
  );
}
