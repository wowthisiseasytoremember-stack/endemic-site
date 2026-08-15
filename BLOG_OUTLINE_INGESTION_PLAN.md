# Blog Outline Ingestion & Integration Plan

**Source:** 6 outline files from Content Factory pipeline (`/mnt/c/Users/wowth/Downloads/*-outline (2|3).md`)
**Target:** Full blog articles in `content/blog/` + integration with landing page blog system

---

## 📦 Source Outline Analysis

| File | Slug | Category | Channel | Key Data Assets |
|------|------|----------|---------|-----------------|
| `a-puffer-outline (2).md` | `a-puffer` | Species Spotlight | Fish | 12-species table, biology facts, Kottelat 2013 revision, myth-bust table |
| `b-bleeker-outline (3).md` | `b-bleeker` | Discoverer Dossiers | Fish | 1,925 species table, banishment story, Atlas artists, 50+ aquarium species list, 10 honorifics |
| `c-etymology-outline (2).md` | `c-etymology` | Species Spotlight / Educational | Fish | Linnaeus system, 50+ suffix rules, 20 decoded hobby names, 5 pitfalls |
| `d-schott-outline (2).md` | `d-schott` | Discoverer Dossiers | Plants | 126+ Anthurium species, living vs dried advantage, 7 genera shaped, rare-plant boom connection |
| `e-pink-princess-outline (2).md` | `e-pink-princess` | Cultivar Controversies | Plants | USPP31149 patent, L1/L2/L3 chimera model, 3 variegation types, buyer's checklist |
| `f-rio-negro-outline (2).md` | `f-rio-negro` | Biotope Guides | Fish | Water chemistry table (main/igapó), 5 species depth profiles, 8-step build timeline, 83% target, 5 tannin methods |

---

## 🎯 Ingestion Strategy

### Option A: Direct Article Generation (Recommended)
Use the outlines as **writing briefs** to generate polished markdown articles. The outlines are already structured with narrative spine + data packs.

**Process:**
```
Outline → LLM Expansion → Full Article → Frontmatter Injection → content/blog/
```

### Option B: Structured Data + Template
Parse outlines into structured JSON, then render via templating. Better for consistency but more engineering.

**Decision:** Option A for speed. These are one-off high-quality articles. The narrative voice matters more than template consistency.

---

## 🔄 Phase 1: Article Generation (Week 1)

### 1.1 Create Generation Script
```bash
# scripts/generate-articles.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const OUTLINE_DIR = '/mnt/c/Users/wowth/Downloads';
const OUTPUT_DIR = path.join(process.cwd(), 'content', 'blog');

const OUTLINES = [
  { file: 'a-puffer-outline (2).md', slug: 'a-puffer', category: 'Species Spotlight', series: 'Puffer Profiles', seriesOrder: 1 },
  { file: 'b-bleeker-outline (3).md', slug: 'b-bleeker', category: 'Discoverer Dossiers', series: 'Discoverer Dossiers', seriesOrder: 1 },
  { file: 'c-etymology-outline (2).md', slug: 'c-etymology', category: 'Species Spotlight' },
  { file: 'd-schott-outline (2).md', slug: 'd-schott', category: 'Discoverer Dossiers', series: 'Discoverer Dossiers', seriesOrder: 2 },
  { file: 'e-pink-princess-outline (2).md', slug: 'e-pink-princess', category: 'Cultivar Controversies', series: 'Cultivar Controversies', seriesOrder: 1 },
  { file: 'f-rio-negro-outline (2).md', slug: 'f-rio-negro', category: 'Biotope Guides', series: 'Biotope Builds', seriesOrder: 1 },
];

// For each outline:
// 1. Read file
// 2. Extract source text + data pack
// 3. Call LLM with expansion prompt
// 4. Inject frontmatter
// 5. Write to content/blog/{slug}.md
```

### 1.2 Frontmatter Template Per Article

