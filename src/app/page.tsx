import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <span>🚀</span> GovCon Giants
            </Link>
            <ul className="hidden md:flex items-center gap-8">
              <li><a href="#tools" className="text-gray-800 hover:text-blue-800 font-medium text-sm">Tools</a></li>
              <li><a href="#databases" className="text-gray-800 hover:text-blue-800 font-medium text-sm">Databases</a></li>
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
      <section className="bg-gradient-to-r from-blue-800 to-purple-600 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Stop Losing Contracts to Better-Prepared Competitors
          </h1>
          <p className="text-xl mb-8 opacity-95">
            The contractors winning federal deals aren&apos;t smarter than you—they just have better intel. Get the same market intelligence, teaming connections, and BD tools that top performers use.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#tools" className="px-8 py-4 bg-white text-blue-800 rounded-lg font-bold text-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Explore Tools
            </a>
            <Link href="/opportunity-hunter" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
              Try Free Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { icon: "📊", title: "Databases", desc: "Searchable contractor databases" },
              { icon: "📝", title: "Guides", desc: "Step-by-step tutorials" },
              { icon: "🔍", title: "Research Tools", desc: "Find opportunities faster" },
              { icon: "📅", title: "Forecasts", desc: "Contract expiring dates" },
              { icon: "📋", title: "Templates", desc: "Ready-to-use documents" },
              { icon: "🎯", title: "Hit Lists", desc: "Targeted company lists" },
            ].map((cat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{cat.title}</h3>
                <p className="text-sm text-gray-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products/Tools */}
      <section className="py-20 px-6" id="tools">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10 flex-wrap gap-5">
            <h2 className="text-3xl font-bold text-gray-900">Featured Tools</h2>
            <div className="flex gap-3 flex-wrap">
              {["All", "Free", "Premium", "New"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    i === 0
                      ? "bg-blue-800 text-white border-blue-800"
                      : "bg-gray-50 text-gray-800 border-gray-200 hover:border-blue-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Federal Market Assassin - FLAGSHIP */}
            <Link href="/market-assassin" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-red-600 to-red-800 relative overflow-hidden">
                <img src="/images/products/market-assassin/home page.png" alt="Market Assassin" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FLAGSHIP</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Federal Market Assassin</h3>
                <p className="text-gray-500 text-sm mb-4">Stop guessing which agencies to target. Get the same intel $50K consultants charge for—in 5 minutes.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Know where the money is spent</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Find decision makers first</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Identify teaming partners</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Save weeks of research</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$997+ value</div>
                    <div className="text-2xl font-bold text-blue-800">From $297</div>
                    <div className="text-xs text-gray-500">one-time</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm hover:bg-purple-600 transition-all hover:-translate-y-0.5">
                    View Details
                  </span>
                </div>
              </div>
            </Link>

            {/* LinkedIn Content Creator */}
            <Link href="/ai-content" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-500 relative overflow-hidden">
                <Image src="/images/products/ai content generator/ai content generator home page.png" alt="LinkedIn Content Creator" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">PREMIUM</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">GovCon Content Generator</h3>
                <p className="text-gray-500 text-sm mb-4">Stop staring at blank screens. Stop sounding like every other contractor. Generate posts that actually get engagement.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Sound like a GovCon expert</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Save 5+ hours per week</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Get found by AI search engines</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> 10 posts with one click</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$588/year value</div>
                    <div className="text-2xl font-bold text-blue-800">From $197</div>
                    <div className="text-xs text-gray-500">one-time</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    View Details
                  </span>
                </div>
              </div>
            </Link>

            {/* Interactive SBLO & Subcontractor Database */}
            <Link href="/contractor-database" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                <Image src="/images/products/contractor-database/main home page.png" alt="Interactive SBLO & Subcontractor Database" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">PREMIUM</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Interactive SBLO & Subcontractor Database</h3>
                <p className="text-gray-500 text-sm mb-4">Stop cold-calling primes who don&apos;t team. Find the ones who need your certs and get direct SBLO contact info.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Skip the gatekeepers</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Find primes who need you</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Save 20+ hours of research</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Start outreach today</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$997/mo value</div>
                    <div className="text-2xl font-bold text-blue-800">$497</div>
                    <div className="text-xs text-gray-500">one-time</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    View Details
                  </span>
                </div>
              </div>
            </Link>

            {/* Recompete Contracts */}
            <Link href="/expiring-contracts" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                <Image src="/images/products/expiring-contracts/home page expiring contracts.png" alt="Expiring Contracts" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">PREMIUM</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Expiring Contracts Database</h3>
                <p className="text-gray-500 text-sm mb-4">Stop fighting 50 bidders on new contracts. Recompetes are easier—be first in line when $221B gets rebid.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Win with less competition</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Contact primes early</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Plan your pipeline ahead</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Focus on winnable deals</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$497/mo value</div>
                    <div className="text-2xl font-bold text-blue-800">$397</div>
                    <div className="text-xs text-gray-500">one-time</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    View Details
                  </span>
                </div>
              </div>
            </Link>

            {/* Opportunity Hunter Pro - with Free option */}
            <Link href="/opportunity-hunter" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-amber-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-amber-500 to-orange-600 relative overflow-hidden">
                <Image src="/images/products/opportunity-hunter/opp scout home page.png" alt="Opportunity Hunter Pro" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE + PRO</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Opportunity Hunter</h3>
                <p className="text-gray-500 text-sm mb-4">Stop guessing who buys what you sell. Find the exact agencies spending money in your NAICS codes.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Find your ideal buyers</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> See who&apos;s spending money</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-amber-500 font-bold">✓</span> Unlimited searches (Pro)</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-amber-500 font-bold">✓</span> Export to CSV (Pro)</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">FREE</div>
                    <div className="text-xs text-gray-500">or $49 for Pro</div>
                  </div>
                  <span className="px-5 py-2 bg-amber-500 text-white rounded-md font-semibold text-sm">
                    Get Started
                  </span>
                </div>
              </div>
            </Link>

            {/* SBLO Contact List - FREE SAMPLE */}
            <Link href="/sblo-directory" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-500 relative overflow-hidden">
                <Image src="/images/products/sblo-directory/main page prime.png" alt="SBLO Contact List" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE SAMPLE</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">SBLO Contact List</h3>
                <p className="text-gray-500 text-sm mb-4">Small Business Liaison Officers (SBLO) at federal agencies and prime contractors.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> 76+ Agencies Covered</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Direct Contact Info</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Email Addresses</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Instant PDF Download</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$997 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">PDF Download</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download PDF
                  </span>
                </div>
              </div>
            </Link>

            {/* December Spend - FREE PDF */}
            <Link href="/december-spend" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-red-500 to-orange-500 relative overflow-hidden">
                <Image src="/images/products/december-spend/december hit list.png" alt="December Spend" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE PDF</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">December Spend Forecast</h3>
                <p className="text-gray-500 text-sm mb-4">Capitalize on year-end government spending. Agency budgets, hot categories, and positioning strategies.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Agency Budget Forecasts</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Hot Spending Categories</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Key Deadline Calendar</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Winning Strategies</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$1,297 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">PDF Download</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download PDF
                  </span>
                </div>
              </div>
            </Link>

            {/* AI Prompts - FREE PDF */}
            <Link href="/ai-prompts" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-500 relative overflow-hidden">
                <Image src="/images/products/ai-prompts/teaming prompts.png" alt="AI Prompts" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE PDF</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">75+ AI Prompts for GovCon</h3>
                <p className="text-gray-500 text-sm mb-4">Ready-to-use AI prompts to accelerate your federal contracting business. Works with ChatGPT, Claude & more.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> 75+ Ready-to-Use Prompts</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> BD & Proposal Writing</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Marketing & Operations</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Copy-Paste Format</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$797 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">PDF Download</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download PDF
                  </span>
                </div>
              </div>
            </Link>

            {/* 2026 GovCon Action Plan - FREE */}
            <Link href="/action-plan-2026" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                <Image src="/images/products/action-plan-2026/action plan home.png" alt="2026 Action Plan" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE PDF</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">2026 GovCon Action Plan</h3>
                <p className="text-gray-500 text-sm mb-4">Your step-by-step roadmap to winning federal contracts in 2026. Month-by-month milestones.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> 12-Month Roadmap</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Key Deadline Calendar</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Weekly Task Checklists</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Goal Tracking Worksheets</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$497 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">PDF Download</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download PDF
                  </span>
                </div>
              </div>
            </Link>

            {/* GovCon Guides & Templates - FREE */}
            <Link href="/guides-templates" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
                <img src="/images/products/guides-templates/ndaa fy2026.png" alt="GovCon Guides & Templates" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE PDF</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">GovCon Guides & Templates</h3>
                <p className="text-gray-500 text-sm mb-4">Comprehensive guides and ready-to-use templates for federal contracting success.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> SAM Registration Guide</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> SBLO Email Templates</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Proposal Checklists</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> BD Pipeline Tracker</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$97 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">PDF Bundle</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download PDF
                  </span>
                </div>
              </div>
            </Link>

            {/* Tier-2 Supplier List - FREE SAMPLE */}
            <Link href="/tier2-directory" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-violet-600 relative overflow-hidden">
                <Image src="/images/products/tier2-directory/tier 2 main.png" alt="Tier-2 Supplier List" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE SAMPLE</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Tier-2 Supplier List</h3>
                <p className="text-gray-500 text-sm mb-4">Access Tier-2 supplier contacts and vendor registration portals at major prime contractors.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> 50+ Prime Contractors</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Vendor Portal Links</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Supplier Contacts</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Organized by NAICS</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$697 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">PDF Directory</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download PDF
                  </span>
                </div>
              </div>
            </Link>

            {/* Free Expiring Contracts CSV - FREE */}
            <Link href="/expiring-contracts-csv" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-cyan-500 to-cyan-700 relative overflow-hidden">
                <Image src="/images/products/expiring-contracts-csv/main page.png" alt="Expiring Contracts CSV" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Free Expiring Contracts CSV</h3>
                <p className="text-gray-500 text-sm mb-4">Sample of expiring federal contracts data. Import into Excel, Sheets, or your CRM.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Sample Contract Data</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Prime Contractor Info</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Expiration Dates</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Works with Any CRM</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$697 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">CSV Download</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download CSV
                  </span>
                </div>
              </div>
            </Link>

            {/* Tribal Contractor List - FREE */}
            <Link href="/tribal-list" className="block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-teal-600 relative overflow-hidden">
                <Image src="/images/products/tribal-list/tribal main page.png" alt="Tribal Contractor List" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">FREE</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Tribal Contractor List</h3>
                <p className="text-gray-500 text-sm mb-4">500+ Native American-owned federal contractors for teaming and subcontracting opportunities.</p>
                <ul className="text-sm mb-5 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> 500+ Tribal Contractors</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> Contact Information</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> NAICS & Certifications</li>
                  <li className="flex items-center gap-2 text-gray-700"><span className="text-emerald-500 font-bold">✓</span> CSV Download</li>
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$297 value</div>
                    <div className="text-2xl font-bold text-blue-800">FREE</div>
                    <div className="text-xs text-gray-500">CSV Download</div>
                  </div>
                  <span className="px-5 py-2 bg-blue-800 text-white rounded-md font-semibold text-sm">
                    Download CSV
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Databases Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white" id="databases">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">DATABASES</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Data at Your Fingertips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Access comprehensive databases to find teaming partners, track expiring contracts, and identify opportunities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Federal Contractor Database */}
            <Link href="/contractor-database" className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden transition-all hover:shadow-xl hover:border-indigo-500">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                <Image src="/images/products/contractor-database/main home page.png" alt="Federal Contractor Database" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">3,500+ CONTRACTORS</span>
                  <span className="text-2xl font-bold text-indigo-600">$497</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Federal Contractor Database</h3>
                <p className="text-gray-600 text-sm mb-4">Interactive searchable database with SBLO contacts, vendor portals, and AI-powered teaming partner finder.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-indigo-500 font-bold">✓</span> SBLO Contact Information
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-indigo-500 font-bold">✓</span> Teaming Partner Finder
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-indigo-500 font-bold">✓</span> Vendor Portal Links
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-indigo-500 font-bold">✓</span> Export Capabilities
                  </li>
                </ul>
                <span className="inline-flex items-center text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Database <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </Link>

            {/* Recompete Contracts Tracker */}
            <Link href="/expiring-contracts" className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden transition-all hover:shadow-xl hover:border-cyan-500">
              <div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-600 relative overflow-hidden">
                <Image src="/images/products/expiring-contracts/home page expiring contracts.png" alt="Recompete Contracts Tracker" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-semibold">$221B IN CONTRACTS</span>
                  <span className="text-2xl font-bold text-cyan-600">$397</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recompete Contracts Tracker</h3>
                <p className="text-gray-600 text-sm mb-4">Track expiring federal contracts and get ahead of the competition. Know when contracts are up for rebid.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-cyan-500 font-bold">✓</span> Contracts Expiring 12 Months
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-cyan-500 font-bold">✓</span> Prime Contractor Details
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-cyan-500 font-bold">✓</span> NAICS Code Filtering
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-cyan-500 font-bold">✓</span> Export to CSV
                  </li>
                </ul>
                <span className="inline-flex items-center text-cyan-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Tracker <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Free Database Samples CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Want to try before you buy?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sblo-directory" className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-all">
                Free SBLO Directory
              </Link>
              <Link href="/tier2-directory" className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-all">
                Free Tier-2 Directory
              </Link>
              <Link href="/expiring-contracts-csv" className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-all">
                Free Contracts CSV
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-20 px-6 bg-gray-50" id="bundles">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Bundle & Save</h2>
          <p className="text-gray-500 text-center mb-12">Get everything you need at one unbeatable price</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter Bundle */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-blue-500">
              <div className="text-center mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">STARTER</span>
                <h3 className="text-2xl font-bold text-gray-900">Starter Bundle</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900">$697</div>
                <div className="text-sm text-emerald-600 font-medium">One-Time Payment</div>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-800">
                <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Opportunity Hunter Pro ($49)</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Recompete Contracts Tracker ($397)</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Federal Contractor Database ($497)</li>
              </ul>
              <div className="text-center text-sm text-gray-500 mb-4 line-through">$943 if bought separately</div>
              <Link href="/bundles/starter" className="block w-full py-3 bg-blue-800 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-all">
                Get Starter Bundle
              </Link>
            </div>

            {/* Pro Giant Bundle - Featured */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-500 p-6 relative transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">MOST POPULAR</span>
              </div>
              <div className="text-center mb-6 pt-2">
                <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">PRO GIANT</span>
                <h3 className="text-2xl font-bold text-gray-900">Pro Giant Bundle</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900">$997</div>
                <div className="text-sm text-emerald-600 font-medium">One-Time Payment</div>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-800">
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> Federal Contractor Database ($497)</li>
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> Recompete Contracts Tracker ($397)</li>
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> Market Assassin Standard ($297)</li>
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> GovCon Content Generator ($197)</li>
              </ul>
              <div className="text-center text-sm text-gray-500 mb-4 line-through">$1,388 if bought separately</div>
              <Link href="/bundles/pro" className="block w-full py-3 bg-amber-500 text-white text-center rounded-lg font-semibold hover:bg-amber-400 transition-all">
                Get Pro Giant Bundle
              </Link>
            </div>

            {/* Ultimate Giant Bundle */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 text-white transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-center mb-6">
                <span className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold mb-3">ULTIMATE</span>
                <h3 className="text-2xl font-bold text-white">Ultimate Giant</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-amber-400">$1,497</div>
                <div className="text-sm text-emerald-400 font-medium">One-Time Payment</div>
              </div>
              <ul className="space-y-3 mb-6 text-sm opacity-90">
                <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> <strong>Premium version of everything:</strong></li>
                <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Market Assassin Premium ($497)</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Content Generator Full Fix ($397)</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Federal Contractor Database ($497)</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Recompete Contracts Tracker ($397)</li>
              </ul>
              <div className="text-center text-sm opacity-50 mb-4 line-through">$1,788 if bought separately</div>
              <Link href="/bundles/ultimate" className="block w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 text-center rounded-lg font-bold hover:from-amber-300 hover:to-amber-400 transition-all">
                Get Ultimate Giant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div>
              <h4 className="font-bold mb-4 text-white">Products</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#tools" className="text-gray-400 hover:text-white">All Tools</a></li>
                <li><a href="#databases" className="text-gray-400 hover:text-white">Databases</a></li>
                <li><a href="#bundles" className="text-gray-400 hover:text-white">Bundles</a></li>
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
                <li><a href="mailto:support@govcongiants.com" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-10 border-t border-gray-800 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} GovCon Giants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
