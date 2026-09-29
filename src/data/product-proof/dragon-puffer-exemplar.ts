import { proofMediaIdentityProps } from "./media";
import type { RabbitHoleSubjectModel } from "@/components/product";

export const DRAGON_PUFFER_EXEMPLAR: RabbitHoleSubjectModel = {
  id: "exemplar:dragon-puffer",
  trail: [
    { label: "Endemic", href: "/", context: "field notes" },
    { label: "AquaTrack", href: "/aquatrack", context: "fish" },
    { label: "Dragon Puffer", context: "exemplar" },
  ],
  eyebrow: "AquaTrack field note · source-reconciled exemplar",
  title: "Dragon Puffer",
  scientificName: "Pao palembangensis",
  lead:
    "A freshwater ambush puffer from Southeast Asia whose story is better than the usual care-sheet summary: the accepted genus changed, its name points back to Palembang, and captive reproduction has been documented under controlled conditions.",
  accent: "aqua",
  ...proofMediaIdentityProps("dragon-puffer-hero-ccby-sa4-abu-hamas"),
  interesting: [
    {
      id: "identity",
      kicker: "Identity",
      title: "This is Pao palembangensis — the Dragon or Humpback Puffer.",
      body:
        "Eschmeyer’s Catalog of Fishes treats Pao palembangensis as the valid name in Tetraodontidae. The original combination was Tetraodon palembangensis; older aquarium sources often still use that name. It is a freshwater species, not the brackish Figure 8 Puffer that has historically been confused with 'Palembang pufferfish.'",
      receipt: {
        sourceLabel: "Eschmeyer’s Catalog of Fishes",
        relationship: "current valid name / original combination / type locality",
        locator: "palembangensis, Tetraodon Bleeker 1852:25 · spid=61215",
        note:
          "Catalog updated 13 Aug 2026. Current status: valid as Pao palembangensis. Type locality: Palembang, Sumatra, Indonesia.",
        href:
          "https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=61215",
      },
    },
    {
      id: "range",
      kicker: "Range & habitat",
      title: "It is a true freshwater Southeast Asian puffer.",
      body:
        "FishBase records it as freshwater and demersal, distributed in Laos, Thailand, Malaysia and Indonesia, with records from lakes and rivers. Eschmeyer’s Catalog gives a broader Southeast Asian distribution including southern Thailand, Cambodia, Laos, Malaya, Sumatra and Borneo. FishBase’s Thailand record additionally notes peat habitats in peninsular Thailand and records from the Mekong, Chao Phraya and other drainages.",
      receipt: {
        sourceLabel: "FishBase + Eschmeyer’s Catalog of Fishes",
        relationship: "environment / geographic distribution",
        locator: "FishBase species 25179 · Catalog of Fishes Pao species record",
        note:
          "The sources differ slightly in country-level range wording; the page preserves the broader overlap rather than collapsing the disagreement.",
        href: "https://www.fishbase.se/summary/25179",
      },
    },
    {
      id: "size",
      kicker: "Scale",
      title: "Roughly a 20 cm fish built to sit still and strike.",
      body:
        "FishBase reports a maximum standard length of 19.4 cm. SeriouslyFish lists 195 mm standard length and characterizes the species as an unusually inactive ambush predator, with some individuals moving mainly when food is offered.",
      receipt: {
        sourceLabel: "FishBase + SeriouslyFish",
        relationship: "maximum size / behavior",
        locator: "FishBase 25179 · SeriouslyFish Tetraodon palembangensis profile",
        href:
          "https://www.seriouslyfish.com/species/tetraodon-palembangensis/",
      },
    },
    {
      id: "husbandry",
      kicker: "Aquarium care",
      title: "The husbandry problem is water quality, cover and feeding — not salinity.",
      body:
        "The existing SeriouslyFish profile recommends a 120 × 30 cm base for a single specimen, 24–28 °C, pH 6.8–7.6 and 8–20 dGH. It recommends driftwood, rock or cave-like cover, strong attention to water quality, and hard-shelled foods such as snails and unshelled shellfish to wear the continuously growing dental plates. Adults are described as sedentary enough to require relatively infrequent feeding.",
      receipt: {
        sourceLabel: "SeriouslyFish — repository-cached source",
        relationship: "aquarium size / temperature / pH / hardness / diet / maintenance",
        locator:
          "AquaTrack data/_scraper_cache/3181960c61aa84fa61d6b23a2a2161de.html",
        note:
          "This source was already captured in the AquaTrack repository before this exemplar was built.",
        href:
          "https://www.seriouslyfish.com/species/tetraodon-palembangensis/",
      },
    },
    {
      id: "breeding-paper",
      kicker: "The part most care sheets miss",
      title: "Captive reproduction has been documented in a peer-reviewed paper.",
      body:
        "Doi, Akita and Sakai reported a pair spawning three times from June through August 2003 in freshwater at 25–26 °C under a 12-hour light / 12-hour dark cycle. A stone pipe provided the spawning surface. Each batch contained about 100 eggs averaging 2.25 mm in diameter; hatching occurred 10 days after spawning, and larvae were initially fed Artemia.",
      receipt: {
        sourceLabel: "Aquaculture Science 70(2):197–199",
        relationship: "captive reproduction and larval development",
        locator: "DOI 10.11233/aquaculturesci.70.197",
        note:
          "Freshly retrieved for this exemplar; not found in the pre-existing Dragon Puffer repo material during the initial audit.",
        href:
          "https://www.jstage.jst.go.jp/article/aquaculturesci/70/2/70_197/_article",
      },
    },
    {
      id: "name",
      kicker: "Why the name sticks",
      title: "Palembang is not decorative Latin — it is the type locality.",
      relationship: {
        subject: "Pao palembangensis",
        predicate: "type locality",
        object: "Palembang, Sumatra",
        year: 1852,
        note:
          "The original Tetraodon palembangensis description is tied to Palembang in Sumatra, Indonesia.",
      },
      receipt: {
        sourceLabel: "Eschmeyer’s Catalog of Fishes",
        relationship: "original description / type locality",
        locator:
          "Tetraodon palembangensis Bleeker 1852:25 · Verhandelingen van het Bataviaasch Genootschap 24(10)",
        href:
          "https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=61215",
      },
    },
  ],
  threads: [
    {
      id: "breeding",
      question: "What did the successful captive breeding actually require?",
      target: "25–26 °C · L12:D12 · stone pipe · ~100 eggs",
      relationshipHint: "peer-reviewed captive reproduction",
      state: "SUMMARY",
      href: "#documents",
    },
    {
      id: "old-name",
      question: "Why do older aquarium sources call it Tetraodon palembangensis?",
      target: "original combination → Pao",
      relationshipHint: "taxonomic history",
      state: "SUMMARY",
      href: "#documents",
    },
    {
      id: "date-conflict",
      question: "Was Bleeker’s name published in 1851 or 1852?",
      target: "authority-year discrepancy",
      relationshipHint: "sources disagree on displayed year",
      state: "SUMMARY",
      href: "#unknowns",
    },
    {
      id: "pipeline",
      question: "Why did AquaTrack fail to surface a canonical Dragon Puffer record?",
      target: "Tetraodonpalembangensis normalization failure",
      relationshipHint: "internal pipeline repair in progress",
      state: "RESEARCHING",
    },
  ],
  corrections: [
    {
      id: "range-correction",
      oldClaim:
        "“Only Sumatra and Borneo.” — a current aquarium-trade article’s range summary",
      correctedClaim:
        "Current taxonomic/reference sources support a broader Southeast Asian range. FishBase lists Laos, Thailand, Malaysia and Indonesia; Eschmeyer’s Catalog also includes Cambodia and specifies Sumatra and Borneo within Indonesia.",
      scopeNote:
        "The Aquarium Glaser article remains useful for husbandry observations, but its narrow distribution statement is not used as the canonical range here.",
      receipt: {
        sourceLabel: "FishBase / Catalog of Fishes / Aquarium Glaser",
        relationship: "distribution-source reconciliation",
        note:
          "Fresh-source disagreement preserved explicitly instead of silently choosing one trade source.",
        href:
          "https://www.aquariumglaser.de/en/fisharchive/pao-palembangensis-formerly-tetraodon-palembangensis/",
      },
    },
  ],
  unknowns: [
    {
      id: "authority-year",
      question: "1851 or 1852?",
      currentAnswer:
        "The accepted species identity is clear, but sources display the authority year differently. FishBase and Wikimedia currently show (Bleeker, 1851); Eschmeyer’s Catalog gives the original publication as 1852 and notes that Kottelat (2013) dated it 1851.",
      whyUnresolved:
        "This is a bibliographic dating issue, not a species-identity dispute. The exemplar keeps 1852 on the original-description relationship because that is the publication year shown by the current Catalog of Fishes record, while preserving the conflict.",
      whatWouldResolve: [
        "canonical BioTrack database authority-year field and provenance",
        "inspection of the original Bleeker publication dating convention",
      ],
      status: "UNRESOLVED",
    },
    {
      id: "breeding-field-notes",
      question: "How reproducible is breeding in ordinary hobby aquaria?",
      currentAnswer:
        "A controlled captive spawning is documented in the scientific literature, and recent hobbyists have publicly reported repeated spawning. The project does not yet have a systematically verified husbandry series large enough to turn those anecdotes into a general breeding protocol.",
      whyUnresolved:
        "Recent Reddit breeder reports are valuable field notes but are not equivalent to replicated husbandry research.",
      whatWouldResolve: [
        "multiple documented breeder logs with stable water, pair, cave and feeding variables",
        "preserved Thai/Vietnamese breeding sources referenced by the AquaTrack SE-Asia research plan",
      ],
      status: "LEAD_ONLY",
    },
  ],
  documents: [
    {
      id: "jstage-breeding",
      title:
        "Reproduction and development in captivity of the Southeast Asian freshwater pufferfish Pao palembangensis",
      institution: "Aquaculture Science",
      year: 2022,
      detail:
        "Peer-reviewed short paper documenting three captive spawns, egg size, incubation period, temperature/light conditions and first feeding.",
      identifier: "70(2):197–199 · DOI 10.11233/aquaculturesci.70.197",
      href:
        "https://www.jstage.jst.go.jp/article/aquaculturesci/70/2/70_197/_article",
    },
    {
      id: "catalog",
      title: "Pao palembangensis / original Tetraodon palembangensis record",
      institution: "Eschmeyer’s Catalog of Fishes",
      year: 2026,
      detail:
        "Current nomenclatural status, original combination, original publication, type locality and broader Southeast Asian distribution.",
      identifier: "Catalog species record spid=61215 · online version updated 13 Aug 2026",
      href:
        "https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=61215",
    },
    {
      id: "fishbase",
      title: "Pao palembangensis species summary",
      institution: "FishBase",
      detail:
        "Freshwater status, family, maximum length, regional distribution, habitat notes, IUCN status and etymology of the genus Pao.",
      identifier: "FishBase species ID 25179",
      href: "https://www.fishbase.se/summary/25179",
    },
    {
      id: "seriouslyfish",
      title: "Tetraodon palembangensis — Humpback Puffer",
      institution: "SeriouslyFish",
      detail:
        "Older-name aquarium profile covering tank dimensions, water conditions, cover, diet, compatibility and rare captive spawning.",
      identifier:
        "Already cached in AquaTrack: data/_scraper_cache/3181960c61aa84fa61d6b23a2a2161de.html",
      href:
        "https://www.seriouslyfish.com/species/tetraodon-palembangensis/",
    },
    {
      id: "commons",
      title: "Pao palembangensis identity media",
      institution: "Wikimedia Commons / iNaturalist",
      year: 2016,
      detail:
        "Exact-subject photograph from Indonesia used as the exemplar hero. Licensed CC BY-SA 4.0.",
      identifier: "Pao palembangensis 263839696.jpg · Abu Hamas",
      href:
        "https://commons.wikimedia.org/wiki/File:Pao_palembangensis_263839696.jpg",
      rightsNote: "CC BY-SA 4.0; attribution required.",
    },
    {
      id: "glaser",
      title: "Pao palembangensis (formerly Tetraodon palembangensis)",
      institution: "Aquarium Glaser",
      year: 2026,
      detail:
        "Current trade/husbandry note useful for freshwater status, behavior and nomenclatural confusion; its narrow Sumatra/Borneo range statement conflicts with broader taxonomic/reference sources and is not treated as canonical.",
      href:
        "https://www.aquariumglaser.de/en/fisharchive/pao-palembangensis-formerly-tetraodon-palembangensis/",
    },
  ],
};
