import { useEffect, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { LogoSvg } from '../components/Icons';
import '../styles/links.css';

type LinkItem = { slug: string; label: string; subtitle: string; url: string; thumb: string; destaque?: boolean; badge?: string };

const links: LinkItem[] = [
  { slug: 'tutor', label: 'Quero analisar meu pet', subtitle: 'Triagem em casa em Bragança · R$ 150', url: '/tutor?utm_source=instagram&utm_medium=bio&utm_campaign=links', thumb: '/tutor-visita-casa-v2.jpg', destaque: true, badge: '50 vagas' },
  { slug: 'veterinario', label: 'Tenha Utopet na sua clínica', subtitle: 'Para veterinários e pet shops', url: '/veterinario?utm_source=instagram&utm_medium=bio&utm_campaign=links', thumb: '/utopet-aparelho-3d.jpg' },
  { slug: 'representantes', label: 'Seja representante', subtitle: 'Venda Utopet na sua região', url: '/representantes?utm_source=instagram&utm_medium=bio&utm_campaign=links', thumb: '/representante-clinica.jpg' },
  { slug: 'site', label: 'Site Utopet', subtitle: 'Conheça a Utopet', url: '/?utm_source=instagram&utm_medium=bio&utm_campaign=links', thumb: '/pet-golden.jpg' },
  { slug: 'blog', label: 'Blog', subtitle: 'Dicas para mais anos juntos', url: '', thumb: '/pet-gato-calico.jpg' },
];

const FONT_ID = 'links-fraunces';
const DESCRICAO = 'Links da Utopet: agende a triagem de bem-estar do seu pet em Bragança Paulista, leve a Utopet para sua clínica ou seja representante.';

type Clarity = (...args: unknown[]) => void;

function LinkCard({ item, onOpen }: { item: LinkItem; onOpen: (item: LinkItem, event: MouseEvent<HTMLAnchorElement>) => void }) {
  const conteudo = (
    <>
      <img className="lk-thumb" src={item.thumb} alt="" loading="lazy" />
      <span className="lk-textos">
        <span className="lk-label">{item.label}</span>
        <span className="lk-sub">{item.subtitle}</span>
      </span>
      {item.badge && <span className="lk-badge">{item.badge}</span>}
      {item.url ? <ArrowRight className="lk-seta" size={20} aria-hidden="true" /> : <span className="lk-embreve">em breve</span>}
    </>
  );
  if (!item.url) return <div className="lk-card lk-inativo" aria-disabled="true">{conteudo}</div>;
  return <a className={`lk-card ${item.destaque ? 'lk-destaque' : ''}`} href={item.url} onClick={(event) => onOpen(item, event)}>{conteudo}</a>;
}

export default function LinksPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Utopet | Links';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDesc = meta?.content;
    if (meta) meta.content = DESCRICAO;
    if (!document.getElementById(FONT_ID)) {
      const link = document.createElement('link');
      link.id = FONT_ID;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,900,100&display=swap';
      document.head.appendChild(link);
    }
    return () => {
      document.title = previousTitle;
      if (meta && previousDesc !== undefined) meta.content = previousDesc;
    };
  }, []);

  const abrir = (item: LinkItem, event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.fbq?.('trackCustom', 'LinkClick', { label: item.label });
    (window as Window & { clarity?: Clarity }).clarity?.('event', `link_${item.slug}`);
    if (item.url.startsWith('/')) navigate(item.url);
    else window.location.href = item.url;
  };

  return (
    <div className="lk-pagina">
      <main className="lk-coluna">
        <header className="lk-perfil">
          <div className="lk-avatar" aria-hidden="true"><LogoSvg /><span>topet</span></div>
          <h1 className="lk-nome">Utopet <BadgeCheck className="lk-verificado" size={22} aria-label="Perfil oficial" /></h1>
          <p className="lk-bio">Triagem de bem-estar para cães e gatos 🐾<br />Sem agulha, em poucos minutos · Bragança Paulista, SP</p>
        </header>
        <nav className="lk-lista" aria-label="Links da Utopet">
          {links.map((item) => <LinkCard key={item.slug} item={item} onOpen={abrir} />)}
        </nav>
        <footer className="lk-rodape"><span>utopet.com.br</span><span>© Utopet</span></footer>
      </main>
    </div>
  );
}
