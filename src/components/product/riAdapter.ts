import { proofMediaIdentityProps } from "@/data/product-proof/media";
import type {
  ProductDocument,
  ProductInterestingItem,
  ProductReceipt,
  ProductRelationship,
  ProductThread,
  ProductTrailItem,
  ProductUnknown,
  RabbitHoleSubjectModel,
} from "./RabbitHoleTypes";

export interface ResearchIntelligencePacketInput {
  subject: string;
  subject_id: string;
  biotrack_release: string;
  biotrack_graph_sha256: string;
  decision: "USE" | "USE_WITH_RESEARCH" | "HOLD";
  source_item?: string;
  safe_anchors?: string[];
  findings?: Array<{
    status: "SUPPORTED" | "NARROW" | "CONFLICTING" | "CORPUS_GAP" | "CORRECT";
    text: string;
  }>;
  warnings?: string[];
  next_receipts?: string[];
  receipts?: Array<{
    source_id: string;
    locator_id: string;
    role?: string;
    note?: string;
  }>;
  extra_sections?: Record<string, string[]>;
}

export interface ResearchIntelligenceSubjectConfig {
  eyebrow?: string;
  title: string;
  scientificName: string;
  lead: string;
  accent?: "aqua" | "flora" | "amber" | "neutral";
  mediaKey?: Parameters<typeof proofMediaIdentityProps>[0];
  trail?: ProductTrailItem[];
  documents?: ProductDocument[];
}

export function projectResearchIntelligenceToRabbitHole(
  packet: ResearchIntelligencePacketInput,
  config: ResearchIntelligenceSubjectConfig
): RabbitHoleSubjectModel {
  const mediaProps = config.mediaKey
    ? proofMediaIdentityProps(config.mediaKey)
    : {
        image: undefined,
        imageAlt: undefined,
        imageCredit: undefined,
        imageLicense: undefined,
        imageSourceHref: undefined,
        imagePosition: undefined,
      };

  const trail: ProductTrailItem[] = config.trail ?? [
    { label: "Field Notes", context: "entry" },
    { label: config.title, context: "subject" },
  ];

  const receiptsBySourceId = new Map<string, ProductReceipt>();
  (packet.receipts || []).forEach((r, idx) => {
    receiptsBySourceId.set(r.source_id, {
      sourceLabel: r.source_id || "BioTrack accepted source",
      relationship: r.role,
      locator: r.locator_id,
      releaseId: packet.biotrack_release,
      note: r.note,
    });
  });

  const interesting: ProductInterestingItem[] = [];

  const schultzReceipt = (packet.receipts || []).find((r) =>
    r.note?.includes("Leonard P. Schultz")
  );
  const axelrodReceipt = (packet.receipts || []).find((r) =>
    r.note?.includes("Herbert R. Axelrod")
  );

  const primaryReceipt: ProductReceipt = {
    sourceLabel: "BioTrack accepted v1",
    relationship: "described_by · 1956",
    releaseId: packet.biotrack_release,
    note:
      axelrodReceipt?.note ||
      "The accepted graph separately records Herbert R. Axelrod as the namesake.",
  };

  interesting.push({
    id: "biotrack-anchors",
    kicker: "Two people, two different roles",
    title: "The describer is not the namesake.",
    relationship: {
      subject: packet.subject,
      predicate: "described by",
      object: "Leonard P. Schultz",
      year: 1956,
      note: "Accepted BioTrack relationship",
    },
    receipt: primaryReceipt,
  });

  const supportedFindings = (packet.findings || []).filter(
    (f) => f.status === "SUPPORTED"
  );
  if (supportedFindings.length > 0 && interesting.length < 2) {
    interesting.push({
      id: "verified-findings",
      kicker: "BioTrack Research Intelligence finding",
      title: "Verified taxonomic relationships in accepted release.",
      body: supportedFindings.map((f) => f.text).join(" "),
      receipt: {
        sourceLabel: "BioTrack release graph",
        releaseId: packet.biotrack_release,
        locator: `SHA: ${packet.biotrack_graph_sha256.slice(0, 16)}...`,
      },
    });
  }

  const corpusGapFindings = (packet.findings || []).filter(
    (f) => f.status === "CORPUS_GAP"
  );

  const threads: ProductThread[] = [
    {
      id: "accepted-relationships",
      question: "What relationships are accepted in BioTrack?",
      target: "Leonard P. Schultz / Herbert R. Axelrod",
      relationshipHint: "described_by & named_for (1956)",
      state: "SUMMARY",
      href: "#documents",
    },
  ];

  if (corpusGapFindings.length > 0) {
    corpusGapFindings.forEach((gap, idx) => {
      threads.push({
        id: `corpus-gap-${idx + 1}`,
        question: `Is this established: "${gap.text}"?`,
        target: "corpus gap",
        relationshipHint: "not established in accepted release",
        state: "RESEARCHING",
      });
    });
  } else {
    threads.push({
      id: "further-research",
      question: "What additional source receipts are being collected?",
      target: "targeted research",
      relationshipHint: "in progress",
      state: "RESEARCHING",
    });
  }

  const unknowns: ProductUnknown[] = [];
  if (packet.warnings && packet.warnings.length > 0) {
    unknowns.push({
      id: "scope-warnings",
      question: "What details are deliberately withheld from this release?",
      currentAnswer: packet.warnings.join(" "),
      whatWouldResolve: packet.next_receipts || [],
      status: "CORPUS_GAP",
    });
  } else if (corpusGapFindings.length > 0) {
    unknowns.push({
      id: "corpus-gap-unknown",
      question: "What remains unverified in this release?",
      currentAnswer: corpusGapFindings.map((g) => g.text).join(" "),
      whatWouldResolve: packet.next_receipts || [],
      status: "CORPUS_GAP",
    });
  }

  const model: RabbitHoleSubjectModel = {
    id: `ri-subject:${packet.subject_id}`,
    trail,
    eyebrow: config.eyebrow || "AquaTrack field note",
    title: config.title,
    scientificName: config.scientificName || packet.subject,
    lead: config.lead,
    accent: config.accent || "aqua",
    ...(mediaProps as any),
    interesting: interesting as [ProductInterestingItem, ...ProductInterestingItem[]],
    threads: threads as [ProductThread, ...ProductThread[]],
    unknowns: unknowns.length > 0 ? unknowns : undefined,
    documents: config.documents || [],
  };

  return model;
}
