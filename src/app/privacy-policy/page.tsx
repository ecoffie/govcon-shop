import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GovCon Giants privacy policy. Learn how we collect, use, and protect your personal information. Payments processed securely through Stripe. Data stored in Supabase.',
  openGraph: {
    title: 'Privacy Policy | GovCon Giants',
    description: 'GovCon Giants privacy policy. Learn how we collect, use, and protect your personal information.',
    url: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Last updated: February 2, 2026</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Name and email address when you create an account or make a purchase</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Information you provide when using our tools (e.g., NAICS codes, business information)</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Service providers who assist in our operations (e.g., Stripe for payments, Supabase for data storage)</li>
              <li>Professional advisors as necessary for legal, accounting, or business purposes</li>
              <li>Law enforcement when required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:{' '}
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
