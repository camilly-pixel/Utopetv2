import { useState } from 'react';
import { Check, X, Plus, Menu, Award } from 'lucide-react';
import { LogoSvg } from './Icons';
import '../styles/english.css';

export function NumbersEn({ items }: { items: Array<{ value: string; label: string }> }) {
  return <div className="numeros">{items.map((item) => <div className="numero card" key={`${item.value}-${item.label}`}><div className="n">{item.value}</div><div className="t">{item.label}</div></div>)}</div>;
}

const founderPhotos = [
  { src: '/enviagora-cd-equipe.jpg', caption: 'Enviagora’s fulfillment operation in Brazil', alt: 'Enviagora team gathered at its fulfillment center in Brazil' },
  { src: '/enviagora-day-plateia.jpg', caption: 'Enviagora Day', alt: 'Audience gathered in an auditorium during Enviagora Day' },
  { src: '/enviagora-day-painel.jpg', caption: 'Panel at Enviagora Day', alt: 'Speakers on stage during a panel at Enviagora Day' },
];

export function FoundersSectionEn({ onContact }: { onContact: () => void }) {
  return (
    <section className="pad" id="founders">
      <div className="wrap">
        <div className="sec-head center">
          <h2>Who’s behind Utopet</h2>
          <p>Utopet was built by the founders of Enviagora and Fleurity, companies already operating at scale in Brazil.</p>
        </div>
        <figure className="cred-time"><img src="/utopet-fundadores.jpg" alt="Utopet founding team" loading="lazy" /></figure>
        <div className="cred-selo"><Award size={18} />Competing for Nestlé’s acceleration program</div>
        <div className="cred-faixa">
          <h3>From the team behind Enviagora</h3>
          <div className="cred-fotos">
            {founderPhotos.map((photo) => (
              <figure key={photo.src} className="cred-foto">
                <div className="cred-foto-img"><img src={photo.src} alt={photo.alt} loading="lazy" /></div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="cred-cta"><button className="btn btn-roxo" onClick={onContact}>Book a demo</button></div>
      </div>
    </section>
  );
}

export function HeaderEn({ onContact }: { onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['How it works', 'how-it-works'], ['Today vs. Utopet', 'today-vs-utopet'], ['ROI', 'roi'], ['FAQ', 'faq']];
  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="topo">
      <div className="wrap">
        <nav className="nav-pilula" aria-label="Main navigation">
          <a href="/en/veterinarians" className="logo" aria-label="Utopet"><LogoSvg />topet</a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map(([label, id]) => <a href={`#${id}`} key={id} onClick={(event) => { event.preventDefault(); goTo(id); }}>{label}</a>)}
            <button className="btn btn-roxo" onClick={() => { setMenuOpen(false); onContact(); }}>Book a demo</button>
          </div>
          <button className="menu-btn" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

const tabs = [
  { label: 'Before', heading: 'Standardized pre-screening', description: 'Simple questions about routine, diet and recent signs, asked by your front desk before the pet goes in.', chips: ['Ready-made script', 'Run by the front desk', 'Pet history'] },
  { label: 'During', heading: 'Non-invasive reading', description: 'The pet stays awake and comfortable while the device reads by contact, and the software organizes the results.', chips: ['No blood draw', 'No sedation', '17 body systems', 'Visual priorities'] },
  { label: 'After', heading: 'A clear plan for the pet parent', description: 'A report with your clinic’s branding and follow-up screenings that bring clients back.', chips: ['Your branding', 'Plain language', 'Regular follow-ups'] },
];

export function HowItWorksEn() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <section className="pad" id="how-it-works">
      <div className="wrap">
        <div className="sec-head"><span className="eyebrow">How it works</span><h2>From check-in to follow-up, screening organizes the whole visit</h2></div>
        <div className="abas-btns" role="tablist">{tabs.map((item, index) => <button className={`aba-btn ${index === active ? 'ativa' : ''}`} role="tab" aria-selected={index === active} key={item.label} onClick={() => setActive(index)}>{item.label}</button>)}</div>
        <div className="aba-painel card" role="tabpanel">
          <div className="aba-grid">
            <div><div className="aba-num">{active + 1}</div><h3>{tab.heading}</h3><p>{tab.description}</p><div className="chips">{tab.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div></div>
            <div className="aba-visual"><div className="linha"><span className="pt" style={{ background: 'var(--roxo)' }} />Organized results for your next decision</div><div className="linha"><span className="pt" style={{ background: 'var(--verde)' }} />Clear information at the right moment</div><div className="linha"><span className="pt" style={{ background: 'var(--laranja)' }} />Follow-ups without the hassle</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeviceSectionEn() {
  return (
    <section className="pad">
      <div className="wrap"><div className="aparelho-grid"><div><div className="foto-aparelho"><img className="principal" src="/utopet-aparelho-3d.jpg" alt="Purple Utopet screening device on a light background" /><div className="foto-redonda"><img src="/images/gato.jpg" alt="Cat receiving care" /></div></div><p className="legenda-foto">Illustrative image of the device.</p></div><div className="texto-lado"><span className="eyebrow">The device</span><h2>Contact-based reading, with the pet awake</h2><p>No blood draw, fasting or sedation. Your team positions the pet, monitors the reading, and the software delivers the report.</p><ul className="lista-check">{['Fits into a regular appointment', 'Staff trained in one session', 'Dogs and cats of any size'].map((item) => <li key={item}><span className="ic"><Check size={17} /></span>{item}</li>)}</ul></div></div></div>
    </section>
  );
}

export function GallerySectionEn() {
  return <section className="pad"><div className="wrap"><div className="sec-head center"><span className="eyebrow">Dogs and cats</span><h2>From puppies and kittens to seniors</h2><p>The software adjusts the reading to species, size and age.</p></div><div className="galeria"><div className="foto"><img src="/images/cao-grande.jpg" alt="Large-breed dog" /></div><div className="foto"><img src="/images/cao-pequeno.jpg" alt="Small-breed dog" /></div><div className="foto"><img src="/images/gato.jpg" alt="Cat" /></div></div></div></section>;
}

function ReportExampleEn() {
  const [open, setOpen] = useState(false);
  const details = ['Hepatobiliary: within the expected range in today’s reading. No areas of attention.', 'Zinc: area of attention. The veterinarian decides whether diagnostics are worth running.', 'Immune: within the expected range in today’s reading. No areas of attention.'];
  return <div className="relatorio-exemplo"><div className="relatorio-topo"><div className="rt"><b>Wellness Score</b>Luna’s report</div><div className="relatorio-score">85</div></div><div className="relatorio-linha"><span className="dot" style={{ background: 'var(--verde)' }} /><span className="rl">Hepatobiliary</span><span className="rv">Balanced</span></div><div className="relatorio-linha"><span className="dot" style={{ background: 'var(--laranja)' }} /><span className="rl">Minerals · Zinc</span><span className="rv">Attention</span></div><div className="relatorio-linha"><span className="dot" style={{ background: 'var(--verde)' }} /><span className="rl">Immune</span><span className="rv">Healthy</span></div><button className="relatorio-toggle" onClick={() => setOpen((value) => !value)}>{open ? 'Hide details' : 'See report details'}<Plus size={18} /></button>{open && <div className="relatorio-detalhe">{details.map((detail) => <p key={detail}>{detail}</p>)}</div>}<div className="relatorio-legenda">Illustrative sample report.</div></div>;
}

export function ReportSectionEn() {
  return <section className="pad" id="report"><div className="wrap"><div className="dois-cartoes"><div className="cartao-grande lavanda card"><span className="eyebrow">The report</span><h3>An overview you interpret and owners understand</h3><p>The software organizes all 139 markers into a report with visual priorities, branded with your clinic’s logo.</p><ul><li><Check size={18} />Overall wellness score</li><li><Check size={18} />Highlighted areas of attention</li><li><Check size={18} />History at every follow-up</li></ul><ReportExampleEn /></div><div className="cartao-grande creme card"><span className="eyebrow">What it doesn’t do</span><h3>It doesn’t diagnose. The decision is always yours.</h3><p>Utopet does not replace bloodwork, imaging or your clinical judgment. It points to where a closer look is worth it.</p><ul><li><Check size={18} />Complements the clinical exam</li><li><Check size={18} />You interpret the results</li><li><Check size={18} />The report states it is a wellness screening</li></ul></div></div></div></section>;
}

const usd = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function NumberField({ id, label, value, onChange, max }: { id: string; label: string; value: number; onChange: (value: number) => void; max: number }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="sim-input" type="number" inputMode="numeric" min={0} max={max} value={Number.isNaN(value) ? '' : value} onChange={(event) => onChange(Math.min(max, Math.max(0, event.target.valueAsNumber)))} />
    </div>
  );
}

function RoiSimulator() {
  const [pets, setPets] = useState(10);
  const [fee, setFee] = useState(40);
  const [days, setDays] = useState(20);
  const monthly = (pets || 0) * (fee || 0) * (days || 0);
  return <div className="simulador"><h3>Estimate your clinic’s potential</h3><NumberField id="pets" label="Pets screened per day" value={pets} onChange={setPets} max={200} /><NumberField id="fee" label="Screening fee (USD)" value={fee} onChange={setFee} max={1000} /><NumberField id="days" label="Days per month" value={days} onChange={setDays} max={31} /><div className="sim-resultados"><div className="sim-valor"><div className="v">{usd(monthly)}</div><div className="l">Extra revenue per month</div></div><div className="sim-valor"><div className="v">{usd(monthly * 12)}</div><div className="l">Extra revenue in 12 months</div></div></div><p className="sim-nota">Example only. Adjust the numbers to your clinic. Actual results depend on client adoption.</p></div>;
}

export function RoiBlockEn({ onContact }: { onContact: () => void }) {
  return <section className="pad" id="roi"><div className="wrap"><div className="bloco-escuro"><div className="glow" /><div className="negocio-grid"><div><span className="eyebrow sobre-escuro">The business case</span><h2>A new service for your clinic, without needing more clients</h2><ul className="negocio-itens">{['Screening billed alongside the visit', 'Low cost per screening', 'Follow-up screenings bring owners back', 'A report branded with your clinic’s logo'].map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul><button className="btn btn-branco" style={{ marginTop: '28px' }} onClick={onContact}>Book a demo</button></div><RoiSimulator /></div></div></div></section>;
}

const faq: Array<[string, string]> = [
  ['Does it replace lab work?', 'No. It is a wellness screening that complements the clinical exam and helps you decide which diagnostics to run.'],
  ['Does the pet need any preparation?', 'No fasting, blood draw or sedation. The pet stays awake and comfortable during the reading.'],
  ['Who interprets the results?', 'You do. The software organizes the information; the clinical conclusion is always the veterinarian’s.'],
  ['What if an owner asks if it’s a diagnosis?', 'The report itself explains that it is a wellness screening, not a diagnosis.'],
];

export function FaqSectionEn() {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="pad" id="faq"><div className="wrap"><div className="sec-head center"><span className="eyebrow">FAQ</span><h2>What every clinic asks</h2></div><div className="faq">{faq.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}><button className="faq-q" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>{question}<span className="chev"><Plus size={21} /></span></button><div className="faq-a" style={{ maxHeight: open === index ? '200px' : 0 }}><p>{answer}</p></div></div>)}</div></div></section>;
}

export function FinalCtaEn({ onContact }: { onContact: () => void }) {
  return <section className="pad"><div className="wrap"><div className="fecho"><div className="glow" /><h2>See it work on one of your patients.</h2><p>Book a demo. We’ll show you the device, the report and the numbers for your clinic.</p><button className="btn btn-branco" onClick={onContact}>Book a demo</button></div></div></section>;
}

export function FooterEn() {
  return <footer className="rodape"><div className="wrap"><div className="rodape-card"><div className="rodape-topo"><a href="/en/veterinarians" className="logo"><LogoSvg />topet</a><nav className="rodape-nav"><a href="/en/veterinarians">For clinics</a><a href="mailto:contato@utopet.com.br">Contact</a></nav></div><p className="aviso-rodape">The Utopet wellness screening is not a diagnosis and does not replace the exam, diagnostics or the veterinarian’s clinical decision.</p><p className="rodape-copy">© 2026 Utopet. All rights reserved.</p></div></div></footer>;
}
