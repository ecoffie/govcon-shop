import type { Metadata } from 'next';
import Link from 'next/link';
import { blogArticles } from '@/data/blog-articles';
import BlogGrid from './BlogGrid';

export const metadata: Metadata = {
  title: 'GovCon Resource Center',
  description: 'Strategies, guides, and intel to win federal contracts. Learn market research, business development, LinkedIn content strategy, teaming, and contract intelligence for government contractors.',
  openGraph: {
    title: 'GovCon Resource Center | GovCon Giants',
    description: 'Strategies, guides, and intel to win federal contracts. 15+ articles across market research, BD, content, teaming, and contract intelligence.',
    url: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-900">
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-purple-600 px-8 py-20 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-[700px] mx-auto">
          <h1 className="text-4xl md:text-[44px] font-extrabold text-white mb-4 tracking-tight leading-tight">
            GovCon Resource Center
          </h1>
          <p className="text-xl text-white/90 font-normal leading-relaxed">
            Strategies, guides, and intel to win federal contracts
          </p>
          <div className="inline-block mt-6 bg-white/15 px-6 py-2 rounded-full text-white text-sm font-semibold">
            {blogArticles.length} articles across 5 topics
          </div>
        </div>
      </section>

      {/* Filterable Grid */}
      <BlogGrid articles={blogArticles} />

      {/* Bottom CTA */}
      <section className="max-w-[1200px] mx-auto mb-15 px-5">
        <div className="bg-gradient-to-br from-blue-900 to-purple-600 rounded-2xl px-10 py-15 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white mb-3">Ready to Put These Strategies to Work?</h2>
            <p className="text-lg text-white/85 mb-10">Our tools automate the research, analysis, and outreach that win federal contracts.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[900px] mx-auto mb-8">
              {[
                { href: 'https://tools.govcongiants.org/market-assassin', name: 'Market Assassin', desc: 'Agency research, pain points, OSBP contacts & spending analysis' },
                { href: 'https://tools.govcongiants.org/content-generator', name: 'Content Reaper', desc: 'AI-powered LinkedIn posts from 250 agencies' },
                { href: 'https://tools.govcongiants.org/contractor-database', name: 'Contractor Database', desc: '3,500+ federal contractors with SBLO contacts' },
                { href: 'https://tools.govcongiants.org/expiring-contracts', name: 'Recompete Tracker', desc: 'Track expiring contracts for recompete opportunities' },
                { href: 'https://tools.govcongiants.org/opportunity-hunter', name: 'Opportunity Hunter', desc: 'Find agencies spending in your NAICS codes' },
              ].map(tool => (
                <a key={tool.name} href={tool.href} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 no-underline hover:bg-white/20 hover:-translate-y-0.5 transition-all">
                  <h4 className="text-white text-[15px] font-bold mb-1.5">{tool.name}</h4>
                  <p className="text-white/75 text-[13px] leading-snug">{tool.desc}</p>
                </a>
              ))}
            </div>
            <Link href="/store" className="inline-block bg-white text-blue-900 font-bold text-base px-9 py-3.5 rounded-lg no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all">
              View All Tools &amp; Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-white/40 text-[13px]">
        <p>&copy; 2026 GovCon Giants. All rights reserved. | <a href="mailto:service@govcongiants.com" className="text-white/50 no-underline hover:text-white/80">service@govcongiants.com</a> | 786-477-0477</p>
      </footer>
    </div>
  );
}
