import Link from 'next/link';

interface Resource {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  price: string;
}

const FREE_RESOURCES: Resource[] = [
  {
    id: 'sblo-directory',
    name: 'SBLO Contact Directory',
    description: 'Small Business Liaison Officers (SBLO) at federal agencies and prime contractors. 76+ agencies covered.',
    icon: '📋',
    href: '/sblo-directory',
    price: '$997',
  },
  {
    id: 'december-spend',
    name: 'December Spend Forecast',
    description: 'Capitalize on year-end government spending. Agency budgets, hot categories, and positioning strategies.',
    icon: '💰',
    href: '/december-spend',
    price: '$1,297',
  },
  {
    id: 'ai-prompts',
    name: '75+ AI Prompts for GovCon',
    description: 'Ready-to-use AI prompts to accelerate your federal contracting business. Works with ChatGPT, Claude & more.',
    icon: '🤖',
    href: '/ai-prompts',
    price: '$797',
  },
  {
    id: 'action-plan-2026',
    name: '2026 GovCon Action Plan',
    description: 'Your step-by-step roadmap to winning federal contracts in 2026. Month-by-month milestones.',
    icon: '📅',
    href: '/action-plan-2026',
    price: '$497',
  },
  {
    id: 'guides-templates',
    name: 'GovCon Guides & Templates',
    description: 'Comprehensive guides and ready-to-use templates for federal contracting success.',
    icon: '📄',
    href: '/guides-templates',
    price: '$97',
  },
  {
    id: 'tier2-directory',
    name: 'Tier-2 Supplier Directory',
    description: 'Access Tier-2 supplier contacts and vendor registration portals at major prime contractors.',
    icon: '🏢',
    href: '/tier2-directory',
    price: '$697',
  },
  {
    id: 'expiring-contracts-csv',
    name: 'Free Expiring Contracts CSV',
    description: 'Sample of expiring federal contracts data. Import into Excel, Sheets, or your CRM.',
    icon: '📊',
    href: '/expiring-contracts-csv',
    price: '$697',
  },
  {
    id: 'tribal-list',
    name: 'Tribal Contractor List',
    description: '500+ Native American-owned federal contractors for teaming and subcontracting opportunities.',
    icon: '🤝',
    href: '/tribal-list',
    price: '$297',
  },
  {
    id: 'opportunity-hunter',
    name: 'Opportunity Hunter',
    description: 'Find out which government buyers buy what you sell. Identify your ideal federal customers in minutes.',
    icon: '🎯',
    href: '/opportunity-hunter',
    price: '$97/mo',
  },
];

export default function FreeResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-700">GovCon</span>
              <span className="text-xl font-bold text-amber-500">Giants</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-800 text-white rounded-lg font-semibold text-sm hover:bg-blue-700"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎁</span>
            <h1 className="text-3xl font-bold">Free GovCon Resources</h1>
          </div>
          <p className="text-lg opacity-95">
            Download free templates, checklists, and guides to accelerate your government contracting journey.
            Just enter your email to access.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FREE_RESOURCES.map((resource) => (
            <Link
              key={resource.id}
              href={resource.href}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200 hover:border-green-400 hover:shadow-xl transition-all block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{resource.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{resource.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400 line-through">{resource.price}</span>
                  <span className="block text-green-600 font-bold">FREE</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <span className="block w-full px-4 py-2 rounded-lg font-medium text-center bg-green-500 text-white hover:bg-green-600 transition-colors">
                Get Free Access
              </span>
            </Link>
          ))}
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Want More?</h2>
              <p className="opacity-90">
                Upgrade to our premium tools for advanced market intelligence, contractor databases, and AI-powered content generation.
              </p>
            </div>
            <Link
              href="/"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors whitespace-nowrap"
            >
              View Premium Tools
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 text-center text-gray-600">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GovCon Giants. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