```yaml
# a-puffer.md
---
slug: a-puffer
title: "11 Species of Freshwater Pufferfish You Can Keep (and the River Each One Comes From)"
excerpt: "From the 26-inch Mbu of the Congo to the thumbnail-sized Pea Puffer of Kerala's Pamba River — every species linked to real DB data."
category: "Species Spotlight"
tags: ["puffers", "biotope", "species-guide", "congo", "amazon", "india", "taxonomy", "conservation"]
series: "Puffer Profiles"
seriesOrder: 1
publishDate: "2026-01-15"
updatedDate: "2026-07-18"
readTime: "18 min"
heroImage: "/images/blog/a-puffer-hero.webp"
heroAlt: "Green Spotted Puffer in brackish biotope tank"
ogImage: "/images/blog/a-puffer-og.webp"
author: "Endemic Editorial"
leadMagnet: "puffer-biotope-cheatsheet"
relatedSpecies: ["tetraodon-mbu", "carinotetraodon-travancoricus", "colomesus-asellus", "tetraodon-lineatus", "tetraodon-miurus", "dichotomyctere-nigroviridis"]
relatedDiscoverers: ["pieter-bleeker", "george-albert-boulenger", "maurice-kottelat"]
relatedBiotopes: ["congo-basin", "rio-negro", "pamba-river", "mekong-river", "nile-river"]
seo:
  title: "11 Freshwater Puffer Species & Their Native Rivers | Endemic Field Notes"
  description: "Complete guide to aquarium puffers with biotope data: water params, native range, discoverer history. Includes Mbu, Pea, Fahaka, Amazon, and 7 more."
---

# Article content...
```

### 1.3 Image Requirements Per Article

| Article | Hero Image | OG Image | Inline Figures |
|---------|-----------|----------|----------------|
| a-puffer | Puffer collage / GSP hero | Puffer species grid | 12 species photos, tooth diagram, genome size chart |
| b-bleeker | Bleeker portrait + Atlas plate | Clown Loach + Atlas plate | Market scene, Atlas plate, species grid, banishment map |
| c-etymology | Latin dictionary aesthetic | Name breakdown infographic | Suffix table, 20 decoded names, pitfall examples |
| d-schott | Schott portrait + Anthurium | Anthurium crystallinum | Schönbrunn greenhouse, living vs herbarium, Icones plate |
| e-pink-princess | Pink Princess stem closeup | Patent diagram + chimera | L1/L2/L3 diagram, variegation types, buyer checklist |
| f-rio-negro | Rio Negro blackwater tank | Water params infographic | Igapó forest, substrate layers, botanicals, timeline |

---

## 🔗 Phase 2: Cross-Linking Integration (Week 1-2)

### 2.1 Species ↔ Article Links

**In Article Markdown:**
```markdown
The [Mbu Puffer]{species=tetraodon-mbu} from the [Congo Basin]{biotope=congo-basin} was described by [Boulenger]{discoverer=george-albert-boulenger}.
```

**Remark Plugin** transforms to:
```jsx
<SpeciesLink slug="tetraodon-mbu">Mbu Puffer</SpeciesLink>
<BiotopeLink slug="congo-basin">Congo Basin</BiotopeLink>
<DiscovererLink slug="george-albert-boulenger">Boulenger</DiscovererLink>
```

### 2.2 Article → App Page Links

| Article | Links To |
|---------|----------|
| a-puffer | `/aquatrack/species/tetraodon-mbu`, `/aquatrack/biotope/congo-basin`, `/aquatrack/species/carinotetraodon-travancoricus` |
| b-bleeker | `/read/discoverer/pieter-bleeker`, `/aquatrack/species/chromobotia-macracanthus` |
| c-etymology | `/aquatrack/species/*` (all species pages get "Name Meaning" section) |
| d-schott | `/floratrack/species/anthurium-crystallinum`, `/floratrack/genus/anthurium` |
| e-pink-princess | `/floratrack/species/philodendron-erubescens`, `/gear` (tissue culture gear) |
| f-rio-negro | `/aquatrack/biotope/rio-negro`, `/gear/biotope/rio-negro` |

### 2.3 App Page → Article Backlinks

Add to species/biotope/discoverer pages:
```tsx
<RelatedFieldNotes>
  <h3>Read the Field Notes</h3>
  <ArticleCard post={pufferArticle} />
  <ArticleCard post={bleekerArticle} />
</RelatedFieldNotes>
```

---

