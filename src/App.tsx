import { useState, useEffect } from 'react';
import {
  Check, X, MapPin, TrendingUp, Star, Heart, Clock,
  ChevronRight, AlertCircle, Menu
} from 'lucide-react';
import { supabase } from './lib/supabase';

/* ─── Lead Form ───────────────────────────────────────────────── */
interface LeadForm {
  name: string;
  clinic: string;
  contact: string;
}

function useLeadForm(source: string) {
  const [form, setForm] = useState<LeadForm>({ name: '', clinic: '', contact: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (field: keyof LeadForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.clinic || !form.contact) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('utopet_leads').insert({ ...form, source });
      setStatus(error ? 'error' : 'success');
    } catch {
      setStatus('error');
    }
  };

  return { form, set, submit, status };
}

/* ─── Navbar ──────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Por que muda o jogo', href: '#por-que' },
    { label: 'O aparelho', href: '#aparelho' },
    { label: 'O que lê', href: '#le' },
    { label: 'Para a clínica', href: '#clinica' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-1.5 font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">
          <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-violet-600 flex-shrink-0" />
          utopet
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
        >
          Agendar demonstração
        </a>

        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-5 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-700 py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="inline-flex justify-center bg-violet-600 text-white text-sm font-medium px-5 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Agendar demonstração
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Health Card Mock ────────────────────────────────────────── */
function HealthCard() {
  const metrics = [
    { label: 'Imunidade', val: 62 },
    { label: 'Minerais', val: 48 },
    { label: 'Vitaminas', val: 55 },
    { label: 'Colágeno', val: 35 },
    { label: 'Pele', val: 72 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 text-lg">
            🐱
          </div>
          <div>
            <p className="font-semibold text-gray-900">Aya</p>
            <p className="text-xs text-gray-400">Gata · 2 anos</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-violet-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <Clock size={11} />
          0:58
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map(m => (
          <div key={m.label} className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-20 flex-shrink-0">{m.label}</span>
            <div className="flex-1 h-3 rounded-full overflow-hidden relative bg-gradient-to-r from-red-400 via-amber-300 to-green-400">
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-gray-900 rounded-full"
                style={{ left: `${m.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-violet-600 text-xs font-medium">
        <Check size={14} />
        Relatório de 17 áreas pronto para o tutor
      </div>
    </div>
  );
}

/* ─── Device Mock ─────────────────────────────────────────────── */
function DeviceMock() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-violet-50 rounded-3xl p-5 sm:p-6 pb-0 overflow-hidden">
        <div className="absolute left-4 sm:left-6 bottom-0 flex items-end">
          <div className="text-6xl sm:text-7xl mb-0 select-none">🐕</div>
        </div>

        <div className="ml-20 sm:ml-28 bg-white rounded-2xl shadow-md p-3 sm:p-4 mb-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-violet-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">U</span>
              </div>
              <span className="text-xs font-medium text-gray-700">utopet</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[10px] bg-violet-100 text-violet-700 px-1.5 sm:px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <Clock size={8} /> ~1 min
              </span>
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <Check size={8} /> Pronto
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="bg-gray-50 rounded-xl p-2 sm:p-3">
              <p className="text-[9px] text-violet-500 font-medium mb-2">Health Score</p>
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full border-4 border-violet-400 bg-white">
                <div className="text-center">
                  <p className="text-sm sm:text-base font-bold text-gray-900 leading-none">85</p>
                  <p className="text-[8px] text-gray-400">Equilíbrio</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-2 sm:p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] text-gray-500 font-medium">Sistemas</p>
                <span className="text-[9px] text-violet-500 font-medium">17 áreas</span>
              </div>
              <div className="flex items-end gap-0.5 h-10">
                {[3, 5, 4, 6, 5, 7, 4, 6, 5, 4].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${i % 2 === 0 ? 'bg-violet-400' : 'bg-violet-200'}`}
                    style={{ height: `${h * 6}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-3 bg-gray-50 rounded-xl p-2 sm:p-3">
            <p className="text-[9px] text-gray-500 font-medium mb-2">Tendência de bem-estar</p>
            <svg viewBox="0 0 120 30" className="w-full h-8">
              <polyline
                points="0,25 20,20 40,22 60,15 80,18 100,10 120,12"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="25" r="3" fill="#7c3aed" />
              <circle cx="120" cy="12" r="3" fill="#7c3aed" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Form Component ──────────────────────────────────────────── */
function LeadFormBlock({
  source,
  buttonLabel = 'Quero conhecer o aparelho',
  inputStyle = 'bg-white border border-gray-200',
}: {
  source: string;
  buttonLabel?: string;
  inputStyle?: string;
}) {
  const { form, set, submit, status } = useLeadForm(source);

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="text-green-600" size={24} />
        </div>
        <p className="font-semibold text-gray-900 text-lg">Recebemos seu contato!</p>
        <p className="text-gray-500 text-sm">Nosso time entrará em contato em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Seu nome"
        value={form.name}
        onChange={set('name')}
        className={`w-full px-4 py-3.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 ${inputStyle}`}
        required
      />
      <input
        type="text"
        placeholder="Clínica ou estabelecimento"
        value={form.clinic}
        onChange={set('clinic')}
        className={`w-full px-4 py-3.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 ${inputStyle}`}
        required
      />
      <input
        type="text"
        placeholder="WhatsApp ou e-mail"
        value={form.contact}
        onChange={set('contact')}
        className={`w-full px-4 py-3.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 ${inputStyle}`}
        required
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
      >
        {status === 'loading' ? 'Enviando...' : (
          <>{buttonLabel} <ChevronRight size={16} /></>
        )}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-xs text-center">Algo deu errado. Tente novamente.</p>
      )}
    </form>
  );
}

/* ─── Main App ────────────────────────────────────────────────── */
export default function App() {
  const areas = [
    'Função gastrointestinal', 'Fígado e vias biliares', 'Função renal', 'Função pulmonar',
    'Circulação', 'Sistema ósseo', 'Imunidade', 'Tireoide', 'Minerais', 'Vitaminas',
    'Aminoácidos', 'Coenzimas', 'Metais pesados', 'Colágeno', 'Alérgenos', 'Pele', 'Olhos',
  ];

  return (
    <div className="bg-[#F0EDE6] min-h-screen font-sans text-gray-900">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/60 via-[#F0EDE6] to-[#F0EDE6]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 md:pt-16 pb-16 sm:pb-20 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-200/80 text-gray-700 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-violet-600 flex-shrink-0" />
              Para clínicas e veterinários · 1 parceiro por cidade
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-5 sm:mb-6 text-gray-900">
              Uma leitura ampla do pet em{' '}
              <span className="text-violet-600">~1 minuto.</span>{' '}
              Sem agulha. Sem espera.
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
              O aparelho Utopet faz uma <strong className="text-gray-800">triagem não invasiva</strong> de
              mais de 15 sistemas do organismo do animal e entrega um relatório na hora — abrindo a conversa
              de prevenção com o tutor e uma{' '}
              <strong className="text-gray-800">nova linha de receita</strong> para a sua clínica.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <LeadFormBlock source="hero" />
            </div>
          </div>

          <div className="flex justify-center md:justify-end mt-2 md:mt-0">
            <HealthCard />
          </div>
        </div>
      </section>

      {/* ── Por que muda o jogo ─────────────────────────────────── */}
      <section id="por-que" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-violet-600 text-xs font-semibold tracking-widest uppercase mb-4 text-center">
            Por que muda o jogo
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight mb-4">
            O exame que cabe na rotina da clínica.
          </h2>
          <p className="text-gray-500 text-center text-base sm:text-lg max-w-xl mx-auto mb-10 sm:mb-14">
            Não substitui o laboratório. Antecipa a conversa — e tira o atrito que faz o tutor adiar a prevenção.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-white/60 border border-gray-200 rounded-3xl p-6 sm:p-8">
              <h3 className="font-semibold text-gray-500 text-lg mb-6">Do jeito tradicional</h3>
              <ul className="space-y-4">
                {[
                  'Coleta de sangue invasiva, com o animal contido e estressado',
                  'Amostra enviada ao laboratório externo',
                  'Dias de espera pelo resultado',
                  'Custo por painel, um sistema de cada vez',
                  'Tutor precisa voltar outro dia',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-400">
                    <X size={16} className="flex-shrink-0 mt-0.5 text-gray-300" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-violet-600 rounded-3xl p-6 sm:p-8">
              <h3 className="font-semibold text-violet-200 text-lg mb-6">Com o Utopet</h3>
              <ul className="space-y-4">
                {[
                  'Leitura não invasiva, sem agulha e sem estresse',
                  'Feita na própria clínica, em cerca de 1 minuto',
                  'Resultado na hora, sem logística de amostra',
                  'Panorama de mais de 15 sistemas de uma vez',
                  'Relatório visual pronto para mostrar ao tutor',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-white border-b border-violet-500 pb-4 last:border-0 last:pb-0">
                    <Check size={16} className="flex-shrink-0 mt-0.5 text-white" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cost Comparison ─────────────────────────────────────── */}
      <section className="py-4 sm:py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-white/60 border border-gray-200 rounded-3xl p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Via tradicional</p>
              <p className="text-3xl sm:text-4xl font-black text-gray-700 mb-5">+ R$ 10 mil</p>
              <ul className="space-y-3">
                {[
                  'Coleta de sangue, com contenção',
                  'Semanas, em vários laboratórios',
                  'Boa parte nem existe como exame de rotina',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-gray-400 text-sm">
                    <X size={14} className="flex-shrink-0 text-gray-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-violet-600 rounded-3xl p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-widest text-violet-300 uppercase mb-3">Triagem Utopet</p>
              <p className="text-3xl sm:text-4xl font-black text-white mb-5">~1 minuto</p>
              <ul className="space-y-3">
                {[
                  'Não invasiva, sem agulha',
                  'Resultado na hora, na própria clínica',
                  'Panorama amplo numa leitura só',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-white text-sm">
                    <Check size={14} className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6 sm:mt-8 max-w-2xl mx-auto leading-relaxed">
            Um levantamento amplo desses, pela via tradicional, passa de dez mil reais, exige coleta de sangue e
            leva semanas em vários laboratórios — e boa parte nem existe como exame de rotina. A triagem Utopet
            é não invasiva e sai em ~1 minuto.
          </p>
        </div>
      </section>

      {/* ── Por que importa ─────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-violet-600 text-xs font-semibold tracking-widest uppercase mb-4 text-center">
            Por que importa
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight mb-4">
            O que a clínica não vê a olho nu.
          </h2>
          <p className="text-gray-500 text-center text-base sm:text-lg max-w-xl mx-auto mb-10 sm:mb-14">
            A doença começa silenciosa. Quando o sinal aparece, muitas vezes já avançou. Por isso rastrear
            cedo faz diferença.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                stat: '75%',
                desc: 'da função renal já se perdeu quando o gato mostra os primeiros sinais.',
                source: 'FONTE: AAHA',
              },
              {
                stat: 'Aos 3 anos',
                desc: 'a maioria dos cães e gatos já apresenta sinais de doença dental.',
                source: 'FONTE: AVMA',
              },
              {
                stat: 'Por instinto',
                desc: 'o pet esconde a doença até ela já estar avançada.',
                source: 'COMPORTAMENTO FELINO DOCUMENTADO',
              },
            ].map(card => (
              <div key={card.stat} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <p className="text-3xl sm:text-4xl font-black text-violet-600 mb-3">{card.stat}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.desc}</p>
                <p className="text-xs font-semibold tracking-widest text-gray-300 uppercase">{card.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── O aparelho ──────────────────────────────────────────── */}
      <section id="aparelho" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <DeviceMock />

          <div>
            <p className="text-violet-600 text-xs font-semibold tracking-widest uppercase mb-4">
              O aparelho
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 sm:mb-6 leading-tight">
              Uma cinta no pet. O resto, na tela.
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              A leitura é simples: uma cinta leve ao redor do animal, conectada ao computador. Em poucos
              minutos, os dados viram um relatório visual ali mesmo, na clínica.
            </p>

            <ul className="space-y-5">
              {[
                {
                  title: 'Não invasivo.',
                  desc: 'Sem agulha, sem coleta e sem contenção forçada — a cinta só envolve o pet.',
                },
                {
                  title: 'Plug and play.',
                  desc: 'Conecta no computador da própria clínica. Sem instalação complexa, sem envio de amostra.',
                },
                {
                  title: 'Relatório na hora.',
                  desc: 'O panorama aparece na tela em minutos, pronto pra mostrar ao tutor.',
                },
              ].map(item => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-violet-600" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong className="text-gray-900">{item.title}</strong> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── O que lê ────────────────────────────────────────────── */}
      <section id="le" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-violet-600 text-xs font-semibold tracking-widest uppercase mb-4">
            O que o aparelho mapeia
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            Um panorama amplo em uma única leitura.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-10 sm:mb-12">
            Cada área vem com faixa de referência e nível de atenção — um ponto de partida para orientar a
            próxima conversa.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {areas.map(area => (
              <span
                key={area}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-violet-600 flex-shrink-0" />
                {area}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
            É uma triagem de bem-estar para destacar o que merece atenção — não um laudo. O olhar do
            médico-veterinário continua no centro de qualquer decisão clínica.
          </p>
        </div>
      </section>

      {/* ── Para a clínica ──────────────────────────────────────── */}
      <section id="clinica" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-violet-600 text-xs font-semibold tracking-widest uppercase mb-4">
            Para a clínica
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-10 sm:mb-14 max-w-md">
            Mais do que um exame. Um serviço novo.
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: <TrendingUp size={20} className="text-violet-600" />,
                title: 'Nova receita',
                desc: 'Ofereça um check-up rápido de bem-estar como serviço pago, com alta margem e sem custo de amostra.',
              },
              {
                icon: <Star size={20} className="text-violet-600" />,
                title: 'Diferenciação',
                desc: 'Poucas clínicas oferecem uma triagem não invasiva com resultado na hora. Vire referência na sua região.',
              },
              {
                icon: <Heart size={20} className="text-violet-600" />,
                title: 'Fideliza o tutor',
                desc: 'Um relatório visual aproxima o tutor, abre a conversa de prevenção e traz ele de volta com mais frequência.',
              },
              {
                icon: <Clock size={20} className="text-violet-600" />,
                title: 'Sem logística',
                desc: 'Sem coleta, sem envio de amostra, sem espera. O aparelho fica na clínica e roda quantas leituras você precisar.',
              },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ───────────────────────────────────────── */}
      <section className="bg-violet-600 py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
            Como funciona
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-10 sm:mb-16">
            Três passos, um minuto.
          </h2>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                n: '1',
                title: 'Posicione o sensor',
                desc: 'O contato é simples e não invasivo — sem coleta, sem contenção forçada, sem desconforto para o animal.',
              },
              {
                n: '2',
                title: 'Leitura em ~1 minuto',
                desc: 'O aparelho percorre mais de 15 sistemas e organiza tudo em faixas de referência e níveis de atenção.',
              },
              {
                n: '3',
                title: 'Relatório na hora',
                desc: 'Você recebe um relatório visual pronto para discutir com o tutor ali mesmo, na consulta.',
              },
            ].map(step => (
              <div key={step.n}>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold mb-4">
                  {step.n}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-violet-200 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exclusividade ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-violet-100 to-violet-50 rounded-3xl p-6 sm:p-10 md:p-12 text-center">
            <div className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin size={24} className="text-white" />
            </div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
              Exclusividade por cidade
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-5">
              Uma só clínica por cidade.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-7 sm:mb-8 max-w-lg mx-auto">
              A Utopet fecha com <strong>um único parceiro por cidade</strong>. Quem chega primeiro garante
              a região inteira — e larga na frente da concorrência local. Seja o primeiro da sua.
            </p>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-colors text-sm"
            >
              Garantir minha cidade <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA Form ────────────────────────────────────────────── */}
      <section id="contato" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
                Leve o Utopet para a sua clínica.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Deixe seu contato e nosso time comercial apresenta o aparelho, os planos e uma demonstração
                na prática. As vagas são limitadas a uma clínica por cidade.
              </p>
            </div>
            <div>
              <LeadFormBlock
                source="cta"
                buttonLabel="Agendar demonstração"
                inputStyle="bg-gray-50 border border-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ──────────────────────────────────────────── */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/50 border border-gray-200 rounded-2xl px-4 sm:px-6 py-4 flex items-start gap-3">
            <AlertCircle size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-500 text-xs leading-relaxed">
              O Utopet é uma ferramenta de triagem e bem-estar. Os resultados são um ponto de partida para
              a avaliação do médico-veterinário e não constituem diagnóstico clínico nem substituem exames
              laboratoriais.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200/60 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-bold text-xl text-gray-900">
            <span className="inline-block w-5 h-5 rounded-full border-2 border-violet-600" />
            utopet
          </div>
          <p className="text-gray-400 text-xs text-center sm:text-right">© 2026 Utopet. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
