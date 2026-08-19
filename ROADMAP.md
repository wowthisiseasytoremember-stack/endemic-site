# Endemic Site — Forward Roadmap & Built-vs-Planned Map

**Last Updated:** 2026-08-19
**Status:** active — audit complete, pre-build
**Author:** GCU No Trouble At All
**Project root:** `/home/ichabod/Projects/endemic-site`
**Domain (assumed, UNCONFIRMED):** `endemic.app`

## 0. How to read this

This is the **canonical forward plan** for the endemic-site repo. If you just landed here, read §1 (what actually exists today) then §4 (what to build next). The other planning docs (`MONETIZATION_AND_ACQUISITION_PLAN.md`, `PROJECT_AUDIT.md`, `AUDIT_FIX_PLAN.md`) are reference; this file is the sequence. Everything below was verified by source-static audit on 2026-08-19 unless cited otherwise.

## 1. Verified current state (2026-08-19)

- **Stack:** Next.js 16.2.6 / React 19 / TypeScript / Tailwind 4 / Framer Motion / Drizzle + PostgreSQL / MDX + Sanity.
- **Live page routes (7):** `/` (`page.tsx`), `/aquatrack`, `/floratrack`, `/discoverers`, `/gear`, `/read` + `/read/[slug]`, `/watch`. Plus API routes `/api/health`, `/api/subscribe`.
- **SEO surface:** Global `metadata` (title/description/keywords/openGraph) + one `WebSite` JSON-LD block ship in `src/app/layout.tsx` (lines 21–58). **Zero per-route `metadata`, zero `canonical`, zero per-route OG image, zero per-route JSON-LD** on any of the 7 routes.
- **Missing infra:** no `sitemap.xml`, no `robots.txt`, no `llms.txt` anywhere in the repo.
- **Blog:** 6 articles in `content/blog/*.md` (a-puffer, b-bleeker, c-etymology, d-schott, e-pink-princess, f-rio-negro) + `public/blog-index.json`; rendered by `read/page-client.tsx`. No per-post `Article`/`FAQPage` JSON-LD.
- **Monetization:** NONE deployed. No affiliate links, no `rel=sponsored`, no UTM params, no `/gear` affiliate content, no print store, no paywall. (Correct per blueprint — Phase 4 affiliate is intentionally off the dossiers.)
- **Deploy:** No live server running at audit time; no Vercel config in repo. All SEO findings are "what the code says," not "what's deployed."

## 2. Intended state (from `docs/MONETIZATION_AND_ACQUISITION_PLAN.md` v2.1, MMR-hardened)

The strategy is **free public utility → citation moat → phased monetization**. GEO (being cited by AI answer engines) is the explicit core thesis, not an afterthought.

- **TOFU (free & open):** 10,000 programmatic `/plants/[slug]` SEO dossiers (trade-name → accepted binomial via Kew POWO / GBIF, ISR); interactive 3D biome globe (`atlas.html`); exploded anatomy viewer (`diagram-lab.html`); YouTube botanical-lore Shorts.
- **Trust moat:** publish the trade-name → binomial crosswalk as a CC-BY open dataset (GitHub/Hugging Face) so LLMs cite endemic.app as the primary authority.
- **Phased revenue:** Phase 2 video (AdSense + sponsorships) → Phase 3 exploded art prints via Gelato POD → Phase 4 non-injected affiliate gear at `/gear/` (5–12% commission, kept off dossiers) → Phase 5 gated iOS/B2B SaaS at 50k MAU.

## 3. Built vs Planned reconciliation

| Blueprint element | Planned phase | Built? | Notes |
|---|---|---|---|
| 7 marketing routes (home/aquatrack/floratrack/discoverers/gear/read/watch) | Phase 1 TOFU | **PARTIAL** | Present, but no per-route SEO (see §4 Phase 0) |
| `/plants/[slug]` dossiers (10k, ISR) | Phase 1 | **NOT BUILT** | Core GEO citation engine — biggest single gap |
| 3D biome globe (`atlas.html`) | TOFU | **NOT BUILT** | |
| Exploded anatomy viewer (`diagram-lab.html`) | TOFU | **NOT BUILT** | |
| Trade → binomial crosswalk (POWO/GBIF) | Phase 1 | **NOT BUILT** | Prerequisite for dossiers |
| Open CC-BY dataset | Trust moat | **NOT BUILT** | The authority/citation play |
| Blog (6 articles + index) | Content | **BUILT (partial)** | No JSON-LD/FAQ schema on posts |
| Video monetization | Phase 2 | **NOT BUILT** | Needs Content Factory wiring |
| Art prints (Gelato) | Phase 3 | **NOT BUILT** | |
| Affiliate gear `/gear/` | Phase 4 | **NOT BUILT** (by design) | Zero affiliate signals in code today |
| iOS / B2B SaaS | Phase 5 | **NOT BUILT** | Hard-gated at 50k MAU |

