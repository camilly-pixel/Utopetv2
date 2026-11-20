import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { HeaderEn, VslVideoEn, NumbersEn, HowItWorksEn, DeviceSectionEn, GallerySectionEn, ReportSectionEn, RoiBlockEn, FaqSectionEn, FinalCtaEn, FoundersSectionEn, FooterEn } from '../components/UtopetEnglish';
import { LeadModalEn } from '../components/LeadModalEn';

const today = ['No structured screening before the exam', 'You meet the pet when it walks into the room', 'History-taking depends on what the owner remembers', 'Diagnostics ordered without a starting point, and owners push back on cost', 'Owners leave without a clear plan and take longer to come back'];
const withUtopet = ['Standardized pre-screening at the front desk', 'A 17-system overview before the physical exam', 'History-taking focused on areas that need attention', 'Diagnostics with a rationale owners understand', 'A branded report and follow-ups that bring owners back', 'A new billable service in every visit'];

export default function VeterinariansPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openContact = () => setModalOpen(true);

  useEffect(() => {
    const html = document.documentElement;
    const previous = { lang: html.lang, title: document.title };
    html.lang = 'en';
    document.title = 'Utopet | Wellness screening for dogs and cats';
    return () => { html.lang = previous.lang; document.title = previous.title; };
  }, []);

  return (
    <div>
      <HeaderEn onContact={openContact} />
      <main>
        <section className="hero hero-centro hero-en"><div className="wrap"><div className="hero-coluna anim-entrada"><span className="eyebrow">For veterinary clinics and hospitals</span><h1>Your patient can’t tell you what’s wrong. Utopet helps you start the conversation.</h1><p className="lead">Utopet reads 139 wellness markers across 17 body systems in minutes, with no needles. You get a clear overview to guide your history-taking and decide which diagnostics are worth running.</p><div className="hero-cta"><button className="btn btn-roxo" onClick={openContact}>Book a demo</button><a href="#roi" className="btn btn-borda">Estimate your ROI</a></div><p className="hero-note"><Check size={16} />The veterinarian always makes the call. Staff training included.</p></div><VslVideoEn /></div></section>
        <section className="pad" style={{ paddingTop: '32px' }}><div className="wrap"><NumbersEn items={[{ value: '139', label: 'Wellness markers' }, { value: '17', label: 'Body systems' }, { value: '0', label: 'Needles, blood draws or sedation' }]} /></div></section>
        <HowItWorksEn />
        <section className="pad" id="today-vs-utopet"><div className="wrap"><div className="sec-head"><span className="eyebrow">Today vs. Utopet</span><h2>Today, many exams start in the dark. With Utopet, you walk in knowing where to look.</h2></div><div className="comp-grid"><div className="comp branca card"><h3>Today</h3><ul>{today.map((item) => <li key={item}><X size={19} />{item}</li>)}</ul></div><div className="comp roxo card"><h3>With Utopet</h3><ul>{withUtopet.map((item) => <li key={item}><Check size={19} />{item}</li>)}</ul></div></div></div></section>
        <DeviceSectionEn />
        <GallerySectionEn />
        <ReportSectionEn />
        <RoiBlockEn onContact={openContact} />
        <section className="pad" id="founding-clinics"><div className="wrap"><div className="sec-head center"><span className="eyebrow">Limited availability</span><h2>Founding clinic program</h2><p>We are opening Utopet to a limited group of US clinics. Book a demo to see it working on one of your patients.</p></div><div className="card preco-card"><span className="preco-en-label">Launch price</span><div className="preco-en-antigo">$4,990</div><div className="preco-valor">$2,990</div><p className="preco-en-inclui">Device, full software and staff training included.</p><ul>{['Live demo with your own patient', 'Founding clinic launch price', 'Staff training included'].map((item) => <li key={item}><span className="ic"><Check size={16} /></span>{item}</li>)}</ul><button className="btn btn-roxo" onClick={openContact}>Book a demo</button></div></div></section>
        <FaqSectionEn />
        <FinalCtaEn onContact={openContact} />
        <FoundersSectionEn onContact={openContact} />
      </main>
      <FooterEn />
      <LeadModalEn isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
