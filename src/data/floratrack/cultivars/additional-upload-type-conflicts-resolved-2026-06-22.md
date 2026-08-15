# Additional Upload Type Conflicts — Resolved

**Date:** 2026-06-22
**Source:** `Addditinal plant data .txt` upload (73 entries parsed)
**Action:** Align 6 type conflicts to scientific consensus, add controversies

---

## Overview

6 entries from the upload where `plant_type` classification disagreed with the curated provenance dataset. All resolved by determining the scientifically most accurate classification as baseline, with structured controversies capturing alternative perspectives and trade confusion.

| Entry | Upload said | Provenance said | Resolution | Changed? |
|---|---|---|---|---|
| Alocasia Dragon Scale | cultivar | wild_species | **wild_species** (A. baginda) | No (already correct) |
| Alocasia Silver Dragon | cultivar | wild_species | **wild_species** (A. baginda variant) | No (already correct) |
| Alocasia Macrorrhiza Variegata | wild_species | cultivar | **cultivar** (variegated sport) | No (already correct) |
| Alocasia Jacklyn | cultivar | wild_species | **wild_species** (A. tandurusa) | No (already correct) |
| Hoya Compacta | wild_species | cultivar | **wild_species** | **YES** — changed |
| Peperomia Obtusifolia Variegata | wild_species | cultivar | **cultivar** (variegated sport) | No (already correct) |

## Per-Entry Detail

### 1. Alocasia Dragon Scale
- **Decision:** wild_species (keep)
- **Rationale:** Formally described as Alocasia baginda in 2011 — a wild species endemic to Borneo. Not a man-made cultivar. The textured leaves are a natural trait.
- **Updates:**
  - origin.status: unknown → known
  - Added claim `[{"label": "Alocasia baginda", "originator": "N/A (wild species)"}]`
  - parentage.confidence: medium → high, added POWO source
  - **Added controversy:** `alocasia-dragon-scale-type-confusion` — trade name confusion (widely sold as cultivar, actually wild species)
  - **Status:** resolved

### 2. Alocasia Silver Dragon
- **Decision:** wild_species (keep)
- **Rationale:** Natural variant of Alocasia baginda from Borneo. Not a hybrid or cultivar despite trade labeling.
- **Updates:**
  - origin: clarified as known with A. baginda variant claim
  - parentage: confirmed, confidence high
  - **Added controversy:** `alocasia-silver-dragon-type-confusion` — same trade name confusion pattern
  - **Status:** resolved

### 3. Alocasia Macrorrhiza Variegata
- **Decision:** cultivar (keep)
- **Rationale:** Variegated sport of A. macrorrhizos selected and propagated in cultivation. The variegated form does not exist as a wild population.
- **Updates:**
  - **Added controversy:** `alocasia-macrorrhiza-variegata-type-confusion` — some sources misclassify as wild species because the parent species is wild
  - **Status:** resolved

### 4. Alocasia Jacklyn
- **Decision:** wild_species (keep)
- **Rationale:** Formally described as Alocasia tandurusa in 2020. The trade name 'Jacklyn' preceded the botanical description, causing widespread cultivar confusion.
- **Updates:**
  - origin: status → known, added claim for A. tandurusa
  - parentage: confirmed with POWO reference
  - **Added controversy:** `alocasia-jacklyn-type-confusion` — trade name vs scientific name confusion
  - **Status:** resolved

### 5. Hoya Compacta
- **Decision:** wild_species (**CHANGED** from cultivar)
- **Rationale:** A naturally occurring spontaneous mutation/variety of Hoya carnosa. Not a man-made cultivar. The upload's classification as wild_species is more accurate than the previous cultivar label. The existing controversy (sport vs reclassification) captures the unresolved debate.
- **Updates:**
  - plant_type: cultivar → wild_species
  - origin: updated notes to reflect accurate classification, added claim
  - Added 3rd side to existing `hoya-compacta-origin` controversy noting the type reclassification
  - **Status:** resolved (classification) / unresolved (origin story — sport vs. reclassification debate remains in controversy_index)

### 6. Peperomia Obtusifolia Variegata
- **Decision:** cultivar (keep)
- **Rationale:** Variegated sport of Peperomia obtusifolia selected in cultivation. Does not occur naturally as a wild population.
- **Updates:**
  - **Added controversy:** `peperomia-obtusifolia-variegata-type-confusion` — some sources misclassify as wild species
  - **Status:** resolved

## Controversy Index Reference

The existing `controversy_index.json` entry `hoya-compacta-origin` remains linked to the updated Hoya Compacta provenance record. The 5 new controversies (Dragon Scale, Silver Dragon, Macrorrhiza Variegata, Jacklyn, Obtusifolia Variegata) are stored inline in the provenance records — not yet indexed in the controversy index file. Recommend indexing them at next curation pass.

## Backup

SSD backup ran clean at Mon Jun 22 08:27:51 UTC 2026.
- DB: `floratrack_2026-06-22_08-27-51.db` (2.3MB, vacuumed)
- Data: `cultivars_2026-06-22_08-27-51` (18 files)
- `cultivars_latest` symlink updated
