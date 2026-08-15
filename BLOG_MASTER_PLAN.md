# Blog / Field Notes — Master Integration Plan

## 🗣 Tone & Audience Guidelines
**Audience:** Aquarium hobbyists and natural history readers with a casual to intermediate interest in ichthyology. 
**Key traits:** Young, smart, curious, extremely online, and deeply interested in **LORE, STORIES, AND HISTORY** (American English).

**Tone & Voice:**
- Conversational, curious, and slightly scholarly (but not dry).
- Genuine, excited, and awed by nature.
- Fascinated by the intricate connections you can draw between ecosystems, species, and the hobby.
- **American English**.

*(All content generation, prompts, and UI copy must adhere strictly to these tone and audience constraints.)*

**Status:** Ready for implementation  
**Data Sources:** AquaTrack (ichabod) + FloraTrack (ichabod) + 6 Content Factory outlines  
**Goal:** Transform `/read` into a data-driven editorial platform where every article is backed by live DB queries

---

## 🎯 The Big Picture

We have **two production databases** on ichabod that the landing page should query:

| Database | Path | Key Tables/Data |
|----------|------|-----------------|
| **AquaTrack** | `/home/ichabod/AquaTrack/data/aquatrack.db` + JSON exports | 1,669 fish species, 533K cross-kingdom links, biotopes, discoverers, collectors, etymology |
| **FloraTrack** | `/home/ichabod/FloraTrack/floratrack.db` + JSON exports | 3,066 plants, 2,593 cultivar patents, 15+ nursery evidence, controversies |

**Current landing page** has hardcoded `content.ts` with ~20 species. **Real data** has 4,700+ species with full provenance.

---

## 📦 Phase 0: Data Sync (Do First — 1 day)

### 0.1 Pull Databases to Landing Page Repo

```bash
# From landing page root
mkdir -p data/aquatrack data/floratrack

# Sync from ichabod (run on your machine)
rsync -avz ichabod@ichabod-linux:/home/ichabod/AquaTrack/data/species_traits_flat.json data/aquatrack/
rsync -avz ichabod@ichabod-linux:/home/ichabod/AquaTrack/data/biotope_enriched.json data/aquatrack/
rsync -avz ichabod@ichabod-linux:/home/ichabod/AquaTrack/data/cross_kingdom_connections.json data/aquatrack/
rsync -avz ichabod@ichabod-linux:/home/ichabod/AquaTrack/data/discoverer_pages/ data/aquatrack/discoverer_pages/
rsync -avz ichabod@ichabod-linux:/home/ichabod/AquaTrack/data/collector_stories.json data/aquatrack/
rsync -avz ichabod@ichabod-linux:/home/ichabod/AquaTrack/data/wikipedia_articles.json data/aquatrack/
rsync -avz ichabod@ichabod-linux:/home/ichabod/AquaTrack/data/etyfish_pages.json data/aquatrack/

rsync -avz ichabod@ichabod-linux:/home/ichabod/FloraTrack/data/cultivars/ data/floratrack/cultivars/
rsync -avz ichabod@ichabod-linux:/home/ichabod/FloraTrack/data/tropik/ data/floratrack/tropik/
rsync -avz ichabod@ichabod-linux:/home/ichabod/FloraTrack/floratrack.db data/floratrack/
```

### 0.2 Build Query Layer (`src/lib/endemic-db.ts`)

