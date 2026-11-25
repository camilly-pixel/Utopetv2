import { publishedPosts } from '../data/blogPosts';

export function BlogFooterLinks() {
  const posts = publishedPosts().slice(0, 5);

  return (
    <nav aria-label="Do blog" style={{ flexBasis: '100%', minWidth: 0, fontSize: '14.5px' }}>
      <h2 style={{ fontSize: 'inherit', fontWeight: 700, lineHeight: 1.2, color: '#fff', marginBottom: 16 }}>Do blog</h2>
      <ul className="rodape-nav" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.slug}><a href={`/blog/${post.slug}`} style={{ lineHeight: 1.5 }}>{post.title}</a></li>
        ))}
        <li><a href="/blog" style={{ lineHeight: 1.5 }}>Ver todos os artigos</a></li>
      </ul>
    </nav>
  );
}
