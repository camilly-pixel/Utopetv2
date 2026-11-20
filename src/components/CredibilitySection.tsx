import { Award } from 'lucide-react';

export type CredibilityCopy = {
  title: string;
  subtitle: string;
  teamAlt: string;
  badge: string;
  strip: string;
  cta: string;
  photos: Array<{ legenda: string; alt: string }>;
};

const PT: CredibilityCopy = {
  title: 'Quem está por trás da Utopet',
  subtitle: 'A Utopet foi criada pelos mesmos fundadores da Enviagora e da Fleurity, empresas que já operam em escala no Brasil.',
  teamAlt: 'Fundadores da Utopet reunidos',
  badge: 'Concorrendo ao programa de aceleração da Nestlé',
  strip: 'Dos mesmos criadores da Enviagora',
  cta: 'Agendar demonstração',
  photos: [
    { legenda: 'Operação da Enviagora em Extrema/MG', alt: 'Equipe da Enviagora reunida no centro de distribuição em Extrema, Minas Gerais' },
    { legenda: 'Enviagora Day', alt: 'Plateia reunida no auditório durante o evento Enviagora Day' },
    { legenda: 'Painel no Enviagora Day', alt: 'Palestrantes em um painel no palco do Enviagora Day' },
  ],
};

const fotos = ['/enviagora-cd-equipe.jpg', '/enviagora-day-plateia.jpg', '/enviagora-day-painel.jpg'];

export function CredibilitySection({ onContact, copy = PT }: { onContact: () => void; copy?: CredibilityCopy }) {
  return (
    <section className="pad" id="quem-somos">
      <div className="wrap">
        <div className="sec-head center">
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <figure className="cred-time">
          <img src="/utopet-fundadores.jpg" alt={copy.teamAlt} loading="lazy" />
        </figure>
        <div className="cred-selo"><Award size={18} />{copy.badge}</div>
        <div className="cred-faixa">
          <h3>{copy.strip}</h3>
          <div className="cred-fotos">
            {fotos.map((src, index) => (
              <figure key={src} className="cred-foto">
                <div className="cred-foto-img"><img src={src} alt={copy.photos[index].alt} loading="lazy" /></div>
                <figcaption>{copy.photos[index].legenda}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="cred-cta">
          <button className="btn btn-roxo" onClick={onContact}>{copy.cta}</button>
        </div>
      </div>
    </section>
  );
}
