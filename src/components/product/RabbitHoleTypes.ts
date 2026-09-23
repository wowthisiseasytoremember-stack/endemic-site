import type { RabbitHoleAccent, ThreadState } from "./RabbitHolePrimitives";

export type ProductTrailItem = {\n  label: string;\n  href?: string;\n  context?: string;\n};\n\nexport type ProductReceipt = {
  sourceLabel: string;
  relationship?: string;
  locator?: string;
  releaseId?: string;
  note?: string;
  href?: string;
};

export type ProductRelationship = {
  subject: string;
  predicate: string;
  object: string;
  year?: string | number;
  note?: string;
};

export type ProductInterestingItem = {
  id: string;
  kicker?: string;
  title: string;
  body?: string;
  relationship?: ProductRelationship;
  receipt?: ProductReceipt;
};

export type ProductThread = {
  id: string;
  question: string;
  target?: string;
  relationshipHint?: string;
  state: ThreadState;
  href?: string;
};

export type ProductUnknown = {
  id: string;
  question: string;
  currentAnswer: string;
  whyUnresolved?: string;
  whatWouldResolve?: string[];
  status?: "UNRESOLVED" | "CORPUS_GAP" | "LEAD_ONLY";
};

export type ProductCorrection = {
  id: string;
  oldClaim: string;
  correctedClaim: string;
  scopeNote?: string;
  receipt?: ProductReceipt;
};

export type ProductDocument = {
  id: string;
  title: string;
  institution?: string;
  year?: string | number;
  detail?: string;
  identifier?: string;
  href?: string;
  rightsNote?: string;
};

export type RabbitHoleSubjectModel = {
  id: string;
  eyebrow?: string;
  title: string;
  scientificName?: string;
  lead: string;
  accent?: RabbitHoleAccent;
  image?: string;
  imageAlt?: string;
  interesting: ProductInterestingItem[];
  threads: ProductThread[];
  corrections?: ProductCorrection[];
  unknowns?: ProductUnknown[];
  documents?: ProductDocument[];
};
