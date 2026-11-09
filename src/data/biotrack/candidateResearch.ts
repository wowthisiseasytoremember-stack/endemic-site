/**
 * Source-safe presentation projection of AquaScrape's research-only receipt.
 * Not a source of canonical biological facts. No runtime HTTP request.
 */
import snapshot from "./candidate-research.json";

export type CandidateResearchSubject = {
  subject_id: string;
  scientific_name: string;
  status: "taxon_candidate" | "review_required";
  gbif_key: string | null;
  taxon_source_sha256: string | null;
  specimen_candidate_count: number;
  gap_changes: Array<{
    gap: string;
    before: "unknown_unsearched";
    after: "known_partial_source_backed";
  }>;
};

export type CandidateResearchSnapshot = {
  schema: "endemic.biotrack.candidate_research.v1";
  release_state: "PRIVATE_RESEARCH_CANDIDATE_ONLY";
  source: {
    repo: string;
    tested_commit: string;
    run_url: string;
    artifact_id: number;
    captured_on: string;
  };
  totals: {
    subjects: number;
    taxon_candidates: number;
    specimen_candidates: number;
    review_required: number;
    partially_advanced: number;
  };
  subjects: CandidateResearchSubject[];
};

const verifiedSnapshot = snapshot as CandidateResearchSnapshot;

export function getResearchCandidate(subjectId: string): {
  entry: CandidateResearchSubject;
  source: CandidateResearchSnapshot["source"];
} | null {
  // The JSON snapshot is validated with scripts/import-biotrack-research.mjs
  // during CI; this guard also protects server renders after an unsafe edit.
  if (
    verifiedSnapshot.schema !== "endemic.biotrack.candidate_research.v1" ||
    verifiedSnapshot.release_state !== "PRIVATE_RESEARCH_CANDIDATE_ONLY"
  ) return null;
  const entry = verifiedSnapshot.subjects.find((item) => item.subject_id === subjectId);
  return entry ? { entry, source: verifiedSnapshot.source } : null;
}
