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
- **Auth:** Supabase Auth + License keys
- **Payments:** Stripe (webhooks + payment links)
- **Email:** SMTP (hello@govconedu.com)

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
| `/src/lib/products.ts` | Product config & Stripe URLs |
| `/src/app/api/stripe-webhook/route.ts` | Payment webhook |
| `/src/lib/supabase/user-profiles.ts` | User & access management |
| `/src/lib/send-email.ts` | Email templates |
| `/src/app/page.tsx` | Homepage |

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

---

## Production Warnings

1. **This is LIVE** - Changes affect real customers
2. **Test in Market Assassin first** - Use dev environment for testing
3. **Don't break webhooks** - Stripe payments depend on them
4. **Backup before major changes** - Database has real customer data

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

### February 6, 2026
- Fixed all Stripe checkout links — 5 old/dead payment links from LemonSqueezy era replaced with current Stripe links
- Updated 13 files: ai-content, contractor-database (x2), database-locked, expiring-contracts, opportunity-hunter, opportunity-scout, recompete, sblo-directory, tier2-directory, all-free-resources, tribal HTML, next.config.ts
- LemonSqueezy fully canceled — all payments now through Stripe directly

---

*Last Updated: February 6, 2026*
