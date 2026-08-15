# Aquarium Ecosystem Landing Page v2 - Complete Audit & Fix Plan (Layer Caked)

**Generated:** 2026-07-18  
**Scope:** All critical, high, medium, and low priority issues  
**Target:** Production-ready, secure, tested, accessible codebase

---

### Layer Cake Scaffold

| Layer | Name | Lite Contract | Depends On | Gate Type |
|-------|------|--------------|------------|-----------|
| L0 | Security & Infrastructure | In: Unsecured env, missing DB schemas → Out: Secrets secured, DB schema introspected, APIs working, local images optimized | — | deterministic |
| L1 | Code Quality & Rendering | In: L0 output + legacy SMIL + hardcoded colors → Out: Framer Motion, ISR caching, CSS vars, accessible components | L0 | deterministic |
| L2 | Production Polish | In: L1 output → Out: Headless CMS configured, Skeletons added, SEO/JSON-LD, 404 page, CI/CD pipeline | L1 | deterministic |
| L3 | Testing & Advanced | In: L2 output → Out: E2E tests, PWA manifest, Font optimizations, Analytics, CSP | L2 | human |

**Walking skeleton:** L0 → L1 (Securing the app and bringing its UI up to modern standards).

---

## 🔴 L0: Security & Infrastructure

```yaml
# Gate: L0
type: deterministic
verify: npm run typecheck && npm run lint && test -f src/db/schema.ts && echo "PASS" || echo "FAIL"
evidence: .audit/aquarium-landing-v2/L0/evidence.log
status: PASSED
hard_gate: true
```

### Sprint L0.1: Prevent Hardcoded DATABASE_URL from entering Git
**Files to touch:** `.gitignore`, `.env.example`
**Files to NOT touch:** `.env` (already contains secrets)
**What to do:**
1. Run `git-secrets --scan` (or equivalent) to ensure `DATABASE_URL` hasn't been leaked in history.
2. Install git-secrets hook to block future leaks.
3. Add `.env` to `.gitignore`.
4. Create `.env.example` with a placeholder `DATABASE_URL`.
**Verify:** `grep -q "\.env" .gitignore && echo "PASS" || echo "FAIL"`

### Sprint L0.2: Database Schema Introspection & Drizzle Config
**Files to touch:** `drizzle.config.json`, `drizzle.config.ts`, `src/db/schema.ts`
**What to do:**
1. Delete `drizzle.config.json` and replace it with `drizzle.config.ts`.
2. Configure `drizzle.config.ts` to use `process.env.DATABASE_URL` instead of hardcoding `app_db`.
3. Run `drizzle-kit introspect:pg` to automatically generate `src/db/schema.ts` from the existing database (eliminating manual typing).
**Verify:** `test -f src/db/schema.ts && echo "PASS" || echo "FAIL"`

### Sprint L0.3: Subscribe API & Package Config
**Files to touch:** `src/app/api/subscribe/route.ts`, `package.json`, `next.config.ts`
**What to do:**
1. Create `/api/subscribe/route.ts` to handle newsletter subscriptions.
2. Fix `package.json` name from `nextjs-postgresql-template` to `aquarium-ecosystem-landing-page-v2`.
3. Configure `next.config.ts` with `remotePatterns` for external images if any remain.

### Sprint L0.4: Localize Remaining External Pexels Images
**Files to touch:** `src/app/page.tsx`, `public/images/`
**What to do:**
1. Download `pufferHero` and `nepenthes` Pexels images into `public/images/`.
2. Replace external URLs in `page.tsx` with local `next/image` components.
3. **Crucial:** Add `priority=true` to these hero images to optimize Largest Contentful Paint (LCP).

### Sprint L0.5: Global Error Boundary
**Files to touch:** `src/components/ErrorBoundary.tsx`, `src/app/layout.tsx`
**What to do:**
1. Create a global error boundary component and wrap the children in `layout.tsx`.

---

## 🟡 L1: Code Quality & Rendering

