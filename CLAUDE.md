# GovCon Shop - Claude Project Context

## Quick Identifier
**This is the LIVE PRODUCTION shop at shop.govcongiants.org**

When user says: "live shop", "production", "shop.govcongiants", "the real site"
→ This is the project. **Handle with care - this is live!**

---

## IMPORTANT: No Framer
**This project does NOT use Framer.** Do not use any Framer MCP tools (mcp__framer-mcp__*) for this project. This is a pure Next.js/React codebase.

---

## Project Overview
**Name:** GovCon Shop (Production)
**Purpose:** Live production shop for GovCon Giants tools
**Live URL:** shop.govcongiants.org
**Framework:** Next.js 16 with Turbopack
**Database:** Supabase
**Payments:** Stripe

## Project Location
```
/Users/ericcoffie/govcon-shop
```

---

## Related Projects

| Project | Location | Purpose |
|---------|----------|---------|
| **GovCon Funnels** | `/Users/ericcoffie/govcon-funnels` | Marketing site (govcongiants.org) |
| **Market Assassin** | `/Users/ericcoffie/Market Assasin/market-assassin` | Dev/staging environment |
| **GovCon Shop** | This project | **LIVE production shop** |

---

## Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth + Email-based access (no license keys required)
- **Payments:** Stripe (webhooks + payment links)
- **Email:** SMTP (hello@govconedu.com)
- **Access Gating:** Vercel KV (fast) + Supabase user_profiles (source of truth)

---

## Products & Pricing

### Premium Tools
| Product | Price |
|---------|-------|
| Market Assassin Standard | $297 |
| Market Assassin Premium | $497 |
| Content Generator | $197 |
| Content Generator Full Fix | $397 |
| Contractor Database | $497 |
| Recompete Tracker | $397 |
| Opportunity Hunter Pro | $49 |

### Bundles
| Bundle | Price | Savings |
|--------|-------|---------|
| Starter | $697 | $246 |
| Pro Giant | $997 | $391 |
| Ultimate | $1,497 | $291 |

---

## Key Pages

### Tools (Premium)
| Route | Tool |
|-------|------|
| `/market-assassin` | Federal Market Assassin |
| `/content-generator` | GovCon Content Generator |
| `/contractor-database` | Federal Contractor Database |
| `/expiring-contracts` | Recompete Contracts Tracker |
| `/opportunity-hunter` | Opportunity Hunter |
| `/planner` | Action Planner Dashboard |

### Free Resources
| Route | Resource |
|-------|----------|
| `/free-resources` | All free resources hub |
| `/sblo-directory` | SBLO Contact List PDF |
| `/december-spend` | December Spend Forecast |
| `/ai-prompts` | 75+ AI Prompts PDF |
| `/action-plan-2026` | 2026 Action Plan |
| `/guides-templates` | Guides & Templates |
| `/tribal-list` | Tribal Contractor List |
| `/expiring-contracts-csv` | Free Contracts CSV |

### Other Pages
| Route | Purpose |
|-------|---------|
| `/` | Homepage (product showcase) |
| `/store` | Shop page |
| `/bundles/starter` | Starter bundle landing |
| `/bundles/pro` | Pro Giant bundle landing |
| `/bundles/ultimate` | Ultimate bundle landing |
| `/activate` | License activation |
| `/admin` | Admin panel |

---

## Key Files

| File | Purpose |
|------|---------|
| `/src/lib/products.ts` | Stripe product IDs, bundle config, helper functions |
| `/src/lib/access-codes.ts` | Vercel KV access granting functions |
| `/src/lib/supabase/user-profiles.ts` | User profiles + boolean access flags |
| `/src/lib/send-email.ts` | All email templates (5 total) |
| `/src/app/api/stripe-webhook/route.ts` | Payment webhook (triple-write) |
| `/src/app/api/activate-license/route.ts` | Email-based tool lookup (KV fallback when no Supabase profile) |
| `/src/app/api/verify-access/route.ts` | Access verification for tools |
| `/src/app/page.tsx` | Homepage |

---

## Access Control System (Dual)

### 1. Vercel KV — Fast tool gating (`access-codes.ts`)
| Key Pattern | Tool |
|-------------|------|
| `ma:{email}` | Market Assassin |
| `ospro:{email}` | Opportunity Hunter Pro |
| `contentgen:{email}` | Content Generator |
| `dbaccess:{email}` | Contractor Database |
| `recompete:{email}` | Recompete Tracker |

