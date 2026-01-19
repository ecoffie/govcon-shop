'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Resource {
  id: string;
  name: string;
  description: string;
  icon: string;
  downloadUrl: string;
  value: string;
}

const ALL_FREE_RESOURCES: Resource[] = [
  {
    id: 'sblo-list',
    name: 'SBLO Contact List',
    description: '225 Small Business Liaison Officers across 76+ federal agencies with direct emails and phone numbers.',
    icon: '📋',
    downloadUrl: '/resources/sblo-contact-list.html',
    value: '$997',
  },
  {
    id: 'tier2-directory',
    name: 'Tier-2 Supplier Directory',
    description: '50+ prime contractor supplier contacts with vendor registration portal links.',
    icon: '🏢',
    downloadUrl: '/resources/tier2-supplier-directory.html',
    value: '$697',
  },
  {
    id: 'ai-prompts',
    name: '75+ AI Prompts for GovCon',
    description: 'Ready-to-use AI prompts to accelerate your federal contracting business.',
    icon: '🤖',
    downloadUrl: '/resources/ai-prompts-govcon.html',
    value: '$797',
  },
  {
    id: 'action-plan-2026',
    name: '2026 GovCon Action Plan',
    description: 'Your step-by-step roadmap to winning federal contracts in 2026.',
    icon: '📅',
    downloadUrl: '/resources/action-plan-2026.html',
    value: '$497',
  },
  {
    id: 'december-spend',
    name: 'December Spend Forecast',
    description: 'Year-end government spending predictions with hot agencies and categories.',
    icon: '💰',
    downloadUrl: '/resources/december-spend-forecast.html',
    value: '$1,297',
  },
  {
    id: 'guides-templates',
    name: 'GovCon Guides & Templates',
    description: 'Comprehensive guides and ready-to-use templates for federal contracting success.',
    icon: '📄',
    downloadUrl: '/resources/govcon-guides-templates.html',
    value: '$97',
  },
  {
    id: 'expiring-contracts-csv',
    name: 'Expiring Contracts CSV',
    description: 'Sample of expiring federal contracts data for import into Excel or your CRM.',
    icon: '📊',
    downloadUrl: '/resources/expiring-contracts-sample.csv',
    value: '$697',
  },
  {
    id: 'tribal-list',
    name: 'Tribal Contractor List',
    description: '500+ Native American-owned federal contractors for teaming opportunities.',
    icon: '🤝',
    downloadUrl: '/resources/tribal-contractor-list.html',
    value: '$297',
  },
];

export default function AllFreeResourcesPage() {
  const router = useRouter();
  const [verified, setVerified] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [checkingEmail, setCheckingEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user has verified email stored
    const storedEmail = localStorage.getItem('govcon_verified_email');
    if (storedEmail) {
      setEmail(storedEmail);
      checkVerification(storedEmail);
    } else {
      setVerified(false);
    }
  }, []);

  const checkVerification = async (emailToCheck: string) => {
    try {
      const response = await fetch(`/api/check-verification?email=${encodeURIComponent(emailToCheck)}`);
      const data = await response.json();
      setVerified(data.verified === true);
      if (data.verified) {
        setEmail(emailToCheck);
      }
    } catch {
      setVerified(false);
    }
  };

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/check-verification?email=${encodeURIComponent(checkingEmail)}`);
      const data = await response.json();

      if (data.verified) {
        localStorage.setItem('govcon_verified_email', checkingEmail);
        setEmail(checkingEmail);
        setVerified(true);
      } else {
        setError('Email not found or not verified. Please verify your email first.');
      }
    } catch {
      setError('Failed to check email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (verified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show access form if not verified
  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-green-50 p-5">
        <div className="bg-white rounded-2xl p-10 max-w-lg shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-6xl">🔐</span>
            <h1 className="text-green-800 mt-4 mb-3 text-3xl font-bold">
              Access Free Resources
            </h1>
            <p className="text-gray-600">
              Enter your verified email to access all free GovCon resources.
            </p>
          </div>

          <form onSubmit={handleCheckEmail} className="space-y-4">
            <input
              type="email"
              value={checkingEmail}
              onChange={(e) => setCheckingEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 transition-colors"
            >
              {loading ? 'Checking...' : 'Access Resources'}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Don&apos;t have verified access yet?
            </p>
            <Link
              href="/free-resources"
              className="inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Get Free Access
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show all resources for verified users
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-700">GovCon</span>
              <span className="text-xl font-bold text-amber-500">Giants</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">
                <span className="text-green-600">Verified:</span> {email}
              </span>
              <Link
                href="/"
                className="px-4 py-2 bg-blue-800 text-white rounded-lg font-semibold text-sm hover:bg-blue-700"
              >
                View Premium Tools
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎉</span>
            <div>
              <h1 className="text-3xl font-bold">Your Free Resources</h1>
              <p className="opacity-90">Email verified - download all resources below!</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-sm opacity-90">
              <strong>Total Value:</strong> $5,376+ worth of GovCon resources - yours FREE!
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_FREE_RESOURCES.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200 hover:border-green-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{resource.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{resource.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400 line-through">{resource.value}</span>
                  <span className="block text-green-600 font-bold">FREE</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 rounded-lg font-medium text-center bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Download Now
              </a>
            </div>
          ))}
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Want the Full Contractor Database?</h2>
              <p className="opacity-90">
                Upgrade to get 3,500+ federal contractors with contract history, NAICS codes, and direct contact information.
              </p>
            </div>
            <Link
              href="https://buy.govcongiants.org/checkout/buy/0beda92c-6328-40c3-9d4b-8c246f8d0a34"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors whitespace-nowrap"
            >
              Get Full Database - $497
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