```typescript
// src/lib/endemic-db.ts
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const DATA_ROOT = path.join(process.cwd(), 'data');

// In-memory indexes built at build time
export const db = {
  // Fish
  species: new Map<string, FishSpecies>(),
  biotopes: new Map<string, Biotope>(),
  discoverers: new Map<string, Discoverer>(),
  collectors: new Map<string, Collector>(),
  crossKingdom: new Map<string, PlantLink[]>(),
  
  // Plants
  cultivars: new Map<string, Cultivar>(),
  patents: new Map<string, Patent>(),
  controversies: new Map<string, Controversy>(),
  
  // Init
  init() {
    // Load AquaTrack JSON
    this.species = loadJSON<FishSpecies[]>(DATA_ROOT, 'aquatrack/species_traits_flat.json')
      .reduce((m, s) => { m.set(s.scientific_name.toLowerCase(), s); return m; }, new Map());
    this.biotopes = loadJSON<Biotope[]>(DATA_ROOT, 'aquatrack/biotope_enriched.json')
      .reduce((m, b) => { m.set(b.primary_biotope, b); return m; }, new Map());
    this.discoverers = loadDiscovererPages(DATA_ROOT + '/aquatrack/discoverer_pages');
    this.collectors = loadJSON<Collector[]>(DATA_ROOT, 'aquatrack/collector_stories.json');
    this.crossKingdom = loadCrossKingdom(DATA_ROOT + '/aquatrack/cross_kingdom_connections.json');
    
    // Load FloraTrack
    this.cultivars = loadJSON<Cultivar[]>(DATA_ROOT, 'floratrack/cultivars/cultivar_master_reconciled.csv');
    this.patents = loadJSON<Patent[]>(DATA_ROOT, 'floratrack/cultivars/patent_evidence_sprint2.json');
    this.controversies = loadJSON<Controversy[]>(DATA_ROOT, 'floratrack/cultivars/controversy_index.json');
  },
  
  // Query methods
  getSpecies(slug: string) { return this.species.get(slug); }
  getBiotope(slug: string) { return this.biotopes.get(slug); }
  getDiscoverer(slug: string) { return this.discoverers.get(slug); }
  getCultivar(slug: string) { return this.cultivars.get(slug); }
  getCrossKingdom(speciesSlug: string) { return this.crossKingdom.get(speciesSlug) || []; }
  getRelatedArticles(entityType: 'species'|'discoverer'|'biotope', slug: string) { ... }
}
```

### 0.3 Build-Time Generation

```bash
# package.json scripts
"data:pull": "rsync ... from ichabod",
"data:build": "tsx scripts/build-indexes.ts",  # Creates search index, link maps
"data:sync": "npm run data:pull && npm run data:build"
```

---

## 📝 Phase 1: Article Generation from Real Data (Week 1)

### 1.1 Generate 6 Core Articles from Outlines + Live Data

Each outline gets **enriched with real DB queries**:

| Article | Outline | Live Data Injections |
|---------|---------|---------------------|
| `a-puffer` | Puffer outline | `db.getSpecies('tetraodon-mbu')`, `db.getBiotope('congo-basin')`, `db.getCrossKingdom('tetraodon-mbu')`, `db.getDiscoverer('boulenger')` |
| `b-bleeker` | Bleeker outline | `db.getDiscoverer('bleeker')`, `db.getSpeciesByDiscoverer('bleeker')`, `db.getCollectorStories('roberts')` |
| `c-etymology` | Etymology outline | `db.getEtymology('travancoricus')` from etyfish, `db.getSpecies('carinotetraodon-travancoricus')` |
| `d-schott` | Schott outline | `db.getDiscoverer('schott')`, `db.getCultivar('anthurium-crystallinum')`, `db.getCultivarByDiscoverer('schott')` |
| `e-pink-princess` | Pink Princess outline | `db.getCultivar('pink-princess')`, `db.getPatent('USPP31149')`, `db.getControversy('pink-princess')`, nursery evidence |
| `f-rio-negro` | Rio Negro outline | `db.getBiotope('rio-negro')`, `db.getSpeciesByBiotope('rio-negro')`, `db.getCrossKingdomByBiotope('rio-negro')` |

### 1.2 Article Template with Data Slots

```markdown
---
# Auto-generated frontmatter from DB
title: "11 Species of Freshwater Pufferfish..."
slug: "a-puffer"
category: "Species Spotlight"
tags: ["puffers", "biotope", "congo", "amazon", "taxonomy"]
series: "Puffer Profiles"
seriesOrder: 1
publishDate: "2026-01-15"
updatedDate: "2026-07-18"
readTime: "18 min"
heroImage: "/images/blog/a-puffer-hero.webp"
ogImage: "/images/blog/a-puffer-og.webp"
author: "Endemic Editorial"
leadMagnet: "puffer-biotope-cheatsheet"
# DB-linked entities
relatedSpecies: ["tetraodon-mbu", "carinotetraodon-travancoricus", ...]
relatedDiscoverers: ["george-albert-boulenger", "maurice-kottelat"]
relatedBiotopes: ["congo-basin", "rio-negro", "pamba-river"]
relatedCultivars: []
---

# {{title}}

{{#data.pufferIntro}}
{{/data.pufferIntro}}

## {{species.scientific_name}} — {{species.common_name}}

**Origin:** {{biotope.native_region_summary}}  
**Water:** pH {{species.ph_min}}–{{species.ph_max}}, {{species.temp_min_c}}–{{species.temp_max_c}}°C  
**Discoverer:** {{discoverer.name}} ({{species.year_described}})  
**Cross-Kingdom:** {{#crossKingdom}} [{{plant.common_name}}]({{plant.link}}) {{/crossKingdom}}

{{#data.mythBustTable}}
{{/data.mythBustTable}}
```

