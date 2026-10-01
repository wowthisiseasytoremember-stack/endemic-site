import type { Metadata } from "next";

import { RabbitHoleSubjectView } from "@/components/product";
import { PINK_PRINCESS_RI_V1 } from "@/components/product/pinkPrincessRiData";
import { projectResearchIntelligenceToRabbitHole } from "@/components/product/riAdapter";

export const metadata: Metadata = {
  title: "Pink Princess — Endemic Prototype",
  description:
    "A provenance-first Pink Princess rabbit hole driven by accepted BioTrack Research Intelligence.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const pinkPrincessModel = projectResearchIntelligenceToRabbitHole(
  PINK_PRINCESS_RI_V1,
  {
    title: "Pink Princess",
    scientificName: "Philodendron erubescens 'Pink Princess'",
    eyebrow: "FloraTrack field note · BioTrack RI",
    lead:
      "The useful part of this plant's paper trail is what we can prove — and what the accepted record refuses to pretend it knows.",
    accent: "flora",
    mediaKey: "pink-princess-hero-ccby2-cliff-landscape",
    primaryInteresting: {
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
        locator: "src:4422a6d2a2f7041ff442e35b",
      },
    },
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
        question: "Who actually originated Pink Princess?",
        target: "historical breeder / introduction evidence",
        relationshipHint: "not established in accepted v1",
        state: "RESEARCHING",
      },
      {
        id: "why-unknown",
        question: "Why not just repeat the nursery origin story?",
        target: "source-backed provenance",
        relationshipHint: "existing prose is not evidence",
        state: "RESEARCHING",
      },
    ],
    documents: [
      {
        id: "biotrack-pink-princess-ri-v1",
        title: "BioTrack Research Intelligence Packet v1",
        institution: "BioTrack Release Authority",
        year: 2026,
        detail:
          "Accepted v1 relationship proving EM0003 derives from Pink Princess while leaving the original breeder/originator unresolved.",
        identifier:
          "SHA-256: 08cf445aac9bb6b4cf4c69a1e27532df7ee0705365e567b6b89ad2cc6881f9cc",
      },
    ],
  }
);

export default function PinkPrincessPrototypePage() {
  return <RabbitHoleSubjectView model={pinkPrincessModel} />;
}