### 2. Supabase `user_profiles` — Source of truth
| Flag | Products That Grant It |
|------|------------------------|
| `access_hunter_pro` | Opp Hunter Pro, Starter, Ultimate |
| `access_content_standard` | Content Generator, Pro, Ultimate |
| `access_content_full_fix` | Content Full Fix, Ultimate |
| `access_assassin_standard` | MA Standard, Pro, Ultimate |
| `access_assassin_premium` | MA Premium, Ultimate |
| `access_recompete` | Recompete, Starter, Pro, Ultimate |
| `access_contractor_db` | Contractor DB, Starter, Pro, Ultimate |

### Stripe Metadata on Payment Links
- Individual products: `tier` key (e.g., `assassin_premium`, `contractor_db`, `recompete`)
- Bundles: `bundle` key (e.g., `starter`, `pro`, `ultimate`)
- Upgrades: `tier` key (e.g., `assassin_premium_upgrade`, `content_full_fix_upgrade`)

### Stripe Product IDs
| Product | Stripe Product ID |
|---------|-------------------|
| Contractor Database | `prod_Tj551jheCp9wdQ` |
| Opportunity Hunter Pro | `prod_TlVBTsPCtgmKuY` |
| MA Standard | `prod_TlWsJM5a0JEvs7` |
| MA Premium | `prod_TiOjPpnyLnO3eb` |
| Ultimate Bundle | `prod_TrU0CviMWdDTnj` |

### Purchase Flow
1. Customer clicks Buy → Stripe Checkout (with `tier`/`bundle` metadata)
2. Stripe webhook → `/api/stripe-webhook`
3. Webhook does triple-write:
   - Records in Supabase `purchases` table
   - Updates `user_profiles` access flags via metadata
   - Grants Vercel KV access for fast tool gating
4. Sends confirmation email (dedicated for DB/OppHunter/Ultimate, universal for all others)
5. Customer goes to `/activate`, enters email → sees unlocked tools

### Email Templates (5 total)
| Function | Used For |
|----------|----------|
| `sendPurchaseConfirmationEmail` | Universal — MA, Content Gen, Recompete, Starter/Pro bundles, upgrades |
| `sendDatabaseAccessEmail` | Contractor Database (includes access link) |
| `sendOpportunityHunterProEmail` | Opportunity Hunter Pro |
| `sendUltimateBundleEmail` | Ultimate Bundle |
| (inline in access-codes) | Database token emails |

---

## Development

### Run Dev Server
```bash
cd /Users/ericcoffie/govcon-shop
npm run dev
```

### Build for Production
```bash
npm run build
```

**Note:** No Node.js on dev machine — can't run `npm run build` locally. Vercel handles builds on push.

---

## Production Warnings

1. **This is LIVE** - Changes affect real customers
2. **Test in Market Assassin first** - Use dev environment for testing
3. **Don't break webhooks** - Stripe payments depend on them
4. **Backup before major changes** - Database has real customer data
5. **LemonSqueezy is GONE** - Fully removed Feb 6, 2026. All payments through Stripe only
6. **Contact email** - `service@govcongiants.com` (watch for missing 's' typo: `govcongiant.com`)
7. **Different Supabase databases** - govcon-shop and market-assassin have SEPARATE Supabase instances. They do NOT share `user_profiles` or `purchases` tables
8. **KV store now connected to BOTH projects** - Vercel KV `market-assassin-codes` is connected to both market-assassin and govcon-shop via Vercel Storage integration
9. **Admin password (market-assassin)** - Set as `ADMIN_PASSWORD` env var on Vercel, not a code default
10. **`user_profiles` table has FK to `auth.users`** - Can't insert profiles without Supabase Auth accounts. Only ~16 profiles exist (test/internal). Most customers have NO profile row — access works via KV fallback in activate-license.
11. **KV is the primary access system** - Vercel KV keys are what actually gates tools AND what the activate page reads. Supabase `user_profiles` flags are secondary and mostly empty for real customers.

---

## Stripe Payment Links (Source of Truth)

**IMPORTANT:** The canonical Stripe payment link URLs live in **Market Assassin** (`/Users/ericcoffie/Projects/market-assassin/src/lib/products.ts`). When updating Stripe links, update market-assassin first, then sync to this project.

| Product | Stripe Link ID (suffix) |
|---------|------------------------|
| Content Engine $197 | `dRmcN64Au6Z4axn84UfnO0m` |
| Content Full Fix $397 | `aFa9AU4Au1EKaxn5WMfnO0n` |
| Contractor Database $497 | `4gMaEY3wqcjo6h70CsfnO0g` |
| Recompete Tracker $397 | `7sYfZi9UOdnsaxnbh6fnO0k` |
| Market Assassin Standard $297 | `3cI3cw9UOdns34V84UfnO0j` |
| Market Assassin Premium $497 | `5kQdRaeb497cfRHdpefnO0f` |
| Opportunity Hunter Pro $49 | `00wcN60ke97c5d384UfnO0i` |
| Starter Bundle $697 | `6oU9AUeb46Z46h70CsfnO0s` |
| Pro Bundle $997 | `dRm7sMaYS0AG0WN5WMfnO0q` |
| Ultimate Bundle $1,497 | `6oU3cwff897ceND84UfnO0t` |

