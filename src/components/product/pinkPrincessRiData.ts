import type { ResearchIntelligencePacketInput } from "./riAdapter";

/**
 * Static projection of BioTrack Research Intelligence Packet v1
 * Source: content-factory/research/biotrack/pink-princess-ri-v1.md
 * Release: biotrack-20260918-v1
 * Graph SHA-256: 08cf445aac9bb6b4cf4c69a1e27532df7ee0705365e567b6b89ad2cc6881f9cc
 */
export const PINK_PRINCESS_RI_V1: ResearchIntelligencePacketInput = {
  subject: "Philodendron erubescens 'Pink Princess'",
  subject_id: "node:organism:philodendron_erubescens_pink_princess",
  biotrack_release: "biotrack-20260918-v1",
  biotrack_graph_sha256:
    "08cf445aac9bb6b4cf4c69a1e27532df7ee0705365e567b6b89ad2cc6881f9cc",
  decision: "USE_WITH_RESEARCH",
  safe_anchors: [
    "The accepted BioTrack graph records Philodendron 'EM0003' as derived from Pink Princess.",
  ],
  findings: [
    {
      status: "SUPPORTED",
      text: "EM0003 has the accepted derived-from relationship to Pink Princess.",
    },
    {
      status: "CORPUS_GAP",
      text: "Pink Princess original breeder or originator is not established by accepted v1.",
    },
  ],
  warnings: [
    "The accepted release does not establish Pink Princess's original breeder, inventor, selector, or discoverer.",
    "Do not fill that gap from repeated nursery copy or existing editorial prose.",
  ],
  next_receipts: [
    "A primary historical breeder or origin receipt, if that detail matters to the story.",
  ],
  receipts: [
    {
      source_id: "src:4422a6d2a2f7041ff442e35b",
      locator_id: "extracted_text_span:2475-2577:55bdb1e7fc5e6449",
      role: "external_raw",
      note: "Accepted source receipt for the EM0003 derived-from Pink Princess relationship.",
    },
  ],
};
