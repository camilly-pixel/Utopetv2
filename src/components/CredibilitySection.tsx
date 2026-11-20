import { Award } from 'lucide-react';

const enviagoraFotos = [
  { src: '/enviagora-cd-equipe.jpg', legenda: 'Operação da Enviagora em Extrema/MG', alt: 'Equipe da Enviagora reunida no centro de distribuição em Extrema, Minas Gerais' },
  { src: '/enviagora-day-plateia.jpg', legenda: 'Enviagora Day', alt: 'Plateia reunida no auditório durante o evento Enviagora Day' },
  { src: '/enviagora-day-painel.jpg', legenda: 'Painel no Enviagora Day', alt: 'Palestrantes em um painel no palco do Enviagora Day' },
];

export function CredibilitySection({ onContact }: { onContact: () => void }) {
  return (
    <section className="pad" id="quem-somos">
      <div className="wrap">
        <div className="sec-head center">
          <h2>Quem está por trás da Utopet</h2>
          <p>A Utopet foi criada pelos mesmos fundadores da Enviagora e da Fleurity, empresas que já operam em escala no Brasil.</p>
        </div>
        <figure className="cred-time">
          <img src="/utopet-fundadores.jpg" alt="Fundadores da Utopet reunidos" loading="lazy" />
        </figure>
        <div className="cred-selo"><Award size={18} />Concorrendo ao programa de aceleração da Nestlé</div>
        <div className="cred-faixa">
          <h3>Dos mesmos criadores da Enviagora</h3>
          <div className="cred-fotos">
            {enviagoraFotos.map((foto) => (
              <figure key={foto.src} className="cred-foto">
                <div className="cred-foto-img"><img src={foto.src} alt={foto.alt} loading="lazy" /></div>
                <figcaption>{foto.legenda}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="cred-cta">
          <button className="btn btn-roxo" onClick={onContact}>Agendar demonstração</button>
        </div>
      </div>
    </section>
  );
}
