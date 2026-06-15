import type { Metadata } from 'next';
import ProductPageAppSumo from '@/components/ProductPageAppSumo';

export const metadata: Metadata = {
  title: 'Market Intelligence - Daily, Weekly, and Pursuit Briefings',
  description: 'Get personalized GovCon market intelligence delivered as daily briefs, weekly deep dives, and pursuit briefs. Monthly or annual subscription for serious federal contractors.',
  openGraph: {
    title: 'Market Intelligence | GovCon Giants',
    description: 'Personalized GovCon market intelligence with daily briefs, weekly deep dives, and pursuit briefs.',
    url: '/market-intelligence',
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Market Intelligence',
  description: 'Personalized GovCon market intelligence delivered through daily briefs, weekly deep dives, and pursuit briefs.',
  url: 'https://shop.govcongiants.com/market-intelligence',
  brand: { '@type': 'Organization', name: 'GovCon Giants' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Monthly',
      price: '49',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://buy.stripe.com/00wfZigjc97ceND3OEfnO0z',
    },
    {
      '@type': 'Offer',
      name: 'Annual',
      price: '497',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://buy.stripe.com/aFa6oI6ICdns0WN5WMfnO0A',
    },
  ],
};

export default function MarketIntelligenceProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <ProductPageAppSumo
        title="Market Intelligence"
        tagline="Know what matters before your competitors do."
        description="Market Intelligence is the full GovCon briefing program for contractors who need more than alerts. You get a daily brief to prioritize opportunities, a weekly deep dive to understand agency movement and teaming angles, and pursuit briefs that help you act on real targets. It is built around your NAICS, agencies, and geography so every briefing moves you closer to the right capture decisions."
        primaryColor="#7c3aed"
        gradientFrom="#7c3aed"
        gradientTo="#1e293b"
        price="$49/mo"
        originalPrice="$199/mo value"
        checkoutUrl="https://buy.stripe.com/00wfZigjc97ceND3OEfnO0z"
        videos={[
          {
            url: 'https://vimeo.com/1181485401',
            title: 'Market Intelligence Overview',
          },
        ]}
        mainImage="/images/products/market-intelligence/daily-market-intel.png"
        screenshots={[
          '/images/products/market-intelligence/daily-market-intel.png',
          '/images/products/market-intelligence/weekly-deep-dive-header.png',
          '/images/products/market-intelligence/dashboard-overview.png',
          '/images/products/market-intelligence/briefings-tab.png',
          '/images/products/market-intelligence/top-intelligence.png',
          '/images/products/market-intelligence/grants.png',
        ]}
        screenshotFeatures={[
          {
            image: '/images/products/market-intelligence/daily-market-intel.png',
            title: 'Daily Market Intel delivered to your inbox',
            description: 'Every morning you receive ranked recompete opportunities with contract values, incumbents, and displacement angles tailored to your NAICS codes.',
            bullets: [
              'Top recompete opportunities ranked by value',
              'Incumbent info and contract expiration windows',
              'Displacement angles to identify vulnerabilities',
            ],
          },
          {
            image: '/images/products/market-intelligence/weekly-deep-dive-header.png',
            title: 'Weekly Deep Dive with full opportunity analysis',
            description: 'Each week you get comprehensive analysis of top opportunities including agency, incumbent, contract value, and recompete windows.',
            bullets: [
              'Multi-billion dollar opportunities analyzed',
              'Incumbent performance and schedule issues',
              'Displacement angle assessment',
            ],
          },
          {
            image: '/images/products/market-intelligence/dashboard-overview.png',
            title: 'Full market visibility in one dashboard',
            description: 'See 10,000+ active opportunities at a glance with breakdowns by notice type and top buying agencies. Filter by urgency, set-asides, NAICS, or state.',
            bullets: [
              '10,000+ active opportunities tracked',
              'Notice type breakdown: Solicitations, Sources Sought, Pre-Sol',
              'Top 8 buying agencies ranked by volume',
            ],
          },
          {
            image: '/images/products/market-intelligence/briefings-tab.png',
            title: 'Daily briefings with urgent alerts',
            description: 'Every day you get a prioritized view of opportunities matched to your profile. See what needs attention now with urgent alerts and deadline counts.',
            bullets: [
              'Daily briefing history organized by date',
              'Urgent alerts highlighted in red',
              'Filter by All, Urgent, Opportunities, or Teaming',
            ],
          },
          {
            image: '/images/products/market-intelligence/top-intelligence.png',
            title: 'Top Intelligence with action windows',
            description: 'See presolicitation positioning windows and action recommendations for each opportunity. Know exactly when to engage and what approach to take.',
            bullets: [
              'Presolicitation positioning windows identified',
              'Related NAICS matches surfaced automatically',
              'Combined synopsis alerts for immediate action',
            ],
          },
          {
            image: '/images/products/market-intelligence/grants.png',
            title: 'Federal grants search included',
            description: 'Access $700B+ in annual federal grant funding from Grants.gov. Search by keyword, agency, category, and status to find non-contract funding.',
            bullets: [
              '$700B+ in annual federal grants',
              '14+ federal agencies covered',
              'Filter by category, agency, and open status',
            ],
          },
        ]}
        pricingTiers={[
          {
            name: 'Monthly',
            price: '$49/mo',
            originalPrice: '$199/mo value',
            checkoutUrl: 'https://buy.stripe.com/00wfZigjc97ceND3OEfnO0z',
            description: 'Start fast and keep briefings running month to month.',
            features: [
              'Daily market intelligence brief',
              'Weekly deep dive every week',
              'Weekly pursuit brief coverage',
              'Tailored by NAICS, agencies, and geography',
              'Direct access on mi.govcongiants.com/briefings',
              'Cancel anytime',
            ],
          },
          {
            name: 'Annual',
            price: '$497/yr',
            originalPrice: '$2,388/yr value',
            checkoutUrl: 'https://buy.stripe.com/aFa6oI6ICdns0WN5WMfnO0A',
            description: 'Best value for teams that want the full program all year.',
            features: [
              'Everything in Monthly',
              'Save $91 versus monthly billing',
              'Better fit for active capture teams',
              'Continuous access through the full year',
              'Priority support path',
              'Ultimate bundle still includes lifetime access',
            ],
          },
        ]}
        pricingCallout={{
          eyebrow: 'Ultimate Shortcut',
          title: 'Ultimate Bundle includes lifetime Market Intelligence access',
          description: 'If you are already planning to buy Ultimate, you do not need this standalone subscription.',
          href: '/bundles/ultimate',
          ctaLabel: 'Compare with Ultimate →',
        }}
        tldr={[
          'Daily brief tells you what to look at first',
          'Weekly deep dive gives you strategy, teaming, and market movement',
          'Pursuit brief turns a real target into next-step guidance',
          'Designed for serious contractors, not generic alert fatigue',
          'Ultimate Bundle includes lifetime Market Intelligence access',
        ]}
        glanceItems={[
          { label: 'Cadence', value: 'Daily + weekly + pursuit' },
          { label: 'Best for', value: 'Active BD and capture teams' },
          { label: 'Personalization', value: 'NAICS, agencies, geography' },
          { label: 'Access', value: 'mi.govcongiants.com/briefings' },
        ]}
        categoriesTitle="What the program includes"
        categories={[
          { title: 'Daily Brief', highlight: true },
          { title: 'Weekly Deep Dive', highlight: true },
          { title: 'Pursuit Brief', highlight: true },
          { title: 'Briefing history and dashboard', highlight: true },
          { title: 'Preference-based personalization', highlight: true },
          { title: 'Monthly or annual billing', highlight: true },
        ]}
        features={[
          {
            icon: '📨',
            title: 'Daily Brief',
            description: 'Prioritized opportunities, deadlines, and recommended actions before the workday starts.',
          },
          {
            icon: '🧠',
            title: 'Weekly Deep Dive',
            description: 'Broader market analysis, teaming ideas, agency signals, and where to focus attention next.',
          },
          {
            icon: '🎯',
            title: 'Pursuit Brief',
            description: 'A focused brief for a real opportunity or target pursuit with action steps you can use immediately.',
          },
          {
            icon: '⚙️',
            title: 'Profile-Driven Delivery',
            description: 'Briefings are shaped by your NAICS, target agencies, and geography so the signal stays relevant.',
          },
        ]}
        benefits={[
          'Stop checking multiple systems every morning',
          'See what to pursue and what to ignore faster',
          'Get both tactical opportunity intel and strategic market context',
          'Turn briefing consumption into better outreach and capture action',
          'Keep the briefing experience running after beta access ends',
          'Buy standalone or use Ultimate for lifetime inclusion',
        ]}
        highlightTitle="For contractors who need direction, not noise"
        highlightText="Most alert systems tell you that something happened. Market Intelligence tells you what it means, why it matters, and what to do next. That is the difference between more inbox clutter and an actual capture advantage. Ultimate Bundle also includes lifetime Market Intelligence access, so buyers planning to go all-in do not need a separate subscription."
        reviews={[
          {
            name: 'Angela R.',
            date: '3 days ago',
            rating: 5,
            text: 'The daily brief helps us decide what deserves attention first, and the weekly deep dive gives us enough context to plan follow-up without bouncing between five tools.',
          },
          {
            name: 'Marcus T.',
            date: '1 week ago',
            rating: 5,
            text: 'Pursuit briefs are the piece I did not realize we needed. It feels like someone on the team already did the first round of capture analysis for us.',
          },
        ]}
      />
    </>
  );
}
