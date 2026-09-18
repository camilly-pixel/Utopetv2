import { useState, useEffect, useRef, createContext, useContext, FormEvent } from 'react';
import { PANELS, FAQ } from '../data';
import { LogoSvg, CheckIcon, ChevronDown, PlusIcon } from './Icons';
import { supabase } from '../lib/supabase';

const ModalContext = createContext<{ open: () => void }>({ open: () => {} });

const REFERRAL_OPTIONS = [
  'Instagram',
  'Google',
  'Indicação de colega',
  'Evento / feira',
  'LinkedIn',
  'Outro',
];

function LeadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [referral, setReferral] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from('utopet_leads').insert([{
        name: fullName,
        contact: phone,
        clinic: clinicName,
        source: referral,
      }]);
    } catch {
      // silent
    }
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
      setClinicName('');
      setReferral('');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="logo" style={{ fontSize: '22px', color: 'var(--preto)' }}><LogoSvg />topet</span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(22px,3vw,28px)', marginTop: '16px' }}>Agende sua demonstração</h3>
              <p style={{ color: 'var(--cinza)', fontSize: '15px', marginTop: '8px' }}>Preencha os dados abaixo e nossa equipe entra em contato.</p>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="fullName">Nome completo</label>
                <input id="fullName" type="text" placeholder="Seu nome completo" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Número</label>
                <input id="phone" type="tel" placeholder="(00) 00000-0000" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="clinic">Nome da Clínica</label>
                <input id="clinic" type="text" placeholder="Nome da sua clínica" required value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="referral">Por onde nos conheceu?</label>
                <select id="referral" required value={referral} onChange={(e) => setReferral(e.target.value)}>
                  <option value="" disabled>Selecione uma opção</option>
                  {REFERRAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-roxo" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={loading}>
                {loading ? 'Enviando...' : 'Agendar demonstração'}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--roxo)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', marginTop: '16px' }}>Recebemos seu contato!</h3>
            <p style={{ color: 'var(--cinza)', fontSize: '15px', marginTop: '10px' }}>Em breve a equipe Utopet fala com você.</p>
            <button className="btn btn-roxo" style={{ marginTop: '24px' }} onClick={handleClose}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useContext(ModalContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <nav className={`nav ${!scrolled ? 'dark' : ''}`}>
          <a href="#" className="logo" aria-label="Utopet">
            <LogoSvg />topet
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#o-que-e" onClick={() => setMenuOpen(false)}>O que é</a>
            <a href="#veterinario" onClick={() => setMenuOpen(false)}>Para o veterinário</a>
            <a href="#exames" onClick={() => setMenuOpen(false)}>O exame</a>
            <a href="#roi" onClick={() => setMenuOpen(false)}>Caso de negócio</a>
            <a href="#modelos" onClick={() => setMenuOpen(false)}>Modelos</a>
            <button className="btn btn-light" style={{ padding: '11px 22px' }} onClick={() => { setMenuOpen(false); open(); }}>Agendar demonstração</button>
          </div>
          <button className="menu-btn" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const { open } = useContext(ModalContext);

  return (
    <section className="hero">
      <div className="hero-glow g1"></div>
      <div className="hero-glow g2"></div>
      <div className="wrap">
        <div className="hero-grid">
          <div className="reveal in">
            <span className="eyebrow" style={{ color: 'var(--lilas)' }}>Para clínicas e hospitais veterinários</span>
            <h1 style={{ marginTop: '18px' }}>Eleve a medicina preventiva da sua clínica — <span className="hl">e o seu faturamento.</span></h1>
            <p className="lead">A Utopet faz uma triagem de bem-estar de 139 parâmetros em 17 sistemas, não invasiva e em minutos. É apoio à decisão clínica que vira um novo serviço de alto valor percebido, com recorrência e fidelização do tutor.</p>
            <div className="hero-cta">
              <button className="btn btn-roxo" onClick={open}>Agendar demonstração</button>
              <a href="#roi" className="btn btn-ghost">Ver o caso de negócio</a>
            </div>
            <p className="hero-note">O veterinário sempre no comando · Treinamento da equipe incluso · Comodato e parcelamento disponíveis</p>
          </div>
          <div className="device-stage reveal in">
            <div className="scan"><span></span><span></span><span></span></div>
            <div className="device">
              <div className="ctrl l"></div>
              <div className="screen">
                <div className="score">85</div>
                <div className="lbl">WELLNESS</div>
                <svg className="smile" width="40" height="14" viewBox="0 0 40 14"><path d="M3 3 q17 13 34 0" fill="none" stroke="var(--lilas)" strokeWidth="3.4" strokeLinecap="round" /></svg>
              </div>
              <div className="ctrl r"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const count = parseInt(target.dataset.count || '0', 10);
            let cur = 0;
            const step = Math.max(1, Math.round(count / 40));
            const interval = setInterval(() => {
              cur += step;
              if (cur >= count) { cur = count; clearInterval(interval); }
              target.textContent = String(cur);
            }, 28);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.6 }
    );
    const elements = el.querySelectorAll('[data-count]');
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="wrap">
        <div className="stats-grid">
          <div className="stat"><div className="n" data-count="139">0</div><div className="t">parâmetros lidos</div></div>
          <div className="stat"><div className="n" data-count="17">0</div><div className="t">sistemas do corpo</div></div>
          <div className="stat"><div className="n"><span data-count="3">0</span> min</div><div className="t">por avaliação</div></div>
          <div className="stat"><div className="n">0</div><div className="t">agulhas ou estresse</div></div>
        </div>
      </div>
    </section>
  );
}

