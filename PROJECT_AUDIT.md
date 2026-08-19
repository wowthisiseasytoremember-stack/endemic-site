# Project Recon Audit: Aquarium Ecosystem Landing Page v2

**Last Updated:** 2026-08-19

> **Forward plan:** See `ROADMAP.md` for the canonical built-vs-planned map and the sequenced execution plan (Phase 0 SEO → Phase 0.5 dossier engine → GEO surface → monetization). This file is the static audit; `ROADMAP.md` is the trajectory.

## 1. Stack & Tooling
- **Core Languages & Frameworks**: Next.js 16.2.6 (React 19), TypeScript, Node.js.
- **Styling & UI**: TailwindCSS 4, Framer Motion for complex animations and transitions.
- **Database & ORM**: PostgreSQL (`pg`), Drizzle ORM.
- **Content & Rendering**: MDX (`next-mdx-remote`), Sanity CMS (`next-sanity`), Portable Text.
- **Key Dependencies**: `zod` for API validation.
- **Tooling**: ESLint, PostCSS, TypeScript compiler. Run commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`.

## 2. File Structure / Architecture
- `src/app/`: Next.js App Router entry points. Defines routes for `/aquatrack`, `/floratrack`, `/read` (blog), `/watch`, `/discoverers`, `/gear`, and `/api`.
- `src/components/`: Reusable UI elements, MDX rendering pieces, and specific blog components.
- `src/db/`: Contains `schema.ts` for Drizzle database introspection.
- `src/lib/` & `src/data/`: Utilities, data fetching logic, and in-memory DB configuration.
- `docs/`: Editorial guidelines and component documentation (e.g., `editorial-brand-constitution.md`).
- `content/`: Local content repository for static markdown generation.
- `public/`: Static assets, prioritizing locally hosted and optimized images.

## 3. Core Systems / Data Flow
- **Data Query Layer**: A unified in-memory system (`src/lib/endemic-db.ts`) planned to integrate local SQLite databases (`aquatrack.db` and `floratrack.db`) with massive JSON exports to provide interconnected entity data (species, biotopes, discoverers).
- **Database Integration**: Connects directly to a PostgreSQL database securely configured via `.env` variables, using Drizzle ORM for typed querying.
- **Content Flow**: Employs Sanity as a Headless CMS, alongside dynamically generated articles from markdown (MDX) enriched by live queries (from Phase 1 of `BLOG_MASTER_PLAN.md`).
- **API Routing**: Contains server-side handlers (e.g., `/api/subscribe/route.ts`) optimized with Zod validation, IP rate-limiting, and honeypot structures.

## 4. Shared Components / Utilities Inventory
- **`ConnectionWeb.tsx`**: Framer Motion powered animated SVG connecting elements.
- **`AtmosphereCanvas.tsx` & `MistCanvas.tsx`**: Dynamic visual canvas effects for environmental theming.
- **`TiltCard.tsx`**: Accessible, interactive cards using CSS variables and intersection observer hooks.
- **`MarkdownViewer.tsx`**: Renders MDX content mapping custom components.
- **`EmailForm.tsx`**: Newsletter subscription capture form.
- **`ErrorBoundary.tsx`**: Global error handling wrapper for Next.js layouts.

## 5. Assets / Resources
- `.env.example`: Provides structure for `DATABASE_URL` and `NEXT_PUBLIC_SANITY_*` configs.
- `drizzle.config.ts`: Configuration for Drizzle Kit to introspect the `pg` database.
- Localized images (e.g. `pufferHero`) are cached in `public/images/` to optimize Largest Contentful Paint (LCP) rather than relying on external image CDNs.

## 6. Documentation & Plans
- **`AUDIT_FIX_PLAN.md`**: A Layer-Caked sprint plan. Layer 0 (Security & Infrastructure) and Layer 1 (Code Quality) are marked as `PASSED`.
- **`BLOG_MASTER_PLAN.md`**: A comprehensive architectural 6-phase roadmap focused on migrating the `/read` route to a completely data-driven platform that stitches together the AquaTrack and FloraTrack datasets using real cross-kingdom connections.
- **`docs/`**: Includes `editorial-brand-constitution.md`, `article-archetypes.md`, and `publication-definition-of-done.md` defining voice, tone, and audience for content.

## 7. State of the Code
- **Completed (Stable)**: Security hard-coding fixes (no leaked DB URLs), Drizzle schema introspection, Framer Motion replacements for legacy SMIL animations, and CSS variable theming mappings are done.
- **In-Progress / Planned**: 
  - **L2 Production Polish** (from `AUDIT_FIX_PLAN.md`) is currently `OPEN`. Pending tasks include Sanity headless CMS finalization, **per-route** structured data/SEO integrations (global `WebSite` JSON-LD + metadata already ship in `src/app/layout.tsx`; per-route `Article`/`BreadcrumbList`/`FAQPage` JSON-LD, per-route `metadata`, `canonical`, `og:image`, `sitemap.xml`, `robots.txt`, and `llms.txt` are the gaps — see `~/wiki/reports/seo-geo-audit-endemic-site-2026-08-19.md`, 2026-08-19), and finalizing a CI/CD GitHub Action.
  - **Blog Data Sync** (Phase 0 of `BLOG_MASTER_PLAN.md`) needs implementation to `rsync` databases from the `ichabod` server, which unblocks the rest of the dynamic article generation.
- **Future Enhancements**: E2E testing, PWA manifests, and advanced analytics tracking remain deferred to L3.
