'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FreeDownloadPageProps {
  resourceId: string;
  title: string;
  description: string;
  icon: string;
  value: string;
}

export default function FreeDownloadPage({
  resourceId,
  title,
  description,
  icon,
  value,
}: FreeDownloadPageProps) {
  const [email, setEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [verified, setVerified] = useState<boolean | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for verified email in localStorage
    const storedEmail = localStorage.getItem('govcon_verified_email');
    if (storedEmail) {
      setEmail(storedEmail);
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, []);

  const handleDownload = async () => {
    if (!email) return;

    setDownloading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/download-resource?resource=${resourceId}&email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Download failed');
      }

      const contentType = response.headers.get('content-type') || '';
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      if (contentType.includes('pdf')) {
        a.download = `${resourceId}.pdf`;
      } else if (contentType.includes('csv')) {
        a.download = `${resourceId}.csv`;
      } else if (contentType.includes('html')) {
        window.open(url, '_blank');
        setDownloading(false);
        return;
      } else {
        a.download = resourceId;
      }

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setError('');

    try {
      // Check if email is already verified
      const response = await fetch(`/api/check-verification?email=${encodeURIComponent(inputEmail)}`);
      const data = await response.json();

      if (data.verified) {
        localStorage.setItem('govcon_verified_email', inputEmail);
        setEmail(inputEmail);
        setVerified(true);
      } else {
        // Request verification
        const verifyResponse = await fetch('/api/request-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: inputEmail, source: resourceId }),
        });
        const verifyData = await verifyResponse.json();

        if (verifyData.success && verifyData.alreadyVerified) {
          localStorage.setItem('govcon_verified_email', inputEmail);
          setEmail(inputEmail);
          setVerified(true);
        } else if (verifyData.success) {
          setError('Check your email for a verification link, then come back to download.');
        } else {
          setError(verifyData.error || 'Verification failed');
        }
      }
    } catch {
      setError('Failed to verify email. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  // Loading state
  if (verified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Simple Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-700">GovCon</span>
            <span className="text-xl font-bold text-amber-500">Giants</span>
          </Link>
          <Link
            href="/all-free-resources"
            className="text-sm text-gray-600 hover:text-emerald-600"
          >
            ← All Free Resources
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <span className="text-6xl mb-4 inline-block">{icon}</span>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>

          {/* Value Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-8">
            <span className="text-sm line-through text-gray-400">{value}</span>
            <span className="font-bold">FREE</span>
          </div>

          {verified ? (
            /* Verified - Show Download Button */
            <div>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? 'Downloading...' : 'Download Now'}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Verified: {email}
              </p>
            </div>
          ) : (
            /* Not Verified - Show Email Form */
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Enter your email to download:
              </p>
              <form onSubmit={handleVerifyEmail} className="space-y-3">
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                >
                  {verifying ? 'Verifying...' : 'Get Download'}
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-4">
                Already verified?{' '}
                <Link href="/all-free-resources" className="text-emerald-600 hover:underline">
                  Access all resources
                </Link>
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            href="/all-free-resources"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← View All 8 Free Resources
          </Link>
        </div>
      </main>
    </div>
  );
}
