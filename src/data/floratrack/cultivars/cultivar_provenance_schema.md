# Cultivar Provenance Data Model — Controversy-Aware Schema

**Version:** 1.0
**Purpose:** Structured representation of cultivar provenance that natively supports disputed origins, conflicting claims, and unresolved debates.

## File Structure

Two files work together:

1. `cultivar_provenance.jsonl` — master record, one entry per cultivar/wild species
2. `controversy_index.json` — separate index of all known debates (for surfacing)

## Record Schema

```jsonc
{
  // === Identity ===
  "id": "philodendron-pink-princess",           // slug: genus-cultivar_name
  "genus": "Philodendron",
  "epithet": "Pink Princess",                   // cultivar name or species epithet
  "canonical_name": "Philodendron erubescens 'Pink Princess'",
  "trade_names": ["Pink Princess Philodendron", "Pink Princess"],
  
  // === Classification ===
  "plant_type": "cultivar",                     // "cultivar", "wild_species", "trade_name", "unknown"
  "research_status": "researched",              // "researched", "needs_work", "unknown"
  
  // === Origin (structured for disputes) ===
  "origin": {
    "status": "disputed",                       // "confirmed", "disputed", "uncertain", "unknown"
    "overall_confidence": "low",                // "verified", "high", "medium", "low"
    "claims": [
      {
        "label": "Deliberate hybrid by McColley",
        "originator": "Robert McColley",
        "location": "Bamboo Nurseries, Orlando FL",
        "year": "~1970s",
        "mechanism": "intentional_hybrid",      // "intentional_hybrid", "spontaneous_mutation",
                                                // "sport_selection", "tissue_culture", "tissue_culture_sport"
        "proponents": ["Trade literature", "Shane Walsh (YouTube)"],
        "evidence": ["Widely repeated in trade"],
        "weaknesses": ["No patent", "No breeding record", "No nursery catalog surfaced"],
        "strength": "weak",
        "sources": ["https://www.thebotanicalarchive.com/..."],
        "last_checked": "2026-06-22"
      },
      {
        "label": "Tissue culture sport",
        "originator": "Unknown (natural mutation, selected by propagator)",
        "location": null,
        "year": "~1970s",
        "mechanism": "tissue_culture_sport",
        "proponents": ["Scientific consensus (inferred)"],
        "evidence": ["Unstable variegation", "Somaclonal variation patterns typical of TC"],
        "weaknesses": [],
        "strength": "moderate",
        "sources": ["Khumkarjorn 2025 micropropagation study"],
        "last_checked": "2026-06-22"
      }
    ],
    "notes": "2025 study confirms it is P. erubescens regardless of origin mechanism"
  },
  
  // === Parentage (can have multiple conflicting formulas) ===
  "parentage": {
    "status": "uncertain",
    "claims": [
      {
        "formula": "Philodendron erubescens",
        "type": "species_formula",              // "species_formula", "hybrid_formula", "mutation"
        "confidence": "likely",
        "sources": ["Morphological analysis", "2025 micropropagation study"]
      }
    ]
  },
  
  // === Patent (can have conflicting patent claims) ===
  "patent": {
    "status": "none",                           // "granted", "pending", "none", "disputed"
    "claims": [
      {
        "patent_id": null,
        "holder": null,
        "status": "unpatented",
        "confidence": "high"
      }
    ],
    "notes": "Parent of patented mutant EM0003 (PP36881) but no patent on Pink Princess itself"
  },
  
  // === Year introduced ===
  "introduced_year": {
    "status": "disputed",
    "claims": [
      {"year": "~1970s", "confidence": "low", "source": "Trade attribution"},
      {"year": "~1980s", "confidence": "very_low", "source": "Some nursery claims"}
    ]
  },
  
  // === Linked entries from other data sources ===
  "evidence": [
    {
      "source_url": "https://www.thebotanicalarchive.com/...",
      "document": "Botanical Archive",
      "confidence": "medium",
      "evidence_type": "direct_statement"
    }
  ],
  
  // === Active controversies (indexable) ===
  "controversies": [
    {
      "id": "pink-princess-origin",
      "topic": "origin",                        // "origin", "patent", "parentage", "naming", "classification", "year"
      "title": "Was Pink Princess a deliberate hybrid or a lucky sport?",
      "summary": "Two competing theories: McColley's intentional hybrid vs. spontaneous TC sport. No records exist to resolve.",
      "key_question": "Did Robert McColley actually breed this, or was it just a sport that got his name attached?",
      "status": "unresolved",                   // "resolved", "unresolved", "unlikely_to_resolve"
      "resolvable": true,                       // could more evidence settle it?
      "last_updated": "2026-06-22"
    }
  ],
  
  // === Filtering tags ===
  "tags": ["origin-debate", "unpatented", "mc-colley", "tissue-culture"]
}
```

## Controversy Topics

| Topic | Description |
|-------|-------------|
| `origin` | Who created/developed it, where, how |
| `patent` | Whether it's patented, by whom, conflicting patent claims |
| `parentage` | What the actual parentage/formula is |
| `naming` | Same name used for different plants, or different names for same plant |
| `classification` | Cultivar vs. wild species vs. trade name |
| `year` | Conflicting introduction dates |

## Controversy Statuses

| Status | Meaning |
|--------|---------|
| `resolved` | Widely accepted answer exists |
| `unresolved` | Active debate, no consensus |
| `unlikely_to_resolve` | Evidence likely lost to history |
| `mislabeling` | Not a real debate — just a naming error that propagated |

## Tags

Controlled vocabulary for cross-cutting concerns:

- `origin-debate` — origin is disputed
- `unpatented` — no patent exists
- `patent-disputed` — patent claims conflict
- `mislabeling` — wrong name propagated in trade
- `naming-controversy` — same name, different plants
- `wild-species-misidentified-as-cultivar`
- `tissue-culture` — TC origin involved
- `mc-colley` — McColley breeding line
- `costa-farms` — Costa Farms involved
- `thai-nursery` — Thai origin
- `need-patent-verification` — patent claim unverified

## Query Examples

```python
# All unresolved debates
[ent for ent in data if any(c["status"] == "unresolved" for c in ent["controversies"])]

# All origin debates
[ent for ent in data if any(c["topic"] == "origin" for c in ent["controversies"])]

# All by genus
[ent for ent in data if ent["genus"] == "Philodendron"]

# All with tag
[ent for ent in data if "mislabeling" in ent["tags"]]
```
