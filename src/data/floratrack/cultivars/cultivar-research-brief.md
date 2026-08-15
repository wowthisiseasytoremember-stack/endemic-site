# Research Brief: Top 1-300 Most Popular Aroid & Tropical Cultivars

## Goal

Find originator, introduced year, and patent status for the ~300 most popular cultivars of aroids, gesneriads, begonias, and terrarium plants — primarily Philodendron, Monstera, Anthurium, Alocasia, Syngonium, Scindapsus, Hoya, Calathea, Ficus, Pilea, Peperomia, and Begonia.

## Research Method

For each cultivar, search horticultural sources — NOT botanical databases. These are man-made hybrids, not wild species.

### Primary sources (in order of reliability):
1. **US Plant Patents** (Google Patents, Justia) — manually via browser (these sites block automated access)
2. **International Cultivar Registration Authorities (ICRAs)** — check for Araceae/Orchidaceae registries
3. **Commercial nursery catalogs** — Costa Farms, Gabriella Plants, Steve's Leaves, BWH Plant Co, Canopy Plant Co
4. **Horticultural society records** — Royal Horticultural Society (RHS), American Begonia Society, International Aroid Society
5. **Hobbyist growing guides** on specialized aroid blogs and forums
6. **Wikipedia** — some popular cultivars have entries

### What to capture per cultivar:
- **Cultivar name** (e.g. "Pink Princess", "Thai Constellation")
- **Genus** (e.g. Philodendron, Monstera)
- **Parentage/hybrid cross** if known (e.g. Philodendron × unknown)
- **Originator** — the person/company who bred it
- **Introduced year** — year it was first released to market
- **Patent status** — patented (include patent number), unpatented, or unknown
- **Trade name** — commonly used market name (may differ from registered name)
- **Source URL** for each data point

### Priority order (100-300 cultivars total):
1. **Philodendron** — start with: Pink Princess, White Wizard, White Knight, White Princess, Florida Ghost, Florida Green, Mamei, Silver Sword, Micans, Melanochrysum, Gloriosum, Verrucosum, Sodiroi, Paraiso Verde, Burle Marx, Brandtianum, Spiritus Sancti, Tortum, Joepii, Billietiae, Atabapoense, El Choco Red, Campii, Fibraecataphyllum, Mayoi, Gigas, Rugosum, Thai Sunrise, Golden Dragon, Lime Fiddle, Narrow Escape, Silver Cloud, Marble Planet, Strawberry Shake, Pink Marble, Variegated Burle Marx, Variegated Adansonii — and similar.
2. **Monstera** — Thai Constellation, Albo Borsigiana, Aurea, Variegata, Mint, Deliciosa forms
3. **Anthurium** — Warocqueanum, Crystallinum, Regale, Clarinervium, Magnificum, Veitchii, Dorayaki, Forgetti, Luxurians, Papillilaminum hybrids, Queen of Hearts, Ace of Spades
4. **Alocasia** — Dragon Scale, Silver Dragon, Black Velvet, Frydek, Macrorrhiza Variegata, Cuprea, Jacklyn, Wentii, Regal Shield, Polly, Bambino
5. **Syngonium** — Neon Robust, Albo Variegatum, Strawberry, Milk Confetti, Pink Splash, Three Kings, Red Spot, Holly M
6. **Hoya** — Compacta, Krinkle 8, Carnosa Tricolor, Krimson Queen, Kerrii, Linearis, Serpens, Callistophylla, Polyneura, Sunrise, Obovata
7. **Calathea** — Orbifolia, Makoyana, Ornata, Rufibarba, Dottie, White Fusion, Medallion, Zebrina
8. **Scindapsus** — Silvery Ann, Exotica, Silver Hero, Jade Satin, Moonlight
9. **Begonia** — Maculata, Escargot, Rex hybrids, Gryphon, Angel Wing varieties
10. **Ficus** — Tineke, Ruby, Burgundy, Elastica Shivereana, Triangularis, Audrey, Benghalensis
11. **Peperomia / Pilea** — Peperomioides, Obtusifolia Variegata, Caperata Rosso, Watermelon, Prostrata, Graveolens

## Known data (do not re-research):
- **Philodendron Pink Princess**: unpatented, originator Robert McColley (1970s), introduced ~1970. Parent of patented mutant EM0003 (PP36881).

## Output format

Return as a structured CSV or markdown table matching the existing seed schema:

```
genus,cultivar_name,trade_name,introduced_year,originator,patent_id,parentage,source_url
Philodendron,Pink Princess,Pink Princess Philodendron,1970,Robert McColley,unpatented,unknown,https://patents.google.com/patent/USPP36881
```

## Constraints
- Do NOT use Tropicos, POWO, IPNI, or GBIF — those are for wild species, not cultivated hybrids
- Each data point needs a verifiable source URL
- "Introduced year" means market release, not year of creation
- If data is unverifiable for a given cultivar, mark it as "unknown" — better honest gaps than fabricated data
- Focus on the 50-100 most popular/most traded cultivars first, then expand to 300