## 4. GEO-critical path (why this order)

The blueprint's revenue depends on **citation**. Citation depends on three things, none of which exist yet:

1. **Dossiers that exist AND carry structured data** — `/plants/[slug]` with `Article`/`BreadcrumbList`/`FAQPage` JSON-LD.
2. **`llms.txt`** telling AI crawlers what's citable.
3. **Open dataset** establishing endemic.app as the authoritative source.

The 7 live routes are necessary but not sufficient — they're TOFU only if they are *discoverable and citable*. So the sequence is: make the live routes citable first (cheap, unblocks ranking), then build the dossier engine (the actual citation asset), then open the GEO surface. Monetization phases follow the blueprint's MAU gates and are not started.

## 5. Forward execution plan (sequenced)

**Phase 0 — Make existing pages citable** (maps to SEO audit P0 + P1)
- Per-route `metadata` (title/description) + `canonical` on all 7 routes.
- `app/sitemap.ts` (all routes + dynamic `/read/[slug]`) and `app/robots.ts`.
- OG images (`og:image`), Twitter cards, `favicon`/`viewport`/`themeColor`.
- Owner: web. Effort: ~5–8h mechanical. Depends on: nothing.
- Verify: `next build` + local crawl.
- Source: `~/wiki/reports/seo-geo-audit-endemic-site-2026-08-19.md` (P0/P1 tables, per-route failure matrix).

**Phase 0.5 — Stand up `/plants/[slug]` dossier program** (THE GEO engine)
- ISR dossiers generated from the POWO/GBIF trade→binomial crosswalk.
- Per-dossier JSON-LD: `Article` + `BreadcrumbList` + `FAQPage`.
- Owner: web + data. Effort: large (data pipeline + templating + schema).
- Highest-leverage GEO work in the entire plan.

**Phase 1 — GEO surface**
- `llms.txt` at repo root: site summary, key pages, content policy (draft in SEO audit report, <500 words, aquarium/plant-specific).
- Publish open CC-BY trade→binomial dataset (GitHub/HF).
- Per-post `FAQPage` JSON-LD on the blog.
- Owner: web + editorial.

**Phases 2–5 — Monetization** (per blueprint, MAU-gated)
- Video (2) → Art prints (3) → Affiliate gear (4) → gated iOS/B2B (5). Not started; sequenced by the blueprint's traffic gates.

## 6. Open governance items (blockers for future agents)

- **No `AGENTS.md` in this repo.** Any future `AGENTS.md` will fail the `validate_agents_frontmatter.py` gate because the project is **not registered in `~/plans/initiatives.yml`** (the commit hook warns on every endemic-site commit). `initiatives.yml` is **human-owned** — do NOT edit without explicit user go. Add the project + an initiative/family there, then create `AGENTS.md`.
- **`PROJECT_AUDIT.md` §7 corrected 2026-08-19:** JSON-LD is no longer "pending" — global `WebSite` JSON-LD ships in `layout.tsx`; per-route JSON-LD is the real gap.
- **Domain `endemic.app` is unconfirmed.** Verify the real domain before any fix referencing canonical URLs is deployed.
- **No deploy config / live server** at audit time. SEO fixes are code changes to be deployed; the audit assumes the structure, not a running instance.

## 7. References

- Monetization blueprint: `docs/MONETIZATION_AND_ACQUISITION_PLAN.md` (v2.1)
- SEO/GEO audit (source-static, 2026-08-19): `~/wiki/reports/seo-geo-audit-endemic-site-2026-08-19.md`
- Docs-drift audit (2026-08-19): `~/wiki/reports/docs-drift-audit-2026-08-19.md`
- `PROJECT_AUDIT.md` (§7 L2 OPEN), `AUDIT_FIX_PLAN.md` (L0/L1 PASSED, L2 OPEN)
