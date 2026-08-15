# Cultivar Data Cross-Reference

**Generated:** 2026-06-22
**Source:** The Commercial Canopy Analysis (academic research document, 12 genus tables)

## Coverage Summary

| Metric | Value |
|--------|-------|
| Research document evidence rows | 99 |
| Target list cultivars (JSON) | 68 |
| Cross-reference matches (research ↔ target) | 26 |

## Genera Breakdown

| Genus | Research Doc | Target List |
|-------|:-----------:|:-----------:|
| Aglaonema | — | 10 |
| Alocasia | 10 | 7 |
| Anthurium | 7 | — |
| Begonia | 6 | 10 |
| Calathea | 7 | — |
| Epipremnum | 12 | 9 |
| Ficus | 6 | — |
| Hoya | 7 | — |
| Monstera | 3 | 7 |
| Peperomia | 8 | — |
| Philodendron | 21 | 20 |
| Scindapsus | 4 | — |
| Syngonium | 8 | 5 |
| **Total** | **99** | **68** |

## Data Quality (Research Document)

| Grade | Count | Criteria |
|-------|:-----:|----------|
| High | TBD | Patent ID + originator or parentage verified |
| Medium | TBD | Originator or patent ID present |
| Low | TBD | Some data present but no patent or originator |

## Gaps

- **5 genera in research doc not in target list:** Anthurium, Hoya, Calathea, Ficus, Peperomia (plus Scindapsus, Pilea)
- **1 genus in target list not in research doc:** Aglaonema
- **Research document also supplies:** verified parentage for target-list cultivars missing it (e.g., Pink Princess → McColley, Birkin → Rojo Congo sport)

## Files

| File | Description |
|------|-------------|
| `The Commercial Canopy Analysis.txt` | Original research document (12 genus sections) |
| `cultivar_target_list.csv` | 68-row target list (CSV) |
| `cultivar_target_list.json` | 68-row target list (JSON, structured) |
| `cultivar_target_list.xlsx` | 68-row target list (Excel, 4 sheets) |
| `cultivar_evidence.jsonl` | 99-row extracted evidence from research doc |
| `cultivar-research-brief.md` | Earlier research prompt for top 300 cultivars |
