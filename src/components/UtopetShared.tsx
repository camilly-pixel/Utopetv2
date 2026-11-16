import { ReactNode, useState } from 'react';
import { Check, X, Plus, Menu } from 'lucide-react';
import { LogoSvg } from './Icons';

export type PageKind = 'veterinario' | 'tutor';


export function Header({ kind, onContact }: { kind: PageKind; onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = kind === 'veterinario'
    ? [['Como funciona', 'como-funciona'], ['Hoje e depois', 'hoje-e-depois'], ['Simulador', 'simulador'], ['Oferta', 'oferta']]
    : [['Como funciona', 'como-funciona'], ['O que você recebe', 'recebe'], ['Valores', 'oferta'], ['Dúvidas', 'duvidas']];

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="topo">
      <div className="wrap">
        <nav className="nav-pilula" aria-label="Navegação principal">
          <a href={kind === 'veterinario' ? '/veterinario' : '/tutor'} className="logo" aria-label="Utopet">
            <LogoSvg />topet
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map(([label, id]) => <a href={`#${id}`} key={id} onClick={(event) => { event.preventDefault(); goTo(id); }}>{label}</a>)}
            <button className="btn btn-roxo" onClick={() => { setMenuOpen(false); onContact(); }}>
              {kind === 'veterinario' ? 'Agendar demonstração' : 'Garantir minha vaga'}
            </button>
          </div>
          <button className="menu-btn" aria-label="Abrir menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export function Numbers({ items }: { items: Array<{ value: string; label: string }> }) {
  return <div className="numeros">{items.map((item) => <div className="numero card" key={`${item.value}-${item.label}`}><div className="n">{item.value}</div><div className="t">{item.label}</div></div>)}</div>;
}

