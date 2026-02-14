'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Resource {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
}

const FREE_RESOURCES: Resource[] = [
  {
    id: 'sblo-list',
    name: 'SBLO Contact List',
    description: '225 Small Business Liaison Officers across 76+ federal agencies with direct emails.',
    icon: '📋',
    price: '$997',
  },
  {
    id: 'tier2-directory',
    name: 'Tier-2 Supplier Directory',
    description: '50+ prime contractor supplier contacts with vendor registration portals.',
    icon: '🏢',
    price: '$697',
  },
  {
    id: 'ai-prompts',
    name: '75+ AI Prompts for GovCon',
    description: 'Ready-to-use AI prompts to accelerate your federal contracting business.',
    icon: '🤖',
    price: '$797',
  },
  {
    id: 'action-plan-2026',
    name: '2026 GovCon Action Plan',
    description: 'Your step-by-step roadmap to winning federal contracts in 2026.',
    icon: '📅',
    price: '$497',
  },
  {
    id: 'december-spend',
    name: 'December Spend Forecast',
    description: 'Year-end government spending predictions with hot agencies and categories.',
    icon: '💰',
    price: '$1,297',
  },
  {
    id: 'guides-templates',
    name: 'GovCon Guides & Templates',
    description: 'Comprehensive guides and ready-to-use templates for success.',
    icon: '📄',
    price: '$97',
  },
  {
    id: 'expiring-contracts-csv',
    name: 'Expiring Contracts CSV',
    description: 'Sample of expiring federal contracts data for Excel/CRM import.',
    icon: '📊',
    price: '$697',
  },
  {
    id: 'tribal-list',
    name: 'Tribal Contractor List',
    description: '500+ Native American-owned federal contractors for teaming opportunities.',
    icon: '🤝',
    price: '$297',
  },
];

export default function FreeResourcesPage() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleGetAccess = () => {
    setShowModal(true);
    setStatus('idle');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/request-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'free-resources' }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.alreadyVerified) {
          // Already verified - redirect to resources
          localStorage.setItem('govcon_verified_email', email);
          window.location.href = '/all-free-resources';
        } else {
          setStatus('success');
          setMessage('Check your email! We sent a verification link to unlock all free resources.');
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Matching Homepage */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <span>🚀</span> GovCon Giants
            </Link>
            <ul className="hidden md:flex items-center gap-8">
              <li><Link href="/#tools" className="text-gray-800 hover:text-blue-800 font-medium text-sm">Tools</Link></li>
              <li><Link href="/#databases" className="text-gray-800 hover:text-blue-800 font-medium text-sm">Databases</Link></li>
              <li><Link href="/free-resources" className="text-blue-800 font-medium text-sm">Resources</Link></li>
              <li><Link href="/about" className="text-gray-800 hover:text-blue-800 font-medium text-sm">About</Link></li>
              <li><a href="/resources.html" className="text-gray-800 hover:text-blue-800 font-medium text-sm">Blog</a></li>
            </ul>
            <div className="flex items-center gap-4">
              <Link href="/activate" className="px-4 py-2 text-gray-800 border border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50">
                Activate License
              </Link>
              <Link href="/opportunity-hunter" className="px-5 py-2 bg-gradient-to-r from-blue-800 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section - Matching Homepage Style */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-5xl mb-4 inline-block">🎁</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Free GovCon Resources
          </h1>
          <p className="text-xl mb-8 opacity-95">
            Get instant access to $5,376+ worth of government contracting resources. Just verify your email once to unlock everything!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleGetAccess}
              className="px-8 py-4 bg-white text-emerald-700 rounded-lg font-bold text-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Get Free Access Now
            </button>
            <Link href="/all-free-resources" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
              Already Verified?
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* Blog / Resource Center Banner */}
        <a
          href="/resources.html"
          className="block mb-16 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-800 to-purple-600 hover:shadow-2xl transition-all hover:-translate-y-1"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-8 md:p-10">
            <div className="flex-1">
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wide">New: GovCon Blog</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">GovCon Resource Center</h2>
              <p className="text-white/85 text-lg">
                15 free articles on market research, business development, LinkedIn strategy, teaming with primes, and contract intelligence. Real strategies — not sales pitches.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-800 font-bold rounded-lg text-sm">
                Read Articles &rarr;
              </span>
            </div>
          </div>
        </a>

        {/* Resources Grid */}
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">8 FREE RESOURCES</span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What You&apos;ll Get:</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to jumpstart your government contracting journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FREE_RESOURCES.map((resource) => (
            <div
              key={resource.id}
              onClick={handleGetAccess}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{resource.icon}</span>
                <div className="text-right">
                  <span className="text-sm text-gray-400 line-through">{resource.price}</span>
                  <span className="block text-emerald-600 font-bold text-lg">FREE</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.name}</h3>
              <p className="text-sm text-gray-500">{resource.description}</p>
            </div>
          ))}
        </div>

        {/* Total Value CTA */}
        <div className="mt-16 text-center p-10 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200">
          <p className="text-emerald-800 font-semibold text-xl mb-2">
            Total Value: <span className="text-4xl font-bold">$5,376+</span>
          </p>
          <p className="text-emerald-700 text-lg mb-6">Yours absolutely FREE when you verify your email</p>
          <button
            onClick={handleGetAccess}
            className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-lg text-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Unlock All Resources
          </button>
        </div>

        {/* Upgrade CTA - Matching Homepage Bundle Style */}
        <div className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold mb-3">UPGRADE</span>
              <h2 className="text-2xl font-bold mb-2">Want the Full Contractor Database?</h2>
              <p className="opacity-90">
                Get 3,500+ federal contractors with contract history, NAICS codes, and direct contact information.
              </p>
            </div>
            <Link
              href="/contractor-database"
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold rounded-lg transition-all hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              View Full Database - $497
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - Matching Homepage */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div>
              <h4 className="font-bold mb-4 text-white">Products</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/#tools" className="text-gray-400 hover:text-white">All Tools</Link></li>
                <li><Link href="/#databases" className="text-gray-400 hover:text-white">Databases</Link></li>
                <li><Link href="/#bundles" className="text-gray-400 hover:text-white">Bundles</Link></li>
                <li><Link href="/free-resources" className="text-gray-400 hover:text-white">Free Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/free-resources" className="text-gray-400 hover:text-white">Free PDFs</Link></li>
                <li><Link href="/opportunity-hunter" className="text-gray-400 hover:text-white">Opportunity Hunter</Link></li>
                <li><a href="/resources.html" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><a href="mailto:service@govcongiants.com" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-10 border-t border-gray-800 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} GovCon Giants. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            {status === 'success' ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📬</div>
                <h2 className="text-2xl font-bold text-green-700 mb-4">Check Your Email!</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <p className="text-sm text-gray-500">
                  Didn&apos;t receive it? Check your spam folder or{' '}
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setMessage('');
                    }}
                    className="text-green-600 hover:underline"
                  >
                    try again
                  </button>
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🔓</div>
                  <h2 className="text-2xl font-bold text-gray-900">Unlock All Free Resources</h2>
                  <p className="text-gray-600 mt-2">
                    Enter your email and we&apos;ll send you a verification link to access everything.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Sending...' : 'Send Verification Link'}
                  </button>
                </form>

                {status === 'error' && (
                  <p className="text-red-600 text-sm mt-3 text-center">{message}</p>
                )}

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 text-center">
                    <strong>One email = All 8 resources</strong><br />
                    No spam, just your free GovCon resources.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
