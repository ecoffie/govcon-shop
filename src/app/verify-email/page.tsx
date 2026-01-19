'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('No verification token provided');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/verify-email-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setEmail(data.email);
          // Store email in localStorage for easy access
          localStorage.setItem('govcon_verified_email', data.email);
          // Redirect to resources after 3 seconds
          setTimeout(() => {
            router.push('/all-free-resources');
          }, 3000);
        } else {
          setStatus('error');
          setError(data.error || 'Verification failed');
        }
      } catch {
        setStatus('error');
        setError('Failed to verify email. Please try again.');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-emerald-800 p-5">
      <div className="bg-white rounded-2xl p-10 max-w-lg text-center shadow-2xl">
        {status === 'verifying' && (
          <>
            <div className="text-6xl mb-5 animate-pulse">
              <span className="inline-block animate-spin">
                <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
            </div>
            <h1 className="text-green-800 mb-3 text-3xl font-bold">
              Verifying Your Email...
            </h1>
            <p className="text-gray-600 text-base">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-6xl mb-5">
              <span className="inline-block animate-bounce text-green-500">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <h1 className="text-green-800 mb-3 text-3xl font-bold">
              Email Verified!
            </h1>
            <p className="text-gray-600 text-base mb-4">
              {email && <span className="font-semibold">{email}</span>}
              {email && <br />}
              Your email has been verified successfully.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 text-left">
              <h3 className="text-green-800 mt-0 mb-3 font-semibold">You now have access to:</h3>
              <ul className="text-green-700 m-0 pl-5 leading-loose text-sm">
                <li>SBLO Contact List (225+ contacts)</li>
                <li>Tier-2 Supplier Directory</li>
                <li>75+ AI Prompts for GovCon</li>
                <li>2026 Action Plan</li>
                <li>December Spend Forecast</li>
                <li>GovCon Guides & Templates</li>
                <li>And more!</li>
              </ul>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Redirecting to your free resources in 3 seconds...
            </p>
            <Link
              href="/all-free-resources"
              className="inline-block bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg transition-colors"
            >
              Access Free Resources Now
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-6xl mb-5 text-red-500">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-red-800 mb-3 text-3xl font-bold">
              Verification Failed
            </h1>
            <p className="text-gray-600 text-base mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <Link
                href="/free-resources"
                className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
              >
                Request New Verification
              </Link>
              <p className="text-gray-400 text-xs mt-4">
                <Link href="/" className="text-blue-600 hover:underline">
                  Back to Home
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-emerald-800 p-5">
      <div className="bg-white rounded-2xl p-10 max-w-lg text-center shadow-2xl">
        <div className="text-6xl mb-5 animate-pulse">
          <span className="inline-block animate-spin">
            <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </span>
        </div>
        <h1 className="text-green-800 mb-3 text-3xl font-bold">
          Loading...
        </h1>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
