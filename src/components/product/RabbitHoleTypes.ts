import type { RabbitHoleAccent, ThreadState } from "./RabbitHolePrimitives";

export type ProductTrailItem = {
  label: string;
  href?: string;
  context?: string;
};

export type ProductReceipt = {
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

type ProductThreadBase = {
  id: string;
  question: string;
  target?: string;
  relationshipHint?: string;
};

export type ProductThread =
  | (ProductThreadBase & {
      state: Extract<ThreadState, "READY" | "SUMMARY">;
      href: string;
    })
  | (ProductThreadBase & {
      state: Extract<ThreadState, "RESEARCHING" | "UNAVAILABLE">;
      href?: never;
    });

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

type NonEmptyArray<T> = [T, ...T[]];

type RabbitHoleSubjectBase = {
  id: string;
  trail?: ProductTrailItem[];
  eyebrow?: string;
  title: string;
  scientificName?: string;
  lead: string;
  accent?: RabbitHoleAccent;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageLicense?: string;
  imageSourceHref?: string;
  imagePosition?: string;
};

type ReadyRabbitHoleSubject = RabbitHoleSubjectBase & {
  researching?: never;
  interesting: NonEmptyArray<ProductInterestingItem>;
  threads: NonEmptyArray<ProductThread>;
  corrections?: ProductCorrection[];
  unknowns?: ProductUnknown[];
  documents?: ProductDocument[];
};

type ResearchingRabbitHoleSubject = RabbitHoleSubjectBase & {
  researching: {
    title?: string;
    body: string;
    nextEvidence?: string[];
  };
  interesting?: never;
  threads?: never;
  corrections?: never;
  unknowns?: never;
  documents?: never;
};

export type RabbitHoleSubjectModel =
  | ReadyRabbitHoleSubject
  | ResearchingRabbitHoleSubject;