### 1.3 Generation Script

```typescript
// scripts/generate-articles.ts
import { db } from '@/lib/endemic-db';
import matter from 'gray-matter';

async function generateArticle(outline: Outline, db: EndemicDB) {
  // 1. Parse outline sections
  // 2. For each {{data.slot}}, query DB
  // 3. Render markdown with injected data
  // 4. Write to content/blog/{slug}.md
}

await db.init();
for (const outline of OUTLINES) {
  await generateArticle(outline, db);
}
```

---

## 🔗 Phase 2: Cross-Linking System (Week 1-2)

### 2.1 Central Entity Registry (`src/data/entities.json`)

```json
{
  "species": {
    "tetraodon-mbu": { "name": "Mbu Puffer", "type": "fish", "route": "/aquatrack/species/tetraodon-mbu", "article": "a-puffer" },
    "carinotetraodon-travancoricus": { "name": "Pea Puffer", "type": "fish", "route": "/aquatrack/species/carinotetraodon-travancoricus", "article": "a-puffer" }
  },
  "discoverers": {
    "pieter-bleeker": { "name": "Pieter Bleeker", "route": "/read/discoverer/pieter-bleeker", "article": "b-bleeker" },
    "george-albert-boulenger": { "name": "G. A. Boulenger", "route": "/read/discoverer/george-albert-boulenger", "article": "b-bleeker" }
  },
  "biotopes": {
    "congo-basin": { "name": "Congo Basin", "route": "/aquatrack/biotope/congo-basin", "article": "f-rio-negro" },
    "rio-negro": { "name": "Rio Negro", "route": "/aquatrack/biotope/rio-negro", "article": "f-rio-negro" }
  },
  "cultivars": {
    "pink-princess": { "name": "Pink Princess", "route": "/floratrack/cultivar/pink-princess", "article": "e-pink-princess" },
    "thai-constellation": { "name": "Thai Constellation", "route": "/floratrack/cultivar/thai-constellation", "article": "e-pink-princess" }
  }
}
```

### 2.2 MDX Components for Links

```tsx
// components/mdx/SpeciesLink.tsx
export function SpeciesLink({ slug, children }: { slug: string; children?: React.ReactNode }) {
  const entity = entities.species[slug];
  if (!entity) return <span className="text-red-400">[unknown species: {slug}]</span>;
  return (
    <a href={entity.route} className="text-aqua underline-offset-2 hover:text-aqua/70">
      {children ?? entity.name}
    </a>
  );
}

// components/mdx/DiscovererLink.tsx, BiotopeLink.tsx, CultivarLink.tsx
```

### 2.3 Remark Plugin for Auto-Linking

```typescript
// lib/remark-auto-link.ts
export function remarkAutoLink() {
  return (tree: Node) => {
    visit(tree, 'text', (node: TextNode) => {
      // Match {species=slug}, {discoverer=slug}, {biotope=slug}, {cultivar=slug}
      const regex = /\{(species|discoverer|biotope|cultivar)=([^}]+)\}/g;
      const matches = [...node.value.matchAll(regex)];
      if (matches.length) {
        // Replace with MDX component syntax
      }
    });
  };
}
```

**Usage in markdown:**
```markdown
The {species=tetraodon-mbu} from the {biotope=congo-basin} was described by {discoverer=george-albert-boulenger}.
```

