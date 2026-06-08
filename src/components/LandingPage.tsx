import { useState, useEffect, useRef, FormEvent } from 'react';
import { PANELS, FAQ } from '../data';
import { LogoSvg, CheckIcon, ChevronDown, PlusIcon } from './Icons';
import { supabase } from '../lib/supabase';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            <a href="#o-que-e" onClick={() => setMenuOpen(false)}>O que e</a>
            <a href="#veterinario" onClick={() => setMenuOpen(false)}>Para o veterinario</a>
            <a href="#exames" onClick={() => setMenuOpen(false)}>O exame</a>
            <a href="#roi" onClick={() => setMenuOpen(false)}>Caso de negocio</a>
            <a href="#modelos" onClick={() => setMenuOpen(false)}>Modelos</a>
            <a href="#contato" className="btn btn-light" style={{ padding: '11px 22px' }} onClick={() => setMenuOpen(false)}>Agendar demonstracao</a>
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
  return (
    <section className="hero">
      <div className="hero-glow g1"></div>
      <div className="hero-glow g2"></div>
      <div className="wrap">
        <div className="hero-grid">
          <div className="reveal in">
            <span className="eyebrow" style={{ color: 'var(--lilas)' }}>Para clinicas e hospitais veterinarios</span>
            <h1 style={{ marginTop: '18px' }}>Eleve a medicina preventiva da sua clinica — <span className="hl">e o seu faturamento.</span></h1>
            <p className="lead">A Utopet faz uma triagem de bem-estar de 139 parametros em 17 sistemas, nao invasiva e em minutos. E apoio a decisao clinica que vira um novo servico de alto valor percebido, com recorrencia e fidelizacao do tutor.</p>
            <div className="hero-cta">
              <a href="#contato" className="btn btn-roxo">Agendar demonstracao</a>
              <a href="#roi" className="btn btn-ghost">Ver o caso de negocio</a>
            </div>
            <p className="hero-note">O veterinario sempre no comando · Treinamento da equipe incluso · Comodato e parcelamento disponiveis</p>
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
          <div className="stat"><div className="n" data-count="139">0</div><div className="t">parametros lidos</div></div>
          <div className="stat"><div className="n" data-count="17">0</div><div className="t">sistemas do corpo</div></div>
          <div className="stat"><div className="n"><span data-count="3">0</span> min</div><div className="t">por avaliacao</div></div>
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
            <img src="https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Aparelho Utopet" />
          </div>
          <div className="reveal">
            <span className="eyebrow">Em 1 minuto</span>
            <h2 style={{ fontSize: 'clamp(28px,3.8vw,42px)', margin: '14px 0 14px' }}>Afinal, o que e a Utopet?</h2>
            <p style={{ fontSize: '17px', color: 'var(--cinza)' }}>A Utopet e um aparelho de <b style={{ color: 'var(--preto)' }}>analise funcional nao invasiva</b>. Ela faz a leitura das frequencias e do estado de ressonancia dos sistemas do pet e transforma isso num panorama de bem-estar — em minutos, sem agulhas e sem estresse.</p>
            <div className="analogy"><b>Pense num radar.</b> A Utopet nao substitui exames de sangue, ultrassom ou raio-X. Ela aponta, com antecedencia, onde o organismo esta pedindo atencao — para o veterinario saber exatamente onde olhar.</div>
            <div className="mini-steps">
              <div className="mini-step">
                <span className="mn"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="3.5" /></svg></span>
                <div><b>Le o corpo, sem tocar por dentro</b><p>O pet apenas fica em contato com o aparelho. Nada de coleta, sedacao ou dor.</p></div>
              </div>
              <div className="mini-step">
                <span className="mn"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h3l3-8 4 16 3-8h5" /></svg></span>
                <div><b>Mapeia 17 sistemas de uma vez</b><p>Sao 139 parametros: minerais, vitaminas, orgaos, metais pesados, alergenos, colageno e mais.</p></div>
              </div>
              <div className="mini-step">
                <span className="mn"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3h11l3 3v15H5z" /><path d="M9 12h6M9 16h6" /></svg></span>
                <div><b>Vira um relatorio simples</b><p>Os dados brutos sao traduzidos num laudo claro, com semaforo de prioridades.</p></div>
              </div>
            </div>
            <div className="disclaimer-chip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
              Rastreio funcional de referencia — complementa, nao substitui o diagnostico veterinario.
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
      <div className="emo-shade"></div>
      <div className="wrap">
        <h2 className="reveal">Eles nao falam. <span className="hl">Mas sentem.</span></h2>
        <p className="reveal">Boa parte das alteracoes comeca silenciosa, antes de virar queixa na consulta. A Utopet da ao veterinario uma leitura ampla e precoce desses sinais — para agir na prevencao, nao so no sintoma.</p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="pad" id="como">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Fluxo na clinica</span>
          <h2>Simples para a equipe. Encantador para o tutor.</h2>
          <p>Da chegada do pet ao plano entregue na mao do tutor — em uma unica consulta.</p>
        </div>
        <div className="steps">
          <div className="step reveal">
            <div className="num">1</div>
            <h3>Posicione o pet</h3>
            <p>O aparelho faz a leitura por bioressonancia de forma nao invasiva. O cao ou gato fica confortavel, sem coleta, sem jejum, sem estresse.</p>
            <div className="visual">
              <div className="pulse-dot">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
              </div>
            </div>
          </div>
          <div className="step reveal">
            <div className="num">2</div>
            <h3>Leia 139 parametros</h3>
            <p>Em minutos, 17 sistemas sao avaliados: do figado e rins a minerais, vitaminas, alergenos e colageno.</p>
            <div className="visual">
              <div className="bars"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
          <div className="step reveal">
            <div className="num">3</div>
            <h3>Entregue o plano</h3>
            <p>O software traduz os dados brutos num relatorio claro, com o nome da sua clinica, e um plano de bem-estar acionavel para o tutor seguir.</p>
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
          <span>{panel.c} parametros</span>
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
          <h2>17 paineis. 139 parametros. Um retrato completo.</h2>
          <p>Uma varredura de bem-estar que nenhum exame de rotina entrega em minutos. Clique em cada sistema para ver o que e avaliado.</p>
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
            <span className="eyebrow">O veterinario no comando</span>
            <h2 style={{ fontSize: 'clamp(28px,3.8vw,44px)', margin: '14px 0 10px' }}>Uma ferramenta de apoio. A decisao e sempre sua.</h2>
            <p style={{ color: 'var(--cinza)', fontSize: '17px', marginBottom: '8px' }}>A Utopet nao diagnostica nem substitui o seu julgamento clinico. Ela amplia o que voce consegue observar em uma consulta e estrutura a conversa preventiva com o tutor.</p>
            <ul className="auth-points">
              <li>
                <span className="ai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 4v5c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7z" /></svg></span>
                <div><b>Complementa, nao substitui</b><p>Triagem de bem-estar que direciona anamnese e indica quando aprofundar com exames laboratoriais e de imagem.</p></div>
              </li>
              <li>
                <span className="ai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg></span>
                <div><b>Visao de 17 sistemas em minutos</b><p>Um panorama amplo do organismo que seria inviavel reunir rapidamente em uma unica consulta de rotina.</p></div>
              </li>
              <li>
                <span className="ai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>
                <div><b>Acompanhamento ao longo do tempo</b><p>Reavaliacoes periodicas mostram a evolucao do paciente e sustentam a adesao do tutor ao plano preventivo.</p></div>
              </li>
            </ul>
          </div>
          <div className="reveal">
            <div className="auth-visual">
              <div className="ag"></div>
              <div style={{ position: 'relative' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--lilas)" style={{ marginBottom: '18px' }}><path d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" opacity=".25" /><path d="M10 5h4M9 13h6M9 17h6" stroke="var(--lilas)" strokeWidth="1.6" fill="none" /></svg>
                <p className="quote">"Em poucos minutos eu tenho um mapa amplo do paciente e um ponto de partida muito mais rico para a conversa com o tutor."</p>
                <p style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Apoio a decisao, com voce sempre interpretando o resultado.</p>
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
                  <div style={{ fontSize: '12px', color: 'var(--cinza)', letterSpacing: '.1em' }}>RELATORIO · LUNA</div>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: '18px' }}>Wellness Score</div>
                </div>
                <span className="logo" style={{ fontSize: '18px', color: 'var(--preto)' }}><LogoSvg />topet</span>
              </div>
              <div className="gauge">
                <svg viewBox="0 0 150 80"><path d="M10 78 A65 65 0 0 1 140 78" fill="none" stroke="#EEEDFE" strokeWidth="13" strokeLinecap="round" /><path d="M10 78 A65 65 0 0 1 122 32" fill="none" stroke="#6B4FE8" strokeWidth="13" strokeLinecap="round" /></svg>
                <div className="gv">85</div>
              </div>
              <div className="report-row"><span className="dot" style={{ background: '#1D9E75' }}></span><span className="rl">Hepatobiliar</span><span className="rv">Equilibrado</span></div>
              <div className="report-row"><span className="dot" style={{ background: '#EF9F27' }}></span><span className="rl">Minerais · Zinco</span><span className="rv">Atencao</span></div>
              <div className="report-row"><span className="dot" style={{ background: '#1D9E75' }}></span><span className="rl">Imunologico</span><span className="rv">Saudavel</span></div>
              <div className="chat-bubble"><b>@utopet</b><br />Otimo sinal! A Luna esta dentro do padrao saudavel hoje. Pequenas mudancas na dieta ajudam o zinco a normalizar.</div>
            </div>
          </div>
          <div className="reveal">
            <span className="eyebrow">O diferencial nao esta no aparelho</span>
            <h2 style={{ fontSize: 'clamp(28px,3.8vw,44px)', margin: '14px 0 10px' }}>O software que transforma 139 numeros em decisao clinica.</h2>
            <p style={{ color: 'var(--cinza)', fontSize: '17px', marginBottom: '22px' }}>Qualquer maquina gera dados. A Utopet traduz os 139 parametros num relatorio que o tutor entende e a sua clinica assina.</p>
            <ul className="moat-list">
              <li>
                <span className="mi"><CheckIcon /></span>
                <div><b>Relatorio com a sua marca</b><p>O documento sai com o nome e a identidade da sua clinica — nao da Utopet.</p></div>
              </li>
              <li>
                <span className="mi"><CheckIcon /></span>
                <div><b>Linguagem para o tutor</b><p>Sem jargao. Wellness Score, alertas visuais e proximos passos claros.</p></div>
              </li>
              <li>
                <span className="mi"><CheckIcon /></span>
                <div><b>Historico que gera retorno</b><p>Cada avaliacao vira acompanhamento. O tutor volta para ver a evolucao.</p></div>
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
          <span className="eyebrow">Por que ter na sua clinica</span>
          <h2>Um ativo que trabalha pela sua receita e pela sua reputacao.</h2>
        </div>
        <div className="ben-grid">
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
            <h3>Nova fonte de receita</h3>
            <p>Um servico de avaliacao de bem-estar com ticket proprio, que se paga rapido e abre espaco para planos preventivos recorrentes.</p>
          </div>
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6L8 13.9 2 9.4h7.6z" /></svg></div>
            <h3>Diferenciacao real</h3>
            <p>Poucas clinicas oferecem uma varredura de 139 parametros nao invasiva. Voce passa a ser referencia em medicina preventiva na sua regiao.</p>
          </div>
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg></div>
            <h3>Fidelizacao do tutor</h3>
            <p>O tutor que recebe um plano claro e acompanha a evolucao do pet volta mais e confia mais. Cuidado continuo vira vinculo.</p>
          </div>
          <div className="ben reveal">
            <div className="bi"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></div>
            <h3>Triagem em minutos</h3>
            <p>Uma leitura rapida e indolor que ajuda a priorizar atencao e a abrir conversa para exames complementares quando necessario.</p>
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
          <span className="eyebrow">Caes e gatos · Todas as racas</span>
          <h2>Um aparelho. Todos os pets.</h2>
          <p>O software ajusta a leitura dos 139 parametros conforme especie, porte, raca e idade — do filhote ao senior, do gato ao cao de grande porte.</p>
        </div>

        <div className="pet-banner reveal">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(11,11,16,.9) 0%,rgba(11,11,16,.55) 55%,rgba(11,11,16,.25) 100%)', zIndex: 1 }}></div>
          <div className="pb-text">
            <span className="eyebrow" style={{ color: 'var(--lilas)' }}>Estilos de vida diferentes</span>
            <h3>Cada organismo, lido do seu jeito.</h3>
            <p>Filhote agitado ou senior tranquilo, vira-lata ou raca pura — a interpretacao se adapta ao perfil de cada paciente para um retrato fiel do bem-estar.</p>
          </div>
        </div>

        <div className="petcards">
          <div className="petcard reveal">
            <img className="ph" src="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Cao de grande porte" />
            <div className="ov"></div>
            <div className="ct"><div className="k">Para caes de grande porte</div><h3>Dos gigantes gentis</h3><p>Labradores, pastores, golden — leitura ajustada ao metabolismo de racas grandes.</p></div>
          </div>
          <div className="petcard reveal">
            <img className="ph" src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Cao de pequeno porte" />
            <div className="ov"></div>
            <div className="ct"><div className="k">Para pequenas lendas</div><h3>Aos pequenos notaveis</h3><p>Spitz, shih-tzu, dachshund e vira-latas pequenos — sem perder nenhum detalhe.</p></div>
          </div>
          <div className="petcard reveal">
            <img className="ph" src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Gato" />
            <div className="ov"></div>
            <div className="ct"><div className="k">Para gatos curiosos</div><h3>A todos os felinos</h3><p>Persas, siameses, SRD — leitura especifica para o organismo dos gatos.</p></div>
          </div>
        </div>

        <div className="coverage reveal">
          <div className="cov">
            <span className="ci"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="10" r="4" /><circle cx="17" cy="11" r="3" /><path d="M3 20c0-3 3-5 5-5s5 2 5 5M13 20c0-2 2-3 4-3s4 1 4 3" /></svg></span>
            <div><b>Caes e gatos</b><span>as duas especies</span></div>
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
          <span className="eyebrow" style={{ color: 'var(--lilas)' }}>O caso de negocio</span>
          <h2>Mais que um equipamento. Um centro de receita.</h2>
          <p>Um novo servico com ticket proprio, custo marginal baixo por avaliacao e potencial de recorrencia preventiva.</p>
        </div>
        <div className="roi-grid">
          <div className="roi-card reveal">
            <div className="rn">+1</div>
            <div className="rl">novo servico no portfolio</div>
            <div className="rd">Avaliacao de bem-estar com ticket proprio, somada a consulta — sem depender de nova demanda.</div>
          </div>
          <div className="roi-card reveal">
            <div className="rn">~3 min</div>
            <div className="rl">por avaliacao</div>
            <div className="rd">Tempo curto de operacao significa alta capacidade de atendimento e custo marginal baixo por leitura.</div>
          </div>
          <div className="roi-card reveal">
            <div className="rn">&#8635;</div>
            <div className="rl">receita recorrente</div>
            <div className="rd">Reavaliacoes periodicas transformam um exame pontual em acompanhamento continuo do paciente.</div>
          </div>
        </div>
        <p className="roi-note">Projecoes variam conforme ticket praticado, volume de atendimentos e modelo de aquisicao. Apresentamos uma simulacao personalizada na demonstracao.</p>
      </div>
    </section>
  );
}