```yaml
# Gate: L1
type: deterministic
verify: npm run build && grep -q "framer-motion" src/components/ConnectionWeb.tsx && echo "PASS" || echo "FAIL"
evidence: .audit/aquarium-landing-v2/L1/evidence.log
status: PASSED
hard_gate: false
```

### Sprint L1.1: Replace SMIL Animations with Framer Motion
**Files to touch:** `src/components/ConnectionWeb.tsx`
**What to do:**
1. Replace deprecated `<animate>` SVG tags with `motion.circle` and Framer Motion configurations (`animate={{ r: [5, 9, 5] }}`, `transition={{ duration: 2.2, repeat: Infinity }}`).

### Sprint L1.2: ISR & Performance Updates
**Files to touch:** `src/app/page.tsx`, `src/app/aquatrack/page.tsx`, `src/app/floratrack/page.tsx`
**What to do:**
1. Remove `export const dynamic = "force-dynamic"`.
2. Add `export const revalidate = 3600` to enable Incremental Static Regeneration.

### Sprint L1.3: CSS Variable Theming
**Files to touch:** `AtmosphereCanvas.tsx`, `TiltCard.tsx`, `ConnectionWeb.tsx`, `CrossKingdom.tsx`
**What to do:**
1. Replace hardcoded hex colors (`#1fb8c4`, `#2fae6b`) with CSS variables (`var(--aqua)`, `var(--emerald)`) mapped from `globals.css`.

### Sprint L1.4: Subscribe API Hardening
**Files to touch:** `src/app/api/subscribe/route.ts`
**What to do:**
1. Add Zod schema validation, honeypot fields, and IP-based rate limiting (Redis or in-memory) to prevent spam.

### Sprint L1.5: Accessibility & UX Hook Polish
**Files to touch:** `src/components/TiltCard.tsx`, `src/components/Reveal.tsx`, `src/hooks/useInView.ts`
**What to do:**
1. Add `tabIndex={0}`, `onKeyDown`, and a focus-visible ring to `TiltCard.tsx`.
2. Extract the IntersectionObserver logic from `Reveal.tsx` into a shared `useInView.ts` context hook.

---

## 🟢 L2: Production Polish

```yaml
# Gate: L2
type: deterministic
verify: npm run build && test -f src/app/not-found.tsx && echo "PASS" || echo "FAIL"
evidence: .audit/aquarium-landing-v2/L2/evidence.log
status: OPEN
hard_gate: false
```

### Sprint L2.1: Headless CMS Integration (Sanity / Contentful)
**Files to touch:** `src/lib/cms.ts` (new)
**What to do:**
1. Connect the landing page to a headless CMS to pull dynamic content, avoiding the need for a custom sync script or duplicated DB data.

### Sprint L2.2: SEO & Loading Polish
**Files to touch:** `src/app/layout.tsx`, `src/components/Skeleton.tsx`, `src/app/not-found.tsx`
**What to do:**
1. Add `<script type="application/ld+json">` structured data.
2. Build shimmering `Skeleton.tsx` for async pages.
3. Design a branded `not-found.tsx` 404 page.

### Sprint L2.3: CI/CD & Bundle Optimization
**Files to touch:** `.github/workflows/ci.yml`, `next.config.ts`
**What to do:**
1. Set up a GitHub Action running `lint`, `typecheck`, and `build`.
2. Install `@next/bundle-analyzer` and add it to `next.config.ts`.
3. Document or remove obsolete `clean.js` and `rewrite.js` scripts.

---

## 🔵 L3: Testing & Advanced (Deferred)

```yaml
# Gate: L3
type: human
verify: E2E tests pass, Lighthouse score > 90.
evidence: .audit/aquarium-landing-v2/L3/evidence.log
status: OPEN
hard_gate: false
```

(Sprints to be detailed post-L2, including E2E tests, PWA manifest, font optimization, CSP headers, and analytics setup.)

---

## Current WIP Inventory

| Workstream | Status | Scope | Blocks |
|------------|--------|-------|--------|
| Endemic UI Animations | ✅ PASSED | Implemented cascading exit framer-motion animations on the blog route. | None |
| L0 Security Checks | ⬜ OPEN | Implementing MMR findings for `.gitignore` and schema generation. | L1 |
