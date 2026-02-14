import Link from 'next/link';

export default function TermsOfServicePage() {
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
              <li><Link href="/about" className="text-gray-800 hover:text-blue-800 font-medium text-sm">About</Link></li>
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
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">Last updated: February 2, 2026</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using GovCon Giants (&quot;the Service&quot;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              GovCon Giants provides government contracting intelligence tools and resources, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Federal Market Assassin - market intelligence reports</li>
              <li>Federal Contractor Database - searchable contractor information</li>
              <li>Recompete Contracts Tracker - expiring contracts data</li>
              <li>Content Reaper - AI-powered content creation</li>
              <li>Opportunity Hunter - agency discovery tool</li>
              <li>Free resources including PDFs, templates, and guides</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. License and Access</h2>
            <p className="text-gray-600 mb-4">
              Upon purchase, you receive a personal, non-transferable license to access and use the purchased products. This license includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Lifetime Access:</strong> Your license does not expire for purchased products</li>
              <li><strong>Updates:</strong> Access to product updates and improvements</li>
              <li><strong>Single User:</strong> License is for individual use only and may not be shared</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="text-gray-600 mb-4">
              All purchases are processed securely through Stripe. By making a purchase, you agree that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>All prices are in US dollars unless otherwise stated</li>
              <li>Payment is due at time of purchase</li>
              <li>You are responsible for any applicable taxes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Policy</h2>
            <p className="text-gray-600 mb-4">
              We offer a <strong>30-day money-back guarantee</strong> on all products. If you are not satisfied with your purchase, contact us within 30 days of purchase for a full refund.
            </p>
            <p className="text-gray-600">
              To request a refund, email <a href="mailto:service@govcongiants.com" className="text-blue-800 hover:underline">service@govcongiants.com</a> with your order details.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use</h2>
            <p className="text-gray-600 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Share your account credentials or license keys with others</li>
              <li>Resell, redistribute, or commercially exploit our products</li>
              <li>Attempt to reverse engineer or copy our software</li>
              <li>Use the Service for any unlawful purpose</li>
              <li>Interfere with or disrupt the Service or servers</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Accuracy</h2>
            <p className="text-gray-600">
              While we strive to provide accurate and up-to-date information, government contracting data changes frequently. We do not guarantee the accuracy, completeness, or timeliness of any information provided through our Service. Users should verify critical information through official government sources.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600">
              All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are the exclusive property of GovCon Giants and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600">
              GovCon Giants shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. Our total liability shall not exceed the amount you paid for the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Service</h2>
            <p className="text-gray-600">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time. We will make reasonable efforts to notify users of significant changes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600">
              We may update these Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:service@govcongiants.com" className="text-blue-800 hover:underline">
                service@govcongiants.com
              </a>
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-blue-800 hover:underline font-medium">
            ← Back to Home
          </Link>
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