## 📁 Phase 3: Content Layer Updates (Week 2)

### 3.1 Update `src/lib/blog.ts`

Add new posts to index, categories, tags, series.

### 3.2 Update Search Index

Regenerate `public/search-index.json` with new articles.

### 3.3 Update Sitemap & RSS

Auto-included via `generateStaticParams` + `sitemap.ts`.

---

## 🎨 Phase 4: Visual Assets (Parallel)

### 4.1 Image Sourcing Strategy

| Source | Use Case |
|--------|----------|
| **Pexels/Unsplash** | Hero images, species photos (CC0) |
| **FishBase** | Scientific illustrations (with attribution) |
| **Biodiversity Heritage Library** | Historical plates (Bleeker Atlas, Schott Icones) |
| **Custom renders** | Diagrams (chimera layers, water params, tooth structure) |
| **User submissions** | Tank photos (with permission) |

### 4.2 Optimization Pipeline

```bash
# scripts/optimize-images.ts
sharp(input)
  .webp({ quality: 85 })
  .avif({ quality: 70 })
  .resize(1920, null, { withoutEnlargement: true })
  .toFile(output)
# Generate: 400w, 800w, 1200w, 1920w + blur placeholder (20px)
```

---

## 📋 Implementation Checklist

### Article Generation
- [ ] Write generation script (`scripts/generate-articles.ts`)
- [ ] Create expansion prompts per article (6 prompts)
- [ ] Run generation → review → edit → finalize
- [ ] Inject frontmatter with all cross-link IDs
- [ ] Save to `content/blog/`

### Cross-Linking
- [ ] Build remark plugin for `{species=}`, `{biotope=}`, `{discoverer=}` syntax
- [ ] Map all slug IDs to app routes
- [ ] Add `RelatedFieldNotes` component to species/biotope/discoverer pages
- [ ] Add `SpeciesPanel` / `BiotopePanel` / `DiscovererPanel` to article sidebar

### Content Layer
- [ ] Update `src/lib/blog.ts` with new posts
- [ ] Regenerate search index
- [ ] Verify `generateStaticParams` picks up new slugs

### Images
- [ ] Source 6 hero + 6 OG + ~30 inline images
- [ ] Run optimization pipeline
- [ ] Add to `public/images/blog/`
- [ ] Update frontmatter paths

### Testing
- [ ] `npm run build` passes
- [ ] All 6 article pages render
- [ ] Cross-links work (click species → species page)
- [ ] Backlinks work (species page → article)
- [ ] Search finds new articles
- [ ] RSS feed includes new posts
- [ ] Sitemap includes new URLs
- [ ] OG images render correctly (test with Meta Debugger)

---

## 🚀 Quick Start Commands

```bash
# 1. Copy outlines to project for reference
mkdir -p content/outlines
cp /mnt/c/Users/wowth/Downloads/*-outline\ \(2\).md content/outlines/
cp /mnt/c/Users/wowth/Downloads/b-bleeker-outline\ \(3\).md content/outlines/

# 2. Create generation script
touch scripts/generate-articles.ts

# 3. Run generation (after writing prompts)
npx tsx scripts/generate-articles.ts

# 4. Optimize images
npx tsx scripts/optimize-images.ts

# 5. Build & verify
npm run build
npm run dev
# Visit http://localhost:3000/read/a-puffer
```

---

## 💡 Key Decisions Needed

1. **Who writes the expansions?** LLM (you) + human edit, or fully human?
2. **Image budget?** Pexels/Unsplash free vs commissioned illustrations
3. **Cross-link syntax?** Custom `{type=slug}` vs `[[wiki-link]]` vs shortcodes
4. **Author voice?** "Endemic Editorial" (brand) vs named authors
5. **Lead magnets?** Create PDFs for each category (puffer cheatsheet, bleeker timeline, etc.)

---

## 📄 Next Steps

1. **Confirm approach** — LLM generation + human polish?
2. **I write the 6 expansion prompts** — one per article
3. **You review/approve prompts** — adjust tone, length, emphasis
4. **I generate articles** — output to `content/blog/`
5. **We integrate cross-links** — remark plugin + app components
6. **Images & deploy**

Want me to start with the expansion prompts?
