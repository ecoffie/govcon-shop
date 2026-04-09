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
  url: 'https://shop.govcongiants.org/market-intelligence',
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
        originalPrice="$588 annualized"
        checkoutUrl="https://buy.stripe.com/00wfZigjc97ceND3OEfnO0z"
        mainImage="/images/products/market-intelligence/briefing-email.png"
        screenshots={[
          '/images/products/market-intelligence/briefing-email.png',
          '/images/products/market-intelligence/briefings-dashboard.png',
          '/images/products/market-intelligence/preferences-page.png',
        ]}
        screenshotFeatures={[
          {
            image: '/images/products/market-intelligence/briefing-email.png',
            title: 'Daily Brief delivered to your inbox',
            description: 'Every morning you receive prioritized opportunities with fit scores, deadlines, and teaming plays tailored to your NAICS codes.',
            bullets: [
              'Win probability scoring (87% fit shown)',
              'Teaming opportunities from prime contractors',
              'Action-ready intel, not just notifications',
            ],
          },
          {
            image: '/images/products/market-intelligence/briefings-dashboard.png',
            title: 'Briefings workspace',
            description: 'Access your daily, weekly, and pursuit briefings in one dashboard. Review history, track follow-ups, and never miss a capture opportunity.',
            bullets: [
              'All 3 briefing types in one place',
              'Briefing history and archives',
              'Designed for BD and capture teams',
            ],
          },
          {
            image: '/images/products/market-intelligence/preferences-page.png',
            title: 'Personalization that improves over time',
            description: 'Set your NAICS codes, target agencies, and geography. The system learns what you click and tunes future briefings automatically.',
            bullets: [
              'NAICS and PSC targeting',
              'Agency and geography filters',
              'Smart profile learning',
            ],
          },
        ]}
        pricingTiers={[
          {
            name: 'Monthly',
            price: '$49/mo',
            originalPrice: '$588 annualized',
            checkoutUrl: 'https://buy.stripe.com/00wfZigjc97ceND3OEfnO0z',
            description: 'Start fast and keep briefings running month to month.',
            features: [
              'Daily market intelligence brief',
              'Weekly deep dive every week',
              'Weekly pursuit brief coverage',
              'Tailored by NAICS, agencies, and geography',
              'Direct access on tools.govcongiants.org/briefings',
              'Cancel anytime',
            ],
          },
          {
            name: 'Annual',
            price: '$497/yr',
            originalPrice: '$588 annualized',
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
          { label: 'Access', value: 'tools.govcongiants.org/briefings' },
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
