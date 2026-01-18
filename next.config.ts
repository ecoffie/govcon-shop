import type { NextConfig } from "next";

/**
 * PROXY CONFIGURATION GUIDE
 * ========================
 * When adding new proxied apps/pages, ensure you add rewrites for:
 * 1. The main page(s) - e.g., /library, /calendar
 * 2. Static assets - e.g., /js/*, /css/*, /images/*
 * 3. API routes used by those pages
 *
 * Current proxied apps:
 * - GovCon Content Generator (govcon-content-generator.vercel.app)
 *   - Pages: /content-generator/*, /library, /calendar
 *   - Assets: /js/*
 *   - APIs: handled via /content-generator/api/*
 */

const nextConfig: NextConfig = {
  // Skip type checking during builds (we run tsc separately)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Experimental features for React 19 compatibility
  experimental: {
    // Use React Compiler if available
  },
  // Redirects for legacy URLs and checkout shortcuts
  async redirects() {
    return [
      // Legacy URL redirects
      {
        source: '/opportunity-scout.html',
        destination: '/opportunity-hunter',
        permanent: true,
      },
      {
        source: '/opportunity-scout',
        destination: '/opportunity-hunter',
        permanent: true,
      },
      // Checkout shortcut redirects
      {
        source: '/buy/opportunity-hunter',
        destination: 'https://buy.govcongiants.org/checkout/buy/1ba3745a-da20-4635-9601-a258a4a3171a',
        permanent: false,
      },
      {
        source: '/buy/database',
        destination: 'https://buy.govcongiants.org/checkout/buy/0beda92c-6328-40c3-9d4b-8c246f8d0a34',
        permanent: false,
      },
      {
        source: '/buy/ai-content',
        destination: 'https://buy.govcongiants.org/checkout/buy/11d36efa-5d16-4ebe-92ca-179c79cb5990',
        permanent: false,
      },
      {
        source: '/buy/recompete',
        destination: 'https://buy.govcongiants.org/checkout/buy/00757b65-ead6-457b-a27b-4b3f81b63d7d',
        permanent: false,
      },
      {
        source: '/buy/market-assassin',
        destination: 'https://buy.govcongiants.org/checkout/buy/1dcb791b-e1a1-4500-a4c2-bd255e8124e6',
        permanent: false,
      },
      {
        source: '/buy/starter-bundle',
        destination: 'https://buy.govcongiants.org/checkout/buy/9a5bd252-b7a5-4bc5-be50-1d3305dd9069',
        permanent: false,
      },
      {
        source: '/buy/ultimate-bundle',
        destination: 'https://buy.govcongiants.org/checkout/buy/9a5bd252-b7a5-4bc5-be50-1d3305dd9069',
        permanent: false,
      },
      {
        source: '/buy/complete-bundle',
        destination: 'https://buy.govcongiants.org/checkout/buy/67349828-9e8a-4e1a-bf6f-09b267c4c97e',
        permanent: false,
      },
    ];
  },
  // Rewrites to proxy content-generator to separate app
  async rewrites() {
    return [
      // Handle /content-generator without trailing slash
      {
        source: '/content-generator',
        destination: 'https://govcon-content-generator.vercel.app/',
      },
      {
        source: '/content-generator/',
        destination: 'https://govcon-content-generator.vercel.app/',
      },
      {
        source: '/content-generator/:path*',
        destination: 'https://govcon-content-generator.vercel.app/:path*',
      },
      // Direct access to calendar and library pages
      {
        source: '/calendar',
        destination: 'https://govcon-content-generator.vercel.app/calendar.html',
      },
      {
        source: '/library',
        destination: 'https://govcon-content-generator.vercel.app/library.html',
      },
      {
        source: '/library.html',
        destination: 'https://govcon-content-generator.vercel.app/library.html',
      },
      // Proxy JS files for content generator pages
      {
        source: '/js/:path*',
        destination: 'https://govcon-content-generator.vercel.app/js/:path*',
      },
      // Proxy API routes for calendar and library pages (using _proxy prefix to avoid Next.js API conflicts)
      {
        source: '/_proxy/calendar-events',
        destination: 'https://govcon-content-generator.vercel.app/api/calendar-events',
      },
      {
        source: '/_proxy/upload-carousel',
        destination: 'https://govcon-content-generator.vercel.app/api/upload-carousel',
      },
    ];
  },
};

export default nextConfig;
