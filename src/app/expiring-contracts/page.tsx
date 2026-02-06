import ProductPageAppSumo from '@/components/ProductPageAppSumo';

export default function ExpiringContractsPage() {
  return (
    <ProductPageAppSumo
      title="Expiring Contracts Forecast"
      tagline="Be first in line when $221B in contracts get rebid."
      description="Stop chasing new contracts where you have no past performance. Stop competing against 50 other bidders. Recompetes are the easiest path to federal contracts—the government already knows they need the service, and the prime already proved it works. The only question is: will you be on the team when they rebid? This database tells you exactly which contracts are expiring, who the prime is, and when to reach out—months before your competitors even know the opportunity exists."
      primaryColor="#0891b2"
      gradientFrom="#0891b2"
      gradientTo="#06b6d4"
      price="$397"
      originalPrice="$997/month"
      checkoutUrl="https://buy.stripe.com/7sYfZi9UOdnsaxnbh6fnO0k"
      videoTitle="Expiring Contracts Forecast Demo"
      videoSubtitle="See how to find recompete opportunities 3-6 months early"
      screenshots={[
        '/images/products/expiring-contracts/home page expiring contracts.png',
        '/images/products/expiring-contracts/filter contacts.png',
        '/images/products/expiring-contracts/construction filter.png',
        '/images/products/expiring-contracts/billion dollar filter.png',
      ]}
      screenshotFeatures={[
        {
          image: '/images/products/expiring-contracts/10M to 100M.png',
          title: 'Filter by Contract Value',
          description: 'Target contracts in your sweet spot. Filter by value range to find opportunities that match your capabilities.',
          bullets: [
            'Filter $10M to $100M contracts',
            'Target mid-size recompetes',
            'Find subcontracting opportunities',
            'Match your past performance',
          ],
        },
        {
          image: '/images/products/expiring-contracts/1M category.png',
          title: 'Search by Category',
          description: 'Find contracts in your industry. Filter by NAICS code, PSC, or service category.',
          bullets: [
            'Filter by NAICS code',
            'Search by PSC category',
            'Target your industry',
            'See contract history',
          ],
        },
        {
          image: '/images/products/expiring-contracts/500k.png',
          title: 'Small Business Opportunities',
          description: 'Find smaller contracts perfect for small business set-asides and direct awards.',
          bullets: [
            'Contracts under $500K',
            'Set-aside opportunities',
            'Direct award potential',
            'Small business friendly',
          ],
        },
      ]}
      tldr={[
        'Stop competing against 50 bidders on new contracts',
        'Get on recompete teams before they\'re formed',
        'Contact primes 3-6 months before they start looking',
        'Focus only on contracts in your NAICS codes',
        'Win easier—recompetes have less competition',
      ]}
      glanceItems={[
        { label: 'Contract Value', value: '$221B+ tracked' },
        { label: 'Updates', value: 'Monthly refresh' },
        { label: 'Best for', value: 'BD professionals, Small businesses' },
        { label: 'Export', value: 'CSV download included' },
      ]}
      categoriesTitle="Filter By Agency"
      categories={[
        { title: 'Department of Defense', highlight: true },
        { title: 'Department of VA', highlight: true },
        { title: 'Civilian Agencies', highlight: true },
        { title: 'GSA Schedules', highlight: true },
        { title: 'IDIQs & BPAs', highlight: true },
        { title: 'All Federal Agencies', highlight: true },
      ]}
      features={[
        {
          icon: '⏰',
          title: 'Get There First',
          description: 'Contact primes 3-6 months before they start building their recompete teams.',
        },
        {
          icon: '💰',
          title: '$221B+ Tracked',
          description: 'Monitor billions in contract value across all agencies.',
        },
        {
          icon: '📋',
          title: 'Detailed Intel',
          description: 'Get prime contractor names, contract values, agencies, NAICS codes, and expiration dates.',
        },
        {
          icon: '🔄',
          title: 'Monthly Updates',
          description: 'Fresh data every month so you always know whats expiring and when to reach out.',
        },
      ]}
      benefits={[
        'Win contracts with less competition',
        'Be first to contact primes building teams',
        'Stop wasting time on long-shot opportunities',
        'Focus your BD on contracts you can actually win',
        'Know exactly when to reach out',
        'Plan your pipeline months in advance',
        'Lifetime access (one-time payment)',
        'Monthly updates included',
      ]}
      highlightTitle="Why Fight for New Contracts When You Can Walk Into Recompetes?"
      highlightText="New contracts are a bloodbath—50+ bidders, no past performance advantage, months of proposal work for a 2% win rate. But recompetes? The incumbent has to rebuild their team anyway. The government already approved the budget. Your only job is to be in the room when the prime starts looking for subs. This database tells you exactly when that window opens—months before anyone else knows."
      reviews={[
        {
          name: 'David K.',
          date: '3 days ago',
          rating: 5,
          text: 'Won my first subcontract by using this forecast. Found a contract expiring in 4 months, reached out to the prime early, and got on their team. This tool pays for itself.',
        },
        {
          name: 'Lisa T.',
          date: '1 week ago',
          rating: 5,
          text: 'The monthly updates are gold. I plan my BD pipeline around whats expiring. Game changer for my business development strategy.',
        },
        {
          name: 'Marcus R.',
          date: '2 weeks ago',
          rating: 5,
          text: 'The NAICS filtering saved me hours. I only see contracts relevant to my business. Worth every penny.',
        },
      ]}
    />
  );
}
