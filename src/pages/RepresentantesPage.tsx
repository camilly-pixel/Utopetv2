import { useEffect } from 'react';
import { Award, Sparkles, Briefcase, BadgeDollarSign } from 'lucide-react';
import { LogoSvg } from '../components/Icons';
import { CheckList, Footer } from '../components/UtopetShared';
import { RepresentanteForm } from '../components/RepresentanteForm';

const motivos = [
  { icon: Sparkles, title: 'Uma novidade de verdade', text: 'Você chega na clínica com uma tecnologia que o veterinário ainda não tem.' },
  { icon: Briefcase, title: 'Soma à sua carteira', text: 'Vende para as mesmas clínicas, hospitais e pet shops que você já atende.' },
  { icon: BadgeDollarSign, title: 'Comissão em cada máquina', text: 'Você ganha em cada venda fechada na sua região.' },
];

const passos = ['Você se inscreve aqui', 'Nosso time conversa com você', 'Você conhece a Utopet a fundo e começa a vender'];

export default function RepresentantesPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Seja representante Utopet';
    return () => { document.title = previous; };
  }, []);

  const goToForm = () => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div>
      <header className="topo">
        <div className="wrap">
          <nav className="nav-pilula" aria-label="Navegação principal">
            <a href="/representantes" className="logo" aria-label="Utopet"><LogoSvg />topet</a>
            <button className="btn btn-roxo rep-topo-btn" onClick={goToForm}>Quero ser representante</button>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div className="anim-entrada">
                <span className="eyebrow">Vagas para representantes</span>
                <h1 className="rep-titulo">Estamos buscando representantes para vender uma das máquinas de triagem pet mais avançadas do Brasil.</h1>
                <p className="lead">Triagem de bem-estar para cães e gatos, sem agulha, em minutos. Se você já visita clínicas veterinárias, ela soma ao que você vende hoje.</p>
                <div className="hero-cta"><button className="btn btn-roxo" onClick={goToForm}>Quero ser representante</button></div>
              </div>
              <div className="anim-entrada d1">
                <img className="rep-aparelho" src="/utopet-aparelho-3d.jpg" alt="Aparelho de triagem Utopet roxo em 3D" />
              </div>
            </div>
          </div>
        </section>

        <section className="pad" id="por-que">
          <div className="wrap">
            <div className="sec-head center"><span className="eyebrow">Por que vender a Utopet</span></div>
            <div className="fases rep-motivos">
              {motivos.map(({ icon: Icon, title, text }) => (
                <div key={title} className="fase card">
                  <span className="rep-ic"><Icon size={22} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pad" id="perfil">
          <div className="wrap">
            <div className="cartao-grande lavanda card rep-perfil">
              <span className="eyebrow">Perfil que buscamos</span>
              <CheckList items={['Já vende para clínicas, hospitais ou pet shops', 'Tem carteira ativa na sua região', 'Gosta de produto novo e de vender valor, não desconto']} />
            </div>
          </div>
        </section>

        <section className="pad" id="como-funciona">
          <div className="wrap">
            <div className="sec-head center"><span className="eyebrow">Como funciona</span></div>
            <ol className="rep-passos">
              {passos.map((passo, index) => (
                <li key={passo} className="card"><span className="rep-num">{index + 1}</span><p>{passo}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pad" id="inscricao">
          <div className="wrap">
            <div className="card rep-form-card">
              <h2>Quero ser representante Utopet</h2>
              <RepresentanteForm />
            </div>
          </div>
        </section>

        <section className="pad" id="quem-somos">
          <div className="wrap">
            <div className="sec-head center">
              <h2>Quem está por trás da Utopet</h2>
              <p>Os mesmos fundadores da Enviagora e da Fleurity.</p>
            </div>
            <figure className="cred-time rep-time"><img src="/utopet-fundadores.jpg" alt="Fundadores da Utopet reunidos" loading="lazy" /></figure>
            <div className="cred-selo"><Award size={18} />Concorrendo ao programa de aceleração da Nestlé</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
