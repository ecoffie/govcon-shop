import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogArticles, topicColors, toolLinks } from '@/data/blog-articles';
import ReadingProgress from './ReadingProgress';

export function generateStaticParams() {
  return blogArticles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    openGraph: {
      title: `${article.title} | GovCon Giants`,
      description: article.metaDescription,
      url: `/blog/${article.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription,
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articleIndex = blogArticles.findIndex(a => a.slug === slug);
  const article = blogArticles[articleIndex];
  if (!article) notFound();

  const colors = topicColors[article.topic] || { bg: '#f1f5f9', text: '#475569' };
  const prevArticle = articleIndex > 0 ? blogArticles[articleIndex - 1] : null;
  const nextArticle = articleIndex < blogArticles.length - 1 ? blogArticles[articleIndex + 1] : null;
  const relatedArticles = blogArticles.filter(a => a.topic === article.topic && a.slug !== article.slug);

  // JSON-LD Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    url: `https://shop.govcongiants.org/blog/${article.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'GovCon Giants',
      url: 'https://shop.govcongiants.org',
    },
    author: {
      '@type': 'Organization',
      name: 'GovCon Giants',
    },
    articleSection: article.topicLabel,
  };

  const sidebarTools = [
    { key: 'market-assassin', icon: '\u{1F3AF}', name: 'Market Assassin', desc: 'Agency research, pain points, OSBP contacts & spending analysis', href: 'https://tools.govcongiants.org/market-assassin' },
    { key: 'content-generator', icon: '\u{270D}\u{FE0F}', name: 'Content Reaper', desc: 'AI LinkedIn posts from 250 agencies\' pain points & priorities', href: 'https://tools.govcongiants.org/content-generator' },
    { key: 'contractor-database', icon: '\u{1F4DA}', name: 'Contractor Database', desc: '3,500+ primes with SBLO contacts & vendor portals', href: 'https://tools.govcongiants.org/contractor-database' },
    { key: 'recompete-tracker', icon: '\u{1F551}', name: 'Recompete Tracker', desc: 'Expiring contracts by NAICS, agency & set-aside type', href: 'https://tools.govcongiants.org/expiring-contracts' },
    { key: 'opportunity-hunter', icon: '\u{1F50D}', name: 'Opportunity Hunter', desc: 'Find agencies spending in your NAICS codes', href: 'https://tools.govcongiants.org/opportunity-hunter' },
  ];

  const activeToolKey = article.toolBadge ? (toolLinks[article.toolBadge] || '').split('/').pop() || '' : '';
  const toolKeyMap: Record<string, string> = {
    'market-assassin': 'market-assassin',
    'content-reaper': 'content-generator',
    'content-generator': 'content-generator',
    'contractor-database': 'contractor-database',
    'expiring-contracts': 'recompete-tracker',
    'opportunity-hunter': 'opportunity-hunter',
  };
  const activeSidebarKey = toolKeyMap[activeToolKey] || '';

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgress />

      {/* Nav */}
      <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-white text-xl font-extrabold no-underline tracking-tight">
          GovCon <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Giants</span>
        </Link>
        <div className="flex gap-7 items-center">
          <Link href="/store" className="text-white/75 no-underline text-sm font-medium hover:text-white transition-colors">Store</Link>
          <Link href="https://tools.govcongiants.org/market-assassin" className="text-white/75 no-underline text-sm font-medium hover:text-white transition-colors">Tools</Link>
          <Link href="https://tools.govcongiants.org/free-resources" className="text-white/75 no-underline text-sm font-medium hover:text-white transition-colors">Free Resources</Link>
          <Link href="/blog" className="text-white no-underline text-sm font-semibold">Blog</Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-3.5">
        <div className="max-w-[1160px] mx-auto flex items-center gap-2 text-sm">
          <Link href="/blog" className="text-blue-500 no-underline font-semibold hover:text-blue-700 hover:underline">Blog</Link>
          <span className="text-slate-400 text-xs">&rsaquo;</span>
          <Link
            href={`/blog?topic=${article.topic}`}
            className="text-blue-500 no-underline font-semibold hover:text-blue-700 hover:underline"
          >
            {article.topicLabel}
          </Link>
          <span className="text-slate-400 text-xs">&rsaquo;</span>
          <span className="text-slate-500 font-medium truncate max-w-[400px]">{article.title}</span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-row-reverse max-w-[1160px] mx-auto px-8 py-12 gap-12">
        {/* Article Body */}
        <article className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex gap-2.5 mb-5 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
              style={{ background: colors.bg, color: colors.text }}
            >
              {article.topicLabel}
            </span>
            {article.toolBadge && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                Uses: {article.toolBadge}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
            {article.title}
          </h1>

          {/* Article Content */}
          <div
            className="prose prose-lg prose-slate max-w-none
              [&_h4]:text-[22px] [&_h4]:font-bold [&_h4]:text-slate-900 [&_h4]:mt-9 [&_h4]:mb-3
              [&_h4:first-child]:mt-0
              [&_p]:mb-4 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:text-[17px]
              [&_ul]:my-3 [&_ul]:ml-6 [&_ol]:my-3 [&_ol]:ml-6
              [&_li]:mb-2 [&_li]:text-slate-700 [&_li]:text-[17px]
              [&_strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Prev/Next Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-200">
            {prevArticle ? (
              <Link
                href={`/blog/${prevArticle.slug}`}
                className="flex flex-col p-5 rounded-xl border border-slate-200 bg-slate-50 no-underline hover:border-blue-500 hover:bg-blue-50 hover:-translate-y-0.5 transition-all"
              >
                <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1.5">&larr; Previous Article</span>
                <span className="text-[15px] font-bold text-slate-900 leading-snug">{prevArticle.title}</span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link
                href={`/blog/${nextArticle.slug}`}
                className="flex flex-col p-5 rounded-xl border border-slate-200 bg-slate-50 no-underline text-right hover:border-blue-500 hover:bg-blue-50 hover:-translate-y-0.5 transition-all"
              >
                <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1.5">Next Article &rarr;</span>
                <span className="text-[15px] font-bold text-slate-900 leading-snug">{nextArticle.title}</span>
              </Link>
            ) : <div />}
          </div>

          {/* More in This Topic */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">More in this topic</h3>
              <div className="flex flex-col gap-2.5">
                {relatedArticles.map(ra => (
                  <Link
                    key={ra.slug}
                    href={`/blog/${ra.slug}`}
                    className="text-blue-500 text-base font-semibold no-underline py-2 hover:text-blue-700 transition-colors"
                  >
                    {ra.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="w-[280px] flex-shrink-0 hidden lg:block">
          <div className="sticky top-20">
            <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 mb-4 pb-3 border-b border-slate-200">
              GovCon Tools
            </div>
            {sidebarTools.map(tool => (
              <a
                key={tool.key}
                href={tool.href}
                className={`block no-underline p-3.5 rounded-lg mb-1.5 transition-colors border border-transparent ${
                  tool.key === activeSidebarKey
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <div className="text-lg mb-1">{tool.icon}</div>
                <div className="text-sm font-bold text-slate-900 mb-0.5">{tool.name}</div>
                <div className="text-xs text-slate-500 leading-snug">{tool.desc}</div>
              </a>
            ))}
            <Link href="/store" className="block text-center mt-5 p-3 bg-gradient-to-br from-blue-900 to-purple-600 text-white text-sm font-bold rounded-lg no-underline hover:opacity-90 transition-opacity">
              View All Tools &amp; Bundles
            </Link>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-center py-8 text-white/40 text-[13px]">
        <p>&copy; 2026 GovCon Giants. All rights reserved. | <a href="mailto:service@govcongiants.com" className="text-white/50 no-underline hover:text-white/80">service@govcongiants.com</a> | 786-477-0477</p>
      </footer>
    </div>
  );
}