**Renders as:**
```tsx
<p>The <SpeciesLink slug="tetraodon-mbu">Mbu Puffer</SpeciesLink> from the <BiotopeLink slug="congo-basin">Congo Basin</BiotopeLink> was described by <DiscovererLink slug="george-albert-boulenger">Boulenger</DiscovererLink>.</p>
```

---

## 📚 Phase 3: App Pages → Article Backlinks (Week 2)

### 3.1 Species Page (`/aquatrack/species/[slug]/page.tsx`)

```tsx
export default async function SpeciesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const species = db.getSpecies(slug);
  const articles = db.getRelatedArticles('species', slug);  // Returns [{ slug, title, excerpt }]
  
  return (
    <main>
      <SpeciesHeader species={species} />
      <SpeciesParams species={species} />
      
      {articles.length > 0 && (
        <RelatedFieldNotes articles={articles} />
      )}
      
      <CrossKingdomPanel connections={db.getCrossKingdom(slug)} />
    </main>
  );
}
```

### 3.2 Biotope Page (`/aquatrack/biotope/[slug]/page.tsx`)

```tsx
<RelatedFieldNotes articles={db.getRelatedArticles('biotope', slug)} />
<SpeciesInBiotope species={db.getSpeciesByBiotope(slug)} />
```

### 3.3 Discoverer Page (`/read/discoverer/[slug]/page.tsx`)

```tsx
<DiscovererBio discoverer={db.getDiscoverer(slug)} />
<SpeciesDescribed species={db.getSpeciesByDiscoverer(slug)} />
<RelatedFieldNotes articles={db.getRelatedArticles('discoverer', slug)} />
```

### 3.4 Cultivar Page (`/floratrack/cultivar/[slug]/page.tsx`)

```tsx
<CultivarCard cultivar={db.getCultivar(slug)} />
<PatentPanel patents={db.getPatentsByCultivar(slug)} />
<ControversyPanel controversy={db.getControversy(slug)} />
<NurseryEvidence evidence={db.getNurseryEvidence(slug)} />
<RelatedFieldNotes articles={db.getRelatedArticles('cultivar', slug)} />
```

### 3.5 Homepage "Latest Field Notes" Strip

```tsx
// components/HomepageFieldNotes.tsx
const latest = db.getAllPosts().slice(0, 3);
<div className="grid gap-6 md:grid-cols-3">
  {latest.map(post => <ArticleCard key={post.slug} post={post} variant="hero" />)}
</div>
```

---

## 🎨 Phase 4: Reading Experience (Week 2)

### 4.1 Article Page Layout

```
┌────────────────────────────────────────────────────────────┐
│  Nav (fixed)                                               │
├────────────────────────────────────────────────────────────┤
│  Hero: Full-bleed image + title + meta + progress ring     │
├────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐  ┌────────────────────────┐  │
│  │                          │  │  TOC (sticky)          │  │
│  │   Article Body (MDX)     │  │  • H2/H3 headings      │  │
│  │   - Inline SpeciesLink   │  │  • Active highlight    │  │
│  │   - FigureImage          │  │  • Scroll progress     │  │
│  │   - Callout              │  │                        │  │
│  │   - Table (sortable)     │  │  [Newsletter Capture]  │  │
│  │   - CrossKingdomCard     │  │  [Related Species]     │  │
│  │                          │  │  [Related Discoverers] │  │
│  └──────────────────────────┘  └────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│  Author Bio + Share + Newsletter + Related Posts (3)       │
└────────────────────────────────────────────────────────────┘
```

### 4.2 Custom MDX Components

```tsx
// components/mdx/ArticleComponents.tsx
export const ArticleComponents = {
  // Data-driven components
  SpeciesLink,
  DiscovererLink, 
  BiotopeLink,
  CultivarLink,
  CrossKingdomCard,        // Renders fish+plant pair with biotope badge
  SpeciesCard,             // Mini card from DB
  BiotopeCard,
  DiscovererCard,
  CultivarCard,
  
  // Content components
  FigureImage,             // <FigureImage src alt caption />
  Callout,                 // <Callout type="myth-bust">...</Callout>
  DataTable,               // Sortable, responsive
  MythBustRow,             // Special row for myth-bust tables
  
  // Standard with motion
  h2: MotionH2, h3: MotionH3,
  p: MotionP, blockquote: MotionBlockquote,
  ul: MotionUl, ol: MotionOl, li: MotionLi,
};
```

