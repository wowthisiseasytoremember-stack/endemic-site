import type { Metadata } from "next";

import { RabbitHoleSubjectView } from "@/components/product";
import { DRAGON_PUFFER_EXEMPLAR } from "@/data/product-proof/dragon-puffer-exemplar";

export const metadata: Metadata = {
  title: "Dragon Puffer — Endemic Exemplar",
  description:
    "A source-reconciled Endemic field-note exemplar for Pao palembangensis, the Dragon or Humpback Puffer.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DragonPufferPrototypePage() {
  return <RabbitHoleSubjectView model={DRAGON_PUFFER_EXEMPLAR} />;
}