function Segments() {
  return (
    <section className="pad" id="segmentos">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">Para cada tipo de operacao</span>
          <h2>Onde a Utopet se encaixa.</h2>
        </div>
        <div className="seg-grid">
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6" /></svg></div>
            <h3>Clinica geral</h3>
            <p>Agrega um servico preventivo de alto valor a rotina de consultas e check-ups.</p>
          </div>
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v18M5 8h14M5 8a3 3 0 0 0 6 0M11 8a3 3 0 0 0 6 0" /></svg></div>
            <h3>Hospital veterinario</h3>
            <p>Apoio a triagem e ao acompanhamento de pacientes em volume, com painel multiusuario.</p>
          </div>
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg></div>
            <h3>Especialidades</h3>
            <p>Visao sistemica que complementa a investigacao em dermato, nutricao, geriatria e mais.</p>
          </div>
          <div className="seg reveal">
            <div className="si"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 8h16l-1.5 11a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2zM9 8V6a3 3 0 0 1 6 0v2" /></svg></div>
            <h3>Redes e franquias</h3>
            <p>Padronizacao do servico entre unidades, condicao por volume e gestao centralizada.</p>
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
          <blockquote>"Passei a ter uma conversa de prevencao que <span className="hl">o tutor entende e valoriza</span> — e isso mudou a percepcao de cuidado da minha clinica."</blockquote>
          <div className="who">
            <div className="av">MV</div>
            <div className="nm"><b>Medico(a)-veterinario(a)</b><span>Espaco para depoimento real do seu cliente parceiro</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Models() {
  return (
    <section className="pad" id="modelos">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">Modelos de aquisicao</span>
          <h2>Escolha como comecar.</h2>
          <p>Condicoes flexiveis para clinicas de todos os portes. Valores e parcelamento sob proposta.</p>
        </div>
        <div className="models">
          <div className="model reveal">
            <h3>Comodato</h3>
            <p className="desc">O aparelho na sua clinica sem investimento inicial, com modelo de uso compartilhado.</p>
            <ul>
              <li><CheckIcon />Sem custo de equipamento</li>
              <li><CheckIcon />Software incluso</li>
              <li><CheckIcon />Ideal para validar a demanda</li>
            </ul>
            <a href="#contato" className="btn btn-roxo" style={{ width: '100%', justifyContent: 'center' }}>Quero saber mais</a>
          </div>
          <div className="model feat reveal">
            <span className="tag">Mais escolhido</span>
            <h3>Compra parcelada</h3>
            <p className="desc">O aparelho e seu, com parcelamento que cabe no fluxo de caixa da clinica.</p>
            <ul>
              <li><CheckIcon />Propriedade do equipamento</li>
              <li><CheckIcon />Parcelamento facilitado</li>
              <li><CheckIcon />Software + suporte + treinamento</li>
            </ul>
            <a href="#contato" className="btn btn-roxo" style={{ width: '100%', justifyContent: 'center' }}>Pedir proposta</a>
          </div>
          <div className="model reveal">
            <h3>Rede / grupo</h3>
            <p className="desc">Para redes e franquias com varias unidades, com condicao especial por volume.</p>
            <ul>
              <li><CheckIcon />Preco por volume</li>
              <li><CheckIcon />Painel multi-unidade</li>
              <li><CheckIcon />Onboarding dedicado</li>
            </ul>
            <a href="#contato" className="btn btn-roxo" style={{ width: '100%', justifyContent: 'center' }}>Falar com vendas</a>
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
          <span className="eyebrow">Duvidas frequentes</span>
          <h2>O que toda clinica pergunta.</h2>
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
  const [submitted, setSubmitted] = useState(false);
  const [clinicName, setClinicName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('utopet_leads').insert([{ clinic_name: clinicName, email }]);
    } catch {
      // silent fail
    }
    setSubmitted(true);
  };

  return (
    <section className="pad" id="contato">
      <div className="wrap">
        <div className="final reveal">
          <div className="glow"></div>
          <div style={{ position: 'relative' }}>
            <h2>Pronta para colocar a Utopet na sua clinica?</h2>
            <p>Agende uma demonstracao sem compromisso. Mostramos o aparelho, o software e os numeros do modelo de negocio na pratica.</p>
            {!submitted ? (
              <form className="cta-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome da clinica" required value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
                <input type="email" placeholder="Seu melhor e-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-light">Agendar demonstracao</button>
              </form>
            ) : (
              <p style={{ marginTop: '22px', color: 'var(--lilas)', fontWeight: 600 }}>Recebemos seu contato — em breve a equipe Utopet fala com voce.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div style={{ maxWidth: '300px' }}>
            <span className="logo" style={{ color: '#fff' }}><LogoSvg />topet</span>
            <p style={{ marginTop: '16px', fontSize: '14.5px' }}>O bem-estar do seu pet, traduzido. Health tech para clinicas que cuidam de verdade.</p>
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
              <h4>Clinica</h4>
              <a href="#beneficios">Beneficios</a>
              <a href="#faq">Duvidas</a>
              <a href="#contato">Agendar demo</a>
            </div>
            <div className="foot-col">
              <h4>Contato</h4>
              <a href="#">utopet.co</a>
              <a href="#">@utopet</a>
              <a href="#">comercial@utopet.co</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Utopet. Todos os direitos reservados.</span>
          <span>Bem-estar nao substitui diagnostico veterinario.</span>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
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
    <>
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
    </>
  );
}
