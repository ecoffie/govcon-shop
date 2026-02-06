import Link from 'next/link';

export default function AboutPage() {
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
              <li><Link href="/free-resources" className="text-gray-800 hover:text-blue-800 font-medium text-sm">Resources</Link></li>
              <li><Link href="/about" className="text-blue-800 font-medium text-sm">About</Link></li>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-purple-600 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            About GovCon Giants
          </h1>
          <p className="text-xl opacity-95">
            Empowering small businesses to win federal contracts with data-driven intelligence tools.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Mission */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 hover:shadow-lg transition-all">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            GovCon Giants was built to level the playing field for small businesses pursuing federal contracts.
            We believe that winning government contracts shouldn&apos;t require expensive consultants or insider connections.
          </p>
          <p className="text-gray-600">
            Our suite of intelligence tools gives you the same data and insights that large contractors use,
            at a fraction of the cost. With lifetime access pricing, we&apos;re committed to making these tools
            accessible to every small business owner with federal contracting ambitions.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 hover:shadow-lg transition-all">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/opportunity-hunter" className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-3xl">🔍</span>
              <div>
                <h3 className="font-bold text-gray-900">Opportunity Hunter</h3>
                <p className="text-sm text-gray-600">Free agency discovery tool to find your best-fit agencies</p>
              </div>
            </Link>
            <Link href="/contractor-database" className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-3xl">🏢</span>
              <div>
                <h3 className="font-bold text-gray-900">Contractor Database</h3>
                <p className="text-sm text-gray-600">3,500+ federal contractors for teaming opportunities</p>
              </div>
            </Link>
            <Link href="/expiring-contracts" className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-gray-900">Recompete Contracts</h3>
                <p className="text-sm text-gray-600">Find expiring contracts before they hit the market</p>
              </div>
            </Link>
            <Link href="/ai-content" className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="font-bold text-gray-900">AI Content Generator</h3>
                <p className="text-sm text-gray-600">Generate LinkedIn posts and GovCon content</p>
              </div>
            </Link>
            <Link href="/market-assassin" className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="font-bold text-gray-900">Federal Market Assassin</h3>
                <p className="text-sm text-gray-600">Complete strategic intelligence system</p>
              </div>
            </Link>
            <Link href="/free-resources" className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-3xl">🎁</span>
              <div>
                <h3 className="font-bold text-gray-900">Free Resources</h3>
                <p className="text-sm text-gray-600">$5,376+ worth of PDFs, templates, and guides</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose GovCon Giants?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold text-xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-900">Lifetime Access</h3>
                <p className="text-sm text-gray-600">Pay once, use forever. No subscriptions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold text-xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-900">30-Day Guarantee</h3>
                <p className="text-sm text-gray-600">Full refund if you&apos;re not satisfied.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold text-xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-900">Real Data</h3>
                <p className="text-sm text-gray-600">Sourced from USASpending and FPDS.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold text-xl">✓</span>
              <div>
                <h3 className="font-bold text-gray-900">Instant Access</h3>
                <p className="text-sm text-gray-600">Start using tools immediately after purchase.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-sm opacity-80">Email</p>
                <a href="mailto:service@govcongiants.com" className="hover:text-amber-400 transition-colors">
                  service@govcongiants.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-sm opacity-80">Phone</p>
                <a href="tel:786-477-0477" className="hover:text-amber-400 transition-colors">
                  786-477-0477
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-sm opacity-80">Support Hours</p>
                <p>Monday - Friday, 9am - 5pm EST</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm opacity-80 mb-4">Ready to start winning contracts?</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore Our Tools →
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
    </div>
  );
}