---

## Recent Work History

### February 8, 2026 (Session 5)
- **Fixed fix-access-flags `continue` bug** — Supabase FK errors were skipping KV updates; only 2/33 customers got fixed. Removed Supabase insert (impossible due to FK), made KV granting unconditional
- **Fixed Content Generator tier for Ultimate Bundle** — was "Content Engine", now "Full Fix" in KV for all 16 Ultimate Bundle customers
- **Fixed Market Assassin tier for Ultimate Bundle** — confirmed all 16 show "Premium" in KV
- **All 33 customers KV-verified** — fix-access-flags ran successfully: 33/33 kv_fixed, 0 errors
- **Confirmed MA Standard entries are correct** — Standard tier users on admin panel are $99/month students, not Ultimate Bundle customers

### February 6, 2026 (Session 4)
- **Cleaned up Supabase `purchases` table** — deleted 39 non-tool records (coaching, consulting, masterminds), kept 35 tool purchases
- **Fixed 4 legacy Stripe product IDs** — `prod_Tj4VbFiOz1VzyL` → `contractor-database`, `prod_TmMbpcfofGpDZd` → `recompete-contracts`
- **Created `/api/admin/cleanup-purchases`** — removes non-tool purchase records from Supabase
- **Created `/api/admin/verify-access`** — checks every customer against both KV and Supabase, reports gaps
- **Created `/api/admin/fix-access-flags`** — sets Supabase flags + fills KV gaps based on purchases table
- **Discovered `user_profiles` table has `user_id` FK to `auth.users`** — can't create profiles without Supabase Auth accounts. Only 16 profiles exist (test/internal users). Most customers don't have profiles.
- **Rewrote `/api/activate-license`** — now checks Vercel KV as fallback when no Supabase profile exists. All 33 customers can see their tools on the activate page.
- **Fixed Ultimate Bundle email** — Content Generator label updated to "Full Fix" version
- **Revenue: $18,574** across 33 tool sales (16 Ultimate @ $1,000 promo, 14 Opp Hunter Pro @ $49, 3 Contractor DB @ $497)

### February 6, 2026 (Session 3)
- **Backfilled all 74 past Stripe purchases** into Supabase `purchases` table
- **Created `/api/admin/backfill-access`** — pulls Stripe checkout sessions, replays webhook logic
- **Discovered govcon-shop and market-assassin use DIFFERENT Supabase databases** — KV backfill must run from market-assassin
- **KV backfill ran from market-assassin** (`/api/admin/backfill-kv`) — 22 customers with metadata auto-granted, 10 pre-metadata Opp Hunter Pro customers manually granted
- **Added KV env vars to govcon-shop Vercel** — but KV still requires Vercel Storage integration (not just env vars)
- **Cleaned up old LemonSqueezy env vars still in Vercel** (noted for removal)

### February 6, 2026 (Session 2)
- **Removed all LemonSqueezy code** — deleted `lemonsqueezy.ts`, both webhook routes
- **Created `/src/lib/products.ts`** — Stripe product IDs, bundle config, reverse lookup map
- **Created `/src/lib/supabase/user-profiles.ts`** — ported from market-assassin, manages access flags
- **Rewrote Stripe webhook** — triple-write: Supabase purchases + user_profiles flags + Vercel KV
- **Rewrote activate-license** — now reads `user_profiles` access flags, email-only (no license key input)
- **Rewrote verify-access** — replaced broken LemonSqueezy import with new products.ts
- **Added universal purchase confirmation email** — covers 9/12 products that had no email
- **Updated activate page** — removed license key field, email-only flow
- **Updated success page** — removed license key references
- **Verified all 12 Stripe payment link metadata** — all `tier`/`bundle` values match code

### February 6, 2026 (Session 1)
- Fixed all Stripe checkout links — 5 old/dead payment links from LemonSqueezy era replaced with current Stripe links
- Updated 13 files: ai-content, contractor-database (x2), database-locked, expiring-contracts, opportunity-hunter, opportunity-scout, recompete, sblo-directory, tier2-directory, all-free-resources, tribal HTML, next.config.ts
- LemonSqueezy fully canceled — all payments now through Stripe directly

---

*Last Updated: February 8, 2026 (Session 5)*