export function TabSection({ id, title, tabs }: { id: string; title: string; tabs: Array<{ label: string; heading: string; description: string; chips: string[] }> }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <section className="pad" id={id}>
      <div className="wrap">
        <div className="sec-head"><span className="eyebrow">Como funciona</span><h2>{title}</h2></div>
        <div className="abas-btns" role="tablist">{tabs.map((item, index) => <button className={`aba-btn ${index === active ? 'ativa' : ''}`} role="tab" aria-selected={index === active} key={item.label} onClick={() => setActive(index)}>{item.label}</button>)}</div>
        <div className="aba-painel card" role="tabpanel">
          <div className="aba-grid">
            <div><div className="aba-num">{active + 1}</div><h3>{tab.heading}</h3><p>{tab.description}</p><div className="chips">{tab.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div></div>
            <div className="aba-visual"><div className="linha"><span className="pt" style={{ background: 'var(--roxo)' }} />Leitura organizada para a próxima decisão</div><div className="linha"><span className="pt" style={{ background: 'var(--verde)' }} />Informação clara, no momento certo</div><div className="linha"><span className="pt" style={{ background: 'var(--laranja)' }} />Acompanhamento sem complicação</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeviceSection({ kind }: { kind: PageKind }) {
  const isVet = kind === 'veterinario';
  return (
    <section className="pad">
      <div className="wrap"><div className="aparelho-grid"><div><div className="foto-aparelho"><img className="principal" src="/images/utopet-aparelho.jpg" alt="Aparelho Utopet em ambiente veterinário" /><div className="foto-redonda"><img src="/images/gato.jpg" alt="Gato recebendo cuidado" /></div></div><p className="legenda-foto">Imagem ilustrativa do aparelho.</p></div><div className="texto-lado"><span className="eyebrow">{isVet ? 'O aparelho' : 'Como é a triagem'}</span><h2>{isVet ? 'A leitura acontece por contato, com o pet acordado' : 'Ele fica acordado, perto de você, sem agulha'}</h2><p>{isVet ? 'Nada de coleta, jejum ou sedação. A equipe posiciona o pet, acompanha a leitura e o software entrega o relatório.' : 'A leitura é feita por contato com o aparelho. Você acompanha tudo e pode acalmar o pet durante o processo.'}</p><ul className="lista-check">{(isVet ? ['Cabe na rotina da consulta', 'Treinamento da equipe em uma sessão', 'Cães e gatos de qualquer porte'] : ['Não dói e não precisa de jejum', 'Você fica junto o tempo todo', 'Os relatórios saem na hora']).map((item) => <li key={item}><span className="ic"><Check size={17} /></span>{item}</li>)}</ul></div></div></div>
    </section>
  );
}

export function GallerySection({ kind }: { kind: PageKind }) {
  const isVet = kind === 'veterinario';
  return <section className="pad"><div className="wrap"><div className="sec-head center"><span className="eyebrow">Cães e gatos</span><h2>{isVet ? 'Cães e gatos, do filhote ao sênior' : 'Cada ano ao lado dele conta'}</h2><p>{isVet ? 'O software ajusta a leitura conforme espécie, porte e idade do paciente.' : 'Filhote agitado ou sênior tranquilo, cão ou gato. Entender como ele está hoje ajuda a cuidar melhor dos próximos anos.'}</p></div><div className="galeria"><div className="foto"><img src="/images/cao-grande.jpg" alt="Cão de grande porte" /></div><div className="foto"><img src="/images/cao-pequeno.jpg" alt="Cão de pequeno porte" /></div><div className="foto"><img src="/images/gato.jpg" alt="Gato" /></div></div></div></section>;
}

export function ReportExample({ kind }: { kind: PageKind }) {
  const [open, setOpen] = useState(false);
  const isVet = kind === 'veterinario';
  return <div className="relatorio-exemplo"><div className="relatorio-topo"><div className="rt"><b>Wellness Score</b>Relatório de Luna</div><div className="relatorio-score">85</div></div><div className="relatorio-linha"><span className="dot" style={{ background: 'var(--verde)' }} /><span className="rl">{isVet ? 'Hepatobiliar' : 'Fígado e vias biliares'}</span><span className="rv">Equilibrado</span></div><div className="relatorio-linha"><span className="dot" style={{ background: 'var(--laranja)' }} /><span className="rl">Minerais · Zinco</span><span className="rv">Atenção</span></div><div className="relatorio-linha"><span className="dot" style={{ background: 'var(--verde)' }} /><span className="rl">{isVet ? 'Imunológico' : 'Imunidade'}</span><span className="rv">Saudável</span></div><button className="relatorio-toggle" onClick={() => setOpen((value) => !value)}>{open ? 'Ocultar detalhes' : 'Ver detalhes do relatório'}<Plus size={18} /></button>{open && <div className="relatorio-detalhe">{(isVet ? ['Hepatobiliar: dentro do esperado na leitura de hoje. Nenhum ponto de atenção.', 'Zinco: ponto de atenção. O veterinário avalia se vale investigar com exames.', 'Imunológico: dentro do esperado na leitura de hoje. Nenhum ponto de atenção.'] : ['Fígado e vias biliares: tudo dentro do esperado na leitura de hoje.', 'Zinco: vale mostrar este ponto ao veterinário. Ele decide se precisa investigar.', 'Imunidade: tudo dentro do esperado na leitura de hoje. Nenhum ponto de atenção.']).map((detail) => <p key={detail}>{detail}</p>)}</div>}<div className="relatorio-legenda">Exemplo ilustrativo de relatório.</div></div>;
}

export function FaqSection({ items, title, id }: { items: Array<[string, string]>; title: string; id: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="pad" id={id}><div className="wrap"><div className="sec-head center"><span className="eyebrow">Perguntas frequentes</span><h2>{title}</h2></div><div className="faq">{items.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}><button className="faq-q" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>{question}<span className="chev"><Plus size={21} /></span></button><div className="faq-a" style={{ maxHeight: open === index ? '200px' : 0 }}><p>{answer}</p></div></div>)}</div></div></section>;
}

export function FinalCTA({ kind, onContact }: { kind: PageKind; onContact: () => void }) {
  const isVet = kind === 'veterinario';
  return <section className="pad"><div className="wrap"><div className="fecho"><div className="glow" /><h2>{isVet ? 'Veja funcionando com um paciente seu.' : 'Mais tempo bom com quem você ama.'}</h2><p>{isVet ? 'Agende uma demonstração. Mostramos o aparelho, o relatório e a simulação da sua clínica.' : 'Garanta uma das 50 vagas deste ano em Bragança Paulista. R$ 150 por pet.'}</p><button className="btn btn-branco" onClick={onContact}>{isVet ? 'Agendar demonstração' : 'Garantir minha vaga'}</button></div></div></section>;
}

export function Footer() {
  return <footer className="rodape"><div className="wrap"><div className="rodape-card"><div className="rodape-topo"><a href="/veterinario" className="logo"><LogoSvg />topet</a><nav className="rodape-nav"><a href="/veterinario">Para clínicas</a><a href="/tutor">Para tutores</a><a href="mailto:contato@utopet.com.br">Contato</a></nav></div><p className="aviso-rodape">A triagem de bem-estar Utopet não é diagnóstico e não substitui a consulta, os exames ou a decisão do médico-veterinário.</p><p className="rodape-copy">© 2026 Utopet. Todos os direitos reservados.</p></div></div></footer>;
}

export function CheckList({ items, className = '' }: { items: string[]; className?: string }) {
  return <ul className={`lista-check ${className}`}>{items.map((item) => <li key={item}><span className="ic"><Check size={17} /></span>{item}</li>)}</ul>;
}

export function DarkBusinessBlock({ kind, onContact }: { kind: PageKind; onContact: () => void }) {
  const isVet = kind === 'veterinario';
  return <section className="pad" id={isVet ? 'simulador' : 'negocio'}><div className="wrap"><div className="bloco-escuro"><div className="glow" /><div className="negocio-grid"><div><span className="eyebrow sobre-escuro">{isVet ? 'O caso de negócio' : 'Mais qualidade de vida'}</span><h2>{isVet ? 'Um novo serviço na sua clínica, sem depender de mais clientes' : 'Pequenas mudanças agora ajudam muito no longo prazo'}</h2><ul className="negocio-itens">{(isVet ? ['Triagem cobrada junto com a consulta', 'Custo baixo por avaliação', 'Reavaliações periódicas trazem o tutor de volta', 'Relatório com a marca da sua clínica'] : ['Ajustes simples de alimentação e passeio', 'Nova triagem para acompanhar a evolução', 'Sem agulha, sem jejum, sem sedação']).map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul>{isVet && <button className="btn btn-branco" style={{ marginTop: '28px' }} onClick={onContact}>Agendar demonstração</button>}</div>{isVet ? <Simulator /> : <div className="frase-card"><p className="frase">Eles não falam.<br /><em>Mas sentem.</em></p></div>}</div></div></div></section>;
}

function Simulator() {
  const [pets, setPets] = useState(10);
  const [valor, setValor] = useState(30);
  const [dias, setDias] = useState(20);
  const mensal = pets * valor * dias;
  const meses = Math.ceil(19000 / mensal);
  const cobreParcela = mensal >= 3167;
  return <div className="simulador"><h3>Simule o potencial da sua clínica</h3><div className="campo"><label htmlFor="pets">Pets por dia <output>{pets}</output></label><input id="pets" type="range" min="1" max="40" value={pets} onChange={(event) => setPets(Number(event.target.value))} /></div><div className="campo"><label htmlFor="valor">Valor da triagem <output>R$ {valor}</output></label><input id="valor" type="range" min="10" max="100" step="5" value={valor} onChange={(event) => setValor(Number(event.target.value))} /></div><div className="campo"><label htmlFor="dias">Dias no mês <output>{dias}</output></label><input id="dias" type="range" min="10" max="26" value={dias} onChange={(event) => setDias(Number(event.target.value))} /></div><div className="sim-resultados"><div className="sim-valor"><div className="v">R$ {mensal.toLocaleString('pt-BR')}</div><div className="l">A mais por mês</div></div><div className="sim-valor"><div className="v">R$ {(mensal * 12).toLocaleString('pt-BR')}</div><div className="l">Em 12 meses</div></div><div className="sim-valor largo"><p className="sim-linha">{cobreParcela ? 'O ganho do mês cobre a parcela de R$ 3.166,67' : 'O ganho do mês ainda não cobre a parcela de R$ 3.166,67'}</p><p className="sim-linha">Ganho estimado paga o aparelho em {meses} {meses === 1 ? 'mês' : 'meses'}</p></div></div><p className="sim-nota">Conta ilustrativa: considera uma triagem por pet atendido. O resultado real depende da adesão dos tutores.</p></div>;
}

export function IntroSection({ children }: { children: ReactNode }) {
  return <div className="wrap">{children}</div>;
}
