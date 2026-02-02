# GovCon Shop - Claude Project Context

## Project Overview
**Name:** GovCon Shop
**URL:** https://shop.govcongiants.org
**Repository:** https://github.com/ecoffie/govcon-shop
**Framework:** Next.js 16.1.1 with Turbopack
**Deployment:** Vercel (auto-deploys from main branch)
**Database:** Supabase
**Payments:** Stripe

## Project Location
```
/Users/ericcoffie/govcon-shop
```

**Note:** There is also a separate project at `/Users/ericcoffie/Market Assasin/market-assassin` - this is NOT the live shop. Always work in `/Users/ericcoffie/govcon-shop` for shop.govcongiants.org changes.

## Tech Stack
- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth + Custom license/access tokens
- **Payments:** Stripe (payment links + webhooks)
- **Email:** Resend
- **Hosting:** Vercel

## Key Directories
```
src/
├── app/                    # Next.js App Router pages
│   ├── bundles/           # Bundle landing pages (starter, pro, ultimate)
│   ├── api/               # API routes
│   ├── market-assassin/   # Market Assassin tool
│   ├── contractor-database/ # Contractor database tool
│   ├── expiring-contracts/ # Recompete contracts tracker
│   ├── opportunity-hunter/ # Free opportunity finder
│   ├── ai-content/        # Content generator tool
│   └── ...
├── components/            # Reusable React components
│   └── BundleProductPage.tsx  # Bundle landing page template
└── lib/                   # Utilities, Supabase client, etc.
    ├── send-email.ts      # Email templates and sending
    └── supabase/          # Supabase client and schemas
```

## Products & Pricing

### Individual Products
| Product | Price | Stripe Product |
|---------|-------|----------------|
| Opportunity Hunter Pro | $49 | One-time |
| AI Content Generator | $197 | One-time |
| Market Assassin Standard | $297 | One-time |
| Recompete Contracts Tracker | $397 | One-time |
| Federal Contractor Database | $497 | One-time |
| Market Assassin Premium | $497 | One-time |
| Content Generator Full Fix | $397 | One-time |

### Bundles
| Bundle | Price | Original Value | Savings | Products Included |
|--------|-------|----------------|---------|-------------------|
| Starter Bundle | $697 | $943 | $246 | Opportunity Hunter Pro, Recompete Tracker, Contractor Database |
| Pro Giant Bundle | $997 | $1,388 | $391 | Contractor Database, Recompete Tracker, Market Assassin Standard, Content Generator |
| Ultimate Giant | $1,497 | $1,788 | $291 | Market Assassin Premium, Content Generator Full Fix, Contractor Database, Recompete Tracker |

### Stripe Payment Links
- Starter Bundle: `https://buy.stripe.com/6oU9AUeb46Z46h70CsfnO0s`
- Pro Giant Bundle: `https://buy.stripe.com/dRm7sMaYS0AG0WN5WMfnO0q`
- Ultimate Giant: `https://buy.stripe.com/aFacN6d700AGfRHfxmfnO0r`

## Bundle Landing Pages
Created: February 2, 2026

Each bundle has a dedicated landing page at `/bundles/{slug}`:
- `/bundles/starter` - GovCon Starter Bundle
- `/bundles/pro` - Pro Giant Bundle
- `/bundles/ultimate` - Ultimate Giant Bundle

Features:
- Hero with pricing and included products preview
- Trust badges (Lifetime Access, 30-Day Refund, Secure Checkout, Instant Access)
- "Perfect For You If..." section
- Detailed product breakdowns with features
- Savings calculator
- Customer reviews
- CTA to Stripe checkout

Component: `src/components/BundleProductPage.tsx`

## Access Control System
- Products are gated by access tokens stored in Supabase
- Stripe webhook grants access on successful purchase
- License activation page at `/activate`
- Admin panel at `/admin` for manual access grants

## Important Files
- `src/app/page.tsx` - Homepage with bundle section
- `src/app/store/page.tsx` - Store page (alternative layout)
- `src/lib/send-email.ts` - All email templates
- `src/app/api/stripe-webhook/route.ts` - Handles purchases
- `src/middleware.ts` - Route protection (deprecated, moving to proxy)

## Deployment Commands
```bash
# Deploy to production
cd /Users/ericcoffie/govcon-shop
vercel --prod

# Or push to main for auto-deploy
git add -A && git commit -m "message" && git push origin main
```

## Common Tasks

### Adding a new product page
1. Create page in `src/app/{product-name}/page.tsx`
2. Add Stripe payment link
3. Update webhook to grant access
4. Add email template in `send-email.ts`

### Updating bundle content
Edit files in `src/app/bundles/{starter|pro|ultimate}/page.tsx`

### Checking deployment status
```bash
cd /Users/ericcoffie/govcon-shop && vercel ls
```

## Recent Changes Log

### February 2, 2026
- Added bundle landing pages (`/bundles/starter`, `/bundles/pro`, `/bundles/ultimate`)
- Created `BundleProductPage.tsx` reusable component
- Updated homepage bundle buttons to link to landing pages instead of direct Stripe checkout
- Removed community access bonuses (not included in bundles)

---

## Notes for Claude
- Always work in `/Users/ericcoffie/govcon-shop` for this project
- Run `vercel --prod` after pushing for faster deploys (don't wait for GitHub webhook)
- The homepage is `src/app/page.tsx`, NOT `src/app/store/page.tsx`
- Stripe webhooks handle access grants automatically
- Test builds locally with `npm run build` before pushing
