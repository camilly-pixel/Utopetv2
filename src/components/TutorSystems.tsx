import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, RotateCcw } from 'lucide-react';

type Sistema = { nome: string; frase: string; foto: string; indicadores: string[] };

const sistemas: Sistema[] = [
  { nome: 'Alérgenos', frase: 'Poeira, pólen, alimentos e mais', foto: '/pet-gato-tuxedo.jpg', indicadores: ['Medicamentos', 'Álcool', 'Pólen', 'Antibióticos', 'Fibra química', 'Tintas e vernizes', 'Poeira', 'Fumaça', 'Corante de tinta de cabelo', 'Acessórios de metal', 'Frutos do mar', 'Proteína do leite'] },
  { nome: 'Pele', frase: 'Pele e pelagem', foto: '/pet-dachshund.jpg', indicadores: ['Radicais livres', 'Colágeno da pele', 'Imunidade da pele', 'Hidratação', 'Elasticidade'] },
  { nome: 'Gastrointestinal', frase: 'Como ele digere a comida', foto: '/pet-filhote.jpg', indicadores: ['Secreção de pepsina', 'Peristaltismo gástrico', 'Absorção gástrica', 'Peristaltismo do intestino delgado', 'Absorção do intestino delgado', 'Peristaltismo do intestino grosso', 'Absorção do cólon', 'Bactérias intestinais', 'Pressão intraluminal'] },
  { nome: 'Imunológico', frase: 'As defesas do corpo', foto: '/pet-gato-calico.jpg', indicadores: ['Linfonodo', 'Amígdalas', 'Medula óssea', 'Baço', 'Timo', 'Imunoglobulina', 'Imunidade respiratória', 'Imunidade gastrointestinal', 'Imunidade da mucosa'] },
  { nome: 'Vitaminas', frase: 'Vitaminas do dia a dia', foto: '/pet-golden.jpg', indicadores: ['Vitamina A', 'Vitamina B1', 'Vitamina B2', 'Vitamina B3', 'Vitamina B6', 'Vitamina B12', 'Vitamina C', 'Vitamina D3', 'Vitamina E', 'Vitamina K'] },
  { nome: 'Minerais', frase: 'Minerais', foto: '/pet-beagle.jpg', indicadores: ['Cálcio', 'Ferro', 'Zinco', 'Selênio', 'Fósforo', 'Potássio', 'Magnésio', 'Cobre', 'Cobalto', 'Manganês', 'Iodo', 'Níquel', 'Flúor', 'Molibdênio', 'Vanádio', 'Estanho', 'Silício', 'Estrôncio', 'Boro'] },
  { nome: 'Circulação sanguínea', frase: 'Coração e circulação', foto: '/pet-jack-dormindo.jpg', indicadores: ['Viscosidade do sangue', 'Cristais de colesterol', 'Gordura do sangue', 'Resistência vascular', 'Elasticidade vascular', 'HDL-C', 'LDL-C', 'Triglicerídeos'] },
  { nome: 'Esquelético', frase: 'Ossos e articulações', foto: '/pet-labrador-idoso.jpg', indicadores: ['Calcificação cervical', 'Calcificação lombar', 'Densidade óssea', 'Osteoclastos', 'Perda de cálcio', 'Hiperplasia óssea', 'Osteoporose'] },
  { nome: 'Hepatobiliar', frase: 'Fígado e energia', foto: '/pet-gato-laranja.jpg', indicadores: ['Metabolismo de proteínas', 'Produção de energia', 'Desintoxicação', 'Secreção de bile', 'Gordura do fígado', 'Bilirrubina total', 'Bilirrubina direta'] },
  { nome: 'Renal', frase: 'Rins', foto: '/pet-gato-cinza.jpg', indicadores: ['Urobilinogênio', 'Ácido úrico', 'Nitrogênio ureico', 'Proteína urinária'] },
  { nome: 'Pulmonar', frase: 'Respiração', foto: '/pet-golden.jpg', indicadores: ['Atividade pulmonar', 'Capacidade pulmonar total', 'Resistência das vias aéreas', 'Oxigênio arterial'] },
  { nome: 'Tireoide', frase: 'Tireoide e metabolismo', foto: '/pet-gato-tuxedo.jpg', indicadores: ['T4 livre', 'Tiroglobulina', 'Anticorpos antitireoglobulina', 'T3'] },
  { nome: 'Aminoácidos', frase: 'Aminoácidos', foto: '/pet-filhote.jpg', indicadores: ['Lisina', 'Triptofano', 'Fenilalanina', 'Metionina', 'Treonina', 'Isoleucina', 'Leucina', 'Valina', 'Histidina', 'Arginina'] },
  { nome: 'Coenzimas', frase: 'Coenzimas', foto: '/pet-gato-calico.jpg', indicadores: ['Nicotinamida', 'Biotina', 'Ácido pantotênico', 'Ácido fólico', 'Coenzima Q10', 'Glutationa'] },
  { nome: 'Colágeno', frase: 'Colágeno', foto: '/pet-labrador-idoso.jpg', indicadores: ['Olhos', 'Dentes', 'Pelo e pele', 'Coração e cérebro', 'Estômago e intestino', 'Sistema imunológico', 'Articulações', 'Tecido muscular', 'Metabolismo da gordura', 'Desintoxicação', 'Sistema nervoso', 'Esqueleto'] },
  { nome: 'Metais pesados', frase: 'Metais do ambiente', foto: '/pet-cao-mesa.jpg', indicadores: ['Chumbo', 'Mercúrio', 'Cádmio', 'Cromo', 'Arsênico', 'Antimônio', 'Tálio', 'Alumínio'] },
  { nome: 'Olhos', frase: 'Olhos', foto: '/pet-dachshund.jpg', indicadores: ['Colágeno', 'Obstrução linfática', 'Firmeza', 'Edema', 'Atividade celular'] },
];

