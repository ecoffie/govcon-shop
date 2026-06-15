import type { Metadata } from 'next';
import ProductPageAppSumo from '@/components/ProductPageAppSumo';
import DailyAlertsEmailPreview from '@/components/DailyAlertsEmailPreview';

export const metadata: Metadata = {
  title: 'Daily Alerts - Saved Search Opportunity Monitoring',
  description: 'Get daily GovCon opportunity alerts matched to your NAICS, agencies, set-asides, and geography. Free during beta, then $19/mo.',
  openGraph: {
    title: 'Daily Alerts | GovCon Giants',
    description: 'Daily saved-search alerts for federal contractors who do not want to miss new matching opportunities.',
    url: '/daily-alerts',
  },
};

export default function DailyAlertsProductPage() {
  return (
    <ProductPageAppSumo
      title="Daily Alerts"
      tagline="Do not miss new federal opportunities that match your business."
      description="Daily Alerts is the lightweight monitoring product for contractors who want new SAM.gov and grants opportunities pushed to their inbox. It watches your saved filters, highlights deadlines, and sends matching opportunities without the deeper analysis included in Market Intelligence."
      primaryColor="#2563eb"
      gradientFrom="#1d4ed8"
      gradientTo="#6d28d9"
      price="FREE"
      originalPrice="$19/mo after beta"
      checkoutUrl="https://mi.govcongiants.com/alerts/signup"
      heroGraphic={<DailyAlertsEmailPreview />}
      tldr={[
        'Free during beta for users with a saved alert profile',
        'Post-beta plan: $19/mo for standalone Daily Alerts',
        'Included for most paid product buyers based on the current access plan',
        'Best for monitoring volume, not for strategic capture analysis',
        'Upgrade path: Market Intelligence at $49/mo when you need prioritization and guidance',
      ]}
      glanceItems={[
        { label: 'Current beta', value: 'Free setup' },
        { label: 'Post-beta', value: '$19/mo standalone' },
        { label: 'Best for', value: 'Saved-search monitoring' },
        { label: 'Setup', value: 'mi.govcongiants.com/alerts/signup', link: 'https://mi.govcongiants.com/alerts/signup' },
      ]}
      categoriesTitle="What Daily Alerts watches"
      categories={[
        { title: 'SAM.gov opportunities', highlight: true },
        { title: 'Grants.gov matches', highlight: true },
        { title: 'NAICS and keyword filters', highlight: true },
        { title: 'Set-aside eligibility', highlight: true },
        { title: 'Deadline urgency', highlight: true },
        { title: 'Posted-date freshness', highlight: true },
      ]}
      features={[
        {
          icon: '📬',
          title: 'Inbox-first monitoring',
          description: 'Receive matching opportunities automatically instead of rerunning searches manually.',
        },
        {
          icon: '🏷️',
          title: 'Notice type and deadline badges',
          description: 'See presolicitations, sources sought, RFQs, solicitations, and urgent deadlines at a glance.',
        },
        {
          icon: '🎯',
          title: 'Matched to your profile',
          description: 'Alerts use your NAICS, set-aside profile, target agencies, and geography when available.',
        },
        {
          icon: '⬆️',
          title: 'Clear upgrade path',
          description: 'When opportunity volume is not enough, Market Intelligence adds prioritization, analysis, and pursuit guidance.',
        },
      ]}
      benefits={[
        'Stop checking SAM.gov manually every day',
        'Catch new matches before deadlines get too close',
        'See more opportunities tied to your NAICS and set-asides',
        'Use alerts as the daily monitoring layer for your BD routine',
        'Keep Market Intelligence separate for deeper strategy',
        'Turn free beta usage into a low-friction $19/mo subscription later',
      ]}
      highlightTitle="How we convert beta users after the free period"
      highlightText="The historical plan was to let users experience alerts during beta, show them what they would have missed, then offer Daily Alerts at $19/mo. The conversion hook is simple: you saw real matching opportunities for free; keep the monitoring active so you do not lose that signal."
      pricingTiers={[
        {
          name: 'Beta',
          price: 'FREE',
          originalPrice: '$19/mo later',
          checkoutUrl: 'https://mi.govcongiants.com/alerts/signup',
          description: 'Set up your saved alert profile while beta access is open.',
          features: [
            'Daily opportunity alerts during beta',
            'NAICS and keyword matching',
            'Notice type and urgency badges',
            'Preferences and unsubscribe controls',
            'Post-beta upgrade path to $19/mo',
          ],
        },
        {
          name: 'Pro',
          price: '$19/mo',
          originalPrice: '$228/yr',
          checkoutUrl: 'https://mi.govcongiants.com/alerts/signup',
          description: 'The intended standalone monitoring tier after beta.',
          features: [
            'Daily saved-search alerts',
            'SAM.gov and grant matches',
            'Deadline reminders',
            'Profile-based filtering',
            'Upgrade CTA into Market Intelligence',
          ],
        },
      ]}
      pricingCallout={{
        eyebrow: 'Need strategy?',
        title: 'Market Intelligence is the next step up',
        description: 'Daily Alerts tell you what matched. Market Intelligence tells you what to pursue and why.',
        href: '/market-intelligence',
        ctaLabel: 'Compare Market Intelligence →',
      }}
      reviews={[
        {
          name: 'Beta user',
          date: 'This week',
          rating: 5,
          text: 'The useful part is not having to remember to search every morning. The matches show up and I can decide what deserves a closer look.',
        },
        {
          name: 'GovCon subscriber',
          date: 'Recently',
          rating: 5,
          text: 'Daily Alerts are the right lightweight layer. I use them for monitoring and upgrade to deeper intel when there is something worth pursuing.',
        },
      ]}
    />
  );
}
