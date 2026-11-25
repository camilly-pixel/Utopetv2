import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BLOG_POSTS, BLOG_TEMAS, publishedPosts, isPreview, hojeBrasilia, type BlogPost } from '../data/blogPosts';
import '../styles/blog.css';

const SITE = 'https://utopet.com.br';
const UTM = (campanha: string) => `?utm_source=blog&utm_medium=menu&utm_campaign=${campanha}`;

/* LOGO: substituir pelo logo oficial do site (o mesmo do cabeçalho de /tutor).
   `light` = versão para fundo escuro (rodapé). */
function Logo({ light }: { light?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', height: 32, color: light ? '#fff' : 'var(--ub-tinta)', fontFamily: "'Satoshi', 'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
      <svg viewBox="0 0 62 100" aria-hidden="true" style={{ width: '0.62em', height: '1em', overflow: 'visible', marginRight: '0.02em' }}>
        <path d="M8 6 v44 a23 23 0 0 0 46 0 v-44" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
        <path d="M16 84 a18 14 0 0 1 30 0" fill="none" stroke={light ? '#fff' : 'var(--lilas)'} strokeWidth="11" strokeLinecap="round" />
      </svg>topet
    </span>
  );
}

/* ---------- head (title, meta, canonical, JSON-LD) ---------- */
type HeadOpts = {
  title: string; description: string; path: string;
  ogType?: string; image?: string; jsonLd?: object[]; noindex?: boolean;
};

function setMeta(attr: 'name' | 'property', key: string, value: string | null, created: Element[], restore: Array<() => void>) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (value === null) {
    if (el) { const prev = el.content; const e = el; e.remove(); restore.push(() => document.head.appendChild(Object.assign(e, { content: prev }))); }
    return;
  }
  if (el) { const prev = el.content; el.content = value; const e = el; restore.push(() => { e.content = prev; }); }
  else { el = document.createElement('meta'); el.setAttribute(attr, key); el.content = value; document.head.appendChild(el); created.push(el); }
}

function useHead(o: HeadOpts) {
  useEffect(() => {
    const created: Element[] = [];
    const restore: Array<() => void> = [];
    const prevTitle = document.title;
    document.title = o.title;
    const url = SITE + o.path;
    setMeta('name', 'description', o.description, created, restore);
    setMeta('name', 'robots', o.noindex ? 'noindex, follow' : null, created, restore);
    setMeta('property', 'og:type', o.ogType || 'website', created, restore);
    setMeta('property', 'og:title', o.title, created, restore);
    setMeta('property', 'og:description', o.description, created, restore);
    setMeta('property', 'og:url', url, created, restore);
    if (o.image) setMeta('property', 'og:image', SITE + o.image, created, restore);
    let canon = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canon) { const prev = canon.href; const c = canon; c.href = url; restore.push(() => { c.href = prev; }); }
    else { canon = document.createElement('link'); canon.rel = 'canonical'; canon.href = url; document.head.appendChild(canon); created.push(canon); }
    (o.jsonLd || []).forEach(data => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      created.push(s);
    });
    return () => { document.title = prevTitle; created.forEach(e => e.remove()); restore.reverse().forEach(f => f()); };
  }, [o.title, o.path]);
}

/* ---------- moldura comum ---------- */
function Topo() {
  return (
    <header className="ublog-topo">
      <div className="ublog-topo-in">
        <a className="ublog-logo" href="/" aria-label="Utopet, página inicial"><Logo /></a>
        <nav className="ublog-menu" aria-label="Principal">
          <a href={'/tutor' + UTM('menu-tutor')}>Para tutores</a>
          <a href={'/veterinario' + UTM('menu-vet')}>Para veterinários</a>
          <a href="/blog" aria-current="page">Blog</a>
        </nav>
        <a className="ublog-botao" href={'/tutor' + UTM('menu-agendar')}>Agendar triagem</a>
      </div>
    </header>
  );
}

function Rodape({ atual }: { atual?: string }) {
  const posts = publishedPosts();
  return (
    <footer className="ublog-rodape">
      <div className="ublog-larga">
        <div className="ublog-rodape-grid">
          <div className="ublog-rodape-marca">
            <a className="ublog-logo" href="/" aria-label="Utopet, página inicial"><Logo light /></a>
            <p>Triagem de bem-estar para cães e gatos. Eles não falam, mas sentem.</p>
          </div>
          <nav className="ublog-rodape-blog" aria-labelledby="ublog-rb-t">
            <h2 id="ublog-rb-t">Do blog</h2>
            <ul>
              {posts.map(p => (
                <li key={p.slug}><a href={`/blog/${p.slug}`} aria-current={p.slug === atual ? 'page' : undefined}>{p.title}</a></li>
              ))}
            </ul>
          </nav>
          <nav className="ublog-rodape-links" aria-labelledby="ublog-rl-t">
            <h2 id="ublog-rl-t">Utopet</h2>
            <ul>
              <li><a href={'/tutor' + UTM('rodape')}>Para tutores</a></li>
              <li><a href={'/veterinario' + UTM('rodape')}>Para veterinários</a></li>
              <li><a href="/blog">Todos os artigos</a></li>
            </ul>
          </nav>
        </div>
        <div className="ublog-rodape-fim">
          <p>O conteúdo deste blog é informativo e não substitui a consulta com um médico-veterinário. A triagem Utopet é uma ferramenta de bem-estar e não faz diagnóstico.</p>
          <p>© 2026 Utopet</p>
        </div>
      </div>
    </footer>
  );
}

