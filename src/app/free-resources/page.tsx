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
          <p className="text-lg opacity-95 mb-6">
            Get instant access to $5,376+ worth of government contracting resources.
            Just verify your email once to unlock everything!
          </p>
          <button
            onClick={handleGetAccess}
            className="px-8 py-4 bg-white text-green-700 font-bold rounded-lg text-lg hover:bg-green-50 transition-colors"
          >
            Get Free Access Now
          </button>
        </div>

        {/* Resources Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What You&apos;ll Get:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FREE_RESOURCES.map((resource) => (
            <div
              key={resource.id}
              onClick={handleGetAccess}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200 hover:border-green-400 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{resource.icon}</span>
                <div className="text-right">
                  <span className="text-sm text-gray-400 line-through">{resource.price}</span>
                  <span className="block text-green-600 font-bold">FREE</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.name}</h3>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
          ))}
        </div>

        {/* Total Value */}
        <div className="mt-8 text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <p className="text-green-800 font-semibold text-lg">
            <span className="text-3xl">$5,376+</span> Total Value - <span className="text-green-600 font-bold">100% FREE</span>
          </p>
          <button
            onClick={handleGetAccess}
            className="mt-4 px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
          >
            Unlock All Resources
          </button>
        </div>

        {/* Already Verified */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-2">Already verified your email?</p>
          <Link
            href="/all-free-resources"
            className="text-green-600 font-semibold hover:underline"
          >
            Access Your Resources
          </Link>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Want the Full Contractor Database?</h2>
              <p className="opacity-90">
                Get 3,500+ federal contractors with contract history, NAICS codes, and direct contact information.
              </p>
            </div>
            <Link
              href="https://buy.stripe.com/eVqdRafZfejs7lcaEJ"
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
