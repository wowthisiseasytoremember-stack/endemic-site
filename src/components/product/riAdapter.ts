import { proofMediaIdentityProps } from "@/data/product-proof/media";
import type {
  ProductDocument,
  ProductInterestingItem,
  ProductReceipt,
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
  primaryInteresting?: ProductInterestingItem;
  threads?: ProductThread[];
}

/**
 * An Endemic *reader*, not a taxonomy engine. Only accepted, receipt-linked
 * BioTrack findings may become feature cards; candidate research remains
 * separate (see ResearchCandidatePanel). Missing/HOLD provenance fails closed.
 */
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

  const identity = {
    id: `ri-subject:${packet.subject_id}`,
    trail: config.trail ?? [
      { label: "Field Notes", context: "entry" },
      { label: config.title, context: "subject" },
    ],
    eyebrow: config.eyebrow ?? "BioTrack field note",
    title: config.title,
    scientificName: config.scientificName || packet.subject,
    lead: config.lead,
    accent: config.accent ?? "neutral",
    ...mediaProps,
  };

  const validRelease =
    packet.biotrack_release.trim().length > 0 &&
    /^[a-f0-9]{64}$/i.test(packet.biotrack_graph_sha256) &&
    packet.subject_id.trim().length > 0;
  const accepted = validRelease && packet.decision !== "HOLD";

  const receipts: ProductReceipt[] = (packet.receipts ?? [])
    .filter((receipt) => receipt.source_id && receipt.locator_id)
    .map((receipt) => ({
      sourceLabel: receipt.source_id,
      relationship: receipt.role,
      locator: receipt.locator_id,
      releaseId: packet.biotrack_release,
      note: receipt.note,
    }));

  const supported = (packet.findings ?? []).filter(
    (finding) => finding.status === "SUPPORTED" && finding.text.trim()
  );
  const unresolved = (packet.findings ?? []).filter(
    (finding) =>
      ["CORPUS_GAP", "CONFLICTING", "NARROW"].includes(finding.status) &&
      finding.text.trim()
  );

  // This branch must come first: even a caller-supplied editorial highlight
  // cannot turn HOLD or unprovenanced data into an accepted BioTrack feature.
  if (!accepted || (!config.primaryInteresting && (!supported.length || !receipts.length))) {
    return {
      ...identity,
      researching: {
        title: "This research record is not approved for publication.",
        body:
          packet.decision === "HOLD"
            ? "BioTrack has placed this research packet on hold. No findings from it are presented as accepted evidence."
            : "The accepted-release gate requires a release ID, a graph checksum, and a source-linked finding. This record does not currently meet that requirement.",
        nextEvidence: packet.next_receipts?.length
          ? packet.next_receipts
          : ["An accepted BioTrack release and independently traceable source receipts."],
      },
    };
  }

  const interesting: ProductInterestingItem[] = config.primaryInteresting
    ? [config.primaryInteresting]
    : [
        {
          id: "biotrack-source-backed-finding",
          kicker: "Accepted BioTrack Research Intelligence",
          title: supported[0].text,
          body: supported.slice(1).map((finding) => finding.text).join(" ") || undefined,
          receipt: receipts[0],
        },
      ];

  const threads: ProductThread[] = config.threads
    ? [...config.threads]
    : [
        {
          id: "accepted-evidence",
          question: "What does this BioTrack release actually establish?",
          target: packet.subject,
          relationshipHint: "Accepted, source-linked findings",
          state: "SUMMARY",
          href: "#interesting",
        },
        ...unresolved.map((finding, index): ProductThread => ({
          id: `research-gap-${index + 1}`,
          question: finding.text,
          target: finding.status === "CONFLICTING" ? "conflicting sources" : "open research question",
          relationshipHint: "Requires further review",
          state: "RESEARCHING",
        })),
      ];

  const unknowns: ProductUnknown[] = [];
  if ((packet.warnings ?? []).length || unresolved.length) {
    unknowns.push({
      id: "review-boundaries",
      question: "What remains unresolved in this accepted release?",
      currentAnswer: [
        ...(packet.warnings ?? []),
        ...unresolved.map((finding) => finding.text),
      ].join(" "),
      whatWouldResolve: packet.next_receipts ?? [],
      status: "CORPUS_GAP",
    });
  }

  return {
    ...identity,
    interesting: interesting as [ProductInterestingItem, ...ProductInterestingItem[]],
    threads: threads as [ProductThread, ...ProductThread[]],
    unknowns: unknowns.length ? unknowns : undefined,
    documents: config.documents ?? [],
  };
}