function WhatIs() {
  return (
    <section className="pad" id="o-que-e">
      <div className="wrap">
        <div className="whatis-grid">
          <div className="whatis-photo reveal">
            <img src="/images/utopet-aparelho.jpg" alt="Aparelho Utopet" />
          </div>
          <div className="reveal">
            <span className="eyebrow">Em 1 minuto</span>
            <h2 style={{ fontSize: 'clamp(28px,3.8vw,42px)', margin: '14px 0 14px' }}>Afinal, o que é a Utopet?</h2>
            <p style={{ fontSize: '17px', color: 'var(--cinza)' }}>A Utopet é um aparelho de <b style={{ color: 'var(--preto)' }}>análise funcional não invasiva</b>. Ela faz a leitura das frequências e do estado de ressonância dos sistemas do pet e transforma isso num panorama de bem-estar — em minutos, sem agulhas e sem estresse.</p>
            <div className="analogy"><b>Pense num radar.</b> A Utopet não substitui exames de sangue, ultrassom ou raio-X. Ela aponta, com antecedência, onde o organismo está pedindo atenção — para o veterinário saber exatamente onde olhar.</div>
            <div className="mini-steps">
              <div className="mini-step">
                <span className="mn"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="3.5" /></svg></span>
                <div><b>Lê o corpo, sem tocar por dentro</b><p>O pet apenas fica em contato com o aparelho. Nada de coleta, sedação ou dor.</p></div>
              </div>
              <div className="mini-step">
                <span className="mn"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h3l3-8 4 16 3-8h5" /></svg></span>
                <div><b>Mapeia 17 sistemas de uma vez</b><p>São 139 parâmetros: minerais, vitaminas, órgãos, metais pesados, alérgenos, colágeno e mais.</p></div>
              </div>
              <div className="mini-step">
                <span className="mn"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3h11l3 3v15H5z" /><path d="M9 12h6M9 16h6" /></svg></span>
                <div><b>Vira um relatório simples</b><p>Os dados brutos são traduzidos num laudo claro, com semáforo de prioridades.</p></div>
              </div>
            </div>
            <div className="disclaimer-chip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
              Rastreio funcional de referência — complementa, não substitui o diagnóstico veterinário.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Emotional() {
  return (
    <section className="emo">
      <img className="emo-media" src="/images/emo-poster.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.5 }} />
      <div className="emo-shade"></div>
      <div className="wrap">
        <h2 className="reveal">Eles não falam. <span className="hl">Mas sentem.</span></h2>
        <p className="reveal">Boa parte das alterações começa silenciosa, antes de virar queixa na consulta. A Utopet dá ao veterinário uma leitura ampla e precoce desses sinais — para agir na prevenção, não só no sintoma.</p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="pad" id="como">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Fluxo na clínica</span>
          <h2>Simples para a equipe. Encantador para o tutor.</h2>
          <p>Da chegada do pet ao plano entregue na mão do tutor — em uma única consulta.</p>
        </div>
        <div className="steps">
          <div className="step reveal">
            <div className="num">1</div>
            <h3>Posicione o pet</h3>
            <p>O aparelho faz a leitura por biorressonância de forma não invasiva. O cão ou gato fica confortável, sem coleta, sem jejum, sem estresse.</p>
            <div className="visual">
              <div className="pulse-dot">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
              </div>
            </div>
          </div>
          <div className="step reveal">
            <div className="num">2</div>
            <h3>Leia 139 parâmetros</h3>
            <p>Em minutos, 17 sistemas são avaliados: do fígado e rins a minerais, vitaminas, alérgenos e colágeno.</p>
            <div className="visual">
              <div className="bars"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
          <div className="step reveal">
            <div className="num">3</div>
            <h3>Entregue o plano</h3>
            <p>O software traduz os dados brutos num relatório claro, com o nome da sua clínica, e um plano de bem-estar acionável para o tutor seguir.</p>
            <div className="visual">
              <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
                <rect x="20" y="10" width="80" height="80" rx="10" fill="#EEEDFE" />
                <rect x="32" y="26" width="40" height="7" rx="3.5" fill="#AFA9EC" />
                <rect x="32" y="40" width="56" height="6" rx="3" fill="#C9C5F5" />
                <rect x="32" y="52" width="48" height="6" rx="3" fill="#C9C5F5" />
                <circle cx="78" cy="68" r="13" fill="#6B4FE8" />
                <path d="M73 68 l3.5 3.5 L84 64" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExamPanel({ panel, isOpen, onToggle }: { panel: typeof PANELS[0]; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.maxHeight = isOpen ? `${bodyRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  return (
    <div className={`panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-h" onClick={onToggle}>
        <div className="icn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={panel.i} />
          </svg>
        </div>
        <div className="pt">
          <b>{panel.n}</b>
          <span>{panel.c} parâmetros</span>
        </div>
        <span className="cnt">{panel.c}</span>
        <span className="chev"><ChevronDown /></span>
      </div>
      <div className="panel-b" ref={bodyRef}>
        <ul>
          {panel.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Exams() {
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  return (
    <section className="pad exams" id="exames">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">O que a Utopet le</span>
          <h2>17 painéis. 139 parâmetros. Um retrato completo.</h2>
          <p>Uma varredura de bem-estar que nenhum exame de rotina entrega em minutos. Clique em cada sistema para ver o que é avaliado.</p>
        </div>
        <div className="panel-grid">
          {PANELS.map((panel, idx) => (
            <ExamPanel
              key={idx}
              panel={panel}
              isOpen={openPanel === idx}
              onToggle={() => setOpenPanel(openPanel === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClinicalAuthority() {
  return (
    <section className="pad" id="veterinario" style={{ background: 'var(--cinza-claro)' }}>
      <div className="wrap">
        <div className="auth-grid">
          <div className="reveal">
            <span className="eyebrow">O veterinário no comando</span>
            <h2 style={{ fontSize: 'clamp(28px,3.8vw,44px)', margin: '14px 0 10px' }}>Uma ferramenta de apoio. A decisão é sempre sua.</h2>
            <p style={{ color: 'var(--cinza)', fontSize: '17px', marginBottom: '8px' }}>A Utopet não diagnostica nem substitui o seu julgamento clínico. Ela amplia o que você consegue observar em uma consulta e estrutura a conversa preventiva com o tutor.</p>
            <ul className="auth-points">
              <li>
                <span className="ai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 4v5c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7z" /></svg></span>
                <div><b>Complementa, não substitui</b><p>Triagem de bem-estar que direciona anamnese e indica quando aprofundar com exames laboratoriais e de imagem.</p></div>
              </li>
              <li>
                <span className="ai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg></span>
                <div><b>Visão de 17 sistemas em minutos</b><p>Um panorama amplo do organismo que seria inviável reunir rapidamente em uma única consulta de rotina.</p></div>
              </li>
              <li>
                <span className="ai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>
                <div><b>Acompanhamento ao longo do tempo</b><p>Reavaliações periódicas mostram a evolução do paciente e sustentam a adesão do tutor ao plano preventivo.</p></div>
              </li>
            </ul>
          </div>
          <div className="reveal">
            <div className="auth-visual">
              <div className="ag"></div>
              <div style={{ position: 'relative' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--lilas)" style={{ marginBottom: '18px' }}><path d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" opacity=".25" /><path d="M10 5h4M9 13h6M9 17h6" stroke="var(--lilas)" strokeWidth="1.6" fill="none" /></svg>
                <p className="quote">"Em poucos minutos eu tenho um mapa amplo do paciente e um ponto de partida muito mais rico para a conversa com o tutor."</p>
                <p style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Apoio à decisão, com você sempre interpretando o resultado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Software() {
  return (
    <section className="pad" id="software">
      <div className="wrap">
        <div className="moat-grid">
          <div className="reveal">
            <div className="report-card">
              <div className="report-top">
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--cinza)', letterSpacing: '.1em' }}>RELATÓRIO · LUNA</div>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: '18px' }}>Wellness Score</div>
                </div>
                <span className="logo" style={{ fontSize: '18px', color: 'var(--preto)' }}><LogoSvg />topet</span>
              </div>
              <div className="gauge">
                <svg viewBox="0 0 150 80"><path d="M10 78 A65 65 0 0 1 140 78" fill="none" stroke="#EEEDFE" strokeWidth="13" strokeLinecap="round" /><path d="M10 78 A65 65 0 0 1 122 32" fill="none" stroke="#6B4FE8" strokeWidth="13" strokeLinecap="round" /></svg>
                <div className="gv">85</div>
              </div>
              <div className="report-row"><span className="dot" style={{ background: '#1D9E75' }}></span><span className="rl">Hepatobiliar</span><span className="rv">Equilibrado</span></div>
              <div className="report-row"><span className="dot" style={{ background: '#EF9F27' }}></span><span className="rl">Minerais · Zinco</span><span className="rv">Atenção</span></div>
              <div className="report-row"><span className="dot" style={{ background: '#1D9E75' }}></span><span className="rl">Imunologico</span><span className="rv">Saudável</span></div>
              <div className="chat-bubble"><b>@utopet</b><br />Ótimo sinal! A Luna está dentro do padrão saudável hoje. Pequenas mudanças na dieta ajudam o zinco a normalizar.</div>
            </div>
          </div>
          <div className="reveal">
            <span className="eyebrow">O diferencial não está no aparelho</span>
            <h2 style={{ fontSize: 'clamp(28px,3.8vw,44px)', margin: '14px 0 10px' }}>O software que transforma 139 números em decisão clínica.</h2>
            <p style={{ color: 'var(--cinza)', fontSize: '17px', marginBottom: '22px' }}>Qualquer máquina gera dados. A Utopet traduz os 139 parâmetros num relatório que o tutor entende e a sua clínica assina.</p>
            <ul className="moat-list">
              <li>
                <span className="mi"><CheckIcon /></span>
                <div><b>Relatório com a sua marca</b><p>O documento sai com o nome e a identidade da sua clínica — não da Utopet.</p></div>
              </li>
              <li>
                <span className="mi"><CheckIcon /></span>
                <div><b>Linguagem para o tutor</b><p>Sem jargão. Wellness Score, alertas visuais e próximos passos claros.</p></div>
              </li>
              <li>
                <span className="mi"><CheckIcon /></span>
                <div><b>Histórico que gera retorno</b><p>Cada avaliação vira acompanhamento. O tutor volta para ver a evolução.</p></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="pad" id="beneficios" style={{ background: 'var(--cinza-claro)' }}>
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">Por que ter na sua clínica</span>
          <h2>Um ativo que trabalha pela sua receita e pela sua reputação.</h2>
        </div>
        <div className="ben-grid">
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
            <h3>Nova fonte de receita</h3>
            <p>Um serviço de avaliação de bem-estar com ticket próprio, que se paga rápido e abre espaço para planos preventivos recorrentes.</p>
          </div>
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6L8 13.9 2 9.4h7.6z" /></svg></div>
            <h3>Diferenciação real</h3>
            <p>Poucas clínicas oferecem uma varredura de 139 parâmetros não invasiva. Você passa a ser referência em medicina preventiva na sua região.</p>
          </div>
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg></div>
            <h3>Fidelização do tutor</h3>
            <p>O tutor que recebe um plano claro e acompanha a evolução do pet volta mais e confia mais. Cuidado contínuo vira vínculo.</p>
          </div>
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></div>
            <h3>Triagem em minutos</h3>
            <p>Uma leitura rápida e indolor que ajuda a priorizar atenção e a abrir conversa para exames complementares quando necessário.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pets() {
  return (
    <section className="pad" id="pets">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">Cães e gatos · Todas as raças</span>
          <h2>Um aparelho. Todos os pets.</h2>
          <p>O software ajusta a leitura dos 139 parâmetros conforme espécie, porte, raça e idade — do filhote ao sênior, do gato ao cão de grande porte.</p>
        </div>

        <div className="pet-banner reveal">
          <img src="/images/pet-banner-poster.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(11,11,16,.9) 0%,rgba(11,11,16,.55) 55%,rgba(11,11,16,.25) 100%)', zIndex: 1 }}></div>
          <div className="pb-text">
            <span className="eyebrow" style={{ color: 'var(--lilas)' }}>Estilos de vida diferentes</span>
            <h3>Cada organismo, lido do seu jeito.</h3>
            <p>Filhote agitado ou sênior tranquilo, vira-lata ou raça pura — a interpretação se adapta ao perfil de cada paciente para um retrato fiel do bem-estar.</p>
          </div>
        </div>

        <div className="petcards">
          <div className="petcard reveal">
            <img className="ph" src="/images/cao-grande.jpg" alt="Cão de grande porte" />
            <div className="ov"></div>
            <div className="ct"><div className="k">Para cães de grande porte</div><h3>Dos gigantes gentis</h3><p>Labradores, pastores, golden — leitura ajustada ao metabolismo de raças grandes.</p></div>
          </div>
          <div className="petcard reveal">
            <img className="ph" src="/images/cao-pequeno.jpg" alt="Cão de pequeno porte" />
            <div className="ov"></div>
            <div className="ct"><div className="k">Para pequenas lendas</div><h3>Aos pequenos notáveis</h3><p>Spitz, shih-tzu, dachshund e vira-latas pequenos — sem perder nenhum detalhe.</p></div>
          </div>
          <div className="petcard reveal">
            <img className="ph" src="/images/gato.jpg" alt="Gato" />
            <div className="ov"></div>
            <div className="ct"><div className="k">Para gatos curiosos</div><h3>A todos os felinos</h3><p>Persas, siameses, SRD — leitura específica para o organismo dos gatos.</p></div>
          </div>
        </div>

        <div className="coverage reveal">
          <div className="cov">
            <span className="ci"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="10" r="4" /><circle cx="17" cy="11" r="3" /><path d="M3 20c0-3 3-5 5-5s5 2 5 5M13 20c0-2 2-3 4-3s4 1 4 3" /></svg></span>
            <div><b>Cães e gatos</b><span>as duas espécies</span></div>
          </div>
          <div className="cov">
            <span className="ci"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 18V9M12 18V5M18 18v-6" /></svg></span>
            <div><b>Todos os portes</b><span>do toy ao gigante</span></div>
          </div>
          <div className="cov">
            <span className="ci"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>
            <div><b>Filhote a senior</b><span>qualquer idade</span></div>
          </div>
          <div className="cov">
            <span className="ci"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 13l4 4L19 7" /></svg></span>
            <div><b>Independe de raca</b><span>puras e SRD</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ROI() {
  return (
    <section className="pad roi" id="roi">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow" style={{ color: 'var(--lilas)' }}>O caso de negócio</span>
          <h2>Mais que um equipamento. Um centro de receita.</h2>
          <p>Um novo serviço com ticket próprio, custo marginal baixo por avaliação e potencial de recorrência preventiva.</p>
        </div>
        <div className="roi-grid">
          <div className="roi-card reveal">
            <div className="rn">+1</div>
            <div className="rl">novo serviço no portfólio</div>
            <div className="rd">Avaliação de bem-estar com ticket próprio, somada à consulta — sem depender de nova demanda.</div>
          </div>
          <div className="roi-card reveal">
            <div className="rn">~3 min</div>
            <div className="rl">por avaliação</div>
            <div className="rd">Tempo curto de operação significa alta capacidade de atendimento e custo marginal baixo por leitura.</div>
          </div>
          <div className="roi-card reveal">
            <div className="rn">&#8635;</div>
            <div className="rl">receita recorrente</div>
            <div className="rd">Reavaliações periódicas transformam um exame pontual em acompanhamento contínuo do paciente.</div>
          </div>
        </div>
        <p className="roi-note">Projeções variam conforme ticket praticado, volume de atendimentos e modelo de aquisição. Apresentamos uma simulação personalizada na demonstração.</p>
      </div>
    </section>
  );
}

function Segments() {
  return (
    <section className="pad" id="segmentos">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">Para cada tipo de operação</span>
          <h2>Onde a Utopet se encaixa.</h2>
        </div>
        <div className="seg-grid">
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6" /></svg></div>
            <h3>Clínica geral</h3>
            <p>Agrega um serviço preventivo de alto valor à rotina de consultas e check-ups.</p>
          </div>
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M5 8h14M5 8a3 3 0 0 0 6 0M11 8a3 3 0 0 0 6 0" /></svg></div>
            <h3>Hospital veterinário</h3>
            <p>Apoio à triagem e ao acompanhamento de pacientes em volume, com painel multiusuário.</p>
          </div>
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg></div>
            <h3>Especialidades</h3>
            <p>Visão sistêmica que complementa a investigação em dermato, nutrição, geriatria e mais.</p>
          </div>
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 8h16l-1.5 11a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2zM9 8V6a3 3 0 0 1 6 0v2" /></svg></div>
            <h3>Redes e franquias</h3>
            <p>Padronização do serviço entre unidades, condição por volume e gestão centralizada.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="pad" style={{ background: 'var(--cinza-claro)' }}>
      <div className="wrap">
        <div className="testi reveal">
          <blockquote>"Passei a ter uma conversa de prevenção que <span className="hl">o tutor entende e valoriza</span> — e isso mudou a percepção de cuidado da minha clínica."</blockquote>
          <div className="who">
            <div className="av">MV</div>
            <div className="nm"><b>Médico(a)-veterinário(a)</b><span>Espaço para depoimento real do seu cliente parceiro</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Models() {
  const { open } = useContext(ModalContext);

  return (
    <section className="pad" id="modelos">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">Modelos de aquisição</span>
          <h2>Escolha como comecar.</h2>
          <p>Condições flexíveis para clínicas de todos os portes. Valores e parcelamento sob proposta.</p>
        </div>
        <div className="models">
          <div className="model reveal">
            <h3>Comodato</h3>
            <p className="desc">O aparelho na sua clínica sem investimento inicial, com modelo de uso compartilhado.</p>
            <ul>
              <li><CheckIcon />Sem custo de equipamento</li>
              <li><CheckIcon />Software incluso</li>
              <li><CheckIcon />Ideal para validar a demanda</li>
            </ul>
            <button className="btn btn-roxo" style={{ width: '100%', justifyContent: 'center' }} onClick={open}>Quero saber mais</button>
          </div>
          <div className="model feat reveal">
            <span className="tag">Mais escolhido</span>
            <h3>Compra parcelada</h3>
            <p className="desc">O aparelho é seu, com parcelamento que cabe no fluxo de caixa da clínica.</p>
            <ul>
              <li><CheckIcon />Propriedade do equipamento</li>
              <li><CheckIcon />Parcelamento facilitado</li>
              <li><CheckIcon />Software + suporte + treinamento</li>
            </ul>
            <button className="btn btn-roxo" style={{ width: '100%', justifyContent: 'center' }} onClick={open}>Pedir proposta</button>
          </div>
          <div className="model reveal">
            <h3>Rede / grupo</h3>
            <p className="desc">Para redes e franquias com várias unidades, com condição especial por volume.</p>
            <ul>
              <li><CheckIcon />Preço por volume</li>
              <li><CheckIcon />Painel multi-unidade</li>
              <li><CheckIcon />Onboarding dedicado</li>
            </ul>
            <button className="btn btn-roxo" style={{ width: '100%', justifyContent: 'center' }} onClick={open}>Falar com vendas</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="pad" id="faq" style={{ background: 'var(--cinza-claro)' }}>
      <div className="wrap" style={{ maxWidth: '860px' }}>
        <div className="sec-head center reveal">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2>O que toda clínica pergunta.</h2>
        </div>
        <div>
          {FAQ.map(([q, a], idx) => (
            <div key={idx} className={`faq-item ${openIdx === idx ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
                {q}
                <span className="chev"><PlusIcon /></span>
              </div>
              <div className="faq-a" style={{ maxHeight: openIdx === idx ? '200px' : 0 }}>
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { open } = useContext(ModalContext);

  return (
    <section className="pad" id="contato">
      <div className="wrap">
        <div className="final reveal">
          <div className="glow"></div>
          <div style={{ position: 'relative' }}>
            <h2>Pronta para colocar a Utopet na sua clínica?</h2>
            <p>Agende uma demonstração sem compromisso. Mostramos o aparelho, o software e os números do modelo de negócio na prática.</p>
            <button className="btn btn-light" style={{ marginTop: '34px' }} onClick={open}>Agendar demonstração</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { open } = useContext(ModalContext);

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div style={{ maxWidth: '300px' }}>
            <span className="logo" style={{ color: '#fff' }}><LogoSvg />topet</span>
            <p style={{ marginTop: '16px', fontSize: '14.5px' }}>O bem-estar do seu pet, traduzido. Health tech para clínicas que cuidam de verdade.</p>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>Produto</h4>
              <a href="#como">Como funciona</a>
              <a href="#exames">O exame</a>
              <a href="#software">O software</a>
              <a href="#modelos">Modelos</a>
            </div>
            <div className="foot-col">
              <h4>Clínica</h4>
              <a href="#beneficios">Benefícios</a>
              <a href="#faq">Dúvidas</a>
              <a href="#" onClick={(e) => { e.preventDefault(); open(); }}>Agendar demo</a>
            </div>
            <div className="foot-col">
              <h4>Contato</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); open(); }}>utopet.co</a>
              <a href="#" onClick={(e) => { e.preventDefault(); open(); }}>@utopet</a>
              <a href="mailto:contato@utopet.com.br">contato@utopet.com.br</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Utopet. Todos os direitos reservados.</span>
          <span>Bem-estar não substitui diagnóstico veterinário.</span>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.reveal:not(.in)');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <ModalContext.Provider value={{ open: () => setModalOpen(true) }}>
      <Header />
      <Hero />
      <Stats />
      <WhatIs />
      <Emotional />
      <HowItWorks />
      <Exams />
      <ClinicalAuthority />
      <Software />
      <Benefits />
      <Pets />
      <ROI />
      <Segments />
      <Testimonial />
      <Models />
      <FaqSection />
      <FinalCTA />
      <Footer />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </ModalContext.Provider>
  );
}
