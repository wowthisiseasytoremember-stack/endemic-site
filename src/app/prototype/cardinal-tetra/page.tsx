import type { Metadata } from "next";

import { RabbitHoleSubjectView } from "@/components/product";
import { CARDINAL_TETRA_RI_V1 } from "@/components/product/cardinalRiData";
import { projectResearchIntelligenceToRabbitHole } from "@/components/product/riAdapter";

export const metadata: Metadata = {
  title: "Cardinal Tetra — Endemic Prototype",
  description:
    "Internal product prototype for testing Endemic's interactive natural-history story format driven by BioTrack Research Intelligence.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const cardinalModel = projectResearchIntelligenceToRabbitHole(
  CARDINAL_TETRA_RI_V1,
  {
    title: "Cardinal Tetra",
    scientificName: "Paracheirodon axelrodi",
    eyebrow: "AquaTrack field note · BioTrack RI",
    lead:
      "Its accepted BioTrack paper trail separates the person who described it from the person it was named for.",
    accent: "aqua",
    mediaKey: "cardinal-tetra-hero-pd-paolo-neo",
    documents: [
      {
        id: "biotrack-ri-v1",
        title: "BioTrack Research Intelligence Packet v1",
        institution: "BioTrack Release Authority",
        year: 2026,
        detail:
          "Canonical relationship graph projection (biotrack-20260918-v1) verifying describer Leonard P. Schultz and namesake Herbert R. Axelrod.",
        identifier:
          "SHA-256: 08cf445aac9bb6b4cf4c69a1e27532df7ee0705365e567b6b89ad2cc6881f9cc",
      },
    ],
  }
);

export default function CardinalPrototypePage() {
  return <RabbitHoleSubjectView model={cardinalModel} />;
}
