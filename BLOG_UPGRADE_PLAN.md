# Blog / Field Notes - First-Class Citizen Upgrade Plan

**Status:** Planning phase - ready for implementation  
**Current State:** Basic markdown rendering, hardcoded post list, no images, no metadata, no SEO, no categorization

---

## 🎯 Vision

Transform `/read` into a **world-class editorial destination** that rivals Aquarium Co-Op's blog, Practical Fishkeeping, or The Spruce Pets — but with our unique "Endemic" voice: provenance-obsessed, discoverer-centric, biotope-grounded.

**Core differentiator:** Every article maps to *real data* (species, discoverers, biotopes, collectors) from our content layer. Not just "how to keep X" — "here's the river X came from, the paper trail behind it, and the equipment to replicate it."

---

## 📦 Current Architecture Analysis

### What Works
- Markdown files in `content/blog/` with frontmatter-ish structure (first line = title)
- SSG via `generateStaticParams` — fast, SEO-friendly
- `MarkdownViewer` with Framer Motion scroll animations
- Clean editorial typography (Fraunces display + Inter body)
- Custom `ArticleLink` cards with exit animation

### What's Missing (Gap Analysis)

| Area | Current | Target |
|------|---------|--------|
| **Content Model** | Raw MD files, hardcoded list in client | Structured frontmatter + auto-generated index |
| **Images** | None | Hero images, inline figures, galleries, lazy-loaded, WebP |
| **Metadata** | Title only | Category, tags, author, read time, publish date, updated date, SEO, OG, schema.org |
| **Discovery** | Flat list on `/read` | Category pages, tag pages, search, related posts, series |
| **Reading UX** | Basic scroll | TOC sidebar, progress bar, dark/light (we're dark), estimated scroll position, "Continue reading" |
| **Cross-linking** | None | Auto-link species/discoverers/biotopes to app pages |
| **Author System** | None | Author bios, avatar, social, other posts |
| **Series/Collections** | None | "Puffer Profiles", "Discoverer Dossiers", "Biotope Builds" |
| **Newsletter Capture** | EmailForm exists but not integrated | Inline capture, lead magnets per category |
| **Analytics** | None | Read depth, scroll %, CTA clicks, search queries |
| **RSS/Atom** | None | Full feed + category feeds |
| **Sitemap** | Auto via Next.js | Explicit with `lastmod`, `changefreq`, `priority` |

---

## 🏗️ Phase 1: Content Model & Infrastructure (Week 1)

### 1.1 Structured Frontmatter Schema

```yaml
# content/blog/a-puffer.md
---
title: "11 Species of Freshwater Pufferfish You Can Keep (and the River Each One Comes From)"
slug: "a-puffer"
category: "Species Spotlight"
tags: ["puffers", "biotope", "species-guide", "congo", "amazon", "india"]
author: "endemic-editorial"
publishDate: "2026-01-15"
updatedDate: "2026-06-20"
readTime: "14 min"
heroImage: "/images/blog/puffer-hero.webp"
heroAlt: "Tetraodon mbu in Congo River biotope"
excerpt: "From the 26-inch Mbu of the Congo to the thumbnail-sized Pea Puffer of Kerala's Pamba River — every species linked to real DB data."
seo:
  title: "11 Freshwater Puffer Species & Their Native Rivers | Endemic Field Notes"
  description: "Complete guide to aquarium puffers with biotope data: water params, native range, discoverer history. Includes Mbu, Pea, Fahaka, Amazon, and 7 more."
  ogImage: "/images/blog/puffer-og.webp"
relatedSpecies: ["tetraodon-mbu", "carinotetraodon-travancoricus", "colomesus-asellus"]
relatedDiscoverers: ["pieter-bleeker", "george-albert-boulenger"]
relatedBiotopes: ["congo-basin", "rio-negro", "pamba-river"]
series: "Puffer Profiles"
seriesOrder: 1
leadMagnet: "puffer-biotope-cheatsheet"
---

# Article content...
```

### 1.2 Content Library (`src/lib/blog.ts`)

```typescript
// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  updatedDate?: string;
  readTime: string;
  heroImage: string;
  heroAlt: string;
  excerpt: string;
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  relatedSpecies: string[];
  relatedDiscoverers: string[];
  relatedBiotopes: string[];
  series?: string;
  seriesOrder?: number;
  leadMagnet?: string;
  content: string;
}

export interface BlogIndex {
  posts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  series: Series[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    return { slug: file.replace('.md', ''), ...data, content } as BlogPost;
  }).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null { ... }
export function getPostsByCategory(category: string): BlogPost[] { ... }
export function getPostsByTag(tag: string): BlogPost[] { ... }
export function getPostsBySeries(series: string): BlogPost[] { ... }
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] { ... }
```

### 1.3 Image Pipeline

```
public/images/blog/
├── puffer-hero.webp          (1920w, hero)
├── puffer-hero@2x.webp       (3840w, retina)
├── puffer-og.webp            (1200x630, Open Graph)
├── puffer-inline-1.webp      (800w, article inline)
├── bleeker-market.webp
├── bleeker-atlas-plate.webp
└── ...
```

**Tooling:** Add `scripts/optimize-images.ts` using `sharp`:
- Generate WebP + AVIF at multiple widths (400, 800, 1200, 1920)
- Auto-generate blur placeholders (20px base64)
- Output `image-manifest.json` for `next/image` `srcSet`

---

## 🎨 Phase 2: Reading Experience (Week 1-2)

### 2.1 Article Page Layout (`/read/[slug]/page.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│  Nav (fixed)                                                │
├─────────────────────────────────────────────────────────────┤
│  Hero: Full-bleed image + title + meta + progress bar       │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────┬───────────────────────────────┐  │
│  │                       │  TOC (sticky)                 │  │
│  │   Article Content     │  • H2/H3 headings             │  │
│  │   - Hero image        │  • Active section highlight   │  │
│  │   - Lead paragraph    │  • Scroll progress ring       │  │
│  │   - H2 sections       │                               │  │
│  │   - Inline figures    │  [Newsletter Capture Card]    │  │
│  │   - Tables            │  [Related Species Cards]      │  │
│  │   - Blockquotes       │  [Related Discoverers]        │  │
│  │   - Cross-links       │                               │  │
│  │                       │                               │  │
│  └───────────────────────┴───────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Author Bio + Share + Newsletter + Related Posts            │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Enhanced Markdown Renderer

Replace `MarkdownViewer` with `ArticleRenderer` supporting:

```typescript
// components/ArticleRenderer.tsx
const components = {
  // Custom components
  Figure: ({ src, alt, caption, width }) => <FigureImage ... />,
  SpeciesLink: ({ slug, children }) => <Link href={`/aquatrack/species/${slug}`}>{children}</Link>,
  DiscovererLink: ({ slug, children }) => <Link href={`/read/discoverer/${slug}`}>{children}</Link>,
  BiotopeLink: ({ slug, children }) => <Link href={`/aquatrack/biotope/${slug}`}>{children}</Link>,
  Table: ({ children }) => <div className="overflow-x-auto"><table>{children}</table></div>,
  Callout: ({ type, children }) => <Callout type={type}>{children}</Callout>,
  
  // Standard with motion
  h2: MotionH2, h3: MotionH3, p: MotionP,
  blockquote: MotionBlockquote,
  ul: MotionUl, ol: MotionOl, li: MotionLi,
  img: OptimizedImage,
  a: ExternalLink,
};
```

### 2.3 Cross-Linking System

In markdown, use custom syntax:
```markdown
The [Mbu Puffer]{species=tetraodon-mbu} was described by [Boulenger]{discoverer=george-albert-boulenger} from the [Congo Basin]{biotope=congo-basin}.
```

Transform via remark plugin → `SpeciesLink`, `DiscovererLink`, `BiotopeLink` components.

### 2.4 Reading Progress & TOC

```typescript
// hooks/useReadingProgress.ts
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  
  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollTop / docHeight);
      
      // IntersectionObserver for headings...
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  
  return { progress, activeHeading };
}
```

---

## 📚 Phase 3: Discovery & Navigation (Week 2)

### 3.1 Category Pages (`/read/category/[category]/page.tsx`)

```
/read/category/species-spotlight
/read/category/discoverer-dossiers
/read/category/biotope-guides
/read/category/cultivar-controversies
/read/category/expedition-logs
```

Each shows: category hero, description, post grid with infinite scroll.

### 3.2 Tag Pages (`/read/tag/[tag]/page.tsx`)

Auto-generated from frontmatter tags. SEO-friendly: `/read/tag/puffers`, `/read/tag/congo-basin`.

### 3.3 Series Pages (`/read/series/[series]/page.tsx`)

Ordered reading: "Puffer Profiles #1 → #2 → #3", "Discoverer Dossiers".

### 3.4 Search (`/read/search/page.tsx`)

Client-side search with FlexSearch or MiniSearch:
- Index: title, excerpt, tags, category, series, content (truncated)
- Highlight matches
- Filter by category/tag/series
- Keyboard shortcut (`/` to focus)

### 3.5 Upgraded Index Page (`/read/page.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│  Hero: "Field Notes" + subtitle + newsletter capture       │
├─────────────────────────────────────────────────────────────┤
│  Filter Bar: [All] [Species] [Discoverers] [Biotope] [Controversy] [Expeditions] │
├─────────────────────────────────────────────────────────────┤
│  Featured: Latest hero post (large card + hero image)      │
├─────────────────────────────────────────────────────────────┤
│  Series Strip: "Puffer Profiles" (3 cards horizontal scroll)│
├─────────────────────────────────────────────────────────────┤
│  Grid: All posts (category badges, read time, author)       │
├─────────────────────────────────────────────────────────────┤
│  Newsletter Section: "Get the Field Notes dispatch"        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 Phase 4: App Integration (Week 2-3)

### 4.1 Species ↔ Article Cross-Links

On `/aquatrack/species/[slug]`:
```tsx
<RelatedContent>
  <h3>Read the Field Notes</h3>
  <ArticleCard post={relatedPost} />
</RelatedContent>
```

On article page:
```tsx
<SpeciesPanel species={relatedSpecies} />
```

### 4.2 Biotope Pages → Articles

`/aquatrack/biotope/rio-negro` → "Mapping the Rio Negro" article link

### 4.3 Discoverer Pages → Articles

`/read/discoverer/pieter-bleeker` → "The Marketplace Ichthyologist" + other Bleeker posts

### 4.4 Gear Page → Biotope Articles

"Rio Negro Blackwater" gear guide → "Building a Rio Negro Blackwater Tank" article

### 4.5 Homepage → Blog Integration

Hero "Latest Field Notes" strip (3 latest posts with hero images)

---

## 📊 Phase 5: SEO, Analytics & Distribution (Week 3)

### 5.1 Technical SEO

- `generateMetadata` per post with full Open Graph, Twitter Card, JSON-LD Article schema
- `sitemap.ts` with blog posts, categories, tags, series
- `robots.ts` allowing all
- Canonical URLs
- `lastmod` from `updatedDate` or `publishDate`

### 5.2 RSS/Atom Feeds

```typescript
// app/feed.xml/route.ts
export async function GET() {
  const posts = getAllPosts();
  const xml = generateRSS(posts);
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
```

Feeds: `/feed.xml`, `/feed/category/species-spotlight.xml`, `/feed/tag/puffers.xml`

### 5.3 Newsletter Integration

- ConvertKit / Beehiiv / Buttondown API
- Per-category lead magnets (puffer cheatsheet, bleeker timeline, etc.)
- Inline forms in article sidebar + bottom CTA
- UTM tracking per source

### 5.4 Analytics Events

```typescript
// lib/analytics.ts
export function trackArticleEvent(event: 'read_start' | 'read_25' | 'read_50' | 'read_75' | 'read_100' | 'cta_click' | 'share' | 'newsletter_signup', data: { slug: string; category: string; position?: string }) { ... }
```

---

## 🎯 Phase 6: Content Production Workflow (Ongoing)

### 6.1 Authoring Tools

- VS Code snippets for frontmatter
- `npm run new:post "Title" --category="Species Spotlight"` scaffolding script
- Preview server with draft mode (`next dev --turbo`)

### 6.2 Image Workflow

- Drop raw images in `content/images/blog/raw/`
- Run `npm run images:optimize` → outputs to `public/images/blog/`
- Auto-updates frontmatter `heroImage` if filename matches slug

### 6.3 Publishing Checklist

- [ ] Frontmatter complete
- [ ] Hero image + OG image optimized
- [ ] Cross-links to species/discoverers/biotopes verified
- [ ] Related posts manually curated (or auto-suggested)
- [ ] Newsletter lead magnet attached
- [ ] Social preview tested (Meta Debugger, Twitter Card Validator)
- [ ] `npm run build` passes

---

## 📁 File Structure After Upgrade

```
content/blog/
├── a-puffer.md
├── b-bleeker.md
├── ...
├── _drafts/
│   └── g-new-puffer-discovered.md
└── _assets/
    └── images referenced in posts

public/images/blog/
├── a-puffer-hero.webp
├── a-puffer-hero@2x.webp
├── a-puffer-og.webp
├── b-bleeker-market.webp
└── ...

src/
├── lib/
│   ├── blog.ts              # Content layer
│   ├── blog-search.ts       # Search index
│   ├── analytics.ts         # Event tracking
│   └── rss.ts               # Feed generation
├── components/
│   ├── blog/
│   │   ├── ArticleRenderer.tsx
│   │   ├── ArticleHero.tsx
│   │   ├── ArticleTOC.tsx
│   │   ├── ArticleFooter.tsx
│   │   ├── RelatedPosts.tsx
│   │   ├── SpeciesPanel.tsx
│   │   ├── DiscovererPanel.tsx
│   │   ├── BiotopePanel.tsx
│   │   ├── NewsletterCapture.tsx
│   │   ├── FigureImage.tsx
│   │   ├── Callout.tsx
│   │   ├── PostCard.tsx
│   │   ├── PostGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── SeriesStrip.tsx
│   │   └── ReadingProgress.tsx
│   └── ui/
│       └── OptimizedImage.tsx
├── app/
│   ├── read/
│   │   ├── page.tsx                    # Index (upgraded)
│   │   ├── search/page.tsx             # Search
│   │   ├── category/[category]/page.tsx
│   │   ├── tag/[tag]/page.tsx
│   │   ├── series/[series]/page.tsx
│   │   ├── [slug]/page.tsx             # Article (upgraded)
│   │   └── [slug]/og-image.tsx         # Dynamic OG
│   ├── feed.xml/route.ts
│   └── sitemap.ts
├── hooks/
│   ├── useReadingProgress.ts
│   └── useIntersectionObserver.ts
└── scripts/
    ├── optimize-images.ts
    ├── new-post.ts
    └── generate-search-index.ts
```

---

## 🎨 Design System Extensions

### Color Tokens (add to `globals.css`)
```css
:root {
  --blog-accent: var(--aqua);
  --blog-accent-emerald: var(--emerald);
  --blog-accent-amber: var(--amber);
  --category-species: var(--aqua);
  --category-discoverer: var(--amber);
  --category-biotope: var(--emerald);
  --category-controversy: #f2626d;
  --category-expedition: #8b7cf6;
}
```

### Category Badge Component
```tsx
<CategoryBadge category="Species Spotlight" />
// Renders with correct accent color, icon
```

### Figure/Image Styling
```css
.article-figure {
  @apply my-12 relative;
}
.article-figure img {
  @apply w-full rounded-xl ring-1 ring-white/10;
}
.article-figure figcaption {
  @apply mt-3 text-sm text-white/50 text-center font-medium;
}
```

---

## 📋 Implementation Checklist

### Phase 1: Foundation
- [ ] Define frontmatter schema (TypeScript + Zod validation)
- [ ] Migrate 6 existing posts to new frontmatter
- [ ] Create `src/lib/blog.ts` content layer
- [ ] Set up image optimization pipeline
- [ ] Add hero/OG images for existing posts

### Phase 2: Reading Experience
- [ ] Build `ArticleRenderer` with custom components
- [ ] Implement `SpeciesLink`, `DiscovererLink`, `BiotopeLink`
- [ ] Build `ArticleHero` with progress bar
- [ ] Build `ArticleTOC` (sticky, active highlight)
- [ ] Build `ReadingProgress` ring/bar
- [ ] Build `ArticleFooter` (author, share, newsletter, related)
- [ ] Upgrade `/read/[slug]/page.tsx`

### Phase 3: Discovery
- [ ] Upgrade `/read/page.tsx` (featured, series, filters, grid)
- [ ] Build `/read/category/[category]/page.tsx`
- [ ] Build `/read/tag/[tag]/page.tsx`
- [ ] Build `/read/series/[series]/page.tsx`
- [ ] Build `/read/search/page.tsx` + search index
- [ ] Add infinite scroll / pagination

### Phase 4: App Integration
- [ ] Add "Related Field Notes" to species pages
- [ ] Add "Field Notes" to biotope pages
- [ ] Add "Discoverer Dossiers" to discoverer references
- [ ] Add homepage "Latest Field Notes" strip
- [ ] Cross-link gear page ↔ biotope articles

### Phase 5: SEO & Distribution
- [ ] `generateMetadata` with full OG + JSON-LD
- [ ] `sitemap.ts` with blog routes
- [ ] `robots.ts`
- [ ] RSS/Atom feeds (main + category + tag)
- [ ] Newsletter integration (lead magnets per category)
- [ ] Analytics events (read depth, CTA clicks)

### Phase 6: Polish
- [ ] Dynamic OG image generation (`/read/[slug]/og-image.tsx`)
- [ ] Print stylesheet
- [ ] Dark/light (if ever needed) — we're dark-only
- [ ] Accessibility audit (headings, landmarks, focus, contrast)
- [ ] Performance audit (LCP, CLS, TBT)
- [ ] Content production docs + scaffolding script

---

## 🎯 Success Metrics

| Metric | Baseline | Target (3 months) |
|--------|----------|-------------------|
| Avg time on page | ~45s | > 3:00 |
| Scroll depth 75%+ | ~15% | > 40% |
| Newsletter conversion | ~0.5% | > 2% |
| Cross-click to app | ~5% | > 15% |
| Organic search clicks | ~0 | > 500/mo |
| Return visitors | ~10% | > 25% |

---

## 💡 Content Strategy Ideas (Post-Launch)

### Series to Build
1. **Puffer Profiles** — One species per post, deep biotope + discoverer + care
2. **Discoverer Dossiers** — Bleeker, Boulenger, Agassiz, Regan, Natterer, Hora, Valenciennes, Schott, Lobb, Lindley
3. **Biotope Builds** — Rio Negro, Congo Basin, Mekong, Lake Tanganyika, Kerala Streams
4. **Cultivar Controversies** — Thai Constellation, Pink Princess, Albo, Peru, Compacta
5. **Expedition Logs** — Modern collectors: Roberts, Page, Kullander, Herre
6. **Parameter Deep Dives** — pH, GH/KH, Tannins, Temperature, Flow, Light
7. **Medication Safety** — "Copper kills Amano" + 32 other warnings

### Lead Magnets per Category
- Species Spotlight → "Puffer Biotope Cheatsheet (PDF)"
- Discoverer Dossiers → "Bleeker's 500 Fish: Timeline Poster"
- Biotope Guides → "Rio Negro Shopping List (Notion Template)"
- Controversies → "Patent Tracker Spreadsheet"

---

## 🚀 Quick Wins (Do First)

1. **Add frontmatter to existing 6 posts** — 30 min each
2. **Hero images for 6 posts** — Source from Pexels/Unsplash, optimize
3. **Upgrade Article page** — Hero + TOC + progress bar = huge UX win
4. **Category badges on index** — Visual organization
5. **Related species panel** — Connects blog → app immediately

---

**Next Step:** Start Phase 1 implementation. Want me to begin with frontmatter migration + content library?