function CartaoSistema({ sistema, virado, onToggle }: { sistema: Sistema; virado: boolean; onToggle: () => void }) {
  const total = sistema.indicadores.length;
  return (
    <li className={`tt-sis ${virado ? 'virado' : ''}`}>
      <div className="tt-sis-giro">
        <button type="button" className="tt-sis-frente" onClick={onToggle} aria-expanded={virado} aria-label={`${sistema.nome}: ver os ${total} indicadores`}>
          <img src={sistema.foto} alt="" loading="lazy" />
          <span className="tt-sis-pilula">{sistema.nome} · {total}</span>
          <span className="tt-sis-mais" aria-hidden="true"><Plus size={20} /></span>
          <span className="tt-sis-frase">{sistema.frase}</span>
        </button>
        <div className="tt-sis-verso">
          <div className="tt-sis-verso-topo"><b>{sistema.nome}</b><span>{total} indicadores</span></div>
          <ul className="tt-sis-chips">{sistema.indicadores.map((item) => <li key={item}>{item}</li>)}</ul>
          <button type="button" className="tt-sis-voltar" onClick={onToggle}><RotateCcw size={15} />voltar</button>
        </div>
      </div>
    </li>
  );
}

export function TutorSystems() {
  const trilhoRef = useRef<HTMLUListElement>(null);
  const [virado, setVirado] = useState<number | null>(null);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const atualizar = () => {
      const max = trilho.scrollWidth - trilho.clientWidth;
      setProgresso(max > 0 ? trilho.scrollLeft / max : 0);
    };
    atualizar();
    trilho.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);
    return () => {
      trilho.removeEventListener('scroll', atualizar);
      window.removeEventListener('resize', atualizar);
    };
  }, []);

  const mover = (direcao: 1 | -1) => {
    const trilho = trilhoRef.current;
    const cartao = trilho?.querySelector<HTMLElement>('.tt-sis');
    if (!trilho || !cartao) return;
    trilho.scrollBy({ left: direcao * (cartao.offsetWidth + 18), behavior: 'smooth' });
  };

  const indicadores = sistemas.reduce((soma, item) => soma + item.indicadores.length, 0);

  return (
    <section className="pad" id="o-que-lemos">
      <div className="wrap">
        <div className="tt-sis-cabeca">
          <div className="sec-head">
            <span className="eyebrow">Arrasta pro lado</span>
            <h2>{sistemas.length} sistemas, {indicadores} indicadores de bem-estar</h2>
            <p>Veja o que a triagem acompanha no corpo do seu pet.</p>
          </div>
          <div className="tt-sis-setas">
            <button type="button" onClick={() => mover(-1)} aria-label="Ver sistemas anteriores" disabled={progresso <= 0.001}><ArrowLeft size={20} /></button>
            <button type="button" onClick={() => mover(1)} aria-label="Ver próximos sistemas" disabled={progresso >= 0.999}><ArrowRight size={20} /></button>
          </div>
        </div>
      </div>
      <ul className="tt-sis-trilho" ref={trilhoRef}>
        {sistemas.map((sistema, index) => (
          <CartaoSistema key={sistema.nome} sistema={sistema} virado={virado === index} onToggle={() => setVirado(virado === index ? null : index)} />
        ))}
      </ul>
      <div className="wrap">
        <div className="tt-sis-progresso" aria-hidden="true"><span style={{ width: `${Math.max(8, progresso * 100)}%` }} /></div>
        <p className="tt-sis-nota">Indicadores de bem-estar para orientar a conversa com o veterinário. Não substituem consulta nem exames.</p>
      </div>
    </section>
  );
}