### 4.3 Reading Progress + TOC

```tsx
// hooks/useReadingProgress.ts
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    document.querySelectorAll('h2, h3').forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, []);
  
  return { progress, activeHeading };
}
```

---

## 🔍 Phase 5: Discovery & SEO (Week 2-3)

### 5.1 Category/Tag/Series Pages

```
/read/category/species-spotlight
/read/category/discoverer-dossiers
/read/category/biotope-guides
/read/category/cultivar-controversies
/read/tag/puffers
/tag/congo-basin
/read/series/puffer-profiles
/read/series/discoverer-dossiers
/read/series/biotope-builds
/read/series/cultivar-controversies
```

### 5.2 Search

```typescript
// lib/search-index.ts (built at build time)
import { createIndex } from 'minisearch';

export const searchIndex = createIndex({
  fields: ['title', 'excerpt', 'content', 'tags', 'category', 'series'],
  storeFields: ['slug', 'title', 'excerpt', 'category', 'heroImage', 'readTime'],
  searchOptions: { fuzzy: 0.2, prefix: true, boost: { title: 3, tags: 2 } }
});

// Populate from all posts
db.getAllPosts().forEach(post => searchIndex.add({ 
  id: post.slug, 
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  tags: post.tags.join(' '),
  category: post.category,
  series: post.series || ''
}));
```

### 5.3 SEO & Structured Data

