// Product Configuration - Stripe-based (replaces LemonSqueezy)
// Source of truth: market-assassin/src/lib/products.ts

// Stripe Product IDs (from Stripe Dashboard)
export const STRIPE_PRODUCT_IDS: Record<string, string> = {
  'contractor-database': 'prod_Tj551jheCp9wdQ',
  'opportunity-hunter-pro': 'prod_TlVBTsPCtgmKuY',
  'market-assassin-standard': 'prod_TlWsJM5a0JEvs7',
  'market-assassin-premium': 'prod_TiOjPpnyLnO3eb',
  'ultimate-govcon-bundle': 'prod_TrU0CviMWdDTnj',
};

// Reverse lookup: Stripe product ID → our product ID
export const STRIPE_TO_PRODUCT_ID: Record<string, string> = Object.fromEntries(
  Object.entries(STRIPE_PRODUCT_IDS).map(([k, v]) => [v, k])
);

export const PRODUCTS = {
  AI_CONTENT_GENERATOR: {
    id: 'ai-content-generator',
    name: 'Content Reaper',
    price: 197,
  },
  CONTRACTOR_DATABASE: {
    id: 'contractor-database',
    name: 'Federal Contractor Database',
    price: 497,
  },
  RECOMPETE_CONTRACTS: {
    id: 'recompete-contracts',
    name: 'Recompete Contracts Tracker',
    price: 397,
  },
  MARKET_ASSASSIN_STANDARD: {
    id: 'market-assassin-standard',
    name: 'Federal Market Assassin (Standard)',
    price: 297,
  },
  MARKET_ASSASSIN_PREMIUM: {
    id: 'market-assassin-premium',
    name: 'Federal Market Assassin (Premium)',
    price: 497,
  },
  OPPORTUNITY_HUNTER_PRO: {
    id: 'opportunity-hunter-pro',
    name: 'Opportunity Hunter Pro',
    price: 49,
  },
  GOVCON_STARTER_BUNDLE: {
    id: 'govcon-starter-bundle',
    name: 'GovCon Starter Bundle',
    price: 697,
    includes: ['opportunity-hunter-pro', 'recompete-contracts', 'contractor-database'],
  },
  PRO_GIANT_BUNDLE: {
    id: 'pro-giant-bundle',
    name: 'Pro Giant Bundle',
    price: 997,
    includes: ['contractor-database', 'recompete-contracts', 'market-assassin-standard', 'ai-content-generator'],
  },
  ULTIMATE_GOVCON_BUNDLE: {
    id: 'ultimate-govcon-bundle',
    name: 'Ultimate GovCon Bundle',
    price: 1497,
    includes: ['ai-content-generator', 'contractor-database', 'recompete-contracts', 'market-assassin-premium'],
  },
} as const;

// Product name lookup
export const PRODUCT_NAMES: Record<string, string> = {
  'ai-content-generator': 'Content Reaper',
  'contractor-database': 'Federal Contractor Database',
  'recompete-contracts': 'Recompete Contracts Tracker',
  'market-assassin-standard': 'Federal Market Assassin (Standard)',
  'market-assassin-premium': 'Federal Market Assassin (Premium)',
  'opportunity-hunter-pro': 'Opportunity Hunter Pro',
  'govcon-starter-bundle': 'GovCon Starter Bundle',
  'pro-giant-bundle': 'Pro Giant Bundle',
  'ultimate-govcon-bundle': 'Ultimate GovCon Bundle',
};

// Helper: get product by ID
export function getProductById(productId: string) {
  for (const [, product] of Object.entries(PRODUCTS)) {
    if (product.id === productId) {
      return product;
    }
  }
  return null;
}

// Helper: check if a product is a bundle
export function isBundle(productId: string): boolean {
  const product = getProductById(productId);
  return product !== null && 'includes' in product;
}

// Helper: get all products included in a bundle
export function getBundleIncludes(productId: string): string[] {
  const product = getProductById(productId);
  if (product && 'includes' in product) {
    return [...product.includes];
  }
  return [];
}

// Helper: get friendly product name
export function getProductName(productId: string): string {
  return PRODUCT_NAMES[productId] || productId;
}

// Helper: resolve Stripe product ID to our product ID
export function resolveStripeProductId(stripeProductId: string): string | null {
  return STRIPE_TO_PRODUCT_ID[stripeProductId] || null;
}
