/**
 * Public-facing rounded metrics drawn from checked-in corpus snapshots.
 * The counts represent entries across datasets, not de-duplicated accepted taxa
 * or the count of pages currently available to browse on Endemic.
 *
 * FloraTrack: MASTER.md, July 14 2026 — 3,066 botanical species,
 *   2,593 distinct cultivar provenance records.
 * AquaTrack: data/species_traits_coverage.json — 1,669 fish records.
 * AquaTrack: data/species_traits_plants.json — 840 aquatic-plant records.
 *
 * Review these figures when refreshing the source corpora.
 */
export const ecosystemFacts = [
  {
    value: "5,500+",
    label: "organism records indexed",
    detail: "Combined botanical, fish, and aquatic-plant dataset entries",
  },
  {
    value: "3,000+",
    label: "botanical species",
    detail: "FloraTrack's documented plant database",
  },
  {
    value: "2,500+",
    label: "cultivar provenance records",
    detail: "Research leads from nursery and patent-related sources",
  },
  {
    value: "154",
    label: "countries in distribution data",
    detail: "Aquatic species distribution-country index",
  },
] as const;

export const corpusDisclosure =
  "Rounded counts from source dataset inventories, not live unique-species totals. Some overlap and unverified source leads remain; public app and research demonstrations are works in progress.";
