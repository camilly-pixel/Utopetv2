import type { ReactNode } from 'react';
import { BatteryFull, ChevronLeft, Send, Signal, Wifi } from 'lucide-react';

function Phone({ children, posicao }: { children: ReactNode; posicao: 'lado' | 'centro' }) {
  return (
    <div className={`tt-iphone ${posicao}`}>
      <div className="tt-iphone-tela">
        <div className="tt-iphone-status"><span>9:41</span><span className="tt-iphone-ilha" /><span className="tt-iphone-icones"><Signal size={12} /><Wifi size={12} /><BatteryFull size={14} /></span></div>
        <div className="tt-iphone-conteudo">{children}</div>
        <span className="tt-iphone-home" />
      </div>
    </div>
  );
}

function Anel({ nota }: { nota: number }) {
  const raio = 44;
  const volta = 2 * Math.PI * raio;
  return (
    <div className="tt-tela-anel">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={raio} className="fundo" />
        <circle cx="50" cy="50" r={raio} className="valor" strokeDasharray={volta} strokeDashoffset={volta * (1 - nota / 100)} />
      </svg>
      <div><b>{nota}</b><small>Nota geral</small></div>
    </div>
  );
}

const resumo = [
  { texto: '2 pontos de atenção', cor: 'laranja' },
  { texto: '1 para observar', cor: 'ambar' },
  { texto: '14 sistemas em equilíbrio', cor: 'verde' },
];

const insights = [
  { titulo: 'Pele e pelagem', tag: 'Atenção', tom: 'laranja', texto: 'A hidratação da pele está abaixo do ideal. Vale conversar com o veterinário sobre a alimentação.', botao: true },
  { titulo: 'Sensibilidade a poeira', tag: 'Observar', tom: 'ambar', texto: 'Repare se ele se coça mais depois da faxina ou de dias com muito pó.' },
  { titulo: 'Digestão', tag: 'Observar', tom: 'ambar', texto: 'Mudanças de ração devem ser feitas aos poucos.' },
];

const observar = ['Coceira depois da faxina', 'Espirros em dias de muito pó', 'Lambidas frequentes nas patas'];

function TelaVisaoGeral() {
  return (
    <>
      <div className="tt-tela-capa">
        <img src="/pet-beagle.jpg" alt="" loading="lazy" />
        <div><b>Thor</b><span>Beagle · 8 anos · 14 kg</span></div>
      </div>
      <div className="tt-tela-corpo">
        <div className="tt-tela-abas"><span className="ativa">Visão geral</span><span>Rotina</span><span>PDF</span></div>
        <Anel nota={85} />
        <ul className="tt-tela-resumo">{resumo.map((item) => <li key={item.texto}><span className={`ponto ${item.cor}`} />{item.texto}</li>)}</ul>
      </div>
    </>
  );
}

function TelaPontos() {
  return (
    <div className="tt-tela-corpo">
      <span className="tt-tela-rot">Thor · Relatório de bem-estar</span>
      <h4 className="tt-tela-titulo">Pontos de atenção</h4>
      <div className="tt-tela-insights">
        {insights.map((item) => (
          <div className="tt-tela-insight" key={item.titulo}>
            <div className="topo"><b>{item.titulo}</b><span className={`tag ${item.tom}`}>{item.tag}</span></div>
            <p>{item.texto}</p>
            {item.botao && <span className="tt-tela-link">Ver o que fazer</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaDetalhe() {
  return (
    <div className="tt-tela-corpo tt-tela-detalhe">
      <div className="tt-tela-voltar"><ChevronLeft size={16} />Pontos de atenção</div>
      <h4 className="tt-tela-titulo">Sensibilidade a poeira e ácaros</h4>
      <div className="tt-tela-escala">
        <div className="barra"><span className="marcador" /></div>
        <div className="rotulos"><span>Baixo</span><span className="ativo">Moderado</span><span>Alto</span></div>
      </div>
      <div className="tt-tela-bloco"><b>O que é</b><p>Mostra como o corpo do Thor reage à poeira e aos ácaros de casa.</p></div>
      <div className="tt-tela-bloco"><b>O que observar em casa</b><ul>{observar.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <span className="tt-tela-botao"><Send size={14} />Enviar ao veterinário</span>
    </div>
  );
}

export function TutorPhones() {
  return (
    <section className="tt-celulares" id="relatorio">
      <div className="wrap">
        <div className="sec-head center">
          <h2>Seu relatório na palma da mão</h2>
          <p>Fácil de ler: uma nota geral, os pontos de atenção e o que fazer em casa. Em PDF para mostrar ao veterinário.</p>
        </div>
        <div className="tt-celulares-linha" aria-label="Exemplos das telas do relatório">
          <Phone posicao="lado"><TelaVisaoGeral /></Phone>
          <Phone posicao="centro"><TelaPontos /></Phone>
          <Phone posicao="lado"><TelaDetalhe /></Phone>
        </div>
        <p className="tt-celulares-legenda">Telas ilustrativas.</p>
      </div>
    </section>
  );
}
