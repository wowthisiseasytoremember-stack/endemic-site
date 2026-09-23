import type { Metadata } from "next";

import { RabbitHoleSubjectView } from "@/components/product";
import { CARDINAL_DESIGN_FIXTURE } from "@/components/product/__fixtures__/rabbitHoleFixtures";

export const metadata: Metadata = {
  title: "Cardinal Tetra — Endemic Prototype",
  description:
    "Internal product prototype for testing Endemic's interactive natural-history story format.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CardinalPrototypePage() {
  return <RabbitHoleSubjectView model={CARDINAL_DESIGN_FIXTURE} />;
}
