'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogArticle, topicColors } from '@/data/blog-articles';

const topics = [
  { key: 'all', label: 'All' },
  { key: 'market-research', label: 'Market Research' },
  { key: 'business-development', label: 'Business Development' },
  { key: 'linkedin-content', label: 'LinkedIn & Content' },
  { key: 'teaming-subcontracting', label: 'Teaming & Subcontracting' },
  { key: 'contract-intelligence', label: 'Contract Intelligence' },
];

export default function BlogGrid({ articles }: { articles: BlogArticle[] }) {
  const [activeTopic, setActiveTopic] = useState('all');

  const filtered = activeTopic === 'all'
    ? articles
    : articles.filter(a => a.topic === activeTopic);

  return (
    <>
      {/* Filter Bar */}
      <div className="max-w-[1200px] mx-auto -mt-7 px-5 relative z-10">
        <div className="bg-white rounded-2xl p-4 flex gap-2.5 flex-wrap justify-center shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          {topics.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTopic(t.key)}
              className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all cursor-pointer ${
                activeTopic === t.key
                  ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <section className="max-w-[1200px] mx-auto mt-10 px-5 pb-15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => {
            const colors = topicColors[article.topic] || { bg: '#f1f5f9', text: '#475569' };
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all flex flex-col no-underline"
              >
                <div className="px-6 pt-6">
                  <div className="flex gap-2 items-center mb-3.5 flex-wrap">
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
                </div>
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-blue-500 text-sm font-semibold">
                    Read More <span className="transition-transform group-hover:translate-x-1">&rsaquo;</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
