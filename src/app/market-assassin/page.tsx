import ProductPageAppSumo from '@/components/ProductPageAppSumo';

export default function MarketAssassinProductPage() {
  return (
    <ProductPageAppSumo
      title="Federal Market Assassin"
      tagline="Stop guessing. Start winning. Get the intel your competitors don't have."
      description="Stop spending weeks on market research that leads nowhere. Stop guessing which agencies to target. Stop losing to competitors who somehow always know more than you. Federal Market Assassin gives you the same market intelligence that $50K/year consultants charge for—in under 5 minutes. Enter 5 inputs, select your agencies, and instantly get 8 strategic reports that tell you exactly where to focus, who to contact, and how to win."
      primaryColor="#dc2626"
      gradientFrom="#dc2626"
      gradientTo="#991b1b"
      price="$297"
      originalPrice="$997 value"
      checkoutUrl="https://buy.govcongiants.org/checkout/buy/1dcb791b-e1a1-4500-a4c2-bd255e8124e6"
      pricingTiers={[
        {
          name: 'Standard',
          price: '$297',
          originalPrice: '$997 value',
          checkoutUrl: 'https://buy.govcongiants.org/checkout/buy/1dcb791b-e1a1-4500-a4c2-bd255e8124e6?enabled=1227284',
          description: 'Core 4 reports for essential market intelligence',
          features: [
            'Lifetime access',
            'Pain Points & Priorities Report',
            'Government Buyers Report',
            'Agency Spend Analysis',
            'OSBP Contacts Directory',
            'Export to HTML/PDF',
            'All future updates',
          ],
        },
        {
          name: 'Premium',
          price: '$497',
          originalPrice: '$1,997 value',
          checkoutUrl: 'https://buy.govcongiants.org/checkout/buy/8ed4e356-497d-46f5-9674-cd48d3469fb9?enabled=1227287',
          description: 'Full 8 reports + unlimited generations & enhanced depth',
          features: [
            'Everything in Standard, plus:',
            'Subcontracting Opportunities Report',
            'IDV Contracts Analysis',
            'Similar Awards Report',
            'Tribal Contracting Report',
            'Unlimited report generations',
            'Enhanced report depth',
            'Priority support',
          ],
        },
      ]}
      videoTitle="Federal Market Assassin Demo"
      videoSubtitle="See 8 strategic reports generated in under 2 minutes"
      mainImage="/images/products/market-assassin/home page.png"
      screenshots={[
        '/images/products/market-assassin/home page.png',
        '/images/products/market-assassin/target agencies.png',
        '/images/products/market-assassin/executive summary.png',
        '/images/products/market-assassin/agency spend analysis.png',
      ]}
      screenshotFeatures={[
        {
          image: '/images/products/market-assassin/spending trends.png',
          title: 'Spending Trends & Forecasts',
          description: 'Visualize agency spending patterns over time. Identify peak spending periods, seasonal trends, and forecast future opportunities based on historical data.',
          bullets: [
            'Quarterly and annual spending breakdowns',
            'Year-over-year comparison charts',
            'Predictive spending forecasts',
            'Identify Q4 spending surges',
          ],
        },
        {
          image: '/images/products/market-assassin/comprehensive report.png',
          title: 'Comprehensive Market Report',
          description: 'Get a complete picture of your target market with detailed analysis of contract awards, competition, and opportunities in your NAICS codes.',
          bullets: [
            'Contract award summaries',
            'Competitive landscape analysis',
            'Set-aside utilization rates',
            'Top performing contractors',
          ],
        },
        {
          image: '/images/products/market-assassin/similar awards.png',
          title: 'Similar Awards Analysis',
          description: 'Discover contracts similar to your capabilities. Find teaming opportunities and understand what agencies are buying in your space.',
          bullets: [
            'Contracts matching your NAICS codes',
            'Award values and durations',
            'Incumbent contractor information',
            'Recompete opportunity timelines',
          ],
        },
        {
          image: '/images/products/market-assassin/osbp contacts by agency.png',
          title: 'OSBP Contacts Directory',
          description: 'Direct access to Office of Small Business Programs contacts at every agency. Build relationships with the people who advocate for small businesses.',
          bullets: [
            'OSBP director contact information',
            'Agency-specific small business offices',
            'Email addresses and phone numbers',
            'Direct links to agency OSBP pages',
          ],
        },
      ]}
      tldr={[
        'Stop wasting weeks on manual research—get answers in 5 minutes',
        'Know exactly which agencies spend money in your NAICS codes',
        'Find the decision makers and their contact information',
        'Identify teaming partners with subcontracting goals',
        'Time your outreach perfectly with spending trend data',
      ]}
      glanceItems={[
        { label: 'Reports Generated', value: '8 comprehensive reports' },
        { label: 'Inputs Required', value: '5 core inputs' },
        { label: 'Best for', value: '8(a), HUBZone, SDVOSB, Small businesses' },
        { label: 'Export Options', value: 'HTML, PDF, JSON' },
      ]}
      categoriesTitle="8 Strategic Reports Included"
      categories={[
        { title: 'Market Analytics Dashboard', highlight: true },
        { title: 'Government Buyers Report', highlight: true },
        { title: 'Subcontracting Opportunities', highlight: true },
        { title: 'IDV Contracts Analysis', highlight: true },
        { title: 'Similar Awards Report', highlight: true },
        { title: 'Tribal Contracting', highlight: true },
        { title: 'OSBP Contacts Directory', highlight: true },
        { title: 'Export Everything', highlight: true },
      ]}
      features={[
        {
          icon: '📊',
          title: 'Market Analytics Dashboard',
          description: 'Agency spending analysis, spending trends & forecasts, geographic distribution charts.',
        },
        {
          icon: '👥',
          title: 'Government Buyers Report',
          description: 'Identify specific contracting officers and program managers at your target agencies.',
        },
        {
          icon: '🤝',
          title: 'Subcontracting Opportunities',
          description: 'Find prime contractors with subcontracting goals in your NAICS codes.',
        },
        {
          icon: '📋',
          title: 'IDV Contracts Analysis',
          description: 'Indefinite Delivery Vehicles in your space—BPAs, IDIQs, and GWACs.',
        },
      ]}
      benefits={[
        'Stop guessing which agencies to target',
        'Know exactly where the money is being spent',
        'Find decision makers before your competitors do',
        'Identify teaming partners who need your certs',
        'Time your outreach for Q4 spending surges',
        'Save weeks of manual research',
        'Lifetime access (one-time payment)',
        'All future updates included',
      ]}
      highlightTitle="Your Competitors Are Already Using This Intel"
      highlightText="The contractors winning contracts aren't smarter than you—they just have better intelligence. They know which agencies are spending, who the decision makers are, and when to reach out. Federal Market Assassin levels the playing field. In 5 minutes, you'll have the same intel that used to require a $50K/year consultant or weeks of manual research."
      reviews={[
        {
          name: 'David K.',
          date: '1 week ago',
          rating: 5,
          text: 'I entered my 5 inputs and within minutes had 8 reports that would have taken my BD team weeks to compile. The subcontracting report alone identified 12 primes we should be teaming with.',
        },
        {
          name: 'Patricia M.',
          date: '2 weeks ago',
          rating: 5,
          text: 'As an 8(a) company, the Market Analytics dashboard showing agency spending by quarter was eye-opening. We now know exactly when to time our outreach for Q4 spending pushes.',
        },
        {
          name: 'Robert T.',
          date: '3 weeks ago',
          rating: 5,
          text: 'The OSBP contacts directory and Government Buyers report gave us direct access to decision makers. We set up 6 capability briefings in the first month. $597 is a steal for this intel.',
        },
      ]}
    />
  );
}