function Moldura({ children, variante, atual }: { children: ReactNode; variante: 'index' | 'post'; atual?: string }) {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollPaddingTop;
    html.style.scrollPaddingTop = '5.5rem';
    return () => { html.style.scrollPaddingTop = prev; };
  }, []);
  return (
    <div className={`ublog ublog-${variante}`}>
      <Topo />
      {children}
      <Rodape atual={atual} />
    </div>
  );
}

const temaLabel = (id: string) => BLOG_TEMAS.find(t => t.id === id)?.label || id;

/* ---------- /blog ---------- */
export function BlogIndexPage() {
  const posts = publishedPosts();
  const [filtro, setFiltro] = useState('todos');
  useHead({
    title: 'Blog Utopet: saúde, prevenção e longevidade de cães e gatos',
    description: 'Artigos sobre alimentação, sintomas, prevenção e longevidade de cães e gatos, para tutores e veterinários.',
    path: '/blog',
  });
  const temas = BLOG_TEMAS.filter(t => posts.some(p => p.temas.includes(t.id)));
  const visiveis = filtro === 'todos' ? posts : posts.filter(p => p.temas.includes(filtro));
  const [destaque, ...resto] = visiveis;

  return (
    <Moldura variante="index">
      <main className="ublog-larga">
        <div className="ublog-abertura">
          <h1>Artigos</h1>
          {temas.length > 1 && (
            <div className="ublog-filtros" role="group" aria-label="Filtrar artigos por tema">
              <button type="button" aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')}>Todos</button>
              {temas.map(t => (
                <button key={t.id} type="button" aria-pressed={filtro === t.id} onClick={() => setFiltro(t.id)}>{t.label}</button>
              ))}
            </div>
          )}
        </div>

        {destaque && (
          <a className="ublog-destaque" href={`/blog/${destaque.slug}`} style={{ backgroundImage: `url(${destaque.image})` }}>
            <div className="ublog-etiquetas">{destaque.temas.map(t => <span key={t}>{temaLabel(t)}</span>)}</div>
            <h2>{destaque.title}</h2>
            <p>{destaque.description}</p>
            <p className="ublog-meta">{destaque.readTime} min de leitura</p>
          </a>
        )}

        {resto.length > 0 && (
          <ul className="ublog-grade">
            {resto.map(p => (
              <li key={p.slug} className="ublog-cartao">
                <a href={`/blog/${p.slug}`}>
                  <div className="ublog-foto" style={{ backgroundImage: `url(${p.image})` }}>
                    <div className="ublog-etiquetas">{p.temas.map(t => <span key={t}>{temaLabel(t)}</span>)}</div>
                  </div>
                  <h2>{p.title}</h2>
                  <p className="ublog-meta">{p.readTime} min de leitura</p>
                </a>
              </li>
            ))}
          </ul>
        )}
        {!destaque && <p className="ublog-vazio">Ainda não há artigos neste tema.</p>}
        <div className="ublog-espaco" />
      </main>
    </Moldura>
  );
}

/* ---------- /blog/:slug ---------- */
export function BlogPostPage({ slug }: { slug: string }) {
  const post: BlogPost | undefined = BLOG_POSTS.find(p => p.slug === slug);
  const publicados = publishedPosts();
  const publicado = !!post && publicados.some(p => p.slug === slug);
  const ref = useRef<HTMLDivElement>(null);

  useHead(publicado && post
    ? { title: post.metaTitle, description: post.description, path: `/blog/${post.slug}`, ogType: 'article', image: post.image, jsonLd: post.jsonLd, noindex: isPreview() && post.publishAt > hojeBrasilia() }
    : { title: 'Artigo não encontrado | Utopet', description: 'Este artigo não está disponível.', path: '/blog', noindex: true });

  // "Leia também": só posts já publicados
  useEffect(() => {
    const alvo = ref.current?.querySelector('[data-relacionados]');
    if (!alvo || !post) return;
    const outros = publicados.filter(p => p.slug !== post.slug).slice(0, 4);
    alvo.innerHTML = outros.length
      ? `<section class="relacionados" aria-labelledby="rel-t"><h2 id="rel-t">Leia também</h2><ul>${outros
          .map(p => `<li><a href="/blog/${p.slug}">${p.title}</a></li>`).join('')}</ul></section>`
      : '';
  }, [slug, publicados.length]);

  if (!post || !publicado) {
    return (
      <Moldura variante="post">
        <main className="ublog-coluna ublog-naoachado">
          <h1>Este artigo não está disponível.</h1>
          <p>Veja os artigos já publicados no blog.</p>
          <a className="ublog-botao" href="/blog">Ver todos os artigos</a>
        </main>
      </Moldura>
    );
  }

  return (
    <Moldura variante="post" atual={post.slug}>
      <div ref={ref} className="ublog-post-corpo" dangerouslySetInnerHTML={{ __html: post.html }} />
    </Moldura>
  );
}

/* Rota única: /blog e /blog/<slug> */
export default function BlogRouter() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const m = path.match(/^\/blog\/([a-z0-9-]+)$/);
  return m ? <BlogPostPage slug={m[1]} /> : <BlogIndexPage />;
}
