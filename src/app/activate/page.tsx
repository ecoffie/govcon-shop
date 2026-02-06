"use client";

import { useState } from "react";
import Link from "next/link";

export default function ActivatePage() {
  const [licenseKey, setLicenseKey] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    products: string[];
    message: string;
  } | null>(null);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(null);

    try {
      const response = await fetch("/api/activate-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: licenseKey.trim(), email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to activate license");
        return;
      }

      setSuccess({
        products: data.products || [],
        message: data.message || "License activated successfully!",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <span>🚀</span> GovCon Giants
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {!success ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <span className="text-3xl">🔑</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Activate Your License</h1>
                <p className="text-gray-600">
                  Enter your license key and email to unlock your GovCon Giants tools.
                </p>
              </div>

              <form onSubmit={handleActivate} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use the same email from your purchase</p>
                </div>

                <div>
                  <label htmlFor="licenseKey" className="block text-sm font-semibold text-gray-700 mb-2">
                    License Key
                  </label>
                  <input
                    type="text"
                    id="licenseKey"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">Find this in your purchase confirmation email</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-800 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Activating...
                    </span>
                  ) : (
                    "Activate License"
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Need help?{" "}
                  <a href="mailto:service@govcongiants.com" className="text-blue-600 hover:underline font-medium">
                    Contact Support
                  </a>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                <span className="text-4xl">✅</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">You&apos;re All Set!</h1>
              <p className="text-gray-600 mb-8">{success.message}</p>

              {success.products.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Unlocked Tools:</h2>
                  <div className="space-y-3">
                    {success.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                      >
                        <span className="font-medium text-gray-900">{product}</span>
                        <span className="text-emerald-600 font-bold">✓ Unlocked</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  href="/dashboard"
                  className="block w-full py-4 bg-gradient-to-r from-blue-800 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all text-center"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/"
                  className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all text-center"
                >
                  Back to Store
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Where do I find my license key?</h3>
          <p className="text-gray-600 text-sm">
            Check your email for your purchase confirmation from GovCon Giants.
            Your license key is included in that email.
          </p>
        </div>
      </div>
    </div>
  );
}