```tsx
// app/read/[slug]/page.tsx - generateMetadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = db.getPost(slug);
  
  return {
    title: post.seo.title,
    description: post.seo.description,
    openGraph: {
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      images: [{ url: post.ogImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image' },
    other: {
      'article:published_time': post.publishDate,
      'article:modified_time': post.updatedDate,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags.join(','),
    },
  };
}

// JSON-LD Article schema injected in ArticleLayout
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": [post.ogImage],
  "datePublished": post.publishDate,
  "dateModified": post.updatedDate,
  "author": { "@type": "Person", "name": post.author },
  "publisher": { "@type": "Organization", "name": "Endemic", "logo": { "@type": "ImageObject", "url": "/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": `https://endemic.app/read/${post.slug}` },
  "about": post.relatedSpecies.map(s => ({ "@type": "BiologicalSpecies", "name": s })),
};
```

### 5.4 Sitemap & RSS

```typescript
// app/sitemap.ts
export default function sitemap() {
  const posts = db.getAllPosts();
  return [
    { url: 'https://endemic.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://endemic.app/read', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...posts.map(p => ({
      url: `https://endemic.app/read/${p.slug}`,
      lastModified: new Date(p.updatedDate || p.publishDate),
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...categories.map(c => ({ url: `https://endemic.app/read/category/${c.slug}`, ... })),
    ...tags.map(t => ({ url: `https://endemic.app/read/tag/${t.slug}`, ... })),
    ...series.map(s => ({ url: `https://endemic.app/read/series/${s.slug}`, ... })),
  ];
}

// app/feed.xml/route.ts - RSS 2.0 + Atom
```

---

## 📊 Phase 6: Analytics & Growth (Week 3+)

### 6.1 Event Tracking

```typescript
// lib/analytics.ts
export function trackArticleEvent(event: ArticleEvent) {
  // PostHog / Plausible / custom
  analytics.capture('article_event', {
    slug: event.slug,
    category: event.category,
    event: event.type,  // 'read_start', 'read_25', 'read_50', 'read_75', 'read_100', 'cta_click', 'share', 'newsletter_signup'
    position: event.position,
    cta: event.cta,
    referrer: document.referrer,
  });
}
```

### 6.2 Lead Magnets per Category

| Category | Lead Magnet | Delivery |
|----------|-------------|----------|
| Species Spotlight | Puffer Biotope Cheatsheet (PDF) | Inline form → email |
| Discoverer Dossiers | Bleeker Timeline Poster (Notion) | Inline form → email |
| Biotope Guides | Rio Negro Shopping List (Notion template) | Inline form → email |
| Cultivar Controversies | Patent Tracker Spreadsheet | Inline form → email |

---

## 🛠 Implementation Order

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| **0** | Data Sync | `data/` folder populated, `endemic-db.ts` working, `npm run data:sync` |
| **1** | Article Gen | 6 articles generated from outlines + live DB data, frontmatter complete |
| **1-2** | Cross-Links | Entity registry, MDX components, remark plugin, backlinks on app pages |
| **2** | Reading UX | Article layout, TOC, progress, custom components, dynamic OG images |
| **2-3** | Discovery | Category/tag/series pages, search, SEO/JSON-LD, sitemap, RSS |
| **3+** | Growth | Analytics, lead magnets, A/B tests, content calendar |

---

## 🔑 Key Decisions Needed

1. **LLM Provider for Generation:** OpenRouter paid (Nemotron/GPT-4o) vs local? Need API key.
2. **Image Sourcing:** Script Pexels/Unsplash search + download? Or manual curation?
3. **Email Service:** ConvertKit / Beehiiv / Buttondown / custom? Need API creds.
4. **ichabod Sync Frequency:** Daily cron? Webhook on DB change? Manual `npm run data:sync`?
5. **Author Voice:** "Endemic Editorial" (brand) vs named authors? Affects byline schema.

---

## 📁 File Tree After Implementation

```
src/
├── lib/
│   ├── endemic-db.ts          # Query layer (built from JSON + SQLite)
│   ├── search-index.ts        # MiniSearch index
│   ├── analytics.ts           # Event tracking
│   └── remark-auto-link.ts    # {type=slug} → MDX component
├── data/
│   ├── entities.json          # Central slug registry
│   ├── aquatrack/             # Synced from ichabod
│   └── floratrack/            # Synced from ichabod
├── components/
│   ├── mdx/
│   │   ├── SpeciesLink.tsx
│   │   ├── DiscovererLink.tsx
│   │   ├── BiotopeLink.tsx
│   │   ├── CultivarLink.tsx
│   │   ├── CrossKingdomCard.tsx
│   │   ├── SpeciesCard.tsx
│   │   ├── FigureImage.tsx
│   │   ├── Callout.tsx
│   │   └── DataTable.tsx
│   ├── blog/
│   │   ├── ArticleHero.tsx
│   │   ├── ArticleTOC.tsx
│   │   ├── ArticleFooter.tsx
│   │   ├── RelatedPosts.tsx
│   │   ├── NewsletterCapture.tsx
│   │   ├── ReadingProgress.tsx
│   │   └── ArticleLayout.tsx
│   └── app/
│       ├── RelatedFieldNotes.tsx
│       ├── CrossKingdomPanel.tsx
│       └── SpeciesPanel.tsx
├── app/
│   ├── read/
│   │   ├── page.tsx                    # Index (upgraded)
│   │   ├── search/page.tsx
│   │   ├── category/[category]/page.tsx
│   │   ├── tag/[tag]/page.tsx
│   │   ├── series/[series]/page.tsx
│   │   ├── [slug]/page.tsx             # Article (upgraded)
│   │   ├── [slug]/og-image.tsx         # Dynamic OG
│   │   └── discoverer/[slug]/page.tsx
│   ├── feed.xml/route.ts
│   └── sitemap.ts
├── content/blog/
│   ├── a-puffer.md          # Generated
│   ├── b-bleeker.md         # Generated
│   ├── c-etymology.md       # Generated
│   ├── d-schott.md          # Generated
│   ├── e-pink-princess.md   # Generated
│   └── f-rio-negro.md       # Generated
└── scripts/
    ├── pull-data.sh
    ├── build-indexes.ts
    ├── generate-articles.ts
    └── sync-all.ts
```

---

## 🚀 Quick Start Commands

```bash
# 1. Pull data from ichabod
npm run data:pull

# 2. Build query indexes
npm run data:build

# 3. Generate 6 articles from outlines + live data
npm run articles:generate

# 4. Optimize images
npm run images:optimize

# 5. Build & preview
npm run build && npm run dev
# Visit http://localhost:3000/read/a-puffer
```

---

**This plan replaces the previous blog upgrade plan entirely.** It uses the actual production databases (4,700+ species, 533K cross-kingdom links, 2,593 cultivar patents) as the single source of truth, with the 6 outlines providing narrative structure only.

Ready to start Phase 0 (data sync)?
