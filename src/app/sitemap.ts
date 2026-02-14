import { MetadataRoute } from 'next';
import { blogArticles } from '@/data/blog-articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shop.govcongiants.org';

  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    // Core
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/store', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
    // Products
    { path: '/content-reaper', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/market-assassin', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/opportunity-hunter', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/expiring-contracts', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contractor-database-product', priority: 0.8, changeFrequency: 'monthly' },
    // Bundles
    { path: '/bundles/starter', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/bundles/pro', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/bundles/ultimate', priority: 0.7, changeFrequency: 'monthly' },
    // Blog index
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    // Free resources
    { path: '/free-resources', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/all-free-resources', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/sblo-directory', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/tier2-directory', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/ai-prompts', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/guides-templates', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/tribal-list', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/december-spend', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/expiring-contracts-csv', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/action-plan-2026', priority: 0.6, changeFrequency: 'monthly' },
    // Planner
    { path: '/planner', priority: 0.5, changeFrequency: 'monthly' },
    // Legal
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
    // Auth
    { path: '/activate', priority: 0.5, changeFrequency: 'monthly' },
  ];

  const blogPages = blogArticles.map(article => ({
    path: `/blog/${article.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...blogPages].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
