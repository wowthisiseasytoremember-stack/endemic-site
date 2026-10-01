import type { ResearchIntelligencePacketInput } from "./riAdapter";

/**
 * Static projection of BioTrack Research Intelligence Packet v1
 * Source: content-factory/research/biotrack/cardinal-tetra-ri-v1.md
 * Release: biotrack-20260918-v1
 * Graph SHA-256: 08cf445aac9bb6b4cf4c69a1e27532df7ee0705365e567b6b89ad2cc6881f9cc
 */
export const CARDINAL_TETRA_RI_V1: ResearchIntelligencePacketInput = {
  subject: "Paracheirodon axelrodi",
  subject_id: "node:organism:paracheirodon_axelrodi",
  biotrack_release: "biotrack-20260918-v1",
  biotrack_graph_sha256:
    "08cf445aac9bb6b4cf4c69a1e27532df7ee0705365e567b6b89ad2cc6881f9cc",
  decision: "USE_WITH_RESEARCH",
  source_item:
    "knowledge-base/discoverers/04-controversies-and-factchecks.md#6-leonard-schultz--atomic-fish--the-naming-race",
  safe_anchors: [
    "The accepted BioTrack graph records Leonard P. Schultz as `described_by` in 1956.",
    "The accepted BioTrack graph records Herbert R. Axelrod as `named_for`.",
  ],
  findings: [
    {
      status: "SUPPORTED",
      text: "Schultz is the recorded describer.",
    },
    {
      status: "SUPPORTED",
      text: "Axelrod is the recorded namesake.",
    },
    {
      status: "CORPUS_GAP",
      text: "the accepted graph does not by itself prove the original combination `Cheirodon axelrodi`.",
    },
    {
      status: "CORPUS_GAP",
      text: "the accepted graph does not by itself prove publication in `Tropical Fish Hobbyist`.",
    },
    {
      status: "CORPUS_GAP",
      text: "the accepted graph does not by itself prove a one-day Myers/Weitzman naming race or motive.",
    },
    {
      status: "CORPUS_GAP",
      text: "the accepted graph does not by itself prove the Bikini/irradiated-fish narrative.",
    },
  ],
  warnings: [
    "Do not present the hobby-magazine publication, one-day race, motive, or Bikini/irradiated-fish details as BioTrack-supported facts from this release.",
  ],
  next_receipts: [
    "Targeted primary/source receipts for the original combination and publication venue.",
    "Targeted source receipts for the Myers/Weitzman timing claim.",
    "Targeted source receipts for the Bikini/irradiated-fish claim if it remains editorially useful.",
  ],
  receipts: [
    {
      source_id: "src:bb14d1c844422998a3a283fc",
      locator_id: "extracted_text_span:68946-68964:341c591f3cb27665",
      role: "external_raw",
      note: "Taxon-to-identity context receipt: cheirodon axelrodi",
    },
    {
      source_id: "src:bb14d1c844422998a3a283fc",
      locator_id: "extracted_text_span:69720-69738:341c591f3cb27665",
      role: "external_raw",
      note: "Expanded author identity receipt: Leonard P. Schultz",
    },
    {
      source_id: "src:e44a2165cbbe5c5bdc6f7cae",
      locator_id: "extracted_text_span:69-101:7fad11a7ec5e22a5",
      role: "external_raw",
      note: "Original-combination authorship receipt: Cheirodon axelrodi Schultz, 1956",
    },
    {
      source_id: "src:e44a2165cbbe5c5bdc6f7cae",
      locator_id: "extracted_text_span:266-348:7fad11a7ec5e22a5",
      role: "external_raw",
      note: "Eponym receipt: named for author, publisher of pet care books, and entrepreneur Herbert R. Axelrod",
    },
  ],
};
