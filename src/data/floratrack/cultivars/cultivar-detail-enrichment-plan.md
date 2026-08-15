# Cultivar Detail Enrichment — Sprint Plan

## Goal
Extract description-level provenance data (origin stories, parentage, trade names, introduced years) from nursery product detail pages — without visiting each page individually.

## Why this works now
All three high-value nursery sources expose Shopify JSON APIs:
- **Gabriella Plants**: 170 products, 169 with descriptions
- **Costa Farms**: Shopify store, all products have body_html  
- **Altman Plants**: 155 products via `/collections/all/products.json`

One API call per source. No browser needed.

## Approach

### Phase 1: Shopify Evidence Extractor
Build `scripts/ingestion/shopify_evidence_extractor.py`:

1. **Fetch** — `/collections/{collection}/products.json?limit=250` for a given nursery
2. **Parse body_html** — strip tags, extract plaintext description
3. **Classify** — for each product, detect whether the description contains:
   - Origin story ("originated at", "discovered by", "sport of", "cultivar of")
   - Parentage info ("hybrid of", "cross between", "seedling of")
   - Trade names / synonyms ("also known as", "previously called", "syn:")
   - Introduced year ("introduced in", "since YYYY", "YYYY,")
   - Originator ("bred by", "developed by", "propagated by")
4. **Output** — per-nursery JSONL evidence file

### Phase 2: Run Against All Shopify Sources
| Source | Products | Evidence value | 
|--------|----------|----------------|
| Gabriella Plants (philodendron) | 170 | High — small nursery, many origin stories |
| Costa Farms (all-plants) | ~300+ | Medium — large grower, some origin data |
| Altman Plants (all) | 155 | Low — mostly succulents, brief descriptions |

### Phase 3: Costa Farms + Proven Winners Detail Crawl
Non-Shopify detail pages that still have useful data:
- **Proven Winners** — 10 Philodendron detail pages, likely have breeder/series info. Use browser for these.
- **Costa Farms non-patent pages** — but Costa IS Shopify (above), so this is covered.

### Phase 4: Merge into Provenance
Run `merge_adapter_evidence.py` with the new evidence files to update existing provenance records and create new ones for cultivars we haven't documented.

## Priority
1. ✅ **Gabriella Plants** — highest yield (169/170 with descriptions, small nursery = unique origin stories) — **did this session**
2. ➡️ **Costa Farms full catalog** — medium yield, ~300 products, includes non-tropicals
3. ❄️ **Proven Winners detail pages** — low volume (10), may have breeder data
4. ❄️ **Altman Plants descriptions** — mostly succulents, lowest priority
