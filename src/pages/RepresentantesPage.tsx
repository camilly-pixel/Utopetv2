import { useEffect } from 'react';
import { Award, BadgeDollarSign, MapPin, Sparkles, Zap, TrendingUp, Rocket, Clock } from 'lucide-react';
import { LogoSvg } from '../components/Icons';
import { CheckList, Footer } from '../components/UtopetShared';
import { RepresentanteForm } from '../components/RepresentanteForm';

const destaques = [
  { icon: MapPin, title: '1 por região', text: 'Exclusividade na sua área' },
  { icon: Sparkles, title: 'Mercado novo', text: 'Categoria que acabou de chegar ao Brasil' },
  { icon: BadgeDollarSign, title: 'Comissão alta', text: 'Em cada máquina vendida' },
];

const oportunidades = [
  { icon: BadgeDollarSign, title: 'Comissão alta', text: 'Cada máquina vendida vale mais do que meses de pedidos de ração e medicamento.' },
  { icon: MapPin, title: 'Sua região, só sua', text: 'Apenas 1 representante por região. As clínicas da sua área são suas para trabalhar.' },
  { icon: Sparkles, title: 'Mercado novo', text: 'Triagem de bem-estar sem agulha é uma categoria nova no Brasil. Quase ninguém vendendo ainda, muita clínica para apresentar.' },
  { icon: Zap, title: 'Produto que se diferencia sozinho', text: '139 parâmetros em minutos, sem agulha, com relatório pronto para o tutor. O veterinário entende na primeira demonstração.' },
  { icon: TrendingUp, title: 'Demanda em alta', text: 'Tutores buscam cada vez mais prevenção, e o veterinário procura como oferecer isso na consulta.' },
  { icon: Rocket, title: 'Cresça com a empresa', text: 'Você entra no começo e cresce junto com a Utopet enquanto ela chega a novas cidades.' },
];

const passos = ['Você se inscreve', 'Nosso time conversa com você', 'Você garante a sua região', 'Você conhece a Utopet a fundo e começa a vender'];

export default function RepresentantesPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Seja representante Utopet: 1 por região';
    return () => { document.title = previous; };
  }, []);

  const goToForm = () => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div>
      <header className="topo">
        <div className="wrap">
          <nav className="nav-pilula" aria-label="Navegação principal">
            <a href="/representantes" className="logo" aria-label="Utopet"><LogoSvg />topet</a>
            <button className="btn btn-roxo rep-topo-btn" onClick={goToForm}>Quero garantir a minha região</button>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div className="anim-entrada">
                <span className="eyebrow">Vagas limitadas: 1 representante por região</span>
                <h1 className="rep-titulo">2027 pode ser o ano que muda a sua vida como representante.</h1>
                <p className="lead">Estamos escolhendo 1 representante por região para vender a Utopet, uma das máquinas de triagem pet mais avançadas do Brasil. Mercado novo, produto que o veterinário ainda não tem e comissão alta em cada máquina vendida.</p>
                <div className="hero-cta"><button className="btn btn-roxo" onClick={goToForm}>Quero garantir a minha região</button></div>
                <p className="hero-note"><Clock size={16} />Quando uma região é preenchida, ela fecha.</p>
              </div>
              <div className="anim-entrada d1">
                <img className="rep-foto" src="/representante-clinica.jpg" alt="Representante apresentando a máquina Utopet para uma veterinária na clínica" />
              </div>
            </div>
          </div>
        </section>

        <section className="rep-destaques-sec">
          <div className="wrap">
            <ul className="rep-destaques">
              {destaques.map(({ icon: Icon, title, text }) => (
                <li key={title} className="card">
                  <span className="rep-num"><Icon size={22} /></span>
                  <div><b>{title}</b><span>{text}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pad" id="oportunidade">
          <div className="wrap">
            <div className="sec-head center"><span className="eyebrow">A oportunidade</span><h2>Por que esta é a oportunidade de 2027</h2></div>
            <div className="rep-oportunidades">
              {oportunidades.map(({ icon: Icon, title, text }) => (
                <div key={title} className="card rep-op">
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
              <h2>Garanta a sua região</h2>
              <p className="rep-form-sub">Preencha em 1 minuto. Se a sua região ainda estiver aberta, nosso time fala com você pelo WhatsApp.</p>
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
