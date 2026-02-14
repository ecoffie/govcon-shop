'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const _log = (msg: string, d: object) => {
  try {
    fetch('http://127.0.0.1:7242/ingest/630e181d-fcdb-4854-b1ec-e7f23188881f', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'purchases-report/page.tsx', message: msg, data: d, timestamp: Date.now() }) }).catch(() => {});
  } catch {}
};

interface Summary {
  totalPurchases: number;
  totalRevenue: number;
  refundedCount: number;
}

interface ProductBreakdown {
  productId: string;
  productName: string;
  count: number;
  revenue: number;
}

interface Purchase {
  id: string;
  email: string;
  productId: string;
  productName: string;
  amountPaid: number;
  createdAt: string;
}

interface ReportData {
  days: number;
  since: string;
  summary: Summary;
  byProduct: ProductBreakdown[];
  purchases: Purchase[];
}

export default function PurchasesReportPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [days, setDays] = useState(14);
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      // #region agent log
      _log('Login response', { valid: json.valid, status: res.status });
      // #endregion
      if (json.valid) {
        setAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        sessionStorage.setItem('adminPassword', password);
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      setAuthError('Failed to verify');
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem('adminPassword');
    if (stored) {
      fetch('/api/admin/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: stored }),
      })
        .then((r) => r.json())
        .then((json) => {
          if (json.valid) {
            setAuthenticated(true);
            setPassword(stored);
          } else {
            sessionStorage.removeItem('adminAuth');
            sessionStorage.removeItem('adminPassword');
          }
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    const pwd = sessionStorage.getItem('adminPassword') || password;
    // #region agent log
    _log('Report fetch start', { days, hasPassword: !!pwd, pwdLen: (pwd || '').length });
    // #endregion
    setLoading(true);
    setError(null);
    fetch(`/api/admin/purchases-report?days=${days}`, {
      headers: {
        'x-admin-password': pwd,
      },
    })
      .then((r) => {
        // #region agent log
        _log('Report fetch response', { status: r.status, ok: r.ok });
        // #endregion
        if (!r.ok) {
          return r.text().then((t) => {
            throw new Error(t || `HTTP ${r.status}`);
          });
        }
        return r.json();
      })
      .then((json) => {
        // #region agent log
        _log('Report data received', { hasData: !!json, purchaseCount: json?.purchases?.length });
        // #endregion
        setData(json);
      })
      .catch((err) => {
        // #region agent log
        _log('Report fetch error', { errMsg: err?.message });
        // #endregion
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [authenticated, days, password]);

  const formatCurrency = (cents: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Access</h1>
            <p className="text-slate-500 text-sm mt-2">Enter admin password to view purchases report</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {authError && <p className="text-red-600 text-sm mb-4">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold"
            >
              Login
            </button>
          </form>
          <Link href="/admin" className="block text-center text-slate-500 text-sm mt-4 hover:text-slate-700">
            ← Back to Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-slate-600 hover:text-slate-900 text-sm mb-2 inline-block">
              ← Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Purchases & Revenue Report</h1>
            <p className="text-slate-600 mt-1">Tools sales from Supabase purchases</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              Last
              <select
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10))}
                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
              >
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
              </select>
              days
            </label>
            <button
              onClick={() => {
                sessionStorage.removeItem('adminAuth');
                sessionStorage.removeItem('adminPassword');
                setAuthenticated(false);
              }}
              className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-slate-500">Loading report...</div>
        )}

        {!loading && data && (
          <>
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
                <div className="text-3xl font-bold text-slate-900">
                  {formatCurrency(data.summary.totalRevenue)}
                </div>
                <div className="text-sm text-slate-600 mt-1">Total Revenue</div>
                <div className="text-xs text-slate-400 mt-1">
                  Last {data.days} days
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="text-3xl font-bold text-slate-900">
                  {data.summary.totalPurchases}
                </div>
                <div className="text-sm text-slate-600 mt-1">Total Purchases</div>
                <div className="text-xs text-slate-400 mt-1">
                  Completed orders
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
                <div className="text-3xl font-bold text-slate-900">
                  {data.summary.totalPurchases > 0
                    ? formatCurrency(
                        Math.round(data.summary.totalRevenue / data.summary.totalPurchases)
                      )
                    : '$0'}
                </div>
                <div className="text-sm text-slate-600 mt-1">Avg Order Value</div>
              </div>
            </div>

            {/* By Product */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <h2 className="text-xl font-bold text-slate-900 px-6 py-4 border-b border-slate-200">
                Revenue by Product
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                        Product
                      </th>
                      <th className="text-right px-6 py-3 text-sm font-semibold text-slate-700">
                        Purchases
                      </th>
                      <th className="text-right px-6 py-3 text-sm font-semibold text-slate-700">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.byProduct.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                          No purchases in this period
                        </td>
                      </tr>
                    ) : (
                      data.byProduct.map((row) => (
                        <tr key={row.productId} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-slate-900 font-medium">
                            {row.productName}
                          </td>
                          <td className="px-6 py-4 text-right text-slate-700">
                            {row.count}
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-emerald-600">
                            {formatCurrency(row.revenue)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Purchases */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <h2 className="text-xl font-bold text-slate-900 px-6 py-4 border-b border-slate-200">
                Individual Purchases ({data.purchases.length})
              </h2>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                        Date
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                        Email
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                        Product
                      </th>
                      <th className="text-right px-6 py-3 text-sm font-semibold text-slate-700">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.purchases.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-6 py-3 text-sm text-slate-600 whitespace-nowrap">
                          {formatDate(p.createdAt)}
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-900">
                          {p.email}
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-700">
                          {p.productName}
                        </td>
                        <td className="px-6 py-3 text-sm text-right font-medium text-emerald-600">
                          {formatCurrency(p.amountPaid)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
