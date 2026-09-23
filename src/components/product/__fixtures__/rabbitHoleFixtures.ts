import type { RabbitHoleSubjectModel } from "../RabbitHoleTypes";

/**
 * DESIGN FIXTURES ONLY.
 *
 * These objects exist to exercise the visual system and composed subject view.
 * They are not a serving-data authority and must never replace accepted BioTrack
 * release/RI data in production.
 */

export const CARDINAL_DESIGN_FIXTURE: RabbitHoleSubjectModel = {
  id: "design-fixture:cardinal-tetra",
  trail: [
    { label: "Field Notes", context: "entry" },
    { label: "Cardinal Tetra", context: "subject" },
  ],
  eyebrow: "AquaTrack field note",
  title: "Cardinal Tetra",
  scientificName: "Paracheirodon axelrodi",
  lead:
    "Its paper trail separates the person who described it from the person it was named for — and keeps getting stranger from there.",
  accent: "aqua",
  interesting: [
    {
      id: "role-split",
      kicker: "Two people, two different roles",
      title: "The describer is not the namesake.",
      relationship: {
        subject: "Paracheirodon axelrodi",
        predicate: "described by",
        object: "Leonard P. Schultz",
        year: 1956,
      },
      receipt: {
        sourceLabel: "BioTrack accepted v1",
        relationship: "described_by · 1956",
        releaseId: "biotrack-20260918-v1",
        note:
          "The accepted graph separately records Herbert R. Axelrod as the namesake.",
      },
    },
    {
      id: "original-name",
      kicker: "The first paper trail",
      title: "It first appeared under a different scientific name.",
      body:
        "Merged, source-audited targeted research records Schultz's 1956 description as Cheirodon axelrodi in Tropical Fish Hobbyist, volume 4, number 4.",
      receipt: {
        sourceLabel: "California Academy of Sciences — Catalog of Fishes",
        relationship: "original combination / publication identity",
        locator: "species record spid=4506",
        href:
          "https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatget.asp?spid=4506",
      },
    },
    {
      id: "priority",
      kicker: "A second 1956 name",
      title: "The competing names ended up before the ICZN.",
      body:
        "ICZN Opinion 485 formally addressed the relative priority of Cheirodon axelrodi and Hyphessobrycon cardinalis.",
      receipt: {
        sourceLabel: "International Commission on Zoological Nomenclature — Opinion 485",
        relationship: "relative priority of the competing 1956 names",
        locator: "Opinions and Declarations 17(7):87–104",
        href: "https://www.biodiversitylibrary.org/part/149624",
        note:
          "The BHL scan is not a default production image asset; use the bibliographic/link treatment unless commercial display rights are separately cleared.",
      },
    },
  ],
  threads: [
    {
      id: "first-name",
      question: "What was its first scientific name?",
      target: "Cheirodon axelrodi",
      relationshipHint: "original description",
      state: "SUMMARY",
      href: "#documents",
    },
    {
      id: "priority-thread",
      question: "Why did two names need an ICZN ruling?",
      target: "ICZN Opinion 485",
      relationshipHint: "nomenclatural priority",
      state: "SUMMARY",
      href: "#documents",
    },
    {
      id: "schultz-thread",
      question: "Who was Leonard Schultz outside this fish story?",
      target: "Operation Crossroads",
      relationshipHint: "separate Smithsonian research thread",
      state: "SUMMARY",
      href: "#documents",
    },
    {
      id: "motive-thread",
      question: "Was the competing name a deliberate publication race?",
      target: "motive / exact chronology",
      relationshipHint: "not established by current inspected evidence",
      state: "RESEARCHING",
    },
  ],
  unknowns: [
    {
      id: "motive-unknown",
      question: "Did Schultz deliberately rush publication to beat the competing name?",
      currentAnswer:
        "The current inspected evidence establishes the priority dispute, not a personal motive.",
      whatWouldResolve: [
        "contemporaneous correspondence describing publication intent",
        "a primary editorial record establishing motive",
      ],
      status: "CORPUS_GAP",
    },
  ],
  documents: [
    {
      id: "iczn-opinion-485",
      title: "ICZN Opinion 485",
      institution: "International Commission on Zoological Nomenclature",
      year: 1957,
      detail:
        "Formal ruling on the relative priority of Cheirodon axelrodi and Hyphessobrycon cardinalis.",
      identifier: "DOI 10.5962/p.149624 · 17(7):87–104",
      href: "https://www.biodiversitylibrary.org/part/149624",
      rightsNote:
        "Link/metadata treatment. Current BHL scan rights are noncommercial.",
    },
    {
      id: "schultz-crossroads",
      title: "Leonard P. Schultz — Operation Crossroads log",
      institution: "Smithsonian Institution Archives",
      year: 1946,
      detail:
        "Archive record for Schultz's reef-fish work during Operation Crossroads. Image display remains subject to the per-item rights gate in AquaScrape #45.",
      identifier: "SIA2010-0895 / Record Unit 7222",
      href: "https://siarchives.si.edu/collections/siris_sic_13871",
      rightsNote: "Use a document image only after the exact item-level rights manifest passes.",
    },
  ],
};

export const PINK_PRINCESS_DESIGN_FIXTURE: RabbitHoleSubjectModel = {
  id: "design-fixture:pink-princess",
  trail: [
    { label: "Field Notes", context: "entry" },
    { label: "Pink Princess", context: "subject" },
  ],
  eyebrow: "FloraTrack field note",
  title: "Pink Princess",
  scientificName: "Philodendron erubescens 'Pink Princess'",
  lead:
    "The accepted BioTrack record establishes one lineage relationship and deliberately leaves the original breeder question open.",
  accent: "flora",
  interesting: [
    {
      id: "em0003-lineage",
      kicker: "What the accepted release actually knows",
      title: "A later cultivar points back to Pink Princess.",
      relationship: {
        subject: "Philodendron 'EM0003'",
        predicate: "derived from",
        object: "Pink Princess",
      },
      receipt: {
        sourceLabel: "BioTrack accepted v1",
        relationship: "EM0003 · derived_from · Pink Princess",
        releaseId: "biotrack-20260918-v1",
      },
    },
  ],
  threads: [
    {
      id: "accepted-receipt",
      question: "What relationship do we actually know?",
      target: "EM0003 → Pink Princess",
      relationshipHint: "accepted v1",
      state: "SUMMARY",
      href: "#documents",
    },
    {
      id: "origin-proof",
      question: "What would prove Pink Princess's origin?",
      target: "historical breeder / introduction evidence",
      relationshipHint: "research question",
      state: "SUMMARY",
      href: "#unknowns",
    },
    {
      id: "patent-correction",
      question: "What does the patent correction show?",
      target: "PP36881 / PP31149 receipts",
      relationshipHint: "blocked until AquaScrape #50 + CF #276",
      state: "RESEARCHING",
    },
  ],
  unknowns: [
    {
      id: "originator",
      question: "Who originated Pink Princess?",
      currentAnswer:
        "The current accepted BioTrack evidence does not establish that person.",
      whyUnresolved:
        "A missing person relationship in the accepted corpus is not proof that the real-world history is unknowable.",
      whatWouldResolve: [
        "a dated breeder or nursery catalog",
        "an original introduction record",
        "a contemporaneous trade publication",
        "a qualifying registration or patent record tied to the claim",
      ],
      status: "CORPUS_GAP",
    },
  ],
  documents: [],
};
